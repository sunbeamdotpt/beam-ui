import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverCloseTrigger,
} from "@ark-ui/react/popover";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

export interface Notification {
  id: string;
  type: "issue" | "pr" | "release" | "mention" | "review";
  title: string;
  repo: string;
  timestamp: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  className?: string;
}

const typeIconMap: Record<Notification["type"], string> = {
  issue: "bug_report",
  pr: "merge",
  release: "new_releases",
  mention: "alternate_email",
  review: "rate_review",
};

/** Standalone notification row — usable outside the NotificationCenter dropdown. */
export function NotificationItem({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead?: (id: string) => void;
}) {
  return (
    <div className={cx(notifRow, !notification.read ? notifUnread : undefined)}>
      <Icon name={typeIconMap[notification.type]} size={18} className={typeIcon} />
      <div className={notifContent}>
        <span className={notifTitle}>{notification.title}</span>
        <span className={notifTime}>{notification.timestamp}</span>
      </div>
      {!notification.read && onMarkRead && (
        <button
          className={markReadBtn}
          onClick={() => onMarkRead(notification.id)}
          aria-label="Mark as read"
        >
          <Icon name="check" size={14} />
        </button>
      )}
    </div>
  );
}

export function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  className,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Group by repo
  const grouped = notifications.reduce<Record<string, Notification[]>>(
    (acc, notif) => {
      if (!acc[notif.repo]) acc[notif.repo] = [];
      acc[notif.repo].push(notif);
      return acc;
    },
    {}
  );

  return (
    <PopoverRoot positioning={{ placement: "bottom-end" }}>
      <PopoverTrigger asChild>
        <button className={cx(triggerBtn, className)}>
          <Icon name="notifications" size={20} />
          {unreadCount > 0 && <span className={badge}>{unreadCount}</span>}
        </button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className={popoverContent}>
          <div className={header}>
            <span className={headerTitle}>Notifications</span>
            <div className={headerActions}>
              {unreadCount > 0 && (
                <button className={markAllBtn} onClick={onMarkAllRead}>
                  Mark all as read
                </button>
              )}
              <PopoverCloseTrigger className={closeBtn}>
                <Icon name="close" size={16} />
              </PopoverCloseTrigger>
            </div>
          </div>

          <div className={body}>
            {notifications.length === 0 ? (
              <div className={emptyState}>
                <Icon name="notifications_none" size={32} className={emptyIcon} />
                <p>No notifications</p>
              </div>
            ) : (
              Object.entries(grouped).map(([repo, items]) => (
                <div key={repo}>
                  <div className={groupHeader}>{repo}</div>
                  {items.map((notif) => (
                    <div
                      key={notif.id}
                      className={cx(
                        notifRow,
                        !notif.read ? notifUnread : undefined
                      )}
                    >
                      <Icon
                        name={typeIconMap[notif.type]}
                        size={18}
                        className={typeIcon}
                      />
                      <div className={notifContent}>
                        <span className={notifTitle}>{notif.title}</span>
                        <span className={notifTime}>{notif.timestamp}</span>
                      </div>
                      {!notif.read && (
                        <button
                          className={markReadBtn}
                          onClick={() => onMarkRead(notif.id)}
                          title="Mark as read"
                        >
                          <Icon name="check" size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </PopoverRoot>
  );
}

const triggerBtn = css({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  backgroundColor: "transparent",
  border: "1px solid",
  borderColor: "border.default",
  color: "text.primary",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _hover: {
    borderColor: "sunbeam.orange",
    color: "sunbeam.orange",
  },
});

const badge = css({
  position: "absolute",
  top: "-4px",
  right: "-4px",
  minWidth: "18px",
  height: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "sunbeam.orange",
  color: "white",
  fontSize: "10px",
  fontWeight: "button",
  fontFamily: "body",
  borderRadius: "full",
  padding: "0 4px",
  lineHeight: 1,
});

const popoverContent = css({
  width: "360px",
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  zIndex: 50,
  outline: "none",
});

const header = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px",
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const headerTitle = css({
  fontSize: "16px",
  fontWeight: "heading",
  fontFamily: "heading",
  color: "text.primary",
});

const headerActions = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const markAllBtn = css({
  fontSize: "11px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "sunbeam.orange",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontFamily: "body",
  _hover: {
    textDecoration: "underline",
  },
});

const closeBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  padding: "4px",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});

const body = css({
  maxHeight: "400px",
  overflowY: "auto",
});

const emptyState = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "48px 16px",
  color: "text.muted",
  fontSize: "14px",
  fontFamily: "body",
});

const emptyIcon = css({
  color: "text.muted",
});

const groupHeader = css({
  padding: "8px 16px",
  fontSize: "10px",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: "text.muted",
  fontFamily: "body",
  backgroundColor: "bg.card",
  borderBottom: "1px solid",
  borderColor: "border.default",
});

const notifRow = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  padding: "12px 16px",
  borderBottom: "1px solid",
  borderColor: "border.default",
  borderLeft: "3px solid transparent",
  transition: "all 0.1s ease",
});

const notifUnread = css({
  borderLeftColor: "sunbeam.orange",
  backgroundColor: "bg.card",
});

const typeIcon = css({
  color: "text.muted",
  flexShrink: 0,
  marginTop: "2px",
});

const notifContent = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

const notifTitle = css({
  fontSize: "13px",
  fontFamily: "body",
  color: "text.primary",
  lineHeight: 1.4,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const notifTime = css({
  fontSize: "11px",
  fontFamily: "body",
  color: "text.muted",
});

const markReadBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  backgroundColor: "transparent",
  border: "none",
  color: "text.muted",
  cursor: "pointer",
  flexShrink: 0,
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});
