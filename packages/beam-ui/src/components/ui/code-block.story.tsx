import { CodeBlock, syn } from "./code-block.tsx";

const pythonCode = (
  <pre>
    <span className={syn.keyword}>import</span> anthropic{"\n"}
    {"\n"}
    client = anthropic.<span className={syn.fn}>Anthropic</span>(){"\n"}
    message = client.messages.<span className={syn.fn}>create</span>({"\n"}
        model=<span className={syn.string}>"claude-sonnet-4-20250514"</span>,{"\n"}
        max_tokens=<span className={syn.number}>1024</span>,{"\n"}
        messages=[{"\n"}
            {"{"}<span className={syn.string}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.string}>"content"</span>: <span className={syn.string}>"Hello!"</span>{"}"}{"\n"}
        ],{"\n"}
    ){"\n"}
    <span className={syn.fn}>print</span>(message.content)
  </pre>
);

export default function CodeBlockStory() {
  return (
    <div style={{ maxWidth: 700 }}>
      <CodeBlock
        tabs={[
          { label: "Python", content: pythonCode },
        ]}
      />
    </div>
  );
}

export function MultipleTabs() {
  const tsCode = (
    <pre>
      <span className={syn.keyword}>import</span> Anthropic <span className={syn.keyword}>from</span> <span className={syn.string}>"@anthropic-ai/sdk"</span>;{"\n"}
      {"\n"}
      <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Anthropic</span>();
    </pre>
  );
  return (
    <div style={{ maxWidth: 700 }}>
      <CodeBlock
        tabs={[{ label: "Python", content: pythonCode }, {
          label: "TypeScript",
          content: tsCode,
        }]}
      />
    </div>
  );
}

export function WithStreamToggle() {
  return (
    <div style={{ maxWidth: 700 }}>
      <CodeBlock
        tabs={[{ label: "Python", content: pythonCode }]}
        streamToggle={{
          options: ["Non-streaming", "Streaming"],
          defaultValue: "Non-streaming",
        }}
      />
    </div>
  );
}
