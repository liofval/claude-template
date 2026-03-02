---
paths:
  - "src/lib/**/*.ts"
  - "src/services/**/*.ts"
  - "src/utils/**/*.ts"
---

# Backend Rules

## アーキテクチャ

### Do
- ビジネスロジックは `services/` に集約する
- ユーティリティ関数は純粋関数として実装する
- 外部サービスとの通信は専用のクライアントモジュールに隔離する

### Don't
- Controller や API Route からDBを直接操作しない
- ユーティリティ関数に副作用を持たせない

### Example
```ts
// Good
// src/services/user.service.ts
export const userService = {
  async create(data: CreateUserInput): Promise<User> {
    return userRepository.create(data);
  },
};

// src/app/api/users/route.ts
const user = await userService.create(data);

// Bad
// src/app/api/users/route.ts
const user = await prisma.user.create({ data }); // API Routeから直接DB操作
```

## 型安全性

### Do
- 関数の引数と戻り値に必ず型を付ける
- 不明な型は `unknown` を使い、型ガードで絞り込む
- マジックナンバー/文字列は定数として定義する

### Don't
- `any` 型を使わない
- 型アサーション (`as`) を安易に使わない

### Example
```ts
// Good
const MAX_RETRY = 3;

function parseInput(input: unknown): string {
  if (typeof input !== "string") throw new Error("Invalid input");
  return input;
}

// Bad
function parseInput(input: any): string {
  return input as string; // 型チェックなしにアサーション
}
```

## エラーハンドリング

### Do
- カスタムエラークラスを使い、エラーの種別を区別する
- エラーメッセージはデバッグに十分な情報を含める

### Don't
- 汎用的な `Error` だけで投げない
- エラーを握りつぶさない（空の catch）

### Example
```ts
// Good
export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`);
    this.name = "NotFoundError";
  }
}
throw new NotFoundError("User", userId);

// Bad
throw new Error("not found");
```

## テスト

### Do
- サービス層のロジックにはユニットテストを書く
- 外部依存はモックする
- テストファイルは対象ファイルと同階層に `*.test.ts` として配置する

### Don't
- テストファイルを別ディレクトリにまとめない

### Example
```
# Good - 対象と同階層
src/features/user/service/
  ├── user-service.ts
  └── user-service.test.ts

# Bad - 別ディレクトリ
src/features/user/service/user-service.ts
tests/user-service.test.ts
```
