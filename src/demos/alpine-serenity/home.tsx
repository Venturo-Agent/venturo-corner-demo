'use client';

/**
 * Home — landing view（阿爾卑斯靜謐）
 *
 * 跟 mediterranean-sun home 的差異：
 *   1. Hero 用紐西蘭雪山圖（newzealand-adventure heroImage）、加 desaturate filter
 *   2. Hero 排版改為左對齊 + 大量留白、不放副標兩排居中
 *   3. 加「座標 / 海拔 / 緯度」冷數據條
 *   4. Featured 4 卡改為「橫排 stagger」、不是 2x2 grid
 *   5. Values 用「左座標 + 右文字」垂直 stack、不是 2 欄
 *   6. CTA 區極簡、只一條線 + 標題 + button
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Mountain,
  Compass,
  Snowflake,
  Wind,
} from 'lucide-react';
import { tours, type Tour, findTourBySlug } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  ALPINE,
  PeakLabel,
  AlpineButton,
  HairLine,
  CATEGORY_LABEL,
  SerifTitle,
} from './shared';

// hero 用雪山照、跟「雪線之上」vibe 對齊
const heroTour = findTourBySlug('newzealand-adventure') ?? tours[0];

// 四個品牌價值、文案重寫、扣回「冷靜、極簡、雪線」氣質
const VALUES = [
  {
    n: 1,
    coord: 'N 01',
    icon: Mountain,
    title: '每團上限 14 人',
    body: '人數嚴格上限。我們相信山的安靜、不能被一支三十人的隊伍打斷。',
  },
  {
    n: 2,
    coord: 'N 02',
    icon: Compass,
    title: '住宿親自踏過',
    body: '從歐陸山屋、北海道民宿、到南島玻璃屋——每一間都是團隊親自住過、確認過、才放進名單。',
  },
  {
    n: 3,
    coord: 'N 03',
    icon: Snowflake,
    title: '一天兩到三件事',
    body: '不塞滿景點。一天兩到三個主要行程、留出讓你呼吸的空白。深度不靠數量、靠停留時間。',
  },
  {
    n: 4,
    coord: 'N 04',
    icon: Wind,
    title: '中文領隊全程隨團',
    body: '所有出團配備經驗五年以上的中文領隊。沒有自由行的孤獨、也沒有大團的吵雜。',
  },
];

const EASE = [0.16, 1, 0.3, 1] as const; // 比地中海更慢更冷的 ease

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div style={{ background: ALPINE.snow, color: ALPINE.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative w-full" style={{ background: ALPINE.night }}>
        <div className="relative h-[94vh] min-h-[680px] w-full overflow-hidden">
          <Image
            src={heroTour.heroImage}
            alt={heroTour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'grayscale(0.35) brightness(0.78) contrast(1.05)' }}
          />
          {/* 冷藍 overlay、不是地中海的暖夜藍 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(26,36,51,0.55) 0%, rgba(26,36,51,0.20) 38%, rgba(26,36,51,0.78) 100%)',
            }}
          />

          {/* 邊框 — 雪線之上、極簡的外框感 */}
          <div
            aria-hidden
            className="absolute inset-6 md:inset-12 pointer-events-none"
            style={{ border: `1px solid rgba(248,249,251,0.18)` }}
          />

          <div className="relative h-full mx-auto max-w-7xl px-10 md:px-20 flex flex-col">
            {/* Top bar */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="pt-16 md:pt-20 flex items-center justify-between"
            >
              <span
                className="font-display text-[10px] tracking-[0.6em] uppercase"
                style={{ color: ALPINE.snow, fontWeight: 400 }}
              >
                Corner Travel
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase hidden md:inline"
                style={{ color: 'rgba(248,249,251,0.6)' }}
              >
                Est. 2018  ·  Taipei
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
              className="mt-auto pb-20 md:pb-24 max-w-4xl"
            >
              <span
                className="font-display text-[10px] tracking-[0.6em] uppercase block mb-10"
                style={{ color: 'rgba(248,249,251,0.75)', fontWeight: 400 }}
              >
                Volume Three   ·   Alpine Serenity
              </span>

              <h1
                className="font-display leading-[1.02] text-[44px] md:text-[88px]"
                style={{ color: ALPINE.snow, fontWeight: 300, letterSpacing: '-0.01em' }}
              >
                把腳步
                <br />
                放回安靜
              </h1>

              <p
                className="mt-10 max-w-md text-[15px] leading-[2.1]"
                style={{ color: 'rgba(248,249,251,0.82)' }}
              >
                我們不做趕場式的觀光、也不做塞滿景點的行程。
                一年只出 24 團、每團不超過 14 人、住宿全部親自踏過。
              </p>

              <div className="mt-14 flex items-center gap-10">
                <AlpineButton
                  size="lg"
                  variant="snow"
                  onClick={onSeeAll}
                >
                  看所有行程
                </AlpineButton>
                <button
                  onClick={() => onSelectTour(heroTour.slug)}
                  className="font-display text-[10px] tracking-[0.45em] uppercase transition-opacity hover:opacity-70 flex items-center gap-4"
                  style={{ color: ALPINE.snow, fontWeight: 400 }}
                >
                  先看精選
                  <ArrowRight size={13} strokeWidth={1.2} />
                </button>
              </div>
            </motion.div>

            {/* 座標條（hero 底部、冷數據感）*/}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.4 }}
              className="absolute bottom-12 md:bottom-16 left-10 md:left-20 right-10 md:right-20 flex items-end justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="block w-px h-12"
                  style={{ background: 'rgba(248,249,251,0.4)' }}
                />
                <div className="flex flex-col gap-1">
                  <span
                    className="font-display text-[9px] tracking-[0.5em] uppercase"
                    style={{ color: 'rgba(248,249,251,0.55)', fontWeight: 400 }}
                  >
                    Scroll
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-[0.3em]"
                    style={{ color: 'rgba(248,249,251,0.85)' }}
                  >
                    01 / 05
                  </span>
                </div>
              </div>

              <div className="hidden md:flex items-end gap-12">
                <HeroStat label="路線" value="04" />
                <HeroStat label="團員上限" value="14" />
                <HeroStat label="出團 / 年" value="24" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Philosophy statement ─────────────── */}
      <section className="px-10 md:px-20 py-32 md:py-44">
        <div className="mx-auto max-w-5xl">
          <PeakLabel>Our Philosophy</PeakLabel>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20"
          >
            <div className="md:col-span-7">
              <SerifTitle
                as="h2"
                className="text-[32px] md:text-[52px] leading-[1.25]"
              >
                走得快、看得多
                <br />
                不一定是好的旅行。
                <br />
                我們選擇慢一點、
                <br />
                住久一點、
                <br />
                把每個地方
                <br />
                聽清楚。
              </SerifTitle>
            </div>

            <div className="md:col-span-5 md:pt-8">
              <div
                className="h-px w-12 mb-8"
                style={{ background: ALPINE.stone }}
              />
              <p
                className="text-[15px] leading-[2.2]"
                style={{ color: ALPINE.inkSoft }}
              >
                角落旅行社成立於 2018 年、以「全程不超過 14 人」為核心信念。
                我們挑剔住宿、堅持小團、領隊全程隨團。
              </p>
              <p
                className="mt-8 text-[15px] leading-[2.2]"
                style={{ color: ALPINE.inkSoft }}
              >
                帶你去看的、是那種看完之後、會在生活裡安靜很久的風景。
                不是 IG 打卡完就忘的那種。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Featured Journeys（橫排 stagger）─────────────── */}
      <section
        className="px-10 md:px-20 pt-20 pb-32 md:pb-44"
        style={{ borderTop: `1px solid ${ALPINE.line}` }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-24">
            <div>
              <PeakLabel>Featured Journeys</PeakLabel>
              <SerifTitle
                as="h2"
                className="text-[36px] md:text-[60px] mt-10"
              >
                2026 年度
                <br />
                四條深度路線
              </SerifTitle>
            </div>
            <button
              onClick={onSeeAll}
              className="font-display text-[10px] tracking-[0.45em] uppercase transition-opacity hover:opacity-70 flex items-center gap-4 self-start md:self-end"
              style={{ color: ALPINE.night, fontWeight: 400 }}
            >
              查看全部行程
              <ArrowRight size={13} strokeWidth={1.2} />
            </button>
          </div>

          {/* 不對稱 grid：第 1、3 條偏左、第 2、4 條偏右下、避免地中海的 2x2 對稱感 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-16 gap-y-24">
            {tours.map((tour, i) => {
              const span = i % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5 md:col-start-8';
              const offset = i === 1 || i === 3 ? 'md:mt-24' : '';
              return (
                <div key={tour.slug} className={`${span} ${offset}`}>
                  <FeaturedCard
                    tour={tour}
                    index={i}
                    onClick={() => onSelectTour(tour.slug)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── Values（冷數據條）─────────────── */}
      <section
        className="px-10 md:px-20 py-32 md:py-44"
        style={{ background: ALPINE.snowDeep }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-24">
            <PeakLabel>Why Corner</PeakLabel>
            <SerifTitle
              as="h2"
              className="text-[36px] md:text-[56px] mt-10 max-w-3xl"
            >
              為什麼選擇我們
            </SerifTitle>
          </div>

          {/* 4 條 value、垂直 stack、每條一條 hairline 分隔 */}
          <div>
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.1,
                    ease: EASE,
                  }}
                  className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
                  style={{
                    borderTop: `1px solid ${ALPINE.line}`,
                    borderBottom:
                      i === VALUES.length - 1
                        ? `1px solid ${ALPINE.line}`
                        : 'none',
                  }}
                >
                  <div className="md:col-span-2 flex items-center gap-4">
                    <span
                      className="font-mono text-[11px] tracking-[0.3em]"
                      style={{ color: ALPINE.stone }}
                    >
                      {v.coord}
                    </span>
                  </div>

                  <div className="md:col-span-1">
                    <Icon
                      size={20}
                      strokeWidth={1.2}
                      style={{ color: ALPINE.stone }}
                    />
                  </div>

                  <div className="md:col-span-4">
                    <SerifTitle
                      as="h3"
                      className="text-2xl md:text-[28px] leading-snug"
                    >
                      {v.title}
                    </SerifTitle>
                  </div>

                  <div className="md:col-span-5">
                    <p
                      className="text-[15px] leading-[2.1]"
                      style={{ color: ALPINE.inkSoft }}
                    >
                      {v.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA（極簡、一條線 + 標題 + 一顆按鈕）─────────────── */}
      <section className="px-10 md:px-20 py-40 md:py-56">
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="block w-px h-20 mx-auto mb-16"
            style={{ background: ALPINE.stone }}
          />
          <PeakLabel align="center">Begin Your Journey</PeakLabel>
          <SerifTitle
            as="h2"
            className="text-[32px] md:text-[52px] mt-12 leading-[1.3]"
          >
            下一個角落、
            <br />
            也許正等你拜訪。
          </SerifTitle>
          <div className="mt-16">
            <AlpineButton size="lg" onClick={onSeeAll}>
              探索全部行程
            </AlpineButton>
          </div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Hero stat（雪山小數據條）
