import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { brand } from '../../config/brand';

const ContactInfoCard = ({ icon, title, children, action, actionLink }) => (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6 hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-3">
            <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
            >
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
        <div className="text-slate-600 mb-4">{children}</div>
        {action && (
            <Link
                to={actionLink}
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: `rgb(${brand.indigo})` }}
            >
                {action}
                <ExternalLink className="w-4 h-4" />
            </Link>
        )}
    </div>
);

export default ContactInfoCard;


