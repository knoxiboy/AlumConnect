const express = require('express');
const {
  getAlumniDashboard,
  getAlumniProfile,
  updateAlumniProfile,
  getAlumniConnections,
  getAlumniJobs,
  postJob,
  getAlumniEvents,
  createEvent,
  applyForJob,
  getUserJobApplications,
  getJobApplications,
  uploadResume
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

// Job Application Routes
router.route('/job-applications').post(applyForJob);
router.route('/job-applications/user/:userId').get(getUserJobApplications);
router.route('/job-applications/job/:jobId').get(getJobApplications);

// File Upload Routes
router.route('/upload-resume').post(uploadResume, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // In a production environment, you would store this URL in a database
  // For now, we'll return the file path
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/resumes/${req.file.filename}`;
  
  res.status(200).json({
    success: true,
    fileUrl: fileUrl,
    message: 'File uploaded successfully'
  });
});

module.exports = router;