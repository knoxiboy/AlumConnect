import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { testDB } from "../utils/api";
import { 
  Database, Users, Briefcase, CalendarDays, 
  ShieldCheck, TrendingUp, Globe, Award,
  CheckCircle, ArrowDown
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '153 102 204',   // #9966CC
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

const LoadingStep = ({ icon, title, description, isActive, isCompleted }) => (
  <div className={`flex items-start gap-4 p-4 rounded-lg transition-all ${isActive ? 'bg-indigo-50' : ''}`}>
    <div className="flex-shrink-0 mt-1">
      {isCompleted ? (
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      ) : (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isActive ? 'bg-indigo-500 text-white' : 'bg-slate-200'
        }`}>
          {icon}
        </div>
      )}
    </div>
    <div>
      <h3 className={`font-semibold ${isActive ? 'text-indigo-700' : isCompleted ? 'text-green-700' : 'text-slate-700'}`}>
        {title}
      </h3>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </div>
  </div>
);

export default function LoadingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [dbStatus, setDbStatus] = useState("Connecting to database...");
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      id: "database",
      icon: <Database className="w-4 h-4" />,
      title: "Database Connection",
      description: "Establishing secure connection to alumni database"
    },
    {
      id: "authentication",
      icon: <ShieldCheck className="w-4 h-4" />,
      title: "Authentication",
      description: "Verifying user credentials and permissions"
    },
    {
      id: "network",
      icon: <Users className="w-4 h-4" />,
      title: "Network Setup",
      description: "Initializing alumni networking features"
    },
    {
      id: "features",
      icon: <Briefcase className="w-4 h-4" />,
      title: "Loading Features",
      description: "Preparing dashboard, events, and career tools"
    },
    {
      id: "complete",
      icon: <CheckCircle className="w-4 h-4" />,
      title: "Ready",
      description: "All systems operational"
    }
  ];

  useEffect(() => {
    const loadApp = async () => {
      // Step 1: Database connection
      try {
        const data = await testDB();
        setDbStatus(data.message);
        setCurrentStep(1);
      } catch (error) {
        setDbStatus("Error connecting to the database");
        return;
      }

      // Simulate other loading steps
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(timer);
            setIsComplete(true);
            // Redirect after a short delay
            setTimeout(() => {
              navigate("/landing");
            }, 1000);
            return prev;
          }
        });
      }, 800);

      return () => clearInterval(timer);
    };

    loadApp();
  }, [navigate]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F9F8FE' }}>
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-extrabold"
               style={{ color: '#c25f3a' }}>
            AlumConnect
          </div>
          <div className="text-sm text-slate-600">
            Initializing platform...
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Initializing AlumConnect Platform
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Setting up your alumni networking experience
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="space-y-4 mb-12">
              {steps.map((step, index) => (
                <LoadingStep
                  key={step.id}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  isActive={index === currentStep}
                  isCompleted={index < currentStep}
                />
              ))}
            </div>

            {/* Database Status */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-5 h-5" style={{ color: `rgb(${brand.indigo})` }} />
                <h2 className="text-lg font-semibold text-slate-900">System Status</h2>
              </div>
              <p className="text-slate-700">{dbStatus}</p>
            </div>

            {/* Feature Highlights */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                     style={{ backgroundColor: '#9966CC' }}>
                  <Users className="w-6 h-6" style={{ color: `rgb(${brand.indigo})` }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Alumni Network</h3>
                <p className="text-sm text-slate-600">Connect with fellow graduates</p>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                     style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}>
                  <Briefcase className="w-6 h-6" style={{ color: `rgb(${brand.coral})` }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Career Hub</h3>
                <p className="text-sm text-slate-600">Jobs, mentorship, and opportunities</p>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                     style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}>
                  <CalendarDays className="w-6 h-6" style={{ color: `rgb(${brand.lilac})` }} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Events</h3>
                <p className="text-sm text-slate-600">Reunions, webinars, and networking</p>
              </div>
            </div>

            {/* Scroll to Section Links */}
            <div className="text-center">
              <p className="text-slate-600 mb-4">Explore key features after initialization:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('benefits')}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Benefits
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      {!isComplete && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-slate-400" />
        </div>
      )}
    </div>
  );
}