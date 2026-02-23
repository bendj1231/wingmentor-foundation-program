import React, { useState, useEffect } from 'react';
import './App.css';

export const Icons = {
  Logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 22l10-4 10 4L12 2z" />
    </svg>
  ),
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  ArrowLeft: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  BookOpen: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Book: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Map: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  Monitor: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Cpu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  LogOut: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Lock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  )
};

type CardItem = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Icons;
  desktopOnly?: boolean;
  linkText: string;
  badge?: string;
  image?: string;
  onClickAction?: () => void;
};

const programs: CardItem[] = [
  {
    id: 'prog-1',
    title: 'Foundational Program',
    description: 'Build a robust aviation foundation. Master aerodynamics, precise navigation, and core flight mechanics through comprehensive, instructor-led modules.',
    icon: 'Book',
    linkText: 'Access Program',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop',
    onClickAction: undefined // Will be attached dynamically inside App component
  },
  {
    id: 'prog-transition',
    title: 'Transition Program',
    description: 'Bridge the gap to the flight deck. Advanced simulator scenarios and multi-crew coordination (MCC) training to prepare you for airline operations.',
    icon: 'Book',
    linkText: 'Access Program',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop'
  }
];

const pathways: CardItem[] = [
  {
    id: 'path-1',
    title: 'Emirates ATPL Pathway',
    description: 'A structured roadmap designed to take you from a novice to a certified ATPL pilot.',
    icon: 'Map',
    linkText: 'View Pathway',
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'path-2',
    title: 'Commercial Pilot License',
    description: 'Accelerated track for aspiring commercial pilots looking to join major airlines.',
    icon: 'Map',
    linkText: 'View Pathway',
    image: 'https://images.unsplash.com/photo-1558509355-6b5d9bcbb4eb?q=80&w=600&auto=format&fit=crop'
  }
];

const applications: CardItem[] = [
  {
    id: 'app-1',
    title: 'WingMentor Web Portal',
    description: 'Access your learning dashboard, track progress, and manage your pilot training journey.',
    icon: 'Monitor',
    linkText: 'Open Portal',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'app-w1000',
    title: 'w1000 Simulator',
    description: 'High-fidelity flight simulation mapping application. Requires a large screen display for operational safety.',
    icon: 'Cpu',
    desktopOnly: true,
    linkText: 'Launch Engine',
    badge: 'Desktop',
    image: 'https://images.unsplash.com/photo-1569426915220-33513a96cd84?q=80&w=600&auto=format&fit=crop'
  }
];

