import React, { useMemo, useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  Search,
  XCircle,
  Calendar,
  ShieldCheck
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

const VERTICAL_ORDER = [
  '6.1 Technology Development',
  '6.2 Startups & Business Enablement',
  '6.3 Human Resource Development',
  '6.4 Skill Development',
  '6.5 Academic Collaborations & MoUs',
  '6.6 Schools & Academic Outreach (VidyaGIS)',
  '6.7 Institutions & Labs Network (SPIN Lab)',
  '6.8 Industry & Government Interface',
  '6.9 Experts & Advisory Network'
];

function formatDisplayDate(value) {
  const raw = String(value || '').trim();
  if (!raw) return '—';
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[3]} ${MONTH_SHORT[Number(iso[2]) - 1]} ${iso[1]}`;
  const dmy = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmy) return `${dmy[1].padStart(2, '0')} ${MONTH_SHORT[Number(dmy[2]) - 1] || dmy[2]} ${dmy[3]}`;
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
  if (meridiem) return `${hour}:${minute} ${meridiem.toUpperCase()}`;
  const suffix = hour >= 12 ? 'PM' : 'AM';
  return `${hour % 12 || 12}:${minute} ${suffix}`;
}

function formatMonitorDateTime(app) {
  const candidates = [
    app?.history?.[0]?.date,
    app?.submissionDateTime,
    app?.submission_date_time,
    app?.lastUpdated,
    app?.createdAt,
    app?.created_at,
    app?.submissionDate
  ].filter(Boolean);
  const raw = String(candidates[0] || '').trim();
  if (!raw) return { date: '—', time: app?.submissionTime || '—' };
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
    return { date: formatDisplayDate(datePart), time: formatDisplayTime(timeParts.join(',')) };
  }
  return { date: formatDisplayDate(raw), time: formatDisplayTime(app?.submissionTime || '') };
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
    return { key: 'approved', approval: 'Approved', screening: 'Completed', monthly: 'Active' };
  }
  if (status === 'rejected') {
    return { key: 'rejected', approval: 'Declined', screening: 'Declined', monthly: 'N/A' };
  }
  const screeningPending = ['pending_screening', 'under_screening'].includes(status);
  return {
    key: 'pending',
    approval: 'Pending',
    screening: screeningPending ? 'Pending' : 'Completed',
    monthly: 'Pending'
  };
}

export default function Dashboard({ applications = [], onNavigateToTab }) {
  const { currentRole } = useAuth();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const files = useMemo(
    () => (Array.isArray(applications) ? applications.filter((app) => !isAutoRegisterStub(app)) : []),
    [applications]
  );

  const rows = useMemo(() => {
    return files.flatMap((app) => {
      const { date, time } = formatMonitorDateTime(app);
      const dashboard = getDashboardStatus(app);
      const name = app.contactPerson || app.applicantName || app.name || 'Applicant';
      return getApplicationVerticals(app).map((vertical) => ({
        key: `${app.fileNumber || app.id}-${vertical}`,
        app,
        name,
        email: app.email || '—',
        organization: app.organization || '—',
        fileNumber: app.fileNumber || '—',
        vertical,
        date,
        time,
        dashboard
      }));
    });
  }, [files]);

  const filteredRows = rows.filter((row) => {
    const haystack = `${row.name} ${row.email} ${row.organization} ${row.fileNumber} ${row.vertical}`.toLowerCase();
    if (!haystack.includes(query.trim().toLowerCase())) return false;
    if (statusFilter === 'PENDING') return row.dashboard.key === 'pending';
    if (statusFilter === 'APPROVED') return row.dashboard.key === 'approved';
    if (statusFilter === 'REJECTED') return row.dashboard.key === 'rejected';
    return true;
  });

  const kpis = {
    total: rows.length,
    users: new Set(files.map((app) => String(app.email || app.fileNumber).toLowerCase())).size,
    screeningPending: files.filter((app) => ['pending_screening', 'under_screening'].includes(String(app.status || '').toLowerCase())).length,
    approvalPending: rows.filter((row) => row.dashboard.key === 'pending').length,
    approved: rows.filter((row) => row.dashboard.key === 'approved').length,
    declined: rows.filter((row) => row.dashboard.key === 'rejected').length
  };

  const verticalSummary = VERTICAL_ORDER.map((vertical) => {
    const items = rows.filter((row) => row.vertical === vertical);
    return {
      vertical,
      total: items.length,
      pending: items.filter((row) => row.dashboard.key === 'pending').length,
      approved: items.filter((row) => row.dashboard.key === 'approved').length
    };
  }).filter((item) => item.total > 0);

  const extraVerticals = rows
    .map((row) => row.vertical)
    .filter((vertical) => !VERTICAL_ORDER.includes(vertical));
  [...new Set(extraVerticals)].forEach((vertical) => {
    const items = rows.filter((row) => row.vertical === vertical);
    verticalSummary.push({
      vertical,
      total: items.length,
      pending: items.filter((row) => row.dashboard.key === 'pending').length,
      approved: items.filter((row) => row.dashboard.key === 'approved').length
    });
  });

  const recentActivities = files
    .flatMap((app) => (app.history || []).map((entry) => ({ ...entry, fileNumber: app.fileNumber, name: app.contactPerson || app.name })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="monitor-page animate-fade-in">
      <header className="monitor-hero">
        <div>
          <p className="monitor-kicker">
            <Activity size={15} />
            Monitoring
          </p>
          <h1>Application status across verticals</h1>
          <p className="monitor-lead">
            Live screening, approval, and monthly reporting for every submitted record.
          </p>
        </div>
        <span className="monitor-role-chip">{String(currentRole || 'admin').replace('_', ' ')}</span>
      </header>

      <section className="monitor-kpis">
        <article className="monitor-kpi">
          <span>Records</span>
          <strong>{kpis.total}</strong>
          <small><FileText size={13} /> {kpis.users} users</small>
        </article>
        <article className="monitor-kpi">
          <span>Screening pending</span>
          <strong>{kpis.screeningPending}</strong>
          <small><Clock size={13} /> Intake queue</small>
        </article>
        <article className="monitor-kpi warn">
          <span>Approval pending</span>
          <strong>{kpis.approvalPending}</strong>
          <small><Clock size={13} /> Awaiting OK</small>
        </article>
        <article className="monitor-kpi good">
          <span>Approved</span>
          <strong>{kpis.approved}</strong>
          <small><CheckCircle2 size={13} /> On dashboards</small>
        </article>
        <article className="monitor-kpi bad">
          <span>Declined</span>
          <strong>{kpis.declined}</strong>
          <small><XCircle size={13} /> Closed files</small>
        </article>
      </section>

      <section className="monitor-split">
        <div className="monitor-card">
          <div className="monitor-card-head">
            <h2><Layers size={16} /> Vertical load</h2>
          </div>
          {verticalSummary.length === 0 ? (
            <p className="monitor-empty">No vertical records yet.</p>
          ) : (
            <table className="monitor-mini-table">
              <thead>
                <tr>
                  <th>Vertical</th>
                  <th>Total</th>
                  <th>Pending</th>
                  <th>Approved</th>
                </tr>
              </thead>
              <tbody>
                {verticalSummary.map((item) => (
                  <tr key={item.vertical}>
                    <td>{item.vertical}</td>
                    <td>{item.total}</td>
                    <td>{item.pending}</td>
                    <td>{item.approved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="monitor-card">
          <div className="monitor-card-head">
            <h2><ShieldCheck size={16} /> Recent activity</h2>
          </div>
          {recentActivities.length === 0 ? (
            <p className="monitor-empty">No activity logged yet.</p>
          ) : (
            <ul className="monitor-activity">
              {recentActivities.map((item, index) => (
                <li key={`${item.fileNumber}-${index}`}>
                  <div>
                    <strong>{item.action || 'Update'}</strong>
                    <span>{item.fileNumber} · {item.name || 'Applicant'}</span>
                  </div>
                  <em>{item.date}</em>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="monitor-card">
        <div className="monitor-toolbar">
          <div>
            <h2>Onboarding monitor</h2>
            <p>Same screening, approval, and monthly reporting status shown on each user dashboard.</p>
          </div>
          <div className="monitor-toolbar-controls">
            <label className="monitor-search">
              <Search size={14} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search user, file or vertical"
              />
            </label>
            <div className="monitor-pills">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'PENDING', label: `Pending (${kpis.approvalPending})` },
                { id: 'APPROVED', label: `Approved (${kpis.approved})` },
                { id: 'REJECTED', label: `Declined (${kpis.declined})` }
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  className={statusFilter === pill.id ? 'active' : ''}
                  onClick={() => setStatusFilter(pill.id)}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="monitor-table-wrap">
          <table className="monitor-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Vertical</th>
                <th>Registered</th>
                <th>Screening</th>
                <th>Approval</th>
                <th>Monthly reporting</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={6} className="monitor-empty-cell">No records match this view.</td>
                </tr>
              )}
              {filteredRows.map((row) => (
                <tr key={row.key} className={`row-${row.dashboard.key}`}>
                  <td>
                    <strong>{row.name}</strong>
                    <span>{row.email}</span>
                    <em>{row.fileNumber}</em>
                  </td>
                  <td><span className="vertical-pill">{row.vertical}</span></td>
                  <td>
                    <strong className="date-line"><Calendar size={12} /> {row.date}</strong>
                    <span>{row.time}</span>
                  </td>
                  <td><span className={`chip ${row.dashboard.screening === 'Completed' ? 'good' : row.dashboard.screening === 'Declined' ? 'bad' : 'warn'}`}>{row.dashboard.screening}</span></td>
                  <td><span className={`chip ${row.dashboard.key}`}>{row.dashboard.approval}</span></td>
                  <td><span className={`chip ${row.dashboard.monthly === 'Active' ? 'approved' : row.dashboard.monthly === 'N/A' ? 'rejected' : 'pending'}`}>{row.dashboard.monthly}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <style>{`
        .monitor-page {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding-bottom: 28px;
        }

        .monitor-hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 22px 24px;
          border-radius: 16px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #f8fafc;
        }

        .monitor-kicker {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin: 0 0 8px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #fde68a;
        }

        .monitor-hero h1 {
          margin: 0 0 6px;
          font-size: 24px;
          font-weight: 800;
        }

        .monitor-lead {
          margin: 0;
          color: #cbd5e1;
          font-size: 13.5px;
        }

        .monitor-role-chip {
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.4px;
          background: rgba(245, 158, 11, 0.16);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.35);
          border-radius: 999px;
          padding: 6px 10px;
        }

        .monitor-kpis {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .monitor-kpi {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
        }

        .monitor-kpi span {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          color: #64748b;
        }

        .monitor-kpi strong {
          display: block;
          margin: 6px 0 4px;
          font-size: 26px;
          color: #0f172a;
        }

        .monitor-kpi small {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #64748b;
          font-size: 12px;
        }

        .monitor-kpi.warn strong { color: #b45309; }
        .monitor-kpi.good strong { color: #047857; }
        .monitor-kpi.bad strong { color: #b91c1c; }

        .monitor-split {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 14px;
        }

        .monitor-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
        }

        .monitor-card-head h2,
        .monitor-toolbar h2 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          color: #0f172a;
        }

        .monitor-toolbar {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .monitor-toolbar p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .monitor-toolbar-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .monitor-search {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 260px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 7px 10px;
          background: #f8fafc;
          color: #64748b;
        }

        .monitor-search input {
          border: none;
          outline: none;
          width: 100%;
          background: transparent;
          font-size: 13px;
          color: #0f172a;
        }

        .monitor-pills { display: flex; gap: 6px; flex-wrap: wrap; }
        .monitor-pills button {
          border: 1px solid #cbd5e1;
          background: #fff;
          color: #475569;
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .monitor-pills button.active {
          background: #0f172a;
          color: #fff;
          border-color: #0f172a;
        }

        .monitor-mini-table,
        .monitor-table {
          width: 100%;
          border-collapse: collapse;
        }

        .monitor-mini-table th,
        .monitor-table th {
          text-align: left;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.35px;
          color: #64748b;
          padding: 10px 12px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .monitor-mini-table td,
        .monitor-table td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13px;
          color: #1e293b;
          vertical-align: top;
        }

        .monitor-table-wrap {
          overflow-x: auto;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }

        .monitor-table { min-width: 860px; }

        .monitor-table td strong,
        .monitor-table td span,
        .monitor-table td em {
          display: block;
        }

        .monitor-table td span { color: #64748b; font-size: 12px; }
        .monitor-table td em { color: #94a3b8; font-size: 11px; font-style: normal; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }

        .date-line {
          display: inline-flex !important;
          align-items: center;
          gap: 5px;
          color: #0f172a !important;
        }

        .vertical-pill {
          display: inline-flex !important;
          width: fit-content;
          background: #eff6ff;
          color: #1d4ed8 !important;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 11px !important;
          font-weight: 700;
        }

        .chip {
          display: inline-flex;
          border-radius: 999px;
          padding: 4px 9px;
          font-size: 11px;
          font-weight: 800;
        }

        .chip.pending, .chip.warn { background: #fffbeb; color: #b45309; }
        .chip.approved, .chip.good { background: #ecfdf5; color: #047857; }
        .chip.rejected, .chip.bad { background: #fef2f2; color: #b91c1c; }

        .monitor-activity {
          list-style: none;
          margin: 12px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .monitor-activity li {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .monitor-activity strong, .monitor-activity span { display: block; }
        .monitor-activity span { color: #64748b; font-size: 12px; }
        .monitor-activity em { font-style: normal; color: #94a3b8; font-size: 11px; white-space: nowrap; }

        .monitor-empty, .monitor-empty-cell {
          text-align: center;
          color: #64748b;
          padding: 24px 12px;
        }

        @media (max-width: 1100px) {
          .monitor-kpis { grid-template-columns: repeat(2, 1fr); }
          .monitor-split { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
