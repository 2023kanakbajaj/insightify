import React from 'react';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/authcontext';

const Header = () => {
    const { currentUser } = useAuth();

    return (
        <header className="app-header">
            {/* Search */}
            <div className="search-bar">
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Search analytics, users, or keywords..."
                    className="search-input"
                />
            </div>

            {/* Actions */}
            <div className="header-actions">
                <Bell size={20} className="text-muted hover:text-white cursor-pointer" />
                <HelpCircle size={20} className="text-muted hover:text-white cursor-pointer" />

                <div className="user-profile">
                    <div className="avatar">
                        {currentUser?.email?.[0].toUpperCase() || 'U'}
                    </div>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                        {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
                    </span>
                    <ChevronDown size={16} className="text-muted" />
                </div>
            </div>
        </header>
    );
};

export default Header;
