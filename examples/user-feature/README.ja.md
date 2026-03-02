<p align='center'>
  <a href='./README.md'>English</a> | 日本語
</p>

# User Feature — リファレンス実装

すべての Core Rules に従った、feature の完成リファレンスです。

新しい feature を作成する際は、この構成をコピーして `user` を対象の feature 名に置き換えてください。

## 構成

```
user-feature/
├── api/
│   ├── create-user.ts       # POST /api/users
│   └── get-users.ts         # GET /api/users
├── service/
│   └── user-service.ts      # ビジネスロジック + カスタムエラー
├── repository/
│   └── user-repository.ts   # DBアクセス（Prisma）
├── types/
│   └── user.ts              # 型定義 + レスポンスマッパー
└── README.md
```

## レイヤーの責務

```
Request → API（バリデーション + レスポンス）→ Service（ビジネスロジック）→ Repository（DBアクセス）
```

| レイヤー | やること | やらないこと |
|---|---|---|
| `api/` | リクエストのパース、Zodバリデーション、HTTPレスポンスの返却 | ビジネスロジック、DB操作 |
| `service/` | ビジネスルール、オーケストレーション、ドメインエラーの送出 | HTTPの知識、Responseオブジェクトの返却 |
| `repository/` | ORM経由のDBクエリ、データアクセス | ビジネスロジック、HTTPの処理 |
| `types/` | interface、マッパー、定数の定義 | ロジックや副作用 |

## この例について

この実装は TypeScript を使用していますが、重要なのは以下の構造です：

- **api** — 入出力処理（HTTPリクエストのパース、レスポンスの整形）
- **service** — ビジネスロジック（ドメインルール、オーケストレーション）
- **repository** — データアクセス（DBクエリ）

言語やフレームワークが異なる場合でも、同じ責務分離を維持してください。

## 実装されている主要パターン

- **Zodバリデーション** — APIレイヤーでの入力検証
- **カスタムエラークラス** — `DuplicateEmailError`, `UserNotFoundError`
- **エラーハンドリング** — エラー種別ごとの適切なステータスコード
- **レスポンスマッパー** — `toUserResponse` で公開フィールドを制御
- **`as const` パターン** — `enum` の代わりにユニオン型を使用
- **ページネーション** — バリデーション付きクエリパラメータ
- **早期リターン** — エラーケースの処理
