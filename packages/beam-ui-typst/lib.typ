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

// ---- Colors — Palette tokens (mirrors beam-ui preset.ts naming) ----
// Token names use hyphens in place of dots: sunbeam.orange → colors-sunbeam-orange
#let colors-sunbeam-orange = rgb("#fa520f")
#let colors-sunbeam-flame  = rgb("#fb6424")
#let colors-beam-orange    = rgb("#ff8105")

#let colors-sunshine-900  = rgb("#ff8a00")
#let colors-sunshine-700  = rgb("#ffa110")
#let colors-sunshine-500  = rgb("#ffb83e")
#let colors-sunshine-300  = rgb("#ffd06a")
#let colors-beam-gold     = rgb("#ffe295")
#let colors-bright-yellow = rgb("#ffd900")

#let colors-warm-ivory    = rgb("#fffaeb")
#let colors-cream         = rgb("#fff0c2")
#let colors-sunbeam-black = rgb("#1f1f1f")
#let colors-card-dark     = rgb("#2a2a2a")

// Borders — fixed: rgba() CSS strings are not valid Typst rgb() arguments
// Original: rgb("rgba(127, 99, 21, 0.15)") and rgb("rgba(127, 99, 21, 0.08)")
// Typst rgb(r, g, b, a) uses 0–255 for all channels
#let colors-border-warm        = rgb(127, 99, 21, 38)   // ~0.15 alpha (border.warm)
#let colors-border-warm-subtle = rgb(127, 99, 21, 20)   // ~0.08 alpha (border.warmSubtle)
#let colors-border-warm-dark   = rgb(255, 161, 16, 38)  // ~0.15 alpha (border.warmDark)

// ---- Colors — Semantic tokens (mirrors beam-ui semantic layer) ----
// No prefix — these map directly to the upstream semantic token names.
#let bg-page        = colors-warm-ivory
#let bg-card        = colors-cream
#let text-primary   = colors-sunbeam-black
#let text-secondary = rgb("#3d3d3d")
#let text-muted     = rgb("#7f6315")
#let border-default = colors-border-warm
#let border-subtle  = colors-border-warm-subtle
#let accent         = colors-sunbeam-orange

// ---- Colors — Syntax highlighting (syn-* mirrors upstream syn.* tokens) ----
#let syn-keyword = rgb("#c084fc")
#let syn-fn      = rgb("#93c5fd")
#let syn-string  = rgb("#86efac")
#let syn-prop    = rgb("#fdba74")
#let syn-number  = rgb("#fb923c")
#let syn-builtin = rgb("#fde047")
#let syn-text    = rgb("#d4d4d8")
#let syn-bg      = rgb("#1f1f1f")

// ---- Typography ----
#let font-heading = ("Ysabeau Infant", "Helvetica Neue", "Arial")
#let font-body    = ("Ysabeau Infant", "Helvetica Neue", "Arial")
#let font-mono    = ("Monaspace Argon", "SF Mono", "Menlo")

#let weight-display = 431
#let weight-heading = 575
#let weight-body    = 647
#let weight-button  = 791

// Sizes scaled from beam-ui px values by 0.625 for print (16px web → 10pt body).
// Source web values are kept in comments for reference.
#let size-2xs = 6.5pt   // 10px label
#let size-xs  = 7.5pt   // 12px meta
#let size-sm  = 9pt     // 14px caption
#let size-md  = 10pt    // 16px body
#let size-lg  = 11.5pt  // 18px UI emphasis
#let size-xl  = 12.5pt  // 20px brand
#let size-2xl = 16.5pt  // 24px title (h3) +10%
#let size-3xl = 22pt    // 32px sub-heading (h2) +10%
#let size-4xl = 33pt    // 48px sub-heading-lg (h1) +10%
#let size-5xl = 38.5pt  // 56px section +10%
#let size-6xl = 56pt    // 82px display +10%

#let line-height-tight   = 1.0
#let line-height-display = 0.95
#let line-height-heading = 1.15
#let line-height-title   = 1.33
#let line-height-body    = 1.50
#let line-height-caption = 1.43

// Letter-spacing for display sizes (per typography page: -2.05px at 82pt only)
#let tracking-display = -1.3pt

// ---- Spacing ----
#let space-xs  = 4pt
#let space-sm  = 8pt
#let space-md  = 12pt
#let space-lg  = 16pt
#let space-xl  = 24pt
#let space-2xl = 32pt
#let space-3xl = 40pt

// ---- Corners & Borders ----
#let radius-sm   = 2pt
#let radius-md   = 4pt
#let radius-lg   = 12pt
#let radius-full = 9999pt

