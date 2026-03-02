---
paths:
  - "src/types/**/*.ts"
  - "src/types/**/*.d.ts"
---

# Types Rules

## 命名規則

### Do
- 型名はPascalCaseで記述する
- Props型は `XxxProps`、レスポンス型は `XxxResponse`、リクエスト型は `XxxRequest` とする
- Enum的な型は `as const` + `typeof` パターンを優先する

### Don't
- 型名をキャメルケースやスネークケースにしない
- `enum` は使わない（ツリーシェイキングに不利）

### Example
```ts
// Good
interface UserCardProps { ... }
type CreateUserRequest = { ... }
type UserResponse = { ... }

const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;
type Status = typeof STATUS[keyof typeof STATUS];

// Bad
interface userCardProps { ... }   // キャメルケース
enum Status { Active, Inactive }  // enum使用
```

## 構成

### Do
- ドメインごとにファイルを分割する（例: `user.ts`, `product.ts`）
- 共通の型は `common.ts` にまとめる
- APIレスポンスの型とドメインモデルの型は分離する

### Don't
- すべての型を1ファイルに詰め込まない

### Example
```
# Good - ドメインごとに分割
src/types/
  ├── user.ts       # User, CreateUserInput, UserResponse
  ├── post.ts       # Post, CreatePostInput, PostResponse
  ├── common.ts     # Pagination, SortOrder, ApiError
  └── index.ts      # barrel export

# Bad - 全部1ファイル
src/types/
  └── index.ts      # すべての型が1000行以上
```

## 型定義の方針

### Do
- オブジェクト型には `interface` を使用する
- ユニオン型やユーティリティ型には `type` を使用する
- 不明な型は `unknown` を使い型ガードで絞り込む

### Don't
- `any` を使わない
- オプショナルプロパティ (`?`) を安易に付けない（本当に省略可能な場合のみ）

### Example
```ts
// Good
interface User {
  id: string;
  name: string;
  bio?: string; // 本当に省略可能
}

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

// Bad
interface User {
  id: any;
  name?: string;  // 必須なのに ?
  email?: string; // 必須なのに ?
}
```

## エクスポート

### Do
- 外部から参照される型は named export する
- barrel export (`index.ts`) でまとめて再エクスポートする

### Don't
- 内部でしか使わない型を export しない

### Example
```ts
// Good
// src/types/user.ts
export interface User { ... }
export type CreateUserInput = { ... }

// src/types/index.ts (barrel export)
export type { User, CreateUserInput } from "./user";
export type { Post, CreatePostInput } from "./post";

// Bad
// src/types/user.ts
interface InternalCache { ... }  // 内部用
export { InternalCache };        // 外部に公開してしまっている
```
