'use client';

/**
 * Listing — 4 條 tour 列表
 *
 * 結構：
 *   - 頁面 header（標題 + 副標）
 *   - Category filter chips（全部 + 4 個 category）
 *   - Grid 4 卡（圖 + tag + 標題 + 副標 + meta + 起價）
 *
 * 4 條都有時用兩欄、filter 後可能 1-2 條時撐滿。
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  SUN,
  SectionLabel,
  Chip,
  CATEGORIES,
  CATEGORY_LABEL,
  HairLine,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  onSelectTour: (slug: string) => void;
};

type FilterValue = 'all' | Tour['category'];

export default function ListingView({ onSelectTour }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const list = useMemo(() => {
    if (filter === 'all') return tours;
    return tours.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div style={{ background: SUN.sand, color: SUN.ink }}>
      {/* Header */}
      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>All Journeys</SectionLabel>
          <h1
            className="font-display font-light mt-8 leading-[1.1] text-[44px] md:text-[72px]"
            style={{ color: SUN.ink }}
          >
            2026 年度
            <br />
            行程一覽
          </h1>
          <p
            className="mt-10 max-w-2xl text-base md:text-lg leading-[1.95]"
            style={{ color: SUN.inkSoft }}
          >
            從千年京都到南半球荒野、從馬爾地夫水上屋到北極圈極光獵人。
            一年精選四條深度路線、每團不超過 14 人。
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 md:px-12 pb-12">
        <div className="mx-auto max-w-7xl">
          <HairLine />
          <div className="py-8 flex flex-wrap items-center gap-3">
            <span
              className="font-display text-xs tracking-[0.3em] uppercase mr-4"
              style={{ color: SUN.inkFaint }}
            >
              Filter ·
            </span>
            <Chip
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              全部
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
          <HairLine />
        </div>
      </section>

      {/* List */}
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between mb-12">
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: SUN.inkFaint }}
            >
              共 {list.length} 條行程
            </span>
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: SUN.inkFaint }}
            >
              {filter === 'all' ? 'ALL' : CATEGORY_LABEL[filter]}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20"
            >
              {list.map((tour, i) => (
                <ListingCard
                  key={tour.slug}
                  tour={tour}
                  index={i}
                  onClick={() => onSelectTour(tour.slug)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <div className="py-32 text-center">
              <p
                className="font-display text-xl"
                style={{ color: SUN.inkSoft }}
              >
                此分類暫無行程、請切換其他類別。
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
// Listing card
// ─────────────────────────────────────────────────────

function ListingCard({
  tour,
  index,
  onClick,
}: {
  tour: Tour;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden mb-8">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute top-5 left-5">
          <span
            className="font-display text-[10px] tracking-[0.4em] uppercase px-3 py-1.5"
            style={{
              background: 'rgba(244,233,216,0.92)',
              color: SUN.ink,
            }}
          >
            {CATEGORY_LABEL[tour.category]}
          </span>
        </div>
        <div
          className="absolute bottom-5 right-5 px-4 py-2 font-mono text-xs tracking-wider"
          style={{
            background: SUN.night,
            color: SUN.sandLight,
          }}
        >
          {tour.duration}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <MapPin size={14} strokeWidth={1.5} style={{ color: SUN.goldDeep }} />
        <span
          className="font-display text-xs tracking-[0.3em] uppercase"
          style={{ color: SUN.goldDeep }}
        >
          {tour.destination}
        </span>
      </div>

      <h3
        className="font-display font-light leading-tight text-3xl md:text-[34px] mb-4 group-hover:underline underline-offset-[10px] decoration-1 transition-all"
        style={{ color: SUN.ink }}
      >
        {tour.title}
      </h3>
      <p
        className="text-base leading-[1.85] mb-8"
        style={{ color: SUN.inkSoft }}
      >
        {tour.subtitle}
      </p>

      <HairLine />

      <div className="pt-6 flex items-end justify-between gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Calendar
              size={13}
              strokeWidth={1.5}
              style={{ color: SUN.inkFaint }}
            />
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: SUN.inkFaint }}
            >
              {tour.departureDates.length} 個出發日
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Users
              size={13}
              strokeWidth={1.5}
              style={{ color: SUN.inkFaint }}
            />
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: SUN.inkFaint }}
            >
              {tour.groupSize.min}–{tour.groupSize.max} 人小團
            </span>
          </div>
        </div>

        <div className="text-right">
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-1"
            style={{ color: SUN.inkFaint }}
          >
            From
          </span>
          <span
            className="font-display text-2xl"
            style={{ color: SUN.ink }}
          >
            {formatPrice(tour.priceFrom)}
          </span>
          <span
            className="font-mono text-[10px] tracking-wider block mt-1"
            style={{ color: SUN.inkFaint }}
          >
            起 / 人
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3 font-display text-xs tracking-[0.3em] uppercase"
        style={{ color: SUN.ink }}
      >
        <span className="transition-all group-hover:tracking-[0.4em]">
          查看行程
        </span>
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </motion.article>
  );
}
