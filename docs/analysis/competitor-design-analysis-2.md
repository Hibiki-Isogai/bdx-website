# 採用サイト デザイン・実装手法 競合分析

> 分析日: 2026-03-12
> 対象: EY / KPMG Consulting / ABeam Consulting の採用ページ

---

## 1. EY Japan 採用ページ

**URL**: https://www.ey.com/ja_jp/careers

### 1-1. ヒーローセクション

- **背景**: 静止画像（`group-of-friends-looking-at-lake.jpg`）にオーバーレイを適用
  - 画像配信は CDN 経由、`?quality=85&preferwebp=true` でパフォーマンス最適化（WebP 優先）
  - 動画ではなく高品質写真で「仲間感」を演出
- **キャッチコピー**: "Shape your future with confidence" を中央配置
  - 副文で「スキルアップ」「インクルーシブな環境」「テクノロジー」を3行で訴求
- **CTA**: ヒーロー内に目立つボタンは置かず、ナラティブ誘導型（スクロールを促す設計）

```html
<!-- 推定される構造 -->
<section class="cmp-container cmp-container--theme-confident-black">
  <div class="dm-aid--hero">
    <img src="group-of-friends-looking-at-lake.jpg?quality=85&preferwebp=true" />
    <div class="hero-overlay">
      <h1>Shape your future with confidence</h1>
      <p>スキルを磨き、未来を切り開く...</p>
    </div>
  </div>
</section>
```

### 1-2. CSS アニメーション

EY は**軽量なアニメーション戦略**を採用。外部ライブラリ（GSAP/AOS 等）は使わず、ネイティブ CSS + vanilla JS で実装。

**ロゴスクロールアニメーション**:
```css
#logo-container .slideIn {
  transition: width 0.3s ease-in-out;
  width: 100;
}
#logo-container .slideOut {
  transition: width 0.3s ease-in-out;
  width: 0;
}
.cmp-logo__image {
  fill: white;
  transition: all 0.3s ease-out;
}
```

```javascript
// スクロール位置でロゴ表示/非表示を切り替え
window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    logoContainer.classList.add("slideIn");
    logoContainer.classList.remove("slideOut");
  } else {
    logoContainer.classList.add("slideOut");
    logoContainer.classList.remove("slideIn");
  }
});
```

**ページ初期ロードのフェードイン**:
```javascript
// body を非表示にして 3 秒後にフェードイン（Adobe Target 用）
const style = document.createElement('style');
style.id = 'at-body-style';
style.innerHTML = 'body { opacity: 0 !important }';
document.head.appendChild(style);
setTimeout(() => style.remove(), 3000);
```

### 1-3. セクション構成

| 順序 | セクション | 目的 |
|------|-----------|------|
| 1 | ナビゲーション（メガメニュー） | 全サービス/採用情報への導線 |
| 2 | ヒーロー | ファーストインプレッション |
| 3 | 3ブロック紹介（スキル/環境/テクノロジー） | 価値提案 |
| 4 | CEOメッセージ（ポートレート画像付き） | 経営者の声で信頼感 |
| 5 | 採用パンフレットDL | リード獲得 |
| 6 | EY Culture カード | 文化・風土の訴求 |
| 7 | 各法人採用情報グリッド（7法人） | 法人別の入り口 |
| 8 | 3本柱カード（できること/働き方/応募方法） | ユーザージャーニー整理 |
| 9 | D&I セクション | 多様性アピール |
| 10 | テクノロジー投資 | 成長性アピール |
| 11 | アルムナイ | OB/OGネットワーク |
| 12 | フッター | リンク集 |

**特徴**: CEOメッセージを上部に配置し、組織の方向性を早い段階で伝える設計。法人別グリッドで大規模組織の全体像を可視化。

### 1-4. カラースキーム

EY の**8テーマシステム**は特筆すべき設計:

