'use client';

/**
 * 虹夕諾雅 溫泉 — Hoshinoya Onsen
 *
 * 共用 token、原子元件。
 *
 * 設計哲學（日系奢華、不是日系極簡）：
 *   - 溫泉旅館：湯氣繚繞、紙燈籠光暈、深木紋夜色
 *   - 千年京都厚重底色：紙、木、湯、墨、火
 *   - 木與紙的東方優雅：邊框是書道紙、文字像墨字
 *   - 低調貴氣：spacing 寬、色塊深、不靠亮色、靠暖暈
 *   - 跟 muji（極簡冷感）對立：muji 工業 catalog → 我這裡是 ryokan
 *   - 跟 tsutaya（書店人文）對立：tsutaya 米紙書頁 → 我這裡是燈下溫泉夜
 *
 * 配色（William 拍板、勿改）：
 *   #F6EDE0  米紙暖（主背景、淡日光下的和紙色）
 *   #C29A6A  燈芯紅褐（強調、紙燈籠透光色）
 *   #634837  深木褐（次要面、夜光、木質家具色）
 *   #1A0F08  漆黑（文字、墨字感）
 *
 * 排版：
 *   - 直幅圖（4:5 / 3:4）像日本掛軸繪畫、不橫幅
 *   - 紙紋背景 svg pattern 極淡
 *   - 日式裝飾線（和柄 / 麻葉紋）極淡 svg
 *   - spacing 走 8pt grid、寬鬆但層次清楚
 *   - 字體：display 用 Noto Serif TC 模擬日式毛筆感、字距偏大
 *   - 入場 0.6s「拉開紙門」slide + fade
 *   - hover「紙燈籠亮起」subtle 光暈擴散
 *
 * 紅線（globals.css 已 reset、勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格 8pt grid（spacing 用 2/4/6/8/12/16/20/24）
 *   4. 不用 ul/ol marker、列點用方塊 / 漢字 / 線條
 *   5. icon 不套圓框
 *   6. 不寫 lorem、文案有「溫泉旅館掌櫃」口吻
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token（湯氣旅館色階）
// ─────────────────────────────────────────────────────

export const HOSHINO = {
  paper: '#F6EDE0', // 米紙暖（主背景）
  paperSoft: '#FBF5EB', // 略亮的紙（卡片內部、湯氣光暈）
  paperWarm: '#EEE0CB', // 較深一點的紙（淡夜光、區塊底）
  lamp: '#C29A6A', // 燈芯紅褐（強調、紙燈籠光）
  lampDeep: '#A47B4D', // 深燈芯（hover / 細節）
  lampSoft: '#D4B388', // 淡燈光（背景光暈）
  wood: '#634837', // 深木褐（次要面、夜光）
  woodSoft: '#7C5E47', // 較淡的木（次要文字 / 線條）
  woodDeep: '#3D2A1E', // 更深的木（深夜邊框）
  ink: '#1A0F08', // 漆黑（主文字、墨）
  inkSoft: '#3D2A1E', // 較淡的墨（次要文字）
  inkFaint: '#7C5E47', // 弱化文字（metadata、頁碼）
  line: '#C9B196', // 細書道紙邊線
  lineSoft: '#D9C7AC', // 更淺的線
  steam: 'rgba(246, 237, 224, 0.85)', // 湯氣（半透紙色、覆蓋圖片用）
} as const;

// ─────────────────────────────────────────────────────
// 漢字數字（一二三四…）— 用於章節 / 房號 / 客室號
// 跟 tsutaya 共用一套寫法、但語意不同
// 蔦屋用「卷 一」書頁感、這裡用「客室 一號」「第一帖」溫泉旅館感
// ─────────────────────────────────────────────────────

export const KANJI_NUM = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五',
];

export function kanji(n: number) {
  return KANJI_NUM[n - 1] ?? String(n);
}

// ─────────────────────────────────────────────────────
// LanternTag — 區塊上方小標籤（紙燈籠掛旗感）
//
// 跟 tsutaya ArchiveTag 對比：
//   蔦屋是「卷 一 ─ Welcome」線裝書感
//   這裡是「第一帖 ─ 湯氣序」溫泉旅館掛旗感
//   左側多了一個小紙燈籠 SVG
// ─────────────────────────────────────────────────────

export function LanternTag({
  chapter,
  children,
  className,
  align = 'left',
}: {
  chapter: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-5',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <LanternMark size={14} />
      <span
        className="font-display text-xs"
        style={{
          color: HOSHINO.wood,
          letterSpacing: '0.25em',
          fontWeight: 500,
        }}
      >
        第{chapter}帖
      </span>
      <span
        aria-hidden
        className="block h-px w-8"
        style={{ background: HOSHINO.wood }}
      />
      <span
        className="font-body text-xs uppercase"
        style={{
          color: HOSHINO.woodSoft,
          letterSpacing: '0.3em',
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// LanternMark — 小紙燈籠 SVG（hang from top）
// 兩條細線吊一個燈籠形（橢圓）、燈籠中有暖光
// ─────────────────────────────────────────────────────

export function LanternMark({
  size = 16,
  color = HOSHINO.lamp,
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
      height={size * 1.8}
      viewBox="0 0 16 28"
      className={cn('block shrink-0', className)}
      fill="none"
    >
      {/* 吊繩 */}
      <line x1="8" y1="0" x2="8" y2="5" stroke={HOSHINO.woodSoft} strokeWidth="0.6" />
      {/* 燈籠頂蓋 */}
      <rect x="5" y="5" width="6" height="1.2" fill={HOSHINO.woodDeep} />
      {/* 燈籠本體（紙橢圓） */}
      <ellipse cx="8" cy="14" rx="5.5" ry="7" fill={color} opacity="0.9" />
      {/* 橫紋（紙燈籠的竹骨） */}
      <line x1="3" y1="10.5" x2="13" y2="10.5" stroke={HOSHINO.woodDeep} strokeWidth="0.3" opacity="0.55" />
      <line x1="2.5" y1="14" x2="13.5" y2="14" stroke={HOSHINO.woodDeep} strokeWidth="0.3" opacity="0.55" />
      <line x1="3" y1="17.5" x2="13" y2="17.5" stroke={HOSHINO.woodDeep} strokeWidth="0.3" opacity="0.55" />
      {/* 燈籠底蓋 */}
      <rect x="5" y="20.5" width="6" height="1.2" fill={HOSHINO.woodDeep} />
      {/* 流蘇 */}
      <line x1="8" y1="22" x2="8" y2="27" stroke={HOSHINO.lampDeep} strokeWidth="0.6" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// SteamTitle — 標題 wrapper
