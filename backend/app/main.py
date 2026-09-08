from fastapi import FastAPI, HTTPException, Query, Depends, Header, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any, Union
from datetime import datetime
import random
from app.schemas.project import TDPProjectResponse
from app.core.security import get_current_user, require_roles, UserContext, SYSTEM_PERSONAS
from app.models.applicant import applicant_repo, ApplicantUser, SystemRole, StakeholderType
from app.models.application import onboarding_app_repo, OnboardingApplicationRecord
from app.schemas.onboarding import (
    ApplicantResponse,
    OnboardingApplicationCreate,
    OnboardingApplicationResponse
)

app = FastAPI(
    title="VIKAS Platform - Technology Development API",
    description="Institutional API for IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TDP_PROJECTS_DATABASE: List[dict] = [
    {
        "id": "TDP-2026-PNT-01",
        "title": "Dual-Frequency NavIC/GPS Precision Timing & Positioning Module",
        "status": "Open for Proposals",
        "technologyDomain": "PNT / NavIC / GNSS",
        "problemStatement": "Existing commercial off-the-shelf GNSS receivers suffer severe positioning degradation and loss of timing synchronization in urban canyons, forested canopy, and intentional RF spoofing/jamming environments. There is a national need for an indigenous, power-optimized dual-frequency (L5 and S-band) NavIC/GPS receiver subsystem with integrated carrier-phase tracking and autonomous spoof detection.",
        "projectObjectives": [
            "Architect and fabricate a compact dual-band RF front-end module compatible with ISRO NavIC (L5/S) and GPS L1C/A signals.",
            "Implement high-sensitivity digital baseband signal acquisition algorithms with sub-meter pseudorange accuracy.",
            "Develop firmware-level anti-spoofing and multi-path mitigation filters for mission-critical infrastructure.",
            "Demonstrate continuous sub-15 nanosecond timing jitter performance in laboratory test rigs and field trials."
        ],
        "technicalScope": "The scope covers complete schematic design, 4-layer/6-layer high-frequency PCB prototyping, FPGA/DSP baseband firmware implementation, RF impedance tuning in anechoic chambers, and rigorous environmental stress testing according to MIL-STD-810H standards.",
        "expectedOutput": "A verified, enclosed hardware prototype module (weight < 120g, power consumption < 2.5W) with USB/UART/CAN telemetry interfaces, accompanying device drivers, and complete TRL 6 qualification test dossier.",
        "trlStart": 3,
        "targetTrl": 6,
        "eligibleApplicantTypes": [
            "Academic Institutions & Faculty Investigators",
            "Autonomous R&D Laboratories (CSIR, DRDO, ISRO affiliate labs)",
            "Deep-Tech Startups with functional TRL 3 hardware PoC",
            "Public-Private Technology Development Consortia"
        ],
        "requiredExpertise": [
            "RF & Microwave Circuit Design (L-band / S-band)",
            "FPGA/DSP Embedded System Firmware Development (VHDL/Verilog/C)",
            "GNSS Signal Processing, Tracking Loops & Kalman Filtering",
            "Metrological Calibration & PCB Fabrication Standards"
        ],
        "expectedDeliverables": [
            "D1: Comprehensive System Architecture & Mathematical Simulation Benchmark Report (M3)",
            "D2: Fully Assembled Hardware Engineering Model Prototype with Gerber files (M8)",
            "D3: Baseband Tracking Firmware & Anti-Spoofing Algorithm Source Code (M14)",
            "D4: Final TRL 6 Environmental & Field Metrology Validation Certificate (M18)"
        ],
        "importantDates": {
            "cfpLaunch": "01/08/2026",
            "queryDeadline": "15/09/2026",
            "submissionDeadline": "30/09/2026",
            "evaluationDate": "15/10/2026",
            "commencementDate": "01/11/2026"
        },
        "supportingDocuments": [
            {
                "name": "TDP Technical Proposal Template",
                "format": "DOCX",
                "size": "420 KB",
                "downloadUrl": "#"
            },
            {
                "name": "IITTNiF PNT Lab Integration & Testbed SOP",
                "format": "PDF",
                "size": "1.8 MB",
                "downloadUrl": "#"
            },
            {
                "name": "TRL 3 to TRL 6 Milestone Evaluation Rubric",
                "format": "PDF",
                "size": "650 KB",
                "downloadUrl": "#"
            },
            {
                "name": "NM-ICPS Budget Formulation Guidelines",
                "format": "PDF",
                "size": "310 KB",
                "downloadUrl": "#"
            }
        ],
        "budgetCap": "₹ 35,00,000",
        "durationMonths": 18,
        "leadMentor": "Dr. K. Raghavan (TDP Lead)",
        "milestones": [
            "M1: RF Baseband Architecture & Simulation (Month 3)",
            "M2: PCB Fabrication & Hardware-in-the-Loop Test (Month 8)",
            "M3: NavIC L5/S-band Signal Tracking & Spoof Tolerance (Month 14)",
            "M4: Field Verification & Metrological Certification (Month 18)"
        ]
    },
    {
        "id": "TDP-2026-GEO-02",
        "title": "Automated Hyperspectral Satellite Pipeline for Agricultural Yield Modeling",
        "status": "Open for Proposals",
        "technologyDomain": "Geo-Intelligence",
        "problemStatement": "Large-scale crop health estimation and drought vulnerability modeling are hindered by low spatial-temporal resolution and latency in satellite imagery processing pipelines. An automated pipeline leveraging multi-sensor fusion (optical, SAR, and hyperspectral) is needed to deliver farm-level biophysical index maps in near real-time.",
        "projectObjectives": [
            "Formulate end-to-end radiometric calibration and atmospheric correction algorithms for multi-spectral/hyperspectral imagery.",
            "Train lightweight transformer-based deep learning models for automated crop canopy classification and yield estimation.",
            "Integrate geospatial data streaming pipelines with the IITTNiF VidyaGIS cloud platform."
        ],
        "technicalScope": "Development of containerized spatial pipelines (Docker/Kubernetes), GPU-accelerated raster computation workflows, REST APIs for agricultural analytics, and ground-truth validation across 5 agro-climatic zones.",
        "expectedOutput": "Production-grade microservices deployment package with sub-hour inference turnaround time and verified crop identification accuracy > 92%.",
        "trlStart": 3,
        "targetTrl": 5,
        "eligibleApplicantTypes": [
            "Faculty Investigators & Geospatial Research Groups",
            "Geospatial AI & Agri-Tech Startups with verified prototype",
            "State Remote Sensing Centres in partnership with Academic Labs"
        ],
        "requiredExpertise": [
            "Hyperspectral Remote Sensing & Synthetic Aperture Radar (SAR)",
            "Spatial Deep Learning & Computer Vision (PyTorch/TensorFlow)",
            "Distributed Geospatial Computing (GDAL, GeoPandas, Cloud-Optimized GeoTIFF)",
            "REST API Architecture & Microservices Deployment"
        ],
        "expectedDeliverables": [
            "D1: Automated Pre-processing & Feature Extraction Benchmark (M3)",
            "D2: Calibrated Crop Health & Biophysical Estimation Engine (M6)",
            "D3: District-Scale Pilot Validation Dossier with Farmers' Field Data (M12)"
        ],
        "importantDates": {
            "cfpLaunch": "15/08/2026",
            "queryDeadline": "30/09/2026",
            "submissionDeadline": "15/10/2026",
            "evaluationDate": "30/10/2026",
            "commencementDate": "15/11/2026"
        },
        "supportingDocuments": [
            {
                "name": "TDP Geospatial Proposal Guidelines",
                "format": "PDF",
                "size": "540 KB",
                "downloadUrl": "#"
            },
            {
                "name": "VidyaGIS API Architecture Reference",
                "format": "PDF",
                "size": "1.2 MB",
                "downloadUrl": "#"
            }
        ],
        "budgetCap": "₹ 28,00,000",
        "durationMonths": 12,
        "leadMentor": "Prof. S. Ananth",
        "milestones": [
            "M1: Data Pipeline Integration with VidyaGIS Engine (Month 3)",
            "M2: Deep Neural Segmentation Model Benchmark (Month 6)",
            "M3: District-Scale Pilot Validation & API Deployment (Month 12)"
        ]
    },
    {
        "id": "TDP-2026-CV-03",
        "title": "Ultra-Low Power Edge AI Vision Unit for Autonomous Robotic Surveillance",
        "status": "Under Technical Evaluation",
        "technologyDomain": "Computer Vision / GeoAI",
        "problemStatement": "Micro-UAVs and autonomous unmanned ground vehicles operating in GPS-denied environments lack onboard computing power to run high-frame-rate spatial vision and thermal anomaly detection without draining battery reserves in under 20 minutes.",
        "projectObjectives": [
            "Design an ultra-compact embedded computing module utilizing dedicated NPU silicon (e.g. Jetson Orin / Hailo / Kria).",
            "Implement int8 quantized multi-spectral object detection running at 60 FPS under 5 Watts power budget.",
            "Demonstrate visual-inertial odometry (VIO) for drift-free autonomous navigation without external GPS fixes."
        ],
        "technicalScope": "Custom carrier board design, embedded Linux kernel customization, deep model compression (pruning/quantization), and flight test validation on custom drone frames.",
        "expectedOutput": "Ruggedized, flight-tested edge vision hardware module with full SDK, documentation, and flight telemetry logs.",
        "trlStart": 4,
        "targetTrl": 6,
        "eligibleApplicantTypes": [
            "Robotics R&D Laboratories & Academic Institutes",
            "Drone & Defense Technology Startups",
            "Industry Consortiums with Prototype Manufacturing Capability"
        ],
        "requiredExpertise": [
            "Embedded Computer Vision & Edge AI Deployment (TensorRT/ONNX)",
            "Visual-Inertial Odometry & SLAM in GPS-Denied Environments",
            "High-Density PCB & Thermal Management for UAV Payloads",
            "Robotic Middleware (ROS 2 / PX4 Autopilot)"
        ],
        "expectedDeliverables": [
            "D1: Quantized Multi-Spectral Detection Model & Test Bench Report (M4)",
            "D2: Integrated Camera & Carrier Board Hardware Engineering Model (M12)",
            "D3: Real-Time Obstacle Avoidance & VIO Navigation Firmware (M18)",
            "D4: TRL 6 Operational Flight Demonstration in Cluttered Environment (M24)"
        ],
        "importantDates": {
            "cfpLaunch": "01/07/2026",
            "queryDeadline": "15/08/2026",
            "submissionDeadline": "31/08/2026",
            "evaluationDate": "15/09/2026",
            "commencementDate": "01/10/2026"
        },
        "supportingDocuments": [
            {
                "name": "Edge AI & Vision Testbed Protocol",
                "format": "PDF",
                "size": "890 KB",
                "downloadUrl": "#"
            }
        ],
        "budgetCap": "₹ 42,00,000",
        "durationMonths": 24,
        "leadMentor": "Dr. M. S. Prasad",
        "milestones": [
            "M1: NPU Model Quantization & Test Bench Setup (Month 4)",
            "M2: Thermal Sensor Integration & Flight Test Rig (Month 12)",
            "M3: Autonomous Swarm Coordination & Obstacle Avoidance (Month 18)",
            "M4: TRL 6 Operational Demonstration (Month 24)"
        ]
    }
]

