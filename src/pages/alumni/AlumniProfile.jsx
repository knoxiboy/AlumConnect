import { useState, useEffect } from "react";
import AlumniNavbar from "../../layouts/AlumniNavbar";
import { getCurrentUser } from "../../utils/auth";
import { alumniProfiles } from "../../data/alumni";
import {
  User, Mail, MapPin, Calendar, Briefcase, Award, 
  Edit3, Save, X, Plus, Trash2, ExternalLink
} from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

export default function AlumniProfile() {
  const user = getCurrentUser();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const userProfile = alumniProfiles.find(p => p.id === user?.id);
    if (userProfile) {
      setProfile(userProfile);
      setEditForm(userProfile);
    }
  }, [user]);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  if (!profile) {
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
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Profile</h1>
            <div className="flex gap-2">
              {isEditing && (
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-sm sm:text-base"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  Cancel
                </button>
              )}
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold text-white transition-all text-sm sm:text-base"
                style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
              >
                {isEditing ? <Save className="w-3 h-3 sm:w-4 sm:h-4" /> : <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Profile Photo & Basic Info */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-white font-bold text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4"
                  style={{ backgroundImage: `linear-gradient(135deg, rgb(${brand.indigo}), rgb(${brand.coral}))` }}
                >
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                {isEditing ? (
                  <div className="space-y-2 sm:space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full text-center font-bold text-lg sm:text-xl bg-white border border-slate-300 rounded-lg py-2 px-3 text-sm sm:text-base"
                      placeholder="Full Name"
                    />
                    <input
                      type="text"
                      value={editForm.currentRole}
                      onChange={(e) => setEditForm({...editForm, currentRole: e.target.value})}
                      className="w-full text-center text-slate-600 bg-white border border-slate-300 rounded-lg py-2 px-3 text-sm sm:text-base"
                      placeholder="Current Role"
                    />
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                      className="w-full text-center text-slate-600 bg-white border border-slate-300 rounded-lg py-2 px-3 text-sm sm:text-base"
                      placeholder="Company"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-2">{profile.name}</h2>
                    <p className="text-slate-600 text-sm sm:text-base line-clamp-1">{profile.currentRole}</p>
                    <p className="text-slate-600 text-sm sm:text-base line-clamp-1">{profile.company}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 text-sm">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-0">
                    <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="flex-1 bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm"
                        placeholder="Email"
                      />
                    ) : (
                      <span className="text-slate-600 line-clamp-1">{profile.email}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-0">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        className="flex-1 bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm"
                        placeholder="Location"
                      />
                    ) : (
                      <span className="text-slate-600 line-clamp-1">{profile.location}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-0">
                    <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.graduationYear}
                        onChange={(e) => setEditForm({...editForm, graduationYear: parseInt(e.target.value)})}
                        className="flex-1 bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm"
                        placeholder="Graduation Year"
                        min="1950"
                        max="2030"
                      />
                    ) : (
                      <span className="text-slate-600">Graduated {profile.graduationYear}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-0">
                    <Award className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.degree}
                        onChange={(e) => setEditForm({...editForm, degree: e.target.value})}
                        className="flex-1 bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm"
                        placeholder="Degree"
                      />
                    ) : (
                      <span className="text-slate-600 line-clamp-1">{profile.degree}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">About</h3>
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    rows={4}
                    className="w-full bg-white border border-slate-300 rounded-lg py-2 sm:py-3 px-3 sm:px-4 text-slate-900 resize-none text-sm sm:text-base"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{profile.bio}</p>
                )}
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Skills</h3>
                  {isEditing && (
                    <button className="text-sm text-slate-500 hover:text-slate-700">
                      + Add Skill
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full text-white"
                      style={{ backgroundImage: `linear-gradient(90deg, rgb(${brand.indigo}), rgb(${brand.lilac}))` }}
                    >
                      {skill}
                      {isEditing && (
                        <button className="ml-1 hover:text-red-200">
                          <X className="w-3 h-3 inline" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Professional Experience</h3>
            {isEditing && (
              <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            )}
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {profile.experience && profile.experience.length > 0 ? (
              profile.experience.map((exp, index) => (
                <div key={index} className="border-l-2 sm:border-l-4 border-slate-200 pl-3 sm:pl-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={exp.role}
                            className="w-full font-semibold bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm"
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            className="w-full bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm"
                            placeholder="Company"
                          />
                          <input
                            type="text"
                            value={exp.duration}
                            className="w-full bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm"
                            placeholder="Duration (e.g., Jan 2020 - Present)"
                          />
                          <textarea
                            value={exp.description}
                            rows={2}
                            className="w-full bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm resize-none"
                            placeholder="Job description..."
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-1">{exp.role}</h4>
                          <p className="text-slate-600 text-sm line-clamp-1">{exp.company}</p>
                          <p className="text-xs sm:text-sm text-slate-500">{exp.duration}</p>
                          <p className="text-slate-600 mt-1 sm:mt-2 text-sm leading-relaxed">{exp.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                      {isEditing && (
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <Briefcase className="w-8 h-8 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-slate-500 text-sm sm:text-base">No professional experience added yet</p>
                {isEditing && (
                  <button className="mt-2 text-sm font-medium" style={{ color: `rgb(${brand.indigo})` }}>
                    Add your first experience
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Achievements</h3>
            {isEditing && (
              <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            )}
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {profile.achievements && profile.achievements.length > 0 ? (
              profile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{ color: `rgb(${brand.coral})` }} />
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={achievement}
                        className="flex-1 bg-white border border-slate-300 rounded-lg py-1 px-2 text-sm"
                        placeholder="Achievement description"
                      />
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-600 text-sm sm:text-base">{achievement}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <Award className="w-8 h-8 sm:w-12 sm:h-12 text-slate-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-slate-500 text-sm sm:text-base">No achievements added yet</p>
                {isEditing && (
                  <button className="mt-2 text-sm font-medium" style={{ color: `rgb(${brand.indigo})` }}>
                    Add your first achievement
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
