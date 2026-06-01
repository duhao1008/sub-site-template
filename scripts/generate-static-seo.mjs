import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const sourceIndex = path.join(distDir, 'index.html');
const siteConfigPath = path.join(root, 'src', 'site.config.ts');

const locales = ['en', 'zh', 'ja', 'ko'];
const localePrefixes = { en: '', zh: '/zh', ja: '/ja', ko: '/ko' };
const localeLabels = { en: 'en', zh: 'zh-Hans', ja: 'ja', ko: 'ko' };

const pages = [
  ['home', ''],
  ['formatter', 'json-formatter'],
  ['validator', 'json-validator'],
  ['viewer', 'json-viewer'],
  ['minifier', 'json-minifier'],
  ['formatOnline', 'format-json-online'],
  ['validateLineColumn', 'validate-json-line-column'],
  ['treeViewer', 'json-tree-viewer'],
  ['compressOnline', 'compress-json-online'],
  ['about', 'about'],
  ['privacy', 'privacy'],
  ['terms', 'terms'],
  ['contact', 'contact'],
  ['faq', 'faq'],
  ['appList', 'apps'],
  ['siteList', 'tools'],
];

const englishMeta = {
  home: ['JSON Tools - Format, Validate, View and Minify JSON Online', 'Free browser-based JSON formatter, validator, viewer and minifier for developers. No login, no upload, all JSON processing stays local.'],
  formatter: ['JSON Formatter - Pretty Print and Validate JSON Online', 'Format JSON with indentation, validate syntax, find error position, copy formatted output, or minify JSON in your browser.'],
  validator: ['JSON Validator - Check JSON Syntax with Line and Column', 'Validate JSON online in the browser and get useful syntax error details with estimated line and column information.'],
  viewer: ['JSON Viewer - Expandable Tree Viewer for JSON Data', 'Paste JSON and browse it as an expandable tree. Format, inspect arrays and objects, and copy clean JSON output locally.'],
  minifier: ['JSON Minifier - Compress JSON and Measure Savings', 'Minify JSON in your browser, remove whitespace, validate syntax, and compare character count plus compression ratio.'],
  formatOnline: ['Format JSON Online - Free Pretty Printer for API Responses', 'Format JSON online for API responses, config snippets, logs, and examples. Browser-only pretty printer with copy and error hints.'],
  validateLineColumn: ['Validate JSON with Line and Column Error Details', 'Check JSON syntax and locate parse problems with estimated line and column details. Works locally in your browser.'],
  treeViewer: ['JSON Tree Viewer - Inspect Nested Objects and Arrays', 'View JSON as a collapsible tree for nested API data. Expand objects, inspect arrays, and copy formatted JSON locally.'],
  compressOnline: ['Compress JSON Online - Minify JSON and Calculate Savings', 'Compress JSON online with a local browser minifier. Compare original and minified character counts plus savings percentage.'],
  about: ['About JSON Tools', 'Learn about JSON Tools, a lightweight front-end utility site for formatting, validating, viewing, and minifying JSON locally.'],
  privacy: ['Privacy Policy - JSON Tools', 'Privacy policy for JSON Tools. No login, no user input collection, no upload, and all processing happens locally.'],
  terms: ['Terms of Use - JSON Tools', 'Terms of use for JSON Tools, including availability, user responsibility, third-party links, and tool updates.'],
  contact: ['Contact - JSON Tools', 'Contact JSON Tools for feedback, feature requests, or issue reports about the browser-based JSON utility site.'],
  faq: ['FAQ - JSON Tools', 'Frequently asked questions about JSON Tools, local browser processing, privacy, and common JSON workflows.'],
  appList: ['Published App Store Apps - JSON Tools', 'Browse related apps and lightweight browser utilities from the JSON Tools network.'],
  siteList: ['Website Tool Collection - JSON Tools', 'Browse related tool sub-sites and utility websites from the JSON Tools network.'],
};

