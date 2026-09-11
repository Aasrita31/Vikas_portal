import React, { useState, useEffect, useRef } from 'react';
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
  X,
  Sparkles,
  Rocket,
  Compass,
  ArrowRight,
  CheckCircle2,
  Filter
} from 'lucide-react';
import SchoolDetailPage from './SchoolDetailPage';
import TechDevDetailPage from './TechDevDetailPage';
import SpinLabDetailPage from './SpinLabDetailPage';

export default function EngagementsList({ 
  applications = [], 
  onNavigateToTab, 
  onAddApplication,
  highlightedTrack = 'Startup'
}) {
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [showSchoolDetail, setShowSchoolDetail] = useState(false);
  const [showTechDevDetail, setShowTechDevDetail] = useState(() => {
    return typeof window !== 'undefined' && window.location.pathname.startsWith('/vikas/technology-development');
  });
  const [showLabNetDetail, setShowLabNetDetail] = useState(false);

  // Helper to map track string to Vertical ID
  const mapTrackToVerticalId = (track) => {
    if (!track) return 'STARTUP';
    const t = String(track).toUpperCase();
    if (t.includes('STARTUP')) return 'STARTUP';
    if (t.includes('STUDENT') || t.includes('RESEARCH') || t.includes('HRD')) return 'HRD';
    if (t.includes('SCHOOL') || t.includes('OUTREACH') || t.includes('VIDYAGIS')) return 'SCHOOL';
    if (t.includes('INSTITUT') || t.includes('LAB') || t.includes('SPIN')) return 'LAB_NET';
    if (t.includes('INDUSTRY') || t.includes('GOVT') || t.includes('GOVERNMENT')) return 'INDUSTRY';
    if (t.includes('EXPERT') || t.includes('MENTOR') || t.includes('ADVISORY')) return 'EXPERT';
    if (t.includes('TECH') || t.includes('TDP') || t.includes('PROTOTYPE')) return 'TECH_DEV';
    if (t.includes('SKILL')) return 'SKILL';
    if (t.includes('COLLAB')) return 'COLLAB';
    return 'STARTUP';
  };

  const initialVerticalId = mapTrackToVerticalId(highlightedTrack);
  const [activePreference, setActivePreference] = useState(initialVerticalId);
  const [pulseAnim, setPulseAnim] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    const handlePop = () => {
      if (window.location.pathname.startsWith('/vikas/technology-development')) {
        setShowTechDevDetail(true);
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Sync preference if highlightedTrack prop changes
  useEffect(() => {
    const mapped = mapTrackToVerticalId(highlightedTrack);
    setActivePreference(mapped);
    setPulseAnim(true);
    const timer = setTimeout(() => setPulseAnim(false), 4000);
    return () => clearTimeout(timer);
  }, [highlightedTrack]);

  // Group 9 Verticals matching the exact titles requested
  const verticalsData = [
    {
      id: 'TECH_DEV',
      title: 'Technology Development',
      code: '6.1',
      icon: Cpu,
      color: '#10b981', // emerald green
      desc: 'Prototype development, lab translation, and hardware testbed validation projects.',
      tag: 'TRL 3–7 Acceleration',
      items: [
        'TDP projects & Grand Challenges',
        'Prototype development & bench-testing',
        'Lab integration (Geo-Intel, PNT, CV, Sensors)',
        'Industry-driven R&D pipelines'
      ]
    },
    {
      id: 'STARTUP',
      title: 'Startups & Business Enablement',
      code: '6.2',
      icon: Building2,
      color: '#d97706', // amber gold
      desc: 'Deep-tech startup incubation, prototype grant support, commercial pilot deployment, and investor access.',
      tag: 'Incubation & Grants',
      items: [
        'Startup onboarding & acceleration',
        'Seed funding & milestone-based capital',
        'Commercial revenue generation support',
        'National deployment & market access'
      ]
    },
    {
      id: 'HRD',
      title: 'Human Resource Development',
      code: '6.3',
      icon: Users,
      color: '#3b82f6', // blue
      desc: 'Chanakya Post-Doc fellowships, graduate research stipends, faculty research grants, and specialized internships.',
      tag: 'Chanakya Fellowships',
      items: [
        'Chanakya Post-Doctoral & Doctoral Fellowships',
        'Undergraduate & Master Research Internships',
        'Faculty-guided deep-tech project grants',
        'National Cyber-Physical talent pipeline'
      ]
    },
    {
      id: 'SKILL',
      title: 'Skill Development',
      code: '6.4',
      icon: GraduationCap,
      color: '#8b5cf6', // purple
      desc: 'Government capacity building, professional certifications, and industry workforce upskilling in CPS & GIS.',
      tag: 'National Certifications',
      items: [
        'Government officer training programs',
        'Industry workforce upskilling cohorts',
        'PNT, NavIC & Spatial Analytics certifications',
        'Hands-on sensor testbed workshops'
      ]
    },
    {
      id: 'COLLAB',
      title: 'Collaborations & Partnerships',
      code: '6.5',
      icon: Link,
      color: '#f59e0b', // orange
      desc: 'Institutional MoUs, cross-hub strategic alliances, international consortia, and co-development charters.',
      tag: 'Strategic MoUs',
      items: [
        'National Hub-to-Hub collaborations',
        'International research & innovation alliances',
        'Academic-Industry co-creation agreements',
        'Inter-agency geospatial data consortium'
      ]
    },
    {
      id: 'SCHOOL',
      title: 'Schools & Academic Outreach',
      code: '6.6',
      icon: Map,
      color: '#06b6d4', // cyan
      desc: 'VidyaGIS spatial learning kits, Atal Tinkering Lab mentorship, and secondary school teacher training.',
      tag: 'VidyaGIS & ATLs',
      items: [
        'VidyaGIS Spatial intelligence learning kits',
        'Atal Tinkering Labs (ATL) technical mentoring',
        'K-12 STEM & GIS teacher training modules',
        'High school student innovation challenges'
      ]
    },
    {
      id: 'LAB_NET',
      title: 'Institutions & Labs Network',
      code: '6.7',
      icon: Layers,
      color: '#ec4899', // pink
      desc: 'Joint Centres of Excellence, Spatial Intelligence (SPIN) Labs, and distributed NavIC testing facilities.',
      tag: 'SPIN & PNT Labs',
      items: [
        'Spatial Intelligence (SPIN) Labs setup',
        'NavIC & GNSS precision testing nodes',
        'Centres of Excellence (CoE) infrastructure',
        'Multi-university distributed testbed grid'
      ]
    },
    {
      id: 'INDUSTRY',
      title: 'Industry & Government Interface',
      code: '6.8',
      icon: Network,
      color: '#f43f5e', // rose
      desc: 'Public sector problem statements, MSME testbed access, technology licensing, and pilot procurement.',
      tag: 'MSME & Govt Pilots',
      items: [
        'Ministry & PSU problem statements interface',
        'Technology transfer & licensing agreements',
        'MSME hardware testbed access & procurement',
        'State government field pilot deployments'
      ]
    },
    {
      id: 'EXPERT',
      title: 'Experts & Advisory Network',
      code: '6.9',
      icon: UserCheck,
      color: '#64748b', // slate
      desc: 'Domain specialist registry, technical evaluation panels, strategic mentorship, and peer review committees.',
      tag: 'Advisory Panel',
      items: [
        'Domain expert onboarding & registry',
        'Technical evaluation & review committees',
        'Founders mentorship & advisory logs',
        'National technology roadmap contributions'
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
  const preferenceVerticalObj = verticalsData.find(v => v.id === activePreference) || verticalsData[1];

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
    <div className="verticals-directory animate-fade-in" ref={gridRef}>
      {/* 1. Dynamic User Preference & Spotlight Banner */}
      {preferenceVerticalObj && (
        <div 
          className="verticals-preference-spotlight animate-slide-down"
          style={{ 
            borderLeft: `5px solid ${preferenceVerticalObj.color}`,
            background: `linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, ${preferenceVerticalObj.color}15 100%)`
          }}
        >
          <div className="spotlight-left">
            <div 
              className="spotlight-badge"
              style={{ 
                backgroundColor: `${preferenceVerticalObj.color}18`, 
                color: preferenceVerticalObj.color,
                borderColor: `${preferenceVerticalObj.color}35`
              }}
            >
              <Sparkles size={14} className="sparkle-icon" />
              <span>ALIGNED TO YOUR TRACK: {highlightedTrack?.toUpperCase() || 'STARTUP'}</span>
            </div>
            
            <h2 className="spotlight-title">
              <span className="spotlight-code" style={{ color: preferenceVerticalObj.color }}>
                Vertical {preferenceVerticalObj.code}:
              </span>{' '}
              {preferenceVerticalObj.title}
            </h2>
            
            <p className="spotlight-desc">
              {preferenceVerticalObj.desc}
            </p>
          </div>

          <div className="spotlight-actions">
            <button 
              type="button" 
              className="btn-spotlight-dive"
              style={{ backgroundColor: preferenceVerticalObj.color }}
              onClick={() => handleCardClick(preferenceVerticalObj.id)}
            >
              <span>Explore Programs & Guidelines</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* 2. Interactive Track / Preference Filter Bar */}
      <div className="verticals-filter-bar">
        <div className="filter-bar-header">
          <div className="filter-title-group">
            <Filter size={15} className="text-amber" />
            <span className="filter-bar-title">Filter & Highlight by Stakeholder Track:</span>
          </div>
          {activePreference !== 'ALL' && (
            <button 
              type="button" 
              className="btn-filter-showall"
              onClick={() => setActivePreference('ALL')}
            >
              Show All 9 Verticals
            </button>
          )}
        </div>

        <div className="vertical-filter-pills-row">
          <button 
            type="button"
            className={`vert-filter-pill ${activePreference === 'ALL' ? 'active-all' : ''}`}
            onClick={() => setActivePreference('ALL')}
          >
            All 9 Verticals
          </button>
          {verticalsData.map((v) => {
            const isSelected = activePreference === v.id;
            return (
              <button
                type="button"
                key={v.id}
                className={`vert-filter-pill ${isSelected ? 'active' : ''}`}
                style={isSelected ? { 
                  borderColor: v.color, 
                  color: v.color, 
                  backgroundColor: `${v.color}18`,
                  fontWeight: 700 
                } : {}}
                onClick={() => {
                  setActivePreference(v.id);
                  setPulseAnim(true);
                }}
              >
                <span>{v.code} {v.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 9 Verticals Responsive Square Grid with Animated Highlight */}
      <div className="verticals-square-grid">
        {verticalsData.map((vert) => {
          const IconComponent = vert.icon;
          const isHighlighted = activePreference === vert.id;
          const isFaded = activePreference !== 'ALL' && !isHighlighted;
          
          return (
            <button 
              key={vert.id} 
              className={`vertical-square-card ${isHighlighted ? 'highlighted-track-card' : ''} ${isFaded ? 'faded-card' : ''}`} 
              style={isHighlighted ? {
                borderColor: vert.color,
                boxShadow: `0 0 0 2px ${vert.color}, 0 16px 36px ${vert.color}25`
              } : {}}
              onClick={() => handleCardClick(vert.id)}
            >
              {/* Highlight Badge */}
              {isHighlighted && (
                <div 
                  className="user-selected-badge animate-fade-in"
                  style={{ backgroundColor: vert.color }}
                >
                  <Sparkles size={11} />
                  <span>Your Aligned Track</span>
                </div>
              )}

              {/* Top-Left: Icon block in a square wrapper */}
              <div 
                className={`vert-square-icon-box ${isHighlighted ? 'icon-box-pulsing' : ''}`}
                style={{ 
                  backgroundColor: `${vert.color}12`, 
                  border: `1px solid ${vert.color}35`,
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

              {/* Card Footer Pill */}
              <div className="vert-card-footer">
                <span 
                  className="vert-tag-pill"
                  style={{ 
                    backgroundColor: `${vert.color}10`,
                    color: vert.color,
                    border: `1px solid ${vert.color}25`
                  }}
                >
                  {vert.tag}
                </span>
                <span className="vert-explore-cta">
                  Explore <ArrowRight size={13} />
                </span>
              </div>
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

        /* Preference Spotlight Banner */
        .verticals-preference-spotlight {
          padding: 24px 28px;
          margin-bottom: 24px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .spotlight-left {
          flex: 1;
          min-width: 280px;
        }

        .spotlight-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid transparent;
          letter-spacing: 0.6px;
          margin-bottom: 10px;
        }

        .sparkle-icon {
          animation: spinPulse 3s linear infinite;
        }

        @keyframes spinPulse {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .spotlight-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .spotlight-code {
          font-weight: 900;
        }

        .spotlight-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
          max-width: 780px;
        }

        .spotlight-actions {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .btn-spotlight-dive {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 700;
          padding: 12px 20px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }

        .btn-spotlight-dive:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
        }

        /* Filter Bar */
        .verticals-filter-bar {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 14px 18px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }

        .filter-bar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .filter-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-bar-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .btn-filter-showall {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 11.5px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-filter-showall:hover {
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }

        .vertical-filter-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .vert-filter-pill {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .vert-filter-pill:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .vert-filter-pill.active {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        /* 3x3 Symmetrical Grid */
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

        /* Square Card Styling */
        .vertical-square-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          width: 100%;
          min-height: 230px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-sm);
          position: relative;
        }

        .vertical-square-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-color-active);
          box-shadow: var(--shadow-md);
        }

        /* Highlighted Pop & Glow Card */
        .highlighted-track-card {
          transform: translateY(-6px) scale(1.02);
          animation: cardPopGlow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          background: linear-gradient(180deg, var(--bg-surface) 0%, #fafcff 100%);
          z-index: 2;
        }

        @keyframes cardPopGlow {
          0% {
            transform: scale(0.96) translateY(0);
          }
          50% {
            transform: scale(1.035) translateY(-8px);
          }
          100% {
            transform: scale(1.02) translateY(-6px);
          }
        }

        .faded-card {
          opacity: 0.72;
          transition: opacity 0.25s ease;
        }

        .faded-card:hover {
          opacity: 1;
        }

        /* User Selected Badge */
        .user-selected-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
          letter-spacing: 0.4px;
        }

        /* Square Icon Wrapper */
        .vert-square-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .icon-box-pulsing {
          animation: iconPulse 2s infinite ease-in-out;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .vertical-square-card:hover .vert-square-icon-box {
          transform: scale(1.06);
        }

        /* Title */
        .vert-square-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          margin-bottom: 8px;
          min-height: 42px;
          display: flex;
          align-items: flex-start;
        }

        .vert-square-code {
          color: var(--text-muted);
          font-weight: 600;
          margin-right: 6px;
          flex-shrink: 0;
        }

        /* Description */
        .vert-square-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          font-weight: 400;
          margin: 0 0 16px 0;
          flex: 1;
        }

        /* Card Footer */
        .vert-card-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
          margin-top: auto;
        }

        .vert-tag-pill {
          font-size: 10.5px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .vert-explore-cta {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 3px;
          transition: color 0.15s ease;
        }

        .vertical-square-card:hover .vert-explore-cta {
          color: var(--color-accent);
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
