import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { Ripple } from './Ripple';

export type ButtonVariant = 'full' | 'outline' | 'ghost' | 'soft';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  color?: string;
  before?: ReactNode;
  after?: ReactNode;
}

interface ButtonCssVars extends CSSProperties {
  '--btn-bg'?: string;
  '--btn-bg-hover'?: string;
  '--btn-bg-active'?: string;
  '--btn-border'?: string;
  '--btn-text'?: string;
}

const baseClasses =
  'relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-medium transition duration-200 ease-out cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-[color:var(--btn-text)] disabled:pointer-events-none disabled:opacity-50';

const variantClasses: Record<ButtonVariant, string> = {
  full: 'bg-[color:var(--btn-bg)] text-[color:var(--btn-text)] hover:bg-[color:var(--btn-bg-hover)] active:bg-[color:var(--btn-bg-active)] shadow-sm hover:shadow-lg',
  outline: 'border border-[color:var(--btn-border)] text-[color:var(--btn-text)] hover:bg-[color:var(--btn-bg-hover)] active:bg-[color:var(--btn-bg-active)] hover:shadow-md',
  ghost: 'text-[color:var(--btn-text)] hover:bg-[color:var(--btn-bg-hover)] active:bg-[color:var(--btn-bg-active)] hover:shadow-md',
  soft: 'bg-[color:var(--btn-bg)] text-[color:var(--btn-text)] hover:bg-[color:var(--btn-bg-hover)] active:bg-[color:var(--btn-bg-active)] hover:shadow-md',
};

function getVariantVars(variant: ButtonVariant, color: string): ButtonCssVars {
  switch (variant) {
    case 'full':
      return {
        '--btn-bg': `var(--color-${color}-500)`,
        '--btn-bg-hover': `var(--color-${color}-600)`,
        '--btn-bg-active': `var(--color-${color}-700)`,
        '--btn-text': 'var(--color-white)',
      };
    case 'outline':
      return {
        '--btn-border': `var(--color-${color}-500)`,
        '--btn-text': `var(--color-${color}-600)`,
        '--btn-bg-hover': `var(--color-${color}-50)`,
        '--btn-bg-active': `var(--color-${color}-100)`,
      };
    case 'ghost':
      return {
        '--btn-text': `var(--color-${color}-600)`,
        '--btn-bg-hover': `var(--color-${color}-100)`,
        '--btn-bg-active': `var(--color-${color}-200)`,
      };
    case 'soft':
      return {
        '--btn-bg': `var(--color-${color}-100)`,
        '--btn-text': `var(--color-${color}-700)`,
        '--btn-bg-hover': `var(--color-${color}-200)`,
        '--btn-bg-active': `var(--color-${color}-300)`,
      };
  }
}

export function Button({
  variant = 'full',
  color = 'blue',
  before,
  after,
  children,
  className = '',
  style,
  type = 'button',
  ref,
  ...rest
}: ButtonProps) {
  const cssVars = getVariantVars(variant, color);

  return (
    <button
      ref={ref}
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
      style={{ ...cssVars, ...style }}
      {...rest}
    >
      {before != null && <span className="inline-flex shrink-0">{before}</span>}
      {children != null && <span className="inline-flex items-center justify-center">{children}</span>}
      {after != null && <span className="inline-flex shrink-0">{after}</span>}
      <Ripple />
    </button>
  );
}

export default Button;
