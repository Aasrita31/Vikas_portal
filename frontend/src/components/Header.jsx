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
  FileText,
  Sparkles,
  ArrowLeft,
  Compass
} from 'lucide-react';
import { useAuth, ROLES } from '../context/AuthContext';
import iittnifLogo from '../assets/IITTNiF logo.jpg';
import { NOTIFICATION_EVENTS } from '../services/notificationService';

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
  const { currentUser, currentRole, isAuthenticated, logout, isApplicant, isAdmin } = useAuth();
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const menusRef = useRef(null);

  // Close both popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menusRef.current && !menusRef.current.contains(event.target)) {
        setProfileModalOpen(false);
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sequential Portal Navigation Links (shown after sign-in only)
  const getRoleBasedNavs = () => {
    if (!isAuthenticated) {
      return [];
    }

    switch (currentRole) {
      case ROLES.APPLICANT:
        return [
          { id: 'entry', label: '1. Proposal Submission' },
          { id: 'overview', label: '2. VIKAS Verticals' },
          { id: 'tracking', label: '3. My Dashboard & Status' }
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
          { id: 'entry', label: '1. Proposal Submission' },
          { id: 'overview', label: '2. VIKAS Verticals' },
          { id: 'tracking', label: '3. My Dashboard & Status' }
        ];
    }
  };

  const mainNavs = getRoleBasedNavs();
  const approvalNotifications = (isApplicant
    ? notifications.filter(n => !n.recipientEmail || (currentUser?.email && n.recipientEmail.toLowerCase() === currentUser.email.toLowerCase()))
    : notifications
  ).filter(n =>
    n.event === NOTIFICATION_EVENTS.APPLICATION_APPROVED ||
    n.type === 'approval_success' ||
    /approved/i.test(n.event || '') ||
    /approved/i.test(n.title || '')
  );
  const unreadCount = approvalNotifications.filter(n => !n.read).length;

  const isDarkMode = activeTab === 'landing' || activeTab === 'login' || activeTab === 'admin-login';

  return (
    <header className={`navbar-header-grid ${isDarkMode ? 'navbar-theme-dark navbar-login' : 'navbar-theme-light'}`}>
      {/* Column 1: Left Institutional Emblem & User Profile */}
      <div className="navbar-controls-left" ref={menusRef}>
        {isAuthenticated && currentUser ? (
          /* Authenticated User Profile Dropdown */
          <div className="user-profile-wrapper">
            <button 
              className="user-profile-btn-pill"
              onClick={() => {
                setProfileModalOpen((open) => !open);
                setNotifDropdownOpen(false);
              }}
              title="Account Menu"
            >
              <div className="user-avatar-circle">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-meta-text">
                <span className="user-name-text">{currentUser.name}</span>
                <span className="user-badge-text">
                  {currentUser.role?.toUpperCase()}
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
                  {isAdmin && (
                    <button 
                      className="btn-popover-dash"
                      onClick={() => {
                        setActiveTab('admin');
                        setProfileModalOpen(false);
                      }}
                    >
                      <LayoutDashboard size={14} /> Admin Dashboard
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
          /* Unauthenticated Institutional Hub Brand Mark with Back Action */
          <div className="header-national-hub-emblem animate-fade-in" onClick={() => setActiveTab('landing')} style={{ cursor: 'pointer' }}>
            <div className="hub-emblem-badge">
              <span className="badge-dot-live" />
              <span className="emblem-org-code">DST NM-ICPS</span>
            </div>
            <div className="hub-emblem-text">
              <span className="hub-title-sm">Technology Innovation Hub</span>
            </div>
          </div>
        )}

        {/* Explicit Back to VIKAS Home / Landing Page Button */}
        <button 
          type="button" 
          className="btn-header-back-home animate-fade-in"
          onClick={() => setActiveTab('landing')}
          title="Return to VIKAS Landing Page"
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </button>

        {/* Notifications Button & Dropdown */}
        {isAuthenticated && activeTab !== 'login' && activeTab !== 'admin-login' && (
          <div className="notif-selector-container" style={{ position: 'relative' }}>
            <button 
              className="navbar-icon-btn-light" 
              title="View Notifications"
              onClick={() => {
                setNotifDropdownOpen((open) => !open);
                setProfileModalOpen(false);
              }}
            >
              <Bell size={17} />
              {(unreadCount > 0) && (
                <span className="btn-dot-indicator-light"></span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="notif-dropdown-light animate-fade-in">
                <div className="notif-dropdown-header">
                  <div className="notif-title-row">
                    <span className="notif-title-text">Approval Notifications</span>
                    {unreadCount > 0 && (
                      <span className="badge badge-danger" style={{ fontSize: '10px' }}>
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  {approvalNotifications.length > 0 && onClearNotifications && (
                    <button 
                      className="btn-clear-notifs" 
                      onClick={onClearNotifications}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="notif-list-scroll">
                  {approvalNotifications.length === 0 ? (
                    <div className="notif-empty-state">
                      <Bell size={24} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                      <span>No approval notifications yet</span>
                    </div>
                  ) : (
                    approvalNotifications.map((notif) => (
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
                            Approved
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
      <div className="nav-brand-centered" onClick={() => setActiveTab('landing')} style={{ cursor: 'pointer' }} title="Go to VIKAS Landing Page">
        <div className="brand-heading-row">
          <h1 className="brand-title-large">VIKAS</h1>
        </div>
        <span className="brand-title-subdesc">
          IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)
        </span>
      </div>

      {/* Column 3: Right Action Area with Admin Dashboard Button & Nav/Logo */}
      <div className="navbar-right-action-wrapper">
        {isAdmin && (
          <button
            type="button"
            onClick={() => {
              if (activeTab === 'admin' || activeTab === 'admin-login') {
                setActiveTab('landing');
              } else {
                setActiveTab('admin');
              }
            }}
            className={`btn-header-admin-dash ${isDarkMode ? 'admin-btn-dark' : 'admin-btn-light'} ${activeTab === 'admin' || activeTab === 'admin-login' ? 'active' : ''}`}
            title="Go to Admin Dashboard"
          >
            <Shield size={14} className="text-amber-500" />
            <span>Admin Dashboard</span>
          </button>
        )}

        {isAuthenticated && (
          <nav className="navbar-links-right">
            {mainNavs.map((nav) => {
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id)}
                  className={`nav-link-btn ${isDarkMode ? 'nav-dark' : 'nav-light'} ${isActive ? 'active' : ''}`}
                >
                  <span>{nav.label}</span>
                  {nav.count > 0 && (
                    <span className={`nav-link-badge animate-pulse ${nav.id === 'approval' ? 'badge-danger' : 'badge-warning'}`}>
                      {nav.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}

        <div className="header-iittnif-logo-wrap" title="IIT Tirupati Navavishkar I-Hub Foundation" onClick={() => setActiveTab('landing')} style={{ cursor: 'pointer' }}>
          <img
            src={iittnifLogo}
            alt="IIT Tirupati Navavishkar I-Hub Foundation"
            className="header-iittnif-logo"
          />
        </div>
      </div>


      <style>{`
        /* Header Grid */
        .navbar-header-grid {
          min-height: 82px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          padding: 10px 28px;
          flex-shrink: 0;
          z-index: 100;
          gap: 16px;
          position: sticky;
          top: 0;
          transition: all 0.3s ease;
        }

        /* Dark Theme on Login/Hero Page */
        .navbar-theme-dark {
          background-color: #070c18;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .navbar-login {
          min-height: 100px;
          padding: 12px 28px;
        }

        .navbar-theme-dark .brand-title-large {
          font-size: 46px;
          letter-spacing: 5px;
          background: linear-gradient(135deg, #ffffff 40%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 18px rgba(245, 158, 11, 0.35));
        }

        .navbar-theme-dark .brand-title-subdesc {
          color: #94a3b8;
          font-size: 12.5px;
          max-width: min(340px, 38vw);
          line-height: 1.3;
        }

        /* Light Theme on Onboarding & Verticals */
        .navbar-theme-light {
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .navbar-theme-light .brand-title-large {
          color: #b45309;
          font-size: 38px;
          letter-spacing: 3.5px;
        }

        .navbar-theme-light .brand-title-subdesc {
          color: #64748b;
        }

        /* Left Column Controls */
        .navbar-controls-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
          min-width: 0;
          justify-self: start;
        }


        /* National Hub Emblem */
        .header-national-hub-emblem {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .hub-emblem-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(217, 119, 6, 0.12);
          border: 1px solid rgba(217, 119, 6, 0.3);
        }

        .navbar-theme-light .hub-emblem-badge {
          background: #fef3c7;
          border-color: #fde68a;
        }

        .badge-dot-live {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #ef4444;
          box-shadow: 0 0 8px #ef4444;
          animation: pulseDot 2s infinite;
        }

        .emblem-org-code {
          font-size: 11px;
          font-weight: 800;
          color: #f59e0b;
          letter-spacing: 0.5px;
        }

        .navbar-theme-light .emblem-org-code {
          color: #b45309;
        }

        .hub-title-sm {
          font-size: 11.5px;
          font-weight: 600;
          color: #94a3b8;
        }

        .navbar-theme-light .hub-title-sm {
          color: #64748b;
        }

        /* Back to Landing Page Button */
        .btn-header-back-home {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          border: 1px solid rgba(245, 158, 11, 0.35);
          background: rgba(245, 158, 11, 0.08);
          color: #fbbf24;
        }

        .btn-header-back-home:hover {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          border-color: #f59e0b;
          color: #070c18;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .navbar-theme-light .btn-header-back-home {
          background: #fffbeb;
          border-color: #fcd34d;
          color: #b45309;
        }

        .navbar-theme-light .btn-header-back-home:hover {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          border-color: #d97706;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25);
        }

        /* Center Brand */
        .nav-brand-centered {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          justify-self: center;
          padding: 0 8px;
        }

        .brand-title-large {
          font-size: 26px;
          font-weight: 900;
          letter-spacing: 2.5px;
          line-height: 1.05;
          margin: 0;
          font-family: 'Outfit', 'Inter', sans-serif;
        }

        .brand-title-subdesc {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.3px;
          margin-top: 2px;
          text-align: center;
        }

        /* Right Action Column */
        .navbar-right-action-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          min-width: 0;
          justify-self: end;
        }

        /* Right Nav Links */
        .navbar-links-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          flex-shrink: 1;
          flex-wrap: nowrap;
          min-width: 0;
        }

        .header-iittnif-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 4px 8px;
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
        }

        .navbar-theme-dark .header-iittnif-logo-wrap {
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
        }

        .header-iittnif-logo {
          height: auto;
          width: 196px;
          max-height: 56px;
          object-fit: contain;
          display: block;
        }

        .nav-link-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Dark Nav Buttons */
        .nav-link-btn.nav-dark {
          background-color: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .nav-link-btn.nav-dark:hover:not(.active) {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .nav-link-btn.nav-dark.active {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          border-color: #f59e0b;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.4);
          font-weight: 700;
        }

        /* Light Nav Buttons */
        .nav-link-btn.nav-light {
          background-color: #f8fafc;
          color: #334155;
          border-color: #e2e8f0;
        }

        .nav-link-btn.nav-light:hover:not(.active) {
          background-color: #f1f5f9;
          color: #0f172a;
          transform: translateY(-1px);
        }

        .nav-link-btn.nav-light.active {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          border-color: #f59e0b;
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
          font-weight: 700;
        }

        /* Admin Dashboard Header Button */
        .btn-header-admin-dash {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
          white-space: nowrap;
        }

        .btn-header-admin-dash.admin-btn-dark {
          background: rgba(217, 119, 6, 0.12);
          border-color: rgba(217, 119, 6, 0.35);
          color: #f59e0b;
        }

        .btn-header-admin-dash.admin-btn-dark:hover {
          background: rgba(217, 119, 6, 0.22);
          border-color: #f59e0b;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .btn-header-admin-dash.admin-btn-light {
          background: #fef3c7;
          border-color: #fde68a;
          color: #b45309;
        }

        .btn-header-admin-dash.admin-btn-light:hover {
          background: #fde68a;
          color: #92400e;
          transform: translateY(-1px);
        }

        .btn-header-admin-dash.active {
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          color: #ffffff !important;
          border-color: #d97706;
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
        }


        .nav-link-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-full);
          color: #ffffff;
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
          background-color: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .navbar-theme-light .user-profile-btn-pill {
          background-color: #f8fafc;
          border-color: #cbd5e1;
        }

        .user-profile-btn-pill:hover {
          border-color: #d97706;
          transform: translateY(-1px);
        }

        .user-avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d97706, #3b82f6);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
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

        .navbar-theme-dark .user-name-text {
          color: #ffffff;
        }

        .user-badge-text {
          font-size: 10px;
          font-weight: 600;
          color: #d97706;
        }

        .user-caret {
          color: #94a3b8;
        }

        /* User Profile Popover */
        .user-profile-popover {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          width: 320px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
          z-index: 250;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .profile-popover-header {
          padding: 16px;
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .popover-avatar-lg {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d97706, #3b82f6);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 800;
        }

        .popover-name-block {
          display: flex;
          flex-direction: column;
        }

        .popover-full-name {
          font-size: 13.5px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .popover-email {
          font-size: 11px;
          color: #64748b;
          margin-top: 2px;
        }

        .profile-popover-details {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid #e2e8f0;
        }

        .popover-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11.5px;
        }

        .popover-lbl {
          color: #64748b;
          font-weight: 500;
        }

        .popover-val {
          color: #0f172a;
          font-weight: 600;
        }

        .profile-popover-actions {
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          background-color: #f8fafc;
        }

        .btn-popover-dash {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          background-color: #fef3c7;
          border: 1px solid #fde68a;
          color: #b45309;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-popover-signout {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          background-color: #fee2e2;
          border: 1px solid #fca5a5;
          color: #b91c1c;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Notifications dropdown */
        .navbar-icon-btn-light {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
        }

        .navbar-theme-light .navbar-icon-btn-light {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #475569;
        }

        .btn-dot-indicator-light {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #ef4444;
        }

        .notif-dropdown-light {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          width: 320px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
          z-index: 250;
          overflow: hidden;
        }

        .notif-dropdown-header {
          padding: 12px 16px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .notif-title-text {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
        }

        .btn-clear-notifs {
          background: transparent;
          border: none;
          color: #d97706;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .notif-list-scroll {
          max-height: 280px;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .notif-item-card {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          background: #ffffff;
        }

        .notif-item-card.unread {
          background: #fffbeb;
          border-color: #fde68a;
        }

        .notif-item-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .notif-type-pill {
          font-size: 9.5px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
          background: #f1f5f9;
          color: #475569;
        }

        .notif-time-text {
          font-size: 10px;
          color: #94a3b8;
        }

        .notif-item-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 2px 0;
        }

        .notif-item-message {
          font-size: 11px;
          color: #475569;
          margin: 0;
          line-height: 1.35;
        }

        .notif-file-pill {
          font-size: 9.5px;
          color: #d97706;
          font-weight: 700;
          margin-top: 4px;
        }

        .notif-empty-state {
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 12px;
        }

        @media (max-width: 1100px) {
          .navbar-header-grid:not(.navbar-login) {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 10px;
            padding: 12px 16px 14px;
          }

          .navbar-header-grid:not(.navbar-login) .navbar-controls-left,
          .navbar-header-grid:not(.navbar-login) .navbar-right-action-wrapper {
            justify-self: stretch;
            justify-content: center;
            flex-wrap: nowrap;
          }

          .navbar-links-right {
            gap: 5px;
            justify-content: center;
            flex-wrap: nowrap;
          }

          .nav-link-btn {
            padding: 6px 10px;
            font-size: 11.5px;
          }
        }

        @media (max-width: 900px) {
          .navbar-login {
            grid-template-columns: auto 1fr auto;
            padding: 10px 14px;
            gap: 10px;
          }

          .navbar-theme-dark .brand-title-large {
            font-size: 32px;
            letter-spacing: 3px;
          }

          .header-iittnif-logo {
            height: auto;
            width: 168px;
            max-height: 48px;
          }

          .hub-title-sm {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .navbar-login {
            grid-template-columns: 1fr auto;
            grid-template-areas:
              "left logo"
              "brand brand";
            min-height: auto;
            padding: 10px 12px 12px;
            gap: 8px;
          }

          .navbar-login .navbar-controls-left {
            grid-area: left;
          }

          .navbar-login .nav-brand-centered {
            grid-area: brand;
          }

          .navbar-login .navbar-right-action-wrapper {
            grid-area: logo;
            justify-self: end;
          }

          .navbar-header-grid:not(.navbar-login) .header-iittnif-logo {
            height: auto;
            width: 148px;
            max-height: 44px;
          }

          .navbar-theme-dark .brand-title-large {
            font-size: 28px;
            letter-spacing: 2.5px;
          }

          .navbar-theme-dark .brand-title-subdesc {
            font-size: 10.5px;
          }

          .header-iittnif-logo {
            height: auto;
            width: 140px;
            max-height: 42px;
          }

          .header-iittnif-logo-wrap {
            padding: 3px 6px;
          }

          .user-meta-text {
            display: none;
          }
        }

        @media (max-width: 420px) {
          .navbar-theme-dark .brand-title-large {
            font-size: 24px;
          }

          .brand-title-subdesc {
            font-size: 9.5px;
            max-width: 240px;
          }
        }
      `}</style>
    </header>
  );
}
