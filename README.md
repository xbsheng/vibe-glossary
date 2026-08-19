# Vibe 词典 · AI 协作黑话手册

给非程序员（vibe coder）看的 AI 协作词典。当 AI 甩给你一个陌生术语——token、环境变量、CORS、集成——搜一下就知道它在说什么、你该怎么接话。

每个词条按 4 个问题组织：**一句人话（含类比）** → **什么时候会碰到** → **可直接复制的接话术** → **相关词**。

## 功能

- 全文搜索（中英文均可），命中关键词高亮，`/` 快捷键聚焦，`Esc` 清空
- 场景分类（跟 AI 对话 / 改代码 / 跑项目 / 数据 / 上线 / 报错）+ 难度筛选（入门 / 进阶）
- 生词本：收藏词条（localStorage 持久化），一键只看收藏
- 词条深链：`#/t/env-var`，可分享、可收藏链接
- 纯静态，无后端，加词条只改一个文件

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # 产物在 dist/
```

## 技术栈

React 19 · Vite · TypeScript · Tailwind CSS v4

## 内容结构

词条全部在 `src/data/terms.ts`，每条结构：

```ts
{
  slug: 'env-var',                 // 深链标识，唯一
  term: '环境变量',                  // 中文词条名
  en: 'Environment Variable',      // 英文原名
  plain: '……',                      // 一句话版：大白话 + 类比
  when: '……',                       // 什么时候会碰到
  howToSay: '……',                   // 怎么跟 AI 说：可直接复制
  categories: ['run'],             // 场景 id：chat/code/run/data/deploy/debug
  difficulty: 'entry',             // entry 入门 / advanced 进阶
  related: ['env-file', 'api-key'],// 相关词条 slug
}
```

加词条：复制一个对象追加到 `TERMS` 数组末尾即可，无需动其他文件。
