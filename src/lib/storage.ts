export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota/storage errors in prototype mode
  }
}

export function removeStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

export const STORAGE_KEYS = {
  AUTH_USER: "codeaegis_auth_user",
  PROJECTS: "codeaegis_projects",
  REQUIREMENTS: "codeaegis_requirements",
  FINDINGS: "codeaegis_findings",
  ANALYSES: "codeaegis_analyses",
  SETTINGS: "codeaegis_settings",
} as const;
