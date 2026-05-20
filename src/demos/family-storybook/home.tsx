'use client';

/**
 * Home — 親子繪本 landing view
 *
 * 結構：
 *   1. Hero — 暖橘背景 + 童書感大標 + SVG 雲朵 / 太陽 / 飛機 等飄浮裝飾
 *   2. 介紹段落（繪本翻頁感、左圖右文）
 *   3. 4 條故事選單（像繪本「目錄」、每條一個故事）
 *   4. 家庭專屬服務 4 條（兒童導遊 / 小手禮包 / 簡化行李 / 親子相機）
 *   5. CTA + footer
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  BOOK,
  ChapterLabel,
  StoryButton,
  StickerBadge,
  StorybookCard,
  SpeechBubble,
  HairLine,
  Sun,
  Cloud,
  PaperPlane,
  Star,
  Tree,
  Bird,
  Globe,
  Camera,
  Suitcase,
  Flower,
  Moon,
  CATEGORY_LABEL,
  CATEGORY_TAG,
  CATEGORY_AGE,
  CategoryIcon,
  FloatingDecor,
} from './shared';

const heroTour = tours[0];

const FAMILY_VALUES = [
  {
    n: 1,
    title: '兒童專屬故事導遊',
    body: '每團配一位專門帶孩子的副領隊。會講故事、會玩遊戲、會收拾突發狀況。爸媽可以放心當大人、孩子有自己的「冒險夥伴」。',
    icon: <Globe size={64} />,
    badgeColor: BOOK.sky,
  },
  {
    n: 2,
    title: '小小冒險家行李包',
    body: '出發前一週寄到家、裡面有專屬地圖、護照貼紙、塗鴉本、星星貼紙、小望遠鏡。每天讓孩子在地圖上畫一顆星、把旅行畫成自己的故事。',
    icon: <Suitcase size={64} />,
    badgeColor: BOOK.orange,
  },
  {
    n: 3,
    title: '簡化大人的行李',
    body: '兒童保溫瓶、防曬乳、消毒濕巾、暈車藥、簡易雨衣、緊急聯絡卡 — 全部由我們準備在車上。爸媽行李少一半、心情輕一倍。',
    icon: <Flower size={64} color={BOOK.blossom} />,
    badgeColor: BOOK.blossom,
  },
  {
    n: 4,
    title: '親子相機與每日合照',
    body: '我們有專屬攝影師、每天為每個家庭拍一張全家福。旅行結束會收到 50 張高解析照片 + 一本印刷裝訂的旅行繪本、回家放在書架上。',
    icon: <Camera size={64} />,
    badgeColor: BOOK.leaf,
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div style={{ background: BOOK.paper, color: BOOK.ink }}>
      {/* ─────────────── Hero ─────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${BOOK.paperLight} 0%, ${BOOK.paper} 60%, ${BOOK.paperWarm} 100%)`,
        }}
      >
        {/* 飄浮裝飾 */}
        <FloatingDecor className="absolute top-16 left-[8%]" delay={0}>
          <Cloud size={140} color={BOOK.cream} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-32 right-[12%]" delay={1.5}>
          <Cloud size={100} color={BOOK.cream} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-24 right-[6%]" delay={0.8}>
          <Sun size={96} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-[58%] left-[4%]" delay={2}>
          <Bird size={48} color={BOOK.ink} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-[42%] right-[20%]" delay={3}>
          <Bird size={36} color={BOOK.ink} />
        </FloatingDecor>

        {/* 底部山丘 SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 200"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: 200 }}
          aria-hidden
        >
          <path
            d="M 0 120 C 200 80, 360 140, 540 110 C 720 80, 900 150, 1080 120 C 1260 100, 1380 130, 1440 110 L 1440 200 L 0 200 Z"
            fill={BOOK.leaf}
            opacity="0.85"
          />
          <path
            d="M 0 160 C 240 130, 480 170, 720 150 C 960 130, 1200 170, 1440 150 L 1440 200 L 0 200 Z"
            fill={BOOK.orangeDeep}
            opacity="0.9"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-6 md:px-12 pt-24 md:pt-32 pb-56 md:pb-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.2, 0.64, 1] }}
            className="flex justify-center"
          >
            <StickerBadge color={BOOK.cream} rotate={-3}>
              <Star size={14} color={BOOK.orange} />
              一本給家庭的旅行繪本
              <Star size={14} color={BOOK.orange} />
            </StickerBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              ease: [0.34, 1.25, 0.64, 1],
            }}
            className="mt-12 text-center font-display font-semibold leading-[1.05] text-[52px] md:text-[92px]"
            style={{ color: BOOK.ink }}
          >
            帶孩子
            <br />
            <span style={{ color: BOOK.orangeDeep }}>走進故事書</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="mt-10 mx-auto max-w-2xl text-center font-body text-lg md:text-xl leading-[1.95]"
            style={{ color: BOOK.inkSoft }}
          >
            旅行不是行程表、是孩子記憶裡的一頁。
            <br />
            我們把每一趟旅程設計成一本書、每一天是一個章節、
            <br />
            每一張照片、都會印在他長大的故事裡。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55 }}
            className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <StoryButton size="lg" onClick={onSeeAll}>
              翻開故事目錄
            </StoryButton>
            <StoryButton
              size="lg"
              variant="ghost"
              onClick={() => onSelectTour(heroTour.slug)}
            >
              先看京都這本 →
            </StoryButton>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── 介紹段落（左圖右文）─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.34, 1.2, 0.64, 1] }}
            className="md:col-span-5 relative"
          >
            <StorybookCard rotate={-2} className="aspect-[4/5]">
              <Image
                src={heroTour.galleryImages[0]}
                alt="繪本旅行"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              {/* 圖上貼紙 */}
              <div className="absolute top-4 right-4">
                <StickerBadge color={BOOK.orange} rotate={4}>
                  <Star size={12} color={BOOK.ink} />
                  Chapter 01
                </StickerBadge>
              </div>
            </StorybookCard>

            {/* 旁邊的對話氣球 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.4, 0.64, 1] }}
              className="absolute -bottom-6 -right-4 max-w-[180px] hidden md:block"
            >
              <SpeechBubble color={BOOK.sky} textColor={BOOK.cream} tailDir="left">
                媽媽看！
                <br />
                那是稻荷神社的狐狸耶！
              </SpeechBubble>
            </motion.div>

            {/* 飄浮裝飾 */}
            <FloatingDecor className="absolute -top-8 -left-8" delay={1}>
              <Flower size={48} color={BOOK.blossom} />
            </FloatingDecor>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.34, 1.2, 0.64, 1],
            }}
            className="md:col-span-7"
          >
            <ChapterLabel>About Corner Family</ChapterLabel>
            <h2
              className="mt-8 font-display font-semibold leading-[1.18] text-[34px] md:text-[48px]"
              style={{ color: BOOK.ink }}
            >
              不是「帶孩子去玩」、
              <br />
              是「讓孩子留下
              <span style={{ color: BOOK.orangeDeep }}>故事</span>」。
            </h2>
            <p
              className="mt-8 font-body text-base md:text-lg leading-[1.95]"
              style={{ color: BOOK.inkSoft }}
            >
              我們不是旅行社、是專做家庭旅行的故事策劃。
              每一條行程的設計、都從「這個孩子十年後會記得什麼」開始想。
            </p>
            <p
              className="mt-6 font-body text-base md:text-lg leading-[1.95]"
              style={{ color: BOOK.inkSoft }}
            >
              所以我們堅持小團（每團 14 人以下、其中含孩子最多 8 個）、
              專屬兒童導遊、每天為每個家庭拍下一張全家福、
              回家後寄一本印刷裝訂的旅行繪本到家裡。
            </p>

            <div
              className="mt-10 pt-8 grid grid-cols-3 gap-4"
              style={{ borderTop: `2px dashed ${BOOK.line}` }}
            >
              <Stat n="74" label="出團家庭" />
              <Stat n="186" label="孩子的第一次飛機" />
              <Stat n="612" label="本旅行繪本寄到家" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── 故事目錄（4 條 tour）─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: BOOK.paperLight }}
      >
        <FloatingDecor className="absolute top-12 right-[8%]" delay={0.5}>
          <PaperPlane size={64} color={BOOK.skyDeep} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-32 left-[6%]" delay={1.8}>
          <Tree size={72} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16 md:mb-20">
            <ChapterLabel align="center">Story Index</ChapterLabel>
            <h2
              className="mt-8 font-display font-semibold leading-[1.12] text-[40px] md:text-[64px]"
              style={{ color: BOOK.ink }}
            >
              2026 年的
              <br />
              <span style={{ color: BOOK.orangeDeep }}>四本故事書</span>
            </h2>
            <p
              className="mt-8 mx-auto max-w-2xl font-body text-base md:text-lg leading-[1.9]"
              style={{ color: BOOK.inkSoft }}
            >
              每一本厚厚的、彩色印刷、不重複。
              翻開一本、就是一場屬於你們全家的冒險。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {tours.map((tour, i) => (
              <StoryCard
                key={tour.slug}
                tour={tour}
                index={i}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <StoryButton variant="outline" size="lg" onClick={onSeeAll}>
              翻完目錄看更多 →
            </StoryButton>
          </div>
        </div>
      </section>

      {/* ─────────────── 家庭專屬服務 ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">
        <FloatingDecor className="absolute top-32 left-[5%]" delay={2.2}>
          <Star size={36} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-48 right-[8%]" delay={0.7}>
          <Star size={28} color={BOOK.sky} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-40 left-[12%]" delay={1.4}>
          <Moon size={56} color={BOOK.skyLight} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <ChapterLabel align="center">Family Promise</ChapterLabel>
            <h2
              className="mt-8 font-display font-semibold leading-[1.15] text-[36px] md:text-[56px]"
              style={{ color: BOOK.ink }}
            >
              我們為家庭
              <br />
              準備了
              <span style={{ color: BOOK.orangeDeep }}>四個禮物</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {FAMILY_VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.34, 1.2, 0.64, 1],
                }}
              >
                <StorybookCard
                  rotate={i % 2 === 0 ? -0.8 : 0.8}
                  className="h-full p-8 md:p-10 flex gap-6 hover:rotate-0 transition-transform duration-500"
                >
                  <div className="shrink-0">{v.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <StickerBadge
                        color={v.badgeColor}
                        rotate={i % 2 === 0 ? 2 : -2}
                      >
                        Gift 0{v.n}
                      </StickerBadge>
                    </div>
                    <h3
                      className="font-display font-semibold text-2xl md:text-[28px] leading-snug mb-4"
                      style={{ color: BOOK.ink }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="font-body text-base leading-[1.95]"
                      style={{ color: BOOK.inkSoft }}
                    >
                      {v.body}
                    </p>
                  </div>
                </StorybookCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ background: BOOK.ink, color: BOOK.cream }}
      >
        <FloatingDecor className="absolute top-12 left-[10%]" delay={0}>
          <Star size={32} color={BOOK.cream} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-24 right-[15%]" delay={1.2}>
          <Star size={24} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-20 left-[20%]" delay={2.4}>
          <Star size={20} color={BOOK.skyLight} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-32 right-[10%]" delay={0.6}>
          <Moon size={64} color={BOOK.cream} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-3xl text-center">
          <ChapterLabel align="center" starColor={BOOK.orangeLight}>
            The Last Page
          </ChapterLabel>
          <h2
            className="mt-10 font-display font-semibold leading-[1.18] text-[40px] md:text-[64px]"
            style={{ color: BOOK.cream }}
          >
            最後一頁、
            <br />
            是<span style={{ color: BOOK.orangeLight }}>合照</span>跟一句
            <br />
            「明年要去哪？」
          </h2>
          <p
            className="mt-10 mx-auto max-w-xl font-body text-base md:text-lg leading-[2]"
            style={{ color: 'rgba(255,251,243,0.78)' }}
          >
            這就是我們設計每一趟旅行的目標。
            讓孩子在合照背後、自己寫上一句話。
          </p>
          <div className="mt-12 flex justify-center">
            <StoryButton size="lg" onClick={onSeeAll}>
              開始寫第一本 →
            </StoryButton>
          </div>
        </div>
      </section>

      <StorybookFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Story card — 故事目錄上的單一卡片
// ─────────────────────────────────────────────────────

function StoryCard({
  tour,
  index,
  onClick,
}: {
  tour: Tour;
  index: number;
  onClick: () => void;
}) {
  const rotate = index % 2 === 0 ? -1.2 : 1.2;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay: (index % 2) * 0.12,
        ease: [0.34, 1.2, 0.64, 1],
      }}
      whileHover={{ rotate: 0, scale: 1.015 }}
      className="text-left group"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <StorybookCard className="h-full">
        <div className="relative aspect-[4/3]">
          <Image
            src={tour.heroImage}
            alt={tour.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* 圖上 sticker */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <StickerBadge color={BOOK.cream} rotate={-3}>
              第 {index + 1} 本
            </StickerBadge>
          </div>
          <div className="absolute top-5 right-5">
            <StickerBadge color={BOOK.orange} rotate={4}>
              {CATEGORY_TAG[tour.category]}
            </StickerBadge>
          </div>
          {/* 底部漸層遮罩 */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background:
                'linear-gradient(180deg, rgba(43,60,107,0) 0%, rgba(43,60,107,0.55) 100%)',
            }}
          />
          {/* 左下 category icon */}
          <div className="absolute bottom-4 left-5">
            <CategoryIcon category={tour.category} size={36} />
          </div>
        </div>

        <div className="p-8 md:p-10">
          <p
            className="font-body font-semibold text-xs tracking-[0.28em] uppercase mb-3"
            style={{ color: BOOK.orangeDeep }}
          >
            {CATEGORY_LABEL[tour.category]}
          </p>
          <h3
            className="font-display font-semibold leading-[1.15] text-2xl md:text-[30px] mb-4"
            style={{ color: BOOK.ink }}
          >
            {tour.title}
          </h3>
          <p
            className="font-body text-base leading-[1.85] mb-6"
            style={{ color: BOOK.inkSoft }}
          >
            {tour.subtitle}
          </p>

          <HairLine dashed />

          <div className="pt-6 flex items-end justify-between gap-6">
            <div>
              <p
                className="font-body text-xs font-medium tracking-wider mb-2"
                style={{ color: BOOK.inkFaint }}
              >
                {CATEGORY_AGE[tour.category]}
              </p>
              <p
                className="font-body text-sm font-semibold"
                style={{ color: BOOK.sky }}
              >
                {tour.duration}
              </p>
            </div>
            <div className="text-right">
              <p
                className="font-body text-xs tracking-wider mb-1"
                style={{ color: BOOK.inkFaint }}
              >
                親子起價
              </p>
              <p
                className="font-display font-semibold text-2xl"
                style={{ color: BOOK.ink }}
              >
                {formatPrice(tour.priceFrom)}
              </p>
            </div>
          </div>

          <div
            className="mt-6 inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wider transition-all group-hover:gap-3"
            style={{ color: BOOK.orangeDeep }}
          >
            翻開這本書
            <span aria-hidden>→</span>
          </div>
        </div>
      </StorybookCard>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────
// Stat — 介紹段落的小統計
// ─────────────────────────────────────────────────────

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p
        className="font-display font-semibold text-3xl md:text-4xl"
        style={{ color: BOOK.orangeDeep }}
      >
        {n}
      </p>
      <p
        className="mt-2 font-body text-xs leading-snug"
        style={{ color: BOOK.inkSoft }}
      >
        {label}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────

export function StorybookFooter() {
  return (
    <footer
      className="px-6 md:px-12 py-16 md:py-20 relative overflow-hidden"
      style={{ background: BOOK.paperWarm, color: BOOK.ink }}
    >
      <FloatingDecor className="absolute top-8 right-[8%]" delay={0}>
        <Cloud size={80} color={BOOK.cream} />
      </FloatingDecor>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Globe size={40} />
              <span
                className="font-display font-semibold text-2xl"
                style={{ color: BOOK.ink }}
              >
                角落
              </span>
            </div>
            <p
              className="font-body text-sm leading-[1.95]"
              style={{ color: BOOK.inkSoft }}
            >
              角落旅行社・親子繪本系列
              <br />
              漫途旅遊旗下品牌
              <br />
              交觀甲 7654 號 / 品保中 1234
            </p>
          </div>

          <div>
            <p
              className="font-body font-semibold text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: BOOK.orangeDeep }}
            >
              How to Contact
            </p>
            <p
              className="font-body text-sm leading-[1.95]"
              style={{ color: BOOK.inkSoft }}
            >
              台北市信義區松仁路 28 號 12 樓
              <br />
              02-2345-6789
              <br />
              family@corner-travel.tw
            </p>
          </div>

          <div>
            <p
              className="font-body font-semibold text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: BOOK.orangeDeep }}
            >
              Office Hours
            </p>
            <p
              className="font-body text-sm leading-[1.95]"
              style={{ color: BOOK.inkSoft }}
            >
              週一至週五 10:00–19:00
              <br />
              週六 11:00–17:00
              <br />
              週日陪家人去
            </p>
          </div>
        </div>

        <HairLine dashed />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="font-body text-xs"
            style={{ color: BOOK.inkSoft }}
          >
            © 2026 Corner Travel — Family Edition · A Venturo Brand
          </p>
          <div className="flex items-center gap-3">
            <Star size={14} color={BOOK.orange} />
            <p
              className="font-body text-xs"
              style={{ color: BOOK.inkSoft }}
            >
              Written in Taipei · Read Worldwide
            </p>
            <Star size={14} color={BOOK.orange} />
          </div>
        </div>
      </div>
    </footer>
  );
}
