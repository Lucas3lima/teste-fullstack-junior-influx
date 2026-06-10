import { Skeleton } from "../ui/skeleton";


function MetricCardSkeleton() {
  return (
    <article className="rounded-xl border border-border/60 bg-card px-4 py-3 hover:bg-sidebar-accent transition-all duration-300">
      <div className="mb-3 flex items-center">
        <span className="rounded-md bg-muted p-1.5">
          <Skeleton className="w-4 h-4" />
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-tight"><Skeleton className="w-10 h-6" /></p>
      <p className="mt-1 text-xs text-muted-foreground"><Skeleton className="w-24 h-4" /></p>
    </article>
  );
}

export default MetricCardSkeleton;

