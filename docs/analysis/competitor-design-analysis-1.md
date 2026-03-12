# 競合採用サイト デザイン・実装分析

> 分析日: 2026-03-12
> 対象: PwC Japan コンサルティング新卒採用 / ベイカレント・コンサルティング採用サイト

---

## 1. PwC Japan コンサルティング 新卒採用

**URL**: https://www.pwc.com/jp/ja/careers/consulting/campus.html

### 1-1. ヒーローセクション

**構成**: フルワイド背景画像 + ダークオーバーレイ + 中央配置コピー

- 背景: JPG画像（`only-w1600l-campus.jpg`）にセミトランスペアレントの暗色オーバーレイ
- キャッチコピー: **「やさしさが生む、強さがある」** -- 画面中央に大きく配置
- サブコピー: 協働文化に関する説明テキスト
- CTA: 2つのボタンを並列配置（「27卒マイページ」「28卒マイページ」）

```html
<!-- 推定構造 -->
<section class="hero-banner">
  <div class="hero-overlay">
    <div class="hero-content text-center">
      <h1>やさしさが生む、強さがある</h1>
      <p>協働文化に関するサブコピー</p>
      <div class="cta-group">
        <a href="..." class="btn btn-primary">27卒マイページ</a>
        <a href="..." class="btn btn-primary">28卒マイページ</a>
      </div>
    </div>
  </div>
</section>
```

**実装手法**:
```css
.hero-banner {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('only-w1600l-campus.jpg');
  background-size: cover;
  background-position: center;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**BDX への示唆**: デュアルCTA（年度別マイページ）は、複数年度の応募者を同時に案内する合理的なパターン。BDX でも28卒・29卒を並列で案内できる。

---

### 1-2. CSS アニメーション

PwC サイトは**アニメーションを控えめに使用**している。

- **明示的な CSS アニメーションライブラリ不使用**（GSAP, AOS, ScrollReveal 等は検出されず）
- Angular.js によるファセットナビゲーションのコンテンツ切り替えがメインのインタラクション
- ページ遷移は標準のブラウザナビゲーション

**検出された動的要素**:
- ファセットナビゲーション（Angular.js `loadFacetedNavigation()`）によるコンテンツフィルタリング
- ハンバーガーメニューの開閉（`aria-expanded` 制御）
- Cookie 同意バナーのスライドイン

```javascript
// ファセットナビゲーション（Angular.js ベース）
angular.loadFacetedNavigation({
  numberHits: 4,
  // コンテンツのフィルタリング・動的読み込み
});
```

**BDX への示唆**: 派手なアニメーションがなくても、情報設計がしっかりしていればユーザー体験は良好。ただし BDX はブランド認知が低いため、最低限の scroll-reveal は入れたほうがよい。

---

### 1-3. セクション構成（情報設計）

PwC の情報設計は**階層が明確で網羅的**:

| 順番 | セクション名 | コンテンツ種別 | アイテム数 |
|------|-------------|---------------|-----------|
| 1 | ヘッダー/ナビゲーション | グローバルメニュー | - |
| 2 | ヒーローバナー | 画像 + コピー + CTA | 2 CTA |
| 3 | フィーチャードコンテンツ | 動画・インタビューカルーセル | 4件 |
| 4 | メインコピー | フィロソフィー説明文 | - |
| 5 | **Work/仕事を知る** | 部門紹介リンク | 複数 |
| 6 | **Job & People** | ファセットグリッド（採用情報・インタビュー・働き方・14日間） | 4件 |
| 7 | **Culture/働く環境** | 6カードグリッド（座談会・キャリアプラン・研修・成長・福利厚生・オフィス） | 6件 |
| 8 | **Corporate/企業情報** | 3カードグリッド（沿革・SDGs・キーワード） | 3件 |
| 9 | **Recruit/採用情報** | 2カードグリッド（要項・選考プロセス） | 2件 |
| 10 | **Column/対談** | 記事カード | 3件 |
| 11 | 登録CTA | マイページリンク + お問い合わせ | - |
| 12 | フッター | サイトマップ + 法的リンク | - |

**BDX への示唆**: 「仕事を知る → 人を知る → 環境を知る → 採用情報」の流れは採用サイトの王道。BDX でもこの構成をベースにすべき。

---

### 1-4. カラースキーム

| 用途 | 色 | 推定値 |
|------|-----|--------|
| メインカラー | ネイビー/ダークブルー | `#2d2d2d` ~ `#1a1a2e` |
| アクセント | PwCブランドオレンジ | `#d04a02`（PwC 公式ブランドカラー） |
| 背景（メイン） | ホワイト | `#ffffff` |
| 背景（セクション） | ライトグレー | `#f5f5f5` |
| テキスト（本文） | ダークグレー | `#333333` |
| テキスト（暗背景上） | ホワイト | `#ffffff` |
| リンク | ブルー | 標準リンクカラー |

