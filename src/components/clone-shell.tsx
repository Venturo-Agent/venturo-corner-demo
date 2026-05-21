'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { cloneMeta, type CloneMeta } from '@/clones/registry';

type Props = {
  current: CloneMeta;
  children: React.ReactNode;
};

export function CloneShell({ current, children }: Props) {
  const router = useRouter();
  const idx = cloneMeta.findIndex((c) => c.slug === current.slug);
  const prev = idx > 0 ? cloneMeta[idx - 1] : null;
  const next = idx < cloneMeta.length - 1 ? cloneMeta[idx + 1] : null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prev) router.push(`/clone/${prev.slug}`);
      if (e.key === 'ArrowRight' && next) router.push(`/clone/${next.slug}`);
      if (e.key === 'Escape') router.push('/clone');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router, prev, next]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-12 flex items-center justify-between gap-4">
          <Link
            href="/clone"
            className="font-mono text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← 克隆樣本集
          </Link>
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="font-mono text-xs text-neutral-400 shrink-0">
              CLONE {String(current.id).padStart(2, '0')} / {cloneMeta.length}
            </span>
            <span className="font-display text-sm text-neutral-900 truncate">
              {current.name}
            </span>
          </div>
          <nav className="flex items-center gap-1 font-mono text-xs">
            {prev ? (
              <Link
                href={`/clone/${prev.slug}`}
                className="px-3 py-1.5 hover:bg-neutral-100 transition-colors"
              >
                ← 上一個
              </Link>
            ) : (
              <span className="px-3 py-1.5 text-neutral-300">← 上一個</span>
            )}
            {next ? (
              <Link
                href={`/clone/${next.slug}`}
                className="px-3 py-1.5 hover:bg-neutral-100 transition-colors"
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
