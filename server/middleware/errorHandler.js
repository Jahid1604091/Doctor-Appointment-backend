

export const notFound = (req, res, next) => {
    const err = new Error(`Sorry ! Not Found ${req.originalUrl}`);
    res.status(400);
    next(err);
}

export const errHandler = (err, req, res, next) => {

    let status_code = err.statusCode || 500;
    let msg = err.message || 'Server Error';

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        status_code = 404;
        msg = `Resource Not Found with id ${err.value} !`;
    }
    if (err.code === 11000) {
        status_code = 400;
        msg = `Duplicate Error!`;
    }
    // if (err.name === 'ValidationError') {
    //     const errors = Object.values(err.errors);
    //     console.log(errors)
    //     new ErrorResponse(errors[0].message, 400)
    // }

    res.status(status_code).json({
        msg,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}