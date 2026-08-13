// ============================================================================
// Beam Design Language — Typst Document Template (patched for Typst 0.14.x)
// ============================================================================
// Fixes applied over beam-ui/templates/beam-doc.typ:
//   1. badge(): replaced unsupported `match` expression with dictionary lookup
//   2. colors-border-warm / colors-border-warm-subtle: replaced rgb("rgba(...)")
//      with rgb(r, g, b, a) calls (CSS rgba strings are not valid Typst)
//   3. date.display(): corrected format string to "[year]-[month]-[day]"
//   4. border-subtle: undefined alias added (points to colors-border-warm-subtle)
// The original beam-ui/templates/beam-doc.typ is not modified.
// ============================================================================

#import "@preview/lilaq:0.6.0" as lq

// ---- Colors — Palette tokens (mirrors beam-ui preset.ts naming) ----
// Token names use hyphens in place of dots: sunbeam.orange → colors-sunbeam-orange
#let colors-sunbeam-orange = rgb("#fa520f")
#let colors-sunbeam-flame = rgb("#fb6424")
#let colors-beam-orange = rgb("#ff8105")

#let colors-sunshine-900 = rgb("#ff8a00")
#let colors-sunshine-700 = rgb("#ffa110")
#let colors-sunshine-500 = rgb("#ffb83e")
#let colors-sunshine-300 = rgb("#ffd06a")
#let colors-beam-gold = rgb("#ffe295")
#let colors-bright-yellow = rgb("#ffd900")

#let colors-warm-ivory = rgb("#fffaeb")
#let colors-cream = rgb("#fff0c2")
#let colors-sunbeam-black = rgb("#1f1f1f")
#let colors-card-dark = rgb("#2a2a2a")

// Borders — fixed: rgba() CSS strings are not valid Typst rgb() arguments
// Original: rgb("rgba(127, 99, 21, 0.15)") and rgb("rgba(127, 99, 21, 0.08)")
// Typst rgb(r, g, b, a) uses 0–255 for all channels
#let colors-border-warm = rgb(127, 99, 21, 38)   // ~0.15 alpha (border.warm)
#let colors-border-warm-subtle = rgb(127, 99, 21, 20)   // ~0.08 alpha (border.warmSubtle)
#let colors-border-warm-dark = rgb(255, 161, 16, 38)  // ~0.15 alpha (border.warmDark)

// ---- Colors — Semantic tokens (mirrors beam-ui semantic layer) ----
// No prefix — these map directly to the upstream semantic token names.
#let bg-page = colors-warm-ivory
#let bg-card = colors-cream
#let text-primary = colors-sunbeam-black
#let text-secondary = rgb("#3d3d3d")
#let text-muted = rgb("#7f6315")
#let border-default = colors-border-warm
#let border-subtle = colors-border-warm-subtle
#let accent = colors-sunbeam-orange

// ---- Colors — Syntax highlighting (syn-* mirrors upstream syn.* tokens) ----
#let syn-keyword = rgb("#c084fc")
#let syn-fn = rgb("#93c5fd")
#let syn-string = rgb("#86efac")
#let syn-prop = rgb("#fdba74")
#let syn-number = rgb("#fb923c")
#let syn-builtin = rgb("#fde047")
#let syn-text = rgb("#d4d4d8")
#let syn-bg = rgb("#1f1f1f")

// ---- Typography ----
#let font-heading = ("Ysabeau Infant", "Helvetica Neue", "Arial")
#let font-body = ("Ysabeau Infant", "Helvetica Neue", "Arial")
#let font-mono = ("Monaspace Argon", "SF Mono", "Menlo")

#let weight-display = 431
#let weight-heading = 575
#let weight-body = 647
#let weight-button = 791

// Sizes scaled from beam-ui px values by 0.625 for print (16px web → 10pt body).
// Source web values are kept in comments for reference.
#let size-2xs = 6.5pt   // 10px label
#let size-xs = 7.5pt   // 12px meta
#let size-sm = 9pt     // 14px caption
#let size-md = 10pt    // 16px body
#let size-lg = 11.5pt  // 18px UI emphasis
#let size-xl = 12.5pt  // 20px brand
#let size-2xl = 16.5pt  // 24px title (h3) +10%
#let size-3xl = 22pt    // 32px sub-heading (h2) +10%
#let size-4xl = 33pt    // 48px sub-heading-lg (h1) +10%
#let size-5xl = 38.5pt  // 56px section +10%
#let size-6xl = 56pt    // 82px display +10%

#let line-height-tight = 1.0
#let line-height-display = 0.95
#let line-height-heading = 1.15
#let line-height-title = 1.33
#let line-height-body = 1.50
#let line-height-caption = 1.43

// Letter-spacing for display sizes (per typography page: -2.05px at 82pt only)
#let tracking-display = -1.3pt

// ---- Spacing ----
#let space-xs = 4pt
#let space-sm = 8pt
#let space-md = 12pt
#let space-lg = 16pt
#let space-xl = 24pt
#let space-2xl = 32pt
#let space-3xl = 40pt

// ---- Corners & Borders ----
#let radius-sm = 2pt
#let radius-md = 4pt
#let radius-lg = 12pt
#let radius-full = 9999pt

#let border-width-thin = 0.5pt
#let border-width-default = 1pt
#let border-width-callout = 4pt

// ---- Shadows ----
#let shadow-code = "drop-shadow(0pt 7pt 20pt rgba(0,0,0,0.5))"

// ============================================================================
// COMPONENT FUNCTIONS
// ============================================================================

/// Callout box with left border (note / warning / tip)
#let callout(kind: "note", body) = {
  let border-colors = (
    "note": colors-sunbeam-orange,
    "warning": colors-sunshine-900,
    "tip": colors-sunbeam-orange,
  )
  let text-colors = (
    "note": colors-sunbeam-orange,
    "warning": colors-sunshine-900,
    "tip": colors-sunbeam-orange,
  )
  let labels = (
    "note": "NOTE",
    "warning": "WARNING",
    "tip": "PRO TIP",
  )

  let border-color = border-colors.at(kind, default: colors-sunbeam-orange)
  let text-color = text-colors.at(kind, default: colors-sunbeam-orange)
  let label = labels.at(kind, default: "NOTE")

  block(
    fill: bg-card,
    inset: (x: space-md, y: space-sm),
    stroke: (left: border-width-callout + border-color),
    {
      set par(leading: 0.4em)
      text(
        fill: text-color,
        weight: weight-button,
        size: size-2xs,
        tracking: 0.08em,
        upper(label),
      )
      v(space-xs, weak: true)
      set par(leading: 0.35em)
      text(
        fill: text-primary,
        size: size-md,
        weight: weight-display,
        body,
      )
    },
  )
}

/// Inner content for an achievement card. Just the label + body — no visual
/// container. Pair with `achievement-grid` which paints the backgrounds and
/// borders on the grid cells themselves so all cards in a row equalize to
/// the row's max height.
#let achievement-body(title, body) = {
  set par(leading: 0.4em)
  text(
    fill: colors-sunbeam-orange,
    weight: weight-button,
    size: size-2xs,
    tracking: 0.08em,
    upper(title),
  )
  v(space-sm, weak: true)
  set par(leading: 0.35em)
  text(
    fill: text-primary,
    size: size-md,
    weight: weight-display,
    body,
  )
}

