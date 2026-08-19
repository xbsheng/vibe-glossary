import type { ReactNode } from 'react'
import { TERMS, type CategoryId, type Difficulty, type Term } from '../data/terms'

export function searchTerms(
  query: string,
  category: CategoryId | 'all',
  difficulty: Difficulty | 'all',
): Term[] {
  const q = query.trim().toLowerCase()
  return TERMS.filter((t) => {
    if (category !== 'all' && !t.categories.includes(category)) return false
    if (difficulty !== 'all' && t.difficulty !== difficulty) return false
    if (!q) return true
    const haystack = [
      t.term,
      t.en,
      t.plain,
      t.when,
      t.howToSay,
      t.related.join(' '),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

/** 在文本中高亮命中的关键词，支持中英文、忽略大小写 */
export function Highlight({
  text,
  query,
}: {
  text: string
  query: string
}): ReactNode {
  const q = query.trim()
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + q.length)}</mark>
      <Highlight text={text.slice(idx + q.length)} query={q} />
    </>
  )
}
