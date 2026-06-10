import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import AppLayout from '../layouts/AppLayout';
import CustomersPage from '../pages/CustomersPage';
import DashboardPage from '../pages/DashboardPage';
import OrdersPage from '../pages/OrdersPage';

function NotFoundPage() {
  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-bold">Pagina nao encontrada</h2>
      <p className="text-slate-300">
        A rota informada nao existe. Voce pode voltar para o dashboard.
      </p>
    </section>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <NuqsAdapter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </NuqsAdapter>
    </BrowserRouter>
  );
}

export default AppRouter;
