import { useState } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
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
    connections: 5,
    mentors: 2
  },
  connections: [
    { id: 1, initials: "JD", name: "Jane Doe", role: "Computer Science Student", type: "student" },
    { id: 2, initials: "SJ", name: "Sarah Johnson", role: "AI/ML Researcher", type: "student" },
    { id: 3, initials: "MJ", name: "Mike Johnson", role: "Lead Data Scientist", type: "alumni" },
    { id: 4, initials: "ED", name: "Emily Davis", role: "Senior Product Manager", type: "alumni" },
    { id: 5, initials: "TP", name: "Tom Peterson", role: "Software Engineer", type: "alumni" }
  ],
  mentoringRequests: [
    { id: 1, name: "Jane Doe", major: "Computer Science", message: "Hi! I'm interested in your software development experience and would love mentorship." },
    { id: 2, name: "Sarah Johnson", major: "AI/ML", message: "I'm working on ML projects and would appreciate your guidance in this field." }
  ]
};

export default function AlumniNetwork() {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState('network');

  const handleAcceptMentorship = (id) => {
    // Handle accept mentorship request logic
    console.log("Accept mentorship request", id);
  };

  const handleDeclineMentorship = (id) => {
    // Handle decline mentorship request logic
    console.log("Decline mentorship request", id);
  };

  const handleConnect = (id) => {
    // Handle connect logic
    console.log("Connect with person", id);
  };

  return (
    <div className="min-h-screen mobile-scroll-container" style={{ backgroundColor: '#F9F8FE' }}>
      <AlumniNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Networking Hub</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Connect with students, offer mentorship, and engage with the alumni community through our Discord platform.
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
                <p className="text-xs sm:text-sm font-medium text-slate-600">Mentoring Requests</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{networkData.stats.mentors}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Only My Network and Mentorship Requests */}
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
                Mentorship Requests
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
              </div>
            )}

            {/* Mentorship Requests Tab */}
            {activeTab === 'requests' && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">
                  Mentorship Requests ({networkData.mentoringRequests.length})
                </h2>
                <div className="space-y-4">
                  {networkData.mentoringRequests.map((request) => (
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
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">{request.major}</p>
                            <p className="text-sm text-slate-600 mt-2 italic">"{request.message}"</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptMentorship(request.id)}
                            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeclineMentorship(request.id)}
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
          <p className="text-slate-600 mb-4">Connect with students, offer mentorship, and participate in alumni discussions through our Discord community.</p>
          
          {/* Discord Widget with Fallback */}
          <div className="rounded-lg overflow-hidden bg-slate-50 border border-slate-200 min-h-[600px] flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Discord Community</h3>
              <p className="text-slate-600 mb-4">Join our Discord server to connect with fellow alumni and students.</p>
              <a 
                href="https://discord.gg/eFGKpqMxvP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Join Discord Server
              </a>
              <p className="text-xs text-slate-500 mt-3">
                Click above to join our Discord community directly
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}