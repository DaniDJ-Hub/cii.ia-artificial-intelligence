import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type SyntheticEvent,
} from 'react';

const DEG = 180 / Math.PI;
const round2 = (n: number): number => Math.round(n * 100) / 100;

const hexToRgba = (hex: string, alpha: number): string => {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (Number.isNaN(n)) return hex;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

interface Geometry {
  straight: boolean;
  W: number;
  T: number;
  svgH: number;
  R?: number;
  dir?: number;
  uPerLen: number;
  point: (u: number, v: number) => [number, number];
  angleAt: (u: number) => number;
}

const buildGeometry = (width: number, bend: number, thickness: number, pad: number): Geometry => {
  const W = width;
  const T = thickness;
  const s = Math.max(-W * 0.35, Math.min(bend, W * 0.35));
  const a = Math.abs(s);
  const dir = s >= 0 ? 1 : -1;
  const svgH = T + a + pad * 2;

  if (a < 0.75) {
    const midY = pad + T / 2;
    return { straight: true, W, T, svgH, uPerLen: 1, point: (u, v) => [u, midY + v], angleAt: () => 0 };
  }

  const R = (W * W * 0.25 + a * a) / (2 * a);
  const cx = W / 2;
  const apexY = pad + T / 2 + (dir > 0 ? 0 : a);
  const cy = apexY + dir * R;
  const phi = Math.asin(Math.min(1, W / (2 * R)));

  return {
    straight: false,
    W,
    T,
    svgH,
    R,
    dir,
    uPerLen: W / (2 * R * phi),
    point: (u, v) => {
      const th = ((u - cx) / cx) * phi;
      const rho = R - dir * v;
      return [cx + rho * Math.sin(th), cy - dir * rho * Math.cos(th)];
    },
    angleAt: (u) => dir * ((u - cx) / cx) * phi * DEG,
  };
};

const fmt = (g: Geometry, u: number, v: number): string => {
  const [x, y] = g.point(u, v);
  return `${round2(x)} ${round2(y)}`;
};

const edgeSeg = (g: Geometry, uTo: number, v: number, ltr: boolean): string => {
  if (g.straight) return `L ${fmt(g, uTo, v)}`;
  const rho = round2(g.R! - g.dir! * v);
  const sweep = (ltr === g.dir! > 0) ? 1 : 0;
  return `A ${rho} ${rho} 0 0 ${sweep} ${fmt(g, uTo, v)}`;
};

const bentRectPath = (g: Geometry, u0: number, u1: number, vTop: number, vBot: number, radius: number): string => {
  const rc = Math.max(0, Math.min(radius, (vBot - vTop) / 2, (u1 - u0) / 2));
  return [
    `M ${fmt(g, u0 + rc, vTop)}`,
    edgeSeg(g, u1 - rc, vTop, true),
    `Q ${fmt(g, u1, vTop)} ${fmt(g, u1, vTop + rc)}`,
    `L ${fmt(g, u1, vBot - rc)}`,
    `Q ${fmt(g, u1, vBot)} ${fmt(g, u1 - rc, vBot)}`,
    edgeSeg(g, u0 + rc, vBot, false),
    `Q ${fmt(g, u0, vBot)} ${fmt(g, u0, vBot - rc)}`,
    `L ${fmt(g, u0, vTop + rc)}`,
    `Q ${fmt(g, u0, vTop)} ${fmt(g, u0 + rc, vTop)}`,
    'Z',
  ].join(' ');
};

const bentLinePath = (g: Geometry, u0: number, u1: number, v: number): string => `M ${fmt(g, u0, v)} ${edgeSeg(g, u1, v, true)}`;

const SELECTABLE_TYPES = ['text', 'search', 'tel', 'url', 'email'];

interface CurvedInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  type?: string;
  name?: string;
  ariaLabel?: string;
  width?: number | string;
  bend?: number;
  height?: number;
  cornerRadius?: number;
  borderWidth?: number;
  fontSize?: number;
  className?: string;
  style?: CSSProperties;
}

