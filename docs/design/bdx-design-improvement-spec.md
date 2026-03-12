# BDX 新卒採用サイト デザイン改善設計書

> 作成日: 2026-03-12
> 対象: bdx.co.jp/recruitment-graduate/ 以下の全ページ

---

## はじめに

この文書は、BDX 新卒採用サイトのデザインを改善するための設計書です。

**何をするか**: 今の採用ページは「文字が多くて読みづらい」「社員の雰囲気が伝わらない」という課題があります。競合コンサルファーム（PwC、EY、ベイカレント、アビーム等）の手法を参考に、**BDX らしいデザイン**に刷新します。

**技術的な制約**: BDX のサイトは静的 HTML + CSS + JavaScript で構成されています。React や Vue のようなフレームワークは使いません。今ある技術の延長線上で、見た目と使い勝手を大幅に向上させます。

---

## 1. デザイン原則

### BDX のトーン&マナー

BDX のデザインは「**戦略コンサルの品格**」と「**学生が親しみやすい温かみ**」の両立を目指します。

| 要素 | 方針 | 理由 |
|------|------|------|
| **色** | ネイビーブルー基調 + 温かいアクセント | 信頼感 + 親しみやすさ |
| **写真** | 社員の自然な表情・働く姿を多用 | 「実際に働いている様子がわからない」への回答 |
| **余白** | セクション間にたっぷりの余白 | 「文字が多く読みづらい」への回答 |
| **文字量** | 1セクション3行以内を基本 | 読み疲れを防ぐ |
| **動き** | 控えめなスクロールアニメーション | 品のある演出。派手すぎない |

### 競合との差別化

| 競合 | 特徴 | BDX の差別化 |
|------|------|-------------|
| PwC | 網羅的・大企業感 | → BDX は「少数精鋭」「距離の近さ」を強調 |
| ベイカレント | 洗練されたデザインシステム | → BDX は「温かみ」「実行力」で差別化 |
| EY | グローバル感 | → BDX は「日本企業の経営課題に直接向き合う」 |
| アビーム | 「知る」軸の情報設計 | → BDX も「知る」を取り入れつつ、「体験する」を前面に |

### キーメッセージ

サイト全体を貫くメッセージ:

> **「戦略を描く。そして、実行する。」**

- 戦略コンサルの知性 + 実行まで伴走する泥臭さ
- ジョブインターンで学生が実感している価値と一致
- アンケートの「成長環境」「戦略 x 実行」テーマとも整合

---

## 2. カラーシステム

### ベースカラー

既存のブランドカラー `#003894`（ネイビーブルー）を軸に、温かみのあるアクセントカラーを追加します。

```css
/* ========================================
   BDX カラーシステム
   recruitment-graduate 用の CSS カスタムプロパティ
   ======================================== */

:root {
  /* --- ブランドカラー --- */
  --bdx-navy:         #003894;   /* メインカラー（既存） */
  --bdx-navy-dark:    #002266;   /* ヘッダー・フッター用の濃い紺 */
  --bdx-navy-light:   #1a5cc8;   /* ホバー時やリンク色に使う少し明るい紺 */

  /* --- アクセントカラー --- */
  --bdx-gold:         #C8A864;   /* CTAボタン・強調・アワードバッジ */
  --bdx-gold-light:   #D4BC82;   /* ゴールドのホバー時 */

  /* --- 背景色（セクションの切り替えに使用） --- */
  --bdx-bg-white:     #FFFFFF;   /* 白背景セクション */
  --bdx-bg-light:     #F5F7FA;   /* ライトグレー背景セクション */
  --bdx-bg-navy:      #003894;   /* ネイビー背景セクション（白文字） */
  --bdx-bg-dark:      #0A1628;   /* ダーク背景（ヒーロー用） */

  /* --- テキスト色 --- */
  --bdx-text-primary:   #1A1A2E; /* 本文の黒（真っ黒でなく少し柔らかい） */
  --bdx-text-secondary: #4A5568; /* 補足テキスト・キャプション */
  --bdx-text-on-dark:   #FFFFFF; /* ネイビー/ダーク背景上の白文字 */
  --bdx-text-on-dark-sub: #B0C4DE; /* ダーク背景上の薄い文字 */

  /* --- ボーダー --- */
  --bdx-border:       #E2E8F0;   /* 区切り線・カード枠線 */
  --bdx-border-gold:  #C8A864;   /* アクセント区切り線 */
}
```

### セクション背景の使い分け

ページ内で背景色を交互に切り替え、視覚的にセクションの区切りを明確にします。

