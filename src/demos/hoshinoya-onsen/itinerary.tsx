'use client';

/**
 * Itinerary — 客房手冊（day-by-day 行程）
 *
 * 主題：「攤開在客室床頭那本旅館手冊」、有明日行程表 / 餐事 / 客房筆記
 *
 * 結構：
 *   1. Topbar
 *   2. 頁面 header（手冊封面感 — 帖數 / 客室名 / 總天數）
 *   3. 主區：
 *      - 左 sticky 手冊目錄（第一帖 / 第二帖 / …）
 *      - 右 expandable 章節（章首 + 當日節次 + 餐事 + 夜宿）
 *   4. CTA：把客室帶回家
 *   5. Footer
 *
 * 跟 tsutaya itinerary 的差異：
 *   - 蔦屋左 nav 用「卷次 + 章名」書本目錄
 *   - 這裡左 nav 用「第一帖 / 客室名」旅館手冊目錄、配小紙燈籠
 *   - 蔦屋用「翻開 / 闔上」書本翻頁感
 *   - 這裡用「拉開 / 闔上」拉門感、配燈籠暈光
 *   - 蔦屋章首頁是大「一」漢字 + 章名（書本感）
 *   - 這裡章首頁是「第一帖」大字 + 客房號 + 城市 + 標題（手冊感）
 *   - meals / hotel 用「夜膳 / 寢室」中文標籤、不是「用膳 / 夜宿」（書店語）
 *   - hotel 卡有「客室印章」感（細燈光邊框）
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  HOSHINO,
  LanternTag,
  SteamTitle,
  HoshinoButton,
  Hair,
  LampDivider,
  LanternMark,
  PageMark,
  PaperGrain,
  AsanohaPattern,
  kanji,
} from './shared';
import { HoshinoFooter } from './home';

type Props = {
  tour: Tour;
  onBack: () => void;
  onSignup: () => void;
};

export default function ItineraryView({ tour, onBack, onSignup }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([1]));
  const daySectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // intersection observer：scroll 到哪一帖就高亮目錄
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
    <div style={{ background: HOSHINO.paper, color: HOSHINO.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="relative px-6 md:px-12 py-6 overflow-hidden"
        style={{
          borderBottom: `1px solid ${HOSHINO.line}`,
          background: HOSHINO.paperSoft,
        }}
      >
        <PaperGrain opacity={0.06} />
        <div className="relative mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{ color: HOSHINO.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span
              className="font-display text-xs"
              style={{ letterSpacing: '0.18em', fontWeight: 500 }}
            >
              回到掛軸
            </span>
          </button>
          <span
            className="font-body text-xs"
            style={{
              color: HOSHINO.inkFaint,
              letterSpacing: '0.2em',
            }}
          >
            客房手冊 / Guidebook
          </span>
        </div>
      </header>

      {/* ─────────────── Header（手冊封面） ─────────────── */}
      <section className="relative px-6 md:px-12 pt-16 md:pt-24 pb-12 overflow-hidden">
        <AsanohaPattern opacity={0.05} />
        <PaperGrain opacity={0.05} />

        <div className="relative mx-auto max-w-6xl">
          <LanternTag chapter={kanji(6)}>Guidebook</LanternTag>
          <SteamTitle
            level={1}
            className="mt-10"
            subtitle={
              <>
                從第一帖玄關、到最後一帖告別、每一帖都有它該被讀的時辰。
                <br />
                點任一帖翻開、看當天的節次、夜膳與寢室。
              </>
            }
          >
            {tour.title}
          </SteamTitle>
          <p
            className="mt-10 font-display text-xs"
            style={{
              color: HOSHINO.wood,
              letterSpacing: '0.3em',
              fontWeight: 500,
            }}
          >
            全冊 共 {kanji(tour.itinerary.length)} 帖 · {tour.duration}
          </p>
        </div>
      </section>

      {/* ─────────────── Main grid ─────────────── */}
      <div className="relative mx-auto max-w-6xl px-6 md:px-12 pb-24 md:pb-32">
        <LampDivider />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pt-14">
          {/* ─────────────── Left sticky 手冊目錄 ─────────────── */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-12">
              <div className="flex items-center gap-3 mb-10">
                <LanternMark size={14} />
                <p
                  className="font-display text-xs"
                  style={{
                    color: HOSHINO.wood,
                    letterSpacing: '0.3em',
                    fontWeight: 500,
                  }}
                >
                  客房目錄
                </p>
              </div>

              <div className="mb-10">
                {tour.itinerary.map((d) => {
                  const isActive = activeDay === d.day;
                  return (
                    <button
                      key={d.day}
                      onClick={() => scrollToDay(d.day)}
                      className="group grid grid-cols-[44px_1fr] gap-3 w-full text-left py-3 transition-all"
                    >
                      <span
                        className="font-display text-[11px]"
                        style={{
                          color: isActive
                            ? HOSHINO.ink
                            : HOSHINO.inkFaint,
                          letterSpacing: '0.18em',
                          fontWeight: isActive ? 500 : 400,
                        }}
                      >
                        第{kanji(d.day)}帖
                      </span>
                      <span className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="block h-px shrink-0 transition-all mt-2"
                          style={{
                            width: isActive ? 18 : 6,
                            background: isActive
                              ? HOSHINO.ink
                              : HOSHINO.line,
                          }}
                        />
                        <span
                          className="font-body text-xs leading-[1.55] line-clamp-2"
                          style={{
                            color: isActive
                              ? HOSHINO.ink
                              : HOSHINO.woodSoft,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {d.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <Hair color={HOSHINO.line} />

              <div className="pt-7 flex flex-col gap-3">
                <button
                  onClick={expandAll}
                  className="font-display text-xs text-left transition-opacity hover:opacity-60"
                  style={{
                    color: HOSHINO.ink,
                    letterSpacing: '0.18em',
                    fontWeight: 500,
                  }}
                >
                  全部拉開
                </button>
                <button
                  onClick={collapseAll}
                  className="font-display text-xs text-left transition-opacity hover:opacity-60"
                  style={{
                    color: HOSHINO.woodSoft,
                    letterSpacing: '0.18em',
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

      {/* ─────────────── 玄關（CTA） ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-28 md:py-32 overflow-hidden"
        style={{ background: HOSHINO.paperWarm }}
      >
        <PaperGrain opacity={0.07} />
        <AsanohaPattern opacity={0.05} />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-8">
            <LanternMark size={26} />
          </div>
          <LanternTag chapter="跋" align="center">
            Take It Home
          </LanternTag>
          <h2
            className="font-display mt-10 leading-[1.4] text-2xl md:text-[34px]"
            style={{
              color: HOSHINO.ink,
              fontWeight: 500,
              letterSpacing: '0.08em',
            }}
          >
            讀完了、把客室帶回家
          </h2>
          <p
            className="mt-10 font-body text-sm md:text-base leading-[2.1]"
            style={{
              color: HOSHINO.woodSoft,
              letterSpacing: '0.04em',
            }}
          >
            每帖客室上限 {tour.groupSize.min}–{tour.groupSize.max} 位客人、
            <br />
            出帖前 30 天截止接客。
          </p>
          <div className="mt-14">
            <HoshinoButton size="lg" onClick={onSignup}>
              預這間客室
            </HoshinoButton>
          </div>
        </div>
      </section>

      <HoshinoFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// ChapterToggleLabel — 拉開 / 闔上文字 + 細燈光
// 取代 muji plus/minus、tsutaya 翻開/闔上 — 這裡是「拉開 / 闔上」紙門感
// ─────────────────────────────────────────────────────

function ChapterToggleLabel({ open }: { open: boolean }) {
  return (
    <span
      className="inline-flex items-baseline gap-3"
      style={{ color: HOSHINO.ink }}
    >
      <span
        className="font-display text-xs"
        style={{
          letterSpacing: '0.2em',
          fontWeight: 500,
        }}
      >
        {open ? '闔上' : '拉開'}
      </span>
      <span
        aria-hidden
        className="block transition-all"
        style={{
          width: open ? 10 : 20,
          height: 1,
          background: HOSHINO.ink,
        }}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────
// ChapterSection — 一帖 expandable
// 表頭：左大「第 X 帖」漢字 + 中城市 + 客室標題 + 右拉開 / 頁碼
// 展開：當日節次 timeline + 夜膳 + 寢室
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
        borderBottom: isLast ? 'none' : `1px solid ${HOSHINO.line}`,
      }}
    >
      {/* 章首頁 */}
      <button
        onClick={onToggle}
        className="group relative w-full text-left py-12 md:py-16 overflow-hidden"
        aria-expanded={isOpen}
      >
        {/* hover 紙燈籠光暈 */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${HOSHINO.lamp}1f 0%, transparent 60%)`,
          }}
        />

        <div className="relative grid grid-cols-[88px_1fr_72px] md:grid-cols-[140px_1fr_88px] gap-6 items-start">
          {/* 第 X 帖 大字 */}
          <div className="text-center">
            <span
              className="font-display text-[10px] block mb-3"
              style={{
                color: HOSHINO.inkFaint,
                letterSpacing: '0.35em',
                fontWeight: 500,
              }}
            >
              第
            </span>
            <span
              className="font-display block leading-none text-[40px] md:text-[60px]"
              style={{
                color: HOSHINO.lamp,
                fontWeight: 500,
              }}
            >
              {kanji(day.day)}
            </span>
            <span
              className="font-display text-[10px] block mt-3"
              style={{
                color: HOSHINO.inkFaint,
                letterSpacing: '0.35em',
                fontWeight: 500,
              }}
            >
              帖
            </span>
          </div>

          {/* 標題與摘要 */}
          <div>
            <div className="flex items-baseline gap-3 mb-3 flex-wrap">
              <span
                className="font-body text-xs"
                style={{
                  color: HOSHINO.wood,
                  letterSpacing: '0.2em',
                }}
              >
                {day.city}
              </span>
              <span
                aria-hidden
                className="block w-px h-3"
                style={{ background: HOSHINO.line }}
              />
              <span
                className="font-body text-[10px]"
                style={{
                  color: HOSHINO.inkFaint,
                  letterSpacing: '0.2em',
                }}
              >
                客室 {kanji(day.day)}號
              </span>
            </div>
            <h3
              className="font-display text-lg md:text-[26px] leading-[1.4] mb-5"
              style={{
                color: HOSHINO.ink,
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              {day.title}
            </h3>
            <p
              className="font-body text-sm leading-[2.05]"
              style={{
                color: HOSHINO.woodSoft,
                letterSpacing: '0.04em',
              }}
            >
              {day.summary}
            </p>
          </div>

          {/* 拉開 / 闔上 + 頁碼 */}
          <div className="flex flex-col items-end gap-6 pt-2 transition-opacity group-hover:opacity-80">
            <ChapterToggleLabel open={isOpen} />
            <PageMark n={day.day} total={totalChapters} />
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
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="pb-14 md:pl-[140px] md:pr-[88px]">
              {/* 燈籠分隔 */}
              <div className="pt-2 pb-12">
                <LampDivider />
              </div>

              {/* ─── 當日節次 timeline ─── */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <LanternMark size={12} />
                  <p
                    className="font-display text-xs"
                    style={{
                      color: HOSHINO.wood,
                      letterSpacing: '0.3em',
                      fontWeight: 500,
                    }}
                  >
                    當日節次
                  </p>
                </div>

                <div>
                  {day.activities.map((a, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[72px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-12 py-8"
                      style={{
                        borderBottom:
                          i === day.activities.length - 1
                            ? 'none'
                            : `1px solid ${HOSHINO.lineSoft}`,
                      }}
                    >
                      <div>
                        <span
                          className="font-display text-sm block"
                          style={{
                            color: HOSHINO.ink,
                            letterSpacing: '0.1em',
                            fontWeight: 500,
                          }}
                        >
                          {a.time}
                        </span>
                        <span
                          className="font-body text-[10px] block mt-2"
                          style={{
                            color: HOSHINO.inkFaint,
                            letterSpacing: '0.2em',
                          }}
                        >
                          {a.duration}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                          <h4
                            className="font-display text-base md:text-lg leading-snug"
                            style={{
                              color: HOSHINO.ink,
                              fontWeight: 500,
                              letterSpacing: '0.05em',
                            }}
                          >
                            {a.name}
                          </h4>
                          {a.highlight && (
                            <span
                              className="font-display text-[10px] px-3 py-1"
                              style={{
                                background: HOSHINO.lamp,
                                color: HOSHINO.ink,
                                letterSpacing: '0.18em',
                                fontWeight: 500,
                              }}
                            >
                              {a.highlight}
                            </span>
                          )}
                        </div>
                        <p
                          className="font-body text-sm leading-[2.05]"
                          style={{
                            color: HOSHINO.woodSoft,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {a.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── 章後記：夜膳 + 寢室 ─── */}
              <div className="mt-16">
                <LampDivider />
              </div>

              <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                {/* 夜膳 */}
                <div>
                  <p
                    className="font-display text-xs mb-6 pb-3"
                    style={{
                      color: HOSHINO.wood,
                      letterSpacing: '0.3em',
                      borderBottom: `1px solid ${HOSHINO.line}`,
                      fontWeight: 500,
                    }}
                  >
                    章後 一 · 夜膳
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
                              : `1px solid ${HOSHINO.lineSoft}`,
                        }}
                      >
                        <div className="flex items-baseline gap-4 mb-2">
                          <span
                            className="font-display text-[10px] w-12 shrink-0"
                            style={{
                              color: HOSHINO.lamp,
                              letterSpacing: '0.25em',
                              fontWeight: 500,
                            }}
                          >
                            {m.type}
                          </span>
                          <h5
                            className="font-display text-sm leading-snug"
                            style={{
                              color: HOSHINO.ink,
                              fontWeight: 500,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {m.name}
                          </h5>
                        </div>
                        <p
                          className="font-body text-xs leading-[2.05] pl-16"
                          style={{
                            color: HOSHINO.woodSoft,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {m.description}
                        </p>
                        {m.highlight && (
                          <p
                            className="pl-16 mt-3 font-display text-[10px]"
                            style={{
                              color: HOSHINO.lamp,
                              letterSpacing: '0.18em',
                              fontWeight: 500,
                            }}
                          >
                            ※ {m.highlight}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 寢室 */}
                <div>
                  <p
                    className="font-display text-xs mb-6 pb-3"
                    style={{
                      color: HOSHINO.wood,
                      letterSpacing: '0.3em',
                      borderBottom: `1px solid ${HOSHINO.line}`,
                      fontWeight: 500,
                    }}
                  >
                    章後 二 · 寢室
                  </p>
                  <div
                    className="relative p-7 overflow-hidden"
                    style={{
                      background: HOSHINO.paperSoft,
                      border: `1px solid ${HOSHINO.line}`,
                    }}
                  >
                    {/* 紙燈籠淡光 */}
                    <span
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${HOSHINO.lamp}1a 0%, transparent 60%)`,
                      }}
                    />

                    <div className="relative flex items-baseline justify-between gap-4 mb-4">
                      <h5
                        className="font-display text-sm md:text-base leading-snug"
                        style={{
                          color: HOSHINO.ink,
                          fontWeight: 500,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {day.hotel.name}
                      </h5>
                      <span
                        className="font-display text-[10px] shrink-0"
                        style={{
                          color: HOSHINO.lamp,
                          letterSpacing: '0.2em',
                          fontWeight: 500,
                        }}
                      >
                        {day.hotel.level}
                      </span>
                    </div>
                    <p
                      className="relative font-body text-xs leading-[2.05] mb-5"
                      style={{
                        color: HOSHINO.woodSoft,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {day.hotel.description}
                    </p>
                    {day.hotel.features.length > 0 && (
                      <>
                        <Hair color={HOSHINO.lineSoft} />
                        <div className="relative pt-4 flex flex-wrap gap-x-6 gap-y-2">
                          {day.hotel.features.map((f, i) => (
                            <span
                              key={i}
                              className="inline-flex items-baseline gap-2 font-body text-[11px]"
                              style={{
                                color: HOSHINO.woodSoft,
                                letterSpacing: '0.05em',
                              }}
                            >
                              <span
                                aria-hidden
                                className="block"
                                style={{
                                  width: 4,
                                  height: 4,
                                  background: HOSHINO.lamp,
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
