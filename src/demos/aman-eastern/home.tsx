'use client';

/**
 * Home — Aman Eastern landing
 *
 * 結構（極簡、空白為主）：
 *   1. Hero — wordmark 頂部、中央極瘦標、底部極短 scroll cue
 *   2. Statement — 雙語並排品牌宣言、上下大量空白
 *   3. Featured Journeys — 4 條 tour 極簡文字列（無 thumbnail）
 *   4. Values — Solitude / Stillness / Mastery / Restraint 四項
 *   5. CTA + Footer
 *
 * 不堆東西、不裝飾、不秀錢、不喊大聲。
 * 大量 py-32 / py-48、像「網頁看起來空空的」— 這是設計重點。
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  AMAN,
  AmanWordmark,
  AmanButton,
  BilingualTitle,
  QuietLabel,
  QuietLink,
  Hair,
  CenterDivider,
  SmallIndex,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  BRAND,
  VALUES,
} from './shared';

const heroTour = tours[0];

const SLOW_EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div
      style={{ background: AMAN.stone, color: AMAN.ink }}
      className="overflow-hidden"
    >
      <HeroSection onSeeAll={onSeeAll} />
      <StatementSection />
      <FeaturedSection
        onSelectTour={onSelectTour}
        onSeeAll={onSeeAll}
      />
      <ValuesSection />
      <ClosingSection onSeeAll={onSeeAll} />
      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Hero — 上方 wordmark、中央留白、底部極瘦標
// 圖片極淡蒙層、不喧賓奪主
// ─────────────────────────────────────────────────────

function HeroSection({ onSeeAll }: { onSeeAll: () => void }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Image
        src={heroTour.heroImage}
        alt={heroTour.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* 極淡蒙層、讓圖片融進米石白 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(247,244,236,0.45) 0%, rgba(11,9,8,0.18) 40%, rgba(11,9,8,0.55) 100%)',
        }}
      />

      <div className="relative h-screen min-h-[720px] mx-auto max-w-7xl px-6 md:px-16 flex flex-col">
        {/* 頂部 wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: SLOW_EASE }}
          className="pt-16 md:pt-20"
        >
          <AmanWordmark size="md" color={AMAN.stone} />
        </motion.div>

        {/* 中央留白 — 故意 */}
        <div className="flex-1" />

        {/* 底部標題、極瘦、雙語並排 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: SLOW_EASE }}
          className="pb-24 md:pb-32 max-w-3xl"
        >
          <p
            className="font-display text-[11px] md:text-xs mb-10"
            style={{
              color: 'rgba(247,244,236,0.75)',
              letterSpacing: '0.5em',
              fontWeight: 300,
            }}
          >
            CORNER · AMAN EASTERN COLLECTION
          </p>
          <h1
            className="font-display text-[44px] md:text-[88px] leading-[1.05]"
            style={{
              color: AMAN.stone,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            在角落，
            <br />
            留白。
          </h1>
          <p
            className="mt-10 max-w-md text-sm md:text-base leading-[2]"
            style={{ color: 'rgba(247,244,236,0.78)', fontWeight: 300 }}
          >
            We do not promise grand vistas.
            <br />
            We offer the spaces in between.
          </p>

          <div className="mt-16">
            <button
              onClick={onSeeAll}
              className="group inline-flex items-center gap-6 transition-all"
              style={{
                color: AMAN.stone,
                fontWeight: 300,
              }}
            >
              <span
                className="font-display text-[11px]"
                style={{ letterSpacing: '0.4em' }}
              >
                BEGIN
              </span>
              <span
                aria-hidden
                className="block h-px w-10 transition-all duration-500 group-hover:w-20"
                style={{ background: AMAN.stone }}
              />
            </button>
          </div>
        </motion.div>
      </div>

      {/* scroll cue — 極小、底部置中 */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span
          aria-hidden
          className="block w-px h-12"
          style={{ background: 'rgba(247,244,236,0.4)' }}
        />
        <span
          className="font-display text-[9px]"
          style={{
            color: 'rgba(247,244,236,0.6)',
            letterSpacing: '0.5em',
          }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────
// Statement — 雙語並排品牌宣言、上下極大空白
// ─────────────────────────────────────────────────────

function StatementSection() {
  return (
    <section className="px-6 md:px-16 py-32 md:py-48">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: SLOW_EASE }}
        >
          <QuietLabel align="center">PHILOSOPHY</QuietLabel>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, delay: 0.15, ease: SLOW_EASE }}
          className="mt-16 md:mt-20 font-display text-[28px] md:text-[44px] leading-[1.5]"
          style={{
            color: AMAN.ink,
            fontWeight: 250,
            letterSpacing: '0.04em',
          }}
        >
          旅行不在於走得多遠，
          <br />
          而在於停下來時，
          <br />
          能不能聽見一個地方的呼吸。
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="mt-20"
        >
          <CenterDivider />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="mt-20 max-w-xl mx-auto leading-[2.1] text-sm md:text-base"
          style={{ color: AMAN.inkMid, fontWeight: 300 }}
        >
          安縵東方系列，由角落旅行社策劃。
          <br />
          一年僅迎四批客，每團上限十二人。
          <br />
          從踏入玄關至離開玄關，
          <br />
          我們不打擾，不解說，不催促。
        </motion.p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────
