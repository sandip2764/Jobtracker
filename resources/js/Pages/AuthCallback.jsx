import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function AuthCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        handleCallback();
    }, []);

    const handleCallback = async () => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (error) {
            console.error('Auth error:', error);
            navigate('/auth');
            return;
        }

        if (token) {
            try {
                // Save token
                localStorage.setItem('auth_token', token);
                const response = await api.get('/user');
                login(token, response.data.user);

                // Redirect to dashboard
                navigate('/dashboard');
            } catch (error) {
                console.error('Failed to fetch user:', error);
                navigate('/auth');
            }
        } else {
            navigate('/auth');
        }
    };

    return (
        <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#6b24cf] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#E9E9E9] text-lg font-semibold">Signing you in...</p>
            </div>
        </div>
    );
}