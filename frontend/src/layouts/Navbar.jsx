import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const brand = {
  indigo: '118 98 214',   // #7662D6
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold transition-transform hover:scale-105">
          <GraduationCap className="w-8 h-8" style={{ color: `rgb(${brand.indigo})` }} />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral via-brand-lilac to-brand-indigo"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.coral}), rgb(${brand.lilac}), rgb(${brand.indigo}))` }}
          >
            AlumConnect
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium">
          <a href="#features" className="text-slate-700 hover:text-slate-900 transition-colors text-sm lg:text-base">Features</a>
          <a href="#how-it-works" className="text-slate-700 hover:text-slate-900 transition-colors text-sm lg:text-base">How It Works</a>
          <Link to="/explore" className="text-slate-700 hover:text-slate-900 transition-colors text-sm lg:text-base">Explore</Link>
        </div>

        {/* Action Button */}
        <div className="flex items-center">
          <Link
            to="/alumni-auth"
            className="px-4 py-2 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
          >
            Sign In / Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
