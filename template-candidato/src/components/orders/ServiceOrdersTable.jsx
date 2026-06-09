import { useEffect, useMemo, useState } from 'react';
import PaginationControls from '@/components/shared/PaginationControls';
import StatusBadge from '@/components/dashboard/StatusBadge';
import OrderActionsMenu from './OrderActionsMenu';

function ServiceOrdersTable({ orders, formatCurrency, formatDate }) {
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const totalItems = orders.length;
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

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return orders.slice(start, start + pageSize);
  }, [orders, page]);

  const onPrevious = () => setPage((current) => Math.max(current - 1, 1));
  const onNext = () =>
    setPage((current) => Math.min(current + 1, Math.max(totalPages, 1)));

  return (
    <section className="rounded-xl border border-border/60 bg-card">
      <header className="border-b border-border/60 px-4 py-3">
        <h2 className="text-sm font-semibold">Lista de Ordens de Servico</h2>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr className="border-b border-border/50">
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Descricao</th>
              <th className="px-4 py-3 font-medium">Valor</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 text-right font-medium">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Nenhuma OS encontrada.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border/50 transition-colors hover:bg-muted/40"
                >
                  <td className="px-4 py-3 font-medium">{order.cliente}</td>
                  <td className="px-4 py-3 text-muted-foreground">{order.descricao}</td>
                  <td className="px-4 py-3">{formatCurrency(order.valor)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <OrderActionsMenu order={order} />
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

export default ServiceOrdersTable;

