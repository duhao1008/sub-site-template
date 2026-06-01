# Codex 子站模板说明

这个文件用于存放 `sub-site-template` 的完整模板介绍。每次复制本项目制作新子站时，先让 Codex 阅读本文件，再阅读 `codex-input.md`，然后直接按输入参数改代码、补内容、运行验证。

## 模板定位

这是一个面向 SEO 的轻量工具子站模板，适合快速制作独立工具站、长尾关键词落地页、工具矩阵子站。

当前技术栈：

- Vue 3
- Vite
- TypeScript
- Vue Router
- 纯前端静态站点

当前站点示例是 JSON 工具站，包含格式化、校验、树形查看、压缩等工具逻辑。复制成新子站时，可以保留整体页面结构、SEO 内容结构、多语言路由、页脚页面、工具矩阵入口，再替换业务主题和工具实现。

## 项目结构

- `src/site.config.ts`：站点基础配置，包括站名、域名、联系邮箱、工具矩阵、App 矩阵。
- `src/i18n/content.ts`：核心内容配置，包括语言、slug、导航、SEO 标题、描述、H1、正文、操作步骤、示例。
- `src/i18n/faqs.ts`：FAQ 内容。
- `src/i18n/privacy.ts`：隐私页内容。
- `src/i18n/terms.ts`：条款页内容。
- `src/router/index.ts`：路由生成逻辑，通常只需要同步页面 ID、slug、工具默认模式。
- `src/views/home.vue`：首页。
- `src/views/tools/tool.vue`：工具详情页。
- `src/views/footer/`：About、Privacy、Terms、Contact、FAQ 等底部页面。
- `src/views/common/apps.vue`：App 列表页。
- `src/views/common/subSites.vue`：子站/工具列表页。
- `src/components/toolWorkbench.vue`：主工具交互区。
- `src/components/seoContent.vue`：SEO 内容区。
- `src/components/matrixLinks.vue`：矩阵链接组件。
- `src/styles/main.css`：全局样式。
- `src/utils/`：工具函数。制作非 JSON 子站时通常需要替换这里。
- `public/robots.txt`：搜索引擎抓取配置。
- `public/sitemap.xml`：站点地图。
- `scripts/generate-static-seo.mjs`：构建后生成静态 SEO 文件。

## Codex 快速开发流程

每次新建子站时，建议给 Codex 的第一句话：

```text
请先阅读 codex-template.md 和 codex-input.md，然后根据 codex-input.md 的参数，把这个模板改成目标子站。完成后运行 npm run build 验证。
```

Codex 应按下面顺序工作：

1. 阅读 `codex-template.md`，理解模板约束。
2. 阅读 `codex-input.md`，提取本次子站参数。
3. 检查当前 git 状态，避免覆盖已有人工改动。
4. 更新站点配置：`package.json`、`src/site.config.ts`、`public/robots.txt`、`public/sitemap.xml`。
5. 更新页面结构：`src/i18n/content.ts`、`src/router/index.ts`。
6. 更新工具逻辑：`src/components/toolWorkbench.vue`、`src/utils/`。
7. 更新辅助内容：FAQ、About、Privacy、Terms、Contact。
8. 检查样式是否适合新主题，必要时小幅调整 `src/styles/main.css`。
9. 运行 `npm run build`。
10. 汇报修改文件、验证结果、剩余注意事项。

## 输入文件使用方式

`codex-input.md` 是每次制作子站的唯一参数入口。用户只需要改这个文件，不需要在多个源码文件里手动查找替换。

推荐原则：

- 尽量使用结构化字段，不要只写一段自然语言。
- 必填字段必须明确，不确定的字段写 `待 Codex 建议`。
- 工具功能要写清楚输入、输出、按钮、错误提示、示例数据。
- SEO 页面要给出主关键词和长尾关键词。
- 多语言可以先只要求英文，后续再扩展中文、日文、韩文。

## 子站开发范围

制作一个新子站时，Codex 默认需要完成：

- 替换站点名称、域名、邮箱。
- 替换首页、工具页、长尾页的 SEO 文案。
- 替换导航工具项。
- 替换工具交互逻辑。
- 替换 FAQ。
- 替换隐私、条款、联系、关于页面里明显不匹配的内容。
- 更新 sitemap 和 robots。
- 确保 `npm run build` 通过。

如果 `codex-input.md` 没有明确要求，Codex 不应默认引入后端服务、数据库、登录系统、付费系统。

## 页面设计要求

模板默认是工具站，不是营销官网。开发时优先保证：

- 首屏直接可用，用户打开就能使用工具。
- 页面结构清晰，H1、简介、工具区、SEO 内容、FAQ、矩阵链接自然排列。
- 不做复杂动画，不做过度装饰。
- 移动端可正常输入、操作、复制结果。
- 文案围绕工具用途、使用步骤、隐私和本地处理说明展开。

## SEO 内容要求

每个核心页面建议包含：

- `title`：包含主关键词和品牌名。
- `description`：一句话说明功能、适用人群、隐私或免费特性。
- `h1`：页面主关键词。
- `intro`：解释这个工具解决什么问题。
- `steps`：3 到 5 个使用步骤。
- `example`：说明示例数据或典型使用场景。

建议页面类型：

- 首页：覆盖主主题和核心功能。
- 核心工具页：每个主要工具一个页面。
- 长尾页：围绕具体搜索意图创建，例如 `format-json-online`。
- Footer 页面：About、Privacy、Terms、Contact、FAQ。
- 矩阵页面：Apps、Tools。

## 多语言策略

模板目前保留 `en`、`zh`、`ja`、`ko` 四种语言结构。快速开发时可以选择：

- `en-only`：只保留英文内容，最快，适合先上线。
- `multi-language`：保留四语言路由，补齐每种语言内容。
- `partial`：英文完整，其他语言先使用英文或简化翻译。

如果用户没有指定，Codex 默认采用 `en-only` 或“英文完整、其他语言后续补齐”的策略，以减少错误翻译。

## 工具实现要求

替换工具时，Codex 应先识别工具类型：

- 文本转换类：输入文本，输出文本。
- 校验诊断类：输入文本，输出错误、位置、建议。
- 生成器类：输入参数，生成结果。
- 计算器类：输入数值，输出计算结果。
- 查看器类：输入结构化数据，输出可视化视图。

工具交互至少包含：

- 输入区。
- 主要操作按钮。
- 输出区。
- 示例按钮。
- 清空按钮。
- 复制按钮。
- 错误提示。
- 基础统计或结果摘要。

## 验证要求

完成开发后至少运行：

```bash
npm run build
```

如改动了复杂交互，建议再运行：

```bash
npm run dev
```

并在浏览器中检查：

- 首页可打开。
- 核心工具可运行。
- 复制、清空、示例按钮正常。
- 移动端没有明显重叠。
- sitemap/robots 域名正确。

## Codex 修改边界

Codex 可以改：

- `package.json`
- `src/site.config.ts`
- `src/i18n/*`
- `src/router/index.ts`
- `src/views/*`
- `src/components/*`
- `src/utils/*`
- `src/styles/main.css`
- `public/robots.txt`
- `public/sitemap.xml`

Codex 不应随意改：

- 构建工具链，除非新功能必须。
- 引入大型 UI 框架，除非用户明确要求。
- 删除多语言结构，除非 `codex-input.md` 明确要求。
- 改动与当前子站无关的文件。

## 推荐交付说明

Codex 完成后，最终回复应包含：

- 已完成的子站主题。
- 修改的关键文件。
- 构建验证结果。
- 还需要用户确认的生产信息，例如真实域名、邮箱、统计代码、广告代码。
