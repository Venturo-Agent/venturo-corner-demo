'use client';

/**
 * 虹夕諾雅 溫泉 — Hoshinoya Onsen
 *
 * 角落旅行社 demo #09。完整 5 view 小網站：
 *   home → listing → detail → itinerary → signup
 *
 * 靈感：虹夕諾雅（京都 / 富士 / 軽井沢 / 谷關）、俵屋旅館、宿守仍坐
 * vibe：日式湯氣繚繞奢華、千年京都的厚重底色、木與紙的東方優雅、紙燈籠下的深木夜
 *
 * 跟 muji-stillness（日系極簡工業）的對比：
 *   - muji 是工業 catalog 禁慾感 → 我這裡是 ryokan 旅館迎賓溫度
 *   - muji 配色冷白中性（#F5F2EC）→ 我這裡是米紙暖（#F6EDE0）+ 燈芯紅褐 + 深木
 *   - muji 動畫純 fade、duration 0.4s → 我這裡「拉開紙門」slide+fade、duration 0.6s
 *   - muji 規則網格、單元統一 → 我這裡直幅掛軸感、配紙燈籠 / 麻葉紋裝飾
 *   - muji 編號工業 mono「001」→ 我這裡漢字「第一帖」「客室 一號」
 *
 * 跟 tsutaya-archive（日系書店人文）的對比：
 *   - 蔦屋是書店人文知識感 → 我這裡是旅館湯氣感官感
 *   - 蔦屋米紙黃書頁色 → 我這裡米紙暖 + 燈火紅褐（更深、更暖）
 *   - 蔦屋翻書頁 horizontal slide → 我這裡「拉門」slide + 紙門開啟感
 *   - 蔦屋編號「卷 一」「藏書 042」書頁感 → 我這裡「第一帖」「客室 一號」旅館感
 *   - 蔦屋分類「文學紀行」書店分類 → 我這裡「京町客室」客室分類
 *   - 蔦屋圖說「圖 01」→ 我這裡「壱號圖」毛筆感
 *
 * 配色（強制、勿改）：
 *   #F6EDE0 米紙暖（背景）
 *   #C29A6A 燈芯紅褐（強調）
 *   #634837 深木褐（次要面）
 *   #1A0F08 漆黑（文字）
 *
 * 紅線：
 *   - 不用 • ● ◦ 字符
 *   - 不用 italic（globals.css 已 reset）
 *   - 不用 ul/ol bullet
 *   - 嚴格 8pt grid
 *   - icon 不套圓框
 *   - 不抄 muji / tsutaya 文案、扣回「掌櫃迎賓」品牌
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

// 拉開紙門動畫：右側水平滑入（拉門感）+ fade、duration 0.6s
// 跟 muji（純 fade 0.4s）對比：有紙門打開的方向感
// 跟 tsutaya（橫向 24px slide 0.55s 翻頁感）對比：滑距更大、duration 更長、有「拉開」實體感
const PAGE_TRANSITION = {
  initial: { opacity: 0, x: 36 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function HoshinoyaOnsenDemo() {
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
