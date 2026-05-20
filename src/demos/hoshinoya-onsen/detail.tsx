'use client';

/**
 * Detail — 客室詳情頁（旅館客室介紹手冊感）
 *
 * 結構（像翻開一本旅館手冊）：
 *   1. Topbar
 *   2. 掛軸 hero：直幅 4:5 圖（左）+ 客室名 + tagline + 掌櫃按（右）
 *   3. 客室規格 strip：四欄（帖數 / 限員 / 出帖期 / 預約價）
 *   4. 第一帖 序：story 段落（雙欄、旅館手冊感）+ 本客室精選
 *   5. 章節目錄（Highlights）：第幾節 + 章名 + 頁碼
 *   6. 圖版插頁（Gallery）：規則 grid + 圖說
 *   7. 客室規範（Inclusions / Exclusions）：附錄條目
 *   8. 出帖期（Departure dates）：客室卡感
 *   9. 玄關（CTA）：旅館邀請
 *  10. Footer
 *
 * 跟 tsutaya detail 的差異：
 *   - 蔦屋是書本內頁、ArchiveTag 用「卷 一 ─ 序」線裝書感
 *   - 這裡是旅館手冊、LanternTag 用「第一帖 ─ 序」+ 紙燈籠掛旗
 *   - 蔦屋附錄一 / 附錄二、深咖標題
 *   - 這裡規範一 / 規範二、深木 + 燈芯紅褐標題
 *   - 蔦屋日期卡是「第幾版」書店感
 *   - 這裡日期卡是「第幾帖」溫泉旅館感、有紙燈籠 SVG hover 暈光
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  HOSHINO,
  LanternTag,
  SteamTitle,
  HoshinoButton,
  LampDivider,
  LanternMark,
  PhotoSeal,
  AsanohaPattern,
  PaperGrain,
  SteamOverlay,
  CATEGORY_LABEL,
  kanji,
} from './shared';
import { HoshinoFooter } from './home';

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
              回到客室目錄
            </span>
          </button>
          <span
            className="font-body text-xs"
            style={{
              color: HOSHINO.inkFaint,
              letterSpacing: '0.2em',
            }}
          >
            細看客室 / Room Detail
          </span>
        </div>
      </header>

      {/* ─────────────── Hero 掛軸 ─────────────── */}
      <section className="relative px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden">
        <AsanohaPattern opacity={0.05} />
        <PaperGrain opacity={0.05} />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* 左：直幅掛軸圖 */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-6"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <SteamOverlay position="both" intensity={0.55} />
                {/* 紙燈籠光暈 */}
                <span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 35%, ${HOSHINO.lamp}33 0%, transparent 60%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ boxShadow: `inset 0 0 0 1px ${HOSHINO.line}` }}
                />
              </div>
              <PhotoSeal n={1}>
                {tour.destination} · 客室掛軸
              </PhotoSeal>
            </motion.div>

            {/* 右：客室名 + tagline + 掌櫃按 */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-6 md:pt-6 relative"
            >
              <div className="absolute right-2 top-0 hidden md:block">
                <LanternMark size={22} />
              </div>

              <LanternTag chapter="序">{CATEGORY_LABEL[tour.category]}</LanternTag>

              <h1
                className="font-display mt-10 leading-[1.3] text-[32px] md:text-[52px]"
                style={{
                  color: HOSHINO.ink,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                }}
              >
                {tour.title}
              </h1>

              <p
                className="mt-6 font-body text-base md:text-lg leading-[2]"
                style={{
                  color: HOSHINO.woodSoft,
                  letterSpacing: '0.04em',
                }}
              >
                {tour.tagline}
              </p>

              {/* 燈籠分隔 */}
              <div className="mt-14">
                <LampDivider />
              </div>

              <div className="mt-12">
                <p
                  className="font-display text-xs mb-5"
                  style={{
                    color: HOSHINO.wood,
                    letterSpacing: '0.3em',
                    fontWeight: 500,
                  }}
                >
                  掌櫃按
                </p>
                <p
                  className="font-body text-sm leading-[2.1]"
                  style={{
                    color: HOSHINO.woodSoft,
                    letterSpacing: '0.04em',
                  }}
                >
                  本客室共 {kanji(tour.itinerary.length)} 帖、
                  歷時 {tour.duration}、
                  收錄 {kanji(tour.highlights.length)} 處本店精挑段落。
                  <br />
                  從玄關到玄關、共 {kanji(tour.itinerary.length)} 個白晝與夜。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── 客室規格 strip ─────────────── */}
      <section className="relative px-6 md:px-12 pb-20 md:pb-24 overflow-hidden">
        <PaperGrain opacity={0.05} />

        <div className="relative mx-auto max-w-6xl">
          <LampDivider />
          <div className="grid grid-cols-2 md:grid-cols-4">
            <SpecCell label="帖數" value={tour.duration} first />
            <SpecCell
              label="限員"
              value={`${tour.groupSize.min}–${tour.groupSize.max} 位客人`}
            />
            <SpecCell
              label="出帖期"
              value={`${kanji(tour.departureDates.length)} 個梯次`}
            />
            <SpecCell
              label="一位"
              value={formatPrice(tour.priceFrom)}
              last
            />
          </div>
          <LampDivider />
        </div>
      </section>

      {/* ─────────────── 第一帖 序（Story） ─────────────── */}
      <section className="relative px-6 md:px-12 py-28 md:py-32 overflow-hidden">
        <AsanohaPattern opacity={0.04} />

        <div className="relative mx-auto max-w-4xl">
          <LanternTag chapter={kanji(1)}>The Preface</LanternTag>
          <SteamTitle level={2} className="mt-10">
            這間客室關於什麼
          </SteamTitle>

          {/* 雙欄手冊 */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <p
              className="font-body text-sm md:text-[15px] leading-[2.2]"
              style={{
                color: HOSHINO.woodSoft,
                letterSpacing: '0.04em',
              }}
            >
              {tour.story}
            </p>
            <div>
              <p
                className="font-display text-xs mb-6"
                style={{
                  color: HOSHINO.wood,
                  letterSpacing: '0.3em',
                  fontWeight: 500,
                }}
              >
                本客室精選
              </p>
              <div>
                {tour.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-5 py-4"
                    style={{
                      borderBottom:
                        i === tour.features.length - 1
                          ? 'none'
                          : `1px solid ${HOSHINO.lineSoft}`,
                    }}
                  >
                    <span
                      className="font-display text-[11px] shrink-0 w-12"
                      style={{
                        color: HOSHINO.lamp,
                        letterSpacing: '0.2em',
                        fontWeight: 500,
                      }}
                    >
                      其{kanji(i + 1)}
                    </span>
                    <span
                      className="font-body text-sm leading-[1.85]"
                      style={{
                        color: HOSHINO.ink,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 第二帖 章節目錄（Highlights） ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-28 md:py-32 overflow-hidden"
        style={{ background: HOSHINO.paperWarm }}
      >
        <PaperGrain opacity={0.07} />

        <div className="relative mx-auto max-w-4xl">
          <LanternTag chapter={kanji(2)}>Highlights</LanternTag>
          <SteamTitle
            level={2}
            className="mt-10"
            subtitle="掌櫃親自過夜一晚之後、特別在這幾節下了標籤。"
          >
            本客室精彩
          </SteamTitle>

          <div className="mt-16">
            <LampDivider />
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                }}
                className="grid grid-cols-[64px_1fr_50px] md:grid-cols-[88px_1fr_70px] gap-6 py-8"
                style={{ borderBottom: `1px solid ${HOSHINO.lineSoft}` }}
              >
                <span
                  className="font-display text-sm"
                  style={{
                    color: HOSHINO.wood,
                    letterSpacing: '0.18em',
                    paddingTop: 4,
                    fontWeight: 500,
                  }}
                >
                  第{kanji(i + 1)}節
                </span>
                <p
                  className="font-display text-base md:text-lg leading-[1.7]"
                  style={{
                    color: HOSHINO.ink,
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  {h}
                </p>
                <span
                  className="font-display text-[10px] text-right"
                  style={{
                    color: HOSHINO.inkFaint,
                    letterSpacing: '0.2em',
                    paddingTop: 6,
                    fontWeight: 500,
                  }}
                >
                  頁{kanji((i + 1) * 2)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 第三帖 圖版插頁（Gallery） ─────────────── */}
      <section className="relative px-6 md:px-12 py-28 md:py-32 overflow-hidden">
        <AsanohaPattern opacity={0.04} />

        <div className="relative mx-auto max-w-6xl">
          <LanternTag chapter={kanji(3)}>Plates</LanternTag>
          <SteamTitle
            level={2}
            className="mt-10"
            subtitle="夾在客室手冊裡的四張掛軸。"
          >
            旅程掛軸
          </SteamTitle>

          {/* 圖版：規則 2×2 + 圖說 */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {tour.galleryImages.slice(0, 4).map((src, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                }}
                className="block group"
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${tour.title} 掛軸 ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-all duration-1000 group-hover:scale-[1.02]"
                  />
                  <SteamOverlay position="bottom" intensity={0.4} />
                  {/* hover 紙燈籠光暈 */}
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
                    style={{
                      boxShadow: `inset 0 0 0 1px ${HOSHINO.line}`,
                    }}
                  />
                </div>
                <PhotoSeal n={i + 1}>
                  {tour.destination} · 掛軸{kanji(i + 1)}
                </PhotoSeal>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 第四帖 客室規範（Inclusions / Exclusions） ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-28 md:py-32 overflow-hidden"
        style={{ background: HOSHINO.wood, color: HOSHINO.paper }}
      >
        <AsanohaPattern opacity={0.06} color={HOSHINO.lamp} />
        <PaperGrain opacity={0.08} />

        <div className="relative mx-auto max-w-4xl">
          <LanternTagDark chapter={kanji(4)}>House Rules</LanternTagDark>
          <h2
            className="font-display mt-10 leading-[1.3] text-2xl md:text-[34px]"
            style={{
              color: HOSHINO.paper,
              fontWeight: 500,
              letterSpacing: '0.06em',
            }}
          >
            客室規範
          </h2>
          <p
            className="mt-6 font-body text-sm md:text-base leading-[2.05]"
            style={{
              color: HOSHINO.lampSoft,
              letterSpacing: '0.04em',
            }}
          >
            掌櫃已備好、與另計於客室之外的內容。
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 規範一：客室已備 */}
            <div>
              <p
                className="font-display text-xs mb-6 pb-3"
                style={{
                  color: HOSHINO.lamp,
                  letterSpacing: '0.3em',
                  borderBottom: `1px solid ${HOSHINO.lamp}`,
                  fontWeight: 500,
                }}
              >
                規範一 · 客室已備
              </p>
              <div>
                {tour.inclusions.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[36px_1fr] gap-4 py-4"
                    style={{
                      borderBottom: `1px solid ${HOSHINO.lampDeep}66`,
                    }}
                  >
                    <span
                      className="font-display text-xs"
                      style={{
                        color: HOSHINO.lamp,
                        letterSpacing: '0.18em',
                        paddingTop: 4,
                        fontWeight: 500,
                      }}
                    >
                      {kanji(i + 1)}
                    </span>
                    <span
                      className="font-body text-sm leading-[1.95]"
                      style={{
                        color: HOSHINO.paper,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 規範二：客室之外 */}
            <div>
              <p
                className="font-display text-xs mb-6 pb-3"
                style={{
                  color: HOSHINO.lampSoft,
                  letterSpacing: '0.3em',
                  borderBottom: `1px solid ${HOSHINO.lampSoft}`,
                  fontWeight: 500,
                }}
              >
                規範二 · 客室之外
              </p>
              <div>
                {tour.exclusions.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[36px_1fr] gap-4 py-4"
                    style={{
                      borderBottom: `1px solid ${HOSHINO.lampDeep}66`,
                    }}
                  >
                    <span
                      className="font-display text-xs"
                      style={{
                        color: HOSHINO.lampSoft,
                        letterSpacing: '0.18em',
                        paddingTop: 4,
                        fontWeight: 500,
                      }}
                    >
                      {kanji(i + 1)}
                    </span>
                    <span
                      className="font-body text-sm leading-[1.95]"
                      style={{
                        color: HOSHINO.lampSoft,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 第五帖 出帖期（Departure dates） ─────────────── */}
      <section className="relative px-6 md:px-12 py-28 md:py-32 overflow-hidden">
        <AsanohaPattern opacity={0.04} />

        <div className="relative mx-auto max-w-5xl">
          <LanternTag chapter={kanji(5)}>Open Dates</LanternTag>
          <SteamTitle
            level={2}
            className="mt-10"
            subtitle="掛軸選一張、掌櫃替你備好那一晚。"
          >
            出帖梯次
          </SteamTitle>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {tour.departureDates.map((date, i) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="group relative text-left p-5 transition-all overflow-hidden"
                  style={{
                    background: active ? HOSHINO.ink : HOSHINO.paperSoft,
                    color: active ? HOSHINO.paper : HOSHINO.ink,
                    border: `1px solid ${
                      active ? HOSHINO.ink : HOSHINO.line
                    }`,
                  }}
                >
                  {/* hover / active 紙燈籠光暈 */}
                  <span
                    aria-hidden
                    className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${HOSHINO.lamp}3a 0%, transparent 70%)`,
                      opacity: active ? 1 : 0,
                    }}
                  />
                  {!active && (
                    <span
                      aria-hidden
                      className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 50% 30%, ${HOSHINO.lamp}1f 0%, transparent 70%)`,
                      }}
                    />
                  )}

                  {/* 卡片左上角小帖號 */}
                  <span
                    className="relative font-display text-[10px] block mb-3"
                    style={{
                      color: active ? HOSHINO.lampSoft : HOSHINO.inkFaint,
                      letterSpacing: '0.3em',
                      fontWeight: 500,
                    }}
                  >
                    第{kanji(i + 1)}帖
                  </span>

                  {/* 年份 */}
                  <span
                    className="relative font-body text-[10px] block"
                    style={{
                      color: active ? HOSHINO.lampSoft : HOSHINO.woodSoft,
                      letterSpacing: '0.2em',
                    }}
                  >
                    {date.slice(0, 4)}
                  </span>

                  {/* 月日 */}
                  <span
                    className="relative font-display text-base mt-2 block leading-tight"
                    style={{
                      color: active ? HOSHINO.paper : HOSHINO.ink,
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {formatDate(date)}
                  </span>

                  <span
                    className="relative font-body text-[10px] block mt-5"
                    style={{
                      color: active ? HOSHINO.lampSoft : HOSHINO.inkFaint,
                      letterSpacing: '0.18em',
                    }}
                  >
                    {active ? '已選此帖' : '尚有客室'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

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
            Next Page
          </LanternTag>
          <h2
            className="font-display mt-10 leading-[1.4] text-2xl md:text-[34px]"
            style={{
              color: HOSHINO.ink,
              fontWeight: 500,
              letterSpacing: '0.08em',
            }}
          >
            繼續往內走
          </h2>
          <p
            className="mt-10 font-body text-sm md:text-base leading-[2.1]"
            style={{
              color: HOSHINO.woodSoft,
              letterSpacing: '0.04em',
            }}
          >
            先讀完 {kanji(tour.itinerary.length)} 帖客房手冊、
            <br />
            看清楚每一天怎麼走、住哪、吃什麼、
            <br />
            再決定要不要替自己預一間客室。
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <HoshinoButton size="lg" variant="outline" onClick={onSeeItinerary}>
              閱讀客房手冊
              <ArrowRight
                size={12}
                strokeWidth={1.5}
                className="inline-block ml-3 align-middle"
              />
            </HoshinoButton>
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
// SpecCell — 客室規格 strip 單格
// 跟 tsutaya SpecCell 對比：書本規格格、字級偏小書頁感
//                        這裡是客室規格、字距更大、配紙燈籠掛旗感
// ─────────────────────────────────────────────────────

function SpecCell({
  label,
  value,
  first,
  last,
}: {
  label: string;
  value: string;
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className="px-5 md:px-8 py-8 md:py-12"
      style={{
        borderLeft: first ? 'none' : `1px solid ${HOSHINO.lineSoft}`,
        borderRight: last ? 'none' : undefined,
      }}
    >
      <span
        className="font-display text-[10px] block mb-3"
        style={{
          color: HOSHINO.wood,
          letterSpacing: '0.35em',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <span
        className="font-display text-lg md:text-[22px] block leading-snug"
        style={{
          color: HOSHINO.ink,
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// LanternTagDark — LanternTag 深色版（用於深木褐區）
// 燈籠 + 帖號 + 章名、但配深底淡燈光
// ─────────────────────────────────────────────────────

function LanternTagDark({
  chapter,
  children,
}: {
  chapter: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-5">
      <LanternMark size={14} color={HOSHINO.lampSoft} />
      <span
        className="font-display text-xs"
        style={{
          color: HOSHINO.lamp,
          letterSpacing: '0.3em',
          fontWeight: 500,
        }}
      >
        第{chapter}帖
      </span>
      <span
        aria-hidden
        className="block h-px w-8"
        style={{ background: HOSHINO.lamp }}
      />
      <span
        className="font-body text-xs uppercase"
        style={{
          color: HOSHINO.lampSoft,
          letterSpacing: '0.35em',
        }}
      >
        {children}
      </span>
    </div>
  );
}
