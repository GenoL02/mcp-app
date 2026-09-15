import { useMemo, useState } from "react";
import type { ContextItem, Message } from "../types/chat";
import { sendChat } from "../api/client";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useMemo(() => "session-local", []);

  function resetChat() {
    setMessages([]);
    setInput("");
    setError(null);
  }

  async function submit(context: ContextItem[]) {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    setError(null);
    const user: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      user,
      {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: Date.now(),
      },
    ]);
    setIsStreaming(true);
    try {
      await sendChat(
        sessionId,
        text,
        context,
        (response) =>
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: response.final_answer,
                    steps: response.steps,
                    totalTokens: response.total_tokens,
                  }
                : m,
            ),
          ),
        () => setIsStreaming(false),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setIsStreaming(false);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Unable to connect to the Go API server." }
            : m,
        ),
      );
    }
  }
  return { messages, input, setInput, isStreaming, error, submit, resetChat };
}
