import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
                                    className={`w-full text-left px-3 py-2 rounded text-xs sm:text-sm transition-colors ${value === option.value
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

export default FilterDropdown;


