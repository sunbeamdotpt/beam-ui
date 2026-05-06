import { type ReactNode } from "react";
import { useForm, type UseFormReturn, type FieldValues, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { css } from "styled-system/css";

/**
 * Form validation and submission library.
 *
 * Re-exports from `react-hook-form` and related libraries.
 * Use with {@link Form} component for type-safe forms with Zod schema validation.
 */

/** {@link useForm} from react-hook-form — register fields and handle submission. */
export { useForm } from "react-hook-form";
/** {@link zodResolver} from @hookform/resolvers/zod — integrate Zod schemas with react-hook-form. */
export { zodResolver } from "@hookform/resolvers/zod";
/** {@link z} from zod — runtime schema validation library. */
export { z } from "zod";

/* ------------------------------------------------------------------ */
/* Form wrapper                                                        */
/* ------------------------------------------------------------------ */

/** Props for {@link Form}. */
interface FormProps<T extends FieldValues> {
  /** Zod schema for validation — defines field types and constraints. */
  schema: z.ZodSchema<T>;
  /** Initial field values. */
  defaultValues?: DefaultValues<T>;
  /** Callback invoked with validated form data on successful submit. */
  onSubmit: (data: T) => void | Promise<void>;
  /** Render function receiving react-hook-form methods for field registration. */
  children: (methods: UseFormReturn<T>) => ReactNode;
  /** Optional CSS class for the form element. */
  className?: string;
}

/**
 * Type-safe form wrapper combining react-hook-form with Zod schema validation.
 *
 * Automatically handles validation, error display, and submission.
 * Child function receives react-hook-form methods for field registration.
 *
 * @example
 * ```tsx
 * const schema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8),
 * });
 *
 * <Form schema={schema} defaultValues={{ email: "", password: "" }} onSubmit={handleLogin}>
 *   {(methods) => (
 *     <>
 *       <FormField name="email" label="Email" methods={methods} />
 *       <FormField name="password" label="Password" methods={methods} />
 *       <button type="submit">Sign In</button>
 *     </>
 *   )}
 * </Form>
 * ```
 */
export function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema as any) as any,
    defaultValues,
  });

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit as any)}
      className={className}
      noValidate
    >
      {children(methods)}
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* FormField connector                                                 */
/* ------------------------------------------------------------------ */

/** Props for {@link FormField}. */
interface FormFieldProps {
  /** Field name (must match schema and form data key). */
  name: string;
  /** Optional label text displayed above the input. */
  label?: string;
  /** react-hook-form methods from {@link Form} or `useForm()`. */
  methods: UseFormReturn<any>;
  /** Optional CSS class for the wrapper element. */
  className?: string;
}

/**
 * Input field connector for react-hook-form.
 *
 * Renders a labeled input with automatic error display.
 * Requires a parent {@link Form} component or manual `useForm()` setup.
 *
 * @example
 * ```tsx
 * <Form schema={schema} onSubmit={save}>
 *   {(methods) => (
 *     <>
 *       <FormField name="username" label="Username" methods={methods} />
 *       <FormField name="email" label="Email" methods={methods} />
 *     </>
 *   )}
 * </Form>
 * ```
 */
export function FormField({ name, label, methods, className }: FormFieldProps) {
  const { register, formState: { errors } } = methods;
  const error = errors[name];

  return (
    <div className={className ?? fieldWrapper}>
      {label && <label className={labelStyle} htmlFor={name}>{label}</label>}
      <input
        id={name}
        {...register(name)}
        className={inputStyle}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className={errorStyle}>
          {error.message as string}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const fieldWrapper = css({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "16px",
});

const labelStyle = css({
  fontSize: "13px",
  fontWeight: "button",
  color: "text.primary",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const inputStyle = css({
  padding: "10px 12px",
  fontSize: "14px",
  fontFamily: "body",
  color: "text.primary",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  outline: "none",
  transition: "border-color 0.15s ease",
  _focus: {
    borderColor: "sunbeam.orange",
  },
});

const errorStyle = css({
  fontSize: "12px",
  color: "sunbeam.orange",
  margin: 0,
});