```
ヒーロー     → --bdx-bg-dark（暗い背景 + 写真）
BDXを知る   → --bdx-bg-white（白）
数字で見る   → --bdx-bg-light（ライトグレー）
社員の声    → --bdx-bg-white（白）
キャリアパス → --bdx-bg-navy（ネイビー背景 + 白文字）
選考フロー   → --bdx-bg-light（ライトグレー）
募集要項    → --bdx-bg-white（白）
CTA        → --bdx-bg-navy（ネイビー背景）
```

この交互パターンにより、スクロールしても「今どのセクションにいるか」が直感的にわかります。

---

## 3. タイポグラフィ

### フォント方針

既存のフォント（EB Garamond + Noto Sans JP）をそのまま活用します。新しいフォントは追加しません。

| 用途 | フォント | 理由 |
|------|----------|------|
| **英語の見出し・キャッチコピー** | EB Garamond | 格調高いセリフ体。コンサルの品格を表現 |
| **日本語テキスト全般** | Noto Sans JP | 可読性が高く、画面で読みやすい |

### サイズ・ウェイト定義

```css
/* ========================================
   タイポグラフィ
   ======================================== */

/* --- ヒーローのキャッチコピー（ページに1つだけ） --- */
.rg-hero__title {
  font-family: 'EB Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);  /* 画面幅で自動調整: 32px〜56px */
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: 0.04em;
  color: var(--bdx-text-on-dark);
}

/* --- セクション見出し（h2相当） --- */
.rg-section__title {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);  /* 24px〜32px */
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: var(--bdx-text-primary);
}

/* セクション見出しの英語サブタイトル */
.rg-section__subtitle {
  font-family: 'EB Garamond', serif;
  font-size: 0.875rem;   /* 14px */
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bdx-navy);
  margin-bottom: 0.5rem;
}

/* --- カード見出し（h3相当） --- */
.rg-card__title {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1.125rem;   /* 18px */
  font-weight: 700;
  line-height: 1.5;
  color: var(--bdx-text-primary);
}

/* --- 本文テキスト --- */
.rg-text {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1rem;       /* 16px */
  font-weight: 400;
  line-height: 1.8;      /* 読みやすい行間 */
  color: var(--bdx-text-primary);
}

/* --- キャプション・補足テキスト --- */
.rg-caption {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.8125rem;  /* 13px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--bdx-text-secondary);
}

/* --- 統計数値（大きな数字） --- */
.rg-stat__number {
  font-family: 'EB Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);  /* 40px〜64px */
  font-weight: 500;
  line-height: 1.1;
  color: var(--bdx-navy);
}
```

### clamp() について

上の CSS で使っている `clamp()` は、画面サイズに応じて文字の大きさが自動で変わる仕組みです。

- スマホでは小さめ（左の値）
- PCでは大きめ（右の値）
- その間は画面幅に比例

これにより、レスポンシブ対応のために `@media` を何行も書く必要がなくなります。

---

## 4. アニメーション設計

### 方針

- **外部ライブラリは使わない**（AOS, GSAP, ScrollReveal 等は不要）
- **CSS transition + vanilla JavaScript のみ**（EY 方式）
- **控えめで品のある動き**（「派手」より「上質」）
- **`prefers-reduced-motion` を尊重**（アニメーションが苦手な人への配慮）

### 4-1. Scroll Reveal（スクロール時のふわっと表示）

ページをスクロールすると、セクションが下からふわっと現れるアニメーションです。

**CSS（animation.css に追加）:**

```css
/* ========================================
   Scroll Reveal アニメーション
   ======================================== */

/* --- 初期状態: 見えない + 少し下にずれている --- */
.rg-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* --- 表示状態: 見える + 元の位置 --- */
.rg-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- バリエーション: 左からスライド --- */
.rg-reveal--left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.rg-reveal--left.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* --- バリエーション: 右からスライド --- */
.rg-reveal--right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.rg-reveal--right.is-visible {
  opacity: 1;
  transform: translateX(0);
}

/* --- 連続表示（カードが1枚ずつ順番に出る） --- */
.rg-reveal-stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.rg-reveal-stagger > *.is-visible {
  opacity: 1;
  transform: translateY(0);
}
/* 2番目は0.1秒遅れ、3番目は0.2秒遅れ... */
.rg-reveal-stagger > *:nth-child(2) { transition-delay: 0.1s; }
.rg-reveal-stagger > *:nth-child(3) { transition-delay: 0.2s; }
.rg-reveal-stagger > *:nth-child(4) { transition-delay: 0.3s; }
.rg-reveal-stagger > *:nth-child(5) { transition-delay: 0.4s; }
.rg-reveal-stagger > *:nth-child(6) { transition-delay: 0.5s; }

/* --- アニメーション無効化（ユーザー設定を尊重） --- */
@media (prefers-reduced-motion: reduce) {
  .rg-reveal,
  .rg-reveal--left,
  .rg-reveal--right,
  .rg-reveal-stagger > * {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**JavaScript（scroll-reveal.js）:**

```javascript
/**
 * BDX Scroll Reveal
 *
 * 仕組み:
 * IntersectionObserver という仕組みを使って、
 * 要素が画面内に入ったかどうかを検知し、
 * is-visible クラスを付与してアニメーションを発火させる。
 */
