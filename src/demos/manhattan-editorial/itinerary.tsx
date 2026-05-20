'use client';

/**
 * Itinerary — 雜誌「Day-by-Day」內頁
 *
 * 結構（像雜誌專題的章節編排）：
 *   1. Masthead bar
 *   2. Article header（Day-by-Day kicker / 大標題 / 期數）
 *   3. Table of Contents（每天像一篇 article、PAGE 編號）
 *   4. Day articles（左 sticky nav + 右每天詳細：activity timeline / meals / hotel）
 *   5. CTA + Footer
 *
 * 跟前 4 個 demo 對比：
 *   - mediterranean / alpine：左 sticky nav + 右 accordion
 *   - muji：list view
 *   - maldives：浮動 day card
 *   - manhattan：每天像一篇雜誌 spread、PAGE 連號（page 014 / page 016 / ...）
 *     + 全部展開、不需要 accordion（雜誌不會折疊頁面）
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Utensils, BedDouble, Star } from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  NYC,
  IssueMark,
  EditorialKicker,
  MagazineHeadline,
  EditorialButton,
  SerialNumber,
  Rule,
  Grain,
  EditorialFooter,
  CATEGORY_LABEL_EN,
} from './shared';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // intersection observer：scroll 到哪天就高亮 nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const day = Number((entry.target as HTMLDivElement).dataset.day);
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

  const scrollToDay = (day: number) => {
    const el = daySectionRefs.current[day];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ background: NYC.paper, color: NYC.ink }}>
      {/* ─────────────── Masthead Bar ─────────────── */}
      <header
        className="px-6 md:px-12 py-4"
        style={{
          borderBottom: `1px solid ${NYC.ink}`,
          background: NYC.paper,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-baseline gap-3 transition-colors hover:text-[#C4A678]"
            style={{ color: NYC.ink }}
          >
            <span aria-hidden className="text-base">←</span>
            <span
              className="font-display text-xl md:text-2xl"
              style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              CORNER
            </span>
            <span
              className="hidden md:inline font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: NYC.graySoft, fontWeight: 600 }}
            >
              BACK TO FEATURE
            </span>
          </button>
          <IssueMark className="hidden md:inline-flex" />
        </div>
      </header>

      {/* ─────────────── Article Header ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-20 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <EditorialKicker label="DAY-BY-DAY" />
              <MagazineHeadline size="2xl" className="mt-6" as="h1">
                {tour.title}
              </MagazineHeadline>
              <p
                className="mt-8 font-body text-lg leading-[1.7] max-w-3xl"
                style={{ color: NYC.inkSoft }}
              >
                從第一天抵達、到最後一天回國——
                {tour.itinerary.length} 個章節、{tour.itinerary.length * 3} 道餐、
                {tour.itinerary.length - 1} 晚住宿。
                <span style={{ color: NYC.ink, fontWeight: 500 }}>
                  每一天都是一篇 article。
                </span>
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end gap-3">
              <p
                className="font-mono text-[10px] tracking-[0.28em] uppercase"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                FEATURE · {CATEGORY_LABEL_EN[tour.category]}
              </p>
              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.graySoft, fontWeight: 600 }}
              >
                {tour.destination} · {tour.duration}
              </p>
              <Rule color={NYC.ruleSoft} />
              <div className="flex items-baseline justify-between">
                <span
                  className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: NYC.grayFaint, fontWeight: 600 }}
                >
                  TOTAL DAYS
                </span>
                <SerialNumber
                  n={String(tour.itinerary.length).padStart(2, '0')}
                  style={{ fontSize: 32 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Table of Contents ─────────────── */}
      <section
        className="px-6 md:px-12 py-12"
        style={{ background: NYC.paperWarm }}
      >
        <div className="mx-auto max-w-7xl">
          <EditorialKicker label="TABLE OF CONTENTS" />
          <Rule color={NYC.ink} weight={2} className="mt-6 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
            {tour.itinerary.map((d, i) => {
              const pageNumber = String(14 + i * 8).padStart(3, '0');
              return (
                <button
                  key={d.day}
                  onClick={() => scrollToDay(d.day)}
                  className="text-left group flex items-baseline gap-4 py-3"
                  style={{
                    borderBottom: `1px dashed ${NYC.ruleSoft}`,
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] uppercase shrink-0 w-14"
                    style={{ color: NYC.camel, fontWeight: 700 }}
                  >
                    DAY {String(d.day).padStart(2, '0')}
                  </span>
                  <span
                    className="font-display flex-1 leading-snug truncate transition-colors group-hover:text-[#C4A678]"
                    style={{
                      color: NYC.ink,
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    {d.title}
                  </span>
                  <span
                    aria-hidden
                    className="flex-1 hidden md:block"
                    style={{
                      borderBottom: `1px dotted ${NYC.grayFaint}`,
                      marginBottom: 6,
                    }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] uppercase shrink-0"
                    style={{ color: NYC.graySoft, fontWeight: 600 }}
                  >
                    PAGE {pageNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── Day articles ─────────────── */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left sticky day nav */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-8">
              <p
                className="font-mono text-[10px] tracking-[0.28em] uppercase mb-5"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                Day Navigation
              </p>

              <div className="space-y-1">
                {tour.itinerary.map((d) => {
                  const isActive = activeDay === d.day;
                  return (
                    <button
                      key={d.day}
                      onClick={() => scrollToDay(d.day)}
                      className="flex items-baseline gap-3 w-full text-left py-2 transition-all"
                    >
                      <span
                        aria-hidden
                        className="block h-px transition-all shrink-0"
                        style={{
                          width: isActive ? 28 : 10,
                          background: isActive ? NYC.ink : NYC.ruleSoft,
                        }}
                      />
                      <span
                        className="font-mono text-[10px] tracking-[0.22em] uppercase shrink-0 w-10"
                        style={{
                          color: isActive ? NYC.ink : NYC.grayFaint,
                          fontWeight: 700,
                        }}
                      >
                        {String(d.day).padStart(2, '0')}
                      </span>
                      <span
                        className="font-body text-xs truncate"
                        style={{
                          color: isActive ? NYC.ink : NYC.graySoft,
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        {d.city}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Rule color={NYC.ruleSoft} className="mt-8 mb-6" />

              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2"
                style={{ color: NYC.grayFaint, fontWeight: 600 }}
              >
                Currently Reading
              </p>
              <p
                className="font-display text-2xl leading-tight"
                style={{ color: NYC.ink, fontWeight: 700 }}
              >
                DAY {String(activeDay).padStart(2, '0')}
              </p>
            </div>
          </aside>

          {/* Right content：day articles */}
          <main className="md:col-span-9">
            {tour.itinerary.map((day, i) => (
              <DayArticle
                key={day.day}
                day={day}
                index={i}
                isLast={i === tour.itinerary.length - 1}
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
        className="px-6 md:px-12 py-20 md:py-28"
        style={{ background: NYC.ink, color: NYC.paper }}
      >
        <div className="relative mx-auto max-w-5xl">
          <Grain opacity={0.06} />
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <EditorialKicker label="END OF FEATURE" invert />
              <MagazineHeadline
                size="2xl"
                color={NYC.paper}
                className="mt-6"
              >
                看完了
                <br />
                <span style={{ color: NYC.camel }}>就走吧。</span>
              </MagazineHeadline>
              <p
                className="mt-8 font-body text-base md:text-lg leading-[1.85] max-w-xl"
                style={{ color: 'rgba(255,255,255,0.78)' }}
              >
                每團 {tour.groupSize.min}–{tour.groupSize.max} 人嚴格上限、
                出發前 30 天截止報名。專人 24 小時內聯絡確認名額。
              </p>
            </div>
            <div className="md:col-span-4">
              <EditorialButton
                size="lg"
                variant="inverted"
                onClick={onSignup}
                className="w-full"
              >
                Reserve Now
              </EditorialButton>
            </div>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// DayArticle — 每一天像一篇雜誌 article
// ─────────────────────────────────────────────────────

function DayArticle({
  day,
  index,
  isLast,
  refSet,
}: {
  day: ItineraryDay;
  index: number;
  isLast: boolean;
  refSet: (el: HTMLDivElement | null) => void;
}) {
  const pageNumber = String(14 + index * 8).padStart(3, '0');

  return (
    <article
      ref={refSet}
      data-day={day.day}
      className="pb-16 md:pb-24"
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${NYC.ruleSoft}`,
      }}
    >
      {/* Article header — DAY / PAGE / CITY */}
      <div
        className="flex items-baseline justify-between py-3 mb-8"
        style={{ borderTop: `2px solid ${NYC.ink}`, borderBottom: `1px solid ${NYC.ruleSoft}` }}
      >
        <div className="flex items-baseline gap-4">
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: NYC.ink, fontWeight: 700 }}
          >
            DAY {String(day.day).padStart(2, '0')}
          </span>
          <span aria-hidden style={{ color: NYC.camel }}>·</span>
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: NYC.camel, fontWeight: 600 }}
          >
            {day.city}
          </span>
        </div>
        <span
          className="font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: NYC.graySoft }}
        >
          PAGE {pageNumber}
        </span>
      </div>

      {/* Day title block */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12"
      >
        <div className="md:col-span-2">
          <SerialNumber
            n={day.day}
            style={{ fontSize: 100, color: NYC.camel }}
          />
        </div>
        <div className="md:col-span-10">
          <h2
            className="font-display text-3xl md:text-5xl leading-[1.02]"
            style={{
              color: NYC.ink,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            {day.title}
          </h2>
          <p
            className="mt-6 font-body text-base md:text-lg leading-[1.85]"
            style={{ color: NYC.inkSoft }}
          >
            {day.summary}
          </p>
        </div>
      </motion.div>

      {/* Activities timeline */}
      <div className="mb-12">
        <div className="flex items-baseline gap-4 mb-6 pb-3"
          style={{ borderBottom: `1px solid ${NYC.ink}` }}
        >
          <Clock size={14} strokeWidth={2} style={{ color: NYC.ink }} />
          <span
            className="font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: NYC.ink, fontWeight: 700 }}
          >
            DAILY SCHEDULE
          </span>
          <span aria-hidden style={{ color: NYC.camel }}>·</span>
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: NYC.camel, fontWeight: 600 }}
          >
            {day.activities.length} ITEMS
          </span>
        </div>

        <div className="space-y-px"
          style={{ background: NYC.ruleSoft }}
        >
          {day.activities.map((a, i) => (
            <div
              key={i}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-4 md:gap-6 py-5 md:py-6 px-1"
              style={{ background: NYC.paperWarm }}
            >
              {/* Left: time */}
              <div>
                <p
                  className="font-mono text-base md:text-lg"
                  style={{
                    color: NYC.ink,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  {a.time}
                </p>
                <p
                  className="mt-1 font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: NYC.grayFaint, fontWeight: 600 }}
                >
                  {a.duration}
                </p>
              </div>
              {/* Right: activity */}
              <div className="pb-1">
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <h3
                    className="font-display text-xl md:text-2xl leading-snug"
                    style={{ color: NYC.ink, fontWeight: 600 }}
                  >
                    {a.name}
                  </h3>
                  {a.highlight && (
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] tracking-[0.22em] uppercase"
                      style={{
                        background: NYC.ink,
                        color: NYC.camel,
                        fontWeight: 700,
                      }}
                    >
                      <Star size={9} strokeWidth={2} fill={NYC.camel} />
                      {a.highlight}
                    </span>
                  )}
                </div>
                <p
                  className="font-body text-sm md:text-base leading-[1.7]"
                  style={{ color: NYC.graySoft }}
                >
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meals + Hotel grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ background: NYC.ruleSoft }}
      >
        {/* Meals */}
        <div
          className="p-6 md:p-8"
          style={{ background: NYC.paper }}
        >
          <div className="flex items-baseline gap-3 mb-6 pb-3"
            style={{ borderBottom: `1px solid ${NYC.ink}` }}
          >
            <Utensils size={14} strokeWidth={2} style={{ color: NYC.ink }} />
            <span
              className="font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: NYC.ink, fontWeight: 700 }}
            >
              MEALS
            </span>
            <span aria-hidden style={{ color: NYC.camel }}>·</span>
            <span
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: NYC.camel, fontWeight: 600 }}
            >
              {day.meals.length} COURSES
            </span>
          </div>

          <div className="space-y-5">
            {day.meals.map((m, i) => (
              <div key={i}>
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] uppercase w-14 shrink-0"
                    style={{ color: NYC.camel, fontWeight: 700 }}
                  >
                    {m.type === '早餐' ? 'BREAK.' : m.type === '午餐' ? 'LUNCH' : 'DINNER'}
                  </span>
                  <h4
                    className="font-display text-base md:text-lg leading-snug"
                    style={{ color: NYC.ink, fontWeight: 600 }}
                  >
                    {m.name}
                  </h4>
                </div>
                <p
                  className="font-body text-sm leading-[1.7] pl-[72px]"
                  style={{ color: NYC.graySoft }}
                >
                  {m.description}
                </p>
                {m.highlight && (
                  <p
                    className="pl-[72px] mt-1.5 font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: NYC.camel, fontWeight: 700 }}
                  >
                    {m.highlight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hotel */}
        <div
          className="p-6 md:p-8"
          style={{ background: NYC.ink, color: NYC.paper }}
        >
          <div className="flex items-baseline gap-3 mb-6 pb-3"
            style={{ borderBottom: `1px solid rgba(255,255,255,0.25)` }}
          >
            <BedDouble size={14} strokeWidth={2} style={{ color: NYC.camel }} />
            <span
              className="font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: NYC.camel, fontWeight: 700 }}
            >
              ACCOMMODATION
            </span>
          </div>

          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h4
              className="font-display text-xl leading-snug"
              style={{ color: NYC.paper, fontWeight: 700 }}
            >
              {day.hotel.name}
            </h4>
            <span
              className="font-mono text-[10px] tracking-[0.22em] uppercase shrink-0"
              style={{ color: NYC.camel, fontWeight: 600 }}
            >
              {day.hotel.level}
            </span>
          </div>
          <p
            className="font-body text-sm leading-[1.7] mb-5"
            style={{ color: 'rgba(255,255,255,0.78)' }}
          >
            {day.hotel.description}
          </p>
          {day.hotel.features.length > 0 && (
            <>
              <div
                className="h-px mb-4"
                style={{ background: 'rgba(255,255,255,0.18)' }}
              />
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {day.hotel.features.map((f, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {f}
                    {i < day.hotel.features.length - 1 && (
                      <span style={{ color: NYC.camel, marginLeft: 12 }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
