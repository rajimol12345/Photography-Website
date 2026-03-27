const express = require('express');
const router = express.Router();
const {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTeamMembers)
  .post(protect, authorizeRoles('Admin'), createTeamMember);

router
  .route('/:id')
  .get(getTeamMemberById)
  .put(protect, authorizeRoles('Admin'), updateTeamMember)
  .delete(protect, authorizeRoles('Admin'), deleteTeamMember);

module.exports = router;
