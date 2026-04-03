import {
  EditableRoot,
  EditableArea,
  EditableInput,
  EditablePreview,
} from "@ark-ui/react/editable";
import { css, cx } from "styled-system/css";

interface EditableProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Editable({
  value,
  onChange,
  placeholder = "Click to edit...",
  className,
}: EditableProps) {
  return (
    <EditableRoot
      value={value}
      onValueCommit={(details) => onChange(details.value)}
      activationMode="click"
      submitMode="enter"
      className={cx(root, className)}
    >
      <EditableArea className={area}>
        <EditableInput className={input} />
        <EditablePreview className={preview} />
      </EditableArea>
    </EditableRoot>
  );
}

const root = css({
  width: "100%",
});

const area = css({
  width: "100%",
});

const preview = css({
  width: "100%",
  padding: "8px 0",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  cursor: "pointer",
  lineHeight: 1.5,
  _placeholder: {
    color: "text.muted",
  },
});

const input = css({
  width: "100%",
  padding: "8px 12px",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  outline: "none",
  lineHeight: 1.5,
  transition: "all 0.15s ease",
  _focus: {
    ringWidth: "2px",
    ringColor: "sunbeam.orange",
    borderColor: "transparent",
  },
});
