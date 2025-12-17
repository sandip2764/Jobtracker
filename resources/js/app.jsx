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
import EditApplication from './Pages/EditApplication';
import ApplicationDetails from './Pages/ApplicationDetails';
import AnalyticsDashboard from './Pages/AnalyticsDashboard';
import InterviewPrep from './Pages/InterviewPrep';
import Profile from './Pages/Profile';
import PageNotFound from './Pages/404Page';
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
                        path= "/add-application"
                        element={
                            <ProtectedRoute>
                                <AddApplication />
                            </ProtectedRoute>
                        }
                    />

                    <Route 
                        path= "/edit-application/:id"
                        element={
                            <ProtectedRoute>
                                <EditApplication />
                            </ProtectedRoute>
                        }
                    />

                    <Route 
                        path= "/application-details/:id"
                        element={
                            <ProtectedRoute>
                                <ApplicationDetails />
                            </ProtectedRoute>
                        }
                    />

                    <Route 
                        path= "/analytics-dashboard"
                        element={
                            <ProtectedRoute>
                                <AnalyticsDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route 
                        path= "/interview-prep"
                        element={
                            <ProtectedRoute>
                                <InterviewPrep />
                            </ProtectedRoute>
                        }
                    />

                    <Route 
                        path= "/Profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route 
                        path= "/Error"
                        element={
                            <ProtectedRoute>
                                <PageNotFound />
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