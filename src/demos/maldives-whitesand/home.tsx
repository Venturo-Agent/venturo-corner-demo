'use client';

/**
 * Home — landing view
 *
 * 結構：
 *   1. Hero 全屏海景（馬爾地夫水上屋當主視覺、parallax 沉入）
 *   2. Floating statement（「在角落 看海」浮動）
 *   3. 4 條精選 tour preview（蜜月那條最先）
 *   4. 海島專屬品牌價值（私人沙洲 / 水上屋 / 24h 管家 / 永續海島）
 *   5. CTA footer（看所有行程）
 *
 * 跟 mediterranean-sun 的差異：
 *   - hero 文字微浮動（漂浮在水面感）
 *   - statement 段落寬鬆很多、給天空一個位置
 *   - 水平線當 separator、像海平面
 *   - value 區塊用奶藍背景而非沙色
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { tours, findTourBySlug, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  SEA,
  SectionLabel,
  SeaButton,
  SeaLine,
  FLOAT_LOOP,
  EASE_OUT,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  IslandFooter,
} from './shared';

// 海島 demo 主推：馬爾地夫水上屋蜜月
const heroTour =
  findTourBySlug('maldives-honeymoon') ?? tours[0];

// 排序：蜜月優先（海島 demo）、其他保留原本順序
const featuredOrder: string[] = [
  'maldives-honeymoon',
  'newzealand-adventure',
  'kyoto-bunyei',
  'nordic-aurora',
];
const featured = featuredOrder
  .map((slug) => findTourBySlug(slug))
  .filter((t): t is Tour => Boolean(t));

// 品牌價值：海島專屬、不是地中海那套（小團 / 町家）
const VALUES = [
  {
    n: 1,
    title: '私人沙洲',
    body: '我們安排的不是公共沙灘。每團都有至少一次的「無人沙洲」體驗 — 小艇載你們去、管家擺好下午茶、那是只有你們兩個的島。',
  },
  {
    n: 2,
    title: '水上屋優先',
    body: '配合住宿選擇 30 房內的小島 resort、水上屋直接面對潟湖。屋內滑梯下海、玻璃地板看魚 — 不是 chain hotel 的「海景房」。',
  },
  {
    n: 3,
    title: '24 小時管家',
    body: '每組客人配專屬管家。從機場接機到沙洲晚餐、從早餐送到房內到夜釣安排 — 所有需求一個人處理、不必跟櫃台來回。',
  },
  {
    n: 4,
    title: '永續海島',
    body: '我們合作的島嶼全部通過 Green Globe 或同等認證。塑膠零使用、能源 100% 太陽能、海水淡化 — 你的蜜月不在破壞海。',
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  // Hero parallax sink — scroll 時圖往下沉
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  // 客戶端浮動文字 — 確保 SSR 沒問題
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ background: SEA.foam, color: SEA.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section
        ref={heroRef}
        className="relative h-[92vh] min-h-[680px] w-full overflow-hidden"
      >
        {/* 背景圖、parallax 往下沉 */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src={heroTour.heroImage}
            alt={heroTour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* 漸層蒙版：上方淡、中間透、下方深 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,61,73,0.30) 0%, rgba(14,61,73,0.05) 32%, rgba(14,61,73,0.55) 100%)',
          }}
        />

        {/* 中央水平細線 — 像海平面、純裝飾 */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-px"
          style={{ background: 'rgba(240,248,250,0.18)' }}
        />

        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-12 flex flex-col">
          {/* Top：品牌字 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE_OUT }}
            className="pt-24 md:pt-32 flex items-center gap-6"
          >
            <span
              aria-hidden
              className="block h-px w-16"
              style={{ background: 'rgba(240,248,250,0.5)' }}
            />
            <p
              className="font-display text-[10px] md:text-xs tracking-[0.55em] uppercase"
              style={{ color: SEA.foamLight, fontWeight: 300 }}
            >
              Corner Travel · Est. 2018
            </p>
          </motion.div>

          {/* Center：浮動主標 — 在「海平面」上慢慢漂浮 */}
          <div className="mt-auto pb-24 md:pb-32 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: EASE_OUT }}
            >
              {/* 浮動 wrapper：mount 後才啟動 loop、避免 SSR mismatch */}
              <motion.h1
                animate={mounted ? FLOAT_LOOP : undefined}
                className="font-display leading-[1.1] text-[44px] md:text-[88px]"
                style={{
                  color: SEA.foamLight,
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                }}
              >
                在角落
                <br />
                看一片海
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4, ease: EASE_OUT }}
              className="mt-10 md:mt-14 max-w-xl"
            >
              <p
                className="text-base md:text-lg leading-[2]"
                style={{ color: 'rgba(240,248,250,0.88)' }}
              >
                有些地方不是要去走、是要去停。
                <br />
                把行李放下、把時間鬆開、讓白沙、潟湖、與海風自己安排。
              </p>

              <div className="mt-12 md:mt-14 flex items-center gap-8">
                <SeaButton size="lg" variant="light" onClick={onSeeAll}>
                  看所有行程
                </SeaButton>
                <button
                  onClick={() => onSelectTour(heroTour.slug)}
                  className="font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 flex items-center gap-3"
                  style={{ color: SEA.foamLight, fontWeight: 300 }}
                >
                  先看蜜月精選
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span
            className="font-display text-[10px] tracking-[0.5em] uppercase"
            style={{ color: 'rgba(240,248,250,0.7)', fontWeight: 300 }}
          >
            Scroll
          </span>
          <motion.span
            animate={{ height: [40, 56, 40] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="block w-px"
            style={{ background: 'rgba(240,248,250,0.5)' }}
          />
        </motion.div>
      </section>

      {/* ─────────────── Statement ─────────────── */}
      <section className="mx-auto max-w-4xl px-6 md:px-12 py-32 md:py-44 text-center">
        <SectionLabel align="center">Our Philosophy</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: EASE_OUT }}
          className="font-display mt-14 leading-[1.35] text-[26px] md:text-[40px]"
          style={{
            color: SEA.deep,
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}
        >
          有些旅行
          <br />
          是為了到達。
          <br />
          有些旅行
          <br />
          是為了消失。
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT }}
          className="mt-16 md:mt-20 mx-auto h-px origin-center"
          style={{ background: SEA.ocean, width: 64 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-16 md:mt-20 max-w-2xl mx-auto leading-[2.2] text-base"
          style={{ color: SEA.inkSoft }}
        >
          角落旅行社的海島系列、是為了讓人徹底鬆開。
          沒有打卡景點清單、沒有趕路、沒有時差感。
          住在水上、吃在沙灘、什麼都不做也是一種行程。
        </motion.p>
      </section>

      {/* ─────────────── Featured Tours ─────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28">
            <div>
              <SectionLabel>Featured Journeys</SectionLabel>
              <h2
                className="font-display mt-8 leading-[1.15] text-[36px] md:text-[60px]"
                style={{
                  color: SEA.deep,
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                2026 年度
                <br />
                精選四條路線
              </h2>
            </div>
            <button
              onClick={onSeeAll}
              className="font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 flex items-center gap-4 self-start md:self-end"
              style={{ color: SEA.deep, fontWeight: 300 }}
            >
              查看全部行程
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-24">
            {featured.map((tour, i) => (
              <FeaturedCard
                key={tour.slug}
                tour={tour}
                index={i}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Values ─────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44 mt-16"
        style={{ background: SEA.lagoon }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <SectionLabel align="center">Why Corner Islands</SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.2] text-[36px] md:text-[56px]"
              style={{
                color: SEA.deep,
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              我們的海島
              <br />
              做法
            </h2>
          </div>

          {/* Values grid — 用大數字 + 標題 + 細水平線分隔 */}
          <div className="space-y-px" style={{ background: 'rgba(14,61,73,0.12)' }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: EASE_OUT,
                }}
                className="px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
                style={{ background: SEA.lagoon }}
              >
                <div className="md:col-span-2">
                  <span
                    className="font-display text-4xl md:text-5xl"
                    style={{
                      color: SEA.foamLight,
                      fontWeight: 300,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {String(v.n).padStart(2, '0')}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3
                    className="font-display text-2xl md:text-3xl leading-tight"
                    style={{
                      color: SEA.deep,
                      fontWeight: 300,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {v.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p
                    className="leading-[2.1] text-base"
                    style={{ color: SEA.deepSoft }}
                  >
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Tag line + CTA ─────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44 text-center">
        <SectionLabel align="center">Begin Your Journey</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="font-display mt-12 leading-[1.25] text-[32px] md:text-[52px]"
          style={{
            color: SEA.deep,
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}
        >
          海一直在那裡、
          <br />
          時間還早。
        </motion.h2>

        <p
          className="mt-10 max-w-xl mx-auto leading-[2] text-base"
          style={{ color: SEA.inkSoft }}
        >
          2026 出團名額已開放、蜜月與小型私訂優先安排。
          歡迎來信、我們會用 24 小時內回覆。
        </p>

        <div className="mt-14 flex justify-center">
          <SeaButton size="lg" onClick={onSeeAll}>
            探索全部行程
          </SeaButton>
        </div>
      </section>

      <IslandFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Featured card — 大圖 + 標題 + meta + 起價
// 跟 mediterranean-sun 的 4:5 直立卡不同：用 16:11 橫向、像「海平面照片」
// ─────────────────────────────────────────────────────

function FeaturedCard({
  tour,
  index,
  onClick,
}: {
  tour: Tour;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.95,
        delay: (index % 2) * 0.1,
        ease: EASE_OUT,
      }}
      className="group text-left flex flex-col"
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        {/* hover 時退掉的下方漸層 */}
        <div
          className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-30"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,61,73,0) 55%, rgba(14,61,73,0.35) 100%)',
          }}
        />
        {/* 圖上層左：分類；右：編號 */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <span
            className="font-display text-[10px] tracking-[0.45em] uppercase px-4 py-2"
            style={{
              background: 'rgba(240,248,250,0.92)',
              color: SEA.deep,
              fontWeight: 300,
            }}
          >
            {CATEGORY_LABEL_EN[tour.category]} · {CATEGORY_LABEL[tour.category]}
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.3em]"
            style={{ color: SEA.foamLight }}
          >
            {String(index + 1).padStart(2, '0')} / 04
          </span>
        </div>
      </div>

      <div className="pt-10 pb-2">
        <div className="flex items-center gap-4 mb-5">
          <MapPin size={13} strokeWidth={1.5} style={{ color: SEA.ocean }} />
          <span
            className="font-display text-[10px] tracking-[0.4em] uppercase"
            style={{ color: SEA.ocean, fontWeight: 300 }}
          >
            {tour.destination}
          </span>
        </div>

        <h3
          className="font-display leading-tight text-3xl md:text-[40px] mb-5 transition-colors group-hover:underline underline-offset-[12px] decoration-1"
          style={{
            color: SEA.deep,
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}
        >
          {tour.title}
        </h3>
        <p
          className="text-base leading-[1.95] mb-10"
          style={{ color: SEA.inkSoft }}
        >
          {tour.subtitle}
        </p>

        <SeaLine />

        <div className="pt-6 flex items-baseline justify-between">
          <div className="flex items-center gap-8">
            <span
              className="font-mono text-[11px] tracking-wider"
              style={{ color: SEA.inkFaint }}
            >
              {tour.duration}
            </span>
            <span
              className="font-mono text-[11px] tracking-wider"
              style={{ color: SEA.inkFaint }}
            >
              {tour.groupSize.min}–{tour.groupSize.max} 人
            </span>
          </div>
          <div className="text-right">
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-1"
              style={{ color: SEA.inkFaint }}
            >
              From
            </span>
            <span
              className="font-display text-xl"
              style={{ color: SEA.deep, fontWeight: 300 }}
            >
              {formatPrice(tour.priceFrom)}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
