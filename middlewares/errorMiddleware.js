const globalErrorHandler =  (err, req, res, next) => {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || "error";
        err.message = err.message || "Internal Server Error";
    
        if(process.env.NODE_ENV === "development"){
            return sendErrorDev(err, res);
        }else{
            return sendErrorProd(err, res);
        }
    };

    const sendErrorDev = (err, res) => {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err,
        });
    };

    const sendErrorProd = (err, res) => {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    };

    module.exports = globalErrorHandler;