#let border-width-thin    = 0.5pt
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
    "note":    colors-sunbeam-orange,
    "warning": colors-sunshine-900,
    "tip":     colors-sunbeam-orange,
  )
  let text-colors = (
    "note":    colors-sunbeam-orange,
    "warning": colors-sunshine-900,
    "tip":     colors-sunbeam-orange,
  )
  let labels = (
    "note":    "NOTE",
    "warning": "WARNING",
    "tip":     "PRO TIP",
  )

  let border-color = border-colors.at(kind, default: colors-sunbeam-orange)
  let text-color   = text-colors.at(kind, default: colors-sunbeam-orange)
  let label        = labels.at(kind, default: "NOTE")

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
    }
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
    if t == "gold" { colors-sunshine-900 }
    else if t == "tip" { colors-sunshine-900 }
    else { colors-sunbeam-orange }
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

    let measured-heights = single.map(it => measure(
      block(
        width: col-width,
        fill: bg-card,
        stroke: (left: border-width-callout + border-for-tone(it.tone)),
        inset: (x: space-md, y: space-md),
        achievement-body(it.title, it.body),
      )
    ).height)
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
    text(font: font-mono, size: size-xs, weight: weight-body, key-text)
  )
}

/// Badge / pill — fixed: replaced unsupported `match` with dictionary lookup
#let badge(label, tone: "orange") = {
  let bg-map = (
    "gold":    colors-beam-gold,
    "orange":  colors-sunbeam-orange,
    "warning": colors-sunshine-900,
    "info":    colors-sunshine-700,
    "success": rgb("#15803d"),
    "error":   rgb("#991b1b"),
  )
  let fg-map = (
    "gold":    colors-sunbeam-black,
    "orange":  white,
    "warning": white,
    "info":    white,
    "success": white,
    "error":   white,
  )

  let bg = bg-map.at(tone, default: colors-beam-gold)
  let fg = fg-map.at(tone, default: colors-sunbeam-black)

  box(
    fill: bg,
    inset: (x: space-xs, y: 2pt),
    radius: radius-sm,
    text(fill: fg, weight: weight-button, size: size-2xs, upper(label))
  )
}

/// Styled code block (raw/pre)
#let code-block(content) = {
  block(
    fill: syn-bg,
    inset: space-md,
    radius: radius-md,
    stroke: border-width-thin + border-default,
    text(fill: syn-text, font: font-mono, size: size-sm, content)
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
    }
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
        }
      )
      v(space-lg)
    }
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
        upper(title),
        if issue != none { upper(issue) },
      )
    }
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
        text(size: size-xs, weight: weight-button, tracking: 0.12em,
          fill: rgb(255, 255, 255, 180), upper(tagline))
      }
      if issue != none or date != none {
        v(4pt)
        let meta-parts = ()
        if issue != none { meta-parts.push(issue) }
        if date != none { meta-parts.push(date) }
        text(size: size-sm, weight: weight-button,
          fill: rgb(255, 255, 255, 220), meta-parts.join(" · "))
      }
    }
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
        if from != none     { cells.push(info-cell("From", from)) }
        if audience != none { cells.push(info-cell("To", audience)) }
        if date != none     { cells.push(info-cell("Date", date)) }
        grid(columns: cells.map(_ => 1fr), align: center, column-gutter: space-xl, ..cells)
        v(space-md)
        line(length: 100%, stroke: border-width-thin + border-subtle)
      }
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
  doc
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
      it
    )
  }

  show raw.where(block: false): it => {
    box(
      fill: bg-card,
      inset: (x: 2pt, y: 1pt),
      radius: radius-sm,
      text(font: font-mono, size: size-sm, it)
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
    }
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
          ]
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
      }
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
#let slide-size-sm  = 18pt
#let slide-size-base = 22pt
#let slide-size-lg  = 28pt
#let slide-size-xl  = 36pt
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

  show link: it => text(fill: accent, it)
  set list(marker: ([•], [◦], [▪]))
  show list: set block(spacing: space-sm)
  show list.item: it => block(spacing: space-xs, it)
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
      v(space-lg)
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
      let meta-parts = ()
      if author != none { meta-parts.push(author) }
      if date != none { meta-parts.push(date.display("[year]-[month]-[day]")) }
      text(
        size: slide-size-sm,
        fill: text-muted,
        weight: weight-button,
        meta-parts.join("  ·  "),
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
    set par(leading: (line-height-display - 1) * 1em)
    line(length: 60%, stroke: 1pt + accent)
    v(space-xl)
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
    v(space-xl)
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
    set par(leading: (line-height-heading - 1) * 1em)
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
    set par(leading: (line-height-display - 1) * 1em)
    text(
      font: font-heading,
      size: slide-size-3xl,
      weight: weight-display,
      fill: accent,
      title,
    )
    if subtitle != none {
      v(space-lg)
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
