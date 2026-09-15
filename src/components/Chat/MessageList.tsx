import type { Message } from "../../types/chat";
import { AssistantMessage } from "./AssistantMessage";

interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
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
          </div>
        );
      })}
    </div>
  );
}
