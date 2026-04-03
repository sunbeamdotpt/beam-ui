import { useState, useRef, useCallback, type DragEvent, type KeyboardEvent } from "react";
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
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const arr = Array.from(fileList);
      const next = multiple ? [...files, ...arr] : arr;
      setFiles(next);
      onFiles(next);
    },
    [onFiles, files, multiple]
  );

  const removeFile = useCallback(
    (index: number) => {
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
      onFiles(next);
      if (inputRef.current) inputRef.current.value = "";
    },
    [files, onFiles]
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

  return (<>
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
      tabIndex={0}
      role="button"
      aria-label="Upload files"
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
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
        Drag files here or click to browse
      </p>
    </div>
    {files.length > 0 && (
      <div className={fileListStyle}>
        {files.map((f, i) => (
          <div key={`${f.name}-${i}`} className={fileRow}>
            <Icon name="description" size={16} className={fileIcon} />
            <span className={fileName}>{f.name}</span>
            <span className={fileSize}>{formatSize(f.size)}</span>
            <button
              type="button"
              className={removeBtn}
              onClick={() => removeFile(i)}
              aria-label={`Remove ${f.name}`}
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        ))}
      </div>
    )}
    </>
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

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const fileListStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0",
  marginTop: "8px",
  border: "1px solid",
  borderColor: "border.default",
});

const fileRow = css({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 12px",
  borderBottom: "1px solid",
  borderColor: "border.subtle",
  "&:last-child": {
    borderBottom: "none",
  },
});

const fileIcon = css({
  color: "text.muted",
  flexShrink: 0,
});

const fileName = css({
  flex: 1,
  fontSize: "13px",
  fontFamily: "mono",
  color: "text.primary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const fileSize = css({
  fontSize: "12px",
  fontFamily: "mono",
  color: "text.muted",
  flexShrink: 0,
});

const removeBtn = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "text.muted",
  flexShrink: 0,
  transition: "color 0.15s ease",
  _hover: {
    color: "sunbeam.orange",
  },
});
