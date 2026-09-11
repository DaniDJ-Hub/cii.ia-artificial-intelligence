import React, { type CSSProperties, useEffect, useRef, useState, useMemo, type PropsWithChildren } from 'react';

type GradualBlurProps = PropsWithChildren<{
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  target?: 'parent' | 'page';
  className?: string;
  style?: CSSProperties;
}>;

const DEFAULTS: Required<Omit<GradualBlurProps, 'children' | 'className' | 'style' | 'width'>> & { width?: string } = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 20,
  opacity: 1,
  curve: 'linear',
  target: 'parent',
};

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  'ease-in': (p) => p * p,
  'ease-out': (p) => 1 - Math.pow(1 - p, 2),
  'ease-in-out': (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const getGradientDirection = (position: string): string => {
  const directions: Record<string, string> = { top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' };
  return directions[position] || 'to bottom';
};

const GradualBlur: React.FC<GradualBlurProps> = (props) => {
  const config = { ...DEFAULTS, ...props };
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / config.divCount;
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue: number;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * config.strength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * config.strength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position);
      const divStyle: CSSProperties = {
        maskImage: `linear-gradient(${direction}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity,
      };

      divs.push(<div key={i} className="absolute inset-0" style={divStyle} />);
    }
    return divs;
  }, [config.divCount, config.curve, config.exponential, config.strength, config.position, config.opacity]);

  const isVertical = config.position === 'top' || config.position === 'bottom';
  const isPageTarget = config.target === 'page';

  const containerStyle: CSSProperties = {
    position: isPageTarget ? 'fixed' : 'absolute',
    pointerEvents: 'none',
    opacity: isVisible ? 1 : 0,
    zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
    ...(isVertical
      ? { height: config.height, width: config.width ?? '100%', [config.position]: 0, left: 0, right: 0 }
      : { width: config.width ?? config.height, height: '100%', [config.position]: 0, top: 0, bottom: 0 }),
    ...config.style,
  };

  return (
    <div ref={containerRef} className={`gradual-blur relative isolate ${config.className ?? ''}`} style={containerStyle}>
      <div className="relative h-full w-full">{blurDivs}</div>
      {props.children && <div className="relative">{props.children}</div>}
    </div>
  );
};

export default React.memo(GradualBlur);
