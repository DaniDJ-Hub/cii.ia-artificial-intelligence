import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Wordmark } from '../ui/Wordmark';
import { ButtonLink } from '../ui/links';
import { cn } from '../lib/cn';
import { FULL_NAV, PRIMARY_NAV } from './navigation';

/** Id del hero de la landing. Mientras está visible, el encabezado se funde con él. */
export const HERO_ID = 'inicio-hero';

export function SiteHeader() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  // En la carga inicial el hero aún no está en el DOM: se decide por la ruta
  // para que el encabezado no pinte un tono y luego transicione al otro.
  const [pastHero, setPastHero] = useState(() => window.location.pathname !== '/');
  const { scrollY } = useScroll();

  const updateTone = (y: number) => {
    const hero = document.getElementById(HERO_ID);
    setPastHero(!hero || y >= hero.offsetHeight);
  };

  useMotionValueEvent(scrollY, 'change', updateTone);

  useLayoutEffect(() => {
    updateTone(window.scrollY);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    // Con el menú abierto, lo que queda detrás no debe recibir foco ni scroll.
    const behind = [document.getElementById('contenido'), document.querySelector('footer')].filter(
      (element): element is HTMLElement => element !== null,
    );
    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    behind.forEach((element) => (element.inert = true));
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      behind.forEach((element) => (element.inert = false));
    };
  }, [menuOpen]);

  const onNavy = menuOpen || !pastHero;

  return (
    <header
      data-tone={onNavy ? 'navy' : 'paper'}
      className={cn(
        'sticky top-0 z-50 transition-[background-color,color,box-shadow] duration-300',
        onNavy ? 'bg-navy text-white' : 'bg-paper text-ink shadow-[0_1px_0_var(--color-rule)]',
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" aria-label="CII.IA, ir al inicio" className="-m-1 rounded-[2px] p-1">
          <Wordmark />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {PRIMARY_NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="group relative block py-2 text-[1.0625rem]">
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          'transition-opacity duration-200',
                          isActive ? 'opacity-100' : 'opacity-75 group-hover:opacity-100',
                        )}
                      >
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out-quart group-hover:scale-x-100"
                      />
                      {isActive && (
                        <motion.span
                          layoutId="nav-activo"
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-[2px] bg-current"
                          transition={{ type: 'spring', stiffness: 500, damping: 42 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/contacto" size="sm" tone={onNavy ? 'sky' : 'navy'} className="hidden sm:inline-flex">
            Contacto
          </ButtonLink>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            className="-mr-2 grid size-11 place-items-center rounded-[3px] lg:hidden"
          >
            <span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
            {menuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="menu-movil"
            aria-label="Menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto overscroll-contain bg-navy text-white lg:hidden"
          >
            <ul className="container-site pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-4">
              {FULL_NAV.map((item, index) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/15"
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn('display block py-5 text-[2rem]', isActive ? 'text-sky' : 'text-white')
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
