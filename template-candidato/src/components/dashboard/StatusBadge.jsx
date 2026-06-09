import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  Pendente: 'bg-red-500/15 text-red-300 border-red-500/30',
  'Em Andamento': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Finalizada: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Cancelada: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        STATUS_STYLES[status] ?? STATUS_STYLES.Cancelada
      )}
    >
      {status}
    </span>
  );
}

export default StatusBadge;

