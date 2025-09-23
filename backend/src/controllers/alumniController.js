const Alumni = require('../models/Alumni');
const User = require('../models/User');
const Job = require('../models/Job');
const Event = require('../models/Event');
const Connection = require('../models/Connection');
const Message = require('../models/Message');

// @desc    Get alumni dashboard data
// @route   GET /api/alumni/dashboard
// @access  Public (for now, would be private in real app)
const getAlumniDashboard = async (req, res) => {
  try {
    // In a real app, we would get the alumni ID from the authenticated user
    // For now, we'll use a placeholder
    const alumniId = req.params.id || null;

    // Get alumni profile
    let alumniProfile;
    if (alumniId) {
      alumniProfile = await Alumni.findById(alumniId).populate('user');
    } else {
      // Get a sample alumni for demonstration
      alumniProfile = await Alumni.findOne().populate('user');
    }

    if (!alumniProfile) {
      return res.status(404).json({ message: 'Alumni profile not found' });
    }

    // Get recent jobs posted by alumni
    const recentJobs = await Job.find({ postedBy: alumniProfile.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get upcoming events organized by alumni
    const upcomingEvents = await Event.find({ 
      organizer: alumniProfile.user._id,
      startDate: { $gte: new Date() }
    })
      .sort({ startDate: 1 })
      .limit(5);

    // Get pending connection requests
    const pendingConnections = await Connection.find({ 
      recipient: alumniProfile.user._id,
      status: 'pending'
    }).populate('requester', 'name email');

    // Get recent messages
    const recentMessages = await Message.find({
      $or: [
        { sender: alumniProfile.user._id },
        { recipient: alumniProfile.user._id }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('sender', 'name')
      .populate('recipient', 'name');

    res.status(200).json({
      success: true,
      data: {
        profile: alumniProfile,
        recentJobs,
        upcomingEvents,
        pendingConnections: pendingConnections.length,
        recentMessages
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get alumni profile
// @route   GET /api/alumni/profile/:id
// @access  Public
const getAlumniProfile = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id).populate('user');
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }
    
    res.status(200).json({
      success: true,
      data: alumni
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update alumni profile
// @route   PUT /api/alumni/profile/:id
// @access  Public (would be private in real app)
const updateAlumniProfile = async (req, res) => {
  try {
    const {
      graduationYear,
      degree,
      major,
      currentPosition,
      company,
      industry,
      location,
      bio,
      skills,
      linkedIn,
      website,
      isMentor,
      availability
    } = req.body;

    const alumni = await Alumni.findById(req.params.id);
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    // Update alumni fields
    alumni.graduationYear = graduationYear || alumni.graduationYear;
    alumni.degree = degree || alumni.degree;
    alumni.major = major || alumni.major;
    alumni.currentPosition = currentPosition || alumni.currentPosition;
    alumni.company = company || alumni.company;
    alumni.industry = industry || alumni.industry;
    alumni.location = location || alumni.location;
    alumni.bio = bio || alumni.bio;
    alumni.skills = skills || alumni.skills;
    alumni.linkedIn = linkedIn || alumni.linkedIn;
    alumni.website = website || alumni.website;
    alumni.isMentor = isMentor !== undefined ? isMentor : alumni.isMentor;
    alumni.availability = availability || alumni.availability;

    const updatedAlumni = await alumni.save();

    // Also update user info if provided
    if (req.body.name || req.body.email) {
      const user = await User.findById(alumni.user);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      data: updatedAlumni
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get alumni connections
// @route   GET /api/alumni/connections/:id
// @access  Public
const getAlumniConnections = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [
        { requester: req.params.id },
        { recipient: req.params.id }
      ],
      status: 'accepted'
    })
      .populate('requester', 'name email')
      .populate('recipient', 'name email');

    res.status(200).json({
      success: true,
      data: connections
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get alumni jobs
// @route   GET /api/alumni/jobs/:id
// @access  Public
const getAlumniJobs = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    const jobs = await Job.find({ postedBy: alumni.user })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Post a new job
// @route   POST /api/alumni/jobs
// @access  Public (would be private in real app)
const postJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      requirements,
      location,
      salary,
      employmentType,
      postedBy,
      expiryDate,
      isRemote,
      skills,
      experienceLevel
    } = req.body;

    const job = await Job.create({
      title,
      company,
      description,
      requirements,
      location,
      salary,
      employmentType,
      postedBy,
      expiryDate,
      isRemote,
      skills,
      experienceLevel
    });

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get alumni events
// @route   GET /api/alumni/events/:id
// @access  Public
const getAlumniEvents = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    
    if (!alumni) {
      return res.status(404).json({ message: 'Alumni not found' });
    }

    const events = await Event.find({ organizer: alumni.user })
      .sort({ startDate: -1 });

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/alumni/events
// @access  Public (would be private in real app)
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      location,
      organizer,
      eventType,
      isVirtual,
      meetingLink,
      maxAttendees
    } = req.body;

    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      location,
      organizer,
      eventType,
      isVirtual,
      meetingLink,
      maxAttendees
    });

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAlumniDashboard,
  getAlumniProfile,
  updateAlumniProfile,
  getAlumniConnections,
  getAlumniJobs,
  postJob,
  getAlumniEvents,
  createEvent
};