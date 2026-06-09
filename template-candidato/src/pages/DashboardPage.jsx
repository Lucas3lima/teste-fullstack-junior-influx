import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabaseClient';

function DashboardPage() {
  const queryClient = useQueryClient();
  const supabaseHost = import.meta.env.VITE_SUPABASE_URL || null;
  const hasAnonKey = Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);

  const clientesQuery = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const response = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (response.error) {
        throw response.error;
      }

      return response.data ?? [];
    },
  });

  const ordensServicoQuery = useQuery({
    queryKey: ['ordens-servico'],
    queryFn: async () => {
      const response = await supabase
        .from('ordens_servico')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (response.error) {
        throw response.error;
      }

      return response.data ?? [];
    },
  });

  const debugState = {
    env: {
      hasSupabaseUrl: Boolean(supabaseHost),
      supabaseHost,
      hasAnonKey,
    },
    queries: {
      clientes: {
        isPending: clientesQuery.isPending,
        isFetching: clientesQuery.isFetching,
        isError: clientesQuery.isError,
        error: clientesQuery.error
          ? {
              message: clientesQuery.error.message,
              details: clientesQuery.error.details ?? null,
              hint: clientesQuery.error.hint ?? null,
              code: clientesQuery.error.code ?? null,
            }
          : null,
        rows: clientesQuery.data ?? [],
      },
      ordensServico: {
        isPending: ordensServicoQuery.isPending,
        isFetching: ordensServicoQuery.isFetching,
        isError: ordensServicoQuery.isError,
        error: ordensServicoQuery.error
          ? {
              message: ordensServicoQuery.error.message,
              details: ordensServicoQuery.error.details ?? null,
              hint: ordensServicoQuery.error.hint ?? null,
              code: ordensServicoQuery.error.code ?? null,
            }
          : null,
        rows: ordensServicoQuery.data ?? [],
      },
    },
  };

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => clientesQuery.refetch()}
          className="rounded bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500"
        >
          Recarregar clientes
        </button>
        <button
          type="button"
          onClick={() => ordensServicoQuery.refetch()}
          className="rounded bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500"
        >
          Recarregar ordens
        </button>
        <button
          type="button"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['clientes'] })}
          className="rounded bg-slate-700 px-4 py-2 font-medium hover:bg-slate-600"
        >
          Invalidate clientes
        </button>
        <button
          type="button"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ['ordens-servico'] })
          }
          className="rounded bg-slate-700 px-4 py-2 font-medium hover:bg-slate-600"
        >
          Invalidate ordens
        </button>
      </div>

      {(!supabaseHost || !hasAnonKey) && (
        <p className="rounded border border-yellow-500 bg-yellow-900/30 p-3 text-sm text-yellow-200">
          Configuracao incompleta: revise VITE_SUPABASE_URL e
          VITE_SUPABASE_ANON_KEY no arquivo .env e reinicie o Vite.
        </p>
      )}

      <pre className="overflow-auto rounded border border-slate-700 bg-slate-900 p-4 text-sm">
        {JSON.stringify(debugState, null, 2)}
      </pre>
    </section>
  );
}

export default DashboardPage;
