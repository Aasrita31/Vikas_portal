import React, { useState } from 'react';
import { ShieldAlert, CheckSquare, Forward, Info, FileText, Paperclip, ExternalLink, Lock, AlertTriangle } from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';

export default function ScreeningQueue({ currentRole, applications, onRouteApplication }) {
  const { currentUser, canRoute, canScreen, isApplicant } = useAuth();
  const [selectedApp, setSelectedApp] = useState(null);
  const [verticalAssign, setVerticalAssign] = useState('STARTUP');
  const [notes, setNotes] = useState('');

  // List of 9 VIKAS Verticals
  const verticals = [
    { id: 'STARTUP', label: '6.2 Startups & Business Enablement' },
    { id: 'TECH_DEV', label: '6.1 Technology Development (TDP/Prototype)' },
    { id: 'HRD', label: '6.3 Human Resource Development (Fellowships/Internships)' },
    { id: 'SKILL', label: '6.4 Skill Development & Training' },
    { id: 'COLLAB', label: '6.5 Collaborations & Partnerships (MoUs)' },
    { id: 'SCHOOL', label: '6.6 Schools & Academic Outreach' },
    { id: 'LAB_NET', label: '6.7 Institutions & Labs Network' },
    { id: 'INDUSTRY', label: '6.8 Industry & Government Interface' },
    { id: 'EXPERT', label: '6.9 Experts & Advisory Network' }
  ];

  // Restrict access: Applicants can NEVER access internal operations screening
  if (isApplicant) {
    return (
      <div className="card access-denied-card animate-fade-in">
        <ShieldAlert size={48} className="text-danger" />
        <h3>Access Restricted: Operational Workflow</h3>
        <p>
          The Screening and Verification Queue is restricted to internal operational roles.
        </p>
        <div className="business-rule-banner">
          <strong>Mandatory Business Rule:</strong> An applicant or external stakeholder must never be able to perform internal workflow actions such as screening, verification, routing, classification, or approval.
        </div>
        <div className="hint-box">
          <strong>Evaluation Note:</strong> Switch your persona to <strong>Operations / Screening Anchor</strong> in the top header menu to evaluate screening operations.
        </div>
        
        <style>{`
          .access-denied-card {
            text-align: center;
            padding: 48px 32px;
            max-width: 640px;
            margin: 40px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
          .business-rule-banner {
            background-color: rgba(239, 68, 68, 0.08);
            border: 1px solid rgba(239, 68, 68, 0.25);
            padding: 12px 16px;
            border-radius: var(--radius-md);
            font-size: 12.5px;
            color: var(--color-danger);
            line-height: 1.4;
          }
          .hint-box {
            background-color: rgba(var(--color-accent-rgb), 0.08);
            border: 1px solid rgba(var(--color-accent-rgb), 0.2);
            padding: 12px 16px;
            border-radius: var(--radius-md);
            font-size: 12.5px;
            color: var(--text-secondary);
            margin-top: 4px;
          }
        `}</style>
      </div>
    );
  }

  const pendingApps = applications.filter(app => app.status === 'pending_screening');

  // Helper to map stakeholder type to valid vertical code
  const mapStakeholderToVertical = (type) => {
    if (!type) return 'STARTUP';
    const lower = String(type).toLowerCase();
    if (lower.includes('startup')) return 'STARTUP';
    if (lower.includes('student') || lower.includes('researcher')) return 'HRD';
    if (lower.includes('school')) return 'SCHOOL';
    if (lower.includes('institution')) return 'LAB_NET';
    if (lower.includes('industry')) return 'INDUSTRY';
    if (lower.includes('government')) return 'INDUSTRY';
    if (lower.includes('expert')) return 'EXPERT';
    if (lower.includes('collab') || lower.includes('mou')) return 'COLLAB';
    if (lower.includes('tech') || lower.includes('tdp')) return 'TECH_DEV';
    if (lower.includes('skill')) return 'SKILL';
    return 'STARTUP';
  };

  const determineApprovalAuthority = (app, vertical) => {
    if (!app) return 'operations';
    if (app.isStrategic || (app.fundingRequested && Number(app.fundingRequested) > 1000000)) {
      return 'pd'; // Strategic escalates to PD
    }
    
    switch (vertical) {
      case 'COLLAB':
      case 'INDUSTRY':
        return 'pd';
      case 'EXPERT':
        return app.isStrategic ? 'pd' : 'pillar_lead';
      case 'STARTUP':
        return app.isStrategic ? 'pd' : 'pillar_lead';
      case 'TECH_DEV':
      case 'HRD':
      case 'SKILL':
      case 'SCHOOL':
      case 'LAB_NET':
        return 'pillar_lead';
      default:
        return 'operations';
    }
  };

  const handleRoute = (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    if (!canRoute) {
      alert('Access Denied: Screening & Routing actions are strictly restricted to Operations Officers.');
      return;
    }

    const isConflict = selectedApp.email && currentUser?.email && selectedApp.email.toLowerCase() === currentUser.email.toLowerCase();
    if (isConflict) {
      alert('Conflict of Interest: You cannot screen or route an application you submitted.');
      return;
    }

    const authAuthority = determineApprovalAuthority(selectedApp, verticalAssign);
    let targetStatus = 'pending_approval';
    
    // If it resolves to Operations and user is Operations Anchor, it can be approved instantly!
    if (authAuthority === 'operations' && currentRole === 'operations') {
      targetStatus = 'approved';
    }

    const updatedHistory = [
      ...(selectedApp.history || []),
      {
        date: new Date().toLocaleString('en-GB'),
        action: targetStatus === 'approved' ? 'Approved (General Onboarding)' : `Routed for ${authAuthority.toUpperCase()} Approval`,
        user: `Operations Anchor (${currentRole})`,
        details: `Assigned Vertical: ${verticalAssign}. Designated approval path: ${authAuthority.toUpperCase()}. Remarks: ${notes || 'No remarks provided.'}`
      }
    ];

    onRouteApplication(selectedApp.fileNumber, {
      status: targetStatus,
      assignedVertical: verticalAssign,
      approvalAuthority: authAuthority,
      history: updatedHistory,
      screeningNotes: notes
    });

    setSelectedApp(null);
    setNotes('');
  };

  return (
    <div className="screening-layout animate-fade-in">
      <div className="queue-container">
        {/* Oversight Notice Banner for Non-Operations Internal Roles */}
        {!canRoute && (
          <div className="card oversight-banner-card mb-16" style={{ marginBottom: '16px', padding: '14px 18px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldAlert size={22} style={{ color: '#d97706', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#b45309', fontSize: '13.5px' }}>Operational Oversight Active (Read-Only):</strong>
                <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Screening, classification, and routing actions are strictly restricted to the Operations Officer. Action buttons are locked for your role ({currentUser.roleLabel || currentRole.toUpperCase()}).
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h3>Incoming Screening Queue</h3>
            <span className="badge badge-info">{pendingApps.length} Pending Verification</span>
          </div>

          {pendingApps.length === 0 ? (
            <div className="empty-queue">
              <CheckSquare size={36} className="text-success" />
              <p>All submitted files have been screened and routed.</p>
            </div>
          ) : (
            <div className="table-container mt-16">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>File Number</th>
                    <th>Entity Name</th>
                    <th>Sub. Type</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApps.map((app) => (
                    <tr key={app.fileNumber} className={selectedApp?.fileNumber === app.fileNumber ? 'selected-row' : ''}>
                      <td className="font-mono text-accent">{app.fileNumber}</td>
                      <td className="font-bold">{app.name}</td>
                      <td>{app.stakeholderType}</td>
                      <td>{app.submissionDate}</td>
                      <td>
                        {app.isStrategic ? (
                          <span className="badge badge-danger">Strategic</span>
                        ) : (
                          <span className="badge badge-muted">General</span>
                        )}
                      </td>
                      <td>
                        <button 
                          className={`btn ${canRoute ? 'btn-secondary' : 'btn-outline'} btn-sm`}
                          onClick={() => {
                            setSelectedApp(app);
                            setVerticalAssign(mapStakeholderToVertical(app.stakeholderType));
                          }}
                        >
                          {canRoute ? (
                            <span>Verify & Route</span>
                          ) : (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Lock size={12} />
                              <span>Inspect (Oversight)</span>
                            </span>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Verification Side Panel */}
      {selectedApp && (
        <div className="verify-panel card animate-fade-in">
          <div className="panel-header">
            <h3>Review File Details</h3>
            <button className="btn-close" onClick={() => setSelectedApp(null)}>×</button>
          </div>
          
          <div className="panel-content">
            <div className="detail-section">
              <div className="detail-row">
                <span className="label">File ID:</span>
                <span className="val font-mono text-accent">{selectedApp.fileNumber}</span>
              </div>
              <div className="detail-row">
                <span className="label">Entity Name:</span>
                <span className="val font-bold">{selectedApp.name}</span>
              </div>
              {selectedApp.organization && (
                <div className="detail-row">
                  <span className="label">Organization:</span>
                  <span className="val">{selectedApp.organization}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="val">{selectedApp.email}</span>
              </div>
              {selectedApp.phone && (
                <div className="detail-row">
                  <span className="label">Phone:</span>
                  <span className="val">{selectedApp.phone}</span>
                </div>
              )}
              {selectedApp.location && (
                <div className="detail-row">
                  <span className="label">Location:</span>
                  <span className="val">{selectedApp.location}</span>
                </div>
              )}
              {selectedApp.nmIcpsAlign && (
                <div className="detail-row">
                  <span className="label">Focus Area:</span>
                  <span className="val">{selectedApp.nmIcpsAlign}</span>
                </div>
              )}
              {selectedApp.intentOfEngagement && (
                <div className="detail-row">
                  <span className="label">Intent:</span>
                  <span className="val">
                    {Array.isArray(selectedApp.intentOfEngagement) 
                      ? selectedApp.intentOfEngagement.join(', ') 
                      : String(selectedApp.intentOfEngagement)}
                  </span>
                </div>
              )}
              {selectedApp.dynamicInputs && Object.keys(selectedApp.dynamicInputs).length > 0 && (
                <div className="detail-row">
                  <span className="label">Dynamic Inputs:</span>
                  <span className="val text-accent">
                    {Object.entries(selectedApp.dynamicInputs)
                      .filter(([k, v]) => k !== 'category' && v)
                      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : (typeof v === 'object' && v !== null ? JSON.stringify(v) : v)}`)
                      .join(' | ')}
                  </span>
                </div>
              )}
              {selectedApp.trl && (
                <div className="detail-row">
                  <span className="label">Initial TRL:</span>
                  <span className="val font-bold text-accent">TRL {selectedApp.trl}</span>
                </div>
              )}
              {selectedApp.fundingRequested && selectedApp.fundingRequested !== '0' && (
                <div className="detail-row">
                  <span className="label">Funding / Budget:</span>
                  <span className="val font-mono text-success">₹ {selectedApp.fundingRequested}</span>
                </div>
              )}
              {selectedApp.documentName && (
                <div className="detail-row">
                  <span className="label">Attached File:</span>
                  <span className="val attached-doc-val">
                    {selectedApp.documentUrl ? (
                      <a href={selectedApp.documentUrl} target="_blank" rel="noopener noreferrer" className="doc-link">
                        <FileText size={13} className="text-accent" />
                        <span>{selectedApp.documentName}</span>
                        <ExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="doc-chip">
                        <FileText size={13} className="text-accent" />
                        <span>{selectedApp.documentName}</span>
                      </span>
                    )}
                  </span>
                </div>
              )}
              <div className="detail-row description-row">
                <span className="label">Problem Statement:</span>
                <p className="val-desc">{selectedApp.problemStatement || selectedApp.description || 'No description provided by applicant.'}</p>
              </div>
            </div>

            <form onSubmit={handleRoute} className="route-form">
              <div className="form-group">
                <label className="form-label">Assign Hub Vertical (Categorization)</label>
                <select 
                  className="form-control"
                  value={verticalAssign}
                  onChange={(e) => setVerticalAssign(e.target.value)}
                >
                  {verticals.map((v) => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              </div>

              {/* Real-time Authority Resolver Preview */}
              <div className="authority-resolver">
                <Info size={16} className="resolver-icon" />
                <div>
                  <span className="resolver-title">Decision Routing Preview:</span>
                  <span className="resolver-value">
                    {determineApprovalAuthority(selectedApp, verticalAssign) === 'pd' && (
                      <span className="badge badge-danger">PD Strategic Approval Required</span>
                    )}
                    {determineApprovalAuthority(selectedApp, verticalAssign) === 'pillar_lead' && (
                      <span className="badge badge-warning">Pillar Lead Sign-off Required</span>
                    )}
                    {determineApprovalAuthority(selectedApp, verticalAssign) === 'operations' && (
                      <span className="badge badge-success">Automated Operations Approval (Instant)</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Verification Remarks & Audit Notes</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Check credentials, confirm TRL, verify attachments, and note observations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={!canRoute}
                ></textarea>
              </div>

              {/* Conflict of Interest Notice */}
              {selectedApp.email && currentUser?.email && selectedApp.email.toLowerCase() === currentUser.email.toLowerCase() && (
                <div className="alert-box alert-danger mt-12 mb-14" style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#ef4444', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={16} className="text-danger flex-shrink-0" />
                  <span><strong>Conflict of Interest:</strong> You cannot screen or route an application registered under your own account.</span>
                </div>
              )}

              {/* Role Boundary Notice */}
              {!canRoute && (
                <div className="alert-box alert-warning mt-12 mb-14" style={{ padding: '10px 14px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '6px', color: '#b45309', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} className="text-warning flex-shrink-0" />
                  <span><strong>Restricted Action:</strong> Screening and routing actions are strictly restricted to Operations Officers. Actions disabled for {currentUser.roleLabel || currentRole.toUpperCase()}.</span>
                </div>
              )}

              <div className="panel-actions" style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  disabled={!canRoute || (selectedApp.email && currentUser?.email && selectedApp.email.toLowerCase() === currentUser.email.toLowerCase())}
                  style={{ 
                    flex: 1, 
                    borderColor: '#f59e0b', 
                    color: '#b45309',
                    opacity: (!canRoute || (selectedApp.email && currentUser?.email && selectedApp.email.toLowerCase() === currentUser.email.toLowerCase())) ? 0.5 : 1,
                    cursor: (!canRoute || (selectedApp.email && currentUser?.email && selectedApp.email.toLowerCase() === currentUser.email.toLowerCase())) ? 'not-allowed' : 'pointer'
                  }}
                  onClick={() => {
                    if (!canRoute) return;
                    if (!notes) {
                      alert('Please provide remarks explaining what corrections are required.');
                      return;
                    }
                    const updatedHistory = [
                      ...(selectedApp.history || []),
                      {
                        date: new Date().toLocaleString('en-GB'),
                        action: 'Returned for Stakeholder Correction',
                        user: `Operations Anchor (${currentRole})`,
                        details: `Returned with remarks: ${notes}`
                      }
                    ];
                    onRouteApplication(selectedApp.fileNumber, {
                      status: 'returned_for_correction',
                      screeningNotes: notes,
                      history: updatedHistory
                    });
                    setSelectedApp(null);
                    setNotes('');
                  }}
                >
                  Return for Correction
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={!canRoute || (selectedApp.email && currentUser?.email && selectedApp.email.toLowerCase() === currentUser.email.toLowerCase())}
                  style={{ 
                    flex: 1.2,
                    opacity: (!canRoute || (selectedApp.email && currentUser?.email && selectedApp.email.toLowerCase() === currentUser.email.toLowerCase())) ? 0.5 : 1,
                    cursor: (!canRoute || (selectedApp.email && currentUser?.email && selectedApp.email.toLowerCase() === currentUser.email.toLowerCase())) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {!canRoute ? <Lock size={16} /> : <Forward size={16} />}
                  <span>Execute Route</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .screening-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        .queue-container {
          flex: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .mt-16 {
          margin-top: 16px;
        }

        .empty-queue {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .selected-row {
          background-color: rgba(226, 184, 87, 0.05) !important;
          border-left: 3px solid var(--color-accent);
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 12px;
        }

        /* Detail Panel Styling */
        .verify-panel {
          width: 400px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }

        .btn-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
        }

        .detail-section {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .detail-row .label {
          color: var(--text-secondary);
        }

        .detail-row .val {
          color: var(--text-primary);
          text-align: right;
        }

        .description-row {
          flex-direction: column;
          gap: 4px;
          margin-top: 8px;
          border-top: 1px solid var(--border-color);
          padding-top: 8px;
        }

        .val-desc {
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.4;
        }

        .route-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .authority-resolver {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 10px;
          border-radius: var(--radius-md);
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .resolver-icon {
          color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .resolver-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 2px;
        }

        .resolver-value {
          display: block;
        }

        .attached-doc-val {
          display: inline-flex;
        }

        .doc-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--color-accent);
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .doc-link:hover {
          border-color: var(--color-accent);
          background-color: var(--color-accent-glow);
        }

        .doc-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-primary);
          font-size: 12px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }

        .w-full {
          width: 100%;
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
