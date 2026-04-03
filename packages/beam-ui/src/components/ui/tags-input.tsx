import {
  TagsInputRoot,
  TagsInputControl,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputItemDeleteTrigger,
  TagsInputHiddenInput,
  TagsInputLabel,
} from "@ark-ui/react/tags-input";
import { css } from "styled-system/css";

interface TagsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  max?: number;
  label?: string;
}

export function TagsInput({
  value,
  onChange,
  placeholder = "Add tag...",
  max,
  label,
}: TagsInputProps) {
  return (
    <TagsInputRoot
      value={value}
      onValueChange={(details) => onChange(details.value)}
      max={max}
      className={root}
    >
      {label && <TagsInputLabel className={labelStyle}>{label}</TagsInputLabel>}
      <TagsInputControl className={control}>
        {value.map((tag, index) => (
          <TagsInputItem key={index} index={index} value={tag} className={item}>
            <TagsInputItemPreview className={itemPreview}>
              <TagsInputItemText>{tag}</TagsInputItemText>
              <TagsInputItemDeleteTrigger className={deleteTrigger}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 1l8 8M9 1l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </TagsInputItemDeleteTrigger>
            </TagsInputItemPreview>
          </TagsInputItem>
        ))}
        <TagsInputInput className={input} placeholder={placeholder} />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInputRoot>
  );
}

const root = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

const labelStyle = css({
  fontSize: "14px",
  fontWeight: "body",
  color: "text.primary",
  fontFamily: "body",
});

const control = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "6px",
  padding: "6px 8px",
  borderRadius: "md",
  border: "1px solid",
  borderColor: "border.default",
  backgroundColor: "transparent",
  transition: "all 0.15s ease",
  _focusWithin: {
    borderColor: "sunbeam.orange",
    boxShadow: "0 0 0 2px rgba(250, 82, 15, 0.3)",
  },
});

const item = css({
  display: "inline-flex",
});

const itemPreview = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "2px 8px",
  borderRadius: "sm",
  backgroundColor: "sunbeam.orange/10",
  color: "sunbeam.orange",
  fontSize: "13px",
  fontFamily: "body",
  fontWeight: "body",
  lineHeight: 1.4,
});

const deleteTrigger = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "sunbeam.orange",
  opacity: 0.7,
  background: "none",
  border: "none",
  padding: "0 0 0 2px",
  _hover: {
    opacity: 1,
  },
});

const input = css({
  flex: 1,
  minWidth: "80px",
  padding: "4px 0",
  fontSize: "14px",
  fontFamily: "body",
  fontWeight: "body",
  color: "text.primary",
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  _placeholder: {
    color: "text.muted",
  },
});
