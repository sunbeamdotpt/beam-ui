import { StatBar } from "./stat-bar.tsx";

export default function StatBarStory() {
  return (
    <StatBar
      stats={{
        speed: 4,
        performance: 5,
        modalities: ["text", "image"],
        context: "200K",
        priceIn: "$3",
        priceOut: "$15",
      }}
    />
  );
}

export function LowPerformance() {
  return (
    <StatBar
      stats={{
        speed: 5,
        performance: 2,
        modalities: ["text"],
        context: "32K",
        priceIn: "$0.50",
        priceOut: "$1.50",
      }}
    />
  );
}

export function Multimodal() {
  return (
    <StatBar
      stats={{
        speed: 3,
        performance: 5,
        modalities: ["text", "image", "audio", "video"],
        context: "1M",
        priceIn: "$10",
        priceOut: "$30",
      }}
    />
  );
}
