import { useState } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { recentEvents } from "../../data/adminMockData";
import { getCurrentUser } from "../../utils/auth";
import {
  Calendar, MapPin, Users, Clock, Filter, Search, Star, ExternalLink, ChevronDown, X, CheckCircle
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

const EventCard = ({ event, isRegistered, onRegister, onUnregister }) => (
  <div className="group bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-xl hover:border-slate-300 transition-all transform hover:-translate-y-1">
    {/* Header with gradient accent */}
    <div className="relative mb-3 sm:mb-4">
      <div 
        className="absolute top-0 left-0 w-full h-1 rounded-t-xl"
        style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
      />
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pt-3 gap-2">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors line-clamp-2">
          {event.name}
        </h3>
        <div className="flex gap-2">
          <span className={`self-start px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full flex-shrink-0 ${
            event.status === 'Upcoming' 
              ? 'text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
          style={event.status === 'Upcoming' 
            ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }
            : {}
          }>
            {event.status}
          </span>
          
          {/* Registration Status Badge */}
          {isRegistered && (
            <span className="self-start px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full flex-shrink-0 bg-green-100 text-green-800 border border-green-200">
              Registered
            </span>
          )}
        </div>
      </div>
    </div>
    
    {/* Event Details */}
    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3 text-slate-600">
        <div 
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
        >
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.indigo})` }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1">
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric', 
              month: 'long',
              day: 'numeric' 
            })}
          </p>
          <p className="text-xs text-slate-500">Event Date</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 text-slate-600">
        <div 
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
        >
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.coral})` }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1">{event.venue}</p>
          <p className="text-xs text-slate-500">Venue</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 text-slate-600">
        <div 
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
        >
          <Users className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.lilac})` }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-900">{event.attendees} People</p>
          <p className="text-xs text-slate-500">Expected Attendance</p>
        </div>
      </div>
    </div>
    
    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-2">
      {event.status === 'Upcoming' ? (
        <>
          {isRegistered ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-green-100 text-green-800 rounded-lg text-xs sm:text-sm font-medium flex-1">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>You're Registered!</span>
              </div>
              <button
                onClick={() => onUnregister(event.id)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all text-xs sm:text-sm font-medium"
              >
                Cancel Registration
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onRegister(event.id)}
              className="flex-1 py-2.5 sm:py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
              style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
            >
              Register Now
            </button>
          )}
          <button className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </>
      ) : (
        <button className="w-full py-2.5 sm:py-3 rounded-lg font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200 text-sm sm:text-base">
          View Event Summary
        </button>
      )}
    </div>
  </div>
);

// Mobile Filter Modal Component
const MobileFiltersModal = ({ isOpen, onClose, statusFilter, setStatusFilter }) => {
  if (!isOpen) return null;

  const statusOptions = [
    { value: "all", label: "All Events" },
    { value: "Upcoming", label: "Upcoming Events" },
    { value: "Completed", label: "Past Events" },
    { value: "registered", label: "My Registered Events" }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Filter Events</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Event Status</h4>
            <div className="grid grid-cols-1 gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    statusFilter === option.value
                      ? 'text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={statusFilter === option.value 
                    ? { backgroundColor: `rgb(${brand.indigo})` }
                    : {}
                  }
                >
                  {option.label}
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
          Apply Filter
        </button>
      </div>
    </div>
  );
};

