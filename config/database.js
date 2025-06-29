const mongoose = require("mongoose");


/// connect to database
const dbConnection = () => mongoose.connect(process.env.DB_URL, {
    dbName: 'ecommerce-database' 
  })
.then((conn) => {
    console.log(`Connected to MongoDB ${conn.connection.host}`);
});
// .catch((err) => {
//     console.log(err);
//     process.exit(1);
// });

module.exports = dbConnection;