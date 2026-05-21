/**
 * Reference 克隆版 — 12 個 William 指定的 WordPress / ThemeForest theme
 * 各做一個克隆 demo（抓設計語言、套漫途行程資料、不像素級 copy）。
 *
 * 對比：src/demos/registry.ts 是「自由發想版」、各自獨立流派；
 * 這裡是「Reference 克隆版」、每個 demo 對應一個真實 URL。
 */

import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

export type CloneMeta = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  referenceUrl: string;
  referenceSource: string;
  paletteSwatches: string[];
};

export type CloneEntry = CloneMeta & {
  component: LazyExoticComponent<ComponentType<unknown>>;
};

const meta: CloneMeta[] = [
  {
    id: 1,
    slug: 'clone-wanderaway-dolomites',
    name: 'WanderAway Dolomites',
    tagline: '山岳清晨溫暖光的奢華旅遊雜誌',
    referenceUrl: 'https://wanderaway.qodeinteractive.com/dolomites/',
    referenceSource: 'WanderAway / Qode Interactive',
    paletteSwatches: ['#FCEFDF', '#A6C5A9', '#385B21', '#1A1A1A'],
  },
  {
    id: 2,
    slug: 'clone-wanderaway-uluwatu',
    name: 'WanderAway Uluwatu',
    tagline: '峇里島衝浪海島生活風',
    referenceUrl: 'https://wanderaway.qodeinteractive.com/uluwatu/',
    referenceSource: 'WanderAway / Qode Interactive',
    paletteSwatches: ['#F9F2E7', '#D2B48C', '#2C5F7C', '#0F2027'],
  },
  {
    id: 3,
    slug: 'clone-nicdark-wild',
    name: 'Nicdark Wild Travel',
    tagline: '高級冒險度假感、黑金調性',
    referenceUrl: 'https://travel.nicdark.com/wild-wordpress-theme/',
    referenceSource: 'Nicdark / WordPress Theme',
    paletteSwatches: ['#1A1A1A', '#D4AF37', '#F5F5F5', '#666666'],
  },
  {
    id: 4,
    slug: 'clone-nicdark-agency',
    name: 'Nicdark Travel Agency',
    tagline: '經典旅行社網站、品牌專業感',
    referenceUrl: 'https://travel.nicdark.com/travel-agency-wordpress-theme/',
    referenceSource: 'Nicdark / WordPress Theme',
    paletteSwatches: ['#FFFFFF', '#0099CC', '#FF6B35', '#333333'],
  },
  {
    id: 5,
    slug: 'clone-themeforest-altair',
    name: 'Altair Tour & Travel',
    tagline: '完整旅遊代理商風、套票結構',
    referenceUrl:
      'https://preview.themeforest.net/item/tour-travel-agency-altair-theme/full_screen_preview/9318575',
    referenceSource: 'ThemeForest / Altair',
    paletteSwatches: ['#FFFFFF', '#FFC857', '#119DA4', '#19647E'],
  },
  {
    id: 6,
    slug: 'clone-themeforest-getaway',
    name: 'Getaway Upbeat Travel',
    tagline: '輕快、年輕感、夢幻調色',
    referenceUrl:
      'https://preview.themeforest.net/item/getaway-an-upbeat-travel-and-tourism-theme/full_screen_preview/20719616',
    referenceSource: 'ThemeForest / Getaway',
    paletteSwatches: ['#FFE5D9', '#FFCAD4', '#9D8189', '#293241'],
  },
  {
    id: 7,
    slug: 'clone-vagabonds-home5',
    name: 'Vagabonds Home 5',
    tagline: '生活風旅遊部落格、藝術感',
    referenceUrl: 'https://vagabonds.axiomthemes.com/home-5/',
    referenceSource: 'Vagabonds / Axiom Themes',
    paletteSwatches: ['#F4F1ED', '#C9A86B', '#3B3A36', '#161514'],
  },
  {
    id: 8,
    slug: 'clone-vagabonds-personal',
    name: 'Vagabonds Personal Blog',
    tagline: '個人旅遊 vlogger 部落格風',
    referenceUrl:
      'https://preview.themeforest.net/item/vagabonds-personal-travel-lifestyle-blog-wordpress-theme/full_screen_preview/22655756',
    referenceSource: 'ThemeForest / Vagabonds Blog',
    paletteSwatches: ['#FAF7F2', '#E8DCC4', '#7C6F5A', '#2D261C'],
  },
  {
    id: 9,
    slug: 'clone-taza-booking',
    name: 'Taza Travel & Hotel Booking',
    tagline: '完整旅館訂房系統 UI',
    referenceUrl: 'https://themeforest.net/item/taza-travel-hotel-booking-wordpress-theme/56549144',
    referenceSource: 'ThemeForest / Taza',
    paletteSwatches: ['#FFFFFF', '#00B894', '#FDCB6E', '#2D3436'],
  },
  {
    id: 10,
    slug: 'clone-diveit',
    name: 'DiveIt Scuba School',
    tagline: '潛水學校 / 海洋探險感',
    referenceUrl: 'https://themeforest.net/item/diveit-scuba-diving-school-wordpress-theme/16978449',
    referenceSource: 'ThemeForest / DiveIt',
    paletteSwatches: ['#0A2540', '#00A8CC', '#F4F4F4', '#FFB400'],
  },
  {
    id: 11,
    slug: 'clone-nicdark-intro-demo01',
    name: 'Nicdark Intro Demo 01',
    tagline: 'Hero 海報式旅遊主視覺',
    referenceUrl: 'https://travel.nicdark.com/intro/img/demos/demo-01.jpeg',
    referenceSource: 'Nicdark / Travel Demo 01 Image',
    paletteSwatches: ['#F8E5D0', '#E07A5F', '#3D405B', '#81B29A'],
  },
  {
    id: 12,
    slug: 'clone-nicdark-intro-page',
    name: 'Nicdark Intro Showcase',
    tagline: 'Theme 展示頁、多 demo 並陳',
    referenceUrl: 'https://travel.nicdark.com/',
    referenceSource: 'Nicdark / Travel Intro',
    paletteSwatches: ['#FFFFFF', '#FF6B6B', '#4ECDC4', '#1A535C'],
  },
];

const components: Record<string, LazyExoticComponent<ComponentType<unknown>>> = {
  'clone-wanderaway-dolomites': lazy(
    () => import('./clone-wanderaway-dolomites-shim'),
  ),
};

export const clones: CloneEntry[] = meta
  .filter((entry) => components[entry.slug])
  .map((entry) => ({ ...entry, component: components[entry.slug]! }));

export const cloneMeta: CloneMeta[] = meta;

export const findCloneBySlug = (slug: string) =>
  clones.find((c) => c.slug === slug);
export const findCloneMetaBySlug = (slug: string) =>
  meta.find((c) => c.slug === slug);

export const CLONE_PUBLISHED = clones.length;
export const CLONE_TOTAL_PLANNED = 12;
