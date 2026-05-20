'use client';

/**
 * Itinerary — day-by-day 日程（阿爾卑斯靜謐）
 *
 * 跟 mediterranean itinerary 對比：
 *   1. Left nav 改為「垂直 timeline 線 + 圓點 → 改為方塊 + 垂直細線」
 *   2. Day section 改 expand 用「下劃線往上」、不用 + / -
 *   3. Activity timeline 改為「無垂直線、只有左 time、座標分隔」
 *   4. Meals / Hotel 改為「橫線分隔的 row」而非 box
 *   5. Day header 改為「左大數字 day 序 + 右標題」、無框
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Utensils,
  BedDouble,
  Mountain,
  ChevronDown,
} from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  ALPINE,
  PeakLabel,
  AlpineButton,
  HairLine,
  SerifTitle,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // intersection observer
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
    <div style={{ background: ALPINE.snow, color: ALPINE.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section className="px-10 md:px-20 pt-24 md:pt-32 pb-16">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-4 font-display text-[10px] tracking-[0.45em] uppercase transition-opacity hover:opacity-70 mb-16"
            style={{ color: ALPINE.stone, fontWeight: 400 }}
          >
            <ArrowLeft size={13} strokeWidth={1.2} />
            返回行程介紹
          </button>

          <PeakLabel>Day by Day Itinerary</PeakLabel>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
            <div className="md:col-span-7">
              <SerifTitle
                as="h1"
                className="text-[40px] md:text-[72px] leading-[1.05]"
              >
                {tour.title}
              </SerifTitle>
              <p
                className="mt-8 font-mono text-[12px] tracking-[0.3em] uppercase"
                style={{ color: ALPINE.stone }}
              >
                {tour.duration}  ·  {tour.itinerary.length} Stages
              </p>
            </div>
            <div className="md:col-span-5 md:pb-4">
              <div
                className="h-px w-12 mb-8"
                style={{ background: ALPINE.stone }}
              />
              <p
                className="text-[15px] leading-[2.05]"
                style={{ color: ALPINE.inkSoft }}
              >
                從第一天抵達到最後一天回國、每天的活動、用餐與住宿、完整呈現。
                點任一天展開細節。
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-10 md:px-20 pb-32 md:pb-44">
        <HairLine />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-16">
          {/* ─────────────── Left sticky nav ─────────────── */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <span
                className="font-display text-[10px] tracking-[0.5em] uppercase block mb-10"
                style={{ color: ALPINE.stone, fontWeight: 400 }}
              >
                Day Navigation
              </span>

              <div className="space-y-2 mb-10">
                {tour.itinerary.map((d) => {
                  const isActive = activeDay === d.day;
                  return (
                    <button
                      key={d.day}
                      onClick={() => scrollToDay(d.day)}
                      className="flex items-baseline gap-5 w-full text-left py-3 transition-all group"
                    >
                      {/* day index */}
                      <span
                        className="font-mono text-[11px] tracking-[0.2em] w-10 shrink-0"
                        style={{
                          color: isActive ? ALPINE.night : ALPINE.inkFaint,
                        }}
                      >
                        D{String(d.day).padStart(2, '0')}
                      </span>

                      {/* dash that grows when active */}
                      <span
                        aria-hidden
                        className="block h-px transition-all shrink-0"
                        style={{
                          width: isActive ? 28 : 10,
                          background: isActive
                            ? ALPINE.night
                            : ALPINE.line,
                        }}
                      />

                      <span
                        className="font-display text-[13px] leading-snug truncate"
                        style={{
                          color: isActive ? ALPINE.ink : ALPINE.inkSoft,
                          fontWeight: 400,
                        }}
                      >
                        {d.city}
                      </span>
                    </button>
                  );
                })}
              </div>

              <HairLine />

              <div className="pt-8 flex flex-col gap-4">
                <button
                  onClick={expandAll}
                  className="font-display text-[10px] tracking-[0.45em] uppercase text-left transition-opacity hover:opacity-70"
                  style={{ color: ALPINE.night, fontWeight: 400 }}
                >
                  展開全部
                </button>
                <button
                  onClick={collapseAll}
                  className="font-display text-[10px] tracking-[0.45em] uppercase text-left transition-opacity hover:opacity-70"
                  style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                >
                  全部收起
                </button>
              </div>
            </div>
          </aside>

          {/* ─────────────── Right content ─────────────── */}
          <main className="md:col-span-9">
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
        className="px-10 md:px-20 py-32 md:py-44"
        style={{ background: ALPINE.snowDeep }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="block w-px h-20 mx-auto mb-16"
            style={{ background: ALPINE.stone }}
          />
          <PeakLabel align="center">Book Your Seat</PeakLabel>
          <SerifTitle
            as="h2"
            className="text-[32px] md:text-[52px] mt-12 leading-[1.3]"
          >
            看完日程
            <br />
            出發吧
          </SerifTitle>
          <p
            className="mt-10 max-w-md mx-auto text-[15px] leading-[2.05]"
            style={{ color: ALPINE.inkSoft }}
          >
            每團 {tour.groupSize.min}–{tour.groupSize.max} 人嚴格上限、出發前 30 天截止報名。
          </p>
          <div className="mt-16">
            <AlpineButton size="lg" onClick={onSignup}>
              立即報名
            </AlpineButton>
          </div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Day section
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
      className="py-16 md:py-20"
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${ALPINE.line}`,
      }}
    >
      {/* Day header */}
      <button
        onClick={onToggle}
        className="w-full text-left group"
        aria-expanded={isOpen}
      >
        <div className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[120px_1fr_auto] gap-8 md:gap-12 items-start">
          {/* big day number */}
          <div>
            <span
              className="font-display text-[10px] tracking-[0.45em] uppercase block mb-3"
              style={{ color: ALPINE.stone, fontWeight: 400 }}
            >
              Day
            </span>
            <span
              className="font-display leading-none text-5xl md:text-7xl"
              style={{ color: ALPINE.night, fontWeight: 300 }}
            >
              {String(day.day).padStart(2, '0')}
            </span>
          </div>

          {/* title block */}
          <div className="flex-1 min-w-0 pt-2">
            <div className="flex items-center gap-4 mb-4">
              <span
                aria-hidden
                className="block w-6 h-px"
                style={{ background: ALPINE.stone }}
              />
              <span
                className="font-display text-[10px] tracking-[0.45em] uppercase"
                style={{ color: ALPINE.stone, fontWeight: 400 }}
              >
                {day.city}
              </span>
            </div>
            <SerifTitle
              as="h3"
              className="text-2xl md:text-[34px] leading-[1.2] mb-5"
            >
              {day.title}
            </SerifTitle>
            <p
              className="text-[14px] leading-[1.95] max-w-2xl"
              style={{ color: ALPINE.inkSoft }}
            >
              {day.summary}
            </p>
          </div>

          {/* chevron */}
          <div
            className="shrink-0 pt-4 transition-transform"
            style={{
              color: ALPINE.stone,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronDown size={20} strokeWidth={1.2} />
          </div>
        </div>
      </button>

      {/* Accordion content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pt-16 pl-0 md:pl-[152px]">
              {/* Activities */}
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-10">
                  <Mountain
                    size={14}
                    strokeWidth={1.2}
                    style={{ color: ALPINE.stone }}
                  />
                  <span
                    className="font-display text-[10px] tracking-[0.5em] uppercase"
                    style={{ color: ALPINE.stone, fontWeight: 400 }}
                  >
                    Activities  ·  當日活動
                  </span>
                </div>

                <div>
                  {day.activities.map((a, i) => (
                    <div
                      key={i}
                      className="py-8 grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12"
                      style={{
                        borderTop: `1px solid ${ALPINE.lineSoft}`,
                        borderBottom:
                          i === day.activities.length - 1
                            ? `1px solid ${ALPINE.lineSoft}`
                            : 'none',
                      }}
                    >
                      <div>
                        <span
                          className="font-mono text-[14px] tracking-wider block"
                          style={{ color: ALPINE.ink, fontWeight: 300 }}
                        >
                          {a.time}
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-[0.2em] block mt-1 uppercase"
                          style={{ color: ALPINE.inkFaint }}
                        >
                          {a.duration}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-4 mb-3 flex-wrap">
                          <SerifTitle
                            as="h4"
                            className="text-xl md:text-[22px] leading-snug"
                          >
                            {a.name}
                          </SerifTitle>
                          {a.highlight && (
                            <span
                              className="font-display text-[9px] tracking-[0.45em] uppercase px-3 py-1.5"
                              style={{
                                background: ALPINE.night,
                                color: ALPINE.snow,
                                fontWeight: 400,
                              }}
                            >
                              {a.highlight}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-[14px] leading-[1.95]"
                          style={{ color: ALPINE.inkSoft }}
                        >
                          {a.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals + Hotel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
                {/* Meals */}
                <div>
                  <div className="flex items-center gap-4 mb-10">
                    <Utensils
                      size={14}
                      strokeWidth={1.2}
                      style={{ color: ALPINE.stone }}
                    />
                    <span
                      className="font-display text-[10px] tracking-[0.5em] uppercase"
                      style={{ color: ALPINE.stone, fontWeight: 400 }}
                    >
                      Meals  ·  用餐
                    </span>
                  </div>
                  <div>
                    {day.meals.map((m, i) => (
                      <div
                        key={i}
                        className="py-6"
                        style={{
                          borderTop: `1px solid ${ALPINE.lineSoft}`,
                          borderBottom:
                            i === day.meals.length - 1
                              ? `1px solid ${ALPINE.lineSoft}`
                              : 'none',
                        }}
                      >
                        <div className="flex items-baseline gap-4 mb-2">
                          <span
                            className="font-mono text-[10px] tracking-[0.3em] uppercase w-12 shrink-0"
                            style={{ color: ALPINE.inkFaint }}
                          >
                            {m.type}
                          </span>
                          <SerifTitle
                            as="h5"
                            className="text-[15px] leading-snug"
                          >
                            {m.name}
                          </SerifTitle>
                        </div>
                        <p
                          className="text-[13px] leading-[1.95] pl-16"
                          style={{ color: ALPINE.inkSoft }}
                        >
                          {m.description}
                        </p>
                        {m.highlight && (
                          <p
                            className="pl-16 mt-2 font-display text-[10px] tracking-[0.45em] uppercase"
                            style={{ color: ALPINE.stone, fontWeight: 400 }}
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
                  <div className="flex items-center gap-4 mb-10">
                    <BedDouble
                      size={14}
                      strokeWidth={1.2}
                      style={{ color: ALPINE.stone }}
                    />
                    <span
                      className="font-display text-[10px] tracking-[0.5em] uppercase"
                      style={{ color: ALPINE.stone, fontWeight: 400 }}
                    >
                      Hotel  ·  住宿
                    </span>
                  </div>
                  <div
                    className="py-8 px-8"
                    style={{
                      background: ALPINE.snowDeep,
                      border: `1px solid ${ALPINE.line}`,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-4">
                      <SerifTitle
                        as="h5"
                        className="text-lg leading-snug"
                      >
                        {day.hotel.name}
                      </SerifTitle>
                      <span
                        className="font-display text-[9px] tracking-[0.5em] uppercase shrink-0"
                        style={{ color: ALPINE.stone, fontWeight: 400 }}
                      >
                        {day.hotel.level}
                      </span>
                    </div>
                    <p
                      className="text-[13px] leading-[1.95] mb-6"
                      style={{ color: ALPINE.inkSoft }}
                    >
                      {day.hotel.description}
                    </p>
                    {day.hotel.features.length > 0 && (
                      <>
                        <HairLine />
                        <div className="pt-5 flex flex-wrap gap-x-6 gap-y-2">
                          {day.hotel.features.map((f, i) => (
                            <span
                              key={i}
                              className="font-mono text-[10px] tracking-[0.2em]"
                              style={{ color: ALPINE.inkSoft }}
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
