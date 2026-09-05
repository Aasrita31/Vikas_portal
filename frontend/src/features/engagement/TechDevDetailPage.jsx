import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Cpu, 
  Sparkles, 
  Layers, 
  Activity, 
  ShieldCheck, 
  CheckCircle, 
  ExternalLink, 
  Target, 
  Building2, 
  Zap, 
  Radio, 
  TrendingUp, 
  Briefcase, 
  Award, 
  BookOpen, 
  Binary,
  Layers as LayersIcon,
  ChevronRight,
  Workflow,
  Server,
  X,
  Compass
} from 'lucide-react';
import SpecializedLabsGrid from './SpecializedLabsGrid';
import TrlPipelineView from './TrlPipelineView';
import TdpProjectOpportunities from './TdpProjectOpportunities';
import TdpProjectDetailPage from './TdpProjectDetailPage';
import TdpProposalApplicationFlow from './TdpProposalApplicationFlow';
import TdpApplicationsTracker from './TdpApplicationsTracker';
import TdpApplicationDetailPage from './TdpApplicationDetailPage';
import TdpProjectExecutionWorkspace from './TdpProjectExecutionWorkspace';

export default function TechDevDetailPage({ onBack, onRegister, onAddApplication, applications = [] }) {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' or 'trl'
  const [showIndustryModal, setShowIndustryModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isApplyingTdp, setIsApplyingTdp] = useState(false);
  const [applyProjectContext, setApplyProjectContext] = useState(null);
  const [isTrackingApplications, setIsTrackingApplications] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [selectedExecutionAppId, setSelectedExecutionAppId] = useState(null);

  // Sync route based on browser URL
  React.useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      if (path.startsWith('/vikas/technology-development/execution/')) {
        const execId = path.replace('/vikas/technology-development/execution/', '');
        if (execId) {
          setSelectedExecutionAppId(execId);
          setSelectedApplicationId(null);
          setIsTrackingApplications(false);
          setIsApplyingTdp(false);
          setSelectedProjectId(null);
        }
      } else if (path.startsWith('/vikas/technology-development/applications/')) {
        const appId = path.replace('/vikas/technology-development/applications/', '');
        if (appId) {
          setSelectedApplicationId(appId);
          setSelectedExecutionAppId(null);
          setIsTrackingApplications(false);
          setIsApplyingTdp(false);
          setSelectedProjectId(null);
        }
      } else if (path === '/vikas/technology-development/applications') {
        setIsTrackingApplications(true);
        setSelectedApplicationId(null);
        setSelectedExecutionAppId(null);
        setIsApplyingTdp(false);
        setSelectedProjectId(null);
      } else if (path.startsWith('/vikas/technology-development/projects/')) {
        const projId = path.replace('/vikas/technology-development/projects/', '');
        if (projId) {
          setSelectedProjectId(projId);
          setSelectedExecutionAppId(null);
          setIsTrackingApplications(false);
          setSelectedApplicationId(null);
          setIsApplyingTdp(false);
        }
      } else if (path === '/vikas/technology-development/tdp/apply') {
        setIsApplyingTdp(true);
        setSelectedExecutionAppId(null);
        setIsTrackingApplications(false);
        setSelectedApplicationId(null);
        setSelectedProjectId(null);
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  // Filter approved tech dev applications and industry applications
  const techDevApplications = applications.filter(
    app => app.assignedVertical === 'TECH_DEV' || app.stakeholderType === 'TDP'
  );

  const industryApplications = applications.filter(
    app => app.assignedVertical === 'INDUSTRY' || app.stakeholderType === 'INDUSTRY_GOVT'
  );

  // 4 Core Technology Pillars
  const techPillars = [
    {
      id: 1,
      title: 'TDP Project Allocations',
      desc: 'High-impact competitive grants and capital support for breakthrough hardware and software engineering innovations.',
      icon: Cpu,
      color: '#10b981', // emerald
      badge: 'Grant & Capital',
      ctaText: 'View TDP Projects',
      action: 'projects'
    },
    {
      id: 2,
      title: 'Prototype & TRL Maturation',
      desc: 'Structured translation methodology guiding research from laboratory concept (TRL 3) to verified field prototypes (TRL 6).',
      icon: TrendingUp,
      color: '#0891b2', // cyan
      badge: 'TRL Progression',
      ctaText: 'View TRL Pipeline',
      action: 'trl'
    },
    {
      id: 3,
      title: 'Specialized Lab Integration',
      desc: 'Access to specialized testing infrastructure including Geo-Intelligence, PNT testbeds, and advanced Computer Vision suites.',
      icon: Radio,
      color: '#d97706', // amber gold
      badge: 'Lab Testbeds',
      ctaText: 'Explore Testbeds',
      action: 'labs'
    },
    {
      id: 4,
      title: 'Industry-Driven R&D',
      desc: 'Demand-led co-development opportunities, technology licensing, and institutional spin-off acceleration.',
      icon: Briefcase,
      color: '#8b5cf6', // purple
      badge: 'Industry Interface',
      ctaText: 'View Industry Projects',
      action: 'industry'
    }
  ];

  const handleApplyClick = (contextOrEvent = null) => {
    if (contextOrEvent && typeof contextOrEvent.preventDefault === 'function') {
      contextOrEvent.preventDefault();
      setApplyProjectContext(null);
    } else if (contextOrEvent && typeof contextOrEvent === 'object') {
      setApplyProjectContext(contextOrEvent);
    }
    window.history.pushState({}, '', '/vikas/technology-development/tdp/apply');
    setIsApplyingTdp(true);
    setIsTrackingApplications(false);
    setSelectedApplicationId(null);
    setSelectedProjectId(null);
    setSelectedExecutionAppId(null);
  };

  const handleExploreProjectsClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/vikas/technology-development/projects');
    const projectsSection = document.getElementById('tdp-active-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackApplicationsClick = (e = null) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    window.history.pushState({}, '', '/vikas/technology-development/applications');
    setIsTrackingApplications(true);
    setSelectedApplicationId(null);
    setSelectedExecutionAppId(null);
    setIsApplyingTdp(false);
    setSelectedProjectId(null);
  };

  const handleSelectApplication = (appId) => {
    window.history.pushState({}, '', `/vikas/technology-development/applications/${appId}`);
    setSelectedApplicationId(appId);
    setSelectedExecutionAppId(null);
    setIsTrackingApplications(false);
  };

  const handleNavigateToExecution = (appId) => {
    const targetId = appId || 'IITTNIF-TDP-2026-7193';
    window.history.pushState({}, '', `/vikas/technology-development/execution/${targetId}`);
    setSelectedExecutionAppId(targetId);
    setSelectedApplicationId(null);
    setIsTrackingApplications(false);
    setIsApplyingTdp(false);
    setSelectedProjectId(null);
  };

  const handlePillarAction = (action) => {
    if (action === 'projects') {
      window.history.pushState({}, '', '/vikas/technology-development/projects');
      const el = document.getElementById('tdp-active-projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'trl') {
      setActiveTab('trl');
      window.history.pushState({}, '', '/vikas/technology-development/trl-pipeline');
      const el = document.getElementById('translation-framework');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'labs') {
      setActiveTab('pillars');
      window.history.pushState({}, '', '/vikas/technology-development/testbeds');
      const el = document.getElementById('translation-framework');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'industry') {
      window.history.pushState({}, '', '/vikas/technology-development/industry-projects');
      setShowIndustryModal(true);
    }
  };

  if (selectedExecutionAppId) {
    return (
      <TdpProjectExecutionWorkspace
        applicationId={selectedExecutionAppId}
        onBack={() => {
          setSelectedExecutionAppId(null);
          setIsTrackingApplications(true);
          window.history.pushState({}, '', '/vikas/technology-development/applications');
        }}
        onViewDossier={(appId) => {
          setSelectedExecutionAppId(null);
          handleSelectApplication(appId || selectedExecutionAppId);
        }}
      />
    );
  }

  if (selectedApplicationId) {
    return (
      <TdpApplicationDetailPage 
        applicationId={selectedApplicationId}
        onBack={() => {
          setSelectedApplicationId(null);
          setIsTrackingApplications(true);
          window.history.pushState({}, '', '/vikas/technology-development/applications');
        }}
        onNavigateToApply={() => handleApplyClick()}
        onNavigateToExecution={(appId) => handleNavigateToExecution(appId)}
      />
    );
  }

  if (isTrackingApplications) {
    return (
      <TdpApplicationsTracker 
        onBack={() => {
          setIsTrackingApplications(false);
          window.history.pushState({}, '', '/vikas/technology-development');
        }}
        onSelectApplication={(appId) => handleSelectApplication(appId)}
        onNavigateToApply={() => handleApplyClick()}
        onNavigateToExecution={(appId) => handleNavigateToExecution(appId)}
        applications={applications}
      />
    );
  }

  if (isApplyingTdp) {
    return (
      <TdpProposalApplicationFlow 
        initialProject={applyProjectContext}
        onBack={() => {
          setIsApplyingTdp(false);
          setApplyProjectContext(null);
          window.history.pushState({}, '', '/vikas/technology-development');
        }}
        onNavigateToTrack={(appNumber) => {
          setIsApplyingTdp(false);
          if (appNumber) {
            handleSelectApplication(appNumber);
          } else {
            handleTrackApplicationsClick();
          }
        }}
        onSubmissionSuccess={(receipt) => {
          const newAppRecord = {
            name: receipt.projectTitle,
            contactPerson: receipt.applicantName,
            email: receipt.email,
            phone: receipt.mobile,
            stakeholderType: 'TDP',
            trl: receipt.currentTrl,
            description: receipt.problemStatement,
            nmIcpsAlign: receipt.technologyDomain,
            documentName: receipt.documents?.[0]?.fileName || 'tdp_technical_proposal.pdf',
            isStrategic: true,
            fundingRequested: '3500000',
            fileNumber: receipt.applicationNumber,
            status: 'pending_screening',
            assignedVertical: 'TECH_DEV',
            history: [
              {
                date: receipt.submissionTimestamp,
                action: 'TDP Proposal Submitted',
                user: receipt.applicantName,
                details: `Application ${receipt.applicationNumber} registered for ${receipt.technologyDomain}.`
              }
            ]
          };

          if (onAddApplication) {
            onAddApplication(newAppRecord);
          }
        }}
      />
    );
  }

  if (selectedProjectId) {
    return (
      <TdpProjectDetailPage 
        projectId={selectedProjectId}
        onBack={() => {
          setSelectedProjectId(null);
          window.history.pushState({}, '', '/vikas/technology-development/projects');
        }}
        onApply={(project) => handleApplyClick(project)}
      />
    );
  }

  return (
    <div className="techdev-detail-page animate-fade-in">
      {/* 1. Top Navigation Bar */}
      <div className="detail-top-nav">
        <button className="btn-back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to VIKAS</span>
        </button>
        <span className="top-nav-breadcrumb">
          VIKAS Platform / Platform Verticals / <strong>6.1 Technology Development (TDP)</strong>
        </span>
      </div>

      {/* 2. Hero Section Card */}
      <div className="card techdev-hero-card">
        <div className="hero-main-content">
          <div className="hero-icon-wrapper">
            <Cpu size={36} className="text-emerald" />
          </div>
          <div className="hero-text-content">
            <h1 className="hero-page-title">Technology Development</h1>
            <h2 className="hero-subtitle">TDP Projects & Prototype Lab Translation</h2>
            <p className="hero-description">
              The Technology Development Vertical under IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF) spearheads translation of foundational cyber-physical research into commercial and mission-ready prototypes. Through TDP grants, specialized testbeds (PNT, Geo-Intel, CV), and industry co-development, we accelerate technological self-reliance across national focus domains.
            </p>
            
            <div className="hero-cta-row">
              <a 
                href="/vikas/technology-development/tdp/apply"
                className="btn btn-primary-cta" 
                onClick={handleApplyClick}
              >
                <Sparkles size={16} />
                <span>Submit TDP Proposal</span>
                <ChevronRight size={16} />
              </a>

              <a 
                href="/vikas/technology-development/projects"
                className="btn btn-secondary-cta" 
                onClick={handleExploreProjectsClick}
              >
                <Activity size={16} />
                <span>Explore TDP Projects</span>
                <ChevronRight size={16} />
              </a>

              <a 
                href="/vikas/technology-development/applications"
                className="btn btn-secondary-cta" 
                onClick={handleTrackApplicationsClick}
              >
                <Layers size={16} />
                <span>Track Submitted Applications</span>
                <ChevronRight size={16} />
              </a>

              <span className="hero-cta-note">
                <ShieldCheck size={14} className="text-success" />
                Single-Window Digital Screening • Tracked via Unique File Number
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Program Overview & Key Highlights */}
      <div className="section-container">
        <div className="section-header-wrap">
          <div className="section-title-with-badge">
            <div className="section-icon-pill">
              <BookOpen size={18} className="text-emerald" />
            </div>
            <div>
              <h2 className="overview-main-heading">Vertical Overview</h2>
              <span className="overview-subheading">Translational R&D to Hardware & Software Prototypes</span>
            </div>
          </div>
        </div>

        {/* Narrative Description Card */}
        <div className="overview-narrative-card card">
          <div className="lead-paragraph-block">
            <p className="overview-lead-text">
              The <strong>Technology Development Program (TDP)</strong> bridges the gap between academic innovation and market readiness. By providing structured seed funding, state-of-the-art laboratory testbeds, and mentorship from domain specialists, IITTNiF empowers researchers and institutions to build robust, scalable Cyber-Physical Systems (CPS).
            </p>
          </div>

          <div className="overview-highlights-grid mt-20">
            <div className="highlight-box">
              <div className="highlight-header">
                <div className="highlight-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                  <Workflow size={18} />
                </div>
                <h4>End-to-End Prototype Engineering</h4>
              </div>
              <p>
                From initial PCB schematics and sensor telemetry to containerized algorithms, projects receive dedicated fabrication and technical validation assistance.
              </p>
            </div>

            <div className="highlight-box">
              <div className="highlight-header">
                <div className="highlight-icon-box" style={{ backgroundColor: 'rgba(217, 119, 6, 0.12)', color: '#d97706' }}>
                  <Award size={18} />
                </div>
                <h4>Intellectual Property & Commercialization</h4>
              </div>
              <p>
                Proprietary designs created through TDP engagements are supported for patent filing, institutional technology transfer, and startup spin-offs.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="focus-areas-container mt-24">
          <div className="subsection-title-row">
            <div>
              <h3 className="subsection-heading">Key Activities & Opportunities</h3>
              <p className="subsection-subtext">Four core developmental pillars driving deep-tech translation</p>
            </div>
          </div>

          <div className="focus-areas-grid mt-16">
            {techPillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div 
                  key={pillar.id} 
                  className="card focus-area-card"
                  style={{ borderTop: `4px solid ${pillar.color}` }}
                >
                  <div className="focus-card-top-row">
                    <div 
                      className="focus-icon-box"
                      style={{ 
                        backgroundColor: `${pillar.color}12`, 
                        border: `1px solid ${pillar.color}25`,
                        color: pillar.color 
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <span 
                      className="focus-badge" 
                      style={{ color: pillar.color, backgroundColor: `${pillar.color}10`, borderColor: `${pillar.color}25` }}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <h4 className="focus-card-title">{pillar.title}</h4>
                  <p className="focus-card-desc">{pillar.desc}</p>

                  <button 
                    type="button"
                    className="focus-card-cta"
                    style={{ color: pillar.color }}
                    onClick={() => handlePillarAction(pillar.action)}
                  >
                    <span>{pillar.ctaText}</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Interactive Deep Dive Section (Tabs for Labs & TRL Pipeline) */}
      <div id="translation-framework" className="section-container mt-12">
        <div className="section-header-wrap">
          <div className="section-title-with-badge">
            <div className="section-icon-pill" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
              <Layers size={18} className="text-emerald" />
            </div>
            <div>
              <h2 className="overview-main-heading">Translation Framework & Testbeds</h2>
              <span className="overview-subheading" style={{ color: '#10b981' }}>Rigorous laboratory integration and milestone validation</span>
            </div>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="benefit-tab-switch-group">
            <button 
              className={`benefit-tab-btn ${activeTab === 'pillars' ? 'active' : ''}`}
              onClick={() => setActiveTab('pillars')}
            >
              <Radio size={15} />
              <span>1. Specialized Labs & Facilities</span>
            </button>
            <button 
              className={`benefit-tab-btn ${activeTab === 'trl' ? 'active' : ''}`}
              onClick={() => setActiveTab('trl')}
            >
              <TrendingUp size={15} />
              <span>2. TRL Progression Pipeline</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Labs and Testbed Facilities */}
        {activeTab === 'pillars' && (
          <SpecializedLabsGrid />
        )}

        {/* Tab 2: TRL Progression Pipeline */}
        {activeTab === 'trl' && (
          <TrlPipelineView />
        )}
      </div>

      {/* 5. TDP Project Opportunities Section */}
      <TdpProjectOpportunities 
        onApply={(proj) => handleApplyClick(proj)} 
        onSelectProject={(proj) => setSelectedProjectId(proj.id)}
      />

      {/* 11. Applicant / Project Status Tracking Feature Section */}
      <div className="section-container mt-24" id="tdp-application-tracking">
        <div className="section-header-wrap">
          <div className="section-title-with-badge">
            <div className="section-icon-pill" style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <Compass size={18} className="text-emerald" />
            </div>
            <div>
              <h2 className="overview-main-heading">Applicant / Project Status Tracking</h2>
              <span className="overview-subheading" style={{ color: 'var(--color-emerald)' }}>
                Real-time single-window progression monitoring across 8 review & translation stages
              </span>
            </div>
          </div>
          <button 
            className="btn btn-sm btn-outline"
            onClick={handleTrackApplicationsClick}
          >
            <Layers size={14} />
            <span>Open Tracking Portal</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="card tracking-feature-card mt-16">
          <div className="tracking-feature-flex">
            <div className="tracking-feature-text">
              <div className="hero-badge-row">
                <span className="badge badge-emerald">Live Single-Window Registry</span>
                <span className="badge badge-cyan">8 Progression Stages</span>
                <span className="badge badge-gold">Read-Only Applicant Security</span>
              </div>
              <h3 className="tracking-feature-title mt-12">Track Your Submitted TDP Proposals & Lab Milestones</h3>
              <p className="tracking-feature-desc">
                Authenticated investigators can monitor proposal progression from Secretariat Screening, Peer Technical Assessment, and Evaluation Board Review through Project Execution and TRL 6 Certification. Status transitions are certified exclusively by authorized IITTNiF review bodies.
              </p>

              <div className="tracking-stages-mini-flow mt-16">
                <span className="mini-stage-pill completed">1. Submitted</span>
                <span className="mini-arrow">→</span>
                <span className="mini-stage-pill completed">2. Screening</span>
                <span className="mini-arrow">→</span>
                <span className="mini-stage-pill active">3. Technical Review</span>
                <span className="mini-arrow">→</span>
                <span className="mini-stage-pill">4. Evaluation</span>
                <span className="mini-arrow">→</span>
                <span className="mini-stage-pill">5. Approval</span>
                <span className="mini-arrow">→</span>
                <span className="mini-stage-pill">6. Execution</span>
                <span className="mini-arrow">→</span>
                <span className="mini-stage-pill">7. Final Review</span>
                <span className="mini-arrow">→</span>
                <span className="mini-stage-pill">8. Completed</span>
              </div>

              <div className="tracking-actions-row mt-20">
                <button 
                  className="btn btn-primary-cta"
                  onClick={handleTrackApplicationsClick}
                >
                  <Activity size={16} />
                  <span>Open TDP Application Tracker</span>
                  <ChevronRight size={16} />
                </button>

                <button 
                  className="btn btn-secondary-cta"
                  onClick={handleApplyClick}
                >
                  <Sparkles size={16} />
                  <span>Submit New Proposal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Active Engagements in Registry */}
      {techDevApplications.length > 0 && (
        <div id="tdp-active-projects" className="section-container mt-12">
          <div className="section-header-wrap">
            <div className="section-title-with-badge">
              <div className="section-icon-pill" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', borderColor: 'rgba(217, 119, 6, 0.25)' }}>
                <Activity size={18} className="text-accent" />
              </div>
              <div>
                <h2 className="overview-main-heading">Active Engagements in Registry</h2>
                <span className="overview-subheading" style={{ color: 'var(--color-accent)' }}>Approved TDP projects currently under development and testing</span>
              </div>
            </div>
            <span className="badge badge-gold font-mono">{techDevApplications.length} Active Files</span>
          </div>

          <div className="techdev-files-grid mt-16">
            {techDevApplications.map((file) => (
              <div key={file.fileNumber} className="card techdev-file-card">
                <div className="file-card-header">
                  <div>
                    <h4 className="file-name-text">{file.name}</h4>
                    <span className="file-id-badge font-mono">{file.fileNumber}</span>
                  </div>
                  <span className="badge badge-emerald">Approved</span>
                </div>

                <p className="file-desc-text">{file.description}</p>

                <div className="file-meta-grid">
                  <div className="meta-cell">
                    <span>Principal Lead / Contact:</span>
                    <strong>{file.contactPerson || file.name}</strong>
                  </div>
                  <div className="meta-cell">
                    <span>Manager Email:</span>
                    <strong>{file.email}</strong>
                  </div>
                  <div className="meta-cell">
                    <span>Focus Priority:</span>
                    <strong>{file.nmIcpsAlign}</strong>
                  </div>
                  {file.fundingRequested !== '0' && (
                    <div className="meta-cell">
                      <span>Budget Mapped:</span>
                      <strong className="text-success font-mono">₹ {file.fundingRequested}</strong>
                    </div>
                  )}
                  <div className="meta-cell">
                    <span>Digital Signature:</span>
                    <strong className="text-accent flex items-center gap-4">
                      <ShieldCheck size={13} className="text-success" />
                      {file.eSignature || 'Dr. K. Raghavan (TDP Lead)'}
                    </strong>
                  </div>
                </div>

                {file.trl && (
                  <div className="file-trl-box mt-12">
                    <div className="file-trl-row">
                      <span>Technology Readiness Level</span>
                      <strong>TRL {file.trl} / 6</strong>
                    </div>
                    <div className="file-trl-track">
                      <div className="file-trl-fill" style={{ width: `${((file.trl - 2) / 4) * 100}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Bottom Banner CTA Card */}
      <div className="card techdev-cta-banner mt-12">
        <div className="cta-banner-content">
          <div className="cta-icon-box">
            <Cpu size={32} className="text-emerald" />
          </div>
          <div>
            <h3>Have an Innovative Prototype or Cyber-Physical Proposal?</h3>
            <p>Submit your TDP application to access capital funding, specialized lab testbeds, and national-level mentorship.</p>
          </div>
        </div>
        <button 
          className="btn btn-primary-cta" 
          onClick={() => onRegister ? onRegister() : null}
        >
          <span>Submit TDP Proposal</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Industry Projects Modal Overlay */}
      {showIndustryModal && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setShowIndustryModal(false)}>
          <div className="modal-content-card card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-section" style={{ borderBottom: '2px solid #8b5cf6' }}>
              <div className="modal-header-brand">
                <div className="modal-icon-bg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                  <Building2 size={24} style={{ color: '#8b5cf6' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>Industry-Driven R&D Projects</h3>
                  <span className="badge badge-info" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderColor: 'rgba(139, 92, 246, 0.25)', fontSize: '11px', fontWeight: 700 }}>
                    Enterprise Interface
                  </span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setShowIndustryModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-scroll">
              {industryApplications.length > 0 ? (
                <div className="industry-projects-list">
                  {industryApplications.map((file) => (
                    <div key={file.fileNumber} className="modal-file-card">
                      <div className="modal-file-meta-row">
                        <span className="file-title-text">{file.name}</span>
                        <span className="file-id-code font-mono">{file.fileNumber}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '6px 0' }}>{file.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-industry-state">
                  <div className="empty-state-icon-circle">
                    <Building2 size={32} style={{ color: '#8b5cf6' }} />
                  </div>
                  <h4 style={{ margin: '12px 0 6px', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    No Active Industry Projects Registered Yet
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '420px', margin: '0 auto 20px' }}>
                    Industry co-development calls are opened on a rolling basis. Partner with IITTNiF to solve mission-critical technical challenges or sponsor translational R&D.
                  </p>
                  <div className="empty-state-action-box">
                    <button 
                      className="btn btn-primary-cta"
                      style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
                      onClick={() => {
                        setShowIndustryModal(false);
                        if (onRegister) onRegister();
                      }}
                    >
                      <Sparkles size={16} />
                      <span>Submit Industry Problem Statement</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .techdev-detail-page {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 8px 16px 56px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Top Navigation */
        .detail-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
        }

        .btn-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .btn-back-link:hover {
          background-color: var(--bg-primary);
          border-color: #10b981;
          color: #10b981;
          transform: translateX(-2px);
        }

        .top-nav-breadcrumb {
          font-size: 12px;
          color: var(--text-muted);
        }

        .top-nav-breadcrumb strong {
          color: var(--text-primary);
        }

        /* Hero Card */
        .techdev-hero-card {
          padding: 32px 36px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(8, 145, 178, 0.03) 100%), var(--bg-surface);
          border: 1px solid var(--border-color);
          border-left: 5px solid #10b981;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
        }

        .hero-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .badge-emerald {
          background-color: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.25);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .badge-cyan {
          background-color: rgba(6, 182, 212, 0.1);
          color: #0891b2;
          border: 1px solid rgba(6, 182, 212, 0.25);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .badge-gold {
          background-color: rgba(217, 119, 6, 0.1);
          color: #b45309;
          border: 1px solid rgba(217, 119, 6, 0.25);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .hero-main-content {
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }

        .hero-icon-wrapper {
          width: 68px;
          height: 68px;
          border-radius: 14px;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .text-emerald {
          color: #10b981;
        }

        .hero-text-content {
          flex: 1;
        }

        .hero-page-title {
          font-size: 28px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.15;
          margin: 0 0 4px;
        }

        .hero-subtitle {
          font-size: 18px;
          font-weight: 700;
          color: #10b981;
          margin: 0 0 14px;
        }

        .hero-description {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 950px;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          border: none;
          padding: 11px 22px;
          border-radius: var(--radius-md);
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
        }

        .btn-primary-cta:hover {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.4);
        }

        .btn-secondary-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-surface);
          color: #059669;
          border: 1.5px solid #10b981;
          padding: 10px 20px;
          border-radius: var(--radius-md);
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-decoration: none;
          box-shadow: var(--shadow-sm);
        }

        .btn-secondary-cta:hover {
          background-color: rgba(16, 185, 129, 0.08);
          border-color: #059669;
          color: #047857;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }

        .hero-cta-note {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        /* Section Container */
        .section-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .section-header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .section-title-with-badge {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-icon-pill {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overview-main-heading {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.2;
        }

        .overview-subheading {
          font-size: 13px;
          font-weight: 600;
          color: #10b981;
        }

        .overview-narrative-card {
          padding: 28px 32px;
          background-color: var(--bg-surface);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
        }

        .lead-paragraph-block {
          border-left: 3px solid #10b981;
          padding-left: 18px;
        }

        .overview-lead-text {
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--text-primary);
          margin: 0;
        }

        .overview-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 800px) {
          .overview-highlights-grid {
            grid-template-columns: 1fr;
          }
        }

        .highlight-box {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: all var(--transition-normal);
        }

        .highlight-box:hover {
          border-color: var(--border-color-active);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .highlight-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .highlight-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .highlight-header h4 {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .highlight-box p {
          font-size: 13px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Focus Areas Subsection */
        .subsection-heading {
          font-size: 17px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .subsection-subtext {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        .focus-areas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .focus-area-card {
          padding: 26px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .focus-area-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-active);
        }

        .focus-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .focus-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .focus-badge {
          font-size: 10.5px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          border: 1px solid;
          letter-spacing: 0.2px;
        }

        .focus-card-title {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 8px;
        }

        .focus-card-desc {
          font-size: 13px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0 0 16px;
        }

        .focus-card-cta {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px dashed var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          border-left: none;
          border-right: none;
          border-bottom: none;
          width: 100%;
          font-family: 'Outfit', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-decoration: none;
          padding-left: 0;
          padding-right: 0;
        }

        .focus-card-cta:hover {
          transform: translateX(4px);
          opacity: 0.9;
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content-card {
          width: 100%;
          max-width: 580px;
          background-color: var(--bg-surface);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .modal-header-section {
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-primary);
        }

        .modal-header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-icon-bg {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          background-color: var(--bg-surface-hover);
          color: var(--text-primary);
        }

        .modal-body-scroll {
          padding: 24px;
          overflow-y: auto;
        }

        .empty-industry-state {
          text-align: center;
          padding: 16px 8px;
        }

        .empty-state-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .empty-state-action-box {
          display: flex;
          justify-content: center;
        }

        /* Tab Switcher Styling */
        .benefit-tab-switch-group {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-surface);
          padding: 6px;
          border-radius: var(--radius-lg);
          border: 1.5px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .benefit-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 18px;
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .benefit-tab-btn:hover {
          background-color: var(--bg-surface-hover);
          border-color: #10b981;
          color: #10b981;
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .benefit-tab-btn:not(.active) svg {
          color: #10b981;
          transition: transform var(--transition-fast);
        }

        .benefit-tab-btn:hover svg {
          transform: scale(1.1);
        }

        .benefit-tab-btn.active {
          background: linear-gradient(135deg, #10b981, #059669);
          color: #ffffff;
          border-color: #10b981;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
          transform: translateY(-1px);
        }

        .benefit-tab-btn.active svg {
          color: #ffffff !important;
        }

        .benefits-parent-card {
          padding: 28px 32px;
          background-color: var(--bg-surface);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }

        .benefits-parent-header h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 4px 0 0;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
          width: fit-content;
        }

        .benefits-items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 850px) {
          .benefits-items-grid {
            grid-template-columns: 1fr;
          }
        }

        .benefit-feature-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all var(--transition-normal);
        }

        .benefit-feature-card:hover {
          border-color: var(--border-color-active);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .feature-icon-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .feature-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-icon-header h4 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .benefit-bullets-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .benefit-bullets-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* TRL Stages Grid */
        .trl-stages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 850px) {
          .trl-stages-grid {
            grid-template-columns: 1fr;
          }
        }

        .trl-maturation-pipeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .trl-pipeline-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .trl-pipeline-card {
          width: 100%;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all var(--transition-normal);
        }

        .trl-pipeline-card:hover {
          border-color: var(--border-color-active);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .trl-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .trl-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .trl-badge {
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          border: 1px solid;
          letter-spacing: 0.5px;
        }

        .trl-stage-name {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .trl-gate-pill {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .trl-stage-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        .trl-criteria-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 6px;
          padding-top: 14px;
          border-top: 1px dashed var(--border-color);
        }

        @media (max-width: 800px) {
          .trl-criteria-grid {
            grid-template-columns: 1fr;
          }
        }

        .trl-criteria-box {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .criteria-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .criteria-text {
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--text-secondary);
          margin: 0;
        }

        .trl-pipeline-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          width: 100%;
          gap: 12px;
        }

        .connector-line {
          height: 1px;
          flex: 1;
          max-width: 120px;
          background: linear-gradient(90deg, transparent, var(--border-color), transparent);
        }

        .connector-icon-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Research to Deployment Section */
        .research-deployment-container {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 24px;
        }

        .research-deployment-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .research-deployment-header h4 {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 4px 0 0;
        }

        .research-deployment-header p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        .deployment-flow-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 16px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .deployment-flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          flex: 1;
          min-width: 120px;
        }

        .step-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .step-icon-circle:hover {
          transform: scale(1.08);
        }

        .step-number-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .step-label-text {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .flow-step-arrow {
          color: var(--border-color-active);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .flow-step-arrow {
            display: none;
          }
        }

        /* TDP Project Opportunities Section Styles */
        .tdp-filter-panel {
          padding: 20px 24px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
        }

        .tdp-filter-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 280px;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 10px 36px 10px 38px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          border-color: #10b981;
          outline: none;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .search-clear-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px;
        }

        .btn-reset-filters {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 9px 14px;
          border-radius: var(--radius-md);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-reset-filters:hover {
          color: var(--color-danger);
          border-color: rgba(239, 68, 68, 0.3);
          background-color: rgba(239, 68, 68, 0.05);
        }

        .tdp-filter-dropdowns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }

        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .filter-label {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .filter-select {
          padding: 8px 12px;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-select:focus {
          border-color: #10b981;
          outline: none;
        }

        .tdp-projects-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 20px;
        }

        .tdp-project-card {
          padding: 24px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: all var(--transition-normal);
        }

        .tdp-project-card:hover {
          border-color: #10b981;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.12);
        }

        .project-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .project-id-domain {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .project-id-badge {
          font-size: 11.5px;
          font-weight: 800;
          color: #10b981;
        }

        .project-domain-tag {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .project-title-heading {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.35;
          margin: 0;
        }

        .project-problem-text {
          font-size: 13px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-meta-pills-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px 14px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 10px;
        }

        .meta-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-primary);
          font-weight: 600;
        }

        .truncate-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .project-card-footer {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px dashed var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .btn-view-details {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #10b981;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          padding: 6px 0;
        }

        .btn-view-details:hover {
          color: #059669;
          transform: translateX(3px);
        }

        .btn-apply-sm {
          padding: 8px 16px;
          font-size: 12.5px;
        }

        /* Empty State */
        .empty-tdp-state {
          padding: 48px 24px;
          text-align: center;
          background-color: var(--bg-surface);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .empty-state-title {
          font-size: 17px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 16px 0 6px;
        }

        .empty-state-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          max-width: 480px;
          margin: 0 0 20px;
          line-height: 1.5;
        }

        .btn-reset-filters-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          background-color: var(--bg-primary);
          border: 1.5px solid #10b981;
          color: #059669;
          border-radius: var(--radius-md);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-reset-filters-cta:hover {
          background-color: rgba(16, 185, 129, 0.1);
        }

        /* Modal specific */
        .tdp-detail-modal {
          max-width: 640px;
        }

        .detail-modal-meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .modal-section-title {
          font-size: 13px;
          font-weight: 800;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin: 0 0 6px;
        }

        .modal-section-text {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        .detail-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 14px 16px;
        }

        .detail-grid-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 12.5px;
        }

        .detail-grid-cell span {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .modal-milestones-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-milestones-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* TDP Single Project Dossier Page Styles */
        .loading-project-card,
        .error-project-card {
          padding: 60px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-surface);
          border-radius: 16px;
        }

        .loading-project-card h4,
        .error-project-card h4 {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 16px 0 6px;
        }

        .loading-project-card p,
        .error-project-card p {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin: 0;
        }

        .project-hero-dossier-card {
          padding: 32px;
          background-color: var(--bg-surface);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
        }

        .project-hero-main {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          margin-top: 20px;
        }

        .project-hero-title {
          font-size: 26px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.25;
          margin: 0 0 6px;
        }

        .project-hero-subtext {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin: 0;
        }

        .project-quick-meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .quick-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 12.5px;
        }

        .quick-meta-pill span {
          color: var(--text-muted);
          font-weight: 600;
        }

        .project-hero-cta-banner {
          padding: 16px 20px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .cta-banner-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cta-banner-info div {
          display: flex;
          flex-direction: column;
          font-size: 12.5px;
        }

        .cta-banner-info strong {
          color: var(--text-primary);
        }

        .cta-banner-info span {
          color: var(--text-secondary);
          font-size: 11.5px;
        }

        /* 2-Column Dossier Layout Grid */
        .project-dossier-layout-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }

        @media (max-width: 950px) {
          .project-dossier-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        .dossier-main-column,
        .dossier-sidebar-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dossier-section-card {
          padding: 24px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
        }

        .dossier-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .dossier-card-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .dossier-card-subtitle {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .lead-problem-text {
          font-size: 14px;
          line-height: 1.65;
          color: var(--text-primary);
          margin: 0;
        }

        .dossier-checklist-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dossier-checklist-items li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .check-bullet-icon {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .dossier-highlight-box {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 16px 18px;
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--text-primary);
        }

        .deliverables-dossier-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .deliverable-dossier-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .deliverable-dossier-badge {
          font-size: 11px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          background-color: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          flex-shrink: 0;
        }

        /* Sidebar Cards */
        .dossier-sidebar-card {
          padding: 20px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
        }

        .sidebar-card-title {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .trl-comparison-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 12px 14px;
        }

        .trl-comparison-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .trl-label {
          font-size: 10.5px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .trl-val-badge {
          font-size: 16px;
          font-weight: 900;
        }

        .trl-stage-tag {
          font-size: 10px;
          color: var(--text-secondary);
        }

        .track-bar-mini {
          width: 100%;
          height: 6px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .track-fill-mini {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #10b981);
          border-radius: var(--radius-full);
        }

        .sidebar-list-pills {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-list-pills li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .expertise-tags-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .expertise-tag-pill {
          font-size: 11.5px;
          padding: 4px 10px;
          border-radius: var(--radius-md);
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-weight: 600;
        }

        .important-dates-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .date-item-row {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          gap: 2px;
          padding: 6px 10px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
        }

        .date-item-row span {
          color: var(--text-muted);
          font-size: 11px;
        }

        .highlight-deadline {
          border-color: rgba(239, 68, 68, 0.4);
          background-color: rgba(239, 68, 68, 0.05);
        }

        .supporting-docs-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .doc-download-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          gap: 8px;
        }

        .doc-info-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .doc-name-text {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .doc-meta-badge {
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .doc-download-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .doc-download-btn:hover {
          background-color: #10b981;
          color: #ffffff;
          border-color: #10b981;
        }

        .dossier-sidebar-cta-card {
          padding: 22px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(8, 145, 178, 0.08));
          border: 1.5px solid rgba(16, 185, 129, 0.25);
          border-radius: 14px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .dossier-sidebar-cta-card h4 {
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .dossier-sidebar-cta-card p {
          font-size: 12.5px;
          color: var(--text-secondary);
          margin: 0 0 8px;
        }

        /* TechDev Files Grid */
        .techdev-files-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .techdev-file-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-left: 4px solid #10b981;
          border-radius: 14px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .file-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .file-name-text {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .file-id-badge {
          font-size: 11px;
          color: var(--color-accent);
          font-weight: 700;
        }

        .file-desc-text {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .file-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
          background-color: var(--bg-primary);
          padding: 14px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
        }

        .meta-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-cell span {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .meta-cell strong {
          font-size: 12.5px;
          color: var(--text-primary);
          word-break: break-word;
        }

        .file-trl-box {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 10px 14px;
          border-radius: 8px;
        }

        .file-trl-row {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--text-secondary);
          margin-bottom: 6px;
          font-weight: 600;
        }

        .file-trl-track {
          width: 100%;
          height: 5px;
          background-color: var(--bg-surface);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .file-trl-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #059669);
        }

        /* Bottom CTA Banner */
        .techdev-cta-banner {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(8, 145, 178, 0.06) 100%), var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 16px;
          padding: 28px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .cta-banner-content {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
          min-width: 280px;
        }

        .cta-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cta-banner-content h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .cta-banner-content p {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .font-mono {
          font-family: 'Courier New', Courier, monospace;
        }

        /* Section 11 Tracking Feature Card */
        .tracking-feature-card {
          padding: 28px 32px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%), var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-lg);
        }

        .tracking-feature-title {
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .tracking-feature-desc {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.55;
          max-width: 860px;
          margin: 8px 0 0 0;
        }

        .tracking-stages-mini-flow {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding: 10px 0;
        }

        .mini-stage-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .mini-stage-pill.completed {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.3);
        }

        .mini-stage-pill.active {
          background: rgba(6, 182, 212, 0.15);
          color: #06b6d4;
          border-color: #06b6d4;
          font-weight: 700;
        }

        .mini-arrow {
          color: var(--text-muted);
          font-size: 12px;
        }

        .tracking-actions-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .mt-12 { margin-top: 12px; }
        .mt-14 { margin-top: 14px; }
        .mt-16 { margin-top: 16px; }
        .mt-20 { margin-top: 20px; }
        .mt-24 { margin-top: 24px; }
      `}</style>
    </div>
  );
}
