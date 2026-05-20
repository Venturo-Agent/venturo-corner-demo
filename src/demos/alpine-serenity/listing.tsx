'use client';

/**
 * Listing — 4 條 tour 列表（阿爾卑斯靜謐）
 *
 * 跟 mediterranean listing 對比：
 *   - Header 改為左右兩欄、左標題右說明（不是上下排）
 *   - Filter 改為下劃線型 chip、不是邊框膠囊
 *   - 卡片改為「橫排」一條一條、而非 2 欄 grid（強化「目錄」感）
 *   - 每張卡：左圖 + 右文字 alternating left/right
 *   - hover 只變線條色 + 字距、不放大圖
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  ALPINE,
  PeakLabel,
  AlpineChip,
  CATEGORIES,
  CATEGORY_LABEL,
  HairLine,
  SerifTitle,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  onSelectTour: (slug: string) => void;
};

type FilterValue = 'all' | Tour['category'];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ListingView({ onSelectTour }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const list = useMemo(() => {
    if (filter === 'all') return tours;
    return tours.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div style={{ background: ALPINE.snow, color: ALPINE.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section className="px-10 md:px-20 pt-28 md:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <PeakLabel>All Journeys</PeakLabel>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
            <div className="md:col-span-7">
              <SerifTitle
                as="h1"
                className="text-[44px] md:text-[80px] leading-[1.05]"
              >
                2026 年度
                <br />
                行程一覽
              </SerifTitle>
            </div>
            <div className="md:col-span-5 md:pb-4">
              <div
                className="h-px w-12 mb-8"
                style={{ background: ALPINE.stone }}
              />
              <p
                className="text-[15px] leading-[2.1]"
                style={{ color: ALPINE.inkSoft }}
              >
                從千年京都到南半球荒野、從馬爾地夫水上屋到北極圈極光獵人。
                一年精選四條深度路線、每團不超過 14 人。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Filter ─────────────── */}
      <section className="px-10 md:px-20">
        <div className="mx-auto max-w-7xl">
          <HairLine />
          <div className="py-10 flex flex-wrap items-center gap-x-10 gap-y-3">
            <span
              className="font-display text-[10px] tracking-[0.5em] uppercase mr-6"
              style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
            >
              Filter
            </span>
            <AlpineChip
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              全部
            </AlpineChip>
            {CATEGORIES.map((c) => (
              <AlpineChip
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
              </AlpineChip>
            ))}
          </div>
          <HairLine />
        </div>
      </section>

      {/* ─────────────── List ─────────────── */}
      <section className="px-10 md:px-20 pb-32 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between pt-10 pb-16">
            <span
              className="font-mono text-[11px] tracking-[0.3em] uppercase"
              style={{ color: ALPINE.inkFaint }}
            >
              {String(list.length).padStart(2, '0')}  ·  Journeys Listed
            </span>
            <span
              className="font-mono text-[11px] tracking-[0.3em] uppercase"
              style={{ color: ALPINE.inkFaint }}
            >
              {filter === 'all' ? 'All Categories' : CATEGORY_LABEL[filter]}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-col"
            >
              {list.map((tour, i) => (
                <ListingRow
                  key={tour.slug}
                  tour={tour}
                  index={i}
                  isLast={i === list.length - 1}
                  total={list.length}
                  onClick={() => onSelectTour(tour.slug)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <div className="py-44 text-center">
              <SerifTitle
                as="h3"
                className="text-2xl"
                color={ALPINE.inkSoft}
              >
                此分類暫無行程、請切換其他類別。
              </SerifTitle>
            </div>
          )}
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Listing row — 橫排一條一條、左右交錯
// ─────────────────────────────────────────────────────

function ListingRow({
  tour,
  index,
  isLast,
  total,
  onClick,
}: {
  tour: Tour;
  index: number;
  isLast: boolean;
  total: number;
  onClick: () => void;
}) {
  const isReverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.9,
        delay: 0.05,
        ease: EASE,
      }}
      onClick={onClick}
      className="group cursor-pointer py-16 md:py-24"
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${ALPINE.line}`,
      }}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${
          isReverse ? 'md:[direction:rtl]' : ''
        }`}
      >
        {/* image — 6 欄 */}
        <div className="md:col-span-6 md:[direction:ltr]">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: 'grayscale(0.12) brightness(0.96)' }}
            />
            <div
              aria-hidden
              className="absolute inset-4 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"
              style={{ border: `1px solid rgba(248,249,251,0.5)` }}
            />
          </div>
        </div>

        {/* content — 6 欄 */}
        <div className="md:col-span-6 md:[direction:ltr]">
          {/* 序號條 */}
          <div className="flex items-center gap-6 mb-8">
            <span
              className="font-mono text-[11px] tracking-[0.3em]"
              style={{ color: ALPINE.stone }}
            >
              N {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span
              aria-hidden
              className="block w-8 h-px"
              style={{ background: ALPINE.line }}
            />
            <span
              className="font-display text-[10px] tracking-[0.4em] uppercase"
              style={{ color: ALPINE.stone, fontWeight: 400 }}
            >
              {CATEGORY_LABEL[tour.category]}
            </span>
          </div>

          <span
            className="font-display text-[10px] tracking-[0.5em] uppercase block mb-4"
            style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
          >
            {tour.destination}
          </span>

          <SerifTitle
            as="h3"
            className="text-[32px] md:text-[44px] mb-6 transition-all group-hover:underline underline-offset-[12px] decoration-1"
          >
            {tour.title}
          </SerifTitle>

          <p
            className="text-[15px] leading-[2.05] mb-10"
            style={{ color: ALPINE.inkSoft }}
          >
            {tour.subtitle}
          </p>

          <HairLine />

          {/* meta + price */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-4 flex flex-col gap-3">
              <span
                className="font-display text-[9px] tracking-[0.45em] uppercase"
                style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
              >
                Duration
              </span>
              <span
                className="font-mono text-[14px] tracking-wider"
                style={{ color: ALPINE.ink, fontWeight: 300 }}
              >
                {tour.duration}
              </span>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3">
              <span
                className="font-display text-[9px] tracking-[0.45em] uppercase"
                style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
              >
                Group Size
              </span>
              <span
                className="font-mono text-[14px] tracking-wider"
                style={{ color: ALPINE.ink, fontWeight: 300 }}
              >
                {tour.groupSize.min}–{tour.groupSize.max} pax
              </span>
            </div>

            <div className="md:col-span-4 text-right flex flex-col gap-3">
              <span
                className="font-display text-[9px] tracking-[0.45em] uppercase"
                style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
              >
                From / Per Person
              </span>
              <span
                className="font-mono text-[20px] tracking-wider"
                style={{ color: ALPINE.ink, fontWeight: 300 }}
              >
                {formatPrice(tour.priceFrom)}
              </span>
            </div>
          </div>

          {/* CTA inline */}
          <div className="mt-10 flex items-center gap-4 font-display text-[10px] tracking-[0.45em] uppercase"
            style={{ color: ALPINE.night, fontWeight: 400 }}
          >
            <span className="transition-all group-hover:tracking-[0.55em]">
              查看行程
            </span>
            <ArrowRight
              size={13}
              strokeWidth={1.2}
              className="transition-transform group-hover:translate-x-2"
            />
          </div>
        </div>
      </div>

      {/* 多餘 meta：departureDates count */}
      <div className="mt-12 flex items-center gap-10 text-[11px] font-mono tracking-[0.2em] uppercase"
        style={{ color: ALPINE.inkFaint }}
      >
        <div className="flex items-center gap-3">
          <Calendar size={12} strokeWidth={1.2} />
          {tour.departureDates.length} 個出發日
        </div>
        <div className="flex items-center gap-3">
          <Users size={12} strokeWidth={1.2} />
          全程中文領隊
        </div>
      </div>
    </motion.article>
  );
}
