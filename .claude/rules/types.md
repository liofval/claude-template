---
paths:
  - "src/types/**/*.ts"
  - "src/types/**/*.d.ts"
---

# Types Rules

## 命名規則
- 型名はPascalCaseで記述する。
- Props型は `XxxProps`、レスポンス型は `XxxResponse`、リクエスト型は `XxxRequest` とする。
- Enum的な型は `as const` + `typeof` パターンを優先する。

## 構成
- ドメインごとにファイルを分割する（例: `user.ts`, `product.ts`）。
- 共通の型は `common.ts` にまとめる。
- APIレスポンスの型とドメインモデルの型は分離する。

## 型定義の方針
- オブジェクト型には `interface` を使用する。ユニオン型やユーティリティ型には `type` を使用する。
- `any` は禁止。`unknown` を使い型ガードで絞り込む。
- オプショナルプロパティ (`?`) は本当に省略可能な場合のみ使う。

## エクスポート
- 外部から参照される型は named export する。
- barrel export (`index.ts`) でまとめて再エクスポートする。
