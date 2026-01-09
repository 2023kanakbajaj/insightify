import React from 'react';
import { BarChart2, Zap, MessageSquare } from 'lucide-react';
import LandingCarousel from '../components/LandingCarousel';
import AppInput from '../components/AppInput';
import FeatureCard from '../components/FeatureCard';
import './Landing.css';

export default function Landing() {
    return (
        <div className="landing-page">
            {/* Navbar is now handled by Layout */}

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-glow"></div>

                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="blink-dot"></span>
                        <span>Powered by Gemini 1.5 + RAG</span>
                    </div>

                    <h1 className="hero-title">
                        Transform Reviews into <br />
                        <span className="highlight-gradient">Actionable Growth</span>
                    </h1>

                    <p className="hero-subtitle">
                        Stop guessing why users uninstall. Let our AI analyze review patterns, providing you with data-driven retention strategies in seconds.
                    </p>

                    <div className="hero-input-area">
                        <AppInput />
                        <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Try "Spotify", "Duolingo", or paste a link</p>
                    </div>
                </div>

                {/* 3D Carousel (This component handles its own internal layout, but container needs margin) */}
                <div style={{ marginBottom: '8rem' }}>
                    <LandingCarousel />
                </div>
            </div>

            {/* Dashboard Preview Section */}
            <div className="dashboard-preview">
                <div className="preview-container">
                    <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                        alt="Dashboard Preview"
                        className="preview-image"
                    />
                </div>
            </div>

            {/* Features Grid */}
            <div className="features-section">
                <h2 className="section-title">Intelligence at every layer</h2>

                <div className="features-grid">
                    <FeatureCard
                        icon={BarChart2}
                        title="Review Analysis"
                        description="Identify sediment shifts and topic clusters automatically from user feedback."
                        color="#60a5fa"
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Feature Mining"
                        description="Discover requested features hidden deep within thousands of reviews."
                        color="#facc15"
                    />
                    <FeatureCard
                        icon={MessageSquare}
                        title="Voice AI Mentor"
                        description="Chat with your data. Ask strategic questions and get instant, sourced answers."
                        color="#c084fc"
                    />
                    <FeatureCard
                        icon={BarChart2}
                        title="Competitor Intel"
                        description="Compare your performance metrics directly against your top competitors."
                        color="#4ade80"
                    />
                </div>
            </div>

            {/* Social Proof / Trust */}
            <div className="social-proof-section">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#e2e8f0' }}>Trusted by developers building next-gen apps</h2>
                <div className="company-logos">
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>ACME Corp</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Stark Industries</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Wayne Tech</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Cyberdyne</div>
                </div>
            </div>

            {/* Footer is now handled by Layout */}
        </div>
    );
}
