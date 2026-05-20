import { Dialog } from "./dialog.tsx";
import { Button } from "./button.tsx";

export default function DialogStory() {
  return (
    <div style={{ position: "relative", minHeight: "500px" }}>
      <Dialog
        open={true}
        onClose={() => {}}
        title="Delete Repository"
        actions={
          <>
            <Button variant="ghost" onClick={() => {}}>Cancel</Button>
            <Button variant="primary" onClick={() => {}}>Confirm</Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>sunbeam/beam-ui</strong>? This action cannot be
          undone and all data including issues, pull requests, and wikis will be permanently removed.
        </p>
      </Dialog>
    </div>
  );
}

export function WithoutActions() {
  return (
    <div style={{ position: "relative", minHeight: "500px" }}>
      <Dialog open={true} onClose={() => {}} title="Information">
        <p>This dialog has no action buttons.</p>
      </Dialog>
    </div>
  );
}

export function LongContent() {
  return (
    <div style={{ position: "relative", minHeight: "500px" }}>
      <Dialog open={true} onClose={() => {}} title="Terms of Service" actions={<Button variant="primary" onClick={() => {}}>Accept</Button>}>
        {Array.from({ length: 10 }, (_, i) => <p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraph {i + 1}.</p>)}
      </Dialog>
    </div>
  );
}
