import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, Home, Users, Calendar, Briefcase, User, 
  LogOut, Menu, X, Bell
} from "lucide-react";
import { logout, getCurrentUser } from "../utils/auth";

const brand = {
  indigo: '153 102 204',   // #9966CC
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

export default function StudentNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New job opportunity posted', time: '30 min ago', unread: true },
    { id: 2, message: 'Event reminder: Career Fair', time: '2h ago', unread: true },
    { id: 3, message: 'Alumni connection request', time: '1d ago', unread: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  const navItems = [
    { name: 'Dashboard', href: '/student/dashboard', icon: Home },
    { name: 'Directory', href: '/student/explore', icon: Users },
    { name: 'Networking Hub', href: '/student/network', icon: Users },
    { name: 'Career', href: '/student/jobs', icon: Briefcase },
    { name: 'Events', href: '/student/events', icon: Calendar },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/student/dashboard" className="flex items-center gap-2">
            <GraduationCap 
              className="w-8 h-8" 
              style={{ color: `rgb(${brand.indigo})` }}
            />
            <span
              className="text-xl font-bold"
              style={{ color: '#c25f3a' }}
            >
              AlumConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  style={isActive 
                    ? { backgroundColor: '#9966CC' }
                    : {}
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notification Button with Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-600 hover:text-slate-900 relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute top-12 right-0 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-slate-900">Notifications</h3>
                    <button 
                      onClick={() => setNotifications(prev => prev.map(n => ({...n, unread: false})))}
                      className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Mark all as read
                    </button>
                  </div>
                  {notifications.length > 0 ? (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-3 rounded-lg transition-colors ${notification.unread ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}>
                          <p className={`text-sm ${notification.unread ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-slate-500 py-4">You're all caught up!</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/student/profile" className="text-right">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">Student</p>
              </Link>
              <Link 
                to="/student/profile"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{ backgroundColor: '#9966CC' }}
              >
                {user?.name?.split(' ').map(n => n[0]).join('')}
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 absolute top-16 left-0 right-0 z-50 shadow-lg">
          <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Mobile Notification button */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all text-base font-medium relative"
            >
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="bg-slate-50 p-3 rounded-lg mt-2 space-y-2">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={`p-2 rounded-lg ${notification.unread ? 'bg-indigo-100' : ''}`}>
                      <p className={`text-sm ${notification.unread ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{notification.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-slate-500 py-2">You're all caught up!</p>
                )}
              </div>
            )}
            
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  style={isActive 
                    ? { backgroundColor: '#9966CC' }
                    : {}
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            
            <div className="border-t border-slate-200 pt-2 mt-2">
              <Link
                to="/student/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all text-base font-medium"
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all text-base font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
   