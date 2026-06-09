import { supabase } from '@/supabaseClient';
import { parseApi, parseApiList } from '@/lib/parseApi';
import {
  createCustomerInputSchema,
  customerRowSchema,
  updateCustomerInputSchema,
} from '@/schemas/customers';

function normalizeCustomer(row) {
  const customer = parseApi(customerRowSchema, row, 'normalizeCustomer');
  return {
    ...customer,
    createdAt: customer.created_at,
  };
}

export async function getCustomers() {
  const { data, error } = await supabase
    .from('clientes')
    .select('id, nome, email, telefone, created_at')
    .order('nome', { ascending: true });

  if (error) throw error;

  const customers = parseApiList(customerRowSchema, data ?? [], 'getCustomers');
  return customers.map(normalizeCustomer);
}

export async function createCustomer(payload) {
  const { nome, email, telefone } = createCustomerInputSchema.parse(payload);
  const { data, error } = await supabase
    .from('clientes')
    .insert({ nome, email, telefone })
    .select('id, nome, email, telefone, created_at')
    .single();

  if (error) throw error;
  const customer = parseApi(customerRowSchema, data, 'createCustomer');
  return normalizeCustomer(customer);
}

export async function updateCustomer(payload) {
  const { id, nome, email, telefone } = updateCustomerInputSchema.parse(payload);
  const { data, error } = await supabase
    .from('clientes')
    .update({ nome, email, telefone })
    .eq('id', id)
    .select('id, nome, email, telefone, created_at')
    .single();

  if (error) throw error;
  const customer = parseApi(customerRowSchema, data, 'updateCustomer');
  return normalizeCustomer(customer);
}
