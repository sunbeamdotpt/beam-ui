# FileUpload

> Drag-and-drop file upload zone with accept filter and keyboard support.

> **[View rendered page](https://design.sunbeam.pt/components/file-upload?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { FileUpload } from "@sunbeam/beam-ui/components/ui/file-upload"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onFiles | `(files: File[]) => void` | Yes | File selection handler |
| accept | `string` | No | Accepted MIME types |
| multiple | `boolean` | No | Allow multiple files |
| disabled | `boolean` | No | Disable uploads |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<FileUpload onFiles={handleFiles} accept="image/*" multiple />
```

## Features
- Drag-and-drop zone
- Click to browse
- Keyboard accessible
- File count display

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
