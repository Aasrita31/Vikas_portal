import React, { useState, useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle, X, Award, FileText } from 'lucide-react';
import Header from './components/Header';
import Dashboard from './features/monitoring/Dashboard';
import OnboardingForm from './features/entry/OnboardingForm';
import ScreeningQueue from './features/screening/ScreeningQueue';
import ApprovalPanel from './features/approval/ApprovalPanel';
import EngagementsList from './features/engagement/EngagementsList';
import AuditLogs from './features/audit/AuditLogs';
import VikasFlow from './features/flow/VikasFlow';

export default function App() {
  const [activeTab, setActiveTab] = useState('entry'); // Default to Step 1: Entry & Data Capture
  const [featureSubTab, setFeatureSubTab] = useState('onboard'); // Sub navigation within features: onboard, screening, approval, audit
  const [currentRole, setCurrentRole] = useState('pd'); // Initialize to PD for full preview access
  const [overviewKey, setOverviewKey] = useState(0);

  // System Notifications State (Loaded from localStorage or empty)
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('VIKAS_NOTIFICATIONS');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.filter(n => 
          !n.message?.includes('Priya Nair') && 
          !n.message?.includes('Quantum-Shield') &&
          !n.message?.includes('AeroSpatial')
        );
      }
    } catch (e) {}
    return [];
  });

  // Floating Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success', fileNumber = null) => {
    setToast({ id: Date.now(), title, message, type, fileNumber });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Persist notifications to localStorage
  useEffect(() => {
    localStorage.setItem('VIKAS_NOTIFICATIONS', JSON.stringify(notifications));
  }, [notifications]);

  const handleClearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('VIKAS_NOTIFICATIONS');
  };

  const handleNotificationClick = (notif) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    if (notif.tab) {
      handleTabChange(notif.tab);
    }
  };

  const handleTabChange = (tabId) => {
    if (tabId === 'overview' || tabId === 'engagement') {
      window.history.pushState({}, '', '/');
      setOverviewKey(prev => prev + 1);
    }
    setActiveTab(tabId);
  };

  // Applications State: Only stores and displays real registrations from user submissions
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('VIKAS_ONBOARDING_APPLICATIONS');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Exclude legacy mock templates
        const realOnly = parsed.filter(a => 
          !['AeroSpatial Drone Systems', 'PNT Precision Receiver Prototype', 'Strategic alliance with ISRO Geo-Spatial Center', 'Dr. Priya Nair - Postdoctoral Fellow Recruitment', 'Quantum-Shield Cybersecurity', 'VidyaGIS Teacher Upskilling - Tirupati Region'].includes(a.name) &&
          a.contactPerson !== 'Dr. Priya Nair' &&
          a.contactPerson !== 'Dr. R. Raman'
        );
        return realOnly;
      }
    } catch (e) {}
    return [];
  });

  // Persist all user registrations across page reloads
  useEffect(() => {
    localStorage.setItem('VIKAS_ONBOARDING_APPLICATIONS', JSON.stringify(applications));
  }, [applications]);

  // Operations Handlers
  const handleAddNewApplication = (newApp) => {
    setApplications(prev => [newApp, ...prev]);

    const newNotif = {
      id: Date.now(),
      type: 'info',
      title: 'New Stakeholder Onboarded',
      message: `Registration for ${newApp.name} (${newApp.fileNumber}) submitted. Awaiting Operations screening.`,
      fileNumber: newApp.fileNumber,
      timestamp: 'Just now',
      read: false,
      tab: 'screening'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(
      'Registration Successfully Logged',
      `File ${newApp.fileNumber} has been logged in registry and queued for screening.`,
      'info',
      newApp.fileNumber
    );
  };

  const handleRouteApplication = (fileNumber, updates) => {
    let routedApp = null;
    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        routedApp = { ...app, ...updates };
        return routedApp;
      }
      return app;
    }));

    const isDirectApproval = updates.status === 'approved';
    const newNotif = {
      id: Date.now(),
      type: isDirectApproval ? 'approval_success' : 'routed',
      title: isDirectApproval ? 'File Directly Approved & Enrolled' : 'File Routed for Authorization',
      message: isDirectApproval 
        ? `File ${fileNumber} (${routedApp?.name || 'Entity'}) approved and assigned to ${updates.assignedVertical || 'Vertical'}.`
        : `File ${fileNumber} (${routedApp?.name || 'Entity'}) routed to ${updates.approvalAuthority === 'pd' ? 'Project Director (PD)' : 'Pillar Lead'} for sign-off.`,
      fileNumber: fileNumber,
      timestamp: 'Just now',
      read: false,
      tab: isDirectApproval ? 'overview' : 'approval'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(
      isDirectApproval ? 'File Approved & Enrolled' : 'File Screened & Routed',
      isDirectApproval 
        ? `File ${fileNumber} is enrolled in ${updates.assignedVertical} vertical.`
        : `File ${fileNumber} forwarded for ${updates.approvalAuthority === 'pd' ? 'PD' : 'Pillar Lead'} authorization.`,
      isDirectApproval ? 'success' : 'info',
      fileNumber
    );

    if (isDirectApproval) {
      setActiveTab('overview');
    } else {
      setActiveTab('approval');
    }
  };

  const handleApproveApplication = (fileNumber, updates) => {
    let approvedApp = null;
    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        approvedApp = { ...app, ...updates };
        return approvedApp;
      }
      return app;
    }));

    const officerTitle = currentRole === 'pd' ? 'Project Director' : 'Pillar Lead';
    const signer = updates.eSignature ? `${officerTitle} (${updates.eSignature})` : officerTitle;

    // Add to Notification Center
    const newNotif = {
      id: Date.now(),
      type: 'approval_success',
      title: 'File Digitally Authorized & Signed',
      message: `File ${fileNumber} (${approvedApp?.name || 'Entity'}) has been authorized by ${signer} and enrolled into the ${approvedApp?.assignedVertical || 'assigned'} vertical.`,
      fileNumber: fileNumber,
      timestamp: 'Just now',
      read: false,
      tab: 'overview'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Trigger Floating Toast Banner
    showToast(
      'Authorization & E-Sign Complete!',
      `File ${fileNumber} (${approvedApp?.name || 'Record'}) is now officially authorized and enrolled in the ${approvedApp?.assignedVertical || 'Vertical'} vertical.`,
      'success',
      fileNumber
    );

    setActiveTab('overview');
  };

  const handleRejectApplication = (fileNumber, updates) => {
    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        return { ...app, ...updates, status: 'pending_screening' };
      }
      return app;
    }));

    const newNotif = {
      id: Date.now(),
      type: 'info',
      title: 'File Sent Back to Screening',
      message: `File ${fileNumber} returned to operations queue with revision remarks.`,
      fileNumber: fileNumber,
      timestamp: 'Just now',
      read: false,
      tab: 'screening'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(
      'File Returned to Screening',
      `File ${fileNumber} was sent back with remarks.`,
      'warning',
      fileNumber
    );

    setActiveTab('screening');
  };

  // Navigation handlers
  const handleNavigateFromDashboard = (targetTab) => {
    if (targetTab === 'audit') {
      setActiveTab('features');
      setFeatureSubTab('audit');
    } else {
      setActiveTab(targetTab);
    }
  };

  // Badges Calculation
  const pendingScreeningCount = applications.filter(app => app.status === 'pending_screening').length;
  const pendingApprovalCount = applications.filter(app => {
    if (app.status !== 'pending_approval') return false;
    if (currentRole === 'pd') return true;
    if (currentRole === 'pillar_lead') return app.approvalAuthority === 'pillar_lead';
    return false;
  }).length;

  const pendingTotalCount = pendingScreeningCount + pendingApprovalCount;

  const renderActiveMainTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <EngagementsList 
            key={`overview-${overviewKey}`}
            applications={applications} 
            onNavigateToTab={(tab) => handleTabChange(tab)} 
            onAddApplication={handleAddNewApplication}
          />
        );
      case 'entry':
        return <OnboardingForm onSubmitApplication={handleAddNewApplication} />;
      case 'screening':
        return (
          <ScreeningQueue 
            currentRole={currentRole} 
            applications={applications} 
            onRouteApplication={handleRouteApplication} 
          />
        );
      case 'approval':
        return (
          <ApprovalPanel 
            currentRole={currentRole} 
            applications={applications} 
            onApproveApplication={handleApproveApplication}
            onRejectApplication={handleRejectApplication}
          />
        );
      case 'engagement':
        return <EngagementsList key={`engagement-${overviewKey}`} applications={applications} onNavigateToTab={(tab) => handleTabChange(tab)} />;
      case 'tracking':
        return <Dashboard applications={applications} onNavigateToTab={(tab) => handleTabChange(tab)} />;
      case 'flow':
        return <VikasFlow />;
      default:
        return <EngagementsList key={`default-${overviewKey}`} applications={applications} onNavigateToTab={(tab) => handleTabChange(tab)} />;
    }
  };

  // Secondary sub-tab rendering inside Content Body when "Features" is selected
  const renderFeaturesLayout = () => {
    const subTabs = [
      { id: 'onboard', label: 'Onboard Stakeholder', badge: null },
      { id: 'screening', label: 'Screening Queue', badge: pendingScreeningCount },
      { id: 'approval', label: 'Approval Matrix', badge: pendingApprovalCount },
      { id: 'audit', label: 'Audit Logs', badge: null }
    ];

    const renderFeatureComponent = () => {
      switch (featureSubTab) {
        case 'onboard':
          return <OnboardingForm onSubmitApplication={handleAddNewApplication} />;
        case 'screening':
          return (
            <ScreeningQueue 
              currentRole={currentRole} 
              applications={applications} 
              onRouteApplication={handleRouteApplication} 
            />
          );
        case 'approval':
          return (
            <ApprovalPanel 
              currentRole={currentRole} 
              applications={applications} 
              onApproveApplication={handleApproveApplication}
              onRejectApplication={handleRejectApplication}
            />
          );
        case 'audit':
          return <AuditLogs applications={applications} />;
        default:
          return <OnboardingForm onSubmitApplication={handleAddNewApplication} />;
      }
    };

    return (
      <div className="features-layout-wrap animate-fade-in">
        {/* Sub-tab Navigation Bar */}
        <div className="features-subnav-card card">
          <div className="subnav-container">
            {subTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFeatureSubTab(tab.id)}
                className={`subnav-btn ${featureSubTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
                {tab.badge > 0 && (
                  <span className={`subnav-badge ${tab.id === 'approval' ? 'badge-danger' : 'badge-warning'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Sub Tab Content */}
        <div className="feature-subcontent mt-24">
          {renderFeatureComponent()}
        </div>

        <style>{`
          .features-subnav-card {
            padding: 8px 16px;
            border-radius: var(--radius-md);
            margin-bottom: 24px;
          }

          .subnav-container {
            display: flex;
            align-items: center;
            gap: 12px;
            overflow-x: auto;
          }

          .subnav-btn {
            background: transparent;
            border: none;
            color: var(--text-secondary);
            padding: 8px 16px;
            font-family: 'Outfit', sans-serif;
            font-size: 13px;
            font-weight: 600;
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: all var(--transition-fast);
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }

          .subnav-btn:hover {
            color: var(--text-primary);
            background-color: var(--bg-primary);
          }

          .subnav-btn.active {
            color: var(--color-accent);
            background-color: var(--color-accent-glow);
          }

          .subnav-badge {
            font-size: 10px;
            font-weight: 700;
            padding: 1px 6px;
            border-radius: var(--radius-full);
          }

          .mt-24 {
            margin-top: 24px;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <Header 
          currentRole={currentRole} 
          setCurrentRole={setCurrentRole} 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
          pendingTotalCount={pendingTotalCount}
          pendingScreeningCount={pendingScreeningCount}
          pendingApprovalCount={pendingApprovalCount}
          notifications={notifications}
          onClearNotifications={handleClearNotifications}
          onNotificationClick={handleNotificationClick}
        />

        {/* Floating Toast Notification Banner */}
        {toast && (
          <div className={`floating-toast-alert animate-slide-down ${toast.type || 'success'}`}>
            <div className="toast-icon-wrap">
              {toast.type === 'success' ? (
                <CheckCircle2 size={20} className="toast-icon-success" />
              ) : toast.type === 'warning' ? (
                <AlertTriangle size={20} className="toast-icon-warning" />
              ) : (
                <Info size={20} className="toast-icon-info" />
              )}
            </div>

            <div className="toast-body">
              <div className="toast-header-row">
                <span className="toast-title">{toast.title}</span>
                {toast.fileNumber && (
                  <span className="toast-file-badge font-mono">{toast.fileNumber}</span>
                )}
              </div>
              <p className="toast-message">{toast.message}</p>
            </div>

            <button 
              className="btn-toast-dismiss" 
              onClick={() => setToast(null)}
              title="Dismiss notification"
            >
              <X size={15} />
            </button>
          </div>
        )}

        <div className="content-body">
          {renderActiveMainTab()}
        </div>

        <style>{`
          .floating-toast-alert {
            position: fixed;
            top: 24px;
            right: 28px;
            z-index: 9999;
            min-width: 340px;
            max-width: 440px;
            padding: 14px 16px;
            border-radius: var(--radius-md);
            background: #ffffff;
            border: 1px solid #10b981;
            box-shadow: 0 12px 32px rgba(16, 185, 129, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08);
            display: flex;
            align-items: flex-start;
            gap: 12px;
            animation: toastSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .floating-toast-alert.warning {
            border-color: #f59e0b;
            box-shadow: 0 12px 32px rgba(245, 158, 11, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08);
          }

          .floating-toast-alert.info {
            border-color: #0284c7;
            box-shadow: 0 12px 32px rgba(2, 132, 199, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08);
          }

          @keyframes toastSlideDown {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .toast-icon-wrap {
            flex-shrink: 0;
            margin-top: 1px;
          }

          .toast-icon-success {
            color: #10b981;
          }

          .toast-icon-warning {
            color: #f59e0b;
          }

          .toast-icon-info {
            color: #0284c7;
          }

          .toast-body {
            flex: 1;
          }

          .toast-header-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 4px;
          }

          .toast-title {
            font-size: 13.5px;
            font-weight: 700;
            color: #111827;
          }

          .toast-file-badge {
            font-size: 10px;
            font-weight: 700;
            background-color: #f3f4f6;
            color: #374151;
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
          }

          .toast-message {
            font-size: 12px;
            color: #4b5563;
            line-height: 1.4;
            margin: 0;
          }

          .btn-toast-dismiss {
            background: transparent;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: all 0.15s ease;
          }

          .btn-toast-dismiss:hover {
            color: #111827;
            background-color: #f3f4f6;
          }
        `}</style>
      </main>
    </div>
  );
}
