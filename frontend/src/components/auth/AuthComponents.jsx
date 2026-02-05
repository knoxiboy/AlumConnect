import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { brand } from '../../config/brand';

export const GoogleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.373-11.303-8H6.306C9.656,39.663,16.318,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,35.533,44,29.898,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

export const FormInput = ({ icon, type, isPassword, showPassword, onTogglePassword, ...props }) => (
    <div className="relative mb-3 sm:mb-4">
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <input
            {...props}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className="w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all focus:bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
            style={{
                '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
            }}
        />
        {isPassword && (
            <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        )}
    </div>
);

export const RegularInput = ({ icon, ...props }) => (
    <div className="relative mb-3 sm:mb-4">
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <input
            {...props}
            className="w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all focus:bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
            style={{
                '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
            }}
        />
    </div>
);

export const SelectInput = ({ icon, children, ...props }) => (
    <div className="relative mb-3 sm:mb-4">
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <select
            {...props}
            className="w-full bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all focus:bg-white shadow-sm hover:shadow-md appearance-none text-sm sm:text-base"
            style={{
                '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
            }}
        >
            {children}
        </select>
    </div>
);


