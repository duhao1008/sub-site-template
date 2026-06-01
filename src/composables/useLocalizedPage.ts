import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { t, type Locale, type PageId } from '../i18n/content';

export function useLocalizedPage(pageId: PageId) {
  const route = useRoute();
  const locale = computed(() => (route.meta.locale || 'en') as Locale);
  const dict = computed(() => t(locale.value));
  const labels = computed(() => dict.value.ui);
  const page = computed(() => dict.value.pages[pageId]);

  return { locale, labels, page };
}
