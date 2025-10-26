import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-[#0C0C0C] p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#E9E9E9]">
                        Welcome, <span className="text-[#24CFA6]">{user?.name}</span>!
                    </h1>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#24CFA6]/30 rounded-lg text-[#E9E9E9] hover:border-[#24CFA6] transition-all"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                <div className="bg-[#1a1a1a] border border-[#24CFA6]/20 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-[#E9E9E9] mb-4">User Info</h2>
                    <div className="flex items-center gap-4">
                        <img 
                            src={user?.avatar} 
                            alt={user?.name}
                            className="w-16 h-16 rounded-full border-2 border-[#24CFA6]"
                        />
                        <div>
                            <p className="text-[#E9E9E9] font-semibold">{user?.name}</p>
                            <p className="text-[#E9E9E9]/70">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}