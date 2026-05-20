'use client';

/**
 * Detail — tour 詳情頁（書本內頁感）
 *
 * 結構（像翻開一本書）：
 *   1. Topbar
 *   2. 書名頁 hero：直幅 4:5 圖（左）+ 卷號 + 書名 + tagline + 編者按（右）
 *   3. 書本規格 strip：四欄（卷次 / 頁數 / 出版 / 售價）
 *   4. 卷一 序：story 段落（雙欄、書序感）
 *   5. 章節目錄（Highlights）：藏書編號 + 章名
 *   6. 圖版插頁（Gallery）：規則 grid + 圖說
 *   7. 書末附錄（Inclusions / Exclusions）：條目排版
 *   8. 出版日期（Departure dates）：書頁卡感
 *   9. 跋（CTA）：書末邀請
 *  10. Footer
 *
 * 跟 muji detail 的差異：
 *   - muji 是工業 catalog 詳情、IndexLabel 用「004」工業編號
 *   - 蔦屋是書本內頁、ArchiveTag 用「卷 一 ─ 序」線裝書感
 *   - hero 圖直幅在左、不是上方全寬
 *   - 標題排「書名 / 副標 / 編者按」三層
 *   - story 用雙欄、像書序
 *   - inclusions 排版像書末「附錄一 / 附錄二」
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  TSUTAYA,
  ArchiveTag,
  BookTitle,
  TsutayaButton,
  DoubleHair,
  PhotoCaption,
  CATEGORY_LABEL,
  volName,
} from './shared';
import { TsutayaFooter } from './home';

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
    <div style={{ background: TSUTAYA.paper, color: TSUTAYA.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="px-6 md:px-12 py-6"
        style={{ borderBottom: `1px solid ${TSUTAYA.line}` }}
      >
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{ color: TSUTAYA.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span
              className="font-body text-xs"
              style={{ letterSpacing: '0.1em' }}
            >
              回到書架
            </span>
          </button>
          <span
            className="font-body text-xs"
            style={{
              color: TSUTAYA.brownFaint,
              letterSpacing: '0.15em',
            }}
          >
            細讀內頁 / Reading
          </span>
        </div>
      </header>

      {/* ─────────────── 書名頁 Hero ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* 左：直幅書頁夾照 */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ boxShadow: `inset 0 0 0 1px ${TSUTAYA.line}` }}
                />
              </div>
              <PhotoCaption fig={1}>
                {tour.destination} · 書名頁
              </PhotoCaption>
            </motion.div>

            {/* 右：書名頁排版 */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-6 md:pt-6"
            >
              {/* 類別 + 卷次 */}
              <ArchiveTag vol="序">{CATEGORY_LABEL[tour.category]}</ArchiveTag>

              {/* 書名 */}
              <h1
                className="font-display mt-10 leading-[1.3] text-3xl md:text-[44px]"
                style={{ color: TSUTAYA.ink, fontWeight: 500 }}
              >
                {tour.title}
              </h1>

              {/* 副標（tagline） */}
              <p
                className="mt-6 font-body text-base md:text-lg leading-[1.95]"
                style={{ color: TSUTAYA.brownSoft }}
              >
                {tour.tagline}
              </p>

              {/* 雙線 + 編者按 */}
              <div className="mt-12">
                <DoubleHair />
              </div>

              <div className="mt-10">
                <p
                  className="font-display text-xs mb-4"
                  style={{
                    color: TSUTAYA.brown,
                    letterSpacing: '0.2em',
                  }}
                >
                  編者按
                </p>
                <p
                  className="font-body text-sm leading-[2.1]"
                  style={{ color: TSUTAYA.brownSoft }}
                >
                  本書共 {tour.itinerary.length} 章，
                  歷時 {tour.duration}，
                  收錄 {tour.highlights.length} 個本店精選段落。
                  <br />
                  讀完整本書、需 {tour.itinerary.length} 個白晝與夜。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── 書本規格 strip ─────────────── */}
      <section className="px-6 md:px-12 pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <DoubleHair />
          <div className="grid grid-cols-2 md:grid-cols-4">
            <SpecCell
              label="卷次"
              value={tour.duration}
              first
            />
            <SpecCell
              label="讀者上限"
              value={`${tour.groupSize.min}–${tour.groupSize.max} 位`}
            />
            <SpecCell
              label="出版日"
              value={`${tour.departureDates.length} 個梯次`}
            />
            <SpecCell
              label="本書定價"
              value={formatPrice(tour.priceFrom)}
              last
            />
          </div>
          <DoubleHair />
        </div>
      </section>

      {/* ─────────────── 卷一 序（Story） ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <ArchiveTag vol={volName(1)}>The Preface</ArchiveTag>
          <BookTitle level={2} className="mt-8">
            這本書關於什麼
          </BookTitle>

          {/* 雙欄書序 */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <p
              className="font-body text-sm md:text-[15px] leading-[2.15]"
              style={{ color: TSUTAYA.brownSoft }}
            >
              {tour.story}
            </p>
            <div>
              <p
                className="font-display text-xs mb-5"
                style={{
                  color: TSUTAYA.brown,
                  letterSpacing: '0.2em',
                }}
              >
                本書精選
              </p>
              <div>
                {tour.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-baseline gap-4 py-3"
                    style={{
                      borderBottom:
                        i === tour.features.length - 1
                          ? 'none'
                          : `1px solid ${TSUTAYA.lineSoft}`,
                    }}
                  >
                    <span
                      className="font-display text-[10px] shrink-0 w-10"
                      style={{
                        color: TSUTAYA.brown,
                        letterSpacing: '0.15em',
                        fontWeight: 500,
                      }}
                    >
                      其{volName(i + 1)}
                    </span>
                    <span
                      className="font-body text-sm leading-[1.8]"
                      style={{ color: TSUTAYA.ink }}
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

      {/* ─────────────── 卷二 章節目錄（Highlights） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: TSUTAYA.paperSoft }}
      >
        <div className="mx-auto max-w-4xl">
          <ArchiveTag vol={volName(2)}>Chapters of Note</ArchiveTag>
          <BookTitle
            level={2}
            className="mt-8"
            subtitle="編者讀完一遍後，特別在這幾章折了書角。"
          >
            本書精彩段落
          </BookTitle>

          <div className="mt-16">
            <DoubleHair />
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                }}
                className="grid grid-cols-[60px_1fr_40px] md:grid-cols-[80px_1fr_60px] gap-6 py-7"
                style={{ borderBottom: `1px solid ${TSUTAYA.lineSoft}` }}
              >
                <span
                  className="font-display text-sm"
                  style={{
                    color: TSUTAYA.brown,
                    letterSpacing: '0.15em',
                    paddingTop: 4,
                    fontWeight: 500,
                  }}
                >
                  第{volName(i + 1)}節
                </span>
                <p
                  className="font-display text-base md:text-lg leading-[1.7]"
                  style={{ color: TSUTAYA.ink, fontWeight: 500 }}
                >
                  {h}
                </p>
                <span
                  className="font-body text-[10px] text-right"
                  style={{
                    color: TSUTAYA.brownFaint,
                    letterSpacing: '0.15em',
                    paddingTop: 6,
                  }}
                >
                  頁 {String((i + 1) * 12).padStart(3, '0')}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 卷三 圖版插頁（Gallery） ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ArchiveTag vol={volName(3)}>Plates</ArchiveTag>
          <BookTitle
            level={2}
            className="mt-8"
            subtitle="書中夾入的四張底片。"
          >
            旅程圖版
          </BookTitle>

          {/* 圖版：規則 2×2 + 圖說 */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {tour.galleryImages.slice(0, 4).map((src, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                }}
                className="block"
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${tour.title} 圖版 ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${TSUTAYA.line}`,
                    }}
                  />
                </div>
                <PhotoCaption fig={i + 1}>
                  {tour.destination} · 圖版{volName(i + 1)}
                </PhotoCaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── 卷四 書末附錄（Inclusions / Exclusions） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: TSUTAYA.straw }}
      >
        <div className="mx-auto max-w-4xl">
          <ArchiveTag vol={volName(4)}>Appendices</ArchiveTag>
          <BookTitle
            level={2}
            className="mt-8"
            subtitle="本書定價已收錄、與另計於本書之外的內容。"
          >
            書末附錄
          </BookTitle>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 附錄一：定價已收錄 */}
            <div>
              <p
                className="font-display text-xs mb-5 pb-3"
                style={{
                  color: TSUTAYA.ink,
                  letterSpacing: '0.2em',
                  borderBottom: `1px solid ${TSUTAYA.ink}`,
                }}
              >
                附錄一 · 已收錄
              </p>
              <div>
                {tour.inclusions.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[30px_1fr] gap-4 py-3"
                    style={{
                      borderBottom: `1px solid ${TSUTAYA.lineSoft}`,
                    }}
                  >
                    <span
                      className="font-display text-xs"
                      style={{
                        color: TSUTAYA.brown,
                        letterSpacing: '0.1em',
                        paddingTop: 4,
                        fontWeight: 500,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-body text-sm leading-[1.9]"
                      style={{ color: TSUTAYA.ink }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 附錄二：本書之外 */}
            <div>
              <p
                className="font-display text-xs mb-5 pb-3"
                style={{
                  color: TSUTAYA.brownSoft,
                  letterSpacing: '0.2em',
                  borderBottom: `1px solid ${TSUTAYA.brownSoft}`,
                }}
              >
                附錄二 · 另計
              </p>
              <div>
                {tour.exclusions.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[30px_1fr] gap-4 py-3"
                    style={{
                      borderBottom: `1px solid ${TSUTAYA.lineSoft}`,
                    }}
                  >
                    <span
                      className="font-display text-xs"
                      style={{
                        color: TSUTAYA.brownSoft,
                        letterSpacing: '0.1em',
                        paddingTop: 4,
                        fontWeight: 500,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-body text-sm leading-[1.9]"
                      style={{ color: TSUTAYA.brownSoft }}
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

      {/* ─────────────── 卷五 出版日（Departure dates） ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <ArchiveTag vol={volName(5)}>Publication Dates</ArchiveTag>
          <BookTitle
            level={2}
            className="mt-8"
            subtitle="挑一個你想開讀的日子。"
          >
            出版梯次
          </BookTitle>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {tour.departureDates.map((date, i) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="text-left p-5 transition-colors relative"
                  style={{
                    background: active ? TSUTAYA.ink : TSUTAYA.paperSoft,
                    color: active ? TSUTAYA.paper : TSUTAYA.ink,
                    border: `1px solid ${
                      active ? TSUTAYA.ink : TSUTAYA.line
                    }`,
                  }}
                >
                  {/* 卡片左上角小卷號 */}
                  <span
                    className="font-display text-[10px] block mb-3"
                    style={{
                      color: active ? TSUTAYA.strawSoft : TSUTAYA.brownFaint,
                      letterSpacing: '0.2em',
                    }}
                  >
                    第{volName(i + 1)}版
                  </span>

                  {/* 年份 */}
                  <span
                    className="font-body text-[10px] block"
                    style={{
                      color: active ? TSUTAYA.strawSoft : TSUTAYA.brownSoft,
                      letterSpacing: '0.15em',
                    }}
                  >
                    {date.slice(0, 4)}
                  </span>

                  {/* 月日 */}
                  <span
                    className="font-display text-base mt-1 block leading-tight"
                    style={{
                      color: active ? TSUTAYA.paper : TSUTAYA.ink,
                      fontWeight: 500,
                    }}
                  >
                    {formatDate(date)}
                  </span>

                  <span
                    className="font-body text-[10px] block mt-4"
                    style={{
                      color: active ? TSUTAYA.strawSoft : TSUTAYA.brownFaint,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {active ? '已選此版' : '尚有座位'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── 跋（CTA） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: TSUTAYA.paperSoft }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <ArchiveTag vol="跋" align="center">
            Next Page
          </ArchiveTag>
          <h2
            className="font-display mt-10 leading-[1.5] text-2xl md:text-3xl"
            style={{ color: TSUTAYA.ink, fontWeight: 500 }}
          >
            繼續讀下去
          </h2>
          <p
            className="mt-10 font-body text-sm md:text-base leading-[2.05]"
            style={{ color: TSUTAYA.brownSoft }}
          >
            先翻完整本 {tour.itinerary.length} 章日程，
            <br />
            看清每一天去哪、住哪、吃什麼，
            <br />
            再決定要不要把這本書帶回家。
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <TsutayaButton size="lg" variant="outline" onClick={onSeeItinerary}>
              逐章閱讀
              <ArrowRight
                size={12}
                strokeWidth={1.5}
                className="inline-block ml-3 align-middle"
              />
            </TsutayaButton>
            <TsutayaButton size="lg" onClick={onSignup}>
              把這本書帶回家
            </TsutayaButton>
          </div>
        </div>
      </section>

      <TsutayaFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SpecCell — 書本規格 strip 單格
// 跟 muji MetaCell 對比：muji 是工業 catalog cell
//                     蔦屋是書頁規格欄、字距更大、配書頁書脊感
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
      className="px-5 md:px-8 py-8 md:py-10"
      style={{
        borderLeft: first ? 'none' : `1px solid ${TSUTAYA.lineSoft}`,
        borderRight: last ? 'none' : undefined,
      }}
    >
      <span
        className="font-display text-[10px] block mb-3"
        style={{
          color: TSUTAYA.brown,
          letterSpacing: '0.25em',
        }}
      >
        {label}
      </span>
      <span
        className="font-display text-lg md:text-xl block leading-snug"
        style={{ color: TSUTAYA.ink, fontWeight: 500 }}
      >
        {value}
      </span>
    </div>
  );
}

