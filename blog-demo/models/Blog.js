const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    price: Number,
    featuredImage: String,
    additionalImages: [String],
    fuelType: String,
    transmission: String,
    engineSize: String,
    mileage: String,
    seatingCapacity: Number,
    size: String,
    fuelTank: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
