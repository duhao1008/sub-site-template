# Codex 子站制作输入

这个文件用于接收“本次要制作什么子站”的所有参数。复制模板后，只需要填写本文件，然后让 Codex 阅读 `codex-template.md` 和本文件并开始开发。

推荐启动指令：

```text
请先阅读 codex-template.md 和 codex-input.md，然后根据 codex-input.md 的参数，把当前模板改造成目标子站。请直接修改代码，并在完成后运行 npm run build。
```

## 1. 开发模式

- 开发目标：`新建子站`
- 是否保留当前 Vue + Vite 架构：`是`
- 是否纯前端静态站：`是`
- 是否需要后端：`否`
- 是否需要登录：`否`
- 是否需要数据库：`否`
- 是否需要支付：`否`
- 多语言策略：`待填写：en-only / multi-language / partial`
- 目标上线优先级：`待填写：快速上线 / 内容完整 / 功能优先 / SEO 优先`

## 2. 站点基础信息

- 项目目录名：`待填写，例如 image-compressor`
- package name：`待填写，例如 image-compressor`
- 站点名称：`待填写，例如 Image Compressor`
- 站点一句话定位：`待填写，例如 Compress images in your browser without uploading files.`
- 生产域名：`待填写，例如 https://image.hao-tools.com`
- 联系邮箱：`待填写，例如 duhao1008@126.com`
- 默认语言：`en`
- 品牌归属：`Hao Tools`
- 是否强调本地浏览器处理：`是 / 否 / 待 Codex 判断`

## 3. 子站主题

- 工具类型：`待填写：文本工具 / 图片工具 / 编码转换 / 计算器 / 校验器 / 生成器 / 查看器 / 其他`
- 主关键词：`待填写`
- 次关键词：`待填写，逗号分隔`
- 长尾关键词：`待填写，逗号分隔`
- 目标用户：`待填写，例如 developers, marketers, students`
- 用户痛点：`待填写`
- 核心价值：`待填写`
- 隐私卖点：`待填写，例如 files never leave your browser`

## 4. 页面规划

### 首页

- 首页 slug：`/`
- 首页 title：`待 Codex 根据关键词生成`
- 首页 description：`待 Codex 根据关键词生成`
- 首页 H1：`待填写或待 Codex 生成`
- 首页 intro：`待填写或待 Codex 生成`

### 核心工具页

请按实际需要增删。建议 3 到 5 个核心页面。

| 页面 ID | 导航名称 | slug | 主关键词 | 页面功能 |
| --- | --- | --- | --- | --- |
| tool1 | 待填写 | 待填写，例如 compress-image | 待填写 | 待填写 |
| tool2 | 待填写 | 待填写 | 待填写 | 待填写 |
| tool3 | 待填写 | 待填写 | 待填写 | 待填写 |
| tool4 | 待填写 | 待填写 | 待填写 | 待填写 |

### 长尾 SEO 页

请按实际需要增删。长尾页可以复用同一个工具组件，但文案和 slug 要针对具体搜索意图。

| 页面 ID | slug | 长尾关键词 | 搜索意图 | 默认工具模式 |
| --- | --- | --- | --- | --- |
| longTail1 | 待填写 | 待填写 | 待填写 | 待填写 |
| longTail2 | 待填写 | 待填写 | 待填写 | 待填写 |
| longTail3 | 待填写 | 待填写 | 待填写 | 待填写 |
| longTail4 | 待填写 | 待填写 | 待填写 | 待填写 |

### 固定页面

- About：`需要`
- Privacy：`需要`
- Terms：`需要`
- Contact：`需要`
- FAQ：`需要`
- Apps 列表页：`保留`
- Tools 子站列表页：`保留`

## 5. 工具功能参数

### 主工具描述

- 工具名称：`待填写`
- 输入类型：`待填写，例如 textarea / file upload / URL / number inputs / options form`
- 输出类型：`待填写，例如 text / table / image preview / downloadable file / report`
- 是否支持示例数据：`是`
- 是否支持复制结果：`是 / 否`
- 是否支持下载结果：`是 / 否`
- 是否支持清空输入：`是`
- 是否需要错误定位：`是 / 否`
- 是否需要统计信息：`是 / 否`
- 是否需要本地缓存：`是 / 否`

### 操作按钮

| 按钮文案 | 行为 | 是否主要按钮 |
| --- | --- | --- |
| 待填写 | 待填写 | 是 |
| Load example | 加载示例 | 否 |
| Clear | 清空输入和结果 | 否 |
| Copy | 复制结果 | 否 |
| Download | 下载结果，若需要 | 否 |

### 输入字段

| 字段名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| input | 待填写 | 待填写 | 主输入 |
| option1 | 待填写 | 待填写 | 可选参数 |
| option2 | 待填写 | 待填写 | 可选参数 |

### 输出字段

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| result | 待填写 | 主结果 |
| summary | 待填写 | 结果摘要 |
| stats | 待填写 | 统计信息 |
| warning | 待填写 | 警告或提示 |

### 示例数据

```text
待填写：放一份真实、简短、不会涉及隐私的示例输入。
```

### 工具规则

- 成功条件：`待填写`
- 失败条件：`待填写`
- 错误提示要求：`待填写`
- 边界情况：`待填写，例如空输入、超大输入、无效格式`
- 浏览器兼容要求：`现代浏览器即可 / 待填写`

