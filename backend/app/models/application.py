from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class OnboardingApplicationRecord(BaseModel):
    """
    Canonical record for a VIKAS Ecosystem Onboarding Application.
    Crucially references user_id as a foreign key to ApplicantUser.id.
    """
    id: str = Field(..., description="Unique application ID")
    file_number: str = Field(..., description="Institutional file number (e.g. IITTNIF-2026-007)")
    user_id: str = Field(..., description="Foreign Key to ApplicantUser.id")
    applicant_name: str = Field(..., description="Applicant contact person name")
    email: str = Field(..., description="Applicant contact email")
    phone: Optional[str] = Field(None, description="Applicant phone number")
    organization: str = Field(..., description="Organization or startup name")
    location: Optional[str] = Field(None, description="Location / Headquarters")
    stakeholder_type: str = Field(..., description="Stakeholder classification: STARTUP, STUDENT_RESEARCHER, etc.")
    domains: List[str] = Field(default_factory=list, description="Target technology / CPS domains")
    intent_of_engagement: Optional[str] = Field(None, description="Primary intent of engagement")
    dynamic_inputs: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Dynamic details by stakeholder type")
    problem_statement: Optional[str] = Field(None, description="Problem statement or brief scope")
    status: str = Field("pending_screening", description="Lifecycle status: pending_screening, under_screening, screened, routing, pending_approval, approved, rejected")
    approval_authority: Optional[str] = Field("pillar_lead", description="Approval tier: pillar_lead, pd")
    assigned_vertical: Optional[str] = Field("6.2 Startups & Business Enablement", description="Assigned institutional vertical")
    submission_date: str = Field(default_factory=lambda: datetime.now().strftime("%d/%m/%Y"))
    last_updated: str = Field(default_factory=lambda: datetime.now().strftime("%d/%m/%Y, %H:%M:%S"))
    is_strategic: bool = Field(False, description="Flag for high-value strategic files")
    history: List[Dict[str, Any]] = Field(default_factory=list, description="Audit and timeline events")

class OnboardingApplicationRepository:
    """
    Repository for onboarding applications with fast index by user_id and file_number.
    Enforces record-level access constraints.
    """
    def __init__(self):
        self._apps_by_id: Dict[str, OnboardingApplicationRecord] = {}
        self._apps_by_file_no: Dict[str, str] = {} # file_number.lower() -> id
        self._seed_initial_applications()

    def _seed_initial_applications(self):
        # Seed application for Aasrita Reddy (STARTUP applicant)
        aasrita_app = OnboardingApplicationRecord(
            id="app_onboard_2026_007",
            file_number="IITTNIF-2026-007",
            user_id="usr_app_aasrita_reddy",
            applicant_name="Aasrita Reddy",
            email="aasritareddy.c@gmail.com",
            phone="9493562799",
            organization="IITTNiF",
            location="Tirupati",
            stakeholder_type="STARTUP",
            domains=["PNT / NavIC / GNSS", "IoT / Sensor Fusion"],
            intent_of_engagement="Startup Ecosystem Onboarding & Tech Enablement",
            dynamic_inputs={
                "category": "Startup",
                "stage": "Prototype",
                "domain": "PNT / NavIC / GNSS",
                "teamSize": "1 - 5",
                "previousWork": "Functional NavIC L5/S-band embedded tracking node with RTK positioning."
            },
            problem_statement="Developing low-cost indigenous NavIC precision ground receivers for geospatial survey and autonomous agricultural robotics.",
            status="pending_screening",
            approval_authority="pillar_lead",
            assigned_vertical="6.2 Startups & Business Enablement",
            submission_date="08/09/2026",
            last_updated="08/09/2026, 11:30:00",
            is_strategic=False,
            history=[
                {
                    "date": "08/09/2026, 11:30:00",
                    "action": "File Created & Onboarded",
                    "user": "Aasrita Reddy (Applicant)",
                    "details": "Registered as STARTUP under PNT / NavIC / GNSS. Awaiting initial operations screening."
                }
            ]
        )
        self.save(aasrita_app)

        # Seed existing test applications mapped to test applicant users
        app_001 = OnboardingApplicationRecord(
            id="app_onboard_2026_001",
            file_number="IITTNIF-2026-001",
            user_id="usr_app_startup",
            applicant_name="Vikram Sharma",
            email="startup@vikas.in",
            phone="+91 98765 43210",
            organization="AeroGeo Robotics Pvt Ltd",
            location="Hyderabad",
            stakeholder_type="STARTUP",
            domains=["PNT / NavIC / GNSS", "Geo-Intelligence"],
            intent_of_engagement="Incubation-Free Startup Enablement",
            status="pending_screening",
            approval_authority="pillar_lead",
            assigned_vertical="Startups & Business Enablement",
            submission_date="02/09/2026",
            problem_statement="Indigenous UAV platform integrating dual-frequency NavIC receivers for cadastral survey.",
            history=[
                {
                    "date": "02/09/2026, 10:30:00",
                    "action": "File Created & Onboarded",
                    "user": "Vikram Sharma (Applicant)",
                    "details": "Application submitted for Technology Development & Incubation."
                }
            ]
        )
        self.save(app_001)

        app_003 = OnboardingApplicationRecord(
            id="app_onboard_2026_003",
            file_number="IITTNIF-2026-003",
            user_id="usr_app_researcher",
            applicant_name="Aarav Patel",
            email="student@vikas.in",
            phone="+91 91234 56789",
            organization="IIT Tirupati Research Lab",
            location="Tirupati",
            stakeholder_type="STUDENT_RESEARCHER",
            domains=["Computer Vision / GeoAI", "Digital Twin"],
            intent_of_engagement="Research Grant & Academic Collaboration",
            status="approved",
            approval_authority="pillar_lead",
            assigned_vertical="Academic Collaborations",
            submission_date="15/08/2026",
            problem_statement="Low-latency edge AI model for crop disease classification using spectral imaging.",
            history=[
                {
                    "date": "15/08/2026, 09:30:00",
                    "action": "File Created & Onboarded",
                    "user": "Aarav Patel (Applicant)",
                    "details": "Proposal submitted for research grant."
                },
                {
                    "date": "18/08/2026, 16:00:00",
                    "action": "Authorized & E-Signed",
                    "user": "Pillar Lead",
                    "details": "Formal approval granted. Enrolled into Academic Collaborations vertical."
                }
            ]
        )
        self.save(app_003)

    def save(self, app: OnboardingApplicationRecord) -> OnboardingApplicationRecord:
        app.last_updated = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")
        self._apps_by_id[app.id] = app
        self._apps_by_file_no[app.file_number.lower()] = app.id
        return app

    def get_by_id(self, app_id: str) -> Optional[OnboardingApplicationRecord]:
        return self._apps_by_id.get(app_id)

    def get_by_file_number(self, file_number: str) -> Optional[OnboardingApplicationRecord]:
        if not file_number:
            return None
        app_id = self._apps_by_file_no.get(file_number.lower())
        if app_id:
            return self._apps_by_id.get(app_id)
        return None

    def get_by_user_id(self, user_id: str) -> List[OnboardingApplicationRecord]:
        """
        Record-Level Access Filter: Returns ONLY applications owned by specified user_id.
        """
        return [app for app in self._apps_by_id.values() if app.user_id == user_id]

    def list_all(self) -> List[OnboardingApplicationRecord]:
        return list(self._apps_by_id.values())

# Global singleton repository
onboarding_app_repo = OnboardingApplicationRepository()
