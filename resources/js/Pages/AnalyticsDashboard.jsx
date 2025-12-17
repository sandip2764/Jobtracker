import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// 🔥 FIX 1: Updated Icon Import to prevent crash
import { FaDownload, FaBriefcase, FaCheck, FaClock, FaEnvelope, FaIndianRupeeSign, FaCalendar, FaTriangleExclamation } from "react-icons/fa6";
import { FiLoader } from 'react-icons/fi';
import CardNav from '@/Components/CardNav';
import GradientText from '@/Components/GradientText';
import Dropdown from '@/Components/Dropdown';
import { RainbowButton } from '@/Components/rainbow-button';
import SparkLine from '@/Components/SparkLine';
import ApplicationChart from '@/Components/ApplicationChart';
import ApplicationTimeline from '@/Components/ApplicationTimeline';
import SuccessrateByCompany from '@/Components/ApplicationSuccessrate';
import SalaryDistributionChart from '@/Components/SalaryDistribution';
import ApplicationResource from '@/Components/ApplicationSources';
import MonthlyVolume from '@/Components/MonthlyVolume';
import ShinyText from '@/Components/ShinyText';
import DarkVeil from '@/Components/DarkVeil';
import toast, { Toaster } from 'react-hot-toast';

// Dropdown Days
const timesTypeOptions = [
  { label: "All Time", value: "" }, 
  { label: "Last 7 days", value: "Last 7 days" },
  { label: "Last 30 days", value: "Last 30 days" },
  { label: "Last 3 months", value: "Last 3 months" },
];

// Nav items
const Navitems = [
  {
    label: "Dashboard",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Overview", ariaLabel: "Overview" },
      { label: "Applications", ariaLabel: "Applications" },
      { label: "Add New", ariaLabel: "Create application" }
    ]
  },
  {
    label: "Tools", 
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Analytics", ariaLabel: "charts & insights" },
      { label: "Interview Prep", ariaLabel: "questions" },
      { label: "Resume Scorer", ariaLabel: "ATS optimizer" },
    ]
  },
  {
    label: "Account",
    bgColor: "#271E37", 
    textColor: "#fff",
    links: [
      { label: "My Profile", ariaLabel: "edit details" },
      { label: "Settings", ariaLabel: "preferences" },
      { label: "Logout", ariaLabel: "sign out" }
    ]
  }
];