@app.get("/")
def root():
    return {"platform": "VIKAS", "organization": "IITTNiF", "status": "active"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "VIKAS Technology Development API"}

@app.get("/api/v1/auth/me")
def get_my_profile(user: UserContext = Depends(get_current_user)):
    """
    Returns the authenticated user context and granular permission flags.
    """
    permissions = {
        "can_screen": user.role in ["operations", "pd", "admin"],
        "can_route": user.role in ["operations", "pd", "admin"],
        "can_approve_pillar": user.role in ["pillar_lead", "pd", "admin"],
        "can_approve_pd": user.role in ["pd", "admin"],
        "can_esign": user.role in ["pd", "admin"],
        "can_advance_stage": user.role in ["operations", "pillar_lead", "pd", "admin"],
        "can_mentor_verify": user.role in ["pillar_lead", "pd", "admin", "execution"],
        "can_manage_engagements": user.role in ["execution", "pillar_lead", "pd", "admin"],
        "can_submit_application": True,
        "is_applicant": user.role == "applicant",
    }
    return {
        "user": user,
        "permissions": permissions
    }

@app.get("/api/v1/auth/personas")
def get_all_personas():
    """
    Returns available simulation personas for frontend role-switching.
    """
    return list(SYSTEM_PERSONAS.values())

# =======================================================
# APPLICANT USER RECORD & ONBOARDING APPLICATION ENDPOINTS
# =======================================================

@app.get("/api/v1/applicants/me", response_model=ApplicantResponse)
def get_current_applicant_record(user: UserContext = Depends(get_current_user)):
    """
    Returns the persistent ApplicantUser entity for the active user.
    """
    stored = applicant_repo.get_by_id(user.id) or applicant_repo.get_by_email(user.email)
    if stored:
        return ApplicantResponse(
            id=stored.id,
            name=stored.name,
            email=stored.email,
            phone=stored.phone,
            organization=stored.organization,
            location=stored.location,
            stakeholder_type=stored.stakeholder_type.value if hasattr(stored.stakeholder_type, "value") else str(stored.stakeholder_type),
            role=stored.role.value if hasattr(stored.role, "value") else str(stored.role),
            is_active=stored.is_active,
            is_verified=stored.is_verified,
            created_at=stored.created_at,
            updated_at=stored.updated_at
        )

    st_val = user.stakeholder_type or "STARTUP"
    return ApplicantResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        phone=user.phone,
        organization=user.organization,
        location=user.location,
        stakeholder_type=st_val,
        role=user.role.upper(),
        is_active=True,
        is_verified=True,
        created_at=datetime.now().isoformat(),
        updated_at=datetime.now().isoformat()
    )

@app.get("/api/v1/applicants/{user_id}", response_model=ApplicantResponse)
def get_applicant_by_user_id(user_id: str, user: UserContext = Depends(get_current_user)):
    """
    Retrieve applicant record by user_id with strict privacy boundaries.
    """
    if user.role == "applicant" and user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Denied: Applicants can only view their own user profile."
        )
    stored = applicant_repo.get_by_id(user_id)
    if not stored:
        raise HTTPException(status_code=404, detail=f"Applicant '{user_id}' not found.")
    return ApplicantResponse(
        id=stored.id,
        name=stored.name,
        email=stored.email,
        phone=stored.phone,
        organization=stored.organization,
        location=stored.location,
        stakeholder_type=stored.stakeholder_type.value if hasattr(stored.stakeholder_type, "value") else str(stored.stakeholder_type),
        role=stored.role.value if hasattr(stored.role, "value") else str(stored.role),
        is_active=stored.is_active,
        is_verified=stored.is_verified,
        created_at=stored.created_at,
        updated_at=stored.updated_at
    )

@app.post("/api/v1/onboarding/applications", response_model=OnboardingApplicationResponse)
def create_onboarding_application(
    payload: OnboardingApplicationCreate,
    user: UserContext = Depends(get_current_user)
):
    """
    Create and store a VIKAS Onboarding Application.
    Crucially assigns user_id = user.id, establishing direct ownership with the applicant.
    """
    current_year = datetime.now().year
    random_suffix = random.randint(100, 999)
    file_number = f"IITTNIF-{current_year}-{random_suffix}"
    app_id = f"app_onboard_{current_year}_{random_suffix}"
    submission_time = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    submission_date = datetime.now().strftime("%d/%m/%Y")

    applicant_name = user.name if user.role == "applicant" else (payload.applicantName or payload.name or user.name)
    email = user.email if user.role == "applicant" else (payload.email or user.email)
    phone = payload.phone or user.phone or "9493562799"
    organization = payload.organization or user.organization or "IITTNiF"
    location = payload.location or user.location or "Tirupati"
    stakeholder_type = payload.stakeholder_type or payload.stakeholderType or user.stakeholder_type or "STARTUP"

    record = OnboardingApplicationRecord(
        id=app_id,
        file_number=file_number,
        user_id=user.id,
        applicant_name=applicant_name,
        email=email,
        phone=phone,
        organization=organization,
        location=location,
        stakeholder_type=stakeholder_type,
        domains=payload.domains,
        intent_of_engagement=payload.intentOfEngagement or "Startup Ecosystem Onboarding",
        dynamic_inputs=payload.dynamicInputs or {},
        problem_statement=payload.problemStatement or "VIKAS Ecosystem Onboarding Application",
        status="pending_screening",
        approval_authority="pillar_lead",
        assigned_vertical="6.2 Startups & Business Enablement" if stakeholder_type.upper() == "STARTUP" else "Ecosystem Enablement",
        submission_date=submission_date,
        last_updated=submission_time,
        is_strategic=stakeholder_type.upper() in ["GOVERNMENT", "INDUSTRY"],
        history=[
            {
                "date": submission_time,
                "action": "File Created & Onboarded",
                "user": f"{applicant_name} (Applicant)",
                "details": f"Registered as {stakeholder_type} under {', '.join(payload.domains) if payload.domains else 'General'}. Awaiting initial operations screening."
            }
        ]
    )

    saved = onboarding_app_repo.save(record)
    return saved.dict()

@app.get("/api/v1/onboarding/applications", response_model=List[OnboardingApplicationResponse])
def list_onboarding_applications(
    status: Optional[str] = Query(None, description="Filter by status"),
    stakeholder_type: Optional[str] = Query(None, description="Filter by stakeholder type"),
    search: Optional[str] = Query(None, description="Search by file number, name, or org"),
    user: UserContext = Depends(get_current_user)
):
    """
    Retrieve VIKAS onboarding applications with strict Record-Level Access Control:
    - Applicants ONLY receive applications belonging to their user_id!
    - Operations, Pillar Leads, PD, and Admin see applications according to workflow purview.
    """
    if user.role == "applicant":
        # Strict Record-Level Filter for Applicants
        records = onboarding_app_repo.get_by_user_id(user.id)
        if not records and user.email:
            records = [a for a in onboarding_app_repo.list_all() if a.email.lower() == user.email.lower()]
    else:
        records = onboarding_app_repo.list_all()

    if status and status.lower() not in ["all", "all statuses"]:
        records = [r for r in records if r.status.lower() == status.lower()]

    if stakeholder_type and stakeholder_type.lower() not in ["all", "all types"]:
        records = [r for r in records if r.stakeholder_type.lower() == stakeholder_type.lower()]

    if search:
        s = search.lower().strip()
        records = [
            r for r in records
            if s in r.file_number.lower()
            or s in r.applicant_name.lower()
            or s in r.organization.lower()
            or s in (r.problem_statement or "").lower()
        ]

    return [r.dict() for r in records]

@app.get("/api/v1/onboarding/applications/{identifier}", response_model=OnboardingApplicationResponse)
def get_onboarding_application_by_identifier(
    identifier: str,
    user: UserContext = Depends(get_current_user)
):
    """
    Retrieve single onboarding application with applicant ownership check.
    """
    app_record = onboarding_app_repo.get_by_file_number(identifier) or onboarding_app_repo.get_by_id(identifier)
    if not app_record:
        raise HTTPException(status_code=404, detail=f"Onboarding Application '{identifier}' not found.")

    if user.role == "applicant":
        is_owner = (app_record.user_id == user.id) or (app_record.email.lower() == user.email.lower())
        if not is_owner:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access Denied: Applicants are restricted to viewing only their own application records."
            )

    return app_record.dict()

