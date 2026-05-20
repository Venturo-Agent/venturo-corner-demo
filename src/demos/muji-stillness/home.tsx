'use client';

/**
 * Home — Muji Stillness landing view
 *
 * 結構（跟 mediterranean 不同：不要全屏 hero）：
 *   1. Topbar 標籤（CORNER · 角落旅行社 · Est. 2018）
 *   2. Hero：中尺寸圖（不全屏）+ 旁邊一句話 + 大量留白
 *   3. Statement：兩條細線之間夾品牌哲學（無印目錄頁感）
 *   4. Catalog：4 條 tour 規則網格、圖小、商品卡質感
 *   5. Values：4 條品牌價值、用 01-04 編號、單欄左對齊（不對稱炫技）
 *   6. CTA：極短、置中、一句話 + 一個按鈕
 *   7. Footer
 *
 * 無印感的關鍵：
 *   - hero 圖只佔 50% 螢幕、另外 50% 是白
 *   - 標題 5xl 為上限、不像 mediterranean 用 80px
 *   - tracking 正常（不用 tracking-[0.4em]）
 *   - fade only、無 y offset
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  MUJI,
  IndexLabel,
  SectionTitle,
  MujiButton,
  Hair,
  BRAND,
  CATEGORY_LABEL,
} from './shared';

const heroTour = tours[0];

const VALUES = [
  {
    n: 1,
    title: '一年只出 24 團',
    body: '我們相信旅行不是大量生產的商品。一年 24 團、每團專人盯到回家。',
  },
  {
    n: 2,
    title: '每團 14 人為上限',
    body: '小到能在一張長桌吃飯、大到不會讓任何一個人被冷落。',
  },
  {
    n: 3,
    title: '住宿全部親自踏過',
    body: '不收 OTA 評分、不看部落客推薦。我們派人去住一晚才上架。',
  },
  {
    n: 4,
    title: '中文領隊全程隨團',
    body: '所有出團都配備經驗 5 年以上的中文領隊、不是外包翻譯。',
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div style={{ background: MUJI.paper, color: MUJI.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="px-6 md:px-12 py-6"
        style={{ borderBottom: `1px solid ${MUJI.line}` }}
      >
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <div className="flex items-baseline gap-4">
            <span
              className="font-display text-base"
              style={{ color: MUJI.ink, fontWeight: 500, letterSpacing: '0.08em' }}
            >
              {BRAND.marque}
            </span>
            <span
              className="hidden md:inline font-body text-xs"
              style={{ color: MUJI.wood }}
            >
              {BRAND.marqueZh}
            </span>
          </div>
          <div className="flex items-baseline gap-6">
            <button
              onClick={onSeeAll}
              className="font-body text-xs transition-opacity hover:opacity-60"
              style={{ color: MUJI.ink, letterSpacing: '0.06em' }}
            >
              所有行程
            </button>
            <span
              className="font-mono text-xs hidden md:inline"
              style={{ color: MUJI.woodSoft }}
            >
              {BRAND.established}
            </span>
          </div>
        </div>
      </header>

      {/* ─────────────── Hero ─────────────── */}
      {/* 不全屏。圖佔左半、文佔右半、上下留白多。 */}
      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
            {/* 左：圖 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              className="md:col-span-7"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={heroTour.heroImage}
                  alt={heroTour.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span
                  className="font-mono text-xs"
                  style={{ color: MUJI.woodSoft }}
                >
                  No. 001
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: MUJI.woodSoft }}
                >
                  {heroTour.destination}
                </span>
              </div>
            </motion.div>

            {/* 右：文 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="md:col-span-5"
            >
              <IndexLabel index="000">Welcome</IndexLabel>
              <h1
                className="font-display mt-8 leading-[1.4] text-3xl md:text-[40px]"
                style={{ color: MUJI.ink, fontWeight: 500 }}
              >
                {BRAND.homeStatement}
              </h1>
              <p
                className="mt-8 text-sm md:text-base leading-[2]"
                style={{ color: MUJI.inkMid, whiteSpace: 'pre-line' }}
              >
                {BRAND.homeStatementSub}
              </p>

              <div className="mt-12 flex items-baseline gap-8">
                <MujiButton onClick={onSeeAll}>
                  看所有行程
                </MujiButton>
                <button
                  onClick={() => onSelectTour(heroTour.slug)}
                  className="font-body text-xs transition-opacity hover:opacity-60"
                  style={{
                    color: MUJI.ink,
                    letterSpacing: '0.06em',
                    textDecoration: 'underline',
                    textUnderlineOffset: 6,
                    textDecorationThickness: 1,
                  }}
                >
                  先看 {heroTour.title}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Statement（兩條線中間） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: MUJI.paperSoft }}
      >
        <div className="mx-auto max-w-3xl">
          <Hair />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="py-20 md:py-24 text-center"
          >
            <IndexLabel index="001" align="center">
              Our Path
            </IndexLabel>
            <p
              className="mt-12 font-display leading-[2] text-xl md:text-2xl"
              style={{
                color: MUJI.ink,
                whiteSpace: 'pre-line',
                fontWeight: 500,
              }}
            >
              {BRAND.ourPath}
            </p>
            <p
              className="mt-16 font-body text-sm leading-[2]"
              style={{ color: MUJI.inkMid }}
            >
              角落旅行社成立於 2018 年。
              <br />
              我們挑剔住宿、堅持小團、領隊全程隨團。
              <br />
              帶你去看的，是那種看完之後，
              <br />
              會在生活裡安靜很久的風景。
            </p>
          </motion.div>
          <Hair />
        </div>
      </section>

      {/* ─────────────── Catalog（4 tour 規則網格） ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 md:mb-20">
            <IndexLabel index="002">Journey Catalog</IndexLabel>
            <SectionTitle level={1} className="mt-6">
              2026 年度精選
            </SectionTitle>
            <p
              className="mt-8 max-w-xl text-sm md:text-base leading-[2]"
              style={{ color: MUJI.inkMid }}
            >
              四條深度路線、四種日常的另一面。
              <br />
              點任一張卡片，看完整故事。
            </p>
          </div>

          <Hair />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x"
            style={{ borderColor: MUJI.line }}
          >
            {tours.map((tour, i) => (
              <CatalogCard
                key={tour.slug}
                tour={tour}
                index={i}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>

          <Hair />

          <div className="mt-12 flex items-baseline justify-between">
            <span
              className="font-mono text-xs"
              style={{ color: MUJI.woodSoft }}
            >
              共 {tours.length} 條 / 持續更新
            </span>
            <button
              onClick={onSeeAll}
              className="font-body text-xs transition-opacity hover:opacity-60"
              style={{
                color: MUJI.ink,
                letterSpacing: '0.06em',
                textDecoration: 'underline',
                textUnderlineOffset: 6,
                textDecorationThickness: 1,
              }}
            >
              查看完整一覽
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────── Values（4 條、左對齊規則網格） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: MUJI.linenSoft }}
      >
        <div className="mx-auto max-w-3xl">
          <IndexLabel index="003">Why Corner</IndexLabel>
          <SectionTitle level={2} className="mt-6">
            為什麼選擇我們
          </SectionTitle>

          <div className="mt-16">
            <Hair color={MUJI.line} />
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                }}
                className="grid grid-cols-[48px_1fr] gap-8 py-10"
                style={{ borderBottom: `1px solid ${MUJI.line}` }}
              >
                <span
                  className="font-mono text-sm"
                  style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
                >
                  {String(v.n).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="font-display text-lg md:text-xl mb-3 leading-snug"
                    style={{ color: MUJI.ink, fontWeight: 500 }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-[2]"
                    style={{ color: MUJI.inkMid }}
                  >
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <IndexLabel index="004" align="center">
            Begin
          </IndexLabel>
          <h2
            className="font-display mt-8 leading-[1.6] text-2xl md:text-3xl"
            style={{ color: MUJI.ink, fontWeight: 500 }}
          >
            把下一個假期，
            <br />
            交給角落。
          </h2>
          <div className="mt-12 flex justify-center">
            <MujiButton size="lg" onClick={onSeeAll}>
              探索全部行程
            </MujiButton>
          </div>
        </div>
      </section>

      <MujiFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Catalog card — 商品 catalog 風縮圖卡
// 對比 mediterranean 的 FeaturedCard：
//   - 圖小（aspect 1:1、不是 4:5）
//   - 卡片無 padding，靠 grid divider 區隔
//   - hover 只用 underline + opacity、不用 scale
// ─────────────────────────────────────────────────────

function CatalogCard({
  tour,
  index,
  onClick,
}: {
  tour: Tour;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
      }}
      className="group text-left p-6 md:p-8 transition-colors hover:bg-white/40"
    >
      <div className="relative aspect-square w-full overflow-hidden mb-6">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-90"
        />
      </div>

      <div className="flex items-baseline justify-between mb-3">
        <span
          className="font-mono text-[10px]"
          style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
        >
          No. {String(index + 1).padStart(3, '0')}
        </span>
        <span
          className="font-mono text-[10px]"
          style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
        >
          {CATEGORY_LABEL[tour.category]}
        </span>
      </div>

      <h3
        className="font-display text-base md:text-lg leading-snug mb-3 transition-all"
        style={{
          color: MUJI.ink,
          fontWeight: 500,
        }}
      >
        <span className="border-b border-transparent group-hover:border-current pb-[2px]">
          {tour.title}
        </span>
      </h3>
      <p
        className="font-body text-xs leading-[1.9] mb-6 line-clamp-2"
        style={{ color: MUJI.inkMid }}
      >
        {tour.subtitle}
      </p>

      <div className="flex items-baseline justify-between pt-4"
        style={{ borderTop: `1px solid ${MUJI.line}` }}
      >
        <span
          className="font-mono text-[10px]"
          style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
        >
          {tour.duration}
        </span>
        <div className="text-right">
          <span
            className="font-mono text-[10px] block"
            style={{ color: MUJI.woodSoft }}
          >
            from
          </span>
          <span
            className="font-display text-sm"
            style={{ color: MUJI.ink, fontWeight: 500 }}
          >
            {formatPrice(tour.priceFrom)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────
// Footer — 無印的 footer 也是節制
// 沒有大色塊、沒有 gradient、就是文字 + 細線
// ─────────────────────────────────────────────────────

export function MujiFooter() {
  return (
    <footer
      className="px-6 md:px-12 pt-20 pb-10"
      style={{
        background: MUJI.paper,
        borderTop: `1px solid ${MUJI.line}`,
        color: MUJI.ink,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <p
              className="font-display text-lg"
              style={{ color: MUJI.ink, fontWeight: 500, letterSpacing: '0.06em' }}
            >
              {BRAND.marque}
            </p>
            <p
              className="font-body text-sm mt-2"
              style={{ color: MUJI.inkMid }}
            >
              {BRAND.marqueZh}
            </p>
            <p
              className="mt-8 font-body text-xs leading-[2] max-w-xs"
              style={{ color: MUJI.inkMid }}
            >
              漫途旅遊旗下品牌
              <br />
              交觀甲 7654 號 / 品保中 1234
            </p>
          </div>
          <div>
            <p
              className="font-mono text-xs mb-4"
              style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
            >
              Contact
            </p>
            <p
              className="font-body text-xs leading-[2]"
              style={{ color: MUJI.ink }}
            >
              台北市信義區
              <br />
              松仁路 28 號 12 樓
              <br />
              02-2345-6789
              <br />
              hello@corner-travel.tw
            </p>
          </div>
          <div>
            <p
              className="font-mono text-xs mb-4"
              style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
            >
              Hours
            </p>
            <p
              className="font-body text-xs leading-[2]"
              style={{ color: MUJI.ink }}
            >
              週一至週五
              <br />
              10:00 – 19:00
              <br />
              週六 11:00 – 17:00
              <br />
              週日休
            </p>
          </div>
        </div>

        <Hair />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p
            className="font-mono text-[10px]"
            style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
          >
            © 2026 Corner Travel · A Venturo Brand
          </p>
          <p
            className="font-mono text-[10px]"
            style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
          >
            Designed in Taipei · Curated Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
