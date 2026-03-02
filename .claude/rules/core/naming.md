---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Core Naming Rules

## General
| 対象 | ケース | 例 |
|---|---|---|
| 関数・変数 | camelCase | `createUser`, `isLoading` |
| 型・interface | PascalCase | `UserResponse`, `CreateUserInput` |
| ファイル | kebab-case | `user-service.ts`, `create-user.ts` |
| ディレクトリ | kebab-case | `features/`, `shared/` |
| 定数 | UPPER_SNAKE_CASE | `MAX_RETRY`, `API_BASE_URL` |
| 真偽値 | `is` / `has` / `can` 接頭辞 | `isActive`, `hasPermission`, `canEdit` |

## ファイル命名

### Do
- service: `xxx-service.ts`（例: `user-service.ts`）
- repository: `xxx-repository.ts`（例: `user-repository.ts`）
- API handler: 動詞-名詞（例: `create-user.ts`, `get-users.ts`）
- hooks: `use-xxx.ts`（例: `use-auth.ts`）
- コンポーネント: PascalCase（例: `UserCard.tsx`）
- 型定義: `xxx.ts`（例: `user.ts`, `auth.ts`）
- テスト: 対象と同名 + `.test`（例: `user-service.test.ts`）

### Don't
- `Service.ts`, `Repository.ts` のように抽象的な名前にしない
- `helper.ts`, `util.ts`, `common.ts` のような曖昧な名前にしない
- ファイル名にキャメルケースを使わない（コンポーネント `.tsx` を除く）

## Example
```
# Good
src/features/user/
  ├── service/user-service.ts
  ├── repository/user-repository.ts
  ├── api/create-user.ts
  ├── hooks/use-user-list.ts
  ├── components/UserCard.tsx
  └── types/user.ts

# Bad
src/features/user/
  ├── service/Service.ts       # 何のserviceかわからない
  ├── db/query.ts              # 曖昧
  ├── api/handler.ts           # 曖昧
  ├── hooks/data.ts            # useプレフィックスなし
  ├── components/card.tsx      # PascalCaseでない
  └── types/index.ts           # 何の型かわからない
```

## When unsure
- 既存コードの命名パターンに合わせる
- 「このファイル名だけで中身が想像できるか？」を基準にする
