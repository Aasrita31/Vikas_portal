import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  Network, 
  Cpu, 
  GraduationCap, 
  Award, 
  Target, 
  Flag, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  FileSpreadsheet, 
  Layers, 
  Sparkles,
  Link
} from 'lucide-react';

export default function Dashboard({ applications = [], onNavigateToTab }) {
  // The 5 Expected Outcomes defined in the official VIKAS specification
  const expectedOutcomes = [
    {
      id: 1,
      title: 'Increased Startup Engagement & Revenue Generation',
      icon: Building2,
      color: '#d97706', // amber gold
      points: [
        'Structured startup onboarding and incubation-free enablement',
        'Direct project allocation and commercial deployment support',
        'Industry revenue generation and market access channels'
      ]
    },
    {
      id: 2,
      title: 'Strong Academia-Industry-Government Linkage',
      icon: Network,
      color: '#f43f5e', // rose
      points: [
        'Collaborative MoUs and strategic bilateral alliances',
        'Consultancy and public pilot deployments with govt bodies',
        'Solving real-world industry problem statements'
      ]
    },
    {
      id: 3,
      title: 'Enhanced Technology Development & Deployment',
      icon: Cpu,
      color: '#10b981', // emerald green
      points: [
        'TDP prototype translation from TRL 2–6 to deployment',
        'Active lab integration (PNT, Geo-Intel, Autonomous Robotics)',
        'Industry-driven indigenized R&D and IP generation'
      ]
    },
    {
      id: 4,
      title: 'Skilled Workforce Aligned with National Priorities',
      icon: GraduationCap,
      color: '#3b82f6', // blue
      points: [
        'Chanakya post-doctoral and faculty research fellowships',
        'Government and industry technical upskilling certifications',
        'School-level spatial learning and academic outreach'
      ]
    },
    {
      id: 5,
      title: 'National-Level Visibility for TIH Initiatives',
      icon: Award,
      color: '#8b5cf6', // purple
      points: [
        'Central flagship single-window gateway for NM-ICPS',
        'Standardized transparent SOP routing and digital audit trail',
        'Senior advisory network and expert review panels'
      ]
    }
  ];

  const missions = [
    'Provide a single-window interface for all stakeholders',
    'Enable structured onboarding and intelligent routing',
    'Facilitate technology translation (TRL 2–6 → deployment)',
    'Generate business and deployment opportunities',
    'Build a national talent and expert network'
  ];

  const authorityStructure = [
    {
      role: 'Project Director (PD)',
      authority: 'Final strategic approval authority. Controls routing for high-value engagements. Approves priority programs, partnerships, and expert onboarding.'
    },
    {
      role: 'Operational Anchor',
      authority: 'Startups & Entrepreneurship Pillar. Responsible for platform operations, onboarding coordination, and routing.'
    },
    {
      role: 'Execution Support Pillars',
      authority: 'Technology & Innovation; HRD; Collaborations & Business Development; Administration; IP, Knowledge & Media Governance.'
    }
  ];

  const routingRules = [
    { type: 'General onboarding', authority: 'Automated / Operations' },
    { type: 'Program participation', authority: 'Pillar Lead' },
    { type: 'Startup project allocation', authority: 'Startups Pillar + PD (if strategic)' },
    { type: 'Industry/Govt engagement', authority: 'PD' },
    { type: 'Expert onboarding (senior)', authority: 'PD' },
    { type: 'MoUs / strategic collaborations', authority: 'PD' }
  ];

  // Actual recent activities from state
  const recentActivities = applications
    .flatMap(app => (app.history || []).map(h => ({ ...h, fileNumber: app.fileNumber })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="outcomes-dashboard animate-fade-in">
      {/* 1. Expected Outcomes Section */}
      <div className="section-block">
        <div className="section-header-row">
          <div className="section-title-wrap">
            <Sparkles size={20} className="text-accent" />
            <h2>Expected Outcomes</h2>
          </div>
          <span className="section-tagline">Core strategic deliverables aligned with NM-ICPS national mission priorities</span>
        </div>

        <div className="outcomes-grid">
          {expectedOutcomes.map((item) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                className="card outcome-card"
                style={{ borderTop: `4px solid ${item.color}` }}
              >
                <div className="outcome-card-header">
                  <div 
                    className="outcome-icon-box"
                    style={{ 
                      backgroundColor: `${item.color}10`, 
                      border: `1px solid ${item.color}25`,
                      color: item.color 
                    }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <h3>{item.title}</h3>
                </div>

                <ul className="outcome-points-list">
                  {item.points.map((pt, idx) => (
                    <li key={idx}>
                      <span className="point-bullet" style={{ backgroundColor: item.color }}></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Vision & Mission Grid */}
      <div className="grid-cols-2 mt-24">
        <div className="card vision-card">
          <div className="card-title-icon">
            <Target size={20} className="text-accent" />
            <h3>Vision</h3>
          </div>
          <p className="vision-text">
            "To establish VIKAS as a national-scale engagement platform that connects talent, technology, and opportunities to accelerate innovation, deployment, and measurable impact."
          </p>
        </div>

        <div className="card mission-card">
          <div className="card-title-icon">
            <Flag size={20} className="text-info" />
            <h3>Mission</h3>
          </div>
          <ul className="mission-list">
            {missions.map((m, i) => (
              <li key={i}>
                <CheckCircle size={14} className="text-success flex-shrink-0" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Governance Framework & Decision Routing Matrix */}
      <div className="dashboard-double-row-grid mt-24">
        {/* Left Column: Governance Framework */}
        <div className="card governance-card">
          <div className="card-title-icon">
            <Award size={18} className="text-accent" />
            <h4>Governance Framework & Authority Structure</h4>
          </div>
          <div className="governance-blocks-stack mt-16">
            {authorityStructure.map((item, i) => (
              <div key={i} className="gov-block-mini">
                <h5>{item.role}</h5>
                <p>{item.authority}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Decision Routing Matrix */}
        <div className="card routing-matrix-card">
          <div className="card-title-icon">
            <FileText size={18} className="text-info" />
            <h4>Decision Routing Matrix</h4>
          </div>
          <div className="table-container mt-16">
            <table className="custom-table smaller-table">
              <thead>
                <tr>
                  <th>Case / Onboarding Type</th>
                  <th>Required Approval Authority</th>
                </tr>
              </thead>
              <tbody>
                {routingRules.map((rule, i) => (
                  <tr key={i}>
                    <td className="font-bold">{rule.type}</td>
                    <td>
                      <span className={`badge ${
                        rule.authority.includes('PD') ? 'badge-danger' : 
                        rule.authority.includes('Pillar') ? 'badge-warning' : 'badge-success'
                      }`}>
                        {rule.authority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Live Audit Logs Trace */}
      {recentActivities.length > 0 && (
        <div className="card activity-card mt-24">
          <div className="activity-header-row">
            <div className="card-title-icon no-margin">
              <FileSpreadsheet size={18} className="text-info" />
              <h4>Live File Activity & Audit Trace</h4>
            </div>
            <span className="audit-policy-tag">SOP 7.2 Compliant • Non-tamperable digital ledger</span>
          </div>

          <div className="activity-timeline mt-16">
            {recentActivities.map((act, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-badge-bg">
                  <ShieldCheck size={14} className="text-accent" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span className="timeline-file font-mono">{act.fileNumber}</span>
                    <span className="timeline-date">{act.date}</span>
                  </div>
                  <strong className="timeline-action">{act.action}</strong>
                  <p className="timeline-desc">{act.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .outcomes-dashboard {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 8px 16px 48px;
          display: flex;
          flex-direction: column;
        }

        /* Section Header */
        .section-header-row {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .section-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-title-wrap h2 {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.3px;
        }

        .section-tagline {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* 5 Outcomes Responsive Grid */
        .outcomes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .outcome-card {
          padding: 24px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .outcome-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-active);
        }

        .outcome-card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .outcome-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .outcome-card-header h3 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .outcome-points-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .outcome-points-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .point-bullet {
          width: 6px;
          height: 6px;
          border-radius: var(--radius-full);
          margin-top: 6px;
          flex-shrink: 0;
        }

        /* Vision and Mission layout */
        .mt-24 {
          margin-top: 24px;
        }

        .card-title-icon {
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 10px;
          margin-bottom: 12px;
          width: 100%;
        }

        .card-title-icon.no-margin {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
          width: auto;
        }

        .card-title-icon h3, .card-title-icon h4 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .vision-text {
          font-size: 13.5px;
          line-height: 1.6;
          font-style: italic;
          color: var(--text-secondary);
          padding: 4px 0;
        }

        .mission-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
          padding: 0;
        }

        .mission-list li {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .flex-shrink-0 {
          flex-shrink: 0;
        }

        /* Double Column Grids */
        .dashboard-double-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .dashboard-double-row-grid {
            grid-template-columns: 1fr;
          }
        }

        .mt-16 {
          margin-top: 16px;
        }

        .governance-blocks-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .gov-block-mini {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px 14px;
        }

        .gov-block-mini h5 {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 4px;
        }

        .gov-block-mini p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Smaller tables for routing */
        .smaller-table th, .smaller-table td {
          padding: 10px 12px;
          font-size: 12.5px;
        }

        /* Audit Timeline */
        .activity-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .audit-policy-tag {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-success);
          background-color: rgba(16, 185, 129, 0.08);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .timeline-item {
          display: flex;
          gap: 10px;
          position: relative;
        }

        .timeline-item:not(:last-child):before {
          content: "";
          position: absolute;
          left: 13px;
          top: 26px;
          bottom: -12px;
          width: 1px;
          background-color: var(--border-color);
        }

        .timeline-badge-bg {
          width: 26px;
          height: 26px;
          border-radius: var(--radius-full);
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 1;
        }

        .timeline-content {
          flex: 1;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 8px 14px;
        }

        .timeline-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
        }

        .timeline-file {
          font-size: 11px;
          color: var(--color-accent);
          font-weight: 600;
        }

        .timeline-date {
          font-size: 10px;
          color: var(--text-muted);
        }

        .timeline-action {
          font-size: 12px;
          color: var(--text-primary);
          display: block;
        }

        .timeline-desc {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
          line-height: 1.35;
        }

        .font-mono {
          font-family: 'Courier New', Courier, monospace;
        }

        .font-bold {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
