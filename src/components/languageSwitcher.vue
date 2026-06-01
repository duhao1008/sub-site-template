<template>
  <label class="language-switcher">
    <span class="sr-only">Language</span>
    <select :value="locale" @change="changeLanguage">
      <option v-for="item in locales" :key="item" :value="item">{{ localeLabels[item] }}</option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { baseSlugs, localeLabels, locales, type Locale, type PageId } from '../i18n/content';

const props = defineProps<{ locale: Locale }>();
const route = useRoute();
const router = useRouter();

function changeLanguage(event: Event) {
  const nextLocale = (event.target as HTMLSelectElement).value as Locale;
  const pageId = (route.meta.pageId || 'home') as PageId;
  const slug = baseSlugs[pageId];
  const prefix = nextLocale === 'en' ? '' : `/${nextLocale}`;
  router.push(slug ? `${prefix}/${slug}` : `${prefix}/`);
}
</script>