(function () {
  'use strict';

  // アニメーション無効設定の人はスキップ
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // 全要素を最初から表示
    document.querySelectorAll('.rg-reveal, .rg-reveal--left, .rg-reveal--right')
      .forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('.rg-reveal-stagger')
      .forEach(function (parent) {
        Array.from(parent.children).forEach(function (child) {
          child.classList.add('is-visible');
        });
      });
    return;
  }

  // --- 単体要素の reveal ---
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);  // 一度表示したら監視を解除
      }
    });
  }, {
    threshold: 0.15,   // 要素の 15% が見えたら発火
    rootMargin: '0px 0px -50px 0px'  // 画面下端から 50px 手前で発火
  });

  document.querySelectorAll('.rg-reveal, .rg-reveal--left, .rg-reveal--right')
    .forEach(function (el) { revealObserver.observe(el); });

  // --- 連続表示（stagger） ---
  var staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        Array.from(entry.target.children).forEach(function (child) {
          child.classList.add('is-visible');
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.rg-reveal-stagger')
    .forEach(function (el) { staggerObserver.observe(el); });

})();
```

### 4-2. ホバーエフェクト

マウスを乗せたときの反応で、クリックできる要素であることを伝えます。

```css
/* ========================================
   ホバーエフェクト
   ======================================== */

/* --- カードのホバー（浮き上がる影） --- */
.rg-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.rg-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 56, 148, 0.12);
}

/* --- ボタンのホバー --- */
.rg-btn {
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.rg-btn:hover {
  transform: translateY(-2px);
}
.rg-btn:active {
  transform: translateY(0);
}

/* --- 画像のホバー（わずかに拡大） --- */
.rg-card__image-wrap {
  overflow: hidden;  /* はみ出た部分を隠す */
}
.rg-card__image {
  transition: transform 0.4s ease;
}
.rg-card:hover .rg-card__image {
  transform: scale(1.05);
}

/* --- リンクテキストのホバー --- */
.rg-link {
  color: var(--bdx-navy);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}
.rg-link:hover {
  border-bottom-color: var(--bdx-navy);
}
```

### 4-3. カウントアップアニメーション

「数字で見る BDX」セクションで、数字がゼロからカウントアップする演出です。

```javascript
/**
 * BDX Counter Animation
 * 数字を 0 から目標値まで滑らかにカウントアップする
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1500;  // 1.5秒かけてカウント
      var start = performance.now();

      function update(now) {
        var progress = Math.min((now - start) / duration, 1);
        // easeOutQuart: 最初は速く、後半はゆっくり
        var eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(target * eased) + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObserver.observe(el);
  });
})();
```

HTML での使い方:

```html
<!-- 「2015」にカウントアップ + 末尾に「年」 -->
<span class="rg-stat__number" data-count="2015" data-suffix="年">0</span>

<!-- 「50」にカウントアップ + 末尾に「名+」 -->
<span class="rg-stat__number" data-count="50" data-suffix="名+">0</span>
```

---

## 5. コンポーネント設計

ここでは、サイト全体で繰り返し使う「部品（コンポーネント）」を定義します。同じ部品を使い回すことで、デザインの統一感を保ちます。

### 命名規則

すべてのクラス名には `rg-`（recruitment-graduate の略）を接頭辞として付けます。既存の `m_` 系クラスとの衝突を避けるためです。

### 5-1. ヒーローセクション

ページの最上部に配置する、フルスクリーンの大きなビジュアルセクションです。

```html
<section class="rg-hero">
  <div class="rg-hero__overlay"></div>
  <div class="rg-hero__content">
    <p class="rg-hero__label">RECRUITMENT</p>
    <h1 class="rg-hero__title">戦略を描く。<br>そして、実行する。</h1>
    <p class="rg-hero__subtitle">B&DX 新卒採用 2028</p>
    <div class="rg-hero__cta">
      <a href="#" class="rg-btn rg-btn--primary">エントリーはこちら</a>
      <a href="#" class="rg-btn rg-btn--outline">マイページ</a>
    </div>
  </div>
</section>
```

```css
/* ========================================
   ヒーローセクション
   ======================================== */
.rg-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;  /* モバイルのアドレスバーを考慮 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 背景画像は HTML の style 属性 or 個別 CSS で指定 */
}

