'use client';

/**
 * Itinerary — day-by-day 日程
 *
 * 結構：
 *   - 頁面 header（標題 + 副標）
 *   - 左側 sticky day nav（每天用 LotusIcon 印章 + 印章編號）
 *   - 右側日程內容、每天 accordion、預設 day 1 展開
 *   - 每 day：印章編號 + 標題 + city + summary / activities / meals / hotel
 *   - 底部 CTA + Footer
 *
 * 跟 maldives 的差異：
 *   - day header 用 StampNumber 印章式（巴里招牌）、不是裸的 7xl 襯線數字
 *   - activity 左側 timeline 用「葉脈點」而非「ocean 方塊」
 *   - hotel card 用 coconutBone 暖底 + FrameCorners 木刻角飾、不是 lagoonLight
 *   - highlight tag 用 spiceDeep 香料金 + LotusIcon、不是 ocean + Star
 *   - 整體更密、更工藝、更暖
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
} from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  BALI,
  SectionLabel,
  BaliButton,
  CarvedLine,
  DoubleCarved,
  LeafIcon,
  LotusIcon,
  StampNumber,
  WeavePattern,
  FrameCorners,
  EASE_OUT,
  JungleFooter,
} from './shared';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // scroll 高亮 nav
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
    <div style={{ background: BALI.coconut, color: BALI.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section className="relative px-6 md:px-12 pt-24 md:pt-32 pb-16">
        <WeavePattern opacity={0.04} color={BALI.wood} />

        <div className="relative mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 mb-14"
            style={{ color: BALI.wood, fontWeight: 400 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回行程介紹
          </button>

          <SectionLabel>Day by Day Itinerary</SectionLabel>
          <h1
            className="font-display mt-10 leading-[1.1] text-[40px] md:text-[68px]"
            style={{
              color: BALI.wood,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            {tour.title}
            <br />
            {tour.duration}日程
          </h1>
          <p
            className="mt-10 max-w-2xl text-base md:text-lg leading-[2.1]"
            style={{ color: BALI.inkSoft }}
          >
            從第一天抵達到最後一天回國、每天的活動、用餐與住宿、完整呈現。
            點任一天展開細節。所有時間皆為當地時間、視季節微調。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-12 pb-28 md:pb-40">
        <CarvedLine color={BALI.line} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 pt-14">
          {/* ─────────────── Left sticky nav ─────────────── */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <div className="flex items-center gap-3 mb-8">
                <LotusIcon size={13} color={BALI.spiceDeep} />
                <p
                  className="font-display text-[10px] tracking-[0.45em] uppercase"
                  style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                >
                  Day Navigation
                </p>
              </div>

              <div className="space-y-1 mb-10">
                {tour.itinerary.map((d) => (
                  <button
                    key={d.day}
                    onClick={() => scrollToDay(d.day)}
                    className="flex items-center gap-4 w-full text-left py-3 transition-all"
                    style={{
                      color: activeDay === d.day ? BALI.wood : BALI.inkFaint,
                    }}
                  >
                    <span
                      aria-hidden
                      className="block h-px transition-all shrink-0"
                      style={{
                        width: activeDay === d.day ? 36 : 14,
                        background:
                          activeDay === d.day ? BALI.spiceDeep : BALI.lineLight,
                      }}
                    />
                    <span
                      className="font-mono text-xs tracking-wider w-14 shrink-0"
                      style={{ fontWeight: 400 }}
                    >
                      Day {String(d.day).padStart(2, '0')}
                    </span>
                    <span
                      className="font-display text-sm leading-snug truncate"
                      style={{
                        color: activeDay === d.day ? BALI.wood : BALI.inkSoft,
                        fontWeight: 400,
                      }}
                    >
                      {d.city}
                    </span>
                  </button>
                ))}
              </div>

              <CarvedLine color={BALI.line} />

              <div className="pt-8 flex flex-col gap-3">
                <button
                  onClick={expandAll}
                  className="font-display text-[11px] tracking-[0.4em] uppercase text-left transition-opacity hover:opacity-70"
                  style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                >
                  展開全部
                </button>
                <button
                  onClick={collapseAll}
                  className="font-display text-[11px] tracking-[0.4em] uppercase text-left transition-opacity hover:opacity-70"
                  style={{ color: BALI.inkFaint, fontWeight: 400 }}
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
        className="relative px-6 md:px-12 py-28 md:py-40"
        style={{ background: BALI.jungleDeep, color: BALI.coconutLight }}
      >
        <WeavePattern opacity={0.05} color={BALI.coconutLight} />

        <div className="relative mx-auto max-w-4xl text-center">
          <SectionLabel align="center" tone="coconut">
            Book Your Seat
          </SectionLabel>
          <h2
            className="font-display mt-12 leading-[1.25] text-[32px] md:text-[52px]"
            style={{
              color: BALI.coconutLight,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            看完日程
            <br />
            走進叢林
          </h2>
          <p
            className="mt-10 max-w-xl mx-auto text-base leading-[2.05]"
            style={{ color: 'rgba(244,236,224,0.82)' }}
          >
            每團 {tour.groupSize.min}–{tour.groupSize.max} 人嚴格上限、
            出發前 30 天截止報名。
          </p>
          <div className="mt-14">
            <BaliButton size="lg" variant="spice" onClick={onSignup}>
              立即報名
            </BaliButton>
          </div>
        </div>
      </section>

      <JungleFooter />
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
      className="py-14 md:py-20"
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${BALI.line}`,
      }}
    >
      {/* Day header */}
      <button
        onClick={onToggle}
        className="w-full text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-8 md:gap-14">
          <div className="shrink-0 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <LotusIcon size={12} color={BALI.spiceDeep} />
              <span
                className="font-display text-[10px] tracking-[0.45em] uppercase"
                style={{ color: BALI.spiceDeep, fontWeight: 400 }}
              >
                Day
              </span>
            </div>
            <span
              className="font-display text-5xl md:text-7xl leading-none"
              style={{
                color: BALI.wood,
                fontWeight: 400,
                letterSpacing: '0.04em',
              }}
            >
              {String(day.day).padStart(2, '0')}
            </span>
            <div className="hidden md:block">
              <LeafIcon size={20} color={BALI.jungle} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-5">
              <MapPin
                size={13}
                strokeWidth={1.5}
                style={{ color: BALI.spiceDeep }}
              />
              <span
                className="font-display text-[10px] tracking-[0.4em] uppercase"
                style={{ color: BALI.spiceDeep, fontWeight: 400 }}
              >
                {day.city}
              </span>
            </div>
            <h3
              className="font-display leading-tight text-2xl md:text-[36px] mb-5"
              style={{
                color: BALI.wood,
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              {day.title}
            </h3>
            <p
              className="text-base leading-[2.05]"
              style={{ color: BALI.inkSoft }}
            >
              {day.summary}
            </p>
          </div>

          <div
            className="shrink-0 mt-3 transition-transform group-hover:scale-110"
            style={{ color: BALI.wood }}
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
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="pt-14 pl-0 md:pl-32">
              {/* Activities */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-10">
                  <LotusIcon size={13} color={BALI.spiceDeep} />
                  <p
                    className="font-display text-[10px] tracking-[0.5em] uppercase"
                    style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                  >
                    Activities · 當日活動
                  </p>
                </div>
                <div className="space-y-10">
                  {day.activities.map((a, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[88px_1fr] md:grid-cols-[112px_1fr] gap-7 md:gap-10"
                    >
                      <div>
                        <span
                          className="font-mono text-sm tracking-wider block"
                          style={{ color: BALI.wood }}
                        >
                          {a.time}
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-wider block mt-1"
                          style={{ color: BALI.inkFaint }}
                        >
                          {a.duration}
                        </span>
                      </div>
                      <div
                        className="relative pb-8"
                        style={{
                          borderLeft: `1px solid ${BALI.line}`,
                          paddingLeft: 32,
                        }}
                      >
                        {/* 葉脈點（代替方塊） */}
                        <span
                          aria-hidden
                          className="absolute -left-[8px] top-1"
                        >
                          <LeafIcon size={16} color={BALI.jungle} />
                        </span>
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h4
                            className="font-display text-xl leading-snug"
                            style={{
                              color: BALI.wood,
                              fontWeight: 400,
                              letterSpacing: '0.02em',
                            }}
                          >
                            {a.name}
                          </h4>
                          {a.highlight && (
                            <span
                              className="font-display text-[10px] tracking-[0.35em] uppercase px-3 py-1.5 inline-flex items-center gap-2"
                              style={{
                                background: BALI.spiceDeep,
                                color: BALI.coconutLight,
                                fontWeight: 400,
                              }}
                            >
                              <LotusIcon
                                size={9}
                                color={BALI.coconutLight}
                              />
                              {a.highlight}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-base leading-[2.05]"
                          style={{ color: BALI.inkSoft }}
                        >
                          {a.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals + Hotel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14">
                {/* Meals */}
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <Utensils
                      size={14}
                      strokeWidth={1.5}
                      style={{ color: BALI.spiceDeep }}
                    />
                    <p
                      className="font-display text-[10px] tracking-[0.5em] uppercase"
                      style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                    >
                      Meals · 用餐
                    </p>
                  </div>
                  <div className="space-y-7">
                    {day.meals.map((m, i) => (
                      <div key={i}>
                        <div className="flex items-baseline gap-4 mb-2">
                          <span
                            className="font-mono text-[10px] tracking-[0.3em] uppercase w-12 shrink-0"
                            style={{ color: BALI.inkFaint }}
                          >
                            {m.type}
                          </span>
                          <h5
                            className="font-display text-base leading-snug"
                            style={{
                              color: BALI.wood,
                              fontWeight: 400,
                            }}
                          >
                            {m.name}
                          </h5>
                        </div>
                        <p
                          className="text-sm leading-[2] pl-16"
                          style={{ color: BALI.inkSoft }}
                        >
                          {m.description}
                        </p>
                        {m.highlight && (
                          <div
                            className="pl-16 mt-2 flex items-center gap-2"
                            style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                          >
                            <LotusIcon size={9} color={BALI.spiceDeep} />
                            <span className="font-display text-[10px] tracking-[0.4em] uppercase">
                              {m.highlight}
                            </span>
                          </div>
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
                      strokeWidth={1.5}
                      style={{ color: BALI.spiceDeep }}
                    />
                    <p
                      className="font-display text-[10px] tracking-[0.5em] uppercase"
                      style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                    >
                      Hotel · 住宿
                    </p>
                  </div>
                  <div
                    className="relative p-7"
                    style={{
                      background: BALI.coconutBone,
                      border: `1px solid ${BALI.line}`,
                    }}
                  >
                    <FrameCorners
                      color={BALI.spice}
                      size={16}
                      inset={10}
                    />

                    <div className="flex items-baseline justify-between gap-4 mb-3 relative">
                      <h5
                        className="font-display text-lg leading-snug"
                        style={{
                          color: BALI.wood,
                          fontWeight: 400,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {day.hotel.name}
                      </h5>
                      <span
                        className="font-mono text-[10px] tracking-[0.3em] uppercase shrink-0"
                        style={{ color: BALI.spiceDeep }}
                      >
                        {day.hotel.level}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-[2] mb-5 relative"
                      style={{ color: BALI.inkSoft }}
                    >
                      {day.hotel.description}
                    </p>
                    {day.hotel.features.length > 0 && (
                      <div className="relative">
                        <CarvedLine color={BALI.line} />
                        <div className="pt-5 flex flex-wrap gap-x-4 gap-y-2">
                          {day.hotel.features.map((f, i) => (
                            <span
                              key={i}
                              className="font-mono text-[10px] tracking-wider inline-flex items-center gap-2"
                              style={{ color: BALI.inkSoft }}
                            >
                              <LeafIcon size={10} color={BALI.jungle} />
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
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
