import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icons } from '../App';

interface PilotGapModulePageProps {
    onBack: () => void;
}

const PilotGapModulePage: React.FC<PilotGapModulePageProps> = ({ onBack }) => {
    const [showCalculator, setShowCalculator] = useState(false);
    const [investment, setInvestment] = useState(30000);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentTopic, setCurrentTopic] = useState<string | null>(null);

    // ── Inline editing ──────────────────────────────────────────────────────
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; target: HTMLElement } | null>(null);
    const [editingEl, setEditingEl] = useState<HTMLElement | null>(null);
    const contextMenuRef = useRef<HTMLDivElement>(null);

    const closeContextMenu = useCallback(() => setContextMenu(null), []);

    // Dismiss context menu on outside click or Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeContextMenu();
                if (editingEl) {
                    editingEl.contentEditable = 'false';
                    editingEl.style.outline = '';
                    editingEl.style.borderRadius = '';
                    editingEl.style.backgroundColor = '';
                    setEditingEl(null);
                }
            }
        };
        const onMouseDown = (e: MouseEvent) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
                closeContextMenu();
            }
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onMouseDown);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onMouseDown);
        };
    }, [closeContextMenu, editingEl]);

    const handleContentContextMenu = (e: React.MouseEvent) => {
        const EDITABLE_TAGS = ['P', 'H1', 'H2', 'H3', 'H4', 'LI', 'SPAN', 'STRONG', 'EM', 'I'];
        const target = (e.target as HTMLElement).closest(
            EDITABLE_TAGS.map(t => t.toLowerCase()).join(',')
        ) as HTMLElement | null;
        if (!target) return;
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, target });
    };

    const startEdit = () => {
        if (!contextMenu) return;
        const el = contextMenu.target;
        el.contentEditable = 'true';
        el.style.outline = '2px solid #2563eb';
        el.style.borderRadius = '4px';
        el.style.backgroundColor = 'rgba(219,234,254,0.25)';
        el.focus();
        // Move caret to end
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        setEditingEl(el);
        setContextMenu(null);
    };

    const commitEdit = (el: HTMLElement) => {
        el.contentEditable = 'false';
        el.style.outline = '';
        el.style.borderRadius = '';
        el.style.backgroundColor = '';
        setEditingEl(null);
    };
    // ────────────────────────────────────────────────────────────────────────

    const totalChapters = 7;
    const progress = (currentChapter / (totalChapters - 1)) * 100;

    const navigationFlow = [
        { chapter: 0, topic: 'welcome' }, // New Prior Welcome Page
        { chapter: 0, topic: null },      // Industry Familiarization Hub
        { chapter: 1, topic: null },      // The What
        { chapter: 1, topic: 'what-low-timer' },
        { chapter: 1, topic: 'what-pilot-gap' },
        { chapter: 1, topic: 'what-pilot-shortage' },
        { chapter: 1, topic: 'what-pilot-recognition' },
        { chapter: 2, topic: null }, // The Why
        { chapter: 2, topic: 'why-statistics' },
        { chapter: 2, topic: 'why-trap' },
        { chapter: 3, topic: null }, // The How
        { chapter: 4, topic: null }, // The Result
        { chapter: 5, topic: null }, // Calculator
        { chapter: 6, topic: null }, // Reality Check
    ];

    const getCurrentStepIndex = () => {
        return navigationFlow.findIndex(step => step.chapter === currentChapter && step.topic === currentTopic);
    };

    const handleNext = () => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex < navigationFlow.length - 1) {
            const nextStep = navigationFlow[currentIndex + 1];
            setCurrentChapter(nextStep.chapter);
            setCurrentTopic(nextStep.topic);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex > 0) {
            const prevStep = navigationFlow[currentIndex - 1];
            setCurrentChapter(prevStep.chapter);
            setCurrentTopic(prevStep.topic);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderChapterContent = () => {
        // ── Page 1: What is a Low-Timer Pilot? ──────────────────────────────
        if (currentTopic === 'what-low-timer') {
            return (
                <div style={{ maxWidth: '48rem', margin: '0 auto', paddingTop: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', animation: 'fadeIn 0.4s ease-in-out' }}>
                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                        Chapter 01 — Understanding the What&#39;s
                    </div>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, color: '#0f172a', marginBottom: '3rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                        What is a Low-Timer Pilot?
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#475569', fontSize: '17px', lineHeight: 1.75, marginBottom: '4rem' }}>
                        <p>
                            You passed your commercial checkride. You followed the syllabus perfectly and expected respect. Instead, the moment you graduated, the industry slapped you with a label: the &#34;Low-Timer.&#34; It is not just a reflection of your logbook; it is a heavy industry stigma that immediately devalues your hard-earned license.
                        </p>
                        <p>
                            To an airline recruiter or an insurance underwriter, being a Low-Timer means you have only mastered the sterile, predictable environment of a single-pilot training bubble. It means you inherently lack the advanced Crew Resource Management (CRM) and multi-crew experience required to manage a commercial flight deck under stress.
                        </p>
                        <p>
                            You are no longer judged on how well you execute a steep turn. You are judged on your perceived operational immaturity. You are legally certified to fly, but operationally, you are viewed as an unknown, un-standardized risk.
                        </p>
                        <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #0284c7', marginTop: '1rem' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155' }}>
                                <strong>An Insight from Airbus:</strong> Through direct conversations with the Head of Training and Head of Flight Operations at Airbus, they shared a striking perspective: from a purely capability and technical standpoint, a low-timer undergoing a Type Rating performs on par with a veteran high-timer. However, Airbus, as a manufacturer, cannot publicly state this—the prohibitive constraints (like the 1500-hour rule, specific state regulations, and stringent airline insurance policies) exist completely outside their control.
                            </p>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
                                Understanding Where You Stand
                            </h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                When applying for your first airline role, it is critical to understand who you are sitting next to in the waiting room. You aren't just competing with other fresh graduates; you are often positioned alongside seasoned military pilots with highly structured training, or instructors who have already ground out their 1500 hours. As a 200-hour pilot with no category ratings, the harsh reality is that you are placed at the very bottom of the stack from an employer's risk perspective.
                            </p>
                            <p style={{ marginBottom: '1.5rem', color: '#0284c7', fontWeight: 500 }}>
                                In relation to this competitive landscape, it is important to understand the concept of a "Type Rating", which is often viewed as the ultimate equalizer. You will learn exactly what a Type Rating is and the immense impact it has on the next page.
                            </p>

                            {/* Candidates Image */}
                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc' }}>
                                <img src="/candidates-pilot-gap.png" alt="Different pilot candidates at an interview" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                        </div>


                    </div>
                    <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem' }}>
                        <button onClick={handlePrev} style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            ← Back
                        </button>
                        <button
                            onClick={handleNext}
                            style={{ background: '#0284c7', color: 'white', fontWeight: 600, fontSize: '14px', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#0369a1')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#0284c7')}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            );
        }

        // ── Page 1.5: What is a Type Rating? ────────────────────────────────
        if (currentTopic === 'what-type-rating') {
            return (
                <div style={{ maxWidth: '48rem', margin: '0 auto', paddingTop: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', animation: 'fadeIn 0.4s ease-in-out' }}>
                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                        Chapter 01 — Understanding the What's
                    </div>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, color: '#0f172a', marginBottom: '3rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                        What is a Type Rating?
                    </h1>

                    <div style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#334155' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Before diving into the Pilot Gap, it's crucial to understand a key concept in aviation: the <strong>Type Rating</strong>. While a Commercial Pilot License allows you to fly smaller, piston-engine aircraft for hire, it does <em>not</em> qualify you to fly large, complex jets.
                        </p>

                        <div style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '12px', borderLeft: '4px solid #22c55e', marginBottom: '2rem' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#166534', fontWeight: 500 }}>
                                <strong>Definition:</strong> A Type Rating is an additional, specialized certification issued by an aviation authority (such as the FAA or EASA) that explicitly authorizes a pilot to act as a crew member on a specific "type" of large or complex aircraft (e.g., an Airbus A320, Boeing 737, or ATR 72).
                            </p>
                        </div>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Think of your commercial license as a standard driver's license. It proves you know the rules of the road and how to operate a standard car. A type rating, however, is like getting a specialized commercial endorsement to drive a massive 18-wheeler semi-truck—they are entirely different beasts requiring specific handling, systems knowledge, and training.
                        </p>

                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginTop: '3rem', marginBottom: '1rem' }}>
                            The Hidden Costs
                        </h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Type ratings are notoriously expensive—often costing between <strong>$15,000 and $40,000 USD</strong>. Traditionally, when an airline hired a pilot, <em>the airline</em> would pay for this training as an investment in their new employee.
                        </p>
                        <p style={{ marginBottom: '2rem' }}>
                            However, as we will explore in the Pilot Gap, the sheer volume of low-timer graduates has shifted this dynamic. Many airlines now require pilots to already hold a type rating <em>before</em> they even apply, completely shifting the financial burden onto the applicant's shoulders.
                        </p>

                    </div>

                    {/* The Aftermath Section */}
                    <div style={{ marginTop: '3rem' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
                            The Aftermath: Expectations vs. Reality
                        </h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            The journey often begins with towering expectations. Fresh out of flight school, clutching a newly printed Commercial Pilot License, the immediate dream is a fast-tracked leap into the right seat of a shiny corporate jet or major airliner.
                        </p>

                        {/* Expectation Image */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem 0' }}>
                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc' }}>
                                <img src="/low-timer-expectation.png" alt="Pilot holding commercial license dreaming of a jet" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', maxWidth: '550px', textAlign: 'center', margin: 0 }}>
                                <strong>The Expectation:</strong> Believing a freshly printed Commercial Pilot License is an immediate ticket to flying advanced jets.
                            </p>
                        </div>

                        <p style={{ marginBottom: '1.5rem' }}>
                            However, reality quickly sets in. Desperate to bridge the massive experience gap and stand out from the immense stack of identical resumes, many pilots succumb to paying out-of-pocket for expensive, heavy jet type ratings without any guaranteed job offer attached.
                        </p>
                        <p style={{ marginBottom: '2rem' }}>
                            The aftermath is often devastating. Strapped with debt, recurring currency costs, and an unemployable resume lacking actual line experience, these pilots frequently end up entirely bankrupt—wishing they had simply invested that money into a small general aviation Cessna to organically build their flight hours instead.
                        </p>

                        {/* Reality Image */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem 0' }}>
                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc' }}>
                                <img src="/low-timer-reality.jpg" alt="Bankrupt pilot regretting buying a type rating" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', maxWidth: '550px', textAlign: 'center', margin: 0 }}>
                                <strong>The Reality:</strong> The devastating financial aftermath of purchasing a "shiny type rating" as a shortcut.
                            </p>
                        </div>

                        <p style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            Even pilots who chose the <strong>traditional flight instructor route</strong> are not immune to these desperate investments. Trapped in a holding pattern for years, some instructors will burn their hard-earned cash on a Category 3 type rating (like an Airbus A320 or A380) out of pure frustration, hoping it will force an airline to notice them. Sadly, they would have been far better served investing in a more attainable, entry-level Category 1 rating (such as an ATR) that aligns with their actual experience level. Instead, they remain stuck as instructors, now burdened with a heavy non-refundable training loan and a six-month recurrent training bill they can't afford to drop.
                        </p>

                        {/* Instructor Wrong Investment Image */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem 0' }}>
                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc' }}>
                                <img src="/instructor-wrong-investment-pilot-gap.png" alt="Flight instructor stuck paying for Airbus rating" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', maxWidth: '550px', textAlign: 'center', margin: 0 }}>
                                <strong>The Instructor's Dilemma:</strong> Stuck in the pattern, paying out-of-pocket for recurrent training on a shiny jet they don't actually fly, rather than investing in an attainable Category 1 aircraft jump.
                            </p>
                        </div>
                        <div style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#334155' }}>
                            <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem', fontFamily: 'Georgia, serif' }}>
                                    The "Shiny Type Rating" Syndrome
                                </h4>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    Trapped in this gap with no clear direction, many low-timers succumb to what the industry calls the <strong>"Shiny Type Rating Syndrome."</strong> Out of pure frustration and a desperate need to feel they are progressing, many will take the easy way out and spend tens of thousands of dollars on complex type ratings (like an A320 or ATR rating) <em>before</em> securing a job offer.
                                </p>
                                <p style={{ marginBottom: '2rem' }}>
                                    Without the required line experience to back it up, this is often a catastrophic financial mistake. By the time an airline actually calls, these pilots have frequently run completely out of money to fund the relocation, subsequent training, or living expenses required to finally start their career.
                                </p>

                                {/* Financial Drain Image with Description */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem 0' }}>
                                    <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc' }}>
                                        <img src="/financial-drain-pilot-gap.jpg" alt="Cartoon showing the financial drain of type ratings" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', maxWidth: '550px', textAlign: 'center', margin: 0 }}>
                                        <strong>The Financial Drain:</strong> Taking the easy way out by purchasing a "shiny type rating" without a job offer is often the final nail in the coffin, bleeding a pilot's remaining funds dry.
                                    </p>
                                </div>
                            </div>

                            <div style={{ height: '1px', background: '#e2e8f0', margin: '3rem 0 2rem 0' }} />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem' }}>
                                <button onClick={handlePrev} style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                    ← Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    style={{ background: '#0284c7', color: 'white', fontWeight: 600, fontSize: '14px', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#0369a1')}
                                    onMouseLeave={e => (e.currentTarget.style.background = '#0284c7')}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // ── Page 2: What is the Pilot Gap? ──────────────────────────────────
        if (currentTopic === 'what-pilot-gap') {
            return (
                <div style={{ maxWidth: '48rem', margin: '0 auto', paddingTop: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', animation: 'fadeIn 0.4s ease-in-out' }}>
                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                        Chapter 01 — Understanding the What&#39;s
                    </div>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, color: '#0f172a', marginBottom: '3rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                        What is the Pilot Gap?
                    </h1>

                    {/* Introductory Lead Text */}
                    <div style={{ padding: '2rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', marginBottom: '3rem' }}>
                        <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', lineHeight: 1.6, color: '#334155', margin: 0, textAlign: 'justify' }}>
                            You've earned your Commercial Pilot License. You are qualified, skilled, and ready. Yet, you face an invisible wall. This is the <strong>'Low Timer Pilot Gap'</strong>—the critical period where newly-licensed pilots possess the qualifications but lack the flight hours required for airline consideration.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: '#475569', fontSize: '17px', lineHeight: 1.8, marginBottom: '4rem' }}>
                        {/* Summary Quote */}
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <p style={{ fontSize: '1.25rem', fontFamily: 'Georgia, serif', color: '#1e293b', fontStyle: 'italic', margin: 0 }}>
                                "The void between ability and opportunity."
                            </p>
                            <p style={{ fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' }}>
                                The "Low Timer Gap" is the aviation industry's most perilous unspoken reality. It is the operational chasm that exists between graduating flight school with a Commercial Pilot License (~200 hours) and meeting the rigorous entry requirements of a major airline (often 1500 hours or significant Turbine experience).
                            </p>
                        </div>

                        {/* The Experience Void Section */}
                        <div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
                                The Experience Void
                            </h3>
                            <p style={{ marginBottom: '1.25rem' }}>
                                The Pilot Gap—often referred to as the Experience Void—is the massive developmental chasm you are standing in right now. It is the brutal, multi-year waiting period between holding a fresh 250-hour CPL and possessing the operational maturity that airlines actually demand.
                            </p>
                            <p style={{ marginBottom: '1.25rem' }}>
                                This gap affects everyone: from fresh <strong>students</strong> just starting their journey, to <strong>flight instructors</strong> trapped in the loop, and even <strong>airline pilots</strong> who are time-constrained and lack the resources to actively search for new opportunities.
                            </p>
                            <p>
                                You are trapped in an industry Catch-22: you need a job to gain commercial experience, but operators demand commercial experience before giving you a job. Because governing bodies and insurers rely on blunt metrics—like sheer time in the air—to measure safety, you are commercially unemployable for the right seat of a multi-million-dollar jet.
                            </p>
                        </div>

                        {/* Pilot Database Callout */}
                        <div style={{ padding: '2rem', backgroundColor: '#f0f9ff', borderRadius: '16px', border: '1px solid #bae6fd', margin: '1rem 0' }}>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0369a1', marginBottom: '0.75rem' }}>The Wingmentor Pilot Database</h4>
                            <p style={{ color: '#0c4a6e', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                We handle and maintain a comprehensive <strong>database of pilots</strong>. Your profile in our database is not just a resume; it is a quantified record recognized through our <strong>Pilot Recognition System</strong>, making you visible to our network of industry partners who are looking for standardized excellence.
                            </p>
                        </div>

                        {/* Hourglass Image with Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem 0' }}>
                            <div style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
                                <img src="/hourglass-pilot-gap.png" alt="Hourglass showing pilots filtering down" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', maxWidth: '480px', textAlign: 'center', margin: 0 }}>
                                <strong>The Industry Hourglass:</strong> The Pilot Gap acts as an unrelenting hourglass. Thousands of low-timers fall in at the top, but only the few who manage to navigate the void emerge out the bottom as the operationally-mature high-timers that airlines demand.
                            </p>
                        </div>

                        {/* The Regulatory Trap Section */}
                        <div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
                                The 1500-Hour Regulatory Trap
                            </h3>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Continuing the perspective from <strong>Airbus</strong>, this gap is not caused by a lack of fundamental flying capabilities. Instead, the dramatic shift in governing body requirements—most notably the newly stated <strong>1500-hour</strong> requirement for an ATPL—and the rigid views of airline insurance policies regarding low-timers have completely altered the industry. These stringent regulations inadvertently created the Pilot Gap.
                            </p>

                            {/* Highlighted Insight Callout */}
                            <div style={{ padding: '1.75rem', backgroundColor: '#fef3c7', borderRadius: '12px', borderLeft: '4px solid #f59e0b', marginBottom: '1.5rem' }}>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: '#92400e', fontWeight: 500 }}>
                                    <strong>The Vulnerability of Vagueness:</strong> Perhaps the most frustrating reality of the <strong>1500-hour</strong> rule is its sheer vagueness. Graduates with 200 hours are left entirely to their own devices to source the remaining 1300 hours, with a complete lack of any structured pathway. The regulations rarely specify the exact quality of hours needed—how many of those should be multi-engine, cross-country, or turbine?
                                </p>
                            </div>



                        </div>

                        {/* The Wingmentor Foundation Program Section */}
                        <div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
                                Unclogging the Pipeline
                            </h3>
                            <p style={{ marginBottom: '1.25rem' }}>
                                There is <strong>no such thing as "on-the-job training" for a commercial pilot</strong>—because the job <em>is</em> the training. You are expected to arrive ready. This is exactly where the <strong>Wingmentor Foundation Program</strong> steps in.
                            </p>
                            <p style={{ marginBottom: '1.25rem' }}>
                                We build the critical, viable "pre-experience" skills that airlines require. This program isn't just theory; it is industry-recognized and accredited, with affirmation from <strong>Airbus</strong> and other major manufacturers to actively advise on current industry pathways. Here at Wingmentor, we will strip away the ambiguity and explicitly show you the exact, targeted operational hours and frameworks you need to cross the gap efficiently.
                            </p>
                            <div style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', borderRadius: '12px', borderLeft: '4px solid #16a34a', marginBottom: '3rem' }}>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: '#166534', fontWeight: 500 }}>
                                    By establishing a formalized pilot recognition system and strategic networking, we are solving the pilot gap at its core. Our mission is to fundamentally unclog the pilot pipeline—meaning current flight instructors will no longer be trapped at flight schools for five years, but instead will be recognized through our system, moving on to airlines and freeing up space for new instructors to enter the industry.
                                </p>
                            </div>

                            {/* Operational Briefing: Program Framework (Cont.) */}
                            <div style={{ backgroundColor: '#f8fafc', padding: '2.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em', borderBottom: '3px solid #eab308', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                    Operational Briefing: Program Framework (Cont.)
                                </h2>
                                <p style={{ color: '#334155', fontSize: '16px', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    Building on our mission to bridge the Low Timer Gap, the Wingmentor Foundation Program is structured around core principles designed to foster genuine growth and verifiable expertise. We emphasize a proactive approach to career development, moving beyond passive hour-building to active skill refinement and strategic networking.
                                </p>

                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                                    Core Principles of Engagement
                                </h3>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                                    {[
                                        { title: 'Targeted Consultation', text: 'Focus on specific challenges identified in mentee debriefs.' },
                                        { title: 'Verifiable Progress', text: 'All mentorship interactions are meticulously logged and validated.' },
                                        { title: 'Skill Amplification', text: 'Transform theoretical knowledge into practical, command-ready experience.' },
                                        { title: 'Community & Ethics', text: 'Cultivate a supportive, professional, and compliant aviation network.' }
                                    ].map((item, idx) => (
                                        <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.6rem', flexShrink: 0 }} />
                                            <p style={{ margin: 0, fontSize: '16px', color: '#334155' }}>
                                                <strong>{item.title}:</strong> {item.text}
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                                <div style={{ paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem', textTransform: 'uppercase' }}>
                                        Mentor-Mentee Dynamics: A Synergistic Partnership
                                    </h3>
                                    <p style={{ color: '#334155', fontSize: '16px', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                                        The relationship between mentor and mentee is a cornerstone of our program. Mentors gain invaluable leadership and communication skills through structured guidance, while mentees receive precise, peer-level support to navigate their training. This creates a powerful feedback loop where both parties accelerate their development, ensuring mutual benefit and contributing to a stronger, more resilient aviation community.
                                    </p>
                                </div>
                            </div>

                            {/* Our Approach to Bridging the Gap */}
                            <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Our Approach to Bridging the Gap
                                </h3>
                                <p style={{ color: '#334155', fontSize: '16px', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Within the Wingmentor Foundation Program, you will experience real aviation industry expectations. We transform your thinking from a fresh graduate to a seasoned pilot, instilling real pilot ethics, mentor standards, and the foundational information to assess any situation.
                                </p>
                                <p style={{ color: '#334155', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
                                    We guide you to be aware of aviation investments regarding your status as a pilot. We provide hands-on experience and one-to-one consultation, getting you ready for your next interview so you can say, "I've helped X amount of pilots with their IR, PPL, etc.," backed by documented and verified practical Crew Resource Management and mentor skills.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem' }}>
                        <button onClick={handlePrev} style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            ← Back
                        </button>
                        <button
                            onClick={handleNext}
                            style={{ background: '#0284c7', color: 'white', fontWeight: 600, fontSize: '14px', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#0369a1')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#0284c7')}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            );
        }

        // ── Page 3: The Pilot Paradox & Shortage ─────────────────────────────
        if (currentTopic === 'what-pilot-shortage') {
            return (
                <div style={{ maxWidth: '48rem', margin: '0 auto', paddingTop: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', animation: 'fadeIn 0.4s ease-in-out' }}>
                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                        Chapter 01 — Understanding the What&#39;s
                    </div>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, color: '#0f172a', marginBottom: '3rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                        The Pilot Paradox & Shortage
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#475569', fontSize: '17px', lineHeight: 1.75, marginBottom: '4rem' }}>
                        <p>
                            Before you enrolled in flight school, the media aggressively sold you on a &#34;Global Pilot Shortage.&#34; You were led to believe that the moment the ink dried on your license, recruiters would be fighting to place you in a jet. You did your part, but your phone isn&#39;t ringing.
                        </p>
                        <p>
                            The shortage is real, but the narrative you were sold is an illusion. There is absolutely no shortage of 250-hour commercial license holders. Operators are starving for crew, but they are desperate for qualified, operationally mature pilots—Captains and seasoned First Officers who can manage complex, unscripted scenarios.
                        </p>
                        <p>
                            Airlines simply cannot absorb the financial and operational risk of placing un-standardized graduates into those empty seats. The jobs exist, and the demand is historic, but until you can prove your multi-crew proficiency and Non-Technical Skills (NOTECHS), that global shortage does not apply to you.
                        </p>

                        <div style={{ padding: '1.75rem', backgroundColor: '#fff7ed', borderRadius: '12px', borderLeft: '4px solid #f97316', margin: '1rem 0' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#9a3412', fontWeight: 600 }}>
                                <strong>The Operational Bottleneck:</strong> This misalignment inadvertently fuels the <strong>Instructor Loop</strong> and the <strong>Pilot Dream Paradox</strong>. Because airlines aren't hiring from the bottom, veteran instructors stay trapped at flight schools for years, inadvertently clogging the pipeline for the next generation of pilots who are sitting at home, waiting for their chance to even begin instructing.
                            </p>
                        </div>

                        <p>
                            At <strong>Wingmentor</strong>, we are dedicated to <strong>unclogging these pipes</strong>. Our mission is to provide the standardization and recognition required to move these veteran instructors into airline flight decks where they belong. By facilitating this transition, we free up critical instructor positions, allowing the new generation to enter the industry and start their journey, rather than being stalled at the starting line.
                        </p>

                        <div style={{ height: '1px', background: '#e2e8f0', margin: '1rem 0' }} />

                        <p>
                            This misalignment creates what we call the <strong>Instructor Loop</strong>. Current instructors will blindly point you toward their own path: the "traditional" instructor route. But many of those same instructors are now realizing they are trapped, facing upwards of five years instructing before airlines even glance at their CVs. In reality, some argue the flight instructor route has structurally become akin to a <strong>ponzi scheme</strong>—constantly promising returns to new investors (low-timers needing hours) funded by the time and money of older investors who also had the exact same dream of reaching the airlines. This is no longer a viable modern pathway.
                        </p>

                        {/* Instructor Trap Image with Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem 0' }}>
                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc' }}>
                                <img src="/instructor-trap-pilot-gap.jpg" alt="Cartoon showing the flight instructor trap" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', maxWidth: '500px', textAlign: 'center', margin: 0 }}>
                                <strong>The Instructor Loop:</strong> Pilots have virtually no choice but to route straight back to their flight schools as instructors, creating massive bottlenecks.
                            </p>
                        </div>

                        {/* Pilot Dream Paradox Image with Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem 0' }}>
                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc' }}>
                                <img src="/dream-paradox-pilot-gap.png" alt="Comic showing the pilot dream paradox" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', maxWidth: '500px', textAlign: 'center', margin: 0 }}>
                                <strong>The Pilot Dream Paradox:</strong> The system relies on older instructors selling the identical dream they once had to incoming students—perpetuating a cycle where wait times for airline roles continually extend.
                            </p>
                        </div>
                    </div>
                    <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem' }}>
                        <button onClick={handlePrev} style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            ← Back
                        </button>
                        <button
                            onClick={handleNext}
                            style={{ background: '#0284c7', color: 'white', fontWeight: 600, fontSize: '14px', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#0369a1')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#0284c7')}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            );
        }

        // ── Page 4: What is Pilot Recognition? ──────────────────────────────
        if (currentTopic === 'what-pilot-recognition') {
            return (
                <div style={{ maxWidth: '48rem', margin: '0 auto', paddingTop: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', animation: 'fadeIn 0.4s ease-in-out' }}>
                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                        Chapter 01 — Understanding the What's
                    </div>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 400, color: '#0f172a', marginBottom: '3rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                        What is Pilot Recognition?
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#475569', fontSize: '17px', lineHeight: 1.75, marginBottom: '4rem' }}>
                        <p>
                            Pilot Recognition is the missing link in the modern aviation hiring pipeline. When an airline recruiter looks at a massive stack of low-timer resumes, they see identical candidates: same hours, same licenses, same lack of real-world multi-crew operational experience.
                        </p>

                        <div style={{ padding: '1.5rem', backgroundColor: '#eff6ff', borderRadius: '12px', borderLeft: '4px solid #3b82f6', margin: '1rem 0' }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#1e3a8a', fontWeight: 500 }}>
                                <strong>The Definition:</strong> Pilot Recognition is fundamentally about proving standardized multi-crew proficiency and advanced behavioral competencies (NOTECHS) in a way that is immediately verifiable and trusted by airlines, bypassing the experience void.
                            </p>
                        </div>

                        <p>
                            Without industry recognition, you are merely a pilot with a license. With recognition—like the standards upheld and verified by the Wingmentor Foundation Program—you transform from a high-risk unknown into a quantified, standardized asset ready for type rating induction and airline line training.
                        </p>
                    </div>


                    {/* The Recruiter's Dilemma Section */}
                    <div style={{ marginTop: '1rem', marginBottom: '2rem', color: '#475569', fontSize: '17px', lineHeight: 1.75 }}>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
                            The Recruiter's Dilemma & Outsourcing
                        </h4>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Look at this from the airline's perspective: every year, thousands of newly-minted low-timer pilots graduate globally and immediately begin sending their 200-hour resumes blindly to every carrier they can find. The sheer volume of applications creates an insurmountable administrative wall for internal HR departments.
                        </p>
                        <p style={{ marginBottom: '2rem' }}>
                            Airlines simply do not have the manpower to sift through thousands of identical 200-hour resumes to find the diamond in the rough. Because of this overwhelming influx, the vast majority of airlines completely ignore direct applications and instead fully outsource their low-timer recruitment to specialized airline staffing and recruitment companies to act as aggressive filters. If you aren't going through these specific agencies, your resume is likely going straight into the bin.
                        </p>

                        {/* Recruiter Image with Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '1rem 0 2rem 0' }}>
                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc' }}>
                                <img src="/recruiter-overwhelm-pilot-gap.png" alt="Cartoon showing an overwhelmed airline recruiter" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', fontStyle: 'italic', maxWidth: '550px', textAlign: 'center', margin: 0 }}>
                                <strong>The Outsourcing Filter:</strong> The insurmountable stack of identical resumes is exactly why airlines rely entirely on third-party recruitment agencies to do the filtering for them.
                            </p>
                        </div>

                        <div style={{ padding: '1.25rem', backgroundColor: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', marginBottom: '2rem' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#2563eb', fontWeight: 500, textAlign: 'center' }}>
                                ℹ️ <em>You will learn more about the Pilot Recognition System and ATLAS CV Format throughout the program.</em>
                            </p>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
                                Beyond the "Blind Submit"
                            </h4>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Majority of pilots send resumes blindly to airlines or upload them to sites like <em>pilotcenter.com</em>. While you may technically meet the basic requirements, the "Next Step"—the follow-up response—is where most careers stall.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                Wingmentor provides a <strong>direct network</strong> of pilots who already know the specific expectations of major carriers like <strong>Etihad</strong>, <strong>Air Asia</strong>, or <strong>Eurowings</strong>, as well as the private sector, including <strong>private jets</strong>. We give you the opportunity to choose a pathway and familiarize yourself with the industry before you even step into the interview room.
                            </p>

                            <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
                                <h5 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Direct Industry Connections
                                </h5>
                                <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                    Wingmentor maintains direct, active contact with the decision-makers shaping the future of flight:
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0f172a', fontWeight: 500 }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                                        Etihad Cadet Program
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0f172a', fontWeight: 500 }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                                        Head of Training at Airbus
                                    </li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0f172a', fontWeight: 500 }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                                        Head of Infrastructure at Archer (Pioneering Pilot Air Taxis)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem' }}>
                        <button onClick={handlePrev} style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            ← Back
                        </button>
                        <button
                            onClick={handleNext}
                            style={{ background: '#0284c7', color: 'white', fontWeight: 600, fontSize: '14px', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#0369a1')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#0284c7')}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            );
        }

        // ── Welcome Aboard Page ──────────────────────────────────────────────
        if (currentTopic === 'welcome') {
            return (
                <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease-in-out' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
                        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                            <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '280px', height: 'auto', objectFit: 'contain' }} />
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            Welcome Aboard
                        </h1>
                        <div style={{ width: '80px', height: '4px', backgroundColor: '#eab308', margin: '0 auto' }}></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <section>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Welcome to the Wingmentor Foundation Program
                            </h2>
                            <p style={{ color: '#334155', fontSize: '18px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                You have taken a decisive step towards bridging the critical gap between licensure and a professional career. This program is engineered to provide you with the structure, support, and verifiable experience necessary to navigate the complexities of the aviation industry. Your journey towards command starts now.
                            </p>
                        </section>

                        <section style={{ backgroundColor: '#f8fafc', padding: '2.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                A Message From the Wingmentor Team
                            </h2>
                            <p style={{ color: '#334155', fontSize: '17px', lineHeight: 1.8, margin: 0 }}>
                                The entire Wingmentor operational team is here to support you. We are a collective of active pilots, instructors, and industry professionals dedicated to your success. We manage the logistics, verify the experience, and ensure the standards of this program are upheld with unwavering integrity. Consider us your ground crew, ready to ensure your flight path is clear and your objectives are met.
                            </p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                A Welcome From the Founders
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <p style={{ color: '#334155', fontSize: '17px', lineHeight: 1.8, margin: 0 }}>
                                    On behalf of the entire Wingmentor team, we extend our warmest welcome. You have officially joined a dedicated Pilot Recognition Program committed to excellence, mutual support, and overcoming one of the industry's greatest challenges.
                                </p>
                                <p style={{ color: '#334155', fontSize: '17px', lineHeight: 1.8, margin: 0 }}>
                                    You are now more than a pilot; you are a vital contributor to a movement that is reshaping the future of aviation careers. We operate with professionalism, integrity, and a relentless focus on our collective success. This handbook is your guide. Welcome aboard.
                                </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <div style={{ fontWeight: 700, color: '#334155', letterSpacing: '0.05em', fontSize: '0.9rem' }}>BENJAMIN TIGER BOWLER</div>
                                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem' }}>FOUNDER</div>
                                </div>
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <div style={{ fontWeight: 700, color: '#334155', letterSpacing: '0.05em', fontSize: '0.9rem' }}>KARL VOGT</div>
                                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem' }}>FOUNDER</div>
                                </div>
                            </div>
                        </section>

                        <div style={{ padding: '3rem', backgroundColor: '#eff6ff', borderRadius: '24px', borderLeft: '6px solid #2563eb', marginTop: '2rem', boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)' }}>
                            <p style={{ color: '#1e3a8a', fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.7, margin: 0, textAlign: 'center', fontWeight: 500 }}>
                                "We couldn't stand by and watch qualified pilots give up. The gap in the industry isn't a lack of talent; it's a lack of opportunity. Wingmentor is our answer to the 'experience paradox'—providing a structured environment where pilots can prove their worth and keep their dreams alive."
                            </p>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '6rem' }}>
                            <button
                                onClick={handleNext}
                                style={{
                                    background: '#2563eb',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    padding: '1.25rem 3rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(37, 99, 235, 0.4)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
                                }}
                            >
                                Continue to Briefing <Icons.ArrowRight style={{ width: 20, height: 20 }} />
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        switch (currentChapter) {


            case 0:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', animation: 'fadeIn 0.5s ease-in-out' }}>
                        {/* Hub-Style Header */}
                        <div style={{ textAlign: 'center', paddingBottom: '2.5rem', borderBottom: '1px solid #e2e8f0', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', paddingTop: '3rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>MODULE 01</div>
                            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0' }}>Industry Familiarization & Indoctrination</h1>

                            <div style={{ maxWidth: '44rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
                                {/* Mission & Symbiotic Airframe */}
                                <div style={{ marginTop: '1.5rem' }}>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.02em', borderBottom: '3px solid #eab308', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                            The Mission
                                        </h2>
                                        <div style={{ marginTop: '1rem' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                                                Bridging the Gap
                                            </h3>
                                            <p style={{ color: '#334155', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
                                                The Wingmentor Foundation Program is an operational framework engineered to address a critical system failure in the aviation career pipeline: The Low Timer Gap. Our mission is to provide newly licensed commercial pilots with a structured, verifiable pathway to build the essential experience, command authority, and professional acumen required by the industry.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                                            The Symbiotic Airframe: Mentor & Mentee
                                        </h3>
                                        <p style={{ color: '#334155', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
                                            This program operates on a symbiotic principle. Mentees receive precise, surgical guidance from experienced peers to overcome specific training hurdles. Concurrently, Mentors engage in a structured system that transforms their support into verifiable, logged experience—a powerful asset that demonstrates leadership, problem-solving, and Crew Resource Management (CRM) skills, creating a distinct advantage in a saturated job market.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Core Briefing Segments List */}
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.08)', border: '1px solid rgba(255, 255, 255, 0.5)' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#0f172a', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                                Core Briefing Segments
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setCurrentChapter(1)}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)' }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>The "What"</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>Discover the reality of the "Experience Void" and exactly what operators view as a 250-hour logbook insurance risk.</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.6)', marginLeft: '1.875rem' }}></div>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setCurrentChapter(2)}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)' }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>The "Why"</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>Analyze the harsh industry metrics behind the hiring gap, and understand why 92% of low-timers face career stagnation.</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.6)', marginLeft: '1.875rem' }}></div>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setCurrentChapter(3)}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)' }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>The "How"</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>Master our Evidence-Based Training (EBTA) framework to actively build advanced CRM capabilities that recruiters demand.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={handleNext}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#0284c7',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'background 0.2s',
                                        boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.2)'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0369a1'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0284c7'; }}
                                >
                                    Continue to Chapter 1 <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>

                        {/* ── Page Header ── */}
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '180px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                                CHAPTER 01
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, color: '#0f172a', fontFamily: 'Georgia, serif', margin: '0 auto 2rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                                Understanding the What&#39;s
                            </h2>
                            {/* Divider below title */}
                            <div style={{ height: '1px', width: '100%', background: '#e2e8f0', maxWidth: '56rem', margin: '0 auto' }} />
                        </div>

                        {/* ── Mentor's Hook — centered intro block ── */}
                        <div style={{ maxWidth: '44rem', margin: '0 auto', marginBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a', fontFamily: 'Georgia, serif', marginBottom: '1rem', marginTop: '2.5rem' }}>
                                What's life like after graduation &amp; Commercial license Release?
                            </h3>
                            <p style={{ color: '#1e293b', fontSize: '19px', lineHeight: 1.8, fontFamily: 'Georgia, serif', marginBottom: '1.5rem' }}>
                                You&#39;ve passed your checkride. Whether you spent four grueling years earning a Bachelor&#39;s Degree in Commercial Aviation or sprinted through an intensive Fast-Track academy, the celebrations are over. So, what does life after graduation actually look like? When you emerge from flight school with a freshly printed license, you are stepping out of a highly controlled simulator bubble and into the vast wilderness of the commercial aviation industry.
                            </p>
                            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                The media aggressively advertises a global &#34;Pilot Shortage,&#34; leading graduates from all educational backgrounds to believe jobs are waiting the moment they finish. As your mentors, we have to tell you the truth: the reality is vastly different. Operators are extremely hesitant to hand the keys of a multi-million dollar aircraft to a pilot with 250 hours.
                            </p>
                            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                                Regardless of your path, the industry views you the same: you are broadly labeled a &#34;Low-Timer&#34;. You have stepped into the &#34;Experience Void&#34;—the massive, unspoken chasm between holding a legal 250-hour Commercial Pilot License (CPL) and possessing the advanced, multi-crew maturity that airlines actually demand. In this chapter, we define the three core realities of your current situation:
                            </p>
                        </div>

                        {/* ── Core Topics List — matching Intro & Overview ── */}
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.08)', border: '1px solid rgba(255, 255, 255, 0.5)', maxWidth: '56rem', margin: '0 auto', marginBottom: '4rem', width: '100%', boxSizing: 'border-box' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#0f172a', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                                Core Topics
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => { setCurrentTopic('what-low-timer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)' }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>Identity: The "Low-Timer"</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>Why your hard-earned license is currently viewed by insurers as a liability, not an asset.</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.6)', marginLeft: '1.875rem' }}></div>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => { setCurrentTopic('what-pilot-gap'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)' }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>The Gap: The Pilot Gap</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>The brutal developmental chasm between your 250 hours and the airline flight deck.</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.6)', marginLeft: '1.875rem' }}></div>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => { setCurrentTopic('what-pilot-shortage'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)' }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>The Illusion: The Shortage Illusion</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>Why operators are starving for crew, yet still refusing to hire entry-level graduates.</p>
                                    </div>
                                </div>
                            </div>


                            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => { setCurrentTopic('what-low-timer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#0284c7',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'background 0.2s',
                                        boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.2)'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0369a1'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0284c7'; }}
                                >
                                    Continue to Identity <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                                </button>
                            </div>
                        </div>

                        {/* ── Bottom Divider ── */}
                        <div style={{ height: '1px', maxWidth: '56rem', width: '100%', margin: '0 auto', marginBottom: '4rem', background: '#e2e8f0' }} />
                    </div>
                );

            case 2:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '180px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                                CHAPTER 02
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, color: '#0f172a', fontFamily: 'Georgia, serif', margin: '0 auto 2rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                                The "Why"
                            </h2>
                            <div style={{ height: '1px', width: '100%', background: '#e2e8f0', maxWidth: '56rem', margin: '0 auto' }} />
                        </div>

                        <div style={{ maxWidth: '48rem', margin: '0 auto', marginBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#475569', fontSize: '1.05rem', lineHeight: 1.8 }}>
                            <p style={{ color: '#1e293b', fontSize: '19px', fontFamily: 'Georgia, serif', margin: '2rem 0 0 0' }}>
                                When you emerge from flight school with a freshly printed license, you're stepping out of a highly controlled simulator bubble and into the vast wilderness of the commercial aviation industry. You quickly realize that the industry is facing a massive disconnect: operators across all sectors—from regional airlines to corporate jet charters and cargo haulers—are desperately short on crew, yet they are extremely hesitant to hand the keys of a multi-million dollar aircraft to a pilot with 250 hours.
                            </p>
                            <p>
                                Why does this paradox exist? Because the structured, repetitive environment of a flight school naturally breeds a very specific type of <strong>Behaviorism</strong>. You learned to fly by rote. You memorized maneuvers for a checkride, learned to navigate controlled airspace under the watchful eye of an instructor, and reacted to standard emergencies with rehearsed, step-by-step <strong>Cognitive Thinking</strong>.
                            </p>
                            <p>
                                But the commercial industry does not operate on rote memorization. It requires complex dynamic problem solving. Flight schools teach you how to pass a test; the industry demands that you know how to survive, standardise, and lead in an unpredictable operational environment. This foundational program exists to bridge that massive psychological and operational chasm. It’s designed to answer the "Why": Why aren't you getting hired instantly, and why is your current level of experience insufficient for the harsh realities of the industry?
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem', marginBottom: '2rem' }}>
                                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>The Insurance Block</h3>
                                    <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>Insurance providers view the rote-learned 250-hour pilot as a catastrophic risk. Without a proven record of complex, dynamic decision-making, it is financially unviable for any operator across the industry to place you in a complex aircraft.</p>
                                </div>
                                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #eab308' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>The Operational Wall</h3>
                                    <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>Operators don't just want stick-and-rudder skills; they require advanced Crew Resource Management (CRM), standardized behaviors, and the maturity of <strong>Constructivism</strong>—the ability to adapt and learn from new, unscripted scenarios instantly.</p>
                                </div>
                            </div>
                        </div>

                        {/* ── Core Topics List — matching Intro & Overview ── */}
                        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.08)', border: '1px solid rgba(255, 255, 255, 0.5)', maxWidth: '56rem', margin: '0 auto', marginBottom: '4rem', width: '100%', boxSizing: 'border-box' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#0f172a', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                                Core Topics
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => { setCurrentTopic('why-statistics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)' }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>The Statistics: The Statistical Reality</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>Analyze the harsh industry metrics behind the hiring gap and understand why 92% of low-timers face career stagnation.</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.6)', marginLeft: '1.875rem' }}></div>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => { setCurrentTopic('why-trap'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '0.5rem', flexShrink: 0, boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)' }}></div>
                                    <div>
                                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>The Shortcut: The Easy Way Out Trap</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>Why the "shiny type rating" trap exacerbates your financial downfall instead of securing your career.</p>
                                    </div>
                                </div>
                            </div>


                            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => { setCurrentTopic('why-statistics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#0284c7',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'background 0.2s',
                                        boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.2)'
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0369a1'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0284c7'; }}
                                >
                                    Continue to The Statistics <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                                </button>
                            </div>
                        </div>

                        <div style={{ height: '1px', maxWidth: '56rem', width: '100%', margin: '0 auto', marginBottom: '4rem', background: '#e2e8f0' }} />
                    </div>
                );
            case 3:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', animation: 'fadeIn 0.5s ease-in-out' }}>
                        {/* Chapter 4: The What */}
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
                                        The "What": What am I going to do now? What am I going to face?
                                    </h2>
                                </div>
                            </div>
                            <div style={{ color: '#475569', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <p>
                                    The most agonizing question you must ask yourself is: <i>What am I going to do now? What am I actually going to face?</i> Here is the unspoken truth: you are not the only one who knows the reality of the <strong>Industry Gap</strong>. Deep down, the instructors who taught you know it. The head of your flight college knows it. But they are bound by a different directive: keeping the aviation pipeline flowing. Most pilots rely entirely on their flight school, totally trusting the process they laid out. For a school to admit that their CPL doesn't actually make you airline-ready would be like telling a child that Santa Claus isn't real. So, they keep you dreaming your goal. To be fair, if flight schools laid out the brutal truth of these requirements on day one, many aspiring aviators would have never taken the leap, and these schools would go out of business. Ultimately, the fault doesn't lie maliciously with the schools; it lies with the rigid, outdated regulations that created this chasm.
                                </p>
                                <p>
                                    So, what now? You are what the industry universally labels a <strong>"Low-Timer,"</strong> a term carrying a heavy stigma. It means you have the legal right to fly, but you lack the "operational miles" to be trusted. While in flight school, the environment dictated your schedule; every scenario was predictable. Now you are faced with a developmental void. The harsh reality for most graduates is sitting at home, holding a fresh license, and desperately waiting for an interview with their own flight school to become an instructor—because everyone knows that is their "best bet" for a job.
                                </p>
                                <p>
                                    You are going to face the harsh reality that your previous <strong>Constructivism</strong>—how you built your knowledge base—was flawed. You built knowledge based on passing tests, not on practical, commercial survival. You will realize that the gap isn't just about a lack of flight hours; it is about the immaturity of your non-technical skills (NOTECHS).
                                </p>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '-0.5rem' }}>The Wingmentor Approach</h3>
                                <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #64748b' }}>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155' }}>
                                        <strong>Real Talk:</strong> Most pilots think the hard part is over once the CPL is printed. In reality, the true test is the "Experience Void." You can sit at home hoping for an instructor slot to open up, or you can take decisive action. This is exactly where Wingmentor steps in—to actively break the cycle of waiting and forge you into a standardized, ready-to-hire commercial asset.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                );

            case 4:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', animation: 'fadeIn 0.5s ease-in-out' }}>
                        {/* Chapter 5: The How */}
                        <section>
                            <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                                <div style={{ paddingTop: '0.6rem' }}>
                                    <div style={{ width: '6px', height: '6px', backgroundColor: '#0f172a', borderRadius: '50%' }}></div>
                                </div>
                                <div>
                                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                        Chapter 05
                                    </div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 400, color: '#0f172a', fontFamily: 'Georgia, serif', margin: 0, lineHeight: 1.2 }}>
                                        The "How": How are you going to take part?
                                    </h2>
                                </div>
                            </div>
                            <div style={{ color: '#475569', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <p>
                                    We bridge this intimidating gap not by tossing you into the deep end, but through the new global industry standard: structured, psychologically-driven <strong>Evidence-Based Training and Assessment (EBTA)</strong>. It is no longer about <i>how long</i> you've flown, but <i>how well</i> you handle specific behavioural cores under operational stress.
                                </p>
                                <p>
                                    You will take part through rigorous peer-mentorship, deep scenario-based evaluations, and guided indoctrination into professional workflows aimed directly at mitigating that perceived risk. We dissect the pilot into three core psychological pillars. We reconstruct your <strong>Behaviorism</strong> so that adhering to SOPs becomes an ingrained reflex rather than an active choice. We elevate your <strong>Cognitive Thinking</strong> so you learn to anticipate industry-wide multi-crew dynamics, manage immense workloads, and make critical, split-second safety decisions.
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
                    </div>
                );

            case 5:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', animation: 'fadeIn 0.5s ease-in-out' }}>
                        {/* Chapter 6: The Result */}
                        <section>
                            <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                                <div style={{ paddingTop: '0.6rem' }}>
                                    <div style={{ width: '6px', height: '6px', backgroundColor: '#0f172a', borderRadius: '50%' }}></div>
                                </div>
                                <div>
                                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                        Chapter 06
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
                                        "We don't just teach you to fly a plane; we prepare you to lead a career across the entire industry. This is the foundation of turning flight hours into true operational knowledge."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                );

            case 6:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', animation: 'fadeIn 0.5s ease-in-out' }}>
                        {/* Final Activities */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* ROI Calculator */}
                            <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'relative', zIndex: 10 }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', margin: 0 }}>Type Rating ROI</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                        Analyze the financial impact of self-funded type ratings versus structured cadet pathways.
                                    </p>
                                    <button
                                        onClick={() => setShowCalculator(!showCalculator)}
                                        style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', fontWeight: 700, padding: '0.75rem', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
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
                                                    type="range" min="15000" max="45000" step="1000"
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

                            {/* Gap Theory Quiz */}
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
                                    <p style={{ fontSize: '0.875rem', color: '#475569', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.5 }}>"What is the single highest cause of checklist non-compliance during line operations?"</p>
                                    <button style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                                        Start Quiz <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', position: 'relative' }}
            onContextMenu={handleContentContextMenu}
            onBlur={(e) => {
                const blurred = e.target as HTMLElement;
                if (blurred.contentEditable === 'true') commitEdit(blurred);
            }}
        >
            {/* ── Right-click context menu ── */}
            {contextMenu && (
                <div
                    ref={contextMenuRef}
                    style={{
                        position: 'fixed',
                        top: contextMenu.y,
                        left: contextMenu.x,
                        zIndex: 9999,
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        boxShadow: '0 10px 30px -5px rgba(15,23,42,0.15), 0 4px 10px -3px rgba(15,23,42,0.08)',
                        overflow: 'hidden',
                        minWidth: '160px',
                        animation: 'fadeIn 0.12s ease-out',
                    }}
                >
                    <button
                        onClick={startEdit}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            width: '100%',
                            padding: '0.625rem 1rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#1e293b',
                            textAlign: 'left',
                            transition: 'background 0.15s',
                        }}
                        onMouseOver={e => (e.currentTarget.style.background = '#eff6ff')}
                        onMouseOut={e => (e.currentTarget.style.background = 'none')}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit Text
                    </button>
                    <div style={{ height: '1px', background: '#f1f5f9', margin: '0 0.5rem' }} />
                    <button
                        onClick={closeContextMenu}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            width: '100%',
                            padding: '0.625rem 1rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: '#64748b',
                            textAlign: 'left',
                            transition: 'background 0.15s',
                        }}
                        onMouseOver={e => (e.currentTarget.style.background = '#f8fafc')}
                        onMouseOut={e => (e.currentTarget.style.background = 'none')}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Cancel
                    </button>
                </div>
            )}

            {/* ── Editing active tooltip ── */}
            {editingEl && (
                <div style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#1e293b',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                    animation: 'fadeIn 0.2s ease-out',
                    pointerEvents: 'none',
                }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                    Editing — click away or press <kbd style={{ background: '#334155', padding: '0.1rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace' }}>Esc</kbd> to finish
                </div>
            )}
            {/* Minimal Header */}
            <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src="/logo.png" alt="WingMentor Logo" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Required Reading</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Module 01: Industry Familiarization & Indoctrination</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '2px' }}>
                            {currentChapter === 0 ? 'Overview' : `Chapter ${String(currentChapter).padStart(2, '0')}`}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '200px', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#2563eb', transition: 'width 0.3s ease-out' }}></div>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>{Math.round(progress)}% Complete</span>
                </div>
            </header>

            {/* Main Layout wrapper for sidebar and content */}
            <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
                {/* Module Viewer Sidebar */}
                <aside style={{ width: '320px', flexShrink: 0, backgroundColor: 'white', borderRight: '1px solid #e2e8f0', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '104px', height: 'calc(100vh - 104px)', overflowY: 'auto' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Module Viewer</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {([
                            { title: 'Welcome Aboard', id: 0, topics: [{ label: 'Welcome Aboard', slug: 'welcome' }] },
                            { title: 'Introduction & Overview', id: 0 },
                            {
                                title: 'The "What"', id: 1,
                                topics: [
                                    { label: 'What is a Low-Timer Pilot?', slug: 'what-low-timer' },
                                    { label: 'What is a Type Rating?', slug: 'what-type-rating' },
                                    { label: 'What is the Pilot Gap?', slug: 'what-pilot-gap' },
                                    { label: 'The Pilot Paradox & Shortage', slug: 'what-pilot-shortage' },
                                    { label: 'What is Pilot Recognition?', slug: 'what-pilot-recognition' },
                                ],
                            },
                            {
                                title: 'The "Why"', id: 2,
                                topics: [
                                    { label: 'The Statistical Reality', slug: 'why-statistics' },
                                    { label: 'The Easy Way Out Trap', slug: 'why-trap' },
                                ]
                            },
                            { title: 'The Expected Standard', id: 4 },
                            { title: 'The "How"', id: 5 },
                            { title: 'The Result Factor', id: 6 },
                        ] as Array<{ title: string; id: number; topics?: Array<{ label: string; slug: string }> }>)
                            .map((item, index) => {
                                const isChapterActive = currentChapter === item.id && !currentTopic;
                                const hasTopics = item.topics && item.topics.length > 0;
                                const isParentOfActiveTopic = currentChapter === item.id && hasTopics && !!currentTopic;
                                const isHighlighted = isChapterActive || isParentOfActiveTopic;

                                return (
                                    <li key={index}>
                                        {/* Chapter / section button */}
                                        <button
                                            onClick={() => {
                                                setCurrentChapter(item.id);
                                                setCurrentTopic(null);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            style={{
                                                display: 'block', width: '100%', textAlign: 'left',
                                                padding: '0.75rem 1rem', borderRadius: '8px',
                                                backgroundColor: isHighlighted ? '#eff6ff' : 'transparent',
                                                color: isHighlighted ? '#2563eb' : '#475569',
                                                fontWeight: isHighlighted ? 600 : 500,
                                                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                                borderLeft: isHighlighted ? '3px solid #2563eb' : '3px solid transparent',
                                                fontSize: '0.9rem',
                                            }}
                                            onMouseOver={e => { if (!isHighlighted) e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                                            onMouseOut={e => { if (!isHighlighted) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                        >
                                            {item.title}
                                        </button>

                                        {/* Sub-topics — shown when this chapter is active and has topics */}
                                        {hasTopics && currentChapter === item.id && (
                                            <ul style={{ listStyle: 'none', padding: '0.25rem 0 0.25rem 1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                                                {item.topics!.map(topic => {
                                                    const isTopicActive = currentTopic === topic.slug;
                                                    return (
                                                        <li key={topic.slug}>
                                                            <button
                                                                onClick={() => { setCurrentTopic(topic.slug); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                                style={{
                                                                    display: 'block', width: '100%', textAlign: 'left',
                                                                    padding: '0.5rem 0.75rem', borderRadius: '6px',
                                                                    backgroundColor: isTopicActive ? '#dbeafe' : 'transparent',
                                                                    color: isTopicActive ? '#1d4ed8' : '#64748b',
                                                                    fontWeight: isTopicActive ? 600 : 400,
                                                                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                                                                    fontSize: '0.8125rem',
                                                                    borderLeft: isTopicActive ? '2px solid #1d4ed8' : '2px solid transparent',
                                                                }}
                                                                onMouseOver={e => { if (!isTopicActive) e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                                                                onMouseOut={e => { if (!isTopicActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                                            >
                                                                {topic.label}
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </aside>


                <main style={{ flex: 1, padding: '4rem 2rem', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
                        {renderChapterContent()}

                        {/* Pagination Controls */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                            <button
                                onClick={handlePrev}
                                disabled={currentChapter === 0}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: currentChapter === 0 ? '#f1f5f9' : 'white',
                                    color: currentChapter === 0 ? '#94a3b8' : '#0f172a',
                                    border: `1px solid ${currentChapter === 0 ? '#e2e8f0' : '#cbd5e1'}`,
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    cursor: currentChapter === 0 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Icons.ArrowLeft style={{ width: 16, height: 16 }} /> Previous
                            </button>
                            <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>
                                Page {currentChapter + 1} of {totalChapters}
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={currentChapter === totalChapters - 1}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: currentChapter === totalChapters - 1 ? '#f1f5f9' : '#2563eb',
                                    color: currentChapter === totalChapters - 1 ? '#94a3b8' : 'white',
                                    border: currentChapter === totalChapters - 1 ? '1px solid #e2e8f0' : 'none',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    cursor: currentChapter === totalChapters - 1 ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s',
                                    boxShadow: currentChapter === totalChapters - 1 ? 'none' : '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
                                }}
                            >
                                Next <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Bottom Advocacy Banner */}
            < div style={{ backgroundColor: '#0f172a', color: 'white', padding: '4rem 2rem', textAlign: 'center' }}>
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
            </div >
        </div >
    );
};

export default PilotGapModulePage;