interface CardProps {
  item: CardItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="horizontal-card" data-desktop-only={item.desktopOnly ? "true" : "false"} style={{ cursor: 'pointer', padding: 0 }} onClick={item.onClickAction || (() => alert(`Opening ${item.title}`))}>
      {item.image && (
        <div className="horizontal-card-img" style={{ padding: '1.5rem', paddingRight: 0, width: '280px', flexShrink: 0 }}>
          <div style={{ aspectRatio: '16/9', position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <img src={item.image} alt={item.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {item.badge && (
            <span className={`badge ${item.badge === 'New' ? 'badge-new' : 'badge-pro'}`} style={{ top: '1.5rem', right: '0.5rem' }}>
              {item.badge}
            </span>
          )}
        </div>
      )}
      <div className="horizontal-card-content" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 className="horizontal-card-title" style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.5rem' }}>{item.title}</h3>

        {item.desktopOnly && (
          <div className="desktop-only-warning" style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem', padding: '0.25rem 0.5rem' }}>
            App not available on mobile
          </div>
        )}

        <p className="horizontal-card-desc" style={{ marginBottom: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {item.description}
        </p>
      </div>
      <div className="hub-card-arrow" style={{ alignSelf: 'center', marginRight: '2rem', marginLeft: 'auto' }}>
        <Icons.ArrowRight style={{ width: 24, height: 24 }} />
      </div>
    </div>
  );
};

import { CloudBackground } from './components/CloudBackground';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FoundationalProgramPage } from './pages/FoundationalProgramPage';
import { HubPage } from './pages/HubPage';
import { ATPLPathwayPage } from './pages/ATPLPathwayPage';
import { EmergingAirTaxiPage } from './pages/EmergingAirTaxiPage';
import { PrivateSectorPage } from './pages/PrivateSectorPage';
import { LoginPage } from './pages/LoginPage';
import { EnrollmentOnboardingPage } from './pages/EnrollmentOnboardingPage';
import { PostEnrollmentSlideshow } from './pages/PostEnrollmentSlideshow';
import { AIScreeningPage } from './pages/AIScreeningPage';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [currentView, setCurrentView] = useState<
    'login' | 'hub' | 'dashboard' | 'programs' | 'pathways' | 'applications' |
    'foundational' | 'atpl' | 'airtaxi' | 'privatesector' | 'foundational-onboarding' | 'post-enrollment-slideshow' | 'ai-screening'
  >('login');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentView('hub');
      } else {
        setCurrentView('login');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setCurrentView('hub');
    }, 4500);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setCurrentView('login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hydrate onClickActions
  programs[0].onClickAction = () => setCurrentView('foundational');

  if (pathways.length >= 3) {
    pathways[0].onClickAction = () => setCurrentView('atpl');
    pathways[1].onClickAction = () => setCurrentView('airtaxi');
    pathways[2].onClickAction = () => setCurrentView('privatesector');
  }

  return (
    <>
      <CloudBackground variant={currentView === 'login' || showLoading ? 'dark' : 'light'} />
      {showLoading ? (
        <div className="loading-screen animate-fade-out-delay">
          <div className="loading-content">
            <div className="loading-logo-container">
              <img src="/logo.png" alt="WingMentor Logo" className="loading-logo" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
              <div className="loading-logo-fallback hidden">
                <Icons.Logo />
                <div className="loading-logo-text">WING MENTOR</div>
              </div>
            </div>
            <div className="loading-text-container">
              <h1 className="loading-text text-welcome">Welcome</h1>
              <h1 className="loading-text text-fellow">Fellow pilot.</h1>
            </div>
            <div className="loading-footer-text">V2.4.1 - FLIGHT TRAINING SYSTEMS</div>
          </div>
        </div>
      ) : currentView === 'login' ? (
        <LoginPage onLogin={handleLogin} />
      ) : currentView === 'hub' ? (
        <HubPage onSelectCategory={(category) => setCurrentView(category)} onLogout={handleLogout} />
      ) : currentView === 'foundational' ? (
        <FoundationalProgramPage
          onBack={() => setCurrentView('programs')}
          onLogout={handleLogout}
          onStartEnrollment={() => setCurrentView('foundational-onboarding')}
          onStartSlideshow={() => setCurrentView('post-enrollment-slideshow')}
        />
      ) : currentView === 'foundational-onboarding' ? (
        <EnrollmentOnboardingPage
          onComplete={() => setCurrentView('post-enrollment-slideshow')}
          onBackToPrograms={() => setCurrentView('foundational')}
          onLogout={handleLogout}
        />
      ) : currentView === 'post-enrollment-slideshow' ? (
        <PostEnrollmentSlideshow
          onComplete={() => setCurrentView('foundational')}
        />
      ) : currentView === 'ai-screening' ? (
        <AIScreeningPage
          onBack={() => setCurrentView('foundational')}
          onLogout={handleLogout}
        />
      ) : currentView === 'atpl' ? (
        <ATPLPathwayPage onBack={() => setCurrentView('pathways')} onLogout={handleLogout} />
      ) : currentView === 'airtaxi' ? (
        <EmergingAirTaxiPage onBack={() => setCurrentView('pathways')} onLogout={handleLogout} />
      ) : currentView === 'privatesector' ? (
        <PrivateSectorPage onBack={() => setCurrentView('pathways')} onLogout={handleLogout} />
      ) : (
        <div className="dashboard-container animate-fade-in">
          <main className="dashboard-card" style={{ position: 'relative' }}>
            <button className="platform-logout-btn" onClick={handleLogout}>
              <Icons.LogOut style={{ width: 16, height: 16 }} />
              Logout
            </button>
            <div className="dashboard-header" style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '0', left: '0' }}>
                <button
                  className="back-btn"
                  onClick={() => setCurrentView('hub')}
                  style={{
                    padding: '0.5rem 0',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#475569',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#0f172a';
                    e.currentTarget.style.transform = 'translateX(-4px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '#475569';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Icons.ArrowLeft style={{ width: 16, height: 16 }} /> Back to Hub
                </button>
              </div>
              <div className="dashboard-logo" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <img src="/logo.png" alt="WingMentor Logo" style={{ maxWidth: '240px' }} />
              </div>
              <div className="dashboard-subtitle">WINGMENTOR NETWORK</div>
              <h1 className="dashboard-title" style={{ textTransform: 'capitalize' }}>
                {currentView === 'applications' ? 'Applications & Systems' : currentView}
              </h1>
              <p>
                {currentView === 'programs' && "Explore the Foundational and Transition curriculums designed to build your core flying mechanics."}
                {currentView === 'pathways' && "View structured career roadmaps including the Emirates ATPL, Commercial, and Air Taxi tracks."}
                {currentView === 'applications' && "Access operational web-apps and high-fidelity flight simulation systems required for training."}
              </p>
            </div>

            {currentView === 'programs' && (
              <section className="dashboard-section">
                <div className="cards-list" style={{ marginTop: '1rem' }}>
                  {programs.map(item => <Card key={item.id} item={item} />)}
                </div>
              </section>
            )}

            {currentView === 'pathways' && (
              <section className="dashboard-section">
                <div className="cards-list" style={{ marginTop: '1rem' }}>
                  {pathways.map(item => <Card key={item.id} item={item} />)}
                </div>
              </section>
            )}

            {currentView === 'applications' && (
              <section className="dashboard-section">
                <div className="cards-list" style={{ marginTop: '1rem' }}>
                  {applications.map(item => <Card key={item.id} item={item} />)}
                </div>
                {isMobile && (
                  <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '8px', textAlign: 'center', fontSize: '0.875rem' }}>
                    Note: Some applications (like w1000) are hidden or disabled on this device because they require a Desktop or iPad sized screen.
                  </div>
                )}
              </section>
            )}
            {currentView === 'programs' && (
              <div style={{
                marginTop: '3.5rem',
                padding: '2rem 2.5rem',
                backgroundColor: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%'
              }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  marginBottom: '1rem',
                  fontWeight: 400
                }}>
                  Need assistance or have questions about our programs?
                </p>
                <button
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #cbd5e1',
                    color: '#334155',
                    padding: '0.625rem 1.5rem',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                  }}
                >
                  Contact Support
                </button>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
