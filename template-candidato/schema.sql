-- TecFix - Schema SQL (clientes + ordens_servico) com RLS
-- Decisao de permissao deste desafio:
-- anon/authenticated podem SELECT, INSERT e UPDATE
-- DELETE bloqueado (sem policy + revoke)

create extension if not exists pgcrypto;

create table if not exists public.clientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null unique,
  telefone text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ordens_servico (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null,
  descricao text not null,
  valor numeric(10, 2) not null check (valor >= 0),
  status text not null default 'Pendente'
    check (status in ('Pendente', 'Em Andamento', 'Finalizada', 'Cancelada')),
  created_at timestamptz not null default now(),
  constraint ordens_servico_cliente_id_fkey
    foreign key (cliente_id)
    references public.clientes (id)
    on update cascade
    on delete restrict
);

create index if not exists idx_ordens_servico_cliente_id
  on public.ordens_servico (cliente_id);

create index if not exists idx_ordens_servico_status
  on public.ordens_servico (status);

create index if not exists idx_ordens_servico_created_at
  on public.ordens_servico (created_at desc);

alter table public.clientes enable row level security;
alter table public.ordens_servico enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on table public.clientes to anon, authenticated;
grant select, insert, update on table public.ordens_servico to anon, authenticated;
revoke delete on table public.clientes from anon, authenticated;
revoke delete on table public.ordens_servico from anon, authenticated;

drop policy if exists clientes_select_public on public.clientes;
create policy clientes_select_public
  on public.clientes
  for select
  to anon, authenticated
  using (true);

drop policy if exists clientes_insert_public on public.clientes;
create policy clientes_insert_public
  on public.clientes
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists clientes_update_public on public.clientes;
create policy clientes_update_public
  on public.clientes
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists ordens_select_public on public.ordens_servico;
create policy ordens_select_public
  on public.ordens_servico
  for select
  to anon, authenticated
  using (true);

drop policy if exists ordens_insert_public on public.ordens_servico;
create policy ordens_insert_public
  on public.ordens_servico
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists ordens_update_public on public.ordens_servico;
create policy ordens_update_public
  on public.ordens_servico
  for update
  to anon, authenticated
  using (true)
  with check (true);
