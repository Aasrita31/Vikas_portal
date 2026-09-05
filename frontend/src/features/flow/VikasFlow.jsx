import React, { useState } from 'react';
import { 
  ArrowRight, 
  Users, 
  FileText, 
  Layers, 
  GitBranch, 
  Award, 
  Activity, 
  Settings, 
  LineChart, 
  CheckCircle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  UserCheck,
  Building2,
  GraduationCap,
  Map,
  Network,
  ShieldCheck,
  User,
  Cpu,
  Target,
  Link,
  Bookmark,
  TrendingUp,
  HelpCircle
} from 'lucide-react';

export default function VikasFlow() {
  const [zoom, setZoom] = useState(0.85); // Default scale to fit layout nicely
  const [activeStage, setActiveStage] = useState(null); // Click to highlight

  const flowData = {
    name: "VIKAS Platform",
    stages: [
      {
        id: "1",
        name: "1. Entry Point",
        desc: "Single-window portal entry point.",
        icon: ArrowRight,
        children: [
          { name: "Registration Form (Unlisted)", icon: FileText, desc: "Onboarding submission entry logs" }
        ]
      },
      {
        id: "2",
        name: "2. Stakeholder Type Selection",
        desc: "Categorize type of engagement.",
        icon: Users,
        children: [
          { name: "Expert", icon: UserCheck, desc: "Senior advisory network review panel" },
          { name: "Startup", icon: Building2, desc: "Commercial startup and innovation pillars" },
          { name: "Student / Researcher", icon: GraduationCap, desc: "Fellowships and internships" },
          { name: "School", icon: Map, desc: "VidyaGyan GIS spatial programs network" },
          { name: "Institution", icon: Layers, desc: "SPRI Labs and joint Centres of Excellence" },
          { name: "Industry", icon: Network, desc: "Consultancy and joint industry research" },
          { name: "Government", icon: ShieldCheck, desc: "Government pilot program interfaces" }
        ]
      },
      {
        id: "3",
        name: "3. Data Capture",
        desc: "Capturing domain alignment and intents.",
        icon: FileText,
        children: [
          { name: "Profile Details", icon: User, desc: "Applicant credential checks" },
          { name: "Domain / Interest", icon: Cpu, desc: "NM-ICPS core alignment fields" },
          { 
            name: "Intent", 
            icon: Target, 
            desc: "Primary engagement objectives",
            nested: [
              { name: "Learning", desc: "Upskilling and certifications" },
              { name: "Collaboration", desc: "Joint MoU programs" },
              { name: "Project", desc: "TDP prototype developments" },
              { name: "Business", desc: "Commercial deployment and pilots" }
            ]
          }
        ]
      },
      {
        id: "4",
        name: "4. Screening Layer",
        desc: "Operational validation and classification.",
        icon: Layers,
        children: [
          { name: "Basic Validation", icon: CheckCircle, desc: "Document check & authenticity validation" },
          { name: "Categorization", icon: GitBranch, desc: "Mapping to vertical classification matrices" }
        ]
      },
      {
        id: "5",
        name: "5. Routing Engine",
        desc: "Intelligent assignment to active streams.",
        icon: GitBranch,
        children: [
          { name: "Technology Development", icon: Cpu, desc: "6.1 TDP prototype translation" },
          { name: "Startups & Business", icon: Building2, desc: "6.2 Startup onboarding & support" },
          { name: "HRD / Fellowships", icon: Users, desc: "6.3 Fellow recruitment" },
          { name: "Skill Development", icon: GraduationCap, desc: "6.4 UPSKILLING certifications" },
          { name: "Collaborations", icon: Link, desc: "6.5 Partnerships & MoUs allocation" },
          { name: "Schools & Academic Outreach", icon: Map, desc: "6.6 Spatial learning & school outreach" },
          { name: "Institutions (SPRI Labs)", icon: Layers, desc: "6.7 SPRI & SPIN Labs networks" },
          { name: "Industry / Government", icon: Network, desc: "6.8 Consultancy pilots mapping" },
          { name: "Experts Network", icon: UserCheck, desc: "6.9 Advisory and mentoring network" }
        ]
      },
      {
        id: "6",
        name: "6. PD Oversight Layer",
        desc: "Governance authorizations and tags.",
        icon: Award,
        children: [
          { name: "Strategic Approval (if required)", icon: ShieldCheck, desc: "PD sign-off on strategic files" },
          { name: "Priority Tagging", icon: Bookmark, desc: "Tagging national key NM-ICPS projects" }
        ]
      },
      {
        id: "7",
        name: "7. Engagement Layer",
        desc: "Structuring allocations and setups.",
        icon: Activity,
        children: [
          { name: "Project Allocation", icon: FileText, desc: "Assigning TDP contracts" },
          { name: "Program Participation", icon: GraduationCap, desc: "Fellowship and training setups" },
          { name: "Training / Mentoring", icon: UserCheck, desc: "Connecting review panel mentors" },
          { name: "Collaboration Setup", icon: Link, desc: "Activating MoUs operational workflows" }
        ]
      },
      {
        id: "8",
        name: "8. Execution Layer",
        desc: "Active deployment in labs and domains.",
        icon: Settings,
        children: [
          { name: "Labs / Teams / Startups", icon: Cpu, desc: "Deployment in SPRI/PNT active labs" },
          { name: "Industry / Govt Interface", icon: Network, desc: "Running consultancies and pilots" }
        ]
      },
      {
        id: "9",
        name: "9. Tracking & Monitoring",
        desc: "Milestone checks and KPI dashboards.",
        icon: LineChart,
        children: [
          { name: "Dashboard", icon: FileText, desc: "Live operational file dashboard" },
          { name: "KPIs", icon: Activity, desc: "Performance outcomes scorecard" },
          { 
            name: "Outcomes", 
            icon: TrendingUp, 
            desc: "Strategic output metrics",
            nested: [
              { name: "Revenue", desc: "Commercial value & consultancies" },
              { name: "Technology", desc: "TDP prototypes and patents" },
              { name: "Training", desc: "Skilled manpower headcount logs" }
            ]
          }
        ]
      },
      {
        id: "10",
        name: "10. Output",
        desc: "Final outcome vectors.",
        icon: CheckCircle,
        children: [
          { name: "Technology Development", icon: Cpu, desc: "Indigenized technology translation" },
          { name: "Business Generated", icon: TrendingUp, desc: "New startups and commercial jobs" },
          { name: "Skilled Workforce", icon: GraduationCap, desc: "High-value engineered workforce" },
          { name: "Partnerships", icon: Link, desc: "Active strategic partnerships ecosystem" }
        ]
      }
    ]
  };

  const handleZoom = (type) => {
    if (type === 'in') setZoom(prev => Math.min(prev + 0.1, 1.2));
    if (type === 'out') setZoom(prev => Math.max(prev - 0.1, 0.5));
    if (type === 'reset') setZoom(0.85);
  };

  const handleStageClick = (stageId) => {
    setActiveStage(prev => prev === stageId ? null : stageId);
  };

  return (
    <div className="flow-outer-container">
      {/* Zoom Control Panel */}
      <div className="flow-zoom-controls card">
        <button className="zoom-btn" onClick={() => handleZoom('in')} title="Zoom In">
          <ZoomIn size={16} />
        </button>
        <button className="zoom-btn" onClick={() => handleZoom('out')} title="Zoom Out">
          <ZoomOut size={16} />
        </button>
        <button className="zoom-btn" onClick={() => handleZoom('reset')} title="Reset Zoom">
          <RotateCcw size={16} />
        </button>
        <span className="zoom-indicator">{(zoom * 100).toFixed(0)}%</span>
      </div>

      {/* Guide Banner */}
      <div className="flow-guide-banner card">
        <HelpCircle size={16} className="text-accent" />
        <span>Click any stage card below to highlight its complete path and options in gold.</span>
      </div>

      {/* Viewport with Zoom Scale Transform */}
      <div className="flow-viewport-scroll">
        <div 
          className="flow-viewport-content"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'top center'
          }}
        >
          {/* ROOT node */}
          <div className="flow-root-container">
            <div className={`flow-root-node card ${activeStage === 'root' ? 'active-root' : ''}`} onClick={() => setActiveStage(activeStage === 'root' ? null : 'root')}>
              <div className="root-logo">VIKAS</div>
              <h2>VIKAS Platform Journey</h2>
              <p>National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS)</p>
            </div>
            <div className={`flow-connector-vertical ${activeStage ? 'highlight-connector' : ''}`}></div>
          </div>

          {/* Iterating the 10 stages */}
          {flowData.stages.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isStageActive = activeStage === stage.id;
            
            return (
              <div 
                key={stage.id} 
                className={`flow-stage-row ${isStageActive ? 'active-stage-row' : ''}`}
              >
                {/* 1. Parent Node */}
                <div className="stage-parent-wrapper">
                  <div 
                    className="stage-parent-card card" 
                    onClick={() => handleStageClick(stage.id)}
                  >
                    <div className="stage-parent-header">
                      <div className="stage-icon-box">
                        <StageIcon size={16} />
                      </div>
                      <h3>{stage.name}</h3>
                    </div>
                    <p>{stage.desc}</p>
                  </div>
                </div>

                {/* 2. Vertical Line from Parent to Child container */}
                {stage.children && stage.children.length > 0 && (
                  <div className="stage-connector-block">
                    <div className="connector-vertical-line"></div>
                  </div>
                )}

                {/* 3. Children Container (Horizontal Layout) */}
                {stage.children && stage.children.length > 0 && (
                  <div className="stage-children-row">
                    {stage.children.map((child, cIdx) => {
                      const ChildIcon = child.icon;
                      return (
                        <div key={cIdx} className="child-node-wrapper">
                          <div className="child-node-card card">
                            <div className="child-header">
                              <ChildIcon size={14} className="text-accent" />
                              <h4>{child.name}</h4>
                            </div>
                            <p>{child.desc}</p>

                            {/* Render Nested Children Options (Intent, Outcomes) */}
                            {child.nested && (
                              <div className="nested-children-block">
                                <div className="nested-connector-line"></div>
                                <div className="nested-grid">
                                  {child.nested.map((nest, nIdx) => (
                                    <div key={nIdx} className="nested-node card">
                                      <h5>{nest.name}</h5>
                                      <p>{nest.desc}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 4. Vertical Connector Down to Next Stage Parent */}
                {idx < flowData.stages.length - 1 && (
                  <div className="stage-to-stage-connector">
                    <div className="connector-vertical-line tall"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .flow-outer-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Floating Zoom Controls */
        .flow-zoom-controls {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          box-shadow: var(--shadow-lg);
          border-color: var(--border-color-active);
          background-color: var(--bg-surface);
        }

        .zoom-btn {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .zoom-btn:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
          background-color: var(--bg-primary);
        }

        .zoom-indicator {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          min-width: 36px;
          text-align: right;
        }

        /* Guide Banner */
        .flow-guide-banner {
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--color-accent-glow);
          border-color: rgba(var(--color-accent-rgb), 0.15);
        }

        /* Viewport Scroll Areas */
        .flow-viewport-scroll {
          flex: 1;
          overflow: auto;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          background-color: var(--bg-primary);
          padding: 40px;
          position: relative;
        }

        .flow-viewport-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-width: 1000px; /* Force minimum width to keep wide branches aligned horizontally */
          transition: transform 0.2s ease-out;
        }

        /* ROOT NODE */
        .flow-root-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .flow-root-node {
          width: 360px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          border: 2px solid var(--border-color);
          transition: all var(--transition-fast);
        }

        .flow-root-node:hover {
          transform: translateY(-2px);
          border-color: var(--border-color-active);
          box-shadow: var(--shadow-md);
        }

        .flow-root-node.active-root {
          border-color: var(--color-accent);
          box-shadow: 0 0 20px var(--color-accent-glow);
        }

        .root-logo {
          background: linear-gradient(135deg, var(--color-accent), #b45309);
          color: #ffffff;
          padding: 6px 16px;
          border-radius: var(--radius-sm);
          font-weight: 800;
          font-size: 18px;
          display: inline-block;
          margin-bottom: 12px;
          letter-spacing: 1px;
          box-shadow: 0 0 10px rgba(var(--color-accent-rgb), 0.2);
        }

        .flow-root-node h2 {
          font-size: 18px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .flow-root-node p {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
          font-weight: 600;
        }

        /* FLOWTIMELINE CONNECTORS */
        .flow-connector-vertical {
          width: 2px;
          height: 32px;
          background-color: var(--border-color);
          position: relative;
        }

        .flow-connector-vertical:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid var(--border-color);
        }

        .highlight-connector {
          background-color: var(--color-accent);
        }

        .highlight-connector:after {
          border-top-color: var(--color-accent);
        }

        /* STAGE ROW WRAPPER */
        .flow-stage-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .stage-parent-wrapper {
          z-index: 10;
        }

        .stage-parent-card {
          width: 320px;
          padding: 16px 20px;
          cursor: pointer;
          border-color: var(--border-color);
          transition: all var(--transition-fast);
          background-color: var(--bg-surface);
        }

        .stage-parent-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-color-active);
          box-shadow: var(--shadow-md);
        }

        .stage-parent-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .stage-icon-box {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background-color: var(--color-accent-glow);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(var(--color-accent-rgb), 0.15);
        }

        .stage-parent-header h3 {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stage-parent-card p {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Drop line from Parent to child bridge */
        .stage-connector-block {
          width: 2px;
          height: 20px;
          position: relative;
          background-color: var(--border-color);
        }

        .connector-vertical-line {
          width: 100%;
          height: 100%;
          background-color: inherit;
        }

        /* Children Grid Row Layout (Horizontal bridge lines) */
        .stage-children-row {
          display: flex;
          justify-content: center;
          gap: 16px;
          position: relative;
          width: 100%;
          padding-top: 20px;
          margin-top: -2px;
        }

        /* Bridge Line spanning child nodes (Classic Tree structure) */
        .child-node-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding-top: 16px;
          flex: 1;
          max-width: 200px;
          min-width: 140px;
        }

        /* Horizontal Connector logic */
        .child-node-wrapper:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          border-top: 2px solid var(--border-color);
        }

        .child-node-wrapper:first-child:after {
          left: 50%;
        }

        .child-node-wrapper:last-child:after {
          right: 50%;
        }

        .child-node-wrapper:only-child:after {
          display: none;
        }

        /* Child Drop Line pointing down into node */
        .child-node-wrapper:before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 16px;
          background-color: var(--border-color);
          transform: translateX(-50%);
        }

        /* Child card styling */
        .child-node-card {
          width: 100%;
          padding: 12px;
          border-radius: var(--radius-md);
          background-color: var(--bg-surface);
          border-color: var(--border-color);
          box-shadow: var(--shadow-sm);
          min-height: 96px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: all var(--transition-fast);
        }

        .child-node-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-color-active);
          box-shadow: var(--shadow-md);
        }

        .child-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .child-header h4 {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          word-break: break-word;
        }

        .child-node-card p {
          font-size: 10px;
          color: var(--text-muted);
          line-height: 1.3;
        }

        /* Vertical Connector Down to Next Stage Parent Node */
        .stage-to-stage-connector {
          width: 2px;
          height: 32px;
          background-color: var(--border-color);
          position: relative;
          z-index: 1;
        }

        .connector-vertical-line.tall {
          width: 100%;
          height: 100%;
          background-color: inherit;
        }

        .stage-to-stage-connector:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid var(--border-color);
        }

        /* NESTED CHILDREN NODES (Intent and Outcomes) */
        .nested-children-block {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .nested-connector-line {
          width: 2px;
          height: 12px;
          background-color: var(--border-color);
        }

        .nested-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          width: 100%;
          border-top: 1px solid var(--border-color);
          padding-top: 8px;
          margin-top: -1px;
        }

        .nested-node {
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          background-color: var(--bg-primary);
          border-color: var(--border-color);
          min-height: 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .nested-node h5 {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .nested-node p {
          font-size: 8px;
          color: var(--text-muted);
          line-height: 1.2;
          margin-top: 1px;
        }

        /* DYNAMIC ACTIVE STAGE HIGHLIGHTS */
        .active-stage-row .stage-parent-card {
          border-color: var(--color-accent);
          box-shadow: 0 0 16px var(--color-accent-glow);
          background-color: rgba(var(--color-accent-rgb), 0.03);
        }

        .active-stage-row .stage-parent-header h3 {
          color: var(--color-accent);
        }

        .active-stage-row .child-node-card {
          border-color: var(--color-accent);
          box-shadow: 0 0 10px var(--color-accent-glow);
        }

        .active-stage-row .child-header h4 {
          color: var(--color-accent);
        }

        .active-stage-row .nested-node {
          border-color: var(--color-accent);
        }

        .active-stage-row .nested-node h5 {
          color: var(--color-accent);
        }

        /* Connectors highlighting */
        .active-stage-row .connector-vertical-line,
        .active-stage-row .stage-connector-block,
        .active-stage-row .stage-to-stage-connector,
        .active-stage-row .nested-connector-line,
        .active-stage-row .child-node-wrapper:before {
          background-color: var(--color-accent) !important;
        }

        .active-stage-row .child-node-wrapper:after,
        .active-stage-row .nested-grid {
          border-color: var(--color-accent) !important;
        }

        .active-stage-row .stage-to-stage-connector:after {
          border-top-color: var(--color-accent) !important;
        }
      `}</style>
    </div>
  );
}
