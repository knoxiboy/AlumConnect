import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, Mail, Key, Eye, EyeOff, GraduationCap, Briefcase, Linkedin, Hash, ArrowLeft, 
  Users, Zap, BookOpen, Quote, Sparkles, Target, CalendarDays, Database, ShieldCheck,
  Building2
} from "lucide-react";
import { login } from "../utils/auth";
import axios from 'axios';

// Brand colors matching landing page
const brand = {
  indigo: '118 98 214',   // #7662D6
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

// College options
const colleges = [
  { id: 'srm-ap', name: 'SRM UNIVERSITY AP, Amravati' },
  { id: 'iit-delhi', name: 'Indian Institute of Technology, Delhi' },
  { id: 'juet-guna', name: 'Jaypee University of Engineering and Technology, Guna' },
  { id: 'iit-bombay', name: 'Indian Institute of Technology, Bombay' },
  { id: 'iiit-hyderabad', name: 'International Institute of Information Technology, Hyderabad' },
  { id: 'vit-vellore', name: 'Vellore Institute of Technology' },
  { id: 'bits-pilani', name: 'Birla Institute of Technology and Science, Pilani' },
  { id: 'nit-trichy', name: 'National Institute of Technology, Tiruchirappalli' },
  { id: 'du', name: 'University of Delhi' },
];

// --- Google Icon SVG Component ---
const GoogleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.655-3.373-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.99,35.533,44,29.898,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

// --- Enhanced Form Input Component with Eye Toggle ---
const FormInput = ({ icon, type, isPassword, showPassword, onTogglePassword, ...props }) => (
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

// --- Regular Form Input Component (non-password) ---
const RegularInput = ({ icon, ...props }) => (
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

// --- Select Input Component ---
const SelectInput = ({ icon, children, ...props }) => (
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

// --- Testimonial Data ---
const testimonials = [
  { 
    quote: "AlumConnect connected me with a mentor who completely changed my career trajectory. The centralized platform made networking effortless.", 
    author: "Priya Sharma", 
    role: "Class of 2018",
    company: "Software Engineer at Microsoft"
  },
  { 
    quote: "As a student, having access to verified alumni data and mentorship opportunities has been transformative for my career planning.", 
    author: "Rahul Verma", 
    role: "Final Year Student",
    company: "Computer Science, IIT Delhi"
  },
  { 
    quote: "The platform solved our institution's alumni engagement challenges. We've seen 300% increase in active participation.", 
    author: "Dr. Ankit Gupta", 
    role: "Alumni Director",
    company: "Jaypee University Guna"
  }
];

// --- Main AuthPage Component ---
const AuthPage = () => {
  const [role, setRole] = useState("alumni");
  const [isLogin, setIsLogin] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    if (isLogin) {
      if (role === 'admin') {
        // Admin login logic
        if (email === 'karan@college.edu' && password === 'Tiwariji') {
          localStorage.setItem("AlumConnect_admin_session", JSON.stringify({ 
            email: email, 
            collegeId: "iit-delhi", 
            ts: Date.now() 
          }));
          navigate('/admin/dashboard');
        } else {
          setError('Invalid admin credentials. Please check your email and password.');
        }
      } else {
        // Regular user login
        const userData = login(email, password, role);
        
        if (userData) {
          // Redirect based on role
          if (role === 'alumni') {
            navigate('/alumni/dashboard');
          } else {
            navigate('/student/dashboard');
          }
        } else {
          setError('Invalid credentials or account not approved. Please check your email and password.');
        }
      }
    } else {
      // Sign up logic
      const name = formData.get('name');
      const college = formData.get('college');
      
      const signupData = {
        name,
        email: formData.get('email'),
        password: formData.get('password'),
        college,
      };

      if (role === 'student') {
        signupData.enrollmentYear = formData.get('enrollmentYear');
        signupData.degree = formData.get('degree');
        signupData.major = formData.get('major');
        signupData.currentYear = formData.get('currentYear');
      } else if (role === 'alumni') {
        signupData.graduationYear = formData.get('graduationYear');
        signupData.degree = formData.get('degree');
        signupData.major = formData.get('major');
        signupData.currentPosition = formData.get('currentPosition');
        signupData.company = formData.get('company');
        signupData.industry = formData.get('industry');
        signupData.location = formData.get('location');
      }

      try {
        const response = await axios.post(`http://localhost:3001/api/auth/${role}/signup`, signupData);
        const { data } = response;
        
        const userData = {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          token: data.token
        };
        localStorage.setItem('alumconnect_user', JSON.stringify(userData));

        if (role === 'alumni') {
          navigate('/alumni/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred during sign up.');
      }
    }
    
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen text-slate-900 font-sans flex flex-col md:flex-row"
      style={{ backgroundColor: '#F9F8FE' }}
    >
      {/* --- LEFT PANEL --- */}
      <div className="hidden md:flex md:w-1/2 lg:w-2/5 p-4 sm:p-6 lg:p-12 flex-col justify-between relative overflow-hidden">
        {/* Enhanced background with SVG icon elements */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute top-20 left-10 w-24 h-24 lg:w-32 lg:h-32 rounded-full opacity-20 animate-pulse"
            style={{ background: `radial-gradient(circle, rgba(${brand.coral}, 0.3), transparent)` }} 
          />
          <div 
            className="absolute bottom-20 right-10 w-20 h-20 lg:w-24 lg:h-24 rounded-full opacity-20 animate-pulse delay-75"
            style={{ background: `radial-gradient(circle, rgba(${brand.lilac}, 0.3), transparent)` }} 
          />
          
          {/* SVG Icon Elements */}
          <div className="absolute top-16 right-16 opacity-10">
            <Database className="w-10 h-10 lg:w-12 lg:h-12" style={{ color: `rgb(${brand.indigo})` }} />
          </div>
          <div className="absolute bottom-32 left-16 opacity-10">
            <Sparkles className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: `rgb(${brand.lilac})` }} />
          </div>
          <div className="absolute top-1/2 left-8 opacity-10">
            <Target className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: `rgb(${brand.coral})` }} />
          </div>
        </div>

        <div>
          <Link to="/" className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <GraduationCap 
              className="w-7 h-7 lg:w-9 lg:h-9" 
              style={{ color: `rgb(${brand.indigo})` }}
            />
            <span
              className="text-saffron"
              style={{ color: '#c25f3a' }}
            >
              AlumConnect
            </span>
          </Link>
          
          <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mt-8 lg:mt-12 leading-tight">
            Connect with your past. 
            <span 
              className="text-saffron"
              style={{ color: '#c25f3a' }}
            >
              Power your future.
            </span>
          </h1>
          
          <ul className="mt-6 lg:mt-8 space-y-3 lg:space-y-4 text-sm lg:text-base text-slate-600">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: `rgb(${brand.indigo})` }} />
              <span>Centralized alumni data management</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: `rgb(${brand.coral})` }} />
              <span>Verified professional networking</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: `rgb(${brand.lilac})` }} />
              <span>Career mentorship opportunities</span>
            </li>
          </ul>

          {/* Demo Credentials */}
          <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-white/60 backdrop-blur-lg border border-slate-200/60 rounded-xl">
            <h3 className="font-semibold text-slate-900 mb-2 text-sm lg:text-base">Demo Credentials:</h3>
            <div className="text-xs lg:text-sm text-slate-700 space-y-1">
              <p><strong>Alumni:</strong> divya@example.com</p>
              <p><strong>Student:</strong> saurav@example.com</p>
              <p><strong>Admin:</strong> karan@college.edu</p>
              <p><strong>Password:</strong> {role === 'admin' ? 'Tiwariji' : 'password123'}</p>
            </div>
          </div>
        </div>

        {/* Enhanced Testimonial Box */}
        <div className="text-xs lg:text-sm text-slate-500 relative">
          <div className="relative bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-lg border border-slate-200/60 rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4">
                <Quote className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <p className="text-slate-700 italic text-sm lg:text-base leading-relaxed mb-3 lg:mb-4">
                "{testimonials[testimonialIndex].quote}"
              </p>
              
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs lg:text-sm"
                  style={{ 
                    backgroundColor: '#9966CC' 
                  }}
                >
                  {testimonials[testimonialIndex].author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p 
                    className="font-semibold text-xs lg:text-sm"
                    style={{ color: `rgb(${brand.indigo})` }}
                  >
                    {testimonials[testimonialIndex].author}
                  </p>
                  <p className="text-xs text-slate-600">
                    {testimonials[testimonialIndex].role}
                  </p>
                  <p className="text-xs text-slate-500">
                    {testimonials[testimonialIndex].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center gap-2 mt-3 lg:mt-4">
              {testimonials.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === testimonialIndex 
                      ? 'w-4 lg:w-6 opacity-100' 
                      : 'w-2 opacity-30'
                  }`}
                  style={{ 
                    backgroundColor: `rgb(${brand.indigo})` 
                  }}
                />
              ))}
            </div>
          </div>
          
          <p className="mt-4 lg:mt-6 text-center text-slate-400 text-xs">
            © {new Date().getFullYear()} AlumConnect - SIH 2025 Solution
          </p>
        </div>
      </div>

      {/* --- RIGHT PANEL (Form) --- */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-4 md:p-4 relative min-h-screen md:min-h-auto">
        {/* Enhanced background with subtle gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 rounded-full filter blur-3xl animate-pulse opacity-10"
            style={{ background: `radial-gradient(circle, rgb(${brand.lilac}), transparent)` }}
          />
          <div 
            className="absolute bottom-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 rounded-full filter blur-3xl animate-pulse opacity-10 animation-delay-2000"
            style={{ background: `radial-gradient(circle, rgb(${brand.coral}), transparent)` }}
          />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-lg border border-slate-200/50 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 hover:shadow-3xl transition-all">
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-4 sm:mb-6">
              <Link to="/" className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
                <GraduationCap 
                  className="w-6 h-6 sm:w-7 sm:h-7" 
                  style={{ color: `rgb(${brand.indigo})` }}
                />
                <span
                  className="text-saffron"
                  style={{ color: '#c25f3a' }}
                >
                  AlumConnect
                </span>
              </Link>
            </div>

            {/* Back Button integrated into form */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <button 
                onClick={handleBack} 
                className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-100/80 hover:bg-slate-200/80 rounded-lg text-slate-600 hover:text-slate-900 transition-all text-sm"
              >
                <ArrowLeft size={14} />
                <span className="text-xs sm:text-sm">Home</span>
              </button>
              
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: `rgb(${brand.coral})` }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: `rgb(${brand.lilac})` }} />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background: `rgb(${brand.indigo})` }} />
              </div>
            </div>

            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {isLogin ? "Welcome Back" : "Join AlumConnect"}
              </h2>
              <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">
                {isLogin 
                  ? "Access your alumni network" 
                  : "Create your professional profile"
                }
              </p>
            </div>

            {/* Updated Role Selection with Admin */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 bg-slate-100/80 p-1 sm:p-2 rounded-lg sm:rounded-xl mb-4 sm:mb-6">
              <button 
                onClick={() => setRole("alumni")} 
                className={`py-2 sm:py-2.5 rounded-md sm:rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                  role === 'alumni' 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-200/80'
                }`}
                style={role === 'alumni' 
                  ? { backgroundColor: '#9966CC' }
                  : {}
                }
              >
                Alumni
              </button>
              <button 
                onClick={() => setRole("student")} 
                className={`py-2 sm:py-2.5 rounded-md sm:rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                  role === 'student' 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-200/80'
                }`}
                style={role === 'student' 
                  ? { backgroundColor: '#9966CC' }
                  : {}
                }
              >
                Student
              </button>
              <button 
                onClick={() => setRole("admin")} 
                className={`py-2 sm:py-2.5 rounded-md sm:rounded-lg font-semibold transition-all text-xs sm:text-sm ${
                  role === 'admin' 
                    ? 'text-white shadow-lg transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-200/80'
                }`}
                style={role === 'admin' 
                  ? { backgroundColor: '#9966CC' }
                  : {}
                }
              >
                Admin
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-xs sm:text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {isLogin ? (
                <>
                  <RegularInput 
                    icon={<Mail size={18}/>} 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    required
                  />
                  <FormInput 
                    icon={<Key size={18}/>} 
                    name="password"
                    placeholder="Password" 
                    required
                    isPassword={true}
                    showPassword={showPassword}
                    onTogglePassword={togglePasswordVisibility}
                  />
                </>
              ) : (
                <>
                  {role !== 'admin' && (
                    <>
                      <RegularInput 
                        icon={<User size={18}/>} 
                        type="text" 
                        name="name"
                        placeholder={role === 'alumni' ? "Full Name (e.g. Priya Sharma)" : "Full Name (e.g. Rahul Kumar)"}
                        required
                      />
                      
                      <RegularInput 
                        icon={<Mail size={18}/>} 
                        type="email" 
                        name="email"
                        placeholder="Email Address"
                        required
                      />

                      <SelectInput 
                        icon={<Building2 size={18}/>}
                        name="college"
                        required
                      >
                        <option value="">Select Your College/University</option>
                        {colleges.map(college => (
                          <option key={college.id} value={college.id}>
                            {college.name}
                          </option>
                        ))}
                      </SelectInput>

                      {role === "student" && (
                        <RegularInput 
                          icon={<Hash size={18}/>} 
                          type="text" 
                          name="collegeId"
                          placeholder="College ID (e.g. 21BCE1234)"
                          required
                        />
                      )}

                      <FormInput 
                        icon={<Key size={18}/>} 
                        name="password"
                        placeholder="Create Password" 
                        required
                        isPassword={true}
                        showPassword={showPassword}
                        onTogglePassword={togglePasswordVisibility}
                      />
                    </>
                  )}
                  {role === 'admin' && (
                    <div className="text-center p-3 sm:p-4 bg-slate-50 rounded-lg">
                      <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" style={{ color: `rgb(${brand.indigo})` }} />
                      <p className="text-slate-600 text-xs sm:text-sm">Admin registration is not available. Please contact system administrator.</p>
                    </div>
                  )}
                </>
              )}

              {(isLogin || role !== 'admin') && (
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full text-white font-bold py-3 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 mt-3 sm:mt-4 text-sm sm:text-base ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  style={{ backgroundColor: '#9966CC' }}
                >
                  {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                </button>
              )}
            </form>

            {(isLogin || role !== 'admin') && (
              <>
                <div className="flex items-center my-4 sm:my-6">
                  <hr className="flex-grow border-slate-300"/>
                  <span className="mx-3 sm:mx-4 text-slate-500 text-xs sm:text-sm font-medium">OR</span>
                  <hr className="flex-grow border-slate-300"/>
                </div>

                <button className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white/80 border border-slate-200 text-slate-700 font-semibold py-3 sm:py-3.5 rounded-lg sm:rounded-xl hover:bg-white hover:border-slate-300 transition-all shadow-sm hover:shadow-md text-sm sm:text-base">
                  <GoogleIcon/>
                  Continue with Google
                </button>
              </>
            )}

            {role !== 'admin' && (
              <div className="text-center mt-4 sm:mt-6">
                <button 
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setShowPassword(false);
                  }} 
                  className="font-semibold transition-colors hover:underline text-sm sm:text-base"
                  style={{ color: `rgb(${brand.indigo})` }}
                >
                  {isLogin 
                    ? "New to AlumConnect? Create Account" 
                    : "Already have an account? Sign In"
                  }
                </button>
              </div>
            )}

            {/* SIH Badge */}
            <div className="text-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/50">
              <p className="text-xs text-slate-500">
                SIH 2025 Solution • Problem Statement #25017
              </p>
            </div>

            {/* Mobile Demo Credentials */}
            <div className="md:hidden mt-4 p-3 bg-slate-50/80 backdrop-blur-lg border border-slate-200/60 rounded-xl">
              <h3 className="font-semibold text-slate-900 mb-2 text-sm">Demo Credentials:</h3>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>Alumni:</strong> divya@example.com</p>
                <p><strong>Student:</strong> saurav@example.com</p>
                <p><strong>Admin:</strong> karan@college.edu</p>
                <p><strong>Password:</strong> {role === 'admin' ? 'Tiwariji' : 'password123'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
