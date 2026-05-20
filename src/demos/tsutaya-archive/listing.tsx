'use client';

/**
 * Listing — 書目一覽（4 條 tour）
 *
 * 結構：
 *   1. Topbar
 *   2. 頁面 header（書目索引感）
 *   3. Filter（書架分類）
 *   4. Index 表頭（藏書 / 書名 / 卷 / 自）
 *   5. List rows — 橫式書目索引列
 *        左圖（4:5 直幅、書頁夾照感）/ 中書名段落 / 右起價 + 書籤
 *
 * 跟 muji listing 的差異：
 *   - muji 是工業 catalog list、藏書編號 No. 001
 *   - 蔦屋是「書屋書目索引」、藏書 042、卷號、書籤式 hover
 *   - 圖用 4:5 直幅（書頁夾照）、不是 4:3
 *   - 列前加「書屋編目卡」感小區（藏書、卷次、頁碼）
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  TSUTAYA,
  ArchiveTag,
  BookTitle,
  CategoryPill,
  Hair,
  DoubleHair,
  BookmarkLink,
  FolioMark,
  PageNumber,
  CATEGORIES,
  CATEGORY_LABEL,
  volName,
} from './shared';
import { TsutayaTopbar, TsutayaFooter } from './home';

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
    <div style={{ background: TSUTAYA.paper, color: TSUTAYA.ink }}>
      <TsutayaTopbar
        onHome={onHome}
        onSeeAll={() => undefined}
        active="shelf"
        rightLabel="書目 / Bookshelf"
      />

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-12">
        <div className="mx-auto max-w-6xl">
          <ArchiveTag vol={volName(2)}>Bookshelf</ArchiveTag>
          <BookTitle
            level={1}
            className="mt-8"
            subtitle="本店本季的四本書、與往年沉澱下的其他書目。"
          >
            二〇二六年度
            <br />
            書目一覽
          </BookTitle>
        </div>
      </section>

      {/* ─────────────── Filter（書架分類牌） ─────────────── */}
      <section className="px-6 md:px-12 pb-10">
        <div className="mx-auto max-w-6xl">
          <DoubleHair />
          <div className="py-8 flex flex-wrap items-center gap-3">
            <span
              className="font-display text-xs mr-5"
              style={{
                color: TSUTAYA.brown,
                letterSpacing: '0.25em',
              }}
            >
              書架
            </span>
            <CategoryPill
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              全部
            </CategoryPill>
            {CATEGORIES.map((c) => (
              <CategoryPill
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
              </CategoryPill>
            ))}
          </div>
          <Hair />
        </div>
      </section>

      {/* ─────────────── Result counter（書目計數） ─────────────── */}
      <section className="px-6 md:px-12 pb-10">
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <span
            className="font-body text-xs"
            style={{
              color: TSUTAYA.brown,
              letterSpacing: '0.15em',
            }}
          >
            本架共 {String(list.length).padStart(2, '0')} 本
          </span>
          <span
            className="font-body text-xs"
            style={{
              color: TSUTAYA.brownFaint,
              letterSpacing: '0.15em',
            }}
          >
            {filter === 'all' ? '全部書架' : CATEGORY_LABEL[filter]}
          </span>
        </div>
      </section>

      {/* ─────────────── List rows ─────────────── */}
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <DoubleHair />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {list.map((tour, i) => (
                <BookshelfRow
                  key={tour.slug}
                  tour={tour}
                  index={i}
                  total={list.length}
                  onClick={() => onSelectTour(tour.slug)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <div className="py-32 text-center">
              <p
                className="font-display text-base"
                style={{ color: TSUTAYA.brownSoft }}
              >
                此書架暫無書目、請挑選其他類別。
              </p>
            </div>
          )}
        </div>
      </section>

      <TsutayaFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// BookshelfRow — 書屋書目索引列
//
// 排版：
//   - 左：書頁夾照（4:5 直幅）+ 圖說
//   - 中：藏書編號 + 卷號 + 書名 + 副標 + features
//   - 右：起價 + 書籤式 hover
// 細線分隔、像書末書目索引頁
// ─────────────────────────────────────────────────────

function BookshelfRow({
  tour,
  index,
  total,
  onClick,
}: {
  tour: Tour;
  index: number;
  total: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
      }}
      className="group block w-full text-left py-12 md:py-14"
      style={{ borderBottom: `1px solid ${TSUTAYA.lineSoft}` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
        {/* 左：書頁夾照 */}
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-opacity duration-700 group-hover:opacity-90"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ boxShadow: `inset 0 0 0 1px ${TSUTAYA.line}` }}
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <FolioMark n={index + 1} />
            <span
              className="font-body text-[10px]"
              style={{
                color: TSUTAYA.brownFaint,
                letterSpacing: '0.15em',
              }}
            >
              {tour.destination}
            </span>
          </div>
        </div>

        {/* 中：書名 + 副標 + 特色 */}
        <div className="md:col-span-5">
          {/* 卷號 + 類別（雙橫向） */}
          <div className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display text-xs"
              style={{
                color: TSUTAYA.brown,
                letterSpacing: '0.2em',
                fontWeight: 500,
              }}
            >
              卷 {volName(index + 1)}
            </span>
            <span
              aria-hidden
              className="block w-px h-3"
              style={{ background: TSUTAYA.line }}
            />
            <span
              className="font-body text-xs"
              style={{
                color: TSUTAYA.brownSoft,
                letterSpacing: '0.15em',
              }}
            >
              {CATEGORY_LABEL[tour.category]} · {tour.duration}
            </span>
          </div>

          {/* 書名 */}
          <h3
            className="font-display text-xl md:text-2xl leading-[1.35] mb-5"
            style={{ color: TSUTAYA.ink, fontWeight: 500 }}
          >
            <span className="inline border-b border-transparent transition-colors duration-500 group-hover:border-current pb-[2px]">
              {tour.title}
            </span>
          </h3>

          {/* 副標 */}
          <p
            className="font-body text-sm leading-[2.05] mb-8"
            style={{ color: TSUTAYA.brownSoft }}
          >
            {tour.subtitle}
          </p>

          {/* 細書頁線 + 特色 */}
          <Hair color={TSUTAYA.lineSoft} />
          <div className="pt-5 flex flex-wrap gap-x-7 gap-y-2">
            {tour.features.slice(0, 3).map((f, i) => (
              <span
                key={i}
                className="inline-flex items-baseline gap-2 font-body text-xs"
                style={{ color: TSUTAYA.brownSoft }}
              >
                <span
                  aria-hidden
                  className="block"
                  style={{
                    width: 4,
                    height: 4,
                    background: TSUTAYA.brown,
                  }}
                />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* 右：價格 + 書籤 */}
        <div className="md:col-span-3 flex md:flex-col md:items-end items-baseline justify-between md:justify-start gap-4">
          <div className="md:text-right">
            <span
              className="font-body text-[10px] block mb-1"
              style={{
                color: TSUTAYA.brownFaint,
                letterSpacing: '0.2em',
              }}
            >
              自
            </span>
            <span
              className="font-display text-2xl md:text-3xl block"
              style={{ color: TSUTAYA.ink, fontWeight: 500 }}
            >
              {formatPrice(tour.priceFrom)}
            </span>
            <span
              className="font-body text-[10px] block mt-2"
              style={{
                color: TSUTAYA.brownFaint,
                letterSpacing: '0.15em',
              }}
            >
              一位旅人
            </span>
          </div>

          {/* 書籤式 hover、頁碼 */}
          <div className="md:mt-10 flex md:flex-col items-baseline md:items-end gap-3">
            <BookmarkLink>翻開細讀</BookmarkLink>
            <PageNumber n={index + 1} total={total} />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
