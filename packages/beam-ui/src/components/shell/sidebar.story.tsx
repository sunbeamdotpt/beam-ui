import { Sidebar } from "./sidebar.tsx";

export default function SidebarStory() {
  return (
    <Sidebar
      sections={[
        {
          title: "Getting Started",
          items: [
            { label: "Introduction", href: "/intro" },
            { label: "Installation", href: "/install" },
          ],
        },
        {
          title: "Components",
          items: [
            {
              label: "Forms",
              href: "/forms",
              children: [
                { label: "Text Input", href: "/forms/text-input" },
                { label: "Select", href: "/forms/select" },
              ],
            },
            { label: "Layout", href: "/layout" },
          ],
        },
      ]}
    />
  );
}

export function SingleSection() {
  return (
    <Sidebar
      sections={[
        {
          title: "Navigation",
          items: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
          ],
        },
      ]}
    />
  );
}

export function ManySections() {
  return (
    <Sidebar
      sections={[
        {
          title: "Basics",
          items: [{ label: "Overview", href: "/overview" }, { label: "Install", href: "/install" }],
        },
        {
          title: "Components",
          items: [{ label: "Button", href: "/button" }, { label: "Input", href: "/input" }],
        },
        {
          title: "Patterns",
          items: [{ label: "Forms", href: "/forms" }, { label: "Tables", href: "/tables" }],
        },
      ]}
    />
  );
}
