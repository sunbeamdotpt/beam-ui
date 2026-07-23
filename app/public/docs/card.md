# Card

> Visual surface variant for {@link Card}. */
export type CardVariant = "elevated" | "outlined";

/** Own props for {@link Card}, independent of the rendered element. */
export interface CardOwnProps {
  /** Visual surface variant. */
  variant?: CardVariant;
  /** Material icon name. When provided alongside `title`, renders a structured content card. */
  icon?: string;
  /** Card heading. When provided, renders a structured content card instead of a generic container. */
  title?: string;
  /** Card description text. */
  description?: string;
  /** Link destination. When provided, the whole card becomes a link. */
  href?: string;
  /** Internal call-to-action link rendered inside the card. */
  action?: { label: string; href: string };
  /** Additional Panda CSS classes. */
  className?: string;
  /** Generic card content. Ignored when `title` is provided. */
  children?: ReactNode;
}

/** Props for {@link Card}. */
export type CardProps<T extends ElementType = "article"> =
  & CardOwnProps
  & Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps | "as">
  & {
    /** Element or component to render. Defaults to `article` (or `a` when `href` is set). */
    as?: T;
  };

const elevatedSurface = css({
  backgroundColor: "bg.card",
  padding: { base: "24px", lg: "40px" },
  borderRadius: "0",
  shadow: "golden",
  transition: "all 0.3s ease",
  _hover: { translateY: "-1px" },
});

const outlinedSurface = css({
  backgroundColor: "bg.card",
  padding: "32px",
  border: "1px solid",
  borderColor: "border.warm",
  borderRadius: "0",
  transition: "border-color 0.2s ease",
  _hover: { borderColor: "sunbeam.orange" },
});

const iconBox = css({
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
  color: "sunbeam.orange",
});

const iconBoxCompact = css({
  color: "sunbeam.orange",
  fontSize: "36px",
  marginBottom: "16px",
});

const titleStyle = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  textTransform: "uppercase",
  letterSpacing: "-0.025em",
  marginBottom: "16px",
});

const titleStyleCompact = css({
  fontSize: "20px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "8px",
});

const descriptionStyle = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const descriptionStyleCompact = css({
  fontSize: "14px",
  color: "text.secondary",
  lineHeight: 1.6,
  marginBottom: "0",
});

const ctaLink = css({
  color: "sunbeam.orange",
  fontWeight: "button",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  textTransform: "uppercase",
  fontSize: "14px",
  letterSpacing: "0.1em",
  textDecoration: "none",
  transition: "gap 0.2s ease",
  _hover: { gap: "12px" },
});

/** Single card implementation that serves as both a generic surface and a structured content card. * **Container mode** — pass `children` and no `title`: ```tsx <Card> <h3>Anything goes here</h3> </Card> ``` * **Content mode** — pass `title` (and usually `icon` + `description`): - `href` makes the whole card a link. - `action` renders a separate CTA inside the card. - neither produces a static content card. * Use `variant="outlined"` for the bordered CapabilityCard/TopicCard look, or `variant="elevated"` (default) for the shadow-lift FeatureCard look. * @example ```tsx <Card icon="code" title="API" description="..." action={{ label: "Explore", href: "/api" }} /> <Card icon="guide" title="Guide" description="..." href="/guide" variant="outlined" /> <Card icon="shield" title="Security" description="..." variant="outlined" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/card?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Card } from "@sunbeam/beam-ui/components/ui/card"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| variant | `CardVariant` | No | Visual surface variant. |
| icon | `string` | No | Material icon name. When provided alongside `title`, renders a structured content card. |
| title | `string` | No | Card heading. When provided, renders a structured content card instead of a generic container. |
| description | `string` | No | Card description text. |
| href | `string` | No | Link destination. When provided, the whole card becomes a link. |
| action | `{ label: string` | No | Internal call-to-action link rendered inside the card. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
