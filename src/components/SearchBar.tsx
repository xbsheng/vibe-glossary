import { useEffect, useRef, useState } from 'react'
import { SearchIcon } from './icons'

interface Props {
  query: string
  onChange: (q: string) => void
}

export default function SearchBar({ query, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  // 全局快捷键：/ 聚焦搜索，Esc 清空并失焦
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement
      const typing =
        el instanceof HTMLElement &&
        (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
      if (e.key === '/' && !typing) {
        e.preventDefault()
        inputRef.current?.focus()
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        if (query) onChange('')
        else inputRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [query, onChange])

  return (
    <div
      className={`relative rounded-2xl border bg-card shadow-sm transition-all ${
        focused
          ? 'border-accent/50 ring-4 ring-accent/10'
          : 'border-line-strong hover:border-ink/25'
      }`}
    >
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3" />
      <input
        ref={inputRef}
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="搜术语：token、环境变量、部署、CORS……"
        autoComplete="off"
        spellCheck={false}
        className="h-14 w-full rounded-2xl bg-transparent pl-12 pr-20 text-base text-ink outline-none placeholder:text-ink-3 sm:text-lg"
        aria-label="搜索术语"
      />
      {query ? (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs text-ink-3 transition-colors hover:bg-paper hover:text-ink"
          aria-label="清空搜索"
        >
          清空
        </button>
      ) : (
        <kbd className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-xs text-ink-3 sm:block">
          /
        </kbd>
      )}
    </div>
  )
}
