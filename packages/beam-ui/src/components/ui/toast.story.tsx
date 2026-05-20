import { Toast } from "./toast.tsx";

export default function ToastStory() {
  return (
    <div style={{ position: "relative", minHeight: 500 }}>
      <Toast message="Changes saved successfully." variant="success" visible />
    </div>
  );
}

export function SuccessToast() { return <Toast message="Changes saved." variant="success" visible />; }
export function ErrorToast() { return <Toast message="Failed to save changes." variant="error" visible />; }
export function InfoToast() { return <Toast message="A new version is available." variant="info" visible />; }
export function Dismissible() { return <Toast message="Click X to dismiss." variant="info" visible onDismiss={() => {}} />; }
