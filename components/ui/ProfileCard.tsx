import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#0f2e428c 0%,#5ca9db33 100%)';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  ENTER_TRANSITION_MS: 180,
} as const;

const clamp = (v: number, min = 0, max = 100): number => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3): number => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number): number =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const KEYFRAMES_ID = 'pc-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `@keyframes pc-holo-bg { 0% { background-position: 0 var(--background-y), 0 0, center; } 100% { background-position: 0 var(--background-y), 90% 90%, center; } }`;
  document.head.appendChild(style);
}

export interface ProfileCardProps {
  avatarUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  className?: string;
  enableTilt?: boolean;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

interface TiltEngine {
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
  beginInitial: (durationMs: number) => void;
  getCurrent: () => { x: number; y: number; tx: number; ty: number };
  cancel: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  className = '',
  enableTilt = true,
  name = 'Dra. Ana Villarreal',
  title = 'Directora, CII.IA',
  handle = 'ciiia',
  status = 'Disponible',
  contactText = 'Contactar',
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number): void => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;
      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;
      const properties: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
      };
      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number): void => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);
      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const start = (): void => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      },
    };
  }, [enableTilt]);

  const getOffsets = (evt: PointerEvent, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent): void => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      shell.classList.add('active', 'entering');
      window.setTimeout(() => shell.classList.remove('entering'), ANIMATION_CONFIG.ENTER_TRANSITION_MS);
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerLeave = useCallback((): void => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;
    tiltEngine.toCenter();
    const checkSettle = (): void => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      if (Math.hypot(tx - x, ty - y) < 0.6) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;
    const shell = shellRef.current;
    if (!shell) return;
    const moveHandler = handlePointerMove as EventListener;
    const enterHandler = handlePointerEnter as EventListener;
    const leaveHandler = handlePointerLeave as EventListener;
    shell.addEventListener('pointerenter', enterHandler);
    shell.addEventListener('pointermove', moveHandler);
    shell.addEventListener('pointerleave', leaveHandler);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', enterHandler);
      shell.removeEventListener('pointermove', moveHandler);
      shell.removeEventListener('pointerleave', leaveHandler);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const cardRadius = '24px';

  const cardStyle = useMemo(
    () =>
      ({
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--behind-glow-color': behindGlowColor ?? 'rgba(92, 169, 219, 0.55)',
        '--pointer-x': '50%',
        '--pointer-y': '50%',
        '--pointer-from-top': '0.5',
        '--pointer-from-left': '0.5',
        '--rotate-x': '0deg',
        '--rotate-y': '0deg',
        '--background-x': '50%',
        '--background-y': '50%',
        '--card-radius': cardRadius,
      }) as React.CSSProperties,
    [innerGradient, behindGlowColor],
  );

  const handleContactClick = useCallback(() => onContactClick?.(), [onContactClick]);

  const shineStyle: React.CSSProperties = {
    maskImage:
      'repeating-linear-gradient(45deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 2px, transparent 2px, transparent 6px)',
    filter: 'brightness(0.7) contrast(1.2) saturate(0.5) opacity(0.35)',
    animation: 'pc-holo-bg 18s linear infinite',
    mixBlendMode: 'color-dodge',
    transform: 'translate3d(0, 0, 1px)',
    overflow: 'hidden',
    zIndex: 3,
    backgroundImage:
      'radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), rgba(92,169,219,0.5) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 120%)',
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none',
  };

  const glareStyle: React.CSSProperties = {
    transform: 'translate3d(0, 0, 1.1px)',
    overflow: 'hidden',
    backgroundImage:
      'radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), rgba(214,232,246,0.55) 12%, rgba(15,46,66,0.75) 90%)',
    mixBlendMode: 'overlay',
    filter: 'brightness(0.85) contrast(1.15)',
    zIndex: 4,
    gridArea: '1 / -1',
    borderRadius: cardRadius,
    pointerEvents: 'none',
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`.trim()}
      style={{ perspective: '500px', transform: 'translate3d(0, 0, 0.1px)', ...cardStyle }}
    >
      {behindGlowEnabled && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200 ease-out"
          style={{
            background:
              'radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent 60%)',
            filter: 'blur(40px) saturate(1.1)',
          }}
        />
      )}
      <div ref={shellRef} className="group relative z-[1]">
        <section
          className="relative grid overflow-hidden bg-[var(--surface)]"
          style={{
            aspectRatio: '0.72',
            borderRadius: cardRadius,
            boxShadow: 'rgba(0,0,0,0.6) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 24px -6px',
            transition: 'transform 1s ease',
            backfaceVisibility: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transition = 'none';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transition = 'transform 1s ease';
            e.currentTarget.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'var(--inner-gradient)',
              backgroundColor: 'rgba(10,10,11,0.9)',
              borderRadius: cardRadius,
              display: 'grid',
              gridArea: '1 / -1',
            }}
          >
            <div style={shineStyle} />
            <div style={glareStyle} />
            <div
              className="overflow-visible"
              style={{ mixBlendMode: 'luminosity', transform: 'translateZ(2px)', gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none' }}
            >
              {avatarUrl && (
                <img
                  className="absolute bottom-[-1px] left-1/2 w-full -translate-x-1/2"
                  src={avatarUrl}
                  alt={`${name} avatar`}
                  loading="lazy"
                  style={{ transformOrigin: '50% 100%', borderRadius: cardRadius }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              {showUserInfo && (
                <div
                  className="pointer-events-auto absolute bottom-5 left-5 right-5 z-[2] flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-2xl"
                >
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-sm font-medium leading-none text-white/90">@{handle}</div>
                    <div className="text-sm leading-none text-[var(--accent)]">{status}</div>
                  </div>
                  <button
                    className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-px hover:border-white/40"
                    onClick={handleContactClick}
                    type="button"
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>
            <div
              className="relative z-[5] max-h-full overflow-hidden text-center"
              style={{ mixBlendMode: 'luminosity', gridArea: '1 / -1', borderRadius: cardRadius, pointerEvents: 'none' }}
            >
              <div className="absolute top-8 flex w-full flex-col">
                <h3
                  className="m-0 font-display font-semibold"
                  style={{
                    fontSize: 'min(5svh, 2.2em)',
                    backgroundImage: 'linear-gradient(to bottom, #fff, var(--accent))',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {name}
                </h3>
                <p
                  className="mx-auto w-min whitespace-nowrap font-semibold"
                  style={{
                    position: 'relative',
                    top: '-10px',
                    fontSize: '14px',
                    backgroundImage: 'linear-gradient(to bottom, #fff, #7fb8dd)',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {title}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
