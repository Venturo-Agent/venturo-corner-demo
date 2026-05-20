'use client';

/**
 * Listing — 4 條 tour 列表
 *
 * 結構：
 *   - Topbar（保持風格一致）
 *   - 頁面 header（極短）
 *   - filter pill（方角、無漸層）
 *   - List 表格式排版（不對稱、規則網格）
 *     → 跟 mediterranean 的 grid 不同：這裡用「商品索引表」感
 *     → 每條 tour 是一張橫式索引列：左圖 / 中標題與描述 / 右起價
 *
 * 無印感的關鍵：
 *   - 不用 grid-cols-2 大圖卡、用橫向 list row
 *   - 圖固定小尺寸、不超過 280px 寬
 *   - 整頁靠細線分隔、不靠陰影
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  MUJI,
  IndexLabel,
  SectionTitle,
  TagPill,
  Hair,
  BRAND,
  CATEGORIES,
  CATEGORY_LABEL,
} from './shared';
import { MujiFooter } from './home';

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
    <div style={{ background: MUJI.paper, color: MUJI.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="px-6 md:px-12 py-6"
        style={{ borderBottom: `1px solid ${MUJI.line}` }}
      >
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onHome}
            className="flex items-baseline gap-4 transition-opacity hover:opacity-60"
          >
            <span
              className="font-display text-base"
              style={{
                color: MUJI.ink,
                fontWeight: 500,
                letterSpacing: '0.08em',
              }}
            >
              {BRAND.marque}
            </span>
            <span
              className="hidden md:inline font-body text-xs"
              style={{ color: MUJI.wood }}
            >
              {BRAND.marqueZh}
            </span>
          </button>
          <span
            className="font-mono text-xs"
            style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
          >
            Catalog / All
          </span>
        </div>
      </header>

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-12">
        <div className="mx-auto max-w-6xl">
          <IndexLabel index="002">All Journeys</IndexLabel>
          <SectionTitle level={1} className="mt-6">
            2026 年度
            <br />
            行程一覽
          </SectionTitle>
          <p
            className="mt-8 max-w-xl text-sm md:text-base leading-[2]"
            style={{ color: MUJI.inkMid }}
          >
            從千年京都到南半球荒野、從馬爾地夫水上屋到北極圈極光。
            <br />
            一年精選四條深度路線、每團不超過 14 人。
          </p>
        </div>
      </section>

      {/* ─────────────── Filter ─────────────── */}
      <section className="px-6 md:px-12 pb-8">
        <div className="mx-auto max-w-6xl">
          <Hair />
          <div className="py-8 flex flex-wrap items-center gap-3">
            <span
              className="font-mono text-xs mr-4"
              style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
            >
              Filter
            </span>
            <TagPill
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              全部
            </TagPill>
            {CATEGORIES.map((c) => (
              <TagPill
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
              </TagPill>
            ))}
          </div>
          <Hair />
        </div>
      </section>

      {/* ─────────────── Result counter ─────────────── */}
      <section className="px-6 md:px-12 pb-8">
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <span
            className="font-mono text-xs"
            style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
          >
            共 {String(list.length).padStart(2, '0')} 條行程
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
          >
            {filter === 'all' ? '/ All' : `/ ${CATEGORY_LABEL[filter]}`}
          </span>
        </div>
      </section>

      {/* ─────────────── List rows ─────────────── */}
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Hair />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
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
            <div className="py-32 text-center">
              <p
                className="font-display text-base"
                style={{ color: MUJI.inkMid }}
              >
                此分類暫無行程、請切換其他類別。
              </p>
            </div>
          )}
        </div>
      </section>

      <MujiFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ListingRow — 橫式索引列、商品 catalog 風
//
// 排版：左圖（260px）/ 中內容（fluid）/ 右起價（160px）
// hover：圖 opacity、標題 underline 出現
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
      }}
      className="group block w-full text-left py-10 md:py-12"
      style={{ borderBottom: `1px solid ${MUJI.line}` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* 左：圖 */}
        <div className="md:col-span-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-opacity duration-500 group-hover:opacity-90"
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span
              className="font-mono text-[10px]"
              style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
            >
              No. {String(index + 1).padStart(3, '0')}
            </span>
            <span
              className="font-mono text-[10px]"
              style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
            >
              {tour.destination}
            </span>
          </div>
        </div>

        {/* 中：內容 */}
        <div className="md:col-span-5">
          <span
            className="font-mono text-xs block mb-3"
            style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
          >
            {CATEGORY_LABEL[tour.category]} / {tour.duration}
          </span>
          <h3
            className="font-display text-xl md:text-2xl leading-snug mb-4"
            style={{ color: MUJI.ink, fontWeight: 500 }}
          >
            <span className="border-b border-transparent group-hover:border-current pb-[2px] transition-colors">
              {tour.title}
            </span>
          </h3>
          <p
            className="font-body text-sm leading-[2] mb-6"
            style={{ color: MUJI.inkMid }}
          >
            {tour.subtitle}
          </p>

          {/* features 用方塊 marker、不用 bullet */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {tour.features.slice(0, 3).map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 font-body text-xs"
                style={{ color: MUJI.inkMid }}
              >
                <span
                  aria-hidden
                  className="block"
                  style={{
                    width: 4,
                    height: 4,
                    background: MUJI.wood,
                  }}
                />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* 右：起價 + arrow */}
        <div className="md:col-span-3 flex md:flex-col md:items-end items-baseline justify-between md:justify-start gap-4">
          <div className="md:text-right">
            <span
              className="font-mono text-[10px] block mb-1"
              style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
            >
              from
            </span>
            <span
              className="font-display text-xl md:text-2xl block"
              style={{ color: MUJI.ink, fontWeight: 500 }}
            >
              {formatPrice(tour.priceFrom)}
            </span>
            <span
              className="font-mono text-[10px] block mt-1"
              style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
            >
              起 / 人
            </span>
          </div>
          <div className="md:mt-8">
            <span
              className="inline-flex items-center gap-3 font-body text-xs transition-opacity group-hover:opacity-60"
              style={{ color: MUJI.ink, letterSpacing: '0.06em' }}
            >
              查看
              <span
                aria-hidden
                className="block w-6 h-px transition-all group-hover:w-10"
                style={{ background: MUJI.ink }}
              />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
