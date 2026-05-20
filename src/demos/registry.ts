/**
 * 12 個 demo 註冊表 — 順序就是切換器的「上一頁 / 下一頁」順序。
 *
 * 各 demo 的 React component 在 src/demos/<slug>/index.tsx，
 * 走動態 import 避免一次 bundle 全部。
 */

import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

export type DemoCategory =
  | 'european-luxury'
  | 'japanese-minimal'
  | 'japanese-luxury'
  | 'island-resort'
  | 'playful';

export type DemoMeta = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  category: DemoCategory;
  categoryLabel: string;
  inspiration: string;
  paletteSwatches: string[];
};

export type DemoEntry = DemoMeta & {
  component: LazyExoticComponent<ComponentType<unknown>>;
};

const meta: DemoMeta[] = [
  {
    id: 1,
    slug: 'mediterranean-sun',
    name: '地中海陽光',
    tagline: '橄欖樹下的蔚藍午後',
    category: 'european-luxury',
    categoryLabel: '歐美高質感',
    inspiration: 'Aman Costa Brava、Villa Treville',
    paletteSwatches: ['#F4E9D8', '#D9B382', '#3E5B7C', '#1B2A3A'],
  },
  {
    id: 2,
    slug: 'mediterranean-villa',
    name: '地中海莊園',
    tagline: '私人莊園的緩慢時光',
    category: 'european-luxury',
    categoryLabel: '歐美高質感',
    inspiration: 'Borgo Egnazia、Masseria San Domenico',
    paletteSwatches: ['#EEE6D7', '#A77E5C', '#5A4632', '#21181C'],
  },
  {
    id: 3,
    slug: 'alpine-serenity',
    name: '阿爾卑斯靜謐',
    tagline: '雪線之上的安靜',
    category: 'european-luxury',
    categoryLabel: '歐美高質感',
    inspiration: 'Aman Le Mélézin、Six Senses Crans-Montana',
    paletteSwatches: ['#F8F9FB', '#CBD5E0', '#5F6F86', '#1A2433'],
  },
  {
    id: 4,
    slug: 'nordic-luxe',
    name: '北歐極簡奢華',
    tagline: '簡單到極致的尊貴',
    category: 'european-luxury',
    categoryLabel: '歐美高質感',
    inspiration: 'Treehotel、Arctic Bath',
    paletteSwatches: ['#FAFAF7', '#E5E1D8', '#7C7A73', '#1C1B19'],
  },
  {
    id: 5,
    slug: 'manhattan-editorial',
    name: '紐約都會品味',
    tagline: '雜誌封面式的旅行',
    category: 'european-luxury',
    categoryLabel: '歐美高質感',
    inspiration: 'The Standard High Line、Condé Nast Traveler',
    paletteSwatches: ['#FFFFFF', '#111111', '#C4A678', '#444444'],
  },
  {
    id: 6,
    slug: 'parisian-haute',
    name: '巴黎高訂風',
    tagline: '香榭大道的優雅',
    category: 'european-luxury',
    categoryLabel: '歐美高質感',
    inspiration: 'Le Bristol、Hôtel de Crillon',
    paletteSwatches: ['#F8F2EA', '#D9C3A1', '#7E5238', '#1D1816'],
  },
  {
    id: 7,
    slug: 'muji-stillness',
    name: '無印靜物',
    tagline: '日常即是風景',
    category: 'japanese-minimal',
    categoryLabel: '日系極簡',
    inspiration: 'MUJI Hotel、Found MUJI',
    paletteSwatches: ['#F5F2EC', '#D7CFC1', '#7C7166', '#2A2722'],
  },
  {
    id: 8,
    slug: 'tsutaya-archive',
    name: '蔦屋書屋',
    tagline: '一本書、一杯茶、一個下午',
    category: 'japanese-minimal',
    categoryLabel: '日系極簡',
    inspiration: 'Tsutaya Daikanyama、T-Site',
    paletteSwatches: ['#FDFBF6', '#E1D3B4', '#3A352D', '#0E0C09'],
  },
  {
    id: 9,
    slug: 'hoshinoya-onsen',
    name: '虹夕諾雅 溫泉',
    tagline: '湯氣裡的千年京都',
    category: 'japanese-luxury',
    categoryLabel: '日系奢華',
    inspiration: 'Hoshinoya Kyoto、Tawaraya Ryokan',
    paletteSwatches: ['#F6EDE0', '#C29A6A', '#634837', '#1A0F08'],
  },
  {
    id: 10,
    slug: 'aman-eastern',
    name: '安縵東方',
    tagline: '極致留白、奢華於無形',
    category: 'japanese-luxury',
    categoryLabel: '日系奢華',
    inspiration: 'Aman Tokyo、Aman Kyoto',
    paletteSwatches: ['#F7F4EC', '#BFA77E', '#3D352A', '#0B0908'],
  },
  {
    id: 11,
    slug: 'maldives-whitesand',
    name: '馬爾地夫白沙',
    tagline: '只有海、天、與我們',
    category: 'island-resort',
    categoryLabel: '海島渡假',
    inspiration: 'Soneva Jani、Cheval Blanc Randheli',
    paletteSwatches: ['#F0F8FA', '#A8D5DD', '#3E8C9A', '#0E3D49'],
  },
  {
    id: 12,
    slug: 'bali-tropical',
    name: '巴里島熱帶',
    tagline: '叢林、稻田、香料、慢時光',
    category: 'island-resort',
    categoryLabel: '海島渡假',
    inspiration: 'Bambu Indah、COMO Shambhala',
    paletteSwatches: ['#F4ECE0', '#D8A66B', '#5A6F3F', '#252012'],
  },
  {
    id: 13,
    slug: 'family-storybook',
    name: '親子繪本',
    tagline: '帶孩子走進故事書',
    category: 'playful',
    categoryLabel: '活潑童趣',
    inspiration: 'Tokyo DisneySea、Studio Ghibli Park',
    paletteSwatches: ['#FFE7D1', '#FFB347', '#5BA8D0', '#2B3C6B'],
  },
  {
    id: 14,
    slug: 'hand-illustrated',
    name: '手繪插畫',
    tagline: '像翻一本旅行筆記',
    category: 'playful',
    categoryLabel: '活潑童趣',
    inspiration: 'Wes Anderson、Moonrise Kingdom',
    paletteSwatches: ['#FCF2E2', '#E89B4D', '#8A6FB8', '#2F2235'],
  },
];

