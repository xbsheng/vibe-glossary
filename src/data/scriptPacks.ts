import type { CategoryId } from './terms'

export interface ScriptItem {
  title: string
  text: string
}

export interface ScriptPack {
  id: string
  name: string
  desc: string
  cat: CategoryId
  scripts: ScriptItem[]
  related: string[]
}

export const PACKS: ScriptPack[] = [
  {
    id: 'first-meeting',
    name: '开场白 · 让 AI 第一次就懂你',
    desc: '建立合作规矩，比具体需求更重要。开头贴一段，能省后面十次误会。',
    cat: 'chat',
    related: ['prompt', 'llm', 'system-prompt'],
    scripts: [
      {
        title: '立场声明',
        text: '我是完全不懂编程的普通人，请全程用大白话跟我交流。你负责写代码、给命令，我负责复制粘贴和描述需求。遇到我可能不懂的术语，先解释再继续。',
      },
      {
        title: '项目从零开始',
        text: '我想做一个小工具：〔描述你的需求〕。请先做三件事：1) 问清楚我需要的细节（功能、界面、数据）；2) 推荐最主流、最省事的技术方案；3) 等我确认后再开始写代码。',
      },
    ],
  },
  {
    id: 'debug',
    name: '出问题了 · 报错与排查',
    desc: '把报错原样贴给 AI，让它当翻译官——先解释，再给步骤。',
    cat: 'debug',
    related: ['error-log', 'console', 'cache'],
    scripts: [
      {
        title: '报错翻译官',
        text: '我把报错贴给你：〔粘贴报错〕。请先用大白话告诉我发生了什么，再一步步教我修复，每步给我预期的结果。',
      },
      {
        title: '改完没变化',
        text: '我改了代码但页面没变化。请按顺序帮我排查：是不是没保存、热更新失效、缓存问题、端口被占用。',
      },
      {
        title: '页面白屏',
        text: '打开页面一片白。请告诉我怎么打开控制台（按 F12）看报错，并把发给你之前我需要准备的内容列出来。',
      },
    ],
  },
  {
    id: 'run-env',
    name: '把项目跑起来 · 环境搭建',
    desc: '电脑上什么都没装过？让 AI 当安装工，一步步带你走。',
    cat: 'run',
    related: ['terminal', 'package-manager', 'env-file'],
    scripts: [
      {
        title: '环境从零装起',
        text: '我要在电脑上把一个项目跑起来，但什么开发环境都没装过。请按顺序给我完整步骤：装 Node、装 pnpm、安装依赖、启动项目。每一步告诉我：在哪里操作（Mac 还是 Windows）、怎么判断成功。',
      },
    ],
  },
  {
    id: 'feature',
    name: '加需求 · 改功能',
    desc: '让 AI 先问再写，别一上来就甩一大段代码。',
    cat: 'code',
    related: ['frontend', 'component', 'function'],
    scripts: [
      {
        title: '加个功能',
        text: '帮我在现有项目里加：〔功能描述〕。动手前先问我三个问题：1) 入口/按钮放哪；2) 文案写什么；3) 数据存在哪。我确认后你再写。',
      },
      {
        title: '改样式',
        text: '我想把〔页面区域〕改成〔描述效果〕。我描述感受，你告诉我改哪个文件、哪一行。一次别改太狠，改完我看效果再继续。',
      },
    ],
  },
  {
    id: 'deploy',
    name: '发布上线 · 一键部署',
    desc: '部署对新手最容易卡死，让 AI 精确到"点哪个按钮"。',
    cat: 'deploy',
    related: ['deploy', 'hosting', 'domain'],
    scripts: [
      {
        title: '一键部署',
        text: '帮我部署上线。前提：我注册过〔平台名〕的账号（如果没有，请先教我注册）。请一步一步来：导入哪个项目、点哪些按钮、出现什么提示算正常。先跟我确认方案再动手。',
      },
    ],
  },
  {
    id: 'restart',
    name: '省 token · 重开新对话',
    desc: '对话越来越贵、AI 越来越健忘？压缩上下文，重开一局。',
    cat: 'chat',
    related: ['token', 'context-window'],
    scripts: [
      {
        title: '开新对话',
        text: '我们开新对话继续，我重新交代背景：〔核心需求 + 关键约束〕。请只基于以上内容回答，不要再依赖旧对话里的信息。',
      },
      {
        title: '压缩上下文',
        text: '请把我们这段对话的核心内容（已确定的需求、已做的决定、未完成的事）压缩成 200 字以内的重述。我开新对话时直接贴给你用。',
      },
    ],
  },
]