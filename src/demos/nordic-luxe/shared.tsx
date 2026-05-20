'use client';

/**
 * 北歐極簡奢華 — Nordic Luxe — 共用 token、原子元件。
 *
 * 靈感：Treehotel（瑞典）、Arctic Bath、Juvet Landscape Hotel、
 *      Norm Architects、Vipp 居家、Sotheby's 北歐建築攝影
 * vibe：極簡到極端、奢華於無形、清冷而不冰冷、
 *      木材石頭實感、產品攝影般的精準、靜默有錢
 *
 * 配色（William 拍板、不改）：
 *   #FAFAF7  北歐米白（主背景）
 *   #E5E1D8  木紋灰（次要面）
 *   #7C7A73  石頭灰（強調 / metadata）
 *   #1C1B19  炭黑（文字）
 *
 * 跟 alpine-serenity 的視覺差異（兩者都冷色歐美、但完全不同流派）：
 *   1. 配色：alpine 銀冷藍灰、nordic 木米暖灰；alpine 像冰川、nordic 像木屋客廳
 *   2. 排版：alpine 用座標 / GPS 風（N 47.3°N）、nordic 用建築攝影 caption 風
 *      （右下小字、不喊大字）
 *   3. 標題位置：alpine 圖上 / 旁、nordic 常在圖「下方」（hotel website 慣例）
 *   4. 構圖：alpine 不對稱 grid、nordic 黃金 1:3 留白、圖置中、單欄
 *   5. hover：alpine 變線條 + 字距、nordic 「caption fade in」+ 圖輕度縮放
 *   6. icon：alpine 山系（Mountain / Compass / Snowflake / Wind）、
 *      nordic 居家 / 物件系（極節制、極少數）
 *   7. tracking：alpine 0.45-0.6em 大字距、nordic 0.3-0.4em 中字距更克制
 *      （極簡不必喊很大聲）
 *
 * 紅線（globals.css 已 reset、勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格對齊 + 8pt grid（spacing 用 2/4/6/8/12/16/20/24/32）
 *   4. 不用 ul/ol marker、列點用方塊 / 數字 / 細線
 *   5. icon 不套圓框（不要 rounded-full p-2 bg-*）
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token（北歐木米色階）
// ─────────────────────────────────────────────────────

export const NORDIC = {
  // 米白主背景（極淡偏暖）
  paper: '#FAFAF7',
  paperSoft: '#FFFFFF',
  paperDeep: '#F3F1EB',
  // 木紋灰（次要面、卡片底）
  oak: '#E5E1D8',
  oakDeep: '#D9D4C7',
  oakSoft: '#EDE9E1',
  // 石頭灰（metadata 強調、副文字）
  stone: '#7C7A73',
  stoneDeep: '#5E5C56',
  stoneSoft: '#A8A59E',
  // 炭黑（主文字）
  charcoal: '#1C1B19',
  ink: '#1C1B19',
  inkSoft: '#4A4842',
  inkFaint: '#9A988F',
  // 細線
  line: '#DAD5C8',
  lineSoft: '#E8E4D9',
} as const;

// ─────────────────────────────────────────────────────
// CaptionLabel — 區塊上方小標籤
// 跟 mediterranean SectionLabel / alpine PeakLabel 對比：
// 不夾線、無中央線、只在文字「左邊」放極小的方塊 + 文字
// 像 hotel website 的圖片 caption（「— 02 / Forest Suite」）
// ─────────────────────────────────────────────────────

export function CaptionLabel({
  children,
  className,
  align = 'left',
  number,
}: {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  number?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-4',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span
        aria-hidden
        className="block"
        style={{
          width: 6,
          height: 6,
          background: NORDIC.stone,
        }}
      />
      {number && (
        <span
          className="font-mono text-[10px] tracking-[0.25em]"
          style={{ color: NORDIC.stone }}
        >
          {number}
        </span>
      )}
      <span
        className="font-display text-[10px] tracking-[0.35em] uppercase"
        style={{ color: NORDIC.stone, fontWeight: 400 }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// QuietLabel — 圖下方 caption 用、極小灰字
// 北歐 hotel website 圖底常見：「Forest Suite  ·  Loft」
// ─────────────────────────────────────────────────────

export function QuietLabel({
  children,
  className,
  color = NORDIC.stone,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <span
      className={cn(
        'font-display text-[10px] tracking-[0.35em] uppercase',
        className,
      )}
      style={{ color, fontWeight: 400 }}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// SmallNumber — 兩位數編號、襯線細數字「02」
// 跟 alpine Coordinate「N 02 / 04」對比：去掉 N、不假裝是 GPS
// ─────────────────────────────────────────────────────

export function SmallNumber({
  n,
  total,
  color = NORDIC.stone,
}: {
  n: number;
  total?: number;
  color?: string;
}) {
  return (
    <span
      className="font-mono text-[11px] tracking-[0.2em] shrink-0"
      style={{ color }}
    >
      {String(n).padStart(2, '0')}
      {total ? ` / ${String(total).padStart(2, '0')}` : ''}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// SquareDot — 列點用、極小石頭灰方塊
// 跟 mediterranean Marker（金色）/ alpine SquareTick（藍灰）對比：
// 顏色換成石頭灰、尺寸更小、margin-top 對齊基線
// ─────────────────────────────────────────────────────

export function SquareDot({
  size = 5,
  color = NORDIC.stone,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        marginTop: 10,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────
// NordicButton — 主要 CTA / 次要連結
// 跟 SunButton / AlpineButton 對比：
//   - 字距更克制（0.3em、不是 0.45em）
//   - hover 用底色 fade、不縮放
//   - 字級略大（北歐極簡：字本身要看清楚、不要小到看不到）
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline' | 'paper';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function NordicButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-14 px-12 text-[11px]' : 'h-12 px-10 text-[10px]';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display tracking-[0.3em] uppercase transition-colors',
          'hover:bg-[color:#3A3936]',
          className,
        )}
        style={{
          background: NORDIC.charcoal,
          color: NORDIC.paper,
          fontWeight: 400,
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
          'font-display tracking-[0.3em] uppercase transition-colors',
          'border hover:bg-[color:#F3F1EB]',
          className,
        )}
        style={{
          borderColor: NORDIC.charcoal,
          color: NORDIC.charcoal,
          fontWeight: 400,
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === 'paper') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display tracking-[0.3em] uppercase transition-opacity',
          'hover:opacity-85',
          className,
        )}
        style={{
          background: NORDIC.paper,
          color: NORDIC.charcoal,
          fontWeight: 400,
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
        'font-display text-[10px] tracking-[0.3em] uppercase',
        'transition-colors hover:text-[color:#1C1B19]',
        className,
      )}
      style={{ color: NORDIC.stone, fontWeight: 400 }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// NordicChip — category filter chip
// 跟 mediterranean Chip / alpine AlpineChip 對比：
//   - 不用邊框、不用底色
//   - active 用「文字變深 + 下方一條短水平線」
//   - 字距 0.3em 比 alpine 更克制
// ─────────────────────────────────────────────────────

export function NordicChip({
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
      className="relative h-10 px-1 font-display text-[10px] tracking-[0.3em] uppercase transition-colors"
      style={{
        color: active ? NORDIC.ink : NORDIC.stoneSoft,
        fontWeight: 400,
      }}
    >
      <span className="relative inline-block py-2">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0 transition-all"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            height: 1,
            width: active ? 24 : 0,
            background: NORDIC.ink,
          }}
        />
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────
// HairLine — 細分隔線（石頭灰）
// ─────────────────────────────────────────────────────

export function HairLine({
  color = NORDIC.line,
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
// LightTitle — 標題文字 wrapper（統一 weight 300、極節制）
// 跟 alpine SerifTitle 對比：略大的 letter-spacing、避免緊湊感
// ─────────────────────────────────────────────────────

export function LightTitle({
  children,
  className,
  as: As = 'h2',
  color = NORDIC.ink,
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <As
      className={cn('font-display leading-[1.18]', className)}
      style={{
        color,
        fontWeight: 300,
        letterSpacing: '-0.005em',
        ...style,
      }}
    >
      {children}
    </As>
  );
}

// ─────────────────────────────────────────────────────
// PhotoFrame — hotel website 的 image wrapper
// 圖下方常配 caption（QuietLabel）
// hover：圖輕度縮小 1.02 → 1.0（鏡頭拉遠感）
// 內含選配的細邊框（fade in on hover）
// ─────────────────────────────────────────────────────

export function PhotoFrame({
  children,
  className,
  aspect = 'aspect-[4/5]',
}: {
  children: ReactNode;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden group',
        aspect,
        className,
      )}
    >
      {children}
      {/* hover 顯示內邊框 — 像 hotel 圖卡的細節 */}
      <div
        aria-hidden
        className="absolute inset-4 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"
        style={{ border: `1px solid rgba(250,250,247,0.4)` }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// CategoryLabel — tour 卡片上方類別文字
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '文化深度',
  adventure: '荒野探險',
  honeymoon: '蜜月私旅',
  aurora: '極光季節',
};

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
}> = [
  { value: 'culture', label: '文化深度' },
  { value: 'adventure', label: '荒野探險' },
  { value: 'honeymoon', label: '蜜月私旅' },
  { value: 'aurora', label: '極光季節' },
];

// ─────────────────────────────────────────────────────
// EASE — 比 alpine 更慢、更柔（鏡頭拉遠感）
// 北歐極簡的動畫不該銳利、要像窗外光線變化
// ─────────────────────────────────────────────────────

export const NORDIC_EASE = [0.22, 1, 0.36, 1] as const;
export const NORDIC_EASE_LONG = [0.16, 1, 0.3, 1] as const;
