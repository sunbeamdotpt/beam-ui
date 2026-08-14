/**
 * Plasmic app-host page (BEAM-003).
 *
 * Plasmic Studio iframes this route to render artboards with the real
 * beam-ui components. It must render NOTHING but <PlasmicCanvasHost /> —
 * any extra chrome (nav, footer, margins) shows up inside the Studio
 * canvas. The route therefore lives OUTSIDE the app Shell in app.tsx.
 *
 * Component/token registrations happen via the registry side-effect
 * import below; keep that import first.
 */
import "../plasmic/registry";
import "../plasmic/canvas-overrides.css";
import { PlasmicCanvasHost } from "@plasmicapp/react-web/lib/host";
import { useEffect } from "react";

export function PlasmicHostPage() {
  // Beam defaults to dark mode; set the theme attribute on the host iframe
  // document so Panda CSS semantic tokens render with dark values in Studio.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return <PlasmicCanvasHost />;
}
