import { useEffect, useState } from 'react'
import { TERMS } from '../data/terms'

const KEY = 'vibe-glossary:favorites:v1'

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr)
      ? arr.filter((s): s is string => typeof s === 'string')
      : []
  } catch {
    return []
  }
}

/** 生词本：收藏的词条 slug 列表，持久化在 localStorage */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>(load)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids))
    } catch {
      // 隐私模式 / 存储被禁用时静默降级为仅内存
    }
  }, [ids])
  const toggle = (slug: string) =>
    setIds((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
  return {
    favorites: ids,
    toggle,
    has: (s: string) => ids.includes(s),
    count: ids.length,
  }
}

/** 把生词本拼成可复制/分享的清单文本 */
export function buildExportText(ids: string[]): string {
  const lines = TERMS.filter((t) => ids.includes(t.slug)).map(
    (t, i) => `${i + 1}. ${t.term}（${t.en}）\n   ${t.plain}`,
  )
  const date = new Date().toLocaleDateString('zh-CN')
  return [
    '我收藏的 AI 协作黑话（来自 Vibe 词典）',
    '',
    ...lines,
    '',
    `共 ${lines.length} 条 · ${date}`,
  ].join('\n')
}