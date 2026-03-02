---
paths:
  - ".github/workflows/**/*.yml"
  - ".github/workflows/**/*.yaml"
  - ".github/actions/**/*"
---

# CI/CD Rules

## Do
- ジョブは責務ごとに分割し、並列実行する（lint / test / build）
- シークレットは GitHub Secrets で管理する（ハードコード禁止）
- 依存パッケージのインストールにはキャッシュを活用する
- main ブランチには PR 経由 + CI パス必須でのみマージする
- staging → production の順にデプロイする（production は手動承認）
- デプロイ後にヘルスチェックを実行する

## Don't
- 1つのジョブに全ステップを詰め込まない
- シークレットをログに出力しない
- staging を飛ばして production に直接デプロイしない

## Example
```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: "pnpm" }
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
      - run: pnpm build
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
```
