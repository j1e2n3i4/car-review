const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.listBlogs);
router.get('/new', blogController.newBlog);
router.post('/', blogController.createBlog);
router.get('/:id/edit', blogController.editBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.get('/:id', blogController.viewBlog);
router.get('/vehicles', blogController.listVehicles);
router.post('/vehicles/filter', blogController.filterVehicles);

module.exports = router;
