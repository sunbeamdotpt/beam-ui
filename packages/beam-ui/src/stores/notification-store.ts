import { create } from "zustand";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  repo: string;
  timestamp: string;
  read: boolean;
  url?: string;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  isPolling: boolean;
  lastFetched: string | null;
  startPolling: (fetchFn: () => Promise<NotificationItem[]>, intervalMs?: number) => void;
  stopPolling: () => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

/* ------------------------------------------------------------------ */
/* Internal state                                                      */
/* ------------------------------------------------------------------ */

let intervalId: ReturnType<typeof setInterval> | null = null;
let currentFetchFn: (() => Promise<NotificationItem[]>) | null = null;
let isPaused = false;

function handleVisibilityChange() {
  if (document.hidden) {
    isPaused = true;
  } else {
    isPaused = false;
    // Fetch immediately when tab becomes visible again
    if (currentFetchFn) {
      doFetch(currentFetchFn);
    }
  }
}

async function doFetch(fetchFn: () => Promise<NotificationItem[]>) {
  try {
    const items = await fetchFn();
    const { notifications: existing } = useNotifications.getState();
    const existingIds = new Set(existing.map((n) => n.id));

    // Deduplicate: merge new items, update existing ones
    const merged = [...existing];
    for (const item of items) {
      if (!existingIds.has(item.id)) {
        merged.push(item);
      }
    }

    useNotifications.setState({
      notifications: merged,
      unreadCount: merged.filter((n) => !n.read).length,
      lastFetched: new Date().toISOString(),
    });
  } catch {
    // Silently fail — polling will retry on next interval
  }
}

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

export const useNotifications = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isPolling: false,
  lastFetched: null,

  startPolling: (fetchFn, intervalMs = 30000) => {
    // Clean up any existing polling
    if (intervalId) {
      clearInterval(intervalId);
    }

    currentFetchFn = fetchFn;
    isPaused = false;

    // Initial fetch
    doFetch(fetchFn);

    // Set up interval
    intervalId = setInterval(() => {
      if (!isPaused) {
        doFetch(fetchFn);
      }
    }, intervalMs);

    // Listen for visibility changes
    document.addEventListener("visibilitychange", handleVisibilityChange);

    set({ isPolling: true });
  },

  stopPolling: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    currentFetchFn = null;
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    set({ isPolling: false });
  },

  markRead: (id) => {
    const notifications = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  },

  markAllRead: () => {
    const notifications = get().notifications.map((n) => ({ ...n, read: true }));
    set({ notifications, unreadCount: 0 });
  },
}));