// ─────────────────────────────────────────────────────

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="font-display text-[9px] tracking-[0.5em] uppercase"
        style={{ color: 'rgba(248,249,251,0.55)', fontWeight: 400 }}
      >
        {label}
      </span>
      <span
        className="font-mono text-2xl tracking-wider"
        style={{ color: ALPINE.snow, fontWeight: 300 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Featured card
// 跟 mediterranean Featured 對比：
//   - aspect 改 5:6 偏長條（地中海 4:5）
//   - hover 不放大、只變線條色 + tracking
//   - 卡片上方放座標 / 編號、不放分類膠囊
//   - 文字排版改為「圖 → 座標條 → 標題 → 描述 → meta line」
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 1.0,
        delay: (index % 2) * 0.12,
        ease: EASE,
      }}
      className="group text-left flex flex-col w-full"
    >
      <div className="relative aspect-[5/6] w-full overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ filter: 'grayscale(0.15) brightness(0.95)' }}
        />
        {/* 細邊框、不放分類膠囊 */}
        <div
          aria-hidden
          className="absolute inset-4 pointer-events-none transition-colors group-hover:opacity-100 opacity-0"
          style={{ border: `1px solid rgba(248,249,251,0.45)` }}
        />
      </div>

      <div className="pt-10">
        {/* 座標條：N XX / 04   ·   destination   ·   category */}
        <div className="flex items-center gap-6 mb-6">
          <span
            className="font-mono text-[11px] tracking-[0.3em]"
            style={{ color: ALPINE.stone }}
          >
            N {String(index + 1).padStart(2, '0')} / 04
          </span>
          <span
            aria-hidden
            className="block w-6 h-px"
            style={{ background: ALPINE.line }}
          />
          <span
            className="font-display text-[10px] tracking-[0.4em] uppercase"
            style={{ color: ALPINE.stone, fontWeight: 400 }}
          >
            {tour.destination}
          </span>
        </div>

        <SerifTitle
          as="h3"
          className="text-[28px] md:text-[36px] mb-6 transition-all group-hover:underline underline-offset-[12px] decoration-1"
        >
          {tour.title}
        </SerifTitle>

        <p
          className="text-[15px] leading-[1.95] mb-10 max-w-md"
          style={{ color: ALPINE.inkSoft }}
        >
          {tour.subtitle}
        </p>

        <HairLine />

        <div className="pt-6 flex items-baseline justify-between">
          <div className="flex items-center gap-6">
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: ALPINE.inkFaint }}
            >
              {tour.duration}
            </span>
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: ALPINE.inkFaint }}
            >
              {CATEGORY_LABEL[tour.category]}
            </span>
          </div>
          <div className="text-right">
            <span
              className="font-display text-[9px] tracking-[0.4em] uppercase block mb-1"
              style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
            >
              From
            </span>
            <span
              className="font-mono text-[18px] tracking-wider"
              style={{ color: ALPINE.ink, fontWeight: 300 }}
            >
              {formatPrice(tour.priceFrom)}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────