const CurvedInput = ({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  placeholder = 'tu correo institucional',
  buttonText = 'Solicitar diagnóstico',
  type = 'email',
  name,
  ariaLabel,
  width = 480,
  bend = 22,
  height = 60,
  cornerRadius = 18,
  borderWidth = 1.5,
  fontSize = 15,
  className = '',
  style,
}: CurvedInputProps) => {
  const uid = useId().replace(/:/g, '');
  const layoutPathId = `ci-text-${uid}`;
  const buttonPathId = `ci-btn-${uid}`;
  const clipId = `ci-clip-${uid}`;

  const rootRef = useRef<HTMLFormElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const btnMeasureRef = useRef<SVGTextElement | null>(null);
  const scrollRef = useRef(0);

  const [w, setW] = useState(0);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [caretIndex, setCaretIndex] = useState(defaultValue.length);
  const [focused, setFocused] = useState(false);
  const [caretU, setCaretU] = useState(0);
  const [scrollLen, setScrollLen] = useState(0);
  const [btnTextW, setBtnTextW] = useState(0);
  const [, setFontTick] = useState(0);

  const val = value !== undefined ? value : innerValue;
  const display = val;

  const bgColor = 'var(--surface)';
  const fgColor = 'var(--text-primary)';
  const phColor = 'var(--text-muted)';
  const strokeColor = 'var(--border)';
  const accentColor = 'var(--accent)';
  const btnFgColor = '#04121c';
  const shColor = '#000000';

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0]?.contentRect?.width ?? el.clientWidth;
      setW(Math.round(cw));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let alive = true;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (alive) setFontTick((t) => t + 1);
      });
    }
    return () => {
      alive = false;
    };
  }, []);

  const pad = Math.ceil(borderWidth / 2) + 6;
  const geom = useMemo<Geometry | null>(() => (w > 2 ? buildGeometry(w, bend, height, pad) : null), [w, bend, height, pad]);

  const layout = useMemo(() => {
    if (!geom) return null;
    const T = height;
    const btnInset = Math.max(5, borderWidth + 4);
    const textStartU = 24;
    const btnW = Math.max(btnTextW + fontSize * 2.7, T * 1.35);
    const btnU1 = geom.W - btnInset;
    const btnU0 = btnU1 - btnW;
    const textEndU = Math.max(textStartU + 20, btnU0 - 14);
    const winLen = (textEndU - textStartU) / geom.uPerLen;
    return { btnInset, textStartU, textEndU, btnU0, btnU1, winLen };
  }, [geom, height, borderWidth, btnTextW, fontSize]);

  useLayoutEffect(() => {
    if (btnMeasureRef.current) {
      const bw = btnMeasureRef.current.getComputedTextLength();
      setBtnTextW((prev) => (Math.abs(prev - bw) > 0.5 ? bw : prev));
    }
    if (!geom || !layout) return;
    const textEl = textRef.current;
    const caret = Math.min(caretIndex, display.length);
    let caretLen = 0;
    let totalLen = 0;
    if (textEl && display.length) {
      try {
        totalLen = textEl.getSubStringLength(0, display.length);
        caretLen = caret > 0 ? textEl.getSubStringLength(0, caret) : 0;
      } catch {
        totalLen = 0;
        caretLen = 0;
      }
    }
    let next = scrollRef.current;
    if (caretLen - next > layout.winLen - 2) next = caretLen - layout.winLen + 2;
    if (caretLen - next < 0) next = caretLen;
    if (totalLen - next < layout.winLen) next = Math.max(0, totalLen - layout.winLen);
    next = Math.max(0, next);
    if (Math.abs(next - scrollRef.current) > 0.5) {
      scrollRef.current = next;
      setScrollLen(next);
    }
    setCaretU(layout.textStartU + (caretLen - next) * geom.uPerLen);
  });

  const commitValue = (v: string) => {
    if (value === undefined) setInnerValue(v);
    onChange?.(v);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    commitValue(e.target.value);
    setCaretIndex(e.target.selectionStart ?? e.target.value.length);
  };

  const handleSelect = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setCaretIndex(target.selectionStart ?? target.value.length);
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault?.();
    onSubmit?.(val);
  };

  const handleSurfaceClick = (e: ReactMouseEvent<SVGSVGElement>) => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    setCaretIndex(display.length);
  };

  const safeType = SELECTABLE_TYPES.includes(type) ? type : 'text';

  const svgStyle: CSSProperties = { filter: `drop-shadow(0 10px 24px ${hexToRgba(shColor, 0.4)})` };

  let content: ReactNode = null;
  if (geom && layout) {
    const T = height;
    const vBase = fontSize * 0.34;
    const scrollU = scrollLen * geom.uPerLen;
    const bandPath = bentRectPath(geom, 0, geom.W, -T / 2, T / 2, cornerRadius);
    const layoutPath = bentLinePath(geom, layout.textStartU - scrollU, geom.W, vBase);
    const clipPath = bentRectPath(geom, layout.textStartU - 6, layout.textEndU + 8, -T / 2, T / 2, 0);

    const [caretX, caretY] = geom.point(caretU, 0);
    const caretAngle = geom.angleAt(caretU);
    const caretH = Math.min(T * 0.58, fontSize * 1.45);

    const btnH = T - layout.btnInset * 2;
    const buttonPath = bentRectPath(geom, layout.btnU0, layout.btnU1, -T / 2 + layout.btnInset, T / 2 - layout.btnInset, Math.min(cornerRadius * 0.72, btnH / 2));
    const buttonTextPath = bentLinePath(geom, layout.btnU0, layout.btnU1, vBase);

    content = (
      <svg
        ref={svgRef}
        className="block h-auto w-full cursor-text select-none overflow-visible [-webkit-tap-highlight-color:transparent]"
        width={geom.W}
        height={round2(geom.svgH)}
        viewBox={`0 0 ${geom.W} ${round2(geom.svgH)}`}
        style={svgStyle}
        onPointerDown={(e) => e.preventDefault()}
        onClick={handleSurfaceClick}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={clipPath} />
          </clipPath>
        </defs>
        <path
          className={`opacity-0 transition-opacity duration-[250ms] ease-in-out ${focused ? 'opacity-[0.28]' : ''}`}
          d={bandPath}
          fill="none"
          stroke={accentColor}
          strokeWidth={borderWidth + 6}
        />
        <path d={bandPath} fill={bgColor} stroke={strokeColor} strokeWidth={borderWidth} />
        <path id={layoutPathId} d={layoutPath} fill="none" />
        <g clipPath={`url(#${clipId})`}>
          <text ref={textRef} style={{ fontSize: `${fontSize}px`, fontWeight: 500 }} fill={fgColor} xmlSpace="preserve" aria-hidden="true">
            <textPath href={`#${layoutPathId}`}>{display}</textPath>
          </text>
          {!display && placeholder && (
            <text style={{ fontSize: `${fontSize}px`, fontWeight: 500 }} fill={phColor} xmlSpace="preserve" aria-hidden="true">
              <textPath href={`#${layoutPathId}`}>{placeholder}</textPath>
            </text>
          )}
          {focused && (
            <g key={`${display}-${Math.min(caretIndex, display.length)}`} transform={`translate(${round2(caretX)} ${round2(caretY)}) rotate(${round2(caretAngle)})`}>
              <line y1={-caretH / 2} y2={caretH / 2} stroke={fgColor} strokeWidth="1.5" strokeLinecap="round">
                <animate attributeName="opacity" values="1;0" dur="1.06s" calcMode="discrete" repeatCount="indefinite" />
              </line>
            </g>
          )}
        </g>
        <g
          className="group cursor-pointer outline-none"
          role="button"
          tabIndex={0}
          aria-label={buttonText}
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit();
          }}
          onPointerDown={(e: ReactPointerEvent<SVGGElement>) => e.stopPropagation()}
          onKeyDown={(e: KeyboardEvent<SVGGElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSubmit();
            }
          }}
        >
          <path className="transition-[filter,opacity] duration-200 ease-in-out group-hover:brightness-110 group-active:brightness-95" d={buttonPath} fill={accentColor} />
          <path id={buttonPathId} d={buttonTextPath} fill="none" />
          <text fill={btnFgColor} textAnchor="middle" style={{ fontSize: `${fontSize}px`, fontWeight: 700, pointerEvents: 'none' }}>
            <textPath href={`#${buttonPathId}`} startOffset="50%">
              {buttonText}
            </textPath>
          </text>
        </g>
        <text ref={btnMeasureRef} style={{ fontSize: `${fontSize}px`, fontWeight: 700 }} x="-9999" y="-9999" visibility="hidden" aria-hidden="true">
          {buttonText}
        </text>
      </svg>
    );
  }

  return (
    <form
      ref={rootRef}
      className={`relative m-0 block w-full max-w-full ${className}`.trim()}
      style={{ width: typeof width === 'number' ? `${width}px` : width, ...style }}
      onSubmit={handleSubmit}
      noValidate
    >
      {content}
      <input
        ref={inputRef}
        className="pointer-events-none absolute inset-0 m-0 h-full w-full border-0 bg-transparent p-0 text-base text-transparent opacity-0 outline-none [caret-color:transparent]"
        type={safeType}
        name={name}
        value={val}
        onChange={handleInputChange}
        onSelect={handleSelect}
        onKeyUp={handleSelect}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={ariaLabel || placeholder || 'Correo institucional'}
        autoComplete="off"
        spellCheck={false}
      />
    </form>
  );
};

export default CurvedInput;
