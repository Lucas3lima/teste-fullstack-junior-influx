import {
  CheckCircle2,
  CircleDot,
  MoreHorizontal,
  Pencil,
  Eye,
  XCircle,
  Circle,
} from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateOrderStatus } from '@/api/orders';

const ACTIONS = [
  { key: 'view-details', label: 'Ver detalhes', icon: Eye },
  { key: 'edit', label: 'Editar', icon: Pencil },
  { key: 'mark-in-progress', label: 'Marcar em andamento', icon: Circle },
  { key: 'mark-pending', label: 'Marcar como Pendente', icon: CircleDot },
  { key: 'mark-finished', label: 'Marcar finalizada', icon: CheckCircle2 },
  { key: 'cancel-order', label: 'Cancelar OS', icon: XCircle },
];

const ACTION_STATUS_MAP = {
  'mark-in-progress': 'Em Andamento',
  'mark-pending': 'Pendente',
  'mark-finished': 'Finalizada',
  'cancel-order': 'Cancelada',
};

function ActionItem({ action, onSelect, disabled }) {
  const Icon = action.icon;
  return (
    <DropdownMenuItem
      onSelect={onSelect}
      disabled={disabled}
      variant={action.key === 'cancel-order' ? 'destructive' : 'default'}
    >
      <Icon className="size-4" />
      {action.label}
    </DropdownMenuItem>
  );
}

function OrderActionsMenu({ order, onAction }) {
  const queryClient = useQueryClient();
  const statusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (_, variables) => {
      toast.success(`Status alterado para ${variables.status}.`);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (mutationError) => {
      toast.error(mutationError?.message ?? 'Nao foi possivel alterar o status da OS.');
    },
  });

  const handleActionSelect = (actionKey) => {
    const nextStatus = ACTION_STATUS_MAP[actionKey];

    if (!nextStatus) {
      onAction(order, actionKey);
      return;
    }

    if (order.status === nextStatus || statusMutation.isPending) return;
    statusMutation.mutate({ id: order.id, status: nextStatus });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Abrir acoes da ordem"
          disabled={statusMutation.isPending}
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {ACTIONS.map((action, index) => (
          <div key={action.key}>
            {index === 3 ? <DropdownMenuSeparator /> : null}
            <ActionItem
              action={action}
              disabled={
                statusMutation.isPending ||
                (ACTION_STATUS_MAP[action.key] && ACTION_STATUS_MAP[action.key] === order.status)
              }
              onSelect={() => handleActionSelect(action.key)}
            />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrderActionsMenu;

