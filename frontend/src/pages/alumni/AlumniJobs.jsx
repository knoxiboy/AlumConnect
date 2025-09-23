import { useState, useMemo } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { jobPostings } from "../../data/jobs";
import { getCurrentUser } from "../../utils/auth";
import {
  Briefcase, MapPin, DollarSign, Clock, Search, Filter, Plus, Code, X, ChevronDown, CheckCircle, Send, RotateCcw
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

const JobCard = ({ job, hasApplied, onApply, onViewApplication }) => (
  <div className="group bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-xl hover:border-slate-300 transition-all transform hover:-translate-y-1">
    {/* Header with gradient accent */}
    <div className="relative mb-3 sm:mb-4">
      <div 
        className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
        style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
      />
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pt-3 gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors line-clamp-2">
            {job.title}
          </h3>
          <p className="text-slate-600 font-medium text-sm sm:text-base line-clamp-1">{job.company}</p>
        </div>
        <div className="flex gap-2">
          <span className={`self-start px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full flex-shrink-0 ${
            job.type === 'Full-time' 
              ? 'text-white shadow-sm'
              : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}
          style={job.type === 'Full-time' 
            ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
            : {}
          }>
            {job.type}
          </span>
          
          {hasApplied && (
            <span className="self-start px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full flex-shrink-0 bg-green-100 text-green-800 border border-green-200">
              Applied
            </span>
          )}
        </div>
      </div>
    </div>
    
    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
      <div className="flex items-center gap-2 sm:gap-3 text-slate-600">
        <div 
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
        >
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.indigo})` }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1">{job.location}</p>
          <p className="text-xs text-slate-500">Location</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 text-slate-600">
        <div 
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
        >
          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.coral})` }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1">{job.salary}</p>
          <p className="text-xs text-slate-500">Salary Range</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 text-slate-600">
        <div 
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
        >
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.lilac})` }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1">{job.experience}</p>
          <p className="text-xs text-slate-500">Experience</p>
        </div>
      </div>
    </div>
    
    <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{job.description}</p>
    
    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
      {job.skills.slice(0, 4).map((skill, index) => (
        <span
          key={index}
          className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200"
        >
          {skill}
        </span>
      ))}
      {job.skills.length > 4 && (
        <span className="px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-500 border border-slate-200">
          +{job.skills.length - 4} more
        </span>
      )}
    </div>
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
      <span className="text-xs sm:text-sm text-slate-500">{job.applicants} applicants</span>
      
      {hasApplied ? (
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded-lg text-xs sm:text-sm font-medium">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Application Sent!</span>
          </div>
          <button 
            onClick={() => onViewApplication(job.id)}
            className="px-3 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-all text-xs sm:text-sm font-medium"
          >
            View Application
          </button>
        </div>
      ) : (
        <button 
          onClick={() => onApply(job)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-sm"
          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          Apply Now
        </button>
      )}
    </div>
  </div>
);

