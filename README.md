# Sistema de Controle de Oficinas de Programacao

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

Uma plataforma de gestao educacional voltada para um projeto de ensino publico. O sistema automatiza o ciclo de vida de oficinas de programacao, desde o cadastro de turmas ate a aprovacao por frequencia.

## 1. Descricao do Sistema

O **Sistema de Controle de Oficinas de Programacao** tem o proposito de otimizar a gestao de atividades complementares. Permitindo que professores gerenciem oficinas, organizem tutores auxiliares e acompanhem o progresso dos alunos de forma centralizada.

Este software serve como infraestrutura tecnologica para o projeto de extensao **ELLP (Escritorio Livre de Linguagens de Programacao)**, permitindo que o conhecimento academico transcenda os muros da universidade e impacte positivamente a comunidade local.

## 2. Contexto Academico

O projeto esta inserido na disciplina **AS65A - Certificadora De Competencia Identitaria** da **UTFPR Campus Cornelio Procopio**.

* **Publico-alvo**: Estudantes do quinto periodo do curso de Tecnologia em Analise e Desenvolvimento de Sistemas.
* **Objetivo Pedagogico**: Integrar os conhecimentos adquiridos entre o primeiro e o quarto periodos do curso.
* **Missao**: Desenvolver um sistema computacional capaz de resolver um problema real da comunidade externa a UTFPR.

## 3. Objetivos e Impacto Social

O projeto atua como uma ponte fundamental para a extensao universitaria, fundamentado nos seguintes pilares:

* **Integracao Comunitaria**: Transmissao pratica de conhecimentos teoricos para a comunidade, especialmente em contextos de vulnerabilidade social.
* **Acesso a Universidade**: Proporciona a criancas e adolescentes de escolas publicas, ONGs e creches o contato direto com o ambiente academico da **UTFPR-CP**, desmistificando o acesso ao ensino superior.
* **Inclusao Digital**: Democratizacao do acesso a infraestrutura e ao saber tecnologico gerado pela universidade desde 2014.

## 4. Arquitetura

Monorepo Turborepo com frontend e backend separados.

```
ellp-system/
├── apps/
│   ├── api/          # Backend Express + TypeScript + PostgreSQL
│   └── web/          # Frontend Next.js 16 + React 19 + shadcn/ui
├── packages/
│   ├── db/           # Prisma schema e migrations
│   ├── types/        # Tipos TypeScript compartilhados
│   ├── ui/           # Componentes UI compartilhados
│   ├── eslint-config/
│   └── typescript-config/
├── docker-compose.yml
└── turbo.json
```

### Controle de Acesso

| Papel     | Permissoes                                                       |
| --------- | ---------------------------------------------------------------- |
| Admin     | Acesso total + gerenciamento de cargos                           |
| Professor | CRUD completo (oficinas, alunos, matriculas, presenca)           |
| Tutor     | Mesmo que professor (edita oficinas que participa)               |
| Pendente  | Sem acesso ate aprovacao por admin                               |

## 5. Requisitos Funcionais

| Codigo | Descricao |
| :--- | :--- |
| **RF01** | Cadastro de alunos |
| **RF02** | Cadastro de professores |
| **RF03** | Cadastro de tutores |
| **RF04** | Cadastro de oficinas |
| **RF05** | Matricula de alunos |
| **RF06** | Registro de presenca |
| **RF07** | Aprovacao automatica baseada em presenca (75%) |
| **RF08** | Consulta de status e historico |
| **RF09** | Emissao de Relatorios e exportacao CSV |
| **RF10** | Gerenciamento de Usuarios e papeis |

## 6. Tecnologias Utilizadas

* **Front-end**: [Next.js](https://nextjs.org/) 16 + React 19 + shadcn/ui + Tailwind CSS 4
* **Back-end**: [Express](https://expressjs.com/) + TypeScript
* **Banco de Dados**: PostgreSQL 16 via Prisma ORM
* **Monorepo**: Turborepo + pnpm workspaces
* **Containerizacao**: Docker Compose
* **Versionamento**: GitHub

## 7. Rodando local

**Banco:**

```bash
cd ellp-system
docker compose up -d
```

**Backend:**

```bash
cd ellp-system
cp .env.example .env   # ajustar DATABASE_URL e JWT_SECRET
pnpm install
pnpm --filter api run migrate
pnpm --filter api run dev   # http://localhost:3001
```

**Frontend:**

```bash
pnpm --filter web run dev   # http://localhost:3000
```

O primeiro usuario registrado recebe papel de admin automaticamente.

## 8. Variaveis de ambiente

| Variavel               | Descricao                                     |
| ---------------------- | --------------------------------------------- |
| `DATABASE_URL`         | Connection string do PostgreSQL                |
| `JWT_SECRET`           | Chave secreta para assinar tokens JWT          |
| `PORT`                 | Porta do servidor backend (default: 3001)      |
| `NEXT_PUBLIC_API_URL`  | URL base da API (default: localhost:3001/api)  |

## 9. Endpoints principais

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

## 10. Equipe (Grupo 4)

* [Gabriel De Peder](https://github.com/GabrielDPeder)
* [Jefhter Rodrigues Cabral](https://github.com/jefhter)
* [Joao Vitor Antoniel](https://github.com/Batujao)
* [Samuel Penha Jacobsen](https://github.com/samuelpjacobsen)

## 11. Referencias Tecnicas

* **Padroes de Projeto**: GAMMA, Erich; et al. *Padroes de projetos: solucoes reutilizaveis de software orientados a objetos*.
* **Qualidade de Codigo**: MARTIN, Robert C. *Codigo limpo: Habilidades praticas do Agile Software*.
* **Refatoracao**: FOWLER, Martin. *Refatoracao*.
* **Banco de Dados**: KROENKE, David M. *Banco de dados: fundamentos, projeto e implementacao*.
* **Engenharia de Software**: PRESSMAN, Roger S.; MAXIM, Bruce R. *Engenharia de software*.

---
