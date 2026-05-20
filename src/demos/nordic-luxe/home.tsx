'use client';

/**
 * Home — landing view（北歐極簡奢華 Nordic Luxe）
 *
 * 結構（hotel website 慣例）：
 *   1. Hero：高度 75vh（不全屏）、圖中下方一句話標 + 細線 + 短副標 + 大量空 + CTA
 *      圖佔上方 ~70%、文字壓在圖下方 ~30% 留白區（黃金 1:3）
 *   2. Quiet intro：一段極短的品牌句、左右大幅留白
 *   3. Featured 4 條 tour 預覽：產品攝影風、單欄垂直、每張圖大、配 caption
 *   4. 品牌價值 4 條：行式排版、左 number / 中 title / 右 body
 *   5. CTA：細水平線 + 標題 + button
 *
 * 跟 alpine-serenity 排版的差異：
 *   - alpine hero 94vh + 圖上文字壓在圖上、nordic 75vh + 文字在圖下方
 *   - alpine featured 不對稱 grid（左 7 右 5 交錯）、nordic 單欄 stack（產品 catalog）
 *   - alpine values 用 GPS 座標、nordic 用 caption 編號 + 商品 spec 風
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { tours, type Tour, findTourBySlug } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  NORDIC,
  CaptionLabel,
  QuietLabel,
  NordicButton,
  HairLine,
  CATEGORY_LABEL,
  LightTitle,
  PhotoFrame,
  NORDIC_EASE,
  NORDIC_EASE_LONG,
} from './shared';

// hero 用北歐極光圖（nordic-aurora heroImage）— vibe 對齊
const heroTour = findTourBySlug('nordic-aurora') ?? tours[0];

// 四個品牌價值、文案重寫、扣回「極簡、安靜、住得好、慢慢看」氣質
const VALUES = [
  {
    n: '01',
    title: '每團上限十四人',
    body: '人數嚴格上限。我們認為旅行的安靜、不該被一支三十人的隊伍打斷。同行的人少、看到的細節才多。',
  },
  {
    n: '02',
    title: '住宿親自踏過',
    body: '從北歐玻璃屋、京都町家、到南島森林山屋——每一間都是團隊親自住過、確認過、才放進名單。沒住過的、我們不賣。',
  },
  {
    n: '03',
    title: '一天兩到三件事',
    body: '不塞滿景點。一天兩到三個主要安排、留出讓你呼吸的空白。深度不靠數量、靠停留的時間。',
  },
  {
    n: '04',
    title: '中文領隊全程隨團',
    body: '所有出團配備經驗五年以上的中文領隊。沒有自由行的孤獨、也沒有大團的吵雜。',
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div style={{ background: NORDIC.paper, color: NORDIC.ink }}>
      {/* ─────────────── Hero（75vh、圖在上、文字在圖下方）─────────────── */}
      <section
        className="px-10 md:px-20 pt-12 md:pt-16"
        style={{ background: NORDIC.paper }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: NORDIC_EASE }}
            className="flex items-center justify-between mb-12 md:mb-16"
          >
            <span
              className="font-display text-[10px] tracking-[0.4em] uppercase"
              style={{ color: NORDIC.ink, fontWeight: 400 }}
            >
              Corner Travel
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase hidden md:inline"
              style={{ color: NORDIC.stone }}
            >
              Est. 2018  ·  Taipei
            </span>
          </motion.div>

          {/* Hero image — 高度 60vh、不是全屏、像 hotel landing 攝影 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: NORDIC_EASE_LONG }}
            className="relative w-full overflow-hidden"
            style={{ height: '60vh', minHeight: '520px' }}
          >
            <Image
              src={heroTour.heroImage}
              alt={heroTour.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: 'grayscale(0.08) brightness(0.97) contrast(1.02)' }}
            />
            {/* 極淡的米色 overlay、不暗化 — 北歐攝影感 */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(28,27,25,0.05) 0%, rgba(28,27,25,0.0) 30%, rgba(28,27,25,0.18) 100%)',
              }}
            />
          </motion.div>

          {/* Caption（圖下方右側、像建築攝影署名）*/}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-4 flex items-baseline justify-between"
          >
            <QuietLabel>Volume Four  ·  Nordic Luxe</QuietLabel>
            <QuietLabel color={NORDIC.stoneSoft}>
              {heroTour.destination}
            </QuietLabel>
          </motion.div>

          {/* 標題區（圖下方、大量留白）*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: NORDIC_EASE_LONG }}
            className="mt-24 md:mt-40 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end"
          >
            <div className="md:col-span-7">
              <LightTitle
                as="h1"
                className="text-[44px] md:text-[80px]"
                style={{ lineHeight: 1.08 }}
              >
                把日子
                <br />
                住得慢一點。
              </LightTitle>
            </div>
            <div className="md:col-span-5 md:pb-2">
              <div
                className="h-px w-12 mb-10"
                style={{ background: NORDIC.stone }}
              />
              <p
                className="text-[15px] leading-[2.05] max-w-md"
                style={{ color: NORDIC.inkSoft }}
              >
                我們不做趕場式的觀光、也不做塞滿景點的行程。
                一年精選四條深度路線、每團不超過十四人、住宿全部親自踏過。
              </p>
              <div className="mt-12 flex items-center gap-10">
                <NordicButton size="lg" onClick={onSeeAll}>
                  探索行程
                </NordicButton>
                <button
                  onClick={() => onSelectTour(heroTour.slug)}
                  className="font-display text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-65 flex items-center gap-3"
                  style={{ color: NORDIC.ink, fontWeight: 400 }}
                >
                  精選旅程
                  <ArrowRight size={13} strokeWidth={1.2} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── Quiet intro 段落 ─────────────── */}
      <section className="px-10 md:px-20 pt-40 md:pt-56 pb-32 md:pb-44">
        <div className="mx-auto max-w-4xl text-center">
          <CaptionLabel align="center">Our Way of Travel</CaptionLabel>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.2, ease: NORDIC_EASE_LONG }}
            className="mt-16"
          >
            <LightTitle
              as="h2"
              className="text-[28px] md:text-[44px]"
              style={{ lineHeight: 1.45 }}
            >
              走得快、看得多
              <br />
              不一定是好的旅行。
              <br />
              我們選擇慢一點、
              <br />
              住久一點。
            </LightTitle>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mt-16 max-w-xl mx-auto text-[15px] leading-[2.1]"
            style={{ color: NORDIC.inkSoft }}
          >
            角落旅行社成立於 2018 年、以「全程不超過十四人」為核心。
            選擇我們的客人多半已經走過該走的路、想換一種把時間花出去的方式。
          </motion.p>
        </div>
      </section>

      {/* ─────────────── Featured Journeys（產品攝影 catalog 風）─────────────── */}
      <section
        className="px-10 md:px-20 pt-24 pb-40 md:pb-56"
        style={{ borderTop: `1px solid ${NORDIC.line}` }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-24 md:mb-32">
            <div>
              <CaptionLabel>Featured Journeys</CaptionLabel>
              <LightTitle
                as="h2"
                className="text-[36px] md:text-[56px] mt-10"
              >
                2026 年度
                <br />
                四條深度路線
              </LightTitle>
            </div>
            <button
              onClick={onSeeAll}
              className="font-display text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-65 flex items-center gap-3 self-start md:self-end"
              style={{ color: NORDIC.ink, fontWeight: 400 }}
            >
              查看全部行程
              <ArrowRight size={13} strokeWidth={1.2} />
            </button>
          </div>

          {/* 4 條 tour — 單欄垂直 stack、每條一張大圖配下方 caption */}
          <div className="space-y-32 md:space-y-44">
            {tours.map((tour, i) => (
              <FeaturedRow
                key={tour.slug}
                tour={tour}
                index={i}
                total={tours.length}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── Values（行式排版）─────────────── */}
      <section
        className="px-10 md:px-20 py-32 md:py-44"
        style={{ background: NORDIC.oak }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 md:mb-28">
            <CaptionLabel>Why Corner</CaptionLabel>
            <LightTitle
              as="h2"
              className="text-[36px] md:text-[52px] mt-10 max-w-2xl"
            >
              為什麼選擇我們
            </LightTitle>
          </div>

          {/* 4 條 value、橫向 grid 中的「行式」垂直 stack
              左 number / 中 title / 右 body、純細線分隔 */}
          <div>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.95,
                  delay: i * 0.08,
                  ease: NORDIC_EASE,
                }}
                className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-baseline"
                style={{
                  borderTop: `1px solid ${NORDIC.line}`,
                  borderBottom:
                    i === VALUES.length - 1
                      ? `1px solid ${NORDIC.line}`
                      : 'none',
                }}
              >
                <div className="md:col-span-2">
                  <span
                    className="font-mono text-[11px] tracking-[0.25em]"
                    style={{ color: NORDIC.stone }}
                  >
                    {v.n}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <LightTitle
                    as="h3"
                    className="text-2xl md:text-[28px]"
                    style={{ lineHeight: 1.35 }}
                  >
                    {v.title}
                  </LightTitle>
                </div>
                <div className="md:col-span-6">
                  <p
                    className="text-[15px] leading-[2.05]"
                    style={{ color: NORDIC.inkSoft }}
                  >
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA（極簡：細線 + 標題 + 一顆按鈕）─────────────── */}
      <section className="px-10 md:px-20 py-40 md:py-60">
        <div className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden
            className="block w-px h-20 mx-auto mb-16"
            style={{ background: NORDIC.stone }}
          />
          <CaptionLabel align="center">Begin Your Journey</CaptionLabel>
          <LightTitle
            as="h2"
            className="text-[32px] md:text-[52px] mt-12"
            style={{ lineHeight: 1.3 }}
          >
            下一個角落、
            <br />
            也許正等你拜訪。
          </LightTitle>
          <div className="mt-16">
            <NordicButton size="lg" onClick={onSeeAll}>
              探索全部行程
            </NordicButton>
          </div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FeaturedRow — 單欄產品攝影風卡片
// hotel landing 圖卡的 DNA：
//   - 圖很大（4:5）、置中
//   - 上方右側極小 caption（編號 / 類別）
//   - 圖下方：左 destination + 右 price 兩欄極簡
//   - 標題在圖下方 ~60px、字體大但 weight 300
//   - hover：圖縮小 1.02 → 1.0、右下出現「→ View Journey」浮現
// 跟 alpine FeaturedCard 對比：alpine 用 5:6 直立、座標條、不對稱 grid
//                              nordic 用 4:5、單欄、圖下 caption
// ─────────────────────────────────────────────────────

function FeaturedRow({
  tour,
  index,
  total,
  onClick,
}: {
  tour: Tour;
  index: number;
  total: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{
        duration: 1.1,
        ease: NORDIC_EASE_LONG,
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* 上方 caption 條：左編號 / 右類別 */}
      <div className="flex items-baseline justify-between mb-8">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="block"
            style={{
              width: 6,
              height: 6,
              background: NORDIC.stone,
            }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.25em]"
            style={{ color: NORDIC.stone }}
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span
            aria-hidden
            className="block w-8 h-px"
            style={{ background: NORDIC.line }}
          />
          <QuietLabel>{CATEGORY_LABEL[tour.category]}</QuietLabel>
        </div>
        <QuietLabel color={NORDIC.stoneSoft}>{tour.destination}</QuietLabel>
      </div>

      {/* 圖 — aspect 4:5、置中、hover 輕度縮小（鏡頭拉遠） */}
      <PhotoFrame aspect="aspect-[16/10] md:aspect-[16/9]">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 90vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.015]"
          style={{ filter: 'grayscale(0.06) brightness(0.98)' }}
        />
      </PhotoFrame>

      {/* 圖下方：左大標題 + 右 meta 兩欄 */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
        <div className="md:col-span-8">
          <LightTitle
            as="h3"
            className="text-[36px] md:text-[56px] transition-all group-hover:underline underline-offset-[16px] decoration-1"
            style={{ lineHeight: 1.1 }}
          >
            {tour.title}
          </LightTitle>
          <p
            className="mt-8 text-[15px] leading-[2.05] max-w-xl"
            style={{ color: NORDIC.inkSoft }}
          >
            {tour.subtitle}
          </p>
        </div>

        <div className="md:col-span-4 md:pb-3">
          <HairLine />
          <div className="pt-6 flex items-baseline justify-between">
            <div>
              <QuietLabel color={NORDIC.inkFaint}>Duration</QuietLabel>
              <p
                className="font-mono text-[14px] tracking-wider mt-2"
                style={{ color: NORDIC.ink, fontWeight: 300 }}
              >
                {tour.duration}
              </p>
            </div>
            <div className="text-right">
              <QuietLabel color={NORDIC.inkFaint}>From</QuietLabel>
              <p
                className="font-mono text-[18px] tracking-wider mt-2"
                style={{ color: NORDIC.ink, fontWeight: 300 }}
              >
                {formatPrice(tour.priceFrom)}
              </p>
            </div>
          </div>

          {/* hover 才浮現的 CTA 文字 */}
          <div
            className="mt-8 flex items-center gap-3 font-display text-[10px] tracking-[0.3em] uppercase transition-opacity opacity-60 group-hover:opacity-100"
            style={{ color: NORDIC.ink, fontWeight: 400 }}
          >
            <span>View Journey</span>
            <ArrowRight
              size={13}
              strokeWidth={1.2}
              className="transition-transform group-hover:translate-x-1.5"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────
// Footer — 四欄、米白底、極簡
// 跟 alpine footer 對比：少了 GPS 座標欄、改放工作室地址
// 北歐 hotel website 風：四欄、超細字、超大留白
// ─────────────────────────────────────────────────────

export function CornerFooter() {
  return (
    <footer
      className="px-10 md:px-20 pt-28 pb-12"
      style={{
        background: NORDIC.paper,
        color: NORDIC.ink,
        borderTop: `1px solid ${NORDIC.line}`,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5">
            <QuietLabel>Corner Travel</QuietLabel>
            <LightTitle as="h3" className="text-3xl mt-6 mb-8">
              角落旅行社
            </LightTitle>
            <p
              className="text-[13px] leading-[2]"
              style={{ color: NORDIC.inkSoft }}
            >
              漫途旅遊旗下品牌
              <br />
              交觀甲 7654 號  ·  品保中 1234
            </p>
          </div>

          <div className="md:col-span-3">
            <QuietLabel>Contact</QuietLabel>
            <p
              className="mt-6 text-[13px] leading-[2]"
              style={{ color: NORDIC.inkSoft }}
            >
              台北市信義區
              <br />
              松仁路 28 號 12 樓
              <br />
              02-2345-6789
              <br />
              hello@corner-travel.tw
            </p>
          </div>

          <div className="md:col-span-2">
            <QuietLabel>Hours</QuietLabel>
            <p
              className="mt-6 text-[13px] leading-[2]"
              style={{ color: NORDIC.inkSoft }}
            >
              一至五  10–19
              <br />
              六  11–17
              <br />
              日  休
            </p>
          </div>

          <div className="md:col-span-2">
            <QuietLabel>Studio</QuietLabel>
            <p
              className="mt-6 text-[13px] leading-[2]"
              style={{ color: NORDIC.inkSoft }}
            >
              Taipei
              <br />
              Designed quietly
              <br />
              Curated slowly
            </p>
          </div>
        </div>

        <HairLine />

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: NORDIC.stoneSoft }}
          >
            © 2026 Corner Travel  ·  A Venturo Brand
          </p>
          <p
            className="font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: NORDIC.stoneSoft }}
          >
            Volume Four  ·  Nordic Luxe
          </p>
        </div>
      </div>
    </footer>
  );
}
