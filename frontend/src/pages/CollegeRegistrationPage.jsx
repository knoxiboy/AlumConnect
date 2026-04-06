import { useState } from "react";
import { Link } from "react-router-dom";
import { brand } from "../config/brand";
import { FormInput, SelectInput, FileInput, FAQItem, StepIndicator } from "../components/registration/RegComponents";
import {
  ArrowLeft, Building2, Globe, Mail, Phone, User, MapPin, Calendar, Upload,
  BookText, ShieldCheck, FileSpreadsheet, Server, ChevronDown, GraduationCap,
  CheckCircle, Clock, Users, Award
} from "lucide-react";

// --- Main Component ---
export default function CollegeRegistrationPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const stepTitles = ["Basic Info", "Contact", "Technical", "Branding"];

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div
      className="min-h-screen text-slate-900 font-sans p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: '#F9F8FE' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse"
          style={{ background: `radial-gradient(circle, rgba(${brand.coral}, 0.3), transparent)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full opacity-20 animate-pulse delay-75"
          style={{ background: `radial-gradient(circle, rgba(${brand.indigo}, 0.3), transparent)` }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full opacity-10 animate-pulse delay-150"
          style={{ background: `radial-gradient(circle, rgba(${brand.indigo}, 0.3), transparent)` }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg border border-slate-200/50 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow-md hover:shadow-lg transition-all"
              style={{ backgroundColor: '#c25f3a' }}
            >
              <ArrowLeft size={18} />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="flex items-center gap-2">
              <GraduationCap
                className="w-6 h-6"
                style={{ color: `rgb(${brand.indigo})` }}
              />
              <span
                className="text-lg font-bold"
                style={{ color: '#c25f3a' }}
              >
                AlumConnect
              </span>
            </div>
          </div>

          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              Institution Registration
            </h1>
            <p className="text-slate-600 text-lg">
              Join AlumConnect to build a powerful, connected community for your institution
            </p>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5-10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Free Setup</span>
              </div>
            </div>
          </header>

          {/* Enhanced Progress Indicator */}
          <StepIndicator step={step} totalSteps={totalSteps} stepTitles={stepTitles} />

          <form>
            {step === 1 && (
              <section>
                <div className="text-center mb-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'rgba(153, 102, 204, 0.1)' }}
                  >
                    <Building2 className="w-8 h-8" style={{ color: `rgb(${brand.indigo})` }} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Basic Information</h2>
                  <p className="text-slate-600">Tell us about your institution</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput icon={<Building2 size={20} />} label="College/University Name" type="text" placeholder="e.g., Indian Institute of Technology Delhi" required />
                  <FormInput icon={<BookText size={20} />} label="Acronym/Short Name" type="text" placeholder="e.g., IIT Delhi" required />
                  <FormInput icon={<Globe size={20} />} label="Official Website URL" type="url" placeholder="https://www.iitd.ac.in" required />
                  <FormInput icon={<Calendar size={20} />} label="Year of Establishment" type="number" placeholder="e.g., 1961" required />
                  <FormInput icon={<MapPin size={20} />} label="City" type="text" placeholder="e.g., New Delhi" required />
                  <FormInput icon={<MapPin size={20} />} label="State/Province" type="text" placeholder="e.g., Delhi" required />
                </div>
              </section>
            )}

            {step === 2 && (
              <section>
                <div className="text-center mb-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'rgba(153, 102, 204, 0.1)' }}
                  >
                    <User className="w-8 h-8" style={{ color: `rgb(${brand.coral})` }} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Administrative Contact</h2>
                  <p className="text-slate-600">Primary contact for verification and communication</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput icon={<User size={20} />} label="Contact Person Name" type="text" placeholder="e.g., Dr. Jane Smith" required />
                  <FormInput icon={<Mail size={20} />} label="Official Email Address" type="email" placeholder="admin@yourcollege.edu" required />
                  <FormInput icon={<Phone size={20} />} label="Contact Phone Number" type="tel" placeholder="+91-11-XXXXXXXX" />
                  <SelectInput icon={<Building2 size={20} />} label="Your Role/Position">
                    <option value="">Select your position</option>
                    <option value="registrar">Registrar</option>
                    <option value="dean">Dean</option>
                    <option value="director">Director</option>
                    <option value="admin">Administrative Officer</option>
                    <option value="it">IT Administrator</option>
                    <option value="other">Other</option>
                  </SelectInput>
                </div>
              </section>
            )}

            {step === 3 && (
              <section>
                <div className="text-center mb-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'rgba(153, 102, 204, 0.1)' }}
                  >
                    <Server className="w-8 h-8" style={{ color: `rgb(${brand.indigo})` }} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Technical Details</h2>
                  <p className="text-slate-600">Optional technical preferences for integration</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput icon={<ShieldCheck size={20} />} label="Technical Contact Email" type="email" placeholder="tech@yourcollege.edu" />
                  <SelectInput icon={<FileSpreadsheet size={20} />} label="Preferred Data Import Method">
                    <option value="manual">Manual Entry</option>
                    <option value="csv">CSV/Excel Upload</option>
                    <option value="api">API Integration</option>
                    <option value="help">Need Help Deciding</option>
                  </SelectInput>
                  <SelectInput icon={<Users size={20} />} label="Approximate Alumni Count">
                    <option value="small">Under 1,000</option>
                    <option value="medium">1,000 - 10,000</option>
                    <option value="large">10,000 - 50,000</option>
                    <option value="xlarge">50,000+</option>
                    <option value="unknown">Not Sure</option>
                  </SelectInput>
                  <SelectInput icon={<Server size={20} />} label="Single Sign-On (SSO) Requirement">
                    <option value="none">Not Required</option>
                    <option value="google">Google Workspace</option>
                    <option value="saml">SAML 2.0</option>
                    <option value="microsoft">Microsoft Azure AD</option>
                    <option value="help">Need Consultation</option>
                  </SelectInput>
                </div>
              </section>
            )}

            {step === 4 && (
              <section>
                <div className="text-center mb-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'rgba(153, 102, 204, 0.1)' }}
                  >
                    <Upload className="w-8 h-8" style={{ color: `rgb(${brand.coral})` }} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Branding & Assets</h2>
                  <p className="text-slate-600">Upload your institution's visual assets (optional)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileInput icon={<Upload size={30} />} label="Institution Logo" id="college-logo" />
                  <FileInput icon={<Upload size={30} />} label="Cover/Banner Image" id="cover-photo" />
                </div>

                {/* Benefits reminder */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-slate-200 rounded-xl">
                  <h3 className="font-semibold text-slate-900 mb-3">🎉 What happens after registration?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Verification within 2-3 business days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Dedicated admin dashboard access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Custom branded alumni portal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Free onboarding support</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                style={{ backgroundColor: '#c25f3a' }}
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              {step < totalSteps && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                  style={{ backgroundColor: '#9966CC' }}
                >
                  <span>Continue</span>
                  <CheckCircle size={18} />
                </button>
              )}

              {step === totalSteps && (
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                  style={{ backgroundColor: '#9966CC' }}
                >
                  <span>Submit for Verification</span>
                  <CheckCircle size={18} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mt-16 bg-white/60 backdrop-blur-lg border border-slate-200/50 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about joining AlumConnect</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2">
            <FAQItem
              question="What is the verification process?"
              answer="After you submit your details, our team will review the information and contact your administrative email within 2-3 business days to verify the institution's identity and complete the onboarding process."
            />
            <FAQItem
              question="Can we update our details later?"
              answer="Yes, once your profile is approved, the designated admin will have access to a comprehensive dashboard where they can update all institution information, branding, technical settings, and manage user permissions."
            />
            <FAQItem
              question="Is there a cost to join AlumConnect?"
              answer="Creating and setting up a basic institution profile on AlumConnect is completely free. We offer premium packages with advanced features like detailed analytics, targeted communication tools, event management, and priority support."
            />
            <FAQItem
              question="How secure is our data?"
              answer="We use enterprise-grade security with SSL encryption, regular security audits, and comply with data protection regulations. Your institution maintains full control over your alumni data and privacy settings."
            />
            <FAQItem
              question="What support do you provide?"
              answer="We provide comprehensive onboarding support, training materials, 24/7 technical support, and dedicated account management for verified institutions to ensure successful alumni engagement."
            />
          </div>
        </div>
      </div>
    </div>
  );
}


