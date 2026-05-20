import { type ReactNode } from "react";
import {
  ClipboardRoot,
  ClipboardTrigger,
  ClipboardControl,
  ClipboardIndicator,
} from "@ark-ui/react/clipboard";
import { css } from "styled-system/css";
import { Icon } from "./icon.tsx";

/** Props for {@link Clipboard}. */
interface ClipboardProps {
  /** Text to copy to clipboard when triggered. */
  value: string;
  /** Custom trigger element (e.g., button or icon). If omitted, renders a default "Copy" button. */
  children?: ReactNode;
  /** Duration (ms) to show "Copied!" feedback. Defaults to 2000. */
  timeout?: number;
}

/**
 * Copy-to-clipboard button with visual feedback.
 *
 * Wraps ark-ui's Clipboard component. Shows "Copy" with icon by default, or renders
 * custom children as the trigger. Displays "Copied!" checkmark for the specified timeout.
 *
 * @example
 * ```tsx
 * <Clipboard value="npm install @sunbeam/beam-ui" />
 * <Clipboard value="token123" timeout={1500}>
 *   <button>Copy Token</button>
 * </Clipboard>
 * ```
 */
export function Clipboard({ value, children, timeout = 2000 }: ClipboardProps): ReactNode {
  return (
    <ClipboardRoot value={value} timeout={timeout}>
      {children ? (
        <ClipboardTrigger asChild>{children}</ClipboardTrigger>
      ) : (
        <ClipboardControl className={control}>
          <ClipboardTrigger className={trigger}>
            <ClipboardIndicator
              className={indicator}
              copied={
                <>
                  <Icon name="check" size={16} />
                  <span>Copied!</span>
                </>
              }
            >
              <Icon name="content_copy" size={16} />
              <span>Copy</span>
            </ClipboardIndicator>
          </ClipboardTrigger>
        </ClipboardControl>
      )}
    </ClipboardRoot>
  );
}

const indicator = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
});

const control = css({
  display: "inline-flex",
});

const trigger = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 14px",
  fontSize: "13px",
  fontFamily: "body",
  fontWeight: "button",
  color: "text.primary",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _hover: {
    borderColor: "sunbeam.orange",
    color: "sunbeam.orange",
  },
});
