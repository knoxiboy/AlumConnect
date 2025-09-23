import { useState } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { alumniProfiles } from "../../data/alumni";
import { studentProfiles } from "../../data/students";
import {
  Search, Filter, MapPin, Briefcase, Calendar, Users, GraduationCap,
  MessageCircle, UserPlus, ExternalLink, ChevronDown, X
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

const AlumniCard = ({ alumni, onConnect, onMessage, isConnected, hasMessaged, isConnecting, isMessaging }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0 mx-auto sm:mx-0"
        style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
      >
        {alumni.name.split(' ').map(n => n[0]).join('')}
      </div>
      
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">{alumni.name}</h3>
        <p className="text-slate-600 font-medium text-sm sm:text-base line-clamp-1">{alumni.currentRole}</p>
        <p className="text-slate-600 text-sm sm:text-base line-clamp-1">{alumni.company}</p>
        
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
          {alumni.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700"
            >
              {skill}
            </span>
          ))}
          {alumni.skills.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-500">
              +{alumni.skills.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button 
            onClick={() => onMessage(alumni)}
            disabled={isMessaging || hasMessaged}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors
              ${hasMessaged 
                ? 'bg-green-100 text-green-800 cursor-not-allowed'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }
              ${isMessaging && 'opacity-70 cursor-wait'}`
            }
          >
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            {isMessaging ? 'Sending...' : (hasMessaged ? 'Message Sent' : 'Message')}
          </button>
          
          <button 
            onClick={() => onConnect(alumni.id)}
            disabled={isConnecting || isConnected}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors
              ${isConnected 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }
              ${isConnecting && 'opacity-70 cursor-wait'}`
            }
          >
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            {isConnecting ? 'Connecting...' : (isConnected ? 'Connected' : 'Connect')}
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

const StudentCard = ({ student }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0 mx-auto sm:mx-0"
        style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
      >
        {student.name.split(' ').map(n => n[0]).join('')}
      </div>
      
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1">{student.name}</h3>
        <p className="text-slate-600 font-medium text-sm sm:text-base line-clamp-1">{student.degree}</p>
        <p className="text-slate-600 text-sm sm:text-base line-clamp-1">{student.year}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center justify-center sm:justify-start gap-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{student.location}</span>
          </div>
        </div>
        
        <p className="text-slate-600 mt-2 sm:mt-3 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
          {student.bio}
        </p>
        
        <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mt-2 sm:mt-3">
          {student.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700"
            >
              {skill}
            </span>
          ))}
          {student.skills.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-500">
              +{student.skills.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs sm:text-sm font-medium transition-colors">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Message
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs sm:text-sm font-medium transition-colors">
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            Connect
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Mobile Filter Modal Component
const MobileFiltersModal = ({ isOpen, onClose, filterCompany, setFilterCompany, filterLocation, setFilterLocation, companies, locations }) => {
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
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
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

          {/* Location Filter */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Location</h4>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              <button
                onClick={() => setFilterLocation("all")}
                className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                  filterLocation === "all"
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={filterLocation === "all" 
                  ? { backgroundColor: `rgb(${brand.coral})` }
                  : {}
                }
              >
                All Locations
              </button>
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setFilterLocation(location)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    filterLocation === location
                      ? 'text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={filterLocation === location 
                    ? { backgroundColor: `rgb(${brand.coral})` }
                    : {}
                  }
                >
                  {location}
                </button>
              ))}
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

