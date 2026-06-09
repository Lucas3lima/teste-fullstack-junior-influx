import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Plus } from "lucide-react";
import CustomersTable from "@/components/customers/CustomersTable";
import { mockCustomers } from "@/mocks/customersMock";

function CustomersPage() {
  return (
    <section className="space-y-4">
      <header className="space-y-1 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Clientes</h1>
          <p className="text-sm text-muted-foreground">
            {mockCustomers.length} clientes cadastrados
          </p>
        </div>
        <Button>
          <Plus className="size-4" />
          Novo Cliente
        </Button>
      </header>

      <div className="flex items-center gap-2">
        <SearchInput placeholder="Pesquisar cliente" />
      </div>

      <CustomersTable customers={mockCustomers} />
    </section>
  );
}

export default CustomersPage;
