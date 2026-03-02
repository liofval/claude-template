# docs

プロジェクト全体のドキュメントを管理するディレクトリです。

## 構成

### 開発の入力ドキュメント（最初に書く）

| ファイル | 内容 |
|---|---|
| [requirements.md](./requirements.md) | 要件定義書（プロジェクト概要、機能要件、非機能要件、技術スタック） |
| [specifications.md](./specifications.md) | 仕様書（データモデル、機能仕様、ビジネスルール、API仕様） |

### 設計・運用ドキュメント（開発しながら埋める）

| ファイル | 内容 |
|---|---|
| [architecture.md](./architecture.md) | アーキテクチャ概要・技術選定理由 |
| [er-diagram.md](./er-diagram.md) | DB設計のER図（Mermaid記法） |
| [api-specification.md](./api-specification.md) | APIエンドポイント仕様 |
| [setup.md](./setup.md) | 開発環境セットアップ詳細手順 |
| [deployment.md](./deployment.md) | デプロイ手順・インフラ構成 |
| [adr/](./adr/) | Architecture Decision Records |

## ADR（Architecture Decision Records）

技術的な意思決定の記録です。連番で管理します。

- ファイル名: `NNNN-タイトル.md`（例: `0001-use-nextjs.md`）
- 新しい技術選定や大きな設計判断をしたら ADR を追加してください