.rg-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 22, 40, 0.7) 0%,
    rgba(0, 56, 148, 0.5) 100%
  );
  /* ネイビーがかったオーバーレイ → ブランドカラーとの統一感 */
}

.rg-hero__content {
  position: relative;   /* オーバーレイの上に表示 */
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
}

.rg-hero__label {
  font-family: 'EB Garamond', serif;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bdx-gold);
  margin-bottom: 1rem;
}

/* .rg-hero__title はタイポグラフィセクションで定義済み */

.rg-hero__subtitle {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1rem;
  color: var(--bdx-text-on-dark-sub);
  margin-top: 1rem;
}

.rg-hero__cta {
  margin-top: 2.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
```

### 5-2. ボタン

```css
/* ========================================
   ボタン
   ======================================== */

/* --- 共通 --- */
.rg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid transparent;
  transition: background-color 0.2s ease, transform 0.2s ease,
              border-color 0.2s ease, color 0.2s ease;
}

/* --- プライマリ（ゴールド背景） --- */
.rg-btn--primary {
  background-color: var(--bdx-gold);
  color: #FFFFFF;
  border-color: var(--bdx-gold);
}
.rg-btn--primary:hover {
  background-color: var(--bdx-gold-light);
  border-color: var(--bdx-gold-light);
  transform: translateY(-2px);
}

/* --- アウトライン（透明背景 + 白枠） --- */
.rg-btn--outline {
  background-color: transparent;
  color: #FFFFFF;
  border-color: #FFFFFF;
}
.rg-btn--outline:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* --- ネイビー（白背景セクション用） --- */
.rg-btn--navy {
  background-color: var(--bdx-navy);
  color: #FFFFFF;
  border-color: var(--bdx-navy);
}
.rg-btn--navy:hover {
  background-color: var(--bdx-navy-light);
  border-color: var(--bdx-navy-light);
  transform: translateY(-2px);
}
```

### 5-3. セクション共通レイアウト

```css
/* ========================================
   セクション共通
   ======================================== */
.rg-section {
  padding: 5rem 1.5rem;
}

.rg-section__inner {
  max-width: 1100px;
  margin: 0 auto;
}

/* セクション見出しの共通レイアウト */
.rg-section__header {
  text-align: center;
  margin-bottom: 3rem;
}

/* 背景色バリエーション */
.rg-section--white  { background-color: var(--bdx-bg-white); }
.rg-section--light  { background-color: var(--bdx-bg-light); }
.rg-section--navy   { background-color: var(--bdx-bg-navy); color: var(--bdx-text-on-dark); }

/* ネイビー背景セクションの見出し色上書き */
.rg-section--navy .rg-section__title    { color: var(--bdx-text-on-dark); }
.rg-section--navy .rg-section__subtitle { color: var(--bdx-gold); }
```

### 5-4. コンテンツカード（3列グリッド）

社員の声、BDXを知る、インターンの特徴など、多くのセクションで使う汎用カードです。

```html
<div class="rg-card-grid rg-reveal-stagger">
  <!-- カード1 -->
  <a href="/recruitment-graduate/voices/tanaka/" class="rg-card">
    <div class="rg-card__image-wrap">
      <img src="/images/recruit/tanaka.webp" alt="田中さん" class="rg-card__image" loading="lazy">
    </div>
    <div class="rg-card__body">
      <p class="rg-card__tag">Manager</p>
      <h3 class="rg-card__title">「自分で考え、自分で動く」経験がここにある</h3>
      <p class="rg-card__text">入社3年目、大手小売業のDX戦略を担当...</p>
    </div>
  </a>
  <!-- カード2, 3... -->
</div>
```

```css
/* ========================================
   カードグリッド
   ======================================== */
.rg-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* タブレット: 2列 */
@media (max-width: 960px) {
  .rg-card-grid { grid-template-columns: repeat(2, 1fr); }
}

/* スマホ: 1列 */
@media (max-width: 600px) {
  .rg-card-grid { grid-template-columns: 1fr; }
}

/* --- カード --- */
.rg-card {
  display: block;
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.rg-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 56, 148, 0.12);
}

.rg-card__image-wrap {
  overflow: hidden;
  aspect-ratio: 16 / 10;
}
.rg-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.rg-card:hover .rg-card__image {
  transform: scale(1.05);
}

.rg-card__body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.rg-card__tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--bdx-navy);
  background: rgba(0, 56, 148, 0.08);
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  margin-bottom: 0.75rem;
}

