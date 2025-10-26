import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Auth from './Pages/Auth';
import AuthCallback from './Pages/AuthCallback';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" replace />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);