/**
 * Replaces svg-raw text nodes with editable Penpot Text shapes.
 * SVG text imports as path curves — this creates real editable text on top.
 */

export interface TextData {
  text: string;
  x: number;
  y: number;
  fill: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
}

/** Baseline-to-top offset factor per font family */
const BASELINE_FACTORS: Record<string, number> = {
  "Ysabeau Infant": 0.85,
  "Monaspace Argon": 0.80,
};

export function replaceText(
  group: any, // Penpot Group shape
  texts: TextData[],
  penpot: any, // Penpot API
  findShapes: (pred: (s: any) => boolean, root: any) => any[],
) {
  // Hide all svg-raw text nodes
  const svgTexts = findShapes(
    (s: any) => s.name === "svg-text" && s.type === "svg-raw",
    group,
  );
  for (const st of svgTexts) {
    st.hidden = true;
  }

  // Create editable text at matching positions
  const gx = group.x;
  const gy = group.y;

  for (const td of texts) {
    const t = penpot.createText(td.text);
    if (!t) continue;

    t.fontFamily = td.fontFamily;
    t.fontSize = td.fontSize;
    t.fontWeight = td.fontWeight;
    t.fills = [{ fillColor: td.fill, fillOpacity: 1 }];

    if (td.letterSpacing && td.letterSpacing !== "0") {
      t.letterSpacing = td.letterSpacing;
    }

    t.growType = "auto-width";
    t.name = td.text.slice(0, 30);

    // SVG y = baseline, Penpot y = top of bounding box
    const factor = BASELINE_FACTORS[td.fontFamily] ?? 0.85;
    t.x = gx + td.x;
    t.y = gy + td.y - parseInt(td.fontSize) * factor;

    group.appendChild(t);
  }
}
