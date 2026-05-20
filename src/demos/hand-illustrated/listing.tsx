'use client';

/**
 * Listing — 明信片牆、4 條 tour 以明信片並排
 *
 * 結構（Wes Anderson 對稱）：
 *   - Header — 中央對稱、海報感大標
 *   - Filter chips — 左右對稱橫排
 *   - Postcard grid — 每張帶郵戳 + 國旗 + 出發日章
 *   - Footer
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  PAPER,
  PaperGrain,
  SectionLabel,
  PosterTitle,
  PaperButton,
  Chip,
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_STAMP,
  CATEGORY_FLAG,
  CategoryIcon,
  PostcardFrame,
  PostageStamp,
  PostmarkLine,
  HairLine,
  HandwrittenLine,
  MonoCaption,
  Airplane,
  Train,
  Compass,
  FlyingBirds,
  StarFilled,
} from './shared';
import { IllustratedFooter } from './home';

type Props = {
  onSelectTour: (slug: string) => void;
  onHome: () => void;
};

type FilterValue = 'all' | Tour['category'];

export default function ListingView({ onSelectTour, onHome }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const list = useMemo(() => {
    if (filter === 'all') return tours;
    return tours.filter((t) => t.category === filter);
  }, [filter]);

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
            onClick={onHome}
            className="inline-flex items-center gap-3 transition-opacity hover:opacity-70"
          >
            <Compass size={24} color={PAPER.ink} />
            <span
              className="font-display text-sm tracking-[0.4em] uppercase"
              style={{ color: PAPER.ink, fontWeight: 600 }}
            >
              Corner
            </span>
          </button>
          <MonoCaption>Hand · Illustrated · Vol · I</MonoCaption>
        </div>
      </header>

      {/* ─────────────── Header — 對稱大標 ─────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 pt-20 md:pt-24 pb-16"
        style={{ background: PAPER.cream }}
      >
        <PaperGrain opacity={0.4} />

        <div className="relative mx-auto max-w-6xl text-center">
          <button
            onClick={onHome}
            className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase mb-12 transition-all hover:gap-3"
            style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
          >
            <span aria-hidden>←</span>
            回到封面
          </button>

          {/* 對稱裝飾 */}
          <div className="flex items-center justify-center gap-10 md:gap-16 mb-10">
            <Train size={80} color={PAPER.ink} stroke={1.3} />
            <FlyingBirds size={48} color={PAPER.ink} />
            <div className="scale-x-[-1]">
              <Airplane size={80} color={PAPER.ink} stroke={1.3} />
            </div>
          </div>

          <SectionLabel align="center" color={PAPER.tomatoDeep}>
            Postcard · Wall
          </SectionLabel>

          <div className="my-10">
            <HairLine variant="double" color={PAPER.ink} className="mb-8" />
            <PosterTitle size="md" className="text-center">
              明信片牆
            </PosterTitle>
            <div className="mt-6 flex items-center justify-center gap-6">
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
              <MonoCaption color={PAPER.tomatoDeep}>
                Vol · I · Edition · 2026
              </MonoCaption>
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
            </div>
            <HairLine variant="double" color={PAPER.ink} className="mt-8" />
          </div>

          <p
            className="mx-auto max-w-2xl font-display text-base md:text-lg leading-[1.95]"
            style={{ color: PAPER.inkSoft }}
          >
            四張寫於不同經緯度的明信片、四種旅行的姿態。
            <br />
            慢慢翻、找一張你想寄出去給自己的。
          </p>
        </div>
      </section>

      {/* ─────────────── Filter ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-10"
        style={{
          background: PAPER.parchment,
          borderTop: `1.5px solid ${PAPER.ink}`,
          borderBottom: `1.5px solid ${PAPER.ink}`,
        }}
      >
        <PaperGrain opacity={0.25} />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <MonoCaption color={PAPER.tomatoDeep}>Sort · By · Lane</MonoCaption>
            <MonoCaption>
              共 · {list.length} · 張
            </MonoCaption>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
              全部
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
                icon={<CategoryIcon category={c.value} size={20} color={filter === c.value ? PAPER.cream : PAPER.ink} />}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Postcard grid ─────────────── */}
      <section className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden">
        <PaperGrain opacity={0.3} />

        <div className="relative mx-auto max-w-6xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-16 md:space-y-24"
            >
              {list.map((tour, i) => (
                <PostcardRow
                  key={tour.slug}
                  tour={tour}
                  index={i}
                  isReverse={i % 2 === 1}
                  onClick={() => onSelectTour(tour.slug)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <div
              className="py-32 text-center"
              style={{
                border: `1.5px dashed ${PAPER.ink}`,
                background: PAPER.creamLight,
              }}
            >
              <MonoCaption color={PAPER.tomatoDeep}>Empty · Wall</MonoCaption>
              <p
                className="mt-6 font-display text-xl"
                style={{ color: PAPER.inkSoft, fontWeight: 500 }}
              >
                這個郵筒目前空了、換一個郵筒看看
              </p>
            </div>
          )}
        </div>
      </section>

      <IllustratedFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PostcardRow — 完整明信片大尺寸（雙面、左右對稱輪流）
// ─────────────────────────────────────────────────────

function PostcardRow({
  tour,
  index,
  isReverse,
  onClick,
}: {
  tour: Tour;
  index: number;
  isReverse: boolean;
  onClick: () => void;
}) {
  const stamp = CATEGORY_STAMP[tour.category];
  const flag = CATEGORY_FLAG[tour.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="cursor-pointer"
    >
      <PostcardFrame bg={PAPER.creamLight}>
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ direction: isReverse ? 'rtl' : 'ltr' }}
        >
          {/* 左：圖（image side） */}
          <div
            className="relative aspect-[4/3] md:aspect-auto md:min-h-[480px]"
            style={{ direction: 'ltr' }}
          >
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale-[10%] transition-all duration-700 hover:grayscale-0"
            />
            {/* 復古暖色 overlay */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(232,155,77,0.05) 0%, rgba(47,34,53,0.18) 100%)',
              }}
            />
            {/* 國旗 */}
            <div
              className="absolute top-6 left-6 px-3 py-2"
              style={{
                background: PAPER.creamLight,
                border: `1.5px solid ${PAPER.ink}`,
              }}
            >
              <span className="text-lg" style={{ letterSpacing: '0.1em' }}>
                {flag}
              </span>
            </div>

            {/* 標號 */}
            <div
              className="absolute bottom-6 left-6 px-4 py-2"
              style={{
                background: PAPER.ink,
                color: PAPER.cream,
              }}
            >
              <MonoCaption color={PAPER.cream}>
                Nº {String(index + 1).padStart(3, '0')} · {stamp.code}
              </MonoCaption>
            </div>

            {/* 對角郵戳 */}
            <div className="absolute top-6 right-6">
              <PostageStamp
                size={96}
                topText={stamp.top}
                bottomText={stamp.bottom}
                rotate={index % 2 === 0 ? -8 : 8}
                center={<CategoryIcon category={tour.category} size={28} color={PAPER.ink} />}
                className="opacity-95"
              />
            </div>
          </div>

          {/* 右：文字（postcard 寫字面） */}
          <div
            className="relative px-8 md:px-12 py-10 md:py-14 flex flex-col justify-between"
            style={{
              direction: 'ltr',
              borderLeft: `1.5px solid ${PAPER.ink}`,
            }}
          >
            <PaperGrain opacity={0.2} />

            <div className="relative">
              {/* 編輯室章 + 寫於 */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <MonoCaption color={PAPER.tomatoDeep}>
                    {CATEGORY_LABEL[tour.category]}
                  </MonoCaption>
                  <MonoCaption className="block mt-1">
                    寫於 · {tour.destination}
                  </MonoCaption>
                </div>
                <MonoCaption color={PAPER.lavenderDeep}>
                  Posted · 2026
                </MonoCaption>
              </div>

              <h3
                className="font-display uppercase leading-[1.1] text-[28px] md:text-[40px]"
                style={{
                  color: PAPER.ink,
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                }}
              >
                {tour.title}
              </h3>

              <HandwrittenLine
                width={120}
                color={PAPER.tomatoDeep}
                className="mt-4"
              />

              <p
                className="mt-6 font-display text-base md:text-lg leading-[1.85]"
                style={{ color: PAPER.inkSoft }}
              >
                {tour.subtitle}
              </p>

              <div className="mt-6">
                <PostmarkLine width={220} height={20} color={PAPER.ink} />
              </div>

              {/* meta 對稱 4 條 */}
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                <MetaItem label="行 · 程" value={tour.duration} />
                <MetaItem
                  label="團 · 人 · 數"
                  value={`${tour.groupSize.min} — ${tour.groupSize.max} 人`}
                />
                <MetaItem
                  label="出 · 發 · 日"
                  value={`${tour.departureDates.length} 個梯次`}
                />
                <MetaItem label="代 · 號" value={stamp.code} />
              </div>
            </div>

            {/* 底部 — 價格 + 翻面 */}
            <div className="relative mt-10">
              <HairLine variant="dashed" color={PAPER.ink} />
              <div className="pt-6 flex items-end justify-between gap-4">
                <div>
                  <MonoCaption>From · 起 · 程</MonoCaption>
                  <p
                    className="mt-2 font-display text-2xl md:text-3xl"
                    style={{
                      color: PAPER.ink,
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {formatPrice(tour.priceFrom)}
                  </p>
                </div>
                <span
                  className="font-display text-xs tracking-[0.32em] uppercase"
                  style={{
                    color: PAPER.tomatoDeep,
                    fontWeight: 500,
                    paddingBottom: 4,
                  }}
                >
                  翻面 →
                </span>
              </div>
            </div>
          </div>
        </div>
      </PostcardFrame>

      {/* 出發日章 — 卡片下方 ribbon */}
      <div className="mt-6 flex flex-wrap items-center gap-3 px-2">
        <MonoCaption color={PAPER.lavenderDeep}>下 · 一 · 班 · 出 · 發</MonoCaption>
        {tour.departureDates.slice(0, 3).map((d, i) => (
          <DateChip key={d} date={d} primary={i === 0} />
        ))}
        {tour.departureDates.length > 3 && (
          <MonoCaption>+{tour.departureDates.length - 3} 梯次</MonoCaption>
        )}
      </div>
    </motion.article>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <MonoCaption>{label}</MonoCaption>
      <p
        className="mt-1.5 font-display text-sm md:text-base"
        style={{ color: PAPER.ink, fontWeight: 500 }}
      >
        {value}
      </p>
    </div>
  );
}

// 出發日章 — 像護照入境章的小印章
function DateChip({ date, primary }: { date: string; primary: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5"
      style={{
        background: primary ? PAPER.ink : 'transparent',
        color: primary ? PAPER.cream : PAPER.ink,
        border: `1.5px solid ${PAPER.ink}`,
      }}
    >
      <StarFilled size={9} color={primary ? PAPER.tomato : PAPER.tomatoDeep} />
      <span
        className="font-display text-[11px] tracking-[0.18em] uppercase"
        style={{ fontWeight: 500 }}
      >
        {formatDate(date).replace(/年|月|日/g, (m) => (m === '日' ? '' : ' · '))}
      </span>
    </div>
  );
}

// 給 unused warning 不被觸發、留作未來擴充
export { PaperButton };
