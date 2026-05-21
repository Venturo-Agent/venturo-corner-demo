import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  findCloneBySlug,
  findCloneMetaBySlug,
  cloneMeta,
} from '@/clones/registry';
import { CloneShell } from '@/components/clone-shell';

type Params = { slug: string };

export async function generateStaticParams() {
  return cloneMeta.map((c) => ({ slug: c.slug }));
}

export default async function ClonePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = findCloneBySlug(slug);
  const meta = findCloneMetaBySlug(slug);

  if (!meta) notFound();

  if (!entry) {
    return (
      <CloneShell current={meta}>
        <main className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-lg">
            <p className="font-mono text-xs text-neutral-400 mb-4">
              CLONE {String(meta.id).padStart(2, '0')} · {meta.referenceSource}
            </p>
            <h1 className="font-display text-3xl text-neutral-900 mb-3">
              {meta.name}
            </h1>
            <p className="text-neutral-600 mb-2">{meta.tagline}</p>
            <p className="text-xs text-neutral-400 mb-8 font-mono break-all">
              {meta.referenceUrl}
            </p>
            <p className="text-sm text-neutral-500">
              此克隆樣本仍在製作中、預計近日上架。
            </p>
          </div>
        </main>
      </CloneShell>
    );
  }

  const CloneComponent = entry.component;

  return (
    <CloneShell current={meta}>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="font-mono text-xs text-neutral-400">載入中…</p>
          </div>
        }
      >
        <CloneComponent />
      </Suspense>
    </CloneShell>
  );
}
