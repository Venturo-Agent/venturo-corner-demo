'use client';

/**
 * 巴里島熱帶 — Bali Tropical
 *
 * 角落旅行社 demo #12。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：Bambu Indah、COMO Shambhala Ubud、Four Seasons Sayan、
 *      Vogue「Bali Retreat」photo essay、Living Etc 熱帶住宅
 * vibe：叢林深處、稻田梯田、香料市場、慢時光、原住民工藝、SPA 與冥想
 *
 * 跟 maldives-whitesand 完全不同氣質：
 *   maldives = 海洋 / 鹽分 / 漂浮 / 留白 / 極簡奢侈
 *   bali    = 叢林 / 香料 / 紋路 / 工藝 / 踏實土地溫度
 *
 * 配色（強制、勿改）：
 *   #F4ECE0 椰殼米（背景）
 *   #D8A66B 香料金（強調）
 *   #5A6F3F 叢林綠（次要）
 *   #252012 木刻棕（文字）
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet（用葉脈 / 數字印章）
 *   - 嚴格 8pt grid
 *   - 不寫 lorem ipsum、文案扣回角落 + 巴里島工藝
 *
 * 入場手法：
 *   - PAGE_TRANSITION 用 clip-path「捲簾」式 reveal、不是 maldives 那種往上浮
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

// 「捲簾」式進場 — clip-path 從上方拉開、跟 maldives 的 y-fade 不同
const PAGE_TRANSITION = {
  initial: { clipPath: 'inset(0 0 100% 0)', opacity: 0.6 },
  animate: { clipPath: 'inset(0 0 0% 0)', opacity: 1 },
  exit: { clipPath: 'inset(100% 0 0 0)', opacity: 0.6 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export default function BaliTropicalDemo() {
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
      departureDate: prev.tourSlug === slug ? prev.departureDate : null,
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
  // fallback 用蜜月（巴里熱帶 demo 主推蜜月與小團文化）
  const honeymoonTour =
    tours.find((t) => t.slug === 'maldives-honeymoon') ?? tours[0];
  const fallbackTour = tour ?? honeymoonTour;

  return (
    <AnimatePresence mode="wait">
      {state.view === 'home' && (
        <motion.div key="home" {...PAGE_TRANSITION}>
          <HomeView onSelectTour={goDetail} onSeeAll={goListing} />
        </motion.div>
      )}

      {state.view === 'listing' && (
        <motion.div key="listing" {...PAGE_TRANSITION}>
          <ListingView onSelectTour={goDetail} onBack={goHome} />
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
