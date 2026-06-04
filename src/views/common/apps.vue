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
              :placeholder="labels.appSearchPlaceholder"
              @keydown.enter="applySearch"
            />
          </label>
          <button type="button" @click="applySearch">{{ labels.search }}</button>
        </div>

        <p v-if="items.length === 0" class="directory-status">{{ labels.noResults }}</p>
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
          <button type="button" :disabled="currentPage === 1" @click="currentPage -= 1">{{ labels.previousPage }}</button>
          <span>{{ currentPage }} / {{ pageCount }}</span>
          <button type="button" :disabled="currentPage === pageCount" @click="currentPage += 1">{{ labels.nextPage }}</button>
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
  displayName: string;
  subtitle?: string;
  description?: string;
  icon100?: string;
  appStoreUrl: string;
  translations?: Partial<Record<Locale, {
    displayName?: string;
    subtitle?: string;
    description?: string;
    appStoreUrl?: string;
  }>>;
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

function mapApps(data: RemoteAppList, currentLocale: Locale): AppItem[] {
  return getRemoteApps(data).map((app) => {
    const localized = app.translations?.[currentLocale] || app.translations?.en;
    return {
      name: localized?.displayName || app.displayName,
      subtitle: localized?.subtitle || app.subtitle,
      description: localized?.description || app.description,
      icon: app.icon100,
      url: localized?.appStoreUrl || app.appStoreUrl,
    };
  }).filter((app) => app.name && app.url);
}

function getRemoteApps(data: RemoteAppList): RemoteApp[] {
  if (data.apps) return data.apps;
  return (data.items || [])
    .map((item) => item.json)
    .filter((app): app is RemoteApp => Boolean(app));
}
</script>
