import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Cpu, 
  Upload, 
  FileText, 
  Trash2, 
  Plus, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  Clock, 
  UserCheck, 
  Building2, 
  Check, 
  X, 
  Download, 
  Copy, 
  Layers, 
  Lock, 
  Eye, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const SAMPLE_DEMO_DATA = {
  // Step 1: Applicant Details
  applicantName: 'Prof. S. Ananth',
  organization: 'IIT Tirupati',
  department: 'Department of Electrical Engineering & CPS Lab',
  designation: 'Associate Professor & Lead Investigator',
  email: 's.ananth@iitt.ac.in',
  mobile: '+91 98450 67890',
  applicantType: 'Academic Institution / Faculty',

  // Step 2: Project Details
  projectTitle: 'Dual-Frequency NavIC/GPS Precision Timing & Positioning Module',
  technologyDomain: 'PNT / NavIC / GNSS',
  problemStatement: 'Severe positioning degradation and timing loss in GPS-denied and RF-jammed environments requires an indigenous dual-frequency receiver.',
  background: 'Foundational laboratory validation of baseband algorithms completed in academic lab under early-stage seed exploratory work.',
  aim: 'To engineer and field-validate an indigenous dual-band (L5/S) NavIC/GPS baseband tracking module achieving sub-meter precision.',
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

  // Step 3: Technical Details
  methodology: 'Iterative hardware-in-the-loop simulation, RF impedance matching in anechoic chambers, automated telemetry testing, and environmental stress profiling.',
  hardwareRequirements: 'Dual-band RF front-end ASICs, high-speed FPGA/DSP evaluation boards, multi-frequency patch antennas, EMI/EMC shielding enclosures.',
  softwareRequirements: 'MATLAB/Simulink RF Blockset, Vivado Design Suite, GCC Embedded C toolchain, RTOS kernel, automated telemetry dashboard.',
  datasetRequirements: 'Raw ISRO NavIC L5/S-band RF telemetry dumps, simulated GNSS multi-path and spoofing signal test vectors.',
  labTestbedRequirements: [
    'PNT (Positioning, Navigation & Timing) Testbed',
    'Industrial IoT & Sensor Instrumentation'
  ],
  industryCollaborationRequirement: 'Partnership with indigenous avionics and strategic defense manufacturing partners for packaging and field deployment.',

  // Step 4: Project Plan
  startDate: '2026-11-01',
  expectedDurationMonths: 18,
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

  // Step 5: Documents
  documents: [
    { documentType: 'Technical Proposal Dossier', fileName: 'TDP_NavIC_Technical_Proposal_v1.pdf', fileSize: '2.4 MB' },
    { documentType: 'Budget Formulation & BOM', fileName: 'Budget_Formulation_Breakdown.xlsx', fileSize: '480 KB' },
    { documentType: 'Institutional Endorsement (Dean NOC)', fileName: 'IIT_Tirupati_Dean_SRIC_Endorsement.pdf', fileSize: '1.1 MB' }
  ],

  // Step 6: Declaration
  declarationAccepted: true,
  authorizedSigner: 'Prof. S. Ananth'
};

export const INITIAL_FORM_DATA = {
  // Step 1: Applicant Details (Blank by default so placeholders/watermarks show)
  applicantName: '',
  organization: '',
  department: '',
  designation: '',
  email: '',
  mobile: '',
  applicantType: 'Academic Institution / Faculty',

  // Step 2: Project Details
  projectTitle: '',
  technologyDomain: 'PNT / NavIC / GNSS',
  problemStatement: '',
  background: '',
  aim: '',
  objectives: [''],
  proposedSolution: '',
  innovation: '',
  currentTrl: 3,
  targetTrl: 6,
  expectedOutcomes: '',

  // Step 3: Technical Details
  methodology: '',
  hardwareRequirements: '',
  softwareRequirements: '',
  datasetRequirements: '',
  labTestbedRequirements: [],
  industryCollaborationRequirement: '',

  // Step 4: Project Plan
  startDate: '',
  expectedDurationMonths: 12,
  milestones: [
    { title: '', month: 'Month 03', targetOutput: '' }
  ],
  deliverables: [
    { code: 'D1', description: '', timeline: 'Month 03' }
  ],
  teamMembers: [
    { name: '', role: '', institution: '', email: '' }
  ],
  facultyMentorPI: '',

  // Step 5: Documents
  documents: [],

  // Step 6: Declaration
  declarationAccepted: false,
  authorizedSigner: ''
};

const STEPS = [
  { id: 1, title: 'Applicant Details', subtitle: 'Institutional identity' },
  { id: 2, title: 'Project Details', subtitle: 'Objectives & scope' },
  { id: 3, title: 'Technical Details', subtitle: 'Methodology & testbeds' },
  { id: 4, title: 'Project Plan', subtitle: 'Milestones & team' },
  { id: 5, title: 'Documents', subtitle: 'Upload templates' },
  { id: 6, title: 'Declaration', subtitle: 'Institutional undertaking' },
  { id: 7, title: 'Review & Submit', subtitle: 'Final verification' }
];

