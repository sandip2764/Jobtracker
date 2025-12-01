import react from "react";
import GradientText from "@/Components/GradientText";
import { RainbowButton } from "@/Components/rainbow-button";
import { FiMapPin, FiArrowLeft, FiDollarSign, FiFileText, FiCalendar, FiBriefcase, FiEdit, FiDownload, FiUploadCloud, FiMail} from 'react-icons/fi';
import { HiTrash } from "react-icons/hi";
import { FaUserGroup , FaBriefcase, FaCheck, FaClock, FaEnvelope, FaIndianRupeeSign, FaCalendar } from "react-icons/fa6";
import CardNav from "@/Components/CardNav";

//nav items
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

export default function ApplicationDetails() {
    return (
    <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-12"> 
        <main className="bg-purple-950/30  border-[#392e4e] rounded-2xl shadow-xl overflow-hidden mt-20">
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

            <header className="p-6 sm:p-8 border-b border-[#392e4e]">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                     
                    <div className="flex items-center space-x-5">
                        <img className="w-20 h-20 rounded-lg object-cover" src="https://placehold.co/100x100/1e40af/ffffff?text=C" alt="Company Logo"/>
                        <div>
                            <div>
                                <GradientText
                                    colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]}
                                    animationSpeed={3}
                                    showBorder={false}
                                    className="custom-class"
                                    >
                                    <h1 className="text-3xl font-bold">Senior Frontend Developer</h1>
                                </GradientText>
                            </div>
                            <p className="text-xl font-medium text-purple-100">TechCorp Solutions Inc.</p>
                        </div>
                    </div>
                     
                    <div className="flex items-center space-x-2 flex-shrink-0">
                         
                        <div>
                            <RainbowButton className="mt-4 max-sm:text-xs max-sm:p-2" variant="outline"><FiArrowLeft />Back To Dashboard</RainbowButton>
                        </div>
                        
                        <div>
                            <RainbowButton className="mt-4 max-sm:text-xs max-sm:p-2" variant="default"><FiEdit/>Edit</RainbowButton>
                        </div>

                        <div>
                            <RainbowButton className="mt-4 max-sm:text-xs max-sm:p-2" variant="outline"><HiTrash className="text-red-600" />Delete</RainbowButton>
                        </div>
                    
                    </div>
                </div>
            </header>

             
            <section className="p-6 sm:p-8 border-b border-[#392e4e]">
                <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-5">Status</h2>
                <div className="flex items-center">
                    
                    <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                            <FaCheck />
                        </div>
                        <span className="mt-2 text-sm font-semibold text-purple-600">Applied</span>
                        <span className="text-xs text-gray-500">Oct 28</span>
                    </div>

                    
                    <div className="flex-1 h-1 bg-purple-600 mx-4 rounded-full"></div>

                    
                    <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold ring-4 ring-purple-200">
                            <FaUserGroup />
                        </div>
                        <span className="mt-2 text-sm font-semibold text-purple-600">Interview</span>
                        <span className="text-xs text-gray-500">Nov 10</span>
                    </div>

                     
                    <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full"></div>

                     
                    <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">
                            <FaBriefcase />
                        </div>
                        <span className="mt-2 text-sm font-medium text-gray-400">Offer</span>
                        <span className="text-xs text-gray-400">&nbsp;</span>
                    </div>
                </div>
            </section>
            
            
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                 
                <div className="lg:col-span-2 space-y-8">

                     
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
                        <div className="prose prose-blue max-w-none text-gray-400 space-y-4">
                            <p>We are seeking a passionate and experienced Senior Frontend Developer to join our dynamic team. You will be responsible for building and maintaining our user-facing web applications, working closely with designers and backend engineers.</p>
                            
                            <h3 className="text-lg font-semibold text-white">Key Responsibilities</h3>
                            <ul className="list-disc list-outside pl-6 space-y-2">
                                <li>Develop new user-facing features using React.js and TypeScript.</li>
                                <li>Build reusable code and libraries for future use.</li>
                                <li>Ensure the technical feasibility of UI/UX designs.</li>
                                <li>Optimize applications for maximum speed and scalability.</li>
                                <li>Collaborate with other team members and stakeholders.</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-white">Qualifications</h3>
                            <ul className="list-disc list-outside pl-6 space-y-2">
                                <li>5+ years of experience in frontend development.</li>
                                <li>Strong proficiency in JavaScript, TypeScript, React, and Node.js.</li>
                                <li>Experience with modern frontend build pipelines and tools (e.g., Webpack, Vite, Babel).</li>
                                <li>Familiarity with code versioning tools, such as Git.</li>
                                <li>Excellent problem-solving skills and attention to detail.</li>
                            </ul>
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Your Notes</h2>
                        <textarea 
                            rows="8" 
                            className=" bg-purple-950/30 w-full p-4 rounded-lg border border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-[#392e4e] transition-shadow text-gray-200" 
                            placeholder="Add your personal notes, interview prep, contacts, etc... This is fully editable.&#10;&#10;- Interviewer: Jane Doe (Hiring Manager)&#10;- Discussed my portfolio project on 'Project X'.&#10;- Follow-up questions to ask: ...">
                        </textarea>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Activity Log</h2>
                        <div className="flow-root">
                            <ul role="list" className="-mb-8">
                                <li>
                                    <div className="relative pb-8">
                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-purple-400" aria-hidden="true"></span>
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center ring-8 ring-purple-900">
                                                    <FaClock />
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0 pl-2">
                                                <p className="text-sm font-medium text-gray-200">Status changed to <span className="font-bold">Interview</span></p>
                                                <p className="mt-0.5 text-sm text-gray-400">Scheduled for Nov 10, 2025, 2:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                                <li>
                                    <div className="relative pb-8">
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center ring-8 ring-white">
                                                    <FaEnvelope />
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0 pl-2">
                                                <p className="text-sm font-medium text-gray-200">Application Submitted</p>
                                                <p className="mt-0.5 text-sm text-gray-400">Oct 28, 2025</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>

                <aside className="lg:col-span-1 space-y-8">
                    
                    <section className="bg-purple-950/30 p-6 rounded-lg border border-purple-900">
                        <GradientText
                            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                            animationSpeed={3}
                            showBorder={false}
                            className="custom-class"
                            >
                            <h2 className="text-2xl font-bold mb-5">Job Information</h2>
                        </GradientText>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FiMapPin className="w-6 h-6 text-purple-500 mr-3" />
                                <div>
                                    <span className="text-sm text-white">Location</span>
                                    <p className="font-semibold text-gray-300">San Francisco, CA</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaIndianRupeeSign className="w-6 h-6 text-purple-500 mr-3" />
                                <div>
                                    <span className="text-sm text-white">Salary</span>
                                    <p className="font-semibold text-gray-300">$120,000 – $140,000</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FiBriefcase className="w-6 h-6 text-purple-500 mr-3" />
                                <div>
                                    <span className="text-sm text-white">Work Type</span>
                                    <p className="font-semibold text-gray-300">Remote (Full-Time)</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <FiCalendar className="w-6 h-6 text-purple-500 mr-3" />
                                <div>
                                    <span className="text-sm text-white">Applied Date</span>
                                    <p className="font-semibold text-gray-300">October 28, 2025</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Documents</h2>
                        <div className="space-y-3">
                            <a href="#" className="flex items-center p-4 bg-[#392e4e] rounded-lg  hover:bg-purple-900 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-purple-600 mr-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 005.625 21h12.75c1.24 0 2.25-1.01 2.25-2.25V11.25a9 9 0 00-9-9z" />
                                </svg>
                                <span className="font-medium text-gray-200">My_Resume_v3.pdf</span>
                                <span className="ml-auto text-sm text-purple-500">View</span>
                            </a>
                            <a href="#" className="flex items-center p-4 bg-[#392e4e] rounded-lg  hover:bg-purple-900 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-purple-600 mr-3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 005.625 21h12.75c1.24 0 2.25-1.01 2.25-2.25V11.25a9 9 0 00-9-9z" />
                                </svg>
                                <span className="font-medium text-gray-200">Cover_Letter_TechCorp.pdf</span>
                                <span className="ml-auto text-sm text-purple-500">View</span>
                            </a>
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">Tags & Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">React</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">JavaScript</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">TypeScript</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">Tailwind CSS</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">Node.js</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">+ Add Tag</span>
                        </div>
                    </section>
                </aside>

            </div>

        </main>
    </div>
    );
}