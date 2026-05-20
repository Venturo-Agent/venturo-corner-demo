'use client';

/**
 * Home — Hoshinoya Onsen landing view
 *
 * 結構（紙燈籠下的旅館迎賓感、不是書店書屋、不是工業 catalog）：
 *   1. Topbar：旅館招牌、燈籠掛旗
 *   2. Hero：直幅 4:5 掛軸圖（左）+ 旅館迎賓書道大字（右）
 *      - 右上小紙燈籠 SVG
 *      - scroll 時 hero 圖暈光增加（lamp glow opacity 隨 scrollY 提高）
 *      - 麻葉紋背景極淡
 *   3. 掌櫃序（innkeeper note）：木紋深色區、配紙燈籠分隔
 *   4. 本季客室（4 條 tour 直幅卡）：客室掛牌感
 *   5. 旅館主張（4 條、行式 + 紙紋）：湯 / 紙 / 木 / 墨 / 火
 *   6. CTA：玄關邀請（深色區 + 紙燈籠）
 *   7. Footer：旅館印章感、版權頁
 *
 * 紙燈籠感的關鍵：
 *   - 暖底（米紙暖）+ 深邊框（深木 / 漆黑）+ 黑字（墨字）
 *   - 直幅圖 4:5、像掛軸繪畫
 *   - 麻葉紋 + 紙紋背景（極淡）
 *   - 分隔用 LampDivider（細線中夾燈籠）
 *   - hover 用紙燈籠光暈擴散
 *   - 入場「拉開紙門」slide + fade
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  HOSHINO,
  LanternTag,
  SteamTitle,
  HoshinoButton,
  LanternLink,
  LanternMark,
  LampDivider,
  Hair,
  KanjiMark,
  PageMark,
  PhotoSeal,
  AsanohaPattern,
  PaperGrain,
  SteamOverlay,
  BRAND,
  CATEGORY_LABEL,
  kanji,
} from './shared';

const heroTour = tours[0];

// 旅館主張（湯 / 紙 / 木 / 墨 / 火）— 4 條像旅館的「家訓」
// 跟 tsutaya 的「本店主張」對比：書店「擇書原則」 → 這裡是「掌櫃心法」
const HOUSE_VALUES = [
  {
    n: 1,
    kanji: '湯',
    title: '一晚必有一池泉',
    body: '每一站的住宿必有溫泉。\n從京都的木桶風呂、到山林的露天岩湯、\n泡完湯回到客室、那是第一晚真正的開始。',
  },
  {
    n: 2,
    kanji: '紙',
    title: '紙門之內，皆是客',
    body: '我們的客室拉開紙門就是榻榻米。\n沒有冷冰冰的飯店走廊、\n從玄關脫鞋那刻起、你不是住客、你是「客人」。',
  },
  {
    n: 3,
    kanji: '木',
    title: '住的不是房、是家具',
    body: '所有住宿都親自過夜一晚。\n看的不是房間有多新、\n是木材有沒有年紀、家具有沒有被人撫摸過。',
  },
  {
    n: 4,
    kanji: '墨',
    title: '掌櫃隨身、不只送行',
    body: '中文掌櫃全程隨團。\n不是把你送到櫃台就走的領隊、\n是替你打點每一晚的人。',
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  // scroll-aware lamp glow：scroll 越深、hero 圖暈光越濃
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // 0 → 600px 之間從 0 → 1
      const intensity = Math.min(y / 600, 1);
      setGlowIntensity(intensity);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: HOSHINO.paper, color: HOSHINO.ink }}>
      {/* ─────────────── Topbar（旅館招牌） ─────────────── */}
      <HoshinoTopbar onHome={() => undefined} onSeeAll={onSeeAll} active="home" />

      {/* ─────────────── Hero（掛軸感） ─────────────── */}
      <section className="relative px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden">
        {/* 麻葉紋背景（極淡） */}
        <AsanohaPattern opacity={0.05} />
        <PaperGrain opacity={0.05} />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* 左：掛軸直幅圖（4:5） */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-6"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={heroTour.heroImage}
                  alt={heroTour.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* 湯氣 overlay（上下淡淡霧氣） */}
                <SteamOverlay position="both" intensity={0.55} />
                {/* 紙燈籠光暈（scroll 時越來越濃） */}
                <span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${HOSHINO.lamp}44 0%, transparent 60%)`,
                    opacity: 0.3 + glowIntensity * 0.5,
                  }}
                />
                {/* 細書道紙邊框 */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${HOSHINO.line}`,
                  }}
                />
              </div>
              <PhotoSeal n={1}>
                {heroTour.destination} · {heroTour.title}
              </PhotoSeal>
            </motion.div>

            {/* 右：掛軸書道大字 */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-6 md:pt-6 relative"
            >
              {/* 右上紙燈籠（hangs from top） */}
              <div className="absolute right-2 top-0 hidden md:block">
                <LanternMark size={24} />
              </div>

              <LanternTag chapter={kanji(1)}>Welcome</LanternTag>

              <h1
                className="font-display mt-14 leading-[1.4] text-[36px] md:text-[54px]"
                style={{
                  color: HOSHINO.ink,
                  whiteSpace: 'pre-line',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                }}
              >
                {BRAND.homeStatement}
              </h1>

              {/* 燈籠分隔 */}
              <div className="mt-14">
                <LampDivider />
              </div>

              <p
                className="mt-14 font-body text-sm md:text-base leading-[2.15]"
                style={{
                  color: HOSHINO.woodSoft,
                  whiteSpace: 'pre-line',
                  letterSpacing: '0.04em',
                }}
              >
                {BRAND.homeStatementSub}
              </p>

              <div className="mt-14 flex items-baseline gap-10 flex-wrap">
                <HoshinoButton onClick={onSeeAll}>
                  入內看客室
                </HoshinoButton>
                <LanternLink
                  onClick={() => onSelectTour(heroTour.slug)}
                >
                  先翻：{heroTour.title}
                </LanternLink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── 掌櫃序（innkeeper note） ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-28 md:py-36 overflow-hidden"
        style={{ background: HOSHINO.paperWarm }}
      >
        <PaperGrain opacity={0.08} />
        <AsanohaPattern opacity={0.04} />

        <div className="relative mx-auto max-w-4xl">
          <LampDivider />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="py-20 md:py-24 text-center"
          >
            <LanternTag chapter={kanji(2)} align="center">
              Innkeeper Note
            </LanternTag>

            <SteamTitle level={2} align="center" className="mt-12">
              關於這間旅館
            </SteamTitle>

            <p
              className="mt-16 mx-auto max-w-2xl font-display text-lg md:text-xl leading-[2.2]"
              style={{
                color: HOSHINO.ink,
                fontWeight: 500,
                whiteSpace: 'pre-line',
                letterSpacing: '0.08em',
              }}
            >
              {BRAND.innkeeperNote}
            </p>

            <div className="mt-16 flex justify-center">
              <div
                className="font-display text-xs"
                style={{
                  color: HOSHINO.woodSoft,
                  letterSpacing: '0.3em',
                  fontWeight: 500,
                }}
              >
                — 角落旅館 掌櫃
              </div>
            </div>
          </motion.div>

          <LampDivider />
        </div>
      </section>

      {/* ─────────────── 本季客室（4 條 tour） ─────────────── */}
      <section className="relative px-6 md:px-12 py-28 md:py-36 overflow-hidden">
        <AsanohaPattern opacity={0.04} />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-16 md:mb-20">
            <LanternTag chapter={kanji(3)}>This Season</LanternTag>
            <SteamTitle
              level={1}
              className="mt-10"
              subtitle="二〇二六年度、本店在簾子後備好四間客室、皆已親自過夜一晚。"
            >
              本季客室
            </SteamTitle>
          </div>

          <Hair />

          {/* 客室掛牌：4 卡橫向、卡片間有木紋細直線 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {tours.map((tour, i) => (
              <RoomCard
                key={tour.slug}
                tour={tour}
                index={i}
                isLast={i === tours.length - 1}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>

          <Hair />

          <div className="mt-12 flex items-baseline justify-between flex-wrap gap-4">
            <span
              className="font-display text-xs"
              style={{
                color: HOSHINO.woodSoft,
                letterSpacing: '0.2em',
                fontWeight: 500,
              }}
            >
              本季 共 {kanji(tours.length)} 間客室 · 客至為止
            </span>
            <LanternLink onClick={onSeeAll}>
              入內看所有客室
            </LanternLink>
          </div>
        </div>
      </section>

      {/* ─────────────── 旅館主張（湯紙木墨火） ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-28 md:py-36 overflow-hidden"
        style={{ background: HOSHINO.paperWarm }}
      >
        <PaperGrain opacity={0.07} />

        <div className="relative mx-auto max-w-4xl">
          <LanternTag chapter={kanji(4)}>House Principle</LanternTag>
          <SteamTitle
            level={2}
            className="mt-10"
            subtitle={BRAND.housePrinciple + '　— 掌櫃心法五字。'}
          >
            本店主張
          </SteamTitle>

          <div className="mt-16">
            <Hair />
            {HOUSE_VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                }}
                className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_1fr] gap-6 md:gap-12 py-12 md:py-14"
                style={{ borderBottom: `1px solid ${HOSHINO.lineSoft}` }}
              >
                {/* 大漢字 */}
                <div className="relative flex items-start justify-center">
                  <span
                    className="font-display block leading-none text-[44px] md:text-[64px]"
                    style={{
                      color: HOSHINO.lamp,
                      fontWeight: 500,
                    }}
                  >
                    {v.kanji}
                  </span>
                  {/* 大字下小編號 */}
                  <span
                    className="absolute -bottom-3 font-display text-[10px]"
                    style={{
                      color: HOSHINO.woodSoft,
                      letterSpacing: '0.25em',
                      fontWeight: 500,
                    }}
                  >
                    其{kanji(v.n)}
                  </span>
                </div>

                <div>
                  <h3
                    className="font-display text-lg md:text-2xl mb-5 leading-snug"
                    style={{
                      color: HOSHINO.ink,
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-[2.1]"
                    style={{
                      color: HOSHINO.woodSoft,
                      whiteSpace: 'pre-line',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA（玄關邀請、深木褐區） ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-28 md:py-36 overflow-hidden"
        style={{ background: HOSHINO.ink, color: HOSHINO.paper }}
      >
        {/* 麻葉紋（深底淡光） */}
        <AsanohaPattern opacity={0.06} color={HOSHINO.lamp} />

        {/* 中央紙燈籠光暈 */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${HOSHINO.lamp}55 0%, transparent 55%)`,
          }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-8">
            <LanternMark size={36} />
          </div>

          <p
            className="font-display text-xs"
            style={{
              color: HOSHINO.lampSoft,
              letterSpacing: '0.4em',
              fontWeight: 500,
            }}
          >
            第{kanji(5)}帖 · ENTRANCE
          </p>

          <h2
            className="font-display mt-10 leading-[1.5] text-3xl md:text-[42px]"
            style={{
              color: HOSHINO.paper,
              fontWeight: 500,
              letterSpacing: '0.08em',
            }}
          >
            把下一個假期，
            <br />
            交給一間旅館。
          </h2>

          <p
            className="mt-12 font-body text-sm md:text-base leading-[2.1]"
            style={{
              color: HOSHINO.lampSoft,
              letterSpacing: '0.05em',
            }}
          >
            掀開暖簾、脫下鞋、跟著掌櫃，
            <br />
            走進今年只剩四間客室的小旅館。
          </p>

          <div className="mt-16 flex justify-center">
            <button
              onClick={onSeeAll}
              className="group relative h-14 px-12 font-display text-sm transition-all hover:opacity-95"
              style={{
                background: HOSHINO.paper,
                color: HOSHINO.ink,
                letterSpacing: '0.25em',
                fontWeight: 500,
              }}
            >
              入內看客室
              {/* 紙燈籠光暈：hover 擴散 */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${HOSHINO.lamp}44 0%, transparent 70%)`,
                }}
              />
            </button>
          </div>
        </div>
      </section>

      <HoshinoFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Topbar — 旅館招牌（可在頁面間共用）
// 跟 tsutaya「角落書屋 · 蔦屋書屋系列」對比、這裡是「角落旅館 · 虹夕諾雅系列」+ 紙燈籠 SVG
// ─────────────────────────────────────────────────────

export function HoshinoTopbar({
  onHome,
  onSeeAll,
  active,
  rightLabel,
}: {
  onHome: () => void;
  onSeeAll: () => void;
  active: 'home' | 'rooms' | 'detail' | 'guide' | 'reserve';
  rightLabel?: string;
}) {
  const _ = active;
  void _;
  return (
    <header
      className="relative px-6 md:px-12 py-6 overflow-hidden"
      style={{
        borderBottom: `1px solid ${HOSHINO.line}`,
        background: HOSHINO.paperSoft,
      }}
    >
      <PaperGrain opacity={0.06} />
      <div className="relative mx-auto max-w-6xl flex items-baseline justify-between gap-6">
        <button
          onClick={onHome}
          className="flex items-center gap-5 transition-opacity hover:opacity-70"
        >
          <LanternMark size={18} />
          <span
            className="font-display text-base"
            style={{
              color: HOSHINO.ink,
              fontWeight: 500,
              letterSpacing: '0.18em',
            }}
          >
            {BRAND.marque}
          </span>
          <span
            aria-hidden
            className="hidden md:block w-px h-3"
            style={{ background: HOSHINO.line }}
          />
          <span
            className="hidden md:inline font-body text-xs"
            style={{
              color: HOSHINO.woodSoft,
              letterSpacing: '0.2em',
            }}
          >
            {BRAND.marqueZh} · {BRAND.marqueSub}
          </span>
        </button>
        <div className="flex items-baseline gap-8">
          <button
            onClick={onSeeAll}
            className="font-display text-xs transition-opacity hover:opacity-60"
            style={{
              color: HOSHINO.ink,
              letterSpacing: '0.2em',
              fontWeight: 500,
            }}
          >
            看本季客室
          </button>
          <span
            className="font-body text-xs hidden md:inline"
            style={{
              color: HOSHINO.inkFaint,
              letterSpacing: '0.2em',
            }}
          >
            {rightLabel ?? BRAND.established}
          </span>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────
// RoomCard — 客室掛牌卡（深木邊 + 直幅圖 + 漢字編號）
//
// 跟 tsutaya BookshelfCard 對比：
//   蔦屋是書架立卡（圖 3:4 直幅、書脊細直線分隔）
//   這裡是客室掛牌（圖 3:4 直幅、客室編號漢字「客室 一號」+ 深木紋分隔）
//   hover 時整張卡有紙燈籠光暈擴散
// ─────────────────────────────────────────────────────

function RoomCard({
  tour,
  index,
  isLast,
  onClick,
}: {
  tour: Tour;
  index: number;
  isLast: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative text-left p-6 md:p-8 transition-all"
      style={{
        // 右側細木紋直線（最後一張不顯示）
        borderRight: isLast ? 'none' : `1px solid ${HOSHINO.lineSoft}`,
      }}
    >
      {/* hover 紙燈籠光暈 */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 35%, ${HOSHINO.lamp}26 0%, transparent 70%)`,
        }}
      />

      {/* 卡片頂端：客室漢字編號 + 類別 */}
      <div className="relative flex items-baseline justify-between mb-6">
        <KanjiMark n={index + 1} />
        <span
          className="font-body text-[10px]"
          style={{
            color: HOSHINO.inkFaint,
            letterSpacing: '0.2em',
          }}
        >
          {CATEGORY_LABEL[tour.category]}
        </span>
      </div>

      {/* 直幅掛軸圖 3:4 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden mb-7">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-all duration-1000 group-hover:scale-[1.03]"
        />
        {/* 湯氣 overlay */}
        <SteamOverlay position="bottom" intensity={0.5} />
        {/* hover 暈光增加 */}
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${HOSHINO.lamp}33 0%, transparent 65%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ boxShadow: `inset 0 0 0 1px ${HOSHINO.line}` }}
        />
      </div>

      {/* 客室名（書道感） */}
      <h3
        className="font-display text-base md:text-lg leading-[1.45] mb-4"
        style={{
          color: HOSHINO.ink,
          fontWeight: 500,
          letterSpacing: '0.04em',
        }}
      >
        <span className="inline border-b border-transparent transition-colors duration-700 group-hover:border-current pb-[2px]">
          {tour.title}
        </span>
      </h3>

      {/* 副標 */}
      <p
        className="font-body text-xs leading-[2] mb-7 line-clamp-2"
        style={{
          color: HOSHINO.woodSoft,
          letterSpacing: '0.04em',
        }}
      >
        {tour.subtitle}
      </p>

      {/* 細線 + 規格 + 價格 */}
      <div
        className="relative pt-5 flex items-baseline justify-between"
        style={{ borderTop: `1px solid ${HOSHINO.lineSoft}` }}
      >
        <span
          className="font-display text-[10px]"
          style={{
            color: HOSHINO.woodSoft,
            letterSpacing: '0.18em',
            fontWeight: 500,
          }}
        >
          {tour.duration}
        </span>
        <div className="text-right">
          <span
            className="font-display text-[10px] block"
            style={{
              color: HOSHINO.inkFaint,
              letterSpacing: '0.3em',
              fontWeight: 500,
            }}
          >
            一位
          </span>
          <span
            className="font-display text-sm mt-1 block"
            style={{
              color: HOSHINO.ink,
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            {formatPrice(tour.priceFrom)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────
// Footer — 旅館印章感（版權頁）
//
// 跟 tsutaya 對比：蔦屋是書末版權頁（出版資訊 / 書屋地址 / 開店時間）
//                這裡是旅館印章感（旅館招牌 / 旅館地址 / 大廳時間）
//                配「角落旅館 印章」感、版權頁中央有印章 SVG 框
// ─────────────────────────────────────────────────────

export function HoshinoFooter() {
  return (
    <footer
      className="relative px-6 md:px-12 pt-28 pb-12 overflow-hidden"
      style={{
        background: HOSHINO.paper,
        borderTop: `1px solid ${HOSHINO.line}`,
        color: HOSHINO.ink,
      }}
    >
      <PaperGrain opacity={0.06} />

      <div className="relative mx-auto max-w-6xl">
        {/* 版權頁裝飾燈籠 divider */}
        <div className="mb-16">
          <LampDivider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* 左：旅館招牌 */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <LanternMark size={22} />
              <p
                className="font-display text-xl"
                style={{
                  color: HOSHINO.ink,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                }}
              >
                {BRAND.marque}
              </p>
            </div>
            <p
              className="font-body text-sm mt-3"
              style={{
                color: HOSHINO.woodSoft,
                letterSpacing: '0.15em',
              }}
            >
              {BRAND.marqueZh} · {BRAND.marqueSub}
            </p>
            <p
              className="mt-10 font-body text-xs leading-[2.1] max-w-sm"
              style={{
                color: HOSHINO.woodSoft,
                letterSpacing: '0.04em',
              }}
            >
              漫途旅遊旗下品牌。
              <br />
              交觀甲 7654 號 / 品保中 1234。
              <br />
              {BRAND.established}。
            </p>
          </div>

          {/* 中：旅館地址 */}
          <div className="md:col-span-4">
            <p
              className="font-display text-xs mb-5 pb-3"
              style={{
                color: HOSHINO.wood,
                letterSpacing: '0.25em',
                borderBottom: `1px solid ${HOSHINO.line}`,
                fontWeight: 500,
              }}
            >
              旅館玄關
            </p>
            <p
              className="font-body text-xs leading-[2.1]"
              style={{ color: HOSHINO.ink, letterSpacing: '0.04em' }}
            >
              臺北市信義區
              <br />
              松仁路二十八號十二樓
              <br />
              02-2345-6789
              <br />
              hello@corner-travel.tw
            </p>
          </div>

          {/* 右：大廳時間 */}
          <div className="md:col-span-3">
            <p
              className="font-display text-xs mb-5 pb-3"
              style={{
                color: HOSHINO.wood,
                letterSpacing: '0.25em',
                borderBottom: `1px solid ${HOSHINO.line}`,
                fontWeight: 500,
              }}
            >
              大廳時間
            </p>
            <p
              className="font-body text-xs leading-[2.1]"
              style={{ color: HOSHINO.ink, letterSpacing: '0.04em' }}
            >
              週一至週五
              <br />
              10:00 – 19:00
              <br />
              週六 11:00 – 17:00
              <br />
              週日 休館
            </p>
          </div>
        </div>

        <Hair />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p
            className="font-body text-[10px]"
            style={{
              color: HOSHINO.inkFaint,
              letterSpacing: '0.2em',
            }}
          >
            © 2026 Corner Travel · A Venturo Brand
          </p>
          <PageMark n={1} total={1} />
        </div>
      </div>
    </footer>
  );
}
