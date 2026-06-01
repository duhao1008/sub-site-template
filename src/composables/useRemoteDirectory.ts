import { computed, ref, shallowRef, watch, type Ref } from 'vue';
import { fetchCachedJson } from '../utils/jsonCache';

interface RemoteDirectoryOptions<TData, TItem, TLocale extends string> {
  url: string;
  locale: Ref<TLocale>;
  pageSize: number;
  errorMessage: string;
  mapItems: (data: TData, locale: TLocale) => TItem[];
  getSearchText: (item: TItem) => string;
}

export function useRemoteDirectory<TData, TItem, TLocale extends string>(
  options: RemoteDirectoryOptions<TData, TItem, TLocale>,
) {
  const rawData = shallowRef<TData | null>(null);
  const items = shallowRef<TItem[]>([]);
  const query = ref('');
  const currentPage = ref(1);
  const loading = ref(false);
  const error = ref('');

  const filteredItems = computed(() => {
    const keyword = query.value.trim().toLowerCase();
    if (!keyword) return items.value;
    return items.value.filter((item) => options.getSearchText(item).toLowerCase().includes(keyword));
  });

  const pageCount = computed(() => Math.max(1, Math.ceil(filteredItems.value.length / options.pageSize)));
  const pagedItems = computed(() => {
    const start = (currentPage.value - 1) * options.pageSize;
    return filteredItems.value.slice(start, start + options.pageSize);
  });

  watch(options.locale, () => {
    if (!rawData.value) return;
    items.value = options.mapItems(rawData.value, options.locale.value);
    currentPage.value = 1;
  });

  watch(query, () => {
    currentPage.value = 1;
  });

  watch(pageCount, () => {
    if (currentPage.value > pageCount.value) currentPage.value = pageCount.value;
  });

  async function loadItems() {
    loading.value = true;
    error.value = '';

    try {
      rawData.value = await fetchCachedJson<TData>(options.url);
      items.value = options.mapItems(rawData.value, options.locale.value);
    } catch (err) {
      error.value = err instanceof Error ? err.message : options.errorMessage;
      rawData.value = null;
      items.value = [];
    } finally {
      loading.value = false;
    }
  }

  loadItems();

  return {
    items,
    query,
    currentPage,
    loading,
    error,
    filteredItems,
    pageCount,
    pagedItems,
  };
}
