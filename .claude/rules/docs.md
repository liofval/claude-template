---
paths:
  - "README.md"
  - "README.ja.md"
  - "**/README.md"
  - "**/README.ja.md"
  - "docs/**/*"
---

# Documentation Rules

## 多言語対応
- README は `README.md`（英語）と `README.ja.md`（日本語）の2ファイルを作成する。
- 両ファイルの冒頭に言語切り替えリンクを記載する:
  - `README.md` の冒頭:
    ```html
    <p align='center'>
      English | <a href='./README.ja.md'>日本語</a>
    </p>
    ```
  - `README.ja.md` の冒頭:
    ```html
    <p align='center'>
      <a href='./README.md'>English</a> | 日本語
    </p>
    ```

## ドキュメント配置方針（ハイブリッド）
- **ルート `README.md` / `README.ja.md`**: プロジェクト概要、セットアップ手順、技術スタック、コントリビューションガイドを記載する。
- **各ディレクトリの `README.md` / `README.ja.md`**: そのディレクトリの責務、構成、主要モジュールの説明を記載する。
- **`docs/`**: 以下の構成で、特定ディレクトリに属さないドキュメントを配置する。

## `docs/` ディレクトリ構成
```
docs/
├── README.md              # docs全体の目次・ガイド
├── architecture.md        # アーキテクチャ概要・技術選定理由
├── er-diagram.md          # DB設計のER図（Mermaid記法）
├── api-specification.md   # APIエンドポイント仕様
├── setup.md               # 開発環境セットアップ詳細手順
├── deployment.md          # デプロイ手順・インフラ構成
└── adr/                   # Architecture Decision Records
    └── NNNN-タイトル.md    # 各ADR（連番管理）
```

## 各ディレクトリ README の対象
- 以下のディレクトリには `README.md` を設置する:
  - `src/components/` - コンポーネントの設計方針・分類
  - `src/hooks/` - カスタムhooksの一覧・使い方
  - `src/services/` - サービス層の責務・依存関係
  - `src/app/api/` または `src/pages/api/` - APIエンドポイント一覧

## 図表の記法
- フロー・ワークフロー・ER図などの図表はすべてMermaid記法で記述する。
- 機能やドメインごとのワークフロー（例: ユーザー登録フロー、決済フロー等）は `docs/` 内にMermaidで作成・管理する。

## 記載内容
- 新しいディレクトリやモジュールを追加したら、対応する README も作成・更新する。
- README には「なぜそうしたか（Why）」を重視して書く。「何か（What）」はコードを読めばわかる。
- セットアップ手順は初めて触る人が迷わないレベルで書く。
- 重要な注意事項や警告には GitHub の Alerts 記法を使用する。
  - `> [!NOTE]` - 補足情報
  - `> [!TIP]` - 便利なヒント
  - `> [!IMPORTANT]` - 重要な情報
  - `> [!WARNING]` - 注意が必要な内容
  - `> [!CAUTION]` - 守らないと問題が起きる内容

## メンテナンス
- コードの構成変更時は関連する README も合わせて更新する。
- 古くなった記述は放置せず削除または修正する。
