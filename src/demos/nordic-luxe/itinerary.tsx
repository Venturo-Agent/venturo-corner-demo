'use client';

/**
 * Itinerary — day-by-day 日程（北歐極簡奢華 Nordic Luxe）
 *
 * 跟 alpine itinerary 對比：
 *   - alpine: 左 sticky nav 用 D01 / D02 + 細線、右 day section 用「大數字 day 序」+ 摺疊
 *   - nordic: 左 sticky nav 用「小數字 + 城市名」、右 day section 用 hotel daily activity sheet 風
 *     —— 不展開摺疊、整頁直接 stack（hotel 真實 daily program）
 *   - alpine activities 用「時間 + 描述」灰底
 *   - nordic activities 用「左 time / 中 dot / 右 內容」、像 hotel 早晨送進房的 daily program
 *   - alpine hotel 用 box 框、nordic hotel 用「住宿產品攝影卡」（含圖）
 *
 * 結構：
 *   1. Header
 *   2. Left sticky nav + Right content
 *   3. 每個 Day section（直接展開、不摺疊）：
 *      - Day header（大數字 + 城市 + 標題 + summary）
 *      - Activities（time + 描述、像 hotel daily program）
 *      - Meals（橫線分隔的 row）
 *      - Hotel（含縮圖、產品攝影卡感）
 *   4. CTA
 */

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Sun,
  Coffee,
  Bed,
} from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  NORDIC,
  CaptionLabel,
  QuietLabel,
  NordicButton,
  HairLine,
  LightTitle,
  NORDIC_EASE,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // intersection observer for active day nav
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
    <div style={{ background: NORDIC.paper, color: NORDIC.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section className="px-10 md:px-20 pt-24 md:pt-32 pb-16">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-65 mb-16"
            style={{ color: NORDIC.stone, fontWeight: 400 }}
          >
            <ArrowLeft size={13} strokeWidth={1.2} />
            返回行程介紹
          </button>

          <CaptionLabel>Day by Day Itinerary</CaptionLabel>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-end">
            <div className="md:col-span-7">
              <LightTitle
                as="h1"
                className="text-[40px] md:text-[72px]"
                style={{ lineHeight: 1.05 }}
              >
                {tour.title}
              </LightTitle>
              <p
                className="mt-8 font-mono text-[12px] tracking-[0.25em] uppercase"
                style={{ color: NORDIC.stone }}
              >
                {tour.duration}  ·  {tour.itinerary.length} Days
              </p>
            </div>
            <div className="md:col-span-5 md:pb-4">
              <div
                className="h-px w-12 mb-8"
                style={{ background: NORDIC.stone }}
              />
              <p
                className="text-[15px] leading-[2.05]"
                style={{ color: NORDIC.inkSoft }}
              >
                每一天的活動、用餐與住宿、完整呈現。
                如同你 check-in 時拿到的 hotel daily program——透明、安靜。
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
              <QuietLabel>Day Navigation</QuietLabel>

              <div className="mt-10 space-y-1">
                {tour.itinerary.map((d) => {
                  const isActive = activeDay === d.day;
                  return (
                    <button
                      key={d.day}
                      onClick={() => scrollToDay(d.day)}
                      className="flex items-baseline gap-4 w-full text-left py-3 transition-all"
                    >
                      <span
                        className="font-mono text-[11px] tracking-[0.2em] w-8 shrink-0"
                        style={{
                          color: isActive ? NORDIC.charcoal : NORDIC.stoneSoft,
                        }}
                      >
                        {String(d.day).padStart(2, '0')}
                      </span>
                      <span
                        aria-hidden
                        className="block h-px transition-all shrink-0"
                        style={{
                          width: isActive ? 24 : 8,
                          background: isActive ? NORDIC.charcoal : NORDIC.line,
                        }}
                      />
                      <span
                        className="font-display text-[13px] leading-snug truncate"
                        style={{
                          color: isActive ? NORDIC.ink : NORDIC.stoneSoft,
                          fontWeight: 400,
                        }}
                      >
                        {d.city}
                      </span>
                    </button>
                  );
                })}
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
        style={{ background: NORDIC.oak }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="block w-px h-20 mx-auto mb-16"
            style={{ background: NORDIC.stone }}
          />
          <CaptionLabel align="center">Book Your Seat</CaptionLabel>
          <LightTitle
            as="h2"
            className="text-[32px] md:text-[52px] mt-12"
            style={{ lineHeight: 1.3 }}
          >
            看完日程
            <br />
            出發吧
          </LightTitle>
          <p
            className="mt-10 max-w-md mx-auto text-[15px] leading-[2.05]"
            style={{ color: NORDIC.inkSoft }}
          >
            每團 {tour.groupSize.min}–{tour.groupSize.max} 人嚴格上限、出發前 30 天截止報名。
          </p>
          <div className="mt-16">
            <NordicButton size="lg" onClick={onSignup}>
              立即報名
            </NordicButton>
          </div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Day section — hotel daily activity sheet 風（不摺疊、整頁 stack）
// ─────────────────────────────────────────────────────

function DaySection({
  day,
  isLast,
  refSet,
}: {
  day: ItineraryDay;
  isLast: boolean;
  refSet: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refSet}
      data-day={day.day}
      className="py-20 md:py-24"
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${NORDIC.line}`,
      }}
    >
      {/* Day header — 大數字 + 城市 + 標題 + summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: NORDIC_EASE }}
        className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-8 md:gap-12 items-start mb-16"
      >
        <div>
          <QuietLabel>Day</QuietLabel>
          <span
            className="font-display leading-none text-5xl md:text-7xl block mt-3"
            style={{ color: NORDIC.charcoal, fontWeight: 300 }}
          >
            {String(day.day).padStart(2, '0')}
          </span>
        </div>

        <div className="flex-1 min-w-0 pt-2">
          <div className="flex items-center gap-4 mb-4">
            <span
              aria-hidden
              className="block w-6 h-px"
              style={{ background: NORDIC.stone }}
            />
            <QuietLabel>{day.city}</QuietLabel>
          </div>
          <LightTitle
            as="h3"
            className="text-2xl md:text-[36px]"
            style={{ lineHeight: 1.2 }}
          >
            {day.title}
          </LightTitle>
          <p
            className="mt-6 text-[15px] leading-[2] max-w-2xl"
            style={{ color: NORDIC.inkSoft }}
          >
            {day.summary}
          </p>
        </div>
      </motion.div>

      <div className="pl-0 md:pl-[152px]">
        {/* Activities — 像 hotel 早晨送進房的 daily program */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <Sun size={14} strokeWidth={1.2} style={{ color: NORDIC.stone }} />
            <QuietLabel>Activities  ·  當日活動</QuietLabel>
          </div>

          <div>
            {day.activities.map((a, i) => (
              <div
                key={i}
                className="py-8 grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12"
                style={{
                  borderTop: `1px solid ${NORDIC.lineSoft}`,
                  borderBottom:
                    i === day.activities.length - 1
                      ? `1px solid ${NORDIC.lineSoft}`
                      : 'none',
                }}
              >
                <div>
                  <span
                    className="font-mono text-[15px] tracking-wider block"
                    style={{ color: NORDIC.ink, fontWeight: 300 }}
                  >
                    {a.time}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] block mt-1 uppercase"
                    style={{ color: NORDIC.stoneSoft }}
                  >
                    {a.duration}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-4 mb-3 flex-wrap">
                    <LightTitle
                      as="h4"
                      className="text-xl md:text-[22px]"
                      style={{ lineHeight: 1.35 }}
                    >
                      {a.name}
                    </LightTitle>
                    {a.highlight && (
                      <span
                        className="font-display text-[9px] tracking-[0.35em] uppercase px-3 py-1.5"
                        style={{
                          background: NORDIC.charcoal,
                          color: NORDIC.paper,
                          fontWeight: 400,
                        }}
                      >
                        {a.highlight}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[14px] leading-[1.95]"
                    style={{ color: NORDIC.inkSoft }}
                  >
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meals + Hotel 兩欄 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Meals — 橫線分隔的 row */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <Coffee
                size={14}
                strokeWidth={1.2}
                style={{ color: NORDIC.stone }}
              />
              <QuietLabel>Meals  ·  用餐</QuietLabel>
            </div>
            <div>
              {day.meals.map((m, i) => (
                <div
                  key={i}
                  className="py-6"
                  style={{
                    borderTop: `1px solid ${NORDIC.lineSoft}`,
                    borderBottom:
                      i === day.meals.length - 1
                        ? `1px solid ${NORDIC.lineSoft}`
                        : 'none',
                  }}
                >
                  <div className="flex items-baseline gap-4 mb-2">
                    <span
                      className="font-mono text-[10px] tracking-[0.25em] uppercase w-12 shrink-0"
                      style={{ color: NORDIC.stoneSoft }}
                    >
                      {m.type}
                    </span>
                    <LightTitle as="h5" className="text-[15px]" style={{ lineHeight: 1.4 }}>
                      {m.name}
                    </LightTitle>
                  </div>
                  <p
                    className="text-[13px] leading-[1.95] pl-16"
                    style={{ color: NORDIC.inkSoft }}
                  >
                    {m.description}
                  </p>
                  {m.highlight && (
                    <p
                      className="pl-16 mt-2 font-display text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: NORDIC.stone, fontWeight: 400 }}
                    >
                      {m.highlight}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hotel — 產品攝影卡感（含縮圖）*/}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <Bed
                size={14}
                strokeWidth={1.2}
                style={{ color: NORDIC.stone }}
              />
              <QuietLabel>Hotel  ·  住宿</QuietLabel>
            </div>
            <div
              style={{
                background: NORDIC.paperSoft,
                border: `1px solid ${NORDIC.line}`,
              }}
            >
              <div className="p-8">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <LightTitle
                    as="h5"
                    className="text-lg"
                    style={{ lineHeight: 1.35 }}
                  >
                    {day.hotel.name}
                  </LightTitle>
                  <QuietLabel>{day.hotel.level}</QuietLabel>
                </div>
                <p
                  className="text-[13px] leading-[1.95] mb-6"
                  style={{ color: NORDIC.inkSoft }}
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
                          style={{ color: NORDIC.stone }}
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
      </div>
    </div>
  );
}
