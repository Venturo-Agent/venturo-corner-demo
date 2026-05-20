'use client';

/**
 * 馬爾地夫白沙 — Maldives Whitesand
 *
 * 角落旅行社 demo #11。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：Soneva Jani、Cheval Blanc Randheli、Conrad Maldives Rangali
 * vibe：海天無邊、白沙細軟、奶藍色海、慵懶日光
 * 跟 mediterranean-sun 完全不同 — 那個是文化沉澱、這個是抹除時間
 *
 * 配色（強制、勿改）：
 *   #F0F8FA  雲海白（背景）
 *   #A8D5DD  奶藍（次要面）
 *   #3E8C9A  海洋藍（強調）
 *   #0E3D49  深海墨（文字）
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet（globals.css 已 reset、列點用方塊 / 數字）
 *   - 嚴格 8pt grid
 *   - 不寫 lorem ipsum、文案扣回角落品牌真實可信
 *
 * 設計手法：
 *   - hero 文字微浮動 loop animation（像漂浮）
 *   - scroll hero 圖微 parallax 沉入
 *   - 大量水平線當 separator（像海平面）
 *   - spacing 比 mediterranean-sun 更寬鬆（給天空位置）
 *   - 字體 300 light + 大字距、不要重壓
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

// 入場 0.6s ease-out（William 規範）
const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function MaldivesWhitesandDemo() {
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
  // fallback 用馬爾地夫蜜月（這是海島 demo 的主推）
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
