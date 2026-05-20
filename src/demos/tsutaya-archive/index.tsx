'use client';

/**
 * 蔦屋書屋 — Tsutaya Archive
 *
 * 角落旅行社 demo #08。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：Tsutaya Daikanyama T-Site、Tsutaya 銀座、京都岡崎、Hakkoda Books
 * vibe：一本書、一杯茶、一個下午的書店感、書頁泛黃、書架陳列、藏書家品味
 *
 * 跟 muji-stillness（同為日系極簡）的對比：
 *   - muji 是工業 catalog 禁慾感 → 蔦屋是書店人文溫度感
 *   - muji 配色冷白中性（#F5F2EC）→ 蔦屋配色暖黃米紙（#FDFBF6 + 麥稈黃）
 *   - muji 動畫純 fade、duration 0.4s → 蔦屋翻書頁 horizontal slide、duration 0.55s
 *   - muji 規則網格、單元統一 → 蔦屋雙欄文字、書頁圖文交錯
 *   - muji 編號用工業「001」→ 蔦屋用「卷 一」「藏書 042」書店感
 *   - muji 分類冷描述（「文化」「荒野」）→ 蔦屋書架分類（「文學紀行」「探險手記」）
 *
 * 配色（強制、勿改）：
 *   #FDFBF6 米紙黃（背景）
 *   #E1D3B4 麥稈黃（次面）
 *   #3A352D 棕墨（強調）
 *   #0E0C09 深咖（文字）
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet
 *   - 嚴格 8pt grid
 *   - icon 不套圓框
 *   - 不抄 muji 文案、扣回「藏書家挑書」品牌
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { findTourBySlug, tours } from '@/data/mock-tours';

import HomeView from './home';
import ListingView from './listing';
import DetailView from './detail';
import ItineraryView from './itinerary';
import SignupView from './signup';

type View = 'home' | 'listing' | 'detail' | 'itinerary' | 'signup';

type State = {
  view: View;
  tourSlug: string | null;
  departureDate: string | null;
};

// 翻書頁動畫：右側滑入 + 輕微 fade、duration 0.55s
// 跟 muji（純 fade 0.4s）對比：蔦屋有 horizontal motion、像翻過去一頁
const PAGE_TRANSITION = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export default function TsutayaArchiveDemo() {
  const [state, setState] = useState<State>({
    view: 'home',
    tourSlug: null,
    departureDate: null,
  });

  // view 切換時捲到頁面頂端
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [state.view, state.tourSlug]);

  const goHome = useCallback(() => {
    setState({ view: 'home', tourSlug: null, departureDate: null });
  }, []);

  const goListing = useCallback(() => {
    setState((prev) => ({ ...prev, view: 'listing' }));
  }, []);

  const goDetail = useCallback((slug: string) => {
    setState((prev) => ({
      ...prev,
      view: 'detail',
      tourSlug: slug,
      // 切換 tour 時清掉舊出發日
      departureDate:
        prev.tourSlug === slug ? prev.departureDate : null,
    }));
  }, []);

  const goItinerary = useCallback(() => {
    setState((prev) => ({ ...prev, view: 'itinerary' }));
  }, []);

  const goSignup = useCallback(() => {
    setState((prev) => ({ ...prev, view: 'signup' }));
  }, []);

  const setDate = useCallback((date: string) => {
    setState((prev) => ({ ...prev, departureDate: date }));
  }, []);

  const tour = state.tourSlug ? findTourBySlug(state.tourSlug) : null;
  const fallbackTour = tour ?? tours[0];

  return (
    <AnimatePresence mode="wait">
      {state.view === 'home' && (
        <motion.div key="home" {...PAGE_TRANSITION}>
          <HomeView onSelectTour={goDetail} onSeeAll={goListing} />
        </motion.div>
      )}

      {state.view === 'listing' && (
        <motion.div key="listing" {...PAGE_TRANSITION}>
          <ListingView onSelectTour={goDetail} onHome={goHome} />
        </motion.div>
      )}

      {state.view === 'detail' && tour && (
        <motion.div key={`detail-${tour.slug}`} {...PAGE_TRANSITION}>
          <DetailView
            tour={tour}
            selectedDate={state.departureDate}
            onSelectDate={setDate}
            onSeeItinerary={goItinerary}
            onSignup={goSignup}
            onBack={goListing}
          />
        </motion.div>
      )}

      {state.view === 'itinerary' && tour && (
        <motion.div key={`itinerary-${tour.slug}`} {...PAGE_TRANSITION}>
          <ItineraryView
            tour={tour}
            onBack={() =>
              setState((prev) => ({ ...prev, view: 'detail' }))
            }
            onSignup={goSignup}
          />
        </motion.div>
      )}

      {state.view === 'signup' && (
        <motion.div key={`signup-${fallbackTour.slug}`} {...PAGE_TRANSITION}>
          <SignupView
            tour={fallbackTour}
            selectedDate={state.departureDate}
            onSelectDate={setDate}
            onBack={goHome}
          />
        </motion.div>
      )}

      {/* fallback：如果 detail / itinerary 沒 tour、回 home */}
      {(state.view === 'detail' || state.view === 'itinerary') && !tour && (
        <motion.div key="fallback" {...PAGE_TRANSITION}>
          <HomeView onSelectTour={goDetail} onSeeAll={goListing} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
