'use client';

/**
 * Signup — reservation page
 *
 * 結構（套 reference 的 contact/subscribe 風格、置中對齊 + Italiana 大標）：
 *   1. Header（Eyebrow + Italiana 大標 + 居中 intro）
 *   2. 左側 form（聯絡資料 + 出發日 + 人數 stepper + 備註）
 *   3. 右側 sticky summary（行程卡 + 人數 + 預估總價）
 *   4. Success state（report 完成）
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  WA,
  fontClass,
  serif,
  sans,
  Eyebrow,
  DisplayTitle,
  BodyText,
  PillButton,
  Divider,
  CATEGORY_SHORT,
} from './shared';
import { TopBar, CornerFooter } from './home';

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
    <div
      className={fontClass}
      style={{ background: WA.creamWarm, color: WA.ink, ...sans }}
    >
      <TopBar variant="solid" />

      {/* ────────────── Header ────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-16">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase transition-opacity hover:opacity-70 mb-16"
            style={{ ...sans, color: WA.ink, fontWeight: 500 }}
          >
            <ArrowLeft size={13} strokeWidth={1.2} />
            Back To Trip
          </button>

          <div className="text-center">
            <Eyebrow>Reservation</Eyebrow>
            <div className="mt-12">
              <DisplayTitle size="lg" align="center">
                Reserve A Seat.
              </DisplayTitle>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
              <BodyText size="md" align="center">
                填寫以下資料、我們會在 24 小時內專人聯絡確認名額與付款細節。
                <br />
                送出後不代表正式定位、等專人回覆才算名額確認。
              </BodyText>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-12 pb-32 md:pb-44">
        <Divider color={WA.line} />

        <div className="pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* ────────────── Form ────────────── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-14"
          >
            {/* Personal info */}
            <fieldset>
              <legend
                className="text-[11px] tracking-[0.32em] uppercase mb-10 inline-flex items-center gap-4"
                style={{ ...sans, color: WA.forest, fontWeight: 500 }}
              >
                <span
                  className="text-base"
                  style={{ ...serif, color: WA.forest }}
                >
                  01
                </span>
                Contact  ·  聯絡資料
              </legend>

              <div className="space-y-6">
                <Field
                  label="Full Name"
                  zh="姓名"
                  required
                  value={name}
                  onChange={setName}
                  placeholder="王曉明"
                />
                <Field
                  label="Email"
                  zh="電子信箱"
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                />
                <Field
                  label="Phone"
                  zh="行動電話"
                  required
                  value={phone}
                  onChange={setPhone}
                  placeholder="0912 - 345 - 678"
                />
              </div>
            </fieldset>

            {/* Trip details */}
            <fieldset>
              <legend
                className="text-[11px] tracking-[0.32em] uppercase mb-10 inline-flex items-center gap-4"
                style={{ ...sans, color: WA.forest, fontWeight: 500 }}
              >
                <span
                  className="text-base"
                  style={{ ...serif, color: WA.forest }}
                >
                  02
                </span>
                Travel  ·  行程設定
              </legend>

              <div className="space-y-8">
                {/* Date */}
                <div>
                  <FieldLabel label="Departure Date" zh="出發日" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tour.departureDates.map((d) => {
                      const active = d === date;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => onSelectDate(d)}
                          className="px-5 py-4 text-left rounded-lg transition-all"
                          style={{
                            background: active ? WA.ink : WA.creamLight,
                            color: active ? WA.creamLight : WA.ink,
                            border: `1px solid ${active ? WA.ink : WA.line}`,
                          }}
                        >
                          <span
                            className="text-[10px] tracking-[0.28em] uppercase block mb-2"
                            style={{
                              ...sans,
                              color: active ? WA.sage : WA.forest,
                              fontWeight: 500,
                            }}
                          >
                            {d.slice(0, 4)}
                          </span>
                          <span
                            className="text-base leading-tight block"
                            style={{ ...serif, fontWeight: 400 }}
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
                  <FieldLabel label="Guests" zh="報名人數" />
                  <div
                    className="flex items-center justify-between px-6 py-5 rounded-lg"
                    style={{
                      background: WA.creamLight,
                      border: `1px solid ${WA.line}`,
                    }}
                  >
                    <span
                      className="text-sm"
                      style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
                    >
                      共
                      <span
                        className="text-2xl mx-3"
                        style={{ ...serif, color: WA.ink, fontWeight: 400 }}
                      >
                        {people}
                      </span>
                      人  ·  上限 {tour.groupSize.max} 人
                    </span>
                    <div className="flex items-center gap-3">
                      <StepperBtn
                        onClick={() => setPeople(Math.max(1, people - 1))}
                        disabled={people <= 1}
                        ariaLabel="減少人數"
                      >
                        <Minus size={14} strokeWidth={1.4} />
                      </StepperBtn>
                      <StepperBtn
                        onClick={() =>
                          setPeople(Math.min(tour.groupSize.max, people + 1))
                        }
                        disabled={people >= tour.groupSize.max}
                        ariaLabel="增加人數"
                      >
                        <Plus size={14} strokeWidth={1.4} />
                      </StepperBtn>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <FieldLabel label="Notes (Optional)" zh="特殊需求 / 選填" />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="飲食限制、行動需求、慶生紀念日…"
                    className="w-full px-5 py-4 text-base rounded-lg resize-none outline-none transition-colors focus:bg-white"
                    style={{
                      ...sans,
                      background: WA.creamLight,
                      border: `1px solid ${WA.line}`,
                      color: WA.ink,
                      fontWeight: 300,
                    }}
                  />
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-2">
              <PillButton variant="solid" size="lg" type="submit">
                Confirm Reservation
              </PillButton>
              <p
                className="mt-8 text-xs leading-[1.95]"
                style={{ ...sans, color: WA.inkFaint, fontWeight: 300 }}
              >
                送出後 24 小時內、專人會以電話或 email 聯絡確認名額。
                <br />
                正式定位需於 3 個工作日內完成 30% 訂金支付。
              </p>
            </div>
          </form>

          {/* ────────────── Summary ────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <p
                className="text-[11px] tracking-[0.32em] uppercase mb-8"
                style={{ ...sans, color: WA.forest, fontWeight: 500 }}
              >
                Booking Summary
              </p>

              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: WA.creamLight,
                  border: `1px solid ${WA.line}`,
                }}
              >
                {/* Hero img */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    className="absolute top-4 left-4 px-4 py-2 text-[10px] tracking-[0.32em] uppercase rounded-full"
                    style={{
                      ...sans,
                      background: 'rgba(252,239,223,0.94)',
                      color: WA.ink,
                      fontWeight: 500,
                    }}
                  >
                    {CATEGORY_SHORT[tour.category]}
                  </span>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin
                      size={12}
                      strokeWidth={1.2}
                      style={{ color: WA.forest }}
                    />
                    <span
                      className="text-[10px] tracking-[0.32em] uppercase"
                      style={{ ...sans, color: WA.forest, fontWeight: 500 }}
                    >
                      {tour.destination}
                    </span>
                  </div>
                  <h3
                    className="text-2xl md:text-[28px] leading-tight tracking-[-0.005em] mb-3"
                    style={{ ...serif, color: WA.ink, fontWeight: 400 }}
                  >
                    {tour.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.85] mb-8"
                    style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
                  >
                    {tour.subtitle}
                  </p>

                  <Divider color={WA.line} />

                  <div className="py-7 space-y-4">
                    <SummaryRow
                      icon={<Calendar size={12} strokeWidth={1.2} />}
                      label="Departure"
                      value={formatDate(date)}
                    />
                    <SummaryRow
                      icon={<Calendar size={12} strokeWidth={1.2} />}
                      label="Duration"
                      value={tour.duration}
                    />
                    <SummaryRow
                      icon={<Users size={12} strokeWidth={1.2} />}
                      label="Guests"
                      value={`${people} 人`}
                    />
                  </div>

                  <Divider color={WA.line} />

                  <div className="pt-7 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="text-xs"
                        style={{ ...sans, color: WA.inkSoft, fontWeight: 400 }}
                      >
                        Per Guest
                      </span>
                      <span
                        className="text-base"
                        style={{ ...serif, color: WA.ink, fontWeight: 400 }}
                      >
                        {formatPrice(tour.priceFrom)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="text-xs"
                        style={{ ...sans, color: WA.inkSoft, fontWeight: 400 }}
                      >
                        × {people} Guests
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          ...sans,
                          color: WA.inkFaint,
                          fontWeight: 400,
                        }}
                      >
                        {people} 位旅客
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-7 pt-7 flex items-baseline justify-between"
                    style={{ borderTop: `1px solid ${WA.ink}` }}
                  >
                    <div>
                      <span
                        className="text-[10px] tracking-[0.32em] uppercase block mb-2"
                        style={{
                          ...sans,
                          color: WA.inkFaint,
                          fontWeight: 500,
                        }}
                      >
                        Subtotal
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          ...sans,
                          color: WA.inkSoft,
                          fontWeight: 400,
                        }}
                      >
                        預估小計
                      </span>
                    </div>
                    <span
                      className="text-3xl md:text-4xl"
                      style={{ ...serif, color: WA.ink, fontWeight: 400 }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p
                    className="mt-6 text-xs leading-[1.85]"
                    style={{ ...sans, color: WA.inkFaint, fontWeight: 300 }}
                  >
                    上述為預估金額、不含個人消費與選配活動。
                    最終價格依出發日匯率與選配項目調整。
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Field / FieldLabel
// ─────────────────────────────────────────────────────

function FieldLabel({ label, zh }: { label: string; zh: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span
        className="text-[11px] tracking-[0.32em] uppercase"
        style={{ ...sans, color: WA.forest, fontWeight: 500 }}
      >
        {label}
      </span>
      <span
        className="text-[11px]"
        style={{ ...sans, color: WA.inkFaint, fontWeight: 400 }}
      >
        {zh}
      </span>
    </div>
  );
}

function Field({
  label,
  zh,
  value,
  onChange,
  required,
  type = 'text',
  placeholder,
}: {
  label: string;
  zh: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-baseline gap-3">
        <span
          className="text-[11px] tracking-[0.32em] uppercase"
          style={{ ...sans, color: WA.forest, fontWeight: 500 }}
        >
          {label}
        </span>
        <span
          className="text-[11px]"
          style={{ ...sans, color: WA.inkFaint, fontWeight: 400 }}
        >
          {zh}
        </span>
        {required && (
          <span
            className="text-[10px] tracking-[0.2em] uppercase ml-auto"
            style={{ ...sans, color: WA.forest, fontWeight: 500 }}
          >
            Required
          </span>
        )}
      </div>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-6 h-14 rounded-lg text-base outline-none transition-colors focus:bg-white"
        style={{
          ...sans,
          background: WA.creamLight,
          border: `1px solid ${WA.line}`,
          color: WA.ink,
          fontWeight: 300,
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
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
      style={{
        border: `1px solid ${WA.line}`,
        background: 'white',
        color: WA.ink,
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
      <span style={{ color: WA.forest }}>{icon}</span>
      <span
        className="text-[10px] tracking-[0.24em] uppercase shrink-0"
        style={{ ...sans, color: WA.inkSoft, fontWeight: 500 }}
      >
        {label}
      </span>
      <span
        className="text-sm ml-auto text-right"
        style={{ ...serif, color: WA.ink, fontWeight: 400 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Success state
// ─────────────────────────────────────────────────────

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
    <div
      className={fontClass}
      style={{ background: WA.creamWarm, color: WA.ink, ...sans }}
    >
      <TopBar variant="solid" />

      <section className="min-h-[82vh] flex items-center px-6 md:px-12 py-24">
        <div className="mx-auto max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              border: `1px solid ${WA.forest}`,
              color: WA.forest,
              background: WA.sageMist,
            }}
          >
            <Check size={28} strokeWidth={1.4} />
          </motion.div>

          <div className="mt-14">
            <Eyebrow>Reservation Received</Eyebrow>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 text-[40px] md:text-[72px] leading-[1.08] tracking-[-0.005em]"
            style={{ ...serif, color: WA.ink, fontWeight: 400 }}
          >
            Thank You.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 max-w-xl mx-auto text-base md:text-lg leading-[1.95]"
            style={{ ...sans, color: WA.inkSoft, fontWeight: 300 }}
          >
            {name && <>{name}、</>}謝謝你選擇角落旅行社。
            <br />
            我們已收到你的報名資料、專人會在 24 小時內聯絡確認名額。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 max-w-md mx-auto p-10 rounded-xl"
            style={{
              background: WA.creamLight,
              border: `1px solid ${WA.line}`,
            }}
          >
            <p
              className="text-[10px] tracking-[0.32em] uppercase mb-7"
              style={{ ...sans, color: WA.forest, fontWeight: 500 }}
            >
              Your Booking
            </p>
            <p
              className="text-2xl mb-4 leading-snug"
              style={{ ...serif, color: WA.ink, fontWeight: 400 }}
            >
              {tour.title}
            </p>
            <div className="space-y-3 mt-6">
              <p
                className="text-xs tracking-[0.04em]"
                style={{ ...sans, color: WA.inkSoft, fontWeight: 400 }}
              >
                {formatDate(date)} 出發
              </p>
              <p
                className="text-xs tracking-[0.04em]"
                style={{ ...sans, color: WA.inkSoft, fontWeight: 400 }}
              >
                {people} 人  ·  預估 {formatPrice(tour.priceFrom * people)}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-14"
          >
            <PillButton variant="outline" onClick={onBack}>
              Back To Home
            </PillButton>
          </motion.div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}
