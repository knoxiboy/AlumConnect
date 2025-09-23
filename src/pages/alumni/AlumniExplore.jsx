import { useState } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { alumniProfiles } from "../../data/alumni";
import {
  Search, Filter, MapPin, Briefcase, Calendar,
  MessageCircle, UserPlus, ExternalLink, ChevronDown, X
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

const AlumniCard = ({ alumni }) => (
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
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs sm:text-sm font-medium transition-colors">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Message
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs sm:text-sm font-medium transition-colors">
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            Connect
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

export default function AlumniExplore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredAlumni = alumniProfiles.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = filterCompany === "all" || alumni.company === filterCompany;
    const matchesLocation = filterLocation === "all" || alumni.location.includes(filterLocation);
    
    return matchesSearch && matchesCompany && matchesLocation;
  });

  const companies = [...new Set(alumniProfiles.map(a => a.company))];
  const locations = [...new Set(alumniProfiles.map(a => a.location.split(',')[0].trim()))];

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCompany("all");
    setFilterLocation("all");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <AlumniNavbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Explore Alumni Network</h1>
          <p className="text-slate-600 text-sm sm:text-base">Connect with fellow alumni and expand your professional network</p>
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

        {/* Results */}
        <div className="space-y-4 sm:space-y-6">
          {filteredAlumni.length > 0 ? (
            <>
              <div className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
                Showing {filteredAlumni.length} alumni
              </div>
              {filteredAlumni.map(alumni => (
                <AlumniCard key={alumni.id} alumni={alumni} />
              ))}
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="text-slate-400 mb-4">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">No alumni found</h3>
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
    </div>
  );
}