// Featured — 4 條 tour 極簡文字列、無 thumbnail
// 像精品酒店的房型清單、純文字 + 細線
// ─────────────────────────────────────────────────────

function FeaturedSection({
  onSelectTour,
  onSeeAll,
}: {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
}) {
  return (
    <section
      className="px-6 md:px-16 py-32 md:py-48"
      style={{ background: AMAN.stoneSoft }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: SLOW_EASE }}
          className="text-center mb-24 md:mb-32"
        >
          <QuietLabel align="center">FOUR JOURNEYS</QuietLabel>
          <h2
            className="mt-12 font-display text-[36px] md:text-[64px] leading-[1.15]"
            style={{
              color: AMAN.ink,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            二〇二六，
            <br />
            四方四境。
          </h2>
        </motion.div>

        <Hair />

        <div>
          {tours.map((tour, i) => (
            <FeaturedRow
              key={tour.slug}
              tour={tour}
              index={i}
              onClick={() => onSelectTour(tour.slug)}
            />
          ))}
        </div>

        <div className="mt-24 md:mt-32 flex justify-center">
          <QuietLink onClick={onSeeAll}>VIEW ALL</QuietLink>
        </div>
      </div>
    </section>
  );
}

function FeaturedRow({
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 1.0,
        delay: index * 0.1,
        ease: SLOW_EASE,
      }}
      className="group w-full text-left py-12 md:py-16 block transition-all duration-500"
      style={{ borderBottom: `1px solid ${AMAN.line}` }}
    >
      <div className="grid grid-cols-12 gap-6 md:gap-12 items-baseline">
        {/* 編號 */}
        <div className="col-span-2 md:col-span-1">
          <SmallIndex n={index + 1} />
        </div>

        {/* category + 標題 */}
        <div className="col-span-10 md:col-span-6">
          <p
            className="font-display text-[10px] mb-4"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.4em',
              fontWeight: 300,
            }}
          >
            {CATEGORY_LABEL_EN[tour.category]} · {CATEGORY_LABEL[tour.category]}
          </p>
          <h3
            className="font-display text-[26px] md:text-[40px] leading-[1.2] transition-all duration-500 group-hover:translate-x-2"
            style={{
              color: AMAN.ink,
              fontWeight: 250,
              letterSpacing: '0.03em',
            }}
          >
            {tour.title}
          </h3>
          <p
            className="mt-4 text-sm md:text-[15px] leading-[1.9]"
            style={{ color: AMAN.inkMid, fontWeight: 300 }}
          >
            {tour.subtitle}
          </p>
        </div>

        {/* 目的地 / 時長 */}
        <div className="col-span-6 md:col-span-3 md:pt-2">
          <p
            className="font-display text-[10px] mb-2"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.35em',
              fontWeight: 300,
            }}
          >
            DESTINATION
          </p>
          <p
            className="font-display text-sm leading-[1.6]"
            style={{ color: AMAN.inkSoft, fontWeight: 300 }}
          >
            {tour.destination}
          </p>
          <p
            className="mt-3 font-display text-[11px]"
            style={{ color: AMAN.inkFaint, fontWeight: 300 }}
          >
            {tour.duration}
          </p>
        </div>

        {/* 價格 */}
        <div className="col-span-6 md:col-span-2 md:pt-2 text-right">
          <p
            className="font-display text-[10px] mb-2"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.35em',
              fontWeight: 300,
            }}
          >
            FROM
          </p>
          <p
            className="font-display text-base md:text-lg"
            style={{ color: AMAN.ink, fontWeight: 300 }}
          >
            {formatPrice(tour.priceFrom)}
          </p>
          <span
            aria-hidden
            className="mt-4 inline-block h-px w-8 transition-all duration-500 group-hover:w-14"
            style={{ background: AMAN.ink }}
          />
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────
// Values — Solitude / Stillness / Mastery / Restraint
// 英文標 + 中文副、極簡四欄、無 icon、無框、純文字
// ─────────────────────────────────────────────────────