/// 2-column equal-height card grid for "key achievements" sections.
/// Uses `layout` + `measure` to find the max card height, then builds the
/// grid with an explicit row height so all single-column cards in a row are
/// equal. Items with `colspan: 2` are rendered as full-width cards below
/// the equal-height pairs.
///
/// This is the canonical Typst pattern for equal-height grid cells —
/// `height: 100%` inside an auto-row resolves against the page, and
/// `grid(fill:, stroke:)` callbacks don't paint cells whose content is
/// inline text. Pre-measuring sidesteps both issues.
#let achievement-grid(..cards) = {
  let items = cards.pos()
  let single = items.filter(it => it.colspan == 1)
  let spanned = items.filter(it => it.colspan == 2)

  let border-for-tone(t) = {
    if t == "gold" { colors-sunshine-900 } else if t == "tip" { colors-sunshine-900 } else { colors-sunbeam-orange }
  }

  let card(item, fixed-h: auto) = block(
    width: 100%,
    height: fixed-h,
    fill: bg-card,
    stroke: (left: border-width-callout + border-for-tone(item.tone)),
    inset: (x: space-md, y: space-md),
    breakable: false,
    achievement-body(item.title, item.body),
  )

  // breakable: false on the outer block prevents the grid from being torn
  // across a page boundary mid-row.
  block(breakable: false, layout(container => {
    let gutter = space-md
    let col-width = (container.width - gutter) / 2

    let measured-heights = single.map(it => {
      measure(
        block(
          width: col-width,
          fill: bg-card,
          stroke: (left: border-width-callout + border-for-tone(it.tone)),
          inset: (x: space-md, y: space-md),
          achievement-body(it.title, it.body),
        ),
      ).height
    })
    let row-h = if measured-heights.len() > 0 {
      calc.max(..measured-heights)
    } else {
      0pt
    }

    grid(
      columns: (1fr, 1fr),
      column-gutter: gutter,
      row-gutter: gutter,
      ..single.map(it => card(it, fixed-h: row-h)),
    )

    for s in spanned {
      v(gutter)
      card(s)
    }
  }))
}

/// Convenience constructor for an achievement card descriptor.
/// Returns a dict that `achievement-grid` understands.
#let achievement(title, body, tone: "orange", colspan: 1) = (
  title: title,
  body: body,
  tone: tone,
  colspan: colspan,
)

/// Keyboard key styling
#let kbd(keys) = {
  let key-text = if type(keys) == "array" {
    keys.join(" + ")
  } else {
    keys
  }
  box(
    fill: bg-card,
    inset: (x: space-xs, y: 2pt),
    stroke: border-width-thin + border-default,
    radius: radius-sm,
    text(font: font-mono, size: size-xs, weight: weight-body, key-text),
  )
}

/// Badge / pill — fixed: replaced unsupported `match` with dictionary lookup
#let badge(label, tone: "orange") = {
  let bg-map = (
    "gold": colors-beam-gold,
    "orange": colors-sunbeam-orange,
    "warning": colors-sunshine-900,
    "info": colors-sunshine-700,
    "success": rgb("#15803d"),
    "error": rgb("#991b1b"),
  )
  let fg-map = (
    "gold": colors-sunbeam-black,
    "orange": white,
    "warning": white,
    "info": white,
    "success": white,
    "error": white,
  )

  let bg = bg-map.at(tone, default: colors-beam-gold)
  let fg = fg-map.at(tone, default: colors-sunbeam-black)

  box(
    fill: bg,
    inset: (x: space-xs, y: 2pt),
    radius: radius-sm,
    text(fill: fg, weight: weight-button, size: size-2xs, upper(label)),
  )
}

/// Styled code block (raw/pre)
#let code-block(content) = {
  block(
    fill: syn-bg,
    inset: space-md,
    radius: radius-md,
    stroke: border-width-thin + border-default,
    text(fill: syn-text, font: font-mono, size: size-sm, content),
  )
}

/// Styled inline code.
/// Editorial print convention: no box, just the mono font slightly smaller
/// and tinted toward the accent color so it integrates with running prose
/// instead of breaking the line into segments.
#let code(content) = {
  // Monaspace Argon has a larger x-height than Ysabeau Infant, so we
  // shrink to ~0.85x of the surrounding text and lift the baseline
  // slightly so the cap-height aligns with the body letters.
  box(
    baseline: 0em,
    text(
      font: font-mono,
      size: 0.8em,
      weight: 400,
      fill: colors-sunbeam-orange.darken(15%),
      content,
    ),
  )
}

/// Link with beam color
#let link-styled(url, body-text) = {
  link(url, text(fill: accent, body-text))
}

/// Compact term/definition entry. Use for lists of named items where each
/// item has a short prose description — like a sub-repository roundup or
/// glossary. The term sits inline with the body, set in mono+accent so it
/// scans like a label without claiming heading-level space.
#let repo-entry(name, body) = {
  block(
    above: space-md,
    below: space-sm,
    {
      text(
        font: font-mono,
        size: 0.85em,
        weight: 500,
        fill: colors-sunbeam-orange,
        name,
      )
      h(0.6em)
      body
    },
  )
}

// ============================================================================
// SHARED LAYOUT HELPERS (usable in beam-doc, beam-newsletter, beam-announcement)
// ============================================================================

/// Large block quote with an orange left rule and optional attribution.
/// Use for notable quotes, key decisions, or testimonials.
#let pull-quote(body, attribution: none) = {
  block(
    stroke: (left: 3pt + colors-sunbeam-orange),
    inset: (left: space-lg, right: space-md, top: space-sm, bottom: space-sm),
    {
      set par(leading: 0.4em)
      text(
        font: font-heading,
        size: size-2xl,
        weight: weight-display,
        style: "italic",
        fill: text-secondary,
        body,
      )
      if attribution != none {
        linebreak()
        v(7pt, weak: true)
        text(
          size: size-xs,
          weight: weight-button,
          tracking: 0.06em,
          fill: text-muted,
          upper(attribution),
        )
      }
    },
  )
}

/// Horizontal divider, optionally with a centered label.
/// Use between major sections in newsletters and announcements.
#let divider(label: none) = {
  if label == none {
    line(length: 100%, stroke: border-width-thin + border-default)
  } else {
    layout(container => {
      let label-content = box(
        inset: (x: space-md, y: 0pt),
        text(
          fill: text-muted,
          weight: weight-button,
          size: size-2xs,
          tracking: 0.1em,
          upper(label),
        ),
      )
      let lw = measure(label-content).width
      let line-w = (container.width - lw) / 2
      stack(
        dir: ltr,
        line(length: line-w, stroke: border-width-thin + border-default),
        label-content,
        line(length: line-w, stroke: border-width-thin + border-default),
      )
    })
  }
}

/// Full-width tinted block for important standalone information.
/// Stronger than a callout — use for status notices, key dates, warnings.
#let highlight(body, tone: "note") = {
  let (bg, border) = if tone == "warning" {
    (colors-sunshine-300, colors-sunshine-900)
  } else if tone == "tip" {
    (colors-cream, colors-sunbeam-orange)
  } else {
    (colors-cream, colors-sunbeam-orange)
  }
  // Wrap spacing + inner block together so the top v() is internal to the
  // parent block and cannot be suppressed at a page boundary.
  block(
    width: 100%,
    breakable: false,
    {
      v(space-lg)
      block(
        fill: bg,
        width: 100%,
        inset: (x: space-lg, y: space-md),
        stroke: (top: 2pt + border, bottom: 2pt + border),
        {
          set par(leading: 0.4em)
          text(fill: text-primary, size: size-md, weight: weight-display, body)
        },
      )
      v(space-lg)
    },
  )
}

/// Call-to-action block. Use in announcements and newsletters to direct the
/// reader toward a next step. `label` is the action text; `detail` is
/// optional supporting copy.
#let cta(label, detail: none, url: none) = {
  let inner = {
    set par(leading: 0.4em)
    text(
      fill: white,
      weight: weight-button,
      size: size-lg,
      tracking: 0.04em,
      upper(label),
    )
    if detail != none {
      linebreak()
      v(space-xs, weak: true)
      text(fill: rgb(255, 255, 255, 180), size: size-sm, weight: weight-display, detail)
    }
  }
  let b = block(
    fill: colors-sunbeam-orange,
    width: 100%,
    inset: (x: space-xl, y: space-lg),
    radius: radius-md,
    inner,
  )
  if url != none { link(url, b) } else { b }
}

