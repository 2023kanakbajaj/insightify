import React from 'react';
import { TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const sentimentData = [
        { name: 'Positive', value: 65, color: '#10B981' },
        { name: 'Neutral', value: 25, color: '#F59E0B' },
        { name: 'Negative', value: 10, color: '#EF4444' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', padding: 'var(--space-xl)' }}>

            {/* Page Title */}
            <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Overview</h1>
                <p className="text-muted">Welcome back, here's what's happening with your app.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>

                {/* Card 1: Total Reviews */}
                <div className="glass-panel" style={{ padding: 'var(--space-lg)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h3 className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Total Reviews</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0.5rem 0' }}>12,450</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontSize: '0.9rem' }}>
                                <TrendingUp size={16} />
                                <span>+15% this week</span>
                            </div>
                        </div>
                        <div style={{
                            background: 'rgba(139, 92, 246, 0.1)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-primary)'
                        }}>
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                {/* Card 2: Sentiment Analysis */}
                <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
                    <h3 className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '1rem' }}>Sentiment Analysis</h3>
                    <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sentimentData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={55}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ marginLeft: '1rem' }}>
                            {sentimentData.map(item => (
                                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                                    <span style={{ color: 'var(--color-text-muted)' }}>{item.name} ({item.value}%)</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card 3: Alerts */}
                <div className="glass-panel" style={{ padding: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h3 className="text-muted" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Critical Alerts</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0.5rem 0' }}>3</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                <span>Requires attention</span>
                            </div>
                        </div>
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-error)'
                        }}>
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
