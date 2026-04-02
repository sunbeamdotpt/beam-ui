export interface Topic {
  title: string;
  icon: string;
  description: string;
}

export interface Cookbook {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  imageAlt?: string;
}

export const topics: Topic[] = [
  {
    title: "Agents",
    icon: "smart_toy",
    description:
      "Build autonomous entities that can reason and execute tasks within your studio environment.",
  },
  {
    title: "Character Systems",
    icon: "face",
    description:
      "Define complex behavioral trees and personality matrices for dynamic NPC interactions.",
  },
  {
    title: "Procedural Generation",
    icon: "grid_view",
    description:
      "Master the math and logic behind infinite, repeatable, and diverse environment creation.",
  },
  {
    title: "Evaluation",
    icon: "assignment_turned_in",
    description:
      "Frameworks for testing and benchmarking model performance and agent reliability.",
  },
  {
    title: "Scripting",
    icon: "code",
    description:
      "Deep dive into the Sunbeam scripting engine for custom logic and workflow automation.",
  },
  {
    title: "Structured Outputs",
    icon: "database",
    description:
      "Ensuring your models return predictable, machine-readable data for seamless integration.",
  },
  {
    title: "Multiplayer",
    icon: "groups",
    description:
      "Handling state synchronization and collaborative agent environments at scale.",
  },
  {
    title: "Asset Pipeline",
    icon: "rebase_edit",
    description:
      "Optimizing the flow of content from creation to real-time engine deployment.",
  },
  {
    title: "Batch Processing",
    icon: "stacks",
    description:
      "Strategies for large-scale data transformation and asynchronous job management.",
  },
];

export const featuredCookbooks: Cookbook[] = [
  {
    title: "The Complete Guide to Agentic Behavior Trees",
    description:
      "A massive, end-to-end tutorial on building a fully autonomous RPG world where every NPC has its own evolving narrative and goal set.",
    difficulty: "Advanced",
    category: "ULTIMATE GUIDE",
    imageAlt:
      "Abstract architectural visualization with flowing orange and white curves representing complex logic flows.",
  },
  {
    title: "Automating Asset Validation",
    description:
      "Use Python scripts to automatically audit 3D assets for engine compatibility before ingest.",
    difficulty: "Intermediate",
    category: "NEW ARRIVAL",
    imageAlt:
      "Close-up of glowing circuit board patterns with neon orange lights and dark technical aesthetic.",
  },
  {
    title: "Structured Output Masterclass",
    description:
      "How to force models to follow strict JSON schemas for UI generation.",
    difficulty: "Intermediate",
    category: "TUTORIAL",
  },
  {
    title: "Procedural Dungeon Logic",
    description:
      "Building non-repetitive dungeon layouts using cellular automata and WFC.",
    difficulty: "Advanced",
    category: "DEEP DIVE",
  },
];
