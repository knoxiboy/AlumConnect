import { useState, useMemo } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { jobPostings } from "../../data/jobs";
import { mockMentors, mockResources, mockStartups, mockProjects } from "../../data/careerData";
import { getCurrentUser } from "../../utils/auth";
import PostModal from "../../components/career/PostModal";
import {
  Briefcase, MapPin, DollarSign, Clock, Search, Filter, 
  BookOpen, Send, Heart, ExternalLink, X, Code, Target, TrendingUp, CheckCircle, RotateCcw, GraduationCap, Star,
  Plus, Users, Calendar, FileText, Lightbulb
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

const JobCard = ({ job, isPostedByUser, onViewApplications, onEdit, onDelete }) => (
  <div className="group bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-xl hover:border-slate-300 transition-all transform hover:-translate-y-1">
    {/* Header with gradient accent */}
    <div className="relative mb-3 sm:mb-4">
      <div 
        className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
        style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
      />
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pt-3 gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors line-clamp-2">
                {job.title}
              </h3>
              <p className="text-slate-600 font-medium text-sm sm:text-base line-clamp-1">{job.company}</p>
            </div>
            {isPostedByUser && (
              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                Your Post
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full flex-shrink-0 ${
              job.type === 'Full-time' 
                ? 'text-white shadow-sm'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}
            style={job.type === 'Full-time' 
              ? { backgroundColor: '#9966CC' }
              : {}
            }>
              {job.type}
            </span>
            
            <span className="text-xs sm:text-sm text-slate-500">
              Posted {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
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
        <span className="text-xs sm:text-sm line-clamp-1">{job.location}</span>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 text-slate-600">
        <div 
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
        >
          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.lilac})` }} />
        </div>
        <span className="text-xs sm:text-sm">{job.salary}</span>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 text-slate-600">
        <div 
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
        >
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.coral})` }} />
        </div>
        <span className="text-xs sm:text-sm">{job.applicants} applicants</span>
      </div>
    </div>
    
    <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{job.description}</p>
    
    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
      {job.skills.slice(0, 4).map((skill, index) => (
        <span 
          key={index} 
          className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200"
        >
          {skill}
        </span>
      ))}
      {job.skills.length > 4 && (
        <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          +{job.skills.length - 4} more
        </span>
      )}
    </div>
    
    <div className="flex flex-col sm:flex-row gap-2">
      <button 
        onClick={() => onViewApplications(job.id)}
        className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-semibold bg-slate-100 text-slate-700 border border-slate-200 transition-all text-xs sm:text-sm"
      >
        View Applications ({job.applicants})
      </button>
      {isPostedByUser && (
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(job.id)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
          >
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
          </button>
          <button 
            onClick={() => onDelete(job.id)}
            className="px-3 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors border border-red-200"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
          </button>
        </div>
      )}
    </div>
    
    <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-200 text-xs text-slate-500">
      Posted by {job.postedBy} • Deadline: {new Date(job.deadline).toLocaleDateString()}
    </div>
  </div>
);

