export const notFound = (req,res,next) =>{
    const err = new Error(`Sorry ! Not Found ${req.originalUrl}`);
    res.status(400);
    next(err);
}

export const errHandler = (err,req,res,next) =>{
    let status_code = res.statusCode == 200 ? 500 :res.statusCode;

    let msg = err.message;

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        status_code = 404;
        msg = `Resource Not Found`;
    }

    res.status(status_code).json({
        msg, 
        stack:process.env.NODE_ENV === 'production' ? null :err.stack
    });
}