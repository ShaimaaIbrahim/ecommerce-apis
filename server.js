const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const globalErrorHandler = require("./middlewares/errorMiddleware.js");

dotenv.config({path: "config.env"});

const app = express();
const dbConnection = require("./config/database.js");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError.js");

dbConnection();

/// middleware
app.use(express.json());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
    console.log(`mode is ${process.env.NODE_ENV}`);
}else{
    app.use(morgan("combined"));
}

//Routes
app.use("/api/v1/categories", categoryRoute);

/// Middleware to handle 404 errors
app.use((req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler (after all routes) 
app.use(globalErrorHandler);
  
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("UnhandledRejection", (err) => {
    console.log(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error("Shutting down...");
        process.exit(1);
    });
});



