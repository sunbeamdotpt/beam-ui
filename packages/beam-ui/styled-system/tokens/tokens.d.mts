/* eslint-disable */
export type Token = `colors.${ColorToken}` | `fonts.${FontToken}` | `fontWeights.${FontWeightToken}` | `shadows.${ShadowToken}` | `fontSizes.${FontSizeToken}` | `radii.${RadiusToken}` | `spacing.${SpacingToken}` | `sizes.${SizeToken}` | `lineHeights.${LineHeightToken}` | `breakpoints.${BreakpointToken}`

export type ColorPalette = "sunbeam.orange" | "sunbeam.flame" | "beam.orange" | "sunshine.900" | "sunshine.700" | "sunshine.500" | "sunshine.300" | "sunshine.50" | "sunshine.35" | "sunshine.25" | "beam.gold" | "bright.yellow" | "warm.ivory" | "cream" | "sunbeam.black" | "white" | "card.dark" | "code.activePill" | "code.text" | "code.success" | "syn.keyword" | "syn.fn" | "syn.string" | "syn.prop" | "syn.number" | "syn.builtin" | "border.warm" | "border.warmSubtle" | "border.warmDark" | "accent.06" | "accent.08" | "accent.10" | "accent.12" | "accent.15" | "accent.20" | "accent.30" | "accent.40" | "chrome.03" | "chrome.05" | "chrome.06" | "chrome.10" | "chrome.30" | "chrome.35" | "chrome.40" | "chrome.50" | "chrome.60" | "chrome.70" | "chrome.90" | "warm.04" | "warm.10" | "warm.25" | "warm.30" | "warm.40" | "creamA.30" | "ivory.30" | "ivory.50" | "scrim.45" | "scrim.50" | "scrim.55" | "scrim.60" | "scrim.85" | "grid.06" | "grid.15" | "grid.20" | "diff.add.bg" | "diff.add.emphasis" | "diff.del.bg" | "diff.del.emphasis" | "slate.05" | "slate.08" | "slate.10" | "slate.15" | "bg.page" | "bg.card" | "bg.nav" | "text.primary" | "text.secondary" | "text.muted" | "border.default" | "border.subtle" | "accent" | "sectionLabel"

export type ColorToken = "sunbeam.orange" | "sunbeam.flame" | "beam.orange" | "sunshine.900" | "sunshine.700" | "sunshine.500" | "sunshine.300" | "sunshine.50" | "sunshine.35" | "sunshine.25" | "beam.gold" | "bright.yellow" | "warm.ivory" | "cream" | "sunbeam.black" | "white" | "card.dark" | "code.activePill" | "code.text" | "code.success" | "syn.keyword" | "syn.fn" | "syn.string" | "syn.prop" | "syn.number" | "syn.builtin" | "border.warm" | "border.warmSubtle" | "border.warmDark" | "accent.06" | "accent.08" | "accent.10" | "accent.12" | "accent.15" | "accent.20" | "accent.30" | "accent.40" | "chrome.03" | "chrome.05" | "chrome.06" | "chrome.10" | "chrome.30" | "chrome.35" | "chrome.40" | "chrome.50" | "chrome.60" | "chrome.70" | "chrome.90" | "warm.04" | "warm.10" | "warm.25" | "warm.30" | "warm.40" | "creamA.30" | "ivory.30" | "ivory.50" | "scrim.45" | "scrim.50" | "scrim.55" | "scrim.60" | "scrim.85" | "grid.06" | "grid.15" | "grid.20" | "diff.add.bg" | "diff.add.emphasis" | "diff.del.bg" | "diff.del.emphasis" | "slate.05" | "slate.08" | "slate.10" | "slate.15" | "bg.page" | "bg.card" | "bg.nav" | "text.primary" | "text.secondary" | "text.muted" | "border.default" | "border.subtle" | "accent" | "sectionLabel" | "colorPalette"

export type FontToken = "heading" | "body" | "mono"

export type FontWeightToken = "display" | "heading" | "body" | "button"

export type ShadowToken = "golden" | "goldenDark" | "nav" | "code" | "focusRing.sm" | "focusRing.md" | "focusRing.lg" | "focusRing.xl" | "focusRing.2xl" | "thumb" | "thumbSoft" | "drawer" | "pop"

export type FontSizeToken = "8" | "9" | "11" | "13" | "15" | "36" | "40" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "9.5" | "10.5" | "13.5"

export type RadiusToken = "sm" | "md" | "lg" | "full"

export type SpacingToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "12" | "14" | "15" | "16" | "20" | "24" | "25" | "28" | "30" | "32" | "36" | "40" | "44" | "45" | "48" | "50" | "52" | "56" | "60" | "64" | "65" | "72" | "74" | "75" | "80" | "96" | "0.25" | "0.5" | "0.75" | "1.25" | "1.5" | "1.75" | "2.25" | "2.5" | "3.5" | "4.5" | "5.5" | "7.5" | "-0" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-12" | "-14" | "-15" | "-16" | "-20" | "-24" | "-25" | "-28" | "-30" | "-32" | "-36" | "-40" | "-44" | "-45" | "-48" | "-50" | "-52" | "-56" | "-60" | "-64" | "-65" | "-72" | "-74" | "-75" | "-80" | "-96" | "-0.25" | "-0.5" | "-0.75" | "-1.25" | "-1.5" | "-1.75" | "-2.25" | "-2.5" | "-3.5" | "-4.5" | "-5.5" | "-7.5"

export type SizeToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "12" | "14" | "15" | "16" | "20" | "24" | "25" | "28" | "30" | "32" | "36" | "40" | "44" | "45" | "48" | "50" | "52" | "56" | "60" | "64" | "65" | "72" | "74" | "75" | "80" | "90" | "95" | "96" | "100" | "120" | "125" | "140" | "150" | "160" | "180" | "220" | "225" | "300" | "360" | "0.25" | "0.5" | "0.75" | "1.25" | "1.5" | "1.75" | "2.25" | "2.5" | "3.5" | "4.5" | "5.5" | "7.5" | "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl"

export type LineHeightToken = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose"

export type BreakpointToken = "sm" | "md" | "lg" | "xl"

export type Tokens = {
		colors: ColorToken
		fonts: FontToken
		fontWeights: FontWeightToken
		shadows: ShadowToken
		fontSizes: FontSizeToken
		radii: RadiusToken
		spacing: SpacingToken
		sizes: SizeToken
		lineHeights: LineHeightToken
		breakpoints: BreakpointToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"