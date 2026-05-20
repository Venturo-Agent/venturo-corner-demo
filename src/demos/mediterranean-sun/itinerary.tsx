'use client';

/**
 * Itinerary — day-by-day 日程
 *
 * 結構：
 *   - 左側 sticky day nav（Day 01 / Day 02 / ...）
 *   - 右側日程內容、每天一個 section、accordion
 *   - 每 day: 標題 / city / summary / activities timeline / meals / hotel
 *   - 頂部頁面 header + 底部 CTA
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Utensils,
  BedDouble,
  Plus,
  Minus,
  Star,
} from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  SUN,
  SectionLabel,
  SunButton,
  HairLine,
} from './shared';
import { CornerFooter } from './home';

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
    <div style={{ background: SUN.sand, color: SUN.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-12">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-xs tracking-[0.3em] uppercase transition-opacity hover:opacity-70 mb-12"
            style={{ color: SUN.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回行程介紹
          </button>

          <SectionLabel>Day by Day Itinerary</SectionLabel>
          <h1
            className="font-display font-light mt-8 leading-[1.1] text-[40px] md:text-[64px]"
            style={{ color: SUN.ink }}
          >
            {tour.title}
            <br />
            {tour.duration}日程
          </h1>
          <p
            className="mt-8 max-w-2xl text-base md:text-lg leading-[1.95]"
            style={{ color: SUN.inkSoft }}
          >
            從第一天抵達到最後一天回國、每天的活動、用餐與住宿、完整呈現。點任一天展開細節。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-12 pb-24 md:pb-32">
        <HairLine />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12">
          {/* ─────────────── Left sticky nav ─────────────── */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <p
                className="font-display text-xs tracking-[0.4em] uppercase mb-6"
                style={{ color: SUN.goldDeep }}
              >
                Day Navigation
              </p>

              <div className="space-y-1 mb-8">
                {tour.itinerary.map((d) => (
                  <button
                    key={d.day}
                    onClick={() => scrollToDay(d.day)}
                    className="flex items-center gap-4 w-full text-left py-3 transition-all"
                    style={{
                      color: activeDay === d.day ? SUN.ink : SUN.inkFaint,
                    }}
                  >
                    <span
                      aria-hidden
                      className="block h-px transition-all"
                      style={{
                        width: activeDay === d.day ? 32 : 12,
                        background:
                          activeDay === d.day ? SUN.goldDeep : SUN.line,
                      }}
                    />
                    <span className="font-mono text-xs tracking-wider w-12 shrink-0">
                      Day {String(d.day).padStart(2, '0')}
                    </span>
                    <span
                      className="font-display text-sm leading-snug truncate"
                      style={{
                        color: activeDay === d.day ? SUN.ink : SUN.inkSoft,
                      }}
                    >
                      {d.city}
                    </span>
                  </button>
                ))}
              </div>

              <HairLine />

              <div className="pt-6 flex flex-col gap-3">
                <button
                  onClick={expandAll}
                  className="font-display text-xs tracking-[0.3em] uppercase text-left transition-opacity hover:opacity-70"
                  style={{ color: SUN.goldDeep }}
                >
                  展開全部
                </button>
                <button
                  onClick={collapseAll}
                  className="font-display text-xs tracking-[0.3em] uppercase text-left transition-opacity hover:opacity-70"
                  style={{ color: SUN.inkFaint }}
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
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: SUN.sandDeep }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel align="center">Book Your Seat</SectionLabel>
          <h2
            className="font-display font-light mt-10 leading-[1.2] text-[32px] md:text-[48px]"
            style={{ color: SUN.ink }}
          >
            看完日程
            <br />
            出發吧
          </h2>
          <p
            className="mt-8 max-w-xl mx-auto text-base leading-[1.95]"
            style={{ color: SUN.inkSoft }}
          >
            每團 {tour.groupSize.min}–{tour.groupSize.max} 人嚴格上限、出發前 30 天截止報名。
          </p>
          <div className="mt-12">
            <SunButton size="lg" onClick={onSignup}>
              立即報名
            </SunButton>
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
      className="py-12 md:py-16"
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${SUN.line}`,
      }}
    >
      {/* Day header */}
      <button
        onClick={onToggle}
        className="w-full text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-8 md:gap-12">
          <div className="shrink-0">
            <span
              className="font-display text-[11px] tracking-[0.4em] uppercase block mb-1"
              style={{ color: SUN.goldDeep }}
            >
              Day
            </span>
            <span
              className="font-display font-light text-5xl md:text-6xl leading-none"
              style={{ color: SUN.ink }}
            >
              {String(day.day).padStart(2, '0')}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <MapPin
                size={13}
                strokeWidth={1.5}
                style={{ color: SUN.goldDeep }}
              />
              <span
                className="font-display text-xs tracking-[0.3em] uppercase"
                style={{ color: SUN.goldDeep }}
              >
                {day.city}
              </span>
            </div>
            <h3
              className="font-display font-light leading-tight text-2xl md:text-[34px] mb-4"
              style={{ color: SUN.ink }}
            >
              {day.title}
            </h3>
            <p
              className="text-base leading-[1.85]"
              style={{ color: SUN.inkSoft }}
            >
              {day.summary}
            </p>
          </div>

          <div
            className="shrink-0 mt-2 transition-transform group-hover:scale-110"
            style={{ color: SUN.ink }}
          >
            {isOpen ? (
              <Minus size={20} strokeWidth={1.5} />
            ) : (
              <Plus size={20} strokeWidth={1.5} />
            )}
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
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-12 pl-0 md:pl-28">
              {/* Activities */}
              <div className="mb-12">
                <p
                  className="font-display text-xs tracking-[0.4em] uppercase mb-8"
                  style={{ color: SUN.goldDeep }}
                >
                  Activities · 當日活動
                </p>
                <div className="space-y-8">
                  {day.activities.map((a, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-8"
                    >
                      <div>
                        <span
                          className="font-mono text-sm tracking-wider block"
                          style={{ color: SUN.ink }}
                        >
                          {a.time}
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-wider block mt-1"
                          style={{ color: SUN.inkFaint }}
                        >
                          {a.duration}
                        </span>
                      </div>
                      <div
                        className="relative pb-8"
                        style={{
                          borderLeft: `1px solid ${SUN.line}`,
                          paddingLeft: 28,
                        }}
                      >
                        <span
                          aria-hidden
                          className="absolute -left-1 top-1 block w-2 h-2"
                          style={{ background: SUN.gold }}
                        />
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h4
                            className="font-display text-xl leading-snug"
                            style={{ color: SUN.ink }}
                          >
                            {a.name}
                          </h4>
                          {a.highlight && (
                            <span
                              className="font-display text-[10px] tracking-[0.3em] uppercase px-2 py-1 inline-flex items-center gap-2"
                              style={{
                                background: SUN.night,
                                color: SUN.sandLight,
                              }}
                            >
                              <Star
                                size={9}
                                strokeWidth={1.5}
                                style={{ color: SUN.gold }}
                                fill={SUN.gold}
                              />
                              {a.highlight}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-base leading-[1.85]"
                          style={{ color: SUN.inkSoft }}
                        >
                          {a.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals + Hotel grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Meals */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Utensils
                      size={14}
                      strokeWidth={1.5}
                      style={{ color: SUN.goldDeep }}
                    />
                    <p
                      className="font-display text-xs tracking-[0.4em] uppercase"
                      style={{ color: SUN.goldDeep }}
                    >
                      Meals · 用餐
                    </p>
                  </div>
                  <div className="space-y-6">
                    {day.meals.map((m, i) => (
                      <div key={i}>
                        <div className="flex items-baseline gap-4 mb-2">
                          <span
                            className="font-mono text-[10px] tracking-[0.2em] uppercase w-12 shrink-0"
                            style={{ color: SUN.inkFaint }}
                          >
                            {m.type}
                          </span>
                          <h5
                            className="font-display text-base leading-snug"
                            style={{ color: SUN.ink }}
                          >
                            {m.name}
                          </h5>
                        </div>
                        <p
                          className="text-sm leading-[1.85] pl-16"
                          style={{ color: SUN.inkSoft }}
                        >
                          {m.description}
                        </p>
                        {m.highlight && (
                          <p
                            className="pl-16 mt-2 font-display text-[10px] tracking-[0.3em] uppercase"
                            style={{ color: SUN.goldDeep }}
                          >
                            ★ {m.highlight}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <BedDouble
                      size={14}
                      strokeWidth={1.5}
                      style={{ color: SUN.goldDeep }}
                    />
                    <p
                      className="font-display text-xs tracking-[0.4em] uppercase"
                      style={{ color: SUN.goldDeep }}
                    >
                      Hotel · 住宿
                    </p>
                  </div>
                  <div
                    className="p-6"
                    style={{
                      background: SUN.sandLight,
                      border: `1px solid ${SUN.line}`,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-3">
                      <h5
                        className="font-display text-lg leading-snug"
                        style={{ color: SUN.ink }}
                      >
                        {day.hotel.name}
                      </h5>
                      <span
                        className="font-mono text-[10px] tracking-[0.2em] uppercase shrink-0"
                        style={{ color: SUN.goldDeep }}
                      >
                        {day.hotel.level}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-[1.85] mb-4"
                      style={{ color: SUN.inkSoft }}
                    >
                      {day.hotel.description}
                    </p>
                    {day.hotel.features.length > 0 && (
                      <>
                        <HairLine />
                        <div className="pt-4 flex flex-wrap gap-x-4 gap-y-2">
                          {day.hotel.features.map((f, i) => (
                            <span
                              key={i}
                              className="font-mono text-[10px] tracking-wider"
                              style={{ color: SUN.inkSoft }}
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
