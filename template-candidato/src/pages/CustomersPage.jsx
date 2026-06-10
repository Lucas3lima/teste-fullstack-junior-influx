import { useState } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import CustomersTable from '@/components/customers/CustomersTable';
import CustomerDialog from '@/components/customers/CustomerDialog';
import {
  createCustomer,
  getCustomers,
  updateCustomer,
} from '@/api/customers';
import { debounce, parseAsString, useQueryState } from 'nuqs';
import CustomersTableSkeleton from '@/components/customers/CustomersTableSkeleton';

function CustomersPage() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchText, setSearchText] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({ history: 'replace', shallow: true })
  );

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['customers', searchText],
    queryFn: () => getCustomers({ search: searchText }),
    staleTime: 30_000,
  });

  const customers = data ?? [];
  const createMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      toast.success('Cliente criado com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      setIsCreateOpen(false);
    },
    onError: (mutationError) => {
      toast.error(
        mutationError?.message ?? 'Nao foi possivel criar o cliente.'
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      toast.success('Cliente atualizado com sucesso.');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      setEditingCustomer(null);
    },
    onError: (mutationError) => {
      toast.error(
        mutationError?.message ?? 'Nao foi possivel atualizar o cliente.'
      );
    },
  });

  return (
    <section className="space-y-4">
      <header className="space-y-1 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Clientes</h1>
          <p className="text-sm text-muted-foreground">
            {customers.length} clientes cadastrados
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="size-4" />
          Novo Cliente
        </Button>
      </header>

      <div className="flex items-center gap-2">
        <SearchInput
          placeholder="Pesquisar cliente, email ou telefone"
          value={searchText}
          onChange={(event) =>
            setSearchText(event.target.value, {
              history: 'replace',
              shallow: false,
              limitUrlUpdates: event.target.value !== '' ? debounce(500) : undefined,
            })
          }
          inputClassName="w-full sm:w-72"
        />
      </div>



      {isError ? (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2">
          <p className="text-sm text-destructive">
            Erro ao carregar clientes: {error?.message ?? 'tente novamente.'}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => refetch()}
          >
            Tentar novamente
          </Button>
        </div>
      ) : null}

      {isFetching ? (
        <CustomersTableSkeleton />
      ) : (
        <CustomersTable
        customers={customers}
        onEdit={(customer) => setEditingCustomer(customer)}
      />
      )}

      <CustomerDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        mode="create"
        isSubmitting={createMutation.isPending}
        onSubmit={(payload) => createMutation.mutate(payload)}
      />

      <CustomerDialog
        open={Boolean(editingCustomer)}
        onOpenChange={(open) => {
          if (!open && !updateMutation.isPending) {
            setEditingCustomer(null);
          }
        }}
        mode="edit"
        initialCustomer={editingCustomer}
        isSubmitting={updateMutation.isPending}
        onSubmit={(payload) => updateMutation.mutate(payload)}
      />
    </section>
  );
}

export default CustomersPage;
