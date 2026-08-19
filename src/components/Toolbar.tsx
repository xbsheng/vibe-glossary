import {
  CATEGORIES,
  DIFFICULTIES,
  type CategoryId,
  type Difficulty,
} from '../data/terms'
import { CATEGORY_ICONS } from './icons'

interface Props {
  category: CategoryId | 'all'
  onCategoryChange: (c: CategoryId | 'all') => void
  difficulty: Difficulty | 'all'
  onDifficultyChange: (d: Difficulty | 'all') => void
}

export default function Toolbar({
  category,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* 场景筛选 */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="按场景筛选">
        <button
          onClick={() => onCategoryChange('all')}
          aria-pressed={category === 'all'}
          className={`flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors ${
            category === 'all'
              ? 'border-ink bg-ink text-paper'
              : 'border-line bg-card text-ink-2 hover:border-line-strong hover:text-ink'
          }`}
        >
          全部
        </button>
        {CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c.id]
          const active = category === c.id
          return (
            <button
              key={c.id}
              onClick={() => onCategoryChange(active ? 'all' : c.id)}
              aria-pressed={active}
              title={c.desc}
              className={`flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors ${
                active
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line bg-card text-ink-2 hover:border-line-strong hover:text-ink'
              }`}
            >
              <Icon className="h-4 w-4" />
              {c.name}
            </button>
          )
        })}
      </div>

      {/* 难度筛选 */}
      <div
        className="inline-flex w-fit items-center rounded-full border border-line bg-card p-0.5"
        role="group"
        aria-label="按难度筛选"
      >
        {[{ id: 'all' as const, name: '全部' }, ...DIFFICULTIES].map((d) => {
          const active = difficulty === d.id
          return (
            <button
              key={d.id}
              onClick={() => onDifficultyChange(d.id)}
              aria-pressed={active}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                active ? 'bg-ink text-paper' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {d.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
