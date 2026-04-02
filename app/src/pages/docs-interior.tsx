import { Link } from "react-router-dom";
import { useEffect } from "react";
import { css } from "styled-system/css";
import { Icon } from "@sunbeam/beam-ui/components/ui/icon";
import { Badge } from "@sunbeam/beam-ui/components/ui/badge";
import { Callout } from "@sunbeam/beam-ui/components/ui/callout";
import { CodeBlock, syn } from "@sunbeam/beam-ui/components/ui/code-block";
import { Breadcrumbs } from "@sunbeam/beam-ui/components/shell/breadcrumbs";
import { useDocsContext } from "@sunbeam/beam-ui/components/layouts/docs-layout";

const TOC_ITEMS = [
  { label: "Overview", id: "overview" },
  { label: "Chat Completion", id: "chat-completion" },
  { label: "Use Chat Completions", id: "use-chat-completions" },
  { label: "Managing Context", id: "managing-context" },
  { label: "Next Steps", id: "next-steps" },
];

export function DocsInteriorPage() {
  const { setToc } = useDocsContext();
  useEffect(() => { setToc(TOC_ITEMS); return () => setToc([]); }, [setToc]);

  return (
    <div>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/docs" },
          { label: "Core Features" },
          { label: "Chat Completions" },
          { label: "Usage" },
        ]}
      />

      {/* Title */}
      <h1 id="overview" className={pageTitle}>Usage</h1>

      {/* Intro */}
      <div className={css({ marginBottom: "48px" })}>
        <p className={introText}>
          The Chat Completions API allows you to generate responses from the Sunbeam
          model using a list of messages. To begin interacting with the service, you
          must first authenticate using your{" "}
          <code className={inlineCode}>api_key</code> and specify the target{" "}
          <code className={inlineCode}>model</code> version.
        </p>
      </div>

      {/* Section badge */}
      <Badge variant="section"><span id="chat-completion">CHAT COMPLETION</span></Badge>

      {/* Use Chat Completions */}
      <section className={css({ marginBottom: "48px" })}>
        <h2 id="use-chat-completions" className={sectionTitle}>Use Chat Completions</h2>
        <p className={bodyText}>
          Interaction with the Chat Completions endpoint is primarily handled via a
          POST request to the{" "}
          <Link to="/docs/chat-completions/usage" className={orangeLink}>
            /v1/chat/completions
          </Link>{" "}
          endpoint. You can pass various parameters including the{" "}
          <code className={inlineCode}>messages</code> array, which contains the
          conversation history.
        </p>

        {/* Code block */}
        <CodeBlock
          streamToggle={{
            options: ["Non-streaming", "Streaming"],
            defaultValue: "Non-streaming",
          }}
          versionToggle={{
            options: ["V2", "V1"],
            defaultValue: "V2",
          }}
          modeToggle={{
            options: ["Synchronous", "Asynchronous"],
            defaultValue: "Synchronous",
          }}
          tabs={[
            {
              label: "Python",
              variants: {
                "Non-streaming|V2|Synchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>Sunbeam</span>({"\n"}
                    {"    "}api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>{"\n"}
                    ){"\n"}
                    {"\n"}
                    response = client.chat.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"    "}model=<span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}messages=[{"\n"}
                    {"        "}{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}{"\n"}
                    {"    "}]{"\n"}
                    ){"\n"}
                    {"\n"}
                    <span className={syn.builtin}>print</span>(response.choices[<span className={syn.number}>0</span>].message.content)
                  </code></pre>
                ),
                "Non-streaming|V2|Asynchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> asyncio{"\n"}
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>AsyncSunbeam</span>({"\n"}
                    {"    "}api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>{"\n"}
                    ){"\n"}
                    {"\n"}
                    <span className={syn.keyword}>async def</span> <span className={syn.fn}>main</span>():{"\n"}
                    {"    "}response = <span className={syn.keyword}>await</span> client.chat.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"        "}model=<span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"        "}messages=[{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}]{"\n"}
                    {"    "}){"\n"}
                    {"    "}<span className={syn.builtin}>print</span>(response.choices[<span className={syn.number}>0</span>].message.content){"\n"}
                    {"\n"}
                    asyncio.<span className={syn.fn}>run</span>(<span className={syn.fn}>main</span>())
                  </code></pre>
                ),
                "Streaming|V2|Synchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>Sunbeam</span>(api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>){"\n"}
                    {"\n"}
                    stream = client.chat.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"    "}model=<span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}messages=[{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}],{"\n"}
                    {"    "}stream=<span className={syn.keyword}>True</span>{"\n"}
                    ){"\n"}
                    {"\n"}
                    <span className={syn.keyword}>for</span> chunk <span className={syn.keyword}>in</span> stream:{"\n"}
                    {"    "}<span className={syn.keyword}>if</span> chunk.choices[<span className={syn.number}>0</span>].delta.content:{"\n"}
                    {"        "}<span className={syn.builtin}>print</span>(chunk.choices[<span className={syn.number}>0</span>].delta.content, end=<span className={syn.string}>""</span>)
                  </code></pre>
                ),
                "Streaming|V2|Asynchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> asyncio{"\n"}
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>AsyncSunbeam</span>(api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>){"\n"}
                    {"\n"}
                    <span className={syn.keyword}>async def</span> <span className={syn.fn}>main</span>():{"\n"}
                    {"    "}stream = <span className={syn.keyword}>await</span> client.chat.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"        "}model=<span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"        "}messages=[{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}],{"\n"}
                    {"        "}stream=<span className={syn.keyword}>True</span>{"\n"}
                    {"    "}){"\n"}
                    {"    "}<span className={syn.keyword}>async for</span> chunk <span className={syn.keyword}>in</span> stream:{"\n"}
                    {"        "}<span className={syn.keyword}>if</span> chunk.choices[<span className={syn.number}>0</span>].delta.content:{"\n"}
                    {"            "}<span className={syn.builtin}>print</span>(chunk.choices[<span className={syn.number}>0</span>].delta.content, end=<span className={syn.string}>""</span>){"\n"}
                    {"\n"}
                    asyncio.<span className={syn.fn}>run</span>(<span className={syn.fn}>main</span>())
                  </code></pre>
                ),
                "Non-streaming|V1|Synchronous": (
                  <pre><code>
                    <span className={syn.comment}># V1 API (deprecated)</span>{"\n"}
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>Sunbeam</span>(api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>){"\n"}
                    {"\n"}
                    response = client.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"    "}model=<span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"    "}prompt=<span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"    "}max_tokens=<span className={syn.number}>256</span>{"\n"}
                    ){"\n"}
                    {"\n"}
                    <span className={syn.builtin}>print</span>(response.text)
                  </code></pre>
                ),
                "Non-streaming|V1|Asynchronous": (
                  <pre><code>
                    <span className={syn.comment}># V1 API (deprecated)</span>{"\n"}
                    <span className={syn.keyword}>import</span> asyncio{"\n"}
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>AsyncSunbeam</span>(api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>){"\n"}
                    {"\n"}
                    <span className={syn.keyword}>async def</span> <span className={syn.fn}>main</span>():{"\n"}
                    {"    "}response = <span className={syn.keyword}>await</span> client.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"        "}model=<span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"        "}prompt=<span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"        "}max_tokens=<span className={syn.number}>256</span>{"\n"}
                    {"    "}){"\n"}
                    {"    "}<span className={syn.builtin}>print</span>(response.text){"\n"}
                    {"\n"}
                    asyncio.<span className={syn.fn}>run</span>(<span className={syn.fn}>main</span>())
                  </code></pre>
                ),
                "Streaming|V1|Synchronous": (
                  <pre><code>
                    <span className={syn.comment}># V1 API (deprecated)</span>{"\n"}
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>Sunbeam</span>(api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>){"\n"}
                    {"\n"}
                    stream = client.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"    "}model=<span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"    "}prompt=<span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"    "}max_tokens=<span className={syn.number}>256</span>,{"\n"}
                    {"    "}stream=<span className={syn.keyword}>True</span>{"\n"}
                    ){"\n"}
                    {"\n"}
                    <span className={syn.keyword}>for</span> chunk <span className={syn.keyword}>in</span> stream:{"\n"}
                    {"    "}<span className={syn.keyword}>if</span> chunk.text:{"\n"}
                    {"        "}<span className={syn.builtin}>print</span>(chunk.text, end=<span className={syn.string}>""</span>)
                  </code></pre>
                ),
                "Streaming|V1|Asynchronous": (
                  <pre><code>
                    <span className={syn.comment}># V1 API (deprecated)</span>{"\n"}
                    <span className={syn.keyword}>import</span> asyncio{"\n"}
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>AsyncSunbeam</span>(api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>){"\n"}
                    {"\n"}
                    <span className={syn.keyword}>async def</span> <span className={syn.fn}>main</span>():{"\n"}
                    {"    "}stream = <span className={syn.keyword}>await</span> client.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"        "}model=<span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"        "}prompt=<span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"        "}max_tokens=<span className={syn.number}>256</span>,{"\n"}
                    {"        "}stream=<span className={syn.keyword}>True</span>{"\n"}
                    {"    "}){"\n"}
                    {"    "}<span className={syn.keyword}>async for</span> chunk <span className={syn.keyword}>in</span> stream:{"\n"}
                    {"        "}<span className={syn.keyword}>if</span> chunk.text:{"\n"}
                    {"            "}<span className={syn.builtin}>print</span>(chunk.text, end=<span className={syn.string}>""</span>){"\n"}
                    {"\n"}
                    asyncio.<span className={syn.fn}>run</span>(<span className={syn.fn}>main</span>())
                  </code></pre>
                ),
                "default": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> sunbeam{"\n"}
                    {"\n"}
                    client = sunbeam.<span className={syn.fn}>Sunbeam</span>(api_key=<span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span>){"\n"}
                    {"\n"}
                    response = client.chat.completions.<span className={syn.fn}>create</span>({"\n"}
                    {"    "}model=<span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}messages=[{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}]{"\n"}
                    ){"\n"}
                    {"\n"}
                    <span className={syn.builtin}>print</span>(response.choices[<span className={syn.number}>0</span>].message.content)
                  </code></pre>
                ),
              },
            },
            {
              label: "TypeScript",
              variants: {
                "Non-streaming|V2|Synchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> response = <span className={syn.keyword}>await</span> client.chat.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"    "}model: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}messages: [{"{"} <span className={syn.prop}>role</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>content</span>: <span className={syn.string}>"Explain tonal depth."</span> {"}"}],{"\n"}
                    {"}"});{"\n"}
                    {"\n"}
                    console.<span className={syn.fn}>log</span>(response.choices[<span className={syn.number}>0</span>].message.content);
                  </code></pre>
                ),
                "Non-streaming|V2|Asynchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    <span className={syn.keyword}>import</span> <span className={syn.keyword}>type</span> {"{"} ChatCompletion {"}"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>async function</span> <span className={syn.fn}>getCompletion</span>(): <span className={syn.builtin}>Promise</span>{"<"}ChatCompletion{">"} {"{"}{"\n"}
                    {"    "}<span className={syn.keyword}>const</span> response = <span className={syn.keyword}>await</span> client.chat.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"        "}model: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"        "}messages: [{"{"} <span className={syn.prop}>role</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>content</span>: <span className={syn.string}>"Explain tonal depth."</span> {"}"}],{"\n"}
                    {"    "}{"}"});{"\n"}
                    {"    "}<span className={syn.keyword}>return</span> response;{"\n"}
                    {"}"}{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> result = <span className={syn.keyword}>await</span> <span className={syn.fn}>getCompletion</span>();{"\n"}
                    console.<span className={syn.fn}>log</span>(result.choices[<span className={syn.number}>0</span>].message.content);
                  </code></pre>
                ),
                "Streaming|V2|Synchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> stream = <span className={syn.keyword}>await</span> client.chat.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"    "}model: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}messages: [{"{"} <span className={syn.prop}>role</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>content</span>: <span className={syn.string}>"Explain tonal depth."</span> {"}"}],{"\n"}
                    {"    "}stream: <span className={syn.keyword}>true</span>,{"\n"}
                    {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>for await</span> (<span className={syn.keyword}>const</span> chunk <span className={syn.keyword}>of</span> stream) {"{"}{"\n"}
                    {"    "}process.stdout.<span className={syn.fn}>write</span>(chunk.choices[<span className={syn.number}>0</span>]?.delta?.content ?? <span className={syn.string}>""</span>);{"\n"}
                    {"}"}
                  </code></pre>
                ),
                "Streaming|V2|Asynchronous": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    <span className={syn.keyword}>import</span> <span className={syn.keyword}>type</span> {"{"} ChatCompletionChunk {"}"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>async function</span>* <span className={syn.fn}>streamCompletion</span>(): <span className={syn.builtin}>AsyncGenerator</span>{"<"}ChatCompletionChunk{">"} {"{"}{"\n"}
                    {"    "}<span className={syn.keyword}>const</span> stream = <span className={syn.keyword}>await</span> client.chat.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"        "}model: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"        "}messages: [{"{"} <span className={syn.prop}>role</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>content</span>: <span className={syn.string}>"Explain tonal depth."</span> {"}"}],{"\n"}
                    {"        "}stream: <span className={syn.keyword}>true</span>,{"\n"}
                    {"    "}{"}"});{"\n"}
                    {"    "}<span className={syn.keyword}>for await</span> (<span className={syn.keyword}>const</span> chunk <span className={syn.keyword}>of</span> stream) {"{"}{"\n"}
                    {"        "}<span className={syn.keyword}>yield</span> chunk;{"\n"}
                    {"    "}{"}"}{"\n"}
                    {"}"}{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>for await</span> (<span className={syn.keyword}>const</span> chunk <span className={syn.keyword}>of</span> <span className={syn.fn}>streamCompletion</span>()) {"{"}{"\n"}
                    {"    "}process.stdout.<span className={syn.fn}>write</span>(chunk.choices[<span className={syn.number}>0</span>]?.delta?.content ?? <span className={syn.string}>""</span>);{"\n"}
                    {"}"}
                  </code></pre>
                ),
                "Non-streaming|V1|Synchronous": (
                  <pre><code>
                    <span className={syn.comment}>{"// V1 API (deprecated)"}</span>{"\n"}
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> response = <span className={syn.keyword}>await</span> client.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"    "}model: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"    "}prompt: <span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"    "}max_tokens: <span className={syn.number}>256</span>,{"\n"}
                    {"}"});{"\n"}
                    {"\n"}
                    console.<span className={syn.fn}>log</span>(response.text);
                  </code></pre>
                ),
                "Non-streaming|V1|Asynchronous": (
                  <pre><code>
                    <span className={syn.comment}>{"// V1 API (deprecated)"}</span>{"\n"}
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    <span className={syn.keyword}>import</span> <span className={syn.keyword}>type</span> {"{"} Completion {"}"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>async function</span> <span className={syn.fn}>getCompletion</span>(): <span className={syn.builtin}>Promise</span>{"<"}Completion{">"} {"{"}{"\n"}
                    {"    "}<span className={syn.keyword}>const</span> response = <span className={syn.keyword}>await</span> client.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"        "}model: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"        "}prompt: <span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"        "}max_tokens: <span className={syn.number}>256</span>,{"\n"}
                    {"    "}{"}"});{"\n"}
                    {"    "}<span className={syn.keyword}>return</span> response;{"\n"}
                    {"}"}{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> result = <span className={syn.keyword}>await</span> <span className={syn.fn}>getCompletion</span>();{"\n"}
                    console.<span className={syn.fn}>log</span>(result.text);
                  </code></pre>
                ),
                "Streaming|V1|Synchronous": (
                  <pre><code>
                    <span className={syn.comment}>{"// V1 API (deprecated)"}</span>{"\n"}
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> stream = <span className={syn.keyword}>await</span> client.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"    "}model: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"    "}prompt: <span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"    "}max_tokens: <span className={syn.number}>256</span>,{"\n"}
                    {"    "}stream: <span className={syn.keyword}>true</span>,{"\n"}
                    {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>for await</span> (<span className={syn.keyword}>const</span> chunk <span className={syn.keyword}>of</span> stream) {"{"}{"\n"}
                    {"    "}process.stdout.<span className={syn.fn}>write</span>(chunk.text ?? <span className={syn.string}>""</span>);{"\n"}
                    {"}"}
                  </code></pre>
                ),
                "Streaming|V1|Asynchronous": (
                  <pre><code>
                    <span className={syn.comment}>{"// V1 API (deprecated)"}</span>{"\n"}
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    <span className={syn.keyword}>import</span> <span className={syn.keyword}>type</span> {"{"} CompletionChunk {"}"} <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>async function</span>* <span className={syn.fn}>streamCompletion</span>(): <span className={syn.builtin}>AsyncGenerator</span>{"<"}CompletionChunk{">"} {"{"}{"\n"}
                    {"    "}<span className={syn.keyword}>const</span> stream = <span className={syn.keyword}>await</span> client.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"        "}model: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"        "}prompt: <span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"        "}max_tokens: <span className={syn.number}>256</span>,{"\n"}
                    {"        "}stream: <span className={syn.keyword}>true</span>,{"\n"}
                    {"    "}{"}"});{"\n"}
                    {"    "}<span className={syn.keyword}>for await</span> (<span className={syn.keyword}>const</span> chunk <span className={syn.keyword}>of</span> stream) {"{"}{"\n"}
                    {"        "}<span className={syn.keyword}>yield</span> chunk;{"\n"}
                    {"    "}{"}"}{"\n"}
                    {"}"}{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>for await</span> (<span className={syn.keyword}>const</span> chunk <span className={syn.keyword}>of</span> <span className={syn.fn}>streamCompletion</span>()) {"{"}{"\n"}
                    {"    "}process.stdout.<span className={syn.fn}>write</span>(chunk.text ?? <span className={syn.string}>""</span>);{"\n"}
                    {"}"}
                  </code></pre>
                ),
                "default": (
                  <pre><code>
                    <span className={syn.keyword}>import</span> Sunbeam <span className={syn.keyword}>from</span> <span className={syn.string}>"@sunbeam/sdk"</span>;{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> client = <span className={syn.keyword}>new</span> <span className={syn.fn}>Sunbeam</span>({"{"} apiKey: <span className={syn.string}>"SB_STUDIO_ALPHA_X72"</span> {"}"});{"\n"}
                    {"\n"}
                    <span className={syn.keyword}>const</span> response = <span className={syn.keyword}>await</span> client.chat.completions.<span className={syn.fn}>create</span>({"{"}{"\n"}
                    {"    "}model: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}messages: [{"{"} <span className={syn.prop}>role</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>content</span>: <span className={syn.string}>"Explain tonal depth."</span> {"}"}],{"\n"}
                    {"}"});{"\n"}
                    {"\n"}
                    console.<span className={syn.fn}>log</span>(response.choices[<span className={syn.number}>0</span>].message.content);
                  </code></pre>
                ),
              },
            },
            {
              label: "cURL",
              variants: {
                "Non-streaming|V2|Synchronous": (
                  <pre><code>
                    curl https://api.sunbeam.studio/v1/chat/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"messages"</span>: [{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}]{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
                "Non-streaming|V2|Asynchronous": (
                  <pre><code>
                    curl https://api.sunbeam.studio/v1/chat/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"messages"</span>: [{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}]{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
                "Streaming|V2|Synchronous": (
                  <pre><code>
                    curl -N https://api.sunbeam.studio/v1/chat/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"messages"</span>: [{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}],{"\n"}
                    {"    "}<span className={syn.prop}>"stream"</span>: <span className={syn.keyword}>true</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
                "Streaming|V2|Asynchronous": (
                  <pre><code>
                    curl -N https://api.sunbeam.studio/v1/chat/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"messages"</span>: [{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}],{"\n"}
                    {"    "}<span className={syn.prop}>"stream"</span>: <span className={syn.keyword}>true</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
                "Non-streaming|V1|Synchronous": (
                  <pre><code>
                    <span className={syn.comment}># V1 API (deprecated)</span>{"\n"}
                    curl https://api.sunbeam.studio/v1/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"prompt"</span>: <span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"max_tokens"</span>: <span className={syn.number}>256</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
                "Non-streaming|V1|Asynchronous": (
                  <pre><code>
                    <span className={syn.comment}># V1 API (deprecated)</span>{"\n"}
                    curl https://api.sunbeam.studio/v1/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"prompt"</span>: <span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"max_tokens"</span>: <span className={syn.number}>256</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
                "Streaming|V1|Synchronous": (
                  <pre><code>
                    <span className={syn.comment}># V1 API (deprecated)</span>{"\n"}
                    curl -N https://api.sunbeam.studio/v1/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"prompt"</span>: <span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"max_tokens"</span>: <span className={syn.number}>256</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"stream"</span>: <span className={syn.keyword}>true</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
                "Streaming|V1|Asynchronous": (
                  <pre><code>
                    <span className={syn.comment}># V1 API (deprecated)</span>{"\n"}
                    curl -N https://api.sunbeam.studio/v1/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"prompt"</span>: <span className={syn.string}>"Explain the concept of tonal depth."</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"max_tokens"</span>: <span className={syn.number}>256</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"stream"</span>: <span className={syn.keyword}>true</span>{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
                "default": (
                  <pre><code>
                    curl https://api.sunbeam.studio/v1/chat/completions \{"\n"}
                    {"  "}-H <span className={syn.string}>"Authorization: Bearer SB_STUDIO_ALPHA_X72"</span> \{"\n"}
                    {"  "}-H <span className={syn.string}>"Content-Type: application/json"</span> \{"\n"}
                    {"  "}-d <span className={syn.string}>{"'"}{"\n"}
                    {"  "}{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"messages"</span>: [{"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"user"</span>, <span className={syn.prop}>"content"</span>: <span className={syn.string}>"Explain tonal depth."</span>{"}"}]{"\n"}
                    {"  "}{"}"}{"\n"}
                    {"  "}{"'"}</span>
                  </code></pre>
                ),
              },
            },
            {
              label: "Output",
              variants: {
                "Non-streaming|V2|Synchronous": (
                  <pre><code>
                    {"{"}{"\n"}
                    {"  "}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"choices"</span>: [{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"index"</span>: <span className={syn.number}>0</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"message"</span>: {"{"}{"\n"}
                    {"      "}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"assistant"</span>,{"\n"}
                    {"      "}<span className={syn.prop}>"content"</span>: <span className={syn.string}>"Tonal depth refers to the range and richness..."</span>{"\n"}
                    {"    "}{"}"},{"\n"}
                    {"    "}<span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"\n"}
                    {"  "}{"}"}],{"\n"}
                    {"  "}<span className={syn.prop}>"usage"</span>: {"{"} <span className={syn.prop}>"prompt_tokens"</span>: <span className={syn.number}>14</span>, <span className={syn.prop}>"completion_tokens"</span>: <span className={syn.number}>128</span>, <span className={syn.prop}>"total_tokens"</span>: <span className={syn.number}>142</span> {"}"}{"\n"}
                    {"}"}
                  </code></pre>
                ),
                "Non-streaming|V2|Asynchronous": (
                  <pre><code>
                    {"{"}{"\n"}
                    {"  "}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"choices"</span>: [{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"index"</span>: <span className={syn.number}>0</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"message"</span>: {"{"}{"\n"}
                    {"      "}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"assistant"</span>,{"\n"}
                    {"      "}<span className={syn.prop}>"content"</span>: <span className={syn.string}>"Tonal depth refers to the range and richness..."</span>{"\n"}
                    {"    "}{"}"},{"\n"}
                    {"    "}<span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"\n"}
                    {"  "}{"}"}],{"\n"}
                    {"  "}<span className={syn.prop}>"usage"</span>: {"{"} <span className={syn.prop}>"prompt_tokens"</span>: <span className={syn.number}>14</span>, <span className={syn.prop}>"completion_tokens"</span>: <span className={syn.number}>128</span>, <span className={syn.prop}>"total_tokens"</span>: <span className={syn.number}>142</span> {"}"}{"\n"}
                    {"}"}
                  </code></pre>
                ),
                "Streaming|V2|Synchronous": (
                  <pre><code>
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"assistant"</span>{"}"}]{"}"}{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{"}<span className={syn.prop}>"content"</span>: <span className={syn.string}>"Tonal"</span>{"}"}]{"}"}{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{"}<span className={syn.prop}>"content"</span>: <span className={syn.string}>" depth"</span>{"}"}]{"}"}{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{"}<span className={syn.prop}>"content"</span>: <span className={syn.string}>" refers"</span>{"}"}]{"}"}{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{}"}, <span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: [DONE]
                  </code></pre>
                ),
                "Streaming|V2|Asynchronous": (
                  <pre><code>
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{"}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"assistant"</span>{"}"}]{"}"}{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{"}<span className={syn.prop}>"content"</span>: <span className={syn.string}>"Tonal"</span>{"}"}]{"}"}{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{"}<span className={syn.prop}>"content"</span>: <span className={syn.string}>" depth"</span>{"}"}]{"}"}{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{"}<span className={syn.prop}>"content"</span>: <span className={syn.string}>" refers"</span>{"}"}]{"}"}{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"delta"</span>: {"{}"}, <span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: [DONE]
                  </code></pre>
                ),
                "Non-streaming|V1|Synchronous": (
                  <pre><code>
                    {"{"}{"\n"}
                    {"  "}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"choices"</span>: [{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"index"</span>: <span className={syn.number}>0</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"text"</span>: <span className={syn.string}>"Tonal depth refers to the range and richness of tonal values..."</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"\n"}
                    {"  "}{"}"}],{"\n"}
                    {"  "}<span className={syn.prop}>"usage"</span>: {"{"} <span className={syn.prop}>"prompt_tokens"</span>: <span className={syn.number}>8</span>, <span className={syn.prop}>"completion_tokens"</span>: <span className={syn.number}>96</span>, <span className={syn.prop}>"total_tokens"</span>: <span className={syn.number}>104</span> {"}"}{"\n"}
                    {"}"}
                  </code></pre>
                ),
                "Non-streaming|V1|Asynchronous": (
                  <pre><code>
                    {"{"}{"\n"}
                    {"  "}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-3-classic"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"choices"</span>: [{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"index"</span>: <span className={syn.number}>0</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"text"</span>: <span className={syn.string}>"Tonal depth refers to the range and richness of tonal values..."</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"\n"}
                    {"  "}{"}"}],{"\n"}
                    {"  "}<span className={syn.prop}>"usage"</span>: {"{"} <span className={syn.prop}>"prompt_tokens"</span>: <span className={syn.number}>8</span>, <span className={syn.prop}>"completion_tokens"</span>: <span className={syn.number}>96</span>, <span className={syn.prop}>"total_tokens"</span>: <span className={syn.number}>104</span> {"}"}{"\n"}
                    {"}"}
                  </code></pre>
                ),
                "Streaming|V1|Synchronous": (
                  <pre><code>
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>"Tonal"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>" depth"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>" refers"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>" to"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>""</span>, <span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: [DONE]
                  </code></pre>
                ),
                "Streaming|V1|Asynchronous": (
                  <pre><code>
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>"Tonal"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>" depth"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>" refers"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>" to"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: {"{"}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"cmpl-sb3c-def456"</span>, <span className={syn.prop}>"object"</span>: <span className={syn.string}>"text_completion.chunk"</span>, <span className={syn.prop}>"choices"</span>: [{"{"}<span className={syn.prop}>"text"</span>: <span className={syn.string}>""</span>, <span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"}"}]{"}"}{"\n"}
                    {"\n"}
                    data: [DONE]
                  </code></pre>
                ),
                "default": (
                  <pre><code>
                    {"{"}{"\n"}
                    {"  "}<span className={syn.prop}>"id"</span>: <span className={syn.string}>"chatcmpl-sb4r-abc123"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"object"</span>: <span className={syn.string}>"chat.completion"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"model"</span>: <span className={syn.string}>"sunbeam-4-radiant"</span>,{"\n"}
                    {"  "}<span className={syn.prop}>"choices"</span>: [{"{"}{"\n"}
                    {"    "}<span className={syn.prop}>"index"</span>: <span className={syn.number}>0</span>,{"\n"}
                    {"    "}<span className={syn.prop}>"message"</span>: {"{"}{"\n"}
                    {"      "}<span className={syn.prop}>"role"</span>: <span className={syn.string}>"assistant"</span>,{"\n"}
                    {"      "}<span className={syn.prop}>"content"</span>: <span className={syn.string}>"Tonal depth refers to the range and richness..."</span>{"\n"}
                    {"    "}{"}"},{"\n"}
                    {"    "}<span className={syn.prop}>"finish_reason"</span>: <span className={syn.string}>"stop"</span>{"\n"}
                    {"  "}{"}"}],{"\n"}
                    {"  "}<span className={syn.prop}>"usage"</span>: {"{"} <span className={syn.prop}>"prompt_tokens"</span>: <span className={syn.number}>14</span>, <span className={syn.prop}>"completion_tokens"</span>: <span className={syn.number}>128</span>, <span className={syn.prop}>"total_tokens"</span>: <span className={syn.number}>142</span> {"}"}{"\n"}
                    {"}"}
                  </code></pre>
                ),
              },
            },
          ]}
        />
      </section>

      {/* Managing Context */}
      <section className={css({ marginBottom: "48px" })}>
        <h3 id="managing-context" className={subTitle}>Managing Context</h3>
        <p className={bodyText}>
          The model maintains no state between requests. You must include the full
          conversation history in each request to provide context. The{" "}
          <code className={inlineCode}>max_tokens</code> parameter can be used to
          limit the length of the response, while{" "}
          <code className={inlineCode}>temperature</code> controls the randomness of
          the output.
        </p>

        <Callout variant="tip">
          For technical documentation, we recommend a temperature of 0.2 to ensure
          precise and factual responses.
        </Callout>
      </section>

      {/* Next Steps */}
      <section id="next-steps" className={css({ marginBottom: "64px" })}>
        <Badge variant="section">NEXT STEPS</Badge>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          })}
        >
          <NextStepCard
            title="Structured JSON Outputs"
            description="Learn how to get structured data from the API."
            href="/docs/chat-completions/usage"
          />
          <NextStepCard
            title="Customizing Solar Models"
            description="Fine-tune models for your specific use case."
            href="/docs/chat-completions/usage"
          />
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Next Step Card                                                      */
/* ------------------------------------------------------------------ */
function NextStepCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className={css({
        display: "block",
        padding: "24px",
        backgroundColor: "bg.card",
        borderRadius: "0",
        textDecoration: "none",
        transition: "all 0.2s ease",
        shadow: "golden",
        _hover: { translateY: "-1px" },
      })}
    >
      <h4
        className={css({
          fontWeight: "button",
          fontSize: "16px",
          color: "text.primary",
          marginBottom: "8px",
        })}
      >
        {title}
      </h4>
      <p
        className={css({
          fontSize: "14px",
          color: "text.secondary",
          lineHeight: 1.5,
          marginBottom: "12px",
        })}
      >
        {description}
      </p>
      <span
        className={css({
          color: "sunbeam.orange",
          fontWeight: "button",
          fontSize: "13px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        })}
      >
        Read more <Icon name="arrow_forward" size={14} />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const pageTitle = css({
  fontSize: "36px",
  fontWeight: "heading",
  color: "text.primary",
  letterSpacing: "-0.02em",
  marginBottom: "24px",
});

const introText = css({
  fontSize: "18px",
  lineHeight: 1.7,
  color: "text.secondary",
});

const sectionTitle = css({
  fontSize: "28px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
});

const subTitle = css({
  fontSize: "24px",
  fontWeight: "heading",
  color: "text.primary",
  marginBottom: "16px",
});

const bodyText = css({
  color: "text.secondary",
  lineHeight: 1.7,
  marginBottom: "24px",
});

const inlineCode = css({
  backgroundColor: "bg.card",
  padding: "2px 8px",
  borderRadius: "md",
  fontFamily: "mono",
  fontSize: "14px",
  color: "text.primary",
  fontWeight: "heading",
  border: "1px solid",
  borderColor: "border.default",
});

const orangeLink = css({
  color: "sunbeam.orange",
  fontWeight: "body",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
  textDecorationColor: "rgba(250, 82, 15, 0.3)",
  _hover: { textDecorationColor: "sunbeam.orange" },
});