.rg-card__text {
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--bdx-text-secondary);
  margin-top: 0.5rem;
}
```

### 5-5. 統計カード（数字で見る BDX）

大きな数字 + 説明テキストで、BDX の実績をインパクトある形で伝えるカードです。

```html
<section class="rg-section rg-section--light">
  <div class="rg-section__inner">
    <div class="rg-section__header rg-reveal">
      <p class="rg-section__subtitle">Numbers</p>
      <h2 class="rg-section__title">数字で見る BDX</h2>
    </div>
    <div class="rg-stat-grid rg-reveal-stagger">
      <div class="rg-stat">
        <span class="rg-stat__number" data-count="2015" data-suffix="年">0</span>
        <p class="rg-stat__label">設立</p>
      </div>
      <div class="rg-stat">
        <span class="rg-stat__number" data-count="50" data-suffix="名+">0</span>
        <p class="rg-stat__label">社員数</p>
      </div>
      <div class="rg-stat">
        <span class="rg-stat__number" data-count="100" data-suffix="%">0</span>
        <p class="rg-stat__label">プロジェクト継続率</p>
      </div>
      <div class="rg-stat">
        <span class="rg-stat__number" data-count="81" data-suffix="%">0</span>
        <p class="rg-stat__label">面接後「第一志望群」以上</p>
      </div>
    </div>
  </div>
</section>
```

```css
/* ========================================
   統計カード
   ======================================== */
.rg-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .rg-stat-grid { grid-template-columns: repeat(2, 1fr); }
}

.rg-stat {
  padding: 2rem 1rem;
}

/* .rg-stat__number はタイポグラフィセクションで定義済み */

.rg-stat__label {
  font-size: 0.875rem;
  color: var(--bdx-text-secondary);
  margin-top: 0.5rem;
}
```

### 5-6. タイムラインコンポーネント（キャリアパス用）

入社後のキャリアステップを時系列で表現します。

```html
<div class="rg-timeline rg-reveal">
  <div class="rg-timeline__item">
    <div class="rg-timeline__marker">1</div>
    <div class="rg-timeline__content">
      <h3 class="rg-timeline__title">アナリスト（1〜2年目）</h3>
      <p class="rg-timeline__text">リサーチ・分析を担当。先輩コンサルタントのもとで基礎力を磨く。</p>
    </div>
  </div>
  <div class="rg-timeline__item">
    <div class="rg-timeline__marker">2</div>
    <div class="rg-timeline__content">
      <h3 class="rg-timeline__title">コンサルタント（3〜4年目）</h3>
      <p class="rg-timeline__text">ワークストリームを主導。クライアントとの直接折衝も経験。</p>
    </div>
  </div>
  <div class="rg-timeline__item">
    <div class="rg-timeline__marker">3</div>
    <div class="rg-timeline__content">
      <h3 class="rg-timeline__title">マネージャー（5年目〜）</h3>
      <p class="rg-timeline__text">プロジェクト全体のマネジメント。チームの育成にも携わる。</p>
    </div>
  </div>
</div>
```

```css
/* ========================================
   タイムライン
   ======================================== */
.rg-timeline {
  position: relative;
  padding-left: 3rem;
}

/* 縦のライン */
.rg-timeline::before {
  content: '';
  position: absolute;
  left: 1.25rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--bdx-border);
}

.rg-timeline__item {
  position: relative;
  padding-bottom: 2.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.rg-timeline__item:last-child {
  padding-bottom: 0;
}

.rg-timeline__marker {
  position: absolute;
  left: -3rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--bdx-navy);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'EB Garamond', serif;
  font-size: 1rem;
  font-weight: 600;
  z-index: 1;
}

.rg-timeline__content {
  padding-top: 0.25rem;
}

.rg-timeline__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--bdx-text-primary);
  margin-bottom: 0.5rem;
}

.rg-timeline__text {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--bdx-text-secondary);
}
```

### 5-7. 引用ブロック（学生の声用）

アンケートや学生のコメントを目立たせる引用表示です。

```html
<blockquote class="rg-quote">
  <p class="rg-quote__text">
    「戦略だけでなく、実行まで伴走する姿勢に驚きました。
    インターンで実際のプロジェクトに近い課題に取り組めたことが、
    他社にはない貴重な経験でした。」
  </p>
  <footer class="rg-quote__footer">
    <span class="rg-quote__author">2025年入社 / 早稲田大学 商学部</span>
  </footer>
</blockquote>
```

```css
/* ========================================
   引用ブロック
   ======================================== */
.rg-quote {
  position: relative;
  padding: 2rem 2rem 2rem 3rem;
  background: var(--bdx-bg-light);
  border-left: 4px solid var(--bdx-gold);
  border-radius: 0 8px 8px 0;
  margin: 2rem 0;
}

.rg-quote__text {
  font-size: 1.0625rem;
  line-height: 1.9;
  color: var(--bdx-text-primary);
  font-style: normal;
}

.rg-quote__footer {
  margin-top: 1rem;
}