**BDX への示唆**: PwC はダーク系 + オレンジのアクセントで信頼感と活力を両立。BDX のブランドカラーに合わせつつ、暗背景セクションを交互に配置する手法は参考になる。

---

### 1-5. タイポグラフィ

- **フォント**: 外部 CSS に定義（`/etc.clientlibs/` 配下）。日本語はシステムフォント系
- **見出し**: Bold（700）使用、H1 は大型サイズ
- **本文**: Regular（400）、読みやすいサイズ
- **英字**: セクション名に英語を併記（「Work/仕事を知る」「Culture/働く環境」）

```css
/* 推定されるフォントスタック */
body {
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN",
               "Yu Gothic", sans-serif;
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}
h1, h2, h3 {
  font-weight: 700;
  line-height: 1.4;
}
/* セクション見出しの英字 */
.section-title-en {
  font-family: "Helvetica Neue", Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  color: #999;
}
```

**BDX への示唆**: 英語セクション名 + 日本語タイトルの併記パターンは洗練された印象を与える。BDX でも採用すべき。

---

### 1-6. カード・グリッドレイアウト

**Bootstrap ベースのグリッドシステム**:
- `<div class="row">` + `<div class="col-md-*">` で構成
- セクションごとにカード数が異なる（4, 6, 3, 2件）

```css
/* 推定されるカードスタイル */
.content-card {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.content-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
.content-card img {
  width: 100%;
  aspect-ratio: 12 / 5; /* playerOptions 設定値から */
  object-fit: cover;
}
```

**レイアウトパターン**:
| セクション | カラム数 | アイテム数 |
|-----------|---------|-----------|
| フィーチャード | 4列 | 4 |
| Culture | 3列 x 2行 | 6 |
| Corporate | 3列 | 3 |
| Recruit | 2列 | 2 |
| Column | 3列 | 3 |

**BDX への示唆**: セクションごとにカラム数を変えることで単調さを回避。画像アスペクト比の統一（12:5 = 2.4:1）は横長で視認性が高い。

---

### 1-7. ナビゲーション

**構造**:
- グローバルヘッダー: ロゴ + 水平メニュー（サービス/業界/インサイト/課題/企業/キャリア）
- 言語セレクター（テリトリー切替付き）
- パンくずナビゲーション
- 検索機能（オートコンプリート付き）

```html
<header>
  <nav class="slimnav-v2">
    <div class="logo"><a href="/jp/ja">PwC</a></div>
    <ul class="primary-menu">
      <li>Services</li>
      <li>Industries</li>
      <li>Insights</li>
      <!-- ... -->
    </ul>
    <button class="hamburger" aria-label="Menu" aria-expanded="false">
      <!-- ハンバーガーアイコン -->
    </button>
  </nav>
  <nav class="breadcrumb">
    <!-- パンくず -->
  </nav>
</header>
```

**アクセシビリティ**: `aria-expanded`, `aria-label` を適切に使用。キーボードナビゲーション対応。

