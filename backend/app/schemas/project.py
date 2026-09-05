from pydantic import BaseModel
from typing import Optional, List, Dict

class ImportantDates(BaseModel):
    cfpLaunch: Optional[str] = None
    queryDeadline: Optional[str] = None
    submissionDeadline: str
    evaluationDate: Optional[str] = None
    commencementDate: Optional[str] = None

class SupportingDocument(BaseModel):
    name: str
    format: str
    size: str
    downloadUrl: str

class TDPProjectBase(BaseModel):
    id: str
    title: str
    status: str
    technologyDomain: str
    problemStatement: str
    projectObjectives: List[str] = []
    technicalScope: str
    expectedOutput: str
    trlStart: int
    targetTrl: int
    eligibleApplicantTypes: List[str] = []
    requiredExpertise: List[str] = []
    expectedDeliverables: List[str] = []
    importantDates: ImportantDates
    supportingDocuments: List[SupportingDocument] = []
    budgetCap: Optional[str] = None
    durationMonths: Optional[int] = None
    leadMentor: Optional[str] = None
    milestones: Optional[List[str]] = []

class TDPProjectResponse(TDPProjectBase):
    pass
