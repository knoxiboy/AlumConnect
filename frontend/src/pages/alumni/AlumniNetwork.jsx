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

// News Feed Data
const newsFeedData = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      initials: "SC",
      class: "Class of 2018",
      time: "2 hours ago"
    },
    content: "Excited to announce that I've been promoted to Senior Product Manager at Google! 🎉 Grateful for all the mentorship and support from our amazing alumni network.",
    likes: 47,
    comments: 12,
    shares: 0
  },
  {
    id: 2,
    author: {
      name: "Michael Rodriguez",
      initials: "MR",
      class: "Class of 2015",
      time: "5 hours ago"
    },
    content: "After 8 amazing years at Microsoft, I'm thrilled to share that I'm joining OpenAI as a Staff Engineer! Looking forward to working on cutting-edge AI technology. Thanks to everyone who supported me through this transition.",
    likes: 89,
    comments: 24,
    shares: 0
  },
  {
    id: 3,
    author: {
      name: "Emily Johnson",
      initials: "EJ",
      class: "Class of 2020",
      time: "1 day ago"
    },
    content: "Quick poll for fellow marketers: What's the most effective social media platform for B2B marketing in 2025?",
    poll: {
      question: "Best B2B social platform?",
      options: [
        { id: 1, text: "LinkedIn", votes: 45, percentage: 60 },
        { id: 2, text: "Twitter/X", votes: 18, percentage: 24 },
        { id: 3, text: "Instagram", votes: 8, percentage: 11 },
        { id: 4, text: "TikTok", votes: 4, percentage: 5 }
      ],
      totalVotes: 75
    },
    likes: 23,
    comments: 8,
    shares: 0
  },
  {
    id: 4,
    author: {
      name: "David Kim",
      initials: "DK",
      class: "Class of 2019",
      time: "2 days ago"
    },
    content: "Celebrating 5 years at Goldman Sachs! It's been an incredible journey from analyst to VP. Grateful for the opportunities and looking forward to mentoring more junior professionals.",
    likes: 34,
    comments: 15,
    shares: 0
  }
];

// Success Stories Data
const successStoriesData = [
  {
    id: 1,
    category: "Entrepreneurship",
    badge: "Raised Series A",
    title: "From Student to Startup Founder",
    author: {
      name: "Lisa Park",
      class: "Class of 2017",
      company: "TechFlow Inc"
    },
    description: "Started as a computer science student with a simple idea. Today, TechFlow has 50+ employees and $10M in funding.",
    image: null
  },
  {
    id: 2,
    category: "Technology",
    badge: "Director at Tesla",
    title: "Leading Innovation at Fortune 500",
    author: {
      name: "James Wilson",
      class: "Class of 2016",
      company: "Tesla"
    },
    description: "From engineering intern to Director of AI/ML. Led the team that developed Tesla's latest autonomous driving features.",
    image: null
  },
  {
    id: 3,
    category: "Social Impact",
    badge: "1M+ Trees Planted",
    title: "Social Impact Through Business",
    author: {
      name: "Maria Santos",
      class: "Class of 2019",
      company: "EcoSolutions"
    },
    description: "Founded a social enterprise that has helped plant over 1M trees while providing sustainable income to rural communities.",
    image: null
  }
];

// Polls & Surveys Data
const pollsData = [
  {
    id: 1,
    author: {
      name: "Emily Johnson",
      class: "Class of 2020",
      time: "1 day ago"
    },
    question: "Quick poll for fellow marketers: What's the most effective social media platform for B2B marketing in 2025?",
    poll: {
      question: "Best B2B social platform?",
      options: [
        { id: 1, text: "LinkedIn", votes: 45, percentage: 60 },
        { id: 2, text: "Twitter/X", votes: 18, percentage: 24 },
        { id: 3, text: "Instagram", votes: 8, percentage: 11 },
        { id: 4, text: "TikTok", votes: 4, percentage: 5 }
      ],
      totalVotes: 75,
      endDate: "in 2 days"
    }
  }
];

