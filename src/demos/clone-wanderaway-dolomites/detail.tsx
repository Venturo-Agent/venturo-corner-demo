'use client';

/**
 * Detail — tour 詳情頁
 *
 * 結構（reference single-tour 風格）：
 *   1. Hero（全寬 cover + Title Case 大標 + 居中 meta）
 *   2. Quick info bar（cream 背景、四欄 meta）
 *   3. Story（左 Eyebrow + Italiana 中標 / 右長段）
 *   4. Gallery（asymmetric 4 圖）
 *   5. Highlights（編號列、每條一行）
 *   6. Inclusions / Exclusions 兩欄
 *   7. Departure date 選擇器
 *   8. CTA section
 *   9. Footer
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  MapPin,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
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
import { TopBar, CornerFooter } from './home';

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
    <div
      className={fontClass}
      style={{ background: WA.creamWarm, color: WA.ink, ...sans }}
    >
      <TopBar variant="overlay" />

      {/* ────────────── Hero ────────────── */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,26,26,0.42) 0%, rgba(26,26,26,0.18) 35%, rgba(26,26,26,0.62) 100%)',
          }}
        />

        <div className="relative h-full flex flex-col items-center justify-end pb-24 md:pb-32 px-6 text-center max-w-5xl mx-auto">
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={onBack}
            className="absolute top-32 left-6 md:left-12 inline-flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase transition-opacity hover:opacity-70"
            style={{ ...sans, color: WA.creamLight, fontWeight: 500 }}
          >
            <ArrowLeft size={13} strokeWidth={1.2} />
            Back To All Journeys
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-6 mb-10"
          >
            <span
              className="px-4 py-2 text-[10px] tracking-[0.32em] uppercase rounded-full"
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
              className="text-[11px] tracking-[0.32em] uppercase"
              style={{
                ...sans,
                color: 'rgba(252,239,223,0.85)',
                fontWeight: 500,
              }}
            >
              {tour.destination}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[44px] md:text-[96px] leading-[1.04] tracking-[-0.005em]"
            style={{ ...serif, color: WA.creamLight, fontWeight: 400 }}
          >
            {tour.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 max-w-2xl text-base md:text-lg leading-[1.85]"
            style={{
              ...sans,
              color: 'rgba(252,239,223,0.88)',
              fontWeight: 300,
            }}
          >
            {tour.tagline}
          </motion.p>
        </div>
      </section>

      {/* ────────────── Quick info bar ────────────── */}
      <section
        className="px-6 md:px-12 py-10"
        style={{ background: WA.cream, borderBottom: `1px solid ${WA.line}` }}
      >
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <InfoStat
            label="Duration"
            value={tour.duration}
            sub={`${tour.durationDays} 天 / ${tour.durationNights} 晚`}
          />
          <InfoStat
            label="Group Size"
            value={`${tour.groupSize.min}–${tour.groupSize.max}`}
            sub="人小團"
          />
          <InfoStat
            label="Departures"
            value={`${tour.departureDates.length}`}
            sub="個出發日"
          />
          <InfoStat
            label="From"
            value={formatPrice(tour.priceFrom)}
            sub="per guest"
          />
        </div>
      </section>

      {/* ────────────── Story ────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <Eyebrow>The Story</Eyebrow>
            <div className="mt-12">
              <DisplayTitle size="md" align="center">
                Why This Trip,
                <br />
                Why Right Now.
              </DisplayTitle>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <BodyText size="lg" align="center">
              {tour.story}
            </BodyText>
          </div>

          {/* Features pills */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {tour.features.map((f, i) => (
              <span
                key={i}
                className="px-6 py-3 rounded-full text-[12px] tracking-[0.04em]"
                style={{
                  ...sans,
                  background: WA.sageMist,
                  color: WA.forest,
                  border: `1px solid ${WA.sageSoft}`,
                  fontWeight: 400,
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── Gallery（asymmetric）────────────── */}
      <section className="px-6 md:px-12 pb-32 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <div className="md:col-span-8 relative aspect-[4/3]">
              <Image
                src={tour.galleryImages[0]}
                alt={`${tour.title} 風景`}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-4 relative aspect-[4/3] md:aspect-auto">
              <Image
                src={tour.galleryImages[1]}
                alt={`${tour.title} 風景`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-5 relative aspect-[5/4]">
              <Image
                src={tour.galleryImages[2]}
                alt={`${tour.title} 風景`}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-7 relative aspect-[5/4]">
              <Image
                src={tour.galleryImages[3]}
                alt={`${tour.title} 風景`}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── Highlights ────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: WA.cream }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <Eyebrow>The Highlights</Eyebrow>
            <div className="mt-12">
              <DisplayTitle size="md" align="center">
                Moments You'll Remember.
              </DisplayTitle>
            </div>
          </div>

          <div className="space-y-px" style={{ background: WA.line }}>
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="px-8 md:px-12 py-10 flex items-center gap-8 md:gap-12"
                style={{ background: WA.cream }}
              >
                <span
                  className="text-3xl md:text-5xl shrink-0 w-16 text-center"
                  style={{ ...serif, color: WA.forest, fontWeight: 400 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden
                  className="block h-px w-12 shrink-0"
                  style={{ background: WA.forest }}
                />
                <span
                  className="text-lg md:text-2xl leading-snug"
                  style={{ ...serif, color: WA.ink, fontWeight: 400 }}
                >
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── Inclusions / Exclusions ────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <Eyebrow>What's Included</Eyebrow>
            <div className="mt-12">
              <DisplayTitle size="md" align="center">
                Everything In, Nothing Hidden.
              </DisplayTitle>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            <div>
              <p
                className="text-[11px] tracking-[0.32em] uppercase text-center mb-12"
                style={{ ...sans, color: WA.forest, fontWeight: 500 }}
              >
                Included  ·  包含
              </p>
              <div className="space-y-6">
                {tour.inclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <Check
                      size={16}
                      strokeWidth={1.4}
                      style={{ color: WA.forest, marginTop: 4 }}
                    />
                    <p
                      className="text-[15px] leading-[1.9] flex-1"
                      style={{ ...sans, color: WA.ink, fontWeight: 300 }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p
                className="text-[11px] tracking-[0.32em] uppercase text-center mb-12"
                style={{ ...sans, color: WA.inkFaint, fontWeight: 500 }}
              >
                Excluded  ·  不含
              </p>
              <div className="space-y-6">
                {tour.exclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <X
                      size={16}
                      strokeWidth={1.4}
                      style={{ color: WA.inkFaint, marginTop: 4 }}
                    />
                    <p
                      className="text-[15px] leading-[1.9] flex-1"
                      style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
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

      {/* ────────────── Departure Dates ────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-44"
        style={{ background: WA.sageMist }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <Eyebrow>Choose A Departure</Eyebrow>
            <div className="mt-12">
              <DisplayTitle size="md" align="center">
                When Would You Like To Go?
              </DisplayTitle>
            </div>
            <div className="mt-10 max-w-xl mx-auto">
              <BodyText size="md" align="center">
                選一個出發日。我們會根據出團狀況回覆名額與最終定價。
              </BodyText>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tour.departureDates.map((date) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="text-center p-7 rounded-xl transition-all"
                  style={{
                    background: active ? WA.ink : WA.creamLight,
                    color: active ? WA.creamLight : WA.ink,
                    border: `1px solid ${active ? WA.ink : WA.sageSoft}`,
                  }}
                >
                  <span
                    className="text-[10px] tracking-[0.32em] uppercase block mb-3"
                    style={{
                      ...sans,
                      color: active ? WA.sage : WA.forest,
                      fontWeight: 500,
                    }}
                  >
                    {date.slice(0, 4)}
                  </span>
                  <span
                    className="text-xl leading-snug block"
                    style={{ ...serif, fontWeight: 400 }}
                  >
                    {formatDate(date)}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.28em] uppercase block mt-4"
                    style={{
                      ...sans,
                      color: active ? WA.sage : WA.inkFaint,
                      fontWeight: 500,
                    }}
                  >
                    {active ? 'Selected' : 'Available'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────── CTA ────────────── */}
      <section className="px-6 md:px-12 py-32 md:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Next Step</Eyebrow>
          <div className="mt-12">
            <DisplayTitle size="lg" align="center">
              Ready When You Are.
            </DisplayTitle>
          </div>
          <div className="mt-12 max-w-xl mx-auto">
            <BodyText size="md" align="center">
              先看一次完整 {tour.itinerary.length} 天日程、
              <br />
              確認每一天去哪、住哪、吃什麼、再決定報名。
            </BodyText>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <PillButton variant="outline" size="lg" onClick={onSeeItinerary}>
              View Full Itinerary
            </PillButton>
            <PillButton variant="solid" size="lg" onClick={onSignup}>
              Reserve A Seat
              <ArrowRight size={13} strokeWidth={1.2} />
            </PillButton>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6">
            <SerialNumeral n={1} total={4} />
            <Divider color={WA.line} className="!w-24" />
            <span
              className="text-[10px] tracking-[0.32em] uppercase"
              style={{ ...sans, color: WA.inkFaint, fontWeight: 500 }}
            >
              Year 2026 Collection
            </span>
          </div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Info stat
// ─────────────────────────────────────────────────────

function InfoStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <p
        className="text-[10px] tracking-[0.32em] uppercase mb-3"
        style={{ ...sans, color: WA.forest, fontWeight: 500 }}
      >
        {label}
      </p>
      <p
        className="text-xl md:text-2xl"
        style={{ ...serif, color: WA.ink, fontWeight: 400 }}
      >
        {value}
      </p>
      <p
        className="text-[11px] tracking-[0.08em] mt-2"
        style={{ ...sans, color: WA.inkFaint, fontWeight: 400 }}
      >
        {sub}
      </p>
    </div>
  );
}
