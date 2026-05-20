'use client';

/**
 * Signup — 雜誌「Subscribe」訂閱表單風報名頁
 *
 * 結構：
 *   1. Masthead bar
 *   2. Article header（SUBSCRIBE 大標 + tagline）
 *   3. 左：表單區（Personal / Travel / Notes 三段）
 *   4. 右 sticky：訂單摘要（像雜誌訂閱卡）
 *   5. 提交後 success state（像「訂閱確認」卡片）
 *
 * 跟前 4 個 demo 對比：
 *   - 別人是「報名表」、這是「訂閱季刊」隱喻
 *   - 表單欄位上方用 01. CONTACT / 02. TRAVEL / 03. NOTES 標號
 *   - submit 按鈕寫 SUBSCRIBE 而非 SUBMIT
 *   - success 卡寫 ISSUE 02 SUBSCRIBED 而非「報名成功」
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Check } from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  NYC,
  IssueMark,
  EditorialKicker,
  MagazineHeadline,
  EditorialButton,
  SerialNumber,
  Rule,
  Grain,
  bwImageStyle,
  EditorialFooter,
  CATEGORY_LABEL_EN,
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
    <div style={{ background: NYC.paper, color: NYC.ink }}>
      {/* ─────────────── Masthead Bar ─────────────── */}
      <header
        className="px-6 md:px-12 py-4"
        style={{
          borderBottom: `1px solid ${NYC.ink}`,
          background: NYC.paper,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-baseline gap-3 transition-colors hover:text-[#C4A678]"
            style={{ color: NYC.ink }}
          >
            <span aria-hidden className="text-base">←</span>
            <span
              className="font-display text-xl md:text-2xl"
              style={{ fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              CORNER
            </span>
            <span
              className="hidden md:inline font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ color: NYC.graySoft, fontWeight: 600 }}
            >
              BACK
            </span>
          </button>
          <IssueMark className="hidden md:inline-flex" />
        </div>
      </header>

      {/* ─────────────── Article Header ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-20 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <EditorialKicker label="SUBSCRIBE TO ISSUE 02" />
              <MagazineHeadline size="2xl" className="mt-6" as="h1">
                訂閱
                <br />
                <span style={{ color: NYC.camel }}>這趟旅行。</span>
              </MagazineHeadline>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <p
                className="font-body text-base leading-[1.85]"
                style={{ color: NYC.graySoft }}
              >
                填好以下三段、按 SUBSCRIBE。
                <br />
                <span style={{ color: NYC.ink, fontWeight: 500 }}>
                  24 小時內專人聯絡確認名額與付款細節。
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Rule color={NYC.ink} weight={2} />

      {/* ─────────────── Form + Summary ─────────────── */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* ─────────────── Form ─────────────── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-12"
          >
            {/* 01. Contact */}
            <fieldset>
              <SectionHeader index="01" label="CONTACT" title="聯絡資料" />
              <div className="mt-8 space-y-5">
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

            {/* 02. Travel */}
            <fieldset>
              <SectionHeader index="02" label="TRAVEL" title="行程設定" />
              <div className="mt-8 space-y-6">
                {/* Date */}
                <div>
                  <FieldLabel>出發日</FieldLabel>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tour.departureDates.map((d, i) => {
                      const active = d === date;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => onSelectDate(d)}
                          className="text-left p-4 transition-all relative"
                          style={{
                            background: active ? NYC.ink : NYC.paper,
                            color: active ? NYC.paper : NYC.ink,
                            border: `1px solid ${NYC.ink}`,
                          }}
                        >
                          <span
                            className="absolute top-0 right-0 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.18em] uppercase"
                            style={{
                              background: active ? NYC.camel : NYC.ink,
                              color: active ? NYC.ink : NYC.camel,
                              fontWeight: 700,
                            }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p
                            className="font-mono text-[10px] tracking-[0.22em] uppercase mb-2"
                            style={{
                              color: active ? NYC.camel : NYC.graySoft,
                              fontWeight: 600,
                            }}
                          >
                            {d.slice(0, 4)}
                          </p>
                          <p
                            className="font-display text-base leading-tight"
                            style={{ fontWeight: 600 }}
                          >
                            {formatDate(d)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* People stepper */}
                <div>
                  <FieldLabel>報名人數</FieldLabel>
                  <div
                    className="mt-3 flex items-center justify-between p-4"
                    style={{
                      background: NYC.paper,
                      border: `1px solid ${NYC.ink}`,
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-display text-3xl"
                        style={{ color: NYC.ink, fontWeight: 700 }}
                      >
                        {String(people).padStart(2, '0')}
                      </span>
                      <span
                        className="font-mono text-[10px] tracking-[0.22em] uppercase"
                        style={{ color: NYC.graySoft, fontWeight: 600 }}
                      >
                        GUEST{people > 1 ? 'S' : ''} · MAX {tour.groupSize.max}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StepperBtn
                        onClick={() => setPeople(Math.max(1, people - 1))}
                        disabled={people <= 1}
                        ariaLabel="減少人數"
                      >
                        <Minus size={14} strokeWidth={2} />
                      </StepperBtn>
                      <StepperBtn
                        onClick={() =>
                          setPeople(Math.min(tour.groupSize.max, people + 1))
                        }
                        disabled={people >= tour.groupSize.max}
                        ariaLabel="增加人數"
                      >
                        <Plus size={14} strokeWidth={2} />
                      </StepperBtn>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* 03. Notes */}
            <fieldset>
              <SectionHeader index="03" label="NOTES" title="特殊需求" />
              <div className="mt-8">
                <FieldLabel optional>備註（選填）</FieldLabel>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="飲食限制、行動需求、慶生紀念日…"
                  className="mt-3 w-full px-4 py-3 font-body text-base resize-none outline-none transition-colors focus:bg-[#FAFAF7]"
                  style={{
                    background: NYC.paper,
                    border: `1px solid ${NYC.ink}`,
                    color: NYC.ink,
                  }}
                />
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-4">
              <Rule color={NYC.ink} weight={2} className="mb-8" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <p
                  className="font-mono text-[10px] tracking-[0.22em] uppercase max-w-md"
                  style={{ color: NYC.graySoft, fontWeight: 600 }}
                >
                  送出後 24 小時內專人聯絡確認名額
                  <br />
                  正式定位需 3 個工作日內完成 30% 訂金
                </p>
                <EditorialButton size="lg" type="submit">
                  Subscribe — Reserve
                </EditorialButton>
              </div>
            </div>
          </form>

          {/* ─────────────── Summary（雜誌訂閱卡風） ─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-8">
              <p
                className="font-mono text-[10px] tracking-[0.28em] uppercase mb-4"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                YOUR SUBSCRIPTION
              </p>

              <div
                className="relative"
                style={{
                  background: NYC.paper,
                  border: `2px solid ${NYC.ink}`,
                }}
              >
                {/* 訂閱卡頂端 — issue mark */}
                <div
                  className="px-5 py-3 flex items-baseline justify-between"
                  style={{
                    background: NYC.ink,
                    color: NYC.paper,
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: NYC.camel, fontWeight: 700 }}
                  >
                    ISSUE 02 · {CATEGORY_LABEL_EN[tour.category]}
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    NO. {String(tour.itinerary.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Hero image */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                    style={bwImageStyle(false)}
                  />
                  <span
                    className="absolute bottom-3 left-3 inline-block px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{
                      background: NYC.paper,
                      color: NYC.ink,
                      fontWeight: 700,
                    }}
                  >
                    {tour.destination}
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <MagazineHeadline size="md" as="h2">
                    {tour.title}
                  </MagazineHeadline>
                  <p
                    className="mt-4 font-body text-sm leading-[1.7]"
                    style={{ color: NYC.graySoft }}
                  >
                    {tour.subtitle}
                  </p>

                  <Rule color={NYC.ink} className="mt-6" />

                  {/* Summary rows */}
                  <div className="py-5 space-y-2"
                    style={{ background: NYC.paperWarm, padding: '20px', margin: '0 -32px' }}
                  >
                    <SummaryRow
                      label="DEPARTURE"
                      value={formatDate(date)}
                    />
                    <SummaryRow
                      label="DURATION"
                      value={tour.duration}
                    />
                    <SummaryRow
                      label="GUESTS"
                      value={`${people} pax`}
                    />
                  </div>

                  <Rule color={NYC.ink} />

                  {/* Price calc */}
                  <div className="pt-6 space-y-2">
                    <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.18em] uppercase">
                      <span style={{ color: NYC.graySoft }}>UNIT</span>
                      <span style={{ color: NYC.ink }}>
                        {formatPrice(tour.priceFrom)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.18em] uppercase">
                      <span style={{ color: NYC.graySoft }}>× {people} GUESTS</span>
                      <span style={{ color: NYC.grayFaint }}>
                        SUBTOTAL
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-5 pt-5 flex items-baseline justify-between"
                    style={{ borderTop: `2px solid ${NYC.ink}` }}
                  >
                    <div>
                      <p
                        className="font-mono text-[10px] tracking-[0.22em] uppercase mb-1"
                        style={{ color: NYC.camel, fontWeight: 700 }}
                      >
                        Total Est.
                      </p>
                      <p
                        className="font-mono text-[10px] tracking-[0.22em] uppercase"
                        style={{ color: NYC.grayFaint }}
                      >
                        before final adj.
                      </p>
                    </div>
                    <SerialNumber
                      n={formatPrice(subtotal).replace('NT$ ', '')}
                      style={{ fontSize: 32 }}
                    />
                  </div>
                </div>
              </div>

              <p
                className="mt-5 font-mono text-[10px] tracking-[0.18em] uppercase leading-[1.8]"
                style={{ color: NYC.grayFaint }}
              >
                ESTIMATE ONLY · 不含個人消費與選配活動
                <br />
                最終價格依出發日匯率與選配項目調整
              </p>
            </div>
          </aside>
        </div>
      </div>

      <EditorialFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SectionHeader — 表單區塊標題（01. CONTACT）
// ─────────────────────────────────────────────────────

function SectionHeader({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div
      className="grid grid-cols-[60px_1fr] gap-4 items-baseline pb-3"
      style={{ borderBottom: `2px solid ${NYC.ink}` }}
    >
      <span
        className="font-display text-3xl"
        style={{ color: NYC.camel, fontWeight: 700 }}
      >
        {index}
      </span>
      <div className="flex items-baseline gap-4 flex-wrap">
        <span
          className="font-mono text-[10px] tracking-[0.28em] uppercase"
          style={{ color: NYC.ink, fontWeight: 700 }}
        >
          {label}
        </span>
        <span aria-hidden style={{ color: NYC.camel }}>·</span>
        <span
          className="font-display text-xl md:text-2xl"
          style={{ color: NYC.ink, fontWeight: 600 }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FieldLabel — 表單欄位 label
// ─────────────────────────────────────────────────────

function FieldLabel({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      className="flex items-baseline gap-2 font-mono text-[10px] tracking-[0.22em] uppercase"
      style={{ color: NYC.ink, fontWeight: 700 }}
    >
      {children}
      {optional && (
        <span style={{ color: NYC.grayFaint, fontWeight: 600 }}>
          — OPTIONAL
        </span>
      )}
    </label>
  );
}

// ─────────────────────────────────────────────────────
// Field — input 欄位
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
      <FieldLabel>
        {label}
        {required && (
          <span style={{ color: NYC.camel, fontWeight: 700 }}> · REQ.</span>
        )}
      </FieldLabel>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full px-4 h-12 font-body text-base outline-none transition-colors focus:bg-[#FAFAF7]"
        style={{
          background: NYC.paper,
          border: `1px solid ${NYC.ink}`,
          color: NYC.ink,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// StepperBtn — +/- 步進按鈕（方角、銳利）
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
        border: `1px solid ${NYC.ink}`,
        background: NYC.paper,
        color: NYC.ink,
      }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// SummaryRow — 訂閱卡的 fact row
// ─────────────────────────────────────────────────────

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span
        className="font-mono text-[10px] tracking-[0.22em] uppercase"
        style={{ color: NYC.gray, fontWeight: 700 }}
      >
        {label}
      </span>
      <span
        className="font-body text-sm text-right"
        style={{ color: NYC.ink, fontWeight: 500 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// SuccessView — 「ISSUE 02 SUBSCRIBED」
// 雜誌訂閱確認卡風格
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
    <div style={{ background: NYC.paper, color: NYC.ink }}>
      {/* Masthead */}
      <header
        className="px-6 md:px-12 py-4"
        style={{
          borderBottom: `1px solid ${NYC.ink}`,
        }}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <span
            className="font-display text-xl md:text-2xl"
            style={{
              color: NYC.ink,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            CORNER
          </span>
          <IssueMark className="hidden md:inline-flex" />
        </div>
      </header>

      <section
        className="relative px-6 md:px-12 py-24 md:py-32"
        style={{ background: NYC.ink, color: NYC.paper }}
      >
        <Grain opacity={0.06} />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.8, 0.3, 1] }}
            className="inline-flex items-center justify-center w-16 h-16"
            style={{
              border: `2px solid ${NYC.camel}`,
              color: NYC.camel,
            }}
          >
            <Check size={28} strokeWidth={2} />
          </motion.div>

          <EditorialKicker
            label="SUBSCRIPTION CONFIRMED"
            align="center"
            className="mt-10"
            invert
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8"
          >
            <h1
              className="font-display leading-[0.98]"
              style={{
                color: NYC.paper,
                fontWeight: 700,
                fontSize: 'clamp(40px, 6vw, 84px)',
                letterSpacing: '-0.025em',
              }}
            >
              ISSUE 02
              <br />
              <span style={{ color: NYC.camel }}>SUBSCRIBED.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 font-body text-base md:text-lg leading-[1.85] max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {name && (
              <>
                <span style={{ color: NYC.camel, fontWeight: 500 }}>
                  {name}
                </span>
                ，
              </>
            )}
            謝謝你訂閱角落旅行社春季號。
            <br />
            我們已收到報名資料、專人 24 小時內聯絡確認名額。
          </motion.p>
        </div>
      </section>

      {/* 訂閱卡 */}
      <section className="px-6 md:px-12 py-20">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="relative"
            style={{
              background: NYC.paper,
              border: `2px solid ${NYC.ink}`,
            }}
          >
            <div
              className="px-6 py-4 flex items-baseline justify-between"
              style={{ background: NYC.ink, color: NYC.paper }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.28em] uppercase"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                YOUR BOOKING
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                CONFIRMATION #CT-{Math.floor(Math.random() * 9000 + 1000)}
              </span>
            </div>

            <div className="p-8">
              <MagazineHeadline size="md" as="h2">
                {tour.title}
              </MagazineHeadline>
              <p
                className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ color: NYC.camel, fontWeight: 700 }}
              >
                {tour.destination} · {tour.duration}
              </p>

              <Rule color={NYC.ink} className="mt-6 mb-5" />

              <div className="space-y-3">
                <SummaryRow label="DEPARTURE" value={formatDate(date)} />
                <SummaryRow label="GUESTS" value={`${people} pax`} />
                <SummaryRow
                  label="EST. TOTAL"
                  value={formatPrice(tour.priceFrom * people)}
                />
              </div>

              <p
                className="mt-8 font-body text-sm leading-[1.85]"
                style={{ color: NYC.graySoft }}
              >
                我們的編輯與領隊團隊已收到通知。專人將在 24 小時內以電話或 email 跟你確認名額與付款細節。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex justify-center"
          >
            <EditorialButton variant="outline" onClick={onBack}>
              Back to Issue 02
            </EditorialButton>
          </motion.div>
        </div>
      </section>

      <EditorialFooter />
    </div>
  );
}
