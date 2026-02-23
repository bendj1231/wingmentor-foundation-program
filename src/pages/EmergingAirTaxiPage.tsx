import React from 'react';
import { Icons } from '../App';

interface EmergingAirTaxiPageProps {
    onBack: () => void;
    onLogout: () => void;
}

export const EmergingAirTaxiPage: React.FC<EmergingAirTaxiPageProps> = ({ onBack, onLogout }) => {
    return (
        <div className="dashboard-container animate-fade-in">
            <main className="dashboard-card" style={{ position: 'relative' }}>
                <button className="platform-logout-btn" onClick={onLogout}>
                    <Icons.LogOut style={{ width: 16, height: 16 }} />
                    Logout
                </button>
                <div className="dashboard-header" style={{ marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                    <button onClick={onBack} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                        <Icons.ArrowLeft style={{ width: 16, height: 16 }} /> Back to Pathways
                    </button>
                    <div className="dashboard-subtitle">PATHWAY PROGRAM</div>
                    <h1 className="dashboard-title" style={{ fontSize: '2.5rem' }}>Emerging Air Taxi Pathway</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                        A specialized curriculum focusing on eVTOL operations, urban air mobility, and the future of short-hop aerial transit.
                    </p>
                </div>
                <section className="dashboard-section" style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
                    <h2>Pathway Curriculum Coming Soon</h2>
                    <p>This module is currently under development.</p>
                </section>
            </main>
        </div>
    );
};
