---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "**/*.spec.tsx"
---

# Testing Rules

## テスト構成

### Do
- テストファイルは対象ファイルと同階層に `*.test.ts(x)` として配置する
- `describe` でテスト対象の関数/コンポーネント名をグルーピングする
- テスト名は「何をしたら何が起きるか」を明確に書く

### Don't
- テストファイルを `__tests__/` 等の別ディレクトリにまとめない
- テスト名を曖昧にしない

### Example
```ts
// Good
// src/services/user.service.test.ts（対象と同階層）
describe("userService.create", () => {
  it("有効なデータで新規ユーザーを作成する", async () => { ... });
  it("メールアドレスが重複している場合にエラーを投げる", async () => { ... });
});

// Bad
// tests/services/user.test.ts（別ディレクトリ）
describe("test", () => {
  it("works", async () => { ... }); // 何をテストしているか不明
});
```

## テストの書き方

### Do
- AAA パターン（Arrange / Act / Assert）に従う
- 1テストにつき1アサーションを原則とする
- 各テストは独立して実行できるようにする

### Don't
- テスト間で状態を共有しない
- 1テストに複数の無関係なアサーションを詰め込まない

### Example
```ts
// Good
it("ユーザー名を返す", () => {
  // Arrange
  const user = createUser({ name: "Alice" });
  // Act
  const result = user.getDisplayName();
  // Assert
  expect(result).toBe("Alice");
});

// Bad
it("ユーザーテスト", () => {
  const user = createUser({ name: "Alice" });
  expect(user.getDisplayName()).toBe("Alice");
  expect(user.isActive()).toBe(true);      // 無関係なアサーションが混在
  expect(user.getEmail()).toBeDefined();
});
```

## モック

### Do
- 外部API・DB・ファイルシステムなどの外部依存はモックする
- モックは必要最小限にとどめる
- モックのリセットは `beforeEach` / `afterEach` で確実に行う

### Don't
- 実装の内部詳細をモックしすぎない
- モックのリセット忘れでテスト間に依存を作らない

### Example
```ts
// Good
const mockUserRepository = {
  findById: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

it("ユーザーが見つからない場合にエラーを投げる", async () => {
  mockUserRepository.findById.mockResolvedValue(null);
  await expect(userService.getUser("123")).rejects.toThrow(NotFoundError);
});

// Bad
it("ユーザーテスト", async () => {
  // モックのリセットなし → 前のテストの状態が残る
  const result = await userService.getUser("123");
  expect(result).toBeDefined();
});
```

## カバレッジ

### Do
- ビジネスロジック（services層）は高カバレッジを目指す
- 正常系・異常系・境界値をテストする
- UIコンポーネントのテストはユーザー操作ベースで書く

### Don't
- 実装の詳細（内部state、private メソッド等）を直接テストしない

### Example
```tsx
// Good - ユーザー操作ベース
it("送信ボタンをクリックするとフォームが送信される", async () => {
  render(<ContactForm />);
  await userEvent.type(screen.getByLabelText("メール"), "test@example.com");
  await userEvent.click(screen.getByRole("button", { name: "送信" }));
  expect(screen.getByText("送信完了")).toBeInTheDocument();
});

// Bad - 内部実装に依存
it("stateが更新される", () => {
  const { result } = renderHook(() => useContactForm());
  act(() => result.current.setState({ email: "test@example.com" })); // 内部stateを直接操作
});
```