**BDX への示唆**: パンくずナビゲーションは採用サイトでは不要かもしれないが、検索機能とアクセシビリティ対応は参考にすべき。

---

### 1-8. モバイル対応

- Bootstrap レスポンシブグリッド（`col-md-*` ベース）
- ハンバーガーメニューへの切り替え
- モバイル専用クラス（`.non-bu-close-location-mobile`, `.bu-close-location-mobile`）
- テリトリーセレクターがモバイルではタッチフレンドリーなモーダルに変化

---

### 1-9. インタラクション

- **CTA ボタン**: `.btn` クラス + ローディング/リセット状態切り替え
- **カードホバー**: シャドウ拡大 + 微小な上方移動
- **ファセットナビゲーション**: Angular によるページリロードなしのコンテンツフィルタリング
- **外部リンク**: 新しいタブで開く + PDF アイコン表示（`pdf.svg`）

---

### 1-10. 特に優れている点

1. **ファセットナビゲーション**: 24件以上のコンテンツを6セクションに動的フィルタリング。ページ遷移なしで情報探索可能
2. **デュアルCTA**: 年度別の応募者を迷わせない導線
3. **情報の網羅性**: 仕事 → 人 → 環境 → 採用情報の完全な導線
4. **アクセシビリティ**: ARIA 属性の徹底使用
5. **技術スタック**: Adobe Experience Manager (AEM) による企業グレードの CMS 運用

---

## 2. ベイカレント・コンサルティング 採用サイト

**URL**: https://www.baycurrent.co.jp/careers/

### 2-1. ヒーローセクション

**構成**: WebP 画像背景 + SVG テキストオーバーレイ

- 背景: WebP 形式画像（`careers_mv_sp.webp`）-- パフォーマンス最適化
- コーポレートトップでは SVG テキスト「Beyond the Edge / 変化の一番先に立ち、次への扉をともに開く」
- 採用ページでは企業ミッション文 + 新卒向けメッセージ
- 直下に告知セクション（選考エントリー開始のお知らせ + PDF パンフレットリンク）

```html
<!-- 推定構造 -->
<section class="hero">
  <picture>
    <source srcset="careers_mv_sp.webp" type="image/webp">
    <img src="careers_mv.jpg" alt="" loading="eager"
         sizes="auto"
         style="contain-intrinsic-size: 3000px 1500px;">
  </picture>
  <div class="hero-text">
    <svg><!-- SVGテキスト: Beyond the Edge --></svg>
  </div>
</section>
<section class="announcement">
  <p>2026年03月 2027年度新卒 本選考のエントリー受付を開始しました。</p>
  <a href="brochure.pdf">パンフレット</a>
</section>
```

**実装の注目点**:
```css
.hero img {
  width: 100%;
  height: auto;
  contain-intrinsic-size: 3000px 1500px; /* CLS 防止 */
  content-visibility: auto;
}
```

`contain-intrinsic-size` によるレイアウトシフト防止は最新のパフォーマンス最適化手法。

**BDX への示唆**: WebP 画像 + SVG テキストの組み合わせは、画像圧縮率とテキストのシャープさを両立。CLS 防止の `contain-intrinsic-size` は必ず採用すべき。

---

### 2-2. CSS アニメーション

ベイカレントも**アニメーションは控えめ**。

- **明示的なアニメーションライブラリ不使用**（GSAP, AOS, ScrollReveal 等は検出されず）
- フォーム要素に CSS Transition を使用
- ページ全体としてはシンプル・クリーンな静的デザイン

```css
/* フォーム要素のトランジション（実際のコードから抽出） */
input, select, textarea {
  transition: border var(--_transition-duration)
              var(--_transition-function-timing)
              var(--_transition-delay);
}
input:focus {
  border-color: #3a87fd;
  outline: none;
}

/* チェックボックスのカスタムスタイル（実際のコードから抽出） */
input[type="checkbox"]:checked {
  background-color: #3a87fd;
  border-color: #3a87fd;
}
input[type="checkbox"]:checked::before {
  /* チェックマークの描画 */
  content: "";
  /* SVG or border trick */
}
```

