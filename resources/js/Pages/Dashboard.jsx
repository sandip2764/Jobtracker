// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DarkVeil from '../Components/DarkVeil';
import MagicBento from '../Components/MagicBento';
import GradientText from '../Components/GradientText'
import BlurText from "../Components/BlurText"; 
import { FiFileText, FiBook, FiSearch, FiBarChart2, FiCalendar, FiClock, FiLoader, FiBriefcase, FiMapPin, FiDollarSign } from 'react-icons/fi';
import GlassIcons from '../Components/GlassIcons'
import AnimatedList from '../Components/AnimatedList';
import ShinyText from '../Components/ShinyText';
import { RainbowButton } from '../Components/rainbow-button';
import CardNav from "@/Components/CardNav";

// --- HELPERS ---
const getCompanyLogo = (companyName) => {
  if (!companyName) return "";
  return `https://img.logo.dev/${encodeURIComponent(companyName)}.com?token=pk_HvpG0podRa6CHfNBD9DDsQ`;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Interview': return 'bg-[#ff8c00]/80'; // Orange
    case 'Offer': return 'bg-[#32cd32]/80'; // Green
    case 'Rejected': return 'bg-[#ff0000]/80'; // Red
    default: return 'bg-purple-600/80'; // Blue/Purple (Applied)
  }
};

// --- STATIC CONFIG ---
const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

const Navitems = [
  { label: "Dashboard", bgColor: "#0D0716", textColor: "#fff", links: [{ label: "Overview" }, { label: "Applications" }, { label: "Add New" }] },
  { label: "Tools", bgColor: "#170D27", textColor: "#fff", links: [{ label: "Analytics" }, { label: "Interview Prep" }, { label: "Resume Scorer" }] },
  { label: "Account", bgColor: "#271E37", textColor: "#fff", links: [{ label: "Logout" }] }
];

const group1 = [
  { icon: <FiFileText />, color: 'blue', label: 'Resume builder' },
  { icon: <FiBook />, color: 'purple', label: 'Interview Prep' },
  { icon: <FiBarChart2 />, color: 'green', label: 'Analytics' },
];

const group2 = [{ icon: <FiCalendar />, color: 'purple' }];
const group3 = [{ icon: <FiBriefcase />, color: 'blue' }]; // Changed Icon

