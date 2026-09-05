import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  FileSearch, 
  FileCheck, 
  Activity, 
  Database, 
  History, 
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, pendingScreeningCount, pendingApprovalCount }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'onboard', label: 'Onboard Stakeholder', icon: UserPlus, badge: null },
    { id: 'screening', label: 'Screening Queue', icon: FileSearch, badge: pendingScreeningCount },
    { id: 'approval', label: 'Approval Panel', icon: FileCheck, badge: pendingApprovalCount },
    { id: 'engagements', label: 'Active Engagements', icon: Activity, badge: null },
    { id: 'audit', label: 'Audit Logs', icon: History, badge: null },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">V</div>
        <div className="brand-info">
          <h1>VIKAS</h1>
          <p>IIT Tirupati I-Hub</p>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.badge > 0 && (
                <span className={`nav-badge ${item.id === 'approval' ? 'badge-approve' : 'badge-screen'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <div className="footer-status">
          <ShieldAlert size={16} className="text-accent" />
          <span>NM-ICPS Compliant</span>
        </div>
        <div className="footer-version">v1.2.0-Alpha</div>
      </div>

      <style>{`
        .sidebar {
          width: 260px;
          background-color: var(--bg-sidebar);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          height: 100vh;
          flex-shrink: 0;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--color-accent), #c29530);
          color: #0c0f16;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 22px;
          box-shadow: var(--shadow-glow);
        }

        .brand-info h1 {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .brand-info p {
          font-size: 11px;
          font-weight: 500;
          color: var(--text-muted);
        }

        .sidebar-nav {
          flex: 1;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow-y: auto;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
          gap: 12px;
        }

        .sidebar-nav-item:hover {
          color: var(--text-primary);
          background-color: var(--bg-surface);
        }

        .sidebar-nav-item.active {
          color: #0c0f16;
          background-color: var(--color-accent);
          font-weight: 600;
          box-shadow: var(--shadow-glow);
        }

        .nav-icon {
          flex-shrink: 0;
          transition: transform var(--transition-fast);
        }

        .sidebar-nav-item:hover .nav-icon {
          transform: translateX(2px);
        }

        .sidebar-nav-item.active:hover .nav-icon {
          transform: none;
        }

        .nav-badge {
          margin-left: auto;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          animation: pulse 2s infinite;
        }

        .badge-screen {
          background-color: var(--color-warning-bg);
          color: var(--color-warning);
        }

        .badge-approve {
          background-color: var(--color-danger-bg);
          color: var(--color-danger);
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .sidebar-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .footer-version {
          font-size: 10px;
          color: var(--text-muted);
          padding-left: 24px;
        }

        .text-accent {
          color: var(--color-accent);
        }
      `}</style>
    </aside>
  );
}
