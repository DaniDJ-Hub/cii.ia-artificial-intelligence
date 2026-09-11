import { useRef, useState } from 'react';
import { Link } from 'react-router';
import DepthText from '../../components/ui/DepthText';
import { CONTACT_INFO, SERVICES_DATA, TAGLINE } from '../data/ciiiaData';
import { MOTION, ScrollTrigger, gsap, useGSAP } from '../motion/gsap';
import { useMotionPreferences } from '../motion/useMotionPreferences';
import { Wordmark } from '../ui/Wordmark';
import { FULL_NAV } from './navigation';

const footerLink =
  'underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-sky';

export function SiteFooter() {
  const markRef = useRef<HTMLDivElement>(null);
  const [markNear, setMarkNear] = useState(false);
  const { desktop } = useMotionPreferences();

  // Marca 3D de cierre (DepthText del kit). Solo se monta cerca de la vista
  // para no mantener su animación activa en el resto de la página.
  useGSAP(
    () => {
      const mark = markRef.current;
      if (!mark) return;
      ScrollTrigger.create({
        trigger: mark,
        start: 'top bottom+=300',
        end: 'bottom top',
        onToggle: (self) => setMarkNear(self.isActive),
      });
      const mm = gsap.matchMedia();
      mm.add(MOTION.desktop, () => {
        gsap.from(mark.firstElementChild, {
          transformPerspective: 1400,
          transformOrigin: '50% 100%',
          yPercent: 45,
          rotateX: 55,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
        });
      });
    },
    { scope: markRef },
  );

  return (
    <footer data-tone="navy" className="bg-navy-deep text-white">
      <div className="container-site py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" aria-label="CII.IA, ir al inicio" className="inline-block rounded-[2px]">
              <Wordmark className="text-[2rem]" />
            </Link>
            <p className="mt-5 max-w-[32ch] text-mist">Centro de Innovación Industrial en Inteligencia Artificial</p>
            <p className="mt-1 text-mist">{TAGLINE}</p>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h2 className="text-sm text-mist">Sitio</h2>
            <ul className="mt-4 space-y-2.5">
              {FULL_NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-sm text-mist">Soluciones</h2>
            <ul className="mt-4 space-y-2.5">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <Link to={`/soluciones/${service.id}`} className={footerLink}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-3 lg:col-start-10">
            <h2 className="text-sm text-mist">Contacto</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className={footerLink}>
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a href={CONTACT_INFO.phoneHref} className={footerLink}>
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="text-mist">{CONTACT_INFO.location}</li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {CONTACT_INFO.social.map((network) => (
                <li key={network.href}>
                  <a href={network.href} target="_blank" rel="noreferrer" className={footerLink}>
                    {network.label}
                    <span className="sr-only"> (abre en otra pestaña)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={markRef} aria-hidden="true" className="mt-14 hidden overflow-hidden md:block">
          <div className="flex h-[clamp(5rem,15vw,13rem)] items-center justify-center font-display [font-stretch:112%]">
            {desktop && markNear && (
              <DepthText
                text="CII.IA"
                fontSize="clamp(4.5rem,15vw,13rem)"
                fontWeight={700}
                faceColor="#FFFFFF"
                depthColor="#29729F"
                layers={22}
                depth={2.2}
                tilt={5}
                orbitSpeed={0.12}
                perspective={1100}
                shadow={false}
              />
            )}
          </div>
        </div>

        <p className="mt-14 border-t border-white/15 pt-6 text-sm text-mist">
          © {new Date().getFullYear()} CII.IA®. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
