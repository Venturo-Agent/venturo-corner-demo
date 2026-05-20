'use client';

/**
 * 紐約都會品味 — Manhattan Editorial
 *
 * 共用 token、原子元件。
 *
 * 靈感：The Standard High Line、Condé Nast Traveler、Vogue Editorial、
 *      New York Magazine、Travel + Leisure
 * vibe：黑白雜誌封面式、印刷感、犀利攝影、密集排版、都會精品店的精緻感、
 *      有「我們很懂」的傲氣
 *
 * 跟前 4 個 demo 的對比：
 *   - mediterranean：奢華優雅暖金沙 → manhattan：鋒利黑白駝
 *   - alpine：稀薄留白冷冽 → manhattan：密集堆疊都會
 *   - muji：節制禁慾平淡 → manhattan：張揚編輯傲氣
 *   - maldives：浮動慵懶寬鬆 → manhattan：銳利緊湊密集
 *
 * 配色（William 拍板、勿改）：
 *   #FFFFFF  紙白（主背景）
 *   #111111  油墨黑（次要面 + 文字）
 *   #C4A678  駝色（強調 / 細節 / number）
 *   #444444  中性灰（次要文字）
 *
 * 字型策略：
 *   - 標題用 font-display（Noto Serif TC）weight 600-700（雜誌粗體）
 *   - 字距小 / 不要大 tracking（雜誌粗體就是密實）
 *   - 小標 / metadata 用 mono 小字 + uppercase
 *   - 內文用 font-body 400-500
 *   - 可混用大小極端（120px 大標 + 10px 小字並排）
 *
 * 排版細節（密集派、非留白派）：
 *   - 比 mediterranean 更密集（堆疊資訊感）
 *   - 雜誌排版：article meta（ISSUE / VOL / DATE）、photo credit、bylines
 *   - column rule（細直線分欄）
 *   - hero 可全屏黑底 + 大白字 + 邊上 issue 標
 *   - photo 用 B&W filter（去飽和加對比）
 *   - 細「印刷瑕疵」紋路（grain / noise）但別過頭
 *   - spacing 用 8pt grid、緊湊些（多用 4 / 8 / 12 / 16、少 24 / 32 / 40）
 *
 * 互動：
 *   - hover：文字下劃線 swipe in、photo B&W → 原色
 *   - 入場動畫快（0.4s）、可考慮字一個個浮現
 *   - scroll hero 文字可微「印刷錯位」
 *
 * 紅線（globals.css 已 reset、再次強調、勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite（雜誌很愛 italic、但 globals.css reset）
 *   3. 嚴格對齊 + 8pt grid
 *   4. 不用 ul/ol marker、列點用方塊 / 數字 / 線條
 *   5. icon 不套圓框
 *   6. 不寫 lorem ipsum、扣回角落旅行社品牌（編輯口吻）
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token — 紐約都會
// ─────────────────────────────────────────────────────

export const NYC = {
  // 主四色
  paper: '#FFFFFF', // 紙白
  ink: '#111111', // 油墨黑
  camel: '#C4A678', // 駝色（強調）
  gray: '#444444', // 中性灰（次要文字）

  // 衍生
  paperWarm: '#FAFAF7', // 略暖紙白（替代 #FFFFFF 不刺眼處）
  paperCold: '#F4F4F4', // 略冷紙白（卡片底）
  paperEdge: '#E8E8E5', // 紙白邊緣（細邊）

  inkDeep: '#000000', // 純黑（極端對比處）
  inkSoft: '#1A1A1A', // 軟黑（內文）

  camelDeep: '#A88555', // 深駝（hover / accent）
  camelSoft: '#D9C19B', // 淺駝（背景塊）

  graySoft: '#666666', // 較亮的灰（body）
  grayFaint: '#888888', // 淡灰（metadata）
  grayMute: '#B5B5B5', // 弱化（disabled / hint）

  // 細線
  rule: '#1A1A1A', // 主分隔線（黑色細線、報紙感）
  ruleSoft: '#D8D8D5', // 次要分隔線（淡）
  ruleFaint: '#EEEDEA', // 最淡分隔線

  // 印刷瑕疵（noise overlay 用、半透明）
  grain: 'rgba(17,17,17,0.025)',
} as const;

// ─────────────────────────────────────────────────────
// 動畫常數（雜誌風快入場、紙翻動感）
// ─────────────────────────────────────────────────────

export const EASE_EDITORIAL = [0.25, 0.8, 0.3, 1] as const;
export const EASE_PAGE_TURN = [0.4, 0, 0.2, 1] as const;

export const FAST_FADE = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: EASE_EDITORIAL },
};

// ─────────────────────────────────────────────────────
// IssueMark — 雜誌期數 / 卷號標籤
// 「VOL. 05 / ISSUE 02 — SPRING 2026」
// 雜誌封面最具辨識度的元素之一
// ─────────────────────────────────────────────────────

export function IssueMark({
  volume = '05',
  issue = '02',
  season = 'SPRING 2026',
  className,
  invert = false,
}: {
  volume?: string;
  issue?: string;
  season?: string;
  className?: string;
  invert?: boolean;
}) {
  const color = invert ? NYC.paper : NYC.ink;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase',
        className,
      )}
      style={{ color }}
    >
      <span style={{ fontWeight: 600 }}>VOL. {volume}</span>
      <span style={{ color: NYC.camel }}>/</span>
      <span>ISSUE {issue}</span>
      <span style={{ color: NYC.camel }}>—</span>
      <span style={{ color: invert ? 'rgba(255,255,255,0.7)' : NYC.graySoft }}>
        {season}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────
// EditorialKicker — 文章 kicker（類別標 + 編號）
// 「FEATURE — 01 / 04」這種雜誌標題上方的小標
// 跟 mediterranean SectionLabel 對比：
//   - SectionLabel 是兩條金線夾文字
//   - EditorialKicker 是純文字 + 駝色 dash、更平面更印刷
// ─────────────────────────────────────────────────────

export function EditorialKicker({
  label,
  index,
  total,
  className,
  align = 'left',
  invert = false,
}: {
  label: string;
  index?: number;
  total?: number;
  className?: string;
  align?: 'left' | 'center';
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-baseline gap-3',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span
        className="font-mono text-[10px] tracking-[0.32em] uppercase"
        style={{
          color: invert ? NYC.paper : NYC.ink,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      {typeof index === 'number' && (
        <>
          <span
            aria-hidden
            className="block h-px w-6"
            style={{ background: NYC.camel }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: NYC.camel, fontWeight: 600 }}
          >
            {String(index).padStart(2, '0')}
            {typeof total === 'number' && ` / ${String(total).padStart(2, '0')}`}
          </span>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Byline — 雜誌文章署名
// 「BY EDITORIAL TEAM · PHOTOGRAPHY MOMO LIN · ISSUE 02」
// ─────────────────────────────────────────────────────

export function Byline({
  writer = '角落編輯室',
  photographer = 'Momo Lin',
  className,
  invert = false,
}: {
  writer?: string;
  photographer?: string;
  className?: string;
  invert?: boolean;
}) {
  const textColor = invert ? 'rgba(255,255,255,0.78)' : NYC.gray;
  return (
    <div
      className={cn(
        'flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.18em] uppercase',
        className,
      )}
      style={{ color: textColor }}
    >
      <span>BY {writer}</span>
      <span style={{ color: NYC.camel }}>·</span>
      <span>PHOTO {photographer}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SerialNumber — 雜誌大數字（120px-150px）
// 用在 hero / feature / section 開頭、像「No. 03」
// 比襯線標題更粗、更印刷
// ─────────────────────────────────────────────────────

export function SerialNumber({
  n,
  className,
  style,
  invert = false,
}: {
  n: number | string;
  className?: string;
  style?: React.CSSProperties;
  invert?: boolean;
}) {
  const color = invert ? NYC.paper : NYC.ink;
  const value = typeof n === 'number' ? String(n).padStart(2, '0') : n;
  return (
    <span
      className={cn('font-display leading-none', className)}
      style={{
        color,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        ...style,
      }}
    >
      {value}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// Rule — 主要分隔線（黑色實線、報紙感）
// ─────────────────────────────────────────────────────

export function Rule({
  color = NYC.rule,
  className,
  weight = 1,
}: {
  color?: string;
  className?: string;
  weight?: 1 | 2 | 4;
}) {
  return (
    <div
      className={cn('w-full', className)}
      style={{ background: color, height: weight }}
    />
  );
}

// ─────────────────────────────────────────────────────
// VRule — 垂直分欄細線（column rule、報紙感）
// ─────────────────────────────────────────────────────

export function VRule({
  color = NYC.ruleSoft,
  className,
  height = '100%',
}: {
  color?: string;
  className?: string;
  height?: string | number;
}) {
  return (
    <div
      className={cn('w-px shrink-0', className)}
      style={{ background: color, height }}
    />
  );
}

// ─────────────────────────────────────────────────────
// EditorialButton — 主要 CTA / outline / link
// 雜誌風按鈕：方角、銳利、字距小（不像前 4 個 demo 大字距）
// hover：駝色底線 swipe in（雜誌頁碼 highlight 感）
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'inverted';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function EditorialButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  style,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg'
      ? 'h-14 px-10 text-[12px]'
      : 'h-11 px-7 text-[11px]';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-mono tracking-[0.22em] uppercase transition-all',
          'hover:bg-[#000] active:translate-y-px',
          className,
        )}
        style={{
          background: NYC.ink,
          color: NYC.paper,
          fontWeight: 600,
          ...style,
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === 'inverted') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-mono tracking-[0.22em] uppercase transition-all',
          'hover:opacity-90 active:translate-y-px',
          className,
        )}
        style={{
          background: NYC.paper,
          color: NYC.ink,
          fontWeight: 600,
          ...style,
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-mono tracking-[0.22em] uppercase transition-all',
          'border hover:bg-[#111] hover:text-white',
          className,
        )}
        style={{
          borderColor: NYC.ink,
          color: NYC.ink,
          background: 'transparent',
          fontWeight: 600,
          ...style,
        }}
      >
        {children}
      </button>
    );
  }

  // ghost — 純文字下劃線連結
  return (
    <button
      {...rest}
      className={cn(
        'relative inline-flex items-center gap-3',
        'font-mono text-[11px] tracking-[0.22em] uppercase',
        'transition-colors hover:text-[#C4A678]',
        'group',
        className,
      )}
      style={{ color: NYC.ink, fontWeight: 600, ...style }}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-100 transition-transform"
          style={{ background: NYC.camel }}
        />
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────
// SwipeLink — hover 時下劃線從左到右 swipe in
// 雜誌的「閱讀本文」 / 「Read More」風格
// ─────────────────────────────────────────────────────

export function SwipeLink({
  children,
  onClick,
  className,
  invert = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  invert?: boolean;
}) {
  const color = invert ? NYC.paper : NYC.ink;
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center gap-2',
        'font-mono text-[11px] tracking-[0.22em] uppercase',
        'group',
        className,
      )}
      style={{ color, fontWeight: 600 }}
    >
      <span className="relative inline-block py-1">
        {children}
        <span
          aria-hidden
          className="absolute left-0 -bottom-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: NYC.camel }}
        />
      </span>
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────
// EditorialChip — filter chip
// 雜誌風：底線 active、方形邊框、tracking 小
// ─────────────────────────────────────────────────────

export function EditorialChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="relative h-10 px-1 font-mono text-[10px] tracking-[0.28em] uppercase transition-colors"
      style={{
        color: active ? NYC.ink : NYC.graySoft,
        fontWeight: 600,
      }}
    >
      <span className="relative inline-block py-2">
        {children}
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-0 transition-all"
          style={{
            height: 2,
            background: active ? NYC.ink : 'transparent',
          }}
        />
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────
// BWImage — 黑白照片 wrapper
// 預設 grayscale + 對比、hover 還原飽和
// 雜誌攝影的核心視覺手法
// ─────────────────────────────────────────────────────

export function bwImageStyle(hover = true): React.CSSProperties {
  return {
    filter: 'grayscale(1) contrast(1.08)',
    transition: hover ? 'filter 1100ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
  };
}

export const BW_HOVER_CLASS =
  'group-hover:[filter:grayscale(0)_contrast(1)] [transition:filter_1100ms_cubic-bezier(0.22,1,0.36,1)]';

// ─────────────────────────────────────────────────────
// SquareMark — 列點用、極小黑方塊
// 跟前 4 個 demo 的方塊對比：黑色實心、最銳利
// ─────────────────────────────────────────────────────

export function SquareMark({
  size = 5,
  color = NYC.ink,
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn('block shrink-0', className)}
      style={{
        width: size,
        height: size,
        background: color,
        marginTop: 9,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────
// DropCap — 大首字（雜誌專欄開頭那個超大首字）
// 雜誌專欄編輯口吻的視覺 anchor
// ─────────────────────────────────────────────────────

export function DropCap({
  char,
  className,
  style,
}: {
  char: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn(
        'float-left font-display leading-[0.85] mr-3',
        className,
      )}
      style={{
        fontSize: '5.5em',
        color: NYC.ink,
        fontWeight: 700,
        marginTop: '0.1em',
        marginRight: '0.16em',
        ...style,
      }}
    >
      {char}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// MagazineHeadline — 雜誌大標題 wrapper
// 統一 weight 700 + 緊密 line-height + 負字距
// ─────────────────────────────────────────────────────

export function MagazineHeadline({
  children,
  className,
  as: As = 'h2',
  color = NYC.ink,
  style,
  size = 'xl',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  color?: string;
  style?: React.CSSProperties;
  size?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}) {
  const sizeCls = {
    md: 'text-[28px] md:text-[36px]',
    lg: 'text-[34px] md:text-[48px]',
    xl: 'text-[40px] md:text-[64px]',
    '2xl': 'text-[52px] md:text-[88px]',
    '3xl': 'text-[64px] md:text-[120px]',
  }[size];
  return (
    <As
      className={cn('font-display leading-[0.98]', sizeCls, className)}
      style={{
        color,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        ...style,
      }}
    >
      {children}
    </As>
  );
}

// ─────────────────────────────────────────────────────
// Grain — 印刷紋路 overlay（極淡）
// 用在大區塊背景上、加紙質感、但不能太重
// ─────────────────────────────────────────────────────

export function Grain({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-multiply"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────
// CategoryLabel — tour 卡片上方類別
// 雜誌欄目感：DEPARTMENT 名稱
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '文化深度',
  adventure: '荒野探險',
  honeymoon: '蜜月私旅',
  aurora: '極光季節',
};

export const CATEGORY_LABEL_EN: Record<string, string> = {
  culture: 'CULTURE',
  adventure: 'ADVENTURE',
  honeymoon: 'HONEYMOON',
  aurora: 'AURORA',
};

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
  labelEn: string;
}> = [
  { value: 'culture', label: '文化深度', labelEn: 'CULTURE' },
  { value: 'adventure', label: '荒野探險', labelEn: 'ADVENTURE' },
  { value: 'honeymoon', label: '蜜月私旅', labelEn: 'HONEYMOON' },
  { value: 'aurora', label: '極光季節', labelEn: 'AURORA' },
];

// ─────────────────────────────────────────────────────
// 共用文案 — 雜誌編輯口吻
// 跟前 4 個 demo 的「散文 / 詩」口吻區隔
// ─────────────────────────────────────────────────────

export const EDITORIAL_BRAND = {
  marque: 'CORNER',
  marqueZh: '角落旅行社',
  established: 'EST. 2018 — TAIPEI',
  masthead: 'A QUARTERLY ON DEEP TRAVEL',
  homeKicker: 'EDITOR\'S LETTER',
  homeStatement: '不是所有風景\n都值得被拍照。',
  // 編輯口吻 — 雜誌專欄開頭那種「主編親述」
  editorsLetter:
    '我們是一家很挑剔的旅行社。挑剔到每一年只敢出 24 團、每一團只敢收 14 個人、每一晚住宿都派人去睡過一遍才上架。我們不寫景點清單、不做出團 KPI、不發 IG 鈦合金限時動態。我們做的是這本季刊每一期都會問你的問題——這趟旅行、你究竟想被改變什麼？',
  // 品牌 manifesto
  manifesto:
    '當所有人都在比誰去得遠、誰拍得多、誰打的卡多、我們選擇待久一點、走慢一點、看清楚一點。',
} as const;

// ─────────────────────────────────────────────────────
// EditorialFooter — 雜誌風 footer
// 整片黑底 + 駝色標題 + 印刷感版權頁
// ─────────────────────────────────────────────────────

export function EditorialFooter() {
  return (
    <footer
      className="relative px-6 md:px-12 pt-20 pb-12"
      style={{ background: NYC.ink, color: NYC.paper }}
    >
      <Grain opacity={0.06} />
      <div className="relative mx-auto max-w-7xl">
        {/* Masthead 風大標 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-16">
          <div className="md:col-span-7">
            <IssueMark invert season="SPRING 2026 · TAIPEI" />
            <MagazineHeadline
              size="2xl"
              color={NYC.paper}
              className="mt-6"
            >
              CORNER
              <br />
              <span style={{ color: NYC.camel }}>TRAVEL</span>
            </MagazineHeadline>
            <p
              className="mt-8 max-w-md font-body text-sm leading-[1.85]"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              一本季刊式的旅行品牌。漫途旅遊旗下、台北出品、世界各地策展。
              交觀甲 7654 號、品保中字第 1234 號。
            </p>
          </div>

          <div className="md:col-span-2">
            <p
              className="font-mono text-[10px] tracking-[0.28em] uppercase mb-5"
              style={{ color: NYC.camel, fontWeight: 700 }}
            >
              Editorial
            </p>
            <div className="space-y-2 font-body text-sm leading-[1.85]"
              style={{ color: 'rgba(255,255,255,0.78)' }}
            >
              <p>主編 / Eva Wang</p>
              <p>副主編 / Logan Chien</p>
              <p>攝影 / Momo Lin</p>
              <p>美術 / William Wu</p>
            </div>
          </div>

          <div className="md:col-span-3">
            <p
              className="font-mono text-[10px] tracking-[0.28em] uppercase mb-5"
              style={{ color: NYC.camel, fontWeight: 700 }}
            >
              Contact
            </p>
            <div className="space-y-2 font-body text-sm leading-[1.85]"
              style={{ color: 'rgba(255,255,255,0.78)' }}
            >
              <p>台北市信義區松仁路 28 號 12 樓</p>
              <p>02-2345-6789</p>
              <p>hello@corner-travel.tw</p>
              <p
                className="pt-3 font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.camel }}
              >
                訂閱季刊 — subscribe
              </p>
            </div>
          </div>
        </div>

        {/* 印刷感版權頁 */}
        <div
          className="h-px"
          style={{ background: 'rgba(255,255,255,0.18)' }}
        />

        <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          <p className="md:col-span-4">© 2026 CORNER TRAVEL</p>
          <p className="md:col-span-4">A VENTURO BRAND</p>
          <p className="md:col-span-4 md:text-right">
            PRINTED IN TAIPEI · CURATED WORLDWIDE
          </p>
        </div>
      </div>
    </footer>
  );
}
