import { useMemo, useState } from 'react'
import { TERMS, type CategoryId, type Difficulty } from './data/terms'
import { useHashRoute } from './lib/hash-route'
import { useFavorites } from './lib/favorites'
import { searchTerms } from './lib/search'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import TermCard from './components/TermCard'
import TermDetail from './components/TermDetail'
import Toolbar from './components/Toolbar'

export default function App() {
  const route = useHashRoute()
  const { favorites, toggle, count } = useFavorites()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [favOnly, setFavOnly] = useState(false)

  const results = useMemo(() => {
    const base = searchTerms(query, category, difficulty)
    return favOnly ? base.filter((t) => favorites.includes(t.slug)) : base
  }, [query, category, difficulty, favOnly, favorites])

  const resetFilters = () => {
    setQuery('')
    setCategory('all')
    setDifficulty('all')
    setFavOnly(false)
  }

  if (route.view === 'term') {
    return (
      <div className="flex min-h-screen flex-col bg-paper">
        <Header
          favCount={count}
          favActive={favOnly}
          onToggleFav={() => setFavOnly((v) => !v)}
        />
        <main className="flex-1">
          <TermDetail
            slug={route.slug}
            saved={favorites.includes(route.slug)}
            onToggleSave={toggle}
          />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Header
        favCount={count}
        favActive={favOnly}
        onToggleFav={() => setFavOnly((v) => !v)}
      />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
        <Hero query={query} onQueryChange={setQuery} />

        <section aria-label="词条库" className="border-t border-line pt-8 pb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold">
              {favOnly ? '生词本' : '词条库'}
              <span className="ml-3 align-middle font-sans text-sm font-normal text-ink-3">
                {results.length} / {favOnly ? count : TERMS.length} 个
              </span>
            </h2>
            {query && !favOnly && (
              <p className="text-sm text-ink-3">
                关键词“<span className="text-accent">{query}</span>”命中{' '}
                {results.length} 条
              </p>
            )}
          </div>

          {favOnly && count === 0 ? (
            <div className="rounded-2xl border border-dashed border-line-strong bg-card/60 px-6 py-16 text-center">
              <p className="font-serif text-xl font-semibold">生词本还是空的</p>
              <p className="mt-2 text-sm text-ink-3">
                浏览词条时，点卡片右上角的书签，就能把词收进来慢慢啃
              </p>
              <button
                onClick={() => setFavOnly(false)}
                className="mt-6 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
              >
                去浏览词条
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Toolbar
                  category={category}
                  onCategoryChange={setCategory}
                  difficulty={difficulty}
                  onDifficultyChange={setDifficulty}
                />
              </div>

              {results.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((t) => (
                    <li key={t.slug} className="h-full">
                      <TermCard
                        term={t}
                        query={query}
                        saved={favorites.includes(t.slug)}
                        onToggleSave={toggle}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-2xl border border-dashed border-line-strong bg-card/60 px-6 py-16 text-center">
                  <p className="font-serif text-xl font-semibold">没有找到相关词条</p>
                  <p className="mt-2 text-sm text-ink-3">
                    {favOnly
                      ? '生词本里没有符合当前筛选的词条'
                      : '换个关键词试试，比如「部署」「token」「报错」'}
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-6 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                  >
                    重置筛选
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}