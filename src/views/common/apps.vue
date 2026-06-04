<template>
  <div class="page narrow">
    <section class="page-heading">
      <h1>{{ page.h1 }}</h1>
    </section>

    <section class="directory-panel">
      <p v-if="loading" class="directory-status">Loading...</p>
      <p v-else-if="error" class="directory-status">{{ error }}</p>
      <template v-else>
        <div class="directory-toolbar">
          <label>
            <span class="sr-only">Filter apps by name</span>
            <input
              id="app-directory-keyword"
              v-model="query"
              name="keyword"
              type="search"
              :placeholder="uiLabel('appSearchPlaceholder', 'Filter apps by name')"
              @keydown.enter="applySearch"
            />
          </label>
          <button type="button" @click="applySearch">{{ uiLabel('search', 'Search') }}</button>
        </div>

        <p v-if="items.length === 0" class="directory-status">{{ uiLabel('noResults', 'No results') }}</p>
        <div v-else class="directory-grid">
          <a v-for="app in pagedItems" :key="app.url + app.name" class="directory-card" :href="app.url" target="_blank" rel="noopener">
            <img v-if="app.icon" :src="app.icon" :alt="app.name" loading="lazy" />
            <span class="directory-card-copy">
              <strong>{{ app.name }}</strong>
              <small v-if="app.subtitle">{{ app.subtitle }}</small>
              <span>{{ app.description }}</span>
            </span>
          </a>
        </div>

        <div v-if="pageCount > 1" class="pagination-bar">
          <button type="button" :disabled="currentPage === 1" @click="currentPage -= 1">{{ uiLabel('previousPage', 'Previous') }}</button>
          <span>{{ currentPage }} / {{ pageCount }}</span>
          <button type="button" :disabled="currentPage === pageCount" @click="currentPage += 1">{{ uiLabel('nextPage', 'Next') }}</button>
        </div>
      </template>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useLocalizedPage } from '../../composables/useLocalizedPage';
import { useRemoteDirectory } from '../../composables/useRemoteDirectory';
import type { Locale } from '../../i18n/content';
import { siteConfig } from '../../site.config';

interface AppItem {
  name: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  url: string;
}

interface RemoteApp {
  id?: number;
  appleId?: number | string;
  projectName?: string;
  appName?: string;
  appStoreName?: string;
  displayName?: string;
  subtitle?: string;
  appSubtitle?: string;
  description?: string;
  promotionText?: string;
  appDescription?: string;
  shortFunctions?: string;
  detailFunctions?: string;
  icon100?: string;
  appStoreUrl?: string;
  transMap?: Partial<Record<Locale, RemoteAppTranslation>>;
  translationList?: RemoteAppTranslation[];
  translations?: Partial<Record<Locale, RemoteAppTranslation>>;
}

interface RemoteAppTranslation {
  languageCode?: string;
  displayName?: string;
  appStoreName?: string;
  appName?: string;
  subtitle?: string;
  appSubtitle?: string;
  description?: string;
  promotionText?: string;
  appDescription?: string;
  shortFunctions?: string;
  appStoreUrl?: string;
}

interface RemoteResource<T> {
  json?: T;
}

interface RemoteAppList {
  apps?: RemoteApp[];
  items?: RemoteResource<RemoteApp>[];
}

const { locale, labels, page } = useLocalizedPage('appList');
const { items, query, applySearch, currentPage, loading, error, pageCount, pagedItems } = useRemoteDirectory<
  RemoteAppList,
  AppItem,
  Locale
>({
  url: siteConfig.directories.appListUrl,
  locale,
  pageSize: siteConfig.directories.pageSize,
  errorMessage: 'Failed to load apps.',
  mapItems: mapApps,
});

function uiLabel(key: string, fallback: string): string {
  const ui = labels.value as unknown as Record<string, string | Record<string, string>>;
  const nested = ui.labels as Record<string, string> | undefined;
  return (ui[key] as string | undefined) || nested?.[key] || fallback;
}

function mapApps(data: RemoteAppList, currentLocale: Locale): AppItem[] {
  return getRemoteApps(data).map((app) => {
    const localized = getAppTranslation(app, currentLocale);
    return {
      name: localized?.displayName || localized?.appStoreName || localized?.appName || app.displayName || app.appStoreName || app.appName || app.projectName || 'App',
      subtitle: localized?.subtitle || localized?.appSubtitle || app.subtitle || app.appSubtitle || '',
      description: localized?.shortFunctions || localized?.description || localized?.promotionText || app.shortFunctions || app.description || app.promotionText || app.appDescription || app.detailFunctions,
      icon: app.icon100,
      url: localized?.appStoreUrl || app.appStoreUrl || buildAppStoreUrl(app.appleId),
    };
  }).filter((app) => app.name && app.url);
}

function getAppTranslation(app: RemoteApp, currentLocale: Locale): RemoteAppTranslation | undefined {
  const translations = app.translations || app.transMap || {};
  if (translations[currentLocale]) return translations[currentLocale];
  if (translations.en) return translations.en;
  if (Array.isArray(app.translationList)) {
    return app.translationList.find((item) => item.languageCode === currentLocale)
      || app.translationList.find((item) => item.languageCode === 'en');
  }
  return undefined;
}

function buildAppStoreUrl(appleId?: number | string): string {
  return appleId ? `https://apps.apple.com/app/id${appleId}` : '';
}

function getRemoteApps(data: RemoteAppList): RemoteApp[] {
  if (data.apps) return data.apps;
  return (data.items || [])
    .map((item) => item.json)
    .filter((app): app is RemoteApp => Boolean(app));
}
</script>
