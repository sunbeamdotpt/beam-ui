import { useState } from "react";
import { css } from "styled-system/css";
import { DiffViewer, parseDiff } from "@sunbeam/beam-ui/components/ui/diff-viewer";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

/* ------------------------------------------------------------------ */
/* Sample diff content                                                 */
/* ------------------------------------------------------------------ */

const SAMPLE_DIFF = `@@ -1,18 +1,21 @@
 import { useState, useEffect } from "react";
-import { fetchUsers } from "./api";
+import { fetchUsers, fetchUserById } from "./api";
+import { logger } from "./utils/logger";

-function getActiveUsers(users) {
-  return users.filter(u => u.active);
+function getVerifiedUsers(users) {
+  return users.filter(u => u.active && u.verified);
 }

-export function UserList() {
+export function UserList({ showCount = true }) {
   const [users, setUsers] = useState([]);
+  const [loading, setLoading] = useState(true);

   useEffect(() => {
-    fetchUsers().then(data => {
-      setUsers(getActiveUsers(data));
+    fetchUsers().then((data) => {
+      setUsers(getVerifiedUsers(data));
+      logger.info(\`Loaded \${data.length} users\`);
+      setLoading(false);
     });
   }, []);

-  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
+  if (loading) return <p>Loading...</p>;
+  return (
+    <div>
+      {showCount && <p>{users.length} users</p>}
+      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
+    </div>
+  );
 }`;

const sampleHunks = parseDiff(SAMPLE_DIFF);

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */

const PROPS = [
  { name: "hunks", type: "DiffHunk[]", required: true, description: "Array of diff hunks, each containing a header and lines." },
  { name: "oldFileName", type: "string", required: false, description: "Original file name displayed in the header bar." },
  { name: "newFileName", type: "string", required: false, description: "New file name displayed in the header bar." },
  { name: "mode", type: '"unified" | "split"', required: false, description: 'Display mode. Defaults to "unified".' },
  { name: "className", type: "string", required: false, description: "Additional CSS class names." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function DiffViewerPage() {
  const [mode, setMode] = useState<"unified" | "split">("unified");

  return (
    <ComponentPage
      name="DiffViewer"
      description="Side-by-side and unified diff display for code changes. Includes a parseDiff utility to convert standard unified diff text into structured hunks."
      importPath='import { DiffViewer, parseDiff } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>

      <div className={modeToggleWrap}>
        <button
          className={mode === "unified" ? modeActive : modeInactive}
          onClick={() => setMode("unified")}
        >
          Unified
        </button>
        <button
          className={mode === "split" ? modeActive : modeInactive}
          onClick={() => setMode("split")}
        >
          Split
        </button>
      </div>

      <div className={previewArea}>
        <DiffViewer
          hunks={sampleHunks}
          oldFileName="src/components/UserList.jsx"
          newFileName="src/components/UserList.jsx"
          mode={mode}
        />
      </div>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}DiffViewer, parseDiff{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> diffText = <span className={syn.string}>`@@ -1,5 +1,6 @@\n-old line\n+new line\n context`</span>{"\n"}
              <span className={syn.keyword}>const</span> hunks = <span className={syn.fn}>parseDiff</span>(diffText){"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>DiffViewer</span>{"\n"}
              {"  "}<span className={syn.prop}>hunks</span>={"{"}hunks{"}"}{"\n"}
              {"  "}<span className={syn.prop}>oldFileName</span>=<span className={syn.string}>"utils.ts"</span>{"\n"}
              {"  "}<span className={syn.prop}>newFileName</span>=<span className={syn.string}>"utils.ts"</span>{"\n"}
              {"  "}<span className={syn.prop}>mode</span>=<span className={syn.string}>"unified"</span>{"\n"}
              {"/>"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>

      <h3 className={variantLabel}>File rename</h3>
      <p className={bodyText}>When old and new file names differ, the header shows both with an arrow.</p>
      <div className={previewArea}>
        <DiffViewer
          hunks={parseDiff(`@@ -1,3 +1,3 @@
 export const VERSION = "1.0.0";
-export const NAME = "old-pkg";
+export const NAME = "new-pkg";
 export default {};`)}
          oldFileName="src/config.js"
          newFileName="src/settings.js"
          mode="unified"
        />
      </div>

      <h3 className={variantLabel}>Split mode</h3>
      <p className={bodyText}>
        Split mode shows old and new side by side, with removed lines on the left and added lines on the right.
      </p>
      <div className={previewArea}>
        <DiffViewer
          hunks={sampleHunks}
          oldFileName="src/components/UserList.jsx"
          newFileName="src/components/UserList.jsx"
          mode="split"
        />
      </div>
    </ComponentPage>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const previewArea = css({
  marginBottom: "32px",
  overflowX: "auto",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const variantLabel = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "12px",
  marginTop: "32px",
});

const modeToggleWrap = css({
  display: "flex",
  gap: "4px",
  marginBottom: "16px",
  backgroundColor: "bg.card",
  borderRadius: "md",
  padding: "4px",
  width: "fit-content",
  border: "1px solid",
  borderColor: "border.default",
});

const modeBase = css({
  padding: "6px 16px",
  fontSize: "12px",
  fontWeight: "button",
  fontFamily: "body",
  borderRadius: "md",
  border: "none",
  cursor: "pointer",
  transition: "all 0.15s ease",
});

const modeActive = `${modeBase} ${css({
  backgroundColor: "text.primary",
  color: "bg.page",
})}`;

const modeInactive = `${modeBase} ${css({
  backgroundColor: "transparent",
  color: "text.muted",
  _hover: { color: "text.primary" },
})}`;
