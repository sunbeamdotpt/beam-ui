/**
 * Kitchen-sink verification page for the Plasmic component registry.
 *
 * Renders every registered Beam UI component with its registered defaults in
 * a single scrollable page. This lets Playwright snapshot the whole registry
 * so default/slot/regression changes show up as diffs.
 *
 * The route lives outside the app Shell, alongside /plasmic-host.
 */
import "../plasmic/registry";
import { Component, type ReactNode } from "react";
import { css } from "styled-system/css";

interface RegistryEntry {
  component: React.ComponentType<any>;
  meta: Record<string, unknown>;
}

const page = css({
  padding: "10",
  backgroundColor: "bg.page",
  color: "text.primary",
  minHeight: "100vh",
});

const heading = css({
  fontSize: "3xl",
  fontWeight: "heading",
  marginBottom: "6",
});

const subhead = css({
  color: "text.secondary",
  marginBottom: "10",
  maxWidth: "96",
});

const item = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  padding: "6",
  borderWidth: "0.25",
  borderStyle: "solid",
  borderColor: "border.default",
  backgroundColor: "bg.card",
});

const itemAttr = { "data-testid": "kitchen-sink-item" };

const itemLabel = css({
  fontSize: "xs",
  fontWeight: "button",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "text.muted",
});

const errorBox = css({
  padding: "4",
  backgroundColor: "sunbeam.black",
  color: "white",
  fontSize: "sm",
  fontFamily: "mono",
});

const stack = css({
  display: "flex",
  flexDirection: "column",
  gap: "6",
});

function getDefaultProps(meta: Record<string, unknown>): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  const propMap = (meta.props ?? {}) as Record<string, Record<string, unknown>>;
  const displayName = String(meta.displayName ?? meta.name ?? "Beam");
  const name = String(meta.name ?? "");

  for (const [key, prop] of Object.entries(propMap)) {
    if (prop.type === "slot") {
      // Slot defaultValues are Plasmic element schemas; our components expect
      // ReactNode. Use a simple text node so the harness stays robust.
      props[key] = <span>{displayName}</span>;
    } else if (prop.defaultValue !== undefined) {
      props[key] = prop.defaultValue;
    }
  }

  // Modals/toasts render portalled overlays that cover the whole kitchen-sink
  // page in a single full-page screenshot. Force them closed here so the
  // harness remains useful; Studio still uses the registered open defaults.
  if (name === "BeamDialog" || name === "BeamWizardModal") {
    props.open = false;
  }
  if (name === "BeamToast") {
    props.visible = false;
  }

  return props;
}

interface ErrorBoundaryProps {
  name: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
}

class ItemErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className={errorBox}>
          {this.props.name}: {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

function RegisteredComponent({ entry }: { entry: RegistryEntry }) {
  const { component: ComponentFn, meta } = entry;
  const name = String((meta as any).displayName ?? (meta as any).name ?? "Unknown");
  const props = getDefaultProps(meta);

  return (
    <div className={item} {...itemAttr}>
      <div className={itemLabel}>{name}</div>
      <ItemErrorBoundary name={name}>
        <ComponentFn {...props} />
      </ItemErrorBoundary>
    </div>
  );
}

export function PlasmicKitchenSinkPage() {
  const registry: RegistryEntry[] =
    (((typeof globalThis !== "undefined" &&
      (globalThis as any).__PlasmicComponentRegistry) as RegistryEntry[] | undefined) ||
      []);

  return (
    <div className={page}>
      <h1 className={heading}>Plasmic component kitchen sink</h1>
      <p className={subhead}>
        Every registered Beam UI component rendered with its registered defaults.
        Errors mean a component needs a curated defaultValue or sample data.
      </p>
      <div className={stack}>
        {registry.map((entry: RegistryEntry, i: number) => (
          <RegisteredComponent key={i} entry={entry} />
        ))}
      </div>
    </div>
  );
}