## 6. SEO 文案输入

如果不想自己写完整文案，可以只填关键词，让 Codex 生成。

- Title 风格：`主关键词 - 功能描述 | 站点名`
- Description 风格：`说明免费、在线、本地处理、无需登录、核心用途`
- H1 风格：`直接使用主关键词或清晰工具名`
- 语气：`简洁、专业、偏工具站`
- 禁止文案：`待填写，例如 best in the world, guaranteed, medical/legal claims`

### 页面内容模板

每个页面让 Codex 生成以下字段：

```ts
{
  title: '',
  description: '',
  h1: '',
  intro: '',
  steps: ['', '', ''],
  example: ''
}
```

## 7. FAQ 输入

建议 5 到 8 个 FAQ。

| 问题 | 答案要点 |
| --- | --- |
| Is this tool free? | 待填写 |
| Does this site upload my input? | 待填写 |
| Do I need an account? | 待填写 |
| What browsers are supported? | 待填写 |
| Can I use it on mobile? | 待填写 |
| 待填写 | 待填写 |

## 8. 矩阵链接

### relatedTools

这些会显示在站内相关工具区域。

| name | href | description |
| --- | --- | --- |
| 待填写 | 待填写 | 待填写 |
| 待填写 | 待填写 | 待填写 |
| 待填写 | 待填写 | 待填写 |

### apps

这些会显示在 App 或外部产品入口。

| name | href | description |
| --- | --- | --- |
| Published Apps | /apps | Browse App Store apps from the Hao Tools network. |
| Website Tools | /tools | Find other browser utility sites. |
| Hao Tools | https://hao-tools.com | Open the main Hao Tools directory. |

## 9. 视觉和交互偏好

- 整体风格：`实用、清爽、工具站`
- 是否沿用当前样式：`是`
- 主色倾向：`待 Codex 根据主题选择`
- 是否需要图标：`否，除非已有依赖`
- 是否需要图片素材：`否，工具站优先`
- 移动端优先级：`高`
- 可访问性要求：`按钮有明确文本，输入输出有 label，错误提示可读`

## 10. 技术实现偏好

- 优先复用现有组件：`是`
- 优先少改架构：`是`
- 是否允许新增依赖：`尽量不要，必要时先说明理由`
- 是否允许使用浏览器 API：`是`
- 是否允许 Web Worker：`仅在大文件或重计算场景需要时`
- 是否允许文件上传：`待填写`
- 是否需要把处理过程限制在本地：`是 / 否`

## 11. 构建和交付要求

Codex 完成后必须：

- 更新 `package.json` 的 name。
- 更新 `src/site.config.ts`。
- 更新 SEO 内容和路由。
- 替换工具逻辑。
- 更新 FAQ、About、Privacy、Terms、Contact 中不匹配的内容。
- 更新 `public/robots.txt`。
- 更新 `public/sitemap.xml`。
- 运行 `npm run build`。
- 最终回复列出修改文件和构建结果。

## 12. 当前子站参数

在这里填写本次真实参数。上面的章节是说明和结构，下面这一段是 Codex 最应该优先读取的最终输入。

```yaml
project:
  directory_name: ""
  package_name: ""
  site_name: ""
  domain: ""
  contact_email: "duhao1008@126.com"
  default_locale: "en"
  language_strategy: "en-only"

positioning:
  one_liner: ""
  tool_type: ""
  target_users: []
  pain_points: []
  core_value: ""
  privacy_message: ""

seo:
  primary_keyword: ""
  secondary_keywords: []
  long_tail_keywords: []
  tone: "concise, professional, utility-focused"

pages:
  core_tools:
    - id: ""
      nav_label: ""
      slug: ""
      keyword: ""
      function: ""
  long_tail:
    - id: ""
      slug: ""
      keyword: ""
      intent: ""
      default_tool_mode: ""

tool:
  name: ""
  input_type: ""
  output_type: ""
  main_action_label: ""
  supports_example: true
  supports_copy: true
  supports_download: false
  supports_clear: true
  needs_error_location: false
  needs_stats: true
  fields: []
  output_fields: []
  sample_input: |
    待填写
  success_rules: []
  failure_rules: []
  edge_cases: []

faq:
  - question: "Is this tool free?"
    answer_points: ""
  - question: "Does this site upload my input?"
    answer_points: ""
  - question: "Do I need an account?"
    answer_points: ""

matrix:
  related_tools: []
  apps:
    - name: "Published Apps"
      href: "/apps"
      description: "Browse App Store apps from the Hao Tools network."
    - name: "Website Tools"
      href: "/tools"
      description: "Find other browser utility sites."
    - name: "Hao Tools"
      href: "https://hao-tools.com"
      description: "Open the main Hao Tools directory."

constraints:
  keep_static_frontend: true
  avoid_new_dependencies: true
  run_build: true
```

## 13. 给 Codex 的执行要求

Codex 请按以下规则执行：

1. 如果 `当前子站参数` 里有明确值，以它为准。
2. 如果字段为空，但上文提供了关键词或说明，请合理补全。
3. 如果关键信息缺失但可以用模板默认值继续开发，请继续，不要中断。
4. 如果缺失的信息会影响生产安全，例如真实域名、隐私声明、法律声明，请先用占位内容完成，并在最终回复中提醒用户确认。
5. 不要只输出方案，请直接修改代码。
6. 完成后运行 `npm run build`。