/// Byline row — author name and optional date/role in a tight meta style.
/// Use beneath article titles in newsletter sections.
#let byline(author, meta: none) = {
  block(below: space-md, {
    text(
      size: size-xs,
      weight: weight-button,
      fill: text-muted,
      tracking: 0.05em,
      upper(author),
    )
    if meta != none {
      text(size: size-xs, fill: text-muted, "  ·  " + meta)
    }
  })
}

/// Two-column layout helper. Wraps body in a Typst `columns()` block.
/// Use within newsletter sections for dense content.
#let two-column(body, gutter: space-xl) = {
  columns(2, gutter: gutter, body)
}

// ============================================================================
// NEWSLETTER TEMPLATE
// ============================================================================

/// Newsletter show-rule. Sets up a masthead, running footer, and article
/// heading hierarchy tuned for multi-article newsletters.
///
/// Usage:
///   #show: beam-newsletter.with(
///     title: "Sunbeam Studios",
///     issue: "April 2026",
///     tagline: "Engineering & Design",
///   )
///
/// Use `=` for article titles, `==` for sub-sections within articles.
/// Use `divider()` between articles. Use `two-column(body)` for dense sections.
#let beam-newsletter(
  title: "Newsletter",
  issue: none,
  tagline: none,
  date: none,
  doc,
) = {
  set document(title: title)

  set page(
    paper: "a4",
    margin: (top: 0pt, bottom: 1.8cm, left: 2cm, right: 2cm),
    background: rect(fill: bg-page, width: 100%, height: 100%),
    footer: {
      set text(size: size-2xs, fill: text-muted, weight: weight-button)
      grid(
        columns: (1fr, auto),
        align: (left, right),
        upper(title), if issue != none { upper(issue) },
      )
    },
  )

  set text(font: font-body, size: size-md, weight: weight-body, fill: text-primary)
  set par(leading: (line-height-body - 1) * 1em)
  set heading(numbering: none)

  // ---- Masthead — centered stack ----
  block(
    width: 100%,
    fill: colors-sunbeam-orange,
    inset: (x: 2cm, top: 20pt, bottom: 20pt),
    {
      set align(center)
      set par(leading: 0.25em)
      text(
        font: font-heading,
        size: size-5xl,
        weight: weight-display,
        tracking: tracking-display,
        fill: white,
        title,
      )
      if tagline != none {
        v(4pt)
        text(size: size-xs, weight: weight-button, tracking: 0.12em, fill: rgb(255, 255, 255, 180), upper(tagline))
      }
      if issue != none or date != none {
        v(4pt)
        let meta-parts = ()
        if issue != none { meta-parts.push(issue) }
        if date != none { meta-parts.push(date) }
        text(size: size-sm, weight: weight-button, fill: rgb(255, 255, 255, 220), meta-parts.join(" · "))
      }
    },
  )

  v(space-xl)

  // ---- Heading styles tuned for newsletter ----

  // Article title — centered, anchors each new article
  show heading.where(level: 1): it => {
    block(above: space-2xl, below: space-xs, {
      set align(center)
      set text(font: font-heading, size: size-3xl, weight: weight-heading, fill: text-primary)
      set par(leading: (line-height-heading - 1) * 1em)
      it.body
    })
  }

  // Section within an article
  show heading.where(level: 2): it => {
    block(above: space-lg, below: space-xs, {
      set text(font: font-heading, size: size-2xl, weight: weight-heading, fill: text-primary)
      it.body
    })
  }

  // Section marker label (same as beam-doc h3)
  show heading.where(level: 3): it => {
    block(above: space-md, below: space-xs, {
      set text(size: size-2xs, weight: weight-button, tracking: 0.1em, fill: colors-sunbeam-orange)
      upper(it.body)
    })
  }

  show link: it => text(fill: accent, it)
  set list(marker: ([•], [◦], [▪]))
  set enum(numbering: "1)")
  show list: set block(spacing: space-sm)
  show list.item: it => block(spacing: space-xs, it)
  set block(spacing: space-lg)

  doc
}

// ============================================================================
// ANNOUNCEMENT TEMPLATE
// ============================================================================

/// Announcement show-rule. Single-purpose format — one headline, supporting
/// detail, clear next step. Margins are more generous; the hero area takes
/// the full display scale.
///
/// Usage:
///   #show: beam-announcement.with(
///     title: "beam-ui v0.7.1 Released",
///     from: "Sienna / Sunbeam Studios",
///     audience: "Engineering & Design",
///     date: "April 7, 2026",
///   )
#let beam-announcement(
  title: none,
  subtitle: none,
  from: none,
  audience: none,
  date: none,
  doc,
) = {
  set document(title: if title != none { title } else { "Announcement" })

  set page(
    paper: "a4",
    margin: (top: 3cm, bottom: 3cm, left: 3cm, right: 3cm),
    background: rect(fill: bg-page, width: 100%, height: 100%),
  )

  set text(font: font-body, size: size-md, weight: weight-body, fill: text-primary)
  set par(leading: (line-height-body - 1) * 1em)
  set heading(numbering: none)

  // ---- Hero — centered ----
  if title != none {
    block(width: 100%, below: space-lg, {
      set align(center)
      set par(leading: 0.15em)
      text(
        font: font-heading,
        size: size-6xl,
        weight: weight-display,
        tracking: tracking-display,
        fill: accent,
        title,
      )
    })
  }

  if subtitle != none {
    block(width: 100%, below: space-2xl, {
      set align(center)
      text(font: font-heading, size: size-3xl, weight: weight-heading, fill: text-primary, subtitle)
    })
  }

  // ---- Info bar — centered labels, left-aligned values in equal columns ----
  if from != none or audience != none or date != none {
    block(
      below: space-3xl,
      width: 100%,
      {
        line(length: 100%, stroke: border-width-default + accent)
        v(space-md)
        let info-cell(label, value) = {
          set par(leading: 0.4em)
          text(size: size-2xs, weight: weight-button, tracking: 0.08em, fill: text-muted, upper(label))
          linebreak()
          text(size: size-sm, weight: weight-body, value)
        }
        let cells = ()
        if from != none { cells.push(info-cell("From", from)) }
        if audience != none { cells.push(info-cell("To", audience)) }
        if date != none { cells.push(info-cell("Date", date)) }
        grid(columns: cells.map(_ => 1fr), align: center, column-gutter: space-xl, ..cells)
        v(space-md)
        line(length: 100%, stroke: border-width-thin + border-subtle)
      },
    )
  }

  // ---- Body heading styles ----
  show heading.where(level: 1): it => {
    block(above: space-xl, below: space-sm, {
      set text(font: font-heading, size: size-2xl, weight: weight-heading, fill: text-primary)
      it.body
    })
  }

  show heading.where(level: 2): it => {
    block(above: space-lg, below: space-xs, {
      set text(size: size-2xs, weight: weight-button, tracking: 0.1em, fill: colors-sunbeam-orange)
      upper(it.body)
    })
  }

  show link: it => text(fill: accent, it)
  set list(marker: ([•], [◦], [▪]))
  set enum(numbering: "1)")
  show list: set block(spacing: space-sm)
  show list.item: it => block(spacing: space-xs, it)
  set block(spacing: space-lg)

  doc
}

// ============================================================================
// MAIN DOCUMENT FUNCTION
// ============================================================================

