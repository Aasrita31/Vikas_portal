from fastapi import Header, HTTPException, Depends, status
from typing import Optional, List, Dict, Any
from pydantic import BaseModel

from app.models.applicant import applicant_repo, SystemRole, StakeholderType

class UserContext(BaseModel):
    id: str
    name: str
    email: str
    role: str  # 'applicant', 'operations', 'pillar_lead', 'pd', 'execution', 'admin'
    stakeholder_type: Optional[str] = None  # 'STARTUP', 'STUDENT_RESEARCHER', 'SCHOOL', 'INSTITUTION', etc.
    applicant_type: Optional[str] = None  # Legacy display format ('Startup', 'Student / Researcher', etc.)
    assigned_vertical: Optional[str] = None  # 'TECH_DEV', 'STARTUP', 'HRD', etc. (for pillar leads)
    organization: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

# Pre-defined system personas for testing and authorization verification
SYSTEM_PERSONAS: Dict[str, UserContext] = {
    "applicant_aasrita": UserContext(
        id="usr_app_aasrita_reddy",
        name="Aasrita Reddy",
        email="aasritareddy.c@gmail.com",
        phone="9493562799",
        role="applicant",
        stakeholder_type="STARTUP",
        applicant_type="Startup",
        organization="IITTNiF",
        location="Tirupati"
    ),
    "applicant_startup": UserContext(
        id="usr_app_startup",
        name="Rohan Varma",
        email="rohan.varma@skylinetech.io",
        phone="+91 98765 43210",
        role="applicant",
        stakeholder_type="STARTUP",
        applicant_type="Startup",
        organization="SkyLine Drone Technologies Pvt Ltd",
        location="Hyderabad"
    ),
    "applicant_researcher": UserContext(
        id="usr_app_researcher",
        name="Prof. S. Ananth",
        email="s.ananth@iitt.ac.in",
        phone="+91 98450 67890",
        role="applicant",
        stakeholder_type="STUDENT_RESEARCHER",
        applicant_type="Student / Researcher",
        organization="Department of Electrical Engineering, IIT Tirupati",
        location="Tirupati"
    ),
    "applicant_school": UserContext(
        id="usr_app_school",
        name="Meera Sundaram",
        email="principal@vidyamandir.edu.in",
        role="applicant",
        stakeholder_type="SCHOOL",
        applicant_type="School",
        organization="Vidya Mandir Senior Secondary School"
    ),
    "applicant_industry": UserContext(
        id="usr_app_industry",
        name="Rajesh Mehta",
        email="r.mehta@bharatdyn.com",
        role="applicant",
        stakeholder_type="INDUSTRY",
        applicant_type="Industry",
        organization="Bharat Dynamics & Geospatial Systems"
    ),
    "operations_anchor": UserContext(
        id="usr_ops",
        name="Vikram Malhotra",
        email="ops.screening@iittnif.in",
        role="operations",
        organization="IITTNiF Operations & Screening Cell"
    ),
    "pillar_lead_tech": UserContext(
        id="usr_pl_tech",
        name="Dr. K. Raghavan",
        email="k.raghavan@iittnif.in",
        role="pillar_lead",
        assigned_vertical="TECH_DEV",
        organization="IITTNiF Technology Development Pillar"
    ),
    "pillar_lead_startup": UserContext(
        id="usr_pl_startup",
        name="Dr. P. Venkat",
        email="p.venkat@iittnif.in",
        role="pillar_lead",
        assigned_vertical="STARTUP",
        organization="IITTNiF Startups & Business Pillar"
    ),
    "project_director": UserContext(
        id="usr_pd",
        name="Dr. C. P. Sharma",
        email="director@iittnif.in",
        role="pd",
        organization="Directorate, IIT Tirupati Navavishkar I-Hub Foundation"
    ),
    "execution_team": UserContext(
        id="usr_exec",
        name="Anita Reddy",
        email="execution@iittnif.in",
        role="execution",
        organization="IITTNiF Program Execution & Allocation Team"
    ),
    "admin": UserContext(
        id="usr_admin",
        name="System Administrator",
        email="admin@iittnif.in",
        role="admin",
        organization="IITTNiF Portal Administration"
    )
}

