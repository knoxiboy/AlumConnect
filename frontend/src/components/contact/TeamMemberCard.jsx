import React from 'react';
import { Mail, Phone } from 'lucide-react';

const TeamMemberCard = ({ name, role, email, phone, image, gender }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200/80 text-center hover:shadow-lg transition-all">
        {image && (
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover"
                />
            </div>
        )}
        <div className="p-5">
            <h3 className="text-lg font-bold text-slate-900">{name}</h3>
            <p className="text-sm text-slate-600 mb-2">{role}</p>
            <div className="space-y-1 text-xs text-slate-600">
                {gender && (
                    <div className="flex items-center justify-center gap-1">
                        <span>{gender}</span>
                    </div>
                )}
                {email && (
                    <div className="flex items-center justify-center gap-1">
                        <Mail className="w-3 h-3" />
                        <span>{email}</span>
                    </div>
                )}
                {phone && (
                    <div className="flex items-center justify-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{phone}</span>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default TeamMemberCard;


