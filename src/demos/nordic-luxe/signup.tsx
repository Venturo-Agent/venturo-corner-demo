'use client';

/**
 * Signup — 報名頁（北歐極簡奢華 Nordic Luxe）
 *
 * 跟 alpine signup 對比：
 *   - alpine 用 N 01 / N 02 座標感 section head
 *   - nordic 用「Reservation Form Section 01」hotel reservation 風
 *   - alpine input 下劃線型
 *   - nordic input 也用下劃線型、但 label 更小、字距更克制
 *   - alpine summary 右側 image 加邊框
 *   - nordic summary 用「confirmation card」hotel reservation 確認單感
 *   - Success view：alpine 用線條方框打勾、nordic 用「confirmation card」+ 大量留白
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  NORDIC,
  CaptionLabel,
  QuietLabel,
  NordicButton,
  HairLine,
  CATEGORY_LABEL,
  LightTitle,
  NORDIC_EASE,
  NORDIC_EASE_LONG,
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
    <div style={{ background: NORDIC.paper, color: NORDIC.ink }}>
      {/* Header */}
      <section className="px-10 md:px-20 pt-24 md:pt-32 pb-16">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-65 mb-16"
            style={{ color: NORDIC.stone, fontWeight: 400 }}
          >
            <ArrowLeft size={13} strokeWidth={1.2} />
            返回行程
          </button>

          <CaptionLabel>Reservation</CaptionLabel>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-end">
            <div className="md:col-span-7">
              <LightTitle
                as="h1"
                className="text-[44px] md:text-[72px]"
                style={{ lineHeight: 1.05 }}
              >
                報名出發
              </LightTitle>
            </div>
            <div className="md:col-span-5 md:pb-4">
              <div
                className="h-px w-12 mb-8"
                style={{ background: NORDIC.stone }}
              />
              <p
                className="text-[15px] leading-[2.05]"
                style={{ color: NORDIC.inkSoft }}
              >
                填寫以下資料、我們會在 24 小時內專人聯絡確認名額與付款細節。
                不會發促銷信、不會打騷擾電話。
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-10 md:px-20 pb-32 md:pb-44">
        <HairLine />

        <div className="pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* ─────────────── Form ─────────────── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-20"
          >
            {/* Section 01 — Contact */}
            <fieldset>
              <SectionHead n="01" en="Contact" zh="聯絡資料" />

              <div className="space-y-12 mt-12">
                <UnderlineField
                  label="姓名"
                  required
                  value={name}
                  onChange={setName}
                  placeholder="王曉明"
                />
                <UnderlineField
                  label="Email"
                  required
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                />
                <UnderlineField
                  label="行動電話"
                  required
                  value={phone}
                  onChange={setPhone}
                  placeholder="0912-345-678"
                />
              </div>
            </fieldset>

            {/* Section 02 — Travel */}
            <fieldset>
              <SectionHead n="02" en="Travel" zh="行程設定" />

              <div className="space-y-12 mt-12">
                {/* Date selector — list 型 */}
                <div>
                  <FieldLabel>出發日</FieldLabel>
                  <div className="mt-6">
                    {tour.departureDates.map((d, i) => {
                      const active = d === date;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => onSelectDate(d)}
                          className="w-full text-left py-5 grid grid-cols-[40px_1fr_auto] gap-6 items-center transition-colors"
                          style={{
                            borderTop: `1px solid ${NORDIC.line}`,
                            borderBottom:
                              i === tour.departureDates.length - 1
                                ? `1px solid ${NORDIC.line}`
                                : 'none',
                            background: active ? NORDIC.oak : 'transparent',
                          }}
                        >
                          <span
                            className="font-mono text-[11px] tracking-[0.25em]"
                            style={{
                              color: active ? NORDIC.charcoal : NORDIC.stone,
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <LightTitle
                            as="h4"
                            className="text-base md:text-[18px]"
                            color={active ? NORDIC.charcoal : NORDIC.ink}
                          >
                            {formatDate(d)}
                          </LightTitle>
                          <QuietLabel
                            color={active ? NORDIC.charcoal : NORDIC.stoneSoft}
                          >
                            {active ? '已選' : '選擇'}
                          </QuietLabel>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* People stepper */}
                <div>
                  <FieldLabel>報名人數</FieldLabel>
                  <div
                    className="flex items-center justify-between py-6 mt-6"
                    style={{
                      borderTop: `1px solid ${NORDIC.line}`,
                      borderBottom: `1px solid ${NORDIC.line}`,
                    }}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-display leading-none"
                        style={{
                          fontSize: 56,
                          color: NORDIC.ink,
                          fontWeight: 300,
                        }}
                      >
                        {String(people).padStart(2, '0')}
                      </span>
                      <QuietLabel color={NORDIC.stoneSoft}>
                        Pax  ·  上限 {tour.groupSize.max} 人
                      </QuietLabel>
                    </div>
                    <div className="flex items-center gap-3">
                      <StepperBtn
                        onClick={() => setPeople(Math.max(1, people - 1))}
                        disabled={people <= 1}
                        ariaLabel="減少人數"
                      >
                        <Minus size={14} strokeWidth={1.2} />
                      </StepperBtn>
                      <StepperBtn
                        onClick={() =>
                          setPeople(Math.min(tour.groupSize.max, people + 1))
                        }
                        disabled={people >= tour.groupSize.max}
                        ariaLabel="增加人數"
                      >
                        <Plus size={14} strokeWidth={1.2} />
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
                    placeholder="飲食限制、行動需求、慶生紀念日…"
                    className="w-full mt-6 pt-4 pb-4 text-[15px] resize-none outline-none transition-colors bg-transparent"
                    style={{
                      borderBottom: `1px solid ${NORDIC.line}`,
                      color: NORDIC.ink,
                    }}
                  />
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-8">
              <NordicButton
                size="lg"
                type="submit"
                className="w-full sm:w-auto"
              >
                確認報名
              </NordicButton>
              <p
                className="mt-10 text-[12px] leading-[2.1]"
                style={{ color: NORDIC.stone }}
              >
                送出後 24 小時內、專人會以電話或 email 聯絡確認名額。
                <br />
                正式定位需於 3 個工作日內完成 30% 訂金支付。
              </p>
            </div>
          </form>

          {/* ─────────────── Summary（confirmation card 風）─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <QuietLabel>Booking Summary</QuietLabel>

              {/* 縮圖 */}
              <div className="relative aspect-[16/10] mt-8 mb-8 overflow-hidden">
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  style={{ filter: 'grayscale(0.08) brightness(0.97)' }}
                />
              </div>

              <div className="flex items-baseline justify-between mb-4">
                <QuietLabel>{CATEGORY_LABEL[tour.category]}</QuietLabel>
                <QuietLabel color={NORDIC.stoneSoft}>
                  {tour.destination}
                </QuietLabel>
              </div>

              <LightTitle
                as="h3"
                className="text-2xl md:text-[28px] mb-4"
                style={{ lineHeight: 1.25 }}
              >
                {tour.title}
              </LightTitle>

              <p
                className="text-[13px] leading-[1.95] mb-10"
                style={{ color: NORDIC.inkSoft }}
              >
                {tour.subtitle}
              </p>

              <HairLine />

              {/* Summary rows */}
              <div className="py-8">
                <SummaryRow label="Departure" value={formatDate(date)} />
                <SummaryRow label="Duration" value={tour.duration} />
                <SummaryRow label="Travelers" value={`${people} pax`} />
              </div>

              <HairLine />

              {/* Price calc */}
              <div className="pt-8">
                <div className="flex items-baseline justify-between mb-4">
                  <QuietLabel color={NORDIC.inkFaint}>Per Person</QuietLabel>
                  <span
                    className="font-mono text-[15px] tracking-wider"
                    style={{ color: NORDIC.ink, fontWeight: 300 }}
                  >
                    {formatPrice(tour.priceFrom)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <QuietLabel color={NORDIC.inkFaint}>
                    × {String(people).padStart(2, '0')}
                  </QuietLabel>
                  <span
                    className="font-mono text-[11px] tracking-wider"
                    style={{ color: NORDIC.stoneSoft }}
                  >
                    {people} 位旅客
                  </span>
                </div>
              </div>

              <div
                className="mt-10 pt-8 flex items-baseline justify-between"
                style={{ borderTop: `1px solid ${NORDIC.charcoal}` }}
              >
                <div>
                  <QuietLabel color={NORDIC.inkFaint}>Subtotal</QuietLabel>
                  <span
                    className="font-display text-[13px] block mt-2"
                    style={{ color: NORDIC.inkSoft, fontWeight: 400 }}
                  >
                    預估小計
                  </span>
                </div>
                <span
                  className="font-mono text-3xl tracking-wider"
                  style={{ color: NORDIC.charcoal, fontWeight: 300 }}
                >
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p
                className="mt-8 text-[12px] leading-[2.05]"
                style={{ color: NORDIC.stoneSoft }}
              >
                上述為預估金額、不含個人消費與選配活動。
                最終價格依出發日匯率與選配項目調整。
              </p>
            </div>
          </aside>
        </div>
      </div>

      <CornerFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Section head — Reservation Form Section 01 hotel 風
// ─────────────────────────────────────────────────────

function SectionHead({
  n,
  en,
  zh,
}: {
  n: string;
  en: string;
  zh: string;
}) {
  return (
    <div
      className="flex items-baseline gap-6 pb-3"
      style={{ borderBottom: `1px solid ${NORDIC.line}` }}
    >
      <span
        className="font-mono text-[11px] tracking-[0.25em]"
        style={{ color: NORDIC.stone }}
      >
        {n}
      </span>
      <span
        aria-hidden
        className="block w-8 h-px"
        style={{ background: NORDIC.line }}
      />
      <QuietLabel>{en}</QuietLabel>
      <LightTitle as="h2" className="text-2xl md:text-[28px] ml-auto">
        {zh}
      </LightTitle>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Field label
// ─────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="font-display text-[10px] tracking-[0.35em] uppercase block"
      style={{ color: NORDIC.inkFaint, fontWeight: 400 }}
    >
      {children}
    </label>
  );
}

// ─────────────────────────────────────────────────────
// Underline field（極簡 input：下劃線、無框、無底色）
// ─────────────────────────────────────────────────────

function UnderlineField({
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
        className="font-display text-[10px] tracking-[0.35em] uppercase flex items-center gap-3 mb-4"
        style={{ color: NORDIC.inkFaint, fontWeight: 400 }}
      >
        {label}
        {required && (
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: NORDIC.stone }}
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
        className="w-full pt-3 pb-4 text-[16px] outline-none transition-colors bg-transparent focus:border-b-[color:#1C1B19]"
        style={{
          borderBottom: `1px solid ${NORDIC.line}`,
          color: NORDIC.ink,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Stepper button — 極簡、細邊框
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
      className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30"
      style={{
        border: `1px solid ${NORDIC.line}`,
        background: 'transparent',
        color: NORDIC.ink,
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Summary row
// ─────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-baseline justify-between py-4"
      style={{ borderBottom: `1px solid ${NORDIC.lineSoft}` }}
    >
      <QuietLabel color={NORDIC.inkFaint}>{label}</QuietLabel>
      <span
        className="font-display text-[14px] text-right"
        style={{ color: NORDIC.ink, fontWeight: 400 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Success view — hotel reservation confirmation card 風
// 大留白、細線打勾框、confirmation 小卡
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
    <div style={{ background: NORDIC.paper, color: NORDIC.ink }}>
      <section className="min-h-[88vh] flex items-center px-10 md:px-20 py-32">
        <div className="mx-auto max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: NORDIC_EASE_LONG }}
            className="mx-auto w-20 h-20 flex items-center justify-center"
            style={{
              border: `1px solid ${NORDIC.stone}`,
              color: NORDIC.stone,
            }}
          >
            <Check size={26} strokeWidth={1.2} />
          </motion.div>

          <div className="mt-16">
            <CaptionLabel align="center">Reservation Received</CaptionLabel>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: NORDIC_EASE_LONG }}
            className="font-display mt-12 text-[40px] md:text-[60px]"
            style={{ color: NORDIC.charcoal, fontWeight: 300, lineHeight: 1.2 }}
          >
            報名已送出
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="mt-12 max-w-md mx-auto text-[15px] md:text-[17px] leading-[2.1]"
            style={{ color: NORDIC.inkSoft }}
          >
            {name && <>{name}、</>}謝謝你選擇角落旅行社。
            <br />
            我們已收到你的報名資料、專人會在 24 小時內聯絡確認名額。
          </motion.p>

          {/* Confirmation card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: NORDIC_EASE }}
            className="mt-20 max-w-md mx-auto text-left"
            style={{
              borderTop: `1px solid ${NORDIC.line}`,
              borderBottom: `1px solid ${NORDIC.line}`,
              padding: '32px 0',
            }}
          >
            <div className="flex items-baseline justify-between mb-6">
              <QuietLabel>Your Booking</QuietLabel>
              <span
                className="font-mono text-[11px] tracking-[0.25em]"
                style={{ color: NORDIC.stone }}
              >
                N° 0001
              </span>
            </div>
            <LightTitle as="h3" className="text-xl mb-8" style={{ lineHeight: 1.3 }}>
              {tour.title}
            </LightTitle>
            <div className="space-y-3">
              <SummaryRow label="Departure" value={formatDate(date)} />
              <SummaryRow label="Travelers" value={`${people} pax`} />
              <SummaryRow
                label="Estimate"
                value={formatPrice(tour.priceFrom * people)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.7 }}
            className="mt-16"
          >
            <NordicButton variant="outline" onClick={onBack}>
              回到首頁
            </NordicButton>
          </motion.div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}
