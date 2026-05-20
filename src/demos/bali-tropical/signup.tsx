'use client';

/**
 * Signup — 報名頁
 *
 * 結構：
 *   - 左側表單（聯絡 + 行程設定）
 *   - 右側 sticky 預估摘要（含縮圖、行程、人數、小計）
 *   - 提交後 success：葉子飄落動畫 + 確認摘要 + 回首頁
 *
 * 風格：像「報名工藝工作坊」、不是電商結帳
 *   - fieldset legend 用印章式編號 + LotusIcon
 *   - 摘要卡四角加 FrameCorners 木刻角飾
 *   - field input 暖色 coconutLight 底
 *   - success 動畫：多片葉子飄落 + 中央木刻印章
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Minus,
  Plus,
  Check,
  Calendar,
  Users,
  MapPin,
} from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  BALI,
  SectionLabel,
  BaliButton,
  CarvedLine,
  LeafIcon,
  LotusIcon,
  StampNumber,
  WeavePattern,
  FrameCorners,
  EASE_OUT,
  EASE_LEAF,
  CATEGORY_LABEL,
  JungleFooter,
} from './shared';

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
  const [people, setPeople] = useState(2);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const date = selectedDate ?? tour.departureDates[0];
  const subtotal = tour.priceFrom * people;

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
        people={people}
        name={name}
        onBack={onBack}
      />
    );
  }

  return (
    <div style={{ background: BALI.coconut, color: BALI.ink }}>
      {/* Header */}
      <section className="relative px-6 md:px-12 pt-24 md:pt-32 pb-16">
        <WeavePattern opacity={0.04} color={BALI.wood} />

        <div className="relative mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 mb-14"
            style={{ color: BALI.wood, fontWeight: 400 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回行程
          </button>

          <SectionLabel>Reservation</SectionLabel>
          <h1
            className="font-display mt-10 leading-[1.1] text-[40px] md:text-[68px]"
            style={{
              color: BALI.wood,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            報名出發
          </h1>
          <p
            className="mt-10 max-w-2xl text-base md:text-lg leading-[2.1]"
            style={{ color: BALI.inkSoft }}
          >
            填寫以下資料、我們會在 24 小時內專人聯絡確認名額與付款細節。
            蜜月與私訂行程優先安排。送出後不會自動扣款、需電話確認後再付訂金。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-12 pb-28 md:pb-40">
        <CarvedLine color={BALI.line} />

        <div className="pt-14 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* ─────────────── Form ─────────────── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-14"
          >
            {/* Personal info */}
            <fieldset>
              <FieldsetLegend n={1} en="Contact" cn="聯絡資料" />

              <div className="space-y-7">
                <Field
                  label="姓名"
                  required
                  value={name}
                  onChange={setName}
                  placeholder="王曉明"
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                />
                <Field
                  label="行動電話"
                  required
                  value={phone}
                  onChange={setPhone}
                  placeholder="0912-345-678"
                />
              </div>
            </fieldset>

            {/* Trip details */}
            <fieldset>
              <FieldsetLegend n={2} en="Travel" cn="行程設定" />

              <div className="space-y-9">
                {/* Date */}
                <div>
                  <FieldLabel>出發日</FieldLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tour.departureDates.map((d) => {
                      const active = d === date;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => onSelectDate(d)}
                          className="relative px-5 py-4 text-left transition-all"
                          style={{
                            background: active ? BALI.wood : BALI.coconutLight,
                            color: active ? BALI.coconutLight : BALI.wood,
                            border: `1px solid ${active ? BALI.wood : BALI.line}`,
                          }}
                        >
                          <FrameCorners
                            color={active ? 'rgba(244,236,224,0.5)' : BALI.spice}
                            size={12}
                            inset={6}
                          />
                          <span
                            className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-2 relative"
                            style={{
                              color: active
                                ? 'rgba(244,236,224,0.75)'
                                : BALI.inkFaint,
                            }}
                          >
                            {d.slice(0, 4)}
                          </span>
                          <span
                            className="font-display text-base leading-tight relative"
                            style={{ fontWeight: 400 }}
                          >
                            {formatDate(d)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* People stepper */}
                <div>
                  <FieldLabel>報名人數</FieldLabel>
                  <div
                    className="flex items-center justify-between px-7 py-5"
                    style={{
                      background: BALI.coconutLight,
                      border: `1px solid ${BALI.line}`,
                    }}
                  >
                    <span
                      className="text-sm"
                      style={{ color: BALI.inkSoft }}
                    >
                      共
                      <span
                        className="font-display text-2xl mx-3"
                        style={{
                          color: BALI.wood,
                          fontWeight: 400,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {people}
                      </span>
                      人 · 上限 {tour.groupSize.max} 人
                    </span>
                    <div className="flex items-center gap-3">
                      <StepperBtn
                        onClick={() => setPeople(Math.max(1, people - 1))}
                        disabled={people <= 1}
                        ariaLabel="減少人數"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </StepperBtn>
                      <StepperBtn
                        onClick={() =>
                          setPeople(Math.min(tour.groupSize.max, people + 1))
                        }
                        disabled={people >= tour.groupSize.max}
                        ariaLabel="增加人數"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </StepperBtn>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <FieldLabel>特殊需求（選填）</FieldLabel>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="飲食限制、行動需求、慶生紀念日、蜜月驚喜、過敏與藥物…"
                    className="w-full px-5 py-4 text-base resize-none outline-none transition-colors focus:bg-white"
                    style={{
                      background: BALI.coconutLight,
                      border: `1px solid ${BALI.line}`,
                      color: BALI.wood,
                    }}
                  />
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-4">
              <BaliButton size="lg" type="submit" className="w-full sm:w-auto">
                確認報名
              </BaliButton>
              <p
                className="mt-7 text-xs leading-[2.1]"
                style={{ color: BALI.inkFaint }}
              >
                送出後 24 小時內、專人會以電話或 email 聯絡確認名額。
                <br />
                正式定位需於 3 個工作日內完成 30% 訂金支付。
                <br />
                所有資料受 SSL 加密保護、不會用於團務以外用途。
              </p>
            </div>
          </form>

          {/* ─────────────── Summary ─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <div className="flex items-center gap-3 mb-8">
                <LotusIcon size={13} color={BALI.spiceDeep} />
                <p
                  className="font-display text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                >
                  Booking Summary
                </p>
              </div>

              <div
                className="relative"
                style={{
                  background: BALI.coconutBone,
                  border: `1px solid ${BALI.line}`,
                }}
              >
                <FrameCorners color={BALI.spice} size={20} inset={14} />

                {/* Hero img */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                    style={{
                      filter: 'saturate(1.08) contrast(1.02) brightness(0.97)',
                    }}
                  />
                  <span
                    className="absolute top-4 left-4 font-display text-[10px] tracking-[0.4em] uppercase px-3 py-1.5 inline-flex items-center gap-2"
                    style={{
                      background: 'rgba(244,236,224,0.92)',
                      color: BALI.wood,
                      fontWeight: 400,
                    }}
                  >
                    <LotusIcon size={10} color={BALI.spiceDeep} />
                    {CATEGORY_LABEL[tour.category]}
                  </span>
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin
                      size={13}
                      strokeWidth={1.5}
                      style={{ color: BALI.spiceDeep }}
                    />
                    <span
                      className="font-display text-[10px] tracking-[0.4em] uppercase"
                      style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                    >
                      {tour.destination}
                    </span>
                  </div>
                  <h3
                    className="font-display leading-tight text-2xl mb-3"
                    style={{
                      color: BALI.wood,
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tour.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.95] mb-7"
                    style={{ color: BALI.inkSoft }}
                  >
                    {tour.subtitle}
                  </p>

                  <CarvedLine color={BALI.line} />

                  <div className="py-7 space-y-5">
                    <SummaryRow
                      icon={<Calendar size={13} strokeWidth={1.5} />}
                      label="出發日"
                      value={formatDate(date)}
                    />
                    <SummaryRow
                      icon={<Calendar size={13} strokeWidth={1.5} />}
                      label="行程天數"
                      value={tour.duration}
                    />
                    <SummaryRow
                      icon={<Users size={13} strokeWidth={1.5} />}
                      label="報名人數"
                      value={`${people} 人`}
                    />
                  </div>

                  <CarvedLine color={BALI.line} />

                  <div className="pt-7 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: BALI.inkSoft }}
                      >
                        單人團費
                      </span>
                      <span
                        className="font-display text-base"
                        style={{ color: BALI.wood, fontWeight: 400 }}
                      >
                        {formatPrice(tour.priceFrom)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: BALI.inkSoft }}
                      >
                        × {people} 人
                      </span>
                      <span
                        className="font-mono text-xs"
                        style={{ color: BALI.inkFaint }}
                      >
                        {people} 位旅客
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-7 pt-7 flex items-baseline justify-between"
                    style={{ borderTop: `1px solid ${BALI.wood}` }}
                  >
                    <div>
                      <span
                        className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-1"
                        style={{ color: BALI.inkFaint }}
                      >
                        Subtotal
                      </span>
                      <span
                        className="font-display text-sm"
                        style={{ color: BALI.wood, fontWeight: 400 }}
                      >
                        預估小計
                      </span>
                    </div>
                    <span
                      className="font-display text-3xl"
                      style={{
                        color: BALI.wood,
                        fontWeight: 400,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p
                    className="mt-7 text-xs leading-[2]"
                    style={{ color: BALI.inkFaint }}
                  >
                    上述為預估金額、不含個人消費與選配活動。
                    最終價格依出發日匯率與選配項目調整。
                    所有費用會在電話確認時逐項說明。
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <JungleFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Fieldset legend — 印章式 + LotusIcon
// ─────────────────────────────────────────────────────

function FieldsetLegend({
  n,
  en,
  cn,
}: {
  n: number;
  en: string;
  cn: string;
}) {
  return (
    <legend className="flex items-center gap-4 mb-10">
      <StampNumber n={n} tone="spice" />
      <span
        aria-hidden
        className="block h-px w-6"
        style={{ background: BALI.spice }}
      />
      <span
        className="font-display text-[10px] tracking-[0.5em] uppercase"
        style={{ color: BALI.spiceDeep, fontWeight: 400 }}
      >
        {en} · {cn}
      </span>
    </legend>
  );
}

// ─────────────────────────────────────────────────────
// Field label
// ─────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="font-display text-[10px] tracking-[0.4em] uppercase block mb-4"
      style={{ color: BALI.inkSoft, fontWeight: 400 }}
    >
      {children}
    </label>
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
        className="font-display text-[10px] tracking-[0.4em] uppercase block mb-3"
        style={{ color: BALI.inkSoft, fontWeight: 400 }}
      >
        {label}
        {required && (
          <span style={{ color: BALI.spiceDeep }}> · 必填</span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 h-14 text-base outline-none transition-colors focus:bg-white"
        style={{
          background: BALI.coconutLight,
          border: `1px solid ${BALI.line}`,
          color: BALI.wood,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Stepper btn
// ─────────────────────────────────────────────────────

function StepperBtn({
  onClick,
  disabled,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className="w-10 h-10 flex items-center justify-center transition-all disabled:opacity-30"
      style={{
        border: `1px solid ${BALI.line}`,
        background: 'white',
        color: BALI.wood,
      }}
    >
      {children}
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
    <div className="flex items-baseline gap-3">
      <span style={{ color: BALI.spiceDeep }}>{icon}</span>
      <span
        className="font-display text-[10px] tracking-[0.3em] uppercase shrink-0"
        style={{ color: BALI.inkSoft, fontWeight: 400 }}
      >
        {label}
      </span>
      <span
        className="font-display text-sm ml-auto text-right"
        style={{ color: BALI.wood, fontWeight: 400 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Success state — 葉子飄落動畫 + 木刻印章確認
// 跟 maldives 的「紙飛機飛弧線」完全不同：
//   maldives = 飛走（飛機）= 旅程開始
//   bali    = 葉子飄落（土地）= 落地、根扎進去
// ─────────────────────────────────────────────────────

const FALLING_LEAVES = [
  { left: '8%', size: 22, delay: 0, duration: 6, color: BALI.spiceLight, drift: 60 },
  { left: '18%', size: 16, delay: 1.2, duration: 7, color: BALI.jungle, drift: -40 },
  { left: '28%', size: 24, delay: 0.5, duration: 8, color: BALI.spice, drift: 80 },
  { left: '40%', size: 18, delay: 2, duration: 6.5, color: BALI.jungleLight, drift: -50 },
  { left: '52%', size: 28, delay: 0.3, duration: 9, color: BALI.spiceDeep, drift: 70 },
  { left: '64%', size: 20, delay: 1.8, duration: 7, color: BALI.jungle, drift: -60 },
  { left: '76%', size: 16, delay: 0.9, duration: 6, color: BALI.spiceLight, drift: 40 },
  { left: '88%', size: 22, delay: 1.5, duration: 8, color: BALI.spice, drift: -70 },
];

function SuccessView({
  tour,
  date,
  people,
  name,
  onBack,
}: {
  tour: Tour;
  date: string;
  people: number;
  name: string;
  onBack: () => void;
}) {
  return (
    <div style={{ background: BALI.coconut, color: BALI.wood }}>
      <section className="relative min-h-[88vh] flex items-center px-6 md:px-12 py-24 overflow-hidden">
        <WeavePattern opacity={0.05} color={BALI.wood} />

        {/* 葉子飄落 */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {FALLING_LEAVES.map((l, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: l.left,
                top: '-8%',
              }}
              initial={{
                y: '-10vh',
                rotate: 0,
                opacity: 0,
                x: 0,
              }}
              animate={{
                y: '110vh',
                rotate: [0, 240 + i * 30, 380],
                x: [0, l.drift, l.drift * -0.5, 0],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: l.duration,
                delay: l.delay,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: EASE_LEAF,
              }}
            >
              <LeafIcon size={l.size} color={l.color} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-3xl w-full text-center">
          {/* 木刻印章式確認框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
            className="relative mx-auto w-28 h-28 flex items-center justify-center"
            style={{
              border: `1px solid ${BALI.wood}`,
              color: BALI.wood,
              background: BALI.coconutLight,
            }}
          >
            <FrameCorners color={BALI.spiceDeep} size={16} inset={6} />
            <Check size={36} strokeWidth={1.5} />
          </motion.div>

          {/* 印章 caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6"
          >
            <span
              className="font-mono text-[10px] tracking-[0.4em] uppercase"
              style={{ color: BALI.spiceDeep }}
            >
              Stamped · 已收件
            </span>
          </motion.div>

          <SectionLabel align="center" className="mt-12">
            Reservation Received
          </SectionLabel>

          <motion.h1
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.5 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.3, ease: EASE_OUT }}
            className="font-display mt-12 leading-[1.25] text-[40px] md:text-[60px]"
            style={{
              color: BALI.wood,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            報名已送出
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 max-w-xl mx-auto text-base md:text-lg leading-[2.2]"
            style={{ color: BALI.inkSoft }}
          >
            {name && <>{name}、</>}謝謝你選擇角落旅行社。
            <br />
            我們已收到你的報名資料、專人會在 24 小時內聯絡確認名額。
          </motion.p>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.7, ease: EASE_OUT }}
              className="relative mt-20 max-w-md mx-auto"
              style={{
                background: BALI.coconutBone,
                border: `1px solid ${BALI.line}`,
                padding: 40,
              }}
            >
              <FrameCorners color={BALI.spice} size={18} inset={12} />

              <div className="flex items-center justify-center gap-3 mb-6">
                <LotusIcon size={13} color={BALI.spiceDeep} />
                <p
                  className="font-display text-[10px] tracking-[0.5em] uppercase"
                  style={{ color: BALI.spiceDeep, fontWeight: 400 }}
                >
                  Your Booking
                </p>
                <LotusIcon size={13} color={BALI.spiceDeep} />
              </div>

              <p
                className="font-display text-xl md:text-2xl mb-4 leading-snug"
                style={{
                  color: BALI.wood,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                {tour.title}
              </p>
              <CarvedLine color={BALI.line} />
              <div className="pt-5 space-y-2">
                <p
                  className="font-mono text-xs tracking-wider"
                  style={{ color: BALI.inkSoft }}
                >
                  {formatDate(date)} 出發
                </p>
                <p
                  className="font-mono text-xs tracking-wider"
                  style={{ color: BALI.inkSoft }}
                >
                  {people} 人 · 預估 {formatPrice(tour.priceFrom * people)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-14"
          >
            <BaliButton variant="outline" onClick={onBack}>
              回到首頁
            </BaliButton>
          </motion.div>
        </div>
      </section>

      <JungleFooter />
    </div>
  );
}
