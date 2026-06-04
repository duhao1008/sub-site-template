export const siteConfig = {
  name: 'JSON Tools',
  domain: 'https://json.hao-tools.com',
  contactEmail: 'duhao1008@126.com',
  defaultLocale: 'en',
  directories: {
    appListUrl: 'https://cloudflare-api.hao-tools.com/resources?page=1&pageSize=8&type=1',
    siteListUrl: 'https://cloudflare-api.hao-tools.com/resources?page=1&pageSize=8&type=2',
    pageSize: 8,
  },
  relatedTools: [
    { name: 'JSON Validator', href: '/json-validator', description: 'Check JSON syntax with line and column hints.' },
    { name: 'JSON Tree Viewer', href: '/json-tree-viewer', description: 'Inspect nested JSON as an expandable tree.' },
    { name: 'JSON Minifier', href: '/json-minifier', description: 'Compress JSON and compare savings.' },
  ],
  apps: [
    { name: 'Published Apps', href: '/apps', description: 'Browse App Store apps from the Hao Tools network.' },
    { name: 'Website Tools', href: '/tools', description: 'Find other browser utility sites.' },
    { name: 'Hao Tools', href: 'https://hao-tools.com', description: 'Open the main Hao Tools directory.' },
  ],
} as const;
