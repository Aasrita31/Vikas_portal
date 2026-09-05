import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Map, 
  Sparkles, 
  GraduationCap, 
  Users, 
  Compass, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Layers, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Target,
  Building2,
  MapPin,
  Laptop,
  ExternalLink,
  Briefcase,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function SchoolDetailPage({ onBack }) {
  const [activeBenefitTab, setActiveBenefitTab] = useState('students'); // 'students' or 'schools'
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdIge5J3-Ept8a6JRandmBdvPIP9cFyXf8IvVFopm-xdClb3g/viewform";

  const handleRegisterClick = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  // 3 Focus Areas requested for the Program Overview subsection
  const focusAreas = [
    {
      id: 1,
      title: 'Hands-on Training',
      desc: 'Hands-on training programs for students and teachers.',
      icon: GraduationCap,
      color: '#0891b2', // cyan
      badge: 'Skill Enablement'
    },
    {
      id: 2,
      title: 'Real-World GIS Applications',
      desc: 'Exposure to real-world GIS applications through hands-on projects and activities.',
      icon: Globe,
      color: '#10b981', // emerald
      badge: 'Practical Exposure'
    },
    {
      id: 3,
      title: 'Solving Real-World Challenges',
      desc: 'Opportunities to understand how GIS can address complex societal and environmental challenges.',
      icon: Target,
      color: '#d97706', // amber gold
      badge: 'Impact & Innovation'
    }
  ];

  return (
    <div className="school-detail-page animate-fade-in">
      {/* 1. Top Navigation Bar */}
      <div className="detail-top-nav">
        <button className="btn-back-link" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back to VIKAS</span>
        </button>
        <span className="top-nav-breadcrumb">
          VIKAS Platform / Platform Verticals / <strong>6.6 Schools & Academic Outreach</strong>
        </span>
      </div>

      {/* 2. Hero Section Card */}
      <div className="card school-hero-card">
        <div className="hero-badge-row">
          <span className="badge badge-cyan">Vertical 6.6 • Educational Outreach</span>
          <span className="badge badge-gold">NM-ICPS National Initiative</span>
        </div>

        <div className="hero-main-content">
          <div className="hero-icon-wrapper">
            <Map size={36} className="text-cyan" />
          </div>
          <div className="hero-text-content">
            <h1 className="hero-page-title">Schools & Academic Outreach</h1>
            <h2 className="hero-subtitle">Vidya GIS Program</h2>
            <p className="hero-description">
              The Vidya GIS Program by IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF) is a national-scale school enablement platform under the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS). It introduces high school students and educators to spatial thinking, geospatial mapping technologies, satellite imagery analysis, and real-world problem solving to foster a future-ready scientific workforce.
            </p>
            
            <div className="hero-cta-row">
              <button className="btn btn-primary-cta" onClick={handleRegisterClick}>
                <Sparkles size={16} />
                <span>Register Your School</span>
                <ExternalLink size={14} />
              </button>
              <span className="hero-cta-note">
                <ShieldCheck size={14} className="text-success" />
                Official Application Form • Hosted via Google Forms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STEP 2: Program Overview Section */}
      <div className="section-container">
        <div className="section-header-wrap">
          <div className="section-title-with-badge">
            <div className="section-icon-pill">
              <BookOpen size={18} className="text-cyan" />
            </div>
            <div>
              <h2 className="overview-main-heading">Program Overview</h2>
              <span className="overview-subheading">Vidya GIS: GIS For Schools</span>
            </div>
          </div>
        </div>

        {/* Narrative Description organized in scannable card layout */}
        <div className="overview-narrative-card card">
          <div className="lead-paragraph-block">
            <p className="overview-lead-text">
              The <strong>Vidya GIS Program</strong> introduces Geographic Information Systems (GIS) training as a transformative tool for schools. By embedding GIS into education, this initiative enhances students' technological literacy and equips them with <strong>Spatial Thinking</strong> for analyzing and visualizing geographic data.
            </p>
          </div>

          <div className="overview-highlights-grid mt-20">
            <div className="highlight-box">
              <div className="highlight-header">
                <Building2 size={18} className="text-accent" />
                <h4>Institutional Leadership</h4>
              </div>
              <p>
                Schools participating in the program gain recognition as leaders in technology-driven education. This enhances their reputation, attracts prospective students, and strengthens their position as forward-thinking institutions.
              </p>
            </div>

            <div className="highlight-box">
              <div className="highlight-header">
                <Award size={18} className="text-success" />
                <h4>Future-Ready Career Pathways</h4>
              </div>
              <p>
                Students learn practical, in-demand skills like data visualization, spatial analysis, and geospatial technology, preparing them for academic pathways and future careers in various fields.
              </p>
            </div>
          </div>
        </div>

        {/* Focus Areas Subsection */}
        <div className="focus-areas-container mt-24">
          <div className="subsection-title-row">
            <div>
              <h3 className="subsection-heading">Focus Areas</h3>
              <p className="subsection-subtext">Three core experiential pillars connecting theory with real-world spatial practice</p>
            </div>
          </div>

          <div className="focus-areas-grid mt-16">
            {focusAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <div 
                  key={area.id} 
                  className="card focus-area-card"
                  style={{ borderTop: `4px solid ${area.color}` }}
                >
                  <div className="focus-card-top-row">
                    <div 
                      className="focus-icon-box"
                      style={{ 
                        backgroundColor: `${area.color}12`, 
                        border: `1px solid ${area.color}25`,
                        color: area.color 
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <span 
                      className="focus-badge" 
                      style={{ color: area.color, backgroundColor: `${area.color}10`, borderColor: `${area.color}25` }}
                    >
                      {area.badge}
                    </span>
                  </div>

                  <h4 className="focus-card-title">{area.title}</h4>
                  <p className="focus-card-desc">{area.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. STEP 3: Program Benefits Section */}
      <div className="section-container mt-12">
        <div className="section-header-wrap">
          <div className="section-title-with-badge">
            <div className="section-icon-pill" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.25)' }}>
              <Award size={18} className="text-accent" />
            </div>
            <div>
              <h2 className="overview-main-heading">Program Benefits</h2>
              <span className="overview-subheading" style={{ color: 'var(--color-accent)' }}>Measurable value creation for learners and educational institutions</span>
            </div>
          </div>

          {/* Interactive Benefit Tab Switcher */}
          <div className="benefit-tab-switch-group">
            <button 
              className={`benefit-tab-btn ${activeBenefitTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveBenefitTab('students')}
            >
              <GraduationCap size={15} />
              <span>1. Benefits for Students</span>
            </button>
            <button 
              className={`benefit-tab-btn ${activeBenefitTab === 'schools' ? 'active' : ''}`}
              onClick={() => setActiveBenefitTab('schools')}
            >
              <Building2 size={15} />
              <span>2. Benefits for Schools</span>
            </button>
          </div>
        </div>

        {/* Dynamic Benefits Content */}
        {activeBenefitTab === 'students' && (
          <div className="benefits-tab-content animate-fade-in">
            <div className="benefits-parent-card card">
              <div className="benefits-parent-header">
                <div className="badge-pill badge-cyan">
                  <GraduationCap size={14} />
                  <span>Student Enablement Matrix</span>
                </div>
                <h3>Key Advantages for Participating Students</h3>
              </div>

              <div className="benefits-items-grid mt-20">
                {/* 1. Practical Skills */}
                <div className="benefit-feature-card">
                  <div className="feature-icon-header">
                    <div className="feature-icon-wrap" style={{ backgroundColor: 'rgba(8, 145, 178, 0.1)', color: '#0891b2' }}>
                      <Laptop size={20} />
                    </div>
                    <h4>1. Practical Skills</h4>
                  </div>
                  <ul className="benefit-bullets-list">
                    <li>
                      <CheckCircle size={14} className="text-cyan flex-shrink-0" />
                      <span>Students gain hands-on experience with GIS software.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-cyan flex-shrink-0" />
                      <span>They learn to apply GIS tools to real-world scenarios such as mapping, data visualization, and spatial analysis.</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Critical Thinking */}
                <div className="benefit-feature-card">
                  <div className="feature-icon-header">
                    <div className="feature-icon-wrap" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                      <Compass size={20} />
                    </div>
                    <h4>2. Critical Thinking</h4>
                  </div>
                  <ul className="benefit-bullets-list">
                    <li>
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span>GIS fosters analytical thinking by requiring students to interpret geographic data and patterns.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span>It enhances problem-solving abilities through scenario-based learning such as urban planning and disaster management.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3. Career Advancement with 3 small career cards */}
              <div className="career-advancement-section mt-24">
                <div className="career-section-header">
                  <div className="career-title-row">
                    <Briefcase size={18} className="text-success" />
                    <h4>3. Career Advancement</h4>
                  </div>
                  <span className="career-sub-label">Foundational industry pathways unlocked through spatial computing</span>
                </div>

                <div className="career-cards-grid mt-14">
                  {/* Career 1: Technology */}
                  <div className="career-mini-card">
                    <div className="career-mini-top">
                      <div className="career-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                        <Cpu size={18} />
                      </div>
                      <h5>Technology</h5>
                    </div>
                    <p>Geospatial technologies, data science, and software development.</p>
                  </div>

                  {/* Career 2: Environmental Science */}
                  <div className="career-mini-card">
                    <div className="career-mini-top">
                      <div className="career-icon-box" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#0891b2' }}>
                        <Globe size={18} />
                      </div>
                      <h5>Environmental Science</h5>
                    </div>
                    <p>Conservation, climate change analysis, and resource management.</p>
                  </div>

                  {/* Career 3: Urban Planning */}
                  <div className="career-mini-card">
                    <div className="career-mini-top">
                      <div className="career-icon-box" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                        <Building2 size={18} />
                      </div>
                      <h5>Urban Planning</h5>
                    </div>
                    <p>City design, infrastructure development, and public policy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeBenefitTab === 'schools' && (
          <div className="benefits-tab-content animate-fade-in">
            <div className="benefits-parent-card card">
              <div className="benefits-parent-header">
                <div className="badge-pill badge-gold">
                  <Building2 size={14} />
                  <span>Institutional Growth Matrix</span>
                </div>
                <h3>Strategic Benefits for Partner Schools</h3>
              </div>

              <div className="school-benefits-grid mt-20">
                {/* 1. Gaining an Edge */}
                <div className="benefit-feature-card">
                  <div className="feature-icon-header">
                    <div className="feature-icon-wrap" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                      <Award size={20} />
                    </div>
                    <h4>1. Gaining an Edge</h4>
                  </div>
                  <ul className="benefit-bullets-list">
                    <li>
                      <CheckCircle size={14} className="text-warning flex-shrink-0" />
                      <span>Schools offering GIS training are seen as technologically advanced.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-warning flex-shrink-0" />
                      <span>Helps attract more students and improve the school's reputation.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-warning flex-shrink-0" />
                      <span>Positions the school as a forward-thinking institution.</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Partnership Opportunities */}
                <div className="benefit-feature-card">
                  <div className="feature-icon-header">
                    <div className="feature-icon-wrap" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#0891b2' }}>
                      <Globe size={20} />
                    </div>
                    <h4>2. Partnership Opportunities</h4>
                  </div>
                  <ul className="benefit-bullets-list">
                    <li>
                      <CheckCircle size={14} className="text-cyan flex-shrink-0" />
                      <span>Schools can collaborate with local governments, environmental agencies, and industries.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-cyan flex-shrink-0" />
                      <span>Opens opportunities for funding, joint research, grants, and GIS-focused projects.</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Teacher Development */}
                <div className="benefit-feature-card">
                  <div className="feature-icon-header">
                    <div className="feature-icon-wrap" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                      <Users size={20} />
                    </div>
                    <h4>3. Teacher Development</h4>
                  </div>
                  <ul className="benefit-bullets-list">
                    <li>
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span>Teachers receive professional GIS training.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span>Helps teachers integrate technology into their curriculum.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span>Improves classroom experience and quality of education.</span>
                    </li>
                  </ul>
                </div>

                {/* 4. Community Engagement */}
                <div className="benefit-feature-card">
                  <div className="feature-icon-header">
                    <div className="feature-icon-wrap" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                      <Target size={20} />
                    </div>
                    <h4>4. Community Engagement</h4>
                  </div>
                  <ul className="benefit-bullets-list">
                    <li>
                      <CheckCircle size={14} className="text-success flex-shrink-0" />
                      <span>Students can participate in local projects such as environmental conservation, disaster planning, and public health mapping.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-success flex-shrink-0" />
                      <span>Encourages students to engage with real-world issues.</span>
                    </li>
                    <li>
                      <CheckCircle size={14} className="text-success flex-shrink-0" />
                      <span>Helps build the school's image as a sustainability and community-focused institution.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Banner CTA Card */}
      <div className="card school-cta-banner mt-12">
        <div className="cta-banner-content">
          <div className="cta-icon-box">
            <BookOpen size={30} className="text-cyan" />
          </div>
          <div>
            <h3>Empower Your Students with 21st-Century Spatial Technologies</h3>
            <p>Join the nationwide Vidya GIS Network and bring world-class spatial computing into your classrooms.</p>
          </div>
        </div>
        <button className="btn btn-primary-cta" onClick={handleRegisterClick}>
          <span>Register Your School</span>
          <ExternalLink size={16} />
        </button>
      </div>

      <style>{`
        .school-detail-page {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 8px 16px 56px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Top Navigation */
        .detail-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
        }

        .btn-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 8px 16px;
          border-radius: var(--radius-md);
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .btn-back-link:hover {
          background-color: var(--bg-primary);
          border-color: var(--color-accent);
          color: var(--color-accent);
          transform: translateX(-2px);
        }

        .top-nav-breadcrumb {
          font-size: 12px;
          color: var(--text-muted);
        }

        .top-nav-breadcrumb strong {
          color: var(--text-primary);
        }

        /* Hero Card */
        .school-hero-card {
          padding: 32px 36px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.04) 0%, rgba(217, 119, 6, 0.03) 100%), var(--bg-surface);
          border: 1px solid var(--border-color);
          border-left: 5px solid #06b6d4;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
        }

        .hero-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .badge-cyan {
          background-color: rgba(6, 182, 212, 0.1);
          color: #0891b2;
          border: 1px solid rgba(6, 182, 212, 0.25);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .badge-gold {
          background-color: rgba(217, 119, 6, 0.1);
          color: #b45309;
          border: 1px solid rgba(217, 119, 6, 0.25);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .hero-main-content {
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }

        .hero-icon-wrapper {
          width: 68px;
          height: 68px;
          border-radius: 14px;
          background-color: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .text-cyan {
          color: #0891b2;
        }

        .hero-text-content {
          flex: 1;
        }

        .hero-page-title {
          font-size: 28px;
          font-weight: 900;
          color: var(--text-primary);
          line-height: 1.15;
          margin: 0 0 4px;
        }

        .hero-subtitle {
          font-size: 18px;
          font-weight: 700;
          color: #0891b2;
          margin: 0 0 14px;
        }

        .hero-description {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 950px;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .btn-primary-cta {
          background: linear-gradient(135deg, #0891b2 0%, #0284c7 100%);
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(8, 145, 178, 0.25);
          transition: all var(--transition-fast);
        }

        .btn-primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(8, 145, 178, 0.35);
          background: linear-gradient(135deg, #0e7490 0%, #0369a1 100%);
        }

        .hero-cta-note {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        /* Section Container */
        .section-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mt-12 {
          margin-top: 12px;
        }

        .mt-16 {
          margin-top: 16px;
        }

        .mt-20 {
          margin-top: 20px;
        }

        .mt-24 {
          margin-top: 24px;
        }

        /* Program Overview Styling */
        .section-header-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }

        .section-title-with-badge {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-icon-pill {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background-color: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overview-main-heading {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.2;
        }

        .overview-subheading {
          font-size: 13px;
          font-weight: 600;
          color: #0891b2;
        }

        .overview-narrative-card {
          padding: 28px 32px;
          background-color: var(--bg-surface);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
        }

        .lead-paragraph-block {
          border-left: 3px solid #0891b2;
          padding-left: 18px;
        }

        .overview-lead-text {
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--text-primary);
          margin: 0;
        }

        .overview-highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 800px) {
          .overview-highlights-grid {
            grid-template-columns: 1fr;
          }
        }

        .highlight-box {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .highlight-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .highlight-header h4 {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .highlight-box p {
          font-size: 13px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Focus Areas Subsection */
        .subsection-heading {
          font-size: 17px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .subsection-subtext {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0;
        }

        .focus-areas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .focus-area-card {
          padding: 26px;
          background-color: var(--bg-surface);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }

        .focus-area-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-active);
        }

        .focus-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .focus-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .focus-badge {
          font-size: 10.5px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-full);
          border: 1px solid;
          letter-spacing: 0.2px;
        }

        /* Program Benefits Tab Switcher Styling */
        .benefit-tab-switch-group {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--bg-surface);
          padding: 6px;
          border-radius: var(--radius-lg);
          border: 1.5px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .benefit-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 9px 18px;
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .benefit-tab-btn:hover {
          background-color: var(--bg-surface-hover);
          border-color: var(--color-accent);
          color: var(--color-accent);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .benefit-tab-btn:not(.active) svg {
          color: var(--color-accent);
          transition: transform var(--transition-fast);
        }

        .benefit-tab-btn:hover svg {
          transform: scale(1.1);
        }

        .benefit-tab-btn.active {
          background: linear-gradient(135deg, var(--color-accent), #b45309);
          color: #ffffff;
          border-color: var(--color-accent);
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.3);
          transform: translateY(-1px);
        }

        .benefit-tab-btn.active svg {
          color: #ffffff !important;
        }

        .benefits-parent-card {
          padding: 28px 32px;
          background-color: var(--bg-surface);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }

        .benefits-parent-header h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 4px 0 0;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 11px;
          font-weight: 700;
          width: fit-content;
        }

        .benefits-items-grid, .school-benefits-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 850px) {
          .benefits-items-grid, .school-benefits-grid {
            grid-template-columns: 1fr;
          }
        }

        .benefit-feature-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all var(--transition-normal);
        }

        .benefit-feature-card:hover {
          border-color: var(--border-color-active);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .feature-icon-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .feature-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feature-icon-header h4 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .benefit-bullets-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .benefit-bullets-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Career Advancement Section */
        .career-advancement-section {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 24px;
        }

        .career-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .career-title-row h4 {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .career-sub-label {
          font-size: 12.5px;
          color: var(--text-secondary);
          display: block;
          margin-top: 2px;
        }

        .mt-14 {
          margin-top: 14px;
        }

        .career-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }

        .career-mini-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-fast);
        }

        .career-mini-card:hover {
          border-color: var(--border-color-active);
          transform: translateY(-2px);
        }

        .career-mini-top {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .career-icon-box {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .career-mini-top h5 {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .career-mini-card p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.45;
          margin: 0;
        }

        .focus-card-title {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .focus-card-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        /* Modules Grid */
        .section-title-block h3 {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .section-title-block p {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }

        .module-card {
          padding: 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          border-radius: 14px;
          box-shadow: var(--shadow-sm);
          background-color: var(--bg-surface);
        }

        .module-number {
          font-size: 18px;
          font-weight: 900;
          color: #0891b2;
          background-color: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .module-info h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .module-info p {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        /* Benefits & Roadmap */
        .card-heading-row {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }

        .card-heading-row h4 {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .benefits-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .roadmap-steps {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .roadmap-step-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .step-num-circle {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-full);
          background-color: var(--color-accent-glow);
          border: 1px solid rgba(var(--color-accent-rgb), 0.3);
          color: var(--color-accent);
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .step-text {
          display: flex;
          flex-direction: column;
        }

        .step-text strong {
          font-size: 13px;
          color: var(--text-primary);
        }

        .step-text span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        /* Bottom Banner CTA Card */
        .school-cta-banner {
          padding: 28px 36px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(2, 132, 199, 0.05) 100%), var(--bg-surface);
          border: 1px solid rgba(6, 182, 212, 0.25);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .cta-banner-content {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .cta-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background-color: rgba(6, 182, 212, 0.15);
          border: 1px solid rgba(6, 182, 212, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cta-banner-content h3 {
          font-size: 16px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .cta-banner-content p {
          font-size: 13px;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