const localizedHeadings = {
  zh: {
    home: 'JSON 格式化、校验、查看和压缩工具',
    formatter: 'JSON 格式化工具',
    validator: 'JSON 校验工具',
    viewer: 'JSON 树形查看器',
    minifier: 'JSON 压缩工具',
    formatOnline: '在线格式化 JSON',
    validateLineColumn: '带行列提示的 JSON 校验',
    treeViewer: 'JSON 树形查看器',
    compressOnline: '在线压缩 JSON',
    about: '关于 JSON 工具',
    privacy: '隐私政策',
    terms: '使用条款',
    contact: '联系 JSON 工具',
    faq: '常见问题',
    appList: '已上架AppStore的app',
    siteList: '网站工具集',
  },
  ja: {
    home: 'JSON 整形・検証・表示・圧縮ツール',
    formatter: 'JSON フォーマッター',
    validator: 'JSON バリデーター',
    viewer: 'JSON ツリービューア',
    minifier: 'JSON 圧縮ツール',
    formatOnline: 'オンライン JSON 整形',
    validateLineColumn: '行と列付き JSON 検証',
    treeViewer: 'JSON ツリービューア',
    compressOnline: 'オンライン JSON 圧縮',
    about: 'JSON Tools について',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    contact: 'お問い合わせ',
    faq: 'FAQ',
    appList: 'App Store 公開済みアプリ',
    siteList: 'Web ツール集',
  },
  ko: {
    home: 'JSON 포맷, 검증, 보기, 압축 도구',
    formatter: 'JSON 포맷 도구',
    validator: 'JSON 검증 도구',
    viewer: 'JSON 트리 뷰어',
    minifier: 'JSON 압축 도구',
    formatOnline: '온라인 JSON 포맷',
    validateLineColumn: '행과 열 정보가 있는 JSON 검증',
    treeViewer: 'JSON 트리 뷰어',
    compressOnline: '온라인 JSON 압축',
    about: 'JSON Tools 소개',
    privacy: '개인정보 처리방침',
    terms: '이용 약관',
    contact: '문의',
    faq: 'FAQ',
    appList: 'App Store에 출시된 앱',
    siteList: '웹사이트 도구 모음',
  },
};

const localizedDescriptions = {
  zh: '纯前端 JSON 工具，支持格式化、校验、树形查看和压缩。无需登录，不上传输入，浏览器本地处理。',
  ja: 'JSON の整形、検証、ツリー表示、圧縮を行うフロントエンド専用ツールです。ログイン不要で、入力はアップロードされません。',
  ko: 'JSON 포맷, 검증, 트리 보기, 압축을 지원하는 프런트엔드 전용 도구입니다. 로그인 없이 브라우저에서 로컬로 처리합니다.',
};

function readSiteConfig(source) {
  const domain = source.match(/domain:\s*'([^']+)'/)?.[1] || 'https://json.hao-tools.com';
  const name = source.match(/name:\s*'([^']+)'/)?.[1] || 'JSON Tools';
  return { domain: domain.replace(/\/$/, ''), name };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function routePath(locale, slug) {
  const prefix = localePrefixes[locale];
  return slug ? `${prefix}/${slug}` : `${prefix}/`;
}

function absoluteUrl(domain, locale, slug) {
  const route = routePath(locale, slug);
  return `${domain}${route === '/' ? '/' : route}`;
}

function metaFor(locale, pageId, siteName) {
  if (locale === 'en') {
    const [title, description] = englishMeta[pageId];
    return { title, description };
  }
  const title = `${localizedHeadings[locale][pageId]} - ${siteName}`;
  return { title, description: localizedDescriptions[locale] };
}

function buildHead({ html, title, description, canonical, locale, hreflangs, jsonLd }) {
  const headExtras = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    ...hreflangs.map(({ lang, href }) => `<link rel="alternate" hreflang="${lang}" href="${escapeHtml(href)}">`),
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    '<meta property="og:type" content="website">',
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join('\n    ');

  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${localeLabels[locale]}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>\n?\s*/g, '')
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>\n?\s*/g, '')
    .replace('</head>', `    ${headExtras}\n  </head>`);
}

async function writeRouteFile(route, html) {
  const normalized = route.replace(/^\//, '').replace(/\/$/, '');
  if (!normalized) {
    await writeFile(path.join(distDir, 'index.html'), html);
    return;
  }
  const dir = path.join(distDir, normalized);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

const template = await readFile(sourceIndex, 'utf8');
const { domain, name } = readSiteConfig(await readFile(siteConfigPath, 'utf8'));
const sitemapUrls = [];

for (const locale of locales) {
  for (const [pageId, slug] of pages) {
    const route = routePath(locale, slug);
    const canonical = absoluteUrl(domain, locale, slug);
    const { title, description } = metaFor(locale, pageId, name);
    const hreflangs = locales.map((item) => ({
      lang: localeLabels[item],
      href: absoluteUrl(domain, item, slug),
    }));
    hreflangs.push({ lang: 'x-default', href: absoluteUrl(domain, 'en', slug) });

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name,
      url: canonical,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      inLanguage: localeLabels[locale],
      description,
    };

    await writeRouteFile(route, buildHead({ html: template, title, description, canonical, locale, hreflangs, jsonLd }));
    sitemapUrls.push(canonical);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
  .map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`)
  .join('\n')}\n</urlset>\n`;

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap);
await writeFile(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`);
