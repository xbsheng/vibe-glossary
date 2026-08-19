import { useState } from 'react'
import { CheckIcon, CopyIcon } from './icons'

interface Props {
  text: string
  label?: string
  copiedLabel?: string
  className?: string
}

export default function CopyButton({
  text,
  label = '复制',
  copiedLabel = '已复制',
  className = '',
}: Props) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // 剪贴板不可用时静默失败
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? copiedLabel : label}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
        copied
          ? 'border-accent/40 bg-accent-soft text-accent-deep'
          : 'border-line bg-card text-ink-2 hover:border-line-strong hover:text-ink'
      } ${className}`}
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5" />
      )}
      {copied ? copiedLabel : label}
    </button>
  )
}