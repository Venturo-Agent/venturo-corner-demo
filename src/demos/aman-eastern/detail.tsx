'use client';

/**
 * Detail — Aman Eastern tour 詳情
 *
 * 結構（每段都極簡、上下大量空白）：
 *   1. Top bar — wordmark + back
 *   2. Hero — 圖正中（單張、不大不小、配 Plate I 圖說）+ 雙語標題
 *   3. Tagline — 極短、置中、上下 py-48
 *   4. Story — 兩段、極窄欄、極長行高
 *   5. Spec — Destination / Duration / Party / Style 細線分隔
 *   6. Highlights — 細線分隔的「五件事」、無編號或極小編號
 *   7. Inclusions / Exclusions — 兩欄、不用 icon、純文字
 *   8. Departure dates — 日期細線格、可選
 *   9. CTA — 看日程 + 預約
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  AMAN,
  AmanWordmark,
  AmanButton,
  BilingualTitle,
  QuietLabel,
  QuietLink,
  Hair,
  CenterDivider,
  LedgerRow,
  PhotoCaption,
  SmallIndex,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  roman,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  tour: Tour;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onSeeItinerary: () => void;
  onSignup: () => void;
  onBack: () => void;
};

const SLOW_EASE = [0.22, 1, 0.36, 1] as const;

export default function DetailView({
  tour,
  selectedDate,
  onSelectDate,
  onSeeItinerary,
  onSignup,
  onBack,
}: Props) {
  return (
    <div style={{ background: AMAN.stone, color: AMAN.ink }}>
      {/* ─────────────── Top bar ─────────────── */}
      <section className="px-6 md:px-16 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-5 transition-colors"
          >
            <span
              aria-hidden
              className="block h-px w-8 transition-all duration-500 group-hover:w-14"
              style={{ background: AMAN.ink }}
            />
            <span
              className="font-display text-[11px]"
              style={{
                color: AMAN.ink,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              ALL JOURNEYS
            </span>
          </button>
          <AmanWordmark size="sm" color={AMAN.ink} />
        </div>
      </section>

      {/* ─────────────── Hero — 圖片置中、不大不小 ─────────────── */}
      <section className="px-6 md:px-16 pt-32 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
          >
            <QuietLabel align="center">
              {CATEGORY_LABEL_EN[tour.category]} ·{' '}
              {CATEGORY_LABEL[tour.category]}
            </QuietLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.15, ease: SLOW_EASE }}
            className="mt-16 font-display text-[44px] md:text-[80px] leading-[1.08]"
            style={{
              color: AMAN.ink,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            {tour.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="mt-10 max-w-xl mx-auto text-sm md:text-base leading-[1.95]"
            style={{ color: AMAN.inkMid, fontWeight: 300 }}
          >
            {tour.subtitle}
          </motion.p>
        </div>

        {/* 圖片 — 中央窄欄、aspect 3:4 直幅、有 PhotoCaption */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: SLOW_EASE }}
          className="mx-auto max-w-3xl mt-24 md:mt-32"
        >
          <div className="relative aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden">
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              priority
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-md">
            <PhotoCaption index={1}>
              {tour.destination}　|　{tour.duration}
            </PhotoCaption>
          </div>
        </motion.div>
      </section>

      {/* ─────────────── Tagline ─────────────── */}
      <section className="px-6 md:px-16 py-32 md:py-48">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, ease: SLOW_EASE }}
            className="font-display text-[28px] md:text-[44px] leading-[1.45]"
            style={{
              color: AMAN.ink,
              fontWeight: 200,
              letterSpacing: '0.05em',
            }}
          >
            {tour.tagline}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="mt-16"
          >
            <CenterDivider />
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Story — 兩段極窄欄 ─────────────── */}
      <section className="px-6 md:px-16 pb-32 md:pb-48">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
          >
            <QuietLabel align="center" index={2}>
              ON THIS JOURNEY
            </QuietLabel>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="mt-20 text-base md:text-lg leading-[2.15] text-center"
            style={{ color: AMAN.inkSoft, fontWeight: 300 }}
          >
            {tour.story}
          </motion.p>
        </div>
      </section>

      {/* ─────────────── Spec — 細線分隔 ─────────────── */}
      <section
        className="px-6 md:px-16 py-32 md:py-40"
        style={{ background: AMAN.stoneSoft }}
      >
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
            className="text-center mb-20"
          >
            <QuietLabel align="center" index={3}>
              JOURNEY DETAILS
            </QuietLabel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            <Hair color={AMAN.brassSoft} />
            <LedgerRow label="DESTINATION" value={tour.destination} />
            <LedgerRow label="DURATION" value={tour.duration} />
            <LedgerRow
              label="PARTY"
              value={`${tour.groupSize.min} – ${tour.groupSize.max} guests`}
            />
            <LedgerRow
              label="STYLE"
              value={`${CATEGORY_LABEL_EN[tour.category]} · ${CATEGORY_LABEL[tour.category]}`}
            />
            <LedgerRow
              label="FROM"
              value={
                <span style={{ color: AMAN.ink, fontWeight: 300 }}>
                  {formatPrice(tour.priceFrom)} per guest
                </span>
              }
            />
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Highlights ─────────────── */}
      <section className="px-6 md:px-16 py-32 md:py-48">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
            className="text-center mb-20"
          >
            <QuietLabel align="center" index={4}>
              HIGHLIGHTS
            </QuietLabel>
            <h2
              className="mt-12 font-display text-[32px] md:text-[48px] leading-[1.2]"
              style={{
                color: AMAN.ink,
                fontWeight: 200,
                letterSpacing: '0.04em',
              }}
            >
              五段時光
            </h2>
          </motion.div>

          <div>
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: SLOW_EASE,
                }}
                className="flex items-start gap-8 md:gap-12 py-8"
                style={{ borderBottom: `1px solid ${AMAN.lineSoft}` }}
              >
                <SmallIndex n={i + 1} />
                <p
                  className="flex-1 text-sm md:text-base leading-[2]"
                  style={{ color: AMAN.inkSoft, fontWeight: 300 }}
                >
                  {h}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section
        className="px-6 md:px-16 py-32 md:py-48"
        style={{ background: AMAN.stoneSoft }}
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
            className="text-center mb-20"
          >
            <QuietLabel align="center" index={5}>
              WHAT IS INCLUDED
            </QuietLabel>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.0, ease: SLOW_EASE }}
            >
              <p
                className="font-display text-[10px] mb-10"
                style={{
                  color: AMAN.brassDeep,
                  letterSpacing: '0.45em',
                  fontWeight: 300,
                }}
              >
                INCLUDED
              </p>
              <Hair color={AMAN.brassSoft} />
              {tour.inclusions.map((item, i) => (
                <div
                  key={i}
                  className="py-5"
                  style={{ borderBottom: `1px solid ${AMAN.lineSoft}` }}
                >
                  <p
                    className="text-sm leading-[1.9]"
                    style={{ color: AMAN.inkSoft, fontWeight: 300 }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.0, delay: 0.15, ease: SLOW_EASE }}
            >
              <p
                className="font-display text-[10px] mb-10"
                style={{
                  color: AMAN.brassDeep,
                  letterSpacing: '0.45em',
                  fontWeight: 300,
                }}
              >
                NOT INCLUDED
              </p>
              <Hair color={AMAN.brassSoft} />
              {tour.exclusions.map((item, i) => (
                <div
                  key={i}
                  className="py-5"
                  style={{ borderBottom: `1px solid ${AMAN.lineSoft}` }}
                >
                  <p
                    className="text-sm leading-[1.9]"
                    style={{ color: AMAN.inkFaint, fontWeight: 300 }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Departure dates ─────────────── */}
      <section className="px-6 md:px-16 py-32 md:py-48">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
            className="text-center mb-20"
          >
            <QuietLabel align="center" index={6}>
              DEPARTURE DATES
            </QuietLabel>
            <h2
              className="mt-12 font-display text-[32px] md:text-[48px] leading-[1.2]"
              style={{
                color: AMAN.ink,
                fontWeight: 200,
                letterSpacing: '0.04em',
              }}
            >
              出發日選擇
            </h2>
            <p
              className="mt-8 text-sm leading-[2]"
              style={{ color: AMAN.inkFaint, fontWeight: 300 }}
            >
              一年僅 {tour.departureDates.length} 個出發日　|　每團 {tour.groupSize.min}–
              {tour.groupSize.max} 人
            </p>
          </motion.div>

          <Hair color={AMAN.brassSoft} />
          <div>
            {tour.departureDates.map((date, i) => {
              const isSelected = selectedDate === date;
              return (
                <motion.button
                  key={date}
                  type="button"
                  onClick={() => onSelectDate(date)}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.06,
                    ease: SLOW_EASE,
                  }}
                  className="group w-full text-left py-8 flex items-baseline justify-between transition-all duration-500"
                  style={{
                    borderBottom: `1px solid ${AMAN.lineSoft}`,
                    background: isSelected ? AMAN.stoneSoft : 'transparent',
                    paddingLeft: isSelected ? 16 : 0,
                    paddingRight: isSelected ? 16 : 0,
                  }}
                >
                  <div className="flex items-baseline gap-8 md:gap-12">
                    <SmallIndex n={i + 1} />
                    <p
                      className="font-display text-base md:text-xl"
                      style={{
                        color: isSelected ? AMAN.ink : AMAN.inkSoft,
                        fontWeight: 250,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {formatDate(date)}
                    </p>
                  </div>
                  <span
                    className="font-display text-[11px] inline-flex items-center gap-4"
                    style={{
                      color: isSelected ? AMAN.ink : AMAN.inkFaint,
                      letterSpacing: '0.4em',
                      fontWeight: 300,
                    }}
                  >
                    {isSelected ? 'SELECTED' : 'CHOOSE'}
                    <span
                      aria-hidden
                      className="block h-px transition-all duration-500"
                      style={{
                        background: isSelected ? AMAN.ink : AMAN.line,
                        width: isSelected ? 32 : 16,
                      }}
                    />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="px-6 md:px-16 py-32 md:py-48"
        style={{ background: AMAN.ink, color: AMAN.stone }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: SLOW_EASE }}
          >
            <p
              className="font-display text-[10px] mb-12"
              style={{
                color: 'rgba(191,167,126,0.85)',
                letterSpacing: '0.5em',
                fontWeight: 300,
              }}
            >
              — TO PROCEED —
            </p>
            <h2
              className="font-display text-[28px] md:text-[44px] leading-[1.35]"
              style={{
                color: AMAN.stone,
                fontWeight: 200,
                letterSpacing: '0.04em',
              }}
            >
              細閱日程，
              <br />
              或預約席位。
            </h2>

            <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
              <AmanButton
                size="lg"
                onClick={onSeeItinerary}
                style={{
                  background: 'transparent',
                  color: AMAN.stone,
                  border: `1px solid ${AMAN.stone}`,
                }}
              >
                READ ITINERARY
              </AmanButton>
              <AmanButton
                size="lg"
                onClick={onSignup}
                style={{
                  background: AMAN.stone,
                  color: AMAN.ink,
                }}
              >
                RESERVE A SEAT
              </AmanButton>
            </div>
          </motion.div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}
