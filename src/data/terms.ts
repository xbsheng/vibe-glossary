export type CategoryId = 'chat' | 'code' | 'run' | 'data' | 'deploy' | 'debug'
export type Difficulty = 'entry' | 'advanced'

export interface Term {
  slug: string
  /** 中文词条名 */
  term: string
  /** 英文原名 */
  en: string
  plain: string
  when: string
  howToSay: string
  categories: CategoryId[]
  difficulty: Difficulty
  related: string[]
}

export const CATEGORIES: { id: CategoryId; name: string; desc: string }[] = [
  { id: 'chat', name: '跟 AI 对话', desc: '理解 AI 怎么想、怎么收费' },
  { id: 'code', name: '让 AI 改代码', desc: '代码世界的基本零件' },
  { id: 'run', name: '把项目跑起来', desc: '装环境、敲命令、看效果' },
  { id: 'data', name: '数据存哪', desc: '你的数据放哪里、怎么取' },
  { id: 'deploy', name: '发布上线', desc: '从本地代码到真实网站' },
  { id: 'debug', name: '报错了', desc: '出错时怎么读懂提示' },
]

export const DIFFICULTIES: { id: Difficulty; name: string; hint: string }[] = [
  { id: 'entry', name: '入门', hint: '第一次遇上也该懂' },
  { id: 'advanced', name: '进阶', hint: '用到再查也来得及' },
]

