# StatBar

> Model statistics for display in a stat bar. */
export interface ModelStats {
  /** Speed rating (0–5). */
  speed: number;
  /** Performance rating (0–5). */
  performance: number;
  /** Array of modality strings (e.g., "text", "image", "audio"). */
  modalities: string[];
  /** Context window display (e.g., "200K"). */
  context: string;
  /** Input price per token. */
  priceIn: string;
  /** Output price per token. */
  priceOut: string;
}

const grid = css({
  display: "grid",
  gridTemplateColumns: {
    base: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(5, 1fr)",
  },
  paddingBlock: "6",
  marginBottom: "12",
  gap: { base: "4", lg: "0" },
});

const cell = css({
  paddingInline: "4",
  textAlign: "center",
  borderRightWidth: "0.25",
  borderRightStyle: "solid",
  borderColor: "border.subtle",
  _last: {
    borderRight: "none",
  },
});

const label = css({
  fontSize: "2xs",
  fontWeight: "button",
  color: "text.muted",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  marginBottom: "2",
});

const bars = css({
  display: "flex",
  justifyContent: "center",
  gap: "0.5",
});

const barFilled = css({
  width: "1.5",
  height: "4",
  bg: "sunbeam.orange",
  borderRadius: "sm",
});

const barEmpty = css({
  width: "1.5",
  height: "4",
  bg: "bg.card",
  borderRadius: "sm",
});

const modalityIcons = css({
  display: "flex",
  justifyContent: "center",
  gap: "1.5",
  color: "text.primary",
});

const contextValue = css({
  fontSize: "lg",
  fontWeight: "button",
  color: "sunbeam.orange",
  lineHeight: 1.2,
});

const priceColumn = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5",
});

const priceLabel = css({
  fontSize: "2xs",
  fontWeight: "button",
  color: "sunbeam.orange",
});

const srOnly = css({
  position: "absolute",
  width: "0.25",
  height: "0.25",
  padding: 0,
  margin: "-0.25",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
});

const modalityIconMap: Record<string, string> = {
  text: "description",
  image: "image",
  audio: "mic",
};

/** Props for {@link StatBar}. */
export interface StatBarProps {
  /** Model statistics to display. */
  stats: ModelStats;
}

/** Five-column comparison bar showing model speed, performance, modalities, context, and pricing. Speed and performance display as filled/empty bars (0–5). Modalities show icons (text, image, audio). Responsive: 2 cols on mobile, 3 on tablet, 5 on desktop. * @example ```tsx <StatBar stats={{ speed: 4, performance: 5, modalities: "["text", "image"], context: "200K", priceIn: "$0.50", priceOut: "$1.50", }} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/stat-bar?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { StatBar } from "@sunbeam/beam-ui/components/ui/stat-bar"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| stats | `ModelStats` | Yes | Model statistics to display. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