function ValuesSection() {
  return (
    <section className="px-6 md:px-16 py-32 md:py-48">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.0, ease: SLOW_EASE }}
          className="text-center mb-24"
        >
          <QuietLabel align="center">FOUR PRINCIPLES</QuietLabel>
          <h2
            className="mt-12 font-display text-[32px] md:text-[52px] leading-[1.2]"
            style={{
              color: AMAN.ink,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            獨處 · 靜止 · 工藝 · 節制
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20 md:gap-y-24">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 1.0,
                delay: i * 0.1,
                ease: SLOW_EASE,
              }}
            >
              <p
                className="font-display text-[10px] mb-6"
                style={{
                  color: AMAN.brassDeep,
                  letterSpacing: '0.45em',
                  fontWeight: 300,
                }}
              >
                — {String(v.n).padStart(2, '0')} —
              </p>
              <h3
                className="font-display text-3xl md:text-4xl mb-3"
                style={{
                  color: AMAN.ink,
                  fontWeight: 250,
                  letterSpacing: '0.04em',
                }}
              >
                {v.en}
              </h3>
              <p
                className="font-display text-base mb-8"
                style={{
                  color: AMAN.earthSoft,
                  fontWeight: 300,
                  letterSpacing: '0.2em',
                }}
              >
                {v.zh}
              </p>
              <p
                className="text-sm leading-[2.05] max-w-md"
                style={{ color: AMAN.inkMid, fontWeight: 300 }}
              >
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────
// Closing — 極短 CTA、不催促
// ─────────────────────────────────────────────────────

function ClosingSection({ onSeeAll }: { onSeeAll: () => void }) {
  return (
    <section
      className="px-6 md:px-16 py-32 md:py-48"
      style={{ background: AMAN.ink, color: AMAN.stone }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: SLOW_EASE }}
        >
          <p
            className="font-display text-[10px] mb-12"
            style={{
              color: 'rgba(191,167,126,0.85)',
              letterSpacing: '0.5em',
              fontWeight: 300,
            }}
          >
            — IN CLOSING —
          </p>
          <h2
            className="font-display text-[32px] md:text-[56px] leading-[1.3]"
            style={{
              color: AMAN.stone,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            一年只有四次
            <br />
            這樣的留白。
          </h2>
          <p
            className="mt-12 text-sm md:text-base leading-[2]"
            style={{ color: 'rgba(247,244,236,0.7)', fontWeight: 300 }}
          >
            Four journeys a year. Twelve guests each.
          </p>
          <div className="mt-20 flex justify-center">
            <AmanButton
              size="lg"
              onClick={onSeeAll}
              style={{
                background: AMAN.stone,
                color: AMAN.ink,
              }}
            >
              VIEW JOURNEYS
            </AmanButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────
// Footer — 極簡、米石白底、深石褐字、無裝飾
// ─────────────────────────────────────────────────────

export function CornerFooter() {
  return (
    <footer
      className="px-6 md:px-16 pt-24 pb-16"
      style={{ background: AMAN.stone, color: AMAN.earth }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <AmanWordmark size="lg" color={AMAN.ink} />
          <p
            className="mt-6 font-display text-[10px]"
            style={{
              color: AMAN.inkFaint,
              letterSpacing: '0.4em',
              fontWeight: 300,
            }}
          >
            ANGLE TRAVEL · CORNER COLLECTION
          </p>
        </div>

        <Hair />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 py-20">
          <div className="text-center md:text-left">
            <p
              className="font-display text-[10px] mb-6"
              style={{
                color: AMAN.brassDeep,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              CORNER
            </p>
            <p
              className="font-display text-base leading-[1.9]"
              style={{ color: AMAN.inkSoft, fontWeight: 300 }}
            >
              角落旅行社
              <br />
              漫途旅遊旗下品牌
            </p>
            <p
              className="mt-4 text-xs leading-[2]"
              style={{ color: AMAN.inkFaint, fontWeight: 300 }}
            >
              交觀甲 7654 號
              <br />
              品保中 1234
            </p>
          </div>
          <div className="text-center md:text-left">
            <p
              className="font-display text-[10px] mb-6"
              style={{
                color: AMAN.brassDeep,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              CONTACT
            </p>
            <p
              className="text-sm leading-[2]"
              style={{ color: AMAN.inkSoft, fontWeight: 300 }}
            >
              台北市信義區松仁路 28 號 12 樓
              <br />
              02 2345 6789
              <br />
              eastern@corner-travel.tw
            </p>
          </div>
          <div className="text-center md:text-left">
            <p
              className="font-display text-[10px] mb-6"
              style={{
                color: AMAN.brassDeep,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              HOURS
            </p>
            <p
              className="text-sm leading-[2]"
              style={{ color: AMAN.inkSoft, fontWeight: 300 }}
            >
              週一至週五 10:00 – 19:00
              <br />
              週六 11:00 – 17:00
              <br />
              週日休
            </p>
          </div>
        </div>

        <Hair />

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="font-display text-[10px]"
            style={{
              color: AMAN.inkFaint,
              letterSpacing: '0.35em',
              fontWeight: 300,
            }}
          >
            © 2026 CORNER · A VENTURO BRAND
          </p>
          <p
            className="font-display text-[10px]"
            style={{
              color: AMAN.inkFaint,
              letterSpacing: '0.35em',
              fontWeight: 300,
            }}
          >
            DESIGNED IN TAIPEI · CURATED EASTWARD
          </p>
        </div>
      </div>
    </footer>
  );
}
