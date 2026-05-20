'use client';

/**
 * Detail — tour 詳情頁
 *
 * 結構：
 *   1. Hero（heroImage 全寬、tagline、key meta）
 *   2. Story 段落（左標題 + 右段落）
 *   3. Gallery（4 張 galleryImages、不對稱排版）
 *   4. Highlights 5 條（數字排序）
 *   5. Inclusions / Exclusions 對比兩欄
 *   6. DepartureDates 選擇器（日期 card list）
 *   7. CTA（看詳細日程 / 立即報名）
 */

import { useState } from 'react';
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
  SUN,
  SectionLabel,
  SunButton,
  HairLine,
  CATEGORY_LABEL,
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

export default function DetailView({
  tour,
  selectedDate,
  onSelectDate,
  onSeeItinerary,
  onSignup,
  onBack,
}: Props) {
  return (
    <div style={{ background: SUN.sand, color: SUN.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
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
              'linear-gradient(180deg, rgba(27,42,58,0.45) 0%, rgba(27,42,58,0.15) 35%, rgba(27,42,58,0.65) 100%)',
          }}
        />
        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-12 flex flex-col">
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={onBack}
            className="mt-20 self-start flex items-center gap-3 font-display text-xs tracking-[0.3em] uppercase transition-opacity hover:opacity-70"
            style={{ color: SUN.sandLight }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回所有行程
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-auto pb-16 md:pb-24 max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <span
                className="font-display text-[10px] tracking-[0.4em] uppercase px-3 py-1.5"
                style={{
                  background: 'rgba(244,233,216,0.92)',
                  color: SUN.ink,
                }}
              >
                {CATEGORY_LABEL[tour.category]}
              </span>
              <span
                className="font-display text-xs tracking-[0.3em] uppercase"
                style={{ color: 'rgba(244,233,216,0.85)' }}
              >
                {tour.destination}
              </span>
            </div>
            <h1
              className="font-display font-light leading-[1.05] text-[44px] md:text-[80px]"
              style={{ color: SUN.sandLight }}
            >
              {tour.title}
            </h1>
            <p
              className="mt-8 max-w-2xl text-lg md:text-xl leading-[1.7]"
              style={{ color: 'rgba(244,233,216,0.9)' }}
            >
              {tour.tagline}
            </p>

            {/* meta strip */}
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
              <MetaItem
                icon={<Calendar size={14} strokeWidth={1.5} />}
                label={tour.duration}
              />
              <MetaItem
                icon={<Users size={14} strokeWidth={1.5} />}
                label={`${tour.groupSize.min}–${tour.groupSize.max} 人小團`}
              />
              <MetaItem
                icon={<MapPin size={14} strokeWidth={1.5} />}
                label={`${tour.itinerary.length} 天日程`}
              />
              <div
                className="ml-auto text-right"
                style={{ color: SUN.sandLight }}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-1">
                  From
                </span>
                <span className="font-display text-2xl md:text-3xl">
                  {formatPrice(tour.priceFrom)}
                </span>
                <span className="font-mono text-[10px] tracking-wider block">
                  起 / 人
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Story ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <SectionLabel>The Story</SectionLabel>
            <h2
              className="font-display font-light mt-8 leading-[1.2] text-[32px] md:text-[40px]"
              style={{ color: SUN.ink }}
            >
              這趟旅行
              <br />
              關於什麼
            </h2>
          </div>
          <div className="md:col-span-8">
            <p
              className="text-lg md:text-xl leading-[2]"
              style={{ color: SUN.inkSoft }}
            >
              {tour.story}
            </p>
            <div className="mt-12">
              <HairLine />
              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                {tour.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="block w-2 h-2 mt-2 shrink-0"
                      style={{ background: SUN.gold }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: SUN.ink }}
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

      {/* ─────────────── Gallery ─────────────── */}
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <div className="md:col-span-7 relative aspect-[4/3] md:aspect-[5/4]">
              <Image
                src={tour.galleryImages[0]}
                alt={`${tour.title} 風景`}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-5 grid grid-rows-2 gap-4 md:gap-6">
              <div className="relative">
                <Image
                  src={tour.galleryImages[1]}
                  alt={`${tour.title} 風景`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative">
                <Image
                  src={tour.galleryImages[2]}
                  alt={`${tour.title} 風景`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-12 relative aspect-[16/7]">
              <Image
                src={tour.galleryImages[3]}
                alt={`${tour.title} 風景`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Highlights ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: SUN.sandDeep }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <SectionLabel align="center">Highlights</SectionLabel>
            <h2
              className="font-display font-light mt-8 leading-[1.2] text-[36px] md:text-[52px]"
              style={{ color: SUN.ink }}
            >
              此團精華
            </h2>
          </div>

          <div className="space-y-px" style={{ background: SUN.line }}>
            {tour.highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="px-6 md:px-10 py-8 flex items-baseline gap-8"
                style={{ background: SUN.sandDeep }}
              >
                <span
                  className="font-display text-3xl md:text-4xl shrink-0 w-12"
                  style={{ color: SUN.goldDeep }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="font-display text-xl md:text-2xl leading-relaxed"
                  style={{ color: SUN.ink }}
                >
                  {h}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Inclusions / Exclusions ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <SectionLabel align="center">What&apos;s Included</SectionLabel>
            <h2
              className="font-display font-light mt-8 leading-[1.2] text-[36px] md:text-[52px]"
              style={{ color: SUN.ink }}
            >
              費用涵蓋
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p
                className="font-display text-xs tracking-[0.4em] uppercase mb-8"
                style={{ color: SUN.goldDeep }}
              >
                Included · 包含項目
              </p>
              <div className="space-y-5">
                {tour.inclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <Check
                      size={16}
                      strokeWidth={1.5}
                      style={{ color: SUN.goldDeep, marginTop: 4 }}
                    />
                    <p
                      className="text-base leading-[1.85] flex-1"
                      style={{ color: SUN.ink }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p
                className="font-display text-xs tracking-[0.4em] uppercase mb-8"
                style={{ color: SUN.inkFaint }}
              >
                Excluded · 不含項目
              </p>
              <div className="space-y-5">
                {tour.exclusions.map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <X
                      size={16}
                      strokeWidth={1.5}
                      style={{ color: SUN.inkFaint, marginTop: 4 }}
                    />
                    <p
                      className="text-base leading-[1.85] flex-1"
                      style={{ color: SUN.inkSoft }}
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

      {/* ─────────────── Departure Dates ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: SUN.sandDeep }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <SectionLabel align="center">Departure Dates</SectionLabel>
            <h2
              className="font-display font-light mt-8 leading-[1.2] text-[36px] md:text-[52px]"
              style={{ color: SUN.ink }}
            >
              出團日期
            </h2>
            <p
              className="mt-8 max-w-xl mx-auto text-base leading-relaxed"
              style={{ color: SUN.inkSoft }}
            >
              選擇你想出發的日期、我們會根據出團狀況回覆名額與最終定價。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tour.departureDates.map((date) => {
              const active = selectedDate === date;
              return (
                <button
                  key={date}
                  onClick={() => onSelectDate(date)}
                  className="text-left p-6 transition-all"
                  style={{
                    background: active ? SUN.night : SUN.sandLight,
                    color: active ? SUN.sandLight : SUN.ink,
                    border: `1px solid ${active ? SUN.night : SUN.line}`,
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-3"
                    style={{
                      color: active ? SUN.gold : SUN.inkFaint,
                    }}
                  >
                    {date.slice(0, 4)}
                  </span>
                  <span className="font-display text-xl block leading-tight">
                    {formatDate(date)}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-wider block mt-4"
                    style={{
                      color: active ? SUN.gold : SUN.inkFaint,
                    }}
                  >
                    {active ? '已選 · SELECTED' : '尚有名額'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel align="center">Next Step</SectionLabel>
          <h2
            className="font-display font-light mt-10 leading-[1.2] text-[32px] md:text-[48px]"
            style={{ color: SUN.ink }}
          >
            準備好了嗎
          </h2>
          <p
            className="mt-8 max-w-xl mx-auto text-base leading-[1.95]"
            style={{ color: SUN.inkSoft }}
          >
            先看一次完整 {tour.itinerary.length} 天日程、確認每一天去哪、住哪、吃什麼、再決定報名。
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SunButton size="lg" variant="outline" onClick={onSeeItinerary}>
              查看詳細日程
            </SunButton>
            <SunButton size="lg" onClick={onSignup}>
              立即報名
            </SunButton>
          </div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Meta item
// ─────────────────────────────────────────────────────

function MetaItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-3"
      style={{ color: 'rgba(244,233,216,0.92)' }}
    >
      <span style={{ color: SUN.gold }}>{icon}</span>
      <span className="font-display text-sm tracking-wider">{label}</span>
    </div>
  );
}
