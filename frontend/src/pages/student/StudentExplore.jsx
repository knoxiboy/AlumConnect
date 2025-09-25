import React, { useState, useMemo } from "react";
import StudentNavbar from "../../layouts/StudentNavbar";
import { alumniProfiles } from "../../data/alumni";
import { studentProfiles } from "../../data/students";
import {
  Search, Filter, MapPin, Briefcase, Calendar,
  MessageCircle, UserPlus, ExternalLink, Users, ChevronDown, X
} from "lucide-react";

/*
  StudentExplore.jsx
  - Consolidated and corrected version of your file
  - Adds missing handlers and small helper components so file is self-contained
*/

const brand = {
  indigo: '153 102 204',   // #9966CC
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

/* ---------------------------
   Small reusable components
   --------------------------- */

/* StudentCard - simple placeholder for student directory view */
const StudentCard = ({ student }) => {
  if (!student) return null;
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{student.name}</h4>
          <p className="text-xs text-slate-600">{student.course || student.year}</p>
          <p className="text-xs text-slate-500 line-clamp-2">{student.bio}</p>
        </div>
        <button className="px-3 py-1 bg-slate-100 rounded-lg text-xs">View</button>
      </div>
    </div>
  );
};

/* FormModal - small modal to handle connect / mentorship actions */
const FormModal = ({ isOpen, onClose, title, item, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-lg mx-auto mt-20 bg-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-slate-600">Do you want to proceed with the action for:</p>
          <p className="font-medium text-slate-900 mt-2">{item?.name}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-100">Cancel</button>
          <button
            onClick={() => { onSubmit && onSubmit(); onClose(); }}
            className="px-4 py-2 rounded-lg text-white"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   AlumniCard (from your original file)
   --------------------------- */
const AlumniCard = ({ alumni, onConnect, onRequestMentorship, connectionStatus }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
      <div
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0 mx-auto sm:mx-0"
        style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
      >
        {alumni.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">{alumni.name}</h3>
            <p className="text-slate-600 font-medium text-sm sm:text-base line-clamp-1">{alumni.currentRole}</p>
            <p className="text-slate-600 text-sm sm:text-base line-clamp-1">{alumni.company}</p>
          </div>
          {alumni.mentoring && (
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 self-center sm:self-start flex-shrink-0">
              Available for Mentoring
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center justify-center sm:justify-start gap-1">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Class of {alumni.graduationYear}</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{alumni.location}</span>
          </div>
        </div>

        <p className="text-slate-600 mt-2 sm:mt-3 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
          {alumni.bio}
        </p>

        <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mt-2 sm:mt-3">
          {alumni.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700"
            >
              {skill}
            </span>
          ))}
          {alumni.skills.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-500">
              +{alumni.skills.length - 4} more
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button
            onClick={() => onRequestMentorship && onRequestMentorship(alumni.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-white transition-all"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
          >
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            {connectionStatus === 'mentorship_requested' ? 'Requested' : 'Request Mentorship'}
          </button>
          <button
            onClick={() => onConnect && onConnect(alumni.id)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            {connectionStatus === 'pending' ? 'Pending' : 'Connect'}
          </button>
          {alumni.linkedin && (
            <a
              href={alumni.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium transition-colors rounded-lg hover:bg-slate-50"
              style={{ color: `rgb(${brand.indigo})` }}
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* ---------------------------
   Mobile Filters Modal
   --------------------------- */
const MobileFiltersModal = ({ isOpen, onClose, filterCompany, setFilterCompany, showMentorsOnly, setShowMentorsOnly, companies }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Company Filter */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Company</h4>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
              <button
                onClick={() => setFilterCompany("all")}
                className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  filterCompany === "all"
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={filterCompany === "all"
                  ? { backgroundColor: `rgb(${brand.indigo})` }
                  : {}
                }
              >
                All Companies
              </button>
              {companies.map((company) => (
                <button
                  key={company}
                  onClick={() => setFilterCompany(company)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    filterCompany === company
                      ? 'text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={filterCompany === company
                    ? { backgroundColor: `rgb(${brand.indigo})` }
                    : {}
                  }
                >
                  {company}
                </button>
              ))}
            </div>
          </div>

          {/* Mentors Only Filter */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Availability</h4>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setShowMentorsOnly(false)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  !showMentorsOnly
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={!showMentorsOnly
                  ? { backgroundColor: `rgb(${brand.coral})` }
                  : {}
                }
              >
                All Alumni
              </button>
              <button
                onClick={() => setShowMentorsOnly(true)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  showMentorsOnly
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={showMentorsOnly
                  ? { backgroundColor: `rgb(${brand.coral})` }
                  : {}
                }
              >
                Available for Mentoring Only
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 rounded-xl font-semibold text-white transition-all"
          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

/* ---------------------------
   AlumniListModal
   - supports both showing alumni list and a company list
   - expects onCompanyClick prop or setFilterCompany prop to be provided
   --------------------------- */
const AlumniListModal = ({ isOpen, onClose, title, alumniList, companies, onCompanyClick, onConnect, onRequestMentorship, connectionStatuses, setFilterCompany }) => {
  if (!isOpen) return null;

  // fallback when consumer didn't pass onCompanyClick (use setFilterCompany if available)
  const handleCompanyButton = (company) => {
    if (typeof onCompanyClick === 'function') {
      onCompanyClick(company);
    } else if (typeof setFilterCompany === 'function') {
      setFilterCompany(company);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {alumniList && alumniList.length > 0 && (
          <div className="space-y-4">
            {alumniList.map(alumni => (
              <AlumniCard
                key={alumni.id}
                alumni={alumni}
                onConnect={onConnect}
                onRequestMentorship={onRequestMentorship}
                connectionStatus={connectionStatuses[alumni.id] || null}
              />
            ))}
          </div>
        )}

        {(!alumniList || alumniList.length === 0) && companies && companies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
            {companies.map(company => (
              <button
                key={company}
                onClick={() => handleCompanyButton(company)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg p-4 text-left transition-colors"
              >
                {company}
              </button>
            ))}
          </div>
        )}

        {!alumniList && (!companies || companies.length === 0) && (
          <div className="text-center text-slate-500 py-12">No data to display.</div>
        )}
      </div>
    </div>
  );
};

/* ---------------------------
   Main component - StudentExplore
   --------------------------- */

export default function StudentExplore() {
  // Search / filters / view stats
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [showMentorsOnly, setShowMentorsOnly] = useState(false);
  const [directoryView, setDirectoryView] = useState("alumni"); // "alumni" or "student"
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Modals and modal content
  const [showListModal, setShowListModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAlumniList, setModalAlumniList] = useState(null);
  const [modalCompaniesList, setModalCompaniesList] = useState(null);

  // Form modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [formModalContent, setFormModalContent] = useState(null);

  // Maintain connection status per alumni id
  const [connectionStatuses, setConnectionStatuses] = useState({});

  // Extract unique companies from imported data
  const companies = useMemo(() => {
    return [...new Set(alumniProfiles.map(profile => profile.company))].filter(Boolean);
  }, []);

  /* ---------------------------
     Derived dataset and filtering
     --------------------------- */

  // Filter alumni based on search and filter criteria
  const filteredAlumni = useMemo(() => {
    return alumniProfiles.filter(alumni => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = !term ||
        alumni.name.toLowerCase().includes(term) ||
        (alumni.company || "").toLowerCase().includes(term) ||
        (alumni.currentRole || "").toLowerCase().includes(term) ||
        (alumni.skills || []).some(skill => skill.toLowerCase().includes(term));

      const matchesCompany = filterCompany === "all" || alumni.company === filterCompany;
      const matchesMentors = !showMentorsOnly || alumni.mentoring;

      return matchesSearch && matchesCompany && matchesMentors;
    });
  }, [searchTerm, filterCompany, showMentorsOnly]);

  // Data shown depending on directory view
  const currentData = directoryView === "alumni" ? filteredAlumni : studentProfiles;

  /* ---------------------------
     Handlers
     --------------------------- */

  // Called when a stat card is clicked (Total / Companies / Mentors)
  const handleStatCardClick = (type) => {
    if (type === "total") {
      setModalTitle("All Alumni");
      setModalAlumniList(alumniProfiles);
      setModalCompaniesList(null);
      setShowListModal(true);
    } else if (type === "companies") {
      setModalTitle("Companies");
      setModalCompaniesList(companies);
      setModalAlumniList(null);
      setShowListModal(true);
    } else if (type === "mentors") {
      setModalTitle("Available Mentors");
      setModalAlumniList(alumniProfiles.filter(a => a.mentoring));
      setModalCompaniesList(null);
      setShowListModal(true);
    }
  };

  // When user clicks a company inside AlumniListModal (or when using setFilterCompany directly)
  const handleCompanyClickFromModal = (company) => {
    setFilterCompany(company);
    setShowListModal(false);
    // Optionally: set directoryView to alumni so user sees filtered alumni
    setDirectoryView("alumni");
    // Optionally clear searchTerm so user sees full list for that company
    // setSearchTerm("");
  };

  // Connect action
  const handleConnect = (id) => {
    setConnectionStatuses(prev => ({ ...prev, [id]: 'pending' }));
    // (Optional) request to backend to perform connect action
  };

  // Request mentorship action
  const handleRequestMentorship = (id) => {
    setConnectionStatuses(prev => ({ ...prev, [id]: 'mentorship_requested' }));
    // (Optional) request to backend
  };

  // Example form submit handler for FormModal
  const handleFormSubmit = (id, type) => {
    // placeholder — perform actual submission logic
    // type could be 'connect' or 'mentorship'
    if (type === 'connect') {
      handleConnect(id);
    } else if (type === 'mentorship') {
      handleRequestMentorship(id);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCompany("all");
    setShowMentorsOnly(false);
  };

  /* ---------------------------
     Render
     --------------------------- */
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {directoryView === "alumni" ? "Connect with Alumni" : "Explore Student Directory"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            {directoryView === "alumni"
              ? "Find mentors, explore career paths, and expand your network"
              : "Connect with fellow students and build your peer network"}
          </p>
        </div>

        {/* Directory Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-white">
            <button
              onClick={() => setDirectoryView("alumni")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                directoryView === "alumni"
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Alumni Directory
            </button>
            <button
              onClick={() => setDirectoryView("student")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                directoryView === "student"
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Student Directory
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <button
            className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-3 sm:p-4 text-center transition-transform hover:scale-105"
            onClick={() => handleStatCardClick("total")}
          >
            <div
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: '#9966CC' }}
            >
              <Users className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-slate-900">{alumniProfiles.length}</div>
            <div className="text-xs sm:text-sm text-slate-600">Total Alumni</div>
          </button>
          <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-3 sm:p-4 text-center">
            <div
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
            >
              <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-slate-900">
              {alumniProfiles.filter(a => a.mentoring).length}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Available Mentors</div>
          </div>
          <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-3 sm:p-4 text-center">
            <div
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
            >
              <Briefcase className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.lilac})` }} />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-slate-900">{companies.length}</div>
            <div className="text-xs sm:text-sm text-slate-600">Companies</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, company, role, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 text-sm sm:text-base"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-4">
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300"
              >
                <option value="all">All Companies</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg py-3 px-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showMentorsOnly}
                  onChange={(e) => setShowMentorsOnly(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-900 text-sm">Mentors Only</span>
              </label>

              <div className="flex items-center">
                <span className="text-sm text-slate-600">
                  {filteredAlumni.length} alumni found
                </span>
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="flex items-center justify-between sm:hidden">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {(filterCompany !== "all" || showMentorsOnly) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {(searchTerm || filterCompany !== "all" || showMentorsOnly) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-600">Active filters:</span>
                {searchTerm && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Search: "{searchTerm}"
                  </span>
                )}
                {filterCompany !== "all" && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Company: {filterCompany}
                  </span>
                )}
                {showMentorsOnly && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Mentors Only
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 underline ml-auto"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 sm:space-y-6">
          {currentData.length > 0 ? (
            <>
              <div className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
                Showing {currentData.length} {directoryView === "alumni" ? "alumni" : "students"}
                {showMentorsOnly && " available for mentoring"}
              </div>
              {directoryView === "alumni"
                ? filteredAlumni.map(alumni => (
                    <AlumniCard
                      key={alumni.id}
                      alumni={alumni}
                      onConnect={(id) => {
                        // optional: open confirmation form modal
                        setFormModalContent({ title: "Connect with Alumni", alumni: alumni, type: 'connect' });
                        setShowFormModal(true);
                        // or call handleConnect directly
                        // handleConnect(id);
                      }}
                      onRequestMentorship={(id) => {
                        setFormModalContent({ title: "Request Mentorship", alumni: alumni, type: 'mentorship' });
                        setShowFormModal(true);
                      }}
                      connectionStatus={connectionStatuses[alumni.id] || null}
                    />
                  ))
                : studentProfiles.map(student => <StudentCard key={student.id} student={student} />)
              }
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="text-slate-400 mb-4">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                No {directoryView === "alumni" ? "alumni" : "students"} found
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg font-medium text-white shadow-sm hover:shadow-lg transition-all text-sm"
                style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Filters Modal */}
      <MobileFiltersModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filterCompany={filterCompany}
        setFilterCompany={setFilterCompany}
        showMentorsOnly={showMentorsOnly}
        setShowMentorsOnly={setShowMentorsOnly}
        companies={companies}
      />

      {/* Alumni List Modal */}
      <AlumniListModal
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
        title={modalTitle}
        alumniList={modalAlumniList}
        companies={modalCompaniesList}
        onCompanyClick={handleCompanyClickFromModal}
        onConnect={(id) => handleConnect(id)}
        onRequestMentorship={(id) => handleRequestMentorship(id)}
        connectionStatuses={connectionStatuses}
        setFilterCompany={setFilterCompany}
      />

      {/* Form Modal */}
      {showFormModal && formModalContent && (
        <FormModal
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          title={formModalContent.title}
          item={formModalContent.alumni}
          onSubmit={() => handleFormSubmit(formModalContent.alumni.id, formModalContent.type)}
        />
      )}
    </div>
  );
}
