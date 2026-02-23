import React, { useState, useEffect } from 'react';
import { Icons } from '../App';
import { auth } from '../lib/firebase';
import { getEnrollmentStatus } from '../lib/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { MentorshipLogbook } from '../components/MentorshipLogbook';
import { W1000SimulatorPage } from './W1000SimulatorPage';
import { WingMentorNetworkPage } from './WingMentorNetworkPage';
import { IndustryAssessmentPage } from './IndustryAssessmentPage';

interface FoundationalProgramPageProps {
    onBack: () => void;
    onLogout: () => void;
    onStartEnrollment: () => void;
    onStartSlideshow: () => void;
}

export const FoundationalProgramPage: React.FC<FoundationalProgramPageProps> = ({ onBack, onLogout, onStartEnrollment, onStartSlideshow }) => {
    const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeView, setActiveView] = useState<'cards' | 'logbook' | 'profile' | 'core'>('cards');
    const [coreSubView, setCoreSubView] = useState<'menu' | 'w1000' | 'network' | 'assessment'>('menu');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const programs = await getEnrollmentStatus(user.uid);
                    setIsEnrolled(programs.includes('Foundational'));
                } catch (error) {
                    console.error("Error fetching enrollment:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);



    if (loading) {
        return (
            <div className="dashboard-container animate-fade-in">
                <main className="dashboard-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                    <div className="loading-spinner"></div>
                </main>
            </div>
        );
    }

    if (activeView === 'core' && coreSubView === 'w1000') {
        return <W1000SimulatorPage onBack={() => setCoreSubView('menu')} onLogout={onLogout} />;
    }
    if (activeView === 'core' && coreSubView === 'network') {
        return <WingMentorNetworkPage onBack={() => setCoreSubView('menu')} onLogout={onLogout} />;
    }
    if (activeView === 'core' && coreSubView === 'assessment') {
        return <IndustryAssessmentPage onBack={() => setCoreSubView('menu')} onLogout={onLogout} />;
    }

    return (
        <div className="dashboard-container animate-fade-in">
            <main className="dashboard-card" style={{ position: 'relative' }}>
                <button className="platform-logout-btn" onClick={onLogout}>
                    <Icons.LogOut style={{ width: 16, height: 16 }} />
                    Logout
                </button>

                {/* Navigation Bar */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={activeView === 'logbook' ? () => setActiveView('profile') : (activeView === 'profile' || activeView === 'core') ? () => setActiveView('cards') : onBack}
                        className="horizontal-card-action"
                        style={{
                            backgroundColor: '#f1f5f9',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#334155',
                            cursor: 'pointer',
                            borderRadius: '9999px',
                            fontWeight: 500,
                            fontSize: '0.875rem'
                        }}
                    >
                        <div style={{ transform: 'rotate(180deg)', display: 'flex' }}>
                            <Icons.ArrowRight />
                        </div>
                        {activeView === 'logbook' ? 'Back to Profile' : (activeView === 'profile' || activeView === 'core') ? 'Back to Modules' : 'Back to Dashboard'}
                    </button>
                </div>

                {/* Page Header */}
                <div className="dashboard-header" style={{ marginBottom: '3rem' }}>
                    <div className="dashboard-logo">
                        <img src="/logo.png" alt="WingMentor Logo" />
                    </div>
                    <div className={isEnrolled ? "text-blue-600 tracking-widest text-sm font-semibold uppercase mt-4" : "dashboard-subtitle"}>
                        {activeView === 'logbook' ? 'MODULE: LOGBOOK' : activeView === 'profile' ? 'PROFILE' : activeView === 'core' ? 'PROGRAM CORE' : 'FOUNDATIONAL PROGRAM'}
                    </div>
                    <h1 className={isEnrolled ? "font-serif text-4xl text-slate-900 mt-2" : "dashboard-title"} style={!isEnrolled ? { fontSize: '2.5rem' } : {}}>
                        {isEnrolled ? (activeView === 'logbook' ? 'Mentorship Logbook' : activeView === 'profile' ? 'Your Profile' : activeView === 'core' ? 'Core Curriculum' : 'Your Command Center') : 'Core Principles'}
                    </h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', marginTop: isEnrolled ? '1rem' : '0' }}>
                        {isEnrolled
                            ? (activeView === 'logbook'
                                ? 'Log your 1-on-1 consultation sessions, track verified mentorship hours, and peer-verify your partners below.'
                                : activeView === 'profile'
                                    ? 'Access your logbooks and track your certification progress.'
                                    : activeView === 'core'
                                        ? 'Complete your 50 hours of verified foundational practice and peer collaboration to unlock your final industry assessment.'
                                        : 'Welcome to your Foundational Program dashboard. Select a module below.')
                            : 'Welcome to the Foundational Program. This track is designed for Starter Mentees to receive targeted, 1-on-1 consultation, analyze performance gaps, and log their first 20 verified mentorship hours.'}
                    </p>

                    {isEnrolled && activeView === 'cards' && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <button
                                onClick={onStartSlideshow}
                                className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Icons.BookOpen style={{ width: 16, height: 16 }} />
                                Replay Orientation
                            </button>
                        </div>
                    )}
                </div>

                {/* Page Content */}
                <div className="dashboard-content">
                    {isEnrolled ? (
                        activeView === 'logbook' ? (
                            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                                <MentorshipLogbook />
                            </div>
                        ) : (
                            <>
                                <section className="dashboard-section" style={{ marginTop: '2rem' }}>
                                    <div className="cards-list">
                                        {activeView === 'cards' && (
                                            <>
                                                <div className="horizontal-card" style={{ cursor: 'pointer', padding: 0 }} onClick={() => setActiveView('core')}>
                                                    <div className="horizontal-card-img" style={{ padding: '1.5rem', paddingRight: 0, width: '280px', flexShrink: 0 }}>
                                                        <div style={{ aspectRatio: '16/9', position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                                            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop" alt="Program Core" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </div>
                                                    </div>
                                                    <div className="horizontal-card-content" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <h3 className="horizontal-card-title" style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>Program Core</h3>
                                                        <p className="horizontal-card-desc" style={{ marginBottom: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                            Access the foundational curriculum, required readings, and introductory modules to begin your journey.
                                                        </p>
                                                    </div>
                                                    <div className="hub-card-arrow" style={{ alignSelf: 'center', marginRight: '2rem', marginLeft: 'auto' }}>
                                                        <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                                    </div>
                                                </div>

                                                <div className="horizontal-card" style={{ cursor: 'pointer', padding: 0 }} onClick={() => setActiveView('profile')}>
                                                    <div className="horizontal-card-img" style={{ padding: '1.5rem', paddingRight: 0, width: '280px', flexShrink: 0 }}>
                                                        <div style={{ aspectRatio: '16/9', position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                                            <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=800&auto=format&fit=crop" alt="Profile" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </div>
                                                    </div>
                                                    <div className="horizontal-card-content" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <h3 className="horizontal-card-title" style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>Profile</h3>
                                                        <p className="horizontal-card-desc" style={{ marginBottom: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                            Manage your personal flight logbooks, view documented mentorship hours, and check certification statuses.
                                                        </p>
                                                    </div>
                                                    <div className="hub-card-arrow" style={{ alignSelf: 'center', marginRight: '2rem', marginLeft: 'auto' }}>
                                                        <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {activeView === 'profile' && (
                                            <>
                                                <div className="horizontal-card" style={{ cursor: 'pointer', padding: 0 }} onClick={() => setActiveView('logbook')}>
                                                    <div className="horizontal-card-img" style={{ padding: '1.5rem', paddingRight: 0, width: '280px', flexShrink: 0 }}>
                                                        <div style={{ aspectRatio: '16/9', position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                                            <img src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop" alt="Mentorship Logbook" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </div>
                                                    </div>
                                                    <div className="horizontal-card-content" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <h3 className="horizontal-card-title" style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>Mentorship Logbook</h3>
                                                        <p className="horizontal-card-desc" style={{ marginBottom: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                            Log your 1-on-1 consultation sessions, track verified mentorship hours, and peer-verify your partners.
                                                        </p>
                                                    </div>
                                                    <div className="hub-card-arrow" style={{ alignSelf: 'center', marginRight: '2rem', marginLeft: 'auto' }}>
                                                        <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                                    </div>
                                                </div>

                                                <div className="horizontal-card" style={{ cursor: 'pointer', padding: 0 }}>
                                                    <div className="horizontal-card-img" style={{ padding: '1.5rem', paddingRight: 0, width: '280px', flexShrink: 0 }}>
                                                        <div style={{ aspectRatio: '16/9', position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                                            <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800&auto=format&fit=crop" alt="Personal Flight Logbook" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </div>
                                                    </div>
                                                    <div className="horizontal-card-content" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <h3 className="horizontal-card-title" style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>Personal Flight Logbook</h3>
                                                        <p className="horizontal-card-desc" style={{ marginBottom: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                            Securely record your personal flight hours, simulator sessions, and official training flights.
                                                        </p>
                                                    </div>
                                                    <div className="hub-card-arrow" style={{ alignSelf: 'center', marginRight: '2rem', marginLeft: 'auto' }}>
                                                        <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                                    </div>
                                                </div>

                                                <div className="horizontal-card" style={{ cursor: 'pointer', padding: 0 }}>
                                                    <div className="horizontal-card-img" style={{ padding: '1.5rem', paddingRight: 0, width: '280px', flexShrink: 0 }}>
                                                        <div style={{ aspectRatio: '16/9', position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                                            <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop" alt="Progress & Certification" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        </div>
                                                    </div>
                                                    <div className="horizontal-card-content" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <h3 className="horizontal-card-title" style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>Progress & Certification</h3>
                                                        <p className="horizontal-card-desc" style={{ marginBottom: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                            Monitor your progress toward the 50-Hour Mentorship Certificate and view your verified achievements.
                                                        </p>
                                                    </div>
                                                    <div className="hub-card-arrow" style={{ alignSelf: 'center', marginRight: '2rem', marginLeft: 'auto' }}>
                                                        <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {activeView === 'core' && (
                                            <div className="flex flex-col gap-4 w-full">
                                                {/* Progress Tracker */}
                                                <div className="w-full mb-2">
                                                    <div className="flex justify-between items-center text-sm font-bold mb-2">
                                                        <span className="text-slate-800">Certificate Progress</span>
                                                        <span className="text-blue-600">15 / 50 Hrs</span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
                                                        <div className="bg-blue-600 h-2.5 rounded-full w-[30%]"></div>
                                                    </div>
                                                </div>

                                                {/* Phase 1 Card */}
                                                <div
                                                    onClick={() => setCoreSubView('w1000')}
                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'stretch', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #f1f5f9', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden' }}
                                                    className="hover:shadow-md hover:border-blue-100 hover:translate-y-[-2px]"
                                                >
                                                    <div style={{ width: '130px', flexShrink: 0 }}>
                                                        <img
                                                            src="https://images.unsplash.com/photo-1569426915220-33513a96cd84?q=80&w=400&auto=format&fit=crop"
                                                            alt="W1000 Simulator"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
                                                        />
                                                    </div>
                                                    <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>
                                                            1. Initial Application
                                                        </h3>
                                                        <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, marginBottom: 0 }}>
                                                            Launch the high-fidelity simulator scenario engine for foundational practice.
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem' }}>
                                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                            <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Phase 2 Card */}
                                                <div
                                                    onClick={() => setCoreSubView('network')}
                                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'stretch', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #f1f5f9', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden' }}
                                                    className="hover:shadow-md hover:border-blue-100 hover:translate-y-[-2px]"
                                                >
                                                    <div style={{ width: '130px', flexShrink: 0 }}>
                                                        <img
                                                            src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400&auto=format&fit=crop"
                                                            alt="Communications Network"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
                                                        />
                                                    </div>
                                                    <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>
                                                            2. WingMentor Network
                                                        </h3>
                                                        <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, marginBottom: 0 }}>
                                                            Engage directly with your assigned mentors and peer mentees for debriefs.
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem' }}>
                                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                            <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Phase 3 Card */}
                                                <div
                                                    style={{ display: 'flex', alignItems: 'stretch', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #f1f5f9', transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden' }}
                                                    className="opacity-75 grayscale-[50%] cursor-not-allowed"
                                                >
                                                    <div style={{ width: '130px', flexShrink: 0 }}>
                                                        <img
                                                            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop"
                                                            alt="Board Interview"
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
                                                        />
                                                    </div>
                                                    <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                                                            3. Industry Assessment
                                                            <span className="bg-slate-100 text-slate-500 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ml-2">Locked</span>
                                                        </h3>
                                                        <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5, marginBottom: 0 }}>
                                                            Requires 50 verified mentorship hours to unlock scheduling.
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1.5rem' }}>
                                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                            <Icons.Lock style={{ width: 16, height: 16 }} className="text-slate-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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
                            </>
                        )
                    ) : (
                        <div style={{ display: 'block', gap: '2rem' }}>
                            <section
                                className="section-container"
                                style={{
                                    borderTop: '1px solid #e2e8f0',
                                    paddingTop: '2rem',
                                    flex: '1'
                                }}
                            >
                                <h2 className="section-title" style={{ color: '#0f172a', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                                    The Mentorship Approach
                                </h2>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '1.5rem'
                                }}>

                                    <div className="border border-slate-100 hover:shadow-md transition-all" style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.4rem' }}>Phase 1: Diagnostic Assessment</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>Submit your CFI grading sheets. Your Wing Mentor reviews the data, diagnoses the root cause of the issue, and prepares a tailored consultation plan.</p>
                                    </div>

                                    <div className="border border-slate-100 hover:shadow-md transition-all" style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.4rem' }}>Phase 2: Targeted Consultation</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>Engage in a 1-on-1 session where the mentor guides you through your specific problem areas utilizing diagrams, simulators, and practical CRM examples.</p>
                                    </div>

                                    <div className="border border-slate-100 hover:shadow-md transition-all" style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.4rem' }}>Phase 3: Verified Tracking</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>Your session is meticulously documented in the official Wing Mentor logbook. Build your verifiable portfolio and reach 20 hours to unlock the Black Box Vault.</p>
                                    </div>

                                </div>

                                <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                                    <button
                                        onClick={onStartEnrollment}
                                        className="enroll-btn"
                                        style={{
                                            backgroundColor: '#2563eb',
                                            color: 'white',
                                            padding: '1.25rem 3rem',
                                            borderRadius: '12px',
                                            fontSize: '1.25rem',
                                            fontWeight: '700',
                                            border: 'none',
                                            cursor: 'pointer',
                                            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(37, 99, 235, 0.4)'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.3)'; }}
                                    >
                                        Enroll Now
                                    </button>
                                    <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                                        Unlock the Mentorship Logbook and track your progress through the program.
                                    </p>
                                </div>
                            </section>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};