@app.get("/api/v1/vikas/technology-development/projects", response_model=List[TDPProjectResponse])
def get_tdp_projects(
    domain: Optional[str] = Query(None, description="Filter by Technology Domain"),
    trl: Optional[int] = Query(None, description="Filter by Target or Start TRL"),
    applicant_type: Optional[str] = Query(None, description="Filter by Applicant Type"),
    status: Optional[str] = Query(None, description="Filter by Project Status"),
    search: Optional[str] = Query(None, description="Search by title, ID, or problem statement")
):
    results = TDP_PROJECTS_DATABASE

    if domain and domain.lower() != "all" and domain.lower() != "all domains":
        results = [p for p in results if p["technologyDomain"].lower() == domain.lower()]

    if trl:
        results = [p for p in results if p["trlStart"] == trl or p["targetTrl"] == trl]

    if applicant_type and applicant_type.lower() != "all" and applicant_type.lower() != "all types":
        results = [p for p in results if any(applicant_type.lower() in t.lower() for t in p.get("eligibleApplicantTypes", [])) or applicant_type.lower() in p.get("applicantType", "").lower()]

    if status and status.lower() != "all" and status.lower() != "all status":
        results = [p for p in results if p["status"].lower() == status.lower()]

    if search:
        s = search.lower().strip()
        results = [
            p for p in results
            if s in p["title"].lower()
            or s in p["id"].lower()
            or s in p["problemStatement"].lower()
            or s in p["technologyDomain"].lower()
        ]

    return results

@app.get("/api/v1/vikas/technology-development/projects/{project_id}", response_model=TDPProjectResponse)
def get_tdp_project_by_id(project_id: str):
    for project in TDP_PROJECTS_DATABASE:
        if project["id"].lower() == project_id.lower():
            return project
    raise HTTPException(status_code=404, detail=f"TDP Project with ID '{project_id}' not found.")

import random
import time
from datetime import datetime
from app.schemas.tdp_application import (
    TDPApplicationCreate,
    TDPApplicationResponse,
    TDPStageTimelineItem,
    TDPAuditItem,
    TDPStatusUpdatePayload
)

def generate_default_stage_timeline(status: str, submitted_date: str = None, last_updated: str = None) -> tuple[str, List[dict]]:
    """
    Generates the 8-stage visual progression timeline and derives the currentStage
    matching the 8 specified stages:
    1. Application Submitted
    2. Initial Screening
    3. Technical Review
    4. Evaluation
    5. Approval
    6. Project Execution
    7. Final Review
    8. Completed
    """
    if not submitted_date:
        submitted_date = datetime.now().strftime("%d/%m/%Y")
    if not last_updated:
        last_updated = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

    # Map the 10 statuses to active stage indices (1-8)
    status_to_stage_map = {
        "Draft": 1,
        "Submitted": 1,
        "Under Screening": 2,
        "Technical Review": 3,
        "Mentor Review": 4,
        "Approved": 5,
        "In Progress": 6,
        "Final Review": 7,
        "Completed": 8,
        "On Hold": 3,
        "Rejected": 2
    }

    active_stage_id = status_to_stage_map.get(status, 1)

    stages_config = [
        (1, "Application Submitted", "Applicant", f"Proposal dossier and Dean SRIC endorsement registered on {submitted_date}."),
        (2, "Initial Screening", "IITTNiF Secretariat", "Administrative completeness, eligibility criteria & document validation."),
        (3, "Technical Review", "Domain Technical Committee", "Detailed peer-review on CPS architecture, novelty, and TRL feasibility."),
        (4, "Evaluation", "IITTNiF Evaluation Board", "Oral defense presentation, budgetary scrutiny, and testbed allocation."),
        (5, "Approval", "Project Director & Pillar Lead", "Formal project sanction, sanction order issuance, and grant agreement execution."),
        (6, "Project Execution", "Principal Investigator & Lab Team", "Engineering fabrication, PCB assembly, firmware coding, and milestone milestones."),
        (7, "Final Review", "Expert Assessment Panel", "Hardware-in-the-loop validation, testbed trials, and metrological calibration."),
        (8, "Completed", "IITTNiF Directorate", "TRL 6 prototype certification, final expenditure audit, and technology transfer dossier archived.")
    ]

    timeline = []
    current_stage_name = stages_config[active_stage_id - 1][1]

    for stage_id, name, actor, default_remark in stages_config:
        if status == "Rejected" and stage_id == active_stage_id:
            timeline.append({
                "stageId": stage_id,
                "stageName": name,
                "status": "rejected",
                "completedDate": last_updated,
                "actor": actor,
                "remarks": "Proposal not shortlisted by review committee. Detailed feedback provided in audit log."
            })
        elif status == "On Hold" and stage_id == active_stage_id:
            timeline.append({
                "stageId": stage_id,
                "stageName": name,
                "status": "on_hold",
                "completedDate": None,
                "actor": actor,
                "remarks": "Project execution temporarily on hold pending specialized RF component procurement."
            })
        elif stage_id < active_stage_id or status == "Completed":
            timeline.append({
                "stageId": stage_id,
                "stageName": name,
                "status": "completed",
                "completedDate": submitted_date if stage_id == 1 else last_updated.split(",")[0],
                "actor": actor,
                "remarks": default_remark
            })
        elif stage_id == active_stage_id:
            timeline.append({
                "stageId": stage_id,
                "stageName": name,
                "status": "in_progress" if status not in ["Draft", "Completed"] else ("completed" if status == "Completed" else "pending"),
                "completedDate": None,
                "actor": actor,
                "remarks": default_remark
            })
        else:
            timeline.append({
                "stageId": stage_id,
                "stageName": name,
                "status": "pending",
                "completedDate": None,
                "actor": actor,
                "remarks": "Pending completion of preceding stage evaluation."
            })

    return current_stage_name, timeline

