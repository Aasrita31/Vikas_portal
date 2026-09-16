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
  Shield, 
  Key, 
  CheckCircle2, 
  ChevronRight, 
  Layers,
  Cpu,
  Award,
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';

export default function AdminLoginPage({ onNavigateToApplicantLogin, onNavigateToAdminDashboard, onAdminLoginSuccess, onNavigateToLanding }) {
  const { login, register, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'
  
  // Admin Sign In State
  const [email, setEmail] = useState('admin@iittnif.in');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Admin Register State
  const [adminName, setAdminName] = useState('');
  const [adminDept, setAdminDept] = useState('IITTNiF Central Administration');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('VIKAS-ADMIN-2026');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Validate email format
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleAdminSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your official administrator email.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid official email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your administrator password.');
      return;
    }

    try {
      const res = await login(email.trim(), password);
      setSuccessMessage('Administrator authenticated successfully! Loading Admin Dashboard...');
      setTimeout(() => {
        if (onAdminLoginSuccess) {
          onAdminLoginSuccess(res.user, res.applications);
        } else if (onNavigateToAdminDashboard) {
          onNavigateToAdminDashboard();
        }
      }, 500);
    } catch (err) {
      setErrorMessage(err.message || 'Administrator authentication failed. Please verify credentials.');
    }
  };

  const handleAdminRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!adminName.trim()) {
      setErrorMessage('Please enter the administrator full name.');
      return;
    }
    if (!adminEmail.trim() || !isValidEmail(adminEmail)) {
      setErrorMessage('Please enter a valid official administrator email.');
      return;
    }
    if (adminPasscode.trim() !== 'VIKAS-ADMIN-2026' && adminPasscode.trim() !== 'admin123') {
      setErrorMessage('Invalid Admin Security Passcode. Default security key is VIKAS-ADMIN-2026.');
      return;
    }
    if (!adminPassword.trim() || adminPassword.length < 6) {
      setErrorMessage('Admin password must be at least 6 characters.');
      return;
    }

    try {
      await register({
        name: adminName.trim(),
        organization: adminDept.trim() || 'IITTNiF Central Administration',
        email: adminEmail.trim().toLowerCase(),
        phone: adminPhone.trim() || '+91 98765 00006',
        password: adminPassword,
        role: 'ADMIN',
        stakeholder_type: 'OTHER',
        domains: ['Spatial Intelligence', 'Cyber-Physical Systems', 'Executive Governance'],
        intent_of_engagement: 'Central Administration & Governance'
      });

      setEmail(adminEmail.trim().toLowerCase());
      setPassword('');
      setAdminName('');
      setAdminEmail('');
      setAdminPhone('');
      setAdminPassword('');
      setActiveTab('signin');
      setSuccessMessage('Admin account registered successfully. Please sign in to continue.');
    } catch (err) {
      setErrorMessage(err.message || 'Admin registration failed. Please check inputs.');
    }
  };

  const handleQuickFill = (adminUserEmail, adminUserPassword) => {
    setEmail(adminUserEmail);
    setPassword(adminUserPassword);
    setErrorMessage('');
  };

  return (
    <div className="vikas-hero-auth-container">
      {/* Background Ambience & Bokeh Particles */}
      <div className="hero-bg-overlay">
        <div className="bokeh-circle bokeh-1" />
        <div className="bokeh-circle bokeh-2" />
        <div className="bokeh-circle bokeh-3" />
        <div className="grid-overlay-lines" />
      </div>

      <div className="hero-content-wrapper">
        {/* LEFT COLUMN: HERO HEADLINE & BRANDING */}
        <div className="hero-left-column">


          <div className="hero-institution-badge animate-fade-in">
            <span className="badge-pulse" style={{ backgroundColor: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
            <span className="badge-text">
              DST NM-ICPS • EXECUTIVE GOVERNANCE & CENTRAL ADMINISTRATION
            </span>
          </div>

          <h1 className="hero-headline animate-slide-up">
            Central Governance & <br />
            <span className="hero-headline-highlight">Executive Administration</span> & <br />
            <span className="hero-headline-sub">Authority Matrix Control</span>
          </h1>

          {/* Angled Accent High-Tech Banner */}
          <div className="hero-accent-banner animate-slide-up delay-1">
            <div className="accent-banner-shape" style={{ background: 'linear-gradient(115deg, #d97706 0%, #b45309 35%, #991b1b 70%, #7f1d1d 100%)' }}>
              <span className="accent-banner-title">VIKAS ADMIN PORTAL</span>
              <span className="accent-banner-subtitle">
                Apex Governance, Authority Matrix & Compliance Management
              </span>
            </div>
          </div>

          <p className="hero-playbook-tagline animate-slide-up delay-2">
            Centralized Intake Monitoring • Authority Matrix E-Sign • National Audit Trail
          </p>

          {/* Key Pillars / Value Props */}
          <div className="hero-pillars-grid animate-slide-up delay-3">
            <div className="pillar-item">
              <div className="pillar-icon-box" style={{ backgroundColor: 'rgba(217, 119, 6, 0.15)', color: '#f59e0b' }}>
                <ShieldCheck size={18} />
              </div>
              <div className="pillar-text-wrap">
                <h4 className="pillar-title">9 Verticals Oversight</h4>
                <p className="pillar-desc">Portfolio governance & multi-pillar coordination</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                <Key size={18} />
              </div>
              <div className="pillar-text-wrap">
                <h4 className="pillar-title">Authority Matrix & E-Sign</h4>
                <p className="pillar-desc">Strategic file routing & executive sign-off</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                <Award size={18} />
              </div>
              <div className="pillar-text-wrap">
                <h4 className="pillar-title">Audit Trail & Compliance</h4>
                <p className="pillar-desc">Immutable tamper-proof digital log records</p>
              </div>
            </div>
          </div>

          {/* Quick Return to Applicant Portal */}
          <div className="mt-8 flex items-center gap-3">
            <button 
              type="button" 
              className="btn-link-switch flex items-center gap-2"
              onClick={onNavigateToApplicantLogin}
              style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, background: 'rgba(255,255,255,0.06)', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <ArrowLeft size={16} /> Return to Applicant Portal
            </button>
            <button 
              type="button" 
              className="btn-link-switch flex items-center gap-2"
              onClick={onNavigateToAdminDashboard}
              style={{ color: '#f59e0b', fontSize: '13px', fontWeight: 700, background: 'rgba(217,119,6,0.12)', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(217,119,6,0.3)' }}
            >
              <LayoutDashboard size={16} /> Direct Admin Dashboard
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ADMIN AUTH CARD */}
        <div className="hero-right-column">
          <div className="auth-glass-card animate-slide-left" style={{ borderColor: 'rgba(217, 119, 6, 0.3)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(217, 119, 6, 0.2)' }}>
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
                <Shield size={15} />
                <span>Admin Sign In</span>
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
                <Key size={15} />
                <span>Register Admin</span>
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

            {/* ----------------- TAB 1: ADMIN SIGN IN ----------------- */}
            {activeTab === 'signin' ? (
              <div className="auth-tab-content">
                <div className="auth-header-mini">
                  <h3 className="auth-card-title flex items-center gap-2">
                    <Shield size={20} className="text-amber-500" /> Administrator Sign In
                  </h3>
                  <p className="auth-card-subtitle">
                    Enter official administrator credentials to access the governance panel
                  </p>
                </div>

                <form onSubmit={handleAdminSignInSubmit} className="auth-form" noValidate>
                  <div className="form-group">
                    <label className="form-label" htmlFor="admin-login-email">
                      Official Admin Email <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={16} className="input-icon" />
                      <input 
                        id="admin-login-email"
                        type="email"
                        className="form-input"
                        placeholder="admin@iittnif.in"
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
                      <label className="form-label" htmlFor="admin-login-password">
                        Admin Password <span className="text-required">*</span>
                      </label>
                    </div>
                    <div className="input-with-icon">
                      <Lock size={16} className="input-icon" />
                      <input 
                        id="admin-login-password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Enter password (default: admin123)"
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
                    style={{ background: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #991b1b 100%)' }}
                  >
                    {loading ? (
                      <span className="btn-loading-state">
                        <span className="spinner-sm" /> Authenticating Admin...
                      </span>
                    ) : (
                      <span className="btn-label-state">
                        Sign In as Administrator <ArrowRight size={16} />
                      </span>
                    )}
                  </button>
                </form>

                {/* Quick Persona Demo Selector */}
                <div className="demo-personas-section">
                  <div className="demo-label">
                    <span>Quick Admin Sign-In:</span>
                  </div>
                  <div className="demo-pills-row">
                    <button 
                      type="button" 
                      className="demo-pill"
                      onClick={() => handleQuickFill('admin@iittnif.in', 'admin123')}
                      title="Master System Administrator"
                    >
                      ⚙️ Master Admin
                    </button>
                    <button 
                      type="button" 
                      className="demo-pill"
                      onClick={() => handleQuickFill('director@iittnif.in', 'admin123')}
                      title="Project Director"
                    >
                      ⭐ Project Director
                    </button>
                    <button 
                      type="button" 
                      className="demo-pill"
                      onClick={() => handleQuickFill('ops@iittnif.in', 'admin123')}
                      title="Operations & Screening"
                    >
                      🛡️ Ops Lead
                    </button>
                  </div>
                </div>

                {/* Switch to Register */}
                <div className="auth-footer-prompt">
                  <span>Need an Admin Account?</span>
                  <button 
                    type="button" 
                    className="btn-link-switch"
                    onClick={() => setActiveTab('register')}
                  >
                    Register Admin <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              /* ----------------- TAB 2: REGISTER ADMIN ----------------- */
              <div className="auth-tab-content">
                <div className="auth-header-mini">
                  <h3 className="auth-card-title flex items-center gap-2">
                    <Key size={20} className="text-amber-500" /> Register Administrator
                  </h3>
                  <p className="auth-card-subtitle">
                    Provision new administrative credentials with full portal governance rights
                  </p>
                </div>

                <form onSubmit={handleAdminRegisterSubmit} className="auth-form" noValidate>
                  <div className="form-group">
                    <label className="form-label">
                      Full Name <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <User size={16} className="input-icon" />
                      <input 
                        type="text"
                        className="form-input"
                        placeholder="e.g. Dr. A. K. Sharma"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Department / Designation <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Building size={16} className="input-icon" />
                      <input 
                        type="text"
                        className="form-input"
                        placeholder="IITTNiF Central Administration"
                        value={adminDept}
                        onChange={(e) => setAdminDept(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">
                        Official Admin Email <span className="text-required">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Mail size={16} className="input-icon" />
                        <input 
                          type="email"
                          className="form-input"
                          placeholder="admin.user@iittnif.in"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Security Passcode <span className="text-required">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Key size={16} className="input-icon" />
                        <input 
                          type="text"
                          className="form-input font-mono"
                          placeholder="VIKAS-ADMIN-2026"
                          value={adminPasscode}
                          onChange={(e) => setAdminPasscode(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Create Admin Password <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Lock size={16} className="input-icon" />
                      <input 
                        type={showAdminPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Minimum 6 characters"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                      <button 
                        type="button" 
                        className="password-toggle-btn"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                      >
                        {showAdminPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-auth-primary" 
                    disabled={loading || !adminName || !adminEmail || !adminPassword}
                    style={{ background: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #991b1b 100%)' }}
                  >
                    {loading ? (
                      <span className="btn-loading-state">
                        <span className="spinner-sm" /> Provisioning Admin...
                      </span>
                    ) : (
                      <span className="btn-label-state">
                        Register Admin & Proceed <ArrowRight size={16} />
                      </span>
                    )}
                  </button>
                </form>

                {/* Switch to Sign In */}
                <div className="auth-footer-prompt">
                  <span>Already an Admin?</span>
                  <button 
                    type="button" 
                    className="btn-link-switch"
                    onClick={() => setActiveTab('signin')}
                  >
                    Admin sign in here <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .vikas-hero-auth-container {
          position: relative;
          min-height: calc(100vh - 82px);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          background: #070c18;
          overflow: hidden;
        }

        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: 
            radial-gradient(ellipse at 15% 30%, rgba(217, 119, 6, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 85% 70%, rgba(180, 83, 9, 0.15) 0%, transparent 65%),
            radial-gradient(circle at 50% 50%, rgba(11, 18, 36, 0.96) 0%, #060b18 100%);
          z-index: 1;
        }

        .grid-overlay-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black 50%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 50%, transparent 85%);
        }

        .bokeh-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(65px);
          opacity: 0.35;
          animation: floatBokeh 20s ease-in-out infinite alternate;
        }

        .bokeh-1 {
          top: 10%;
          left: 5%;
          width: 320px;
          height: 320px;
          background: rgba(245, 158, 11, 0.28);
        }

        .bokeh-2 {
          bottom: 15%;
          left: 35%;
          width: 280px;
          height: 280px;
          background: rgba(217, 119, 6, 0.2);
          animation-delay: -5s;
        }

        .bokeh-3 {
          top: 20%;
          right: 10%;
          width: 360px;
          height: 360px;
          background: rgba(56, 189, 248, 0.15);
          animation-delay: -10s;
        }

        @keyframes floatBokeh {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.08); }
          100% { transform: translate(-20px, 30px) scale(0.95); }
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .hero-content-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .hero-left-column {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .hero-institution-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
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
          color: #e2e8f0;
          font-family: 'Outfit', 'Inter', sans-serif;
        }

        .hero-headline {
          font-size: 38px;
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff;
          letter-spacing: -0.6px;
          margin: 4px 0;
          font-family: 'Outfit', 'Inter', sans-serif;
        }

        .hero-headline-highlight {
          background: linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }

        .hero-headline-sub {
          color: #f8fafc;
        }

        .hero-accent-banner {
          position: relative;
          margin: 4px 0 8px 0;
          width: fit-content;
        }

        .accent-banner-shape {
          display: flex;
          flex-direction: column;
          background: linear-gradient(115deg, #f59e0b 0%, #d97706 35%, #b45309 70%, #991b1b 100%);
          padding: 14px 44px 14px 22px;
          clip-path: polygon(0% 0%, 94% 0%, 100% 100%, 0% 100%);
          box-shadow: 0 12px 30px rgba(217, 119, 6, 0.35);
          border-left: 4px solid #ffffff;
        }

        .accent-banner-title {
          font-size: 30px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 1.5px;
          line-height: 1.05;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .accent-banner-subtitle {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: 0.3px;
          margin-top: 3px;
        }

        .hero-playbook-tagline {
          font-size: 13.5px;
          color: #94a3b8;
          font-weight: 500;
          margin: 2px 0 10px 0;
        }

        .hero-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 6px;
        }

        @media (max-width: 640px) {
          .hero-pillars-grid {
            grid-template-columns: 1fr;
          }
        }

        .pillar-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .pillar-item:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(217, 119, 6, 0.4);
          transform: translateY(-2px);
        }

        .pillar-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .pillar-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 2px 0;
        }

        .pillar-desc {
          font-size: 11.5px;
          color: #94a3b8;
          margin: 0;
          line-height: 1.35;
        }

        .hero-right-column {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .auth-glass-card {
          width: 100%;
          max-width: 440px;
          background: rgba(13, 20, 36, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 28px 26px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(217, 119, 6, 0.12);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .auth-tab-bar {
          display: flex;
          background: rgba(0, 0, 0, 0.4);
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
          padding: 9px;
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

        .auth-header-mini {
          text-align: left;
        }

        .auth-card-title {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 4px 0;
          letter-spacing: -0.3px;
          font-family: 'Outfit', 'Inter', sans-serif;
        }

        .auth-card-subtitle {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
          line-height: 1.4;
        }

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

        .form-input {
          width: 100%;
          padding: 10px 38px 10px 36px;
          font-size: 13px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          color: #ffffff;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-input:-webkit-autofill,
        .form-input:-webkit-autofill:hover,
        .form-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0f172a inset !important;
          -webkit-text-fill-color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }

        .form-input:focus {
          outline: none;
          border-color: #f59e0b;
          background: rgba(15, 23, 42, 0.95);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
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

        .btn-auth-primary {
          margin-top: 6px;
          width: 100%;
          padding: 12px;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(217, 119, 6, 0.4);
          font-family: inherit;
        }

        .btn-auth-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(217, 119, 6, 0.5);
          filter: brightness(1.1);
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

        .demo-personas-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .demo-label {
          font-size: 10px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .demo-pills-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .demo-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          color: #cbd5e1;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 9px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .demo-pill:hover {
          background: rgba(217, 119, 6, 0.18);
          border-color: #d97706;
          color: #fef3c7;
          transform: translateY(-1px);
        }

        .auth-footer-prompt {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11.5px;
          color: #94a3b8;
          padding-top: 4px;
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
          font-size: 11.5px;
          transition: all 0.15s ease;
        }

        .btn-link-switch:hover {
          color: #fbbf24;
          text-decoration: underline;
        }

        .auth-alert-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #6ee7b7;
        }
      `}</style>
    </div>
  );
}
