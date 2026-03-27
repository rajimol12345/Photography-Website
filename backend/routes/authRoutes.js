const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers, deleteUser, getUserById } = require('../controllers/authController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', protect, authorizeRoles('Admin'), getUsers);
router.get('/:id', protect, authorizeRoles('Admin'), getUserById);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteUser);

module.exports = router;