import { CATEGORIES, type Term } from '../data/terms'
import { Highlight } from '../lib/search'
import { BookmarkIcon, ChevronRightIcon } from './icons'

export default function TermCard({
  term,
  query,
  saved,
  onToggleSave,
}: {
  term: Term
  query: string
  saved: boolean
  onToggleSave: (slug: string) => void
}) {
  const catNames = term.categories
    .map((id) => CATEGORIES.find((c) => c.id === id)?.name)
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="group relative h-full">
      <a
        href={`#/t/${term.slug}`}
        className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_8px_24px_-12px_rgba(34,30,25,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <h3 className="pr-8 truncate font-serif text-lg font-semibold">
          <Highlight text={term.term} query={query} />
        </h3>
        <p className="mt-0.5 pr-8 truncate font-mono text-xs text-ink-3">{term.en}</p>

        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-ink-2">
          <Highlight text={term.plain} query={query} />
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3.5">
          <span className="flex min-w-0 items-center gap-2">
            <span className="truncate text-xs text-ink-3">{catNames}</span>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                term.difficulty === 'advanced'
                  ? 'border border-accent/30 bg-accent-soft text-accent-deep'
                  : 'bg-ink/5 text-ink-2'
              }`}
            >
              {term.difficulty === 'advanced' ? '进阶' : '入门'}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
            怎么接话
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </a>

      <button
        onClick={() => onToggleSave(term.slug)}
        aria-pressed={saved}
        aria-label={saved ? `从生词本移除 ${term.term}` : `收藏 ${term.term}`}
        title={saved ? '已在生词本' : '收藏到生词本'}
        className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl border bg-card transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          saved
            ? 'border-accent/40 bg-accent-soft text-accent'
            : 'border-transparent text-ink-3 opacity-60 hover:border-line hover:opacity-100 group-hover:opacity-100'
        }`}
      >
        <BookmarkIcon filled={saved} className="h-4 w-4" />
      </button>
    </div>
  )
}