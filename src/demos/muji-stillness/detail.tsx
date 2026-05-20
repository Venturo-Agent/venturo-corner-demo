'use client';

/**
 * Detail — tour 詳情頁
 *
 * 結構（上下排版、不是左右）：
 *   1. Topbar
 *   2. Hero：圖片中尺寸（非全屏）+ 下方標題與 tagline
 *   3. Meta strip：規則網格四欄（天數 / 人數 / 出發 / 起價）
 *   4. Story：左標題 + 右段落（單欄 max-w-3xl）
 *   5. Highlights：NumberMark 列表（無編號圈、純數字）
 *   6. Gallery：規則 2×2 網格、不對稱
 *   7. Inclusions / Exclusions：兩欄、用方塊 marker
 *   8. Departure dates：日期卡（無印商品標籤質感）
 *   9. CTA
 *  10. Footer
 *
 * 跟 mediterranean detail 的差異：
 *   - 不全屏 hero、用 contained 中尺寸圖
 *   - 標題在圖下方、不在圖上
 *   - meta 用 grid 規則網格、不用 icon row
 *   - highlights 不用 03 大字、用 mono 小編號
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  MUJI,
  IndexLabel,
  SectionTitle,
  MujiButton,
  Hair,
  BRAND,
  CATEGORY_LABEL,
} from './shared';
import { MujiFooter } from './home';

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
    <div style={{ background: MUJI.paper, color: MUJI.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="px-6 md:px-12 py-6"
        style={{ borderBottom: `1px solid ${MUJI.line}` }}
      >
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{ color: MUJI.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span
              className="font-body text-xs"
              style={{ letterSpacing: '0.06em' }}
            >
              返回行程一覽
            </span>
          </button>
          <span
            className="font-mono text-xs"
            style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
          >
            {BRAND.marque} / Detail
          </span>
        </div>
      </header>

      {/* ─────────────── Hero ─────────────── */}
      {/* 圖不全屏。max-w 6xl，aspect 16:9，圖下方放標題 */}
      <section className="px-6 md:px-12 pt-16 md:pt-20 pb-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[16/9] w-full overflow-hidden"
          >
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              priority
              sizes="(min-width: 768px) 80vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="mt-4 flex items-baseline justify-between">
            <span
              className="font-mono text-xs"
              style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
            >
              {CATEGORY_LABEL[tour.category]} · {tour.destination}
            </span>
            <span
              className="font-mono text-xs"
              style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
            >
              {tour.duration}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 md:mt-20 max-w-3xl"
          >
            <IndexLabel index="003">Journey</IndexLabel>
            <h1
              className="font-display mt-6 leading-[1.3] text-3xl md:text-5xl"
              style={{ color: MUJI.ink, fontWeight: 500 }}
            >
              {tour.title}
            </h1>
            <p
              className="mt-8 font-body text-base md:text-lg leading-[1.95]"
              style={{ color: MUJI.inkMid }}
            >
              {tour.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Meta strip ─────────────── */}
      <section className="px-6 md:px-12 pb-16">
        <div className="mx-auto max-w-6xl">
          <Hair />
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x"
            style={{ borderColor: MUJI.line }}
          >
            <MetaCell
              label="行程"
              value={tour.duration}
            />
            <MetaCell
              label="人數"
              value={`${tour.groupSize.min}–${tour.groupSize.max} 人`}
            />
            <MetaCell
              label="出發日"
              value={`${tour.departureDates.length} 個`}
            />
            <MetaCell
              label="起價"
              value={formatPrice(tour.priceFrom)}
            />
          </div>
          <Hair />
        </div>
      </section>

      {/* ─────────────── Story ─────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <IndexLabel index="004">The Story</IndexLabel>
          <SectionTitle level={2} className="mt-6">
            這趟旅行關於什麼
          </SectionTitle>
          <p
            className="mt-12 font-body text-base md:text-lg leading-[2.1]"
            style={{ color: MUJI.inkMid }}
          >
            {tour.story}
          </p>

          {/* features 用方塊 marker、規則網格 */}
          <div className="mt-16">
            <Hair />
            <div className="py-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {tour.features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-4 py-2"
                >
                  <span
                    aria-hidden
                    className="block shrink-0"
                    style={{
                      width: 6,
                      height: 6,
                      background: MUJI.ink,
                    }}
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: MUJI.ink }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>
            <Hair />
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: MUJI.paperSoft }}
      >
        <div className="mx-auto max-w-3xl">
          <IndexLabel index="005">Highlights</IndexLabel>
          <SectionTitle level={2} className="mt-6">
            此團精華
          </SectionTitle>

          <div className="mt-16">
            <Hair />
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                }}
                className="grid grid-cols-[40px_1fr] gap-6 py-6"
                style={{ borderBottom: `1px solid ${MUJI.line}` }}
              >
                <span
                  className="font-mono text-xs"
                  style={{
                    color: MUJI.wood,
                    letterSpacing: '0.05em',
                    paddingTop: 4,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="font-display text-base md:text-lg leading-[1.7]"
                  style={{ color: MUJI.ink, fontWeight: 500 }}
                >
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Gallery ─────────────── */}
      {/* 規則 2×2 網格、無對稱、保持節制 */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <IndexLabel index="006">Gallery</IndexLabel>
          <SectionTitle level={2} className="mt-6">
            旅程片刻
          </SectionTitle>

          <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6">
            {tour.galleryImages.slice(0, 4).map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                }}
                className="relative aspect-[4/3] w-full overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`${tour.title} 風景 ${i + 1}`}
                  fill
                  sizes="(min-width: 768px) 40vw, 50vw"
                  className="object-cover"
                />
                <span
                  className="absolute bottom-3 left-3 font-mono text-[10px]"
                  style={{
                    color: MUJI.paper,
                    letterSpacing: '0.05em',
                    textShadow: '0 0 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Fig. {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: MUJI.linenSoft }}
      >
        <div className="mx-auto max-w-3xl">
          <IndexLabel index="007">What&apos;s Included</IndexLabel>
          <SectionTitle level={2} className="mt-6">
            費用涵蓋
          </SectionTitle>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p
                className="font-mono text-xs mb-6 pb-3"
                style={{
                  color: MUJI.ink,
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${MUJI.ink}`,
                }}
              >
                Included / 包含
              </p>
              <div>
                {tour.inclusions.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-4 py-3"
                    style={{ borderBottom: `1px solid ${MUJI.line}` }}
                  >
                    <span
                      aria-hidden
                      className="block shrink-0"
                      style={{
                        width: 8,
                        height: 1,
                        background: MUJI.ink,
                        marginTop: 8,
                      }}
                    />
                    <span
                      className="font-body text-sm leading-[1.85]"
                      style={{ color: MUJI.ink }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p
                className="font-mono text-xs mb-6 pb-3"
                style={{
                  color: MUJI.woodSoft,
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${MUJI.line}`,
                }}
              >
                Excluded / 不含
              </p>
              <div>
                {tour.exclusions.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-4 py-3"
                    style={{ borderBottom: `1px solid ${MUJI.line}` }}
                  >
                    <span
                      aria-hidden
                      className="block shrink-0"
                      style={{
                        width: 8,
                        height: 1,
                        background: MUJI.woodSoft,
                        marginTop: 8,
                      }}
                    />
                    <span
                      className="font-body text-sm leading-[1.85]"
                      style={{ color: MUJI.inkMid }}
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

      {/* ─────────────── Departure dates ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <IndexLabel index="008">Departure Dates</IndexLabel>
          <SectionTitle level={2} className="mt-6">
            出團日期
          </SectionTitle>
          <p
            className="mt-8 font-body text-sm md:text-base leading-[2] max-w-xl"
            style={{ color: MUJI.inkMid }}
          >
            選擇你想出發的日期、我們會根據出團狀況回覆名額與最終定價。
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {tour.departureDates.map((date) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="text-left p-5 transition-colors"
                  style={{
                    background: active ? MUJI.ink : MUJI.paperSoft,
                    color: active ? MUJI.paper : MUJI.ink,
                    border: `1px solid ${active ? MUJI.ink : MUJI.line}`,
                  }}
                >
                  <span
                    className="font-mono text-[10px] block mb-2"
                    style={{
                      color: active ? MUJI.woodSoft : MUJI.woodSoft,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {date.slice(0, 4)}
                  </span>
                  <span
                    className="font-display text-base block leading-tight"
                    style={{
                      color: active ? MUJI.paper : MUJI.ink,
                      fontWeight: 500,
                    }}
                  >
                    {formatDate(date)}
                  </span>
                  <span
                    className="font-mono text-[10px] block mt-3"
                    style={{
                      color: active ? MUJI.linen : MUJI.woodSoft,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {active ? '已選' : '尚有名額'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: MUJI.paperSoft }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <IndexLabel index="009" align="center">
            Next Step
          </IndexLabel>
          <h2
            className="font-display mt-8 leading-[1.5] text-2xl md:text-3xl"
            style={{ color: MUJI.ink, fontWeight: 500 }}
          >
            準備好了嗎
          </h2>
          <p
            className="mt-8 font-body text-sm md:text-base leading-[2]"
            style={{ color: MUJI.inkMid }}
          >
            先看一次完整 {tour.itinerary.length} 天日程、
            <br />
            確認每一天去哪、住哪、吃什麼、再決定報名。
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MujiButton size="lg" variant="outline" onClick={onSeeItinerary}>
              查看詳細日程
              <ArrowRight
                size={12}
                strokeWidth={1.5}
                className="inline-block ml-3 align-middle"
              />
            </MujiButton>
            <MujiButton size="lg" onClick={onSignup}>
              立即報名
            </MujiButton>
          </div>
        </div>
      </section>

      <MujiFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// MetaCell — meta strip 內單格
// ─────────────────────────────────────────────────────

function MetaCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-4 md:px-6 py-6 md:py-8 text-left first:pl-0 last:pr-0">
      <span
        className="font-mono text-[10px] block mb-3"
        style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
      >
        {label}
      </span>
      <span
        className="font-display text-lg md:text-xl block"
        style={{ color: MUJI.ink, fontWeight: 500 }}
      >
        {value}
      </span>
    </div>
  );
}
