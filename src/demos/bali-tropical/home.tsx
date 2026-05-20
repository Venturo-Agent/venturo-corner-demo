'use client';

/**
 * Home — landing view
 *
 * 結構：
 *   1. Hero（叢林梯田 / 廟宇全屏、scroll 時微 scale stay、不下沉）
 *   2. Statement「在角落 在叢林 在土地」+ 工藝段落
 *   3. 4 條精選 tour（蜜月 / 探險 / 文化 / 極光、巴里熱帶優先排蜜月）
 *   4. 品牌價值 4 條（手工工藝 / 在地嚮導 / 慢慢吃 / 永續觀光）
 *   5. 巴里手藝展示帶（galleryImages 不對稱 + 工藝字句）
 *   6. CTA 結尾
 *   7. Footer
 *
 * 跟 maldives-whitesand 的差異：
 *   - hero 不下沉、用「微微 scale + 葉脈飄落」取代漂浮
 *   - statement 段落更密、用「兩段引文 + 葉脈分隔」
 *   - value 區用 jungle 綠當背景、不是 lagoon 藍
 *   - 每張卡四角加「木刻角飾」FrameCorners
 *   - 卡片 hover 葉子轉動 12 度、不是水紋擴散
 */

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { tours, findTourBySlug, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  BALI,
  SectionLabel,
  BaliButton,
  CarvedLine,
  LeafDivider,
  LeafIcon,
  LotusIcon,
  StampNumber,
  WeavePattern,
  FrameCorners,
  EASE_OUT,
  EASE_LEAF,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  JungleFooter,
} from './shared';

// 巴里熱帶 demo 主推：馬爾地夫水上屋蜜月（共用 mock data、但視覺包裝完全不同）
const heroTour = findTourBySlug('maldives-honeymoon') ?? tours[0];

// 排序：蜜月 > 文化 > 探險 > 極光（熱帶 demo 蜜月與文化是主軸）
const featuredOrder: string[] = [
  'maldives-honeymoon',
  'kyoto-bunyei',
  'newzealand-adventure',
  'nordic-aurora',
];
const featured = featuredOrder
  .map((slug) => findTourBySlug(slug))
  .filter((t): t is Tour => Boolean(t));

// 品牌價值：巴里熱帶語氣 — 工藝、嚮導、慢吃、永續
const VALUES = [
  {
    n: 1,
    title: '手工工藝',
    enTitle: 'Handcrafted',
    body: '每一條行程都從一張白紙開始畫。我們不採購現成套裝、不買轉手批發。從入住的竹屋到午餐的香料、從導覽路線到伴手禮、都是團隊親自跑、親自談、親自挑的。',
  },
  {
    n: 2,
    title: '在地嚮導',
    enTitle: 'Local Guides',
    body: '帶你的不是觀光導遊、是真的住在叢林裡的當地人。會講中文的烏布老師、會帶你進香料市場後巷的廚娘、會講祖傳故事的廟宇祭司 — 每團配一位、貼身。',
  },
  {
    n: 3,
    title: '慢慢吃飯',
    enTitle: 'Slow Meals',
    body: '不趕、不打卡。每天午餐至少 90 分鐘、晚餐至少 120 分鐘。從食材怎麼來、廚師怎麼做、到桌邊的故事 — 全部讓你慢慢消化。胃口會打開、心也會。',
  },
  {
    n: 4,
    title: '永續觀光',
    enTitle: 'Sustainable',
    body: '我們合作的住宿全部通過 EarthCheck 或同等認證。塑膠零使用、能源 100% 太陽能或竹炭、用水回收灌溉稻田。你的旅行不在破壞土地、是在回饋它。',
  },
];

// 巴里工藝小語（在 statement 區的引言、傳達「土地、慢、工藝」三個關鍵字）
const STATEMENT_QUOTES = [
  {
    cn: '這裡的時間不走、它停在每一片葉子上、每一粒米裡。',
    en: 'Time does not move here. It rests on each leaf, each grain of rice.',
  },
  {
    cn: '工藝不是商品、是世代的記憶在指尖延續。',
    en: 'Craft is not goods. It is generations of memory living through hands.',
  },
];

