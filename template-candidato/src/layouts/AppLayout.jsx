import { NavLink, Outlet } from 'react-router-dom';

function getNavClass({ isActive }) {
  return isActive
    ? 'rounded bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900'
    : 'rounded px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700';
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold">TecFix OS</h1>
          <nav className="flex gap-2">
            <NavLink to="/" end className={getNavClass}>
              Dashboard
            </NavLink>
            <NavLink to="/customers" className={getNavClass}>
              Clientes
            </NavLink>
            <NavLink to="/orders" className={getNavClass}>
              Ordens
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
