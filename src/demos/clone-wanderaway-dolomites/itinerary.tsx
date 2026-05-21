'use client';

/**
 * Itinerary — day by day
 *
 * 結構：
 *   1. Header（Eyebrow + Italiana 大標 + 居中 intro）
 *   2. 左側 sticky day nav + 右側 day-by-day accordion
 *   3. Bottom CTA + Footer
 *
 * reference 該 theme 沒對應 itinerary 內頁、所以參考 single-article 內頁排版
 * （centered title / 寬鬆段距 / sage 點綴 / serif 編號）來組此頁。
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Utensils,
  BedDouble,
  Plus,
  Minus,
  Star,
} from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  WA,
  fontClass,
  serif,
  sans,
  Eyebrow,
  DisplayTitle,
  BodyText,
  PillButton,
  Divider,
} from './shared';
import { TopBar, CornerFooter } from './home';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

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
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
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

  const expandAll = () =>
    setOpenDays(new Set(tour.itinerary.map((d) => d.day)));
  const collapseAll = () => setOpenDays(new Set());

  const scrollToDay = (day: number) => {
    const el = daySectionRefs.current[day];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpenDays((prev) => new Set(prev).add(day));
    }
  };

  return (
    <div
      className={fontClass}
      style={{ background: WA.creamWarm, color: WA.ink, ...sans }}
    >
      <TopBar variant="solid" />

      {/* ────────────── Header ────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-16">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase transition-opacity hover:opacity-70 mb-16"
            style={{ ...sans, color: WA.ink, fontWeight: 500 }}
          >
            <ArrowLeft size={13} strokeWidth={1.2} />
            Back To Trip Overview
          </button>

          <div className="text-center">
            <Eyebrow>Day By Day Itinerary</Eyebrow>
            <div className="mt-12">
              <DisplayTitle size="lg" align="center">
                {tour.title}
                <br />
                <span
                  className="text-[28px] md:text-[44px] block mt-6"
                  style={{ color: WA.inkFaint }}
                >
                  {tour.duration}  ·  完整日程
                </span>
              </DisplayTitle>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
              <BodyText size="md" align="center">
                從第一天抵達到最後一天回國、每天的活動、用餐與住宿、完整呈現。
                <br />
                點任一天展開細節。
              </BodyText>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-12 pb-32 md:pb-44">
        <Divider color={WA.line} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pt-16">
          {/* ────────────── Left sticky nav ────────────── */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <p
                className="text-[11px] tracking-[0.32em] uppercase mb-8"
                style={{ ...sans, color: WA.forest, fontWeight: 500 }}
              >
                Day Index
              </p>

              <div className="space-y-1 mb-10">
                {tour.itinerary.map((d) => (
                  <button
                    key={d.day}
                    onClick={() => scrollToDay(d.day)}
                    className="flex items-center gap-4 w-full text-left py-3 transition-all group"
                  >
                    <span
                      aria-hidden
                      className="block h-px transition-all shrink-0"
                      style={{
                        width: activeDay === d.day ? 36 : 12,
                        background:
                          activeDay === d.day ? WA.forest : WA.line,
                      }}
                    />
                    <span
                      className="text-base w-10 shrink-0"
                      style={{
                        ...serif,
                        color: activeDay === d.day ? WA.forest : WA.inkFaint,
                      }}
                    >
                      {String(d.day).padStart(2, '0')}
                    </span>
                    <span
                      className="text-sm leading-snug truncate"
                      style={{
                        ...sans,
                        color: activeDay === d.day ? WA.ink : WA.inkSoft,
                        fontWeight: activeDay === d.day ? 500 : 300,
                      }}
                    >
                      {d.city}
                    </span>
                  </button>
                ))}
              </div>

              <Divider color={WA.line} />

              <div className="pt-8 flex flex-col gap-4">
                <button
                  onClick={expandAll}
                  className="text-left text-[11px] tracking-[0.32em] uppercase transition-opacity hover:opacity-70"
                  style={{ ...sans, color: WA.forest, fontWeight: 500 }}
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="text-left text-[11px] tracking-[0.32em] uppercase transition-opacity hover:opacity-70"
                  style={{ ...sans, color: WA.inkFaint, fontWeight: 500 }}
                >
                  Collapse All
                </button>
              </div>
            </div>
          </aside>

          {/* ────────────── Right content ────────────── */}
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

      {/* ────────────── CTA ────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: WA.cream }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Reserve Your Seat</Eyebrow>
          <div className="mt-12">
            <DisplayTitle size="md" align="center">
              Now You've Seen It All.
              <br />
              Let's Begin.
            </DisplayTitle>
          </div>
          <div className="mt-12 max-w-xl mx-auto">
            <BodyText size="md" align="center">
              每團 {tour.groupSize.min}–{tour.groupSize.max} 人嚴格上限、
              <br />
              出發前 30 天截止報名。
            </BodyText>
          </div>
          <div className="mt-16">
            <PillButton variant="solid" size="lg" onClick={onSignup}>
              Reserve A Seat
            </PillButton>
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
        borderBottom: isLast ? 'none' : `1px solid ${WA.line}`,
      }}
    >
      {/* Day header */}
      <button
        onClick={onToggle}
        className="w-full text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-8 md:gap-12">
          <div className="shrink-0 text-center">
            <span
              className="text-[10px] tracking-[0.32em] uppercase block mb-2"
              style={{ ...sans, color: WA.forest, fontWeight: 500 }}
            >
              Day
            </span>
            <span
              className="text-6xl md:text-7xl leading-none block"
              style={{ ...serif, color: WA.ink, fontWeight: 400 }}
            >
              {String(day.day).padStart(2, '0')}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <MapPin
                size={13}
                strokeWidth={1.2}
                style={{ color: WA.forest }}
              />
              <span
                className="text-[11px] tracking-[0.32em] uppercase"
                style={{ ...sans, color: WA.forest, fontWeight: 500 }}
              >
                {day.city}
              </span>
            </div>
            <h3
              className="text-2xl md:text-[36px] leading-[1.2] tracking-[-0.005em] mb-5"
              style={{ ...serif, color: WA.ink, fontWeight: 400 }}
            >
              {day.title}
            </h3>
            <p
              className="text-[15px] leading-[1.9] max-w-2xl"
              style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
            >
              {day.summary}
            </p>
          </div>

          <div
            className="shrink-0 mt-2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              border: `1px solid ${WA.line}`,
              color: WA.ink,
              background: isOpen ? WA.sageMist : 'transparent',
            }}
          >
            {isOpen ? (
              <Minus size={16} strokeWidth={1.4} />
            ) : (
              <Plus size={16} strokeWidth={1.4} />
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
            <div className="pt-14 pl-0 md:pl-32">
              {/* Activities */}
              <div className="mb-16">
                <p
                  className="text-[11px] tracking-[0.32em] uppercase mb-10"
                  style={{ ...sans, color: WA.forest, fontWeight: 500 }}
                >
                  Activities  ·  當日活動
                </p>
                <div className="space-y-10">
                  {day.activities.map((a, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[88px_1fr] md:grid-cols-[108px_1fr] gap-6 md:gap-10"
                    >
                      <div>
                        <span
                          className="text-base block"
                          style={{ ...serif, color: WA.ink, fontWeight: 400 }}
                        >
                          {a.time}
                        </span>
                        <span
                          className="text-[10px] tracking-[0.24em] uppercase block mt-2"
                          style={{
                            ...sans,
                            color: WA.inkFaint,
                            fontWeight: 500,
                          }}
                        >
                          {a.duration}
                        </span>
                      </div>
                      <div
                        className="relative pb-2 pl-8"
                        style={{
                          borderLeft: `1px solid ${WA.line}`,
                        }}
                      >
                        <span
                          aria-hidden
                          className="absolute -left-1 top-1 block w-2 h-2"
                          style={{ background: WA.forest }}
                        />
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h4
                            className="text-xl md:text-2xl leading-snug"
                            style={{
                              ...serif,
                              color: WA.ink,
                              fontWeight: 400,
                            }}
                          >
                            {a.name}
                          </h4>
                          {a.highlight && (
                            <span
                              className="text-[10px] tracking-[0.28em] uppercase px-3 py-1.5 rounded-full inline-flex items-center gap-2"
                              style={{
                                ...sans,
                                background: WA.forest,
                                color: WA.creamLight,
                                fontWeight: 500,
                              }}
                            >
                              <Star
                                size={9}
                                strokeWidth={1.2}
                                style={{ color: WA.sage }}
                                fill={WA.sage}
                              />
                              {a.highlight}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-[15px] leading-[1.9]"
                          style={{
                            ...sans,
                            color: WA.inkSoft,
                            fontWeight: 300,
                          }}
                        >
                          {a.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals + Hotel grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {/* Meals */}
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <Utensils
                      size={14}
                      strokeWidth={1.2}
                      style={{ color: WA.forest }}
                    />
                    <p
                      className="text-[11px] tracking-[0.32em] uppercase"
                      style={{ ...sans, color: WA.forest, fontWeight: 500 }}
                    >
                      Meals  ·  用餐
                    </p>
                  </div>
                  <div className="space-y-8">
                    {day.meals.map((m, i) => (
                      <div key={i}>
                        <div className="flex items-baseline gap-4 mb-2">
                          <span
                            className="text-[10px] tracking-[0.24em] uppercase w-14 shrink-0"
                            style={{
                              ...sans,
                              color: WA.inkFaint,
                              fontWeight: 500,
                            }}
                          >
                            {m.type}
                          </span>
                          <h5
                            className="text-base leading-snug"
                            style={{
                              ...serif,
                              color: WA.ink,
                              fontWeight: 400,
                            }}
                          >
                            {m.name}
                          </h5>
                        </div>
                        <p
                          className="text-sm leading-[1.85] pl-[72px]"
                          style={{
                            ...sans,
                            color: WA.inkSoft,
                            fontWeight: 300,
                          }}
                        >
                          {m.description}
                        </p>
                        {m.highlight && (
                          <p
                            className="pl-[72px] mt-2 text-[10px] tracking-[0.28em] uppercase inline-flex items-center gap-2"
                            style={{
                              ...sans,
                              color: WA.forest,
                              fontWeight: 500,
                            }}
                          >
                            <Star
                              size={9}
                              strokeWidth={1.2}
                              style={{ color: WA.forest }}
                              fill={WA.forest}
                            />
                            {m.highlight}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotel */}
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <BedDouble
                      size={14}
                      strokeWidth={1.2}
                      style={{ color: WA.forest }}
                    />
                    <p
                      className="text-[11px] tracking-[0.32em] uppercase"
                      style={{ ...sans, color: WA.forest, fontWeight: 500 }}
                    >
                      Hotel  ·  住宿
                    </p>
                  </div>
                  <div
                    className="p-8 rounded-lg"
                    style={{
                      background: WA.cream,
                      border: `1px solid ${WA.line}`,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-4">
                      <h5
                        className="text-lg md:text-xl leading-snug"
                        style={{ ...serif, color: WA.ink, fontWeight: 400 }}
                      >
                        {day.hotel.name}
                      </h5>
                      <span
                        className="text-[10px] tracking-[0.28em] uppercase shrink-0"
                        style={{
                          ...sans,
                          color: WA.forest,
                          fontWeight: 500,
                        }}
                      >
                        {day.hotel.level}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-[1.85] mb-6"
                      style={{
                        ...sans,
                        color: WA.inkSoft,
                        fontWeight: 300,
                      }}
                    >
                      {day.hotel.description}
                    </p>
                    {day.hotel.features.length > 0 && (
                      <>
                        <Divider color={WA.line} />
                        <div className="pt-5 flex flex-wrap gap-x-5 gap-y-2">
                          {day.hotel.features.map((f, i) => (
                            <span
                              key={i}
                              className="text-[11px] tracking-[0.04em]"
                              style={{
                                ...sans,
                                color: WA.inkSoft,
                                fontWeight: 400,
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
