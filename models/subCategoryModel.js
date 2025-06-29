const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [2, "SubCategory name must be at least 2 characters"],
        maxlength: [32, "SubCategory name must be less than 32 characters"],
        unique: [true, "SubCategory name must be unique"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    category: { 
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "SubCategory must be belong to a category"],
    },
    image: {
        type: String,
    }
}, 
{timestamps: true});

module.exports = mongoose.model("SubCategory", subCategorySchema);