# Seed initial institutional TDP applications
TDP_APPLICATIONS_DATABASE: List[dict] = [
    {
        "applicationNumber": "IITTNIF-TDP-2026-8421",
        "status": "Technical Review",
        "currentStage": "Technical Review",
        "submittedDate": "15/08/2026",
        "lastUpdated": "28/08/2026, 14:30:00",
        "submissionTimestamp": "15/08/2026, 10:30:00",
        "trackingToken": "TRK-842199",
        "applicantName": "Prof. S. Ananth",
        "organization": "IIT Tirupati",
        "department": "Department of Electrical Engineering & CPS Lab",
        "designation": "Associate Professor & Lead Investigator",
        "email": "s.ananth@iitt.ac.in",
        "mobile": "+91 98450 67890",
        "applicantType": "Academic Institution / Faculty",
        "projectTitle": "Dual-Frequency NavIC/GPS Precision Timing & Positioning Module",
        "technologyDomain": "PNT / NavIC / GNSS",
        "problemStatement": "Severe positioning degradation and timing synchronization loss in GPS-denied, forested canopy, and intentional RF-jammed environments requires an indigenous dual-frequency receiver.",
        "background": "Foundational laboratory validation of carrier-phase tracking completed in academic lab under exploratory grant.",
        "aim": "To engineer and field-validate an indigenous dual-band (L5/S) NavIC/GPS baseband tracking module achieving sub-meter precision and sub-15ns timing jitter.",
        "objectives": [
            "Architect dual-band RF front-end module compatible with NavIC L5/S and GPS L1C/A.",
            "Implement baseband digital signal acquisition with sub-meter pseudorange accuracy.",
            "Formulate firmware-level anti-spoofing and multi-path mitigation filters."
        ],
        "proposedSolution": "A dedicated hardware-in-the-loop embedded RF receiver with Kalman filter-based carrier smoothing and active anti-spoofing firmware.",
        "innovation": "First-of-its-kind indigenous firmware-level multi-carrier NavIC acquisition on low-power silicon with sub-15ns timing jitter.",
        "currentTrl": 3,
        "targetTrl": 6,
        "expectedOutcomes": "Fabricated enclosed prototype module, metrology benchmark certificate, and production-ready manufacturing dossier.",
        "methodology": "Iterative hardware-in-the-loop simulation, RF impedance matching in anechoic chambers, automated telemetry testing, and environmental stress profiling.",
        "hardwareRequirements": "Dual-band RF front-end ASICs, high-speed FPGA/DSP evaluation boards, multi-frequency patch antennas, EMI/EMC shielding enclosures.",
        "softwareRequirements": "MATLAB/Simulink RF Blockset, Vivado Design Suite, GCC Embedded C toolchain, RTOS kernel, automated telemetry dashboard.",
        "datasetRequirements": "Raw ISRO NavIC L5/S-band RF telemetry dumps, simulated GNSS multi-path and spoofing signal test vectors.",
        "labTestbedRequirements": [
            "PNT (Positioning, Navigation & Timing) Testbed",
            "Industrial IoT & Sensor Instrumentation"
        ],
        "industryCollaborationRequirement": "Partnership with indigenous avionics and strategic defense manufacturing partners for packaging and field deployment.",
        "startDate": "2026-11-01",
        "expectedDurationMonths": 18,
        "milestones": [
            { "title": "RF Baseband Architecture & Simulation", "month": "Month 03", "targetOutput": "Simulation benchmark dossier" },
            { "title": "PCB Engineering Model & Hardware Test Rig", "month": "Month 08", "targetOutput": "Assembled prototype PCB" },
            { "title": "NavIC L5/S Tracking & Anti-Spoofing Firmware", "month": "Month 14", "targetOutput": "Firmware binary & test logs" },
            { "title": "Field Metrological & Environmental Certification", "month": "Month 18", "targetOutput": "TRL 6 validation report" }
        ],
        "deliverables": [
            { "code": "D1", "description": "System Architecture & Simulation Dossier", "timeline": "Month 03" },
            { "code": "D2", "description": "Hardware Engineering Model with Gerber Files", "timeline": "Month 08" },
            { "code": "D3", "description": "Baseband Tracking Firmware Source Code", "timeline": "Month 14" },
            { "code": "D4", "description": "Final TRL 6 Metrological Qualification Certificate", "timeline": "Month 18" }
        ],
        "teamMembers": [
            { "name": "Prof. S. Ananth", "role": "Principal Investigator (PI)", "institution": "IIT Tirupati", "email": "s.ananth@iitt.ac.in" },
            { "name": "Dr. K. Raghavan", "role": "Co-Principal Investigator", "institution": "IITTNiF", "email": "k.raghavan@iittnif.in" },
            { "name": "Arun Kumar", "role": "Senior Research Fellow (Hardware)", "institution": "IIT Tirupati", "email": "arun.k@iitt.ac.in" }
        ],
        "facultyMentorPI": "Prof. S. Ananth (Associate Professor, IIT Tirupati)",
        "documents": [
            { "documentType": "Technical Proposal Dossier", "fileName": "TDP_NavIC_Technical_Proposal_v1.pdf", "fileSize": "2.4 MB" },
            { "documentType": "Budget Formulation & BOM", "fileName": "Budget_Formulation_Breakdown.xlsx", "fileSize": "480 KB" },
            { "documentType": "Institutional Endorsement (Dean NOC)", "fileName": "IIT_Tirupati_Dean_SRIC_Endorsement.pdf", "fileSize": "1.1 MB" }
        ],
        "declarationAccepted": True,
        "authorizedSigner": "Prof. S. Ananth",
        "reviewerRemarks": "Baseband algorithm mathematical proof verified by domain committee. RF front-end schematics forwarded for anechoic chamber test benching.",
        "budgetApproved": "₹ 35,00,000",
        "leadReviewer": "Dr. K. Raghavan (TDP Lead & PNT Domain Expert)",
        "auditHistory": [
            { "timestamp": "15/08/2026, 10:30:15", "action": "Proposal Submitted", "actor": "Prof. S. Ananth", "details": "Initial submission logged via single-window portal." },
            { "timestamp": "19/08/2026, 14:15:00", "action": "Secretariat Screening Cleared", "actor": "Secretariat Screening Cell", "details": "Mandatory NOC and eligibility criteria verified." },
            { "timestamp": "28/08/2026, 14:30:00", "action": "Assigned to Technical Review Panel", "actor": "TDP Technical Committee", "details": "Assigned to PNT & Embedded Signal Processing sub-committee." }
        ]
    },
    {
        "applicationNumber": "IITTNIF-TDP-2026-7193",
        "status": "Approved",
        "currentStage": "Project Execution",
        "submittedDate": "05/07/2026",
        "lastUpdated": "18/08/2026, 11:15:00",
        "submissionTimestamp": "05/07/2026, 15:45:00",
        "trackingToken": "TRK-719302",
        "applicantName": "Prof. S. Ananth",
        "organization": "IIT Tirupati",
        "department": "Department of Electrical Engineering & CPS Lab",
        "designation": "Associate Professor & Lead Investigator",
        "email": "s.ananth@iitt.ac.in",
        "mobile": "+91 98450 67890",
        "applicantType": "Academic Institution / Faculty",
        "projectTitle": "Automated Hyperspectral Satellite Pipeline for Agricultural Yield Modeling",
        "technologyDomain": "Geo-Intelligence",
        "problemStatement": "Large-scale crop health estimation is hindered by latency in satellite imagery processing pipelines. An automated pipeline leveraging multi-sensor fusion is needed.",
        "background": "Prototype deep learning segmentation model benchmarked on open satellite repositories.",
        "aim": "Deploy automated cloud-native geospatial pipeline delivering farm-level biophysical maps in near real-time.",
        "objectives": [
            "Formulate radiometric calibration algorithms for multi-spectral imagery.",
            "Train lightweight transformer-based deep learning models for canopy segmentation.",
            "Integrate streaming pipelines with VidyaGIS spatial platform."
        ],
        "proposedSolution": "Containerized microservices pipeline with GPU-accelerated raster processing.",
        "innovation": "Sub-hour turnaround automated hyperspectral atmospheric correction and biophysical index generation.",
        "currentTrl": 3,
        "targetTrl": 5,
        "expectedOutcomes": "Cloud deployment package and verified crop identification accuracy > 92%.",
        "methodology": "Microservices architecture on Kubernetes, distributed GeoTIFF tiling, and ground-truth validation.",
        "hardwareRequirements": "GPU compute cluster, high-throughput SSD RAID storage array.",
        "softwareRequirements": "GDAL, GeoPandas, PyTorch, Docker, Kubernetes, FastAPI.",
        "datasetRequirements": "Sentinel-2, Landsat-9, and airborne hyperspectral imagery across 5 agro-climatic zones.",
        "labTestbedRequirements": [
            "Geo-Intelligence & Spatial GIS Suites"
        ],
        "industryCollaborationRequirement": "State Remote Sensing Application Centre and Agri-Tech Consortiums.",
        "startDate": "2026-09-01",
        "expectedDurationMonths": 12,
        "milestones": [
            { "title": "Data Pipeline Integration with VidyaGIS Engine", "month": "Month 03", "targetOutput": "Integrated ingestion API" },
            { "title": "Deep Neural Segmentation Model Benchmark", "month": "Month 06", "targetOutput": "Model weights & validation report" },
            { "title": "District-Scale Pilot Validation & API Deployment", "month": "Month 12", "targetOutput": "Live production endpoint" }
        ],
        "deliverables": [
            { "code": "D1", "description": "Automated Pre-processing Benchmark Dossier", "timeline": "Month 03" },
            { "code": "D2", "description": "Calibrated Crop Health Estimation Engine", "timeline": "Month 06" },
            { "code": "D3", "description": "District-Scale Pilot Validation Dossier", "timeline": "Month 12" }
        ],
        "teamMembers": [
            { "name": "Prof. S. Ananth", "role": "Principal Investigator (PI)", "institution": "IIT Tirupati", "email": "s.ananth@iitt.ac.in" },
            { "name": "P. Divya", "role": "Geospatial Data Engineer", "institution": "IIT Tirupati", "email": "divya.p@iitt.ac.in" }
        ],
        "facultyMentorPI": "Prof. S. Ananth",
        "documents": [
            { "documentType": "Technical Proposal Dossier", "fileName": "Hyperspectral_Pipeline_Proposal.pdf", "fileSize": "3.1 MB" },
            { "documentType": "Dean SRIC Endorsement", "fileName": "SRIC_Approval_Letter.pdf", "fileSize": "850 KB" }
        ],
        "declarationAccepted": True,
        "authorizedSigner": "Prof. S. Ananth",
        "reviewerRemarks": "Sanction order issued (Ref: IITTNiF/TDP/2026/08/SAN-04). First tranche grant disbursed. Phase 1 GPU cluster provisioned.",
        "budgetApproved": "₹ 28,00,000",
        "leadReviewer": "Dr. M. S. Prasad (Director & Evaluator)",
        "auditHistory": [
            { "timestamp": "05/07/2026, 15:45:00", "action": "Proposal Submitted", "actor": "Prof. S. Ananth", "details": "Proposal registered." },
            { "timestamp": "12/07/2026, 11:20:00", "action": "Screening Passed", "actor": "Secretariat", "details": "Completed administrative screening." },
            { "timestamp": "25/07/2026, 16:00:00", "action": "Technical Committee Recommendation", "actor": "Technical Committee", "details": "Recommended with score 91.5/100." },
            { "timestamp": "10/08/2026, 14:00:00", "action": "Evaluation Board Defense", "actor": "Evaluation Board", "details": "Oral defense completed with unanimous approval." },
            { "timestamp": "18/08/2026, 11:15:00", "action": "Project Formally Sanctioned", "actor": "Project Director", "details": "Grant agreement executed. Project moved to Execution phase." }
        ]
    },
    {
        "applicationNumber": "IITTNIF-TDP-2026-9042",
        "status": "Under Screening",
        "currentStage": "Initial Screening",
        "submittedDate": "30/08/2026",
        "lastUpdated": "01/09/2026, 16:45:00",
        "submissionTimestamp": "30/08/2026, 18:20:00",
        "trackingToken": "TRK-904211",
        "applicantName": "Dr. M. S. Prasad",
        "organization": "IITTNiF Autonomous Lab",
        "department": "Robotics & Autonomous Systems Division",
        "designation": "Principal Research Scientist",
        "email": "prasad@iittnif.in",
        "mobile": "+91 94440 12345",
        "applicantType": "Autonomous R&D Lab / Industry Consortium",
        "projectTitle": "Ultra-Low Power Edge AI Vision Unit for Autonomous Robotic Surveillance",
        "technologyDomain": "Computer Vision / GeoAI",
        "problemStatement": "Micro-UAVs operating in GPS-denied environments lack onboard computing power to run high-frame-rate spatial vision and thermal anomaly detection without draining battery reserves in under 20 minutes.",
        "background": "Preliminary lab benchmarking of quantized neural network inference on Jetson Orin Nano boards.",
        "aim": "Fabricate custom low-power carrier board with int8 quantized object detection running at 60 FPS under 5 Watts power budget.",
        "objectives": [
            "Design compact embedded computing module utilizing dedicated NPU silicon.",
            "Implement int8 quantized multi-spectral object detection under 5W.",
            "Demonstrate visual-inertial odometry (VIO) in GPS-denied environments."
        ],
        "proposedSolution": "Custom carrier board design with embedded Linux kernel optimization and deep model pruning.",
        "innovation": "Sub-5 Watt thermal signature tracking with real-time visual-inertial odometry.",
        "currentTrl": 4,
        "targetTrl": 6,
        "expectedOutcomes": "Flight-tested ruggedized edge vision unit with SDK and telemetry logs.",
        "methodology": "Carrier board schematic fabrication, TensorRT int8 quantization, and drone flight trials.",
        "hardwareRequirements": "Jetson Orin Nano, FLIR Boson thermal camera, FPGA carrier board.",
        "softwareRequirements": "ROS 2, PX4 Autopilot, TensorRT, OpenCV, Linux Kernel SDK.",
        "datasetRequirements": "Aerial multi-spectral thermal video datasets under cluttered GPS-denied canopies.",
        "labTestbedRequirements": [
            "Edge AI & Autonomous Vision Framework",
            "PNT (Positioning, Navigation & Timing) Testbed"
        ],
        "industryCollaborationRequirement": "Defense UAV Manufacturers and Autonomous Vehicle Integrators.",
        "startDate": "2026-10-01",
        "expectedDurationMonths": 24,
        "milestones": [
            { "title": "NPU Model Quantization & Test Bench Setup", "month": "Month 04", "targetOutput": "Quantized model" },
            { "title": "Thermal Sensor Integration & Flight Test Rig", "month": "Month 12", "targetOutput": "Assembled flight unit" },
            { "title": "Autonomous Swarm Coordination & Obstacle Avoidance", "month": "Month 18", "targetOutput": "Swarm firmware" },
            { "title": "TRL 6 Operational Demonstration", "month": "Month 24", "targetOutput": "Flight demo video & report" }
        ],
        "deliverables": [
            { "code": "D1", "description": "Quantized Detection Model Benchmark Dossier", "timeline": "Month 04" },
            { "code": "D2", "description": "Integrated Camera Carrier Board Hardware Model", "timeline": "Month 12" },
            { "code": "D3", "description": "Real-Time Obstacle Avoidance Firmware", "timeline": "Month 18" },
            { "code": "D4", "description": "TRL 6 Operational Flight Certificate", "timeline": "Month 24" }
        ],
        "teamMembers": [
            { "name": "Dr. M. S. Prasad", "role": "Principal Investigator", "institution": "IITTNiF", "email": "prasad@iittnif.in" },
            { "name": "Vikram Sethi", "role": "Robotics Firmware Engineer", "institution": "IITTNiF", "email": "vikram@iittnif.in" }
        ],
        "facultyMentorPI": "Dr. M. S. Prasad",
        "documents": [
            { "documentType": "Technical Proposal Dossier", "fileName": "Edge_Vision_UAV_Proposal.pdf", "fileSize": "4.2 MB" },
            { "documentType": "Institutional NOC", "fileName": "Lab_Director_Endorsement.pdf", "fileSize": "900 KB" }
        ],
        "declarationAccepted": True,
        "authorizedSigner": "Dr. M. S. Prasad",
        "reviewerRemarks": "Initial proposal dossier received. Secretariat verifying document signatures and equipment list.",
        "budgetApproved": "Pending Review",
        "leadReviewer": "Secretariat Screening Cell",
        "auditHistory": [
            { "timestamp": "30/08/2026, 18:20:00", "action": "Proposal Submitted", "actor": "Dr. M. S. Prasad", "details": "Proposal submitted and queued for secretariat screening." },
            { "timestamp": "01/09/2026, 16:45:00", "action": "Under Secretariat Screening", "actor": "Secretariat Screening Cell", "details": "Document authenticity and budgetary breakdown under initial check." }
        ]
    },
    {
        "applicationNumber": "IITTNIF-TDP-2026-5518",
        "status": "Completed",
        "currentStage": "Completed",
        "submittedDate": "12/01/2025",
        "lastUpdated": "15/07/2026, 17:00:00",
        "submissionTimestamp": "12/01/2025, 11:00:00",
        "trackingToken": "TRK-551877",
        "applicantName": "Prof. S. Ananth",
        "organization": "IIT Tirupati",
        "department": "Department of Electrical Engineering & CPS Lab",
        "designation": "Associate Professor & Lead Investigator",
        "email": "s.ananth@iitt.ac.in",
        "mobile": "+91 98450 67890",
        "applicantType": "Academic Institution / Faculty",
        "projectTitle": "Sub-THz Metamaterial Radar Sensor Array for Underground Void Detection",
        "technologyDomain": "IoT / Sensor Fusion",
        "problemStatement": "Non-destructive subsurface imaging for urban utility mapping requires high-resolution sub-THz radar sensors capable of penetrating multi-layered concrete and soil without heavy bulky equipment.",
        "background": "Theoretical simulation of metamaterial beamforming surfaces completed.",
        "aim": "Build portable handheld sub-THz radar imaging scanner achieving 5cm depth resolution up to 2 meters subterranean depth.",
        "objectives": [
            "Fabricate metamaterial lens antenna array operating at 140 GHz.",
            "Implement high-speed synthetic aperture radar (SAR) reconstruction on FPGA.",
            "Demonstrate subterranean field void detection under asphalt and reinforced concrete."
        ],
        "proposedSolution": "Handheld FMCW radar module with embedded GPU reconstruction and augmented reality depth overlay.",
        "innovation": "First indigenous portable sub-THz metamaterial SAR scanner for civil infrastructure.",
        "currentTrl": 3,
        "targetTrl": 6,
        "expectedOutcomes": "Fully certified TRL 6 scanner prototype, field trial certificate, and filed patent.",
        "methodology": "Waveguide calibration, PCB metamaterial etching, anechoic range verification, and municipal road trials.",
        "hardwareRequirements": "Sub-THz transceiver chipsets, horn antennas, FPGA processing kit.",
        "softwareRequirements": "MATLAB SAR Toolbox, CUDA C++, Qt GUI.",
        "datasetRequirements": "Radar backscatter reflections from known subterranean pipeline testbeds.",
        "labTestbedRequirements": [
            "Industrial IoT & Sensor Instrumentation",
            "PNT (Positioning, Navigation & Timing) Testbed"
        ],
        "industryCollaborationRequirement": "Municipal Development Authorities and Underground Utility Contractors.",
        "startDate": "2025-03-01",
        "expectedDurationMonths": 16,
        "milestones": [
            { "title": "Metamaterial Array Fabrication", "month": "Month 04", "targetOutput": "Fabricated antenna prototype" },
            { "title": "SAR Imaging Algorithm Implementation", "month": "Month 08", "targetOutput": "Real-time reconstruction engine" },
            { "title": "Field Trials in Tirupati Smart City Test Sites", "month": "Month 14", "targetOutput": "Field test report" },
            { "title": "TRL 6 Prototype Metrology Certification", "month": "Month 16", "targetOutput": "Final qualification certificate" }
        ],
        "deliverables": [
            { "code": "D1", "description": "Metamaterial Antenna Simulation & Benchmark", "timeline": "Month 04" },
            { "code": "D2", "description": "Integrated Handheld Radar Engineering Model", "timeline": "Month 08" },
            { "code": "D3", "description": "Subterranean Field Mapping Test Dossier", "timeline": "Month 14" },
            { "code": "D4", "description": "TRL 6 Metrology Certification & Patent Filing", "timeline": "Month 16" }
        ],
        "teamMembers": [
            { "name": "Prof. S. Ananth", "role": "Principal Investigator (PI)", "institution": "IIT Tirupati", "email": "s.ananth@iitt.ac.in" },
            { "name": "K. Srinivas", "role": "RF Metamaterials Specialist", "institution": "IIT Tirupati", "email": "srinivas.k@iitt.ac.in" }
        ],
        "facultyMentorPI": "Prof. S. Ananth",
        "documents": [
            { "documentType": "Final Project Dossier", "fileName": "Sub_THz_Radar_Final_Report.pdf", "fileSize": "6.8 MB" },
            { "documentType": "TRL 6 Qualification Certificate", "fileName": "TRL6_Validation_Certificate_Signed.pdf", "fileSize": "1.4 MB" }
        ],
        "declarationAccepted": True,
        "authorizedSigner": "Prof. S. Ananth",
        "reviewerRemarks": "All deliverables D1-D4 fulfilled. Final project completion review accepted by IITTNiF Board. Technology ready for commercialization transfer.",
        "budgetApproved": "₹ 32,00,000",
        "leadReviewer": "Dr. K. Raghavan & Evaluation Board",
        "auditHistory": [
            { "timestamp": "12/01/2025, 11:00:00", "action": "Proposal Submitted", "actor": "Prof. S. Ananth", "details": "Initial submission logged." },
            { "timestamp": "28/02/2025, 14:00:00", "action": "Project Sanctioned", "actor": "IITTNiF Directorate", "details": "Sanction letter issued." },
            { "timestamp": "15/07/2026, 17:00:00", "action": "Project Completed & Certified", "actor": "Technical Advisory Board", "details": "TRL 6 qualification certificate issued." }
        ]
    }
]

