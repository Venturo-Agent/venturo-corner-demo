'use client';

/**
 * Signup — 客室預約（報名頁）
 *
 * 主題：旅館 check-in 卡感、success 像「客室鑰匙交付」
 *
 * 結構：
 *   1. Topbar
 *   2. Header（客室預約）
 *   3. 主區：左 check-in form / 右 sticky 客室掛軸（像旅館鑰匙牌）
 *   4. 送出後 → Success state（客室鑰匙已備好、燙金客室印章）
 *   5. Footer
 *
 * 跟 tsutaya signup 的差異：
 *   - 蔦屋是書屋登記簿、Section「卷 一」書本卷號
 *   - 這裡是旅館 check-in 卡、Section「第一帖」客室帖號
 *   - input focus 邊框燈芯紅褐、紙燈籠光暈淡出
 *   - 摘要卡像「客室鑰匙牌」（深木褐 + 燈芯紅褐文字）
 *   - success 用「客室鑰匙」深木印章（不是書屋方框印章）
 *     - 深木褐底 + 燈芯紅褐字 + 燈光暈光
 *     - 標題從「書屋已收到登記」改為「鑰匙已備好、客室等您」
 */

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { type Tour } from '@/data/mock-tours';
import { formatPrice, formatDate } from '@/lib/format';
import {
  HOSHINO,
  LanternTag,
  SteamTitle,
  HoshinoButton,
  LampDivider,
  LanternMark,
  LedgerRow,
  PhotoSeal,
  AsanohaPattern,
  PaperGrain,
  SteamOverlay,
  CATEGORY_LABEL,
  kanji,
} from './shared';
import { HoshinoFooter } from './home';

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
    <div style={{ background: HOSHINO.paper, color: HOSHINO.ink }}>
      {/* ─────────────── Topbar ─────────────── */}
      <header
        className="relative px-6 md:px-12 py-6 overflow-hidden"
        style={{
          borderBottom: `1px solid ${HOSHINO.line}`,
          background: HOSHINO.paperSoft,
        }}
      >
        <PaperGrain opacity={0.06} />
        <div className="relative mx-auto max-w-6xl flex items-baseline justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-3 transition-opacity hover:opacity-60"
            style={{ color: HOSHINO.ink }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span
              className="font-display text-xs"
              style={{ letterSpacing: '0.18em', fontWeight: 500 }}
            >
              回到客室
            </span>
          </button>
          <span
            className="font-body text-xs"
            style={{
              color: HOSHINO.inkFaint,
              letterSpacing: '0.2em',
            }}
          >
            玄關 check-in / Reservation
          </span>
        </div>
      </header>

      {/* ─────────────── Header ─────────────── */}
      <section className="relative px-6 md:px-12 pt-16 md:pt-24 pb-12 overflow-hidden">
        <AsanohaPattern opacity={0.05} />
        <PaperGrain opacity={0.05} />

        <div className="relative mx-auto max-w-6xl">
          <LanternTag chapter={kanji(7)}>Reservation</LanternTag>
          <SteamTitle
            level={1}
            className="mt-10"
            subtitle="填妥玄關 check-in 卡、24 小時內掌櫃聯絡確認客室與訂金。"
          >
            預約客室
          </SteamTitle>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 md:px-12 pb-24 md:pb-32">
        <LampDivider />

        <div className="pt-14 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* ─────────────── Form ─────────────── */}
          <form onSubmit={handleSubmit} className="md:col-span-7">
            {/* ── 第一帖 客人資料 ── */}
            <FormSection chapter={kanji(1)} title="客人資料">
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

            {/* ── 第二帖 客室資訊 ── */}
            <FormSection chapter={kanji(2)} title="客室資訊">
              <FormBlock label="出帖梯次">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  {tour.departureDates.map((d, i) => {
                    const active = d === date;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => onSelectDate(d)}
                        className="group relative px-4 py-4 text-left transition-all overflow-hidden"
                        style={{
                          background: active
                            ? HOSHINO.ink
                            : HOSHINO.paperSoft,
                          color: active ? HOSHINO.paper : HOSHINO.ink,
                          border: `1px solid ${
                            active ? HOSHINO.ink : HOSHINO.line
                          }`,
                        }}
                      >
                        {/* 紙燈籠光暈 */}
                        <span
                          aria-hidden
                          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                          style={{
                            background: `radial-gradient(circle at 50% 30%, ${HOSHINO.lamp}3a 0%, transparent 70%)`,
                            opacity: active ? 1 : 0,
                          }}
                        />
                        {!active && (
                          <span
                            aria-hidden
                            className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                            style={{
                              background: `radial-gradient(circle at 50% 30%, ${HOSHINO.lamp}1f 0%, transparent 70%)`,
                            }}
                          />
                        )}

                        <span
                          className="relative font-display text-[10px] block mb-1"
                          style={{
                            color: active
                              ? HOSHINO.lampSoft
                              : HOSHINO.inkFaint,
                            letterSpacing: '0.3em',
                            fontWeight: 500,
                          }}
                        >
                          第{kanji(i + 1)}帖
                        </span>
                        <span
                          className="relative font-body text-sm leading-tight"
                          style={{
                            color: active ? HOSHINO.paper : HOSHINO.ink,
                            letterSpacing: '0.04em',
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
              <FormBlock label="同行客人">
                <div
                  className="mt-4 flex items-center justify-between px-6 py-5"
                  style={{
                    background: HOSHINO.paperSoft,
                    border: `1px solid ${HOSHINO.line}`,
                  }}
                >
                  <span
                    className="font-body text-sm"
                    style={{
                      color: HOSHINO.woodSoft,
                      letterSpacing: '0.04em',
                    }}
                  >
                    共
                    <span
                      className="font-display text-2xl mx-3"
                      style={{
                        color: HOSHINO.ink,
                        fontWeight: 500,
                      }}
                    >
                      {people}
                    </span>
                    位客人 · 本客室上限 {tour.groupSize.max} 位
                  </span>
                  <div className="flex items-center gap-2">
                    <StepperBtn
                      onClick={() => setPeople(Math.max(1, people - 1))}
                      disabled={people <= 1}
                      ariaLabel="減少客人"
                      symbol="−"
                    />
                    <StepperBtn
                      onClick={() =>
                        setPeople(Math.min(tour.groupSize.max, people + 1))
                      }
                      disabled={people >= tour.groupSize.max}
                      ariaLabel="增加客人"
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
                  placeholder="飲食限制、行動需求、慶生紀念日…掌櫃會替你備好。"
                  className="mt-4 w-full px-4 py-3 font-body text-sm resize-none outline-none transition-colors focus:bg-white"
                  style={{
                    background: HOSHINO.paperSoft,
                    border: `1px solid ${HOSHINO.line}`,
                    color: HOSHINO.ink,
                    letterSpacing: '0.03em',
                  }}
                />
              </FormBlock>
            </FormSection>

            {/* ── Submit ── */}
            <div
              className="pt-10"
              style={{ borderTop: `1px solid ${HOSHINO.line}` }}
            >
              <HoshinoButton
                size="lg"
                type="submit"
                className="w-full sm:w-auto"
              >
                確認預約客室
              </HoshinoButton>
              <p
                className="mt-6 font-body text-xs leading-[2.1]"
                style={{
                  color: HOSHINO.inkFaint,
                  letterSpacing: '0.04em',
                }}
              >
                送出後 24 小時內、掌櫃以電話或 email 聯絡確認客室。
                <br />
                正式預約需於 3 個工作日內、完成 30% 訂金支付。
              </p>
            </div>
          </form>

          {/* ─────────────── Summary（客室掛軸鑰匙牌） ─────────────── */}
          <aside className="md:col-span-5">
            <div className="md:sticky md:top-12">
              <LanternTag chapter={kanji(8)}>Room Tag</LanternTag>
              <SteamTitle level={3} className="mt-10 mb-12">
                這間客室的掛軸
              </SteamTitle>

              <div
                className="relative overflow-hidden"
                style={{
                  background: HOSHINO.paperSoft,
                  border: `1px solid ${HOSHINO.line}`,
                }}
              >
                {/* 紙燈籠光暈 */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-32 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${HOSHINO.lamp}22 0%, transparent 70%)`,
                  }}
                />

                {/* 客室掛軸圖 */}
                <div className="relative aspect-[4/5]">
                  <Image
                    src={tour.heroImage}
                    alt={tour.title}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <SteamOverlay position="both" intensity={0.5} />
                </div>

                <div className="relative p-6 md:p-8">
                  <PhotoSeal n={1}>
                    本客室掛軸 · {tour.destination}
                  </PhotoSeal>

                  <div className="mt-6">
                    <span
                      className="font-display text-[10px] block mb-3"
                      style={{
                        color: HOSHINO.inkFaint,
                        letterSpacing: '0.25em',
                        fontWeight: 500,
                      }}
                    >
                      {CATEGORY_LABEL[tour.category]} · {tour.destination}
                    </span>
                    <h3
                      className="font-display text-lg md:text-xl leading-snug mb-4"
                      style={{
                        color: HOSHINO.ink,
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tour.title}
                    </h3>
                    <p
                      className="font-body text-xs leading-[2.05] mb-6"
                      style={{
                        color: HOSHINO.woodSoft,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {tour.subtitle}
                    </p>
                  </div>

                  <LampDivider />

                  {/* 客室登記簿 */}
                  <div className="mt-2">
                    <LedgerRow
                      label="出帖梯次"
                      value={formatDate(date)}
                    />
                    <LedgerRow label="帖數" value={tour.duration} />
                    <LedgerRow
                      label="客人數"
                      value={`${people} 位`}
                    />
                  </div>

                  {/* 定價計算 */}
                  <div className="pt-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-body text-xs"
                        style={{
                          color: HOSHINO.woodSoft,
                          letterSpacing: '0.1em',
                        }}
                      >
                        客室預約價（一位客人）
                      </span>
                      <span
                        className="font-display text-sm"
                        style={{
                          color: HOSHINO.ink,
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {formatPrice(tour.priceFrom)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-body text-xs"
                        style={{
                          color: HOSHINO.woodSoft,
                          letterSpacing: '0.1em',
                        }}
                      >
                        × {people} 位客人
                      </span>
                      <span
                        className="font-body text-xs"
                        style={{
                          color: HOSHINO.inkFaint,
                          letterSpacing: '0.2em',
                        }}
                      >
                        小計
                      </span>
                    </div>
                  </div>

                  <div
                    className="mt-7 pt-6 flex items-baseline justify-between"
                    style={{ borderTop: `1px solid ${HOSHINO.ink}` }}
                  >
                    <div>
                      <span
                        className="font-display text-[10px] block mb-1"
                        style={{
                          color: HOSHINO.inkFaint,
                          letterSpacing: '0.3em',
                          fontWeight: 500,
                        }}
                      >
                        客室預約價
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{
                          color: HOSHINO.ink,
                          letterSpacing: '0.04em',
                        }}
                      >
                        預估小計
                      </span>
                    </div>
                    <span
                      className="font-display text-2xl md:text-[32px]"
                      style={{
                        color: HOSHINO.ink,
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p
                    className="mt-6 font-body text-xs leading-[2.05]"
                    style={{
                      color: HOSHINO.inkFaint,
                      letterSpacing: '0.04em',
                    }}
                  >
                    上述為預估金額、不含個人消費與選配活動。
                    <br />
                    最終定價依出帖梯次匯率與選配項目調整。
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <HoshinoFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// FormSection — 表單分帖（帖號 + 章名 + 紙燈籠 + 細線）
// ─────────────────────────────────────────────────────

function FormSection({
  chapter,
  title,
  children,
}: {
  chapter: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="pb-14 mb-14"
      style={{ borderBottom: `1px solid ${HOSHINO.line}` }}
    >
      <div className="flex items-baseline gap-5 mb-12">
        <LanternMark size={14} />
        <span
          className="font-display text-sm"
          style={{
            color: HOSHINO.wood,
            letterSpacing: '0.25em',
            fontWeight: 500,
          }}
        >
          第{chapter}帖
        </span>
        <span
          aria-hidden
          className="block w-px h-3"
          style={{ background: HOSHINO.line }}
        />
        <span
          className="font-display text-base md:text-lg"
          style={{
            color: HOSHINO.ink,
            fontWeight: 500,
            letterSpacing: '0.06em',
          }}
        >
          {title}
        </span>
      </div>
      <div className="space-y-8">{children}</div>
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
        className="font-display text-xs block mb-3"
        style={{
          color: HOSHINO.wood,
          letterSpacing: '0.2em',
          fontWeight: 500,
        }}
      >
        {label}
        {required && (
          <span style={{ color: HOSHINO.lamp, marginLeft: 6 }}>· 必填</span>
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
          background: HOSHINO.paperSoft,
          border: `1px solid ${HOSHINO.line}`,
          color: HOSHINO.ink,
          letterSpacing: '0.03em',
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
        className="font-display text-xs block"
        style={{
          color: HOSHINO.wood,
          letterSpacing: '0.2em',
          fontWeight: 500,
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
      className="w-10 h-10 flex items-center justify-center font-display text-base transition-all disabled:opacity-30 hover:bg-[color:var(--paper)]"
      style={{
        background: HOSHINO.paper,
        border: `1px solid ${HOSHINO.ink}`,
        color: HOSHINO.ink,
      }}
    >
      {symbol}
    </button>
  );
}

// ─────────────────────────────────────────────────────
// Success state
// 「客室鑰匙」交付感：深木褐底 + 燈芯紅褐字 + 紙燈籠光暈
// 跟 tsutaya「書屋方框印章」對比：這裡是「客室鑰匙牌」深木印章 + 燈光暈光
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
    <div style={{ background: HOSHINO.paper, color: HOSHINO.ink }}>
      <section className="relative min-h-[80vh] flex items-center px-6 md:px-12 py-24 overflow-hidden">
        <AsanohaPattern opacity={0.05} />
        <PaperGrain opacity={0.05} />

        <div className="relative mx-auto max-w-2xl w-full text-center">
          {/* 客室鑰匙印章 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto inline-flex items-center justify-center"
          >
            <div
              className="relative px-12 py-10 flex flex-col items-center overflow-hidden"
              style={{
                background: HOSHINO.ink,
                border: `2px solid ${HOSHINO.lamp}`,
              }}
            >
              {/* 紙燈籠光暈擴散（永久） */}
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${HOSHINO.lamp}55 0%, transparent 70%)`,
                }}
              />
              {/* 內框 */}
              <div
                aria-hidden
                className="absolute inset-2 pointer-events-none"
                style={{
                  border: `1px solid ${HOSHINO.lamp}`,
                }}
              />

              {/* 紙燈籠 SVG */}
              <div className="relative mb-3">
                <LanternMark size={20} />
              </div>

              <span
                className="relative font-display text-[11px]"
                style={{
                  color: HOSHINO.lampSoft,
                  letterSpacing: '0.4em',
                  fontWeight: 500,
                }}
              >
                角落旅館
              </span>
              <div
                className="relative my-3 h-px w-14"
                style={{ background: HOSHINO.lamp }}
              />
              <span
                className="relative font-display text-lg"
                style={{
                  color: HOSHINO.lamp,
                  letterSpacing: '0.45em',
                  fontWeight: 500,
                }}
              >
                客室已備
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-16"
          >
            <LanternTag chapter={kanji(9)} align="center">
              Received
            </LanternTag>
            <h1
              className="font-display mt-10 leading-[1.4] text-3xl md:text-[42px]"
              style={{
                color: HOSHINO.ink,
                fontWeight: 500,
                letterSpacing: '0.08em',
              }}
            >
              鑰匙已備好、客室等您
            </h1>
            <p
              className="mt-10 max-w-xl mx-auto font-body text-sm md:text-base leading-[2.15]"
              style={{
                color: HOSHINO.woodSoft,
                letterSpacing: '0.04em',
              }}
            >
              {name && <>{name}、</>}謝謝您選擇角落旅館。
              <br />
              掌櫃已收到您的客室預約、
              <br />
              24 小時內以電話或 email 聯絡確認客室細節。
            </p>
          </motion.div>

          {/* 客室登記摘要 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="mt-16 max-w-md mx-auto text-left"
          >
            <div
              className="relative p-8 overflow-hidden"
              style={{
                background: HOSHINO.paperSoft,
                border: `1px solid ${HOSHINO.line}`,
              }}
            >
              {/* 紙燈籠光暈 */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-24 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${HOSHINO.lamp}22 0%, transparent 70%)`,
                }}
              />

              <p
                className="relative font-display text-xs mb-5 pb-4"
                style={{
                  color: HOSHINO.wood,
                  letterSpacing: '0.3em',
                  borderBottom: `1px solid ${HOSHINO.line}`,
                  fontWeight: 500,
                }}
              >
                客室預約摘要
              </p>
              <p
                className="relative font-display text-base md:text-lg leading-snug mb-7 mt-6"
                style={{
                  color: HOSHINO.ink,
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}
              >
                {tour.title}
              </p>
              <div className="relative">
                <LedgerRow label="出帖梯次" value={formatDate(date)} />
                <LedgerRow label="客人數" value={`${people} 位`} />
                <LedgerRow
                  label="預估價"
                  value={formatPrice(tour.priceFrom * people)}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-14"
          >
            <HoshinoButton variant="outline" onClick={onBack}>
              回到旅館
            </HoshinoButton>
          </motion.div>
        </div>
      </section>

      <HoshinoFooter />
    </div>
  );
}
