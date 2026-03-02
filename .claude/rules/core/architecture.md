---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Core Architecture Rules

## Do
- ビジネスロジックは service 層に書く
- DBアクセスは repository 層を通す
- Controller / API Route はリクエスト/レスポンスの処理のみ行う
- 外部サービスとの通信は専用のクライアントモジュールに隔離する

## Don't
- Controller や API Route でビジネスロジックを書かない
- DBクエリを直接 Controller や UI から呼ばない
- service 層から HTTP レスポンスを返さない

## Example
```ts
// Good
// src/features/user/api/create-user.ts
export async function POST(req: Request) {
  const body = createUserSchema.parse(await req.json());
  const user = await userService.create(body);
  return NextResponse.json(user, { status: 201 });
}

// src/features/user/service/user-service.ts
export const userService = {
  async create(input: CreateUserInput): Promise<User> {
    return userRepository.create(input);
  },
};

// src/features/user/repository/user-repository.ts
export const userRepository = {
  async create(input: CreateUserInput): Promise<User> {
    return prisma.user.create({ data: input });
  },
};

// Bad
// API Route に全部詰め込む
export async function POST(req: Request) {
  const body = await req.json();
  const user = await prisma.user.create({ data: body }); // DB直接操作
  await sendEmail(user.email); // ビジネスロジック混在
  return NextResponse.json(user);
}
```

## When unsure
- 責務が曖昧なら service 層に置く
- 「このコードは HTTP を知っているか？」→ Yes なら Controller、No なら service
