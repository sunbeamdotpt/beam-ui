import { List } from "./list";

export default function ListStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 480 }}>
      <List
        items={[
          { label: "Dashboard", description: "Overview of key metrics", icon: "dashboard" },
          { label: "Settings", description: "Manage your preferences", icon: "settings" },
          { label: "Billing", description: "View invoices and payment methods", icon: "credit_card" },
        ]}
        variant="bordered"
      />
      <List
        items={[
          { label: "Step one: create an account" },
          { label: "Step two: verify your email" },
          { label: "Step three: start building" },
        ]}
        ordered
        variant="compact"
      />
    </div>
  );
}

export function DefaultVariant() {
  return (
    <List items={[{ label: "Item A" }, { label: "Item B" }, { label: "Item C" }]} variant="default" />
  );
}

export function CompactVariant() {
  return (
    <List items={[{ label: "One" }, { label: "Two" }, { label: "Three" }]} variant="compact" />
  );
}

export function BorderedVariant() {
  return (
    <List items={[{ label: "Alpha", icon: "star" }, { label: "Beta", icon: "code" }]} variant="bordered" />
  );
}

export function Ordered() {
  return (
    <List items={[{ label: "First" }, { label: "Second" }, { label: "Third" }]} ordered />
  );
}

export function Unordered() {
  return (
    <List items={[{ label: "Apples" }, { label: "Bananas" }, { label: "Cherries" }]} />
  );
}

export function WithDescriptions() {
  return (
    <List items={[
      { label: "Dashboard", description: "Overview of metrics" },
      { label: "Settings", description: "Manage preferences" },
    ]} variant="default" />
  );
}

export function WithIcons() {
  return (
    <List items={[
      { label: "Home", icon: "home" },
      { label: "Settings", icon: "settings" },
      { label: "Profile", icon: "person" },
    ]} variant="bordered" />
  );
}

export function OrderedCompact() {
  return (
    <List items={[{ label: "First" }, { label: "Second" }, { label: "Third" }]} ordered variant="compact" />
  );
}

export function OrderedBordered() {
  return (
    <List items={[{ label: "First" }, { label: "Second" }, { label: "Third" }]} ordered variant="bordered" />
  );
}
