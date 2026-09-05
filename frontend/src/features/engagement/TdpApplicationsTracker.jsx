import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  Sparkles, 
  Cpu, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  ChevronRight, 
  Layers, 
  FileText, 
  Copy, 
  Check, 
  ShieldCheck, 
  Building2, 
  LayoutList, 
  LayoutGrid, 
  Plus, 
  ExternalLink,
  Activity,
  AlertTriangle,
  PauseCircle,
  XCircle,
  HelpCircle,
  Compass,
  Zap
} from 'lucide-react';

export const ALL_STATUSES = [
  'All Statuses',
  'Draft',
  'Submitted',
  'Under Screening',
  'Technical Review',
  'Mentor Review',
  'Approved',
  'Rejected',
  'On Hold',
  'In Progress',
  'Completed'
];

export const ALL_DOMAINS = [
  'All Domains',
  'PNT / NavIC / GNSS',
  'Geo-Intelligence',
  'GIS / Remote Sensing',
  'Computer Vision / GeoAI',
  'Embedded Systems',
  'IoT / Sensor Fusion',
  'Digital Twin',
  'Spatial Intelligence'
];

export default function TdpApplicationsTracker({ 
  onBack, 
  onSelectApplication, 
  onNavigateToApply,
  onNavigateToExecution,
  applications = [] 
}) {
  const [tdpApps, setTdpApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [copiedAppNo, setCopiedAppNo] = useState(null);
  const [filterUserOnly, setFilterUserOnly] = useState(false);

  // Authenticated user identity
  const currentUser = {
    name: 'Prof. S. Ananth',
    email: 's.ananth@iitt.ac.in',
    org: 'IIT Tirupati',
    role: 'Lead Investigator'
  };

  // Fetch from backend
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/v1/vikas/technology-development/applications');
      if (res.ok) {
        const data = await res.json();
        setTdpApps(data);
      } else {
        fallbackLocalData();
      }
    } catch (err) {
      fallbackLocalData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fallbackLocalData = () => {
    setTdpApps([
      {
        applicationNumber: 'IITTNIF-TDP-2026-8421',
        status: 'Technical Review',
        currentStage: 'Technical Review',
        submittedDate: '15/08/2026',
        lastUpdated: '28/08/2026, 14:30:00',
        applicantName: 'Prof. S. Ananth',
        email: 's.ananth@iitt.ac.in',
        organization: 'IIT Tirupati',
        projectTitle: 'Dual-Frequency NavIC/GPS Precision Timing & Positioning Module',
        technologyDomain: 'PNT / NavIC / GNSS',
        currentTrl: 3,
        targetTrl: 6,
        budgetApproved: '₹ 35,00,000'
      },
      {
        applicationNumber: 'IITTNIF-TDP-2026-7193',
        status: 'Approved',
        currentStage: 'Project Execution',
        submittedDate: '05/07/2026',
        lastUpdated: '18/08/2026, 11:15:00',
        applicantName: 'Prof. S. Ananth',
        email: 's.ananth@iitt.ac.in',
        organization: 'IIT Tirupati',
        projectTitle: 'Automated Hyperspectral Satellite Pipeline for Agricultural Yield Modeling',
        technologyDomain: 'Geo-Intelligence',
        currentTrl: 3,
        targetTrl: 5,
        budgetApproved: '₹ 28,00,000'
      },
      {
        applicationNumber: 'IITTNIF-TDP-2026-9042',
        status: 'Under Screening',
        currentStage: 'Initial Screening',
        submittedDate: '30/08/2026',
        lastUpdated: '01/09/2026, 16:45:00',
        applicantName: 'Dr. M. S. Prasad',
        email: 'prasad@iittnif.in',
        organization: 'IITTNiF Autonomous Lab',
        projectTitle: 'Ultra-Low Power Edge AI Vision Unit for Autonomous Robotic Surveillance',
        technologyDomain: 'Computer Vision / GeoAI',
        currentTrl: 4,
        targetTrl: 6,
        budgetApproved: 'Pending Review'
      },
      {
        applicationNumber: 'IITTNIF-TDP-2026-5518',
        status: 'Completed',
        currentStage: 'Completed',
        submittedDate: '12/01/2025',
        lastUpdated: '15/07/2026, 17:00:00',
        applicantName: 'Prof. S. Ananth',
        email: 's.ananth@iitt.ac.in',
        organization: 'IIT Tirupati',
        projectTitle: 'Sub-THz Metamaterial Radar Sensor Array for Underground Void Detection',
        technologyDomain: 'IoT / Sensor Fusion',
        currentTrl: 3,
        targetTrl: 6,
        budgetApproved: '₹ 32,00,000'
      }
    ]);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCopy = (e, appNo) => {
    e.stopPropagation();
    navigator.clipboard.writeText(appNo);
    setCopiedAppNo(appNo);
    setTimeout(() => setCopiedAppNo(null), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Draft':
        return <span className="badge badge-status badge-draft"><Clock size={12} /> Draft</span>;
      case 'Submitted':
        return <span className="badge badge-status badge-submitted"><FileText size={12} /> Submitted</span>;
      case 'Under Screening':
        return <span className="badge badge-status badge-screening"><Activity size={12} /> Under Screening</span>;
      case 'Technical Review':
        return <span className="badge badge-status badge-tech-review"><Layers size={12} /> Technical Review</span>;
      case 'Mentor Review':
        return <span className="badge badge-status badge-mentor-review"><Compass size={12} /> Mentor Review</span>;
      case 'Approved':
        return <span className="badge badge-status badge-approved"><CheckCircle size={12} /> Approved</span>;
      case 'In Progress':
        return <span className="badge badge-status badge-in-progress"><Activity size={12} /> In Progress</span>;
      case 'On Hold':
        return <span className="badge badge-status badge-on-hold"><PauseCircle size={12} /> On Hold</span>;
      case 'Rejected':
        return <span className="badge badge-status badge-rejected"><XCircle size={12} /> Rejected</span>;
      case 'Completed':
        return <span className="badge badge-status badge-completed"><CheckCircle size={12} /> Completed</span>;
      default:
        return <span className="badge badge-status badge-neutral">{status}</span>;
    }
  };

  const getStageIndicator = (stageName, status) => {
    const stagesList = [
      'Application Submitted',
      'Initial Screening',
      'Technical Review',
      'Evaluation',
      'Approval',
      'Project Execution',
      'Final Review',
      'Completed'
    ];

    let stageIdx = stagesList.findIndex(s => s.toLowerCase() === (stageName || '').toLowerCase());
    if (stageIdx === -1) {
      if (status === 'Approved') stageIdx = 4;
      else if (status === 'In Progress') stageIdx = 5;
      else if (status === 'Technical Review') stageIdx = 2;
      else if (status === 'Under Screening') stageIdx = 1;
      else if (status === 'Completed') stageIdx = 7;
      else stageIdx = 0;
    }

    const stepNum = stageIdx + 1;
    const progressPercent = Math.round((stepNum / 8) * 100);

    return (
      <div className="stage-indicator-cell">
        <div className="stage-label-row">
          <span className="stage-badge-pill">Stage {stepNum} of 8</span>
          <span className="stage-name-text">{stageName || stagesList[stageIdx]}</span>
        </div>
        <div className="stage-progress-bar-bg">
          <div 
            className="stage-progress-bar-fill" 
            style={{ 
              width: `${progressPercent}%`,
              background: status === 'Completed' ? 'var(--color-emerald)' : 'linear-gradient(90deg, #10b981, #06b6d4)'
            }}
          ></div>
        </div>
      </div>
    );
  };

  // Filtered applications
  const filteredApps = tdpApps.filter(app => {
    if (filterUserOnly && app.email !== currentUser.email && app.applicantName !== currentUser.name) {
      return false;
    }

    if (selectedStatus !== 'All Statuses' && app.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }

    if (selectedDomain !== 'All Domains' && app.technologyDomain.toLowerCase() !== selectedDomain.toLowerCase()) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchAppNo = app.applicationNumber?.toLowerCase().includes(q);
      const matchTitle = app.projectTitle?.toLowerCase().includes(q);
      const matchName = app.applicantName?.toLowerCase().includes(q);
      const matchDomain = app.technologyDomain?.toLowerCase().includes(q);
      if (!matchAppNo && !matchTitle && !matchName && !matchDomain) {
        return false;
      }
    }

    return true;
  });

  const totalCount = tdpApps.length;
  const underReviewCount = tdpApps.filter(a => ['Under Screening', 'Technical Review', 'Mentor Review', 'Submitted'].includes(a.status)).length;
  const approvedCount = tdpApps.filter(a => ['Approved', 'In Progress'].includes(a.status)).length;
  const completedCount = tdpApps.filter(a => a.status === 'Completed').length;

  return (
    <div className="techdev-detail-page tdp-tracker-page animate-fade-in">
      {/* Top Navigation Bar */}
      <div className="detail-top-nav">
        <button className="btn-back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Technology Development</span>
        </button>
        <span className="top-nav-breadcrumb">
          VIKAS Platform / 6.1 Technology Development / <strong className="text-emerald">TDP Application Tracking</strong>
        </span>
      </div>

      {/* Main Page Header */}
      <div className="card tracker-hero-card">
        <div className="tracker-hero-flex">
          <div className="hero-text-wrap">
            <div className="hero-badge-row">
              <span className="badge badge-emerald">Single-Window Tracking</span>
              <span className="badge badge-cyan">NM-ICPS R&D Portal</span>
              <span className="badge badge-gold">Read-Only Applicant View</span>
            </div>
            <h1 className="tracker-page-title">Technology Development Project (TDP) Applications</h1>
            <p className="tracker-page-desc">
              Real-time progression tracking for institutional TDP proposals submitted under IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF).
            </p>
          </div>

          <div className="tracker-hero-cta">
            <button 
              className="btn btn-primary-cta"
              onClick={() => onNavigateToApply ? onNavigateToApply() : null}
            >
              <Plus size={16} />
              <span>Submit New TDP Proposal</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Authenticated User Banner */}
        <div className="user-session-banner mt-16">
          <div className="user-session-left">
            <div className="user-avatar-circle">
              <span>SA</span>
            </div>
            <div className="user-session-info">
              <div className="user-name-line">
                <strong>{currentUser.name}</strong>
                <span className="badge badge-emerald font-mono">Authenticated Applicant</span>
              </div>
              <span className="user-meta-sub">
                {currentUser.email} • {currentUser.org} • {currentUser.role}
              </span>
            </div>
          </div>

          <div className="user-session-actions">
            <button 
              className={`btn btn-sm ${filterUserOnly ? 'btn-emerald-active' : 'btn-outline'}`}
              onClick={() => setFilterUserOnly(!filterUserOnly)}
            >
              <ShieldCheck size={14} />
              <span>{filterUserOnly ? 'Showing My Proposals' : 'Show All Institutional Proposals'}</span>
            </button>
            <button 
              className="btn btn-icon-sm"
              onClick={fetchApplications}
              title="Refresh Application Records"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="kpi-summary-grid mt-20">
        <div className="card kpi-card">
          <div className="kpi-icon-wrap bg-emerald-subtle">
            <FileText size={20} className="text-emerald" />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Total Submissions</span>
            <strong className="kpi-number">{totalCount}</strong>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon-wrap bg-cyan-subtle">
            <Activity size={20} className="text-cyan" />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Under Screening / Review</span>
            <strong className="kpi-number text-cyan">{underReviewCount}</strong>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon-wrap bg-amber-subtle">
            <Cpu size={20} className="text-amber" />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Approved & Executing</span>
            <strong className="kpi-number text-amber">{approvedCount}</strong>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-icon-wrap bg-success-subtle">
            <CheckCircle size={20} className="text-emerald" />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">TRL 6 Certified</span>
            <strong className="kpi-number text-emerald">{completedCount}</strong>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="card tracker-filter-bar mt-20">
        <div className="filter-bar-top">
          {/* Keyword Search */}
          <div className="search-box-wrap">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by Application No, Title, Investigator, Domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="btn-clear-search" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>

          {/* Domain Filter */}
          <div className="domain-select-wrap">
            <select 
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="filter-select"
            >
              {ALL_DOMAINS.map(dom => (
                <option key={dom} value={dom}>{dom}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="view-toggle-wrap">
            <button 
              className={`btn-view-toggle ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <LayoutList size={16} />
              <span>Table</span>
            </button>
            <button 
              className={`btn-view-toggle ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Cards View"
            >
              <LayoutGrid size={16} />
              <span>Cards</span>
            </button>
          </div>
        </div>

        {/* Status Filter Horizontal Pills */}
        <div className="status-pill-filter-row mt-14">
          <div className="status-pills-label">
            <Filter size={13} />
            <span>Status Filter:</span>
          </div>
          <div className="status-pills-scroll">
            {ALL_STATUSES.map(st => (
              <button
                key={st}
                className={`status-pill-btn ${selectedStatus === st ? 'active' : ''}`}
                onClick={() => setSelectedStatus(st)}
              >
                {st}
                {st === 'All Statuses' && <span className="pill-count">{tdpApps.length}</span>}
                {st !== 'All Statuses' && (
                  <span className="pill-count">
                    {tdpApps.filter(a => a.status.toLowerCase() === st.toLowerCase()).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="tracker-results-container mt-20">
        {loading ? (
          <div className="card tracker-loading-card">
            <div className="spinner-center">
              <RefreshCw size={28} className="animate-spin text-emerald" />
              <p>Fetching institutional TDP application records...</p>
            </div>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="card tracker-empty-card">
            <div className="empty-content-center">
              <FileText size={48} className="text-muted" />
              <h3>No TDP Applications Found</h3>
              <p>No application records match your selected filter or search criteria.</p>
              <div className="empty-actions-row">
                <button 
                  className="btn btn-outline"
                  onClick={() => {
                    setSelectedStatus('All Statuses');
                    setSelectedDomain('All Domains');
                    setSearchQuery('');
                    setFilterUserOnly(false);
                  }}
                >
                  Clear All Filters
                </button>
                <button 
                  className="btn btn-primary-cta"
                  onClick={() => onNavigateToApply ? onNavigateToApply() : null}
                >
                  <Plus size={16} />
                  <span>Submit Proposal</span>
                </button>
              </div>
            </div>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="card tracker-table-card">
            <div className="table-responsive">
              <table className="tdp-tracker-table">
                <thead>
                  <tr>
                    <th>Application Number</th>
                    <th>Project Title & Domain</th>
                    <th>Submitted Date</th>
                    <th>Current Status</th>
                    <th>Current Stage</th>
                    <th>Last Updated</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr 
                      key={app.applicationNumber} 
                      className="tracker-row"
                      onClick={() => onSelectApplication ? onSelectApplication(app.applicationNumber) : null}
                    >
                      {/* Application Number */}
                      <td className="cell-app-no font-mono">
                        <div className="app-no-chip">
                          <strong>{app.applicationNumber}</strong>
                          <button 
                            className="btn-copy-chip" 
                            onClick={(e) => handleCopy(e, app.applicationNumber)}
                            title="Copy Application Number"
                          >
                            {copiedAppNo === app.applicationNumber ? (
                              <Check size={13} className="text-emerald" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Project Title */}
                      <td className="cell-title">
                        <div className="project-title-text font-semibold">
                          {app.projectTitle}
                        </div>
                        <div className="project-meta-row">
                          <span className="badge badge-domain-pill">{app.technologyDomain}</span>
                          <span className="project-pi-sub">
                            PI: {app.applicantName} ({app.organization})
                          </span>
                        </div>
                      </td>

                      {/* Submitted Date */}
                      <td className="cell-date font-mono">
                        <div className="date-display-flex">
                          <Calendar size={13} className="text-muted" />
                          <span>{app.submittedDate || app.submissionTimestamp?.split(',')[0]}</span>
                        </div>
                      </td>

                      {/* Current Status */}
                      <td className="cell-status">
                        {getStatusBadge(app.status)}
                      </td>

                      {/* Current Stage */}
                      <td className="cell-stage">
                        {getStageIndicator(app.currentStage, app.status)}
                      </td>

                      {/* Last Updated */}
                      <td className="cell-updated font-mono">
                        <div className="date-display-flex">
                          <Clock size={13} className="text-muted" />
                          <span>{app.lastUpdated || app.submissionTimestamp}</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="cell-action text-right">
                        <div className="action-button-group">
                          {(app.status === 'Approved' || app.status === 'In Progress' || app.status === 'Completed' || app.currentStage === 'Project Execution') && (
                            <button 
                              className="btn btn-sm btn-execution-action"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onNavigateToExecution) onNavigateToExecution(app.applicationNumber);
                              }}
                              title="Open Project Execution & Milestone Workspace"
                            >
                              <Zap size={13} />
                              <span>Execution</span>
                            </button>
                          )}
                          <button 
                            className="btn btn-sm btn-track-action"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectApplication) onSelectApplication(app.applicationNumber);
                            }}
                          >
                            <span>Track</span>
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Cards View */
          <div className="tracker-cards-grid">
            {filteredApps.map((app) => (
              <div 
                key={app.applicationNumber}
                className="card tracker-item-card"
                onClick={() => onSelectApplication ? onSelectApplication(app.applicationNumber) : null}
              >
                <div className="card-top-header">
                  <div className="card-app-no font-mono">
                    <strong>{app.applicationNumber}</strong>
                    <button 
                      className="btn-copy-chip" 
                      onClick={(e) => handleCopy(e, app.applicationNumber)}
                      title="Copy Number"
                    >
                      {copiedAppNo === app.applicationNumber ? (
                        <Check size={13} className="text-emerald" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                  {getStatusBadge(app.status)}
                </div>

                <h3 className="card-project-title mt-12">{app.projectTitle}</h3>
                
                <div className="card-domain-badge-wrap mt-8">
                  <span className="badge badge-domain-pill">{app.technologyDomain}</span>
                  <span className="badge badge-trl-pill">
                    TRL {app.currentTrl || 3} → {app.targetTrl || 6}
                  </span>
                </div>

                <div className="card-pi-meta mt-12">
                  <Building2 size={14} className="text-muted" />
                  <span>{app.applicantName} • {app.organization}</span>
                </div>

                <div className="card-stage-section mt-14">
                  {getStageIndicator(app.currentStage, app.status)}
                </div>

                <div className="card-footer-meta mt-16">
                  <div className="meta-dates">
                    <span className="date-item">
                      <Calendar size={12} /> Submitted: {app.submittedDate || app.submissionTimestamp?.split(',')[0]}
                    </span>
                    <span className="date-item">
                      <Clock size={12} /> Updated: {app.lastUpdated?.split(',')[0] || 'Recent'}
                    </span>
                  </div>

                  <div className="card-actions-row">
                    {(app.status === 'Approved' || app.status === 'In Progress' || app.status === 'Completed' || app.currentStage === 'Project Execution') && (
                      <button 
                        className="btn btn-sm btn-execution-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onNavigateToExecution) onNavigateToExecution(app.applicationNumber);
                        }}
                        title="Manage Milestones & Deliverables"
                      >
                        <Zap size={13} />
                        <span>Execution</span>
                      </button>
                    )}
                    <button 
                      className="btn btn-sm btn-track-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectApplication) onSelectApplication(app.applicationNumber);
                      }}
                    >
                      <span>View Dossier</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tdp-tracker-page {
          max-width: 1280px;
          margin: 0 auto;
          padding-bottom: 60px;
        }

        .tracker-hero-card {
          padding: 28px 32px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%), var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: var(--radius-lg);
        }

        .tracker-hero-flex {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
        }

        .tracker-page-title {
          font-family: 'Outfit', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 8px 0 6px 0;
          letter-spacing: -0.02em;
        }

        .tracker-page-desc {
          color: var(--text-secondary);
          font-size: 14px;
          max-width: 780px;
          line-height: 1.5;
          margin: 0;
        }

        .hero-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .badge-emerald {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .badge-cyan {
          background: rgba(6, 182, 212, 0.15);
          color: #06b6d4;
          border: 1px solid rgba(6, 182, 212, 0.3);
        }

        .badge-gold {
          background: rgba(217, 119, 6, 0.15);
          color: #f59e0b;
          border: 1px solid rgba(217, 119, 6, 0.3);
        }

        .btn-primary-cta {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: var(--radius-md);
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
          white-space: nowrap;
        }

        .btn-primary-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .user-session-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .user-session-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #0891b2 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }

        .user-name-line {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-primary);
        }

        .user-meta-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .user-session-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-emerald-active {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid #10b981;
        }

        .btn-icon-sm {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .btn-icon-sm:hover {
          color: var(--text-primary);
          border-color: var(--color-emerald);
        }

        .kpi-summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 900px) {
          .kpi-summary-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .kpi-card {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
        }

        .kpi-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-emerald-subtle { background: rgba(16, 185, 129, 0.12); }
        .bg-cyan-subtle { background: rgba(6, 182, 212, 0.12); }
        .bg-amber-subtle { background: rgba(217, 119, 6, 0.12); }
        .bg-success-subtle { background: rgba(16, 185, 129, 0.16); }

        .kpi-content {
          display: flex;
          flex-direction: column;
        }

        .kpi-label {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .kpi-number {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .tracker-filter-bar {
          padding: 18px 20px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
        }

        .filter-bar-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .search-box-wrap {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: var(--text-secondary);
        }

        .search-input {
          width: 100%;
          padding: 9px 36px 9px 36px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 13px;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--color-emerald);
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15);
        }

        .btn-clear-search {
          position: absolute;
          right: 10px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 16px;
          cursor: pointer;
        }

        .filter-select {
          padding: 9px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 13px;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--color-emerald);
        }

        .view-toggle-wrap {
          display: flex;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .btn-view-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: var(--bg-surface);
          border: none;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-view-toggle.active {
          background: var(--color-emerald);
          color: #ffffff;
        }

        .status-pill-filter-row {
          display: flex;
          align-items: center;
          gap: 12px;
          overflow-x: auto;
          padding-top: 6px;
        }

        .status-pills-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .status-pills-scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .status-pill-btn {
          padding: 5px 12px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all var(--transition-fast);
        }

        .status-pill-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-secondary);
        }

        .status-pill-btn.active {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border-color: #10b981;
          font-weight: 600;
        }

        .pill-count {
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
        }

        .status-pill-btn.active .pill-count {
          background: #10b981;
          color: #ffffff;
        }

        .tracker-table-card {
          padding: 0;
          overflow: hidden;
          border-radius: var(--radius-lg);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .tdp-tracker-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .tdp-tracker-table th {
          padding: 14px 18px;
          background: rgba(15, 23, 42, 0.7);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border-color);
        }

        .tdp-tracker-table td {
          padding: 16px 18px;
          border-bottom: 1px solid var(--border-color);
          font-size: 13px;
          vertical-align: middle;
        }

        .tracker-row {
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .tracker-row:hover {
          background: rgba(16, 185, 129, 0.04);
        }

        .app-no-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 12px;
        }

        .btn-copy-chip {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 2px;
          border-radius: var(--radius-sm);
        }

        .btn-copy-chip:hover {
          color: var(--color-emerald);
        }

        .project-title-text {
          color: var(--text-primary);
          font-size: 14px;
          line-height: 1.3;
        }

        .project-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        .badge-domain-pill {
          background: rgba(6, 182, 212, 0.12);
          color: #06b6d4;
          border: 1px solid rgba(6, 182, 212, 0.25);
          font-size: 11px;
          padding: 1px 7px;
          border-radius: var(--radius-full);
        }

        .badge-trl-pill {
          background: rgba(217, 119, 6, 0.12);
          color: #f59e0b;
          border: 1px solid rgba(217, 119, 6, 0.25);
          font-size: 11px;
          padding: 1px 7px;
          border-radius: var(--radius-full);
        }

        .project-pi-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .date-display-flex {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 12px;
        }

        /* 10 Status Badges */
        .badge-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: var(--radius-full);
        }

        .badge-draft { background: rgba(148, 163, 184, 0.12); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); }
        .badge-submitted { background: rgba(59, 130, 246, 0.12); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }
        .badge-screening { background: rgba(245, 158, 11, 0.12); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
        .badge-tech-review { background: rgba(6, 182, 212, 0.12); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.3); }
        .badge-mentor-review { background: rgba(139, 92, 246, 0.12); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3); }
        .badge-approved { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.4); }
        .badge-in-progress { background: rgba(14, 165, 233, 0.15); color: #0ea5e9; border: 1px solid rgba(14, 165, 233, 0.4); }
        .badge-on-hold { background: rgba(234, 179, 8, 0.15); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.4); }
        .badge-rejected { background: rgba(239, 68, 68, 0.12); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .badge-completed { background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; font-weight: 700; }
        .badge-neutral { background: rgba(255, 255, 255, 0.08); color: var(--text-secondary); }

        .stage-indicator-cell {
          min-width: 170px;
        }

        .stage-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .stage-badge-pill {
          font-weight: 700;
          color: #10b981;
          font-family: monospace;
        }

        .stage-name-text {
          color: var(--text-secondary);
        }

        .stage-progress-bar-bg {
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .stage-progress-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .action-button-group {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
        }

        .card-actions-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-execution-action {
          background: rgba(245, 158, 11, 0.12);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.35);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border-radius: var(--radius-sm);
          padding: 6px 11px;
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .btn-execution-action:hover {
          background: #f59e0b;
          color: #0f172a;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
        }

        .btn-track-action {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-sm);
          padding: 6px 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .btn-track-action:hover {
          background: #10b981;
          color: #ffffff;
        }

        .tracker-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 800px) {
          .tracker-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .tracker-item-card {
          padding: 22px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
        }

        .tracker-item-card:hover {
          transform: translateY(-2px);
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .card-top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-app-no {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-primary);
          font-size: 13px;
        }

        .card-project-title {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.35;
        }

        .card-domain-badge-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-pi-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .card-footer-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
          margin-top: auto;
        }

        .meta-dates {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .date-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-secondary);
          font-family: monospace;
        }

        .tracker-loading-card,
        .tracker-empty-card {
          padding: 60px 20px;
          text-align: center;
          border-radius: var(--radius-lg);
        }

        .spinner-center,
        .empty-content-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .empty-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
        }

        .mt-8 { margin-top: 8px; }
        .mt-12 { margin-top: 12px; }
        .mt-14 { margin-top: 14px; }
        .mt-16 { margin-top: 16px; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
}
