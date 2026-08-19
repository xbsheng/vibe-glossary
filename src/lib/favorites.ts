import { useEffect, useState } from 'react'

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