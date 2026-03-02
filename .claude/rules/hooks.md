---
paths:
  - "src/hooks/**/*.ts"
  - "src/hooks/**/*.tsx"
---

# Hooks Rules

## 命名規則

### Do
- カスタムhookは必ず `use` プレフィックスで始める
- 名前は目的を明確に表す

### Don't
- `use` プレフィックスなしで hook を作らない
- 曖昧な命名にしない

### Example
```ts
// Good
useAuth()
useFormValidation()
usePagination()

// Bad
auth()            // useプレフィックスなし
useData()         // 何のデータか不明
useHelper()       // 曖昧
```

## 設計原則

### Do
- 1つのhookは1つの責務に集中する
- hookが肥大化したら小さなhookに分割する
- 汎用的なhookと特定ドメインのhookを分離する

### Don't
- 1つのhookに複数の無関係な責務を詰め込まない

### Example
```ts
// Good - 責務を分割
const useAuth = () => { /* 認証のみ */ };
const useUserProfile = () => { /* プロフィール取得のみ */ };

// Bad - 複数の責務が混在
const useUser = () => {
  // 認証チェック + プロフィール取得 + 通知取得 + 設定取得...
};
```

## 引数・戻り値

### Do
- 引数が多い場合はオブジェクトにまとめる
- 戻り値はオブジェクト形式で返す
- 戻り値の型は明示的に定義する

### Don't
- 引数を3つ以上並べない
- 配列形式で複数の値を返さない（useState 以外）

### Example
```ts
// Good
interface UseUserListParams {
  page: number;
  perPage: number;
  filter?: string;
}

interface UseUserListReturn {
  users: User[];
  isLoading: boolean;
  error: Error | null;
}

export const useUserList = (params: UseUserListParams): UseUserListReturn => {
  // ...
};

const { users, isLoading } = useUserList({ page: 1, perPage: 20 });

// Bad
export const useUserList = (page: number, perPage: number, filter: string, sort: string) => {
  return [users, isLoading, error]; // 配列形式・型なし
};
```

## 副作用

### Do
- クリーンアップが必要な副作用は `useEffect` の return で必ず解除する
- `useEffect` の依存配列は正確に指定する

### Don't
- eslint の `exhaustive-deps` を無効化しない
- クリーンアップを省略しない（イベントリスナー、タイマー等）

### Example
```ts
// Good
useEffect(() => {
  const handler = () => { ... };
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);

// Bad
useEffect(() => {
  window.addEventListener("resize", handler); // クリーンアップなし
}, []);
```
