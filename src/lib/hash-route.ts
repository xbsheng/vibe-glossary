import { useEffect, useState } from 'react'
import { TERMS } from '../data/terms'

declare global {
  interface Window {
    /** 百度统计队列 */
    _hmt?: Array<unknown>
  }
}

export type Route =
  | { view: 'list' }
  | { view: 'term'; slug: string }
  | { view: 'scripts' }

function parseHash(hash: string): Route {
  if (hash === '#/scripts') return { view: 'scripts' }
  const m = hash.match(/^#\/t\/([^/]+)/)
  if (m) {
    const slug = decodeURIComponent(m[1])
    if (TERMS.some((t) => t.slug === slug)) return { view: 'term', slug }
  }
  return { view: 'list' }
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))
  useEffect(() => {
    const track = () => {
      const path = window.location.hash || '/'
      // 未加载完时 _hmt 也会把调用排队，等 hm.js 就绪后上报
      window._hmt?.push(['_trackPageview', path])
    }
    const onChange = () => {
      setRoute(parseHash(window.location.hash))
      window.scrollTo({ top: 0 })
      track()
    }
    track() // 首次加载也记一次
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}