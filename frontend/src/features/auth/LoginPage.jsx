import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Building,
  User,
  Sparkles,
  Compass,
  Zap,
  CheckCircle2,
  ChevronRight,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage({ onNavigateToRegister, onLoginSuccess }) {
  const { login, register, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'
  
  // Sign In State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Quick Register State
  const [regName, setRegName] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regStakeholderType, setRegStakeholderType] = useState('STARTUP');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Validate email format
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      const res = await login(email.trim(), password);
      if (onLoginSuccess) {
        onLoginSuccess(res.user, res.applications);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please verify your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!regOrg.trim()) {
      setErrorMessage('Please enter your company, institution or startup name.');
      return;
    }
    if (!regEmail.trim() || !isValidEmail(regEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      const res = await register({
        name: regName.trim(),
        organization: regOrg.trim(),
        email: regEmail.trim().toLowerCase(),
        phone: regPhone.trim() || '9493562799',
        password: regPassword,
        stakeholder_type: regStakeholderType,
        domains: ['PNT / NavIC / GNSS', 'IoT / Sensor Fusion'],
        intent_of_engagement: 'VIKAS Portal Incubation & Technology Development'
      });

      setSuccessMessage('Account registered successfully! Redirecting...');
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(res.user, res.applications);
        }
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleQuickFill = (personaEmail, personaPassword) => {
    setEmail(personaEmail);
    setPassword(personaPassword);
    setErrorMessage('');
  };

  return (
    <div className="vikas-hero-auth-container">
      {/* Background Ambience & Bokeh Particles */}
      <div className="hero-bg-overlay">
        <div className="bokeh-circle bokeh-1" />
        <div className="bokeh-circle bokeh-2" />
        <div className="bokeh-circle bokeh-3" />
        <div className="bokeh-circle bokeh-4" />
        <div className="grid-overlay-lines" />
      </div>

      <div className="hero-content-wrapper">
        {/* LEFT COLUMN: HERO HEADLINE & BRANDING (Inspired by Sonata Reference) */}
        <div className="hero-left-column">
          <div className="hero-institution-badge animate-fade-in">
            <span className="badge-pulse" />
            <span className="badge-text">
              DST NM-ICPS • IIT TIRUPATI NAVAVISHKAR I-HUB FOUNDATION
            </span>
          </div>

          <h1 className="hero-headline animate-slide-up">
            Unlock the Power of <br />
            <span className="text-white-gradient">Technology and Business Transformation</span> with our
          </h1>

          {/* Angled High-Impact Accent Banner */}
          <div className="hero-accent-banner animate-slide-up delay-1">
            <div className="accent-banner-shape">
              <span className="accent-banner-title">VIKAS Portal</span>
              <span className="accent-banner-subtitle">
                Technology Development & Incubation Platform
              </span>
            </div>
          </div>

          <p className="hero-playbook-tagline animate-slide-up delay-2">
            Powered by <strong>IITTNiF Single-Window Ecosystem™ Playbook</strong>
          </p>

          {/* Key Pillars / Value Props */}
          <div className="hero-pillars-grid animate-slide-up delay-3">
            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Layers size={18} className="text-accent" />
              </div>
              <div>
                <h4 className="pillar-title">9 Focus Verticals</h4>
                <p className="pillar-desc">Startups, MSMEs, Deep-Tech, Academia</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Zap size={18} className="text-accent" />
              </div>
              <div>
                <h4 className="pillar-title">TRL 3–7 Acceleration</h4>
                <p className="pillar-desc">Indigenous NavIC & CPS Hardware Testbeds</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Sparkles size={18} className="text-accent" />
              </div>
              <div>
                <h4 className="pillar-title">Seed Grants & Support</h4>
                <p className="pillar-desc">Institutional funding & mentor backing</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIGN IN & REGISTER CARD (In place of the person in the reference) */}
        <div className="hero-right-column">
          <div className="auth-glass-card animate-slide-left">
            {/* Top Switcher Tabs */}
            <div className="auth-tab-bar">
              <button 
                type="button"
                className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('signin');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
              >
                <Lock size={15} />
                <span>Sign In</span>
              </button>
              <button 
                type="button"
                className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
              >
                <User size={15} />
                <span>Register</span>
              </button>
            </div>

            {/* Notification Banner */}
            {errorMessage && (
              <div className="auth-alert-banner alert-error animate-fade-in">
                <AlertCircle size={16} className="alert-icon" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="auth-alert-banner alert-success animate-fade-in">
                <CheckCircle2 size={16} className="alert-icon" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* ----------------- TAB 1: SIGN IN ----------------- */}
            {activeTab === 'signin' ? (
              <div className="auth-tab-content">
                <div className="auth-header-mini">
                  <h3 className="auth-card-title">Welcome to VIKAS</h3>
                  <p className="auth-card-subtitle">
                    Enter your credentials to access your dashboard & proposals
                  </p>
                </div>

                <form onSubmit={handleSignInSubmit} className="auth-form" noValidate>
                  <div className="form-group">
                    <label className="form-label" htmlFor="login-email">
                      Registered Email Address <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={16} className="input-icon" />
                      <input 
                        id="login-email"
                        type="email"
                        className="form-input"
                        placeholder="name@domain.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="label-row">
                      <label className="form-label" htmlFor="login-password">
                        Password <span className="text-required">*</span>
                      </label>
                    </div>
                    <div className="input-with-icon">
                      <Lock size={16} className="input-icon" />
                      <input 
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        autoComplete="current-password"
                        required
                      />
                      <button 
                        type="button" 
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-auth-primary" 
                    disabled={loading || !email.trim() || !password.trim()}
                  >
                    {loading ? (
                      <span className="btn-loading-state">
                        <span className="spinner-sm" /> Authenticating...
                      </span>
                    ) : (
                      <span className="btn-label-state">
                        Sign In to Portal <ArrowRight size={16} />
                      </span>
                    )}
                  </button>
                </form>

                {/* Quick Persona Demo Selector */}
                <div className="demo-personas-section">
                  <div className="demo-label">
                    <span>Quick Demo Sign-In:</span>
                  </div>
                  <div className="demo-pills-row">
                    <button 
                      type="button" 
                      className="demo-pill"
                      onClick={() => handleQuickFill('aasritareddy.c@gmail.com', 'password123')}
                      title="Applicant (Startup)"
                    >
                      🚀 Aasrita (Startup)
                    </button>
                    <button 
                      type="button" 
                      className="demo-pill"
                      onClick={() => handleQuickFill('ops@iittnif.in', 'admin123')}
                      title="Operations & Screening"
                    >
                      🛡️ Ops Lead
                    </button>
                    <button 
                      type="button" 
                      className="demo-pill"
                      onClick={() => handleQuickFill('director@iittnif.in', 'admin123')}
                      title="Project Director"
                    >
                      ⭐ Project Director
                    </button>
                  </div>
                </div>

                {/* Switch to Register */}
                <div className="auth-footer-prompt">
                  <span>New to VIKAS?</span>
                  <button 
                    type="button" 
                    className="btn-link-switch"
                    onClick={() => setActiveTab('register')}
                  >
                    Register here <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              /* ----------------- TAB 2: REGISTER ----------------- */
              <div className="auth-tab-content">
                <div className="auth-header-mini">
                  <h3 className="auth-card-title">Register on VIKAS</h3>
                  <p className="auth-card-subtitle">
                    Register to submit proposals & access incubation support
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="auth-form" noValidate>
                  <div className="form-group">
                    <label className="form-label">
                      Full Name <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon" />
                      <input 
                        type="text"
                        className="form-input"
                        placeholder="e.g. Dr. Ramesh Kumar"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Organization Name <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Building size={16} className="input-icon" />
                      <input 
                        type="text"
                        className="form-input"
                        placeholder="e.g. AeroNav Robotics Pvt Ltd"
                        value={regOrg}
                        onChange={(e) => setRegOrg(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">
                        Email Address <span className="text-required">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Mail size={16} className="input-icon" />
                        <input 
                          type="email"
                          className="form-input"
                          placeholder="name@domain.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Stakeholder Track
                      </label>
                      <select 
                        className="form-select"
                        value={regStakeholderType}
                        onChange={(e) => setRegStakeholderType(e.target.value)}
                      >
                        <option value="STARTUP">Startup</option>
                        <option value="STUDENT_RESEARCHER">Student / Researcher</option>
                        <option value="SCHOOL">School / ATL</option>
                        <option value="INSTITUTION">Academic Institution</option>
                        <option value="INDUSTRY">Industry / MSME</option>
                        <option value="EXPERT">Expert / Mentor</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Create Password <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Lock size={16} className="input-icon" />
                      <input 
                        type={showRegPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Minimum 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                      <button 
                        type="button" 
                        className="password-toggle-btn"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                      >
                        {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-auth-primary btn-register-accent" 
                    disabled={loading || !regName || !regOrg || !regEmail || !regPassword}
                  >
                    {loading ? (
                      <span className="btn-loading-state">
                        <span className="spinner-sm" /> Registering...
                      </span>
                    ) : (
                      <span className="btn-label-state">
                        Register & Proceed <ArrowRight size={16} />
                      </span>
                    )}
                  </button>
                </form>

                {/* Deep Onboarding Flow Button */}
                <div className="full-onboarding-callout">
                  <span>Direct proposal submission?</span>
                  <button 
                    type="button" 
                    className="btn-link-full-form"
                    onClick={onNavigateToRegister}
                  >
                    Open Proposal Submission Form →
                  </button>
                </div>

                {/* Switch to Sign In */}
                <div className="auth-footer-prompt">
                  <span>Already registered?</span>
                  <button 
                    type="button" 
                    className="btn-link-switch"
                    onClick={() => setActiveTab('signin')}
                  >
                    Sign in here <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* ======================================================== */
        /* VIKAS HERO AUTH SECTION - MODERN HIGH-TECH AESTHETIC    */
        /* ======================================================== */
        .vikas-hero-auth-container {
          position: relative;
          min-height: calc(100vh - 72px);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          background: #070c18;
          overflow: hidden;
        }

        /* Ambient Bokeh Background */
        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: 
            radial-gradient(ellipse at 15% 30%, rgba(220, 38, 38, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 85% 70%, rgba(217, 119, 6, 0.18) 0%, transparent 65%),
            radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.95) 0%, #060b18 100%);
          z-index: 1;
        }

        .grid-overlay-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
        }

        .bokeh-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.45;
          animation: floatBokeh 18s ease-in-out infinite alternate;
        }

        .bokeh-1 {
          top: 10%;
          left: 5%;
          width: 320px;
          height: 320px;
          background: rgba(220, 38, 38, 0.35); /* Red/Crimson glow */
        }

        .bokeh-2 {
          bottom: 15%;
          left: 35%;
          width: 260px;
          height: 260px;
          background: rgba(245, 158, 11, 0.25); /* Amber/Gold glow */
          animation-delay: -4s;
        }

        .bokeh-3 {
          top: 20%;
          right: 10%;
          width: 380px;
          height: 380px;
          background: rgba(217, 119, 6, 0.22);
          animation-delay: -8s;
        }

        .bokeh-4 {
          bottom: 5%;
          right: 30%;
          width: 200px;
          height: 200px;
          background: rgba(239, 68, 68, 0.2);
          animation-delay: -12s;
        }

        @keyframes floatBokeh {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
          100% { transform: translate(-20px, 30px) scale(0.95); }
        }

        /* 2-Column Hero Content */
        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }

        /* LEFT COLUMN */
        .hero-left-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hero-institution-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          width: fit-content;
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ef4444;
          box-shadow: 0 0 10px #ef4444;
          animation: pulseDot 2s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .badge-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #f1f5f9;
          font-family: 'Outfit', sans-serif;
        }

        .hero-headline {
          font-size: 42px;
          font-weight: 800;
          line-height: 1.18;
          color: #ffffff;
          letter-spacing: -0.8px;
          margin: 4px 0 8px 0;
          font-family: 'Outfit', sans-serif;
        }

        .text-white-gradient {
          background: linear-gradient(135deg, #ffffff 40%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Angled Accent Banner (Sonata Style Red Block) */
        .hero-accent-banner {
          position: relative;
          margin: 6px 0 12px 0;
          width: fit-content;
        }

        .accent-banner-shape {
          display: flex;
          flex-direction: column;
          background: linear-gradient(105deg, #d31e1e 0%, #b91c1c 45%, #991b1b 100%);
          padding: 16px 42px 16px 24px;
          clip-path: polygon(0% 0%, 93% 0%, 100% 100%, 0% 100%);
          box-shadow: 0 12px 30px rgba(220, 38, 38, 0.4);
          border-left: 5px solid #ffffff;
        }

        .accent-banner-title {
          font-size: 38px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.5px;
          line-height: 1.05;
          text-transform: uppercase;
        }

        .accent-banner-subtitle {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.3px;
          margin-top: 4px;
        }

        .hero-playbook-tagline {
          font-size: 17px;
          color: #94a3b8;
          font-weight: 400;
          margin: 4px 0 14px 0;
        }

        .hero-playbook-tagline strong {
          color: #e2e8f0;
          font-weight: 600;
        }

        /* Pillars Grid */
        .hero-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 10px;
        }

        .pillar-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .pillar-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(217, 119, 6, 0.4);
          transform: translateY(-2px);
        }

        .pillar-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(217, 119, 6, 0.15);
          border: 1px solid rgba(217, 119, 6, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-title {
          font-size: 13px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0 0 2px 0;
        }

        .pillar-desc {
          font-size: 11px;
          color: #94a3b8;
          line-height: 1.35;
          margin: 0;
        }

        /* RIGHT COLUMN (AUTH CARD) */
        .hero-right-column {
          display: flex;
          justify-content: center;
        }

        .auth-glass-card {
          width: 100%;
          max-width: 460px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 
            0 20px 45px rgba(0, 0, 0, 0.6),
            0 0 30px rgba(217, 119, 6, 0.12);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* Tab Switcher */
        .auth-tab-bar {
          display: flex;
          background: rgba(0, 0, 0, 0.35);
          padding: 4px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .auth-tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          font-size: 13px;
          font-weight: 700;
          color: #94a3b8;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .auth-tab-btn.active {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .auth-tab-btn:hover:not(.active) {
          color: #e2e8f0;
        }

        /* Auth Header */
        .auth-header-mini {
          text-align: left;
        }

        .auth-card-title {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 4px 0;
          letter-spacing: -0.3px;
        }

        .auth-card-subtitle {
          font-size: 12.5px;
          color: #94a3b8;
          margin: 0;
          line-height: 1.4;
        }

        /* Form Controls */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 10px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-label {
          font-size: 11.5px;
          font-weight: 600;
          color: #cbd5e1;
        }

        .text-required {
          color: #ef4444;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #64748b;
          pointer-events: none;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 10px 38px 10px 36px;
          font-size: 13px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          color: #ffffff;
          transition: all 0.2s ease;
        }

        .form-select {
          padding: 10px 12px;
          color: #e2e8f0;
          background-color: #0f172a;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #d97706;
          background: rgba(0, 0, 0, 0.55);
          box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.2);
        }

        .password-toggle-btn {
          position: absolute;
          right: 10px;
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .password-toggle-btn:hover {
          color: #ffffff;
        }

        /* Buttons */
        .btn-auth-primary {
          margin-top: 6px;
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(217, 119, 6, 0.35);
        }

        .btn-auth-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(217, 119, 6, 0.45);
        }

        .btn-register-accent {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.35);
        }

        .btn-register-accent:hover:not(:disabled) {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.45);
        }

        .btn-auth-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .btn-label-state, .btn-loading-state {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .spinner-sm {
          width: 14px;
          height: 14px;
          border: 2px solid #ffffff;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Demo Personas */
        .demo-personas-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .demo-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .demo-pills-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .demo-pill {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .demo-pill:hover {
          background: rgba(217, 119, 6, 0.2);
          border-color: rgba(217, 119, 6, 0.4);
          color: #ffffff;
        }

        /* Footer Prompt */
        .auth-footer-prompt {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }

        .btn-link-switch {
          background: transparent;
          border: none;
          color: #f59e0b;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 0;
          transition: all 0.2s ease;
        }

        .btn-link-switch:hover {
          color: #fbbf24;
          text-decoration: underline;
        }

        .full-onboarding-callout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          font-size: 11.5px;
          color: #94a3b8;
          text-align: center;
        }

        .btn-link-full-form {
          background: transparent;
          border: none;
          color: #38bdf8;
          font-weight: 700;
          cursor: pointer;
          font-size: 12px;
        }

        .btn-link-full-form:hover {
          text-decoration: underline;
        }

        /* Notification Banners */
        .auth-alert-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 12px;
          line-height: 1.35;
        }

        .alert-error {
          background: rgba(220, 38, 38, 0.18);
          border: 1px solid rgba(220, 38, 38, 0.4);
          color: #fca5a5;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.18);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6ee7b7;
        }

        /* Animations */
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-left {
          animation: slideLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Responsive Layout */
        @media (max-width: 1024px) {
          .hero-content-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-headline {
            font-size: 34px;
          }
          .accent-banner-title {
            font-size: 28px;
          }
          .hero-pillars-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .vikas-hero-auth-container {
            padding: 30px 16px;
          }
          .hero-headline {
            font-size: 28px;
          }
          .accent-banner-title {
            font-size: 24px;
          }
          .hero-pillars-grid {
            grid-template-columns: 1fr;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
