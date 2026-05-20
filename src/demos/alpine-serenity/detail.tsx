'use client';

/**
 * Detail — tour 詳情頁（阿爾卑斯靜謐）
 *
 * 跟 mediterranean detail 對比：
 *   1. Hero 全寬黑底圖、極簡座標條取代分類膠囊
 *   2. Story 段落改「左 quote + 右段落」、不是兩排 grid
 *   3. Gallery 改 4 張等寬細網格、不是大圖 + 小圖不對稱
 *   4. Highlights 用「左座標 + 右標題」、無底色 box、純線條分隔
 *   5. Inclusions / Exclusions 改為「左 check/x 圖示 + 右文字」、無 box 框
 *   6. Departure dates 改為極簡 list、不是膠囊 grid
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Mountain,
  Compass,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  ALPINE,
  PeakLabel,
  AlpineButton,
  HairLine,
  CATEGORY_LABEL,
  SerifTitle,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  tour: Tour;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onSeeItinerary: () => void;
  onSignup: () => void;
  onBack: () => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DetailView({
  tour,
  selectedDate,
  onSelectDate,
  onSeeItinerary,
  onSignup,
  onBack,
}: Props) {
  return (
    <div style={{ background: ALPINE.snow, color: ALPINE.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section
        className="relative w-full"
        style={{ background: ALPINE.night }}
      >
        <div className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'grayscale(0.35) brightness(0.78) contrast(1.05)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(26,36,51,0.6) 0%, rgba(26,36,51,0.25) 38%, rgba(26,36,51,0.78) 100%)',
            }}
          />

          {/* 邊框 */}
          <div
            aria-hidden
            className="absolute inset-6 md:inset-12 pointer-events-none"
            style={{ border: `1px solid rgba(248,249,251,0.18)` }}
          />

          <div className="relative h-full mx-auto max-w-7xl px-10 md:px-20 flex flex-col">
            {/* back */}
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              onClick={onBack}
              className="mt-20 self-start flex items-center gap-4 font-display text-[10px] tracking-[0.45em] uppercase transition-opacity hover:opacity-70"
              style={{ color: ALPINE.snow, fontWeight: 400 }}
            >
              <ArrowLeft size={13} strokeWidth={1.2} />
              返回所有行程
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: EASE }}
              className="mt-auto pb-20 md:pb-28 max-w-4xl"
            >
              {/* 座標條：N XX  ·  destination  ·  category */}
              <div className="flex items-center gap-8 mb-10">
                <span
                  className="font-mono text-[11px] tracking-[0.3em]"
                  style={{ color: 'rgba(248,249,251,0.85)' }}
                >
                  Journey  ·  {tour.id.slice(0, 3).toUpperCase()}
                </span>
                <span
                  aria-hidden
                  className="block w-8 h-px"
                  style={{ background: 'rgba(248,249,251,0.4)' }}
                />
                <span
                  className="font-display text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: 'rgba(248,249,251,0.85)', fontWeight: 400 }}
                >
                  {CATEGORY_LABEL[tour.category]}
                </span>
                <span
                  aria-hidden
                  className="hidden md:block w-8 h-px"
                  style={{ background: 'rgba(248,249,251,0.4)' }}
                />
                <span
                  className="hidden md:inline font-display text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: 'rgba(248,249,251,0.85)', fontWeight: 400 }}
                >
                  {tour.destination}
                </span>
              </div>

              <h1
                className="font-display leading-[1.02] text-[44px] md:text-[88px]"
                style={{
                  color: ALPINE.snow,
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                }}
              >
                {tour.title}
              </h1>

              <p
                className="mt-10 max-w-xl text-[16px] md:text-[18px] leading-[1.95]"
                style={{ color: 'rgba(248,249,251,0.85)' }}
              >
                {tour.tagline}
              </p>
            </motion.div>

            {/* 底部 meta 條 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 1.2 }}
              className="absolute bottom-12 md:bottom-16 left-10 md:left-20 right-10 md:right-20"
            >
              <div
                className="h-px w-full mb-8"
                style={{ background: 'rgba(248,249,251,0.25)' }}
              />
              <div className="flex flex-wrap items-end justify-between gap-y-6">
                <HeroStat label="Duration" value={tour.duration} />
                <HeroStat
                  label="Group Size"
                  value={`${tour.groupSize.min}–${tour.groupSize.max} pax`}
                />
                <HeroStat
                  label="Departures"
                  value={`${tour.departureDates.length} dates`}
                />
                <div className="text-right">
                  <span
                    className="font-display text-[9px] tracking-[0.5em] uppercase block mb-2"
                    style={{
                      color: 'rgba(248,249,251,0.55)',
                      fontWeight: 400,
                    }}
                  >
                    From / Per Person
                  </span>
                  <span
                    className="font-mono text-2xl md:text-3xl tracking-wider"
                    style={{ color: ALPINE.snow, fontWeight: 300 }}
                  >
                    {formatPrice(tour.priceFrom)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Story ─────────────── */}
      <section className="px-10 md:px-20 py-32 md:py-44">
        <div className="mx-auto max-w-6xl">
          <PeakLabel>The Story</PeakLabel>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-5">
              <SerifTitle
                as="h2"
                className="text-[32px] md:text-[48px] leading-[1.25]"
              >
                這趟旅行
                <br />
                關於什麼
              </SerifTitle>
              <div
                className="h-px w-12 mt-12"
                style={{ background: ALPINE.stone }}
              />
            </div>

            <div className="md:col-span-7">
              <p
                className="text-[16px] md:text-[18px] leading-[2.1]"
                style={{ color: ALPINE.inkSoft }}
              >
                {tour.story}
              </p>

              {/* features 線條條目 */}
              <div className="mt-16">
                <HairLine />
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8">
                  {tour.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className="block w-1 h-1 mt-[10px] shrink-0"
                        style={{ background: ALPINE.stone }}
                      />
                      <span
                        className="text-[13px] leading-relaxed"
                        style={{ color: ALPINE.ink }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Gallery（4 張等寬細網格、不對稱裁切）─────────────── */}
      <section className="px-10 md:px-20 pb-32 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 md:row-span-2 relative aspect-[5/4] md:aspect-auto md:min-h-[560px]">
              <Image
                src={tour.galleryImages[0]}
                alt={`${tour.title} 風景`}
                fill
                sizes="(min-width: 768px) 65vw, 100vw"
                className="object-cover"
                style={{ filter: 'grayscale(0.15) brightness(0.96)' }}
              />
            </div>
            <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto md:min-h-[270px]">
              <Image
                src={tour.galleryImages[1]}
                alt={`${tour.title} 風景`}
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                className="object-cover"
                style={{ filter: 'grayscale(0.15) brightness(0.96)' }}
              />
            </div>
            <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto md:min-h-[270px]">
              <Image
                src={tour.galleryImages[2]}
                alt={`${tour.title} 風景`}
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                className="object-cover"
                style={{ filter: 'grayscale(0.15) brightness(0.96)' }}
              />
            </div>
            <div className="md:col-span-12 relative aspect-[16/6]">
              <Image
                src={tour.galleryImages[3]}
                alt={`${tour.title} 風景`}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ filter: 'grayscale(0.15) brightness(0.96)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights（左序號 + 右標題、純線分隔）─────────────── */}
      <section
        className="px-10 md:px-20 py-32 md:py-44"
        style={{ background: ALPINE.snowDeep }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-20">
            <PeakLabel>Highlights</PeakLabel>
            <SerifTitle
              as="h2"
              className="text-[36px] md:text-[56px] mt-10"
            >
              此團精華
            </SerifTitle>
          </div>

          <div>
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: EASE,
                }}
                className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-baseline"
                style={{
                  borderTop: `1px solid ${ALPINE.line}`,
                  borderBottom:
                    i === tour.highlights.length - 1
                      ? `1px solid ${ALPINE.line}`
                      : 'none',
                }}
              >
                <div className="md:col-span-2 flex items-center gap-4">
                  <span
                    className="font-mono text-[11px] tracking-[0.3em]"
                    style={{ color: ALPINE.stone }}
                  >
                    N {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <SerifTitle
                    as="h3"
                    className="text-xl md:text-[26px] leading-[1.4]"
                  >
                    {h}
                  </SerifTitle>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section className="px-10 md:px-20 py-32 md:py-44">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20">
            <PeakLabel>What&apos;s Included</PeakLabel>
            <SerifTitle
              as="h2"
              className="text-[36px] md:text-[56px] mt-10"
            >
              費用涵蓋
            </SerifTitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <Check
                  size={16}
                  strokeWidth={1.2}
                  style={{ color: ALPINE.stone }}
                />
                <span
                  className="font-display text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: ALPINE.stone, fontWeight: 400 }}
                >
                  Included
                </span>
              </div>
              <div>
                {tour.inclusions.map((item, i) => (
                  <div
                    key={i}
                    className="py-5 grid grid-cols-[40px_1fr] gap-4 items-baseline"
                    style={{
                      borderTop: `1px solid ${ALPINE.line}`,
                      borderBottom:
                        i === tour.inclusions.length - 1
                          ? `1px solid ${ALPINE.line}`
                          : 'none',
                    }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.3em]"
                      style={{ color: ALPINE.stone }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="text-[14px] leading-[1.95]"
                      style={{ color: ALPINE.ink }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-10">
                <X
                  size={16}
                  strokeWidth={1.2}
                  style={{ color: ALPINE.inkFaint }}
                />
                <span
                  className="font-display text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                >
                  Excluded
                </span>
              </div>
              <div>
                {tour.exclusions.map((item, i) => (
                  <div
                    key={i}
                    className="py-5 grid grid-cols-[40px_1fr] gap-4 items-baseline"
                    style={{
                      borderTop: `1px solid ${ALPINE.line}`,
                      borderBottom:
                        i === tour.exclusions.length - 1
                          ? `1px solid ${ALPINE.line}`
                          : 'none',
                    }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.3em]"
                      style={{ color: ALPINE.inkFaint }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="text-[14px] leading-[1.95]"
                      style={{ color: ALPINE.inkSoft }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Departure Dates（極簡 list）─────────────── */}
      <section
        className="px-10 md:px-20 py-32 md:py-44"
        style={{ background: ALPINE.snowDeep }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end mb-16">
            <div className="md:col-span-7">
              <PeakLabel>Departure Dates</PeakLabel>
              <SerifTitle
                as="h2"
                className="text-[36px] md:text-[56px] mt-10"
              >
                出團日期
              </SerifTitle>
            </div>
            <div className="md:col-span-5 md:pb-4">
              <p
                className="text-[15px] leading-[2.1]"
                style={{ color: ALPINE.inkSoft }}
              >
                選擇你想出發的日期、我們會根據出團狀況回覆名額與最終定價。
              </p>
            </div>
          </div>

          {/* 日期 row list、不是膠囊 */}
          <div>
            {tour.departureDates.map((date, i) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="w-full text-left transition-colors py-7 md:py-9 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center"
                  style={{
                    borderTop: `1px solid ${ALPINE.line}`,
                    borderBottom:
                      i === tour.departureDates.length - 1
                        ? `1px solid ${ALPINE.line}`
                        : 'none',
                    background: active ? ALPINE.snow : 'transparent',
                  }}
                >
                  <div className="md:col-span-2 flex items-center gap-4">
                    <span
                      className="font-mono text-[11px] tracking-[0.3em]"
                      style={{
                        color: active ? ALPINE.night : ALPINE.stone,
                      }}
                    >
                      N {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="md:col-span-5">
                    <SerifTitle
                      as="h3"
                      className="text-2xl md:text-[28px]"
                      color={active ? ALPINE.night : ALPINE.ink}
                    >
                      {formatDate(date)}
                    </SerifTitle>
                  </div>

                  <div className="md:col-span-3">
                    <span
                      className="font-display text-[10px] tracking-[0.45em] uppercase"
                      style={{
                        color: active ? ALPINE.night : ALPINE.inkFaint,
                        fontWeight: 400,
                      }}
                    >
                      尚有名額
                    </span>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end gap-4">
                    <span
                      className="font-display text-[10px] tracking-[0.45em] uppercase"
                      style={{
                        color: active ? ALPINE.night : ALPINE.stone,
                        fontWeight: 400,
                      }}
                    >
                      {active ? '已選' : '選擇'}
                    </span>
                    <span
                      aria-hidden
                      className="block transition-all"
                      style={{
                        width: active ? 32 : 16,
                        height: 1,
                        background: active ? ALPINE.night : ALPINE.line,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="px-10 md:px-20 py-40 md:py-56">
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="block w-px h-20 mx-auto mb-16"
            style={{ background: ALPINE.stone }}
          />
          <PeakLabel align="center">Next Step</PeakLabel>
          <SerifTitle
            as="h2"
            className="text-[32px] md:text-[52px] mt-12 leading-[1.3]"
          >
            準備好了嗎
          </SerifTitle>
          <p
            className="mt-10 max-w-md mx-auto text-[15px] leading-[2.1]"
            style={{ color: ALPINE.inkSoft }}
          >
            先看一次完整 {tour.itinerary.length} 天日程、確認每一天去哪、住哪、吃什麼、再決定報名。
          </p>

          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AlpineButton size="lg" variant="outline" onClick={onSeeItinerary}>
              查看詳細日程
            </AlpineButton>
            <AlpineButton size="lg" onClick={onSignup}>
              立即報名
            </AlpineButton>
          </div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Hero stat 小元件
// ─────────────────────────────────────────────────────

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="font-display text-[9px] tracking-[0.5em] uppercase"
        style={{ color: 'rgba(248,249,251,0.55)', fontWeight: 400 }}
      >
        {label}
      </span>
      <span
        className="font-mono text-base md:text-lg tracking-wider"
        style={{ color: ALPINE.snow, fontWeight: 300 }}
      >
        {value}
      </span>
    </div>
  );
}
