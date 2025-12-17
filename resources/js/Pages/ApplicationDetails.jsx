import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GradientText from "@/Components/GradientText";
import { RainbowButton } from "@/Components/rainbow-button";
import { FiMapPin, FiArrowLeft, FiDollarSign, FiFileText, FiCalendar, FiBriefcase, FiEdit, FiDownload, FiUploadCloud, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { HiTrash } from "react-icons/hi";
import { FaUserGroup, FaBriefcase, FaCheck, FaClock, FaEnvelope, FaIndianRupeeSign } from "react-icons/fa6";
import DarkVeil from "@/Components/DarkVeil";
import toast, { Toaster } from 'react-hot-toast';

// --- HELPER FOR LOGO ---
const getCompanyLogo = (companyName) => {
  if (!companyName) return "";
  return `https://img.logo.dev/${encodeURIComponent(companyName)}.com?token=pk_HvpG0podRa6CHfNBD9DDsQ`;
};

export default function ApplicationDetails() {
    const { id } = useParams(); // URL se ID nikalo
    const navigate = useNavigate();
    const [data, setData] = useState(null); // Application Data
    const [loading, setLoading] = useState(true);

    // --- 1. FETCH DATA ---
    useEffect(() => {
        const fetchDetails = async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) { navigate('/auth'); return; }

            try {
                const response = await axios.get(`/api/applications/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setData(response.data.data);
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Application not found.");
                navigate('/applications');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id, navigate]);

    // --- 2. DELETE HANDLER ---
    const handleDelete = () => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <p className="font-semibold">Permanently delete this application?</p>
                <div className="flex gap-2">
                    <button 
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                const token = localStorage.getItem('auth_token');
                                await axios.delete(`/api/applications/${id}`, {
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                toast.success("Application Deleted");
                                navigate('/applications');
                            } catch (err) {
                                toast.error("Failed to delete.");
                            }
                        }}
                    >
                        Confirm
                    </button>
                    <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm" onClick={() => toast.dismiss(t.id)}>Cancel</button>
                </div>
            </div>
        ), { duration: 5000, icon: '⚠️' });
    };

    // --- 3. STATUS STEPPER LOGIC ---
    // Helper to check if step is active
    const isStepActive = (stepName) => {
        if (!data) return false;
        const stages = ['Applied', 'Interview', 'Offer'];
        const currentStageIndex = stages.indexOf(data.status);
        const stepIndex = stages.indexOf(stepName);
        
        // Agar status 'Rejected' hai, toh logic alag hoga (handled in UI)
        if (data.status === 'Rejected') return false; 
        
        return currentStageIndex >= stepIndex;
    };

    if (loading) return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0D0716] text-white">
            <FiLoader className="w-10 h-10 animate-spin text-[#8660fa] mb-4" />
            <p>Loading Details...</p>
        </div>
    );

    if (!data) return null;

    const logoUrl = getCompanyLogo(data.company);

    return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-12 text-white"> 
        <Toaster position="top-center" 
            toastOptions={{
                style: { background: '#1A1025', color: '#fff', border: '1px solid #392e4e' }
            }}
        />
        
        <div className="fixed inset-0 opacity-70 mix-blend-screen pointer-events-none -z-10">
            <div style={{ width: '100%', height: '100%', position: 'relative' }}><DarkVeil /></div>
        </div>

        <main className="bg-[#0D0716]/80 backdrop-blur-md border border-[#392e4e] rounded-2xl shadow-xl overflow-hidden mt-10">

            <header className="p-6 sm:p-8 border-b border-[#392e4e]">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                      
                    <div className="flex items-center space-x-5">
                        <div className="w-20 h-20 rounded-lg bg-white p-2 flex items-center justify-center">
                            <img 
                                className="w-full h-full object-contain" 
                                src={logoUrl} 
                                alt="Company Logo"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${data.company}&background=random`; }}
                            />
                        </div>
                        <div>
                            <div>
                                <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={8} showBorder={false} className="custom-class">
                                    <h1 className="text-3xl p-2 font-bold">{data.position}</h1>
                                </GradientText>
                            </div>
                            <p className="text-xl font-medium pl-2 text-purple-100">{data.company}</p>
                        </div>
                    </div>
                      
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <div>
                            <RainbowButton onClick={() => navigate('/applications')} className="mt-4 max-sm:text-xs max-sm:p-2" variant="outline">
                                <FiArrowLeft className="mr-2"/>Back
                            </RainbowButton>
                        </div>
                        
                        <div>
                            <RainbowButton onClick={() => navigate(`/edit-application/${id}`)} className="mt-4 max-sm:text-xs max-sm:p-2" variant="default">
                                <FiEdit className="mr-2"/>Edit
                            </RainbowButton>
                        </div>

                        <div>
                            <RainbowButton onClick={handleDelete} className="mt-4 max-sm:text-xs max-sm:p-2" variant="outline">
                                <HiTrash className="text-red-500 mr-2" />Delete
                            </RainbowButton>
                        </div>
                    </div>
                </div>
            </header>

             {/* STATUS BAR (Stepper) */}
            <section className="p-6 sm:p-8 border-b border-[#392e4e]">
                <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-5">Current Status</h2>
                
                {data.status === 'Rejected' ? (
                    <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold"><FiAlertCircle /></div>
                        <div>
                            <p className="text-red-400 font-bold text-lg">Application Rejected</p>
                            <p className="text-gray-400 text-sm">Don't give up! Keep applying.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
                        {/* 1. Applied */}
                        <div className="flex flex-col items-center text-center max-sm:flex-row max-sm:gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isStepActive('Applied') ? 'bg-purple-600 text-white ring-4 ring-purple-900' : 'bg-gray-700 text-gray-400'}`}>
                                <FaCheck />
                            </div>
                            <div className="max-sm:text-left">
                                <span className={`mt-2 block text-sm font-semibold ${isStepActive('Applied') ? 'text-purple-400' : 'text-gray-500'}`}>Applied</span>
                                <span className="text-xs text-gray-500">{data.applied_human}</span>
                            </div>
                        </div>

                        <div className={`flex-1 h-1 mx-4 rounded-full max-sm:hidden ${isStepActive('Interview') ? 'bg-purple-600' : 'bg-gray-700'}`}></div>

                        {/* 2. Interview */}
                        <div className="flex flex-col items-center text-center max-sm:flex-row max-sm:gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isStepActive('Interview') ? 'bg-purple-600 text-white ring-4 ring-purple-900' : 'bg-gray-700 text-gray-400'}`}>
                                <FaUserGroup />
                            </div>
                            <div className="max-sm:text-left">
                                <span className={`mt-2 block text-sm font-semibold ${isStepActive('Interview') ? 'text-purple-400' : 'text-gray-500'}`}>Interview</span>
                            </div>
                        </div>

                        <div className={`flex-1 h-1 mx-4 rounded-full max-sm:hidden ${isStepActive('Offer') ? 'bg-purple-600' : 'bg-gray-700'}`}></div>

                        {/* 3. Offer */}
                        <div className="flex flex-col items-center text-center max-sm:flex-row max-sm:gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isStepActive('Offer') ? 'bg-green-600 text-white ring-4 ring-green-900' : 'bg-gray-700 text-gray-400'}`}>
                                <FaBriefcase />
                            </div>
                            <div className="max-sm:text-left">
                                <span className={`mt-2 block text-sm font-semibold ${isStepActive('Offer') ? 'text-green-400' : 'text-gray-500'}`}>Offer</span>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            
            {/* MAIN CONTENT GRID */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                 {/* LEFT COLUMN */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Job Description */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 space-y-4 bg-black/20 p-4 rounded-lg border border-[#392e4e]">
                            {data.job_description ? (
                                <p className="whitespace-pre-wrap">{data.job_description}</p>
                            ) : (
                                <p className="italic text-gray-600">No job description provided.</p>
                            )}
                        </div>
                    </section>
                    
                    {/* Notes (Read Only here, edit in Edit Page) */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Your Notes</h2>
                        <div className="bg-purple-950/20 w-full p-4 rounded-lg border border-purple-500/30 text-gray-200 min-h-[100px]">
                            {data.notes ? (
                                <p className="whitespace-pre-wrap">{data.notes}</p>
                            ) : (
                                <p className="text-gray-500 italic">No notes added yet. Click Edit to add notes.</p>
                            )}
                        </div>
                    </section>

                    {/* Activity Log (Simulated for now based on dates) */}
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Activity Log</h2>
                        <div className="flow-root">
                            <ul role="list" className="-mb-8">
                                <li>
                                    <div className="relative pb-8">
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center ring-8 ring-white/10">
                                                    <FaEnvelope />
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0 pl-2">
                                                <p className="text-sm font-medium text-gray-200">Application Created</p>
                                                <p className="mt-0.5 text-sm text-gray-400">{data.created_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                {/* Show Update log if different */}
                                {data.updated_at !== data.created_at && (
                                    <li>
                                        <div className="relative pb-8">
                                            <span className="absolute top-[-30px] left-4 -ml-px h-full w-0.5 bg-purple-400/30" aria-hidden="true"></span>
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center ring-8 ring-purple-900/50">
                                                        <FaClock />
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0 pl-2">
                                                    <p className="text-sm font-medium text-gray-200">Last Updated</p>
                                                    <p className="mt-0.5 text-sm text-gray-400">{data.updated_at}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </section>
                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="lg:col-span-1 space-y-8">
                    
                    <section className="bg-purple-950/30 p-6 rounded-lg border border-purple-900/50">
                        <GradientText colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]} animationSpeed={8} showBorder={false} className="custom-class">
                            <h2 className="text-2xl font-bold mb-5">Job Information</h2>
                        </GradientText>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FiMapPin className="w-6 h-6 text-purple-500 mr-3" />
                                <div>
                                    <span className="text-sm text-gray-400">Location</span>
                                    <p className="font-semibold text-gray-200">{data.location || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaIndianRupeeSign className="w-6 h-6 text-purple-500 mr-3" />
                                <div>
                                    <span className="text-sm text-gray-400">Salary</span>
                                    <p className="font-semibold text-gray-200">{data.salary?.formatted || 'Not Disclosed'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FiBriefcase className="w-6 h-6 text-purple-500 mr-3" />
                                <div>
                                    <span className="text-sm text-gray-400">Work Type</span>
                                    <p className="font-semibold text-gray-200">{data.work_type || 'N/A'}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <FiCalendar className="w-6 h-6 text-purple-500 mr-3" />
                                <div>
                                    <span className="text-sm text-gray-400">Applied Date</span>
                                    <p className="font-semibold text-gray-200">{data.applied_date || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Documents</h2>
                        <div className="space-y-3">
                            {data.document ? (
                                <a 
                                    href={data.document.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 bg-[#392e4e] rounded-lg hover:bg-purple-900 transition-all cursor-pointer group"
                                >
                                    <FiFileText className="w-6 h-6 text-purple-400 mr-3 group-hover:text-white" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-200 truncate">{data.document.name}</p>
                                        <p className="text-xs text-gray-500">{data.document.type} • {data.document.size_kb ? `${data.document.size_kb} KB` : ''}</p>
                                    </div>
                                    <FiDownload className="ml-2 text-purple-500 group-hover:text-white" />
                                </a>
                            ) : (
                                <div className="text-gray-500 italic text-sm p-4 border border-[#392e4e] rounded-lg border-dashed text-center">
                                    No documents attached.
                                </div>
                            )}
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Tags & Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.tags && data.tags.length > 0 ? (
                                data.tags.map((tag) => (
                                    <span key={tag.id} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/50 text-purple-200 border border-purple-700/50">
                                        {tag.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm">No tags added.</span>
                            )}
                        </div>
                    </section>
                </aside>

            </div>

        </main>
    </div>
    );
}