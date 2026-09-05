import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  Sparkles, 
  BookOpen, 
  Target, 
  CheckCircle, 
  Users, 
  FileText, 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  Mail, 
  Globe, 
  Calendar, 
  Clock, 
  Compass, 
  ClipboardList, 
  Video, 
  Code, 
  Camera, 
  Upload, 
  MessageSquare, 
  Star, 
  AlertCircle, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Radio, 
  Zap, 
  Lock 
} from 'lucide-react';

export default function SpinLabDetailPage({ onBack }) {
  const [activeSection, setActiveSection] = useState('overview'); // 'overview' | 'structure' | 'deliverables' | 'evaluation' | 'contact'

  const sectionTabs = [
    { id: 'overview', label: 'Overview & Objectives', icon: Compass },
    { id: 'structure', label: 'Structure & To-Do', icon: ClipboardList },
    { id: 'deliverables', label: 'Reporting & Deliverables', icon: FileText },
    { id: 'evaluation', label: 'Evaluation & Certification', icon: Award },
    { id: 'contact', label: 'Contact & Resources', icon: Mail }
  ];

  const objectives = [
    {
      icon: Target,
      title: 'Practical Research Experience',
      desc: 'Encourage students, researchers, faculties, startups, and industries to undertake practical, research-driven projects in PNT technologies.',
      color: '#10b981'
    },
    {
      icon: Sparkles,
      title: 'Innovation & Design Thinking',
      desc: 'Build a culture of innovation, design thinking, and collaboration across participating institutions.',
      color: '#06b6d4'
    },
    {
      icon: Building2,
      title: 'Industry–Academia Linkages',
      desc: 'Strengthen industry–academia linkages through hands-on applied research and joint prototyping.',
      color: '#d97706'
    },
    {
      icon: Globe,
      title: 'National Geospatial Ecosystem',
      desc: 'Generate outputs beneficial to India\'s geospatial and PNT ecosystem under the NM-ICPS mandate.',
      color: '#8b5cf6'
    }
  ];

  const todoItems = [
    { category: 'Orientation', items: ['Conduct an orientation before the internship starts.'], icon: GraduationCap, color: '#10b981' },
    { category: 'Templates & Branding', items: ['Ensure interns follow IITTNiF templates and branding.', 'All outputs must carry: "SPIN Lab – Powered by Geo-Intel Lab, IITTNiF."', 'Use official templates and logos provided.', 'Testimonial videos and project posters must mention IITTNiF and Geo-Intel Lab.'], icon: ShieldCheck, color: '#06b6d4' },
    { category: 'Reporting', items: ['Submit consolidated reports and testimonials after completion.', 'Submit reports and testimonials within deadlines.'], icon: FileText, color: '#d97706' },
    { category: 'Mentorship', items: ['Mentors to guide interns technically and monitor progress.', 'Mentors to verify reports and deliverables.', 'Share feedback with the IITTNiF team during reviews.'], icon: Users, color: '#8b5cf6' },
    { category: 'Compliance', items: ['Respect confidentiality and institutional policies.'], icon: Lock, color: '#ec4899' }
  ];

  const internDeliverables = [
    { icon: ClipboardList, title: 'Weekly Progress Reports', desc: 'Structured weekly reports documenting tasks, outcomes, challenges, and next steps.', color: '#10b981' },
    { icon: FileText, title: 'Final Project Report', desc: 'Comprehensive project report in IITTNiF standard format (PDF).', color: '#06b6d4' },
    { icon: BookOpen, title: 'Presentation Slides', desc: 'Project presentation deck (maximum 10 slides).', color: '#d97706' },
    { icon: Video, title: 'Testimonial Video', desc: 'Short testimonial video (1–2 minutes) documenting experience.', color: '#8b5cf6' },
    { icon: Code, title: 'Data / Code Repository', desc: 'Project data and code repository (if applicable).', color: '#ec4899' }
  ];

  const institutionalDeliverables = [
    { icon: Users, title: 'Consolidated Intern List', desc: 'Complete list of interns with assigned mentors and project titles.' },
    { icon: ClipboardList, title: 'Summary of Projects', desc: 'Summary of all projects and technologies used across the cohort.' },
    { icon: Video, title: 'Testimonial Videos', desc: 'Collected testimonial videos from participating interns.' },
    { icon: Camera, title: 'Lab Photographs', desc: 'Lab photographs, group photos, and event documentation.' }
  ];

  const evaluationCriteria = [
    { metric: 'Quality & Originality of Work', weight: 'Primary', desc: 'Depth, innovation, and technical rigor of the research output.' },
    { metric: 'Regularity in Reporting', weight: 'Critical', desc: 'Consistent and timely submission of weekly progress reports.' },
    { metric: 'Mentor Feedback', weight: 'Significant', desc: 'Assessment and recommendation from the assigned faculty mentor.' },
    { metric: 'Presentation & Documentation', weight: 'Important', desc: 'Quality of final report, slides, and testimonial video.' },
    { metric: 'Adherence to Timelines', weight: 'Essential', desc: 'Compliance with all deadlines and institutional guidelines.' }
  ];

  const standardFormats = [
    { label: 'Testimonial Video Format', url: 'https://docs.google.com/document/d/1Nf945IdVAI1kXmBxfVILEgXT3iyftH7lKMNDjql7D0U/edit?usp=sharing', icon: Video },
    { label: 'Weekly Report Format', url: '#', icon: ClipboardList },
    { label: 'Final Report Format', url: '#', icon: FileText }
  ];

  return (
    <div className="techdev-detail-page spin-lab-detail-page animate-fade-in">
      {/* 1. Top Navigation Bar */}
      <div className="detail-top-nav">
        <button className="btn-back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to VIKAS</span>
        </button>
        <span className="top-nav-breadcrumb">
          VIKAS Platform / Platform Verticals / <strong>6.7 Institutions & Labs Network</strong> / SPIN Lab Internship
        </span>
      </div>

      {/* 2. Hero Section Card */}
      <div className="card spin-hero-card">
        <div className="hero-badge-row">
          <span className="badge badge-pink">Vertical 6.7 · Institutions & Labs Network</span>
          <span className="badge badge-gold">NM-ICPS National Initiative</span>
          <span className="badge badge-cyan">Powered by Geo-Intel Lab, IITTNiF</span>
        </div>

        <div className="hero-main-content">
          <div className="hero-icon-wrapper">
            <Radio size={36} className="text-pink" />
          </div>
          <div className="hero-text-content">
            <h1 className="hero-page-title">SPIN Lab Internship</h1>
            <h2 className="hero-subtitle">Rules & Guidelines</h2>
            <p className="hero-description">
              The SPIN Lab Internship, powered by Geo-Intel Lab at IITTNiF, provides students, researchers, faculties, startups, and industries with hands-on experience in Positioning, Navigation, and Timing (PNT) technologies. These labs are part of a national network fostering research, innovation, and capacity building under IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF).
            </p>
          </div>
        </div>

        <div className="hero-cta-row mt-20">
          <a 
            href="mailto:geo.intel@iittnif.com" 
            className="btn btn-primary-cta"
          >
            <Mail size={16} />
            <span>Contact SPIN Lab</span>
          </a>
          <a 
            href="https://geo.intel.iittnif.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline-cta"
          >
            <Globe size={16} />
            <span>Visit Geo-Intel Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* 3. Section Tabs */}
      <div className="card spin-tabs-card mt-20">
        <div className="spin-tabs-nav">
          {sectionTabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`spin-tab-btn ${activeSection === tab.id ? 'active' : ''}`}
                onClick={() => setActiveSection(tab.id)}
              >
                <TabIcon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Content Body */}
      <div className="spin-content-body mt-20">

        {/* OVERVIEW & OBJECTIVES */}
        {activeSection === 'overview' && (
          <div className="animate-fade-in">
            {/* Introduction */}
            <div className="card spin-section-card">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-pink-subtle">
                  <Layers size={20} className="text-pink" />
                </div>
                <div>
                  <h3 className="section-title-text">Introduction</h3>
                  <p className="section-subtitle-text">SPIN Lab — Powered by Geo-Intel Lab, IITTNiF</p>
                </div>
              </div>
              <p className="section-lead-paragraph mt-14">
                The SPIN Lab Internship, powered by Geo-Intel Lab at IITTNiF, provides students, researchers, faculties, startups, and industries with hands-on experience in Positioning, Navigation, and Timing (PNT) technologies. These labs are part of a national network fostering research, innovation, and capacity building under IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF).
              </p>
              <div className="intro-highlight-strip mt-16">
                <div className="highlight-chip">
                  <Radio size={14} className="text-pink" />
                  <span>PNT Technologies</span>
                </div>
                <div className="highlight-chip">
                  <Globe size={14} className="text-cyan" />
                  <span>National Lab Network</span>
                </div>
                <div className="highlight-chip">
                  <Sparkles size={14} className="text-emerald" />
                  <span>Research & Innovation</span>
                </div>
                <div className="highlight-chip">
                  <GraduationCap size={14} className="text-amber" />
                  <span>Capacity Building</span>
                </div>
              </div>
            </div>

            {/* Objectives Grid */}
            <div className="spin-objectives-grid mt-20">
              {objectives.map((obj, idx) => {
                const ObjIcon = obj.icon;
                return (
                  <div key={idx} className="card spin-objective-card">
                    <div className="objective-icon-wrap" style={{ background: `${obj.color}15`, borderColor: `${obj.color}40` }}>
                      <ObjIcon size={22} style={{ color: obj.color }} />
                    </div>
                    <h4 className="objective-title">{obj.title}</h4>
                    <p className="objective-desc">{obj.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Who Can Participate */}
            <div className="card spin-section-card mt-20">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-cyan-subtle">
                  <Users size={20} className="text-cyan" />
                </div>
                <div>
                  <h3 className="section-title-text">Who Can Participate?</h3>
                  <p className="section-subtitle-text">Eligibility categories for the SPIN Lab Internship</p>
                </div>
              </div>
              <div className="participant-categories-grid mt-16">
                {[
                  { label: 'Students', icon: GraduationCap, desc: 'B.Tech / M.Tech / PhD scholars' },
                  { label: 'Researchers', icon: Target, desc: 'Postdocs & research associates' },
                  { label: 'Faculty', icon: BookOpen, desc: 'Faculty from partner institutions' },
                  { label: 'Startups', icon: Zap, desc: 'Deep-tech & geospatial startups' },
                  { label: 'Industries', icon: Briefcase, desc: 'Corporate R&D & system integrators' }
                ].map((cat, idx) => {
                  const CatIcon = cat.icon;
                  return (
                    <div key={idx} className="participant-card">
                      <CatIcon size={20} className="text-pink" />
                      <div>
                        <strong>{cat.label}</strong>
                        <span>{cat.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STRUCTURE & TO-DO */}
        {activeSection === 'structure' && (
          <div className="animate-fade-in">
            {/* Structure for Interns */}
            <div className="card spin-section-card">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-emerald-subtle">
                  <ClipboardList size={20} className="text-emerald" />
                </div>
                <div>
                  <h3 className="section-title-text">Internship Structure</h3>
                  <p className="section-subtitle-text">How the SPIN Lab Internship is organized</p>
                </div>
              </div>
              <div className="structure-pipeline mt-16">
                {[
                  { step: '01', title: 'Project Assignment', desc: 'Each intern works on an approved project under a faculty mentor.', status: 'active' },
                  { step: '02', title: 'Weekly Progress Tracking', desc: 'Interns must maintain weekly progress and submit deliverables on time.', status: 'active' },
                  { step: '03', title: 'Mid-term & Final Reviews', desc: 'Reviews may be conducted mid-term and post-completion for quality assurance.', status: 'active' }
                ].map((item, idx) => (
                  <div key={idx} className="structure-step-card">
                    <div className="step-number-badge">{item.step}</div>
                    <div className="step-content">
                      <h4 className="step-title">{item.title}</h4>
                      <p className="step-desc">{item.desc}</p>
                    </div>
                    {idx < 2 && <div className="step-connector"><ChevronRight size={16} className="text-muted" /></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* To-Do Checklist */}
            <div className="card spin-section-card mt-20">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-amber-subtle">
                  <CheckCircle size={20} className="text-amber" />
                </div>
                <div>
                  <h3 className="section-title-text">To-Do & Guidelines</h3>
                  <p className="section-subtitle-text">Mandatory checklist for institutions, mentors, and interns</p>
                </div>
              </div>
              <div className="todo-categories-grid mt-16">
                {todoItems.map((cat, catIdx) => {
                  const CatIcon = cat.icon;
                  return (
                    <div key={catIdx} className="todo-category-card" style={{ borderLeftColor: cat.color }}>
                      <div className="todo-cat-header">
                        <div className="todo-cat-icon" style={{ background: `${cat.color}15`, color: cat.color }}>
                          <CatIcon size={16} />
                        </div>
                        <h4 className="todo-cat-title">{cat.category}</h4>
                      </div>
                      <ul className="todo-items-list">
                        {cat.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="todo-item-line">
                            <CheckCircle size={13} className="text-emerald" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* REPORTING & DELIVERABLES */}
        {activeSection === 'deliverables' && (
          <div className="animate-fade-in">
            {/* Intern Deliverables */}
            <div className="card spin-section-card">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-cyan-subtle">
                  <Upload size={20} className="text-cyan" />
                </div>
                <div>
                  <h3 className="section-title-text">Intern Deliverables</h3>
                  <p className="section-subtitle-text">Standard format will be shared · Every intern must submit</p>
                </div>
              </div>
              <div className="deliverables-grid mt-16">
                {internDeliverables.map((del, idx) => {
                  const DelIcon = del.icon;
                  return (
                    <div key={idx} className="deliverable-card">
                      <div className="del-icon-wrap" style={{ background: `${del.color}12`, borderColor: `${del.color}35` }}>
                        <DelIcon size={20} style={{ color: del.color }} />
                      </div>
                      <div className="del-content">
                        <h4 className="del-title">{del.title}</h4>
                        <p className="del-desc">{del.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Institutional Deliverables */}
            <div className="card spin-section-card mt-20">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-purple-subtle">
                  <Building2 size={20} className="text-purple" />
                </div>
                <div>
                  <h3 className="section-title-text">Institutional Deliverables</h3>
                  <p className="section-subtitle-text">Required submissions from participating institutions and labs</p>
                </div>
              </div>
              <div className="institutional-del-grid mt-16">
                {institutionalDeliverables.map((del, idx) => {
                  const DelIcon = del.icon;
                  return (
                    <div key={idx} className="inst-del-item">
                      <DelIcon size={16} className="text-purple" />
                      <div>
                        <strong>{del.title}</strong>
                        <p>{del.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Standard Formats */}
            <div className="card spin-section-card mt-20">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-amber-subtle">
                  <FileText size={20} className="text-amber" />
                </div>
                <div>
                  <h3 className="section-title-text">Standard Formats</h3>
                  <p className="section-subtitle-text">Official templates for all submissions</p>
                </div>
              </div>
              <div className="formats-grid mt-16">
                {standardFormats.map((fmt, idx) => {
                  const FmtIcon = fmt.icon;
                  return (
                    <a
                      key={idx}
                      href={fmt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="format-link-card"
                    >
                      <FmtIcon size={18} className="text-amber" />
                      <span>{fmt.label}</span>
                      <ExternalLink size={13} className="text-muted" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* EVALUATION & CERTIFICATION */}
        {activeSection === 'evaluation' && (
          <div className="animate-fade-in">
            <div className="card spin-section-card">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-emerald-subtle">
                  <Award size={20} className="text-emerald" />
                </div>
                <div>
                  <h3 className="section-title-text">Evaluation Criteria</h3>
                  <p className="section-subtitle-text">Assessment framework for SPIN Lab Internship participants</p>
                </div>
              </div>
              <div className="evaluation-table-wrap mt-16">
                <table className="eval-table">
                  <thead>
                    <tr>
                      <th>Criterion</th>
                      <th>Priority</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluationCriteria.map((crit, idx) => (
                      <tr key={idx}>
                        <td className="eval-metric-cell">
                          <Star size={14} className="text-amber" />
                          <strong>{crit.metric}</strong>
                        </td>
                        <td>
                          <span className={`eval-weight-badge weight-${crit.weight.toLowerCase()}`}>
                            {crit.weight}
                          </span>
                        </td>
                        <td className="eval-desc-cell">{crit.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Certification */}
            <div className="card spin-certification-card mt-20">
              <div className="cert-icon-wrap">
                <Award size={32} className="text-emerald" />
              </div>
              <div className="cert-content">
                <h3 className="cert-title">IITTNiF Official Certification</h3>
                <p className="cert-desc">
                  Certificates will be issued by IITTNiF after successful completion of the internship program. All participants who meet the evaluation criteria and submit required deliverables will receive an official certificate of completion.
                </p>
              </div>
              <div className="cert-badge-wrap">
                <ShieldCheck size={22} className="text-emerald" />
                <span>Certified by IITTNiF</span>
              </div>
            </div>

            {/* Acknowledgment */}
            <div className="card spin-acknowledgment-card mt-20">
              <div className="ack-header">
                <Lock size={18} className="text-cyan" />
                <h3>Acknowledgment & IP Policy</h3>
              </div>
              <p className="ack-text">
                By participating in this program, institutions and interns agree to follow the above rules and uphold the academic and ethical standards of IITTNiF. All prototypes and data remain property of the Geo-Intel Lab–IITTNiF ecosystem.
              </p>
            </div>
          </div>
        )}

        {/* CONTACT & RESOURCES */}
        {activeSection === 'contact' && (
          <div className="animate-fade-in">
            <div className="card spin-section-card">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-pink-subtle">
                  <Mail size={20} className="text-pink" />
                </div>
                <div>
                  <h3 className="section-title-text">Contact & Support</h3>
                  <p className="section-subtitle-text">Get in touch with the SPIN Lab team</p>
                </div>
              </div>
              <div className="contact-cards-grid mt-16">
                <div className="contact-card">
                  <div className="contact-icon-wrap">
                    <Mail size={24} className="text-pink" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Email</span>
                    <a href="mailto:geo.intel@iittnif.com" className="contact-value">geo.intel@iittnif.com</a>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon-wrap">
                    <Globe size={24} className="text-cyan" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Portal</span>
                    <a href="https://geo.intel.iittnif.com" target="_blank" rel="noopener noreferrer" className="contact-value">
                      geo.intel.iittnif.com
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon-wrap">
                    <Building2 size={24} className="text-emerald" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Institution</span>
                    <span className="contact-value-text">IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)</span>
                  </div>
                </div>
                <div className="contact-card">
                  <div className="contact-icon-wrap">
                    <Radio size={24} className="text-amber" />
                  </div>
                  <div className="contact-info">
                    <span className="contact-label">Lab</span>
                    <span className="contact-value-text">Geo-Intel Lab (SPIN Lab Network)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card spin-section-card mt-20">
              <div className="section-header-row">
                <div className="section-icon-wrap bg-amber-subtle">
                  <ExternalLink size={20} className="text-amber" />
                </div>
                <div>
                  <h3 className="section-title-text">Quick Links & Resources</h3>
                  <p className="section-subtitle-text">Download templates and access official documents</p>
                </div>
              </div>
              <div className="quick-links-grid mt-16">
                {standardFormats.map((fmt, idx) => {
                  const FmtIcon = fmt.icon;
                  return (
                    <a
                      key={idx}
                      href={fmt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quick-link-card"
                    >
                      <div className="ql-icon">
                        <FmtIcon size={20} className="text-amber" />
                      </div>
                      <div className="ql-content">
                        <strong>{fmt.label}</strong>
                        <span>Download official template</span>
                      </div>
                      <ExternalLink size={14} className="text-muted" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .spin-lab-detail-page {
          max-width: 1280px;
          margin: 0 auto;
          padding-bottom: 60px;
        }

        /* Hero Card */
        .spin-hero-card {
          padding: 32px 36px;
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(139, 92, 246, 0.04) 100%), var(--bg-surface);
          border: 1px solid rgba(236, 72, 153, 0.2);
          border-radius: var(--radius-lg);
        }

        .text-pink { color: #ec4899; }
        .badge-pink { background: rgba(236, 72, 153, 0.15); color: #ec4899; border: 1px solid rgba(236, 72, 153, 0.35); }
        .bg-pink-subtle { background: rgba(236, 72, 153, 0.12); }
        .bg-purple-subtle { background: rgba(139, 92, 246, 0.12); }
        .text-purple { color: #8b5cf6; }

        /* Tabs Card */
        .spin-tabs-card {
          padding: 8px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
        }

        .spin-tabs-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
        }

        .spin-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--transition-fast);
        }

        .spin-tab-btn:hover {
          color: var(--text-primary);
          background: var(--bg-primary);
        }

        .spin-tab-btn.active {
          color: #ec4899;
          background: rgba(236, 72, 153, 0.12);
        }

        /* Section Card */
        .spin-section-card {
          padding: 28px 32px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }

        .section-header-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .section-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-title-text {
          font-family: 'Outfit', sans-serif;
          font-size: 19px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .section-subtitle-text {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 2px 0 0 0;
        }

        .section-lead-paragraph {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-primary);
          max-width: 920px;
        }

        /* Intro Highlight Strip */
        .intro-highlight-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .highlight-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        /* Objectives Grid */
        .spin-objectives-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        @media (max-width: 780px) {
          .spin-objectives-grid {
            grid-template-columns: 1fr;
          }
        }

        .spin-objective-card {
          padding: 24px;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .spin-objective-card:hover {
          border-color: rgba(236, 72, 153, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .objective-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .objective-title {
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 6px 0;
        }

        .objective-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
        }

        /* Participant Categories */
        .participant-categories-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }

        @media (max-width: 900px) {
          .participant-categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 600px) {
          .participant-categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .participant-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 20px 14px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .participant-card:hover {
          border-color: rgba(236, 72, 153, 0.3);
          background: rgba(236, 72, 153, 0.05);
        }

        .participant-card strong {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .participant-card span {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        /* Structure Pipeline */
        .structure-pipeline {
          display: flex;
          align-items: stretch;
          gap: 0;
        }

        @media (max-width: 780px) {
          .structure-pipeline {
            flex-direction: column;
            gap: 16px;
          }
          .step-connector { display: none; }
        }

        .structure-step-card {
          flex: 1;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          position: relative;
        }

        .step-number-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.35);
        }

        .step-content {
          flex: 1;
        }

        .step-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .step-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
        }

        .step-connector {
          display: flex;
          align-items: center;
          padding: 0 6px;
        }

        /* To-Do Categories */
        .todo-categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 780px) {
          .todo-categories-grid {
            grid-template-columns: 1fr;
          }
        }

        .todo-category-card {
          padding: 20px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid var(--border-color);
          border-left: 3px solid;
          border-radius: var(--radius-md);
        }

        .todo-cat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .todo-cat-icon {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .todo-cat-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .todo-items-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .todo-item-line {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .todo-item-line svg {
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* Deliverables Grid */
        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 780px) {
          .deliverables-grid {
            grid-template-columns: 1fr;
          }
        }

        .deliverable-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .deliverable-card:hover {
          border-color: rgba(6, 182, 212, 0.3);
        }

        .del-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .del-content {
          flex: 1;
        }

        .del-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .del-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
        }

        /* Institutional Deliverables */
        .institutional-del-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .inst-del-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: var(--radius-md);
        }

        .inst-del-item svg {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .inst-del-item strong {
          display: block;
          font-size: 14px;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .inst-del-item p {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }

        /* Standard Formats */
        .formats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        @media (max-width: 780px) {
          .formats-grid {
            grid-template-columns: 1fr;
          }
        }

        .format-link-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          background: rgba(217, 119, 6, 0.08);
          border: 1px solid rgba(217, 119, 6, 0.25);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .format-link-card:hover {
          background: rgba(217, 119, 6, 0.15);
          border-color: #d97706;
          transform: translateY(-1px);
        }

        /* Evaluation Table */
        .evaluation-table-wrap {
          overflow-x: auto;
        }

        .eval-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .eval-table th {
          padding: 12px 18px;
          background: rgba(15, 23, 42, 0.7);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border-color);
        }

        .eval-table td {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-color);
          font-size: 13px;
          vertical-align: middle;
        }

        .eval-metric-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .eval-metric-cell strong {
          color: var(--text-primary);
        }

        .eval-weight-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
        }

        .weight-primary { background: rgba(16, 185, 129, 0.15); color: #10b981; }
        .weight-critical { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
        .weight-significant { background: rgba(139, 92, 246, 0.15); color: #8b5cf6; }
        .weight-important { background: rgba(6, 182, 212, 0.15); color: #06b6d4; }
        .weight-essential { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }

        .eval-desc-cell {
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Certification Card */
        .spin-certification-card {
          padding: 32px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%), var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 780px) {
          .spin-certification-card {
            flex-direction: column;
            text-align: center;
          }
        }

        .cert-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
        }

        .cert-content {
          flex: 1;
        }

        .cert-title {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 6px 0;
        }

        .cert-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.55;
          margin: 0;
        }

        .cert-badge-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-full);
          color: #10b981;
          font-weight: 700;
          font-size: 13px;
          white-space: nowrap;
        }

        /* Acknowledgment Card */
        .spin-acknowledgment-card {
          padding: 24px 28px;
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: var(--radius-md);
        }

        .ack-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .ack-header h3 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .ack-text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* Contact Cards */
        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 780px) {
          .contact-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .contact-card:hover {
          border-color: rgba(236, 72, 153, 0.3);
        }

        .contact-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: rgba(236, 72, 153, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .contact-label {
          font-size: 11px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }

        .contact-value {
          font-size: 14px;
          font-weight: 600;
          color: #ec4899;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: color var(--transition-fast);
        }

        .contact-value:hover {
          color: #f472b6;
        }

        .contact-value-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Quick Links */
        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        @media (max-width: 780px) {
          .quick-links-grid {
            grid-template-columns: 1fr;
          }
        }

        .quick-link-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          background: rgba(217, 119, 6, 0.06);
          border: 1px solid rgba(217, 119, 6, 0.2);
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .quick-link-card:hover {
          border-color: #d97706;
          background: rgba(217, 119, 6, 0.12);
          transform: translateY(-1px);
        }

        .ql-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: rgba(217, 119, 6, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ql-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .ql-content strong {
          font-size: 13px;
          color: var(--text-primary);
        }

        .ql-content span {
          font-size: 11px;
          color: var(--text-secondary);
        }

        .mt-14 { margin-top: 14px; }
        .mt-16 { margin-top: 16px; }
        .mt-20 { margin-top: 20px; }
      `}</style>
    </div>
  );
}
