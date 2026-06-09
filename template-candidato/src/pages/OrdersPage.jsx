import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import ServiceOrdersTable from '@/components/orders/ServiceOrdersTable';
import { Plus } from 'lucide-react';
import { getOrders } from '@/api/orders';
import { useQuery } from '@tanstack/react-query';

const STATUS_FILTERS = [
  'Todos',
  'Pendente',
  'Em Andamento',
  'Finalizada',
  'Cancelada',
];

function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('Todos');

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    staleTime: 30_000,
  });

  const orders = data ?? [];

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'Todos') {
      return orders;
    }
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  const formatDate = (isoDate) =>
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(isoDate));

  return (
    <section className="space-y-4">
      <header className="space-y-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Ordens de Servico
          </h1>
          <p className="text-sm text-muted-foreground">
            {orders.length} OS exibidas
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Nova OS
        </Button>
      </header>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchInput placeholder="Pesquisar ordem de servico" />
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((status) => (
            <Button
              key={status}
              type="button"
              variant={statusFilter === status ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <ServiceOrdersTable
        orders={filteredOrders}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </section>
  );
}

export default OrdersPage;