def get_current_user(
    x_user_role: Optional[str] = Header(None, alias="X-User-Role"),
    x_user_email: Optional[str] = Header(None, alias="X-User-Email"),
    x_user_name: Optional[str] = Header(None, alias="X-User-Name"),
    x_user_type: Optional[str] = Header(None, alias="X-User-Type"),
    x_user_stakeholder_type: Optional[str] = Header(None, alias="X-User-Stakeholder-Type"),
    x_user_vertical: Optional[str] = Header(None, alias="X-User-Vertical"),
    x_user_id: Optional[str] = Header(None, alias="X-User-Id"),
    authorization: Optional[str] = Header(None, alias="Authorization")
) -> UserContext:
    """
    Extract and validate authenticated user context from request headers.
    If the email or ID matches a persistent backend applicant entity in applicant_repo,
    returns the canonical user context directly backed by that stored entity.
    """
    role = (x_user_role or "applicant").lower().strip()
    
    # Map legacy role values if sent
    if role == "public":
        role = "applicant"

    valid_roles = ["applicant", "operations", "pillar_lead", "pd", "execution", "admin"]
    if role not in valid_roles:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid or unrecognized role: {role}. Must be one of {valid_roles}"
        )

    # 1. Primary check: Query persistent backend Applicant Repository
    stored_applicant = None
    if x_user_id:
        stored_applicant = applicant_repo.get_by_id(x_user_id)
    if not stored_applicant and x_user_email:
        stored_applicant = applicant_repo.get_by_email(x_user_email)

    if stored_applicant and role == "applicant":
        st_val = stored_applicant.stakeholder_type.value if hasattr(stored_applicant.stakeholder_type, "value") else str(stored_applicant.stakeholder_type)
        return UserContext(
            id=stored_applicant.id,
            name=stored_applicant.name,
            email=stored_applicant.email,
            phone=stored_applicant.phone,
            role="applicant",
            stakeholder_type=st_val,
            applicant_type="Startup" if st_val == "STARTUP" else st_val.title(),
            organization=stored_applicant.organization or "IITTNiF",
            location=stored_applicant.location or "Tirupati"
        )

    # 2. Secondary check: SYSTEM_PERSONAS dictionary lookup
    matched_persona = None
    if x_user_email:
        for persona in SYSTEM_PERSONAS.values():
            if persona.email.lower() == x_user_email.lower():
                matched_persona = persona
                break
    if not matched_persona and x_user_id:
        for persona in SYSTEM_PERSONAS.values():
            if persona.id == x_user_id:
                matched_persona = persona
                break

    user_name = x_user_name or (matched_persona.name if matched_persona else (
        "Project Director" if role == "pd" else
        "Operations Officer" if role == "operations" else
        "Pillar Lead" if role == "pillar_lead" else
        "Execution Officer" if role == "execution" else
        "System Admin" if role == "admin" else
        "External Applicant"
    ))

    user_email = x_user_email or (matched_persona.email if matched_persona else f"{role}@iittnif.in")
    stakeholder_type = x_user_stakeholder_type or (matched_persona.stakeholder_type if matched_persona else ("STARTUP" if role == "applicant" else None))
    applicant_type = x_user_type or (matched_persona.applicant_type if matched_persona else ("Startup" if role == "applicant" else None))
    assigned_vertical = x_user_vertical or (matched_persona.assigned_vertical if matched_persona else ("TECH_DEV" if role == "pillar_lead" else None))

    return UserContext(
        id=matched_persona.id if matched_persona else f"usr_{role}_{hash(user_email) % 10000}",
        name=user_name,
        email=user_email,
        phone=matched_persona.phone if matched_persona else None,
        role=role,
        stakeholder_type=stakeholder_type,
        applicant_type=applicant_type,
        assigned_vertical=assigned_vertical,
        organization=matched_persona.organization if matched_persona else "VIKAS Platform",
        location=matched_persona.location if matched_persona else None
    )

def require_roles(allowed_roles: List[str]):
    """
    Dependency factory that restricts endpoint access to specified roles.
    Raises 403 Forbidden if user's role is not authorized.
    """
    def role_checker(user: UserContext = Depends(get_current_user)) -> UserContext:
        if user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access Denied: Role '{user.role}' is not authorized to perform this workflow action. Required roles: {allowed_roles}"
            )
        return user
    return role_checker
