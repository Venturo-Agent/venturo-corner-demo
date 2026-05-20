'use client';

/**
 * Itinerary — 每一天是「一頁日記」、有手寫日期 + 印章 + 插畫
 *
 * 結構（Wes Anderson 對稱 + 復古日記頁感）：
 *   - Header — 對稱大標、總共 X 天
 *   - Sticky chapter nav
 *   - Day pages — 每天像翻一頁日記
 *     - 大號 day 數字 + 手寫日期線 + 城市印章
 *     - 活動 timeline、用印章替代 bullet
 *     - 用餐（卡片）+ 住宿（卡片）對稱排版
 *   - CTA
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  PAPER,
  PaperGrain,
  PaperNoise,
  SectionLabel,
  PosterTitle,
  PaperButton,
  PostageStamp,
  PostmarkLine,
  HandwrittenLine,
  HairLine,
  MonoCaption,
  NumberMark,
  Airplane,
  Compass,
  Train,
  Globe,
  FlyingBirds,
  StarFilled,
  Tree,
  Mountain,
  CategoryIcon,
  CATEGORY_STAMP,
} from './shared';
import { IllustratedFooter } from './home';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
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

  const stamp = CATEGORY_STAMP[tour.category];

  return (
    <div style={{ background: PAPER.cream, color: PAPER.ink }}>
      {/* ─────────────── Top bar ─────────────── */}
      <header
        className="relative px-6 md:px-12 py-5"
        style={{
          background: PAPER.cream,
          borderBottom: `1.5px solid ${PAPER.ink}`,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase transition-all hover:gap-3"
            style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
          >
            <span aria-hidden>←</span>
            回筆記首頁
          </button>
          <MonoCaption>
            Diary · {stamp.code} · {tour.itinerary.length} · Days
          </MonoCaption>
        </div>
      </header>

      {/* ─────────────── Header ─────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 pt-20 md:pt-24 pb-16 text-center"
        style={{ background: PAPER.cream }}
      >
        <PaperGrain opacity={0.4} />

        <div className="relative mx-auto max-w-6xl">
          {/* 對稱裝飾 */}
          <div className="flex items-center justify-center gap-10 md:gap-16 mb-12">
            <Train size={80} color={PAPER.ink} stroke={1.3} />
            <FlyingBirds size={48} color={PAPER.ink} />
            <div className="scale-x-[-1]">
              <Airplane size={80} color={PAPER.ink} stroke={1.3} />
            </div>
          </div>

          <SectionLabel align="center" color={PAPER.tomatoDeep}>
            Daily · Diary · Pages
          </SectionLabel>

          <div className="my-10">
            <HairLine variant="double" color={PAPER.ink} />
            <div className="py-10">
              <PosterTitle size="md" className="text-center">
                每日日記
              </PosterTitle>
            </div>
            <div className="flex items-center justify-center gap-6">
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
              <MonoCaption color={PAPER.tomatoDeep}>
                {tour.title} · {tour.duration}
              </MonoCaption>
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
            </div>
            <HairLine variant="double" color={PAPER.ink} className="mt-8" />
          </div>

          <p
            className="mx-auto max-w-2xl font-display text-base md:text-lg leading-[1.95]"
            style={{ color: PAPER.inkSoft }}
          >
            一共 {tour.itinerary.length} 頁日記、{tour.duration}。
            <br />
            每一頁寫下這天住哪、吃哪、走過什麼風景、會路過什麼小店。
          </p>
        </div>
      </section>

      {/* ─────────────── Sticky chapter nav ─────────────── */}
      <section
        className="sticky top-0 z-30 px-6 md:px-12 py-5"
        style={{
          background: PAPER.parchment,
          borderTop: `1.5px solid ${PAPER.ink}`,
          borderBottom: `1.5px solid ${PAPER.ink}`,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-1 -mb-1">
            <MonoCaption color={PAPER.lavenderDeep}>
              Jump · To
            </MonoCaption>
            {tour.itinerary.map((d) => {
              const isActive = activeDay === d.day;
              return (
                <button
                  key={d.day}
                  onClick={() => scrollToDay(d.day)}
                  className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 transition-all"
                  style={{
                    background: isActive ? PAPER.ink : 'transparent',
                    color: isActive ? PAPER.cream : PAPER.ink,
                    border: `1.5px solid ${PAPER.ink}`,
                  }}
                >
                  <span
                    className="font-display text-[11px] tracking-[0.18em] uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    Day · {String(d.day).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
            <div className="shrink-0 flex items-center gap-2 ml-auto">
              <button
                onClick={expandAll}
                className="font-display text-[11px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60"
                style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
              >
                全部翻開
              </button>
              <span style={{ color: PAPER.line }}>·</span>
              <button
                onClick={collapseAll}
                className="font-display text-[11px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60"
                style={{ color: PAPER.inkSoft, fontWeight: 500 }}
              >
                收起
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Chapter list ─────────────── */}
      <section className="relative px-6 md:px-12 py-16 md:py-24 overflow-hidden">
        <PaperGrain opacity={0.3} />

        <div className="relative mx-auto max-w-5xl">
          {tour.itinerary.map((day, i) => (
            <DayPage
              key={day.day}
              day={day}
              isLast={i === tour.itinerary.length - 1}
              totalDays={tour.itinerary.length}
              isOpen={openDays.has(day.day)}
              onToggle={() => toggleDay(day.day)}
              refSet={(el) => {
                daySectionRefs.current[day.day] = el;
              }}
              tourCategory={tour.category}
            />
          ))}
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-32 md:py-40 overflow-hidden"
        style={{ background: PAPER.ink }}
      >
        <PaperNoise opacity={0.12} />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-10 md:gap-14 mb-12">
            <Compass size={64} color={PAPER.cream} />
            <Globe size={72} color={PAPER.tomato} stroke={1.3} />
            <Compass size={64} color={PAPER.cream} />
          </div>

          <SectionLabel align="center" color={PAPER.tomatoLight}>
            Last · Page
          </SectionLabel>

          <h2
            className="mt-10 font-display uppercase leading-[1.05] text-[40px] md:text-[80px]"
            style={{
              color: PAPER.cream,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            看完{tour.itinerary.length}頁、
            <br />
            <span style={{ color: PAPER.tomato }}>寫上名字</span>
          </h2>

          <p
            className="mt-10 mx-auto max-w-xl font-display text-base md:text-lg leading-[1.95]"
            style={{ color: 'rgba(252,242,226,0.8)' }}
          >
            每團限 {tour.groupSize.min} — {tour.groupSize.max} 人、
            <br />
            出發前 30 天截止報名。
          </p>

          <div className="mt-14">
            <PaperButton size="lg" variant="inverse" onClick={onSignup}>
              寫上我們的名字
            </PaperButton>
          </div>
        </div>
      </section>

      <IllustratedFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// DayPage — 每一天像翻一頁日記
// ─────────────────────────────────────────────────────

function DayPage({
  day,
  isLast,
  totalDays,
  isOpen,
  onToggle,
  refSet,
  tourCategory,
}: {
  day: ItineraryDay;
  isLast: boolean;
  totalDays: number;
  isOpen: boolean;
  onToggle: () => void;
  refSet: (el: HTMLDivElement | null) => void;
  tourCategory: string;
}) {
  return (
    <div
      ref={refSet}
      data-day={day.day}
      className="py-10 md:py-14 first:pt-0"
    >
      <div
        className="relative"
        style={{
          background: PAPER.creamLight,
          border: `1.5px solid ${PAPER.ink}`,
          outline: `1px solid ${PAPER.ink}`,
          outlineOffset: '8px',
        }}
      >
        <PaperGrain opacity={0.2} />

        {/* Day header */}
        <button
          onClick={onToggle}
          className="relative w-full text-left p-8 md:p-12"
          aria-expanded={isOpen}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
            {/* Big day number */}
            <div className="md:col-span-3">
              <MonoCaption color={PAPER.tomatoDeep}>
                Day · {String(day.day).padStart(2, '0')} · / · {String(totalDays).padStart(2, '0')}
              </MonoCaption>
              <div className="mt-3">
                <span
                  className="font-display block leading-none text-[88px] md:text-[120px]"
                  style={{
                    color: PAPER.ink,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {String(day.day).padStart(2, '0')}
                </span>
              </div>
              <HandwrittenLine
                width={120}
                color={PAPER.tomatoDeep}
                className="mt-2"
              />
            </div>

            {/* Title + city + summary */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5"
                  style={{
                    background: PAPER.ink,
                    color: PAPER.cream,
                  }}
                >
                  <StarFilled size={10} color={PAPER.tomato} />
                  <span
                    className="font-display text-[11px] tracking-[0.22em] uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    {day.city}
                  </span>
                </span>
              </div>

              <h3
                className="font-display uppercase leading-[1.15] text-2xl md:text-[34px]"
                style={{
                  color: PAPER.ink,
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                }}
              >
                {day.title}
              </h3>

              <p
                className="mt-5 font-display text-base md:text-lg leading-[1.85]"
                style={{ color: PAPER.inkSoft }}
              >
                {day.summary}
              </p>
            </div>

            {/* Toggle */}
            <div className="md:col-span-2 flex md:justify-end md:items-start">
              <PageToggle isOpen={isOpen} />
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
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden relative"
            >
              <div
                className="px-8 md:px-12 pb-12 pt-2"
                style={{ borderTop: `1.5px dashed ${PAPER.ink}` }}
              >
                {/* Activities */}
                <div className="pt-10 mb-12">
                  <div className="flex items-center gap-4 mb-8">
                    <CategoryIcon category={tourCategory} size={40} color={PAPER.ink} />
                    <div>
                      <MonoCaption color={PAPER.tomatoDeep}>Activities</MonoCaption>
                      <h4
                        className="font-display uppercase text-xl leading-tight mt-1"
                        style={{
                          color: PAPER.ink,
                          fontWeight: 500,
                          letterSpacing: '0.01em',
                        }}
                      >
                        今天會走過的
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {day.activities.map((a, i) => (
                      <ActivityRow key={i} activity={a} index={i} />
                    ))}
                  </div>
                </div>

                {/* Meals + Hotel — 對稱雙欄 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <MealsCard meals={day.meals} />
                  <HotelCard hotel={day.hotel} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 章節分隔 — 對稱裝飾 */}
      {!isLast && (
        <div className="flex justify-center pt-16 pb-4">
          <ChapterDivider />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ActivityRow — 活動 timeline
// ─────────────────────────────────────────────────────

function ActivityRow({
  activity,
  index,
}: {
  activity: {
    time: string;
    name: string;
    description: string;
    duration: string;
    highlight?: string;
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-6 md:gap-8"
    >
      {/* Time stamp */}
      <div className="text-right">
        <div
          className="inline-flex flex-col items-center px-4 py-2"
          style={{
            background: PAPER.ink,
            color: PAPER.cream,
          }}
        >
          <span
            className="font-display text-base md:text-lg leading-tight"
            style={{ fontWeight: 500, letterSpacing: '0.05em' }}
          >
            {activity.time}
          </span>
        </div>
        <p
          className="mt-2 font-display text-[10px] tracking-[0.22em] uppercase"
          style={{ color: PAPER.inkFaint, fontWeight: 500 }}
        >
          {activity.duration}
        </p>
      </div>

      {/* Body */}
      <div
        className="relative pb-4 pl-7"
        style={{ borderLeft: `2px solid ${PAPER.ink}` }}
      >
        {/* 連線端點：實心五角星 */}
        <span
          aria-hidden
          className="absolute -left-[10px] top-0 flex items-center justify-center"
          style={{
            background: PAPER.creamLight,
            padding: 2,
            width: 18,
            height: 18,
          }}
        >
          <StarFilled size={14} color={PAPER.tomatoDeep} />
        </span>

        <div className="flex items-center gap-3 flex-wrap mb-2">
          <h4
            className="font-display text-lg md:text-xl leading-snug"
            style={{
              color: PAPER.ink,
              fontWeight: 500,
              letterSpacing: '0.005em',
            }}
          >
            {activity.name}
          </h4>
          {activity.highlight && (
            <span
              className="inline-flex items-center gap-1.5 px-2 py-1"
              style={{
                background: PAPER.tomato,
                color: PAPER.ink,
                border: `1px solid ${PAPER.ink}`,
              }}
            >
              <StarFilled size={9} color={PAPER.ink} />
              <span
                className="font-display text-[10px] tracking-[0.18em] uppercase"
                style={{ fontWeight: 500 }}
              >
                {activity.highlight}
              </span>
            </span>
          )}
        </div>
        <p
          className="font-display text-base leading-[1.85]"
          style={{ color: PAPER.inkSoft }}
        >
          {activity.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────
// MealsCard — 三餐
// ─────────────────────────────────────────────────────

function MealsCard({
  meals,
}: {
  meals: Array<{
    type: string;
    name: string;
    description: string;
    highlight?: string;
  }>;
}) {
  return (
    <div
      className="relative p-6 md:p-8"
      style={{
        background: PAPER.parchment,
        border: `1.5px solid ${PAPER.ink}`,
      }}
    >
      <PaperGrain opacity={0.2} />
      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <ForkIcon />
          <div>
            <MonoCaption color={PAPER.tomatoDeep}>Meals</MonoCaption>
            <h5
              className="mt-1 font-display uppercase text-lg leading-tight"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              三餐
            </h5>
          </div>
        </div>
        <HairLine variant="dashed" color={PAPER.ink} />
        <div className="mt-6 space-y-5">
          {meals.map((m, i) => (
            <div key={i}>
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span
                  className="inline-block px-2 py-1"
                  style={{
                    background: PAPER.ink,
                    color: PAPER.cream,
                  }}
                >
                  <span
                    className="font-display text-[10px] tracking-[0.22em] uppercase"
                    style={{ fontWeight: 500 }}
                  >
                    {m.type}
                  </span>
                </span>
                <h6
                  className="font-display text-base leading-snug"
                  style={{ color: PAPER.ink, fontWeight: 500 }}
                >
                  {m.name}
                </h6>
              </div>
              <p
                className="ml-1 font-display text-sm leading-[1.85]"
                style={{ color: PAPER.inkSoft }}
              >
                {m.description}
              </p>
              {m.highlight && (
                <div className="mt-2 ml-1 inline-flex items-center gap-1.5">
                  <StarFilled size={9} color={PAPER.tomatoDeep} />
                  <span
                    className="font-display text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
                  >
                    {m.highlight}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// HotelCard — 今晚住哪
// ─────────────────────────────────────────────────────

function HotelCard({
  hotel,
}: {
  hotel: {
    name: string;
    level: string;
    description: string;
    features: string[];
  };
}) {
  return (
    <div
      className="relative p-6 md:p-8 overflow-hidden"
      style={{
        background: PAPER.creamLight,
        border: `1.5px solid ${PAPER.ink}`,
      }}
    >
      <PaperGrain opacity={0.2} />

      {/* 背景裝飾 */}
      <div className="absolute -top-4 -right-4 opacity-15 pointer-events-none">
        <Mountain size={120} color={PAPER.ink} stroke={1.3} />
      </div>

      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <BedIcon />
          <div>
            <MonoCaption color={PAPER.tomatoDeep}>Tonight</MonoCaption>
            <h5
              className="mt-1 font-display uppercase text-lg leading-tight"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              今晚住哪
            </h5>
          </div>
        </div>
        <HairLine variant="dashed" color={PAPER.ink} />

        <div className="mt-6 flex items-start justify-between gap-3 mb-3">
          <h6
            className="font-display text-lg leading-snug"
            style={{
              color: PAPER.ink,
              fontWeight: 500,
              letterSpacing: '0.005em',
            }}
          >
            {hotel.name}
          </h6>
          <span
            className="inline-block px-2 py-1 shrink-0"
            style={{
              background: PAPER.tomato,
              color: PAPER.ink,
              border: `1px solid ${PAPER.ink}`,
            }}
          >
            <span
              className="font-display text-[10px] tracking-[0.22em] uppercase"
              style={{ fontWeight: 500 }}
            >
              {hotel.level}
            </span>
          </span>
        </div>

        <p
          className="font-display text-sm leading-[1.85] mb-5"
          style={{ color: PAPER.inkSoft }}
        >
          {hotel.description}
        </p>

        {hotel.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hotel.features.map((f, i) => (
              <span
                key={i}
                className="inline-block px-3 py-1"
                style={{
                  background: PAPER.parchment,
                  color: PAPER.inkSoft,
                  border: `1px dashed ${PAPER.line}`,
                }}
              >
                <span
                  className="font-display text-[11px] tracking-[0.18em] uppercase"
                  style={{ fontWeight: 500 }}
                >
                  {f}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PageToggle — 翻頁角標
// ─────────────────────────────────────────────────────

function PageToggle({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className="w-12 h-12 flex items-center justify-center transition-transform"
      style={{
        background: isOpen ? PAPER.ink : PAPER.creamLight,
        color: isOpen ? PAPER.cream : PAPER.ink,
        border: `1.5px solid ${PAPER.ink}`,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path
          d="M4 7 L 9 12 L 14 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ChapterDivider — 章節之間的對稱裝飾
// ─────────────────────────────────────────────────────

function ChapterDivider() {
  return (
    <div className="flex items-center gap-5">
      <HairLine variant="single" color={PAPER.ink} className="w-12 md:w-20" />
      <StarFilled size={12} color={PAPER.tomatoDeep} />
      <Tree size={32} color={PAPER.ink} stroke={1.3} />
      <StarFilled size={14} color={PAPER.tomatoDeep} />
      <Tree size={32} color={PAPER.ink} stroke={1.3} />
      <StarFilled size={12} color={PAPER.tomatoDeep} />
      <HairLine variant="single" color={PAPER.ink} className="w-12 md:w-20" />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ForkIcon / BedIcon — 餐 / 床 圖示（自製、線稿風）
// ─────────────────────────────────────────────────────

function ForkIcon() {
  return (
    <div
      className="w-12 h-12 flex items-center justify-center shrink-0"
      style={{
        background: PAPER.tomato,
        border: `1.5px solid ${PAPER.ink}`,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M5 3 L 5 9 M 7 3 L 7 9 M 9 3 L 9 9 M 7 9 L 7 19 M 15 3 C 13 3, 13 10, 15 10 L 15 19"
          stroke={PAPER.ink}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function BedIcon() {
  return (
    <div
      className="w-12 h-12 flex items-center justify-center shrink-0"
      style={{
        background: PAPER.lavender,
        border: `1.5px solid ${PAPER.ink}`,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M3 14 L 3 8 L 19 8 L 19 14 M 3 11 L 19 11 M 3 14 L 3 19 M 19 14 L 19 19"
          stroke={PAPER.cream}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="9.5" r="1" fill={PAPER.cream} />
      </svg>
    </div>
  );
}
