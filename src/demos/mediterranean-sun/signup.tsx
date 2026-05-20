'use client';

/**
 * Signup — 報名頁
 *
 * 結構：
 *   - 左側表單（姓名 / email / 電話 / 出發日 / 人數 / 備註）
 *   - 右側 sticky 行程摘要（標題 / 天數 / 單人價 / 人數 / 小計）
 *   - 底部確認報名按鈕
 *   - 提交後顯示 success state
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
  SUN,
  SectionLabel,
  SunButton,
  HairLine,
  CATEGORY_LABEL,
} from './shared';
import { CornerFooter } from './home';

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
    <div style={{ background: SUN.sand, color: SUN.ink }}>
      {/* Header */}
      <section className="px-6 md:px-12 pt-20 md:pt-28 pb-12">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-xs tracking-[0.3em] uppercase transition-opacity hover:opacity-70 mb-12"
            style={{ color: SUN.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回行程
          </button>

          <SectionLabel>Reservation</SectionLabel>
          <h1
            className="font-display font-light mt-8 leading-[1.1] text-[40px] md:text-[64px]"
            style={{ color: SUN.ink }}
          >
            報名出發
          </h1>
          <p
            className="mt-8 max-w-2xl text-base md:text-lg leading-[1.95]"
            style={{ color: SUN.inkSoft }}
          >
            填寫以下資料、我們會在 24 小時內專人聯絡確認名額與付款細節。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-12 pb-24 md:pb-32">
        <HairLine />

        <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* ─────────────── Form ─────────────── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-10"
          >
            {/* Personal info */}
            <fieldset>
              <legend
                className="font-display text-xs tracking-[0.4em] uppercase mb-8 block"
                style={{ color: SUN.goldDeep }}
              >
                01 · Contact 聯絡資料
              </legend>

              <div className="space-y-6">
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
              <legend
                className="font-display text-xs tracking-[0.4em] uppercase mb-8 block"
                style={{ color: SUN.goldDeep }}
              >
                02 · Travel 行程設定
              </legend>

              <div className="space-y-6">
                {/* Date */}
                <div>
                  <label
                    className="font-display text-xs tracking-[0.3em] uppercase block mb-3"
                    style={{ color: SUN.inkSoft }}
                  >
                    出發日
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tour.departureDates.map((d) => {
                      const active = d === date;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => onSelectDate(d)}
                          className="px-5 py-4 text-left transition-all"
                          style={{
                            background: active ? SUN.night : SUN.sandLight,
                            color: active ? SUN.sandLight : SUN.ink,
                            border: `1px solid ${active ? SUN.night : SUN.line}`,
                          }}
                        >
                          <span
                            className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-2"
                            style={{
                              color: active ? SUN.gold : SUN.inkFaint,
                            }}
                          >
                            {d.slice(0, 4)}
                          </span>
                          <span className="font-display text-base leading-tight">
                            {formatDate(d)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* People stepper */}
                <div>
                  <label
                    className="font-display text-xs tracking-[0.3em] uppercase block mb-3"
                    style={{ color: SUN.inkSoft }}
                  >
                    報名人數
                  </label>
                  <div
                    className="flex items-center justify-between px-6 py-4"
                    style={{
                      background: SUN.sandLight,
                      border: `1px solid ${SUN.line}`,
                    }}
                  >
                    <span
                      className="text-sm"
                      style={{ color: SUN.inkSoft }}
                    >
                      共
                      <span
                        className="font-display text-2xl mx-3"
                        style={{ color: SUN.ink }}
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
                  <label
                    className="font-display text-xs tracking-[0.3em] uppercase block mb-3"
                    style={{ color: SUN.inkSoft }}
                  >
                    特殊需求（選填）
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="飲食限制、行動需求、慶生紀念日…"
                    className="w-full px-5 py-4 text-base resize-none outline-none transition-colors focus:bg-white"
                    style={{
                      background: SUN.sandLight,
                      border: `1px solid ${SUN.line}`,
                      color: SUN.ink,
                    }}
                  />
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-4">
              <SunButton size="lg" type="submit" className="w-full sm:w-auto">
                確認報名
              </SunButton>
              <p
                className="mt-6 text-xs leading-[1.95]"
                style={{ color: SUN.inkFaint }}
              >
                送出後 24 小時內、專人會以電話或 email 聯絡確認名額。
                <br />
                正式定位需於 3 個工作日內完成 30% 訂金支付。
              </p>
            </div>
          </form>

          {/* ─────────────── Summary ─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <p
                className="font-display text-xs tracking-[0.4em] uppercase mb-6"
                style={{ color: SUN.goldDeep }}
              >
                Booking Summary
              </p>

              <div
                style={{
                  background: SUN.sandLight,
                  border: `1px solid ${SUN.line}`,
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
                    className="absolute top-4 left-4 font-display text-[10px] tracking-[0.4em] uppercase px-3 py-1.5"
                    style={{
                      background: 'rgba(244,233,216,0.92)',
                      color: SUN.ink,
                    }}
                  >
                    {CATEGORY_LABEL[tour.category]}
                  </span>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin
                      size={13}
                      strokeWidth={1.5}
                      style={{ color: SUN.goldDeep }}
                    />
                    <span
                      className="font-display text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: SUN.goldDeep }}
                    >
                      {tour.destination}
                    </span>
                  </div>
                  <h3
                    className="font-display font-light leading-tight text-2xl mb-2"
                    style={{ color: SUN.ink }}
                  >
                    {tour.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: SUN.inkSoft }}
                  >
                    {tour.subtitle}
                  </p>

                  <HairLine />

                  {/* Summary rows */}
                  <div className="py-6 space-y-4">
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

                  <HairLine />

                  {/* Price calculation */}
                  <div className="pt-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: SUN.inkSoft }}
                      >
                        單人團費
                      </span>
                      <span
                        className="font-display text-base"
                        style={{ color: SUN.ink }}
                      >
                        {formatPrice(tour.priceFrom)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: SUN.inkSoft }}
                      >
                        × {people} 人
                      </span>
                      <span
                        className="font-mono text-xs"
                        style={{ color: SUN.inkFaint }}
                      >
                        {people} 位旅客
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-6 pt-6 flex items-baseline justify-between"
                    style={{ borderTop: `1px solid ${SUN.night}` }}
                  >
                    <div>
                      <span
                        className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-1"
                        style={{ color: SUN.inkFaint }}
                      >
                        Subtotal
                      </span>
                      <span
                        className="font-display text-sm"
                        style={{ color: SUN.ink }}
                      >
                        預估小計
                      </span>
                    </div>
                    <span
                      className="font-display text-3xl"
                      style={{ color: SUN.ink }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p
                    className="mt-6 text-xs leading-[1.85]"
                    style={{ color: SUN.inkFaint }}
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
        className="font-display text-xs tracking-[0.3em] uppercase block mb-3"
        style={{ color: SUN.inkSoft }}
      >
        {label}
        {required && <span style={{ color: SUN.goldDeep }}> · 必填</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 h-14 text-base outline-none transition-colors focus:bg-white"
        style={{
          background: SUN.sandLight,
          border: `1px solid ${SUN.line}`,
          color: SUN.ink,
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
        border: `1px solid ${SUN.line}`,
        background: 'white',
        color: SUN.ink,
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
      <span style={{ color: SUN.goldDeep }}>{icon}</span>
      <span
        className="font-display text-xs tracking-[0.2em] uppercase shrink-0"
        style={{ color: SUN.inkSoft }}
      >
        {label}
      </span>
      <span
        className="font-display text-sm ml-auto text-right"
        style={{ color: SUN.ink }}
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
    <div style={{ background: SUN.sand, color: SUN.ink }}>
      <section className="min-h-[80vh] flex items-center px-6 md:px-12 py-24">
        <div className="mx-auto max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-20 h-20 flex items-center justify-center"
            style={{
              border: `1px solid ${SUN.goldDeep}`,
              color: SUN.goldDeep,
            }}
          >
            <Check size={28} strokeWidth={1.5} />
          </motion.div>

          <SectionLabel align="center" className="mt-12">
            Reservation Received
          </SectionLabel>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-display font-light mt-10 leading-[1.2] text-[40px] md:text-[56px]"
            style={{ color: SUN.ink }}
          >
            報名已送出
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 max-w-xl mx-auto text-base md:text-lg leading-[2]"
            style={{ color: SUN.inkSoft }}
          >
            {name && <>{name}、</>}謝謝你選擇角落旅行社。
            <br />
            我們已收到你的報名資料、專人會在 24 小時內聯絡確認名額。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-16 max-w-md mx-auto"
            style={{
              background: SUN.sandLight,
              border: `1px solid ${SUN.line}`,
              padding: 32,
            }}
          >
            <p
              className="font-display text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: SUN.goldDeep }}
            >
              Your Booking
            </p>
            <p
              className="font-display text-xl mb-3 leading-snug"
              style={{ color: SUN.ink }}
            >
              {tour.title}
            </p>
            <div className="space-y-2 mt-6">
              <p
                className="font-mono text-xs tracking-wider"
                style={{ color: SUN.inkSoft }}
              >
                {formatDate(date)} 出發
              </p>
              <p
                className="font-mono text-xs tracking-wider"
                style={{ color: SUN.inkSoft }}
              >
                {people} 人 · 預估 {formatPrice(tour.priceFrom * people)}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12"
          >
            <SunButton variant="outline" onClick={onBack}>
              回到首頁
            </SunButton>
          </motion.div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}
