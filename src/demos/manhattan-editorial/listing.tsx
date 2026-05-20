'use client';

/**
 * Listing — 4 條 tour 雜誌「Photo Essay」風列表
 *
 * 結構：
 *   - 頁面 header（雜誌目錄頁 / Table of Contents 風）
 *   - Category filter chips（active 是底線、不填底）
 *   - List 區（每條 tour 都像雜誌一篇文章、左圖右文 / 右圖左文 交替）
 *
 * 跟前 4 個 demo 對比：
 *   - mediterranean/maldives：grid 規則卡片
 *   - alpine：稀薄 grid
 *   - muji：catalog 商品網格
 *   - manhattan：雜誌 spread — 每篇佔一整段、left/right 交替、PAGE 編號
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  NYC,
  IssueMark,
  EditorialKicker,
  MagazineHeadline,
  EditorialChip,
  EditorialButton,
  SwipeLink,
  SerialNumber,
  Rule,
  Grain,
  bwImageStyle,
  BW_HOVER_CLASS,
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  EditorialFooter,
  EDITORIAL_BRAND,
} from './shared';

type Props = {
  onSelectTour: (slug: string) => void;
  onBack: () => void;
};

type FilterValue = 'all' | Tour['category'];

export default function ListingView({ onSelectTour, onBack }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const list = useMemo(() => {
    if (filter === 'all') return tours;
    return tours.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div style={{ background: NYC.paper, color: NYC.ink }}>
      {/* ─────────────── Masthead Bar ─────────────── */}
      <header
        className="px-6 md:px-12 py-4"
        style={{
          borderBottom: `1px solid ${NYC.ink}`,
          background: NYC.paper,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-baseline gap-3 transition-colors hover:text-[#C4A678]"
            style={{ color: NYC.ink }}
          >
            <span aria-hidden className="text-base">←</span>
            <span
              className="font-display text-xl md:text-2xl"
              style={{
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              CORNER
            </span>
          </button>
          <IssueMark className="hidden md:inline-flex" />
        </div>
      </header>

      {/* ─────────────── Header — Table of Contents 風 ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-20 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7">
              <EditorialKicker label="TABLE OF CONTENTS" />
              <MagazineHeadline
                size="2xl"
                className="mt-6"
                as="h1"
              >
                THE
                <br />
                <span style={{ color: NYC.camel }}>SPRING ISSUE</span>
                <br />
                LINEUP
              </MagazineHeadline>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end gap-6">
              <p
                className="font-body text-base md:text-lg leading-[1.85]"
                style={{ color: NYC.graySoft }}
              >
                春季號 4 條深度路線：京都的春雨、紐西蘭南島的冰川、馬爾地夫水上屋、北歐三國極光。
                <br />
                <span style={{ color: NYC.ink, fontWeight: 500 }}>
                  四個完全不同的安靜。
                </span>
              </p>
              <div className="flex items-baseline gap-4 font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.graySoft, fontWeight: 600 }}
              >
                <span>{tours.length} FEATURES</span>
                <span style={{ color: NYC.camel }}>·</span>
                <span>SPRING 2026</span>
                <span style={{ color: NYC.camel }}>·</span>
                <span>112 PAGES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Filter Bar ─────────────── */}
      <section className="px-6 md:px-12 pb-12">
        <div className="mx-auto max-w-7xl">
          <Rule color={NYC.ink} weight={2} />
          <div className="py-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className="font-mono text-[10px] tracking-[0.28em] uppercase mr-4"
              style={{ color: NYC.gray, fontWeight: 700 }}
            >
              SECTIONS
            </span>
            <EditorialChip
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All
            </EditorialChip>
            {CATEGORIES.map((c) => (
              <EditorialChip
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.labelEn}
              </EditorialChip>
            ))}
          </div>
          <Rule color={NYC.ruleSoft} />
        </div>
      </section>

      {/* ─────────────── List — 雜誌 spread 左右交替 ─────────────── */}
      <section className="px-6 md:px-12 pb-24">
        <div className="mx-auto max-w-7xl">
          {/* 計數 */}
          <div className="flex items-baseline justify-between mb-12 pb-3"
            style={{ borderBottom: `1px solid ${NYC.ruleSoft}` }}
          >
            <span
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: NYC.ink, fontWeight: 700 }}
            >
              {filter === 'all' ? 'ALL FEATURES' : CATEGORY_LABEL_EN[filter]}
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: NYC.graySoft }}
            >
              {list.length} {list.length === 1 ? 'STORY' : 'STORIES'}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.25, 0.8, 0.3, 1] }}
              className="space-y-24 md:space-y-32"
            >
              {list.map((tour, i) => (
                <SpreadArticle
                  key={tour.slug}
                  tour={tour}
                  index={i}
                  totalIndex={tours.findIndex((t) => t.slug === tour.slug)}
                  onClick={() => onSelectTour(tour.slug)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <div className="py-32 text-center">
              <EditorialKicker label="NO RESULTS" align="center" />
              <MagazineHeadline size="md" className="mt-6">
                此分類本期未收錄
              </MagazineHeadline>
              <p
                className="mt-6 font-body text-base"
                style={{ color: NYC.graySoft }}
              >
                請切換到其他分類。
              </p>
            </div>
          )}
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SpreadArticle — 雜誌左右 spread 文章卡
// 偶數左圖右文、奇數右圖左文（雜誌翻頁感）
// ─────────────────────────────────────────────────────

function SpreadArticle({
  tour,
  index,
  totalIndex,
  onClick,
}: {
  tour: Tour;
  index: number;
  totalIndex: number;
  onClick: () => void;
}) {
  const isOdd = index % 2 === 1;
  const pageNumber = String((totalIndex + 1) * 14).padStart(3, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.25, 0.8, 0.3, 1],
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Spread header bar — PAGE / SECTION / VOL */}
      <div
        className="flex items-baseline justify-between py-3 mb-8"
        style={{ borderTop: `2px solid ${NYC.ink}`, borderBottom: `1px solid ${NYC.ruleSoft}` }}
      >
        <div className="flex items-baseline gap-4">
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: NYC.ink, fontWeight: 700 }}
          >
            {CATEGORY_LABEL_EN[tour.category]}
          </span>
          <span aria-hidden style={{ color: NYC.camel }}>·</span>
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: NYC.camel, fontWeight: 600 }}
          >
            FEATURE NO. {String(totalIndex + 1).padStart(2, '0')}
          </span>
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: NYC.graySoft }}
        >
          PAGE {pageNumber} — {tour.destination}
        </span>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 ${isOdd ? 'md:[direction:rtl]' : ''}`}>
        {/* Image (7 columns) */}
        <div className={`md:col-span-7 ${isOdd ? 'md:[direction:ltr]' : ''}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className={`object-cover ${BW_HOVER_CLASS}`}
              style={bwImageStyle()}
            />
            {/* Photo credit overlay 左下 */}
            <div className="absolute bottom-3 left-3">
              <span
                className="inline-block px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{
                  background: NYC.paper,
                  color: NYC.ink,
                  fontWeight: 600,
                }}
              >
                Photo · Momo Lin
              </span>
            </div>
            {/* Serial 右上 */}
            <div className="absolute top-0 right-0 px-4 py-2"
              style={{ background: NYC.ink }}
            >
              <SerialNumber
                n={String(totalIndex + 1).padStart(2, '0')}
                style={{ fontSize: 28, color: NYC.camel }}
              />
            </div>
          </div>
          {/* Photo caption（雜誌風小字） */}
          <p
            className="mt-3 font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: NYC.grayFaint }}
          >
            FIG. {String(totalIndex + 1).padStart(2, '0')} — {tour.destination} · {tour.duration}
          </p>
        </div>

        {/* Content (5 columns) */}
        <div className={`md:col-span-5 flex flex-col justify-between ${isOdd ? 'md:[direction:ltr]' : ''}`}>
          <div>
            <p
              className="font-mono text-[10px] tracking-[0.28em] uppercase mb-4"
              style={{ color: NYC.camel, fontWeight: 700 }}
            >
              FEATURE — {CATEGORY_LABEL_EN[tour.category]}
            </p>
            <MagazineHeadline
              size="lg"
              as="h3"
              className="leading-[1.02] transition-colors group-hover:text-[#C4A678]"
            >
              {tour.title}
            </MagazineHeadline>
            <p
              className="mt-6 font-body text-base md:text-lg leading-[1.7]"
              style={{ color: NYC.inkSoft }}
            >
              {tour.tagline}
            </p>
            <p
              className="mt-6 font-body text-sm md:text-base leading-[1.85]"
              style={{ color: NYC.graySoft }}
            >
              {tour.subtitle}
            </p>

            {/* Three meta rows（雜誌 fact sheet） */}
            <div className="mt-8 space-y-px"
              style={{ background: NYC.ruleSoft }}
            >
              <FactRow label="DURATION" value={tour.duration} />
              <FactRow
                label="GROUP"
                value={`${tour.groupSize.min}–${tour.groupSize.max} guests`}
              />
              <FactRow
                label="DEPARTURES"
                value={`${tour.departureDates.length} in 2026`}
              />
            </div>
          </div>

          {/* Footer: price + cta */}
          <div className="mt-8 pt-6 flex items-end justify-between gap-6"
            style={{ borderTop: `1px solid ${NYC.ink}` }}
          >
            <div>
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase mb-1"
                style={{ color: NYC.grayFaint, fontWeight: 600 }}
              >
                FROM / PER GUEST
              </p>
              <p
                className="font-display text-2xl md:text-3xl leading-tight"
                style={{ color: NYC.ink, fontWeight: 700 }}
              >
                {formatPrice(tour.priceFrom)}
              </p>
            </div>
            <span
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase"
              style={{ color: NYC.ink, fontWeight: 700 }}
            >
              <span className="relative">
                Read Feature
                <span
                  aria-hidden
                  className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: NYC.camel }}
                />
              </span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────
// FactRow — 雜誌 fact sheet 用的 key-value row
// ─────────────────────────────────────────────────────

function FactRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="grid grid-cols-[120px_1fr] gap-4 py-3 px-1 items-baseline"
      style={{ background: NYC.paperWarm }}
    >
      <span
        className="font-mono text-[10px] tracking-[0.22em] uppercase"
        style={{ color: NYC.gray, fontWeight: 700 }}
      >
        {label}
      </span>
      <span
        className="font-body text-sm"
        style={{ color: NYC.ink, fontWeight: 500 }}
      >
        {value}
      </span>
    </div>
  );
}
