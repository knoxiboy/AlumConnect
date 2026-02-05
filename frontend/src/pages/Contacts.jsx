import Navbar from "../components/navigation/Navbar";
import { brand } from "../config/brand";
import ContactForm from "../components/contact/ContactForm";
import ContactInfoCard from "../components/contact/ContactInfoCard";
import TeamMemberCard from "../components/contact/TeamMemberCard";
import {
  MapPin, Phone, Mail, User, MessageCircle, Send,
  GraduationCap, Users, Building2, Briefcase, Globe,
  Twitter, Linkedin, Instagram, Facebook, ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Contacts() {
  return (
    <div
      className="min-h-screen text-slate-900 font-sans"
      style={{ backgroundColor: '#F9F8FE' }}
    >
      <Navbar hideLinks={true} />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-20 animate-pulse"
            style={{ background: `radial-gradient(circle, rgba(${brand.coral}, 0.3), transparent)` }}
          />
          <div
            className="absolute bottom-20 right-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full opacity-20 animate-pulse delay-75"
            style={{ background: `radial-gradient(circle, rgba(${brand.indigo}, 0.3), transparent)` }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-10 animate-pulse delay-150"
            style={{ background: `radial-gradient(circle, rgba(${brand.indigo}, 0.3), transparent)` }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4 sm:mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white"
              style={{ backgroundColor: '#9966CC' }}
            >
              <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
              Get In Touch
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-3 sm:mb-4">
            Contact
            <span
              className="ml-2 sm:ml-3"
              style={{ color: '#c25f3a' }}
            >
              Us
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-2">
            Have questions about our alumni management solution? Reach out to our team for more information,
            partnership opportunities, or technical support. We're here to help build stronger alumni networks.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Send us a message</h2>
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <ContactInfoCard
                icon={<MapPin className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />}
                title="Our Location"
              >
                <p className="mb-2">SRM University, Andhra Pradesh</p>
                <p className="text-slate-600">Amaravati, Andhra Pradesh, India</p>
              </ContactInfoCard>

              <ContactInfoCard
                icon={<Phone className="w-5 h-5" style={{ color: `rgb(${brand.coral})` }} />}
                title="Phone Number"
              >
                <p className="mb-2">+91 44 2741 7290</p>
                <p className="text-slate-600">Mon-Fri from 9:00 AM to 5:00 PM</p>
              </ContactInfoCard>

              <ContactInfoCard
                icon={<Mail className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />}
                title="Email Address"
              >
                <p className="mb-2">contact@alumconnect.in</p>
                <p className="text-slate-600">For general inquiries and support</p>
              </ContactInfoCard>


            </div>
          </div>
        </div>

        {/* Team Section */}
        <section className="mt-16 sm:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-semibold text-sm" style={{ color: `rgb(${brand.indigo})` }}>VAKRATUND</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">Our Team</h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600">The dedicated individuals behind AlumConnect</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <TeamMemberCard
              name="Divya Saxena"
              role="Team Leader"
              gender="Female"
              email="divya_saxena@srmap.edu.in"
            />
            <TeamMemberCard
              name="Shruthi Bhagawan"
              role="Team Member"
              gender="Female"
              email="shruthi_bhagawan@srmap.edu.in"
            />
            <TeamMemberCard
              name="Saurav Shankar"
              role="Team Member"
              gender="Male"
              email="saurav_shankar@srmap.edu.in"
            />
            <TeamMemberCard
              name="Karan Mani Tripathi"
              role="Team Member"
              gender="Male"
              email="karan_manitripathi@srmap.edu.in"
            />
            <TeamMemberCard
              name="Punyap Tejas Kumar"
              role="Team Member"
              gender="Male"
              email="tejaskumar_punyap@srmap.edu.in"
            />
            <TeamMemberCard
              name="Kunapaneni Amrutha Naga Sri"
              role="Team Member"
              gender="Female"
              email="amrutha_kunapaneni@srmap.edu.in"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 sm:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <p className="font-semibold text-sm" style={{ color: `rgb(${brand.indigo})` }}>FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">Common Questions</h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600">Find answers to common questions about our platform</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">How does AlumConnect help institutions?</h3>
              <p className="text-slate-600">Our platform centralizes alumni data, facilitates networking, tracks career progress, and enables effective communication between institutions and their graduates.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">Is our data secure on your platform?</h3>
              <p className="text-slate-600">Yes, we implement strict security measures including encryption, secure authentication, and compliance with data protection regulations to ensure your information is safe.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">What support do you offer?</h3>
              <p className="text-slate-600">We provide 24/7 technical support, onboarding assistance, training resources, and regular platform updates to ensure smooth operation.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-3">How much does it cost?</h3>
              <p className="text-slate-600">We offer flexible pricing models based on the size of your institution. Contact us for a custom quote tailored to your specific needs.</p>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="mt-16 sm:mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Connect With Us</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Follow us on social media to stay updated with the latest news and developments
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 hover:border-slate-300 transition-all"
              style={{ color: `rgb(${brand.indigo})` }}
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 hover:border-slate-300 transition-all"
              style={{ color: `rgb(${brand.coral})` }}
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 hover:border-slate-300 transition-all"
              style={{ color: `rgb(${brand.indigo})` }}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 hover:border-slate-300 transition-all"
              style={{ color: `rgb(${brand.indigo})` }}
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
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
                <li><Link to="/contacts" className="hover:text-slate-900 text-sm">Contact Us</Link></li>
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
    </div>
  );
}

