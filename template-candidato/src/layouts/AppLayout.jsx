import { Outlet } from 'react-router-dom';
import { DesktopSidebar } from '@/components/app/DesktopSidebar';
import { MobileSidebar } from '@/components/app/MobileSidebar';

function AppLayout() {
  return (
    <>
      {/* Mobile layout */}
      <div className="min-h-screen bg-background md:hidden">
        <MobileSidebar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid md:min-h-screen md:grid-cols-[16rem_minmax(0,1fr)] bg-background">
        <DesktopSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AppLayout;
