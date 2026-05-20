'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { demoMeta, type DemoMeta } from '@/demos/registry';

type Props = {
  current: DemoMeta;
  children: React.ReactNode;
};

export function DemoShell({ current, children }: Props) {
  const router = useRouter();
  const idx = demoMeta.findIndex((d) => d.slug === current.slug);
  const prev = idx > 0 ? demoMeta[idx - 1] : null;
  const next = idx < demoMeta.length - 1 ? demoMeta[idx + 1] : null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prev) router.push(`/demo/${prev.slug}`);
      if (e.key === 'ArrowRight' && next) router.push(`/demo/${next.slug}`);
      if (e.key === 'Escape') router.push('/');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router, prev, next]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-12 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← 全部樣本
          </Link>
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-mono text-xs text-neutral-400 shrink-0">
              {String(current.id).padStart(2, '0')} / {demoMeta.length}
            </span>
            <span className="font-display text-sm text-neutral-900 truncate">
              {current.name}
            </span>
            <span className="font-display text-xs text-neutral-400 hidden md:inline truncate">
              {current.categoryLabel}
            </span>
          </div>
          <nav className="flex items-center gap-1 font-mono text-xs">
            {prev ? (
              <Link
                href={`/demo/${prev.slug}`}
                className="px-3 py-1.5 hover:bg-neutral-100 transition-colors"
                aria-label={`上一個樣本：${prev.name}`}
              >
                ← 上一個
              </Link>
            ) : (
              <span className="px-3 py-1.5 text-neutral-300">← 上一個</span>
            )}
            {next ? (
              <Link
                href={`/demo/${next.slug}`}
                className="px-3 py-1.5 hover:bg-neutral-100 transition-colors"
                aria-label={`下一個樣本：${next.name}`}
              >
                下一個 →
              </Link>
            ) : (
              <span className="px-3 py-1.5 text-neutral-300">下一個 →</span>
            )}
          </nav>
        </div>
      </header>
      <div className="pt-12">{children}</div>
    </>
  );
}
