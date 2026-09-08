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
  Layers
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
  const { currentUser, currentRole, systemPersonas, switchPersona, isApplicant } = useAuth();
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [personaModalOpen, setPersonaModalOpen] = useState(false);
  const personaRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (personaRef.current && !personaRef.current.contains(event.target)) {
        setPersonaModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ROLE-BASED NAVIGATION LINKS (A: Role-based navigation)
  // An applicant/external stakeholder must NEVER be able to view or access Screening or Approval
  const getRoleBasedNavs = () => {
    switch (currentRole) {
      case ROLES.APPLICANT:
        return [
          { id: 'entry', label: '1. Submit Application' },
          { id: 'tracking', label: '2. My Applications & Status' },
          { id: 'overview', label: '3. VIKAS Verticals' },
          { id: 'flow', label: '4. System Flow' }
        ];

      case ROLES.OPERATIONS:
        return [
          { id: 'entry', label: '1. Intake & Registry' },
          { id: 'screening', label: '2. Screening Queue', count: pendingScreeningCount },
          { id: 'overview', label: '3. VIKAS Verticals' },
          { id: 'tracking', label: '4. Monitoring & Tracking' }
        ];

      case ROLES.PILLAR_LEAD:
        return [
          { id: 'overview', label: '1. Overview' },
          { id: 'approval', label: '2. Approval Matrix', count: pendingApprovalCount },
          { id: 'tracking', label: '3. Vertical Monitoring' },
          { id: 'flow', label: '4. Process Flow' }
        ];

      case ROLES.PD:
        return [
          { id: 'overview', label: '1. Overview' },
          { id: 'approval', label: '2. Approval Matrix', count: pendingApprovalCount },
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
          { id: 'entry', label: '1. Submit Application' },
          { id: 'tracking', label: '2. Tracking & Outcomes' },
          { id: 'overview', label: '3. Verticals' },
          { id: 'flow', label: '4. System Flow' }
        ];
    }
  };

  const mainNavs = getRoleBasedNavs();
  const scopedNotifications = isApplicant
    ? notifications.filter(n => !n.recipientEmail || (currentUser.email && n.recipientEmail.toLowerCase() === currentUser.email.toLowerCase()))
    : notifications;
  const unreadCount = scopedNotifications.filter(n => !n.read).length;

  return (
    <header className="navbar-header-grid">
      {/* Column 1: Left Controls & Persona Switcher */}
      <div className="navbar-controls-left">
        {/* Interactive User Persona & Role Switcher */}
        <div className="persona-switcher-wrapper" ref={personaRef}>
          <button 
            className="persona-btn-pill"
            onClick={() => setPersonaModalOpen(!personaModalOpen)}
            title="Switch User Role / Persona"
          >
            <span className="persona-avatar-icon">
              {currentUser.avatarBadge || '👤'}
            </span>
            <div className="persona-meta-text">
              <span className="persona-user-name">{currentUser.name}</span>
              <span className="persona-role-badge">
                {currentUser.roleLabel || currentUser.role.toUpperCase()}
              </span>
            </div>
            <ChevronDown size={14} className="persona-caret" />
          </button>

          {/* Persona Selection Dropdown Modal */}
          {personaModalOpen && (
            <div className="persona-dropdown-modal animate-slide-down">
              <div className="persona-modal-header">
                <div>
                  <h4 className="persona-modal-title">Switch Active Role & Persona</h4>
                  <p className="persona-modal-subtitle">
                    Select a simulated stakeholder or internal officer to evaluate RBAC workflow permissions.
                  </p>
                </div>
              </div>

              <div className="persona-groups-scroll">
                {/* 1. External Applicants */}
                <div className="persona-group-section">
                  <div className="group-heading-row">
                    <span className="group-badge-icon">🌐</span>
                    <span className="group-title">1. APPLICANT / EXTERNAL STAKEHOLDERS</span>
                  </div>
                  <div className="group-subtext">
                    Strictly read-only for internal workflows. Can only view/manage own application and progress.
                  </div>
                  <div className="personas-list">
                    {systemPersonas.filter(p => p.role === ROLES.APPLICANT).map((persona) => {
                      const isSelected = persona.id === currentUser.id;
                      return (
                        <div 
                          key={persona.id} 
                          className={`persona-item-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            switchPersona(persona.id);
                            setPersonaModalOpen(false);
                            setActiveTab('entry');
                          }}
                        >
                          <div className="persona-item-left">
                            <span className="persona-item-emoji">{persona.avatarBadge}</span>
                            <div className="persona-item-info">
                              <div className="persona-item-title-row">
                                <span className="persona-item-name">{persona.name}</span>
                                <span className="persona-item-type-badge">{persona.applicantType}</span>
                              </div>
                              <span className="persona-item-org">{persona.organization}</span>
                              <p className="persona-item-desc">{persona.description}</p>
                            </div>
                          </div>
                          {isSelected && <Check size={16} className="text-success check-icon" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Operations & Screening */}
                <div className="persona-group-section mt-12">
                  <div className="group-heading-row">
                    <span className="group-badge-icon">🔍</span>
                    <span className="group-title">2. OPERATIONS / SCREENING CELL</span>
                  </div>
                  <div className="personas-list">
                    {systemPersonas.filter(p => p.role === ROLES.OPERATIONS).map((persona) => {
                      const isSelected = persona.id === currentUser.id;
                      return (
                        <div 
                          key={persona.id} 
                          className={`persona-item-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            switchPersona(persona.id);
                            setPersonaModalOpen(false);
                            setActiveTab('screening');
                          }}
                        >
                          <div className="persona-item-left">
                            <span className="persona-item-emoji">{persona.avatarBadge}</span>
                            <div className="persona-item-info">
                              <span className="persona-item-name">{persona.name}</span>
                              <span className="persona-item-org">{persona.organization}</span>
                              <p className="persona-item-desc">{persona.description}</p>
                            </div>
                          </div>
                          {isSelected && <Check size={16} className="text-success check-icon" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Pillar Leads */}
                <div className="persona-group-section mt-12">
                  <div className="group-heading-row">
                    <span className="group-badge-icon">⚡</span>
                    <span className="group-title">3. PILLAR LEADS (VERTICAL GOVERNANCE)</span>
                  </div>
                  <div className="personas-list">
                    {systemPersonas.filter(p => p.role === ROLES.PILLAR_LEAD).map((persona) => {
                      const isSelected = persona.id === currentUser.id;
                      return (
                        <div 
                          key={persona.id} 
                          className={`persona-item-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            switchPersona(persona.id);
                            setPersonaModalOpen(false);
                            setActiveTab('approval');
                          }}
                        >
                          <div className="persona-item-left">
                            <span className="persona-item-emoji">{persona.avatarBadge}</span>
                            <div className="persona-item-info">
                              <span className="persona-item-name">{persona.name}</span>
                              <span className="persona-item-org">{persona.roleLabel}</span>
                              <p className="persona-item-desc">{persona.description}</p>
                            </div>
                          </div>
                          {isSelected && <Check size={16} className="text-success check-icon" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Project Director */}
                <div className="persona-group-section mt-12">
                  <div className="group-heading-row">
                    <span className="group-badge-icon">⭐</span>
                    <span className="group-title">4. PROJECT DIRECTOR (APEX AUTHORITY)</span>
                  </div>
                  <div className="personas-list">
                    {systemPersonas.filter(p => p.role === ROLES.PROJECT_DIRECTOR).map((persona) => {
                      const isSelected = persona.id === currentUser.id;
                      return (
                        <div 
                          key={persona.id} 
                          className={`persona-item-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            switchPersona(persona.id);
                            setPersonaModalOpen(false);
                            setActiveTab('approval');
                          }}
                        >
                          <div className="persona-item-left">
                            <span className="persona-item-emoji">{persona.avatarBadge}</span>
                            <div className="persona-item-info">
                              <span className="persona-item-name">{persona.name}</span>
                              <span className="persona-item-org">{persona.organization}</span>
                              <p className="persona-item-desc">{persona.description}</p>
                            </div>
                          </div>
                          {isSelected && <Check size={16} className="text-success check-icon" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Execution & Program Team */}
                <div className="persona-group-section mt-12">
                  <div className="group-heading-row">
                    <span className="group-badge-icon">📊</span>
                    <span className="group-title">5. EXECUTION / PROGRAM TEAM</span>
                  </div>
                  <div className="personas-list">
                    {systemPersonas.filter(p => p.role === ROLES.EXECUTION).map((persona) => {
                      const isSelected = persona.id === currentUser.id;
                      return (
                        <div 
                          key={persona.id} 
                          className={`persona-item-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            switchPersona(persona.id);
                            setPersonaModalOpen(false);
                            setActiveTab('overview');
                          }}
                        >
                          <div className="persona-item-left">
                            <span className="persona-item-emoji">{persona.avatarBadge}</span>
                            <div className="persona-item-info">
                              <span className="persona-item-name">{persona.name}</span>
                              <span className="persona-item-org">{persona.organization}</span>
                              <p className="persona-item-desc">{persona.description}</p>
                            </div>
                          </div>
                          {isSelected && <Check size={16} className="text-success check-icon" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Admin */}
                <div className="persona-group-section mt-12">
                  <div className="group-heading-row">
                    <span className="group-badge-icon">⚙️</span>
                    <span className="group-title">6. ADMIN</span>
                  </div>
                  <div className="personas-list">
                    {systemPersonas.filter(p => p.role === ROLES.ADMIN).map((persona) => {
                      const isSelected = persona.id === currentUser.id;
                      return (
                        <div 
                          key={persona.id} 
                          className={`persona-item-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            switchPersona(persona.id);
                            setPersonaModalOpen(false);
                            setActiveTab('audit');
                          }}
                        >
                          <div className="persona-item-left">
                            <span className="persona-item-emoji">{persona.avatarBadge}</span>
                            <div className="persona-item-info">
                              <span className="persona-item-name">{persona.name}</span>
                              <span className="persona-item-org">{persona.organization}</span>
                              <p className="persona-item-desc">{persona.description}</p>
                            </div>
                          </div>
                          {isSelected && <Check size={16} className="text-success check-icon" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Button & Dropdown */}
        <div className="notif-selector-container" style={{ position: 'relative' }}>
          <button 
            className="navbar-icon-btn-light" 
            title="View Notifications"
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen);
              setPersonaModalOpen(false);
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
                    <span>No new notifications for your role</span>
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

        /* Persona Switcher Pill */
        .persona-switcher-wrapper {
          position: relative;
        }

        .persona-btn-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .persona-btn-pill:hover {
          border-color: var(--color-accent);
          background-color: rgba(var(--color-accent-rgb), 0.05);
          transform: translateY(-1px);
        }

        .persona-avatar-icon {
          font-size: 18px;
          line-height: 1;
        }

        .persona-meta-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.2;
        }

        .persona-user-name {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .persona-role-badge {
          font-size: 10px;
          font-weight: 600;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .persona-caret {
          color: var(--text-muted);
          transition: transform var(--transition-fast);
        }

        /* Persona Dropdown Modal */
        .persona-dropdown-modal {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          width: 440px;
          max-height: 520px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
          z-index: 250;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .persona-modal-header {
          padding: 14px 18px;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .persona-modal-title {
          font-size: 13.5px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .persona-modal-subtitle {
          font-size: 11px;
          color: var(--text-secondary);
          margin: 3px 0 0 0;
          line-height: 1.35;
        }

        .persona-groups-scroll {
          padding: 12px;
          overflow-y: auto;
          max-height: 440px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .persona-group-section {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 10px;
        }

        .group-heading-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 3px;
        }

        .group-badge-icon {
          font-size: 13px;
        }

        .group-title {
          font-size: 11px;
          font-weight: 800;
          color: var(--color-accent);
          letter-spacing: 0.4px;
        }

        .group-subtext {
          font-size: 10px;
          color: var(--text-muted);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .personas-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .persona-item-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .persona-item-card:hover {
          border-color: var(--color-accent);
          transform: translateX(2px);
        }

        .persona-item-card.active {
          border-color: var(--color-accent);
          background-color: rgba(var(--color-accent-rgb), 0.08);
        }

        .persona-item-left {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          flex: 1;
        }

        .persona-item-emoji {
          font-size: 16px;
          margin-top: 2px;
        }

        .persona-item-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .persona-item-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .persona-item-name {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .persona-item-type-badge {
          font-size: 9px;
          font-weight: 700;
          background-color: rgba(var(--color-accent-rgb), 0.12);
          color: var(--color-accent);
          padding: 1px 6px;
          border-radius: var(--radius-full);
        }

        .persona-item-org {
          font-size: 10.5px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .persona-item-desc {
          font-size: 9.5px;
          color: var(--text-muted);
          margin: 2px 0 0 0;
          line-height: 1.3;
        }

        .check-icon {
          flex-shrink: 0;
          margin-left: 8px;
        }

        .mt-12 {
          margin-top: 12px;
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
