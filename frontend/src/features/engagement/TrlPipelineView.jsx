import React from 'react';
import { 
  TrendingUp, 
  ArrowDown, 
  ArrowRight, 
  FileCheck, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Radio, 
  Target, 
  Building2, 
  Award,
  CheckCircle2
} from 'lucide-react';

// Data-driven TRL Pipeline Stages (TRL 3 -> TRL 6)
export const DEFAULT_TRL_PIPELINE = [
  {
    trl: 'TRL 3',
    stageName: 'Experimental Proof of Concept',
    color: '#3b82f6',
    desc: 'Analytical and laboratory studies validating the feasibility of core cyber-physical principles and algorithmic concepts.',
    evidence: 'Mathematical models, simulation benchmarks, breadboard schematics, and preliminary signal telemetry logs.',
    criteria: 'Empirical verification of fundamental scientific principles in isolated laboratory conditions.'
  },
  {
    trl: 'TRL 4',
    stageName: 'Laboratory Validation',
    color: '#0891b2',
    desc: 'Integration of basic technological components working together as an end-to-end subsystem inside testing rigs.',
    evidence: 'Integrated hardware/software test bench data, PCB prototypes, automated telemetry test reports, and latency benchmarks.',
    criteria: 'Continuous repeatable execution and error-free inter-component communication in controlled test environments.'
  },
  {
    trl: 'TRL 5',
    stageName: 'Relevant Environment Validation',
    color: '#d97706',
    desc: 'Rigorous validation of the integrated technology model in realistic simulated or semi-operational environmental stress conditions.',
    evidence: 'Environmental chamber test logs (temperature, humidity, vibration), EMC/EMI compliance reports, and spoofing tolerance records.',
    criteria: 'Demonstrated operational stability, high signal-to-noise ratio, and environmental resilience under stress conditions.'
  },
  {
    trl: 'TRL 6',
    stageName: 'Verified Field Prototype',
    color: '#10b981',
    desc: 'Engineering model demonstration tested in actual target operational conditions and real-world stakeholder deployment scenarios.',
    evidence: 'Field trial deployment logs, operational user validation certificate, pilot benchmark report, and full manufacturing dossier.',
    criteria: 'Successful on-site verification meeting functional mission requirements in relevant operational field environments.'
  }
];

// 6-step Research to Deployment Translation Flow
export const RESEARCH_TO_DEPLOYMENT_FLOW = [
  { id: 1, label: 'Research Concept', icon: Sparkles, color: '#3b82f6' },
  { id: 2, label: 'Prototype', icon: Cpu, color: '#0891b2' },
  { id: 3, label: 'Laboratory Validation', icon: Radio, color: '#0d9488' },
  { id: 4, label: 'Field Validation', icon: Target, color: '#d97706' },
  { id: 5, label: 'Industry Co-development', icon: Building2, color: '#8b5cf6' },
  { id: 6, label: 'Deployment / Commercialization', icon: Award, color: '#10b981' }
];

export default function TrlPipelineView({ 
  stages = DEFAULT_TRL_PIPELINE,
  flowSteps = RESEARCH_TO_DEPLOYMENT_FLOW 
}) {
  return (
    <div className="benefits-tab-content animate-fade-in">
      <div className="benefits-parent-card card">
        {/* Section Header */}
        <div className="benefits-parent-header">
          <div className="badge-pill badge-cyan">
            <TrendingUp size={14} />
            <span>Technology Maturation Matrix</span>
          </div>
          <h3>Structured TRL Progression Pipeline (TRL 3 → TRL 6)</h3>
          <p className="section-narrative-subtext">
            Standardized stage-gate evaluation framework guiding projects from experimental concept to mission-ready field prototypes.
          </p>
        </div>

        {/* 1. TRL Maturation Pipeline Vertical Stepper */}
        <div className="trl-maturation-pipeline mt-20">
          {stages.map((stage, index) => {
            const isLast = index === stages.length - 1;

            return (
              <div key={stage.trl} className="trl-pipeline-node">
                <div 
                  className="trl-pipeline-card"
                  style={{ borderLeft: `4px solid ${stage.color}` }}
                >
                  <div className="trl-card-top">
                    <div className="trl-title-group">
                      <span 
                        className="trl-badge font-mono"
                        style={{ 
                          backgroundColor: `${stage.color}15`, 
                          color: stage.color, 
                          borderColor: `${stage.color}35` 
                        }}
                      >
                        {stage.trl}
                      </span>
                      <h4 className="trl-stage-name">{stage.stageName}</h4>
                    </div>
                    <span 
                      className="trl-gate-pill" 
                      style={{ color: stage.color, backgroundColor: `${stage.color}10`, borderColor: `${stage.color}25` }}
                    >
                      Stage 0{index + 1}
                    </span>
                  </div>

                  <p className="trl-stage-desc">{stage.desc}</p>

                  <div className="trl-criteria-grid">
                    <div className="trl-criteria-box">
                      <div className="criteria-header">
                        <FileCheck size={14} className="text-cyan" />
                        <span>Expected Evidence / Output</span>
                      </div>
                      <p className="criteria-text">{stage.evidence}</p>
                    </div>

                    <div className="trl-criteria-box">
                      <div className="criteria-header">
                        <ShieldCheck size={14} className="text-emerald" />
                        <span>Transition Criteria</span>
                      </div>
                      <p className="criteria-text">{stage.criteria}</p>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div className="trl-pipeline-connector">
                    <div className="connector-line"></div>
                    <div className="connector-icon-badge">
                      <ArrowDown size={14} />
                    </div>
                    <div className="connector-line"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. From Research to Deployment Flow Section */}
        <div className="research-deployment-container mt-24">
          <div className="research-deployment-header">
            <div className="badge-pill badge-emerald">
              <CheckCircle2 size={13} />
              <span>Translational Trajectory</span>
            </div>
            <h4>From Research to Deployment</h4>
            <p>Institutional stage-gate journey from foundational hypothesis to national ecosystem adoption</p>
          </div>

          <div className="deployment-flow-track mt-16">
            {flowSteps.map((step, idx) => {
              const IconComponent = step.icon;
              const isLast = idx === flowSteps.length - 1;

              return (
                <React.Fragment key={step.id}>
                  <div className="deployment-flow-step">
                    <div 
                      className="step-icon-circle"
                      style={{ 
                        backgroundColor: `${step.color}15`, 
                        color: step.color, 
                        borderColor: `${step.color}35` 
                      }}
                    >
                      <IconComponent size={18} />
                    </div>
                    <span className="step-number-tag font-mono">0{step.id}</span>
                    <span className="step-label-text">{step.label}</span>
                  </div>

                  {!isLast && (
                    <div className="flow-step-arrow">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
