import { useState } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { getCurrentUser } from "../../utils/auth";
import { 
  Search, MessageCircle, UserPlus, Check, X as XIcon, 
  Users, Briefcase, GraduationCap, Building2
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
    mentors: 2,
    hiring: 1,
    messages: 4
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
  const [selectedConversation, setSelectedConversation] = useState(null);

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
            Manage your professional connections, mentor students, and engage with the alumni community.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `rgba(${brand.coral}, 0.1)` }}
              >
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.coral})` }} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Hiring Alumni</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{networkData.stats.hiring}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `rgba(${brand.indigo}, 0.1)` }}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `rgb(${brand.indigo})` }} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-600">Messages</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{networkData.stats.messages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
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
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Messages
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
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeclineMentorship(request.id)}
                            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Conversations List */}
                <div className="lg:w-1/3">
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:border-slate-300 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {networkData.connections.map((person) => (
                      <div 
                        key={person.id}
                        onClick={() => setSelectedConversation(person)}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedConversation?.id === person.id 
                            ? 'bg-indigo-50 border border-indigo-200' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                            style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                          >
                            {person.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{person.name}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-slate-500 truncate">
                                {person.name.split(' ')[0]}: {person.role}
                              </p>
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white text-xs">
                                1
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Chat Area */}
                <div className="lg:w-2/3 flex flex-col">
                  {selectedConversation ? (
                    <div className="flex-1 flex flex-col">
                      <div className="border-b border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                            style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                          >
                            {selectedConversation.initials}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{selectedConversation.name}</h3>
                            <p className="text-xs text-slate-500">Online</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4 bg-slate-50 rounded-lg mb-4">
                        <div className="space-y-4">
                          <div className="flex justify-start">
                            <div className="max-w-xs md:max-w-md bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-sm">Hi there! I saw your profile and thought we might have some common interests in software development.</p>
                              <p className="text-xs text-slate-400 mt-1">10:30 AM</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <div className="max-w-xs md:max-w-md bg-indigo-500 text-white rounded-lg p-3">
                              <p className="text-sm">Hi {selectedConversation.name}! That sounds great. I'm particularly interested in web development and cloud technologies.</p>
                              <p className="text-xs text-indigo-100 mt-1">10:32 AM</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-start">
                            <div className="max-w-xs md:max-w-md bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-sm">Great question! The key is to focus on practical projects that demonstrate your skills. I'd recommend starting with some end-to-end ML projects on GitHub.</p>
                              <p className="text-xs text-slate-400 mt-1">10:35 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-slate-300 text-sm"
                        />
                        <button
                          className="px-4 py-2 rounded-lg font-medium text-white text-sm"
                          style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-lg">
                      <div className="text-center p-8">
                        <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-1">Select a conversation</h3>
                        <p className="text-slate-500">Choose a conversation from the left to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}