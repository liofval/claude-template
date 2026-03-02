---
paths:
  - ".github/workflows/**/*.yml"
  - ".github/workflows/**/*.yaml"
  - ".github/actions/**/*"
---

# CI/CD Rules

## ワークフロー設計

### Do
- PR作成時に lint / type-check / test を自動実行する
- main ブランチへのマージ時にデプロイを実行する
- ジョブは責務ごとに分割し、並列実行できるようにする

### Don't
- 1つのジョブに lint・test・build・deploy をすべて詰め込まない
- main ブランチへの直接 push を許可しない

### Example
```yaml
# Good
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm test

  build:
    needs: [lint, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm build

# Bad
jobs:
  everything:
    runs-on: ubuntu-latest
    steps:
      - run: pnpm lint && pnpm test && pnpm build && pnpm deploy
```

## シークレット管理

### Do
- 機密情報は GitHub Secrets / 環境変数で管理する
- 環境ごとに Environments（production / staging 等）を分ける

### Don't
- シークレットをワークフローファイルにハードコードしない
- シークレットをログに出力しない

### Example
```yaml
# Good
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}

# Bad
env:
  DATABASE_URL: "postgresql://user:password@localhost:5432/mydb"
```

## キャッシュ

### Do
- 依存パッケージのインストールはキャッシュを活用する
- キャッシュキーにlockファイルのハッシュを含める

### Don't
- キャッシュなしで毎回フルインストールしない

### Example
```yaml
# Good
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: "pnpm"

# Bad
- run: pnpm install  # キャッシュなし、毎回フルインストール
```

## ブランチ保護

### Do
- main ブランチには PR 経由でのみマージする
- マージ前に CI のパスを必須にする
- PR には最低1人のレビュー承認を必須にする

### Don't
- CI が失敗した状態でマージしない
- レビューなしでマージしない

## デプロイ

### Do
- staging → production の順にデプロイする
- production デプロイは手動承認（`environment` の protection rules）を挟む
- デプロイ後にヘルスチェックを実行する

### Don't
- staging を飛ばして production に直接デプロイしない
- ロールバック手順を用意せずにデプロイしない
