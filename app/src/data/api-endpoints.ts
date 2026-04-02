export interface EndpointParam {
  name: string;
  type: string;
  typeBadge: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface CodeExample {
  language: string;
  label: string;
  code: string;
}

export interface ResponseExample {
  label: string;
  body: string;
}

export interface EndpointSpec {
  method: string;
  path: string;
  title: string;
  contentType: string;
  params: EndpointParam[];
  codeExamples: CodeExample[];
  responseExamples: ResponseExample[];
}

export const chatCompletionEndpoint: EndpointSpec = {
  method: "POST",
  path: "/v1/chat/completions",
  title: "Chat Completion",
  contentType: "application/json",
  params: [
    {
      name: "frequency_penalty",
      type: "number",
      typeBadge: "number",
      required: false,
      description:
        "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
      defaultValue: "0",
    },
    {
      name: "guardrails",
      type: "array<GuardrailConfig> | null",
      typeBadge: "array | null",
      required: false,
      description:
        "A list of safety guardrails to apply to the completion process.",
    },
    {
      name: "max_tokens",
      type: "integer | null",
      typeBadge: "integer | null",
      required: false,
      description:
        "The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.",
    },
    {
      name: "messages",
      type: "array<SystemMessage | UserMessage | ...>",
      typeBadge: "array",
      required: true,
      description:
        "A list of messages comprising the conversation so far.",
    },
    {
      name: "metadata",
      type: "map | null",
      typeBadge: "map | null",
      required: false,
      description:
        "Optional metadata to attach to the request for logging and tracking purposes.",
    },
    {
      name: "model",
      type: "string",
      typeBadge: "string",
      required: true,
      description:
        "ID of the model to use. You can use the List models API to see all of your available models.",
    },
  ],
  codeExamples: [
    {
      language: "typescript",
      label: "TYPESCRIPT",
      code: `import { Sunbeam } from "@sunbeam/sdk";

const client = new Sunbeam({
  apiKey: process.env.SUNBEAM_API_KEY
});

const response = await client.chat.completions.create({
  model: "sunbeam-v2-turbo",
  messages: [
    { role: "user", content: "Explain radiant architecture." }
  ],
  frequency_penalty: 0.5
});`,
    },
    {
      language: "python",
      label: "PYTHON",
      code: `from sunbeam import Sunbeam

client = Sunbeam(
    api_key=os.environ["SUNBEAM_API_KEY"]
)

response = client.chat.completions.create(
    model="sunbeam-v2-turbo",
    messages=[
        {"role": "user", "content": "Explain radiant architecture."}
    ],
    frequency_penalty=0.5
)`,
    },
    {
      language: "curl",
      label: "CURL",
      code: `curl https://api.sunbeam.studio/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $SUNBEAM_API_KEY" \\
  -d '{
    "model": "sunbeam-v2-turbo",
    "messages": [
      {"role": "user", "content": "Explain radiant architecture."}
    ],
    "frequency_penalty": 0.5
  }'`,
    },
  ],
  responseExamples: [
    {
      label: "200 (APPLICATION/JSON)",
      body: `{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "sunbeam-v2-turbo",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Radiant architecture prioritizes light..."
    },
    "finish_reason": "stop"
  }]
}`,
    },
    {
      label: "200 (TEXT/EVENT-STREAM)",
      body: `data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"sunbeam-v2-turbo","choices":[{"index":0,"delta":{"role":"assistant","content":"Radiant"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"sunbeam-v2-turbo","choices":[{"index":0,"delta":{"content":" architecture"},"finish_reason":null}]}

data: [DONE]`,
    },
  ],
};
