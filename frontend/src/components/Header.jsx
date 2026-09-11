import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  User, 
  Bell, 
  ChevronDown, 
  Check, 
  ExternalLink,
  Shield,
  Briefcase,
  GraduationCap,
  School,
  Building2,
  Lock,
  Layers,
  LogIn,
  LogOut,
  UserPlus,
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { useAuth, ROLES } from '../context/AuthContext';

export default function Header({ 
  activeTab, 
  setActiveTab,
  pendingTotalCount = 0,
  pendingScreeningCount = 0,
  pendingApprovalCount = 0,
  notifications = [],
  onClearNotifications,
  onNotificationClick
}) {
  const { currentUser, currentRole, isAuthenticated, logout, isApplicant } = useAuth();
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ROLE-BASED NAVIGATION LINKS
  // External applicants must NEVER see internal screening or approval queues
  const getRoleBasedNavs = () => {
    if (!isAuthenticated) {
      return [
        { id: 'login', label: '1. Sign In' },
        { id: 'entry', label: '2. Proposal Submission' },
        { id: 'overview', label: '3. VIKAS Verticals' },
        { id: 'flow', label: '4. System Flow' }
      ];
    }

    switch (currentRole) {
      case ROLES.APPLICANT:
        return [
          { id: 'entry', label: '1. Proposal Submission' },
          { id: 'overview', label: '2. VIKAS Verticals' },
          { id: 'tracking', label: '3. My Dashboard & Status' },
          { id: 'flow', label: '4. System Flow' }
        ];

      case ROLES.OPERATIONS:
        return [
          { id: 'screening', label: '1. Screening Queue', count: pendingScreeningCount },
          { id: 'entry', label: '2. Registry Intake' },
          { id: 'overview', label: '3. VIKAS Verticals' },
          { id: 'tracking', label: '4. Monitoring & Tracking' }
        ];

      case ROLES.PILLAR_LEAD:
        return [
          { id: 'approval', label: '1. Approval Matrix', count: pendingApprovalCount },
          { id: 'overview', label: '2. Overview' },
          { id: 'tracking', label: '3. Vertical Monitoring' },
          { id: 'flow', label: '4. Process Flow' }
        ];

      case ROLES.PROJECT_DIRECTOR:
      case ROLES.PD:
        return [
          { id: 'approval', label: '1. Approval Matrix', count: pendingApprovalCount },
          { id: 'overview', label: '2. Overview' },
          { id: 'tracking', label: '3. System Monitoring' },
          { id: 'flow', label: '4. Process Flow' }
        ];

      case ROLES.EXECUTION:
        return [
          { id: 'overview', label: '1. Projects & Verticals' },
          { id: 'tracking', label: '2. Execution Dashboard' },
          { id: 'flow', label: '3. Process Flow' }
        ];

      case ROLES.ADMIN:
        return [
          { id: 'overview', label: '1. Overview' },
          { id: 'entry', label: '2. Registry Intake' },
          { id: 'screening', label: '3. Screening Queue', count: pendingScreeningCount },
          { id: 'approval', label: '4. Approval Matrix', count: pendingApprovalCount },
          { id: 'tracking', label: '5. Monitoring' },
          { id: 'flow', label: '6. System Flow' }
        ];

      default:
        return [
          { id: 'tracking', label: '1. My Dashboard' },
          { id: 'entry', label: '2. Submit Application' },
          { id: 'overview', label: '3. Verticals' },
          { id: 'flow', label: '4. System Flow' }
        ];
    }
  };

  const mainNavs = getRoleBasedNavs();
  const scopedNotifications = isApplicant
    ? notifications.filter(n => !n.recipientEmail || (currentUser?.email && n.recipientEmail.toLowerCase() === currentUser.email.toLowerCase()))
    : notifications;
  const unreadCount = scopedNotifications.filter(n => !n.read).length;

  return (
    <header className="navbar-header-grid">
      {/* Column 1: Left Controls & User Account Menu */}
      <div className="navbar-controls-left">
        {isAuthenticated && currentUser ? (
          /* Authenticated User Profile Dropdown */
          <div className="user-profile-wrapper" ref={profileRef}>
            <button 
              className="user-profile-btn-pill"
              onClick={() => setProfileModalOpen(!profileModalOpen)}
              title="Account Menu"
            >
              <div className="user-avatar-circle">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-meta-text">
                <span className="user-name-text">{currentUser.name}</span>
                <span className="user-badge-text">
                  {currentUser.role?.toUpperCase()}
                  {currentUser.stakeholderType ? ` • ${currentUser.stakeholderType}` : ''}
                </span>
              </div>
              <ChevronDown size={14} className="user-caret" />
            </button>

            {/* User Profile Popover Modal */}
            {profileModalOpen && (
              <div className="user-profile-popover animate-slide-down">
                <div className="profile-popover-header">
                  <div className="popover-avatar-lg">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="popover-name-block">
                    <h4 className="popover-full-name">{currentUser.name}</h4>
                    <span className="popover-email font-mono">{currentUser.email}</span>
                  </div>
                </div>

                <div className="profile-popover-details">
                  <div className="popover-row">
                    <span className="popover-lbl">Organization:</span>
                    <span className="popover-val">{currentUser.organization || 'Not Specified'}</span>
                  </div>
                  {currentUser.location && (
                    <div className="popover-row">
                      <span className="popover-lbl">Location:</span>
                      <span className="popover-val">{currentUser.location}</span>
                    </div>
                  )}
                  {currentUser.stakeholderType && (
                    <div className="popover-row">
                      <span className="popover-lbl">Stakeholder Track:</span>
                      <span className="badge badge-amber font-bold">{currentUser.stakeholderType}</span>
                    </div>
                  )}
                  <div className="popover-row">
                    <span className="popover-lbl">System Role:</span>
                    <span className="badge badge-blue font-bold">{currentUser.role?.toUpperCase()}</span>
                  </div>
                </div>

                <div className="profile-popover-actions">
                  {isApplicant && (
                    <button 
                      className="btn-popover-dash"
                      onClick={() => {
                        setActiveTab('tracking');
                        setProfileModalOpen(false);
                      }}
                    >
                      <LayoutDashboard size={14} /> My Dashboard
                    </button>
                  )}
                  <button 
                    className="btn-popover-signout"
                    onClick={() => {
                      logout();
                      setProfileModalOpen(false);
                      setActiveTab('login');
                    }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Unauthenticated Guest Actions */
          <div className="header-auth-buttons">
            <button 
              className="btn-header-signin"
              onClick={() => setActiveTab('login')}
            >
              <LogIn size={14} /> Sign In
            </button>
            <button 
              className="btn-header-signup"
              onClick={() => setActiveTab('entry')}
            >
              <FileText size={14} /> Submit Proposal
            </button>
          </div>
        )}

        {/* Notifications Button & Dropdown (Hidden on Sign In page / unauthenticated) */}
        {isAuthenticated && activeTab !== 'login' && (
        <div className="notif-selector-container" style={{ position: 'relative' }}>
          <button 
            className="navbar-icon-btn-light" 
            title="View Notifications"
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setProfileModalOpen(false);
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
        )}
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

      {/* Column 3: Role-Governed Navigation Links */}
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
        /* Header Grid */
        .navbar-header-grid {
          min-height: 86px;
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
          position: sticky;
          top: 0;
        }

        /* Left Column Controls */
        .navbar-controls-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        /* Profile Pill */
        .user-profile-wrapper {
          position: relative;
        }

        .user-profile-btn-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 12px 5px 6px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .user-profile-btn-pill:hover {
          border-color: var(--color-accent);
          background-color: rgba(var(--color-accent-rgb), 0.05);
          transform: translateY(-1px);
        }

        .user-avatar-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent), #38bdf8);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          box-shadow: 0 2px 6px rgba(var(--color-accent-rgb), 0.3);
        }

        .user-meta-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.2;
        }

        .user-name-text {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .user-badge-text {
          font-size: 10px;
          font-weight: 600;
          color: var(--color-accent);
          letter-spacing: 0.3px;
        }

        .user-caret {
          color: var(--text-muted);
          transition: transform var(--transition-fast);
        }

        /* User Profile Popover Modal */
        .user-profile-popover {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          width: 320px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
          z-index: 250;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .profile-popover-header {
          padding: 16px;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .popover-avatar-lg {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent), #38bdf8);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .popover-name-block {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .popover-full-name {
          font-size: 13.5px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .popover-email {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-popover-details {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--border-color);
        }

        .popover-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11.5px;
        }

        .popover-lbl {
          color: var(--text-muted);
          font-weight: 500;
        }

        .popover-val {
          color: var(--text-primary);
          font-weight: 600;
        }

        .profile-popover-actions {
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          background-color: var(--bg-primary);
        }

        .btn-popover-dash {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          background-color: rgba(var(--color-accent-rgb), 0.1);
          border: 1px solid rgba(var(--color-accent-rgb), 0.25);
          color: var(--color-accent);
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-popover-dash:hover {
          background-color: var(--color-accent);
          color: #ffffff;
        }

        .btn-popover-signout {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-popover-signout:hover {
          background-color: #b91c1c;
          color: #ffffff;
        }

        /* Unauthenticated Auth Buttons */
        .header-auth-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-header-signin {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-header-signin:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .btn-header-signup {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background-color: var(--color-accent);
          border: 1px solid var(--color-accent);
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 2px 6px rgba(var(--color-accent-rgb), 0.25);
        }

        .btn-header-signup:hover {
          background-color: var(--color-accent-hover, #0284c7);
        }

        /* Notifications Dropdown */
        .navbar-icon-btn-light {
          width: 34px;
          height: 34px;
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

        .notif-list-scroll {
          max-height: 340px;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .notif-empty-state {
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 11.5px;
        }

        .notif-item-card {
          padding: 9px 11px;
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
          background-color: rgba(var(--color-accent-rgb), 0.06);
        }

        .notif-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3px;
        }

        .notif-type-pill {
          font-size: 8.5px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 5px;
          border-radius: var(--radius-full);
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
          font-size: 9.5px;
          color: var(--text-muted);
        }

        .notif-item-title {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 2px 0;
        }

        .notif-item-message {
          font-size: 10.5px;
          color: var(--text-secondary);
          line-height: 1.35;
          margin: 0;
        }

        .notif-file-pill {
          display: inline-block;
          font-size: 9.5px;
          color: var(--color-accent);
          background-color: rgba(var(--color-accent-rgb), 0.1);
          padding: 1px 5px;
          border-radius: 4px;
          margin-top: 5px;
          font-weight: 600;
        }

        /* Center Brand */
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
          letter-spacing: 2.5px;
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

        /* Right Nav Links */
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
          padding: 7px 12px;
          border-radius: var(--radius-sm);
          font-size: 12px;
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
          background-color: rgba(var(--color-accent-rgb), 0.1);
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
      `}</style>
    </header>
  );
}
