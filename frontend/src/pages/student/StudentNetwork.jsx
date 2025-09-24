import { useState, useEffect } from "react";
import StudentNavbar from "../../layouts/StudentNavbar";
import { getCurrentUser } from "../../utils/auth";
import { 
  Users, GraduationCap
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

// Mock data
const networkData = {
  stats: {
    connections: 3,
    mentors: 3
  },
  connections: [
    { id: 1, initials: "JD", name: "Jane Doe", role: "Senior Software Engineer", type: "alumni" },
    { id: 2, initials: "MJ", name: "Mike Johnson", role: "Lead Data Scientist", type: "alumni" },
    { id: 3, initials: "ED", name: "Emily Davis", role: "Senior Product Manager", type: "alumni" }
  ],
  mentors: [
    { id: 1, name: "Lisa Martinez", role: "Senior Mechanical Engineer", company: "Tesla" },
    { id: 2, name: "David Kim", role: "Principal Software Engineer", company: "Epic Systems" },
    { id: 3, name: "Priya Patel", role: "Vice President", company: "Goldman Sachs" }
  ],
  requests: [
    { id: 1, name: "Sarah Johnson", major: "Computer Science", type: "student", time: "2 days ago", message: "Hi John! I'd love to connect and discuss your AI/ML projects." }
  ]
};

export default function StudentNetwork() {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState('network');

  useEffect(() => {
    // Dynamically load the WidgetBot HTML embed script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/html-embed';
    script.async = true;
    script.defer = true;
    
    document.body.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleConnect = (id) => {
    // Handle connect logic
    console.log("Connect with mentor", id);
  };

  const handleAcceptRequest = (id) => {
    // Handle accept request logic
    console.log("Accept request", id);
  };

  const handleDeclineRequest = (id) => {
    // Handle decline request logic
    console.log("Decline request", id);
  };

  return (
    <div className="min-h-screen mobile-scroll-container" style={{ backgroundColor: '#F9F8FE' }}>
      <StudentNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Networking Hub</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Connect with alumni and find mentorship opportunities through our Discord community.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Total Connections</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{networkData.stats.connections}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `rgba(${brand.lilac}, 0.1)` }}
              >
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.lilac})` }} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Available Mentors</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{networkData.stats.mentors}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Only My Network and Requests */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl mb-6 sm:mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-6 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('network')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'network'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                My Network
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'requests'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Requests
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* My Network Tab */}
            {activeTab === 'network' && (
              <div className="space-y-6 sm:space-y-8">
                {/* Connections Section */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">
                    My Connections ({networkData.connections.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {networkData.connections.map((person) => (
                      <div key={person.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                            style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                          >
                            {person.initials}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{person.name}</h3>
                            <p className="text-xs sm:text-sm text-slate-600">{person.role}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                              {person.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mentors Section */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">
                    Available Mentors ({networkData.mentors.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {networkData.mentors.map((mentor) => (
                      <div key={mentor.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-slate-900">{mentor.name}</h3>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1">{mentor.role}</p>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">{mentor.company}</p>
                          </div>
                          <button
                            onClick={() => handleConnect(mentor.id)}
                            className="px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium text-white transition-all"
                            style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                          >
                            Connect
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">
                  Incoming Requests ({networkData.requests.length})
                </h2>
                <div className="space-y-4">
                  {networkData.requests.map((request) => (
                    <div key={request.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                            style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                          >
                            {request.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{request.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-500">{request.major}</span>
                              <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                                {request.type}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 mt-2">{request.time}</p>
                            <p className="text-sm text-slate-600 mt-2 italic">"{request.message}"</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(request.id)}
                            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Discord Widget Integration */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Community Chat</h2>
          <p className="text-slate-600 mb-4">Connect with alumni, find mentors, and participate in discussions through our Discord community.</p>
          
          {/* Discord Widget */}
          <div className="rounded-lg overflow-hidden">
            <widgetbot
              server="1420060670828744877"
              channel="1420060672045355010"
              width="1170"
              height="600"
            ></widgetbot>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>
      </main>
    </div>
  );
}