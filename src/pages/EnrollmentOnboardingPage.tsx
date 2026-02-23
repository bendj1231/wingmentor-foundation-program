import React, { useState } from 'react';
import { Icons } from '../App';
import { auth } from '../lib/firebase';
import { completeEnrollment } from '../lib/firestore';

interface EnrollmentOnboardingPageProps {
    onComplete: () => void;
    onBackToPrograms: () => void;
    onLogout: () => void;
}

export const EnrollmentOnboardingPage: React.FC<EnrollmentOnboardingPageProps> = ({ onComplete, onBackToPrograms, onLogout }) => {
    const [interest, setInterest] = useState('');
    const [goals, setGoals] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showLegal, setShowLegal] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed || !interest || !goals) return;

        setLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                await completeEnrollment(user.uid, {
                    interest,
                    goals,
                    agreementVersion: '1.0',
                    agreedAt: new Date().toISOString()
                });
                onComplete();
            }
        } catch (error) {
            console.error("Enrollment error:", error);
            alert("Failed to complete enrollment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{
            minHeight: '100vh',
            padding: '4rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 20
        }}>

            {/* Master Floating Container */}
            <div className="mx-auto bg-slate-50 rounded-xl shadow-2xl overflow-hidden" style={{
                maxWidth: '1100px',
                width: '100%',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                overflow: 'hidden' // Ensure clipping
            }}>

                {/* Unified Header (Inside Container) */}
                <header style={{
                    width: '100%',
                    padding: '1.5rem 2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    borderBottom: '1px solid #e2e8f0',
                    backgroundColor: 'white',
                    zIndex: 10,
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px'
                }}>
                    <button
                        onClick={onBackToPrograms}
                        style={{
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            zIndex: 5
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#0f172a'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
                    >
                        <div style={{ transform: 'rotate(180deg)', display: 'flex' }}>
                            <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                        </div>
                        Back to Programs
                    </button>

                    <div style={{ flex: 1 }}></div>

                    <button
                        className="platform-logout-btn"
                        onClick={onLogout}
                        style={{ position: 'static', margin: 0, zIndex: 5 }}
                    >
                        <Icons.LogOut style={{ width: 16, height: 16 }} />
                        Logout
                    </button>
                </header>

                {/* Master Content Area - FORCED BACKGROUND */}
                <div style={{
                    backgroundColor: '#f8fafc', // bg-slate-50
                    padding: '4rem 3rem 6rem',
                    width: '100%'
                }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        {/* Centered Page Header (Editorial Style) */}
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '240px' }} />
                            </div>
                            <div style={{
                                color: '#2563eb',
                                fontWeight: 600,
                                letterSpacing: '0.25em',
                                fontSize: '0.875rem',
                                textTransform: 'uppercase',
                                marginBottom: '1.5rem'
                            }}>
                                ENROLLMENT & ONBOARDING
                            </div>
                            <h1 style={{
                                fontSize: '3.5rem',
                                fontWeight: 400,
                                color: '#0f172a',
                                fontFamily: 'Georgia, serif',
                                lineHeight: 1.1,
                                marginBottom: '1.5rem'
                            }}>
                                Foundational Program
                            </h1>
                            <p style={{
                                fontSize: '1.125rem',
                                color: '#475569',
                                fontWeight: 400,
                                lineHeight: 1.6,
                                maxWidth: '650px',
                                margin: '0 auto'
                            }}>
                                Transforming low-time pilots into verifiable assets.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '3.5rem',
                            alignItems: 'start'
                        }}>

                            {/* Left Column: Context & Recognition */}
                            <div className="onboarding-info">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    <section>
                                        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                            Industry Recognition
                                        </h3>
                                        <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '1.05rem' }}>
                                            Recognized by <strong>Airbus</strong> and various global airlines, making its official debut at the Etihad Aviation Career Fair on January 21st, 2026.
                                        </p>
                                    </section>

                                    <section>
                                        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                            The WingMentor Difference
                                        </h3>
                                        <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '1.05rem' }}>
                                            We do not teach initial concepts or replace your flight school's curriculum. Instead, we act as diagnostic consultants. By analyzing your specific performance gaps and grading sheets, we provide the targeted, 1-on-1 consultation that standard flight instruction simply cannot accommodate.
                                        </p>
                                    </section>

                                    <section>
                                        <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
                                            Core Deliverables
                                        </h3>
                                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            {[
                                                "Master advanced Crew Resource Management (CRM) and diagnostic problem-solving skills.",
                                                "Transform your training hours into a verifiable portfolio of leadership experience.",
                                                "Earn an industry-recognized 50-Hour Mentorship Certificate.",
                                                "Enter airline interviews equipped with verified logged guidance, proving you are a professional asset rather than a liability."
                                            ].map((item, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '0.875rem', color: '#475569', lineHeight: 1.5, fontSize: '0.95rem' }}>
                                                    <div style={{ marginTop: '0.3rem', width: '20px', height: '20px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <div style={{ width: '8px', height: '8px', backgroundColor: '#166534', borderRadius: '50%' }}></div>
                                                    </div>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            </div>

                            {/* Right Column: Form Card (NESTED WHITE CARD) */}
                            <div className="onboarding-form">
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '2.5rem',
                                    borderRadius: '20px',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '2.5rem' }}>Enrollment Application</h2>

                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        <div className="form-group">
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.75rem' }}>
                                                Why are you interested in this program?
                                            </label>
                                            <textarea
                                                required
                                                value={interest}
                                                onChange={(e) => setInterest(e.target.value)}
                                                placeholder="Tell us about your motivation..."
                                                style={{
                                                    width: '100%',
                                                    minHeight: '120px',
                                                    padding: '1rem',
                                                    borderRadius: '12px',
                                                    border: '1px solid #e2e8f0',
                                                    outline: 'none',
                                                    fontSize: '1rem',
                                                    resize: 'none',
                                                    backgroundColor: '#f8fafc',
                                                    color: '#1e293b'
                                                }}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#475569', marginBottom: '0.75rem' }}>
                                                What are your primary aviation interests and goals?
                                            </label>
                                            <textarea
                                                required
                                                value={goals}
                                                onChange={(e) => setGoals(e.target.value)}
                                                placeholder="Share your long-term vision..."
                                                style={{
                                                    width: '100%',
                                                    minHeight: '120px',
                                                    padding: '1rem',
                                                    borderRadius: '12px',
                                                    border: '1px solid #e2e8f0',
                                                    outline: 'none',
                                                    fontSize: '1rem',
                                                    resize: 'none',
                                                    backgroundColor: '#f8fafc',
                                                    color: '#1e293b'
                                                }}
                                            />
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            padding: '1.5rem',
                                            backgroundColor: '#f8fafc',
                                            borderRadius: '12px',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            <div style={{ paddingTop: '0.2rem' }}>
                                                <input
                                                    type="checkbox"
                                                    id="agreement"
                                                    checked={agreed}
                                                    onChange={(e) => setAgreed(e.target.checked)}
                                                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                                                />
                                            </div>
                                            <label htmlFor="agreement" style={{ fontSize: '0.875rem', color: '#64748b', cursor: 'pointer', lineHeight: 1.5 }}>
                                                I agree to the <span onClick={(e) => { e.preventDefault(); setShowLegal(true); }} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>Terms and Conditions</span>, acknowledge that WingMentor is <strong>not</strong> a flight school, and fully release WingMentor from any legal liability regarding the outcomes of this training program.
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!agreed || loading || !interest || !goals}
                                            className="w-full"
                                            style={{
                                                backgroundColor: agreed && interest && goals ? '#2563eb' : '#94a3b8',
                                                color: 'white',
                                                border: 'none',
                                                padding: '1.1rem',
                                                borderRadius: '12px',
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                cursor: agreed && interest && goals && !loading ? 'pointer' : 'not-allowed',
                                                transition: 'all 0.2s',
                                                boxShadow: agreed && interest && goals ? '0 10px 15px -3px rgba(37, 99, 235, 0.3)' : 'none'
                                            }}
                                        >
                                            {loading ? 'Processing...' : 'Complete Enrollment'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal Modal */}
                {showLegal && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '2rem'
                    }}>
                        <div className="animate-scale-in" style={{
                            backgroundColor: 'white',
                            width: '100%',
                            maxWidth: '800px',
                            maxHeight: '85vh',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}>
                            <div style={{
                                padding: '1.5rem 2.5rem',
                                borderBottom: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a' }}>Legal Documentation</h2>
                                <button
                                    onClick={() => setShowLegal(false)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex' }}
                                >
                                    <Icons.ArrowRight style={{ width: 24, height: 24 }} />
                                </button>
                            </div>

                            <div style={{ padding: '2.5rem', overflowY: 'auto', flex: 1, backgroundColor: '#fcfdfe' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    {/* User Agreement */}
                                    <section>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', borderBottom: '2px solid #eff6ff', paddingBottom: '0.5rem' }}>User Agreement & Release of Liability</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
                                            <div>
                                                <strong style={{ display: 'block', color: '#1e293b', marginBottom: '0.5rem' }}>1. Acknowledgment of Program Nature & Scope of Service</strong>
                                                WingMentor ("The Program") provides supplementary leadership training, consultation, and professional development designed to transition graduate pilots into industry-ready professionals. WingMentor is strictly an advisory and mentorship platform; it is <strong>not</strong> an ab-initio flight school, a Part 141/142 training center, or a governing civil aviation authority. We do <strong>not</strong> teach initial aviation concepts, conduct primary flight lectures, or replace your official flight school's authorized curriculum. Our sole role is to provide supplemental consultation, CRM development, and performance analysis based on your existing flight training.
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', color: '#1e293b', marginBottom: '0.5rem' }}>2. No Guarantee of Employment</strong>
                                                While The Program is recognized by various industry partners (including presentations at the Etihad Aviation Career Fair and recognition by Airbus personnel), enrollment or completion of the 50-Hour Mentorship Certificate does not guarantee employment, licensing, or placement with any specific airline or aviation entity.
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', color: '#1e293b', marginBottom: '0.5rem' }}>3. Assumption of Risk & Release of Liability (Hold Harmless)</strong>
                                                By enrolling in WingMentor, you ("The Mentee") acknowledge that aviation and simulator training carry inherent professional and academic challenges. You agree to fully release, hold harmless, and indemnify WingMentor, its founders, mentors, and affiliates from any and all legal liability, claims, or damages arising from your participation in the program. You explicitly agree not to sue or pursue legal action against WingMentor regarding the outcomes of this training, your career progression, or your performance in official airline assessments.
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', color: '#1e293b', marginBottom: '0.5rem' }}>4. Professional Conduct</strong>
                                                Mentees are expected to assess scenarios and peers with the highest level of professionalism, mimicking a flight-instructor-ready environment. WingMentor reserves the right to terminate enrollment without refund for unprofessional conduct.
                                            </div>
                                        </div>
                                    </section>

                                    {/* Privacy Policy */}
                                    <section>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', borderBottom: '2px solid #eff6ff', paddingBottom: '0.5rem' }}>Privacy Policy</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
                                            <div>
                                                <strong style={{ display: 'block', color: '#1e293b', marginBottom: '0.5rem' }}>1. Data Collection</strong>
                                                To provide personalized mentorship, WingMentor collects information provided during enrollment, including but not limited to: your name, email address, aviation background, primary interests, and long-term career goals.
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', color: '#1e293b', marginBottom: '0.4rem' }}>2. Logbook & Performance Data</strong>
                                                As part of the program, WingMentor tracks and securely stores your mentorship hours, session descriptions, and peer-verification statuses within our database architecture. This data is used strictly to validate your 50-Hour Mentorship Certificate and track your progress.
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', color: '#1e293b', marginBottom: '0.5rem' }}>3. Data Sharing & Security</strong>
                                                Your personal data and logbook entries are secured using industry-standard database encryption. WingMentor does not sell your personal data to third parties. We may share anonymized, aggregated performance metrics with our airline and manufacturing partners (such as Airbus or Etihad) to demonstrate program efficacy. Your personal profile will only be shared directly with airline recruiters if you explicitly opt-in during a WingMentor placement initiative.
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', color: '#1e293b', marginBottom: '0.5rem' }}>4. Account Deletion</strong>
                                                You maintain the right to request the deletion of your account and associated logbook data at any time by contacting WingMentor support.
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white' }}>
                                <button
                                    onClick={() => setShowLegal(false)}
                                    style={{
                                        backgroundColor: '#0f172a',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.875rem 2.5rem',
                                        borderRadius: '12px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