```css
/* CSS Custom Properties によるテーマシステム */
:root {
  --accent-color: #ffe600;      /* EY イエロー（ブランドカラー） */
}

/* 8つのテーマバリエーション */
.cmp-container--theme-white {
  --color: #2e2e38;
  --background-color: #ffffff;
  --border-color: #c4c4cd;
  --accent-color: #ffe600;
}

.cmp-container--theme-confident-black {
  --color: #ffffff;
  --background-color: #1a1a24;
  --border-color: #c4c4cd;
  --accent-color: #ffe600;
}

.cmp-container--theme-light-grey {
  --background-color: #eaeaf2;
}

.cmp-container--theme-mid-grey {
  --background-color: #f6f6fa;
}

.cmp-container--theme-accented {
  /* イエロー背景 + ダーク文字 */
}

.cmp-container--theme-dark {
  --color: #ffffff;
  --background-color: #2e2e38;
}

/* 印刷用テーマも完備 */
@media print {
  --color: var(--print-theme-black);
  --hover-background-color: var(--print-theme-white);
  --border-color: var(--print-theme-border);
}
```

| 用途 | カラー | HEX |
|------|--------|-----|
| ブランドアクセント | イエロー | `#ffe600` |
| メインテキスト | ダークグレー | `#2e2e38` |
| 強調背景 | ブラック | `#1a1a24` |
| セカンダリテキスト | グレー | `#747480` |
| ボーダー | ニュートラル | `#c4c4cd` |
| ライト背景 | ペールグレー | `#eaeaf2` |
| ミッド背景 | ライトグレー | `#f6f6fa` |

### 1-5. タイポグラフィ

- フォントファミリー: 外部 CSS で定義（HTML 内では未指定、おそらくカスタムサンセリフ）
- 見出し階層を `DC:title` メタデータ構造で厳密管理
- ウェイト: 400（本文）/ 600（見出し）/ 700（強調）と推定
- 全テーマで `--color` 変数を使い、テキストカラーをテーマに連動

### 1-6. カード・グリッドレイアウト

- **3カラムピラーセクション**: 「できること」「働き方」「応募方法」を等幅3カードで配置
- **7法人グリッド**: 各法人ロゴ+リンクをグリッド配置
- コンポーネント命名: `.cmp-container` クラスでセクション単位管理
- カルーセル: `.up-carousel--slide-theme-[variant]` でテーマ付きスライド

### 1-7. ナビゲーション

- **メガメニュー方式**: 5大カテゴリ（インサイト/サービス/業種/採用情報/EYについて）
- 10階層以上のネスト構造（大規模組織対応）
- ロゴはスクロール連動でサイズ変化（slideIn/slideOut）
- `.cmp-logo__image` でSVGロゴのフィルカラーを制御

### 1-8. モバイル対応

- レスポンシブ画像: CDN で WebP 優先配信 + quality パラメータ
- 印刷用メディアクエリ完備
- ナビゲーションは折りたたみメニュー（推定）

### 1-9. インタラクション

- ホバー: `--hover-background-color` CSS変数でテーマ連動
- トランジション: 全体的に `0.3s ease-out` / `ease-in-out` を統一
- OneTrust Cookie モーダル連携
- Flourish ビジュアライゼーション埋め込み（click/play/pause/slide イベント追跡）

### 1-10. 特に優れている点

1. **CSS Custom Properties によるテーマシステム**: 8バリエーションを CSS変数だけで切り替え。セクションごとに異なる雰囲気を演出しつつブランドの一貫性を保つ。BDX に取り入れるなら、2-3テーマ（white/dark/accent）から始めるのが現実的。

2. **画像配信の最適化**: `?quality=85&preferwebp=true` パラメータで WebP 優先 + 品質コントロール。CDN 経由で大量の高品質画像を軽量に配信。

3. **法人別グリッド**: 大規模組織の構造を一覧で見せる手法。BDX では事業部やチーム紹介に応用可能。

4. **CEOメッセージの上部配置**: 「トップの声を早く届ける」情報設計。ファーストビュー直後に経営者メッセージを置くことで、組織のビジョンを即座に伝える。

