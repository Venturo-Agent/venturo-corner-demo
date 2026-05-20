import Link from 'next/link';
import { demoMeta, PUBLISHED_COUNT, TOTAL_PLANNED } from '@/demos/registry';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="mb-16 md:mb-20">
        <p className="font-display text-sm tracking-[0.4em] text-neutral-500 uppercase">
          Corner Travel — Design Showcase
        </p>
        <h1 className="font-display mt-6 text-4xl md:text-6xl font-light text-neutral-900 leading-tight">
          角落旅行社
          <br />
          設計樣本集
        </h1>
        <p className="mt-8 max-w-2xl text-base md:text-lg text-neutral-700 leading-relaxed">
          {TOTAL_PLANNED} 個設計方向、同一批行程，給漫途旅遊內部評選用。
          每個樣本都是完整的小網站：首頁、行程列表、行程詳情、每日日程、報名頁。
          點任一張卡進入，左右切換可比較。
        </p>
        <p className="mt-3 text-sm text-neutral-500">
          目前公開 {PUBLISHED_COUNT} / {TOTAL_PLANNED} 個樣本（其餘陸續上架）。
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
        {demoMeta.slice(0, TOTAL_PLANNED).map((demo) => {
          const isPublished = ['mediterranean-sun'].includes(demo.slug);
          const card = (
            <article className="group bg-white p-8 h-full flex flex-col transition-colors hover:bg-neutral-50">
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-xs text-neutral-400">
                  {String(demo.id).padStart(2, '0')}
                </span>
                <span className="font-display text-xs tracking-[0.2em] text-neutral-500 uppercase">
                  {demo.categoryLabel}
                </span>
              </div>
              <h2 className="font-display text-2xl text-neutral-900 mb-2 font-medium">
                {demo.name}
              </h2>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                {demo.tagline}
              </p>
              <div className="mt-auto pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-2 mb-3">
                  {demo.paletteSwatches.map((color) => (
                    <span
                      key={color}
                      className="block w-6 h-6 rounded-none"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-500">
                  靈感：{demo.inspiration}
                </p>
              </div>
              <div className="mt-6">
                {isPublished ? (
                  <span className="font-display text-sm text-neutral-900 group-hover:underline underline-offset-4">
                    進入樣本 →
                  </span>
                ) : (
                  <span className="font-display text-sm text-neutral-400">
                    準備中
                  </span>
                )}
              </div>
            </article>
          );
          return isPublished ? (
            <Link key={demo.slug} href={`/demo/${demo.slug}`} className="block">
              {card}
            </Link>
          ) : (
            <div key={demo.slug} className="opacity-60 cursor-not-allowed">
              {card}
            </div>
          );
        })}
      </section>

      <footer className="mt-20 pt-10 border-t border-neutral-200">
        <p className="font-mono text-xs text-neutral-400">
          VENTURO TRAVEL · INTERNAL · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
