import React from 'react';
import { brand } from '../../config/brand';

const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1.5">
        <div className="flex justify-center mb-3 sm:mb-4">
            <div
                className="p-3 sm:p-4 rounded-full"
                style={{
                    background: `rgba(${brand.indigo}, 0.15)`,
                    boxShadow: `inset 0 0 0 1px rgba(${brand.indigo}, 0.2)`
                }}
            >
                {icon}
            </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{children}</p>
    </div>
);

export default FeatureCard;


