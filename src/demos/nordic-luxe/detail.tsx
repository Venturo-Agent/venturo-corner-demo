'use client';

/**
 * Detail — tour 詳情頁（北歐極簡奢華 Nordic Luxe）
 *
 * 跟 alpine detail 對比：
 *   - alpine hero 88vh 全寬黑底 + 圖上字、用座標條
 *   - nordic hero 75vh 米白底 + 圖在上字在圖下（hotel landing 風）
 *   - alpine gallery 不對稱拼貼、nordic 4 張整齊網格 + caption
 *   - alpine highlights「左座標 + 右標題」、nordic「編號 + 圖文 row」（hotel 設施清單）
 *   - alpine departure dates 純線條 row、nordic 用「reservation grid」感
 *
 * 結構：
 *   1. Hero（不全屏、圖在上、文字在圖下方）
 *   2. The Story（左標題右段落 + features 行式排版）
 *   3. Gallery（4 張等寬整齊 grid、每張下方 caption）
 *   4. Highlights（hotel 設施清單感、編號 + 圖示細線分隔）
 *   5. Inclusions / Exclusions（兩欄、純線條表格）
 *   6. Departure dates（reservation row list）
 *   7. CTA（細線 + 標題 + button）
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  ArrowLeft,
} from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  NORDIC,
  CaptionLabel,
  QuietLabel,
  NordicButton,
  HairLine,
  CATEGORY_LABEL,
  LightTitle,
  PhotoFrame,
  NORDIC_EASE,
  NORDIC_EASE_LONG,
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

export default function DetailView({
  tour,
  selectedDate,
  onSelectDate,
  onSeeItinerary,
  onSignup,
  onBack,
}: Props) {
  return (
    <div style={{ background: NORDIC.paper, color: NORDIC.ink }}>
      {/* ─────────────── Hero（hotel landing 風、不全屏、文字在圖下方）─────────────── */}
      <section className="px-10 md:px-20 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl">
          {/* Top bar with back */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: NORDIC_EASE }}
            className="flex items-center justify-between mb-12 md:mb-16"
          >
            <button
              onClick={onBack}
              className="flex items-center gap-3 font-display text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-65"
              style={{ color: NORDIC.ink, fontWeight: 400 }}
            >
              <ArrowLeft size={13} strokeWidth={1.2} />
              返回所有行程
            </button>
            <QuietLabel color={NORDIC.stone}>
              Journey  ·  {tour.id.slice(0, 3).toUpperCase()}
            </QuietLabel>
          </motion.div>

          {/* Hero image — 65vh、不全屏、米白邊框感 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: NORDIC_EASE_LONG }}
            className="relative w-full overflow-hidden"
            style={{ height: '65vh', minHeight: '560px' }}
          >
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: 'grayscale(0.08) brightness(0.97) contrast(1.02)' }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(28,27,25,0.05) 0%, rgba(28,27,25,0) 30%, rgba(28,27,25,0.15) 100%)',
              }}
            />
          </motion.div>

          {/* 圖下 caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="mt-4 flex items-baseline justify-between"
          >
            <QuietLabel>{CATEGORY_LABEL[tour.category]}</QuietLabel>
            <QuietLabel color={NORDIC.stoneSoft}>{tour.destination}</QuietLabel>
          </motion.div>

          {/* 標題區（圖下方 hotel 風）*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: NORDIC_EASE_LONG }}
            className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-end"
          >
            <div className="md:col-span-8">
              <LightTitle
                as="h1"
                className="text-[48px] md:text-[88px]"
                style={{ lineHeight: 1.05 }}
              >
                {tour.title}
              </LightTitle>
              <p
                className="mt-10 max-w-xl text-[16px] md:text-[18px] leading-[2]"
                style={{ color: NORDIC.inkSoft }}
              >
                {tour.tagline}
              </p>
            </div>
            <div className="md:col-span-4 md:pb-2">
              <HairLine />
              <div className="pt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <QuietLabel color={NORDIC.inkFaint}>Duration</QuietLabel>
                  <p
                    className="font-mono text-[14px] tracking-wider mt-2"
                    style={{ color: NORDIC.ink, fontWeight: 300 }}
                  >
                    {tour.duration}
                  </p>
                </div>
                <div>
                  <QuietLabel color={NORDIC.inkFaint}>Group</QuietLabel>
                  <p
                    className="font-mono text-[14px] tracking-wider mt-2"
                    style={{ color: NORDIC.ink, fontWeight: 300 }}
                  >
                    {tour.groupSize.min}–{tour.groupSize.max} pax
                  </p>
                </div>
                <div>
                  <QuietLabel color={NORDIC.inkFaint}>Departures</QuietLabel>
                  <p
                    className="font-mono text-[14px] tracking-wider mt-2"
                    style={{ color: NORDIC.ink, fontWeight: 300 }}
                  >
                    {tour.departureDates.length} 場
                  </p>
                </div>
                <div>
                  <QuietLabel color={NORDIC.inkFaint}>From</QuietLabel>
                  <p
                    className="font-mono text-[18px] tracking-wider mt-2"
                    style={{ color: NORDIC.ink, fontWeight: 300 }}
                  >
                    {formatPrice(tour.priceFrom)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Story ─────────────── */}
      <section className="px-10 md:px-20 pt-40 md:pt-56 pb-32 md:pb-44">
        <div className="mx-auto max-w-6xl">
          <CaptionLabel>The Story</CaptionLabel>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-5">
              <LightTitle
                as="h2"
                className="text-[32px] md:text-[48px]"
                style={{ lineHeight: 1.25 }}
              >
                這趟旅行
                <br />
                關於什麼
              </LightTitle>
              <div
                className="h-px w-12 mt-12"
                style={{ background: NORDIC.stone }}
              />
            </div>

            <div className="md:col-span-7">
              <p
                className="text-[16px] md:text-[18px] leading-[2.1]"
                style={{ color: NORDIC.inkSoft }}
              >
                {tour.story}
              </p>

              {/* features 行式排版 */}
              <div className="mt-16">
                <HairLine />
                <div className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8">
                  {tour.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className="block shrink-0"
                        style={{
                          width: 4,
                          height: 4,
                          background: NORDIC.stone,
                          marginTop: 10,
                        }}
                      />
                      <span
                        className="text-[13px] leading-[1.85]"
                        style={{ color: NORDIC.ink }}
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

      {/* ─────────────── Gallery（4 張等寬整齊網格、每張下方 caption）─────────────── */}
      <section className="px-10 md:px-20 pb-32 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <CaptionLabel>Gallery</CaptionLabel>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
            {tour.galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 1.0,
                  delay: (i % 2) * 0.1,
                  ease: NORDIC_EASE,
                }}
              >
                <PhotoFrame aspect="aspect-[4/5]">
                  <Image
                    src={src}
                    alt={`${tour.title} 第 ${i + 1} 張`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.015]"
                    style={{ filter: 'grayscale(0.08) brightness(0.97)' }}
                  />
                </PhotoFrame>
                <div className="mt-4 flex items-baseline justify-between">
                  <QuietLabel>
                    Plate {String(i + 1).padStart(2, '0')}
                  </QuietLabel>
                  <QuietLabel color={NORDIC.stoneSoft}>
                    {tour.destination}
                  </QuietLabel>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights（hotel 設施清單感、編號 + 細線）─────────────── */}
      <section
        className="px-10 md:px-20 py-32 md:py-44"
        style={{ background: NORDIC.oak }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-20">
            <CaptionLabel>Highlights</CaptionLabel>
            <LightTitle
              as="h2"
              className="text-[36px] md:text-[56px] mt-10"
            >
              此團精華
            </LightTitle>
          </div>

          <div>
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.08,
                  ease: NORDIC_EASE,
                }}
                className="py-10 md:py-12 grid grid-cols-[60px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12 items-baseline"
                style={{
                  borderTop: `1px solid ${NORDIC.line}`,
                  borderBottom:
                    i === tour.highlights.length - 1
                      ? `1px solid ${NORDIC.line}`
                      : 'none',
                }}
              >
                <span
                  className="font-mono text-[11px] tracking-[0.25em]"
                  style={{ color: NORDIC.stone }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <LightTitle
                  as="h3"
                  className="text-xl md:text-[26px]"
                  style={{ lineHeight: 1.4 }}
                >
                  {h}
                </LightTitle>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section className="px-10 md:px-20 py-32 md:py-44">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20">
            <CaptionLabel>What&apos;s Included</CaptionLabel>
            <LightTitle
              as="h2"
              className="text-[36px] md:text-[56px] mt-10"
            >
              費用涵蓋
            </LightTitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <Check
                  size={16}
                  strokeWidth={1.2}
                  style={{ color: NORDIC.stone }}
                />
                <QuietLabel>Included</QuietLabel>
              </div>
              <div>
                {tour.inclusions.map((item, i) => (
                  <div
                    key={i}
                    className="py-5 grid grid-cols-[40px_1fr] gap-4 items-baseline"
                    style={{
                      borderTop: `1px solid ${NORDIC.line}`,
                      borderBottom:
                        i === tour.inclusions.length - 1
                          ? `1px solid ${NORDIC.line}`
                          : 'none',
                    }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.25em]"
                      style={{ color: NORDIC.stone }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="text-[14px] leading-[1.95]"
                      style={{ color: NORDIC.ink }}
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
                  style={{ color: NORDIC.stoneSoft }}
                />
                <QuietLabel color={NORDIC.stoneSoft}>Excluded</QuietLabel>
              </div>
              <div>
                {tour.exclusions.map((item, i) => (
                  <div
                    key={i}
                    className="py-5 grid grid-cols-[40px_1fr] gap-4 items-baseline"
                    style={{
                      borderTop: `1px solid ${NORDIC.line}`,
                      borderBottom:
                        i === tour.exclusions.length - 1
                          ? `1px solid ${NORDIC.line}`
                          : 'none',
                    }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.25em]"
                      style={{ color: NORDIC.stoneSoft }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="text-[14px] leading-[1.95]"
                      style={{ color: NORDIC.inkSoft }}
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

      {/* ─────────────── Departure Dates（reservation row list）─────────────── */}
      <section
        className="px-10 md:px-20 py-32 md:py-44"
        style={{ background: NORDIC.oak }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end mb-16">
            <div className="md:col-span-7">
              <CaptionLabel>Departure Dates</CaptionLabel>
              <LightTitle
                as="h2"
                className="text-[36px] md:text-[56px] mt-10"
              >
                出團日期
              </LightTitle>
            </div>
            <div className="md:col-span-5 md:pb-4">
              <p
                className="text-[15px] leading-[2.1]"
                style={{ color: NORDIC.inkSoft }}
              >
                選擇你想出發的日期、我們會根據出團狀況回覆名額與最終定價。
              </p>
            </div>
          </div>

          {/* 日期 row list */}
          <div>
            {tour.departureDates.map((date, i) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="w-full text-left transition-colors py-7 md:py-9 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center"
                  style={{
                    borderTop: `1px solid ${NORDIC.line}`,
                    borderBottom:
                      i === tour.departureDates.length - 1
                        ? `1px solid ${NORDIC.line}`
                        : 'none',
                    background: active ? NORDIC.paper : 'transparent',
                  }}
                >
                  <div className="md:col-span-2 flex items-center gap-4">
                    <span
                      className="font-mono text-[11px] tracking-[0.25em]"
                      style={{
                        color: active ? NORDIC.charcoal : NORDIC.stone,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="md:col-span-5">
                    <LightTitle
                      as="h3"
                      className="text-2xl md:text-[28px]"
                      color={active ? NORDIC.charcoal : NORDIC.ink}
                    >
                      {formatDate(date)}
                    </LightTitle>
                  </div>

                  <div className="md:col-span-3">
                    <QuietLabel color={active ? NORDIC.stone : NORDIC.inkFaint}>
                      尚有名額
                    </QuietLabel>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end gap-4">
                    <QuietLabel color={active ? NORDIC.charcoal : NORDIC.stone}>
                      {active ? '已選' : '選擇'}
                    </QuietLabel>
                    <span
                      aria-hidden
                      className="block transition-all"
                      style={{
                        width: active ? 32 : 16,
                        height: 1,
                        background: active ? NORDIC.charcoal : NORDIC.line,
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
            style={{ background: NORDIC.stone }}
          />
          <CaptionLabel align="center">Next Step</CaptionLabel>
          <LightTitle
            as="h2"
            className="text-[32px] md:text-[52px] mt-12"
            style={{ lineHeight: 1.3 }}
          >
            準備好了嗎
          </LightTitle>
          <p
            className="mt-10 max-w-md mx-auto text-[15px] leading-[2.1]"
            style={{ color: NORDIC.inkSoft }}
          >
            先看一次完整 {tour.itinerary.length} 天日程、確認每一天去哪、住哪、吃什麼、再決定報名。
          </p>

          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NordicButton size="lg" variant="outline" onClick={onSeeItinerary}>
              查看詳細日程
            </NordicButton>
            <NordicButton size="lg" onClick={onSignup}>
              立即報名
            </NordicButton>
          </div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}
