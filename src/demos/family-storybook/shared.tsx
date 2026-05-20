'use client';

/**
 * 親子繪本 — 共用 token、原子元件、SVG 童趣裝飾
 *
 * 配色（William 拍板、不改）：
 *   #FFE7D1  桃米橘（主背景、暖）
 *   #FFB347  童橘黃（強調、童書封面那種橘）
 *   #5BA8D0  童藍（次要、童書水彩天空）
 *   #2B3C6B  故事夜藍（主文字）
 *
 * vibe：精緻繪本（不是迪士尼大批發）
 *   - 中產家庭買的書、印刷漂亮、插畫有作家風格
 *   - 暖、亮、有「角色」感、有故事性
 *   - 圓潤、但不過於甜膩；活潑、但不喧鬧
 *
 * 紅線（globals.css 已 reset、再次強調）：
 *   1. 不用 • ● ◦ 字符（裝飾字符 ❌、SVG shape ✅）
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格對齊 + 8pt grid（spacing 用 2/4/6/8/12/16/20/24/32）
 *   4. 不用 ul/ol marker、列點用 SVG 星星 / 小花 / 數字圖章
 *   5. icon 不套圓框（但 SVG 角色 / 太陽 / 雲朵 大形狀 OK、那是插畫不是 icon）
 */

import { type ReactNode, type ButtonHTMLAttributes, type SVGProps } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token
// ─────────────────────────────────────────────────────

export const BOOK = {
  // 主背景 — 桃米橘、像繪本紙質
  paper: '#FFE7D1',
  paperLight: '#FFF3E2',
  paperWarm: '#FCDAB7',
  paperDeep: '#F8CB99',

  // 童橘黃 — 強調、橘子、太陽
  orange: '#FFB347',
  orangeDeep: '#E08F2A',
  orangeLight: '#FFCB7E',

  // 童藍 — 水彩天空、池塘、襯線數字
  sky: '#5BA8D0',
  skyDeep: '#3B86AE',
  skyLight: '#9CCAE2',

  // 故事夜藍 — 主文字、印刷感深色
  ink: '#2B3C6B',
  inkSoft: '#5A6890',
  inkFaint: '#8E96B0',

  // 輔助
  cream: '#FFFBF3',
  leaf: '#7AB97A',
  blossom: '#F3A6A6',
  line: '#E8C9A5',
} as const;

// ─────────────────────────────────────────────────────
// SVG 童趣裝飾 — 全部用實心 path、不用 • 字符
// 大型化、像繪本插畫
// ─────────────────────────────────────────────────────

