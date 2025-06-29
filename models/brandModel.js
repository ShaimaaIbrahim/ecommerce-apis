const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [2, "Brand name must be at least 2 characters"],
        maxlength: [32, "Brand name must be less than 32 characters"],
        unique: [true, "Brand name must be unique"],
        required: [true, "Brand name is required"],
    }
},
{ timestamps: true });

module.exports = mongoose.model("Brand", brandSchema); 