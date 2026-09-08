from enum import Enum
from typing import Optional, Dict, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class SystemRole(str, Enum):
    """
    System-level RBAC role controlling user authorization in the VIKAS portal.
    Completely separate concept from StakeholderType.
    """
    APPLICANT = "APPLICANT"
    OPERATIONS = "OPERATIONS"
    PILLAR_LEAD = "PILLAR_LEAD"
    PROJECT_DIRECTOR = "PROJECT_DIRECTOR"
    EXECUTION = "EXECUTION"
    ADMIN = "ADMIN"

class StakeholderType(str, Enum):
    """
    Ecosystem track & stakeholder classification for external participants.
    Completely separate concept from SystemRole.
    """
    STARTUP = "STARTUP"
    STUDENT_RESEARCHER = "STUDENT_RESEARCHER"
    SCHOOL = "SCHOOL"
    INSTITUTION = "INSTITUTION"
    INDUSTRY = "INDUSTRY"
    GOVERNMENT = "GOVERNMENT"
    EXPERT = "EXPERT"
    OTHER = "OTHER"

class ApplicantUser(BaseModel):
    """
    Canonical backend entity for an Applicant user record.
    Designed with future authentication fields (password hash, verification, provider)
    so production auth can be introduced without altering application relationships.
    """
    id: str = Field(..., description="Unique immutable User ID")
    email: str = Field(..., description="Unique contact email and natural identifier")
    name: str = Field(..., description="Full name of applicant")
    phone: Optional[str] = Field(None, description="Contact phone number")
    organization: Optional[str] = Field(None, description="Associated organization or venture")
    location: Optional[str] = Field(None, description="City / Regional Location")
    stakeholder_type: StakeholderType = Field(StakeholderType.STARTUP, description="Ecosystem classification")
    role: SystemRole = Field(SystemRole.APPLICANT, description="Platform RBAC role")

    # Future-ready Authentication Attributes
    is_active: bool = Field(True, description="Account active status")
    is_verified: bool = Field(True, description="Email verification status")
    hashed_password: Optional[str] = Field(None, description="Bcrypt/Argon2 hash placeholder for real auth")
    auth_provider: str = Field("dev_persona", description="Authentication provider: dev_persona, local, oauth2")
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now().isoformat())

class ApplicantRepository:
    """
    In-memory repository with indexing by ID and unique Email.
    Thread-safe dictionary store simulating database persistence.
    """
    def __init__(self):
        self._users_by_id: Dict[str, ApplicantUser] = {}
        self._users_by_email: Dict[str, str] = {} # email.lower() -> user_id
        self._seed_initial_applicants()

    def _seed_initial_applicants(self):
        # Mandatory Test Applicant: Aasrita Reddy
        aasrita = ApplicantUser(
            id="usr_app_aasrita_reddy",
            name="Aasrita Reddy",
            email="aasritareddy.c@gmail.com",
            phone="9493562799",
            organization="IITTNiF",
            location="Tirupati",
            stakeholder_type=StakeholderType.STARTUP,
            role=SystemRole.APPLICANT,
            is_active=True,
            is_verified=True,
            auth_provider="dev_persona"
        )
        self.save(aasrita)

        # Existing persona applicants for backwards compatibility
        rohan = ApplicantUser(
            id="usr_app_startup",
            name="Rohan Varma",
            email="rohan.varma@skylinetech.io",
            phone="+91 98765 43210",
            organization="SkyLine Drone Technologies Pvt Ltd",
            location="Hyderabad",
            stakeholder_type=StakeholderType.STARTUP,
            role=SystemRole.APPLICANT
        )
        self.save(rohan)

        ananth = ApplicantUser(
            id="usr_app_researcher",
            name="Prof. S. Ananth",
            email="s.ananth@iitt.ac.in",
            phone="+91 98450 67890",
            organization="Department of Electrical Engineering, IIT Tirupati",
            location="Tirupati",
            stakeholder_type=StakeholderType.STUDENT_RESEARCHER,
            role=SystemRole.APPLICANT
        )
        self.save(ananth)

    def save(self, user: ApplicantUser) -> ApplicantUser:
        user.updated_at = datetime.now().isoformat()
        self._users_by_id[user.id] = user
        self._users_by_email[user.email.lower()] = user.id
        return user

    def get_by_id(self, user_id: str) -> Optional[ApplicantUser]:
        return self._users_by_id.get(user_id)

    def get_by_email(self, email: str) -> Optional[ApplicantUser]:
        if not email:
            return None
        user_id = self._users_by_email.get(email.lower())
        if user_id:
            return self._users_by_id.get(user_id)
        return None

    def list_all(self) -> List[ApplicantUser]:
        return list(self._users_by_id.values())

# Global singleton repository
applicant_repo = ApplicantRepository()
