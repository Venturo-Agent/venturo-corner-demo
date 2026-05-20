'use client';

/**
 * Signup — 報名「我們的故事冒險」
 *
 * 結構：
 *   - Header（「寫上我們的名字」）
 *   - 左側表單：聯絡資料 / 出發日 / 大人小孩人數 / 孩子年齡 / 備註
 *   - 右側 sticky 旅程摘要（封面圖 + 出發日 + 人數 + 估價）
 *   - 提交後 success（「冒險開始」感、合照背景）
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  BOOK,
  ChapterLabel,
  StoryButton,
  StorybookCard,
  StickerBadge,
  HairLine,
  Star,
  Sun,
  Cloud,
  Tree,
  Bird,
  PaperPlane,
  CategoryIcon,
  CATEGORY_LABEL,
  CATEGORY_TAG,
  FloatingDecor,
  SpeechBubble,
} from './shared';
import { StorybookFooter } from './home';

type Props = {
  tour: Tour;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onBack: () => void;
};

export default function SignupView({
  tour,
  selectedDate,
  onSelectDate,
  onBack,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(1);
  const [kidsAges, setKidsAges] = useState('6 歲');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const date = selectedDate ?? tour.departureDates[0];
  // 兒童 75 折估算
  const subtotal = tour.priceFrom * adults + Math.round(tour.priceFrom * 0.75) * kids;
  const total = adults + kids;
  const peopleOk = total >= tour.groupSize.min && total <= tour.groupSize.max;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (submitted) {
    return (
      <SuccessView
        tour={tour}
        date={date}
        adults={adults}
        kids={kids}
        name={name}
        onBack={onBack}
      />
    );
  }

  return (
    <div style={{ background: BOOK.paper, color: BOOK.ink }}>
      {/* ─────────────── Header ─────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 pt-20 md:pt-28 pb-12"
        style={{
          background: `linear-gradient(180deg, ${BOOK.paperLight} 0%, ${BOOK.paper} 100%)`,
        }}
      >
        <FloatingDecor className="absolute top-12 right-[6%]" delay={0}>
          <Cloud size={120} color={BOOK.cream} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-24 left-[5%]" delay={1.4}>
          <Sun size={80} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-10 right-[18%]" delay={0.6}>
          <Bird size={36} color={BOOK.ink} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-6xl">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-body font-semibold text-sm tracking-wider mb-10 transition-all hover:gap-3"
            style={{ color: BOOK.orangeDeep }}
          >
            <span aria-hidden>←</span>
            回故事介紹
          </button>

          <ChapterLabel>Once Upon A Time...</ChapterLabel>
          <h1
            className="mt-8 font-display font-semibold leading-[1.05] text-[48px] md:text-[88px]"
            style={{ color: BOOK.ink }}
          >
            寫上
            <br />
            <span style={{ color: BOOK.orangeDeep }}>我們的名字</span>
          </h1>
          <p
            className="mt-8 max-w-2xl font-body text-base md:text-lg leading-[1.95]"
            style={{ color: BOOK.inkSoft }}
          >
            填好下面這頁、24 小時內我們會專人聯絡確認名額。
            這是這本故事書的第一頁、寫上你們全家的名字、開始這場冒險。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-12 pb-24 md:pb-32 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          {/* ─────────────── Form ─────────────── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-10"
          >
            {/* Contact */}
            <FormSection
              n={1}
              title="第一頁・聯絡資料"
              subtitle="我們需要知道怎麼找到你們"
            >
              <Field
                label="家長姓名"
                required
                value={name}
                onChange={setName}
                placeholder="王小明"
              />
              <Field
                label="Email"
                required
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="your.family@example.com"
              />
              <Field
                label="行動電話"
                required
                value={phone}
                onChange={setPhone}
                placeholder="0912-345-678"
              />
            </FormSection>

            {/* Date */}
            <FormSection
              n={2}
              title="第二頁・選個出發日"
              subtitle="避開學校重要活動 / 工作關鍵期"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {tour.departureDates.map((d) => {
                  const active = d === date;
                  return (
                    <motion.button
                      key={d}
                      type="button"
                      onClick={() => onSelectDate(d)}
                      whileHover={{ y: -2, rotate: active ? 0 : -1.5 }}
                      className="p-4 text-left rounded-2xl transition-all"
                      style={{
                        background: active ? BOOK.ink : BOOK.cream,
                        color: active ? BOOK.cream : BOOK.ink,
                        boxShadow: active
                          ? `0 5px 0 0 ${BOOK.skyDeep}`
                          : `0 5px 0 0 ${BOOK.line}`,
                      }}
                    >
                      <p
                        className="font-body text-[10px] tracking-[0.25em] uppercase mb-1"
                        style={{
                          color: active ? BOOK.orangeLight : BOOK.inkFaint,
                        }}
                      >
                        {d.slice(0, 4)}
                      </p>
                      <p
                        className="font-display font-semibold text-base leading-tight"
                        style={{ color: active ? BOOK.cream : BOOK.ink }}
                      >
                        {formatDate(d)}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </FormSection>

            {/* People */}
            <FormSection
              n={3}
              title="第三頁・家庭成員"
              subtitle={`團體限 ${tour.groupSize.min}–${tour.groupSize.max} 人、含大人與小孩`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <StepperField
                  label="大人"
                  sub="18 歲以上"
                  value={adults}
                  min={1}
                  max={tour.groupSize.max}
                  onChange={setAdults}
                  icon={<Sun size={28} color={BOOK.orange} />}
                />
                <StepperField
                  label="孩子"
                  sub="17 歲以下、約 75 折"
                  value={kids}
                  min={0}
                  max={6}
                  onChange={setKids}
                  icon={<Star size={28} color={BOOK.sky} />}
                />
              </div>

              {!peopleOk && (
                <div
                  className="mt-5 px-5 py-4 rounded-2xl text-sm"
                  style={{
                    background: BOOK.paperWarm,
                    color: BOOK.ink,
                    border: `2px dashed ${BOOK.orangeDeep}`,
                  }}
                >
                  目前合計 {total} 人、此團限 {tour.groupSize.min}–
                  {tour.groupSize.max} 人。可調整大人或孩子數量。
                </div>
              )}

              {kids > 0 && (
                <div className="mt-5">
                  <Field
                    label="孩子年齡（可寫多個、用逗號分隔）"
                    value={kidsAges}
                    onChange={setKidsAges}
                    placeholder="例：6 歲, 9 歲"
                  />
                </div>
              )}
            </FormSection>

            {/* Notes */}
            <FormSection
              n={4}
              title="第四頁・特別需求"
              subtitle="飲食限制、身體狀況、想慶生、想求婚 — 都可以寫"
            >
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="孩子對堅果過敏 / 想在京都幫小寶慶生 / 想加房連住 ..."
                className="w-full px-5 py-4 font-body text-base resize-none outline-none transition-colors rounded-2xl"
                style={{
                  background: BOOK.cream,
                  border: `2px dashed ${BOOK.line}`,
                  color: BOOK.ink,
                }}
              />
            </FormSection>

            {/* Submit */}
            <div className="pt-4">
              <StoryButton
                size="lg"
                type="submit"
                disabled={!peopleOk}
                className="w-full sm:w-auto"
              >
                寫上我們的名字 →
              </StoryButton>
              <p
                className="mt-6 font-body text-xs leading-[1.95]"
                style={{ color: BOOK.inkFaint }}
              >
                送出後 24 小時內、專人會以電話或 email 聯絡確認名額。
                <br />
                正式定位需於 3 個工作日內完成 30% 訂金支付。
              </p>
            </div>
          </form>

          {/* ─────────────── Summary ─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-8">
              <ChapterLabel>Your Booking</ChapterLabel>

              <StorybookCard className="mt-6">
                {/* Hero */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <StickerBadge color={BOOK.cream} rotate={-3}>
                      <Star size={12} color={BOOK.orange} />
                      {CATEGORY_TAG[tour.category]}
                    </StickerBadge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <CategoryIcon category={tour.category} size={48} />
                  </div>
                </div>

                <div className="p-8">
                  <p
                    className="font-body font-semibold text-xs tracking-[0.28em] uppercase mb-3"
                    style={{ color: BOOK.orangeDeep }}
                  >
                    {CATEGORY_LABEL[tour.category]}
                  </p>
                  <h3
                    className="font-display font-semibold leading-[1.15] text-2xl md:text-[28px] mb-4"
                    style={{ color: BOOK.ink }}
                  >
                    {tour.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-[1.85] mb-6"
                    style={{ color: BOOK.inkSoft }}
                  >
                    {tour.subtitle}
                  </p>

                  <HairLine dashed />

                  {/* Summary rows */}
                  <div className="py-6 space-y-4">
                    <SummaryRow
                      label="出發日"
                      value={formatDate(date)}
                      icon={<Sun size={22} color={BOOK.orange} />}
                    />
                    <SummaryRow
                      label="行程"
                      value={tour.duration}
                      icon={<PaperPlane size={22} color={BOOK.skyDeep} />}
                    />
                    <SummaryRow
                      label="大人"
                      value={`${adults} 位`}
                      icon={<Tree size={28} />}
                    />
                    {kids > 0 && (
                      <SummaryRow
                        label="孩子"
                        value={`${kids} 位 · ${kidsAges}`}
                        icon={<Star size={22} color={BOOK.sky} />}
                      />
                    )}
                  </div>

                  <HairLine dashed />

                  {/* Price */}
                  <div className="pt-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-body text-sm"
                        style={{ color: BOOK.inkSoft }}
                      >
                        大人 {adults} × {formatPrice(tour.priceFrom)}
                      </span>
                      <span
                        className="font-body font-semibold text-sm"
                        style={{ color: BOOK.ink }}
                      >
                        {formatPrice(tour.priceFrom * adults)}
                      </span>
                    </div>
                    {kids > 0 && (
                      <div className="flex items-baseline justify-between">
                        <span
                          className="font-body text-sm"
                          style={{ color: BOOK.inkSoft }}
                        >
                          孩子 {kids} × {formatPrice(Math.round(tour.priceFrom * 0.75))}
                        </span>
                        <span
                          className="font-body font-semibold text-sm"
                          style={{ color: BOOK.ink }}
                        >
                          {formatPrice(Math.round(tour.priceFrom * 0.75) * kids)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className="mt-6 pt-6 flex items-baseline justify-between"
                    style={{ borderTop: `3px solid ${BOOK.ink}` }}
                  >
                    <div>
                      <p
                        className="font-body text-[10px] tracking-[0.25em] uppercase mb-1"
                        style={{ color: BOOK.inkFaint }}
                      >
                        全家估算
                      </p>
                      <p
                        className="font-display font-semibold text-base"
                        style={{ color: BOOK.ink }}
                      >
                        Subtotal
                      </p>
                    </div>
                    <p
                      className="font-display font-semibold text-3xl"
                      style={{ color: BOOK.orangeDeep }}
                    >
                      {formatPrice(subtotal)}
                    </p>
                  </div>

                  <div
                    className="mt-6 p-4 rounded-2xl"
                    style={{
                      background: BOOK.paperLight,
                      border: `1.5px dashed ${BOOK.line}`,
                    }}
                  >
                    <p
                      className="font-body text-xs leading-[1.85]"
                      style={{ color: BOOK.inkSoft }}
                    >
                      上述為預估金額、孩子年齡可能影響最終價格。
                      具體報價以專人確認為準。
                    </p>
                  </div>
                </div>
              </StorybookCard>
            </div>
          </aside>
        </div>
      </div>

      <StorybookFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Form section — 像「第 X 頁」的小章節
// ─────────────────────────────────────────────────────

function FormSection({
  n,
  title,
  subtitle,
  children,
}: {
  n: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-6">
        <div className="flex items-baseline gap-4">
          <span
            className="font-display font-semibold text-3xl shrink-0"
            style={{ color: BOOK.sky }}
          >
            {String(n).padStart(2, '0')}
          </span>
          <div>
            <h3
              className="font-display font-semibold text-lg md:text-xl leading-snug"
              style={{ color: BOOK.ink }}
            >
              {title}
            </h3>
            <p
              className="mt-1 font-body text-sm"
              style={{ color: BOOK.inkSoft }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </legend>
      <div className="space-y-5">{children}</div>
    </fieldset>
  );
}

// ─────────────────────────────────────────────────────
// Field
// ─────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  required,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        className="font-body font-semibold text-sm tracking-wider block mb-3"
        style={{ color: BOOK.ink }}
      >
        {label}
        {required && (
          <span
            className="ml-2 font-body text-[10px] tracking-[0.25em] uppercase"
            style={{ color: BOOK.orangeDeep }}
          >
            必填
          </span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 h-14 font-body text-base outline-none transition-all rounded-2xl"
        style={{
          background: BOOK.cream,
          border: `2px dashed ${BOOK.line}`,
          color: BOOK.ink,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Stepper field — 大人 / 孩子人數
// ─────────────────────────────────────────────────────

function StepperField({
  label,
  sub,
  value,
  min,
  max,
  onChange,
  icon,
}: {
  label: string;
  sub: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="p-5 md:p-6 rounded-3xl"
      style={{
        background: BOOK.cream,
        boxShadow: `0 5px 0 0 ${BOOK.line}`,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h4
          className="font-display font-semibold text-lg"
          style={{ color: BOOK.ink }}
        >
          {label}
        </h4>
      </div>
      <p
        className="font-body text-xs mb-5"
        style={{ color: BOOK.inkSoft }}
      >
        {sub}
      </p>
      <div className="flex items-center justify-between">
        <StepperBtn
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          ariaLabel={`減少${label}`}
          variant="minus"
        />
        <span
          className="font-display font-semibold text-4xl tabular-nums"
          style={{ color: BOOK.ink }}
        >
          {value}
        </span>
        <StepperBtn
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          ariaLabel={`增加${label}`}
          variant="plus"
        />
      </div>
    </div>
  );
}

function StepperBtn({
  onClick,
  disabled,
  ariaLabel,
  variant,
}: {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  variant: 'plus' | 'minus';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-30 hover:-translate-y-0.5"
      style={{
        background: BOOK.orange,
        color: BOOK.ink,
        boxShadow: `0 4px 0 0 ${BOOK.orangeDeep}`,
      }}
    >
      {variant === 'plus' ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <line x1="9" y1="3" x2="9" y2="15" stroke={BOOK.ink} strokeWidth="3" strokeLinecap="round" />
          <line x1="3" y1="9" x2="15" y2="9" stroke={BOOK.ink} strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <line x1="3" y1="9" x2="15" y2="9" stroke={BOOK.ink} strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Summary row
// ─────────────────────────────────────────────────────

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0">{icon}</span>
      <span
        className="font-body font-semibold text-xs tracking-[0.25em] uppercase shrink-0"
        style={{ color: BOOK.inkSoft }}
      >
        {label}
      </span>
      <span
        className="font-body font-semibold text-sm ml-auto text-right"
        style={{ color: BOOK.ink }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Success — 「冒險開始！」歡呼頁
// ─────────────────────────────────────────────────────

function SuccessView({
  tour,
  date,
  adults,
  kids,
  name,
  onBack,
}: {
  tour: Tour;
  date: string;
  adults: number;
  kids: number;
  name: string;
  onBack: () => void;
}) {
  return (
    <div style={{ background: BOOK.paper, color: BOOK.ink }}>
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-20 md:py-24 overflow-hidden">
        {/* 灑滿小裝飾、慶祝感 */}
        <FloatingDecor className="absolute top-16 left-[10%]" delay={0}>
          <Star size={32} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-32 right-[15%]" delay={0.3}>
          <Star size={24} color={BOOK.sky} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-56 left-[20%]" delay={0.6}>
          <Star size={20} color={BOOK.blossom} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-32 right-[8%]" delay={0.9}>
          <Star size={28} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-56 left-[12%]" delay={1.2}>
          <Star size={18} color={BOOK.leaf} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-12 right-[6%]" delay={1.5}>
          <Sun size={88} color={BOOK.orange} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-12 right-[20%]" delay={0.4}>
          <PaperPlane size={56} color={BOOK.skyDeep} />
        </FloatingDecor>
        <FloatingDecor className="absolute bottom-20 left-[8%]" delay={2}>
          <Cloud size={100} color={BOOK.cream} />
        </FloatingDecor>
        <FloatingDecor className="absolute top-32 left-[6%]" delay={2.5}>
          <Cloud size={80} color={BOOK.cream} />
        </FloatingDecor>

        <div className="relative mx-auto max-w-3xl w-full text-center">
          {/* 大圖章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{
              duration: 0.75,
              ease: [0.34, 1.5, 0.64, 1],
            }}
            className="mx-auto inline-block"
          >
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
              style={{
                background: BOOK.orange,
                boxShadow: `0 10px 0 0 ${BOOK.orangeDeep}`,
              }}
            >
              <Star size={80} color={BOOK.ink} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12"
          >
            <ChapterLabel align="center">Once Upon A Family</ChapterLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
            className="mt-10 font-display font-semibold leading-[1.1] text-[44px] md:text-[72px]"
            style={{ color: BOOK.ink }}
          >
            冒險
            <br />
            <span style={{ color: BOOK.orangeDeep }}>開始！</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 mx-auto max-w-xl font-body text-base md:text-lg leading-[2]"
            style={{ color: BOOK.inkSoft }}
          >
            {name && <>{name}的家、</>}謝謝你選擇角落旅行社。
            <br />
            我們已收到你們的報名、24 小時內專人會聯絡確認名額。
            <br />
            這本書、就要開始寫了。
          </motion.p>

          {/* Booking card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.7, ease: [0.34, 1.2, 0.64, 1] }}
            className="mt-16 max-w-md mx-auto"
          >
            <StorybookCard className="p-8" rotate={-1.5}>
              <p
                className="font-body font-semibold text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: BOOK.orangeDeep }}
              >
                Your Storybook
              </p>
              <h3
                className="font-display font-semibold text-2xl leading-tight mb-4"
                style={{ color: BOOK.ink }}
              >
                {tour.title}
              </h3>

              <HairLine dashed />

              <div className="mt-6 space-y-3 text-left">
                <SuccessRow
                  icon={<Sun size={22} color={BOOK.orange} />}
                  label="出發"
                  value={formatDate(date)}
                />
                <SuccessRow
                  icon={<Tree size={28} />}
                  label="大人"
                  value={`${adults} 位`}
                />
                {kids > 0 && (
                  <SuccessRow
                    icon={<Star size={22} color={BOOK.sky} />}
                    label="孩子"
                    value={`${kids} 位`}
                  />
                )}
                <SuccessRow
                  icon={<PaperPlane size={22} color={BOOK.skyDeep} />}
                  label="天數"
                  value={tour.duration}
                />
              </div>
            </StorybookCard>
          </motion.div>

          {/* What's next */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 max-w-md mx-auto text-left"
          >
            <SpeechBubble color={BOOK.sky} textColor={BOOK.cream}>
              <strong>接下來會發生的事：</strong>
              <br />
              1. 24 小時內、專人致電 / Email
              <br />
              2. 確認名額與付款細節
              <br />
              3. 出發前一週、小小冒險家行李包寄到家
            </SpeechBubble>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-16"
          >
            <StoryButton variant="outline" onClick={onBack}>
              回到封面
            </StoryButton>
          </motion.div>
        </div>
      </section>

      <StorybookFooter />
    </div>
  );
}

function SuccessRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0">{icon}</span>
      <span
        className="font-body font-semibold text-xs tracking-[0.25em] uppercase shrink-0"
        style={{ color: BOOK.inkSoft }}
      >
        {label}
      </span>
      <span
        className="font-body font-semibold text-sm ml-auto"
        style={{ color: BOOK.ink }}
      >
        {value}
      </span>
    </div>
  );
}
