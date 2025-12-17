import React, { useState, useEffect } from "react";
import axios from "axios";
import GradientText from "@/Components/GradientText";
import { FiMapPin, FiDollarSign, FiSearch, FiDelete, FiEdit, FiBriefcase, FiClock, FiLoader, FiArrowDown } from 'react-icons/fi';
import DropdownButton from "@/Components/Dropdown"; 
import ShinyText from "@/Components/ShinyText";
import AnimatedList from "@/Components/AnimatedList";
import { RainbowButton } from "@/Components/rainbow-button";
import CardNav from "@/Components/CardNav";
import DarkVeil from "@/Components/DarkVeil";
import { HiTrash, HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// --- HELPERS ---
const getCompanyLogo = (companyName) => {
  if (!companyName) return "";
  return `https://img.logo.dev/${encodeURIComponent(companyName)}.com?token=pk_HvpG0podRa6CHfNBD9DDsQ`;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Interview': return '#ff8c00'; 
    case 'Offer': return '#32CD32'; 
    case 'Rejected': return '#DC143C'; 
    default: return '#4079ff'; 
  }
};

const statusTypeOptions = [
  { label: "All Status", value: "" }, 
  { label: "Applied", value: "Applied" },
  { label: "Interview", value: "Interview" },
  { label: "Offer", value: "Offer" },
  { label: "Rejected", value: "Rejected" },
];

// --- CARD COMPONENT ---
const ApplicationCard = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const logoUrl = getCompanyLogo(data.company);
  const statusColor = getStatusColor(data.status);

  return (
    <div className="group relative flex flex-col p-2 sm:p-5 bg-[#0D0716] border border-[#392e4e] rounded-xl transition-all duration-300 hover:border-[#8660fa] hover:shadow-[0_0_20px_-5px_rgba(134,96,250,0.15)]">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="flex gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 p-1.5 sm:p-2 flex items-center justify-center backdrop-blur-sm overflow-hidden flex-shrink-0">
                <img 
                src={logoUrl} 
                alt={data.company} 
                className="w-full h-full object-contain rounded-md" 
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${data.company}&background=random`; }} 
                />
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-[#a855f7] transition-colors line-clamp-1">{data.position}</h2>
                <p className="text-xs sm:text-sm text-gray-400 font-medium line-clamp-1">{data.company}</p>
            </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md`}>
                    <ShinyText text={data.status} disabled={false} speed={3} className='font-semibold text-[10px] sm:text-xs uppercase tracking-wide' style={{ color: statusColor }} />
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1"><FiClock className="w-3 h-3" /> {data.applied_human || data.applied_date}</span>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-y-1 sm:gap-y-2 gap-x-2 sm:gap-x-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden"><FiMapPin className="text-[#8660fa] flex-shrink-0" /> <span className="truncate">{data.location || 'N/A'}</span></div>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden"><FiDollarSign className="text-green-400 flex-shrink-0" /> <span className="truncate">{data.salary?.formatted || 'Not Disclosed'}</span></div>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden"><FiBriefcase className="text-blue-400 flex-shrink-0" /> <span className="truncate">{data.work_type || 'N/A'}</span></div>
        </div>
        <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-[#392e4e]/50">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {data.tags && data.tags.length > 0 ? (
                    data.tags.slice(0, 3).map((tag) => ( 
                        <span key={tag.id} className="px-1.5 py-0.5 sm:px-2 rounded text-[9px] sm:text-[10px] font-medium bg-[#1A1025] text-gray-300 border border-[#392e4e]">{tag.name}</span>
                    ))
                ) : (<span className="text-[10px] text-gray-600 italic">No tags</span>)}
            </div>
            <div className="flex gap-1 sm:gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#8660fa] transition-all" onClick={() => navigate(`/application-details/${data.id}`)}><HiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                <button className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#8660fa] transition-all" onClick={() => navigate(`/edit-application/${data.id}`)}><FiEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                <button className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-white hover:bg-red-600 transition-all" onClick={() => onDelete(data.id)}><HiTrash className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
            </div>
        </div>
    </div>
  );
};

// --- NAV ITEMS ---
const Navitems = [
  { label: "Dashboard", bgColor: "#0D0716", textColor: "#fff", links: [{ label: "Overview" }, { label: "Applications" }, { label: "Add New" }] },
  { label: "Tools", bgColor: "#170D27", textColor: "#fff", links: [{ label: "Analytics" }, { label: "Interview Prep" }, { label: "Resume Scorer" }] },
  { label: "Account", bgColor: "#271E37", textColor: "#fff", links: [{ label: "Logout" }] }
];

