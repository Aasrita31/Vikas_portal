import React from 'react';
import { Target, Flag, ShieldAlert, Award, FileText, CheckCircle } from 'lucide-react';

export default function Objectives() {
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
      authority: 'Final authority for strategic approvals. Controls routing for high-value engagements. Approves priority programs, partnerships, and expert onboarding.'
    },
    {
      role: 'Operational Anchor',
      authority: 'Startups & Entrepreneurship Pillar. Responsible for platform operations, onboarding coordination, and routing controls.'
    },
    {
      role: 'Execution Support Pillars',
      authority: 'Technology & Innovation; HRD; Collaborations & Business Development; Administration & Governance; IP, Knowledge & Media Governance.'
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

  return (
    <div className="objectives-view-container animate-fade-in">
      {/* Policy Position Header */}
      <div className="card policy-badge-card border-accent">
        <ShieldAlert size={36} className="text-accent flex-shrink-0" />
        <div>
          <h4>Policy Position Statement</h4>
          <p>
            VIKAS is <strong>not</strong> an incubation or equity-based program. 
            It is a structured engagement, execution, and business enablement platform aligned under the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS).
          </p>
        </div>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid-cols-2">
        <div className="card vision-card">
          <div className="card-title-icon">
            <Target size={24} className="text-accent" />
            <h3>Vision</h3>
          </div>
          <p className="vision-text">
            "To establish VIKAS as a national-scale engagement platform that connects talent, technology, and opportunities to accelerate innovation, deployment, and measurable impact."
          </p>
        </div>

        <div className="card mission-card">
          <div className="card-title-icon">
            <Flag size={24} className="text-info" />
            <h3>Mission</h3>
          </div>
          <ul className="mission-list">
            {missions.map((m, i) => (
              <li key={i}>
                <CheckCircle size={16} className="text-success" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Governance Framework & Authority */}
      <div className="card governance-framework-card">
        <div className="card-title-icon">
          <Award size={24} className="text-accent" />
          <h3>Governance Framework & Authority Structure</h3>
        </div>

        <div className="governance-roles-grid">
          {authorityStructure.map((item, i) => (
            <div key={i} className="gov-role-block">
              <h5>{item.role}</h5>
              <p>{item.authority}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Routing Rules table */}
      <div className="card routing-matrix-card">
        <div className="card-title-icon">
          <FileText size={24} className="text-info" />
          <h3>Decision Routing Matrix</h3>
        </div>
        <p className="matrix-sub">Authorized approval levels enforced by NM-ICPS compliance policies.</p>

        <div className="table-container mt-12">
          <table className="custom-table">
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

      <style>{`
        .objectives-view-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .card-title-icon {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .card-title-icon h3 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        /* Policy Badge Card */
        .policy-badge-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background-color: rgba(217, 119, 6, 0.03);
          border: 1px solid rgba(217, 119, 6, 0.15);
        }

        .border-accent {
          border-left: 4px solid var(--color-accent) !important;
        }

        .policy-badge-card h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 4px;
        }

        .policy-badge-card p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Vision & Mission values */
        .vision-text {
          font-size: 15px;
          line-height: 1.6;
          font-style: italic;
          color: var(--text-secondary);
          padding: 8px 0;
        }

        .mission-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mission-list li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .mission-list li svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Governance blocks */
        .governance-roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 12px;
        }

        .gov-role-block {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .gov-role-block h5 {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-accent);
          margin-bottom: 8px;
        }

        .gov-role-block p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Matrix table */
        .matrix-sub {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: -8px;
        }

        .mt-12 {
          margin-top: 12px;
        }
        
        .flex-shrink-0 {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
