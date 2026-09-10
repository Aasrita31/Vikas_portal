import React, { useState, useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle, X, Award, FileText } from 'lucide-react';
import { AuthProvider, useAuth, ROLES } from './context/AuthContext';
import Header from './components/Header';
import Dashboard from './features/monitoring/Dashboard';
import OnboardingForm from './features/entry/OnboardingForm';
import ApplicantMyApplications from './features/entry/ApplicantMyApplications';
import LoginPage from './features/auth/LoginPage';
import ScreeningQueue from './features/screening/ScreeningQueue';
import ApprovalPanel from './features/approval/ApprovalPanel';
import EngagementsList from './features/engagement/EngagementsList';
import AuditLogs from './features/audit/AuditLogs';
import VikasFlow from './features/flow/VikasFlow';
import { 
  NOTIFICATION_EVENTS, 
  createNotification, 
  SEED_NOTIFICATIONS 
} from './services/notificationService';

const INITIAL_SEED_APPLICATIONS = [
  {
    fileNumber: 'IITTNIF-2026-007',
    userId: 'usr_app_aasrita_reddy',
    name: 'NavIC Dual-Band Embedded Sensor Subsystem',
    applicantName: 'Aasrita Reddy',
    contactPerson: 'Aasrita Reddy',
    email: 'aasritareddy.c@gmail.com',
    organization: 'IITTNiF',
    location: 'Tirupati',
    phone: '9493562799',
    stakeholderType: 'Startup',
    domains: ['PNT / NavIC / GNSS', 'IoT / Sensor Fusion'],
    status: 'pending_screening',
    submissionDate: '08/09/2026',
    description: 'Indigenous low-power NavIC L5/S-band embedded tracking receiver prototype for spatial mapping and asset telemetry.',
    isStrategic: false,
    history: [
      {
        date: '08/09/2026, 11:30:00',
        action: 'File Created & Onboarded',
        user: 'Aasrita Reddy (Applicant)',
        details: 'Registered as STARTUP under PNT / NavIC / GNSS. Awaiting initial operations screening.'
      }
    ]
  },
  {
    fileNumber: 'IITTNIF-2026-001',
    userId: 'usr_app_startup',
    name: 'AeroNav Autonomous Drone Swarm for Agricultural Mapping',
    applicantName: 'Vikram Sharma',
    contactPerson: 'Vikram Sharma',
    email: 'startup@vikas.in',
    organization: 'AeroGeo Robotics Pvt Ltd',
    phone: '+91 98765 43210',
    stakeholderType: 'Startup',
    domains: ['PNT / NavIC / GNSS', 'Geo-Intelligence'],
    status: 'pending_screening',
    submissionDate: '02/09/2026',
    description: 'Indigenous UAV platform integrating dual-frequency NavIC receivers for cadastral survey.',
    isStrategic: false,
    history: [
      {
        date: '02/09/2026, 10:30:00',
        action: 'File Created & Onboarded',
        user: 'Vikram Sharma (Applicant)',
        details: 'Application submitted for Technology Development & Incubation.'
      }
    ]
  },
  {
    fileNumber: 'IITTNIF-2026-002',
    name: 'Sub-GHz NavIC Ground Receiver Node Prototype',
    applicantName: 'Vikram Sharma',
    contactPerson: 'Vikram Sharma',
    email: 'startup@vikas.in',
    organization: 'AeroGeo Robotics Pvt Ltd',
    phone: '+91 98765 43210',
    stakeholderType: 'Startup',
    domains: ['Embedded Systems', 'IoT / Sensor Fusion'],
    status: 'pending_approval',
    approvalAuthority: 'pillar_lead',
    assignedVertical: 'Startups & Business Enablement',
    submissionDate: '28/08/2026',
    description: 'Compact ground receiver node for real-time asset telemetry.',
    isStrategic: false,
    history: [
      {
        date: '28/08/2026, 11:00:00',
        action: 'File Created & Onboarded',
        user: 'Vikram Sharma (Applicant)',
        details: 'Initial registration submitted.'
      },
      {
        date: '29/08/2026, 14:15:00',
        action: 'Screening Completed & Routed',
        user: 'Operations Officer',
        details: 'Verified completeness. Routed to Pillar Lead for authorization.'
      }
    ]
  },
  {
    fileNumber: 'IITTNIF-2026-003',
    name: 'Edge AI Vision Module for Precision Robotic Agriculture',
    applicantName: 'Aarav Patel',
    contactPerson: 'Aarav Patel',
    email: 'student@vikas.in',
    organization: 'IIT Tirupati Research Lab',
    phone: '+91 91234 56789',
    stakeholderType: 'Student / Researcher',
    domains: ['Computer Vision / GeoAI', 'Digital Twin'],
    status: 'approved',
    approvalAuthority: 'pillar_lead',
    assignedVertical: 'Academic Collaborations',
    submissionDate: '15/08/2026',
    eSignature: 'Dr. K. S. Rao (Pillar Lead)',
    description: 'Low-latency edge AI model for crop disease classification using spectral imaging.',
    isStrategic: false,
    history: [
      {
        date: '15/08/2026, 09:30:00',
        action: 'File Created & Onboarded',
        user: 'Aarav Patel (Applicant)',
        details: 'Proposal submitted for research grant.'
      },
      {
        date: '18/08/2026, 16:00:00',
        action: 'Authorized & E-Signed',
        user: 'Pillar Lead',
        details: 'Formal approval granted. Enrolled into Academic Collaborations vertical.'
      }
    ]
  },
  {
    fileNumber: 'IITTNIF-2026-004',
    name: 'National Geospatial Intelligence Data Integration Initiative',
    applicantName: 'Dr. Rajesh Varma',
    contactPerson: 'Dr. Rajesh Varma',
    email: 'rajesh@isro.gov.in',
    organization: 'National Remote Sensing Centre (NRSC)',
    phone: '+91 94444 12345',
    stakeholderType: 'Government',
    domains: ['Spatial Intelligence', 'Geo-Intelligence'],
    status: 'pending_approval',
    approvalAuthority: 'pd',
    assignedVertical: 'Strategic Alliances & National Missions',
    submissionDate: '01/09/2026',
    description: 'Strategic data gateway linking regional NM-ICPS hubs with national geospatial repository.',
    isStrategic: true,
    history: [
      {
        date: '01/09/2026, 14:00:00',
        action: 'File Created & Onboarded',
        user: 'Dr. Rajesh Varma (Govt Lead)',
        details: 'Strategic memorandum proposal submitted.'
      },
      {
        date: '02/09/2026, 11:30:00',
        action: 'Operations Verified & Escalate',
        user: 'Operations Officer',
        details: 'Marked as high-impact strategic file. Forwarded to Project Director for executive sign-off.'
      }
    ]
  },
  {
    fileNumber: 'IITTNIF-2026-005',
    name: 'NavIC-Precision RTK Localization Unit for Precision Farming',
    applicantName: 'Vikram Sharma',
    contactPerson: 'Vikram Sharma',
    email: 'startup@vikas.in',
    organization: 'AeroGeo Robotics Pvt Ltd',
    phone: '+91 98765 43210',
    stakeholderType: 'Startup',
    domains: ['PNT / NavIC / GNSS', 'IoT / Sensor Fusion'],
    status: 'approved',
    approvalAuthority: 'pd',
    assignedVertical: '6.2 Startups & Business Enablement',
    submissionDate: '10/08/2026',
    approvalDate: '24/08/2026',
    lastUpdated: '24/08/2026, 17:30:00',
    eSignature: 'Dr. Roshan K. Srivastav (Project Director, IITTNiF)',
    description: 'Centimeter-accurate dual-band NavIC/GPS RTK ground sensor node designed for autonomous tractor guidance and drone boundary surveying.',
    isStrategic: false,
    history: [
      {
        date: '10/08/2026, 11:15:00',
        action: 'File Created & Onboarded',
        user: 'Vikram Sharma (Applicant)',
        details: 'Initial proposal submitted for Startup Ecosystem Onboarding.'
      },
      {
        date: '12/08/2026, 14:20:00',
        action: 'Screening Completed & Routed',
        user: 'Operations Officer',
        details: 'Technical parameters verified. Routed to Startups Pillar Lead.'
      },
      {
        date: '24/08/2026, 17:30:00',
        action: 'Formally Authorized & E-Signed',
        user: 'Dr. Roshan K. Srivastav (Project Director)',
        details: 'Approved for formal onboarding into Vertical 6.2 (Startups & Business Enablement).'
      }
    ]
  },
  {
    fileNumber: 'IITTNIF-2026-006',
    name: 'Consumer Social Messaging App for Campus Students',
    applicantName: 'Vikram Sharma',
    contactPerson: 'Vikram Sharma',
    email: 'startup@vikas.in',
    organization: 'AeroGeo Robotics Pvt Ltd',
    phone: '+91 98765 43210',
    stakeholderType: 'Startup',
    domains: ['Computer Vision / GeoAI'],
    status: 'rejected',
    submissionDate: '01/08/2026',
    rejectionDate: '08/08/2026',
    lastUpdated: '08/08/2026, 15:00:00',
    description: 'Social networking chat mobile application for university students with geo-tagging.',
    isStrategic: false,
    history: [
      {
        date: '01/08/2026, 09:00:00',
        action: 'File Created & Onboarded',
        user: 'Vikram Sharma (Applicant)',
        details: 'Registration logged in portal.'
      },
      {
        date: '08/08/2026, 15:00:00',
        action: 'Application Evaluated — Declined',
        user: 'Operations Secretariat',
        details: 'Proposal does not meet NM-ICPS Cyber-Physical Systems mandate.'
      }
    ]
  }
];

