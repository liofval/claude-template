<p align='center'>
  <a href='./README.md'>English</a> | 日本語
</p>

# claude-template

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) のルールとドキュメント構成をあらかじめ設定したプロジェクトテンプレートです。このリポジトリをクローンすることで、AIによる一貫したコーディング規約のもとで新規プロジェクトを始められます。

## これは何？

このテンプレートは3つのものを提供します：

1. **`.claude/rules/core/`** — 常に適用されるコアルール（アーキテクチャ、構成、命名、コーディング）
2. **`.claude/rules/`** — ファイルパスに応じて適用されるレイヤー別ルール
3. **`docs/`** — ドキュメントテンプレート（アーキテクチャ、ER図、API仕様、ADR 等）

このテンプレートからクローンしたプロジェクトで Claude Code を使うと、手動でプロンプトを書かなくても AI がルールに従ってコードを書きます。

## ディレクトリ構成

```
claude-template/
├── .claude/
│   └── rules/
│       ├── core/                   # コアルール（常に適用）
│       │   ├── architecture.md     # Service / Repository 層分離
│       │   ├── structure.md        # Feature-based ディレクトリ構成
│       │   ├── naming.md           # 命名規則
│       │   └── coding.md          # コード品質の底上げ
│       ├── api.md              # APIエンドポイント設計
│       ├── backend.md          # サービス層・ユーティリティ
│       ├── cicd.md             # CI/CDワークフロー
│       ├── config.md           # 設定・環境変数・パッケージ
│       ├── db.md               # データベース・ORM
│       ├── docs.md             # ドキュメント規約
│       ├── frontend.md         # コンポーネント・ページ
│       ├── hooks.md            # カスタムhooks
│       ├── testing.md          # テスト
│       └── types.md            # 型定義
├── docs/
│   ├── adr/
│   │   └── 0000-template.md    # ADRテンプレート
│   ├── README.md               # docs目次
│   ├── api-specification.md    # APIエンドポイント仕様
│   ├── architecture.md         # アーキテクチャ概要
│   ├── deployment.md           # デプロイ手順
│   ├── er-diagram.md           # ER図（Mermaid記法）
│   └── setup.md                # 開発環境セットアップ
├── .gitignore
├── CLAUDE.md                   # グローバルコーディング原則（SOLID, DRY, KISS 等）
├── README.md
└── README.ja.md
```

## 仕組み

Claude Code はファイルパスに基づいてルールを読み込みます。各ルールファイルには YAML フロントマターで対象パスが指定されています：

```yaml
---
paths:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
---
```

このパターンにマッチするファイルを編集すると、Claude Code がそのルールを自動的に適用します。

### ルールの階層

| 優先度 | ファイル | スコープ | 適用タイミング |
|---|---|---|---|
| 1 | `.claude/rules/core/*.md` | コア | `src/**` 編集時は常に適用（必須） |
| 2 | `.claude/rules/*.md` | レイヤー | `paths` にマッチするファイルの編集時 |
| 3 | `CLAUDE.md` | グローバル | 常時（コーディング原則、命名、作業フロー） |

ルールが競合する場合は、優先度の高いものが勝つ。

## 使い方

### 1. テンプレートをクローン

```bash
git clone https://github.com/liofval/claude-template.git my-project
cd my-project
rm -rf .git
git init
```

### 2. ルールをカスタマイズ

`.claude/rules/` のルールをプロジェクトの技術スタックに合わせて編集します。各ルールは **Do/Don't + Example** 形式で記述されています：

```markdown
### Do
- リクエストボディは Zod でバリデーションする

### Don't
- 未検証の入力をそのまま使わない

### Example
// Good
const result = schema.safeParse(body);

// Bad
const { email } = await req.json(); // バリデーションなし
```

### 3. ドキュメントを記入

`docs/` にはプレースホルダー付きのテンプレートがあります。プロジェクトの進行に合わせて埋めてください：

- `architecture.md` — 技術スタック、ディレクトリ構成、データフロー
- `er-diagram.md` — Mermaid記法でのDB設計
- `api-specification.md` — APIエンドポイント仕様
- `setup.md` — 開発環境セットアップ手順
- `deployment.md` — デプロイ手順
- `adr/` — ADR（`0000-template.md` をベースに作成）

### 4. Claude Code で開発開始

```bash
claude
```

Claude Code がコードベースの各部分に応じて適切なルールを自動適用します。

> **Tip**: Claude に明示的に伝えることもできます：
> 「このプロジェクトの CLAUDE.md と rules に従って実装してください」

## ルール一覧

### コアルール（`src/**` に常時適用）

| ルールファイル | 主なポイント |
|---|---|
| `core/architecture.md` | ビジネスロジックは service、DBアクセスは repository、Controller はリクエスト/レスポンスのみ |
| `core/structure.md` | Feature-based ディレクトリ構成（`features/` / `shared/` / `lib/`） |
| `core/naming.md` | 関数は camelCase、型は PascalCase、ファイルは kebab-case |
| `core/coding.md` | 単一責務、`any` 禁止、早期リターン、マジックナンバー禁止 |

### レイヤールール（ファイルパスに応じて適用）

| ルールファイル | 対象パス | 主なポイント |
|---|---|---|
| `frontend.md` | `src/components/**`, `src/pages/**`, `src/app/**` | 表示専用コンポーネント、ロジックはhooksへ、named export、Tailwind |
| `api.md` | `src/app/api/**`, `src/pages/api/**` | RESTful設計、Zodバリデーション、統一エラーフォーマット |
| `backend.md` | `src/lib/**`, `src/services/**`, `src/utils/**` | ビジネスロジックはservicesへ、`any`禁止、カスタムエラークラス |
| `db.md` | `src/db/**`, `prisma/**`, `drizzle/**` | スネークケーステーブル、N+1防止、MermaidでER図 |
| `hooks.md` | `src/hooks/**` | 単一責任、オブジェクト形式の戻り値、エフェクトのクリーンアップ |
| `types.md` | `src/types/**` | オブジェクトは`interface`、`as const`優先、`any`禁止 |
| `testing.md` | `**/*.test.*`, `**/*.spec.*` | コロケーション配置、AAAパターン、最小限のモック |
| `config.md` | `*.config.*`, `.env*`, `package.json` | 設定モジュール経由、strict TypeScript、lockファイルコミット |
| `cicd.md` | `.github/workflows/**` | ジョブ並列化、GitHub Secrets、キャッシュ活用 |
| `docs.md` | `**/README.md`, `docs/**` | 日英バイリンガルREADME、Mermaid図表、GitHub Alerts記法 |

## ライセンス

MIT
