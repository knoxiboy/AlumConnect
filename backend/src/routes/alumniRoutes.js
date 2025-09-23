const express = require('express');
const {
  getAlumniDashboard,
  getAlumniProfile,
  updateAlumniProfile,
  getAlumniConnections,
  getAlumniJobs,
  postJob,
  getAlumniEvents,
  createEvent
} = require('../controllers/alumniController');

const router = express.Router();

// Alumni Dashboard Routes
router.route('/dashboard/:id').get(getAlumniDashboard);
router.route('/dashboard').get(getAlumniDashboard);
router.route('/profile/:id').get(getAlumniProfile).put(updateAlumniProfile);
router.route('/connections/:id').get(getAlumniConnections);
router.route('/jobs/:id').get(getAlumniJobs);
router.route('/jobs').post(postJob);
router.route('/events/:id').get(getAlumniEvents);
router.route('/events').post(createEvent);

module.exports = router;