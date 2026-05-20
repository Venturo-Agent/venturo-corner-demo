'use client';

/**
 * Signup — 報名頁
 *
 * 結構：
 *   - Topbar
 *   - Header
 *   - 主區：左 form / 右 sticky 摘要
 *   - 送出後 → Success state
 *   - Footer
 *
 * 跟 mediterranean signup 的差異：
 *   - input 輸入框邊框細、無 background tint、無 focus 大色塊
 *   - stepper 用方角細邊、不用大圓
 *   - 摘要 card 不用大色塊、純細線分隔
 *   - success 用一條垂直細線「✓」表示、不用打圓的 checkmark icon
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  MUJI,
  IndexLabel,
  SectionTitle,
  MujiButton,
  Hair,
  BRAND,
  CATEGORY_LABEL,
} from './shared';
import { MujiFooter } from './home';

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
    <div style={{ background: MUJI.paper, color: MUJI.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="px-6 md:px-12 py-6"
        style={{ borderBottom: `1px solid ${MUJI.line}` }}
      >
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{ color: MUJI.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span
              className="font-body text-xs"
              style={{ letterSpacing: '0.06em' }}
            >
              返回行程
            </span>
          </button>
          <span
            className="font-mono text-xs"
            style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
          >
            {BRAND.marque} / Reservation
          </span>
        </div>
      </header>

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-20 pb-12">
        <div className="mx-auto max-w-6xl">
          <IndexLabel index="012">Reservation</IndexLabel>
          <SectionTitle level={1} className="mt-6">
            報名出發
          </SectionTitle>
          <p
            className="mt-8 max-w-xl font-body text-sm md:text-base leading-[2]"
            style={{ color: MUJI.inkMid }}
          >
            填寫以下資料、我們會在 24 小時內專人聯絡確認名額與付款細節。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-12 pb-24 md:pb-32">
        <Hair />

        <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* ─────────────── Form ─────────────── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7"
          >
            {/* ── Section 01: Contact ── */}
            <Section index="01" title="聯絡資料">
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
            </Section>

            {/* ── Section 02: Travel ── */}
            <Section index="02" title="行程設定">
              <FieldBlock label="出發日">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                  {tour.departureDates.map((d) => {
                    const active = d === date;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => onSelectDate(d)}
                        className="px-4 py-3 text-left transition-colors"
                        style={{
                          background: active ? MUJI.ink : MUJI.paperSoft,
                          color: active ? MUJI.paper : MUJI.ink,
                          border: `1px solid ${active ? MUJI.ink : MUJI.line}`,
                        }}
                      >
                        <span
                          className="font-mono text-[10px] block mb-1"
                          style={{
                            color: active ? MUJI.linen : MUJI.woodSoft,
                            letterSpacing: '0.05em',
                          }}
                        >
                          {d.slice(0, 4)}
                        </span>
                        <span
                          className="font-body text-sm leading-tight"
                          style={{
                            color: active ? MUJI.paper : MUJI.ink,
                          }}
                        >
                          {formatDate(d)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </FieldBlock>

              {/* People stepper */}
              <FieldBlock label="報名人數">
                <div
                  className="mt-3 flex items-center justify-between px-5 py-4"
                  style={{
                    background: MUJI.paperSoft,
                    border: `1px solid ${MUJI.line}`,
                  }}
                >
                  <span
                    className="font-body text-sm"
                    style={{ color: MUJI.inkMid }}
                  >
                    共
                    <span
                      className="font-display text-xl mx-3"
                      style={{ color: MUJI.ink, fontWeight: 500 }}
                    >
                      {people}
                    </span>
                    人 / 上限 {tour.groupSize.max} 人
                  </span>
                  <div className="flex items-center gap-2">
                    <StepperBtn
                      onClick={() => setPeople(Math.max(1, people - 1))}
                      disabled={people <= 1}
                      ariaLabel="減少人數"
                      symbol="−"
                    />
                    <StepperBtn
                      onClick={() =>
                        setPeople(Math.min(tour.groupSize.max, people + 1))
                      }
                      disabled={people >= tour.groupSize.max}
                      ariaLabel="增加人數"
                      symbol="+"
                    />
                  </div>
                </div>
              </FieldBlock>

              <FieldBlock label="特殊需求（選填）">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="飲食限制、行動需求、慶生紀念日…"
                  className="mt-3 w-full px-4 py-3 font-body text-sm resize-none outline-none transition-colors focus:bg-white"
                  style={{
                    background: MUJI.paperSoft,
                    border: `1px solid ${MUJI.line}`,
                    color: MUJI.ink,
                  }}
                />
              </FieldBlock>
            </Section>

            {/* ── Submit ── */}
            <div className="pt-8" style={{ borderTop: `1px solid ${MUJI.line}` }}>
              <MujiButton size="lg" type="submit" className="w-full sm:w-auto">
                確認報名
              </MujiButton>
              <p
                className="mt-6 font-body text-xs leading-[1.95]"
                style={{ color: MUJI.inkFaint }}
              >
                送出後 24 小時內、專人會以電話或 email 聯絡確認名額。
                <br />
                正式定位需於 3 個工作日內完成 30% 訂金支付。
              </p>
            </div>
          </form>

          {/* ─────────────── Summary ─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-12">
              <IndexLabel index="013">Summary</IndexLabel>
              <SectionTitle level={3} className="mt-6 mb-8">
                訂單摘要
              </SectionTitle>

              <div
                className="overflow-hidden"
                style={{
                  background: MUJI.paperSoft,
                  border: `1px solid ${MUJI.line}`,
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
                </div>

                <div className="p-6 md:p-8">
                  <span
                    className="font-mono text-[10px] block mb-3"
                    style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
                  >
                    {CATEGORY_LABEL[tour.category]} · {tour.destination}
                  </span>
                  <h3
                    className="font-display text-lg leading-snug mb-2"
                    style={{ color: MUJI.ink, fontWeight: 500 }}
                  >
                    {tour.title}
                  </h3>
                  <p
                    className="font-body text-xs leading-[1.85] mb-6"
                    style={{ color: MUJI.inkMid }}
                  >
                    {tour.subtitle}
                  </p>

                  <Hair />

                  {/* Summary rows（規則網格） */}
                  <div className="py-2">
                    <SummaryRow label="出發日" value={formatDate(date)} />
                    <SummaryRow label="行程天數" value={tour.duration} />
                    <SummaryRow label="報名人數" value={`${people} 人`} />
                  </div>

                  <Hair color={MUJI.ink} />

                  {/* Price calculation */}
                  <div className="pt-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono text-xs"
                        style={{ color: MUJI.inkMid, letterSpacing: '0.05em' }}
                      >
                        單人團費
                      </span>
                      <span
                        className="font-display text-sm"
                        style={{ color: MUJI.ink, fontWeight: 500 }}
                      >
                        {formatPrice(tour.priceFrom)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono text-xs"
                        style={{ color: MUJI.inkMid, letterSpacing: '0.05em' }}
                      >
                        × {people} 位旅客
                      </span>
                      <span
                        className="font-mono text-xs"
                        style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
                      >
                        =
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-6 pt-5 flex items-baseline justify-between"
                    style={{ borderTop: `1px solid ${MUJI.ink}` }}
                  >
                    <div>
                      <span
                        className="font-mono text-[10px] block mb-1"
                        style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
                      >
                        Subtotal
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{ color: MUJI.ink }}
                      >
                        預估小計
                      </span>
                    </div>
                    <span
                      className="font-display text-2xl"
                      style={{ color: MUJI.ink, fontWeight: 500 }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p
                    className="mt-5 font-body text-xs leading-[1.85]"
                    style={{ color: MUJI.inkFaint }}
                  >
                    上述為預估金額、不含個人消費與選配活動。
                    <br />
                    最終價格依出發日匯率與選配項目調整。
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <MujiFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Section — 表單分區（編號 + 標題 + 細線分隔）
// ─────────────────────────────────────────────────────

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pb-10 mb-10" style={{ borderBottom: `1px solid ${MUJI.line}` }}>
      <div className="flex items-baseline gap-4 mb-8">
        <span
          className="font-mono text-xs"
          style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
        >
          {index}
        </span>
        <span
          className="font-display text-base"
          style={{ color: MUJI.ink, fontWeight: 500 }}
        >
          {title}
        </span>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Field — 單行文字輸入
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
        className="font-body text-xs block mb-3"
        style={{ color: MUJI.inkMid, letterSpacing: '0.05em' }}
      >
        {label}
        {required && (
          <span style={{ color: MUJI.wood }}> / 必填</span>
        )}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 h-12 font-body text-sm outline-none transition-colors focus:bg-white"
        style={{
          background: MUJI.paperSoft,
          border: `1px solid ${MUJI.line}`,
          color: MUJI.ink,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FieldBlock — 帶 label 的區塊容器（給 stepper / textarea / date grid 用）
// ─────────────────────────────────────────────────────

function FieldBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="font-body text-xs block"
        style={{ color: MUJI.inkMid, letterSpacing: '0.05em' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// StepperBtn — 純 +/- 文字、不用 lucide icon、避免 icon 大小不一
// ─────────────────────────────────────────────────────

function StepperBtn({
  onClick,
  disabled,
  ariaLabel,
  symbol,
}: {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  symbol: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className="w-9 h-9 flex items-center justify-center font-body text-base transition-all disabled:opacity-30"
      style={{
        background: 'white',
        border: `1px solid ${MUJI.ink}`,
        color: MUJI.ink,
      }}
    >
      {symbol}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// SummaryRow — 摘要列（key 左、value 右、細線分隔）
// ─────────────────────────────────────────────────────

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-baseline justify-between py-3"
      style={{ borderBottom: `1px solid ${MUJI.line}` }}
    >
      <span
        className="font-mono text-xs"
        style={{ color: MUJI.woodSoft, letterSpacing: '0.05em' }}
      >
        {label}
      </span>
      <span
        className="font-body text-sm"
        style={{ color: MUJI.ink }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Success state
// 無印感的成功頁：
//   - 沒有 confetti、沒有大綠色 checkmark
//   - 一條垂直細線 + 一個極小 「OK」 字、配大量留白
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
    <div style={{ background: MUJI.paper, color: MUJI.ink }}>
      <section className="min-h-[80vh] flex items-center px-6 md:px-12 py-24">
        <div className="mx-auto max-w-2xl w-full text-center">
          {/* 極簡 ok mark：細線 + ok 字 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex flex-col items-center gap-4"
          >
            <span
              aria-hidden
              className="block w-px h-16"
              style={{ background: MUJI.ink }}
            />
            <span
              className="font-mono text-xs"
              style={{ color: MUJI.wood, letterSpacing: '0.1em' }}
            >
              OK
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12"
          >
            <IndexLabel index="014" align="center">
              Reservation Received
            </IndexLabel>
            <h1
              className="font-display mt-8 leading-[1.4] text-3xl md:text-4xl"
              style={{ color: MUJI.ink, fontWeight: 500 }}
            >
              報名已送出
            </h1>
            <p
              className="mt-8 max-w-xl mx-auto font-body text-sm md:text-base leading-[2]"
              style={{ color: MUJI.inkMid }}
            >
              {name && <>{name}、</>}謝謝你選擇角落旅行社。
              <br />
              我們已收到你的報名資料、
              <br />
              專人會在 24 小時內聯絡確認名額。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-sm mx-auto p-6 text-left"
            style={{
              background: MUJI.paperSoft,
              border: `1px solid ${MUJI.line}`,
            }}
          >
            <p
              className="font-mono text-[10px] mb-4"
              style={{ color: MUJI.wood, letterSpacing: '0.05em' }}
            >
              Your Booking
            </p>
            <p
              className="font-display text-base leading-snug mb-6"
              style={{ color: MUJI.ink, fontWeight: 500 }}
            >
              {tour.title}
            </p>
            <div>
              <SummaryRow label="出發" value={formatDate(date)} />
              <SummaryRow label="人數" value={`${people} 人`} />
              <SummaryRow
                label="預估"
                value={formatPrice(tour.priceFrom * people)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-12"
          >
            <MujiButton variant="outline" onClick={onBack}>
              回到首頁
            </MujiButton>
          </motion.div>
        </div>
      </section>

      <MujiFooter />
    </div>
  );
}
