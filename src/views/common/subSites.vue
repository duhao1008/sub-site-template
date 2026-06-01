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
            <input v-model="query" type="search" :placeholder="labels.toolSearchPlaceholder" />
          </label>
          <span>{{ filteredItems.length }} / {{ items.length }}</span>
        </div>

        <p v-if="filteredItems.length === 0" class="directory-status">{{ labels.noResults }}</p>
        <div v-else class="directory-grid">
          <a v-for="site in pagedItems" :key="site.url + site.name" class="directory-card" :href="site.url" target="_blank" rel="noopener">
            <span class="directory-card-copy">
              <strong>{{ site.name }}</strong>
              <span>{{ site.description }}</span>
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

interface RemoteSiteList {
  subsites?: RemoteSite[];
}

const { locale, labels, page } = useLocalizedPage('siteList');
const { items, query, currentPage, loading, error, filteredItems, pageCount, pagedItems } = useRemoteDirectory<
  RemoteSiteList,
  SiteItem,
  Locale
>({
  url: siteConfig.directories.siteListUrl,
  locale,
  pageSize: siteConfig.directories.pageSize,
  errorMessage: 'Failed to load tools.',
  mapItems: mapSites,
  getSearchText: (site) => [site.name, site.description].filter(Boolean).join(' '),
});

function mapSites(data: RemoteSiteList, currentLocale: Locale): SiteItem[] {
  return (data.subsites || []).map((site) => {
    const localized = site.translations?.[currentLocale] || site.translations?.en;
    return {
      name: localized?.siteName || site.siteName,
      description: localized?.shortFunctions || site.shortFunctions,
      url: localized?.url || site.url,
    };
  });
}
</script>
