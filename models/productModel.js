///create product model
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Product title is required"],
        minlength: [3, "Product title must be at least 3 characters"],
        maxlength: [100, "Product title must be less than 100 characters"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [20, "Product description must be at least 20 characters"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [0, "Quantity cannot be negative"],
    },
    sold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        trim: true,
        max: [200000, "Price cannot exceed 200000"],
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    imageCover: {
        type: String,
        required: [true, "Product image cover is required"],
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Product must be belong to a category"],
    },
    subCategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "SubCategory",
        },
    ],
    ratingsAverage: {
        type: Number,
        min: [1, "Rating must be above or equal 1.0"],
        max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    // Enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// // Virtual populate
// productSchema.virtual("reviews", {
//     ref: "Review",
//     foreignField: "product",
//     localField: "_id",
// });

// // Mongoose query middleware
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "category",
        select: "name",
    });
    next();
});

module.exports = mongoose.model("Product", productSchema);
