import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Plus } from "lucide-react";
import CustomersTable from "@/components/customers/CustomersTable";
import { mockCustomers } from "@/mocks/customersMock";
import CustomerDialog from "@/components/customers/CustomerDialog";

function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleCreateSubmit = (payload) => {
    const created = {
      id: `customer-${Date.now()}`,
      nome: payload.nome,
      email: payload.email,
      telefone: payload.telefone,
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [created, ...prev]);
    console.log("Cliente criado (mock)", created);
    setIsCreateOpen(false);
  };

  const handleEditSubmit = (payload) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === payload.id
          ? {
              ...customer,
              nome: payload.nome,
              email: payload.email,
              telefone: payload.telefone,
            }
          : customer
      )
    );
    console.log("Cliente atualizado (mock)", payload);
    setEditingCustomer(null);
  };

  return (
    <section className="space-y-4">
      <header className="space-y-1 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Clientes</h1>
          <p className="text-sm text-muted-foreground">
            {customers.length} clientes cadastrados
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          Novo Cliente
        </Button>
      </header>

      <div className="flex items-center gap-2">
        <SearchInput placeholder="Pesquisar cliente" />
      </div>

      <CustomersTable
        customers={customers}
        onEdit={(customer) => setEditingCustomer(customer)}
      />

      <CustomerDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        mode="create"
        onSubmit={handleCreateSubmit}
      />

      <CustomerDialog
        open={Boolean(editingCustomer)}
        onOpenChange={(open) => {
          if (!open) setEditingCustomer(null);
        }}
        mode="edit"
        initialCustomer={editingCustomer}
        onSubmit={handleEditSubmit}
      />
    </section>
  );
}

export default CustomersPage;
