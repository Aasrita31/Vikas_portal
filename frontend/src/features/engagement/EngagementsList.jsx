import React, { useState } from 'react';
import { 
  Cpu, 
  Building2, 
  Users, 
  GraduationCap, 
  Link, 
  Map, 
  Layers, 
  Network, 
  UserCheck,
  ShieldCheck,
  X
} from 'lucide-react';
import SchoolDetailPage from './SchoolDetailPage';
import TechDevDetailPage from './TechDevDetailPage';
import SpinLabDetailPage from './SpinLabDetailPage';

export default function EngagementsList({ applications = [], onNavigateToTab, onAddApplication }) {
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [showSchoolDetail, setShowSchoolDetail] = useState(false);
  const [showTechDevDetail, setShowTechDevDetail] = useState(() => {
    return typeof window !== 'undefined' && window.location.pathname.startsWith('/vikas/technology-development');
  });
  const [showLabNetDetail, setShowLabNetDetail] = useState(false);

  React.useEffect(() => {
    const handlePop = () => {
      if (window.location.pathname.startsWith('/vikas/technology-development')) {
        setShowTechDevDetail(true);
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Group 9 Verticals matching the exact titles requested
  const verticalsData = [
    {
      id: 'TECH_DEV',
      title: 'Technology Development',
      code: '6.1',
      icon: Cpu,
      color: '#10b981', // emerald green
      desc: 'Prototype development and lab translation projects.',
      items: [
        'TDP projects',
        'Prototype development',
        'Lab integration (Geo-Intel, PNT, CV, etc.)',
        'Industry-driven R&D'
      ]
    },
    {
      id: 'STARTUP',
      title: 'Startups & Business Enablement',
      code: '6.2',
      icon: Building2,
      color: '#d97706', // amber gold
      desc: 'Onboarding support, project allocation and deployment.',
      items: [
        'Startup onboarding',
        'Project allocation',
        'Revenue generation',
        'Deployment support'
      ]
    },
    {
      id: 'HRD',
      title: 'Human Resource Development',
      code: '6.3',
      icon: Users,
      color: '#3b82f6', // blue
      desc: 'Research fellowships, Chanakya scholars and internships.',
      items: [
        'Fellowships (Post-doc, Faculty)',
        'Internships',
        'Chanakya Fellows'
      ]
    },
    {
      id: 'SKILL',
      title: 'Skill Development',
      code: '6.4',
      icon: GraduationCap,
      color: '#8b5cf6', // purple
      desc: 'Govt training and industry upskilling certifications.',
      items: [
        'Govt training programs',
        'Industry upskilling',
        'Certification programs'
      ]
    },
    {
      id: 'COLLAB',
      title: 'Collaborations & Partnerships',
      code: '6.5',
      icon: Link,
      color: '#f59e0b', // orange
      desc: 'MoUs, strategic alliances and international programs.',
      items: [
        'MoUs & strategic alliances',
        'International programs',
        'Academic collaborations'
      ]
    },
    {
      id: 'SCHOOL',
      title: 'Schools & Academic Outreach',
      code: '6.6',
      icon: Map,
      color: '#06b6d4', // cyan
      desc: 'Teacher training and spatial school learning programs.',
      items: [
        'Spatial learning programs',
        'Teacher training',
        'High school GIS mapping and academic outreach'
      ]
    },
    {
      id: 'LAB_NET',
      title: 'Institutions & Labs Network',
      code: '6.7',
      icon: Layers,
      color: '#ec4899', // pink
      desc: 'Joint Centres of Excellence, SPIN and PNT Labs.',
      items: [
        'SPIN Labs',
        'PNT Labs',
        'Centres of Excellence'
      ]
    },
    {
      id: 'INDUSTRY',
      title: 'Industry & Government Interface',
      code: '6.8',
      icon: Network,
      color: '#f43f5e', // rose
      desc: 'Problem statements, consultancy and pilot runs.',
      items: [
        'Problem statements',
        'Consultancy & PILOT deployments',
        'Govt projects interface'
      ]
    },
    {
      id: 'EXPERT',
      title: 'Experts & Advisory Network',
      code: '6.9',
      icon: UserCheck,
      color: '#64748b', // slate
      desc: 'Mentoring panel onboarding and peer review panels.',
      items: [
        'Expert onboarding & review panels',
        'Mentoring and advisory network',
        'Strategic advisor logs'
      ]
    }
  ];

  // Helper to get approved files in a specific vertical
  const getActiveFilesInVertical = (verticalId) => {
    return applications.filter(
      app => app.status === 'approved' && app.assignedVertical === verticalId
    );
  };

  const activeVerticalData = verticalsData.find(v => v.id === selectedVertical);
  const activeFilesForSelected = selectedVertical ? getActiveFilesInVertical(selectedVertical) : [];

  const handleCardClick = (vertId) => {
    if (vertId === 'SCHOOL') {
      window.history.pushState({}, '', '/vikas/schools');
      setShowSchoolDetail(true);
    } else if (vertId === 'TECH_DEV') {
      window.history.pushState({}, '', '/vikas/technology-development');
      setShowTechDevDetail(true);
    } else if (vertId === 'LAB_NET') {
      window.history.pushState({}, '', '/vikas/labs');
      setShowLabNetDetail(true);
    } else {
      setSelectedVertical(vertId);
    }
  };

  if (showSchoolDetail) {
    return (
      <SchoolDetailPage 
        onBack={() => {
          setShowSchoolDetail(false);
          window.history.pushState({}, '', '/');
        }} 
        onRegister={() => onNavigateToTab ? onNavigateToTab('entry') : null} 
      />
    );
  }

  if (showTechDevDetail) {
    return (
      <TechDevDetailPage 
        onBack={() => {
          setShowTechDevDetail(false);
          window.history.pushState({}, '', '/');
        }} 
        onRegister={() => onNavigateToTab ? onNavigateToTab('entry') : null} 
        onAddApplication={onAddApplication}
        applications={applications}
      />
    );
  }

  if (showLabNetDetail) {
    return (
      <SpinLabDetailPage 
        onBack={() => {
          setShowLabNetDetail(false);
          window.history.pushState({}, '', '/');
        }} 
      />
    );
  }

  return (
    <div className="verticals-directory animate-fade-in">
      {/* 9 Verticals Responsive Square Grid */}
      <div className="verticals-square-grid">
        {verticalsData.map((vert) => {
          const IconComponent = vert.icon;
          
          return (
            <button 
              key={vert.id} 
              className="vertical-square-card" 
              onClick={() => handleCardClick(vert.id)}
            >
              {/* Top-Left: Icon block in a square wrapper */}
              <div 
                className="vert-square-icon-box"
                style={{ 
                  backgroundColor: `${vert.color}08`, 
                  border: `1px solid ${vert.color}20`,
                  color: vert.color
                }}
              >
                <IconComponent size={26} />
              </div>
              
              {/* Title Section */}
              <h4 className="vert-square-title">
                <span className="vert-square-code">{vert.code}</span> {vert.title}
              </h4>
              
              {/* Description Section */}
              <p className="vert-square-desc">
                {vert.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Modal Details Overlay when a vertical card is clicked */}
      {selectedVertical && activeVerticalData && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setSelectedVertical(null)}>
          <div className="modal-content-card card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header-section" style={{ borderBottom: `2px solid ${activeVerticalData.color}` }}>
              <div className="modal-header-brand">
                <div 
                  className="modal-icon-bg"
                  style={{ 
                    backgroundColor: `${activeVerticalData.color}15`, 
                    border: `1px solid ${activeVerticalData.color}35` 
                  }}
                >
                  {React.createElement(activeVerticalData.icon, { 
                    size: 26, 
                    style: { color: activeVerticalData.color } 
                  })}
                </div>
                <div>
                  <h3>{activeVerticalData.code} {activeVerticalData.title}</h3>
                  <span className="badge badge-info">Programs & Opportunities</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedVertical(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="modal-body-scroll">
              {/* Key Activities List */}
              <div className="modal-info-block">
                <span className="modal-section-label">KEY ACTIVITIES & OPPORTUNITIES</span>
                <ul className="modal-activities-list">
                  {activeVerticalData.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Active Engagements / Files list */}
              {activeFilesForSelected.length > 0 && (
                <div className="modal-info-block border-top-dashed">
                  <span className="modal-section-label">ACTIVE ENGAGEMENTS IN REGISTRY</span>
                  <div className="modal-files-list">
                    {activeFilesForSelected.map((file) => (
                      <div key={file.fileNumber} className="modal-file-card">
                        <div className="modal-file-meta-row">
                          <span className="file-title-text">{file.name}</span>
                          <span className="file-id-code font-mono">{file.fileNumber}</span>
                        </div>
                        
                        <div className="modal-file-meta-grid">
                          <div className="meta-grid-item">
                            <span>Manager Email:</span>
                            <strong>{file.email}</strong>
                          </div>
                          <div className="meta-grid-item">
                            <span>Focus Priority:</span>
                            <strong>{file.nmIcpsAlign}</strong>
                          </div>
                          {file.fundingRequested !== '0' && (
                            <div className="meta-grid-item">
                              <span>Budget Mapped:</span>
                              <strong className="text-success">₹ {file.fundingRequested}</strong>
                            </div>
                          )}
                          <div className="meta-grid-item">
                            <span>Digital Signature:</span>
                            <strong className="text-accent flex items-center gap-4">
                              <ShieldCheck size={12} className="text-success" />
                              {file.eSignature || 'PD Office'}
                            </strong>
                          </div>
                        </div>

                        {file.trl && (
                          <div className="modal-trl-section">
                            <div className="trl-text-row">
                              <span>Technology Readiness Level</span>
                              <strong>TRL {file.trl} / 6</strong>
                            </div>
                            <div className="trl-bar-container">
                              <div className="trl-bar-fill-track" style={{ width: `${((file.trl - 2) / 4) * 100}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .verticals-directory {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 16px 20px 48px;
        }

        /* 3x3 Perfectly Symmetrical Grid (3 cards per row, 3 rows total = 9 cards) */
        .verticals-square-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .verticals-square-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .verticals-square-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        /* Square Card Styling with refined padding and uniform internal structure */
        .vertical-square-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 28px 26px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          width: 100%;
          min-height: 215px;
          cursor: pointer;
          transition: all var(--transition-normal);
          box-shadow: var(--shadow-sm);
          position: relative;
        }

        .vertical-square-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-color-active);
          box-shadow: var(--shadow-md);
        }

        /* Square Icon Wrapper */
        .vert-square-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          flex-shrink: 0;
          transition: transform var(--transition-fast);
        }

        .vertical-square-card:hover .vert-square-icon-box {
          transform: scale(1.05);
        }

        /* Title with uniform min-height for clean baseline alignment across cards */
        .vert-square-title {
          font-size: 16.5px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          margin-bottom: 10px;
          min-height: 44px;
          display: flex;
          align-items: flex-start;
        }

        .vert-square-code {
          color: var(--text-muted);
          font-weight: 600;
          margin-right: 6px;
          flex-shrink: 0;
        }

        /* Clean Description styling */
        .vert-square-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          font-weight: 400;
          margin: 0;
        }

        /* Modal Details Overlay Styling */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 20px;
        }

        .modal-content-card {
          width: 100%;
          max-width: 550px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color-active);
          background-color: var(--bg-surface);
        }

        .modal-header-section {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--bg-primary);
        }

        .modal-header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-icon-bg {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .modal-header-brand h3 {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        /* Modal Scroll Body */
        .modal-body-scroll {
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-info-block {
          display: flex;
          flex-direction: column;
        }

        .border-top-dashed {
          border-top: 1px dashed var(--border-color);
          padding-top: 20px;
        }

        .modal-section-label {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.8px;
          color: var(--text-muted);
          margin-bottom: 12px;
          display: block;
        }

        .modal-activities-list {
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-activities-list li {
          font-size: 12px;
          color: var(--text-secondary);
          position: relative;
          padding-left: 14px;
          line-height: 1.4;
        }

        .modal-activities-list li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--color-accent);
          font-weight: 700;
        }

        /* Modal Active Engagements */
        .modal-files-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .modal-file-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
        }

        .modal-file-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 6px;
        }

        .file-title-text {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .file-id-code {
          font-size: 10px;
          color: var(--color-accent);
          font-weight: 600;
        }

        .modal-file-meta-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 10px;
        }

        .meta-grid-item {
          display: flex;
          flex-direction: column;
        }

        .meta-grid-item span {
          font-size: 9px;
          color: var(--text-muted);
        }

        .meta-grid-item strong {
          font-size: 11px;
          color: var(--text-secondary);
          word-break: break-all;
        }

        /* TRL inside Modal */
        .modal-trl-section {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 8px;
          border-radius: var(--radius-sm);
        }

        .trl-text-row {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: var(--text-secondary);
          margin-bottom: 4px;
          font-weight: 600;
        }

        .trl-bar-container {
          width: 100%;
          height: 3px;
          background-color: var(--bg-primary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .trl-bar-fill-track {
          height: 100%;
          background: linear-gradient(90deg, var(--color-accent), var(--color-success));
        }

        .font-mono {
          font-family: 'Courier New', Courier, monospace;
        }

        /* Animations */
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-slide-up {
          animation: slideUp 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
