<template>
  <section class="seo-content">
    <div class="content-block">
      <h2>{{ labels.steps }}</h2>
      <ol>
        <li v-for="step in page.steps" :key="step">{{ step }}</li>
      </ol>
    </div>
    <div class="content-block">
      <h2>{{ labels.example }}</h2>
      <p>{{ page.example }}</p>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import type { SeoBlock } from '../i18n/content';

defineProps<{ page: SeoBlock; labels: Record<string, string> }>();
</script>