export default function TdpProposalApplicationFlow({ 
  initialProject = null, 
  onBack, 
  onSubmissionSuccess,
  onNavigateToTrack,
  currentUser = { name: '', role: '', email: '', authenticated: true }
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    // Check localStorage for persisted draft
    const saved = localStorage.getItem('VIKAS_TDP_PROPOSAL_DRAFT');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Do not restore if it's the old hardcoded mock data
        if (parsed.applicantName && parsed.applicantName !== 'Prof. S. Ananth') {
          return parsed;
        } else if (parsed.applicantName === 'Prof. S. Ananth') {
          localStorage.removeItem('VIKAS_TDP_PROPOSAL_DRAFT');
        }
      } catch (e) {}
    }
    const initial = { ...INITIAL_FORM_DATA };
    if (initialProject) {
      initial.projectTitle = initialProject.title || '';
      initial.technologyDomain = initialProject.technologyDomain || 'PNT / NavIC / GNSS';
      initial.problemStatement = initialProject.problemStatement || '';
      initial.currentTrl = initialProject.trlStart || 3;
      initial.targetTrl = initialProject.targetTrl || 6;
    }
    return initial;
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(currentUser?.authenticated || true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [copiedAppNo, setCopiedAppNo] = useState(false);

  const handleResetForm = () => {
    localStorage.removeItem('VIKAS_TDP_PROPOSAL_DRAFT');
    setFormData({ ...INITIAL_FORM_DATA });
    setValidationErrors({});
  };

  const handleFillDemoData = () => {
    setFormData({ ...SAMPLE_DEMO_DATA });
    setValidationErrors({});
  };

  // Auto-persist draft to localStorage on change
  useEffect(() => {
    localStorage.setItem('VIKAS_TDP_PROPOSAL_DRAFT', JSON.stringify(formData));
  }, [formData]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Step Validation logic
  const validateCurrentStep = () => {
    const errors = {};

    if (currentStep === 1) {
      if (!formData.applicantName?.trim()) errors.applicantName = 'Applicant name is required.';
      if (!formData.organization?.trim()) errors.organization = 'Organization / Institution is required.';
      if (!formData.department?.trim()) errors.department = 'Department is required.';
      if (!formData.designation?.trim()) errors.designation = 'Designation is required.';
      if (!formData.email?.trim() || !formData.email.includes('@')) errors.email = 'Valid institutional email is required.';
      if (!formData.mobile?.trim()) errors.mobile = 'Mobile number is required.';
    } else if (currentStep === 2) {
      if (!formData.projectTitle?.trim()) errors.projectTitle = 'Project title is required.';
      if (!formData.technologyDomain?.trim()) errors.technologyDomain = 'Technology domain is required.';
      if (!formData.problemStatement?.trim()) errors.problemStatement = 'Problem statement is required.';
      if (!formData.aim?.trim()) errors.aim = 'Project aim is required.';
      if (!formData.proposedSolution?.trim()) errors.proposedSolution = 'Proposed solution is required.';
      if (!formData.innovation?.trim()) errors.innovation = 'Innovation / novelty narrative is required.';
    } else if (currentStep === 3) {
      if (!formData.methodology?.trim()) errors.methodology = 'Methodology description is required.';
      if (!formData.hardwareRequirements?.trim()) errors.hardwareRequirements = 'Hardware requirements are required.';
      if (!formData.softwareRequirements?.trim()) errors.softwareRequirements = 'Software requirements are required.';
    } else if (currentStep === 4) {
      if (!formData.startDate) errors.startDate = 'Target start date is required.';
      if (!formData.facultyMentorPI?.trim()) errors.facultyMentorPI = 'Lead PI / Mentor name is required.';
      if (!formData.milestones || formData.milestones.length === 0) errors.milestones = 'At least one milestone is required.';
    } else if (currentStep === 5) {
      if (!formData.documents || formData.documents.length === 0) {
        errors.documents = 'Please upload at least the Technical Proposal document.';
      }
    } else if (currentStep === 6) {
      if (!formData.declarationAccepted) errors.declarationAccepted = 'You must accept the institutional declaration to proceed.';
      if (!formData.authorizedSigner?.trim()) errors.authorizedSigner = 'Authorized signatory name is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Milestone helpers
  const handleAddMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { title: '', month: `Month ${prev.milestones.length * 3 + 3}`, targetOutput: '' }
      ]
    }));
  };

  const handleUpdateMilestone = (index, field, val) => {
    const updated = [...formData.milestones];
    updated[index][field] = val;
    setFormData(prev => ({ ...prev, milestones: updated }));
  };

  const handleRemoveMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, idx) => idx !== index)
    }));
  };

  // Deliverable helpers
  const handleAddDeliverable = () => {
    setFormData(prev => ({
      ...prev,
      deliverables: [
        ...prev.deliverables,
        { code: `D${prev.deliverables.length + 1}`, description: '', timeline: `Month ${prev.deliverables.length * 3 + 3}` }
      ]
    }));
  };

  const handleUpdateDeliverable = (index, field, val) => {
    const updated = [...formData.deliverables];
    updated[index][field] = val;
    setFormData(prev => ({ ...prev, deliverables: updated }));
  };

  const handleRemoveDeliverable = (index) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, idx) => idx !== index)
    }));
  };

  // Team Member helpers
  const handleAddTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [
        ...prev.teamMembers,
        { name: '', role: 'Research Investigator', institution: formData.organization, email: '' }
      ]
    }));
  };

  const handleUpdateTeamMember = (index, field, val) => {
    const updated = [...formData.teamMembers];
    updated[index][field] = val;
    setFormData(prev => ({ ...prev, teamMembers: updated }));
  };

  const handleRemoveTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, idx) => idx !== index)
    }));
  };

  // File upload simulator
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newDocs = files.map(file => ({
      documentType: 'Technical Annexure / Proposal Doc',
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    }));

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocs]
    }));
  };

  const handleRemoveDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, idx) => idx !== index)
    }));
  };

  // Submission Handler
  const handleFinalSubmit = async () => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }

    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send payload to backend
      const response = await fetch('http://localhost:5000/api/v1/vikas/technology-development/tdp/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      let data;
      if (response.ok) {
        data = await response.json();
      } else {
        // Fallback local receipt generation
        const rnd = Math.floor(1000 + Math.random() * 9000);
        data = {
          ...formData,
          applicationNumber: `IITTNIF-TDP-2026-${rnd}`,
          status: 'Submitted',
          submissionTimestamp: new Date().toLocaleString(),
          trackingToken: `TRK-${Math.floor(100000 + Math.random() * 900000)}`
        };
      }

      setSubmittedReceipt(data);
      localStorage.removeItem('VIKAS_TDP_PROPOSAL_DRAFT');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (onSubmissionSuccess) {
        onSubmissionSuccess(data);
      }
    } catch (err) {
      // Fallback local receipt if network error
      const rnd = Math.floor(1000 + Math.random() * 9000);
      const fallbackData = {
        ...formData,
        applicationNumber: `IITTNIF-TDP-2026-${rnd}`,
        status: 'Submitted',
        submissionTimestamp: new Date().toLocaleString(),
        trackingToken: `TRK-${Math.floor(100000 + Math.random() * 900000)}`
      };
      setSubmittedReceipt(fallbackData);
      localStorage.removeItem('VIKAS_TDP_PROPOSAL_DRAFT');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (onSubmissionSuccess) {
        onSubmissionSuccess(fallbackData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyAppNumber = () => {
    if (submittedReceipt?.applicationNumber) {
      navigator.clipboard.writeText(submittedReceipt.applicationNumber);
      setCopiedAppNo(true);
      setTimeout(() => setCopiedAppNo(false), 2500);
    }
  };

  return (
    <div className="techdev-detail-page tdp-application-flow-page animate-fade-in">
      {submittedReceipt ? (
        <>
          <div className="detail-top-nav">
            <button className="btn-back-link" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Return to Technology Development</span>
            </button>
          </div>

          <div className="card tdp-success-receipt-card">
            <div className="success-header-center">
              <div className="success-check-badge animate-scale-up">
                <CheckCircle2 size={42} className="text-emerald" />
              </div>
              <span className="badge badge-emerald font-mono mt-12">Status: Submitted & Logged</span>
              <h2 className="receipt-main-title">TDP Proposal Successfully Registered</h2>
              <p className="receipt-subtext">
                Your technology development proposal has been submitted to the IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF) Technical Advisory Committee.
              </p>
            </div>

            {/* Application Number & Key Identifiers Box */}
            <div className="receipt-app-number-box mt-20">
              <div className="app-no-group">
                <span className="app-no-label">Official Application Number</span>
                <div className="app-no-flex">
                  <strong className="app-no-code font-mono">{submittedReceipt.applicationNumber}</strong>
                  <button className="btn-copy-code" onClick={handleCopyAppNumber} title="Copy Application Number">
                    {copiedAppNo ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <div className="app-meta-sep"></div>

              <div className="app-no-group">
                <span className="app-no-label">Submission Timestamp</span>
                <strong className="app-meta-val font-mono">{submittedReceipt.submissionTimestamp}</strong>
              </div>

              <div className="app-meta-sep"></div>

              <div className="app-no-group">
                <span className="app-no-label">Assigned Vertical</span>
                <strong className="app-meta-val text-emerald">6.1 Technology Development (TDP)</strong>
              </div>
            </div>

            {/* Summary Details Grid */}
            <div className="receipt-summary-grid mt-20">
              <div className="receipt-cell">
                <span>Project Title:</span>
                <strong>{submittedReceipt.projectTitle}</strong>
              </div>
              <div className="receipt-cell">
                <span>Technology Domain:</span>
                <strong>{submittedReceipt.technologyDomain}</strong>
              </div>
              <div className="receipt-cell">
                <span>Principal Investigator:</span>
                <strong>{submittedReceipt.applicantName} ({submittedReceipt.organization})</strong>
              </div>
              <div className="receipt-cell">
                <span>Target TRL:</span>
                <strong className="text-emerald">TRL {submittedReceipt.currentTrl} → TRL {submittedReceipt.targetTrl}</strong>
              </div>
            </div>

            {/* Review & Governance Pipeline Info */}
            <div className="receipt-next-steps-box mt-20">
              <div className="next-steps-header">
                <Clock size={16} className="text-cyan" />
                <span>What Happens Next? (Single-Window Evaluation Timeline)</span>
              </div>
              <ul className="next-steps-list">
                <li>
                  <strong>1. Initial Secretariat Screening:</strong> Technical completeness and NOC verification within 3 working days.
                </li>
                <li>
                  <strong>2. Domain Expert Review:</strong> Peer assessment by the PNT / Cyber-Physical Systems panel.
                </li>
                <li>
                  <strong>3. Presentation & Testbed Allocation:</strong> Shortlisted applicants present to the IITTNiF Evaluation Board.
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="receipt-action-buttons mt-24">
              <button className="btn btn-primary-cta" onClick={onBack}>
                <ArrowLeft size={16} />
                <span>Back to Tech Dev Portal</span>
              </button>

              <button 
                className="btn btn-outline"
                onClick={() => {
                  if (onNavigateToTrack) {
                    onNavigateToTrack(submittedReceipt.applicationNumber);
                  } else {
                    window.location.href = `/vikas/technology-development/applications/${submittedReceipt.applicationNumber}`;
                  }
                }}
              >
                <Eye size={16} />
                <span>Track Application Status</span>
              </button>

              <button 
                className="btn btn-outline"
                onClick={() => window.print()}
              >
                <Download size={16} />
                <span>Print / Download Receipt</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Top Navigation Bar with Back Button */}
          <div className="detail-top-nav">
            <button className="btn-back-link" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Back to Technology Development</span>
            </button>
            <span className="top-nav-breadcrumb">
              VIKAS Platform / 6.1 Technology Development / <strong className="text-emerald">Submit TDP Proposal</strong>
            </span>
          </div>

          {/* Hero Title Banner */}
          <div className="card tdp-form-hero-card">
        <div className="form-hero-badge-row">
          <span className="badge badge-emerald">Call for Proposals (CFP) 2026</span>
          <span className="badge badge-cyan">NM-ICPS R&D Grant</span>
          <span className="badge badge-gold">Single-Window Review</span>
        </div>
        <div className="form-hero-content mt-12">
          <div className="hero-icon-pill-lg">
            <Cpu size={28} className="text-emerald" />
          </div>
          <div>
            <h2 className="form-hero-title">Technology Development Project (TDP) Proposal Submission</h2>
            <p className="form-hero-desc">
              Structured single-window application for translation of foundational CPS research into mission-ready prototypes.
            </p>
          </div>
        </div>
      </div>

      {/* 7-Step Horizontal Stepper Header */}
      <div className="card tdp-stepper-progress-card mt-16">
        <div className="stepper-track-flex">
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div 
                key={step.id} 
                className={`stepper-node-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  if (step.id < currentStep) {
                    setCurrentStep(step.id);
                  }
                }}
              >
                <div className="step-circle-badge">
                  {isCompleted ? <Check size={14} /> : <span>{step.id}</span>}
                </div>
                <div className="step-label-group">
                  <span className="step-main-title">{step.title}</span>
                  <span className="step-sub-title">{step.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Multi-Step Form Body */}
      <div className="card tdp-form-body-card mt-16">
        {/* STEP 1: Applicant Details */}
        {currentStep === 1 && (
          <div className="step-form-section animate-fade-in">
            <div className="step-section-header">
              <div className="step-num-pill">Step 01</div>
              <div style={{ flex: 1 }}>
                <h3 className="step-heading">Applicant & Institutional Details</h3>
                <p className="step-subtext">Provide the Principal Investigator (PI) and institutional governance credentials.</p>
              </div>
              <div className="step-header-actions">
                <button 
                  type="button" 
                  className="btn-header-action" 
                  onClick={handleResetForm}
                  title="Clear all fields"
                >
                  <RotateCcw size={13} />
                  <span>Clear Form</span>
                </button>
                <button 
                  type="button" 
                  className="btn-header-action btn-header-sample" 
                  onClick={handleFillDemoData}
                  title="Load demo sample proposal"
                >
                  <Sparkles size={13} />
                  <span>Fill Sample Data</span>
                </button>
              </div>
            </div>

            <div className="form-grid-2-col mt-16">
              <div className="form-field-group">
                <label className="form-label required">Principal Investigator (Applicant Name)</label>
                <input 
                  type="text" 
                  className={`form-control-input ${validationErrors.applicantName ? 'input-error' : ''}`}
                  placeholder="e.g. Prof. S. Ananth / Dr. Rajesh Verma"
                  value={formData.applicantName}
                  onChange={(e) => updateField('applicantName', e.target.value)}
                />
                {validationErrors.applicantName && <span className="field-error-text">{validationErrors.applicantName}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Organization / Institution</label>
                <input 
                  type="text" 
                  className={`form-control-input ${validationErrors.organization ? 'input-error' : ''}`}
                  placeholder="e.g. IIT Tirupati / CSIR Lab / ABC Tech Pvt Ltd"
                  value={formData.organization}
                  onChange={(e) => updateField('organization', e.target.value)}
                />
                {validationErrors.organization && <span className="field-error-text">{validationErrors.organization}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Department / Center</label>
                <input 
                  type="text" 
                  className={`form-control-input ${validationErrors.department ? 'input-error' : ''}`}
                  placeholder="e.g. Dept. of Electrical Engineering / Robotics Lab"
                  value={formData.department}
                  onChange={(e) => updateField('department', e.target.value)}
                />
                {validationErrors.department && <span className="field-error-text">{validationErrors.department}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Designation / Role</label>
                <input 
                  type="text" 
                  className={`form-control-input ${validationErrors.designation ? 'input-error' : ''}`}
                  placeholder="e.g. Associate Professor & PI"
                  value={formData.designation}
                  onChange={(e) => updateField('designation', e.target.value)}
                />
                {validationErrors.designation && <span className="field-error-text">{validationErrors.designation}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Official Institutional Email</label>
                <input 
                  type="email" 
                  className={`form-control-input ${validationErrors.email ? 'input-error' : ''}`}
                  placeholder="e.g. pi@institution.ac.in"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
                {validationErrors.email && <span className="field-error-text">{validationErrors.email}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Mobile Number</label>
                <input 
                  type="tel" 
                  className={`form-control-input ${validationErrors.mobile ? 'input-error' : ''}`}
                  value={formData.mobile}
                  onChange={(e) => updateField('mobile', e.target.value)}
                />
                {validationErrors.mobile && <span className="field-error-text">{validationErrors.mobile}</span>}
              </div>

              <div className="form-field-group full-width">
                <label className="form-label required">Applicant Category / Stakeholder Type</label>
                <select 
                  className="form-control-select"
                  value={formData.applicantType}
                  onChange={(e) => updateField('applicantType', e.target.value)}
                >
                  <option value="Academic Institution / Faculty">Academic Institution / Faculty Investigator</option>
                  <option value="Autonomous R&D Lab">Autonomous R&D Lab (CSIR/DRDO/ISRO affiliate)</option>
                  <option value="Deep-Tech Startup">Deep-Tech Startup (with TRL 3 hardware PoC)</option>
                  <option value="Public-Private Consortium">Public-Private Technology Consortium</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Project Details */}
        {currentStep === 2 && (
          <div className="step-form-section animate-fade-in">
            <div className="step-section-header">
              <div className="step-num-pill">Step 02</div>
              <div>
                <h3 className="step-heading">Project Scope & Problem Statement</h3>
                <p className="step-subtext">Define the core scientific and engineering novelty of the proposal.</p>
              </div>
            </div>

            <div className="form-grid-2-col mt-16">
              <div className="form-field-group full-width">
                <label className="form-label required">Project Title</label>
                <input 
                  type="text" 
                  className={`form-control-input ${validationErrors.projectTitle ? 'input-error' : ''}`}
                  placeholder="Enter full technical project title..."
                  value={formData.projectTitle}
                  onChange={(e) => updateField('projectTitle', e.target.value)}
                />
                {validationErrors.projectTitle && <span className="field-error-text">{validationErrors.projectTitle}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Technology Domain</label>
                <select 
                  className="form-control-select"
                  value={formData.technologyDomain}
                  onChange={(e) => updateField('technologyDomain', e.target.value)}
                >
                  <option value="PNT / NavIC / GNSS">PNT / NavIC / GNSS</option>
                  <option value="Geo-Intelligence">Geo-Intelligence</option>
                  <option value="GIS / Remote Sensing">GIS / Remote Sensing</option>
                  <option value="Computer Vision / GeoAI">Computer Vision / GeoAI</option>
                  <option value="Embedded Systems">Embedded Systems</option>
                  <option value="IoT / Sensor Fusion">IoT / Sensor Fusion</option>
                  <option value="Digital Twin">Digital Twin</option>
                  <option value="Spatial Intelligence">Spatial Intelligence</option>
                </select>
              </div>

              <div className="form-field-group">
                <label className="form-label">TRL Progression Gate</label>
                <div className="trl-selector-row">
                  <div className="trl-sel-item">
                    <span>Entry TRL:</span>
                    <select 
                      className="form-control-select font-mono"
                      value={formData.currentTrl}
                      onChange={(e) => updateField('currentTrl', parseInt(e.target.value, 10))}
                    >
                      <option value={2}>TRL 2 (Concept)</option>
                      <option value={3}>TRL 3 (Proof of Concept)</option>
                      <option value={4}>TRL 4 (Lab Validation)</option>
                    </select>
                  </div>
                  <div className="trl-sel-item">
                    <span>Target TRL:</span>
                    <select 
                      className="form-control-select font-mono"
                      value={formData.targetTrl}
                      onChange={(e) => updateField('targetTrl', parseInt(e.target.value, 10))}
                    >
                      <option value={5}>TRL 5 (Environment Validated)</option>
                      <option value={6}>TRL 6 (Field Prototype)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-field-group full-width">
                <label className="form-label required">Problem Statement</label>
                <textarea 
                  rows={3}
                  className={`form-control-textarea ${validationErrors.problemStatement ? 'input-error' : ''}`}
                  placeholder="Detail the exact technical limitation, operational challenge, or national strategic gap addressed..."
                  value={formData.problemStatement}
                  onChange={(e) => updateField('problemStatement', e.target.value)}
                />
                {validationErrors.problemStatement && <span className="field-error-text">{validationErrors.problemStatement}</span>}
              </div>

              <div className="form-field-group full-width">
                <label className="form-label required">Project Background & Prior Work</label>
                <textarea 
                  rows={2}
                  className="form-control-textarea"
                  placeholder="Briefly state baseline research, patents, or exploratory laboratory prototypes completed prior to this proposal..."
                  value={formData.background}
                  onChange={(e) => updateField('background', e.target.value)}
                />
              </div>

              <div className="form-field-group full-width">
                <label className="form-label required">Project Aim & Targeted Objectives</label>
                <textarea 
                  rows={2}
                  className={`form-control-textarea ${validationErrors.aim ? 'input-error' : ''}`}
                  placeholder="State the primary translational aim of the project..."
                  value={formData.aim}
                  onChange={(e) => updateField('aim', e.target.value)}
                />
                {validationErrors.aim && <span className="field-error-text">{validationErrors.aim}</span>}
              </div>

              <div className="form-field-group full-width">
                <label className="form-label required">Proposed Technical Solution</label>
                <textarea 
                  rows={3}
                  className={`form-control-textarea ${validationErrors.proposedSolution ? 'input-error' : ''}`}
                  placeholder="Describe your proposed architecture, subsystem components, and translation pathway..."
                  value={formData.proposedSolution}
                  onChange={(e) => updateField('proposedSolution', e.target.value)}
                />
                {validationErrors.proposedSolution && <span className="field-error-text">{validationErrors.proposedSolution}</span>}
              </div>

              <div className="form-field-group full-width">
                <label className="form-label required">Innovation / Novelty & National Significance</label>
                <textarea 
                  rows={2}
                  className={`form-control-textarea ${validationErrors.innovation ? 'input-error' : ''}`}
                  placeholder="Highlight what makes your solution technically superior to existing global solutions..."
                  value={formData.innovation}
                  onChange={(e) => updateField('innovation', e.target.value)}
                />
                {validationErrors.innovation && <span className="field-error-text">{validationErrors.innovation}</span>}
              </div>

              <div className="form-field-group full-width">
                <label className="form-label">Expected Tangible Outcomes</label>
                <textarea 
                  rows={2}
                  className="form-control-textarea"
                  placeholder="Expected prototypes, hardware boards, patent filings, or open algorithms generated..."
                  value={formData.expectedOutcomes}
                  onChange={(e) => updateField('expectedOutcomes', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Technical Details */}
        {currentStep === 3 && (
          <div className="step-form-section animate-fade-in">
            <div className="step-section-header">
              <div className="step-num-pill">Step 03</div>
              <div>
                <h3 className="step-heading">Technical Methodology & Testbed Requirements</h3>
                <p className="step-subtext">Specify hardware, software, dataset needs, and IITTNiF laboratory integration.</p>
              </div>
            </div>

            <div className="form-grid-2-col mt-16">
              <div className="form-field-group full-width">
                <label className="form-label required">Detailed Methodology & Experimental Workflow</label>
                <textarea 
                  rows={3}
                  className={`form-control-textarea ${validationErrors.methodology ? 'input-error' : ''}`}
                  placeholder="Step-by-step experimental design, algorithm formulation, circuit modeling, and fabrication strategy..."
                  value={formData.methodology}
                  onChange={(e) => updateField('methodology', e.target.value)}
                />
                {validationErrors.methodology && <span className="field-error-text">{validationErrors.methodology}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Hardware & Tooling Requirements</label>
                <textarea 
                  rows={3}
                  className={`form-control-textarea ${validationErrors.hardwareRequirements ? 'input-error' : ''}`}
                  placeholder="ASICs, FPGA chips, PCB components, RF amplifiers, sensors, thermal test chambers..."
                  value={formData.hardwareRequirements}
                  onChange={(e) => updateField('hardwareRequirements', e.target.value)}
                />
                {validationErrors.hardwareRequirements && <span className="field-error-text">{validationErrors.hardwareRequirements}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Software & Computing Stack</label>
                <textarea 
                  rows={3}
                  className={`form-control-textarea ${validationErrors.softwareRequirements ? 'input-error' : ''}`}
                  placeholder="Simulation suites, EDA software, deep learning frameworks, embedded toolchains..."
                  value={formData.softwareRequirements}
                  onChange={(e) => updateField('softwareRequirements', e.target.value)}
                />
                {validationErrors.softwareRequirements && <span className="field-error-text">{validationErrors.softwareRequirements}</span>}
              </div>

              <div className="form-field-group full-width">
                <label className="form-label">Dataset / Telemetry Data Requirements</label>
                <textarea 
                  rows={2}
                  className="form-control-textarea"
                  placeholder="Satellite imagery, NavIC RF raw dumps, GIS layers, sensor telemetry benchmarks..."
                  value={formData.datasetRequirements}
                  onChange={(e) => updateField('datasetRequirements', e.target.value)}
                />
              </div>

              <div className="form-field-group full-width">
                <label className="form-label">Target IITTNiF Specialized Testbeds Required</label>
                <div className="testbed-checkbox-grid">
                  {[
                    'PNT (Positioning, Navigation & Timing) Testbed',
                    'Geo-Intelligence & Spatial GIS Suites',
                    'Edge AI & Autonomous Vision Framework',
                    'Industrial IoT & Sensor Instrumentation'
                  ].map((testbed) => {
                    const isChecked = formData.labTestbedRequirements?.includes(testbed);
                    return (
                      <label key={testbed} className={`testbed-check-item ${isChecked ? 'selected' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateField('labTestbedRequirements', [...(formData.labTestbedRequirements || []), testbed]);
                            } else {
                              updateField('labTestbedRequirements', (formData.labTestbedRequirements || []).filter(t => t !== testbed));
                            }
                          }}
                        />
                        <span>{testbed}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="form-field-group full-width">
                <label className="form-label">Industry Collaboration / Deployment Strategy</label>
                <textarea 
                  rows={2}
                  className="form-control-textarea"
                  placeholder="Indicate industry partners identified for co-development, technology transfer, or commercial testing..."
                  value={formData.industryCollaborationRequirement}
                  onChange={(e) => updateField('industryCollaborationRequirement', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Project Plan */}
        {currentStep === 4 && (
          <div className="step-form-section animate-fade-in">
            <div className="step-section-header">
              <div className="step-num-pill">Step 04</div>
              <div>
                <h3 className="step-heading">Project Execution Plan & Team</h3>
                <p className="step-subtext">Structure project duration, quarterly milestones, deliverables, and investigative team.</p>
              </div>
            </div>

            <div className="form-grid-2-col mt-16">
              <div className="form-field-group">
                <label className="form-label required">Target Start Date</label>
                <input 
                  type="date" 
                  className={`form-control-input ${validationErrors.startDate ? 'input-error' : ''}`}
                  value={formData.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                />
                {validationErrors.startDate && <span className="field-error-text">{validationErrors.startDate}</span>}
              </div>

              <div className="form-field-group">
                <label className="form-label required">Expected Duration</label>
                <select 
                  className="form-control-select"
                  value={formData.expectedDurationMonths}
                  onChange={(e) => updateField('expectedDurationMonths', parseInt(e.target.value, 10))}
                >
                  <option value={6}>6 Months (Fast-Track PoC)</option>
                  <option value={12}>12 Months (1 Year Standard)</option>
                  <option value={18}>18 Months (Comprehensive Hardware Translation)</option>
                  <option value={24}>24 Months (2 Year Mission Project)</option>
                </select>
              </div>

              <div className="form-field-group full-width">
                <label className="form-label required">Principal Investigator / Faculty Anchor</label>
                <input 
                  type="text" 
                  className={`form-control-input ${validationErrors.facultyMentorPI ? 'input-error' : ''}`}
                  placeholder="e.g. Prof. S. Ananth (Lead Investigator)"
                  value={formData.facultyMentorPI}
                  onChange={(e) => updateField('facultyMentorPI', e.target.value)}
                />
              </div>

              {/* Milestones dynamic list */}
              <div className="form-field-group full-width mt-10">
                <div className="dynamic-list-header">
                  <label className="form-label required">Quarterly Target Milestones</label>
                  <button type="button" className="btn-add-item" onClick={handleAddMilestone}>
                    <Plus size={14} />
                    <span>Add Milestone</span>
                  </button>
                </div>

                <div className="dynamic-items-stack">
                  {formData.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="dynamic-row-card">
                      <input 
                        type="text" 
                        className="form-control-input font-mono flex-shrink-0" 
                        style={{ width: '120px' }}
                        value={m.month}
                        placeholder="Month XX"
                        onChange={(e) => handleUpdateMilestone(mIdx, 'month', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-control-input flex-1" 
                        placeholder="Milestone Title..."
                        value={m.title}
                        onChange={(e) => handleUpdateMilestone(mIdx, 'title', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-control-input flex-1" 
                        placeholder="Target Evidence / Output..."
                        value={m.targetOutput}
                        onChange={(e) => handleUpdateMilestone(mIdx, 'targetOutput', e.target.value)}
                      />
                      {formData.milestones.length > 1 && (
                        <button type="button" className="btn-remove-item" onClick={() => handleRemoveMilestone(mIdx)}>
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables dynamic list */}
              <div className="form-field-group full-width mt-10">
                <div className="dynamic-list-header">
                  <label className="form-label required">Key Project Deliverables</label>
                  <button type="button" className="btn-add-item" onClick={handleAddDeliverable}>
                    <Plus size={14} />
                    <span>Add Deliverable</span>
                  </button>
                </div>

                <div className="dynamic-items-stack">
                  {formData.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="dynamic-row-card">
                      <input 
                        type="text" 
                        className="form-control-input font-mono flex-shrink-0" 
                        style={{ width: '80px' }}
                        value={d.code}
                        placeholder="D1"
                        onChange={(e) => handleUpdateDeliverable(dIdx, 'code', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-control-input flex-1" 
                        placeholder="Deliverable Description (Hardware/Firmware/Report)..."
                        value={d.description}
                        onChange={(e) => handleUpdateDeliverable(dIdx, 'description', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-control-input font-mono flex-shrink-0" 
                        style={{ width: '120px' }}
                        value={d.timeline}
                        placeholder="Month XX"
                        onChange={(e) => handleUpdateDeliverable(dIdx, 'timeline', e.target.value)}
                      />
                      {formData.deliverables.length > 1 && (
                        <button type="button" className="btn-remove-item" onClick={() => handleRemoveDeliverable(dIdx)}>
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members dynamic list */}
              <div className="form-field-group full-width mt-10">
                <div className="dynamic-list-header">
                  <label className="form-label">Key Team Members & Co-Investigators</label>
                  <button type="button" className="btn-add-item" onClick={handleAddTeamMember}>
                    <Plus size={14} />
                    <span>Add Member</span>
                  </button>
                </div>

                <div className="dynamic-items-stack">
                  {formData.teamMembers.map((member, memberIdx) => (
                    <div key={memberIdx} className="dynamic-row-card">
                      <input 
                        type="text" 
                        className="form-control-input flex-1" 
                        placeholder="Member Full Name..."
                        value={member.name}
                        onChange={(e) => handleUpdateTeamMember(memberIdx, 'name', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-control-input flex-1" 
                        placeholder="Role (e.g. Co-PI / RF Engineer)..."
                        value={member.role}
                        onChange={(e) => handleUpdateTeamMember(memberIdx, 'role', e.target.value)}
                      />
                      <input 
                        type="email" 
                        className="form-control-input flex-1" 
                        placeholder="Email Address..."
                        value={member.email}
                        onChange={(e) => handleUpdateTeamMember(memberIdx, 'email', e.target.value)}
                      />
                      {formData.teamMembers.length > 1 && (
                        <button type="button" className="btn-remove-item" onClick={() => handleRemoveTeamMember(memberIdx)}>
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Documents */}
        {currentStep === 5 && (
          <div className="step-form-section animate-fade-in">
            <div className="step-section-header">
              <div className="step-num-pill">Step 05</div>
              <div>
                <h3 className="step-heading">Supporting Documents & Proposal Uploads</h3>
                <p className="step-subtext">Attach your detailed technical proposal, budget BOM, and institutional endorsement.</p>
              </div>
            </div>

            {/* Dropzone Upload Area */}
            <div className="document-upload-dropzone mt-16">
              <input 
                type="file" 
                id="tdp-file-upload-input"
                multiple
                accept=".pdf,.docx,.doc,.xlsx,.zip"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="tdp-file-upload-input" className="dropzone-label-area">
                <div className="dropzone-icon-badge">
                  <Upload size={24} className="text-emerald" />
                </div>
                <h4>Drag & Drop or Click to Upload Proposal Documents</h4>
                <p>Supported Formats: PDF, DOCX, XLSX, ZIP (Max 25 MB per file)</p>
                <span className="btn btn-outline btn-sm mt-8">Browse Files</span>
              </label>
            </div>

            {validationErrors.documents && (
              <span className="field-error-text mt-8 block">{validationErrors.documents}</span>
            )}

            {/* Uploaded Files Table */}
            <div className="uploaded-docs-container mt-16">
              <h4 className="docs-list-title">Attached Application Files ({formData.documents.length})</h4>
              <div className="docs-table-stack mt-10">
                {formData.documents.map((doc, docIdx) => (
                  <div key={docIdx} className="uploaded-file-row">
                    <div className="file-info-col">
                      <div className="file-icon-box">
                        <FileText size={18} className="text-emerald" />
                      </div>
                      <div>
                        <span className="file-name-heading">{doc.fileName}</span>
                        <span className="file-type-sub font-mono">{doc.documentType} • {doc.fileSize}</span>
                      </div>
                    </div>

                    <div className="file-actions-col">
                      <span className="badge badge-emerald">Ready for Upload</span>
                      <button 
                        type="button" 
                        className="btn-remove-file"
                        onClick={() => handleRemoveDocument(docIdx)}
                        title="Remove Document"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Declaration */}
        {currentStep === 6 && (
          <div className="step-form-section animate-fade-in">
            <div className="step-section-header">
              <div className="step-num-pill">Step 06</div>
              <div>
                <h3 className="step-heading">Institutional Declaration & Undertaking</h3>
                <p className="step-subtext">Review the mandatory NM-ICPS and IITTNiF compliance declarations.</p>
              </div>
            </div>

            <div className="declaration-clauses-box mt-16">
              <div className="declaration-clause-item">
                <ShieldCheck size={18} className="text-emerald flex-shrink-0" />
                <p>
                  <strong>Accuracy of Technical Submissions:</strong> I certify that all scientific statements, prior laboratory TRL claims, and proposed methodologies are true, authentic, and verifiable.
                </p>
              </div>

              <div className="declaration-clause-item">
                <ShieldCheck size={18} className="text-emerald flex-shrink-0" />
                <p>
                  <strong>Non-Duplication of Public Grants:</strong> The proposed technology development scope is not funded or under dual-sanction by any other DST, MeitY, or SERB grant scheme.
                </p>
              </div>

              <div className="declaration-clause-item">
                <ShieldCheck size={18} className="text-emerald flex-shrink-0" />
                <p>
                  <strong>NM-ICPS IP & Technology Transfer Policy:</strong> Any patentable intellectual property created through TDP grants shall be governed by IITTNiF Technology Transfer and IP sharing frameworks.
                </p>
              </div>

              <div className="declaration-clause-item">
                <ShieldCheck size={18} className="text-emerald flex-shrink-0" />
                <p>
                  <strong>Milestone Reviews & Testbed Sop:</strong> The investigative team agrees to participate in quarterly technical milestone reviews and adhere to laboratory SOPs.
                </p>
              </div>
            </div>

            <div className="declaration-acceptance-row mt-20">
              <label className="checkbox-acceptance-label">
                <input 
                  type="checkbox" 
                  checked={formData.declarationAccepted}
                  onChange={(e) => updateField('declarationAccepted', e.target.checked)}
                />
                <span className="acceptance-text">
                  I, as the authorized Principal Investigator / Representative, accept all terms, conditions, and IP declarations stated above.
                </span>
              </label>
              {validationErrors.declarationAccepted && (
                <span className="field-error-text mt-4 block">{validationErrors.declarationAccepted}</span>
              )}
            </div>

            <div className="form-field-group mt-16" style={{ maxWidth: '400px' }}>
              <label className="form-label required">Authorized Signatory Full Name</label>
              <input 
                type="text" 
                className={`form-control-input ${validationErrors.authorizedSigner ? 'input-error' : ''}`}
                placeholder="e.g. Prof. S. Ananth"
                value={formData.authorizedSigner}
                onChange={(e) => updateField('authorizedSigner', e.target.value)}
              />
              {validationErrors.authorizedSigner && (
                <span className="field-error-text">{validationErrors.authorizedSigner}</span>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: Review & Submit */}
        {currentStep === 7 && (
          <div className="step-form-section animate-fade-in">
            <div className="step-section-header">
              <div className="step-num-pill">Step 07</div>
              <div>
                <h3 className="step-heading">Final Review & Proposal Submission</h3>
                <p className="step-subtext">Verify all proposal sections before transmitting to the IITTNiF Evaluation Board.</p>
              </div>
            </div>

            <div className="review-summary-stack mt-16">
              {/* Section 1 Review */}
              <div className="review-summary-card">
                <div className="review-card-top">
                  <h4>1. Applicant & Institution</h4>
                  <button className="btn-edit-step" onClick={() => setCurrentStep(1)}>Edit</button>
                </div>
                <div className="review-details-grid">
                  <div><span>Applicant:</span> <strong>{formData.applicantName}</strong></div>
                  <div><span>Organization:</span> <strong>{formData.organization}</strong></div>
                  <div><span>Department:</span> <strong>{formData.department}</strong></div>
                  <div><span>Category:</span> <strong>{formData.applicantType}</strong></div>
                  <div><span>Email:</span> <strong>{formData.email}</strong></div>
                  <div><span>Mobile:</span> <strong>{formData.mobile}</strong></div>
                </div>
              </div>

              {/* Section 2 Review */}
              <div className="review-summary-card">
                <div className="review-card-top">
                  <h4>2. Project Details & TRL Scope</h4>
                  <button className="btn-edit-step" onClick={() => setCurrentStep(2)}>Edit</button>
                </div>
                <div className="review-details-grid">
                  <div className="full-col"><span>Project Title:</span> <strong>{formData.projectTitle}</strong></div>
                  <div><span>Domain:</span> <strong>{formData.technologyDomain}</strong></div>
                  <div><span>TRL Progression:</span> <strong className="text-emerald">TRL {formData.currentTrl} → TRL {formData.targetTrl}</strong></div>
                  <div className="full-col"><span>Problem Statement:</span> <p>{formData.problemStatement}</p></div>
                  <div className="full-col"><span>Proposed Solution:</span> <p>{formData.proposedSolution}</p></div>
                </div>
              </div>

              {/* Section 3 Review */}
              <div className="review-summary-card">
                <div className="review-card-top">
                  <h4>3. Technical Details & Testbeds</h4>
                  <button className="btn-edit-step" onClick={() => setCurrentStep(3)}>Edit</button>
                </div>
                <div className="review-details-grid">
                  <div className="full-col"><span>Methodology:</span> <p>{formData.methodology}</p></div>
                  <div className="full-col"><span>Required Testbeds:</span> <strong>{formData.labTestbedRequirements?.join(', ') || 'None selected'}</strong></div>
                </div>
              </div>

              {/* Section 4 Review */}
              <div className="review-summary-card">
                <div className="review-card-top">
                  <h4>4. Project Plan & Milestones</h4>
                  <button className="btn-edit-step" onClick={() => setCurrentStep(4)}>Edit</button>
                </div>
                <div className="review-details-grid">
                  <div><span>Start Date:</span> <strong>{formData.startDate}</strong></div>
                  <div><span>Duration:</span> <strong>{formData.expectedDurationMonths} Months</strong></div>
                  <div><span>Lead PI:</span> <strong>{formData.facultyMentorPI}</strong></div>
                  <div><span>Milestones Count:</span> <strong>{formData.milestones.length} Milestones</strong></div>
                </div>
              </div>

              {/* Section 5 & 6 Review */}
              <div className="review-summary-card">
                <div className="review-card-top">
                  <h4>5 & 6. Uploaded Documents & Declaration</h4>
                  <button className="btn-edit-step" onClick={() => setCurrentStep(5)}>Edit</button>
                </div>
                <div className="review-details-grid">
                  <div className="full-col">
                    <span>Attached Documents ({formData.documents.length}):</span>
                    <strong>{formData.documents.map(d => d.fileName).join(', ')}</strong>
                  </div>
                  <div><span>Declaration Status:</span> <strong className="text-emerald">Accepted & Electronically Certified</strong></div>
                  <div><span>Authorized Signatory:</span> <strong>{formData.authorizedSigner}</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stepper Navigation Actions Bar */}
        <div className="stepper-actions-footer mt-24">
          {currentStep > 1 && (
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={handlePrevStep}
              disabled={isSubmitting}
            >
              <ArrowLeft size={16} />
              <span>Previous Step</span>
            </button>
          )}

          {currentStep < 7 ? (
            <button 
              type="button" 
              className="btn btn-primary-cta ml-auto"
              onClick={handleNextStep}
            >
              <span>Save & Proceed to Step 0{currentStep + 1}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              type="button" 
              className="btn btn-primary-cta ml-auto"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-sm"></span>
                  <span>Transmitting Proposal...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Submit TDP Proposal</span>
                  <CheckCircle size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
        </>
      )}

      {/* Auth Modal (if user is not logged in) */}
      {authModalOpen && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setAuthModalOpen(false)}>
          <div className="modal-content-card card animate-slide-up" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header-section" style={{ borderBottom: '2px solid #10b981' }}>
              <div className="modal-header-brand">
                <div className="modal-icon-bg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                  <Lock size={20} className="text-emerald" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Institutional Authentication</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sign in with your academic / organizational identity</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setAuthModalOpen(false)}><X size={18} /></button>
            </div>

            <div className="modal-body-scroll" style={{ padding: '20px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                TDP submissions require verification of your institutional identity (Faculty PI, Researcher, or Startup Founder).
              </p>

              <div className="quick-persona-login-grid mt-14" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  className="btn btn-outline w-full"
                  style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
                  onClick={() => {
                    setIsAuthenticated(true);
                    setAuthModalOpen(false);
                  }}
                >
                  <UserCheck size={16} className="text-emerald" />
                  <span>Continue as <strong>Prof. S. Ananth (Faculty PI)</strong></span>
                </button>

                <button 
                  className="btn btn-outline w-full"
                  style={{ justifyContent: 'flex-start', padding: '10px 14px' }}
                  onClick={() => {
                    setIsAuthenticated(true);
                    setAuthModalOpen(false);
                  }}
                >
                  <Building2 size={16} className="text-cyan" />
                  <span>Continue as <strong>Deep-Tech Startup Founder</strong></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS */}
      <style>{`
        .detail-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 20px;
          padding: 12px 20px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .btn-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-back-link:hover {
          color: #059669;
          border-color: #10b981;
          background-color: rgba(16, 185, 129, 0.08);
          transform: translateX(-2px);
        }

        .top-nav-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .top-nav-breadcrumb .breadcrumb-divider {
          color: #cbd5e1;
          font-size: 12px;
          user-select: none;
        }

        .tdp-form-hero-card {
          padding: 24px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          border: 1px solid var(--border-color);
        }

        .form-hero-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .form-hero-content {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .hero-icon-pill-lg {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .form-hero-title {
          font-size: 20px;
          font-weight: 900;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .form-hero-desc {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        /* 7-Step Horizontal Stepper */
        .tdp-stepper-progress-card {
          padding: 16px 20px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          border: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .stepper-track-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 820px;
          gap: 12px;
        }

        .stepper-node-item {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          opacity: 0.6;
          transition: all var(--transition-fast);
        }

        .stepper-node-item.active {
          opacity: 1;
        }

        .stepper-node-item.completed {
          opacity: 0.9;
        }

        .step-circle-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--bg-primary);
          border: 2px solid var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .stepper-node-item.active .step-circle-badge {
          background-color: #10b981;
          border-color: #10b981;
          color: #ffffff;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
        }

        .stepper-node-item.completed .step-circle-badge {
          background-color: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          color: #10b981;
        }

        .step-label-group {
          display: flex;
          flex-direction: column;
        }

        .step-main-title {
          font-size: 12px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .step-sub-title {
          font-size: 10px;
          color: var(--text-muted);
        }

        /* Form Body */
        .tdp-form-body-card {
          padding: 30px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .step-section-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .step-num-pill {
          padding: 4px 10px;
          background-color: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-sm);
          font-size: 11.5px;
          font-weight: 800;
          font-family: monospace;
        }

        .step-heading {
          font-size: 17px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 2px;
        }

        .step-subtext {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        .form-grid-2-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        @media (max-width: 768px) {
          .form-grid-2-col {
            grid-template-columns: 1fr;
          }
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .form-label.required::after {
          content: ' *';
          color: var(--color-danger);
        }

        .form-control-input,
        .form-control-select,
        .form-control-textarea {
          padding: 10px 14px;
          background-color: #ffffff;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-md);
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .form-control-input::placeholder,
        .form-control-textarea::placeholder {
          color: #94a3b8;
          font-style: italic;
          opacity: 0.85;
        }

        .step-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-header-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-header-action:hover {
          background: #f8fafc;
          color: #0f172a;
          border-color: #94a3b8;
        }

        .btn-header-sample {
          border-color: #fde68a;
          background: #fffbeb;
          color: #b45309;
        }

        .btn-header-sample:hover {
          background: #fef3c7;
          border-color: #fcd34d;
        }

        .form-control-input:focus,
        .form-control-select:focus,
        .form-control-textarea:focus {
          border-color: #10b981;
          outline: none;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
          background-color: #ffffff;
        }

        .input-error {
          border-color: var(--color-danger) !important;
          background-color: rgba(239, 68, 68, 0.04);
        }

        .field-error-text {
          font-size: 11.5px;
          color: var(--color-danger);
          font-weight: 600;
        }

        .trl-selector-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .trl-sel-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--text-secondary);
        }

        /* Testbed checkboxes */
        .testbed-checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 10px;
        }

        .testbed-check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .testbed-check-item.selected {
          border-color: #10b981;
          background-color: rgba(16, 185, 129, 0.08);
        }

        /* Dynamic lists */
        .dynamic-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .btn-add-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #10b981;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .dynamic-items-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .dynamic-row-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .btn-remove-item {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          transition: color var(--transition-fast);
        }

        .btn-remove-item:hover {
          color: var(--color-danger);
        }

        /* Document Dropzone */
        .document-upload-dropzone {
          border: 2px dashed var(--border-color);
          border-radius: 14px;
          padding: 36px 20px;
          text-align: center;
          background-color: var(--bg-primary);
          transition: all var(--transition-fast);
        }

        .document-upload-dropzone:hover {
          border-color: #10b981;
          background-color: rgba(16, 185, 129, 0.04);
        }

        .dropzone-label-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        .dropzone-icon-badge {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .dropzone-label-area h4 {
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .dropzone-label-area p {
          font-size: 12px;
          color: var(--text-muted);
          margin: 0;
        }

        .docs-table-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .uploaded-file-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 10px;
        }

        .file-info-col {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .file-icon-box {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background-color: rgba(16, 185, 129, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-name-heading {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
          display: block;
        }

        .file-type-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        .file-actions-col {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-remove-file {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }

        .btn-remove-file:hover {
          color: var(--color-danger);
        }

        /* Declaration */
        .declaration-clauses-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
        }

        .declaration-clause-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .declaration-clause-item p {
          font-size: 13px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        .declaration-clause-item strong {
          color: var(--text-primary);
        }

        .checkbox-acceptance-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
        }

        .acceptance-text {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.45;
        }

        /* Review Summary */
        .review-summary-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .review-summary-card {
          padding: 18px 20px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .review-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
          margin-bottom: 12px;
        }

        .review-card-top h4 {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .btn-edit-step {
          background: transparent;
          border: none;
          color: #10b981;
          font-weight: 700;
          font-size: 12.5px;
          cursor: pointer;
        }

        .review-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          font-size: 13px;
        }

        .review-details-grid .full-col {
          grid-column: 1 / -1;
        }

        .review-details-grid span {
          color: var(--text-muted);
          font-size: 11.5px;
          display: block;
          margin-bottom: 2px;
        }

        /* Footer */
        .stepper-actions-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }

        /* Receipt Card */
        .tdp-success-receipt-card {
          padding: 40px;
          background-color: var(--bg-surface);
          border-radius: 18px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
          max-width: 860px;
          margin: 0 auto;
        }

        .success-header-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-check-badge {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.15);
          border: 2px solid #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .receipt-main-title {
          font-size: 24px;
          font-weight: 900;
          color: var(--text-primary);
          margin: 12px 0 6px;
        }

        .receipt-subtext {
          font-size: 14px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0;
          line-height: 1.5;
        }

        .receipt-app-number-box {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 18px 24px;
          background-color: var(--bg-primary);
          border: 1.5px solid #10b981;
          border-radius: 14px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .app-no-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .app-no-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .app-no-flex {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .app-no-code {
          font-size: 20px;
          font-weight: 900;
          color: #10b981;
        }

        .btn-copy-code {
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--text-primary);
          padding: 4px;
          cursor: pointer;
        }

        .app-meta-sep {
          width: 1px;
          height: 36px;
          background-color: var(--border-color);
        }

        .receipt-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 18px 20px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .receipt-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 13px;
        }

        .receipt-cell span {
          font-size: 11px;
          color: var(--text-muted);
        }

        .receipt-next-steps-box {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 18px 20px;
        }

        .next-steps-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .next-steps-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12.5px;
          color: var(--text-secondary);
        }

        .next-steps-list strong {
          color: var(--text-primary);
        }

        .receipt-action-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
