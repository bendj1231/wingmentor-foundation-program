import React, { useState } from 'react';
import { Icons } from '../App';

interface PilotGapModulePageProps {
    onBack: () => void;
    onLogout: () => void;
}

const PilotGapModulePage: React.FC<PilotGapModulePageProps> = ({ onBack, onLogout }) => {
    const [hours] = useState(12.5);
    const [showCalculator, setShowCalculator] = useState(false);
    const [investment, setInvestment] = useState(30000);

    const targetHours = 20;
    const progress = (hours / targetHours) * 100;

    return (
        <div className="animate-fade-in" style={{
            minHeight: '100vh',
            backgroundColor: '#ffffff',
            color: '#0f172a',
            fontFamily: 'Inter, system-ui, sans-serif',
            lineHeight: 1.6
        }}>
            {/* Header Actions */}
            <div style={{
                padding: '2rem 3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 10
            }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#1e293b'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
                >
                    <Icons.ArrowLeft style={{ width: 18, height: 18 }} />
                    Back
                </button>

                <button
                    onClick={onLogout}
                    style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        padding: '0.625rem 1rem',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                    }}
                >
                    <Icons.LogOut style={{ width: 16, height: 16 }} />
                    Logout
                </button>
            </div>

            <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 10rem' }}>
                <div className="dashboard-header" style={{ textAlign: 'center', marginBottom: '6rem', borderBottom: 'none', background: 'none' }}>
                    <div className="dashboard-logo" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                        <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '280px', height: 'auto' }} />
                    </div>
                    <div className="dashboard-subtitle" style={{ marginBottom: '1.5rem' }}>
                        CONNECTING PILOTS TO THE INDUSTRY
                    </div>
                    <h1 className="dashboard-title" style={{ fontSize: '4.5rem', marginBottom: '2rem' }}>
                        Industry Familiarization <br /> & Indoctrination
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: '#64748b',
                        maxWidth: '750px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        fontWeight: 400
                    }}>
                        Discover exactly what it takes to break into the industry as a new pilot. This module demystifies the hurdles you'll face—from insurance rules to manufacturer standards—giving you the clarity you need to navigate your career & the Wingmentorship Program.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>

                    {/* Chapter 1: The Why */}
                    <section>
                        <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <div style={{ paddingTop: '0.6rem' }}>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#0f172a', borderRadius: '50%' }}></div>
                            </div>
                            <div>
                                <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                    Chapter 01
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 400, color: '#0f172a', fontFamily: 'Georgia, serif', margin: 0, lineHeight: 1.2 }}>
                                    The "Why": Why is this happening in the first place?
                                </h2>
                            </div>
                        </div>
                        <div style={{ color: '#475569', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p>
                                When you emerge from flight school with a freshly printed license, you're stepping out of a highly controlled simulator bubble and into the vast wilderness of the commercial aviation industry. You quickly realize that the industry is facing a massive disconnect: operators across all sectors—from regional airlines to corporate jet charters and cargo haulers—are desperately short on crew, yet they are extremely hesitant to hand the keys of a multi-million dollar aircraft to a pilot with 250 hours.
                            </p>
                            <p>
                                Why does this paradox exist? Because the structured, repetitive environment of a flight school naturally breeds a very specific type of <strong>Behaviorism</strong>. You learned to fly by rote. You memorized maneuvers for a checkride, learned to navigate controlled airspace under the watchful eye of an instructor, and reacted to standard emergencies with rehearsed, step-by-step <strong>Cognitive Thinking</strong>.
                            </p>
                            <p>
                                But the commercial industry does not operate on rote memorization. It requires complex dynamic problem solving. Flight schools teach you how to pass a test; the industry demands that you know how to survive, standardise, and lead in an unpredictable operational environment. This foundational program exists to bridge that massive psychological and operational chasm. It’s designed to answer the "Why": Why aren't you getting hired instantly, and why is your current level of training insufficient for the harsh realities of the industry?
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>The Insurance Block</h3>
                                    <p style={{ fontSize: '0.95rem' }}>Insurance providers view the rote-learned 250-hour pilot as a catastrophic risk. Without a proven record of complex, dynamic decision-making, it is financially unviable for any operator across the industry to place you in a complex aircraft.</p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>The Operational Wall</h3>
                                    <p style={{ fontSize: '0.95rem' }}>Operators don't just want stick-and-rudder skills; they require advanced Crew Resource Management (CRM), standardized behaviors, and the maturity of <strong>Constructivism</strong>—the ability to adapt and learn from new, unscripted scenarios instantly.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 2: The What */}
                    <section>
                        <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <div style={{ paddingTop: '0.6rem' }}>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#0f172a', borderRadius: '50%' }}></div>
                            </div>
                            <div>
                                <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                    Chapter 02
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 400, color: '#0f172a', fontFamily: 'Georgia, serif', margin: 0, lineHeight: 1.2 }}>
                                    The "What": What are you going to face?
                                </h2>
                            </div>
                        </div>
                        <div style={{ color: '#475569', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p>
                                You are what the industry universally labels a <strong>"Low-Timer."</strong> It’s a term that carries a heavy stigma. It means you have the legal right to fly, but you lack the "operational miles" to be trusted.
                            </p>
                            <p>
                                In flight school, the environment dictated your schedule, your weather minimums, and your stress levels. Every scenario was predictable. Now, you’re facing the <strong>Industry Gap</strong>—an intimidating, developmental void. You are going to face chief pilots who look at your logbook and see a liability. You will face intense simulator assessments that don't test your ability to fly a steeper turn, but rather test your capacity to manage a failing system while communicating effectively with a stressed colleague.
                            </p>
                            <p>
                                You are going to face the harsh reality that your previous <strong>Constructivism</strong>—how you built your knowledge base—was flawed. You built knowledge based on passing tests, not on practical, commercial survival. You will realize that the gap isn't just about a lack of flight hours; it is about the immaturity of your non-technical skills (NOTECHS). It’s about learning to un-learn the rigid habits of primary training and adopting the flexible, standardized mindset of a professional aviator.
                            </p>
                            <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #64748b' }}>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155' }}>
                                    <strong>Real Talk:</strong> Most pilots think the hard part is over once the CPL is printed. In reality, the true test is the "Experience Void." It is the intensely psychological shift from being a student reacting to commands, to becoming a manager of an aircraft system.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 3: The How */}
                    <section>
                        <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <div style={{ paddingTop: '0.6rem' }}>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#0f172a', borderRadius: '50%' }}></div>
                            </div>
                            <div>
                                <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                    Chapter 03
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 400, color: '#0f172a', fontFamily: 'Georgia, serif', margin: 0, lineHeight: 1.2 }}>
                                    The "How": How are you going to take part?
                                </h2>
                            </div>
                        </div>
                        <div style={{ color: '#475569', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p>
                                We bridge this intimidating gap not by tossing you into the deep end, but through structured, psychologically-driven <strong>Competency-Based Training and Assessment (CBTA)</strong>. It is no longer about <i>how long</i> you've flown, but <i>how well</i> you handle specific behavioural cores under operational stress.
                            </p>
                            <p>
                                You will take part through rigorous peer-mentorship, deep scenario-based evaluations, and guided indoctrination into professional workflows. We dissect the pilot into three core psychological pillars. We reconstruct your <strong>Behaviorism</strong> so that adhering to SOPs becomes an ingrained reflex rather than an active choice. We elevate your <strong>Cognitive Thinking</strong> so you learn to anticipate industry-wide multi-crew dynamics, manage immense workloads, and make critical, split-second safety decisions.
                            </p>
                            <p>
                                Finally, we foster true <strong>Constructivism</strong>: teaching you how to build upon your failures constructively, actively self-critique your performances, and continuously learn in the cockpit, day after day.
                            </p>
                            <div style={{ padding: '2rem', backgroundColor: '#eff6ff', borderRadius: '12px', border: '1px solid #dbeafe' }}>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e40af', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Icons.Zap style={{ width: 20, height: 20 }} /> The 3 Psychological Cores
                                </h3>
                                <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#1e3a8a' }}>
                                    <li><strong>Behaviorism:</strong> Unlearning flight-school reflex actions; developing standardized procedures and strict SOP adherence for all industry sectors.</li>
                                    <li><strong>Cognitive Abilities:</strong> Evolving from single-pilot test-taking to processing complex systemic information, managing high-stress workloads, and making mature command decisions.</li>
                                    <li><strong>Constructivism:</strong> Building a framework to continuously learn from operational experiences, self-critique deeply, and adapt to unpredictable environments.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Chapter 4: The Result */}
                    <section>
                        <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                            <div style={{ paddingTop: '0.6rem' }}>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#0f172a', borderRadius: '50%' }}></div>
                            </div>
                            <div>
                                <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                    Chapter 04
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 400, color: '#0f172a', fontFamily: 'Georgia, serif', margin: 0, lineHeight: 1.2 }}>
                                    The Result Factor: What will you achieve?
                                </h2>
                            </div>
                        </div>
                        <div style={{ color: '#475569', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p>
                                Experience is the true foundation of knowledge. The ultimate result of this rigorous module is unquestionable <strong>Industry Credibility</strong>.
                            </p>
                            <p>
                                This program isn't designed to get you a job at one specific airline; it is designed to make you undeniably hirable across the entire commercial aviation spectrum—whether you're flying cargo at 3 AM, navigating complex corporate charter operations, or flying for a legacy carrier. By focusing intensely on the core fundamentals that all operators actually evaluate during simulator checks and technical interviews, we take your "Low-Timer" risk and forge it into verifiable "High-Competency" value.
                            </p>
                            <p>
                                As you complete this module and generate irrefutable Pilot Quality Assurance (PQA) metrics, you build a data-driven portfolio. This portfolio proves that you have the psychological maturity, the standardized behavior, and the advanced CRM capabilities that the industry desperately seeks. You will have transitioned from a student pilot into a professional airman.
                            </p>
                            <div style={{ padding: '1.5rem', borderLeft: '4px solid #2563eb', backgroundColor: '#f8fafc', borderRadius: '0 8px 8px 0', marginTop: '0.5rem' }}>
                                <p style={{ margin: 0, fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 500, color: '#1e293b' }}>
                                    "We don't just teach you to fly a plane; we train you to lead a career across the entire industry. This is the foundation of turning flight hours into true operational knowledge."
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Progress Tracker & Interactive Elements */}
                <div style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* 20-Hour Progress Tracker */}
                    <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Flight Phase Status</h3>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4f46e5', backgroundColor: '#e0e7ff', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>20h Pre-req</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>
                                <span>Verified Training Time</span>
                                <span>{hours}h / {targetHours}h</span>
                            </div>
                            <div style={{ height: '8px', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', backgroundColor: '#4f46e5', width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', margin: 0 }}>
                                Observation flight hours will be unlocked after 20 verified handling hours.
                            </p>
                        </div>
                    </div>

                    {/* Interactive Calculator CTA */}
                    <div style={{ backgroundColor: '#1e3a8a', borderRadius: '16px', padding: '2rem', color: 'white', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', margin: 0 }}>Type Rating ROI</h3>
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                Analyze the financial impact of self-funded type ratings versus structured cadet pathways.
                            </p>
                            <button
                                onClick={() => setShowCalculator(!showCalculator)}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    fontWeight: 700,
                                    padding: '0.75rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                            >
                                {showCalculator ? 'Close Calculator' : 'Launch ROI Calculator'}
                            </button>

                            {showCalculator && (
                                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(59, 130, 246, 0.5)', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease-in-out' }}>
                                    <div>
                                        <label style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#93c5fd', display: 'block', marginBottom: '0.5rem' }}>Investment Amount (€)</label>
                                        <input
                                            type="range"
                                            min="15000"
                                            max="45000"
                                            step="1000"
                                            value={investment}
                                            onChange={(e) => setInvestment(parseInt(e.target.value))}
                                            style={{ width: '100%', cursor: 'pointer' }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#bfdbfe' }}>
                                            <span>€15k</span>
                                            <span style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>€{investment.toLocaleString()}</span>
                                            <span>€45k</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1rem', backgroundColor: 'rgba(30, 58, 138, 0.5)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#93c5fd', marginBottom: '0.25rem' }}>Est. Payback Period</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{(investment / 12000).toFixed(1)} Years</div>
                                        <div style={{ fontSize: '0.7rem', color: '#93c5fd', marginTop: '0.5rem' }}>*Based on Junior FO average salary minus living expenses.</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Knowledge Foundations */}
                    <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1.5rem 0' }}>
                            <Icons.Zap style={{ width: 22, height: 22, color: '#2563eb' }} />
                            Gap Theory Quiz
                        </h3>
                        <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s ease-in-out' }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = '#93c5fd';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Internal Exam 01.A</div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>The Multi-Engine Piston to Jet Transition</h4>
                            <p style={{ fontSize: '0.875rem', color: '#475569', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.5 }}>"What is the single highest cause of checklist non-compliance during line training?"</p>
                            <button style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                                Start Quiz <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            {/* Bottom Advocacy Banner */}
            <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', margin: '0 0 1rem 0' }}>Industry Credibility Starts Here</h2>
                <p style={{ color: '#94a3b8', marginBottom: '2.5rem' }}>Building the future of Pilot Quality Assurance.</p>
                <div style={{ display: 'inline-block' }}>
                    <button
                        onClick={onBack}
                        style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            padding: '1rem 3rem',
                            borderRadius: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    >
                        Return to Hub
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PilotGapModulePage;
