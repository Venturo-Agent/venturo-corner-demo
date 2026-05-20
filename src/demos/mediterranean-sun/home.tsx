'use client';

/**
 * Home — landing view
 *
 * 結構：
 *   1. Hero 全屏（第一條 tour heroImage、品牌 statement、scroll cue）
 *   2. Intro statement（在角落、慢慢看世界）
 *   3. 4 條精選 tour preview（grid）
 *   4. 品牌價值四條（為什麼選角落）
 *   5. CTA footer（看所有行程）
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  SUN,
  SectionLabel,
  SunButton,
  Marker,
  HairLine,
  CATEGORY_LABEL,
} from './shared';

const heroTour = tours[0];

const VALUES = [
  {
    n: 1,
    title: '全程不超過 14 人',
    body: '每團人數嚴格上限。我們相信旅行的記憶屬於小群人、不屬於擴音器與旗子。',
  },
  {
    n: 2,
    title: '町家、莊園、玻璃屋',
    body: '住宿不選大型 chain。每一晚都是經過主理人挑過、能讓你慢下來的地方。',
  },
  {
    n: 3,
    title: '深度而非走馬看花',
    body: '一天 2 到 3 個主要行程、留出空白時段。讓城市自己對你說話、而不是被導遊推著走。',
  },
  {
    n: 4,
    title: '中文領隊全程隨團',
    body: '所有出團都配備經驗 5 年以上的中文領隊。沒有自由行的孤獨、沒有大團的吵雜。',
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div style={{ background: SUN.sand, color: SUN.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
        <Image
          src={heroTour.heroImage}
          alt={heroTour.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(27,42,58,0.32) 0%, rgba(27,42,58,0.08) 35%, rgba(27,42,58,0.55) 100%)',
          }}
        />
        <div className="relative h-full mx-auto max-w-7xl px-6 md:px-12 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="pt-24 md:pt-32"
          >
            <p
              className="font-display text-xs md:text-sm tracking-[0.5em] uppercase"
              style={{ color: SUN.sandLight }}
            >
              Corner Travel · Est. 2018
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-auto pb-20 md:pb-28 max-w-4xl"
          >
            <h1
              className="font-display font-light leading-[1.05] text-[44px] md:text-[80px]"
              style={{ color: SUN.sandLight }}
            >
              在角落
              <br />
              慢慢看世界
            </h1>
            <p
              className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.9]"
              style={{ color: 'rgba(244,233,216,0.88)' }}
            >
              我們不做走馬看花的觀光、也不做塞滿景點的趕集。
              <br />
              一年只出 24 團、每團不超過 14 人、住宿全部親自踏過。
            </p>

            <div className="mt-12 flex items-center gap-6">
              <SunButton
                size="lg"
                onClick={onSeeAll}
                style={{ background: SUN.sandLight, color: SUN.night }}
              >
                看所有行程
              </SunButton>
              <button
                onClick={() => onSelectTour(heroTour.slug)}
                className="font-display text-xs tracking-[0.3em] uppercase transition-opacity hover:opacity-70"
                style={{ color: SUN.sandLight }}
              >
                先看精選 →
              </button>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span
            className="font-display text-[10px] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(244,233,216,0.7)' }}
          >
            Scroll
          </span>
          <span
            className="block w-px h-12"
            style={{ background: 'rgba(244,233,216,0.5)' }}
          />
        </motion.div>
      </section>

      {/* ─────────────── Statement ─────────────── */}
      <section className="mx-auto max-w-4xl px-6 md:px-12 py-24 md:py-32 text-center">
        <SectionLabel align="center">Our Philosophy</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light mt-10 leading-[1.3] text-[28px] md:text-[42px]"
          style={{ color: SUN.ink }}
        >
          旅行的意義
          <br />
          不在於走得多遠、
          <br />
          而在於停下來時、
          <br />
          能不能聽見一個地方的聲音。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-12 md:mt-16 max-w-2xl mx-auto leading-[2] text-base"
          style={{ color: SUN.inkSoft }}
        >
          角落旅行社成立於 2018 年、以「全程不超過 14 人」為核心信念。
          我們挑剔住宿、堅持小團、領隊全程隨團。
          帶你去看的、是那種看完之後、會在生活裡安靜很久的風景。
        </motion.p>
      </section>

      {/* ─────────────── Featured Tours ─────────────── */}
      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div>
              <SectionLabel>Featured Journeys</SectionLabel>
              <h2
                className="font-display font-light mt-6 leading-[1.15] text-[36px] md:text-[56px]"
                style={{ color: SUN.ink }}
              >
                2026 年度精選
                <br />
                四條深度路線
              </h2>
            </div>
            <button
              onClick={onSeeAll}
              className="font-display text-xs tracking-[0.3em] uppercase transition-opacity hover:opacity-70 flex items-center gap-3 self-start md:self-end"
              style={{ color: SUN.night }}
            >
              查看全部行程
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {tours.map((tour, i) => (
              <FeaturedCard
                key={tour.slug}
                tour={tour}
                index={i}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Values ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 mt-12"
        style={{ background: SUN.sandDeep }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <SectionLabel align="center">Why Corner</SectionLabel>
            <h2
              className="font-display font-light mt-8 leading-[1.2] text-[36px] md:text-[52px]"
              style={{ color: SUN.ink }}
            >
              為什麼選擇我們
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 md:gap-y-20">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-8"
              >
                <span
                  className="font-display text-3xl shrink-0"
                  style={{ color: SUN.goldDeep }}
                >
                  {String(v.n).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3
                    className="font-display text-2xl mb-4 leading-snug"
                    style={{ color: SUN.ink }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="leading-[2] text-base"
                    style={{ color: SUN.inkSoft }}
                  >
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32 text-center">
        <SectionLabel align="center">Begin Your Journey</SectionLabel>
        <h2
          className="font-display font-light mt-10 leading-[1.2] text-[32px] md:text-[48px]"
          style={{ color: SUN.ink }}
        >
          下一個角落、
          <br />
          也許正等你拜訪。
        </h2>
        <div className="mt-12 flex justify-center">
          <SunButton size="lg" onClick={onSeeAll}>
            探索全部行程
          </SunButton>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Featured card
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.85,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group text-left flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(27,42,58,0) 50%, rgba(27,42,58,0.35) 100%)',
          }}
        />
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
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
            className="font-mono text-xs"
            style={{ color: SUN.sandLight }}
          >
            {String(index + 1).padStart(2, '0')} / 04
          </span>
        </div>
      </div>

      <div className="pt-8 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <MapPin size={14} strokeWidth={1.5} style={{ color: SUN.goldDeep }} />
          <span
            className="font-display text-xs tracking-[0.3em] uppercase"
            style={{ color: SUN.goldDeep }}
          >
            {tour.destination}
          </span>
        </div>
        <h3
          className="font-display font-light leading-tight text-3xl md:text-4xl mb-4 transition-colors group-hover:underline underline-offset-[10px] decoration-1"
          style={{ color: SUN.ink }}
        >
          {tour.title}
        </h3>
        <p
          className="text-base leading-relaxed mb-8"
          style={{ color: SUN.inkSoft }}
        >
          {tour.subtitle}
        </p>

        <HairLine />

        <div className="pt-6 flex items-baseline justify-between">
          <div className="flex items-center gap-6">
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: SUN.inkFaint }}
            >
              {tour.duration}
            </span>
            <span
              className="font-mono text-xs tracking-wider"
              style={{ color: SUN.inkFaint }}
            >
              {tour.groupSize.min}–{tour.groupSize.max} 人
            </span>
          </div>
          <div className="text-right">
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase block"
              style={{ color: SUN.inkFaint }}
            >
              From
            </span>
            <span
              className="font-display text-lg"
              style={{ color: SUN.ink }}
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
// ─────────────────────────────────────────────────────

export function CornerFooter() {
  return (
    <footer
      className="px-6 md:px-12 py-16"
      style={{ background: SUN.night, color: SUN.sandLight }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <p
              className="font-display text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: SUN.gold }}
            >
              Corner Travel
            </p>
            <p
              className="font-display text-2xl leading-snug"
              style={{ color: SUN.sandLight }}
            >
              角落旅行社
            </p>
            <p
              className="mt-4 text-sm leading-[2]"
              style={{ color: 'rgba(244,233,216,0.6)' }}
            >
              漫途旅遊旗下品牌
              <br />
              交觀甲 7654 號 / 品保中 1234
            </p>
          </div>
          <div>
            <p
              className="font-display text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: SUN.gold }}
            >
              Contact
            </p>
            <p
              className="text-sm leading-[2]"
              style={{ color: 'rgba(244,233,216,0.8)' }}
            >
              台北市信義區松仁路 28 號 12 樓
              <br />
              02-2345-6789
              <br />
              hello@corner-travel.tw
            </p>
          </div>
          <div>
            <p
              className="font-display text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: SUN.gold }}
            >
              Office Hours
            </p>
            <p
              className="text-sm leading-[2]"
              style={{ color: 'rgba(244,233,216,0.8)' }}
            >
              週一至週五 10:00–19:00
              <br />
              週六 11:00–17:00
              <br />
              週日休
            </p>
          </div>
        </div>

        <div
          className="h-px w-full"
          style={{ background: 'rgba(244,233,216,0.18)' }}
        />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(244,233,216,0.5)' }}
          >
            © 2026 Corner Travel · A Venturo Brand
          </p>
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(244,233,216,0.5)' }}
          >
            Designed in Taipei · Curated Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
