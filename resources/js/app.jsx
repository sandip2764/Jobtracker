import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Auth from './Pages/Auth';
import AuthCallback from './Pages/AuthCallback';
import Dashboard from './Pages/Dashboard';
import Applications from './Pages/Applications';
import AddApplication from './Pages/AddApplication';
import ApplicationDetails from './Pages/ApplicationDetails';
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
                        path= "/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path= "/applications"
                        element={
                            <ProtectedRoute>
                                <Applications />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path= "/add_application"
                        element={
                            <ProtectedRoute>
                                <AddApplication />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path= "/application_details"
                        element={
                            <ProtectedRoute>
                                <ApplicationDetails />
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