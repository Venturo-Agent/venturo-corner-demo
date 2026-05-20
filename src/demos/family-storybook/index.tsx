'use client';

/**
 * 親子繪本 — Family Storybook
 *
 * 角落旅行社 demo #13。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：Tokyo DisneySea、Studio Ghibli Park、繪本作家荒井良二
 * vibe：童書翻頁感、暖橘藍配色、中產家庭買的繪本品味（不是迪士尼大批發）
 *
 * 配色（強制、勿改）：
 *   #FFE7D1 桃米橘（背景）
 *   #FFB347 童橘黃（強調）
 *   #5BA8D0 童藍（次要）
 *   #2B3C6B 故事夜藍（文字）
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符（裝飾字符）
 *   - 但可用 SVG shape（星星 / 雲 / 太陽 等實心 path）
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet
 *   - 嚴格 8pt grid
 *   - 不用 lorem、文案是「親子家庭」口吻
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
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: 0.55,
    // 繪本翻頁的 bounce — 不誇張、但有彈性
    ease: [0.34, 1.3, 0.64, 1] as [number, number, number, number],
  },
};

export default function FamilyStorybookDemo() {
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
