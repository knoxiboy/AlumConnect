import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import colleges from "../data/colleges";
import {
  GraduationCap, Users, ArrowRight, Briefcase, Link2,
  Sparkles, CalendarDays, Building2, Target, ShieldCheck,
  CheckCircle, Twitter, Linkedin, Instagram, Database,
  TrendingUp, Globe, Award
} from "lucide-react";

// Brand colors from your logo
const brand = {
  indigo: '153 102 204',   // #9966CC
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

// --- Reusable Components ---

const ValueProp = ({ icon, children }) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0">{icon}</div>
    <span className="text-slate-700 text-sm sm:text-base">{children}</span>
  </div>
);

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 text-center shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1.5">
    <div className="flex justify-center mb-3 sm:mb-4">
      <div
        className="p-3 sm:p-4 rounded-full"
        style={{
          background: `rgba(${brand.lilac}, 0.15)`,
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

// --- Main Landing Page Component ---

export default function Landing() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the section specified in the hash
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Wait a bit for the page to fully render before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div
      className="text-slate-900 min-h-screen"
      style={{
        backgroundColor: '#F9F8FE', // A very light, almost white lavender
      }}
    >
      <Navbar />
      <main className="pt-20">

        {/* --- Hero Section --- */}
        <section className="px-4 sm:px-6 pt-8 sm:pt-16 pb-12 sm:pb-20 relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ 
              backgroundImage: "url('/images/WhatsApp Image 2025-09-23 at 15.01.09_789f31d7.jpg')",
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }}
          />
          
          <div className="max-w-7xl mx-auto text-center lg:text-left grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left: Content */}
            <div>
              {/* SVG Icons Row */}
              <div className="flex justify-center lg:justify-start gap-3 sm:gap-6 mb-4 sm:mb-5 flex-wrap">
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.indigo})`}} />
                <Users className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.lilac})`}} />
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.coral})`}} />
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.lilac})`}} />
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.indigo})`}} />
                <Database className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.coral})`}} />
                <CalendarDays className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.indigo})`}} />
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.lilac})`}} />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight text-white drop-shadow-2xl">
                <span
                  className="block"
                  style={{ color: '#c25f3a' }}
                >
                  ऐक्यं बलं
                </span>
                <span className="block mt-2 text-white drop-shadow-lg">समाजस्या</span>
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-white/90 max-w-xl mx-auto lg:mx-0 drop-shadow-lg">
                A comprehensive digital platform to centralize alumni data, strengthen institutional relationships, and unlock opportunities for mentorship, fundraising, and career growth.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  to="/college-registration"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-center"
                  style={{ backgroundColor: '#9966CC' }}
                >
                  Get Started
                </Link>
                <Link
                  to="/explore"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-900 hover:border-slate-400 transition text-center"
                >
                  View Demo
                </Link>
              </div>
            </div>

            {/* Right: Visual Graphic - ENHANCED */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-96 h-96">
                {/* Central radial gradient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full" style={{background: `radial-gradient(circle, rgba(${brand.lilac},0.2), transparent 65%)`}} />

                {/* Floating Icon Cards */}
                <div className="absolute top-0 left-12 w-32 h-32 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg flex items-center justify-center transform rotate-[-15deg] hover:rotate-0 transition-transform">
                  <Database className="w-14 h-14" style={{color: `rgb(${brand.indigo})`}} />
                </div>
                <div className="absolute bottom-8 left-0 w-36 h-36 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg flex items-center justify-center transform rotate-[10deg] hover:rotate-0 transition-transform">
                  <Users className="w-16 h-16" style={{color: `rgb(${brand.coral})`}} />
                </div>
                <div className="absolute top-12 right-0 w-40 h-40 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg flex items-center justify-center transform rotate-[15deg] hover:rotate-0 transition-transform">
                  <Briefcase className="w-16 h-16" style={{color: `rgb(${brand.lilac})`}} />
                </div>
                
                {/* Additional Floating Icons */}
                <div className="absolute top-20 left-[-2rem] w-24 h-24 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg flex items-center justify-center transform rotate-[20deg] hover:rotate-0 transition-transform">
                  <TrendingUp className="w-10 h-10" style={{color: `rgb(${brand.indigo})`}} />
                </div>
                <div className="absolute bottom-16 right-[-1rem] w-28 h-28 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg flex items-center justify-center transform rotate-[-10deg] hover:rotate-0 transition-transform">
                  <CalendarDays className="w-12 h-12" style={{color: `rgb(${brand.coral})`}} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                  <ShieldCheck className="w-10 h-10" style={{color: `rgb(${brand.lilac})`}} />
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* --- Problem Statement Section --- */}
        <section className="py-12 sm:py-16 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <p className="font-semibold text-sm" style={{color: `rgb(${brand.indigo})`}}>SOLVING A CRITICAL CHALLENGE</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">The Alumni Data Management Problem</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-red-900 mb-3">Current Challenges</h3>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• Scattered alumni data across platforms</li>
                  <li>• Lost contact information after graduation</li>
                  <li>• Limited to WhatsApp groups & mailing lists</li>
                  <li>• Missed opportunities for engagement</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3">Impact on Institutions</h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Weakened alumni relationships</li>
                  <li>• Limited mentorship opportunities</li>
                  <li>• Reduced fundraising potential</li>
                  <li>• Decreased institutional credibility</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-3">Our Solution</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Centralized data management platform</li>
                  <li>• Secure alumni networking system</li>
                  <li>• Integrated communication tools</li>
                  <li>• Analytics & engagement tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- Why AlumConnect Section --- */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="font-semibold text-sm" style={{color: `rgb(${brand.indigo})`}}>SIH 2025 SOLUTION</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">Comprehensive Alumni Management</h2>
              <p className="mt-4 text-slate-600 text-sm sm:text-base">Our platform addresses the critical need for centralized alumni data management, providing institutions with tools to strengthen relationships, track career progress, and facilitate meaningful connections.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <ValueProp icon={<Database className="w-5 h-5" style={{color: `rgb(${brand.indigo})`}} />}>Centralized Data Storage</ValueProp>
              <ValueProp icon={<ShieldCheck className="w-5 h-5" style={{color: `rgb(${brand.indigo})`}} />}>Secure & Private Platform</ValueProp>
              <ValueProp icon={<TrendingUp className="w-5 h-5" style={{color: `rgb(${brand.indigo})`}} />}>Career Progress Tracking</ValueProp>
              <ValueProp icon={<CalendarDays className="w-5 h-5" style={{color: `rgb(${brand.indigo})`}} />}>Event Management System</ValueProp>
              <ValueProp icon={<Users className="w-5 h-5" style={{color: `rgb(${brand.indigo})`}} />}>Networking & Communication</ValueProp>
              <ValueProp icon={<Award className="w-5 h-5" style={{color: `rgb(${brand.indigo})`}} />}>Alumni Achievement Tracking</ValueProp>
            </div>
          </div>
        </section>

        {/* --- Core Features --- */}
        <section id="features" className="py-16 sm:py-20" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Key Solution Features</h2>
              <p className="mt-2 text-base sm:text-lg text-slate-600">Addressing every aspect of alumni data management and engagement.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                title="Centralized Database"
                icon={<Database className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />}
              >
                Store and manage all alumni data in one secure, searchable platform with automated updates and verification systems.
              </FeatureCard>
              <FeatureCard
                title="Communication Hub"
                icon={<Users className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.coral})` }} />}
              >
                Replace scattered WhatsApp groups with professional networking tools, announcements, and targeted communication.
              </FeatureCard>
              <FeatureCard
                title="Career & Mentorship Tracking"
                icon={<TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.lilac})` }} />}
              >
                Track alumni career progress, facilitate mentorship connections, and create opportunities for current students.
              </FeatureCard>
              <FeatureCard
                title="Event Management"
                icon={<CalendarDays className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />}
              >
                Organize reunions, webinars, and networking events with integrated registration, attendance tracking, and feedback.
              </FeatureCard>
              <FeatureCard
                title="Fundraising Platform"
                icon={<Award className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.coral})` }} />}
              >
                Enable transparent donation tracking, campaign management, and donor recognition for institutional development.
              </FeatureCard>
              <FeatureCard
                title="Analytics Dashboard"
                icon={<Globe className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.lilac})` }} />}
              >
                Comprehensive reporting on alumni engagement, career outcomes, donation patterns, and institutional impact metrics.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* --- How it Works Timeline --- */}
        <section id="how-it-works" className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-12 sm:mb-16">Implementation Process</h2>
            <div className="space-y-12 sm:space-y-16">
              <TimelineItem 
                number="1" 
                title="Data Migration & Setup" 
                description="Import existing alumni data from various sources, set up institutional profiles, and configure admin access controls." 
              />
              <TimelineItem 
                number="2" 
                title="Alumni Verification & Onboarding" 
                description="Verify alumni credentials, send secure invitations, and guide users through profile completion and privacy settings." 
              />
              <TimelineItem 
                number="3" 
                title="Engagement & Growth" 
                description="Launch communication campaigns, organize events, facilitate mentorship matching, and track engagement metrics." 
              />
            </div>
          </div>
        </section>

        {/* --- Stakeholders & Benefits --- */}
        <section className="py-16 sm:py-20" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Stakeholders & Benefits</h2>
              <p className="mt-2 text-base sm:text-lg text-slate-600">How our solution benefits all members of the educational ecosystem.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{background: '#9966CC'}}>
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.indigo})`}} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Alumni</h3>
                <p className="text-xs sm:text-sm text-slate-600">Professional networking, career opportunities, and institutional connection</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{background: `rgba(${brand.coral}, 0.1)`}}>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.coral})`}} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Current Students</h3>
                <p className="text-xs sm:text-sm text-slate-600">Mentorship access, internship opportunities, and career guidance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{background: `rgba(${brand.lilac}, 0.1)`}}>
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.lilac})`}} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Institutions</h3>
                <p className="text-xs sm:text-sm text-slate-600">Enhanced reputation, fundraising capabilities, and alumni engagement</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{background: '#9966CC'}}>
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" style={{color: `rgb(${brand.indigo})`}} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Recruiters</h3>
                <p className="text-xs sm:text-sm text-slate-600">Access to verified talent pipeline and institutional partnerships</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Featured Institutions --- */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-8 sm:mb-12 px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Pilot Implementation</h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600">Educational institutions ready to implement our alumni management solution.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-6">
            {colleges.slice(0, 3).map((college) => (<CollegeCard key={college.id} {...college} />))}
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="border-t border-slate-200 text-slate-600" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-sm">
              {/* Column 1: Brand and Social */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="text-lg font-extrabold"
                     style={{ color: '#c25f3a' }}>
                  AlumConnect
                </div>
                <p className="mt-2 text-sm">SIH 2025 Solution for Centralized Alumni Data Management and Engagement</p>
                <div className="mt-4 flex space-x-4">
                  <a href="#" className="text-slate-400 hover:text-slate-500"><Twitter className="w-5 h-5" /></a>
                  <a href="#" className="text-slate-400 hover:text-slate-500"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="text-slate-400 hover:text-slate-500"><Instagram className="w-5 h-5" /></a>
                </div>
              </div>
              {/* Column 2: Solution */}
              <div>
                <p className="font-semibold text-slate-900 mb-3">Solution</p>
                <ul className="space-y-2">
                  <li><Link to="/explore" className="hover:text-slate-900 text-sm">Platform Demo</Link></li>
                  <li><a href="#features" className="hover:text-slate-900 text-sm">Key Features</a></li>
                  <li><Link to="/college-registration" className="hover:text-slate-900 text-sm">Implementation</Link></li>
                  <li><a href="#" className="hover:text-slate-900 text-sm">Technical Specs</a></li>
                </ul>
              </div>
              {/* Column 3: Resources */}
              <div>
                <p className="font-semibold text-slate-900 mb-3">Resources</p>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-slate-900 text-sm">Problem Statement</a></li>
                  <li><a href="#" className="hover:text-slate-900 text-sm">Technical Documentation</a></li>
                  <li><a href="#" className="hover:text-slate-900 text-sm">User Guide</a></li>
                </ul>
              </div>
              {/* Column 4: Team */}
              <div>
                <p className="font-semibold text-slate-900 mb-3">Team</p>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-slate-900 text-sm">About Team</a></li>
                  <li><a href="#" className="hover:text-slate-900 text-sm">Contact</a></li>
                  <li><a href="#" className="hover:text-slate-900 text-sm">Project Repository</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-200 pt-8 text-center text-xs">
              <p>© {new Date().getFullYear()} AlumConnect - SIH 2025 Problem Statement #25017 Solution. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
