'use client';

/**
 * Listing — 本季客室一覽（4 條 tour）
 *
 * 結構（旅館客室目錄感）：
 *   1. Topbar
 *   2. 頁面 header（客室目錄）
 *   3. Filter（客室分類牌）
 *   4. Result counter（共幾間客室）
 *   5. List rows — 橫式客室目錄列
 *        左圖（4:5 掛軸感）/ 中客室名 + 描述 / 右起價 + 紙燈籠連結
 *
 * 跟 tsutaya listing（書屋書目索引）的差異：
 *   - 蔦屋是「書屋書目」「藏書 042」「卷號」書頁感
 *   - 這裡是「客室目錄」「客室 一號」「第 X 帖」溫泉旅館感
 *   - 圖加湯氣 overlay + 紙燈籠光暈
 *   - 卡片 hover 時整列有暖光暈擴散
 *   - 用麻葉紋 + 紙紋背景（極淡）
 */

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { tours, type Tour } from '@/data/mock-tours';
import { formatPrice } from '@/lib/format';
import {
  HOSHINO,
  LanternTag,
  SteamTitle,
  RoomPill,
  Hair,
  LampDivider,
  LanternLink,
  KanjiMark,
  PageMark,
  PhotoSeal,
  AsanohaPattern,
  PaperGrain,
  SteamOverlay,
  CATEGORIES,
  CATEGORY_LABEL,
  kanji,
} from './shared';
import { HoshinoTopbar, HoshinoFooter } from './home';

type Props = {
  onSelectTour: (slug: string) => void;
  onHome: () => void;
};

type FilterValue = 'all' | Tour['category'];

