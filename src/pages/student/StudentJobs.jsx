import { useState, useMemo } from "react";
import StudentNavbar from "../../layouts/StudentNavbar";
import { jobPostings } from "../../data/jobs";
import { getCurrentUser } from "../../utils/auth";
import {
  Briefcase, MapPin, DollarSign, Clock, Search, Filter, 
  BookOpen, Send, Heart, ExternalLink, X, Code, Target, TrendingUp, CheckCircle, RotateCcw
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

const JobCard = ({ job, isApplied, isSaved, onApply, onSave, onViewApplication }) => (
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
            <button 
              onClick={() => onSave(job.id)}
              className={`p-2 rounded-lg transition-all ${
                isSaved 
                  ? 'text-red-500 bg-red-50 border border-red-200' 
                  : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full flex-shrink-0 ${
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
            
            {isApplied && (
              <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full flex-shrink-0 bg-green-100 text-green-800 border border-green-200">
                Applied
              </span>
            )}
            
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
          <p className="text-xs text-slate-500">Experience Required</p>
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
      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
        <span>{job.applicants} applicants</span>
        <span>Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
      
      {isApplied ? (
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
        <div className="flex gap-2">
          <button 
            onClick={() => onApply(job.id)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-xs sm:text-sm"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
          >
            Apply Now
          </button>
          <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200">
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
          </button>
        </div>
      )}
    </div>
  </div>
);

export default function StudentJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [skillsFilter, setSkillsFilter] = useState([]);
  
  // 🎯 DEMO-FRIENDLY: Application states only persist during session (reset on refresh)
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [savedJobs, setSavedJobs] = useState(new Set([1, 4])); // Mock some saved jobs
  const [applicationData, setApplicationDataState] = useState({});

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

  const handleApply = (jobId) => {
    const newAppliedJobs = new Set(appliedJobs);
    newAppliedJobs.add(jobId);
    setAppliedJobs(newAppliedJobs);
    
    // Store application data in session state only
    setApplicationDataState(prev => ({
      ...prev,
      [jobId]: {
        appliedDate: new Date().toISOString(),
        status: 'submitted'
      }
    }));
  };

  const handleSave = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
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
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = typeFilter === "all" || job.type === typeFilter;
      const matchesSkills = skillsFilter.length === 0 || 
                           skillsFilter.every(skill => job.skills.includes(skill));
      
      return matchesSearch && matchesType && matchesSkills && job.isActive;
    });
  }, [searchTerm, typeFilter, skillsFilter]);

  const internships = filteredJobs.filter(job => job.type === 'Internship');
  const fullTimeJobs = filteredJobs.filter(job => job.type === 'Full-time');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <StudentNavbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header with Demo Reset Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Job Opportunities</h1>
            <p className="text-slate-600 text-sm sm:text-base">Discover exclusive opportunities shared by alumni mentors</p>
          </div>
          
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
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Internships</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{internships.length}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <BookOpen className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Full-time</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{fullTimeJobs.length}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
              >
                <Briefcase className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
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
                <Send className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.lilac})` }} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Saved</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{savedJobs.size}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
              >
                <Heart className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, company, or skills..."
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
                <option value="Internship">Internships</option>
                <option value="Full-time">Full-time</option>
              </select>

              {skillsFilter.length > 0 && (
                <button
                  onClick={() => setSkillsFilter([])}
                  className="text-sm text-red-600 hover:text-red-700 underline"
                >
                  Clear skills ({skillsFilter.length})
                </button>
              )}

              {(typeFilter !== "all" || skillsFilter.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 underline ml-auto"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Skills Filter */}
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    skillsFilter.includes(skill)
                      ? 'text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                  style={skillsFilter.includes(skill) 
                    ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
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
              <div className="flex flex-wrap items-center gap-2 pt-3 sm:pt-4 border-t border-slate-200">
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
              isApplied={appliedJobs.has(job.id)}
              isSaved={savedJobs.has(job.id)}
              onApply={handleApply}
              onSave={handleSave}
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
                Set Job Alerts
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
