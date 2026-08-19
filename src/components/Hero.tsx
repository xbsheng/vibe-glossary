import { CATEGORIES, TERMS } from '../data/terms'
import SearchBar from './SearchBar'

interface Props {
  query: string
  onQueryChange: (q: string) => void
}

export default function Hero({ query, onQueryChange }: Props) {
  const copyableCount = TERMS.length
  return (
    <section className="px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-ink-3">
          VIBE CODING · 非程序员求生指南
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-[1.2] tracking-tight sm:text-5xl">
          AI 说的黑话，
          <span className="relative whitespace-nowrap text-accent">
            有人话版
            <svg
              className="absolute -bottom-1.5 left-0 w-full text-accent/40"
              viewBox="0 0 120 8"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M2 6C30 2 60 1 118 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          。
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
          当 AI 甩给你一个陌生术语，搜一下——知道它在说什么，
          <br className="hidden sm:block" />
          也知道你该怎么接话。
        </p>
        <div className="mt-8 text-left">
          <SearchBar query={query} onChange={onQueryChange} />
        </div>
        <dl className="mt-8 flex items-center justify-center gap-8 text-center sm:gap-12">
          {[
            [String(TERMS.length), '个词条'],
            [String(CATEGORIES.length), '类场景'],
            [String(copyableCount), '条可复制话术'],
          ].map(([num, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-serif text-2xl font-semibold text-ink">{num}</dd>
              <dd className="mt-0.5 text-xs text-ink-3">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
