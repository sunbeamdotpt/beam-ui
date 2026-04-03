import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverCloseTrigger,
} from "@ark-ui/react/popover";
import { useState } from "react";
import { css, cx } from "styled-system/css";
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@ark-ui/react/collapsible";
import { Icon } from "./icon";
import { ScrollArea } from "./scroll-area";

export interface Notification {
  id: string;
  /** Material Symbol icon name, or a ReactNode for custom icons */
  icon?: string;
  title: string;
  /** Grouping key — notifications are grouped by this value (e.g., repo name, app name, channel) */
  group?: string;
  /** Secondary text — timestamp, sender, channel, etc. */
  subtitle?: string;
  /** Human-readable timestamp */
  timestamp?: string;
  read: boolean;
  /** Optional action URL */
  href?: string;
  /** Any additional metadata the consumer wants to attach */
  meta?: Record<string, unknown>;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onClickNotification?: (notification: Notification) => void;
  /** Header title. Defaults to "Notifications" */
  title?: string;
  /** Trigger icon. Defaults to "notifications" */
  triggerIcon?: string;
  /** Make groups collapsible with unread count badges. Defaults to false. */
  collapsibleGroups?: boolean;
  className?: string;
}

/** Built-in icon suggestions for common notification types */
export const notificationIcons = {
  // Code forge
  issue: "bug_report",
  pr: "merge",
  release: "new_releases",
  mention: "alternate_email",
  review: "rate_review",
  commit: "commit",
  // Communication
  email: "mail",
  chat: "chat",
  dm: "forum",
  // Calendar
  event: "event",
  reminder: "alarm",
  // Storage
  upload: "cloud_upload",
  share: "share",
  // System
  security: "security",
  update: "system_update",
  warning: "warning",
  info: "info",
} as const;

/** Standalone notification row — usable outside the NotificationCenter dropdown. */
export function NotificationItem({
  notification,
  onMarkRead,
  onClick,
}: {
  notification: Notification;
  onMarkRead?: (id: string) => void;
  onClick?: (notification: Notification) => void;
}) {
  return (
    <div
      className={cx(notifRow, !notification.read ? notifUnread : undefined, onClick && clickableRow)}
      onClick={() => onClick?.(notification)}
    >
      {notification.icon && (
        <Icon name={notification.icon} size={18} className={typeIcon} />
      )}
      <div className={notifContent}>
        <span className={notifTitle}>{notification.title}</span>
        {(notification.subtitle || notification.timestamp) && (
          <span className={notifTime}>
            {notification.subtitle}
            {notification.subtitle && notification.timestamp && " · "}
            {notification.timestamp}
          </span>
        )}
      </div>
      {!notification.read && onMarkRead && (
        <button
          className={markReadBtn}
          onClick={(e) => { e.stopPropagation(); onMarkRead(notification.id); }}
          aria-label="Mark as read"
        >
          <Icon name="check" size={14} />
        </button>
      )}
    </div>
  );
}

function CollapsibleGroup({
  group,
  items,
  onMarkRead,
  onClick,
}: {
  group: string;
  items: Notification[];
  onMarkRead: (id: string) => void;
  onClick?: (n: Notification) => void;
}) {
  const [open, setOpen] = useState(true);
  const groupUnread = items.filter((n) => !n.read).length;

  return (
    <CollapsibleRoot open={open} onOpenChange={(d) => setOpen(d.open)}>
      <CollapsibleTrigger className={groupTrigger}>
        <span>{group}</span>
        <span className={groupRight}>
          {!open && groupUnread > 0 && (
            <span className={groupUnreadBadge}>{groupUnread}</span>
          )}
          <Icon name={open ? "expand_less" : "expand_more"} size={16} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {items.map((notif) => (
          <NotificationItem
            key={notif.id}
            notification={notif}
            onMarkRead={onMarkRead}
            onClick={onClick}
          />
        ))}
      </CollapsibleContent>
    </CollapsibleRoot>
  );
}

export function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClickNotification,
  title: headerText = "Notifications",
  triggerIcon = "notifications",
  collapsibleGroups = false,
  className,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Group by group field (ungrouped items go under "")
  const grouped = notifications.reduce<Record<string, Notification[]>>(
    (acc, notif) => {
      const key = notif.group ?? "";
      if (!acc[key]) acc[key] = [];
      acc[key].push(notif);
      return acc;
    },
    {}
  );

  return (
    <PopoverRoot positioning={{ placement: "bottom-end" }}>
      <PopoverTrigger asChild>
        <button className={cx(triggerBtn, className)}>
          <Icon name={triggerIcon} size={20} />
          {unreadCount > 0 && <span className={badge}>{unreadCount}</span>}
        </button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className={popoverContent}>
          <div className={header}>
            <span className={headerTitle}>{headerText}</span>
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

          <ScrollArea maxHeight="400px" scrollbar="visible">
            {notifications.length === 0 ? (
              <div className={emptyState}>
                <Icon name="notifications_none" size={32} className={emptyIcon} />
                <p>No notifications</p>
              </div>
            ) : (
              Object.entries(grouped).map(([group, items]) => {
                const groupUnread = items.filter((n) => !n.read).length;

                if (collapsibleGroups && group) {
                  return (
                    <CollapsibleGroup
                      key={group}
                      group={group}
                      items={items}
                      onMarkRead={onMarkRead}
                      onClick={onClickNotification}
                    />
                  );
                }

                return (
                  <div key={group}>
                    {group && <div className={groupHeader}>{group}</div>}
                    {items.map((notif) => (
                      <NotificationItem
                        key={notif.id}
                        notification={notif}
                        onMarkRead={onMarkRead}
                        onClick={onClickNotification}
                      />
                    ))}
                  </div>
                );
              })
            )}
          </ScrollArea>
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

const groupTrigger = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
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
  border: "none",
  cursor: "pointer",
  _hover: { color: "text.primary" },
});

const groupRight = css({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

const groupUnreadBadge = css({
  fontSize: "10px",
  fontFamily: "mono",
  fontWeight: "button",
  color: "white",
  backgroundColor: "sunbeam.orange",
  borderRadius: "full",
  minWidth: "18px",
  height: "18px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 4px",
  lineHeight: 1,
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
  paddingLeft: "19px",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
  position: "relative",
  transition: "background 0.1s ease",
});

const clickableRow = css({
  cursor: "pointer",
  _hover: { backgroundColor: "bg.card" },
});

const notifUnread = css({
  backgroundColor: "bg.card",
  _before: {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: "sunbeam.orange",
  },
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