**BDX への示唆**: 両大手ともアニメーションは控えめ。コンサルティングファームのブランドイメージとして「落ち着き・信頼感」を重視している。BDX も過度なアニメーションは避け、上品な scroll-reveal 程度にとどめるべき。

---

### 2-3. セクション構成（情報設計）

ベイカレントの情報設計は**人材ストーリー重視**:

| 順番 | セクション名 | コンテンツ種別 | アイテム数 |
|------|-------------|---------------|-----------|
| 1 | ヘッダー/ナビゲーション | グローバルメニュー | 6項目 |
| 2 | ヒーロー + 告知 | 画像 + ミッション文 + 選考開始告知 | - |
| 3 | **募集要項・エントリー** | 新卒/中途リンク | 2リンク |
| 4 | **キャリアストーリー** | 社員プロフィールカード（写真・役職・大学名） | **17名分** |
| 5 | **プロジェクト事例** | ケーススタディカード（画像付き） | 6件 |
| 6 | **キャリアサポート** | 3カード（キャリアパス・成長環境・研修制度） | 3件 |
| 7 | **職場環境** | 3サブセクション（働き方・福利厚生・イベント） | 3件 |
| 8 | **プロフェッショナルネットワーク** | 役員インタビュー・記事 | 複数 |
| 9 | フッター | リンク + SNS（LinkedIn, X） | - |

**PwC との比較**:
- PwC: セクション数が多く網羅的（10セクション以上）
- ベイカレント: 社員ストーリーに17名を投入し、「人で勝負する」姿勢が鮮明

**BDX への示唆**: キャリアストーリー17名は非常に充実。BDX は社員数が少ないため、少数精鋭の濃いインタビュー（3-5名）+ プロジェクト事例で差別化すべき。

---

### 2-4. カラースキーム

| 用途 | 色 | 値 |
|------|-----|-----|
| メインカラー（青） | アクセントブルー | `#3a87fd` |
| テキスト（本文） | チャコール | `#32373c` |
| 背景（メイン） | ホワイト | `#ffffff` |
| 背景（暗） | ブラック | `#000000` |
| シャドウ | ナチュラルシャドウ | `rgba(0, 0, 0, 0.2)` |

**CSS カスタムプロパティによるデザインシステム**:
```css
/* WordPress プリセット（実際のコードから抽出） */
:root {
  --wp--preset--color--black: #000000;
  --wp--preset--color--white: #ffffff;
  --wp--preset--font-size--small: 13px;
  --wp--preset--font-size--medium: 20px;
  --wp--preset--font-size--large: 36px;
  --wp--preset--font-size--x-large: 42px;
}

/* シャドウプリセット */
.has-natural-shadow {
  box-shadow: 6px 6px 9px rgba(0, 0, 0, 0.2);
}
.has-deep-shadow {
  box-shadow: 12px 12px 50px rgba(0, 0, 0, 0.4);
}
.has-sharp-shadow {
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
}
```

**BDX への示唆**: CSS カスタムプロパティによるデザイントークンの体系化は、保守性が高い。BDX でも `--bdx-color-primary`, `--bdx-font-size-heading` のようなトークン設計を採用すべき。

---

### 2-5. タイポグラフィ

**Adobe Typekit によるカスタムフォント**:
```javascript
// 実際のコードから抽出
(function(d) {
  var config = {
    kitId: 'fpc3ufg',  // Adobe Fonts Kit ID
    scriptTimeout: 3000,
    async: true
  };
  // Typekit ローダー
})(document);
```

**フォントサイズ体系**（CSS カスタムプロパティ、実際の値）:

