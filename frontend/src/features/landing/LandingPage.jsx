import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Target,
  Layers,
  Rocket,
  Cpu,
  Building2,
  GraduationCap,
  School,
  Users,
  Landmark,
  Briefcase,
  Lightbulb,
  Handshake,
  BookOpen,
  Compass,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react';
import iittnifLogo from '../../assets/IITTNiF logo.jpg';
import './LandingPage.css';

const WHO_CAN_JOIN = [
  { id: 'startups', title: 'Startups', desc: 'Prototype, incubate, and scale deep-tech ventures with TIH support.', icon: Rocket },
  { id: 'students', title: 'Students & Researchers', desc: 'Work on fellowships, labs, and translational research problems.', icon: GraduationCap },
  { id: 'schools', title: 'Schools & Colleges', desc: 'Bring geospatial learning and innovation programmes to campuses.', icon: School },
  { id: 'industry', title: 'Industry Partners', desc: 'Co-develop solutions, testbeds, and technology transfer pipelines.', icon: Building2 },
  { id: 'government', title: 'Government Departments', desc: 'Deploy mission-aligned CPS and geospatial capabilities at scale.', icon: Landmark },
  { id: 'experts', title: 'Experts & Mentors', desc: 'Guide reviews, mentoring, and national technical advisory panels.', icon: Users }
];

const WHAT_YOU_CAN_DO = [
  { title: 'Work on real-world problem statements', desc: 'Engage with national challenges in PNT, GeoAI, CPS, and IoT.', icon: Target },
  { title: 'Collaborate with national experts', desc: 'Connect with faculty, mentors, and domain specialists at IITTNiF.', icon: Handshake },
  { title: 'Participate in technology development', desc: 'Join TDP pathways from prototype to field-ready systems.', icon: Cpu },
  { title: 'Access training and skill programs', desc: 'Build talent through structured skill and research programmes.', icon: BookOpen },
  { title: 'Engage in startup and business opportunities', desc: 'Unlock incubation, enablement, and market-facing collaborations.', icon: Briefcase }
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Join VIKAS', desc: 'Create your stakeholder profile on the official TIH gateway.' },
  { step: '02', title: 'Submit Your Interest', desc: 'Share your intent, domain, and proposed area of engagement.' },
  { step: '03', title: 'Screening', desc: 'Operations review completeness, eligibility, and alignment.' },
  { step: '04', title: 'Track / Vertical Alignment', desc: 'Your file is mapped to the most relevant TIH vertical.' },
  { step: '05', title: 'Collaborate & Participate', desc: 'Enter programmes, labs, and execution with IITTNiF.' }
];

const EXPLORE_TRACKS = [
  { id: 'Startup', title: 'Startups', desc: 'Incubation, grants, and business enablement for deep-tech ventures.', icon: Rocket },
  { id: 'Expert', title: 'Experts', desc: 'Mentorship, reviews, and advisory participation across verticals.', icon: Lightbulb },
  { id: 'School', title: 'Schools – VidyaGIS', desc: 'Geospatial literacy and campus innovation through VidyaGIS.', icon: School },
  { id: 'Institution', title: 'Institutions – SPIN Labs', desc: 'Shared research infrastructure and SPIN Lab collaborations.', icon: Layers },
  { id: 'Industry', title: 'Industry', desc: 'Joint R&D, testbed access, and technology transfer.', icon: Building2 },
  { id: 'Government', title: 'Government', desc: 'Strategic deployments aligned with national missions.', icon: Landmark }
];

const IMPACT_STATS = [
  { label: 'Projects', value: 48, suffix: '+' },
  { label: 'Participants', value: 1200, suffix: '+' },
  { label: 'Collaborations', value: 35, suffix: '+' },
  { label: 'Programs', value: 18, suffix: '+' },
  { label: 'Focus Areas', value: 9, suffix: '' }
];