const components: Record<string, LazyExoticComponent<ComponentType<unknown>>> = {
  'mediterranean-sun': lazy(() => import('./mediterranean-sun')),
  'alpine-serenity': lazy(() => import('./alpine-serenity')),
  'muji-stillness': lazy(() => import('./muji-stillness')),
  'maldives-whitesand': lazy(() => import('./maldives-whitesand')),
  'manhattan-editorial': lazy(() => import('./manhattan-editorial')),
  'tsutaya-archive': lazy(() => import('./tsutaya-archive')),
  'bali-tropical': lazy(() => import('./bali-tropical')),
  'nordic-luxe': lazy(() => import('./nordic-luxe')),
  'hoshinoya-onsen': lazy(() => import('./hoshinoya-onsen')),
  'aman-eastern': lazy(() => import('./aman-eastern')),
  'family-storybook': lazy(() => import('./family-storybook')),
  'hand-illustrated': lazy(() => import('./hand-illustrated')),
};

export const demos: DemoEntry[] = meta
  .filter((entry) => components[entry.slug])
  .map((entry) => ({ ...entry, component: components[entry.slug]! }));

export const demoMeta: DemoMeta[] = meta;

export const findDemoBySlug = (slug: string) =>
  demos.find((demo) => demo.slug === slug);
export const findDemoMetaBySlug = (slug: string) =>
  meta.find((demo) => demo.slug === slug);

export const PUBLISHED_COUNT = demos.length;
export const TOTAL_PLANNED = 12;
