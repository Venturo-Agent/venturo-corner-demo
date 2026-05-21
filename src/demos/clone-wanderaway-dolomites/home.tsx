'use client';

/**
 * Home — landing page
 *
 * 結構（對齊 reference 首頁 section 順序）：
 *   1. Top bar（透明覆蓋於 hero、cream logo + Title Case menu + social ALL CAPS）
 *   2. Hero 全屏 cover image + 居中 Italiana 大標 + Newsletter cue + scroll cue
 *   3. Intro philosophy 段落（居中 Eyebrow + Italiana 中標 + Jost 長段）
 *   4. Featured Journeys grid（4 條 tour、cream 卡片、編號 + Italiana 標題）
 *   5. 帶背景圖的 quote section（forest sage overlay）
 *   6. Travel news 三欄 blog preview（reference 首頁有大量 blog preview）
 *   7. Subscribe to Newsletter（reference 招牌段、置中 form）
 *   8. Footer 三欄
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  WA,
  fontClass,
  serif,
  sans,
  Eyebrow,
  DisplayTitle,
  BodyText,
  PillButton,
  Divider,
  SerialNumeral,
  CATEGORY_SHORT,
} from './shared';

const heroTour = tours[0];

const PHILOSOPHY_POINTS = [
  {
    n: 1,
    title: 'Small Group',
    zh: '每團上限十四人',
    body: '我們相信好的旅行屬於小群人、不屬於擴音器與旗子。',
  },
  {
    n: 2,
    title: 'Curated Stays',
    zh: '住宿都親自踏過',
    body: '町家、莊園、玻璃屋。每一晚都是主理人挑過的地方。',
  },
  {
    n: 3,
    title: 'Slow Pace',
    zh: '深度而非走馬看花',
    body: '一天兩到三個主要行程、留出空白。讓城市自己對你說話。',
  },
];

const TRAVEL_JOURNAL = [
  {
    date: '2026 . 04 . 12',
    category: 'Field Notes',
    title: '京都的雨、與一杯沒喝完的抹茶',
    excerpt: '在裏千家茶室坐了一整個下午、外頭下著春雨。茶筅輕響、時間慢得像沒在走。',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
  },
  {
    date: '2026 . 03 . 28',
    category: 'Behind The Trip',
    title: '南島冰川直升機降落點，是這樣選的',
    excerpt: '為什麼我們在 Franz Josef 不走商業團路線？因為真正的藍冰、要再往上飛七分鐘。',
    image:
      'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=1200&q=80',
  },
  {
    date: '2026 . 02 . 09',
    category: 'Tips & Tricks',
    title: '看極光的三個迷思，與一個只有領隊知道的時段',
    excerpt: 'KP 指數高就一定看得到？不一定。最關鍵的是雲層與月相，這個冷知識救過很多客人。',
    image:
      'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=1200&q=80',
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div
      className={fontClass}
      style={{ background: WA.creamWarm, color: WA.ink, ...sans }}
    >
      <TopBar onSeeAll={onSeeAll} variant="overlay" />

      {/* ────────────── Hero ────────────── */}
      <section className="relative h-[100vh] min-h-[680px] w-full overflow-hidden">
        <Image
          src={heroTour.heroImage}
          alt="角落旅行社 hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* 微暗 overlay — reference 喜歡輕度 overlay 保留圖片自然色 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,26,26,0.32) 0%, rgba(26,26,26,0.08) 30%, rgba(26,26,26,0.55) 100%)',
          }}
        />

        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-[11px] tracking-[0.45em] uppercase"
              style={{ ...sans, color: WA.creamLight, fontWeight: 500 }}
            >
              Corner Travel  ·  Est. 2018  ·  Taipei
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-5xl text-[44px] md:text-[104px] leading-[1.02] tracking-[-0.005em]"
            style={{ ...serif, color: WA.creamLight, fontWeight: 400 }}
          >
            Wander Slowly.
            <br />
            Stay In The Corners.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.55 }}
            className="mt-12 max-w-2xl text-[15px] md:text-base leading-[1.95]"
            style={{
              ...sans,
              color: 'rgba(252,239,223,0.86)',
              fontWeight: 300,
            }}
          >
            一年只出二十四團、每團不超過十四人。
            <br />
            從千年京都到南島冰川、把世界最安靜的角落、慢慢看完。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-14 flex flex-col sm:flex-row items-center gap-6"
          >
            <PillButton
              variant="cream"
              size="lg"
              onClick={onSeeAll}
            >
              View All Journeys
            </PillButton>
            <button
              onClick={() => onSelectTour(heroTour.slug)}
              className="text-[11px] tracking-[0.32em] uppercase transition-opacity hover:opacity-70 inline-flex items-center gap-3"
              style={{ ...sans, color: WA.creamLight, fontWeight: 500 }}
            >
              See Featured Trip
              <ArrowRight size={13} strokeWidth={1.2} />
            </button>
          </motion.div>

          {/* scroll cue（reference 底部偶見） */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span
              className="text-[10px] tracking-[0.4em] uppercase"
              style={{
                ...sans,
                color: 'rgba(252,239,223,0.66)',
                fontWeight: 500,
              }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown
                size={14}
                strokeWidth={1.2}
                style={{ color: 'rgba(252,239,223,0.66)' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ────────────── Philosophy / Intro ────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>Our Philosophy</Eyebrow>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <DisplayTitle size="lg" align="center">
              The Best Trips
              <br />
              Are The Slow Ones.
            </DisplayTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-16"
          >
            <BodyText size="lg" align="center">
              我們不做塞滿景點的趕集、也不做走馬看花的觀光。
              <br />
              角落旅行社相信、旅行最珍貴的、是那個願意為一杯茶坐下來、
              <br />
              為一場日落停下來、為一個陌生人留出時間的瞬間。
            </BodyText>
          </motion.div>
        </div>

        {/* 三欄 philosophy points */}
        <div className="mx-auto max-w-6xl mt-24 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {PHILOSOPHY_POINTS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center"
              >
                <span
                  className="text-5xl md:text-6xl block leading-none"
                  style={{ ...serif, color: WA.forest }}
                >
                  {String(p.n).padStart(2, '0')}
                </span>
                <h3
                  className="mt-8 text-[26px] md:text-[32px] leading-snug"
                  style={{ ...serif, color: WA.ink }}
                >
                  {p.title}
                </h3>
                <p
                  className="mt-3 text-[11px] tracking-[0.32em] uppercase"
                  style={{ ...sans, color: WA.forest, fontWeight: 500 }}
                >
                  {p.zh}
                </p>
                <p
                  className="mt-6 text-sm leading-[1.9] max-w-xs mx-auto"
                  style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
                >
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── Featured Journeys ────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: WA.cream }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <Eyebrow>Featured Journeys</Eyebrow>
            <div className="mt-12">
              <DisplayTitle size="lg" align="center">
                Four Journeys
                <br />
                For The Year Of 2026.
              </DisplayTitle>
            </div>
            <div className="mt-12 max-w-xl mx-auto">
              <BodyText size="md" align="center">
                從文化深度到極光獵人。
                <br />
                一年只精選四條、每條都帶你去看別團去不了的角落。
              </BodyText>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24">
            {tours.map((tour, i) => (
              <FeaturedCard
                key={tour.slug}
                tour={tour}
                index={i}
                total={tours.length}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>

          <div className="mt-24 flex justify-center">
            <PillButton variant="outline" size="lg" onClick={onSeeAll}>
              See All Journeys
              <ArrowRight size={13} strokeWidth={1.2} />
            </PillButton>
          </div>
        </div>
      </section>

      {/* ────────────── Quote on image ────────────── */}
      <section className="relative h-[68vh] min-h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=80"
          alt="紐西蘭山岳"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(56,91,33,0.42) 0%, rgba(56,91,33,0.62) 100%)',
          }}
        />
        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
          <span
            className="text-[11px] tracking-[0.4em] uppercase mb-10"
            style={{
              ...sans,
              color: 'rgba(252,239,223,0.78)',
              fontWeight: 500,
            }}
          >
            From The Founder
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[28px] md:text-[44px] leading-[1.35] tracking-[-0.005em]"
            style={{ ...serif, color: WA.creamLight, fontWeight: 400 }}
          >
            旅行的價值、不在於走得多遠、
            <br />
            而在於停下來時、能不能聽見一個地方的聲音。
          </motion.h2>
          <span
            className="mt-12 text-[11px] tracking-[0.4em] uppercase"
            style={{
              ...sans,
              color: 'rgba(252,239,223,0.78)',
              fontWeight: 500,
            }}
          >
            ——  Mia Lin  ·  Founder, Corner Travel
          </span>
        </div>
      </section>

      {/* ────────────── Travel Journal ────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Eyebrow>Travel Journal</Eyebrow>
            <div className="mt-12">
              <DisplayTitle size="md" align="center">
                Recent Notes From The Road.
              </DisplayTitle>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {TRAVEL_JOURNAL.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center group cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <span
                  className="text-[10px] tracking-[0.32em] uppercase block mb-4"
                  style={{ ...sans, color: WA.forest, fontWeight: 500 }}
                >
                  {post.category}  ·  {post.date}
                </span>
                <h3
                  className="text-[24px] md:text-[28px] leading-snug max-w-sm mx-auto"
                  style={{ ...serif, color: WA.ink }}
                >
                  {post.title}
                </h3>
                <p
                  className="mt-6 text-sm leading-[1.9] max-w-sm mx-auto"
                  style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
                >
                  {post.excerpt}
                </p>
                <span
                  className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase"
                  style={{ ...sans, color: WA.ink, fontWeight: 500 }}
                >
                  Read Note
                  <ArrowRight
                    size={12}
                    strokeWidth={1.2}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── Subscribe（reference 招牌 section）────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: WA.sageMist }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Subscribe To A Newsletter</Eyebrow>
          <div className="mt-12">
            <DisplayTitle size="md" align="center">
              Letters From The Corners,
              <br />
              Once A Month.
            </DisplayTitle>
          </div>
          <div className="mt-12 max-w-xl mx-auto">
            <BodyText size="md" align="center">
              每個月一封信、寫旅程後的觀察、推薦書與下個季節的精選。
              <br />
              不行銷、不轉售、隨時退訂。
            </BodyText>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-16 flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 h-14 px-8 outline-none rounded-full text-[14px] w-full transition-colors focus:bg-white"
              style={{
                ...sans,
                background: WA.creamLight,
                border: `1px solid ${WA.sageSoft}`,
                color: WA.ink,
              }}
            />
            <PillButton variant="solid" size="lg" type="submit">
              Subscribe
            </PillButton>
          </form>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Featured card — reference 風格大圖 + 居中文字
// ─────────────────────────────────────────────────────

function FeaturedCard({
  tour,
  index,
  total,
  onClick,
}: {
  tour: Tour;
  index: number;
  total: number;
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
        duration: 0.85,
        delay: (index % 2) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group text-center flex flex-col w-full"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />
        <span
          className="absolute top-6 left-6 px-4 py-2 text-[10px] tracking-[0.32em] uppercase rounded-full"
          style={{
            ...sans,
            background: 'rgba(252,239,223,0.94)',
            color: WA.ink,
            fontWeight: 500,
          }}
        >
          {CATEGORY_SHORT[tour.category]}
        </span>
        <span
          className="absolute top-6 right-6"
        >
          <SerialNumeral n={index + 1} total={total} />
        </span>
      </div>

      <div className="pt-12 pb-2 max-w-md mx-auto">
        <span
          className="text-[11px] tracking-[0.32em] uppercase block mb-6"
          style={{ ...sans, color: WA.forest, fontWeight: 500 }}
        >
          {tour.destination}
        </span>
        <h3
          className="text-[30px] md:text-[40px] leading-[1.1] tracking-[-0.005em] transition-colors group-hover:opacity-70"
          style={{ ...serif, color: WA.ink, fontWeight: 400 }}
        >
          {tour.title}
        </h3>
        <p
          className="mt-6 text-sm md:text-[15px] leading-[1.9]"
          style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
        >
          {tour.subtitle}
        </p>

        <div className="mt-10 flex items-center justify-center gap-6 text-[11px] tracking-[0.2em] uppercase"
          style={{ ...sans, color: WA.inkFaint, fontWeight: 500 }}
        >
          <span>{tour.duration}</span>
          <span
            aria-hidden
            className="block w-1 h-1 rounded-full"
            style={{ background: WA.inkMute }}
          />
          <span>From {formatPrice(tour.priceFrom)}</span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────
// TopBar — 共用 navigation
// ─────────────────────────────────────────────────────

export function TopBar({
  variant,
  onSeeAll,
}: {
  variant: 'overlay' | 'solid';
  onSeeAll?: () => void;
}) {
  const isOverlay = variant === 'overlay';
  const fg = isOverlay ? WA.creamLight : WA.ink;
  const accent = isOverlay ? 'rgba(252,239,223,0.65)' : WA.inkFaint;

  return (
    <header
      className={`${isOverlay ? 'absolute z-10' : 'relative'} top-0 left-0 right-0`}
      style={{
        background: isOverlay ? 'transparent' : WA.creamWarm,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-24 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={onSeeAll}
          className="text-left transition-opacity hover:opacity-70"
        >
          <span
            className="block text-[22px] md:text-[26px] leading-none"
            style={{ ...serif, color: fg, fontWeight: 400 }}
          >
            Corner
          </span>
          <span
            className="block mt-1 text-[9px] tracking-[0.4em] uppercase"
            style={{ ...sans, color: accent, fontWeight: 500 }}
          >
            Travel Society
          </span>
        </button>

        {/* Menu — reference 風格 Title Case + 寬鬆字距、不全大寫 */}
        <nav className="hidden md:flex items-center gap-10">
          {['Journeys', 'Destinations', 'Journal', 'About', 'Contact'].map(
            (item) => (
              <button
                key={item}
                onClick={onSeeAll}
                className="text-[13px] transition-opacity hover:opacity-60"
                style={{ ...sans, color: fg, fontWeight: 400 }}
              >
                {item}
              </button>
            ),
          )}
        </nav>

        {/* Social — reference 用 ALL CAPS 分開列 */}
        <div className="hidden md:flex items-center gap-5">
          {['IG', 'YT', 'FB'].map((s) => (
            <span
              key={s}
              className="text-[10px] tracking-[0.32em] uppercase"
              style={{ ...sans, color: accent, fontWeight: 500 }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Mobile hint */}
        <span
          className="md:hidden text-[10px] tracking-[0.32em] uppercase"
          style={{ ...sans, color: fg, fontWeight: 500 }}
        >
          Menu
        </span>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────
// Footer — reference：三欄 + 細線 + 版權置中
// ─────────────────────────────────────────────────────

export function CornerFooter() {
  return (
    <footer
      className="px-6 md:px-12 py-24"
      style={{ background: WA.ink, color: WA.creamLight }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top: logo + tagline 居中（reference footer top 風格） */}
        <div className="text-center mb-20">
          <span
            className="block text-[36px] md:text-[48px] leading-none"
            style={{ ...serif, color: WA.creamLight, fontWeight: 400 }}
          >
            Corner Travel
          </span>
          <span
            className="block mt-5 text-[11px] tracking-[0.4em] uppercase"
            style={{
              ...sans,
              color: 'rgba(252,239,223,0.55)',
              fontWeight: 500,
            }}
          >
            A Quiet Way To See The World
          </span>
        </div>

        <Divider color="rgba(252,239,223,0.18)" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 py-16">
          <div>
            <p
              className="text-[11px] tracking-[0.4em] uppercase mb-6"
              style={{ ...sans, color: WA.sage, fontWeight: 500 }}
            >
              Contact
            </p>
            <p
              className="text-sm leading-[2]"
              style={{
                ...sans,
                color: 'rgba(252,239,223,0.78)',
                fontWeight: 300,
              }}
            >
              台北市信義區松仁路 28 號 12 樓
              <br />
              02 - 2345 - 6789
              <br />
              hello@corner-travel.tw
            </p>
          </div>
          <div>
            <p
              className="text-[11px] tracking-[0.4em] uppercase mb-6"
              style={{ ...sans, color: WA.sage, fontWeight: 500 }}
            >
              Office Hours
            </p>
            <p
              className="text-sm leading-[2]"
              style={{
                ...sans,
                color: 'rgba(252,239,223,0.78)',
                fontWeight: 300,
              }}
            >
              週一至週五 10:00 — 19:00
              <br />
              週六 11:00 — 17:00
              <br />
              週日休
            </p>
          </div>
          <div>
            <p
              className="text-[11px] tracking-[0.4em] uppercase mb-6"
              style={{ ...sans, color: WA.sage, fontWeight: 500 }}
            >
              Follow
            </p>
            <div className="flex flex-col gap-3">
              {['Instagram', 'YouTube', 'Facebook', 'Threads'].map((s) => (
                <button
                  key={s}
                  className="text-left text-sm transition-opacity hover:opacity-60"
                  style={{
                    ...sans,
                    color: 'rgba(252,239,223,0.78)',
                    fontWeight: 300,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Divider color="rgba(252,239,223,0.18)" />

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
          <p
            className="text-[10px] tracking-[0.32em] uppercase"
            style={{
              ...sans,
              color: 'rgba(252,239,223,0.5)',
              fontWeight: 500,
            }}
          >
            © 2026 Corner Travel  ·  A Venturo Brand
          </p>
          <p
            className="text-[10px] tracking-[0.32em] uppercase"
            style={{
              ...sans,
              color: 'rgba(252,239,223,0.5)',
              fontWeight: 500,
            }}
          >
            交觀甲 7654 號  ·  品保中 1234
          </p>
        </div>
      </div>
    </footer>
  );
}
