# TagsInput

> Props for {@link TagsInput}. */
export interface TagsInputProps {
  /** Array of tag strings. */
  value: string[];
  /** Called when tags are added or removed with the updated array. */
  onChange: (value: string[]) => void;
  /** Placeholder text for the input. Defaults to `"Add tag..."`. */
  placeholder?: string;
  /** Maximum number of tags allowed. */
  max?: number;
  /** Optional label displayed above the input. */
  label?: string;
}

/** Tag input using Ark UI with search, add/remove, and optional label. Tags are displayed as removable pills; new tags are typed and confirmed via Enter. * @example ```tsx const [tags, setTags] = useState(["react", "typescript"]); <TagsInput value={tags} onChange={setTags} label="Framework tags" max={5} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/tags-input?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { TagsInput } from "@sunbeam/beam-ui/components/ui/tags-input"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string[]` | Yes | Array of tag strings. |
| onChange | `(value: string[]) => void` | Yes | Called when tags are added or removed with the updated array. |
| placeholder | `string` | No | Placeholder text for the input. Defaults to `"Add tag..."`. |
| max | `number` | No | Maximum number of tags allowed. |
| label | `string` | No | Optional label displayed above the input. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
