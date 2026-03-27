const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');
const Category = require('../models/Category');

// @desc    Fetch all blog posts with pagination and filtering
// @route   GET /api/blogs
// @access  Public
const getBlogPosts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 9;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword ? {
      title: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    } : {};

    let categoryFilter = {};
    if (req.query.category) {
      const category = await Category.findOne({ slug: req.query.category });
      if (category) {
        categoryFilter = { category: category._id };
      }
    }

    const query = { ...keyword, ...categoryFilter, isPublic: true };

    const count = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 }) // Sort latest first
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Handle empty list efficiently
    if (!blogs) {
      return res.status(200).json({ blogs: [], page, pages: 0 });
    }

    res.status(200).json({ blogs, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error('[BLOG-GET] Fetch failed:', error.message);
    res.status(500);
    throw new Error('Server Error: Could not fetch blog posts');
  }
});

// @desc    Fetch a single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogPostBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
    .populate('author', 'name')
    .populate('category', 'name slug');

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Get recent blog posts
// @route   GET /api/blogs/recent
// @access  Public
const getRecentPosts = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ isPublic: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .select('title slug createdAt imageUrl');
  res.json(blogs);
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private
const createBlogPost = asyncHandler(async (req, res) => {
  const { title, excerpt, content, imageUrl, category, tags, isPublic } = req.body;

  // Ensure all required fields are present
  if (!title || !excerpt || !content || !imageUrl || !category) {
    res.status(400);
    throw new Error('Please include all required fields: title, excerpt, content, imageUrl, category');
  }

  // Find the category by ID
  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    res.status(400);
    throw new Error('Invalid category ID');
  }

  const blog = new Blog({
    title,
    excerpt,
    content,
    imageUrl,
    author: req.user._id, // Set author from authenticated user
    category: existingCategory._id,
    tags: tags || [], // Ensure tags is an array
    isPublic: isPublic !== undefined ? isPublic : true, // Default to true if not provided
  });

  const createdBlog = await blog.save();
  // Populate author and category for the response
  await createdBlog.populate('author', 'name');
  await createdBlog.populate('category', 'name slug');
  res.status(201).json(createdBlog);
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlogPost = asyncHandler(async (req, res) => {
  const { title, excerpt, content, imageUrl, category, tags, isPublic } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.excerpt = excerpt || blog.excerpt;
    blog.content = content || blog.content;
    blog.imageUrl = imageUrl || blog.imageUrl;
    blog.tags = tags !== undefined ? tags : blog.tags;
    blog.isPublic = isPublic !== undefined ? isPublic : blog.isPublic;

    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        res.status(400);
        throw new Error('Invalid category ID');
      }
      blog.category = existingCategory._id;
    }

    const updatedBlog = await blog.save();
    // Populate author and category for the response
    await updatedBlog.populate('author', 'name');
    await updatedBlog.populate('category', 'name slug');
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlogPost = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await Blog.deleteOne({ _id: req.params.id });
    res.json({ message: 'Blog post removed' });
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

module.exports = {
  getBlogPosts,
  getBlogPostBySlug,
  getRecentPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
