const asyncHandler = require('express-async-handler');
const TeamMember = require('../models/TeamMember');

// @desc    Fetch all team members
// @route   GET /api/team
// @access  Public
const getTeamMembers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await TeamMember.countDocuments({});
  const members = await TeamMember.find({})
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ members, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single team member
// @route   GET /api/team/:id
// @access  Public
const getTeamMemberById = asyncHandler(async (req, res) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (teamMember) {
    res.json(teamMember);
  } else {
    res.status(404);
    throw new Error('Team member not found');
  }
});

// @desc    Create a team member
// @route   POST /api/team
// @access  Private
const createTeamMember = asyncHandler(async (req, res) => {
  const { name, role, bio, imageUrl } = req.body;

  // Validate required fields
  if (!name || !role) {
    res.status(400);
    throw new Error('Please provide name and role for the team member');
  }

  const teamMember = new TeamMember({
    name,
    role,
    bio,
    imageUrl, // Use imageUrl directly
  });

  const createdTeamMember = await teamMember.save();
  res.status(201).json(createdTeamMember);
});

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private
const updateTeamMember = asyncHandler(async (req, res) => {
  const { name, role, bio, imageUrl } = req.body;
  const memberId = req.params.id;

  // Build update object
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (role !== undefined) updateData.role = role;
  if (bio !== undefined) updateData.bio = bio;
  if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

  try {
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      memberId,
      updateData,
      { new: true, runValidators: true }
    );

    if (updatedTeamMember) {
      res.json(updatedTeamMember);
    } else {
      res.status(404);
      throw new Error('Team member not found');
    }
  } catch (error) {
    console.error('[TEAM-UPDATE] Update Failed:', error.message);
    res.status(500);
    throw new Error(`Team member update failed: ${error.message}`);
  }
});

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private
const deleteTeamMember = asyncHandler(async (req, res) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (teamMember) {
    await TeamMember.deleteOne({ _id: req.params.id });
    res.json({ message: 'Team member removed' });
  } else {
    res.status(404);
    throw new Error('Team member not found');
  }
});

module.exports = {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
