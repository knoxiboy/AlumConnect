const express = require('express');
const alumniAuthRoutes = require('./alumniAuth');
const studentAuthRoutes = require('./studentAuth');
const adminAuthRoutes = require('./adminAuth');
const googleAuthRoutes = require('./googleAuth');

const router = express.Router();

// Include all authentication routes
router.use('/', alumniAuthRoutes);
router.use('/', studentAuthRoutes);
router.use('/', adminAuthRoutes);
router.use('/', googleAuthRoutes);

module.exports = router;