// NEW: Message Modal Component
const MessageModal = ({ isOpen, onClose, recipient, onSend }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  if (!isOpen) return null;

  const handleSend = async () => {
    if (message.trim()) {
      setIsSending(true);
      await onSend(recipient.id, message);
      setIsSending(false);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Message {recipient.name}</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-sm text-slate-600 mb-4">
          You are messaging {recipient.name}, a fellow alumni from the class of {recipient.graduationYear}.
        </p>
        
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
          rows="5"
        />
        
        <div className="flex justify-end">
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className={`px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors
              ${!message.trim() || isSending
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
              }`
            }
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AlumniExplore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [directoryView, setDirectoryView] = useState("alumni"); // "alumni" or "student"
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Simulated backend state for connections and messages
  const [connectedAlumniIds, setConnectedAlumniIds] = useState(new Set());
  const [messagedAlumniIds, setMessagedAlumniIds] = useState(new Set());
  const [isConnecting, setIsConnecting] = useState(null); // Tracks which alumni is connecting
  const [isMessaging, setIsMessaging] = useState(null); // Tracks which alumni is messaging
  
  // NEW: State for Message Modal
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState(null);

  // Filter alumni or students based on directory view
  const filteredAlumni = alumniProfiles.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = filterCompany === "all" || alumni.company === filterCompany;
    const matchesLocation = filterLocation === "all" || alumni.location.includes(filterLocation);
    
    return matchesSearch && matchesCompany && matchesLocation;
  });

  const filteredStudents = studentProfiles.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const companies = [...new Set(alumniProfiles.map(a => a.company))];
  const locations = [...new Set(alumniProfiles.map(a => a.location.split(',')[0].trim()))];

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCompany("all");
    setFilterLocation("all");
  };
  
  const handleConnect = async (alumniId) => {
    setIsConnecting(alumniId);
    try {
      // In a real app, this would be an API call to your backend
      console.log(`Simulating API call: POST /api/connect with alumniId: ${alumniId}`);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      const newConnectedIds = new Set(connectedAlumniIds);
      newConnectedIds.add(alumniId);
      setConnectedAlumniIds(newConnectedIds);
      console.log(`Connection successful for ${alumniId}!`);
      
    } catch (error) {
      console.error(`Failed to connect with alumni ID ${alumniId}:`, error);
    } finally {
      setIsConnecting(null);
    }
  };
  
  // UPDATED: handleMessage now opens the modal
  const handleMessage = (alumni) => {
    setMessageRecipient(alumni);
    setShowMessageModal(true);
  };
  
  // NEW: handleSend logic from inside the modal
  const onSendMessage = async (alumniId, message) => {
    setIsMessaging(alumniId);
    try {
      // In a real app, this would be an API call to your backend
      console.log(`Simulating API call: POST /api/message to ${alumniId} with message: "${message}"`);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      const newMessagedIds = new Set(messagedAlumniIds);
      newMessagedIds.add(alumniId);
      setMessagedAlumniIds(newMessagedIds);
      console.log(`Message sent successfully to ${alumniId}!`);
      
    } catch (error) {
      console.error(`Failed to send message to alumni ID ${alumniId}:`, error);
    } finally {
      setIsMessaging(null);
      setShowMessageModal(false);
    }
  };

  // Get current data based on directory view
  const currentData = directoryView === "alumni" ? filteredAlumni : filteredStudents;
  const currentCount = directoryView === "alumni" ? alumniProfiles.length : studentProfiles.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <AlumniNavbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {directoryView === "alumni" ? "Explore Alumni Network" : "Explore Student Directory"}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            {directoryView === "alumni" 
              ? "Connect with fellow alumni and expand your professional network" 
              : "Connect with students and support the next generation"}
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

        {/* Search and Filters */}
        <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, company, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 text-sm sm:text-base"
              />
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4">
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
              
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Mobile Filters Button */}
            <div className="flex items-center justify-between sm:hidden">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {(filterCompany !== "all" || filterLocation !== "all") && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {(filterCompany !== "all" || filterLocation !== "all" || searchTerm) && (
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
                {filterLocation !== "all" && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Location: {filterLocation}
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-3 sm:p-4 text-center">
            <div 
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
            >
              <Users className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-slate-900">{currentCount}</div>
            <div className="text-xs sm:text-sm text-slate-600">
              {directoryView === "alumni" ? "Total Alumni" : "Total Students"}
            </div>
          </div>
          {directoryView === "alumni" ? (
            <>
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
            </>
          ) : (
            <>
              <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-3 sm:p-4 text-center">
                <div 
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
                >
                  <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-slate-900">
                  {studentProfiles.filter(s => s.lookingFor.includes("Mentorship")).length}
                </div>
                <div className="text-xs sm:text-sm text-slate-600">Seeking Mentorship</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-3 sm:p-4 text-center">
                <div 
                  className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
                >
                  <Briefcase className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.lilac})` }} />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-slate-900">
                  {new Set(studentProfiles.flatMap(s => s.lookingFor)).size}
                </div>
                <div className="text-xs sm:text-sm text-slate-600">Opportunities</div>
              </div>
            </>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4 sm:space-y-6">
          {currentData.length > 0 ? (
            <>
              <div className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
                Showing {currentData.length} {directoryView === "alumni" ? "alumni" : "students"}
              </div>
              {currentData.map(item => (
                directoryView === "alumni" 
                  ? <AlumniCard 
                      key={item.id} 
                      alumni={item}
                      onConnect={handleConnect}
                      onMessage={handleMessage}
                      isConnected={connectedAlumniIds.has(item.id)}
                      hasMessaged={messagedAlumniIds.has(item.id)}
                      isConnecting={isConnecting === item.id}
                      isMessaging={isMessaging === item.id}
                    />
                  : <StudentCard key={item.id} student={item} />
              ))}
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
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        companies={companies}
        locations={locations}
      />
      
      {/* Message Modal */}
      {messageRecipient && (
        <MessageModal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          recipient={messageRecipient}
          onSend={onSendMessage}
        />
      )}
    </div>
  );
}