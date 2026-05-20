'use client';

/**
 * Listing — 4 條 tour 列表（極簡 table 風）
 *
 * 結構：
 *   - 頁面 header（雙語標題 + 細線下方數字）
 *   - 極簡 tab 切換（文字 + active 底線、無 pill）
 *   - Tour 列表 — 純文字表格、無 thumbnail
 *   - 底部「全部 4 條」狀態
 *
 * 不秀錢、不貼大圖、不喊大聲。
 * 跟 mediterranean / muji 的卡片 grid 對比、aman 是「酒店訂房清單」風格。
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  AMAN,
  AmanWordmark,
  QuietLabel,
  QuietLink,
  QuietTab,
  Hair,
  CenterDivider,
  SmallIndex,
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  onSelectTour: (slug: string) => void;
  onBack: () => void;
};

type FilterValue = 'all' | Tour['category'];

const SLOW_EASE = [0.22, 1, 0.36, 1] as const;

export default function ListingView({ onSelectTour, onBack }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const list = useMemo(() => {
    if (filter === 'all') return tours;
    return tours.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div style={{ background: AMAN.stone, color: AMAN.ink }}>
      {/* ─────────────── Top bar ─────────────── */}
      <section className="px-6 md:px-16 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-5 transition-colors"
          >
            <span
              aria-hidden
              className="block h-px w-8 transition-all duration-500 group-hover:w-14"
              style={{ background: AMAN.ink }}
            />
            <span
              className="font-display text-[11px]"
              style={{
                color: AMAN.ink,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              HOME
            </span>
          </button>
          <AmanWordmark size="sm" color={AMAN.ink} />
        </div>
      </section>

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-16 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
          >
            <QuietLabel align="center">ALL JOURNEYS · 二〇二六</QuietLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: SLOW_EASE }}
            className="mt-16 font-display text-[44px] md:text-[80px] leading-[1.1]"
            style={{
              color: AMAN.ink,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            四方四境
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="mt-12 max-w-xl mx-auto text-sm md:text-base leading-[2]"
            style={{ color: AMAN.inkMid, fontWeight: 300 }}
          >
            從千年京都的靜境，到南半球的荒野。
            <br />
            從馬爾地夫的對望，到北極圈的光。
            <br />
            一年僅四次，每次僅十二人。
          </motion.p>
        </div>
      </section>

      {/* ─────────────── Tab Filter ─────────────── */}
      <section className="px-6 md:px-16 pb-12">
        <div className="mx-auto max-w-7xl">
          <Hair />
          <div className="py-10 flex flex-wrap items-center justify-center gap-x-4 md:gap-x-10 gap-y-4">
            <QuietTab
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              ALL
            </QuietTab>
            <span
              aria-hidden
              className="block h-px w-4"
              style={{ background: AMAN.brassSoft }}
            />
            {CATEGORIES.map((c, i) => (
              <span key={c.value} className="flex items-center gap-x-4 md:gap-x-10">
                <QuietTab
                  active={filter === c.value}
                  onClick={() => setFilter(c.value)}
                >
                  {c.labelEn.toUpperCase()}
                </QuietTab>
                {i < CATEGORIES.length - 1 && (
                  <span
                    aria-hidden
                    className="block h-px w-4"
                    style={{ background: AMAN.brassSoft }}
                  />
                )}
              </span>
            ))}
          </div>
          <Hair />

          {/* count line */}
          <div className="py-8 flex items-baseline justify-between">
            <p
              className="font-display text-[10px]"
              style={{
                color: AMAN.brassDeep,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              {filter === 'all'
                ? 'ALL'
                : CATEGORY_LABEL_EN[filter].toUpperCase()}{' '}
              · {String(list.length).padStart(2, '0')} JOURNEYS
            </p>
            <p
              className="font-display text-[10px]"
              style={{
                color: AMAN.inkFaint,
                letterSpacing: '0.35em',
                fontWeight: 300,
              }}
            >
              MMXXVI
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── Tour list（table-row 風） ─────────────── */}
      <section className="px-6 md:px-16 pb-32 md:pb-48">
        <div className="mx-auto max-w-7xl">
          <Hair />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: SLOW_EASE }}
            >
              {list.map((tour, i) => (
                <ListingRow
                  key={tour.slug}
                  tour={tour}
                  index={i}
                  onClick={() => onSelectTour(tour.slug)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <div className="py-48 text-center">
              <p
                className="font-display text-base md:text-xl"
                style={{ color: AMAN.inkMid, fontWeight: 250 }}
              >
                此分類暫無行程
              </p>
              <p
                className="mt-4 font-display text-[10px]"
                style={{
                  color: AMAN.inkFaint,
                  letterSpacing: '0.4em',
                  fontWeight: 300,
                }}
              >
                NONE IN THIS COLLECTION
              </p>
            </div>
          )}
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Listing row — 表格列、純文字、無圖、極寬
// ─────────────────────────────────────────────────────

function ListingRow({
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
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.0,
        delay: index * 0.08,
        ease: SLOW_EASE,
      }}
      className="group w-full text-left py-14 md:py-20 block transition-all duration-500 px-2 md:px-4"
      style={{ borderBottom: `1px solid ${AMAN.line}` }}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-12 items-baseline">
        {/* 編號 */}
        <div className="col-span-2 md:col-span-1">
          <SmallIndex n={index + 1} />
        </div>

        {/* 主標 */}
        <div className="col-span-10 md:col-span-5">
          <p
            className="font-display text-[10px] mb-4"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.4em',
              fontWeight: 300,
            }}
          >
            {CATEGORY_LABEL_EN[tour.category]}
          </p>
          <h3
            className="font-display text-[26px] md:text-[42px] leading-[1.18] transition-all duration-500 group-hover:translate-x-2"
            style={{
              color: AMAN.ink,
              fontWeight: 250,
              letterSpacing: '0.03em',
            }}
          >
            {tour.title}
          </h3>
          <p
            className="mt-5 text-sm md:text-[15px] leading-[1.95] max-w-md"
            style={{ color: AMAN.inkMid, fontWeight: 300 }}
          >
            {tour.tagline}
          </p>
        </div>

        {/* 規格 */}
        <div className="col-span-6 md:col-span-3">
          <Spec label="DESTINATION" value={tour.destination} />
          <Spec label="DURATION" value={tour.duration} />
          <Spec
            label="PARTY"
            value={`${tour.groupSize.min}–${tour.groupSize.max} GUESTS`}
          />
        </div>

        {/* 價格 + arrow */}
        <div className="col-span-6 md:col-span-3 text-right">
          <p
            className="font-display text-[10px] mb-3"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.35em',
              fontWeight: 300,
            }}
          >
            FROM
          </p>
          <p
            className="font-display text-xl md:text-2xl"
            style={{ color: AMAN.ink, fontWeight: 250 }}
          >
            {formatPrice(tour.priceFrom)}
          </p>
          <p
            className="mt-2 font-display text-[10px]"
            style={{
              color: AMAN.inkFaint,
              letterSpacing: '0.3em',
              fontWeight: 300,
            }}
          >
            PER GUEST
          </p>
          <div className="mt-8 inline-flex items-center gap-5">
            <span
              className="font-display text-[10px]"
              style={{
                color: AMAN.ink,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              ENQUIRE
            </span>
            <span
              aria-hidden
              className="block h-px w-8 transition-all duration-500 group-hover:w-16"
              style={{ background: AMAN.ink }}
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <p
        className="font-display text-[9px] mb-1"
        style={{
          color: AMAN.brassDeep,
          letterSpacing: '0.35em',
          fontWeight: 300,
        }}
      >
        {label}
      </p>
      <p
        className="font-display text-[13px] leading-[1.6]"
        style={{ color: AMAN.inkSoft, fontWeight: 300 }}
      >
        {value}
      </p>
    </div>
  );
}
