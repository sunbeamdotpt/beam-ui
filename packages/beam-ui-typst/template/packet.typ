// Beam Design Language — long-form data packet / investor briefing
// Requires: Ysabeau Infant (static instances at weights 431/575/647/791)
//           Monaspace Argon (static OTFs)
// Install fonts to your system font directory, then run:
//   typst compile packet.typ

#import "../lib.typ": *

#show: beam-packet.with(
  title: "Sunbeam Compute Platform",
  author: "Sunbeam Studios",
  date: datetime.today(),
)

#packet-cover(
  "Sunbeam Compute Platform",
  subtitle: "Mass Function Activation — powered by mcvi",
  body: [
    The modern mainframe for GPU-native compute: an API gateway, a durable workflow engine, and mcvi — our GPU execution engine — activating isolated functions by the million, on hardware the operator owns.
  ],
  label: "Sunbeam Studios",
  date: "Investor Briefing · 2026",
)

= The Problem

Serverless computing made it easy to run code without managing servers. You pay only for what you use, by the second. But that model breaks down the moment your workload needs a GPU.

Today, GPU workloads face a hard choice. You can reserve a whole GPU and pay for it continuously, even when idle. You can share a GPU through time-slicing and accept weak isolation. You can lock yourself into fixed hardware partitions that cannot scale. Or you can accept the minute-scale spin-up times of virtual-machine-based sharing.

#packet-callout(label: "The Core Imbalance")[
  The GPU is the scarcest, most expensive resource in a modern fleet — and it's the one resource serverless was never built to touch.
]

= Why Now

Three shifts had to happen together. Now they have.

Lightweight isolation is fast enough now. Sandbox startup times have dropped into single-digit milliseconds — fast enough to spin up a fully isolated environment for a single function call, not just a long-running server.

Modern chip architectures make strong isolation practical. Newer processor architectures let us enforce strict boundaries around what each function can do, without the heavy performance cost that used to make this impractical.

GPU compute has standardized. The two most widely used GPU compute frameworks now both run on the same open, cross-platform graphics API. GPU virtualization is now a well-scoped software problem, not a hardware science project.

= The Product

The Sunbeam Compute Platform has three pillars.

*API Gateway.* HTTP ingress, routing, auth, rate limiting, and TLS termination. It is already in production at Sunbeam.

*Workflow Engine.* Durable multi-step orchestration with retries, fan-out, timers, and saga compensation. Also in production at Sunbeam.

*Execution Engine.* Fast, isolated sandboxes for individual function runs, with GPU access built in from the ground up. This is mcvi, currently in development.

Two of the pillars already carry real traffic today. This is the integration of two proven, production systems with a new compute substrate — not a greenfield platform bet.

= The Technology

mcvi runs each activation in its own lightweight, sandboxed environment. The sandbox is created fast enough to use per function call, not just per long-running server. If one activation is compromised, it cannot reach another tenant's data or code.

Instead of handing out whole GPUs, mcvi lets many isolated activations share one physical GPU. Each activation gets its own bounded slice of memory, enforced automatically. No tenant can see or touch another's data.

The key numbers are simple: one to two milliseconds to create an isolated environment, sub-five-millisecond warm starts end to end, and zero cross-tenant escapes tracked as a hard gate before general availability.

= Positioning

#packet-table(
  (1.3fr, 1.4fr, 1.4fr, 0.7fr),
  ("Mechanism", "Isolation", "Billing Granularity", "Elastic?"),
  ("Whole-GPU assignment", "Real", "Device-hour", "No"),
  ("Time-slicing / MPS", "None (perf. feature)", "Device-hour", "Yes"),
  ("MIG partitions", "Hardware", "Static partition", "No"),
  ("vGPU / SR-IOV", "VM-level", "VM-minute", "Limited"),
  ("mcvi", "Hardware, per-activation", "GPU-second", "Yes"),
  highlight: 4,
)

#text(size: packet-size-sm, fill: packet-text-secondary)[#emph[
  The pattern across every existing approach: isolation and billing are tied to the device or the machine — never to the individual function call. mcvi is the first to tie both to the activation itself.
]]

= Business Model

mcvi is offered in three tiers.

*mcvi dev* is free and runs on a single node. It is the adoption engine — the individual developer becomes the on-prem champion.

*mcvi on-prem* is a capacity license for a licensed cluster, air-gap ready. It is aimed at the platform team with GPU hardware that wants sovereignty without cloud GPU pricing.

*mcvi hosted* is metered usage on our infrastructure. It offers the capability without the metal, billed in GB-seconds and GPU-seconds.

Billable units are GB-seconds — memory times duration — and GPU-seconds, the compute time held. You pay for the slice you held, never for idle silicon. Running work is never killed over licensing.

= Roadmap

The roadmap is expressed as dependencies, not dates.

+ Rust-only API gateway plus Lambda-equivalent.
+ Python and Node language expansion.
+ GPU compute — v1 GA. GPU support is ship-blocking.
+ Hosted, multi-tenant operations.

GPU support has one clear, binary bar to clear before it ships. Alongside it, startup speed must hold up under production-like load, real-world workloads must run unmodified, and independent security testing must find zero cross-tenant breaches.

= The Team

Sunbeam Studios is led by three founders.

*Sienna Meridian Satterwhite*, Studio Head and Principal Engineer, architected Sunbeam Proxy, the detection pipeline, and mcvi's isolation core, and authored the formal verification proofs.

*Lonni Faber*, Head of Production, runs investor relations, go-to-market strategy, documentation, and operational cadence.

*Tony McKenzie*, Head of Engineering, leads deployment infrastructure and engineering operations across the platform.

= The Ask

We are raising to fund the engineering program through v1 GA — bringing GPU support, language runtimes, and cluster scheduling to production maturity. Two of the Sunbeam Compute Platform's three pillars already carry real production traffic today; this raise funds mcvi, our GPU execution engine, through general availability.

For more information, contact Sunbeam Studios at #link("mailto:hello@sunbeam.pt")[hello\@sunbeam.pt].
