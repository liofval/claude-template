---
paths:
  - "*.config.*"
  - ".env*"
  - "tsconfig*.json"
  - "package.json"
---

# Config Rules

## 環境変数
- 環境変数は `.env.local` で管理し、`.env.local` は `.gitignore` に含める。
- `.env.example` にすべての環境変数のキーとコメントを記載する。
- 環境変数はアプリケーションコードで直接参照せず、設定モジュール経由でアクセスする。
- シークレット情報（APIキー、DB接続文字列等）は絶対にコミットしない。

## 設定ファイル
- 設定ファイルを変更する場合は影響範囲を事前に確認する。
- `tsconfig.json` の `strict` は有効にする。
- 不要な依存パッケージは追加しない。既存の依存で代替できないか確認する。

## パッケージ管理
- パッケージの追加・更新時はバージョンを明示する。
- lockファイル（`package-lock.json` / `pnpm-lock.yaml` 等）は必ずコミットする。
- `devDependencies` と `dependencies` を正しく区別する。
