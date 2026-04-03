import { useState } from "react";
import { css } from "styled-system/css";
import { NotificationCenter, NotificationItem } from "@sunbeam/beam-ui/components/ui/notification-center";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "notifications", type: "Notification[]", required: true, description: "Array of notification objects." },
  { name: "onMarkRead", type: "(id: string) => void", required: true, description: "Callback when a single notification is marked as read." },
  { name: "onMarkAllRead", type: "() => void", required: true, description: "Callback to mark all notifications as read." },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

const NOTIFICATION_ITEM_PROPS = [
  { name: "notification", type: "Notification", required: true, description: "The notification object to display." },
  { name: "onMarkRead", type: "(id: string) => void", required: false, description: "Callback when the mark-as-read button is clicked. Button only shown for unread items when provided." },
];

const NOTIFICATION_INTERFACE = [
  { name: "id", type: "string", required: true, description: "Unique identifier." },
  { name: "icon", type: "string", required: false, description: "Material Symbol icon name. Use notificationIcons for suggestions." },
  { name: "title", type: "string", required: true, description: "Notification title text." },
  { name: "group", type: "string", required: false, description: "Grouping key — notifications are grouped by this value." },
  { name: "subtitle", type: "string", required: false, description: "Secondary text (sender, channel, etc.)." },
  { name: "timestamp", type: "string", required: false, description: "Human-readable timestamp." },
  { name: "read", type: "boolean", required: true, description: "Whether the notification has been read." },
  { name: "href", type: "string", required: false, description: "Optional action URL." },
  { name: "meta", type: "Record<string, unknown>", required: false, description: "Any additional metadata." },
];

import type { Notification } from "@sunbeam/beam-ui/components/ui/notification-center";

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "1", icon: "bug_report", title: "Fix memory leak in worker pool", group: "sunbeam/core", timestamp: "2 min ago", read: false },
  { id: "2", icon: "merge", title: "Add retry logic to API client", group: "sunbeam/core", timestamp: "15 min ago", read: false },
  { id: "3", icon: "alternate_email", title: "@you mentioned in design review", group: "sunbeam/beam-ui", subtitle: "Elena Rivera", timestamp: "1 hour ago", read: false },
  { id: "4", icon: "rate_review", title: "Review requested on #482", group: "sunbeam/beam-ui", timestamp: "3 hours ago", read: true },
  { id: "5", icon: "new_releases", title: "v2.4.0 published", group: "sunbeam/sdk", timestamp: "5 hours ago", read: true },
  { id: "6", icon: "mail", title: "Weekly digest from Sunbeam", group: "Email", timestamp: "1 day ago", read: true },
  { id: "7", icon: "event", title: "Design review in 30 minutes", group: "Calendar", timestamp: "Just now", read: false },
];

export function NotificationCenterPage() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <ComponentPage
      name="NotificationCenter"
      description="Dropdown component showing notifications grouped by repository. Built on Ark UI Popover with an unread count badge."
      importPath='import { NotificationCenter } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", backgroundColor: "bg.card", marginBottom: "32px" })}>
        <span className={css({ fontSize: "sm", color: "text.muted" })}>Click the bell icon to open →</span>
        <NotificationCenter
          notifications={notifications}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
        />
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}NotificationCenter{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>NotificationCenter</span>{"\n"}
              {"  "}<span className={syn.prop}>notifications</span>={"{"}notifications{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onMarkRead</span>={"{"}handleMarkRead{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onMarkAllRead</span>={"{"}handleMarkAllRead{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Empty State</h3>
        <NotificationCenter
          notifications={[]}
          onMarkRead={() => {}}
          onMarkAllRead={() => {}}
        />
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>All Read</h3>
        <NotificationCenter
          notifications={[
            { id: "1", icon: "merge", title: "Merged: Update deps", group: "sunbeam/core", timestamp: "1 day ago", read: true },
            { id: "2", icon: "new_releases", title: "v1.0.0 released", group: "sunbeam/core", timestamp: "2 days ago", read: true },
          ]}
          onMarkRead={() => {}}
          onMarkAllRead={() => {}}
        />
      </div>
      <SectionHeading id="sub-components">Sub-components</SectionHeading>

      <h3 className={variantLabel}>NotificationItem</h3>
      <p className={variantNote}>
        Standalone notification row — usable outside the NotificationCenter dropdown.
      </p>

      <h4 className={subHeading}>NotificationItem Props</h4>
      <PropsTable props={NOTIFICATION_ITEM_PROPS} />

      <h4 className={subHeading}>Notification Interface</h4>
      <PropsTable props={NOTIFICATION_INTERFACE} />

      <h4 className={subHeading}>Standalone NotificationItem</h4>
      <div className={standaloneBox}>
        <NotificationItem
          notification={{ id: "s1", icon: "merge", title: "Add retry logic to API client", subtitle: "by elena", timestamp: "15 min ago", read: false }}
          onMarkRead={(id) => alert(`Marked ${id} as read`)}
        />
        <NotificationItem
          notification={{ id: "s2", icon: "new_releases", title: "v2.4.0 published", timestamp: "5 hours ago", read: true }}
        />
        <NotificationItem
          notification={{ id: "s3", icon: "mail", title: "Weekly digest from Sunbeam", subtitle: "hello@sunbeam.pt", timestamp: "1 day ago", read: false }}
          onMarkRead={(id) => alert(`Marked ${id} as read`)}
        />
      </div>

      <h4 className={subHeading}>Collapsible groups with unread counts</h4>
      <div className={css({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", backgroundColor: "bg.card", marginBottom: "32px" })}>
        <span className={css({ fontSize: "sm", color: "text.muted" })}>Groups collapse with unread badges →</span>
        <NotificationCenter
          notifications={INITIAL_NOTIFICATIONS}
          onMarkRead={() => {}}
          onMarkAllRead={() => {}}
          onClickNotification={(n) => alert(`Clicked: ${n.title}`)}
          collapsibleGroups
        />
      </div>
    </ComponentPage>
  );
}

const standaloneBox = css({ backgroundColor: "bg.card", marginBottom: "32px", border: "1px solid", borderColor: "border.default" });
const previewLabel = css({ fontSize: "14px", color: "text.secondary", fontFamily: "body", margin: 0 });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const variantNote = css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px", lineHeight: 1.6 });
const subHeading = css({ fontSize: "16px", fontWeight: "heading", color: "text.primary", marginBottom: "8px", marginTop: "24px", fontFamily: "mono" });