// NEW: Reusable Modal Component for Stat Cards
const StatModal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {data.length > 0 ? (
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                    >
                      {item.initials || item.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-600">{item.role || item.major}</p>
                      {item.message && (
                        <p className="text-sm text-slate-700 mt-2 italic">"{item.message}"</p>
                      )}
                      {item.type && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                          {item.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No data available for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default function AlumniNetwork() {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState('network');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    type: 'achievement' // 'achievement', 'photo', 'poll'
  });
  // NEW: State for the Stat Modal
  const [showStatModal, setShowStatModal] = useState(false);
  const [statModalData, setStatModalData] = useState({ title: '', data: [] });

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

  const handleLikePost = (id) => {
    // Handle like post logic
    console.log("Like post", id);
  };

  const handleSharePost = (id) => {
    // Handle share post logic
    console.log("Share post", id);
  };

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
          <p className="text-slate-600 mb-4">Join our Discord community to connect with students, offer mentorship, and participate in alumni discussions.</p>
          
          {/* Discord Widget */}
          <div className="rounded-lg overflow-hidden">
            <iframe 
              src="https://e.widgetbot.io/channels/123456789012345678/987654321098765432"
              width="100%" 
              height="600"
              frameBorder="0"
              className="rounded-lg"
              title="Discord Community"
            ></iframe>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500">
              Having trouble accessing the chat? <a href="https://discord.gg/your-invite-link" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Join our Discord server directly</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
  
  // NEW: Handler for clicking on a stat card
  const handleStatClick = (type, title) => {
    let data = [];
    if (type === 'connections') {
      data = networkData.connections;
    } else if (type === 'requests') {
      data = networkData.mentoringRequests;
    } else {
      // For 'hiring' and 'messages', we can use filtered mock data
      // For this example, we'll just show all connections to keep it simple
      data = networkData.connections;
    }
    setStatModalData({ title, data });
    setShowStatModal(true);
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

        {/* Stats Cards - NOW CLICKABLE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div 
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleStatClick('connections', 'My Connections')}
          >
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

          <div 
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleStatClick('requests', 'Mentoring Requests')}
          >
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

          <div 
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleStatClick('hiring', 'Hiring Alumni')}
          >
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

          <div 
            className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleStatClick('messages', 'Messages')}
          >
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
              <button
                onClick={() => setActiveTab('newsfeed')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'newsfeed'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                News Feed
              </button>
              <button
                onClick={() => setActiveTab('success')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'success'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Success Stories
              </button>
              <button
                onClick={() => setActiveTab('polls')}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base whitespace-nowrap ${
                  activeTab === 'polls'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Polls & Surveys
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* News Feed Tab */}
            {activeTab === 'newsfeed' && (
              <div className="space-y-6">
                {/* Share Update Section */}
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                    >
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <button
                        onClick={() => setShowShareModal(true)}
                        className="w-full text-left p-3 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors"
                      >
                        Share your achievements, career updates, or thoughts with the alumni community...
                      </button>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-indigo-600">
                          <span className="w-5 h-5">📸</span>
                          Photo
                        </button>
                        <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-indigo-600">
                          <span className="w-5 h-5">📊</span>
                          Poll
                        </button>
                        <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-indigo-600">
                          <span className="w-5 h-5">🎉</span>
                          Achievement
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* News Feed Posts */}
                <div className="space-y-6">
                  {newsFeedData.map((post) => (
                    <div key={post.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                          style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                        >
                          {post.author.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-slate-900">{post.author.name}</h3>
                              <p className="text-xs text-slate-600">{post.author.class} • {post.author.time}</p>
                            </div>
                          </div>
                          <p className="text-slate-800 mt-2">{post.content}</p>
                          
                          {post.poll && (
                            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                              <h4 className="font-medium text-slate-900 mb-3">{post.poll.question}</h4>
                              <div className="space-y-2">
                                {post.poll.options.map((option) => (
                                  <div key={option.id} className="relative">
                                    <div 
                                      className="absolute inset-0 rounded h-full bg-blue-100"
                                      style={{ width: `${option.percentage}%` }}
                                    ></div>
                                    <div className="relative flex justify-between items-center p-2">
                                      <span className="text-sm font-medium text-slate-900">{option.text}</span>
                                      <span className="text-sm text-slate-600">{option.percentage}%</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-slate-500 mt-2">{post.poll.totalVotes} total votes</p>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-100">
                            <button 
                              onClick={() => handleLikePost(post.id)}
                              className="flex items-center gap-1 text-sm text-slate-600 hover:text-red-500"
                            >
                              ❤️ {post.likes}
                            </button>
                            <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-500">
                              💬 {post.comments}
                            </button>
                            <button 
                              onClick={() => handleSharePost(post.id)}
                              className="flex items-center gap-1 text-sm text-slate-600 hover:text-green-500"
                            >
                              ↗️ Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Success Stories Tab */}
            {activeTab === 'success' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">Alumni Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {successStoriesData.map((story) => (
                    <div key={story.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                            {story.category}
                          </span>
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                            {story.badge}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-2">{story.title}</h3>
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                            style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                          >
                            {story.author.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{story.author.name}</p>
                            <p className="text-xs text-slate-600">{story.author.class}</p>
                            <p className="text-xs text-slate-600">{story.author.company}</p>
                          </div>
                        </div>
                        <p className="text-slate-700 text-sm mb-4">{story.description}</p>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                          Read More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Polls & Surveys Tab */}
            {activeTab === 'polls' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">Community Polls & Surveys</h2>
                <div className="space-y-6">
                  {pollsData.map((pollItem) => (
                    <div key={pollItem.id} className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                          style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                        >
                          {pollItem.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{pollItem.author.name}</h3>
                          <p className="text-xs text-slate-600">{pollItem.author.class} • {pollItem.author.time}</p>
                        </div>
                      </div>
                      
                      <p className="text-slate-800 mb-4">{pollItem.question}</p>
                      
                      <div className="p-4 bg-slate-50 rounded-lg mb-4">
                        <h4 className="font-medium text-slate-900 mb-3">{pollItem.poll.question}</h4>
                        <div className="space-y-2">
                          {pollItem.poll.options.map((option) => (
                            <div key={option.id} className="relative">
                              <div 
                                className="absolute inset-0 rounded h-full bg-blue-100"
                                style={{ width: `${option.percentage}%` }}
                              ></div>
                              <div className="relative flex justify-between items-center p-2">
                                <span className="text-sm font-medium text-slate-900">{option.text}</span>
                                <span className="text-sm text-slate-600">{option.percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200">
                          <p className="text-xs text-slate-500">{pollItem.poll.totalVotes} votes</p>
                          <p className="text-xs text-slate-500">Poll ends {pollItem.poll.endDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

        {/* Share Update Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Share an Update</h3>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex items-start gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                >
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="What would you like to share with the community?"
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="4"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-indigo-600">
                    <span className="w-5 h-5">📸</span>
                    Photo
                  </button>
                  <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-indigo-600">
                    <span className="w-5 h-5">📊</span>
                    Poll
                  </button>
                  <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-indigo-600">
                    <span className="w-5 h-5">🎉</span>
                    Achievement
                  </button>
                </div>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.content.trim()}
                  className={`px-4 py-2 rounded-lg font-medium text-white text-sm ${
                    newPost.content.trim() 
                      ? 'bg-indigo-600 hover:bg-indigo-700' 
                      : 'bg-indigo-300 cursor-not-allowed'
                  }`}
                >
                  Post Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NEW: Render the Stat Modal */}
        <StatModal
          isOpen={showStatModal}
          onClose={() => setShowStatModal(false)}
          title={statModalData.title}
          data={statModalData.data}
        />
      </main>
    </div>
  );
}