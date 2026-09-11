/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Route, Routes } from 'react-router';
import { SiteLayout } from './layout/SiteLayout';
import { Home } from './pages/Home';
import { Nosotros } from './pages/Nosotros';
import { Soluciones } from './pages/Soluciones';
import { SolucionDetalle } from './pages/SolucionDetalle';
import { Casos } from './pages/Casos';
import { CasoDetalle } from './pages/CasoDetalle';
import { Ecosistema } from './pages/Ecosistema';
import { Contacto } from './pages/Contacto';
import { NotFound } from './pages/NotFound';

/**
 * Arquitectura del sitio. La landing solo resume; cada tema tiene su página.
 * Investigación y Noticias no existen a propósito: no hay publicaciones
 * recientes que las sostengan (ver INSIGHT_ARTICLES en ciiiaData.ts).
 */
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="soluciones" element={<Soluciones />} />
        <Route path="soluciones/:id" element={<SolucionDetalle />} />
        <Route path="casos" element={<Casos />} />
        <Route path="casos/:id" element={<CasoDetalle />} />
        <Route path="ecosistema" element={<Ecosistema />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
