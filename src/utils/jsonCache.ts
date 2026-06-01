const jsonCache = new Map<string, Promise<unknown>>();

export async function fetchCachedJson<T>(url: string): Promise<T> {
  if (!jsonCache.has(url)) {
    const request = fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        return response.json();
      })
      .catch((error) => {
        jsonCache.delete(url);
        throw error;
      });

    jsonCache.set(url, request);
  }

  return jsonCache.get(url) as Promise<T>;
}
