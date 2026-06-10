import { supabase } from '@/supabaseClient';
import { parseApi, parseApiList } from '@/lib/parseApi';
import {
  createOrderInputSchema,
  orderListRowSchema,
  orderRowSchema,
  updateOrderStatusInputSchema,
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
    cliente_id: order.cliente_id,
    cliente: order.clientes.nome,
    descricao: order.descricao,
    valor: order.valor,
    status: order.status,
    createdAt: order.created_at,
  };
}

export async function getOrders({ search, status } = {}) {
  const normalizedSearch = search?.trim();
  // Evita quebrar a string raw do filtro PostgREST.
  const sanitizedSearch = normalizedSearch?.replace(/[,%]/g, '').trim();
  const baseSelect = `
      id,
      cliente_id,
      descricao,
      valor,
      status,
      created_at,
      clientes!inner(nome)
    `;

  const applyStatusFilter = (queryBuilder) => {
    if (status && status !== 'Todos') {
      return queryBuilder.eq('status', status);
    }
    return queryBuilder;
  };

  if (!sanitizedSearch) {
    // Sem texto: executa a consulta padrao (mais barata).
    const defaultQuery = applyStatusFilter(
      supabase.from('ordens_servico').select(baseSelect)
    );
    const { data, error } = await defaultQuery.order('created_at', {
      ascending: false,
    });

    if (error) throw error;

    const orders = parseApiList(orderListRowSchema, data ?? [], 'getOrders');
    return orders.map(normalizeOrderListRow);
  }

  const searchPattern = `%${sanitizedSearch}%`;
  // Busca por descricao na tabela principal.
  const descriptionQuery = applyStatusFilter(
    supabase
      .from('ordens_servico')
      .select(baseSelect)
      .ilike('descricao', searchPattern)
  );
  // Busca por nome do cliente na tabela relacionada.
  const customerQuery = applyStatusFilter(
    supabase
      .from('ordens_servico')
      .select(baseSelect)
      .ilike('clientes.nome', searchPattern)
  );

  const [
    { data: descriptionData, error: descriptionError },
    { data: customerData, error: customerError },
  ] = await Promise.all([
    descriptionQuery.order('created_at', { ascending: false }),
    customerQuery.order('created_at', { ascending: false }),
  ]);

  if (descriptionError) throw descriptionError;
  if (customerError) throw customerError;

  // Merge em memoria:
  // - evita OR misto (descricao + clientes.nome) que pode retornar 400 no PostgREST
  // - remove duplicados quando a mesma OS bate nas duas buscas
  const mergedById = new Map();
  [...(descriptionData ?? []), ...(customerData ?? [])].forEach((row) => {
    mergedById.set(row.id, row);
  });

  // Mantem ordenacao mais recente primeiro, igual a listagem padrao.
  const mergedRows = Array.from(mergedById.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const orders = parseApiList(orderListRowSchema, mergedRows, 'getOrders');
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

export async function updateOrderStatus(payload) {
  const { id, status } = updateOrderStatusInputSchema.parse(payload);
  const { data, error } = await supabase
    .from('ordens_servico')
    .update({ status })
    .eq('id', id)
    .select('id, cliente_id, descricao, valor, status, created_at')
    .single();

  if (error) throw error;
  const order = parseApi(orderRowSchema, data, 'updateOrderStatus');
  return normalizeOrder(order);
}
