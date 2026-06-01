<template>
  <section class="matrix-grid" aria-label="Related links">
    <div>
      <h2>{{ otherToolsLabel }}</h2>
      <div class="link-grid">
        <a v-for="tool in otherTools" :key="tool.href" :href="tool.href">{{ tool.name }}<span>{{ tool.description }}</span></a>
      </div>
    </div>
    <div>
      <h2>{{ appsLabel }}</h2>
      <div class="link-grid">
        <a v-for="app in apps" :key="app.href" :href="app.href">{{ app.name }}<span>{{ app.description }}</span></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteConfig } from '../site.config';

defineProps<{ otherToolsLabel: string; appsLabel: string }>();

const otherTools = siteConfig.relatedTools;
const apps = siteConfig.apps;
</script>