# Ensure all seeded applications have their stageTimeline populated
for app_item in TDP_APPLICATIONS_DATABASE:
    current_stage, timeline = generate_default_stage_timeline(
        app_item["status"],
        app_item.get("submittedDate"),
        app_item.get("lastUpdated")
    )
    app_item["currentStage"] = current_stage
    app_item["stageTimeline"] = timeline

@app.post("/api/v1/vikas/technology-development/tdp/applications", response_model=TDPApplicationResponse)
@app.post("/api/v1/vikas/technology-development/applications", response_model=TDPApplicationResponse)
def submit_tdp_application(payload: TDPApplicationCreate, user: UserContext = Depends(get_current_user)):
    """
    Process and save full 7-step TDP proposal submission with auto-generated application number
    and auto-populated 8-stage timeline. Associates submission with authenticated applicant.
    """
    random_num = random.randint(1000, 9999)
    current_year = datetime.now().year
    app_number = f"IITTNIF-TDP-{current_year}-{random_num}"
    submission_time = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    submitted_date = datetime.now().strftime("%d/%m/%Y")
    tracking_token = f"TRK-{random.randint(100000, 999999)}"

    saved_app = payload.dict()
    saved_app["applicationNumber"] = app_number
    saved_app["status"] = "Submitted"
    saved_app["submittedDate"] = submitted_date
    saved_app["lastUpdated"] = submission_time
    saved_app["submissionTimestamp"] = submission_time
    saved_app["trackingToken"] = tracking_token
    saved_app["reviewerRemarks"] = "Application registered in IITTNiF secretariat single-window intake queue."
    saved_app["budgetApproved"] = "Pending Review"
    saved_app["leadReviewer"] = "Secretariat Screening Cell"

    # Associate with authenticated applicant if payload didn't specify
    if not saved_app.get("email") or saved_app.get("email") == "applicant@iitt.ac.in":
        saved_app["email"] = user.email
    if not saved_app.get("applicantName"):
        saved_app["applicantName"] = user.name

    # Generate initial 8-stage timeline
    current_stage, timeline = generate_default_stage_timeline("Submitted", submitted_date, submission_time)
    saved_app["currentStage"] = current_stage
    saved_app["stageTimeline"] = timeline

    saved_app["auditHistory"] = [
        {
            "timestamp": submission_time,
            "action": "Proposal Submitted",
            "actor": saved_app["applicantName"],
            "details": f"Proposal submitted for {payload.technologyDomain} under call for proposals."
        }
    ]

    TDP_APPLICATIONS_DATABASE.insert(0, saved_app)
    return saved_app

