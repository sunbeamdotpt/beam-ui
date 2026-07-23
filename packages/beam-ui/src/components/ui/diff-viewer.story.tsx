// @storyName DiffViewer
import { DiffViewer, parseDiff } from "./diff-viewer.tsx";

const rawDiff = `@@ -1,8 +1,10 @@
 import { useState } from "react";
-import { css } from "styled-system/css";
+import { css, cx } from "styled-system/css";
+import { token } from "styled-system/tokens";

 interface ButtonProps {
   children: React.ReactNode;
-  variant?: "primary" | "secondary";
+  variant?: "primary" | "secondary" | "ghost";
+  disabled?: boolean;
   className?: string;
 }`;

const hunks = parseDiff(rawDiff);

export default function DiffViewerStory() {
  return (
    <div style={{ maxWidth: 800 }}>
      <DiffViewer
        hunks={hunks}
        oldFileName="src/components/ui/button.tsx"
        newFileName="src/components/ui/button.tsx"
      />
    </div>
  );
}

export function SplitMode() {
  return (
    <div style={{ maxWidth: 800 }}>
      <DiffViewer hunks={hunks} oldFileName="button.tsx" newFileName="button.tsx" mode="split" />
    </div>
  );
}

export function UnifiedMode() {
  return (
    <div style={{ maxWidth: 800 }}>
      <DiffViewer hunks={hunks} oldFileName="button.tsx" newFileName="button.tsx" mode="unified" />
    </div>
  );
}
