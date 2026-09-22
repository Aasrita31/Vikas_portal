import React, { useEffect, useRef } from 'react';

export default function LandingHeroWave({ theme = 'bright' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame;
    let running = true;
    let width = 0;
    let height = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.max(90, Math.floor(width / 7));
      const rows = 9;
      const phase = reduceMotion ? 0 : time * 0.00035;
      const isDark = theme === 'dark';

      for (let i = 0; i < cols; i += 1) {
        const nx = i / (cols - 1);
        const x = nx * width;
        const valley = 1 - Math.sin(nx * Math.PI);
        const wave = Math.sin(nx * Math.PI * 2 + phase) * 6;
        const y = height * 0.26 + valley * height * 0.46 + wave;
        const tangent = -Math.PI * Math.cos(nx * Math.PI) * height * 0.46;
        const angle = Math.atan2(tangent, width);
        const dashH = 5 + (1 - valley) * 8;

        for (let r = 0; r < rows; r += 1) {
          const spread = r - (rows - 1) / 2;
          const fade = 1 - Math.abs(spread) / ((rows - 1) / 2);
          const nxOff = Math.cos(angle + Math.PI / 2) * spread * 3.2;
          const nyOff = Math.sin(angle + Math.PI / 2) * spread * 3.2;
          const alpha = (0.12 + fade * 0.42) * (0.55 + (1 - valley) * 0.45);
          const goldMix = 1 - valley;

          if (isDark) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          } else {
            const g = Math.round(158 + goldMix * 60);
            ctx.fillStyle = `rgba(30, ${Math.round(58 + goldMix * 20)}, ${g}, ${alpha * 0.85})`;
          }

          ctx.save();
          ctx.translate(x + nxOff, y + nyOff);
          ctx.rotate(angle);
          ctx.fillRect(-0.7, -dashH / 2, 1.5, dashH);
          ctx.restore();
        }
      }

      if (!reduceMotion) {
        frame = requestAnimationFrame(draw);
      }
    };

    size();
    draw(0);
    const onResize = () => {
      size();
      if (reduceMotion) draw(0);
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  return (
    <div className="landing-hero-wave-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="landing-hero-wave" />
    </div>
  );
}
