'use client';

/**
 * Itinerary — 日程、每一天是「一個章節」
 *
 * 結構：
 *   - Header + 「總共 X 章」
 *   - 章節列表（每天一個 section）
 *     - 章節編號（大號數字、像繪本內頁編號）
 *     - 章節名 + city + summary
 *     - 活動 timeline（用 SVG 標記、不用 bullet 字符）
 *     - 用餐（卡片樣式）
 *     - 住宿（卡片樣式、有小插畫）
 *   - 底部 CTA
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Tour, type ItineraryDay } from '@/data/mock-tours';
import {
  BOOK,
  ChapterLabel,
  ChapterNumber,
  StoryButton,
  StorybookCard,
  StickerBadge,
  Star,
  Sun,
  Moon,
  Cloud,
  Tree,
  Bird,
  Flower,
  PaperPlane,
  FloatingDecor,
} from './shared';
import { StorybookFooter } from './home';

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
    <div style={{ background: BOOK.paper, color: BOOK.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 pt-20 md:pt-28 pb-16"
        style={{
          background: `linear-gradient(180deg, ${BOOK.paperLight} 0%, ${BOOK.paper} 100%)`,
        }}
      >
        <FloatingDecor className="absolute top-16 right-[6%]" delay={0}>
          <Cloud size={120} color={BOOK.cream} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-32 left-[5%]" delay={1.2}>
          <Sun size={72} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-10 right-[16%]" delay={0.5}>
          <Bird size={36} color={BOOK.ink} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-6xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wider mb-10 transition-all hover:gap-3"
            style={{ color: BOOK.orangeDeep }}
          >
            <span aria-hidden>←</span>
            回故事介紹
          </button>

          <ChapterLabel>Daily Chapters</ChapterLabel>
          <h1
            className="mt-8 font-display font-semibold leading-[1.08] text-[44px] md:text-[80px]"
            style={{ color: BOOK.ink }}
          >
            {tour.title}
            <br />
            <span style={{ color: BOOK.orangeDeep }}>每日章節</span>
          </h1>
          <p
            className="mt-8 max-w-2xl font-body text-base md:text-lg leading-[1.95]"
            style={{ color: BOOK.inkSoft }}
          >
            一共 {tour.itinerary.length} 個章節、{tour.duration}。
            從抵達那一刻到回家、每一天的活動、用餐、住宿、
            我們都寫進這本書裡了。
          </p>
        </div>
      </section>

      {/* ─────────────── Sticky chapter nav ─────────────── */}
      <section
        className="sticky top-0 z-30 px-6 md:px-12 py-5 md:py-6"
        style={{
          background: BOOK.paperLight,
          borderBottom: `2px dashed ${BOOK.line}`,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-1 -mb-1">
            <span
              className="font-body font-semibold text-xs tracking-[0.28em] uppercase shrink-0"
              style={{ color: BOOK.inkFaint }}
            >
              跳到
            </span>
            {tour.itinerary.map((d) => (
              <button
                key={d.day}
                onClick={() => scrollToDay(d.day)}
                className="shrink-0 px-4 py-2 rounded-full font-body font-semibold text-sm tracking-wider transition-all"
                style={{
                  background:
                    activeDay === d.day ? BOOK.orange : 'transparent',
                  color: activeDay === d.day ? BOOK.ink : BOOK.inkSoft,
                  border: `2px solid ${
                    activeDay === d.day ? BOOK.orange : BOOK.line
                  }`,
                }}
              >
                Ch.{String(d.day).padStart(2, '0')}
              </button>
            ))}
            <div className="shrink-0 flex items-center gap-2 ml-auto">
              <button
                onClick={expandAll}
                className="font-body font-semibold text-xs tracking-wider transition-opacity hover:opacity-70"
                style={{ color: BOOK.orangeDeep }}
              >
                全部翻開
              </button>
              <span style={{ color: BOOK.line }}>/</span>
              <button
                onClick={collapseAll}
                className="font-body font-semibold text-xs tracking-wider transition-opacity hover:opacity-70"
                style={{ color: BOOK.inkSoft }}
              >
                全部收起
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Chapter list ─────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 relative overflow-hidden">
        <FloatingDecor className="absolute top-32 right-[3%]" delay={1.4}>
          <Star size={32} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-[40%] left-[3%]" delay={2.4}>
          <Flower size={48} color={BOOK.blossom} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-32 right-[5%]" delay={0.7}>
          <Tree size={72} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-5xl">
          {tour.itinerary.map((day, i) => (
            <ChapterSection
              key={day.day}
              day={day}
              isLast={i === tour.itinerary.length - 1}
              totalDays={tour.itinerary.length}
              isOpen={openDays.has(day.day)}
              onToggle={() => toggleDay(day.day)}
              refSet={(el) => {
                daySectionRefs.current[day.day] = el;
              }}
            />
          ))}
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: BOOK.paperWarm }}
      >
        <FloatingDecor className="absolute top-12 right-[8%]" delay={0}>
          <PaperPlane size={64} color={BOOK.skyDeep} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-16 left-[6%]" delay={1.5}>
          <Moon size={56} color={BOOK.cream} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-3xl text-center">
          <ChapterLabel align="center">The Last Chapter</ChapterLabel>
          <h2
            className="mt-10 font-display font-semibold leading-[1.18] text-[40px] md:text-[60px]"
            style={{ color: BOOK.ink }}
          >
            看完
            <span style={{ color: BOOK.orangeDeep }}>每一頁</span>
            、
            <br />
            一起寫進這本書吧
          </h2>
          <p
            className="mt-10 mx-auto max-w-xl font-body text-base md:text-lg leading-[2]"
            style={{ color: BOOK.inkSoft }}
          >
            每團限 {tour.groupSize.min}–{tour.groupSize.max} 人、
            出發前 30 天截止報名。
          </p>
          <div className="mt-12">
            <StoryButton size="lg" onClick={onSignup}>
              寫上我們的名字
            </StoryButton>
          </div>
        </div>
      </section>

      <StorybookFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Chapter section — 每一天一個 section
