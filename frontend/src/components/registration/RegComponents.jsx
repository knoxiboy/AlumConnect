import React, { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { brand } from '../../config/brand';

export const FormInput = ({ icon, label, ...props }) => (
    <div className="mb-6">
        <label className="block text-slate-700 text-sm font-semibold mb-2">{label}</label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
            <input
                {...props}
                className="w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all focus:bg-white shadow-sm hover:shadow-md"
                style={{
                    '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                }}
            />
        </div>
    </div>
);

export const SelectInput = ({ icon, label, children, ...props }) => (
    <div className="mb-6">
        <label className="block text-slate-700 text-sm font-semibold mb-2">{label}</label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
            <select
                {...props}
                className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl py-3 pl-12 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all focus:bg-white shadow-sm hover:shadow-md"
                style={{
                    '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                }}
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <ChevronDown className="w-5 h-5" />
            </div>
        </div>
    </div>
);

export const FileInput = ({ icon, label, id }) => (
    <div className="mb-6">
        <label htmlFor={id} className="block text-slate-700 text-sm font-semibold mb-2">{label}</label>
        <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-slate-400 hover:bg-slate-50/50 transition-all cursor-pointer group">
            <div className="flex justify-center text-slate-400 group-hover:text-slate-600 mb-3 transition-colors">{icon}</div>
            <p className="text-sm text-slate-600">
                <span
                    className="font-semibold hover:underline"
                    style={{ color: `rgb(${brand.indigo})` }}
                >
                    Click to upload
                </span> or drag and drop
            </p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, or SVG (max 5MB)</p>
            <input type="file" id={id} name={id} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>
    </div>
);

export const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-900 hover:text-slate-700 transition-colors"
            >
                <span>{question}</span>
                <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: `rgb(${brand.indigo})` }}
                />
            </button>
            {isOpen && (
                <p className="mt-4 text-slate-600 leading-relaxed">{answer}</p>
            )}
        </div>
    );
};

export const StepIndicator = ({ step, totalSteps, stepTitles }) => (
    <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
            {stepTitles.map((title, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${index + 1 <= step
                                ? 'text-white shadow-lg'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                        style={index + 1 <= step
                            ? { backgroundColor: '#9966CC' }
                            : {}
                        }
                    >
                        {index + 1 <= step ? <CheckCircle className="w-5 h-5" /> : index + 1}
                    </div>
                    <span className={`text-xs mt-2 text-center ${index + 1 === step ? 'font-semibold' : 'text-slate-500'}`}>
                        {title}
                    </span>
                </div>
            ))}
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
            <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                    width: `${(step / totalSteps) * 100}%`,
                    backgroundColor: '#9966CC'
                }}
            />
        </div>
    </div>
);


