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
import { Icon } from "./icon";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
}: DialogProps) {
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
