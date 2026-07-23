# LoginForm

> Props for {@link LoginForm}. */
export interface LoginFormProps {
  /** Called with username, password, and remember-me flag on form submission. */
  onSubmit: (username: string, password: string, remember: boolean) => void;
  /** OAuth provider buttons to display (optional). */
  oauthProviders?: OAuthProvider[];
  /** Error message displayed in a callout (optional). */
  error?: string;
  /** If true, inputs are disabled and submit button shows spinner. Defaults to false. */
  loading?: boolean;
}

/** Login form with username/password fields and optional OAuth providers. * Includes "Remember me" checkbox, links to sign up and forgot password. Shows error callout if provided. * @example ```tsx <LoginForm onSubmit={(u, p, r) => signIn(u, p, r)} oauthProviders={[{ name: "GitHub", icon: "github", onClick: () => signInWithGH() }]} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/auth-form?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { LoginForm } from "@sunbeam/beam-ui/components/ui/auth-form"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onSubmit | `(username: string, password: string, remember: boolean) => void` | Yes | Called with username, password, and remember-me flag on form submission. |
| oauthProviders | `OAuthProvider[]` | No | OAuth provider buttons to display (optional). |
| error | `string` | No | Error message displayed in a callout (optional). |
| loading | `boolean` | No | If true, inputs are disabled and submit button shows spinner. Defaults to false. |

## Also Exports
- `SignUpForm`
- `ForgotPasswordForm`
- `TwoFactorForm`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
