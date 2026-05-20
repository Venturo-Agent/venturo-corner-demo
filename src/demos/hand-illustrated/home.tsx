'use client';

/**
 * Home — 手繪插畫 landing view
 *
 * 結構（Wes Anderson 對稱）：
 *   1. Top bar — 對稱品牌條
 *   2. Hero — 中央大插畫「角落 ✈ Travel」+ 左右對稱 SVG + 復古海報感
 *   3. Manifesto — 「每段旅程都值得被插畫」品牌 statement
 *   4. Postcard grid — 4 條 tour 像並排明信片牆、每張郵戳不同
 *   5. House Rules — 品牌價值（4 條、印章感）
 *   6. CTA — 大字海報感
 *   7. Footer
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  PAPER,
  PaperGrain,
  PaperNoise,
  SectionLabel,
  PosterTitle,
  PaperButton,
  PostcardFrame,
  PostageStamp,
  PostmarkLine,
  HandwrittenLine,
  HairLine,
  SymmetricRow,
  MonoCaption,
  NumberMark,
  Airplane,
  Suitcase,
  Passport,
  Train,
  Globe,
  Compass,
  FlyingBirds,
  StarFilled,
  CATEGORY_LABEL,
  CATEGORY_STAMP,
  CATEGORY_FLAG,
  CategoryIcon,
} from './shared';

const heroTour = tours[0];

// 品牌「四條家規」— 像復古海報「住宿守則」
const HOUSE_RULES = [
  {
    n: 1,
    title: '一切親自走過、再寫進筆記本',
    body: '每條行程、團領隊都實地走過一遍以上。住的旅館、吃的餐廳、看的風景、走的步道 — 沒有試過、不會推薦給你。',
    stamp: { top: 'RULE · 01', bottom: 'WALKED · BY · HAND' },
  },
  {
    n: 2,
    title: '小團 14 人為上限、不開大團',
    body: '一輛中巴的舒適距離、一個領隊照顧得來的人數、一個餐廳能容納的私密包廂。大於 14、品味就會崩。',
    stamp: { top: 'RULE · 02', bottom: 'SMALL · IS · BEAUTIFUL' },
  },
  {
    n: 3,
    title: '不打卡、不趕場、不集體照相',
    body: '我們設計的不是觀光路線、是給有品味旅人的私房地圖。每天最多三個主要 stop、其餘留給散步、發呆、寫日記。',
    stamp: { top: 'RULE · 03', bottom: 'NO · RUSH · ALLOWED' },
  },
  {
    n: 4,
    title: '回家後我們寄一本插畫筆記',
    body: '旅程結束、我們為你印一本 A5 大小的旅行筆記 — 含手繪地圖、餐廳清單、住宿剪影、空白頁讓你自己寫。寄到你家信箱。',
    stamp: { top: 'RULE · 04', bottom: 'PRINTED · IN · TAIPEI' },
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div style={{ background: PAPER.cream, color: PAPER.ink }}>
      {/* ─────────────── Top bar — 對稱品牌條 ─────────────── */}
      <header
        className="relative px-6 md:px-12 py-5"
        style={{
          background: PAPER.cream,
          borderBottom: `1.5px solid ${PAPER.ink}`,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass size={26} color={PAPER.ink} />
            <span
              className="font-display text-base tracking-[0.4em] uppercase"
              style={{ color: PAPER.ink, fontWeight: 600 }}
            >
              Corner
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <MonoCaption>Nº 014 / Hand · Illustrated</MonoCaption>
            <span style={{ color: PAPER.ink, opacity: 0.4 }}>·</span>
            <MonoCaption>Edition · 2026</MonoCaption>
          </div>

          <div className="flex items-center gap-3">
            <MonoCaption color={PAPER.tomatoDeep}>Est · 2026</MonoCaption>
          </div>
        </div>
      </header>

      {/* ─────────────── Hero — Wes Anderson 對稱 ─────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: PAPER.cream }}
      >
        <PaperGrain opacity={0.5} />

        <div className="relative mx-auto max-w-6xl px-6 md:px-12 pt-20 md:pt-28 pb-24 md:pb-32 text-center">
          {/* 上方對稱 SVG */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end justify-center gap-12 md:gap-20 mb-12"
          >
            <Train size={120} color={PAPER.ink} stroke={1.3} />
            <div className="hidden md:flex flex-col items-center gap-2">
              <FlyingBirds size={56} color={PAPER.ink} />
            </div>
            <div className="scale-x-[-1]">
              <Airplane size={120} color={PAPER.ink} stroke={1.3} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SectionLabel align="center" color={PAPER.tomatoDeep}>
              Corner Travel · 一本手繪旅行筆記
            </SectionLabel>
          </motion.div>

          {/* 大標 — 用 Atomic Age design 上下橫線包夾 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 mb-10"
          >
            <div className="mx-auto max-w-3xl">
              <HairLine variant="double" color={PAPER.ink} />
              <div className="py-10 md:py-14">
                <PosterTitle size="lg" className="text-center">
                  <span style={{ color: PAPER.ink }}>角落旅行</span>
                </PosterTitle>
                <div className="mt-6 flex items-center justify-center gap-6 md:gap-10">
                  <HairLine variant="single" color={PAPER.tomatoDeep} className="w-16 md:w-32" />
                  <span
                    className="font-display text-2xl md:text-4xl tracking-[0.32em]"
                    style={{
                      color: PAPER.tomatoDeep,
                      fontWeight: 500,
                      fontStyle: 'normal',
                    }}
                  >
                    PAR AVION
                  </span>
                  <HairLine variant="single" color={PAPER.tomatoDeep} className="w-16 md:w-32" />
                </div>
              </div>
              <HairLine variant="double" color={PAPER.ink} />
            </div>
          </motion.div>

          {/* 副標 */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5 }}
            className="mx-auto max-w-2xl font-display text-lg md:text-2xl leading-[1.65]"
            style={{ color: PAPER.ink, fontWeight: 400 }}
          >
            一本給有品味的年輕旅人翻的書。
            <br />
            每段旅程都值得被畫下來、被寫下來、被裝訂進你的書架上。
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 flex items-center justify-center"
          >
            <MonoCaption>
              Nº 0148 · Hand · Illustrated · Vol · I
            </MonoCaption>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <PaperButton size="lg" onClick={onSeeAll}>
              翻開明信片牆
            </PaperButton>
            <PaperButton
              size="lg"
              variant="outline"
              onClick={() => onSelectTour(heroTour.slug)}
            >
              先讀京都這篇
            </PaperButton>
          </motion.div>

          {/* 下方對稱 SVG（地球儀 + 護照 + 行李） */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1 }}
            className="mt-20 md:mt-24"
          >
            <SymmetricRow
              left={<Suitcase size={72} color={PAPER.ink} stroke={1.3} />}
              center={
                <div className="flex flex-col items-center gap-4">
                  <Globe size={96} color={PAPER.ink} stroke={1.3} />
                  <MonoCaption color={PAPER.lavender}>
                    Taipei · Kyoto · Queenstown · Soneva · Tromsø
                  </MonoCaption>
                </div>
              }
              right={<Passport size={64} color={PAPER.ink} stroke={1.3} />}
            />
          </motion.div>
        </div>

        {/* 底部分隔 — 對稱雙線 */}
        <div className="relative px-6 md:px-12 pb-10">
          <div className="mx-auto max-w-6xl">
            <HairLine variant="double" color={PAPER.ink} />
          </div>
        </div>
      </section>

      {/* ─────────────── Manifesto — 中央對稱品牌 statement ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden"
        style={{ background: PAPER.parchment }}
      >
        <PaperGrain opacity={0.3} />

        <div className="relative mx-auto max-w-5xl text-center">
          <SectionLabel align="center" color={PAPER.lavenderDeep}>
            Our · Manifesto
          </SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-display leading-[1.18] text-[32px] md:text-[52px]"
            style={{
              color: PAPER.ink,
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            每一段旅程都值得
            <br />
            <span style={{ color: PAPER.tomatoDeep }}>被插畫家畫下來</span>。
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="mx-auto mt-8 w-full max-w-md"
          >
            <HandwrittenLine width={400} color={PAPER.tomatoDeep} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="mt-12 mx-auto max-w-3xl font-display text-lg md:text-xl leading-[2]"
            style={{ color: PAPER.inkSoft, fontWeight: 400 }}
          >
            角落不是大型旅行社。我們是一群偏執的編輯、攝影師、插畫家、領隊、
            把每條行程當成一本書在編。會去的旅館、會吃的餐廳、會走的步道、
            會寫進筆記本的瞬間 — 我們都親手挑過。
          </motion.p>

          {/* 三層對稱資料 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.4 }}
            className="mt-20"
          >
            <HairLine variant="double" color={PAPER.ink} />
            <div className="py-10 grid grid-cols-3 gap-6 md:gap-10">
              <Stat n="74" caption="本旅程被印成書" />
              <Stat n="1,486" caption="次親自踩點" />
              <Stat n="98%" caption="二次回訪率" />
            </div>
            <HairLine variant="double" color={PAPER.ink} />
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Postcard wall — 4 條 tour 像明信片並排 ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden"
        style={{ background: PAPER.cream }}
      >
        <PaperGrain opacity={0.35} />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <SectionLabel align="center" color={PAPER.tomatoDeep}>
              Postcard · Wall
            </SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85 }}
              className="mt-10 font-display uppercase text-[36px] md:text-[64px] leading-[1.05]"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              四張寄回來的明信片
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 mx-auto max-w-2xl font-display text-base md:text-lg leading-[1.95]"
              style={{ color: PAPER.inkSoft }}
            >
              從千年京都、紐西蘭南島、印度洋環礁、到北極圈下的綠光 —
              <br />
              翻看哪一張、會讓你的 2026 開始有畫面。
            </motion.p>
          </div>

          {/* 明信片牆 — 2x2 grid、每張不同 rotate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {tours.map((tour, i) => (
              <PostcardTour
                key={tour.slug}
                tour={tour}
                index={i}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <PaperButton variant="outline" size="lg" onClick={onSeeAll}>
              看完全部明信片牆
            </PaperButton>
          </div>
        </div>
      </section>

      {/* ─────────────── House Rules — 4 條品牌價值（印章感）─────────────── */}
      <section
        className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden"
        style={{ background: PAPER.creamWarm }}
      >
        <PaperGrain opacity={0.3} />
        <PaperNoise opacity={0.04} />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <SectionLabel align="center" color={PAPER.lavenderDeep}>
              House · Rules
            </SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85 }}
              className="mt-10 font-display uppercase text-[36px] md:text-[64px] leading-[1.05]"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              編輯室的四條家規
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {HOUSE_RULES.map((r, i) => (
              <RuleCard key={r.n} rule={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA — 大字海報感 ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-32 md:py-40 overflow-hidden"
        style={{ background: PAPER.ink }}
      >
        <PaperNoise opacity={0.12} />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* 對稱裝飾 */}
          <div className="flex items-center justify-center gap-10 md:gap-14 mb-12">
            <Airplane size={80} color={PAPER.cream} stroke={1.3} />
            <Globe size={72} color={PAPER.tomato} stroke={1.3} />
            <div className="scale-x-[-1]">
              <Airplane size={80} color={PAPER.cream} stroke={1.3} />
            </div>
          </div>

          <SectionLabel align="center" color={PAPER.tomatoLight}>
            Take · Off
          </SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85 }}
            className="mt-10 font-display uppercase leading-[1.05] text-[44px] md:text-[88px]"
            style={{
              color: PAPER.cream,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            開始畫
            <br />
            你的 <span style={{ color: PAPER.tomato }}>2026</span>
          </motion.h2>

          <p
            className="mt-10 mx-auto max-w-xl font-display text-base md:text-lg leading-[1.95]"
            style={{ color: 'rgba(252,242,226,0.8)' }}
          >
            一條行程、一本筆記、一段值得寫進你書架的旅程。
          </p>

          <div className="mt-14">
            <PaperButton size="lg" variant="inverse" onClick={onSeeAll}>
              翻開明信片牆 →
            </PaperButton>
          </div>
        </div>
      </section>

      <IllustratedFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Postcard tour — 復古明信片樣式（含郵戳 + 國旗 + 出發日章）
// ─────────────────────────────────────────────────────

function PostcardTour({
  tour,
  index,
  onClick,
}: {
  tour: Tour;
  index: number;
  onClick: () => void;
}) {
  const stamp = CATEGORY_STAMP[tour.category];
  const flag = CATEGORY_FLAG[tour.category];
  const rotate = index % 2 === 0 ? -0.8 : 0.8;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.85,
        delay: (index % 2) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, rotate: 0 }}
      className="text-left group block w-full"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <PostcardFrame bg={PAPER.creamLight}>
        {/* 上半 — image */}
        <div className="relative aspect-[4/3]">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover grayscale-[15%] transition-all duration-700 group-hover:grayscale-0"
          />
          {/* 灰玻璃覆膜 — 復古海報感 */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(232,155,77,0.08) 0%, rgba(47,34,53,0.18) 100%)',
            }}
          />
          {/* 國旗（右上） */}
          <div
            className="absolute top-4 right-4 px-3 py-1.5"
            style={{
              background: PAPER.creamLight,
              border: `1.5px solid ${PAPER.ink}`,
            }}
          >
            <span
              className="font-display text-base"
              style={{ letterSpacing: '0.1em' }}
            >
              {flag}
            </span>
          </div>
          {/* 標號（左下） */}
          <div
            className="absolute bottom-4 left-4 px-3 py-1.5"
            style={{
              background: PAPER.ink,
              color: PAPER.cream,
            }}
          >
            <MonoCaption color={PAPER.cream}>
              Nº {String(index + 1).padStart(3, '0')} · {stamp.code}
            </MonoCaption>
          </div>
        </div>

        {/* 下半 — postcard 內容（左文 + 右郵戳） */}
        <div
          className="relative px-7 md:px-9 py-8"
          style={{
            background: PAPER.creamLight,
            borderTop: `1.5px solid ${PAPER.ink}`,
          }}
        >
          <PaperGrain opacity={0.25} />

          <div className="relative grid grid-cols-[1fr_auto] gap-6 items-start">
            <div>
              <MonoCaption color={PAPER.tomatoDeep}>
                {CATEGORY_LABEL[tour.category]}
              </MonoCaption>
              <h3
                className="mt-3 font-display uppercase leading-[1.1] text-[22px] md:text-[28px]"
                style={{
                  color: PAPER.ink,
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                }}
              >
                {tour.title}
              </h3>
              <p
                className="mt-3 font-display text-sm md:text-base leading-[1.75]"
                style={{ color: PAPER.inkSoft }}
              >
                {tour.subtitle}
              </p>

              <div className="mt-5">
                <PostmarkLine width={180} height={16} color={PAPER.ink} />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <MonoCaption>From · 起 · 程</MonoCaption>
                  <p
                    className="font-display text-xl mt-1"
                    style={{ color: PAPER.ink, fontWeight: 500 }}
                  >
                    {formatPrice(tour.priceFrom)}
                  </p>
                </div>
                <div>
                  <MonoCaption>Days</MonoCaption>
                  <p
                    className="font-display text-base mt-1"
                    style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
                  >
                    {tour.duration}
                  </p>
                </div>
              </div>
            </div>

            {/* 右側郵戳 */}
            <div className="hidden md:block shrink-0">
              <PostageStamp
                size={120}
                topText={stamp.top}
                bottomText={stamp.bottom}
                rotate={index % 2 === 0 ? -6 : 8}
                center={<CategoryIcon category={tour.category} size={36} color={PAPER.ink} />}
              />
            </div>
          </div>

          {/* 翻開提示 */}
          <div
            className="mt-7 pt-5 flex items-center justify-between"
            style={{ borderTop: `1px dashed ${PAPER.line}` }}
          >
            <MonoCaption color={PAPER.lavenderDeep}>
              寫於 · {tour.destination}
            </MonoCaption>
            <span
              className="font-display text-xs tracking-[0.3em] uppercase transition-all group-hover:tracking-[0.4em]"
              style={{ color: PAPER.ink, fontWeight: 500 }}
            >
              翻面 →
            </span>
          </div>
        </div>
      </PostcardFrame>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────
