import React, { useState } from 'react';
import { ShieldCheck, User, Bell } from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab,
  pendingTotalCount = 0,
  pendingScreeningCount = 0,
  pendingApprovalCount = 0,
  notifications = [],
  onClearNotifications,
  onNotificationClick
}) {
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  // The Platform Navigation Steps matching the 7-Step SOP
  const mainNavs = [
    { id: 'entry', label: '1. Entry & Data Capture' },
    { id: 'screening', label: '2. Screening', count: pendingScreeningCount },
    { id: 'approval', label: '3. Approval', count: pendingApprovalCount },
    { id: 'overview', label: '4. Engagement (Verticals)' },
    { id: 'tracking', label: '5. Tracking & Outcomes' },
    { id: 'flow', label: '6. System Flow' }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="navbar-header-grid">
      {/* Column 1: Left Controls & Persona Switcher */}
      <div className="navbar-controls-left">
        {/* User Profile Avatar */}
        <div className="user-profile-container" title="User Profile">
          <div className="user-profile-avatar">
            <User size={18} />
          </div>
        </div>

        {/* Notifications Button & Dropdown */}
        <div className="notif-selector-container" style={{ position: 'relative' }}>
          <button 
            className="navbar-icon-btn-light" 
            title="View Notifications"
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setDropdownOpen(false);
            }}
          >
            <Bell size={17} />
            {(unreadCount > 0 || pendingTotalCount > 0) && (
              <span className="btn-dot-indicator-light"></span>
            )}
          </button>

          {notifDropdownOpen && (
            <div className="notif-dropdown-light animate-fade-in">
              <div className="notif-dropdown-header">
                <div className="notif-title-row">
                  <span className="notif-title-text">System Alerts & Notifications</span>
                  {unreadCount > 0 && (
                    <span className="badge badge-danger" style={{ fontSize: '10px' }}>
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {notifications.length > 0 && onClearNotifications && (
                  <button 
                    className="btn-clear-notifs" 
                    onClick={onClearNotifications}
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="notif-list-scroll">
                {notifications.length === 0 ? (
                  <div className="notif-empty-state">
                    <Bell size={24} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                    <span>No new notifications</span>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`notif-item-card ${notif.read ? 'read' : 'unread'}`}
                      onClick={() => {
                        if (onNotificationClick) onNotificationClick(notif);
                        setNotifDropdownOpen(false);
                      }}
                    >
                      <div className="notif-item-top">
                        <span className={`notif-type-pill ${notif.type || 'info'}`}>
                          {notif.type === 'approval_success' ? 'Authorized' : notif.type === 'routed' ? 'Routed' : 'Update'}
                        </span>
                        <span className="notif-time-text">{notif.timestamp}</span>
                      </div>
                      <h4 className="notif-item-title">{notif.title}</h4>
                      <p className="notif-item-message">{notif.message}</p>
                      {notif.fileNumber && (
                        <div className="notif-file-pill font-mono">{notif.fileNumber}</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Permission Banner */}
        <div className="permission-tag-pill">
          <ShieldCheck size={13} className="text-success" />
          <span className="permission-text-pill">
            {currentRole === 'public' && 'Public Mode'}
            {currentRole === 'operations' && 'Operations Anchor'}
            {currentRole === 'pillar_lead' && 'Pillar Lead'}
            {currentRole === 'pd' && 'Project Director'}
          </span>
        </div>
      </div>

      {/* Column 2: Centered Large Highlighted Heading */}
      <div className="nav-brand-centered">
        <div className="brand-heading-row">
          <h1 className="brand-title-large">VIKAS</h1>
        </div>
        <span className="brand-title-subdesc">
          IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)
        </span>
      </div>

      {/* Column 3: Right Navigation Links mapped to the 7-step flow */}
      <nav className="navbar-links-right">
        {mainNavs.map((nav) => (
          <button
            key={nav.id}
            onClick={() => setActiveTab(nav.id)}
            className={`nav-link-btn-light ${activeTab === nav.id ? 'active' : ''}`}
          >
            {nav.label}
            {nav.count > 0 && (
              <span className={`nav-link-badge-light animate-pulse ${nav.id === 'approval' ? 'badge-danger' : 'badge-warning'}`}>
                {nav.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      <style>{`
        /* Header Grid with adaptive sizing */
        .navbar-header-grid {
          min-height: 90px;
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 24px;
          flex-shrink: 0;
          z-index: 100;
          box-shadow: var(--shadow-sm);
          gap: 16px;
        }

        /* Left Column Controls */
        .navbar-controls-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .permission-tag-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          background-color: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: var(--radius-full);
        }

        .permission-text-pill {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-success);
        }

        /* Centered Brand Title */
        .nav-brand-centered {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex-shrink: 0;
          margin: 0 8px;
        }

        .brand-heading-row {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-title-large {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: 2px;
          color: var(--color-accent);
          line-height: 1.1;
          margin: 0;
          padding: 0;
        }

        .brand-title-subdesc {
          font-size: 11px;
          color: var(--text-secondary);
          font-weight: 600;
          margin-top: 2px;
          letter-spacing: 0.2px;
        }

        /* Right Navigation Buttons */
        .navbar-links-right {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .nav-link-btn-light {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          padding: 7px 11px;
          border-radius: var(--radius-sm);
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .nav-link-btn-light:hover {
          color: var(--text-primary);
          background-color: var(--bg-primary);
          border-color: var(--border-color);
        }

        .nav-link-btn-light.active {
          color: var(--color-accent);
          background-color: var(--color-accent-glow);
          border-color: rgba(var(--color-accent-rgb), 0.25);
          font-weight: 700;
        }

        .nav-link-badge-light {
          font-size: 9.5px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: var(--radius-full);
          line-height: 1.2;
        }

        .badge-warning {
          background-color: #fef3c7;
          color: #b45309;
          border: 1px solid #fde68a;
        }

        .badge-danger {
          background-color: #fee2e2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }

        /* Profile Avatar */
        .user-profile-container {
          display: flex;
          align-items: center;
        }

        .user-profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .user-profile-avatar:hover {
          border-color: var(--color-accent);
          background-color: var(--color-accent-glow);
          transform: scale(1.04);
        }

        .navbar-icon-btn-light {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all var(--transition-fast);
        }

        .navbar-icon-btn-light:hover {
          color: var(--text-primary);
          border-color: var(--border-color-active);
        }

        .btn-dot-indicator-light {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 7px;
          height: 7px;
          border-radius: var(--radius-full);
          background-color: #ef4444;
          box-shadow: 0 0 6px #ef4444;
        }

        /* Notifications Dropdown */
        .notif-dropdown-light {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 320px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 210;
          overflow: hidden;
        }

        .notif-dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .notif-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .notif-title-text {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .btn-clear-notifs {
          background: transparent;
          border: none;
          font-size: 10.5px;
          color: var(--color-accent);
          cursor: pointer;
          font-weight: 600;
        }

        .btn-clear-notifs:hover {
          text-decoration: underline;
        }

        .notif-list-scroll {
          max-height: 360px;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .notif-empty-state {
          padding: 30px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 12px;
        }

        .notif-item-card {
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .notif-item-card:hover {
          border-color: var(--color-accent);
          background-color: var(--bg-surface);
        }

        .notif-item-card.unread {
          border-left: 3px solid var(--color-accent);
          background-color: var(--color-accent-glow);
        }

        .notif-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .notif-type-pill {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: var(--radius-full);
          letter-spacing: 0.3px;
        }

        .notif-type-pill.approval_success {
          background-color: #d1fae5;
          color: #065f46;
        }

        .notif-type-pill.routed {
          background-color: #e0f2fe;
          color: #0369a1;
        }

        .notif-type-pill.info {
          background-color: #f3f4f6;
          color: #374151;
        }

        .notif-time-text {
          font-size: 10px;
          color: var(--text-muted);
        }

        .notif-item-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 2px 0;
        }

        .notif-item-message {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.35;
          margin: 0;
        }

        .notif-file-pill {
          display: inline-block;
          font-size: 10px;
          color: var(--color-accent);
          background-color: rgba(var(--color-accent-rgb), 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 6px;
          font-weight: 600;
        }
      `}</style>
    </header>
  );
}