@app.get("/api/v1/vikas/technology-development/applications", response_model=List[TDPApplicationResponse])
@app.get("/api/v1/vikas/technology-development/tdp/applications", response_model=List[TDPApplicationResponse])
def get_all_tdp_applications(
    status: Optional[str] = Query(None, description="Filter by status (e.g. Submitted, Technical Review, Approved)"),
    domain: Optional[str] = Query(None, description="Filter by Technology Domain"),
    applicant_email: Optional[str] = Query(None, description="Filter by Applicant Email"),
    search: Optional[str] = Query(None, description="Search by application number, title, or applicant name"),
    user: UserContext = Depends(get_current_user)
):
    """
    Retrieve TDP applications with Record-Level Access Control:
    - Applicants only see applications they own.
    - Operations, Pillar Leads, PD, and Admin see applications according to workflow scope.
    """
    results = TDP_APPLICATIONS_DATABASE

    # RECORD-LEVEL ACCESS CONTROL:
    if user.role == "applicant":
        # Applicant can strictly access only their own records!
        results = [
            a for a in results
            if (
                a.get("email", "").lower() == user.email.lower()
                or a.get("applicantName", "").lower() == user.name.lower()
                or (applicant_email and a.get("email", "").lower() == applicant_email.lower())
            )
        ]
    elif user.role == "pillar_lead" and user.assigned_vertical:
        # Pillar leads focus on their vertical domain if not searching all
        if domain is None and user.assigned_vertical == "TECH_DEV":
            # For tech dev pillar lead, show tech dev projects
            pass

    if status and status.lower() not in ["all", "all statuses"]:
        results = [a for a in results if a["status"].lower() == status.lower()]

    if domain and domain.lower() not in ["all", "all domains"]:
        results = [a for a in results if a["technologyDomain"].lower() == domain.lower()]

    if applicant_email and user.role != "applicant":
        results = [a for a in results if a.get("email", "").lower() == applicant_email.lower()]

    if search:
        s = search.lower().strip()
        results = [
            a for a in results
            if s in a.get("applicationNumber", "").lower()
            or s in a.get("projectTitle", "").lower()
            or s in a.get("applicantName", "").lower()
            or s in a.get("technologyDomain", "").lower()
        ]

    return results

@app.get("/api/v1/vikas/technology-development/applications/{application_identifier}", response_model=TDPApplicationResponse)
@app.get("/api/v1/vikas/technology-development/tdp/applications/{application_identifier}", response_model=TDPApplicationResponse)
def get_tdp_application_by_id(
    application_identifier: str,
    user: UserContext = Depends(get_current_user)
):
    """
    Retrieve single TDP application by ID with record-level privacy check.
    """
    for app_item in TDP_APPLICATIONS_DATABASE:
        if (
            app_item["applicationNumber"].lower() == application_identifier.lower()
            or app_item.get("trackingToken", "").lower() == application_identifier.lower()
        ):
            # RECORD-LEVEL ACCESS CHECK FOR APPLICANTS:
            if user.role == "applicant":
                is_owner = (
                    app_item.get("email", "").lower() == user.email.lower()
                    or app_item.get("applicantName", "").lower() == user.name.lower()
                )
                if not is_owner:
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail="Access Denied: Applicants are restricted to viewing only their own application records."
                    )
            return app_item
    raise HTTPException(status_code=404, detail=f"TDP Application '{application_identifier}' not found.")

@app.patch("/api/v1/vikas/technology-development/applications/{application_identifier}/status", response_model=TDPApplicationResponse)
def update_tdp_application_status_by_admin(
    application_identifier: str, 
    payload: TDPStatusUpdatePayload,
    user: UserContext = Depends(require_roles(["operations", "pillar_lead", "pd", "admin"]))
):
    """
    Authorized Internal Workflow Action: Update status and timeline progression.
    IMPORTANT BUSINESS RULE:
    An applicant/external stakeholder must NEVER be able to perform internal workflow actions
    such as screening, verification, routing, classification, approval, or e-signature.
    """
    for app_item in TDP_APPLICATIONS_DATABASE:
        if app_item["applicationNumber"].lower() == application_identifier.lower():
            valid_statuses = [
                "Draft", "Submitted", "Under Screening", "Screened", "Routing", "Technical Review",
                "Mentor Review", "Approved", "Rejected", "On Hold", "In Progress", "Completed",
                "returned_for_correction"
            ]
            if payload.status not in valid_statuses:
                raise HTTPException(status_code=400, detail=f"Invalid status '{payload.status}'. Must be one of {valid_statuses}")

            # 1. CONFLICT OF INTEREST ENFORCEMENT:
            # An internal officer cannot screen, route, approve, or reject their own application
            if app_item.get("email", "").lower() == user.email.lower():
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Conflict of Interest: Officers cannot process, approve, or reject applications they submitted as an applicant."
                )

            # 2. SCREENING & ROUTING ROLE ENFORCEMENT:
            # Only Operations Officers and Administrators can perform screening & routing actions
            screening_routing_statuses = ["Under Screening", "Screened", "Routing", "returned_for_correction"]
            if payload.status in screening_routing_statuses and user.role not in ["operations", "admin"]:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Authority Matrix Violation: Screening and routing operations are strictly restricted to Operations officers. {user.role.replace('_', ' ').title()} cannot perform screening or routing."
                )

            # 3. APPROVAL AUTHORITY ENFORCEMENT:
            # Operations role cannot perform final approval (delegated to Pillar Lead or PD)
            if payload.status == "Approved" and user.role == "operations":
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Authority Matrix Violation: Operations role cannot sign off final approval. Final project approval requires Pillar Lead or Project Director authorization."
                )

            # High-impact strategic / large budget files require Project Director executive approval
            is_pd_case = (
                app_item.get("approvalAuthority") == "pd" 
                or app_item.get("isStrategic", False) 
                or "35,00,000" in str(app_item.get("budgetCap", ""))
            )
            if payload.status == "Approved" and is_pd_case and user.role not in ["pd", "admin"]:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Authority Matrix Violation: This application requires executive authorization and digital signature by the Project Director. Pillar Leads cannot authorize PD-level files."
                )

            now_str = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
            app_item["status"] = payload.status
            app_item["lastUpdated"] = now_str
            if payload.reviewerRemarks:
                app_item["reviewerRemarks"] = payload.reviewerRemarks

            current_stage, timeline = generate_default_stage_timeline(payload.status, app_item.get("submittedDate"), now_str)
            app_item["currentStage"] = payload.currentStage or current_stage
            app_item["stageTimeline"] = timeline

            if "auditHistory" not in app_item:
                app_item["auditHistory"] = []

            actor_title = (
                "Project Director" if user.role == "pd" else
                "Pillar Lead" if user.role == "pillar_lead" else
                "Operations Screening Officer" if user.role == "operations" else
                "System Administrator"
            )
            actor_name = f"{user.name} ({actor_title})"

            app_item["auditHistory"].append({
                "timestamp": now_str,
                "action": f"Status Updated to {payload.status}",
                "actor": actor_name,
                "details": payload.reviewerRemarks or f"Status changed to {payload.status} (Stage: {app_item['currentStage']}) by {actor_title}."
            })

            return app_item

    raise HTTPException(status_code=404, detail=f"TDP Application '{application_identifier}' not found.")

# =========================================================================
# TDP PROJECT EXECUTION & DELIVERABLES MANAGEMENT DATABASE & ENDPOINTS
# =========================================================================

from app.schemas.tdp_application import (
    TDPProjectExecutionData,
    TDPExecutionMilestone,
    TDPWeeklyProgress,
    TDPWeeklyProgressAttachment,
    TDPTechnicalDeliverable,
    TDPFinalAssets,
    TDPFinalReportAsset,
    TDPPresentationAsset,
    TDPVideoAsset,
    TDPCodeRepositoryAsset,
    TDPMentorVerifyPayload
)

