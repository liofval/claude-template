---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Core Coding Rules

## Do
- 関数は単一責務にする（1つの関数は1つのことだけ行う）
- 1ファイルは300行以内を目安にする（超えたら分割を検討）
- 型を明示する（引数・戻り値・変数）
- 早期リターンで条件分岐のネストを浅くする
- エラーは握りつぶさず、呼び出し元に伝える

## Don't
- `any` 型を使わない（`unknown` + 型ガードで対応する）
- 1つの関数に複数の責務を持たせない
- マジックナンバー / マジックストリングを直書きしない
- エラーを空の catch で握りつぶさない

## Example
```ts
// Good - 早期リターン + 単一責務
function validateAge(age: unknown): number {
  if (typeof age !== "number") {
    throw new ValidationError("Age must be a number");
  }
  if (age < 0 || age > 150) {
    throw new ValidationError("Age must be between 0 and 150");
  }
  return age;
}

// Bad - ネスト深い + エラー握りつぶし
function validateAge(age: any): number {
  try {
    if (typeof age === "number") {
      if (age >= 0) {
        if (age <= 150) {
          return age;
        }
      }
    }
    return 0; // エラーを無視してデフォルト値
  } catch (e) {} // 握りつぶし
}
```

```ts
// Good - 定数定義
const MAX_AGE = 150;
const MIN_AGE = 0;

if (age < MIN_AGE || age > MAX_AGE) { ... }

// Bad - マジックナンバー
if (age < 0 || age > 150) { ... }
```

## When unsure
- シンプルで読みやすいコードを優先する
- 「ジュニアエンジニアが60秒で理解できるか？」を基準にする
