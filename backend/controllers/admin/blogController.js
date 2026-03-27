const asyncHandler = require('express-async-handler');
const Blog = require('../../models/Blog');

// @desc    Get all blog posts with filtering, pagination, and searching
// @route   GET /api/admin/blogs
// @access  Private/Admin
const getBlogs = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      title: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  const count = await Blog.countDocuments({ ...keyword });
  const blogs = await Blog.find({ ...keyword })
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get a single blog post by id
// @route   GET /api/admin/blogs/:id
// @access  Private/Admin
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog post not found');
  }
});

// @desc    Create a blog post
// @route   POST /api/admin/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, imageUrl, category, tags, isPublic } = req.body;

  // Validate required fields
  if (!title || !excerpt || !content || !imageUrl) {
    res.status(400);
    throw new Error('Please provide title, excerpt, content, and imageUrl');
  }

  const blog = new Blog({
    title,
    excerpt: excerpt || content.substring(0, 200), // Use first 200 chars of content if no excerpt
    content,
    imageUrl,
    author: req.user._id, // Set from authenticated user
    category,
    tags: tags || [],
    isPublic: isPublic !== undefined ? isPublic : true,
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Update a blog post
// @route   PUT /api/admin/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, excerpt, content, imageUrl, category, tags, isPublic } = req.body;
  const blogId = req.params.id;

  // Build update object
  const updateData = {};
  if (title !== undefined) updateData.title = title;

  // Handle excerpt: if explicit, use it. If not, but content changed, maybe regen? 
  // For now, only update if provided or rely on frontend to send it.
  if (excerpt !== undefined) updateData.excerpt = excerpt;
  if (content !== undefined) updateData.content = content;
  if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
  if (category !== undefined) updateData.category = category;
  if (tags !== undefined) updateData.tags = tags;
  if (isPublic !== undefined) updateData.isPublic = isPublic;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404);
      throw new Error('Blog post not found');
    }
  } catch (error) {
    console.error('[BLOG-UPDATE] Save Failed:', error.message);
    if (error.name === 'ValidationError') {
      res.status(400);
      const messages = Object.values(error.errors).map(val => val.message);
      throw new Error(`Validation Error: ${messages.join(', ')}`);
    }
    res.status(500);
    throw new Error(`Blog update failed: ${error.message}`);
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/admin/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
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
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
