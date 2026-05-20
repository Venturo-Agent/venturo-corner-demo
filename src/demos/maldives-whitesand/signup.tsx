'use client';

/**
 * Signup — 報名頁
 *
 * 結構：
 *   - 左側表單（姓名 / email / 電話 / 出發日 / 人數 / 備註）
 *   - 右側 sticky 行程摘要（標題 / 天數 / 單人價 / 人數 / 小計）
 *   - 底部確認報名按鈕
 *   - 提交後顯示 success state（飛機飛過天空動畫）
 *
 * 跟 mediterranean-sun 的差異：
 *   - 整體配色換成 sea blue 系
 *   - Success 動畫：紙飛機從左飛到右上（取代 check mark in box）
 *   - 摘要卡用 lagoonLight 背景、跟 sandLight 對應
 *   - 報名步驟 numbers 用 ocean 色
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
  Send,
} from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  SEA,
  SectionLabel,
  SeaButton,
  SeaLine,
  EASE_OUT,
  CATEGORY_LABEL,
  IslandFooter,
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
    <div style={{ background: SEA.foam, color: SEA.ink }}>
      {/* Header */}
      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-16">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-3 font-display text-[11px] tracking-[0.4em] uppercase transition-opacity hover:opacity-70 mb-14"
            style={{ color: SEA.deep, fontWeight: 300 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            返回行程
          </button>

          <SectionLabel>Reservation</SectionLabel>
          <h1
            className="font-display mt-10 leading-[1.1] text-[40px] md:text-[68px]"
            style={{
              color: SEA.deep,
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}
          >
            報名出發
          </h1>
          <p
            className="mt-10 max-w-2xl text-base md:text-lg leading-[2.1]"
            style={{ color: SEA.inkSoft }}
          >
            填寫以下資料、我們會在 24 小時內專人聯絡確認名額與付款細節。
            蜜月與私訂行程優先安排。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-12 pb-32 md:pb-44">
        <SeaLine />

        <div className="pt-14 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* ─────────────── Form ─────────────── */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-12"
          >
            {/* Personal info */}
            <fieldset>
              <legend
                className="font-display text-[10px] tracking-[0.5em] uppercase mb-10 block"
                style={{ color: SEA.ocean, fontWeight: 300 }}
              >
                01 · Contact 聯絡資料
              </legend>

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
              <legend
                className="font-display text-[10px] tracking-[0.5em] uppercase mb-10 block"
                style={{ color: SEA.ocean, fontWeight: 300 }}
              >
                02 · Travel 行程設定
              </legend>

              <div className="space-y-8">
                {/* Date */}
                <div>
                  <label
                    className="font-display text-[10px] tracking-[0.4em] uppercase block mb-4"
                    style={{ color: SEA.inkSoft, fontWeight: 300 }}
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
                            background: active ? SEA.ocean : SEA.foamLight,
                            color: active ? SEA.foamLight : SEA.deep,
                            border: `1px solid ${active ? SEA.ocean : SEA.line}`,
                          }}
                        >
                          <span
                            className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-2"
                            style={{
                              color: active
                                ? 'rgba(240,248,250,0.75)'
                                : SEA.inkFaint,
                            }}
                          >
                            {d.slice(0, 4)}
                          </span>
                          <span
                            className="font-display text-base leading-tight"
                            style={{ fontWeight: 300 }}
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
                  <label
                    className="font-display text-[10px] tracking-[0.4em] uppercase block mb-4"
                    style={{ color: SEA.inkSoft, fontWeight: 300 }}
                  >
                    報名人數
                  </label>
                  <div
                    className="flex items-center justify-between px-7 py-5"
                    style={{
                      background: SEA.foamLight,
                      border: `1px solid ${SEA.line}`,
                    }}
                  >
                    <span
                      className="text-sm"
                      style={{ color: SEA.inkSoft }}
                    >
                      共
                      <span
                        className="font-display text-2xl mx-3"
                        style={{
                          color: SEA.deep,
                          fontWeight: 300,
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
                  <label
                    className="font-display text-[10px] tracking-[0.4em] uppercase block mb-4"
                    style={{ color: SEA.inkSoft, fontWeight: 300 }}
                  >
                    特殊需求（選填）
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="飲食限制、行動需求、慶生紀念日、蜜月驚喜…"
                    className="w-full px-5 py-4 text-base resize-none outline-none transition-colors focus:bg-white"
                    style={{
                      background: SEA.foamLight,
                      border: `1px solid ${SEA.line}`,
                      color: SEA.deep,
                    }}
                  />
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-4">
              <SeaButton size="lg" type="submit" className="w-full sm:w-auto">
                確認報名
              </SeaButton>
              <p
                className="mt-7 text-xs leading-[2.1]"
                style={{ color: SEA.inkFaint }}
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
                className="font-display text-[10px] tracking-[0.5em] uppercase mb-8"
                style={{ color: SEA.ocean, fontWeight: 300 }}
              >
                Booking Summary
              </p>

              <div
                style={{
                  background: SEA.lagoonLight,
                  border: `1px solid ${SEA.line}`,
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
                      background: 'rgba(240,248,250,0.92)',
                      color: SEA.deep,
                      fontWeight: 300,
                    }}
                  >
                    {CATEGORY_LABEL[tour.category]}
                  </span>
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin
                      size={13}
                      strokeWidth={1.5}
                      style={{ color: SEA.ocean }}
                    />
                    <span
                      className="font-display text-[10px] tracking-[0.4em] uppercase"
                      style={{ color: SEA.ocean, fontWeight: 300 }}
                    >
                      {tour.destination}
                    </span>
                  </div>
                  <h3
                    className="font-display leading-tight text-2xl mb-3"
                    style={{
                      color: SEA.deep,
                      fontWeight: 300,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {tour.title}
                  </h3>
                  <p
                    className="text-sm leading-[1.95] mb-7"
                    style={{ color: SEA.deepSoft }}
                  >
                    {tour.subtitle}
                  </p>

                  <SeaLine color="rgba(14,61,73,0.18)" />

                  {/* Summary rows */}
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

                  <SeaLine color="rgba(14,61,73,0.18)" />

                  {/* Price calculation */}
                  <div className="pt-7 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: SEA.deepSoft }}
                      >
                        單人團費
                      </span>
                      <span
                        className="font-display text-base"
                        style={{ color: SEA.deep, fontWeight: 300 }}
                      >
                        {formatPrice(tour.priceFrom)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-mono text-xs tracking-wider"
                        style={{ color: SEA.deepSoft }}
                      >
                        × {people} 人
                      </span>
                      <span
                        className="font-mono text-xs"
                        style={{ color: SEA.inkFaint }}
                      >
                        {people} 位旅客
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-7 pt-7 flex items-baseline justify-between"
                    style={{ borderTop: `1px solid ${SEA.deep}` }}
                  >
                    <div>
                      <span
                        className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-1"
                        style={{ color: SEA.inkFaint }}
                      >
                        Subtotal
                      </span>
                      <span
                        className="font-display text-sm"
                        style={{ color: SEA.deep, fontWeight: 300 }}
                      >
                        預估小計
                      </span>
                    </div>
                    <span
                      className="font-display text-3xl"
                      style={{
                        color: SEA.deep,
                        fontWeight: 300,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p
                    className="mt-7 text-xs leading-[2]"
                    style={{ color: SEA.inkFaint }}
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

      <IslandFooter />
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
        className="font-display text-[10px] tracking-[0.4em] uppercase block mb-3"
        style={{ color: SEA.inkSoft, fontWeight: 300 }}
      >
        {label}
        {required && (
          <span style={{ color: SEA.ocean }}> · 必填</span>
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
          background: SEA.foamLight,
          border: `1px solid ${SEA.line}`,
          color: SEA.deep,
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
        border: `1px solid ${SEA.line}`,
        background: 'white',
        color: SEA.deep,
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
      <span style={{ color: SEA.ocean }}>{icon}</span>
      <span
        className="font-display text-[10px] tracking-[0.3em] uppercase shrink-0"
        style={{ color: SEA.deepSoft, fontWeight: 300 }}
      >
        {label}
      </span>
      <span
        className="font-display text-sm ml-auto text-right"
        style={{ color: SEA.deep, fontWeight: 300 }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Success state — 紙飛機飛過天空動畫
// 從左下飛到右上、留下細弧線（旅程的隱喻）
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
    <div style={{ background: SEA.foam, color: SEA.deep }}>
      <section className="relative min-h-[80vh] flex items-center px-6 md:px-12 py-24 overflow-hidden">
        {/* 背景：兩條水平線、像海平面 */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[35%] h-px"
          style={{ background: SEA.lineLight }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-[65%] h-px"
          style={{ background: SEA.lineLight }}
        />

        {/* 紙飛機軌跡 — SVG 弧線 */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 100 480 Q 400 200 900 120"
            stroke={SEA.lagoon}
            strokeWidth="1"
            strokeDasharray="4 6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2.4, delay: 0.4, ease: EASE_OUT }}
          />
        </svg>

        {/* 飛機 icon — 從左下飛到右上 */}
        <motion.div
          aria-hidden
          initial={{ x: -100, y: 200, opacity: 0, rotate: -25 }}
          animate={{
            x: typeof window !== 'undefined' ? window.innerWidth + 100 : 1200,
            y: -200,
            opacity: [0, 1, 1, 0],
            rotate: -25,
          }}
          transition={{ duration: 3, delay: 0.6, ease: 'easeInOut' }}
          className="absolute left-0 bottom-1/3 z-10"
          style={{ color: SEA.ocean }}
        >
          <Send size={28} strokeWidth={1.5} />
        </motion.div>

        {/* 中央 success content */}
        <div className="relative z-20 mx-auto max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="mx-auto w-24 h-24 flex items-center justify-center"
            style={{
              border: `1px solid ${SEA.ocean}`,
              color: SEA.ocean,
            }}
          >
            <Check size={32} strokeWidth={1.5} />
          </motion.div>

          <SectionLabel align="center" className="mt-14">
            Reservation Received
          </SectionLabel>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            className="font-display mt-12 leading-[1.25] text-[40px] md:text-[60px]"
            style={{
              color: SEA.deep,
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}
          >
            報名已送出
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 max-w-xl mx-auto text-base md:text-lg leading-[2.2]"
            style={{ color: SEA.inkSoft }}
          >
            {name && <>{name}、</>}謝謝你選擇角落旅行社。
            <br />
            我們已收到你的報名資料、專人會在 24 小時內聯絡確認名額。
          </motion.p>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
              className="mt-20 max-w-md mx-auto"
              style={{
                background: SEA.lagoonLight,
                border: `1px solid ${SEA.line}`,
                padding: 40,
              }}
            >
              <p
                className="font-display text-[10px] tracking-[0.5em] uppercase mb-6"
                style={{ color: SEA.ocean, fontWeight: 300 }}
              >
                Your Booking
              </p>
              <p
                className="font-display text-xl md:text-2xl mb-4 leading-snug"
                style={{
                  color: SEA.deep,
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                }}
              >
                {tour.title}
              </p>
              <SeaLine color="rgba(14,61,73,0.18)" />
              <div className="pt-5 space-y-2">
                <p
                  className="font-mono text-xs tracking-wider"
                  style={{ color: SEA.deepSoft }}
                >
                  {formatDate(date)} 出發
                </p>
                <p
                  className="font-mono text-xs tracking-wider"
                  style={{ color: SEA.deepSoft }}
                >
                  {people} 人 · 預估 {formatPrice(tour.priceFrom * people)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-14"
          >
            <SeaButton variant="outline" onClick={onBack}>
              回到首頁
            </SeaButton>
          </motion.div>
        </div>
      </section>

      <IslandFooter />
    </div>
  );
}
