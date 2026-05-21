'use client';

/**
 * Listing — 4 條 tour 列表
 *
 * 結構（reference 風格：blog-list-centered 居中對齊 + Title Case）：
 *   1. Header（Eyebrow + Italiana 大標 + 居中 intro）
 *   2. Filter chips（rounded pill、reference 慣用 pill 形狀）
 *   3. Centered list（圖 + 編號 + Italiana 標題 + 居中 meta）
 *   4. Footer
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  WA,
  fontClass,
  serif,
  sans,
  Eyebrow,
  DisplayTitle,
  BodyText,
  Divider,
  CATEGORIES,
  CATEGORY_SHORT,
} from './shared';
import { TopBar, CornerFooter } from './home';

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
    <div
      className={fontClass}
      style={{ background: WA.creamWarm, color: WA.ink, ...sans }}
    >
      <TopBar variant="solid" />

      {/* ────────────── Header ────────────── */}
      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-16">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>All Journeys</Eyebrow>
          <div className="mt-12">
            <DisplayTitle size="lg" align="center">
              The Full Index
              <br />
              Of 2026.
            </DisplayTitle>
          </div>
          <div className="mt-12 max-w-2xl mx-auto">
            <BodyText size="lg" align="center">
              四條深度路線、覆蓋一整年。
              <br />
              從千年京都到南半球荒野、從馬爾地夫水上屋到北極圈極光。
            </BodyText>
          </div>
        </div>
      </section>

      {/* ────────────── Filter Pills ────────────── */}
      <section className="px-6 md:px-12 pb-20">
        <div className="mx-auto max-w-4xl">
          <Divider color={WA.line} />

          <div className="py-10 flex flex-wrap items-center justify-center gap-3">
            <FilterPill
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All Trips
            </FilterPill>
            {CATEGORIES.map((c) => (
              <FilterPill
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.short}
              </FilterPill>
            ))}
          </div>

          <Divider color={WA.line} />

          {/* Result count */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <span
              className="text-[10px] tracking-[0.32em] uppercase"
              style={{ ...sans, color: WA.inkFaint, fontWeight: 500 }}
            >
              Showing
            </span>
            <span
              className="text-[26px]"
              style={{ ...serif, color: WA.forest }}
            >
              {String(list.length).padStart(2, '0')}
            </span>
            <span
              className="text-[10px] tracking-[0.32em] uppercase"
              style={{ ...sans, color: WA.inkFaint, fontWeight: 500 }}
            >
              {filter === 'all'
                ? 'Curated Trips'
                : `${CATEGORY_SHORT[filter]} Trips`}
            </span>
          </div>
        </div>
      </section>

      {/* ────────────── List（centered） ────────────── */}
      <section className="px-6 md:px-12 pb-32 md:pb-44">
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-32 md:space-y-44"
            >
              {list.map((tour, i) => (
                <ListingItem
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
                className="text-xl"
                style={{ ...serif, color: WA.inkSoft }}
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
// Filter pill（reference 圓角 pill 風格）
// ─────────────────────────────────────────────────────

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="h-11 px-7 rounded-full text-[11px] tracking-[0.28em] uppercase transition-all"
      style={{
        ...sans,
        fontWeight: 500,
        background: active ? WA.ink : 'transparent',
        color: active ? WA.creamLight : WA.inkSoft,
        border: `1px solid ${active ? WA.ink : WA.line}`,
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Listing item — 居中對齊的大卡（reference blog-list-centered）
// ─────────────────────────────────────────────────────

function ListingItem({
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
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-center cursor-pointer group"
      onClick={onClick}
    >
      {/* Big image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden mb-12">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 80vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
        <span
          className="absolute top-6 left-6 px-4 py-2 text-[10px] tracking-[0.32em] uppercase rounded-full"
          style={{
            ...sans,
            background: 'rgba(252,239,223,0.94)',
            color: WA.ink,
            fontWeight: 500,
          }}
        >
          {CATEGORY_SHORT[tour.category]}
        </span>
        <span
          className="absolute top-6 right-6 inline-flex items-baseline gap-1 px-4 py-2 rounded-full"
          style={{
            ...sans,
            background: 'rgba(26,26,26,0.55)',
            color: WA.creamLight,
            fontWeight: 500,
          }}
        >
          <span className="text-base" style={serif}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs opacity-60">/</span>
          <span className="text-xs opacity-60">
            {String(total).padStart(2, '0')}
          </span>
        </span>
      </div>

      {/* Meta line — reference: 「Category · Date · Author」 */}
      <div
        className="text-[11px] tracking-[0.32em] uppercase flex items-center justify-center gap-6 mb-8"
        style={{ ...sans, color: WA.forest, fontWeight: 500 }}
      >
        <span>{tour.destination}</span>
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full"
          style={{ background: WA.sage }}
        />
        <span>{tour.duration}</span>
        <span
          aria-hidden
          className="block w-1 h-1 rounded-full"
          style={{ background: WA.sage }}
        />
        <span>
          {tour.groupSize.min}–{tour.groupSize.max} Guests
        </span>
      </div>

      {/* Italiana big title */}
      <h3
        className="text-[36px] md:text-[64px] leading-[1.08] tracking-[-0.005em] max-w-3xl mx-auto transition-opacity group-hover:opacity-70"
        style={{ ...serif, color: WA.ink, fontWeight: 400 }}
      >
        {tour.title}
      </h3>

      <p
        className="mt-8 text-[15px] md:text-base leading-[1.95] max-w-xl mx-auto"
        style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
      >
        {tour.subtitle}
      </p>

      {/* Bottom: price + CTA */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8">
        <div className="text-center">
          <span
            className="text-[10px] tracking-[0.32em] uppercase block mb-2"
            style={{ ...sans, color: WA.inkFaint, fontWeight: 500 }}
          >
            From
          </span>
          <span
            className="text-3xl"
            style={{ ...serif, color: WA.ink }}
          >
            {formatPrice(tour.priceFrom)}
          </span>
          <span
            className="text-[10px] tracking-[0.32em] uppercase block mt-2"
            style={{ ...sans, color: WA.inkFaint, fontWeight: 500 }}
          >
            Per Guest
          </span>
        </div>

        <span
          aria-hidden
          className="hidden sm:block h-12 w-px"
          style={{ background: WA.line }}
        />

        <span
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase transition-all"
          style={{ ...sans, color: WA.ink, fontWeight: 500 }}
        >
          <span className="transition-all group-hover:tracking-[0.4em]">
            View Journey
          </span>
          <ArrowRight
            size={13}
            strokeWidth={1.2}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.article>
  );
}
