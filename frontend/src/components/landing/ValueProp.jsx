import React from 'react';

const ValueProp = ({ icon, children }) => (
    <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <span className="text-slate-700 text-sm sm:text-base">{children}</span>
    </div>
);

export default ValueProp;


