import { useState } from "react";
import { X } from "lucide-react";

// Brand colors
const brand = {
  indigo: '118 98 214',
  lilac: '196 160 255', 
  coral: '255 145 120',
};

const PostModal = ({ isOpen, onClose, onSubmit, postType, initialData }) => {
  const [formData, setFormData] = useState(initialData || getDefaultFormData(postType));

  if (!isOpen) return null;

  function getDefaultFormData(type) {
    switch (type) {
      case 'mentorship':
        return {
          name: '',
          role: '',
          company: '',
          bio: '',
          domains: '',
          skills: '',
          experience: '',
          status: 'available'
        };
      case 'resource':
        return {
          title: '',
          author: '',
          type: 'article',
          description: '',
          categories: '',
          link: ''
        };
      case 'startup':
        return {
          name: '',
          description: '',
          industry: '',
          stage: 'idea',
          website: ''
        };
      case 'project':
        return {
          title: '',
          description: '',
          technologies: '',
          difficulty: 'beginner',
          category: '',
          teamSize: 1
        };
      default:
        return {};
    }
  }

  const getTitle = () => {
    const action = initialData ? 'Edit' : 'Post New';
    switch (postType) {
      case 'mentorship': return `${action} Mentorship`;
      case 'resource': return `${action} Resource`;
      case 'startup': return `${action} Startup`;
      case 'project': return `${action} Project`;
      default: return `${action} Post`;
    }
  };

  const getFormFields = () => {
    switch (postType) {
      case 'mentorship':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Bio *
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                required
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Tell us about yourself and your mentoring approach..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Domains (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.domains}
                  onChange={(e) => setFormData({...formData, domains: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., Software Engineering, Web Development"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., 5+ years"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Skills (comma separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="e.g., React, Node.js, Python, SQL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Availability Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
              >
                <option value="available">Available for Mentoring</option>
                <option value="busy">Currently Busy</option>
                <option value="full">Mentorship Slots Full</option>
              </select>
            </div>
          </>
        );
      
      case 'resource':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Resource title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="Author name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Resource Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                >
                  <option value="article">Article</option>
                  <option value="course">Course</option>
                  <option value="ebook">eBook</option>
                  <option value="video">Video</option>
                  <option value="guide">Guide</option>
                  <option value="podcast">Podcast</option>
                  <option value="tool">Tool</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Describe what this resource covers and who it's for..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Categories (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.categories}
                  onChange={(e) => setFormData({...formData, categories: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., Web Development, Career Guidance"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Link
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="https://example.com/resource"
                />
              </div>
            </div>
          </>
        );
      
      case 'startup':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Startup Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Startup name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Describe your startup and what problem it solves..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Industry *
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., FinTech, HealthTech"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Stage *
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({...formData, stage: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                >
                  <option value="idea">Idea Stage</option>
                  <option value="mvp">MVP</option>
                  <option value="seed">Seed Stage</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B</option>
                  <option value="growth">Growth Stage</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="https://yourstartup.com"
              />
            </div>
          </>
        );
      
      case 'project':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                placeholder="Describe the project, its goals, and what you're looking for..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., React, Node.js, Python"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                  placeholder="e.g., Web Development, AI/ML"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Team Size
                </label>
                <input
                  type="number"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({...formData, teamSize: parseInt(e.target.value) || 1})}
                  min="1"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:border-slate-400"
                />
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process form data
    const postData = {
      ...formData,
      id: initialData?.id || `${postType}_${Date.now()}`,
      postedDate: initialData?.postedDate || new Date().toISOString().split('T')[0],
      postedBy: "You" // In a real app, this would come from the user context
    };
    
    // Special processing for comma-separated fields
    if (postType === 'mentorship') {
      postData.domains = formData.domains.split(',').map(d => d.trim()).filter(d => d);
      postData.skills = formData.skills.split(',').map(s => s.trim()).filter(s => s);
    } else if (postType === 'resource') {
      postData.categories = formData.categories.split(',').map(c => c.trim()).filter(c => c);
    } else if (postType === 'project') {
      postData.technologies = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
    }
    
    onSubmit(postData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              {getTitle()}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {getFormFields()}
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: '#9966CC' }}
              >
                {initialData ? 'Update' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;