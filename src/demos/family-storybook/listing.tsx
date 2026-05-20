'use client';

/**
 * Listing — 故事目錄、像繪本翻到「目錄頁」
 *
 * 結構：
 *   - Header：標題 + 副標 + 飄浮裝飾
 *   - Filter chips：全部 + 4 個類別
 *   - 4 條 tour 以繪本目錄樣式陳列、左 SVG + 右資訊
 *   - 每條卡可點開 detail
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  BOOK,
  ChapterLabel,
  Chip,
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_TAG,
  CATEGORY_AGE,
  CategoryIcon,
  StorybookCard,
  StickerBadge,
  HairLine,
  Star,
  Sun,
  Cloud,
  Bird,
  Tree,
  PaperPlane,
  FloatingDecor,
} from './shared';
import { StorybookFooter } from './home';

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
    <div style={{ background: BOOK.paper, color: BOOK.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 pt-20 md:pt-28 pb-16"
        style={{
          background: `linear-gradient(180deg, ${BOOK.paperLight} 0%, ${BOOK.paper} 100%)`,
        }}
      >
        <FloatingDecor className="absolute top-12 left-[6%]" delay={0}>
          <Cloud size={120} color={BOOK.cream} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-20 right-[8%]" delay={1.5}>
          <Sun size={88} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-12 left-[18%]" delay={0.8}>
          <Bird size={40} color={BOOK.ink} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-6xl">
          <button
            onClick={onHome}
            className="inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wider mb-10 transition-all hover:gap-3"
            style={{ color: BOOK.orangeDeep }}
          >
            <span aria-hidden>←</span>
            回到封面
          </button>

          <ChapterLabel>Table of Contents</ChapterLabel>
          <h1
            className="mt-8 font-display font-semibold leading-[1.05] text-[48px] md:text-[88px]"
            style={{ color: BOOK.ink }}
          >
            故事
            <span style={{ color: BOOK.orangeDeep }}>目錄</span>
          </h1>
          <p
            className="mt-8 max-w-2xl font-body text-base md:text-lg leading-[1.95]"
            style={{ color: BOOK.inkSoft }}
          >
            從千年京都到南半球荒野、從印度洋珊瑚礁到北極圈綠光、
            <br />
            四本厚厚的故事書、慢慢翻、選一本最想跟孩子一起讀的。
          </p>
        </div>
      </section>

      {/* ─────────────── Filter ─────────────── */}
      <section className="px-6 md:px-12 py-10 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="font-body font-semibold text-xs tracking-[0.28em] uppercase mr-3"
              style={{ color: BOOK.inkFaint }}
            >
              想看哪一種故事
            </span>
            <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
              全部
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
                icon={<CategoryIcon category={c.value} size={20} />}
              >
                {c.label}
              </Chip>
            ))}
          </div>

          <HairLine dashed />

          <div className="pt-6 flex items-center justify-between">
            <p
              className="font-body text-sm"
              style={{ color: BOOK.inkSoft }}
            >
              共 <span className="font-semibold">{list.length}</span> 本故事
            </p>
            <p
              className="font-body text-sm font-semibold"
              style={{ color: BOOK.orangeDeep }}
            >
              {filter === 'all' ? '全部故事' : CATEGORY_LABEL[filter]}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── List ─────────────── */}
      <section className="px-6 md:px-12 pb-24 md:pb-32 relative overflow-hidden">
        <FloatingDecor className="absolute top-32 right-[3%]" delay={2.2}>
          <Star size={32} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-40 left-[4%]" delay={1.2}>
          <Tree size={64} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-[60%] right-[6%]" delay={0.4}>
          <PaperPlane size={48} color={BOOK.skyDeep} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-6xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
              className="space-y-12 md:space-y-16"
            >
              {list.map((tour, i) => (
                <BookListing
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
                className="font-display font-semibold text-2xl"
                style={{ color: BOOK.inkSoft }}
              >
                這個分類還沒有故事、換一個類別看看吧
              </p>
            </div>
          )}
        </div>
      </section>

      <StorybookFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Book listing — 像繪本內頁的目錄列
// ─────────────────────────────────────────────────────

function BookListing({
  tour,
  index,
  onClick,
}: {
  tour: Tour;
  index: number;
  onClick: () => void;
}) {
  const isOdd = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.34, 1.2, 0.64, 1],
      }}
      whileHover={{ y: -4 }}
      className="cursor-pointer group"
      onClick={onClick}
    >
      <StorybookCard className="overflow-hidden">
        <div
          className={`grid grid-cols-1 md:grid-cols-12 ${
            isOdd ? 'md:[direction:rtl]' : ''
          }`}
        >
          {/* Image */}
          <div
            className="md:col-span-7 relative aspect-[4/3] md:aspect-auto md:min-h-[420px]"
            style={{ direction: 'ltr' }}
          >
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* 圖上 sticker */}
            <div className="absolute top-6 left-6 flex flex-col gap-3 items-start">
              <StickerBadge color={BOOK.cream} rotate={-3}>
                <Star size={12} color={BOOK.orange} />
                第 {String(index + 1).padStart(2, '0')} 本
              </StickerBadge>
              <StickerBadge color={BOOK.orange} rotate={2}>
                {CATEGORY_TAG[tour.category]}
              </StickerBadge>
            </div>

            {/* 圖角 — 翻頁書角 */}
            <div className="absolute bottom-0 right-0">
              <svg
                width={56}
                height={56}
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M 56 0 L 56 56 L 0 56 L 56 0 Z"
                  fill={BOOK.cream}
                />
                <path
                  d="M 56 28 L 28 56 L 56 56 Z"
                  fill={BOOK.paperWarm}
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div
            className="md:col-span-5 p-8 md:p-12 flex flex-col justify-between"
            style={{
              direction: 'ltr',
              background: BOOK.cream,
            }}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <CategoryIcon category={tour.category} size={32} />
                <p
                  className="font-body font-semibold text-xs tracking-[0.28em] uppercase"
                  style={{ color: BOOK.orangeDeep }}
                >
                  {CATEGORY_LABEL[tour.category]}
                </p>
              </div>

              <h3
                className="font-display font-semibold leading-[1.12] text-[28px] md:text-[36px] mb-5"
                style={{ color: BOOK.ink }}
              >
                {tour.title}
              </h3>

              <p
                className="font-body text-base leading-[1.9] mb-6"
                style={{ color: BOOK.inkSoft }}
              >
                {tour.subtitle}
              </p>

              {/* Meta items */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <MetaPill label="天數" value={tour.duration} />
                <MetaPill
                  label="適合"
                  value={CATEGORY_AGE[tour.category].replace('建議 ', '')}
                />
                <MetaPill
                  label="團人數"
                  value={`${tour.groupSize.min}–${tour.groupSize.max} 人`}
                />
                <MetaPill
                  label="出發日"
                  value={`${tour.departureDates.length} 個梯次`}
                />
              </div>
            </div>

            <div>
              <HairLine dashed />

              <div className="pt-6 flex items-end justify-between gap-4">
                <div>
                  <p
                    className="font-body text-xs tracking-wider mb-1"
                    style={{ color: BOOK.inkFaint }}
                  >
                    親子家庭起價
                  </p>
                  <p
                    className="font-display font-semibold text-2xl md:text-[28px]"
                    style={{ color: BOOK.ink }}
                  >
                    {formatPrice(tour.priceFrom)}
                  </p>
                </div>
                <div
                  className="font-body font-semibold text-sm tracking-wider inline-flex items-center gap-2 transition-all group-hover:gap-3"
                  style={{ color: BOOK.orangeDeep }}
                >
                  翻開
                  <span aria-hidden>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StorybookCard>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────
// Meta pill — 小資訊條
// ─────────────────────────────────────────────────────

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="px-4 py-3 rounded-2xl"
      style={{ background: BOOK.paperLight, border: `1.5px dashed ${BOOK.line}` }}
    >
      <p
        className="font-body text-[10px] tracking-[0.25em] uppercase mb-1"
        style={{ color: BOOK.inkFaint }}
      >
        {label}
      </p>
      <p
        className="font-body font-semibold text-sm leading-snug"
        style={{ color: BOOK.ink }}
      >
        {value}
      </p>
    </div>
  );
}
