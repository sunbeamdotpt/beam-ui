import { useState, useRef, useCallback, type DragEvent } from "react";
import { css, cx } from "styled-system/css";
import { Icon } from "./icon";

interface FileUploadProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  className,
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const arr = Array.from(files);
      setFileCount(arr.length);
      onFiles(arr);
    },
    [onFiles]
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (!disabled) setDragOver(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  return (
    <div
      className={cx(
        zone,
        dragOver ? zoneActive : undefined,
        disabled ? disabledStyle : undefined,
        className
      )}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className={hiddenInput}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Icon name="cloud_upload" size={32} className={icon} />
      <p className={text}>
        {fileCount > 0
          ? `${fileCount} file${fileCount !== 1 ? "s" : ""} selected`
          : "Drag files here or click to browse"}
      </p>
    </div>
  );
}

const zone = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "32px",
  backgroundColor: "bg.page",
  border: "2px dashed",
  borderColor: "border.default",
  cursor: "pointer",
  transition: "all 0.15s ease",
  _hover: {
    borderColor: "sunbeam.orange",
  },
});

const zoneActive = css({
  borderColor: "sunbeam.orange",
  backgroundColor: "rgba(255, 208, 106, 0.1)",
});

const disabledStyle = css({
  opacity: 0.5,
  cursor: "not-allowed",
});

const hiddenInput = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
});

const icon = css({
  color: "sunbeam.orange",
});

const text = css({
  fontSize: "14px",
  fontFamily: "body",
  color: "text.secondary",
  margin: 0,
});
