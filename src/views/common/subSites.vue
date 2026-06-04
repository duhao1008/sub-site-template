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
            <span class="sr-only">Filter tools by name</span>
            <input
              id="site-directory-keyword"
              v-model="query"
              name="keyword"
              type="search"
              :placeholder="uiLabel('toolSearchPlaceholder', 'Filter tools by name')"
              @keydown.enter="applySearch"
            />
          </label>
          <button type="button" @click="applySearch">{{ uiLabel('search', 'Search') }}</button>
        </div>

        <p v-if="items.length === 0" class="directory-status">{{ uiLabel('noResults', 'No results') }}</p>
        <div v-else class="directory-grid">
          <a v-for="site in pagedItems" :key="site.url + site.name" class="directory-card" :href="site.url" target="_blank" rel="noopener">
            <span class="directory-card-copy">
              <strong>{{ site.name }}</strong>
              <span>{{ site.description }}</span>
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

interface SiteItem {
  name: string;
  description?: string;
  url: string;
}

interface RemoteSite {
  siteName: string;
  shortFunctions?: string;
  url: string;
  translations?: Partial<Record<Locale, {
    siteName?: string;
    shortFunctions?: string;
    url?: string;
  }>>;
}

interface RemoteResource<T> {
  json?: T;
}

interface RemoteSiteList {
  subsites?: RemoteSite[];
  items?: RemoteResource<RemoteSite>[];
}

const { locale, labels, page } = useLocalizedPage('siteList');
const { items, query, applySearch, currentPage, loading, error, pageCount, pagedItems } = useRemoteDirectory<
  RemoteSiteList,
  SiteItem,
  Locale
>({
  url: siteConfig.directories.siteListUrl,
  locale,
  pageSize: siteConfig.directories.pageSize,
  errorMessage: 'Failed to load tools.',
  mapItems: mapSites,
});

function uiLabel(key: string, fallback: string): string {
  const ui = labels.value as unknown as Record<string, string | Record<string, string>>;
  const nested = ui.labels as Record<string, string> | undefined;
  return (ui[key] as string | undefined) || nested?.[key] || fallback;
}

function mapSites(data: RemoteSiteList, currentLocale: Locale): SiteItem[] {
  return getRemoteSites(data).map((site) => {
    const localized = site.translations?.[currentLocale] || site.translations?.en;
    return {
      name: localized?.siteName || site.siteName,
      description: localized?.shortFunctions || site.shortFunctions,
      url: localized?.url || site.url,
    };
  }).filter((site) => site.name && site.url);
}

function getRemoteSites(data: RemoteSiteList): RemoteSite[] {
  if (data.subsites) return data.subsites;
  return (data.items || [])
    .map((item) => item.json)
    .filter((site): site is RemoteSite => Boolean(site));
}
</script>
