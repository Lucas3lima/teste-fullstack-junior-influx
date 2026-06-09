import {
  Activity,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  ListTodo,
  XCircle,
} from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import OrdersTable from '@/components/dashboard/OrdersTable';
import { mockOrders } from '@/mocks/dashboardMock';

function DashboardPage() {
  const total = mockOrders.length;
  const pendentes = mockOrders.filter((order) => order.status === 'Pendente').length;
  const emAndamento = mockOrders.filter(
    (order) => order.status === 'Em Andamento'
  ).length;
  const finalizadas = mockOrders.filter(
    (order) => order.status === 'Finalizada'
  ).length;
  const canceladas = mockOrders.filter((order) => order.status === 'Cancelada').length;
  const faturamento = mockOrders
    .filter((order) => order.status === 'Finalizada')
    .reduce((sum, order) => sum + order.valor, 0);

  const latestOrders = [...mockOrders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

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
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Visao geral da assistencia técnica
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard
          title="Total de OS"
          value={total}
          icon={ListTodo}
          iconClassName="text-blue-300"
        />
        <MetricCard
          title="Pendentes"
          value={pendentes}
          icon={Clock3}
          iconClassName="text-red-300"
        />
        <MetricCard
          title="Em Andamento"
          value={emAndamento}
          icon={Activity}
          iconClassName="text-amber-300"
        />
        <MetricCard
          title="Finalizadas"
          value={finalizadas}
          icon={CheckCircle2}
          iconClassName="text-emerald-300"
        />
        <MetricCard
          title="Canceladas"
          value={canceladas}
          icon={XCircle}
          iconClassName="text-slate-300"
        />
        <MetricCard
          title="Faturamento"
          value={formatCurrency(faturamento)}
          icon={BadgeDollarSign}
          iconClassName="text-blue-300"
        />
      </div>

      <OrdersTable
        orders={latestOrders}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />
    </section>
  );
}

export default DashboardPage;