// 字級偏小但配字距、Noto Serif 模擬日式毛筆感
// 跟 tsutaya BookTitle 對比：書名頁 → 這裡是掛軸書道感、字距更寬
// ─────────────────────────────────────────────────────

export function SteamTitle({
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
      ? 'text-[34px] md:text-[48px]'
      : level === 2
        ? 'text-2xl md:text-[34px]'
        : 'text-xl md:text-2xl';

  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <h2
        className={cn('font-display leading-[1.35]', sizeCls)}
        style={{
          color: HOSHINO.ink,
          fontWeight: 500,
          letterSpacing: '0.06em',
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-6 font-body text-sm md:text-base leading-[2.05]',
          )}
          style={{
            color: HOSHINO.woodSoft,
            letterSpacing: '0.04em',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// KanjiMark — 漢字列點（第一 / 第二 …）
// 跟 tsutaya FolioMark（「藏書 042」書本感）對比、這裡是「客室 一」溫泉感
// ─────────────────────────────────────────────────────

export function KanjiMark({
  n,
  prefix = '客室',
}: {
  n: number;
  prefix?: string;
}) {
  return (
    <span
      className="font-display text-[10px] shrink-0 inline-flex items-baseline gap-2"
      style={{ color: HOSHINO.woodSoft, letterSpacing: '0.15em' }}
    >
      <span
        className="font-body"
        style={{ color: HOSHINO.woodSoft, letterSpacing: '0.2em' }}
      >
        {prefix}
      </span>
      <span style={{ color: HOSHINO.wood, fontWeight: 500 }}>
        {kanji(n)}號
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────
// PageMark — 頁碼感（旅館手冊頁碼）
// ─────────────────────────────────────────────────────

export function PageMark({
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
      className={cn('font-display text-[10px]', className)}
      style={{ color: HOSHINO.inkFaint, letterSpacing: '0.2em' }}
    >
      {kanji(n)}
      {total !== undefined && (
        <>
          <span style={{ color: HOSHINO.line, margin: '0 6px' }}>/</span>
          {kanji(total)}
        </>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// Hair — 細書道紙線（單線）
// ─────────────────────────────────────────────────────

export function Hair({
  color = HOSHINO.line,
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
// LampDivider — 燈籠分隔線（細線中夾一個迷你燈籠 + 細線）
// 用於 home story 段落分隔、像旅館手冊的章節分隔
// ─────────────────────────────────────────────────────

export function LampDivider({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-6 w-full', className)}>
      <span
        aria-hidden
        className="block h-px flex-1"
        style={{ background: HOSHINO.line }}
      />
      <LanternMark size={12} />
      <span
        aria-hidden
        className="block h-px flex-1"
        style={{ background: HOSHINO.line }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// AsanohaPattern — 麻葉紋背景 SVG pattern
// 日本傳統紋樣「麻葉紋」、極淡、用於 section 背景或卡片背景
// 不是滿版花紋、只是極淡幾何紋
// ─────────────────────────────────────────────────────

export function AsanohaPattern({
  opacity = 0.08,
  color = HOSHINO.wood,
}: {
  opacity?: number;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="asanoha"
          x="0"
          y="0"
          width="48"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          {/* 麻葉紋：六角分割成 6 個三角 */}
          <g stroke={color} strokeWidth="0.5" fill="none">
            <polygon points="24,4 44,16 44,40 24,52 4,40 4,16" />
            <line x1="24" y1="4" x2="24" y2="52" />
            <line x1="4" y1="16" x2="44" y2="40" />
            <line x1="44" y1="16" x2="4" y2="40" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#asanoha)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// PaperGrain — 和紙紙紋背景 SVG（很淡的紙纖維點）
// 比 AsanohaPattern 更不規則、像紙的纖維
// ─────────────────────────────────────────────────────

export function PaperGrain({
  opacity = 0.07,
}: {
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.39
                    0 0 0 0 0.28
                    0 0 0 0 0.22
                    0 0 0 0.5 0"
          />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────
// HoshinoButton — 主要 CTA / outline / link
// 旅館感：方角、深木褐 + 米紙底（不是純黑）、無漸層、無陰影、字距大
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'link';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function HoshinoButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-14 px-12 text-sm' : 'h-12 px-10 text-xs';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display transition-all relative group',
          'hover:opacity-95 active:translate-y-px',
          className,
        )}
        style={{
          background: HOSHINO.ink,
          color: HOSHINO.paper,
          letterSpacing: '0.2em',
          fontWeight: 500,
        }}
      >
        {children}
        {/* 紙燈籠光暈：hover 時從中心擴散 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${HOSHINO.lamp}33 0%, transparent 70%)`,
          }}
        />
      </button>
    );
  }
  if (variant === 'outline') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display transition-all relative group',
          'border',
          className,
        )}
        style={{
          background: 'transparent',
          color: HOSHINO.ink,
          borderColor: HOSHINO.ink,
          letterSpacing: '0.2em',
          fontWeight: 500,
        }}
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${HOSHINO.lamp}22 0%, transparent 70%)`,
          }}
        />
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
      style={{ color: HOSHINO.ink, letterSpacing: '0.15em' }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// LanternLink — 紙燈籠 hover 連結
// hover 時「燈籠亮起」：底色淡暈擴散 + underline 從中間展開
// 跟 tsutaya BookmarkLink（書籤橫線滑出）對比：這裡是燈光暈染感
// ─────────────────────────────────────────────────────

export function LanternLink({
  onClick,
  children,
  className,
  color = HOSHINO.ink,
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
        'group relative font-display text-xs inline-flex items-center gap-4 px-2 py-1',
        'transition-all',
        className,
      )}
      style={{ color, letterSpacing: '0.18em', fontWeight: 500 }}
    >
      {/* 紙燈籠光暈：hover 時擴散 */}
      <span
        aria-hidden
        className="absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at center, ${HOSHINO.lamp}22 0%, transparent 80%)`,
        }}
      />
      <span className="relative">
        {children}
      </span>
      <span
        aria-hidden
        className="relative block h-px w-6 transition-all duration-700 group-hover:w-12"
        style={{ background: color }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────
// RoomPill — 客室分類牌（取代 tag pill）
// 像旅館客室掛牌、方角、字距大、有燈芯紅褐配深木褐
// ─────────────────────────────────────────────────────

export function RoomPill({
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
        'h-11 px-7 font-display text-xs transition-all border relative group overflow-hidden',
      )}
      style={{
        background: active ? HOSHINO.ink : HOSHINO.paperSoft,
        color: active ? HOSHINO.paper : HOSHINO.woodSoft,
        borderColor: active ? HOSHINO.ink : HOSHINO.line,
        letterSpacing: '0.18em',
        fontWeight: 500,
      }}
    >
      <span className="relative z-10">{children}</span>
      {!active && (
        <span
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${HOSHINO.lamp}1f 0%, transparent 70%)`,
          }}
        />
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// LedgerRow — 旅館登記簿一行（key / value）
// 用於 inclusions / exclusions / 客室規格
// ─────────────────────────────────────────────────────

export function LedgerRow({
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
        'grid grid-cols-[88px_1fr] gap-6 py-5 items-baseline',
        className,
      )}
      style={{ borderBottom: `1px solid ${HOSHINO.lineSoft}` }}
    >
      <span
        className="font-display text-xs"
        style={{
          color: HOSHINO.woodSoft,
          letterSpacing: '0.2em',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <span
        className="font-body text-sm leading-[1.95]"
        style={{ color: HOSHINO.ink }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PhotoSeal — 圖片下方圖說（旅館手冊插圖感）
// 跟 tsutaya PhotoCaption 對比：書頁圖說「圖 01」
//                             這裡是「壱號圖 ─ 描述」溫泉手冊感
// ─────────────────────────────────────────────────────

export function PhotoSeal({
  n,
  children,
  className,
}: {
  n: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-baseline gap-4 mt-4',
        className,
      )}
    >
      <span
        className="font-display text-[10px] shrink-0"
        style={{
          color: HOSHINO.wood,
          letterSpacing: '0.2em',
          fontWeight: 500,
        }}
      >
        {kanji(n)}號圖
      </span>
      <span
        aria-hidden
        className="block h-px w-5 shrink-0"
        style={{ background: HOSHINO.line }}
      />
      <span
        className="font-body text-[11px] leading-[1.75]"
        style={{ color: HOSHINO.woodSoft }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SteamOverlay — 圖片上的湯氣覆蓋（極淡）
// 直幅圖頂部 / 底部加淡淡的湯氣漸層、讓圖有「霧氣繚繞」感
// ─────────────────────────────────────────────────────

export function SteamOverlay({
  position = 'bottom',
  intensity = 0.4,
}: {
  position?: 'top' | 'bottom' | 'both';
  intensity?: number;
}) {
  const grad =
    position === 'top'
      ? `linear-gradient(to bottom, ${HOSHINO.paper}cc 0%, transparent 35%)`
      : position === 'bottom'
        ? `linear-gradient(to top, ${HOSHINO.paper}cc 0%, transparent 35%)`
        : `linear-gradient(to bottom, ${HOSHINO.paper}99 0%, transparent 25%, transparent 75%, ${HOSHINO.paper}99 100%)`;

  return (
    <span
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ background: grad, opacity: intensity }}
    />
  );
}

// ─────────────────────────────────────────────────────
// SCROLL-AWARE LAMP GLOW
// scroll 時 hero 圖暈光增加（不是動、是暈光）
// 用 inline style + transform/opacity transition
// 但因為要 client-side、移到 home.tsx 內處理
// 這裡只 export 標準暈光樣式
// ─────────────────────────────────────────────────────

export const LAMP_GLOW = {
  hero: `radial-gradient(ellipse at 50% 30%, ${HOSHINO.lamp}22 0%, transparent 60%)`,
  card: `radial-gradient(circle at center, ${HOSHINO.lamp}1f 0%, transparent 70%)`,
} as const;

// ─────────────────────────────────────────────────────
// CATEGORY 對照表（溫泉旅館分類）
// 跟 muji 工業分類（文化 / 荒野 / 蜜月 / 極光）對立
// 跟 tsutaya 書店分類（文學紀行 / 探險手記 …）對立
// 這裡用「客室類別」溫泉旅館語意
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '京町客室',
  adventure: '山林客室',
  honeymoon: '對望客室',
  aurora: '雪見客室',
};

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
}> = [
  { value: 'culture', label: '京町客室' },
  { value: 'adventure', label: '山林客室' },
  { value: 'honeymoon', label: '對望客室' },
  { value: 'aurora', label: '雪見客室' },
];

// ─────────────────────────────────────────────────────
// 共用文案 — 角落旅行社「虹夕諾雅 溫泉」分號子品牌
// 區隔：
//   - muji「日常即是風景」工業節制感
//   - tsutaya「藏書家挑書」書店人文感
//   - 這裡是「掌櫃迎賓」溫泉旅館感、有「湯氣 / 燈火 / 木紋 / 深夜」溫度
// ─────────────────────────────────────────────────────

export const BRAND = {
  marque: 'CORNER',
  marqueZh: '角落旅行社',
  marqueSub: '虹夕諾雅 · 溫泉系列',
  established: '創立於 二〇一八 · 臺北',

  // home statement（短而有湯氣感）
  homeStatement: '把日子，\n泡進千年京都的湯氣裡。',
  homeStatementSub:
    '我們不安排你打卡、也不教你怎麼走京都。\n我們只負責一件事──\n讓你在每一晚泡完湯之後，\n比進旅館前慢一點呼吸。',

  // 掌櫃口吻（取代蔦屋編者語）
  innkeeperNote:
    '本店一年只迎四批客。\n從踏進玄關那刻、\n到清晨告別玄關那刻，\n我們把每一刻都當成最後一晚。',

  // 旅館主張開頭
  housePrinciple: '湯、紙、木、墨、火。',
} as const;
