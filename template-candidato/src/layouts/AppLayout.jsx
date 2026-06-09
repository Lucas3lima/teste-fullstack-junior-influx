import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { DesktopSidebar } from '@/components/app/DesktopSidebar';
import { MobileSidebar } from '@/components/app/MobileSidebar';

function AppLayout() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <MobileSidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
