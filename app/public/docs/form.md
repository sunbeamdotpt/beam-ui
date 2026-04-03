# Form

> Type-safe form wrapper integrating Zod schema validation with React Hook Form.

> **[View rendered page](https://design.sunbeam.pt/components/form?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Form } from "@sunbeam/beam-ui/form"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| schema | `z.ZodSchema<T>` | Yes | Zod validation schema |
| defaultValues | `DefaultValues<T>` | No | Initial form values |
| onSubmit | `(data: T) => void | Promise<void>` | Yes | Validated submit handler |
| children | `(methods: UseFormReturn<T>) => ReactNode` | Yes | Render function receiving form methods |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
import { Form, z } from "@sunbeam/beam-ui/form";

<Form schema={z.object({ name: z.string().min(1) })} onSubmit={handleSubmit}>
  {({ register, formState }) => (
    <>
      <input {...register("name")} />
      <button type="submit">Submit</button>
    </>
  )}
</Form>
```

## Features
- Zod schema validation
- React Hook Form integration
- Type-safe form methods
- Re-exports z, useForm, zodResolver

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