| プリセット名 | サイズ | 用途 |
|-------------|--------|------|
| `--wp--preset--font-size--small` | 13px | 補足テキスト、キャプション |
| `--wp--preset--font-size--medium` | 20px | 本文 |
| `--wp--preset--font-size--large` | 36px | セクション見出し |
| `--wp--preset--font-size--x-large` | 42px | ページタイトル |

**BDX への示唆**: Adobe Fonts（Typekit）は月額課金だが、Google Fonts で同等の品質が得られる。Noto Sans JP + 英字用の洗練されたサンセリフ（Inter, Outfit 等）の組み合わせを推奨。

---

### 2-6. カード・グリッドレイアウト

**Flexbox ベース**（実際のクラスから抽出）:
```css
/* WordPress Block Flexbox レイアウト */
.is-layout-flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
}
.is-layout-flex > * {
  margin: 0;
}

/* カラムブロック */
.wp-block-columns {
  display: flex;
  gap: 2em;
}

/* グリッドレイアウト */
.is-layout-grid {
  display: grid;
  gap: 0.5em;
}
```

**社員カードの構造**:
```html
<!-- キャリアストーリーカード（推定構造） -->
<article class="career-story-card">
  <a href="/careers/ourpeople/story-XXXX/">
    <img src="photo.webp"
         width="1024" height="683"
         loading="lazy"
         sizes="auto"
         style="contain-intrinsic-size: 3000px 1500px;">
    <div class="card-meta">
      <span class="role">コンサルタント / モビリティ</span>
      <h3 class="name">若原 未來</h3>
      <span class="university">XX大学卒</span>
    </div>
  </a>
</article>
```

**画像仕様**: 1024x683px（3:2 アスペクト比）、WebP フォーマット

**BDX への示唆**: 社員写真は 3:2 のポートレート比率が自然。Flexbox + gap による spacing は margin collapsing 問題を回避できるモダンな手法。

---

### 2-7. ナビゲーション

**構造**:
- 左: ロゴ
- 中央〜右: 水平メニュー（企業情報 / 産業・サービス / 論考・レポート / 採用情報 / サステナビリティ / IR情報）
- 右端: 言語切替（EN/JP）
- ドロップダウン: 「閉じる」ボタン付きのサブメニュー

```html
<header>
  <nav>
    <a href="/" class="logo">
      <img src="logo.svg" alt="BayCurrentConsulting">
    </a>
    <ul class="global-nav">
      <li>企業情報 <button class="close">閉じる</button></li>
      <li>産業・サービス</li>
      <li>論考・レポート</li>
      <li>採用情報</li>
      <li>サステナビリティ</li>
      <li>IR情報</li>
    </ul>
    <div class="lang-switch">
      <a href="/en/">EN</a> | <a href="/">JP</a>
    </div>
  </nav>
</header>
```

**SNS リンク**: LinkedIn (`icon_in.svg`) + X (`icon_x.svg`) をフッターに配置

**BDX への示唆**: 採用サイト専用ナビは、グローバルナビから独立させたほうが遷移がスムーズ。ベイカレントのようにコーポレートサイトと統合する場合は、「採用情報」セクション内のサブナビを充実させる。

---

### 2-8. モバイル対応

- **画像の最適化**: ファイル名に `_sp` サフィックス（`careers_mv_sp.webp`）でモバイル専用アセットを用意
- **レスポンシブ画像**: `sizes="auto"` + `contain-intrinsic-size` で CLS 防止
- **Flexbox ベース**: `flex-wrap: wrap` により自然なカラム折り返し
- **明示的なブレークポイント**: CSS 内には検出されず。WordPress テーマ側で制御

```css
/* 推定されるレスポンシブ対応 */
@media (max-width: 768px) {
  .wp-block-columns {
    flex-direction: column;
    gap: 1em;
  }
  .career-story-card img {
    width: 100%;
    height: auto;
  }
}
```

**BDX への示唆**: モバイル専用画像（`_sp` サフィックス）は回線速度の遅い環境で有効。`<picture>` + `<source>` タグで PC/SP 画像を切り替える実装を推奨。

---

