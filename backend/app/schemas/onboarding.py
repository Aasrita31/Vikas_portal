from pydantic import BaseModel, Field, model_validator
from typing import Optional, List, Dict, Any

class ApplicantResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    organization: Optional[str] = None
    location: Optional[str] = None
    stakeholder_type: str
    stakeholderType: Optional[str] = None
    role: str
    is_active: bool = True
    is_verified: bool = True
    created_at: str
    updated_at: str

    @model_validator(mode="before")
    @classmethod
    def set_compatibility_fields(cls, values: Any) -> Any:
        if isinstance(values, dict):
            st = values.get("stakeholder_type") or values.get("stakeholderType")
            if st:
                values["stakeholder_type"] = st
                values["stakeholderType"] = st
        return values

class OnboardingApplicationCreate(BaseModel):
    name: Optional[str] = None
    applicantName: Optional[str] = None
    applicant_name: Optional[str] = None
    organization: str
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    stakeholderType: Optional[str] = "STARTUP"
    stakeholder_type: Optional[str] = None
    domains: List[str] = []
    intentOfEngagement: Optional[str] = None
    intent_of_engagement: Optional[str] = None
    dynamicInputs: Optional[Dict[str, Any]] = None
    dynamic_inputs: Optional[Dict[str, Any]] = None
    problemStatement: Optional[str] = None
    problem_statement: Optional[str] = None
    documentName: Optional[str] = None
    documentSize: Optional[str] = None
    documentUrl: Optional[str] = None

class OnboardingApplicationResponse(BaseModel):
    id: str
    file_number: str
    fileNumber: str
    user_id: str
    userId: str
    applicant_name: str
    applicantName: str
    email: str
    phone: Optional[str] = None
    organization: str
    location: Optional[str] = None
    stakeholder_type: str
    stakeholderType: str
    domains: List[str] = []
    intent_of_engagement: Optional[str] = None
    intentOfEngagement: Optional[str] = None
    dynamic_inputs: Optional[Dict[str, Any]] = Field(default_factory=dict)
    dynamicInputs: Optional[Dict[str, Any]] = Field(default_factory=dict)
    problem_statement: Optional[str] = None
    problemStatement: Optional[str] = None
    status: str
    approval_authority: Optional[str] = "pillar_lead"
    approvalAuthority: Optional[str] = "pillar_lead"
    assigned_vertical: Optional[str] = None
    assignedVertical: Optional[str] = None
    submission_date: str
    submissionDate: str
    last_updated: str
    lastUpdated: str
    is_strategic: bool = False
    isStrategic: bool = False
    history: List[Dict[str, Any]] = []

    @model_validator(mode="before")
    @classmethod
    def populate_dual_casing(cls, values: Any) -> Any:
        if hasattr(values, "__dict__"):
            data = dict(values.__dict__)
        elif isinstance(values, dict):
            data = dict(values)
        else:
            return values

        fn = data.get("file_number") or data.get("fileNumber", "")
        uid = data.get("user_id") or data.get("userId", "")
        an = data.get("applicant_name") or data.get("applicantName") or data.get("name", "")
        st = data.get("stakeholder_type") or data.get("stakeholderType", "STARTUP")
        ioe = data.get("intent_of_engagement") or data.get("intentOfEngagement")
        di = data.get("dynamic_inputs") or data.get("dynamicInputs") or {}
        ps = data.get("problem_statement") or data.get("problemStatement")
        aa = data.get("approval_authority") or data.get("approvalAuthority") or "pillar_lead"
        av = data.get("assigned_vertical") or data.get("assignedVertical")
        sd = data.get("submission_date") or data.get("submissionDate", "")
        lu = data.get("last_updated") or data.get("lastUpdated", "")
        strat = data.get("is_strategic") if "is_strategic" in data else data.get("isStrategic", False)

        data["file_number"] = fn
        data["fileNumber"] = fn
        data["user_id"] = uid
        data["userId"] = uid
        data["applicant_name"] = an
        data["applicantName"] = an
        data["stakeholder_type"] = st
        data["stakeholderType"] = st
        data["intent_of_engagement"] = ioe
        data["intentOfEngagement"] = ioe
        data["dynamic_inputs"] = di
        data["dynamicInputs"] = di
        data["problem_statement"] = ps
        data["problemStatement"] = ps
        data["approval_authority"] = aa
        data["approvalAuthority"] = aa
        data["assigned_vertical"] = av
        data["assignedVertical"] = av
        data["submission_date"] = sd
        data["submissionDate"] = sd
        data["last_updated"] = lu
        data["lastUpdated"] = lu
        data["is_strategic"] = strat
        data["isStrategic"] = strat

        return data
