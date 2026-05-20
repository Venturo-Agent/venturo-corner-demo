'use client';

/**
 * Itinerary — day-by-day 日程
 *
 * 結構：
 *   1. Topbar（返回鍵）
 *   2. 頁面 header
 *   3. 主區：左 sticky day nav（更瘦：純數字、無城市名）+ 右 expandable day section
 *   4. CTA
 *   5. Footer
 *
 * 跟 mediterranean itinerary 的差異：
 *   - day nav 更瘦、只 mono 數字編號、不放城市
 *   - 每天 section 不用 Day 大字、用 mono 「Day 01」橫式 label
 *   - activity timeline 不用大金色方塊、用細線左邊一道 + mono 數字
 *   - meals / hotel 用規則 grid 表格、不用 card-with-frame
 *   - 收合 icon 用 plus/minus 細線 svg、不用 chunky icon
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  MUJI,
  IndexLabel,
  SectionTitle,
  MujiButton,
  Hair,
  BRAND,
} from './shared';
import { MujiFooter } from './home';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // intersection observer：scroll 到哪一天就高亮 nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const day = Number(
              (entry.target as HTMLDivElement).dataset.day,
            );
            if (!Number.isNaN(day)) setActiveDay(day);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      },
    );

    Object.values(daySectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tour.slug]);

  const toggleDay = (day: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const expandAll = () => {
    setOpenDays(new Set(tour.itinerary.map((d) => d.day)));
  };

  const collapseAll = () => {
    setOpenDays(new Set());
  };

  const scrollToDay = (day: number) => {
    const el = daySectionRefs.current[day];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpenDays((prev) => new Set(prev).add(day));
    }
  };

  return (
    <div style={{ background: MUJI.paper, color: MUJI.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="px-6 md:px-12 py-6"
        style={{ borderBottom: `1px solid ${MUJI.line}` }}
      >
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{ color: MUJI.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span
              className="font-body text-xs"
              style={{ letterSpacing: '0.06em' }}
            >
              返回行程介紹
            </span>
          </button>
          <span
            className="font-mono text-xs"
            style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
          >
            {BRAND.marque} / Itinerary
          </span>
        </div>
      </header>

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-20 pb-12">
        <div className="mx-auto max-w-6xl">
          <IndexLabel index="010">Day by Day</IndexLabel>
          <SectionTitle level={1} className="mt-6">
            {tour.title}
          </SectionTitle>
          <p
            className="mt-6 font-mono text-xs"
            style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
          >
            {tour.duration} / {tour.itinerary.length} Days
          </p>
          <p
            className="mt-10 max-w-2xl font-body text-sm md:text-base leading-[2]"
            style={{ color: MUJI.inkMid }}
          >
            從第一天抵達到最後一天回國、每天的活動、用餐與住宿，完整呈現。
            <br />
            點任一天展開細節。
          </p>
        </div>
      </section>

      {/* ─────────────── Main grid ─────────────── */}
      <div className="mx-auto max-w-6xl px-6 md:px-12 pb-24 md:pb-32">
        <Hair />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 pt-12">
          {/* ─────────────── Left sticky nav（更瘦） ─────────────── */}
          <aside className="md:col-span-2">
            <div className="md:sticky md:top-12">
              <p
                className="font-mono text-xs mb-6"
                style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
              >
                Days
              </p>

              <div className="mb-8">
                {tour.itinerary.map((d) => {
                  const isActive = activeDay === d.day;
                  return (
                    <button
                      key={d.day}
                      onClick={() => scrollToDay(d.day)}
                      className="flex items-center gap-4 w-full text-left py-2 transition-all"
                    >
                      <span
                        aria-hidden
                        className="block h-px transition-all"
                        style={{
                          width: isActive ? 24 : 8,
                          background: isActive ? MUJI.ink : MUJI.line,
                        }}
                      />
                      <span
                        className="font-mono text-xs"
                        style={{
                          color: isActive ? MUJI.ink : MUJI.woodSoft,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {String(d.day).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Hair />

              <div className="pt-6 flex flex-col gap-3">
                <button
                  onClick={expandAll}
                  className="font-body text-xs text-left transition-opacity hover:opacity-60"
                  style={{
                    color: MUJI.ink,
                    letterSpacing: '0.06em',
                  }}
                >
                  全部展開
                </button>
                <button
                  onClick={collapseAll}
                  className="font-body text-xs text-left transition-opacity hover:opacity-60"
                  style={{
                    color: MUJI.inkMid,
                    letterSpacing: '0.06em',
                  }}
                >
                  全部收起
                </button>
              </div>
            </div>
          </aside>

          {/* ─────────────── Right content ─────────────── */}
          <main className="md:col-span-10">
            {tour.itinerary.map((day, i) => (
              <DaySection
                key={day.day}
                day={day}
                isLast={i === tour.itinerary.length - 1}
                isOpen={openDays.has(day.day)}
                onToggle={() => toggleDay(day.day)}
                refSet={(el) => {
                  daySectionRefs.current[day.day] = el;
                }}
              />
            ))}
          </main>
        </div>
      </div>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: MUJI.paperSoft }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <IndexLabel index="011" align="center">
            Book Your Seat
          </IndexLabel>
          <h2
            className="font-display mt-8 leading-[1.5] text-2xl md:text-3xl"
            style={{ color: MUJI.ink, fontWeight: 500 }}
          >
            看完日程，出發吧
          </h2>
          <p
            className="mt-8 font-body text-sm md:text-base leading-[2]"
            style={{ color: MUJI.inkMid }}
          >
            每團 {tour.groupSize.min}–{tour.groupSize.max} 人嚴格上限、
            <br />
            出發前 30 天截止報名。
          </p>
          <div className="mt-12">
            <MujiButton size="lg" onClick={onSignup}>
              立即報名
            </MujiButton>
          </div>
        </div>
      </section>

      <MujiFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PlusMinusIcon — 細線 plus/minus、不用 lucide 的 chunky 版
// ─────────────────────────────────────────────────────

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="relative block shrink-0"
      style={{ width: 16, height: 16 }}
    >
      <span
        className="absolute left-0 top-1/2 block w-full h-px -translate-y-1/2"
        style={{ background: MUJI.ink }}
      />
      <span
        className="absolute left-1/2 top-0 block h-full w-px -translate-x-1/2 transition-opacity duration-300"
        style={{
          background: MUJI.ink,
          opacity: open ? 0 : 1,
        }}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────
// DaySection — 一天 expandable
// 表頭橫式（Day 01 · 城市 · 標題 · plus/minus）
// 展開後內容用規則 grid（時間 / 活動 / 描述）
// ─────────────────────────────────────────────────────

function DaySection({
  day,
  isLast,
  isOpen,
  onToggle,
  refSet,
}: {
  day: ItineraryDay;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
  refSet: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refSet}
      data-day={day.day}
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${MUJI.line}`,
      }}
    >
      {/* Day header */}
      <button
        onClick={onToggle}
        className="w-full text-left group py-10 md:py-12"
        aria-expanded={isOpen}
      >
        <div className="grid grid-cols-[64px_1fr_24px] md:grid-cols-[80px_1fr_24px] gap-6 items-start">
          {/* Day 編號 */}
          <div>
            <span
              className="font-mono text-xs block mb-1"
              style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
            >
              Day
            </span>
            <span
              className="font-display text-2xl md:text-3xl block leading-none"
              style={{ color: MUJI.ink, fontWeight: 500 }}
            >
              {String(day.day).padStart(2, '0')}
            </span>
          </div>

          {/* 標題 */}
          <div>
            <span
              className="font-mono text-xs block mb-3"
              style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
            >
              {day.city}
            </span>
            <h3
              className="font-display text-lg md:text-xl leading-snug mb-3"
              style={{ color: MUJI.ink, fontWeight: 500 }}
            >
              {day.title}
            </h3>
            <p
              className="font-body text-sm leading-[2]"
              style={{ color: MUJI.inkMid }}
            >
              {day.summary}
            </p>
          </div>

          {/* Plus / Minus */}
          <div className="pt-2 transition-opacity group-hover:opacity-70">
            <PlusMinusIcon open={isOpen} />
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pb-12 md:pl-[80px] md:pr-6">
              {/* ─── Activities ─── */}
              <div
                className="pt-8"
                style={{ borderTop: `1px solid ${MUJI.line}` }}
              >
                <p
                  className="font-mono text-xs mb-8"
                  style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
                >
                  Activities / 當日活動
                </p>

                <div>
                  {day.activities.map((a, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr] gap-6 md:gap-8 py-6"
                      style={{
                        borderBottom:
                          i === day.activities.length - 1
                            ? 'none'
                            : `1px solid ${MUJI.line}`,
                      }}
                    >
                      <div>
                        <span
                          className="font-mono text-sm block"
                          style={{
                            color: MUJI.ink,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {a.time}
                        </span>
                        <span
                          className="font-mono text-[10px] block mt-1"
                          style={{
                            color: MUJI.woodSoft,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {a.duration}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                          <h4
                            className="font-display text-base leading-snug"
                            style={{ color: MUJI.ink, fontWeight: 500 }}
                          >
                            {a.name}
                          </h4>
                          {a.highlight && (
                            <span
                              className="font-mono text-[10px] px-2 py-1"
                              style={{
                                background: MUJI.ink,
                                color: MUJI.paper,
                                letterSpacing: '0.05em',
                              }}
                            >
                              {a.highlight}
                            </span>
                          )}
                        </div>
                        <p
                          className="font-body text-sm leading-[1.95]"
                          style={{ color: MUJI.inkMid }}
                        >
                          {a.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Meals + Hotel ─── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                {/* Meals */}
                <div>
                  <p
                    className="font-mono text-xs mb-8 pb-3"
                    style={{
                      color: MUJI.wood,
                      letterSpacing: '0.05em',
                      borderBottom: `1px solid ${MUJI.line}`,
                    }}
                  >
                    Meals / 用餐
                  </p>
                  <div>
                    {day.meals.map((m, i) => (
                      <div
                        key={i}
                        className="py-4"
                        style={{
                          borderBottom:
                            i === day.meals.length - 1
                              ? 'none'
                              : `1px solid ${MUJI.line}`,
                        }}
                      >
                        <div className="flex items-baseline gap-4 mb-2">
                          <span
                            className="font-mono text-[10px] w-10 shrink-0"
                            style={{
                              color: MUJI.woodSoft,
                              letterSpacing: '0.05em',
                            }}
                          >
                            {m.type}
                          </span>
                          <h5
                            className="font-display text-sm leading-snug"
                            style={{ color: MUJI.ink, fontWeight: 500 }}
                          >
                            {m.name}
                          </h5>
                        </div>
                        <p
                          className="font-body text-xs leading-[1.9] pl-14"
                          style={{ color: MUJI.inkMid }}
                        >
                          {m.description}
                        </p>
                        {m.highlight && (
                          <p
                            className="pl-14 mt-2 font-mono text-[10px]"
                            style={{
                              color: MUJI.wood,
                              letterSpacing: '0.05em',
                            }}
                          >
                            {m.highlight}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel */}
                <div>
                  <p
                    className="font-mono text-xs mb-8 pb-3"
                    style={{
                      color: MUJI.wood,
                      letterSpacing: '0.05em',
                      borderBottom: `1px solid ${MUJI.line}`,
                    }}
                  >
                    Hotel / 住宿
                  </p>
                  <div
                    className="p-5"
                    style={{
                      background: MUJI.paperSoft,
                      border: `1px solid ${MUJI.line}`,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h5
                        className="font-display text-sm leading-snug"
                        style={{ color: MUJI.ink, fontWeight: 500 }}
                      >
                        {day.hotel.name}
                      </h5>
                      <span
                        className="font-mono text-[10px] shrink-0"
                        style={{
                          color: MUJI.wood,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {day.hotel.level}
                      </span>
                    </div>
                    <p
                      className="font-body text-xs leading-[1.95] mb-4"
                      style={{ color: MUJI.inkMid }}
                    >
                      {day.hotel.description}
                    </p>
                    {day.hotel.features.length > 0 && (
                      <>
                        <Hair />
                        <div className="pt-3 flex flex-wrap gap-x-4 gap-y-2">
                          {day.hotel.features.map((f, i) => (
                            <span
                              key={i}
                              className="font-mono text-[10px]"
                              style={{
                                color: MUJI.inkMid,
                                letterSpacing: '0.05em',
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
