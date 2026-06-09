import { z } from 'zod';

export const customerRowSchema = z.object({
  id: z.uuid(),
  nome: z.string().trim().min(1),
  email: z.email(),
  telefone: z.string().trim().min(1),
  created_at: z.string(),
});

const customerInputFieldsSchema = z.object({
  nome: z.string().trim().min(1),
  email: z.email(),
  telefone: z.string().trim().min(1),
});

export const createCustomerInputSchema = customerInputFieldsSchema;

export const updateCustomerInputSchema = customerInputFieldsSchema.extend({
  id: z.uuid(),
});
