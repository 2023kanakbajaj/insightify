import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <div className="main-wrapper">
                <Navbar />
                <main className="page-content" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                    {/* Removed fixed paddingTop to allow full control by pages */}
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
