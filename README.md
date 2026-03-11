# bdx-website

B&DX コーポレートサイト (bdx.co.jp) の GitHub 管理リポジトリ。

## 構成

```
site/           # サイトの HTML/CSS/JS/画像
  ├── index.html
  ├── about/
  ├── news/
  ├── service/
  ├── corporate/
  ├── recruitment/
  ├── recruitment-graduate/
  ├── recruitment-experienced/
  ├── contact/
  ├── privacy/
  ├── online/
  ├── security/
  ├── css/
  ├── scripts/
  ├── images/
  └── uploads/
.github/
  └── workflows/
      ├── staging.yml    # push → GitHub Pages (staging)
      └── deploy.yml     # manual → FTP deploy (production)
```

## ワークフロー

1. `site/` 内の HTML を編集
2. push → GitHub Pages でステージング自動反映
3. ステージングで確認
4. `deploy.yml` を手動実行 → さくらサーバーに FTP デプロイ

## ステージング URL

GitHub Pages: https://hibiki-isogai.github.io/bdx-website/

## 本番 URL

https://bdx.co.jp/
