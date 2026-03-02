---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Core Structure Rules

## Default Structure
```
src/
├── features/           # 機能ごとにまとめる
│   └── user/
│       ├── api/        # API Route / Controller
│       ├── service/    # ビジネスロジック
│       ├── repository/ # DBアクセス
│       ├── hooks/      # 機能固有のカスタムhooks
│       ├── components/ # 機能固有のUIコンポーネント
│       └── types/      # 機能固有の型定義
├── shared/             # 複数featureで共有するもの
│   ├── components/     # 共通UIコンポーネント
│   ├── hooks/          # 共通hooks
│   ├── types/          # 共通型定義
│   └── utils/          # 共通ユーティリティ
└── lib/                # 外部ライブラリのラッパー・設定
```

## Do
- 機能ごとに `features/` 配下にディレクトリを作る
- `service` / `repository` / `api` を分離する
- 2つ以上の feature で使うものは `shared/` に置く

## Don't
- feature をまたいで直接 import しない（`shared/` 経由にする）
- `utils/` に何でも入れない（明確な責務がないコードは feature 内に置く）
- フラットに全ファイルを並べない

## Example
```
# Good - 機能単位でまとまっている
src/features/auth/
  ├── api/login.ts
  ├── service/auth-service.ts
  ├── repository/auth-repository.ts
  └── types/auth.ts

# Bad - 層ごとにバラバラ
src/
  ├── services/auth-service.ts
  ├── services/user-service.ts
  ├── repositories/auth-repository.ts
  ├── repositories/user-repository.ts
  └── api/login.ts
```

## When unsure
- feature-based structure を採用する
- 小さい機能でも feature ディレクトリを作る（後から分割するより楽）
