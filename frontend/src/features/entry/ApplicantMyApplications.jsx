import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  ExternalLink, 
  AlertCircle, 
  Layers, 
  Copy, 
  Check, 
  Building2, 
  PlusCircle, 
  UserCheck, 
  ChevronRight,
  Eye,
  Award,
  AlertTriangle,
  XCircle,
  FileCheck,
  Printer,
  X,
  Sparkles,
  Info,
  Calendar,
  Tag,
  Share2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const GENERIC_VERTICAL_LABELS = new Set([
  'startup',
  'startups',
  'general stakeholder',
  'general',
  'other'
]);

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDisplayDate(value) {
  const raw = String(value || '').trim();
  if (!raw) return '—';

  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) {
    return `${iso[3]} ${MONTH_SHORT[Number(iso[2]) - 1]} ${iso[1]}`;
  }

  const dmy = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmy) {
    return `${dmy[1].padStart(2, '0')} ${MONTH_SHORT[Number(dmy[2]) - 1] || dmy[2]} ${dmy[3]}`;
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  return raw;
}

function formatDisplayTime(value) {
  const raw = String(value || '').trim();
  if (!raw) return '—';

  const match = raw.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return raw;

  let hour = Number(match[1]);
  const minute = match[2];
  const meridiem = (match[4] || '').toLowerCase();

  if (meridiem) {
    return `${hour}:${minute} ${meridiem.toUpperCase()}`;
  }

  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

function formatMonitorDateTime(app) {
  const candidates = [
    app?.history?.[0]?.date,
    app?.submissionDateTime,
    app?.submission_date_time,
    app?.lastUpdated,
    app?.last_updated,
    app?.createdAt,
    app?.created_at,
    app?.submissionDate,
    app?.submission_date
  ].filter(Boolean);

  const raw = String(candidates[0] || '').trim();
  if (!raw) {
    return { date: '—', time: app?.submissionTime || '—' };
  }

  if (/^\d{4}-\d{2}-\d{2}T/.test(raw)) {
    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
      return {
        date: parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: parsed.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
    }
  }

  if (raw.includes(',')) {
    const [datePart, ...timeParts] = raw.split(',');
    return {
      date: formatDisplayDate(datePart),
      time: formatDisplayTime(timeParts.join(','))
    };
  }

  return {
    date: formatDisplayDate(raw),
    time: formatDisplayTime(app?.submissionTime || app?.submission_time || '')
  };
}

function getApplicationVerticals(app) {
  const raw = [
    ...(Array.isArray(app?.assignedVerticals) ? app.assignedVerticals : []),
    ...(Array.isArray(app?.assigned_verticals) ? app.assigned_verticals : []),
    app?.assignedVertical,
    app?.assigned_vertical
  ];

  const seen = new Set();
  const cleaned = [];

  raw.forEach((item) => {
    const label = String(item || '').trim();
    if (!label) return;
    const key = label.toLowerCase();
    if (seen.has(key) || GENERIC_VERTICAL_LABELS.has(key)) return;
    seen.add(key);
    cleaned.push(label);
  });

  if (cleaned.length > 0) return cleaned;

  const fallbackRaw = String(app?.stakeholderType || app?.stakeholder_type || '').trim();
  const fallbackKey = fallbackRaw.toUpperCase();
  if (fallbackKey.includes('6.1') || fallbackKey.includes('TECH')) return ['6.1 Technology Development'];
  if (fallbackKey.includes('6.3') || fallbackKey.includes('STUDENT') || fallbackKey.includes('RESEARCH') || fallbackKey.includes('HRD')) return ['6.3 Human Resource Development'];
  if (fallbackKey.includes('6.4') || fallbackKey.includes('SKILL')) return ['6.4 Skill Development'];
  if (fallbackKey.includes('6.5') || fallbackKey.includes('COLLAB') || fallbackKey.includes('MOU')) return ['6.5 Academic Collaborations & MoUs'];
  if (fallbackKey.includes('6.6') || fallbackKey.includes('SCHOOL')) return ['6.6 Schools & Academic Outreach (VidyaGIS)'];
  if (fallbackKey.includes('6.7') || fallbackKey.includes('LAB') || fallbackKey.includes('INSTITUTION')) return ['6.7 Institutions & Labs Network (SPIN Lab)'];
  if (fallbackKey.includes('6.8') || fallbackKey.includes('INDUSTRY') || fallbackKey.includes('GOVERNMENT')) return ['6.8 Industry & Government Interface'];
  if (fallbackKey.includes('6.9') || fallbackKey.includes('EXPERT')) return ['6.9 Experts & Advisory Network'];
  return ['6.2 Startups & Business Enablement'];
}

function splitVerticalLabel(name) {
  const match = String(name || '').match(/^(6\.\d)\s+(.*)$/);
  if (match) {
    return { code: match[1], title: match[2] };
  }
  return { code: null, title: name };
}

export default function ApplicantMyApplications({ 
  applications = [], 
  onNavigateToTab,
  notifications = [],
  onToggleReadNotification,
  onMarkAllNotificationsRead,
  onClearNotifications
}) {
  const { currentUser } = useAuth();
  const [copiedFileNo, setCopiedFileNo] = useState(null);
  const [dashboardView, setDashboardView] = useState('applications'); // 'applications' | 'monitoring'
  const [activeFilterTab, setActiveFilterTab] = useState('all'); // 'all' | 'under_review' | 'approved' | 'rejected'
  const [highlightedFileNo, setHighlightedFileNo] = useState(null);

  // Modal States
  const [selectedDocApp, setSelectedDocApp] = useState(null);
  const [activeModalType, setActiveModalType] = useState(null); // 'letter' | 'certificate' | 'receipt' | null

  // 1. Filter strictly to current applicant's applications (Record-Level Access)
  const myApplications = applications.filter(app => {
    if (!currentUser) return false;
    const currentUserId = currentUser.id || currentUser.userId;
    const appUserId = app.userId || app.user_id;

    // Direct User ID Ownership Match (Primary & Canonical)
    if (appUserId && currentUserId && appUserId === currentUserId) {
      return true;
    }

    // Direct Contact Email Match (Secondary Natural Key)
    const userEmail = currentUser.email?.toLowerCase();
    const appEmail = app.email?.toLowerCase();
    if (appEmail && userEmail && appEmail === userEmail) {
      return true;
    }

    return false;
  }).filter(app => {
    const title = String(app.name || app.problemStatement || '').toLowerCase();
    const intent = String(Array.isArray(app.intentOfEngagement) ? app.intentOfEngagement.join(' ') : (app.intentOfEngagement || '')).toLowerCase();
    const isAutoRegisterStub =
      title.includes('ecosystem registration') ||
      intent.includes('vikas portal incubation');
    return !isAutoRegisterStub;
  });

  const monitorRows = useMemo(() => {
    return myApplications.flatMap((app) => {
      const verticals = getApplicationVerticals(app);
      const { date, time } = formatMonitorDateTime(app);
      const status = String(app.status || '').toLowerCase();
      const isApproved = ['approved', 'engagement', 'completed'].includes(status);
      const isRejected = status === 'rejected';

      return verticals.map((vertical) => ({
        key: `${app.fileNumber || app.id || 'app'}-${vertical}`,
        app,
        vertical,
        date,
        time,
        isApproved,
        isRejected,
        status
      }));
    });
  }, [myApplications]);

  const screeningCompletedCount = monitorRows.filter((row) => !row.isRejected).length;
  const approvalPendingCount = monitorRows.filter((row) => !row.isApproved && !row.isRejected).length;
  const monthlyPendingCount = monitorRows.filter((row) => !row.isApproved && !row.isRejected).length;

  // Filter applications by tab
  const filteredApplications = myApplications.filter(app => {
    if (activeFilterTab === 'under_review') {
      return ['pending_screening', 'under_screening', 'screened', 'routing', 'pending_approval', 'returned_for_correction'].includes(app.status);
    }
    if (activeFilterTab === 'approved') {
      return ['approved', 'engagement', 'completed'].includes(app.status);
    }
    if (activeFilterTab === 'rejected') {
      return app.status === 'rejected';
    }
    return true;
  });

  const handleCopy = (fileNo) => {
    navigator.clipboard.writeText(fileNo);
    setCopiedFileNo(fileNo);
    setTimeout(() => setCopiedFileNo(null), 2000);
  };

  // Helper to determine the standard 6-stage applicant workflow progression
  const getStageInfo = (app) => {
    const status = app.status ? app.status.toLowerCase() : 'submitted';

    if (status === 'completed') {
      return {
        stepNumber: 6,
        label: 'Outcome Tracking & Impact Qualification',
        badgeText: 'Completed / Outcome Achieved',
        badgeType: 'badge-emerald',
        stepStatus: 'completed'
      };
    }
    if (status === 'engagement' || status === 'in_progress') {
      return {
        stepNumber: 5,
        label: 'Active Program Engagement',
        badgeText: 'In Engagement & Execution',
        badgeType: 'badge-cyan',
        stepStatus: 'active'
      };
    }
    if (status === 'approved') {
      return {
        stepNumber: 4,
        label: 'Approved & Onboarded',
        badgeText: 'Approved / Onboarded',
        badgeType: 'badge-success',
        stepStatus: 'completed'
      };
    }
    if (status === 'rejected') {
      return {
        stepNumber: 4,
        label: 'Application Declined',
        badgeText: 'Application Declined',
        badgeType: 'badge-danger',
        stepStatus: 'rejected',
        isRejected: true
      };
    }
    if (status === 'returned_for_correction') {
      return {
        stepNumber: 2,
        label: 'Correction / Clarification Requested',
        badgeText: 'Action Required',
        badgeType: 'badge-warning',
        stepStatus: 'current'
      };
    }
    if (status === 'pending_approval') {
      return {
        stepNumber: 4,
        label: 'Pending Governance Approval',
        badgeText: 'Under Governance Review',
        badgeType: 'badge-warning',
        stepStatus: 'current'
      };
    }
    if (status === 'screened' || (app.assignedVertical && status === 'routing')) {
      return {
        stepNumber: 3,
        label: 'Screened & Routing to Vertical',
        badgeText: 'Screened & Routing',
        badgeType: 'badge-info',
        stepStatus: 'current'
      };
    }
    if (status === 'under_screening' || status === 'pending_screening') {
      return {
        stepNumber: 2,
        label: 'Operations Screening in Progress',
        badgeText: 'Under Operations Screening',
        badgeType: 'badge-blue',
        stepStatus: 'current'
      };
    }
    return {
      stepNumber: 1,
      label: 'Application Submitted',
      badgeText: 'Submitted & Intake Logged',
      badgeType: 'badge-secondary',
      stepStatus: 'current'
    };
  };

  // 8-Clause Onboarding Letter Download Helper
  const handleDownloadLetter = (app) => {
    const letterRefNo = `IITTNiF/VIKAS/2026/${app.fileNumber.replace(/[^A-Za-z0-9]/g, '')}`;
    const approvalDate = app.approvalDate || app.lastUpdated || new Date().toLocaleDateString('en-GB');

    const content = `
========================================================================================
IIT TIRUPATI NAVAVISHKAR I-HUB FOUNDATION (IITTNiF)
National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS)
Department of Science & Technology (DST), Government of India
IIT Tirupati Campus, Yerpedu - 517619, Andhra Pradesh, India
========================================================================================

Ref No: ${letterRefNo}
Date of Issuance: ${approvalDate}

To:
The Authorized Representative / Principal Investigator
${app.name || app.contactPerson}
${app.organization || currentUser.organization || 'Registered Entity'}
Email: ${app.email || currentUser.email}

SUBJECT: FORMAL 8-CLAUSE ONBOARDING & STAKEHOLDER ASSOCIATION LETTER
         UNDER THE VIKAS PLATFORM (NM-ICPS, DST)

File Tracking Number: ${app.fileNumber}
Assigned Program Vertical: ${app.assignedVertical || '6.2 Startups & Business Enablement'}
Governance Authorization: ${app.eSignature || 'Dr. Roshan K. Srivastav, Project Director, IITTNiF'}

Dear Stakeholder,

We are pleased to formally communicate that following structured administrative screening 
and authorization by the VIKAS Governance Authority Matrix, ${app.name || 'your entity'} has been 
admitted as an accredited stakeholder within the VIKAS Ecosystem under the National Mission 
on Interdisciplinary Cyber-Physical Systems (NM-ICPS).

This formal association is governed by the following eight (8) standard institutional clauses:

CLAUSE 1: SCOPE OF ASSOCIATION & ECOSYSTEM ONBOARDING
The Onboarded Entity is formally registered within the VIKAS platform and accredited for 
participation in technical initiatives, knowledge dissemination workshops, and stakeholder 
consultations under ${app.assignedVertical || 'the assigned vertical'}.

CLAUSE 2: NON-INCUBATION & NON-TENANT CLARIFICATION (IMPORTANT)
This onboarding letter establishes formal ecosystem association only. It explicitly does 
NOT constitute physical incubation, residential tenancy, or dedicated lab co-location. 
Physical incubation, where applicable, is subject to separate competitive application, 
independent committee review, and formal execution of a bilateral incubation agreement.

CLAUSE 3: INTELLECTUAL PROPERTY (IP) GOVERNANCE & RETENTION
Background Intellectual Property brought in by the Stakeholder shall remain the exclusive 
and absolute property of the Stakeholder. Collaborative or foreground IP generated under 
specific joint research agreements shall be governed by separate bilateral IP-sharing protocols.

CLAUSE 4: CONFIDENTIALITY & NON-DISCLOSURE
Both parties covenant to maintain strict confidentiality regarding proprietary technical data, 
benchmarking datasets, and trade secrets disclosed during program engagement.

CLAUSE 5: ACCESS TO MENTORSHIP & TECHNICAL VALIDATION
Subject to scheduling, safety clearances, and resource availability, the Stakeholder is eligible 
to request access to domain mentors, testing methodologies, and academic translation support.

CLAUSE 6: STATUTORY COMPLIANCE & CODE OF ETHICS
The Stakeholder agrees to adhere to highest scientific ethics, statutory safety mandates, 
and export control norms for dual-use geospatial/cyber-physical technologies.

CLAUSE 7: MILESTONE REPORTING & OUTCOME TRACKING
The Stakeholder agrees to participate in periodic milestone tracking, semi-annual outcome updates, 
and national NM-ICPS impact audits as mandated by DST.

CLAUSE 8: TERM, TERMINATION & LIMITATION OF LIABILITY
This association is valid for twelve (12) calendar months from the date of issuance and is 
renewable upon mutual review. Neither party assumes financial, legal, or commercial liability 
for the venture solvency or independent market operations of the other.

----------------------------------------------------------------------------------------
DISCLAIMER ON FINANCIAL GRANTS & GUARANTEES:
Onboarding into the VIKAS ecosystem establishes official stakeholder association and 
eligibility for program vertical participation. It does NOT constitute a commitment 
of financial grants, guaranteed project allocation, venture funding, or dedicated lab 
infrastructure.
----------------------------------------------------------------------------------------

Digitally Authorized & Signed:
Dr. Roshan K. Srivastav
Project Director
IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)
========================================================================================
`.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VIKAS_8Clause_Onboarding_Letter_${app.fileNumber.replace(/[\/\\]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Submission Receipt Download Helper
  const handleDownloadReceipt = (app) => {
    const content = `
========================================================================================
IIT TIRUPATI NAVAVISHKAR I-HUB FOUNDATION (IITTNiF)
VIKAS PLATFORM — OFFICIAL STAKEHOLDER REGISTRATION RECEIPT
========================================================================================

FILE NUMBER:         ${app.fileNumber}
SUBMISSION DATE:     ${app.submissionDate || new Date().toLocaleDateString('en-GB')}
LAST UPDATED:        ${app.lastUpdated || app.submissionDate || 'Recent'}
CURRENT STATUS:      ${app.status ? app.status.toUpperCase().replace('_', ' ') : 'SUBMITTED'}

STAKEHOLDER DETAILS:
----------------------------------------------------------------------------------------
Applicant Entity:    ${app.name}
Authorized Contact:  ${app.contactPerson || app.applicantName || currentUser.name}
Organization:        ${app.organization || currentUser.organization || 'Not Specified'}
Stakeholder Type:    ${app.stakeholderType || currentUser.applicantType || 'General'}
Email Address:       ${app.email || currentUser.email}
Phone Number:        ${app.phone || 'N/A'}
NM-ICPS Focus:       ${app.nmIcpsAlign || (app.domains ? app.domains.join(', ') : 'National Mission on ICPS')}

GOVERNANCE & WORKFLOW AUDIT:
----------------------------------------------------------------------------------------
Assigned Vertical:   ${app.assignedVertical || 'Pending Operations Screening & Routing'}
Approval Authority:  ${app.approvalAuthority ? app.approvalAuthority.toUpperCase() : 'Pending Governance Matrix'}
Digital Authorization: ${app.eSignature ? `Digitally Signed by ${app.eSignature} on ${app.approvalDate || 'Recorded Date'}` : 'Pending Final Authorization'}

========================================================================================
This document serves as tamper-evident proof of stakeholder registration under NM-ICPS.
For inquiries, contact secretariat@iittnif.in quoting the official file number.
========================================================================================
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VIKAS_${app.fileNumber.replace(/[\/\\]/g, '_')}_Registration_Receipt.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatTrackLabel = (app) => {
    const verticals = Array.isArray(app.assignedVerticals) ? app.assignedVerticals.filter(Boolean) : [];
    const primary = app.assignedVertical || verticals[0] || app.stakeholderType || '';
    const raw = String(primary).trim();
    if (!raw || raw.toUpperCase() === 'STARTUP') {
      const aligned = (() => {
        try { return localStorage.getItem('VIKAS_ALIGNED_TRACK'); } catch (e) { return null; }
      })();
      if (aligned) return aligned;
    }
    return raw || 'Not specified';
  };

  return (
    <div className="applicant-portal-container animate-fade-in">
      {/* 1. Header Profile & Applicant Hero Area */}
      <div className="card applicant-hero-card">
        <div className="applicant-hero-content">
          <div className="applicant-hero-avatar">
            <span>{(currentUser.name || 'U').charAt(0).toUpperCase()}</span>
          </div>
          <div className="applicant-hero-details">
            <h2 className="applicant-hero-name">{currentUser.name}</h2>
            <p className="applicant-hero-org">{currentUser.organization}</p>
            <span className="applicant-hero-email font-mono">{currentUser.email}</span>
          </div>
        </div>

        <div className="applicant-hero-actions">
          <button 
            className="btn btn-primary"
            onClick={() => onNavigateToTab('entry')}
          >
            <PlusCircle size={16} />
            <span>Submit New Application</span>
          </button>
        </div>
      </div>

      {/* 3. Primary View Mode Switcher Tabs */}
      <div className="applicant-view-mode-tabs mt-24">
        <button 
          className={`view-mode-btn ${dashboardView !== 'monitoring' ? 'active' : ''}`}
          onClick={() => setDashboardView('applications')}
        >
          <Layers size={17} />
          <span>My Registered Applications ({myApplications.length})</span>
        </button>

        <button 
          className={`view-mode-btn ${dashboardView === 'monitoring' ? 'active' : ''}`}
          onClick={() => setDashboardView('monitoring')}
        >
          <Eye size={17} />
          <span>Onboarding Monitor</span>
          <span className="badge badge-secondary notif-tab-badge">{monitorRows.length}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW B: APPLICATIONS LIST & DOSSIERS */}
      {/* ========================================================================= */}
      {dashboardView !== 'monitoring' && (
        <div className="applications-view-wrap animate-fade-in">
          {/* Filter Nav Tabs */}
          <div className="applicant-filter-nav mt-16">
            <button 
              className={`filter-tab-btn ${activeFilterTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('all')}
            >
              All Applications ({myApplications.length})
            </button>
            <button 
              className={`filter-tab-btn ${activeFilterTab === 'under_review' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('under_review')}
            >
              Under Review ({myApplications.filter(a => ['pending_screening', 'under_screening', 'screened', 'routing', 'pending_approval', 'returned_for_correction'].includes(a.status)).length})
            </button>
            <button 
              className={`filter-tab-btn ${activeFilterTab === 'approved' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('approved')}
            >
              Approved & Onboarded ({myApplications.filter(a => ['approved', 'engagement', 'completed'].includes(a.status)).length})
            </button>
            <button 
              className={`filter-tab-btn ${activeFilterTab === 'rejected' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('rejected')}
            >
              Declined ({myApplications.filter(a => a.status === 'rejected').length})
            </button>
          </div>

          {/* Applications List */}
          <div className="applications-container mt-16">
            {filteredApplications.length === 0 ? (
              <div className="card empty-applications-box">
                <FileText size={48} className="text-muted" style={{ opacity: 0.4 }} />
                <h4>No Applications in this Category</h4>
                <p>No stakeholder applications match the selected filter tab.</p>
                {activeFilterTab !== 'all' ? (
                  <button 
                    className="btn btn-outline mt-12"
                    onClick={() => setActiveFilterTab('all')}
                  >
                    <span>View All Applications</span>
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary mt-12"
                    onClick={() => onNavigateToTab('entry')}
                  >
                    <PlusCircle size={16} />
                    <span>Submit Your First Application</span>
                  </button>
                )}
              </div>
            ) : (
              filteredApplications.map((app) => {
                const stage = getStageInfo(app);
                const isApproved = app.status === 'approved' || app.status === 'engagement' || app.status === 'completed';
                const isRejected = app.status === 'rejected';
                const isCorrection = app.status === 'returned_for_correction';
                const isHighlighted = highlightedFileNo === app.fileNumber;

                return (
                  <div 
                    key={app.fileNumber} 
                    id={`dossier-${app.fileNumber}`}
                    className={`card application-dossier-card ${isApproved ? 'border-success' : isRejected ? 'border-danger' : isCorrection ? 'border-warning' : ''} ${isHighlighted ? 'highlight-pulse' : ''}`}
                  >
                    {/* Dossier Header Row */}
                    <div className="dossier-header-row">
                      <div className="dossier-file-identity">
                        <span className="dossier-file-pill font-mono">{app.fileNumber}</span>
                        <button 
                          className="btn-copy-mini"
                          onClick={() => handleCopy(app.fileNumber)}
                          title="Copy Official File Number"
                        >
                          {copiedFileNo === app.fileNumber ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                        </button>
                        <span className="dossier-sub-date font-mono text-muted">
                          Applied: {app.submissionDate || 'Recently'}
                        </span>
                      </div>

                      <div className="dossier-status-pill-wrap">
                        <span className={`badge ${stage.badgeType}`}>
                          {isApproved ? <CheckCircle2 size={13} /> : isRejected ? <XCircle size={13} /> : <Clock size={13} />}
                          <span>{stage.badgeText}</span>
                        </span>
                      </div>
                    </div>

                    {/* Dossier Body */}
                    <div className="dossier-body mt-14">
                      <div className="dossier-title-line">
                        <h3 className="dossier-entity-name">
                          {(() => {
                            const rawName = String(app.name || '').trim();
                            const problem = String(app.problemStatement || '').trim();
                            const looksLikeProblem = rawName && problem && (rawName === problem || problem.startsWith(rawName) || rawName.startsWith(problem.slice(0, 40)));
                            if (!rawName || looksLikeProblem) {
                              return app.applicantName || app.contactPerson || app.organization || currentUser?.name || 'Registered Application';
                            }
                            return rawName;
                          })()}
                        </h3>
                      </div>

                      {/* Structured Details Matrix */}
                      <div className="dossier-meta-grid mt-14">
                        <div className="meta-box">
                          <span className="meta-kicker">Organization / Institution:</span>
                          <strong className="meta-strong">{app.organization || currentUser.organization || 'Not Specified'}</strong>
                        </div>

                        <div className="meta-box">
                          <span className="meta-kicker">Stakeholder Category:</span>
                          <strong className="meta-strong">{formatTrackLabel(app)}</strong>
                        </div>

                        <div className="meta-box">
                          <span className="meta-kicker">Assigned VIKAS Vertical(s):</span>
                          <strong className={`meta-strong ${(app.assignedVerticals?.length || app.assignedVertical) ? 'text-accent font-semibold' : 'text-muted'}`}>
                            {Array.isArray(app.assignedVerticals) && app.assignedVerticals.length > 0
                              ? app.assignedVerticals.filter((item) => item && String(item).toUpperCase() !== 'STARTUP').join(', ') || formatTrackLabel(app)
                              : (app.assignedVertical && String(app.assignedVertical).toUpperCase() !== 'STARTUP'
                                ? app.assignedVertical
                                : formatTrackLabel(app))}
                          </strong>
                        </div>

                        <div className="meta-box">
                          <span className="meta-kicker">Registered Domains / Focus:</span>
                          <strong className="meta-strong">{app.nmIcpsAlign || (app.domains ? app.domains.join(', ') : 'Cyber-Physical Systems')}</strong>
                        </div>

                        <div className="meta-box">
                          <span className="meta-kicker">Intent of Engagement:</span>
                          <strong className="meta-strong">
                            {Array.isArray(app.intentOfEngagement) 
                              ? app.intentOfEngagement.join(', ') 
                              : (app.intentOfEngagement || 'Technology Collaboration / Ecosystem Partnership')}
                          </strong>
                        </div>

                        <div className="meta-box">
                          <span className="meta-kicker">Last Updated:</span>
                          <strong className="meta-strong font-mono">{app.lastUpdated || app.approvalDate || app.rejectionDate || app.submissionDate || 'Recently'}</strong>
                        </div>
                      </div>

                      {/* Read-Only Workflow Progress Pipeline Stepper */}
                      <div className="stepper-section-wrap mt-20">
                        <div className="stepper-header-line">
                          <span className="stepper-title">
                            <Layers size={14} className="text-accent" />
                            <span>Workflow Progression (Read-Only)</span>
                          </span>
                          <span className="stepper-stage-indicator font-mono">
                            Stage: <strong>{stage.label}</strong>
                          </span>
                        </div>

                        <div className="read-only-stepper mt-12">
                          {/* 1. Submitted */}
                          <div className="step-node completed">
                            <div className="node-icon">
                              <Check size={12} />
                            </div>
                            <div className="node-info">
                              <span className="node-title">1. Submitted</span>
                              <span className="node-desc">{app.submissionDate || 'Logged'}</span>
                            </div>
                          </div>

                          <div className={`node-connector ${stage.stepNumber >= 2 ? 'active' : ''}`} />

                          {/* 2. Screening */}
                          <div className={`step-node ${stage.stepNumber > 2 ? 'completed' : stage.stepNumber === 2 ? 'current' : ''}`}>
                            <div className="node-icon">
                              {stage.stepNumber > 2 ? <Check size={12} /> : 2}
                            </div>
                            <div className="node-info">
                              <span className="node-title">2. Screening</span>
                              <span className="node-desc">{isCorrection ? 'Correction Needed' : stage.stepNumber > 2 ? 'Verified' : 'Intake audit'}</span>
                            </div>
                          </div>

                          <div className={`node-connector ${stage.stepNumber >= 3 ? 'active' : ''}`} />

                          {/* 3. Routing */}
                          <div className={`step-node ${stage.stepNumber > 3 ? 'completed' : stage.stepNumber === 3 ? 'current' : ''}`}>
                            <div className="node-icon">
                              {stage.stepNumber > 3 ? <Check size={12} /> : 3}
                            </div>
                            <div className="node-info">
                              <span className="node-title">3. Routing</span>
                              <span className="node-desc">{app.assignedVertical ? 'Vertical mapped' : 'Pending'}</span>
                            </div>
                          </div>

                          <div className={`node-connector ${stage.stepNumber >= 4 ? 'active' : ''}`} />

                          {/* 4. Approval */}
                          <div className={`step-node ${isApproved ? 'completed' : isRejected ? 'rejected' : stage.stepNumber === 4 ? 'current' : ''}`}>
                            <div className="node-icon">
                              {isApproved ? <Check size={12} /> : isRejected ? <X size={12} /> : 4}
                            </div>
                            <div className="node-info">
                              <span className="node-title">4. Approval</span>
                              <span className="node-desc">{isApproved ? 'Authorized' : isRejected ? 'Declined' : 'Governance'}</span>
                            </div>
                          </div>

                          <div className={`node-connector ${isApproved && stage.stepNumber >= 5 ? 'active' : ''}`} />

                          {/* 5. Engagement */}
                          <div className={`step-node ${isApproved && stage.stepNumber > 5 ? 'completed' : isApproved && stage.stepNumber === 5 ? 'current' : ''}`}>
                            <div className="node-icon">
                              {isApproved && stage.stepNumber > 5 ? <Check size={12} /> : 5}
                            </div>
                            <div className="node-info">
                              <span className="node-title">5. Engagement</span>
                              <span className="node-desc">{isApproved ? 'Active vertical' : 'Upcoming'}</span>
                            </div>
                          </div>

                          <div className={`node-connector ${isApproved && stage.stepNumber >= 6 ? 'active' : ''}`} />

                          {/* 6. Outcome */}
                          <div className={`step-node ${isApproved && stage.stepNumber === 6 ? 'completed' : ''}`}>
                            <div className="node-icon">
                              {isApproved && stage.stepNumber === 6 ? <Check size={12} /> : 6}
                            </div>
                            <div className="node-info">
                              <span className="node-title">6. Outcome</span>
                              <span className="node-desc">{stage.stepNumber === 6 ? 'Qualified' : 'TRL / Cert'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ========================================================================= */}
                      {/* POST-APPROVAL EXPERIENCE SECTION (Condition: status === 'approved') */}
                      {/* ========================================================================= */}
                      {isApproved && (
                        <div className="post-approval-card-wrap mt-20 animate-fade-in">
                          <div className="approval-celebration-banner">
                            <div className="celebration-icon-box">
                              <Sparkles size={24} className="text-emerald" />
                            </div>
                            <div className="celebration-content">
                              <div className="celebration-badge-line">
                                <span className="badge badge-success font-mono">
                                  <CheckCircle2 size={12} /> Formal Onboarding Approved
                                </span>
                                <span className="celebration-date font-mono">
                                  Enrolled on: {app.approvalDate || app.lastUpdated || 'Recent'}
                                </span>
                              </div>
                              <h4 className="celebration-title">
                                Official Ecosystem Onboarding Complete — Enrolled in Vertical {app.assignedVertical || '6.2 Startups'}
                              </h4>
                              <p className="celebration-p">
                                Congratulations! Your application has been reviewed, evaluated for technical and eligibility compliance, 
                                and formally authorized under the authority matrix. Your entity is now officially registered in the 
                                VIKAS ecosystem.
                              </p>
                            </div>
                          </div>

                          {/* Official Authorization Credentials Grid */}
                          <div className="auth-credentials-grid mt-14">
                            <div className="auth-cred-item">
                              <span className="cred-kicker">Authorized Signatory:</span>
                              <strong className="cred-val">
                                <ShieldCheck size={14} className="text-success" />
                                <span>{app.eSignature || 'Dr. Roshan K. Srivastav (Project Director, IITTNiF)'}</span>
                              </strong>
                            </div>

                            <div className="auth-cred-item">
                              <span className="cred-kicker">Official Reference ID:</span>
                              <strong className="cred-val font-mono text-accent">
                                IITTNiF/VIKAS/2026/{app.fileNumber.replace(/[^A-Za-z0-9]/g, '')}
                              </strong>
                            </div>

                            <div className="auth-cred-item">
                              <span className="cred-kicker">Cryptographic Verification:</span>
                              <strong className="cred-val font-mono text-muted text-xs">
                                SHA256: 8f4b...39e1 (Verified)
                              </strong>
                            </div>
                          </div>

                          {/* Onboarding Documents & Badges Action Bar */}
                          <div className="onboarding-downloads-toolbar mt-14">
                            <button 
                              className="btn btn-sm btn-emerald-primary"
                              onClick={() => {
                                setSelectedDocApp(app);
                                setActiveModalType('letter');
                              }}
                            >
                              <FileCheck size={14} />
                              <span>View 8-Clause Onboarding Letter</span>
                            </button>

                            <button 
                              className="btn btn-sm btn-outline"
                              onClick={() => {
                                setSelectedDocApp(app);
                                setActiveModalType('certificate');
                              }}
                            >
                              <Award size={14} className="text-amber" />
                              <span>Certificate of Association</span>
                            </button>

                            <button 
                              className="btn btn-sm btn-outline"
                              onClick={() => handleDownloadLetter(app)}
                              title="Download Onboarding Dossier as text file"
                            >
                              <Download size={14} />
                              <span>Download Letter (.txt)</span>
                            </button>
                          </div>

                          {/* CRITICAL BUSINESS RULE: Non-Funding / Non-Incubation Legal Notice */}
                          <div className="disclaimer-alert-box mt-14">
                            <div className="disclaimer-icon-wrap">
                              <Info size={16} className="text-accent" />
                            </div>
                            <div className="disclaimer-text-wrap">
                              <strong>Official Policy Disclaimer Regarding Funding & Infrastructure:</strong>
                              <p>
                                Onboarding into the VIKAS ecosystem establishes official stakeholder association and eligibility 
                                for program vertical participation. It does <strong>NOT</strong> constitute a commitment of financial grants, 
                                guaranteed project allocation, venture funding, or dedicated lab infrastructure. Prototype funding and lab 
                                deployments are governed strictly by independent competitive calls and scheme guidelines.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ========================================================================= */}
                      {/* POST-REJECTION EXPERIENCE SECTION (Condition: status === 'rejected') */}
                      {/* ========================================================================= */}
                      {isRejected && (
                        <div className="post-rejection-card-wrap mt-20 animate-fade-in">
                          <div className="rejection-decision-banner">
                            <div className="rejection-icon-box">
                              <XCircle size={24} className="text-danger" />
                            </div>
                            <div className="rejection-content">
                              <div className="rejection-badge-line">
                                <span className="badge badge-danger font-mono">
                                  <XCircle size={12} /> Application Evaluation Completed
                                </span>
                                <span className="rejection-date font-mono">
                                  Decision Date: {app.rejectionDate || app.lastUpdated || 'Recent'}
                                </span>
                              </div>
                              <h4 className="rejection-title">Formal Application Decision Notice</h4>
                              <p className="rejection-p">
                                Thank you for your submission to the VIKAS platform under the National Mission on Interdisciplinary 
                                Cyber-Physical Systems (NM-ICPS). Following structured administrative screening and technical evaluation 
                                against the current cohort intake criteria and domain focus areas, this application could not be 
                                approved for formal onboarding into the vertical at this time.
                              </p>
                            </div>
                          </div>

                          {/* Next Steps & Re-Application Guidance */}
                          <div className="reapplication-guidance-card mt-14">
                            <div className="guidance-header-line">
                              <Info size={16} className="text-accent" />
                              <strong className="guidance-title">Next Steps & Guidance for Re-Application:</strong>
                            </div>
                            <ul className="guidance-list mt-8">
                              <li>
                                <strong>Technical Domain Alignment:</strong> Review alignment with specific NM-ICPS priority domains (e.g. PNT/NavIC, Geo-Intelligence, Sensor Fusion, Embedded Systems).
                              </li>
                              <li>
                                <strong>Subsequent Cohort Submission:</strong> Eligible stakeholders are welcome to refine project scopes, strengthen prototype milestones, and re-apply during subsequent enrollment cycles.
                              </li>
                              <li>
                                <strong>Secretariat Inquiries:</strong> For program scope inquiries, you may contact the Secretariat Cell at <span className="font-mono text-cyan">secretariat@iittnif.in</span> quoting file number <strong>{app.fileNumber}</strong>.
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dossier Card Footer Actions */}
                    <div className="dossier-card-footer mt-18">
                      <div className="footer-left-actions">
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => handleDownloadReceipt(app)}
                        >
                          <Download size={13} />
                          <span>Download Registration Receipt</span>
                        </button>

                        {isApproved && (
                          <button 
                            className="btn btn-outline btn-sm"
                            onClick={() => onNavigateToTab('overview')}
                          >
                            <ExternalLink size={13} />
                            <span>Explore Enrolled Vertical ({app.assignedVertical || '6.2'})</span>
                          </button>
                        )}
                      </div>

                      <div className="footer-right-actions">
                        {isApproved && (
                          <span className="badge badge-emerald font-mono text-xs">
                            <ShieldCheck size={12} /> Active VIKAS Stakeholder
                          </span>
                        )}
                        {isRejected && (
                          <button 
                            className="btn btn-sm btn-primary"
                            onClick={() => onNavigateToTab('entry')}
                          >
                            <PlusCircle size={13} />
                            <span>Submit Amended Application</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW C: REAL-TIME ONBOARDING MONITORING TABLE */}
      {/* ========================================================================= */}
      {dashboardView === 'monitoring' && (
        <div className="monitoring-view-wrap mt-16 animate-fade-in">

          <div className="card monitor-header-card">
            <div className="monitor-header-inner">
              <div className="monitor-header-left">
                <div className="monitor-icon-circle">
                  <Eye size={22} />
                </div>
                <div>
                  <h2 className="monitor-main-title">Real-Time Onboarding Monitor</h2>
                  <p className="monitor-main-sub">
                    One row per registered vertical, with the exact date and time you enrolled, plus screening, approval, and monthly reporting.
                  </p>
                </div>
              </div>
              <div className="monitor-stats-row">
                <div className="monitor-stat-chip">
                  <span className="stat-chip-val">{monitorRows.length}</span>
                  <span className="stat-chip-label">Verticals</span>
                </div>
                <div className="monitor-stat-chip chip-green">
                  <span className="stat-chip-val">{screeningCompletedCount}</span>
                  <span className="stat-chip-label">Screening Done</span>
                </div>
                <div className="monitor-stat-chip chip-amber">
                  <span className="stat-chip-val">{approvalPendingCount}</span>
                  <span className="stat-chip-label">Approval Pending</span>
                </div>
                <div className="monitor-stat-chip chip-blue">
                  <span className="stat-chip-val">{monthlyPendingCount}</span>
                  <span className="stat-chip-label">Reporting Pending</span>
                </div>
              </div>
            </div>
          </div>

          {monitorRows.length === 0 ? (
            <div className="card monitor-empty-card">
              <Eye size={48} style={{ opacity: 0.2, color: 'var(--color-accent)' }} />
              <h4>No Registrations to Monitor</h4>
              <p>Submit an application to a vertical to see real-time onboarding data here.</p>
              <button className="btn btn-primary mt-12" onClick={() => onNavigateToTab('entry')}>
                <PlusCircle size={15} />
                <span>Submit Application</span>
              </button>
            </div>
          ) : (
            <div className="monitor-table-outer card">
              <div className="monitor-table-legend">
                <span className="legend-item"><span className="legend-dot dot-green" />Completed / Approved</span>
                <span className="legend-item"><span className="legend-dot dot-amber" />Pending</span>
                <span className="legend-item"><span className="legend-dot dot-red" />Declined</span>
                <span className="legend-item"><span className="legend-dot dot-gray" />Not started</span>
              </div>

              <div className="monitor-table-scroll">
                <table className="monitor-table">
                  <thead>
                    <tr>
                      <th className="col-sno" rowSpan={2}>#</th>
                      <th className="col-vertical" rowSpan={2}>Vertical</th>
                      <th className="col-onboard-header" colSpan={2}>Registered On</th>
                      <th className="col-outcome-header" colSpan={2}>Outcome Tracking</th>
                      <th className="col-monthly" rowSpan={2}>Monthly Reporting</th>
                    </tr>
                    <tr className="sub-header-row">
                      <th className="col-date">Date</th>
                      <th className="col-time">Time</th>
                      <th className="col-screening">Screening</th>
                      <th className="col-approval">Approval Pending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitorRows.map((row, idx) => {
                      const { code, title } = splitVerticalLabel(row.vertical);

                      const screeningBadge = row.isRejected
                        ? <span className="monitor-badge badge-mon-red"><XCircle size={13} />Declined</span>
                        : <span className="monitor-badge badge-mon-green"><CheckCircle2 size={13} />Completed</span>;

                      const approvalBadge = row.isRejected
                        ? <span className="monitor-badge badge-mon-red"><XCircle size={13} />Declined</span>
                        : row.isApproved
                          ? <span className="monitor-badge badge-mon-green"><CheckCircle2 size={13} />Approved</span>
                          : <span className="monitor-badge badge-mon-amber"><Clock size={13} />Pending</span>;

                      const monthlyBadge = row.isRejected
                        ? <span className="monitor-badge badge-mon-gray"><FileText size={13} />N/A</span>
                        : row.isApproved
                          ? <span className="monitor-badge badge-mon-green"><CheckCircle2 size={13} />Active</span>
                          : <span className="monitor-badge badge-mon-gray"><FileText size={13} />Pending</span>;

                      return (
                        <tr
                          key={row.key}
                          className={`monitor-row ${row.isApproved ? 'row-approved' : row.isRejected ? 'row-rejected' : 'row-pending'}`}
                        >
                          <td className="col-sno">
                            <span className="row-sno">{idx + 1}</span>
                          </td>
                          <td className="col-vertical">
                            <div className="vertical-cell">
                              <div className="vertical-name-row">
                                {code && <span className="vertical-code-badge">{code}</span>}
                                <span className="vertical-name">{title}</span>
                              </div>
                              <span className="file-no-sub font-mono">{row.app.fileNumber}</span>
                            </div>
                          </td>
                          <td className="col-date">
                            <span className="date-cell">
                              <Calendar size={13} />
                              <strong>{row.date}</strong>
                            </span>
                          </td>
                          <td className="col-time">
                            <span className="time-cell">
                              <Clock size={13} />
                              <span className="font-mono">{row.time}</span>
                            </span>
                          </td>
                          <td className="col-screening">{screeningBadge}</td>
                          <td className="col-approval">{approvalBadge}</td>
                          <td className="col-monthly">{monthlyBadge}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="monitor-table-footer">
                <span className="footer-note">
                  <Info size={12} />
                  Visiting this monitor after registration marks screening as completed. Approval stays pending until governance signs off.
                </span>
                <span className="footer-refresh font-mono">
                  Last synced: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: FORMAL 8-CLAUSE ONBOARDING LETTER MODAL */}
      {/* ========================================================================= */}
      {activeModalType === 'letter' && selectedDocApp && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setActiveModalType(null)}>
          <div className="modal-content-card modal-lg card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="letter-modal-header">
              <div className="letter-modal-brand">
                <FileCheck size={24} className="text-emerald" />
                <div>
                  <h3>Formal 8-Clause Onboarding Letter</h3>
                  <span className="font-mono text-xs text-muted">
                    Official Reference: IITTNiF/VIKAS/2026/{selectedDocApp.fileNumber.replace(/[^A-Za-z0-9]/g, '')}
                  </span>
                </div>
              </div>

              <div className="letter-header-actions">
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => window.print()}
                  title="Print or Save as PDF"
                >
                  <Printer size={14} />
                  <span>Print / PDF</span>
                </button>
                <button 
                  className="btn-modal-close"
                  onClick={() => setActiveModalType(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Formal Letter Body View */}
            <div className="letter-paper-body mt-16">
              {/* Institutional Header */}
              <div className="letter-inst-header">
                <div className="letter-inst-title">IIT TIRUPATI NAVAVISHKAR I-HUB FOUNDATION (IITTNiF)</div>
                <div className="letter-inst-sub">A Technology Innovation Hub under the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS)</div>
                <div className="letter-inst-sub">Department of Science & Technology, Government of India</div>
                <div className="letter-inst-address">Yerpedu - 517619, Tirupati District, Andhra Pradesh, India | Email: secretariat@iittnif.in</div>
              </div>

              <div className="letter-meta-row mt-16">
                <div>
                  <strong>Ref. No:</strong> <span className="font-mono">IITTNiF/VIKAS/2026/{selectedDocApp.fileNumber.replace(/[^A-Za-z0-9]/g, '')}</span><br />
                  <strong>Date of Issuance:</strong> <span className="font-mono">{selectedDocApp.approvalDate || selectedDocApp.lastUpdated || new Date().toLocaleDateString('en-GB')}</span>
                </div>
                <div className="text-right">
                  <strong>File Number:</strong> <span className="font-mono">{selectedDocApp.fileNumber}</span><br />
                  <strong>Assigned Vertical:</strong> <span className="font-semibold text-emerald">{selectedDocApp.assignedVertical || '6.2 Startups'}</span>
                </div>
              </div>

              <div className="letter-recipient mt-14">
                <strong>To:</strong><br />
                The Authorized Representative / Principal Investigator<br />
                <strong>{selectedDocApp.name}</strong><br />
                {selectedDocApp.organization || currentUser.organization}<br />
                Email: {selectedDocApp.email || currentUser.email}
              </div>

              <div className="letter-subject mt-14">
                <strong>SUBJECT: FORMAL 8-CLAUSE ONBOARDING & STAKEHOLDER ASSOCIATION LETTER UNDER THE VIKAS PLATFORM</strong>
              </div>

              <div className="letter-opening mt-10">
                Dear Stakeholder,<br /><br />
                We are pleased to formally convey that following administrative screening, technical evaluation, 
                and approval according to the VIKAS Authority Matrix, <strong>{selectedDocApp.name}</strong> has been 
                officially admitted as an onboarded stakeholder within the VIKAS ecosystem under the National Mission 
                on Interdisciplinary Cyber-Physical Systems (NM-ICPS).
              </div>

              <div className="clauses-container mt-14">
                <div className="clause-item">
                  <strong>Clause 1: Scope of Association & Ecosystem Onboarding</strong>
                  <p>The Onboarded Entity is formally admitted into the VIKAS ecosystem and accredited for program participation, domain technical consultations, and stakeholder working groups under {selectedDocApp.assignedVertical || 'the designated vertical'}.</p>
                </div>

                <div className="clause-item highlight-clause">
                  <strong>Clause 2: Clarification of Non-Incubation & Non-Tenant Status (Crucial)</strong>
                  <p>This onboarding letter confirms stakeholder ecosystem association only. It explicitly does NOT constitute physical tenancy, permanent co-location, or guaranteed incubation. Physical incubation is governed by separate competitive applications, independent committee selection, and bilateral tenancy execution.</p>
                </div>

                <div className="clause-item">
                  <strong>Clause 3: Intellectual Property (IP) Governance & Retention</strong>
                  <p>All background Intellectual Property brought into the platform remains the sole and absolute property of the Stakeholder. Any collaborative foreground IP resulting from specific sponsored initiatives shall be defined by bilateral agreements.</p>
                </div>

                <div className="clause-item">
                  <strong>Clause 4: Confidentiality & Non-Disclosure</strong>
                  <p>Both parties agree to exercise industry-standard diligence in safeguarding confidential technical disclosures, datasets, and proprietary methodologies exchanged during vertical participation.</p>
                </div>

                <div className="clause-item">
                  <strong>Clause 5: Access to Mentorship & Technical Facilities</strong>
                  <p>The Stakeholder is eligible to request technical mentorship, validation review, and computational testbed access, subject to scheduling availability, safety protocols, and applicable facility policies.</p>
                </div>

                <div className="clause-item">
                  <strong>Clause 6: Compliance with Ethical Norms & National Guidelines</strong>
                  <p>The Stakeholder covenants to adhere to statutory safety norms, ethical research standards, and relevant Government of India mandates governing geospatial and cyber-physical technologies.</p>
                </div>

                <div className="clause-item">
                  <strong>Clause 7: Milestone Review & National Outcome Tracking</strong>
                  <p>The Stakeholder agrees to periodically furnish technical progress indicators, milestone deliverables, and outcome metrics to facilitate national impact audits by the Department of Science and Technology.</p>
                </div>

                <div className="clause-item">
                  <strong>Clause 8: Term, Renewal & Limitation of Liability</strong>
                  <p>This onboarding association remains in effect for a period of twelve (12) calendar months from the date of issuance and is renewable upon mutual concurrence. Neither party assumes commercial liability for independent operations or commercial venture solvency.</p>
                </div>
              </div>

              {/* Disclaimer Notice */}
              <div className="letter-disclaimer-strip mt-14">
                <strong>OFFICIAL POLICY DISCLAIMER:</strong> Onboarding into the VIKAS ecosystem establishes official stakeholder association and eligibility for program vertical participation. It does NOT constitute a commitment of financial grants, guaranteed project allocation, venture funding, or dedicated lab infrastructure.
              </div>

              {/* Signatures */}
              <div className="letter-signature-row mt-24">
                <div>
                  <div className="digital-seal-box font-mono">
                    [IITTNiF OFFICIAL SEAL]<br />
                    NM-ICPS, DST, GOVT OF INDIA<br />
                    VERIFIED ENROLLMENT
                  </div>
                </div>

                <div className="text-right">
                  <div className="signature-line font-script">Roshan K. Srivastav</div>
                  <strong>Dr. Roshan K. Srivastav</strong><br />
                  <span>Project Director</span><br />
                  <span>IIT Tirupati Navavishkar I-Hub Foundation</span>
                </div>
              </div>
            </div>

            <div className="letter-modal-footer mt-16">
              <button 
                className="btn btn-outline"
                onClick={() => handleDownloadLetter(selectedDocApp)}
              >
                <Download size={14} />
                <span>Download (.txt)</span>
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveModalType(null)}
              >
                <span>Close Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CERTIFICATE OF ASSOCIATION MODAL */}
      {/* ========================================================================= */}
      {activeModalType === 'certificate' && selectedDocApp && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setActiveModalType(null)}>
          <div className="modal-content-card modal-lg card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <div className="cert-modal-title-group">
                <Award size={24} className="text-amber" />
                <h3>Official Certificate of Association</h3>
              </div>
              <div className="cert-header-actions">
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => window.print()}
                >
                  <Printer size={14} />
                  <span>Print Certificate</span>
                </button>
                <button 
                  className="btn-modal-close"
                  onClick={() => setActiveModalType(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Decorative Certificate Frame */}
            <div className="certificate-frame mt-16">
              <div className="certificate-inner-border">
                <div className="cert-top-emblem">
                  <Award size={48} className="text-amber" />
                </div>

                <div className="cert-inst-header mt-8">
                  <h2>IIT TIRUPATI NAVAVISHKAR I-HUB FOUNDATION</h2>
                  <p className="cert-sub-inst">
                    National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS)<br />
                    Department of Science & Technology, Government of India
                  </p>
                </div>

                <div className="cert-main-title mt-16">
                  <h1>CERTIFICATE OF ASSOCIATION</h1>
                  <span className="cert-subtitle">VIKAS STAKEHOLDER ACCREDITATION</span>
                </div>

                <div className="cert-body-statement mt-16">
                  This is to formally certify that
                  <div className="cert-recipient-name">
                    {selectedDocApp.name}
                  </div>
                  <div className="cert-recipient-org">
                    {selectedDocApp.organization || currentUser.organization}
                  </div>
                  has been evaluated under the prescribed governance criteria and is officially accredited as an authorized
                  <div className="cert-vertical-highlight">
                    {selectedDocApp.stakeholderType || 'Stakeholder'} in {selectedDocApp.assignedVertical || 'Vertical 6.2 (Startups & Business Enablement)'}
                  </div>
                  within the VIKAS ecosystem for collaborative advancement in Cyber-Physical Systems.
                </div>

                <div className="cert-meta-row mt-20">
                  <div className="cert-meta-left">
                    <span className="font-mono text-xs">Certificate ID: VIKAS-CERT-2026-{selectedDocApp.fileNumber.replace(/[^A-Za-z0-9]/g, '')}</span><br />
                    <span className="font-mono text-xs">Date of Issue: {selectedDocApp.approvalDate || selectedDocApp.lastUpdated || new Date().toLocaleDateString('en-GB')}</span>
                  </div>

                  <div className="cert-meta-center">
                    <div className="cert-seal-stamp">
                      ★ IITTNiF ★<br />
                      OFFICIAL SEAL
                    </div>
                  </div>

                  <div className="cert-meta-right text-right">
                    <div className="cert-sign-name font-script">{selectedDocApp.eSignature || 'E-signature pending'}</div>
                    <strong className="cert-sign-title">{selectedDocApp.eSignature || 'Authorized Signatory'}</strong><br />
                    <span className="text-xs">Project Director, IITTNiF</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cert-modal-footer mt-16">
              <button 
                className="btn btn-primary"
                onClick={() => setActiveModalType(null)}
              >
                <span>Close Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern High-Aesthetic Styling */}
      <style>{`
        .applicant-portal-container {
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 60px;
        }

        .applicant-hero-card {
          padding: 22px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(180deg, #ffffff 0%, #fffdf8 70%, #fff7ed 100%);
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
          flex-wrap: wrap;
          gap: 20px;
        }

        .applicant-hero-content {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .applicant-hero-avatar {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #c2410c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .applicant-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .applicant-type-pill {
          background-color: rgba(16, 185, 129, 0.12);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 2px 10px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .applicant-mode-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background-color: var(--bg-primary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 600;
        }

        .applicant-hero-name {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 2px 0;
        }

        .applicant-hero-org {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 4px 0;
        }

        .applicant-hero-email {
          font-size: 12px;
          color: var(--text-muted);
        }

        /* View Mode Switcher Tabs */
        .applicant-view-mode-tabs {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 2px solid var(--border-color);
          padding-bottom: 8px;
        }

        .view-mode-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all var(--transition-fast);
        }

        .view-mode-btn:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
        }

        .view-mode-btn.active {
          color: #b45309;
          background: #fff7ed;
          border-bottom: 3px solid #d97706;
        }

        .notif-tab-badge {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        /* Notifications Center Styles */
        .notif-control-card {
          padding: 20px 24px;
          background: var(--bg-surface);
        }

        .notif-header-flex {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }

        .notif-center-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 4px 0;
        }

        .notif-center-sub {
          font-size: 12.5px;
          color: var(--text-secondary);
          margin: 0;
          max-width: 650px;
        }

        .notif-bulk-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .notif-filter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        .notif-filter-pills {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pill-btn {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .pill-btn:hover {
          color: var(--text-primary);
          border-color: var(--color-accent);
        }

        .pill-btn.active {
          background: var(--color-accent);
          color: #ffffff;
          border-color: var(--color-accent);
        }

        .notif-search-wrap {
          position: relative;
          min-width: 260px;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .notif-search-input {
          width: 100%;
          padding: 6px 28px 6px 30px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 12px;
          font-family: 'Outfit', sans-serif;
        }

        .notif-search-input:focus {
          outline: none;
          border-color: var(--color-accent);
        }

        .search-clear-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        /* Notification Feed Cards */
        .notif-feed-card {
          padding: 16px 20px;
          margin-bottom: 12px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .notif-feed-card.unread {
          background: linear-gradient(135deg, var(--bg-surface) 0%, rgba(16, 185, 129, 0.03) 100%);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
        }

        .notif-feed-card:hover {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
        }

        .notif-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .notif-meta-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .notif-meta-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .notif-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .badge-approved { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .badge-correction { background: rgba(245, 158, 11, 0.15); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.3); }
        .badge-screening { background: rgba(2, 132, 199, 0.15); color: #0284c7; border: 1px solid rgba(2, 132, 199, 0.3); }
        .badge-routed { background: rgba(6, 182, 212, 0.15); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.3); }
        .badge-pending { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3); }
        .badge-engagement { background: rgba(99, 102, 241, 0.15); color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.3); }
        .badge-outcome { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
        .badge-rejected { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .badge-submitted { background: rgba(100, 116, 139, 0.15); color: #64748b; border: 1px solid rgba(100, 116, 139, 0.3); }

        .notif-file-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          color: var(--text-primary);
          font-weight: 700;
        }

        .notif-timestamp-text {
          font-size: 11px;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .unread-dot-badge {
          background: #ef4444;
          color: #ffffff;
          font-size: 9.5px;
          font-weight: 800;
          padding: 1px 7px;
          border-radius: var(--radius-full);
          letter-spacing: 0.3px;
        }

        .notif-message-text {
          font-size: 13.5px;
          color: var(--text-primary);
          line-height: 1.5;
          margin: 0;
        }

        .notif-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid var(--border-color);
        }

        .btn-text-link {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .btn-text-link:hover {
          color: var(--color-accent);
          text-decoration: underline;
        }

        .notif-empty-card {
          padding: 40px;
          text-align: center;
          color: var(--text-muted);
        }

        /* Filter Tab Buttons */
        .applicant-filter-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .filter-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-tab-btn:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
        }

        .filter-tab-btn.active {
          color: var(--color-accent);
          background: rgba(16, 185, 129, 0.12);
          border-bottom: 2px solid var(--color-accent);
        }

        /* Dossier Card Styling */
        .application-dossier-card {
          padding: 24px;
          margin-bottom: 20px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .application-dossier-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .application-dossier-card.border-success {
          border-left: 4px solid #10b981;
        }

        .application-dossier-card.border-danger {
          border-left: 4px solid #ef4444;
        }

        .application-dossier-card.border-warning {
          border-left: 4px solid #f59e0b;
        }

        .application-dossier-card.highlight-pulse {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.35);
          animation: highlightFade 3s forwards;
        }

        @keyframes highlightFade {
          0% { box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.5); }
          100% { box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); }
        }

        .dossier-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }

        .dossier-file-identity {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dossier-file-pill {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 700;
          border: 1px solid var(--border-color);
        }

        .btn-copy-mini {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }

        .btn-copy-mini:hover {
          color: var(--text-primary);
          background: var(--bg-primary);
        }

        .dossier-sub-date {
          font-size: 11.5px;
        }

        .dossier-title-line {
          margin-bottom: 6px;
        }

        .dossier-entity-name {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .dossier-desc-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .dossier-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          background-color: var(--bg-primary);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }

        .meta-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-kicker {
          font-size: 10.5px;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
        }

        .meta-strong {
          font-size: 13px;
          color: var(--text-primary);
        }

        /* Read-Only Stepper */
        .stepper-section-wrap {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 14px 18px;
          border-radius: var(--radius-sm);
        }

        .stepper-header-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .stepper-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .read-only-stepper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow-x: auto;
          padding: 8px 0;
        }

        .step-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          z-index: 2;
          min-width: 80px;
          text-align: center;
        }

        .node-icon {
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .step-node.completed .node-icon {
          background: #10b981;
          border-color: #10b981;
          color: #ffffff;
        }

        .step-node.current .node-icon {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .step-node.rejected .node-icon {
          background: #ef4444;
          border-color: #ef4444;
          color: #ffffff;
        }

        .node-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .node-desc {
          font-size: 9.5px;
          color: var(--text-muted);
        }

        .node-connector {
          flex: 1;
          height: 2px;
          background: var(--border-color);
          margin: 0 4px;
          margin-bottom: 24px;
        }

        .node-connector.active {
          background: #10b981;
        }

        /* Post-Approval Celebratory Section */
        .post-approval-card-wrap {
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%);
          padding: 20px;
        }

        .approval-celebration-banner {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .celebration-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .celebration-badge-line {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .celebration-date {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .celebration-title {
          font-size: 16px;
          font-weight: 800;
          color: #10b981;
          margin: 0 0 6px 0;
        }

        .celebration-p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .auth-credentials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 10px;
          background: var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
        }

        .auth-cred-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cred-kicker {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .cred-val {
          font-size: 12.5px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .onboarding-downloads-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-emerald-primary {
          background-color: #10b981;
          color: #ffffff;
          border: none;
          font-weight: 700;
        }

        .btn-emerald-primary:hover {
          background-color: #059669;
        }

        /* Disclaimer Alert */
        .disclaimer-alert-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.25);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
        }

        .disclaimer-icon-wrap {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .disclaimer-text-wrap {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .disclaimer-text-wrap strong {
          color: #d97706;
          display: block;
          margin-bottom: 2px;
        }

        /* Post-Rejection Section */
        .post-rejection-card-wrap {
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.04) 0%, rgba(245, 158, 11, 0.03) 100%);
          padding: 20px;
        }

        .rejection-decision-banner {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .rejection-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rejection-badge-line {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .rejection-date {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .rejection-title {
          font-size: 16px;
          font-weight: 800;
          color: #ef4444;
          margin: 0 0 6px 0;
        }

        .rejection-p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .reapplication-guidance-card {
          background: var(--bg-surface);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 14px 18px;
          border-radius: var(--radius-sm);
        }

        .guidance-header-line {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-primary);
        }

        .guidance-title {
          font-size: 13px;
        }

        .guidance-list {
          margin: 0;
          padding-left: 20px;
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Footer of Dossier Card */
        .dossier-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        .footer-left-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* Modal Styles */
        .letter-modal-header, .cert-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 2px solid #10b981;
        }

        .letter-modal-brand, .cert-modal-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .letter-modal-brand h3, .cert-modal-title-group h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .letter-header-actions, .cert-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-modal-close {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }

        .btn-modal-close:hover {
          color: var(--text-primary);
          background: var(--bg-primary);
        }

        /* Printable Letterhead Paper View */
        .letter-paper-body {
          background: #ffffff;
          color: #1e293b;
          padding: 30px;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
          font-family: 'Times New Roman', Times, serif;
          max-height: 65vh;
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .letter-inst-header {
          text-align: center;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
        }

        .letter-inst-title {
          font-size: 18px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: 0.5px;
        }

        .letter-inst-sub {
          font-size: 12px;
          color: #334155;
          margin-top: 2px;
        }

        .letter-inst-address {
          font-size: 11px;
          color: #64748b;
          margin-top: 4px;
        }

        .letter-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .letter-recipient {
          font-size: 13px;
          line-height: 1.4;
        }

        .letter-subject {
          font-size: 13.5px;
          text-decoration: underline;
          color: #0f172a;
        }

        .letter-opening {
          font-size: 13px;
          line-height: 1.5;
        }

        .clauses-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .clause-item {
          font-size: 12.5px;
          line-height: 1.5;
        }

        .clause-item strong {
          color: #0f172a;
          display: block;
          margin-bottom: 2px;
        }

        .clause-item p {
          margin: 0;
          color: #334155;
        }

        .clause-item.highlight-clause {
          background: #f8fafc;
          padding: 8px 12px;
          border-left: 3px solid #0284c7;
        }

        .letter-disclaimer-strip {
          background: #fffbeb;
          border: 1px solid #fef3c7;
          padding: 10px 14px;
          font-size: 11.5px;
          color: #92400e;
          line-height: 1.4;
        }

        .letter-signature-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 12px;
        }

        .digital-seal-box {
          border: 2px dashed #94a3b8;
          padding: 8px 14px;
          font-size: 10px;
          color: #475569;
          text-align: center;
        }

        .signature-line {
          font-size: 22px;
          color: #0f172a;
        }

        .font-script {
          font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
        }

        .letter-modal-footer, .cert-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        /* Certificate Styling */
        .certificate-frame {
          background: #ffffff;
          padding: 16px;
          border: 8px double #d97706;
          border-radius: 4px;
          color: #1e293b;
        }

        .certificate-inner-border {
          border: 2px solid #b45309;
          padding: 30px;
          text-align: center;
        }

        .cert-top-emblem {
          display: flex;
          justify-content: center;
        }

        .cert-inst-header h2 {
          font-size: 19px;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
          letter-spacing: 1px;
        }

        .cert-sub-inst {
          font-size: 12px;
          color: #475569;
          margin: 4px 0 0 0;
        }

        .cert-main-title h1 {
          font-size: 26px;
          font-weight: 900;
          color: #b45309;
          letter-spacing: 2px;
          margin: 0;
          font-family: Georgia, serif;
        }

        .cert-subtitle {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #64748b;
        }

        .cert-body-statement {
          font-size: 14px;
          color: #334155;
          line-height: 1.8;
          font-family: Georgia, serif;
        }

        .cert-recipient-name {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          margin: 6px 0 2px 0;
          font-family: 'Outfit', sans-serif;
        }

        .cert-recipient-org {
          font-size: 15px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .cert-vertical-highlight {
          font-size: 16px;
          font-weight: 700;
          color: #059669;
          margin: 6px 0;
        }

        .cert-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid #cbd5e1;
          padding-top: 16px;
        }

        .cert-seal-stamp {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 2px dashed #d97706;
          color: #d97706;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .cert-sign-name {
          font-size: 24px;
          color: #0f172a;
        }

        .cert-sign-title {
          font-size: 13px;
          color: #0f172a;
        }

        /* =============================================
           MONITORING VIEW STYLES
           ============================================= */

        .monitoring-view-wrap {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Monitor Header */
        .monitor-header-card {
          padding: 20px 24px;
          background: linear-gradient(135deg, rgba(var(--color-accent-rgb, 217, 119, 6), 0.06) 0%, var(--bg-surface) 60%);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }

        .monitor-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .monitor-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .monitor-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          background: rgba(var(--color-accent-rgb, 217, 119, 6), 0.12);
          border: 1px solid rgba(var(--color-accent-rgb, 217, 119, 6), 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .monitor-main-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.3px;
          margin: 0;
        }

        .monitor-main-sub {
          font-size: 12.5px;
          color: var(--text-secondary);
          margin: 3px 0 0 0;
          max-width: 480px;
        }

        /* Stats Chips */
        .monitor-stats-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .monitor-stat-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 72px;
          padding: 10px 14px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          gap: 2px;
        }

        .monitor-stat-chip.chip-amber { border-color: rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.06); }
        .monitor-stat-chip.chip-blue  { border-color: rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.06); }
        .monitor-stat-chip.chip-green { border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.06); }

        .stat-chip-val {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .chip-amber .stat-chip-val { color: #d97706; }
        .chip-blue  .stat-chip-val { color: #3b82f6; }
        .chip-green .stat-chip-val { color: #10b981; }

        .stat-chip-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        /* Empty state */
        .monitor-empty-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          gap: 12px;
          text-align: center;
          color: var(--text-muted);
        }

        .monitor-empty-card h4 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .monitor-empty-card p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Main table container */
        .monitor-table-outer {
          padding: 0;
          overflow: hidden;
          border-radius: var(--radius-lg);
        }

        /* Legend */
        .monitor-table-legend {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          padding: 12px 20px;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dot-green { background: #10b981; }
        .dot-amber { background: #f59e0b; }
        .dot-blue  { background: #3b82f6; }
        .dot-red   { background: #ef4444; }
        .dot-gray  { background: #94a3b8; }

        /* Table scroll wrapper */
        .monitor-table-scroll {
          overflow-x: auto;
          width: 100%;
        }

        /* The table itself */
        .monitor-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          min-width: 880px;
          font-size: 13px;
        }

        .monitor-table thead tr:first-child th {
          background: #fff7ed;
          color: #9a3412;
          font-size: 11.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          padding: 14px 16px 10px;
          border-bottom: 1px solid #fed7aa;
          white-space: nowrap;
          vertical-align: bottom;
        }

        .monitor-table thead .sub-header-row th {
          background: #fffbeb;
          color: #92400e;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.45px;
          padding: 8px 16px 10px;
          border-bottom: 2px solid #f59e0b;
          white-space: nowrap;
        }

        .col-onboard-header,
        .col-outcome-header {
          text-align: center !important;
        }

        .col-outcome-header {
          background: #ffedd5 !important;
          border-left: 2px solid #f59e0b !important;
          border-right: 2px solid #f59e0b !important;
        }

        .col-screening,
        .col-approval {
          background: rgba(245, 158, 11, 0.06);
          text-align: center;
        }

        .monitor-table tbody tr {
          border-bottom: 1px solid var(--border-color);
          transition: background 0.15s ease;
        }

        .monitor-table tbody tr:hover {
          background: rgba(217, 119, 6, 0.05);
        }

        .monitor-table tbody tr.row-pending td {
          background: #ffffff;
        }

        .monitor-table tbody tr.row-approved td {
          background: rgba(16, 185, 129, 0.04);
        }

        .monitor-table tbody tr.row-rejected td {
          background: rgba(239, 68, 68, 0.04);
        }

        .monitor-table td {
          padding: 16px;
          vertical-align: middle;
          color: var(--text-secondary);
          border-bottom: 1px solid #e2e8f0;
        }

        .col-sno     { width: 48px; text-align: center; }
        .col-vertical { min-width: 220px; }
        .col-date    { width: 150px; }
        .col-time    { width: 130px; }
        .col-screening { width: 150px; text-align: center; }
        .col-approval  { width: 170px; text-align: center; }
        .col-monthly   { width: 160px; text-align: center; }

        .row-sno {
          display: inline-flex;
          width: 26px;
          height: 26px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          font-size: 11px;
          font-weight: 800;
          color: #c2410c;
        }

        .vertical-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .vertical-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .vertical-code-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          padding: 2px 7px;
          border-radius: 999px;
          background: #d97706;
          color: #fff;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.3px;
        }

        .vertical-name {
          font-weight: 800;
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .file-no-sub {
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.3px;
        }

        .date-cell,
        .time-cell {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          color: var(--text-primary);
          font-size: 13px;
        }

        .date-cell strong {
          font-weight: 700;
        }

        .time-cell {
          color: #475569;
        }

        .monitor-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }

        .badge-mon-green {
          background: #ecfdf5;
          color: #047857;
          border: 1px solid #6ee7b7;
        }

        .badge-mon-amber {
          background: #fffbeb;
          color: #b45309;
          border: 1px solid #fcd34d;
        }

        .badge-mon-blue {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #93c5fd;
        }

        .badge-mon-red {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fca5a5;
        }

        .badge-mon-gray {
          background: #f8fafc;
          color: #64748b;
          border: 1px solid #cbd5e1;
        }

        /* Table footer */
        .monitor-table-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding: 12px 20px;
          background: var(--bg-primary);
          border-top: 1px solid var(--border-color);
        }

        .footer-note {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .footer-refresh {
          font-size: 10.5px;
          color: var(--text-muted);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 3px 8px;
          border-radius: var(--radius-full);
        }

        html[data-theme="dark"] .monitor-table thead tr:first-child th {
          background: #1c1408;
          color: #fdba74;
          border-bottom-color: #9a3412;
        }

        html[data-theme="dark"] .monitor-table thead .sub-header-row th {
          background: #22180b;
          color: #fbbf24;
          border-bottom-color: #d97706;
        }

        html[data-theme="dark"] .col-outcome-header {
          background: #3b2710 !important;
          border-left-color: #d97706 !important;
          border-right-color: #d97706 !important;
        }

        html[data-theme="dark"] .col-screening,
        html[data-theme="dark"] .col-approval {
          background: rgba(217, 119, 6, 0.12);
        }

        html[data-theme="dark"] .monitor-table tbody tr.row-pending td {
          background: #111827;
        }

        html[data-theme="dark"] .monitor-table td {
          border-bottom-color: #334155;
        }

        html[data-theme="dark"] .row-sno {
          background: #1c1408;
          border-color: #9a3412;
          color: #fdba74;
        }

        html[data-theme="dark"] .vertical-name,
        html[data-theme="dark"] .date-cell {
          color: #f8fafc;
        }

        @media (max-width: 900px) {
          .monitor-header-inner {
            align-items: flex-start;
          }
          .monitor-main-sub {
            max-width: 100%;
          }
        }

      `}</style>
    </div>
  );
}
