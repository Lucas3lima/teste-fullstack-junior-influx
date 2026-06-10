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

begin;
-- 1) Clientes (7)
insert into public.clientes (nome, email, telefone)
values
  ('Lucas Lima', 'lucas.lima@email.com', '(11) 98811-1001'),
  ('Mariana Souza', 'mariana.souza@email.com', '(11) 98811-1002'),
  ('Rafael Costa', 'rafael.costa@email.com', '(11) 98811-1003'),
  ('Camila Rocha', 'camila.rocha@email.com', '(11) 98811-1004'),
  ('Bruno Martins', 'bruno.martins@email.com', '(11) 98811-1005'),
  ('Fernanda Alves', 'fernanda.alves@email.com', '(11) 98811-1006'),
  ('Thiago Mendes', 'thiago.mendes@email.com', '(11) 98811-1007')
on conflict (email) do update
set
  nome = excluded.nome,
  telefone = excluded.telefone;
-- 2) OS (20)
with c as (
  select id, email from public.clientes
  where email in (
    'lucas.lima@email.com',
    'mariana.souza@email.com',
    'rafael.costa@email.com',
    'camila.rocha@email.com',
    'bruno.martins@email.com',
    'fernanda.alves@email.com',
    'thiago.mendes@email.com'
  )
)
insert into public.ordens_servico (cliente_id, descricao, valor, status, created_at)
values
  ((select id from c where email = 'lucas.lima@email.com'), 'Troca de tela de iPhone 11', 890.00, 'Finalizada', now() - interval '20 days'),
  ((select id from c where email = 'mariana.souza@email.com'), 'Bateria descarregando rapido no Samsung A52', 280.00, 'Em Andamento', now() - interval '19 days'),
  ((select id from c where email = 'rafael.costa@email.com'), 'Notebook nao liga apos queda de energia', 450.00, 'Pendente', now() - interval '18 days'),
  ((select id from c where email = 'camila.rocha@email.com'), 'Limpeza interna e troca de pasta termica', 220.00, 'Finalizada', now() - interval '17 days'),
  ((select id from c where email = 'bruno.martins@email.com'), 'Conector de carga do Moto G com folga', 190.00, 'Cancelada', now() - interval '16 days'),
  ((select id from c where email = 'fernanda.alves@email.com'), 'Tela de tablet trincada', 360.00, 'Em Andamento', now() - interval '15 days'),
  ((select id from c where email = 'thiago.mendes@email.com'), 'Formatacao e backup de notebook', 300.00, 'Finalizada', now() - interval '14 days'),
  ((select id from c where email = 'lucas.lima@email.com'), 'Troca de alto-falante de smartphone', 170.00, 'Pendente', now() - interval '13 days'),
  ((select id from c where email = 'mariana.souza@email.com'), 'Problema no botao power', 140.00, 'Finalizada', now() - interval '12 days'),
  ((select id from c where email = 'rafael.costa@email.com'), 'Teclado de notebook com teclas falhando', 260.00, 'Em Andamento', now() - interval '11 days'),
  ((select id from c where email = 'camila.rocha@email.com'), 'Substituicao de webcam', 180.00, 'Pendente', now() - interval '10 days'),
  ((select id from c where email = 'bruno.martins@email.com'), 'Recuperacao de sistema corrompido', 520.00, 'Finalizada', now() - interval '9 days'),
  ((select id from c where email = 'fernanda.alves@email.com'), 'Troca de microfone de celular', 160.00, 'Cancelada', now() - interval '8 days'),
  ((select id from c where email = 'thiago.mendes@email.com'), 'Reparo em dobradica de notebook', 240.00, 'Em Andamento', now() - interval '7 days'),
  ((select id from c where email = 'lucas.lima@email.com'), 'Celular sem sinal de rede', 210.00, 'Pendente', now() - interval '6 days'),
  ((select id from c where email = 'mariana.souza@email.com'), 'Troca de bateria de notebook Dell', 390.00, 'Finalizada', now() - interval '5 days'),
  ((select id from c where email = 'rafael.costa@email.com'), 'Audio chiando em chamada', 130.00, 'Pendente', now() - interval '4 days'),
  ((select id from c where email = 'camila.rocha@email.com'), 'Troca de touch de tablet Samsung', 410.00, 'Em Andamento', now() - interval '3 days'),
  ((select id from c where email = 'bruno.martins@email.com'), 'Atualizacao de SSD e clonagem de disco', 650.00, 'Finalizada', now() - interval '2 days'),
  ((select id from c where email = 'fernanda.alves@email.com'), 'Aparelho molhou e nao liga', 480.00, 'Pendente', now() - interval '1 day');
commit;
