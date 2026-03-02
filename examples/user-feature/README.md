<p align='center'>
  English | <a href='./README.ja.md'>日本語</a>
</p>

# User Feature — Reference Implementation

This is a complete reference example of a feature following all Core Rules.

When creating a new feature, copy this structure and replace `user` with your feature name.

## Structure

```
user-feature/
├── api/
│   ├── create-user.ts       # POST /api/users
│   └── get-users.ts         # GET /api/users
├── service/
│   └── user-service.ts      # Business logic + custom errors
├── repository/
│   └── user-repository.ts   # DB access (Prisma)
├── types/
│   └── user.ts              # Types + response mapper
└── README.md
```

## Layer Responsibilities

```
Request → API (validation + response) → Service (business logic) → Repository (DB access)
```

| Layer | Does | Does NOT |
|---|---|---|
| `api/` | Parse request, validate with Zod, return HTTP response | Contain business logic, access DB |
| `service/` | Business rules, orchestration, throw domain errors | Know about HTTP, return Response objects |
| `repository/` | DB queries via ORM, data access | Contain business logic, handle HTTP |
| `types/` | Define interfaces, mappers, constants | Contain logic or side effects |

## About This Example

This implementation uses TypeScript, but the important thing is the structure:

- **api** — Input/output handling (HTTP request parsing, response formatting)
- **service** — Business logic (domain rules, orchestration)
- **repository** — Data access (DB queries)

Even if your project uses a different language or framework, maintain the same separation of responsibilities.

## Key Patterns Demonstrated

- **Zod validation** at the API layer
- **Custom error classes** (`DuplicateEmailError`, `UserNotFoundError`)
- **Error handling** with specific status codes per error type
- **Response mapper** (`toUserResponse`) to control exposed fields
- **`as const` pattern** for union types instead of `enum`
- **Pagination** with validated query parameters
- **Early return** for error cases
