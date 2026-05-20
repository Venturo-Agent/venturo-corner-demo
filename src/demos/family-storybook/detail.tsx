'use client';

/**
 * Detail — tour 詳情頁、像繪本內頁
 *
 * 結構：
 *   1. Hero（heroImage 全寬、tagline 像書名、key meta）
 *   2. Story 段落（多段、像繪本內文）
 *   3. Gallery（4 張、繪本拼貼樣式）
 *   4. Highlights（5 條、用星星標記）
 *   5. 包含 / 不含（用打勾 / 打叉、繪本符號）
 *   6. Dates selector
 *   7. CTA（看日程 / 報名）
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  BOOK,
  ChapterLabel,
  StoryButton,
  StorybookCard,
  StickerBadge,
  Star,
  Sun,
  Cloud,
  Tree,
  Flower,
  Bird,
  PaperPlane,
  Moon,
  CategoryIcon,
  CATEGORY_TAG,
  CATEGORY_AGE,
  FloatingDecor,
} from './shared';
import { StorybookFooter } from './home';

type Props = {
  tour: Tour;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onSeeItinerary: () => void;
  onSignup: () => void;
  onBack: () => void;
};

export default function DetailView({
  tour,
  selectedDate,
  onSelectDate,
  onSeeItinerary,
  onSignup,
  onBack,
}: Props) {
  return (
    <div style={{ background: BOOK.paper, color: BOOK.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: BOOK.paperLight }}
      >
        <FloatingDecor className="absolute top-16 left-[5%] z-10" delay={0}>
          <Cloud size={140} color={BOOK.cream} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-24 right-[8%] z-10" delay={1.3}>
          <Sun size={88} color={BOOK.orange} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 pt-20 md:pt-28">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wider mb-10 transition-all hover:gap-3"
            style={{ color: BOOK.orangeDeep }}
          >
            <span aria-hidden>←</span>
            回故事目錄
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.34, 1.2, 0.64, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <StickerBadge color={BOOK.orange} rotate={-3}>
                {CATEGORY_TAG[tour.category]}
              </StickerBadge>
              <StickerBadge color={BOOK.sky} textColor={BOOK.cream} rotate={2}>
                {CATEGORY_AGE[tour.category]}
              </StickerBadge>
              <StickerBadge color={BOOK.cream} rotate={-1}>
                <Star size={12} color={BOOK.orange} />
                {tour.duration}
              </StickerBadge>
            </div>

            <h1
              className="font-display font-semibold leading-[1.05] text-[44px] md:text-[88px]"
              style={{ color: BOOK.ink }}
            >
              {tour.title}
            </h1>
            <p
              className="mt-8 max-w-3xl font-display font-medium text-xl md:text-2xl leading-[1.6]"
              style={{ color: BOOK.orangeDeep }}
            >
              「{tour.tagline}」
            </p>
          </motion.div>

          {/* Hero image with frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.34, 1.2, 0.64, 1] }}
            className="mt-16 mb-12 relative"
          >
            <StorybookCard className="aspect-[16/9] md:aspect-[16/8]" rotate={-0.6}>
              <Image
                src={tour.heroImage}
                alt={tour.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </StorybookCard>

            {/* 角色 — 在圖周圍 */}
            <FloatingDecor
              className="absolute -top-8 -right-4 md:-top-12 md:-right-8 hidden sm:block"
              delay={0.5}
            >
              <CategoryIcon category={tour.category} size={64} />
            </FloatingDecor>
            <FloatingDecor
              className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-8 hidden sm:block"
              delay={1.8}
            >
              <Flower size={56} color={BOOK.blossom} />
            </FloatingDecor>
          </motion.div>

          {/* Quick stats */}
          <div className="pb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickStat label="天數" value={tour.duration} icon={<Sun size={28} color={BOOK.orange} />} />
            <QuickStat
              label="小團人數"
              value={`${tour.groupSize.min}–${tour.groupSize.max} 人`}
              icon={<Star size={28} color={BOOK.sky} />}
            />
            <QuickStat
              label="日程章節"
              value={`${tour.itinerary.length} 個章節`}
              icon={<Tree size={32} />}
            />
            <QuickStat
              label="家庭起價"
              value={formatPrice(tour.priceFrom)}
              icon={<Flower size={28} color={BOOK.blossom} />}
            />
          </div>
        </div>
      </section>

      {/* ─────────────── Story ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">
        <FloatingDecor className="absolute top-24 right-[6%]" delay={1.4}>
          <Bird size={48} color={BOOK.ink} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <ChapterLabel align="center">The Story</ChapterLabel>
            <h2
              className="mt-8 font-display font-semibold leading-[1.15] text-[36px] md:text-[56px]"
              style={{ color: BOOK.ink }}
            >
              這是一本關於
              <br />
              <span style={{ color: BOOK.orangeDeep }}>什麼的故事</span>
            </h2>
          </div>

          <StorybookCard className="p-8 md:p-16">
            <p
              className="font-display font-medium text-2xl md:text-[28px] leading-[1.65]"
              style={{ color: BOOK.ink }}
            >
              {tour.story}
            </p>

            <div
              className="mt-12 pt-10"
              style={{ borderTop: `2px dashed ${BOOK.line}` }}
            >
              <p
                className="font-body font-semibold text-xs tracking-[0.28em] uppercase mb-6"
                style={{ color: BOOK.orangeDeep }}
              >
                這本書裡會出現的關鍵字
              </p>
              <div className="flex flex-wrap gap-3">
                {tour.features.map((f, i) => (
                  <StickerBadge
                    key={i}
                    color={
                      i % 3 === 0
                        ? BOOK.orange
                        : i % 3 === 1
                          ? BOOK.sky
                          : BOOK.leaf
                    }
                    textColor={i % 3 === 1 ? BOOK.cream : BOOK.ink}
                    rotate={i % 2 === 0 ? -2 : 2}
                  >
                    {f}
                  </StickerBadge>
                ))}
              </div>
            </div>
          </StorybookCard>
        </div>
      </section>

      {/* ─────────────── Gallery ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: BOOK.paperLight }}
      >
        <FloatingDecor className="absolute top-12 left-[4%]" delay={0.6}>
          <PaperPlane size={48} color={BOOK.skyDeep} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-24 right-[5%]" delay={2}>
          <Cloud size={120} color={BOOK.cream} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <ChapterLabel align="center">A Few Pages</ChapterLabel>
            <h2
              className="mt-8 font-display font-semibold leading-[1.15] text-[36px] md:text-[56px]"
              style={{ color: BOOK.ink }}
            >
              翻幾頁
              <span style={{ color: BOOK.orangeDeep }}>看看</span>
            </h2>
          </div>

          {/* 拼貼樣式 — 4 張、有 rotate */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="md:col-span-7"
            >
              <StorybookCard className="aspect-[4/3]" rotate={-1.5}>
                <Image
                  src={tour.galleryImages[0]}
                  alt={`${tour.title} 風景 01`}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <StickerBadge color={BOOK.cream} rotate={-3}>
                    Page 01
                  </StickerBadge>
                </div>
              </StorybookCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="md:col-span-5"
            >
              <StorybookCard className="aspect-[4/3]" rotate={2}>
                <Image
                  src={tour.galleryImages[1]}
                  alt={`${tour.title} 風景 02`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <StickerBadge color={BOOK.orange} rotate={4}>
                    Page 02
                  </StickerBadge>
                </div>
              </StorybookCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="md:col-span-5"
            >
              <StorybookCard className="aspect-[4/3]" rotate={-1}>
                <Image
                  src={tour.galleryImages[2]}
                  alt={`${tour.title} 風景 03`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <StickerBadge color={BOOK.sky} textColor={BOOK.cream} rotate={-2}>
                    Page 03
                  </StickerBadge>
                </div>
              </StorybookCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="md:col-span-7"
            >
              <StorybookCard className="aspect-[4/3]" rotate={1.5}>
                <Image
                  src={tour.galleryImages[3]}
                  alt={`${tour.title} 風景 04`}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <StickerBadge color={BOOK.cream} rotate={3}>
                    Page 04
                  </StickerBadge>
                </div>
              </StorybookCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">
        <FloatingDecor className="absolute top-20 left-[5%]" delay={1.1}>
          <Star size={36} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-40 right-[8%]" delay={0.4}>
          <Star size={24} color={BOOK.sky} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-40 left-[10%]" delay={2.6}>
          <Star size={28} color={BOOK.blossom} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <ChapterLabel align="center">Highlights</ChapterLabel>
            <h2
              className="mt-8 font-display font-semibold leading-[1.15] text-[36px] md:text-[56px]"
              style={{ color: BOOK.ink }}
            >
              這本書裡的
              <br />
              <span style={{ color: BOOK.orangeDeep }}>五個亮點</span>
            </h2>
          </div>

          <div className="space-y-6">
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.34, 1.2, 0.64, 1],
                }}
              >
                <div
                  className="flex items-start gap-6 p-6 md:p-8 rounded-3xl transition-all hover:rotate-[-0.5deg]"
                  style={{
                    background: BOOK.cream,
                    boxShadow: `0 6px 0 0 ${BOOK.line}`,
                  }}
                >
                  {/* 大星星 + 數字 */}
                  <div className="relative shrink-0">
                    <Star size={56} color={BOOK.orange} />
                    <span
                      className="absolute inset-0 flex items-center justify-center font-display font-semibold text-xl"
                      style={{ color: BOOK.ink }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <p
                    className="flex-1 pt-2 font-display font-medium text-lg md:text-xl leading-[1.55]"
                    style={{ color: BOOK.ink }}
                  >
                    {h}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: BOOK.paperLight }}
      >
        <FloatingDecor className="absolute top-12 right-[6%]" delay={1.5}>
          <Cloud size={100} color={BOOK.cream} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <ChapterLabel align="center">What&apos;s Inside</ChapterLabel>
            <h2
              className="mt-8 font-display font-semibold leading-[1.15] text-[36px] md:text-[56px]"
              style={{ color: BOOK.ink }}
            >
              這本書
              <span style={{ color: BOOK.orangeDeep }}>包含什麼</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Included */}
            <StorybookCard className="p-8 md:p-10" rotate={-0.8}>
              <div className="flex items-center gap-3 mb-8">
                <CheckBadge />
                <h3
                  className="font-display font-semibold text-2xl"
                  style={{ color: BOOK.ink }}
                >
                  全部包含
                </h3>
              </div>
              <div className="space-y-5">
                {tour.inclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="shrink-0 mt-1">
                      <CheckIcon />
                    </span>
                    <p
                      className="flex-1 font-body text-base leading-[1.85]"
                      style={{ color: BOOK.ink }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </StorybookCard>

            {/* Excluded */}
            <StorybookCard className="p-8 md:p-10" rotate={0.8} bg={BOOK.paper}>
              <div className="flex items-center gap-3 mb-8">
                <CrossBadge />
                <h3
                  className="font-display font-semibold text-2xl"
                  style={{ color: BOOK.ink }}
                >
                  不在這本書
                </h3>
              </div>
              <div className="space-y-5">
                {tour.exclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="shrink-0 mt-1">
                      <CrossIcon />
                    </span>
                    <p
                      className="flex-1 font-body text-base leading-[1.85]"
                      style={{ color: BOOK.inkSoft }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </StorybookCard>
          </div>
        </div>
      </section>

      {/* ─────────────── Departure Dates ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">
        <FloatingDecor className="absolute top-20 right-[10%]" delay={0.8}>
          <Moon size={56} color={BOOK.skyLight} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <ChapterLabel align="center">Pick A Date</ChapterLabel>
            <h2
              className="mt-8 font-display font-semibold leading-[1.15] text-[36px] md:text-[56px]"
              style={{ color: BOOK.ink }}
            >
              選一個
              <span style={{ color: BOOK.orangeDeep }}>出發日</span>
            </h2>
            <p
              className="mt-8 mx-auto max-w-xl font-body text-base md:text-lg leading-[1.9]"
              style={{ color: BOOK.inkSoft }}
            >
              學期、寒暑假、家庭活動避開了嗎？
              選一個適合全家的日子、我們幫你卡位。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {tour.departureDates.map((date, i) => {
              const active = selectedDate === date;
              return (
                <motion.button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -3, rotate: active ? 0 : -1.5 }}
                  className="relative p-5 text-left rounded-3xl transition-all"
                  style={{
                    background: active ? BOOK.ink : BOOK.cream,
                    color: active ? BOOK.cream : BOOK.ink,
                    boxShadow: active
                      ? `0 6px 0 0 ${BOOK.skyDeep}`
                      : `0 6px 0 0 ${BOOK.line}`,
                  }}
                >
                  <p
                    className="font-body text-[10px] tracking-[0.25em] uppercase mb-2"
                    style={{
                      color: active ? BOOK.orangeLight : BOOK.inkFaint,
                    }}
                  >
                    {date.slice(0, 4)}
                  </p>
                  <p
                    className="font-display font-semibold text-base md:text-lg leading-tight"
                    style={{ color: active ? BOOK.cream : BOOK.ink }}
                  >
                    {formatDate(date)}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5">
                    {active ? (
                      <>
                        <Star size={12} color={BOOK.orangeLight} />
                        <span
                          className="font-body font-semibold text-[10px] tracking-[0.2em] uppercase"
                          style={{ color: BOOK.orangeLight }}
                        >
                          已選
                        </span>
                      </>
                    ) : (
                      <span
                        className="font-body text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: BOOK.inkFaint }}
                      >
                        尚有名額
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: BOOK.paperWarm }}
      >
        <FloatingDecor className="absolute top-16 left-[8%]" delay={0}>
          <PaperPlane size={64} color={BOOK.skyDeep} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-20 right-[10%]" delay={1.3}>
          <Sun size={72} color={BOOK.orange} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-3xl text-center">
          <ChapterLabel align="center">Next Chapter</ChapterLabel>
          <h2
            className="mt-10 font-display font-semibold leading-[1.18] text-[40px] md:text-[60px]"
            style={{ color: BOOK.ink }}
          >
            準備好
            <br />
            翻到<span style={{ color: BOOK.orangeDeep }}>下一章</span>了嗎
          </h2>
          <p
            className="mt-10 mx-auto max-w-xl font-body text-base md:text-lg leading-[2]"
            style={{ color: BOOK.inkSoft }}
          >
            先看一次完整 {tour.duration} 的日程章節、
            看每一天去哪、住哪、孩子能做什麼、
            再決定要不要加入這個故事。
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <StoryButton size="lg" variant="outline" onClick={onSeeItinerary}>
              看每日章節 →
            </StoryButton>
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
// QuickStat — 上方 4 個小卡
// ─────────────────────────────────────────────────────

function QuickStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="p-5 rounded-3xl flex items-center gap-4"
      style={{
        background: BOOK.cream,
        boxShadow: `0 4px 0 0 ${BOOK.line}`,
      }}
    >
      <div className="shrink-0">{icon}</div>
      <div>
        <p
          className="font-body text-[10px] tracking-[0.25em] uppercase mb-1"
          style={{ color: BOOK.inkFaint }}
        >
          {label}
        </p>
        <p
          className="font-display font-semibold text-base leading-tight"
          style={{ color: BOOK.ink }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// CheckBadge / CrossBadge — 大標題旁的圖章
// ─────────────────────────────────────────────────────

function CheckBadge() {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        background: BOOK.leaf,
        boxShadow: `0 3px 0 0 ${BOOK.ink}`,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M5 11 L 10 16 L 17 7"
          stroke={BOOK.cream}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CrossBadge() {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        background: BOOK.inkSoft,
        boxShadow: `0 3px 0 0 ${BOOK.ink}`,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <line
          x1="5"
          y1="5"
          x2="15"
          y2="15"
          stroke={BOOK.cream}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="15"
          y1="5"
          x2="5"
          y2="15"
          stroke={BOOK.cream}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// 小符號（item 前）
function CheckIcon() {
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center"
      style={{ background: BOOK.leaf }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M3 6 L 5.5 8.5 L 9 4"
          stroke={BOOK.cream}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CrossIcon() {
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center"
      style={{ background: BOOK.inkFaint }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
        <line
          x1="2.5"
          y1="2.5"
          x2="7.5"
          y2="7.5"
          stroke={BOOK.cream}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="7.5"
          y1="2.5"
          x2="2.5"
          y2="7.5"
          stroke={BOOK.cream}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
