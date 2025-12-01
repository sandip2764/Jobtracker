import React from 'react';
import { Home, FileQuestion, SearchX, ArrowLeft, Rocket } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* --- CSS FOR CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.5); }
        }
        @keyframes nebula-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-nebula { animation: nebula-spin 20s linear infinite; }
        .animate-text-shimmer { background-size: 200% auto; animation: text-shimmer 3s linear infinite; }
      `}</style>

      {/* --- BACKGROUND UNIVERSE --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        
        {/* Rotating Nebula Gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-[100px] animate-nebula opacity-60"></div>
        
        {/* Stars (Static for performance, twinkling via CSS) */}
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-[twinkle_3s_infinite]"></div>
        <div className="absolute top-[30%] left-[80%] w-1.5 h-1.5 bg-cyan-200 rounded-full animate-[twinkle_4s_infinite]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-1 h-1 bg-purple-200 rounded-full animate-[twinkle_5s_infinite]"></div>
        <div className="absolute bottom-[40%] right-[20%] w-1 h-1 bg-white rounded-full animate-[twinkle_2s_infinite]"></div>
        
        {/* Floating Space Debris */}
        <div className="absolute top-[15%] left-[15%] text-cyan-500/20 animate-float">
            <FileQuestion className="w-16 h-16" />
        </div>
        <div className="absolute bottom-[20%] right-[15%] text-purple-500/20 animate-float-reverse">
            <SearchX className="w-24 h-24" />
        </div>
        <div className="absolute top-[20%] right-[30%] text-pink-500/20 animate-float" style={{animationDelay: '1s'}}>
            <Rocket className="w-12 h-12 -rotate-45" />
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        
        {/* Holographic 404 Text */}
        <div className="relative inline-block mb-2">
          <h1 className="text-[160px] md:text-[240px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-shimmer drop-shadow-2xl select-none">
            404
          </h1>
          {/* Neon Glow Layer behind */}
          <div className="absolute inset-0 text-[160px] md:text-[240px] font-black leading-none text-purple-500/30 blur-2xl select-none -z-10 animate-pulse">
            404
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          Lost in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Void?</span>
        </h2>
        <p className="text-slate-300 text-lg md:text-xl mb-12 leading-relaxed max-w-xl mx-auto">
          The page you are looking for has drifted into a black hole. 
          It's probably hanging out with your missing socks.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          
          <button 
            onClick={() => window.history.back()}
            className="group relative px-8 py-4 rounded-2xl bg-[#0F172A] border border-slate-700 text-slate-300 font-semibold overflow-hidden transition-all hover:border-cyan-500/50 hover:text-white"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </span>
          </button>

          <a 
            href="/dashboard" 
            className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-purple-500/40"
          >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-white/20 translate-y-full rotate-45 group-hover:translate-y-[-200%] transition-transform duration-700"></div>
            <span className="relative flex items-center gap-2">
              <Home className="w-5 h-5" />
              Warp to Dashboard
            </span>
          </a>

        </div>

      </div>

      {/* Footer System Code */}
      <div className="absolute bottom-8 w-full text-center">
        <p className="text-slate-600 font-mono text-xs uppercase tracking-[0.2em] opacity-70">
          System Status: Critical // Coordinates Unknown
        </p>
      </div>

    </div>
  );
}