function useCountUp(target, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const duration = 1100;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function ImpactStat({ label, value, suffix, active }) {
  const counted = useCountUp(value, active);
  return (
    <div className="impact-card">
      <span className="impact-value">{counted.toLocaleString()}{suffix}</span>
      <span className="impact-label">{label}</span>
    </div>
  );
}

export default function LandingPage({
  onNavigateToRegister,
  onNavigateToLogin,
  onNavigateToEntry,
  onNavigateToOverview,
  onNavigateToAdmin,
  onExploreTrack,
  theme = 'bright',
  onToggleTheme
}) {
  const [activeWho, setActiveWho] = useState('startups');
  const [impactVisible, setImpactVisible] = useState(false);
  const impactRef = useRef(null);

  const joinVikas = onNavigateToLogin || onNavigateToRegister;
  const collaborate = onNavigateToOverview || onNavigateToLogin;

  useEffect(() => {
    const node = impactRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setImpactVisible(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`vikas-landing-root theme-${theme}`}>
      <div className="landing-bg-decor">
        <div className="landing-grid-lines" />
        <div className="landing-glow-orb orb-gold" />
        <div className="landing-glow-orb orb-navy" />
      </div>

      <header className="landing-topbar">
        <div className="landing-logo-box-left" title="IIT Tirupati Navavishkar I-Hub Foundation">
          <img src={iittnifLogo} alt="IIT Tirupati Navavishkar I-Hub Foundation" className="landing-inst-logo" />
        </div>

        <div className="landing-center-brand">
          <h1 className="landing-vikas-heading">VIKAS</h1>
        </div>

        <div className="landing-top-right">
          <nav className="landing-inline-nav" aria-label="Landing sections">
            <button type="button" onClick={() => scrollTo('about-vikas')}>About</button>
            <button type="button" onClick={() => scrollTo('who-can-join')}>Who Can Join</button>
            <button type="button" onClick={() => scrollTo('how-it-works')}>How It Works</button>
            <button type="button" onClick={() => scrollTo('explore-tracks')}>Tracks</button>
            <button type="button" onClick={() => scrollTo('impact')}>Impact</button>
          </nav>
          {onToggleTheme && (
            <button
              type="button"
              className="btn-header-theme-toggle landing-theme-toggle"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to bright theme' : 'Switch to dark theme'}
              aria-label="Toggle bright and dark theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Bright' : 'Dark'}</span>
            </button>
          )}
        </div>
      </header>

      <div className="landing-container">
        <section className="landing-hero" id="about-vikas">
          <div className="hero-copy">
            <h2 className="hero-main-title">
              The Gateway to Innovation at TIH
            </h2>
            <p className="hero-tagline-lead">
              VIKAS is the flagship single-window platform of IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF), designed to serve as the central gateway for onboarding, engagement, and participation across all Technology Innovation Hub (TIH) activities.
            </p>
            <p className="hero-tagline-lead">
              The platform integrates schools, institutions, startups, industry, government bodies, and experts into a unified ecosystem that supports technology development, innovation, skill development, and business enablement aligned with national priorities under NM-ICPS.
            </p>
            <div className="hero-cta-group">
              <button type="button" className="btn-landing-primary" onClick={joinVikas}>
                Join VIKAS <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <article className="about-support-card hero-priorities-card">
            <h3>Aligned with NM-ICPS national priorities</h3>
            <div className="about-pillars">
              <div>
                <Cpu size={18} />
                <strong>Technology Development</strong>
                <span>Prototype translation, TDP pathways, and specialized testbeds.</span>
              </div>
              <div>
                <Sparkles size={18} />
                <strong>Innovation</strong>
                <span>Structured programmes that move ideas into deployable systems.</span>
              </div>
              <div>
                <BookOpen size={18} />
                <strong>Skill Development</strong>
                <span>Talent pipelines for students, researchers, and practitioners.</span>
              </div>
              <div>
                <Briefcase size={18} />
                <strong>Business Enablement</strong>
                <span>Startup, industry, and market-facing collaboration routes.</span>
              </div>
            </div>
          </article>
        </section>

        <section className="landing-section" id="who-can-join">
          <div className="landing-section-header">
            <div className="section-eyebrow-pill">
              <Users size={13} /> Who Can Join
            </div>
            <h2 className="section-main-heading">One gateway. Many stakeholders.</h2>
          </div>
          <div className="who-grid">
            {WHO_CAN_JOIN.map((item) => {
              const Icon = item.icon;
              const active = activeWho === item.id;
              return (
                <article
                  key={item.id}
                  className={`who-card ${active ? 'active' : ''}`}
                  onMouseEnter={() => setActiveWho(item.id)}
                >
                  <div className="who-icon"><Icon size={22} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="landing-section" id="what-you-can-do">
          <div className="landing-section-header">
            <div className="section-eyebrow-pill">
              <Target size={13} /> What You Can Do
            </div>
            <h2 className="section-main-heading">Engage with purpose</h2>
          </div>
          <div className="feature-grid">
            {WHAT_YOU_CAN_DO.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="feature-card">
                  <div className="feature-icon"><Icon size={20} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="landing-section" id="how-it-works">
          <div className="landing-section-header">
            <div className="section-eyebrow-pill">
              <Layers size={13} /> How It Works
            </div>
            <h2 className="section-main-heading">A clear journey from interest to participation</h2>
          </div>
          <div className="journey-track">
            {HOW_IT_WORKS.map((item, idx) => (
              <div key={item.step} className="journey-step">
                <span className="journey-num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {idx < HOW_IT_WORKS.length - 1 && <span className="journey-connector" />}
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" id="explore-tracks">
          <div className="landing-section-header">
            <div className="section-eyebrow-pill">
              <Compass size={13} /> Explore Tracks
            </div>
            <h2 className="section-main-heading">Find your pathway into TIH</h2>
          </div>
          <div className="tracks-grid">
            {EXPLORE_TRACKS.map((track) => {
              const Icon = track.icon;
              return (
                <article key={track.id} className="track-card">
                  <div className="track-icon"><Icon size={22} /></div>
                  <h3>{track.title}</h3>
                  <p>{track.desc}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="landing-section" id="impact" ref={impactRef}>
          <div className="landing-section-header">
            <div className="section-eyebrow-pill">
              <BarChart3 size={13} /> Impact
            </div>
            <h2 className="section-main-heading">A growing innovation ecosystem</h2>
          </div>
          <div className="impact-grid">
            {IMPACT_STATS.map((stat) => (
              <ImpactStat key={stat.label} {...stat} active={impactVisible} />
            ))}
          </div>
        </section>

        <section className="landing-final-cta-section" id="join">
          <div className="final-cta-glass-box">
            <h2 className="final-cta-title">Join the VIKAS Platform</h2>
            <p className="final-cta-subtitle">
              Become part of a connected ecosystem for technology, innovation, collaboration, and real-world impact.
            </p>
            <div className="final-cta-buttons-row">
              <button type="button" className="btn-landing-primary" onClick={joinVikas}>
                Join VIKAS
              </button>
            </div>
          </div>
        </section>
      </div>

      <footer className="landing-footer">
        <div className="landing-container">
          <div className="footer-top-row">
            <div>
              <div className="footer-brand-title">VIKAS</div>
              <p className="footer-brand-desc">
                Official single-window platform of IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF), a Technology Innovation Hub under NM-ICPS, DST, Government of India.
              </p>
            </div>
            <div>
              <h4 className="footer-col-heading">Portal</h4>
              <ul className="footer-links-list">
                <li><button type="button" className="footer-link-btn" onClick={joinVikas}>Join VIKAS</button></li>
                <li><button type="button" className="footer-link-btn" onClick={onNavigateToLogin}>Sign In</button></li>
                <li><button type="button" className="footer-link-btn" onClick={onNavigateToAdmin}><Shield size={13} /> Administrator Portal</button></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-col-heading">Institutional Hub</h4>
              <p className="footer-brand-desc">
                IIT Tirupati Navavishkar I-Hub Foundation<br />
                Yerpedu, Tirupati District, Andhra Pradesh – 517619
              </p>
            </div>
          </div>
          <div className="footer-bottom-bar">
            <span>© 2026 IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF).</span>
            <span>NM-ICPS · DST · Government of India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