// 巴里工藝展示帶的小語
const CRAFT_NOTES = [
  { label: 'Textile', cn: '蠟染', desc: 'Batik 手繪蠟染 · 一塊布要做四週' },
  { label: 'Silver', cn: '銀飾', desc: 'Celuk 村銀匠 · 每件作品有獨立印記' },
  { label: 'Wood', cn: '木雕', desc: 'Mas 村木雕 · 多用 hibiscus 與柚木' },
  { label: 'Spice', cn: '香料', desc: 'Ubud 香料市場 · 27 種香料現磨配方' },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  // Hero scroll 行為：不下沉、微微 scale + 自動 fade 上方文字
  // 跟 maldives 反向（maldives 是圖往下沉、文字 fade out）
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);

  // 客戶端飄落葉子（純裝飾、SSR 避開）
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ background: BALI.coconut, color: BALI.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section
        ref={heroRef}
        className="relative h-[94vh] min-h-[680px] w-full overflow-hidden"
      >
        {/* 背景圖、scroll 時微微放大（stay、不下沉） */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1600&q=80"
            alt="巴里島稻田梯田"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              filter: 'saturate(1.12) contrast(1.04) brightness(0.94)',
            }}
          />
        </motion.div>

        {/* 漸層：暖綠 → 透 → 暖深 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(37,32,18,0.45) 0%, rgba(37,32,18,0.05) 35%, rgba(37,32,18,0.7) 100%)',
          }}
        />

        {/* 飄落葉子 — 4 片 SVG 從上往下、不同速度與位置 */}
        {mounted && (
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + i * 22}%`,
                  top: '-5%',
                }}
                animate={{
                  y: ['0vh', '105vh'],
                  rotate: [0, 320 + i * 40],
                  x: [0, i % 2 === 0 ? 40 : -40, 0],
                  opacity: [0, 0.35, 0],
                }}
                transition={{
                  duration: 14 + i * 3,
                  repeat: Infinity,
                  delay: i * 3.5,
                  ease: EASE_LEAF,
                }}
              >
                <LeafIcon size={18 + (i % 2) * 6} color={BALI.spiceLight} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-12 flex flex-col">
          {/* Top：品牌字 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="pt-24 md:pt-32 flex items-center gap-4"
          >
            <LotusIcon size={14} color={BALI.coconutLight} />
            <span
              aria-hidden
              className="block h-px w-12"
              style={{ background: 'rgba(244,236,224,0.5)' }}
            />
            <p
              className="font-display text-[10px] md:text-xs tracking-[0.55em] uppercase"
              style={{ color: BALI.coconutLight, fontWeight: 400 }}
            >
              Corner Travel · Bali Series
            </p>
          </motion.div>

          {/* Center：主標 — 不浮動、改用「捲簾」reveal */}
          <div className="mt-auto pb-24 md:pb-32 max-w-4xl">
            <motion.h1
              initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.4 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE_OUT }}
              className="font-display leading-[1.05] text-[44px] md:text-[88px]"
              style={{
                color: BALI.coconutLight,
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              在角落
              <br />
              在叢林 在土地
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.6, ease: EASE_OUT }}
              className="mt-10 md:mt-14 max-w-xl"
            >
              <p
                className="text-base md:text-lg leading-[2.05]"
                style={{ color: 'rgba(244,236,224,0.92)' }}
              >
                有些旅行不是要去逛、是要去學。
                <br />
                跟著竹屋的木匠、跟著稻田的農夫、跟著香料市場的廚娘 —
                把日子放慢到能聽見土地的呼吸。
              </p>

              <div className="mt-12 md:mt-14 flex items-center gap-7">
                <BaliButton size="lg" variant="light" onClick={onSeeAll}>
                  看所有行程
                </BaliButton>
                <button
                  onClick={() => onSelectTour(heroTour.slug)}
                  className="font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 flex items-center gap-3"
                  style={{ color: BALI.coconutLight, fontWeight: 400 }}
                >
                  先看蜜月精選
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue：豎刻線 + 葉脈 */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span
            className="font-display text-[10px] tracking-[0.5em] uppercase"
            style={{ color: 'rgba(244,236,224,0.75)', fontWeight: 400 }}
          >
            Scroll
          </span>
          <motion.span
            animate={{ height: [40, 56, 40] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="block w-px"
            style={{ background: 'rgba(244,236,224,0.55)' }}
          />
          <LeafIcon size={12} color="rgba(244,236,224,0.7)" />
        </motion.div>
      </section>

      {/* ─────────────── Statement ─────────────── */}
      <section className="relative px-6 md:px-12 py-28 md:py-40">
        <WeavePattern opacity={0.045} color={BALI.wood} />

        <div className="relative mx-auto max-w-5xl">
          <SectionLabel align="center">Our Philosophy</SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="font-display mt-12 leading-[1.3] text-[26px] md:text-[42px] text-center"
            style={{
              color: BALI.wood,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            一座島
            <br />
            一千個工藝師傅
            <br />
            一段慢下來的旅程
          </motion.h2>

          {/* 中央葉脈分隔 */}
          <div className="mt-16 max-w-md mx-auto">
            <LeafDivider
              color={BALI.line}
              iconColor={BALI.spiceDeep}
            />
          </div>

          {/* 兩段引文、左右並排（密集排版） */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {STATEMENT_QUOTES.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.15,
                  ease: EASE_OUT,
                }}
                className="text-center md:text-left"
              >
                <p
                  className="font-display text-lg md:text-xl leading-[2.05]"
                  style={{ color: BALI.wood, fontWeight: 400 }}
                >
                  {q.cn}
                </p>
                <p
                  className="mt-5 font-mono text-[11px] tracking-[0.25em] leading-[1.8]"
                  style={{ color: BALI.inkFaint }}
                >
                  — {q.en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Featured Tours ─────────────── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28"
        style={{ background: BALI.coconutBone }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-24">
            <div>
              <SectionLabel>Featured Journeys</SectionLabel>
              <h2
                className="font-display mt-8 leading-[1.12] text-[36px] md:text-[60px]"
                style={{
                  color: BALI.wood,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                2026 年度
                <br />
                精選四條路線
              </h2>
              <p
                className="mt-8 max-w-xl text-base leading-[2.05]"
                style={{ color: BALI.inkSoft }}
              >
                每一條都是團隊親自跑完、確認每一頓飯、每一張床。
                我們不接收佣金回扣、所有合作夥伴公開可查。
              </p>
            </div>
            <button
              onClick={onSeeAll}
              className="font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 flex items-center gap-4 self-start md:self-end"
              style={{ color: BALI.wood, fontWeight: 400 }}
            >
              查看全部行程
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-20">
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
        className="relative px-6 md:px-12 py-28 md:py-40"
        style={{ background: BALI.jungleDeep, color: BALI.coconutLight }}
      >
        <WeavePattern opacity={0.05} color={BALI.coconutLight} />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-20 md:mb-24">
            <SectionLabel align="center" tone="coconut">
              Why Corner Bali
            </SectionLabel>
            <h2
              className="font-display mt-10 leading-[1.18] text-[36px] md:text-[56px]"
              style={{
                color: BALI.coconutLight,
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              我們的做法
              <br />
              四件事
            </h2>
          </div>

          {/* Values grid — 兩列兩行、每格四角加木刻角飾 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: 'rgba(244,236,224,0.16)' }}
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.1,
                  ease: EASE_OUT,
                }}
                className="relative px-8 md:px-12 py-14 md:py-16"
                style={{ background: BALI.jungleDeep }}
              >
                <FrameCorners
                  color="rgba(216,166,107,0.55)"
                  size={20}
                  inset={16}
                />

                <div className="flex items-baseline gap-5 mb-7">
                  <StampNumber n={v.n} tone="light" />
                  <span
                    className="font-mono text-[10px] tracking-[0.4em] uppercase"
                    style={{ color: BALI.spiceLight, fontWeight: 400 }}
                  >
                    {v.enTitle}
                  </span>
                </div>

                <h3
                  className="font-display text-3xl md:text-4xl leading-tight mb-7"
                  style={{
                    color: BALI.coconutLight,
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                  }}
                >
                  {v.title}
                </h3>

                <CarvedLine color="rgba(216,166,107,0.4)" />

                <p
                  className="mt-7 leading-[2.05] text-sm md:text-base"
                  style={{ color: 'rgba(244,236,224,0.82)' }}
                >
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Craft strip ─────────────── */}
      <section className="px-6 md:px-12 py-28 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
            <div>
              <SectionLabel tone="jungle">Bali Craft</SectionLabel>
              <h2
                className="font-display mt-8 leading-[1.18] text-[32px] md:text-[48px]"
                style={{
                  color: BALI.wood,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                工藝的清單
                <br />
                我們會帶你走進的
              </h2>
            </div>
            <p
              className="max-w-md text-sm md:text-base leading-[2.05]"
              style={{ color: BALI.inkSoft }}
            >
              這不是觀光路線、是工藝路線。
              四個世代相傳的村落、四種手藝、四次跟師傅同桌喝椰糖咖啡的下午。
            </p>
          </div>

          <CarvedLine color={BALI.line} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px mt-px"
            style={{ background: BALI.line }}
          >
            {CRAFT_NOTES.map((c, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: EASE_OUT,
                }}
                className="px-7 py-12 md:py-14"
                style={{ background: BALI.coconut }}
              >
                <div className="flex items-baseline gap-3 mb-7">
                  <span
                    className="font-mono text-[10px] tracking-[0.35em] uppercase"
                    style={{ color: BALI.spiceDeep }}
                  >
                    {c.label}
                  </span>
                  <span
                    aria-hidden
                    className="block h-px flex-1"
                    style={{ background: BALI.line }}
                  />
                </div>
                <h3
                  className="font-display text-2xl md:text-[28px] mb-5"
                  style={{
                    color: BALI.wood,
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                  }}
                >
                  {c.cn}
                </h3>
                <p
                  className="text-sm leading-[2]"
                  style={{ color: BALI.inkSoft }}
                >
                  {c.desc}
                </p>
              </motion.article>
            ))}
          </div>

          <CarvedLine color={BALI.line} />
        </div>
      </section>

      {/* ─────────────── Tag line + CTA ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-32 md:py-44 text-center"
        style={{ background: BALI.coconutDeep }}
      >
        <WeavePattern opacity={0.06} color={BALI.wood} />

        <div className="relative">
          <SectionLabel align="center">Begin Your Journey</SectionLabel>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="font-display mt-12 leading-[1.25] text-[32px] md:text-[52px]"
            style={{
              color: BALI.wood,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            稻田會等
            <br />
            香料還在
            <br />
            時間有的是
          </motion.h2>

          <p
            className="mt-12 max-w-xl mx-auto leading-[2.05] text-base"
            style={{ color: BALI.inkSoft }}
          >
            2026 出團名額已開放、蜜月與小型私訂優先安排。
            <br />
            歡迎來信、我們會用 24 小時內回覆。
          </p>

          <div className="mt-14 flex justify-center">
            <BaliButton size="lg" onClick={onSeeAll}>
              探索全部行程
            </BaliButton>
          </div>
        </div>
      </section>

      <JungleFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Featured card — 4:5 直立卡、四角加木刻角飾、hover 葉子轉動
// 跟 maldives 的 16:11 橫向「海平面照片」不同
// 巴里熱帶的卡更密、四角有印章
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
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.85,
        delay: (index % 2) * 0.1,
        ease: EASE_OUT,
      }}
      className="group text-left flex flex-col relative"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 48vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
          style={{
            filter: 'saturate(1.08) contrast(1.02) brightness(0.97)',
          }}
        />
        {/* 下方暖深漸層 */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background:
              'linear-gradient(180deg, rgba(37,32,18,0) 50%, rgba(37,32,18,0.55) 100%)',
          }}
        />

        {/* 木刻角飾 */}
        <FrameCorners
          color="rgba(244,236,224,0.7)"
          size={22}
          inset={14}
        />

        {/* 圖上層：分類 + 編號 */}
        <div className="absolute top-7 left-7 right-7 flex items-start justify-between">
          <span
            className="font-display text-[10px] tracking-[0.45em] uppercase px-3 py-2 inline-flex items-center gap-2"
            style={{
              background: 'rgba(244,236,224,0.92)',
              color: BALI.wood,
              fontWeight: 400,
            }}
          >
            <LotusIcon size={10} color={BALI.spiceDeep} />
            {CATEGORY_LABEL_EN[tour.category]}
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.3em]"
            style={{ color: BALI.coconutLight }}
          >
            {String(index + 1).padStart(2, '0')} / 04
          </span>
        </div>

        {/* 圖底層：destination + 葉子轉動 */}
        <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <MapPin size={13} strokeWidth={1.5} color={BALI.coconutLight} />
            <span
              className="font-display text-[11px] tracking-[0.4em] uppercase"
              style={{ color: BALI.coconutLight, fontWeight: 400 }}
            >
              {tour.destination}
            </span>
          </div>
          <motion.div
            animate={{ rotate: hover ? 14 : 0 }}
            transition={{ duration: 0.7, ease: EASE_LEAF }}
          >
            <LeafIcon size={20} color={BALI.spiceLight} />
          </motion.div>
        </div>
      </div>

      <div className="pt-10 pb-2">
        <h3
          className="font-display leading-tight text-3xl md:text-[36px] mb-5 transition-colors group-hover:underline underline-offset-[12px] decoration-1"
          style={{
            color: BALI.wood,
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          {tour.title}
        </h3>
        <p
          className="text-base leading-[1.95] mb-8"
          style={{ color: BALI.inkSoft }}
        >
          {tour.subtitle}
        </p>

        <CarvedLine color={BALI.line} />

        <div className="pt-6 flex items-baseline justify-between">
          <div className="flex items-center gap-7">
            <span
              className="font-mono text-[11px] tracking-wider"
              style={{ color: BALI.inkFaint }}
            >
              {tour.duration}
            </span>
            <span
              className="font-mono text-[11px] tracking-wider"
              style={{ color: BALI.inkFaint }}
            >
              {tour.groupSize.min}–{tour.groupSize.max} 人
            </span>
          </div>
          <div className="text-right">
            <span
              className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-1"
              style={{ color: BALI.inkFaint }}
            >
              From
            </span>
            <span
              className="font-display text-xl"
              style={{ color: BALI.wood, fontWeight: 400 }}
            >
              {formatPrice(tour.priceFrom)}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
