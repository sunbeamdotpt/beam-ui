// Beam Design Language — starter presentation deck
// Requires: Ysabeau Infant (static instances at weights 431/575/647/791)
//           Monaspace Argon (static OTFs)
// Install fonts to your system font directory, then run:
//   typst compile slides.typ

#import "../lib.typ": *

#show: beam-slides.with(
  title: "Pitch Deck Title",
  author: "Sunbeam Studios",
  date: datetime.today(),
)

#title-slide(
  "Sunbeam",
  subtitle: "The open platform for creative studios",
)

#section-slide("The Problem")

#content-slide("Market Gap")[
  - Existing tools are fragmented across dozens of apps
  - Creative teams waste 40% of their time context-switching
  - No single platform connects design, engineering, and operations
]

#split-slide(
  "Our Solution",
  ratio: (2fr, 3fr),
)[
  A unified workspace:
  - Design system management
  - Real-time collaboration
  - Deployments built-in
][
  // Replace with a product screenshot or diagram
  #rect(width: 100%, height: 80%, fill: bg-card, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Image placeholder]
  ]
]

#focus-slide(tone: "accent")[
  #text(size: slide-size-4xl)[10×] \
  #text(size: slide-size-lg)[faster iteration cycles]
]

#closing-slide(
  "Let's build together",
  subtitle: "studio@sunbeam.pt",
)
