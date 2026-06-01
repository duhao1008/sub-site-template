<template>
  <div class="page narrow">
    <section class="page-heading">
      <h1>{{ page.h1 }}</h1>
      <p>{{ page.intro }}</p>
    </section>
    <section class="content-block">
      <details v-for="item in faqItems" :key="item.q" open>
        <summary>{{ item.q }}</summary>
        <p>{{ item.a }}</p>
      </details>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocalizedPage } from '../../composables/useLocalizedPage';
import { getFaqItems } from '../../i18n/faqs';

const { locale, page } = useLocalizedPage('faq');
const faqItems = computed(() => getFaqItems(locale.value));
</script>
