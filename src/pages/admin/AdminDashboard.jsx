import { useEffect, useMemo, useState } from "react";
import { dashboardStats as seedStats, pendingApprovals as seedPending, recentEvents } from "../../data/adminMockData";
import { 
  Users, CheckCircle, XCircle, UserCircle2, CalendarDays, TrendingUp, 
  Database, Network, DollarSign, Award, Target, MessageSquare
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [stats, setStats] = useState(seedStats);

  useEffect(() => {
    setPending(seedPending);
    setStats((s) => ({
      ...s,
      pendingApprovals: seedPending.length,
      activeEvents: recentEvents.filter(e => e.status === "Upcoming").length,
      // Enhanced metrics for SIH problem statement
      engagementRate: 78, // Alumni engagement percentage
      mentorshipConnections: 156, // Active mentorship pairs
      fundraisingAmount: 2.4, // In lakhs
      jobPlacements: 89 // Alumni-referred placements
    }));
  }, []);

  const handleApprove = (id) => {
    setPending((prev) => {
      const item = prev.find((p) => p.id === id);
      const next = prev.filter((p) => p.id !== id);

      setStats((s) => {
        const role = (item?.role || "").toLowerCase();
        const bump = role === "alumni" ? { totalAlumni: s.totalAlumni + 1 } :
                     role === "student" ? { totalStudents: s.totalStudents + 1 } : {};
        return {
          ...s,
          ...bump,
          pendingApprovals: next.length,
        };
      });

      return next;
    });
  };

  const handleReject = (id) => {
    setPending((prev) => {
      const next = prev.filter((p) => p.id !== id);
      setStats((s) => ({ ...s, pendingApprovals: next.length }));
      return next;
    });
  };

  const dashboardStats = useMemo(() => ({
    totalAlumni: stats.totalAlumni,
    totalStudents: stats.totalStudents,
    pendingApprovals: pending.length,
    activeEvents: stats.activeEvents,
    engagementRate: stats.engagementRate,
    mentorshipConnections: stats.mentorshipConnections,
    fundraisingAmount: stats.fundraisingAmount,
    jobPlacements: stats.jobPlacements
  }), [stats, pending]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header with SIH Problem Context */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Alumni Data Management Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-xs sm:text-sm text-slate-600">
            <CalendarDays className="h-4 w-4" /> {new Date().toDateString()}
          </span>
        </div>
      </div>

      {/* Enhanced Stats Grid - Core Metrics from Problem Statement */}
      <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Alumni" 
          value={formatNum(dashboardStats.totalAlumni)} 
          delta="+2.1%" 
          icon={<Users className="h-5 h-5 sm:h-6 sm:w-6" />} 
          color={brand.indigo}
          subtitle="Registered alumni in system"
        />
        <StatCard 
          title="Current Students" 
          value={formatNum(dashboardStats.totalStudents)} 
          delta="+1.4%" 
          icon={<UserCircle2 className="h-5 h-5 sm:h-6 sm:w-6" />} 
          color={brand.coral}
          subtitle="Active student profiles"
        />
        <StatCard 
          title="Pending Approvals" 
          value={dashboardStats.pendingApprovals} 
          delta="today" 
          icon={<CheckCircle className="h-5 h-5 sm:h-6 sm:w-6" />} 
          color={brand.lilac}
          subtitle="Awaiting verification"
        />
        <StatCard 
          title="Active Events" 
          value={dashboardStats.activeEvents} 
          delta="+1 new" 
          icon={<CalendarDays className="h-5 h-5 sm:h-6 sm:w-6" />} 
          color={brand.indigo}
          subtitle="Upcoming events"
        />
      </div>

      {/* Problem Statement Impact Metrics */}
      <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Alumni Engagement" 
          value={`${dashboardStats.engagementRate}%`} 
          delta="+12% this quarter" 
          icon={<Network className="h-5 h-5 sm:h-6 sm:w-6" />} 
          color={brand.coral}
          subtitle="Active participation rate"
        />
        <StatCard 
          title="Mentorship Pairs" 
          value={dashboardStats.mentorshipConnections} 
          delta="+23 this month" 
          icon={<Target className="h-5 h-5 sm:h-6 sm:w-6" />} 
          color={brand.lilac}
          subtitle="Alumni-student connections"
        />
        <StatCard 
          title="Fundraising (₹L)" 
          value={`${dashboardStats.fundraisingAmount}L`} 
          delta="+0.8L this year" 
          icon={<DollarSign className="h-5 h-5 sm:h-6 sm:w-6" />} 
          color={brand.indigo}
          subtitle="Total donations raised"
        />
        <StatCard 
          title="Job Placements" 
          value={dashboardStats.jobPlacements} 
          delta="+15 this semester" 
          icon={<Award className="h-5 h-5 sm:h-6 sm:w-6" />} 
          color={brand.coral}
          subtitle="Alumni referrals"
        />
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Approvals table - Mobile Responsive */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-b border-slate-200 gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Pending Approvals</h2>
            <span className="text-xs rounded-full bg-slate-100 text-slate-600 px-3 py-1 self-start sm:self-auto">
              {pending.length} awaiting verification
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 text-sm">
                <tr>
                  <th className="p-3 sm:p-4 font-medium">User</th>
                  <th className="p-3 sm:p-4 font-medium">Role</th>
                  <th className="p-3 sm:p-4 font-medium hidden md:table-cell">Requested</th>
                  <th className="p-3 sm:p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {pending.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar name={item.name} />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 line-clamp-1">{item.name}</p>
                          <p className="text-slate-500 text-xs sm:text-sm line-clamp-1">{item.details}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className={`inline-flex items-center rounded-full px-2 sm:px-3 py-1 text-xs font-medium ${
                        item.role === 'Alumni'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {item.role}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 hidden md:table-cell text-slate-600 text-xs sm:text-sm">{item.joinDate}</td>
                    <td className="p-3 sm:p-4">
                      <div className="flex justify-end gap-1 sm:gap-2">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-green-100 px-2 sm:px-3 py-1 sm:py-2 text-green-800 hover:bg-green-200 transition text-xs sm:text-sm font-medium"
                        >
                          <CheckCircle className="h-3 h-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-2 sm:px-3 py-1 sm:py-2 text-red-800 hover:bg-red-200 transition text-xs sm:text-sm font-medium"
                        >
                          <XCircle className="h-3 h-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Reject</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pending.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-slate-500" colSpan={4}>
                      <div className="flex flex-col items-center">
                        <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-slate-300 mb-2" />
                        <p className="font-medium">All approvals processed!</p>
                        <p className="text-xs sm:text-sm">No pending user verifications</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right rail - Problem Statement Focused */}
        <div className="space-y-6">
          <Card title="Platform Impact Today">
            <div className="space-y-3 text-sm">
              <Row label="New Registrations" value={`+${pending.length}`} />
              <Row label="Alumni Contacted" value="47" />
              <Row label="Mentorship Requests" value="12" />
              <Row label="Event Registrations" value="28" />
              <Row label="Job Applications" value="15" />
            </div>
          </Card>


          <Card title="Quick Actions">
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <MessageSquare className="w-4 h-4" style={{ color: `rgb(${brand.indigo})` }} />
                Send Alumni Newsletter
              </button>
              <button className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <CalendarDays className="w-4 h-4" style={{ color: `rgb(${brand.coral})` }} />
                Schedule Alumni Event
              </button>
              <button className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <Database className="w-4 h-4" style={{ color: `rgb(${brand.lilac})` }} />
                Export Alumni Data
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, delta, icon, color, subtitle }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-slate-600 line-clamp-1">{title}</p>
          <p className="text-lg sm:text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 line-clamp-1">{subtitle}</p>
          )}
          {delta && (
            <p className="text-xs sm:text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {delta}
            </p>
          )}
        </div>
        <div 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${color}, 0.1)` }}
        >
          <div style={{ color: `rgb(${color})` }}>{icon}</div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function Avatar({ name }) {
  const initials = (name || "?").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div 
      className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white font-semibold text-xs sm:text-sm flex-shrink-0"
      style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
    >
      {initials}
    </div>
  );
}

function formatNum(n) {
  return Intl.NumberFormat("en", { notation: "compact" }).format(n);
}
