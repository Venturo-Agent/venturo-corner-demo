'use client';

/**
 * Signup — Aman Eastern 報名（私人預約）
 *
 * 結構（極簡、像填私人預約單）：
 *   - 左側表單（姓名 / Email / 電話 / 出發日 / 人數 / 備註）— 無框、underline-only input
 *   - 右側 sticky 訂單摘要（行程 / 日期 / 人數 / 小計）— 無框、純文字
 *   - 底部「確認預約」按鈕
 *   - 提交後 success：「您的私人預約已確認」
 *
 * 跟其它 demo 的差異：
 *   - mediterranean / muji 用 box-style input（背景 + border）
 *   - aman 用 underline-only input、無背景、極瘦
 *   - success 不慶祝、不貼花、像「我們已收到」一句話
 */

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  AMAN,
  AmanWordmark,
  AmanButton,
  QuietLabel,
  Hair,
  CenterDivider,
  CATEGORY_LABEL,
  CATEGORY_LABEL_EN,
  roman,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  tour: Tour;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onBack: () => void;
};

const SLOW_EASE = [0.22, 1, 0.36, 1] as const;

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
    <div style={{ background: AMAN.stone, color: AMAN.ink }}>
      {/* ─────────────── Top bar ─────────────── */}
      <section className="px-6 md:px-16 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-5 transition-colors"
          >
            <span
              aria-hidden
              className="block h-px w-8 transition-all duration-500 group-hover:w-14"
              style={{ background: AMAN.ink }}
            />
            <span
              className="font-display text-[11px]"
              style={{
                color: AMAN.ink,
                letterSpacing: '0.4em',
                fontWeight: 300,
              }}
            >
              BACK
            </span>
          </button>
          <AmanWordmark size="sm" color={AMAN.ink} />
        </div>
      </section>

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-16 pt-32 md:pt-40 pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: SLOW_EASE }}
          >
            <QuietLabel align="center">PRIVATE RESERVATION</QuietLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: SLOW_EASE }}
            className="mt-16 font-display text-[40px] md:text-[68px] leading-[1.1]"
            style={{
              color: AMAN.ink,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            預約席位
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="mt-10 max-w-md mx-auto text-sm leading-[2]"
            style={{ color: AMAN.inkMid, fontWeight: 300 }}
          >
            填寫以下資料。
            <br />
            我們會在 24 小時內，
            <br />
            由專屬旅程顧問與您聯繫。
          </motion.p>
        </div>
      </section>

      {/* ─────────────── Form + Summary ─────────────── */}
      <section className="px-6 md:px-16 pb-32 md:pb-48">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-20 lg:gap-24">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-20">
            {/* Section I — Contact */}
            <Fieldset index={1} title="GUEST" subtitle="貴賓資料">
              <UnderlineField
                label="姓名 NAME"
                required
                value={name}
                onChange={setName}
                placeholder="王曉明"
              />
              <UnderlineField
                label="電子郵件 EMAIL"
                required
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
              />
              <UnderlineField
                label="行動電話 PHONE"
                required
                value={phone}
                onChange={setPhone}
                placeholder="0912 345 678"
              />
            </Fieldset>

            {/* Section II — Journey */}
            <Fieldset index={2} title="JOURNEY" subtitle="行程設定">
              {/* Date */}
              <div>
                <label
                  className="font-display text-[10px] block mb-6"
                  style={{
                    color: AMAN.brassDeep,
                    letterSpacing: '0.4em',
                    fontWeight: 300,
                  }}
                >
                  出發日 DEPARTURE
                </label>
                <Hair color={AMAN.brassSoft} />
                <div>
                  {tour.departureDates.map((d, i) => {
                    const active = d === date;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => onSelectDate(d)}
                        className="w-full text-left py-5 flex items-baseline justify-between transition-all duration-500"
                        style={{
                          borderBottom: `1px solid ${AMAN.lineSoft}`,
                        }}
                      >
                        <div className="flex items-baseline gap-6">
                          <span
                            className="font-display text-[10px]"
                            style={{
                              color: active
                                ? AMAN.ink
                                : AMAN.brassDeep,
                              letterSpacing: '0.35em',
                              fontWeight: 300,
                              minWidth: 28,
                            }}
                          >
                            {roman(i + 1)}
                          </span>
                          <span
                            className="font-display text-sm md:text-base"
                            style={{
                              color: active ? AMAN.ink : AMAN.inkSoft,
                              fontWeight: 300,
                              letterSpacing: '0.03em',
                            }}
                          >
                            {formatDate(d)}
                          </span>
                        </div>
                        <span
                          className="font-display text-[10px] inline-flex items-center gap-4"
                          style={{
                            color: active ? AMAN.ink : AMAN.inkFaint,
                            letterSpacing: '0.4em',
                            fontWeight: 300,
                          }}
                        >
                          {active ? 'SELECTED' : 'SELECT'}
                          <span
                            aria-hidden
                            className="block h-px transition-all duration-500"
                            style={{
                              background: active ? AMAN.ink : AMAN.line,
                              width: active ? 24 : 12,
                            }}
                          />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* People */}
              <div className="mt-12">
                <label
                  className="font-display text-[10px] block mb-6"
                  style={{
                    color: AMAN.brassDeep,
                    letterSpacing: '0.4em',
                    fontWeight: 300,
                  }}
                >
                  人數 GUESTS
                </label>
                <div
                  className="flex items-center justify-between py-6"
                  style={{ borderBottom: `1px solid ${AMAN.line}` }}
                >
                  <p
                    className="font-display text-sm"
                    style={{ color: AMAN.inkMid, fontWeight: 300 }}
                  >
                    <span
                      className="font-display text-3xl md:text-4xl mx-3"
                      style={{
                        color: AMAN.ink,
                        fontWeight: 200,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {String(people).padStart(2, '0')}
                    </span>
                    人　|　上限 {tour.groupSize.max} 人
                  </p>
                  <div className="flex items-center gap-2">
                    <StepperBtn
                      onClick={() => setPeople(Math.max(1, people - 1))}
                      disabled={people <= 1}
                      ariaLabel="減少人數"
                    >
                      −
                    </StepperBtn>
                    <StepperBtn
                      onClick={() =>
                        setPeople(Math.min(tour.groupSize.max, people + 1))
                      }
                      disabled={people >= tour.groupSize.max}
                      ariaLabel="增加人數"
                    >
                      ＋
                    </StepperBtn>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-12">
                <label
                  className="font-display text-[10px] block mb-6"
                  style={{
                    color: AMAN.brassDeep,
                    letterSpacing: '0.4em',
                    fontWeight: 300,
                  }}
                >
                  其他需求 PREFERENCES（選填）
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="飲食偏好、紀念日、特殊安排 ⋯"
                  className="w-full bg-transparent py-3 outline-none font-display text-sm leading-[2] resize-none transition-colors duration-500"
                  style={{
                    color: AMAN.ink,
                    borderBottom: `1px solid ${AMAN.line}`,
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = AMAN.ink)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = AMAN.line)
                  }
                />
              </div>
            </Fieldset>

            {/* Submit */}
            <div className="pt-12">
              <Hair />
              <p
                className="mt-8 mb-12 text-xs leading-[2] text-center max-w-md mx-auto"
                style={{ color: AMAN.inkFaint, fontWeight: 300 }}
              >
                提交後，您的旅程顧問將於 24 小時內聯繫。
                <br />
                所有費用以最終確認為準，不留訂金。
              </p>
              <div className="flex justify-center">
                <AmanButton
                  type="submit"
                  size="lg"
                  disabled={!name || !email || !phone}
                  style={{
                    opacity: !name || !email || !phone ? 0.5 : 1,
                    cursor: !name || !email || !phone ? 'not-allowed' : 'pointer',
                  }}
                >
                  CONFIRM RESERVATION
                </AmanButton>
              </div>
            </div>
          </form>

          {/* Summary sidebar */}
          <aside className="lg:sticky lg:top-12 lg:self-start">
            <div
              className="p-10"
              style={{ background: AMAN.stoneSoft }}
            >
              <p
                className="font-display text-[10px] mb-8"
                style={{
                  color: AMAN.brassDeep,
                  letterSpacing: '0.45em',
                  fontWeight: 300,
                }}
              >
                — RESERVATION —
              </p>

              <p
                className="font-display text-[10px] mb-3"
                style={{
                  color: AMAN.inkFaint,
                  letterSpacing: '0.35em',
                  fontWeight: 300,
                }}
              >
                {CATEGORY_LABEL_EN[tour.category]} ·{' '}
                {CATEGORY_LABEL[tour.category]}
              </p>
              <h3
                className="font-display text-2xl leading-[1.3] mb-6"
                style={{
                  color: AMAN.ink,
                  fontWeight: 250,
                  letterSpacing: '0.03em',
                }}
              >
                {tour.title}
              </h3>

              <Hair color={AMAN.brassSoft} />

              <SummaryRow label="DESTINATION" value={tour.destination} />
              <SummaryRow label="DURATION" value={tour.duration} />
              <SummaryRow
                label="DATE"
                value={date ? formatDate(date) : '未選擇'}
              />
              <SummaryRow
                label="GUESTS"
                value={`${String(people).padStart(2, '0')} 人`}
              />
              <SummaryRow
                label="PER GUEST"
                value={formatPrice(tour.priceFrom)}
              />

              <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${AMAN.brassSoft}` }}>
                <p
                  className="font-display text-[10px] mb-3"
                  style={{
                    color: AMAN.brassDeep,
                    letterSpacing: '0.45em',
                    fontWeight: 300,
                  }}
                >
                  ESTIMATED TOTAL
                </p>
                <p
                  className="font-display text-3xl"
                  style={{
                    color: AMAN.ink,
                    fontWeight: 200,
                    letterSpacing: '0.04em',
                  }}
                >
                  {formatPrice(subtotal)}
                </p>
                <p
                  className="mt-3 text-xs leading-[1.85]"
                  style={{ color: AMAN.inkFaint, fontWeight: 300 }}
                >
                  最終金額以確認信為準
                </p>
              </div>
            </div>

            <p
              className="mt-10 text-xs leading-[2] text-center px-4"
              style={{ color: AMAN.inkFaint, fontWeight: 300 }}
            >
              「不留訂金，不催繳。
              <br />
              不適合的旅程，
              <br />
              我們也會誠實告訴您。」
            </p>
          </aside>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Fieldset — 章節區塊（編號 + 雙語標）
// ─────────────────────────────────────────────────────

function Fieldset({
  index,
  title,
  subtitle,
  children,
}: {
  index: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-12 block w-full">
        <div className="flex items-baseline gap-6">
          <span
            className="font-display text-[10px]"
            style={{
              color: AMAN.brassDeep,
              letterSpacing: '0.4em',
              fontWeight: 300,
            }}
          >
            {roman(index)}
          </span>
          <span
            aria-hidden
            className="block h-px w-12"
            style={{ background: AMAN.brassSoft }}
          />
          <span
            className="font-display text-[11px]"
            style={{
              color: AMAN.ink,
              letterSpacing: '0.45em',
              fontWeight: 300,
            }}
          >
            {title}
          </span>
          <span
            className="font-display text-[11px]"
            style={{
              color: AMAN.inkFaint,
              letterSpacing: '0.05em',
              fontWeight: 300,
            }}
          >
            　{subtitle}
          </span>
        </div>
        <div className="mt-8">
          <Hair />
        </div>
      </legend>
      <div className="space-y-10">{children}</div>
    </fieldset>
  );
}

// ─────────────────────────────────────────────────────
// UnderlineField — 無框、only-underline input
// ─────────────────────────────────────────────────────

function UnderlineField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="font-display text-[10px] block mb-4"
        style={{
          color: AMAN.brassDeep,
          letterSpacing: '0.4em',
          fontWeight: 300,
        }}
      >
        {label}
        {required && (
          <span
            style={{ color: AMAN.brassDeep, marginLeft: 8 }}
            aria-hidden
          >
            ※
          </span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent py-3 outline-none font-display text-base transition-colors duration-500"
        style={{
          color: AMAN.ink,
          borderBottom: `1px solid ${AMAN.line}`,
          fontWeight: 300,
          letterSpacing: '0.03em',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = AMAN.ink)}
        onBlur={(e) => (e.currentTarget.style.borderColor = AMAN.line)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// StepperBtn — 加減人數按鈕（極簡方角、無圈）
// ─────────────────────────────────────────────────────

function StepperBtn({
  onClick,
  disabled,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="h-10 w-10 font-display text-base transition-all duration-500"
      style={{
        background: 'transparent',
        color: disabled ? AMAN.inkFaint : AMAN.ink,
        border: `1px solid ${disabled ? AMAN.lineSoft : AMAN.line}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 300,
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// SummaryRow — 訂單摘要列
// ─────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="py-4 flex items-baseline justify-between gap-4"
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
        className="font-display text-sm text-right"
        style={{ color: AMAN.inkSoft, fontWeight: 300 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SuccessView — 預約確認、極簡、不慶祝
// 「您的私人預約已確認」
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
    <div style={{ background: AMAN.stone, color: AMAN.ink }}>
      <section className="px-6 md:px-16 pt-12 md:pt-16">
        <div className="mx-auto max-w-7xl flex justify-center">
          <AmanWordmark size="sm" color={AMAN.ink} />
        </div>
      </section>

      <section className="px-6 md:px-16 py-32 md:py-48">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: SLOW_EASE }}
          >
            <QuietLabel align="center">— CONFIRMED —</QuietLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.2, ease: SLOW_EASE }}
            className="mt-20 font-display text-[36px] md:text-[60px] leading-[1.2]"
            style={{
              color: AMAN.ink,
              fontWeight: 200,
              letterSpacing: '0.04em',
            }}
          >
            您的私人預約
            <br />
            已確認收到。
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="mt-20"
          >
            <CenterDivider />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.65, ease: SLOW_EASE }}
            className="mt-20 max-w-md mx-auto"
          >
            <div className="space-y-6 text-left">
              <SummaryRow label="GUEST" value={name || '—'} />
              <SummaryRow label="JOURNEY" value={tour.title} />
              <SummaryRow label="DATE" value={formatDate(date)} />
              <SummaryRow
                label="GUESTS"
                value={`${String(people).padStart(2, '0')} 人`}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.9 }}
            className="mt-20 max-w-md mx-auto text-sm leading-[2.15]"
            style={{ color: AMAN.inkMid, fontWeight: 300 }}
          >
            您的旅程顧問將於 24 小時內聯繫，
            <br />
            細談行程安排與付款細節。
            <br />
            在此之前，
            <br />
            您不需要做任何事。
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.2 }}
            className="mt-20 flex justify-center"
          >
            <AmanButton size="lg" onClick={onBack}>
              RETURN HOME
            </AmanButton>
          </motion.div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}
