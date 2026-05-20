'use client';

/**
 * Home — Manhattan Editorial landing view
 *
 * 結構（雜誌期刊封面 + 內頁編排）：
 *   1. Masthead Bar 頂端標頭（CORNER · VOL.05 · ISSUE 02 · SPRING 2026）
 *   2. Hero：全屏黑底 + 大白字標 + 邊上 issue 標 + 編輯署名
 *   3. Editor's Letter：主編親述、driftcap 大首字、雙欄排版
 *   4. The Issue：4 條 tour 雜誌特輯卡（3+1 不對稱 spread）
 *   5. Manifesto：大字壓場
 *   6. Subscribe CTA
 *   7. Footer（雜誌版權頁感）
 *
 * 跟前 4 個 demo 的對比：
 *   - mediterranean / alpine：hero 圖在底、品牌 statement 在上 — manhattan：hero 整片黑底大字
 *   - muji：hero 圖只佔 50% — manhattan：100% 滿版、黑底白字、無 photo
 *   - maldives：浮動動畫 — manhattan：scroll-triggered 文字一個個顯示（雜誌翻頁感）
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  NYC,
  IssueMark,
  EditorialKicker,
  Byline,
  SerialNumber,
  Rule,
  EditorialButton,
  SwipeLink,
  MagazineHeadline,
  DropCap,
  Grain,
  bwImageStyle,
  BW_HOVER_CLASS,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  EDITORIAL_BRAND,
  EditorialFooter,
} from './shared';

const heroTour = tours[0];

const VALUES = [
  {
    n: 1,
    title: '14 人為界',
    body: '每團人數嚴格上限 14 人。我們相信旅行的記憶屬於小群人、不屬於擴音器與旗子。團大兩個、味道就跑掉了。',
  },
  {
    n: 2,
    title: '住宿親自踏過',
    body: '不收 OTA 評分、不看部落客推薦。我們派人去睡一晚才上架。沒被櫃台冷遇過、沒被冷氣 hold 過、沒被房客吵醒過——才賣。',
  },
  {
    n: 3,
    title: '深度而非走馬',
    body: '一天 2 到 3 個主要行程、留出空白時段。讓城市自己對你說話、而不是被導遊推著走、被照片催著拍。',
  },
  {
    n: 4,
    title: '中文領隊全程',
    body: '所有出團配 5 年以上中文領隊、不是外包翻譯。沒有自由行的孤獨、沒有大團的吵雜、有人替你 hold 住所有未明說的部分。',
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div style={{ background: NYC.paper, color: NYC.ink }}>
      {/* ─────────────── Masthead Bar ─────────────── */}
      <header
        className="px-6 md:px-12 py-4"
        style={{
          borderBottom: `1px solid ${NYC.ink}`,
          background: NYC.paper,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <span
              className="font-display text-xl md:text-2xl"
              style={{
                color: NYC.ink,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              CORNER
            </span>
            <span
              className="hidden md:inline font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: NYC.gray, fontWeight: 600 }}
            >
              {EDITORIAL_BRAND.masthead}
            </span>
          </div>
          <div className="flex items-baseline gap-6">
            <IssueMark className="hidden md:inline-flex" />
            <button
              onClick={onSeeAll}
              className="font-mono text-[11px] tracking-[0.22em] uppercase transition-colors hover:text-[#C4A678]"
              style={{ color: NYC.ink, fontWeight: 600 }}
            >
              The Issue
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────── Hero（全屏黑底大字） ─────────────── */}
      <section
        className="relative min-h-[88vh] w-full overflow-hidden"
        style={{ background: NYC.ink, color: NYC.paper }}
      >
        <Grain opacity={0.08} />

        {/* 邊上垂直 issue 標（雜誌書脊感） */}
        <div
          aria-hidden
          className="hidden md:flex absolute left-6 top-0 bottom-0 items-center pointer-events-none"
        >
          <span
            className="font-mono text-[10px] tracking-[0.45em] uppercase"
            style={{
              color: 'rgba(255,255,255,0.55)',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontWeight: 600,
            }}
          >
            CORNER QUARTERLY · NO. 05
          </span>
        </div>

        {/* 邊上右側日期條 */}
        <div
          aria-hidden
          className="hidden md:flex absolute right-6 top-0 bottom-0 items-center pointer-events-none"
        >
          <span
            className="font-mono text-[10px] tracking-[0.45em] uppercase"
            style={{
              color: 'rgba(196,166,120,0.85)',
              writingMode: 'vertical-rl',
              fontWeight: 600,
            }}
          >
            SPRING 2026 · TAIPEI EDITION
          </span>
        </div>

        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-20 min-h-[88vh] flex flex-col">
          {/* 上方 kicker */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.3, 1] }}
            className="pt-20 md:pt-24"
          >
            <div className="flex items-center gap-4">
              <span
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                THE COVER STORY
              </span>
              <span
                aria-hidden
                className="block h-px flex-1 max-w-[200px]"
                style={{ background: 'rgba(196,166,120,0.5)' }}
              />
              <span
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}
              >
                01 / 04
              </span>
            </div>
          </motion.div>

          {/* 大標題（堆疊式） */}
          <div className="mt-auto pb-12 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 0.8, 0.3, 1],
              }}
            >
              <h1
                className="font-display leading-[0.92] text-[64px] md:text-[148px]"
                style={{
                  color: NYC.paper,
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                }}
              >
                不是所有
                <br />
                風景<span style={{ color: NYC.camel }}>，</span>
                <br />
                都值得
                <br />
                <span style={{ color: NYC.camel }}>被拍照。</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 max-w-2xl grid grid-cols-[auto_1fr] gap-x-8 gap-y-3"
            >
              <div
                className="h-px w-12 mt-3"
                style={{ background: NYC.camel }}
              />
              <p
                className="font-body text-base md:text-lg leading-[1.7]"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                角落旅行社春季號。一年只出 24 團、每團最多 14 人、住宿全部親自踏過——
                <span style={{ color: NYC.camel }}>
                  這本季刊裡的每一條路線、都是我們相信「值得留下來看」的版本。
                </span>
              </p>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <EditorialButton
                size="lg"
                variant="inverted"
                onClick={onSeeAll}
              >
                Browse Issue 02
              </EditorialButton>
              <SwipeLink
                invert
                onClick={() => onSelectTour(heroTour.slug)}
              >
                Read Cover Story
              </SwipeLink>
            </motion.div>

            {/* Bottom byline strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-16 pt-6"
              style={{ borderTop: `1px solid rgba(255,255,255,0.18)` }}
            >
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <span style={{ color: NYC.camel, fontWeight: 700 }}>FEATURE</span>
                <span>BY 角落編輯室</span>
                <span style={{ color: NYC.camel }}>·</span>
                <span>PHOTO MOMO LIN</span>
                <span style={{ color: NYC.camel }}>·</span>
                <span>{heroTour.destination}</span>
                <span style={{ color: NYC.camel }}>·</span>
                <span className="ml-auto">PAGE 014</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Editor's Letter ─────────────── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28"
        style={{ background: NYC.paperWarm }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            {/* 左 sidebar：編輯署名 */}
            <aside className="md:col-span-4 md:border-r md:pr-12"
              style={{ borderColor: NYC.rule }}
            >
              <EditorialKicker label="EDITOR'S LETTER" />
              <MagazineHeadline
                size="lg"
                className="mt-4"
                style={{ letterSpacing: '-0.03em' }}
              >
                主編
                <br />
                親述。
              </MagazineHeadline>

              <div className="mt-10 space-y-1">
                <p
                  className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: NYC.gray, fontWeight: 600 }}
                >
                  EVA WANG
                </p>
                <p
                  className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: NYC.grayFaint }}
                >
                  Editor-in-Chief
                </p>
                <p
                  className="font-mono text-[10px] tracking-[0.18em] uppercase mt-3"
                  style={{ color: NYC.camel, fontWeight: 600 }}
                >
                  ISSUE 02 — 2026 SPRING
                </p>
              </div>

              <Rule className="mt-12 mb-6" color={NYC.rule} />

              <p
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.graySoft, fontWeight: 600 }}
              >
                Inside this issue
              </p>
              <div className="mt-4 space-y-2 font-mono text-[11px] tracking-wider"
                style={{ color: NYC.ink }}
              >
                <p>003 — Editor&apos;s Letter</p>
                <p>014 — The Cover Story</p>
                <p>028 — Four Journeys</p>
                <p>076 — Manifesto</p>
                <p>088 — Subscribe</p>
              </div>
            </aside>

            {/* 右 content：letter 本文 */}
            <article className="md:col-span-8">
              <div
                className="font-body text-base md:text-[17px] leading-[1.95]"
                style={{ color: NYC.inkSoft }}
              >
                <DropCap char="我" />
                <p>
                  們是一家很挑剔的旅行社。挑剔到每一年只敢出 24 團、每一團只敢收 14 個人、每一晚住宿都派人去睡過一遍才上架。
                </p>

                <p className="mt-6">
                  你打開這本季刊的時候，可能正在某個機場、某張沙發、或某個你早就受夠的辦公桌。我們不寫景點清單、不做出團 KPI、不發 IG 鈦合金限時動態。我們做的是這本季刊每一期都會問你的問題——
                </p>

                <p className="mt-6">
                  <span style={{ color: NYC.ink, fontWeight: 500 }}>
                    這趟旅行，你究竟想被改變什麼？
                  </span>
                </p>

                <p className="mt-6">
                  春季號收錄了我們今年最在意的四條路線。京都的春雨、紐西蘭的冰川、馬爾地夫的水上屋、北歐的綠光——四個完全不同的地方、四種完全不同的安靜。
                </p>

                <p className="mt-6">
                  選哪一條都好。但請選的時候慢一點。
                </p>

                <p className="mt-10 font-mono text-[11px] tracking-[0.22em] uppercase"
                  style={{ color: NYC.camel, fontWeight: 700 }}
                >
                  — Eva Wang, Editor-in-Chief
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────── The Issue（4 條 tour 雜誌特輯）─────────────── */}
      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="flex items-baseline justify-between flex-wrap gap-6 mb-12">
            <div>
              <EditorialKicker label="THE ISSUE" />
              <MagazineHeadline size="xl" className="mt-4">
                四條路線
                <br />
                <span style={{ color: NYC.camel }}>四種安靜。</span>
              </MagazineHeadline>
            </div>
            <SwipeLink onClick={onSeeAll}>
              See All Journeys
            </SwipeLink>
          </div>

          <Rule color={NYC.ink} weight={2} />

          {/* 3+1 不對稱 spread */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-16">
            {/* 第 1 條：cover-story 風大卡（佔 7 欄） */}
            <FeatureCard
              tour={tours[0]}
              index={0}
              variant="cover"
              onClick={() => onSelectTour(tours[0].slug)}
              className="md:col-span-7"
            />
            {/* 第 2 條：sidebar 風小卡（佔 5 欄）*/}
            <FeatureCard
              tour={tours[1]}
              index={1}
              variant="side"
              onClick={() => onSelectTour(tours[1].slug)}
              className="md:col-span-5"
            />
            {/* 第 3、4 條：對稱 spread（各 6 欄） */}
            <FeatureCard
              tour={tours[2]}
              index={2}
              variant="standard"
              onClick={() => onSelectTour(tours[2].slug)}
              className="md:col-span-6"
            />
            <FeatureCard
              tour={tours[3]}
              index={3}
              variant="standard"
              onClick={() => onSelectTour(tours[3].slug)}
              className="md:col-span-6"
            />
          </div>
        </div>
      </section>

      {/* ─────────────── Manifesto（大字壓場） ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-24 md:py-36"
        style={{ background: NYC.ink, color: NYC.paper }}
      >
        <Grain opacity={0.06} />
        <div className="relative mx-auto max-w-6xl">
          <EditorialKicker label="MANIFESTO" invert />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.3, 1] }}
            className="mt-10"
          >
            <h2
              className="font-display leading-[0.98]"
              style={{
                color: NYC.paper,
                fontWeight: 700,
                fontSize: 'clamp(36px, 7vw, 96px)',
                letterSpacing: '-0.025em',
              }}
            >
              當所有人都
              <br />
              <span style={{ color: NYC.camel }}>比誰去得遠</span>、
              <br />
              我們選擇
              <br />
              <span style={{ color: NYC.camel }}>待久一點。</span>
            </h2>
          </motion.div>

          {/* 四欄 manifesto 細節（雜誌 sidebar 感） */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-4 gap-px"
            style={{ background: 'rgba(255,255,255,0.18)' }}
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: v.n * 0.06,
                  ease: [0.25, 0.8, 0.3, 1],
                }}
                className="px-6 py-10"
                style={{ background: NYC.ink }}
              >
                <div className="flex items-baseline justify-between mb-6">
                  <SerialNumber
                    n={v.n}
                    invert
                    style={{ fontSize: 48, color: NYC.camel }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}
                  >
                    No.{String(v.n).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="font-display text-2xl mb-4 leading-tight"
                  style={{ color: NYC.paper, fontWeight: 700 }}
                >
                  {v.title}
                </h3>
                <p
                  className="font-body text-sm leading-[1.85]"
                  style={{ color: 'rgba(255,255,255,0.72)' }}
                >
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Subscribe CTA ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div
            className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 p-10 md:p-16"
            style={{
              background: NYC.paperWarm,
              border: `1px solid ${NYC.ink}`,
            }}
          >
            {/* 印刷感角標 */}
            <span
              aria-hidden
              className="absolute top-0 left-0 px-3 py-1 font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{
                background: NYC.ink,
                color: NYC.camel,
                fontWeight: 700,
              }}
            >
              Subscribe
            </span>

            <div className="md:col-span-7">
              <EditorialKicker label="JOIN THE ISSUE" />
              <MagazineHeadline size="lg" className="mt-6">
                訂閱
                <br />
                下一段旅行。
              </MagazineHeadline>
              <p
                className="mt-8 font-body text-base leading-[1.95]"
                style={{ color: NYC.graySoft }}
              >
                每三個月一期、印刷季刊與精選行程同步上架。
                <br />
                我們不發折扣信、不寄超過十封 email、不要你的生日當資料庫餵料。
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end gap-6">
              <div>
                <p
                  className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
                  style={{ color: NYC.camel, fontWeight: 700 }}
                >
                  Next Step
                </p>
                <p
                  className="font-display text-2xl leading-snug"
                  style={{ color: NYC.ink, fontWeight: 600 }}
                >
                  看完整本春季號、
                  <br />
                  選一條走。
                </p>
              </div>
              <EditorialButton size="lg" onClick={onSeeAll}>
                Browse All
              </EditorialButton>
            </div>
          </div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FeatureCard — 雜誌特輯卡（cover / side / standard 三種）