export default function Dashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({ total: 0, interview: 0, offer: 0, rejected: 0, successRate: 0 });

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) { navigate('/auth'); return; }

      try {
        const response = await axios.get('/api/applications', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = response.data.data;
        setApplications(data);

        // Calculate Stats
        const total = data.length;
        const interview = data.filter(a => a.status === 'Interview').length;
        const offer = data.filter(a => a.status === 'Offer').length;
        const rejected = data.filter(a => a.status === 'Rejected').length;
        const successRate = total > 0 ? Math.round((offer / total) * 100) : 0;

        setStats({ total, interview, offer, rejected, successRate });

      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);


  // --- GENERATE LISTS ---

  // 1. Upcoming Interviews List (Filter by Status 'Interview')
  const interviewList = applications
    .filter(app => app.status === 'Interview')
    .slice(0, 5) // Show top 5
    .map((app) => (
      <div key={app.id} className="flex relative cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all" onClick={() => navigate(`/application-details/${app.id}`)}>
        <div>
          <GlassIcons icons={group2} className="p-4"/>
        </div>
        <div className="pt-2 w-full">
          <div className={`absolute top-4 right-4 ${getStatusColor(app.status)} text-xs px-4 py-1.5 rounded-full text-white`}>
            <ShinyText text="Scheduled" disabled={false} speed={3} className='font-semibold text-sm' />
          </div>
          <h1 className="text-1xl font-semibold">{app.company}</h1>
          <p className="text-sm text-violet-200 pb-2">{app.position}</p>
          <div className="flex items-center justify-start text-xs text-violet-100 gap-4">
            <div className="flex items-center">
                <FiCalendar className="h-4 w-4 mr-1" />
                <p>{app.applied_date}</p>
            </div>
            {/* Note: Real interview time needs a separate DB column, using placeholder/updated_at for now */}
            <div className="flex items-center">
              <FiClock className="h-4 w-4 mr-1" />
              <p className="font-medium">10:00 AM</p> 
            </div>
          </div>
        </div>
      </div>
    ));

  // 2. Recent Applications List (With Search)
  const recentList = applications
    .filter(app => 
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
        app.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10)
    .map((app) => (
        <div key={app.id} className="flex relative cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all" onClick={() => navigate(`/application-details/${app.id}`)}>
            <div>
                {/* Logo or Icon */}
                <div className="p-4">
                    <img 
                      src={getCompanyLogo(app.company)} 
                      alt="logo" 
                      className="w-16 h-12 object-contain bg-white rounded-lg p-1"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${app.company}&background=random`; }}
                    />
                </div>
            </div>
            <div className="pt-2 w-full pl-2">
                <div className={`absolute top-4 right-4 ${getStatusColor(app.status)} text-xs px-4 py-1 rounded-full text-white`}>
                    <ShinyText text={app.status} disabled={false} speed={3} className='font-semibold text-sm' />
                </div>
                <h1 className="text-1xl font-semibold">{app.company}</h1>
                <p className="text-sm text-violet-200 pb-2">{app.position}</p>
                <div className="flex items-center justify-start text-xs text-violet-100 gap-4">
                    <div className="flex items-center">
                        <FiCalendar className="h-4 w-4 mr-1" />
                        <p>{app.applied_date}</p>
                    </div>
                    <div className="flex items-center text-purple-500">
                        <FiDollarSign className="h-4 w-4 mr-1" />
                        <p className="font-bold">{app.salary?.formatted || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    ));


  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none">
        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
          <DarkVeil />
        </div>
      </div>
      
      <header className="py-8">
        <CardNav
          logoAlt="Company Logo"
          items={Navitems}
          baseColor="rgba(0, 0, 0, 0.3)" 
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </header>

      {/* --- MAIN DASHBOARD CONTENT --- */}
      <main className="relative z-10 p-6 flex justify-center items-center min-h-screen flex-col">
        
        {/* HERO SECTION */}
        <div className="h-96 flex justify-center items-center flex-col text-center">
          <div className="flex flex-col justify-center items-center">
            <BlurText
              text="Redefine Your Job Hunt."
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-6xl font-bold mb-2 max-sm:text-4xl"
            />
            <BlurText
              text="A modern dashboard to plan, track,"
              delay={160}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl font-light text-neutral-200 max-sm:text-xl"
            />
            <BlurText
              text="and win your next opportunity."
              delay={170}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl font-light text-neutral-200 mb-12 max-sm:text-xl"
            />
          </div>

          <div className="flex gap-6">
            <div>
              <RainbowButton onClick={() => navigate('/add-application')} variant="default">Add New Application</RainbowButton>
            </div>
            <div>
              <RainbowButton onClick={() => navigate('/applications')} variant="outline">View All</RainbowButton>
            </div>
          </div>
        </div>

        {/* --- GRID LAYOUT (BENTO) --- */}
        {loading ? (
            <div className="flex justify-center items-center h-64">
                <FiLoader className="w-10 h-10 animate-spin text-purple-500" />
            </div>
        ) : (
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
        >
          <div className="h-[calc(62vh-0px)] max-sm:h-auto">
            <div className="h-full w-full flex flex-col gap-4">
              
              {/* ROW 1: STATS */}
              <div className="w-full h-[50%] flex gap-4 max-sm:flex-col">
                {/* Total */}
                <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-4 cursor-pointer hover:bg-white/5 transition-all" onClick={() => navigate('/applications')}>
                  <div className=" flex flex-col items-start justify-center h-full">
                    <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false}>
                      <p className="text-5xl font-extrabold w-full mb-1">{stats.total}</p>
                    </GradientText>
                    <div>
                      <h3 className="text-2xl font-bold">Total Applications</h3>
                      <p className="text-xs text-violet-200">All jobs you've applied so far.</p>
                    </div>
                  </div>
                </div>
                {/* Interviews */}
                <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-4">
                  <div className=" flex flex-col items-start justify-center h-full">
                    <GradientText colors={["#FF4500", "#DAA520", "#FF4500", "#DAA520", "#FF4500"]} animationSpeed={3} showBorder={false}>
                      <p className="text-5xl font-extrabold w-full mb-1">{stats.interview}</p>
                    </GradientText>
                    <div>
                      <h3 className="text-2xl font-bold">Interviews</h3>
                      <p className="text-xs text-violet-200">Upcoming interview rounds.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: STATS */}
              <div className="w-full h-[50%] flex gap-4 max-sm:flex-col">
                {/* Rejected */}
                <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-4">
                  <div className=" flex flex-col items-start justify-center h-full ">
                    <GradientText colors={["#DC143C", "#B22222", "#DC143C", "#B22222", "#DC143C"]} animationSpeed={3} showBorder={false}>
                      <p className="text-5xl font-extrabold w-full mb-1">{stats.rejected}</p>
                    </GradientText>
                    <div>
                      <h3 className="text-2xl font-bold">Rejected</h3>
                      <p className="text-xs text-violet-200">Applications that didn't make it.</p>
                    </div>
                  </div>
                </div>
                {/* Offers */}
                <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-4">
                  <div className=" flex flex-col items-start justify-center h-full ">
                    <GradientText colors={["#32CD32", "#228B22", "#32CD32", "#228B22", "#32CD32"]} animationSpeed={3} showBorder={false}>
                      <p className="text-5xl font-extrabold w-full mb-1">{stats.offer}</p>
                    </GradientText>
                    <div>
                      <h3 className="text-2xl font-bold">Offers</h3>
                      <p className="text-xs text-violet-200">Jobs you've successfully secured.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SUCCESS RATE */}
          <div className="h-full">
            <div className="flex flex-col items-end">
              <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={3} showBorder={false}>
                <p className="text-6xl font-extrabold mt-10">{stats.successRate}%</p>
              </GradientText>
              <h3 className="text-3xl font-bold ml-2">Success Rate</h3>
              <p className="text-xs text-violet-200">Based on Offers vs Total.</p>
            </div>
          </div>

          {/* UPCOMING INTERVIEWS */}
          <div className="h-full">
            <div className="flex">
              <GlassIcons icons={group2} className="py-6"/>
              <div>
                <h2 className="text-4xl font-extrabold p-4 pt-6 pb-0">Next Interviews</h2>
                <p className="pl-4 text-violet-100 text-sm">Upcoming scheduled rounds</p>
              </div>
            </div>

            <div className="h-full w-full">
              <div className="h-[100%] pb-28">
                {interviewList.length > 0 ? (
                    <AnimatedList
                    items={interviewList}
                    showGradients={true}
                    enableArrowNavigation={true}
                    displayScrollbar={true}
                    />
                ) : (
                    <div className="p-6 text-center text-gray-500">No upcoming interviews found.</div>
                )}
              </div>
            </div>
          </div>

          {/* TOOLS */}
          <div>
            <h3 className="text-2xl font-bold text-end">Tools</h3>
            <GlassIcons icons={group1} className="py-8"/>
          </div>
          
          {/* RECENT APPLICATIONS */}
          <div className="h-[calc(100vh-0px)] pb-56 ">
            <div className="p-2 mb-6 relative">
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold pb-0">Recent Applications</h2>
                <p className=" text-violet-100 text-sm">Your latest job Applications</p>
              </div>
              <div className="flex items-center gap-2 border border-[#392e4e] rounded-lg px-4 py-2 w-full">
                <FiSearch className="text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search companies, positions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2"
                />
              </div>

              <RainbowButton className="absolute right-0 top-4 max-sm:hidden" onClick={() => navigate('/add-application')}>Add New</RainbowButton>
            </div>

            <div className="h-full w-full">
              <div className="h-[100%]">
                {recentList.length > 0 ? (
                    <AnimatedList
                    items={recentList}
                    showGradients={true}
                    enableArrowNavigation={true}
                    displayScrollbar={true}
                    />
                ) : (
                    <div className="p-10 text-center text-gray-500">No applications found.</div>
                )}
              </div>
            </div>

          </div>

        </MagicBento>
        )}
      
      </main>
    </div>
  );
}