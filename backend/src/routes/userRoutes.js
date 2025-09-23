const express = require('express');
const { protect } = require('../middleware/auth');
const { updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.route('/profile').put(updateUser);
router.route('/').delete(deleteUser);

module.exports = router;