import { MathRenderer } from "./math-renderer.tsx";

export default function MathRendererStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 13, opacity: 0.6 }}>Inline</p>
        <span>
          The quadratic formula is <MathRenderer math="x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" />
          {" "}
          for any quadratic.
        </span>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 13, opacity: 0.6 }}>Display</p>
        <MathRenderer
          math="\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}"
          display
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 13, opacity: 0.6 }}>Matrix</p>
        <MathRenderer
          math="\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}"
          display
        />
      </div>
    </div>
  );
}

export function Inline() {
  return (
    <span>
      Energy equals <MathRenderer math="E = mc^2" /> in special relativity.
    </span>
  );
}

export function DisplayMode() {
  return (
    <MathRenderer
      math="\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}"
      display
    />
  );
}

export function Matrix() {
  return (
    <MathRenderer
      math="\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}"
      display
    />
  );
}
