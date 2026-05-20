'use client';

/**
 * 手繪插畫 — 共用 token、SVG 手繪元素、郵戳印章。
 *
 * 配色（William 拍板、不改）：
 *   #FCF2E2  米杏紙（主背景、像翻舊筆記本的紙感）
 *   #E89B4D  番茄橘（強調、復古旅遊海報橘）
 *   #8A6FB8  薰衣草紫（Wes Anderson 紫、次要 / 對比）
 *   #2F2235  墨葡紫（深紫黑、文字、印刷感）
 *
 * vibe（Wes Anderson 對稱 × 復古旅遊海報 × 紐約客插畫）：
 *   - 對稱：頁面常見正中對稱、左右鏡像
 *   - 手繪：線稿風 SVG、stroke 不填滿、像鋼筆筆觸
 *   - 紙紋：極淡 dot grid 背景、像舊筆記本
 *   - 印章：圓形邊框 + 中央 svg + 環繞文字、像護照郵戳
 *   - 海報字：襯線 + 大字距大寫、像 1960 年代旅遊海報
 *   - 成熟、不可愛、給有品味的年輕旅人
 *
 * 紅線：
 *   1. 不用 • ● ◦ 字符（裝飾字符 ❌、SVG shape / circle ✅）
 *   2. 不用 italic / em / i / cite（globals.css 已 reset）
 *   3. 嚴格 8pt grid（spacing 用 2/4/6/8/12/16/20/24/32）
 *   4. 不用 ul/ol marker、列點用印章 / 數字 / 線條
 *   5. icon 不套圓框（但郵戳是設計、不是 lucide 套圓、區分清楚）
 *   6. 不用 lorem、文案扣回「角落 + 手繪旅行筆記」
 */

import { type ReactNode, type ButtonHTMLAttributes, type SVGProps } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token
// ─────────────────────────────────────────────────────

export const PAPER = {
  // 紙感
  cream: '#FCF2E2',
  creamLight: '#FBF6EA',
  creamWarm: '#F6E6CC',
  creamDeep: '#EFD9B0',

  // 番茄橘
  tomato: '#E89B4D',
  tomatoDeep: '#C97A2E',
  tomatoLight: '#F2BB7E',

  // 薰衣草紫
  lavender: '#8A6FB8',
  lavenderDeep: '#6A5092',
  lavenderLight: '#B59ED9',

  // 墨葡紫
  ink: '#2F2235',
  inkSoft: '#5A4A65',
  inkFaint: '#8C7C97',

  // 輔助
  parchment: '#F8EAD2',
  olive: '#A29A5C',
  sage: '#8FA88A',
  rouge: '#C46B5F',
  line: '#D9C49E',
  lineDeep: '#B89F75',
} as const;

// ─────────────────────────────────────────────────────
// 紙紋背景 — 極淡 dot pattern、像翻舊筆記本
// 用 SVG pattern 鋪滿、不影響閱讀
// ─────────────────────────────────────────────────────

export function PaperGrain({
  className,
  opacity = 0.4,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 w-full h-full', className)}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="paper-dot-grain"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="0.6" fill={PAPER.lineDeep} opacity="0.35" />
          <circle cx="14" cy="10" r="0.4" fill={PAPER.lineDeep} opacity="0.25" />
          <circle cx="6" cy="18" r="0.5" fill={PAPER.lineDeep} opacity="0.3" />
          <circle cx="20" cy="22" r="0.3" fill={PAPER.lineDeep} opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#paper-dot-grain)" />
    </svg>
  );
}

