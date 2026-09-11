/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '../../lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 'panel' = static surface, 'strong' = opaque chrome (nav/modal), 'card' = interactive hover lift */
  variant?: 'panel' | 'strong' | 'card';
  /** Adds a static tasteful 3D tilt-on-hover (CSS only, no pointer tracking). */
  tilt?: boolean;
  /** Adds a soft ambient blue glow shadow. */
  glow?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Shared glassmorphic surface used across the site so cards, panels and
 * chrome all read as one cohesive dark/glass/3D design system.
 */
export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ variant = 'panel', tilt = false, glow = false, as = 'div', className, children, ...rest }, ref) => {
    const Comp = as as any;
    const variantClass =
      variant === 'strong' ? 'glass-panel-strong' : variant === 'card' ? 'glass-card' : 'glass-panel';

    return (
      <Comp
        ref={ref}
        className={cn(variantClass, tilt && 'tilt-hover', glow && 'glow-accent-sm', className)}
        {...rest}
      >
        {children}
      </Comp>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

export default GlassPanel;
