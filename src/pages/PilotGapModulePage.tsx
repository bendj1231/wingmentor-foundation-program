import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icons } from '../App';

interface PilotGapModulePageProps {
    onBack: () => void;
}

const PilotGapModulePage: React.FC<PilotGapModulePageProps> = ({ onBack }) => {
    const [showCalculator, setShowCalculator] = useState(false);
    const [investment, setInvestment] = useState(30000);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentTopic, setCurrentTopic] = useState<string | null>('welcome');

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
        const el = contextMenu.target as HTMLElement;
        // eslint-disable-next-line react-hooks/immutability
        el.contentEditable = 'true';
        // eslint-disable-next-line react-hooks/immutability
        el.style.outline = '2px solid #2563eb';
        // eslint-disable-next-line react-hooks/immutability
        el.style.borderRadius = '4px';
        // eslint-disable-next-line react-hooks/immutability
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
        { chapter: 1, topic: 'what-pilot-shortage' },
        { chapter: 1, topic: 'what-pilot-gap' },
        { chapter: 1, topic: 'what-type-rating' },
        { chapter: 1, topic: 'what-pilot-recognition' },
        { chapter: 1, topic: 'type-rating-psychology' },
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
        }
    };

    const handlePrev = () => {
        const currentIndex = getCurrentStepIndex();
        if (currentIndex > 0) {
            const prevStep = navigationFlow[currentIndex - 1];
            setCurrentChapter(prevStep.chapter);
            setCurrentTopic(prevStep.topic);
        }
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't navigate if user is currently editing content
            if (editingEl) return;

            if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev, editingEl]);

    // Global scroll-to-top on navigation change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentChapter, currentTopic]);

    const renderChapterContent = () => {
        // ── Page 1: What is a Low-Timer Pilot? ──────────────────────────────
        if (currentTopic === 'what-low-timer') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                    {/* ── Page Header ── */}
                    <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                        <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '320px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            CHAPTER 01 — UNDERSTANDING THE WHAT'S
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            What is a Low-Timer Pilot?
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto', fontWeight: 400 }}>
                            Upon earning your commercial license, you find yourself pushed into a new classification. Here, we define the identity of the 'Low-Timer' pilot. You will learn about the industry hourglass, the competitive landscape of recruitment, and how this label dictates your options.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>

                        {/* Hourglass Analysis Section */}
                        <section style={{ textAlign: 'center', maxWidth: '56rem', marginTop: '1rem' }}>
                            {/* Improved Image Container */}
                            <div style={{
                                width: '100%',
                                maxWidth: '100%',
                                margin: '0 auto 2.5rem auto',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
                                border: '1px solid rgba(0,0,0,0.04)',
                                backgroundColor: '#fff',
                                position: 'relative'
                            }}>
                                <img src="/hourglass-pilot-gap.png" alt="Hourglass showing pilots filtering down" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                {/* Gradient Overlay to fix white bar cutoff */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '80px',
                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
                                    pointerEvents: 'none'
                                }} />
                            </div>

                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE RESERVOIR
                            </div>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                Those who successfully navigate this transition through the "neck" of the hourglass reach the bottom—becoming part of the <strong>High Timers</strong> segment. This lower reservoir represents the actual global pilot shortage that the media often discusses. The crucial takeaway is that the industry doesn't just have a general pilot shortage; it has a "ready-to-hire" pilot shortage, primarily because the barrier to entry at the mid-point is so restrictive.
                            </p>
                        </section>

                        {/* The Reality Section */}
                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '3rem' }}>
                            {/* Candidates Image */}
                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc', marginBottom: '3rem', position: 'relative' }}>
                                <img src="/candidates-pilot-gap.png" alt="Different pilot candidates at an interview" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                {/* Gradient Overlay to fix white bar cutoff */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '60px',
                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
                                    pointerEvents: 'none'
                                }} />
                            </div>

                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE REALITY
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                Understanding Where You Stand
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                    When applying for your first airline role, it is critical to understand who you are sitting next to in the waiting room. You aren't just competing with other fresh graduates; you are often positioned alongside seasoned military pilots with highly structured training, or instructors who have already ground out their 1500 hours. As a 200-hour pilot with no category ratings, the harsh reality is that you are placed at the very bottom of the stack from an employer's risk perspective.
                                </p>

                                <p style={{ color: '#0284c7', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                                    In relation to this competitive landscape, it is important to understand the "Pilot Paradox & Shortage"—the misalignment between licenses held and operational demand. You will learn exactly what this means and the impact it has on the next page.
                                </p>
                            </div>
                        </section>

                        {/* The Experience Gap Section */}
                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '3rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE EXPERIENCE GAP
                            </div>

                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                The Multi-Crew Deficit
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: '0 auto', maxWidth: '42rem' }}>
                                    To an airline recruiter or an insurance underwriter, being a Low-Timer means you have only mastered the sterile, predictable environment of a single-pilot training bubble. It means you inherently lack the advanced Crew Resource Management (CRM) and multi-crew experience required to manage a commercial flight deck under stress.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: '0 auto', maxWidth: '42rem' }}>
                                    You are no longer judged on how well you execute a steep turn. You are judged on your perceived operational immaturity. You are legally certified to fly, but operationally, you are viewed as an unknown, un-standardized risk.
                                </p>
                            </div>

                            {/* Wingmentor Solutions Blended Card */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '3.5rem', textAlign: 'left' }}>
                                <div style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    borderRadius: '24px',
                                    padding: '3.5rem 2.5rem',
                                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.8)',
                                    textAlign: 'center',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}>
                                    <img src="/logo.png" alt="WingMentor Logo" style={{ height: '110px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }} />
                                    <div style={{ color: '#0284c7', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        WINGMENTOR SOLUTIONS
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 400, color: '#0f172a', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                                        Bridging the Gap
                                    </h3>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '40rem', textAlign: 'left' }}>
                                        Here at Wingmentor, through the Foundational Program, we will mentor you on how to build your foundational skills of CRM through the newly recognized system and principles of EBT (Evidence-Based Training) & CBTA (Competency-Based Training and Assessment).
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* The Manufacturer vs Reality Section */}
                        <section style={{ textAlign: 'center', maxWidth: '56rem', marginTop: '3rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                A VISUAL SUMMARY
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                The Manufacturer's Promise vs. Industry Reality
                            </h2>

                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc', marginBottom: '2.5rem' }}>
                                <img src="/pilot-manufacturer-reality.png" alt="Comic showing manufacturer promise vs industry reality" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>

                            <div style={{ textAlign: 'left', padding: '0 1rem' }}>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '1.5rem' }}>
                                    This visual perfectly captures the conflicting messaging low-timer pilots experience when navigating the start of their career:
                                </p>
                                <ul style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                                    <li style={{ marginBottom: '1rem' }}>
                                        <strong>Panel 1: The Manufacturer Booth —</strong> A low-timer pilot is enthusiastically assured by a sales representative that purchasing an expensive type rating fully qualifies them for an airline career. The manufacturer sells the dream, framing their program as the ultimate "golden ticket."
                                    </li>
                                    <li>
                                        <strong>Panel 2: The Industry Reality —</strong> The harsh awakening. The very same pilot, holding their new credentials, faces an "Industry Evaluation Panel" comprised of an Airline Recruiter, an Insurance Underwriter, and a Governing Body official enforcing the 1500-hour rule. Despite the manufacturer's promises, the pilot is outright rejected—told forcefully by the regulators that until the sheer flight hours are met, their rating doesn't override the barrier to entry.
                                    </li>
                                </ul>
                            </div>

                            {/* Airbus Insight Blended Card */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '2.5rem', textAlign: 'left' }}>
                                <div style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    borderRadius: '24px',
                                    padding: '3.5rem 2.5rem',
                                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.8)',
                                    textAlign: 'center',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}>
                                    <img src="/logo.png" alt="WingMentor Logo" style={{ height: '110px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }} />
                                    <div style={{ color: '#0284c7', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        INDUSTRY INSIGHT
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 400, color: '#0f172a', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                                        A Perspective from Airbus
                                    </h3>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '40rem', textAlign: 'left' }}>
                                        Through direct conversations with the Head of Training and Head of Flight Operations at Airbus, they shared a striking perspective: from a purely capability and technical standpoint, a low-timer undergoing a Type Rating performs on par with a veteran high-timer.
                                        <br /><br />
                                        However, Airbus, as a manufacturer, cannot publicly state this—the prohibitive constraints (like the 1500-hour rule, specific state regulations, and stringent airline insurance policies) exist completely outside their control. They are strictly the manufacturer. They can only build and certify the aircraft and the training program; they cannot force an airline or an insurance company to hire you.
                                    </p>
                                </div>
                            </div>

                        </section>

                        {/* Identity Section */}
                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '3rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE ANALYSIS
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                The Industry Split
                            </h2>

                            <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc', marginBottom: '3rem' }}>
                                <img src="/low-timer-reality-presentation.png" alt="Recruitment Reality Image" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>


                            <div style={{ textAlign: 'left', padding: '0 1.5rem', marginBottom: '3.5rem' }}>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '1.5rem' }}>
                                    This illustration captures the <strong>"The Split"</strong>—the defining moment where a pilot's career path is bifurcated based on their flight hours rather than their potential:
                                </p>
                                <ul style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                                    <li style={{ marginBottom: '1rem' }}>
                                        <strong>The Shortage (High Timers) —</strong> Experienced pilots are aggressively pursued. They receive sign-on bonuses, "swag bags," and are warmly welcomed into the cockpit. The industry shortage is localized almost entirely within this group.
                                    </li>
                                    <li style={{ marginBottom: '1rem' }}>
                                        <strong>The Purgatory (Low Timers) —</strong> Despite holding the exact same dream, newly-licensed pilots are diverted into "250-hour purgatory." They are met with standardized rejection, told to scan a QR code, and instructed to wait 8-12 months before even being considered.
                                    </li>
                                    <li>
                                        <strong>The Stigma —</strong> The separation is not just logistical; it is psychological. This split establishes an "unknown vs. trusted" dynamic that low-timers must navigate throughout the start of their professional journey.
                                    </li>
                                </ul>
                            </div>

                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                IDENTITY
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                The Industry Stigma
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                You passed your commercial checkride. You followed the syllabus perfectly and expected respect. Instead, the moment you graduated, the industry slapped you with a label: the "Low-Timer." It is not just a reflection of your logbook; it is a heavy industry stigma that immediately devalues your hard-earned license.
                            </p>

                            {/* Industry Hard Truth Section */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '3.5rem', textAlign: 'left' }}>
                                <div style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    borderRadius: '24px',
                                    padding: '4rem 3rem',
                                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.8)',
                                    textAlign: 'center',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}>
                                    <img src="/logo.png" alt="WingMentor Logo" style={{ height: '110px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }} />
                                    <div style={{ color: '#e11d48', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        HARD TRUTH
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                        The Recruitment Reality
                                    </h2>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '40rem', textAlign: 'left' }}>
                                        <strong>This is the hard truth that most of the industry doesn't want to entertain low timer pilots.</strong> Wingmentor has experienced this first hand.
                                        <br /><br />
                                        We first approached a stall and presented as a typical pilot with 200 hours to see what response we would get. Without a doubt, all we were told is to <em>"scan the QR code and please move on."</em> They tell you, <em>"You know the requirement is 1500 hours, okay come back to us once you've got that then we can talk."</em>
                                        <br /><br />
                                        <strong>Wingmentor has broken the silence barrier between the airline industry and pilots.</strong> We are representing as a database of pilots who want answers, coordination, direction, expectations, and guidance. We act as the bridge of communication between pilots and the industry, ensuring pilots have a voice and get the recognition they deserve.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* The Insurance Factor Section */}
                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '3rem' }}>
                            <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#f8fafc', marginBottom: '3rem' }}>
                                <img src="/insurance-reality.png" alt="Insurance Reality for Low Timers" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                                {/* Gradient Overlay to add premium fade if needed */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '60px',
                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
                                    pointerEvents: 'none'
                                }} />
                            </div>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE INSURANCE FACTOR
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                The Financial Liability
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                Another often-overlooked hurdle for low-time pilots is the insurance equation. Airlines and operators face significantly higher insurance premiums when hiring pilots with only 200 hours compared to those with a Type Rating and substantial experience. This stark difference in financial liability makes it overwhelmingly difficult for low-timers to get a foot in the door, as companies default to less risky, pre-qualified candidates.
                            </p>

                            {/* Insurance Factor Blended Card */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '3.5rem', textAlign: 'left' }}>
                                <div style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    borderRadius: '24px',
                                    padding: '3.5rem 2.5rem',
                                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.8)',
                                    textAlign: 'center',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}>
                                    <img src="/logo.png" alt="WingMentor Logo" style={{ height: '110px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }} />
                                    <div style={{ color: '#0284c7', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        WINGMENTOR INSIGHT
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 400, color: '#0f172a', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                                        Mitigating the Risk
                                    </h3>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '40rem', textAlign: 'left' }}>
                                        Here at Wingmentor, we are working with insurance firms. Pilots who undergo Wingmentor programs are vetted and processed through our database and are already familiarized with airline expectations, cadet programme pre-knowledge and preparation. This enhances the recognition process for pilots who are viable for programs, allowing them to gain recognition from operators.
                                        <br /><br />
                                        We can directly indicate to the airlines which pilots are truly low risk prior to employment. Since we vet, track performance, and log experience through assessments, examinations, interview preparations and EBT, this situational pre-awareness builds a higher portfolio than a pilot who is unfamiliarized with airline and aviation industry standards.
                                    </p>
                                </div>
                            </div>

                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', marginTop: '3.5rem' }}>
                                IN CONTINUATION
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                The Connection
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                Ultimately, the profile of a Low-Timer Pilot is relatively connected to the "Pilot Gap." This is a natural continuation of the discussion, as both are deeply related topics that define the current state of the aviation industry's recruitment landscape.
                            </p>
                        </section>

                    </div>
                    <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem', marginTop: '4rem' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '48rem', margin: '0 auto', width: '100%' }}>
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
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <p style={{ color: '#0284c7', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                            Next, we will explore the <strong>Pilot Gap</strong>—the invisible wall that separates the classroom from the cockpit.
                        </p>
                    </div>
                </div>
            );
        } else if (currentTopic === 'what-type-rating') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                    {/* ── Page Header ── */}
                    <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                        <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '320px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            CHAPTER 01 — UNDERSTANDING THE WHAT'S
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            What is a Type Rating?
                        </h1>

                        {/* ── New Header Image ── */}
                        <div style={{
                            width: '100%',
                            maxWidth: '56rem',
                            margin: '2rem auto 3rem auto',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(0,0,0,0.04)',
                            backgroundColor: '#fff'
                        }}>
                            <img src="/type-rating-header.png" alt="Type Rating Illustration" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>

                        <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto', fontWeight: 400 }}>
                            In this section, we demystify the multi-crew certification process. You will learn about the intense training required for advanced transport-category aircraft like the Airbus A320 or Boeing 737, and why the Type Rating is considered the 'Ultimate Equalizer' in the eyes of airline recruiters.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>
                        {/* Summary section container */}
                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '1rem' }}>
                            <div style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#334155' }}>
                                <p style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                    Before diving into the Pilot Gap, it's crucial to understand a key concept in aviation: the <strong>Type Rating</strong>. While a Commercial Pilot License allows you to fly smaller, piston-engine aircraft for hire, it does <em>not</em> qualify you to fly large, complex jets.
                                </p>

                                {/* Definition Blended Card */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '2.5rem', textAlign: 'left' }}>
                                    <div style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)',
                                        borderRadius: '24px',
                                        padding: '3rem 2.5rem',
                                        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.8)',
                                        textAlign: 'left',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}>
                                        <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                            CORE DEFINITION
                                        </div>
                                        <h3 style={{ fontSize: '1.6rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                            The Multi-Crew Endorsement
                                        </h3>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            A <strong>Type Rating</strong> is an additional, specialized certification issued by an aviation authority that explicitly authorizes a pilot to act as a crew member on a specific "type" of large or complex aircraft (e.g., an Airbus A320, Boeing 737, or ATR 72).
                                        </p>
                                    </div>
                                </div>

                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '2.5rem', textAlign: 'left' }}>
                                    Think of your commercial license as a standard driver's license. It proves you know the rules of the road and how to operate a standard car. A type rating, however, is like getting a specialized commercial endorsement to drive a massive 18-wheeler semi-truck—they are entirely different beasts requiring specific handling, systems knowledge, and training.
                                </p>
                            </div>
                        </section>

                        {/* Hidden Costs Section */}
                        <section style={{ textAlign: 'center', maxWidth: '48rem', marginTop: '1rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE FINANCIAL BARRIER
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                The Hidden Costs
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, textAlign: 'left' }}>
                                However, as we will explore in the Pilot Gap, the sheer volume of low-timer graduates has shifted this dynamic. Many airlines now require pilots to already hold a type rating <em>before</em> they even apply, completely shifting the financial burden onto the applicant's shoulders.
                            </p>
                        </section>
                    </div>

                    {/* The Aftermath Section */}
                    {/* Expectations vs Reality Section */}
                    <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '1rem' }}>
                        <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            PERSPECTIVE
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                            Expectations vs. Reality
                        </h2>

                        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                            <img src="/low-timer-expectation.png" alt="Pilot holding commercial license dreaming of a jet" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                        </div>

                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '2.5rem', textAlign: 'left' }}>
                            The journey often begins with towering expectations. Fresh out of flight school, clutching a newly printed Commercial Pilot License, the immediate dream is a fast-tracked leap into the right seat of a shiny corporate jet or major airliner.
                        </p>

                        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                            <img src="/low-timer-reality.jpg" alt="Bankrupt pilot regretting buying a type rating" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                        </div>

                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '2.5rem', textAlign: 'left' }}>
                            However, reality quickly sets in. Desperate to bridge the massive experience gap and stand out from the immense stack of identical resumes, many pilots succumb to paying out-of-pocket for expensive, heavy jet type ratings without any guaranteed job offer attached. The aftermath is often devastating—wishing they had simply invested that money into building organic flight hours instead.
                        </p>
                    </section>

                    {/* The Instructor Route Section */}
                    <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '1rem' }}>
                        <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            THE INSTRUCTOR TRAP
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                            The Instructor's Dilemma
                        </h2>

                        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                            <img src="/instructor-wrong-investment-pilot-gap.png" alt="Flight instructor stuck paying for Airbus rating" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                        </div>

                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, textAlign: 'left' }}>
                            Even pilots who chose the <strong>traditional flight instructor route</strong> are not immune. Trapped in a holding pattern, some will burn their hard-earned cash on a Category 3 type rating (like an A320) out of pure frustration, hoping it will force an airline to notice them. Sadly, they remain stuck as instructors, now burdened with a heavy training loan and recurrent costs they can't afford.
                        </p>
                    </section>
                    <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '3rem' }}>
                        <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            THE SYNDROME
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                            "Shiny Type Rating" Syndrome
                        </h2>

                        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                            <img src="/financial-drain-pilot-gap.jpg" alt="Cartoon showing the financial drain of type ratings" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                        </div>

                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '2.5rem', textAlign: 'left' }}>
                            Trapped with no clear direction, many succumb to <strong>"Shiny Type Rating Syndrome."</strong> Out of frustration, they spend tens of thousands on complex ratings (A320 or ATR) <em>before</em> securing a job offer. Without line experience, this is often a catastrophic mistake—bleeding their remaining funds dry just as an airline might finally call.
                        </p>
                    </section>

                    {/* PRM Section */}
                    <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '1rem' }}>
                        <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            PILOT RISK MANAGEMENT (PRM)
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                            The Liquidity Trap
                        </h2>

                        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                            <img src="/what-is-a-type-rating.png" alt="Be smart with your investments. You can cash out and sell a plane, but not a type rating." style={{ width: '100%', height: 'auto', display: 'block' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                        </div>

                        <div style={{ textAlign: 'left', color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                A core tenet of <strong>Pilot Risk Management (PRM)</strong> is understanding liquidity. As the image illustrates: <em>"Be smart with your investments. You can cash out and sell a plane, but not a type rating."</em>
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                A pilot stands holding a massive scroll showing an <strong>"Airbus A320 Type Rating - Cost: $50,000"</strong>. Next to him sits a tangible light aircraft also worth $50,000. In a thought bubble, he remembers a devastating medical diagnosis requiring exactly that much money for treatment.
                            </p>
                            <p style={{ margin: 0, padding: '1.5rem', backgroundColor: '#fdf2f8', borderRadius: '12px', borderLeft: '4px solid #db2777', fontStyle: 'italic' }}>
                                The stark reality is that while an airplane is a tangible asset that can be sold to recover cash in a crisis, a Type Rating is purely experiential. Once that money is spent, it is gone forever. If your career stalls or life throws a curveball, you cannot liquidate a certification.
                            </p>
                        </div>
                    </section>
                    <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem', marginTop: '4rem', width: '100%', maxWidth: '52rem', margin: '0 auto' }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '48rem', margin: '0 auto', width: '100%' }}>
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
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <p style={{ color: '#0284c7', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                            Beyond the rating, one must bypass the "insurmountable wall" of recruitment. Learn about the <strong>Pilot Recognition System</strong> on the next page.
                        </p>
                    </div>
                </div>
            );
        }

        // ── Page 2: What is the Pilot Gap? ──────────────────────────────────
        if (currentTopic === 'what-pilot-gap') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                    {/* ── Page Header ── */}
                    <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                        <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '320px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            CHAPTER 01 — UNDERSTANDING THE WHAT'S
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            What is the Pilot Gap?
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto', fontWeight: 400 }}>
                            You've earned your Commercial Pilot License. You are qualified, skilled, and ready. Yet, you face an invisible wall—an experience vacuum that separates the classroom from the cockpit.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>
                        {/* Introductory Lead Text */}
                        <section style={{ textAlign: 'center', maxWidth: '52rem' }}>
                            <div style={{ padding: '2rem 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', marginBottom: '3rem' }}>
                                <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', lineHeight: 1.6, color: '#334155', margin: 0, textAlign: 'justify', marginBottom: '1.5rem' }}>
                                    You've earned your Commercial Pilot License. You are qualified, skilled, and ready. Yet, you face an invisible wall. This is the <strong>'Low Timer Pilot Gap'</strong>—the critical period where newly-licensed pilots possess the qualifications but lack the flight hours required for airline consideration.
                                </p>
                                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', lineHeight: 1.7, color: '#475569', margin: 0, textAlign: 'justify' }}>
                                    Ultimately, the Pilot Gap is not a singular issue, but a complex combination of several factors we've discussed: The stigma of being a <strong>Low-Timer</strong>, the illusion of an immediate <strong>Pilot Shortage</strong> at all experience levels, and the brutal <strong>cause-and-effect of the current industry paradoxes</strong>. It is the friction point where massive pilot supply meets an insurmountable bottleneck of operational and insurance requirements.
                                </p>
                            </div>
                        </section>

                        {/* The Connection Bridge Section */}
                        <section style={{ textAlign: 'center', maxWidth: '56rem', marginTop: '1rem' }}>
                            <div style={{
                                width: '100%',
                                maxWidth: '850px',
                                margin: '0 auto 2.5rem auto',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
                                border: '1px solid rgba(0,0,0,0.04)',
                                backgroundColor: '#fff',
                                position: 'relative'
                            }}>
                                <img src="/pilot-gap-bridge.png" alt="The Connection of Pilots to the Industry" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>

                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE LANDSCAPE
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                The Connection of Pilots to the Industry
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: '0 0 1.5rem 0', textAlign: 'left' }}>
                                To understand the Pilot Gap, you must first look at the broken bridge connecting eager candidates to the aviation industry:
                            </p>
                            <ul style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, textAlign: 'left', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                                <li style={{ marginBottom: '0.75rem' }}><strong>The Left Side (The Waiting Line):</strong> Thousands of low-time pilots are stuck waiting for a chance, burdened by financial bankruptcy. Some have been in line for years, wondering what the requirements are on the other side.</li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>The Right Side (The Goal):</strong> Aviation industry pathways—airlines, corporate jets, and emerging air taxis. Yet, recruiters stand at the gate turning applicants away: <em>"Sorry, you know the requirements."</em></li>
                                <li style={{ marginBottom: '0.75rem' }}><strong>The Broken Bridge:</strong> A precarious path where pilots attempt to cross but fall into the chasm constructed from a deficit of knowledge, guidance, and required experience.</li>
                                <li><strong>The Gap Itself:</strong> Pilots who try to take the leap without the right preparation find themselves falling. Investing in random ratings is a gamble without guidance, leaving many stranded or out of the industry entirely.</li>
                            </ul>
                        </section>
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

                        <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem', marginTop: '4rem', width: '100%', maxWidth: '52rem', margin: '0 auto' }} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', maxWidth: '48rem', margin: '0 auto', width: '100%' }}>
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
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <p style={{ color: '#0284c7', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                                To cross this gap, one must understand the "Ultimate Equalizer": the <strong>Type Rating</strong>. Learn about the multi-crew certification process on the next page.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        // ── Page 3: The Pilot Paradox & Shortage ─────────────────────────────
        if (currentTopic === 'what-pilot-shortage') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                    {/* ── Page Header ── */}
                    <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                        <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '320px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            CHAPTER 01 — UNDERSTANDING THE WHAT'S
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            The Pilot Paradox & Shortage
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto', fontWeight: 400 }}>
                            Building on our profile of the 'Low Timer,' we must now confront the paradox that defines this stage of the journey. While global media headlines scream about a "Global Pilot Shortage," the reality for a 200-hour pilot is often one of silence and rejection. This gap between the industry's desperate need for crew and the individual pilot's struggle for a first job is the defining bottleneck of modern commercial aviation.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>
                        {/* 1. The Pilot Shortage in a Nutshell */}
                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '1rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE PILOT SHORTAGE
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                In a Nutshell
                            </h2>

                            <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                                <img src="/hopeful-news-paradox.png" alt="Comic showing the pilot shortage in a nutshell" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                            </div>

                            <div style={{ textAlign: 'left', color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                <p style={{ marginBottom: '1.5rem' }}>
                                    This visual perfectly captures the conflicting messaging low-timer pilots experience when navigating the start of their career:
                                </p>
                                <ul style={{ margin: 0, paddingLeft: '1.5rem', listStyleType: 'none', color: '#475569', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <li style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '-1.5rem', color: '#0f172a' }}>•</span>
                                        <strong>Panel 1: The Hopeful News</strong> — Describing the aspiring pilot seeing the media headline that airlines need hundreds of thousands of pilots by 2030, selling them on the dream. They believe it's a guaranteed ticket straight to an airline right after graduation.
                                    </li>
                                    <li style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '-1.5rem', color: '#0f172a' }}>•</span>
                                        <strong>Panel 2: The Reality</strong> — Fast-forwarding 4 years to the career fair, detailing the demoralizing reality of the massive queue for the "Low Timer Section (200-400 Hours)" while the "High Timer Section (1,500+ Hours)" is wide open.
                                        <div style={{ marginTop: '0.5rem', color: '#64748b', fontStyle: 'italic' }}>
                                            "Well, they should've been more specific!"
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Wingmentor Insight Blended Card */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '3.5rem', textAlign: 'left' }}>
                                <div style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    borderRadius: '24px',
                                    padding: '3.5rem 2.5rem',
                                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                                    border: '1px solid rgba(255, 255, 255, 0.8)',
                                    textAlign: 'center',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}>
                                    <img src="/logo.png" alt="WingMentor Logo" style={{ height: '110px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }} />
                                    <div style={{ color: '#0284c7', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        INDUSTRY INSIGHT
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 400, color: '#0f172a', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                                        A Perspective from the Frontlines
                                    </h3>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '40rem', textAlign: 'left' }}>
                                        Wingmentor has experienced this exact reality firsthand. Our presence at the <strong>First Aviation Career Fair at Etihad Museum (January 21st)</strong> marked a pivotal moment in our journey—where Wingmentor evolved from a simple mentoring idea into a dedicated industry-gap solving movement.
                                        <br /><br />
                                        During this landmark event, we gained massive upfront reputation and received direct assurance and affirmation from industry giants, including <strong>Archer, AIRBUS, Etihad, Air Arabia, Fly Dubai, GCAA, Emirates Academy, and Fujairah Flight Academy</strong>.
                                        <br /><br />
                                        Through these high-level discussions—which included insights from the private jet industry, brokerage operators, and even influencers like <strong>@theAirportGuy</strong>—we secured a deep understanding of the industry's future. It confirmed that our mission to provide clear pathways, specialized programs, and professional recognition is exactly what the modern aviation landscape is starving for.
                                        <br /><br />
                                        What a pilot faces immediately after getting their commercial license is no longer a giant question mark. With Wingmentor, the 1,500-hour boundary—a hurdle set in 2013 that has caused massive structural backlash—is a challenge we are actively helping pilots navigate and overcome.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Summary section container */}
                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '1rem' }}>
                            <div style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#334155' }}>
                                <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', textAlign: 'left', fontFamily: 'Georgia, serif', marginTop: 0 }}>
                                    The Illusion of the Shortage
                                </h4>
                                <p style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                    The shortage is real, but the narrative you were sold is an illusion. There is absolutely no shortage of 250-hour commercial license holders. Operators are starving for crew, but they are desperate for qualified, operationally mature pilots—Captains and seasoned First Officers who can manage complex, unscripted scenarios.
                                </p>
                                <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
                                    <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        THE SATURATION SHIFT
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                        Shifting the Bottleneck
                                    </h2>

                                    <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                                        <img src="/saturation-shift-pilot-gap.jpg" alt="Aviation Career Fair showing pilots rejected from airlines and joining a massive backlog line for Flight Instructor Plan B" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            The visual above illustrates the <strong>Industry Backlog</strong>. When "Plan A" (Airline Recruitment) turns away graduates for lacking 1,500 hours, the "herd" mass-pivots to "Plan B" (Flight Instruction). This doesn't solve the bottleneck—it simply moves it downstream, creating a saturated queue where pilots face waits of over two years instead of progressing their careers.
                                        </p>
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                        <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>
                                            The Pivot to Instruction
                                        </h4>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            When the realization hits—that Plan A (Airlines) is currently impossible without hours—the mass of pilots executes a collective pivot to Plan B: Flight Instruction. They return to their own flight schools, not out of a passion for teaching, but out of necessity for flight hours.
                                        </p>
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                        <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>
                                            Saturation of Plan B
                                        </h4>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            Consequently, flight schools become flooded with their own graduates clamoring for instructor positions. The competition for Plan B becomes just as fierce as Plan A. We now have a "Pilot Paradox": A massive supply of pilots, a massive demand for flight hours, but a bottleneck that prevents the flow of careers.
                                        </p>
                                    </div>

                                    <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '3rem 0' }} />

                                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                        <h4 style={{ color: '#0f172a', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                                            The Instructor Bottleneck: Plan B Saturation
                                        </h4>
                                        <div style={{ width: '60px', height: '4px', backgroundColor: '#f59e0b', marginBottom: '1.5rem' }}></div>
                                        <h5 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05px' }}>
                                            The Flight School Waiting List
                                        </h5>
                                        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '1rem' }} />
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '2.5rem' }}>
                                            The dilemma extends beyond the airlines. The universally accepted 'Plan B' for low-timer pilots—becoming a Flight or Ground Instructor to build hours—has become as saturated as the airline market itself. This creates a secondary bottleneck, trapping pilots in a prolonged holding pattern.
                                        </p>

                                        {/* Instructor Bottleneck Illustration */}
                                        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '2.5rem', position: 'relative' }}>
                                            <img src="/instructor-bottleneck.png" alt="Illustration of the Instructor Bottleneck" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                                        </div>

                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '2rem' }}>
                                            This illustration vividly captures the <strong>"Saturation Event"</strong> at flight academies. While the front door (left) continues to welcome new students with the promise of a dream, the back door (right) reveals a staggering reality: a massive queue of graduates—some waiting since 2015—competing for a single instructor position. With selection rates as low as <strong>1 out of 400</strong>, the 'Plan B' is no longer a guaranteed safety net, but a highly competitive bottleneck that leaves thousands stranded in an experience vacuum.
                                        </p>

                                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '1rem' }}>
                                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                                THE RECRUITMENT CHASM
                                            </div>
                                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                                Navigating the Experience Void
                                            </h2>
                                        </section>

                                        {/* Aviation Career Pathways Illustration */}
                                        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '2.5rem', position: 'relative' }}>
                                            <img src="/pilot-gap-pathways.png" alt="Aviation Career Pathways Illustration" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                                        </div>

                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '2.5rem' }}>
                                            The <strong>"Experience Void"</strong> represents a structural imbalance where both commercial airlines and flight academies reach an operational saturation point, resulting in a dual-ended rejection of low-timer applicants. This terminal phase of career navigation is defined by <strong>Institutional Fatigue</strong>.
                                            <br /><br />
                                            Recruiters and administrators encounter a standardized "herd" of applicants so frequently that personalized mentorship and feedback are no longer feasible. Consequently, the industry has transitioned from providing nuanced professional guidance to implementing automated deferral routines. In practice, this manifests as high-volume, low-engagement interactions where applicants are redirected to automated systems (e.g., <em>"Scan the QR code and please move on"</em>) or placed on indefinite administrative hold, reflecting a system that lacks the bandwidth to manage individual career progression.
                                        </p>

                                        {/* WingMentor Insight Card */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '1rem', textAlign: 'left' }}>
                                            <div style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                backdropFilter: 'blur(16px)',
                                                WebkitBackdropFilter: 'blur(16px)',
                                                borderRadius: '24px',
                                                padding: '4rem 3rem',
                                                boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                                                border: '1px solid rgba(255, 255, 255, 0.8)',
                                                textAlign: 'center',
                                                width: '100%',
                                                boxSizing: 'border-box'
                                            }}>
                                                <img src="/logo.png" alt="WingMentor Logo" style={{ height: '110px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem' }} />
                                                <div style={{ color: '#0284c7', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                                    WINGMENTOR INSIGHT
                                                </div>
                                                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                                    Untying the Knot
                                                </h2>
                                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '40rem', textAlign: 'left' }}>
                                                    The aviation industry is moving at a pace where it simply doesn't have the time or resources to focus on individual low-timer navigation. This creates the "knot" of confusion you see today.
                                                    <br /><br />
                                                    <strong>Our solution is to provide the missing infrastructure:</strong> clear pathways, structured programs, coordinated applications, and robust pilot recognition systems. We untie this mess by providing the industry with pre-vetted, high-quality candidates, while providing you with the roadmap to bypass the chasm.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '2rem', backgroundColor: '#fafafa', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #b91c1c' }}>
                                        <h4 style={{ color: '#b91c1c', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                                            A Decade-Long Queue: Real-World Data
                                        </h4>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
                                            Data from a credible administrative source within a major flight school reveals a startling reality (identities withheld for legal protection): a prospective instructor faces a minimum two-year waiting list. The backlog contains over 2,000 applicants. More shockingly, pilots from batches as far back as 2015 are still returning to apply, creating a queue that is nearly a decade long.
                                        </p>
                                    </div>

                                    <div style={{ textAlign: 'left' }}>
                                        <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                                            The Implication: A Career Holding Pattern
                                        </h4>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            This is not a temporary delay; it is a systemic crisis. The 'safe' fallback option is no longer viable for the vast majority. Without a strategic alternative, pilots are left with expired ratings, diminished skills, and a dream that fades on an endless waiting list. The system forces you into a holding pattern with no clearance in sight.
                                        </p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '4rem' }}>
                                    <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        THE ECONOMIC TRAP: PILOT DEBT SPIRAL
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                        Promising the Aviation Dream
                                    </h2>

                                    <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                                        <img src="/pilot-economic-cycle.png" alt="Drawing showing the Pilot Economic Cycle" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
                                        <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                                            The Illusion of Investment vs. True Return
                                        </h4>
                                        <div style={{ width: '60px', height: '3px', backgroundColor: '#e2e8f0', marginBottom: '1.5rem' }}></div>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '1.5rem' }}>
                                            For many aspiring pilots, the journey is not just about mastering skills but also navigating a treacherous financial landscape. The promise of an airline career often leads to significant investment in licenses, ratings, and even speculative type ratings, sometimes without a guaranteed return. This section dissects the financial pitfalls and how they can lead to an 'Economic Trap' – a cycle of debt and diminished opportunity.
                                        </p>
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                        <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                                            The Endless Hold: Waiting for Clearance
                                        </h4>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '1.5rem' }}>
                                            Let's look at the structure: It is a closed loop. 1. Pilots invest capital to learn to fly. 2. They graduate and cannot find airline jobs (The Gap). 3. They reinvest to become Instructors (CFI). 4. Their primary job is to teach "new" students who are aiming for the same airline dream.
                                        </p>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '1.5rem' }}>
                                            This creates a cycle where the instructor relies on new students to build the hours needed to leave. It is important to note that this is a structural reality of the industry, not a malicious design by flight schools. Schools provide the necessary training and facilities, but the airline industry's entry barriers create this loop. It is a paradox where the system unintentionally necessitates a constant influx of new students to propel the careers of the previous class.
                                        </p>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '3rem' }}>
                                            This continuous cycle highlights one of the major economic realities in current training. An aspiring pilot desires an airline career and joins a flight school as a student. To achieve the requisite flying hours, they transition into becoming a flight instructor. Even after acquiring their hours, they often find themselves waiting years for that elusive airline application to clear. At this point, the cycle reinforces itself—they continue to promise the aviation dream to the next generation of incoming students simply to economically survive the wait.
                                        </p>
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '2rem', padding: '2rem', backgroundColor: '#fafafa', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                        <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
                                            Pilots Without Family History in Aviation - The Blind Investment
                                        </h4>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '1.5rem' }}>
                                            Furthermore, over <strong>80%</strong> of new pilots come from <strong>non-aviation backgrounds</strong>. They do not have family members in the industry to warn them of the cyclical nature of hiring or the "Gap". They invest blindly, trusting that their license will lead directly to a job. Without mentorship or industry foresight, they are walking into a <strong>saturation event</strong> completely unprotected.
                                        </p>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            For those without aviation lineage, the path is often navigated blind. You are sold a dream by flight schools that rely on your tuition, but the post-graduation reality is omitted. This leads to the <strong>Saturation Loop</strong>: where unhired graduates return to schools as instructors, saturating the only entry-level job market available.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '4rem' }}>
                                    <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        THE SATURATION EVENT: DATA ANALYSIS
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                        The 94% Consensus
                                    </h2>

                                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '1.5rem' }}>
                                            Survey data reveals a staggering consensus: <strong>94%</strong> of students entering flight school list <strong>"Major Airline Pilot"</strong> as their primary career goal. This singularity of purpose creates a funnel effect. Thousands of individuals enter the pipeline with diverse backgrounds, yet they all emerge aiming for the exact same narrow exit.
                                        </p>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, marginBottom: '2rem' }}>
                                            Critically, <strong>74%</strong> of these students are completely unaware of the challenges awaiting them post-graduation. They do not know about the <strong>1500-hour hurdle</strong>, the <strong>insurance minimums</strong>, or the <strong>lack of entry-level turbine jobs</strong> until they have already spent their tuition.
                                        </p>

                                        <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                                                We must be clear: This is not a failure of the education system or flight schools. These institutions excel at their mandate: producing licensed, safe aviators. Rather, this <strong>"Blind Spot"</strong> is a lack of shared knowledge regarding market realities.
                                            </p>
                                        </div>

                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            We are not pointing fingers at flight schools or anyone; we are providing vital information that should not be disregarded or turned away with blindness.
                                        </p>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
                                    <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        THE INSTRUCTOR LOOP
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                        A Stalled Pathway
                                    </h2>

                                    <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                                        <img src="/instructor-trap-pilot-gap.jpg" alt="Cartoon showing the flight instructor trap" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                                    </div>

                                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                                        <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'Georgia, serif' }}>
                                            The Ponzi Scheme Effect
                                        </h4>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            This misalignment creates what we call the <strong>Instructor Loop</strong>. Current instructors will blindly point you toward their own path: the "traditional" instructor route. But many of those same instructors are now realizing they are trapped, facing upwards of five years instructing before airlines even glance at their CVs. In reality, some argue the flight instructor route has structurally become akin to a <strong>ponzi scheme</strong>—constantly promising returns to new investors (low-timers needing hours) funded by the time and money of older investors who also had the exact same dream of reaching the airlines. This is no longer a viable modern pathway.
                                        </p>
                                    </div>

                                </div>



                                <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
                                    <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                        THE DREAM PARADOX
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '2.5rem', fontFamily: 'Georgia, serif' }}>
                                        Perpetuating the Cycle
                                    </h2>

                                    <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', backgroundColor: '#fff', marginBottom: '3rem', position: 'relative' }}>
                                        <img src="/dream-paradox-pilot-gap.png" alt="Comic showing the pilot dream paradox" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))', pointerEvents: 'none' }} />
                                    </div>

                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem', textAlign: 'left' }}>
                                        The <strong>Pilot Dream Paradox</strong> illustrates the harsh reality of the current training ecosystem. Most flight instructors never set out to teach; they became instructors simply because it was the only readily available way to build the flight hours required by airlines. They entered the system with the exact same dream of flying jets that their new students currently hold.
                                    </p>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, textAlign: 'left' }}>
                                        To keep the flight schools running and to continue building their own necessary hours, these instructors must sell the same "airline pilot dream" to the next wave of incoming students. This creates a self-sustaining cycle where students become instructors to teach new students, while the queue for actual airline placements grows longer and wait times continually extend. The paradox is that the very system designed to train airline pilots often ends up just training more flight instructors.
                                    </p>
                                </div>

                                <h4 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', textAlign: 'left', fontFamily: 'Georgia, serif', marginTop: '2rem' }}>
                                    The "Quality Void" Reality
                                </h4>
                                <p style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                                    Airlines simply cannot absorb the financial and operational risk of placing un-standardized graduates into those empty seats. The jobs exist, and the demand is historic, but until you can prove your multi-crew proficiency and Non-Technical Skills (NOTECHS), that global shortage does not apply to you.
                                </p>

                                {/* Definition Blended Card */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '2.5rem', textAlign: 'left' }}>
                                    <div style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)',
                                        borderRadius: '24px',
                                        padding: '3rem 2.5rem',
                                        boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.8)',
                                        textAlign: 'left',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}>
                                        <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                            THE OPERATIONAL BOTTLENECK
                                        </div>
                                        <h3 style={{ fontSize: '1.6rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                            Fueling the Paradox
                                        </h3>
                                        <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
                                            This misalignment inadvertently fuels the <strong>Pilot Dream Paradox</strong>—and is fueling the very Pilot Shortage itself. Because airlines aren't hiring from the bottom, veteran instructors stay trapped at flight schools for years. This inadvertently clogs the pipeline for the next generation of pilots who are sitting at home, waiting for their chance to even begin instructing to build their own hours. It is this exact systemic gridlock—a perpetual holding pattern of highly regulated hours—that coined the definitive term: the <strong>Low-Timer Pilot</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section style={{ textAlign: 'center', maxWidth: '52rem', marginTop: '1rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                OUR MISSION
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                Unclogging the Pipes
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, margin: 0, textAlign: 'left' }}>
                                At <strong>Wingmentor</strong>, we are dedicated to <strong>unclogging these pipes</strong>. Our mission is to provide the standardization and recognition required to move these veteran instructors into airline flight decks where they belong. By facilitating this transition, we free up critical instructor positions, allowing the new generation to enter the industry and start their journey, rather than being stalled at the starting line.
                            </p>
                        </section>


                    </div>

                    <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem', marginTop: '4rem', width: '100%', maxWidth: '52rem', margin: '0 auto' }} />
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
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <p style={{ color: '#0284c7', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                            Next, we will define <strong>What is a Low-Timer Pilot</strong>—and explore how this paradox directly creates the low-timer label.
                        </p>
                    </div>
                </div>
            );
        }

        // ── Page 4: What is Pilot Recognition? ──────────────────────────────
        if (currentTopic === 'what-pilot-recognition') {
            return (
                <div style={{ maxWidth: '56rem', margin: '0 auto', paddingTop: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', animation: 'fadeIn 0.4s ease-in-out' }}>
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
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <p style={{ color: '#0284c7', fontSize: '1.05rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                            Finally, we analyze the Psychology of the Gamble. Is a self-funded rating an investment, or a high-stakes bet? Explore <strong>Banker vs Casino</strong> on the next page.
                        </p>
                    </div>
                </div>
            );
        }

        // ── Page: Banker vs Casino ──────────────────────────────────────────
        if (currentTopic === 'type-rating-psychology') {
            return (
                <div style={{ maxWidth: '64rem', margin: '0 auto', paddingTop: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', animation: 'fadeIn 0.4s ease-in-out' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
                            Chapter 01 — Understanding the What's
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                            Banker vs Casino Manager
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto' }}>
                            Predicting the Return on Investment: A psychological analysis of the Type Rating gamble.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
                        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '1rem' }}>
                            <img src="/banker-vs-casino.png" alt="Banker vs Casino Manager Psychology" style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', width: '100%', marginTop: '2rem' }}>
                            <section>
                                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', color: '#0f172a', marginBottom: '1.5rem' }}>The Banker's Perspective</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#475569', fontSize: '1.05rem', lineHeight: 1.7 }}>
                                    <p>A banker looks for <strong>collateral</strong>, <strong>liquidity</strong>, and <strong>predictable growth</strong>. From this lens, a self-funded Type Rating is a "Toxic Asset":</p>
                                    <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <li><strong>Non-Refundable:</strong> Once paid, the capital is gone forever. There is no "sell-back" option.</li>
                                        <li><strong>Intangible:</strong> You aren't buying a house or a car; you're buying a piece of paper that only has value if an airline says it does.</li>
                                        <li><strong>The Subscription Model:</strong> You don't keep it forever. If you leave the industry or fail to fly the aircraft type regularly, the rating expires. It's a lease on a skill, not ownership of an asset.</li>
                                        <li><strong>No Appreciation:</strong> The rating doesn't grow in value. In fact, it only costs more to "renew" it every year if you aren't employed.</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', color: '#0f172a', marginBottom: '1.5rem' }}>The Casino Manager's View</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#475569', fontSize: '1.05rem', lineHeight: 1.7 }}>
                                    <p>The Casino Manager sees the Pilot Training industry as a high-stakes table. They love the "Side Bet" of a self-funded rating because:</p>
                                    <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <li><strong>Asymmetric Risk:</strong> The pilot takes 100% of the financial risk. The "Casino" (the airline or agency) takes 0%.</li>
                                        <li><strong>The "Near Miss" Effect:</strong> Pilots see others getting hired and think they are "due" for a win, leading them to stay in the game longer than they should.</li>
                                        <li><strong>House Edge:</strong> The house always wins because even if the pilot isn't hired, the training center still gets paid for the rating.</li>
                                    </ul>
                                    <div style={{ padding: '1.5rem', backgroundColor: '#fff7ed', borderRadius: '16px', border: '1px solid #ffedd5', marginTop: '1rem' }}>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#9a3412', fontWeight: 600 }}>
                                            ⚠️ Are you investing or gambling? Without a job offer, a self-funded Type Rating is almost always a gamble.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div style={{ height: '1px', background: '#e2e8f0', width: '100%', marginTop: '3rem' }} />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem', width: '100%' }}>
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
            );
        }

        // ── Page: why-statistics ───────────────────────────────────────────
        if (currentTopic === 'why-statistics') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                    <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                        <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '320px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            CHAPTER 02 — THE WHY
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            The Statistical Reality
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto', fontWeight: 400 }}>
                            Numbers don't lie. In this section, we examine the quantitative data that defines the pilot landscape, revealing the stark contrast between market perception and the actual barriers to entry for low-timers.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>
                        <section style={{ textAlign: 'center', maxWidth: '52rem' }}>
                            <div style={{ padding: '2.5rem', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
                                <div style={{ fontSize: '3rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.5rem' }}>85%</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' }}>of low-timer resumes are rejected automatically</div>
                                <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                                    Recruitment algorithms and third-party filters eliminate the vast majority of applications that don't meet specific turbine or multi-crew benchmarks, regardless of training quality.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                                <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>14 Months</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Average Wait Time</div>
                                </div>
                                <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>€35,000</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Avg. Extra Investment</div>
                                </div>
                            </div>

                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify' }}>
                                The "Pilot Shortage" is a top-heavy phenomenon. While the industry needs tens of thousands of pilots over the next decade, the capacity for airlines to train and "onboard" low-timers is limited by simulator availability and instructor bandwidth. This creates a statistical bottleneck where only those with verified standardization move forward.
                            </p>
                        </section>

                        <div style={{ height: '1px', background: '#e2e8f0', width: '100%', maxWidth: '42rem' }} />

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem', width: '100%', maxWidth: '42rem' }}>
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
            );
        }

        // ── Page: why-trap ───────────────────────────────────────────────
        if (currentTopic === 'why-trap') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                    <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                        <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '320px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            CHAPTER 02 — THE WHY
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            The Golden Handcuffs
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto' }}>
                            A common trap most pilots don't know or invest cluesly in is the Flight Time Bond—a mechanism designed to ensure "loyalty" through financial leverage.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
                        <div style={{ width: '100%', maxWidth: '64rem', backgroundColor: 'white', padding: '1rem', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                            <img src="/flight-bond.png" alt="Flight Time Bond Illustration" style={{ width: '100%', height: 'auto', borderRadius: '24px', display: 'block' }} />
                        </div>

                        <div style={{ textAlign: 'center', maxWidth: '42rem', marginBottom: '1.5rem' }}>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                                Understanding the fine print: The moment a Pilot's freedom is traded for a seat.
                            </p>
                        </div>

                        <section style={{ textAlign: 'center', maxWidth: '52rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                THE FLIGHT TIME BOND
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                A Debt-Driven Career Path
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify' }}>
                                Many airlines offer "sponsored" or "funded" training, but this often comes with a significant catch: the <strong>Flight Time Bond</strong>. This is a legal contract where the pilot agrees to stay with the airline for a fixed period (often 3-5 years) or pay back a massive training fee—up to €40,000 or more—if they leave early. While it looks like an opportunity, it can become a "Golden Handcuff," trapping pilots in suboptimal working conditions or preventing them from pursuing better opportunities because of the financial penalty.
                            </p>
                        </section>

                        <div style={{ height: '1px', background: '#e2e8f0', width: '100%', maxWidth: '42rem' }} />

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem', width: '100%', maxWidth: '42rem' }}>
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
            );
        }

        if (currentTopic === 'why-trap') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                    <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                        <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '320px', height: 'auto', objectFit: 'contain', marginBottom: '2rem' }} />
                        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                            CHAPTER 02 — THE WHY
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            The "Easy Way Out" Trap
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '42rem', margin: '0 auto' }}>
                            Desperation often leads to expensive mistakes. The most common pitfall for low-timers is seeking a "silver bullet" solution that doesn't exist.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>
                        <section style={{ textAlign: 'center', maxWidth: '52rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                WARNING
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                Buying Your Way In?
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, textAlign: 'justify', margin: 0 }}>
                                Many pilots fall into the trap of purchasing a self-funded Type Rating (e.g., on a B737 or A320) without a job offer, or burning thousands on "blind" hour building. Without a structured framework and industry recognition, these investments often yield zero returns. You're simply adding more numbers to a resume that still lacks <strong>operational credibility</strong>.
                            </p>
                        </section>

                        <section style={{ backgroundColor: 'white', borderRadius: '24px', padding: '3rem', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)', border: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ color: '#ef4444' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <h4 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', margin: 0 }}>Unstructured Ratings</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>Ratings without a context of standardized mentorship are viewed as "hobbyist" additions by top-tier recruiters.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ color: '#ef4444' }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <h4 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', margin: 0 }}>The Instructor Loop</h4>
                                        <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>Staying in the flight school bubble without multi-crew exposure keeps your thinking restricted to PPL-level behaviors.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6rem', width: '100%', maxWidth: '42rem' }}>
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
            );
        }

        // ── Welcome Aboard Page ──────────────────────────────────────────────
        if (currentTopic === 'welcome') {
            return (
                <div style={{ maxWidth: '950px', margin: '0 auto', animation: 'fadeIn 0.5s ease-in-out' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem', paddingTop: '2rem' }}>
                        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                            <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '320px', height: 'auto', objectFit: 'contain' }} />
                        </div>
                        <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            MODULE 01 START
                        </div>
                        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', marginBottom: '0', letterSpacing: '-0.02em' }}>
                            Welcome Aboard
                        </h1>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>
                        {/* Section 1 */}
                        <section style={{ textAlign: 'center', maxWidth: '56rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                INTRODUCTION
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                Welcome to the Wingmentor Foundation Program
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                You have taken a decisive step towards bridging the critical gap between licensure and a professional career. This program is engineered to provide you with the structure, support, and verifiable experience necessary to navigate the complexities of the aviation industry. Your journey towards command starts now.
                            </p>
                        </section>

                        {/* Section 2 - Elevated Card */}
                        <section style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '24px', padding: '4rem 3rem', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)', border: '1px solid rgba(255, 255, 255, 0.8)', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                SUPPORT NETWORK
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                A Message From the Wingmentor Team
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: '0 auto', maxWidth: '40rem' }}>
                                The entire Wingmentor operational team is here to support you. We are a collective of active pilots, instructors, and industry professionals dedicated to your success. We manage the logistics, verify the experience, and ensure the standards of this program are upheld with unwavering integrity. Consider us your ground crew, ready to ensure your flight path is clear and your objectives are met.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section style={{ textAlign: 'center', width: '100%', maxWidth: '56rem' }}>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                VISION & COMMITMENT
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                A Welcome From the Founders
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '42rem', margin: '0 auto' }}>
                                <p style={{ margin: 0 }}>
                                    On behalf of the entire Wingmentor team, we extend our warmest welcome. You have officially joined a dedicated Pilot Recognition Program committed to excellence, mutual support, and overcoming one of the industry's greatest challenges.
                                </p>
                                <p style={{ margin: 0 }}>
                                    You are now more than a pilot; you are a vital contributor to a movement that is reshaping the future of aviation careers. We operate with professionalism, integrity, and a relentless focus on our collective success. This handbook is your guide. Welcome aboard.
                                </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #e2e8f0' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 700, color: '#0f172a', letterSpacing: '0.1em', fontSize: '0.9rem', marginBottom: '0.25rem' }}>BENJAMIN TIGER BOWLER</div>
                                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>FOUNDER</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 700, color: '#0f172a', letterSpacing: '0.1em', fontSize: '0.9rem', marginBottom: '0.25rem' }}>KARL BRIAN VOGT</div>
                                    <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>FOUNDER</div>
                                </div>
                            </div>
                        </section>

                        {/* Quote Block */}
                        <section style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '24px', padding: '4rem 3rem', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)', border: '1px solid rgba(255, 255, 255, 0.8)', textAlign: 'center', width: '100%', boxSizing: 'border-box', marginTop: '1rem' }}>
                            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                                <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '160px', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                OUR PHILOSOPHY
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                The Experience Paradox
                            </h2>
                            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.8, margin: '0 auto', maxWidth: '44rem', fontStyle: 'italic' }}>
                                "We couldn't stand by and watch qualified pilots give up. The gap in the industry isn't a lack of talent; it's a lack of opportunity. Wingmentor is our answer to the 'experience paradox'—providing a structured environment where pilots can prove their worth and keep their dreams alive."
                            </p>
                        </section>

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
                    <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>
                        {/* Hub-Style Header */}
                        <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                                <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '280px', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                                MODULE 01
                            </div>
                            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                                Industry Familiarization &<br />Indoctrination
                            </h1>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>
                            {/* Introduction / Welcome Section */}
                            <section style={{ textAlign: 'center', maxWidth: '42rem', marginTop: '2rem' }}>
                                <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    INTRODUCTION
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                        Welcome to the WingMentor Foundational Program. This module is your first step toward true industry recognition. Broken down into three core segments, it is meticulously designed to bridge the gap between your initial commercial license and the rigorous expectations of the airline flight deck.
                                    </p>
                                    <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                        The concepts within these segments will form the basis of your Pre-Foundation Knowledge Exam. This assessment evaluates a dynamic combination of our proprietary program architecture and regulatory standards from governing bodies such as the FAA, CAAP, and EASA. Furthermore, your evaluation will be strictly scaled to your current technical proficiency and the specific skill levels you are assigned to mentor.
                                    </p>
                                </div>
                            </section>

                            {/* Mission Section */}
                            <section style={{ textAlign: 'center', maxWidth: '42rem' }}>
                                <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    THE MISSION
                                </div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                    Bridging the Gap
                                </h2>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                    The Wingmentor Foundation Program is an operational framework engineered to address a critical system failure in the aviation career pipeline: The Low Timer Gap. Our mission is to provide newly licensed commercial pilots with a structured, verifiable pathway to build the essential experience, command authority, and professional acumen required by the industry.
                                </p>
                            </section>

                            {/* Symbiotic Airframe Section */}
                            <section style={{ textAlign: 'center', maxWidth: '42rem' }}>
                                <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    THE SYMBIOTIC AIRFRAME
                                </div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                    Mentor & Mentee
                                </h2>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                    This program operates on a symbiotic principle. Mentees receive precise, surgical guidance from experienced peers to overcome specific training hurdles. Concurrently, Mentors engage in a structured system that transforms their support into verifiable, logged experience—a powerful asset that demonstrates leadership, problem-solving, and Crew Resource Management (CRM) skills, creating a distinct advantage in a saturated job market.
                                </p>
                            </section>

                            {/* Core Briefing Segments List */}
                            <section style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '24px', padding: '4rem 3rem', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)', border: '1px solid rgba(255, 255, 255, 0.8)', textAlign: 'center', width: '100%', maxWidth: '48rem', boxSizing: 'border-box' }}>
                                <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    CURRICULUM
                                </div>
                                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 400, color: '#0f172a', marginBottom: '2rem' }}>
                                    Core Briefing Segments
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setCurrentChapter(1)}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginTop: '0.125rem', fontSize: '0.875rem' }}>1</div>
                                        <div>
                                            <h4 style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>The "What"</h4>
                                            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.625, margin: 0 }}>Discover the reality of the "Experience Void" and exactly what operators view as a 250-hour logbook insurance risk.</p>
                                        </div>
                                    </div>
                                    <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.8)', marginLeft: '3.5rem' }}></div>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setCurrentChapter(2)}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginTop: '0.125rem', fontSize: '0.875rem' }}>2</div>
                                        <div>
                                            <h4 style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>The "Why"</h4>
                                            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.625, margin: 0 }}>Analyze the harsh industry metrics behind the hiring gap, and understand why 92% of low-timers face career stagnation.</p>
                                        </div>
                                    </div>
                                    <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.8)', marginLeft: '3.5rem' }}></div>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setCurrentChapter(3)}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginTop: '0.125rem', fontSize: '0.875rem' }}>3</div>
                                        <div>
                                            <h4 style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>The "How"</h4>
                                            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.625, margin: 0 }}>Master our Evidence-Based Training (EBTA) framework to actively build advanced CRM capabilities that recruiters demand.</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={handleNext}
                                        style={{
                                            padding: '1rem 2rem',
                                            backgroundColor: '#0284c7',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            transition: 'background 0.2s',
                                            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#0369a1'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#0284c7'; }}
                                    >
                                        Continue to Chapter 1 <Icons.ArrowRight style={{ width: 16, height: 16 }} />
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.5s ease-in-out' }}>

                        {/* ── Page Header ── */}
                        <div style={{ textAlign: 'center', paddingBottom: '3.5rem', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                                <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '280px', height: 'auto', objectFit: 'contain' }} />
                            </div>
                            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1rem' }}>
                                CHAPTER 01
                            </div>
                            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 400, color: '#0f172a', margin: '0 0 1.5rem 0', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                                Understanding the What&#39;s
                            </h1>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', alignItems: 'center' }}>
                            {/* Introduction / Welcome Section */}
                            <section style={{ textAlign: 'center', maxWidth: '42rem', marginTop: '2rem' }}>
                                <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    INTRODUCTION
                                </div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                    Life After Graduation
                                </h2>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                    You&#39;ve passed your checkride. Whether you spent four grueling years earning a Bachelor&#39;s Degree in Commercial Aviation or sprinted through an intensive Fast-Track academy, the celebrations are over. So, what does life after graduation actually look like? When you emerge from flight school with a freshly printed license, you are stepping out of a highly controlled simulator bubble and into the vast wilderness of the commercial aviation industry.
                                </p>
                            </section>

                            {/* The Illusion Section */}
                            <section style={{ textAlign: 'center', maxWidth: '42rem' }}>
                                <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    THE ILLUSION
                                </div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                    The "Pilot Shortage"
                                </h2>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                    The media aggressively advertises a global &#34;Pilot Shortage,&#34; leading graduates from all educational backgrounds to believe jobs are waiting the moment they finish. As your mentors, we have to tell you the truth: the reality is vastly different. Operators are extremely hesitant to hand the keys of a multi-million dollar aircraft to a pilot with 250 hours.
                                </p>
                            </section>

                            {/* The Reality Section */}
                            <section style={{ textAlign: 'center', maxWidth: '42rem' }}>
                                <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    THE REALITY
                                </div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>
                                    Entering the Experience Void
                                </h2>
                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                                    Regardless of your path, the industry views you the same: you are broadly labeled a &#34;Low-Timer&#34;. You have stepped into the &#34;Experience Void&#34;—the massive, unspoken chasm between holding a legal 250-hour Commercial Pilot License (CPL) and possessing the advanced, multi-crew maturity that airlines actually demand. In this chapter, we define the three core realities of your current situation:
                                </p>
                            </section>

                            {/* ── Core Topics List — matching Intro & Overview ── */}
                            <section style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '24px', padding: '4rem 3rem', boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)', border: '1px solid rgba(255, 255, 255, 0.8)', textAlign: 'center', width: '100%', maxWidth: '48rem', boxSizing: 'border-box', marginBottom: '4rem' }}>
                                <div style={{ color: '#2563eb', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                    CURRICULUM
                                </div>
                                <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 400, color: '#0f172a', marginBottom: '2rem' }}>
                                    Core Topics
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => { setCurrentTopic('what-low-timer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginTop: '0.125rem', fontSize: '0.875rem' }}>1</div>
                                        <div>
                                            <h4 style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Identity: The "Low-Timer"</h4>
                                            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.625, margin: 0 }}>Why your hard-earned license is currently viewed by insurers as a liability, not an asset.</p>
                                        </div>
                                    </div>
                                    <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.8)', marginLeft: '3.5rem' }}></div>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => { setCurrentTopic('what-pilot-gap'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginTop: '0.125rem', fontSize: '0.875rem' }}>2</div>
                                        <div>
                                            <h4 style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>The Gap: The Pilot Gap</h4>
                                            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.625, margin: 0 }}>The brutal developmental chasm between your 250 hours and the airline flight deck.</p>
                                        </div>
                                    </div>
                                    <div style={{ height: '1px', backgroundColor: 'rgba(226, 232, 240, 0.8)', marginLeft: '3.5rem' }}></div>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => { setCurrentTopic('what-pilot-shortage'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, marginTop: '0.125rem', fontSize: '0.875rem' }}>3</div>
                                        <div>
                                            <h4 style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>The Illusion: The Shortage Illusion</h4>
                                            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.625, margin: 0 }}>Why operators are starving for crew, yet still refusing to hire entry-level graduates.</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={() => { setCurrentTopic('what-low-timer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        style={{
                                            padding: '1rem 2rem',
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
                            </section>
                        </div>
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
                                    { label: 'The Pilot Paradox & Shortage', slug: 'what-pilot-shortage' },
                                    { label: 'What is the Pilot Gap?', slug: 'what-pilot-gap' },
                                    { label: 'What is a Type Rating?', slug: 'what-type-rating' },
                                    { label: 'What is Pilot Recognition?', slug: 'what-pilot-recognition' },
                                    { label: 'Banker vs Casino', slug: 'type-rating-psychology' },
                                ],
                            },
                            {
                                title: 'The "Why"', id: 2,
                                topics: [
                                    { label: 'The Statistical Reality', slug: 'why-statistics' },
                                    { label: 'The Easy Way Out Trap', slug: 'why-trap' },
                                    { label: 'The Golden Handcuffs', slug: 'why-flight-bond' },
                                ]
                            },
                            { title: 'The Expected Standard', id: 3 },
                            { title: 'The "How"', id: 4 },
                            { title: 'The Result Factor', id: 5 },
                            { title: 'Final Recommendation', id: 6 },
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
                                                                onClick={() => { setCurrentTopic(topic.slug); }}
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
                                    width: '56px',
                                    height: '56px',
                                    backgroundColor: currentChapter === 0 ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.05)',
                                    color: currentChapter === 0 ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.35)',
                                    border: `1px solid ${currentChapter === 0 ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.06)'}`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: currentChapter === 0 ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backdropFilter: 'blur(20px) saturate(100%)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(100%)',
                                    opacity: currentChapter === 0 ? 0.5 : 1,
                                }}
                                onMouseEnter={e => {
                                    if (currentChapter !== 0) {
                                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)';
                                        e.currentTarget.style.border = '1px solid rgba(0, 0, 0, 0.12)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (currentChapter !== 0) {
                                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.35)';
                                        e.currentTarget.style.border = '1px solid rgba(0, 0, 0, 0.06)';
                                    }
                                }}
                            >
                                <Icons.ArrowLeft style={{ width: 24, height: 24 }} />
                            </button>

                            <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>
                                Page {currentChapter + 1} of {totalChapters}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentChapter === totalChapters - 1}
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    backgroundColor: currentChapter === totalChapters - 1 ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.05)',
                                    color: currentChapter === totalChapters - 1 ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.35)',
                                    border: `1px solid ${currentChapter === totalChapters - 1 ? 'rgba(0, 0, 0, 0.02)' : 'rgba(0, 0, 0, 0.06)'}`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: currentChapter === totalChapters - 1 ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backdropFilter: 'blur(20px) saturate(100%)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(100%)',
                                    opacity: currentChapter === totalChapters - 1 ? 0.5 : 1,
                                }}
                                onMouseEnter={e => {
                                    if (currentChapter !== totalChapters - 1) {
                                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.6)';
                                        e.currentTarget.style.border = '1px solid rgba(0, 0, 0, 0.12)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (currentChapter !== totalChapters - 1) {
                                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.35)';
                                        e.currentTarget.style.border = '1px solid rgba(0, 0, 0, 0.06)';
                                    }
                                }}
                            >
                                <Icons.ArrowRight style={{ width: 24, height: 24 }} />
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
            </div>
        </div>
    );
};

export default PilotGapModulePage;
