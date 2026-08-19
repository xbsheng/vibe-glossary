import { CATEGORIES, TERMS } from '../data/terms'
import { PACKS } from '../data/scriptPacks'
import CopyButton from './CopyButton'

const TOTAL_SCRIPTS = PACKS.reduce((n, p) => n + p.scripts.length, 0)

export default function ScriptsPage() {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-ink-3">
            SCRIPTS · 直接抄作业
          </p>
          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            卡住的时候，直接抄作业。
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
            把〔……〕里的占位符换成你的真实情况，复制发给 AI 就行。
            这套话术覆盖新手最容易卡住的六个场景。
          </p>
          <dl className="mt-6 flex gap-8">
            {[
              [String(PACKS.length), '套话术'],
              [String(TOTAL_SCRIPTS), '条可直接复制'],
            ].map(([num, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-2xl font-semibold">{num}</dd>
                <dd className="mt-0.5 text-xs text-ink-3">{label}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          {PACKS.map((pack) => {
            const cat = CATEGORIES.find((c) => c.id === pack.cat)
            const related = pack.related
              .map((s) => TERMS.find((t) => t.slug === s))
              .filter((t) => Boolean(t))
            return (
              <article
                key={pack.id}
                className="flex flex-col rounded-2xl border border-line bg-card p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-xl font-semibold">{pack.name}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-3">
                      {pack.desc}
                    </p>
                  </div>
                  {cat && (
                    <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-deep">
                      {cat.name}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex-1 space-y-3">
                  {pack.scripts.map((s, i) => (
                    <div key={i} className="rounded-xl border border-line bg-paper p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-ink">{s.title}</p>
                        <CopyButton
                          text={s.text}
                          className="-mt-0.5 -mr-1 shrink-0"
                        />
                      </div>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>

                {related.length > 0 && (
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-xs text-ink-3">相关词条</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {related.map(
                        (r) =>
                          r && (
                            <a
                              key={r.slug}
                              href={`#/t/${r.slug}`}
                              className="rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                            >
                              {r.term}
                            </a>
                          ),
                      )}
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}