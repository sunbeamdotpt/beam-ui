# FileUpload

> Props for {@link FileUpload}. */
export interface FileUploadProps {
  /** Callback fired when the user selects or drops files; receives an array of File objects. */
  onFiles: (files: File[]) => void;
  /** MIME type or file extension filter (e.g., `"image/*"`, `".pdf,.docx"`). */
  accept?: string;
  /** If true, multiple files can be selected at once. If false, only one file at a time. Defaults to false. */
  multiple?: boolean;
  /** If true, the upload zone is disabled and cannot accept files. Defaults to false. */
  disabled?: boolean;
  /** Extra CSS class names to apply to the root container. */
  className?: string;
}

/** Drag-and-drop file upload zone with file list and remove buttons. * Displays a large drop zone with cloud upload icon. Supports drag-and-drop or click-to-browse. Shows uploaded files below the zone with file names, sizes, and remove buttons. Maintains a list of selected files and invokes callback on each change. * @example ```tsx <FileUpload onFiles={setFiles} accept="image/*" multiple /> ```

> **[View rendered page](https://design.sunbeam.pt/components/file-upload?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { FileUpload } from "@sunbeam/beam-ui/components/ui/file-upload"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onFiles | `(files: File[]) => void` | Yes | Callback fired when the user selects or drops files; receives an array of File objects. |
| accept | `string` | No | MIME type or file extension filter (e.g., `"image/*"`, `".pdf,.docx"`). |
| multiple | `boolean` | No | If true, multiple files can be selected at once. If false, only one file at a time. Defaults to false. |
| disabled | `boolean` | No | If true, the upload zone is disabled and cannot accept files. Defaults to false. |
| className | `string` | No | Extra CSS class names to apply to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
