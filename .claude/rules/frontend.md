---
paths:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
  - "src/app/**/*.tsx"
---

# Frontend Rules

## コンポーネント設計

### Do
- コンポーネントは表示のみに徹し、ビジネスロジックはカスタムhooksに分離する
- propsの型は `interface` で定義し、コンポーネントと同ファイルに置く
- named export を使用する

### Don't
- コンポーネント内でデータ加工・API呼び出しをしない
- default export を使わない
- propsを `any` や暗黙の型で受け取らない

### Example
```tsx
// Good
interface UserCardProps {
  name: string;
  email: string;
}

export const UserCard = ({ name, email }: UserCardProps) => {
  return (
    <div className="rounded-lg p-4">
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
};

// Bad
export default function UserCard(props: any) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("/api/user").then((r) => r.json()).then(setUser);
  }, []);
  return <div style={{ padding: 16 }}>{props.name}</div>;
}
```

## スタイリング

### Do
- Tailwind CSS のユーティリティクラスを使用する
- レスポンシブデザインはモバイルファーストで記述する

### Don't
- インラインスタイル (`style={}`) を使わない

### Example
```tsx
// Good
<div className="p-4 md:p-8 lg:p-12">

// Bad
<div style={{ padding: "16px" }}>
```

## 状態管理

### Do
- ローカルステートは `useState` / `useReducer` を使う
- サーバーデータの取得・キャッシュにはデータフェッチライブラリ（SWR / TanStack Query 等）を使用する

### Don't
- グローバルステートに何でも入れない
- コンポーネント内で直接 `fetch` しない

## パフォーマンス

### Do
- リストレンダリングには必ず一意な `key` を付与する
- `useMemo` / `useCallback` は計測に基づいて適用する
- 画像には `next/image` 等の最適化コンポーネントを使う

### Don't
- `key` に配列の index を使わない（要素の追加・削除がある場合）
- 計測なしに `useMemo` / `useCallback` を乱用しない
