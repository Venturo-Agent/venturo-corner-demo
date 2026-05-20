'use client';

/**
 * 馬爾地夫白沙 — 共用 token、原子元件。
 *
 * vibe：海天無邊、白沙細軟、奶藍色海、慵懶日光、什麼都不做的尊貴感。
 * 跟 mediterranean-sun（厚重、文化、橄欖樹）完全不同氣質。
 *
 * 配色（William 拍板、不改）：
 *   #F0F8FA  雲海白（主背景、像海面反光）
 *   #A8D5DD  奶藍（次要面、區塊背景、像潟湖）
 *   #3E8C9A  海洋藍（強調 / button、像深水道）
 *   #0E3D49  深海墨（文字、像夜潛的水）
 *
 * 紅線（globals.css 已 reset、這裡再次強調、寫的時候勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite（用 light + 寬字距假裝浮動感）
 *   3. 嚴格對齊 + 8pt grid（spacing 用 2/4/6/8/12/16/20/24）
 *   4. 不用 ul/ol marker、列點用方塊 / 數字 / 細線
 *   5. icon 不套圓框（不要 rounded-full p-2 bg-blue-100）
 *
 * 設計語彙：
 *   - 海平面：大量細水平線當 separator
 *   - 浮動：標題 / hero 文字微微 up-down loop animation
 *   - 開闊：spacing 比 mediterranean-sun 更寬、py-32 / 40 常見
 *   - 留白：絕對不擠、永遠給天空一個位置
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token
// ─────────────────────────────────────────────────────

export const SEA = {
  // 主四色
  foam: '#F0F8FA',
  lagoon: '#A8D5DD',
  ocean: '#3E8C9A',
  deep: '#0E3D49',

  // 衍生
  foamLight: '#F8FCFD',
  foamDeep: '#E0EEF1',
  lagoonLight: '#C7E2E8',
  lagoonDeep: '#88BFC8',
  oceanLight: '#5BA5B2',
  oceanDeep: '#2E707C',
  deepSoft: '#2A5C68',

  // ink scale
  ink: '#0E3D49',
  inkSoft: '#3F5C66',
  inkFaint: '#7B95A0',
  inkGhost: '#A8B8C0',

  // 線
  line: '#CFE2E7',
  lineLight: '#E2EDF0',
} as const;

// ─────────────────────────────────────────────────────
// 動畫常數（共用緩動）
// ─────────────────────────────────────────────────────

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_FLOAT = [0.45, 0, 0.55, 1] as const;

// 浮動 loop animation — 用在 hero statement / 標題
export const FLOAT_LOOP = {
  y: [0, -6, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: EASE_FLOAT,
  },
};

// ─────────────────────────────────────────────────────
// SeaLine — 海平面細線、可作 separator
// ─────────────────────────────────────────────────────

export function SeaLine({
  color = SEA.line,
  className,
  width = '100%',
}: {
  color?: string;
  className?: string;
  width?: string | number;
}) {
  return (
    <div
      className={cn('h-px', className)}
      style={{ background: color, width }}
    />
  );
}

// ─────────────────────────────────────────────────────
// SectionLabel — 區塊上方小標籤
// 兩側細水平線、中間英文小字、整體像「海平面遠處的字」
// ─────────────────────────────────────────────────────

export function SectionLabel({
  children,
  className,
  align = 'left',
  tone = 'ocean',
}: {
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  tone?: 'ocean' | 'foam';
}) {
  const lineColor = tone === 'foam' ? 'rgba(240,248,250,0.5)' : SEA.ocean;
  const textColor = tone === 'foam' ? 'rgba(240,248,250,0.85)' : SEA.ocean;

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
        style={{ background: lineColor }}
      />
      <span
        className="font-display text-[10px] tracking-[0.55em] uppercase"
        style={{ color: textColor, fontWeight: 300 }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="block h-px w-12"
        style={{ background: lineColor }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FloatHeading — 標題、附帶微浮動 loop animation
// 用在 hero / section title
// ─────────────────────────────────────────────────────

export function FloatHeading({
  children,
  className,
  style,
  float = true,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  float?: boolean;
}) {
  if (!float) {
    return (
      <h2 className={className} style={style}>
        {children}
      </h2>
    );
  }
  return (
    <motion.h2
      animate={FLOAT_LOOP}
      className={className}
      style={style}
    >
      {children}
    </motion.h2>
  );
}

// ─────────────────────────────────────────────────────
// SquareMark — 小方塊 marker、列點用
// 比 mediterranean 的金色方塊更淺、像海中浮標
// ─────────────────────────────────────────────────────

export function SquareMark({
  size = 6,
  color = SEA.ocean,
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
// NumberMark — 列點用襯線數字「01」「02」
// ─────────────────────────────────────────────────────

export function NumberMark({
  n,
  size = 'md',
  tone = 'ocean',
}: {
  n: number;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'ocean' | 'deep' | 'faint';
}) {
  const cls = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl md:text-4xl',
  }[size];
  const color = {
    ocean: SEA.ocean,
    deep: SEA.deep,
    faint: SEA.inkFaint,
  }[tone];
  return (
    <span
      className={cn('font-display tracking-[0.2em] shrink-0', cls)}
      style={{ color, fontWeight: 300 }}
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// SeaButton — 主 CTA / 次要 / ghost link
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'light';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function SeaButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  style,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-14 px-12 text-xs' : 'h-12 px-9 text-[11px]';

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
          background: SEA.ocean,
          color: SEA.foamLight,
          fontWeight: 300,
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
          'border hover:bg-white/50',
          className,
        )}
        style={{
          borderColor: SEA.ocean,
          color: SEA.ocean,
          fontWeight: 300,
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
          background: SEA.foamLight,
          color: SEA.deep,
          fontWeight: 300,
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
        'font-display text-xs tracking-[0.4em] uppercase',
        'transition-opacity hover:opacity-60',
        className,
      )}
      style={{ color: SEA.deep, fontWeight: 300, ...style }}
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
        'h-10 px-7',
        'font-display text-[10px] tracking-[0.4em] uppercase',
        'transition-all border',
      )}
      style={{
        background: active ? SEA.ocean : 'transparent',
        color: active ? SEA.foamLight : SEA.inkSoft,
        borderColor: active ? SEA.ocean : SEA.line,
        fontWeight: 300,
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Ripple — 水滴擴散 hover effect（純視覺、靠 motion）
// 用在卡片 hover 時、從中心點向外擴散一圈淺藍
// ─────────────────────────────────────────────────────

export function Ripple({ active }: { active: boolean }) {
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0, opacity: 0 }}
      animate={active ? { scale: 4, opacity: [0.35, 0] } : { scale: 0, opacity: 0 }}
      transition={{ duration: 1.4, ease: EASE_OUT }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
      style={{
        width: 80,
        height: 80,
        background: SEA.lagoon,
      }}
    />
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

// CATEGORIES — 排序：蜜月優先（這是海島 demo 的主推）
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
// IslandFooter — 共用 footer（home / listing / detail / itinerary / signup 都用）
// ─────────────────────────────────────────────────────

export function IslandFooter() {
  return (
    <footer
      className="px-6 md:px-12 pt-24 pb-16"
      style={{ background: SEA.deep, color: SEA.foamLight }}
    >
      <div className="mx-auto max-w-7xl">
        {/* 一條長橫線、像海平面 */}
        <SeaLine color="rgba(240,248,250,0.15)" className="mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <p
              className="font-display text-[10px] tracking-[0.55em] uppercase mb-6"
              style={{ color: SEA.lagoon, fontWeight: 300 }}
            >
              Corner Travel · Est. 2018
            </p>
            <p
              className="font-display text-3xl md:text-4xl leading-[1.3]"
              style={{ color: SEA.foamLight, fontWeight: 300 }}
            >
              在角落 看海
              <br />
              聽世界的另一邊
            </p>
            <p
              className="mt-8 text-sm leading-[2.2] max-w-md"
              style={{ color: 'rgba(240,248,250,0.65)' }}
            >
              漫途旅遊旗下品牌
              <br />
              交觀甲 7654 號 · 品保中 1234
            </p>
          </div>

          <div className="md:col-span-3">
            <p
              className="font-display text-[10px] tracking-[0.55em] uppercase mb-6"
              style={{ color: SEA.lagoon, fontWeight: 300 }}
            >
              Contact
            </p>
            <p
              className="text-sm leading-[2.2]"
              style={{ color: 'rgba(240,248,250,0.85)' }}
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
              className="font-display text-[10px] tracking-[0.55em] uppercase mb-6"
              style={{ color: SEA.lagoon, fontWeight: 300 }}
            >
              Office Hours
            </p>
            <p
              className="text-sm leading-[2.2]"
              style={{ color: 'rgba(240,248,250,0.85)' }}
            >
              週一至週五 10:00 — 19:00
              <br />
              週六 11:00 — 17:00
              <br />
              週日休
            </p>
          </div>
        </div>

        <SeaLine color="rgba(240,248,250,0.15)" />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="font-mono text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(240,248,250,0.5)' }}
          >
            © 2026 Corner Travel · A Venturo Brand
          </p>
          <p
            className="font-mono text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(240,248,250,0.5)' }}
          >
            Designed in Taipei · Curated for the Sea
          </p>
        </div>
      </div>
    </footer>
  );
}
