'use client';

/**
 * Signup — 填寫護照 / 旅行登記表
 *
 * 結構（Wes Anderson 對稱）：
 *   - Header — 對稱大標、像填寫一份正式表格
 *   - 左：表單分區 — 像護照填寫頁
 *   - 右：sticky 旅程摘要
 *   - Success — 大郵戳「APPROVED」蓋下、護照入境章感
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  PAPER,
  PaperGrain,
  PaperNoise,
  SectionLabel,
  PosterTitle,
  PaperButton,
  PostageStamp,
  PostmarkLine,
  HandwrittenLine,
  HairLine,
  PostcardFrame,
  MonoCaption,
  NumberMark,
  Airplane,
  Suitcase,
  Passport,
  Compass,
  Globe,
  FlyingBirds,
  StarFilled,
  CATEGORY_LABEL,
  CATEGORY_STAMP,
  CATEGORY_FLAG,
  CategoryIcon,
} from './shared';
import { IllustratedFooter } from './home';

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
  const [travelers, setTravelers] = useState(2);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const date = selectedDate ?? tour.departureDates[0];
  const subtotal = tour.priceFrom * travelers;
  const peopleOk =
    travelers >= tour.groupSize.min && travelers <= tour.groupSize.max;

  const stamp = CATEGORY_STAMP[tour.category];
  const flag = CATEGORY_FLAG[tour.category];

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
        travelers={travelers}
        name={name}
        onBack={onBack}
      />
    );
  }

  return (
    <div style={{ background: PAPER.cream, color: PAPER.ink }}>
      {/* ─────────────── Top bar ─────────────── */}
      <header
        className="relative px-6 md:px-12 py-5"
        style={{
          background: PAPER.cream,
          borderBottom: `1.5px solid ${PAPER.ink}`,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase transition-all hover:gap-3"
            style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
          >
            <span aria-hidden>←</span>
            回筆記首頁
          </button>
          <MonoCaption>
            Travel · Registration · Form · {stamp.code}
          </MonoCaption>
        </div>
      </header>

      {/* ─────────────── Header ─────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-12 pt-20 md:pt-24 pb-16 text-center"
        style={{ background: PAPER.cream }}
      >
        <PaperGrain opacity={0.4} />

        <div className="relative mx-auto max-w-6xl">
          {/* 對稱裝飾 */}
          <div className="flex items-center justify-center gap-10 md:gap-16 mb-12">
            <div style={{ transform: 'rotate(-3deg)' }}>
              <Passport size={64} color={PAPER.ink} stroke={1.3} />
            </div>
            <FlyingBirds size={56} color={PAPER.ink} />
            <div style={{ transform: 'rotate(3deg)' }}>
              <Suitcase size={72} color={PAPER.ink} stroke={1.3} />
            </div>
          </div>

          <SectionLabel align="center" color={PAPER.tomatoDeep}>
            Travel · Registration · Form
          </SectionLabel>

          <div className="my-10">
            <HairLine variant="double" color={PAPER.ink} />
            <div className="py-10">
              <PosterTitle size="md" className="text-center">
                寫上名字
              </PosterTitle>
            </div>
            <div className="flex items-center justify-center gap-6">
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
              <MonoCaption color={PAPER.tomatoDeep}>
                Form · A · {stamp.code} · 2026
              </MonoCaption>
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
            </div>
            <HairLine variant="double" color={PAPER.ink} className="mt-8" />
          </div>

          <p
            className="mx-auto max-w-2xl font-display text-base md:text-lg leading-[1.95]"
            style={{ color: PAPER.inkSoft }}
          >
            填好下面這份表格、24 小時內專人會聯絡確認名額。
            <br />
            等同於把你的名字寫在這本旅行筆記的第一頁。
          </p>
        </div>
      </section>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 pb-24 md:pb-32 pt-12">
        <PaperGrain opacity={0.25} />
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          {/* ─────────────── Form ─────────────── */}
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-12">
            {/* Section 1 */}
            <FormSection
              n={1}
              title="申 · 請 · 人 · 資 · 料"
              subtitle="Applicant · Identity"
            >
              <Field
                label="姓名"
                hint="Full · Name"
                required
                value={name}
                onChange={setName}
                placeholder="王小明"
              />
              <Field
                label="Email"
                hint="Email · Address"
                required
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="your.name@example.com"
              />
              <Field
                label="行動電話"
                hint="Mobile · No"
                required
                value={phone}
                onChange={setPhone}
                placeholder="0912-345-678"
              />
            </FormSection>

            <HairLine variant="double" color={PAPER.ink} />

            {/* Section 2 */}
            <FormSection
              n={2}
              title="出 · 發 · 日 · 期"
              subtitle="Departure · Date"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {tour.departureDates.map((d) => {
                  const active = d === date;
                  return (
                    <motion.button
                      key={d}
                      type="button"
                      onClick={() => onSelectDate(d)}
                      whileHover={{ scale: 0.97 }}
                      whileTap={{ scale: 0.94 }}
                      className="p-4 text-center transition-all"
                      style={{
                        background: active ? PAPER.ink : PAPER.creamLight,
                        color: active ? PAPER.cream : PAPER.ink,
                        border: `2px solid ${PAPER.ink}`,
                        outline: active ? `1.5px solid ${PAPER.ink}` : 'none',
                        outlineOffset: active ? '4px' : 0,
                      }}
                    >
                      <MonoCaption color={active ? PAPER.tomatoLight : PAPER.tomatoDeep}>
                        {d.slice(0, 4)}
                      </MonoCaption>
                      <p
                        className="mt-2 font-display text-sm md:text-base leading-tight"
                        style={{
                          color: active ? PAPER.cream : PAPER.ink,
                          fontWeight: 500,
                        }}
                      >
                        {formatDate(d)}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </FormSection>

            <HairLine variant="double" color={PAPER.ink} />

            {/* Section 3 */}
            <FormSection
              n={3}
              title="同 · 行 · 人 · 數"
              subtitle="Number · Of · Travelers"
            >
              <div
                className="relative p-6 md:p-8"
                style={{
                  background: PAPER.creamLight,
                  border: `1.5px solid ${PAPER.ink}`,
                }}
              >
                <PaperGrain opacity={0.2} />
                <div className="relative">
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <MonoCaption color={PAPER.tomatoDeep}>
                        Group · Size · Limit
                      </MonoCaption>
                      <p
                        className="mt-2 font-display text-base"
                        style={{ color: PAPER.ink, fontWeight: 500 }}
                      >
                        {tour.groupSize.min} — {tour.groupSize.max} 人
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StepperBtn
                        onClick={() =>
                          setTravelers(Math.max(1, travelers - 1))
                        }
                        disabled={travelers <= 1}
                        variant="minus"
                        ariaLabel="減少同行人數"
                      />
                      <span
                        className="font-display text-5xl md:text-6xl tabular-nums leading-none"
                        style={{
                          color: PAPER.ink,
                          fontWeight: 500,
                          letterSpacing: '0.02em',
                          minWidth: 60,
                          textAlign: 'center',
                        }}
                      >
                        {String(travelers).padStart(2, '0')}
                      </span>
                      <StepperBtn
                        onClick={() =>
                          setTravelers(Math.min(tour.groupSize.max, travelers + 1))
                        }
                        disabled={travelers >= tour.groupSize.max}
                        variant="plus"
                        ariaLabel="增加同行人數"
                      />
                    </div>
                  </div>

                  {!peopleOk && (
                    <div
                      className="mt-5 p-4"
                      style={{
                        background: PAPER.creamWarm,
                        border: `1.5px dashed ${PAPER.tomatoDeep}`,
                      }}
                    >
                      <MonoCaption color={PAPER.tomatoDeep}>
                        Group · Limit · Notice
                      </MonoCaption>
                      <p
                        className="mt-2 font-display text-sm leading-[1.85]"
                        style={{ color: PAPER.ink }}
                      >
                        此團限 {tour.groupSize.min} — {tour.groupSize.max} 人、
                        目前 {travelers} 人不符合範圍。
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </FormSection>

            <HairLine variant="double" color={PAPER.ink} />

            {/* Section 4 */}
            <FormSection
              n={4}
              title="特 · 別 · 註 · 記"
              subtitle="Special · Remarks"
            >
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="飲食限制、慶生計畫、想加房、想連住、其他想跟編輯說的 ..."
                className="w-full px-5 py-4 font-display text-base resize-none outline-none transition-colors"
                style={{
                  background: PAPER.creamLight,
                  border: `2px solid ${PAPER.ink}`,
                  color: PAPER.ink,
                }}
              />
            </FormSection>

            {/* Submit */}
            <div
              className="pt-8"
              style={{ borderTop: `1.5px solid ${PAPER.ink}` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div>
                  <MonoCaption color={PAPER.tomatoDeep}>Sign · Here</MonoCaption>
                  <p
                    className="mt-3 font-display text-sm leading-[1.85]"
                    style={{ color: PAPER.inkSoft }}
                  >
                    送出表格後 24 小時內、編輯室專人會以電話或 email 聯絡你。
                    <br />
                    正式登記需於 3 個工作日內完成 30% 訂金支付。
                  </p>
                </div>
                <PaperButton
                  size="lg"
                  type="submit"
                  disabled={!peopleOk}
                  className="shrink-0"
                >
                  寄出 →
                </PaperButton>
              </div>
            </div>
          </form>

          {/* ─────────────── Summary ─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-8">
              <SectionLabel color={PAPER.tomatoDeep}>
                Your · Reservation
              </SectionLabel>
              <div className="mt-6">
                <PostcardFrame bg={PAPER.creamLight}>
                  {/* Hero */}
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={tour.heroImage}
                      alt={tour.title}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover grayscale-[10%]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(232,155,77,0.05) 0%, rgba(47,34,53,0.2) 100%)',
                      }}
                    />
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5"
                      style={{
                        background: PAPER.creamLight,
                        border: `1.5px solid ${PAPER.ink}`,
                      }}
                    >
                      <span style={{ letterSpacing: '0.1em' }}>{flag}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <PostageStamp
                        size={80}
                        topText={stamp.top}
                        bottomText={stamp.bottom}
                        rotate={6}
                        color={PAPER.cream}
                        center={<CategoryIcon category={tour.category} size={24} color={PAPER.cream} />}
                      />
                    </div>
                    <div
                      className="absolute bottom-4 left-4 px-3 py-1.5"
                      style={{
                        background: PAPER.ink,
                        color: PAPER.cream,
                      }}
                    >
                      <MonoCaption color={PAPER.cream}>{stamp.code}</MonoCaption>
                    </div>
                  </div>

                  <div className="px-8 py-8 relative">
                    <PaperGrain opacity={0.2} />
                    <div className="relative">
                      <MonoCaption color={PAPER.tomatoDeep}>
                        {CATEGORY_LABEL[tour.category]}
                      </MonoCaption>
                      <h3
                        className="mt-3 font-display uppercase leading-[1.15] text-2xl"
                        style={{
                          color: PAPER.ink,
                          fontWeight: 500,
                          letterSpacing: '0.01em',
                        }}
                      >
                        {tour.title}
                      </h3>
                      <p
                        className="mt-3 font-display text-sm leading-[1.85]"
                        style={{ color: PAPER.inkSoft }}
                      >
                        {tour.subtitle}
                      </p>

                      <div className="mt-6">
                        <PostmarkLine width={200} height={18} color={PAPER.ink} />
                      </div>

                      <div className="mt-6 space-y-4">
                        <SummaryRow
                          icon={<Airplane size={28} color={PAPER.ink} stroke={1.3} />}
                          label="Depart"
                          value={formatDate(date)}
                        />
                        <SummaryRow
                          icon={<Passport size={24} color={PAPER.ink} stroke={1.3} />}
                          label="Travelers"
                          value={`${travelers} 位`}
                        />
                        <SummaryRow
                          icon={<Globe size={28} color={PAPER.ink} stroke={1.3} />}
                          label="Duration"
                          value={tour.duration}
                        />
                      </div>

                      <HairLine variant="dashed" color={PAPER.ink} className="mt-6" />

                      {/* Price */}
                      <div className="mt-6 space-y-2">
                        <div className="flex items-baseline justify-between">
                          <MonoCaption>
                            {travelers} × {formatPrice(tour.priceFrom)}
                          </MonoCaption>
                          <span
                            className="font-display text-sm"
                            style={{ color: PAPER.ink, fontWeight: 500 }}
                          >
                            {formatPrice(tour.priceFrom * travelers)}
                          </span>
                        </div>
                      </div>

                      <div
                        className="mt-6 pt-6 flex items-baseline justify-between"
                        style={{ borderTop: `2px solid ${PAPER.ink}` }}
                      >
                        <div>
                          <MonoCaption color={PAPER.tomatoDeep}>
                            Subtotal · 估算
                          </MonoCaption>
                          <p
                            className="mt-1 font-display text-sm"
                            style={{ color: PAPER.inkSoft, fontWeight: 500 }}
                          >
                            Excl · Optional · Add-ons
                          </p>
                        </div>
                        <p
                          className="font-display text-2xl md:text-3xl"
                          style={{
                            color: PAPER.tomatoDeep,
                            fontWeight: 500,
                            letterSpacing: '0.01em',
                          }}
                        >
                          {formatPrice(subtotal)}
                        </p>
                      </div>

                      <div
                        className="mt-6 p-4"
                        style={{
                          background: PAPER.parchment,
                          border: `1.5px dashed ${PAPER.line}`,
                        }}
                      >
                        <MonoCaption color={PAPER.lavenderDeep}>
                          Disclaimer
                        </MonoCaption>
                        <p
                          className="mt-2 font-display text-xs leading-[1.85]"
                          style={{ color: PAPER.inkSoft }}
                        >
                          上述為預估金額。最終報價以編輯室專人確認為準、
                          可能含選配活動 / 機票艙等差價。
                        </p>
                      </div>
                    </div>
                  </div>
                </PostcardFrame>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <IllustratedFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FormSection — 像護照填寫頁的章節
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
      <legend className="mb-8 w-full">
        <div className="flex items-start gap-6">
          <NumberMark n={n} size="lg" color={PAPER.tomatoDeep} />
          <div className="flex-1 pt-2">
            <h3
              className="font-display uppercase text-lg md:text-xl leading-snug"
              style={{
                color: PAPER.ink,
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {title}
            </h3>
            <div className="mt-2">
              <MonoCaption color={PAPER.lavenderDeep}>{subtitle}</MonoCaption>
            </div>
          </div>
        </div>
      </legend>
      <div className="space-y-5">{children}</div>
    </fieldset>
  );
}

// ─────────────────────────────────────────────────────
// Field — 表單輸入
// ─────────────────────────────────────────────────────

function Field({
  label,
  hint,
  value,
  onChange,
  required,
  type = 'text',
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block mb-3">
        <div className="flex items-baseline justify-between">
          <span
            className="font-display text-sm tracking-wide"
            style={{ color: PAPER.ink, fontWeight: 500 }}
          >
            {label}
            {required && (
              <span
                className="ml-2 font-display text-[10px] tracking-[0.25em] uppercase"
                style={{ color: PAPER.tomatoDeep }}
              >
                必填
              </span>
            )}
          </span>
          {hint && (
            <MonoCaption color={PAPER.inkFaint}>{hint}</MonoCaption>
          )}
        </div>
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 h-14 font-display text-base outline-none transition-all"
        style={{
          background: PAPER.creamLight,
          border: `2px solid ${PAPER.ink}`,
          color: PAPER.ink,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// StepperBtn — 加減人數
// ─────────────────────────────────────────────────────

function StepperBtn({
  onClick,
  disabled,
  variant,
  ariaLabel,
}: {
  onClick: () => void;
  disabled?: boolean;
  variant: 'plus' | 'minus';
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="w-12 h-12 flex items-center justify-center transition-all disabled:opacity-30 active:scale-95"
      style={{
        background: PAPER.tomato,
        color: PAPER.ink,
        border: `1.5px solid ${PAPER.ink}`,
      }}
    >
      {variant === 'plus' ? (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <line x1="9" y1="3" x2="9" y2="15" stroke={PAPER.ink} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="3" y1="9" x2="15" y2="9" stroke={PAPER.ink} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <line x1="3" y1="9" x2="15" y2="9" stroke={PAPER.ink} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// SummaryRow — 摘要列
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
    <div className="flex items-center gap-4">
      <span className="shrink-0">{icon}</span>
      <MonoCaption color={PAPER.tomatoDeep}>{label}</MonoCaption>
      <span
        className="font-display text-sm ml-auto"
        style={{ color: PAPER.ink, fontWeight: 500 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SuccessView — 「APPROVED」大郵戳蓋下
// ─────────────────────────────────────────────────────

function SuccessView({
  tour,
  date,
  travelers,
  name,
  onBack,
}: {
  tour: Tour;
  date: string;
  travelers: number;
  name: string;
  onBack: () => void;
}) {
  const stamp = CATEGORY_STAMP[tour.category];

  return (
    <div style={{ background: PAPER.cream, color: PAPER.ink }}>
      {/* Top bar */}
      <header
        className="relative px-6 md:px-12 py-5"
        style={{
          background: PAPER.cream,
          borderBottom: `1.5px solid ${PAPER.ink}`,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass size={24} color={PAPER.ink} />
            <span
              className="font-display text-sm tracking-[0.4em] uppercase"
              style={{ color: PAPER.ink, fontWeight: 600 }}
            >
              Corner
            </span>
          </div>
          <MonoCaption color={PAPER.tomatoDeep}>
            Form · A · {stamp.code} · APPROVED
          </MonoCaption>
        </div>
      </header>

      <section
        className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-20 md:py-28 overflow-hidden"
        style={{ background: PAPER.cream }}
      >
        <PaperGrain opacity={0.4} />
        <PaperNoise opacity={0.05} />

        <div className="relative mx-auto max-w-4xl w-full text-center">
          {/* 大郵戳「APPROVED」、像護照入境章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -28 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{
              duration: 0.95,
              ease: [0.22, 1.4, 0.36, 1],
            }}
            className="mx-auto inline-block"
          >
            <PostageStamp
              size={220}
              topText="ENTRY · APPROVED"
              bottomText="CORNER · TRAVEL · 2026"
              color={PAPER.tomatoDeep}
              center={
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="font-display uppercase text-2xl md:text-3xl tracking-[0.18em]"
                    style={{
                      color: PAPER.tomatoDeep,
                      fontWeight: 500,
                    }}
                  >
                    APPROVED
                  </span>
                  <div className="flex gap-2 items-center">
                    <StarFilled size={10} color={PAPER.tomatoDeep} />
                    <span
                      className="font-display text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: PAPER.tomatoDeep, fontWeight: 500 }}
                    >
                      {stamp.code}
                    </span>
                    <StarFilled size={10} color={PAPER.tomatoDeep} />
                  </div>
                </div>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14"
          >
            <SectionLabel align="center" color={PAPER.lavenderDeep}>
              Welcome · Aboard
            </SectionLabel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="my-10"
          >
            <HairLine variant="double" color={PAPER.ink} />
            <div className="py-10">
              <PosterTitle size="md" className="text-center">
                寫好了
              </PosterTitle>
            </div>
            <div className="flex items-center justify-center gap-6">
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
              <MonoCaption color={PAPER.tomatoDeep}>
                Application · Received
              </MonoCaption>
              <HairLine variant="single" color={PAPER.tomatoDeep} className="w-12 md:w-24" />
            </div>
            <HairLine variant="double" color={PAPER.ink} className="mt-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 mx-auto max-w-2xl font-display text-base md:text-lg leading-[2]"
            style={{ color: PAPER.inkSoft }}
          >
            {name && (
              <>
                {name}，
                <br />
              </>
            )}
            謝謝你選擇角落旅行社。我們已經收到你的申請、
            <br />
            編輯室會在 24 小時內聯絡你確認名額。
            <br />
            這篇筆記、就要開始寫了。
          </motion.p>

          {/* Reservation card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 max-w-lg mx-auto"
          >
            <PostcardFrame bg={PAPER.creamLight}>
              <div
                className="relative p-8 md:p-10 text-left"
              >
                <PaperGrain opacity={0.25} />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <MonoCaption color={PAPER.tomatoDeep}>
                        Reservation · Receipt
                      </MonoCaption>
                      <p
                        className="mt-2 font-display text-xs tracking-[0.18em] uppercase"
                        style={{ color: PAPER.inkSoft, fontWeight: 500 }}
                      >
                        Nº · {String(Date.now()).slice(-6)}
                      </p>
                    </div>
                    <PostageStamp
                      size={64}
                      topText="PAID · TBD"
                      bottomText="DEPOSIT · DUE"
                      rotate={6}
                      color={PAPER.lavenderDeep}
                      center={<StarFilled size={14} color={PAPER.lavenderDeep} />}
                    />
                  </div>

                  <h3
                    className="font-display uppercase text-xl md:text-2xl leading-tight"
                    style={{
                      color: PAPER.ink,
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {tour.title}
                  </h3>

                  <HandwrittenLine
                    width={120}
                    color={PAPER.tomatoDeep}
                    className="mt-3"
                  />

                  <HairLine variant="dashed" color={PAPER.ink} className="mt-6" />

                  <div className="mt-6 space-y-4">
                    <ReceiptRow
                      icon={<Airplane size={26} color={PAPER.ink} stroke={1.3} />}
                      label="Depart"
                      value={formatDate(date)}
                    />
                    <ReceiptRow
                      icon={<Passport size={22} color={PAPER.ink} stroke={1.3} />}
                      label="Travelers"
                      value={`${travelers} 位`}
                    />
                    <ReceiptRow
                      icon={<Suitcase size={26} color={PAPER.ink} stroke={1.3} />}
                      label="Duration"
                      value={tour.duration}
                    />
                  </div>

                  <HairLine variant="dashed" color={PAPER.ink} className="mt-6" />

                  <div className="mt-6 pt-2">
                    <MonoCaption color={PAPER.lavenderDeep}>
                      Next · Steps
                    </MonoCaption>
                    <div className="mt-3 space-y-3">
                      <NextStep
                        n={1}
                        text="24 小時內、編輯室專人致電 / Email 確認"
                      />
                      <NextStep
                        n={2}
                        text="3 個工作日內完成 30% 訂金支付"
                      />
                      <NextStep
                        n={3}
                        text="出發前一週、寄出旅行手冊 + 行前說明"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </PostcardFrame>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-14"
          >
            <PaperButton variant="outline" onClick={onBack}>
              回到封面
            </PaperButton>
          </motion.div>
        </div>
      </section>

      <IllustratedFooter />
    </div>
  );
}

function ReceiptRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="shrink-0">{icon}</span>
      <MonoCaption color={PAPER.tomatoDeep}>{label}</MonoCaption>
      <span
        className="font-display text-sm md:text-base ml-auto"
        style={{ color: PAPER.ink, fontWeight: 500 }}
      >
        {value}
      </span>
    </div>
  );
}

function NextStep({ n, text }: { n: number; text: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
      <NumberMark n={n} size="sm" color={PAPER.tomatoDeep} />
      <p
        className="font-display text-sm leading-[1.85]"
        style={{ color: PAPER.ink }}
      >
        {text}
      </p>
    </div>
  );
}
