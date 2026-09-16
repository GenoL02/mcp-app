import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Message } from "../../types/chat";
import { ToolStep } from "./ToolStep";

interface AssistantMessageProps {
  message: Message;
  isStreaming: boolean;
}

export function AssistantMessage({
  message,
  isStreaming,
}: AssistantMessageProps) {
  return (
    <div className="assistant-message">
      <div
        className={`message-avatar${isStreaming ? " message-avatar--loading" : ""}`}
        aria-label={isStreaming ? "Waiting for response" : "Assistant"}
      >
        ✦
      </div>

      <div className="message-body">
        {message.steps && message.steps.length > 0 && (
          <div className="tool-steps">
            {message.steps.map((step) => (
              <ToolStep key={`${step.turn}-${step.tool_name}`} step={step} />
            ))}
          </div>
        )}

        <div className="message-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
          <div className="message-tokens">
            {message.totalTokens !== undefined && (
              <span>Token tiêu thụ: {message.totalTokens} tokens</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
