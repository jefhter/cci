# Sistema de Controle de Oficinas de Programacao

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

Aplicacao em producao: https://ellp-web.vercel.app/

Uma plataforma de gestao educacional voltada para um projeto de ensino publico. O sistema automatiza o ciclo de vida de oficinas de programacao, desde o cadastro de turmas ate a aprovacao por frequencia.

## 1. Descricao do Sistema

O **Sistema de Controle de Oficinas de Programacao** tem o proposito de otimizar a gestao de atividades complementares, permitindo que professores gerenciem oficinas, organizem tutores auxiliares e acompanhem o progresso dos alunos de forma centralizada.

Este software serve como infraestrutura tecnologica para o projeto de extensao **ELLP (Escritorio Livre de Linguagens de Programacao)**, permitindo que o conhecimento academico transcenda os muros da universidade e impacte positivamente a comunidade local.

## 2. Equipe (Grupo 4)

* [Gabriel De Peder](https://github.com/GabrielDPeder)
* [Jefhter Rodrigues Cabral](https://github.com/jefhter)
* [Joao Vitor Antoniel](https://github.com/Batujao)
* [Samuel Penha Jacobsen](https://github.com/samuelpjacobsen)

## 3. Objetivo do Sistema

Centralizar e automatizar a gestao das oficinas do projeto ELLP: cadastro de alunos, professores e tutores; criacao de oficinas e aulas; matricula de alunos; registro de presenca; e aprovacao automatica por frequencia (75%), com relatorios e um painel de acompanhamento.

## 4. Funcionalidades Desenvolvidas

| Codigo | Descricao |
| :--- | :--- |
| **RF01** | Cadastro de alunos |
| **RF02** | Cadastro de professores |
| **RF03** | Cadastro de tutores |
| **RF04** | Cadastro de oficinas |
| **RF05** | Matricula de alunos em oficinas |
| **RF06** | Registro de aulas e de presenca |
| **RF07** | Calculo automatico de frequencia e aprovacao (75%) |
| **RF08** | Consulta de status e historico das matriculas |
| **RF09** | Relatorios por oficina e painel (dashboard) |
| **RF10** | Autenticacao (JWT) e gerenciamento de usuarios e papeis |

### Controle de Acesso

| Papel     | Permissoes                                                       |
| --------- | ---------------------------------------------------------------- |
| Admin     | Acesso total + gerenciamento de papeis dos usuarios              |
| Professor | CRUD de oficinas, alunos, matriculas, aulas e presenca           |
| Tutor     | Acesso as oficinas em que participa                              |
| Pendente  | Sem acesso ate aprovacao por um admin                            |

## 5. Arquitetura

Monorepo Turborepo com frontend e backend separados.

```
ellp-system/
├── apps/
│   ├── api/          # Backend Express + TypeScript + PostgreSQL (driver pg)
│   └── web/          # Frontend Next.js + React + Tailwind CSS
├── packages/
│   ├── db/           # Schema de referencia do banco
│   ├── types/        # Tipos TypeScript compartilhados
│   ├── ui/           # Componentes de interface compartilhados
│   ├── eslint-config/
│   └── typescript-config/
├── docker-compose.yml
└── turbo.json
```

O backend acessa o PostgreSQL diretamente pelo driver `pg`. O schema do banco e criado pelo script de migracao em `apps/api/src/database/migrate.ts`.

## 6. Ferramentas Utilizadas (nome, versao e link)

### Para codificar, compilar e executar

| Ferramenta | Versao | Link |
| ---------- | ------ | ---- |
| Node.js | 24.x (minimo 18) | https://nodejs.org/ |
| pnpm | 9.0.0 | https://pnpm.io/ |
| TypeScript | 5.9.x | https://www.typescriptlang.org/ |
| Turborepo | 2.9.x | https://turborepo.dev/ |
| tsx | 4.19.x | https://github.com/privatenumber/tsx |

### Para criar e hospedar a base de dados

| Ferramenta | Versao | Link |
| ---------- | ------ | ---- |
| PostgreSQL | 16 (imagem `postgres:16-alpine`) | https://www.postgresql.org/ |
| Docker + Docker Compose | 24+ | https://docs.docker.com/get-docker/ |

### Bibliotecas e ferramentas complementares

| Biblioteca | Versao | Link |
| ---------- | ------ | ---- |
| Express | 4.21.x | https://expressjs.com/ |
| pg (driver PostgreSQL) | 8.13.x | https://node-postgres.com/ |
| jsonwebtoken | 9.0.x | https://github.com/auth0/node-jsonwebtoken |
| bcryptjs | 2.4.x | https://github.com/dcodeIO/bcrypt.js |
| dotenv | 16.4.x | https://github.com/motdotla/dotenv |
| Next.js | 16.x | https://nextjs.org/ |
| React | 19.x | https://react.dev/ |
| Tailwind CSS | 4.x | https://tailwindcss.com/ |
| Recharts | 3.x | https://recharts.org/ |

## 7. Como compilar e executar

Todos os comandos partem da pasta `ellp-system/`.

### Pre-requisitos

- Node.js 18+ (recomendado 24.x) instalado
- pnpm 9 instalado (`npm install -g pnpm@9`)
- Docker + Docker Compose instalados e em execucao

### 7.1. Salvar o codigo

```bash
git clone https://github.com/samuelpjacobsen/cci.git
cd cci/ellp-system
```

### 7.2. Criar e executar a base de dados

Sobe o PostgreSQL 16 em container (usuario `ellp`, senha `ellp123`, banco `ellp_dev`):

```bash
docker compose up -d db
```

### 7.3. Configurar variaveis de ambiente

O backend le o arquivo `.env` a partir da pasta `apps/api`, e o frontend a partir de `apps/web`:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

### 7.4. Instalar dependencias

```bash
pnpm install
```

### 7.5. Criar as tabelas e popular contas padrao

```bash
pnpm --filter api run migrate
pnpm --filter api run seed
```

### 7.6. Executar a aplicacao

Em dois terminais (ou use `pnpm dev` na raiz para subir os dois):

```bash
pnpm --filter api run dev   # backend em http://localhost:3001
pnpm --filter web run dev   # frontend em http://localhost:3000
```

Acesse http://localhost:3000.

## 8. Contas de Acesso Padrao

Criadas automaticamente pelo comando `pnpm --filter api run seed`:

| Papel     | Email                | Senha    |
| --------- | -------------------- | -------- |
| Admin     | admin@ellp.com       | admin123 |
| Professor | professor@ellp.com   | prof123  |

> Observacao: caso o seed nao seja executado, o **primeiro usuario cadastrado** na tela de registro recebe automaticamente o papel de admin; os demais ficam como "pendente" ate aprovacao.

## 9. Roteiro para Testar o Sistema

1. **Login**: acesse http://localhost:3000 e entre com a conta admin (`admin@ellp.com` / `admin123`).
2. **Cadastrar um aluno** (menu Alunos). O seed ja traz "Ana Souza" e "Bruno Lima" como exemplo.
3. **Cadastrar uma oficina** (menu Oficinas), informando nome, professor responsavel e vagas. O seed ja traz a oficina "Introducao a Logica de Programacao".
4. **Matricular o aluno** na oficina (menu Matriculas). Uma matricula depende de um aluno e de uma oficina ja cadastrados.
5. **Registrar uma aula** na oficina e, em seguida, **marcar a presenca** dos alunos matriculados.
6. **Conferir a frequencia**: ao atingir 75% de presenca, a matricula e marcada como aprovada automaticamente.
7. **Relatorios/Dashboard**: verifique os totais e a media de presenca por oficina no painel.

> Ordem obrigatoria de cadastro: usuario -> aluno e oficina -> matricula -> aula -> presenca.

## 10. Variaveis de ambiente

| Variavel               | Onde                | Descricao                                     |
| ---------------------- | ------------------- | --------------------------------------------- |
| `DATABASE_URL`         | `apps/api/.env`     | Connection string do PostgreSQL               |
| `JWT_SECRET`           | `apps/api/.env`     | Chave secreta para assinar tokens JWT         |
| `PORT`                 | `apps/api/.env`     | Porta do backend (default: 3001)              |
| `NEXT_PUBLIC_API_URL`  | `apps/web/.env.local` | URL base da API (default: localhost:3001/api) |

## 11. Endpoints principais

| Metodo | Rota                    | Descricao                    |
| ------ | ----------------------- | ---------------------------- |
| POST   | `/api/auth/register`    | Cadastro de usuario          |
| POST   | `/api/auth/login`       | Login (retorna JWT)          |
| GET    | `/api/oficinas`         | Listar oficinas              |
| GET    | `/api/alunos`           | Listar alunos                |
| POST   | `/api/matriculas`       | Matricular aluno em oficina  |
| POST   | `/api/presencas/toggle` | Registrar presenca           |
| GET    | `/api/presencas/stats`  | Estatisticas de frequencia   |
| GET    | `/api/relatorios`       | Relatorio geral              |
| GET    | `/api/relatorios/dashboard` | Dados do painel          |

## 12. Referencias Tecnicas

* GAMMA, Erich; et al. *Padroes de projetos: solucoes reutilizaveis de software orientados a objetos*.
* MARTIN, Robert C. *Codigo limpo: Habilidades praticas do Agile Software*.
* FOWLER, Martin. *Refatoracao*.
* KROENKE, David M. *Banco de dados: fundamentos, projeto e implementacao*.
* PRESSMAN, Roger S.; MAXIM, Bruce R. *Engenharia de software*.

---
