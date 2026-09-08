import React, { createContext, useContext, useState, useEffect } from 'react';

// The 6 Roles supported by VIKAS
export const ROLES = {
  APPLICANT: 'applicant',
  OPERATIONS: 'operations',
  PILLAR_LEAD: 'pillar_lead',
  PROJECT_DIRECTOR: 'pd',
  EXECUTION: 'execution',
  ADMIN: 'admin'
};

// Comprehensive pre-configured personas covering all 6 roles and external stakeholder types
export const SYSTEM_PERSONAS = [
  // 1. APPLICANT / EXTERNAL USERS
  {
    id: 'usr_app_aasrita_reddy',
    aliasId: 'applicant_aasrita',
    name: 'Aasrita Reddy',
    email: 'aasritareddy.c@gmail.com',
    phone: '9493562799',
    organization: 'IITTNiF',
    location: 'Tirupati',
    stakeholderType: 'STARTUP',
    role: ROLES.APPLICANT,
    roleLabel: 'Applicant (Startup)',
    applicantType: 'Startup',
    avatarBadge: '🚀',
    description: 'Verified test applicant for VIKAS onboarding flow (STARTUP stakeholder).'
  },
  {
    id: 'applicant_startup',
    name: 'Rohan Varma',
    email: 'rohan.varma@skylinetech.io',
    phone: '+91 98765 43210',
    role: ROLES.APPLICANT,
    roleLabel: 'Applicant (Startup)',
    stakeholderType: 'STARTUP',
    applicantType: 'Startup',
    organization: 'SkyLine Drone Technologies Pvt Ltd',
    location: 'Hyderabad',
    avatarBadge: '🚀',
    description: 'Deep-Tech drone hardware startup with functional TRL 3 prototype.'
  },
  {
    id: 'applicant_researcher',
    name: 'Prof. S. Ananth',
    email: 's.ananth@iitt.ac.in',
    role: ROLES.APPLICANT,
    roleLabel: 'Applicant (Researcher / Faculty)',
    applicantType: 'Student / Researcher',
    organization: 'Department of Electrical Engineering, IIT Tirupati',
    avatarBadge: '🎓',
    description: 'Faculty PI proposing Dual-Frequency NavIC receiver TDP prototype.'
  },
  {
    id: 'applicant_school',
    name: 'Meera Sundaram',
    email: 'principal@vidyamandir.edu.in',
    role: ROLES.APPLICANT,
    roleLabel: 'Applicant (School)',
    applicantType: 'School',
    organization: 'Vidya Mandir Senior Secondary School',
    avatarBadge: '🏫',
    description: 'School principal seeking VidyaGIS and spatial lab outreach.'
  },
  {
    id: 'applicant_institution',
    name: 'Dr. B. N. Reddy',
    email: 'bn.reddy@svu.edu.in',
    role: ROLES.APPLICANT,
    roleLabel: 'Applicant (Institution / Lab)',
    applicantType: 'Institution',
    organization: 'Sri Venkateswara University College of Engineering',
    avatarBadge: '🏛️',
    description: 'University research center seeking joint SPIN Lab accreditation.'
  },
  {
    id: 'applicant_industry',
    name: 'Rajesh Mehta',
    email: 'r.mehta@bharatdyn.com',
    role: ROLES.APPLICANT,
    roleLabel: 'Applicant (Industry Partner)',
    applicantType: 'Industry',
    organization: 'Bharat Dynamics & Geospatial Systems',
    avatarBadge: '💼',
    description: 'Industry partner seeking commercial R&D and defense tech transfer.'
  },
  {
    id: 'applicant_govt',
    name: 'Suresh Babu',
    email: 'suresh.babu@ap.gov.in',
    role: ROLES.APPLICANT,
    roleLabel: 'Applicant (Government Agency)',
    applicantType: 'Government',
    organization: 'AP State Disaster Management Agency',
    avatarBadge: '🛡️',
    description: 'Government agency requesting real-time spatial analytics pilot.'
  },
  {
    id: 'applicant_expert',
    name: 'Dr. M. G. Rao',
    email: 'mg.rao@advisory.res.in',
    role: ROLES.APPLICANT,
    roleLabel: 'Applicant (Domain Expert)',
    applicantType: 'Expert',
    organization: 'Senior Metrology & GNSS Advisory Forum',
    avatarBadge: '🎖️',
    description: 'Senior scientist applying for advisory network and technical panels.'
  },

  // 2. OPERATIONS / SCREENING ROLE
  {
    id: 'operations',
    name: 'Vikram Malhotra',
    email: 'ops.screening@iittnif.in',
    role: ROLES.OPERATIONS,
    roleLabel: 'Operations / Screening Anchor',
    organization: 'IITTNiF Operations & Screening Cell',
    avatarBadge: '🔍',
    description: 'Screens incoming registrations, verifies documents, remarks and routes to verticals.'
  },

  // 3. PILLAR LEAD ROLE
  {
    id: 'pillar_lead_tech',
    name: 'Dr. K. Raghavan',
    email: 'k.raghavan@iittnif.in',
    role: ROLES.PILLAR_LEAD,
    roleLabel: 'Pillar Lead (Tech Development 6.1)',
    assignedVertical: 'TECH_DEV',
    organization: 'IITTNiF Technology Development Pillar',
    avatarBadge: '⚡',
    description: 'Evaluates TDP proposals, verifies milestones, deliverables and approves delegated cases.'
  },
  {
    id: 'pillar_lead_startup',
    name: 'Dr. P. Venkat',
    email: 'p.venkat@iittnif.in',
    role: ROLES.PILLAR_LEAD,
    roleLabel: 'Pillar Lead (Startups 6.2)',
    assignedVertical: 'STARTUP',
    organization: 'IITTNiF Startups & Business Enablement',
    avatarBadge: '🌱',
    description: 'Oversees startup onboarding, project allocations, and incubation-free commercial pilots.'
  },

  // 4. PROJECT DIRECTOR ROLE
  {
    id: 'pd',
    name: 'Dr. C. P. Sharma',
    email: 'director@iittnif.in',
    role: ROLES.PROJECT_DIRECTOR,
    roleLabel: 'Project Director (PD)',
    organization: 'Directorate, IIT Tirupati Navavishkar I-Hub Foundation',
    avatarBadge: '⭐',
    description: 'Apex authority: Approves strategic, high-value cases, e-signatures, and governance rules.'
  },

  // 5. EXECUTION / PROGRAM TEAM ROLE
  {
    id: 'execution',
    name: 'Anita Reddy',
    email: 'execution@iittnif.in',
    role: ROLES.EXECUTION,
    roleLabel: 'Execution / Program Team',
    organization: 'IITTNiF Program Execution & Allocation Cell',
    avatarBadge: '📊',
    description: 'Manages approved projects, monitors progress, records milestones and project outcomes.'
  },

  // 6. ADMIN ROLE
  {
    id: 'admin',
    name: 'System Administrator',
    email: 'admin@iittnif.in',
    role: ROLES.ADMIN,
    roleLabel: 'System Administrator',
    organization: 'IITTNiF Central Administration',
    avatarBadge: '⚙️',
    description: 'Manages users, permissions, configuration, audit trail and compliance verification.'
  }
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [selectedPersonaId, setSelectedPersonaId] = useState(() => {
    try {
      const saved = localStorage.getItem('VIKAS_AUTH_PERSONA');
      if (saved && SYSTEM_PERSONAS.some(p => p.id === saved)) {
        return saved;
      }
    } catch (e) {}
    return 'pd'; // Default to PD initially for comprehensive initial view, switchable anytime
  });

  const currentUser = SYSTEM_PERSONAS.find(p => p.id === selectedPersonaId) || SYSTEM_PERSONAS[0];
  const currentRole = currentUser.role;

  useEffect(() => {
    localStorage.setItem('VIKAS_AUTH_PERSONA', selectedPersonaId);
  }, [selectedPersonaId]);

  const switchPersona = (personaId) => {
    const found = SYSTEM_PERSONAS.find(p => p.id === personaId || p.aliasId === personaId);
    if (found) {
      setSelectedPersonaId(found.id);
    }
  };

  // Strict Role & Authority Matrix Permission Checkers
  const isApplicant = currentRole === ROLES.APPLICANT;
  const isOperations = currentRole === ROLES.OPERATIONS;
  const isPillarLead = currentRole === ROLES.PILLAR_LEAD;
  const isProjectDirector = currentRole === ROLES.PROJECT_DIRECTOR;
  const isExecution = currentRole === ROLES.EXECUTION;
  const isAdmin = currentRole === ROLES.ADMIN;

  // Screening & Routing actions are strictly restricted to Operations (and Admin)
  const canScreen = [ROLES.OPERATIONS, ROLES.ADMIN].includes(currentRole);
  const canRoute = [ROLES.OPERATIONS, ROLES.ADMIN].includes(currentRole);

  // Authority Matrix: Pillar-level approval restricted to relevant Pillar Lead; PD approval to Project Director
  const canApprovePillar = currentRole === ROLES.PILLAR_LEAD || currentRole === ROLES.ADMIN;
  const canApprovePd = currentRole === ROLES.PROJECT_DIRECTOR || currentRole === ROLES.ADMIN;
  const canEsign = currentRole === ROLES.PROJECT_DIRECTOR || currentRole === ROLES.ADMIN;
  const canApprove = canApprovePillar || canApprovePd;

  // Engagement & Execution actions restricted to authorized internal staff (never external applicants)
  const canAdvanceStage = [ROLES.OPERATIONS, ROLES.PILLAR_LEAD, ROLES.PROJECT_DIRECTOR, ROLES.ADMIN].includes(currentRole);
  const canMentorVerify = [ROLES.PILLAR_LEAD, ROLES.PROJECT_DIRECTOR, ROLES.EXECUTION, ROLES.ADMIN].includes(currentRole);
  const canManageEngagements = [ROLES.EXECUTION, ROLES.PILLAR_LEAD, ROLES.PROJECT_DIRECTOR, ROLES.ADMIN].includes(currentRole);

  /**
   * Evaluates whether the currently authenticated persona is authorized to approve
   * a specific application dossier under the VIKAS Authority Matrix.
   */
  const canApproveApplication = (app) => {
    if (!app || isApplicant) return { authorized: false, reason: 'External applicants cannot approve applications.' };

    // Conflict of interest check: An applicant/user can NEVER approve their own application
    const appEmail = app.email?.toLowerCase();
    const userEmail = currentUser.email?.toLowerCase();
    if (appEmail && userEmail && appEmail === userEmail) {
      return { authorized: false, reason: 'Conflict of Interest: You cannot authorize an application you submitted.' };
    }

    if (isAdmin) return { authorized: true };

    const isPdLevel = app.approvalAuthority === 'pd' || app.isStrategic;
    if (isPdLevel) {
      if (currentRole === ROLES.PROJECT_DIRECTOR) {
        return { authorized: true };
      }
      return { 
        authorized: false, 
        reason: 'Authority Matrix: Direct sign-off of the Project Director (PD) is required for strategic/high-value files.' 
      };
    }

    // Pillar-level delegated cases
    if (currentRole === ROLES.PILLAR_LEAD) {
      const userVertical = currentUser.assignedVertical;
      const appVertical = (app.assignedVertical || '').toLowerCase();
      
      // If pillar lead has specific vertical assignment, enforce vertical domain match
      if (userVertical) {
        const isTechMatch = userVertical === 'TECH_DEV' && (appVertical.includes('tech') || appVertical.includes('6.1'));
        const isStartupMatch = userVertical === 'STARTUP' && (appVertical.includes('startup') || appVertical.includes('6.2'));
        const isExactMatch = appVertical.includes(userVertical.toLowerCase());

        if (isTechMatch || isStartupMatch || isExactMatch) {
          return { authorized: true };
        }
        return { 
          authorized: false, 
          reason: `Pillar Authority: Delegated to the relevant Pillar Lead for ${app.assignedVertical || 'the assigned vertical'}.` 
        };
      }
      return { authorized: true };
    }

    if (currentRole === ROLES.PROJECT_DIRECTOR) {
      return { 
        authorized: false, 
        reason: `Delegated Authority: This file is assigned to the relevant Pillar Lead (${app.assignedVertical || 'Vertical Lead'}). Project Director intervention not required.` 
      };
    }

    return { authorized: false, reason: 'Requires authorization from the relevant Pillar Lead.' };
  };

  /**
   * Authenticated HTTP Fetch Wrapper:
   * Injects the active user identity and role into request headers for backend RBAC enforcement.
   */
  const authFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      'X-User-Id': currentUser.id,
      'X-User-Role': currentUser.role,
      'X-User-Email': currentUser.email,
      'X-User-Name': currentUser.name,
      'X-User-Type': currentUser.applicantType || '',
      'X-User-Stakeholder-Type': currentUser.stakeholderType || '',
      'X-User-Vertical': currentUser.assignedVertical || ''
    };
    return fetch(url, { ...options, headers });
  };

  const value = {
    currentUser,
    currentRole,
    selectedPersonaId,
    systemPersonas: SYSTEM_PERSONAS,
    switchPersona,
    isApplicant,
    isOperations,
    isPillarLead,
    isProjectDirector,
    isExecution,
    isAdmin,
    canScreen,
    canRoute,
    canApprove,
    canApprovePillar,
    canApprovePd,
    canEsign,
    canAdvanceStage,
    canMentorVerify,
    canManageEngagements,
    canApproveApplication,
    authFetch
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
