'use client';

/**
 * Detail — 雜誌「Feature Story」內頁
 *
 * 結構（像 Vogue / Condé Nast Traveler 內頁）：
 *   1. Masthead bar
 *   2. Article header（kicker / 大標題 / tagline / byline / page number）
 *   3. Hero photo（單張、印刷感、photo credit）
 *   4. Story 多欄分欄印刷感（DropCap + 2-3 columns）
 *   5. Pull quote 大字壓場
 *   6. Photo essay grid（4 張 galleryImages + caption）
 *   7. Highlights 編號清單（駝色 number + 黑字標）
 *   8. Inclusions / Exclusions 對比兩欄
 *   9. Fact sheet（雜誌 sidebar 風）
 *  10. Departure Dates（票券感卡片）
 *  11. CTA（看完整日程 / 立即訂位）
 *  12. Footer
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  NYC,
  IssueMark,
  EditorialKicker,
  MagazineHeadline,
  EditorialButton,
  SerialNumber,
  Rule,
  VRule,
  DropCap,
  SwipeLink,
  Grain,
  bwImageStyle,
  BW_HOVER_CLASS,
  CATEGORY_LABEL_EN,
  EditorialFooter,
} from './shared';

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
  // Pull quote 從 highlights 第一條取
  const pullQuote = tour.highlights[0] || tour.tagline;

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
          <button
            onClick={onBack}
            className="flex items-baseline gap-3 transition-colors hover:text-[#C4A678]"
            style={{ color: NYC.ink }}
          >
            <span aria-hidden className="text-base">←</span>
            <span
              className="font-display text-xl md:text-2xl"
              style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              CORNER
            </span>
            <span
              className="hidden md:inline font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: NYC.graySoft, fontWeight: 600 }}
            >
              BACK TO TOC
            </span>
          </button>
          <IssueMark className="hidden md:inline-flex" />
        </div>
      </header>

      {/* ─────────────── Article Header（雜誌封面內頁標題） ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            {/* 左：kicker + page nav */}
            <aside className="md:col-span-3 md:border-r md:pr-8"
              style={{ borderColor: NYC.rule }}
            >
              <p
                className="font-mono text-[10px] tracking-[0.32em] uppercase"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                FEATURE
              </p>
              <p
                className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.graySoft, fontWeight: 600 }}
              >
                {CATEGORY_LABEL_EN[tour.category]}
              </p>

              <div className="mt-10">
                <p
                  className="font-mono text-[10px] tracking-[0.22em] uppercase mb-1"
                  style={{ color: NYC.grayFaint, fontWeight: 600 }}
                >
                  Page
                </p>
                <SerialNumber n="014" style={{ fontSize: 56 }} />
              </div>

              <div className="mt-10 space-y-2 font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.graySoft }}
              >
                <p>BY 角落編輯室</p>
                <p style={{ color: NYC.camel }}>PHOTO MOMO LIN</p>
                <p>ISSUE 02 — SPRING 2026</p>
              </div>
            </aside>

            {/* 右：大標題 + tagline */}
            <div className="md:col-span-9">
              <MagazineHeadline size="3xl" as="h1">
                {tour.title}
              </MagazineHeadline>
              <p
                className="mt-8 font-body text-xl md:text-2xl leading-[1.45] max-w-3xl"
                style={{ color: NYC.inkSoft, fontWeight: 400 }}
              >
                {tour.tagline}。
              </p>

              {/* Article meta strip */}
              <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-[10px] tracking-[0.22em] uppercase pb-4"
                style={{
                  borderBottom: `2px solid ${NYC.ink}`,
                  color: NYC.graySoft,
                }}
              >
                <span style={{ color: NYC.ink, fontWeight: 700 }}>{tour.destination}</span>
                <span style={{ color: NYC.camel }}>·</span>
                <span>{tour.duration}</span>
                <span style={{ color: NYC.camel }}>·</span>
                <span>{tour.groupSize.min}–{tour.groupSize.max} GUESTS</span>
                <span style={{ color: NYC.camel }}>·</span>
                <span>{tour.departureDates.length} DEPARTURES</span>
                <span className="ml-auto"
                  style={{ color: NYC.camel, fontWeight: 700 }}
                >
                  FROM {formatPrice(tour.priceFrom)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Hero Photo ─────────────── */}
      <section className="px-6 md:px-12 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden group">
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              priority
              sizes="100vw"
              className={`object-cover ${BW_HOVER_CLASS}`}
              style={bwImageStyle()}
            />
            <div className="absolute top-0 right-0 px-5 py-3"
              style={{ background: NYC.ink }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                COVER PHOTO
              </span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: NYC.grayFaint }}
          >
            <span>FIG. 01 — {tour.destination}</span>
            <span>PHOTOGRAPHED BY MOMO LIN · APRIL 2026</span>
          </div>
        </div>
      </section>

      {/* ─────────────── Story（多欄 + DropCap） ─────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24"
        style={{ background: NYC.paperWarm }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            {/* Left index */}
            <aside className="md:col-span-3 md:border-r md:pr-8"
              style={{ borderColor: NYC.ruleSoft }}
            >
              <EditorialKicker label="THE STORY" index={1} total={5} />
              <MagazineHeadline size="md" className="mt-6">
                這趟旅行
                <br />
                關於什麼。
              </MagazineHeadline>
              <p
                className="mt-8 font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                — Eva Wang
              </p>
              <p
                className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ color: NYC.grayFaint }}
              >
                Editor-in-Chief
              </p>
            </aside>

            {/* Story body — 雙欄印刷感（desktop md:columns-2） */}
            <div className="md:col-span-9">
              <div
                className="font-body text-base md:text-[17px] leading-[1.95] md:columns-2 md:gap-12"
                style={{ color: NYC.inkSoft, columnRule: `1px solid ${NYC.ruleSoft}` }}
              >
                <DropCap char={tour.story.charAt(0)} />
                <p>
                  {tour.story.slice(1)}
                </p>
                <p className="mt-6">
                  {tour.subtitle}。每一處停留、每一頓飯、每一晚住宿，都經過編輯團隊親自勘景與試睡——
                  <span style={{ color: NYC.ink, fontWeight: 500 }}>
                    這不是觀光、是 curated 的旅行。
                  </span>
                </p>
                <p className="mt-6">
                  我們的領隊提前 3 個月開始準備行程細節：餐廳的訂位、私訪的時段、季節限定的場景。
                  你不需要做任何攻略、不需要查任何時刻表——
                  把行李交給我們、把眼睛留給沿途。
                </p>
              </div>

              {/* Features chip list */}
              <div className="mt-12 pt-6"
                style={{ borderTop: `1px solid ${NYC.ruleSoft}` }}
              >
                <p
                  className="font-mono text-[10px] tracking-[0.28em] uppercase mb-5"
                  style={{ color: NYC.gray, fontWeight: 700 }}
                >
                  This Feature Includes
                </p>
                <div className="flex flex-wrap gap-3">
                  {tour.features.map((f) => (
                    <span
                      key={f}
                      className="inline-block px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase"
                      style={{
                        border: `1px solid ${NYC.ink}`,
                        color: NYC.ink,
                        fontWeight: 600,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Pull Quote 大字壓場 ─────────────── */}
      <section
        className="relative px-6 md:px-12 py-20 md:py-28"
        style={{ background: NYC.ink, color: NYC.paper }}
      >
        <Grain opacity={0.06} />
        <div className="relative mx-auto max-w-5xl text-center">
          <SerialNumber
            n="02"
            style={{
              fontSize: 40,
              color: NYC.camel,
            }}
          />
          <EditorialKicker
            label="PULL QUOTE"
            align="center"
            className="mt-4"
            invert
          />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.8, 0.3, 1] }}
            className="mt-10 font-display leading-[1.05]"
            style={{
              color: NYC.paper,
              fontWeight: 700,
              fontSize: 'clamp(34px, 5.5vw, 72px)',
              letterSpacing: '-0.025em',
            }}
          >
            「<span style={{ color: NYC.camel }}>{pullQuote}</span>」
          </motion.h2>
          <p
            className="mt-10 font-mono text-[11px] tracking-[0.32em] uppercase"
            style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}
          >
            — FROM THE FEATURE
          </p>
        </div>
      </section>

      {/* ─────────────── Photo Essay Gallery ─────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-12">
            <div>
              <EditorialKicker label="PHOTO ESSAY" index={3} total={5} />
              <MagazineHeadline size="lg" className="mt-4">
                Four
                <br />
                <span style={{ color: NYC.camel }}>Frames.</span>
              </MagazineHeadline>
            </div>
            <p
              className="font-mono text-[10px] tracking-[0.22em] uppercase max-w-xs"
              style={{ color: NYC.graySoft }}
            >
              PHOTOGRAPHED ON LOCATION
              <br />
              BY MOMO LIN — 2026 APRIL
            </p>
          </div>

          <Rule color={NYC.ink} weight={2} />

          {/* 4 張 gallery：不對稱（大 + 兩小 + 全寬橫圖） */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            <GalleryFrame
              src={tour.galleryImages[0]}
              caption={`FIG. 02 — ${tour.destination}`}
              tag="LANDSCAPE"
              className="md:col-span-7 aspect-[4/3]"
            />
            <div className="md:col-span-5 flex flex-col gap-3 md:gap-4">
              <GalleryFrame
                src={tour.galleryImages[1]}
                caption="FIG. 03 — DETAIL"
                tag="DETAIL"
                className="aspect-[4/3]"
              />
              <GalleryFrame
                src={tour.galleryImages[2]}
                caption="FIG. 04 — PORTRAIT"
                tag="PORTRAIT"
                className="aspect-[4/3]"
              />
            </div>
            <GalleryFrame
              src={tour.galleryImages[3]}
              caption={`FIG. 05 — ${tour.destination} · WIDE`}
              tag="PANORAMA"
              className="md:col-span-12 aspect-[21/9]"
            />
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights（編號清單、雜誌 list 風） ─────────────── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28"
        style={{ background: NYC.paperCold }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-4">
              <EditorialKicker label="THE LIST" index={4} total={5} />
              <MagazineHeadline size="lg" className="mt-6">
                此團
                <br />
                <span style={{ color: NYC.camel }}>精華。</span>
              </MagazineHeadline>
            </div>
            <div className="md:col-span-8 flex flex-col justify-end">
              <p
                className="font-body text-base md:text-lg leading-[1.85]"
                style={{ color: NYC.graySoft }}
              >
                編輯團隊從整趟行程裡挑出 {tour.highlights.length} 個關鍵時刻——它們不在任何旅遊書上、也沒有 Google Maps 評分。
                <span style={{ color: NYC.ink, fontWeight: 500 }}>
                  你需要被帶到那裡、才會懂。
                </span>
              </p>
            </div>
          </div>

          <Rule color={NYC.ink} weight={2} />

          {/* highlights 列：左大數字、中標題、右 PAGE 標 */}
          <div className="divide-y" style={{ borderColor: NYC.ruleSoft }}>
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.25, 0.8, 0.3, 1],
                }}
                className="grid grid-cols-[64px_1fr_auto] md:grid-cols-[100px_1fr_auto] gap-6 md:gap-8 items-baseline py-8 md:py-10"
                style={{ borderBottom: `1px solid ${NYC.ruleSoft}` }}
              >
                <SerialNumber
                  n={i + 1}
                  style={{ fontSize: 44, color: NYC.camel }}
                />
                <h3
                  className="font-display text-xl md:text-3xl leading-[1.15]"
                  style={{ color: NYC.ink, fontWeight: 600 }}
                >
                  {h}
                </h3>
                <span
                  className="hidden md:inline font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: NYC.grayFaint, fontWeight: 600 }}
                >
                  ITEM {String(i + 1).padStart(2, '0')} / {String(tour.highlights.length).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <EditorialKicker label="THE FINE PRINT" />
          <MagazineHeadline size="xl" className="mt-6 mb-12">
            費用涵蓋
          </MagazineHeadline>

          <Rule color={NYC.ink} weight={2} />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
            {/* Inclusions */}
            <div className="md:col-span-6">
              <div className="flex items-baseline gap-4 mb-8 pb-3"
                style={{ borderBottom: `1px solid ${NYC.ink}` }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.28em] uppercase"
                  style={{ color: NYC.ink, fontWeight: 700 }}
                >
                  INCLUDED
                </span>
                <span aria-hidden style={{ color: NYC.camel }}>·</span>
                <span
                  className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: NYC.camel, fontWeight: 600 }}
                >
                  {tour.inclusions.length} ITEMS
                </span>
              </div>
              <div>
                {tour.inclusions.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[40px_1fr] gap-4 py-4"
                    style={{ borderBottom: `1px solid ${NYC.ruleSoft}` }}
                  >
                    <Check
                      size={16}
                      strokeWidth={2}
                      style={{ color: NYC.camel, marginTop: 4 }}
                    />
                    <p
                      className="font-body text-base leading-[1.7]"
                      style={{ color: NYC.ink }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Exclusions */}
            <div className="md:col-span-6">
              <div className="flex items-baseline gap-4 mb-8 pb-3"
                style={{ borderBottom: `1px solid ${NYC.ruleSoft}` }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.28em] uppercase"
                  style={{ color: NYC.gray, fontWeight: 700 }}
                >
                  EXCLUDED
                </span>
                <span aria-hidden style={{ color: NYC.grayFaint }}>·</span>
                <span
                  className="font-mono text-[10px] tracking-[0.22em] uppercase"
                  style={{ color: NYC.grayFaint, fontWeight: 600 }}
                >
                  {tour.exclusions.length} ITEMS
                </span>
              </div>
              <div>
                {tour.exclusions.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[40px_1fr] gap-4 py-4"
                    style={{ borderBottom: `1px solid ${NYC.ruleSoft}` }}
                  >
                    <X
                      size={16}
                      strokeWidth={2}
                      style={{ color: NYC.grayFaint, marginTop: 4 }}
                    />
                    <p
                      className="font-body text-base leading-[1.7]"
                      style={{ color: NYC.graySoft }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Fact Sheet（雜誌 sidebar 風） ─────────────── */}
      <section
        className="px-6 md:px-12 py-20"
        style={{ background: NYC.paperWarm }}
      >
        <div className="mx-auto max-w-6xl">
          <EditorialKicker label="FACT SHEET" />
          <MagazineHeadline size="lg" className="mt-6">
            行程資料
          </MagazineHeadline>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{ background: NYC.ink }}
          >
            <FactCell label="DURATION" value={tour.duration} />
            <FactCell
              label="GROUP SIZE"
              value={`${tour.groupSize.min}–${tour.groupSize.max}`}
              suffix="GUESTS"
            />
            <FactCell
              label="DEPARTURES"
              value={String(tour.departureDates.length)}
              suffix="IN 2026"
            />
            <FactCell
              label="FROM"
              value={formatPrice(tour.priceFrom).replace('NT$ ', '')}
              suffix="TWD"
              accent
            />
          </div>
        </div>
      </section>

      {/* ─────────────── Departure Dates（票券感卡片） ─────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-5">
              <EditorialKicker label="DEPARTURES" index={5} total={5} />
              <MagazineHeadline size="lg" className="mt-6">
                出團
                <br />
                <span style={{ color: NYC.camel }}>日期。</span>
              </MagazineHeadline>
            </div>
            <div className="md:col-span-7 flex flex-col justify-end">
              <p
                className="font-body text-base leading-[1.85]"
                style={{ color: NYC.graySoft }}
              >
                點選想出發的日期、我們會根據出團狀況回覆名額與最終定價。
                {selectedDate && (
                  <>
                    <br />
                    <span style={{ color: NYC.ink, fontWeight: 500 }}>
                      已選 {formatDate(selectedDate)}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <Rule color={NYC.ink} weight={2} />

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tour.departureDates.map((date, i) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="text-left p-5 transition-all relative group"
                  style={{
                    background: active ? NYC.ink : NYC.paper,
                    color: active ? NYC.paper : NYC.ink,
                    border: `1px solid ${active ? NYC.ink : NYC.ink}`,
                  }}
                >
                  {/* 票券感角標 */}
                  <span
                    className="absolute top-0 right-0 px-2 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{
                      background: active ? NYC.camel : NYC.ink,
                      color: active ? NYC.ink : NYC.camel,
                      fontWeight: 700,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <p
                    className="font-mono text-[10px] tracking-[0.22em] uppercase mb-3 mt-2"
                    style={{
                      color: active ? NYC.camel : NYC.graySoft,
                      fontWeight: 600,
                    }}
                  >
                    {date.slice(0, 4)} · {date.slice(5, 7)}月
                  </p>
                  <p
                    className="font-display text-xl leading-tight"
                    style={{ fontWeight: 700 }}
                  >
                    {formatDate(date)}
                  </p>
                  <p
                    className="mt-4 font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{
                      color: active ? NYC.camel : NYC.grayFaint,
                      fontWeight: 600,
                    }}
                  >
                    {active ? '— SELECTED —' : '名額尚有'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="px-6 md:px-12 py-20 md:py-28"
        style={{ background: NYC.ink, color: NYC.paper }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <EditorialKicker label="NEXT STEP" invert />
              <MagazineHeadline
                size="2xl"
                color={NYC.paper}
                className="mt-6"
              >
                準備好了
                <br />
                <span style={{ color: NYC.camel }}>就走。</span>
              </MagazineHeadline>
              <p
                className="mt-8 font-body text-base md:text-lg leading-[1.85] max-w-xl"
                style={{ color: 'rgba(255,255,255,0.78)' }}
              >
                看一次完整 {tour.itinerary.length} 天日程、確認每一天去哪、住哪、吃什麼，
                再決定要不要訂位。
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-4">
              <EditorialButton
                size="lg"
                variant="outline"
                onClick={onSeeItinerary}
                style={{
                  borderColor: NYC.paper,
                  color: NYC.paper,
                }}
              >
                See Full Itinerary
              </EditorialButton>
              <EditorialButton
                size="lg"
                variant="inverted"
                onClick={onSignup}
              >
                Reserve Now
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
// GalleryFrame — 雜誌 photo essay 用相片框
// ─────────────────────────────────────────────────────

function GalleryFrame({
  src,
  caption,
  tag,
  className,
}: {
  src: string;
  caption: string;
  tag: string;
  className?: string;
}) {
  return (
    <figure className={`relative w-full overflow-hidden group ${className ?? ''}`}>
      <Image
        src={src}
        alt={caption}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`object-cover ${BW_HOVER_CLASS}`}
        style={bwImageStyle()}
      />
      {/* tag 角標 */}
      <span
        className="absolute top-3 left-3 px-3 py-1 font-mono text-[10px] tracking-[0.22em] uppercase"
        style={{
          background: NYC.paper,
          color: NYC.ink,
          fontWeight: 700,
        }}
      >
        {tag}
      </span>
      {/* caption 底 */}
      <figcaption className="absolute bottom-3 right-3">
        <span
          className="inline-block px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{
            background: 'rgba(17,17,17,0.85)',
            color: NYC.camel,
            fontWeight: 600,
          }}
        >
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

// ─────────────────────────────────────────────────────
// FactCell — 雜誌 sidebar 風的數據格
// ─────────────────────────────────────────────────────

function FactCell({
  label,
  value,
  suffix,
  accent = false,
}: {
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="px-6 py-10"
      style={{ background: accent ? NYC.ink : NYC.paper }}
    >
      <p
        className="font-mono text-[10px] tracking-[0.32em] uppercase mb-4"
        style={{
          color: accent ? NYC.camel : NYC.graySoft,
          fontWeight: 700,
        }}
      >
        {label}
      </p>
      <p
        className="font-display leading-tight"
        style={{
          color: accent ? NYC.paper : NYC.ink,
          fontWeight: 700,
          fontSize: 36,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </p>
      {suffix && (
        <p
          className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{
            color: accent ? 'rgba(255,255,255,0.55)' : NYC.grayFaint,
            fontWeight: 600,
          }}
        >
          {suffix}
        </p>
      )}
    </div>
  );
}
