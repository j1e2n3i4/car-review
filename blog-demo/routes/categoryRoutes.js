const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Routes
router.get('/', categoryController.listCategories);
router.get('/new', categoryController.newCategory);
router.post('/', categoryController.createCategory);
router.get('/:id/edit', categoryController.editCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/:id/blogs', categoryController.showCategoryBlogs);


module.exports = router