import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navigation/Navbar";
import colleges from "../data/colleges";
import { brand } from "../config/brand";
import ValueProp from "../components/landing/ValueProp";
import FeatureCard from "../components/landing/FeatureCard";
import CollegeCard from "../components/landing/CollegeCard";
import TimelineItem from "../components/landing/TimelineItem";
import {
  GraduationCap, Users, ArrowRight, Briefcase,
  Sparkles, CalendarDays, Building2, ShieldCheck,
  Twitter, Linkedin, Instagram, Database,
  TrendingUp, Globe, Award
} from "lucide-react";

// --- Main Landing Page Component ---

export default function Landing() {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 7; // We have 7 slides

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

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
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
                <Users className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.coral})` }} />
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.coral})` }} />
                <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
                <Database className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.coral})` }} />
                <CalendarDays className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
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
                A digital platform to centralize alumni data, strengthen institutional relationships, and unlock opportunities for mentorship, fundraising, and career growth.
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
                  to="/contacts"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-900 hover:border-slate-400 transition text-center"
                >
                  Contact Us
                </Link>
                <Link
                  to="/explore"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-900 hover:border-slate-400 transition text-center"
                >
                  View Demo
                </Link>
              </div>
            </div>

            {/* Right: Image Slideshow */}
            <div className="hidden lg:flex justify-center items-center relative">
              <button
                className="absolute left-0 z-20 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all"
                style={{ color: `rgb(${brand.indigo})`, transform: 'translateX(-50%)' }}
                onClick={prevSlide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="w-full max-w-lg h-96 rounded-2xl overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Slideshow container */}
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <img
                      src="/images/camilo-botia-k4vFDPJoDZk-unsplash.jpg"
                      alt="Campus Life"
                      className={`w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <img
                      src="/images/dom-fou-YRMWVcdyhmI-unsplash.jpg"
                      alt="University Building"
                      className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <img
                      src="/images/erika-fletcher-MZxqc6n9qCw-unsplash.jpg"
                      alt="Student Gathering"
                      className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <img
                      src="/images/k-mitch-hodge-oIPMwJFd-t0-unsplash.jpg"
                      alt="Campus View"
                      className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${currentSlide === 3 ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <img
                      src="/images/mauricio-arias-h6QQiYftoO0-unsplash.jpg"
                      alt="Alumni Event"
                      className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${currentSlide === 4 ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <img
                      src="/images/michael-marsh-U0dBV_QeiYk-unsplash.jpg"
                      alt="Study Session"
                      className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${currentSlide === 5 ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <img
                      src="/images/parker-gibbons-kfwPJieZVwI-unsplash.jpg"
                      alt="University Campus"
                      className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${currentSlide === 6 ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </div>

                  {/* Slide indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    <button
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === 0 ? 'bg-white' : 'bg-white/80 hover:bg-white'}`}
                      onClick={() => goToSlide(0)}
                    ></button>
                    <button
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === 1 ? 'bg-white' : 'bg-white/80 hover:bg-white'}`}
                      onClick={() => goToSlide(1)}
                    ></button>
                    <button
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === 2 ? 'bg-white' : 'bg-white/80 hover:bg-white'}`}
                      onClick={() => goToSlide(2)}
                    ></button>
                    <button
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === 3 ? 'bg-white' : 'bg-white/80 hover:bg-white'}`}
                      onClick={() => goToSlide(3)}
                    ></button>
                    <button
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === 4 ? 'bg-white' : 'bg-white/80 hover:bg-white'}`}
                      onClick={() => goToSlide(4)}
                    ></button>
                    <button
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === 5 ? 'bg-white' : 'bg-white/80 hover:bg-white'}`}
                      onClick={() => goToSlide(5)}
                    ></button>
                    <button
                      className={`w-3 h-3 rounded-full transition-all ${currentSlide === 6 ? 'bg-white' : 'bg-white/80 hover:bg-white'}`}
                      onClick={() => goToSlide(6)}
                    ></button>
                  </div>
                </div>
              </div>

              <button
                className="absolute right-0 z-20 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all"
                style={{ color: `rgb(${brand.indigo})`, transform: 'translateX(50%)' }}
                onClick={nextSlide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* --- Problem Statement Section --- */}
        <section className="py-12 sm:py-16 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <p className="font-semibold text-sm" style={{ color: `rgb(${brand.indigo})` }}>SOLVING A CRITICAL CHALLENGE</p>
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
              <p className="font-semibold text-sm" style={{ color: `rgb(${brand.indigo})` }}>SIH 2025 SOLUTION</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">Digital Alumni Platform</h2>
              <p className="mt-4 text-slate-600 text-sm sm:text-base">Our platform addresses the critical need for centralized alumni data management, providing institutions with tools to strengthen relationships, track career progress, and facilitate meaningful connections.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <ValueProp icon={<Database className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />}>Centralized Data Management</ValueProp>
              <ValueProp icon={<ShieldCheck className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />}>Secure & Private Platform</ValueProp>
              <ValueProp icon={<TrendingUp className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />}>Career Progress Tracking</ValueProp>
              <ValueProp icon={<CalendarDays className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />}>Event Management System</ValueProp>
              <ValueProp icon={<Users className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />}>Networking & Communication</ValueProp>
              <ValueProp icon={<Award className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />}>Alumni Engagement</ValueProp>
            </div>
          </div>
        </section>

        {/* --- Core Features --- */}
        <section id="features" className="py-16 sm:py-20" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">Key Solution Features</h2>
              <p className="mt-2 text-base sm:text-lg text-slate-600">Addressing every aspect of centralized alumni data management and engagement.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                title="Centralized Data Platform"
                icon={<Database className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />}
              >
                Secure, centralized platform to store and manage all alumni data with automated updates and verification systems.
              </FeatureCard>
              <FeatureCard
                title="Communication Hub"
                icon={<Users className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.coral})` }} />}
              >
                Professional networking tools to replace informal WhatsApp groups, with announcements and targeted communication.
              </FeatureCard>
              <FeatureCard
                title="Career Progress Tracking"
                icon={<TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />}
              >
                Track alumni career progress and achievements to create opportunities for current students and institutional growth.
              </FeatureCard>
              <FeatureCard
                title="Mentorship Matching"
                icon={<CalendarDays className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />}
              >
                Facilitate mentorship connections between alumni and current students for career guidance and professional development.
              </FeatureCard>
              <FeatureCard
                title="Event Management"
                icon={<Award className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.coral})` }} />}
              >
                Organize reunions, webinars, and networking events with integrated registration and attendance tracking.
              </FeatureCard>
              <FeatureCard
                title="Fundraising & Donations"
                icon={<Globe className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />}
              >
                Transparent donation tracking and campaign management to enhance institutional fundraising potential.
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
                title="Centralized Data Setup"
                description="Import existing alumni data from scattered sources, set up institutional profiles, and configure secure access controls."
              />
              <TimelineItem
                number="2"
                title="Alumni Verification & Onboarding"
                description="Verify alumni credentials through secure channels and guide users through profile completion and privacy settings."
              />
              <TimelineItem
                number="3"
                title="Engagement & Relationship Building"
                description="Launch communication campaigns, connect alumni with current students, and track engagement and career outcomes."
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
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{ background: '#9966CC' }}>
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Alumni</h3>
                <p className="text-xs sm:text-sm text-slate-600">Professional networking, career opportunities, and institutional connection</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{ background: `rgba(${brand.coral}, 0.1)` }}>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Current Students</h3>
                <p className="text-xs sm:text-sm text-slate-600">Mentorship access, internship opportunities, and career guidance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{ background: `rgba(${brand.indigo}, 0.1)` }}>
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Institutions</h3>
                <p className="text-xs sm:text-sm text-slate-600">Enhanced reputation, fundraising capabilities, and alumni engagement</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{ background: '#9966CC' }}>
                  <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
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
                <p className="mt-2 text-sm">SIH 2025 Solution for Digital Platform for Centralized Alumni Data Management and Engagement</p>
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
                  <li><Link to="/contacts" className="hover:text-slate-900 text-sm">Contact Us</Link></li>
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
                  <li><Link to="/contacts" className="hover:text-slate-900 text-sm">Contact Us</Link></li>
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


