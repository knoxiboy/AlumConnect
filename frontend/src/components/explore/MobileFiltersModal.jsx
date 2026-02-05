import React from 'react';
import { X } from 'lucide-react';
import { brand } from '../../config/brand';

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
                                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${typeFilter === option.value
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
                                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${locationFilter === option.value
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
                                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${sortBy === option.value
                                            ? 'text-white'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    style={sortBy === option.value
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
                    style={{ backgroundColor: '#9966CC' }}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default MobileFiltersModal;


