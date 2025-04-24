const Blog = require('../models/Blog');
const Category = require('../models/Category');

exports.listVehicles = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate('categories').exec();
        const categories = await Category.find().exec();
        res.render('blogs/vehicles', { blogs, categories });
    } catch (err) {
        console.error('Error fetching vehicles:', err);
        res.status(500).send("Server Error");
    }
};

exports.filterVehicles = async (req, res) => {
    try {
        const { price, categories } = req.body;
        const priceFilter = price ? { price: { $lte: price } } : {};
        const categoryFilter = categories && categories.length > 0 ? { categories: { $in: categories } } : {};

        const filter = { ...priceFilter, ...categoryFilter };

        const blogs = await Blog.find(filter).sort({ createdAt: -1 }).populate('categories').exec();
        res.render('partials/blogList', { blogs });
    } catch (err) {
        console.error('Error filtering vehicles:', err);
        res.status(500).send("Server Error");
    }
};


exports.viewVehicle = async (req, res) => {
    try {
        const vehicle = await Blog.findById(req.params.id).populate('categories').exec(); // Assuming `Blog` model handles vehicles as well
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.render('vehicles/showVehicle', { vehicle });
    } catch (err) {
        console.error('Error fetching vehicle:', err);
        res.status(500).send('Server Error');
    }
};

