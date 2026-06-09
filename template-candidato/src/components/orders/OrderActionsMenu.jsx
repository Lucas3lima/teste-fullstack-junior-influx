import {
  CheckCircle2,
  CircleDot,
  MoreHorizontal,
  Pencil,
  Eye,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ACTIONS = [
  { key: 'view-details', label: 'Ver detalhes', icon: Eye },
  { key: 'edit', label: 'Editar', icon: Pencil },
  { key: 'mark-pending', label: 'Marcar como Pendente', icon: CircleDot },
  { key: 'mark-finished', label: 'Marcar finalizada', icon: CheckCircle2 },
  { key: 'cancel-order', label: 'Cancelar OS', icon: XCircle },
];

function ActionItem({ action, onSelect }) {
  const Icon = action.icon;
  return (
    <DropdownMenuItem
      onSelect={onSelect}
      variant={action.key === 'cancel-order' ? 'destructive' : 'default'}
    >
      <Icon className="size-4" />
      {action.label}
    </DropdownMenuItem>
  );
}

function OrderActionsMenu({ order, onAction }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Abrir acoes da ordem"
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {ACTIONS.map((action, index) => (
          <div key={action.key}>
            {index === 2 ? <DropdownMenuSeparator /> : null}
            <ActionItem action={action} onSelect={() => onAction(order, action.key)} />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrderActionsMenu;

