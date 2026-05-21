'use client';

/**
 * Clone — Wanderaway / Dolomites（角落旅行社 致敬克隆 demo #01）
 *
 * 設計語言來源（WebFetch + CSS 抽取自 wanderaway.qodeinteractive.com/dolomites/）：
 *   - 字型：Italiana（標題、極細高對比 didone serif）+ Jost（內文、現代 geometric sans）
 *   - 配色：cream / sand / sage 系（從 wanderaway-core.min.css 真實抓出）
 *       #fcefdf 主背景奶油色、#fff9ee 淺奶油、#fef4e4 米白
 *       #f1e9e0 沙、#ded7c5 muted sand
 *       #385b21 deep forest、#a6c5a9 sage、#edf3ed mist
 *       #1a1a1a 主文字
 *   - Hero：Title Case 標題（"Hi, I'm Nick Loren. Travel Enthusiast."）→ 我們套
 *           成「Wander Slowly. Stay In The Corners.」這種 Title Case 詩意句
 *   - Section title：Title Case（"Subscribe to a Newsletter."）、不全大寫
 *   - 排版：blog-list-centered（內容居中對齊）、留白慷慨、卡片大圖小字
 *
 * 法律：本檔是「設計語言重新實作」、非 theme 原始 HTML/CSS 移植。
 *
 * 紅線（globals.css 已 reset、這裡再次強調）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic（reference 也沒明顯用 italic、安全）
 *   3. 嚴格 8pt grid（spacing 2/4/6/8/12/16/20/24）
 *   4. 不用 ul/ol marker（用方塊 / 數字 / 線條替代）
 *   5. 不寫 lorem、文案扣回角落旅行社（漫途旗下品牌）
 *   6. icon 不套圓框
 */

import { Italiana, Jost } from 'next/font/google';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 字型（reference 用 Italiana + Jost、原樣導入）
// ─────────────────────────────────────────────────────

export const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--wa-serif',
  display: 'swap',
});

export const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--wa-sans',
  display: 'swap',
});

// ─────────────────────────────────────────────────────
// 色彩 token（cream / sage、抽取自 wanderaway-core.min.css）
// ─────────────────────────────────────────────────────

export const WA = {
  // cream / sand 系（背景與卡片）
  cream: '#fcefdf',
  creamLight: '#fff9ee',
  creamWarm: '#fef4e4',
  sand: '#f1e9e0',
  sandDeep: '#ded7c5',

  // sage / forest 系（強調與點綴）
  sage: '#a6c5a9',
  sageMist: '#edf3ed',
  sageSoft: '#d1e2d3',
  forest: '#385b21',

  // 中性深色（文字與深底）
  ink: '#1a1a1a',
  inkSoft: '#3d3d3d',
  inkFaint: '#7a7a7a',
  inkMute: '#a8a8a8',
  line: '#e4dccf',
  lineSoft: '#efe8db',
} as const;

// ─────────────────────────────────────────────────────
// FontVars — 把 Italiana / Jost CSS variable 注到外層
// 套用：每個 view 最外層 div className 加 fontClass
// ─────────────────────────────────────────────────────

export const fontClass = `${italiana.variable} ${jost.variable}`;

export const serif = { fontFamily: 'var(--wa-serif), "Times New Roman", serif' };
export const sans = { fontFamily: 'var(--wa-sans), system-ui, sans-serif' };

// ─────────────────────────────────────────────────────
// Eyebrow — 區塊上方小標籤（Title Case + 細短線分隔）
// reference：qodef-eyebrow 風格、不全大寫
// ─────────────────────────────────────────────────────

