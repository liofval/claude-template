---
paths:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
  - "src/app/**/*.tsx"
---

# Frontend Rules

## コンポーネント設計
- コンポーネントは表示のみに徹する。ビジネスロジックはカスタムhooksに分離する。
- propsの型は必ず `interface` で定義し、コンポーネントと同ファイルに置く。
- コンポーネントは named export を使用する（default export は使わない）。

## スタイリング
- Tailwind CSS のユーティリティクラスを使用する。
- インラインスタイル (`style={}`) は使わない。
- レスポンシブデザインはモバイルファーストで記述する。

## 状態管理
- ローカルステートは `useState` / `useReducer` を使う。
- グローバルステートは必要最小限にする。
- サーバーデータの取得・キャッシュにはデータフェッチライブラリ（SWR / TanStack Query 等）を使用する。

## パフォーマンス
- リストレンダリングには必ず一意な `key` を付与する。
- 不要な再レンダリングを避けるため、`useMemo` / `useCallback` は計測に基づいて適用する。
- 画像には `next/image` 等の最適化コンポーネントを使う。
