export const PROPOSAL_FORM_SESSION_KEY = 'VIKAS_PROPOSAL_FORM_SESSION';

export function getBlankProposalForm(profile = {}) {
  return {
    name: profile.name || '',
    organization: profile.organization || '',
    email: profile.email || '',
    phone: profile.phone || '',
    location: profile.location || '',
    password: '',
    confirmPassword: '',
    stakeholderType: '',
    otherStakeholderType: '',
    domains: [],
    otherDomain: '',
    intentOfEngagement: '',
    otherIntent: '',
    techStage: 'TRL 3 - Proof of Concept',
    techDomain: '',
    techTargetTrl: 'TRL 6 - Field Prototype Demonstration',
    techLabRequirements: '',
    techMilestones: '',
    startupStage: 'Prototype',
    startupDomain: '',
    startupTeamSize: '1 - 5',
    startupPreviousWork: '',
    studentProgram: 'Chanakya Ph.D. Fellow',
    studentDepartment: '',
    studentResearchArea: '',
    skillTargetAudience: 'Engineering Students & Faculty',
    skillDomain: 'GIS & Spatial Analytics',
    skillTrainingFormat: 'Hands-on Bootcamp (3-5 Days)',
    skillCohortSize: '50 - 100 Participants',
    collabPartnerName: '',
    collabMode: 'Joint R&D Project',
    collabCoordinator: '',
    collabExpectedOutcome: '',
    schoolCurriculum: 'CBSE',
    schoolInterest: 'VidyaGIS & Spatial Intelligence Lab Setup',
    schoolStudentCount: '100 - 500 Students',
    institutionType: 'University',
    institutionInterest: ['SPIN Lab Setup', 'Faculty Upskilling'],
    industryDepartment: '',
    industryEngagementMode: 'Collaborative R&D / Tech Transfer',
    industryProblemStatementScope: '',
    expertAreaOfExpertise: '',
    expertExperience: '',
    expertAffiliation: '',
    expertWillingness: ['Mentor', 'Advisory Panel'],
    otherEntityCategory: '',
    otherFocusArea: '',
    otherEngagementDetails: '',
    problemStatement: '',
    agreeToTerms: false,
    acknowledgeNonIncubation: false
  };
}

export function loadProposalFormSession(userId) {
  if (!userId) return null;
  try {
    const raw = sessionStorage.getItem(PROPOSAL_FORM_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.userId !== userId || !parsed.formData) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}

export function saveProposalFormSession(userId, formData, submittedFileNumber = null) {
  if (!userId) return;
  try {
    const { password, confirmPassword, ...safeForm } = formData || {};
    sessionStorage.setItem(PROPOSAL_FORM_SESSION_KEY, JSON.stringify({
      userId,
      formData: safeForm,
      submittedFileNumber: submittedFileNumber || null
    }));
  } catch (e) {}
}

export function clearProposalFormSession() {
  try {
    sessionStorage.removeItem(PROPOSAL_FORM_SESSION_KEY);
  } catch (e) {}
}