TDP_EXECUTION_DATABASE: Dict[str, dict] = {
    "IITTNIF-TDP-2026-7193": {
        "applicationNumber": "IITTNIF-TDP-2026-7193",
        "projectTitle": "Automated Hyperspectral Satellite Pipeline for Agricultural Yield Modeling",
        "technologyDomain": "Geo-Intelligence",
        "applicantName": "Prof. S. Ananth",
        "organization": "IIT Tirupati",
        "assignedMentor": "Dr. K. Raghavan (TDP Lead & Domain Mentor)",
        "currentTrl": 3,
        "targetTrl": 5,
        "overallProgressPercent": 45,
        "lastUpdated": "28/08/2026, 17:30:00",
        "milestones": [
            {
                "id": "M1",
                "milestone": "Data Pipeline Ingestion with VidyaGIS Engine",
                "description": "Automated radiometric calibration and spatial atmospheric correction pipelines integrated with raster cloud storage.",
                "dueDate": "01/10/2026",
                "status": "Verified",
                "evidence": "Radiometric_Calibration_Test_Dossier_v1.pdf",
                "evidenceFileName": "Radiometric_Calibration_Test_Dossier_v1.pdf",
                "evidenceUrl": "#",
                "submissionDate": "15/08/2026",
                "mentorReview": "Pipeline latency benchmarking accepted. Sub-40min turnaround verified on GPU test cluster.",
                "mentorVerifiedBy": "Dr. K. Raghavan",
                "mentorVerificationDate": "20/08/2026"
            },
            {
                "id": "M2",
                "milestone": "Deep Neural Segmentation Model Benchmark",
                "description": "Lightweight transformer canopy segmentation model achieving > 90% F1 score on multi-spectral test tiles.",
                "dueDate": "15/12/2026",
                "status": "Submitted",
                "evidence": "Canopy_Segmentation_Benchmark_Weights.onnx",
                "evidenceFileName": "Canopy_Segmentation_Benchmark_Weights.onnx",
                "evidenceUrl": "#",
                "submissionDate": "28/08/2026",
                "mentorReview": "Model weights submitted. Under evaluation by GeoAI peer committee.",
                "mentorVerifiedBy": None,
                "mentorVerificationDate": None
            },
            {
                "id": "M3",
                "milestone": "District-Scale Pilot Validation & API Deployment",
                "description": "Field validation with farmers ground-truth data in 5 agro-climatic zones and live production REST API endpoint.",
                "dueDate": "15/05/2027",
                "status": "Draft",
                "evidence": None,
                "evidenceFileName": None,
                "evidenceUrl": None,
                "submissionDate": None,
                "mentorReview": "Pending execution of Phase 3 field trials.",
                "mentorVerifiedBy": None,
                "mentorVerificationDate": None
            }
        ],
        "weeklyProgressLogs": [
            {
                "id": "WP-W1",
                "weekNumber": 1,
                "tasksUndertaken": "Architecture formulation and ingestion containerization setup on Docker.",
                "toolsDatasetsMethodsUsed": "Docker, GDAL, Sentinel-2 L2A datasets, FastAPI.",
                "status": "Verified",
                "resultsOutputs": "Functional Docker container with automated GDAL raster tiling microservice.",
                "challenges": "High memory footprint during 10m band multi-spectral mosaic processing.",
                "solutions": "Implemented chunked raster window reading using rasterio and memory-mapped virtual arrays.",
                "supportNeeded": "Allocation of 32GB RAM instance on IITTNiF Geo-Intelligence cloud suite.",
                "planForNextWeek": "Begin hyperspectral atmospheric correction module implementation.",
                "learningSummary": "Chunked raster windowing reduced RAM requirement by 65% with zero accuracy loss.",
                "attachments": [
                    {
                        "fileName": "Ingestion_Microservice_Bench.pdf",
                        "fileSize": "1.2 MB",
                        "fileUrl": "#",
                        "fileType": "application/pdf"
                    }
                ],
                "submissionDate": "08/08/2026",
                "submittedBy": "Prof. S. Ananth",
                "mentorReview": "Architecture design approved. Cloud cluster RAM upgrade provisioned.",
                "mentorVerifiedBy": "Dr. K. Raghavan",
                "mentorVerificationDate": "10/08/2026"
            },
            {
                "id": "WP-W2",
                "weekNumber": 2,
                "tasksUndertaken": "Implementation of lightweight transformer model for crop canopy segmentation.",
                "toolsDatasetsMethodsUsed": "PyTorch, TensorRT, CuPy, PRISMA hyperspectral tiles.",
                "status": "Submitted",
                "resultsOutputs": "Trained 4-layer spatial attention model achieving 92.4% validation accuracy on test tiles.",
                "challenges": "Overfitting on small sample size in dryland agriculture test regions.",
                "solutions": "Applied spectral-spatial data augmentation and mixup regularization.",
                "supportNeeded": "Ground-truth NDVI validation points from AP State Remote Sensing Centre.",
                "planForNextWeek": "Quantize model to int8 format for embedded edge inference.",
                "learningSummary": "Mixup augmentation improved generalization score across dryland tiles by 4.2%.",
                "attachments": [
                    {
                        "fileName": "Model_Accuracy_Confusion_Matrix.png",
                        "fileSize": "850 KB",
                        "fileUrl": "#",
                        "fileType": "image/png"
                    }
                ],
                "submissionDate": "26/08/2026",
                "submittedBy": "Prof. S. Ananth",
                "mentorReview": "Weekly report submitted and queued for mentor review.",
                "mentorVerifiedBy": None,
                "mentorVerificationDate": None
            }
        ],
        "technicalDeliverables": [
            {
                "id": "D1",
                "deliverableCode": "D1",
                "title": "Automated Pre-processing Benchmark Dossier",
                "description": "Complete mathematical proof and code benchmark of atmospheric correction pipeline.",
                "targetTimeline": "Month 03 (Oct 2026)",
                "status": "Verified",
                "deliverableType": "Test Qualification Dossier",
                "evidence": "D1_Atmospheric_Correction_Dossier_Signed.pdf",
                "evidenceFileName": "D1_Atmospheric_Correction_Dossier_Signed.pdf",
                "evidenceUrl": "#",
                "submissionDate": "15/08/2026",
                "mentorReview": "Deliverable D1 verified and accepted by Technical Panel.",
                "mentorVerifiedBy": "Dr. K. Raghavan",
                "mentorVerificationDate": "22/08/2026"
            },
            {
                "id": "D2",
                "deliverableCode": "D2",
                "title": "Calibrated Crop Health Estimation Engine",
                "description": "Production-grade microservices container with model weights and inference SDK.",
                "targetTimeline": "Month 06 (Jan 2027)",
                "status": "Submitted",
                "deliverableType": "Firmware Source Code",
                "evidence": "CropHealth_Engine_v1.0.tar.gz",
                "evidenceFileName": "CropHealth_Engine_v1.0.tar.gz",
                "evidenceUrl": "#",
                "submissionDate": "28/08/2026",
                "mentorReview": "Submitted for code audit and benchmark validation.",
                "mentorVerifiedBy": None,
                "mentorVerificationDate": None
            },
            {
                "id": "D3",
                "deliverableCode": "D3",
                "title": "District-Scale Pilot Validation Dossier",
                "description": "Comprehensive field accuracy verification across 500 farmer field plots.",
                "targetTimeline": "Month 12 (Jul 2027)",
                "status": "Draft",
                "deliverableType": "Field Validation Certificate",
                "evidence": None,
                "evidenceFileName": None,
                "evidenceUrl": None,
                "submissionDate": None,
                "mentorReview": None,
                "mentorVerifiedBy": None,
                "mentorVerificationDate": None
            }
        ],
        "finalAssets": {
            "finalReport": {
                "title": "Hyperspectral Agricultural Pipeline Final Project Report",
                "fileName": "TDP_GEO_Final_Technical_Report_Draft.pdf",
                "fileSize": "4.8 MB",
                "uploadDate": "20/08/2026",
                "status": "Draft",
                "summary": "Full project dossier covering system design, GPU benchmarking, and field trials.",
                "mentorReview": "Draft review: Include detailed MIL-STD validation section before final sign-off."
            },
            "presentation": {
                "title": "TDP Project Evaluation Presentation Deck",
                "fileName": "Hyperspectral_Pipeline_Defense_Deck.pptx",
                "fileSize": "8.2 MB",
                "uploadDate": "18/08/2026",
                "status": "Submitted",
                "slideCount": 24,
                "mentorReview": "Slide deck structured cleanly for TAC evaluation."
            },
            "projectVideo": {
                "title": "Automated Satellite Ingestion & Canopy Inference Demo",
                "videoUrl": "https://youtu.be/iittnif-hyperspectral-demo",
                "videoDuration": "04:35 mins",
                "uploadDate": "22/08/2026",
                "status": "Submitted",
                "embedPlatform": "YouTube / MP4",
                "mentorReview": "Video demonstrates clear real-time inference workflow."
            },
            "codeRepository": {
                "repoUrl": "https://github.com/iittnif-tdp/hyperspectral-pipeline-core",
                "branch": "main",
                "accessNotes": "Private institutional repository; token provisioned to IITTNiF TAC panel.",
                "datasetRepoUrl": "https://huggingface.co/datasets/iittnif/agri-hyperspectral-bench",
                "status": "Verified",
                "license": "Apache 2.0 / IITTNiF Institutional IP",
                "mentorReview": "Code repository contains clean documentation, Dockerfile, and unit tests."
            }
        }
    }
}

def get_or_create_execution_data(application_identifier: str) -> dict:
    app_key = application_identifier.upper()
    for key, data in TDP_EXECUTION_DATABASE.items():
        if key.lower() == application_identifier.lower():
            return data

    # Find the application in applications DB to generate execution data
    matching_app = None
    for a in TDP_APPLICATIONS_DATABASE:
        if a["applicationNumber"].lower() == application_identifier.lower():
            matching_app = a
            break

    if not matching_app:
        raise HTTPException(status_code=404, detail=f"TDP Application '{application_identifier}' not found.")

    # Create dynamic execution data
    milestones = []
    for i, m in enumerate(matching_app.get("milestones", [])):
        milestones.append({
            "id": f"M{i+1}",
            "milestone": m.get("title", f"Milestone {i+1}"),
            "description": m.get("targetOutput", "Milestone output"),
            "dueDate": f"Month {m.get('month', i*3+3)}",
            "status": "Verified" if i == 0 else ("Submitted" if i == 1 else "Draft"),
            "evidence": f"Milestone_M{i+1}_Verification_Doc.pdf" if i < 2 else None,
            "evidenceFileName": f"Milestone_M{i+1}_Verification_Doc.pdf" if i < 2 else None,
            "evidenceUrl": "#",
            "submissionDate": "15/08/2026" if i < 2 else None,
            "mentorReview": "Verified by Domain Mentor." if i == 0 else ("Under Review" if i == 1 else None),
            "mentorVerifiedBy": "Dr. K. Raghavan" if i == 0 else None,
            "mentorVerificationDate": "20/08/2026" if i == 0 else None
        })

    deliverables = []
    for i, d in enumerate(matching_app.get("deliverables", [])):
        deliverables.append({
            "id": f"D{i+1}",
            "deliverableCode": d.get("code", f"D{i+1}"),
            "title": d.get("description", f"Deliverable {i+1}"),
            "description": d.get("description", f"Deliverable {i+1} output"),
            "targetTimeline": d.get("timeline", f"Month {i*3+3}"),
            "status": "Verified" if i == 0 else "Draft",
            "deliverableType": "Hardware / Software Engineering Model",
            "evidence": f"Deliverable_D{i+1}_Package.zip" if i == 0 else None,
            "evidenceFileName": f"Deliverable_D{i+1}_Package.zip" if i == 0 else None,
            "evidenceUrl": "#",
            "submissionDate": "15/08/2026" if i == 0 else None,
            "mentorReview": "Deliverable approved." if i == 0 else None,
            "mentorVerifiedBy": "Dr. K. Raghavan" if i == 0 else None,
            "mentorVerificationDate": "20/08/2026" if i == 0 else None
        })

    exec_data = {
        "applicationNumber": matching_app["applicationNumber"],
        "projectTitle": matching_app["projectTitle"],
        "technologyDomain": matching_app["technologyDomain"],
        "applicantName": matching_app["applicantName"],
        "organization": matching_app["organization"],
        "assignedMentor": matching_app.get("leadMentor", "Dr. K. Raghavan (TDP Lead & Domain Mentor)"),
        "currentTrl": matching_app.get("currentTrl", 3),
        "targetTrl": matching_app.get("targetTrl", 6),
        "overallProgressPercent": 35,
        "lastUpdated": datetime.now().strftime("%d/%m/%Y, %H:%M:%S"),
        "milestones": milestones,
        "weeklyProgressLogs": [
            {
                "id": "WP-W1",
                "weekNumber": 1,
                "tasksUndertaken": "Initial requirements baseline and testbed setup.",
                "toolsDatasetsMethodsUsed": "Vivado, MATLAB RF Blockset, PNT Testbed.",
                "status": "Verified",
                "resultsOutputs": "Baseline testbed telemetry acquired.",
                "challenges": "RF impedance noise under high gain.",
                "solutions": "Added matching capacitor network.",
                "supportNeeded": "Access to anechoic chamber.",
                "planForNextWeek": "Run 24h continuous drift test.",
                "learningSummary": "Impedance matching solved drift by 80%.",
                "attachments": [{"fileName": "Week1_Drift_Log.pdf", "fileSize": "950 KB", "fileUrl": "#", "fileType": "application/pdf"}],
                "submissionDate": "15/08/2026",
                "submittedBy": matching_app["applicantName"],
                "mentorReview": "Great start. Anechoic testbed scheduled.",
                "mentorVerifiedBy": "Dr. K. Raghavan",
                "mentorVerificationDate": "18/08/2026"
            }
        ],
        "technicalDeliverables": deliverables,
        "finalAssets": {
            "finalReport": {
                "title": f"{matching_app['projectTitle']} Final Report",
                "fileName": None,
                "fileSize": None,
                "uploadDate": None,
                "status": "Draft",
                "summary": None,
                "mentorReview": None
            },
            "presentation": {
                "title": f"{matching_app['projectTitle']} Review Deck",
                "fileName": None,
                "fileSize": None,
                "uploadDate": None,
                "status": "Draft",
                "slideCount": 0,
                "mentorReview": None
            },
            "projectVideo": {
                "title": f"{matching_app['projectTitle']} Prototype Demo Video",
                "videoUrl": None,
                "videoDuration": None,
                "uploadDate": None,
                "status": "Draft",
                "embedPlatform": "YouTube / MP4",
                "mentorReview": None
            },
            "codeRepository": {
                "repoUrl": None,
                "branch": "main",
                "accessNotes": None,
                "datasetRepoUrl": None,
                "status": "Draft",
                "license": "Apache 2.0",
                "mentorReview": None
            }
        }
    }

    TDP_EXECUTION_DATABASE[matching_app["applicationNumber"]] = exec_data
    return exec_data

