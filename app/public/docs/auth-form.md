# LoginForm

> LoginForm component.

> **[View rendered page](https://design.sunbeam.pt/components/auth-form?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { LoginForm } from "@sunbeam/beam-ui/components/ui/auth-form"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onSubmit | `(username: string, password: string, remember: boolean) => void` | Yes |  |
| oauthProviders | `OAuthProvider[]` | No |  |
| error | `string` | No |  |
| loading | `boolean` | No |  |

## Also Exports
- `SignUpForm`
- `ForgotPasswordForm`
- `TwoFactorForm`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
