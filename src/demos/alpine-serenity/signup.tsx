'use client';

/**
 * Signup — 報名頁（阿爾卑斯靜謐）
 *
 * 跟 mediterranean signup 對比：
 *   1. Header 改為座標感 — N 01 / Personal、N 02 / Travel
 *   2. Field input 改為「下劃線」型、不是 box（更銳利、更冷）
 *   3. People stepper 改為極簡、無 box 框
 *   4. Date 改為 list 型（跟 detail 一樣）、不是膠囊 grid
 *   5. Summary 改為純線條表格、不是 image card box
 *   6. Success 改為大留白、線條打勾、座標小卡
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
  ALPINE,
  PeakLabel,
  AlpineButton,
  HairLine,
  CATEGORY_LABEL,
  SerifTitle,
} from './shared';
import { CornerFooter } from './home';

type Props = {
  tour: Tour;
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onBack: () => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

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
    <div style={{ background: ALPINE.snow, color: ALPINE.ink }}>
      {/* Header */}
      <section className="px-10 md:px-20 pt-24 md:pt-32 pb-16">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-4 font-display text-[10px] tracking-[0.45em] uppercase transition-opacity hover:opacity-70 mb-16"
            style={{ color: ALPINE.stone, fontWeight: 400 }}
          >
            <ArrowLeft size={13} strokeWidth={1.2} />
            返回行程
          </button>

          <PeakLabel>Reservation</PeakLabel>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
            <div className="md:col-span-7">
              <SerifTitle
                as="h1"
                className="text-[44px] md:text-[72px] leading-[1.05]"
              >
                報名出發
              </SerifTitle>
            </div>
            <div className="md:col-span-5 md:pb-4">
              <div
                className="h-px w-12 mb-8"
                style={{ background: ALPINE.stone }}
              />
              <p
                className="text-[15px] leading-[2.05]"
                style={{ color: ALPINE.inkSoft }}
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
                  <label
                    className="font-display text-[10px] tracking-[0.5em] uppercase block mb-6"
                    style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                  >
                    出發日
                  </label>
                  <div>
                    {tour.departureDates.map((d, i) => {
                      const active = d === date;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => onSelectDate(d)}
                          className="w-full text-left py-5 grid grid-cols-[40px_1fr_auto] gap-6 items-center transition-colors"
                          style={{
                            borderTop: `1px solid ${ALPINE.line}`,
                            borderBottom:
                              i === tour.departureDates.length - 1
                                ? `1px solid ${ALPINE.line}`
                                : 'none',
                            background: active ? ALPINE.snowDeep : 'transparent',
                          }}
                        >
                          <span
                            className="font-mono text-[11px] tracking-[0.3em]"
                            style={{
                              color: active ? ALPINE.night : ALPINE.stone,
                            }}
                          >
                            N{String(i + 1).padStart(2, '0')}
                          </span>
                          <SerifTitle
                            as="h4"
                            className="text-base md:text-[18px]"
                            color={active ? ALPINE.night : ALPINE.ink}
                          >
                            {formatDate(d)}
                          </SerifTitle>
                          <span
                            className="font-display text-[10px] tracking-[0.45em] uppercase"
                            style={{
                              color: active ? ALPINE.night : ALPINE.inkFaint,
                              fontWeight: 400,
                            }}
                          >
                            {active ? '已選' : '選擇'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* People stepper — 極簡 */}
                <div>
                  <label
                    className="font-display text-[10px] tracking-[0.5em] uppercase block mb-6"
                    style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                  >
                    報名人數
                  </label>
                  <div
                    className="flex items-center justify-between py-6"
                    style={{
                      borderTop: `1px solid ${ALPINE.line}`,
                      borderBottom: `1px solid ${ALPINE.line}`,
                    }}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-display leading-none"
                        style={{
                          fontSize: 56,
                          color: ALPINE.ink,
                          fontWeight: 300,
                        }}
                      >
                        {String(people).padStart(2, '0')}
                      </span>
                      <span
                        className="font-display text-[11px] tracking-[0.45em] uppercase"
                        style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                      >
                        Pax  ·  上限 {tour.groupSize.max} 人
                      </span>
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
                  <label
                    className="font-display text-[10px] tracking-[0.5em] uppercase block mb-6"
                    style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                  >
                    特殊需求（選填）
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="飲食限制、行動需求、慶生紀念日…"
                    className="w-full pt-4 pb-4 text-[15px] resize-none outline-none transition-colors bg-transparent"
                    style={{
                      borderBottom: `1px solid ${ALPINE.line}`,
                      color: ALPINE.ink,
                    }}
                  />
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-8">
              <AlpineButton
                size="lg"
                type="submit"
                className="w-full sm:w-auto"
              >
                確認報名
              </AlpineButton>
              <p
                className="mt-10 text-[12px] leading-[2.1]"
                style={{ color: ALPINE.inkFaint }}
              >
                送出後 24 小時內、專人會以電話或 email 聯絡確認名額。
                <br />
                正式定位需於 3 個工作日內完成 30% 訂金支付。
              </p>
            </div>
          </form>

          {/* ─────────────── Summary（純線條、無 box 框）─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <span
                className="font-display text-[10px] tracking-[0.5em] uppercase block mb-10"
                style={{ color: ALPINE.stone, fontWeight: 400 }}
              >
                Booking Summary
              </span>

              {/* 縮圖（不放分類膠囊、純圖）*/}
              <div className="relative aspect-[16/10] mb-10 overflow-hidden">
                <Image
                  src={tour.heroImage}
                  alt={tour.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  style={{ filter: 'grayscale(0.2) brightness(0.94)' }}
                />
                <div
                  aria-hidden
                  className="absolute inset-3 pointer-events-none"
                  style={{ border: `1px solid rgba(248,249,251,0.4)` }}
                />
              </div>

              <span
                className="font-display text-[10px] tracking-[0.4em] uppercase block mb-3"
                style={{ color: ALPINE.stone, fontWeight: 400 }}
              >
                {tour.destination}  ·  {CATEGORY_LABEL[tour.category]}
              </span>

              <SerifTitle
                as="h3"
                className="text-2xl md:text-[28px] mb-4 leading-snug"
              >
                {tour.title}
              </SerifTitle>

              <p
                className="text-[13px] leading-[1.95] mb-10"
                style={{ color: ALPINE.inkSoft }}
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
                  <span
                    className="font-display text-[10px] tracking-[0.45em] uppercase"
                    style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                  >
                    Per Person
                  </span>
                  <span
                    className="font-mono text-[15px] tracking-wider"
                    style={{ color: ALPINE.ink, fontWeight: 300 }}
                  >
                    {formatPrice(tour.priceFrom)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-display text-[10px] tracking-[0.45em] uppercase"
                    style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                  >
                    × {String(people).padStart(2, '0')}
                  </span>
                  <span
                    className="font-mono text-[11px] tracking-wider"
                    style={{ color: ALPINE.inkFaint }}
                  >
                    {people} 位旅客
                  </span>
                </div>
              </div>

              <div
                className="mt-10 pt-8 flex items-baseline justify-between"
                style={{ borderTop: `1px solid ${ALPINE.night}` }}
              >
                <div>
                  <span
                    className="font-display text-[10px] tracking-[0.45em] uppercase block mb-2"
                    style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
                  >
                    Subtotal
                  </span>
                  <span
                    className="font-display text-[13px]"
                    style={{ color: ALPINE.inkSoft, fontWeight: 400 }}
                  >
                    預估小計
                  </span>
                </div>
                <span
                  className="font-mono text-3xl tracking-wider"
                  style={{ color: ALPINE.night, fontWeight: 300 }}
                >
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p
                className="mt-8 text-[12px] leading-[2.05]"
                style={{ color: ALPINE.inkFaint }}
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
// Section head — 「N 01  ─  Contact  ─  聯絡資料」
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
    <div className="flex items-baseline gap-6 pb-2"
      style={{ borderBottom: `1px solid ${ALPINE.line}` }}
    >
      <span
        className="font-mono text-[11px] tracking-[0.3em]"
        style={{ color: ALPINE.stone }}
      >
        N {n}
      </span>
      <span
        aria-hidden
        className="block w-8 h-px"
        style={{ background: ALPINE.line }}
      />
      <span
        className="font-display text-[11px] tracking-[0.5em] uppercase"
        style={{ color: ALPINE.stone, fontWeight: 400 }}
      >
        {en}
      </span>
      <SerifTitle as="h2" className="text-2xl md:text-[28px] ml-auto">
        {zh}
      </SerifTitle>
    </div>
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
        className="font-display text-[10px] tracking-[0.5em] uppercase flex items-center gap-3 mb-4"
        style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
      >
        {label}
        {required && (
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: ALPINE.stone }}
          >
            ·  必填
          </span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pt-3 pb-4 text-[16px] outline-none transition-colors bg-transparent focus:border-b-[color:var(--alpine-night,#1A2433)]"
        style={{
          borderBottom: `1px solid ${ALPINE.line}`,
          color: ALPINE.ink,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Stepper button — 極簡、無 box
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
        border: `1px solid ${ALPINE.line}`,
        background: 'transparent',
        color: ALPINE.ink,
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
    <div className="flex items-baseline justify-between py-4"
      style={{ borderBottom: `1px solid ${ALPINE.lineSoft}` }}
    >
      <span
        className="font-display text-[10px] tracking-[0.45em] uppercase"
        style={{ color: ALPINE.inkFaint, fontWeight: 400 }}
      >
        {label}
      </span>
      <span
        className="font-display text-[14px] text-right"
        style={{ color: ALPINE.ink, fontWeight: 400 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Success view — 大留白、線條方框打勾、座標小卡
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
    <div style={{ background: ALPINE.snow, color: ALPINE.ink }}>
      <section className="min-h-[88vh] flex items-center px-10 md:px-20 py-32">
        <div className="mx-auto max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-20 h-20 flex items-center justify-center"
            style={{
              border: `1px solid ${ALPINE.stone}`,
              color: ALPINE.stone,
            }}
          >
            <Check size={26} strokeWidth={1.2} />
          </motion.div>

          <div className="mt-16">
            <PeakLabel align="center">Reservation Received</PeakLabel>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-12 leading-[1.2] text-[40px] md:text-[60px]"
            style={{ color: ALPINE.night, fontWeight: 300 }}
          >
            報名已送出
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="mt-12 max-w-md mx-auto text-[15px] md:text-[17px] leading-[2.1]"
            style={{ color: ALPINE.inkSoft }}
          >
            {name && <>{name}、</>}謝謝你選擇角落旅行社。
            <br />
            我們已收到你的報名資料、專人會在 24 小時內聯絡確認名額。
          </motion.p>

          {/* Booking 座標小卡 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="mt-20 max-w-md mx-auto text-left"
            style={{
              borderTop: `1px solid ${ALPINE.line}`,
              borderBottom: `1px solid ${ALPINE.line}`,
              padding: '32px 0',
            }}
          >
            <span
              className="font-display text-[10px] tracking-[0.5em] uppercase block mb-6"
              style={{ color: ALPINE.stone, fontWeight: 400 }}
            >
              Your Booking  ·  N 001
            </span>
            <SerifTitle as="h3" className="text-xl mb-8 leading-snug">
              {tour.title}
            </SerifTitle>
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
            <AlpineButton variant="outline" onClick={onBack}>
              回到首頁
            </AlpineButton>
          </motion.div>
        </div>
      </section>

      <CornerFooter />
    </div>
  );
}
