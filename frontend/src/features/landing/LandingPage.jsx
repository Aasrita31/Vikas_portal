import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  ShieldCheck, 
  Target, 
  Compass, 
  Layers, 
  Rocket, 
  Cpu, 
  Building2, 
  GraduationCap, 
  School, 
  Users, 
  CheckCircle2, 
  Network, 
  LogIn, 
  FileText, 
  Award,
  Zap,
  Globe,
  Radio,
  MapPin,
  Workflow,
  HelpCircle,
  ExternalLink,
  LayoutDashboard,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import nmicpsLogo from '../../assets/NM-ICPS.jpg';
import iittnifLogo from '../../assets/IITTNiF logo.jpg';
import './LandingPage.css';

export default function LandingPage({ 
  onNavigateToRegister, 
  onNavigateToLogin, 
  onNavigateToEntry, 
  onNavigateToOverview, 
  onNavigateToAdmin 
}) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('VIKAS_LANDING_THEME') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('VIKAS_LANDING_THEME', newTheme);
    } catch (e) {}
  };

  return (
    <div className={`vikas-landing-root ${theme === 'bright' ? 'theme-bright' : 'theme-dark'}`}>
      {/* Background Ambience & Lighting Effect */}
      <div className="landing-bg-decor">
        <div className="landing-grid-lines" />
        <div className="landing-glow-orb orb-gold" />
        <div className="landing-glow-orb orb-cyan" />
        <div className="landing-glow-orb orb-indigo" />
      </div>

      {/* Top Header Logo Bar: Top-Left NM-ICPS Logo, Center Bright/Dark Theme Toggle, Top-Right IITTNiF Logo */}
      <div className="landing-top-logos-bar">
        <div className="landing-logo-box-left" title="National Mission on Interdisciplinary Cyber-Physical Systems (DST NM-ICPS)">
          <img src={nmicpsLogo} alt="DST NM-ICPS National Mission" className="landing-inst-logo" />
        </div>

        {/* Center Control: Bright & Dark Theme Toggle Switch */}
        <div className="landing-top-center-controls">
          <div className="landing-theme-toggle-switch" role="group" aria-label="Theme Mode Switcher">
            <button 
              type="button" 
              className={`theme-mode-btn ${theme === 'bright' ? 'active' : ''}`}
              onClick={() => handleThemeChange('bright')}
              title="Switch to Bright / Light Theme"
              id="theme-btn-bright"
            >
              <Sun size={15} />
              <span>Bright</span>
            </button>
            <button 
              type="button" 
              className={`theme-mode-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
              title="Switch to Dark Theme"
              id="theme-btn-dark"
            >
              <Moon size={15} />
              <span>Dark</span>
            </button>
          </div>
        </div>

        <div className="landing-logo-box-right" title="IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)">
          <img src={iittnifLogo} alt="IIT Tirupati Navavishkar I-Hub Foundation" className="landing-inst-logo" />
        </div>
      </div>

      <div className="landing-container">
        {/* ==============================================================
            HERO SECTION
            ============================================================== */}
        <section className="landing-hero">
          {/* Main Title & Subtitle */}
          <h1 className="hero-main-title">
            <span className="title-glow-gold">VIKAS</span> PLATFORM
          </h1>

          <h2 className="hero-institution-subtitle">
            Flagship Platform of <span className="hero-institution-highlight">TIH / IITTNiF</span>
          </h2>

          <p className="hero-tagline-lead">
            The central single-window gateway designed for onboarding, engagement, and outcome-driven participation across all Technology Innovation Hub activities in Cyber-Physical Systems and Geospatial domains.
          </p>



          {/* Quick Metrics Bar */}
          <div className="hero-metrics-bar">
            <div className="metric-stat-item">
              <span className="metric-number-highlight">DST</span>
              <span className="metric-label-text">Dept. of Science & Technology</span>
            </div>
            <div className="metric-stat-item">
              <span className="metric-number-highlight">9</span>
              <span className="metric-label-text">Strategic Verticals</span>
            </div>
            <div className="metric-stat-item">
              <span className="metric-number-highlight">NM-ICPS</span>
              <span className="metric-label-text">National Alignment</span>
            </div>
            <div className="metric-stat-item">
              <span className="metric-number-highlight">100%</span>
              <span className="metric-label-text">Outcome-Driven Platform</span>
            </div>
          </div>

          {/* Centered Register & Submit Proposal Action Button */}
          <div className="hero-register-action-wrapper">
            <button 
              type="button" 
              className="btn-landing-primary"
              onClick={onNavigateToRegister || onNavigateToEntry}
              id="hero-btn-register"
            >
              <Rocket size={18} />
              <span>Register & Submit Proposal</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* ==============================================================
            SECTION 1: INTRODUCTION & ABOUT VIKAS
            ============================================================== */}
        <section className="landing-section" id="section-introduction">
          <div className="landing-section-header">
            <div className="section-eyebrow-pill">
              <Sparkles size={13} />
              <span>1. Introduction</span>
            </div>
            <h2 className="section-main-heading">
              Unified Single-Window Gateway for Innovation
            </h2>
            <p className="section-subtext-muted">
              Connecting national research capabilities with industry and startup execution.
            </p>
          </div>

          <div className="intro-grid-container">
            {/* Left Narrative Box */}
            <div className="intro-narrative-card">
              <h3 className="intro-heading-sm">About VIKAS</h3>
              <p className="intro-text-paragraph">
                <strong>VIKAS</strong> is the flagship single-window platform of <strong>IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)</strong>, designed to serve as the central gateway for onboarding, engagement, and participation across all Technology Innovation Hub (TIH) activities.
              </p>
              <p className="intro-text-paragraph">
                The platform integrates schools, institutions, startups, industry, government bodies, and experts into a unified ecosystem that supports technology development, innovation, skill development, and business enablement aligned with national priorities under NM-ICPS.
              </p>

              {/* Distinct Distinction Banner */}
              <div className="intro-distinction-banner">
                <div className="distinction-icon-wrap">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="distinction-text-bold">Structured Execution, Not Just Incubation</h4>
                  <p className="distinction-text-desc">
                    VIKAS is not an incubation program. It is a structured engagement and execution platform that facilitates participation, collaboration, and measurable outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Highlights Column */}
            <div className="intro-side-highlights">
              <div className="highlight-feature-card">
                <div className="feature-icon-box icon-amber">
                  <Zap size={22} />
                </div>
                <div>
                  <h4 className="feature-title">End-to-End Governance</h4>
                  <p className="feature-desc">
                    Rigorous operational screening and authority matrix authorization for all proposals.
                  </p>
                </div>
              </div>

              <div className="highlight-feature-card">
                <div className="feature-icon-box icon-cyan">
                  <Cpu size={22} />
                </div>
                <div>
                  <h4 className="feature-title">Deep-Tech CPS & Geospatial</h4>
                  <p className="feature-desc">
                    Specialized testbeds for NavIC / PNT, GeoAI, IoT sensor fusion, and spatial intelligence.
                  </p>
                </div>
              </div>

              <div className="highlight-feature-card">
                <div className="feature-icon-box icon-emerald">
                  <Award size={22} />
                </div>
                <div>
                  <h4 className="feature-title">National Impact</h4>
                  <p className="feature-desc">
                    Direct integration with DST, ISRO, NRSC, academia, and industry leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Integrated Stakeholders Grid */}
          <div>
            <h3 className="stakeholders-integration-title">
              Integrating 6 Pillars of the National Ecosystem
            </h3>
            <div className="stakeholders-showcase-grid">
              <div className="stakeholder-card-pill">
                <div className="stakeholder-avatar-icon">
                  <Building2 size={20} />
                </div>
                <span className="stakeholder-name-text">Startups</span>
                <span className="stakeholder-role-text">Incubation & TDP Grant</span>
              </div>

              <div className="stakeholder-card-pill">
                <div className="stakeholder-avatar-icon">
                  <School size={20} />
                </div>
                <span className="stakeholder-name-text">Schools</span>
                <span className="stakeholder-role-text">VidyaGIS Spatial Lab</span>
              </div>

              <div className="stakeholder-card-pill">
                <div className="stakeholder-avatar-icon">
                  <GraduationCap size={20} />
                </div>
                <span className="stakeholder-name-text">Institutions</span>
                <span className="stakeholder-role-text">SPIN Labs & Research</span>
              </div>

              <div className="stakeholder-card-pill">
                <div className="stakeholder-avatar-icon">
                  <Network size={20} />
                </div>
                <span className="stakeholder-name-text">Industry</span>
                <span className="stakeholder-role-text">Joint R&D & Tech Transfer</span>
              </div>

              <div className="stakeholder-card-pill">
                <div className="stakeholder-avatar-icon">
                  <ShieldCheck size={20} />
                </div>
                <span className="stakeholder-name-text">Government</span>
                <span className="stakeholder-role-text">Strategic Deployments</span>
              </div>

              <div className="stakeholder-card-pill">
                <div className="stakeholder-avatar-icon">
                  <Users size={20} />
                </div>
                <span className="stakeholder-name-text">Experts</span>
                <span className="stakeholder-role-text">Mentors & Review Panel</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 2 & 3: VISION & MISSION
            ============================================================== */}
        <section className="landing-section" id="section-vision-mission">
          {/* VISION HERO CARD */}
          <div className="vision-hero-card">
            <div className="vision-card-halo" />
            <div className="vision-header-badge">
              <Compass size={15} />
              <span>2. Our Vision</span>
            </div>

            <p className="vision-statement-quote">
              “To establish <span className="vision-quote-highlight">VIKAS</span> as a national-level platform that seamlessly connects <span className="vision-quote-highlight">talent, technology, and opportunities</span> to accelerate innovation, deployment, and impact in cyber-physical systems and geospatial domains.”
            </p>

            {/* 4 Pillars of Vision */}
            <div className="vision-drivers-grid">
              <div className="vision-driver-item">
                <div className="driver-icon-pill">
                  <Globe size={18} />
                </div>
                <h4 className="driver-title">National-Level Platform</h4>
                <p className="driver-desc">
                  Serving as India's premier focal point for Cyber-Physical Systems and Geo-intelligence.
                </p>
              </div>

              <div className="vision-driver-item">
                <div className="driver-icon-pill">
                  <Radio size={18} />
                </div>
                <h4 className="driver-title">Seamless Connectivity</h4>
                <p className="driver-desc">
                  Uniting talent, researchers, capital, and infrastructure in an integrated pipeline.
                </p>
              </div>

              <div className="vision-driver-item">
                <div className="driver-icon-pill">
                  <Rocket size={18} />
                </div>
                <h4 className="driver-title">Accelerated Deployment</h4>
                <p className="driver-desc">
                  Speeding up prototype translation from lab benches to field adoption.
                </p>
              </div>

              <div className="vision-driver-item">
                <div className="driver-icon-pill">
                  <Cpu size={18} />
                </div>
                <h4 className="driver-title">CPS & Geospatial Impact</h4>
                <p className="driver-desc">
                  Delivering cutting-edge solutions for national missions and social impact.
                </p>
              </div>
            </div>
          </div>

          {/* MISSION SECTION */}
          <div className="landing-section-header" style={{ marginTop: '50px' }}>
            <div className="section-eyebrow-pill">
              <Target size={13} />
              <span>3. Our Mission</span>
            </div>
            <h2 className="section-main-heading">
              5 Core Strategic Mission Objectives
            </h2>
            <p className="section-subtext-muted">
              Structured pathways driving the NM-ICPS innovation mandate from idea to scale.
            </p>
          </div>

          {/* 5 Mission Pillars Cards */}
          <div className="mission-pillars-stack">
            {/* Mission 1 */}
            <div className="mission-pillar-card">
              <div className="mission-card-top-row">
                <span className="mission-pillar-number">01</span>
                <div className="mission-icon-box">
                  <Layers size={22} />
                </div>
              </div>
              <h3 className="mission-pillar-title">Single-Window Interface</h3>
              <p className="mission-pillar-desc">
                Provide a unified single-window interface for all stakeholders (schools, startups, institutions, industry, govt, and experts) to engage directly with TIH.
              </p>
              <div className="mission-pillar-footer-tag">
                <CheckCircle2 size={13} /> Unified Entry Gateway
              </div>
            </div>

            {/* Mission 2 */}
            <div className="mission-pillar-card">
              <div className="mission-card-top-row">
                <span className="mission-pillar-number">02</span>
                <div className="mission-icon-box">
                  <Workflow size={22} />
                </div>
              </div>
              <h3 className="mission-pillar-title">Structured Onboarding & Routing</h3>
              <p className="mission-pillar-desc">
                Enable structured onboarding, technical screening, and intelligent classification into relevant operational verticals and specialized funding tracks.
              </p>
              <div className="mission-pillar-footer-tag">
                <CheckCircle2 size={13} /> Automated Workflows
              </div>
            </div>

            {/* Mission 3 */}
            <div className="mission-pillar-card">
              <div className="mission-card-top-row">
                <span className="mission-pillar-number">03</span>
                <div className="mission-icon-box">
                  <Cpu size={22} />
                </div>
              </div>
              <h3 className="mission-pillar-title">Technology Translation</h3>
              <p className="mission-pillar-desc">
                Facilitate technology translation from foundational research and lab prototypes to real-world commercial deployment and field testing.
              </p>
              <div className="mission-pillar-footer-tag">
                <CheckCircle2 size={13} /> Lab to Market
              </div>
            </div>

            {/* Mission 4 */}
            <div className="mission-pillar-card">
              <div className="mission-card-top-row">
                <span className="mission-pillar-number">04</span>
                <div className="mission-icon-box">
                  <Rocket size={22} />
                </div>
              </div>
              <h3 className="mission-pillar-title">Business Opportunities</h3>
              <p className="mission-pillar-desc">
                Generate high-value business opportunities, procurement linkages, and commercialization avenues for startups, MSMEs, and industry partners.
              </p>
              <div className="mission-pillar-footer-tag">
                <CheckCircle2 size={13} /> Market Enablement
              </div>
            </div>

            {/* Mission 5 */}
            <div className="mission-pillar-card">
              <div className="mission-card-top-row">
                <span className="mission-pillar-number">05</span>
                <div className="mission-icon-box">
                  <Users size={22} />
                </div>
              </div>
              <h3 className="mission-pillar-title">Talent & Expert Ecosystem</h3>
              <p className="mission-pillar-desc">
                Build a strong national talent pool and expert ecosystem spanning researchers, faculty, students, mentors, and senior technical advisory panels.
              </p>
              <div className="mission-pillar-footer-tag">
                <CheckCircle2 size={13} /> Skill & Mentorship
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 4: KEY TECHNOLOGY FOCUS DOMAINS
            ============================================================== */}
        <section className="landing-section" id="section-domains">
          <div className="landing-section-header">
            <div className="section-eyebrow-pill">
              <Cpu size={13} />
              <span>Technology Specialization</span>
            </div>
            <h2 className="section-main-heading">
              Cyber-Physical Systems & Geospatial Domains
            </h2>
            <p className="section-subtext-muted">
              Deep-tech focus areas aligned with the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS).
            </p>
          </div>

          <div className="domains-pill-grid">
            <div className="domain-focus-card">
              <div className="domain-icon-circle">
                <Radio size={22} />
              </div>
              <div>
                <h4 className="domain-name">PNT / NavIC / GNSS</h4>
                <p className="domain-details">
                  Precision positioning, navigation & timing algorithms, indigenous NavIC receiver modules, RTK base stations.
                </p>
              </div>
            </div>

            <div className="domain-focus-card">
              <div className="domain-icon-circle">
                <Globe size={22} />
              </div>
              <div>
                <h4 className="domain-name">Spatial Intelligence & GeoAI</h4>
                <p className="domain-details">
                  Satellite image analytics, geospatial machine learning, spatial data infrastructure, and GIS telemetry.
                </p>
              </div>
            </div>

            <div className="domain-focus-card">
              <div className="domain-icon-circle">
                <Cpu size={22} />
              </div>
              <div>
                <h4 className="domain-name">Cyber-Physical Systems (CPS)</h4>
                <p className="domain-details">
                  Embedded hardware, edge computing, autonomous drone fleets, and intelligent cyber-physical actuation.
                </p>
              </div>
            </div>

            <div className="domain-focus-card">
              <div className="domain-icon-circle">
                <Zap size={22} />
              </div>
              <div>
                <h4 className="domain-name">IoT & Sensor Fusion</h4>
                <p className="domain-details">
                  Low-power multi-sensor nodes, wireless telemetry, environmental monitoring, and industrial sensor networks.
                </p>
              </div>
            </div>

            <div className="domain-focus-card">
              <div className="domain-icon-circle">
                <Layers size={22} />
              </div>
              <div>
                <h4 className="domain-name">Digital Twin & Simulation</h4>
                <p className="domain-details">
                  High-fidelity 3D modeling, predictive maintenance twins, urban infrastructure modeling, and synthetic data.
                </p>
              </div>
            </div>

            <div className="domain-focus-card">
              <div className="domain-icon-circle">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="domain-name">Strategic Missions & Defense</h4>
                <p className="domain-details">
                  Mission-critical applications for ISRO, NRSC, disaster management, precision agriculture, and smart mobility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 5: 4-STEP EXECUTION WORKFLOW
            ============================================================== */}
        <section className="landing-section" id="section-workflow">
          <div className="landing-section-header">
            <div className="section-eyebrow-pill">
              <Workflow size={13} />
              <span>Structured Execution</span>
            </div>
            <h2 className="section-main-heading">
              How the VIKAS Workflow Operates
            </h2>
            <p className="section-subtext-muted">
              From initial proposal submission to verified project milestone execution.
            </p>
          </div>

          <div className="workflow-steps-track">
            <div className="workflow-step-card">
              <span className="step-badge-counter">STEP 01</span>
              <h4 className="step-title-text">Onboard & Submit</h4>
              <p className="step-desc-text">
                External stakeholders register their entity, domain, and submit a comprehensive technical proposal dossier.
              </p>
            </div>

            <div className="workflow-step-card">
              <span className="step-badge-counter">STEP 02</span>
              <h4 className="step-title-text">Operations Screening</h4>
              <p className="step-desc-text">
                Operations officers screen documents, verify technical parameters, and route to specific vertical matrices.
              </p>
            </div>

            <div className="workflow-step-card">
              <span className="step-badge-counter">STEP 03</span>
              <h4 className="step-title-text">Authority Matrix Sign-Off</h4>
              <p className="step-desc-text">
                Pillar Leads and Project Director evaluate feasibility and issue formal digital authorization and e-signature.
              </p>
            </div>

            <div className="workflow-step-card">
              <span className="step-badge-counter">STEP 04</span>
              <h4 className="step-title-text">Execution & Impact</h4>
              <p className="step-desc-text">
                Approved files enter active vertical execution with milestone tracking, resource deployment, and business scaling.
              </p>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 6: FINAL CALL TO ACTION BANNER
            ============================================================== */}
        <section className="landing-final-cta-section">
          <div className="final-cta-glass-box">
            <h2 className="final-cta-title">
              Ready to Accelerate Innovation with IITTNiF?
            </h2>
            <p className="final-cta-subtitle">
              Join the national ecosystem of startups, institutions, schools, industry, and domain experts on the VIKAS platform.
            </p>

            <div className="final-cta-buttons-row">
              <button 
                type="button" 
                className="btn-landing-primary"
                onClick={onNavigateToRegister || onNavigateToEntry}
                id="cta-bottom-register"
              >
                <Rocket size={18} />
                <span>Register & Submit Proposal</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ==============================================================
          INSTITUTIONAL FOOTER
          ============================================================== */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-top-row">
            <div>
              <div className="footer-brand-title">VIKAS PLATFORM</div>
              <p className="footer-brand-desc">
                IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF) is a Section-8 Technology Innovation Hub established under the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS), Department of Science & Technology (DST), Government of India.
              </p>
            </div>

            <div>
              <h4 className="footer-col-heading">Quick Actions</h4>
              <ul className="footer-links-list">
                <li>
                  <button 
                    type="button" 
                    className="footer-link-btn"
                    onClick={onNavigateToRegister || onNavigateToEntry}
                  >
                    <ArrowRight size={13} /> Proposal Registration
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    className="footer-link-btn"
                    onClick={onNavigateToLogin}
                  >
                    <ArrowRight size={13} /> Stakeholder Sign In
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    className="footer-link-btn"
                    onClick={onNavigateToOverview}
                  >
                    <ArrowRight size={13} /> VIKAS Verticals
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    className="footer-link-btn"
                    onClick={onNavigateToAdmin}
                  >
                    <Shield size={13} /> Administrator Portal
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-heading">Institutional Hub</h4>
              <p className="footer-brand-desc" style={{ fontSize: '13px', lineHeight: '1.7' }}>
                <strong>IIT Tirupati Navavishkar I-Hub Foundation</strong><br />
                Yerpedu – Venkatagiri Road, Yerpedu Post,<br />
                Tirupati District, Andhra Pradesh – 517619<br />
                Email: contact@iittnif.com | contact@vikas.in
              </p>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© 2026 IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF). All rights reserved.</span>
            <span>Aligned with National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS), DST.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
