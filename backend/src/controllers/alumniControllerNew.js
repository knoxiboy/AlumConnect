const Alumni = require('../models/Alumni');

// @desc    Get all alumni
// @route   GET /api/alumni
// @access  Public
const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find().populate('user', 'name email');
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get current user's alumni profile
// @route   GET /api/alumni/profile
// @access  Private
const getAlumniProfile = async (req, res) => {
  try {
    const alumni = await Alumni.findOne({ user: req.user.id }).populate('user', 'name email');
    
    if (alumni) {
      res.json(alumni);
    } else {
      res.status(404).json({ message: 'Alumni profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create alumni profile
// @route   POST /api/alumni
// @access  Private
const createAlumniProfile = async (req, res) => {
  try {
    const alumniExists = await Alumni.findOne({ user: req.user.id });
    
    if (alumniExists) {
      return res.status(400).json({ message: 'Alumni profile already exists' });
    }
    
    const alumni = await Alumni.create({
      user: req.user.id,
      graduationYear: req.body.graduationYear,
      degree: req.body.degree,
      major: req.body.major,
      currentPosition: req.body.currentPosition,
      company: req.body.company,
      industry: req.body.industry,
      location: req.body.location,
      bio: req.body.bio,
      skills: req.body.skills,
      linkedIn: req.body.linkedIn,
      website: req.body.website,
      isMentor: req.body.isMentor,
      availability: req.body.availability
    });
    
    res.status(201).json(alumni);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update alumni profile
// @route   PUT /api/alumni/profile
// @access  Private
const updateAlumniProfile = async (req, res) => {
  try {
    const alumni = await Alumni.findOne({ user: req.user.id });
    
    if (alumni) {
      alumni.graduationYear = req.body.graduationYear || alumni.graduationYear;
      alumni.degree = req.body.degree || alumni.degree;
      alumni.major = req.body.major || alumni.major;
      alumni.currentPosition = req.body.currentPosition || alumni.currentPosition;
      alumni.company = req.body.company || alumni.company;
      alumni.industry = req.body.industry || alumni.industry;
      alumni.location = req.body.location || alumni.location;
      alumni.bio = req.body.bio || alumni.bio;
      alumni.skills = req.body.skills || alumni.skills;
      alumni.linkedIn = req.body.linkedIn || alumni.linkedIn;
      alumni.website = req.body.website || alumni.website;
      alumni.isMentor = req.body.isMentor !== undefined ? req.body.isMentor : alumni.isMentor;
      alumni.availability = req.body.availability || alumni.availability;
      
      const updatedAlumni = await alumni.save();
      res.json(updatedAlumni);
    } else {
      res.status(404).json({ message: 'Alumni profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete alumni profile
// @route   DELETE /api/alumni/profile
// @access  Private
const deleteAlumniProfile = async (req, res) => {
  try {
    const alumni = await Alumni.findOne({ user: req.user.id });
    
    if (alumni) {
      await alumni.remove();
      res.json({ message: 'Alumni profile removed' });
    } else {
      res.status(404).json({ message: 'Alumni profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllAlumni,
  getAlumniProfile,
  createAlumniProfile,
  updateAlumniProfile,
  deleteAlumniProfile
};