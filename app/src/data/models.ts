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

export type ModelTier =
  | "premier"
  | "open"
  | "beta"
  | "experimental"
  | "new"
  | "stable"
  | "preview"
  
  | "community"
  | "partner"
  | "verified";

export interface Model {
  name: string;
  icon: string;
  tier: ModelTier;
  version: string;
  description: string;
  stats?: ModelStats;
  features?: ModelFeature[];
}

export const featuredModels: Model[] = [
  {
    name: "Solstice 4 Ultra",
    icon: "lightbulb",
    tier: "premier",
    version: "4.0.2",
    description:
      "Frontier reasoning model with 200k context. Built for complex multi-step problem solving, creative synthesis, and large-scale agentic workflows.",
  },
  {
    name: "Ember Code",
    icon: "terminal",
    tier: "new",
    version: "1.5.0",
    description:
      "Purpose-built for code generation, architectural analysis, and automated refactoring across 40+ languages.",
  },
  {
    name: "Solstice 4 Vision",
    icon: "layers",
    tier: "premier",
    version: "4.1.0",
    description:
      "Multimodal powerhouse. Combines high-fidelity vision understanding with rapid text output and function calling.",
    stats: {
      speed: 4,
      performance: 5,
      modalities: ["text", "image", "audio"],
      context: "200k",
      priceIn: "$3/M",
      priceOut: "$8/M",
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
    name: "Solstice 4",
    icon: "wb_sunny",
    tier: "premier",
    version: "4.0.2",
    description: "Flagship generalist with 200k context and state-of-the-art reasoning.",
  },
  {
    name: "Solstice 3.5 Turbo",
    icon: "bolt",
    tier: "stable",
    version: "3.5.4",
    description: "Fast, reliable, cost-effective. The workhorse for production workloads.",
  },
  {
    name: "Daybreak Mini",
    icon: "cloud_queue",
    tier: "open",
    version: "2.1.0",
    description: "Lightweight 7B model. Optimized for edge deployment and low-latency tasks.",
  },
  {
    name: "Daybreak 70B",
    icon: "dataset",
    tier: "community",
    version: "1.0.0",
    description: "Open-weight 70B generalist. Community fine-tuning welcome.",
  },
  {
    name: "Solstice 4 Nano",
    icon: "memory",
    tier: "preview",
    version: "4.0.0-rc1",
    description: "Distilled 3B model from Solstice 4. Mobile and embedded deployments.",
  },
  {
    name: "Aurora Research",
    icon: "science",
    tier: "experimental",
    version: "0.9.0-alpha",
    description: "Experimental research model. Unstable API — for evaluation only.",
  },
];

export const specialistModels: Model[] = [
  {
    name: "Ember Code Plus",
    icon: "data_object",
    tier: "premier",
    version: "1.5.0",
    description: "Advanced code generation with security scanning and compliance checks.",
  },
  {
    name: "Ember Code Lite",
    icon: "code",
    tier: "open",
    version: "1.2.0",
    description: "Open-weight code model. Fast completions for IDE integrations.",
  },
  {
    name: "Lingua Universal",
    icon: "translate",
    tier: "verified",
    version: "3.0.0",
    description: "120+ language translation with dialect awareness and cultural adaptation.",
  },
  {
    name: "Sentinel Guard",
    icon: "shield",
    tier: "verified",
    version: "2.0.0",
    description: "Content moderation and safety classification. SOC 2 certified.",
  },
  {
    name: "Vox Transcribe",
    icon: "mic",
    tier: "beta",
    version: "0.8.0-beta",
    description: "Real-time speech-to-text with speaker diarization. 50+ languages.",
  },
  {
    name: "Canvas Vision",
    icon: "image_search",
    tier: "partner",
    version: "1.1.0",
    description: "Visual understanding for game assets, UI screenshots, and scene analysis.",
  },
];
