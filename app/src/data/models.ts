export interface ModelFeature {
  name: string;
  endpoint: string;
  icon: string;
}

export interface ModelStats {
  speed: number;
  performance: number;
  modalities: string[];
  context: string;
  priceIn: string;
  priceOut: string;
}

export interface Model {
  name: string;
  icon: string;
  tier: "premier" | "open";
  version: string;
  description: string;
  stats?: ModelStats;
  features?: ModelFeature[];
}

export const featuredModels: Model[] = [
  {
    name: "Solar Pro 3",
    icon: "lightbulb",
    tier: "premier",
    version: "v26.03",
    description:
      "Our flagship generalist model designed for enterprise reasoning and creative synthesis.",
  },
  {
    name: "Devbeam 2",
    icon: "terminal",
    tier: "premier",
    version: "v2.0.0",
    description:
      "Purpose-built for code generation, architectural analysis, and automated agent workflows.",
  },
  {
    name: "Solar Medium 3.1",
    icon: "layers",
    tier: "premier",
    version: "v26.03",
    description:
      "The multimodal powerhouse. Balances high-fidelity vision processing with rapid text output.",
    stats: {
      speed: 4,
      performance: 5,
      modalities: ["text", "image", "audio"],
      context: "128k",
      priceIn: "$2/M",
      priceOut: "$5/M",
    },
    features: [
      { name: "Chat Completions", endpoint: "/v1/chat/completions", icon: "chat" },
      { name: "Function Calling", endpoint: "/v1/chat/completions", icon: "api" },
      { name: "Agents", endpoint: "/v1/conversations", icon: "smart_toy" },
      { name: "Built-In Tools", endpoint: "/v1/agents", icon: "build" },
      { name: "Structured Outputs", endpoint: "/v1/chat/completions", icon: "schema" },
      { name: "Predicted Outputs", endpoint: "/v1/conversations", icon: "online_prediction" },
      { name: "Prefix", endpoint: "/v1/chat/completions", icon: "keyboard_tab" },
      { name: "OCR", endpoint: "/v1/ocr", icon: "document_scanner" },
      { name: "Document QnA", endpoint: "/v1/chat/completions", icon: "quiz" },
      { name: "Embeddings", endpoint: "/v1/embeddings", icon: "account_tree" },
      { name: "Moderations", endpoint: "/v1/moderations", icon: "gpp_maybe" },
      { name: "Transcriptions", endpoint: "/v1/audio/transcriptions", icon: "audio_file" },
    ],
  },
];

export const generalistModels: Model[] = [
  {
    name: "Sunbeam Ultra",
    icon: "wb_sunny",
    tier: "premier",
    version: "v26.03",
    description: "Top-tier intelligence for complex logic and multi-step reasoning tasks.",
  },
  {
    name: "Sunbeam Lite",
    icon: "cloud_queue",
    tier: "open",
    version: "v24.12",
    description: "Optimized for speed and lightweight tasks.",
  },
  {
    name: "Lumina 4",
    icon: "auto_awesome",
    tier: "premier",
    version: "v26.01",
    description: "Next-gen reasoning engine for agents.",
  },
  {
    name: "Core Data v2",
    icon: "dataset",
    tier: "open",
    version: "v25.08",
    description: "Large context window for document analysis.",
  },
];

export const specialistModels: Model[] = [
  {
    name: "Codex Prime",
    icon: "data_object",
    tier: "premier",
    version: "v1.2.0",
    description: "Pure code generation and refactoring.",
  },
  {
    name: "Lingua v4",
    icon: "translate",
    tier: "open",
    version: "v4.0.0",
    description: "99+ language translation specialist.",
  },
];
