import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import PaginationControls from '@/components/shared/PaginationControls';

function CustomersTable({ customers, onEdit }) {
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const totalItems = customers.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    if (totalPages === 0) {
      setPage(1);
      return;
    }

    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return customers.slice(start, end);
  }, [customers, page]);

  const onPrevious = () => setPage((current) => Math.max(current - 1, 1));
  const onNext = () =>
    setPage((current) => Math.min(current + 1, Math.max(totalPages, 1)));

  const formatDate = (isoDate) =>
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoDate));

  return (
    <section className="rounded-xl border border-border/60 bg-card">
      <header className="border-b border-border/60 px-4 py-3">
        <h2 className="text-sm font-semibold">Lista de Clientes</h2>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr className="border-b border-border/50">
              <th className="px-4 py-3 font-medium">Nome</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Telefone</th>
              <th className="px-4 py-3 font-medium">Criado em</th>
              <th className="px-4 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Nenhum cliente encontrado.
                </td>
              </tr>
            ) : (
              paginatedCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border/50 transition-colors hover:bg-muted/40"
                >
                  <td className="px-4 py-3 font-medium">{customer.nome}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {customer.email}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {customer.telefone}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(customer.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => onEdit?.(customer)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </section>
  );
}

export default CustomersTable;

