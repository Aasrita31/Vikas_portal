import React, { useState, useRef } from 'react';
import { 
  FileText, 
  CheckCircle, 
  RefreshCw, 
  Layers, 
  UploadCloud, 
  Trash2, 
  Eye, 
  Paperclip,
  CheckCircle2,
  Rocket,
  GraduationCap,
  School,
  Building2,
  Briefcase,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  User,
  Mail,
  Phone,
  Compass,
  Target,
  Check,
  AlertCircle,
  HelpCircle,
  FileCheck,
  Clock,
  Lock,
  EyeOff,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function OnboardingForm({ 
  onSubmitApplication, 
  onDirtyChange, 
  onNavigateToLogin,
  onNavigateToDashboard 
}) {
  const { register, authFetch, loading: authLoading } = useAuth();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // 7-Section Form State (Starts completely blank - no prefilled mock personas)
  const [formData, setFormData] = useState({
    // Section 1: Basic Details
    name: '',
    organization: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',

    // Section 2: Stakeholder Type (Select one - Default unselected)
    stakeholderType: '',
    otherStakeholderType: '',

    // Section 3: Domain Selection (Multiple choice - initially empty)
    domains: [],
    otherDomain: '',

    // Section 4: Intent of Engagement (Single choice, initially unselected)
    intentOfEngagement: '',
    otherIntent: '',

    // Section 5: Detailed Inputs (Dynamic based on type)
    // Startup
    startupStage: 'Prototype',
    startupDomain: '',
    startupTeamSize: '1 - 5',
    startupPreviousWork: '',

    // Expert
    expertAreaOfExpertise: '',
    expertExperience: '',
    expertAffiliation: '',
    expertWillingness: ['Mentor'],

    // Institution
    institutionType: 'University',
    institutionInterest: ['SPIN Lab'],

    // Student / Researcher
    studentProgram: 'Ph.D. / Research Scholar',
    studentDepartment: '',

    // School
    schoolCurriculum: 'CBSE',
    schoolInterest: 'VidyaGIS & Spatial Intelligence Lab',

    // Industry / Govt
    industryDepartment: '',
    industryEngagementMode: 'Collaborative R&D / Tech Transfer',

    // Other Stakeholder Type Details
    otherEntityCategory: '',
    otherFocusArea: '',
    otherEngagementDetails: '',

    // Section 6: Problem Statement / Interest
    problemStatement: '',

    // Section 7: Consent
    agreeToTerms: false,
    acknowledgeNonIncubation: false,

    // Document Attachment (Supporting)
    documentName: '',
    documentSize: '',
    documentUrl: ''
  });

  const [submittedData, setSubmittedData] = useState(null);

  // Dynamic Vertical Auto-Mapping Rule Engine preview
  const getMappedVerticals = () => {
    if (!formData.stakeholderType) return null;
    const st = formData.stakeholderType.toUpperCase();
    const doms = formData.domains.join(' ').toLowerCase();
    const intent = (formData.intentOfEngagement || '').toLowerCase();
    
    let primary = '6.2 Startups & Business Enablement';
    let additional = [];
    if (st.includes('STARTUP')) {
      primary = '6.2 Startups & Business Enablement';
      if (doms.includes('pnt') || doms.includes('navic') || doms.includes('sensor') || intent.includes('prototype') || doms.includes('cps') || doms.includes('drone')) {
        additional.push('6.1 Technology Development');
      }
    } else if (st.includes('STUDENT') || st.includes('RESEARCHER')) {
      primary = '6.3 Human Resource Development';
      if (doms.includes('pnt') || doms.includes('navic') || doms.includes('ai') || intent.includes('research') || intent.includes('grant')) {
        additional.push('6.1 Technology Development');
      }
    } else if (st.includes('SCHOOL')) {
      primary = '6.6 Schools & Academic Outreach (VidyaGIS)';
    } else if (st.includes('INSTITUTION')) {
      primary = '6.7 Institutions & Labs Network (SPIN Lab)';
    } else if (st.includes('INDUSTRY')) {
      primary = '6.8 Industry & Government Interface';
      if (intent.includes('r&d') || intent.includes('tech transfer') || intent.includes('prototype')) {
        additional.push('6.1 Technology Development');
      }
    } else if (st.includes('GOVERNMENT')) {
      primary = '6.8 Industry & Government Interface';
    } else if (st.includes('EXPERT')) {
      primary = '6.9 Experts & Advisory Network';
    }
    return { primary, additional };
  };

  // Track whether user has entered any unsaved details
  React.useEffect(() => {
    const isDirty = Boolean(
      !submittedData && (
        formData.name.trim() ||
        formData.organization.trim() ||
        formData.email.trim() ||
        formData.phone.trim() ||
        formData.location.trim() ||
        formData.password ||
        formData.stakeholderType ||
        formData.domains.length > 0 ||
        formData.intentOfEngagement ||
        formData.problemStatement.trim() ||
        formData.documentName
      )
    );
    if (onDirtyChange) {
      onDirtyChange(isDirty);
    }
  }, [formData, submittedData, onDirtyChange]);

  // Available Stakeholder Types
  const stakeholderTypes = [
    { 
      id: 'Startup', 
      title: 'Startup', 
      subtitle: 'Early-stage or growth deep-tech venture', 
      icon: Rocket,
      badge: 'Deep Tech',
      color: '#d97706'
    },
    { 
      id: 'Student / Researcher', 
      title: 'Student / Researcher', 
      subtitle: 'B.Tech, M.Tech, Ph.D. or Chanakya Fellow', 
      icon: GraduationCap,
      badge: 'Academic',
      color: '#2563eb'
    },
    { 
      id: 'School', 
      title: 'School', 
      subtitle: 'K-12 school or Atal Tinkering Lab', 
      icon: School,
      badge: 'Outreach',
      color: '#059669'
    },
    { 
      id: 'Institution', 
      title: 'Institution', 
      subtitle: 'College, University or Academic Center', 
      icon: Building2,
      badge: 'Network',
      color: '#7c3aed'
    },
    { 
      id: 'Industry', 
      title: 'Industry', 
      subtitle: 'Enterprise, MSME or R&D partner', 
      icon: Briefcase,
      badge: 'Commercial',
      color: '#b45309'
    },
    { 
      id: 'Government', 
      title: 'Government', 
      subtitle: 'Ministry, PSU, State or National Agency', 
      icon: ShieldCheck,
      badge: 'Public Sector',
      color: '#db2777'
    },
    { 
      id: 'Expert', 
      title: 'Expert', 
      subtitle: 'Domain specialist, scientist or mentor', 
      icon: Award,
      badge: 'Advisory',
      color: '#ca8a04'
    },
    { 
      id: 'Other', 
      title: 'Other', 
      subtitle: 'NGO, Community, Consortium or other entity', 
      icon: Compass,
      badge: 'Custom',
      color: '#8b5cf6'
    }
  ];

  // Available Domains
  const domainOptions = [
    'GIS / Remote Sensing',
    'Digital Twin',
    'NavIC / PNT',
    'AI / ML',
    'Drone Technologies',
    'Hydrology / Environment',
    'Others'
  ];

  // Available Intents of Engagement
  const intentOptions = [
    'Skill Development',
    'Project Participation',
    'Collaboration',
    'Technology Development',
    'Business Opportunity',
    'Mentorship / Expert Contribution',
    'Other'
  ];

  // Startup Stages
  const startupStages = ['Idea', 'Prototype', 'Revenue'];

  // Expert Willingness Options
  const expertWillingnessOptions = ['Mentor', 'Advisor', 'Reviewer'];

  // Institution Types & Interests
  const institutionTypes = ['College', 'University'];
  const institutionInterests = ['SPIN Lab', 'Training', 'Collaboration'];

  // Handle Stakeholder Type Selection
  const handleSelectStakeholder = (stakeholderId) => {
    setFormData(prev => ({
      ...prev,
      stakeholderType: prev.stakeholderType === stakeholderId ? '' : stakeholderId,
      otherStakeholderType: stakeholderId === 'Other' ? prev.otherStakeholderType : ''
    }));
    if (formErrors.stakeholderType) {
      setFormErrors(prev => ({ ...prev, stakeholderType: null }));
    }
  };

  // Handle Domain Selection (Multiple Choice)
  const toggleDomain = (domain) => {
    setFormData(prev => {
      const exists = prev.domains.includes(domain);
      const newDomains = exists 
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain];
      return { 
        ...prev, 
        domains: newDomains,
        otherDomain: exists && domain === 'Others' ? '' : prev.otherDomain
      };
    });
    if (formErrors.domains) {
      setFormErrors(prev => ({ ...prev, domains: null }));
    }
  };

  // Handle Intent Selection (Single Choice)
  const toggleIntent = (intent) => {
    setFormData(prev => ({
      ...prev,
      intentOfEngagement: prev.intentOfEngagement === intent ? '' : intent,
      otherIntent: prev.intentOfEngagement === intent ? '' : prev.otherIntent
    }));
    if (formErrors.intentOfEngagement) {
      setFormErrors(prev => ({ ...prev, intentOfEngagement: null }));
    }
    if (formErrors.otherIntent) {
      setFormErrors(prev => ({ ...prev, otherIntent: null }));
    }
  };

  // Handle Expert Willingness Toggle
  const toggleExpertWillingness = (w) => {
    setFormData(prev => {
      const exists = prev.expertWillingness.includes(w);
      const updated = exists 
        ? prev.expertWillingness.filter(item => item !== w)
        : [...prev.expertWillingness, w];
      return { ...prev, expertWillingness: updated };
    });
  };

  // Handle Institution Interest Toggle
  const toggleInstitutionInterest = (item) => {
    setFormData(prev => {
      const exists = prev.institutionInterest.includes(item);
      const updated = exists 
        ? prev.institutionInterest.filter(i => i !== item)
        : [...prev.institutionInterest, item];
      return { ...prev, institutionInterest: updated };
    });
  };

  // Generate Audit File Number
  const generateFileNumber = (type) => {
    const year = new Date().getFullYear();
    let verticalCode = 'GEN';
    switch (type) {
      case 'Startup': verticalCode = 'STARTUP'; break;
      case 'Student / Researcher': verticalCode = 'HRD'; break;
      case 'School': verticalCode = 'SCHOOL'; break;
      case 'Institution': verticalCode = 'LAB_NET'; break;
      case 'Industry': verticalCode = 'INDUSTRY'; break;
      case 'Government': verticalCode = 'GOVT'; break;
      case 'Expert': verticalCode = 'EXPERT'; break;
      case 'Other': verticalCode = 'OTHER'; break;
      default: verticalCode = 'PORTAL';
    }
    const serial = Math.floor(Math.random() * 900) + 100;
    return `VIKAS/${year}/${verticalCode}/ONBOARD/${serial}`;
  };

  // Handle Document File Processing
  const processUploadedFile = (file) => {
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      alert('File size exceeds 25 MB limit.');
      return;
    }

    const formattedSize = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    const previewUrl = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      documentName: file.name,
      documentSize: formattedSize,
      documentUrl: previewUrl
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processUploadedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processUploadedFile(file);
  };

  const handleRemoveFile = (e) => {
    e?.stopPropagation();
    if (formData.documentUrl) {
      try {
        URL.revokeObjectURL(formData.documentUrl);
      } catch (err) {
        // ignore
      }
    }
    setFormData(prev => ({
      ...prev,
      documentName: '',
      documentSize: '',
      documentUrl: ''
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Validate Form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Applicant name is required';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.name.trim())) {
      errors.name = 'Name should only contain letters and spaces (no special characters)';
    }

    if (!formData.organization.trim()) errors.organization = 'Organization / Institution is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }
    if (!formData.location.trim()) {
      errors.location = 'Location (City, State) is required';
    } else if (!/^[a-zA-Z0-9\s,.-]+$/.test(formData.location.trim())) {
      errors.location = 'Location should not contain special characters';
    }

    // Section 2: Stakeholder Type
    if (!formData.stakeholderType) {
      errors.stakeholderType = 'Please select a stakeholder type in Section 2';
    } else if (formData.stakeholderType === 'Other' && !formData.otherStakeholderType.trim()) {
      errors.otherStakeholderType = 'Please specify your other stakeholder type';
    }

    // Section 3: Domain Selection
    if (formData.domains.length === 0) {
      errors.domains = 'Please select at least one technology domain in Section 3';
    } else if (formData.domains.includes('Others') && !formData.otherDomain.trim()) {
      errors.otherDomain = 'Please specify your other domain';
    }

    // Section 4: Intent of Engagement
    if (!formData.intentOfEngagement || (Array.isArray(formData.intentOfEngagement) && formData.intentOfEngagement.length === 0)) {
      errors.intentOfEngagement = 'Please select your intent of engagement in Section 4';
    } else if (formData.intentOfEngagement === 'Other' && !formData.otherIntent.trim()) {
      errors.otherIntent = 'Please specify your other intent of engagement';
    }

    // Section 6: Problem Statement / Interest
    if (!formData.problemStatement.trim()) {
      errors.problemStatement = 'Please provide a brief problem statement or description of interest in Section 6';
    }

    // Section 1: Password Validation for account creation
    if (!formData.password) {
      errors.password = 'Password is required to create your account';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm your account password';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Section 7: Consent
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms to proceed';
    }

    if (!formData.acknowledgeNonIncubation) {
      errors.acknowledgeNonIncubation = 'You must acknowledge the non-incubation nature of engagement';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorKey = Object.keys(formErrors)[0];
      const errorElement = document.getElementById(`field-${firstErrorKey}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const fileNumber = generateFileNumber(formData.stakeholderType);
    const finalDocName = formData.documentName || null;
    const finalDocSize = formData.documentSize || null;

    // Build consolidated dynamic details object
    let dynamicSummary = {};
    if (formData.stakeholderType === 'Startup') {
      dynamicSummary = {
        category: 'Startup',
        stage: formData.startupStage,
        domain: formData.startupDomain || formData.domains.join(', '),
        teamSize: formData.startupTeamSize,
        previousWork: formData.startupPreviousWork
      };
    } else if (formData.stakeholderType === 'Expert') {
      dynamicSummary = {
        category: 'Expert',
        areaOfExpertise: formData.expertAreaOfExpertise,
        experience: formData.expertExperience,
        affiliation: formData.expertAffiliation,
        willingness: formData.expertWillingness
      };
    } else if (formData.stakeholderType === 'Institution') {
      dynamicSummary = {
        category: 'Institution',
        type: formData.institutionType,
        interest: formData.institutionInterest
      };
    } else if (formData.stakeholderType === 'Student / Researcher') {
      dynamicSummary = {
        category: 'Student / Researcher',
        program: formData.studentProgram,
        department: formData.studentDepartment
      };
    } else if (formData.stakeholderType === 'School') {
      dynamicSummary = {
        category: 'School',
        curriculum: formData.schoolCurriculum,
        interest: formData.schoolInterest
      };
    } else if (formData.stakeholderType === 'Other') {
      dynamicSummary = {
        category: `Other: ${formData.otherStakeholderType || 'Custom'}`,
        entityCategory: formData.otherEntityCategory,
        focusArea: formData.otherFocusArea,
        engagementDetails: formData.otherEngagementDetails
      };
    } else {
      dynamicSummary = {
        category: formData.stakeholderType,
        department: formData.industryDepartment,
        mode: formData.industryEngagementMode
      };
    }

    const mapped = getMappedVerticals();

    // Call real backend registration
    try {
      const regResult = await register({
        name: formData.name.trim(),
        organization: formData.organization.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        password: formData.password,
        stakeholderType: formData.stakeholderType,
        domains: formData.domains,
        intentOfEngagement: formData.intentOfEngagement,
        problemStatement: formData.problemStatement,
        dynamicInputs: dynamicSummary
      });

      const registeredApp = regResult.application || {
        name: formData.name,
        applicantName: formData.name,
        contactPerson: formData.name,
        organization: formData.organization,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        stakeholderType: formData.stakeholderType,
        domains: formData.domains,
        intentOfEngagement: formData.intentOfEngagement,
        dynamicInputs: dynamicSummary,
        problemStatement: formData.problemStatement,
        userId: regResult.user?.id || 'usr_app_registered',
        user_id: regResult.user?.id || 'usr_app_registered',
        documentName: finalDocName,
        documentSize: finalDocSize,
        documentUrl: formData.documentUrl,
        fileNumber,
        status: 'pending_screening',
        assignedVertical: mapped?.primary || '6.2 Startups & Business Enablement',
        assignedVerticals: [mapped?.primary || '6.2 Startups & Business Enablement', ...(mapped?.additional || [])],
        submissionDate: new Date().toLocaleDateString('en-GB'),
        isStrategic: formData.stakeholderType === 'Government' || formData.stakeholderType === 'Industry',
        history: [
          {
            date: new Date().toLocaleString('en-GB'),
            action: 'Account Created & File Submitted',
            user: `${formData.name} (Applicant)`,
            details: `Registered as ${formData.stakeholderType}. Auto-mapped to vertical: ${mapped?.primary}. Awaiting initial operations screening.`
          }
        ]
      };

      if (onSubmitApplication) {
        onSubmitApplication(registeredApp);
      }

      setSubmittedData(registeredApp);
    } catch (err) {
      setFormErrors({ api: err.message || 'Registration failed. Please check inputs.' });
      const apiErrEl = document.getElementById('field-name');
      if (apiErrEl) apiErrEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const resetForm = () => {
    if (formData.documentUrl) {
      try {
        URL.revokeObjectURL(formData.documentUrl);
      } catch (err) {
        // ignore
      }
    }
    setFormData({
      name: '',
      organization: '',
      email: '',
      phone: '',
      location: '',
      stakeholderType: '',
      otherStakeholderType: '',
      domains: [],
      otherDomain: '',
      intentOfEngagement: '',
      otherIntent: '',
      startupStage: 'Prototype',
      startupDomain: '',
      startupTeamSize: '1 - 5',
      startupPreviousWork: '',
      expertAreaOfExpertise: '',
      expertExperience: '',
      expertAffiliation: '',
      expertWillingness: ['Mentor'],
      institutionType: 'University',
      institutionInterest: ['SPIN Lab'],
      studentProgram: 'Ph.D. / Research Scholar',
      studentDepartment: '',
      schoolCurriculum: 'CBSE',
      schoolInterest: 'VidyaGIS & Spatial Intelligence Lab',
      industryDepartment: '',
      industryEngagementMode: 'Collaborative R&D / Tech Transfer',
      otherEntityCategory: '',
      otherFocusArea: '',
      otherEngagementDetails: '',
      problemStatement: '',
      agreeToTerms: false,
      acknowledgeNonIncubation: false,
      documentName: '',
      documentSize: '',
      documentUrl: ''
    });
    setFormErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
    setSubmittedData(null);
  };

  return (
    <div className="vikas-onboarding-wrapper animate-fade-in">
      {submittedData ? (
        /* SUCCESS RECEIPT VIEW */
        <div className="card receipt-card animate-fade-in">
          <div className="receipt-badge-circle">
            <CheckCircle2 size={52} className="text-emerald" />
          </div>
          <h2 className="receipt-title">Registration Successfully Submitted</h2>
          <p className="receipt-subtitle">
            Your onboarding record has been logged in the national single-window registry.
          </p>

          <div className="file-audit-box">
            <span className="file-audit-label">AUDIT-CRITICAL TRACKING FILE NUMBER</span>
            <span className="file-audit-code">{submittedData.fileNumber}</span>
          </div>

          <div className="receipt-details-grid">
            {/* Section 1 summary */}
            <div className="receipt-summary-block">
              <div className="receipt-block-header">
                <User size={15} className="header-icon-amber" />
                <span>Section 1: Basic Details</span>
              </div>
              <div className="receipt-block-content">
                <div className="summary-row">
                  <span className="lbl">Name:</span>
                  <span className="val font-semibold">{submittedData.name}</span>
                </div>
                <div className="summary-row">
                  <span className="lbl">Organization:</span>
                  <span className="val">{submittedData.organization}</span>
                </div>
                <div className="summary-row">
                  <span className="lbl">Email:</span>
                  <span className="val font-mono">{submittedData.email}</span>
                </div>
                <div className="summary-row">
                  <span className="lbl">Phone:</span>
                  <span className="val">{submittedData.phone}</span>
                </div>
                <div className="summary-row">
                  <span className="lbl">Location:</span>
                  <span className="val">{submittedData.location}</span>
                </div>
              </div>
            </div>

            {/* Section 2 summary */}
            <div className="receipt-summary-block">
              <div className="receipt-block-header">
                <Compass size={15} className="header-icon-amber" />
                <span>Section 2: Stakeholder Type</span>
              </div>
              <div className="receipt-block-content">
                <div className="summary-row">
                  <span className="lbl">Category:</span>
                  <span className="badge badge-amber font-bold">
                    {submittedData.stakeholderType === 'Other' && submittedData.otherStakeholderType
                      ? `Other: ${submittedData.otherStakeholderType}`
                      : submittedData.stakeholderType}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="lbl">Status:</span>
                  <span className="badge badge-blue">Pending Initial Screening</span>
                </div>
                <div className="summary-row">
                  <span className="lbl">Submitted On:</span>
                  <span className="val">{submittedData.submissionDate}</span>
                </div>
              </div>
            </div>

            {/* Section 3 & 4 summary */}
            <div className="receipt-summary-block">
              <div className="receipt-block-header">
                <Target size={15} className="header-icon-amber" />
                <span>Section 3 & 4: Domains & Intent</span>
              </div>
              <div className="receipt-block-content">
                <div className="summary-row">
                  <span className="lbl">Domains:</span>
                  <div className="val-chips">
                    {submittedData.domains.map((d, i) => (
                      <span key={i} className="receipt-chip">{d}</span>
                    ))}
                    {submittedData.otherDomain && (
                      <span className="receipt-chip text-amber font-semibold">({submittedData.otherDomain})</span>
                    )}
                  </div>
                </div>
                <div className="summary-row mt-8">
                  <span className="lbl">Intent:</span>
                  <div className="val-chips">
                    {submittedData.intentOfEngagement === 'Other' && submittedData.otherIntent ? (
                      <span className="receipt-chip-cyan font-semibold">Other: {submittedData.otherIntent}</span>
                    ) : Array.isArray(submittedData.intentOfEngagement) ? (
                      submittedData.intentOfEngagement.map((intent, i) => (
                        <span key={i} className="receipt-chip-cyan">{intent}</span>
                      ))
                    ) : (
                      <span className="receipt-chip-cyan">{submittedData.intentOfEngagement || 'Not Specified'}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 summary */}
            <div className="receipt-summary-block">
              <div className="receipt-block-header">
                <Layers size={15} className="header-icon-amber" />
                <span>Section 5: Detailed Inputs ({submittedData.stakeholderType === 'Other' && submittedData.otherStakeholderType ? submittedData.otherStakeholderType : submittedData.stakeholderType})</span>
              </div>
              <div className="receipt-block-content">
                {submittedData.dynamicInputs?.stage && (
                  <div className="summary-row">
                    <span className="lbl">Stage:</span>
                    <span className="val font-semibold">{submittedData.dynamicInputs.stage}</span>
                  </div>
                )}
                {submittedData.dynamicInputs?.teamSize && (
                  <div className="summary-row">
                    <span className="lbl">Team Size:</span>
                    <span className="val">{submittedData.dynamicInputs.teamSize}</span>
                  </div>
                )}
                {submittedData.dynamicInputs?.areaOfExpertise && (
                  <div className="summary-row">
                    <span className="lbl">Area of Expertise:</span>
                    <span className="val">{submittedData.dynamicInputs.areaOfExpertise}</span>
                  </div>
                )}
                {submittedData.dynamicInputs?.willingness && (
                  <div className="summary-row">
                    <span className="lbl">Willingness:</span>
                    <span className="val">{submittedData.dynamicInputs.willingness.join(', ')}</span>
                  </div>
                )}
                {submittedData.dynamicInputs?.type && (
                  <div className="summary-row">
                    <span className="lbl">Institution Type:</span>
                    <span className="val">{submittedData.dynamicInputs.type}</span>
                  </div>
                )}
                {submittedData.dynamicInputs?.interest && (
                  <div className="summary-row">
                    <span className="lbl">Interest:</span>
                    <span className="val">{Array.isArray(submittedData.dynamicInputs.interest) ? submittedData.dynamicInputs.interest.join(', ') : submittedData.dynamicInputs.interest}</span>
                  </div>
                )}
                {submittedData.documentName && (
                  <div className="summary-row">
                    <span className="lbl">Attachment:</span>
                    <span className="val font-mono text-amber">
                      <Paperclip size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {submittedData.documentName} ({submittedData.documentSize})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 6 statement */}
          <div className="receipt-statement-box">
            <div className="receipt-statement-title">Section 6: Problem Statement / Interest</div>
            <p className="receipt-statement-text">{submittedData.problemStatement}</p>
          </div>

          <div className="receipt-compliance-alert">
            <ShieldCheck size={16} className="text-emerald" />
            <span>Compliance Verified: Terms agreed & non-incubation nature explicitly acknowledged.</span>
          </div>

          <div className="receipt-actions">
            <button className="btn btn-primary" onClick={resetForm}>
              <RefreshCw size={16} />
              Register Another Stakeholder
            </button>
          </div>
        </div>
      ) : (
        /* MAIN 7-SECTION ONBOARDING FORM */
        <form onSubmit={handleSubmit} className="onboarding-main-form" noValidate>
          {/* Header Banner - Sleek, Bright & Harmonious */}
          <div className="card form-masthead">
            <h1 className="masthead-title">VIKAS Portal Stakeholder Registration</h1>
            <p className="masthead-desc">
              National single-window registration and onboarding for startups, researchers, institutions, industry, schools, and domain experts.
            </p>
          </div>

          {/* Top Authentication Switch Banner */}
          <div className="form-auth-switch-banner">
            <div className="banner-text-wrap">
              <span className="banner-title-text">Already registered on VIKAS?</span>
              <span className="banner-sub-text">Sign in to view your application dossier, tracking timeline, and assigned verticals.</span>
            </div>
            {onNavigateToLogin && (
              <button 
                type="button" 
                className="btn-switch-to-login"
                onClick={onNavigateToLogin}
              >
                Sign In to My Dashboard <ArrowRight size={14} />
              </button>
            )}
          </div>

          {formErrors.api && (
            <div className="alert-error-banner mb-16 animate-shake" id="form-top-error">
              <AlertCircle size={16} />
              <span>{formErrors.api}</span>
            </div>
          )}

          {/* ========================================================
              SECTION 1: BASIC DETAILS
          ======================================================== */}
          <div className="card section-card" id="field-name">
            <div className="section-card-header">
              <div className="section-number-badge">1</div>
              <div className="section-header-text">
                <h3>Section 1: Basic Details <span className="text-danger">*</span></h3>
                <p>Provide your primary point of contact, organization, and create secure account credentials</p>
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">
                  <User size={15} className="label-icon" />
                  Name <span className="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter full name"
                  className={`form-control ${formErrors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={(e) => {
                    const sanitized = e.target.value.replace(/[^a-zA-Z\s.'-]/g, '');
                    setFormData({...formData, name: sanitized});
                    if (formErrors.name) setFormErrors({...formErrors, name: null});
                  }}
                  required
                />
                {formErrors.name && <span className="field-error-msg">{formErrors.name}</span>}
              </div>

              <div className="form-group" id="field-organization">
                <label className="form-label">
                  <Building2 size={15} className="label-icon" />
                  Organization <span className="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Company, University or Institution name"
                  className={`form-control ${formErrors.organization ? 'input-error' : ''}`}
                  value={formData.organization}
                  onChange={(e) => {
                    setFormData({...formData, organization: e.target.value});
                    if (formErrors.organization) setFormErrors({...formErrors, organization: null});
                  }}
                  required
                />
                {formErrors.organization && <span className="field-error-msg">{formErrors.organization}</span>}
              </div>
            </div>

            <div className="form-grid-3 mt-16">
              <div className="form-group" id="field-email">
                <label className="form-label">
                  <Mail size={15} className="label-icon" />
                  Email Address <span className="text-danger">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Official / contact email"
                  className={`form-control ${formErrors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (formErrors.email) setFormErrors({...formErrors, email: null});
                  }}
                  required
                />
                {formErrors.email && <span className="field-error-msg">{formErrors.email}</span>}
              </div>

              <div className="form-group" id="field-phone">
                <label className="form-label">
                  <Phone size={15} className="label-icon" />
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input 
                  type="tel" 
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className={`form-control ${formErrors.phone ? 'input-error' : ''}`}
                  value={formData.phone}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setFormData({...formData, phone: digitsOnly});
                    if (formErrors.phone) setFormErrors({...formErrors, phone: null});
                  }}
                  required
                />
                {formErrors.phone && <span className="field-error-msg">{formErrors.phone}</span>}
              </div>

              <div className="form-group" id="field-location">
                <label className="form-label">
                  <MapPin size={15} className="label-icon" />
                  Location <span className="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="City, State"
                  className={`form-control ${formErrors.location ? 'input-error' : ''}`}
                  value={formData.location}
                  onChange={(e) => {
                    const sanitized = e.target.value.replace(/[^a-zA-Z0-9\s,.-]/g, '');
                    setFormData({...formData, location: sanitized});
                    if (formErrors.location) setFormErrors({...formErrors, location: null});
                  }}
                  required
                />
                {formErrors.location && <span className="field-error-msg">{formErrors.location}</span>}
              </div>
            </div>

            {/* Account Password Inputs */}
            <div className="form-grid-2 mt-16">
              <div className="form-group" id="field-password">
                <label className="form-label">
                  <Lock size={15} className="label-icon" />
                  Create Password <span className="text-danger">*</span>
                </label>
                <div className="input-with-toggle">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Create secure password (min 6 chars)"
                    className={`form-control ${formErrors.password ? 'input-error' : ''}`}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({...formData, password: e.target.value});
                      if (formErrors.password) setFormErrors({...formErrors, password: null});
                    }}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn-field"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {formErrors.password && <span className="field-error-msg">{formErrors.password}</span>}
              </div>

              <div className="form-group" id="field-confirmPassword">
                <label className="form-label">
                  <KeyRound size={15} className="label-icon" />
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Re-enter password to confirm"
                  className={`form-control ${formErrors.confirmPassword ? 'input-error' : ''}`}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({...formData, confirmPassword: e.target.value});
                    if (formErrors.confirmPassword) setFormErrors({...formErrors, confirmPassword: null});
                  }}
                  required
                />
                {formErrors.confirmPassword && <span className="field-error-msg">{formErrors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          {/* ========================================================
              SECTION 2: STAKEHOLDER TYPE
          ======================================================== */}
          <div className="card section-card" id="field-stakeholderType">
            <div className="section-card-header">
              <div className="section-number-badge">2</div>
              <div className="section-header-text">
                <h3>Section 2: Stakeholder Type <span className="text-danger">*</span></h3>
                <p>Select one primary stakeholder category that represents your engagement</p>
              </div>
            </div>

            {formErrors.stakeholderType && (
              <div className="alert-error-banner mb-16">
                <AlertCircle size={15} />
                <span>{formErrors.stakeholderType}</span>
              </div>
            )}

            <div className="stakeholder-selector-grid">
              {stakeholderTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = formData.stakeholderType === type.id;
                return (
                  <div
                    key={type.id}
                    className={`stakeholder-type-pill-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectStakeholder(type.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectStakeholder(type.id);
                      }
                    }}
                  >
                    <div className="card-top-row">
                      <div className="stakeholder-icon-box" style={{ backgroundColor: `${type.color}15`, color: type.color }}>
                        <IconComponent size={20} />
                      </div>
                      <span className="stakeholder-badge font-mono" style={{ color: type.color, borderColor: `${type.color}40`, backgroundColor: `${type.color}10` }}>
                        {type.badge}
                      </span>
                    </div>
                    <div className="stakeholder-info">
                      <h4 className="stakeholder-title">{type.title}</h4>
                      <p className="stakeholder-sub">{type.subtitle}</p>
                    </div>
                    <div className="stakeholder-radio-indicator">
                      <div className={`radio-dot ${isSelected ? 'active' : ''}`}>
                        {isSelected && <Check size={12} color="#ffffff" strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Conditional Other Stakeholder Input */}
            {formData.stakeholderType === 'Other' && (
              <div className="form-group mt-16 animate-fade-in" id="field-otherStakeholderType">
                <label className="form-label">
                  Specify Stakeholder Entity Type <span className="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Non-profit research consortium, community collective, etc."
                  className={`form-control ${formErrors.otherStakeholderType ? 'input-error' : ''}`}
                  value={formData.otherStakeholderType}
                  onChange={(e) => {
                    setFormData({...formData, otherStakeholderType: e.target.value});
                    if (formErrors.otherStakeholderType) setFormErrors({...formErrors, otherStakeholderType: null});
                  }}
                />
                {formErrors.otherStakeholderType && <span className="field-error-msg">{formErrors.otherStakeholderType}</span>}
              </div>
            )}

            {/* Real-Time Institutional Vertical Auto-Routing Decision Preview */}
            {formData.stakeholderType && (
              <div className="vertical-auto-routing-card animate-fade-in mt-16">
                <div className="routing-card-top">
                  <div className="routing-title-row">
                    <ShieldCheck size={18} className="text-emerald" />
                    <span className="routing-heading">Institutional Vertical Auto-Routing Decision</span>
                  </div>
                  <span className="badge badge-emerald font-bold">System-Determined</span>
                </div>
                <p className="routing-desc">
                  Based on your selected stakeholder track (<strong>{formData.stakeholderType}</strong>)
                  {formData.domains.length > 0 && <span> and focus areas ({formData.domains.join(', ')})</span>}, 
                  VIKAS will automatically assign your dossier to the following institutional vertical(s):
                </p>
                <div className="mapped-verticals-tags">
                  <div className="primary-vertical-pill">
                    <span className="pill-tag">Primary Vertical:</span>
                    <span className="pill-val">{getMappedVerticals()?.primary}</span>
                  </div>
                  {getMappedVerticals()?.additional?.map(v => (
                    <div key={v} className="additional-vertical-pill">
                      <span className="pill-tag">Joint Track:</span>
                      <span className="pill-val">{v}</span>
                    </div>
                  ))}
                </div>
                <span className="routing-guarantee-note">
                  ✓ System-governed routing: No manual administrative classification required from applicant.
                </span>
              </div>
            )}
          </div>

          {/* ========================================================
              SECTION 3: DOMAIN SELECTION
          ======================================================== */}
          <div className="card section-card" id="field-domains">
            <div className="section-card-header">
              <div className="section-number-badge">3</div>
              <div className="section-header-text">
                <h3>Section 3: Domain Selection <span className="text-danger">*</span></h3>
                <p>Multiple choice — Select all core technology domains aligned with your proposal</p>
              </div>
            </div>

            {formErrors.domains && (
              <div className="alert-error-banner mb-16">
                <AlertCircle size={15} />
                <span>{formErrors.domains}</span>
              </div>
            )}

            <div className="domain-chips-grid">
              {domainOptions.map((domain) => {
                const isChecked = formData.domains.includes(domain);
                return (
                  <button
                    type="button"
                    key={domain}
                    className={`domain-toggle-chip ${isChecked ? 'active' : ''}`}
                    onClick={() => toggleDomain(domain)}
                  >
                    <div className="chip-checkbox">
                      {isChecked && <Check size={12} />}
                    </div>
                    <span className="chip-label">{domain}</span>
                  </button>
                );
              })}
            </div>

            {/* Conditionally reveal 'Others' specification */}
            {formData.domains.includes('Others') && (
              <div className="others-input-container animate-fade-in mt-16" id="field-otherDomain">
                <label className="form-label">
                  Please Specify Other Domain(s) <span className="text-danger">*</span>
                </label>
                <input 
                  type="text"
                  className={`form-control ${formErrors.otherDomain ? 'input-error' : ''}`}
                  value={formData.otherDomain}
                  onChange={(e) => {
                    setFormData({...formData, otherDomain: e.target.value});
                    if (formErrors.otherDomain) setFormErrors({...formErrors, otherDomain: null});
                  }}
                />
                {formErrors.otherDomain && <span className="field-error-msg">{formErrors.otherDomain}</span>}
              </div>
            )}
          </div>

          {/* ========================================================
              SECTION 4: INTENT OF ENGAGEMENT
          ======================================================== */}
          <div className="card section-card" id="field-intentOfEngagement">
            <div className="section-card-header">
              <div className="section-number-badge">4</div>
              <div className="section-header-text">
                <h3>Section 4: Intent of Engagement <span className="text-danger">*</span></h3>
                <p>Select your intended mode and purpose of engagement with IITTNiF (Single choice)</p>
              </div>
            </div>

            {formErrors.intentOfEngagement && (
              <div className="alert-error-banner mb-16">
                <AlertCircle size={15} />
                <span>{formErrors.intentOfEngagement}</span>
              </div>
            )}

            <div className="intent-chips-grid">
              {intentOptions.map((intent) => {
                const isSelected = formData.intentOfEngagement === intent;
                return (
                  <button
                    type="button"
                    key={intent}
                    className={`intent-toggle-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => toggleIntent(intent)}
                  >
                    <div className="intent-checkbox">
                      {isSelected && <Check size={12} />}
                    </div>
                    <span className="intent-label">{intent}</span>
                  </button>
                );
              })}
            </div>

            {/* Conditionally reveal 'Other' Intent specification */}
            {formData.intentOfEngagement === 'Other' && (
              <div className="others-input-container animate-fade-in mt-16" id="field-otherIntent">
                <label className="form-label">
                  Please Specify Other Intent <span className="text-danger">*</span>
                </label>
                <input 
                  type="text"
                  className={`form-control ${formErrors.otherIntent ? 'input-error' : ''}`}
                  placeholder="Please specify your intended mode or purpose of engagement..."
                  value={formData.otherIntent}
                  onChange={(e) => {
                    setFormData({...formData, otherIntent: e.target.value});
                    if (formErrors.otherIntent) setFormErrors({...formErrors, otherIntent: null});
                  }}
                />
                {formErrors.otherIntent && <span className="field-error-msg">{formErrors.otherIntent}</span>}
              </div>
            )}
          </div>

          {/* ========================================================
              SECTION 5: DETAILED INPUTS (DYNAMIC BASED ON TYPE)
          ======================================================== */}
          <div className="card section-card dynamic-section-card animate-fade-in" id="field-dynamicDetails">
            <div className="section-card-header">
              <div className="section-number-badge">5</div>
              <div className="section-header-text">
                <div className="dynamic-title-row">
                  <h3>Section 5: Detailed Inputs <span className="text-danger">*</span></h3>
                  <span className="badge badge-amber">
                    {formData.stakeholderType ? `Dynamic: ${formData.stakeholderType === 'Other' && formData.otherStakeholderType ? formData.otherStakeholderType : formData.stakeholderType}` : 'Awaiting Selection'}
                  </span>
                </div>
                <p>
                  {formData.stakeholderType 
                    ? `Specific operational parameters customized for ${formData.stakeholderType}`
                    : 'Please select a stakeholder type in Section 2 above to view specialized inputs'}
                </p>
              </div>
            </div>

            {/* IF NO STAKEHOLDER TYPE SELECTED YET */}
            {!formData.stakeholderType && (
              <div className="empty-dynamic-prompt animate-fade-in">
                <Compass size={28} className="text-amber animate-pulse" />
                <p className="empty-dynamic-text">
                  Please select a <strong>Stakeholder Type</strong> in Section 2 above to configure tailored operational parameters.
                </p>
              </div>
            )}

            {/* DYNAMIC: IF STARTUP */}
            {formData.stakeholderType === 'Startup' && (
              <div className="dynamic-content-box startup-box animate-fade-in">
                <div className="form-group">
                  <label className="form-label">
                    Stage (Idea / Prototype / Revenue) <span className="text-danger">*</span>
                  </label>
                  <div className="stage-pills-row">
                    {startupStages.map((stg) => (
                      <button
                        type="button"
                        key={stg}
                        className={`stage-pill ${formData.startupStage === stg ? 'active' : ''}`}
                        onClick={() => setFormData({...formData, startupStage: stg})}
                      >
                        {formData.startupStage === stg && <Check size={13} />}
                        <span>{stg}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-grid-2 mt-16">
                  <div className="form-group">
                    <label className="form-label">
                      Domain (Primary Core Focus)
                    </label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={formData.startupDomain}
                      onChange={(e) => setFormData({...formData, startupDomain: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Team Size (Founders & Core Engineers)
                    </label>
                    <select 
                      className="form-control"
                      value={formData.startupTeamSize}
                      onChange={(e) => setFormData({...formData, startupTeamSize: e.target.value})}
                    >
                      <option value="1 - 5">1 - 5 Members</option>
                      <option value="6 - 15">6 - 15 Members</option>
                      <option value="16 - 30">16 - 30 Members</option>
                      <option value="30+">30+ Members</option>
                    </select>
                  </div>
                </div>

                <div className="form-group mt-16">
                  <label className="form-label">
                    Previous Work (Prototypes, Patents, Pilots, or Incubations)
                  </label>
                  <textarea 
                    className="form-control"
                    rows="3"
                    value={formData.startupPreviousWork}
                    onChange={(e) => setFormData({...formData, startupPreviousWork: e.target.value})}
                  />
                </div>
              </div>
            )}

            {/* DYNAMIC: IF EXPERT */}
            {formData.stakeholderType === 'Expert' && (
              <div className="dynamic-content-box expert-box animate-fade-in">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      Area of Expertise <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={formData.expertAreaOfExpertise}
                      onChange={(e) => setFormData({...formData, expertAreaOfExpertise: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Experience (Years / Track Record) <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={formData.expertExperience}
                      onChange={(e) => setFormData({...formData, expertExperience: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2 mt-16">
                  <div className="form-group">
                    <label className="form-label">
                      Affiliation (Institution / University / Company) <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={formData.expertAffiliation}
                      onChange={(e) => setFormData({...formData, expertAffiliation: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Willingness (Select all that apply)
                    </label>
                    <div className="willingness-pills-row">
                      {expertWillingnessOptions.map((opt) => {
                        const isSelected = formData.expertWillingness.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            className={`willingness-pill ${isSelected ? 'active' : ''}`}
                            onClick={() => toggleExpertWillingness(opt)}
                          >
                            {isSelected && <Check size={12} />}
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC: IF INSTITUTION */}
            {formData.stakeholderType === 'Institution' && (
              <div className="dynamic-content-box institution-box animate-fade-in">
                <div className="form-group">
                  <label className="form-label">
                    Institution Type (College / University) <span className="text-danger">*</span>
                  </label>
                  <div className="stage-pills-row">
                    {institutionTypes.map((t) => (
                      <button
                        type="button"
                        key={t}
                        className={`stage-pill ${formData.institutionType === t ? 'active' : ''}`}
                        onClick={() => setFormData({...formData, institutionType: t})}
                      >
                        {formData.institutionType === t && <Check size={13} />}
                        <span>{t}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group mt-16">
                  <label className="form-label">
                    Interest (Select areas of institutional linkage)
                  </label>
                  <div className="willingness-pills-row">
                    {institutionInterests.map((interest) => {
                      const isSelected = formData.institutionInterest.includes(interest);
                      return (
                        <button
                          type="button"
                          key={interest}
                          className={`willingness-pill ${isSelected ? 'active' : ''}`}
                          onClick={() => toggleInstitutionInterest(interest)}
                        >
                          {isSelected && <Check size={12} />}
                          <span>{interest}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC: IF STUDENT / RESEARCHER */}
            {formData.stakeholderType === 'Student / Researcher' && (
              <div className="dynamic-content-box student-box animate-fade-in">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Academic Program</label>
                    <select 
                      className="form-control"
                      value={formData.studentProgram}
                      onChange={(e) => setFormData({...formData, studentProgram: e.target.value})}
                    >
                      <option value="Ph.D. / Research Scholar">Ph.D. / Research Scholar</option>
                      <option value="Postdoctoral Fellow / Chanakya">Postdoctoral Fellow / Chanakya</option>
                      <option value="M.Tech / M.S. (Research)">M.Tech / M.S. (Research)</option>
                      <option value="B.Tech Final Year / Undergraduate">B.Tech Final Year / Undergraduate</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Department & Faculty Guide</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={formData.studentDepartment}
                      onChange={(e) => setFormData({...formData, studentDepartment: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC: IF SCHOOL */}
            {formData.stakeholderType === 'School' && (
              <div className="dynamic-content-box school-box animate-fade-in">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Curriculum / Affiliation Board</label>
                    <select 
                      className="form-control"
                      value={formData.schoolCurriculum}
                      onChange={(e) => setFormData({...formData, schoolCurriculum: e.target.value})}
                    >
                      <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                      <option value="ICSE">ICSE / ISC</option>
                      <option value="State Board">State Secondary Board</option>
                      <option value="International">IB / Cambridge</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">School Outreach Engagement</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={formData.schoolInterest}
                      onChange={(e) => setFormData({...formData, schoolInterest: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC: IF INDUSTRY / GOVERNMENT */}
            {(formData.stakeholderType === 'Industry' || formData.stakeholderType === 'Government') && (
              <div className="dynamic-content-box industry-box animate-fade-in">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Department / Directorate / Business Unit</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={formData.industryDepartment}
                      onChange={(e) => setFormData({...formData, industryDepartment: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Engagement Mode</label>
                    <select 
                      className="form-control"
                      value={formData.industryEngagementMode}
                      onChange={(e) => setFormData({...formData, industryEngagementMode: e.target.value})}
                    >
                      <option value="Collaborative R&D / Tech Transfer">Collaborative R&D / Tech Transfer</option>
                      <option value="Grand Challenge / Problem Statement Sponsor">Grand Challenge / Problem Statement Sponsor</option>
                      <option value="Testbed Access & Procurement">Testbed Access & Procurement</option>
                      <option value="Strategic MoU">Strategic MoU</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* DYNAMIC: IF OTHER */}
            {formData.stakeholderType === 'Other' && (
              <div className="dynamic-content-box other-box animate-fade-in">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      Organization / Entity Category
                    </label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="e.g. Non-profit, Individual, Consortium"
                      value={formData.otherEntityCategory}
                      onChange={(e) => setFormData({...formData, otherEntityCategory: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Key Operational Focus
                    </label>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="e.g. Community Tech, Open Science, Social Impact"
                      value={formData.otherFocusArea}
                      onChange={(e) => setFormData({...formData, otherFocusArea: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group mt-16">
                  <label className="form-label">
                    Proposed Engagement Highlights
                  </label>
                  <textarea 
                    className="form-control"
                    rows="3"
                    placeholder="Outline your planned contribution or how you wish to collaborate..."
                    value={formData.otherEngagementDetails}
                    onChange={(e) => setFormData({...formData, otherEngagementDetails: e.target.value})}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ========================================================
              SECTION 6: PROBLEM STATEMENT / INTEREST
          ======================================================== */}
          <div className="card section-card" id="field-problemStatement">
            <div className="section-card-header">
              <div className="section-number-badge">6</div>
              <div className="section-header-text">
                <h3>Section 6: Problem Statement / Interest <span className="text-danger">*</span></h3>
                <p>Open text — Articulate the challenge, technological problem, or specific interest you wish to pursue</p>
              </div>
            </div>

            <div className="form-group">
              <textarea 
                className={`form-control text-area-large ${formErrors.problemStatement ? 'input-error' : ''}`}
                rows="5"
                value={formData.problemStatement}
                onChange={(e) => {
                  setFormData({...formData, problemStatement: e.target.value});
                  if (formErrors.problemStatement) setFormErrors({...formErrors, problemStatement: null});
                }}
                required
              />
              <div className="textarea-footer">
                <span className="char-count">{formData.problemStatement.length} characters</span>
                {formErrors.problemStatement && (
                  <span className="field-error-msg">{formErrors.problemStatement}</span>
                )}
              </div>
            </div>

            {/* Optional Supporting Document Upload */}
            <div className="mt-16 optional-doc-section">
              <label className="form-label optional-doc-label">
                <Paperclip size={14} className="text-amber" />
                Supporting Document / Pitch Deck / Proposal (Optional)
              </label>

              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg" 
                onChange={handleFileChange}
              />

              {formData.documentName ? (
                <div className="doc-uploaded-card animate-fade-in">
                  <div className="doc-file-info">
                    <div className="doc-icon-badge">
                      <FileText size={20} className="text-amber" />
                    </div>
                    <div className="doc-details">
                      <span className="doc-filename">{formData.documentName}</span>
                      <span className="doc-size-badge">{formData.documentSize} • Ready to submit</span>
                    </div>
                  </div>
                  <div className="doc-actions">
                    {formData.documentUrl && (
                      <a 
                        href={formData.documentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-doc-action"
                        title="Preview"
                      >
                        <Eye size={14} /> Preview
                      </a>
                    )}
                    <button 
                      type="button" 
                      className="btn-doc-action text-danger"
                      onClick={handleRemoveFile}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className={`mini-dropzone ${isDragging ? 'drag-active' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud size={24} className="text-amber" />
                  <div className="mini-dropzone-text">
                    <strong>Click to attach file</strong> or drag & drop (PDF, PPT, DOC up to 25 MB)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================
              SECTION 7: CONSENT
          ======================================================== */}
          <div className="card section-card" id="field-agreeToTerms">
            <div className="section-card-header">
              <div className="section-number-badge">7</div>
              <div className="section-header-text">
                <h3>Section 7: Consent</h3>
                <p>Review and agree to the portal operational terms and non-incubation acknowledgment</p>
              </div>
            </div>

            <div className="consent-boxes-wrapper">
              {/* Checkbox 1: Agree to terms */}
              <label className={`consent-card ${formData.agreeToTerms ? 'checked' : ''} ${formErrors.agreeToTerms ? 'error-card' : ''}`}>
                <input 
                  type="checkbox" 
                  className="consent-checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => {
                    setFormData({...formData, agreeToTerms: e.target.checked});
                    if (formErrors.agreeToTerms) setFormErrors({...formErrors, agreeToTerms: null});
                  }}
                />
                <div className="consent-content">
                  <div className="consent-title">
                    <ShieldCheck size={16} className="text-amber" />
                    <strong>Agree to terms <span className="text-danger">*</span></strong>
                  </div>
                  <p className="consent-desc">
                    I confirm that the information submitted is accurate and true to the best of my knowledge. I agree to abide by the evaluation protocols, data security policies, and code of conduct of the VIKAS Portal and IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF).
                  </p>
                </div>
              </label>
              {formErrors.agreeToTerms && (
                <span className="field-error-msg pl-8">{formErrors.agreeToTerms}</span>
              )}

              {/* Checkbox 2: Acknowledge non-incubation nature */}
              <label className={`consent-card mt-12 ${formData.acknowledgeNonIncubation ? 'checked' : ''} ${formErrors.acknowledgeNonIncubation ? 'error-card' : ''}`}>
                <input 
                  type="checkbox" 
                  className="consent-checkbox"
                  checked={formData.acknowledgeNonIncubation}
                  onChange={(e) => {
                    setFormData({...formData, acknowledgeNonIncubation: e.target.checked});
                    if (formErrors.acknowledgeNonIncubation) setFormErrors({...formErrors, acknowledgeNonIncubation: null});
                  }}
                />
                <div className="consent-content">
                  <div className="consent-title">
                    <FileCheck size={16} className="text-amber" />
                    <strong>Acknowledge non-incubation nature <span className="text-danger">*</span></strong>
                  </div>
                  <p className="consent-desc">
                    I explicitly understand and acknowledge the non-incubation nature of general onboarding registration. Formal incubation, equity investment, or capital grants entail statutory selection committee screenings, evaluation benchmarks, and distinct legal agreements.
                  </p>
                </div>
              </label>
              {formErrors.acknowledgeNonIncubation && (
                <span className="field-error-msg pl-8">{formErrors.acknowledgeNonIncubation}</span>
              )}
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="form-submit-footer">
            <button type="submit" className="btn btn-primary btn-submit-large">
              <Layers size={18} />
              Submit Onboarding Form & Generate File Number
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              <RefreshCw size={16} />
              Reset All Fields
            </button>
          </div>
        </form>
      )}

      {/* COMPREHENSIVE STYLING - CRISP, BRIGHT, HARMONIOUS THEME */}
      <style>{`
        .vikas-onboarding-wrapper {
          max-width: 920px;
          margin: 0 auto;
          padding-bottom: 60px;
        }

        /* Masthead - Clean light gradient with rich amber border */
        .form-masthead {
          padding: 32px 36px;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 65%, #fef3c7 100%);
          border: 1px solid #e2e8f0;
          border-left: 5px solid #d97706;
          border-radius: 16px;
          box-shadow: 0 4px 16px -2px rgba(217, 119, 6, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04);
        }

        .masthead-badge-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .badge-amber {
          background-color: #fef3c7;
          color: #b45309;
          border: 1px solid #fde68a;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          letter-spacing: 0.5px;
        }

        .badge-blue {
          background-color: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          letter-spacing: 0.5px;
        }

        .badge-green {
          background-color: #ecfdf5;
          color: #047857;
          border: 1px solid #a7f3d0;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          letter-spacing: 0.5px;
        }

        .masthead-title {
          font-size: 34px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.6px;
          line-height: 1.25;
          margin-bottom: 10px;
        }

        .masthead-desc {
          font-size: 16.5px;
          color: #334155;
          line-height: 1.6;
        }

        /* Quicknav Stepper */
        .section-quicknav {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
        }

        .quicknav-step {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          background: #ffffff;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          transition: all var(--transition-fast);
        }

        .quicknav-step.active {
          color: #92400e;
          border-color: #fcd34d;
          background: #fffbeb;
        }

        .quicknav-step span {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10.5px;
          font-weight: 800;
        }

        .quicknav-arrow {
          color: #94a3b8;
          font-size: 12px;
          font-weight: 600;
        }

        /* Section Cards */
        .section-card {
          margin-bottom: 24px;
          padding: 28px 32px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .section-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.07);
        }

        .section-card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 22px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        /* Vibrant Amber Section Number Badge */
        .section-number-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(217, 119, 6, 0.3);
        }

        .section-header-text h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .section-header-text p {
          font-size: 13px;
          color: #64748b;
        }

        .form-label {
          display: block;
          font-size: 13.5px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 7px;
        }

        .label-icon {
          display: inline;
          margin-right: 6px;
          color: #d97706;
          vertical-align: -2px;
        }

        .text-danger {
          color: #ef4444;
          font-weight: 700;
        }

        .text-amber {
          color: #d97706;
        }

        .text-emerald {
          color: #059669;
        }

        .header-icon-amber {
          color: #d97706;
        }

        /* Form Controls - Crisp Pure White with Clear Borders */
        .form-control {
          width: 100%;
          background-color: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #0f172a;
          font-size: 14px;
          padding: 10px 14px;
          border-radius: 8px;
          outline: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .form-control:focus {
          border-color: #d97706;
          box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
          background-color: #ffffff;
        }

        .form-control::placeholder {
          color: #94a3b8;
        }

        /* Form Grids */
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .form-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
        }

        @media (max-width: 768px) {
          .form-grid-2, .form-grid-3 {
            grid-template-columns: 1fr;
          }
        }

        .input-error {
          border-color: #ef4444 !important;
          background-color: #fff5f5 !important;
        }

        .field-error-msg {
          font-size: 11.5px;
          color: #dc2626;
          margin-top: 4px;
          display: block;
          font-weight: 600;
        }

        .alert-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #b91c1c;
          font-size: 13px;
          font-weight: 600;
        }

        /* SECTION 2: Stakeholder Selector Grid */
        .stakeholder-selector-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }

        .stakeholder-type-pill-card,
        .stakeholder-select-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 18px 20px;
          background-color: #ffffff;
          border: 2px solid #cbd5e1;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          user-select: none;
        }

        .stakeholder-type-pill-card:hover,
        .stakeholder-select-card:hover {
          border-color: var(--color-accent, #0284c7);
          background-color: #f8fafc;
          transform: translateY(-3px);
          box-shadow: 0 10px 24px -4px rgba(2, 132, 199, 0.16);
        }

        .stakeholder-type-pill-card.selected,
        .stakeholder-select-card.selected {
          border-color: var(--color-accent, #0284c7) !important;
          background-color: #f0f9ff !important;
          box-shadow: 0 0 0 2px var(--color-accent, #0284c7), 0 10px 28px -4px rgba(2, 132, 199, 0.22) !important;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .stakeholder-icon-box,
        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stakeholder-badge,
        .type-badge {
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 9px;
          border-radius: 6px;
          border: 1px solid currentColor;
        }

        .stakeholder-type-pill-card.selected .stakeholder-badge,
        .stakeholder-select-card.selected .type-badge {
          font-weight: 800;
        }

        .stakeholder-info,
        .card-text-body {
          flex: 1;
          margin-bottom: 14px;
        }

        .stakeholder-title,
        .type-title {
          font-size: 15.5px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 5px 0;
        }

        .stakeholder-type-pill-card.selected .stakeholder-title,
        .stakeholder-select-card.selected .type-title {
          color: #0369a1;
        }

        .stakeholder-sub,
        .type-subtitle {
          font-size: 12px;
          color: #64748b;
          line-height: 1.45;
          margin: 0;
        }

        .stakeholder-radio-indicator,
        .select-indicator {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .radio-dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          background: #ffffff;
        }

        .radio-dot.active {
          border-color: var(--color-accent, #0284c7) !important;
          background-color: var(--color-accent, #0284c7) !important;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.25);
        }

        /* SECTION 3: Domain Selection Grid */
        .domain-chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .domain-toggle-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: #334155;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
          transition: all var(--transition-fast);
        }

        .domain-toggle-chip:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
          color: #0f172a;
        }

        .domain-toggle-chip.active {
          border-color: #d97706;
          background: #fffbeb;
          color: #92400e;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(217, 119, 6, 0.12);
        }

        .chip-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          color: transparent;
        }

        .domain-toggle-chip.active .chip-checkbox {
          border-color: #d97706;
          background: #d97706;
          color: #ffffff;
        }

        .others-input-container {
          padding: 16px;
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 10px;
        }

        /* SECTION 4: Intent Grid */
        .intent-chips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }

        .intent-toggle-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: #334155;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
          transition: all var(--transition-fast);
        }

        .intent-toggle-chip:hover {
          border-color: #0891b2;
          background: #f8fafc;
          color: #0f172a;
        }

        .intent-toggle-chip.active {
          border-color: #0891b2;
          background: #ecfeff;
          color: #0e7490;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(8, 145, 178, 0.12);
        }

        .intent-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          color: transparent;
          flex-shrink: 0;
        }

        .intent-toggle-chip.active .intent-checkbox {
          border-color: #0891b2;
          background: #0891b2;
          color: #ffffff;
        }

        /* SECTION 5: Dynamic Details */
        .dynamic-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .dynamic-content-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 22px;
          border-radius: 12px;
        }

        .empty-dynamic-prompt {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px 28px;
          background-color: #fffbeb;
          border: 1.5px dashed #fcd34d;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(217, 119, 6, 0.05);
        }

        .empty-dynamic-text {
          font-size: 14.5px;
          color: #92400e;
          margin: 0;
          line-height: 1.55;
        }

        .other-box {
          background: #fbfbfe;
          border-color: #e0e7ff;
        }

        .stage-pills-row, .willingness-pills-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .stage-pill, .willingness-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #334155;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
          transition: all var(--transition-fast);
        }

        .stage-pill:hover, .willingness-pill:hover {
          border-color: #d97706;
          color: #0f172a;
          background-color: #fffdfa;
        }

        .stage-pill.active, .willingness-pill.active {
          background: #d97706;
          border-color: #d97706;
          color: #ffffff;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(217, 119, 6, 0.25);
        }

        /* SECTION 6: Problem Statement */
        .text-area-large {
          font-size: 14px;
          line-height: 1.6;
          resize: vertical;
          min-height: 130px;
        }

        .textarea-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
        }

        .char-count {
          font-size: 12px;
          color: #94a3b8;
        }

        /* Optional Attachment Dropzone */
        .optional-doc-section {
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .optional-doc-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #334155;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .mini-dropzone {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: #f8fafc;
          border: 1.5px dashed #cbd5e1;
          border-radius: 10px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mini-dropzone:hover, .mini-dropzone.drag-active {
          border-color: #d97706;
          background: #fffbeb;
        }

        .mini-dropzone-text {
          font-size: 13px;
          color: #475569;
        }

        .mini-dropzone-text strong {
          color: #b45309;
        }

        .doc-uploaded-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #f8fafc;
          border: 1px solid #fcd34d;
          border-radius: 10px;
        }

        .doc-file-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .doc-icon-badge {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #fef3c7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doc-details {
          display: flex;
          flex-direction: column;
        }

        .doc-filename {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
        }

        .doc-size-badge {
          font-size: 11px;
          color: #64748b;
        }

        .doc-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-doc-action {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          cursor: pointer;
          text-decoration: none;
        }

        .btn-doc-action:hover {
          color: #0f172a;
          border-color: #94a3b8;
        }

        /* SECTION 7: Consent */
        .consent-boxes-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .consent-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .consent-card:hover {
          border-color: #cbd5e1;
          background: #ffffff;
        }

        .consent-card.checked {
          border-color: #d97706;
          background: #fffbeb;
        }

        .consent-card.error-card {
          border-color: #f87171;
          background: #fef2f2;
        }

        .consent-checkbox {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          accent-color: #d97706;
          cursor: pointer;
        }

        .consent-content {
          flex: 1;
        }

        .consent-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14.5px;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .consent-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.5;
        }

        /* Form Footer Actions */
        .form-submit-footer {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 28px;
        }

        .btn-submit-large {
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 700;
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          border: none;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.3);
          border-radius: 10px;
        }

        .btn-submit-large:hover {
          background: linear-gradient(135deg, #b45309 0%, #92400e 100%);
        }

        /* RECEIPT CARD */
        .receipt-card {
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
        }

        .receipt-badge-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .receipt-title {
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .receipt-subtitle {
          font-size: 14px;
          color: #64748b;
          max-width: 500px;
          margin-bottom: 24px;
        }

        .file-audit-box {
          background: #fffbeb;
          border: 1.5px dashed #d97706;
          padding: 18px 36px;
          border-radius: 12px;
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .file-audit-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          color: #b45309;
        }

        .file-audit-code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 1px;
        }

        .receipt-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          text-align: left;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .receipt-details-grid {
            grid-template-columns: 1fr;
          }
        }

        .receipt-summary-block {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 16px;
        }

        .receipt-block-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 700;
          color: #0f172a;
          padding-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 12px;
        }

        .receipt-block-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .summary-row {
          display: flex;
          align-items: baseline;
          font-size: 13px;
        }

        .summary-row .lbl {
          color: #64748b;
          width: 100px;
          flex-shrink: 0;
        }

        .summary-row .val {
          color: #0f172a;
        }

        .val-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .receipt-chip {
          display: inline-block;
          font-size: 11px;
          background: #fef3c7;
          border: 1px solid #fde68a;
          color: #92400e;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }

        .receipt-chip-cyan {
          display: inline-block;
          font-size: 11px;
          background: #ecfeff;
          border: 1px solid #a5f3fc;
          color: #0e7490;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }

        .receipt-statement-box {
          width: 100%;
          text-align: left;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .receipt-statement-title {
          font-size: 12.5px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .receipt-statement-text {
          font-size: 13px;
          color: #475569;
          line-height: 1.6;
        }

        .receipt-compliance-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 8px;
          color: #047857;
          font-size: 12.5px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .receipt-actions {
          display: flex;
          gap: 12px;
        }

        /* Authentication Switch Banner */
        .form-auth-switch-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background-color: rgba(var(--color-accent-rgb), 0.06);
          border: 1px solid rgba(var(--color-accent-rgb), 0.2);
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          gap: 16px;
        }

        .banner-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .banner-title-text {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .banner-sub-text {
          font-size: 11.5px;
          color: var(--text-secondary);
        }

        .btn-switch-to-login {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: var(--bg-surface);
          border: 1px solid var(--color-accent);
          color: var(--color-accent);
          font-size: 12px;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .btn-switch-to-login:hover {
          background-color: var(--color-accent);
          color: #ffffff;
        }

        /* Password Input Wrapper */
        .input-with-toggle {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-toggle-btn-field {
          position: absolute;
          right: 10px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .password-toggle-btn-field:hover {
          color: var(--text-primary);
        }

        /* Vertical Auto-Routing Decision Box */
        .vertical-auto-routing-card {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(56, 189, 248, 0.06) 100%);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .routing-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .routing-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .routing-heading {
          font-size: 13.5px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .routing-desc {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.45;
        }

        .mapped-verticals-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .primary-vertical-pill, .additional-vertical-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 700;
        }

        .primary-vertical-pill {
          background-color: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .primary-vertical-pill .pill-tag {
          font-size: 10px;
          text-transform: uppercase;
          color: #047857;
          font-weight: 800;
        }

        .additional-vertical-pill {
          background-color: #e0f2fe;
          color: #0369a1;
          border: 1px solid #bae6fd;
        }

        .additional-vertical-pill .pill-tag {
          font-size: 10px;
          text-transform: uppercase;
          color: #0284c7;
          font-weight: 800;
        }

        .routing-guarantee-note {
          font-size: 11px;
          color: #059669;
          font-weight: 600;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}