// 微妙 noise 紙紋（更不規則、不用 pattern）
export function PaperNoise({
  className,
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 w-full h-full', className)}
      style={{ opacity }}
    >
      <filter id="hi-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.18  0 0 0 0 0.13  0 0 0 0 0.21  0 0 0 1 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hi-noise)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// 手繪 SVG 元素（線稿風、stroke、不填滿）
// 都用 ViewBox + stroke、像鋼筆畫的
// ─────────────────────────────────────────────────────

type IconBase = Omit<SVGProps<SVGSVGElement>, 'stroke'> & {
  size?: number;
  color?: string;
  stroke?: number;
};

// 飛機（側面、復古螺旋槳）
export function Airplane({
  size = 96,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 96 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      {/* 機身 */}
      <path
        d="M6 24 C 20 22, 30 22, 42 22 L 72 16 L 84 14 C 90 14, 92 18, 90 22 L 88 24 L 90 26 C 92 30, 90 34, 84 34 L 72 32 L 42 26 C 30 26, 20 26, 6 24 Z"
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      {/* 主翼 */}
      <path
        d="M38 22 L 30 8 L 44 8 L 50 22"
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M38 26 L 30 40 L 44 40 L 50 26"
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      {/* 尾翼 */}
      <path
        d="M16 24 L 10 14 L 18 14 L 22 24"
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      {/* 窗戶（4 個小圓） */}
      <circle cx="56" cy="22" r="1.2" fill={color} />
      <circle cx="62" cy="21" r="1.2" fill={color} />
      <circle cx="68" cy="20" r="1.2" fill={color} />
      <circle cx="74" cy="19" r="1.2" fill={color} />
      {/* 螺旋槳（前端十字線） */}
      <line x1="84" y1="10" x2="84" y2="38" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
    </svg>
  );
}

// 行李箱（復古、有皮帶 + 標籤）
export function Suitcase({
  size = 64,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 64 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      {/* 把手 */}
      <path
        d="M22 8 C 22 4, 26 2, 32 2 C 38 2, 42 4, 42 8 L 42 12"
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
      />
      {/* 主體 */}
      <rect
        x="6"
        y="12"
        width="52"
        height="38"
        rx="2"
        stroke={color}
        strokeWidth={stroke}
        fill="none"
      />
      {/* 上下兩條皮帶 */}
      <line x1="6" y1="22" x2="58" y2="22" stroke={color} strokeWidth={stroke * 0.7} />
      <line x1="6" y1="40" x2="58" y2="40" stroke={color} strokeWidth={stroke * 0.7} />
      {/* 中央扣 */}
      <rect x="28" y="20" width="8" height="4" stroke={color} strokeWidth={stroke * 0.8} fill="none" />
      <rect x="28" y="38" width="8" height="4" stroke={color} strokeWidth={stroke * 0.8} fill="none" />
      {/* 行李標籤（左上小四方形） */}
      <rect x="10" y="28" width="10" height="6" stroke={color} strokeWidth={stroke * 0.7} fill="none" />
      <line x1="11" y1="30" x2="18" y2="30" stroke={color} strokeWidth={stroke * 0.5} />
      <line x1="11" y1="32" x2="16" y2="32" stroke={color} strokeWidth={stroke * 0.5} />
    </svg>
  );
}

// 護照（合上的、頂端有星 + 字）
export function Passport({
  size = 56,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 56 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <rect x="6" y="6" width="44" height="60" rx="3" stroke={color} strokeWidth={stroke} fill="none" />
      <line x1="14" y1="14" x2="42" y2="14" stroke={color} strokeWidth={stroke * 0.6} />
      <text
        x="28"
        y="26"
        textAnchor="middle"
        fill={color}
        style={{ font: '500 6px serif', letterSpacing: '1.2px' }}
      >
        PASSPORT
      </text>
      {/* 中央圓徽 + 五角星 */}
      <circle cx="28" cy="44" r="11" stroke={color} strokeWidth={stroke * 0.9} fill="none" />
      <path
        d="M28 36 L 30 42 L 36 42 L 31 46 L 33 52 L 28 48 L 23 52 L 25 46 L 20 42 L 26 42 Z"
        stroke={color}
        strokeWidth={stroke * 0.7}
        fill="none"
        strokeLinejoin="round"
      />
      <text
        x="28"
        y="62"
        textAnchor="middle"
        fill={color}
        style={{ font: '500 4.5px serif', letterSpacing: '1.5px' }}
      >
        CORNER · TRAVELER
      </text>
    </svg>
  );
}

// 火車（側面、復古蒸汽火車）
export function Train({
  size = 96,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 96 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      {/* 蒸汽（3 朵雲） */}
      <circle cx="14" cy="6" r="3" stroke={color} strokeWidth={stroke * 0.7} fill="none" />
      <circle cx="20" cy="3" r="2.5" stroke={color} strokeWidth={stroke * 0.7} fill="none" />
      <circle cx="10" cy="10" r="2" stroke={color} strokeWidth={stroke * 0.7} fill="none" />
      {/* 蒸汽煙囪 */}
      <rect x="12" y="14" width="6" height="6" stroke={color} strokeWidth={stroke} fill="none" />
      {/* 駕駛艙（左側、大方塊） */}
      <path
        d="M6 36 L 6 24 L 24 24 L 24 20 L 36 20 L 36 36 L 84 36 L 84 24 L 90 24 L 90 36"
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      {/* 軌道線 */}
      <line x1="0" y1="44" x2="96" y2="44" stroke={color} strokeWidth={stroke * 0.6} />
      {/* 輪子 */}
      <circle cx="18" cy="40" r="4" stroke={color} strokeWidth={stroke} fill="none" />
      <circle cx="40" cy="40" r="4" stroke={color} strokeWidth={stroke} fill="none" />
      <circle cx="60" cy="40" r="4" stroke={color} strokeWidth={stroke} fill="none" />
      <circle cx="80" cy="40" r="4" stroke={color} strokeWidth={stroke} fill="none" />
      {/* 窗戶 */}
      <rect x="44" y="24" width="8" height="6" stroke={color} strokeWidth={stroke * 0.7} fill="none" />
      <rect x="56" y="24" width="8" height="6" stroke={color} strokeWidth={stroke * 0.7} fill="none" />
      <rect x="68" y="24" width="8" height="6" stroke={color} strokeWidth={stroke * 0.7} fill="none" />
    </svg>
  );
}

// 地球儀（線稿、有經緯線）
export function Globe({
  size = 80,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      {/* 圓球 */}
      <circle cx="40" cy="40" r="28" stroke={color} strokeWidth={stroke} fill="none" />
      {/* 赤道 */}
      <line x1="12" y1="40" x2="68" y2="40" stroke={color} strokeWidth={stroke * 0.7} />
      {/* 經線 1 */}
      <path
        d="M40 12 C 22 24, 22 56, 40 68 C 58 56, 58 24, 40 12"
        stroke={color}
        strokeWidth={stroke * 0.7}
        fill="none"
      />
      {/* 經線 2（細） */}
      <ellipse cx="40" cy="40" rx="12" ry="28" stroke={color} strokeWidth={stroke * 0.5} fill="none" />
      {/* 大陸（簡化剪影） */}
      <path
        d="M22 32 C 28 30, 32 34, 30 38 C 32 44, 28 46, 24 44 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M48 28 C 54 28, 56 32, 54 36 L 50 38 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M44 46 C 52 46, 56 52, 52 56 L 48 54 Z"
        fill={color}
        opacity="0.85"
      />
      {/* 底座 */}
      <line x1="40" y1="68" x2="40" y2="74" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      <line x1="30" y1="74" x2="50" y2="74" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
    </svg>
  );
}

// 樹（單棵、復古插畫風、線稿 + 圓葉）
export function Tree({
  size = 64,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
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
      {/* 樹幹 */}
      <path
        d="M28 60 L 28 40 C 28 36, 30 34, 30 30 M 36 60 L 36 40 C 36 36, 34 34, 34 30"
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
      />
      {/* 葉冠（三層圓） */}
      <circle cx="32" cy="20" r="14" stroke={color} strokeWidth={stroke} fill="none" />
      <circle cx="22" cy="28" r="9" stroke={color} strokeWidth={stroke} fill="none" />
      <circle cx="42" cy="28" r="9" stroke={color} strokeWidth={stroke} fill="none" />
      {/* 內部紋理（極簡點） */}
      <circle cx="28" cy="18" r="1" fill={color} />
      <circle cx="36" cy="22" r="1" fill={color} />
      <circle cx="20" cy="28" r="0.8" fill={color} />
      <circle cx="44" cy="30" r="0.8" fill={color} />
    </svg>
  );
}

// 山（三角、復古旅遊海報山稜）
export function Mountain({
  size = 120,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 120 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      {/* 前山 */}
      <path
        d="M0 80 L 30 30 L 60 80 Z"
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      {/* 後山（左） */}
      <path
        d="M20 80 L 60 14 L 100 80"
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      {/* 後山（右） */}
      <path
        d="M70 80 L 95 40 L 120 80"
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      {/* 雪頂 */}
      <path d="M28 32 L 32 32 L 30 28 Z" fill={color} opacity="0.5" />
      <path d="M58 16 L 62 16 L 60 12 Z" fill={color} opacity="0.5" />
      <path d="M93 42 L 97 42 L 95 38 Z" fill={color} opacity="0.5" />
      {/* 太陽（後方圓） */}
      <circle cx="90" cy="22" r="8" stroke={color} strokeWidth={stroke * 0.7} fill="none" />
      {[0, 45, 90, 135].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 90 + Math.cos(rad) * 10;
        const y1 = 22 + Math.sin(rad) * 10;
        const x2 = 90 + Math.cos(rad) * 14;
        const y2 = 22 + Math.sin(rad) * 14;
        return (
          <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={stroke * 0.6} strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

// 鯨魚（簡單剪影、印度洋符號）
export function Whale({
  size = 96,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 96 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      {/* 身體 */}
      <path
        d="M8 32 C 12 22, 30 16, 48 18 C 64 20, 76 26, 80 34 C 82 30, 88 28, 92 32 C 90 36, 86 38, 80 38 C 76 42, 64 46, 48 46 C 30 44, 12 38, 8 32 Z"
        stroke={color}
        strokeWidth={stroke}
        fill="none"
      />
      {/* 眼睛 */}
      <circle cx="20" cy="30" r="1.5" fill={color} />
      {/* 噴水 */}
      <path
        d="M28 12 C 26 6, 32 4, 32 10"
        stroke={color}
        strokeWidth={stroke * 0.7}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M36 14 C 34 8, 40 6, 40 12"
        stroke={color}
        strokeWidth={stroke * 0.7}
        fill="none"
        strokeLinecap="round"
      />
      {/* 嘴 + 海浪 */}
      <line x1="12" y1="34" x2="16" y2="34" stroke={color} strokeWidth={stroke * 0.6} strokeLinecap="round" />
      {/* 水波（下方）*/}
      <path
        d="M0 50 C 8 46, 16 50, 24 46 C 32 50, 40 46, 48 50 C 56 46, 64 50, 72 46 C 80 50, 88 46, 96 50"
        stroke={color}
        strokeWidth={stroke * 0.5}
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

// 雪花（北歐極光、6 角對稱）
export function Snowflake({
  size = 56,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
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
      {[0, 60, 120].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 28 28)`}>
          <line x1="28" y1="6" x2="28" y2="50" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
          <line x1="28" y1="12" x2="22" y2="18" stroke={color} strokeWidth={stroke * 0.8} strokeLinecap="round" />
          <line x1="28" y1="12" x2="34" y2="18" stroke={color} strokeWidth={stroke * 0.8} strokeLinecap="round" />
          <line x1="28" y1="20" x2="24" y2="24" stroke={color} strokeWidth={stroke * 0.6} strokeLinecap="round" />
          <line x1="28" y1="20" x2="32" y2="24" stroke={color} strokeWidth={stroke * 0.6} strokeLinecap="round" />
        </g>
      ))}
      <circle cx="28" cy="28" r="2" fill={color} />
    </svg>
  );
}

// 鳥眼睛（簡 W 線、空中）
export function FlyingBirds({
  size = 64,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 64 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path d="M4 18 C 8 10, 12 10, 16 16 C 18 12, 22 12, 24 16" stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      <path d="M28 22 C 30 16, 34 16, 36 20 C 38 16, 42 16, 44 20" stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      <path d="M48 14 C 51 8, 55 8, 57 12 C 59 8, 62 8, 63 12" stroke={color} strokeWidth={stroke * 0.8} fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 指南針玫瑰（compass rose、4 個方向 + 圓）
export function Compass({
  size = 80,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <circle cx="40" cy="40" r="32" stroke={color} strokeWidth={stroke} fill="none" />
      <circle cx="40" cy="40" r="26" stroke={color} strokeWidth={stroke * 0.5} fill="none" />
      {/* 4 個主指針（N 大、其他小）*/}
      <path d="M40 10 L 44 40 L 40 36 L 36 40 Z" fill={color} />
      <path d="M40 70 L 36 40 L 40 44 L 44 40 Z" stroke={color} strokeWidth={stroke * 0.8} fill="none" />
      <path d="M10 40 L 40 44 L 36 40 L 40 36 Z" stroke={color} strokeWidth={stroke * 0.8} fill="none" />
      <path d="M70 40 L 40 36 L 44 40 L 40 44 Z" stroke={color} strokeWidth={stroke * 0.8} fill="none" />
      {/* 細指針（4 個對角） */}
      {[45, 135, 225, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 40 + Math.cos(rad) * 22;
        const y = 40 + Math.sin(rad) * 22;
        return (
          <line key={deg} x1="40" y1="40" x2={x} y2={y} stroke={color} strokeWidth={stroke * 0.4} />
        );
      })}
      {/* N 字 */}
      <text x="40" y="9" textAnchor="middle" fill={color} style={{ font: '600 6px serif' }}>
        N
      </text>
      <circle cx="40" cy="40" r="2" fill={color} />
    </svg>
  );
}

// 五角星（線稿、不填滿）
export function StarOutline({
  size = 24,
  color = PAPER.ink,
  stroke = 1.5,
  ...rest
}: IconBase) {
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
        stroke={color}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// 實心五角星（小、印章用）
export function StarFilled({
  size = 18,
  color = PAPER.ink,
  stroke: _stroke,
  ...rest
}: IconBase) {
  void _stroke;
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

// ─────────────────────────────────────────────────────
// PostageStamp — 護照郵戳印章
// 圓形邊框 + 雙圈 + 中央 SVG + 環繞文字
// 像翻護照看到的入境章
// ─────────────────────────────────────────────────────

export function PostageStamp({
  size = 140,
  topText = 'CORNER · TRAVEL',
  bottomText = 'EST · 2026',
  center,
  color = PAPER.ink,
  rotate = 0,
  className,
}: {
  size?: number;
  topText?: string;
  bottomText?: string;
  center?: ReactNode;
  color?: string;
  rotate?: number;
  className?: string;
}) {
  // SVG path id 唯一化
  const pathId = `stamp-top-${topText.replace(/[^a-zA-Z]/g, '')}-${size}`;
  const pathIdBottom = `stamp-bottom-${bottomText.replace(/[^a-zA-Z]/g, '')}-${size}`;

  return (
    <div
      className={cn('relative inline-block', className)}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
      }}
      aria-hidden
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 外圈 */}
        <circle cx="70" cy="70" r="66" stroke={color} strokeWidth="1.5" fill="none" opacity="0.85" />
        {/* 內圈 */}
        <circle cx="70" cy="70" r="58" stroke={color} strokeWidth="1" fill="none" opacity="0.65" />
        {/* 內圈內 */}
        <circle cx="70" cy="70" r="44" stroke={color} strokeWidth="0.8" fill="none" opacity="0.45" />

        {/* 上半圓文字 path */}
        <defs>
          <path
            id={pathId}
            d="M 16,70 A 54,54 0 0,1 124,70"
            fill="none"
          />
          <path
            id={pathIdBottom}
            d="M 18,72 A 52,52 0 0,0 122,72"
            fill="none"
          />
        </defs>

        <text
          fill={color}
          style={{
            font: '600 10px serif',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {topText}
          </textPath>
        </text>

        <text
          fill={color}
          style={{
            font: '500 8px serif',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          <textPath href={`#${pathIdBottom}`} startOffset="50%" textAnchor="middle">
            {bottomText}
          </textPath>
        </text>

        {/* 4 個小星裝飾（東南西北位置） */}
        <g fill={color} opacity="0.7">
          <circle cx="70" cy="22" r="1.5" />
          <circle cx="118" cy="70" r="1.5" />
          <circle cx="70" cy="118" r="1.5" />
          <circle cx="22" cy="70" r="1.5" />
        </g>
      </svg>

      {/* 中央內容（覆蓋層） */}
      <div className="absolute inset-0 flex items-center justify-center">
        {center}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PostmarkLine — 郵戳波浪線（橫向、印在郵票旁的）
// ─────────────────────────────────────────────────────

export function PostmarkLine({
  width = 140,
  height = 24,
  color = PAPER.ink,
  className,
}: {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d={`M 0 ${height / 2} Q ${width / 8} 2, ${width / 4} ${height / 2} T ${width / 2} ${
          height / 2
        } T ${(width * 3) / 4} ${height / 2} T ${width} ${height / 2}`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d={`M 0 ${height / 2 + 4} Q ${width / 8} ${height / 2 - 6}, ${width / 4} ${
          height / 2 + 4
        } T ${width / 2} ${height / 2 + 4} T ${(width * 3) / 4} ${height / 2 + 4} T ${width} ${
          height / 2 + 4
        }`}
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d={`M 0 ${height / 2 - 4} Q ${width / 8} ${height / 2 - 14}, ${width / 4} ${
          height / 2 - 4
        } T ${width / 2} ${height / 2 - 4} T ${(width * 3) / 4} ${height / 2 - 4} T ${width} ${
          height / 2 - 4
        }`}
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// HandwrittenLine — 手寫感的橫線（不直、有微抖）
// 用於分隔、強調某些段落
// ─────────────────────────────────────────────────────

export function HandwrittenLine({
  width = 200,
  color = PAPER.ink,
  thickness = 1.5,
  className,
}: {
  width?: number;
  color?: string;
  thickness?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={8}
      viewBox={`0 0 ${width} 8`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d={`M 2 4 Q ${width * 0.15} 2, ${width * 0.3} 4 T ${width * 0.55} 5 T ${width * 0.8} 3 L ${
          width - 2
        } 4`}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// SectionLabel — 區塊小標籤（復古海報感）
// 左右橫線 + 大字距 + 全大寫
// ─────────────────────────────────────────────────────

export function SectionLabel({
  children,
  className,
  align = 'left',
  color = PAPER.tomatoDeep,
  showMark = true,
}: {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  color?: string;
  showMark?: boolean;
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
        className="block h-px w-10"
        style={{ background: color, opacity: 0.7 }}
      />
      {showMark && (
        <StarFilled size={10} color={color} />
      )}
      <span
        className="font-display text-[11px] tracking-[0.42em] uppercase"
        style={{ color, fontWeight: 500 }}
      >
        {children}
      </span>
      {showMark && (
        <StarFilled size={10} color={color} />
      )}
      <span
        aria-hidden
        className="block h-px w-10"
        style={{ background: color, opacity: 0.7 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PosterTitle — 復古旅遊海報風大標題
// 襯線 + 大字距 + 上下橫線
// ─────────────────────────────────────────────────────

export function PosterTitle({
  children,
  className,
  size = 'md',
  color = PAPER.ink,
}: {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}) {
  const sizeCls =
    size === 'lg'
      ? 'text-[56px] md:text-[112px]'
      : size === 'sm'
        ? 'text-[28px] md:text-[40px]'
        : 'text-[40px] md:text-[72px]';
  return (
    <h1
      className={cn(
        'font-display leading-[1.02] uppercase',
        sizeCls,
        className,
      )}
      style={{
        color,
        fontWeight: 500,
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </h1>
  );
}

// ─────────────────────────────────────────────────────
// MonoCaption — 郵戳上的編號 mono 小字
// 像「Nº 0148 / TOKYO / KX-32」
// ─────────────────────────────────────────────────────

export function MonoCaption({
  children,
  className,
  color = PAPER.inkSoft,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-[10px] tracking-[0.25em] uppercase',
        className,
      )}
      style={{ color }}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// NumberMark — 大寫襯線數字「01」「02」、列點用
// ─────────────────────────────────────────────────────

export function NumberMark({
  n,
  size = 'md',
  color = PAPER.tomatoDeep,
}: {
  n: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}) {
  const cls =
    size === 'lg'
      ? 'text-5xl md:text-6xl'
      : size === 'sm'
        ? 'text-base'
        : 'text-2xl md:text-3xl';
  return (
    <span
      className={cn('font-display leading-none', cls)}
      style={{
        color,
        fontWeight: 500,
        letterSpacing: '0.08em',
      }}
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// PaperButton — 復古海報感按鈕
// 沒圓角、線條邊框、hover「印章蓋下」感
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'inverse';
  size?: 'md' | 'lg';
  children: ReactNode;
  full?: boolean;
};

export function PaperButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  full,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-14 px-10 text-xs' : 'h-12 px-8 text-[11px]';
  const widthCls = full ? 'w-full' : '';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          widthCls,
          'font-display tracking-[0.32em] uppercase transition-all',
          'border-2 active:scale-[0.97]',
          'hover:shadow-[0_0_0_3px_rgba(47,34,53,0.06)]',
          className,
        )}
        style={{
          background: PAPER.ink,
          color: PAPER.cream,
          borderColor: PAPER.ink,
          fontWeight: 500,
        }}
      >
        {children}
      </button>
    );
  }
  if (variant === 'inverse') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          widthCls,
          'font-display tracking-[0.32em] uppercase transition-all',
          'border-2 active:scale-[0.97]',
          'hover:shadow-[0_0_0_3px_rgba(232,155,77,0.25)]',
          className,
        )}
        style={{
          background: PAPER.tomato,
          color: PAPER.ink,
          borderColor: PAPER.ink,
          fontWeight: 500,
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
          'font-display tracking-[0.32em] uppercase transition-all',
          'border-2 active:scale-[0.97]',
          'hover:bg-[#2F2235] hover:text-[#FCF2E2]',
          className,
        )}
        style={{
          background: 'transparent',
          color: PAPER.ink,
          borderColor: PAPER.ink,
          fontWeight: 500,
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
        'font-display text-xs tracking-[0.32em] uppercase',
        'transition-opacity hover:opacity-60',
        className,
      )}
      style={{ color: PAPER.ink, fontWeight: 500 }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Chip — Wes Anderson 對稱 filter chip
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
        'h-11 px-5 inline-flex items-center gap-2.5',
        'font-display text-[11px] tracking-[0.32em] uppercase',
        'transition-all border-2 active:scale-[0.97]',
      )}
      style={{
        background: active ? PAPER.ink : 'transparent',
        color: active ? PAPER.cream : PAPER.ink,
        borderColor: PAPER.ink,
        fontWeight: 500,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// PostcardFrame — 明信片邊框
// 雙線 + 鋸齒邊（用 SVG path）+ 內部白空間
// ─────────────────────────────────────────────────────

export function PostcardFrame({
  children,
  className,
  bg = PAPER.creamLight,
  borderColor = PAPER.ink,
  rotate = 0,
  serrated = true,
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
  borderColor?: string;
  rotate?: number;
  serrated?: boolean;
}) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        background: bg,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        boxShadow: `0 1px 0 0 ${borderColor}, 0 12px 24px -16px rgba(47,34,53,0.25)`,
        border: `1.5px solid ${borderColor}`,
        outline: serrated ? `2px dashed ${borderColor}` : 'none',
        outlineOffset: serrated ? '-8px' : 0,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// CategoryStamp — 每個 category 對應的郵戳設計
// 用於 listing / detail header
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '文化深度',
  adventure: '荒野探險',
  honeymoon: '蜜月私旅',
  aurora: '極光獵人',
};

export const CATEGORY_STAMP: Record<
  string,
  { top: string; bottom: string; code: string }
> = {
  culture: { top: 'KYOTO · JAPAN', bottom: 'CULTURE · LANE', code: 'KX-06' },
  adventure: { top: 'SOUTH ISLAND · NZ', bottom: 'WILD · SOUTH', code: 'NZ-09' },
  honeymoon: { top: 'MALDIVES · IO', bottom: 'CORAL · ROUTE', code: 'MV-07' },
  aurora: { top: 'ARCTIC CIRCLE', bottom: 'AURORA · HUNT', code: 'AR-08' },
};

export const CATEGORY_FLAG: Record<string, string> = {
  culture: '🇯🇵',
  adventure: '🇳🇿',
  honeymoon: '🇲🇻',
  aurora: '🇫🇮 🇸🇪 🇳🇴',
};

// 注意：上面的 emoji 國旗是為了「行李貼紙」感、不違反「不用 bullet 字符」紅線
// （emoji 是國家識別、跟 • ● ◦ 那種裝飾性圓點意義不同）

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
}> = [
  { value: 'culture', label: '文化深度' },
  { value: 'adventure', label: '荒野探險' },
  { value: 'honeymoon', label: '蜜月私旅' },
  { value: 'aurora', label: '極光獵人' },
];

export function CategoryIcon({
  category,
  size = 64,
  color = PAPER.ink,
}: {
  category: string;
  size?: number;
  color?: string;
}) {
  switch (category) {
    case 'culture':
      return <Tree size={size} color={color} />;
    case 'adventure':
      return <Mountain size={size * 1.4} color={color} />;
    case 'honeymoon':
      return <Whale size={size * 1.4} color={color} />;
    case 'aurora':
      return <Snowflake size={size} color={color} />;
    default:
      return <Compass size={size} color={color} />;
  }
}

// ─────────────────────────────────────────────────────
// SymmetricRow — Wes Anderson 對稱裝飾橫排
// 左右各一個 SVG、中間文字 / 數字
// 適合 hero 上下或段落分隔
// ─────────────────────────────────────────────────────

export function SymmetricRow({
  left,
  center,
  right,
  className,
}: {
  left: ReactNode;
  center: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center gap-6 md:gap-10', className)}>
      <div className="shrink-0">{left}</div>
      <div className="flex-1 max-w-md text-center">{center}</div>
      <div className="shrink-0">{right ?? left}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// HairLine — 細裝飾線（雙線、印刷感）
// ─────────────────────────────────────────────────────

export function HairLine({
  color = PAPER.ink,
  variant = 'double',
  className,
}: {
  color?: string;
  variant?: 'single' | 'double' | 'dashed';
  className?: string;
}) {
  if (variant === 'double') {
    return (
      <div className={cn('w-full', className)}>
        <div style={{ height: 1.5, background: color, opacity: 0.85 }} />
        <div style={{ height: 1.5 }} />
        <div style={{ height: 1, background: color, opacity: 0.55 }} />
      </div>
    );
  }
  if (variant === 'dashed') {
    return (
      <div
        className={cn('w-full', className)}
        style={{
          height: 1.5,
          background: `repeating-linear-gradient(to right, ${color} 0 8px, transparent 8px 16px)`,
          opacity: 0.7,
        }}
      />
    );
  }
  return (
    <div
      className={cn('w-full', className)}
      style={{ height: 1, background: color, opacity: 0.75 }}
    />
  );
}

// ─────────────────────────────────────────────────────
// BorderFrame — Wes Anderson 對稱雙線邊框
// 用於 hero block / 大型 section
// ─────────────────────────────────────────────────────

export function BorderFrame({
  children,
  className,
  color = PAPER.ink,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        outline: `1.5px solid ${color}`,
        outlineOffset: '8px',
      }}
    >
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: -16,
          left: -16,
          right: -16,
          bottom: -16,
          border: `0.5px solid ${color}`,
          opacity: 0.4,
        }}
      />
      {children}
    </div>
  );
}