function AppContent() {
  const { currentRole, currentUser, isAuthenticated, isApplicant, canScreen, canRoute, canApprove, canApproveApplication } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    if (isApplicant) return 'tracking';
    return 'overview';
  });
  const [featureSubTab, setFeatureSubTab] = useState('onboard');
  const [overviewKey, setOverviewKey] = useState(0);

  // Role Guard: If activeTab becomes forbidden when persona changes, redirect safely to applicant dashboard
  useEffect(() => {
    if (isApplicant && (activeTab === 'screening' || activeTab === 'approval')) {
      setActiveTab('tracking');
    }
  }, [currentRole, isApplicant, activeTab]);

  // Sync state and route upon successful login
  const handleUserLoggedIn = (user, loggedInApplications) => {
    if (loggedInApplications && Array.isArray(loggedInApplications) && loggedInApplications.length > 0) {
      setApplications(prev => {
        const existingFileNos = new Set(prev.map(a => a.fileNumber));
        const newItems = loggedInApplications.filter(a => !existingFileNos.has(a.fileNumber));
        return newItems.length > 0 ? [...newItems, ...prev] : prev;
      });
    }
    // Redirect user to the VIKAS Welcome/Introduction page
    executeTabNavigation('overview');
  };

  // System & Applicant Notifications State (seeded with standard workflow events)
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('VIKAS_NOTIFICATIONS');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map(n => n.id));
          const missingSeeds = SEED_NOTIFICATIONS.filter(s => !existingIds.has(s.id));
          if (missingSeeds.length > 0) {
            return [...parsed, ...missingSeeds];
          }
          return parsed;
        }
      }
    } catch (e) {}
    return SEED_NOTIFICATIONS;
  });

  // Toggle single notification read state
  const handleToggleReadNotification = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  // Mark all notifications as read for current user
  const handleMarkAllNotificationsRead = (recipientEmail) => {
    setNotifications(prev => prev.map(n => {
      if (!recipientEmail || (n.recipientEmail && n.recipientEmail.toLowerCase() === recipientEmail.toLowerCase())) {
        return { ...n, read: true };
      }
      return n;
    }));
  };

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

  const executeTabNavigation = (tabId) => {
    if (tabId === 'overview' || tabId === 'engagement') {
      window.history.pushState({}, '', '/');
      setOverviewKey(prev => prev + 1);
    }
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;

    // Strict RBAC Navigation Guard: Applicants cannot enter internal workflow tabs
    if (isApplicant && (tabId === 'screening' || tabId === 'approval')) {
      showToast(
        'Access Denied',
        'External applicants cannot access internal operations screening or approval matrices.',
        'warning'
      );
      return;
    }

    executeTabNavigation(tabId);
  };

  const handleFeatureSubTabChange = (tabId) => {
    if (tabId === featureSubTab) return;

    if (isApplicant && (tabId === 'screening' || tabId === 'approval')) {
      showToast('Access Restricted', 'Internal actions restricted to authorized officers.', 'warning');
      return;
    }

    setFeatureSubTab(tabId);
  };

  // Applications State: seeded with structured records, with auto-merge for demonstration records
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('VIKAS_ONBOARDING_APPLICATIONS');
      if (saved) {
        let parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Backfill userId if missing from legacy storage
          parsed = parsed.map(app => {
            if (app.userId) return app;
            if (app.email?.toLowerCase() === 'aasritareddy.c@gmail.com' || app.fileNumber === 'IITTNIF-2026-007') {
              return { ...app, userId: 'usr_app_aasrita_reddy' };
            }
            if (app.email?.toLowerCase() === 'student@vikas.in') {
              return { ...app, userId: 'usr_app_researcher' };
            }
            return { ...app, userId: 'usr_app_startup' };
          });
          const existingFileNos = new Set(parsed.map(a => a.fileNumber));
          const missingSeeds = INITIAL_SEED_APPLICATIONS.filter(s => !existingFileNos.has(s.fileNumber));
          if (missingSeeds.length > 0) {
            return [...missingSeeds, ...parsed];
          }
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_SEED_APPLICATIONS;
  });

  // Persist all user registrations across page reloads
  useEffect(() => {
    localStorage.setItem('VIKAS_ONBOARDING_APPLICATIONS', JSON.stringify(applications));
  }, [applications]);

  // Operations Handlers
  const handleAddNewApplication = (newApp) => {
    const stampedApp = {
      ...newApp,
      userId: newApp.userId || newApp.user_id || currentUser?.id || `usr_app_${Date.now()}`,
      email: newApp.email || currentUser?.email || '',
      applicantName: newApp.applicantName || newApp.name || newApp.contactPerson || currentUser?.name || 'Registered Applicant',
      contactPerson: newApp.contactPerson || newApp.applicantName || newApp.name || currentUser?.name || 'Registered Applicant',
      organization: newApp.organization || currentUser?.organization || 'Registered Entity',
      phone: newApp.phone || currentUser?.phone || '',
      location: newApp.location || currentUser?.location || '',
      stakeholderType: newApp.stakeholderType || (currentUser?.stakeholderType === 'STARTUP' ? 'Startup' : currentUser?.stakeholderType) || 'Startup',
      assignedVertical: newApp.assignedVertical || (newApp.assignedVerticals ? newApp.assignedVerticals[0] : '6.2 Startups & Business Enablement'),
      assignedVerticals: newApp.assignedVerticals || (newApp.assignedVertical ? [newApp.assignedVertical] : ['6.2 Startups & Business Enablement'])
    };

    setApplications(prev => [stampedApp, ...prev]);

    // Dispatch formal Application Submitted notification
    const newNotif = createNotification({
      event: NOTIFICATION_EVENTS.APPLICATION_SUBMITTED,
      fileNumber: stampedApp.fileNumber,
      recipientEmail: stampedApp.email,
      recipientName: stampedApp.contactPerson,
      type: 'info'
    });
    setNotifications(prev => [newNotif, ...prev]);

    showToast(
      'Registration Successfully Logged',
      `File ${stampedApp.fileNumber} has been logged in registry and queued for screening.`,
      'info',
      stampedApp.fileNumber
    );

    // If applicant, steer directly to My Applications & Status tracker
    if (isApplicant) {
      setActiveTab('tracking');
    }
  };

  const handleRouteApplication = (fileNumber, updates) => {
    // 1. Strict Authority Gate: Screening and routing is restricted to Operations and Admin
    if (!canRoute) {
      showToast(
        'Authority Violation',
        'Only Operations Officers and Administrators are authorized to execute routing and classification.',
        'warning'
      );
      return;
    }

    // 2. Conflict of Interest Gate: Cannot screen or route own application
    const targetApp = applications.find(a => a.fileNumber === fileNumber);
    if (targetApp && currentUser?.email && targetApp.email && targetApp.email.toLowerCase() === currentUser.email.toLowerCase()) {
      showToast(
        'Conflict of Interest',
        'Officers cannot screen or route applications they submitted as an applicant.',
        'warning'
      );
      return;
    }

    let routedApp = null;
    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        routedApp = { ...app, ...updates };
        return routedApp;
      }
      return app;
    }));

    // Handle "Return for Correction" workflow state
    if (updates.status === 'returned_for_correction') {
      const correctionNotif = createNotification({
        event: NOTIFICATION_EVENTS.CORRECTION_REQUESTED,
        fileNumber,
        recipientEmail: routedApp?.email || currentUser?.email,
        recipientName: routedApp?.contactPerson,
        type: 'warning'
      });
      setNotifications(prev => [correctionNotif, ...prev]);

      showToast(
        'Correction Requested',
        `File ${fileNumber} returned for stakeholder revision.`,
        'warning',
        fileNumber
      );
      setActiveTab('screening');
      return;
    }

    const isDirectApproval = updates.status === 'approved';

    if (isDirectApproval) {
      const approvedNotif = createNotification({
        event: NOTIFICATION_EVENTS.APPLICATION_APPROVED,
        fileNumber,
        recipientEmail: routedApp?.email || currentUser?.email,
        recipientName: routedApp?.contactPerson,
        extra: { vertical: updates.assignedVertical },
        type: 'success'
      });
      setNotifications(prev => [approvedNotif, ...prev]);

      showToast(
        'File Approved & Enrolled',
        `File ${fileNumber} is enrolled in ${updates.assignedVertical} vertical.`,
        'success',
        fileNumber
      );
      setActiveTab('overview');
    } else {
      // Dispatch 3 workflow events for the applicant:
      // 1. Screening Completed
      const screenedNotif = createNotification({
        event: NOTIFICATION_EVENTS.SCREENING_COMPLETED,
        fileNumber,
        recipientEmail: routedApp?.email || currentUser?.email,
        recipientName: routedApp?.contactPerson,
        type: 'info'
      });
      // 2. Application Routed to Vertical
      const routedNotif = createNotification({
        event: NOTIFICATION_EVENTS.APPLICATION_ROUTED,
        fileNumber,
        recipientEmail: routedApp?.email || currentUser?.email,
        recipientName: routedApp?.contactPerson,
        extra: { vertical: updates.assignedVertical },
        type: 'info'
      });
      // 3. Approval Pending under Authority Matrix
      const pendingNotif = createNotification({
        event: NOTIFICATION_EVENTS.APPROVAL_PENDING,
        fileNumber,
        recipientEmail: routedApp?.email || currentUser?.email,
        recipientName: routedApp?.contactPerson,
        extra: { authority: updates.approvalAuthority },
        type: 'warning'
      });

      setNotifications(prev => [pendingNotif, routedNotif, screenedNotif, ...prev]);

      showToast(
        'File Screened & Routed',
        `File ${fileNumber} forwarded for ${updates.approvalAuthority === 'pd' ? 'PD' : 'Pillar Lead'} authorization.`,
        'info',
        fileNumber
      );
      setActiveTab('approval');
    }
  };

  const handleApproveApplication = (fileNumber, updates) => {
    // 1. Authority Matrix Gate: Verify current persona has authority to approve this specific file
    const targetApp = applications.find(a => a.fileNumber === fileNumber);
    if (canApproveApplication && targetApp) {
      const authCheck = canApproveApplication(targetApp);
      if (!authCheck.canApprove) {
        showToast(
          'Authority Matrix Violation',
          authCheck.reason || 'You are not authorized to approve this application under the VIKAS Authority Matrix.',
          'warning'
        );
        return;
      }
    }

    let approvedApp = null;
    const approvalDate = updates.approvalDate || new Date().toLocaleDateString('en-GB');

    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        approvedApp = { 
          ...app, 
          ...updates, 
          status: 'approved',
          approvalDate: approvalDate,
          lastUpdated: new Date().toLocaleString('en-GB')
        };
        return approvedApp;
      }
      return app;
    }));

    // 1. Dispatch official Application Approved notification with exact required text:
    const approvedNotif = createNotification({
      event: NOTIFICATION_EVENTS.APPLICATION_APPROVED,
      fileNumber,
      recipientEmail: approvedApp?.email || currentUser?.email,
      recipientName: approvedApp?.contactPerson,
      extra: { vertical: approvedApp?.assignedVertical },
      type: 'success'
    });

    // 2. Dispatch Engagement Assigned notification
    const engagementNotif = createNotification({
      event: NOTIFICATION_EVENTS.ENGAGEMENT_ASSIGNED,
      fileNumber,
      recipientEmail: approvedApp?.email || currentUser?.email,
      recipientName: approvedApp?.contactPerson,
      extra: { vertical: approvedApp?.assignedVertical },
      type: 'info'
    });

    setNotifications(prev => [engagementNotif, approvedNotif, ...prev]);

    showToast(
      'Authorization & E-Sign Complete!',
      `File ${fileNumber} (${approvedApp?.name || 'Record'}) is now officially authorized and enrolled in ${approvedApp?.assignedVertical || 'Vertical'}.`,
      'success',
      fileNumber
    );

    setActiveTab('overview');
  };

  const handleRejectApplication = (fileNumber, updates) => {
    const isFormalRejection = updates.status === 'rejected';
    const targetApp = applications.find(a => a.fileNumber === fileNumber);

    // If issuing formal rejection at approval stage, check authority matrix
    if (isFormalRejection && targetApp && canApproveApplication) {
      const authCheck = canApproveApplication(targetApp);
      if (!authCheck.canApprove) {
        showToast(
          'Authority Matrix Violation',
          authCheck.reason || 'You are not authorized to decline this application under the VIKAS Authority Matrix.',
          'warning'
        );
        return;
      }
    }

    let updatedTargetApp = null;

    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        updatedTargetApp = { 
          ...app, 
          ...updates, 
          status: updates.status || (isFormalRejection ? 'rejected' : 'pending_screening'),
          rejectionDate: isFormalRejection ? (updates.rejectionDate || new Date().toLocaleDateString('en-GB')) : app.rejectionDate,
          lastUpdated: new Date().toLocaleString('en-GB')
        };
        return updatedTargetApp;
      }
      return app;
    }));

    if (isFormalRejection) {
      const rejectNotif = createNotification({
        event: NOTIFICATION_EVENTS.APPLICATION_REJECTED,
        fileNumber,
        recipientEmail: updatedTargetApp?.email || currentUser?.email,
        recipientName: updatedTargetApp?.contactPerson,
        type: 'error'
      });
      setNotifications(prev => [rejectNotif, ...prev]);

      showToast(
        'Application Decision Issued',
        `File ${fileNumber} status marked as Application Declined.`,
        'warning',
        fileNumber
      );
      setActiveTab('overview');
    } else {
      showToast(
        'File Returned to Screening',
        `File ${fileNumber} was sent back with remarks.`,
        'info',
        fileNumber
      );
      setActiveTab('screening');
    }
  };

  // Badges Calculation
  const pendingScreeningCount = applications.filter(app => app.status === 'pending_screening').length;
  const pendingApprovalCount = applications.filter(app => {
    if (app.status !== 'pending_approval') return false;
    if (currentRole === 'pd' || currentRole === 'admin') return true;
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
      case 'login':
        return (
          <LoginPage 
            onNavigateToRegister={() => handleTabChange('entry')}
            onLoginSuccess={(user, userApps) => handleUserLoggedIn(user, userApps)}
          />
        );
      case 'entry':
        return (
          <OnboardingForm 
            onSubmitApplication={handleAddNewApplication} 
            onNavigateToLogin={() => handleTabChange('login')}
          />
        );
      case 'screening':
        if (isApplicant) {
          return (
            <ApplicantMyApplications 
              applications={applications} 
              onNavigateToTab={(tab) => handleTabChange(tab)} 
              notifications={notifications}
              onToggleReadNotification={handleToggleReadNotification}
              onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
              onClearNotifications={handleClearNotifications}
            />
          );
        }
        return (
          <ScreeningQueue 
            currentRole={currentRole} 
            applications={applications} 
            onRouteApplication={handleRouteApplication} 
          />
        );
      case 'approval':
        if (isApplicant) {
          return (
            <ApplicantMyApplications 
              applications={applications} 
              onNavigateToTab={(tab) => handleTabChange(tab)} 
              notifications={notifications}
              onToggleReadNotification={handleToggleReadNotification}
              onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
              onClearNotifications={handleClearNotifications}
            />
          );
        }
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
        if (!isAuthenticated) {
          return (
            <LoginPage 
              onNavigateToRegister={() => handleTabChange('entry')}
              onLoginSuccess={(user, userApps) => handleUserLoggedIn(user, userApps)}
            />
          );
        }
        if (isApplicant) {
          return (
            <ApplicantMyApplications 
              applications={applications} 
              onNavigateToTab={(tab) => handleTabChange(tab)} 
              notifications={notifications}
              onToggleReadNotification={handleToggleReadNotification}
              onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
              onClearNotifications={handleClearNotifications}
            />
          );
        }
        return <Dashboard applications={applications} onNavigateToTab={(tab) => handleTabChange(tab)} />;
      case 'flow':
        return <VikasFlow />;
      default:
        return <EngagementsList key={`default-${overviewKey}`} applications={applications} onNavigateToTab={(tab) => handleTabChange(tab)} />;
    }
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <Header 
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
