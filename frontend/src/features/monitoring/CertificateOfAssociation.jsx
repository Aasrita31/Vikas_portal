import React from 'react';
import { Award, Printer, FileText } from 'lucide-react';
import iittnifLogo from '../../assets/IITTNiF logo.jpg';

function isApprovedStatus(app) {
  const status = String(app?.status || '').toLowerCase();
  return ['approved', 'engagement', 'completed'].includes(status);
}

function getStartupName(app) {
  return app?.organization || app?.contactPerson || app?.applicantName || app?.name || 'Onboarded Participant';
}

function getSignatory(app) {
  return String(app?.eSignature || '').trim();
}

export default function CertificateOfAssociation({
  applications = [],
  selectedFileNumber = null,
  onSelectFile
}) {
  const issued = (applications || []).filter((app) => isApprovedStatus(app) && getSignatory(app));
  const selected =
    issued.find((app) => app.fileNumber === selectedFileNumber) ||
    issued[0] ||
    null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="cert-page">
      <div className="cert-layout">
        <aside className="cert-list-card">
          <h2>Issued certificates</h2>
          <p>Certificates are generated only after e-sign. The signature on the certificate is the same e-sign name.</p>
          {issued.length === 0 ? (
            <div className="cert-empty">No e-signed certificates yet. Approve a file with e-sign first.</div>
          ) : (
            <ul>
              {issued.map((app) => (
                <li key={app.fileNumber}>
                  <button
                    type="button"
                    className={selected?.fileNumber === app.fileNumber ? 'active' : ''}
                    onClick={() => onSelectFile?.(app.fileNumber)}
                  >
                    <strong>{getStartupName(app)}</strong>
                    <span>{app.fileNumber}</span>
                    <em>Signed by {getSignatory(app)}</em>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div className="cert-preview-wrap">
          {!selected ? (
            <div className="cert-placeholder">
              <Award size={36} />
              <h3>Certificate of Association</h3>
              <p>Select an e-signed record to preview the certificate.</p>
            </div>
          ) : (
            <>
              <div className="cert-toolbar">
                <span>Certificate of Association</span>
                <button type="button" onClick={handlePrint}>
                  <Printer size={14} /> Print
                </button>
              </div>

              <article className="association-certificate" id="vikas-association-certificate">
                <div className="cert-gold-frame">
                  <div className="cert-inner">
                    <img src={iittnifLogo} alt="IITTNiF" className="cert-logo" />
                    <p className="cert-kicker">IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)</p>
                    <h1>Certificate of Association</h1>
                    <p className="cert-line">This is to certify that</p>
                    <h2 className="cert-entity">{getStartupName(selected)}</h2>
                    <p className="cert-line strong">is an Onboarded Participant of the VIKAS Initiative</p>
                    <p className="cert-line">of</p>
                    <p className="cert-org">IIT Tirupati Navavishkar I-Hub Foundation (IITTNiF)</p>
                    <p className="cert-body">
                      The organization is part of the VIKAS ecosystem contributing to innovation,
                      technology development, and collaborative engagements aligned with national priorities.
                    </p>

                    <div className="cert-foot">
                      <div>
                        <span className="foot-label">Date</span>
                        <strong>{selected.approvalDate || selected.lastUpdated || '—'}</strong>
                      </div>
                      <div className="cert-seal">★ IITTNiF ★</div>
                      <div className="cert-sign-block">
                        <span className="foot-label">Authorized e-sign</span>
                        <strong className="sign-script">{getSignatory(selected)}</strong>
                        <em>Project Director, IITTNiF</em>
                      </div>
                    </div>
                    <p className="cert-id">
                      <FileText size={12} />
                      File {selected.fileNumber} · VIKAS-CERT-2026-{(selected.fileNumber || '').replace(/[^A-Za-z0-9]/g, '')}
                    </p>
                  </div>
                </div>
              </article>
            </>
          )}
        </div>
      </div>

      <style>{`
        .cert-page { display: flex; flex-direction: column; gap: 16px; }
        .cert-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 16px;
          align-items: start;
        }
        .cert-list-card, .cert-placeholder {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 18px;
        }
        .cert-list-card h2 { margin: 0 0 6px; font-size: 16px; color: #0f172a; }
        .cert-list-card p { margin: 0 0 12px; font-size: 12.5px; color: #64748b; }
        .cert-list-card ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .cert-list-card button {
          width: 100%;
          text-align: left;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 10px;
          padding: 10px 12px;
          cursor: pointer;
        }
        .cert-list-card button.active {
          border-color: #d97706;
          background: #fffbeb;
        }
        .cert-list-card strong, .cert-list-card span, .cert-list-card em { display: block; }
        .cert-list-card span { color: #64748b; font-size: 11px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
        .cert-list-card em { color: #b45309; font-size: 11px; font-style: normal; font-weight: 700; }
        .cert-empty, .cert-placeholder { text-align: center; color: #64748b; padding: 28px 12px; }
        .cert-placeholder h3 { margin: 10px 0 6px; color: #0f172a; }
        .cert-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-weight: 800;
          color: #0f172a;
        }
        .cert-toolbar button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #cbd5e1;
          background: #fff;
          border-radius: 8px;
          padding: 7px 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .association-certificate { background: #fff7ed; padding: 12px; border-radius: 12px; }
        .cert-gold-frame {
          border: 10px double #b45309;
          background: linear-gradient(180deg, #fffdf8 0%, #ffffff 100%);
        }
        .cert-inner { padding: 36px 42px; text-align: center; color: #1e293b; }
        .cert-logo { height: 64px; width: auto; object-fit: contain; margin-bottom: 8px; }
        .cert-kicker { margin: 0; font-size: 12px; letter-spacing: 0.6px; text-transform: uppercase; color: #92400e; font-weight: 800; }
        .cert-inner h1 {
          margin: 14px 0 18px;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 32px;
          color: #9a3412;
          letter-spacing: 0.5px;
        }
        .cert-line { margin: 4px 0; font-size: 15px; font-family: Georgia, serif; color: #334155; }
        .cert-line.strong { font-weight: 700; color: #0f172a; }
        .cert-entity {
          margin: 10px 0 12px;
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
        }
        .cert-org { margin: 6px 0 16px; font-size: 16px; font-weight: 800; color: #9a3412; }
        .cert-body {
          max-width: 640px;
          margin: 0 auto 28px;
          font-size: 14px;
          line-height: 1.7;
          color: #475569;
          font-family: Georgia, serif;
        }
        .cert-foot {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: end;
          gap: 16px;
          margin-top: 12px;
        }
        .foot-label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.4px; color: #64748b; margin-bottom: 4px; }
        .cert-seal {
          width: 78px;
          height: 78px;
          border: 3px solid #b45309;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #b45309;
          font-size: 11px;
          font-weight: 800;
        }
        .cert-sign-block { text-align: right; }
        .sign-script {
          display: block;
          font-family: 'Palatino Linotype', Palatino, Georgia, serif;
          font-size: 22px;
          font-style: italic;
          color: #1e3a8a;
          border-bottom: 1px solid #cbd5e1;
          margin-bottom: 4px;
          padding-bottom: 2px;
        }
        .cert-sign-block em { font-style: normal; font-size: 12px; color: #64748b; }
        .cert-id {
          margin: 22px 0 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #94a3b8;
        }
        @media (max-width: 980px) {
          .cert-layout { grid-template-columns: 1fr; }
          .cert-foot { grid-template-columns: 1fr; text-align: center; }
          .cert-sign-block { text-align: center; }
        }
        @media print {
          .cert-list-card, .cert-toolbar, .admin-hero, .admin-kpi-row, .admin-tabs, .navbar-header-grid { display: none !important; }
          .cert-layout { display: block; }
          .association-certificate { background: #fff; padding: 0; }
        }
      `}</style>
    </section>
  );
}