#let beam-doc(
  title: none,
  subtitle: none,
  author: none,
  date: none,
  abstract-text: none,
  doc,
) = {
  set document(title: title, author: if author != none { author } else { () })

  set page(
    paper: "a4",
    margin: (top: 2.2cm, bottom: 2.2cm, left: 2.4cm, right: 2.4cm),
    background: rect(fill: bg-page, width: 100%, height: 100%),
  )

  set text(
    font: font-body,
    size: size-md,
    weight: weight-body,
    fill: text-primary,
  )
  // Typst `leading` = gap between lines (not total line-height).
  // Convert: leading = (line-height - 1) * 1em.
  set par(leading: (line-height-body - 1) * 1em)

  // Only top-level headings get a number. h2/h3 stay clean — nested
  // numbering like "2.8.1" gets noisy fast and adds no value here.
  set heading(numbering: (..n) => if n.pos().len() == 1 {
    numbering("1.", ..n)
  })
  show heading: set text(font: font-heading, weight: weight-heading, fill: text-primary)

  // h1 = sub-heading-lg per typography page: 48pt / 431 / 0.95
  show heading.where(level: 1): it => {
    set text(size: size-4xl, weight: weight-display)
    set par(leading: (line-height-display - 1) * 1em)
    block(above: space-2xl, below: space-lg, it)
  }

  // h2 = sub-heading per typography page: 32pt / 575 / 1.15
  // Use `it.body` instead of `it` so the numbering slot is skipped entirely
  // — otherwise Typst reserves indent space even when the numbering function
  // returns `none`.
  show heading.where(level: 2): it => {
    set text(size: size-3xl, weight: weight-heading)
    set par(leading: (line-height-heading - 1) * 1em)
    block(above: space-xl, below: space-md, it.body)
  }

  // h3 = small editorial label, not a "title". Uses button weight, small
  // size, tracked-out caps in the accent color so it reads as a section
  // marker rather than a competing heading.
  show heading.where(level: 3): it => {
    set text(
      size: size-2xs,
      weight: weight-button,
      tracking: 0.1em,
      fill: colors-sunbeam-orange,
    )
    block(above: space-lg, below: space-xs, upper(it.body))
  }

  show heading.where(level: 4): it => {
    set text(size: size-lg, weight: weight-button)
    block(spacing: space-md, it)
  }
  show heading.where(level: 5): it => {
    set text(size: size-lg, weight: weight-button)
    block(spacing: space-md, it)
  }
  show heading.where(level: 6): it => {
    set text(size: size-lg, weight: weight-button)
    block(spacing: space-md, it)
  }

  show link: it => text(fill: accent, it)

  set list(marker: ([•], [◦], [▪]))
  set enum(numbering: "1)")

  show list: set block(spacing: space-sm)
  show list.item: it => {
    block(spacing: space-xs, it)
  }

  show enum: set block(spacing: space-sm)
  show enum.item: it => {
    block(spacing: space-xs, it)
  }

  show raw.where(block: true): it => {
    set text(font: font-mono, size: size-sm, fill: syn-text)
    block(
      fill: syn-bg,
      inset: space-md,
      radius: radius-md,
      stroke: border-width-thin + border-default,
      width: 100%,
      it,
    )
  }

  show raw.where(block: false): it => {
    box(
      fill: bg-card,
      inset: (x: 2pt, y: 1pt),
      radius: radius-sm,
      text(font: font-mono, size: size-sm, it),
    )
  }

  show table.cell: set text(size: size-sm)
  set table(
    stroke: (x, y) => {
      if y == 0 {
        (bottom: border-width-default + accent)
      } else {
        (bottom: border-width-thin + border-subtle)
      }
    },
  )

  show table.cell.where(y: 0): it => {
    set text(weight: weight-button, fill: accent)
    it
  }

  // ---- Title Block ----
  // Display at 82pt per typography page: weight 431, lh 1.0, tracking -2.05pt.
  // Title and subtitle live in separate blocks so the display descenders
  // (y, p, g) cannot collide with the subtitle row.
  if title != none {
    block(
      spacing: space-md,
      below: space-lg,
      {
        set par(leading: line-height-tight * 1em)
        text(
          font: font-heading,
          size: size-6xl,
          weight: weight-display,
          tracking: tracking-display,
          fill: accent,
          title,
        )
      },
    )
    if subtitle != none {
      block(spacing: space-xl, {
        text(font: font-heading, size: size-3xl, weight: weight-heading, subtitle)
      })
    }

    if author != none or date != none {
      block(spacing: space-lg, {
        grid(
          columns: (1fr, auto),
          [
            #if author != none [By #author]
          ],
          [
            // Fixed: date.display() format string — original "[year-01-02]" is invalid
            #if date != none [#date.display("[year]-[month]-[day]")]
          ],
        )
        line(length: 100%, stroke: border-width-thin + border-default)
      })
    }
  }

  // ---- Abstract ----
  if abstract-text != none {
    block(
      fill: bg-card,
      inset: space-md,
      radius: radius-md,
      stroke: border-width-thin + border-default,
      {
        text(weight: weight-button, size: size-sm, "ABSTRACT")
        linebreak()
        text(size: size-sm, abstract-text)
      },
    )
  }

  set par(justify: false, first-line-indent: 0pt)
  set block(spacing: space-lg)

  doc
}

// ============================================================================
// SLIDE TEMPLATE — beam-slides
// ============================================================================

// ---- Slide Typography Scale ----
// Viewing distance requires larger type than print documents.
#let slide-size-sm = 18pt
#let slide-size-base = 22pt
#let slide-size-lg = 28pt
#let slide-size-xl = 36pt
#let slide-size-2xl = 48pt
#let slide-size-3xl = 64pt
#let slide-size-4xl = 82pt

// ---- Slide Counter ----
// Tracks logical slides so we can emit pagebreaks only between slides,
// never before the first or after the last.
#let slide-counter = counter("slide-counter")
#let slide-pagebreak() = {
  context if slide-counter.get().first() > 0 { pagebreak() }
  slide-counter.step()
}

/// Presentation show-rule. Sets up 16:9 pages, Beam styling, and an optional
/// footer with title + page counter.
///
/// Usage:
///   #show: beam-slides.with(
///     title: "Pitch Deck",
///     author: "Sunbeam Studios",
///     date: datetime.today(),
///     footer: true,
///   )
#let beam-slides(
  title: "Presentation",
  author: none,
  date: none,
  footer: true,
  doc,
) = {
  set document(title: title)

  set page(
    paper: "presentation-16-9",
    margin: (top: 1.2cm, bottom: 1.2cm, left: 1.5cm, right: 1.5cm),
    background: {
      rect(fill: bg-page, width: 100%, height: 100%)
      place(bottom, rect(fill: colors-sunbeam-orange, width: 100%, height: 4pt))
    },
    footer: if footer {
      context {
        let current = counter(page).get().first()
        let total = counter(page).final().first()
        grid(
          columns: (1fr, auto),
          align: (left, right),
          text(
            size: slide-size-sm,
            fill: text-muted,
            weight: weight-button,
            title,
          ),
          text(
            size: slide-size-sm,
            fill: text-muted,
            weight: weight-button,
            str(current) + " / " + str(total),
          ),
        )
      }
    } else { none },
  )

  set text(
    font: font-body,
    size: slide-size-base,
    weight: weight-body,
    fill: text-primary,
  )
  set par(leading: (line-height-body - 1) * 1em)
  set heading(numbering: none)

  show heading: set text(font: font-heading, weight: weight-heading, fill: text-primary)
  show heading.where(level: 1): set block(above: space-xl, below: space-lg)
  show heading.where(level: 2): set block(above: space-lg, below: space-xl)
  show heading.where(level: 3): set block(above: space-md, below: space-lg)

  show link: it => text(fill: accent, it)
  set list(marker: ([•], [◦], [▪]))
  show list: set block(spacing: space-sm)
  show list.item: it => block(spacing: space-md, it)
  set block(spacing: space-lg)

  doc
}

