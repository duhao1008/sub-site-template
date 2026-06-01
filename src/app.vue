<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" :to="localizedPath('home')">{{ labels.homeLink }}</RouterLink>
      <nav class="site-nav" aria-label="Primary">
        <RouterLink v-for="id in functionPageIds" :key="id" :to="localizedPath(id)">{{ navLabel(id) }}</RouterLink>
      </nav>
      <div class="header-actions">
        <a class="header-button" href="https://hao-tools.com">hao-tools</a>
        <RouterLink class="header-button" :to="localizedPath('appList')">{{ labels.appCollection }}</RouterLink>
        <RouterLink class="header-button" :to="localizedPath('siteList')">{{ labels.toolCollection }}</RouterLink>
      </div>
      <LanguageSwitcher :locale="locale" />
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="footer-links">
        <RouterLink :to="localizedPath('privacy')">{{ labels.footerPrivacy }}</RouterLink>
        <RouterLink :to="localizedPath('terms')">{{ labels.footerTerms }}</RouterLink>
        <RouterLink :to="localizedPath('contact')">{{ labels.footerContact }}</RouterLink>
        <RouterLink :to="localizedPath('about')">{{ labels.footerAbout }}</RouterLink>
        <RouterLink :to="localizedPath('faq')">{{ labels.footerFaq }}</RouterLink>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import LanguageSwitcher from './components/languageSwitcher.vue';
import { baseSlugs, longTailIds, navToolIds, t, type Locale, type PageId } from './i18n/content';
import { siteConfig } from './site.config';

const route = useRoute();
const locale = computed(() => (route.meta.locale || 'en') as Locale);
const labels = computed(() => t(locale.value).ui);
const functionPageIds = [...navToolIds, ...longTailIds].slice(0, 5);

function localizedPath(pageId: PageId) {
  const slug = baseSlugs[pageId];
  const prefix = locale.value === 'en' ? '' : `/${locale.value}`;
  return slug ? `${prefix}/${slug}` : `${prefix}/`;
}

function navLabel(pageId: PageId) {
  return labels.value[pageId] || t(locale.value).pages[pageId].h1;
}

function setHeadLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.head.querySelector(selector);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    if (hreflang) link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function absolutePath(pageId: PageId, targetLocale: Locale) {
  const slug = baseSlugs[pageId];
  const prefix = targetLocale === 'en' ? '' : `/${targetLocale}`;
  const path = slug ? `${prefix}/${slug}` : `${prefix}/`;
  return `${siteConfig.domain}${path === '/' ? '/' : path}`;
}

watchEffect(() => {
  const dict = t(locale.value);
  const pageId = (route.meta.pageId || 'home') as PageId;
  const page = dict.pages[pageId];
  document.documentElement.lang = locale.value;
  document.title = page.title;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', page.description);
  setHeadLink('canonical', absolutePath(pageId, locale.value));
  (['en', 'zh', 'ja', 'ko'] as Locale[]).forEach((item) => {
    const hreflang = item === 'zh' ? 'zh-Hans' : item;
    setHeadLink('alternate', absolutePath(pageId, item), hreflang);
  });
  setHeadLink('alternate', absolutePath(pageId, 'en'), 'x-default');
});
</script>
