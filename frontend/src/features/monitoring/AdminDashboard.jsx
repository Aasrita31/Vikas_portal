import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Key, 
  BarChart3, 
  Search, 
  Filter, 
  Building2, 
  ArrowUpRight, 
  UserPlus, 
  Download, 
  Shield, 
  Activity,
  History,
  CheckCircle,
  XCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';
import ScreeningQueue from '../screening/ScreeningQueue';
import ApprovalPanel from '../approval/ApprovalPanel';
import AuditLogs from '../audit/AuditLogs';

export default function AdminDashboard({ 
  applications = [], 
  onRouteApplication, 
  onApproveApplication, 
  onRejectApplication,
  onNavigateToTab,
  onNavigateToAdminRegister
}) {
  const { currentUser, currentRole } = useAuth();
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('overview'); // 'overview' | 'users' | 'screening' | 'approval' | 'audit'
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('ALL');

  // Derive Stakeholder & User List from persistent Applications & Current User
  const allUsersMap = new Map();
  
  // Seed default core platform accounts
  allUsersMap.set('admin@iittnif.in', {
    id: 'usr_admin',
    name: 'System Administrator',
    email: 'admin@iittnif.in',
    organization: 'IITTNiF Central Administration',
    role: 'ADMIN',
    stakeholderType: 'Central Governance',
    phone: '+91 98765 00006',
    location: 'Tirupati, AP',
    status: 'ACTIVE',
    filesCount: applications.length
  });

  allUsersMap.set('director@iittnif.in', {
    id: 'usr_pd',
    name: 'Dr. C. P. Sharma',
    email: 'director@iittnif.in',
    organization: 'Directorate, IITTNiF',
    role: 'PROJECT_DIRECTOR',
    stakeholderType: 'Executive Authority',
    phone: '+91 98765 00004',
    location: 'Tirupati, AP',
    status: 'ACTIVE',
    filesCount: applications.filter(a => a.approvalAuthority === 'pd').length
  });

  allUsersMap.set('ops@iittnif.in', {
    id: 'usr_ops',
    name: 'Vikram Malhotra',
    email: 'ops@iittnif.in',
    organization: 'IITTNiF Operations & Screening Cell',
    role: 'OPERATIONS',
    stakeholderType: 'Operations Lead',
    phone: '+91 98765 00001',
    location: 'Tirupati, AP',
    status: 'ACTIVE',
    filesCount: applications.filter(a => a.status === 'pending_screening').length
  });

  // Extract from real applications
  applications.forEach(app => {
    if (app.email) {
      const emailLower = app.email.toLowerCase();
      const existing = allUsersMap.get(emailLower);
      allUsersMap.set(emailLower, {
        id: app.userId || `usr_${Math.random().toString(36).substr(2, 9)}`,
        name: app.contactPerson || app.applicantName || app.name || 'Registered Applicant',
        email: app.email,
        organization: app.organization || 'Registered Entity',
        role: existing?.role || 'APPLICANT',
        stakeholderType: app.stakeholderType || 'Startup',
        phone: app.phone || '+91 98765 43210',
        location: app.location || 'India',
        status: app.status === 'rejected' ? 'INACTIVE' : 'ACTIVE',
        filesCount: (existing?.filesCount || 0) + 1,
        latestFile: app.fileNumber,
        assignedVertical: app.assignedVertical
      });
    }
  });

  const registeredUsersList = Array.from(allUsersMap.values());

  const filteredUsers = registeredUsersList.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.organization.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(userSearchQuery.toLowerCase());
    
    if (userTypeFilter === 'ALL') return matchesSearch;
    if (userTypeFilter === 'STAFF') return matchesSearch && ['ADMIN', 'OPERATIONS', 'PROJECT_DIRECTOR', 'PILLAR_LEAD'].includes(user.role);
    if (userTypeFilter === 'APPLICANTS') return matchesSearch && user.role === 'APPLICANT';
    return matchesSearch && user.stakeholderType.toUpperCase().includes(userTypeFilter.toUpperCase());
  });

  // KPI Calculations
  const totalRegistrations = applications.length;
  const pendingScreening = applications.filter(a => a.status === 'pending_screening').length;
  const pendingApproval = applications.filter(a => a.status === 'pending_approval').length;
  const approvedTotal = applications.filter(a => a.status === 'approved').length;
  const strategicTotal = applications.filter(a => a.isStrategic).length;

  // Verticals breakdown
  const verticalCounts = {};
  applications.forEach(a => {
    const v = a.assignedVertical || '6.2 Startups & Business Enablement';
    verticalCounts[v] = (verticalCounts[v] || 0) + 1;
  });

  return (
    <div className="admin-dashboard-container animate-fade-in">
      {/* Top Executive Header Bar */}
      <div className="admin-top-banner">
        <div className="admin-banner-left">
          <div className="admin-shield-icon-wrap">
            <ShieldCheck size={28} className="text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="badge badge-amber font-bold" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                EXECUTIVE APEX CONSOLE
              </span>
              <span className="badge badge-success font-bold" style={{ fontSize: '11px' }}>
                SYSTEM LIVE
              </span>
            </div>
            <h2 className="admin-title">VIKAS Central Administration & Governance Panel</h2>
            <p className="admin-subtitle">
              Single-Window Intake Oversight • Authority Matrix Routing • User Registry & Audit Trail
            </p>
          </div>
        </div>

        <div className="admin-banner-right">
          <button 
            type="button" 
            className="btn-admin-action"
            onClick={onNavigateToAdminRegister}
          >
            <UserPlus size={15} /> Provision Admin Account
          </button>
          <button 
            type="button" 
            className="btn-admin-action-outline"
            onClick={() => onNavigateToTab('flow')}
          >
            <Activity size={15} /> View System Flow
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="admin-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Total Applications</span>
            <div className="kpi-icon-wrap bg-amber-500-10 text-amber-500">
              <FileText size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{totalRegistrations}</h3>
            <span className="badge badge-info font-bold">100% Logged</span>
          </div>
          <span className="kpi-subtext">{strategicTotal} Strategic National Mission Files</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Pending Screening</span>
            <div className="kpi-icon-wrap bg-blue-500-10 text-blue-500">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{pendingScreening}</h3>
            {pendingScreening > 0 ? (
              <span className="badge badge-warning font-bold animate-pulse">Action Required</span>
            ) : (
              <span className="badge badge-success font-bold">Queue Clear</span>
            )}
          </div>
          <span className="kpi-subtext">Operations Verification Stage</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Pending Authority Sign-Off</span>
            <div className="kpi-icon-wrap bg-rose-500-10 text-rose-500">
              <Key size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{pendingApproval}</h3>
            {pendingApproval > 0 ? (
              <span className="badge badge-danger font-bold animate-pulse">Apex Sign-Off</span>
            ) : (
              <span className="badge badge-success font-bold">All Authorized</span>
            )}
          </div>
          <span className="kpi-subtext">Pillar Lead & PD Delegated Matrix</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Enrolled & Approved</span>
            <div className="kpi-icon-wrap bg-emerald-500-10 text-emerald-500">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{approvedTotal}</h3>
            <span className="badge badge-success font-bold">Active Enrolled</span>
          </div>
          <span className="kpi-subtext">Distributed across 9 Verticals</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Total Registered Users</span>
            <div className="kpi-icon-wrap bg-purple-500-10 text-purple-500">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{registeredUsersList.length}</h3>
            <span className="badge badge-amber font-bold">Registry Live</span>
          </div>
          <span className="kpi-subtext">Stakeholders, Mentors & Officers</span>
        </div>
      </div>

      {/* Admin Sub-Tab Navigation Bar */}
      <div className="admin-subtab-bar">
        <button 
          type="button" 
          className={`admin-subtab-btn ${activeAdminSubTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveAdminSubTab('overview')}
        >
          <BarChart3 size={16} /> Overview & Analytics
        </button>
        <button 
          type="button" 
          className={`admin-subtab-btn ${activeAdminSubTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveAdminSubTab('users')}
        >
          <Users size={16} /> User & Stakeholder Registry ({registeredUsersList.length})
        </button>
        <button 
          type="button" 
          className={`admin-subtab-btn ${activeAdminSubTab === 'screening' ? 'active' : ''}`}
          onClick={() => setActiveAdminSubTab('screening')}
        >
          <Clock size={16} /> Screening Queue {pendingScreening > 0 && <span className="subtab-count badge-warning">{pendingScreening}</span>}
        </button>
        <button 
          type="button" 
          className={`admin-subtab-btn ${activeAdminSubTab === 'approval' ? 'active' : ''}`}
          onClick={() => setActiveAdminSubTab('approval')}
        >
          <ShieldCheck size={16} /> Authority Matrix & E-Sign {pendingApproval > 0 && <span className="subtab-count badge-danger">{pendingApproval}</span>}
        </button>
        <button 
          type="button" 
          className={`admin-subtab-btn ${activeAdminSubTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveAdminSubTab('audit')}
        >
          <History size={16} /> System Audit Trail
        </button>
      </div>

      {/* SUB-TAB 1: OVERVIEW & ANALYTICS */}
      {activeAdminSubTab === 'overview' && (
        <div className="admin-tab-pane animate-fade-in">
          <div className="grid grid-cols-2 gap-5">
            {/* Verticals Distribution */}
            <div className="card admin-content-card">
              <div className="card-header-row">
                <h4 className="card-title flex items-center gap-2">
                  <Layers size={18} className="text-amber-500" /> Verticals Portfolio Breakdown
                </h4>
                <span className="badge badge-secondary">9 Verticals Active</span>
              </div>

              <div className="verticals-distribution-list">
                {Object.entries(verticalCounts).map(([vert, count], idx) => (
                  <div key={idx} className="vert-dist-row">
                    <div className="vert-dist-info">
                      <span className="vert-name font-bold">{vert}</span>
                      <span className="vert-count font-mono">{count} File{count > 1 ? 's' : ''}</span>
                    </div>
                    <div className="vert-progress-bar">
                      <div 
                        className="vert-progress-fill" 
                        style={{ width: `${Math.min(100, (count / Math.max(1, totalRegistrations)) * 100)}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Authority Matrix Compliance & Quick Stats */}
            <div className="card admin-content-card">
              <div className="card-header-row">
                <h4 className="card-title flex items-center gap-2">
                  <Shield size={18} className="text-emerald-500" /> Governance & Authority SOP
                </h4>
                <span className="badge badge-success">SOP 7.2 Compliant</span>
              </div>

              <div className="authority-summary-box">
                <div className="authority-item">
                  <span className="auth-lbl">Screening Authority:</span>
                  <span className="auth-val">Operations & Screening Officer (SOP 3.1)</span>
                </div>
                <div className="authority-item">
                  <span className="auth-lbl">Delegated Pillar Sign-off:</span>
                  <span className="auth-val">Assigned Pillar Lead (Startups, Tech Dev, etc.)</span>
                </div>
                <div className="authority-item">
                  <span className="auth-lbl">Apex Strategic Sign-off:</span>
                  <span className="auth-val">Project Director (PD) with Digital E-Sign</span>
                </div>
                <div className="authority-item">
                  <span className="auth-lbl">Audit Protocol:</span>
                  <span className="auth-val">Immutable tamper-evident transaction log</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs text-slate-500">Need to inspect recent filings?</span>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  style={{ fontSize: '12px', padding: '6px 14px' }}
                  onClick={() => setActiveAdminSubTab('screening')}
                >
                  Open Screening Queue →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: USER & STAKEHOLDER REGISTRY */}
      {activeAdminSubTab === 'users' && (
        <div className="admin-tab-pane animate-fade-in">
          <div className="card admin-content-card">
            <div className="user-registry-controls">
              <div className="search-input-wrap flex-1">
                <Search size={16} className="search-icon-inside" />
                <input 
                  type="text"
                  className="form-control font-medium"
                  placeholder="Search user by name, email, organization, or system role..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                />
              </div>

              <div className="filter-pill-group">
                <button 
                  type="button" 
                  className={`filter-pill ${userTypeFilter === 'ALL' ? 'active' : ''}`}
                  onClick={() => setUserTypeFilter('ALL')}
                >
                  All ({registeredUsersList.length})
                </button>
                <button 
                  type="button" 
                  className={`filter-pill ${userTypeFilter === 'STAFF' ? 'active' : ''}`}
                  onClick={() => setUserTypeFilter('STAFF')}
                >
                  Officers & Staff
                </button>
                <button 
                  type="button" 
                  className={`filter-pill ${userTypeFilter === 'STARTUP' ? 'active' : ''}`}
                  onClick={() => setUserTypeFilter('STARTUP')}
                >
                  Startups
                </button>
                <button 
                  type="button" 
                  className={`filter-pill ${userTypeFilter === 'APPLICANTS' ? 'active' : ''}`}
                  onClick={() => setUserTypeFilter('APPLICANTS')}
                >
                  Applicants
                </button>
              </div>
            </div>

            <div className="table-container mt-4">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>User & Identity</th>
                    <th>Organization</th>
                    <th>Stakeholder Track</th>
                    <th>System Role</th>
                    <th>Contact Phone</th>
                    <th>Applications</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={i}>
                      <td>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{u.name}</span>
                          <span className="text-xs font-mono text-slate-500">{u.email}</span>
                        </div>
                      </td>
                      <td>
                        <span className="font-medium text-slate-800">{u.organization}</span>
                        <span className="text-xs text-slate-400 block">{u.location}</span>
                      </td>
                      <td>
                        <span className="badge badge-info font-bold">{u.stakeholderType}</span>
                      </td>
                      <td>
                        <span className={`badge font-bold ${
                          u.role === 'ADMIN' ? 'badge-danger' :
                          u.role === 'PROJECT_DIRECTOR' ? 'badge-warning' :
                          u.role === 'OPERATIONS' ? 'badge-info' : 'badge-secondary'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="font-mono text-xs text-slate-600">{u.phone}</td>
                      <td>
                        <span className="badge badge-amber font-mono font-bold">{u.filesCount} File(s)</span>
                      </td>
                      <td>
                        <span className={`badge ${u.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: SCREENING MASTER QUEUE */}
      {activeAdminSubTab === 'screening' && (
        <div className="admin-tab-pane animate-fade-in">
          <ScreeningQueue 
            currentRole={ROLES.ADMIN} 
            applications={applications} 
            onRouteApplication={onRouteApplication} 
          />
        </div>
      )}

      {/* SUB-TAB 4: AUTHORITY MATRIX & E-SIGN */}
      {activeAdminSubTab === 'approval' && (
        <div className="admin-tab-pane animate-fade-in">
          <ApprovalPanel 
            currentRole={ROLES.ADMIN} 
            applications={applications} 
            onApproveApplication={onApproveApplication}
            onRejectApplication={onRejectApplication}
          />
        </div>
      )}

      {/* SUB-TAB 5: SYSTEM AUDIT TRAIL */}
      {activeAdminSubTab === 'audit' && (
        <div className="admin-tab-pane animate-fade-in">
          <AuditLogs applications={applications} />
        </div>
      )}

      <style>{`
        .admin-dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-top-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          flex-wrap: wrap;
          gap: 16px;
        }

        .admin-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .admin-shield-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(217, 119, 6, 0.12);
          border: 1px solid rgba(217, 119, 6, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .admin-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 4px 0 2px 0;
          letter-spacing: -0.3px;
        }

        .admin-subtitle {
          font-size: 12.5px;
          color: #64748b;
          margin: 0;
        }

        .admin-banner-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-admin-action {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25);
        }

        .btn-admin-action:hover {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          transform: translateY(-1px);
        }

        .btn-admin-action-outline {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          background: #f8fafc;
          color: #334155;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-admin-action-outline:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        /* KPI Grid */
        .admin-kpi-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }

        @media (max-width: 1200px) {
          .admin-kpi-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-kpi-grid {
            grid-template-columns: 1fr;
          }
        }

        .kpi-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }

        .kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
          border-color: #cbd5e1;
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .kpi-label {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .kpi-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-amber-500-10 { background: rgba(217, 119, 6, 0.1); }
        .bg-blue-500-10 { background: rgba(59, 130, 246, 0.1); }
        .bg-rose-500-10 { background: rgba(244, 63, 94, 0.1); }
        .bg-emerald-500-10 { background: rgba(16, 185, 129, 0.1); }
        .bg-purple-500-10 { background: rgba(139, 92, 246, 0.1); }

        .kpi-value-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-top: 2px;
        }

        .kpi-value {
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          font-family: 'Outfit', sans-serif;
        }

        .kpi-subtext {
          font-size: 11.5px;
          color: #94a3b8;
        }

        /* SubTab Bar */
        .admin-subtab-bar {
          display: flex;
          gap: 8px;
          background: #f8fafc;
          padding: 6px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow-x: auto;
        }

        .admin-subtab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .admin-subtab-btn:hover:not(.active) {
          background: #f1f5f9;
          color: #0f172a;
        }

        .admin-subtab-btn.active {
          background: #ffffff;
          color: #b45309;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
        }

        .subtab-count {
          font-size: 10.5px;
          padding: 2px 6px;
          border-radius: 9999px;
        }

        /* Content Card */
        .admin-content-card {
          padding: 22px;
          background: #ffffff;
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        /* Verticals Distribution */
        .verticals-distribution-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .vert-dist-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .vert-dist-info {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .vert-name {
          color: #334155;
        }

        .vert-count {
          color: #b45309;
          font-weight: 700;
        }

        .vert-progress-bar {
          width: 100%;
          height: 8px;
          background: #f1f5f9;
          border-radius: 9999px;
          overflow: hidden;
        }

        .vert-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b, #d97706);
          border-radius: 9999px;
        }

        /* Authority summary box */
        .authority-summary-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
        }

        .authority-item {
          display: flex;
          flex-direction: column;
          font-size: 12px;
        }

        .auth-lbl {
          font-weight: 700;
          color: #64748b;
        }

        .auth-val {
          color: #0f172a;
          font-weight: 600;
        }

        /* User registry controls */
        .user-registry-controls {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon-inside {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }

        .filter-pill-group {
          display: flex;
          gap: 6px;
        }

        .filter-pill {
          padding: 7px 14px;
          border-radius: 9999px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .filter-pill:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .filter-pill.active {
          background: #d97706;
          border-color: #d97706;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
