'use client';

/**
 * Listing — 4 條 tour 列表
 *
 * 結構：
 *   - 頁面 header（標題 + 副標、巴里熱帶語氣）
 *   - Category filter chips（葉脈圖示加在 active chip 上）
 *   - List：類似目錄 / 工藝清單的排版：左大圖 + 右文字 + 編號印章
 *     ← 跟 maldives 的「橫向 row alternating」不同：
 *       maldives = 海浪交錯
 *       bali     = 工藝清單、固定一致、像書籍目錄
 *
 * 細節：
 *   - 排序：蜜月 > 文化 > 探險 > 極光（巴里熱帶優先蜜月與文化）
 *   - 每張卡四角加 FrameCorners、像翻一本工藝雜誌的內頁
 *   - 編號用 StampNumber 印章式、加 LeafIcon
 *   - cards 之間用 DoubleCarved 雙刻線分隔
 *   - hover 不放大、改用「+左推進 6px + 葉子轉動」表達讀進去的感覺
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
  BALI,
  SectionLabel,
  Chip,
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  CarvedLine,
  DoubleCarved,
  EASE_OUT,
  EASE_LEAF,
  StampNumber,
  LeafIcon,
  LotusIcon,
  FrameCorners,
  WeavePattern,
  JungleFooter,
} from './shared';

// 巴里 demo 排序：蜜月 > 文化 > 探險 > 極光
const ORDER: Record<Tour['category'], number> = {
  honeymoon: 0,
  culture: 1,
  adventure: 2,
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
    const sorted = [...tours].sort(
      (a, b) => ORDER[a.category] - ORDER[b.category],
    );
    if (filter === 'all') return sorted;
    return sorted.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div style={{ background: BALI.coconut, color: BALI.ink }}>
      {/* Header */}
      <section className="relative px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20">
        <WeavePattern opacity={0.04} color={BALI.wood} />

        <div className="relative mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 mb-14"
            style={{ color: BALI.wood, fontWeight: 400 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回首頁
          </button>

          <SectionLabel>All Journeys</SectionLabel>
          <h1
            className="font-display mt-10 leading-[1.1] text-[44px] md:text-[80px]"
            style={{
              color: BALI.wood,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            2026 年度
            <br />
            行程一覽
          </h1>
          <p
            className="mt-12 max-w-2xl text-base md:text-lg leading-[2.1]"
            style={{ color: BALI.inkSoft }}
          >
            從巴里叢林到馬爾地夫水上屋、從千年京都到北極圈綠光。
            一年精選四條深度路線、每團不超過 14 人、蜜月與私訂優先安排。
            每條路線都由團隊親自跑完、所有合作夥伴公開可查。
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 md:px-12 pb-16">
        <div className="mx-auto max-w-7xl">
          <CarvedLine color={BALI.line} />

          <div className="py-10 flex flex-wrap items-center gap-3">
            <span
              className="font-display text-[10px] tracking-[0.45em] uppercase mr-5 inline-flex items-center gap-3"
              style={{ color: BALI.inkFaint, fontWeight: 400 }}
            >
              <LotusIcon size={11} color={BALI.spiceDeep} />
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

          <CarvedLine color={BALI.line} />
        </div>
      </section>

      {/* List */}
      <section className="px-6 md:px-12 pb-32 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between mb-12 md:mb-16">
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: BALI.inkFaint }}
            >
              共 {list.length} 條行程
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: BALI.inkFaint }}
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
            >
              {list.map((tour, i) => (
                <div key={tour.slug}>
                  <ListingCard
                    tour={tour}
                    index={i}
                    onClick={() => onSelectTour(tour.slug)}
                  />
                  {i < list.length - 1 && (
                    <DoubleCarved color={BALI.line} className="my-16 md:my-20" />
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <div className="py-32 text-center">
              <p
                className="font-display text-xl leading-relaxed"
                style={{ color: BALI.inkSoft, fontWeight: 400 }}
              >
                此分類暫無行程、請切換其他類別。
              </p>
            </div>
          )}
        </div>
      </section>

      <JungleFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Listing card — 一致的橫向 row（左圖右文）、編號印章在最左
// 跟 maldives「alternating」不同：巴里像書本目錄、一致排版
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
  const [hover, setHover] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: EASE_OUT,
      }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
        {/* 編號印章欄 — 巴里 demo 獨有 */}
        <div className="md:col-span-1 flex md:flex-col items-start gap-4">
          <StampNumber n={index + 1} tone="spice" />
          <motion.div
            animate={{ rotate: hover ? 14 : 0 }}
            transition={{ duration: 0.7, ease: EASE_LEAF }}
            className="hidden md:block"
          >
            <LeafIcon size={18} color={BALI.spiceDeep} />
          </motion.div>
        </div>

        {/* Image */}
        <div className="md:col-span-6 relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
            style={{
              filter: 'saturate(1.08) contrast(1.02) brightness(0.97)',
            }}
          />

          <FrameCorners
            color="rgba(244,236,224,0.7)"
            size={20}
            inset={12}
          />

          <div className="absolute top-6 left-6">
            <span
              className="font-display text-[10px] tracking-[0.45em] uppercase px-3 py-2 inline-flex items-center gap-2"
              style={{
                background: 'rgba(244,236,224,0.92)',
                color: BALI.wood,
                fontWeight: 400,
              }}
            >
              <LotusIcon size={10} color={BALI.spiceDeep} />
              {CATEGORY_LABEL[tour.category]}
            </span>
          </div>
          <div
            className="absolute bottom-6 right-6 px-4 py-2 font-mono text-xs tracking-wider"
            style={{
              background: BALI.wood,
              color: BALI.coconutLight,
            }}
          >
            {tour.duration}
          </div>
        </div>

        {/* Text */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <MapPin size={13} strokeWidth={1.5} style={{ color: BALI.spiceDeep }} />
            <span
              className="font-display text-[10px] tracking-[0.4em] uppercase"
              style={{ color: BALI.spiceDeep, fontWeight: 400 }}
            >
              {tour.destination}
            </span>
          </div>

          <h3
            className="font-display leading-tight text-3xl md:text-[40px] mb-5 transition-all group-hover:underline underline-offset-[12px] decoration-1"
            style={{
              color: BALI.wood,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            {tour.title}
          </h3>
          <p
            className="text-base leading-[2.05] mb-9"
            style={{ color: BALI.inkSoft }}
          >
            {tour.subtitle}
          </p>

          <CarvedLine color={BALI.line} />

          <div className="pt-7 flex items-end justify-between gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Calendar
                  size={13}
                  strokeWidth={1.5}
                  style={{ color: BALI.inkFaint }}
                />
                <span
                  className="font-mono text-xs tracking-wider"
                  style={{ color: BALI.inkFaint }}
                >
                  {tour.departureDates.length} 個出發日
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users
                  size={13}
                  strokeWidth={1.5}
                  style={{ color: BALI.inkFaint }}
                />
                <span
                  className="font-mono text-xs tracking-wider"
                  style={{ color: BALI.inkFaint }}
                >
                  {tour.groupSize.min}–{tour.groupSize.max} 人小團
                </span>
              </div>
            </div>

            <div className="text-right">
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-2"
                style={{ color: BALI.inkFaint }}
              >
                From
              </span>
              <span
                className="font-display text-2xl md:text-3xl"
                style={{
                  color: BALI.wood,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                {formatPrice(tour.priceFrom)}
              </span>
              <span
                className="font-mono text-[10px] tracking-wider block mt-1"
                style={{ color: BALI.inkFaint }}
              >
                起 / 人
              </span>
            </div>
          </div>

          <div
            className="mt-10 flex items-center gap-4 font-display text-[11px] tracking-[0.4em] uppercase"
            style={{ color: BALI.wood, fontWeight: 400 }}
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