// Registration Success Modal
const RegistrationModal = ({ isOpen, onClose, eventName, isSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isSuccess ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isSuccess ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <X className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {isSuccess ? 'Registration Successful!' : 'Registration Cancelled'}
          </h3>
          
          <p className="text-slate-600 mb-6">
            {isSuccess 
              ? `You have successfully registered for "${eventName}". You will receive a confirmation email shortly.`
              : `Your registration for "${eventName}" has been cancelled.`
            }
          </p>
          
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-all"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AlumniEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState(new Set()); // Track registered events
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [modalEventName, setModalEventName] = useState("");
  const [modalIsSuccess, setModalIsSuccess] = useState(true);
  
  const user = getCurrentUser();

  // Load registered events from localStorage on mount
  useState(() => {
    const saved = localStorage.getItem(`alumni_registrations_${user?.id}`);
    if (saved) {
      setRegisteredEvents(new Set(JSON.parse(saved)));
    }
  }, [user?.id]);

  // Handle event registration
  const handleRegister = (eventId) => {
    const event = recentEvents.find(e => e.id === eventId);
    if (!event) return;

    const newRegisteredEvents = new Set(registeredEvents);
    newRegisteredEvents.add(eventId);
    
    setRegisteredEvents(newRegisteredEvents);
    localStorage.setItem(`alumni_registrations_${user?.id}`, JSON.stringify([...newRegisteredEvents]));
    
    setModalEventName(event.name);
    setModalIsSuccess(true);
    setShowRegistrationModal(true);
  };

  // Handle event unregistration
  const handleUnregister = (eventId) => {
    const event = recentEvents.find(e => e.id === eventId);
    if (!event) return;

    const newRegisteredEvents = new Set(registeredEvents);
    newRegisteredEvents.delete(eventId);
    
    setRegisteredEvents(newRegisteredEvents);
    localStorage.setItem(`alumni_registrations_${user?.id}`, JSON.stringify([...newRegisteredEvents]));
    
    setModalEventName(event.name);
    setModalIsSuccess(false);
    setShowRegistrationModal(true);
  };

  const filteredEvents = recentEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         event.status === statusFilter ||
                         (statusFilter === "registered" && registeredEvents.has(event.id));
    
    return matchesSearch && matchesStatus;
  });

  const upcomingCount = recentEvents.filter(e => e.status === 'Upcoming').length;
  const completedCount = recentEvents.filter(e => e.status === 'Completed').length;
  const registeredCount = registeredEvents.size;

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <AlumniNavbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Alumni Events</h1>
          <p className="text-slate-600 text-sm sm:text-base">Stay connected with upcoming events and past gatherings</p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Total Events</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{recentEvents.length}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Calendar className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">Upcoming</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{upcomingCount}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
              >
                <Star className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm font-medium text-slate-600">My Events</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{registeredCount}</p>
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
                <p className="text-xs sm:text-sm font-medium text-slate-600">Completed</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900">{completedCount}</p>
              </div>
              <div 
                className="w-6 h-6 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mx-auto sm:mx-0 mt-1 sm:mt-0"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Clock className="w-3 h-3 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
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
                placeholder="Search events by name or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 hover:border-slate-300 transition-colors text-sm sm:text-base"
              />
            </div>
            
            {/* Desktop Filter */}
            <div className="hidden sm:block">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-lg py-3 pl-12 pr-8 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 hover:border-slate-300 transition-colors"
                >
                  <option value="all">All Events</option>
                  <option value="Upcoming">Upcoming Events</option>
                  <option value="Completed">Past Events</option>
                  <option value="registered">My Registered Events</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="flex items-center justify-between sm:hidden">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filter Events</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {(statusFilter !== "all") && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Active Filters */}
            {(searchTerm || statusFilter !== "all") && (
              <div className="flex flex-wrap items-center gap-2 pt-3 sm:pt-4 border-t border-slate-200">
                <span className="text-sm text-slate-600">Active filters:</span>
                {searchTerm && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Search: "{searchTerm}"
                  </span>
                )}
                {statusFilter !== "all" && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Status: {statusFilter === "registered" ? "My Events" : statusFilter}
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

        {/* Results Summary */}
        {filteredEvents.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-slate-600">
              Showing {filteredEvents.length} of {recentEvents.length} events
              {statusFilter === "registered" && ` (${registeredCount} registered)`}
            </p>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              isRegistered={registeredEvents.has(event.id)}
              onRegister={handleRegister}
              onUnregister={handleUnregister}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
            >
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
              {statusFilter === "registered" ? "No registered events" : "No events found"}
            </h3>
            <p className="text-slate-600 mb-4 text-sm sm:text-base">
              {statusFilter === "registered" 
                ? "You haven't registered for any events yet. Explore upcoming events to join!" 
                : "Try adjusting your search or filters to find more events"
              }
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg font-medium text-white shadow-sm hover:shadow-md transition-all text-sm"
              style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
            >
              {statusFilter === "registered" ? "Browse All Events" : "Show All Events"}
            </button>
          </div>
        )}
      </main>

      {/* Mobile Filters Modal */}
      <MobileFiltersModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Registration Success/Cancellation Modal */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        eventName={modalEventName}
        isSuccess={modalIsSuccess}
      />
    </div>
  );
}
