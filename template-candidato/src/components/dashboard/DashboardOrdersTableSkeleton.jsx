import { Skeleton } from '../ui/skeleton';

function DashboardOrdersTableSkeleton() {
  return (
    <section className="rounded-xl border border-border/60 bg-card">
      <header className="border-b border-border/60 px-4 py-3">
        <h2 className="text-sm font-semibold">Ultimas Ordens de Servico</h2>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr className="border-b border-border/50">
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Descricao</th>
              <th className="px-4 py-3 font-medium">Valor</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            
            <tr
              className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
              <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
            </tr>
            <tr
              className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
              <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
            </tr>
            <tr
              className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
              <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
            </tr>
            <tr
              className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
              <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
            </tr>
            <tr
              className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
              <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3"><Skeleton className="w-full h-4" /></td>
              <td className="px-4 py-3 text-muted-foreground"><Skeleton className="w-full h-4" /></td>
            </tr>
            
          </tbody>
        </table>
      </div>

     
    </section>
  );
}

export default DashboardOrdersTableSkeleton;

