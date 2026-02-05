import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { brand } from '../../config/brand';

const CollegeCard = ({ name, desc, image }) => (
    <div className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all transform hover:-translate-y-1.5">
        <img src={image} alt={name} className="w-full h-40 sm:h-48 object-cover" />
        <div className="p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-1">{name}</h3>
            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{desc}</p>
            <Link
                to="/explore"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: `rgb(${brand.indigo})` }}
            >
                Explore More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    </div>
);

export default CollegeCard;