// 太陽（chunky、繪本封面風）
export function Sun({
  size = 64,
  color = BOOK.orange,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <circle cx="32" cy="32" r="14" fill={color} />
      {/* 8 道光、用線而非圓點 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 32 + Math.cos(rad) * 20;
        const y1 = 32 + Math.sin(rad) * 20;
        const x2 = 32 + Math.cos(rad) * 28;
        const y2 = 32 + Math.sin(rad) * 28;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

// 雲朵（繪本水彩感）
export function Cloud({
  size = 80,
  color = BOOK.cream,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M16 36 C 8 36, 4 28, 10 22 C 8 12, 22 8, 26 18 C 30 8, 48 8, 50 20 C 60 16, 72 22, 68 32 C 76 34, 76 42, 68 42 L 18 42 C 12 42, 12 38, 16 36 Z"
        fill={color}
      />
    </svg>
  );
}

// 紙飛機 — 旅行符號
export function PaperPlane({
  size = 48,
  color = BOOK.ink,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M4 24 L 42 8 L 30 42 L 24 28 L 4 24 Z"
        fill={color}
      />
      <path
        d="M24 28 L 42 8"
        stroke={BOOK.cream}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// 星星（5 角、實心、繪本童書感）
export function Star({
  size = 24,
  color = BOOK.orange,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M12 2 L 14.4 8.5 L 21.5 9 L 16 13.5 L 17.8 20.5 L 12 16.8 L 6.2 20.5 L 8 13.5 L 2.5 9 L 9.6 8.5 Z"
        fill={color}
      />
    </svg>
  );
}

// 樹（繪本式、圓頂）
export function Tree({
  size = 56,
  leaf = BOOK.leaf,
  trunk = BOOK.orangeDeep,
  ...rest
}: { size?: number; leaf?: string; trunk?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <rect x="24" y="34" width="8" height="18" fill={trunk} />
      <ellipse cx="28" cy="24" rx="20" ry="18" fill={leaf} />
      <ellipse cx="20" cy="20" rx="8" ry="6" fill={BOOK.cream} opacity="0.25" />
    </svg>
  );
}

// 山（重疊三角、繪本風）
export function Mountain({
  size = 80,
  color = BOOK.sky,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path d="M0 44 L 22 12 L 38 32 L 50 18 L 80 44 Z" fill={color} />
      <path
        d="M22 12 L 28 20 L 18 20 Z"
        fill={BOOK.cream}
        opacity="0.55"
      />
      <path
        d="M50 18 L 54 24 L 46 24 Z"
        fill={BOOK.cream}
        opacity="0.55"
      />
    </svg>
  );
}

// 小鳥（飛行剪影、簡單 W 形）
export function Bird({
  size = 28,
  color = BOOK.ink,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 28 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M1 10 C 4 4, 8 4, 10 8 C 12 4, 16 4, 18 8 C 20 4, 24 4, 27 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// 地球（圓 + 大陸剪影）
export function Globe({
  size = 64,
  ...rest
}: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <circle cx="32" cy="32" r="26" fill={BOOK.sky} />
      <path
        d="M14 24 C 22 22, 28 26, 26 32 C 24 38, 30 42, 36 38 C 42 36, 48 40, 46 46 L 30 50 C 18 46, 12 36, 14 24 Z"
        fill={BOOK.leaf}
      />
      <path
        d="M40 16 C 44 18, 48 22, 46 26 C 42 28, 38 24, 40 16 Z"
        fill={BOOK.leaf}
      />
      <circle cx="32" cy="32" r="26" stroke={BOOK.ink} strokeWidth="2" fill="none" />
    </svg>
  );
}

// 相機（家庭相機 — 童書符號）
export function Camera({
  size = 40,
  color = BOOK.ink,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M6 12 L 14 12 L 17 8 L 23 8 L 26 12 L 34 12 L 34 32 L 6 32 Z"
        fill={color}
      />
      <circle cx="20" cy="22" r="6" fill={BOOK.cream} />
      <circle cx="20" cy="22" r="3" fill={color} />
      <rect x="28" y="14" width="3" height="3" fill={BOOK.orange} />
    </svg>
  );
}

// 行李箱
export function Suitcase({
  size = 40,
  color = BOOK.orangeDeep,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <rect x="14" y="8" width="12" height="4" fill={color} />
      <rect x="6" y="12" width="28" height="22" fill={color} />
      <rect x="18" y="12" width="4" height="22" fill={BOOK.cream} opacity="0.35" />
      <rect x="6" y="18" width="28" height="2" fill={BOOK.cream} opacity="0.3" />
    </svg>
  );
}

// 小花（5 瓣、實心）
export function Flower({
  size = 24,
  color = BOOK.blossom,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 12 + Math.cos(rad) * 5;
        const cy = 12 + Math.sin(rad) * 5;
        return (
          <ellipse
            key={deg}
            cx={cx}
            cy={cy}
            rx="4"
            ry="4"
            fill={color}
          />
        );
      })}
      <circle cx="12" cy="12" r="2.5" fill={BOOK.orange} />
    </svg>
  );
}

// 月亮（彎月、繪本風）
export function Moon({
  size = 40,
  color = BOOK.cream,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M30 8 C 18 8, 8 18, 8 30 C 8 18, 18 8, 30 8 Z M 22 4 C 12 4, 4 12, 4 22 C 4 32, 12 40, 22 40 C 16 36, 12 30, 12 22 C 12 14, 16 8, 22 4 Z"
        fill={color}
      />
    </svg>
  );
}

// 章魚水手（馬爾地夫團、海洋符號）
export function Whale({
  size = 80,
  color = BOOK.sky,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <ellipse cx="34" cy="28" rx="28" ry="14" fill={color} />
      <path d="M62 24 L 78 14 L 78 38 L 62 32 Z" fill={color} />
      <circle cx="20" cy="24" r="2.5" fill={BOOK.ink} />
      <path
        d="M28 14 C 26 8, 32 4, 34 8"
        stroke={BOOK.skyLight}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M40 14 C 38 8, 44 4, 46 8"
        stroke={BOOK.skyLight}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 雪花（北歐極光團）
export function Snowflake({
  size = 32,
  color = BOOK.sky,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      {[0, 60, 120].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 16 16)`}>
          <line
            x1="16"
            y1="3"
            x2="16"
            y2="29"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="16"
            y1="6"
            x2="13"
            y2="9"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="16"
            y1="6"
            x2="19"
            y2="9"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

// 楓葉（京都團）
export function Leaf({
  size = 32,
  color = BOOK.orangeDeep,
  ...rest
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        d="M16 4 L 20 10 L 28 8 L 24 16 L 30 22 L 22 22 L 20 30 L 16 24 L 12 30 L 10 22 L 2 22 L 8 16 L 4 8 L 12 10 Z"
        fill={color}
      />
      <line x1="16" y1="14" x2="16" y2="28" stroke={BOOK.cream} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// 標籤組件 — 章節 / 段落上方的「故事標籤」
// 用 SVG 星星 + 大字距、不用 horizontal line
// ─────────────────────────────────────────────────────

export function ChapterLabel({
  children,
  className,
  align = 'left',
  starColor = BOOK.orange,
}: {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  starColor?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-4',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <Star size={18} color={starColor} />
      <span
        className="font-body font-semibold text-xs tracking-[0.32em] uppercase"
        style={{ color: BOOK.orangeDeep }}
      >
        {children}
      </span>
      <Star size={18} color={starColor} />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// 故事數字章節 — 「Chapter 01」風格、用大寫襯線數字
// 像繪本內頁編號
// ─────────────────────────────────────────────────────

export function ChapterNumber({
  n,
  size = 'md',
}: {
  n: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeCls =
    size === 'lg'
      ? 'text-6xl md:text-7xl'
      : size === 'sm'
        ? 'text-2xl'
        : 'text-4xl md:text-5xl';
  return (
    <span
      className={cn('font-display font-semibold leading-none', sizeCls)}
      style={{ color: BOOK.sky }}
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// StoryButton — 繪本感按鈕（圓潤、有 hover 微 wobble）
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'md' | 'lg';
  children: ReactNode;
  full?: boolean;
};

export function StoryButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  full,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-16 px-10 text-base' : 'h-12 px-8 text-sm';
  const widthCls = full ? 'w-full' : '';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          widthCls,
          'font-body font-semibold tracking-wider',
          'rounded-full transition-all duration-300',
          'hover:-translate-y-0.5 hover:rotate-[-0.8deg] active:translate-y-0',
          'shadow-[0_6px_0_0_#E08F2A] hover:shadow-[0_8px_0_0_#E08F2A] active:shadow-[0_2px_0_0_#E08F2A]',
          className,
        )}
        style={{
          background: BOOK.orange,
          color: BOOK.ink,
        }}
      >
        {children}
      </button>
    );
  }
  if (variant === 'secondary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          widthCls,
          'font-body font-semibold tracking-wider',
          'rounded-full transition-all duration-300',
          'hover:-translate-y-0.5 hover:rotate-[0.8deg] active:translate-y-0',
          'shadow-[0_6px_0_0_#3B86AE] hover:shadow-[0_8px_0_0_#3B86AE] active:shadow-[0_2px_0_0_#3B86AE]',
          className,
        )}
        style={{
          background: BOOK.sky,
          color: BOOK.cream,
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
          widthCls,
          'font-body font-semibold tracking-wider',
          'rounded-full transition-all duration-300 border-[2.5px]',
          'hover:-translate-y-0.5',
          className,
        )}
        style={{
          borderColor: BOOK.ink,
          color: BOOK.ink,
          background: 'transparent',
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
        'font-body font-semibold text-sm tracking-wider',
        'transition-colors hover:underline underline-offset-4',
        className,
      )}
      style={{ color: BOOK.orangeDeep }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// StickerBadge — 繪本貼紙感 tag
// 用於 category、age range 等小標
// ─────────────────────────────────────────────────────

export function StickerBadge({
  children,
  color = BOOK.orange,
  textColor = BOOK.ink,
  rotate = -2,
  className,
}: {
  children: ReactNode;
  color?: string;
  textColor?: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-4 py-1.5',
        'font-body font-semibold text-xs tracking-wider',
        'rounded-full shadow-[0_3px_0_0_rgba(43,60,107,0.15)]',
        className,
      )}
      style={{
        background: color,
        color: textColor,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// StorybookCard — 繪本內頁感卡片底
// 白底 + 童書插畫風邊框（rounded、有微 rotate）
// ─────────────────────────────────────────────────────

export function StorybookCard({
  children,
  className,
  rotate = 0,
  bg = BOOK.cream,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  bg?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-3xl overflow-hidden',
        'shadow-[0_8px_0_0_rgba(43,60,107,0.08),0_16px_32px_-12px_rgba(43,60,107,0.18)]',
        className,
      )}
      style={{
        background: bg,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PageCorner — 翻頁書角符號（裝飾用）
// ─────────────────────────────────────────────────────

export function PageCorner({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M0 0 L 40 0 L 40 28 L 28 40 L 0 40 Z"
        fill={BOOK.cream}
      />
      <path
        d="M28 40 L 28 28 L 40 28"
        stroke={BOOK.line}
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M40 28 L 28 40"
        stroke={BOOK.line}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// FloatingDecor — 飄浮的童趣裝飾 wrapper
// 加入 wobble 動畫類別、給 page 邊角用
// ─────────────────────────────────────────────────────

export function FloatingDecor({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none select-none', className)}
      style={{
        animation: `storybook-float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes storybook-float {
          0%,
          100% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Chip — 繪本風 category filter
// ─────────────────────────────────────────────────────

export function Chip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick?: () => void;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-12 px-6 inline-flex items-center gap-2',
        'font-body font-semibold text-sm tracking-wider',
        'rounded-full transition-all duration-300 border-[2px]',
        'hover:-translate-y-0.5',
      )}
      style={{
        background: active ? BOOK.ink : BOOK.cream,
        color: active ? BOOK.cream : BOOK.ink,
        borderColor: active ? BOOK.ink : BOOK.line,
        boxShadow: active
          ? `0 4px 0 0 ${BOOK.skyDeep}`
          : `0 4px 0 0 ${BOOK.line}`,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// CategoryLabel — tour 卡片上方類別文字
// 配 SVG 角色（每個 category 一個專屬童書角色）
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '故事 · 千年京都',
  adventure: '故事 · 南半球荒野',
  honeymoon: '故事 · 印度洋寶藏',
  aurora: '故事 · 綠光獵人',
};

export const CATEGORY_TAG: Record<string, string> = {
  culture: '文化探險',
  adventure: '荒野探險',
  honeymoon: '海島探險',
  aurora: '極光探險',
};

export const CATEGORY_AGE: Record<string, string> = {
  culture: '建議 6 歲以上',
  adventure: '建議 8 歲以上',
  honeymoon: '建議 4 歲以上',
  aurora: '建議 10 歲以上',
};

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
}> = [
  { value: 'culture', label: '文化' },
  { value: 'adventure', label: '探險' },
  { value: 'honeymoon', label: '海島' },
  { value: 'aurora', label: '極光' },
];

// 給每個 category 對應的 SVG icon（用於 listing / detail）
export function CategoryIcon({
  category,
  size = 32,
}: {
  category: string;
  size?: number;
}) {
  switch (category) {
    case 'culture':
      return <Leaf size={size} color={BOOK.orangeDeep} />;
    case 'adventure':
      return <Mountain size={size * 1.4} color={BOOK.sky} />;
    case 'honeymoon':
      return <Whale size={size * 1.4} color={BOOK.sky} />;
    case 'aurora':
      return <Snowflake size={size} color={BOOK.sky} />;
    default:
      return <Star size={size} color={BOOK.orange} />;
  }
}

// ─────────────────────────────────────────────────────
// HairLine — 細裝飾線（虛線、繪本風）
// ─────────────────────────────────────────────────────

export function HairLine({
  color = BOOK.line,
  dashed = false,
  className,
}: {
  color?: string;
  dashed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn('w-full', className)}
      style={{
        height: 2,
        background: dashed
          ? `repeating-linear-gradient(to right, ${color} 0 6px, transparent 6px 12px)`
          : color,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────
// Tooltip-like 小角色（裝飾用、像「導遊」氣球）
// ─────────────────────────────────────────────────────

export function SpeechBubble({
  children,
  color = BOOK.cream,
  textColor = BOOK.ink,
  className,
  tailDir = 'left',
}: {
  children: ReactNode;
  color?: string;
  textColor?: string;
  className?: string;
  tailDir?: 'left' | 'right' | 'bottom';
}) {
  return (
    <div
      className={cn(
        'relative px-5 py-3 rounded-2xl',
        'font-body font-medium text-sm leading-relaxed',
        'shadow-[0_4px_0_0_rgba(43,60,107,0.12)]',
        className,
      )}
      style={{
        background: color,
        color: textColor,
      }}
    >
      {children}
      {tailDir === 'left' && (
        <span
          aria-hidden
          className="absolute -left-2 top-1/2 -translate-y-1/2 block"
          style={{
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: `10px solid ${color}`,
          }}
        />
      )}
      {tailDir === 'right' && (
        <span
          aria-hidden
          className="absolute -right-2 top-1/2 -translate-y-1/2 block"
          style={{
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: `10px solid ${color}`,
          }}
        />
      )}
      {tailDir === 'bottom' && (
        <span
          aria-hidden
          className="absolute -bottom-2 left-8 block"
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: `10px solid ${color}`,
          }}
        />
      )}
    </div>
  );
}