export default function AnalyticsDashboard() {
    const navigate = useNavigate();
    const [filterTimes, setFilterTimes] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    // --- FETCH DATA LOGIC ---
    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            if (!token) { navigate('/auth'); return; }

            try {
                const response = await axios.get('/api/analytics-dashboard', {
                    params: { filter: filterTimes },
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                setData(response.data);
            } catch (error) {
                console.error("Analytics Error:", error);
                toast.error("Failed to load analytics.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [filterTimes, navigate]);

    return (
        <div className=" text-white overflow-x-hidden">
            <Toaster position="top-center" toastOptions={{ style: { background: '#1A1025', color: '#fff', border: '1px solid #392e4e' } }} />
            
            <main className="p-4 pt-28 relative">
                <div className="absolute inset-0 opacity-70 mix-blend-screen -z-10 pointer-events-none">
                    <div style={{ width: '100%', height: '1000px', position: 'relative' }}>
                        <DarkVeil />
                    </div>
                </div>
                
                <header className="">
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

                <header className="p-6 sm:p-8 ">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div className="flex items-center space-x-5">
                            <div>
                                <div>
                                    <GradientText
                                        colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]}
                                        animationSpeed={8}
                                        showBorder={false}
                                        className="custom-class"
                                    >
                                        <h1 className="text-4xl font-extrabold mb-2">Analytics & Insights</h1>
                                    </GradientText>
                                </div>
                                <p className="text-lg font-medium text-purple-100">Real-time analytics that power informed, confident decisions.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 shrink-0">
                            <div className='min-w-[150px]'>
                                <Dropdown 
                                    options={timesTypeOptions}
                                    selected={timesTypeOptions.find(opt => opt.value === filterTimes)}
                                    onSelect={(val) => {
                                        // Fix for empty string value handling
                                        const value = val.value !== undefined ? val.value : val;
                                        setFilterTimes(value);
                                    }}
                                    placeholder="All Time"
                                    className="max-sm:text-xs"
                                />
                            </div>
                            
                            <div>
                                <RainbowButton className="mt-4 max-sm:text-xs max-sm:p-2" variant=""><FaDownload className="text-gray-200 mr-2"/>Export</RainbowButton>
                            </div>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-96">
                        <FiLoader className="w-12 h-12 animate-spin text-[#8660fa] mb-4" />
                        <p className="text-gray-400">Crunching the numbers...</p>
                    </div>
                ) : data && data.kpi ? ( // 🔥 FIX 2: Check if data AND data.kpi exist
                    <div className="bg-[#060010] border border-[#392e4e] rounded-lg p-4 relative  shadow-2xl">
                        
                        {/* --- TOP GRID STATS --- */}
                        <div className="grid grid-cols-6 grid-rows-2 gap-4 mb-4 max-lg:flex max-lg:flex-col">
                            
                            {/* 1. Success Rate */}
                            <div className="col-span-2 bg-[#0D0716] border border-[#392e4e] rounded-xl py-2 px-2 grid place-items-center">
                                <div className="flex justify-around items-center gap-4 w-full">
                                    <div>
                                        <h3 className='text-gray-300 font-medium text-lg mb-4'>Success Rate</h3>
                                        <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={10} showBorder={false}>
                                            {/* 🔥 FIX 3: Safe Access with Optional Chaining (?.) */}
                                            <p className="text-5xl font-extrabold mb-1">{data?.kpi?.success_rate ?? 0}%</p>
                                        </GradientText>
                                    </div>
                                    <div>
                                        {/* Fallback to 0 if data is missing */}
                                        <SparkLine data={[10, 15, 20, 18, 25, 22, 28, 30, 25, data?.kpi?.success_rate ?? 0]} />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Avg Response Time */}
                            <div className="col-span-2 col-start-3 bg-[#0D0716] border border-[#392e4e] p-2 rounded-xl grid place-items-center">
                                <div className='flex justify-around items-center gap-4 w-full'>
                                    <div>
                                        <h3 className='text-gray-200 font-medium text-lg mb-4'>Avg Response Time</h3>
                                        <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={10} showBorder={false}>
                                            <p className="text-5xl font-extrabold mb-2">{data?.kpi?.avg_response_days ?? 0} days</p>
                                        </GradientText>
                                    </div>
                                    <div>
                                        <SparkLine data={[7, 6, 8, 5, 6, 4, 5, 3, 4, data?.kpi?.avg_response_days ?? 0]}/>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Interview Conversion */}
                            <div className="col-span-2 col-start-1 row-start-2 bg-[#0D0716] border border-[#392e4e] p-2 rounded-xl grid place-items-center" >
                                <div className='flex justify-around items-center gap-4 w-full'>
                                    <div>
                                        <h3 className='text-gray-300 font-medium text-lg mb-4'>Interview Rate</h3>
                                        <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={10} showBorder={false}>
                                            <p className="text-5xl font-extrabold mb-1">{data?.kpi?.interview_rate ?? 0}%</p>
                                        </GradientText>
                                    </div>
                                    <div>
                                        <SparkLine data={[5, 8, 12, 10, 15, 12, 18, 16, 20, data?.kpi?.interview_rate ?? 0]}/>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Active Applications */}
                            <div className="col-span-2 col-start-3 row-start-2 bg-[#0D0716] border border-[#392e4e] p-2 rounded-xl grid place-items-center">
                                <div className='flex justify-around items-center gap-4 w-full'>
                                    <div>
                                        <h3 className='text-gray-300 font-medium text-xl mb-4'>Active Apps</h3>
                                        <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={10} showBorder={false}>
                                            <p className="text-5xl font-extrabold mb-1">{data?.kpi?.active_apps ?? 0}</p>
                                        </GradientText>
                                    </div>
                                    <div>
                                       <SparkLine data={[5, 10, 8, 12, 10, 15, 12, 18, 15, data?.kpi?.active_apps ?? 0]}/>
                                    </div>
                                </div>
                            </div>

                            {/* 5. Main Chart */}
                            <div className="col-span-2 row-span-2 col-start-5 row-start-1 bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl min-h-[300px]">
                                <h1 className='mb-1'></h1>
                                <div>
                                    <ApplicationChart data={data?.chart_data ?? []} />
                                </div>
                            </div>
                        </div>

                        {/* --- MIDDLE ROW: TIMELINE & PIE CHART --- */}
                        <div className='flex gap-4 mb-4 max-lg:flex-col'>
                            <ApplicationTimeline data={data?.chart_data ?? []} className="w-full" />
                            <SuccessrateByCompany data={data?.chart_data ?? []} className="w-full" />
                        </div>

                        {/* --- BOTTOM ROW: SALARY & SOURCES --- */}
                        <div className='flex gap-4 mb-4 max-lg:flex-col'>
                            <div className='w-[70%] max-lg:w-full bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl'>
                                <SalaryDistributionChart data={data?.chart_data ?? []} />
                            </div>

                            <div className='w-[30%] max-lg:w-full bg-[#0D0716] border border-[#392e4e] rounded-xl pt-4'>
                                <ApplicationResource data={data?.chart_data ?? []} />
                            </div>
                        </div>

                        <div className='mb-4'> 
                            <MonthlyVolume data={data?.chart_data ?? []} />
                        </div>

                        {/* --- INSIGHTS SECTION --- */}
                        <div className='w-full'>
                            <div className='flex gap-2 w-full max-lg:flex-col'>
                                
                                {/* 1. Best Days to Apply */}
                                <div className='bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl flex flex-col justify-center gap-2 w-[25%] max-lg:w-full'>
                                    <h1>
                                        <ShinyText text="Best Days to Apply" disabled={false} speed={3} className='text-gray-300 font-medium text-md' />
                                    </h1>

                                    <div className='flex flex-col justify-between  mt-2'>
                                        {data?.best_days && data.best_days.length > 0 ? (
                                            data.best_days.map((day, i) => (
                                                <div key={i} className='flex flex-col'>
                                                    <p className='font-bold text-md mb-1 flex items-center gap-2'>{day.day}
                                                        <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={10} showBorder={false}>
                                                            <h1 className="text-lg font-extrabold">{day.percent}%</h1>
                                                        </GradientText>
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm">No data available yet.</p>
                                        )}
                                    </div>
                                </div>

                                {/* 2. Top Skills in Demand */}
                                <div className='bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl flex justify-start items-start gap-2 w-[25%] max-lg:w-full flex-col'>
                                    <div>
                                        <h1>
                                            <ShinyText text="Top Skills in Demand" disabled={false} speed={3} className='text-gray-300 font-medium text-md mb-2' />
                                        </h1>
                                        <div className="flex flex-wrap gap-2 my-2">
                                            {data?.top_skills && data.top_skills.length > 0 ? (
                                                data.top_skills.map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                        {skill.name} ({skill.count})
                                                    </span>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-sm">Add tags to applications to see stats.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Industry Response Rate (DYNAMIC NOW) */}
                                <div className='bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl flex flex-col justify-center gap-2 w-[25%] max-lg:w-full'>
                                    <h1>
                                        <ShinyText text="Industry Response Rate" disabled={false} speed={3} className='text-gray-300 font-medium text-md' />
                                    </h1>
                                    <div className='flex justify-between items-end'>
                                        <div className='flex flex-col gap-4 w-full'>
                                            {data?.industry_stats && data.industry_stats.length > 0 ? (
                                                data.industry_stats.map((stat, i) => (
                                                    <div key={i} className="flex justify-between items-center w-full">
                                                        <div className="flex gap-2 justify-center items-center">
                                                            <p className='font-bold text-md mb-1 flex items-center gap-2 text-gray-200'>
                                                                {stat.name}
                                                            </p>
                                                            <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={10} showBorder={false}>
                                                                <h1 className="text-xl font-extrabold">{stat.percent_str}</h1>
                                                            </GradientText>
                                                        </div>
                                                        {/* <div className="w-[60px]">
                                                            <SparkLine data={stat.trend} height={25} />
                                                        </div> */}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-sm">Add job titles like "Developer" or "Designer" to see stats.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 4. Average Interview Rounds (DYNAMIC NOW) */}
                                <div className='bg-[#0D0716] border border-[#392e4e] p-4 rounded-xl flex flex-col justify-center gap-2 w-[25%] max-lg:w-full'>
                                    <h1>
                                        <ShinyText text="Avg. Interview Rounds" disabled={false} speed={3} className='text-gray-300 font-medium text-md' />
                                    </h1>
                                    <div className='flex justify-between items-end'>
                                        <div className='flex flex-col gap-2 w-full'>
                                            {data?.interview_rounds && data.interview_rounds.length > 0 ? (
                                                data.interview_rounds.map((stat, i) => (
                                                    <div key={i} className="flex justify-between items-center w-full">
                                                        <div className="flex gap-2 justify-center items-center">
                                                            <p className='font-bold text-md mb-1 flex items-center gap-2 text-gray-200'>
                                                                {stat.name}
                                                            </p>
                                                            <GradientText colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]} animationSpeed={10} showBorder={false}>
                                                                <h1 className="text-xl font-extrabold">{stat.rounds}</h1>
                                                            </GradientText>
                                                        </div>
                                                        {/* <div className="w-[60px]">
                                                            <SparkLine data={stat.trend} height={25} />
                                                        </div> */}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-sm">No salary data to estimate rounds.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* --- COMPANY COMPARISON TABLE --- */}
                        <div className='mt-6 flex gap-4 w-full max-lg:flex-col' >
                            <section aria-labelledby="comparison-title" className='w-[70%] max-lg:w-full'>
                                <h2 id="comparison-title" className="text-xl font-bold mb-4">Company Comparison</h2>
                                <div className="bg-[#0D0716] border border-[#392e4e] rounded-xl overflow-hidden overflow-y-auto max-h-[250px] custom-scrollbar">
                                    <table className="table-auto w-full">
                                        <thead className="bg-[#392e4e] text-left text-xs font-semibold text-gray-100 uppercase tracking-wider sticky top-0">
                                            <tr>
                                                <th className="p-4">Company Name</th>
                                                <th className="p-4">Apps Sent</th>
                                                <th className="p-4">Response Rate</th>
                                                <th className="p-4">Average Salary</th>
                                                <th className="p-4">Success Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#392e4e]">
                                            {data?.company_stats && data.company_stats.length > 0 ? (
                                                data.company_stats.map((comp, i) => (
                                                    <tr key={i} className="hover:bg-[#392e4e] transition-colors">
                                                        <td className="p-4 font-medium text-white">{comp.name}</td>
                                                        <td className="p-4 text-gray-200">{comp.total}</td>
                                                        <td className="p-4 text-gray-200">{comp.response_rate}</td>
                                                        <td className="p-4 text-gray-200">{comp.avg_salary}</td>
                                                        <td className={`p-4 font-medium ${parseFloat(comp.success_rate) > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                                                            {comp.success_rate}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="p-4 text-center text-gray-500">No data available.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section className='w-[30%] max-lg:w-full'>
                                <h2 className="text-xl font-bold mb-4">Recommendations</h2>
                                <div className='bg-[#0D0716] border border-[#392e4e] rounded-xl p-4 overflow-y-auto h-[250px] custom-scrollbar space-y-4'>
                                    {/* Dynamic Recommendation based on Best Day */}
                                    <div className='bg-[#0D0716] border border-[#392e4e] rounded-xl p-4'>
                                        <h2>Apply More on <span className="text-purple-400 font-bold">{data?.best_days?.[0]?.day || 'Monday'}s</span></h2>
                                        <p className="text-xs text-gray-400 mt-1">You get the most responses on this day.</p>
                                    </div>
                                    <div className='bg-[#0D0716] border border-[#392e4e] rounded-xl p-4'>
                                        <h2>Focus on Remote Jobs</h2>
                                    </div>
                                    <div className='bg-[#0D0716] border border-[#392e4e] rounded-xl p-4'>
                                        <h2>Update Your Skills (React, AWS)</h2>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                        {/* 🔥 FIX 1: Updated Icon Name */}
                        <FaTriangleExclamation className="w-10 h-10 mb-2" />
                        <p>No analytics data available yet.</p>
                    </div>
                )}
            </main>
        </div>
    );
}