import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../context/authcontext';
import '../pages/Landing.css'; // Reuse existing styles

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    // Check if we are on the landing page (to optionally change style)
    const isLanding = location.pathname === '/';

    return (
        <nav className="landing-nav">
            <div className="nav-brand cursor-pointer" onClick={() => navigate('/')}>
                <div className="brand-icon">
                    <Sparkles size={18} color="white" />
                </div>
                Insightify
            </div>

            {/* Central Navigation Menu */}
            <div className="nav-menu">
                <button onClick={() => navigate('/dashboard')} className={`nav-link ${location.pathname === '/dashboard' ? 'text-white font-bold' : ''}`}>Dashboard</button>
                <button onClick={() => navigate('/voice-agent')} className={`nav-link ${location.pathname === '/voice-agent' ? 'text-white font-bold' : ''}`}>Voice Agent</button>
                <button onClick={() => navigate('/profile')} className={`nav-link ${location.pathname === '/profile' ? 'text-white font-bold' : ''}`}>Profile</button>
            </div>

            {/* Right Side Actions */}
            <div className="nav-actions">
                {currentUser ? (
                    // Logged In View
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                            {currentUser.email?.[0].toUpperCase()}
                        </div>
                    </div>
                ) : (
                    // Logged Out View
                    <>
                        <button onClick={() => navigate('/login')} className="btn-login">
                            Login
                        </button>
                        <button onClick={() => navigate('/login')} className="btn-cta-small">
                            Get Started
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
