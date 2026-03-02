<p align='center'>
  English | <a href='./README.ja.md'>日本語</a>
</p>

# claude-template

A project template with pre-configured [Claude Code](https://docs.anthropic.com/en/docs/claude-code) rules and documentation structure. Clone this repository to start new projects with consistent coding standards enforced by AI.

## 3 min Quick Start

1. Clone this repository
2. Run `claude`
3. Type:

> "Create a user management API"

Code will be generated automatically based on the rules and examples.

## What is this?

This template provides four things:

1. **`examples/`** — A complete reference implementation (user feature) that demonstrates all rules in action
2. **`.claude/rules/core/`** — Core rules that are always applied (architecture, structure, naming, coding)
3. **`.claude/rules/`** — Layer-specific rules applied when editing matching files
4. **`docs/`** — Documentation templates (architecture, ER diagram, API spec, ADR, etc.)

When you use Claude Code in a project cloned from this template, the AI will follow these rules automatically — no manual prompting required.

## Directory Structure

```
claude-template/
├── .claude/
│   └── rules/
│       ├── core/                   # Core rules (always applied)
│       │   ├── architecture.md     # Service / Repository layer separation
│       │   ├── coding.md           # Code quality baseline
│       │   ├── naming.md           # Naming conventions
│       │   └── structure.md        # Feature-based directory structure
│       ├── api.md                  # API endpoint design
│       ├── backend.md              # Service layer / utilities
│       ├── cicd.md                 # CI/CD workflows
│       ├── config.md               # Config / env variables / packages
│       ├── db.md                   # Database / ORM
│       ├── docs.md                 # Documentation standards
│       ├── frontend.md             # Components / pages
│       ├── hooks.md                # Custom hooks
│       ├── testing.md              # Testing
│       └── types.md                # Type definitions
├── docs/
│   ├── adr/
│   │   └── 0000-template.md       # ADR template
│   ├── README.md                   # Docs index
│   ├── requirements.md             # Requirements definition (write first)
│   ├── specifications.md           # Specifications (write first)
│   ├── api-specification.md        # API endpoint spec
│   ├── architecture.md             # Architecture overview
│   ├── deployment.md               # Deployment guide
│   ├── er-diagram.md               # ER diagram (Mermaid)
│   └── setup.md                    # Dev environment setup
├── examples/
│   └── user-feature/               # Reference implementation
│       ├── api/
│       │   ├── create-user.ts      # POST handler with Zod validation
│       │   └── get-users.ts        # GET handler with pagination
│       ├── service/
│       │   └── user-service.ts     # Business logic + custom errors
│       ├── repository/
│       │   └── user-repository.ts  # DB access via Prisma
│       ├── types/
│       │   └── user.ts             # Types, constants, response mapper
│       └── README.md               # Layer responsibilities explained
├── .gitignore                      # .wiki/ excluded
├── CLAUDE.md                       # Global coding principles (SOLID, DRY, KISS, etc.)
├── README.md
└── README.ja.md
```

## How It Works

Claude Code loads rules based on file paths. Each rule file has a YAML frontmatter that specifies which files it applies to:

```yaml
---
paths:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
---
```

When you edit a file matching these patterns, Claude Code automatically follows the rules defined in that file.

### Rule Hierarchy

| Priority | File | Scope | When it applies |
|---|---|---|---|
| 1 | `.claude/rules/core/*.md` | Core | Always when editing `src/**` (must follow) |
| 2 | `.claude/rules/*.md` | Layer | When editing files matching `paths` |
| 3 | `CLAUDE.md` | Global | Always (coding principles, naming, workflow) |

When rules conflict, higher priority wins.

## Getting Started

### 1. Clone the template

```bash
git clone https://github.com/liofval/claude-template.git my-project
cd my-project
rm -rf .git
git init
```

### 2. Write requirements and specifications

Before asking Claude to write code, prepare the input documents in `docs/`:

1. **`docs/requirements.md`** — Define the project overview, features, tech stack
2. **`docs/specifications.md`** — Define data models, business rules, API specs

These documents are what Claude reads to understand **what to build**. The rules (`.claude/rules/`) define **how to build it**. Both are needed for quality output.

> [!IMPORTANT]
> The more detailed your requirements and specifications are, the more accurate Claude's output will be. At minimum, fill in the tech stack and core feature list.

### 3. Customize Layer Rules

> [!IMPORTANT]
> The Layer Rules (`.claude/rules/*.md`) are written with **TypeScript / Next.js / Prisma** as defaults. **You must rewrite them to match your project's tech stack.** Core Rules (`core/`) are language-agnostic and can be used as-is.

Edit the rules in `.claude/rules/` to match your project's tech stack. Each rule follows the **Do/Don't + Example** format:

```markdown
### Do
- Use Zod for request body validation

### Don't
- Use unvalidated input directly

### Example
// Good
const result = schema.safeParse(body);

// Bad
const { email } = await req.json(); // no validation
```

### 4. Fill in documentation

The `docs/` directory contains templates with placeholder comments. Fill them in as your project evolves:

- `architecture.md` — Tech stack, directory structure, data flow
- `er-diagram.md` — Database schema in Mermaid notation
- `api-specification.md` — API endpoints
- `setup.md` — Development environment setup
- `deployment.md` — Deployment procedures
- `adr/` — Architecture Decision Records (use `0000-template.md` as base)

### 5. Start coding with Claude Code

```bash
claude
```

Claude Code will now automatically apply the appropriate rules as you work on different parts of the codebase.

> **Tip**: You can also explicitly tell Claude:
> "Follow the CLAUDE.md and rules in this project."

## Rules Overview

### Core Rules (always applied to `src/**`)

| Rule File | Key Points |
|---|---|
| `core/architecture.md` | Business logic in service, DB access via repository, Controller handles request/response only |
| `core/structure.md` | Feature-based directory structure (`features/` / `shared/` / `lib/`) |
| `core/naming.md` | camelCase functions, PascalCase types, kebab-case files |
| `core/coding.md` | Single responsibility, no `any`, early returns, no magic numbers |

### Layer Rules (applied per file path)

| Rule File | Target Paths | Key Points |
|---|---|---|
| `frontend.md` | `src/components/**`, `src/pages/**`, `src/app/**` | Display-only components, logic in hooks, named exports, Tailwind |
| `api.md` | `src/app/api/**`, `src/pages/api/**` | RESTful design, Zod validation, unified error format |
| `backend.md` | `src/lib/**`, `src/services/**`, `src/utils/**` | Business logic in services, no `any`, custom error classes |
| `db.md` | `src/db/**`, `prisma/**`, `drizzle/**` | Snake_case tables, N+1 prevention, Mermaid ER diagram |
| `hooks.md` | `src/hooks/**` | Single responsibility, object return type, effect cleanup |
| `types.md` | `src/types/**` | `interface` for objects, `as const` over `enum`, no `any` |
| `testing.md` | `**/*.test.*`, `**/*.spec.*` | Colocated test files, AAA pattern, minimal mocking |
| `config.md` | `*.config.*`, `.env*`, `package.json` | Env via config module, strict TypeScript, lock files committed |
| `cicd.md` | `.github/workflows/**` | Parallel jobs, secrets in GitHub Secrets, cache dependencies |
| `docs.md` | `**/README.md`, `docs/**` | Bilingual README, Mermaid diagrams, GitHub Alerts notation |

## License

MIT
