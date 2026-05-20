'use client';

/**
 * Listing — 4 條 tour 列表
 *
 * 結構：
 *   - 頁面 header（標題 + 副標、海島語氣）
 *   - Category filter chips（全部 + 4 個 category、蜜月排第一）
 *   - List：橫向卡片（左圖右文）、跟 mediterranean-sun 的直立卡不同
 *
 * 海島風格細節：
 *   - 排序：蜜月 > 探險 > 文化 > 極光（島嶼 demo 優先推蜜月）
 *   - 用橫向 row layout 而非 grid 2x2、給每張卡更多呼吸
 *   - 細水平線當每張卡的 separator、像海平面切割
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  SEA,
  SectionLabel,
  Chip,
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  SeaLine,
  EASE_OUT,
  IslandFooter,
} from './shared';

// 海島 demo 排序：蜜月 > 探險 > 文化 > 極光
const ORDER: Record<Tour['category'], number> = {
  honeymoon: 0,
  adventure: 1,
  culture: 2,
  aurora: 3,
};

type Props = {
  onSelectTour: (slug: string) => void;
  onBack: () => void;
};

type FilterValue = 'all' | Tour['category'];

export default function ListingView({ onSelectTour, onBack }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const list = useMemo(() => {
    const sorted = [...tours].sort((a, b) => ORDER[a.category] - ORDER[b.category]);
    if (filter === 'all') return sorted;
    return sorted.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div style={{ background: SEA.foam, color: SEA.ink }}>
      {/* Header */}
      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 mb-14"
            style={{ color: SEA.deep, fontWeight: 300 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回首頁
          </button>

          <SectionLabel>All Journeys</SectionLabel>
          <h1
            className="font-display mt-10 leading-[1.1] text-[44px] md:text-[80px]"
            style={{
              color: SEA.deep,
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}
          >
            2026 年度
            <br />
            行程一覽
          </h1>
          <p
            className="mt-12 max-w-2xl text-base md:text-lg leading-[2.1]"
            style={{ color: SEA.inkSoft }}
          >
            從馬爾地夫水上屋到紐西蘭冰川、從千年京都到北極圈綠光。
            一年精選四條深度路線、每團不超過 14 人、蜜月與私訂優先安排。
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 md:px-12 pb-16">
        <div className="mx-auto max-w-7xl">
          <SeaLine />

          <div className="py-10 flex flex-wrap items-center gap-3">
            <span
              className="font-display text-[10px] tracking-[0.4em] uppercase mr-6"
              style={{ color: SEA.inkFaint, fontWeight: 300 }}
            >
              Filter
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
          <SeaLine />
        </div>
      </section>

      {/* List */}
      <section className="px-6 md:px-12 pb-32 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between mb-16">
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: SEA.inkFaint }}
            >
              共 {list.length} 條行程
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: SEA.inkFaint }}
            >
              {filter === 'all' ? 'ALL · 全部' : CATEGORY_LABEL_EN[filter]}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="space-y-20 md:space-y-28"
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
                className="font-display text-xl leading-relaxed"
                style={{ color: SEA.inkSoft, fontWeight: 300 }}
              >
                此分類暫無行程、請切換其他類別。
              </p>
            </div>
          )}
        </div>
      </section>

      <IslandFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Listing card — 橫向 row、左大圖、右文字（跟 mediterranean grid 不同）
// 偶數 index 圖在左、奇數圖在右（alternating、像海浪交錯）
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
  const imageOnRight = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: EASE_OUT,
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center ${
          imageOnRight ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Image */}
        <div className="md:col-span-7 relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute top-6 left-6">
            <span
              className="font-display text-[10px] tracking-[0.45em] uppercase px-4 py-2"
              style={{
                background: 'rgba(240,248,250,0.92)',
                color: SEA.deep,
                fontWeight: 300,
              }}
            >
              {CATEGORY_LABEL[tour.category]}
            </span>
          </div>
          <div
            className="absolute bottom-6 right-6 px-5 py-3 font-mono text-xs tracking-wider"
            style={{
              background: SEA.deep,
              color: SEA.foamLight,
            }}
          >
            {tour.duration}
          </div>
        </div>

        {/* Text */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <MapPin size={13} strokeWidth={1.5} style={{ color: SEA.ocean }} />
            <span
              className="font-display text-[10px] tracking-[0.4em] uppercase"
              style={{ color: SEA.ocean, fontWeight: 300 }}
            >
              {tour.destination}
            </span>
          </div>

          <h3
            className="font-display leading-tight text-3xl md:text-[42px] mb-6 group-hover:underline underline-offset-[12px] decoration-1 transition-all"
            style={{
              color: SEA.deep,
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}
          >
            {tour.title}
          </h3>
          <p
            className="text-base leading-[2] mb-10"
            style={{ color: SEA.inkSoft }}
          >
            {tour.subtitle}
          </p>

          <SeaLine />

          <div className="pt-8 flex items-end justify-between gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Calendar
                  size={13}
                  strokeWidth={1.5}
                  style={{ color: SEA.inkFaint }}
                />
                <span
                  className="font-mono text-xs tracking-wider"
                  style={{ color: SEA.inkFaint }}
                >
                  {tour.departureDates.length} 個出發日
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users
                  size={13}
                  strokeWidth={1.5}
                  style={{ color: SEA.inkFaint }}
                />
                <span
                  className="font-mono text-xs tracking-wider"
                  style={{ color: SEA.inkFaint }}
                >
                  {tour.groupSize.min}–{tour.groupSize.max} 人小團
                </span>
              </div>
            </div>

            <div className="text-right">
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-2"
                style={{ color: SEA.inkFaint }}
              >
                From
              </span>
              <span
                className="font-display text-2xl md:text-3xl"
                style={{
                  color: SEA.deep,
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                {formatPrice(tour.priceFrom)}
              </span>
              <span
                className="font-mono text-[10px] tracking-wider block mt-1"
                style={{ color: SEA.inkFaint }}
              >
                起 / 人
              </span>
            </div>
          </div>

          <div
            className="mt-10 flex items-center gap-4 font-display text-[11px] tracking-[0.4em] uppercase"
            style={{ color: SEA.deep, fontWeight: 300 }}
          >
            <span className="transition-all group-hover:tracking-[0.5em]">
              查看行程細節
            </span>
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
