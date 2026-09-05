import React, { useState } from 'react';
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

  const handleTabChange = (tabId) => {
    if (tabId === 'overview' || tabId === 'engagement') {
      window.history.pushState({}, '', '/');
      setOverviewKey(prev => prev + 1);
    }
    setActiveTab(tabId);
  };

  // Initial High-Fidelity Mock Data representing different layers
  const [applications, setApplications] = useState([
    {
      name: "AeroSpatial Drone Systems",
      contactPerson: "Dr. R. Raman",
      email: "raman@aerospatial.co.in",
      phone: "+91 98450 12345",
      stakeholderType: "STARTUP",
      trl: 5,
      description: "Autonomous micro-UAV systems for agricultural mapping and spatial GIS analysis in rural areas.",
      nmIcpsAlign: "Autonomous Systems and Robotics",
      documentName: "pitch_deck_aero.pdf",
      isStrategic: false,
      fundingRequested: "1500000",
      fileNumber: "VIKAS/2026/STARTUP/ONBOARD/101",
      status: "approved",
      assignedVertical: "STARTUP",
      approvalAuthority: "pillar_lead",
      eSignature: "Dr. M. S. Prasad (Startups Lead)",
      approvalDate: "12/08/2026",
      screeningNotes: "Verified prototype. TRL 5 is appropriate. Recommended for startup support.",
      history: [
        {
          date: "10/08/2026, 10:30:15",
          action: "File Created & Onboarded",
          user: "Public Portal (Auto)",
          details: "Initial submission completed successfully."
        },
        {
          date: "11/08/2026, 14:22:10",
          action: "Routed for PILLAR_LEAD Approval",
          user: "Operations Anchor",
          details: "Assigned Vertical: STARTUP. Document authenticity verified."
        },
        {
          date: "12/08/2026, 11:05:40",
          action: "Digitally Approved & Signed",
          user: "Pillar Lead (Dr. M. S. Prasad)",
          details: "Approved vertical enrollment in STARTUP. E-Signature logged."
        }
      ]
    },
    {
      name: "PNT Precision Receiver Prototype",
      contactPerson: "Prof. S. Ananth",
      email: "s.ananth@iitt.ac.in",
      phone: "+91 81234 56789",
      stakeholderType: "TDP",
      trl: 4,
      description: "Development of indigenous GPS/NavIC compatible receiver for highly accurate Positioning, Navigation, and Timing (PNT).",
      nmIcpsAlign: "Sensors, Actuators & Internet of Things (IoT)",
      documentName: "tdp_proposal_pnt.pdf",
      isStrategic: false,
      fundingRequested: "3200000",
      fileNumber: "VIKAS/2026/TECH_DEV/ONBOARD/204",
      status: "approved",
      assignedVertical: "TECH_DEV",
      approvalAuthority: "pillar_lead",
      eSignature: "Dr. K. Raghavan (TDP Lead)",
      approvalDate: "18/08/2026",
      screeningNotes: "Strong academic linkage. TRL 4 validation completed.",
      history: [
        {
          date: "15/08/2026, 09:12:00",
          action: "File Created & Onboarded",
          user: "Public Portal (Auto)",
          details: "TDP application logged."
        },
        {
          date: "16/08/2026, 16:45:30",
          action: "Routed for PILLAR_LEAD Approval",
          user: "Operations Anchor",
          details: "Assigned Vertical: TECH_DEV. Forwarded to TDP Pillar."
        },
        {
          date: "18/08/2026, 15:30:12",
          action: "Digitally Approved & Signed",
          user: "Pillar Lead (Dr. K. Raghavan)",
          details: "Approved R&D project allocation. Verification complete."
        }
      ]
    },
    {
      name: "Strategic alliance with ISRO Geo-Spatial Center",
      contactPerson: "Dr. G. Venkat",
      email: "venkat@isro.gov.in",
      phone: "+91 94440 98765",
      stakeholderType: "COLLAB",
      trl: 3,
      description: "MoU for spatial data sharing, teacher training for VidyaGIS school programs, and joint pilot projects.",
      nmIcpsAlign: "Spatial GIS Mapping & VidyaGIS",
      documentName: "mou_draft_isro.pdf",
      isStrategic: true,
      fundingRequested: "0",
      fileNumber: "VIKAS/2026/COLLAB/ONBOARD/309",
      status: "pending_approval",
      assignedVertical: "COLLAB",
      approvalAuthority: "pd",
      screeningNotes: "MoU draft reviewed by collaborations cell. Strategic value is high. Escalated for PD sign-off.",
      history: [
        {
          date: "25/08/2026, 11:20:00",
          action: "File Created & Onboarded",
          user: "Public Portal (Auto)",
          details: "MoU draft logged in registry."
        },
        {
          date: "27/08/2026, 10:15:45",
          action: "Routed for PD Approval",
          user: "Operations Anchor",
          details: "Assigned Vertical: COLLAB. Flags: Strategic Engagement (PD Sign-off Mandatory)."
        }
      ]
    },
    {
      name: "Dr. Priya Nair - Postdoctoral Fellow Recruitment",
      contactPerson: "Dr. Priya Nair",
      email: "priya.nair@outlook.com",
      phone: "+91 78901 23456",
      stakeholderType: "FELLOW",
      trl: 3,
      description: "Recruitment as Chanakya Fellow for postdoctoral research in AI and advanced sensor telemetry.",
      nmIcpsAlign: "Artificial Intelligence & Machine Learning",
      documentName: "resume_priya_nair.pdf",
      isStrategic: false,
      fundingRequested: "800000",
      fileNumber: "VIKAS/2026/HRD/ONBOARD/411",
      status: "pending_approval",
      assignedVertical: "HRD",
      approvalAuthority: "pillar_lead",
      screeningNotes: "Credentials and publications verified by HRD cell. Meets selection criteria.",
      history: [
        {
          date: "28/08/2026, 14:00:00",
          action: "File Created & Onboarded",
          user: "Public Portal (Auto)",
          details: "HRD fellowship registry completed."
        },
        {
          date: "29/08/2026, 11:35:10",
          action: "Routed for PILLAR_LEAD Approval",
          user: "Operations Anchor",
          details: "Assigned Vertical: HRD. Recommended for Pillar Lead sign-off."
        }
      ]
    },
    {
      name: "Quantum-Shield Cybersecurity",
      contactPerson: "Siddharth Sen",
      email: "sid@quantumshield.io",
      phone: "+91 99990 12345",
      stakeholderType: "STARTUP",
      trl: 3,
      description: "Development of hardware-based cryptomodules to shield cyber physical power grids from intrusion.",
      nmIcpsAlign: "Cyber Physical Systems",
      documentName: "proposal_quantum_shield.pdf",
      isStrategic: false,
      fundingRequested: "500000",
      fileNumber: "VIKAS/2026/STARTUP/ONBOARD/512",
      status: "pending_screening",
      history: [
        {
          date: "30/08/2026, 16:45:00",
          action: "File Created & Onboarded",
          user: "Public Portal (Auto)",
          details: "Application submitted and queued for operations screening."
        }
      ]
    },
    {
      name: "VidyaGIS Teacher Upskilling - Tirupati Region",
      contactPerson: "Mrs. Leela Devi",
      email: "leela.gis@edu.org",
      phone: "+91 90001 90002",
      stakeholderType: "SCHOOL",
      trl: 3,
      description: "Upskilling workshop for science and geography teachers on spatial GIS tools and spatial reasoning.",
      nmIcpsAlign: "Spatial GIS Mapping & VidyaGIS",
      documentName: "workshop_agenda.pdf",
      isStrategic: false,
      fundingRequested: "200000",
      fileNumber: "VIKAS/2026/SCHOOL/ONBOARD/603",
      status: "pending_screening",
      history: [
        {
          date: "31/08/2026, 10:20:00",
          action: "File Created & Onboarded",
          user: "Public Portal (Auto)",
          details: "School spatial workshop proposal registered."
        }
      ]
    }
  ]);

  // Operations Handlers
  const handleAddNewApplication = (newApp) => {
    setApplications(prev => [newApp, ...prev]);
  };

  const handleRouteApplication = (fileNumber, updates) => {
    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        return { ...app, ...updates };
      }
      return app;
    }));
    
    // Automatically switch sub-tabs depending on target status
    if (updates.status === 'approved') {
      setActiveTab('verticals');
    } else {
      setActiveTab('features');
      setFeatureSubTab('approval');
    }
  };

  const handleApproveApplication = (fileNumber, updates) => {
    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        return { ...app, ...updates };
      }
      return app;
    }));
    setActiveTab('verticals');
  };

  const handleRejectApplication = (fileNumber, updates) => {
    setApplications(prev => prev.map(app => {
      if (app.fileNumber === fileNumber) {
        return { ...app, ...updates, status: 'pending_screening' };
      }
      return app;
    }));
    setActiveTab('features');
    setFeatureSubTab('screening');
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
        />
        <div className="content-body">
          {renderActiveMainTab()}
        </div>
      </main>
    </div>
  );
}