// 跟前 4 個 demo 的卡片對比：
//   - 圖片預設 B&W、hover 還原色
//   - 卡片上方有 PAGE 編號 + DEPARTMENT 標
//   - 標題用 weight 700 雜誌粗體
//   - 底部 byline 不是 metadata，是 photo credit
// ─────────────────────────────────────────────────────

function FeatureCard({
  tour,
  index,
  variant,
  className,
  onClick,
}: {
  tour: Tour;
  index: number;
  variant: 'cover' | 'side' | 'standard';
  className?: string;
  onClick: () => void;
}) {
  const aspectCls =
    variant === 'cover'
      ? 'aspect-[16/11]'
      : variant === 'side'
        ? 'aspect-[4/5]'
        : 'aspect-[5/4]';

  const titleSize = variant === 'cover' ? 'xl' : variant === 'side' ? 'lg' : 'lg';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.05,
        ease: [0.25, 0.8, 0.3, 1],
      }}
      className={`group text-left flex flex-col ${className ?? ''}`}
    >
      {/* Page header bar — PAGE / DEPARTMENT / VOL */}
      <div
        className="flex items-baseline justify-between py-2 mb-4"
        style={{ borderBottom: `1px solid ${NYC.ink}` }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.28em] uppercase"
          style={{ color: NYC.ink, fontWeight: 700 }}
        >
          {CATEGORY_LABEL_EN[tour.category]}
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: NYC.camel, fontWeight: 600 }}
        >
          PAGE {String((index + 1) * 14).padStart(3, '0')}
        </span>
      </div>

      {/* Image */}
      <div className={`relative ${aspectCls} w-full overflow-hidden`}>
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes={
            variant === 'cover'
              ? '(min-width: 768px) 58vw, 100vw'
              : variant === 'side'
                ? '(min-width: 768px) 42vw, 100vw'
                : '(min-width: 768px) 50vw, 100vw'
          }
          className={`object-cover ${BW_HOVER_CLASS}`}
          style={bwImageStyle()}
        />
        {/* 圖片左下序號 + 圖片右下 destination tag（印刷感） */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(17,17,17,0.55) 100%)',
          }}
        >
          <SerialNumber
            n={String(index + 1).padStart(2, '0')}
            style={{ fontSize: variant === 'cover' ? 64 : 44, color: NYC.paper }}
          />
          <div className="text-right">
            <p
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: NYC.camel, fontWeight: 600 }}
            >
              {tour.destination}
            </p>
          </div>
        </div>
      </div>

      {/* Title block */}
      <div className="pt-6">
        <div className="flex items-baseline gap-3 mb-4">
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ color: NYC.camel, fontWeight: 700 }}
          >
            FEATURE
          </span>
          <span
            aria-hidden
            className="block h-px w-8"
            style={{ background: NYC.camel }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: NYC.graySoft }}
          >
            BY 角落編輯室 · {tour.duration}
          </span>
        </div>

        <MagazineHeadline
          size={titleSize}
          as="h3"
          className="leading-[1.02] transition-colors group-hover:text-[#C4A678]"
        >
          {tour.title}
        </MagazineHeadline>

        <p
          className="mt-4 font-body text-base leading-[1.7]"
          style={{ color: NYC.graySoft }}
        >
          {tour.tagline}
        </p>

        {/* Meta strip + price */}
        <div className="mt-6 pt-4 flex items-baseline justify-between gap-4"
          style={{ borderTop: `1px solid ${NYC.ruleSoft}` }}
        >
          <div className="flex items-baseline gap-4 flex-wrap font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: NYC.graySoft }}
          >
            <span>{tour.groupSize.min}–{tour.groupSize.max} GUESTS</span>
            <span style={{ color: NYC.camel }}>/</span>
            <span>{tour.departureDates.length} DEPARTURES</span>
          </div>
          <div className="text-right">
            <span
              className="font-mono text-[10px] tracking-[0.22em] uppercase block"
              style={{ color: NYC.grayFaint, fontWeight: 600 }}
            >
              FROM
            </span>
            <span
              className="font-display text-xl md:text-2xl block leading-tight"
              style={{ color: NYC.ink, fontWeight: 700 }}
            >
              {formatPrice(tour.priceFrom)}
            </span>
          </div>
        </div>

        {/* Read more swipe link */}
        <div className="mt-5">
          <span
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase"
            style={{ color: NYC.ink, fontWeight: 600 }}
          >
            <span className="relative">
              Read the Story
              <span
                aria-hidden
                className="absolute left-0 -bottom-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: NYC.camel }}
              />
            </span>
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </motion.button>
  );
}
