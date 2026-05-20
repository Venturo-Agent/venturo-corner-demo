'use client';

/**
 * 無印靜物 — Muji Stillness
 *
 * 共用 token、原子元件。
 *
 * 設計哲學：
 *   - 節制：能拿掉就拿掉、能留白就留白、能小就小
 *   - 平淡：沒有強調色、沒有 hero spotlight、沒有奢華感
 *   - 規則：8pt grid + 規則網格 + 對齊嚴格
 *   - 物件感：每個元素像無印商品 catalog 上的一張卡
 *
 * 配色（William 拍板、勿改）：
 *   #F5F2EC  米紙白（主背景）
 *   #D7CFC1  麻布灰（次要面、底色塊）
 *   #7C7166  木紋褐（弱強調、線條 / metadata）
 *   #2A2722  墨黑（文字）
 *
 * 紅線（globals.css 已 reset、不准違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格對齊 + 8pt grid（spacing 偏好 2/4/8/16/24）
 *   4. 不用 ul/ol marker、列點用方塊 / 數字 / 細線
 *   5. icon 不套圓框（不要 rounded-full bg-amber）
 *   6. 不要大 tracking（無印字距正常）
 *   7. 標題不要過大（4xl-5xl 為上限）
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token
// ─────────────────────────────────────────────────────

export const MUJI = {
  paper: '#F5F2EC', // 米紙白
  paperSoft: '#FAF8F3', // 略亮的紙（卡片內部）
  linen: '#D7CFC1', // 麻布灰
  linenSoft: '#E5DFD2', // 略亮的麻布
  wood: '#7C7166', // 木紋褐
  woodSoft: '#A39885', // 略淡的木褐
  ink: '#2A2722', // 墨黑（主文字）
  inkMid: '#5C544B', // 中間色文字
  inkFaint: '#9A9085', // 弱化文字
  line: '#C9C0AF', // 細線色（比 linen 略深、避免融進去）
} as const;

// ─────────────────────────────────────────────────────
// IndexLabel — 區塊上方小編號（catalog 感）
// 譬如 「001 — 商品介紹」、左對齊、細線之上
// ─────────────────────────────────────────────────────

export function IndexLabel({
  index,
  children,
  className,
  align = 'left',
}: {
  index: string;
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
        className="font-mono text-xs"
        style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
      >
        {index}
      </span>
      <span
        className="font-body text-xs"
        style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SectionTitle — 區塊主標題、配 IndexLabel 用
// 無印的標題尺寸小、靠粗細與顏色拉層級、不靠 size
// ─────────────────────────────────────────────────────

export function SectionTitle({
  children,
  className,
  level = 2,
}: {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3;
}) {
  const sizeCls =
    level === 1
      ? 'text-3xl md:text-4xl'
      : level === 2
        ? 'text-2xl md:text-3xl'
        : 'text-xl md:text-2xl';
  return (
    <h2
      className={cn(
        'font-display leading-snug',
        sizeCls,
        className,
      )}
      style={{ color: MUJI.ink, fontWeight: 500 }}
    >
      {children}
    </h2>
  );
}

// ─────────────────────────────────────────────────────
// NumberMark — 列點用、襯線數字「01」「02」、無印的目錄編號感
// ─────────────────────────────────────────────────────

export function NumberMark({ n }: { n: number }) {
  return (
    <span
      className="font-mono text-xs shrink-0"
      style={{ color: MUJI.wood }}
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// SquareMark — 列點用、極小實心方塊（不是圓點）
// 比 mediterranean 的金方塊更小、更暗
// ─────────────────────────────────────────────────────

export function SquareMark({ size = 6 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{
        width: size,
        height: size,
        background: MUJI.ink,
        marginTop: 9,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────
// Hair / DoubleHair — 細線
// 無印很愛用「兩條線中間夾標題」、所以保留兩種
// ─────────────────────────────────────────────────────

export function Hair({
  color = MUJI.line,
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
// MujiButton — 主要 CTA / outline / link
// 無印按鈕的精髓：方角、細邊、黑白、無漸層、無陰影
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'link';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function MujiButton({
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
          'hover:opacity-85 active:translate-y-px',
          className,
        )}
        style={{
          background: MUJI.ink,
          color: MUJI.paper,
          letterSpacing: '0.08em',
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
          color: MUJI.ink,
          borderColor: MUJI.ink,
          letterSpacing: '0.08em',
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
      style={{ color: MUJI.ink, letterSpacing: '0.06em' }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// TagPill — 極簡 tag（純文字 + 細邊 + 方角）
// 無印不用 rounded-full、用方角
// ─────────────────────────────────────────────────────

export function TagPill({
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
        background: active ? MUJI.ink : 'transparent',
        color: active ? MUJI.paper : MUJI.inkMid,
        borderColor: active ? MUJI.ink : MUJI.line,
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// MetaRow — 規則網格的 key / value 一行
// ─────────────────────────────────────────────────────

export function MetaRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 py-3" style={{ borderBottom: `1px solid ${MUJI.line}` }}>
      <span
        className="font-mono text-xs"
        style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
      >
        {label}
      </span>
      <span
        className="font-body text-sm"
        style={{ color: MUJI.ink }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// CATEGORY 對照表
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '文化',
  adventure: '荒野',
  honeymoon: '蜜月',
  aurora: '極光',
};

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
}> = [
  { value: 'culture', label: '文化' },
  { value: 'adventure', label: '荒野' },
  { value: 'honeymoon', label: '蜜月' },
  { value: 'aurora', label: '極光' },
];

// ─────────────────────────────────────────────────────
// 共用文案 — 角落旅行社「無印靜物」分號子品牌
// 跟 mediterranean-sun 的文案區隔（這版偏「日常感」）
// ─────────────────────────────────────────────────────

export const BRAND = {
  // logo / corner mark
  marque: 'CORNER',
  marqueZh: '角落旅行社',
  established: 'Est. 2018 — Taipei',
  // home statement（短而平）
  homeStatement: '在角落，過日常。',
  homeStatementSub:
    '我們不販賣壯麗的景觀。\n我們只挑選那些，讓你回家之後，\n看待自己日常的方式會稍微改變的地方。',
  // ourpath（為什麼要這樣做）
  ourPath:
    '一個城市最動人的部分，\n通常不在地標、不在景點、\n而在某個轉角的小店、某個午後的光、\n某個你叫不出名字的人。',
} as const;
