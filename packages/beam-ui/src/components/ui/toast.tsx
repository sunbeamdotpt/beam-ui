import { useEffect } from "react";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  visible: boolean;
  onDismiss?: () => void;
}

export function Toast({
  message,
  variant = "info",
  visible,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    if (!visible || !onDismiss) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [visible, onDismiss]);

  return (
    <div
      className={cx(
        wrapper,
        borderVariants[variant],
        visible ? visibleStyle : hiddenStyle
      )}
    >
      <span className={messageStyle}>{message}</span>
      {onDismiss && (
        <button className={closeBtn} onClick={onDismiss} type="button">
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
}

const wrapper = css({
  position: "fixed",
  bottom: "24px",
  right: "24px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  backgroundColor: "bg.card",
  shadow: "golden",
  borderLeft: "3px solid",
  zIndex: 200,
  maxWidth: "360px",
  transition: "all 0.3s ease",
});

const visibleStyle = css({
  opacity: 1,
  transform: "translateX(0)",
});

const hiddenStyle = css({
  opacity: 0,
  transform: "translateX(100%)",
  pointerEvents: "none",
});

const borderVariants: Record<ToastVariant, string> = {
  success: css({
    borderLeftColor: "sunshine.700",
  }),
  error: css({
    borderLeftColor: "sunbeam.orange",
  }),
  info: css({
    borderLeftColor: "sunshine.300",
  }),
};

const messageStyle = css({
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  flex: 1,
});

const closeBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  padding: "2px",
  flexShrink: 0,
  _hover: {
    color: "sunbeam.orange",
  },
});
