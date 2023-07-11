
const filterQueryPaginate = (model, populate) => async (req, res, next) => {
    let query;

    let reqQuery = { ...req.query };

    //skip the admin
    if (req.user.role === 'admin') {
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

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3; //pageSize

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const keyword = req.query.search ? {
        '$or': [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } }
        ]
    } : {};
    const total = await model.countDocuments().where('role'); //pages
    //use '$or' and concat for multiple fields
    query = query.find(keyword).skip(startIndex).limit(limit);

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
    res.filterQueryPaginateResults = {
        success: true,
        count: results.length,
        total:total - 1,
        // pagination,
        page,
        pages: Math.ceil(total / limit),
        data: results
    }
    next();
}
export default filterQueryPaginate;