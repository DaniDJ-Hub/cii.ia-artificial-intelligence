/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationPage, ProjectCase } from './types';
import { Navbar } from './components/Navbar';
import { ContinuousTrace } from './components/ContinuousTrace';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { StatementSection } from './components/StatementSection';
import { ExecutionCycleSection } from './components/ExecutionCycleSection';
import { ServicesSection } from './components/ServicesSection';
import { MetricsSection } from './components/MetricsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EcosystemSection } from './components/EcosystemSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { CaseModal } from './components/CaseModal';
import { ContactModal } from './components/ContactModal';
import { MobileFloatingBar } from './components/MobileFloatingBar';

// Dedicated Subpages
import { AiExecutionView } from './components/views/AiExecutionView';
import { AiLabView } from './components/views/AiLabView';
import { AcademyView } from './components/views/AcademyView';
import { CasosView } from './components/views/CasosView';
import { EcosistemaView } from './components/views/EcosistemaView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [preloadedCaseTitle, setPreloadedCaseTitle] = useState<string | null>(null);
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string | null>(null);

  // Scroll spy to update section progress
  useEffect(() => {
    if (currentPage !== 'home') return;

    const sections = [
      'hero',
      'reto',
      'ciia',
      'capacidades',
      'soluciones',
      'impacto',
      'casos',
      'ecosistema',
      'cta'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavigateSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContactWithCase = (caseTitle: string) => {
    setPreloadedCaseTitle(caseTitle);
    setSelectedCase(null);
    setIsContactOpen(true);
  };

  const handleOpenGeneralContact = () => {
    setPreloadedCaseTitle(null);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col justify-between selection:bg-[#29729F] selection:text-white antialiased">
      
      {/* Main App Container */}
      <div className="w-full relative flex-1 flex flex-col">
        {/* Navigation Bar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenContact={handleOpenGeneralContact}
        />

        {/* Minimalist Section Progress Rail (Home view only) */}
        {currentPage === 'home' && (
          <ContinuousTrace
            currentSection={currentSection}
            onNavigateSection={handleNavigateSection}
          />
        )}

        {/* Storytelling Sequence & Page Routing */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <>
              {/* 1. HERO: Posicionamiento con canvas interactivo Future-Forward */}
              <HeroSection
                onOpenContact={handleOpenGeneralContact}
                onNavigateToCases={() => handleNavigateSection('casos')}
                onNavigateToEcosystem={() => handleNavigateSection('ecosistema')}
              />

              {/* 2. EL RETO: La brecha entre algoritmos de prueba y operación en planta */}
              <ProblemSection />

              {/* 3. CII.IA: Qué es el centro, consorcio de triple hélice y sede en PIIT */}
              <StatementSection />

              {/* 4. CAPACIDADES: Metodología probada en 5 etapas */}
              <ExecutionCycleSection 
                onSelectService={(srvId) => {
                  if (srvId === 'ai-lab') setCurrentPage('ai-lab');
                  else setCurrentPage('ai-execution');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 5. SOLUCIONES: Servicios en cards visuales interactivas con hover */}
              <ServicesSection
                onNavigate={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenContact={handleOpenGeneralContact}
              />

              {/* 6. IMPACTO: Métricas auditadas en planta industrial */}
              <MetricsSection />

              {/* 7. CASOS REALES: Doce proyectos desplegados en operaciones */}
              <ProjectsSection
                onSelectCase={(c) => setSelectedCase(c)}
                selectedSectorFilter={selectedSectorFilter}
                onClearSectorFilter={() => setSelectedSectorFilter(null)}
              />

              {/* 8. ECOSISTEMA: 5 socios fundadores y 50+ aliados estratégicos */}
              <EcosystemSection
                onOpenContact={handleOpenGeneralContact}
                onNavigateToEcosystemPage={() => {
                  setCurrentPage('ecosistema');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* 9. CTA FINAL: Construyamos el siguiente paso */}
              <CtaSection onOpenContact={handleOpenGeneralContact} />
            </>
          )}

          {/* Subpage: AI Execution */}
          {currentPage === 'ai-execution' && (
            <AiExecutionView
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={handleOpenGeneralContact}
            />
          )}

          {/* Subpage: AI Lab & Prototyping en PIIT */}
          {currentPage === 'ai-lab' && (
            <AiLabView
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={handleOpenGeneralContact}
            />
          )}

          {/* Subpage: CII.IA Academy (NVIDIA DLI) */}
          {currentPage === 'academy' && (
            <AcademyView
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={handleOpenGeneralContact}
            />
          )}

          {/* Subpage: Casos de Éxito */}
          {currentPage === 'casos' && (
            <CasosView
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCase={(c) => setSelectedCase(c)}
              selectedSectorFilter={selectedSectorFilter}
              onClearSectorFilter={() => setSelectedSectorFilter(null)}
            />
          )}

          {/* Subpage: Ecosistema & Alianzas */}
          {currentPage === 'ecosistema' && (
            <EcosistemaView
              onBackToHome={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenContact={handleOpenGeneralContact}
            />
          )}
        </main>

        {/* Institutional Production Footer */}
        <Footer
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenContact={handleOpenGeneralContact}
        />

        {/* Mobile Quick Action Bar */}
        <MobileFloatingBar onOpenContact={handleOpenGeneralContact} />
      </div>

      {/* Case Detail Interactive Modal */}
      <CaseModal
        caseItem={selectedCase}
        onClose={() => setSelectedCase(null)}
        onOpenContactWithCase={handleOpenContactWithCase}
      />

      {/* Qualified Institutional Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        preloadedCaseTitle={preloadedCaseTitle}
      />
    </div>
  );
}
