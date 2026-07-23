import { FullwidthLayout } from "./fullwidth-layout.tsx";

export default function FullwidthLayoutStory() {
  return (
    <FullwidthLayout>
      <main>
        <h1>Full-width page</h1>
        <p>This layout renders a single child across the full width.</p>
      </main>
    </FullwidthLayout>
  );
}

export function Standalone() {
  return (
    <FullwidthLayout>
      <main>
        <h1>Full-width page</h1>
        <p>This layout renders a single child across the full width.</p>
      </main>
    </FullwidthLayout>
  );
}