// --- MAIN COMPONENT ---
export default function Applications() {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [loadingMore, setLoadingMore] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  // Pagination States
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // --- CORE DATA FETCHING FUNCTION ---
  const fetchApplications = async (pageNo, isNewSearch = false) => {
      const token = localStorage.getItem('auth_token'); 
      if (!token) { navigate('/auth'); return; }

      if (isNewSearch) setLoading(true);
      else setLoadingMore(true);

      try {
        const response = await axios.get(`/api/applications`, {
            params: {
                page: pageNo,
                search: searchTerm, 
                status: filterStatus
            },
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const newData = response.data.data;
        const meta = response.data.meta; 

        if (isNewSearch) {
            setApplications(newData); 
        } else {
            setApplications(prev => [...prev, ...newData]); 
        }

        setLastPage(meta.last_page);
        setPage(pageNo);

      } catch (error) {
        console.error("Error fetching applications:", error);
        if (error.response && error.response.status === 401) navigate('/auth');
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
  };

  // --- 1. INITIAL LOAD & FILTER CHANGES ---
  useEffect(() => {
      const timeoutId = setTimeout(() => {
          fetchApplications(1, true);
      }, 500); 

      return () => clearTimeout(timeoutId);
  }, [searchTerm, filterStatus]);

  // --- 2. LOAD MORE HANDLER ---
  const handleLoadMore = () => {
      if (page < lastPage) {
          fetchApplications(page + 1, false);
      }
  };

  // --- DELETE HANDLER ---
  const handleDelete = (id) => {
    toast((t) => (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Delete this application?</p>
            <div className="flex gap-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm" onClick={async () => {
                    toast.dismiss(t.id); 
                    try {
                        const token = localStorage.getItem('auth_token');
                        await axios.delete(`/api/applications/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                        setApplications(prev => prev.filter(app => app.id !== id));
                        toast.success("Application deleted!");
                    } catch (err) { toast.error("Failed to delete."); }
                }}>Confirm</button>
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm" onClick={() => toast.dismiss(t.id)}>Cancel</button>
            </div>
        </div>
    ), { duration: 5000, icon: '⚠️' });
  };

  // Render List
  const listItems = applications.map((app) => (
    <ApplicationCard key={app.id} data={app} onDelete={handleDelete} />
  ));

  return (
    <main className="w-[calc(100vw-30px)] flex flex-col p-20 max-sm:p-6 min-h-screen text-white">
        <Toaster position="top-center" toastOptions={{ style: { background: '#1A1025', color: '#fff', border: '1px solid #392e4e' } }} />
        <div className="absolute inset-0 opacity-70 mix-blend-screen pointer-events-none">
            <div style={{ width: '100%', height: '600px', position: 'relative' }}><DarkVeil /></div>
        </div>

        <header className="py-16 relative z-10">
            <CardNav logoAlt="Company Logo" items={Navitems} baseColor="rgba(0, 0, 0, 0.3)" menuColor="#000" buttonBgColor="#111" buttonTextColor="#fff" ease="power3.out" />
        </header>

        <div className="pb-10 relative z-10">
            <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={8} showBorder={false} className="custom-class">
                <h1 className="text-5xl font-extrabold mt-10 mb-4 max-sm:text-2xl max-sm:mt-4 max-sm:mb-2">My Applications</h1>
            </GradientText>
            <p className="text-purple-100 text-xl font-medium pb-4 max-sm:text-xs max-sm:w-[60%]">Track and manage all your job applications</p>
            <div className="absolute bottom-[50%] right-0 ">
                <RainbowButton className="max-sm:text-xs max-sm:p-2" variant="outline" onClick={() => navigate('/add-application')}>+ Add Application</RainbowButton>
            </div>
        </div>

        <div className="w-[100%] relative z-10">
            
            {/* 🔥 RESTORED STATS SECTION: ROW 1 🔥 */}
            <div className=" h-full w-full flex flex-col gap-4 pb-4">
                <div className="w-full flex gap-4 max-sm:flex-col">
                    <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-8 bg-purple-950/10 max-sm:p-4">
                        <div className=" flex flex-col items-start justify-center h-full">
                        <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={3} showBorder={false}>
                            {/* Showing loaded count here for now */}
                            <p className="text-5xl font-extrabold w-full mb-1 max-sm:text-3xl">{applications.length}{page < lastPage ? '+' : ''}</p>
                        </GradientText>
                        <div>
                            <h3 className="text-2xl font-bold max-sm:text-sm">Total Applications</h3>
                            <p className="text-xs text-violet-200 max-sm:text-[8px]">All jobs you've applied so far.</p>
                        </div>
                        </div>
                    </div>
                    
                    <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-8 bg-purple-950/10 max-sm:p-4">
                        <div className=" flex flex-col items-start justify-center h-full">
                            <GradientText colors={["#FF4500", "#DAA520", "#FF4500", "#DAA520", "#FF4500"]} animationSpeed={3} showBorder={false}>
                                <p className="text-5xl font-extrabold w-full mb-1 max-sm:text-3xl">
                                    {applications.filter(a => a.status === 'Interview').length}
                                </p>
                            </GradientText>
                            <div>
                                <h3 className="text-2xl font-bold max-sm:text-sm">Interviews</h3>
                                <p className="text-xs text-violet-200 max-sm:text-[8px]">Upcoming interview rounds.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔥 RESTORED STATS SECTION: ROW 2 🔥 */}
            <div className="h-full w-full flex flex-col gap-4 pb-10">
                <div className="w-full flex gap-4 max-sm:flex-col">
                    <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-8 bg-purple-950/10 max-sm:p-4">
                        <div className=" flex flex-col items-start justify-center h-full">
                        <GradientText colors={["#32CD32", "#228B22", "#32CD32", "#228B22", "#32CD32"]} animationSpeed={3} showBorder={false}>
                            <p className="text-5xl font-extrabold w-full mb-1 max-sm:text-3xl">{applications.filter(a => a.status === 'Offer').length}</p>
                        </GradientText>
                        <div>
                            <h3 className="text-2xl font-bold max-sm:text-sm">Offers</h3>
                            <p className="text-xs text-violet-200 max-sm:text-[8px]">Jobs you've successfully secured.</p>
                        </div>
                        </div>
                    </div>
                    
                    <div className="border border-[#392e4e] w-[100%] h-[100%] rounded-lg p-8 bg-purple-950/10 max-sm:p-4">
                        <div className=" flex flex-col items-start justify-center h-full">
                            <GradientText colors={["#DC143C", "#B22222", "#DC143C", "#B22222", "#DC143C"]} animationSpeed={3} showBorder={false}>
                                <p className="text-5xl font-extrabold w-full mb-1 max-sm:text-3xl">
                                    {applications.filter(a => a.status === 'Rejected').length}
                                </p>
                            </GradientText>
                            <div>
                                <h3 className="text-2xl font-bold max-sm:text-sm">Rejected</h3>
                                <p className="text-xs text-violet-200 max-sm:text-[8px]">Applications that didn't make it through.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="w-full gap-4 flex mb-8">
                <div className="flex items-center gap-2 border bg-[#060010] border-[#392e4e] rounded-md px-4 py-0 w-full max-sm:px-2 max-sm:py-0 focus-within:border-[#8660fa] transition-colors">
                    <FiSearch className="text-gray-400 text-xl" />
                    <div className="w-[100%]">
                        <input
                            type="text"
                            placeholder="Search companies, positions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className=" w-full flex-1 bg-transparent text-white placeholder-gray-400 border-none outline-none focus:ring-0 focus:shadow-none p-2 max-sm:text-xs"
                        />
                    </div>
                </div>
                <div className="w-[45%] max-sm:w-[35%] ">
                    <DropdownButton 
                        options={statusTypeOptions}
                        selected={statusTypeOptions.find(opt => opt.value === filterStatus) || statusTypeOptions[0]}
                        onSelect={(val) => {
                            const value = val.value !== undefined ? val.value : val;
                            setFilterStatus(value);
                        }}
                        placeholder="All Status"
                        className="max-sm:text-xs"
                    />
                </div>
            </div>

            {/* Applications List */}
            <div className="w-full">
                <div className="border border-[#392e4e] bg-[#060010] rounded-lg p-4 min-h-[500px] max-sm:p-0 flex flex-col justify-between">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 mt-20">
                            <FiLoader className="w-8 h-8 animate-spin text-[#8660fa]" />
                            <p>Loading your applications...</p>
                        </div>
                    ) : listItems.length > 0 ? (
                        <>
                            <AnimatedList
                                items={listItems}
                                onItemSelect={(item, index) => console.log(item, index)}
                                showGradients={true}
                                enableArrowNavigation={true}
                                displayScrollbar={true}
                            />
                            
                            {/* 🔥 LOAD MORE BUTTON 🔥 */}
                            {page < lastPage && (
                                <div className="flex justify-center py-6 mt-4 border-t border-[#392e4e]/50">
                                    <button 
                                        onClick={handleLoadMore} 
                                        disabled={loadingMore}
                                        className="flex items-center gap-2 px-6 py-2 bg-[#1A1025] hover:bg-[#8660fa] border border-[#392e4e] hover:border-[#8660fa] rounded-full transition-all text-sm font-medium disabled:opacity-50"
                                    >
                                        {loadingMore ? <FiLoader className="animate-spin"/> : <FiArrowDown />}
                                        {loadingMore ? "Loading..." : "Load More Applications"}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 mt-20">
                            <p>No applications found.</p>
                            <RainbowButton onClick={() => navigate('/add-application')} variant="outline" className="text-xs">Add your first job</RainbowButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </main>
  );
}