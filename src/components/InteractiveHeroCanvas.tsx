import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseRadius: number;
  color: string;
  energy: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

export const InteractiveHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Mouse interaction coordinates
    let mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    // Particles config
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 32 : 64;
    const CONNECTION_DIST = isMobile ? 100 : 140;
    const particles: Particle[] = [];
    const pulses: Pulse[] = [];

    // Colors matching CII.IA brand: Steel 300, Steel 500, Steel 100, and Muted Blue
    const colors = [
      'rgba(92, 169, 219, ',   // #5CA9DB (Brand Steel 300)
      'rgba(140, 198, 236, ',  // #8CC6EC (Steel 100)
      'rgba(41, 114, 159, ',   // #29729F (Steel 500)
      'rgba(180, 215, 245, ',  // Light Highlight
    ];

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();

    // Initialize particles in 3D-projected space
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 400 - 200,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.25,
        baseRadius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        energy: Math.random(),
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', resize);
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Render loop
    let lastTime = performance.now();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse cursor interpolation
      if (mouse.isHovered) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.05;
        mouse.y += (-1000 - mouse.y) * 0.05;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background cybernetic grid lines
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(38, 40, 45, 0.35)';
      const gridSize = 48;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Update particle positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce within boundaries
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }
        if (p.z < -200 || p.z > 200) { p.vz *= -1; }

        // Reactive interaction with cursor
        if (mouse.isHovered) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;
          if (dist < maxDist && dist > 1) {
            const force = (1 - dist / maxDist) * 1.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.energy = Math.min(1, p.energy + 0.05);
          }
        }

        // Energy decay
        p.energy = Math.max(0.2, p.energy - dt * 0.3);
      }

      // Draw connections (Neural Mesh)
      const connections: [number, number, number][] = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            connections.push([i, j, dist]);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(92, 169, 219, ${alpha})`;
            ctx.lineWidth = Math.max(0.6, 1.4 * (1 - dist / CONNECTION_DIST));
            ctx.stroke();
          }
        }
      }

      // Randomly create pulses along connections
      if (Math.random() < 0.04 && connections.length > 0 && pulses.length < 8) {
        const conn = connections[Math.floor(Math.random() * connections.length)];
        pulses.push({
          fromIdx: conn[0],
          toIdx: conn[1],
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
        });
      }

      // Draw active pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const p1 = particles[pulse.fromIdx];
        const p2 = particles[pulse.toIdx];
        if (!p1 || !p2) continue;

        const curX = p1.x + (p2.x - p1.x) * pulse.progress;
        const curY = p1.y + (p2.y - p1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#8CC6EC';
        ctx.shadowColor = '#5CA9DB';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const scale = (p.z + 300) / 400; // Depth scale
        const r = Math.max(1, p.baseRadius * scale);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        const alpha = Math.min(1, (0.4 + p.energy * 0.6) * scale);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        // Subtle glow for highest energy nodes
        if (p.energy > 0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(92, 169, 219, ${0.15 * p.energy})`;
          ctx.fill();
        }
      }

      // Draw coordinate crosshairs near mouse position
      if (mouse.isHovered) {
        ctx.strokeStyle = 'rgba(92, 169, 219, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 12, mouse.y);
        ctx.lineTo(mouse.x + 12, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 12);
        ctx.lineTo(mouse.x, mouse.y + 12);
        ctx.stroke();

        ctx.font = '9px "Source Code Pro", monospace';
        ctx.fillStyle = 'rgba(140, 198, 236, 0.7)';
        ctx.fillText(`LATENCY: 4.2ms [OPC-UA]`, mouse.x + 16, mouse.y + 4);
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden select-none"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
      {/* Subtle radial vignette gradient to blend edges seamlessly into background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-transparent to-[#0A0A0B]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B] pointer-events-none" />
    </div>
  );
};
