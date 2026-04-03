import { css } from "styled-system/css";
import { DropdownMenu } from "@sunbeam/beam-ui/components/ui/dropdown-menu";
import { Button } from "@sunbeam/beam-ui/components/ui/button";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { ComponentPage, PropsTable, SectionHeading } from "./_template";

const PROPS = [
  { name: "items", type: "DropdownMenuItem[]", required: false, description: "Flat list of menu items." },
  { name: "groups", type: "DropdownMenuGroup[]", required: false, description: "Grouped menu items with optional labels." },
  { name: "children", type: "ReactNode", required: true, description: "The trigger element (usually a button)." },
  { name: "positioning", type: "{ placement?: string }", required: false, description: "Ark UI positioning options." },
];

const ITEM_PROPS = [
  { name: "label", type: "string", required: true, description: "Display text for the menu item." },
  { name: "icon", type: "string", required: false, description: "Material Symbol icon name." },
  { name: "onClick", type: "() => void", required: true, description: "Callback when the item is selected." },
  { name: "danger", type: "boolean", required: false, description: "Styles the item as a destructive action." },
  { name: "disabled", type: "boolean", required: false, description: "Disables the item." },
];

export function DropdownMenuPage() {
  return (
    <ComponentPage
      name="DropdownMenu"
      description="A click-triggered menu for actions or navigation. Supports flat items or grouped sections with labels. Built on Ark UI Menu."
      importPath='import { DropdownMenu } from "@sunbeam/beam-ui"'
    >
      <SectionHeading id="preview">Preview</SectionHeading>
      <div className={previewRow}>
        <DropdownMenu
          items={[
            { label: "New File", icon: "add", onClick: () => {} },
            { label: "Upload", icon: "upload", onClick: () => {} },
            { label: "New Folder", icon: "create_new_folder", onClick: () => {} },
          ]}
        >
          <span><Button variant="ghost">
            Actions <Icon name="expand_more" size={16} />
          </Button></span>
        </DropdownMenu>

        <DropdownMenu
          groups={[
            {
              label: "Account",
              items: [
                { label: "Profile", icon: "person", onClick: () => {} },
                { label: "Settings", icon: "settings", onClick: () => {} },
              ],
            },
            {
              label: "",
              items: [
                { label: "Sign Out", icon: "logout", onClick: () => {}, danger: true },
              ],
            },
          ]}
        >
          <span><Button variant="cream">
            Profile <Icon name="expand_more" size={16} />
          </Button></span>
        </DropdownMenu>
      </div>

      <SectionHeading id="props">Props</SectionHeading>
      <PropsTable props={PROPS} />
      <h3 className={subHeading}>DropdownMenuItem</h3>
      <PropsTable props={ITEM_PROPS} />

      <SectionHeading id="usage">Usage</SectionHeading>
      <CodeBlock
        tabs={[{
          label: "TSX",
          content: (
            <pre><code>
              <span className={syn.keyword}>import</span> {"{ "}DropdownMenu{" }"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/beam-ui"</span>{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Flat items"}</span>{"\n"}
              {"<"}<span className={syn.fn}>DropdownMenu</span> <span className={syn.prop}>items</span>={"{[{ "}label: <span className={syn.string}>"Edit"</span>, onClick: handleEdit {"}]}"}{">"}{"\n"}
              {"  <"}button{">"}Menu{"</"}button{">"}{"\n"}
              {"</"}<span className={syn.fn}>DropdownMenu</span>{">"}{"\n"}
              {"\n"}
              <span className={syn.comment}>{"// Grouped items"}</span>{"\n"}
              {"<"}<span className={syn.fn}>DropdownMenu</span> <span className={syn.prop}>groups</span>={"{["}{"{ "}label: <span className={syn.string}>"File"</span>, items: [...] {"},"}{"{ "}items: [...] {"}]"}{"}"}{"/>"}{"\n"}
            </code></pre>
          ),
        }]}
      />

      <SectionHeading id="variants">Variants</SectionHeading>
      <div className={variantBlock}>
        <h3 className={variantLabel}>With disabled items</h3>
        <DropdownMenu
          items={[
            { label: "Cut", icon: "content_cut", onClick: () => {} },
            { label: "Copy", icon: "content_copy", onClick: () => {} },
            { label: "Paste", icon: "content_paste", onClick: () => {}, disabled: true },
          ]}
        >
          <span><Button variant="ghost">Edit</Button></span>
        </DropdownMenu>
      </div>
    </ComponentPage>
  );
}

const previewRow = css({ display: "flex", flexWrap: "wrap", gap: "16px", padding: "32px", backgroundColor: "bg.card", marginBottom: "32px" });
const subHeading = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", marginBottom: "16px", marginTop: "24px" });
const variantBlock = css({ marginBottom: "40px" });
const variantLabel = css({ fontSize: "18px", fontWeight: "heading", color: "text.primary", textTransform: "capitalize", marginBottom: "12px" });
