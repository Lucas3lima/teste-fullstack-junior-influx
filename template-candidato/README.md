# TecFix Admin - Template para Teste Técnico

Este é o template inicial para o desafio de **Desenvolvedor Júnior Fullstack**.

## 🚀 Como Executar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz de `template-candidato/` com:
   ```bash
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_anon_key
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Banco de dados (Supabase):**
   - O arquivo SQL do schema esta em `schema.sql`.
   - No painel do Supabase, abra o **SQL Editor**, cole o conteudo de `schema.sql` e execute.
   - Esse arquivo cria:
     - tabela `clientes`
     - tabela `ordens_servico` com FK para `clientes`
     - constraints e indices principais
     - RLS + policies
   - Politica de permissoes aplicada neste desafio:
     - `SELECT`, `INSERT` e `UPDATE` permitidos para `anon` e `authenticated`
     - `DELETE` bloqueado (sem policy de delete + revoke)

## 🔐 RLS e Permissões

As duas tabelas (`clientes` e `ordens_servico`) estao com **RLS habilitado**.

Policies criadas:
- `SELECT`: permitido para `anon` e `authenticated`
- `INSERT`: permitido para `anon` e `authenticated`
- `UPDATE`: permitido para `anon` e `authenticated`
- `DELETE`: nao possui policy, portanto bloqueado por RLS

> Observacao: essa escolha facilita o teste tecnico (sem fluxo de login). Em ambiente de producao, o ideal e restringir insercao/atualizacao para usuarios autenticados com regras mais especificas.

## 📝 Instruções de Desenvolvimento

As tarefas que você precisa implementar estão descritas em detalhes no arquivo **`INSTRUCOES.md`** localizado na raiz deste repositório.