/// Title slide — centered, large display title with optional subtitle,
/// author, and date.
#let title-slide(
  title,
  subtitle: none,
  author: none,
  date: none,
) = {
  slide-pagebreak()
  set align(center + horizon)
  block(width: 100%, {
    set par(leading: (line-height-display - 1) * 1em)
    text(
      font: font-heading,
      size: slide-size-4xl,
      weight: weight-display,
      tracking: tracking-display,
      fill: accent,
      title,
    )
    if subtitle != none {
      v(space-sm)
      text(
        font: font-heading,
        size: slide-size-xl,
        weight: weight-heading,
        fill: text-primary,
        subtitle,
      )
    }
    if author != none or date != none {
      v(space-xl)
      text(
        size: slide-size-sm,
        fill: text-muted,
        weight: weight-button,
        {
          if author != none { author }
          if author != none and date != none { "  ·  " }
          if date != none { date.display("[year]-[month]-[day]") }
        },
      )
    }
  })
}

/// Section divider slide — minimal, centered, large text with an accent line.
#let section-slide(
  title,
  subtitle: none,
) = {
  slide-pagebreak()
  set align(center + horizon)
  block(width: 100%, {
    set par(leading: 0.25em)
    text(
      font: font-heading,
      size: slide-size-3xl,
      weight: weight-display,
      fill: accent,
      title,
    )
    v(space-sm)
    line(length: 60%, stroke: 1pt + accent)
    if subtitle != none {
      v(space-md)
      text(
        font: font-heading,
        size: slide-size-lg,
        weight: weight-heading,
        fill: text-primary,
        subtitle,
      )
    }
  })
}

/// Standard content slide — title at top-left, body below.
#let content-slide(
  title,
  body,
) = {
  slide-pagebreak()
  block(width: 100%, height: 100%, {
    text(
      font: font-heading,
      size: slide-size-xl,
      weight: weight-heading,
      fill: accent,
      title,
    )
    v(space-3xl)
    body
  })
}

/// Graph slide — title at top-left, full-width chart area below.
/// Optimized for data visualizations. Use with lilaq diagrams or any
/// other chart content that benefits from maximum vertical space.
#let graph-slide(
  title,
  body,
) = {
  slide-pagebreak()
  block(width: 100%, height: 100%, {
    text(
      font: font-heading,
      size: slide-size-xl,
      weight: weight-heading,
      fill: accent,
      title,
    )
    v(space-xl)
    body
  })
}

/// Two-column slide — title at top-left, content split into two columns.
#let split-slide(
  title,
  left,
  right,
  ratio: (1fr, 1fr),
) = {
  slide-pagebreak()
  block(width: 100%, height: 100%, {
    text(
      font: font-heading,
      size: slide-size-xl,
      weight: weight-heading,
      fill: accent,
      title,
    )
    v(space-3xl)
    grid(
      columns: ratio,
      column-gutter: space-xl,
      align: top,
      block(width: 100%, left),
      block(width: 100%, right),
    )
  })
}

/// Image-dominant slide. Position controls image placement:
///   "full"  — image fills the body area beneath the title
///   "left"  — image on the left (55%), text on the right
///   "right" — text on the left, image on the right (55%)
#let image-slide(
  title,
  image-path,
  caption: none,
  position: "full",
) = {
  slide-pagebreak()
  block(width: 100%, height: 100%, {
    text(
      font: font-heading,
      size: slide-size-xl,
      weight: weight-heading,
      fill: accent,
      title,
    )
    v(space-lg)
    if position == "full" {
      block(width: 100%, {
        image(image-path, width: 100%, fit: "contain")
        if caption != none {
          v(space-sm)
          text(size: slide-size-sm, fill: text-muted, caption)
        }
      })
    } else if position == "left" {
      grid(
        columns: (55%, 1fr),
        column-gutter: space-lg,
        align: top,
        image(image-path, width: 100%, fit: "contain"),
        block(width: 100%, {
          if caption != none {
            text(size: slide-size-sm, fill: text-muted, caption)
          }
        }),
      )
    } else if position == "right" {
      grid(
        columns: (1fr, 55%),
        column-gutter: space-lg,
        align: top,
        block(width: 100%, {
          if caption != none {
            text(size: slide-size-sm, fill: text-muted, caption)
          }
        }),
        image(image-path, width: 100%, fit: "contain"),
      )
    }
  })
}

/// Full-bleed impact slide — centered body with a strong background.
/// tone: "accent" = orange bg + white text
/// tone: "dark"   = near-black bg + white text
#let focus-slide(
  body,
  tone: "accent",
) = {
  slide-pagebreak()
  let bg-color = if tone == "accent" { colors-sunbeam-orange } else { colors-sunbeam-black }

  set page(
    background: rect(fill: bg-color, width: 100%, height: 100%),
    footer: none,
  )
  set text(fill: white)

  set align(center + horizon)
  block(width: 80%, {
    set par(leading: 0.25em)
    body
  })
}

/// Final slide — centered title, subtitle, and optional CTA block.
#let closing-slide(
  title,
  subtitle: none,
  cta: none,
) = {
  slide-pagebreak()
  set align(center + horizon)
  block(width: 100%, {
    set par(leading: 0.25em)
    text(
      font: font-heading,
      size: slide-size-3xl,
      weight: weight-display,
      fill: accent,
      title,
    )
    if subtitle != none {
      v(space-md)
      text(
        font: font-heading,
        size: slide-size-xl,
        weight: weight-heading,
        fill: text-primary,
        subtitle,
      )
    }
    if cta != none {
      v(space-xl)
      block(
        fill: colors-sunbeam-orange,
        inset: (x: space-xl, y: space-lg),
        radius: radius-md,
        {
          set par(leading: 0.4em)
          text(
            fill: white,
            weight: weight-button,
            size: slide-size-lg,
            tracking: 0.04em,
            upper(cta),
          )
        },
      )
    }
  })
}

/// Blank slide — no title, no preset layout. Full freedom for custom content.
#let blank-slide(
  body,
) = {
  slide-pagebreak()
  body
}

/// Circular avatar image — clips any image to a perfect circle.
/// Use inside `team-slide` or any other layout.
#let avatar(
  path,
  size: 72pt,
) = {
  box(
    width: size,
    height: size,
    clip: true,
    radius: 100%,
    image(path, width: 100%, height: 100%, fit: "cover"),
  )
}

/// Circular avatar placeholder — use when you don't have a photo yet.
#let avatar-placeholder(
  initials,
  size: 72pt,
  fill-color: accent,
) = {
  box(
    width: size,
    height: size,
    clip: true,
    radius: 100%,
    fill: fill-color,
    align(center + horizon, text(fill: white, size: slide-size-lg)[#initials]),
  )
}

/// Define a single team member for `team-slide`.
/// `avatar` can be an image path string or custom content (e.g. `#avatar-placeholder(...)`).
#let team-member(
  name,
  role,
  body,
  avatar: none,
) = {
  (name: name, role: role, body: body, avatar: avatar)
}

/// Team slide — N-column layout for people cards.
/// Pass one `team-member(...)` per column. Cards shrink to the tallest
/// content and all share the same height.
#let team-slide(
  title,
  ..members,
) = {
  slide-pagebreak()
  let people = members.pos()

  block(width: 100%, height: 100%, {
    text(font: font-heading, size: slide-size-xl, weight: weight-heading, fill: accent, title)
    v(space-xl)

    let has-avatars = people.any(m => m.avatar != none)
    let has-bios = people.any(m => m.body != [])

    let cells = ()
    if has-avatars {
      cells += people.map(m => grid.cell(
        fill: bg-card,
        inset: space-lg,
        align(center + top, if m.avatar != none {
          if type(m.avatar) == str { avatar(m.avatar) } else { m.avatar }
        } else { [] }),
      ))
    }
    cells += people.map(m => grid.cell(
      fill: bg-card,
      inset: space-lg,
      align(center + top, text(font: font-heading, size: slide-size-lg, weight: weight-heading, m.name)),
    ))
    cells += people.map(m => grid.cell(
      fill: bg-card,
      inset: space-lg,
      align(center + top, text(font: font-body, size: slide-size-base, weight: weight-body, fill: text-muted, m.role)),
    ))
    if has-bios {
      cells += people.map(m => grid.cell(
        fill: bg-card,
        inset: space-lg,
        align(center + top, m.body),
      ))
    }

    grid(
      columns: people.map(_ => 1fr),
      column-gutter: space-lg,
      row-gutter: 0pt,
      align: center + top,
      ..cells,
    )
  })
}

