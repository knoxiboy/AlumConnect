import { useState } from "react";
import Navbar from "../layouts/Navbar";
import colleges from "../data/colleges"; 
import { 
  Search, Filter, MapPin, Users, Calendar, Star, 
  GraduationCap, Building2, ExternalLink, Sparkles,
  Grid3X3, List, ChevronDown, Award, Globe, X
} from "lucide-react";
import { Link } from "react-router-dom";

// Brand colors matching landing page
const brand = {
  indigo: '118 98 214',   // #7662D6
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

// Enhanced College Card Component
const CollegeExploreCard = ({ id, name, desc, image, location, established, alumniCount, rating, viewMode }) => (
  <Link 
    to={`/college/${id}`} 
    className={`group block bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/60 hover:border-slate-300 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 ${
      viewMode === 'list' ? 'flex items-center' : ''
    }`}
  >
    <div className={`relative overflow-hidden ${
      viewMode === 'list' 
        ? 'w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0' 
        : 'w-full h-40 sm:h-48'
    }`}>
      <img 
        src={image || '/api/placeholder/400/200'} 
        alt={name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
      />
      <div className={`absolute ${viewMode === 'list' ? 'top-1 right-1' : 'top-3 right-3'}`}>
        <div 
          className="px-2 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1"
          style={{ backgroundColor: `rgb(${brand.indigo})` }}
        >
          <Star className="w-3 h-3" />
          {rating || '4.5'}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    <div className={viewMode === 'list' ? 'flex-1 p-4' : 'p-4 sm:p-6'}>
      <div className="flex items-center gap-2 mb-2">
        <GraduationCap 
          className="w-3 h-3 sm:w-4 sm:h-4" 
          style={{ color: `rgb(${brand.indigo})` }}
        />
        <span className="text-xs font-medium text-slate-500">INSTITUTION</span>
      </div>
      
      <h3 className={`font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-300 mb-2 line-clamp-2 ${
        viewMode === 'list' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
      }`}>
        {name}
      </h3>
      
      <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{desc}</p>
      
      <div className="space-y-1 sm:space-y-2 text-xs text-slate-500">
        {location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        )}
        {established && (
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>Established {established}</span>
          </div>
        )}
        {alumniCount && (
          <div className="flex items-center gap-2">
            <Users className="w-3 h-3" />
            <span>{alumniCount} Alumni</span>
          </div>
        )}
      </div>
      
      <div className="mt-3 sm:mt-4 flex items-center justify-between">
        <span 
          className="text-xs sm:text-sm font-semibold"
          style={{ color: `rgb(${brand.indigo})` }}
        >
          Explore Network
        </span>
        <ExternalLink 
          className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          style={{ color: `rgb(${brand.coral})` }}
        />
      </div>
    </div>
  </Link>
);

// Filter Component
const FilterDropdown = ({ label, options, value, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/80 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all text-sm"
      >
        {icon}
        <span className="font-medium hidden sm:inline">{label}</span>
        <span className="font-medium sm:hidden text-xs">
          {label === "Type" ? "Type" : label === "Location" ? "Loc" : "Sort"}
        </span>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-40 sm:w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
            <div className="p-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs sm:text-sm transition-colors ${
                    value === option.value 
                      ? 'bg-slate-100 font-medium' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Mobile Filter Modal
const MobileFiltersModal = ({ isOpen, onClose, typeFilter, locationFilter, sortBy, setTypeFilter, setLocationFilter, setSortBy }) => {
  if (!isOpen) return null;

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "university", label: "Universities" },
    { value: "college", label: "Colleges" },
    { value: "institute", label: "Institutes" },
  ];

  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" },
  ];

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "established", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
  ];

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
          {/* Type Filter */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Type</h4>
            <div className="grid grid-cols-2 gap-2">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTypeFilter(option.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    typeFilter === option.value
                      ? 'text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={typeFilter === option.value 
                    ? { backgroundColor: `rgb(${brand.indigo})` }
                    : {}
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Location</h4>
            <div className="grid grid-cols-2 gap-2">
              {locationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLocationFilter(option.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    locationFilter === option.value
                      ? 'text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={locationFilter === option.value 
                    ? { backgroundColor: `rgb(${brand.coral})` }
                    : {}
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-3">Sort By</h4>
            <div className="grid grid-cols-1 gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === option.value
                      ? 'text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={sortBy === option.value 
                    ? { backgroundColor: `rgb(${brand.lilac})` }
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
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, number, label, color }) => (
  <div className="bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-xl p-4 sm:p-6 text-center">
    <div 
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3"
      style={{ backgroundColor: `rgba(${color}, 0.1)` }}
    >
      <div style={{ color: `rgb(${color})` }}>{icon}</div>
    </div>
    <div className="text-xl sm:text-2xl font-bold text-slate-900">{number}</div>
    <div className="text-xs sm:text-sm text-slate-600">{label}</div>
  </div>
);

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [typeFilter, setTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || college.type === typeFilter;
    const matchesLocation = locationFilter === "all" || college.location?.includes(locationFilter);
    return matchesSearch && matchesType && matchesLocation;
  });

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "established":
        return (b.established || 0) - (a.established || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "university", label: "Universities" },
    { value: "college", label: "Colleges" },
    { value: "institute", label: "Institutes" },
  ];

  const locationOptions = [
    { value: "all", label: "All Locations" },
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Chennai", label: "Chennai" },
  ];

  const sortOptions = [
    { value: "name", label: "Name (A-Z)" },
    { value: "established", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <div 
      className="min-h-screen text-slate-900 font-sans"
      style={{ backgroundColor: '#F9F8FE' }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-20 animate-pulse"
            style={{ background: `radial-gradient(circle, rgba(${brand.coral}, 0.3), transparent)` }} 
          />
          <div 
            className="absolute bottom-20 right-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full opacity-20 animate-pulse delay-75"
            style={{ background: `radial-gradient(circle, rgba(${brand.lilac}, 0.3), transparent)` }} 
          />
          <div 
            className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-10 animate-pulse delay-150"
            style={{ background: `radial-gradient(circle, rgba(${brand.indigo}, 0.3), transparent)` }} 
          />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <span 
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white"
              style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Discover Your Network
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-3 sm:mb-4">
            Explore 
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r ml-2 sm:ml-3"
              style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.coral}), rgb(${brand.lilac}), rgb(${brand.indigo}))` }}
            >
              Institutions
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Discover the growing network of prestigious colleges and universities on the 
            <span className="font-semibold" style={{color: `rgb(${brand.indigo})`}}> AlumnNET</span> platform. 
            Connect with alumni, explore opportunities, and build meaningful professional relationships.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-8 sm:mb-12">
            <StatsCard 
              icon={<Building2 className="w-5 h-5 sm:w-6 sm:h-6" />}
              number="150+"
              label="Institutions"
              color={brand.indigo}
            />
            <StatsCard 
              icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
              number="50K+"
              label="Alumni"
              color={brand.coral}
            />
            <StatsCard 
              icon={<Globe className="w-5 h-5 sm:w-6 sm:h-6" />}
              number="25+"
              label="Cities"
              color={brand.lilac}
            />
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for colleges, universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-16 sm:pr-6 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                style={{
                  '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                }}
              />
              <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
              {searchTerm && (
                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                  <span className="text-xs text-slate-500">{filteredColleges.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters and View Toggle */}
      <section className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4 sm:p-6 bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-2xl shadow-sm">
            {/* Desktop Filters */}
            <div className="hidden sm:flex flex-wrap items-center gap-4">
              <FilterDropdown
                label="Type"
                icon={<Filter className="w-4 h-4" />}
                options={typeOptions}
                value={typeFilter}
                onChange={setTypeFilter}
              />
              <FilterDropdown
                label="Location"
                icon={<MapPin className="w-4 h-4" />}
                options={locationOptions}
                value={locationFilter}
                onChange={setLocationFilter}
              />
              <FilterDropdown
                label="Sort by"
                icon={<Award className="w-4 h-4" />}
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
              />
            </div>

            {/* Mobile Filters Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex sm:hidden items-center gap-2 px-3 py-2 bg-white/80 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-all text-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-600 mr-2 hidden sm:inline">View:</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" 
                    ? 'text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                style={viewMode === "grid" ? { backgroundColor: `rgb(${brand.indigo})` } : {}}
              >
                <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" 
                    ? 'text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                style={viewMode === "list" ? { backgroundColor: `rgb(${brand.indigo})` } : {}}
              >
                <List className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* College Grid/List */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          {sortedColleges.length > 0 ? (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8" 
                : "space-y-4 sm:space-y-6"
            }>
              {sortedColleges.map((college) => (
                <CollegeExploreCard 
                  key={college.id} 
                  {...college} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Search 
                  className="w-10 h-10 sm:w-12 sm:h-12" 
                  style={{ color: `rgb(${brand.indigo})` }}
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">No institutions found</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base px-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setLocationFilter("all");
                }}
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base"
                style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Filters Modal */}
      <MobileFiltersModal
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        typeFilter={typeFilter}
        locationFilter={locationFilter}
        sortBy={sortBy}
        setTypeFilter={setTypeFilter}
        setLocationFilter={setLocationFilter}
        setSortBy={setSortBy}
      />
    </div>
  );
}
