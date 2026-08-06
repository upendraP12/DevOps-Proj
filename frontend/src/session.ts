const TOKEN_KEY = 'devops-ai-monitor-token';
const SESSION_EXPIRES_KEY = 'devops-ai-monitor-session-expires';
const REFRESH_COUNT_KEY = 'devops-ai-monitor-refresh-count';
const REFRESH_LAST_KEY = 'devops-ai-monitor-refresh-last';
const ROLE_KEY = 'devops-ai-monitor-role';

export const SESSION_TIMEOUT_MS = 10 * 60 * 1000;
export const REFRESH_WINDOW_MS = 60 * 1000;
export const MAX_REFRESHES = 5;

export function startSession() {
  if (typeof window === 'undefined') return;
  const expiresAt = Date.now() + SESSION_TIMEOUT_MS;
  window.localStorage.setItem(SESSION_EXPIRES_KEY, String(expiresAt));
  window.sessionStorage.removeItem(REFRESH_COUNT_KEY);
  window.sessionStorage.removeItem(REFRESH_LAST_KEY);
}

export function extendSession() {
  if (typeof window === 'undefined') return;
  if (!window.localStorage.getItem(TOKEN_KEY)) return;
  window.localStorage.setItem(SESSION_EXPIRES_KEY, String(Date.now() + SESSION_TIMEOUT_MS));
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(SESSION_EXPIRES_KEY);
  window.localStorage.removeItem(ROLE_KEY);
  window.sessionStorage.removeItem(REFRESH_COUNT_KEY);
  window.sessionStorage.removeItem(REFRESH_LAST_KEY);
}

export function isSessionActive() {
  if (typeof window === 'undefined') return false;
  const token = window.localStorage.getItem(TOKEN_KEY);
  const expiresAt = Number(window.localStorage.getItem(SESSION_EXPIRES_KEY) || '0');
  return Boolean(token) && Date.now() < expiresAt;
}

export function shouldSignOutFromRefresh() {
  if (typeof window === 'undefined') return false;
  const now = Date.now();
  const lastRefresh = Number(window.sessionStorage.getItem(REFRESH_LAST_KEY) || '0');
  const refreshCount = Number(window.sessionStorage.getItem(REFRESH_COUNT_KEY) || '0');

  if (now - lastRefresh > REFRESH_WINDOW_MS) {
    window.sessionStorage.setItem(REFRESH_COUNT_KEY, '1');
    window.sessionStorage.setItem(REFRESH_LAST_KEY, String(now));
    return false;
  }

  const nextCount = refreshCount + 1;
  window.sessionStorage.setItem(REFRESH_COUNT_KEY, String(nextCount));
  window.sessionStorage.setItem(REFRESH_LAST_KEY, String(now));

  return nextCount >= MAX_REFRESHES;
}
