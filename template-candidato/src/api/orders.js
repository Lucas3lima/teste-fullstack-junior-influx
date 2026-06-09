import { supabase } from '@/supabaseClient';
import { parseApi, parseApiList } from '@/lib/parseApi';
import {
  createOrderInputSchema,
  orderListRowSchema,
  orderRowSchema,
  updateOrderInputSchema,
} from '@/schemas/orders';

function normalizeOrder(row) {
  const order = parseApi(orderRowSchema, row, 'normalizeOrder');
  return {
    ...order,
    createdAt: order.created_at,
  };
}

function normalizeOrderListRow(row) {
  const order = parseApi(orderListRowSchema, row, 'normalizeOrderListRow');
  return {
    id: order.id,
    cliente: order.clientes.nome,
    descricao: order.descricao,
    valor: order.valor,
    status: order.status,
    createdAt: order.created_at,
  };
}

export async function getOrders() {
  const { data, error } = await supabase
    .from('ordens_servico')
    .select(`
      id,
      descricao,
      valor,
      status,
      created_at,
      clientes(nome)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const orders = parseApiList(orderListRowSchema, data ?? [], 'getOrders');
  return orders.map(normalizeOrderListRow);
}

export async function createOrder(payload) {
  const { cliente_id, descricao, valor, status } = createOrderInputSchema.parse(payload);
  const { data, error } = await supabase
    .from('ordens_servico')
    .insert({ cliente_id, descricao, valor, status })
    .select('id, cliente_id, descricao, valor, status, created_at')
    .single();

  if (error) throw error;
  const order = parseApi(orderRowSchema, data, 'createOrder');
  return normalizeOrder(order);
}

export async function updateOrder(payload) {
  const { id, cliente_id, descricao, valor, status } = updateOrderInputSchema.parse(payload);
  const { data, error } = await supabase
    .from('ordens_servico')
    .update({ cliente_id, descricao, valor, status })
    .eq('id', id)
    .select('id, cliente_id, descricao, valor, status, created_at')
    .single();

  if (error) throw error;
  const order = parseApi(orderRowSchema, data, 'updateOrder');
  return normalizeOrder(order);
}