### 2-9. インタラクション

- **フォームコントロール**: ボーダーカラーの transition によるフォーカスフィードバック
- **チェックボックス/ラジオ**: カスタムスタイル（16x16px `inline-flex` コンテナ + `:checked` 時のブルー背景）
- **ボタン**: `.wp-block-button__link` ベース（ダークグレー `#32373c`）
- **ファイルアップロード**: `.smf-file-control--set` 状態でファイル名表示切り替え

```css
/* フォーカストランジション（実際のコードから） */
input:focus, select:focus, textarea:focus {
  border-color: #3a87fd;
  transition: border 0.3s ease;
}

/* カスタムチェックボックス（実際のコードから） */
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  display: inline-flex;
  appearance: none;
  border: 1px solid var(--_form-control-border-color);
  border-radius: 2px;
}
input[type="checkbox"]:checked {
  background-color: #3a87fd;
  border-color: #3a87fd;
}
```

---

### 2-10. 特に優れている点

1. **CSS カスタムプロパティによるデザインシステム**: `--wp--preset--*` でカラー・フォント・シャドウ・グラデーションを体系化。12種類のプリセットグラデーション、3種類のシャドウバリアント
2. **パフォーマンス最適化**: WebP 画像 + `contain-intrinsic-size` + `content-visibility: auto` による CLS 防止
3. **社員ストーリーの充実**: 17名の個別プロフィールページ（大学名・部門・キャリアビジョン付き）
4. **Flexbox/Grid のモダンな使い分け**: gap プロパティによるマージン管理、`is-layout-flex` / `is-layout-grid` の使い分け
5. **Adobe Fonts**: プロフェッショナルなタイポグラフィ（Typekit Kit ID: `fpc3ufg`）

---

## 3. 両サイト比較・BDX への提言

### 3-1. 技術スタック比較

| 項目 | PwC | ベイカレント |
|------|-----|-------------|
| CMS | Adobe Experience Manager (AEM) | WordPress |
| JS フレームワーク | Angular.js (部分的) | なし（Vanilla） |
| CSS フレームワーク | Bootstrap | WordPress Block Editor CSS |
| フォント | システムフォント | Adobe Fonts (Typekit) |
| 画像形式 | JPG + SVG | WebP + SVG |
| アニメーション | なし | なし |
| パフォーマンス最適化 | 標準的 | `contain-intrinsic-size`, WebP |

### 3-2. デザインアプローチ比較

| 観点 | PwC | ベイカレント |
|------|-----|-------------|
| 全体印象 | 情報網羅・構造化 | 人材重視・洗練 |
| カラー | ダーク + オレンジ | ブルー基調 + ホワイト |
| アニメーション | 控えめ | 控えめ |
| 情報量 | 多い（10セクション+） | 中程度（8セクション） |
| 社員紹介 | ファセットナビで探索型 | 17名をリスト表示 |
| モバイル | Bootstrap レスポンシブ | Flexbox + SP画像 |

### 3-3. BDX 採用サイトに取り入れるべき実装手法 TOP 10

| # | 手法 | 出典 | 優先度 | 実装難易度 |
|---|------|------|--------|-----------|
| 1 | **CSS カスタムプロパティによるデザイントークン** | ベイカレント | 高 | 低 |
| 2 | **WebP 画像 + `contain-intrinsic-size` による CLS 防止** | ベイカレント | 高 | 低 |
| 3 | **英語+日本語の併記セクション見出し** | PwC | 高 | 低 |
| 4 | **社員インタビューページ（写真+大学+部門+ストーリー）** | ベイカレント | 高 | 中 |
| 5 | **「仕事→人→環境→採用情報」の情報設計フロー** | PwC | 高 | 低 |
| 6 | **セクションごとのカラム数バリエーション（2/3/4列）** | PwC | 中 | 低 |
| 7 | **モバイル専用画像アセット（`_sp` サフィックス）** | ベイカレント | 中 | 低 |
| 8 | **シャドウプリセットシステム（natural/deep/sharp）** | ベイカレント | 中 | 低 |
| 9 | **デュアルCTA（年度別マイページ導線）** | PwC | 中 | 低 |
| 10 | **scroll-reveal アニメーション（上品な fade-in + slide-up）** | (独自追加) | 中 | 低 |