export default function ListingView({ onSelectTour, onHome }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const list = useMemo(() => {
    if (filter === 'all') return tours;
    return tours.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div style={{ background: HOSHINO.paper, color: HOSHINO.ink }}>
      <HoshinoTopbar
        onHome={onHome}
        onSeeAll={() => undefined}
        active="rooms"
        rightLabel="本季客室 / Rooms"
      />

      {/* ─────────────── Header ─────────────── */}
      <section className="relative px-6 md:px-12 pt-20 md:pt-28 pb-12 overflow-hidden">
        <AsanohaPattern opacity={0.05} />
        <PaperGrain opacity={0.05} />

        <div className="relative mx-auto max-w-6xl">
          <LanternTag chapter={kanji(3)}>Our Rooms</LanternTag>
          <SteamTitle
            level={1}
            className="mt-10"
            subtitle="本店本季備好的四間客室、與每一間客室掌櫃為你寫的迎賓字。"
          >
            二〇二六年度
            <br />
            本季客室一覽
          </SteamTitle>
        </div>
      </section>

      {/* ─────────────── Filter（客室分類牌） ─────────────── */}
      <section className="px-6 md:px-12 pb-10">
        <div className="mx-auto max-w-6xl">
          <LampDivider />
          <div className="py-10 flex flex-wrap items-center gap-3">
            <span
              className="font-display text-xs mr-6"
              style={{
                color: HOSHINO.wood,
                letterSpacing: '0.3em',
                fontWeight: 500,
              }}
            >
              客室類別
            </span>
            <RoomPill
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              全部
            </RoomPill>
            {CATEGORIES.map((c) => (
              <RoomPill
                key={c.value}
                active={filter === c.value}
                onClick={() => setFilter(c.value)}
              >
                {c.label}
              </RoomPill>
            ))}
          </div>
          <Hair />
        </div>
      </section>

      {/* ─────────────── Result counter ─────────────── */}
      <section className="px-6 md:px-12 pb-10">
        <div className="mx-auto max-w-6xl flex items-baseline justify-between">
          <span
            className="font-display text-xs"
            style={{
              color: HOSHINO.wood,
              letterSpacing: '0.25em',
              fontWeight: 500,
            }}
          >
            本季 共 {kanji(list.length)} 間客室
          </span>
          <span
            className="font-body text-xs"
            style={{
              color: HOSHINO.inkFaint,
              letterSpacing: '0.2em',
            }}
          >
            {filter === 'all' ? '全部類別' : CATEGORY_LABEL[filter]}
          </span>
        </div>
      </section>

      {/* ─────────────── List rows ─────────────── */}
      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <LampDivider />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              {list.map((tour, i) => (
                <RoomRow
                  key={tour.slug}
                  tour={tour}
                  index={i}
                  total={list.length}
                  onClick={() => onSelectTour(tour.slug)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 && (
            <div className="py-32 text-center">
              <p
                className="font-display text-base"
                style={{
                  color: HOSHINO.woodSoft,
                  letterSpacing: '0.1em',
                }}
              >
                此類客室本季暫無、請挑選其他類別。
              </p>
            </div>
          )}
        </div>
      </section>

      <HoshinoFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────
// RoomRow — 客室目錄列
//
// 排版：
//   - 左：直幅掛軸圖（4:5）+ 紙燈籠 + 圖說
//   - 中：第幾帖 + 客室漢字編號 + 客室名 + 副標 + 特色
//   - 右：起價 + 紙燈籠連結
// 細線分隔、像旅館客室手冊
// hover 整列有紙燈籠光暈擴散
// ─────────────────────────────────────────────────────

function RoomRow({
  tour,
  index,
  total,
  onClick,
}: {
  tour: Tour;
  index: number;
  total: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative block w-full text-left py-12 md:py-16"
      style={{ borderBottom: `1px solid ${HOSHINO.lineSoft}` }}
    >
      {/* hover 紙燈籠光暈 */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${HOSHINO.lamp}1f 0%, transparent 70%)`,
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
        {/* 左：掛軸圖 */}
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={tour.heroImage}
              alt={tour.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-all duration-1000 group-hover:scale-[1.03]"
            />
            <SteamOverlay position="both" intensity={0.45} />
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, ${HOSHINO.lamp}33 0%, transparent 65%)`,
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ boxShadow: `inset 0 0 0 1px ${HOSHINO.line}` }}
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <KanjiMark n={index + 1} />
            <span
              className="font-body text-[10px]"
              style={{
                color: HOSHINO.inkFaint,
                letterSpacing: '0.2em',
              }}
            >
              {tour.destination}
            </span>
          </div>
        </div>

        {/* 中：第幾帖 + 客室名 + 副標 + 特色 */}
        <div className="md:col-span-5">
          {/* 第幾帖 + 類別 */}
          <div className="flex items-baseline gap-5 mb-5">
            <span
              className="font-display text-xs"
              style={{
                color: HOSHINO.wood,
                letterSpacing: '0.25em',
                fontWeight: 500,
              }}
            >
              第{kanji(index + 1)}帖
            </span>
            <span
              aria-hidden
              className="block w-px h-3"
              style={{ background: HOSHINO.line }}
            />
            <span
              className="font-body text-xs"
              style={{
                color: HOSHINO.woodSoft,
                letterSpacing: '0.2em',
              }}
            >
              {CATEGORY_LABEL[tour.category]} · {tour.duration}
            </span>
          </div>

          {/* 客室名（書道感） */}
          <h3
            className="font-display text-xl md:text-[28px] leading-[1.35] mb-6"
            style={{
              color: HOSHINO.ink,
              fontWeight: 500,
              letterSpacing: '0.06em',
            }}
          >
            <span className="inline border-b border-transparent transition-colors duration-700 group-hover:border-current pb-[2px]">
              {tour.title}
            </span>
          </h3>

          {/* 副標 */}
          <p
            className="font-body text-sm leading-[2.05] mb-8"
            style={{
              color: HOSHINO.woodSoft,
              letterSpacing: '0.04em',
            }}
          >
            {tour.subtitle}
          </p>

          {/* 細書道線 + 特色 */}
          <Hair color={HOSHINO.lineSoft} />
          <div className="pt-6 flex flex-wrap gap-x-8 gap-y-3">
            {tour.features.slice(0, 3).map((f, i) => (
              <span
                key={i}
                className="inline-flex items-baseline gap-3 font-body text-xs"
                style={{
                  color: HOSHINO.woodSoft,
                  letterSpacing: '0.04em',
                }}
              >
                <span
                  aria-hidden
                  className="block"
                  style={{
                    width: 5,
                    height: 5,
                    background: HOSHINO.lamp,
                  }}
                />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* 右：價格 + 紙燈籠連結 */}
        <div className="md:col-span-3 flex md:flex-col md:items-end items-baseline justify-between md:justify-start gap-5">
          <div className="md:text-right">
            <span
              className="font-display text-[10px] block mb-2"
              style={{
                color: HOSHINO.inkFaint,
                letterSpacing: '0.3em',
                fontWeight: 500,
              }}
            >
              一位
            </span>
            <span
              className="font-display text-2xl md:text-[32px] block"
              style={{
                color: HOSHINO.ink,
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
            >
              {formatPrice(tour.priceFrom)}
            </span>
            <span
              className="font-body text-[10px] block mt-3"
              style={{
                color: HOSHINO.inkFaint,
                letterSpacing: '0.2em',
              }}
            >
              一位客人
            </span>
          </div>

          {/* 紙燈籠連結、頁碼 */}
          <div className="md:mt-12 flex md:flex-col items-baseline md:items-end gap-4">
            <LanternLink>細看客室</LanternLink>
            <PageMark n={index + 1} total={total} />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
