import type { Message } from "../../types/chat";
import { AssistantMessage } from "./AssistantMessage";
import { RotateCcw } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
  onResend: (message: Message) => void;
}

export function MessageList({
  messages,
  isStreaming,
  onResend,
}: MessageListProps) {
  return (
    <div className="message-list">
      {messages.map((message, index) => {
        if (message.role === "assistant") {
          return (
            <AssistantMessage
              key={message.id}
              message={message}
              isStreaming={isStreaming && index === messages.length - 1}
            />
          );
        }

        return (
          <div key={message.id} className="user-message">
            <div className="message-body">{message.content}</div>
            <button
              className="resend-button"
              title="Gửi lại câu hỏi"
              aria-label="Gửi lại câu hỏi"
              onClick={() => onResend(message)}
              disabled={isStreaming}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
