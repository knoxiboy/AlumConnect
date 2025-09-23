import { useState, useEffect } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { getCurrentUser } from "../../utils/auth";
import { alumniProfiles } from "../../data/alumni";
import { recentEvents } from "../../data/adminMockData";
import { jobPostings } from "../../data/jobs";
import {
  Users, Calendar, Briefcase, TrendingUp, 
  Bell, MessageCircle, Heart, Eye
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

const StatCard = ({ icon, title, value, trend, color }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium text-slate-600">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-slate-900">{value}</p>
        {trend && (
          <p className="text-xs sm:text-sm text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </p>
        )}
      </div>
      <div 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `rgba(${color}, 0.1)` }}
      >
        <div style={{ color: `rgb(${color})` }}>
          <div className="w-5 h-5 sm:w-6 sm:h-6">
            {icon}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function AlumniDashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  
  // Get user once and store in variable to prevent re-renders
  const user = getCurrentUser();

  useEffect(() => {
    // Only run if user exists and userProfile is not already set
    if (user && !userProfile) {
      // Get user's alumni profile
      const profile = alumniProfiles.find(p => p.id === user.id);
      setUserProfile(profile);

      // Set recent activity (static data - no need to depend on user)
      setRecentActivity([
        { id: 1, type: 'connection', message: 'Neha Patel viewed your profile', time: '2 hours ago' },
        { id: 2, type: 'event', message: 'New event: Annual Alumni Meet 2025', time: '1 day ago' },
        { id: 3, type: 'job', message: 'Your job posting received 5 new applications', time: '2 days ago' },
      ]);
    }
  }, [user?.id, userProfile]); // Only depend on user ID and whether profile is already loaded

  const upcomingEvents = recentEvents.filter(e => e.status === 'Upcoming').slice(0, 3);
  const latestJobs = jobPostings.filter(j => j.isActive).slice(0, 3);

  // Show loading while user profile is being fetched
  if (user && !userProfile) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
        <AlumniNavbar />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-slate-600 text-sm sm:text-base">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <AlumniNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome back, {userProfile?.name || user?.name}! 👋
          </h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Here's what's happening in your alumni network today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Network Connections"
            value="156"
            trend="+12 this month"
            color={brand.indigo}
          />
          <StatCard
            icon={<Calendar className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Upcoming Events"
            value={upcomingEvents.length}
            color={brand.coral}
          />
          <StatCard
            icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Job Opportunities"
            value={latestJobs.length}
            trend="+5 this week"
            color={brand.lilac}
          />
          <StatCard
            icon={<MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Messages"
            value="8"
            color={brand.indigo}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: `rgb(${brand.indigo})` }} />
                Recent Activity
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3 p-2 sm:p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: `rgb(${brand.coral})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-slate-900 line-clamp-2">{activity.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: `rgb(${brand.coral})` }} />
                Upcoming Events
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 hover:bg-slate-50 rounded-lg transition-colors gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-900 text-sm sm:text-base line-clamp-1">{event.name}</p>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} • {event.venue}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full self-start sm:self-auto flex-shrink-0">
                      {event.attendees} attending
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Profile Summary */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Your Profile</h3>
              <div className="text-center">
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg mx-auto mb-2 sm:mb-3"
                  style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                >
                  {(userProfile?.name || user?.name)?.split(' ').map(n => n[0]).join('')}
                </div>
                <p className="font-medium text-slate-900 text-sm sm:text-base line-clamp-1">
                  {userProfile?.name || user?.name}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">
                  {userProfile?.currentRole || 'Alumni'}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">
                  {userProfile?.company || 'Professional'}
                </p>
                <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    48 views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                    23 likes
                  </span>
                </div>
              </div>
            </div>

            {/* Latest Job Opportunities */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: `rgb(${brand.lilac})` }} />
                Latest Jobs
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {latestJobs.map(job => (
                  <div key={job.id} className="p-2 sm:p-3 hover:bg-slate-50 rounded-lg transition-colors">
                    <p className="font-medium text-slate-900 text-xs sm:text-sm line-clamp-2">{job.title}</p>
                    <p className="text-xs text-slate-600 line-clamp-1">{job.company}</p>
                    <p className="text-xs text-slate-500 mt-1">{job.salary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
