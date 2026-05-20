'use client';

/**
 * 阿爾卑斯靜謐 — 共用 token、原子元件。
 *
 * 靈感：Aman Le Mélézin（Courchevel）、Six Senses Crans-Montana、Whitepod Hotel
 * vibe：雪線之上、空氣稀薄、冰川藍灰、冬日陽光、極簡奢華
 *
 * 配色（William 拍板、不改）：
 *   #F8F9FB  雪白（主背景）
 *   #CBD5E0  冰川灰（次要面）
 *   #5F6F86  山岩藍（強調）
 *   #1A2433  夜山黑（文字）
 *
 * 跟 mediterranean-sun 的視覺差異：
 *   1. 銀冷配色 vs 金暖配色
 *   2. 留白更兇（spacing × 1.4）、字級更小、tracking 更大（0.5em / 0.6em）
 *   3. 標題用更細的 weight 300、襯線但更銳利
 *   4. icon 山系（Mountain / Snowflake / Compass / Wind）
 *   5. 不對稱 grid、座標感（CN 47.3°N 6.9°E）取代序號
 *   6. hover 只變線條色 / 字距、不 scale
 *   7. 入場動畫慢一倍（0.7-1.4s）
 *
 * 紅線（globals.css 已 reset、勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格對齊 + 8pt grid（spacing 用 2/4/6/8/12/16/20/24）
 *   4. 不用 ul/ol marker、列點用方塊 / 線條 / 數字 / 座標
 *   5. icon 不套圓框（不要 rounded-full p-2 bg-XXX）
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token（雪線色階）
// ─────────────────────────────────────────────────────

export const ALPINE = {
  snow: '#F8F9FB',
  snowSoft: '#FFFFFF',
  snowDeep: '#EDEFF3',
  mist: '#E7EAEE',
  glacier: '#CBD5E0',
  glacierDeep: '#A8B4C2',
  stone: '#5F6F86',
  stoneDeep: '#475263',
  ridge: '#2C3744',
  night: '#1A2433',
  ink: '#1A2433',
  inkSoft: '#475263',
  inkFaint: '#8A95A5',
  line: '#D5DBE3',
  lineSoft: '#E7EAEE',
} as const;

// ─────────────────────────────────────────────────────
// PeakLabel — 區塊上方小標籤（取代 SectionLabel）
// 跟地中海對比：地中海是兩條金線夾文字、阿爾卑斯是「↑ TEXT」單線往上指
// ─────────────────────────────────────────────────────

export function PeakLabel({
  children,
  className,
  align = 'left',
}: {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-6',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span
        aria-hidden
        className="block h-px w-12"
        style={{ background: ALPINE.stone }}
      />
      <span
        className="font-display text-[10px] tracking-[0.5em] uppercase"
        style={{ color: ALPINE.stone, fontWeight: 400 }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SquareTick — 列點用、極小冷色方塊
// 跟 mediterranean Marker 對比：尺寸更小、顏色冷
// ─────────────────────────────────────────────────────

export function SquareTick({ size = 6 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{
        width: size,
        height: size,
        background: ALPINE.stone,
        marginTop: 10,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────
// Coordinate — 列點用、座標風數字「N 01 / 05」
// 跟 NumberMark 對比：地中海是「01」單號、阿爾卑斯像 GPS 座標
// ─────────────────────────────────────────────────────

export function Coordinate({
  n,
  total,
}: {
  n: number;
  total?: number;
}) {
  return (
    <span
      className="font-mono text-[11px] tracking-[0.3em] shrink-0 uppercase"
      style={{ color: ALPINE.stone }}
    >
      N {String(n).padStart(2, '0')}
      {total ? ` / ${String(total).padStart(2, '0')}` : ''}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// AlpineButton — 主要 CTA / 次要連結
// 跟 SunButton 對比：銳利方角、無動畫只變底色、文字更小字距更大
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline' | 'snow';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function AlpineButton({
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
          'font-display tracking-[0.45em] uppercase transition-colors',
          'hover:bg-[color:var(--alpine-stone-deep,#475263)]',
          className,
        )}
        style={{
          background: ALPINE.night,
          color: ALPINE.snow,
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
          'font-display tracking-[0.45em] uppercase transition-colors',
          'border hover:border-[color:var(--alpine-night,#1A2433)]',
          className,
        )}
        style={{
          borderColor: ALPINE.stone,
          color: ALPINE.night,
          fontWeight: 400,
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === 'snow') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display tracking-[0.45em] uppercase transition-colors',
          'hover:opacity-90',
          className,
        )}
        style={{
          background: ALPINE.snow,
          color: ALPINE.night,
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
        'font-display text-[10px] tracking-[0.45em] uppercase',
        'transition-colors hover:text-[color:var(--alpine-night,#1A2433)]',
        className,
      )}
      style={{ color: ALPINE.stone, fontWeight: 400 }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// AlpineChip — category filter chip
// 跟 mediterranean Chip 對比：細邊、active 時下劃線不填底
// ─────────────────────────────────────────────────────

export function AlpineChip({
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
      className="relative h-10 px-2 font-display text-[10px] tracking-[0.4em] uppercase transition-colors"
      style={{
        color: active ? ALPINE.night : ALPINE.inkFaint,
        fontWeight: 400,
      }}
    >
      <span className="relative inline-block py-2">
        {children}
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-0 h-px transition-all"
          style={{
            background: active ? ALPINE.night : 'transparent',
          }}
        />
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────
// HairLine — 細分隔線（冷灰）
// ─────────────────────────────────────────────────────

export function HairLine({
  color = ALPINE.line,
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
// VLine — 垂直細線（用於 hero 等空間分割）
// ─────────────────────────────────────────────────────

export function VLine({
  height = '100%',
  color = ALPINE.line,
  className,
}: {
  height?: string | number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('w-px', className)}
      style={{ background: color, height }}
    />
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
// Altitude — 數字 + 單位（取代 hero 的「Est. 2018」)
// 強化「座標、海拔、緯度」這種冷數據感
// ─────────────────────────────────────────────────────

export function Altitude({
  value,
  unit,
  label,
  color = ALPINE.ink,
}: {
  value: string;
  unit?: string;
  label?: string;
  color?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span
          className="font-display text-[9px] tracking-[0.5em] uppercase"
          style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
        >
          {label}
        </span>
      )}
      <span className="flex items-baseline gap-2">
        <span
          className="font-mono text-2xl tracking-wider"
          style={{ color, fontWeight: 300 }}
        >
          {value}
        </span>
        {unit && (
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: ALPINE.inkFaint }}
          >
            {unit}
          </span>
        )}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SerifTitle — 標題文字 wrapper（統一 weight 300）
// ─────────────────────────────────────────────────────

export function SerifTitle({
  children,
  className,
  as: As = 'h2',
  color = ALPINE.night,
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
      className={cn('font-display leading-[1.15]', className)}
      style={{ color, fontWeight: 300, ...style }}
    >
      {children}
    </As>
  );
}
