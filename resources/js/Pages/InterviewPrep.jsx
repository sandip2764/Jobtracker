import React, { useState } from 'react';
import GradientText from '@/Components/GradientText';
import DarkVeil from '@/Components/DarkVeil';
import { 
  Search, Filter, ChevronDown, ChevronUp, CheckCircle, 
  Circle, PlayCircle, BarChart3, Briefcase, Building2, Layers
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_QUESTIONS = [
  {
    id: 1,
    title: "Explain the difference between useMemo and useCallback.",
    answer: "useMemo returns a memoized value, while useCallback returns a memoized callback function. useMemo is used to avoid expensive calculations...",
    difficulty: "Medium",
    category: "Technical",
    role: "Frontend",
    companies: ["Google", "Amazon"],
    status: "solved" // solved, unsolved
  },
  {
    id: 2,
    title: "Design a scalable Notification System.",
    answer: "A notification system needs to handle high throughput. Use a message queue (Kafka/RabbitMQ) to decouple producers from consumers...",
    difficulty: "Hard",
    category: "System Design",
    role: "Backend",
    companies: ["Uber", "Meta"],
    status: "unsolved"
  },
  {
    id: 3,
    title: "What is your biggest weakness?",
    answer: "Choose a real weakness but explain how you are working to overcome it. For example: 'I sometimes focus too much on details...'",
    difficulty: "Easy",
    category: "Behavioral",
    role: "All",
    companies: ["HR Round"],
    status: "unsolved"
  },
  {
    id: 4,
    title: "Explain Sharding vs Partitioning in Databases.",
    answer: "Sharding is horizontal scaling across multiple servers. Partitioning is dividing tables within a single database instance.",
    difficulty: "Medium",
    category: "Technical",
    role: "Backend",
    companies: ["Netflix", "Amazon"],
    status: "solved"
  }
];

// Stats Data (Real app mein ye DB se calculate hoke aayega)
const STATS = {
  total: 45,
  solved: 12,
  easy: 15,
  medium: 20,
  hard: 10
};

export default function InterviewPrep() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ role: "", company: "", category: "" });
  const [expandedId, setExpandedId] = useState(null); // Only one open at a time for focus
  const [revealedId, setRevealedId] = useState(null); // Toggle answer visibility

  // Toggle Accordion
  const toggleAccordion = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      setRevealedId(null);
    } else {
      setExpandedId(id);
      setRevealedId(null); // Reset answer visibility when opening new card
    }
  };

  // Filter Logic
  const filteredQuestions = MOCK_QUESTIONS.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filters.role ? (q.role === filters.role || q.role === 'All') : true;
    const matchesCompany = filters.company ? q.companies.includes(filters.company) : true;
    const matchesCategory = filters.category ? q.category === filters.category : true;
    return matchesSearch && matchesRole && matchesCompany && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#060010] text-slate-200 font-sans selection:bg-purple-500/30 pb-20">
      
      {/* Page Container */}
      <div className="absolute inset-0 opacity-70 mix-blend-screen">
         <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <DarkVeil />
         </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* --- 1. TITLE & INTRO --- */}
         <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight flex ">
            Interview 
            <div>
               <GradientText
                  colors={["#8660fa", "#a855f7", "#8400ff", "#a855f7", "#8660fa"]}
                  animationSpeed={8}
                  showBorder={false}
                  className="custom-class"
                  >
                  <h1 className="text-3xl font-bold md:text-4xl px-2">Preparation</h1>
               </GradientText>
            </div>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Practice real interview questions tailored to your role. Track your progress and master the concepts.
          </p>
         </div>

        {/* --- 2. PROGRESS STATS (DASHBOARD FEEL) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          
          {/* Card 1: Overall Progress */}
          <div className="bg-[#060010] border border-[#392e4e] p-5 rounded-2xl flex items-center gap-5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
            
            <div className="relative w-16 h-16 flex items-center justify-center">
               {/* Simple Circular Progress using SVG */}
               <svg className="transform -rotate-90 w-16 h-16">
                 <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                 <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175} strokeDashoffset={175 - (175 * (STATS.solved / STATS.total))} className="text-purple-500" />
               </svg>
               <span className="absolute text-xs font-bold">{Math.round((STATS.solved / STATS.total) * 100)}%</span>
            </div>
            
            <div>
               <p className="text-slate-400 text-sm font-medium">Questions Solved</p>
               <h3 className="text-2xl font-bold text-white">{STATS.solved} <span className="text-slate-300 text-base font-normal">/ {STATS.total}</span></h3>
            </div>
          </div>

          {/* Card 2: Difficulty Breakdown */}
          <div className="bg-[#060010] border border-[#392e4e] p-5 rounded-2xl flex flex-col justify-center relative overflow-hidden">
             <div className="flex justify-between items-end mb-2">
                <span className="text-slate-400 text-sm font-medium">Difficulty Level</span>
                <BarChart3 className="w-4 h-4 text-slate-300" />
             </div>
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                   <span className="w-12 text-slate-400">Easy</span>
                   <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{width: '60%'}}></div>
                   </div>
                   <span className="text-slate-300">12</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                   <span className="w-12 text-slate-400">Medium</span>
                   <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{width: '30%'}}></div>
                   </div>
                   <span className="text-slate-300">8</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                   <span className="w-12 text-slate-400">Hard</span>
                   <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{width: '10%'}}></div>
                   </div>
                   <span className="text-slate-300">2</span>
                </div>
             </div>
          </div>

          {/* Card 3: Quick Action */}
          <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/50 border border-purple-500/20 p-5 rounded-2xl flex flex-col justify-center items-start">
             <h3 className="text-white font-semibold mb-1">Keep the streak alive! 🔥</h3>
             <p className="text-purple-200/60 text-sm mb-4">You solved 2 questions today.</p>
             <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20">
                Pick a Random Question
             </button>
          </div>
        </div>

        {/* --- 3. FILTERS & SEARCH --- */}
        <div className="bg-purple-950/10 border border-[#392e4e] rounded-xl p-4 mb-6 sticky top-4 z-20 shadow-xl shadow-black/20 backdrop-blur-md bg-opacity-80">
           <div className="flex flex-col md:flex-row gap-4">
              
              {/* Search */}
              <div className="flex-1 relative">
                 <Search className="absolute left-3 top-3 w-5 h-5 text-slate-300" />
                 <input 
                    type="text" 
                    placeholder="Search for keywords..." 
                    className="w-full bg-[#060010] border border-[#392e4e] text-slate-200 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>

              {/* Filters Group */}
              <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                 <div className="relative min-w-[140px]">
                    <Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                    <select 
                       className="w-full bg-[#060010] border border-[#392e4e] text-slate-300 pl-9 pr-8 py-2.5 rounded-lg appearance-none focus:border-purple-500 focus:outline-none cursor-pointer text-sm font-medium"
                       onChange={(e) => setFilters({...filters, role: e.target.value})}
                    >
                       <option value="">All Roles</option>
                       <option value="Frontend">Frontend</option>
                       <option value="Backend">Backend</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-300 pointer-events-none" />
                 </div>

                 <div className="relative min-w-[140px]">
                    <Building2 className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                    <select 
                       className="w-full bg-[#060010] border border-[#392e4e] text-slate-300 pl-9 pr-8 py-2.5 rounded-lg appearance-none focus:border-purple-500 focus:outline-none cursor-pointer text-sm font-medium"
                       onChange={(e) => setFilters({...filters, company: e.target.value})}
                    >
                       <option value="">All Companies</option>
                       <option value="Google">Google</option>
                       <option value="Amazon">Amazon</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-300 pointer-events-none" />
                 </div>

                 <div className="relative min-w-[140px]">
                    <Layers className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                    <select 
                       className="w-full bg-[#060010] border border-[#392e4e] text-slate-300 pl-9 pr-8 py-2.5 rounded-lg appearance-none focus:border-purple-500 focus:outline-none cursor-pointer text-sm font-medium"
                       onChange={(e) => setFilters({...filters, category: e.target.value})}
                    >
                       <option value="">All Categories</option>
                       <option value="Technical">Technical</option>
                       <option value="Behavioral">Behavioral</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-300 pointer-events-none" />
                 </div>
              </div>
           </div>
        </div>

        {/* --- 4. QUESTION LIST --- */}
        <div className="space-y-3">
           <div className="flex justify-between items-center px-2 mb-2">
              <span className="text-slate-300 text-sm font-medium">{filteredQuestions.length} Questions Found</span>
              <span className="text-slate-400 text-xs">Click to expand</span>
           </div>

           {filteredQuestions.map((q) => {
              const isOpen = expandedId === q.id;
              const isRevealed = revealedId === q.id;
              
              // Dynamic Colors based on Difficulty
              const diffColor = q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                                'bg-red-500/10 text-red-400 border-red-500/20';

              return (
                 <div 
                    key={q.id} 
                    className={`border rounded-xl transition-all duration-300 ${
                       isOpen 
                       ? 'bg-[#060010] border-purple-500/50 shadow-lg shadow-purple-900/20' 
                       : 'bg-[#060010] border-[#392e4e] hover:border-purple-700/50 hover:bg-purple-900/15'
                    }`}
                 >
                    {/* Header (Always Visible) */}
                    <div 
                       className="p-5 cursor-pointer flex gap-4"
                       onClick={() => toggleAccordion(q.id)}
                    >
                       {/* Status Indicator */}
                       <div className="pt-1">
                          {q.status === 'solved' ? (
                             <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                             <Circle className="w-5 h-5 text-slate-300" />
                          )}
                       </div>

                       <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${diffColor}`}>
                                {q.difficulty}
                             </span>
                             <span className="text-slate-300 text-xs px-2 py-0.5 bg-purple-950/10 rounded border border-[#392e4e]">
                                {q.category}
                             </span>
                             {q.companies.map((c, i) => (
                                <span key={i} className="text-slate-200 text-xs px-2 py-0.5 bg-purple-600/50 rounded border border-[#392e4e] hidden sm:inline-block">
                                   {c}
                                </span>
                             ))}
                          </div>
                          
                          <h3 className={`font-semibold text-lg leading-snug ${isOpen ? 'text-white' : 'text-slate-200'}`}>
                             {q.title}
                          </h3>
                       </div>

                       <div className="self-center">
                          {isOpen ? <ChevronUp className="text-slate-200" /> : <ChevronDown className="text-slate-300" />}
                       </div>
                    </div>

                    {/* Body (Expandable) */}
                    {isOpen && (
                       <div className="px-5 pb-5 pl-14 animate-in fade-in slide-in-from-top-2 duration-200">
                          {/* Answer Area */}
                          <div className="bg-purple-950/30 rounded-lg border border-[#392e4e] p-4 relative overflow-hidden">
                             
                             {!isRevealed ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                   <p className="text-slate-300 text-sm mb-3">Take a moment to think about the solution.</p>
                                   <button 
                                      onClick={(e) => { e.stopPropagation(); setRevealedId(q.id); }}
                                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/80 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
                                   >
                                      <PlayCircle className="w-4 h-4" /> Reveal Answer
                                   </button>
                                </div>
                             ) : (
                                <div className="prose prose-invert prose-sm max-w-none">
                                   <p className="text-slate-300 leading-relaxed">{q.answer}</p>
                                   
                                   {/* Footer Actions */}
                                   <div className="mt-6 pt-4 border-t border-[#392e4e] flex justify-between items-center">
                                      <span className="text-xs text-slate-300">Was this helpful?</span>
                                      <div className="flex gap-2">
                                         {q.status === 'unsolved' && (
                                            <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 rounded text-xs font-medium transition-colors">
                                               Mark as Solved
                                            </button>
                                         )}
                                      </div>
                                   </div>
                                </div>
                             )}
                          </div>
                       </div>
                    )}
                 </div>
              );
           })}

           {/* Empty State */}
           {filteredQuestions.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-[#392e4e] rounded-xl">
                 <p className="text-slate-300">No questions found matching your filters.</p>
                 <button 
                    onClick={() => { setFilters({role:"", company:"", category:""}); setSearchQuery(""); }}
                    className="mt-2 text-purple-400 hover:text-purple-300 text-sm font-medium"
                 >
                    Clear Filters
                 </button>
              </div>
           )}
        </div>

      </div>
    </div>
  );
}