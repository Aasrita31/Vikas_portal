import React, { useState } from 'react';
import { Search, ShieldCheck, History, Info } from 'lucide-react';

export default function AuditLogs({ applications }) {
  const [searchFile, setSearchFile] = useState('');

  // Extract all logs from all applications, adding their File Number, name, and type for reference
  const allLogs = applications.flatMap(app => {
    return app.history.map(hist => ({
      ...hist,
      fileNumber: app.fileNumber,
      name: app.name,
      stakeholderType: app.stakeholderType
    }));
  });

  // Sort logs chronologically (newest first)
  const sortedLogs = allLogs.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const filteredLogs = sortedLogs.filter(log => {
    return log.fileNumber.toLowerCase().includes(searchFile.toLowerCase()) ||
           log.name.toLowerCase().includes(searchFile.toLowerCase()) ||
           log.action.toLowerCase().includes(searchFile.toLowerCase());
  });

  return (
    <div className="audit-logs-container animate-fade-in">
      {/* Audit Warning Compliance Box */}
      <div className="card compliance-card border-warning">
        <div className="compliance-icon-bg">
          <ShieldCheck size={28} className="text-success" />
        </div>
        <div className="compliance-text">
          <h5>AUDIT COMPLIANCE PROTOCOL (SOP 7.2)</h5>
          <p>
            Every stakeholder onboarding, program project allocation, and MoUs transaction is logged digitally. 
            In compliance with national auditing metrics, <strong>no retrospective approvals</strong> or deletions of system logs are permitted.
          </p>
        </div>
      </div>

      <div className="card audit-table-card">
        <div className="audit-card-header">
          <div className="search-box flex-1">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search audit trail by File Number, Entity Name, or action type..."
              value={searchFile}
              onChange={(e) => setSearchFile(e.target.value)}
            />
          </div>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="empty-logs">
            <History size={36} className="text-muted" />
            <p>No audit matching your search terms was found in the register.</p>
          </div>
        ) : (
          <div className="table-container mt-16">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>File Number</th>
                  <th>Entity Name</th>
                  <th>Action Logged</th>
                  <th>Authorized User / Role</th>
                  <th>Transaction Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={index}>
                    <td className="time-td">{log.date}</td>
                    <td className="font-mono text-accent">{log.fileNumber}</td>
                    <td className="font-bold">{log.name}</td>
                    <td>
                      <span className={`badge ${
                        log.action.includes('Approved') ? 'badge-success' : 
                        log.action.includes('Created') ? 'badge-info' : 
                        log.action.includes('Rejected') ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="officer-td">{log.user}</td>
                    <td className="details-td">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .audit-logs-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .compliance-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background-color: rgba(16, 185, 129, 0.03);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .border-warning {
          border-left: 4px solid var(--color-success) !important;
        }

        .compliance-icon-bg {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background-color: rgba(16, 185, 129, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .compliance-text h5 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .compliance-text p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .audit-table-card {
          padding: 20px;
        }

        .audit-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          color: var(--text-muted);
        }

        .search-box input {
          padding-left: 48px;
        }

        .empty-logs {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .mt-16 {
          margin-top: 16px;
        }

        .time-td {
          font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .officer-td {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .details-td {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
          max-width: 300px;
        }

        .flex-1 {
          flex: 1;
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
