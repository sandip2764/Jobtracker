import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const response = await api.get('/user');
                setUser(response.data.user);
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    };

    const login = (token, userData) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/auth';
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);