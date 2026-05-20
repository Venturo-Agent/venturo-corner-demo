'use client';

/**
 * 巴里島熱帶 — 共用 token、原子元件。
 *
 * vibe：叢林深處、稻田梯田、香料市場、慢時光、原住民工藝、SPA 與冥想。
 * 跟 maldives-whitesand（海天藍、漂浮、無時間、極簡奢侈）是完全不同氣質：
 *   maldives = 海洋、鹽分、留白、漂浮
 *   bali    = 叢林、香料、紋路、工藝、踏實
 *
 * 配色（William 拍板、不改）：
 *   #F4ECE0  椰殼米（主背景、暖土色）
 *   #D8A66B  香料金（強調、薑黃 / 椰糖）
 *   #5A6F3F  叢林綠（次要、椰葉 / 稻田）
 *   #252012  木刻棕（文字、深木）
 *
 * 紅線（globals.css 已 reset、這裡再次強調、寫的時候勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格對齊 + 8pt grid（spacing 用 2/4/6/8/12/16/20/24）
 *   4. 不用 ul/ol marker、列點用葉脈 SVG / 數字 / 細刻線
 *   5. 不寫 lorem ipsum、文案扣回「角落 + 巴里島工藝 + 慢時光」
 *   6. icon 不套圓框
 *
 * 設計語彙：
 *   - 紋路：極淡草編 / 藤蔓 / 木紋 SVG pattern 當區塊背景
 *   - 葉脈：作為 marker / divider 的小 SVG
 *   - 印章：印度尼西亞老銅印氛圍、用在 SectionLabel / 編號
 *   - 入場：「捲簾打開」式 reveal、不是 maldives 那種浮起
 *   - hover：葉子轉動 / 香料粒淡入、不是水紋
 *   - scroll：hero 不沉、用 subtle 縮放 stay
 *   - spacing：比 maldives 更密集、密集到「工藝堆疊感」、不留太多虛空
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token
// ─────────────────────────────────────────────────────

export const BALI = {
  // 主四色
  coconut: '#F4ECE0',
  spice: '#D8A66B',
  jungle: '#5A6F3F',
  wood: '#252012',

  // 衍生
  coconutLight: '#FAF5EC',
  coconutDeep: '#E8DCC6',
  coconutBone: '#F0E6D4',
  spiceLight: '#E8C28F',
  spiceDeep: '#B98744',
  spiceClay: '#A36A38',
  jungleLight: '#7C9359',
  jungleDeep: '#3F5028',
  jungleMoss: '#4A5C33',
  woodLight: '#3F352A',
  woodMid: '#5A4C3A',

  // ink scale
  ink: '#252012',
  inkSoft: '#5A4C3A',
  inkFaint: '#8C7D68',
  inkGhost: '#B5A892',

  // 線
  line: '#D8C5A4',
  lineLight: '#E5D7BA',
  lineDeep: '#B59E78',
} as const;

// ─────────────────────────────────────────────────────
// 動畫常數
// ─────────────────────────────────────────────────────

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_LEAF = [0.65, 0, 0.35, 1] as const;

// 「捲簾」reveal — clip-path 從上方拉開
export const SCROLL_REVEAL = {
  initial: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  animate: { clipPath: 'inset(0 0 0% 0)', opacity: 1 },
  transition: { duration: 0.9, ease: EASE_OUT },
};

// 葉子轉動 — hover 時 SVG 葉脈 rotate
export const LEAF_HOVER = {
  rest: { rotate: 0 },
  hover: { rotate: 12 },
};

// ─────────────────────────────────────────────────────
// LeafIcon — 葉脈 SVG（巴里風小符號、不是真實葉子、更像印章紋）
// 用於 marker / divider / decoration
// ─────────────────────────────────────────────────────

export function LeafIcon({
  size = 16,
  color = BALI.jungle,
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
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ color }}
    >
      <path
        d="M12 3 C7 7 4 12 4 17 C9 16 13 13 16 9 C17.5 7 18.5 5 19 3 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M12 3 C10.5 9 8 13 4 17"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M8 8 L10 9 M7 12 L10 12 M9 15 L11 14"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// LotusIcon — 蓮花、巴里廟宇常見符號
// 用於 SectionLabel 兩側 / 印章
// ─────────────────────────────────────────────────────

export function LotusIcon({
  size = 12,
  color = BALI.spiceDeep,
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
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ color }}
    >
      <path
        d="M12 4 C10 8 10 11 12 14 C14 11 14 8 12 4 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M5 11 C7 8 10 9 12 13 C10 14 7 14 5 11 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M19 11 C17 8 14 9 12 13 C14 14 17 14 19 11 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M4 15 L20 15"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M3 17 L21 17"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// SpiceGrain — 香料粒、3 個小點構成
// 用於分隔符號（替代 •、實際是橫排 SVG）
// ─────────────────────────────────────────────────────

export function SpiceGrain({
  color = BALI.spiceClay,
  size = 4,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className="inline-flex items-center gap-[3px]"
    >
      <span
        className="block"
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: '50%',
        }}
      />
      <span
        className="block"
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: '50%',
          opacity: 0.6,
        }}
      />
      <span
        className="block"
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: '50%',
          opacity: 0.3,
        }}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────
// WeavePattern — 草編紋路 SVG 背景（極淡）
// 用於 section 背景紋路、增加「手工質感」
// ─────────────────────────────────────────────────────

export function WeavePattern({
  opacity = 0.06,
  color = BALI.wood,
  className,
}: {
  opacity?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        opacity,
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent 0,
            transparent 14px,
            ${color} 14px,
            ${color} 15px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent 0,
            transparent 14px,
            ${color} 14px,
            ${color} 15px
          )
        `,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────
// CarvedLine — 木刻線（粗的、有手工感）
// 比 maldives 的 SeaLine 更厚重、像木刻凹槽
// ─────────────────────────────────────────────────────

export function CarvedLine({
  color = BALI.line,
  thickness = 1,
  className,
}: {
  color?: string;
  thickness?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn('w-full', className)}
      style={{
        height: thickness,
        background: color,
      }}
    />
  );
}

// 雙刻線（兩條線中間留白、像木紋分割）
export function DoubleCarved({
  color = BALI.line,
  gap = 4,
  className,
}: {
  color?: string;
  gap?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn('w-full', className)}
      style={{ paddingTop: gap, paddingBottom: 0 }}
    >
      <div style={{ height: 1, background: color }} />
      <div style={{ height: gap }} />
      <div style={{ height: 1, background: color, opacity: 0.5 }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SectionLabel — 區塊上方小標籤
// 結構：[蓮花] [短刻線] LABEL [短刻線] [蓮花]
// 比 maldives 的細線標籤多了「印章符號」感
// ─────────────────────────────────────────────────────

export function SectionLabel({
  children,
  className,
  align = 'left',
  tone = 'spice',
}: {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  tone?: 'spice' | 'jungle' | 'coconut';
}) {
  const palette = {
    spice: { line: BALI.spice, text: BALI.spiceDeep, icon: BALI.spiceDeep },
    jungle: { line: BALI.jungle, text: BALI.jungleDeep, icon: BALI.jungleDeep },
    coconut: {
      line: 'rgba(244,236,224,0.45)',
      text: 'rgba(244,236,224,0.9)',
      icon: 'rgba(244,236,224,0.85)',
    },
  }[tone];

  return (
    <div
      className={cn(
        'flex items-center gap-3',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <LotusIcon size={11} color={palette.icon} />
      <span
        aria-hidden
        className="block h-px w-6"
        style={{ background: palette.line }}
      />
      <span
        className="font-display text-[10px] tracking-[0.45em] uppercase"
        style={{ color: palette.text, fontWeight: 400 }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="block h-px w-6"
        style={{ background: palette.line }}
      />
      <LotusIcon size={11} color={palette.icon} />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// StampNumber — 「No.07」印章式數字
// 比 maldives 的單純襯線數字多了「印章框」
// ─────────────────────────────────────────────────────

export function StampNumber({
  n,
  className,
  tone = 'spice',
}: {
  n: number;
  className?: string;
  tone?: 'spice' | 'jungle' | 'wood' | 'light';
}) {
  const palette = {
    spice: { border: BALI.spice, text: BALI.spiceDeep, bg: 'transparent' },
    jungle: { border: BALI.jungle, text: BALI.jungleDeep, bg: 'transparent' },
    wood: { border: BALI.wood, text: BALI.wood, bg: 'transparent' },
    light: {
      border: 'rgba(244,236,224,0.45)',
      text: BALI.coconutLight,
      bg: 'transparent',
    },
  }[tone];
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-1 px-2 py-1 font-mono text-[10px] tracking-[0.25em] uppercase',
        className,
      )}
      style={{
        border: `1px solid ${palette.border}`,
        color: palette.text,
        background: palette.bg,
      }}
    >
      <span style={{ opacity: 0.7 }}>No.</span>
      <span>{String(n).padStart(2, '0')}</span>
    </span>
  );
}

// ─────────────────────────────────────────────────────
// LeafMark — 列點用、葉脈圖示
// 替代 ul/ol marker
// ─────────────────────────────────────────────────────

export function LeafMark({
  size = 14,
  color = BALI.jungle,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{ marginTop: 4 }}
    >
      <LeafIcon size={size} color={color} />
    </span>
  );
}

// ─────────────────────────────────────────────────────
// BaliButton — 主 CTA / outline / ghost / spice
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'spice' | 'light';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function BaliButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  style,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-14 px-12 text-[11px]' : 'h-12 px-9 text-[10px]';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display tracking-[0.4em] uppercase transition-all',
          'hover:opacity-90 active:translate-y-px',
          className,
        )}
        style={{
          background: BALI.wood,
          color: BALI.coconutLight,
          fontWeight: 400,
          ...style,
        }}
      >
        {children}
      </button>
    );
  }
  if (variant === 'spice') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display tracking-[0.4em] uppercase transition-all',
          'hover:opacity-90 active:translate-y-px',
          className,
        )}
        style={{
          background: BALI.spiceDeep,
          color: BALI.coconutLight,
          fontWeight: 400,
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
          'font-display tracking-[0.4em] uppercase transition-all',
          'border hover:bg-white/30',
          className,
        )}
        style={{
          borderColor: BALI.wood,
          color: BALI.wood,
          fontWeight: 400,
          ...style,
        }}
      >
        {children}
      </button>
    );
  }
  if (variant === 'light') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display tracking-[0.4em] uppercase transition-all',
          'hover:opacity-90 active:translate-y-px',
          className,
        )}
        style={{
          background: BALI.coconutLight,
          color: BALI.wood,
          fontWeight: 400,
          ...style,
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
        'font-display text-[11px] tracking-[0.4em] uppercase',
        'transition-opacity hover:opacity-60',
        className,
      )}
      style={{ color: BALI.wood, fontWeight: 400, ...style }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Chip — category filter chip
// 跟 maldives 不同：用 outline + 葉脈圖示在 active 時亮起
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
        'h-10 px-6 inline-flex items-center gap-3',
        'font-display text-[10px] tracking-[0.4em] uppercase',
        'transition-all border',
      )}
      style={{
        background: active ? BALI.wood : 'transparent',
        color: active ? BALI.coconutLight : BALI.inkSoft,
        borderColor: active ? BALI.wood : BALI.line,
        fontWeight: 400,
      }}
    >
      {active && (
        <LeafIcon size={11} color={BALI.spiceLight} />
      )}
      <span>{children}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────
// CATEGORY label
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '文化深度',
  adventure: '荒野探險',
  honeymoon: '蜜月私旅',
  aurora: '極光季節',
};

export const CATEGORY_LABEL_EN: Record<string, string> = {
  culture: 'Cultural',
  adventure: 'Adventure',
  honeymoon: 'Honeymoon',
  aurora: 'Aurora',
};

// 海島 demo 排序：蜜月優先（巴里也是熱帶蜜月勝地）
export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
  labelEn: string;
}> = [
  { value: 'honeymoon', label: '蜜月私旅', labelEn: 'Honeymoon' },
  { value: 'culture', label: '文化深度', labelEn: 'Cultural' },
  { value: 'adventure', label: '荒野探險', labelEn: 'Adventure' },
  { value: 'aurora', label: '極光季節', labelEn: 'Aurora' },
];

// ─────────────────────────────────────────────────────
// FrameCorner — 卡片四角的「木刻角飾」
// 4 個 SVG 角、巴里工藝感
// ─────────────────────────────────────────────────────

export function FrameCorners({
  color = BALI.spice,
  size = 18,
  inset = 0,
}: {
  color?: string;
  size?: number;
  inset?: number;
}) {
  const cornerPath = (
    <path
      d="M0 8 L0 0 L8 0"
      stroke={color}
      strokeWidth="1.2"
      fill="none"
    />
  );
  const sizeSty = { width: size, height: size };
  const insetSty = inset ? { top: inset, left: inset, right: inset, bottom: inset } : {};

  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 8 8"
        className="absolute pointer-events-none"
        style={{
          ...sizeSty,
          top: insetSty.top ?? 0,
          left: insetSty.left ?? 0,
        }}
      >
        {cornerPath}
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 8 8"
        className="absolute pointer-events-none"
        style={{
          ...sizeSty,
          top: insetSty.top ?? 0,
          right: insetSty.right ?? 0,
          transform: 'scaleX(-1)',
        }}
      >
        {cornerPath}
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 8 8"
        className="absolute pointer-events-none"
        style={{
          ...sizeSty,
          bottom: insetSty.bottom ?? 0,
          left: insetSty.left ?? 0,
          transform: 'scaleY(-1)',
        }}
      >
        {cornerPath}
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 8 8"
        className="absolute pointer-events-none"
        style={{
          ...sizeSty,
          bottom: insetSty.bottom ?? 0,
          right: insetSty.right ?? 0,
          transform: 'scale(-1, -1)',
        }}
      >
        {cornerPath}
      </svg>
    </>
  );
}

// ─────────────────────────────────────────────────────
// LeafDivider — 區塊間分隔線、中央葉脈圖
// ─────────────────────────────────────────────────────

export function LeafDivider({
  color = BALI.line,
  iconColor = BALI.spiceDeep,
  className,
}: {
  color?: string;
  iconColor?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4 w-full', className)}>
      <span
        aria-hidden
        className="block h-px flex-1"
        style={{ background: color }}
      />
      <LeafIcon size={14} color={iconColor} />
      <span
        aria-hidden
        className="block h-px flex-1"
        style={{ background: color }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// JungleFooter — 共用 footer（5 個 view 都用）
// 風格：深木背景、jungle 點綴、像「雕在木板上的告示」
// ─────────────────────────────────────────────────────

export function JungleFooter() {
  return (
    <footer
      className="relative px-6 md:px-12 pt-24 pb-14"
      style={{ background: BALI.wood, color: BALI.coconutLight }}
    >
      <WeavePattern opacity={0.04} color={BALI.coconutLight} />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14">
          <LeafDivider
            color="rgba(244,236,224,0.18)"
            iconColor={BALI.spice}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <LotusIcon size={14} color={BALI.spice} />
              <p
                className="font-display text-[10px] tracking-[0.5em] uppercase"
                style={{ color: BALI.spiceLight, fontWeight: 400 }}
              >
                Corner Travel · Est. 2018
              </p>
            </div>
            <p
              className="font-display text-3xl md:text-[42px] leading-[1.35]"
              style={{ color: BALI.coconutLight, fontWeight: 400 }}
            >
              在角落
              <br />
              在叢林 在土地
            </p>
            <p
              className="mt-8 text-sm leading-[2.1] max-w-md"
              style={{ color: 'rgba(244,236,224,0.7)' }}
            >
              漫途旅遊旗下品牌
              <br />
              交觀甲 7654 號 · 品保中 1234
            </p>
          </div>

          <div className="md:col-span-3">
            <p
              className="font-display text-[10px] tracking-[0.5em] uppercase mb-6"
              style={{ color: BALI.spiceLight, fontWeight: 400 }}
            >
              Contact
            </p>
            <p
              className="text-sm leading-[2.1]"
              style={{ color: 'rgba(244,236,224,0.88)' }}
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

          <div className="md:col-span-4">
            <p
              className="font-display text-[10px] tracking-[0.5em] uppercase mb-6"
              style={{ color: BALI.spiceLight, fontWeight: 400 }}
            >
              Office Hours
            </p>
            <p
              className="text-sm leading-[2.1]"
              style={{ color: 'rgba(244,236,224,0.88)' }}
            >
              週一至週五 10:00 — 19:00
              <br />
              週六 11:00 — 17:00
              <br />
              週日 採完全預約制
            </p>
          </div>
        </div>

        <CarvedLine color="rgba(244,236,224,0.15)" />

        <div className="mt-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="font-mono text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(244,236,224,0.5)' }}
          >
            © 2026 Corner Travel · A Venturo Brand
          </p>
          <p
            className="font-mono text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(244,236,224,0.5)' }}
          >
            Crafted in Taipei · Curated for the Jungle
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────
// CoverImage — 圖片包裝、預設加暖調 filter
// 巴里 demo 所有圖片用 saturate + 微 warmth 統一視覺
// ─────────────────────────────────────────────────────

export function ImageWarmth({ children }: { children: ReactNode }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        filter: 'saturate(1.08) contrast(1.02) brightness(0.97)',
      }}
    >
      {children}
    </div>
  );
}

// re-export motion 方便其他檔 reuse 同一 instance
export { motion };
