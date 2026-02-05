import React from 'react';

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

export default StatsCard;


