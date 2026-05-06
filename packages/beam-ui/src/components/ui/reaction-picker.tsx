import { type ReactNode } from "react";
import { css, cx } from "styled-system/css";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverCloseTrigger,
} from "@ark-ui/react/popover";

/** A single reaction with count and user toggle state. */
export interface Reaction {
  /** Emoji string. */
  emoji: string;
  /** Number of users who reacted with this emoji. */
  count: number;
  /** Whether the current user has reacted. */
  reacted: boolean;
}

/** Props for {@link ReactionPicker}. */
interface ReactionPickerProps {
  /** Array of existing reactions to display. */
  reactions: Reaction[];
  /** Fired when existing reaction is clicked (toggle on/off). */
  onToggle: (emoji: string) => void;
  /** Fired when a new emoji is selected from the picker. */
  onAdd: (emoji: string) => void;
  /** Additional CSS class. */
  className?: string;
}

const COMMON_EMOJIS = [
  "\u{1F44D}", "\u{1F44E}", "\u{1F604}", "\u{1F389}",
  "\u{1F615}", "\u{2764}\u{FE0F}", "\u{1F680}", "\u{1F440}",
];

/**
 * Reaction picker with existing reactions displayed and popover for adding new ones.
 * Shows common emoji grid (8 selections) in the add popover.
 *
 * @example
 * ```tsx
 * <ReactionPicker
 *   reactions={[{ emoji: "👍", count: 3, reacted: true }]}
 *   onToggle={(emoji) => console.log("Toggle:", emoji)}
 *   onAdd={(emoji) => console.log("Add:", emoji)}
 * />
 * ```
 */
export function ReactionPicker({
  reactions,
  onToggle,
  onAdd,
  className,
}: ReactionPickerProps): ReactNode {
  return (
    <div className={cx(wrapper, className)}>
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          className={cx(
            reactionButton,
            reaction.reacted ? reactionActive : undefined
          )}
          onClick={() => onToggle(reaction.emoji)}
          type="button"
        >
          <span className={emojiSpan}>{reaction.emoji}</span>
          <span className={countSpan}>{reaction.count}</span>
        </button>
      ))}

      <PopoverRoot positioning={{ placement: "bottom-start" }}>
        <PopoverTrigger className={addButton}>
          +
        </PopoverTrigger>
        <PopoverPositioner>
          <PopoverContent className={pickerContent}>
            <div className={pickerHeader}>
              <span className={pickerTitle}>Add reaction</span>
              <PopoverCloseTrigger className={closeBtn}>
                &times;
              </PopoverCloseTrigger>
            </div>
            <div className={emojiGrid}>
              {COMMON_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  className={emojiButton}
                  onClick={() => onAdd(emoji)}
                  type="button"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </PopoverPositioner>
      </PopoverRoot>
    </div>
  );
}

const wrapper = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "6px",
});

const reactionButton = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "4px 10px",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "13px",
  fontFamily: "body",
  color: "text.primary",
  transition: "all 0.15s ease",
  _hover: {
    borderColor: "text.muted",
  },
});

const reactionActive = css({
  borderColor: "sunbeam.orange",
  backgroundColor: "bg.card",
});

const emojiSpan = css({
  fontSize: "15px",
  lineHeight: 1,
});

const countSpan = css({
  fontSize: "12px",
  fontWeight: "button",
  color: "text.secondary",
  fontFamily: "mono",
});

const addButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  backgroundColor: "bg.card",
  border: "1px dashed",
  borderColor: "border.default",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "16px",
  color: "text.muted",
  transition: "all 0.15s ease",
  _hover: {
    borderColor: "sunbeam.orange",
    color: "sunbeam.orange",
  },
});

const pickerContent = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  shadow: "golden",
  padding: "12px",
  zIndex: 50,
  outline: "none",
  minWidth: "200px",
});

const pickerHeader = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "10px",
});

const pickerTitle = css({
  fontSize: "13px",
  fontWeight: "heading",
  fontFamily: "body",
  color: "text.primary",
});

const closeBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.secondary",
  fontSize: "18px",
  lineHeight: 1,
  padding: "2px",
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});

const emojiGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "4px",
});

const emojiButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  fontSize: "20px",
  background: "none",
  border: "1px solid transparent",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _hover: {
    backgroundColor: "bg.card",
    borderColor: "border.default",
  },
});
