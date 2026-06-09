import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { useIsMobile } from '@/hooks/use-mobile';

function DetailRow({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function OrderDetailsOverlay({
  open,
  onOpenChange,
  order,
  formatCurrency,
  formatDate,
}) {
  const isMobile = useIsMobile();

  if (!order) return null;

  const content = (
    <div className="space-y-4">
      <DetailRow label="Cliente" value={order.cliente} />
      <DetailRow label="Descricao" value={order.descricao} />
      <div className="grid gap-3 sm:grid-cols-2">
        <DetailRow label="Valor" value={formatCurrency(order.valor)} />
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Status</p>
          <StatusBadge status={order.status} />
        </div>
      </div>
      <DetailRow label="Criada em" value={formatDate(order.createdAt)} />
      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => onOpenChange(false)}
        >
          Fechar
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="max-h-[92vh] overflow-y-auto rounded-t-2xl bg-popover text-popover-foreground"
        >
          <SheetHeader className="pr-12">
            <SheetTitle>Detalhes da OS</SheetTitle>
            <p className="text-sm text-muted-foreground">
              Informacoes da ordem de servico selecionada.
            </p>
          </SheetHeader>
          <div className="px-4 pb-4">{content}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalhes da OS</DialogTitle>
          <DialogDescription>
            Informacoes da ordem de servico selecionada.
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetailsOverlay;
