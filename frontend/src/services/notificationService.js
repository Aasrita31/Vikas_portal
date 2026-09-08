/**
 * VIKAS Notification Service
 * Handles in-app notification dispatching, persistence, event mapping,
 * and provides extensible integration hooks for future email dispatchers (SMTP/SES/SendGrid).
 */

export const NOTIFICATION_EVENTS = {
  APPLICATION_SUBMITTED: 'Application Submitted',
  SCREENING_COMPLETED: 'Screening Completed',
  CORRECTION_REQUESTED: 'Correction Requested',
  APPLICATION_ROUTED: 'Application Routed',
  APPROVAL_PENDING: 'Approval Pending',
  APPLICATION_APPROVED: 'Application Approved',
  APPLICATION_REJECTED: 'Application Rejected',
  ENGAGEMENT_ASSIGNED: 'Engagement Assigned',
  OUTCOME_STATUS_CHANGED: 'Outcome Status Updated'
};

/**
 * Extensible Email Dispatcher Hook
 * In-app simulated for now. Easily connect to an external email provider or API in the future.
 */
export const sendEmailNotification = async (recipientEmail, subject, textBody, eventType) => {
  // Simulated email dispatch log
  console.log(`[NotificationService:Email] Dispatching email to <${recipientEmail}>`);
  console.log(`[NotificationService:Email] Subject: ${subject}`);
  console.log(`[NotificationService:Email] Event: ${eventType}`);
  console.log(`[NotificationService:Email] Body: ${textBody}`);
  
  // Return standard response structure for future API integration
  return {
    success: true,
    provider: 'in-app-simulated',
    timestamp: new Date().toISOString(),
    recipient: recipientEmail,
    subject: subject
  };
};

/**
 * Generate standard applicant-safe notification message based on event
 */
export const generateNotificationMessage = (event, fileNumber, extra = {}) => {
  switch (event) {
    case NOTIFICATION_EVENTS.APPLICATION_SUBMITTED:
      return `Your VIKAS application ${fileNumber} has been successfully logged in the registry. Awaiting initial administrative screening.`;
      
    case NOTIFICATION_EVENTS.SCREENING_COMPLETED:
      return `Administrative screening for application ${fileNumber} is complete. Your documents and eligibility criteria have been verified.`;
      
    case NOTIFICATION_EVENTS.CORRECTION_REQUESTED:
      return `Additional information or clarification requested for application ${fileNumber}. Please review the request in your dashboard and submit updates.`;
      
    case NOTIFICATION_EVENTS.APPLICATION_ROUTED:
      return `Your application ${fileNumber} has been screened and successfully routed to ${extra.vertical || 'the designated vertical'} for domain review.`;
      
    case NOTIFICATION_EVENTS.APPROVAL_PENDING:
      return `Application ${fileNumber} is currently undergoing governance authorization under the authority matrix (${extra.authority === 'pd' ? 'Project Director' : 'Pillar Lead'}).`;
      
    case NOTIFICATION_EVENTS.APPLICATION_APPROVED:
      // Exact user requirement format:
      return `Your VIKAS application ${fileNumber} has been approved and onboarded to the VIKAS ecosystem.`;
      
    case NOTIFICATION_EVENTS.APPLICATION_REJECTED:
      return `Evaluation completed for application ${fileNumber}. The formal decision statement and next steps are available in your dashboard.`;
      
    case NOTIFICATION_EVENTS.ENGAGEMENT_ASSIGNED:
      return `Your entity project under application ${fileNumber} has been formally assigned to ${extra.vertical || 'Vertical 6.2'}. Project engagement is now active.`;
      
    case NOTIFICATION_EVENTS.OUTCOME_STATUS_CHANGED:
      return `Milestone progress updated for application ${fileNumber}. Technical outputs have been verified by the domain mentor.`;
      
    default:
      return extra.customMessage || `Update recorded for application ${fileNumber}.`;
  }
};

/**
 * Create a new Notification Object
 */
export const createNotification = ({
  event,
  fileNumber,
  recipientEmail = 'startup@vikas.in',
  recipientName = 'Stakeholder',
  extra = {},
  type = 'info'
}) => {
  const message = extra.customMessage || generateNotificationMessage(event, fileNumber, extra);
  const now = new Date();
  const timestamp = now.toLocaleString('en-GB');

  const notif = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    timestamp,
    date: now.toLocaleDateString('en-GB'),
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    fileNumber,
    event,
    title: event,
    message,
    recipientEmail,
    recipientName,
    read: false,
    type, // 'success' | 'warning' | 'info' | 'error'
    tab: 'tracking'
  };

  // Trigger future email hook
  sendEmailNotification(
    recipientEmail,
    `VIKAS Platform Notification: ${event} [${fileNumber}]`,
    message,
    event
  );

  return notif;
};

