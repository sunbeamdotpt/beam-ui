import { create, type UseBoundStore, type StoreApi } from "zustand";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/**
 * A single notification item, typically fetched from a webhook or polling endpoint.
 *
 * Represents events like PR reviews, issue updates, or repository notifications.
 */
export interface NotificationItem {
  /** Unique identifier for deduplication during polling. */
  id: string;
  /** Notification type (e.g., "pull_request", "issue", "push"). */
  type: string;
  /** Human-readable title of the notification. */
  title: string;
  /** Repository or project name associated with the notification. */
  repo: string;
  /** ISO 8601 timestamp when the notification was created. */
  timestamp: string;
  /** Whether the user has read this notification. */
  read: boolean;
  /** Optional URL to navigate to (e.g., PR or issue link). */
  url?: string;
}

/** State shape for the Zustand notifications store. */
interface NotificationState {
  /** All notifications received so far (new and read). */
  notifications: NotificationItem[];
  /** Count of unread notifications. */
  unreadCount: number;
  /** True while polling is active. */
  isPolling: boolean;
  /** ISO 8601 timestamp of last successful fetch, or null if never fetched. */
  lastFetched: string | null;
  /** Start polling for notifications at the given interval, pausing when tab is hidden. */
  startPolling: (fetchFn: () => Promise<NotificationItem[]>, intervalMs?: number) => void;
  /** Stop polling and clean up event listeners. */
  stopPolling: () => void;
  /** Mark a single notification as read by ID. */
  markRead: (id: string) => void;
  /** Mark all notifications as read. */
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

/**
 * Zustand store for real-time notifications.
 *
 * Supports long-polling with automatic deduplication and visibility-based pause/resume.
 * When the browser tab is hidden, polling pauses; when visible again, an immediate fetch occurs.
 * Persists nothing to storage — state is session-scoped.
 *
 * @example
 * ```tsx
 * function NotificationCenter() {
 *   const notifications = useNotifications((s) => s.notifications);
 *   const { startPolling, stopPolling } = useNotifications();
 *
 *   useEffect(() => {
 *     startPolling(async () => {
 *       const res = await fetch('/api/notifications');
 *       return res.json();
 *     }, 30000); // Poll every 30 seconds
 *
 *     return () => stopPolling();
 *   }, []);
 *
 *   return (
 *     <div>
 *       {notifications.map((n) => (
 *         <NotificationItem key={n.id} item={n} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export const useNotifications: UseBoundStore<StoreApi<NotificationState>> = create<NotificationState>((set, get) => ({
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
