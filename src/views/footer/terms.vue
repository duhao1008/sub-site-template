<template>
  <div class="page terms-page">
    <section class="terms-layout">
      <div class="terms-copy">
        <h1>{{ page.h1 }}</h1>
        <p>{{ terms.intro }}</p>
        <span>{{ terms.updated }}</span>
      </div>

      <ul class="terms-list">
        <li v-for="item in terms.items" :key="item.title">
          <strong>{{ item.title }}</strong>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLocalizedPage } from '../../composables/useLocalizedPage';
import { getTermsContent } from '../../i18n/terms';

const { locale, page } = useLocalizedPage('terms');
const terms = computed(() => getTermsContent(locale.value));
</script>
