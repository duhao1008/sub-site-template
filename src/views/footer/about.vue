<template>
  <div class="page narrow">
    <section class="page-heading">
      <h1>{{ page.h1 }}</h1>
      <p>{{ page.intro }}</p>
    </section>
    <section class="content-block">
      <p>{{ page.example }}</p>
      <p>{{ labels.privacy }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLocalizedPage } from '../../composables/useLocalizedPage';

const { labels, page } = useLocalizedPage('about');
</script>
