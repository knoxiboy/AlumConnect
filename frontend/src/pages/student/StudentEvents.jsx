import { useState } from "react";
import StudentNavbar from "../../components/navigation/StudentNavbar";
import { recentEvents } from "../../data/adminMockData";
import {
  Calendar, MapPin, Users, Clock, Filter, Search, CheckCircle, ChevronDown, X, Check, Star
} from "lucide-react";

const brand = {
  indigo: '153 102 204',   // #9966CC
  lilac: '153 102 204',  // #9966CC
  coral: '194 95 58',  // #c25f3a
};

// New Event Details Modal Component
const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed bottom-0 left-0 right-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 bg-white rounded-t-2xl lg:rounded-xl p-6 max-h-[90vh] overflow-y-auto w-full lg:max-w-xl shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-4">
          <h3 className="text-xl font-bold text-slate-900 line-clamp-2">{event.name}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-slate-700 text-sm">{event.description}</p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Calendar className="w-4 h-4" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
              <span className="text-sm text-slate-600">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
              >
                <MapPin className="w-4 h-4" style={{ color: `rgb(${brand.coral})` }} />
              </div>
              <span className="text-sm text-slate-600">{event.venue}</span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Users className="w-4 h-4" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
              <span className="text-sm text-slate-600">{event.attendees} registered</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full lg:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: `rgb(${brand.indigo})` }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


const EventCard = ({ event, isRegistered, onRegister, onViewDetails }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2">
      <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 flex-1">
        {event.name}
      </h3>
      <span className={`self-start px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full flex-shrink-0 ${event.status === 'Upcoming'
        ? 'bg-green-100 text-green-800'
        : 'bg-gray-100 text-gray-800'
        }`}>
        {event.status}
      </span>
    </div>

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
          style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
        >
          <Users className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: `rgb(${brand.indigo})` }} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-900">{event.attendees} People</p>
          <p className="text-xs text-slate-500">Expected Attendance</p>
        </div>
      </div>
    </div>

    {event.status === 'Upcoming' ? (
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        {isRegistered ? (
          <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-100 text-green-800 rounded-lg text-xs sm:text-sm font-medium">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Registered
          </div>
        ) : (
          <button
            onClick={() => onRegister(event.id)}
            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg font-semibold text-white transition-all text-xs sm:text-sm"
            style={{ backgroundColor: `rgb(${brand.indigo})` }}
          >
            Register Now
          </button>
        )}
        <button
          onClick={() => onViewDetails(event)}
          className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors text-white"
          style={{ backgroundColor: '#c25f3a' }}
        >
          View Details
        </button>
      </div>
    ) : (
      <button
        onClick={() => onViewDetails(event)}
        className="w-full py-2 rounded-lg font-semibold text-white transition-all text-xs sm:text-sm"
        style={{ backgroundColor: '#c25f3a' }}
      >
        View Event Summary
      </button>
    )}
  </div>
);

// Mobile Filter Modal Component
const MobileFiltersModal = ({ isOpen, onClose, statusFilter, setStatusFilter }) => {
  if (!isOpen) return null;

  const statusOptions = [
    { value: "all", label: "All Events" },
    { value: "Upcoming", label: "Upcoming Events" },
    { value: "Completed", label: "Past Events" },
    { value: "registered", label: "Registered Events" }
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
                  className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${statusFilter === option.value
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
          style={{ backgroundColor: `rgb(${brand.indigo})` }}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default function StudentEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [registeredEvents, setRegisteredEvents] = useState([1, 3]); // Mock registered event IDs
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState(null);

  const handleRegister = (eventId) => {
    setRegisteredEvents(prev => [...prev, eventId]);
  };

  const handleViewDetails = (event) => {
    setSelectedEventForDetails(event);
    setShowDetailsModal(true);
  };

  const handleStatCardClick = (filterValue) => {
    setStatusFilter(filterValue);
  };

  const filteredEvents = recentEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesStatus = false;
    if (statusFilter === "all") {
      matchesStatus = true;
    } else if (statusFilter === "registered") {
      matchesStatus = registeredEvents.includes(event.id);
    } else {
      matchesStatus = event.status === statusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Student Events</h1>
          <p className="text-slate-600 text-sm sm:text-base">Join events to network with alumni and fellow students</p>
        </div>

        {/* Registration Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <button
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all text-left group"
            onClick={() => handleStatCardClick("registered")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Events Registered</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">{registeredEvents.length}</p>
              </div>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
            </div>
          </button>

          <button
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all text-left group"
            onClick={() => handleStatCardClick("Upcoming")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Upcoming Events</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">
                  {recentEvents.filter(e => e.status === 'Upcoming').length}
                </p>
              </div>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
              >
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
              </div>
            </div>
          </button>

          <button
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all text-left group"
            onClick={() => handleStatCardClick("Completed")}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Past Events</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">
                  {recentEvents.filter(e => e.status === 'Completed').length}
                </p>
              </div>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
            </div>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 text-sm sm:text-base"
              />
            </div>

            {/* Desktop Filter */}
            <div className="hidden sm:block">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300"
              >
                <option value="all">All Events</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Past Events</option>
                <option value="registered">Registered</option>
              </select>
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

              {statusFilter !== "all" && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  Clear filter
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
                    Status: {statusFilter === 'registered' ? 'Registered' : statusFilter}
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
            </p>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              isRegistered={registeredEvents.includes(event.id)}
              onRegister={handleRegister}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No events found</h3>
            <p className="text-slate-600 text-sm sm:text-base mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg font-medium text-white shadow-sm hover:shadow-lg transition-all text-sm"
              style={{ backgroundColor: `rgb(${brand.indigo})` }}
            >
              Show All Events
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

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        event={selectedEventForDetails}
      />
    </div>
  );
}


