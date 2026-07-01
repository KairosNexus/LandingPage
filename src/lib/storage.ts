function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

export function getStorageItem(key: string): string | null {
  try {
    return getLocalStorage()?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: string) {
  try {
    getLocalStorage()?.setItem(key, value);
  } catch {
    // Storage can be unavailable in private or embedded browsers.
  }
}

export function removeStorageItem(key: string) {
  try {
    getLocalStorage()?.removeItem(key);
  } catch {
    // Storage can be unavailable in private or embedded browsers.
  }
}