// Job Application Modal (same as before)
const JobApplicationModal = ({ isOpen, onClose, job, onSubmitApplication }) => {
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resumeFile: null,
    portfolio: '',
    expectedSalary: '',
    availableFrom: '',
    whyInterested: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmitApplication(job.id, applicationData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setApplicationData({
      coverLetter: '',
      resumeFile: null,
      portfolio: '',
      expectedSalary: '',
      availableFrom: '',
      whyInterested: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Apply for Position</h2>
              <p className="text-slate-600">{job.title} at {job.company}</p>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Letter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Cover Letter *
              </label>
              <textarea
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                required
                rows={4}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400 resize-none"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
            </div>

            {/* Why Interested */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Why are you interested in this role? *
              </label>
              <textarea
                value={applicationData.whyInterested}
                onChange={(e) => setApplicationData({...applicationData, whyInterested: e.target.value})}
                required
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400 resize-none"
                placeholder="What excites you about this opportunity?"
              />
            </div>

            {/* Portfolio Link */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Portfolio/LinkedIn URL
              </label>
              <input
                type="url"
                value={applicationData.portfolio}
                onChange={(e) => setApplicationData({...applicationData, portfolio: e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="https://linkedin.com/in/yourprofile or portfolio link"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expected Salary */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Expected Salary
                </label>
                <input
                  type="text"
                  value={applicationData.expectedSalary}
                  onChange={(e) => setApplicationData({...applicationData, expectedSalary: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., ₹5-7 LPA or Negotiable"
                />
              </div>

              {/* Available From */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Available From
                </label>
                <input
                  type="date"
                  value={applicationData.availableFrom}
                  onChange={(e) => setApplicationData({...applicationData, availableFrom: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                />
              </div>
            </div>

            {/* Resume Upload Placeholder */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Resume Upload (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                <div className="text-slate-500">
                  <p className="text-sm">Drag & drop your resume here, or click to browse</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setApplicationData({...applicationData, resumeFile: e.target.files[0]})}
                />
              </div>
              {applicationData.resumeFile && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ {applicationData.resumeFile.name} selected
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !applicationData.coverLetter.trim() || !applicationData.whyInterested.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Application Success Modal (same as before)
const ApplicationSuccessModal = ({ isOpen, onClose, jobTitle, companyName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
        <p className="text-slate-600 mb-6">
          Your application for <strong>{jobTitle}</strong> at <strong>{companyName}</strong> has been submitted successfully. 
          You'll hear back from them soon!
        </p>
        
        <button
          onClick={onClose}
          className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-all"
          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          Great, Thanks!
        </button>
      </div>
    </div>
  );
};

// Mobile Skills Filter Modal (same as before)
const MobileSkillsModal = ({ isOpen, onClose, allSkills, skillsFilter, toggleSkill, clearSkills }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Filter by Skills</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Skills ({skillsFilter.length} selected)
            </span>
            {skillsFilter.length > 0 && (
              <button
                onClick={clearSkills}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {allSkills.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`p-3 text-left rounded-lg text-sm font-medium transition-all ${
                  skillsFilter.includes(skill)
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={skillsFilter.includes(skill) 
                  ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
                  : {}
                }
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 rounded-xl font-semibold text-white transition-all"
          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          Apply Skills Filter
        </button>
      </div>
    </div>
  );
};

export default function AlumniJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [showMobileSkills, setShowMobileSkills] = useState(false);
  
  // 🎯 DEMO-FRIENDLY: Application states only persist during session (reset on refresh)
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applicationData, setApplicationDataState] = useState({});
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successJobInfo, setSuccessJobInfo] = useState({});

  const user = getCurrentUser();

  // Extract all unique skills from job postings
  const allSkills = useMemo(() => {
    const skills = new Set();
    jobPostings.forEach(job => {
      job.skills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, []);

  const toggleSkill = (skill) => {
    setSkillsFilter(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearSkills = () => {
    setSkillsFilter([]);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setSkillsFilter([]);
  };

  // 🎯 DEMO-FRIENDLY: Clear all applications for fresh demo
  const clearAllApplications = () => {
    setAppliedJobs(new Set());
    setApplicationDataState({});
  };

  // Handle job application
  const handleApplyJob = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = (jobId, appData) => {
    const newAppliedJobs = new Set(appliedJobs);
    newAppliedJobs.add(jobId);
    
    setAppliedJobs(newAppliedJobs);
    
    // Store application data in session state only
    setApplicationDataState(prev => ({
      ...prev,
      [jobId]: {
        ...appData,
        appliedDate: new Date().toISOString(),
        status: 'submitted'
      }
    }));
    
    // Show success modal
    setSuccessJobInfo({ title: selectedJob.title, company: selectedJob.company });
    setShowSuccessModal(true);
  };

  const handleViewApplication = (jobId) => {
    const application = applicationData[jobId];
    if (application) {
      alert(`Application submitted on ${new Date(application.appliedDate).toLocaleDateString()}\nStatus: ${application.status}\n\n✨ Demo Tip: Refresh the page to reset all applications for demo purposes!`);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobPostings.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || job.type === typeFilter;
      const matchesSkills = skillsFilter.length === 0 || 
                           skillsFilter.every(skill => job.skills.includes(skill));
      
      return matchesSearch && matchesType && matchesSkills && job.isActive;
    });
  }, [searchTerm, typeFilter, skillsFilter]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <AlumniNavbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header with Demo Reset Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Job Opportunities</h1>
            <p className="text-slate-600 text-sm sm:text-base">Discover career opportunities shared by fellow alumni</p>
          </div>
          <div className="flex gap-3">
            {/* Demo Reset Button - Shows only if there are applications */}
            {appliedJobs.size > 0 && (
              <button 
                onClick={clearAllApplications}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-sm"
                title="Reset all applications for demo"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset Demo</span>
              </button>
            )}
            
            <button 
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
              style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
            >
              <Plus className="w-4 h-4" />
              Post Job
            </button>
          </div>
        </div>


        {/* Enhanced Statistics */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Total Jobs</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{jobPostings.filter(j => j.isActive).length}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Briefcase className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Full-time</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{jobPostings.filter(j => j.isActive && j.type === 'Full-time').length}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
              >
                <Clock className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Applied</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{appliedJobs.size}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
              >
                <CheckCircle className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.lilac})` }} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Internships</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{jobPostings.filter(j => j.isActive && j.type === 'Internship').length}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Code className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters (keeping existing code but making it more compact) */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 hover:border-slate-300 transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Filters Row */}
            <div className="flex items-center gap-4">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:outline-none text-sm"
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
              </select>

              <button
                onClick={() => setShowMobileSkills(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all text-sm"
              >
                <Code className="w-4 h-4" />
                <span>Skills {skillsFilter.length > 0 && `(${skillsFilter.length})`}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {(typeFilter !== "all" || skillsFilter.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {filteredJobs.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-slate-600">
              Showing {filteredJobs.length} of {jobPostings.filter(j => j.isActive).length} job opportunities
              {appliedJobs.size > 0 && ` • ${appliedJobs.size} applications submitted`}
            </p>
          </div>
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              hasApplied={appliedJobs.has(job.id)}
              onApply={handleApplyJob}
              onViewApplication={handleViewApplication}
            />
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
              style={{ backgroundImage: `linear-gradient(135deg, rgba(${brand.indigo}, 0.1), rgba(${brand.coral}, 0.1))` }}
            >
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: `rgb(${brand.indigo})` }} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">No jobs found</h3>
            <p className="text-slate-600 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
              We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={clearAllFilters}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-white shadow-sm hover:shadow-lg transition-all text-sm"
                style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
              >
                Show All Jobs
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all text-sm">
                Post a Job
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <MobileSkillsModal
        isOpen={showMobileSkills}
        onClose={() => setShowMobileSkills(false)}
        allSkills={allSkills}
        skillsFilter={skillsFilter}
        toggleSkill={toggleSkill}
        clearSkills={clearSkills}
      />

      <JobApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        job={selectedJob}
        onSubmitApplication={handleSubmitApplication}
      />

      <ApplicationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        jobTitle={successJobInfo.title}
        companyName={successJobInfo.company}
      />
    </div>
  );
}
