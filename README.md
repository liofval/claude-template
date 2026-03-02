<p align='center'>
  English | <a href='./README.ja.md'>日本語</a>
</p>

# claude-template

A project template with pre-configured [Claude Code](https://docs.anthropic.com/en/docs/claude-code) rules and documentation structure. Clone this repository to start new projects with consistent coding standards enforced by AI.

## What is this?

This template provides two things:

1. **`.claude/rules/`** — Path-scoped rules that Claude Code automatically applies when editing matching files
2. **`docs/`** — Documentation templates (architecture, ER diagram, API spec, ADR, etc.)

When you use Claude Code in a project cloned from this template, the AI will follow these rules automatically — no manual prompting required.

## Directory Structure

```
claude-template/
├── .claude/
│   └── rules/                  # Claude Code path-scoped rules
│       ├── api.md              # API endpoint design
│       ├── backend.md          # Service layer / utilities
│       ├── cicd.md             # CI/CD workflows
│       ├── config.md           # Config / env variables / packages
│       ├── db.md               # Database / ORM
│       ├── docs.md             # Documentation standards
│       ├── frontend.md         # Components / pages
│       ├── hooks.md            # Custom hooks
│       ├── testing.md          # Testing
│       └── types.md            # Type definitions
├── docs/
│   ├── adr/
│   │   └── 0000-template.md    # ADR template
│   ├── README.md               # Docs index
│   ├── api-specification.md    # API endpoint spec
│   ├── architecture.md         # Architecture overview
│   ├── deployment.md           # Deployment guide
│   ├── er-diagram.md           # ER diagram (Mermaid)
│   └── setup.md                # Dev environment setup
├── .gitignore
├── CLAUDE.md                   # Global coding principles (SOLID, DRY, KISS, etc.)
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

| File | Scope | When it applies |
|---|---|---|
| `CLAUDE.md` | Global | Always (coding principles, naming, workflow) |
| `.claude/rules/*.md` | Path-scoped | Only when editing files matching `paths` |

## Getting Started

### 1. Clone the template

```bash
git clone https://github.com/liofval/claude-template.git my-project
cd my-project
rm -rf .git
git init
```

### 2. Customize rules

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

### 3. Fill in documentation

The `docs/` directory contains templates with placeholder comments. Fill them in as your project evolves:

- `architecture.md` — Tech stack, directory structure, data flow
- `er-diagram.md` — Database schema in Mermaid notation
- `api-specification.md` — API endpoints
- `setup.md` — Development environment setup
- `deployment.md` — Deployment procedures
- `adr/` — Architecture Decision Records (use `0000-template.md` as base)

### 4. Start coding with Claude Code

```bash
claude
```

Claude Code will now automatically apply the appropriate rules as you work on different parts of the codebase.

## Rules Overview

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
