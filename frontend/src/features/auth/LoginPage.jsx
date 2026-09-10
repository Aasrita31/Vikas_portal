import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage({ onNavigateToRegister, onLoginSuccess }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validate email format
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const isFormIncomplete = !email.trim() || !password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic required field validation
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

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper animate-slide-down">
        {/* Header Branding */}
        <div className="login-card-header">
          <div className="login-brand-badge">
            <ShieldCheck size={28} className="text-accent" />
          </div>
          <h2 className="login-card-title">Sign in to VIKAS</h2>
          <p className="login-card-subtitle">
            Technology Development, Startup Enablement & Ecosystem Onboarding Platform
          </p>
          <div className="login-institution-tag font-mono">
            IIT TIRUPATI NAVAVISHKAR I-HUB FOUNDATION (IITTNiF)
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="login-error-banner animate-fade-in">
            <AlertCircle size={18} className="error-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form" noValidate>
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
                placeholder="Enter your registered email address"
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
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-submit-login" 
            disabled={loading || isFormIncomplete}
          >
            {loading ? (
              <span className="btn-loading-state">
                <span className="spinner-sm" /> Authenticating...
              </span>
            ) : (
              <span className="btn-label-state">
                Sign In <ArrowRight size={16} />
              </span>
            )}
          </button>
        </form>

        {/* Link to Registration */}
        <div className="register-prompt-box">
          <span className="prompt-text">Don't have a VIKAS account?</span>
          <button 
            type="button" 
            className="btn-link-register"
            onClick={onNavigateToRegister}
          >
            Register <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .login-page-container {
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: radial-gradient(circle at 50% 20%, rgba(var(--color-accent-rgb), 0.06), transparent 70%);
        }

        .login-card-wrapper {
          width: 100%;
          max-width: 480px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .login-card-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-brand-badge {
          width: 54px;
          height: 54px;
          border-radius: var(--radius-md);
          background-color: rgba(var(--color-accent-rgb), 0.1);
          border: 1px solid rgba(var(--color-accent-rgb), 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .login-card-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 6px 0;
          letter-spacing: -0.3px;
        }

        .login-card-subtitle {
          font-size: 12.5px;
          color: var(--text-secondary);
          margin: 0 0 10px 0;
          line-height: 1.4;
          max-width: 360px;
        }

        .login-institution-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--color-accent);
          letter-spacing: 0.5px;
          background-color: rgba(var(--color-accent-rgb), 0.08);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .login-error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 12.5px;
          line-height: 1.35;
        }

        .login-error-banner .error-icon {
          flex-shrink: 0;
          color: #dc2626;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .text-required {
          color: #dc2626;
          margin-left: 2px;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 10px 38px 10px 36px;
          font-size: 13px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-accent);
          background-color: var(--bg-surface);
          box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.12);
        }

        .password-toggle-btn {
          position: absolute;
          right: 10px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-fast);
        }

        .password-toggle-btn:hover {
          color: var(--text-primary);
        }

        .btn-submit-login {
          margin-top: 8px;
          width: 100%;
          padding: 11px;
          background-color: var(--color-accent);
          color: #ffffff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(var(--color-accent-rgb), 0.25);
        }

        .btn-submit-login:hover:not(:disabled) {
          background-color: var(--color-accent-hover, #0284c7);
          transform: translateY(-1px);
        }

        .btn-submit-login:disabled {
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

        .register-prompt-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 12.5px;
        }

        .prompt-text {
          color: var(--text-secondary);
        }

        .btn-link-register {
          background: transparent;
          border: none;
          color: var(--color-accent);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0;
          transition: transform var(--transition-fast);
        }

        .btn-link-register:hover {
          text-decoration: underline;
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}
