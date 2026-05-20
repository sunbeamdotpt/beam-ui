import { Breadcrumbs } from "./breadcrumbs.tsx";

export default function BreadcrumbsStory() {
  return (
    <Breadcrumbs
      items={[
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Breadcrumbs" },
      ]}
    />
  );
}

export function SingleItem() {
  return <Breadcrumbs items={[{ label: "Home" }]} />;
}

export function DeepPath() {
  return (
    <Breadcrumbs
      items={[
        { label: "Home", href: "/" },
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/components" },
        { label: "UI", href: "/docs/components/ui" },
        { label: "Button" },
      ]}
    />
  );
}
