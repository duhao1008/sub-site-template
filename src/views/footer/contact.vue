<template>
  <div class="page narrow">
    <section class="page-heading">
      <h1>{{ page.h1 }}</h1>
      <p>{{ page.intro }}</p>
    </section>
    <section class="content-block">
      <ul class="plain-list">
        <li v-for="step in page.steps" :key="step">{{ step }}</li>
      </ul>
      <p>{{ page.example }}</p>
      <p class="contact-line">{{ labels.contactEmail }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLocalizedPage } from '../../composables/useLocalizedPage';

const { labels, page } = useLocalizedPage('contact');
</script>
