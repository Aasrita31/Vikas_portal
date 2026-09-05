import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Cpu, 
  Sparkles, 
  Calendar, 
  CheckCircle, 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Download, 
  Layers, 
  Users, 
  BookOpen, 
  Award, 
  ChevronRight,
  Clock,
  Building2,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function TdpProjectDetailPage({ 
  projectId = 'TDP-2026-PNT-01', 
  onBack, 
  onApply 
}) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:5000/api/v1/vikas/technology-development/projects/${projectId}`);
        if (!res.ok) {
          throw new Error(`Failed to load project with ID ${projectId} (Status: ${res.status})`);
        }
        const data = await res.json();
        if (isMounted) {
          setProject(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (loading) {
    return (
      <div className="techdev-detail-page animate-fade-in">
        <div className="detail-top-nav">
          <button className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to TDP Opportunities</span>
          </button>
        </div>
        <div className="card loading-project-card">
          <Loader2 size={36} className="animate-spin text-emerald" />
          <h4>Loading TDP Project Dossier...</h4>
          <p>Fetching institutional specifications and problem statement from backend repository.</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="techdev-detail-page animate-fade-in">
        <div className="detail-top-nav">
          <button className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to TDP Opportunities</span>
          </button>
        </div>
        <div className="card error-project-card">
          <AlertCircle size={36} className="text-warning" />
          <h4>Unable to Load Project Details</h4>
          <p>{error || `TDP Project with ID '${projectId}' was not found.`}</p>
          <button className="btn btn-primary-cta mt-12" onClick={onBack}>
            <span>Return to Opportunities List</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="techdev-detail-page tdp-single-project-page animate-fade-in">
      {/* 0. Top Navigation Bar */}
      <div className="detail-top-nav">
        <button className="btn-back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to TDP Opportunities</span>
        </button>
        <span className="top-nav-breadcrumb">
          VIKAS Platform / Technology Development / Projects / <strong className="font-mono">{project.id}</strong>
        </span>
      </div>

      {/* 1, 2, 3, 4. Project Header Card (Title, ID, Status, Technology Domain) */}
      <div className="card project-hero-dossier-card">
        <div className="hero-badge-row">
          <span className="badge badge-emerald font-mono">{project.id}</span>
          <span className="badge badge-cyan">{project.technologyDomain}</span>
          <span className={`badge ${project.status === 'Open for Proposals' ? 'badge-emerald' : 'badge-gold'}`}>
            {project.status}
          </span>
          <span className="badge badge-gold font-mono">
            TRL {project.trlStart} → TRL {project.targetTrl}
          </span>
        </div>

        <div className="project-hero-main">
          <div className="hero-icon-wrapper">
            <Cpu size={36} className="text-emerald" />
          </div>
          <div className="hero-text-content">
            <h1 className="project-hero-title">{project.title}</h1>
            <p className="project-hero-subtext">
              National Technology Development Project under IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF) & NM-ICPS
            </p>

            {/* Quick Summary Pill Row */}
            <div className="project-quick-meta-row mt-16">
              {project.budgetCap && (
                <div className="quick-meta-pill">
                  <span>Grant Cap:</span>
                  <strong className="text-success font-mono">{project.budgetCap}</strong>
                </div>
              )}
              {project.durationMonths && (
                <div className="quick-meta-pill">
                  <span>Duration:</span>
                  <strong>{project.durationMonths} Months</strong>
                </div>
              )}
              {project.leadMentor && (
                <div className="quick-meta-pill">
                  <span>Lead Mentor / Anchor:</span>
                  <strong>{project.leadMentor}</strong>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 16. Application CTA Bar */}
        <div className="project-hero-cta-banner mt-20">
          <div className="cta-banner-info">
            <ShieldCheck size={20} className="text-success" />
            <div>
              <strong>Competitive Single-Window Grant Review</strong>
              <span>Submissions are screened by the IITTNiF Technical Advisory Board.</span>
            </div>
          </div>

          <button 
            className="btn btn-primary-cta"
            onClick={() => onApply ? onApply(project) : null}
          >
            <Sparkles size={16} />
            <span>Submit TDP Proposal</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="project-dossier-layout-grid">
        {/* Left Column: Core Technical Specifications */}
        <div className="dossier-main-column">
          {/* 5. Problem Statement */}
          <div className="card dossier-section-card">
            <div className="dossier-section-header">
              <div className="section-icon-pill" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <Target size={18} />
              </div>
              <div>
                <h3 className="dossier-card-title">Problem Statement</h3>
                <span className="dossier-card-subtitle">Critical technical challenge and operational gap</span>
              </div>
            </div>
            <div className="dossier-narrative-content mt-12">
              <p className="lead-problem-text">{project.problemStatement}</p>
            </div>
          </div>

          {/* 6. Project Objectives */}
          {project.projectObjectives && project.projectObjectives.length > 0 && (
            <div className="card dossier-section-card">
              <div className="dossier-section-header">
                <div className="section-icon-pill" style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)', color: '#0891b2' }}>
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h3 className="dossier-card-title">Project Objectives</h3>
                  <span className="dossier-card-subtitle">Key engineering benchmarks & performance targets</span>
                </div>
              </div>
              <ul className="dossier-checklist-items mt-16">
                {project.projectObjectives.map((obj, oIdx) => (
                  <li key={oIdx}>
                    <div className="check-bullet-icon">
                      <CheckCircle size={15} className="text-cyan" />
                    </div>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 7. Technical Scope */}
          {project.technicalScope && (
            <div className="card dossier-section-card">
              <div className="dossier-section-header">
                <div className="section-icon-pill" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                  <Layers size={18} />
                </div>
                <div>
                  <h3 className="dossier-card-title">Technical Scope</h3>
                  <span className="dossier-card-subtitle">Development boundary, simulation, and test protocols</span>
                </div>
              </div>
              <div className="dossier-narrative-content mt-12">
                <p>{project.technicalScope}</p>
              </div>
            </div>
          )}

          {/* 8. Expected Prototype / Output */}
          {project.expectedOutput && (
            <div className="card dossier-section-card">
              <div className="dossier-section-header">
                <div className="section-icon-pill" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                  <Cpu size={18} />
                </div>
                <div>
                  <h3 className="dossier-card-title">Expected Prototype / Output</h3>
                  <span className="dossier-card-subtitle">Tangible deployable system specifications</span>
                </div>
              </div>
              <div className="dossier-highlight-box mt-12" style={{ borderLeft: '3px solid #8b5cf6' }}>
                <p>{project.expectedOutput}</p>
              </div>
            </div>
          )}

          {/* 13. Expected Deliverables */}
          {project.expectedDeliverables && project.expectedDeliverables.length > 0 && (
            <div className="card dossier-section-card">
              <div className="dossier-section-header">
                <div className="section-icon-pill" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="dossier-card-title">Expected Deliverables</h3>
                  <span className="dossier-card-subtitle">Milestone-linked reports, hardware models & source code</span>
                </div>
              </div>
              <div className="deliverables-dossier-grid mt-16">
                {project.expectedDeliverables.map((deliv, dIdx) => (
                  <div key={dIdx} className="deliverable-dossier-item">
                    <div className="deliverable-dossier-badge font-mono">D{dIdx + 1}</div>
                    <p>{deliv}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Governance, TRL, Eligibility, Dates & Documents */}
        <div className="dossier-sidebar-column">
          {/* 9 & 10. Current TRL vs Target TRL */}
          <div className="card dossier-sidebar-card">
            <h4 className="sidebar-card-title">
              <TrendingUp size={16} className="text-emerald" />
              <span>Technology Readiness Progression</span>
            </h4>
            <div className="trl-comparison-box mt-12">
              <div className="trl-comparison-col">
                <span className="trl-label">Current / Start TRL</span>
                <strong className="trl-val-badge font-mono text-cyan">TRL {project.trlStart}</strong>
                <span className="trl-stage-tag">Entry Baseline</span>
              </div>
              <div className="trl-arrow-center">
                <ChevronRight size={20} className="text-muted" />
              </div>
              <div className="trl-comparison-col">
                <span className="trl-label">Target / Sanctioned TRL</span>
                <strong className="trl-val-badge font-mono text-emerald">TRL {project.targetTrl}</strong>
                <span className="trl-stage-tag">Deployment Ready</span>
              </div>
            </div>

            <div className="trl-progress-track-mini mt-14">
              <div className="track-bar-mini">
                <div 
                  className="track-fill-mini" 
                  style={{ width: `${((project.targetTrl - 2) / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 11. Eligible Applicant Types */}
          {project.eligibleApplicantTypes && project.eligibleApplicantTypes.length > 0 && (
            <div className="card dossier-sidebar-card">
              <h4 className="sidebar-card-title">
                <Users size={16} className="text-cyan" />
                <span>Eligible Applicant Types</span>
              </h4>
              <ul className="sidebar-list-pills mt-10">
                {project.eligibleApplicantTypes.map((type, tIdx) => (
                  <li key={tIdx}>
                    <CheckCircle size={13} className="text-cyan flex-shrink-0" />
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 12. Required Expertise */}
          {project.requiredExpertise && project.requiredExpertise.length > 0 && (
            <div className="card dossier-sidebar-card">
              <h4 className="sidebar-card-title">
                <Building2 size={16} className="text-accent" />
                <span>Required Technical Expertise</span>
              </h4>
              <div className="expertise-tags-cloud mt-10">
                {project.requiredExpertise.map((exp, eIdx) => (
                  <span key={eIdx} className="expertise-tag-pill">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 14. Important Dates */}
          {project.importantDates && (
            <div className="card dossier-sidebar-card">
              <h4 className="sidebar-card-title">
                <Calendar size={16} className="text-warning" />
                <span>Important Program Dates</span>
              </h4>
              <div className="important-dates-list mt-10">
                {project.importantDates.cfpLaunch && (
                  <div className="date-item-row">
                    <span>Call for Proposals (CFP) Launch:</span>
                    <strong className="font-mono">{project.importantDates.cfpLaunch}</strong>
                  </div>
                )}
                {project.importantDates.queryDeadline && (
                  <div className="date-item-row">
                    <span>Pre-Proposal Query Deadline:</span>
                    <strong className="font-mono">{project.importantDates.queryDeadline}</strong>
                  </div>
                )}
                {project.importantDates.submissionDeadline && (
                  <div className="date-item-row highlight-deadline">
                    <span>Submission Deadline:</span>
                    <strong className="font-mono text-danger">{project.importantDates.submissionDeadline}</strong>
                  </div>
                )}
                {project.importantDates.evaluationDate && (
                  <div className="date-item-row">
                    <span>Technical Evaluation Announcement:</span>
                    <strong className="font-mono">{project.importantDates.evaluationDate}</strong>
                  </div>
                )}
                {project.importantDates.commencementDate && (
                  <div className="date-item-row">
                    <span>Target Project Commencement:</span>
                    <strong className="font-mono text-success">{project.importantDates.commencementDate}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 15. Supporting Documents */}
          {project.supportingDocuments && project.supportingDocuments.length > 0 && (
            <div className="card dossier-sidebar-card">
              <h4 className="sidebar-card-title">
                <FileText size={16} className="text-purple" style={{ color: '#8b5cf6' }} />
                <span>Supporting Documents & Guidelines</span>
              </h4>
              <div className="supporting-docs-list mt-10">
                {project.supportingDocuments.map((doc, docIdx) => (
                  <div key={docIdx} className="doc-download-item">
                    <div className="doc-info-group">
                      <span className="doc-name-text">{doc.name}</span>
                      <span className="doc-meta-badge font-mono">{doc.format} • {doc.size}</span>
                    </div>
                    <a 
                      href={doc.downloadUrl} 
                      className="doc-download-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Downloading official template: ${doc.name} (${doc.format})`);
                      }}
                      title="Download Template"
                    >
                      <Download size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct Proposal Submission Side Banner */}
          <div className="card dossier-sidebar-cta-card">
            <h4>Ready to Build with IITTNiF?</h4>
            <p>Submit your structured technical proposal to access lab testbeds and seed funding.</p>
            <button 
              className="btn btn-primary-cta w-full"
              onClick={() => onApply ? onApply(project) : null}
            >
              <Sparkles size={16} />
              <span>Submit TDP Proposal</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .techdev-detail-page {
          padding-bottom: 60px;
        }

        .detail-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .btn-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-back-link:hover {
          color: #10b981;
          border-color: #10b981;
          background-color: rgba(16, 185, 129, 0.05);
        }

        .top-nav-breadcrumb {
          font-size: 13px;
          color: var(--text-muted);
        }

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
          border: 1px solid var(--border-color);
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
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          margin-bottom: 24px;
        }

        .hero-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .project-hero-main {
          display: flex;
          align-items: flex-start;
          gap: 22px;
          margin-top: 20px;
        }

        .hero-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1.5px solid rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hero-text-content {
          flex: 1;
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
          gap: 14px;
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
          color: var(--text-primary);
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
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .dossier-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .section-icon-pill {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
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
          border: 1px solid var(--border-color);
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

        .trl-progress-track-mini {
          margin-top: 14px;
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
      `}</style>
    </div>
  );
}