/// Multi-column slide — equal-width vertical cards for tiers, products,
/// pricing tables, or any N-column comparison. Each body argument becomes
/// one column with a cream card background.
/// All cards share the same height, sized to the tallest content.
#let columns-slide(
  title,
  ..bodies,
) = {
  slide-pagebreak()
  context layout(size => {
    let cols = bodies.pos()
    let n = cols.len()
    let gutter = space-lg
    let col-width = (size.width - gutter * (n - 1)) / n

    let heights = cols.map(body => {
      measure(block(width: col-width, inset: space-lg, body)).height
    })
    let max-height = calc.max(..heights)

    block(width: 100%, height: 100%, {
      text(font: font-heading, size: slide-size-xl, weight: weight-heading, fill: accent, title)
      v(space-3xl)
      grid(
        columns: cols.map(_ => 1fr),
        column-gutter: gutter,
        align: top,
        ..cols.map(body => block(
          width: 100%,
          height: max-height,
          fill: bg-card,
          inset: space-lg,
          radius: radius-md,
          body,
        )),
      )
    })
  })
}

/// Horizontal-rows slide — N horizontal bands stacked vertically.
/// Each body argument becomes one full-width row with a cream card
/// background. All rows share the same height, sized to the tallest content.
#let rows-slide(
  title,
  ..bodies,
) = {
  slide-pagebreak()
  context layout(size => {
    let rows = bodies.pos()
    let gutter = space-lg
    let row-width = size.width

    let heights = rows.map(body => {
      measure(block(width: row-width, inset: space-lg, body)).height
    })
    let max-height = calc.max(..heights)

    block(width: 100%, height: 100%, {
      text(font: font-heading, size: slide-size-xl, weight: weight-heading, fill: accent, title)
      v(space-3xl)
      grid(
        rows: rows.map(_ => auto),
        row-gutter: gutter,
        align: left + top,
        ..rows.map(body => block(
          width: 100%,
          height: max-height,
          fill: bg-card,
          inset: space-lg,
          radius: radius-md,
          body,
        )),
      )
    })
  })
}

/// Quad slide — 2×2 grid of four equal cards.
/// Each body argument becomes one quadrant with a cream card background.
/// All four cards share the same height, sized to the tallest content.
#let quad-slide(
  title,
  top-left,
  top-right,
  bottom-left,
  bottom-right,
) = {
  slide-pagebreak()
  context layout(size => {
    let gutter = space-lg
    let cell-width = (size.width - gutter) / 2

    let boxes = (top-left, top-right, bottom-left, bottom-right)
    let heights = boxes.map(body => {
      measure(block(width: cell-width, inset: space-lg, body)).height
    })
    let max-height = calc.max(..heights)

    block(width: 100%, height: 100%, {
      text(font: font-heading, size: slide-size-xl, weight: weight-heading, fill: accent, title)
      v(space-3xl)
      grid(
        columns: (1fr, 1fr),
        rows: (auto, auto),
        column-gutter: gutter,
        row-gutter: gutter,
        align: top,
        ..boxes.map(body => block(
          width: 100%,
          height: max-height,
          fill: bg-card,
          inset: space-lg,
          radius: radius-md,
          body,
        )),
      )
    })
  })
}

/// Logo slide — showcase a grid of company/partner logos.
///
/// Each logo is centered in a cell with a subtle cream background so
/// light and dark logos sit consistently. Logos scale with `fit: "contain"`
/// and keep a comfortable padding.
///
/// Pass image paths as strings, or any custom content (e.g. placeholder
/// rectangles) if you don't have logo files yet.
///
/// Use `columns` to set how many logos appear per row, or use `rows` to
/// evenly distribute logos across a fixed number of rows.
///
/// Usage:
///   #logo-slide("Trusted by", columns: 4,
///     "logos/acme.svg",
///     "logos/globex.svg",
///     "logos/soylent.svg",
///     "logos/initech.svg",
///   )
///
///   #logo-slide("Trusted by", rows: 2,
///     "logos/acme.svg",
///     "logos/globex.svg",
///     "logos/soylent.svg",
///     "logos/initech.svg",
///     "logos/umbrella.svg",
///     "logos/stark.svg",
///   )
#let logo-slide(
  title,
  ..logos,
  columns: none,
  rows: none,
) = {
  let items = logos.pos()
  let n = items.len()

  // Determine grid shape — rows overrides columns when both are given
  let grid-cols = if rows != none {
    calc.ceil(n / rows)
  } else if columns != none {
    columns
  } else {
    4
  }

  slide-pagebreak()
  context layout(size => {
    let gutter = space-lg
    let col-width = (size.width - gutter * (grid-cols - 1)) / grid-cols
    let logo-h = 60pt

    // Pre-measure every item so all cards equalize to the tallest.
    // This fixes the overflow bug: without a fixed block height, images
    // can spill out of auto-sized containers.
    let heights = items.map(item => {
      let content = if type(item) == str {
        image(item, fit: "contain", width: 100%, height: logo-h)
      } else {
        item
      }
      measure(block(width: col-width, inset: space-lg, align(center + horizon, content))).height
    })
    let max-height = calc.max(..heights)

    block(width: 100%, height: 100%, {
      text(font: font-heading, size: slide-size-xl, weight: weight-heading, fill: accent, title)
      v(space-3xl)
      grid(
        columns: (1fr,) * grid-cols,
        column-gutter: gutter,
        row-gutter: gutter,
        align: center + horizon,
        ..items.map(item => {
          let content = if type(item) == str {
            image(item, fit: "contain", width: 100%, height: logo-h)
          } else {
            item
          }
          block(
            width: 100%,
            height: max-height,
            fill: bg-card,
            inset: space-lg,
            radius: radius-md,
            align(center + horizon, content),
          )
        }),
      )
    })
  })
}


// ============================================================================
// PACKET TEMPLATE — beam-packet
// ============================================================================
// A dark, long-form document format for investor briefings, data packets,
// newsletters, and leave-behinds. Based on the Sunbeam Compute Platform
// pitch-deck visual language.
// ============================================================================

// ---- Packet Colors — dark theme (mirrors the Compute Platform deck) ----
#let packet-bg = colors-sunbeam-black
#let packet-card-fill = colors-card-dark
#let packet-card-fill-alt = rgb("#272727")
#let packet-table-row = rgb("#262626")
#let packet-card-border = rgb(255, 175, 48, 46)
#let packet-text = white
#let packet-text-bright = rgb("#ebebeb")
#let packet-text-muted = rgb("#787878")
#let packet-text-secondary = rgb("#bcbcbc")
#let packet-callout-text = rgb("#cecece")
#let packet-gold = colors-sunshine-700
#let packet-orange = colors-sunbeam-orange

// ---- Packet Typography Scale (A4 reading) ----
#let packet-size-xs = 7.5pt
#let packet-size-sm = 9pt
#let packet-size-base = 10.5pt
#let packet-size-lg = 12pt
#let packet-size-xl = 16pt
#let packet-size-2xl = 22pt
#let packet-size-3xl = 32pt

// ---- Packet Spacing ----
#let packet-space-xs = 4pt
#let packet-space-sm = 8pt
#let packet-space-md = 12pt
#let packet-space-lg = 18pt
#let packet-space-xl = 28pt
#let packet-space-2xl = 40pt

// ---- Packet Card Radius ----
#let packet-radius = 10pt

