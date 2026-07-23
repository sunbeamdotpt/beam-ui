# Footer

> Props for {@link Footer}. */
export interface FooterProps {
  /** Component used to render internal links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
}

/** Application footer with multi-column navigation and branding. Consumes {@link footerSections} from navigation data. Shows optional build label if defined. Internal links are rendered with the consumer's link component when `linkAs` is provided. * @example ```tsx <Footer /> ```

> **[View rendered page](https://design.sunbeam.pt/shell/footer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Footer } from "@sunbeam/beam-ui/components/shell/footer"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| linkAs | `LinkComponent` | No | Component used to render internal links. Defaults to a plain `<a>`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
