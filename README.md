# venturo-corner-demo — 角落旅行社設計樣本集

漫途旅遊（VENTURO）旗下對外品牌「角落旅行社」的設計 demo 集。
12 個風格方向、同一批 mock 行程、給漫途內部評選用。

## 啟動

```bash
npm install
npm run dev    # http://localhost:3100
```

## 結構

- `src/app/page.tsx` — landing：12 個 demo 卡片網格
- `src/app/demo/[slug]/page.tsx` — demo 路由 wrapper（含切換 shell）
- `src/components/demo-shell.tsx` — 頂部切換器（← →、ESC 回首頁）
- `src/demos/registry.ts` — 12 個 demo metadata + lazy import
- `src/demos/<slug>/` — 各風格 demo 實作（5 個 internal view）
- `src/data/mock-tours.ts` — 4 條共用 mock 行程（京都 / 紐西蘭 / 馬爾地夫 / 北歐）

## 設計紅線（William 拍板、不准違反）

1. 不用 `•` `●` `◦` 圓點字符（裝飾 / 句末 / 標題下 separator / bullet 一律不行）
2. 不用斜體（不寫 `italic`、不用 `<em>` `<i>` `<cite>` `<dfn>`、globals.css 已 reset）
3. 嚴格對齊 + 嚴格留白（8pt grid、spacing 用偶數 2/4/6/8/12/16/20/24）
4. 不用 ul/ol 內建 marker（用方塊 / 數字 / 線條 / icon 自製）
5. 不寫 lorem ipsum、所有文案扣回「角落旅行社」品牌真實可信

## 12 風格分配

| 類別 | 數量 | 細項 |
|---|---:|---|
| 歐美高質感 | 4 | 地中海陽光 / 阿爾卑斯靜謐 / 北歐極簡奢華 / 紐約都會品味 |
| 日系極簡 | 2 | 無印 / 蔦屋 |
| 日系奢華 | 2 | 虹夕諾雅 / 安縵 |
| 海島渡假 | 2 | 馬爾地夫白沙 / 巴里島熱帶 |
| 活潑童趣 | 2 | 親子繪本 / 手繪插畫 |

（registry 列 14 筆是為了顯示分配選項、實際上線取前 12）

## 部署

- GitHub: `Venturo-Agent/venturo-corner-demo`
- 平台: Vultr + Coolify
- 預設網域: `demo.venturo.tw`

## 技術 stack

- Next.js 16 (App Router、Turbopack)
- React 19
- Tailwind CSS 4
- Framer Motion 12
- lucide-react（icon、不套圓框）
- TypeScript strict
