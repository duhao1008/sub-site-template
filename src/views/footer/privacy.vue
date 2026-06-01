<template>
  <div class="page terms-page">
    <section class="terms-layout">
      <div class="terms-copy">
        <h1>{{ page.h1 }}</h1>
        <p>{{ privacy.intro }}</p>
        <span>{{ privacy.updated }}</span>
      </div>

      <ul class="terms-list">
        <li v-for="item in privacy.items" :key="item.title">
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
import { getPrivacyContent } from '../../i18n/privacy';

const { locale, page } = useLocalizedPage('privacy');
const privacy = computed(() => getPrivacyContent(locale.value));
</script>
