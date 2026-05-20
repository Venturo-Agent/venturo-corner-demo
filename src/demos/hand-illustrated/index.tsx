'use client';

/**
 * 手繪插畫 — Hand Illustrated
 *
 * 角落旅行社 demo #14。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：Wes Anderson（Moonrise Kingdom、Grand Budapest Hotel、Asteroid City）、
 *       Anna Bond Rifle Paper、紐約客 New Yorker 雜誌封面、Maira Kalman、
 *       1960 年代復古旅遊海報、Atomic Age design
 *
 * vibe：手繪溫度 + 復古旅遊海報 + Wes Anderson 對稱 + 印章郵戳紙紋。
 *       像翻一本插畫家的私房旅行筆記。
 *
 * 配色（強制、勿改）：
 *   #FCF2E2 米杏紙（背景）
 *   #E89B4D 番茄橘（強調）
 *   #8A6FB8 薰衣草紫（次要 / 對比）
 *   #2F2235 墨葡紫（文字）
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符（SVG circle 是 shape、不算字符）
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet
 *   - 嚴格 8pt grid
 *   - 文案扣回「角落 + 手繪旅行筆記」
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

const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 16, rotate: -0.3 },
  animate: { opacity: 1, y: 0, rotate: 0 },
  exit: { opacity: 0, y: -8, rotate: 0.2 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

export default function HandIllustratedDemo() {
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

      {(state.view === 'detail' || state.view === 'itinerary') && !tour && (
        <motion.div key="fallback" {...PAGE_TRANSITION}>
          <HomeView onSelectTour={goDetail} onSeeAll={goListing} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
