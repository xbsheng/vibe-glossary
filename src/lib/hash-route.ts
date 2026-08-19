import { useEffect, useState } from 'react'
import { TERMS } from '../data/terms'

export type Route = { view: 'list' } | { view: 'term'; slug: string }

function parseHash(hash: string): Route {
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
    const onChange = () => {
      setRoute(parseHash(window.location.hash))
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function navigateToTerm(slug: string) {
  window.location.hash = `/t/${slug}`
}

export function navigateToList() {
  window.location.hash = '/'
}
