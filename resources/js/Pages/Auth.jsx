import React, { useState } from 'react';
import { Github, Sparkles, TrendingUp, Zap } from 'lucide-react';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.879 15.7789 19.9895 13.2211 19.9895 10.1871Z" fill="#4285F4"/>
    <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9465L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853"/>
    <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05"/>
    <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33717L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335"/>
  </svg>
);

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = 'http://localhost:8000/auth/google';
    }, 500);
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = 'http://localhost:8000/auth/github';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>

      {/* Main Auth Card */}
      <div className="relative w-full max-w-md">
        <div className="relative bg-zinc-950 rounded-2xl border border-zinc-800 p-8 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">

          {/* Content */}
          <div className="relative z-10">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Welcome to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">JobTracker</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg">
                Track your applications, land your dream job
              </p>
            </div>

            {/* Auth Buttons */}
            <div className="space-y-3 mb-8">
              {/* Google Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                onMouseEnter={() => setHoveredBtn('google')}
                onMouseLeave={() => setHoveredBtn(null)}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white bg-zinc-900 border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  hoveredBtn === 'google' ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-zinc-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-zinc-800'}`}
              >
                {isLoading && hoveredBtn === 'google' ? (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <GoogleIcon />
                )}
                <span className="text-base">Continue with Google</span>
              </button>

              {/* GitHub Button */}
              <button
                onClick={handleGithubLogin}
                disabled={isLoading}
                onMouseEnter={() => setHoveredBtn('github')}
                onMouseLeave={() => setHoveredBtn(null)}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white bg-zinc-900 border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  hoveredBtn === 'github' ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-zinc-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500 hover:bg-zinc-800'}`}
              >
                {isLoading && hoveredBtn === 'github' ? (
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Github size={20} />
                )}
                <span className="text-base">Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-950 text-zinc-500">Secure authentication</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:border-blue-500 transition-colors duration-300">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-300 font-medium">Track Jobs</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:border-purple-500 transition-colors duration-300">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-300 font-medium">Analytics</p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:border-pink-500 transition-colors duration-300">
                  <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-300 font-medium">Fast Setup</p>
              </div>
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-zinc-500 leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <span className="text-sm text-zinc-300 font-medium">Trusted by 10,000+ job seekers</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}