const MentorCard = ({ mentor }) => (
  <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-xl hover:border-slate-300 transition-all">
    <div className="flex items-start gap-3 sm:gap-4">
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg"
        style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
      >
        {mentor.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">{mentor.name}</h3>
            <p className="text-slate-600 text-sm sm:text-base">{mentor.role}</p>
            <p className="text-slate-500 text-xs sm:text-sm">{mentor.company}</p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            mentor.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {mentor.status}
          </span>
        </div>
        
        <p className="text-slate-600 mt-2 text-xs sm:text-sm line-clamp-2">{mentor.bio}</p>
        
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm font-medium">{mentor.rating}</span>
          </div>
          <span className="text-xs sm:text-sm text-slate-500">{mentor.sessions} sessions</span>
          <span className="text-xs sm:text-sm text-slate-500">{mentor.experience}</span>
        </div>
        
        <div className="mt-3">
          <p className="text-xs font-medium text-slate-700 mb-1">Domains:</p>
          <div className="flex flex-wrap gap-1">
            {mentor.domains.slice(0, 2).map((domain, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700">
                {domain}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-xs font-medium text-slate-700 mb-1">Skills:</p>
          <div className="flex flex-wrap gap-1">
            {mentor.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <button 
          className="w-full mt-4 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg text-xs sm:text-sm"
          style={{ backgroundColor: '#9966CC' }}
        >
          Connect for Mentorship
        </button>
      </div>
    </div>
  </div>
);

const ResourceCard = ({ resource }) => (
  <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-xl hover:border-slate-300 transition-all">
    <div className="flex items-start gap-3 sm:gap-4">
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-white font-semibold text-lg"
        style={{ backgroundColor: '#9966CC' }}
      >
        <BookOpen className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg line-clamp-2">{resource.title}</h3>
            <p className="text-slate-600 text-sm sm:text-base">by {resource.author}</p>
          </div>
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            {resource.type}
          </span>
        </div>
        
        <p className="text-slate-600 mt-2 text-xs sm:text-sm line-clamp-2">{resource.description}</p>
        
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs sm:text-sm font-medium">{resource.rating}</span>
          </div>
          <span className="text-xs sm:text-sm text-slate-500">{resource.date}</span>
        </div>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {resource.categories.slice(0, 3).map((category, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <button 
          className="w-full mt-4 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg text-xs sm:text-sm"
          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          Access Resource
        </button>
      </div>
    </div>
  </div>
);

const StartupCard = ({ startup }) => (
  <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-xl hover:border-slate-300 transition-all">
    <div className="flex items-start gap-3 sm:gap-4">
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-white font-semibold text-lg"
        style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.coral}), rgb(${brand.lilac}))` }}
      >
        <Target className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">{startup.name}</h3>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            startup.stage === 'growth' 
              ? 'bg-green-100 text-green-800' 
              : startup.stage === 'seed' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
          }`}>
            {startup.stage}
          </span>
        </div>
        
        <p className="text-slate-600 mt-2 text-xs sm:text-sm">{startup.description}</p>
        
        <div className="mt-3">
          <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
            {startup.industry}
          </span>
        </div>
        
        <button 
          className="w-full mt-4 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg text-xs sm:text-sm"
          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          Connect with Startup
        </button>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-xl hover:border-slate-300 transition-all">
    <div className="flex items-start gap-3 sm:gap-4">
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-white font-semibold text-lg"
        style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
      >
        <Code className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg line-clamp-2">{project.title}</h3>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            project.difficulty === 'Advanced' 
              ? 'bg-red-100 text-red-800' 
              : project.difficulty === 'Intermediate' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
          }`}>
            {project.difficulty}
          </span>
        </div>
        
        <p className="text-slate-600 mt-2 text-xs sm:text-sm line-clamp-2">{project.description}</p>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs sm:text-sm text-slate-500">
            {project.currentMembers}/{project.teamSize} members
          </span>
          <span className="text-xs sm:text-sm text-slate-500">{project.category}</span>
        </div>
        
        <button 
          className="w-full mt-4 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg text-xs sm:text-sm"
          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          Lead this Project
        </button>
      </div>
    </div>
  </div>
);

const FilterSection = ({ searchTerm, setSearchTerm, children }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:border-slate-300 text-sm sm:text-base"
        />
      </div>
      <button className="px-4 py-2.5 sm:py-3 rounded-lg font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all text-sm sm:text-base flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <span className="hidden sm:inline">More Filters</span>
      </button>
    </div>
    
    {children}
  </div>
);

const PostJobModal = ({ isOpen, onClose, jobData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: jobData?.title || '',
    company: jobData?.company || '',
    location: jobData?.location || '',
    type: jobData?.type || 'Full-time',
    experience: jobData?.experience || '',
    salary: jobData?.salary || '',
    description: jobData?.description || '',
    skills: jobData?.skills?.join(', ') || '',
    deadline: jobData?.deadline || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      postedDate: jobData?.postedDate || new Date().toISOString().split('T')[0],
      applicants: jobData?.applicants || 0,
      isActive: true,
      postedBy: "You",
      id: jobData?.id || `job_${Date.now()}`
    };
    onSubmit(job);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              {jobData ? 'Edit Job Post' : 'Post New Job'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., Bangalore, India"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Experience Required
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., 0-2 years"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Salary Range
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., ₹15-25 LPA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Application Deadline *
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Job Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Describe the role, responsibilities, and requirements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Required Skills (comma separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="e.g., React, Node.js, Python, SQL"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
              >
                {jobData ? 'Update Job' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function AlumniCareerCenter() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [domainFilter, setDomainFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [industryFilter, setIndustryFilter] = useState([]);
  const [techFilter, setTechFilter] = useState([]);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  
  // New states for other posting modals
  const [showPostMentorshipModal, setShowPostMentorshipModal] = useState(false);
  const [editingMentorship, setEditingMentorship] = useState(null);
  
  const [showPostResourceModal, setShowPostResourceModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  
  const [showPostStartupModal, setShowPostStartupModal] = useState(false);
  const [editingStartup, setEditingStartup] = useState(null);
  
  const [showPostProjectModal, setShowPostProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const user = getCurrentUser();

  const clearAllFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setSkillsFilter([]);
  };

  const handlePostJob = (jobData) => {
    // In a real app, this would be an API call
    console.log('Posting job:', jobData);
    alert(`Job ${jobData.id ? 'updated' : 'posted'} successfully!`);
  };

  const handlePostMentorship = (mentorData) => {
    // In a real app, this would be an API call
    console.log('Posting mentorship:', mentorData);
    alert(`Mentorship profile ${mentorData.id ? 'updated' : 'posted'} successfully!`);
  };

  const handlePostResource = (resourceData) => {
    // In a real app, this would be an API call
    console.log('Posting resource:', resourceData);
    alert(`Resource ${resourceData.id ? 'updated' : 'posted'} successfully!`);
  };

  const handlePostStartup = (startupData) => {
    // In a real app, this would be an API call
    console.log('Posting startup:', startupData);
    alert(`Startup ${startupData.id ? 'updated' : 'posted'} successfully!`);
  };

  const handlePostProject = (projectData) => {
    // In a real app, this would be an API call
    console.log('Posting project:', projectData);
    alert(`Project ${projectData.id ? 'updated' : 'posted'} successfully!`);
  };

  const handleEditJob = (jobId) => {
    const job = jobPostings.find(j => j.id === jobId);
    setEditingJob(job);
    setShowPostJobModal(true);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      // In a real app, this would be an API call
      console.log('Deleting job:', jobId);
      alert('Job deleted successfully!');
    }
  };

  const handleViewApplications = (jobId) => {
    // In a real app, this would navigate to applications page or open a modal
    alert(`Viewing applications for job ${jobId}. In a real app, this would show all applicants.`);
  };

  const filteredJobs = useMemo(() => {
    return jobPostings.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
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
        {/* Career Center Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Career Center</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Connect with students, share opportunities, and mentor the next generation
          </p>
        </div>

        {/* Career Center Tabs */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl mb-6 sm:mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex flex-wrap space-x-4 sm:space-x-6 px-4 sm:px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'jobs'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Briefcase className="w-4 h-4 inline mr-2" />
                Jobs & Internships
              </button>
              <button
                onClick={() => setActiveTab('mentorship')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'mentorship'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Mentorship
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'resources'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Resources
              </button>
              <button
                onClick={() => setActiveTab('startups')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'startups'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Target className="w-4 h-4 inline mr-2" />
                Startups
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Lightbulb className="w-4 h-4 inline mr-2" />
                Projects
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* Jobs & Internships Tab */}
            {activeTab === 'jobs' && (
              <div>
                {/* Header with Post Job Button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Jobs & Internships</h2>
                    <p className="text-slate-600 text-sm sm:text-base">Post opportunities and manage your job listings</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setEditingJob(null);
                      setShowPostJobModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                    style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                  >
                    <Plus className="w-4 h-4" />
                    Post Job
                  </button>
                </div>
                
                {/* Filter Section */}
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search jobs..."
                        className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:border-slate-300 text-sm sm:text-base"
                      />
                    </div>
                    <button className="px-4 py-2.5 sm:py-3 rounded-lg font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all text-sm sm:text-base flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <span className="hidden sm:inline">More Filters</span>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">Filter by:</span>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:border-slate-300"
                    >
                      <option value="all">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                    
                    {(typeFilter !== "all" || skillsFilter.length > 0) && (
                      <button
                        onClick={() => {
                          setTypeFilter("all");
                          setSkillsFilter([]);
                        }}
                        className="text-sm text-slate-500 hover:text-slate-700 underline ml-auto"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                  
                  {/* Skills Filter */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['React', 'Node.js', 'Python', 'Java', 'JavaScript', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'SQL'].map(skill => (
                      <button
                        key={skill}
                        onClick={() => {
                          const newFilter = skillsFilter.includes(skill) 
                            ? skillsFilter.filter(s => s !== skill)
                            : [...skillsFilter, skill];
                          setSkillsFilter(newFilter);
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          skillsFilter.includes(skill)
                            ? 'text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                        }`}
                        style={skillsFilter.includes(skill) 
                          ? { backgroundColor: '#9966CC' }
                          : {}
                        }
                      >
                        {skill}
                        {skillsFilter.includes(skill) && (
                          <X className="w-3 h-3 ml-1 inline" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Active Filters Summary */}
                  {(searchTerm || typeFilter !== "all" || skillsFilter.length > 0) && (
                    <div className="flex flex-wrap items-center gap-2 pt-3 sm:pt-4 border-t border-slate-200 mt-3">
                      <span className="text-sm text-slate-600">Active filters:</span>
                      {searchTerm && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          Search: "{searchTerm}"
                        </span>
                      )}
                      {typeFilter !== "all" && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          Type: {typeFilter}
                        </span>
                      )}
                      {skillsFilter.length > 0 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          Skills: {skillsFilter.length} selected
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Results Summary */}
                {filteredJobs.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm text-slate-600">
                      Showing {filteredJobs.length} of {jobPostings.filter(j => j.isActive).length} job opportunities
                    </p>
                  </div>
                )}

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {filteredJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      isPostedByUser={job.postedBy === "You" || job.postedBy === user?.name}
                      onViewApplications={handleViewApplications}
                      onEdit={handleEditJob}
                      onDelete={handleDeleteJob}
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
                      <button 
                        onClick={() => {
                          setEditingJob(null);
                          setShowPostJobModal(true);
                        }}
                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all text-sm"
                      >
                        Post a Job
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mentorship Tab */}
            {activeTab === 'mentorship' && (
              <div>
                {/* Header with Post Mentorship Button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Mentorship Program</h2>
                    <p className="text-slate-600 text-sm sm:text-base">Offer your expertise and guide the next generation</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setEditingMentorship(null);
                      setShowPostMentorshipModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                    style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                  >
                    <Plus className="w-4 h-4" />
                    Offer Mentorship
                  </button>
                </div>
                
                <FilterSection 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                >
                  <div className="flex flex-wrap gap-2">
                    {['Software Engineering', 'Data Science', 'Product Management', 'UX Design', 'DevOps'].map(domain => (
                      <button
                        key={domain}
                        onClick={() => {
                          const newFilter = domainFilter.includes(domain) 
                            ? domainFilter.filter(d => d !== domain)
                            : [...domainFilter, domain];
                          setDomainFilter(newFilter);
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          domainFilter.includes(domain)
                            ? 'text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                        }`}
                        style={domainFilter.includes(domain) 
                          ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
                          : {}
                        }
                      >
                        {domain}
                        {domainFilter.includes(domain) && (
                          <X className="w-3 h-3 ml-1 inline" />
                        )}
                      </button>
                    ))}
                  </div>
                </FilterSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {mockMentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                {/* Header with Post Resource Button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Learning Resources</h2>
                    <p className="text-slate-600 text-sm sm:text-base">Share valuable resources with the community</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setEditingResource(null);
                      setShowPostResourceModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                    style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                  >
                    <Plus className="w-4 h-4" />
                    Share Resource
                  </button>
                </div>
                
                <FilterSection 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                >
                  <div className="flex flex-wrap gap-2">
                    {['Web Development', 'Data Science', 'Career Guidance', 'Product Management', 'UX Design'].map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          const newFilter = categoryFilter.includes(category) 
                            ? categoryFilter.filter(c => c !== category)
                            : [...categoryFilter, category];
                          setCategoryFilter(newFilter);
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          categoryFilter.includes(category)
                            ? 'text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                        }`}
                        style={categoryFilter.includes(category) 
                          ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
                          : {}
                        }
                      >
                        {category}
                        {categoryFilter.includes(category) && (
                          <X className="w-3 h-3 ml-1 inline" />
                        )}
                      </button>
                    ))}
                  </div>
                </FilterSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {mockResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </div>
            )}

            {/* Startups Tab */}
            {activeTab === 'startups' && (
              <div>
                {/* Header with Post Startup Button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Startup Opportunities</h2>
                    <p className="text-slate-600 text-sm sm:text-base">Connect with talent and promote your venture</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setEditingStartup(null);
                      setShowPostStartupModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                    style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                  >
                    <Plus className="w-4 h-4" />
                    Post Startup
                  </button>
                </div>
                
                <FilterSection 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                >
                  <div className="flex flex-wrap gap-2">
                    {['CleanTech', 'HealthTech', 'FinTech', 'EdTech', 'AgriTech', 'Logistics'].map(industry => (
                      <button
                        key={industry}
                        onClick={() => {
                          const newFilter = industryFilter.includes(industry) 
                            ? industryFilter.filter(i => i !== industry)
                            : [...industryFilter, industry];
                          setIndustryFilter(newFilter);
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          industryFilter.includes(industry)
                            ? 'text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                        }`}
                        style={industryFilter.includes(industry) 
                          ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
                          : {}
                        }
                      >
                        {industry}
                        {industryFilter.includes(industry) && (
                          <X className="w-3 h-3 ml-1 inline" />
                        )}
                      </button>
                    ))}
                  </div>
                </FilterSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {mockStartups.map(startup => (
                    <StartupCard key={startup.id} startup={startup} />
                  ))}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                {/* Header with Post Project Button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Project Opportunities</h2>
                    <p className="text-slate-600 text-sm sm:text-base">Create collaborative projects and find team members</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setEditingProject(null);
                      setShowPostProjectModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                    style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                  >
                    <Plus className="w-4 h-4" />
                    Create Project
                  </button>
                </div>
                
                <FilterSection 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                >
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Python', 'TensorFlow', 'Node.js', 'Docker', 'Kubernetes', 'React Native', 'AWS'].map(tech => (
                      <button
                        key={tech}
                        onClick={() => {
                          const newFilter = techFilter.includes(tech) 
                            ? techFilter.filter(t => t !== tech)
                            : [...techFilter, tech];
                          setTechFilter(newFilter);
                        }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          techFilter.includes(tech)
                            ? 'text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                        }`}
                        style={techFilter.includes(tech) 
                          ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
                          : {}
                        }
                      >
                        {tech}
                        {techFilter.includes(tech) && (
                          <X className="w-3 h-3 ml-1 inline" />
                        )}
                      </button>
                    ))}
                  </div>
                </FilterSection>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {mockProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={showPostJobModal}
        onClose={() => setShowPostJobModal(false)}
        jobData={editingJob}
        onSubmit={handlePostJob}
      />
      
      {/* Post Mentorship Modal */}
      <PostModal
        isOpen={showPostMentorshipModal}
        onClose={() => setShowPostMentorshipModal(false)}
        onSubmit={handlePostMentorship}
        postType="mentorship"
        initialData={editingMentorship}
      />
      
      {/* Post Resource Modal */}
      <PostModal
        isOpen={showPostResourceModal}
        onClose={() => setShowPostResourceModal(false)}
        onSubmit={handlePostResource}
        postType="resource"
        initialData={editingResource}
      />
      
      {/* Post Startup Modal */}
      <PostModal
        isOpen={showPostStartupModal}
        onClose={() => setShowPostStartupModal(false)}
        onSubmit={handlePostStartup}
        postType="startup"
        initialData={editingStartup}
      />
      
      {/* Post Project Modal */}
      <PostModal
        isOpen={showPostProjectModal}
        onClose={() => setShowPostProjectModal(false)}
        onSubmit={handlePostProject}
        postType="project"
        initialData={editingProject}
      />
    </div>
  );
}