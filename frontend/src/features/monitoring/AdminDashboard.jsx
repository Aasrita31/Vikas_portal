import React, { useEffect, useMemo, useState } from 'react';
import {
  ShieldCheck,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  Search,
  ChevronDown,
  ChevronRight,
  Lock,
  Award
} from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';
import ApprovalPanel from '../approval/ApprovalPanel';
import AuditLogs from '../audit/AuditLogs';
import CertificateOfAssociation from './CertificateOfAssociation';

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
  const twelve = hour % 12 || 12;
  return `${twelve}:${minute} ${suffix}`;
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

function isAutoRegisterStub(app) {
  const title = String(app?.name || app?.problemStatement || '').toLowerCase();
  const intent = String(Array.isArray(app?.intentOfEngagement) ? app.intentOfEngagement.join(' ') : (app?.intentOfEngagement || '')).toLowerCase();
  return title.includes('ecosystem registration') || intent.includes('vikas portal incubation');
}

function getDashboardStatus(app) {
  const status = String(app?.status || '').toLowerCase();
  if (['approved', 'engagement', 'completed'].includes(status)) {
    return { key: 'approved', label: 'Approved', screening: 'Completed', monthly: 'Active' };
  }
  if (status === 'rejected') {
    return { key: 'rejected', label: 'Declined', screening: 'Declined', monthly: 'N/A' };
  }
  return { key: 'pending', label: 'Pending', screening: 'Completed', monthly: 'Pending' };
}

function getApplicantName(app) {
  return app?.contactPerson || app?.applicantName || app?.name || 'Registered applicant';
}