// Footer
// 跟 mediterranean footer 對比：
//   - 改為雪白底（不是夜黑底）
//   - 三欄改為左大右小
//   - 多一條座標尾巴
// ─────────────────────────────────────────────────────

export function CornerFooter() {
  return (
    <footer
      className="px-10 md:px-20 pt-24 pb-12"
      style={{
        background: ALPINE.snow,
        color: ALPINE.ink,
        borderTop: `1px solid ${ALPINE.line}`,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <span
              className="font-display text-[10px] tracking-[0.5em] uppercase block mb-6"
              style={{ color: ALPINE.stone, fontWeight: 400 }}
            >
              Corner Travel
            </span>
            <SerifTitle as="h3" className="text-3xl mb-8">
              角落旅行社
            </SerifTitle>
            <p
              className="text-sm leading-[2]"
              style={{ color: ALPINE.inkSoft }}
            >
              漫途旅遊旗下品牌
              <br />
              交觀甲 7654 號  ·  品保中 1234
            </p>
          </div>

          <div className="md:col-span-3">
            <span
              className="font-display text-[10px] tracking-[0.5em] uppercase block mb-6"
              style={{ color: ALPINE.stone, fontWeight: 400 }}
            >
              Contact
            </span>
            <p
              className="text-sm leading-[2]"
              style={{ color: ALPINE.inkSoft }}
            >
              台北市信義區
              <br />
              松仁路 28 號 12 樓
              <br />
              02-2345-6789
              <br />
              hello@corner-travel.tw
            </p>
          </div>

          <div className="md:col-span-2">
            <span
              className="font-display text-[10px] tracking-[0.5em] uppercase block mb-6"
              style={{ color: ALPINE.stone, fontWeight: 400 }}
            >
              Hours
            </span>
            <p
              className="text-sm leading-[2]"
              style={{ color: ALPINE.inkSoft }}
            >
              一至五  10–19
              <br />
              六  11–17
              <br />
              日  休
            </p>
          </div>

          <div className="md:col-span-2">
            <span
              className="font-display text-[10px] tracking-[0.5em] uppercase block mb-6"
              style={{ color: ALPINE.stone, fontWeight: 400 }}
            >
              Coordinates
            </span>
            <p
              className="font-mono text-[11px] leading-[2] tracking-wider"
              style={{ color: ALPINE.inkSoft }}
            >
              25.0330° N
              <br />
              121.5654° E
              <br />
              Taipei
            </p>
          </div>
        </div>

        <HairLine />

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: ALPINE.inkFaint }}
          >
            © 2026 Corner Travel  ·  A Venturo Brand
          </p>
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: ALPINE.inkFaint }}
          >
            Designed in Taipei  ·  Curated Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
