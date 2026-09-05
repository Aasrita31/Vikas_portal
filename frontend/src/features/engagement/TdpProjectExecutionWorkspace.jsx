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
  Plus,
  Upload,
  Trash2,
  Edit3,
  Video,
  Presentation,
  Code,
  GitBranch,
  Database,
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  RotateCcw,
  UserCheck,
  Send,
  Sliders
} from 'lucide-react';

export const EXECUTION_STATUSES = ['Draft', 'Submitted', 'Verified', 'Needs Revision'];

export default function TdpProjectExecutionWorkspace({ 
  applicationId = 'IITTNIF-TDP-2026-7193', 
  onBack,
  currentUser = { name: 'Prof. S. Ananth', email: 's.ananth@iitt.ac.in', role: 'Principal Investigator' }
}) {
  const [execData, setExecData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('milestones'); // 'milestones' | 'weekly' | 'deliverables' | 'final_assets' | 'repo'
  const [userRole, setUserRole] = useState('team'); // 'team' (Applicant/PI) | 'mentor' (Dr. K. Raghavan)
  
  // Weekly progress form modal state
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [weeklyFormData, setWeeklyFormData] = useState({
    weekNumber: 3,
    tasksUndertaken: '',
    toolsDatasetsMethodsUsed: '',
    status: 'Submitted',
    resultsOutputs: '',
    challenges: '',
    solutions: '',
    supportNeeded: '',
    planForNextWeek: '',
    learningSummary: '',
    attachments: []
  });

  // Milestone submission modal
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [milestoneFormData, setMilestoneFormData] = useState({
    status: 'Submitted',
    evidence: '',
    evidenceFileName: '',
    evidenceUrl: '#'
  });

  // Deliverable submission modal
  const [editingDeliverable, setEditingDeliverable] = useState(null);
  const [deliverableFormData, setDeliverableFormData] = useState({
    status: 'Submitted',
    evidence: '',
    evidenceFileName: '',
    evidenceUrl: '#'
  });

  // Mentor Review Modal
  const [reviewModalData, setReviewModalData] = useState(null); // { itemType, itemId, title, currentStatus, mentorReview }
  const [mentorFeedbackText, setMentorFeedbackText] = useState('');
  const [mentorTargetStatus, setMentorTargetStatus] = useState('Verified');

  // Final Assets State
  const [finalAssetsForm, setFinalAssetsForm] = useState(null);
  const [editingFinalAssetKey, setEditingFinalAssetKey] = useState(null);

  // Fetch execution data
  const fetchExecutionData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/vikas/technology-development/execution/${applicationId}`);
      if (res.ok) {
        const data = await res.json();
        setExecData(data);
        setFinalAssetsForm(data.finalAssets);
        // Calculate next week number
        if (data.weeklyProgressLogs && data.weeklyProgressLogs.length > 0) {
          const maxWeek = Math.max(...data.weeklyProgressLogs.map(w => w.weekNumber || 0));
          setWeeklyFormData(prev => ({ ...prev, weekNumber: maxWeek + 1 }));
        }
      } else {
        fallbackExecutionData();
      }
    } catch (err) {
      fallbackExecutionData();
    } finally {
      setLoading(false);
    }
  };

  const fallbackExecutionData = () => {
    const fallback = {
      applicationNumber: applicationId || 'IITTNIF-TDP-2026-7193',
      projectTitle: 'Automated Hyperspectral Satellite Pipeline for Agricultural Yield Modeling',
      technologyDomain: 'Geo-Intelligence',
      applicantName: 'Prof. S. Ananth',
      organization: 'IIT Tirupati',
      assignedMentor: 'Dr. K. Raghavan (TDP Lead & Domain Mentor)',
      currentTrl: 3,
      targetTrl: 5,
      overallProgressPercent: 45,
      lastUpdated: '28/08/2026, 17:30:00',
      milestones: [
        {
          id: 'M1',
          milestone: 'Data Pipeline Ingestion with VidyaGIS Engine',
          description: 'Automated radiometric calibration and spatial atmospheric correction pipelines integrated with raster cloud storage.',
          dueDate: '01/10/2026',
          status: 'Verified',
          evidence: 'Radiometric_Calibration_Test_Dossier_v1.pdf',
          evidenceFileName: 'Radiometric_Calibration_Test_Dossier_v1.pdf',
          evidenceUrl: '#',
          submissionDate: '15/08/2026',
          mentorReview: 'Pipeline latency benchmarking accepted. Sub-40min turnaround verified on GPU test cluster.',
          mentorVerifiedBy: 'Dr. K. Raghavan',
          mentorVerificationDate: '20/08/2026'
        },
        {
          id: 'M2',
          milestone: 'Deep Neural Segmentation Model Benchmark',
          description: 'Lightweight transformer canopy segmentation model achieving > 90% F1 score on multi-spectral test tiles.',
          dueDate: '15/12/2026',
          status: 'Submitted',
          evidence: 'Canopy_Segmentation_Benchmark_Weights.onnx',
          evidenceFileName: 'Canopy_Segmentation_Benchmark_Weights.onnx',
          evidenceUrl: '#',
          submissionDate: '28/08/2026',
          mentorReview: 'Model weights submitted. Under evaluation by GeoAI peer committee.',
          mentorVerifiedBy: null,
          mentorVerificationDate: null
        },
        {
          id: 'M3',
          milestone: 'District-Scale Pilot Validation & API Deployment',
          description: 'Field validation with farmers ground-truth data in 5 agro-climatic zones and live production REST API endpoint.',
          dueDate: '15/05/2027',
          status: 'Draft',
          evidence: null,
          evidenceFileName: null,
          evidenceUrl: null,
          submissionDate: null,
          mentorReview: 'Pending execution of Phase 3 field trials.',
          mentorVerifiedBy: null,
          mentorVerificationDate: null
        }
      ],
      weeklyProgressLogs: [
        {
          id: 'WP-W1',
          weekNumber: 1,
          tasksUndertaken: 'Architecture formulation and ingestion containerization setup on Docker.',
          toolsDatasetsMethodsUsed: 'Docker, GDAL, Sentinel-2 L2A datasets, FastAPI.',
          status: 'Verified',
          resultsOutputs: 'Functional Docker container with automated GDAL raster tiling microservice.',
          challenges: 'High memory footprint during 10m band multi-spectral mosaic processing.',
          solutions: 'Implemented chunked raster window reading using rasterio and memory-mapped virtual arrays.',
          supportNeeded: 'Allocation of 32GB RAM instance on IITTNiF Geo-Intelligence cloud suite.',
          planForNextWeek: 'Begin hyperspectral atmospheric correction module implementation.',
          learningSummary: 'Chunked raster windowing reduced RAM requirement by 65% with zero accuracy loss.',
          attachments: [
            {
              fileName: 'Ingestion_Microservice_Bench.pdf',
              fileSize: '1.2 MB',
              fileUrl: '#',
              fileType: 'application/pdf'
            }
          ],
          submissionDate: '08/08/2026',
          submittedBy: 'Prof. S. Ananth',
          mentorReview: 'Architecture design approved. Cloud cluster RAM upgrade provisioned.',
          mentorVerifiedBy: 'Dr. K. Raghavan',
          mentorVerificationDate: '10/08/2026'
        },
        {
          id: 'WP-W2',
          weekNumber: 2,
          tasksUndertaken: 'Implementation of lightweight transformer model for crop canopy segmentation.',
          toolsDatasetsMethodsUsed: 'PyTorch, TensorRT, CuPy, PRISMA hyperspectral tiles.',
          status: 'Submitted',
          resultsOutputs: 'Trained 4-layer spatial attention model achieving 92.4% validation accuracy on test tiles.',
          challenges: 'Overfitting on small sample size in dryland agriculture test regions.',
          solutions: 'Applied spectral-spatial data augmentation and mixup regularization.',
          supportNeeded: 'Ground-truth NDVI validation points from AP State Remote Sensing Centre.',
          planForNextWeek: 'Quantize model to int8 format for embedded edge inference.',
          learningSummary: 'Mixup augmentation improved generalization score across dryland tiles by 4.2%.',
          attachments: [
            {
              fileName: 'Model_Accuracy_Confusion_Matrix.png',
              fileSize: '850 KB',
              fileUrl: '#',
              fileType: 'image/png'
            }
          ],
          submissionDate: '26/08/2026',
          submittedBy: 'Prof. S. Ananth',
          mentorReview: 'Weekly report submitted and queued for mentor review.',
          mentorVerifiedBy: null,
          mentorVerificationDate: null
        }
      ],
      technicalDeliverables: [
        {
          id: 'D1',
          deliverableCode: 'D1',
          title: 'Automated Pre-processing Benchmark Dossier',
          description: 'Complete mathematical proof and code benchmark of atmospheric correction pipeline.',
          targetTimeline: 'Month 03 (Oct 2026)',
          status: 'Verified',
          deliverableType: 'Test Qualification Dossier',
          evidence: 'D1_Atmospheric_Correction_Dossier_Signed.pdf',
          evidenceFileName: 'D1_Atmospheric_Correction_Dossier_Signed.pdf',
          evidenceUrl: '#',
          submissionDate: '15/08/2026',
          mentorReview: 'Deliverable D1 verified and accepted by Technical Panel.',
          mentorVerifiedBy: 'Dr. K. Raghavan',
          mentorVerificationDate: '22/08/2026'
        },
        {
          id: 'D2',
          deliverableCode: 'D2',
          title: 'Calibrated Crop Health Estimation Engine',
          description: 'Production-grade microservices container with model weights and inference SDK.',
          targetTimeline: 'Month 06 (Jan 2027)',
          status: 'Submitted',
          deliverableType: 'Firmware Source Code',
          evidence: 'CropHealth_Engine_v1.0.tar.gz',
          evidenceFileName: 'CropHealth_Engine_v1.0.tar.gz',
          evidenceUrl: '#',
          submissionDate: '28/08/2026',
          mentorReview: 'Submitted for code audit and benchmark validation.',
          mentorVerifiedBy: null,
          mentorVerificationDate: null
        },
        {
          id: 'D3',
          deliverableCode: 'D3',
          title: 'District-Scale Pilot Validation Dossier',
          description: 'Comprehensive field accuracy verification across 500 farmer field plots.',
          targetTimeline: 'Month 12 (Jul 2027)',
          status: 'Draft',
          deliverableType: 'Field Validation Certificate',
          evidence: null,
          evidenceFileName: null,
          evidenceUrl: null,
          submissionDate: null,
          mentorReview: null,
          mentorVerifiedBy: null,
          mentorVerificationDate: null
        }
      ],
      finalAssets: {
        finalReport: {
          title: 'Hyperspectral Agricultural Pipeline Final Project Report',
          fileName: 'TDP_GEO_Final_Technical_Report_Draft.pdf',
          fileSize: '4.8 MB',
          uploadDate: '20/08/2026',
          status: 'Draft',
          summary: 'Full project dossier covering system design, GPU benchmarking, and field trials.',
          mentorReview: 'Draft review: Include detailed MIL-STD validation section before final sign-off.'
        },
        presentation: {
          title: 'TDP Project Evaluation Presentation Deck',
          fileName: 'Hyperspectral_Pipeline_Defense_Deck.pptx',
          fileSize: '8.2 MB',
          uploadDate: '18/08/2026',
          status: 'Submitted',
          slideCount: 24,
          mentorReview: 'Slide deck structured cleanly for TAC evaluation.'
        },
        projectVideo: {
          title: 'Automated Satellite Ingestion & Canopy Inference Demo',
          videoUrl: 'https://youtu.be/iittnif-hyperspectral-demo',
          videoDuration: '04:35 mins',
          uploadDate: '22/08/2026',
          status: 'Submitted',
          embedPlatform: 'YouTube / MP4',
          mentorReview: 'Video demonstrates clear real-time inference workflow.'
        },
        codeRepository: {
          repoUrl: 'https://github.com/iittnif-tdp/hyperspectral-pipeline-core',
          branch: 'main',
          accessNotes: 'Private institutional repository; token provisioned to IITTNiF TAC panel.',
          datasetRepoUrl: 'https://huggingface.co/datasets/iittnif/agri-hyperspectral-bench',
          status: 'Verified',
          license: 'Apache 2.0 / IITTNiF Institutional IP',
          mentorReview: 'Code repository contains clean documentation, Dockerfile, and unit tests.'
        }
      }
    };

    setExecData(fallback);
    setFinalAssetsForm(fallback.finalAssets);
  };

  useEffect(() => {
    fetchExecutionData();
  }, [applicationId]);

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Draft':
        return <span className="badge badge-status badge-draft"><Clock size={11} /> Draft</span>;
      case 'Submitted':
        return <span className="badge badge-status badge-submitted"><FileText size={11} /> Submitted</span>;
      case 'Verified':
        return <span className="badge badge-status badge-verified"><CheckCircle size={11} /> Verified</span>;
      case 'Needs Revision':
        return <span className="badge badge-status badge-revision"><AlertTriangle size={11} /> Needs Revision</span>;
      default:
        return <span className="badge badge-status badge-neutral">{status || 'Draft'}</span>;
    }
  };

  // Submit Weekly Progress
  const handleWeeklySubmit = async (e) => {
    e.preventDefault();
    if (!weeklyFormData.tasksUndertaken.trim()) {
      alert('Please enter tasks undertaken for this week.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/v1/vikas/technology-development/execution/${applicationId}/weekly-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weeklyFormData)
      });
      if (res.ok) {
        const updated = await res.json();
        setExecData(updated);
      } else {
        // Fallback local update
        const newLog = {
          ...weeklyFormData,
          id: `WP-W${weeklyFormData.weekNumber}`,
          submissionDate: new Date().toLocaleString()
        };
        setExecData(prev => ({
          ...prev,
          weeklyProgressLogs: [newLog, ...prev.weeklyProgressLogs.filter(w => w.weekNumber !== weeklyFormData.weekNumber)]
        }));
      }
      setShowWeeklyModal(false);
      setWeeklyFormData({
        weekNumber: (weeklyFormData.weekNumber || 1) + 1,
        tasksUndertaken: '',
        toolsDatasetsMethodsUsed: '',
        status: 'Submitted',
        resultsOutputs: '',
        challenges: '',
        solutions: '',
        supportNeeded: '',
        planForNextWeek: '',
        learningSummary: '',
        attachments: []
      });
    } catch (err) {
      // Local fallback
      const newLog = {
        ...weeklyFormData,
        id: `WP-W${weeklyFormData.weekNumber}`,
        submissionDate: new Date().toLocaleString()
      };
      setExecData(prev => ({
        ...prev,
        weeklyProgressLogs: [newLog, ...prev.weeklyProgressLogs.filter(w => w.weekNumber !== weeklyFormData.weekNumber)]
      }));
      setShowWeeklyModal(false);
    }
  };

  // Milestone Update Evidence
  const handleMilestoneUpdate = async () => {
    if (!editingMilestone) return;

    try {
      const updatedPayload = {
        ...editingMilestone,
        status: milestoneFormData.status,
        evidence: milestoneFormData.evidence || 'Milestone_Verification_Evidence.pdf',
        evidenceFileName: milestoneFormData.evidenceFileName || 'Milestone_Verification_Evidence.pdf',
        evidenceUrl: milestoneFormData.evidenceUrl || '#'
      };

      const res = await fetch(`http://localhost:5000/api/v1/vikas/technology-development/execution/${applicationId}/milestones/${editingMilestone.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });
      if (res.ok) {
        const updated = await res.json();
        setExecData(updated);
      } else {
        setExecData(prev => ({
          ...prev,
          milestones: prev.milestones.map(m => m.id === editingMilestone.id ? updatedPayload : m)
        }));
      }
    } catch (err) {
      setExecData(prev => ({
        ...prev,
        milestones: prev.milestones.map(m => m.id === editingMilestone.id ? { ...m, ...milestoneFormData } : m)
      }));
    } finally {
      setEditingMilestone(null);
    }
  };

  // Deliverable Update
  const handleDeliverableUpdate = async () => {
    if (!editingDeliverable) return;

    try {
      const updatedPayload = {
        ...editingDeliverable,
        status: deliverableFormData.status,
        evidence: deliverableFormData.evidence || 'Deliverable_Package.zip',
        evidenceFileName: deliverableFormData.evidenceFileName || 'Deliverable_Package.zip',
        evidenceUrl: deliverableFormData.evidenceUrl || '#'
      };

      const res = await fetch(`http://localhost:5000/api/v1/vikas/technology-development/execution/${applicationId}/deliverables/${editingDeliverable.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });
      if (res.ok) {
        const updated = await res.json();
        setExecData(updated);
      } else {
        setExecData(prev => ({
          ...prev,
          technicalDeliverables: prev.technicalDeliverables.map(d => d.id === editingDeliverable.id ? updatedPayload : d)
        }));
      }
    } catch (err) {
      setExecData(prev => ({
        ...prev,
        technicalDeliverables: prev.technicalDeliverables.map(d => d.id === editingDeliverable.id ? { ...d, ...deliverableFormData } : d)
      }));
    } finally {
      setEditingDeliverable(null);
    }
  };

  // Mentor Verification Submit
  const handleMentorVerifySubmit = async () => {
    if (!reviewModalData) return;

    const payload = {
      itemType: reviewModalData.itemType,
      itemId: reviewModalData.itemId,
      status: mentorTargetStatus,
      mentorReview: mentorFeedbackText || (mentorTargetStatus === 'Verified' ? 'Reviewed and verified by Domain Mentor.' : 'Revision requested with specific suggestions.')
    };

    try {
      const res = await fetch(`http://localhost:5000/api/v1/vikas/technology-development/execution/${applicationId}/mentor-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updated = await res.json();
        setExecData(updated);
        setFinalAssetsForm(updated.finalAssets);
      } else {
        applyLocalMentorVerification(payload);
      }
    } catch (err) {
      applyLocalMentorVerification(payload);
    } finally {
      setReviewModalData(null);
      setMentorFeedbackText('');
    }
  };

  const applyLocalMentorVerification = (payload) => {
    setExecData(prev => {
      const copy = { ...prev };
      const nowStr = new Date().toLocaleString();
      if (payload.itemType === 'milestone') {
        copy.milestones = copy.milestones.map(m => m.id === payload.itemId ? {
          ...m,
          status: payload.status,
          mentorReview: payload.mentorReview,
          mentorVerifiedBy: 'Dr. K. Raghavan',
          mentorVerificationDate: nowStr
        } : m);
      } else if (payload.itemType === 'weekly_progress') {
        copy.weeklyProgressLogs = copy.weeklyProgressLogs.map(w => (w.id === payload.itemId || String(w.weekNumber) === String(payload.itemId)) ? {
          ...w,
          status: payload.status,
          mentorReview: payload.mentorReview,
          mentorVerifiedBy: 'Dr. K. Raghavan',
          mentorVerificationDate: nowStr
        } : w);
      } else if (payload.itemType === 'deliverable') {
        copy.technicalDeliverables = copy.technicalDeliverables.map(d => (d.id === payload.itemId || d.deliverableCode === payload.itemId) ? {
          ...d,
          status: payload.status,
          mentorReview: payload.mentorReview,
          mentorVerifiedBy: 'Dr. K. Raghavan',
          mentorVerificationDate: nowStr
        } : d);
      }
      return copy;
    });
  };

  // File Upload Helper for Weekly Progress
  const handleWeeklyFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newAttachments = files.map(f => ({
      fileName: f.name,
      fileSize: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      fileUrl: '#',
      fileType: f.type || 'application/pdf'
    }));

    setWeeklyFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  if (loading) {
    return (
      <div className="techdev-detail-page tdp-exec-page animate-fade-in">
        <div className="detail-top-nav">
          <button className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
        <div className="card loading-detail-card">
          <RefreshCw size={32} className="animate-spin text-emerald" />
          <p>Loading project execution workspace for #{applicationId}...</p>
        </div>
      </div>
    );
  }

  if (!execData) return null;

  return (
    <div className="techdev-detail-page tdp-exec-page animate-fade-in">
      {/* Top Navigation */}
      <div className="detail-top-nav">
        <button className="btn-back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to Applications Tracking</span>
        </button>
        <span className="top-nav-breadcrumb">
          VIKAS Platform / Technology Development / <strong className="text-emerald font-mono">Project Execution Workspace ({execData.applicationNumber})</strong>
        </span>
      </div>

      {/* Main Execution Header Card */}
      <div className="card exec-header-card">
        <div className="exec-header-top">
          <div className="exec-id-wrap">
            <div className="hero-badge-row">
              <span className="badge badge-emerald font-mono">Project Execution Phase</span>
              <span className="badge badge-cyan">TRL {execData.currentTrl} → TRL {execData.targetTrl}</span>
              <span className="badge badge-gold">Sanction Order Active</span>
            </div>
            <h1 className="exec-project-title mt-8">{execData.projectTitle}</h1>
            <div className="exec-meta-sub mt-6">
              <span>Domain: <strong className="text-cyan">{execData.technologyDomain}</strong></span>
              <span>•</span>
              <span>Lead PI: <strong>{execData.applicantName} ({execData.organization})</strong></span>
              <span>•</span>
              <span>Assigned Mentor: <strong className="text-emerald">{execData.assignedMentor}</strong></span>
            </div>
          </div>

          {/* Role Switcher (Project Team vs Mentor Mode) */}
          <div className="role-switcher-card">
            <div className="role-switcher-header">
              <Sliders size={14} className="text-muted" />
              <span>Workspace Persona:</span>
            </div>
            <div className="role-toggle-pill">
              <button 
                className={`btn-role-toggle ${userRole === 'team' ? 'active-team' : ''}`}
                onClick={() => setUserRole('team')}
              >
                <User size={13} />
                <span>Project Team</span>
              </button>
              <button 
                className={`btn-role-toggle ${userRole === 'mentor' ? 'active-mentor' : ''}`}
                onClick={() => setUserRole('mentor')}
              >
                <UserCheck size={13} />
                <span>Domain Mentor</span>
              </button>
            </div>
            <span className="role-mode-hint">
              {userRole === 'team' ? 'Upload deliverables & progress logs' : 'Verify submissions & leave feedback'}
            </span>
          </div>
        </div>

        {/* Overall Execution Progress Meter */}
        <div className="exec-progress-meter-box mt-20">
          <div className="meter-label-row">
            <div className="meter-title-flex">
              <Activity size={16} className="text-emerald" />
              <strong>Project Execution & Milestone Fulfillment</strong>
            </div>
            <span className="meter-percent-text font-mono text-emerald">{execData.overallProgressPercent || 45}% Verified</span>
          </div>
          <div className="meter-track-bg mt-6">
            <div 
              className="meter-track-fill" 
              style={{ width: `${execData.overallProgressPercent || 45}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar for 7 Modules */}
      <div className="card exec-tabs-card mt-20">
        <div className="exec-tabs-nav">
          <button 
            className={`exec-tab-btn ${activeTab === 'milestones' ? 'active' : ''}`}
            onClick={() => setActiveTab('milestones')}
          >
            <Layers size={15} />
            <span>1. Milestone Tracker ({execData.milestones?.length || 0})</span>
          </button>

          <button 
            className={`exec-tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            <Clock size={15} />
            <span>2. Weekly Progress Logs ({execData.weeklyProgressLogs?.length || 0})</span>
          </button>

          <button 
            className={`exec-tab-btn ${activeTab === 'deliverables' ? 'active' : ''}`}
            onClick={() => setActiveTab('deliverables')}
          >
            <Cpu size={15} />
            <span>3. Technical Deliverables ({execData.technicalDeliverables?.length || 0})</span>
          </button>

          <button 
            className={`exec-tab-btn ${activeTab === 'final_assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('final_assets')}
          >
            <Sparkles size={15} />
            <span>4. Final Project Assets & Report</span>
          </button>

          <button 
            className={`exec-tab-btn ${activeTab === 'repo' ? 'active' : ''}`}
            onClick={() => setActiveTab('repo')}
          >
            <Code size={15} />
            <span>5. Code / Data Repository</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: PROJECT MILESTONE TRACKER */}
      {/* ========================================================================= */}
      {activeTab === 'milestones' && (
        <div className="exec-tab-content-wrap mt-20 animate-fade-in">
          <div className="card exec-module-card">
            <div className="module-header-row">
              <div>
                <h3 className="module-title">
                  <Layers size={18} className="text-emerald" />
                  Project Milestone Tracker
                </h3>
                <p className="module-desc">
                  Track phased technical progression, upload verification evidence, and receive mentor verification.
                </p>
              </div>

              {userRole === 'team' && (
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => alert('New milestone can be appended upon formal approval from TAC.')}
                >
                  <Plus size={14} />
                  <span>Request Milestone Amendment</span>
                </button>
              )}
            </div>

            {/* Milestones Table */}
            <div className="table-responsive mt-16">
              <table className="exec-data-table">
                <thead>
                  <tr>
                    <th>Milestone</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Evidence Attached</th>
                    <th>Mentor Review & Verification</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {execData.milestones?.map((m) => (
                    <tr key={m.id} className="exec-row">
                      <td className="font-mono text-emerald">
                        <strong>{m.id}</strong>
                        <div className="font-semibold text-primary">{m.milestone}</div>
                      </td>
                      <td className="cell-desc-text">{m.description}</td>
                      <td className="font-mono text-muted">{m.dueDate}</td>
                      <td>{getStatusBadge(m.status)}</td>
                      <td>
                        {m.evidence ? (
                          <div className="evidence-chip">
                            <FileText size={13} className="text-cyan" />
                            <span className="font-mono">{m.evidenceFileName || m.evidence}</span>
                          </div>
                        ) : (
                          <span className="text-muted text-xs italic">No evidence uploaded yet</span>
                        )}
                      </td>
                      <td>
                        {m.mentorReview ? (
                          <div className="mentor-review-box">
                            <span className="mentor-review-text">"{m.mentorReview}"</span>
                            {m.mentorVerifiedBy && (
                              <div className="mentor-sign-line">
                                <ShieldCheck size={12} className="text-emerald" />
                                <span>Verified by {m.mentorVerifiedBy} ({m.mentorVerificationDate?.split(',')[0]})</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted text-xs italic">Awaiting submission</span>
                        )}
                      </td>
                      <td className="text-right">
                        {userRole === 'team' ? (
                          <button 
                            className="btn btn-sm btn-outline"
                            onClick={() => {
                              setEditingMilestone(m);
                              setMilestoneFormData({
                                status: m.status === 'Draft' ? 'Submitted' : m.status,
                                evidence: m.evidence || '',
                                evidenceFileName: m.evidenceFileName || '',
                                evidenceUrl: m.evidenceUrl || '#'
                              });
                            }}
                          >
                            <Upload size={13} />
                            <span>Upload Evidence</span>
                          </button>
                        ) : (
                          <button 
                            className="btn btn-sm btn-mentor-review"
                            onClick={() => {
                              setReviewModalData({
                                itemType: 'milestone',
                                itemId: m.id,
                                title: `${m.id}: ${m.milestone}`,
                                currentStatus: m.status,
                                mentorReview: m.mentorReview || ''
                              });
                              setMentorFeedbackText(m.mentorReview || '');
                              setMentorTargetStatus(m.status === 'Needs Revision' ? 'Needs Revision' : 'Verified');
                            }}
                          >
                            <UserCheck size={13} />
                            <span>Mentor Review</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 2: WEEKLY PROGRESS SUBMISSION FORM & LOG HISTORY */}
      {/* ========================================================================= */}
      {activeTab === 'weekly' && (
        <div className="exec-tab-content-wrap mt-20 animate-fade-in">
          <div className="card exec-module-card">
            <div className="module-header-row">
              <div>
                <h3 className="module-title">
                  <Clock size={18} className="text-emerald" />
                  Weekly Progress Reports & Technical Logs
                </h3>
                <p className="module-desc">
                  Weekly submissions tracking tasks, tools, outputs, challenges, and support requirements with mentor verification.
                </p>
              </div>

              {userRole === 'team' && (
                <button 
                  className="btn btn-primary-cta"
                  onClick={() => setShowWeeklyModal(true)}
                >
                  <Plus size={16} />
                  <span>Submit Weekly Progress Report</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

            {/* Weekly Submission Logs Timeline */}
            <div className="weekly-logs-container mt-20">
              {execData.weeklyProgressLogs?.length === 0 ? (
                <div className="empty-weekly-box">
                  <Clock size={36} className="text-muted" />
                  <h4>No Weekly Progress Reports Logged Yet</h4>
                  <p>Click "Submit Weekly Progress Report" to log your first week's activities.</p>
                </div>
              ) : (
                execData.weeklyProgressLogs.map((log) => (
                  <div key={log.id} className="card weekly-log-card">
                    <div className="weekly-log-header">
                      <div className="weekly-week-badge-group">
                        <span className="week-number-pill">WEEK {log.weekNumber}</span>
                        <span className="week-date-sub font-mono">Submitted on {log.submissionDate} by {log.submittedBy}</span>
                      </div>
                      <div className="weekly-status-action">
                        {getStatusBadge(log.status)}
                        {userRole === 'mentor' && (
                          <button 
                            className="btn btn-sm btn-mentor-review ml-10"
                            onClick={() => {
                              setReviewModalData({
                                itemType: 'weekly_progress',
                                itemId: log.id || `WP-W${log.weekNumber}`,
                                title: `Weekly Report (Week ${log.weekNumber})`,
                                currentStatus: log.status,
                                mentorReview: log.mentorReview || ''
                              });
                              setMentorFeedbackText(log.mentorReview || '');
                              setMentorTargetStatus(log.status === 'Needs Revision' ? 'Needs Revision' : 'Verified');
                            }}
                          >
                            <UserCheck size={13} />
                            <span>Verify Week {log.weekNumber}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 11 Fields Grid */}
                    <div className="weekly-fields-grid mt-14">
                      <div className="weekly-field-cell col-span-2">
                        <span className="field-label">1. Tasks Undertaken:</span>
                        <p className="field-val">{log.tasksUndertaken}</p>
                      </div>

                      <div className="weekly-field-cell">
                        <span className="field-label">2. Tools / Datasets / Methods Used:</span>
                        <p className="field-val font-mono">{log.toolsDatasetsMethodsUsed}</p>
                      </div>

                      <div className="weekly-field-cell">
                        <span className="field-label">3. Results & Outputs:</span>
                        <p className="field-val">{log.resultsOutputs}</p>
                      </div>

                      <div className="weekly-field-cell">
                        <span className="field-label">4. Challenges Encountered:</span>
                        <p className="field-val text-amber">{log.challenges || 'None reported'}</p>
                      </div>

                      <div className="weekly-field-cell">
                        <span className="field-label">5. Solutions Implemented:</span>
                        <p className="field-val">{log.solutions || 'N/A'}</p>
                      </div>

                      <div className="weekly-field-cell">
                        <span className="field-label">6. Support Needed from IITTNiF / Mentors:</span>
                        <p className="field-val text-cyan">{log.supportNeeded || 'None required currently'}</p>
                      </div>

                      <div className="weekly-field-cell">
                        <span className="field-label">7. Plan for Next Week:</span>
                        <p className="field-val">{log.planForNextWeek}</p>
                      </div>

                      <div className="weekly-field-cell col-span-2">
                        <span className="field-label">8. Learning Summary:</span>
                        <p className="field-val italic bg-subtle">{log.learningSummary}</p>
                      </div>
                    </div>

                    {/* Attachments & Mentor Feedback Footer */}
                    <div className="weekly-card-footer mt-14">
                      <div className="weekly-attachments-row">
                        <span className="field-label">Attachments:</span>
                        {log.attachments?.length > 0 ? (
                          log.attachments.map((att, i) => (
                            <div key={i} className="attachment-chip">
                              <FileText size={12} className="text-cyan" />
                              <span className="font-mono">{att.fileName} ({att.fileSize})</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-muted text-xs italic">No file attached</span>
                        )}
                      </div>

                      {/* Mentor Verification Box */}
                      {log.mentorReview && (
                        <div className="mentor-verification-strip mt-10">
                          <div className="strip-icon">
                            <ShieldCheck size={16} className="text-emerald" />
                          </div>
                          <div className="strip-content">
                            <strong>Mentor Verification Note ({log.mentorVerifiedBy || 'Dr. K. Raghavan'}):</strong>
                            <p className="italic">"{log.mentorReview}"</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 3: TECHNICAL DELIVERABLES (D1 - D4) */}
      {/* ========================================================================= */}
      {activeTab === 'deliverables' && (
        <div className="exec-tab-content-wrap mt-20 animate-fade-in">
          <div className="card exec-module-card">
            <div className="module-header-row">
              <div>
                <h3 className="module-title">
                  <Cpu size={18} className="text-emerald" />
                  Technical Deliverables & Prototype Artifacts
                </h3>
                <p className="module-desc">
                  Submission of verified engineering models, firmware binaries, datasets, and qualification certificates.
                </p>
              </div>
            </div>

            <div className="deliverables-cards-grid mt-20">
              {execData.technicalDeliverables?.map((d) => (
                <div key={d.id} className="card deliverable-item-card">
                  <div className="deliv-card-header">
                    <span className="deliv-code-badge font-mono">{d.deliverableCode}</span>
                    {getStatusBadge(d.status)}
                  </div>

                  <h4 className="deliv-title mt-8">{d.title}</h4>
                  <p className="deliv-desc mt-4">{d.description}</p>

                  <div className="deliv-meta-grid mt-12">
                    <div className="deliv-meta-item">
                      <span className="meta-label">Output Type:</span>
                      <strong className="text-cyan">{d.deliverableType}</strong>
                    </div>
                    <div className="deliv-meta-item">
                      <span className="meta-label">Target Timeline:</span>
                      <strong className="font-mono text-muted">{d.targetTimeline}</strong>
                    </div>
                  </div>

                  {/* Evidence Artifact */}
                  <div className="deliv-evidence-box mt-12">
                    <span className="meta-label">Submission Package:</span>
                    {d.evidence ? (
                      <div className="evidence-package-line">
                        <FileText size={14} className="text-emerald" />
                        <strong className="font-mono">{d.evidenceFileName || d.evidence}</strong>
                        <button className="btn-icon-xs" title="Download Verified Package">
                          <Download size={12} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted text-xs italic">Package not submitted yet</span>
                    )}
                  </div>

                  {/* Mentor Review */}
                  {d.mentorReview && (
                    <div className="deliv-mentor-feedback mt-10">
                      <span className="meta-label">Mentor Verification:</span>
                      <p className="feedback-text">"{d.mentorReview}"</p>
                    </div>
                  )}

                  {/* Action */}
                  <div className="deliv-card-action mt-16">
                    {userRole === 'team' ? (
                      <button 
                        className="btn btn-sm btn-outline w-full"
                        onClick={() => {
                          setEditingDeliverable(d);
                          setDeliverableFormData({
                            status: d.status === 'Draft' ? 'Submitted' : d.status,
                            evidence: d.evidence || '',
                            evidenceFileName: d.evidenceFileName || '',
                            evidenceUrl: d.evidenceUrl || '#'
                          });
                        }}
                      >
                        <Upload size={13} />
                        <span>Upload Deliverable Artifact ({d.deliverableCode})</span>
                      </button>
                    ) : (
                      <button 
                        className="btn btn-sm btn-mentor-review w-full"
                        onClick={() => {
                          setReviewModalData({
                            itemType: 'deliverable',
                            itemId: d.id || d.deliverableCode,
                            title: `Deliverable ${d.deliverableCode}: ${d.title}`,
                            currentStatus: d.status,
                            mentorReview: d.mentorReview || ''
                          });
                          setMentorFeedbackText(d.mentorReview || '');
                          setMentorTargetStatus(d.status === 'Needs Revision' ? 'Needs Revision' : 'Verified');
                        }}
                      >
                        <UserCheck size={13} />
                        <span>Review & Verify Deliverable</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 4: FINAL PROJECT ASSETS (REPORT, PRESENTATION, VIDEO) */}
      {/* ========================================================================= */}
      {activeTab === 'final_assets' && (
        <div className="exec-tab-content-wrap mt-20 animate-fade-in">
          <div className="card exec-module-card">
            <div className="module-header-row">
              <div>
                <h3 className="module-title">
                  <Sparkles size={18} className="text-emerald" />
                  Final Project Deliverables & Dissemination Assets
                </h3>
                <p className="module-desc">
                  Final technical report, project presentation deck, and demonstration testimonial video.
                </p>
              </div>
            </div>

            <div className="final-assets-grid mt-20">
              {/* 1. Final Project Report */}
              <div className="card final-asset-card">
                <div className="asset-header">
                  <div className="asset-icon-box bg-emerald-subtle">
                    <FileText size={22} className="text-emerald" />
                  </div>
                  <div>
                    <h4 className="asset-title">4. Final Project Report</h4>
                    <span className="asset-sub">Comprehensive technical dossier & TRL 6 qualification</span>
                  </div>
                </div>

                <div className="asset-body mt-12">
                  <div className="asset-meta-line">
                    <span>Status:</span>
                    {getStatusBadge(execData.finalAssets?.finalReport?.status || 'Draft')}
                  </div>
                  <div className="asset-file-box mt-8">
                    {execData.finalAssets?.finalReport?.fileName ? (
                      <div className="asset-file-line">
                        <FileText size={14} className="text-cyan" />
                        <strong className="font-mono">{execData.finalAssets.finalReport.fileName}</strong>
                        <span className="file-size text-muted font-mono">{execData.finalAssets.finalReport.fileSize}</span>
                      </div>
                    ) : (
                      <span className="text-muted text-xs italic">No final report file uploaded yet</span>
                    )}
                  </div>

                  {execData.finalAssets?.finalReport?.mentorReview && (
                    <div className="asset-mentor-note mt-8">
                      <strong>Mentor Review:</strong> {execData.finalAssets.finalReport.mentorReview}
                    </div>
                  )}
                </div>

                <div className="asset-action mt-14">
                  {userRole === 'team' ? (
                    <button 
                      className="btn btn-sm btn-outline w-full"
                      onClick={() => alert('Uploading Final Project Report dossier...')}
                    >
                      <Upload size={13} />
                      <span>Upload Final Report (PDF)</span>
                    </button>
                  ) : (
                    <button 
                      className="btn btn-sm btn-mentor-review w-full"
                      onClick={() => {
                        setReviewModalData({
                          itemType: 'final_asset',
                          itemId: 'final_report',
                          title: 'Final Project Report',
                          currentStatus: execData.finalAssets?.finalReport?.status || 'Submitted',
                          mentorReview: execData.finalAssets?.finalReport?.mentorReview || ''
                        });
                        setMentorFeedbackText(execData.finalAssets?.finalReport?.mentorReview || '');
                        setMentorTargetStatus('Verified');
                      }}
                    >
                      <UserCheck size={13} />
                      <span>Verify Final Report</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Presentation Deck */}
              <div className="card final-asset-card">
                <div className="asset-header">
                  <div className="asset-icon-box bg-cyan-subtle">
                    <Presentation size={22} className="text-cyan" />
                  </div>
                  <div>
                    <h4 className="asset-title">5. Project Presentation</h4>
                    <span className="asset-sub">Evaluation committee defense & slide deck</span>
                  </div>
                </div>

                <div className="asset-body mt-12">
                  <div className="asset-meta-line">
                    <span>Status:</span>
                    {getStatusBadge(execData.finalAssets?.presentation?.status || 'Draft')}
                  </div>
                  <div className="asset-file-box mt-8">
                    {execData.finalAssets?.presentation?.fileName ? (
                      <div className="asset-file-line">
                        <Presentation size={14} className="text-cyan" />
                        <strong className="font-mono">{execData.finalAssets.presentation.fileName}</strong>
                        <span className="file-size text-muted font-mono">{execData.finalAssets.presentation.slideCount} slides</span>
                      </div>
                    ) : (
                      <span className="text-muted text-xs italic">Presentation deck not uploaded</span>
                    )}
                  </div>

                  {execData.finalAssets?.presentation?.mentorReview && (
                    <div className="asset-mentor-note mt-8">
                      <strong>Mentor Review:</strong> {execData.finalAssets.presentation.mentorReview}
                    </div>
                  )}
                </div>

                <div className="asset-action mt-14">
                  {userRole === 'team' ? (
                    <button 
                      className="btn btn-sm btn-outline w-full"
                      onClick={() => alert('Uploading Presentation deck (PPTX/PDF)...')}
                    >
                      <Upload size={13} />
                      <span>Upload Slide Deck</span>
                    </button>
                  ) : (
                    <button 
                      className="btn btn-sm btn-mentor-review w-full"
                      onClick={() => {
                        setReviewModalData({
                          itemType: 'final_asset',
                          itemId: 'presentation',
                          title: 'Evaluation Presentation Deck',
                          currentStatus: execData.finalAssets?.presentation?.status || 'Submitted',
                          mentorReview: execData.finalAssets?.presentation?.mentorReview || ''
                        });
                        setMentorFeedbackText(execData.finalAssets?.presentation?.mentorReview || '');
                        setMentorTargetStatus('Verified');
                      }}
                    >
                      <UserCheck size={13} />
                      <span>Verify Presentation</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Testimonial / Project Video */}
              <div className="card final-asset-card">
                <div className="asset-header">
                  <div className="asset-icon-box bg-amber-subtle">
                    <Video size={22} className="text-amber" />
                  </div>
                  <div>
                    <h4 className="asset-title">6. Testimonial / Project Video</h4>
                    <span className="asset-sub">Prototype demonstration & team testimonial</span>
                  </div>
                </div>

                <div className="asset-body mt-12">
                  <div className="asset-meta-line">
                    <span>Status:</span>
                    {getStatusBadge(execData.finalAssets?.projectVideo?.status || 'Draft')}
                  </div>
                  <div className="asset-file-box mt-8">
                    {execData.finalAssets?.projectVideo?.videoUrl ? (
                      <div className="asset-video-link-line">
                        <Video size={14} className="text-amber" />
                        <a 
                          href={execData.finalAssets.projectVideo.videoUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="font-mono text-cyan truncate"
                        >
                          {execData.finalAssets.projectVideo.videoUrl}
                        </a>
                        <span className="video-dur font-mono">{execData.finalAssets.projectVideo.videoDuration}</span>
                      </div>
                    ) : (
                      <span className="text-muted text-xs italic">No video link registered</span>
                    )}
                  </div>

                  {execData.finalAssets?.projectVideo?.mentorReview && (
                    <div className="asset-mentor-note mt-8">
                      <strong>Mentor Review:</strong> {execData.finalAssets.projectVideo.mentorReview}
                    </div>
                  )}
                </div>

                <div className="asset-action mt-14">
                  {userRole === 'team' ? (
                    <button 
                      className="btn btn-sm btn-outline w-full"
                      onClick={() => alert('Linking video URL...')}
                    >
                      <Video size={13} />
                      <span>Link Demo Video</span>
                    </button>
                  ) : (
                    <button 
                      className="btn btn-sm btn-mentor-review w-full"
                      onClick={() => {
                        setReviewModalData({
                          itemType: 'final_asset',
                          itemId: 'project_video',
                          title: 'Testimonial / Project Video',
                          currentStatus: execData.finalAssets?.projectVideo?.status || 'Submitted',
                          mentorReview: execData.finalAssets?.projectVideo?.mentorReview || ''
                        });
                        setMentorFeedbackText(execData.finalAssets?.projectVideo?.mentorReview || '');
                        setMentorTargetStatus('Verified');
                      }}
                    >
                      <UserCheck size={13} />
                      <span>Verify Video Demo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 5: PROJECT DATA & CODE REPOSITORY */}
      {/* ========================================================================= */}
      {activeTab === 'repo' && (
        <div className="exec-tab-content-wrap mt-20 animate-fade-in">
          <div className="card exec-module-card">
            <div className="module-header-row">
              <div>
                <h3 className="module-title">
                  <Code size={18} className="text-emerald" />
                  7. Project Data / Code Repository Management
                </h3>
                <p className="module-desc">
                  Institutional version control repositories, dataset storage links, and license governance.
                </p>
              </div>
            </div>

            <div className="repo-details-box mt-20">
              <div className="repo-card-item">
                <div className="repo-icon-wrap">
                  <GitBranch size={24} className="text-primary" />
                </div>
                <div className="repo-content-flex">
                  <div className="repo-title-row">
                    <strong>Source Code Version Control:</strong>
                    {getStatusBadge(execData.finalAssets?.codeRepository?.status || 'Draft')}
                  </div>
                  <div className="repo-url-line mt-6">
                    <span className="font-mono text-cyan">
                      {execData.finalAssets?.codeRepository?.repoUrl || 'https://github.com/iittnif-tdp/sample-repository'}
                    </span>
                    <span className="branch-tag font-mono">
                      branch: {execData.finalAssets?.codeRepository?.branch || 'main'}
                    </span>
                  </div>
                  <p className="repo-access-notes mt-6">
                    <strong>Access Credentials:</strong> {execData.finalAssets?.codeRepository?.accessNotes || 'Private institutional repository.'}
                  </p>
                </div>
              </div>

              <div className="repo-card-item mt-14">
                <div className="repo-icon-wrap">
                  <Database size={24} className="text-cyan" />
                </div>
                <div className="repo-content-flex">
                  <div className="repo-title-row">
                    <strong>Dataset & Benchmarking Artifacts Repository:</strong>
                  </div>
                  <div className="repo-url-line mt-6">
                    <span className="font-mono text-cyan">
                      {execData.finalAssets?.codeRepository?.datasetRepoUrl || 'https://huggingface.co/datasets/iittnif/project-data'}
                    </span>
                  </div>
                  <p className="repo-access-notes mt-6">
                    <strong>Institutional License:</strong> {execData.finalAssets?.codeRepository?.license || 'Apache 2.0 / IITTNiF Institutional IP'}
                  </p>
                </div>
              </div>

              {execData.finalAssets?.codeRepository?.mentorReview && (
                <div className="mentor-verification-strip mt-16">
                  <div className="strip-icon">
                    <ShieldCheck size={16} className="text-emerald" />
                  </div>
                  <div className="strip-content">
                    <strong>Mentor Verification Note:</strong>
                    <p className="italic">"{execData.finalAssets.codeRepository.mentorReview}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: WEEKLY PROGRESS SUBMISSION FORM (ALL 11 FIELDS) */}
      {/* ========================================================================= */}
      {showWeeklyModal && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setShowWeeklyModal(false)}>
          <div className="modal-content-card modal-lg card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-section" style={{ borderBottom: '2px solid #10b981' }}>
              <div className="modal-header-brand">
                <div className="modal-icon-bg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <Clock size={24} style={{ color: '#10b981' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Submit Weekly Progress Report
                  </h3>
                  <span className="badge badge-emerald font-mono mt-2">
                    Week Number: {weeklyFormData.weekNumber}
                  </span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setShowWeeklyModal(false)}>×</button>
            </div>

            <form onSubmit={handleWeeklySubmit} className="modal-body-scroll">
              <div className="form-grid-two">
                {/* 1. Week Number */}
                <div className="form-group">
                  <label className="form-label">1. Week Number *</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="104"
                    value={weeklyFormData.weekNumber}
                    onChange={(e) => setWeeklyFormData({ ...weeklyFormData, weekNumber: parseInt(e.target.value) || 1 })}
                    className="form-control font-mono"
                    required
                  />
                </div>

                {/* 4. Initial Status */}
                <div className="form-group">
                  <label className="form-label">4. Status *</label>
                  <select 
                    value={weeklyFormData.status}
                    onChange={(e) => setWeeklyFormData({ ...weeklyFormData, status: e.target.value })}
                    className="form-control"
                  >
                    <option value="Submitted">Submitted (for Mentor Review)</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* 2. Tasks Undertaken */}
              <div className="form-group mt-12">
                <label className="form-label">2. Tasks Undertaken *</label>
                <textarea 
                  rows="3"
                  placeholder="Detail specific engineering tasks, experiments, schematic edits, or coding milestones completed this week..."
                  value={weeklyFormData.tasksUndertaken}
                  onChange={(e) => setWeeklyFormData({ ...weeklyFormData, tasksUndertaken: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              {/* 3. Tools / Datasets / Methods Used */}
              <div className="form-group mt-12">
                <label className="form-label">3. Tools / Datasets / Methods Used *</label>
                <input 
                  type="text" 
                  value={weeklyFormData.toolsDatasetsMethodsUsed}
                  onChange={(e) => setWeeklyFormData({ ...weeklyFormData, toolsDatasetsMethodsUsed: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              {/* 5. Results / Outputs */}
              <div className="form-group mt-12">
                <label className="form-label">5. Results / Outputs *</label>
                <textarea 
                  rows="2"
                  value={weeklyFormData.resultsOutputs}
                  onChange={(e) => setWeeklyFormData({ ...weeklyFormData, resultsOutputs: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-grid-two mt-12">
                {/* 6. Challenges */}
                <div className="form-group">
                  <label className="form-label">6. Challenges Encountered</label>
                  <textarea 
                    rows="2"
                    value={weeklyFormData.challenges}
                    onChange={(e) => setWeeklyFormData({ ...weeklyFormData, challenges: e.target.value })}
                    className="form-control"
                  />
                </div>

                {/* 7. Solutions */}
                <div className="form-group">
                  <label className="form-label">7. Solutions Implemented</label>
                  <textarea 
                    rows="2"
                    value={weeklyFormData.solutions}
                    onChange={(e) => setWeeklyFormData({ ...weeklyFormData, solutions: e.target.value })}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-grid-two mt-12">
                {/* 8. Support Needed */}
                <div className="form-group">
                  <label className="form-label">8. Support Needed from IITTNiF</label>
                  <input 
                    type="text"
                    value={weeklyFormData.supportNeeded}
                    onChange={(e) => setWeeklyFormData({ ...weeklyFormData, supportNeeded: e.target.value })}
                    className="form-control"
                  />
                </div>

                {/* 9. Plan for Next Week */}
                <div className="form-group">
                  <label className="form-label">9. Plan for Next Week *</label>
                  <input 
                    type="text"
                    placeholder="Upcoming deliverables and experimental validation goals..."
                    value={weeklyFormData.planForNextWeek}
                    onChange={(e) => setWeeklyFormData({ ...weeklyFormData, planForNextWeek: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              {/* 10. Learning Summary */}
              <div className="form-group mt-12">
                <label className="form-label">10. Learning Summary *</label>
                <textarea 
                  rows="2"
                  placeholder="Key engineering insights or findings learned during this week's experiments..."
                  value={weeklyFormData.learningSummary}
                  onChange={(e) => setWeeklyFormData({ ...weeklyFormData, learningSummary: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              {/* 11. Attachments */}
              <div className="form-group mt-12">
                <label className="form-label">11. Attachments (Test Logs, Screenshots, Schematics)</label>
                <div className="file-dropzone-box">
                  <Upload size={20} className="text-emerald" />
                  <span>Click to select attachments or drop files here</span>
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleWeeklyFileUpload}
                    className="file-input-hidden"
                  />
                </div>
                {weeklyFormData.attachments?.length > 0 && (
                  <div className="uploaded-list mt-8">
                    {weeklyFormData.attachments.map((att, idx) => (
                      <div key={idx} className="uploaded-chip">
                        <FileText size={12} className="text-cyan" />
                        <span className="font-mono">{att.fileName} ({att.fileSize})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="modal-actions-row mt-20">
                <button type="button" className="btn btn-outline" onClick={() => setShowWeeklyModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-cta">
                  <Send size={15} />
                  <span>Submit Weekly Progress Report</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: MENTOR VERIFICATION DRAWER / MODAL */}
      {/* ========================================================================= */}
      {reviewModalData && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setReviewModalData(null)}>
          <div className="modal-content-card card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-section" style={{ borderBottom: '2px solid #06b6d4' }}>
              <div className="modal-header-brand">
                <div className="modal-icon-bg" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                  <UserCheck size={24} style={{ color: '#06b6d4' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Mentor Verification & Feedback
                  </h3>
                  <span className="badge badge-cyan font-mono mt-2">
                    Reviewing: {reviewModalData.title}
                  </span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setReviewModalData(null)}>×</button>
            </div>

            <div className="modal-body-scroll">
              <div className="form-group">
                <label className="form-label">Verification Outcome *</label>
                <div className="verify-outcome-toggle-grid">
                  <button 
                    type="button"
                    className={`btn-outcome-toggle ${mentorTargetStatus === 'Verified' ? 'active-verified' : ''}`}
                    onClick={() => setMentorTargetStatus('Verified')}
                  >
                    <CheckCircle size={16} />
                    <span>Verify & Approve Milestone / Output</span>
                  </button>
                  <button 
                    type="button"
                    className={`btn-outcome-toggle ${mentorTargetStatus === 'Needs Revision' ? 'active-revision' : ''}`}
                    onClick={() => setMentorTargetStatus('Needs Revision')}
                  >
                    <AlertTriangle size={16} />
                    <span>Request Revision</span>
                  </button>
                </div>
              </div>

              <div className="form-group mt-14">
                <label className="form-label">Mentor Review Feedback & Remarks *</label>
                <textarea 
                  rows="4"
                  placeholder="Enter constructive technical feedback, required evidence enhancements, or validation acceptance notes..."
                  value={mentorFeedbackText}
                  onChange={(e) => setMentorFeedbackText(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="modal-actions-row mt-20">
                <button type="button" className="btn btn-outline" onClick={() => setReviewModalData(null)}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary-cta"
                  onClick={handleMentorVerifySubmit}
                >
                  <ShieldCheck size={16} />
                  <span>Submit Mentor Verification</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: UPLOAD MILESTONE EVIDENCE */}
      {/* ========================================================================= */}
      {editingMilestone && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setEditingMilestone(null)}>
          <div className="modal-content-card card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-section" style={{ borderBottom: '2px solid #10b981' }}>
              <div className="modal-header-brand">
                <div className="modal-icon-bg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
                  <Upload size={24} style={{ color: '#10b981' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Upload Milestone Evidence</h3>
                  <span className="badge badge-emerald font-mono mt-2">{editingMilestone.id}: {editingMilestone.milestone}</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setEditingMilestone(null)}>×</button>
            </div>

            <div className="modal-body-scroll">
              <div className="form-group">
                <label className="form-label">Evidence Document / File Name *</label>
                <input 
                  type="text" 
                  value={milestoneFormData.evidenceFileName}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, evidenceFileName: e.target.value, evidence: e.target.value })}
                  className="form-control font-mono"
                  required
                />
              </div>

              <div className="form-group mt-12">
                <label className="form-label">Select Evidence File (PDF, DOCX, ZIP, ONNX, GERBER)</label>
                <div className="file-dropzone-box">
                  <Upload size={20} className="text-emerald" />
                  <span>Choose verification artifact</span>
                  <input 
                    type="file" 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setMilestoneFormData({
                          ...milestoneFormData,
                          evidenceFileName: e.target.files[0].name,
                          evidence: e.target.files[0].name
                        });
                      }
                    }}
                    className="file-input-hidden"
                  />
                </div>
              </div>

              <div className="modal-actions-row mt-20">
                <button type="button" className="btn btn-outline" onClick={() => setEditingMilestone(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary-cta" onClick={handleMilestoneUpdate}>
                  <Check size={16} />
                  <span>Submit for Mentor Verification</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: UPLOAD DELIVERABLE EVIDENCE */}
      {/* ========================================================================= */}
      {editingDeliverable && (
        <div className="modal-backdrop animate-fade-in" onClick={() => setEditingDeliverable(null)}>
          <div className="modal-content-card card animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-section" style={{ borderBottom: '2px solid #06b6d4' }}>
              <div className="modal-header-brand">
                <div className="modal-icon-bg" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)' }}>
                  <Cpu size={24} style={{ color: '#06b6d4' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Upload Deliverable Artifact</h3>
                  <span className="badge badge-cyan font-mono mt-2">{editingDeliverable.deliverableCode}: {editingDeliverable.title}</span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setEditingDeliverable(null)}>×</button>
            </div>

            <div className="modal-body-scroll">
              <div className="form-group">
                <label className="form-label">Deliverable Package File Name *</label>
                <input 
                  type="text" 
                  value={deliverableFormData.evidenceFileName}
                  onChange={(e) => setDeliverableFormData({ ...deliverableFormData, evidenceFileName: e.target.value, evidence: e.target.value })}
                  className="form-control font-mono"
                  required
                />
              </div>

              <div className="form-group mt-12">
                <label className="form-label">Select Deliverable Package Archive</label>
                <div className="file-dropzone-box">
                  <Upload size={20} className="text-cyan" />
                  <span>Select Deliverable Package</span>
                  <input 
                    type="file" 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setDeliverableFormData({
                          ...deliverableFormData,
                          evidenceFileName: e.target.files[0].name,
                          evidence: e.target.files[0].name
                        });
                      }
                    }}
                    className="file-input-hidden"
                  />
                </div>
              </div>

              <div className="modal-actions-row mt-20">
                <button type="button" className="btn btn-outline" onClick={() => setEditingDeliverable(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary-cta" onClick={handleDeliverableUpdate}>
                  <Check size={16} />
                  <span>Submit Deliverable</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .tdp-exec-page {
          max-width: 1240px;
          margin: 0 auto;
          padding-bottom: 60px;
        }

        .exec-header-card {
          padding: 28px 32px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%), var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-lg);
        }

        .exec-header-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .exec-project-title {
          font-family: 'Outfit', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.35;
        }

        .exec-meta-sub {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }

        .role-switcher-card {
          padding: 12px 16px;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .role-switcher-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .role-toggle-pill {
          display: flex;
          background: var(--bg-primary);
          border-radius: var(--radius-sm);
          padding: 3px;
          gap: 4px;
        }

        .btn-role-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-role-toggle.active-team {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .btn-role-toggle.active-mentor {
          background: rgba(6, 182, 212, 0.2);
          color: #06b6d4;
        }

        .role-mode-hint {
          font-size: 11px;
          color: var(--text-muted);
          text-align: center;
        }

        .exec-progress-meter-box {
          padding: 14px 18px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .meter-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .meter-title-flex {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-primary);
        }

        .meter-track-bg {
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .meter-track-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #10b981, #06b6d4);
          transition: width 0.4s ease;
        }

        /* Tabs Nav */
        .exec-tabs-card {
          padding: 8px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
        }

        .exec-tabs-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
        }

        .exec-tab-btn {
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

        .exec-tab-btn:hover {
          color: var(--text-primary);
          background: var(--bg-primary);
        }

        .exec-tab-btn.active {
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
        }

        /* Module Cards */
        .exec-module-card {
          padding: 24px 28px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }

        .module-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .module-title {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }

        .module-desc {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 4px 0 0 0;
        }

        /* Tables */
        .exec-data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .exec-data-table th {
          padding: 12px 16px;
          background: rgba(15, 23, 42, 0.7);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        .exec-data-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-color);
          font-size: 13px;
          vertical-align: middle;
        }

        .cell-desc-text {
          max-width: 280px;
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .evidence-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: #06b6d4;
        }

        .mentor-review-box {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .mentor-review-text {
          font-size: 12px;
          color: var(--text-primary);
          font-style: italic;
        }

        .mentor-sign-line {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #10b981;
        }

        .btn-mentor-review {
          background: rgba(6, 182, 212, 0.12);
          color: #06b6d4;
          border: 1px solid rgba(6, 182, 212, 0.3);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-sm);
          padding: 6px 12px;
          cursor: pointer;
        }

        .btn-mentor-review:hover {
          background: #06b6d4;
          color: #ffffff;
        }

        /* 4 Status Badges */
        .badge-status {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: var(--radius-full);
        }

        .badge-draft { background: rgba(148, 163, 184, 0.15); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.3); }
        .badge-submitted { background: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3); }
        .badge-verified { background: rgba(16, 185, 129, 0.18); color: #10b981; border: 1px solid #10b981; font-weight: 700; }
        .badge-revision { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
        .badge-neutral { background: rgba(255, 255, 255, 0.08); color: var(--text-secondary); }

        /* Weekly Progress Cards */
        .weekly-logs-container {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .weekly-log-card {
          padding: 22px 24px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }

        .weekly-log-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .weekly-week-badge-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .week-number-pill {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          background: linear-gradient(135deg, #10b981, #06b6d4);
          padding: 4px 12px;
          border-radius: var(--radius-full);
        }

        .week-date-sub {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .weekly-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        @media (max-width: 768px) {
          .weekly-fields-grid {
            grid-template-columns: 1fr;
          }
        }

        .col-span-2 {
          grid-column: span 2;
        }

        .weekly-field-cell {
          padding: 10px 14px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 3px;
        }

        .field-val {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.4;
          margin: 0;
        }

        .weekly-card-footer {
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }

        .weekly-attachments-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .attachment-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: #06b6d4;
        }

        .mentor-verification-strip {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-sm);
        }

        .strip-content strong {
          display: block;
          font-size: 12px;
          color: #10b981;
          margin-bottom: 2px;
        }

        .strip-content p {
          font-size: 12px;
          color: var(--text-primary);
          margin: 0;
        }

        /* Deliverables Grid */
        .deliverables-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 950px) {
          .deliverables-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .deliverable-item-card {
          padding: 20px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
        }

        .deliv-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .deliv-code-badge {
          font-size: 13px;
          font-weight: 700;
          color: #06b6d4;
          background: rgba(6, 182, 212, 0.15);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }

        .deliv-title {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.3;
        }

        .deliv-desc {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        .deliv-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 8px 10px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-sm);
        }

        .evidence-package-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #10b981;
          margin-top: 4px;
        }

        .deliv-card-action {
          margin-top: auto;
        }

        /* Final Assets Grid */
        .final-assets-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 950px) {
          .final-assets-grid {
            grid-template-columns: 1fr;
          }
        }

        .final-asset-card {
          padding: 22px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
        }

        .asset-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .asset-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-emerald-subtle { background: rgba(16, 185, 129, 0.12); }
        .bg-cyan-subtle { background: rgba(6, 182, 212, 0.12); }
        .bg-amber-subtle { background: rgba(217, 119, 6, 0.12); }

        .asset-title {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .asset-sub {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .asset-body {
          margin-top: 14px;
        }

        .asset-meta-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .asset-file-box {
          padding: 10px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-sm);
        }

        .asset-file-line, .asset-video-link-line {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }

        .asset-mentor-note {
          font-size: 11px;
          color: #10b981;
          font-style: italic;
        }

        .asset-action {
          margin-top: auto;
        }

        /* Repo Section */
        .repo-details-box {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .repo-card-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px 20px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .repo-icon-wrap {
          margin-top: 2px;
        }

        .repo-content-flex {
          flex: 1;
        }

        .repo-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: var(--text-primary);
        }

        .repo-url-line {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
        }

        .branch-tag {
          font-size: 11px;
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }

        .repo-access-notes {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 20px;
        }

        .modal-content-card {
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .modal-lg {
          max-width: 780px;
        }

        .modal-header-section {
          padding: 16px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(15, 23, 42, 0.8);
        }

        .modal-header-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-icon-bg {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
        }

        .modal-body-scroll {
          padding: 22px;
          overflow-y: auto;
          flex: 1;
        }

        .form-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-control {
          padding: 10px 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 13px;
        }

        .form-control:focus {
          outline: none;
          border-color: #10b981;
        }

        .file-dropzone-box {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          position: relative;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .file-input-hidden {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
        }

        .uploaded-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: #10b981;
          margin-right: 8px;
        }

        .verify-outcome-toggle-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .btn-outcome-toggle {
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-outcome-toggle.active-verified {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #10b981;
        }

        .btn-outcome-toggle.active-revision {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #ef4444;
        }

        .modal-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }

        .btn-icon-xs {
          background: transparent;
          border: none;
          color: #10b981;
          cursor: pointer;
          padding: 2px;
        }

        .w-full { width: 100%; }
        .ml-10 { margin-left: 10px; }
        .mt-2 { margin-top: 2px; }
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