export default function AdminDashboard({
  applications = [],
  onRouteApplication,
  onApproveApplication,
  onRejectApplication,
  onSendToEsign,
  onNavigateToTab,
  onNavigateToAdminRegister,
  initialSubTab = null,
  certificateFileNumber = null,
  onOpenCertificate
}) {
  const { currentUser, isAdmin, isProjectDirector } = useAuth();
  const [activeAdminSubTab, setActiveAdminSubTab] = useState(initialSubTab || 'status');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [okInputs, setOkInputs] = useState({});
  const [okErrors, setOkErrors] = useState({});
  const [expandedKey, setExpandedKey] = useState(null);
  const [selectedCertificateFile, setSelectedCertificateFile] = useState(certificateFileNumber);

  useEffect(() => {
    if (initialSubTab) {
      setActiveAdminSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  useEffect(() => {
    if (certificateFileNumber) {
      setSelectedCertificateFile(certificateFileNumber);
    }
  }, [certificateFileNumber]);

  const openCertificate = (fileNumber) => {
    setSelectedCertificateFile(fileNumber);
    setActiveAdminSubTab('certificate');
    onOpenCertificate?.(fileNumber);
  };

  const canIssueOk = isAdmin || isProjectDirector;
  const officerTitle = isProjectDirector ? 'Project Director' : isAdmin ? 'Administrator' : 'Officer';

  const applicantFiles = useMemo(
    () => (Array.isArray(applications) ? applications.filter((app) => !isAutoRegisterStub(app)) : []),
    [applications]
  );

  const statusRows = useMemo(() => {
    return applicantFiles.map((app) => {
      const { date, time } = formatMonitorDateTime(app);
      const dashboard = getDashboardStatus(app);
      return {
        key: app.fileNumber || app.id,
        app,
        name: getApplicantName(app),
        email: app.email || '—',
        organization: app.organization || '—',
        phone: app.phone || '—',
        verticals: getApplicationVerticals(app),
        date,
        time,
        dashboard
      };
    });
  }, [applicantFiles]);

  const filteredRows = statusRows.filter((row) => {
    const haystack = `${row.name} ${row.email} ${row.organization} ${row.app.fileNumber || ''} ${row.verticals.join(' ')}`.toLowerCase();
    const matchesSearch = haystack.includes(userSearchQuery.trim().toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'PENDING') return row.dashboard.key === 'pending';
    if (statusFilter === 'APPROVED') return row.dashboard.key === 'approved';
    if (statusFilter === 'REJECTED') return row.dashboard.key === 'rejected';
    return true;
  });

  const pendingCount = statusRows.filter((row) => row.dashboard.key === 'pending').length;
  const approvedCount = statusRows.filter((row) => row.dashboard.key === 'approved').length;
  const rejectedCount = statusRows.filter((row) => row.dashboard.key === 'rejected').length;
  const uniqueApplicants = new Set(statusRows.map((row) => String(row.email || row.name).toLowerCase())).size;

  const handleOkSubmit = (row) => {
    if (!canIssueOk || !row.app.fileNumber) return;
    const typed = String(okInputs[row.key] || '').trim().toLowerCase();
    if (typed !== 'ok') {
      setOkErrors((prev) => ({ ...prev, [row.key]: 'Type ok to send this file for e-signature.' }));
      return;
    }

    setOkErrors((prev) => ({ ...prev, [row.key]: '' }));
    setOkInputs((prev) => ({ ...prev, [row.key]: '' }));
    if (onSendToEsign) {
      onSendToEsign(row.app.fileNumber);
      return;
    }
    onNavigateToTab?.('approval', { fileNumber: row.app.fileNumber });
  };

  return (
    <div className="admin-console animate-fade-in">
      <section className="admin-hero">
        <div className="admin-hero-copy">
          <div className="admin-hero-kicker">
            <ShieldCheck size={16} />
            <span>Admin Panel</span>
            <span className="admin-live-dot" />
            <span>Secure session</span>
          </div>
          <h1>VIKAS Admin Panel</h1>
          <p>
            Review every applicant submission and dashboard status.
            Type <strong>ok</strong> to open the Approval page and complete e-sign.
          </p>
        </div>
      </section>

      <section className="admin-kpi-row">
        <article className="admin-kpi">
          <span>Registered users</span>
          <strong>{uniqueApplicants}</strong>
          <small><Users size={14} /> Distinct applicant identities</small>
        </article>
        <article className="admin-kpi">
          <span>Filled submissions</span>
          <strong>{statusRows.length}</strong>
          <small><FileText size={14} /> Dashboard records in view</small>
        </article>
        <article className="admin-kpi warn">
          <span>Approval pending</span>
          <strong>{pendingCount}</strong>
          <small><Clock size={14} /> Awaiting officer OK</small>
        </article>
        <article className="admin-kpi good">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
          <small><CheckCircle2 size={14} /> Live on user dashboards</small>
        </article>
      </section>

      <nav className="admin-tabs" aria-label="Admin panel sections">
        {[
          { id: 'status', label: 'All user status' },
          { id: 'users', label: 'User registry' },
          { id: 'approval', label: 'Approval matrix' },
          { id: 'certificate', label: 'Certificate' },
          { id: 'audit', label: 'Audit trail' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`admin-tab ${activeAdminSubTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveAdminSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeAdminSubTab === 'status' && (
        <section className="admin-panel-card">
          <div className="admin-toolbar">
            <div>
              <h2>Every user dashboard status</h2>
              <p>Review filled proposal data and the same screening / approval / monthly reporting status shown to each applicant.</p>
            </div>
            <div className="admin-toolbar-actions">
              <label className="admin-search">
                <Search size={15} />
                <input
                  type="search"
                  placeholder="Search name, email, file or vertical"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                />
              </label>
              <div className="admin-filter-pills">
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'PENDING', label: `Pending (${pendingCount})` },
                  { id: 'APPROVED', label: `Approved (${approvedCount})` },
                  { id: 'REJECTED', label: `Declined (${rejectedCount})` }
                ].map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    className={`admin-pill ${statusFilter === pill.id ? 'active' : ''}`}
                    onClick={() => setStatusFilter(pill.id)}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-status-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Vertical</th>
                  <th>Registered</th>
                  <th>Screening</th>
                  <th>Dashboard status</th>
                  <th>Monthly reporting</th>
                  <th>Officer action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="admin-empty">
                      No applicant records match this view yet.
                    </td>
                  </tr>
                )}
                {filteredRows.map((row) => {
                  const isOpen = expandedKey === row.key;
                  return (
                    <React.Fragment key={row.key}>
                      <tr className={`status-row ${row.dashboard.key}`}>
                        <td>
                          <button
                            type="button"
                            className="user-expand-btn"
                            onClick={() => setExpandedKey(isOpen ? null : row.key)}
                          >
                            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            <span className="user-identity">
                              <strong>{row.name}</strong>
                              <em>{row.email}</em>
                              <small>{row.organization}</small>
                            </span>
                          </button>
                        </td>
                        <td>
                          <div className="vertical-stack">
                            {row.verticals.map((vertical) => (
                              <span key={vertical} className="vertical-chip">{vertical}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="datetime-cell">
                            <strong>{row.date}</strong>
                            <span>{row.time}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`status-chip ${row.dashboard.key === 'rejected' ? 'closed' : 'done'}`}>
                            {row.dashboard.screening}
                          </span>
                        </td>
                        <td>
                          <span className={`status-chip ${row.dashboard.key}`}>
                            {row.dashboard.label}
                          </span>
                        </td>
                        <td>
                          <span className={`status-chip ${row.dashboard.key === 'approved' ? 'approved' : row.dashboard.key === 'rejected' ? 'closed' : 'pending'}`}>
                            {row.dashboard.monthly}
                          </span>
                        </td>
                        <td>
                          {row.dashboard.key === 'approved' && (
                            <button
                              type="button"
                              className="esign-open-btn"
                              onClick={() => openCertificate(row.app.fileNumber)}
                            >
                              <Award size={13} /> Certificate
                            </button>
                          )}
                          {row.dashboard.key === 'rejected' && (
                            <span className="ok-complete declined">Closed</span>
                          )}
                          {row.dashboard.key === 'pending' && canIssueOk && row.app.okForApproval && (
                            <button
                              type="button"
                              className="esign-open-btn"
                              onClick={() => onNavigateToTab?.('approval', { fileNumber: row.app.fileNumber })}
                            >
                              Open e-sign
                            </button>
                          )}
                          {row.dashboard.key === 'pending' && canIssueOk && !row.app.okForApproval && (
                            <form
                              className="ok-form"
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleOkSubmit(row);
                              }}
                            >
                              <input
                                type="text"
                                aria-label={`Type ok to send ${row.name} for e-signature`}
                                placeholder="Type ok"
                                value={okInputs[row.key] || ''}
                                onChange={(e) => {
                                  setOkInputs((prev) => ({ ...prev, [row.key]: e.target.value }));
                                  if (okErrors[row.key]) {
                                    setOkErrors((prev) => ({ ...prev, [row.key]: '' }));
                                  }
                                }}
                              />
                              <button type="submit">Confirm</button>
                              {okErrors[row.key] && <span className="ok-error">{okErrors[row.key]}</span>}
                            </form>
                          )}
                          {row.dashboard.key === 'pending' && !canIssueOk && (
                            <span className="ok-locked"><Lock size={12} /> Restricted</span>
                          )}
                        </td>
                      </tr>
                      {isOpen && (
                        <tr className="filled-data-row">
                          <td colSpan={7}>
                            <div className="filled-data-grid">
                              <div>
                                <span>File number</span>
                                <strong>{row.app.fileNumber || '—'}</strong>
                              </div>
                              <div>
                                <span>Organization</span>
                                <strong>{row.organization}</strong>
                              </div>
                              <div>
                                <span>Phone</span>
                                <strong>{row.phone}</strong>
                              </div>
                              <div>
                                <span>Stakeholder type</span>
                                <strong>{row.app.stakeholderType || row.app.stakeholder_type || '—'}</strong>
                              </div>
                              <div>
                                <span>Location</span>
                                <strong>{row.app.location || '—'}</strong>
                              </div>
                              <div>
                                <span>Last updated</span>
                                <strong>{row.app.lastUpdated || row.app.last_updated || row.date}</strong>
                              </div>
                              <div className="span-2">
                                <span>Intent of engagement</span>
                                <strong>
                                  {Array.isArray(row.app.intentOfEngagement)
                                    ? row.app.intentOfEngagement.join(', ')
                                    : (row.app.intentOfEngagement || row.app.intent_of_engagement || '—')}
                                </strong>
                              </div>
                              <div className="span-2">
                                <span>Domains</span>
                                <strong>
                                  {Array.isArray(row.app.domains) ? row.app.domains.join(', ') : (row.app.domains || '—')}
                                </strong>
                              </div>
                              {row.app.description && (
                                <div className="span-full">
                                  <span>Submitted description</span>
                                  <strong>{row.app.description}</strong>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeAdminSubTab === 'users' && (
        <section className="admin-panel-card">
          <div className="admin-toolbar">
            <div>
              <h2>User registry</h2>
              <p>Directory of applicant identities derived from submitted onboarding records.</p>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-status-table">
              <thead>
                <tr>
                  <th>Identity</th>
                  <th>Organization</th>
                  <th>Contact</th>
                  <th>Files</th>
                  <th>Latest dashboard status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={`reg-${row.key}`}>
                    <td>
                      <div className="user-identity">
                        <strong>{row.name}</strong>
                        <em>{row.email}</em>
                      </div>
                    </td>
                    <td>{row.organization}</td>
                    <td className="mono">{row.phone}</td>
                    <td>{row.app.fileNumber || '—'}</td>
                    <td>
                      <span className={`status-chip ${row.dashboard.key}`}>{row.dashboard.label}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeAdminSubTab === 'approval' && (
        <div className="admin-embedded">
          <ApprovalPanel
            currentRole={isProjectDirector ? ROLES.PROJECT_DIRECTOR : ROLES.ADMIN}
            applications={applications}
            initialFileNumber={null}
            onApproveApplication={(fileNumber, updates) => onApproveApplication(fileNumber, updates, { skipNavigation: true, openCertificate: true })}
            onRejectApplication={onRejectApplication}
          />
        </div>
      )}

      {activeAdminSubTab === 'certificate' && (
        <CertificateOfAssociation
          applications={applications}
          selectedFileNumber={selectedCertificateFile}
          onSelectFile={(fileNumber) => {
            setSelectedCertificateFile(fileNumber);
            onOpenCertificate?.(fileNumber);
          }}
        />
      )}

      {activeAdminSubTab === 'audit' && (
        <div className="admin-embedded">
          <AuditLogs applications={applications} />
        </div>
      )}

      <style>{`
        .admin-console {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding-bottom: 24px;
        }

        .admin-hero {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          padding: 24px 28px;
          border-radius: 18px;
          background:
            radial-gradient(circle at top right, rgba(245, 158, 11, 0.18), transparent 42%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #f8fafc;
        }

        .admin-hero-copy h1 {
          margin: 10px 0 8px;
          font-size: 28px;
          letter-spacing: -0.5px;
          font-weight: 800;
          white-space: nowrap;
        }

        .admin-hero-copy p {
          margin: 0;
          max-width: 640px;
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.55;
        }

        .admin-hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #fde68a;
        }

        .admin-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.18);
        }

        .admin-hero-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .admin-officer-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          min-width: 240px;
        }

        .admin-officer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: #f59e0b;
          color: #111827;
          font-weight: 800;
        }

        .admin-officer-card strong,
        .admin-officer-card span,
        .admin-officer-card em {
          display: block;
        }

        .admin-officer-card strong { font-size: 14px; }
        .admin-officer-card span { font-size: 12px; color: #cbd5e1; }
        .admin-officer-card em { font-size: 11px; color: #fbbf24; font-style: normal; font-weight: 700; }

        .admin-ghost-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(255,255,255,0.18);
          background: transparent;
          color: #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .admin-kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .admin-kpi {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px 18px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
        }

        .admin-kpi span {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: #64748b;
        }

        .admin-kpi strong {
          display: block;
          margin: 8px 0 6px;
          font-size: 28px;
          color: #0f172a;
        }

        .admin-kpi small {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 12px;
        }

        .admin-kpi.warn strong { color: #b45309; }
        .admin-kpi.good strong { color: #047857; }

        .admin-tabs {
          display: flex;
          gap: 6px;
          padding: 6px;
          background: #eef2f7;
          border-radius: 12px;
          width: fit-content;
          flex-wrap: wrap;
        }

        .admin-tab {
          border: none;
          background: transparent;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
          padding: 9px 14px;
          border-radius: 8px;
          cursor: pointer;
        }

        .admin-tab.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
        }

        .admin-panel-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
        }

        .admin-toolbar {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .admin-toolbar h2 {
          margin: 0 0 4px;
          font-size: 18px;
          color: #0f172a;
        }

        .admin-toolbar p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
        }

        .admin-toolbar-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .admin-search {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 8px 12px;
          min-width: 280px;
          background: #f8fafc;
          color: #64748b;
        }

        .admin-search input {
          border: none;
          outline: none;
          background: transparent;
          width: 100%;
          font-size: 13px;
          color: #0f172a;
        }

        .admin-filter-pills { display: flex; gap: 6px; flex-wrap: wrap; }

        .admin-pill {
          border: 1px solid #cbd5e1;
          background: #fff;
          color: #475569;
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .admin-pill.active {
          background: #0f172a;
          color: #fff;
          border-color: #0f172a;
        }

        .admin-table-wrap {
          overflow-x: auto;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }

        .admin-status-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 980px;
        }

        .admin-status-table th {
          text-align: left;
          font-size: 11px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: #64748b;
          background: #f8fafc;
          padding: 12px 14px;
          border-bottom: 1px solid #e2e8f0;
        }

        .admin-status-table td {
          padding: 14px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: top;
          font-size: 13px;
          color: #1e293b;
        }

        .admin-empty {
          text-align: center;
          color: #64748b;
          padding: 36px 14px !important;
        }

        .user-expand-btn {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          cursor: pointer;
          color: inherit;
        }

        .user-identity strong,
        .user-identity em,
        .user-identity small {
          display: block;
        }

        .user-identity strong { color: #0f172a; }
        .user-identity em { font-style: normal; color: #64748b; font-size: 12px; }
        .user-identity small { color: #94a3b8; font-size: 12px; }

        .vertical-stack { display: flex; flex-direction: column; gap: 6px; }
        .vertical-chip {
          display: inline-flex;
          width: fit-content;
          background: #eff6ff;
          color: #1d4ed8;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .datetime-cell strong, .datetime-cell span { display: block; }
        .datetime-cell span { color: #64748b; font-size: 12px; }

        .status-chip {
          display: inline-flex;
          border-radius: 999px;
          padding: 4px 9px;
          font-size: 11px;
          font-weight: 800;
        }

        .status-chip.pending, .status-chip.done { background: #fffbeb; color: #b45309; }
        .status-chip.approved { background: #ecfdf5; color: #047857; }
        .status-chip.rejected, .status-chip.closed { background: #fef2f2; color: #b91c1c; }

        .ok-form {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 6px;
          min-width: 170px;
        }

        .ok-form input {
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 7px 8px;
          font-size: 12px;
        }

        .ok-form button {
          border: none;
          border-radius: 8px;
          background: #0f172a;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          padding: 7px 10px;
        }

        .esign-open-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: none;
          border-radius: 8px;
          background: #0f172a;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          padding: 8px 12px;
        }

        .ok-error {
          grid-column: 1 / -1;
          color: #b91c1c;
          font-size: 11px;
          font-weight: 700;
        }

        .ok-complete {
          font-size: 12px;
          font-weight: 800;
          color: #047857;
        }

        .ok-complete.declined { color: #b91c1c; }
        .ok-locked {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #64748b;
          font-size: 12px;
        }

        .filled-data-row td {
          background: #f8fafc;
        }

        .filled-data-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px 16px;
        }

        .filled-data-grid div span {
          display: block;
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          margin-bottom: 4px;
        }

        .filled-data-grid div strong {
          font-size: 13px;
          color: #0f172a;
          font-weight: 700;
        }

        .span-2 { grid-column: span 2; }
        .span-full { grid-column: 1 / -1; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }

        .admin-embedded {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 12px;
        }

        @media (max-width: 980px) {
          .admin-hero, .admin-toolbar, .admin-hero-meta { flex-direction: column; align-items: flex-start; }
          .admin-kpi-row { grid-template-columns: 1fr 1fr; }
          .filled-data-grid { grid-template-columns: 1fr; }
          .span-2, .span-full { grid-column: auto; }
        }
      `}</style>
    </div>
  );
}
