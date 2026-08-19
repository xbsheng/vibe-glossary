export default function Footer() {
  return (
    <footer className="border-t border-line bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs leading-relaxed text-ink-3">
            Vibe 词典 · 为非程序员而写的 AI 协作词典
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            词条内容仅供参考，具体以你的项目和 AI 的实际表现为准
          </p>
          <p className="text-xs text-ink-3">
            用 <span className="font-mono">vibe coding</span> 写的词条，也写给 vibe
            coder。
          </p>
        </div>
      </div>
    </footer>
  )
}
