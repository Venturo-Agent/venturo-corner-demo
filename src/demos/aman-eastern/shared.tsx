'use client';

/**
 * 安縵東方 — Aman Eastern
 *
 * 共用 token、原子元件。
 *
 * 設計哲學（日系奢華、安縵式「沒有」）：
 *   - Aman Tokyo / Aman Kyoto / Setouchi Aonagi 整套品牌哲學
 *   - 極致留白：能空就空、能無就無、能再退一步就再退
 *   - 奢華於無形：不秀錢、不貼金、不喊大聲、不用「luxury」字眼
 *   - 東方禪意 + 現代極簡：石、紙、水、空氣
 *   - 沒有人情味、只有空氣的高貴
 *
 * 跟 hoshinoya-onsen 對比：
 *   - hoshinoya 是「紙燈籠、夜湯、暖紙黃、人情味」
 *   - 我這裡是「石頭、水墨、白與灰、空氣」— 冷而貴、無溫度
 *
 * 跟 muji-stillness 對比：
 *   - muji 是「日常、庶民、工業 catalog、節制」
 *   - 我這裡是「奢華、上流、私人 estate、選擇空」— 同樣節制、層次不同
 *
 * 配色（William 拍板、強制）：
 *   #F7F4EC  米石白（主背景、極淡）
 *   #BFA77E  茶銅金（極弱強調、僅 metadata 細線）
 *   #3D352A  深石褐（次要面、深木 / 石）
 *   #0B0908  漆夜黑（文字）
 *
 * 排版鐵律：
 *   - 標題 extralight（200-300）、字級可大但極瘦
 *   - 雙語並排：英文小副標 + 中文大標
 *   - 水平極細線分區、不用面塊
 *   - py-32 / py-48 寬鬆到極致
 *   - 不要任何裝飾紋理 / 圖案
 *   - 圖片只放正中、不大不小
 *   - tracking 中等、不要大字距（不喊大聲）
 *
 * 紅線（globals.css 已 reset、勿違反）：
 *   1. 不用 • ● ◦ 字符
 *   2. 不用 italic / em / i / cite
 *   3. 嚴格 8pt grid（spacing 偏好 2/4/8/12/16/24/32/48）
 *   4. 不用 ul/ol marker、列點用極小編號 / 細線 / 留白
 *   5. icon 不套圓框
 *   6. 不寫 lorem、文案有「安縵管家」口吻、極短、英中並列
 */

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────
// 色彩 token（aman 石階）
// ─────────────────────────────────────────────────────

export const AMAN = {
  stone: '#F7F4EC', // 米石白（主背景）
  stoneSoft: '#FBF9F3', // 略亮的米石（卡片內 / 圖片背景）
  stoneDeep: '#EEE9DC', // 略深的米石（次要區塊底）
  brass: '#BFA77E', // 茶銅金（極弱強調）
  brassDeep: '#A48C66', // 深銅（hover 細節）
  brassSoft: '#D4C2A0', // 淡銅（更弱的線）
  earth: '#3D352A', // 深石褐（次要面 / 深木紋）
  earthSoft: '#5A4F40', // 較淡石褐（次要文字）
  ink: '#0B0908', // 漆夜黑（主文字）
  inkSoft: '#2B2823', // 較淡的黑（次要文字）
  inkMid: '#4A4439', // 中間色文字
  inkFaint: '#857B6A', // 弱化文字（metadata）
  line: '#D9CFB8', // 細線（極淡銅米線）
  lineSoft: '#E8DFCA', // 更淡的線
} as const;

// ─────────────────────────────────────────────────────
// QuietLabel — 區塊上方極小英文標籤
// 跟 hoshinoya「第一帖」、tsutaya「卷 一」、muji「001」對比
// aman 走「— I —」極簡羅馬數字、不喊大聲
// ─────────────────────────────────────────────────────

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export function roman(n: number) {
  return ROMAN[n - 1] ?? String(n);
}

