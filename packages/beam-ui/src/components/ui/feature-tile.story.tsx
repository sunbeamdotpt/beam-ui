import { FeatureTile } from "./feature-tile.tsx";

export default function FeatureTileStory() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 200px)",
        gap: 12,
      }}
    >
      <FeatureTile
        name="Completions"
        endpoint="/v1/completions"
        icon="auto_awesome"
      />
      <FeatureTile
        name="Embeddings"
        endpoint="/v1/embeddings"
        icon="data_array"
      />
      <FeatureTile name="Fine-tuning" endpoint="/v1/fine-tuning" icon="tune" />
    </div>
  );
}

export function SingleTile() {
  return <FeatureTile name="Chat" endpoint="/v1/chat" icon="chat" />;
}
