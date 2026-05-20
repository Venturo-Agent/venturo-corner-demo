'use client';

/**
 * Detail — tour 詳情頁
 *
 * 結構：
 *   1. Hero（heroImage 全寬、tagline、key meta、parallax 沉入）
 *   2. Story 段落（12 grid、4/8 拆）
 *   3. Gallery（4 張 galleryImages、海島不對稱排版、橫向 panorama 為主）
 *   4. Highlights 5 條（lagoon 背景、大數字 + 細線）
 *   5. Inclusions / Exclusions 對比兩欄
 *   6. DepartureDates 選擇器（日期 card list）
 *   7. CTA（看詳細日程 / 立即報名）
 *
 * 跟 mediterranean-sun 的差異：
 *   - Gallery 用 panorama-first 排版（橫向長條 + 兩張小直立）
 *   - Highlights 區塊用 lagoon 背景、不是 sandDeep
 *   - 每個 section 上方都有「— SECTION ·」標籤、保持節奏一致
 *   - 出發日 card：active 用 ocean、inactive 用 foam
 */

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Check,
  X,
  ArrowLeft,
} from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  SEA,
  SectionLabel,
  SeaButton,
  SeaLine,
  EASE_OUT,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  IslandFooter,
} from './shared';

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
  // Hero parallax sink
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.5]);

  return (
    <div style={{ background: SEA.foam, color: SEA.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section
        ref={heroRef}
        className="relative h-[82vh] min-h-[600px] w-full overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,61,73,0.40) 0%, rgba(14,61,73,0.08) 35%, rgba(14,61,73,0.62) 100%)',
          }}
        />

        {/* 海平面細線 */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-px"
          style={{ background: 'rgba(240,248,250,0.18)' }}
        />

        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-12 flex flex-col">
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={onBack}
            className="mt-24 self-start flex items-center gap-3 font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70"
            style={{ color: SEA.foamLight, fontWeight: 300 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回所有行程
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            className="mt-auto pb-20 md:pb-28 max-w-4xl"
          >
            <div className="flex items-center gap-5 mb-10">
              <span
                className="font-display text-[10px] tracking-[0.45em] uppercase px-4 py-2"
                style={{
                  background: 'rgba(240,248,250,0.92)',
                  color: SEA.deep,
                  fontWeight: 300,
                }}
              >
                {CATEGORY_LABEL_EN[tour.category]} · {CATEGORY_LABEL[tour.category]}
              </span>
              <span
                aria-hidden
                className="block h-px w-12"
                style={{ background: 'rgba(240,248,250,0.5)' }}
              />
              <span
                className="font-display text-[11px] tracking-[0.4em] uppercase"
                style={{ color: 'rgba(240,248,250,0.85)', fontWeight: 300 }}
              >
                {tour.destination}
              </span>
            </div>

            <h1
              className="font-display leading-[1.05] text-[44px] md:text-[88px]"
              style={{
                color: SEA.foamLight,
                fontWeight: 300,
                letterSpacing: '0.03em',
              }}
            >
              {tour.title}
            </h1>
            <p
              className="mt-10 max-w-2xl text-lg md:text-xl leading-[1.85]"
              style={{ color: 'rgba(240,248,250,0.92)' }}
            >
              {tour.tagline}
            </p>

            {/* meta strip */}
            <div className="mt-14 flex flex-wrap items-center gap-x-12 gap-y-5">
              <MetaItem
                icon={<Calendar size={14} strokeWidth={1.5} />}
                label={tour.duration}
              />
              <MetaItem
                icon={<Users size={14} strokeWidth={1.5} />}
                label={`${tour.groupSize.min}–${tour.groupSize.max} 人小團`}
              />
              <MetaItem
                icon={<MapPin size={14} strokeWidth={1.5} />}
                label={`${tour.itinerary.length} 天日程`}
              />
              <div
                className="ml-auto text-right"
                style={{ color: SEA.foamLight }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-1"
                  style={{ color: 'rgba(240,248,250,0.7)' }}
                >
                  From
                </span>
                <span
                  className="font-display text-2xl md:text-3xl"
                  style={{ fontWeight: 300, letterSpacing: '0.03em' }}
                >
                  {formatPrice(tour.priceFrom)}
                </span>
                <span
                  className="font-mono text-[10px] tracking-wider block mt-1"
                  style={{ color: 'rgba(240,248,250,0.6)' }}
                >
                  起 / 人
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Story ─────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4">
            <SectionLabel>The Story</SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.25] text-[32px] md:text-[44px]"
              style={{
                color: SEA.deep,
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              這趟旅行
              <br />
              關於什麼
            </h2>
          </div>
          <div className="md:col-span-8">
            <p
              className="text-lg md:text-xl leading-[2.1]"
              style={{ color: SEA.inkSoft }}
            >
              {tour.story}
            </p>
            <div className="mt-16">
              <SeaLine />
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-7">
                {tour.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="block w-2 h-2 mt-[10px] shrink-0"
                      style={{ background: SEA.ocean }}
                    />
                    <span
                      className="text-sm leading-[1.85]"
                      style={{ color: SEA.deep }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Gallery — Panorama first ─────────────── */}
      <section className="px-6 md:px-12 pb-32 md:pb-44">
        <div className="mx-auto max-w-7xl">
          {/* 上：寬幅 panorama */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="relative aspect-[16/7] md:aspect-[21/8] w-full"
          >
            <Image
              src={tour.galleryImages[0]}
              alt={`${tour.title} 風景 1`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* 下：三張小圖、間距大、像照片間有海風吹過 */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="md:col-span-5 relative aspect-[4/3]"
            >
              <Image
                src={tour.galleryImages[1]}
                alt={`${tour.title} 風景 2`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
              className="md:col-span-4 relative aspect-[3/4]"
            >
              <Image
                src={tour.galleryImages[2]}
                alt={`${tour.title} 風景 3`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              className="md:col-span-3 relative aspect-[3/4]"
            >
              <Image
                src={tour.galleryImages[3]}
                alt={`${tour.title} 風景 4`}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights ─────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: SEA.lagoon }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <SectionLabel align="center">Highlights</SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.2] text-[36px] md:text-[56px]"
              style={{
                color: SEA.deep,
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              此團精華
            </h2>
          </div>

          <div
            className="space-y-px"
            style={{ background: 'rgba(14,61,73,0.12)' }}
          >
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: EASE_OUT,
                }}
                className="px-6 md:px-12 py-8 md:py-10 flex items-baseline gap-8 md:gap-12"
                style={{ background: SEA.lagoon }}
              >
                <span
                  className="font-display text-3xl md:text-5xl shrink-0 w-16"
                  style={{
                    color: SEA.foamLight,
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="font-display text-xl md:text-2xl leading-[1.6]"
                  style={{
                    color: SEA.deep,
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                  }}
                >
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <SectionLabel align="center">What is Included</SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.2] text-[36px] md:text-[56px]"
              style={{
                color: SEA.deep,
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              費用涵蓋
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <p
                className="font-display text-[10px] tracking-[0.5em] uppercase mb-10"
                style={{ color: SEA.ocean, fontWeight: 300 }}
              >
                Included · 包含項目
              </p>
              <div className="space-y-7">
                {tour.inclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <Check
                      size={16}
                      strokeWidth={1.5}
                      style={{ color: SEA.ocean, marginTop: 4 }}
                    />
                    <p
                      className="text-base leading-[2] flex-1"
                      style={{ color: SEA.deep }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p
                className="font-display text-[10px] tracking-[0.5em] uppercase mb-10"
                style={{ color: SEA.inkFaint, fontWeight: 300 }}
              >
                Excluded · 不含項目
              </p>
              <div className="space-y-7">
                {tour.exclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <X
                      size={16}
                      strokeWidth={1.5}
                      style={{ color: SEA.inkFaint, marginTop: 4 }}
                    />
                    <p
                      className="text-base leading-[2] flex-1"
                      style={{ color: SEA.inkSoft }}
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

      {/* ─────────────── Departure Dates ─────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: SEA.foamDeep }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <SectionLabel align="center">Departure Dates</SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.2] text-[36px] md:text-[56px]"
              style={{
                color: SEA.deep,
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              出團日期
            </h2>
            <p
              className="mt-10 max-w-xl mx-auto text-base leading-[2]"
              style={{ color: SEA.inkSoft }}
            >
              選擇你想出發的日期、我們會根據出團狀況回覆名額與最終定價。
              海島行程旺季先到先得、建議至少 4 個月前報名。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tour.departureDates.map((date) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="text-left p-7 transition-all"
                  style={{
                    background: active ? SEA.ocean : SEA.foamLight,
                    color: active ? SEA.foamLight : SEA.deep,
                    border: `1px solid ${active ? SEA.ocean : SEA.line}`,
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-3"
                    style={{
                      color: active ? 'rgba(240,248,250,0.75)' : SEA.inkFaint,
                    }}
                  >
                    {date.slice(0, 4)}
                  </span>
                  <span
                    className="font-display text-xl block leading-tight"
                    style={{ fontWeight: 300, letterSpacing: '0.02em' }}
                  >
                    {formatDate(date)}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-wider block mt-5"
                    style={{
                      color: active ? 'rgba(240,248,250,0.75)' : SEA.inkFaint,
                    }}
                  >
                    {active ? '已選 · SELECTED' : '尚有名額'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel align="center">Next Step</SectionLabel>
          <h2
            className="font-display mt-12 leading-[1.25] text-[32px] md:text-[52px]"
            style={{
              color: SEA.deep,
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}
          >
            準備好出發了嗎
          </h2>
          <p
            className="mt-10 max-w-xl mx-auto text-base leading-[2.1]"
            style={{ color: SEA.inkSoft }}
          >
            先看一次完整 {tour.itinerary.length} 天日程、
            <br />
            確認每一天去哪、住哪、吃什麼、再決定報名。
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <SeaButton size="lg" variant="outline" onClick={onSeeItinerary}>
              查看詳細日程
            </SeaButton>
            <SeaButton size="lg" onClick={onSignup}>
              立即報名
            </SeaButton>
          </div>
        </div>
      </section>

      <IslandFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Meta item
// ─────────────────────────────────────────────────────

function MetaItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-3"
      style={{ color: 'rgba(240,248,250,0.92)' }}
    >
      <span style={{ color: SEA.lagoon }}>{icon}</span>
      <span
        className="font-display text-sm tracking-wider"
        style={{ fontWeight: 300 }}
      >
        {label}
      </span>
    </div>
  );
}