.rg-quote__author {
  font-size: 0.8125rem;
  color: var(--bdx-text-secondary);
}
```

### 5-8. CTA バナー（エントリー誘導）

ページの最後に配置し、エントリーへの行動を促すバナーです。

```html
<section class="rg-cta-banner">
  <div class="rg-cta-banner__inner">
    <h2 class="rg-cta-banner__title">一緒に、未来をつくりませんか。</h2>
    <p class="rg-cta-banner__text">BDX の新卒採用にエントリーする</p>
    <div class="rg-cta-banner__buttons">
      <a href="#" class="rg-btn rg-btn--primary">エントリーはこちら</a>
      <a href="#" class="rg-btn rg-btn--outline">マイページ</a>
    </div>
  </div>
</section>
```

```css
/* ========================================
   CTA バナー
   ======================================== */
.rg-cta-banner {
  background: var(--bdx-bg-navy);
  padding: 5rem 1.5rem;
  text-align: center;
}

.rg-cta-banner__inner {
  max-width: 700px;
  margin: 0 auto;
}

.rg-cta-banner__title {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--bdx-text-on-dark);
  line-height: 1.4;
}

.rg-cta-banner__text {
  color: var(--bdx-text-on-dark-sub);
  margin-top: 1rem;
  font-size: 1rem;
}

