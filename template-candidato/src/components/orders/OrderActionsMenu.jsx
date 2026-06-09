import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  CircleDot,
  MoreHorizontal,
  Pencil,
  Eye,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const ACTIONS = [
  { key: 'view-details', label: 'Ver detalhes', icon: Eye },
  { key: 'edit', label: 'Editar', icon: Pencil },
  { key: 'mark-pending', label: 'Marcar como Pendente', icon: CircleDot },
  { key: 'mark-finished', label: 'Marcar finalizada', icon: CheckCircle2 },
  { key: 'cancel-order', label: 'Cancelar OS', icon: XCircle },
];

function ActionButton({ action, onClick, className = '' }) {
  const Icon = action.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted ${className}`}
    >
      <Icon className="size-4" />
      {action.label}
    </button>
  );
}

function OrderActionsMenu({ order }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open || isMobile) return;
    const onClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const onEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [open, isMobile]);

  const onAction = (action) => {
    // Placeholder: a logica real (toast, modal etc.) sera adicionada depois.
    console.log('order action', { orderId: order.id, action });
    setOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setOpen(true)}
          aria-label="Abrir acoes da ordem"
        >
          <MoreHorizontal />
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="rounded-t-2xl border border-sidebar-border">
            <SheetHeader>
              <SheetTitle>Acoes da OS</SheetTitle>
            </SheetHeader>
            <Separator className="mb-2" />
            <div className="px-2 pb-3">
              {ACTIONS.map((action) => (
                <ActionButton
                  key={action.key}
                  action={action}
                  onClick={() => onAction(action.key)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative inline-flex">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Abrir acoes da ordem"
      >
        <MoreHorizontal />
      </Button>

      {open && (
        <div className="absolute right-0 top-9 z-30 w-56 rounded-lg border border-border/60 bg-popover p-1 shadow-lg">
          {ACTIONS.map((action, index) => (
            <div key={action.key}>
              {index === 2 && <Separator className="my-1" />}
              <ActionButton action={action} onClick={() => onAction(action.key)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderActionsMenu;