---

## 2. KPMG Consulting 新卒採用ページ

**URL**: https://recruit.kpmg-consulting.jp/new-graduate

### 2-1. ヒーローセクション

- **背景**: トップページ（`/`）では**動画背景**を使用（`<video>` タグ確認済み、ブラウザ非対応時のフォールバックテキストあり）
- 新卒採用ページ（`/new-graduate`）はテキストベースの導入
  - "将来のさらなる飛躍に向けて歩む、ファーストキャリア" をキャッチコピーに
- **CTA**: 「27卒」「28卒」の**デュアルコホート方式**で、対象年度別にエントリー導線を分離
  - 外部タレントマネジメント（talent-p.net）に遷移

```html
<!-- 推定される構造 -->
<section class="hero-section">
  <h1>将来のさらなる飛躍に向けて歩む、ファーストキャリア</h1>
  <div class="cta-group">
    <a href="https://talent-p.net/.../27" class="wp-block-button__link">27卒 エントリー</a>
    <a href="https://talent-p.net/.../28" class="wp-block-button__link">28卒 エントリー</a>
  </div>
  <a href="#">Talent Community for Students 登録</a>
</section>
```

### 2-2. CSS アニメーション

KPMG の新卒ページは**意外にもアニメーションが控えめ**。WebFetch で取得できた範囲では:

- `@keyframes` 宣言: 検出なし
- `transition` プロパティ: 検出なし（ボタン以外）
- IntersectionObserver / GSAP / AOS: 検出なし
- scroll イベントリスナー: 検出なし

**注意**: WordPress テーマ（`kpmg_env`）の外部 CSS ファイルにアニメーション定義がある可能性が高い。WebFetch ではテーマ CSS の中身まで取得できなかった。Owner の評価「アニメーションが豊富」は、テーマ CSS やページ遷移時の効果を指している可能性がある。

実際に確認できたスタイル:
```css
/* ボタンスタイル（唯一のインラインCSS） */
.wp-block-button__link {
  color: #fff;
  background-color: #32373c;
  border-radius: 9999px;        /* 完全な角丸（ピル型） */
  box-shadow: none;
  text-decoration: none;
  padding: calc(.667em + 2px) calc(1.333em + 2px);
  font-size: 1.125em;
}

.wp-block-file__button {
  background: #32373c;
  color: #fff;
  text-decoration: none;
}
```

### 2-3. セクション構成

| 順序 | セクション | 目的 |
|------|-----------|------|
| 1 | ヘッダー + ナビゲーション | サイト導線 |
| 2 | パンくずリスト | 階層の明示 |
| 3 | ページタイトル「新卒採用」 | ページ識別 |
| 4 | エントリー/ログイン（27卒・28卒） | CTA（最優先） |
| 5 | Talent Community 登録 | リード獲得 |
| 6 | キャリア哲学文 | 理念訴求 |
| 7 | 「学びの採用」方法論 | 差別化要素 |
| 8 | ニュース/お知らせ | 最新情報 |
| 9 | オフィス/コンテンツカードグリッド | ビジュアル訴求 |
| 10 | 社員インタビューカルーセル | 社員の声 |
| 11 | 人事リーダーメッセージ | 信頼感 |
| 12 | 採用ブログ | コンテンツマーケティング |
| 13 | エントリー方法 CTA | 再CTA（ページ下部） |
| 14 | フッター（SNSリンク付き） | サイト情報 |

**特徴**: CTA をページ最上部と最下部の両方に配置する「サンドイッチ構造」。「学びの採用」という独自コンセプトをセクションとして強調。

### 2-4. カラースキーム

| 用途 | カラー | HEX |
|------|--------|-----|
| ボタン/アクセント | ダークグレー | `#32373c` |
| ボタンテキスト | ホワイト | `#ffffff` |
| 背景 | ホワイト系 | （テーマCSS依存） |

