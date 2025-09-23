import { useState } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { getCurrentUser } from "../../utils/auth";
import {
  User, Mail, Lock, Bell, Palette, Globe, Save, X
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

export default function AlumniSettings() {
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    notifications: {
      email: true,
      push: false,
      newsletter: true
    },
    theme: 'light',
    language: 'en'
  });

  const handleSave = () => {
    // Here you would typically save to backend
    alert('Settings saved successfully!');
  };

  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      notifications: {
        email: true,
        push: false,
        newsletter: true
      },
      theme: 'light',
      language: 'en'
    });
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F8FE' }}>
      <AlumniNavbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Settings</h1>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-sm sm:text-base"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold text-white transition-all text-sm sm:text-base"
                style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? 'text-white shadow-lg'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      style={activeTab === tab.id 
                        ? { backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }
                        : {}
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="lg:w-3/4">
              <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6">
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Profile Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all text-sm sm:text-base"
                          style={{
                            '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all text-sm sm:text-base"
                          style={{
                            '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Security Settings</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all text-sm sm:text-base"
                          style={{
                            '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all text-sm sm:text-base"
                          style={{
                            '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={formData.confirmNewPassword}
                          onChange={(e) => setFormData({...formData, confirmNewPassword: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all text-sm sm:text-base"
                          style={{
                            '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Notification Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900">Email Notifications</h3>
                          <p className="text-sm text-slate-600">Receive email updates about your account and network</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.notifications.email}
                            onChange={(e) => setFormData({
                              ...formData,
                              notifications: {
                                ...formData.notifications,
                                email: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900">Push Notifications</h3>
                          <p className="text-sm text-slate-600">Receive push notifications on your device</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.notifications.push}
                            onChange={(e) => setFormData({
                              ...formData,
                              notifications: {
                                ...formData.notifications,
                                push: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900">Newsletter</h3>
                          <p className="text-sm text-slate-600">Receive our monthly newsletter with updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.notifications.newsletter}
                            onChange={(e) => setFormData({
                              ...formData,
                              notifications: {
                                ...formData.notifications,
                                newsletter: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4">Appearance</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Theme</label>
                        <select
                          value={formData.theme}
                          onChange={(e) => setFormData({...formData, theme: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all text-sm sm:text-base"
                          style={{
                            '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                          }}
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System Default</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                        <select
                          value={formData.language}
                          onChange={(e) => setFormData({...formData, language: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-300 transition-all text-sm sm:text-base"
                          style={{
                            '--tw-ring-color': `rgba(${brand.indigo}, 0.3)`
                          }}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}