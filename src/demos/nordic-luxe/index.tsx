'use client';

/**
 * 北歐極簡奢華 — Nordic Luxe
 *
 * 角落旅行社 demo #04。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：Treehotel（瑞典）、Arctic Bath、Juvet Landscape Hotel、Norm Architects、
 *      Vipp 居家、Sotheby's 北歐建築攝影
 * vibe：極簡到極端、奢華於無形、清冷而不冰冷、木材石頭實感、
 *      產品攝影般的精準、靜默有錢
 *
 * 配色（強制、勿改）：
 *   #FAFAF7  北歐米白（主背景）
 *   #E5E1D8  木紋灰（次要面）
 *   #7C7A73  石頭灰（強調 / metadata）
 *   #1C1B19  炭黑（文字）
 *
 * 跟 alpine-serenity 的關鍵差異（兩者都冷色歐美、但完全不同流派）：
 *   - 配色：alpine 銀冷藍灰、nordic 木米暖灰
 *   - 排版：alpine 不對稱 grid + 座標感、nordic 居中黃金 1:3 留白 + 圖下 caption
 *   - 字距：alpine 0.45-0.6em 大字距、nordic 0.3-0.4em 中字距更克制
 *   - 動畫：alpine 「線條 + tracking 變化」、nordic 「圖縮小 + caption fade」
 *   - 氣質：alpine 像探險前的露營地、nordic 像 hotel 大廳的下午
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet（globals.css 已 reset、列點用方塊 / 數字 / 細線）
 *   - 嚴格 8pt grid
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

// 比地中海慢、比 alpine 還柔；像窗外光線變化
const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: 0.78,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

export default function NordicLuxeDemo() {
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
