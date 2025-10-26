import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#24CFA6] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return children;
}