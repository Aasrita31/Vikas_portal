from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class TDPTeamMember(BaseModel):
    name: str
    role: str
    institution: Optional[str] = None
    email: Optional[str] = None

class TDPMilestone(BaseModel):
    title: str
    month: str
    targetOutput: str

class TDPDeliverable(BaseModel):
    code: str
    description: str
    timeline: str

class TDPDocumentUpload(BaseModel):
    documentType: str
    fileName: str
    fileSize: str
    fileData: Optional[str] = None

class TDPStageTimelineItem(BaseModel):
    stageId: int # 1 to 8
    stageName: str
    status: str # 'completed', 'in_progress', 'pending', 'on_hold', 'rejected'
    completedDate: Optional[str] = None
    actor: Optional[str] = None
    remarks: Optional[str] = None

class TDPAuditItem(BaseModel):
    timestamp: str
    action: str
    actor: str
    details: str

class TDPApplicationCreate(BaseModel):
    # STEP 1: Applicant Details
    applicantName: str
    organization: str
    department: str
    designation: str
    email: str
    mobile: str
    applicantType: str

    # STEP 2: Project Details
    projectTitle: str
    technologyDomain: str
    problemStatement: str
    background: str
    aim: str
    objectives: List[str]
    proposedSolution: str
    innovation: str
    currentTrl: int
    targetTrl: int
    expectedOutcomes: str

    # STEP 3: Technical Details
    methodology: str
    hardwareRequirements: str
    softwareRequirements: str
    datasetRequirements: str
    labTestbedRequirements: List[str]
    industryCollaborationRequirement: str

    # STEP 4: Project Plan
    startDate: str
    expectedDurationMonths: int
    milestones: List[TDPMilestone]
    deliverables: List[TDPDeliverable]
    teamMembers: List[TDPTeamMember]
    facultyMentorPI: str

    # STEP 5: Documents
    documents: List[TDPDocumentUpload] = []

    # STEP 6: Declaration
    declarationAccepted: bool
    authorizedSigner: str

class TDPApplicationResponse(TDPApplicationCreate):
    applicationNumber: str
    status: str # One of: Draft, Submitted, Under Screening, Technical Review, Mentor Review, Approved, Rejected, On Hold, In Progress, Completed
    currentStage: str # One of the 8 stages
    submittedDate: str
    lastUpdated: str
    submissionTimestamp: str
    trackingToken: str
    stageTimeline: List[TDPStageTimelineItem] = []
    auditHistory: List[TDPAuditItem] = []
    reviewerRemarks: Optional[str] = None
    budgetApproved: Optional[str] = None
    leadReviewer: Optional[str] = None

class TDPStatusUpdatePayload(BaseModel):
    status: str
    currentStage: Optional[str] = None
    reviewerRemarks: Optional[str] = None
    actor: Optional[str] = "IITTNiF Technical Advisory Committee"

# ==========================================
# TDP Project Execution & Deliverables Schemas
# ==========================================

class TDPExecutionMilestone(BaseModel):
    id: str # e.g. "M1", "M2", ...
    milestone: str
    description: str
    dueDate: str
    status: str # 'Draft' | 'Submitted' | 'Verified' | 'Needs Revision'
    evidence: Optional[str] = None
    evidenceFileName: Optional[str] = None
    evidenceUrl: Optional[str] = None
    submissionDate: Optional[str] = None
    mentorReview: Optional[str] = None
    mentorVerifiedBy: Optional[str] = None
    mentorVerificationDate: Optional[str] = None

class TDPWeeklyProgressAttachment(BaseModel):
    fileName: str
    fileSize: str
    fileUrl: Optional[str] = None
    fileType: Optional[str] = "application/pdf"

