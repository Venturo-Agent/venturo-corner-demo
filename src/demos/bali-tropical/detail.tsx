'use client';

/**
 * Detail — tour 詳情頁
 *
 * 結構：
 *   1. Hero（heroImage 全寬、stay scale 不下沉、左側返回 + 葉脈裝飾、底部 meta 帶印章）
 *   2. Story 段落（左 4 / 右 8、右側帶「巴里風 SVG 葉脈裝飾」）
 *   3. Gallery — 不對稱拼貼（三大一小、有手工排版感）
 *   4. Highlights — 印章編號 + 葉脈 marker、jungle 背景
 *   5. Inclusions / Exclusions — 兩欄、用葉脈 marker
 *   6. Departure dates — 卡片格、四角加木刻角飾
 *   7. CTA
 *   8. Footer
 *
 * 跟 maldives 的差異：
 *   - hero 不下沉、用 scale stay（土地感、不是漂浮）
 *   - story 右側加葉脈 SVG 裝飾（巴里風）
 *   - gallery 排版更密、有錯落手工感
 *   - highlights 用 jungle 綠背景而非 lagoon 藍
 *   - date 卡四角加 FrameCorners
 */

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  BALI,
  SectionLabel,
  BaliButton,
  CarvedLine,
  DoubleCarved,
  LeafDivider,
  LeafIcon,
  LotusIcon,
  StampNumber,
  WeavePattern,
  FrameCorners,
  EASE_OUT,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  JungleFooter,
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
  // Hero scroll：跟 home 一致、不下沉、微 scale stay
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.55]);

  return (
    <div style={{ background: BALI.coconut, color: BALI.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section
        ref={heroRef}
        className="relative h-[84vh] min-h-[600px] w-full overflow-hidden"
      >
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              filter: 'saturate(1.1) contrast(1.03) brightness(0.95)',
            }}
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(37,32,18,0.5) 0%, rgba(37,32,18,0.1) 35%, rgba(37,32,18,0.72) 100%)',
          }}
        />

        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-12 flex flex-col">
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={onBack}
            className="mt-24 self-start flex items-center gap-3 font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70"
            style={{ color: BALI.coconutLight, fontWeight: 400 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回所有行程
          </motion.button>

          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.5 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.15, ease: EASE_OUT }}
            className="mt-auto pb-20 md:pb-24 max-w-4xl"
          >
            <div className="flex items-center gap-5 mb-10 flex-wrap">
              <span
                className="font-display text-[10px] tracking-[0.45em] uppercase px-4 py-2 inline-flex items-center gap-2"
                style={{
                  background: 'rgba(244,236,224,0.92)',
                  color: BALI.wood,
                  fontWeight: 400,
                }}
              >
                <LotusIcon size={11} color={BALI.spiceDeep} />
                {CATEGORY_LABEL_EN[tour.category]} · {CATEGORY_LABEL[tour.category]}
              </span>
              <span
                aria-hidden
                className="block h-px w-10"
                style={{ background: 'rgba(244,236,224,0.5)' }}
              />
              <span
                className="font-display text-[11px] tracking-[0.4em] uppercase"
                style={{ color: 'rgba(244,236,224,0.88)', fontWeight: 400 }}
              >
                {tour.destination}
              </span>
            </div>

            <h1
              className="font-display leading-[1.05] text-[44px] md:text-[84px]"
              style={{
                color: BALI.coconutLight,
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              {tour.title}
            </h1>
            <p
              className="mt-10 max-w-2xl text-lg md:text-xl leading-[1.85]"
              style={{ color: 'rgba(244,236,224,0.92)' }}
            >
              {tour.tagline}
            </p>

            {/* meta strip */}
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
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
                style={{ color: BALI.coconutLight }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-1"
                  style={{ color: 'rgba(244,236,224,0.7)' }}
                >
                  From
                </span>
                <span
                  className="font-display text-2xl md:text-3xl"
                  style={{ fontWeight: 400, letterSpacing: '0.03em' }}
                >
                  {formatPrice(tour.priceFrom)}
                </span>
                <span
                  className="font-mono text-[10px] tracking-wider block mt-1"
                  style={{ color: 'rgba(244,236,224,0.62)' }}
                >
                  起 / 人
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Story ─────────────── */}
      <section className="relative px-6 md:px-12 py-28 md:py-40">
        <WeavePattern opacity={0.04} color={BALI.wood} />

        <div className="relative mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <SectionLabel tone="jungle">The Story</SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.25] text-[32px] md:text-[44px]"
              style={{
                color: BALI.wood,
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              這趟旅行
              <br />
              關於什麼
            </h2>
            {/* 巴里風葉脈裝飾 */}
            <div className="mt-10 hidden md:flex flex-col gap-4">
              <LeafIcon size={32} color={BALI.spiceDeep} />
              <LeafIcon
                size={24}
                color={BALI.jungle}
                className="ml-6"
              />
              <LeafIcon
                size={20}
                color={BALI.spiceLight}
                className="ml-3"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <p
              className="text-lg md:text-xl leading-[2.1]"
              style={{ color: BALI.inkSoft }}
            >
              {tour.story}
            </p>

            <div className="mt-14">
              <CarvedLine color={BALI.line} />
              <p
                className="mt-10 mb-9 font-display text-[10px] tracking-[0.5em] uppercase"
                style={{ color: BALI.spiceDeep, fontWeight: 400 }}
              >
                Features · 行程特色
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                {tour.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <LeafIcon
                      size={14}
                      color={BALI.jungle}
                      className="shrink-0 mt-[6px]"
                    />
                    <span
                      className="text-sm leading-[1.85]"
                      style={{ color: BALI.wood }}
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

      {/* ─────────────── Gallery — 不對稱拼貼 ─────────────── */}
      <section className="px-6 md:px-12 pb-28 md:pb-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {/* 大圖 left tall */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: EASE_OUT }}
              className="md:col-span-7 relative aspect-[5/6] md:aspect-[4/5]"
            >
              <Image
                src={tour.galleryImages[0]}
                alt={`${tour.title} 風景 1`}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
                style={{
                  filter: 'saturate(1.1) contrast(1.02) brightness(0.97)',
                }}
              />
              <FrameCorners
                color="rgba(244,236,224,0.7)"
                size={24}
                inset={16}
              />
            </motion.div>

            {/* 右上小圖 + 右下小圖 + 中圖 */}
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-5 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
                className="relative aspect-[4/3] col-span-2 md:col-auto"
              >
                <Image
                  src={tour.galleryImages[1]}
                  alt={`${tour.title} 風景 2`}
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover"
                  style={{
                    filter: 'saturate(1.1) contrast(1.02) brightness(0.97)',
                  }}
                />
                <FrameCorners
                  color="rgba(244,236,224,0.7)"
                  size={18}
                  inset={12}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
                className="relative aspect-[3/4]"
              >
                <Image
                  src={tour.galleryImages[2]}
                  alt={`${tour.title} 風景 3`}
                  fill
                  sizes="(min-width: 768px) 21vw, 50vw"
                  className="object-cover"
                  style={{
                    filter: 'saturate(1.1) contrast(1.02) brightness(0.97)',
                  }}
                />
                <FrameCorners
                  color="rgba(244,236,224,0.7)"
                  size={16}
                  inset={10}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
                className="relative aspect-[3/4]"
              >
                <Image
                  src={tour.galleryImages[3]}
                  alt={`${tour.title} 風景 4`}
                  fill
                  sizes="(min-width: 768px) 21vw, 50vw"
                  className="object-cover"
                  style={{
                    filter: 'saturate(1.1) contrast(1.02) brightness(0.97)',
                  }}
                />
                <FrameCorners
                  color="rgba(244,236,224,0.7)"
                  size={16}
                  inset={10}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights — Jungle 綠 ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-28 md:py-40"
        style={{ background: BALI.jungleDeep, color: BALI.coconutLight }}
      >
        <WeavePattern opacity={0.05} color={BALI.coconutLight} />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-20 md:mb-24">
            <SectionLabel align="center" tone="coconut">
              Highlights
            </SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.18] text-[36px] md:text-[56px]"
              style={{
                color: BALI.coconutLight,
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              此團精華
            </h2>
            <div className="mt-10 max-w-xs mx-auto">
              <LeafDivider
                color="rgba(244,236,224,0.3)"
                iconColor={BALI.spiceLight}
              />
            </div>
          </div>

          <div className="space-y-px"
            style={{ background: 'rgba(244,236,224,0.18)' }}
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
                className="px-6 md:px-12 py-8 md:py-11 flex items-start gap-6 md:gap-10"
                style={{ background: BALI.jungleDeep }}
              >
                <StampNumber n={i + 1} tone="light" />
                <LeafIcon
                  size={18}
                  color={BALI.spiceLight}
                  className="shrink-0 mt-1"
                />
                <span
                  className="font-display text-xl md:text-2xl leading-[1.55]"
                  style={{
                    color: BALI.coconutLight,
                    fontWeight: 400,
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
      <section className="px-6 md:px-12 py-28 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20 md:mb-24">
            <SectionLabel align="center">What is Included</SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.18] text-[36px] md:text-[56px]"
              style={{
                color: BALI.wood,
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              費用涵蓋
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <LotusIcon size={14} color={BALI.spiceDeep} />
                <p
                  className="font-display text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                >
                  Included · 包含項目
                </p>
              </div>
              <div className="space-y-7">
                {tour.inclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <LeafIcon
                      size={14}
                      color={BALI.jungle}
                      className="shrink-0 mt-1"
                    />
                    <p
                      className="text-base leading-[2] flex-1"
                      style={{ color: BALI.wood }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-10">
                <span
                  aria-hidden
                  className="block w-3 h-px"
                  style={{ background: BALI.inkFaint }}
                />
                <p
                  className="font-display text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: BALI.inkFaint, fontWeight: 400 }}
                >
                  Excluded · 不含項目
                </p>
              </div>
              <div className="space-y-7">
                {tour.exclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <span
                      aria-hidden
                      className="shrink-0 block w-3 h-px mt-3"
                      style={{ background: BALI.inkFaint }}
                    />
                    <p
                      className="text-base leading-[2] flex-1"
                      style={{ color: BALI.inkSoft }}
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
        className="px-6 md:px-12 py-28 md:py-40"
        style={{ background: BALI.coconutDeep }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <SectionLabel align="center" tone="jungle">
              Departure Dates
            </SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.18] text-[36px] md:text-[56px]"
              style={{
                color: BALI.wood,
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              出團日期
            </h2>
            <p
              className="mt-10 max-w-xl mx-auto text-base leading-[2.05]"
              style={{ color: BALI.inkSoft }}
            >
              選擇你想出發的日期、我們會根據出團狀況回覆名額與最終定價。
              熱帶行程旺季先到先得、建議至少 4 個月前報名。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tour.departureDates.map((date) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="relative text-left p-7 transition-all"
                  style={{
                    background: active ? BALI.wood : BALI.coconutLight,
                    color: active ? BALI.coconutLight : BALI.wood,
                    border: `1px solid ${active ? BALI.wood : BALI.line}`,
                  }}
                >
                  <FrameCorners
                    color={active ? 'rgba(244,236,224,0.55)' : BALI.spice}
                    size={14}
                    inset={8}
                  />

                  <span
                    className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-3 relative"
                    style={{
                      color: active
                        ? 'rgba(244,236,224,0.75)'
                        : BALI.inkFaint,
                    }}
                  >
                    {date.slice(0, 4)}
                  </span>
                  <span
                    className="font-display text-xl block leading-tight relative"
                    style={{ fontWeight: 400, letterSpacing: '0.02em' }}
                  >
                    {formatDate(date)}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-wider block mt-5 relative"
                    style={{
                      color: active
                        ? 'rgba(244,236,224,0.75)'
                        : BALI.inkFaint,
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
      <section className="px-6 md:px-12 py-28 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel align="center">Next Step</SectionLabel>
          <h2
            className="font-display mt-12 leading-[1.25] text-[32px] md:text-[52px]"
            style={{
              color: BALI.wood,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            準備好出發了嗎
          </h2>
          <p
            className="mt-10 max-w-xl mx-auto text-base leading-[2.05]"
            style={{ color: BALI.inkSoft }}
          >
            先看一次完整 {tour.itinerary.length} 天日程、
            <br />
            確認每一天去哪、住哪、吃什麼、再決定報名。
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <BaliButton size="lg" variant="outline" onClick={onSeeItinerary}>
              查看詳細日程
            </BaliButton>
            <BaliButton size="lg" onClick={onSignup}>
              立即報名
            </BaliButton>
          </div>
        </div>
      </section>

      <JungleFooter />
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
      style={{ color: 'rgba(244,236,224,0.92)' }}
    >
      <span style={{ color: BALI.spiceLight }}>{icon}</span>
      <span
        className="font-display text-sm tracking-wider"
        style={{ fontWeight: 400 }}
      >
        {label}
      </span>
    </div>
  );
}
