import { useState } from 'react'
import { CATEGORIES, TERMS, type Term } from '../data/terms'
import { navigateToList, navigateToTerm } from '../lib/hash-route'
import {
  ArrowLeftIcon,
  BookmarkIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
} from './icons'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // 剪贴板不可用时静默失败
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <button
      onClick={copy}
      aria-label={copied ? '已复制' : '复制这段话'}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
        copied
          ? 'border-accent/40 bg-accent-soft text-accent-deep'
          : 'border-line bg-card text-ink-2 hover:border-line-strong hover:text-ink'
      }`}
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
      {copied ? '已复制' : '复制'}
    </button>
  )
}

function Section({
  no,
  title,
  children,
}: {
  no: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h3 className="mb-3 flex items-center gap-2.5">
        <span className="font-mono text-xs font-semibold tracking-widest text-accent">
          {no}
        </span>
        <span className="text-sm font-semibold tracking-wide text-ink">{title}</span>
        <span className="h-px flex-1 bg-line" />
      </h3>
      {children}
    </section>
  )
}

export default function TermDetail({
  slug,
  saved,
  onToggleSave,
}: {
  slug: string
  saved: boolean
  onToggleSave: (slug: string) => void
}) {
  const term = TERMS.find((t) => t.slug === slug)
  if (!term) return null

  const related = term.related
    .map((s) => TERMS.find((t) => t.slug === s))
    .filter((t): t is Term => Boolean(t))

  const catNames = term.categories
    .map((id) => CATEGORIES.find((c) => c.id === id)?.name)
    .filter(Boolean)

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={navigateToList}
          className="mb-8 flex items-center gap-1.5 text-sm text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          返回词条库
        </button>

        <header>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {catNames.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-line bg-card px-2.5 py-0.5 text-xs text-ink-2"
                  >
                    {n}
                  </span>
                ))}
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    term.difficulty === 'advanced'
                      ? 'border border-accent/30 bg-accent-soft text-accent-deep'
                      : 'bg-ink/5 text-ink-2'
                  }`}
                >
                  {term.difficulty === 'advanced' ? '进阶' : '入门'}
                </span>
              </div>
              <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                {term.term}
              </h1>
              <p className="mt-2 font-mono text-sm text-ink-3">{term.en}</p>
            </div>
            <button
              onClick={() => onToggleSave(term.slug)}
              aria-pressed={saved}
              className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                saved
                  ? 'border-accent/40 bg-accent-soft text-accent-deep'
                  : 'border-line bg-card text-ink-2 hover:border-line-strong hover:text-ink'
              }`}
            >
              <BookmarkIcon filled={saved} className="h-4 w-4" />
              {saved ? '已收藏' : '收藏'}
            </button>
          </div>
        </header>

        <blockquote className="mt-8 border-l-2 border-accent pl-5">
          <p className="font-serif text-lg leading-relaxed text-ink sm:text-xl">
            {term.plain}
          </p>
        </blockquote>

        <div className="mt-12 space-y-10">
          <Section no="01" title="什么时候你会碰到">
            <p className="text-[15px] leading-relaxed text-ink-2">{term.when}</p>
          </Section>

          <Section no="02" title="怎么跟 AI 说">
            <div className="relative rounded-2xl border border-line bg-card p-5">
              <div className="absolute right-4 top-4">
                <CopyButton text={term.howToSay} />
              </div>
              <p className="pr-16 text-[15px] leading-relaxed text-ink">
                “{term.howToSay}”
              </p>
            </div>
            <p className="mt-3 text-xs text-ink-3">
              直接复制发给 AI 即可。你完全不用理解技术细节——让 AI 按它的领域知识帮你翻译。
            </p>
          </Section>

          <Section no="03" title="相关词条">
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => navigateToTerm(r.slug)}
                  className="group flex items-center gap-1 rounded-full border border-line bg-card px-3.5 py-2 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                >
                  {r.term}
                  <ChevronRightIcon className="h-3.5 w-3.5 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
