const mongoose = require("mongoose");

const { Schema, model } = mongoose;


// 1. Define Schema (Structure of documents)
const categorySchema = new Schema({
    name: {
      type: String,
      required: true ,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters long"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  }, { timestamps: true });

// 2. Create Model (Interface to interact with the 'users' collection)
const categoryModel = model('Category', categorySchema);


module.exports = categoryModel;
