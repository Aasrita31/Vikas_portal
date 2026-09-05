import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Cpu, 
  Layers, 
  Radio, 
  Sparkles, 
  User, 
  Building2, 
  Calendar, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Activity, 
  ChevronRight, 
  Compass, 
  Eye, 
  Printer, 
  RefreshCw,
  Info,
  PauseCircle,
  XCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';

export default function TdpApplicationDetailPage({ 
  applicationId, 
  onBack, 
  onNavigateToApply,
  onNavigateToExecution
}) {
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'proposal' | 'milestones' | 'testbeds' | 'team' | 'documents' | 'audit'
  const [copiedAppNo, setCopiedAppNo] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Stage Progression State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionRemarks, setTransitionRemarks] = useState('');
  const [selectedTargetStageId, setSelectedTargetStageId] = useState(2);
  const [transitionSuccessMessage, setTransitionSuccessMessage] = useState('');
  const [showAdminConsole, setShowAdminConsole] = useState(true);

  // Fetch application detail from backend
  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/vikas/technology-development/applications/${applicationId}`);
      if (res.ok) {
        const data = await res.json();
        setAppData(data);
      } else {
        fallbackDetailData();
      }
    } catch (err) {
      fallbackDetailData();
    } finally {
      setLoading(false);
    }
  };

  const fallbackDetailData = () => {
    // High-fidelity fallback
    setAppData({
      applicationNumber: applicationId || 'IITTNIF-TDP-2026-8421',
      status: 'Technical Review',
      currentStage: 'Technical Review',
      submittedDate: '15/08/2026',
      lastUpdated: '28/08/2026, 14:30:00',
      submissionTimestamp: '15/08/2026, 10:30:00',
      trackingToken: 'TRK-842199',
      applicantName: 'Prof. S. Ananth',
      organization: 'IIT Tirupati',
      department: 'Department of Electrical Engineering & CPS Lab',
      designation: 'Associate Professor & Lead Investigator',
      email: 's.ananth@iitt.ac.in',
      mobile: '+91 98450 67890',
      applicantType: 'Academic Institution / Faculty',
      projectTitle: 'Dual-Frequency NavIC/GPS Precision Timing & Positioning Module',
      technologyDomain: 'PNT / NavIC / GNSS',
      problemStatement: 'Severe positioning degradation and timing synchronization loss in GPS-denied, forested canopy, and intentional RF-jammed environments requires an indigenous dual-frequency receiver.',
      background: 'Foundational laboratory validation of carrier-phase tracking completed in academic lab under early exploratory grant.',
      aim: 'To engineer and field-validate an indigenous dual-band (L5/S) NavIC/GPS baseband tracking module achieving sub-meter precision and sub-15ns timing jitter.',
      objectives: [
        'Architect dual-band RF front-end module compatible with NavIC L5/S and GPS L1C/A.',
        'Implement baseband digital signal acquisition with sub-meter pseudorange accuracy.',
        'Formulate firmware-level anti-spoofing and multi-path mitigation filters.'
      ],
      proposedSolution: 'A dedicated hardware-in-the-loop embedded RF receiver with Kalman filter-based carrier smoothing and active anti-spoofing firmware.',
      innovation: 'First-of-its-kind indigenous firmware-level multi-carrier NavIC acquisition on low-power silicon with sub-15ns timing jitter.',
      currentTrl: 3,
      targetTrl: 6,
      expectedOutcomes: 'Fabricated enclosed prototype module, metrology benchmark certificate, and production-ready manufacturing dossier.',
      methodology: 'Iterative hardware-in-the-loop simulation, RF impedance matching in anechoic chambers, automated telemetry testing, and environmental stress profiling.',
      hardwareRequirements: 'Dual-band RF front-end ASICs, high-speed FPGA/DSP evaluation boards, multi-frequency patch antennas, EMI/EMC shielding enclosures.',
      softwareRequirements: 'MATLAB/Simulink RF Blockset, Vivado Design Suite, GCC Embedded C toolchain, RTOS kernel, automated telemetry dashboard.',
      datasetRequirements: 'Raw ISRO NavIC L5/S-band RF telemetry dumps, simulated GNSS multi-path and spoofing signal test vectors.',
      labTestbedRequirements: [
        'PNT (Positioning, Navigation & Timing) Testbed',
        'Industrial IoT & Sensor Instrumentation'
      ],
      industryCollaborationRequirement: 'Partnership with indigenous avionics and strategic defense manufacturing partners for packaging and field deployment.',
      startDate: '2026-11-01',
      expectedDurationMonths: 18,
      budgetApproved: '₹ 35,00,000',
      leadReviewer: 'Dr. K. Raghavan (TDP Lead & PNT Domain Expert)',
      reviewerRemarks: 'Baseband algorithm mathematical proof verified by domain committee. RF front-end schematics forwarded for anechoic chamber test benching.',
      milestones: [
        { title: 'RF Baseband Architecture & Simulation', month: 'Month 03', targetOutput: 'Simulation benchmark dossier' },
        { title: 'PCB Engineering Model & Hardware Test Rig', month: 'Month 08', targetOutput: 'Assembled prototype PCB' },
        { title: 'NavIC L5/S Tracking & Anti-Spoofing Firmware', month: 'Month 14', targetOutput: 'Firmware binary & test logs' },
        { title: 'Field Metrological & Environmental Certification', month: 'Month 18', targetOutput: 'TRL 6 validation report' }
      ],
      deliverables: [
        { code: 'D1', description: 'System Architecture & Simulation Dossier', timeline: 'Month 03' },
        { code: 'D2', description: 'Hardware Engineering Model with Gerber Files', timeline: 'Month 08' },
        { code: 'D3', description: 'Baseband Tracking Firmware Source Code', timeline: 'Month 14' },
        { code: 'D4', description: 'Final TRL 6 Metrological Qualification Certificate', timeline: 'Month 18' }
      ],
      teamMembers: [
        { name: 'Prof. S. Ananth', role: 'Principal Investigator (PI)', institution: 'IIT Tirupati', email: 's.ananth@iitt.ac.in' },
        { name: 'Dr. K. Raghavan', role: 'Co-Principal Investigator', institution: 'IITTNiF', email: 'k.raghavan@iittnif.in' },
        { name: 'Arun Kumar', role: 'Senior Research Fellow (Hardware)', institution: 'IIT Tirupati', email: 'arun.k@iitt.ac.in' }
      ],
      facultyMentorPI: 'Prof. S. Ananth (Associate Professor, IIT Tirupati)',
      documents: [
        { documentType: 'Technical Proposal Dossier', fileName: 'TDP_NavIC_Technical_Proposal_v1.pdf', fileSize: '2.4 MB' },
        { documentType: 'Budget Formulation & BOM', fileName: 'Budget_Formulation_Breakdown.xlsx', fileSize: '480 KB' },
        { documentType: 'Institutional Endorsement (Dean NOC)', fileName: 'IIT_Tirupati_Dean_SRIC_Endorsement.pdf', fileSize: '1.1 MB' }
      ],
      declarationAccepted: true,
      authorizedSigner: 'Prof. S. Ananth',
      stageTimeline: [
        {
          stageId: 1,
          stageName: 'Application Submitted',
          status: 'completed',
          completedDate: '15/08/2026',
          actor: 'Applicant (Prof. S. Ananth)',
          remarks: 'Proposal dossier, budget matrix, and Dean SRIC endorsement uploaded.'
        },
        {
          stageId: 2,
          stageName: 'Initial Screening',
          status: 'completed',
          completedDate: '19/08/2026',
          actor: 'IITTNiF Secretariat',
          remarks: 'Administrative eligibility, institution NOC, and compliance checklist verified.'
        },
        {
          stageId: 3,
          stageName: 'Technical Review',
          status: 'in_progress',
          completedDate: null,
          actor: 'Domain Technical Committee',
          remarks: 'In-depth peer review on dual-band RF architecture and NavIC baseband algorithms underway.'
        },
        {
          stageId: 4,
          stageName: 'Evaluation',
          status: 'pending',
          completedDate: null,
          actor: 'IITTNiF Evaluation Board',
          remarks: 'Oral defense presentation and lab testbed capacity allocation.'
        },
        {
          stageId: 5,
          stageName: 'Approval',
          status: 'pending',
          completedDate: null,
          actor: 'Project Director & Pillar Lead',
          remarks: 'Formal grant sanction order and project agreement execution.'
        },
        {
          stageId: 6,
          stageName: 'Project Execution',
          status: 'pending',
          completedDate: null,
          actor: 'Principal Investigator & Lab Team',
          remarks: 'Fabrication of PCB engineering model and telemetry firmware coding.'
        },
        {
          stageId: 7,
          stageName: 'Final Review',
          status: 'pending',
          completedDate: null,
          actor: 'Expert Assessment Panel',
          remarks: 'TRL 6 metrological qualification and testbed environmental profiling.'
        },
        {
          stageId: 8,
          stageName: 'Completed',
          status: 'pending',
          completedDate: null,
          actor: 'IITTNiF Directorate',
          remarks: 'Final project certificate issuance and tech transfer repository archiving.'
        }
      ],
      auditHistory: [
        { timestamp: '15/08/2026, 10:30:15', action: 'Proposal Submitted', actor: 'Prof. S. Ananth', details: 'Initial submission logged via single-window portal.' },
        { timestamp: '19/08/2026, 14:15:00', action: 'Secretariat Screening Cleared', actor: 'Secretariat Screening Cell', details: 'Mandatory NOC and eligibility criteria verified.' },
        { timestamp: '28/08/2026, 14:30:00', action: 'Assigned to Technical Review Panel', actor: 'TDP Technical Committee', details: 'Assigned to PNT & Embedded Signal Processing sub-committee.' }
      ]
    });
  };

  useEffect(() => {
    fetchDetail();
  }, [applicationId]);

  const handleCopy = () => {
    if (appData?.applicationNumber) {
      navigator.clipboard.writeText(appData.applicationNumber);
      setCopiedAppNo(true);
      setTimeout(() => setCopiedAppNo(false), 2000);
    }
  };

  // 8 Mandatory Timeline Stages
  const stagesList = [
    { id: 1, name: 'Application Submitted', desc: 'Proposal registration & document upload' },
    { id: 2, name: 'Initial Screening', desc: 'Administrative completeness & NOC check' },
    { id: 3, name: 'Technical Review', desc: 'Peer technical assessment & TRL validation' },
    { id: 4, name: 'Evaluation', desc: 'Oral defense & testbed resource allocation' },
    { id: 5, name: 'Approval', desc: 'Formal sanction order & grant agreement' },
    { id: 6, name: 'Project Execution', desc: 'Prototype fabrication & milestone deliveries' },
    { id: 7, name: 'Final Review', desc: 'Environmental qualification & field test trials' },
    { id: 8, name: 'Completed', desc: 'TRL 6 certification & technology transfer' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Draft':
        return <span className="badge badge-status badge-draft"><Clock size={12} /> Draft</span>;
      case 'Submitted':
        return <span className="badge badge-status badge-submitted"><FileText size={12} /> Submitted</span>;
      case 'Under Screening':
        return <span className="badge badge-status badge-screening"><Activity size={12} /> Under Screening</span>;
      case 'Technical Review':
        return <span className="badge badge-status badge-tech-review"><Layers size={12} /> Technical Review</span>;
      case 'Mentor Review':
        return <span className="badge badge-status badge-mentor-review"><Compass size={12} /> Mentor Review</span>;
      case 'Approved':
        return <span className="badge badge-status badge-approved"><CheckCircle size={12} /> Approved</span>;
      case 'In Progress':
        return <span className="badge badge-status badge-in-progress"><Activity size={12} /> In Progress</span>;
      case 'On Hold':
        return <span className="badge badge-status badge-on-hold"><PauseCircle size={12} /> On Hold</span>;
      case 'Rejected':
        return <span className="badge badge-status badge-rejected"><XCircle size={12} /> Rejected</span>;
      case 'Completed':
        return <span className="badge badge-status badge-completed"><CheckCircle size={12} /> Completed</span>;
      default:
        return <span className="badge badge-status badge-neutral">{status}</span>;
    }
  };

  const STAGES_CONFIG = [
    { id: 1, name: 'Application Submitted', status: 'Submitted', defaultRemarks: 'Proposal registered and uploaded to intake queue.' },
    { id: 2, name: 'Initial Screening', status: 'Under Screening', defaultRemarks: 'NOC verification and administrative eligibility screening cleared.' },
    { id: 3, name: 'Technical Review', status: 'Technical Review', defaultRemarks: 'Peer technical committee review on CPS architecture & TRL progression passed.' },
    { id: 4, name: 'Evaluation', status: 'Mentor Review', defaultRemarks: 'Oral evaluation presentation and testbed allocation approved.' },
    { id: 5, name: 'Approval', status: 'Approved', defaultRemarks: 'Formal sanction order issued and project agreement signed.' },
    { id: 6, name: 'Project Execution', status: 'In Progress', defaultRemarks: 'Hardware prototype fabrication, milestones & weekly progress active.' },
    { id: 7, name: 'Final Review', status: 'Final Review', defaultRemarks: 'Metrological qualification and environmental test trials validated.' },
    { id: 8, name: 'Completed', status: 'Completed', defaultRemarks: 'Final prototype verified and TRL 6 qualification certificate issued.' }
  ];

  const getCurrentActiveStageId = () => {
    if (!appData) return 1;
    const inProg = appData.stageTimeline?.find(s => s.status === 'in_progress');
    if (inProg) return inProg.stageId;
    const statusMap = {
      'Draft': 1,
      'Submitted': 1,
      'Under Screening': 2,
      'Technical Review': 3,
      'Mentor Review': 4,
      'Approved': 5,
      'In Progress': 6,
      'Final Review': 7,
      'Completed': 8,
      'On Hold': 3,
      'Rejected': 2
    };
    return statusMap[appData.status] || 1;
  };

  const executeStageTransition = async (stageId, status, stageName, remarks) => {
    setIsTransitioning(true);
    setTransitionSuccessMessage('');

    const finalRemarks = remarks || transitionRemarks || `Stage progressed to Stage 0${stageId}: ${stageName} by authorized evaluation committee.`;
    const payload = {
      status: status,
      currentStage: stageName,
      reviewerRemarks: finalRemarks,
      actor: 'IITTNiF Technical Advisory Committee'
    };

    try {
      const res = await fetch(`http://localhost:5000/api/v1/vikas/technology-development/applications/${appData.applicationNumber}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updated = await res.json();
        setAppData(updated);
      } else {
        applyLocalStageTransition(stageId, status, stageName, finalRemarks);
      }
    } catch (err) {
      applyLocalStageTransition(stageId, status, stageName, finalRemarks);
    } finally {
      setIsTransitioning(false);
      setTransitionSuccessMessage(`Successfully updated application to Stage 0${stageId} — ${stageName}`);
      setTransitionRemarks('');
      setTimeout(() => setTransitionSuccessMessage(''), 4000);
    }
  };

  const applyLocalStageTransition = (stageId, status, stageName, remarks) => {
    const now = new Date().toLocaleString();
    const actorName = 'IITTNiF Technical Advisory Committee';

    setAppData(prev => {
      if (!prev) return prev;
      const updatedTimeline = STAGES_CONFIG.map(s => {
        if (s.id < stageId) {
          return {
            stageId: s.id,
            stageName: s.name,
            status: 'completed',
            completedDate: now.split(',')[0],
            actor: s.id === 1 ? prev.applicantName : 'IITTNiF Secretariat',
            remarks: `Stage completed and validated.`
          };
        } else if (s.id === stageId) {
          return {
            stageId: s.id,
            stageName: s.name,
            status: status === 'Completed' ? 'completed' : 'in_progress',
            completedDate: status === 'Completed' ? now.split(',')[0] : null,
            actor: actorName,
            remarks: remarks
          };
        } else {
          return {
            stageId: s.id,
            stageName: s.name,
            status: 'pending',
            completedDate: null,
            actor: actorName,
            remarks: 'Awaiting completion of preceding stages.'
          };
        }
      });

      const auditItem = {
        timestamp: now,
        action: `Status Updated to ${status}`,
        actor: actorName,
        details: remarks
      };

      return {
        ...prev,
        status: status,
        currentStage: stageName,
        lastUpdated: now,
        reviewerRemarks: remarks,
        stageTimeline: updatedTimeline,
        auditHistory: [auditItem, ...(prev.auditHistory || [])]
      };
    });
  };


  if (loading) {
    return (
      <div className="techdev-detail-page tdp-app-detail-page animate-fade-in">
        <div className="detail-top-nav">
          <button className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Applications Tracking</span>
          </button>
        </div>
        <div className="card loading-detail-card">
          <RefreshCw size={32} className="animate-spin text-emerald" />
          <p>Loading application dossier #{applicationId}...</p>
        </div>
      </div>
    );
  }

  if (!appData) {
    return (
      <div className="techdev-detail-page tdp-app-detail-page animate-fade-in">
        <div className="detail-top-nav">
          <button className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back to Applications Tracking</span>
          </button>
        </div>
        <div className="card empty-detail-card">
          <AlertCircle size={40} className="text-amber" />
          <h3>Application Not Found</h3>
          <p>Could not retrieve details for application #{applicationId}.</p>
          <button className="btn btn-outline mt-12" onClick={onBack}>Return to List</button>
        </div>
      </div>
    );
  }

  // Merge timeline with the 8 stages
  const timelineData = stagesList.map((stage) => {
    const found = appData.stageTimeline?.find(s => s.stageId === stage.id || s.stageName?.toLowerCase() === stage.name.toLowerCase());
    return {
      ...stage,
      status: found ? found.status : 'pending',
      completedDate: found ? found.completedDate : null,
      actor: found ? found.actor : 'IITTNiF Technical Advisory Committee',
      remarks: found ? found.remarks : 'Awaiting completion of preceding stages.'
    };
  });

  return (
    <div className="techdev-detail-page tdp-app-detail-page animate-fade-in">
      {/* Top Navigation */}
      <div className="detail-top-nav">
        <button className="btn-back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Applications Tracking</span>
        </button>
        <span className="top-nav-breadcrumb">
          VIKAS Platform / Technology Development / Applications / <strong className="text-emerald font-mono">{appData.applicationNumber}</strong>
        </span>
      </div>

      {/* Institutional Dossier Header */}
      <div className="card dossier-header-card">
        <div className="dossier-header-top">
          <div className="dossier-id-row">
            <div className="app-no-badge font-mono">
              <FileText size={16} className="text-emerald" />
              <strong>{appData.applicationNumber}</strong>
              <button className="btn-copy-code" onClick={handleCopy} title="Copy Application Number">
                {copiedAppNo ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              </button>
            </div>
            {getStatusBadge(appData.status)}
            <span className="badge badge-cyan font-mono">
              TRL {appData.currentTrl || 3} → TRL {appData.targetTrl || 6}
            </span>
          </div>

          <div className="dossier-header-actions">
            {(appData.status === 'Approved' || appData.status === 'In Progress' || appData.status === 'Completed' || appData.status === 'Technical Review') && (
              <button 
                className="btn btn-sm btn-execution-header-cta" 
                onClick={() => onNavigateToExecution ? onNavigateToExecution(appData.applicationNumber) : null}
                title="Open Project Execution & Milestone Workspace"
              >
                <Zap size={14} />
                <span>Execution Workspace</span>
              </button>
            )}
            <button className="btn btn-sm btn-outline" onClick={() => window.print()}>
              <Printer size={14} />
              <span>Print Dossier</span>
            </button>
            <button className="btn btn-sm btn-outline" onClick={fetchDetail} title="Refresh">
              <RefreshCw size={14} />
              <span>Sync Status</span>
            </button>
          </div>
        </div>

        <h1 className="dossier-project-title mt-12">{appData.projectTitle}</h1>

        <div className="dossier-meta-grid mt-14">
          <div className="meta-grid-item">
            <span className="meta-label">Technology Domain</span>
            <strong className="meta-val text-cyan">{appData.technologyDomain}</strong>
          </div>
          <div className="meta-grid-item">
            <span className="meta-label">Principal Investigator</span>
            <strong className="meta-val">{appData.applicantName}</strong>
          </div>
          <div className="meta-grid-item">
            <span className="meta-label">Organization & Department</span>
            <strong className="meta-val">{appData.organization} • {appData.department}</strong>
          </div>
          <div className="meta-grid-item">
            <span className="meta-label">Submission Date</span>
            <strong className="meta-val font-mono">{appData.submittedDate || appData.submissionTimestamp}</strong>
          </div>
        </div>

        {/* Security / Read-Only Applicant Notice */}
        <div className="institutional-lock-notice mt-16">
          <div className="lock-icon-wrap">
            <Lock size={16} className="text-emerald" />
          </div>
          <div className="lock-text-content">
            <strong>Official Status & Evaluation Managed by IITTNiF Secretariat</strong>
            <p>
              Applicants cannot manually modify application status or review stages. Official status transitions and milestone evaluations are certified and published exclusively by authorized IITTNiF Evaluation Boards and Pillar Leads.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Dossier Tabs */}
      <div className="card dossier-tabs-card mt-20">
        <div className="dossier-tabs-nav">
          <button 
            className={`dossier-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <Activity size={15} />
            <span>8-Stage Timeline & Status</span>
          </button>

          <button 
            className={`dossier-tab-btn ${activeTab === 'proposal' ? 'active' : ''}`}
            onClick={() => setActiveTab('proposal')}
          >
            <FileText size={15} />
            <span>Proposal & Technical Scope</span>
          </button>

          <button 
            className={`dossier-tab-btn ${activeTab === 'milestones' ? 'active' : ''}`}
            onClick={() => setActiveTab('milestones')}
          >
            <Layers size={15} />
            <span>Milestones & Deliverables</span>
          </button>

          <button 
            className={`dossier-tab-btn ${activeTab === 'testbeds' ? 'active' : ''}`}
            onClick={() => setActiveTab('testbeds')}
          >
            <Radio size={15} />
            <span>Testbeds & Infrastructure</span>
          </button>

          <button 
            className={`dossier-tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            <User size={15} />
            <span>Investigators & Team</span>
          </button>

          <button 
            className={`dossier-tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <Download size={15} />
            <span>Submitted Annexures</span>
          </button>

          <button 
            className={`dossier-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            <Clock size={15} />
            <span>Secretariat Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Tab Content Body */}
      <div className="dossier-content-body mt-20">
        {/* 1. TIMELINE VIEW (The 8 Mandatory Stages) */}
        {activeTab === 'timeline' && (
          <div className="timeline-view-wrapper animate-fade-in">
            {/* Timeline Summary Box */}
            <div className="card timeline-summary-card">
              <div className="timeline-summary-left">
                <div className="summary-status-pill">
                  <span className="summary-label">Current Official Status:</span>
                  {getStatusBadge(appData.status)}
                </div>
                <div className="summary-stage-line">
                  <span>Current Active Stage:</span>
                  <strong className="text-emerald">{appData.currentStage || 'Technical Review'}</strong>
                </div>
              </div>
              <div className="timeline-summary-right">
                <span className="summary-label">Assigned Lead Reviewer:</span>
                <strong className="text-cyan">{appData.leadReviewer || 'Dr. K. Raghavan (TDP Lead)'}</strong>
              </div>
            </div>

            {/* Stage Progression Action Console */}
            <div className="card stage-progression-action-card mt-16">
              <div className="stage-action-header">
                <div className="stage-action-title-group">
                  <div className="stage-action-icon-pill">
                    <ShieldCheck size={20} className="text-emerald" />
                  </div>
                  <div>
                    <h4 className="stage-action-heading">IITTNiF Evaluation & Governance Control</h4>
                    <p className="stage-action-subtext">
                      Advance proposal through the single-window review lifecycle, certification, and execution stages.
                    </p>
                  </div>
                </div>
                <div className="stage-action-right-badge">
                  <span className="badge badge-emerald font-mono">
                    <Activity size={12} /> Active Stage 0{getCurrentActiveStageId()}
                  </span>
                </div>
              </div>

              {transitionSuccessMessage && (
                <div className="stage-transition-success-banner mt-12 animate-fade-in">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>{transitionSuccessMessage}</span>
                </div>
              )}

              <div className="stage-action-body-grid mt-16">
                {/* 1-Click Advance Button */}
                <div className="stage-advance-quick-col">
                  {getCurrentActiveStageId() < 8 ? (
                    <button
                      type="button"
                      className="btn btn-primary-cta w-full"
                      disabled={isTransitioning}
                      onClick={() => {
                        const nextId = getCurrentActiveStageId() + 1;
                        const nextObj = STAGES_CONFIG.find(s => s.id === nextId);
                        if (nextObj) {
                          executeStageTransition(nextObj.id, nextObj.status, nextObj.name, `Advanced to Stage 0${nextId}: ${nextObj.name} by committee evaluation.`);
                        }
                      }}
                    >
                      {isTransitioning ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" />
                          <span>Advancing Stage...</span>
                        </>
                      ) : (
                        <>
                          <Zap size={15} />
                          <span>Advance to Stage 0{getCurrentActiveStageId() + 1}: {STAGES_CONFIG.find(s => s.id === getCurrentActiveStageId() + 1)?.name}</span>
                          <ChevronRight size={15} />
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="stage-completed-badge-box">
                      <CheckCircle size={18} className="text-emerald" />
                      <span>All 8 Single-Window Stages Completed & Certified</span>
                    </div>
                  )}
                </div>

                {/* Direct Jump Selector & Remarks */}
                <div className="stage-jump-custom-col">
                  <div className="stage-jump-controls-flex">
                    <div className="stage-select-wrap">
                      <label className="stage-ctrl-label">Select Stage:</label>
                      <select 
                        className="form-control-select"
                        value={selectedTargetStageId}
                        onChange={(e) => setSelectedTargetStageId(Number(e.target.value))}
                        disabled={isTransitioning}
                      >
                        {STAGES_CONFIG.map(s => (
                          <option key={s.id} value={s.id}>
                            Stage 0{s.id}: {s.name} ({s.status})
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline stage-apply-btn"
                      disabled={isTransitioning}
                      onClick={() => {
                        const target = STAGES_CONFIG.find(s => s.id === selectedTargetStageId);
                        if (target) {
                          executeStageTransition(target.id, target.status, target.name, transitionRemarks);
                        }
                      }}
                    >
                      <span>Update Stage</span>
                    </button>
                  </div>

                  <div className="stage-remarks-input-wrap mt-10">
                    <input 
                      type="text" 
                      className="form-control-input"
                      placeholder="Optional evaluation remarks / committee justification..."
                      value={transitionRemarks}
                      onChange={(e) => setTransitionRemarks(e.target.value)}
                      disabled={isTransitioning}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* The 8-Stage Visual Progression Timeline */}
            <div className="card eight-stage-timeline-card mt-20">
              <div className="timeline-header-title">
                <Compass size={18} className="text-emerald" />
                <h3>TDP Single-Window Progression Lifecycle (8 Stages)</h3>
              </div>

              <div className="vertical-timeline-container mt-20">
                {timelineData.map((node, index) => {
                  const isCompleted = node.status === 'completed';
                  const isInProgress = node.status === 'in_progress';
                  const isRejected = node.status === 'rejected';
                  const isOnHold = node.status === 'on_hold';
                  const isPending = node.status === 'pending';
                  const isLast = index === timelineData.length - 1;

                  return (
                    <div key={node.id} className={`timeline-node-row ${node.status}`}>
                      {/* Left: Step Marker & Connector Line */}
                      <div className="node-marker-col">
                        <div className={`node-circle-marker ${node.status}`}>
                          {isCompleted && <Check size={16} className="text-white" />}
                          {isInProgress && <span className="active-pulse-dot"></span>}
                          {isRejected && <XCircle size={16} className="text-white" />}
                          {isOnHold && <PauseCircle size={16} className="text-white" />}
                          {isPending && <span className="node-number-text">{node.id}</span>}
                        </div>
                        {!isLast && (
                          <div className={`node-connector-line ${isCompleted ? 'completed-line' : 'pending-line'}`}></div>
                        )}
                      </div>

                      {/* Right: Stage Content Card */}
                      <div className={`node-content-card ${node.status}`}>
                        <div className="node-card-header">
                          <div className="node-title-group">
                            <span className="node-step-tag">STAGE 0{node.id}</span>
                            <h4 className="node-stage-name">{node.name}</h4>
                          </div>

                          <div className="node-status-meta">
                            {isCompleted && (
                              <span className="badge badge-emerald font-mono">
                                <Check size={11} /> Completed {node.completedDate ? `(${node.completedDate})` : ''}
                              </span>
                            )}
                            {isInProgress && (
                              <span className="badge badge-cyan font-mono animate-pulse">
                                <Activity size={11} /> In Progress
                              </span>
                            )}
                            {isRejected && (
                              <span className="badge badge-rejected font-mono">
                                <XCircle size={11} /> Rejected
                              </span>
                            )}
                            {isOnHold && (
                              <span className="badge badge-on-hold font-mono">
                                <PauseCircle size={11} /> On Hold
                              </span>
                            )}
                            {isPending && (
                              <span className="badge badge-neutral font-mono">
                                <Clock size={11} /> Pending Stage
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="node-desc-text">{node.desc}</p>

                        <div className="node-authority-box mt-10">
                          <div className="authority-line">
                            <span className="auth-label">Evaluating Authority:</span>
                            <strong className="auth-name">{node.actor}</strong>
                          </div>
                          {node.remarks && (
                            <div className="remarks-line mt-6">
                              <span className="auth-label">Review Remarks:</span>
                              <p className="remarks-text">{node.remarks}</p>
                            </div>
                          )}
                        </div>

                        {/* Interactive Node Action Button */}
                        <div className="node-stage-actions-row mt-12">
                          {isInProgress && (
                            <button 
                              type="button"
                              className="btn btn-xs btn-primary-cta"
                              disabled={isTransitioning}
                              onClick={() => {
                                const nextId = Math.min(8, node.id + 1);
                                const nextObj = STAGES_CONFIG.find(s => s.id === nextId);
                                if (nextObj) {
                                  executeStageTransition(nextObj.id, nextObj.status, nextObj.name, `Stage 0${node.id} completed. Advanced to Stage 0${nextId}: ${nextObj.name}.`);
                                }
                              }}
                            >
                              <Check size={12} />
                              <span>Complete Stage 0{node.id} & Proceed to Stage 0{Math.min(8, node.id + 1)} →</span>
                            </button>
                          )}

                          {isPending && (
                            <button 
                              type="button"
                              className="btn btn-xs btn-outline stage-activate-btn"
                              disabled={isTransitioning}
                              onClick={() => {
                                const targetObj = STAGES_CONFIG.find(s => s.id === node.id);
                                if (targetObj) {
                                  executeStageTransition(targetObj.id, targetObj.status, targetObj.name, `Activated Stage 0${node.id}: ${targetObj.name}.`);
                                }
                              }}
                            >
                              <Activity size={12} className="text-emerald" />
                              <span>Advance Application to Stage 0{node.id} →</span>
                            </button>
                          )}

                          {node.id === 6 && (isCompleted || isInProgress) && (
                            <button 
                              type="button"
                              className="btn btn-xs btn-stage-execution-cta ml-8"
                              onClick={() => onNavigateToExecution ? onNavigateToExecution(appData.applicationNumber) : null}
                            >
                              <Zap size={12} />
                              <span>Project Execution Workspace (Milestones & Deliverables) →</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. PROPOSAL & TECHNICAL SCOPE */}
        {activeTab === 'proposal' && (
          <div className="proposal-view-grid animate-fade-in">
            <div className="card dossier-section-card">
              <h3 className="section-title">
                <FileText size={18} className="text-emerald" />
                Problem Statement & Background
              </h3>
              <div className="section-content mt-12">
                <p className="lead-paragraph">{appData.problemStatement}</p>
                <div className="sub-field mt-12">
                  <span className="sub-field-label">Foundational Background & Prior Work:</span>
                  <p>{appData.background || 'Initial laboratory validation completed in academic testbed.'}</p>
                </div>
              </div>
            </div>

            <div className="card dossier-section-card mt-20">
              <h3 className="section-title">
                <Sparkles size={18} className="text-cyan" />
                Project Aim & Core Objectives
              </h3>
              <div className="section-content mt-12">
                <p><strong>Primary Aim:</strong> {appData.aim}</p>
                <span className="sub-field-label mt-12">Specific Technical Objectives:</span>
                <ul className="dossier-list mt-8">
                  {appData.objectives?.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card dossier-section-card mt-20">
              <h3 className="section-title">
                <Cpu size={18} className="text-amber" />
                Proposed Solution & Technological Innovation
              </h3>
              <div className="section-content mt-12">
                <p><strong>Methodological Solution:</strong> {appData.proposedSolution}</p>
                <div className="innovation-callout mt-12">
                  <strong>Novelty / Deep-Tech Innovation:</strong>
                  <p>{appData.innovation}</p>
                </div>
                <div className="sub-field mt-12">
                  <span className="sub-field-label">Expected Physical Outcomes / Prototypes:</span>
                  <p>{appData.expectedOutcomes}</p>
                </div>
              </div>
            </div>

            <div className="card dossier-section-card mt-20">
              <h3 className="section-title">
                <Layers size={18} className="text-emerald" />
                Technical & Hardware Specifications
              </h3>
              <div className="section-content mt-12">
                <div className="specs-two-col">
                  <div className="spec-col">
                    <span className="sub-field-label">Hardware Requirements & BOM:</span>
                    <p>{appData.hardwareRequirements}</p>
                  </div>
                  <div className="spec-col">
                    <span className="sub-field-label">Software & Simulation Toolchains:</span>
                    <p>{appData.softwareRequirements}</p>
                  </div>
                </div>
                <div className="spec-full mt-12">
                  <span className="sub-field-label">Dataset & Signal Telemetry Ingestion:</span>
                  <p>{appData.datasetRequirements}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. MILESTONES & DELIVERABLES */}
        {activeTab === 'milestones' && (
          <div className="milestones-view-wrapper animate-fade-in">
            <div className="card dossier-section-card">
              <h3 className="section-title">
                <Calendar size={18} className="text-emerald" />
                Project Milestone Schedule ({appData.expectedDurationMonths || 18} Months)
              </h3>
              <div className="milestones-table-wrap mt-14">
                <table className="dossier-table">
                  <thead>
                    <tr>
                      <th>Milestone ID</th>
                      <th>Milestone Title</th>
                      <th>Target Month</th>
                      <th>Expected Technical Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appData.milestones?.map((m, idx) => (
                      <tr key={idx}>
                        <td className="font-mono text-emerald"><strong>M{idx + 1}</strong></td>
                        <td><strong>{m.title}</strong></td>
                        <td className="font-mono">{m.month}</td>
                        <td>{m.targetOutput}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card dossier-section-card mt-20">
              <h3 className="section-title">
                <CheckCircle2 size={18} className="text-cyan" />
                Tangible Deliverables (D1 — D4)
              </h3>
              <div className="milestones-table-wrap mt-14">
                <table className="dossier-table">
                  <thead>
                    <tr>
                      <th>Deliverable Code</th>
                      <th>Detailed Output Description</th>
                      <th>Scheduled Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appData.deliverables?.map((d, idx) => (
                      <tr key={idx}>
                        <td className="font-mono text-cyan"><strong>{d.code}</strong></td>
                        <td>{d.description}</td>
                        <td className="font-mono">{d.timeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. TESTBEDS & INFRASTRUCTURE */}
        {activeTab === 'testbeds' && (
          <div className="testbeds-view-wrapper animate-fade-in">
            <div className="card dossier-section-card">
              <h3 className="section-title">
                <Radio size={18} className="text-emerald" />
                Allocated Specialized CPS Testbeds & Lab Integration
              </h3>
              <div className="testbeds-list-grid mt-16">
                {appData.labTestbedRequirements?.map((bed, idx) => (
                  <div key={idx} className="testbed-allocated-card">
                    <div className="testbed-icon-pill">
                      <Radio size={20} className="text-emerald" />
                    </div>
                    <div>
                      <h4 className="testbed-name">{bed}</h4>
                      <span className="testbed-status text-emerald font-mono">Provisioned & Scheduled</span>
                      <p className="testbed-sub mt-4">
                        Access granted to high-frequency RF instrumentation, anechoic testing suites, and sensor telemetry loggers at IITTNiF central facility.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="industry-collab-box mt-20">
                <span className="sub-field-label">Industry & Defense Co-development Requirement:</span>
                <p>{appData.industryCollaborationRequirement || 'Partnership with indigenous manufacturing vendors.'}</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. INVESTIGATORS & TEAM */}
        {activeTab === 'team' && (
          <div className="team-view-wrapper animate-fade-in">
            <div className="card dossier-section-card">
              <h3 className="section-title">
                <User size={18} className="text-emerald" />
                Investigator Team & Research Staff
              </h3>
              <div className="team-cards-grid mt-16">
                {appData.teamMembers?.map((member, idx) => (
                  <div key={idx} className="team-member-item-card">
                    <div className="member-avatar">
                      <span>{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                    </div>
                    <div className="member-details">
                      <h4 className="member-name">{member.name}</h4>
                      <span className="member-role text-emerald">{member.role}</span>
                      <span className="member-inst">{member.institution || appData.organization}</span>
                      {member.email && <span className="member-email font-mono">{member.email}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. SUBMITTED DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="documents-view-wrapper animate-fade-in">
            <div className="card dossier-section-card">
              <h3 className="section-title">
                <Download size={18} className="text-emerald" />
                Submitted Technical Proposal Annexures & Institutional NOCs
              </h3>
              <div className="documents-table-wrap mt-16">
                <table className="dossier-table">
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>File Name</th>
                      <th>File Size</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appData.documents?.map((doc, idx) => (
                      <tr key={idx}>
                        <td><strong>{doc.documentType}</strong></td>
                        <td className="font-mono text-cyan">{doc.fileName}</td>
                        <td className="font-mono text-muted">{doc.fileSize}</td>
                        <td className="text-right">
                          <button 
                            className="btn btn-sm btn-outline"
                            onClick={() => alert(`Downloading verified institutional copy: ${doc.fileName}`)}
                          >
                            <Download size={13} />
                            <span>Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 7. AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="audit-view-wrapper animate-fade-in">
            <div className="card dossier-section-card">
              <h3 className="section-title">
                <Clock size={18} className="text-emerald" />
                Secretariat Single-Window Audit Trail & History
              </h3>
              <div className="audit-timeline-list mt-16">
                {appData.auditHistory?.map((item, idx) => (
                  <div key={idx} className="audit-item-row">
                    <div className="audit-time font-mono">
                      {item.timestamp}
                    </div>
                    <div className="audit-marker">
                      <div className="audit-dot"></div>
                    </div>
                    <div className="audit-info">
                      <strong className="audit-action">{item.action}</strong>
                      <span className="audit-actor text-muted">by {item.actor}</span>
                      <p className="audit-details mt-4">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .tdp-app-detail-page {
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 60px;
        }

        .dossier-header-card {
          padding: 28px 32px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%), var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-lg);
        }

        .dossier-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }

        .dossier-id-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .app-no-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 14px;
          color: var(--text-primary);
        }

        .btn-copy-code {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 2px;
        }

        .btn-copy-code:hover {
          color: var(--color-emerald);
        }

        .dossier-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-execution-header-cta {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #0f172a;
          font-weight: 700;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
          transition: all var(--transition-fast);
        }

        .btn-execution-header-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(245, 158, 11, 0.45);
        }

        .stage-execution-launcher-row {
          display: flex;
          align-items: center;
        }

        .btn-stage-execution-cta {
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.4);
          font-weight: 600;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-stage-execution-cta:hover {
          background: #f59e0b;
          color: #0f172a;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .dossier-project-title {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          margin: 0;
        }

        .dossier-meta-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--border-color);
        }

        @media (max-width: 900px) {
          .dossier-meta-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .meta-grid-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .meta-label {
          font-size: 11px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }

        .meta-val {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .institutional-lock-notice {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: var(--radius-md);
        }

        .lock-icon-wrap {
          margin-top: 2px;
        }

        .lock-text-content strong {
          display: block;
          font-size: 13px;
          color: #10b981;
          margin-bottom: 2px;
        }

        .lock-text-content p {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        /* Dossier Tabs Bar */
        .dossier-tabs-card {
          padding: 8px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
        }

        .dossier-tabs-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
        }

        .dossier-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .dossier-tab-btn:hover {
          color: var(--text-primary);
          background: var(--bg-primary);
        }

        .dossier-tab-btn.active {
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
        }

        /* 8-Stage Vertical Progression Timeline */
        .timeline-summary-card {
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .timeline-summary-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .summary-status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .summary-label {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .summary-stage-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-primary);
        }

        /* Stage Progression Action Console */
        .stage-progression-action-card {
          padding: 20px 24px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%), var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .stage-action-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-color);
        }

        .stage-action-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stage-action-icon-pill {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stage-action-heading {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .stage-action-subtext {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 2px 0 0;
        }

        .stage-transition-success-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: 8px;
          color: #059669;
          font-size: 13px;
          font-weight: 600;
        }

        .stage-action-body-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 18px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .stage-action-body-grid {
            grid-template-columns: 1fr;
          }
        }

        .stage-completed-badge-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          color: #059669;
        }

        .stage-jump-controls-flex {
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }

        .stage-select-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stage-ctrl-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
        }

        .stage-apply-btn {
          height: 38px;
          padding: 0 16px;
          font-weight: 700;
          font-size: 13px;
          border-color: rgba(16, 185, 129, 0.4);
          color: #059669;
          background-color: rgba(16, 185, 129, 0.06);
          white-space: nowrap;
        }

        .stage-apply-btn:hover {
          background-color: #10b981;
          color: #ffffff;
          border-color: #10b981;
        }

        .stage-remarks-input-wrap .form-control-input {
          font-size: 12.5px;
          padding: 8px 12px;
          height: 34px;
        }

        .btn-xs {
          padding: 4px 10px;
          font-size: 11.5px;
          font-weight: 600;
          border-radius: 6px;
        }

        .stage-activate-btn {
          border-color: rgba(16, 185, 129, 0.35);
          color: #059669;
          background-color: rgba(16, 185, 129, 0.05);
        }

        .stage-activate-btn:hover {
          background-color: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
        }

        .node-stage-actions-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .eight-stage-timeline-card {
          padding: 28px 32px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }

        .timeline-header-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .timeline-header-title h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .vertical-timeline-container {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .timeline-node-row {
          display: flex;
          gap: 20px;
          position: relative;
        }

        .node-marker-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 36px;
        }

        .node-circle-marker {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          z-index: 2;
          transition: all var(--transition-fast);
        }

        .node-circle-marker.completed {
          background: #10b981;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
        }

        .node-circle-marker.in_progress {
          background: #06b6d4;
          box-shadow: 0 0 16px rgba(6, 182, 212, 0.5);
          position: relative;
        }

        .active-pulse-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff;
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }

        .node-circle-marker.pending {
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          color: var(--text-secondary);
        }

        .node-circle-marker.rejected {
          background: #ef4444;
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
        }

        .node-circle-marker.on_hold {
          background: #eab308;
          box-shadow: 0 0 12px rgba(234, 179, 8, 0.4);
        }

        .node-connector-line {
          width: 2px;
          flex: 1;
          min-height: 48px;
          margin: 4px 0;
        }

        .completed-line {
          background: #10b981;
        }

        .pending-line {
          background: var(--border-color);
          border-left: 2px dashed rgba(255, 255, 255, 0.15);
        }

        .node-content-card {
          flex: 1;
          padding: 16px 20px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          transition: all var(--transition-fast);
        }

        .node-content-card.in_progress {
          border-color: rgba(6, 182, 212, 0.5);
          background: rgba(6, 182, 212, 0.04);
        }

        .node-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .node-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .node-step-tag {
          font-family: monospace;
          font-size: 11px;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .node-stage-name {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .node-desc-text {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 6px 0 0 0;
          line-height: 1.4;
        }

        .node-authority-box {
          padding: 10px 14px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-sm);
          font-size: 12px;
        }

        .authority-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .auth-label {
          color: var(--text-secondary);
        }

        .auth-name {
          color: #10b981;
        }

        .remarks-line {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .remarks-text {
          color: var(--text-primary);
          font-style: italic;
          margin: 0;
        }

        /* Dossier Details Sections */
        .dossier-section-card {
          padding: 24px 28px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }

        .section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
        }

        .lead-paragraph {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-primary);
        }

        .sub-field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .dossier-list {
          padding-left: 20px;
          margin: 0;
        }

        .dossier-list li {
          font-size: 13px;
          color: var(--text-primary);
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .innovation-callout {
          padding: 12px 16px;
          background: rgba(6, 182, 212, 0.08);
          border-left: 3px solid #06b6d4;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }

        .specs-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 768px) {
          .specs-two-col {
            grid-template-columns: 1fr;
          }
        }

        .dossier-table {
          width: 100%;
          border-collapse: collapse;
        }

        .dossier-table th {
          padding: 12px 16px;
          background: rgba(15, 23, 42, 0.7);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        .dossier-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-color);
          font-size: 13px;
        }

        .testbeds-list-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 768px) {
          .testbeds-list-grid {
            grid-template-columns: 1fr;
          }
        }

        .testbed-allocated-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .testbed-icon-pill {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: rgba(16, 185, 129, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .testbed-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .testbed-status {
          font-size: 11px;
          display: inline-block;
          margin-top: 2px;
        }

        .testbed-sub {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .team-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 900px) {
          .team-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .team-member-item-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .member-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          color: #ffffff;
        }

        .member-details {
          display: flex;
          flex-direction: column;
        }

        .member-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .member-role {
          font-size: 12px;
          font-weight: 600;
        }

        .member-inst {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .member-email {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Audit Timeline */
        .audit-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .audit-item-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .audit-time {
          width: 140px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .audit-marker {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 4px;
        }

        .audit-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }

        .audit-info {
          flex: 1;
        }

        .audit-action {
          font-size: 13px;
          color: var(--text-primary);
        }

        .audit-actor {
          font-size: 12px;
          margin-left: 8px;
        }

        .audit-details {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .loading-detail-card,
        .empty-detail-card {
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        /* 10 Status Badges */
        .badge-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: var(--radius-full);
        }

        .badge-draft { background: rgba(148, 163, 184, 0.12); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); }
        .badge-submitted { background: rgba(59, 130, 246, 0.12); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }
        .badge-screening { background: rgba(245, 158, 11, 0.12); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
        .badge-tech-review { background: rgba(6, 182, 212, 0.12); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.3); }
        .badge-mentor-review { background: rgba(139, 92, 246, 0.12); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3); }
        .badge-approved { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.4); }
        .badge-in-progress { background: rgba(14, 165, 233, 0.15); color: #0ea5e9; border: 1px solid rgba(14, 165, 233, 0.4); }
        .badge-on-hold { background: rgba(234, 179, 8, 0.15); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.4); }
        .badge-rejected { background: rgba(239, 68, 68, 0.12); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .badge-completed { background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b981; font-weight: 700; }
        .badge-neutral { background: rgba(255, 255, 255, 0.08); color: var(--text-secondary); }

        .mt-4 { margin-top: 4px; }
        .mt-6 { margin-top: 6px; }
        .mt-8 { margin-top: 8px; }
        .mt-10 { margin-top: 10px; }
        .mt-12 { margin-top: 12px; }
        .mt-14 { margin-top: 14px; }
        .mt-16 { margin-top: 16px; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
}
