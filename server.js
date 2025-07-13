const express = require("express");
const morgan = require("morgan");
const globalErrorHandler = require("./middlewares/errorMiddleware.js");
const authRoute = require("./routes/auth");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const configRoute = require('./routes/config.js');

const dotenv = require("dotenv");
dotenv.config({path: "config.env"});

const app = express();
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const ApiError = require("./utils/apiError.js");
const passport = require("passport");

dbConnection();

/// middleware
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
require('./config/passport');

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
    console.log(`mode is ${process.env.NODE_ENV}`);
}else{
    app.use(morgan("combined"));
}

//Routes 
// auth route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/config", configRoute);

///main url for categories and subcategories.
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
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



