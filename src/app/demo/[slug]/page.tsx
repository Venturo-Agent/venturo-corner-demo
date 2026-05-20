import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  findDemoBySlug,
  findDemoMetaBySlug,
  demoMeta,
} from '@/demos/registry';
import { DemoShell } from '@/components/demo-shell';

type Params = { slug: string };

export async function generateStaticParams() {
  return demoMeta.map((d) => ({ slug: d.slug }));
}

export default async function DemoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = findDemoBySlug(slug);
  const meta = findDemoMetaBySlug(slug);

  if (!meta) notFound();

  if (!entry) {
    return (
      <DemoShell current={meta}>
        <main className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-lg">
            <p className="font-mono text-xs text-neutral-400 mb-4">
              {String(meta.id).padStart(2, '0')} · {meta.categoryLabel}
            </p>
            <h1 className="font-display text-3xl text-neutral-900 mb-3">
              {meta.name}
            </h1>
            <p className="text-neutral-600 mb-8">{meta.tagline}</p>
            <p className="text-sm text-neutral-500">
              此樣本仍在製作中，預計近日上架。
            </p>
          </div>
        </main>
      </DemoShell>
    );
  }

  const DemoComponent = entry.component;

  return (
    <DemoShell current={meta}>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="font-mono text-xs text-neutral-400">載入中…</p>
          </div>
        }
      >
        <DemoComponent />
      </Suspense>
    </DemoShell>
  );
}
