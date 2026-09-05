import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Cpu, 
  Layers, 
  Calendar, 
  Clock, 
  UserCheck, 
  TrendingUp, 
  ChevronRight, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  X, 
  FolderKanban, 
  RotateCcw,
  CheckCircle,
  FileText
} from 'lucide-react';

// Institutional Default Dataset (used as initial state and fallback if backend is offline)
export const DEFAULT_TDP_PROJECTS = [
  {
    id: "TDP-2026-PNT-01",
    title: "Dual-Frequency NavIC/GPS Precision Timing & Positioning Module",
    technologyDomain: "PNT / NavIC / GNSS",
    problemStatement: "Design and laboratory verification of an indigenous dual-frequency RF baseband receiver for high-precision timing synchronization in GPS-denied and spoofed environments.",
    trlStart: 3,
    targetTrl: 6,
    applicantType: "Academic Institution / R&D Lab",
    status: "Open for Proposals",
    applicationDeadline: "30/09/2026",
    budgetCap: "₹ 35,00,000",
    durationMonths: 18,
    leadMentor: "Dr. K. Raghavan (TDP Lead)",
    milestones: [
      "M1: RF Baseband Architecture & Simulation (Month 3)",
      "M2: PCB Fabrication & Hardware-in-the-Loop Test (Month 8)",
      "M3: NavIC L5/S-band Signal Tracking & Spoof Tolerance (Month 14)",
      "M4: Field Verification & Metrological Certification (Month 18)"
    ]
  },
  {
    id: "TDP-2026-GEO-02",
    title: "Automated Hyperspectral Satellite Pipeline for Agricultural Yield Modeling",
    technologyDomain: "Geo-Intelligence",
    problemStatement: "Developing edge-computable deep learning models for high-throughput spatial feature extraction and crop stress classification using multi-temporal satellite data.",
    trlStart: 3,
    targetTrl: 5,
    applicantType: "Faculty / Tech Startup",
    status: "Open for Proposals",
    applicationDeadline: "15/10/2026",
    budgetCap: "₹ 28,00,000",
    durationMonths: 12,
    leadMentor: "Prof. S. Ananth",
    milestones: [
      "M1: Data Pipeline Integration with VidyaGIS Engine (Month 3)",
      "M2: Deep Neural Segmentation Model Benchmark (Month 6)",
      "M3: District-Scale Pilot Validation & API Deployment (Month 12)"
    ]
  },
  {
    id: "TDP-2026-CV-03",
    title: "Ultra-Low Power Edge AI Vision Unit for Autonomous Robotic Surveillance",
    technologyDomain: "Computer Vision / GeoAI",
    problemStatement: "Embedded neural processing unit (NPU) firmware for sub-5ms low-latency multi-spectral object tracking and thermal anomaly detection on power-constrained drones.",
    trlStart: 4,
    targetTrl: 6,
    applicantType: "R&D Lab / Industry Consortium",
    status: "Under Technical Evaluation",
    applicationDeadline: "31/08/2026",
    budgetCap: "₹ 42,00,000",
    durationMonths: 24,
    leadMentor: "Dr. M. S. Prasad",
    milestones: [
      "M1: NPU Model Quantization & Test Bench Setup (Month 4)",
      "M2: Thermal Sensor Integration & Flight Test Rig (Month 12)",
      "M3: Autonomous Swarm Coordination & Obstacle Avoidance (Month 18)",
      "M4: TRL 6 Operational Demonstration (Month 24)"
    ]
  },
  {
    id: "TDP-2026-IOT-04",
    title: "Ruggedized IoT Sensor Fusion Node for Critical Infrastructure Monitoring",
    technologyDomain: "IoT / Sensor Fusion",
    problemStatement: "Self-calibrating multi-sensor telemetry nodes capable of multi-year battery operation with integrated LoRaWAN/Satellite backhaul for structural vibration monitoring.",
    trlStart: 3,
    targetTrl: 6,
    applicantType: "Academic Institution / Startup",
    status: "Open for Proposals",
    applicationDeadline: "30/11/2026",
    budgetCap: "₹ 30,00,000",
    durationMonths: 18,
    leadMentor: "Dr. K. Raghavan",
    milestones: [
      "M1: Ultra-Low Power Circuit Design & Firmware (Month 4)",
      "M2: Environmental Stress & EMC Qualification (Month 9)",
      "M3: Real-Time Telemetry Cloud Gateway Integration (Month 14)",
      "M4: Long-Term Field Reliability Testing (Month 18)"
    ]
  },
  {
    id: "TDP-2026-DTW-05",
    title: "Physics-Informed Digital Twin for Hydro-Meteorological Flash Flood Forecasting",
    technologyDomain: "Digital Twin",
    problemStatement: "Coupling hydraulic simulation models with spatial sensor streams and satellite digital elevation models (DEM) for sub-hour watershed inundation predictions.",
    trlStart: 3,
    targetTrl: 5,
    applicantType: "R&D Institution / Faculty",
    status: "Open for Proposals",
    applicationDeadline: "15/11/2026",
    budgetCap: "₹ 32,00,000",
    durationMonths: 16,
    leadMentor: "Prof. S. Ananth",
    milestones: [
      "M1: River Basin Hydro-Spatial Model Formulation (Month 4)",
      "M2: Real-time Telemetry Sensor Ingestion API (Month 8)",
      "M3: Predictive Simulation & Validation on Historical Flood Events (Month 16)"
    ]
  }
];

