# TecFix OS - Teste Tecnico Fullstack

Este repositorio contem o projeto desenvolvido para o desafio tecnico de Desenvolvedor Junior Fullstack.

## Tecnologias

- React + Vite
- Supabase (PostgreSQL)
- TanStack Query
- Tailwind CSS + shadcn/ui

## Pre-requisitos

- Git
- Node.js 18+ (LTS recomendado)
- npm

## Como executar

1. Clone o repositorio:

```bash
git clone <https://github.com/Lucas3lima/teste-fullstack-junior-influx>
```

2. Entre na pasta do projeto:

```bash
cd teste-fullstack-junior
cd template-candidato
```

3. Instale as dependencias:

```bash
npm install
```

4. Crie o arquivo `.env` em `template-candidato/.env`.

5. Copie as credenciais demo abaixo para o `.env`.

6. Inicie o projeto:

```bash
npm run dev
```

7. Abra no navegador a URL mostrada no terminal (normalmente `http://localhost:5173`).

## Credenciais para avaliacao (ambiente demo)

Use este conteudo no arquivo `.env`:

```bash
VITE_SUPABASE_URL=https://atmjlinonydzqnevsdhv.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_6JwXN7pMdMsZcOpDpSYg_w_3de4giiq
```

Observacoes:

- Essas credenciais sao anon/public e servem para ambiente de avaliacao.
- Nao compartilhe `service_role key`.
- O banco demo pode sofrer alteracoes por terceiros durante o periodo de avaliacao.

## Banco de dados

O schema SQL esta em `template-candidato/schema.sql`.

- Para avaliacao com as credenciais demo acima, nao e obrigatorio recriar o schema.
- O arquivo foi mantido no repositorio como referencia tecnica (tabelas, relacionamentos e policies).

## Scripts uteis

Dentro de `template-candidato/`:

- `npm run dev`: inicia ambiente de desenvolvimento.

## Estrutura do repositorio

- `template-candidato/`: aplicacao React.
- `template-candidato/schema.sql`: estrutura do banco no Supabase.
- `INSTRUCOES.md`: enunciado original do desafio.