// ---- Orbital Graphic ----
// Corner decoration: the Sunbeam sun-rays mark. Used on the cover and closing
// pages. `corner` is "top-right" or "bottom-right". `dx` pushes outward toward
// the page edge (bleed); `dy` shifts vertically (negative = up).
#let orbital-graphic(corner: "top-right", size: 260pt, dx: 40pt, dy: 0pt) = {
  let h-align = if corner == "top-right" or corner == "bottom-right" { right } else { left }
  let v-align = if corner == "top-right" or corner == "top-left" { top } else { bottom }
  place(
    h-align + v-align,
    dx: if h-align == right { dx } else { -dx },
    dy: dy,
    image("assets/sun-rays.svg", width: size),
  )
}

/// Small-caps section label in gold, tracked. Used at the top of every section.
#let packet-label(text-content) = {
  text(
    fill: packet-gold,
    size: packet-size-xs,
    weight: weight-button,
    tracking: 0.14em,
    upper(text-content),
  )
}

/// Section opener: small gold label + document-scale headline + optional subhead.
#let packet-section(label-text, headline, subhead: none) = {
  block(above: packet-space-xl, below: packet-space-lg, {
    packet-label(label-text)
    v(packet-space-xs)
    text(
      font: font-heading,
      size: packet-size-2xl,
      weight: weight-display,
      fill: packet-text,
      headline,
    )
    if subhead != none {
      v(packet-space-sm)
      text(
        size: packet-size-base,
        weight: weight-body,
        fill: packet-text-muted,
        subhead,
      )
    }
  })
}

/// Single dark card with optional title and body.
#let packet-card(title: none, body: none, accent-border: false) = {
  block(
    width: 100%,
    fill: packet-card-fill,
    stroke: if accent-border { (left: 3pt + packet-orange) } else { 1pt + packet-card-border },
    radius: packet-radius,
    inset: packet-space-lg,
    {
      if title != none {
        text(
          font: font-heading,
          size: packet-size-xl,
          weight: weight-heading,
          fill: packet-text,
          title,
        )
        v(packet-space-sm)
      }
      text(
        size: packet-size-base,
        weight: weight-body,
        fill: packet-text-secondary,
        body,
      )
    },
  )
}

/// Grid of dark cards. `columns` can be 2, 3, or 4.
#let packet-card-grid(columns: 3, gutter: packet-space-md, ..cards) = {
  let items = cards.pos()
  let col-spec = (1fr,) * columns
  grid(
    columns: col-spec,
    column-gutter: gutter,
    row-gutter: gutter,
    align: top,
    ..items.map(it => packet-card(..it)),
  )
}

/// Dark card callout with a thick left rule, lightbulb marker, and orange label.
/// Mirrors the investor-briefing highlight treatment.
#let packet-callout(label: none, body) = {
  block(
    width: 100%,
    fill: packet-card-fill,
    stroke: (left: border-width-callout + packet-orange),
    inset: packet-space-lg,
    {
      if label != none {
        box(
          baseline: 30%,
          image("assets/icons/material-symbols/lightbulb.svg", width: packet-size-xl),
        )
        h(packet-space-sm)
        text(
          fill: packet-orange,
          size: packet-size-xs,
          weight: weight-button,
          tracking: 0.14em,
          upper(label),
        )
        v(packet-space-sm)
      }
      text(
        size: packet-size-base,
        weight: weight-body,
        fill: packet-callout-text,
        body,
      )
    },
  )
}

/// Big-number metric card.
#let packet-metric(value, label) = {
  block(
    width: 100%,
    fill: packet-card-fill,
    stroke: 1pt + packet-orange,
    radius: packet-radius,
    inset: packet-space-lg,
    {
      text(
        font: font-heading,
        size: packet-size-3xl,
        weight: weight-display,
        fill: packet-orange,
        value,
      )
      v(packet-space-xs)
      text(
        size: packet-size-sm,
        weight: weight-body,
        fill: packet-text-secondary,
        label,
      )
    },
  )
}

/// Arrow list using the deck's orange arrow bullet.
#let packet-arrow-list(..items) = {
  let entries = items.pos()
  grid(
    columns: (auto, 1fr),
    column-gutter: packet-space-sm,
    row-gutter: packet-space-md,
    align: (top, top),
    ..entries.map(entry => {
      (text(fill: packet-orange, "→"), text(size: packet-size-base, fill: packet-text, entry))
    }).flatten(),
  )
}

/// Styled CLI block with orange prompts.
#let packet-cli-block(..lines) = {
  let entries = lines.pos()
  block(
    width: 100%,
    fill: packet-card-fill,
    stroke: 1pt + packet-card-border,
    radius: packet-radius,
    inset: packet-space-lg,
    {
      set text(font: font-mono, size: packet-size-sm)
      for (i, line) in entries.enumerate() {
        if i > 0 { v(packet-space-sm) }
        if type(line) == str and line.starts-with("$") {
          // Prompt line: "$ command" -> orange $, white command
          let parts = line.split(" ")
          text(fill: packet-orange, parts.at(0))
          h(3pt)
          text(fill: packet-text-secondary, parts.slice(1).join(" "))
        } else {
          text(fill: packet-text-muted, line)
        }
      }
    },
  )
}

/// Comparison table with zebra rows, gold header, and optional highlight row.
/// Matches the reference deck: unfilled header, alternating #262626 bands on
/// odd data rows, translucent gold rules, orange highlight row. No outer
/// frame and no vertical rules.
#let packet-table(..args) = {
  let columns = args.pos().at(0)
  let rows = args.pos().slice(1)
  let highlight-row = args.named().at("highlight", default: none)

  let format-cell(cell, is-highlight: false) = {
    if type(cell) == str and cell.starts-with("*") and cell.ends-with("*") {
      let inner = cell.slice(1, -1)
      text(size: packet-size-sm, weight: weight-button, fill: packet-text, hyphenate: false, inner)
    } else if is-highlight {
      text(size: packet-size-sm, weight: weight-button, fill: packet-orange, hyphenate: false, cell)
    } else {
      text(size: packet-size-sm, weight: weight-body, fill: packet-text, hyphenate: false, cell)
    }
  }

  // Translucent gold rules — measured against the reference deck so they
  // render as the same warm dark tones over both the page background and
  // the zebra bands. Insets match the deck's absolute padding (9pt text
  // sits in ~34pt rows, ~14pt from the table edge).
  let row-rule = 0.75pt + rgb(255, 161, 16, 19)
  let header-rule = 1pt + rgb(255, 184, 62, 43)

  table(
    columns: columns,
    stroke: none,
    inset: (x: 14pt, y: 14.5pt),
    align: horizon,
    fill: (_, row) => if calc.odd(row) { packet-table-row } else { none },
    // Header row
    table.header(
      ..rows.at(0).map(cell => {
        text(
          size: packet-size-xs,
          weight: weight-button,
          fill: packet-gold,
          tracking: 0.08em,
          upper(cell),
        )
      }),
    ),
    // Header bottom rule
    table.hline(stroke: header-rule),
    // Data rows
    ..rows.slice(1).enumerate().map(((i, row)) => {
      let is-highlight = highlight-row != none and i == highlight-row
      let bottom-stroke = if is-highlight { 1.5pt + packet-orange } else { row-rule }
      let cells = row.enumerate().map(((j, cell)) => table.cell(
        stroke: (bottom: bottom-stroke),
        format-cell(cell, is-highlight: is-highlight),
      ))
      cells
    }).flatten(),
  )
}