- KPMG ブルー（コーポレートカラー）はナビゲーション/ロゴ周辺で使用されていると推定されるが、インラインCSSでは未定義
- 全体的に**抑えたカラーパレット**で、コンテンツ（写真/動画）を引き立てる設計

### 2-5. タイポグラフィ

- フォントファミリー: テーマCSS依存（インライン指定なし、おそらくコーポレートサンセリフ）
- ボタンテキスト: `1.125em`（18px相当）
- パディング計算: `calc(.667em + 2px)` で em ベースの動的サイズ調整

### 2-6. カード・グリッドレイアウト

**コンテンツカードグリッド**（6カラム構成）:
```
[大阪オフィス紹介] [オフィスツアー動画] [KPMGが目指す世界観]
[カード4]          [カード5]            [カード6]
```

**社員インタビューカルーセル**: 5名のプロフィールをスライド表示
- 各カードに写真 + 氏名 + 入社年度 + 職種
- 「2018年 新卒入社」「2021年 新卒入社」等のラベル

### 2-7. ナビゲーション

- KPMGロゴ（ホームリンク）
- **5カテゴリドロップダウン**: 会社を知る / キャリアを知る / 仕事・人を知る / 新卒採用 / キャリア採用
- モバイル用に**重複ナビゲーション構造**（表示切替方式）
- Sticky ヘッダー（推定、テーマCSS依存）

### 2-8. モバイル対応

- HTML内に2つのナビゲーション構造 → ブレイクポイントで display 切替
- 推定ブレイクポイント: tablet ~768px / mobile ~480px
- WordPress ブロックエディタのレスポンシブ対応に依存

### 2-9. インタラクション

- **ピル型ボタン**: `border-radius: 9999px` で完全角丸
- `box-shadow: none` でフラットデザイン
- ホバーエフェクト: テーマCSS依存（インライン未定義）
- SNS連携: X / LinkedIn / Facebook / Instagram / YouTube の5プラットフォーム

### 2-10. 特に優れている点

1. **「学びの採用」コンセプト**: 選考プロセスにフィードバック + 教育コンテンツ + リトライ機会を組み込む独自手法。採用ページのコンテンツ戦略として参考になる。BDX でも「成長支援型選考」のようなメッセージングに応用可能。

2. **デュアルコホート CTA**: 「27卒」「28卒」を並列配置し、対象者を迷わせない。BDX でも年度別のエントリー導線分離は有効。

3. **ピル型ボタンデザイン**: `border-radius: 9999px` + `calc()` ベースの padding で、どの画面サイズでもバランスの良いボタンを実現。

```css
/* BDX に取り入れるピル型ボタン */
.btn-entry {
  color: #fff;
  background-color: var(--primary-color);
  border-radius: 9999px;
  padding: calc(0.667em + 2px) calc(1.333em + 2px);
  font-size: 1.125em;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.btn-entry:hover {
  transform: translateY(-2px);
  background-color: var(--primary-dark);
}
```

4. **CTA サンドイッチ構造**: ページ上部と下部の両方にエントリーボタンを配置。ファーストビューで即行動する層と、じっくり読んでから行動する層の両方をカバー。

5. **SNS 5プラットフォーム対応**: X / LinkedIn / Facebook / Instagram / YouTube を全て網羅。学生世代へのリーチを最大化。

---

## 3. ABeam Consulting 採用ページ

**URL**: https://www.abeam.com/jp/ja/recruit/

### 3-1. ヒーローセクション

- **背景**: フルワイド画像（`img_banner.png` / `mv.jpg`）
- **キャッチコピー**: 詩的な日本語メッセージング
  - "ひとを誘う風になれ。困難な場所に起こり..."
  - SVGグラフィック（`img-lead.svg`）でタイポグラフィをアート化
- **ブランドタグライン**: "Build Beyond As One" を SVG（`img-bbao.svg`）で表示
- **動画モーダル**: ヒーロー内にYouTube動画へのリンク（`jjc7CvsP1-o`）+ モーダル再生