// Stat — 中央對稱統計
// ─────────────────────────────────────────────────────

function Stat({ n, caption }: { n: string; caption: string }) {
  return (
    <div className="text-center">
      <p
        className="font-display text-4xl md:text-6xl"
        style={{
          color: PAPER.ink,
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        {n}
      </p>
      <div className="mt-3 flex justify-center">
        <HandwrittenLine width={80} color={PAPER.tomatoDeep} thickness={1.2} />
      </div>
      <p
        className="mt-3 font-display text-xs md:text-sm tracking-[0.2em] uppercase"
        style={{ color: PAPER.inkSoft, fontWeight: 500 }}
      >
        {caption}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// RuleCard — 「House Rule」印章感卡片
// ─────────────────────────────────────────────────────

function RuleCard({
  rule,
  index,
}: {
  rule: (typeof HOUSE_RULES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative p-8 md:p-10"
      style={{
        background: PAPER.creamLight,
        border: `1.5px solid ${PAPER.ink}`,
        outline: `1px solid ${PAPER.ink}`,
        outlineOffset: '6px',
      }}
    >
      <PaperGrain opacity={0.2} />

      <div className="relative">
        {/* 大號 + 印章對稱排版 */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <MonoCaption color={PAPER.tomatoDeep}>House · Rule</MonoCaption>
            <div className="mt-2">
              <NumberMark n={rule.n} size="lg" color={PAPER.ink} />
            </div>
          </div>
          <PostageStamp
            size={88}
            topText={rule.stamp.top}
            bottomText={rule.stamp.bottom}
            rotate={index % 2 === 0 ? -8 : 6}
            center={<StarFilled size={20} color={PAPER.ink} />}
          />
        </div>

        <HairLine variant="dashed" color={PAPER.ink} />

        <h3
          className="mt-8 font-display uppercase leading-[1.2] text-xl md:text-2xl"
          style={{
            color: PAPER.ink,
            fontWeight: 500,
            letterSpacing: '0.01em',
          }}
        >
          {rule.title}
        </h3>

        <p
          className="mt-5 font-display text-base leading-[1.95]"
          style={{ color: PAPER.inkSoft }}
        >
          {rule.body}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────
// Footer — 復古海報底欄
// ─────────────────────────────────────────────────────

export function IllustratedFooter() {
  return (
    <footer
      className="relative px-6 md:px-12 py-20 md:py-24 overflow-hidden"
      style={{ background: PAPER.creamDeep }}
    >
      <PaperGrain opacity={0.25} />

      <div className="relative mx-auto max-w-7xl">
        {/* 對稱裝飾 */}
        <div className="flex items-center justify-center gap-10 md:gap-16 mb-12">
          <Compass size={48} color={PAPER.ink} />
          <span
            className="font-display text-3xl md:text-5xl tracking-[0.3em]"
            style={{ color: PAPER.ink, fontWeight: 500 }}
          >
            CORNER
          </span>
          <Compass size={48} color={PAPER.ink} />
        </div>

        <HairLine variant="double" color={PAPER.ink} />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 py-12">
          <div>
            <MonoCaption color={PAPER.tomatoDeep}>About · Us</MonoCaption>
            <p
              className="mt-5 font-display text-sm leading-[1.95]"
              style={{ color: PAPER.ink }}
            >
              角落旅行社・手繪插畫系列
              <br />
              漫途旅遊旗下品牌
              <br />
              交觀甲 7654 號 / 品保中 1234
            </p>
          </div>

          <div>
            <MonoCaption color={PAPER.tomatoDeep}>Contact</MonoCaption>
            <p
              className="mt-5 font-display text-sm leading-[1.95]"
              style={{ color: PAPER.ink }}
            >
              台北市信義區松仁路 28 號 12 樓
              <br />
              02-2345-6789
              <br />
              illustrated@corner-travel.tw
            </p>
          </div>

          <div>
            <MonoCaption color={PAPER.tomatoDeep}>Hours</MonoCaption>
            <p
              className="mt-5 font-display text-sm leading-[1.95]"
              style={{ color: PAPER.ink }}
            >
              週一至週五 11:00 — 19:00
              <br />
              週六 13:00 — 17:00
              <br />
              週日不接電話、回 email
            </p>
          </div>

          <div>
            <MonoCaption color={PAPER.tomatoDeep}>Edition</MonoCaption>
            <p
              className="mt-5 font-display text-sm leading-[1.95]"
              style={{ color: PAPER.ink }}
            >
              Hand · Illustrated · Vol · I
              <br />
              Edition · 2026
              <br />
              Printed in Taipei
            </p>
          </div>
        </div>

        <HairLine variant="double" color={PAPER.ink} />

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <MonoCaption>
            © 2026 Corner Travel · Hand · Illustrated Edition · A Venturo Brand
          </MonoCaption>
          <div className="flex items-center gap-3">
            <StarFilled size={10} color={PAPER.tomatoDeep} />
            <MonoCaption color={PAPER.lavenderDeep}>
              Written · Drawn · Posted from Taipei
            </MonoCaption>
            <StarFilled size={10} color={PAPER.tomatoDeep} />
          </div>
        </div>
      </div>
    </footer>
  );
}
