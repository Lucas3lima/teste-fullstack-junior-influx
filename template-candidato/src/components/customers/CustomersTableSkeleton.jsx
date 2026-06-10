import { Skeleton } from "../ui/skeleton";

function CustomersTableSkeleton() {

  return (
    <section className="rounded-xl border border-border/60 bg-card">
      <header className="border-b border-border/60 px-4 py-3">
        <h2 className="text-sm font-semibold">Lista de Clientes</h2>
      </header>

      <div className="md:overflow-x-auto">
        <table className="w-full text-sm md:min-w-[760px]">
          <thead className="text-left text-xs text-muted-foreground">
            <tr className="border-b border-border/50">
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Email</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Telefone</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Criado em</th>
              <th className="px-4 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
                className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
                <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-right">
                <Skeleton className="w-full h-4" />
                </td>
            </tr>
            <tr
                className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
                <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-right">
                <Skeleton className="w-full h-4" />
                </td>
            </tr>
            <tr
                className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
                <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-right">
                <Skeleton className="w-full h-4" />
                </td>
            </tr>
            <tr
                className="border-b border-border/50 transition-colors hover:bg-muted/40"
            >
                <td className="px-4 py-3 font-medium"><Skeleton className="w-full h-4" /></td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                <Skeleton className="w-full h-4" />
                </td>
                <td className="px-4 py-3 text-right">
                <Skeleton className="w-full h-4" />
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CustomersTableSkeleton;

