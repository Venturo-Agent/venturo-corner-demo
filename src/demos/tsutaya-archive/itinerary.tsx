'use client';

/**
 * Itinerary — 逐章閱讀（day-by-day 日程）
 *
 * 結構（書本逐章感）：
 *   1. Topbar
 *   2. 頁面 header（卷次 + 書名 + 章數）
 *   3. 主區：
 *      - 左 sticky 章節目錄（卷號 + 章名）
 *      - 右 expandable 章節內容（章首頁 + 活動 / 用餐 / 住宿）
 *   4. CTA
 *   5. Footer
 *
 * 跟 muji itinerary 的差異：
 *   - muji 左 nav 是工業 Day 編號「01」「02」+ 細線
 *   - 蔦屋左 nav 是「卷次 + 章名」雙行、書本目錄感
 *   - muji 用 plus/minus 細線 icon 收合
 *   - 蔦屋用「翻開 / 闔上」中文 + 細線、書本翻頁感
 *   - muji 每天表頭是「Day 01」mono + 城市 + 標題
 *   - 蔦屋每天表頭是「第一章 / 城市 / 章名」線裝書感
 *   - meals / hotel 不用 grid card、用書末「章後記」橫條
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  TSUTAYA,
  ArchiveTag,
  BookTitle,
  TsutayaButton,
  Hair,
  DoubleHair,
  PageNumber,
  volName,
} from './shared';
import { TsutayaFooter } from './home';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // intersection observer：scroll 到哪一章就高亮目錄
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
    <div style={{ background: TSUTAYA.paper, color: TSUTAYA.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="px-6 md:px-12 py-6"
        style={{ borderBottom: `1px solid ${TSUTAYA.line}` }}
      >
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{ color: TSUTAYA.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span
              className="font-body text-xs"
              style={{ letterSpacing: '0.1em' }}
            >
              回到書名頁
            </span>
          </button>
          <span
            className="font-body text-xs"
            style={{
              color: TSUTAYA.brownFaint,
              letterSpacing: '0.15em',
            }}
          >
            逐章閱讀 / Chapters
          </span>
        </div>
      </header>

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <div className="mx-auto max-w-6xl">
          <ArchiveTag vol={volName(6)}>Chapter by Chapter</ArchiveTag>
          <BookTitle
            level={1}
            className="mt-8"
            subtitle={
              <>
                從第一章抵達、到最後一章歸途，每一章都有它該被讀的時辰。
                <br />
                點任一章節翻開、看當天的活動、用餐與住宿。
              </>
            }
          >
            {tour.title}
          </BookTitle>
          <p
            className="mt-8 font-display text-xs"
            style={{
              color: TSUTAYA.brown,
              letterSpacing: '0.25em',
            }}
          >
            全書共 {tour.itinerary.length} 章 · {tour.duration}
          </p>
        </div>
      </section>

      {/* ─────────────── Main grid ─────────────── */}
      <div className="mx-auto max-w-6xl px-6 md:px-12 pb-24 md:pb-32">
        <DoubleHair />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-14">
          {/* ─────────────── Left sticky 目錄 ─────────────── */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-12">
              <p
                className="font-display text-xs mb-8"
                style={{
                  color: TSUTAYA.brown,
                  letterSpacing: '0.25em',
                }}
              >
                書中目錄
              </p>

              <div className="mb-10">
                {tour.itinerary.map((d) => {
                  const isActive = activeDay === d.day;
                  return (
                    <button
                      key={d.day}
                      onClick={() => scrollToDay(d.day)}
                      className="group grid grid-cols-[36px_1fr] gap-3 w-full text-left py-3 transition-all"
                    >
                      <span
                        className="font-display text-[11px]"
                        style={{
                          color: isActive
                            ? TSUTAYA.ink
                            : TSUTAYA.brownFaint,
                          letterSpacing: '0.15em',
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        卷{volName(d.day)}
                      </span>
                      <span className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="block h-px shrink-0 transition-all mt-2"
                          style={{
                            width: isActive ? 16 : 6,
                            background: isActive
                              ? TSUTAYA.ink
                              : TSUTAYA.line,
                          }}
                        />
                        <span
                          className="font-body text-xs leading-[1.5] line-clamp-2"
                          style={{
                            color: isActive
                              ? TSUTAYA.ink
                              : TSUTAYA.brownSoft,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {d.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <Hair color={TSUTAYA.line} />

              <div className="pt-6 flex flex-col gap-3">
                <button
                  onClick={expandAll}
                  className="font-body text-xs text-left transition-opacity hover:opacity-60"
                  style={{
                    color: TSUTAYA.ink,
                    letterSpacing: '0.1em',
                  }}
                >
                  全部翻開
                </button>
                <button
                  onClick={collapseAll}
                  className="font-body text-xs text-left transition-opacity hover:opacity-60"
                  style={{
                    color: TSUTAYA.brownSoft,
                    letterSpacing: '0.1em',
                  }}
                >
                  全部闔上
                </button>
              </div>
            </div>
          </aside>

          {/* ─────────────── Right content ─────────────── */}
          <main className="md:col-span-9">
            {tour.itinerary.map((day, i) => (
              <ChapterSection
                key={day.day}
                day={day}
                totalChapters={tour.itinerary.length}
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

      {/* ─────────────── 跋（CTA） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: TSUTAYA.paperSoft }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <ArchiveTag vol="跋" align="center">
            Take It Home
          </ArchiveTag>
          <h2
            className="font-display mt-10 leading-[1.5] text-2xl md:text-3xl"
            style={{ color: TSUTAYA.ink, fontWeight: 500 }}
          >
            讀完了，把書帶回家
          </h2>
          <p
            className="mt-10 font-body text-sm md:text-base leading-[2.05]"
            style={{ color: TSUTAYA.brownSoft }}
          >
            每版上限 {tour.groupSize.min}–{tour.groupSize.max} 位讀者，
            <br />
            出版前 30 天截止登記。
          </p>
          <div className="mt-14">
            <TsutayaButton size="lg" onClick={onSignup}>
              帶這本書回家
            </TsutayaButton>
          </div>
        </div>
      </section>

      <TsutayaFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ChapterToggleLabel — 翻開 / 闔上文字 + 細線
// 取代 muji 的 plus/minus icon、用書本翻頁的中文語意
// ─────────────────────────────────────────────────────

function ChapterToggleLabel({ open }: { open: boolean }) {
  return (
    <span
      className="inline-flex items-baseline gap-3"
      style={{ color: TSUTAYA.ink }}
    >
      <span
        className="font-body text-xs"
        style={{ letterSpacing: '0.1em' }}
      >
        {open ? '闔上' : '翻開'}
      </span>
      <span
        aria-hidden
        className="block transition-all"
        style={{
          width: open ? 8 : 16,
          height: 1,
          background: TSUTAYA.ink,
        }}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────
// ChapterSection — 一章 expandable
// 表頭：左卷號（大）+ 中章名 + 右翻開
// 展開：活動 timeline + 用餐 + 住宿（書中插頁感）
// ─────────────────────────────────────────────────────

function ChapterSection({
  day,
  totalChapters,
  isLast,
  isOpen,
  onToggle,
  refSet,
}: {
  day: ItineraryDay;
  totalChapters: number;
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
        borderBottom: isLast ? 'none' : `1px solid ${TSUTAYA.line}`,
      }}
    >
      {/* 章首頁 */}
      <button
        onClick={onToggle}
        className="w-full text-left group py-10 md:py-14"
        aria-expanded={isOpen}
      >
        <div className="grid grid-cols-[80px_1fr_60px] md:grid-cols-[120px_1fr_72px] gap-6 items-start">
          {/* 卷號 */}
          <div>
            <span
              className="font-body text-[10px] block mb-2"
              style={{
                color: TSUTAYA.brownFaint,
                letterSpacing: '0.25em',
              }}
            >
              第
            </span>
            <span
              className="font-display text-3xl md:text-4xl block leading-none"
              style={{
                color: TSUTAYA.ink,
                fontWeight: 500,
              }}
            >
              {volName(day.day)}
            </span>
            <span
              className="font-body text-[10px] block mt-2"
              style={{
                color: TSUTAYA.brownFaint,
                letterSpacing: '0.25em',
              }}
            >
              章
            </span>
          </div>

          {/* 標題與摘要 */}
          <div>
            <span
              className="font-body text-xs block mb-3"
              style={{
                color: TSUTAYA.brown,
                letterSpacing: '0.15em',
              }}
            >
              {day.city}
            </span>
            <h3
              className="font-display text-lg md:text-2xl leading-[1.4] mb-4"
              style={{ color: TSUTAYA.ink, fontWeight: 500 }}
            >
              {day.title}
            </h3>
            <p
              className="font-body text-sm leading-[2]"
              style={{ color: TSUTAYA.brownSoft }}
            >
              {day.summary}
            </p>
          </div>

          {/* 翻開 / 闔上 + 頁碼 */}
          <div className="flex flex-col items-end gap-6 pt-2 transition-opacity group-hover:opacity-80">
            <ChapterToggleLabel open={isOpen} />
            <PageNumber n={day.day} total={totalChapters} />
          </div>
        </div>
      </button>

      {/* 章節內容 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden"
          >
            <div className="pb-12 md:pl-[120px] md:pr-[72px]">
              {/* 雙書頁線 */}
              <div className="pt-2 pb-10">
                <DoubleHair />
              </div>

              {/* ─── 當日活動 timeline ─── */}
              <div>
                <p
                  className="font-display text-xs mb-8"
                  style={{
                    color: TSUTAYA.brown,
                    letterSpacing: '0.25em',
                  }}
                >
                  當日節次
                </p>

                <div>
                  {day.activities.map((a, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[64px_1fr] md:grid-cols-[88px_1fr] gap-6 md:gap-10 py-7"
                      style={{
                        borderBottom:
                          i === day.activities.length - 1
                            ? 'none'
                            : `1px solid ${TSUTAYA.lineSoft}`,
                      }}
                    >
                      <div>
                        <span
                          className="font-display text-sm block"
                          style={{
                            color: TSUTAYA.ink,
                            letterSpacing: '0.08em',
                            fontWeight: 500,
                          }}
                        >
                          {a.time}
                        </span>
                        <span
                          className="font-body text-[10px] block mt-2"
                          style={{
                            color: TSUTAYA.brownFaint,
                            letterSpacing: '0.15em',
                          }}
                        >
                          {a.duration}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                          <h4
                            className="font-display text-base md:text-lg leading-snug"
                            style={{
                              color: TSUTAYA.ink,
                              fontWeight: 500,
                            }}
                          >
                            {a.name}
                          </h4>
                          {a.highlight && (
                            <span
                              className="font-body text-[10px] px-2 py-1"
                              style={{
                                background: TSUTAYA.brown,
                                color: TSUTAYA.paper,
                                letterSpacing: '0.12em',
                              }}
                            >
                              {a.highlight}
                            </span>
                          )}
                        </div>
                        <p
                          className="font-body text-sm leading-[2]"
                          style={{ color: TSUTAYA.brownSoft }}
                        >
                          {a.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── 章後記：用餐 + 住宿 ─── */}
              <div className="mt-14">
                <DoubleHair />
              </div>

              <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                {/* 用餐 */}
                <div>
                  <p
                    className="font-display text-xs mb-6 pb-3"
                    style={{
                      color: TSUTAYA.brown,
                      letterSpacing: '0.25em',
                      borderBottom: `1px solid ${TSUTAYA.line}`,
                    }}
                  >
                    章後記 一 · 用膳
                  </p>
                  <div>
                    {day.meals.map((m, i) => (
                      <div
                        key={i}
                        className="py-5"
                        style={{
                          borderBottom:
                            i === day.meals.length - 1
                              ? 'none'
                              : `1px solid ${TSUTAYA.lineSoft}`,
                        }}
                      >
                        <div className="flex items-baseline gap-4 mb-2">
                          <span
                            className="font-display text-[10px] w-10 shrink-0"
                            style={{
                              color: TSUTAYA.brown,
                              letterSpacing: '0.2em',
                              fontWeight: 500,
                            }}
                          >
                            {m.type}
                          </span>
                          <h5
                            className="font-display text-sm leading-snug"
                            style={{
                              color: TSUTAYA.ink,
                              fontWeight: 500,
                            }}
                          >
                            {m.name}
                          </h5>
                        </div>
                        <p
                          className="font-body text-xs leading-[2] pl-14"
                          style={{ color: TSUTAYA.brownSoft }}
                        >
                          {m.description}
                        </p>
                        {m.highlight && (
                          <p
                            className="pl-14 mt-2 font-body text-[10px]"
                            style={{
                              color: TSUTAYA.brown,
                              letterSpacing: '0.12em',
                            }}
                          >
                            ※ {m.highlight}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 住宿 */}
                <div>
                  <p
                    className="font-display text-xs mb-6 pb-3"
                    style={{
                      color: TSUTAYA.brown,
                      letterSpacing: '0.25em',
                      borderBottom: `1px solid ${TSUTAYA.line}`,
                    }}
                  >
                    章後記 二 · 夜宿
                  </p>
                  <div
                    className="p-6"
                    style={{
                      background: TSUTAYA.paperSoft,
                      border: `1px solid ${TSUTAYA.line}`,
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-4">
                      <h5
                        className="font-display text-sm md:text-base leading-snug"
                        style={{
                          color: TSUTAYA.ink,
                          fontWeight: 500,
                        }}
                      >
                        {day.hotel.name}
                      </h5>
                      <span
                        className="font-body text-[10px] shrink-0"
                        style={{
                          color: TSUTAYA.brown,
                          letterSpacing: '0.15em',
                        }}
                      >
                        {day.hotel.level}
                      </span>
                    </div>
                    <p
                      className="font-body text-xs leading-[2] mb-5"
                      style={{ color: TSUTAYA.brownSoft }}
                    >
                      {day.hotel.description}
                    </p>
                    {day.hotel.features.length > 0 && (
                      <>
                        <Hair color={TSUTAYA.lineSoft} />
                        <div className="pt-4 flex flex-wrap gap-x-5 gap-y-2">
                          {day.hotel.features.map((f, i) => (
                            <span
                              key={i}
                              className="inline-flex items-baseline gap-2 font-body text-[11px]"
                              style={{
                                color: TSUTAYA.brownSoft,
                                letterSpacing: '0.08em',
                              }}
                            >
                              <span
                                aria-hidden
                                className="block"
                                style={{
                                  width: 3,
                                  height: 3,
                                  background: TSUTAYA.brown,
                                }}
                              />
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