export const DOMAIN_OPTIONS = [
  'All Domains',
  'PNT / NavIC / GNSS',
  'Geo-Intelligence',
  'GIS / Remote Sensing',
  'Computer Vision / GeoAI',
  'Embedded Systems',
  'IoT / Sensor Fusion',
  'Digital Twin',
  'Spatial Intelligence'
];

export const TRL_OPTIONS = [
  'All TRLs',
  'TRL 3',
  'TRL 4',
  'TRL 5',
  'TRL 6'
];

export const APPLICANT_OPTIONS = [
  'All Types',
  'Academic Institution / R&D Lab',
  'Faculty / Tech Startup',
  'R&D Lab / Industry Consortium',
  'Academic Institution / Startup',
  'R&D Institution / Faculty'
];

export const STATUS_OPTIONS = [
  'All Status',
  'Open for Proposals',
  'Under Technical Evaluation',
  'Closed'
];

export default function TdpProjectOpportunities({ onApply, onSelectProject }) {
  const [projects, setProjects] = useState(DEFAULT_TDP_PROJECTS);
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedTrl, setSelectedTrl] = useState('All TRLs');
  const [selectedApplicantType, setSelectedApplicantType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Attempt to fetch from API endpoint: GET /api/v1/vikas/technology-development/projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:5000/api/v1/vikas/technology-development/projects');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        // Fallback gracefully to default institutional dataset
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter logic
  const filteredProjects = projects.filter((project) => {
    // Domain filter
    if (selectedDomain !== 'All Domains' && project.technologyDomain !== selectedDomain) {
      return false;
    }

    // TRL filter
    if (selectedTrl !== 'All TRLs') {
      const trlNum = parseInt(selectedTrl.replace('TRL', '').trim(), 10);
      if (project.trlStart !== trlNum && project.targetTrl !== trlNum) {
        return false;
      }
    }

    // Applicant Type filter
    if (selectedApplicantType !== 'All Types' && !project.applicantType.includes(selectedApplicantType)) {
      return false;
    }

    // Status filter
    if (selectedStatus !== 'All Status' && project.status !== selectedStatus) {
      return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchId = project.id.toLowerCase().includes(q);
      const matchDomain = project.technologyDomain.toLowerCase().includes(q);
      const matchProblem = project.problemStatement.toLowerCase().includes(q);
      if (!matchTitle && !matchId && !matchDomain && !matchProblem) {
        return false;
      }
    }

    return true;
  });

  const handleResetFilters = () => {
    setSelectedDomain('All Domains');
    setSelectedTrl('All TRLs');
    setSelectedApplicantType('All Types');
    setSelectedStatus('All Status');
    setSearchQuery('');
  };

  const handleOpenProjectDetails = (project) => {
    setActiveModalProject(project);
    window.history.pushState({}, '', `/vikas/technology-development/projects/${project.id}`);
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  const handleCloseModal = () => {
    setActiveModalProject(null);
    window.history.pushState({}, '', '/vikas/technology-development/projects');
  };

  return (
    <div id="tdp-project-opportunities" className="section-container mt-12 animate-fade-in">
      {/* Section Header */}
      <div className="section-header-wrap">
        <div className="section-title-with-badge">
          <div className="section-icon-pill" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
            <FolderKanban size={18} className="text-emerald" />
          </div>
          <div>
            <h2 className="overview-main-heading">TDP Project Opportunities</h2>
            <span className="overview-subheading" style={{ color: '#10b981' }}>
              Competitive translational technology calls and open research problem statements
            </span>
          </div>
        </div>
        <span className="badge badge-emerald font-mono">
          {filteredProjects.length} Open Opportunities
        </span>
      </div>

      {/* Filter & Search Bar Container */}
      <div className="card tdp-filter-panel">
        <div className="tdp-filter-top-row">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              className="form-control-input search-input"
              placeholder="Search by Project Title, ID, Domain or Keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          {(selectedDomain !== 'All Domains' || selectedTrl !== 'All TRLs' || selectedApplicantType !== 'All Types' || selectedStatus !== 'All Status' || searchQuery) && (
            <button className="btn-reset-filters" onClick={handleResetFilters}>
              <RotateCcw size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="tdp-filter-dropdowns-grid mt-12">
          {/* Domain Filter */}
          <div className="filter-item">
            <label className="filter-label">Technology Domain</label>
            <select 
              className="filter-select"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              {DOMAIN_OPTIONS.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          {/* TRL Filter */}
          <div className="filter-item">
            <label className="filter-label">TRL Target</label>
            <select 
              className="filter-select"
              value={selectedTrl}
              onChange={(e) => setSelectedTrl(e.target.value)}
            >
              {TRL_OPTIONS.map((trl) => (
                <option key={trl} value={trl}>{trl}</option>
              ))}
            </select>
          </div>

          {/* Applicant Type Filter */}
          <div className="filter-item">
            <label className="filter-label">Applicant Type</label>
            <select 
              className="filter-select"
              value={selectedApplicantType}
              onChange={(e) => setSelectedApplicantType(e.target.value)}
            >
              {APPLICANT_OPTIONS.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-item">
            <label className="filter-label">Opportunity Status</label>
            <select 
              className="filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Cards Grid / Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="tdp-projects-cards-grid mt-16">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card tdp-project-card">
              {/* Card Header */}
              <div className="project-card-header">
                <div className="project-id-domain">
                  <span className="project-id-badge font-mono">{project.id}</span>
                  <span className="project-domain-tag">{project.technologyDomain}</span>
                </div>
                <span className={`badge ${project.status === 'Open for Proposals' ? 'badge-emerald' : 'badge-gold'}`}>
                  {project.status}
                </span>
              </div>

              {/* Title & Problem Statement */}
              <h3 className="project-title-heading">{project.title}</h3>
              <p className="project-problem-text">{project.problemStatement}</p>

              {/* Meta Grid */}
              <div className="project-meta-pills-grid">
                <div className="meta-pill">
                  <TrendingUp size={13} className="text-cyan" />
                  <span>TRL {project.trlStart} → TRL {project.targetTrl}</span>
                </div>

                <div className="meta-pill">
                  <UserCheck size={13} className="text-emerald" />
                  <span className="truncate-text">{project.applicantType}</span>
                </div>

                <div className="meta-pill">
                  <Calendar size={13} className="text-accent" />
                  <span>Deadline: {project.applicationDeadline}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="project-card-footer">
                <button 
                  className="btn-view-details"
                  onClick={() => handleOpenProjectDetails(project)}
                >
                  <span>View Details</span>
                  <ChevronRight size={15} />
                </button>

                <button 
                  className="btn btn-primary-cta btn-apply-sm"
                  onClick={() => onApply ? onApply(project) : null}
                >
                  <Sparkles size={13} />
                  <span>Apply Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Institutional Empty State */
        <div className="card empty-tdp-state mt-16">
          <div className="empty-state-icon-circle" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
            <FolderKanban size={32} className="text-emerald" />
          </div>
          <h4 className="empty-state-title">No active TDP projects available at this time.</h4>
          <p className="empty-state-desc">
            No opportunities currently match your filter criteria or search query. Reset your filters or subscribe to get notified of upcoming TDP cycles.
          </p>
          <button className="btn-reset-filters-cta" onClick={handleResetFilters}>
            <RotateCcw size={14} />
            <span>Clear All Filters</span>
          </button>
        </div>
      )}

      {/* Project Detail Modal Overlay (/vikas/technology-development/projects/:projectId) */}
      {activeModalProject && (
        <div className="modal-backdrop animate-fade-in" onClick={handleCloseModal}>
          <div className="modal-content-card card animate-slide-up tdp-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-section" style={{ borderBottom: '2px solid #10b981' }}>
              <div className="modal-header-brand">
                <div className="modal-icon-bg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <Cpu size={24} className="text-emerald" />
                </div>
                <div>
                  <span className="font-mono" style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                    {activeModalProject.id}
                  </span>
                  <h3 style={{ margin: '2px 0 0', fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {activeModalProject.title}
                  </h3>
                </div>
              </div>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="detail-modal-meta-row">
                <span className="badge badge-emerald">{activeModalProject.status}</span>
                <span className="badge badge-cyan">{activeModalProject.technologyDomain}</span>
                <span className="badge badge-gold font-mono">TRL {activeModalProject.trlStart} → {activeModalProject.targetTrl}</span>
              </div>

              <div className="detail-modal-section mt-16">
                <h5 className="modal-section-title">Problem Statement</h5>
                <p className="modal-section-text">{activeModalProject.problemStatement}</p>
              </div>

              <div className="detail-modal-grid mt-16">
                <div className="detail-grid-cell">
                  <span>Eligible Applicant Type:</span>
                  <strong>{activeModalProject.applicantType}</strong>
                </div>
                <div className="detail-grid-cell">
                  <span>Application Deadline:</span>
                  <strong className="text-accent">{activeModalProject.applicationDeadline}</strong>
                </div>
                {activeModalProject.budgetCap && (
                  <div className="detail-grid-cell">
                    <span>Budget Grant Cap:</span>
                    <strong className="text-success font-mono">{activeModalProject.budgetCap}</strong>
                  </div>
                )}
                {activeModalProject.durationMonths && (
                  <div className="detail-grid-cell">
                    <span>Expected Duration:</span>
                    <strong>{activeModalProject.durationMonths} Months</strong>
                  </div>
                )}
              </div>

              {activeModalProject.milestones && activeModalProject.milestones.length > 0 && (
                <div className="detail-modal-section mt-16">
                  <h5 className="modal-section-title">Key Target Milestones</h5>
                  <ul className="modal-milestones-list">
                    {activeModalProject.milestones.map((m, mIdx) => (
                      <li key={mIdx}>
                        <CheckCircle size={14} className="text-emerald flex-shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-actions-footer mt-20">
                <button 
                  className="btn btn-primary-cta w-full"
                  onClick={() => {
                    handleCloseModal();
                    if (onApply) onApply(activeModalProject);
                  }}
                >
                  <Sparkles size={16} />
                  <span>Submit Proposal for this Project</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
