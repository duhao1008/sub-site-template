import { computed, ref, shallowRef, watch, type Ref } from 'vue';
import { fetchCachedJson } from '../utils/jsonCache';

interface RemotePagination {
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
}

interface RemoteDirectoryOptions<TData, TItem, TLocale extends string> {
  url: string;
  locale: Ref<TLocale>;
  pageSize: number;
  errorMessage: string;
  mapItems: (data: TData, locale: TLocale) => TItem[];
}

export function useRemoteDirectory<TData, TItem, TLocale extends string>(
  options: RemoteDirectoryOptions<TData, TItem, TLocale>,
) {
  const rawData = shallowRef<TData | null>(null);
  const items = shallowRef<TItem[]>([]);
  const query = ref('');
  const appliedQuery = ref('');
  const currentPage = ref(1);
  const totalItems = ref(0);
  const remotePageCount = ref(1);
  const loading = ref(false);
  const error = ref('');

  const pageCount = computed(() => remotePageCount.value);
  const pagedItems = computed(() => items.value);

  watch(options.locale, () => {
    if (!rawData.value) return;
    items.value = options.mapItems(rawData.value, options.locale.value);
  });

  watch(pageCount, () => {
    if (currentPage.value > pageCount.value) currentPage.value = pageCount.value;
  });

  watch(currentPage, () => {
    loadItems();
  });

  async function loadItems() {
    loading.value = true;
    error.value = '';

    try {
      rawData.value = await fetchCachedJson<TData>(
        buildPageUrl(options.url, currentPage.value, options.pageSize, appliedQuery.value),
      );
      items.value = options.mapItems(rawData.value, options.locale.value);
      const pagination = (rawData.value as { pagination?: RemotePagination }).pagination;
      totalItems.value = pagination?.total ?? items.value.length;
      remotePageCount.value = Math.max(1, pagination?.totalPages ?? Math.ceil(totalItems.value / options.pageSize));
    } catch (err) {
      error.value = err instanceof Error ? err.message : options.errorMessage;
      rawData.value = null;
      items.value = [];
      totalItems.value = 0;
      remotePageCount.value = 1;
    } finally {
      loading.value = false;
    }
  }

  loadItems();

  function applySearch() {
    appliedQuery.value = query.value.trim();
    if (currentPage.value === 1) {
      loadItems();
      return;
    }
    currentPage.value = 1;
  }

  return {
    items,
    query,
    applySearch,
    currentPage,
    totalItems,
    loading,
    error,
    pageCount,
    pagedItems,
  };
}

function buildPageUrl(url: string, page: number, pageSize: number, keyword: string): string {
  try {
    const target = new URL(url);
    target.searchParams.set('page', String(page));
    target.searchParams.set('pageSize', String(pageSize));
    const normalizedKeyword = keyword.trim();
    if (normalizedKeyword) {
      target.searchParams.set('keyword', normalizedKeyword);
    } else {
      target.searchParams.delete('keyword');
    }
    return target.toString();
  } catch {
    return url;
  }
}
