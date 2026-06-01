<template>
  <div class="page">
    <section class="hero-tool">
      <div class="page-heading">
        <span class="badge">{{ labels.localBadge }}</span>
        <h1>{{ page.h1 }}</h1>
        <p>{{ page.intro }}</p>
      </div>
      <div class="mode-tabs" role="tablist" aria-label="JSON tools">
        <button v-for="mode in modes" :key="mode" :class="{ active: selectedMode === mode }" type="button" @click="selectedMode = mode">
          {{ labels[mode] }}
        </button>
      </div>
      <ToolWorkbench :mode="selectedMode" :page="page" :labels="labels" />
    </section>
    <SeoContent :page="page" :labels="labels" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import SeoContent from '../components/seoContent.vue';
import ToolWorkbench from '../components/toolWorkbench.vue';
import { t, type Locale, type ToolId } from '../i18n/content';

const route = useRoute();
const locale = computed(() => (route.meta.locale || 'en') as Locale);
const dict = computed(() => t(locale.value));
const labels = computed(() => dict.value.ui);
const page = computed(() => dict.value.pages.home);
const modes: ToolId[] = ['formatter', 'validator', 'viewer', 'minifier'];
const selectedMode = ref<ToolId>('formatter');
</script>