// ─────────────────────────────────────────────────────

function ChapterSection({
  day,
  isLast,
  totalDays,
  isOpen,
  onToggle,
  refSet,
}: {
  day: ItineraryDay;
  isLast: boolean;
  totalDays: number;
  isOpen: boolean;
  onToggle: () => void;
  refSet: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={refSet}
      data-day={day.day}
      className="py-12 md:py-16 first:pt-0"
    >
      <StorybookCard
        className={`overflow-hidden ${isOpen ? '' : 'hover:rotate-[-0.3deg]'}`}
        rotate={isOpen ? 0 : -0.4}
      >
        {/* Chapter header */}
        <button
          onClick={onToggle}
          className="w-full text-left p-8 md:p-12"
          aria-expanded={isOpen}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            {/* Big chapter number */}
            <div className="md:col-span-3">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-body font-semibold text-xs tracking-[0.32em] uppercase"
                  style={{ color: BOOK.orangeDeep }}
                >
                  Chapter
                </span>
                <ChapterNumber n={day.day} size="lg" />
              </div>
              <p
                className="mt-3 font-body text-xs tracking-wider"
                style={{ color: BOOK.inkFaint }}
              >
                {day.day} / {totalDays}
              </p>
            </div>

            {/* Title + meta */}
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <StickerBadge color={BOOK.sky} textColor={BOOK.cream} rotate={-3}>
                  <Star size={12} color={BOOK.orangeLight} />
                  {day.city}
                </StickerBadge>
              </div>
              <h3
                className="font-display font-semibold leading-[1.15] text-2xl md:text-[34px] mb-4"
                style={{ color: BOOK.ink }}
              >
                {day.title}
              </h3>
              <p
                className="font-body text-base md:text-lg leading-[1.85]"
                style={{ color: BOOK.inkSoft }}
              >
                {day.summary}
              </p>
            </div>

            {/* Open/close indicator */}
            <div className="md:col-span-1 flex md:justify-end">
              <ChapterToggle isOpen={isOpen} />
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
              transition={{ duration: 0.55, ease: [0.34, 1.2, 0.64, 1] }}
              className="overflow-hidden"
            >
              <div
                className="px-8 md:px-12 pb-12 pt-2"
                style={{ borderTop: `2px dashed ${BOOK.line}` }}
              >
                {/* Activities */}
                <div className="pt-10 mb-12">
                  <div className="flex items-center gap-3 mb-8">
                    <Sun size={32} color={BOOK.orange} />
                    <h4
                      className="font-display font-semibold text-xl"
                      style={{ color: BOOK.ink }}
                    >
                      今天的冒險
                    </h4>
                  </div>
                  <div className="space-y-6">
                    {day.activities.map((a, i) => (
                      <ActivityRow key={i} activity={a} index={i} />
                    ))}
                  </div>
                </div>

                {/* Meals + Hotel grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Meals */}
                  <div
                    className="p-6 md:p-8 rounded-3xl"
                    style={{
                      background: BOOK.paperLight,
                      boxShadow: `0 4px 0 0 ${BOOK.line}`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <ForkIcon />
                      <h5
                        className="font-display font-semibold text-lg"
                        style={{ color: BOOK.ink }}
                      >
                        三餐
                      </h5>
                    </div>
                    <div className="space-y-5">
                      {day.meals.map((m, i) => (
                        <div key={i}>
                          <div className="flex items-baseline gap-3 mb-1">
                            <span
                              className="font-body font-semibold text-[10px] tracking-[0.25em] uppercase shrink-0"
                              style={{
                                color: BOOK.orangeDeep,
                                background: BOOK.cream,
                                padding: '3px 8px',
                                borderRadius: 6,
                              }}
                            >
                              {m.type}
                            </span>
                            <h6
                              className="font-display font-semibold text-base leading-snug"
                              style={{ color: BOOK.ink }}
                            >
                              {m.name}
                            </h6>
                          </div>
                          <p
                            className="font-body text-sm leading-[1.8] mt-2"
                            style={{ color: BOOK.inkSoft }}
                          >
                            {m.description}
                          </p>
                          {m.highlight && (
                            <div className="mt-2 inline-flex items-center gap-1.5">
                              <Star size={10} color={BOOK.orange} />
                              <span
                                className="font-body font-semibold text-[10px] tracking-[0.2em] uppercase"
                                style={{ color: BOOK.orangeDeep }}
                              >
                                {m.highlight}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hotel */}
                  <div
                    className="p-6 md:p-8 rounded-3xl relative overflow-hidden"
                    style={{
                      background: BOOK.cream,
                      boxShadow: `0 4px 0 0 ${BOOK.line}`,
                    }}
                  >
                    <div className="absolute -top-4 -right-4 opacity-30">
                      <Tree size={80} />
                    </div>

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-6">
                        <BedIcon />
                        <h5
                          className="font-display font-semibold text-lg"
                          style={{ color: BOOK.ink }}
                        >
                          今晚住哪
                        </h5>
                      </div>

                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h6
                          className="font-display font-semibold text-lg leading-snug"
                          style={{ color: BOOK.ink }}
                        >
                          {day.hotel.name}
                        </h6>
                        <StickerBadge
                          color={BOOK.orange}
                          rotate={3}
                          className="shrink-0"
                        >
                          {day.hotel.level}
                        </StickerBadge>
                      </div>

                      <p
                        className="font-body text-sm leading-[1.85] mb-5"
                        style={{ color: BOOK.inkSoft }}
                      >
                        {day.hotel.description}
                      </p>

                      {day.hotel.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {day.hotel.features.map((f, i) => (
                            <span
                              key={i}
                              className="inline-block px-3 py-1 rounded-full font-body text-xs"
                              style={{
                                background: BOOK.paperLight,
                                color: BOOK.inkSoft,
                                border: `1.5px dashed ${BOOK.line}`,
                              }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </StorybookCard>

      {/* 章節之間的分隔 — 用 SVG 裝飾 */}
      {!isLast && (
        <div className="flex justify-center pt-12 pb-4">
          <ChapterDivider />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Activity row — 一個活動
// ─────────────────────────────────────────────────────

function ActivityRow({
  activity,
  index,
}: {
  activity: { time: string; name: string; description: string; duration: string; highlight?: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="grid grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] gap-5 md:gap-6"
    >
      {/* Time */}
      <div className="pt-1">
        <div
          className="inline-block px-3 py-1.5 rounded-full font-display font-semibold text-sm tracking-wider"
          style={{
            background: BOOK.ink,
            color: BOOK.cream,
          }}
        >
          {activity.time}
        </div>
        <p
          className="mt-2 font-body text-[10px] tracking-[0.25em] uppercase"
          style={{ color: BOOK.inkFaint }}
        >
          {activity.duration}
        </p>
      </div>

      {/* Body — 左邊有 SVG 星星 / 連線 */}
      <div
        className="relative pb-4 pl-7"
        style={{
          borderLeft: `2.5px dashed ${BOOK.line}`,
        }}
      >
        {/* 連線端點：實心 svg 星星 */}
        <span
          aria-hidden
          className="absolute -left-3 top-0"
          style={{ background: BOOK.cream, padding: 2 }}
        >
          <Star size={20} color={BOOK.orange} />
        </span>

        <div className="flex items-center gap-3 flex-wrap mb-2">
          <h4
            className="font-display font-semibold text-lg md:text-xl leading-snug"
            style={{ color: BOOK.ink }}
          >
            {activity.name}
          </h4>
          {activity.highlight && (
            <StickerBadge color={BOOK.sky} textColor={BOOK.cream} rotate={-2}>
              <Star size={10} color={BOOK.orangeLight} />
              {activity.highlight}
            </StickerBadge>
          )}
        </div>
        <p
          className="font-body text-base leading-[1.85]"
          style={{ color: BOOK.inkSoft }}
        >
          {activity.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────
// Chapter toggle button
// ─────────────────────────────────────────────────────

function ChapterToggle({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform"
      style={{
        background: isOpen ? BOOK.orange : BOOK.cream,
        boxShadow: `0 4px 0 0 ${isOpen ? BOOK.orangeDeep : BOOK.line}`,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path
          d="M4 7 L 9 12 L 14 7"
          stroke={BOOK.ink}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Chapter divider — 章節之間的小裝飾
// ─────────────────────────────────────────────────────

function ChapterDivider() {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-hidden
        className="block w-12"
        style={{
          height: 2,
          background: `repeating-linear-gradient(to right, ${BOOK.line} 0 6px, transparent 6px 12px)`,
        }}
      />
      <Star size={20} color={BOOK.orange} />
      <Star size={14} color={BOOK.sky} />
      <Star size={20} color={BOOK.orange} />
      <span
        aria-hidden
        className="block w-12"
        style={{
          height: 2,
          background: `repeating-linear-gradient(to right, ${BOOK.line} 0 6px, transparent 6px 12px)`,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// 餐 / 床 icons（自製、不是 lucide、配繪本風格）
// ─────────────────────────────────────────────────────

function ForkIcon() {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background: BOOK.orange,
        boxShadow: `0 3px 0 0 ${BOOK.orangeDeep}`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M5 3 L 5 8 M 7 3 L 7 8 M 9 3 L 9 8 M 7 8 L 7 17 M 14 3 C 12 3, 12 9, 14 9 L 14 17"
          stroke={BOOK.ink}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function BedIcon() {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center"
      style={{
        background: BOOK.sky,
        boxShadow: `0 3px 0 0 ${BOOK.skyDeep}`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M3 14 L 3 8 L 17 8 L 17 14 M 3 11 L 17 11 M 3 14 L 3 17 M 17 14 L 17 17"
          stroke={BOOK.cream}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="9.5" r="1" fill={BOOK.cream} />
      </svg>
    </div>
  );
}
