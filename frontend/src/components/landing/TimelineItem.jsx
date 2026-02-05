import React from 'react';

const TimelineItem = ({ number, title, description }) => (
    <div className="flex items-start gap-4 sm:gap-5">
        <div
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg text-white shadow-lg"
            style={{ backgroundColor: '#9966CC' }}
        >
            {number}
        </div>
        <div>
            <h4 className="text-lg sm:text-xl font-semibold text-slate-900">{title}</h4>
            <p className="mt-1 text-slate-600 text-sm sm:text-base">{description}</p>
        </div>
    </div>
);

export default TimelineItem;


