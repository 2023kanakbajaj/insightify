import React from 'react';
import { motion } from 'framer-motion';

const screenshots = [
    { id: 1, color: '#3b82f6', title: 'Sentiment' },
    { id: 2, color: '#d946ef', title: 'Analytics' },
    { id: 3, color: '#f59e0b', title: 'Growth' },
];

const LandingCarousel = () => {
    // Styles
    const containerStyle = {
        minWidth: '220px',
        height: '400px',
        borderRadius: '30px',
        border: '4px solid #1f2937',
        background: '#111827',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0
    };

    const gradientOverlayStyle = (color) => ({
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${color}, transparent)`,
        opacity: 0.2,
        zIndex: 0
    });

    const skeletonBarStyle = {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        height: '1rem',
        marginBottom: '1rem',
        zIndex: 1
    };

    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '2.5rem 0' }}>
            {/* Fade Edges */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 10, background: 'linear-gradient(to right, #0F172A, transparent)' }}></div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 10, background: 'linear-gradient(to left, #0F172A, transparent)' }}></div>

            <motion.div
                style={{ display: 'flex', gap: '2rem', padding: '0 2.5rem' }}
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
                {/* Doubled for seamless loop */}
                {[...screenshots, ...screenshots, ...screenshots, ...screenshots].map((item, index) => (
                    <div key={index} style={containerStyle}>
                        <div style={gradientOverlayStyle(item.color)}></div>
                        <div style={skeletonBarStyle}></div>
                        <div style={{ ...skeletonBarStyle, width: '75%', marginBottom: '2rem' }}></div>

                        <div style={{
                            flex: 1,
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            zIndex: 1
                        }}>
                            <span style={{ fontSize: '0.875rem', fontFamily: 'monospace', color: '#6b7280' }}>{item.title}</span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default LandingCarousel;
