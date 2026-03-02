---
paths:
  - "src/app/api/**/*.ts"
  - "src/pages/api/**/*.ts"
---

# API Rules

## エンドポイント設計

### Do
- RESTful な命名規則に従う（リソース名は複数形）
- HTTPメソッドを正しく使い分ける（GET: 取得、POST: 作成、PUT: 更新、DELETE: 削除）
- 適切なHTTPステータスコードを返す

### Don't
- エンドポイント名に動詞を使わない
- すべてのレスポンスを 200 で返さない

### Example
```ts
// Good
// GET  /api/users
// POST /api/users
// PUT  /api/users/[id]
return NextResponse.json(user, { status: 201 });

// Bad
// POST /api/getUsers
// POST /api/createUser
return NextResponse.json(user, { status: 200 }); // 作成なのに200
```

## バリデーション

### Do
- リクエストボディは Zod スキーマの `safeParse` で検証する
- バリデーションエラーは 400 で返し、エラー内容を明示する

### Don't
- `parse` を try-catch で囲むより `safeParse` を使う（制御フローが明確になる）

### Example
```ts
// Good
const schema = z.object({ email: z.string().email() });
const result = schema.safeParse(body);
if (!result.success) {
  return NextResponse.json({ error: result.error.message }, { status: 400 });
}

// Bad
const { email } = await req.json();
await db.user.create({ data: { email } }); // 未検証のまま使用
```

## エラーハンドリング

### Do
- すべてのエンドポイントで try-catch を使い、予期しないエラーは 500 で返す
- エラーレスポンスは `{ error: string }` の統一フォーマットにする

### Don't
- 内部エラーの詳細（スタックトレース等）をクライアントに露出しない

### Example
```ts
// Good
try {
  const user = await userService.create(data);
  return NextResponse.json(user, { status: 201 });
} catch (e) {
  console.error(e);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

// Bad
try {
  const user = await userService.create(data);
  return NextResponse.json(user);
} catch (e) {
  return NextResponse.json({ error: e.stack }, { status: 500 }); // スタックトレース露出
}
```

## セキュリティ

### Do
- 認証が必要なエンドポイントではセッション/トークンを検証する

### Don't
- 認証チェックを省略しない
- CORS設定を `*` にしない（本番環境）

### Example
```ts
// Good
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const users = await userService.list();
  return NextResponse.json(users);
}

// Bad
export async function GET(req: Request) {
  // 認証チェックなし
  const users = await userService.list();
  return NextResponse.json(users);
}
```
