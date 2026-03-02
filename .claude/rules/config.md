---
paths:
  - "*.config.*"
  - ".env*"
  - "tsconfig*.json"
  - "package.json"
---

# Config Rules

## 環境変数

### Do
- 環境変数は `.env.local` で管理し、`.gitignore` に含める
- `.env.example` にすべての環境変数のキーとコメントを記載する
- 環境変数は設定モジュール経由でアクセスする

### Don't
- シークレット情報（APIキー、DB接続文字列等）をコミットしない
- アプリケーションコードで `process.env` を直接参照しない

### Example
```ts
// Good
// src/lib/env.ts
export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  apiKey: process.env.API_KEY!,
} as const;

// src/services/user.service.ts
import { env } from "@/lib/env";
const db = connect(env.databaseUrl);

// Bad
// src/services/user.service.ts
const db = connect(process.env.DATABASE_URL!); // 直接参照
```

## 設定ファイル

### Do
- `tsconfig.json` の `strict` は有効にする
- 設定ファイルを変更する場合は影響範囲を事前に確認する

### Don't
- 不要な依存パッケージを追加しない（既存の依存で代替できないか確認する）
- `strict` を無効にしない

## パッケージ管理

### Do
- パッケージの追加・更新時はバージョンを明示する
- lockファイル（`package-lock.json` / `pnpm-lock.yaml` 等）は必ずコミットする
- `devDependencies` と `dependencies` を正しく区別する

### Don't
- lockファイルを `.gitignore` に入れない
- 本番不要なパッケージを `dependencies` に入れない
