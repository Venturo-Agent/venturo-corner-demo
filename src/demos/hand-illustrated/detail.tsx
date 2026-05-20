'use client';

/**
 * Detail — 像翻開一篇手繪旅行筆記
 *
 * 結構（Wes Anderson 對稱 + 復古旅行海報）：
 *   1. Hero — 對稱大標 + 副標像明信片內容、含 hero image 海報感
 *   2. Story — 多段、配自繪 SVG 插畫（中央對稱）
 *   3. Gallery — 4 張、復古拼貼樣式
 *   4. Highlights — 用印章標記
 *   5. 包含 / 不含 — 雙欄對稱
 *   6. Dates — 護照章感
 *   7. CTA
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  PAPER,
  PaperGrain,
  PaperNoise,
  SectionLabel,
  PosterTitle,
  PaperButton,
  PostageStamp,
  PostmarkLine,
  HandwrittenLine,
  HairLine,
  PostcardFrame,
  MonoCaption,
  NumberMark,
  Airplane,
  Suitcase,
  Passport,
  Compass,
  FlyingBirds,
  StarFilled,
  StarOutline,
  Mountain,
  Tree,
  Globe,
  CATEGORY_LABEL,
  CATEGORY_STAMP,
  CATEGORY_FLAG,
  CategoryIcon,
} from './shared';
import { IllustratedFooter } from './home';

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
  const stamp = CATEGORY_STAMP[tour.category];
  const flag = CATEGORY_FLAG[tour.category];

  return (
    <div style={{ background: PAPER.cream, color: PAPER.ink }}>
      {/* ─────────────── Top bar ─────────────── */}
      <header
        className="relative px-6 md:px-12 py-5"
        style={{
          background: PAPER.cream,
          borderBottom: `1.5px solid ${PAPER.ink}`,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase transition-all hover:gap-3"
            style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
          >
            <span aria-hidden>←</span>
            回明信片牆
          </button>
          <MonoCaption>{stamp.code} · Hand · Illustrated</MonoCaption>
        </div>
      </header>

      {/* ─────────────── Hero ─────────────── */}
      <section className="relative overflow-hidden" style={{ background: PAPER.cream }}>
        <PaperGrain opacity={0.4} />

        <div className="relative mx-auto max-w-6xl px-6 md:px-12 pt-20 md:pt-24 pb-12 text-center">
          {/* 對稱裝飾 */}
          <div className="flex items-center justify-center gap-10 md:gap-16 mb-12">
            <div style={{ transform: 'rotate(-3deg)' }}>
              <Passport size={64} color={PAPER.ink} stroke={1.3} />
            </div>
            <FlyingBirds size={56} color={PAPER.ink} />
            <div style={{ transform: 'rotate(3deg)' }}>
              <Suitcase size={72} color={PAPER.ink} stroke={1.3} />
            </div>
          </div>

          <SectionLabel align="center" color={PAPER.tomatoDeep}>
            {CATEGORY_LABEL[tour.category]} · {stamp.code}
          </SectionLabel>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="my-10"
          >
            <HairLine variant="double" color={PAPER.ink} />
            <div className="py-10 md:py-14">
              <PosterTitle size="md" className="text-center">
                {tour.title}
              </PosterTitle>
            </div>
            <div className="flex items-center justify-center gap-6 mb-8">
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
              <span
                className="font-display text-lg md:text-2xl tracking-[0.28em]"
                style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
              >
                「{tour.tagline}」
              </span>
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
            </div>
            <HairLine variant="double" color={PAPER.ink} />
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <MonoCaption color={PAPER.lavenderDeep}>
              寫於 · {tour.destination} · {flag}
            </MonoCaption>
          </div>
        </div>

        {/* Hero image — Postcard frame */}
        <div className="relative mx-auto max-w-6xl px-6 md:px-12 mt-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <PostcardFrame bg={PAPER.creamLight}>
              <div className="relative aspect-[16/8]">
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover grayscale-[10%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(232,155,77,0.08) 0%, rgba(47,34,53,0.22) 100%)',
                  }}
                />
                {/* 雙郵戳對稱 */}
                <div className="absolute top-6 left-6">
                  <PostageStamp
                    size={104}
                    topText={stamp.top}
                    bottomText={stamp.bottom}
                    rotate={-8}
                    color={PAPER.cream}
                    center={<CategoryIcon category={tour.category} size={32} color={PAPER.cream} />}
                  />
                </div>
                <div className="absolute top-6 right-6">
                  <PostageStamp
                    size={88}
                    topText="VIA · AIR"
                    bottomText="PAR · AVION"
                    rotate={6}
                    color={PAPER.cream}
                    center={<Airplane size={36} color={PAPER.cream} stroke={1.5} />}
                  />
                </div>
                <div
                  className="absolute bottom-6 left-6 px-4 py-2"
                  style={{
                    background: PAPER.ink,
                    color: PAPER.cream,
                  }}
                >
                  <MonoCaption color={PAPER.cream}>
                    {tour.destination} · {stamp.code}
                  </MonoCaption>
                </div>
                <div className="absolute bottom-6 right-6">
                  <PostmarkLine width={140} height={20} color={PAPER.cream} />
                </div>
              </div>
            </PostcardFrame>
          </motion.div>

          {/* Quick stats — 4 對稱 */}
          <div
            className="relative mt-12 grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{ background: PAPER.ink }}
          >
            <QuickStat
              icon={<Airplane size={36} color={PAPER.ink} stroke={1.3} />}
              label="Days"
              value={tour.duration}
            />
            <QuickStat
              icon={<Passport size={32} color={PAPER.ink} stroke={1.3} />}
              label="Group"
              value={`${tour.groupSize.min} — ${tour.groupSize.max} 人`}
            />
            <QuickStat
              icon={<Mountain size={56} color={PAPER.ink} stroke={1.3} />}
              label="Chapters"
              value={`${tour.itinerary.length} 章`}
            />
            <QuickStat
              icon={<Globe size={36} color={PAPER.ink} stroke={1.3} />}
              label="From"
              value={formatPrice(tour.priceFrom)}
            />
          </div>
        </div>
      </section>

      {/* ─────────────── Story ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden"
        style={{ background: PAPER.parchment }}
      >
        <PaperGrain opacity={0.3} />

        <div className="relative mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <SectionLabel align="center" color={PAPER.lavenderDeep}>
              The · Story
            </SectionLabel>
            <h2
              className="mt-10 font-display uppercase leading-[1.15] text-[32px] md:text-[52px]"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              這趟旅程
              <br />
              <span style={{ color: PAPER.tomatoDeep }}>編輯室手記</span>
            </h2>
          </div>

          {/* 大段引文 + 對稱裝飾 */}
          <div
            className="relative p-10 md:p-16"
            style={{
              background: PAPER.creamLight,
              border: `1.5px solid ${PAPER.ink}`,
              outline: `1px solid ${PAPER.ink}`,
              outlineOffset: '8px',
            }}
          >
            <PaperGrain opacity={0.2} />

            <div className="relative">
              {/* 上方對稱裝飾 */}
              <div className="flex items-center justify-center gap-6 mb-10">
                <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12" />
                <StarFilled size={14} color={PAPER.tomatoDeep} />
                <CategoryIcon category={tour.category} size={48} color={PAPER.ink} />
                <StarFilled size={14} color={PAPER.tomatoDeep} />
                <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12" />
              </div>

              <p
                className="font-display text-xl md:text-2xl leading-[1.85] text-center"
                style={{
                  color: PAPER.ink,
                  fontWeight: 400,
                  letterSpacing: '0.005em',
                }}
              >
                {tour.story}
              </p>

              <div className="mt-10 flex justify-center">
                <HandwrittenLine width={200} color={PAPER.tomatoDeep} />
              </div>

              <div className="mt-6 text-center">
                <MonoCaption color={PAPER.lavenderDeep}>
                  Corner · Editor · {stamp.code}
                </MonoCaption>
              </div>
            </div>
          </div>

          {/* Features as 行李貼紙 */}
          <div className="mt-16">
            <SectionLabel align="center" color={PAPER.tomatoDeep}>
              這篇筆記裡會出現的字
            </SectionLabel>
            <div className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
              {tour.features.map((f, i) => (
                <FeatureSticker key={i} text={f} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Gallery — 復古拼貼 ─────────────── */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden">
        <PaperGrain opacity={0.3} />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <SectionLabel align="center" color={PAPER.tomatoDeep}>
              Picture · Pages
            </SectionLabel>
            <h2
              className="mt-10 font-display uppercase leading-[1.15] text-[32px] md:text-[52px]"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              從筆記本撕下來的
              <br />
              <span style={{ color: PAPER.tomatoDeep }}>四張照片</span>
            </h2>
          </div>

          {/* 拼貼 — 4 張不同 rotate / size */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <GalleryPhoto
                src={tour.galleryImages[0]}
                alt={`${tour.title} 01`}
                rotate={-1.4}
                stampText="01"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="md:col-span-5"
            >
              <GalleryPhoto
                src={tour.galleryImages[1]}
                alt={`${tour.title} 02`}
                rotate={1.8}
                stampText="02"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="md:col-span-5"
            >
              <GalleryPhoto
                src={tour.galleryImages[2]}
                alt={`${tour.title} 03`}
                rotate={-1.2}
                stampText="03"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.24 }}
              className="md:col-span-7"
            >
              <GalleryPhoto
                src={tour.galleryImages[3]}
                alt={`${tour.title} 04`}
                rotate={1.5}
                stampText="04"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden"
        style={{ background: PAPER.creamWarm }}
      >
        <PaperGrain opacity={0.3} />

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <SectionLabel align="center" color={PAPER.lavenderDeep}>
              Five · Highlights
            </SectionLabel>
            <h2
              className="mt-10 font-display uppercase leading-[1.15] text-[32px] md:text-[52px]"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              這篇筆記的
              <br />
              <span style={{ color: PAPER.tomatoDeep }}>五個亮點</span>
            </h2>
          </div>

          <div className="space-y-5 md:space-y-6">
            {tour.highlights.map((h, i) => (
              <HighlightRow key={i} text={h} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden">
        <PaperGrain opacity={0.3} />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <SectionLabel align="center" color={PAPER.tomatoDeep}>
              What · Is · Included
            </SectionLabel>
            <h2
              className="mt-10 font-display uppercase leading-[1.15] text-[32px] md:text-[52px]"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              包進這本書的、
              <br />
              <span style={{ color: PAPER.tomatoDeep }}>跟沒包進去的</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Included */}
            <div
              className="relative p-8 md:p-10"
              style={{
                background: PAPER.creamLight,
                border: `1.5px solid ${PAPER.ink}`,
              }}
            >
              <PaperGrain opacity={0.2} />
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <MonoCaption color={PAPER.tomatoDeep}>Inside · The · Book</MonoCaption>
                  <PostageStamp
                    size={64}
                    topText="ALL · IN"
                    bottomText="INCLUDED"
                    color={PAPER.tomatoDeep}
                    rotate={-6}
                    center={<StarFilled size={14} color={PAPER.tomatoDeep} />}
                  />
                </div>
                <h3
                  className="font-display uppercase text-2xl mb-6"
                  style={{
                    color: PAPER.ink,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  包含內容
                </h3>
                <HairLine variant="dashed" color={PAPER.ink} />
                <div className="mt-6 space-y-4">
                  {tour.inclusions.map((item, i) => (
                    <ListItem key={i} text={item} n={i + 1} variant="check" />
                  ))}
                </div>
              </div>
            </div>

            {/* Excluded */}
            <div
              className="relative p-8 md:p-10"
              style={{
                background: PAPER.creamLight,
                border: `1.5px solid ${PAPER.ink}`,
              }}
            >
              <PaperGrain opacity={0.2} />
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <MonoCaption color={PAPER.lavenderDeep}>Outside · The · Book</MonoCaption>
                  <PostageStamp
                    size={64}
                    topText="NOT · IN"
                    bottomText="EXTRA · COST"
                    color={PAPER.lavenderDeep}
                    rotate={6}
                    center={<StarOutline size={14} color={PAPER.lavenderDeep} stroke={1.5} />}
                  />
                </div>
                <h3
                  className="font-display uppercase text-2xl mb-6"
                  style={{
                    color: PAPER.ink,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  不包含
                </h3>
                <HairLine variant="dashed" color={PAPER.ink} />
                <div className="mt-6 space-y-4">
                  {tour.exclusions.map((item, i) => (
                    <ListItem key={i} text={item} n={i + 1} variant="cross" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Dates ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden"
        style={{ background: PAPER.parchment }}
      >
        <PaperGrain opacity={0.3} />

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <SectionLabel align="center" color={PAPER.tomatoDeep}>
              Stamp · A · Date
            </SectionLabel>
            <h2
              className="mt-10 font-display uppercase leading-[1.15] text-[32px] md:text-[52px]"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              蓋上你的
              <br />
              <span style={{ color: PAPER.tomatoDeep }}>出發日期章</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {tour.departureDates.map((d, i) => {
              const active = selectedDate === d;
              return (
                <DateStamp
                  key={d}
                  date={d}
                  active={active}
                  onClick={() => onSelectDate(d)}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-32 md:py-40 overflow-hidden"
        style={{ background: PAPER.ink }}
      >
        <PaperNoise opacity={0.12} />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-10 md:gap-14 mb-12">
            <Compass size={64} color={PAPER.cream} />
            <Globe size={72} color={PAPER.tomato} stroke={1.3} />
            <Compass size={64} color={PAPER.cream} />
          </div>

          <SectionLabel align="center" color={PAPER.tomatoLight}>
            Next · Page
          </SectionLabel>

          <h2
            className="mt-10 font-display uppercase leading-[1.05] text-[40px] md:text-[80px]"
            style={{
              color: PAPER.cream,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            翻到
            <br />
            <span style={{ color: PAPER.tomato }}>下 · 一 · 章</span>
          </h2>

          <p
            className="mt-10 mx-auto max-w-xl font-display text-base md:text-lg leading-[1.95]"
            style={{ color: 'rgba(252,242,226,0.8)' }}
          >
            先看完整 {tour.duration} 的每日章節、
            <br />
            再決定要不要把名字寫進這本書。
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <PaperButton size="lg" variant="inverse" onClick={onSeeItinerary}>
              看每日章節
            </PaperButton>
            <PaperButton size="lg" variant="outline" onClick={onSignup}>
              寫上名字
            </PaperButton>
          </div>
        </div>
      </section>

      <IllustratedFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// QuickStat — Wes Anderson 對稱 4 格
// ─────────────────────────────────────────────────────

function QuickStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="relative p-6 md:p-8 flex flex-col items-center gap-4 text-center"
      style={{ background: PAPER.creamLight }}
    >
      <PaperGrain opacity={0.2} />
      <div className="relative shrink-0">{icon}</div>
      <div className="relative">
        <MonoCaption color={PAPER.tomatoDeep}>{label}</MonoCaption>
        <p
          className="mt-2 font-display text-base md:text-lg leading-tight"
          style={{ color: PAPER.ink, fontWeight: 500 }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FeatureSticker — 行李貼紙樣式
// ─────────────────────────────────────────────────────

function FeatureSticker({ text, index }: { text: string; index: number }) {
  const colors = [
    { bg: PAPER.tomato, color: PAPER.ink },
    { bg: PAPER.lavender, color: PAPER.cream },
    { bg: PAPER.creamLight, color: PAPER.ink },
    { bg: PAPER.ink, color: PAPER.cream },
  ];
  const c = colors[index % 4];
  const rotate = index % 2 === 0 ? -2 : 2;
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2"
      style={{
        background: c.bg,
        color: c.color,
        border: `1.5px solid ${PAPER.ink}`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <StarFilled size={10} color={c.color} />
      <span
        className="font-display text-xs tracking-[0.22em] uppercase"
        style={{ fontWeight: 500 }}
      >
        {text}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────
// GalleryPhoto — 復古拼貼相片
// ─────────────────────────────────────────────────────

function GalleryPhoto({
  src,
  alt,
  rotate,
  stampText,
}: {
  src: string;
  alt: string;
  rotate: number;
  stampText: string;
}) {
  return (
    <div
      className="relative"
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <PostcardFrame bg={PAPER.creamLight} serrated={false}>
        <div className="relative aspect-[4/3]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover grayscale-[10%]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(232,155,77,0.06) 0%, rgba(47,34,53,0.15) 100%)',
            }}
          />
          <div
            className="absolute top-4 right-4 px-3 py-1.5"
            style={{
              background: PAPER.creamLight,
              border: `1.5px solid ${PAPER.ink}`,
            }}
          >
            <MonoCaption>Page · {stampText}</MonoCaption>
          </div>
        </div>
      </PostcardFrame>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// HighlightRow — 印章標記的亮點
// ─────────────────────────────────────────────────────

function HighlightRow({ text, index }: { text: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-[auto_1fr] gap-6 md:gap-8 items-center p-6 md:p-8"
      style={{
        background: PAPER.creamLight,
        border: `1.5px solid ${PAPER.ink}`,
      }}
    >
      <PaperGrain opacity={0.2} />
      <div className="relative shrink-0">
        <PostageStamp
          size={88}
          topText={`HIGHLIGHT · ${String(index + 1).padStart(2, '0')}`}
          bottomText="WORTH · A · STOP"
          rotate={index % 2 === 0 ? -6 : 6}
          center={<NumberMark n={index + 1} size="md" color={PAPER.ink} />}
        />
      </div>
      <div className="relative">
        <p
          className="font-display text-lg md:text-xl leading-[1.65]"
          style={{ color: PAPER.ink, fontWeight: 500 }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────
// ListItem — Inclusions / Exclusions item
// ─────────────────────────────────────────────────────

function ListItem({
  text,
  n,
  variant,
}: {
  text: string;
  n: number;
  variant: 'check' | 'cross';
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
      <div
        className="w-7 h-7 flex items-center justify-center shrink-0"
        style={{
          background: variant === 'check' ? PAPER.tomato : 'transparent',
          border: `1.5px solid ${PAPER.ink}`,
        }}
      >
        {variant === 'check' ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M3 7 L 6 10 L 11 4"
              stroke={PAPER.ink}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <line x1="3" y1="3" x2="9" y2="9" stroke={PAPER.lavenderDeep} strokeWidth="2" strokeLinecap="round" />
            <line x1="9" y1="3" x2="3" y2="9" stroke={PAPER.lavenderDeep} strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <div>
        <div className="flex items-baseline gap-3">
          <NumberMark n={n} size="sm" color={PAPER.tomatoDeep} />
          <p
            className="flex-1 font-display text-base leading-[1.85]"
            style={{
              color: variant === 'check' ? PAPER.ink : PAPER.inkSoft,
              fontWeight: 400,
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// DateStamp — 護照入境章感的日期選擇
// ─────────────────────────────────────────────────────

function DateStamp({
  date,
  active,
  onClick,
  index,
}: {
  date: string;
  active: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      whileHover={{ scale: 0.97 }}
      whileTap={{ scale: 0.94 }}
      className="relative p-5 text-center transition-all"
      style={{
        background: active ? PAPER.ink : PAPER.creamLight,
        color: active ? PAPER.cream : PAPER.ink,
        border: `2px solid ${PAPER.ink}`,
        outline: active ? `1.5px solid ${PAPER.ink}` : 'none',
        outlineOffset: active ? '4px' : 0,
      }}
    >
      <PaperGrain opacity={active ? 0.15 : 0.2} />
      <div className="relative">
        <MonoCaption color={active ? PAPER.tomatoLight : PAPER.tomatoDeep}>
          {date.slice(0, 4)} · YEAR
        </MonoCaption>
        <p
          className="mt-2 font-display text-base md:text-lg leading-tight"
          style={{ color: active ? PAPER.cream : PAPER.ink, fontWeight: 500 }}
        >
          {formatDate(date)}
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          {active ? (
            <>
              <StarFilled size={10} color={PAPER.tomato} />
              <span
                className="font-display text-[10px] tracking-[0.25em] uppercase"
                style={{ color: PAPER.tomato, fontWeight: 500 }}
              >
                Stamped
              </span>
              <StarFilled size={10} color={PAPER.tomato} />
            </>
          ) : (
            <span
              className="font-display text-[10px] tracking-[0.25em] uppercase"
              style={{ color: PAPER.inkFaint, fontWeight: 500 }}
            >
              Available
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
