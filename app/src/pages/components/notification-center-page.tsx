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
  { name: "id", type: "string", required: true, description: "Unique identifier for the notification." },
  { name: "type", type: '"issue" | "pr" | "release" | "mention" | "review"', required: true, description: "Notification type, determines the icon shown." },
  { name: "title", type: "string", required: true, description: "Notification title text." },
  { name: "repo", type: "string", required: true, description: "Repository name (e.g. \"sunbeam/core\")." },
  { name: "timestamp", type: "string", required: true, description: "Human-readable timestamp string." },
  { name: "read", type: "boolean", required: true, description: "Whether the notification has been read." },
];

interface Notification {
  id: string;
  type: "issue" | "pr" | "release" | "mention" | "review";
  title: string;
  repo: string;
  timestamp: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "1", type: "issue", title: "Fix memory leak in worker pool", repo: "sunbeam/core", timestamp: "2 min ago", read: false },
  { id: "2", type: "pr", title: "Add retry logic to API client", repo: "sunbeam/core", timestamp: "15 min ago", read: false },
  { id: "3", type: "mention", title: "@you mentioned in design review", repo: "sunbeam/beam-ui", timestamp: "1 hour ago", read: false },
  { id: "4", type: "review", title: "Review requested on #482", repo: "sunbeam/beam-ui", timestamp: "3 hours ago", read: true },
  { id: "5", type: "release", title: "v2.4.0 published", repo: "sunbeam/sdk", timestamp: "5 hours ago", read: true },
  { id: "6", type: "pr", title: "Update token generation pipeline", repo: "sunbeam/sdk", timestamp: "1 day ago", read: true },
  { id: "7", type: "issue", title: "Dark mode contrast issues", repo: "sunbeam/beam-ui", timestamp: "2 days ago", read: false },
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
      <div className={previewBox}>
        <p className={previewLabel}>Click the bell icon to open the notification center:</p>
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
            { id: "1", type: "pr", title: "Merged: Update deps", repo: "sunbeam/core", timestamp: "1 day ago", read: true },
            { id: "2", type: "release", title: "v1.0.0 released", repo: "sunbeam/core", timestamp: "2 days ago", read: true },
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

      <h4 className={subHeading}>Standalone Preview</h4>
      <div className={previewBox}>
        <NotificationItem
          notification={{ id: "s1", type: "pr", title: "Add retry logic to API client", repo: "sunbeam/core", timestamp: "15 min ago", read: false }}
          onMarkRead={(id) => alert(`Marked ${id} as read`)}
        />
        <NotificationItem
          notification={{ id: "s2", type: "release", title: "v2.4.0 published", repo: "sunbeam/sdk", timestamp: "5 hours ago", read: true }}
        />
      </div>

      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}NotificationItem{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>NotificationItem</span>{"\n"}
              {"  "}<span className={syn.prop}>notification</span>={"{"}{"{ "}id: <span className={syn.string}>"1"</span>, type: <span className={syn.string}>"pr"</span>, title: <span className={syn.string}>"..."</span>, ...{" }"}{"}"}{"\n"}
              {"  "}<span className={syn.prop}>onMarkRead</span>={"{"}handleMarkRead{"}"}{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />
    </ComponentPage>
  );
}

const previewBox = css({ display: "flex", flexDirection: "column", gap: "12px", padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const previewLabel = css({ fontSize: "14px", color: "text.secondary", fontFamily: "body", margin: 0 });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
const variantNote = css({ fontSize: "14px", color: "text.secondary", marginBottom: "16px", lineHeight: 1.6 });
const subHeading = css({ fontSize: "16px", fontWeight: "heading", color: "text.primary", marginBottom: "8px", marginTop: "24px", fontFamily: "mono" });
