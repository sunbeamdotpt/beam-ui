import { type ReactNode } from "react";
import { useForm, type UseFormReturn, type FieldValues, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { css } from "styled-system/css";

// Re-exports
export { useForm } from "react-hook-form";
export { zodResolver } from "@hookform/resolvers/zod";
export { z } from "zod";

/* ------------------------------------------------------------------ */
/* Form wrapper                                                        */
/* ------------------------------------------------------------------ */

interface FormProps<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: (methods: UseFormReturn<T>) => ReactNode;
  className?: string;
}

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

interface FormFieldProps {
  name: string;
  label?: string;
  methods: UseFormReturn<any>;
  className?: string;
}

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
