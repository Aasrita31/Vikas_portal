import React, { useState } from 'react';

export default function UnsavedChangesModal({ 
  isOpen, 
  title = "Leave site?", 
  message = "Changes you made may not be saved.", 
  onConfirm, 
  onCancel,
  onPreventDialogsChange
}) {
  const [preventAdditional, setPreventAdditional] = useState(false);

  if (!isOpen) return null;

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setPreventAdditional(checked);
    if (onPreventDialogsChange) {
      onPreventDialogsChange(checked);
    }
  };

  return (
    <div className="unsaved-modal-overlay" onClick={onCancel}>
      <div 
        className="unsaved-modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="unsaved-modal-title"
      >
        <h3 id="unsaved-modal-title" className="unsaved-modal-title">{title}</h3>
        <p className="unsaved-modal-message">{message}</p>

        <label className="unsaved-modal-checkbox-row">
          <input 
            type="checkbox" 
            className="unsaved-checkbox"
            checked={preventAdditional}
            onChange={handleCheckboxChange}
          />
          <span className="unsaved-checkbox-label">
            Prevent this page from creating additional dialogs
          </span>
        </label>

        <div className="unsaved-modal-actions">
          <button 
            type="button"
            className="btn-leave-site"
            onClick={onConfirm}
            autoFocus
          >
            Leave
          </button>
          <button 
            type="button"
            className="btn-cancel-leave"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        .unsaved-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          padding: 20px;
          animation: overlayFadeIn 0.15s ease-out;
        }

        .unsaved-modal-dialog {
          background-color: #1a2027;
          color: #f1f5f9;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 26px 28px 22px 28px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08);
          animation: dialogPop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes dialogPop {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .unsaved-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 12px 0;
          letter-spacing: -0.3px;
        }

        .unsaved-modal-message {
          font-size: 14.5px;
          color: #cbd5e1;
          margin: 0 0 20px 0;
          line-height: 1.5;
        }

        .unsaved-modal-checkbox-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 26px;
          cursor: pointer;
          user-select: none;
        }

        .unsaved-checkbox {
          width: 16px;
          height: 16px;
          accent-color: #38bdf8;
          border-radius: 3px;
          cursor: pointer;
        }

        .unsaved-checkbox-label {
          font-size: 13.5px;
          color: #94a3b8;
          transition: color 0.15s ease;
        }

        .unsaved-modal-checkbox-row:hover .unsaved-checkbox-label {
          color: #e2e8f0;
        }

        .unsaved-modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }

        .btn-leave-site {
          background-color: #c7dbdb;
          color: #0f172a;
          border: 2px solid #0f172a;
          box-shadow: 0 0 0 2px #c7dbdb;
          font-size: 14px;
          font-weight: 700;
          padding: 8px 24px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-leave-site:hover {
          background-color: #e2efee;
          transform: translateY(-1px);
        }

        .btn-leave-site:active {
          transform: translateY(0);
        }

        .btn-cancel-leave {
          background-color: #2e3846;
          color: #f1f5f9;
          border: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 14px;
          font-weight: 600;
          padding: 8px 22px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-cancel-leave:hover {
          background-color: #3b4759;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
