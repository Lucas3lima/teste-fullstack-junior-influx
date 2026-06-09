import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Minimal Sheet (drawer) — sem dependência do Radix.
 * Suporta side: "left" | "right" | "top" | "bottom"
 */
const SLIDE_FROM = {
  left: { closed: '-translate-x-full', open: 'translate-x-0', base: 'inset-y-0 left-0 h-full w-3/4 max-w-xs' },
  right: { closed: 'translate-x-full', open: 'translate-x-0', base: 'inset-y-0 right-0 h-full w-3/4 max-w-xs' },
  top: { closed: '-translate-y-full', open: 'translate-y-0', base: 'inset-x-0 top-0 w-full' },
  bottom: { closed: 'translate-y-full', open: 'translate-y-0', base: 'inset-x-0 bottom-0 w-full' },
};

export function Sheet({ open, onOpenChange, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onOpenChange(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  // prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return createPortal(
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>,
    document.body
  );
}

import { createContext, useContext } from 'react';
const SheetContext = createContext(null);

export function SheetContent({ side = 'left', className, children }) {
  const { open, onOpenChange } = useContext(SheetContext);
  const slide = SLIDE_FROM[side];
  const panelRef = useRef(null);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-xl',
          'transition-transform duration-300 ease-in-out',
          slide.base,
          open ? slide.open : slide.closed,
          className
        )}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 rounded p-1 text-sidebar-foreground/60 hover:text-sidebar-foreground"
          aria-label="Fechar menu"
        >
          <X className="size-4" />
        </button>
        {children}
      </div>
    </>
  );
}

export function SheetHeader({ className, children }) {
  return (
    <div className={cn('flex flex-col gap-1 px-4 pt-4 pb-2', className)}>
      {children}
    </div>
  );
}

export function SheetTitle({ className, children }) {
  return (
    <h2 className={cn('text-base font-semibold text-sidebar-foreground', className)}>
      {children}
    </h2>
  );
}
