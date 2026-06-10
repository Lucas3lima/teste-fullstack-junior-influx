import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  Pendente: 'bg-red-500/15 text-red-700 border-red-500/30 dark:text-red-300',
  'Em Andamento': 'bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-300',
  Finalizada: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-300',
  Cancelada: 'bg-slate-500/20 text-slate-700 border-slate-500/30 dark:text-slate-300',
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

