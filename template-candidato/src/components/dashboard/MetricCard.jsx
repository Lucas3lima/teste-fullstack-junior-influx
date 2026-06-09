import { cn } from '@/lib/utils';

function MetricCard({ title, value, icon: Icon, iconClassName }) {
  return (
    <article className="rounded-xl border border-border/60 bg-card px-4 py-3 hover:bg-sidebar-accent transition-all duration-300">
      <div className="mb-3 flex items-center">
        <span className={cn('rounded-md bg-muted p-1.5', iconClassName)}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{title}</p>
    </article>
  );
}

export default MetricCard;

