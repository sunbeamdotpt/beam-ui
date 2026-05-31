// Beam Design Language — starter document
// Requires: Ysabeau Infant (static instances at weights 431/575/647/791)
//           Monaspace Argon (static OTFs)
// Install fonts to your system font directory, then run:
//   typst compile main.typ

#import "../lib.typ": *

#show: beam-doc.with(
  title: "Document Title",
  subtitle: "Optional subtitle",
  author: "Author Name",
  date: datetime.today(),
)

= First Section

Body text uses Ysabeau Infant at weight 647. Inline #code("code") appears in
Monaspace Argon tinted toward the accent color.

== Subsection

Use `==` for subsections and `===` for small editorial labels.

=== A Label

Content beneath the label.

#callout(kind: "note")[
  Use `callout` for notes, tips, and warnings. Supported kinds: `"note"`,
  `"warning"`, `"tip"`.
]

#achievement-grid(
  achievement("First Achievement", "Description of the first thing accomplished.", tone: "orange"),
  achievement("Second Achievement", "Description of the second thing accomplished.", tone: "gold"),
)

#pull-quote(
  "An important quote or key decision goes here.",
  attribution: "Source or context",
)

#highlight[A full-width highlight block for status notices or key dates.]

= Second Section

#repo-entry("package-name")[
  Short description of this item. Use for repository roundups, glossaries, or
  any list of named entities with prose descriptions.
]

#cta("Call to Action", detail: "Supporting copy for the reader's next step.")