export const TERMS: Term[] = [
  {
    slug: 'token',
    term: 'Token',
    en: 'Token',
    plain:
      "AI 的“计费字数”。AI 不按汉字数算钱，按 token 算，大概 1 个汉字 ≈ 1~2 个 token。对话越长烧得越多，AI 说“超出长度限制”，本质是 token 预算用完了。",
    when: '对话突然变卡、变贵，或者 AI 说“内容超出上下文长度”。',
    howToSay:
      '我们开个新对话继续，之前的背景我重新交代一遍，这样省 token。你先告诉我怎么把当前上下文压缩一下。',
    categories: ['chat'],
    difficulty: 'entry',
    related: ['context-window', 'prompt'],
  },
  {
    slug: 'context-window',
    term: '上下文窗口',
    en: 'Context Window',
    plain:
      "AI 的“短期记忆容量”。它只记得当前对话里放得下的内容，装不下了，最早说的话就会被挤掉——不是它记性差，是窗口就这么大。",
    when: 'AI 忘了你开头提的要求，或者报错说“超出上下文长度限制”。',
    howToSay:
      '我开头提的需求你好像忘了。关键背景我重新发你一遍：……。请基于最新这段继续，别再依赖旧信息。',
    categories: ['chat'],
    difficulty: 'entry',
    related: ['token', 'prompt'],
  },
  {
    slug: 'prompt',
    term: '提示词',
    en: 'Prompt',
    plain:
      "你发给 AI 的每一段话。像点菜：只说“来点吃的”，上来的全凭运气；说清食材、口味、忌口，才端得上对的那盘。",
    when: '每次开新对话、让 AI 干活之前，都值得花 30 秒把话说明白。',
    howToSay:
      '请按这个格式回答：先说结论，再给理由，最后给可直接复制的内容。你的角色是一位耐心的老师，面对完全不懂编程的普通人。',
    categories: ['chat'],
    difficulty: 'entry',
    related: ['token', 'hallucination'],
  },
  {
    slug: 'hallucination',
    term: '幻觉',
    en: 'Hallucination',
    plain:
      "AI 一本正经地编答案。它不知道答案时不会说“不知道”，而是把看似合理的内容编给你——代码、文件路径、法律条款都会编。",
    when: 'AI 给了看起来很专业、一用就报错的内容，或引用了你项目里不存在的文件。',
    howToSay:
      '你刚才提到的那个文件我项目里不存在。以后请只基于真实存在的内容回答，拿不准就直接说“不确定”，绝对不要编造。',
    categories: ['chat'],
    difficulty: 'advanced',
    related: ['prompt', 'bug'],
  },
  {
    slug: 'frontend',
    term: '前端',
    en: 'Frontend',
    plain:
      "用户直接看到的“门面”：网页长什么样、按钮点下去什么反应。你打开的每个网站页面，都是前端。",
    when: 'AI 说“改前端样式”“这是前端问题”，通常指页面上看得见摸得着的东西。',
    howToSay:
      '我是做产品的，不懂代码。前端的事请直接告诉我改哪个文件、复制粘贴哪段，我照着做。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['backend', 'component'],
  },
  {
    slug: 'backend',
    term: '后端',
    en: 'Backend',
    plain:
      "“幕后干活的部分”：处理登录、存数据、算价格。你看不见它，但它决定你的网站能不能正常运转。",
    when: 'AI 说“这是后端逻辑”“需要写个接口”，通常指看不见的服务端部分。',
    howToSay:
      '后端部分我看不到也测不了。请把每一步都写清楚，包括我怎么验证它真的跑通了。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['frontend', 'api'],
  },
  {
    slug: 'api',
    term: 'API / 接口',
    en: 'API',
    plain:
      "程序之间“递话的窗口”。前端想从后端拿数据，就通过 API 喊话：“给我订单列表”，后端回一份数据。就像餐厅的传菜口。",
    when: 'AI 说“调用 API”“对接接口”，或者要你填 API Key、看接口文档。',
    howToSay:
      '我需要调用这个 API，但没写过代码。请帮我写一个最简单的调用示例，并告诉我结果在哪里能看到。',
    categories: ['code', 'chat'],
    difficulty: 'entry',
    related: ['backend', 'api-key', 'api-docs'],
  },
  {
    slug: 'api-docs',
    term: '接口文档',
    en: 'API Docs',
    plain:
      "API 的“说明书”：这个接口要传什么参数、返回什么数据、会报什么错，都写在里面。程序员靠它知道怎么调用。",
    when: 'AI 说“去查一下接口文档”“按文档来”。',
    howToSay:
      '我看不懂这份接口文档。请帮我读一遍，告诉我：我只想实现一个“登录”功能，需要用到哪几个接口、分别传什么。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['api', 'docs'],
  },
  {
    slug: 'env-var',
    term: '环境变量',
    en: 'Environment Variable',
    plain:
      "贴在程序身上的“便利贴”：数据库密码、API Key 这类不该写死在代码里的秘密，都放在这里。程序运行时去便利贴上找值。",
    when: 'AI 让你“配置环境变量”“创建 .env 文件”，通常要你粘贴密钥或填邮箱。',
    howToSay:
      '我不知道环境变量怎么配。请一步步告诉我：文件建在哪、叫什么名、每行填什么，我复制粘贴就行。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['env-file', 'api-key', 'config'],
  },
  {
    slug: 'api-key',
    term: 'API Key / 密钥',
    en: 'API Key',
    plain:
      "使用某个服务的“通行证密码”。服务商给你一串长长的字符，程序凭它证明“是我在用”。泄露了，别人就能盗刷你的额度。",
    when: 'AI 让你把一串密钥填进 .env 或设置里。',
    howToSay:
      '这个 Key 我填在哪？填完怎么验证能用？另外告诉我怎么防止它泄露。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['env-var', 'env-file', 'api'],
  },
  {
    slug: 'env-file',
    term: '.env 文件',
    en: '.env File',
    plain:
      "专门存放环境变量的“便利贴文件”，名字就叫 .env，放在项目根目录。注意：这个文件绝不能传上网、不能发给别人。",
    when: 'AI 说“把 Key 写进 .env”“确保 .env 不会被提交”。',
    howToSay:
      '帮我检查项目里有没有 .env 文件、里面该填什么，并确认它不会被误传到网上。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['env-var', 'api-key'],
  },
  {
    slug: 'dependency',
    term: '依赖',
    en: 'Dependency',
    plain:
      "你项目里“请的外援”。别人写好的现成代码包，pnpm/npm 帮你下载进来直接用。项目越大，外援越多。",
    when: 'AI 说“安装依赖”“pnpm install”“这个包需要装一下”。',
    howToSay:
      '要装什么依赖请直接给我完整命令，装完告诉我怎么确认装成功了。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['package-manager', 'framework'],
  },
  {
    slug: 'package-manager',
    term: '包管理器',
    en: 'Package Manager',
    plain:
      "“管外援的管家”：负责下载、更新、删除依赖。pnpm、npm 都是它。你看到的 pnpm install，就是让管家把外援请回来。",
    when: 'AI 让你运行 pnpm install / npm install / pnpm add xxx。',
    howToSay:
      '我用 pnpm。如果安装依赖时报错，请告诉我怎么清理重装（比如删掉 node_modules 重来）。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['dependency', 'terminal'],
  },
  {
    slug: 'framework',
    term: '框架',
    en: 'Framework',
    plain:
      "盖房子的“预制结构”：先搭好骨架和规矩，你在上面填内容，比从零砌砖快得多。React、Vue 都是前端框架。",
    when: 'AI 说“这个项目用的 React”“用框架搭一个页面”。',
    howToSay:
      '我不了解框架概念。请告诉我这个项目用了什么技术、我改东西时要注意什么，用大白话说。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['dependency', 'component', 'frontend'],
  },
  {
    slug: 'component',
    term: '组件',
    en: 'Component',
    plain:
      "页面上“可复用的积木”：一个按钮、一张卡片、一个弹窗都是一个组件。改一处，所有用到它的地方一起变。",
    when: 'AI 说“把这个逻辑抽成组件”“组件报错了”。',
    howToSay:
      '这个组件是干什么的、在哪个文件？我要改它，会不会影响别的地方？',
    categories: ['code'],
    difficulty: 'entry',
    related: ['frontend', 'function'],
  },
  {
    slug: 'function',
    term: '函数',
    en: 'Function',
    plain:
      "“一台小机器”：扔进去输入，吐出输出。比如“计算总价”函数，给它价格和数量，它返回总价。代码就是一堆小机器拼起来。",
    when: 'AI 说“写个函数”“这个函数没生效”。',
    howToSay:
      '请把这个功能写成一个函数，并告诉我：在哪里调用它、怎么验证它工作正常。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['variable', 'component'],
  },
  {
    slug: 'variable',
    term: '变量',
    en: 'Variable',
    plain:
      "“贴了标签的盒子”：把数据放进去，叫它什么就是什么。比如把用户名存进 name 这个盒子，之后用到 name，就是那个用户。",
    when: 'AI 说“这个变量没定义”“换个变量名”。',
    howToSay:
      '报错说变量没定义。请帮我看是拼写错了、还是漏了声明，直接给出修改后的代码。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['function', 'error-log'],
  },
  {
    slug: 'database',
    term: '数据库',
    en: 'Database',
    plain:
      "“正规的大仓库”：数据按表存放，能查、能改、能长久保存。刷新网页、关掉电脑，数据都还在。",
    when: 'AI 说“数据要存数据库”“建个表”。',
    howToSay:
      '我需要把用户留言存起来。请告诉我：用这个项目现成的数据库，还是需要新装？给出完整操作步骤。',
    categories: ['data'],
    difficulty: 'entry',
    related: ['table', 'local-storage'],
  },
  {
    slug: 'table',
    term: '数据表',
    en: 'Table',
    plain:
      "数据库里的“一张表格”：每列是一个字段（姓名、时间），每行是一条记录（一条留言）。存数据，就是往表里加行。",
    when: 'AI 说“给这个表加个字段”“查一下这张表”。',
    howToSay:
      '帮我看这张表现在有哪些字段。我要加一个“手机号”字段，请给出改动步骤。',
    categories: ['data'],
    difficulty: 'entry',
    related: ['database', 'json'],
  },
  {
    slug: 'cache',
    term: '缓存',
    en: 'Cache',
    plain:
      "“放常用东西的床头柜”：把经常用的数据放近一点，下次直接拿，不用再去仓库翻。快，但不一定最新。",
    when: '改了代码但页面没变化，多半是它在作怪；AI 也常让你“清一下缓存”。',
    howToSay:
      '我改了代码但页面没变化。请帮我检查是不是缓存问题，告诉我怎么强制刷新或清理缓存。',
    categories: ['data'],
    difficulty: 'advanced',
    related: ['database', 'error-log'],
  },
  {
    slug: 'local-storage',
    term: '本地存储',
    en: 'localStorage',
    plain:
      "留在浏览器口袋里的“便签”：网站把数据存在你的浏览器里，刷新不丢，但换个浏览器、换台电脑就没。适合存“记住我的偏好”这类小数据。",
    when: 'AI 说“用 localStorage 存”，通常用于记住登录状态、页面设置。',
    howToSay:
      '请用 localStorage 实现记住我的设置，并告诉我数据存在哪、怎么清掉。',
    categories: ['data'],
    difficulty: 'entry',
    related: ['database', 'cache'],
  },
  {
    slug: 'json',
    term: 'JSON',
    en: 'JSON',
    plain:
      "程序之间的“通用表格语言”：用花括号和冒号写数据，任何语言都认识。API 返回的数据基本都是 JSON。",
    when: 'AI 让你“看下返回的 JSON”“解析 JSON”。',
    howToSay:
      '请把这段 JSON 用大白话讲给我听：里面有哪些信息、哪个字段是我想用的。',
    categories: ['data'],
    difficulty: 'entry',
    related: ['api', 'table'],
  },
  {
    slug: 'deploy',
    term: '部署',
    en: 'Deploy',
    plain:
      "把做好的网站“搬上线”：从你电脑上的代码，变成别人输网址就能访问的真实网站。",
    when: 'AI 说“可以部署了”“部署到 Vercel / GitHub Pages”。',
    howToSay:
      '我完全没部署过。请选一个最简单、免费、适合小项目的方案，给我傻瓜式步骤。',
    categories: ['deploy'],
    difficulty: 'entry',
    related: ['domain', 'hosting', 'server'],
  },
  {
    slug: 'domain',
    term: '域名',
    en: 'Domain',
    plain:
      "网站的“门牌号”：www.你的名字.com。别人记不住 IP 地址，就记域名。买一个每年几十到几百块。",
    when: 'AI 说“绑定域名”“配置 DNS”。',
    howToSay:
      '我买好了域名。请告诉我怎么把它指向我的网站，DNS 那里该填什么。',
    categories: ['deploy'],
    difficulty: 'entry',
    related: ['deploy', 'server'],
  },
  {
    slug: 'server',
    term: '服务器',
    en: 'Server',
    plain:
      "“24 小时开机的电脑”：网站就住在上面，随时响应访问。你家电脑关机，网站就没了，所以需要专门的服务器。",
    when: 'AI 说“需要一台服务器”“部署到服务器上”。',
    howToSay:
      '请推荐适合我的服务器方案：便宜、操作简单。并解释我到底为什么要买它。',
    categories: ['deploy'],
    difficulty: 'entry',
    related: ['deploy', 'hosting'],
  },
  {
    slug: 'hosting',
    term: '托管',
    en: 'Hosting',
    plain:
      "“网站寄存服务”：把网站文件放上去，服务商负责让它 24 小时在线。Vercel、Netlify、GitHub Pages 都是托管平台。",
    when: 'AI 说“用 Vercel 托管”“部署到 GitHub Pages”。',
    howToSay:
      '请一步步带我把网站托管到 Vercel：注册、导入项目、点哪个按钮，每一步都告诉我。',
    categories: ['deploy'],
    difficulty: 'entry',
    related: ['deploy', 'domain', 'static-site'],
  },
  {
    slug: 'https',
    term: 'HTTPS / SSL',
    en: 'HTTPS / SSL',
    plain:
      "网站与浏览器之间的“加密通道”：数据被加密传输，别人偷看不到。网址开头的锁头标志就是它。",
    when: 'AI 说“证书过期了”“需要配 SSL”，或浏览器提示“不安全”。',
    howToSay:
      '浏览器提示不安全。请帮我看是证书问题还是配置问题，给出解决步骤。',
    categories: ['deploy'],
    difficulty: 'entry',
    related: ['deploy', 'domain'],
  },
  {
    slug: 'git',
    term: 'Git',
    en: 'Git',
    plain:
      "“时光机 + 保险柜”：记录项目每一次改动，可以随时回到任意版本，也能和队友同步。GitHub 就是它的云端仓库。",
    when: 'AI 说“提交一下”“git add / commit / push”“有冲突”。',
    howToSay:
      '请用大白话告诉我：现在我的项目需要执行哪几条 git 命令？每条命令是干什么的？',
    categories: ['code'],
    difficulty: 'entry',
    related: ['commit', 'branch'],
  },
  {
    slug: 'commit',
    term: '提交',
    en: 'Commit',
    plain:
      "给时光机打一个“存档点”：把当前改动保存成一个版本，写上说明，之后随时能回到这里。",
    when: 'AI 说“改完了记得 commit”“提交代码”。',
    howToSay:
      '我改好了。请给我几条命令把改动存起来，并告诉我每条命令是什么意思。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['git', 'branch'],
  },
  {
    slug: 'branch',
    term: '分支',
    en: 'Branch',
    plain:
      "“平行世界”：在主线之外另开一条线改东西，不影响主线。改完确认没问题，再合并回去。",
    when: 'AI 说“新建个分支”“合并分支”“有冲突”。',
    howToSay:
      '请帮我在新分支上改。改完先告诉我效果，我确认了再合并，避免弄坏现在的版本。',
    categories: ['code'],
    difficulty: 'advanced',
    related: ['git', 'commit'],
  },
  {
    slug: 'error-log',
    term: '报错 / 错误日志',
    en: 'Error & Log',
    plain:
      "程序出问题时留下的“线索”。报错信息就是侦探的脚印，里面藏着“哪里坏了、为什么坏”。日志是程序运行时写的流水账。",
    when: '页面白屏、功能失灵，AI 让你“看报错”“贴日志”。',
    howToSay:
      '我不知道去哪看报错。请告诉我怎么打开控制台 / 日志文件，发给你之前我需要准备什么。',
    categories: ['debug'],
    difficulty: 'entry',
    related: ['console', 'bug'],
  },
  {
    slug: 'bug',
    term: 'Bug',
    en: 'Bug',
    plain:
      "程序里“没发现的毛病”：代码写错导致行为不对。修 bug 就是找到毛病并改掉。",
    when: '功能表现怪异，AI 说“这是个 bug”“修一下”。',
    howToSay:
      '复现步骤：打开页面 → 点按钮 → 报错。请根据这个帮我定位 bug，修复后告诉我怎么自己验证。',
    categories: ['debug'],
    difficulty: 'entry',
    related: ['error-log', 'function'],
  },
  {
    slug: 'terminal',
    term: '终端',
    en: 'Terminal',
    plain:
      "“和电脑文字对话的窗口”：像旧电脑的黑色命令框，在里面敲命令让电脑干活。程序员天天用它。",
    when: 'AI 让你“打开终端”“运行 pnpm dev”。',
    howToSay:
      '我不知道怎么打开终端、在哪敲命令。请告诉我：Mac / Windows 上按什么快捷键打开，然后完整命令是什么。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['command-line', 'package-manager'],
  },
  {
    slug: 'command-line',
    term: '命令行',
    en: 'Command Line',
    plain:
      "“打字指挥电脑”的方式：不用鼠标点，直接敲一行字命令，电脑照做。终端里输入的东西就是命令行。",
    when: 'AI 给你一串以 pnpm / git / npm 开头的命令。',
    howToSay:
      '我不认识这些命令。请解释这条命令是干什么的，并告诉我怎么判断它执行成功或失败。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['terminal', 'git'],
  },
  {
    slug: 'port',
    term: '端口',
    en: 'Port',
    plain:
      "电脑上的“门牌号”：一个服务占一个门。网站默认 80/443，开发时常用 3000、5173。“端口被占用”就是这门被别人占了。",
    when: "报错“Port 5173 is already in use”，或 AI 让你改端口。",
    howToSay:
      '报错说端口被占用。请告诉我怎么找到占用者并关掉它，或者直接换个端口。',
    categories: ['run'],
    difficulty: 'advanced',
    related: ['terminal', 'error-log'],
  },
  {
    slug: 'cors',
    term: '跨域',
    en: 'CORS',
    plain:
      "浏览器定的“串门规矩”：A 网站默认不允许 B 网站的代码来访问自己的数据，防止恶意偷数据。“跨域报错”就是这规矩拦了你。",
    when: '报错里出现 CORS，通常是前端调别的网站的 API 被拦。',
    howToSay:
      '报错是 CORS。请告诉我：这个接口是不是不允许跨域？在我自己项目里怎么解决？给出最简单方案。',
    categories: ['debug'],
    difficulty: 'advanced',
    related: ['api', 'error-log'],
  },
  {
    slug: 'compile',
    term: '编译',
    en: 'Compile',
    plain:
      "“翻译代码”：把程序员写的高级语言翻译成电脑能直接执行的机器语言。翻译出错，就是报错。",
    when: 'AI 说“编译报错”“重新编译”，或运行的时候一片红。',
    howToSay:
      '编译报错了。请把报错内容用大白话翻译给我，并告诉我改哪一行。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['error-log', 'hot-reload'],
  },
  {
    slug: 'hot-reload',
    term: '热更新',
    en: 'Hot Reload',
    plain:
      "“边改边生效”：保存代码的瞬间，页面自动刷新，立刻看到效果，不用重启。开发时网页自己变了，就是它在工作。",
    when: '改完代码页面自动刷新，或该刷新却没刷新（可能是配置问题）。',
    howToSay:
      '我改完代码页面没自动更新。请帮我看看热更新是不是没生效，怎么修复。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['terminal', 'compile'],
  },
  {
    slug: 'config',
    term: '配置',
    en: 'Config',
    plain:
      "程序的“设置清单”：行为由配置决定，比如用哪个端口、连哪个数据库。一般写在配置文件里，改配置 = 改设置。",
    when: 'AI 说“改一下配置”“在配置文件里加一项”。',
    howToSay:
      '请告诉我要改哪个配置文件、改哪一行、改成什么，改完怎么确认生效。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['env-var', 'deploy'],
  },
  {
    slug: 'static-site',
    term: '静态网站',
    en: 'Static Site',
    plain:
      "“内容不变”的网站：页面在服务器上做好放着，谁来访问都看到一样的。博客、展示页适合；需要登录、动态数据的网站需要后端。",
    when: 'AI 说“用静态托管就行”“GitHub Pages 只支持静态”。',
    howToSay:
      '我的网站有登录和留言功能，能用静态托管吗？如果不能，请告诉我最简单的替代方案。',
    categories: ['deploy'],
    difficulty: 'entry',
    related: ['hosting', 'backend'],
  },
  {
    slug: 'console',
    term: '控制台',
    en: 'Console',
    plain:
      "浏览器自带的“诊室”：按 F12 打开，能看到报错信息、网页内部数据。程序员排查问题，都先看这里。",
    when: 'AI 让你“按 F12 打开控制台”“看 console 里的报错”。',
    howToSay:
      '我已打开控制台。我把看到的报错文字发给你，请帮我分析。',
    categories: ['debug'],
    difficulty: 'entry',
    related: ['error-log', 'terminal'],
  },
  {
    slug: 'docs',
    term: '文档',
    en: 'Docs',
    plain:
      "“产品说明书”：框架、工具怎么用，官方都写了文档。AI 说“查文档”，就是让你去翻说明书。",
    when: 'AI 说“看下官方文档”“文档里写了”。',
    howToSay:
      '我不擅长读英文文档。请把文档里和我需求相关的部分，用中文大白话讲给我。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['api-docs', 'framework'],
  },
  {
    slug: 'open-source',
    term: '开源',
    en: 'Open Source',
    plain:
      "“代码免费公开”：任何人能看到、使用、修改。你项目里绝大多数依赖都是开源的，等于站在巨人肩膀上。",
    when: 'AI 说“这是开源项目”“从 GitHub 下载开源项目”。',
    howToSay:
      '我不懂开源协议。请告诉我：我这样用这个开源项目，会不会有法律风险？',
    categories: ['code'],
    difficulty: 'entry',
    related: ['git', 'dependency'],
  },
  {
    slug: 'llm',
    term: '大模型',
    en: 'LLM',
    plain:
      "AI 的“大脑本体”。ChatGPT、Claude 背后都是一个个大模型。你看到的聊天界面只是壳，真正干活的是它。",
    when: 'AI 提到“换个大模型”“这个模型不支持”时。',
    howToSay:
      '我现在用的什么模型？换一个更便宜或更聪明的模型，会影响我现有的这些功能吗？',
    categories: ['chat'],
    difficulty: 'entry',
    related: ['token', 'multimodal'],
  },
  {
    slug: 'multimodal',
    term: '多模态',
    en: 'Multimodal',
    plain:
      "能同时看懂文字、图片、语音的 AI。你发截图让它分析，就是多模态在起作用。",
    when: 'AI 说“把截图发给我看看”，或“这个模型不支持图片”。',
    howToSay: '我发图片给你分析，也请把结果用大白话讲给我。',
    categories: ['chat'],
    difficulty: 'entry',
    related: ['llm', 'prompt'],
  },
  {
    slug: 'temperature',
    term: '温度',
    en: 'Temperature',
    plain:
      "AI 的“创造力度旋钮”：调低=老实稳重照需求做，调高=天马行空自由发挥。写代码希望它低，写文案可以高。",
    when: 'AI 提到“temperature 参数”，通常出现在接口调用的配置里。',
    howToSay:
      '我要的是稳定、可复现的代码，请用偏保守的设置（低 temperature）来写。',
    categories: ['chat'],
    difficulty: 'advanced',
    related: ['prompt', 'api'],
  },
  {
    slug: 'system-prompt',
    term: '系统提示词',
    en: 'System Prompt',
    plain:
      "每次对话 AI 都会“先读到”的隐藏开场白，决定它全程的角色、语气和规则。你改它，等于给 AI 立人设。",
    when: 'AI 说“设置 system prompt”“在系统提示词里写规则”时。',
    howToSay:
      '请帮我写一条系统提示词：让我每次提问时，你都先确认我的目标和约束，再动手给方案。',
    categories: ['chat'],
    difficulty: 'advanced',
    related: ['prompt', 'llm'],
  },
  {
    slug: 'streaming',
    term: '流式输出',
    en: 'Streaming',
    plain:
      "答案“边生成边蹦出来”，而不是憋半天一次性给完。网页版对话里字一个接一个冒出来，就是它在流式输出。",
    when: '用 API 调用时结果迟迟不显示，可能只是没开流式输出。',
    howToSay:
      '如果接口支持，请开启流式输出，让我尽快看到开头，不用等全部生成完。',
    categories: ['chat'],
    difficulty: 'entry',
    related: ['token', 'api'],
  },
  {
    slug: 'fine-tuning',
    term: '微调',
    en: 'Fine-tuning',
    plain:
      "用你自己的例子“特训”模型，让它更懂你的业务。对小项目很少需要，遇到时先怀疑是不是过度设计。",
    when: 'AI 建议“做微调”“训练专用模型”时。',
    howToSay:
      '我只是个小项目，真的需要微调吗？还是用提示词就能解决？请帮我评估一下投入产出。',
    categories: ['chat'],
    difficulty: 'advanced',
    related: ['llm', 'prompt'],
  },
  {
    slug: 'dev-prod',
    term: '开发环境 / 生产环境',
    en: 'Dev / Production',
    plain:
      "开发环境=你在自己电脑上试验的“厨房”；生产环境=用户真正访问的“上菜大厅”。同一道菜，两个环境味道可能不一样。",
    when: 'AI 说“本地没问题，上线就挂”“这是生产环境才有的问题”。',
    howToSay:
      '本地跑得好好的，上线就出错。请帮我列一份“开发/生产差异”排查清单，我照着逐项检查。',
    categories: ['run', 'deploy'],
    difficulty: 'entry',
    related: ['deploy', 'env-var', 'config'],
  },
  {
    slug: 'localhost',
    term: 'localhost',
    en: 'localhost',
    plain:
      "你电脑自己的“本地门牌”：浏览器敲 localhost:5173，看到的就是项目在你电脑上的样子，别人访问不到。",
    when: 'AI 说“浏览器打开 localhost:5173 看看”时。',
    howToSay:
      '我打开了 localhost:5173。接下来做什么？以及怎么把它给别人看或上线？',
    categories: ['run'],
    difficulty: 'entry',
    related: ['port', 'terminal', 'dev-prod'],
  },
  {
    slug: 'environment',
    term: '环境',
    en: 'Environment',
    plain:
      "软件“住在哪”的总称：操作系统、语言版本、依赖、配置加在一起就是环境。换台电脑跑不动，多半是环境不一样。",
    when: 'AI 说“是环境问题”“重新装一下环境”时。',
    howToSay:
      '我怀疑是环境问题。请帮我写一份检查清单：Node 版本、包管理器、依赖，逐项核对。',
    categories: ['run'],
    difficulty: 'entry',
    related: ['dependency', 'config', 'dev-prod'],
  },
  {
    slug: 'event',
    term: '事件',
    en: 'Event',
    plain:
      "用户操作触发的“铃响”：点击、敲键盘、滑动屏幕都是事件。程序“听到铃声”就执行对应的动作。",
    when: 'AI 说“给按钮加个点击事件”“监听这个事件”时。',
    howToSay:
      '我要让这个按钮点击后弹出一个提示。请把事件代码写好，并告诉我改哪个字段能改文字。',
    categories: ['code'],
    difficulty: 'advanced',
    related: ['frontend', 'function'],
  },
  {
    slug: 'async',
    term: '异步',
    en: 'Async',
    plain:
      "“不等结果先干别的”：像点外卖，下单后不干等，忙别的，好了再取。网络请求基本都是异步的。",
    when: 'AI 说“这是异步的”“要用 await”时。',
    howToSay:
      '我不理解异步。请解释这段代码为什么顺序不对，以及怎么改才能拿到我想要的结果。',
    categories: ['code'],
    difficulty: 'advanced',
    related: ['api', 'function'],
  },
  {
    slug: 'comment',
    term: '注释',
    en: 'Comment',
    plain:
      "写给人类看的“旁白”，程序运行时会直接忽略。AI 让你加注释，是让你写清这段代码的思路。",
    when: 'AI 说“加个注释”“这行先注释掉”时。',
    howToSay:
      '请在这段代码的关键处加上中文注释，解释每步在做什么，方便我以后自己看得懂。',
    categories: ['code'],
    difficulty: 'entry',
    related: ['docs', 'function'],
  },
  {
    slug: 'routing',
    term: '路由',
    en: 'Routing',
    plain:
      "网址和页面之间的“导航表”：/home 打开首页、/about 打开关于页。网址变了页面跟着变，就是路由在工作。",
    when: 'AI 说“加个路由”“这个页面的路由不对”时。',
    howToSay:
      '我要加一个新页面，用户访问 /feedback 就能看到。请告诉我怎么加路由。',
    categories: ['code'],
    difficulty: 'advanced',
    related: ['frontend', 'component'],
  },
  {
    slug: 'auth',
    term: '认证',
    en: 'Auth',
    plain:
      "“验明正身”：登录、密码、验证码、扫码都属于认证。它决定“你是谁、能不能进来”。",
    when: 'AI 说“加个登录”“做认证”“token 失效”时。',
    howToSay:
      '我的网站要加登录功能。请选最简单安全的方案，逐步教我：用户怎么注册、我怎么测试。',
    categories: ['code', 'deploy'],
    difficulty: 'entry',
    related: ['backend', 'api-key', 'api'],
  },
  {
    slug: 'cdn',
    term: 'CDN',
    en: 'CDN',
    plain:
      "“全国连锁的货仓”：把图片、视频、脚本存到离用户最近的服务器，打开更快。网站变慢，加 CDN 是常见解法。",
    when: 'AI 说“接入 CDN”“静态资源走 CDN”时。',
    howToSay:
      '我的网站图片加载很慢。请评估一下用 CDN 值不值得，值得的话给最简单的接入步骤。',
    categories: ['deploy'],
    difficulty: 'advanced',
    related: ['hosting', 'deploy', 'static-site'],
  },
  {
    slug: 'serverless',
    term: '云函数',
    en: 'Serverless',
    plain:
      "“按次付费的临时厨房”：不用自己养服务器，代码跑一次算一次的钱。适合活动通知、轻量接口这类小功能。",
    when: 'AI 说“用云函数”“serverless”时。',
    howToSay:
      '我的功能很轻量，用云函数会省心吗？请对比一下它和普通服务器的成本与复杂度。',
    categories: ['deploy'],
    difficulty: 'advanced',
    related: ['server', 'deploy'],
  },
  {
    slug: 'breakpoint',
    term: '断点',
    en: 'Breakpoint',
    plain:
      "让程序“走一步停一步”的暂停点。在开发者工具里设一个，程序跑到那行就停下，方便看清每一步发生了什么。",
    when: 'AI 说“在断点处看变量”“打断点调试”时。',
    howToSay:
      '我按 F12 打开了开发者工具，但不会打断点。请一步步教我怎么在出错的那行暂停观察。',
    categories: ['debug'],
    difficulty: 'advanced',
    related: ['console', 'error-log'],
  },
  {
    slug: 'stack-trace',
    term: '报错堆栈',
    en: 'Stack Trace',
    plain:
      "报错信息里那段“从哪里冒出来的”路径记录，像事故现场的脚印，一路指到出问题的源头。",
    when: 'AI 让你“看报错堆栈”“贴完整的报错”时。',
    howToSay:
      '我把完整报错堆栈发给你。请帮我从堆栈里找出真正出错的那一行，用大白话解释给我。',
    categories: ['debug'],
    difficulty: 'advanced',
    related: ['error-log', 'function'],
  },
]