```html
<!-- 推定される構造 -->
<section class="hero">
  <img src="/content/dam/abeam/recruit/mv.jpg" alt="" class="hero-bg" />
  <div class="hero-content">
    <img src="img-lead.svg" alt="ひとを誘う風になれ" class="hero-lead" />
    <img src="img-bbao.svg" alt="Build Beyond As One" class="hero-tagline" />
    <button class="hero-video-btn" data-video="jjc7CvsP1-o">
      <span>動画を再生</span>
    </button>
  </div>
</section>

<!-- 動画モーダル -->
<div class="video-modal">
  <button class="modal-close">
    <img src="icon_close_white.svg" alt="閉じる" />
  </button>
  <iframe src="https://youtube.com/embed/jjc7CvsP1-o"></iframe>
</div>
```

### 3-2. CSS アニメーション

ABeam の外部CSS は WebFetch では取得できなかったが、以下の要素から実装手法を推定:

- **CMS**: Adobe Experience Manager（AEM）ベース（アセットパス `/content/dam/abeam/`）
- **スライダー**: 矢印ナビゲーション（`icon_arrow-slider_prev.svg` / `icon_arrow-slider_next.svg`）
- **モーダル**: 動画再生用の開閉アニメーション（`icon_close_white.svg`）

AEM ベースのサイトで一般的に使われるアニメーション手法:

```css
/* AEM サイトで典型的な scroll-triggered fade-in */
.aem-fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.aem-fade-in.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* スライダーのトランジション */
.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}
```

**レスポンシブ対応**（実際に確認できたCSS）:
```css
/* 768px ブレイクポイント */
@media screen and (min-width: 768px) {
  .rec-about-box__list {
    grid-template-rows: subgrid;
  }
}

/* Flexbox レイアウト */
.rec-about-box__item p {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 3-3. セクション構成

| 順序 | セクション | 目的 |
|------|-----------|------|
| 1 | ヘッダー（ロゴ + ハンバーガーメニュー + ENTRY/MY PAGE） | 導線 |
| 2 | ヒーロー（画像 + 動画モーダル） | ブランドインパクト |
| 3 | 「会社を知る」3カードパネル | 企業理解 |
| 4 | 「社員・仕事を知る」カルーセルスライダー | 社員の声 |
| 5 | 「働く環境を知る」2カードパネル | 制度・福利厚生 |
| 6 | 「採用情報」3カードパネル | 応募情報 |
| 7 | フッター（SNSリンク + 法的情報） | サイト情報 |

**特徴**: 「知る」を軸にした情報設計。「会社を知る」→「社員を知る」→「環境を知る」→「採用情報」の順で、理解を深めてからエントリーに誘導。コンパクトな7セクション構成で情報過多を避けている。

### 3-4. カラースキーム

| 用途 | カラー | 推定 |
|------|--------|------|
| メインテキスト | ダークネイビー | ナビゲーション・見出し |
| アクセント | シアン/ライトブルー | インタラクティブ要素・アイコン |
| 背景 | ホワイト | カード・メインコンテンツ |
| セカンダリ | グレー系 | テキスト・ボーダー |
| フッター | ダーク系 | 背景色 |

- ABeam のブランドカラー（赤/オレンジ系）はロゴ周辺で使用
- 全体的にホワイト+写真で清潔感のある印象

### 3-5. タイポグラフィ

- フォントファミリー: システムフォントスタック（推定、Adobe Fonts 等の明示的な読み込みは未検出）
- 見出し: H2 で各セクションタイトル（「会社を知る」「社員・仕事を知る」等）
- ヒーローのキャッチコピーはSVG化して、フォントレンダリングの差異を排除

### 3-6. カード・グリッドレイアウト

**一貫した 3+2 カードパターン**:

```
[会社を知る]
┌──────────┐ ┌──────────┐ ┌──────────┐
│  カード1  │ │  カード2  │ │  カード3  │
└──────────┘ └──────────┘ └──────────┘

