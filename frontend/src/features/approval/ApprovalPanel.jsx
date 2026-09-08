import React, { useState } from 'react';
import { ShieldAlert, Award, FileText, CheckCircle, XCircle, ExternalLink, Lock, AlertTriangle } from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';

export default function ApprovalPanel({ currentRole, applications, onApproveApplication, onRejectApplication }) {
  const { currentUser, canApproveApplication, isProjectDirector, isPillarLead, isApplicant } = useAuth();
  const [selectedApp, setSelectedApp] = useState(null);
  const [signatureName, setSignatureName] = useState('');
  const [comment, setComment] = useState('');

  // Access validation: Only Project Director, Pillar Leads, and Admin can access the Approval Matrix
  const isAuthorized = currentRole === 'pd' || currentRole === 'pillar_lead' || currentRole === 'admin';
  if (!isAuthorized || isApplicant) {
    return (
      <div className="card access-denied-card animate-fade-in">
        <ShieldAlert size={48} className="text-danger" />
        <h3>Access Restricted: Governance Approval Matrix</h3>
        <p>
          The Governance Approval Matrix and E-Signature Console are restricted to authorizing officers (Pillar Leads or the Project Director).
        </p>
        <div className="business-rule-banner">
          <strong>Mandatory Business Rule:</strong> An applicant or external stakeholder must NEVER be able to perform internal workflow actions such as screening, verification, routing, classification, approval, or e-signature.
        </div>
        <div className="hint-box">
          <strong>Evaluation Note:</strong> Switch your persona to <strong>Pillar Lead</strong> or <strong>Project Director (PD)</strong> in the top header menu to evaluate digital approvals and e-signatures.
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

  // Filter pending approvals based on roles and authority level
  const pendingApprovals = applications.filter(app => {
    if (app.status !== 'pending_approval') return false;
    // Both PD and Pillar Leads see the active approval matrix for institutional transparency
    return true;
  });

  const getAuthorityDetails = (app) => {
    if (app.approvalAuthority === 'pd' || app.isStrategic) {
      return {
        label: 'Project Director Strategic Approval Mandatory',
        badge: 'badge-danger',
        rule: 'NM-ICPS Guidelines Clause 4.1: Strategic programs, international agreements, and capital allocation require direct sign-off of the Project Director (PD). No retrospective approvals permitted.'
      };
    } else {
      return {
        label: `Pillar Lead (${app.assignedVertical || 'Assigned Vertical'}) Sign-off`,
        badge: 'badge-warning',
        rule: `Governance Framework Clause 4.2: Program participation, fellowships, general skills upskilling, and standard labs network files are delegated to the respective Pillar Lead for ${app.assignedVertical || 'this vertical'}.`
      };
    }
  };

  const handleApprove = (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    // Strict Authority Matrix Verification
    const authCheck = canApproveApplication(selectedApp);
    if (!authCheck.authorized) {
      alert(`Access Denied: ${authCheck.reason}`);
      return;
    }

    if (!signatureName) {
      alert('Digital signature is required for audit logs.');
      return;
    }

    const updatedHistory = [
      ...(selectedApp.history || []),
      {
        date: new Date().toLocaleString('en-GB'),
        action: 'Digitally Approved & Signed',
        user: `${currentUser.roleLabel || currentRole.toUpperCase()} (${signatureName})`,
        details: `Approved vertical enrollment in: ${selectedApp.assignedVertical}. E-Signature logged. Comments: ${comment || 'Approved without further remarks.'}`
      }
    ];

    onApproveApplication(selectedApp.fileNumber, {
      status: 'approved',
      eSignature: signatureName,
      approvalDate: new Date().toLocaleDateString('en-GB'),
      history: updatedHistory,
      approvalComments: comment
    });

    setSelectedApp(null);
    setSignatureName('');
    setComment('');
  };

  const handleReject = () => {
    if (!selectedApp) return;

    const authCheck = canApproveApplication(selectedApp);
    if (!authCheck.authorized) {
      alert(`Access Denied: ${authCheck.reason}`);
      return;
    }

    if (!comment) {
      alert('Remarks / rejection reasons must be documented for the audit trail.');
      return;
    }

    const updatedHistory = [
      ...(selectedApp.history || []),
      {
        date: new Date().toLocaleString('en-GB'),
        action: 'Application Evaluated — Declined',
        user: `${currentUser.roleLabel || currentRole.toUpperCase()}`,
        details: `Application declined under Authority Matrix. Reason: ${comment}`
      }
    ];

    onRejectApplication(selectedApp.fileNumber, {
      status: 'rejected',
      rejectionDate: new Date().toLocaleDateString('en-GB'),
      history: updatedHistory,
      screeningNotes: comment
    });

    setSelectedApp(null);
    setComment('');
  };

  return (
    <div className="approval-layout animate-fade-in">
      <div className="approvals-list-container">
        <div className="card">
          <div className="card-header">
            <h3>Active Approval Matrix</h3>
            <span className="badge badge-danger">{pendingApprovals.length} Awaiting Authorization</span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="empty-approvals">
              <CheckCircle size={36} className="text-success" />
              <p>No files are pending authorization for your role level.</p>
            </div>
          ) : (
            <div className="table-container mt-16">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>File ID</th>
                    <th>Entity Name</th>
                    <th>Vertical Assigned</th>
                    <th>Authority Rule</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.map((app) => {
                    const auth = getAuthorityDetails(app);
                    const authStatus = canApproveApplication(app);
                    const canAuthThisApp = authStatus.authorized;

                    return (
                      <tr key={app.fileNumber} className={selectedApp?.fileNumber === app.fileNumber ? 'selected-row' : ''}>
                        <td className="font-mono text-accent">{app.fileNumber}</td>
                        <td className="font-bold">{app.name}</td>
                        <td>
                          <span className="badge badge-info">{app.assignedVertical}</span>
                        </td>
                        <td>
                          <span className={`badge ${auth.badge}`}>{auth.label}</span>
                        </td>
                        <td>
                          <button 
                            className={`btn ${canAuthThisApp ? 'btn-primary' : 'btn-outline'} btn-sm`}
                            onClick={() => setSelectedApp(app)}
                            title={!canAuthThisApp ? authStatus.reason : 'Review and execute authorization'}
                          >
                            {canAuthThisApp ? (
                              <span>{app.approvalAuthority === 'pd' || app.isStrategic ? 'Review & E-Sign' : 'Review & Sign'}</span>
                            ) : (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Lock size={12} />
                                <span>{currentRole === 'pd' ? 'View (Delegated)' : 'View (Restricted)'}</span>
                              </span>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedApp && (
        <div className="review-side-panel card animate-fade-in">
          <div className="panel-header">
            <h3>Authorization Review</h3>
            <button className="btn-close" onClick={() => setSelectedApp(null)}>×</button>
          </div>

          <div className="panel-content">
            <div className="authority-warning-box">
              <span className="warning-title">AUTHORITY COMPLIANCE RULE</span>
              <p className="warning-desc">{getAuthorityDetails(selectedApp).rule}</p>
            </div>

            <div className="app-summary-card">
              <div className="sum-row">
                <span className="sum-lbl">File ID:</span>
                <span className="sum-val font-mono">{selectedApp.fileNumber}</span>
              </div>
              <div className="sum-row">
                <span className="sum-lbl">Entity:</span>
                <span className="sum-val font-bold">{selectedApp.name}</span>
              </div>
              {selectedApp.fundingRequested !== '0' && (
                <div className="sum-row">
                  <span className="sum-lbl">Budget:</span>
                  <span className="sum-val text-success font-bold">
                    ₹ {selectedApp.fundingRequested}
                  </span>
                </div>
              )}
              {selectedApp.documentName && (
                <div className="sum-row">
                  <span className="sum-lbl">Attached File:</span>
                  <span className="sum-val">
                    {selectedApp.documentUrl ? (
                      <a href={selectedApp.documentUrl} target="_blank" rel="noopener noreferrer" className="doc-link">
                        <FileText size={12} className="text-accent" />
                        <span>{selectedApp.documentName}</span>
                        <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span className="doc-chip">
                        <FileText size={12} className="text-accent" />
                        <span>{selectedApp.documentName}</span>
                      </span>
                    )}
                  </span>
                </div>
              )}
              <div className="sum-row">
                <span className="sum-lbl">Operations Remarks:</span>
                <span className="sum-val italic text-muted">"{selectedApp.screeningNotes || 'Verified.'}"</span>
              </div>
            </div>

            {/* Authority Matrix Compliance Notice */}
            {!canApproveApplication(selectedApp).authorized && (
              <div className="alert-box alert-warning mt-14 mb-16" style={{ padding: '12px 16px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)', color: '#b45309', fontSize: '12.5px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Lock size={18} className="text-warning flex-shrink-0" style={{ marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', marginBottom: '2px' }}>Authorization Restricted Under Governance Matrix:</strong>
                  <span>{canApproveApplication(selectedApp).reason}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleApprove} className="approval-sign-form">
              <div className="form-group">
                <label className="form-label">Review/Approval Comments</label>
                <textarea 
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={!canApproveApplication(selectedApp).authorized}
                  placeholder={!canApproveApplication(selectedApp).authorized ? 'Read-only mode (Restricted by authority matrix)' : 'Enter review remarks...'}
                ></textarea>
              </div>

              <div className="signature-section">
                <div className="form-group">
                  <label className="form-label">E-Signature Verification *</label>
                  <input 
                    type="text" 
                    className="form-control font-signature"
                    placeholder={!canApproveApplication(selectedApp).authorized ? 'Signature locked' : 'Enter Name to digitally sign'}
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    disabled={!canApproveApplication(selectedApp).authorized}
                    required={canApproveApplication(selectedApp).authorized}
                  />
                  <span className="signature-disclaimer">
                    By typing your name above, you attach a digital authorization stamp to this audit record.
                  </span>
                </div>
              </div>

              {/* PD Signature Visual Stamp Mockup */}
              {signatureName && (
                <div className="digital-stamp-mock animate-fade-in">
                  <Award size={32} className="stamp-icon" />
                  <div className="stamp-details">
                    <span className="stamp-title">IITTNiF DIGITAL APPROVAL</span>
                    <span className="stamp-sign">{signatureName}</span>
                    <span className="stamp-date">Date: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              <div className="panel-actions">
                <button 
                  type="submit" 
                  className="btn btn-success flex-1"
                  disabled={!canApproveApplication(selectedApp).authorized}
                  style={{
                    opacity: !canApproveApplication(selectedApp).authorized ? 0.45 : 1,
                    cursor: !canApproveApplication(selectedApp).authorized ? 'not-allowed' : 'pointer'
                  }}
                >
                  {!canApproveApplication(selectedApp).authorized ? <Lock size={16} /> : <CheckCircle size={16} />}
                  <span>{selectedApp.approvalAuthority === 'pd' || selectedApp.isStrategic ? 'Authorize & E-Sign' : 'Authorize & Sign'}</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleReject}
                  disabled={!canApproveApplication(selectedApp).authorized}
                  style={{
                    opacity: !canApproveApplication(selectedApp).authorized ? 0.45 : 1,
                    cursor: !canApproveApplication(selectedApp).authorized ? 'not-allowed' : 'pointer'
                  }}
                >
                  <XCircle size={16} />
                  <span>Decline File</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .approval-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        .approvals-list-container {
          flex: 1;
        }

        .empty-approvals {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .review-side-panel {
          width: 420px;
          flex-shrink: 0;
          position: sticky;
          top: 0;
        }

        .selected-row {
          background-color: rgba(226, 184, 87, 0.05) !important;
          border-left: 3px solid var(--color-accent);
        }

        .authority-warning-box {
          background-color: rgba(239, 68, 68, 0.04);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 12px;
          border-radius: var(--radius-md);
          margin-bottom: 16px;
        }

        .warning-title {
          font-size: 10px;
          font-weight: 800;
          color: var(--color-danger);
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 4px;
        }

        .warning-desc {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .app-summary-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 12px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sum-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }

        .sum-lbl {
          color: var(--text-secondary);
        }

        .sum-val {
          color: var(--text-primary);
          text-align: right;
        }

        .doc-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--color-accent);
          text-decoration: none;
          font-size: 11px;
          font-weight: 600;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 2px 6px;
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
          gap: 5px;
          color: var(--text-primary);
          font-size: 11px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }

        .approval-sign-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .font-signature {
          font-family: 'Outfit', 'Brush Script MT', cursive, sans-serif;
          font-style: italic;
          font-size: 18px;
          letter-spacing: 1px;
          color: var(--color-accent) !important;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color-active) !important;
        }

        .signature-disclaimer {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 4px;
          display: block;
        }

        .digital-stamp-mock {
          border: 2px solid var(--color-success);
          background-color: rgba(16, 185, 129, 0.03);
          border-radius: var(--radius-md);
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }

        .stamp-icon {
          color: var(--color-success);
        }

        .stamp-details {
          display: flex;
          flex-direction: column;
        }

        .stamp-title {
          font-size: 9px;
          font-weight: 800;
          color: var(--color-success);
          letter-spacing: 0.5px;
        }

        .stamp-sign {
          font-family: cursive;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stamp-date {
          font-size: 9px;
          color: var(--text-muted);
        }

        .flex-1 {
          flex: 1;
        }

        .panel-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
