<template>
  <div class="page">
    <section class="hero-tool">
      <div class="page-heading">
        <span class="badge">{{ labels.localBadge }}</span>
        <h1>{{ page.h1 }}</h1>
        <p>{{ page.intro }}</p>
      </div>
      <ToolWorkbench :mode="toolId" :page="page" :labels="labels" />
    </section>
    <SeoContent :page="page" :labels="labels" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SeoContent from '../../components/seoContent.vue';
import ToolWorkbench from '../../components/toolWorkbench.vue';
import { t, type Locale, type PageId, type ToolId } from '../../i18n/content';

const route = useRoute();
const locale = computed(() => (route.meta.locale || 'en') as Locale);
const pageId = computed(() => (route.meta.pageId || 'formatter') as PageId);
const toolId = computed(() => (route.meta.toolId || 'formatter') as ToolId);
const dict = computed(() => t(locale.value));
const labels = computed(() => dict.value.ui);
const page = computed(() => dict.value.pages[pageId.value]);
</script>
