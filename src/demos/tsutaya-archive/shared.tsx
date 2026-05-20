'use client';

/**
 * 蔦屋書屋 — Tsutaya Archive
 *
 * 共用 token、原子元件。
 *
 * 設計哲學：
 *   - 書店感、不是無印的工業 catalog 感
 *   - 米紙黃 + 麥稈黃 + 棕墨：泛黃書頁的色階
 *   - 排版像「翻一本旅行雜誌」：雙欄、書背、卷號、藏書編號
 *   - 字級偏小、leading 寬鬆、像書頁裡的文字
 *   - 互動：hover underline 像書籤、入場橫向滑入（翻頁感）
 *
 * 配色（William 拍板、勿改）：
 *   #FDFBF6  米紙黃（主背景、偏暖）
 *   #E1D3B4  麥稈黃（次要面、書頁感）
 *   #3A352D  棕墨（強調 / 細線 / metadata）
 *   #0E0C09  深咖（主文字）
 *
 * 跟 muji-stillness 的差異：
 *   1. muji 是冷白工業底（#F5F2EC 偏中性）→ 蔦屋是暖黃米紙底（#FDFBF6 偏暖、加 #E1D3B4 麥稈）
 *   2. muji 字距正常（letterSpacing ≤ 0.08em）→ 蔦屋有「藏書編號」mono 段帶字距、書名標題正常
 *   3. muji 標題 4-5xl 上限、商品 catalog 質感 → 蔦屋標題 3-4xl 但配書頁裝飾線、像書名頁排版
 *   4. muji 單欄 / 規則 grid → 蔦屋雙欄 / 三欄文字（像書內頁）、配「卷」「章」「冊」感
 *   5. muji 動畫 fade only → 蔦屋橫向 slide（翻頁感）、+ 輕微 fade
 *   6. muji 圖片強調節制（aspect 1:1）→ 蔦屋圖片像「夾在書頁中」（多 aspect 4:5、3:4 直幅）配 caption
 *   7. muji 用 Plus/Minus 細線 icon → 蔦屋用「卷 / 頁碼」mono 文字
 *
 * 紅線（globals.css 已 reset、勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格對齊 + 8pt grid（spacing 用 2/4/6/8/10/12/16/20/24）
 *   4. 不用 ul/ol marker、列點用「藏書編號」/「卷次」/ 細線
 *   5. icon 不套圓框
 *   6. 不寫 lorem、文案有「藏書家挑書」口吻
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token（書頁色階）
// ─────────────────────────────────────────────────────

export const TSUTAYA = {
  paper: '#FDFBF6', // 米紙黃（主背景）
  paperSoft: '#FAF6EC', // 略深一點的紙（卡片內部）
  paperWarm: '#F5EFE0', // 書頁微泛黃處
  straw: '#E1D3B4', // 麥稈黃（次面、書頁感）
  strawSoft: '#EAE0C7', // 略淡的麥稈
  strawDeep: '#C9B68E', // 深一點的麥稈、卡片邊線
  brown: '#3A352D', // 棕墨（強調 / 細線 / metadata）
  brownSoft: '#5B5043', // 較淡的棕（內文輔助色）
  brownFaint: '#857762', // 更淡的棕（弱化文字、頁碼）
  ink: '#0E0C09', // 深咖（主文字）
  inkMid: '#3A352D', // = brown、用於小段落 emphasis
  line: '#C9B68E', // 書頁邊緣感的細線
  lineSoft: '#D9C9A6', // 更淺的線
} as const;

// ─────────────────────────────────────────────────────
// 中文卷號（一二三四…）— 取代「Day 01」這種冷編號
// 用於 itinerary 章節 / Highlights 卷次
// ─────────────────────────────────────────────────────

export const CHINESE_VOL = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五',
];

export function volName(n: number) {
  return CHINESE_VOL[n - 1] ?? String(n);
}

// ─────────────────────────────────────────────────────
// ArchiveTag — 區塊上方小標籤（譬如 「卷 一 ─ 序」）
// 跟 muji IndexLabel 對比：muji 是「001 — Welcome」工業 catalog 感
//                       蔦屋是「卷 一 ─ Welcome」線裝書感、有「卷號 + 章名」結構
// ─────────────────────────────────────────────────────

export function ArchiveTag({
  vol,
  children,
  className,
  align = 'left',
}: {
  vol: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'flex items-baseline gap-4',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span
        className="font-display text-xs"
        style={{
          color: TSUTAYA.brown,
          letterSpacing: '0.2em',
          fontWeight: 500,
        }}
      >
        卷 {vol}
      </span>
      <span
        aria-hidden
        className="block h-px w-6"
        style={{ background: TSUTAYA.brown }}
      />
      <span
        className="font-body text-xs uppercase"
        style={{
          color: TSUTAYA.brownSoft,
          letterSpacing: '0.25em',
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FolioMark — 列點用、藏書編號感「藏書 042」
// 跟 NumberMark 對比：muji 是「01」工業編號
//                  蔦屋是「藏書 042」書店感（book inventory number）
// ─────────────────────────────────────────────────────

export function FolioMark({
  n,
  prefix = '藏書',
}: {
  n: number;
  prefix?: string;
}) {
  return (
    <span
      className="font-mono text-[10px] shrink-0 inline-flex items-baseline gap-2"
      style={{ color: TSUTAYA.brownFaint, letterSpacing: '0.1em' }}
    >
      <span
        className="font-body"
        style={{ color: TSUTAYA.brownSoft, letterSpacing: '0.15em' }}
      >
        {prefix}
      </span>
      <span style={{ color: TSUTAYA.brown }}>
        {String(n).padStart(3, '0')}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────
// PageNumber — 頁碼感（雜誌 / 書頁右下角）
// ─────────────────────────────────────────────────────

export function PageNumber({
  n,
  total,
  className,
}: {
  n: number;
  total?: number;
  className?: string;
}) {
  return (
    <span
      className={cn('font-mono text-[10px]', className)}
      style={{ color: TSUTAYA.brownFaint, letterSpacing: '0.15em' }}
    >
      {String(n).padStart(2, '0')}
      {total !== undefined && (
        <>
          <span style={{ color: TSUTAYA.line, margin: '0 4px' }}>/</span>
          {String(total).padStart(2, '0')}
        </>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// BookSpineMark — 書脊感裝飾（細直線 + 卷號）
// 用於卡片旁、章節旁、像書架上的書背
// ─────────────────────────────────────────────────────

export function BookSpineMark({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn('flex flex-col items-center gap-3', className)}
      style={{ color: TSUTAYA.brown }}
    >
      <span
        aria-hidden
        className="block w-px h-10"
        style={{ background: TSUTAYA.brown }}
      />
      <span
        className="font-display text-[10px] uppercase"
        style={{ letterSpacing: '0.3em', writingMode: 'vertical-rl' }}
      >
        {label}
      </span>
      <span
        aria-hidden
        className="block w-px h-10"
        style={{ background: TSUTAYA.brown }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// BookTitle — 標題 wrapper（書名感）
// 字級偏小、weight 500、行距緊、像書名頁
// 跟 muji SectionTitle 對比：muji 偏向 catalog 商品標題
//                          蔦屋偏向書名頁、行距更緊、可加副標
// ─────────────────────────────────────────────────────

export function BookTitle({
  children,
  subtitle,
  level = 2,
  className,
  align = 'left',
}: {
  children: ReactNode;
  subtitle?: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
  align?: 'left' | 'center';
}) {
  const sizeCls =
    level === 1
      ? 'text-3xl md:text-[40px]'
      : level === 2
        ? 'text-2xl md:text-3xl'
        : 'text-lg md:text-xl';

  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <h2
        className={cn('font-display leading-[1.3]', sizeCls)}
        style={{ color: TSUTAYA.ink, fontWeight: 500 }}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 font-body text-sm md:text-base leading-[2]',
          )}
          style={{ color: TSUTAYA.brownSoft }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Hair — 細書頁邊緣線
// ─────────────────────────────────────────────────────

export function Hair({
  color = TSUTAYA.line,
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('h-px w-full', className)}
      style={{ background: color }}
    />
  );
}

// ─────────────────────────────────────────────────────
// DoubleHair — 雙細線（書頁裝飾、章節分隔）
// 兩條 1px 線 + 2px 間距、書頁感
// ─────────────────────────────────────────────────────

export function DoubleHair({
  color = TSUTAYA.line,
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn('w-full', className)}>
      <div className="h-px w-full" style={{ background: color }} />
      <div
        className="h-px w-full"
        style={{ background: color, marginTop: 3 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// TsutayaButton — 主要 CTA / outline / link
// 書店感：方角、細邊、深咖文字 + 米紙底、無漸層
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'link';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function TsutayaButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-12 px-10 text-sm' : 'h-10 px-8 text-xs';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-body transition-all',
          'hover:opacity-90 active:translate-y-px',
          className,
        )}
        style={{
          background: TSUTAYA.ink,
          color: TSUTAYA.paper,
          letterSpacing: '0.1em',
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
          'font-body transition-colors border',
          className,
        )}
        style={{
          background: 'transparent',
          color: TSUTAYA.ink,
          borderColor: TSUTAYA.ink,
          letterSpacing: '0.1em',
        }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      {...rest}
      className={cn(
        'font-body text-xs transition-colors',
        'hover:opacity-60',
        className,
      )}
      style={{ color: TSUTAYA.ink, letterSpacing: '0.08em' }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// BookmarkLink — 書籤式連結（hover 時下劃線像書籤滑出）
// ─────────────────────────────────────────────────────

export function BookmarkLink({
  onClick,
  children,
  className,
  color = TSUTAYA.ink,
}: {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative font-body text-xs inline-flex items-center gap-3',
        'transition-opacity hover:opacity-80',
        className,
      )}
      style={{ color, letterSpacing: '0.08em' }}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute left-0 -bottom-1 block h-px w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: color }}
        />
      </span>
      <span
        aria-hidden
        className="block w-6 h-px transition-all duration-500 group-hover:w-10"
        style={{ background: color }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────
// CategoryPill — 類別 filter（書架分類）
// 跟 muji TagPill 對比：muji 是工業 catalog pill
//                    蔦屋是「書架分類牌」感、有細邊 + 圓角極微
// ─────────────────────────────────────────────────────

export function CategoryPill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-9 px-5 font-body text-xs transition-all border',
      )}
      style={{
        background: active ? TSUTAYA.ink : TSUTAYA.paperSoft,
        color: active ? TSUTAYA.paper : TSUTAYA.brownSoft,
        borderColor: active ? TSUTAYA.ink : TSUTAYA.line,
        letterSpacing: '0.08em',
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// FootnoteRow — 書末附錄式 key-value 一行
// 用於 inclusions / exclusions / departure dates summary
// 排版像書末「索引 / 附錄」、用細線分隔
// ─────────────────────────────────────────────────────

export function FootnoteRow({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-[88px_1fr] gap-6 py-4 items-baseline',
        className,
      )}
      style={{ borderBottom: `1px solid ${TSUTAYA.lineSoft}` }}
    >
      <span
        className="font-body text-xs"
        style={{
          color: TSUTAYA.brownSoft,
          letterSpacing: '0.15em',
        }}
      >
        {label}
      </span>
      <span
        className="font-body text-sm leading-[1.85]"
        style={{ color: TSUTAYA.ink }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PhotoCaption — 圖片下方一行小字、像書中插圖說明
// ─────────────────────────────────────────────────────

export function PhotoCaption({
  fig,
  children,
  className,
}: {
  fig: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-baseline gap-3 mt-3',
        className,
      )}
    >
      <span
        className="font-display text-[10px] shrink-0"
        style={{
          color: TSUTAYA.brown,
          letterSpacing: '0.15em',
        }}
      >
        圖 {String(fig).padStart(2, '0')}
      </span>
      <span
        aria-hidden
        className="block h-px w-4 shrink-0"
        style={{ background: TSUTAYA.line }}
      />
      <span
        className="font-body text-[11px] leading-[1.6]"
        style={{ color: TSUTAYA.brownSoft }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PageCorner — 書頁右下角的「翻頁角」裝飾
// 細線形成的折角、SVG 三角、絕對定位
// 用於某些區塊右下角、提示「這是一頁」
// ─────────────────────────────────────────────────────

export function PageCorner({
  size = 36,
  color = TSUTAYA.line,
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 36 36"
      className={cn('block', className)}
      fill="none"
    >
      <path
        d="M0 36 L36 0 L36 36 Z"
        fill={TSUTAYA.paperSoft}
        stroke={color}
        strokeWidth="0.5"
      />
      <line
        x1="36"
        y1="0"
        x2="0"
        y2="36"
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// CATEGORY 對照表（書屋分類）
// 跟 muji 對比：muji 用「文化 / 荒野 / 蜜月 / 極光」工業分類
//             蔦屋用「文學 / 探險 / 戀愛 / 自然」書店分類感
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '文學紀行',
  adventure: '探險手記',
  honeymoon: '戀愛書信',
  aurora: '自然觀察',
};

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
}> = [
  { value: 'culture', label: '文學紀行' },
  { value: 'adventure', label: '探險手記' },
  { value: 'honeymoon', label: '戀愛書信' },
  { value: 'aurora', label: '自然觀察' },
];

// ─────────────────────────────────────────────────────
// 共用文案 — 角落旅行社「蔦屋書屋」分號子品牌
// 跟 muji（「日常即是風景」）區隔：這版是「藏書家挑書」口吻、書店人文感
// ─────────────────────────────────────────────────────

export const BRAND = {
  marque: 'CORNER',
  marqueZh: '角落旅行社',
  marqueSub: '蔦屋書屋系列',
  established: '創立於 二〇一八 · 臺北',
  // home statement（短而有書卷感）
  homeStatement: '角落是一座書店，\n行程是一本本書。',
  homeStatementSub:
    '我們不販賣行程，我們挑選旅行。\n像書店老闆挑書那樣——\n每一條路線，都是值得讀完整本的書。',
  // editorial 編者語
  editorialNote:
    '本店每年只引入四本新書。\n讀慢一點、留長一點、回家的時候，\n書頁上會多一些你的指紋。',
  // shelfNote：書架陳列上方的小註
  shelfNote: '本季陳列 · 二〇二六',
} as const;
