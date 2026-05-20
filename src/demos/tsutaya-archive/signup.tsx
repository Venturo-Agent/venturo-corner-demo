'use client';

/**
 * Signup — 登記借書（報名頁）
 *
 * 結構（書屋登記簿感）：
 *   1. Topbar
 *   2. Header（書屋登記）
 *   3. 主區：左 form / 右 sticky 書本摘要（像書封內頁）
 *   4. 送出後 → Success state（書屋已收到登記）
 *   5. Footer
 *
 * 跟 muji signup 的差異：
 *   - muji 是工業 form、Section「01」mono 編號
 *   - 蔦屋是書屋登記簿、Section「卷 一」中文卷號
 *   - input 邊框細、focus 邊框深咖、像簽到簿
 *   - stepper 用書頁書脊感 +/- 文字
 *   - 摘要卡像書封內頁（不是純細線）
 *   - success 用「書屋印章」感（細書頁線框 + 章紋）、不用大綠 check
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  TSUTAYA,
  ArchiveTag,
  BookTitle,
  TsutayaButton,
  DoubleHair,
  FootnoteRow,
  PhotoCaption,
  CATEGORY_LABEL,
  volName,
} from './shared';
import { TsutayaFooter } from './home';

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
    <div style={{ background: TSUTAYA.paper, color: TSUTAYA.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="px-6 md:px-12 py-6"
        style={{ borderBottom: `1px solid ${TSUTAYA.line}` }}
      >
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{ color: TSUTAYA.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span
              className="font-body text-xs"
              style={{ letterSpacing: '0.1em' }}
            >
              回到內頁
            </span>
          </button>
          <span
            className="font-body text-xs"
            style={{
              color: TSUTAYA.brownFaint,
              letterSpacing: '0.15em',
            }}
          >
            書屋登記 / Reservation
          </span>
        </div>
      </header>

      {/* ─────────────── Header ─────────────── */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12">
        <div className="mx-auto max-w-6xl">
          <ArchiveTag vol={volName(7)}>Reservation</ArchiveTag>
          <BookTitle
            level={1}
            className="mt-8"
            subtitle="填妥書屋登記簿、24 小時內專人聯絡確認座位與付款細節。"
          >
            登記借書
          </BookTitle>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-12 pb-24 md:pb-32">
        <DoubleHair />

        <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* ─────────────── Form ─────────────── */}
          <form onSubmit={handleSubmit} className="md:col-span-7">
            {/* ── 卷一 讀者資料 ── */}
            <FormSection vol={volName(1)} title="讀者資料">
              <FormField
                label="姓名"
                required
                value={name}
                onChange={setName}
                placeholder="王曉明"
              />
              <FormField
                label="電子郵件"
                required
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
              />
              <FormField
                label="行動電話"
                required
                value={phone}
                onChange={setPhone}
                placeholder="0912-345-678"
              />
            </FormSection>

            {/* ── 卷二 借閱資訊 ── */}
            <FormSection vol={volName(2)} title="借閱資訊">
              <FormBlock label="出版梯次">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  {tour.departureDates.map((d, i) => {
                    const active = d === date;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => onSelectDate(d)}
                        className="px-4 py-4 text-left transition-colors"
                        style={{
                          background: active
                            ? TSUTAYA.ink
                            : TSUTAYA.paperSoft,
                          color: active ? TSUTAYA.paper : TSUTAYA.ink,
                          border: `1px solid ${
                            active ? TSUTAYA.ink : TSUTAYA.line
                          }`,
                        }}
                      >
                        <span
                          className="font-display text-[10px] block mb-1"
                          style={{
                            color: active
                              ? TSUTAYA.strawSoft
                              : TSUTAYA.brownFaint,
                            letterSpacing: '0.2em',
                          }}
                        >
                          第{volName(i + 1)}版
                        </span>
                        <span
                          className="font-body text-sm leading-tight"
                          style={{
                            color: active ? TSUTAYA.paper : TSUTAYA.ink,
                          }}
                        >
                          {formatDate(d)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </FormBlock>

              {/* People stepper */}
              <FormBlock label="同行人數">
                <div
                  className="mt-4 flex items-center justify-between px-6 py-5"
                  style={{
                    background: TSUTAYA.paperSoft,
                    border: `1px solid ${TSUTAYA.line}`,
                  }}
                >
                  <span
                    className="font-body text-sm"
                    style={{ color: TSUTAYA.brownSoft }}
                  >
                    共
                    <span
                      className="font-display text-2xl mx-3"
                      style={{
                        color: TSUTAYA.ink,
                        fontWeight: 500,
                      }}
                    >
                      {people}
                    </span>
                    位讀者 · 本版上限 {tour.groupSize.max} 位
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
              </FormBlock>

              <FormBlock label="附記（選填）">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="飲食限制、行動需求、慶生紀念日…"
                  className="mt-4 w-full px-4 py-3 font-body text-sm resize-none outline-none transition-colors focus:bg-white"
                  style={{
                    background: TSUTAYA.paperSoft,
                    border: `1px solid ${TSUTAYA.line}`,
                    color: TSUTAYA.ink,
                  }}
                />
              </FormBlock>
            </FormSection>

            {/* ── Submit ── */}
            <div
              className="pt-10"
              style={{ borderTop: `1px solid ${TSUTAYA.line}` }}
            >
              <TsutayaButton
                size="lg"
                type="submit"
                className="w-full sm:w-auto"
              >
                確認登記借閱
              </TsutayaButton>
              <p
                className="mt-6 font-body text-xs leading-[2]"
                style={{ color: TSUTAYA.brownFaint }}
              >
                送出後 24 小時內、書屋編者以電話或 email 聯絡確認座位。
                <br />
                正式定位需於 3 個工作日內、完成 30% 訂金支付。
              </p>
            </div>
          </form>

          {/* ─────────────── Summary（書封內頁） ─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-12">
              <ArchiveTag vol={volName(8)}>Book Summary</ArchiveTag>
              <BookTitle level={3} className="mt-8 mb-10">
                這本書的封面
              </BookTitle>

              <div
                className="overflow-hidden"
                style={{
                  background: TSUTAYA.paperSoft,
                  border: `1px solid ${TSUTAYA.line}`,
                }}
              >
                {/* 書封圖 */}
                <div className="relative aspect-[4/5]">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <PhotoCaption fig={1}>
                    本書封面 · {tour.destination}
                  </PhotoCaption>

                  <div className="mt-6">
                    <span
                      className="font-body text-[10px] block mb-2"
                      style={{
                        color: TSUTAYA.brownFaint,
                        letterSpacing: '0.2em',
                      }}
                    >
                      {CATEGORY_LABEL[tour.category]} · {tour.destination}
                    </span>
                    <h3
                      className="font-display text-lg md:text-xl leading-snug mb-3"
                      style={{
                        color: TSUTAYA.ink,
                        fontWeight: 500,
                      }}
                    >
                      {tour.title}
                    </h3>
                    <p
                      className="font-body text-xs leading-[2] mb-6"
                      style={{ color: TSUTAYA.brownSoft }}
                    >
                      {tour.subtitle}
                    </p>
                  </div>

                  <DoubleHair />

                  {/* 書本資訊 */}
                  <div className="mt-2">
                    <FootnoteRow
                      label="出版梯次"
                      value={formatDate(date)}
                    />
                    <FootnoteRow label="卷次" value={tour.duration} />
                    <FootnoteRow
                      label="讀者人數"
                      value={`${people} 位`}
                    />
                  </div>

                  {/* 定價計算 */}
                  <div className="pt-5 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-body text-xs"
                        style={{
                          color: TSUTAYA.brownSoft,
                          letterSpacing: '0.1em',
                        }}
                      >
                        本書定價（一位讀者）
                      </span>
                      <span
                        className="font-display text-sm"
                        style={{
                          color: TSUTAYA.ink,
                          fontWeight: 500,
                        }}
                      >
                        {formatPrice(tour.priceFrom)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-body text-xs"
                        style={{
                          color: TSUTAYA.brownSoft,
                          letterSpacing: '0.1em',
                        }}
                      >
                        × {people} 位讀者
                      </span>
                      <span
                        className="font-body text-xs"
                        style={{
                          color: TSUTAYA.brownFaint,
                          letterSpacing: '0.15em',
                        }}
                      >
                        小計
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-6 pt-6 flex items-baseline justify-between"
                    style={{ borderTop: `1px solid ${TSUTAYA.ink}` }}
                  >
                    <div>
                      <span
                        className="font-display text-[10px] block mb-1"
                        style={{
                          color: TSUTAYA.brownFaint,
                          letterSpacing: '0.25em',
                        }}
                      >
                        本書定價
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{ color: TSUTAYA.ink }}
                      >
                        預估小計
                      </span>
                    </div>
                    <span
                      className="font-display text-2xl md:text-3xl"
                      style={{
                        color: TSUTAYA.ink,
                        fontWeight: 500,
                      }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p
                    className="mt-6 font-body text-xs leading-[2]"
                    style={{ color: TSUTAYA.brownFaint }}
                  >
                    上述為預估金額、不含個人消費與選配活動。
                    <br />
                    最終定價依出版梯次匯率與選配項目調整。
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <TsutayaFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FormSection — 表單分卷（卷號 + 章名 + 細線）
// ─────────────────────────────────────────────────────

function FormSection({
  vol,
  title,
  children,
}: {
  vol: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="pb-12 mb-12"
      style={{ borderBottom: `1px solid ${TSUTAYA.line}` }}
    >
      <div className="flex items-baseline gap-5 mb-10">
        <span
          className="font-display text-sm"
          style={{
            color: TSUTAYA.brown,
            letterSpacing: '0.2em',
            fontWeight: 500,
          }}
        >
          卷 {vol}
        </span>
        <span
          aria-hidden
          className="block w-px h-3"
          style={{ background: TSUTAYA.line }}
        />
        <span
          className="font-display text-base md:text-lg"
          style={{ color: TSUTAYA.ink, fontWeight: 500 }}
        >
          {title}
        </span>
      </div>
      <div className="space-y-7">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FormField — 單行文字輸入
// ─────────────────────────────────────────────────────

function FormField({
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
        style={{
          color: TSUTAYA.brownSoft,
          letterSpacing: '0.1em',
        }}
      >
        {label}
        {required && (
          <span style={{ color: TSUTAYA.brown }}> · 必填</span>
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
          background: TSUTAYA.paperSoft,
          border: `1px solid ${TSUTAYA.line}`,
          color: TSUTAYA.ink,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FormBlock — 帶 label 的區塊容器
// ─────────────────────────────────────────────────────

function FormBlock({
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
        style={{
          color: TSUTAYA.brownSoft,
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────
// StepperBtn — +/- 純文字
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
        background: TSUTAYA.paper,
        border: `1px solid ${TSUTAYA.ink}`,
        color: TSUTAYA.ink,
      }}
    >
      {symbol}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Success state
// 書屋登記成功：書屋印章感（細書頁線框 + 章紋 + 卷次）
// 跟 muji 的「OK 細線」對比：蔦屋有「書屋印章」線框、印「已登記」
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
    <div style={{ background: TSUTAYA.paper, color: TSUTAYA.ink }}>
      <section className="min-h-[80vh] flex items-center px-6 md:px-12 py-24">
        <div className="mx-auto max-w-2xl w-full text-center">
          {/* 書屋印章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto inline-flex items-center justify-center"
          >
            <div
              className="relative px-10 py-8 flex flex-col items-center"
              style={{
                border: `2px solid ${TSUTAYA.brown}`,
                background: TSUTAYA.paperSoft,
              }}
            >
              {/* 內框 */}
              <div
                aria-hidden
                className="absolute inset-2 pointer-events-none"
                style={{
                  border: `1px solid ${TSUTAYA.brown}`,
                }}
              />
              <span
                className="font-display text-[11px]"
                style={{
                  color: TSUTAYA.brown,
                  letterSpacing: '0.35em',
                }}
              >
                角落書屋
              </span>
              <div
                className="my-3 h-px w-12"
                style={{ background: TSUTAYA.brown }}
              />
              <span
                className="font-display text-lg"
                style={{
                  color: TSUTAYA.brown,
                  letterSpacing: '0.4em',
                  fontWeight: 500,
                }}
              >
                已登記
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <ArchiveTag vol={volName(9)} align="center">
              Received
            </ArchiveTag>
            <h1
              className="font-display mt-10 leading-[1.4] text-3xl md:text-4xl"
              style={{ color: TSUTAYA.ink, fontWeight: 500 }}
            >
              書屋已收到登記
            </h1>
            <p
              className="mt-10 max-w-xl mx-auto font-body text-sm md:text-base leading-[2.1]"
              style={{ color: TSUTAYA.brownSoft }}
            >
              {name && <>{name}、</>}謝謝你選擇角落書屋。
              <br />
              我們已收到你的借閱登記、
              <br />
              書屋編者會在 24 小時內聯絡你確認座位。
            </p>
          </motion.div>

          {/* 借閱小卡 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 max-w-md mx-auto text-left"
          >
            <div
              className="p-8"
              style={{
                background: TSUTAYA.paperSoft,
                border: `1px solid ${TSUTAYA.line}`,
              }}
            >
              <p
                className="font-display text-xs mb-4 pb-3"
                style={{
                  color: TSUTAYA.brown,
                  letterSpacing: '0.25em',
                  borderBottom: `1px solid ${TSUTAYA.line}`,
                }}
              >
                借閱登記摘要
              </p>
              <p
                className="font-display text-base md:text-lg leading-snug mb-6 mt-5"
                style={{ color: TSUTAYA.ink, fontWeight: 500 }}
              >
                {tour.title}
              </p>
              <FootnoteRow label="出版梯次" value={formatDate(date)} />
              <FootnoteRow label="讀者人數" value={`${people} 位`} />
              <FootnoteRow
                label="預估定價"
                value={formatPrice(tour.priceFrom * people)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-14"
          >
            <TsutayaButton variant="outline" onClick={onBack}>
              回到書屋
            </TsutayaButton>
          </motion.div>
        </div>
      </section>

      <TsutayaFooter />
    </div>
  );
}

