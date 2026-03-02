---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Core Coding Rules

## 原則
- **DRY** — 同じロジックが2箇所以上に現れたら共通化する
- **KISS** — 最もシンプルな正しい実装を選ぶ
- **YAGNI** — 今の要件だけを実装する。「将来使うかも」で追加しない
- **SRP** — 関数は1つのことだけ、ファイルは1つの関心事だけ
- **SoC** — データ取得・ビジネスロジック・表示は別レイヤーに分ける
- **OCP** — 既存コードの修正ではなく、拡張で新しい振る舞いを追加する
- **DIP** — 具体ではなく抽象に依存する。依存は外から注入する

## Do
- 1ファイルは300行以内を目安にする（超えたら分割を検討）
- 型を明示する（引数・戻り値・変数）
- 早期リターンで条件分岐のネストを浅くする
- エラーは握りつぶさず、呼び出し元に伝える
- 外部入力は必ずバリデーションしてから使う（null・undefined・空文字・想定外の型を処理）
- コメントは **「なぜ（Why）」** を書く。「何を（What）」はコード自体が語る
- 既存ライブラリで解決できないか先に確認する（車輪の再発明をしない）
- 触ったファイルは来たときより少しきれいにして去る（ボーイスカウトルール）

## Don't
- `any` 型を使わない（`unknown` + 型ガードで対応する）
- 1つの関数に複数の責務を持たせない
- マジックナンバー / マジックストリングを直書きしない
- エラーを空の catch で握りつぶさない（`catch (e) {}` 禁止）
- 1箇所でしか使わない抽象化を作らない
- 計測なき最適化をしない（まず正しく動かす。最適化はプロファイリング後）
- 自明なコードにコメントを書かない

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

```ts
// Good - なぜかを説明するコメント
// 上流APIがクライアントあたり100msのレート制限を設けているため遅延が必要
await sleep(100);

// Bad - 何をするかを説明する（コードと重複で無意味）
// 100ms待機する
await sleep(100);
```

## When unsure
- シンプルで読みやすいコードを優先する
- 「ジュニアエンジニアが60秒で理解できるか？」を基準にする
