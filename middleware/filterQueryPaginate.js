
const filterQueryPaginate = (model, populate = '',role='') => async (req, res, next) => {
    let query;

    let reqQuery = { ...req.query };

    //skip the admin
    if (role === 'admin') {
        reqQuery.role = 'user'
    }

    //fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];


    //loop over removeFields and delete from reqQuery
    removeFields.forEach(field => delete reqQuery[field]);

    let queryString = JSON.stringify(reqQuery);


    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = model.find(JSON.parse(queryString));
    // query = UserDetails.find(JSON.parse(queryString)).select('name email);

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    else {
        query = query.sort('createdAt');
    }

    //search
    const keywordForUser = req.query.search ? {
        '$or': [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {};

    //join two tables(Doctor, UserDetails) to get (doctor name and expertise_in)
    //can only search on expertise_in , need to work on name
    const keywordForDoctor = req.query.search ? {
        '$or': [
            { name: { $regex: req.query.search, $options: 'i' } },
            { expertise_in: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {};

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3; //pageSize

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await model.countDocuments().where('role'); //pages
    //use '$or' and concat for multiple fields
    query = query.find(model === 'UserDetails' ? keywordForUser : keywordForDoctor).skip(startIndex).limit(limit);

    if (populate) {
        query = query.populate(populate);
    }

    const results = await query;
    // const pagination = {};

    // if (endIndex < total) {
    //     pagination.next = { page: page + 1, limit }
    // }
    // if (startIndex > 0) {
    //     pagination.prev = { page: page - 1, limit }
    // }

    //- the admin
    console.log(results)
    res.filterQueryPaginateResults = {
        success: true,
        count: results.length,
        total: role==='admin' ? total - 1 : total,
        // pagination,
        page,
        pages: Math.ceil(total / limit),
        data: results
    }
    next();
}
export default filterQueryPaginate;