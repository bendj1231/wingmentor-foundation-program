import React from 'react';
import { Icons } from '../App';

interface HubPageProps {
    onSelectCategory: (category: 'programs' | 'pathways' | 'applications') => void;
    onLogout: () => void;
}

export const HubPage: React.FC<HubPageProps> = ({ onSelectCategory, onLogout }) => {
    return (
        <div className="dashboard-container animate-fade-in">
            <main className="dashboard-card" style={{ position: 'relative' }}>
                <button className="platform-logout-btn" onClick={onLogout}>
                    <Icons.LogOut style={{ width: 16, height: 16 }} />
                    Logout
                </button>
                <div className="dashboard-header">
                    <div className="dashboard-logo" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <img src="/logo.png" alt="WingMentor Logo" />
                    </div>
                    <div className="dashboard-subtitle">CONNECTING PILOTS TO THE INDUSTRY</div>
                    <h1 className="dashboard-title">Wingmentor Network</h1>
                    <p>
                        Welcome to the central portal. Select a category below to explore our mentorship programs, structured pathways, and required applications.
                    </p>
                </div>

                <section className="dashboard-section" style={{ marginTop: '2rem' }}>
                    <div className="cards-list">
                        <div className="horizontal-card" style={{ cursor: 'pointer', padding: '1rem 2rem' }} onClick={() => onSelectCategory('programs')}>
                            <div className="horizontal-card-content-wrapper">
                                <div style={{ maxWidth: '65%', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '14px', backgroundColor: '#eff6ff', color: '#2563eb', flexShrink: 0 }}>
                                        <Icons.BookOpen style={{ width: 28, height: 28 }} />
                                    </div>
                                    <div className="horizontal-card-content" style={{ padding: '2rem 0', textAlign: 'left', flex: 1, maxWidth: '100%' }}>
                                        <h3 className="horizontal-card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a', fontWeight: 600 }}>Programs</h3>
                                        <p className="horizontal-card-desc" style={{ maxWidth: '100%', marginBottom: 0, color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
                                            Access Foundational and Transition mentorship programs designed to refine your core mechanics and CRM skills through high-fidelity simulator practice.
                                        </p>
                                    </div>
                                </div>
                                <div className="hub-card-arrow">
                                    <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                </div>
                            </div>
                            <img src="https://lh3.googleusercontent.com/d/1K2CccSObEUsvy6unD8iqWjSjn-Zcw08g" alt="Programs" className="hub-card-bg-image" />
                        </div>

                        <div className="horizontal-card" style={{ cursor: 'pointer', padding: '1rem 2rem' }} onClick={() => onSelectCategory('pathways')}>
                            <div className="horizontal-card-content-wrapper">
                                <div style={{ maxWidth: '65%', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '14px', backgroundColor: '#eff6ff', color: '#2563eb', flexShrink: 0 }}>
                                        <Icons.Map style={{ width: 28, height: 28 }} />
                                    </div>
                                    <div className="horizontal-card-content" style={{ padding: '2rem 0', textAlign: 'left', flex: 1, maxWidth: '100%' }}>
                                        <h3 className="horizontal-card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a', fontWeight: 600 }}>Pathways</h3>
                                        <p className="horizontal-card-desc" style={{ maxWidth: '100%', marginBottom: 0, color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
                                            View structured career roadmaps including the Emirates ATPL, Commercial, and Air Taxi tracks.
                                        </p>
                                    </div>
                                </div>
                                <div className="hub-card-arrow">
                                    <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                </div>
                            </div>
                            <img src="https://connectedaviationtoday.com/wp-content/uploads/2020/12/shutterstock_1698112222.jpg" alt="Pathways" className="hub-card-bg-image" />
                        </div>

                        <div className="horizontal-card" style={{ cursor: 'pointer', padding: '1rem 2rem' }} onClick={() => onSelectCategory('applications')}>
                            <div className="horizontal-card-content-wrapper">
                                <div style={{ maxWidth: '65%', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '14px', backgroundColor: '#eff6ff', color: '#2563eb', flexShrink: 0 }}>
                                        <Icons.Monitor style={{ width: 28, height: 28 }} />
                                    </div>
                                    <div className="horizontal-card-content" style={{ padding: '2rem 0', textAlign: 'left', flex: 1, maxWidth: '100%' }}>
                                        <h3 className="horizontal-card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#0f172a', fontWeight: 600 }}>Pilot Portfolio</h3>
                                        <p className="horizontal-card-desc" style={{ maxWidth: '100%', marginBottom: 0, color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
                                            Access operational web-apps and high-fidelity flight simulation systems required for your mentorship and portfolio building.
                                        </p>
                                    </div>
                                </div>
                                <div className="hub-card-arrow">
                                    <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                </div>
                            </div>
                            <img src="https://www.flightdeckfriend.com/wp-content/uploads/2019/02/Captain-Paperwork-Medium.jpg" alt="Pilot Profile" className="hub-card-bg-image" />
                        </div>
                    </div>
                </section>

                <div className="dashboard-footer" style={{
                    marginTop: '3.5rem',
                    padding: '2rem 2.5rem',
                    backgroundColor: '#f8fafc',
                    borderTop: '1px solid #e2e8f0',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        Need assistance navigating the platform or understanding your requirements?
                    </p>
                    <button
                        className="help-btn"
                        style={{
                            padding: '0.625rem 1.5rem',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: '#334155',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                        }}
                    >
                        Access Help Directory
                    </button>
                </div>
            </main>
        </div>
    );
};
