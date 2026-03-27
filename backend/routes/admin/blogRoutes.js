const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../../controllers/admin/blogController');

router
  .route('/')
  .get(getBlogs)
  .post(createBlog);

router
  .route('/:id')
  .get(getBlogById)
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = router;
