import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomePage from '../views/home.vue';
import ToolPage from '../views/tools/tool.vue';
import AboutPage from '../views/footer/about.vue';
import PrivacyPage from '../views/footer/privacy.vue';
import TermsPage from '../views/footer/terms.vue';
import ContactPage from '../views/footer/contact.vue';
import AppsPage from '../views/common/apps.vue';
import SubSitesPage from '../views/common/subSites.vue';
import FaqPage from '../views/footer/faq.vue';
import { baseSlugs, locales, normalizeLocale, type Locale, type PageId } from '../i18n/content';

const pageComponents: Partial<Record<PageId, RouteRecordRaw['component']>> = {
  home: HomePage,
  about: AboutPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  contact: ContactPage,
  faq: FaqPage,
  appList: AppsPage,
  siteList: SubSitesPage,
};

const toolDefaults: Record<string, string> = {
  formatter: 'formatter',
  validator: 'validator',
  viewer: 'viewer',
  minifier: 'minifier',
  formatOnline: 'formatter',
  validateLineColumn: 'validator',
  treeViewer: 'viewer',
  compressOnline: 'minifier',
};

function routeFor(pageId: PageId, locale: Locale): RouteRecordRaw {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const slug = baseSlugs[pageId];
  const path = slug ? `${prefix}/${slug}` : `${prefix}/`;
  const component = pageComponents[pageId] || ToolPage;
  return {
    path,
    name: `${locale}-${pageId}`,
    component,
    meta: { locale, pageId, toolId: toolDefaults[pageId] },
  };
}

const pageIds = Object.keys(baseSlugs) as PageId[];
const routes = locales.flatMap((locale) => pageIds.map((pageId) => routeFor(pageId, locale)));

routes.push({
  path: '/:pathMatch(.*)*',
  redirect: () => {
    const locale = normalizeLocale(navigator.language);
    return locale === 'en' ? '/' : `/${locale}/`;
  },
});

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
