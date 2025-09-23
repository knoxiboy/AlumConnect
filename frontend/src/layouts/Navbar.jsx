import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const brand = {
  indigo: '118 98 214',   // #7662D6
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold transition-transform hover:scale-105">
          <GraduationCap className="w-8 h-8" style={{ color: `rgb(${brand.indigo})` }} />
          <span
            className="text-saffron"
            style={{ color: '#c25f3a' }}
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

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/alumni-auth"
            className="px-4 py-2 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
            style={{ backgroundColor: '#9966CC' }}
          >
            Sign In / Register
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <a href="#features" className="text-slate-700 hover:text-slate-900 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-slate-700 hover:text-slate-900 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>How It Works</a>
            <Link to="/explore" className="text-slate-700 hover:text-slate-900 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Explore</Link>
            <Link
              to="/alumni-auth"
              className="px-4 py-2 rounded-lg font-semibold text-white text-center shadow-md hover:shadow-lg transition-all text-sm"
              style={{ backgroundColor: '#9966CC' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In / Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