@app.get("/api/v1/vikas/technology-development/execution/{application_identifier}", response_model=TDPProjectExecutionData)
def get_project_execution_details(
    application_identifier: str,
    user: UserContext = Depends(get_current_user)
):
    """
    Retrieve project execution workspace with record-level privacy check.
    """
    data = get_or_create_execution_data(application_identifier)
    if user.role == "applicant":
        is_owner = (
            data.get("applicantEmail", "").lower() == user.email.lower()
            or data.get("applicantName", "").lower() == user.name.lower()
        )
        if not is_owner:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access Denied: Applicants can only view their own project execution workspace."
            )
    return data

@app.post("/api/v1/vikas/technology-development/execution/{application_identifier}/weekly-progress", response_model=TDPProjectExecutionData)
def submit_weekly_progress(
    application_identifier: str, 
    payload: TDPWeeklyProgress,
    user: UserContext = Depends(require_roles(["execution", "pillar_lead", "pd", "admin"]))
):
    """
    Submit weekly progress log.
    IMPORTANT BUSINESS RULE:
    Engagement/execution actions are restricted to authorized internal staff.
    External applicants have read-only access to progress tracking.
    """
    data = get_or_create_execution_data(application_identifier)
    now_str = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

    new_log = payload.dict()
    new_log["id"] = f"WP-W{payload.weekNumber}"
    new_log["submissionDate"] = now_str
    if not new_log.get("submittedBy"):
        new_log["submittedBy"] = user.name or data["applicantName"]

    existing_idx = next((i for i, w in enumerate(data["weeklyProgressLogs"]) if w["weekNumber"] == payload.weekNumber), None)
    if existing_idx is not None:
        data["weeklyProgressLogs"][existing_idx] = new_log
    else:
        data["weeklyProgressLogs"].insert(0, new_log)

    data["lastUpdated"] = now_str
    return data

@app.put("/api/v1/vikas/technology-development/execution/{application_identifier}/milestones/{milestone_id}", response_model=TDPProjectExecutionData)
def update_milestone_progress(
    application_identifier: str, 
    milestone_id: str, 
    payload: TDPExecutionMilestone,
    user: UserContext = Depends(require_roles(["execution", "pillar_lead", "pd", "admin"]))
):
    """
    Update milestone evidence.
    Restricted to authorized internal execution staff.
    """
    data = get_or_create_execution_data(application_identifier)
    now_str = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

    for m in data["milestones"]:
        if m["id"].lower() == milestone_id.lower():
            m["status"] = payload.status
            if payload.evidence:
                m["evidence"] = payload.evidence
                m["evidenceFileName"] = payload.evidenceFileName or payload.evidence
            if payload.evidenceUrl:
                m["evidenceUrl"] = payload.evidenceUrl
            m["submissionDate"] = now_str
            break

    data["lastUpdated"] = now_str
    return data

@app.put("/api/v1/vikas/technology-development/execution/{application_identifier}/deliverables/{deliverable_id}", response_model=TDPProjectExecutionData)
def update_deliverable_progress(
    application_identifier: str, 
    deliverable_id: str, 
    payload: TDPTechnicalDeliverable,
    user: UserContext = Depends(require_roles(["execution", "pillar_lead", "pd", "admin"]))
):
    """
    Update deliverable evidence.
    Restricted to authorized internal execution staff.
    """
    data = get_or_create_execution_data(application_identifier)
    now_str = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

    for d in data["technicalDeliverables"]:
        if d["id"].lower() == deliverable_id.lower() or d["deliverableCode"].lower() == deliverable_id.lower():
            d["status"] = payload.status
            if payload.evidence:
                d["evidence"] = payload.evidence
                d["evidenceFileName"] = payload.evidenceFileName or payload.evidence
            if payload.evidenceUrl:
                d["evidenceUrl"] = payload.evidenceUrl
            d["submissionDate"] = now_str
            break

    data["lastUpdated"] = now_str
    return data

@app.put("/api/v1/vikas/technology-development/execution/{application_identifier}/final-assets", response_model=TDPProjectExecutionData)
def update_final_assets(
    application_identifier: str, 
    payload: TDPFinalAssets,
    user: UserContext = Depends(require_roles(["execution", "pillar_lead", "pd", "admin"]))
):
    """
    Update final project assets.
    Restricted to authorized internal execution staff.
    """
    data = get_or_create_execution_data(application_identifier)
    now_str = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    data["finalAssets"] = payload.dict()
    data["lastUpdated"] = now_str
    return data
    return data

@app.post("/api/v1/vikas/technology-development/execution/{application_identifier}/mentor-verify", response_model=TDPProjectExecutionData)
def mentor_verify_item(
    application_identifier: str, 
    payload: TDPMentorVerifyPayload,
    user: UserContext = Depends(require_roles(["pillar_lead", "pd", "admin", "execution"]))
):
    """
    Mentor / Reviewer Verification Action:
    Mentor evaluates any milestone, weekly progress, deliverable, or final asset.
    IMPORTANT BUSINESS RULE:
    Applicants must NEVER be able to perform verification or approve deliverables.
    """
    data = get_or_create_execution_data(application_identifier)
    now_str = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
    mentor_name = payload.mentorName or f"{user.name} ({user.role.replace('_', ' ').title()})"

    if payload.itemType == "milestone":
        for m in data["milestones"]:
            if m["id"].lower() == payload.itemId.lower():
                m["status"] = payload.status
                m["mentorReview"] = payload.mentorReview
                m["mentorVerifiedBy"] = mentor_name
                m["mentorVerificationDate"] = now_str
                break
    elif payload.itemType == "weekly_progress":
        for w in data["weeklyProgressLogs"]:
            if (
                w["id"].lower() == payload.itemId.lower() 
                or str(w["weekNumber"]) == str(payload.itemId).replace("WP-W", "").replace("W", "")
            ):
                w["status"] = payload.status
                w["mentorReview"] = payload.mentorReview
                w["mentorVerifiedBy"] = mentor_name
                w["mentorVerificationDate"] = now_str
                break
    elif payload.itemType == "deliverable":
        for d in data["technicalDeliverables"]:
            if d["id"].lower() == payload.itemId.lower() or d["deliverableCode"].lower() == payload.itemId.lower():
                d["status"] = payload.status
                d["mentorReview"] = payload.mentorReview
                d["mentorVerifiedBy"] = mentor_name
                d["mentorVerificationDate"] = now_str
                break
    elif payload.itemType == "final_asset":
        asset_key = payload.itemId.lower()
        if "finalassets" in data or "finalAssets" in data:
            assets = data.get("finalAssets") or data.get("finalassets")
            for k in ["finalReport", "presentation", "projectVideo", "codeRepository"]:
                if k.lower() == asset_key.replace("_", "").lower() and k in assets and assets[k]:
                    assets[k]["status"] = payload.status
                    assets[k]["mentorReview"] = payload.mentorReview
                    break

    # Recalculate overall progress percent
    total_items = len(data["milestones"]) + len(data["technicalDeliverables"])
    verified_items = sum(1 for m in data["milestones"] if m["status"] == "Verified") + sum(1 for d in data["technicalDeliverables"] if d["status"] == "Verified")
    if total_items > 0:
        data["overallProgressPercent"] = min(100, int((verified_items / total_items) * 100))

    data["lastUpdated"] = now_str
    return data


