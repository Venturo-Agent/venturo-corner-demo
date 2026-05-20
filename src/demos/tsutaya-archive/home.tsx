'use client';

/**
 * Home — Tsutaya Archive landing view
 *
 * 結構（書店書屋感、不是無印 catalog）：
 *   1. Topbar：書屋招牌、卷次標
 *   2. Hero：左 hero 圖（書頁夾照感 4:5 直幅）+ 右書名頁排版（書名、卷號、編者語）
 *   3. Editorial Preface：書頁裝飾雙線中夾「序」、雙欄文字（像書序）
 *   4. Bookshelf：4 條 tour 像書架陳列（書脊裝飾 + 立卡）
 *   5. Editor's Selection：編者推薦語（一段話 + 引用線）
 *   6. Shop Values：4 條「本店主張」、像書店的「擇書原則」
 *   7. CTA：書末邀請
 *   8. Footer
 *
 * 書店感的關鍵：
 *   - hero 圖直幅 4:5、像夾在書頁中
 *   - 雙欄文字段落（max-w-3xl 兩欄）
 *   - 編號用「卷 一」中文卷號 + 「藏書 042」
 *   - 細線多、雙線多、書頁裝飾感
 *   - hover 用 underline 滑出像書籤
 *   - 文案用「藏書家挑書」口吻
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  TSUTAYA,
  ArchiveTag,
  BookTitle,
  TsutayaButton,
  BookmarkLink,
  Hair,
  DoubleHair,
  FolioMark,
  PageNumber,
  PhotoCaption,
  BRAND,
  CATEGORY_LABEL,
  volName,
} from './shared';

const heroTour = tours[0];

// 本店主張（書店的擇書原則、跟「為什麼選擇我們」不同口吻）
const SHOP_VALUES = [
  {
    n: 1,
    title: '一年只引入四本',
    body: '我們每年只選四條路線。\n不是賣不出去更多、\n而是不想讓任何一本書，沒被認真讀完。',
  },
  {
    n: 2,
    title: '每本書限十四位讀者',
    body: '小團上限十四人。\n小到能在一張長桌讀書，\n大到不會讓任何一個人讀到一半被冷落。',
  },
  {
    n: 3,
    title: '住宿親自讀過一遍',
    body: '所有旅館我們派人去住過一晚。\n不收線上評分、不看部落客文字，\n只收我們自己讀過的書。',
  },
  {
    n: 4,
    title: '領隊是隨書編者',
    body: '中文領隊全程隨團，\n像書店裡跟你介紹一本書的編者，\n而不是只送你到櫃台的店員。',
  },
];

type Props = {
  onSelectTour: (slug: string) => void;
  onSeeAll: () => void;
};

export default function HomeView({ onSelectTour, onSeeAll }: Props) {
  return (
    <div style={{ background: TSUTAYA.paper, color: TSUTAYA.ink }}>
      {/* ─────────────── Topbar（書屋招牌） ─────────────── */}
      <TsutayaTopbar onHome={() => undefined} onSeeAll={onSeeAll} active="home" />

      {/* ─────────────── Hero（書名頁感） ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* 左：書頁感直幅圖 + 圖說 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-6"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={heroTour.heroImage}
                  alt={heroTour.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* 細書頁邊框 */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${TSUTAYA.line}`,
                  }}
                />
              </div>
              <PhotoCaption fig={1}>
                {heroTour.destination} · {heroTour.title}
              </PhotoCaption>
            </motion.div>

            {/* 右：書名頁排版 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-6 md:pt-8"
            >
              <ArchiveTag vol="序">Preface</ArchiveTag>

              <h1
                className="font-display mt-10 leading-[1.35] text-3xl md:text-[42px]"
                style={{
                  color: TSUTAYA.ink,
                  whiteSpace: 'pre-line',
                  fontWeight: 500,
                }}
              >
                {BRAND.homeStatement}
              </h1>

              {/* 雙細線（書頁裝飾） */}
              <div className="mt-10">
                <DoubleHair />
              </div>

              <p
                className="mt-10 font-body text-sm md:text-base leading-[2.1]"
                style={{
                  color: TSUTAYA.brownSoft,
                  whiteSpace: 'pre-line',
                }}
              >
                {BRAND.homeStatementSub}
              </p>

              <div className="mt-12 flex items-baseline gap-10">
                <TsutayaButton onClick={onSeeAll}>
                  走進書店
                </TsutayaButton>
                <BookmarkLink
                  onClick={() => onSelectTour(heroTour.slug)}
                >
                  先翻開：{heroTour.title}
                </BookmarkLink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── Editorial Preface（編者序） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: TSUTAYA.paperSoft }}
      >
        <div className="mx-auto max-w-4xl">
          <DoubleHair />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="py-20 md:py-24"
          >
            <ArchiveTag vol={volName(1)} align="center">
              Editorial Note
            </ArchiveTag>

            {/* 編者語 — 雙欄、像書序、置中標題 + 雙欄正文 */}
            <BookTitle level={2} align="center" className="mt-12">
              關於這間書店
            </BookTitle>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
              <p
                className="font-body text-sm md:text-[15px] leading-[2.2]"
                style={{ color: TSUTAYA.brownSoft }}
              >
                角落書屋成立於二〇一八年，
                <br />
                我們不是旅行社，
                <br />
                我們是書店——
                <br />
                只是這裡的書，要用腳去讀。
                <br />
                <br />
                每年的目錄，是編者從五十條路線
                <br />
                裡挑出的四本。其餘的四十六條，
                <br />
                我們也讀過、踏過，但留在後面。
              </p>
              <p
                className="font-body text-sm md:text-[15px] leading-[2.2]"
                style={{ color: TSUTAYA.brownSoft }}
              >
                為什麼是四本？
                <br />
                因為讀一本好書要時間，
                <br />
                編一本好書更要時間。
                <br />
                我們相信，沒有讀完的旅行，
                <br />
                跟沒有讀完的書一樣可惜。
                <br />
                <br />
                這一本本「書」，
                <br />
                等著被翻開、被讀慢、
                <br />
                被你寫上自己的指紋。
              </p>
            </div>
          </motion.div>

          <DoubleHair />
        </div>
      </section>

      {/* ─────────────── Bookshelf（4 tour 書架陳列） ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 md:mb-20">
            <ArchiveTag vol={volName(2)}>Bookshelf</ArchiveTag>
            <BookTitle
              level={1}
              className="mt-8"
              subtitle="本季四本、皆已親自讀完一遍。"
            >
              二〇二六年度
              <br />
              本季陳列
            </BookTitle>
          </div>

          <Hair />

          {/* 書架感：4 卡橫向陳列、卡片間有書脊感細直線 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {tours.map((tour, i) => (
              <BookshelfCard
                key={tour.slug}
                tour={tour}
                index={i}
                isLast={i === tours.length - 1}
                onClick={() => onSelectTour(tour.slug)}
              />
            ))}
          </div>

          <Hair />

          <div className="mt-12 flex items-baseline justify-between">
            <span
              className="font-body text-xs"
              style={{
                color: TSUTAYA.brownFaint,
                letterSpacing: '0.1em',
              }}
            >
              本季陳列 {String(tours.length).padStart(2, '0')} 本 · 持續更新
            </span>
            <BookmarkLink onClick={onSeeAll}>
              查看本店所有書目
            </BookmarkLink>
          </div>
        </div>
      </section>

      {/* ─────────────── Editor's Selection（編者推薦語） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: TSUTAYA.straw }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <ArchiveTag vol={volName(3)} align="center">
            Editor&apos;s Note
          </ArchiveTag>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="mt-14 font-display text-xl md:text-2xl leading-[2]"
            style={{
              color: TSUTAYA.ink,
              fontWeight: 500,
              whiteSpace: 'pre-line',
            }}
          >
            {BRAND.editorialNote}
          </motion.p>

          <div className="mt-14 flex justify-center">
            <div
              className="font-body text-xs"
              style={{
                color: TSUTAYA.brownSoft,
                letterSpacing: '0.2em',
              }}
            >
              — 角落書屋 編者
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Shop Values（本店主張） ─────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <ArchiveTag vol={volName(4)}>House Rules</ArchiveTag>
          <BookTitle
            level={2}
            className="mt-8"
            subtitle="這間書店的擇書原則。"
          >
            本店主張
          </BookTitle>

          <div className="mt-16">
            <Hair />
            {SHOP_VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                }}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[88px_1fr] gap-6 md:gap-10 py-10 md:py-12"
                style={{ borderBottom: `1px solid ${TSUTAYA.lineSoft}` }}
              >
                <div>
                  <span
                    className="font-display text-base md:text-lg block"
                    style={{
                      color: TSUTAYA.brown,
                      letterSpacing: '0.15em',
                      fontWeight: 500,
                    }}
                  >
                    第{volName(v.n)}則
                  </span>
                </div>
                <div>
                  <h3
                    className="font-display text-lg md:text-xl mb-4 leading-snug"
                    style={{ color: TSUTAYA.ink, fontWeight: 500 }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-[2.1]"
                    style={{
                      color: TSUTAYA.brownSoft,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA（書末邀請） ─────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        style={{ background: TSUTAYA.paperSoft }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <ArchiveTag vol="跋" align="center">
            Epilogue
          </ArchiveTag>
          <h2
            className="font-display mt-10 leading-[1.5] text-2xl md:text-3xl"
            style={{ color: TSUTAYA.ink, fontWeight: 500 }}
          >
            把下一個假期，
            <br />
            交給一本好書。
          </h2>
          <p
            className="mt-10 font-body text-sm md:text-base leading-[2]"
            style={{ color: TSUTAYA.brownSoft }}
          >
            走進書屋，看本季的四本書，
            <br />
            選一本你想讀完整本的旅行。
          </p>
          <div className="mt-14">
            <TsutayaButton size="lg" onClick={onSeeAll}>
              走進書店
            </TsutayaButton>
          </div>
        </div>
      </section>

      <TsutayaFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Topbar — 書屋招牌（可在頁面間共用）
// 跟 muji topbar 對比：muji 招牌只一行「CORNER」工業感
//                   蔦屋招牌有「角落書屋 · 蔦屋書屋系列」雙行招牌感
// ─────────────────────────────────────────────────────

export function TsutayaTopbar({
  onHome,
  onSeeAll,
  active,
  rightLabel,
}: {
  onHome: () => void;
  onSeeAll: () => void;
  active: 'home' | 'shelf' | 'detail' | 'reading' | 'reserve';
  rightLabel?: string;
}) {
  const _ = active; // 暫時不依 active 改樣式、保留 props
  void _;
  return (
    <header
      className="px-6 md:px-12 py-6"
      style={{ borderBottom: `1px solid ${TSUTAYA.line}` }}
    >
      <div className="mx-auto max-w-6xl flex items-baseline justify-between">
        <button
          onClick={onHome}
          className="flex items-baseline gap-5 transition-opacity hover:opacity-70"
        >
          <span
            className="font-display text-base"
            style={{
              color: TSUTAYA.ink,
              fontWeight: 500,
              letterSpacing: '0.1em',
            }}
          >
            {BRAND.marque}
          </span>
          <span
            aria-hidden
            className="hidden md:block w-px h-3"
            style={{ background: TSUTAYA.line }}
          />
          <span
            className="hidden md:inline font-body text-xs"
            style={{
              color: TSUTAYA.brownSoft,
              letterSpacing: '0.15em',
            }}
          >
            {BRAND.marqueZh} · {BRAND.marqueSub}
          </span>
        </button>
        <div className="flex items-baseline gap-8">
          <button
            onClick={onSeeAll}
            className="font-body text-xs transition-opacity hover:opacity-60"
            style={{
              color: TSUTAYA.ink,
              letterSpacing: '0.1em',
            }}
          >
            書目一覽
          </button>
          <span
            className="font-body text-xs hidden md:inline"
            style={{
              color: TSUTAYA.brownFaint,
              letterSpacing: '0.15em',
            }}
          >
            {rightLabel ?? BRAND.established}
          </span>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────
// BookshelfCard — 書架陳列卡（書脊裝飾 + 立卡）
//
// 跟 muji CatalogCard 對比：
//   muji 是工業 catalog 卡（圖 1:1、純規則網格）
//   蔦屋是書架立卡（圖 3:4 直幅、書脊感、藏書編號）
// ─────────────────────────────────────────────────────

function BookshelfCard({
  tour,
  index,
  isLast,
  onClick,
}: {
  tour: Tour;
  index: number;
  isLast: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      className="group relative text-left p-6 md:p-8 transition-all hover:bg-[color:var(--paper-soft)]"
      style={{
        // 右側書脊感細直線（最後一張不顯示）
        borderRight: isLast ? 'none' : `1px solid ${TSUTAYA.lineSoft}`,
      }}
    >
      {/* 卡片頂端：藏書編號 + 類別 */}
      <div className="flex items-baseline justify-between mb-5">
        <FolioMark n={index + 1} />
        <span
          className="font-body text-[10px]"
          style={{
            color: TSUTAYA.brownFaint,
            letterSpacing: '0.15em',
          }}
        >
          {CATEGORY_LABEL[tour.category]}
        </span>
      </div>

      {/* 直幅書頁圖 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden mb-6">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition-opacity duration-700 group-hover:opacity-90"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ boxShadow: `inset 0 0 0 1px ${TSUTAYA.line}` }}
        />
      </div>

      {/* 書名 */}
      <h3
        className="font-display text-base md:text-lg leading-[1.4] mb-3"
        style={{ color: TSUTAYA.ink, fontWeight: 500 }}
      >
        <span
          className="inline border-b border-transparent transition-colors duration-500 group-hover:border-current pb-[2px]"
        >
          {tour.title}
        </span>
      </h3>

      {/* 副標 */}
      <p
        className="font-body text-xs leading-[1.95] mb-6 line-clamp-2"
        style={{ color: TSUTAYA.brownSoft }}
      >
        {tour.subtitle}
      </p>

      {/* 細線 + 規格 + 價格 */}
      <div
        className="pt-4 flex items-baseline justify-between"
        style={{ borderTop: `1px solid ${TSUTAYA.lineSoft}` }}
      >
        <span
          className="font-body text-[10px]"
          style={{
            color: TSUTAYA.brownFaint,
            letterSpacing: '0.12em',
          }}
        >
          {tour.duration}
        </span>
        <div className="text-right">
          <span
            className="font-body text-[10px] block"
            style={{
              color: TSUTAYA.brownFaint,
              letterSpacing: '0.15em',
            }}
          >
            自
          </span>
          <span
            className="font-display text-sm mt-1 block"
            style={{ color: TSUTAYA.ink, fontWeight: 500 }}
          >
            {formatPrice(tour.priceFrom)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────
// Footer — 書屋的 footer
// 跟 muji 對比：muji 是工業 catalog footer
//             蔦屋是書末版權頁感（出版資訊、書屋地址、藏書編號）
// ─────────────────────────────────────────────────────

export function TsutayaFooter() {
  return (
    <footer
      className="px-6 md:px-12 pt-24 pb-12"
      style={{
        background: TSUTAYA.paper,
        borderTop: `1px solid ${TSUTAYA.line}`,
        color: TSUTAYA.ink,
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* 版權頁裝飾雙線 */}
        <div className="mb-16">
          <DoubleHair />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* 左：書屋招牌 */}
          <div className="md:col-span-5">
            <p
              className="font-display text-xl"
              style={{
                color: TSUTAYA.ink,
                fontWeight: 500,
                letterSpacing: '0.1em',
              }}
            >
              {BRAND.marque}
            </p>
            <p
              className="font-body text-sm mt-3"
              style={{
                color: TSUTAYA.brownSoft,
                letterSpacing: '0.1em',
              }}
            >
              {BRAND.marqueZh} · {BRAND.marqueSub}
            </p>
            <p
              className="mt-10 font-body text-xs leading-[2] max-w-sm"
              style={{ color: TSUTAYA.brownSoft }}
            >
              漫途旅遊旗下品牌。
              <br />
              交觀甲 7654 號 / 品保中 1234。
              <br />
              {BRAND.established}。
            </p>
          </div>

          {/* 中：聯絡 */}
          <div className="md:col-span-4">
            <p
              className="font-display text-xs mb-5 pb-3"
              style={{
                color: TSUTAYA.brown,
                letterSpacing: '0.2em',
                borderBottom: `1px solid ${TSUTAYA.line}`,
              }}
            >
              書屋地址
            </p>
            <p
              className="font-body text-xs leading-[2.1]"
              style={{ color: TSUTAYA.ink }}
            >
              臺北市信義區
              <br />
              松仁路二十八號十二樓
              <br />
              02-2345-6789
              <br />
              hello@corner-travel.tw
            </p>
          </div>

          {/* 右：營業 */}
          <div className="md:col-span-3">
            <p
              className="font-display text-xs mb-5 pb-3"
              style={{
                color: TSUTAYA.brown,
                letterSpacing: '0.2em',
                borderBottom: `1px solid ${TSUTAYA.line}`,
              }}
            >
              開店時間
            </p>
            <p
              className="font-body text-xs leading-[2.1]"
              style={{ color: TSUTAYA.ink }}
            >
              週一至週五
              <br />
              10:00 – 19:00
              <br />
              週六 11:00 – 17:00
              <br />
              週日休息
            </p>
          </div>
        </div>

        <Hair />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p
            className="font-body text-[10px]"
            style={{
              color: TSUTAYA.brownFaint,
              letterSpacing: '0.15em',
            }}
          >
            © 2026 Corner Travel · A Venturo Brand
          </p>
          <PageNumber n={1} total={1} />
        </div>
      </div>
    </footer>
  );
}