/**
 * Initial Seed Notifications Covering All 9 Workflow State Change Events
 */
export const SEED_NOTIFICATIONS = [
  {
    id: 101,
    timestamp: '24/08/2026, 17:30:00',
    date: '24/08/2026',
    time: '17:30',
    fileNumber: 'IITTNIF-2026-005',
    event: NOTIFICATION_EVENTS.APPLICATION_APPROVED,
    title: 'Application Approved & Onboarded',
    message: 'Your VIKAS application IITTNIF-2026-005 has been approved and onboarded to the VIKAS ecosystem.',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: false,
    type: 'success',
    tab: 'tracking'
  },
  {
    id: 102,
    timestamp: '25/08/2026, 10:15:00',
    date: '25/08/2026',
    time: '10:15',
    fileNumber: 'IITTNIF-2026-005',
    event: NOTIFICATION_EVENTS.ENGAGEMENT_ASSIGNED,
    title: 'Engagement / Project Assigned',
    message: 'Your entity project under application IITTNIF-2026-005 has been formally assigned to 6.2 Startups & Business Enablement. Project engagement is now active.',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: false,
    type: 'info',
    tab: 'tracking'
  },
  {
    id: 103,
    timestamp: '28/08/2026, 14:20:00',
    date: '28/08/2026',
    time: '14:20',
    fileNumber: 'IITTNIF-2026-005',
    event: NOTIFICATION_EVENTS.OUTCOME_STATUS_CHANGED,
    title: 'Outcome Milestone Verified',
    message: 'Milestone progress updated for application IITTNIF-2026-005: Prototype Benchmark Tested. Verified by domain mentor.',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: true,
    type: 'success',
    tab: 'tracking'
  },
  {
    id: 104,
    timestamp: '29/08/2026, 14:15:00',
    date: '29/08/2026',
    time: '14:15',
    fileNumber: 'IITTNIF-2026-002',
    event: NOTIFICATION_EVENTS.APPROVAL_PENDING,
    title: 'Pending Governance Approval',
    message: 'Application IITTNIF-2026-002 is currently undergoing governance authorization under the authority matrix (Pillar Lead).',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: false,
    type: 'warning',
    tab: 'tracking'
  },
  {
    id: 105,
    timestamp: '29/08/2026, 14:10:00',
    date: '29/08/2026',
    time: '14:10',
    fileNumber: 'IITTNIF-2026-002',
    event: NOTIFICATION_EVENTS.APPLICATION_ROUTED,
    title: 'Application Routed to Vertical',
    message: 'Your application IITTNIF-2026-002 has been screened and successfully routed to Startups & Business Enablement for domain review.',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: true,
    type: 'info',
    tab: 'tracking'
  },
  {
    id: 106,
    timestamp: '29/08/2026, 14:00:00',
    date: '29/08/2026',
    time: '14:00',
    fileNumber: 'IITTNIF-2026-002',
    event: NOTIFICATION_EVENTS.SCREENING_COMPLETED,
    title: 'Screening Completed',
    message: 'Administrative screening for application IITTNIF-2026-002 is complete. Your documents and eligibility criteria have been verified.',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: true,
    type: 'info',
    tab: 'tracking'
  },
  {
    id: 107,
    timestamp: '02/09/2026, 10:30:00',
    date: '02/09/2026',
    time: '10:30',
    fileNumber: 'IITTNIF-2026-001',
    event: NOTIFICATION_EVENTS.APPLICATION_SUBMITTED,
    title: 'Application Submitted',
    message: 'Your VIKAS application IITTNIF-2026-001 has been successfully logged in the registry. Awaiting initial administrative screening.',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: true,
    type: 'info',
    tab: 'tracking'
  },
  {
    id: 108,
    timestamp: '03/09/2026, 11:00:00',
    date: '03/09/2026',
    time: '11:00',
    fileNumber: 'IITTNIF-2026-001',
    event: NOTIFICATION_EVENTS.CORRECTION_REQUESTED,
    title: 'Correction / Information Requested',
    message: 'Additional information or clarification requested for application IITTNIF-2026-001. Please review the request in your dashboard and submit updates.',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: false,
    type: 'warning',
    tab: 'tracking'
  },
  {
    id: 109,
    timestamp: '08/08/2026, 15:00:00',
    date: '08/08/2026',
    time: '15:00',
    fileNumber: 'IITTNIF-2026-006',
    event: NOTIFICATION_EVENTS.APPLICATION_REJECTED,
    title: 'Application Evaluation Completed',
    message: 'Evaluation completed for application IITTNIF-2026-006. The formal decision statement and next steps are available in your dashboard.',
    recipientEmail: 'startup@vikas.in',
    recipientName: 'Vikram Sharma',
    read: true,
    type: 'error',
    tab: 'tracking'
  }
];
