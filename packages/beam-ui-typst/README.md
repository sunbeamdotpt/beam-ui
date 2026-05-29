# beam-ui-typst

Typst document templates for the [Beam Design Language](https://design.sunbeam.pt). Provides three show-rule templates — `beam-doc`, `beam-newsletter`, and `beam-announcement` — plus a shared component library.

**Fonts:** Ysabeau Infant · Monaspace Argon · Material Symbols Outlined

---

## Font Installation

Typst requires **static font instances** — it does not support variable fonts. You must generate and install static instances of Ysabeau Infant before compiling.

### 1. Generate Ysabeau Infant static instances

```sh
pip install fonttools
# Download the variable font from fonts.google.com or the GitHub repo
python -m fonttools varLib.instancer YsabeauInfant-Italic.ttf wght=431:575:647:791 -o instances/
python -m fonttools varLib.instancer YsabeauInfant-Regular.ttf wght=431:575:647:791 -o instances/
```

This produces eight `.ttf` files (4 weights × 2 styles). Install them to your system:

- **macOS:** copy to `~/Library/Fonts/`
- **Linux:** copy to `~/.local/share/fonts/` then run `fc-cache -fv`
- **Windows:** right-click each file → Install for all users

### 2. Install Monaspace Argon

Download the static OTFs from [github.com/githubnext/monaspace](https://github.com/githubnext/monaspace/releases) and install the `MonaspaceArgon-*.otf` files.

### 3. (Optional) Material Symbols Outlined

Used by the web version of beam-ui. For print templates, icons are not required — omit unless you're rendering icon glyphs directly.

---

## Usage

```typst
#import "@local/beam-ui:0.7.1": *

#show: beam-doc.with(
  title: "My Document",
  subtitle: "Optional subtitle",
  author: "Name",
  date: datetime.today(),
)

= Section

Body text here.
```

To install locally for the `@local` namespace:

```sh
mkdir -p ~/.local/share/typst/packages/local/beam-ui/0.7.1
cp -r . ~/.local/share/typst/packages/local/beam-ui/0.7.1/
```

Or import directly by path:

```typst
#import "path/to/beam-ui-typst/lib.typ": *
```

---

## Templates

### `beam-doc`

Long-form document with numbered top-level sections, display title, optional abstract.

```typst
#show: beam-doc.with(
  title: "Title",
  subtitle: none,     // optional
  author: none,       // optional
  date: none,         // optional — datetime value
  abstract-text: none // optional
)
```

Heading levels:
- `=` — numbered section, display scale (h1)
- `==` — sub-section (h2)
- `===` — small editorial label in accent caps (h3)

### `beam-newsletter`

Multi-article newsletter with full-bleed masthead and running footer.

```typst
#show: beam-newsletter.with(
  title: "Sunbeam Studios",
  issue: "April 2026",      // optional
  tagline: "Engineering",   // optional
  date: "April 7, 2026",    // optional — string
)
```

Heading levels:
- `=` — article title (centered)
- `==` — section within article
- `===` — small editorial label

### `beam-announcement`

Single-page announcement with hero headline, info bar, and body.

```typst
#show: beam-announcement.with(
  title: "beam-ui v0.7.1 Released",
  subtitle: none,                        // optional
  from: "Sienna / Sunbeam Studios",      // optional
  audience: "Engineering & Design",      // optional
  date: "April 7, 2026",                 // optional
)
```

---

## Component Reference

### `callout(kind: "note", body)`

Left-bordered callout box. `kind` is one of `"note"`, `"warning"`, `"tip"`.

```typst
#callout(kind: "warning")[Watch out for this edge case.]
```

### `achievement(title, body, tone: "orange", colspan: 1)`

Descriptor for a card in `achievement-grid`. `tone` is `"orange"` or `"gold"`. `colspan: 2` makes the card full-width.

### `achievement-grid(..cards)`

Two-column equal-height card grid. Pass `achievement()` descriptors as arguments.

```typst
#achievement-grid(
  achievement("Infrastructure", "Fixed two memory leaks."),
  achievement("Design Language", "Released v0.7.1 with 60+ components.", tone: "gold"),
  achievement("Full Width", "A card that spans both columns.", colspan: 2),
)
```

### `pull-quote(body, attribution: none)`

Large italic block quote with an orange left rule.

```typst
#pull-quote("Key insight here.", attribution: "Source · Context")
```

### `highlight(body, tone: "note")`

Full-width tinted block. `tone` is `"note"`, `"tip"`, or `"warning"`.

```typst
#highlight(tone: "warning")[Merge freeze begins April 10.]
```

### `cta(label, detail: none, url: none)`

Call-to-action block. Wraps in a link if `url` is provided.

```typst
#cta("Get Started", detail: "Install the package and run the template.", url: "https://…")
```

### `badge(label, tone: "orange")`

Inline pill badge. Tones: `"orange"`, `"gold"`, `"warning"`, `"info"`, `"success"`, `"error"`.

```typst
#badge("NEW") #badge("BREAKING", tone: "error")
```

### `code(content)`

Inline monospace, tinted toward the accent color. Integrates with running prose.

```typst
Run #code("typst compile main.typ") to build.
```

### `code-block(content)`

Styled fenced code block (dark background, mono font).

### `repo-entry(name, body)`

Compact term/definition pair. Name renders in mono+accent; body is inline prose.

```typst
#repo-entry("wfe")[Workflow engine — reached v1.8.0 this week.]
```

### `byline(author, meta: none)`

Author + date/role line beneath article titles.

```typst
#byline("Sienna", meta: "April 7, 2026")
```

### `kbd(keys)`

Keyboard shortcut styling. Pass a string or array.

```typst
Press #kbd(("Ctrl", "Shift", "P")) to open the palette.
```

### `divider(label: none)`

Horizontal rule, optionally with a centered text label.

```typst
#divider()
#divider(label: "continued")
```

### `two-column(body, gutter: space-xl)`

Two-column layout wrapper for dense newsletter content.

```typst
#two-column[
  Left column content here. Right column continues automatically.
]
```

### `link-styled(url, body-text)`

Hyperlink in the accent color.

---

## Color Tokens

Token names mirror the upstream `beam-ui` preset. Dots replaced with hyphens; palette tokens prefixed with `colors-`.

### Palette

| Token | Value |
|---|---|
| `colors-sunbeam-orange` | `#fa520f` |
| `colors-sunbeam-flame` | `#fb6424` |
| `colors-beam-orange` | `#ff8105` |
| `colors-sunshine-900` | `#ff8a00` |
| `colors-sunshine-700` | `#ffa110` |
| `colors-sunshine-500` | `#ffb83e` |
| `colors-sunshine-300` | `#ffd06a` |
| `colors-beam-gold` | `#ffe295` |
| `colors-bright-yellow` | `#ffd900` |
| `colors-warm-ivory` | `#fffaeb` |
| `colors-cream` | `#fff0c2` |
| `colors-sunbeam-black` | `#1f1f1f` |
| `colors-card-dark` | `#2a2a2a` |
| `colors-border-warm` | `rgba(127,99,21,0.15)` |
| `colors-border-warm-subtle` | `rgba(127,99,21,0.08)` |
| `colors-border-warm-dark` | `rgba(255,161,16,0.15)` |

### Semantic

| Token | Resolves to |
|---|---|
| `bg-page` | `colors-warm-ivory` |
| `bg-card` | `colors-cream` |
| `text-primary` | `colors-sunbeam-black` |
| `text-secondary` | `#3d3d3d` |
| `text-muted` | `#7f6315` |
| `border-default` | `colors-border-warm` |
| `border-subtle` | `colors-border-warm-subtle` |
| `accent` | `colors-sunbeam-orange` |

### Syntax highlighting (`syn-*`)

`syn-keyword` · `syn-fn` · `syn-string` · `syn-prop` · `syn-number` · `syn-builtin` · `syn-text` · `syn-bg`

---

## Typography Constants

| Token | pt | Web px | Usage |
|---|---|---|---|
| `size-2xs` | 6.5pt | 10px | Labels, badges |
| `size-xs` | 7.5pt | 12px | Meta, captions |
| `size-sm` | 9pt | 14px | Captions |
| `size-md` | 10pt | 16px | Body |
| `size-lg` | 11.5pt | 18px | UI emphasis |
| `size-xl` | 12.5pt | 20px | Brand |
| `size-2xl` | 16.5pt | 24px | h3 |
| `size-3xl` | 22pt | 32px | h2 |
| `size-4xl` | 33pt | 48px | h1 |
| `size-5xl` | 38.5pt | 56px | Section |
| `size-6xl` | 56pt | 82px | Display |

Font weights: `weight-display` (431) · `weight-heading` (575) · `weight-body` (647) · `weight-button` (791)

---

## `beam-slides`

16:9 presentation deck for pitch decks and slide shows.

```typst
#show: beam-slides.with(
  title: "Pitch Deck Title",
  author: "Sunbeam Studios",
  date: datetime.today(),
  footer: true,
)
```

### Slide Layouts

| Function | Purpose |
|---|---|
| `title-slide(title, subtitle, author, date)` | Opening slide, centered |
| `section-slide(title, subtitle)` | Section divider, centered |
| `content-slide(title, body)` | Standard slide with title + body |
| `split-slide(title, left, right, ratio)` | Two-column layout |
| `image-slide(title, image-path, caption, position)` | Image-dominant slide (`"full"`, `"left"`, `"right"`) |
| `focus-slide(body, tone)` | Full-bleed impact slide (`"accent"` or `"dark"`) |
| `closing-slide(title, subtitle, cta)` | Final slide with optional CTA |
| `blank-slide(body)` | No layout constraints |

### Slide Typography

| Token | Size | Usage |
|---|---|---|
| `slide-size-sm` | 18pt | Footer, captions |
| `slide-size-base` | 22pt | Body text |
| `slide-size-lg` | 28pt | Emphasis |
| `slide-size-xl` | 36pt | Slide titles |
| `slide-size-2xl` | 48pt | Section headers |
| `slide-size-3xl` | 64pt | Major callouts |
| `slide-size-4xl` | 82pt | Display / hero text |

---

## Compatibility

Tested with **Typst 0.14.2**. Variable fonts are not supported by Typst — static instances are required (see Font Installation above).
