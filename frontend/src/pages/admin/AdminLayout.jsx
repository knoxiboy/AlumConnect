import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Calendar, Settings, LogOut, Menu, X,
  Bell, Search, GraduationCap
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("alumnnet_admin_session");
    navigate("/landing");
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Approvals', href: '/admin/approvals', icon: Users },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          
          {/* Mobile sidebar */}
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col">
            {/* Mobile sidebar header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 flex-shrink-0">
              <Link to="/admin/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: `rgb(${brand.indigo})` }} />
                <span className="text-lg sm:text-xl font-bold" style={{ color: `rgb(${brand.indigo})` }}>
                  Admin Panel
                </span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white shadow-lg'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    style={isActive 
                      ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }
                      : {}
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile logout button */}
            <div className="p-4 border-t border-slate-200 flex-shrink-0">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 w-full px-3 py-3 text-slate-600 hover:text-slate-900 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white/90 backdrop-blur-lg border-r border-slate-200">
          <div className="flex items-center h-16 px-4 border-b border-slate-200">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8" style={{ color: `rgb(${brand.indigo})` }} />
              <span className="text-xl font-bold" style={{ color: `rgb(${brand.indigo})` }}>
                Admin Panel
              </span>
            </Link>
          </div>
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  style={isActive 
                    ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }
                    : {}
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Mobile title */}
              <div className="lg:hidden">
                <h1 className="text-lg font-semibold text-slate-900">Admin Panel</h1>
              </div>
            </div>
            
            {/* Header actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search - Hidden on small mobile */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-slate-100 border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:border-slate-300 w-32 sm:w-48"
                />
              </div>
              
              {/* Mobile search icon */}
              <button className="sm:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Notifications */}
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* Admin profile */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">System Administrator</p>
                </div>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                  style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                >
                  A
                </div>
              </div>

              {/* Mobile logout button */}
              <button
                onClick={handleLogout}
                className="lg:hidden p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
