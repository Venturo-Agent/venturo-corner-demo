'use client';

/**
 * Itinerary — Aman Eastern day-by-day（冥想日課）
 *
 * 結構（極簡、像冥想日課）：
 *   1. Top bar
 *   2. 頁面 header — 雙語標題 + 規格行
 *   3. 主區：
 *      - 左 sticky 日次目錄（Day I / Day II / … 羅馬數字）
 *      - 右側 day-by-day、預設全部展開（不需 accordion、aman 不需互動）
 *      - 每天 — 大標題（雙語 day 標）/ summary / 細線分隔的活動表 / 餐事 / 夜宿
 *   4. CTA — 預約席位
 *   5. Footer
 *
 * 跟 hoshinoya-onsen 的差異：
 *   - hoshino 用「第一帖」漢字 + 燈籠目錄、暖色繁複
 *   - aman 用「Day I」羅馬 + 極細線目錄、冷而極簡
 *   - hoshino 用 accordion 「拉開 / 闔上」
 *   - aman 全部展開、像冥想清單一條接一條、不需互動
 *
 * 跟 muji 的差異：
 *   - muji 用「001 / 002」工業編號 + 中間色文字
 *   - aman 用羅馬 + 留白、字級更瘦、節奏更慢
 */

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  AMAN,
  AmanWordmark,
  AmanButton,
  QuietLabel,
  Hair,
  CenterDivider,
  SmallIndex,
  PhotoCaption,
  roman,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

