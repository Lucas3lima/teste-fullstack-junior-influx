import { useState } from 'react';
import { Menu, Wrench } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SidebarNav } from './SidebarNav';
import { Separator } from '@/components/ui/separator';
import { ThemeToggleButton } from './ThemeToggleButton';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Topbar */}
      <header className="flex items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 py-3 text-sidebar-foreground">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="rounded p-1 hover:bg-sidebar-accent"
        >
          <Menu className="size-5" />
        </button>
        <div className="flex items-center gap-2">
          <Wrench className="size-4 text-sidebar-primary" />
          <span className="font-bold">TecFix OS</span>
        </div>
      </header>

      {/* Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <div className="flex items-center gap-2 pr-6">
              <Wrench className="size-4 text-sidebar-primary" />
              <SheetTitle>TecFix OS</SheetTitle>
            </div>
          </SheetHeader>

          <Separator />

          <div className="flex h-full flex-col">
            <SidebarNav onNavigate={() => setOpen(false)} />
            <div className="mt-auto px-2 pb-2">
              <ThemeToggleButton className="w-full justify-start" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
