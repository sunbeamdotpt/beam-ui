import { EmptyState } from "./empty-state";
import { Button } from "./button";

export default function EmptyStateStory() {
  return (
    <EmptyState
      icon="inbox"
      title="No messages yet"
      description="When you receive new messages, they will appear here. Start a conversation to get going."
      action={<button type="button">Compose message</button>}
    />
  );
}

export function WithoutAction() {
  return <EmptyState icon="search" title="No results found" description="Try adjusting your search terms." />;
}

export function WithoutDescription() {
  return <EmptyState icon="folder_open" title="This folder is empty" />;
}

export function WithButtonAction() {
  return (
    <EmptyState
      icon="deployed_code"
      title="No repositories"
      description="Create your first repository to get started."
      action={<Button variant="primary">New Repository</Button>}
    />
  );
}
