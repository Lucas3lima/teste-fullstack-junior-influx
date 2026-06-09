import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import ServiceOrdersTable from '@/components/orders/ServiceOrdersTable';
import { Plus } from 'lucide-react';
import { createOrder, getOrders, updateOrder } from '@/api/orders';
import { getCustomers } from '@/api/customers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import OrderFormOverlay from '@/components/orders/OrderFormOverlay';
import OrderDetailsOverlay from '@/components/orders/OrderDetailsOverlay';

const STATUS_FILTERS = [
  'Todos',
  'Pendente',
  'Em Andamento',
  'Finalizada',
  'Cancelada',
];

function OrdersPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    staleTime: 30_000,
  });
  const { data: customersData } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
    staleTime: 30_000,
  });

  const orders = data ?? [];
  const customers = customersData ?? [];

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

  const createMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success('OS criada com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setIsCreateOpen(false);
    },
    onError: (mutationError) => {
      toast.error(mutationError?.message ?? 'Nao foi possivel criar a OS.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      toast.success('OS atualizada com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setEditingOrder(null);
    },
    onError: (mutationError) => {
      toast.error(mutationError?.message ?? 'Nao foi possivel atualizar a OS.');
    },
  });

  const handleOrderAction = (order, actionKey) => {
    if (actionKey === 'view-details') {
      setViewingOrder(order);
      return;
    }

    if (actionKey === 'edit') {
      setEditingOrder(order);
      return;
    }

    // Placeholder para proximas iteracoes (status e cancelamento).
    console.log('order action', { orderId: order.id, actionKey });
  };

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Ordens de Servico
          </h1>
          <p className="text-sm text-muted-foreground">
            {orders.length} OS exibidas
          </p>
        </div>
        <Button
          type="button"
          className="w-full sm:w-auto sm:self-start"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="size-4" />
          Nova OS
        </Button>
      </header>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full lg:max-w-md">
          <SearchInput placeholder="Pesquisar ordem de servico" />
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
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
        onOrderAction={handleOrderAction}
      />

      <OrderFormOverlay
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        mode="create"
        customers={customers}
        isSubmitting={createMutation.isPending}
        onSubmit={(payload) => createMutation.mutate(payload)}
      />

      <OrderFormOverlay
        open={Boolean(editingOrder)}
        onOpenChange={(open) => {
          if (!open && !updateMutation.isPending) {
            setEditingOrder(null);
          }
        }}
        mode="edit"
        initialOrder={editingOrder}
        customers={customers}
        isSubmitting={updateMutation.isPending}
        onSubmit={(payload) => updateMutation.mutate(payload)}
      />

      <OrderDetailsOverlay
        open={Boolean(viewingOrder)}
        onOpenChange={(open) => {
          if (!open) setViewingOrder(null);
        }}
        order={viewingOrder}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </section>
  );
}

export default OrdersPage;