/// Milestone list with dark badges (M1, M2, …).
#let packet-milestones(..items) = {
  let entries = items.pos()
  grid(
    columns: (auto, 1fr),
    column-gutter: packet-space-md,
    row-gutter: packet-space-md,
    align: (center + horizon, top),
    ..entries.enumerate().map(((i, body)) => {
      (
        box(
          fill: packet-card-fill,
          stroke: 1pt + packet-card-border,
          radius: radius-sm,
          inset: (x: packet-space-md, y: packet-space-xs),
          text(size: packet-size-xs, weight: weight-button, fill: packet-text, "M" + str(i + 1)),
        ),
        text(size: packet-size-base, fill: packet-text-secondary, body),
      )
    }).flatten(),
  )
}

/// Three-tier pricing cards. The center tier is highlighted in orange.
#let packet-pricing-tiers(tiers) = {
  // tiers: array of (name, price, subtitle, body)
  grid(
    columns: (1fr, 1fr, 1fr),
    column-gutter: packet-space-md,
    align: top,
    ..tiers.enumerate().map(((i, tier)) => {
      let is-highlight = i == 1
      block(
        width: 100%,
        fill: if is-highlight { packet-orange } else { packet-card-fill },
        stroke: if is-highlight { none } else { 1pt + packet-card-border },
        radius: packet-radius,
        inset: packet-space-lg,
        {
          text(
            font: font-heading,
            size: packet-size-lg,
            weight: weight-heading,
            fill: if is-highlight { white } else { packet-text },
            tier.at(0),
          )
          v(packet-space-sm)
          text(
            font: font-heading,
            size: packet-size-2xl,
            weight: weight-display,
            fill: if is-highlight { white } else { packet-orange },
            tier.at(1),
          )
          if tier.at(2) != none {
            v(packet-space-xs)
            text(
              size: packet-size-sm,
              style: "italic",
              fill: if is-highlight { rgb(255, 255, 255, 200) } else { packet-text-muted },
              tier.at(2),
            )
          }
          v(packet-space-md)
          line(length: 100%, stroke: if is-highlight { rgb(255, 255, 255, 150) } else { packet-card-border })
          v(packet-space-md)
          text(
            size: packet-size-base,
            fill: if is-highlight { white } else { packet-text-muted },
            tier.at(3),
          )
        },
      )
    }),
  )
}

/// Team card with circular avatars + names + orange roles + bios.
#let packet-team-card(..members) = {
  let people = members.pos()
  block(
    width: 100%,
    fill: packet-card-fill,
    stroke: 1pt + packet-card-border,
    radius: packet-radius,
    inset: packet-space-xl,
    {
      grid(
        columns: people.map(_ => 1fr),
        column-gutter: packet-space-xl,
        align: top,
        ..people.map(m => {
          block(width: 100%, {
            if m.avatar != none {
              align(center, if type(m.avatar) == str {
                avatar(m.avatar, size: 64pt)
              } else {
                m.avatar
              })
              v(packet-space-md)
            }
            text(
              font: font-heading,
              size: packet-size-xl,
              weight: weight-heading,
              fill: packet-text,
              m.name,
            )
            v(packet-space-xs)
            text(
              size: packet-size-sm,
              weight: weight-button,
              fill: packet-orange,
              m.role,
            )
            if m.body != [] and m.body != none {
              v(packet-space-sm)
              text(
                size: packet-size-sm,
                fill: packet-text-muted,
                m.body,
              )
            }
          })
        }),
      )
    },
  )
}

/// Masthead / cover block for a packet. Sits at the top of the first page
/// like a letterhead rather than a full-bleed title slide, with the sun-rays
/// mark bleeding off the top-right corner as on the deck cover.
#let packet-cover(
  title,
  subtitle: none,
  body: none,
  label: "Investor Briefing",
  date: none,
) = {
  orbital-graphic(corner: "top-right", size: 380pt, dx: 256.2pt, dy: -264pt)
  block(
    width: 100%,
    below: packet-space-2xl,
    {
      if label != none {
        packet-label(label)
        v(packet-space-xs)
      }
      text(
        font: font-heading,
        size: packet-size-3xl,
        weight: weight-display,
        fill: packet-text,
        title,
      )
      if subtitle != none {
        v(-8pt)
        text(
          font: font-heading,
          size: packet-size-xl,
          style: "italic",
          fill: packet-orange,
          subtitle,
        )
      }
      if body != none {
        v(packet-space-sm)
        block(
          width: 12.5cm,
          text(
            size: packet-size-base,
            weight: weight-body,
            fill: packet-text-bright,
            body,
          ),
        )
      }
      if date != none {
        v(packet-space-xs)
        text(
          size: packet-size-sm,
          fill: packet-text-muted,
          date,
        )
      }
    },
  )
}

/// Closing page for a packet.
#let packet-closing(
  headline,
  body: none,
  contact: none,
) = {
  page(margin: 0pt, {
    place(rect(fill: packet-bg, width: 100%, height: 100%))
    orbital-graphic(corner: "bottom-right")

    place(
      top + left,
      dx: 2.4cm,
      dy: 2.4cm,
      block(width: 14cm, {
        packet-label("The Ask")
        v(packet-space-lg)
        text(
          font: font-heading,
          size: packet-size-3xl,
          weight: weight-display,
          fill: packet-text,
          headline,
        )
        if body != none {
          v(packet-space-xl)
          text(
            size: packet-size-lg,
            weight: weight-body,
            fill: packet-text-muted,
            body,
          )
        }
        if contact != none {
          v(packet-space-2xl)
          text(
            size: packet-size-base,
            fill: packet-orange,
            contact,
          )
        }
      }),
    )
  })
}

/// Packet show-rule. Sets up dark A4 pages, section heading styles, lists,
/// links, and a running footer.
#let beam-packet(
  title: "Packet",
  author: none,
  date: none,
  doc,
) = {
  set document(title: title, author: if author != none { author } else { () })

  set page(
    paper: "a4",
    margin: (top: 2.6cm, bottom: 2.4cm, left: 2.4cm, right: 2.4cm),
    background: rect(fill: packet-bg, width: 100%, height: 100%),
    header: context {
      if counter(page).get().first() > 1 {
        set text(size: packet-size-xs, fill: packet-text-muted, weight: weight-button, tracking: 0.08em)
        upper(title)
        v(packet-space-sm)
        line(length: 100%, stroke: 0.5pt + packet-card-border)
      }
    },
    footer: context {
      set text(size: packet-size-xs, fill: packet-text-muted, weight: weight-button, tracking: 0.08em)
      grid(
        columns: (1fr, auto),
        align: (left, right),
        upper("Sunbeam Studios · " + title),
        counter(page).display("1"),
      )
    },
  )

  set text(
    font: font-body,
    size: packet-size-base,
    weight: weight-body,
    fill: packet-text-secondary,
  )
  set par(leading: 0.55em, justify: true)
  set heading(numbering: none)

  // h1 = section headline inside content pages
  show heading.where(level: 1): it => {
    block(above: packet-space-xl, below: packet-space-md, {
      text(
        font: font-heading,
        size: packet-size-2xl,
        weight: weight-display,
        fill: packet-text,
        it.body,
      )
    })
  }

  // h2 = sub-section title
  show heading.where(level: 2): it => {
    block(above: packet-space-lg, below: packet-space-sm, {
      text(
        font: font-heading,
        size: packet-size-xl,
        weight: weight-heading,
        fill: packet-text,
        it.body,
      )
    })
  }

  // h3 = small caps label
  show heading.where(level: 3): it => {
    block(above: packet-space-md, below: packet-space-xs, {
      packet-label(it.body)
    })
  }

  show link: it => text(fill: packet-orange, it)
  // Bold lead-ins render white, matching the deck's white-emphasis hierarchy.
  show strong: set text(fill: packet-text)
  set list(marker: ([•], [◦], [▪]))
  show list: set text(fill: packet-text-secondary)
  show list: set block(spacing: packet-space-sm)
  show list.item: set block(spacing: packet-space-xs)
  show enum: set block(spacing: packet-space-sm)
  show enum.item: set block(spacing: packet-space-xs)

  set block(spacing: packet-space-lg)

  doc
}