export function Eyebrow({
  children,
  align = 'center',
  className,
}: {
  children: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-4',
        align === 'center' ? 'justify-center' : 'justify-start',
        className,
      )}
    >
      <span
        aria-hidden
        className="block h-px w-10"
        style={{ background: WA.forest }}
      />
      <span
        className="text-[11px] tracking-[0.32em] uppercase"
        style={{ ...sans, color: WA.forest, fontWeight: 500 }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="block h-px w-10"
        style={{ background: WA.forest }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// DisplayTitle — Italiana 大標
// reference：hero h3 大標、Title Case、極細高對比 serif
// ─────────────────────────────────────────────────────

export function DisplayTitle({
  children,
  size = 'lg',
  align = 'center',
  className,
}: {
  children: ReactNode;
  size?: 'md' | 'lg' | 'xl';
  align?: 'center' | 'left';
  className?: string;
}) {
  const sizeCls =
    size === 'xl'
      ? 'text-[56px] md:text-[112px] leading-[1.04]'
      : size === 'lg'
        ? 'text-[40px] md:text-[80px] leading-[1.08]'
        : 'text-[32px] md:text-[56px] leading-[1.12]';

  return (
    <h2
      className={cn(
        sizeCls,
        align === 'center' ? 'text-center' : 'text-left',
        'font-normal tracking-[-0.005em]',
        className,
      )}
      style={{ ...serif, color: WA.ink }}
    >
      {children}
    </h2>
  );
}

// ─────────────────────────────────────────────────────
// BodyText — Jost 內文
// ─────────────────────────────────────────────────────

export function BodyText({
  children,
  size = 'md',
  align = 'center',
  muted,
  className,
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  align?: 'center' | 'left';
  muted?: boolean;
  className?: string;
}) {
  const sizeCls =
    size === 'lg'
      ? 'text-base md:text-lg leading-[1.85]'
      : size === 'md'
        ? 'text-[15px] leading-[1.85]'
        : 'text-sm leading-[1.8]';

  return (
    <p
      className={cn(
        sizeCls,
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
      style={{
        ...sans,
        color: muted ? WA.inkFaint : WA.inkSoft,
        fontWeight: 300,
      }}
    >
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────
// PillButton — reference 的 "View More" 按鈕
// 風格：透明底 + 細邊框 + 大圓角（pill）+ Jost uppercase
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'plain' | 'cream';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function PillButton({
  variant = 'solid',
  size = 'md',
  className,
  children,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg'
      ? 'h-14 px-12 text-[12px]'
      : 'h-12 px-10 text-[11px]';

  const base = cn(
    sizeCls,
    'rounded-full tracking-[0.28em] uppercase transition-all',
    'inline-flex items-center justify-center gap-3',
    'hover:translate-y-[-1px] active:translate-y-px',
  );

  if (variant === 'outline') {
    return (
      <button
        {...rest}
        className={cn(base, className)}
        style={{
          ...sans,
          fontWeight: 500,
          border: `1px solid ${WA.ink}`,
          color: WA.ink,
          background: 'transparent',
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === 'plain') {
    return (
      <button
        {...rest}
        className={cn(
          'tracking-[0.28em] uppercase text-[11px]',
          'inline-flex items-center gap-3',
          'hover:opacity-70 transition-opacity',
          className,
        )}
        style={{ ...sans, fontWeight: 500, color: WA.ink }}
      >
        {children}
      </button>
    );
  }

  if (variant === 'cream') {
    return (
      <button
        {...rest}
        className={cn(base, className)}
        style={{
          ...sans,
          fontWeight: 500,
          background: WA.creamLight,
          color: WA.ink,
        }}
      >
        {children}
      </button>
    );
  }

  // solid（預設、深底白字）
  return (
    <button
      {...rest}
      className={cn(base, className)}
      style={{
        ...sans,
        fontWeight: 500,
        background: WA.ink,
        color: WA.creamLight,
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Divider — reference 用大量水平短線分隔
// ─────────────────────────────────────────────────────

export function Divider({
  color = WA.line,
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
// SquareMark — 列點用 sage 小方塊（替代 ul bullet）
// ─────────────────────────────────────────────────────

export function SquareMark({
  size = 8,
  color = WA.forest,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{ width: size, height: size, background: color, marginTop: 8 }}
    />
  );
}

// ─────────────────────────────────────────────────────
// SerialNumeral — Italiana 襯線編號「01 / 02」
// reference：blog list 常用 serial 編號取代 bullet
// ─────────────────────────────────────────────────────

export function SerialNumeral({
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
      className={cn('inline-flex items-baseline gap-1', className)}
      style={{ ...serif, color: WA.forest }}
    >
      <span className="text-base">{String(n).padStart(2, '0')}</span>
      {total !== undefined && (
        <>
          <span className="text-xs opacity-50">/</span>
          <span className="text-xs opacity-50">
            {String(total).padStart(2, '0')}
          </span>
        </>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// CategoryLabel
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: 'Culture · 文化深度',
  adventure: 'Adventure · 荒野探險',
  honeymoon: 'Honeymoon · 蜜月私旅',
  aurora: 'Aurora · 極光季節',
};

export const CATEGORY_SHORT: Record<string, string> = {
  culture: 'Culture',
  adventure: 'Adventure',
  honeymoon: 'Honeymoon',
  aurora: 'Aurora',
};

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
  short: string;
}> = [
  { value: 'culture', label: 'Culture · 文化深度', short: 'Culture' },
  { value: 'adventure', label: 'Adventure · 荒野探險', short: 'Adventure' },
  { value: 'honeymoon', label: 'Honeymoon · 蜜月私旅', short: 'Honeymoon' },
  { value: 'aurora', label: 'Aurora · 極光季節', short: 'Aurora' },
];
