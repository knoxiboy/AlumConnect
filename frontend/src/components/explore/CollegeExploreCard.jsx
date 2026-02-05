import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Calendar, Users, Star, ExternalLink } from 'lucide-react';
import { brand } from '../../config/brand';

const CollegeExploreCard = ({ id, name, desc, image, location, established, alumniCount, rating, viewMode, url }) => (
    <Link
        to={url || '#'}
        target="_blank"
        className={`group block bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/60 hover:border-slate-300 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 ${viewMode === 'list' ? 'flex items-center' : ''
            }`}
    >
        <div className={`relative overflow-hidden ${viewMode === 'list'
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

            <h3 className={`font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-300 mb-2 line-clamp-2 ${viewMode === 'list' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
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

export default CollegeExploreCard;


