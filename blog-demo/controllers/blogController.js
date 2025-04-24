const Blog = require('../models/Blog');
const Category = require('../models/Category');
const upload = require('../middleware/upload');

exports.listBlogs = async (req, res) => {
    const blogs = await Blog.find().populate('categories').exec();
    const categories = await Category.find().exec();
    res.render('blogs/index', { blogs, categories });
};

exports.newBlog = async (req, res) => {
    const categories = await Category.find().exec();
    res.render('blogs/new', { categories });
};

exports.createBlog = [upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'additionalImages', maxCount: 20 }]), async (req, res) => {
    const { title, description, categories, price } = req.body;
    const featuredImage = req.files['featuredImage'] ? req.files['featuredImage'][0].filename : null;
    const additionalImages = req.files['additionalImages'] ? req.files['additionalImages'].map(file => file.filename) : [];
    const blog = new Blog({ title, description, categories: Array.isArray(categories) ? categories : [categories], price, featuredImage, additionalImages });

    try {
        await blog.save();
        res.redirect('/blogs');
    } catch (err) {
        console.error('Error creating blog:', err);
        res.redirect('/blogs/new');
    }
}];

exports.editBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).exec();
    const categories = await Category.find().exec();
    res.render('blogs/edit', { blog, categories });
};

exports.updateBlog = [upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'additionalImages', maxCount: 20 }]), async (req, res) => {
    const { title, description, categories, price, fuelType, transmission, engineSize, mileage, seatingCapacity, size, fuelTank, removeImages } = req.body;
    let blog = await Blog.findById(req.params.id).exec();

    if (req.files['featuredImage']) {
        blog.featuredImage = req.files['featuredImage'][0].filename;
    }

    if (req.files['additionalImages']) {
        blog.additionalImages = [...blog.additionalImages, ...req.files['additionalImages'].map(file => file.filename)];
    }

    if (removeImages) {
        blog.additionalImages = blog.additionalImages.filter(image => !removeImages.includes(image));
    }

    blog.title = title;
    blog.description = description;
    blog.categories = Array.isArray(categories) ? categories : [categories];
    blog.price = price;
    blog.fuelType = fuelType;
    blog.transmission = transmission;
    blog.engineSize = engineSize;
    blog.mileage = mileage;
    blog.seatingCapacity = seatingCapacity;
    blog.size = size;
    blog.fuelTank = fuelTank;

    try {
        await blog.save();
        res.redirect('/blogs');
    } catch (err) {
        console.error('Error updating blog:', err);
        res.redirect(`/blogs/${req.params.id}/edit`);
    }
}];

exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id).exec();
        res.redirect('/blogs');
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.redirect('/blogs');
    }
};

exports.viewBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('categories').exec();
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('blogs/show', { blog });
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).send('Server Error');
    }
};

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
