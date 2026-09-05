import React from 'react';
import { Radio, Server, Zap, Cpu, CheckCircle } from 'lucide-react';

// Default Institutional Testbed Dataset (Extensible via Backend / Props)
export const DEFAULT_TESTBEDS = [
  {
    id: 'pnt-testbed',
    title: 'PNT (Positioning, Navigation & Timing) Testbed',
    icon: Radio,
    color: '#10b981',
    badge: 'Navigation & Telemetry',
    points: [
      'Indigenous GPS/NavIC receiver characterization and signal telemetry validation.',
      'Sub-meter accuracy testing under noisy, spoofed, and GPS-denied environments.'
    ]
  },
  {
    id: 'geo-intel-gis',
    title: 'Geo-Intelligence & Spatial GIS Suites',
    icon: Server,
    color: '#0891b2',
    badge: 'Spatial Analytics',
    points: [
      'High-resolution satellite imagery pipelines and automated feature extraction.',
      'Spatial data processing for precision agriculture, forestry, and disaster surveillance.'
    ]
  },
  {
    id: 'edge-ai-vision',
    title: 'Edge AI & Autonomous Vision Framework',
    icon: Zap,
    color: '#d97706',
    badge: 'Embedded Intelligence',
    points: [
      'Low-latency neural network inference on ultra-low power embedded chipsets.',
      'Real-time object tracking, thermal signature analysis, and robotic navigation.'
    ]
  },
  {
    id: 'industrial-iot-sensors',
    title: 'Industrial IoT & Sensor Instrumentation',
    icon: Cpu,
    color: '#8b5cf6',
    badge: 'Reliability & Metrology',
    points: [
      'Stress, environmental, and electromagnetic compatibility testing for ruggedized deployment.',
      'Standardized calibration against national and international metrological benchmarks.'
    ]
  }
];

export default function SpecializedLabsGrid({ testbeds = DEFAULT_TESTBEDS }) {
  return (
    <div className="benefits-tab-content animate-fade-in">
      <div className="benefits-parent-card card">
        <div className="benefits-parent-header">
          <div className="badge-pill badge-emerald">
            <Radio size={14} />
            <span>Lab Integration Matrix</span>
          </div>
          <h3>Advanced Cyber-Physical Systems Testbeds</h3>
        </div>

        <div className="benefits-items-grid mt-20">
          {testbeds.map((lab) => {
            const IconComponent = lab.icon || Radio;

            return (
              <div key={lab.id} className="benefit-feature-card">
                <div className="feature-icon-header">
                  <div 
                    className="feature-icon-wrap" 
                    style={{ 
                      backgroundColor: `${lab.color}18`, 
                      color: lab.color,
                      border: `1px solid ${lab.color}30`
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <h4>{lab.title}</h4>
                </div>

                <ul className="benefit-bullets-list">
                  {lab.points.map((point, pIdx) => (
                    <li key={pIdx}>
                      <CheckCircle 
                        size={14} 
                        className="flex-shrink-0" 
                        style={{ color: lab.color, marginTop: '2px' }} 
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
