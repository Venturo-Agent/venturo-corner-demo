'use client';

/**
 * 阿爾卑斯靜謐 — Alpine Serenity
 *
 * 角落旅行社 demo #03。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：Aman Le Mélézin（Courchevel）、Six Senses Crans-Montana、Whitepod Hotel
 * vibe：雪線之上、空氣稀薄、冰川藍灰、冬日陽光、極簡奢華
 *
 * 配色（強制、勿改）：
 *   #F8F9FB  雪白（主背景）
 *   #CBD5E0  冰川灰（次要面）
 *   #5F6F86  山岩藍（強調）
 *   #1A2433  夜山黑（文字）
 *
 * 跟 mediterranean-sun 的視覺差異：
 *   - 銀冷配色 vs 金暖配色
 *   - 留白更兇（spacing × 1.4）
 *   - 字級更小、tracking 更大（0.45em / 0.5em / 0.6em）
 *   - 標題用更細的 weight 300、襯線銳利
 *   - icon 山系（Mountain / Snowflake / Compass / Wind）
 *   - 座標感（N 01 / 04、GPS 風）取代序號
 *   - 不對稱 grid、不放分類膠囊
 *   - hover 只變線條色 / 字距、不 scale
 *   - 入場動畫慢一倍（0.9–1.4s、ease [0.16, 1, 0.3, 1]）
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet（globals.css 已 reset、列點用方塊 / 數字 / 座標）
 *   - 嚴格 8pt grid（spacing 用 2/4/6/8/12/16/20/24、再放大 1.2-1.5x）
 *   - 不寫 lorem ipsum
 *   - icon 不套圓框
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

// 比地中海慢、用更冷的 ease（更接近 ease-out、stiff to soft）
const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: 0.72,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

export default function AlpineSerenityDemo() {
  const [state, setState] = useState<State>({
    view: 'home',
    tourSlug: null,
    departureDate: null,
  });

  // view 切換捲到頂端
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
          <ListingView onSelectTour={goDetail} />
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