.rg-cta-banner__buttons {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
```

---

## 6. ページ別セクション構成

### 6-1. 新卒採用トップ（recruitment-graduate/index.html）

**現状**: 募集要項のみの簡素なページ

**改善後**: PwC + アビームを参考に、8セクション構成で「知る → 感じる → 行動する」の導線を設計

| # | セクション | 背景 | コンポーネント | 目的 |
|---|-----------|------|---------------|------|
| 1 | **ヒーロー** | ダーク（写真） | `rg-hero` | ブランドメッセージ + CTA でファーストインプレッション |
| 2 | **BDX を知る** | 白 | `rg-card-grid`（3枚） | 「戦略コンサルとは」「ジョブインターン」「社風」への入口 |
| 3 | **数字で見る BDX** | ライトグレー | `rg-stat-grid` | 設立年・社員数・実績を数字でインパクトある表示 |
| 4 | **社員の声** | 白 | `rg-card-grid`（3枚）+ `rg-quote` | 3名分のカード → voices/ ページへ誘導 |
| 5 | **キャリアパス** | ネイビー | `rg-timeline` | アナリスト → コンサルタント → マネージャーの成長フロー |
| 6 | **選考フロー** | ライトグレー | ステップ表示 | ES → 1次 → 2次 → 3次 → 内定のフロー可視化 |
| 7 | **募集要項** | 白 | テーブル | 既存コンテンツを整理・再配置 |
| 8 | **CTA バナー** | ネイビー | `rg-cta-banner` | エントリー / マイページへの最終誘導 |

**ユーザーの心理フロー**:

```
「おっ、かっこいいサイトだな」（ヒーロー）
  → 「どんな会社だろう？」（BDX を知る）
  → 「実績もあるんだ」（数字で見る）
  → 「社員も楽しそうに働いてる」（社員の声）
  → 「入ったらどう成長できるか見えた」（キャリアパス）
  → 「選考ステップもわかりやすい」（選考フロー）
  → 「エントリーしてみよう」（CTA）
```

### 6-2. 学生の声（recruitment-graduate/voices/）

| # | セクション | 背景 | コンポーネント | 内容 |
|---|-----------|------|---------------|------|
| 1 | **ヒーロー** | ダーク | `rg-hero`（小型） | 「学生の声」+ 統計ハイライト（81% が第一志望群以上） |
| 2 | **テーマ: 戦略 x 実行** | 白 | `rg-quote` x 2-3 + 解説 | 「戦略だけじゃなく実行まで」の声を集約 |
| 3 | **テーマ: 温かさ** | ライトグレー | `rg-quote` x 2-3 | 「想像以上に温かい」「距離が近い」 |
| 4 | **テーマ: 成長環境** | 白 | `rg-quote` x 2-3 | 「考え方が変わった」「視野が広がった」 |
| 5 | **テーマ: インターン体験** | ライトグレー | `rg-quote` x 2-3 | 「リアルな課題」「フィードバックが丁寧」 |
| 6 | **アンケート結果** | 白 | 棒グラフ / 円グラフ（CSS） | 志望度変化・満足度をビジュアル化 |
| 7 | **CTA** | ネイビー | `rg-cta-banner` | エントリー誘導 |

### 6-3. ジョブインターン（recruitment-graduate/internship/）

| # | セクション | 背景 | コンポーネント | 内容 |
|---|-----------|------|---------------|------|
| 1 | **ヒーロー** | ダーク | `rg-hero` | 「実際の経営課題に挑む。」+ インターン写真 |
| 2 | **プログラム概要** | 白 | テキスト + アイコン | 期間・形式・報酬の基本情報 |
| 3 | **3つの特徴** | ライトグレー | `rg-card-grid`（3枚） | リアルなケース / 少人数精鋭 / フィードバック重視 |
| 4 | **プログラム詳細** | 白 | `rg-timeline` | Day1〜Day5 のスケジュール |
| 5 | **参加者の声** | ライトグレー | `rg-quote` x 3 | 過去参加者のコメント |
| 6 | **選考フロー** | 白 | ステップ表示 | インターン選考の流れ |
| 7 | **CTA** | ネイビー | `rg-cta-banner` | エントリー誘導 |

### 6-4. 将来的な追加ページ

| ページ | URL | 優先度 | 備考 |
|--------|-----|--------|------|
| キャリアパス詳細 | `/recruitment-graduate/career/` | P2 | ランク別の詳細説明・社員インタビュー |
| 選考フロー詳細 | `/recruitment-graduate/selection/` | P2 | 面接対策・よくある質問 |
| 社員インタビュー個別 | `/recruitment-graduate/voices/{name}/` | P2 | 個別の社員ストーリー |

---

## 7. レスポンシブ設計

全コンポーネントを 3 つのブレークポイントで対応します。

| ブレークポイント | 幅 | 対象デバイス |
|-----------------|-----|-------------|
| Desktop | 961px 以上 | PC・大型タブレット |
| Tablet | 601px〜960px | タブレット |
| Mobile | 600px 以下 | スマートフォン |

### 主な変化

| コンポーネント | Desktop | Tablet | Mobile |
|---------------|---------|--------|--------|
| カードグリッド | 3列 | 2列 | 1列 |
| 統計カード | 4列 | 2列 | 2列 |
| ヒーロー | 100vh | 80vh | 70vh |
| セクション余白 | 5rem | 4rem | 3rem |
| ナビゲーション | 横並び | ハンバーガー | ハンバーガー |

```css
/* ========================================
   レスポンシブ調整
   ======================================== */

/* タブレット */
@media (max-width: 960px) {
  .rg-section { padding: 4rem 1.25rem; }
  .rg-hero { min-height: 80vh; }
}

/* スマホ */
@media (max-width: 600px) {
  .rg-section { padding: 3rem 1rem; }
  .rg-hero { min-height: 70vh; }
  .rg-hero__cta { flex-direction: column; align-items: center; }
  .rg-stat-grid { gap: 1rem; }

  /* タイムラインを縦型に最適化 */
  .rg-timeline { padding-left: 2.5rem; }
  .rg-timeline__marker {
    left: -2.5rem;
    width: 2rem;
    height: 2rem;
    font-size: 0.875rem;
  }
}
```

---

## 8. パフォーマンス指針

### 画像最適化

| 形式 | 用途 | 理由 |
|------|------|------|
| **WebP** | 写真全般 | JPEG より 25-35% 軽量。主要ブラウザ対応済み |
| **SVG** | アイコン・ロゴ | 拡大しても粗くならない。ファイルも小さい |
| **JPEG** | WebP 非対応ブラウザ用フォールバック | `<picture>` タグで切り替え |

```html
<!-- 画像の記述例: WebP 優先、JPEG フォールバック -->
<picture>
  <source srcset="/images/recruit/hero.webp" type="image/webp">
  <img src="/images/recruit/hero.jpg" alt="BDX オフィス風景"
       class="rg-card__image" loading="lazy" decoding="async">
</picture>
```

### lazy loading

- ヒーロー画像（ファーストビュー）: `loading="eager"`（すぐ読み込み）
- それ以下の画像: `loading="lazy"`（スクロールして近づいたら読み込み）

### CSS/JS の読み込み

```html
<!-- 既存の CSS に追加で読み込む -->
<link rel="stylesheet" href="/css/recruit/animation.css">
<link rel="stylesheet" href="/css/recruit/components.css">

<!-- JS はページ末尾で読み込み（描画をブロックしない） -->
<script src="/js/recruit/scroll-reveal.js" defer></script>
<script src="/js/recruit/counter.js" defer></script>
```

---

## 9. 実装計画

### Phase 1: 共通基盤（CSS / JS）

**やること**: 全ページで使う共通の CSS と JavaScript を作成

| 作成するファイル | 内容 |
|-----------------|------|
| `/css/recruit/variables.css` | カラーシステム・CSS カスタムプロパティ |
| `/css/recruit/components.css` | 全コンポーネントのスタイル |
| `/css/recruit/animation.css` | アニメーション定義 |
| `/js/recruit/scroll-reveal.js` | スクロールアニメーション |
| `/js/recruit/counter.js` | カウントアップ |

**見た目の変化**: この段階ではまだページの見た目は変わりません。次のフェーズで使う「道具」を準備する段階です。

### Phase 2: トップページ刷新

**やること**: `recruitment-graduate/index.html` を 8 セクション構成に改修

| 手順 | 内容 |
|------|------|
| 2-1 | ヒーローセクション追加（写真は仮画像で OK） |
| 2-2 | 「BDX を知る」3 カード追加 |
| 2-3 | 「数字で見る BDX」統計カード追加 |
| 2-4 | 「社員の声」カード追加（既存インタビューへのリンク） |
| 2-5 | キャリアパス・選考フローセクション追加 |
| 2-6 | 既存の募集要項を再配置 |
| 2-7 | CTA バナー追加 |

**ステージング確認** → 問題なければ本番デプロイ

### Phase 3: voices / internship 強化

**やること**: 学生の声ページ・インターンページを新規作成

| 手順 | 内容 |
|------|------|
| 3-1 | `voices/index.html` 作成（テーマ別引用 + アンケート結果） |
| 3-2 | `internship/index.html` 作成（3 つの特徴 + タイムライン） |
| 3-3 | トップページからのリンク接続 |

### Phase 4: 追加ページ

**やること**: キャリアパス詳細・選考フロー詳細ページを追加

| 手順 | 内容 |
|------|------|
| 4-1 | `career/index.html` 作成（ランク別詳細 + 社員インタビュー） |
| 4-2 | `selection/index.html` 作成（選考ステップ詳細 + FAQ） |
| 4-3 | 全ページ間の導線を最終チェック |

### 依存関係

```
Phase 1 → Phase 2 → Phase 3 → Phase 4
（共通基盤）  （トップ改修）  （新規ページ）  （追加ページ）
```

Phase 1 が完成しないと Phase 2 以降に進めません。Phase 2 と Phase 3 は一部並行可能ですが、トップページの導線設計が先に固まっている必要があります。

---

## 10. ファイル構成（最終形）

```
site/
├── css/
│   ├── common/
│   │   └── styles.css          ← 既存（変更なし）
│   └── recruit/                ← 新規追加
│       ├── variables.css       ← カラー・フォント定義
│       ├── components.css      ← 全コンポーネントのスタイル
│       └── animation.css       ← アニメーション定義
├── js/
│   └── recruit/                ← 新規追加
│       ├── scroll-reveal.js    ← スクロールアニメーション
│       └── counter.js          ← カウントアップ
├── images/
│   └── recruit/                ← 新規追加
│       ├── hero.webp           ← ヒーロー背景
│       ├── voices/             ← 社員写真
│       └── internship/         ← インターン写真
└── recruitment-graduate/
    ├── index.html              ← Phase 2 で改修
    ├── voices/
    │   └── index.html          ← Phase 3 で新規作成
    ├── internship/
    │   └── index.html          ← Phase 3 で新規作成
    ├── career/
    │   └── index.html          ← Phase 4 で新規作成
    └── selection/
        └── index.html          ← Phase 4 で新規作成
```

---

## 11. 写真素材の手配リスト

デザイン改善には写真素材が必要です。以下は撮影 or 収集が必要なリストです。

| 用途 | 枚数 | 仕様 | 優先度 |
|------|------|------|--------|
| ヒーロー背景 | 1枚 | 横長（16:9 以上）、1920px 幅、社員が働く姿 or オフィス | P0 |
| 社員カード用 | 3〜6枚 | 正方形〜4:3、800px 幅、自然な表情のポートレート | P0 |
| インターン風景 | 3〜5枚 | 横長（16:10）、1200px 幅、ディスカッション・発表の様子 | P1 |
| オフィス風景 | 2〜3枚 | 横長、1200px 幅、執務スペース・会議室 | P2 |

**注意**: 写真がなくてもデザイン改修は進められます（仮画像で Phase 2 まで進行可能）。ただし、本番公開前には実際の写真が必要です。

---

## まとめ

| 項目 | 内容 |
|------|------|
| **目標** | 「文字が多い」「社員が見えない」を解消し、競合に引けを取らない採用サイトに |
| **技術** | 静的 HTML + CSS + vanilla JS（フレームワーク不使用） |
| **デザイン** | ネイビーブルー基調 + ゴールドアクセント + 余白重視 |
| **アニメーション** | IntersectionObserver + CSS transition（外部ライブラリなし） |
| **フェーズ** | Phase 1（基盤）→ 2（トップ改修）→ 3（新規ページ）→ 4（追加ページ） |
| **必要素材** | 社員写真・オフィス写真（仮画像で先行可能） |