[働く環境を知る]
┌───────────────┐ ┌───────────────┐
│    カード1     │ │    カード2     │
└───────────────┘ └───────────────┘

[採用情報]
┌──────────┐ ┌──────────┐ ┌──────────┐
│  カード1  │ │  カード2  │ │  カード3  │
└──────────┘ └──────────┘ └──────────┘
```

- BEM 命名規則: `.rec-about-box__list` / `.rec-about-box__item`
- CSS Grid + subgrid 使用（768px 以上）
- Flexbox で中央揃え

```css
/* 実際に確認できたCSS */
.rec-about-box__item p {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 768px) {
  .rec-about-box__list {
    grid-template-rows: subgrid;
  }
}
```

### 3-7. ナビゲーション

- **ロゴ**: SVG（`img-logo.svg`）
- **ドロップダウンメニュー**: 多階層
  - 新卒採用の中に「2027年卒」「2028年卒」のサブメニュー
- **CTA ボタン**: 「ENTRY」「MY PAGE」をヘッダー右側に常時表示
- **ハンバーガーメニュー**: モバイル用（明示的にラベル付き）
- 外部リンクには `icon-window-button.svg` アイコンで識別

### 3-8. モバイル対応

- **ブレイクポイント**: 768px（確認済み）
- ハンバーガーメニューへの切り替え
- 画像アセットのレスポンシブ配信
- CSS Grid → 1カラムスタッキング（推定）

### 3-9. インタラクション

- **動画モーダル**: YouTube 埋め込み + カスタムクローズボタン
- **スライダー**: prev/next 矢印ナビゲーション（社員インタビューセクション）
- **画像拡大**: 「図を拡大する」ボタン + ズームモーダル
- **外部リンクアイコン**: 別窓遷移を `icon-window-button.svg` で明示

### 3-10. 特に優れている点

1. **SVGタイポグラフィのヒーロー**: キャッチコピーをSVG化することで、全デバイスで同一のビジュアルを保証。フォントの表示差異を完全に排除。

```html
<!-- BDX に取り入れる場合 -->
<div class="hero-catchcopy">
  <!-- テキストを SVG 化してデザインの一貫性を保つ -->
  <img src="/images/hero-lead.svg" alt="キャッチコピーテキスト" />
