import { type ReactNode } from "react";
import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogTitle,
  DialogCloseTrigger,
} from "@ark-ui/react/dialog";
import { css } from "styled-system/css";
import { Icon } from "./icon.tsx";

/** Props for {@link Dialog}. */
interface DialogProps {
  /** If true, the dialog is visible; if false, it is hidden. */
  open: boolean;
  /** Callback fired when the user closes the dialog (via close button or backdrop click). */
  onClose: () => void;
  /** Title displayed at the top of the dialog. */
  title: string;
  /** Main content of the dialog (typically text, form fields, or other components). */
  children: ReactNode;
  /** Optional action buttons (typically rendered at the bottom right of the dialog). */
  actions?: ReactNode;
}

/**
 * Modal dialog with title, body, and optional action buttons.
 *
 * Renders a centered modal over a semi-transparent backdrop. Supports keyboard escape
 * to close. Integrates with Ark UI's DialogRoot for accessibility.
 *
 * @example
 * ```tsx
 * <Dialog open={show} onClose={() => setShow(false)} title="Confirm Action">
 *   <p>Are you sure?</p>
 *   <div style={{ display: "flex", gap: "8px" }}>
 *     <Button onClick={confirm}>Yes</Button>
 *     <Button variant="ghost" onClick={() => setShow(false)}>Cancel</Button>
 *   </div>
 * </Dialog>
 * ```
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
}: DialogProps): ReactNode {
  return (
    <DialogRoot open={open} onOpenChange={(details) => {
      if (!details.open) onClose();
    }}>
      <DialogBackdrop className={backdrop} />
      <DialogPositioner className={positioner}>
        <DialogContent className={content}>
          <div className={header}>
            <DialogTitle className={titleStyle}>{title}</DialogTitle>
            <DialogCloseTrigger className={closeButton} aria-label="Close dialog">
              <Icon name="close" size={20} />
            </DialogCloseTrigger>
          </div>
          <div className={body}>{children}</div>
          {actions && <div className={actionsBar}>{actions}</div>}
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

const backdrop = css({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(31, 31, 31, 0.6)",
  zIndex: 100,
});

const positioner = css({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 101,
  padding: "16px",
});

const content = css({
  backgroundColor: "bg.page",
  maxWidth: "480px",
  width: "100%",
  shadow: "golden",
  position: "relative",
  outline: "none",
});

const header = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "24px 24px 0",
});

const titleStyle = css({
  fontSize: "24px",
  fontWeight: "heading",
  fontFamily: "heading",
  color: "text.primary",
  margin: 0,
  lineHeight: 1.2,
});

const closeButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  padding: "4px",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});

const body = css({
  padding: "16px 24px 24px",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  lineHeight: 1.5,
});

const actionsBar = css({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",
  padding: "0 24px 24px",
});
