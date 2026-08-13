// Beam Design Language — starter presentation deck
// Requires: Ysabeau Infant (static instances at weights 431/575/647/791)
//           Monaspace Argon (static OTFs)
// Install fonts to your system font directory, then run:
//   typst compile slides.typ

#import "../lib.typ": *
#import "@preview/lilaq:0.6.0" as lq

#show: beam-slides.with(
  title: "Pitch Deck Title",
  author: "Sunbeam Studios",
  date: datetime.today(),
)

#title-slide(
  "Sunbeam",
  subtitle: "The open platform for creative studios",
  author: "Sunbeam Studios",
  date: datetime.today(),
)

#logo-slide("Trusted by", rows: 2,
  // Replace with real logo files — SVG or PNG work best
  // "logos/acme.svg",
  // "logos/globex.svg",
  rect(width: 100%, height: 60pt, fill: none, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Acme Co]
  ],
  rect(width: 100%, height: 60pt, fill: none, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Globex]
  ],
  rect(width: 100%, height: 60pt, fill: none, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Soylent]
  ],
  rect(width: 100%, height: 60pt, fill: none, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Initech]
  ],
  rect(width: 100%, height: 60pt, fill: none, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Umbrella]
  ],
  rect(width: 100%, height: 60pt, fill: none, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Stark Ind]
  ],
  rect(width: 100%, height: 60pt, fill: none, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Wayne Ent]
  ],
  rect(width: 100%, height: 60pt, fill: none, stroke: border-default)[
    #set align(center + horizon)
    #text(fill: text-muted)[Cyberdyne]
  ],
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

#columns-slide("Pricing")[
  == Free
  - 3 projects
  - Community support
][
  == Pro
  - Unlimited projects
  - Priority support
  - Custom domains
][
  == Enterprise
  - SSO & SAML
  - Dedicated infra
  - SLA guarantee
]

#quad-slide("Key Metrics")[
  == Revenue
  \$2.4M ARR, growing 15% MoM
][
  == Customers
  120+ paying teams across 8 countries
][
  == Retention
  98% annual retention, 140% net revenue retention
][
  == Team
  14 people, 100% remote, 6 time zones
]

#graph-slide("Financial Projections")[
  #pad(bottom: 1.5em, {
    show: lq.layout
    grid(
    columns: (1fr, 1fr),
    rows: (1fr, 1fr),
    column-gutter: 1em,
    row-gutter: 0.6em,

    // ── Top-left: ARR Trajectory (3 scenarios) ──
    [#set text(size: 10pt)
      #lq.diagram(
        width: 100%,
        height: 85%,
        title: [ARR Trajectory],
        xlabel: [],
        ylabel: [€M],
        legend: (position: bottom + left, pad: 0.3em),
        xaxis: (ticks: ((1, [P1]), (2, [P2]), (3, [P3]), (4, [Y1]), (5, [Y2]), (6, [Y3])), subticks: none),
        ylim: (0, 16),

        // Series A transition marker
        lq.line(stroke: (paint: gray, dash: "dashed"), (3.5, 0), (3.5, 16)),

        lq.plot(
          (1, 2, 3, 4, 5, 6),
          (0.012, 0.072, 0.15, 1.5, 3.5, 6.0),
          stroke: colors-sunshine-500,
          mark: "o",
          label: [Conservative],
        ),
        lq.plot(
          (1, 2, 3, 4, 5, 6),
          (0.012, 0.072, 0.24, 2.0, 5.0, 12.5),
          stroke: colors-sunbeam-orange,
          mark: "s",
          label: [Baseline],
        ),
        lq.plot(
          (1, 2, 3, 4, 5, 6),
          (0.012, 0.072, 0.50, 2.5, 6.0, 15.0),
          stroke: colors-sunbeam-black,
          mark: "^",
          label: [Aggressive],
        ),
      )],

    // ── Top-right: Customer Growth by Segment ──
    [#set text(size: 10pt)
      #lq.diagram(
        width: 100%,
        height: 85%,
        title: [Customer Growth],
        xlabel: [],
        ylabel: [Customers],
        legend: (position: bottom + left, pad: 0.3em),
        yaxis: (exponent: 0),
        xaxis: (ticks: ((1, [P1]), (2, [P2]), (3, [P3]), (4, [Y1]), (5, [Y2]), (6, [Y3])), subticks: none),

        lq.plot(
          (1, 2, 3, 4, 5, 6),
          (4, 20, 42, 375, 850, 1950),
          stroke: colors-sunbeam-orange,
          mark: "o",
          label: [Professional],
        ),
        lq.plot(
          (1, 2, 3, 4, 5, 6),
          (0, 1, 4, 15, 20, 40),
          stroke: colors-sunbeam-black,
          mark: "s",
          label: [Enterprise],
        ),
        lq.plot((1, 2, 3, 4, 5, 6), (0, 0, 0, 22, 50, 100), stroke: colors-sunshine-700, mark: "^", label: [Edge / TI]),
      )],

    // ── Bottom-left: Deployments ──
    [#set text(size: 10pt)
      #lq.diagram(
        width: 100%,
        height: 85%,
        title: [Deployments],
        xlabel: [],
        ylabel: [Count],
        yaxis: (exponent: 0),
        xaxis: (ticks: ((1, [P1]), (2, [P2]), (3, [P3])), subticks: none),


        lq.bar((1, 2, 3), (500, 5000, 10000), fill: colors-sunbeam-orange.lighten(40%), width: 60%),
      )],

    // ── Bottom-right: Unit Economics ──
    [#set text(size: 10pt)
      #lq.diagram(
        width: 100%,
        height: 85%,
        title: [Unit Economics],
        xlabel: [],
        ylabel: [LTV:CAC],
        yaxis: (exponent: 0),
        xaxis: (ticks: ((1, [Prof 5]), (2, [Prof 10]), (3, [Prof 25]), (4, [Ent 50]), (5, [TI])), subticks: none),

        lq.bar((1, 2, 3, 4, 5), (10, 20, 26, 28, 40), fill: colors-sunbeam-orange.lighten(40%), width: 60%),
      )]
  )})
]

#focus-slide(tone: "accent")[
  #text(size: slide-size-4xl)[10×] \
  #text(size: slide-size-lg)[faster iteration cycles]
]

#closing-slide(
  "Let's build together",
  subtitle: "studio@sunbeam.pt",
)