class TDPWeeklyProgress(BaseModel):
    id: str # e.g. "WP-W1", "WP-W2"
    weekNumber: int
    tasksUndertaken: str
    toolsDatasetsMethodsUsed: str
    status: str # 'Draft' | 'Submitted' | 'Verified' | 'Needs Revision'
    resultsOutputs: str
    challenges: str
    solutions: str
    supportNeeded: str
    planForNextWeek: str
    learningSummary: str
    attachments: List[TDPWeeklyProgressAttachment] = []
    submissionDate: Optional[str] = None
    submittedBy: Optional[str] = None
    mentorReview: Optional[str] = None
    mentorVerifiedBy: Optional[str] = None
    mentorVerificationDate: Optional[str] = None

class TDPTechnicalDeliverable(BaseModel):
    id: str # e.g. "D1", "D2", ...
    deliverableCode: str
    title: str
    description: str
    targetTimeline: str
    status: str # 'Draft' | 'Submitted' | 'Verified' | 'Needs Revision'
    deliverableType: str # "Hardware Prototype", "Firmware Source Code", "Dataset & Benchmark", "Test Qualification Dossier"
    evidence: Optional[str] = None
    evidenceFileName: Optional[str] = None
    evidenceUrl: Optional[str] = None
    submissionDate: Optional[str] = None
    mentorReview: Optional[str] = None
    mentorVerifiedBy: Optional[str] = None
    mentorVerificationDate: Optional[str] = None

class TDPFinalReportAsset(BaseModel):
    title: str
    fileName: Optional[str] = None
    fileSize: Optional[str] = None
    uploadDate: Optional[str] = None
    status: str = "Draft" # 'Draft' | 'Submitted' | 'Verified' | 'Needs Revision'
    mentorReview: Optional[str] = None
    summary: Optional[str] = None

class TDPPresentationAsset(BaseModel):
    title: str
    fileName: Optional[str] = None
    fileSize: Optional[str] = None
    uploadDate: Optional[str] = None
    status: str = "Draft" # 'Draft' | 'Submitted' | 'Verified' | 'Needs Revision'
    mentorReview: Optional[str] = None
    slideCount: Optional[int] = 0

class TDPVideoAsset(BaseModel):
    title: str
    videoUrl: Optional[str] = None
    videoDuration: Optional[str] = None
    uploadDate: Optional[str] = None
    status: str = "Draft" # 'Draft' | 'Submitted' | 'Verified' | 'Needs Revision'
    mentorReview: Optional[str] = None
    embedPlatform: Optional[str] = "YouTube / Vimeo"

class TDPCodeRepositoryAsset(BaseModel):
    repoUrl: Optional[str] = None
    branch: Optional[str] = "main"
    accessNotes: Optional[str] = None
    datasetRepoUrl: Optional[str] = None
    status: str = "Draft" # 'Draft' | 'Submitted' | 'Verified' | 'Needs Revision'
    mentorReview: Optional[str] = None
    license: Optional[str] = "MIT / Apache 2.0"

class TDPFinalAssets(BaseModel):
    finalReport: Optional[TDPFinalReportAsset] = None
    presentation: Optional[TDPPresentationAsset] = None
    projectVideo: Optional[TDPVideoAsset] = None
    codeRepository: Optional[TDPCodeRepositoryAsset] = None

class TDPProjectExecutionData(BaseModel):
    applicationNumber: str
    projectTitle: str
    technologyDomain: str
    applicantName: str
    organization: str
    assignedMentor: str
    currentTrl: int
    targetTrl: int
    overallProgressPercent: int = 0
    milestones: List[TDPExecutionMilestone] = []
    weeklyProgressLogs: List[TDPWeeklyProgress] = []
    technicalDeliverables: List[TDPTechnicalDeliverable] = []
    finalAssets: TDPFinalAssets = TDPFinalAssets()
    lastUpdated: str

class TDPMentorVerifyPayload(BaseModel):
    itemType: str # "milestone" | "weekly_progress" | "deliverable" | "final_asset"
    itemId: str # e.g. "M1", "WP-W1", "D1", "final_report", "presentation", "video", "code_repo"
    status: str # "Verified" | "Needs Revision"
    mentorReview: str
    mentorName: Optional[str] = "Dr. K. Raghavan (TDP Lead & Domain Mentor)"


