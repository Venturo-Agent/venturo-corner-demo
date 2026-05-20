'use client';

/**
 * 地中海陽光 — 共用 token、原子元件。
 *
 * 配色（William 拍板、不改）：
 *   #F4E9D8  奶油沙（主背景）
 *   #D9B382  陽光金（強調）
 *   #3E5B7C  地中海藍（點綴）
 *   #1B2A3A  深夜藍（主文字）
 *
 * 紅線（globals.css 已 reset、這裡再次強調、寫的時候勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格對齊 + 8pt grid（spacing 用 2/4/6/8/12/16/20/24）
 *   4. 不用 ul/ol marker、列點用方塊 / 數字 / 線條
 *   5. icon 不套圓框（不要 rounded-full p-2 bg-amber-100）
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token
// ─────────────────────────────────────────────────────

export const SUN = {
  sand: '#F4E9D8',
  sandLight: '#FAF3E6',
  sandDeep: '#EADBC1',
  gold: '#D9B382',
  goldDeep: '#B89163',
  sea: '#3E5B7C',
  seaDeep: '#2A4361',
  night: '#1B2A3A',
  ink: '#1B2A3A',
  inkSoft: '#4A5A6E',
  inkFaint: '#7A8898',
  line: '#D9C7A8',
} as const;

// ─────────────────────────────────────────────────────
// SectionLabel — 區塊上方小標籤
// 「— SECTION ·」橫線而非 bullet
// ─────────────────────────────────────────────────────

export function SectionLabel({
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
        'flex items-center gap-4',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span
        aria-hidden
        className="block h-px w-8"
        style={{ background: SUN.gold }}
      />
      <span
        className="font-display text-xs tracking-[0.4em] uppercase"
        style={{ color: SUN.goldDeep }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="block h-px w-8"
        style={{ background: SUN.gold }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Marker — 列點用、小金色方塊
// 替代 ul 的 bullet
// ─────────────────────────────────────────────────────

export function Marker({ size = 8 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{
        width: size,
        height: size,
        background: SUN.gold,
        marginTop: 8,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────
// NumberMark — 列點用、襯線數字「01」「02」
// ─────────────────────────────────────────────────────

export function NumberMark({ n }: { n: number }) {
  return (
    <span
      className="font-display text-sm tracking-widest shrink-0"
      style={{ color: SUN.goldDeep }}
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// Button — 主要 CTA / 次要連結
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function SunButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-14 px-10 text-sm' : 'h-12 px-8 text-xs';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display tracking-[0.3em] uppercase transition-all',
          'hover:opacity-90 active:translate-y-px',
          className,
        )}
        style={{
          background: SUN.night,
          color: SUN.sandLight,
          letterSpacing: '0.3em',
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
          'font-display tracking-[0.3em] uppercase transition-all',
          'border hover:bg-white/40',
          className,
        )}
        style={{
          borderColor: SUN.night,
          color: SUN.night,
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
        'font-display text-xs tracking-[0.3em] uppercase',
        'transition-colors hover:opacity-70',
        className,
      )}
      style={{ color: SUN.ink }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Chip — category filter chip
// ─────────────────────────────────────────────────────

export function Chip({
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
      className={cn(
        'h-10 px-6',
        'font-display text-xs tracking-[0.3em] uppercase',
        'transition-all border',
      )}
      style={{
        background: active ? SUN.night : 'transparent',
        color: active ? SUN.sandLight : SUN.inkSoft,
        borderColor: active ? SUN.night : SUN.line,
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// HairLine — 細金色 / 深色分隔線
// ─────────────────────────────────────────────────────

export function HairLine({
  color = SUN.line,
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
