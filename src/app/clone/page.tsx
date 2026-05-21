import Link from 'next/link';
import {
  cloneMeta,
  clones,
  CLONE_PUBLISHED,
  CLONE_TOTAL_PLANNED,
} from '@/clones/registry';

const publishedSlugs = new Set(clones.map((c) => c.slug));

export default function CloneLandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <header className="mb-16 md:mb-20">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="font-mono text-xs text-neutral-500 hover:text-neutral-900"
          >
            ← 自由發想版
          </Link>
          <span className="font-mono text-xs text-neutral-400">/</span>
          <span className="font-mono text-xs text-neutral-900">
            Reference 克隆版
          </span>
        </div>
        <p className="font-display text-sm tracking-[0.4em] text-neutral-500 uppercase">
          Corner Travel — Reference Clones
        </p>
        <h1 className="font-display mt-6 text-4xl md:text-6xl font-light text-neutral-900 leading-tight">
          Reference 克隆
          <br />
          樣本集
        </h1>
        <p className="mt-8 max-w-2xl text-base md:text-lg text-neutral-700 leading-relaxed">
          {CLONE_TOTAL_PLANNED} 個 William 指定的 WordPress / ThemeForest theme、
          抓設計語言（配色 / 字型 / 排版 / hero pattern）後套漫途行程資料、
          不像素級 copy 避侵權。
        </p>
        <p className="mt-3 text-sm text-neutral-500">
          目前公開 {CLONE_PUBLISHED} / {CLONE_TOTAL_PLANNED} 個樣本（其餘陸續上架）。
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
        {cloneMeta.slice(0, CLONE_TOTAL_PLANNED).map((clone) => {
          const isPublished = publishedSlugs.has(clone.slug);
          const card = (
            <article className="group bg-white p-8 h-full flex flex-col transition-colors hover:bg-neutral-50">
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-xs text-neutral-400">
                  CLONE {String(clone.id).padStart(2, '0')}
                </span>
                <span className="font-display text-xs tracking-[0.2em] text-neutral-500 uppercase">
                  {clone.referenceSource.split('/')[0].trim()}
                </span>
              </div>
              <h2 className="font-display text-2xl text-neutral-900 mb-2 font-medium">
                {clone.name}
              </h2>
              <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
                {clone.tagline}
              </p>
              <p className="text-xs text-neutral-400 mb-6 font-mono break-all">
                {clone.referenceUrl.replace(/^https?:\/\//, '')}
              </p>
              <div className="mt-auto pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-2 mb-3">
                  {clone.paletteSwatches.map((color) => (
                    <span
                      key={color}
                      className="block w-6 h-6"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-500">
                  來源：{clone.referenceSource}
                </p>
              </div>
              <div className="mt-6">
                {isPublished ? (
                  <span className="font-display text-sm text-neutral-900 group-hover:underline underline-offset-4">
                    進入克隆 →
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
            <Link key={clone.slug} href={`/clone/${clone.slug}`} className="block">
              {card}
            </Link>
          ) : (
            <div key={clone.slug} className="opacity-60 cursor-not-allowed">
              {card}
            </div>
          );
        })}
      </section>

      <footer className="mt-20 pt-10 border-t border-neutral-200">
        <p className="font-mono text-xs text-neutral-400">
          VENTURO TRAVEL · INTERNAL · CLONE · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
