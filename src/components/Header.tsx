import { TERMS } from '../data/terms'
import type { Route } from '../lib/hash-route'
import { BookmarkIcon } from './icons'

interface Props {
  view: Route['view']
  favCount: number
  favActive: boolean
  onToggleFav: () => void
}

const NAV = [
  { view: 'list', label: '词条库', href: '#/' },
  { view: 'scripts', label: '话术包', href: '#/scripts' },
] as const

export default function Header({ view, favCount, favActive, onToggleFav }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Vibe 词典 · 返回首页"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent font-serif text-[15px] font-semibold text-white">
            译
          </span>
          <span className="font-serif text-lg font-semibold tracking-wide">
            Vibe 词典
          </span>
          <span className="hidden text-xs text-ink-3 lg:block">AI 协作黑话手册</span>
        </a>

        <nav className="flex items-center gap-1" aria-label="主导航">
          {NAV.map((n) => (
            <a
              key={n.view}
              href={n.href}
              aria-current={view === n.view ? 'page' : undefined}
              className={`rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                view === n.view ? 'text-accent' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFav}
            aria-pressed={favActive}
            className={`flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors ${
              favActive
                ? 'border-ink bg-ink text-paper'
                : 'border-line bg-card text-ink-2 hover:border-line-strong hover:text-ink'
            }`}
          >
            <BookmarkIcon filled={favActive} className="h-3.5 w-3.5" />
            生词本
            {favCount > 0 && (
              <span
                className={`rounded-full px-1.5 text-[11px] ${
                  favActive ? 'bg-paper/20' : 'bg-accent-soft text-accent-deep'
                }`}
              >
                {favCount}
              </span>
            )}
          </button>
          <span className="hidden h-9 items-center rounded-full border border-line bg-card px-3.5 text-[13px] text-ink-3 md:flex">
            {TERMS.length} 个词条
          </span>
        </div>
      </div>
    </header>
  )
}