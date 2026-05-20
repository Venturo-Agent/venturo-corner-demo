'use client';

/**
 * 無印靜物 — Muji Stillness
 *
 * 角落旅行社 demo #07。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：MUJI Hotel（深圳 / 銀座 / 北京）、Found MUJI、原研哉「白」
 * vibe：日常即是風景、商品 catalog 質感、節制 + 留白
 *
 * 跟 mediterranean-sun 的對比：
 *   - 地中海有強烈強調色（金、藍）→ 無印只有黑白褐
 *   - 地中海大標 7xl 級的 hero →  無印頂多 4xl-5xl
 *   - 地中海有圖片 zoom hover → 無印只用 opacity / underline
 *   - 地中海排版自由 → 無印規則網格 + 嚴格對齊
 *   - 地中海字距 tracking 大 → 無印字距正常（letterSpacing ≤ 0.08em）
 *   - 地中海動畫 y offset 大 → 無印 fade only、duration 0.4s
 *
 * 配色（強制、勿改）：
 *   #F5F2EC 米紙白（背景）
 *   #D7CFC1 麻布灰（次面）
 *   #7C7166 木紋褐（弱強調）
 *   #2A2722 墨黑（文字）
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet
 *   - 嚴格 8pt grid
 *   - icon 不套圓框
 *   - 文案不抄 mediterranean、扣回「日常感」品牌
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

// 入場動畫：純 fade、無 y offset、duration 短
// 無印感的精髓：不要「滑進來」、要「淡出現」
const PAGE_TRANSITION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
};

export default function MujiStillnessDemo() {
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
