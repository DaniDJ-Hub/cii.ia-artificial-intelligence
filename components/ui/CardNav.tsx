import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';

type CardNavLink = { label: string; href?: string; ariaLabel: string; onClick?: () => void };

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo?: React.ReactNode;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  items,
  className = '',
  ease = 'power3.out',
  baseColor = 'var(--surface)',
  menuColor = 'var(--text-primary)',
  buttonBgColor = 'var(--accent)',
  buttonTextColor = '#04121c',
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement | null;
      if (contentEl) {
        const wasVisibility = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;
        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        void contentEl.offsetHeight;
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        contentEl.style.visibility = wasVisibility;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;
        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`absolute left-1/2 top-[1.2em] z-[70] w-[92%] max-w-3xl -translate-x-1/2 md:top-[1.5em] ${className}`}>
      <nav
        ref={navRef}
        className="relative block h-[60px] overflow-hidden rounded-2xl border border-[var(--border)] p-0 shadow-lg will-change-[height]"
        style={{ backgroundColor: baseColor }}
      >
        <div className="absolute inset-x-0 top-0 z-[2] flex h-[60px] items-center justify-between p-2 pl-[1.1rem]">
          <div
            className="group order-2 flex h-full cursor-pointer flex-col items-center justify-center gap-[6px] md:order-none"
            onClick={toggleMenu}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
              }
            }}
            role="button"
            aria-label={isExpanded ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div className={`h-[2px] w-[26px] bg-current transition-transform duration-300 ease-linear ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''} group-hover:opacity-75`} />
            <div className={`h-[2px] w-[26px] bg-current transition-transform duration-300 ease-linear ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''} group-hover:opacity-75`} />
          </div>
          <div className="order-1 flex items-center gap-2 md:absolute md:left-1/2 md:top-1/2 md:order-none md:-translate-x-1/2 md:-translate-y-1/2">
            {logo}
          </div>
          <button
            type="button"
            className="hidden h-full items-center rounded-xl border-0 px-4 font-semibold transition-colors duration-300 md:inline-flex"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Agenda una llamada
          </button>
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 top-[60px] z-[1] flex flex-col items-stretch justify-start gap-2 p-2 md:flex-row md:items-end md:gap-3 ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } card-nav-content`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="relative flex h-auto min-h-[60px] min-w-0 flex-[1_1_auto] select-none flex-col gap-2 rounded-xl p-3 md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="text-[18px] font-normal tracking-tight md:text-[20px]">{item.label}</div>
              <div className="mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="inline-flex cursor-pointer items-center gap-[6px] text-[14px] no-underline transition-opacity duration-300 hover:opacity-75 md:text-[15px]"
                    href={lnk.href ?? '#'}
                    onClick={(e) => {
                      if (lnk.onClick) {
                        e.preventDefault();
                        lnk.onClick();
                      }
                    }}
                    target={lnk.href && lnk.href.startsWith('http') ? '_blank' : undefined}
                    rel={lnk.href && lnk.href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight className="shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
