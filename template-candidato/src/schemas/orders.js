import { z } from 'zod';

export const orderStatusSchema = z.enum([
  'Pendente',
  'Em Andamento',
  'Finalizada',
  'Cancelada',
]);

export const orderListRowSchema = z.object({
  id: z.uuid(),
  cliente_id: z.uuid(),
  descricao: z.string().trim().min(1),
  valor: z.coerce.number().nonnegative(),
  status: orderStatusSchema,
  created_at: z.string(),
  clientes: z.object({
    nome: z.string().trim().min(1),
  }),
});

export const orderRowSchema = z.object({
  id: z.uuid(),
  cliente_id: z.uuid(),
  descricao: z.string().trim().min(1),
  valor: z.coerce.number().nonnegative(),
  status: orderStatusSchema,
  created_at: z.string(),
});

const orderInputFieldsSchema = z.object({
  cliente_id: z.uuid(),
  descricao: z.string().trim().min(1),
  valor: z.coerce.number().nonnegative(),
  status: orderStatusSchema,
});

export const createOrderInputSchema = orderInputFieldsSchema;

export const updateOrderInputSchema = orderInputFieldsSchema.extend({
  id: z.uuid(),
});
