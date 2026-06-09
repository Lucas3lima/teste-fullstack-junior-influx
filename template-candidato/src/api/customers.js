import { supabase } from '@/supabaseClient';

function normalizeCustomer(row) {
  return {
    ...row,
    createdAt: row.created_at,
  };
}

export async function getCustomers() {
  const { data, error } = await supabase
    .from('clientes')
    .select('id, nome, email, telefone, created_at')
    .order('nome', { ascending: true });

  if (error) throw error;

  return (data ?? []).map(normalizeCustomer);
}

export async function createCustomer({ nome, email, telefone }) {
  const { data, error } = await supabase
    .from('clientes')
    .insert({ nome, email, telefone })
    .select('id, nome, email, telefone, created_at')
    .single();

  if (error) throw error;
  return normalizeCustomer(data);
}

export async function updateCustomer({ id, nome, email, telefone }) {
  const { data, error } = await supabase
    .from('clientes')
    .update({ nome, email, telefone })
    .eq('id', id)
    .select('id, nome, email, telefone, created_at')
    .single();

  if (error) throw error;
  return normalizeCustomer(data);
}
