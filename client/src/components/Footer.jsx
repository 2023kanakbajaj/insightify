import React from 'react';
import { Sparkles, Github } from 'lucide-react';
import '../pages/Landing.css'; // Reuse existing styles

const Footer = () => {
    return (
        <footer className="landing-footer">
            <div className="footer-grid">
                <div className="footer-col" style={{ gridColumn: 'span 2' }}>
                    <div className="nav-brand" style={{ marginBottom: '1rem' }}>
                        <div className="brand-icon">
                            <Sparkles size={18} color="white" />
                        </div>
                        Insightify
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6', maxWidth: '300px' }}>
                        Helping mobile developers build better apps through AI-driven insights and review analytics.
                    </p>
                </div>

                <div className="footer-col">
                    <h4>Product</h4>
                    <ul className="footer-links">
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>API</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <ul className="footer-links">
                        <li>About</li>
                        <li>Blog</li>
                        <li>Careers</li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Connect</h4>
                    <ul className="footer-links">
                        <li><Github size={16} /> GitHub</li>
                        <li>Twitter</li>
                        <li>Discord</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Insightify AI. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
                    <span style={{ cursor: 'pointer' }}>Terms of Service</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
