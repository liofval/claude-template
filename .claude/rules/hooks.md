---
paths:
  - "src/hooks/**/*.ts"
  - "src/hooks/**/*.tsx"
---

# Hooks Rules

## 命名規則
- カスタムhookは必ず `use` プレフィックスで始める。
- 名前は目的を明確に表す（例: `useAuth`, `useFormValidation`, `usePagination`）。

## 設計原則
- 1つのhookは1つの責務に集中する。
- hookが肥大化したら小さなhookに分割する。
- 汎用的なhookと特定ドメインのhookを分離する。

## 引数・戻り値
- 引数が多い場合はオブジェクトにまとめる。
- 戻り値はオブジェクト形式で返す（分割代入で必要なものだけ取得できるように）。
- 戻り値の型は明示的に定義する。

## 副作用
- クリーンアップが必要な副作用（イベントリスナー、タイマー等）は `useEffect` の return で必ず解除する。
- `useEffect` の依存配列は正確に指定する。eslint の exhaustive-deps を無効化しない。
