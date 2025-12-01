import React, { useState } from 'react';
import GradientText from '@/Components/GradientText';
import { 
  User, Mail, Phone, MapPin, Briefcase, Calendar, 
  Github, Linkedin, Globe, Camera, Edit3, Save, X, 
  Shield, Key, Plus, Trash2, CheckCircle, Activity 
} from 'lucide-react';

// --- MOCK USER DATA ---
const INITIAL_USER = {
  fullName: "Rahul Sharma",
  role: "Senior Frontend Developer",
  experience: "5 Years",
  location: "Bangalore, India",
  email: "rahul.sharma@example.com",
  phone: "+91 98765 43210",
  joinedDate: "October 2023",
  bio: "Passionate developer crafting beautiful user interfaces. Love working with React, Tailwind, and modern web technologies. Always learning, always shipping.",
  portfolio: "https://rahul.dev",
  github: "github.com/rahulcodes",
  linkedin: "linkedin.com/in/rahulsharma",
  skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL", "Figma"],
  stats: {
    applications: 45,
    interviews: 12,
    offers: 2
  }
};

export default function UserProfile() {
  // --- STATE ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(INITIAL_USER);
  const [newSkill, setNewSkill] = useState("");

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // API Call to save data would go here
    setIsEditing(false);
    // Show success toast (mock)
    console.log("Saved:", formData);
  };

  const handleCancel = () => {
    setFormData(INITIAL_USER); // Reset to original
    setIsEditing(false);
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        skills: [...prev.skills, newSkill.trim()] 
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({ 
      ...prev, 
      skills: prev.skills.filter(skill => skill !== skillToRemove) 
    }));
  };

  return (
    <div className="min-h-screen bg-[#060010] text-slate-200 font-sans selection:bg-purple-500/30 pb-20 relative overflow-hidden">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
                <GradientText
                    colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]}
                    animationSpeed={8}
                    showBorder={false}
                    className="custom-class"
                    >
                    <h1 className="text-3xl font-bold md:text-4xl px-2">My Profile</h1>
                </GradientText>
            </h1>
            <p className="text-slate-300 text-sm mt-1 px-2">Manage your personal information and preferences.</p>
          </div>
          
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT COLUMN: PROFILE CARD (30%) --- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Main Profile Card */}
            <div className="bg-purple-950/10 backdrop-blur-xl border border-purple-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-4 group/avatar">
                  <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-indigo-500 to-purple-600">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200" 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-slate-900"
                    />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-1 right-1 p-2 bg-purple-800 text-white rounded-full border border-purple-700 hover:bg-purple-600 transition-colors shadow-lg">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">{formData.fullName}</h2>
                <p className="text-slate-200 font-medium mb-4">{formData.role}</p>

                {/* Mini Stats in Left Col */}
                <div className="w-full grid grid-cols-2 gap-3 text-sm border-t border-slate-800 pt-4 mb-4">
                  <div className="flex flex-col items-center p-2 rounded-lg bg-purple-800/20">
                    <Briefcase className="w-4 h-4 text-slate-200 mb-1" />
                    <span className="text-white font-bold">{formData.experience}</span>
                    <span className="text-slate-200 text-xs">Exp.</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-purple-800/20">
                    <Calendar className="w-4 h-4 text-slate-200 mb-1" />
                    <span className="text-white font-bold">2023</span>
                    <span className="text-slate-200 text-xs">Joined</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-200 text-sm">
                  <MapPin className="w-4 h-4" /> {formData.location}
                </div>
              </div>
            </div>

            {/* Activity Stats Card */}
            <div className="bg-purple-950/10 backdrop-blur-xl border border-purple-800/60 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" /> Activity
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-purple-800/20 border border-purple-800/50">
                  <span className="text-slate-200">Applications</span>
                  <span className="text-white font-bold text-lg">{formData.stats.applications}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-purple-800/20 border border-purple-800/50">
                  <span className="text-slate-200">Interviews</span>
                  <span className="text-white font-bold text-lg">{formData.stats.interviews}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-purple-800/20 border border-purple-800/50">
                  <span className="text-slate-200">Offers</span>
                  <span className="text-emerald-400 font-bold text-lg">{formData.stats.offers}</span>
                </div>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: DETAILS FORM (70%) --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Personal Information */}
            <div className="bg-purple-950/10 backdrop-blur-xl border border-purple-800/60 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" /> Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup 
                  label="Full Name" 
                  name="fullName" 
                  value={formData.fullName} 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<User className="w-4 h-4" />}
                />
                <InputGroup 
                  label="Email Address" 
                  name="email" 
                  value={formData.email} 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<Mail className="w-4 h-4" />}
                />
                <InputGroup 
                  label="Phone Number" 
                  name="phone" 
                  value={formData.phone} 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<Phone className="w-4 h-4" />}
                />
                <InputGroup 
                  label="Location" 
                  name="location" 
                  value={formData.location} 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<MapPin className="w-4 h-4" />}
                />
                <InputGroup 
                  label="Current Role" 
                  name="role" 
                  value={formData.role} 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<Briefcase className="w-4 h-4" />}
                />
                 <InputGroup 
                  label="Years of Experience" 
                  name="experience" 
                  value={formData.experience} 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  icon={<Calendar className="w-4 h-4" />}
                />
                
                {/* Bio - Full Width */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 uppercase mb-2 ml-1">Bio</label>
                  {isEditing ? (
                    <textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-purple-950 border border-purple-700 text-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                    />
                  ) : (
                    <p className="text-slate-300 text-sm leading-relaxed bg-purple-950/50 p-4 rounded-xl border border-purple-800/50">
                      {formData.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-purple-950/10 backdrop-blur-xl border border-purple-800/60 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" /> Social Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputGroup 
                   label="Portfolio URL" 
                   name="portfolio" 
                   value={formData.portfolio} 
                   isEditing={isEditing} 
                   onChange={handleInputChange} 
                   icon={<Globe className="w-4 h-4" />} 
                   placeholder="https://"
                />
                <InputGroup 
                   label="GitHub Profile" 
                   name="github" 
                   value={formData.github} 
                   isEditing={isEditing} 
                   onChange={handleInputChange} 
                   icon={<Github className="w-4 h-4" />} 
                />
                <InputGroup 
                   label="LinkedIn Profile" 
                   name="linkedin" 
                   value={formData.linkedin} 
                   isEditing={isEditing} 
                   onChange={handleInputChange} 
                   icon={<Linkedin className="w-4 h-4" />} 
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-purple-950/10 backdrop-blur-xl border border-purple-800/60 rounded-2xl p-6 md:p-8 shadow-xl">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-purple-400" /> Skills & Expertise
               </h3>
               
               <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${isEditing ? 'bg-purple-800 border-purple-600 text-slate-200 pr-2' : 'bg-purple-500/10 text-purple-300 border-purple-500/20'}`}>
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)} className="text-slate-200 hover:text-red-400 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  
                  {isEditing && (
                    <div className="flex items-center gap-2 ml-2">
                      <input 
                        type="text" 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={addSkill}
                        placeholder="Type & Enter..."
                        className="bg-purple-950 border border-purple-700 text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 w-32"
                      />
                      <button 
                        onClick={() => { if(newSkill.trim()) { setFormData(prev => ({...prev, skills: [...prev.skills, newSkill]})); setNewSkill(""); } }}
                        className="p-1.5 bg-purple-600 rounded-lg text-white hover:bg-purple-500"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
               </div>
            </div>

            {/* Action Buttons (Footer) */}
            {isEditing && (
              <div className="flex gap-4 justify-end pt-4 animate-in fade-in">
                 <button 
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-xl border border-purple-700 text-slate-200 font-medium hover:bg-purple-800 transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
                 >
                   <Save className="w-4 h-4" /> Save Changes
                 </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

// --- Helper Component for Inputs ---
function InputGroup({ label, name, value, isEditing, onChange, icon, placeholder }) {
  return (
    <div className="relative group">
      <label className="block text-xs font-medium text-slate-300 uppercase mb-2 ml-1 transition-colors group-focus-within:text-puple-400">
        {label}
      </label>
      
      {isEditing ? (
        <div className="relative">
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-purple-950 border border-purple-700 text-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
          />
          <div className="absolute left-3 top-3.5 text-slate-200">
            {icon}
          </div>
        </div>
      ) : (
        <div className="w-full bg-purple-950/50 border border-purple-800/50 text-slate-200 rounded-xl pl-10 pr-4 py-3 flex items-center gap-3">
          <span className="text-slate-200">{icon}</span>
          <span className="truncate">{value || <span className="text-slate-600 italic">Not set</span>}</span>
        </div>
      )}
    </div>
  );
}