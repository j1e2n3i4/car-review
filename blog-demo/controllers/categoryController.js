const Category = require('../models/Category');
const Blog = require('../models/Blog');

// List all categories
exports.listCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parent').lean();
        for (let category of categories) {
            category.blogs = await Blog.find({ categories: category._id }).lean();
        }
        res.render('categories/index', { categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Create a new category
exports.newCategory = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        res.render('categories/new', { categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const category = new Category({ name, parent });
        await category.save();
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Edit a category
exports.editCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug }).lean();
        const categories = await Category.find().lean();
        res.render('categories/edit', { category, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const category = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, parent },
            { new: true }
        );
        await category.save();
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findOneAndDelete({ slug: req.params.slug });
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Show blogs for a specific category
exports.showCategoryBlogs = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug }).lean();
        if (!category) {
            return res.status(404).send('Category not found');
        }
        const blogs = await Blog.find({ categories: category._id }).lean();
        res.render('categories/blogs', { category, blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