const SLOW_EASE = [0.22, 1, 0.36, 1] as const;

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // intersection observer：scroll 到哪一天就高亮目錄
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

  const scrollToDay = (day: number) => {
    const el = daySectionRefs.current[day];
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: AMAN.stone, color: AMAN.ink }}>
      {/* ─────────────── Top bar ─────────────── */}
      <section className="px-6 md:px-16 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-5 transition-colors"
          >
            <span
              aria-hidden
              className="block h-px w-8 transition-all duration-500 group-hover:w-14"
              style={{ background: AMAN.ink }}
            />
            <span
              className="font-display text-[11px]"
              style={{
                color: AMAN.ink,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              JOURNEY
            </span>
          </button>
          <AmanWordmark size="sm" color={AMAN.ink} />
        </div>
      </section>

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-16 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
          >
            <QuietLabel align="center">DAILY MEDITATION</QuietLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: SLOW_EASE }}
            className="mt-16 font-display text-[40px] md:text-[68px] leading-[1.1]"
            style={{
              color: AMAN.ink,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            {tour.title}
            <br />
            <span style={{ color: AMAN.brassDeep, fontSize: '0.55em' }}>
              {tour.duration}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="mt-10 max-w-xl mx-auto text-sm leading-[2]"
            style={{ color: AMAN.inkMid, fontWeight: 300 }}
          >
            {tour.itinerary.length} 個日課　|　{tour.groupSize.min}–
            {tour.groupSize.max} 人　|　{tour.destination}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="mt-16"
          >
            <CenterDivider />
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Main area — left nav + right days ─────────────── */}
      <section className="px-6 md:px-16 pb-32 md:pb-48">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-16 lg:gap-24">
          {/* Left sticky nav */}
          <aside className="lg:sticky lg:top-12 lg:self-start">
            <p
              className="font-display text-[10px] mb-8"
              style={{
                color: AMAN.brassDeep,
                letterSpacing: '0.45em',
                fontWeight: 300,
              }}
            >
              INDEX
            </p>
            <Hair color={AMAN.brassSoft} />
            <nav className="mt-4">
              {tour.itinerary.map((day) => {
                const isActive = activeDay === day.day;
                return (
                  <button
                    key={day.day}
                    onClick={() => scrollToDay(day.day)}
                    className="group w-full text-left py-4 flex items-baseline gap-5 transition-colors duration-500"
                  >
                    <span
                      className="font-display text-[10px] shrink-0 transition-colors duration-500"
                      style={{
                        color: isActive ? AMAN.ink : AMAN.brassDeep,
                        letterSpacing: '0.35em',
                        fontWeight: 300,
                        minWidth: 28,
                      }}
                    >
                      {roman(day.day)}
                    </span>
                    <span
                      aria-hidden
                      className="block h-px transition-all duration-500"
                      style={{
                        background: isActive ? AMAN.ink : AMAN.line,
                        width: isActive ? 24 : 12,
                      }}
                    />
                    <span
                      className="font-display text-[11px] transition-colors duration-500"
                      style={{
                        color: isActive ? AMAN.ink : AMAN.inkFaint,
                        fontWeight: 300,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {day.city.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right days */}
          <div>
            {tour.itinerary.map((day, i) => (
              <DaySection
                key={day.day}
                day={day}
                index={i}
                totalDays={tour.itinerary.length}
                refCallback={(el) => {
                  daySectionRefs.current[day.day] = el;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="px-6 md:px-16 py-32 md:py-48"
        style={{ background: AMAN.ink, color: AMAN.stone }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: SLOW_EASE }}
          >
            <p
              className="font-display text-[10px] mb-12"
              style={{
                color: 'rgba(191,167,126,0.85)',
                letterSpacing: '0.5em',
                fontWeight: 300,
              }}
            >
              — RESERVE —
            </p>
            <h2
              className="font-display text-[28px] md:text-[44px] leading-[1.35]"
              style={{
                color: AMAN.stone,
                fontWeight: 200,
                letterSpacing: '0.04em',
              }}
            >
              讀到這裡，
              <br />
              你已經在這趟旅程中了。
            </h2>
            <div className="mt-16 flex justify-center">
              <AmanButton
                size="lg"
                onClick={onSignup}
                style={{
                  background: AMAN.stone,
                  color: AMAN.ink,
                }}
              >
                RESERVE A SEAT
              </AmanButton>
            </div>
          </motion.div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// DaySection — 單日（極簡日課、無 accordion）
// ─────────────────────────────────────────────────────

function DaySection({
  day,
  index,
  totalDays,
  refCallback,
}: {
  day: ItineraryDay;
  index: number;
  totalDays: number;
  refCallback: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      ref={refCallback}
      data-day={day.day}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.1, ease: SLOW_EASE }}
      className="py-20 first:pt-0"
      style={{ borderBottom: index < totalDays - 1 ? `1px solid ${AMAN.line}` : 'none' }}
    >
      {/* Day 標題 */}
      <div className="mb-12">
        <div className="flex items-baseline gap-6 mb-8">
          <span
            className="font-display text-[10px]"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.5em',
              fontWeight: 300,
            }}
          >
            DAY {roman(day.day)}
          </span>
          <span
            aria-hidden
            className="block h-px flex-1 max-w-[120px]"
            style={{ background: AMAN.brassSoft }}
          />
          <span
            className="font-display text-[10px]"
            style={{
              color: AMAN.inkFaint,
              letterSpacing: '0.35em',
              fontWeight: 300,
            }}
          >
            {day.city}
          </span>
        </div>

        <h2
          className="font-display text-[28px] md:text-[44px] leading-[1.2]"
          style={{
            color: AMAN.ink,
            fontWeight: 200,
            letterSpacing: '0.04em',
          }}
        >
          {day.title}
        </h2>
        <p
          className="mt-6 text-sm md:text-base leading-[2.05] max-w-2xl"
          style={{ color: AMAN.inkMid, fontWeight: 300 }}
        >
          {day.summary}
        </p>
      </div>

      {/* Activities */}
      {day.activities.length > 0 && (
        <div className="mt-16">
          <p
            className="font-display text-[10px] mb-6"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.45em',
              fontWeight: 300,
            }}
          >
            ACTIVITIES
          </p>
          <Hair color={AMAN.brassSoft} />
          {day.activities.map((activity, i) => (
            <div
              key={i}
              className="py-8 grid grid-cols-[64px_1fr] md:grid-cols-[80px_120px_1fr] gap-6 md:gap-8 items-baseline"
              style={{ borderBottom: `1px solid ${AMAN.lineSoft}` }}
            >
              <span
                className="font-display text-[11px]"
                style={{
                  color: AMAN.inkFaint,
                  letterSpacing: '0.2em',
                  fontWeight: 300,
                }}
              >
                {activity.time}
              </span>
              <span
                className="hidden md:block font-display text-[10px]"
                style={{
                  color: AMAN.brassDeep,
                  letterSpacing: '0.3em',
                  fontWeight: 300,
                }}
              >
                {activity.duration}
              </span>
              <div className="col-span-2 md:col-span-1">
                <p
                  className="font-display text-base md:text-lg leading-[1.5] mb-2"
                  style={{
                    color: AMAN.ink,
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                  }}
                >
                  {activity.name}
                </p>
                <p
                  className="text-sm leading-[1.9]"
                  style={{ color: AMAN.inkMid, fontWeight: 300 }}
                >
                  {activity.description}
                </p>
                {activity.highlight && (
                  <p
                    className="mt-3 font-display text-[10px]"
                    style={{
                      color: AMAN.brassDeep,
                      letterSpacing: '0.35em',
                      fontWeight: 300,
                    }}
                  >
                    — {activity.highlight}
                  </p>
                )}
                <span
                  className="md:hidden mt-2 inline-block font-display text-[10px]"
                  style={{
                    color: AMAN.brassDeep,
                    letterSpacing: '0.3em',
                    fontWeight: 300,
                  }}
                >
                  {activity.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Meals */}
      {day.meals.length > 0 && (
        <div className="mt-16">
          <p
            className="font-display text-[10px] mb-6"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.45em',
              fontWeight: 300,
            }}
          >
            DINING
          </p>
          <Hair color={AMAN.brassSoft} />
          {day.meals.map((meal, i) => (
            <div
              key={i}
              className="py-6 grid grid-cols-[80px_1fr] md:grid-cols-[100px_200px_1fr] gap-6 md:gap-8 items-baseline"
              style={{ borderBottom: `1px solid ${AMAN.lineSoft}` }}
            >
              <span
                className="font-display text-[10px]"
                style={{
                  color: AMAN.brassDeep,
                  letterSpacing: '0.3em',
                  fontWeight: 300,
                }}
              >
                {meal.type}
              </span>
              <p
                className="hidden md:block font-display text-sm"
                style={{
                  color: AMAN.inkSoft,
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                {meal.name}
              </p>
              <div className="col-span-2 md:col-span-1">
                <p
                  className="md:hidden font-display text-base mb-2"
                  style={{
                    color: AMAN.inkSoft,
                    fontWeight: 300,
                  }}
                >
                  {meal.name}
                </p>
                <p
                  className="text-sm leading-[1.85]"
                  style={{ color: AMAN.inkMid, fontWeight: 300 }}
                >
                  {meal.description}
                </p>
                {meal.highlight && (
                  <p
                    className="mt-2 font-display text-[10px]"
                    style={{
                      color: AMAN.brassDeep,
                      letterSpacing: '0.35em',
                      fontWeight: 300,
                    }}
                  >
                    — {meal.highlight}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hotel */}
      <div className="mt-16">
        <p
          className="font-display text-[10px] mb-6"
          style={{
            color: AMAN.brassDeep,
            letterSpacing: '0.45em',
            fontWeight: 300,
          }}
        >
          RESIDENCE
        </p>
        <Hair color={AMAN.brassSoft} />
        <div className="py-8">
          <div className="flex items-baseline justify-between mb-3">
            <p
              className="font-display text-lg md:text-xl"
              style={{
                color: AMAN.ink,
                fontWeight: 250,
                letterSpacing: '0.03em',
              }}
            >
              {day.hotel.name}
            </p>
            <span
              className="font-display text-[10px]"
              style={{
                color: AMAN.brassDeep,
                letterSpacing: '0.35em',
                fontWeight: 300,
              }}
            >
              {day.hotel.level}
            </span>
          </div>
          <p
            className="text-sm leading-[1.95] mb-5"
            style={{ color: AMAN.inkMid, fontWeight: 300 }}
          >
            {day.hotel.description}
          </p>
          {day.hotel.features.length > 0 && (
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
              {day.hotel.features.map((f, i) => (
                <span
                  key={i}
                  className="font-display text-[11px]"
                  style={{
                    color: AMAN.inkFaint,
                    fontWeight: 300,
                    letterSpacing: '0.15em',
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
