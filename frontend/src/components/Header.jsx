import React, { useState } from 'react';
import { ShieldCheck, User, ChevronDown, Bell } from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab,
  pendingTotalCount = 0,
  pendingScreeningCount = 0,
  pendingApprovalCount = 0
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roles = [
    { id: 'public', label: 'Public / Stakeholder', desc: 'Can submit new onboarding requests & track status' },
    { id: 'operations', label: 'Operations Anchor', desc: 'Performs screening, validations & routes files' },
    { id: 'pillar_lead', label: 'Pillar Lead', desc: 'Reviews program files & approves vertical allocations' },
    { id: 'pd', label: 'Project Director (PD)', desc: 'Final strategic approvals, MoUs, high-value files' }
  ];

  // The Platform Navigation Steps matching the 7-Step SOP
  const mainNavs = [
    { id: 'entry', label: '1. Entry & Data Capture' },
    { id: 'screening', label: '2. Screening & Routing', count: pendingScreeningCount },
    { id: 'approval', label: '3. Approval', count: pendingApprovalCount },
    { id: 'overview', label: '4. Engagement (Verticals)' },
    { id: 'tracking', label: '5. Tracking & Outcomes' },
    { id: 'flow', label: '6. System Flow' }
  ];

  const activeRoleName = roles.find(r => r.id === currentRole)?.label || currentRole;

  const handleRoleChange = (roleId) => {
    setCurrentRole(roleId);
    setDropdownOpen(false);
  };

  return (
    <header className="navbar-header-grid">
      {/* Column 1: Left Controls & Persona Switcher */}
      <div className="navbar-controls-left">
        {/* Persona Selector Dropdown */}
        <div className="role-selector-container">
          <button 
            className="role-selector-btn-light" 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
          >
            <div className="role-avatar-light">
              <User size={15} />
            </div>
            <div className="role-btn-info-light">
              <span className="role-label-light">Active Role</span>
              <span className="role-name-light">{activeRoleName.split(' ')[0]}</span>
            </div>
            <ChevronDown size={14} className={`chevron-icon-light ${dropdownOpen ? 'rotated' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="role-dropdown-light animate-fade-in">
              <div className="dropdown-header-light">Switch System Persona</div>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)}
                  className={`dropdown-item-light ${currentRole === role.id ? 'active' : ''}`}
                >
                  <div className="dropdown-item-label-light">{role.label}</div>
                  <div className="dropdown-item-desc-light">{role.desc}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="navbar-icon-btn-light" title="View Notifications">
          <Bell size={17} />
          {pendingTotalCount > 0 && <span className="btn-dot-indicator-light"></span>}
        </button>

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

        /* Role Selector */
        .role-selector-container {
          position: relative;
        }

        .role-selector-btn-light {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 5px 10px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .role-selector-btn-light:hover {
          border-color: var(--border-color-active);
          box-shadow: var(--shadow-sm);
        }

        .role-avatar-light {
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
          background-color: var(--color-accent-glow);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role-btn-info-light {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .role-label-light {
          font-size: 8.5px;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          line-height: 1;
        }

        .role-name-light {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .chevron-icon-light {
          color: var(--text-muted);
          transition: transform var(--transition-fast);
        }

        .chevron-icon-light.rotated {
          transform: rotate(180deg);
        }

        .role-dropdown-light {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 260px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 6px;
          z-index: 200;
        }

        .dropdown-header-light {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          padding: 6px 10px;
          letter-spacing: 0.5px;
        }

        .dropdown-item-light {
          width: 100%;
          text-align: left;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .dropdown-item-light:hover {
          background-color: var(--bg-primary);
        }

        .dropdown-item-light.active {
          background-color: var(--color-accent-glow);
        }

        .dropdown-item-label-light {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .dropdown-item-desc-light {
          font-size: 10px;
          color: var(--text-secondary);
          margin-top: 2px;
          line-height: 1.3;
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
          width: 6px;
          height: 6px;
          border-radius: var(--radius-full);
          background-color: var(--color-accent);
        }
      `}</style>
    </header>
  );
}