</div>
```

2. **「知る」を軸にした情報設計**: 「会社を知る」→「社員・仕事を知る」→「働く環境を知る」→「採用情報」の流れが、学生の意思決定プロセスに沿っている。BDX の採用ページもこの構造をベースにすべき。

3. **CSS Grid subgrid の活用**: カードの高さ揃えに `grid-template-rows: subgrid` を使用。モダンなCSS機能を実際に活用している好例。

```css
/* BDX に取り入れる subgrid カードレイアウト */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (min-width: 768px) {
  .card-grid {
    grid-template-rows: subgrid;
  }
}
@media (max-width: 767px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

4. **マルチトラック採用**: 新卒 / キャリア / 障がい者 / アルムナイ を1つの採用トップページから分岐。多様な候補者への配慮が設計に反映されている。

5. **BEM 命名規則の徹底**: `.rec-about-box__list` / `.rec-about-box__item` のように、コンポーネント指向の CSS 設計。保守性が高い。

6. **動画モーダルの UX**: ヒーロー内に動画再生ボタンを配置し、モーダルで再生。ページ遷移なしで動画コンテンツを見せる手法。

---

## 横断比較サマリー

### デザインアプローチの比較

| 観点 | EY | KPMG | ABeam |
|------|-----|------|-------|
| ヒーロー | 静止画 + テキスト | 動画背景（トップ）/ テキスト（新卒） | 画像 + 動画モーダル |
| アニメーション | ロゴスクロール + フェードイン | WordPress テーマ依存 | AEM ベース（推定） |
| CMS | AEM/カスタム | WordPress | Adobe Experience Manager |
| セクション数 | 12（情報量多） | 14（コンテンツ豊富） | 7（コンパクト） |
| カラー戦略 | 8テーマシステム | 控えめ（写真主体） | ホワイト + 写真 |
| CTA配置 | ナラティブ誘導 | 上下サンドイッチ | ヘッダー常時表示 |
| 差別化要素 | テーマシステム | 学びの採用 | SVGタイポグラフィ |

### 技術実装の比較

| 技術 | EY | KPMG | ABeam |
|------|-----|------|-------|
| CSS変数 | 8テーマ分の変数体系 | 最小限 | 未確認 |
| Grid/Flexbox | Grid + Flexbox | Flexbox（推定） | Grid + subgrid |
| アニメーションライブラリ | なし（vanilla JS） | なし（テーマCSS依存） | なし（推定） |
| レスポンシブ | CDN画像最適化 | WP ブロック | 768px ブレイクポイント |
| パフォーマンス | WebP優先配信 | 標準WP | AEM CDN |
| BEM/命名規則 | `.cmp-` プレフィックス | `.wp-block-` | `.rec-` プレフィックス |

### BDX 採用サイトに取り入れるべき実装（優先度順）

#### 最優先（効果大 + 実装コスト低）

1. **ピル型CTAボタン**（KPMG方式）
   ```css
   .btn-primary {
     border-radius: 9999px;
     padding: calc(0.667em + 2px) calc(1.333em + 2px);
     transition: all 0.3s ease;
   }
   ```

2. **「知る」軸の情報設計**（ABeam方式）
   - 会社を知る → 人を知る → 環境を知る → エントリー

3. **CTA サンドイッチ配置**（KPMG方式）
   - ページ上部と下部の両方にエントリーボタン

4. **WebP優先の画像配信**（EY方式）
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp" />
     <img src="image.jpg" alt="" loading="lazy" />
   </picture>
   ```

#### 高優先（効果大 + 実装コスト中）

5. **2-3テーマの CSS 変数システム**（EY方式の簡易版）
   ```css
   :root {
     --bg-light: #ffffff;
     --bg-dark: #1a1a24;
     --bg-accent: #[BDXブランドカラー];
     --text-on-light: #2e2e38;
     --text-on-dark: #ffffff;
   }
   .section--light { background: var(--bg-light); color: var(--text-on-light); }
   .section--dark { background: var(--bg-dark); color: var(--text-on-dark); }
   ```

6. **CSS Grid + subgrid カードレイアウト**（ABeam方式）

7. **SVGキャッチコピー**（ABeam方式）
   - ブランドメッセージの視覚的一貫性を保証

#### 中優先（差別化要素）

8. **動画モーダル**（ABeam方式）
   - ヒーローから動画再生、ページ遷移なし

9. **デュアルコホート CTA**（KPMG方式）
   - 27卒/28卒の明確な分離

10. **スクロール連動ロゴアニメーション**（EY方式）
    - 軽量で視覚的インパクトあり

---

## 技術的な注意事項

### WebFetch の制限について

本分析は WebFetch ツールで取得可能な HTML ソースに基づいている。以下の制限がある:

- **外部CSSファイルの中身は取得不可**: WordPress テーマCSS、AEM の外部スタイルシートの詳細は未確認
- **JavaScript バンドルの中身は取得不可**: GSAP 等のアニメーションライブラリが JS バンドル内に含まれている可能性
- **動的レンダリング後のDOMは取得不可**: SPA/CSR でレンダリングされるコンテンツは未取得
- **KPMG のアニメーション詳細が不足**: Owner 評価「アニメーションが豊富」に対し、取得できたCSSにはアニメーション定義が少ない。実際のブラウザレンダリングではテーマCSSによるリッチなアニメーションが実装されている可能性が高い

より詳細な分析が必要な場合は、Chrome DevTools で実際にサイトを閲覧しながら Computed Styles / Animation パネルを確認することを推奨。
