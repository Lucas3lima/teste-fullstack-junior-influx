import StatusBadge from './StatusBadge';

function OrdersTable({ orders, formatCurrency, formatDate }) {
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
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border/50 transition-colors hover:bg-muted/40"
              >
                <td className="px-4 py-3 font-medium">{order.cliente}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {order.descricao}
                </td>
                <td className="px-4 py-3">{formatCurrency(order.valor)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OrdersTable;

