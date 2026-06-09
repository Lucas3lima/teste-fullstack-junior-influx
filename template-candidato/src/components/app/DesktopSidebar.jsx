import { Wrench } from 'lucide-react';
import { SidebarNav } from './SidebarNav';
import { Separator } from '@/components/ui/separator';

export function DesktopSidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-4 py-4">
        <Wrench className="size-5 text-sidebar-primary" />
        <span className="text-base font-bold">TecFix OS</span>
      </div>

      <Separator />

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-2">
        <SidebarNav />
      </div>
    </aside>
  );
}
