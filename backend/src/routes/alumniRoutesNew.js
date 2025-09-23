const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getAlumniProfile, 
  createAlumniProfile, 
  updateAlumniProfile, 
  deleteAlumniProfile,
  getAllAlumni
} = require('../controllers/alumniControllerNew');

const router = express.Router();

// Public routes
router.route('/').get(getAllAlumni);

// Private routes
router.route('/').post(protect, createAlumniProfile);
router.route('/profile').get(protect, getAlumniProfile);
router.route('/profile').put(protect, updateAlumniProfile);
router.route('/profile').delete(protect, deleteAlumniProfile);

module.exports = router;