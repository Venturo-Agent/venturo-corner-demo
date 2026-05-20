'use client';

/**
 * Listing — 4 條 tour 列表（北歐極簡奢華 Nordic Luxe）
 *
 * 跟 alpine listing 對比：
 *   - alpine 用「左右交錯橫排」、卡片左圖右文
 *   - nordic 用「hotel 房型 grid」：2 欄、每張像 hotel 房型卡（圖在上、caption 在圖下）
 *   - alpine filter 下劃線 chip 偏冷、nordic 偏更克制（字距 0.3em）
 *   - alpine 卡片有座標 N XX、nordic 卡片用編號 + caption「Room Type」 metaphor
 *
 * 結構：
 *   1. Header：左右兩欄、左標題右說明
 *   2. Filter：細水平線夾住、克制
 *   3. List：2 欄 grid（hotel catalog）、每張卡片：
 *      - 圖（aspect 4:5、上方）
 *      - 圖下 caption 條（左編號 + 右類別）
 *      - 標題
 *      - subtitle
 *      - 細線
 *      - meta row：duration / group / price
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  NORDIC,
  CaptionLabel,
  QuietLabel,
  NordicChip,
  CATEGORIES,
  CATEGORY_LABEL,
  HairLine,
  LightTitle,
  PhotoFrame,
  NORDIC_EASE,
  NORDIC_EASE_LONG,
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
    <div style={{ background: NORDIC.paper, color: NORDIC.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section className="px-10 md:px-20 pt-28 md:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <CaptionLabel>All Journeys</CaptionLabel>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-end">
            <div className="md:col-span-7">
              <LightTitle
                as="h1"
                className="text-[44px] md:text-[80px]"
                style={{ lineHeight: 1.05 }}
              >
                2026 年度
                <br />
                行程一覽
              </LightTitle>
            </div>
            <div className="md:col-span-5 md:pb-4">
              <div
                className="h-px w-12 mb-8"
                style={{ background: NORDIC.stone }}
              />
              <p
                className="text-[15px] leading-[2.1]"
                style={{ color: NORDIC.inkSoft }}
              >
                從千年京都到南半球荒野、從馬爾地夫水上屋到北極圈極光獵人。
                一年精選四條深度路線、每團不超過十四人。
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
            <QuietLabel color={NORDIC.inkFaint} className="mr-6">
              Filter
            </QuietLabel>
            <NordicChip
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              全部
            </NordicChip>
            {CATEGORIES.map((c) => (
              <NordicChip
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
              </NordicChip>
            ))}
          </div>
          <HairLine />
        </div>
      </section>

      {/* ─────────────── List ─────────────── */}
      <section className="px-10 md:px-20 pb-32 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between pt-10 pb-20">
            <span
              className="font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: NORDIC.stone }}
            >
              {String(list.length).padStart(2, '0')}  ·  Journeys
            </span>
            <span
              className="font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: NORDIC.stoneSoft }}
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
              transition={{ duration: 0.75, ease: NORDIC_EASE_LONG }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-28 md:gap-y-36"
            >
              {list.map((tour, i) => (
                <RoomCard
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
            <div className="py-44 text-center">
              <LightTitle as="h3" className="text-2xl" color={NORDIC.stone}>
                此分類暫無行程、請切換其他類別。
              </LightTitle>
            </div>
          )}
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// RoomCard — hotel 房型卡片：圖大、caption 在圖下方
// 跟 alpine ListingRow 對比：alpine 是橫排一條條左右交錯
//                            nordic 是 2 欄 grid、卡片內部上下排
// ─────────────────────────────────────────────────────

function RoomCard({
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 1.0,
        delay: (index % 2) * 0.12,
        ease: NORDIC_EASE,
      }}
      className="group text-left flex flex-col w-full"
    >
      {/* 上方 caption 條（圖之前）*/}
      <div className="flex items-center gap-4 mb-6">
        <span
          aria-hidden
          className="block"
          style={{
            width: 6,
            height: 6,
            background: NORDIC.stone,
          }}
        />
        <span
          className="font-mono text-[10px] tracking-[0.25em]"
          style={{ color: NORDIC.stone }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span
          aria-hidden
          className="block w-8 h-px"
          style={{ background: NORDIC.line }}
        />
        <QuietLabel>{CATEGORY_LABEL[tour.category]}</QuietLabel>
      </div>

      {/* 圖（aspect 4:5 直立、hotel 房型攝影感） */}
      <PhotoFrame aspect="aspect-[4/5]">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.018]"
          style={{ filter: 'grayscale(0.08) brightness(0.97)' }}
        />
      </PhotoFrame>

      {/* 圖下 caption：destination */}
      <div className="mt-6 flex items-baseline justify-between">
        <QuietLabel color={NORDIC.stoneSoft}>{tour.destination}</QuietLabel>
        <QuietLabel color={NORDIC.stoneSoft}>{tour.duration}</QuietLabel>
      </div>

      {/* 標題 */}
      <LightTitle
        as="h3"
        className="text-[28px] md:text-[36px] mt-8 transition-all group-hover:underline underline-offset-[14px] decoration-1"
        style={{ lineHeight: 1.18 }}
      >
        {tour.title}
      </LightTitle>

      {/* subtitle */}
      <p
        className="mt-6 text-[14px] md:text-[15px] leading-[2] max-w-md"
        style={{ color: NORDIC.inkSoft }}
      >
        {tour.subtitle}
      </p>

      {/* 細線 + meta */}
      <div className="mt-10">
        <HairLine />
        <div className="pt-6 grid grid-cols-3 gap-6 items-baseline">
          <div>
            <QuietLabel color={NORDIC.inkFaint}>Group</QuietLabel>
            <p
              className="font-mono text-[13px] tracking-wider mt-2"
              style={{ color: NORDIC.ink, fontWeight: 300 }}
            >
              {tour.groupSize.min}–{tour.groupSize.max}
            </p>
          </div>
          <div>
            <QuietLabel color={NORDIC.inkFaint}>Dates</QuietLabel>
            <p
              className="font-mono text-[13px] tracking-wider mt-2"
              style={{ color: NORDIC.ink, fontWeight: 300 }}
            >
              {tour.departureDates.length} 場
            </p>
          </div>
          <div className="text-right">
            <QuietLabel color={NORDIC.inkFaint}>From</QuietLabel>
            <p
              className="font-mono text-[15px] tracking-wider mt-2"
              style={{ color: NORDIC.ink, fontWeight: 300 }}
            >
              {formatPrice(tour.priceFrom)}
            </p>
          </div>
        </div>
      </div>

      {/* hover 浮現 CTA */}
      <div
        className="mt-10 flex items-center gap-3 font-display text-[10px] tracking-[0.3em] uppercase transition-opacity opacity-50 group-hover:opacity-100"
        style={{ color: NORDIC.ink, fontWeight: 400 }}
      >
        <span>View Journey</span>
        <ArrowRight
          size={13}
          strokeWidth={1.2}
          className="transition-transform group-hover:translate-x-1.5"
        />
      </div>
    </motion.button>
  );
}
