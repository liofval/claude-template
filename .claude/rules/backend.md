---
paths:
  - "src/lib/**/*.ts"
  - "src/services/**/*.ts"
  - "src/utils/**/*.ts"
---

# Backend Rules

## カスタムエラークラス

### Do
- ドメインごとにカスタムエラークラスを定義し、エラーの種別を区別する
- エラーメッセージはデバッグに十分な情報を含める
- ユーティリティ関数は純粋関数として実装する（副作用を持たせない）

### Don't
- 汎用的な `Error` だけで投げない
- エラーメッセージを `"error"` や `"not found"` のような曖昧な文字列にしない

### Example
```ts
// Good - ドメイン固有のエラークラス
export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`);
    this.name = "NotFoundError";
  }
}

export class DuplicateEmailError extends Error {
  constructor(email: string) {
    super(`Email already exists: ${email}`);
    this.name = "DuplicateEmailError";
  }
}

throw new NotFoundError("User", userId);

// Bad - 汎用エラー
throw new Error("not found");
```

## テスト配置

### Do
- テストファイルは対象ファイルと同階層に `*.test.ts` として配置する
- サービス層のロジックにはユニットテストを書く
- 外部依存はモックする

### Don't
- テストファイルを別ディレクトリにまとめない

### Example
```
# Good - 対象と同階層（コロケーション）
src/features/user/service/
  ├── user-service.ts
  └── user-service.test.ts

# Bad - 別ディレクトリ
src/features/user/service/user-service.ts
tests/user-service.test.ts
```
