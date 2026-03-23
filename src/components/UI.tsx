import React from 'react';
import { cn } from '../lib/utils';

export const Card = ({ children, className, glass = true, ...props }: any) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        glass ? 'glass' : 'bg-zinc-900',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: any) => {
  const variants: any = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20',
    secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
    outline: 'bg-transparent border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white',
  };

  const sizes: any = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'p-2',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Badge = ({
  children,
  variant = 'info',
}: any) => {
  const variants: any = {
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
  };

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border',
        variants[variant]
      )}
    >
      {children}
    </span>
  );
};
