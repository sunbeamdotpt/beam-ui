import { css } from "styled-system/css";
import { ContextMenu } from "@sunbeam/beam-ui/components/ui/context-menu";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "items", type: "ContextMenuItem[]", required: true, description: "Array of menu items. Each has label, onClick, and optional icon, danger, and divider flags." },
  { name: "children", type: "ReactNode", required: true, description: "The element that triggers the context menu on right-click." },
];

const ITEM_PROPS = [
  { name: "label", type: "string", required: true, description: "Display text for the menu item." },
  { name: "icon", type: "string", required: false, description: "Icon name displayed to the left of the label." },
  { name: "onClick", type: "() => void", required: true, description: "Callback invoked when the item is selected." },
  { name: "danger", type: "boolean", required: false, description: "If true, the item is styled as a destructive action." },
  { name: "divider", type: "boolean", required: false, description: "If true, a separator is rendered above this item." },
];

const sampleItems = [
  { label: "Open", icon: "file_open", onClick: () => {} },
  { label: "Rename", icon: "edit", onClick: () => {} },
  { label: "Download", icon: "download", onClick: () => {} },
  { label: "Delete", icon: "delete", onClick: () => {}, danger: true, divider: true },
];

export function ContextMenuPage() {
  return (
    <ComponentPage
      name="ContextMenu"
      description="A menu that appears on right-click, providing contextual actions for the target element. Supports icons, separators, and danger items."
      importPath='import { ContextMenu } from "@sunbeam/beam-ui"'
    >
      {/* Preview */}
      <SectionHeading id="preview">Preview</SectionHeading>
      <ContextMenu items={sampleItems}>
        <div className={triggerZone}>
          Right-click anywhere in this zone
        </div>
      </ContextMenu>

      {/* Props */}
      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />
      <h3 className={subHeading}>ContextMenuItem</h3>
      <PropsTable props={ITEM_PROPS} />

      {/* Usage */}
      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}ContextMenu{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.keyword}>const</span> items = [{"\n"}
              {"  { "}<span className={syn.prop}>label</span>: <span className={syn.string}>"Open"</span>, <span className={syn.prop}>icon</span>: <span className={syn.string}>"file_open"</span>, <span className={syn.prop}>onClick</span>: handleOpen {"},"}{"\n"}
              {"  { "}<span className={syn.prop}>label</span>: <span className={syn.string}>"Rename"</span>, <span className={syn.prop}>icon</span>: <span className={syn.string}>"edit"</span>, <span className={syn.prop}>onClick</span>: handleRename {"},"}{"\n"}
              {"  { "}<span className={syn.prop}>label</span>: <span className={syn.string}>"Download"</span>, <span className={syn.prop}>icon</span>: <span className={syn.string}>"download"</span>, <span className={syn.prop}>onClick</span>: handleDownload {"},"}{"\n"}
              {"  { "}<span className={syn.prop}>label</span>: <span className={syn.string}>"Delete"</span>, <span className={syn.prop}>danger</span>: <span className={syn.keyword}>true</span>, <span className={syn.prop}>divider</span>: <span className={syn.keyword}>true</span>, <span className={syn.prop}>onClick</span>: handleDelete {"},"}{"\n"}
              ];{"\n"}
              {"\n"}
              {"<"}<span className={syn.fn}>ContextMenu</span> <span className={syn.prop}>items</span>={"{items}"}{">"}{"\n"}
              {"  <div>"}Right-click me{"</div>"}{"\n"}
              {"</"}<span className={syn.fn}>ContextMenu</span>{">"}
            </code></pre>
          ),
        }]}
      />

      {/* Variants */}
      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>With danger item and divider</h3>
        <ContextMenu items={sampleItems}>
          <div className={triggerZoneSmall}>
            Right-click for file actions
          </div>
        </ContextMenu>
      </div>
      <div className={variantBlock}>
        <h3 className={variantLabel}>Simple menu (no icons)</h3>
        <ContextMenu items={[
          { label: "Copy", onClick: () => {} },
          { label: "Paste", onClick: () => {} },
          { label: "Select All", onClick: () => {} },
        ]}>
          <div className={triggerZoneSmall}>
            Right-click for edit actions
          </div>
        </ContextMenu>
      </div>
    </ComponentPage>
  );
}

const triggerZone = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "200px",
  backgroundColor: "bg.card",
  border: "2px dashed",
  borderColor: "border.default",
  color: "text.secondary",
  fontSize: "14px",
  marginBottom: "32px",
  cursor: "context-menu",
});

const triggerZoneSmall = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100px",
  backgroundColor: "bg.card",
  border: "2px dashed",
  borderColor: "border.default",
  color: "text.secondary",
  fontSize: "14px",
  marginBottom: "16px",
  cursor: "context-menu",
});

const subHeading = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
  marginTop: "24px",
});

const variantBlock = css({
  marginBottom: "40px",
});

const variantLabel = css({
  fontSize: "18px",
  fontWeight: "heading",
  color: "text.primary",
  textTransform: "capitalize",
  marginBottom: "12px",
});