export function QuietLabel({
  index,
  children,
  className,
  align = 'left',
}: {
  index?: number | string;
  children?: ReactNode;
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
      {index !== undefined && (
        <>
          <span
            className="font-display text-[10px]"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.4em',
              fontWeight: 300,
            }}
          >
            {typeof index === 'number' ? roman(index) : index}
          </span>
          <span
            aria-hidden
            className="block h-px w-10"
            style={{ background: AMAN.brassSoft }}
          />
        </>
      )}
      {children && (
        <span
          className="font-display text-[10px] uppercase"
          style={{
            color: AMAN.earthSoft,
            letterSpacing: '0.45em',
            fontWeight: 300,
          }}
        >
          {children}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// AmanWordmark — 「Aman Eastern」logo lockup
// 字母間距大、像 brand mark、極瘦
// 不用 SVG、純 typography
// ─────────────────────────────────────────────────────

export function AmanWordmark({
  size = 'md',
  color = AMAN.ink,
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}) {
  const sizeCls =
    size === 'lg'
      ? 'text-base md:text-lg'
      : size === 'md'
        ? 'text-xs md:text-sm'
        : 'text-[10px] md:text-xs';
  return (
    <span
      className={cn('font-display inline-block', sizeCls, className)}
      style={{
        color,
        letterSpacing: '0.5em',
        fontWeight: 300,
      }}
    >
      AMAN EASTERN
    </span>
  );
}

// ─────────────────────────────────────────────────────
// BilingualTitle — 雙語並排標題
// 英文小副標 + 中文大標、是 aman 的關鍵語言
// 字體極瘦（weight 200-300）、字級可大、tracking 中等
// ─────────────────────────────────────────────────────

export function BilingualTitle({
  en,
  zh,
  level = 2,
  align = 'left',
  className,
}: {
  en?: ReactNode;
  zh: ReactNode;
  level?: 1 | 2 | 3;
  align?: 'left' | 'center';
  className?: string;
}) {
  const sizeCls =
    level === 1
      ? 'text-[48px] md:text-[88px] leading-[1.05]'
      : level === 2
        ? 'text-[34px] md:text-[60px] leading-[1.15]'
        : 'text-2xl md:text-[32px] leading-[1.25]';

  const weight = level === 1 ? 200 : 250;

  return (
    <div
      className={cn(align === 'center' && 'text-center', className)}
    >
      {en && (
        <p
          className="font-display text-[11px] md:text-xs mb-8 md:mb-10"
          style={{
            color: AMAN.brassDeep,
            letterSpacing: '0.45em',
            fontWeight: 300,
          }}
        >
          {en}
        </p>
      )}
      <h2
        className={cn('font-display', sizeCls)}
        style={{
          color: AMAN.ink,
          fontWeight: weight,
          letterSpacing: '0.04em',
        }}
      >
        {zh}
      </h2>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Hair — 細水平線（aman 主要的分區方式、不用面塊）
// ─────────────────────────────────────────────────────

export function Hair({
  color = AMAN.line,
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
// CenterDivider — 中央極短水平線、用於段落間
// 比 Hair 更短、更不顯眼、像「呼吸」
// ─────────────────────────────────────────────────────

export function CenterDivider({
  width = 32,
  className,
}: {
  width?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('flex items-center justify-center', className)}
    >
      <span
        aria-hidden
        className="block h-px"
        style={{ width, background: AMAN.brassSoft }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// AmanButton — 主要 CTA / outline / link
// 方角、極細邊、極淡 hover、無漸層、無陰影
// 字距中等、字級小、不喊大聲
// ─────────────────────────────────────────────────────

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'link';
  size?: 'md' | 'lg';
  children: ReactNode;
};

export function AmanButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: BtnProps) {
  const sizeCls =
    size === 'lg' ? 'h-14 px-14 text-xs' : 'h-12 px-10 text-[11px]';

  if (variant === 'primary') {
    return (
      <button
        {...rest}
        className={cn(
          sizeCls,
          'font-display transition-all duration-500',
          'hover:opacity-85 active:translate-y-px',
          className,
        )}
        style={{
          background: AMAN.ink,
          color: AMAN.stone,
          letterSpacing: '0.4em',
          fontWeight: 300,
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
          'font-display transition-all duration-500 border',
          className,
        )}
        style={{
          background: 'transparent',
          color: AMAN.ink,
          borderColor: AMAN.ink,
          letterSpacing: '0.4em',
          fontWeight: 300,
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
        'group relative font-display text-[11px] inline-flex items-center gap-5 py-1 transition-colors',
        className,
      )}
      style={{
        color: AMAN.ink,
        letterSpacing: '0.35em',
        fontWeight: 300,
      }}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="block h-px w-8 transition-all duration-500 group-hover:w-14"
        style={{ background: AMAN.ink }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────
// QuietLink — 極簡 underline-on-hover 文字連結
// hover 時 underline fade in（300ms 慢）、不 scale、不抖動
// ─────────────────────────────────────────────────────

export function QuietLink({
  onClick,
  children,
  className,
  color = AMAN.ink,
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
        'group relative font-display text-[11px] inline-flex items-baseline gap-4 py-1',
        'transition-colors duration-500',
        className,
      )}
      style={{
        color,
        letterSpacing: '0.35em',
        fontWeight: 300,
      }}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-1 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: color }}
        />
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────
// QuietTab — 分類切換（極簡文字、無邊框、active 加細底線）
// 跟 muji/hoshinoya 的 pill 對比、aman 不要 pill、只用文字
// ─────────────────────────────────────────────────────

export function QuietTab({
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
      className="group relative font-display text-[11px] px-2 py-3 transition-colors duration-500"
      style={{
        color: active ? AMAN.ink : AMAN.inkFaint,
        letterSpacing: '0.4em',
        fontWeight: 300,
      }}
    >
      {children}
      <span
        aria-hidden
        className="absolute left-2 right-2 -bottom-px h-px transition-opacity duration-500"
        style={{
          background: AMAN.ink,
          opacity: active ? 1 : 0,
        }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────
// LedgerRow — key / value 一行（細線在底）
// 用於 inclusions / exclusions / 規格、極簡 table 風
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
        'grid grid-cols-[96px_1fr] gap-8 py-6 items-baseline',
        className,
      )}
      style={{ borderBottom: `1px solid ${AMAN.lineSoft}` }}
    >
      <span
        className="font-display text-[10px]"
        style={{
          color: AMAN.brassDeep,
          letterSpacing: '0.35em',
          fontWeight: 300,
        }}
      >
        {label}
      </span>
      <span
        className="font-body text-sm leading-[2]"
        style={{ color: AMAN.inkSoft, fontWeight: 300 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// PhotoCaption — 圖片下方極小圖說
// 跟 hoshinoya「壱號圖」、muji「001」對比、aman 用「Plate I」極簡
// ─────────────────────────────────────────────────────

export function PhotoCaption({
  index,
  children,
  className,
}: {
  index?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-baseline gap-5 mt-6',
        className,
      )}
    >
      {index !== undefined && (
        <>
          <span
            className="font-display text-[10px] shrink-0"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.4em',
              fontWeight: 300,
            }}
          >
            Plate {roman(index)}
          </span>
          <span
            aria-hidden
            className="block h-px w-6 shrink-0"
            style={{ background: AMAN.brassSoft }}
          />
        </>
      )}
      <span
        className="font-body text-[11px] leading-[1.85]"
        style={{ color: AMAN.inkFaint, fontWeight: 300 }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SmallIndex — 列點用、極小編號（「I」「II」⋯）
// 跟 mediterranean「01」、hoshinoya「客室一」對比、aman 用羅馬
// ─────────────────────────────────────────────────────

export function SmallIndex({ n }: { n: number }) {
  return (
    <span
      className="font-display text-[10px] shrink-0"
      style={{
        color: AMAN.brassDeep,
        letterSpacing: '0.4em',
        fontWeight: 300,
        minWidth: 28,
      }}
    >
      {roman(n)}
    </span>
  );
}

// ─────────────────────────────────────────────────────
// CATEGORY 對照表（aman 不用「客室」「商品」、用最簡單的二字）
// ─────────────────────────────────────────────────────

export const CATEGORY_LABEL: Record<string, string> = {
  culture: '靜境',
  adventure: '荒野',
  honeymoon: '對望',
  aurora: '北光',
};

export const CATEGORY_LABEL_EN: Record<string, string> = {
  culture: 'Stillness',
  adventure: 'Wilderness',
  honeymoon: 'Solitude',
  aurora: 'Northern',
};

export const CATEGORIES: Array<{
  value: 'culture' | 'adventure' | 'honeymoon' | 'aurora';
  label: string;
  labelEn: string;
}> = [
  { value: 'culture', label: '靜境', labelEn: 'Stillness' },
  { value: 'adventure', label: '荒野', labelEn: 'Wilderness' },
  { value: 'honeymoon', label: '對望', labelEn: 'Solitude' },
  { value: 'aurora', label: '北光', labelEn: 'Northern' },
];

// ─────────────────────────────────────────────────────
// 共用文案 — 角落旅行社「安縵東方」分號子品牌
//
// 區隔：
//   - mediterranean「在角落、慢慢看世界」歐美鬆弛
//   - muji「在角落、過日常」工業節制
//   - tsutaya「在角落、翻一本書」書店人文
//   - hoshinoya「把日子、泡進京都湯氣」溫泉旅館
//   - 這裡是「在角落、留白」安縵極致、不喊、不勸、不溫情
// ─────────────────────────────────────────────────────

export const BRAND = {
  marque: 'CORNER',
  marqueZh: '角落旅行社',
  marqueSub: 'Aman Eastern Collection',
  established: 'Est. 二〇一八 · Taipei',

  // home statement（極短、雙語）
  homeStatementEn: 'In the corner,\nin the quiet.',
  homeStatementZh: '在角落，\n留白。',
  homeStatementSubEn:
    'We do not promise grand vistas.\nWe offer the spaces in between.',
  homeStatementSubZh:
    '我們不販賣風景。\n我們只負責，景與景之間的那段空白。',

  // 安縵管家口吻（取代溫泉掌櫃、書店編者）
  conciergeNote:
    '一年四季，僅迎四批客。\n從踏入玄關至離開玄關，\n我們不打擾，不解說，不催促。\n你只需呼吸。',

  // 品牌四字主張
  housePrinciple: 'Solitude · Stillness · Mastery · Restraint',
  housePrincipleZh: '獨處 · 靜止 · 工藝 · 節制',
} as const;

// ─────────────────────────────────────────────────────
// VALUES — 品牌價值四條（英中並列）
// 跟前面 demo 一樣 4 條、但語言更短、更冷
// ─────────────────────────────────────────────────────

export const VALUES = [
  {
    n: 1,
    en: 'Solitude',
    zh: '獨處',
    body: '每團上限十二人。我們不安排團體互動，不安排破冰，不安排合照。每個人都有自己的空白。',
  },
  {
    n: 2,
    en: 'Stillness',
    zh: '靜止',
    body: '行程一天最多兩段。其餘時間屬於你。在窗邊喝一杯茶，可以是一整個下午。',
  },
  {
    n: 3,
    en: 'Mastery',
    zh: '工藝',
    body: '住宿與餐廳由我們親踏挑選。一間旅館入選的標準，是它能在不說話的時候仍讓你感到貴。',
  },
  {
    n: 4,
    en: 'Restraint',
    zh: '節制',
    body: '我們不發紀念品，不送下午茶券，不安排驚喜。安縵的奢華，不在多，而在少。',
  },
] as const;
