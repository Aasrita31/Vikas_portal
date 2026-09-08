import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// The 6 Roles supported by VIKAS Platform
export const ROLES = {
  APPLICANT: 'applicant',
  OPERATIONS: 'operations',
  PILLAR_LEAD: 'pillar_lead',
  PROJECT_DIRECTOR: 'pd',
  EXECUTION: 'execution',
  ADMIN: 'admin'
};

// Staff demo credentials for login page quick-access (kept for evaluation, but NOT shown in normal user header)
export const EVALUATION_STAFF_ACCOUNTS = [
  {
    role: ROLES.OPERATIONS,
    roleLabel: 'Operations / Screening Officer',
    email: 'ops@iittnif.in',
    password: 'admin123',
    badge: '🔍',
    description: 'Screens incoming registrations, verifies documents, remarks and routes to verticals.'
  },
  {
    role: ROLES.PILLAR_LEAD,
    roleLabel: 'Pillar Lead (Startups 6.2)',
    email: 'pillar_startup@iittnif.in',
    password: 'admin123',
    badge: '🌱',
    description: 'Evaluates startup applications, approves delegated files, and initiates onboarding.'
  },
  {
    role: ROLES.PILLAR_LEAD,
    roleLabel: 'Pillar Lead (Tech Dev 6.1)',
    email: 'pillar_tech@iittnif.in',
    password: 'admin123',
    badge: '⚡',
    description: 'Evaluates technology development proposals, verifies milestones and TRL.'
  },
  {
    role: ROLES.PROJECT_DIRECTOR,
    roleLabel: 'Project Director (Apex Authority)',
    email: 'director@iittnif.in',
    password: 'admin123',
    badge: '⭐',
    description: 'Apex authority: Approves strategic files, e-signs onboarding letters, and governance.'
  },
  {
    role: ROLES.EXECUTION,
    roleLabel: 'Program Execution Cell',
    email: 'execution@iittnif.in',
    password: 'admin123',
    badge: '📊',
    description: 'Monitors ongoing projects, records engagement progress and track outcomes.'
  },
  {
    role: ROLES.ADMIN,
    roleLabel: 'System Administrator',
    email: 'admin@iittnif.in',
    password: 'admin123',
    badge: '⚙️',
    description: 'Manages platform configuration, user registry, and compliance audit trail.'
  }
];

const AuthContext = createContext(null);

const SESSION_STORAGE_KEY = 'VIKAS_AUTH_SESSION';

export function AuthProvider({ children }) {
  // Session State: { user, token }
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.token && parsed?.user) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved auth session:', e);
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const currentUser = session?.user || null;
  const token = session?.token || null;
  const isAuthenticated = Boolean(currentUser && token);

  // Normalize role
  const rawRole = currentUser?.role?.toLowerCase() || ROLES.APPLICANT;
  const currentRole = rawRole === 'pd' ? ROLES.PROJECT_DIRECTOR : rawRole;

  // Persist session to localStorage
  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to persist auth session:', e);
    }
  }, [session]);

  // Real Login Method
  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed. Please check your credentials.');
      }

      const newSession = {
        token: data.token,
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          organization: data.user.organization,
          location: data.user.location,
          role: data.user.role.toLowerCase(),
          stakeholderType: data.user.stakeholder_type || data.user.stakeholderType || 'STARTUP',
          applicantType: data.user.applicant_type || data.user.applicantType || 'Startup',
          assignedVertical: data.application?.assignedVertical || data.application?.assigned_vertical || null
        }
      };

      setSession(newSession);
      return { success: true, user: newSession.user, application: data.application, applications: data.applications };
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Real Registration Method
  const register = async (registrationData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed. Please check your inputs.');
      }

      const newSession = {
        token: data.token,
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          organization: data.user.organization,
          location: data.user.location,
          role: data.user.role.toLowerCase(),
          stakeholderType: data.user.stakeholder_type || data.user.stakeholderType || 'STARTUP',
          applicantType: data.user.applicant_type || data.user.applicantType || 'Startup',
          assignedVertical: data.application?.assignedVertical || data.application?.assigned_vertical || null
        }
      };

      setSession(newSession);
      return { success: true, user: newSession.user, application: data.application, applications: data.applications };
    } catch (err) {
      setAuthError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout Method
  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

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
   * Evaluates whether the currently authenticated user is authorized to approve
   * a specific application dossier under the VIKAS Authority Matrix.
   */
  const canApproveApplication = (app) => {
    if (!app || isApplicant) return { authorized: false, reason: 'External applicants cannot approve applications.' };

    // Conflict of interest check: An applicant/user can NEVER approve their own application
    const appEmail = app.email?.toLowerCase();
    const userEmail = currentUser?.email?.toLowerCase();
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
      const userVertical = currentUser?.assignedVertical;
      const appVertical = (app.assignedVertical || '').toLowerCase();
      
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
   * Injects the active session token and user identity headers into request headers.
   */
  const authFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(currentUser?.id ? { 'X-User-Id': currentUser.id } : {}),
      'X-User-Role': currentRole,
      ...(currentUser?.email ? { 'X-User-Email': currentUser.email } : {}),
      ...(currentUser?.name ? { 'X-User-Name': currentUser.name } : {}),
      ...(currentUser?.stakeholderType ? { 'X-User-Stakeholder-Type': currentUser.stakeholderType } : {})
    };
    return fetch(url, { ...options, headers });
  };

  const value = {
    session,
    currentUser,
    currentRole,
    token,
    isAuthenticated,
    loading,
    authError,
    login,
    register,
    logout,
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
