import React, { useState, Children, useRef, useLayoutEffect, type HTMLAttributes, type ReactNode } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  backButtonText = 'Anterior',
  nextButtonText = 'Siguiente',
  disableStepIndicators = false,
  className = '',
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  return (
    <div className={`flex min-h-full flex-1 flex-col items-center justify-center ${className}`} {...rest}>
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-xl">
        <div className="flex w-full items-center p-6 sm:p-8">
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                <StepIndicator
                  step={stepNumber}
                  disableStepIndicators={disableStepIndicators}
                  currentStep={currentStep}
                  onClickStep={(clicked) => {
                    setDirection(clicked > currentStep ? 1 : -1);
                    updateStep(clicked);
                  }}
                />
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper currentStep={currentStep} direction={direction} className="space-y-2 px-6 sm:px-8">
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <div className={`mt-8 flex ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
            {currentStep !== 1 && (
              <button
                onClick={handleBack}
                className="rounded px-3 py-1.5 text-sm text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
              >
                {backButtonText}
              </button>
            )}
            {!isLastStep && (
              <button
                onClick={handleNext}
                className="flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-semibold tracking-tight text-[#04121c] transition hover:bg-[var(--accent-sampled)]"
              >
                {nextButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({ currentStep, direction, children, className = '' }: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <SlideTransition key={currentStep} direction={direction} onHeightReady={setParentHeight}>
          {children}
        </SlideTransition>
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function SlideTransition({ children, direction, onHeightReady }: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? '50%' : '-50%', opacity: 0 }),
};

export function Step({ children }: { children: ReactNode }) {
  return <div className="pb-2">{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators = false }: StepIndicatorProps) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`relative outline-none ${disableStepIndicators ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: 'var(--surface-raised)', color: '#a3a3a3' },
          active: { scale: 1.1, backgroundColor: 'var(--accent)', color: 'var(--accent)' },
          complete: { scale: 1, backgroundColor: 'var(--accent)', color: '#04121c' },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === 'complete' ? (
          <CheckIcon className="h-4 w-4 text-[#04121c]" />
        ) : status === 'active' ? (
          <div className="h-3 w-3 rounded-full bg-[var(--canvas)]" />
        ) : (
          <span className="text-sm text-[var(--text-muted)]">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }: { isComplete: boolean }) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: 'var(--accent)' },
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-[var(--border)]">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