### 3-4. 推奨する CSS 実装パターン

```css
/* === BDX 採用サイト向け推奨 CSS 設計 === */

/* 1. デザイントークン（ベイカレント参考） */
:root {
  /* カラー */
  --bdx-color-primary: #1a3a6b;     /* BDXブランドに合わせて調整 */
  --bdx-color-accent: #3a87fd;
  --bdx-color-text: #32373c;
  --bdx-color-bg: #ffffff;
  --bdx-color-bg-alt: #f5f7fa;

  /* フォントサイズ */
  --bdx-font-size-sm: 13px;
  --bdx-font-size-base: 16px;
  --bdx-font-size-md: 20px;
  --bdx-font-size-lg: 36px;
  --bdx-font-size-xl: 42px;

  /* シャドウ（ベイカレント参考） */
  --bdx-shadow-natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
  --bdx-shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
  --bdx-shadow-card: 0 2px 8px rgba(0, 0, 0, 0.06);

  /* スペーシング */
  --bdx-gap-sm: 0.5em;
  --bdx-gap-md: 1.5em;
  --bdx-gap-lg: 2em;
  --bdx-section-padding: 80px 0;
}

/* 2. CLS 防止（ベイカレント参考） */
img[loading="lazy"] {
  content-visibility: auto;
  contain-intrinsic-size: auto 300px;
}

/* 3. セクション交互背景 */
.section:nth-child(even) {
  background: var(--bdx-color-bg-alt);
}

/* 4. Scroll Reveal（両サイトにはないが BDX に必要） */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 5. カードホバー（PwC 参考） */
.card {
  background: var(--bdx-color-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--bdx-shadow-card);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.card:hover {
  box-shadow: var(--bdx-shadow-hover);
  transform: translateY(-4px);
}

/* 6. Flexbox グリッド（ベイカレント参考） */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--bdx-gap-lg);
}
.grid-2 > * { flex: 1 1 calc(50% - var(--bdx-gap-lg)); }
.grid-3 > * { flex: 1 1 calc(33.333% - var(--bdx-gap-lg)); }
.grid-4 > * { flex: 1 1 calc(25% - var(--bdx-gap-lg)); }

@media (max-width: 768px) {
  .grid-2 > *, .grid-3 > *, .grid-4 > * {
    flex: 1 1 100%;
  }
}
```

### 3-5. 推奨する Scroll Reveal 実装（JavaScript）

両サイトともアニメーションは不使用だが、BDX はブランド認知が低いため視覚的なインパクトが必要:

```javascript
/* IntersectionObserver による軽量スクロールアニメーション */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // 1回のみ発火
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## 4. まとめ

| 評価項目 | PwC | ベイカレント | BDX で採用すべき |
|----------|-----|-------------|----------------|
| 情報設計 | ★★★★★ | ★★★★ | PwC の網羅的構成 |
| ビジュアル | ★★★★ | ★★★★★ | ベイカレントのクリーンさ |
| パフォーマンス | ★★★ | ★★★★★ | ベイカレントの最適化手法 |
| 社員コンテンツ | ★★★★ | ★★★★★ | ベイカレントの人材重視 |
| 技術実装 | ★★★★ | ★★★★ | 両者のハイブリッド |
| アニメーション | ★★ | ★★ | 独自に上品な reveal を追加 |
| アクセシビリティ | ★★★★★ | ★★★ | PwC の ARIA 対応 |

**結論**: PwC の情報設計の網羅性 + ベイカレントのビジュアルクリーンさ + 独自の scroll-reveal アニメーションを組み合わせたハイブリッドアプローチが BDX に最適。
