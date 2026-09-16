import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ContextPanel } from "./components/Context/ContextPanel";
import { MessageList } from "./components/Chat/MessageList";
import { ChatInput } from "./components/Chat/ChatInput";
import { NcpStatus } from "./components/NcpStatus/NcpStatus";
import type { ContextItem, Session } from "./types/chat";
import { useChat } from "./hooks/useChat";
import "./styles.css";

const initialSessions: Session[] = [
  {
    id: "session-local",
    title: "Explain project architecture",
    updatedAt: Date.now(),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "## Welcome\n\nI can help you understand, edit, and navigate your codebase. Select files from the **Context** panel and ask a question.\n\n```",
        createdAt: Date.now(),
      },
    ],
  },
];
const files: ContextItem[] = [
  { id: "1", path: "cmd/server/main.go", type: "file" },
  { id: "2", path: "internal/api/handler.go", type: "file" },
  { id: "3", path: "internal/ncp/client.go", type: "file" },
  { id: "4", path: "internal/ncp", type: "folder" },
  { id: "5", path: "go.mod", type: "file" },
];
export default function App() {
  const [sessions, setSessions] = useState(initialSessions);
  const [activeId, setActiveId] = useState("session-local");
  const [selected, setSelected] = useState<string[]>(["1", "2"]);
  const chat = useChat();
  const active = useMemo(
    () => sessions.find((s) => s.id === activeId),
    [sessions, activeId],
  );
  const messages = chat.messages.length
    ? chat.messages
    : (active?.messages ?? []);
  function newChat() {
    const id = crypto.randomUUID();
    setSessions((s) => [
      { id, title: "New conversation", updatedAt: Date.now(), messages: [] },
      ...s,
    ]);
    setActiveId(id);
    chat.resetChat();
  }
  function select(id: string) {
    setActiveId(id);
    chat.resetChat();
  }
  function toggle(id: string) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  }
  return (
    <div className="app-shell">
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        onNew={newChat}
        onSelect={select}
      />
      <main className="main">
        <header className="topbar">
          <div>
            <span className="workspace">WORKSPACE / NCP-CLIENT</span>
            <h2>{active?.title ?? "New conversation"}</h2>
          </div>
          <NcpStatus />
        </header>
        <section className="chat-area">
          <MessageList messages={messages} isStreaming={chat.isStreaming} />
          {chat.error && <div className="error">{chat.error}</div>}
          <ChatInput
            value={chat.input}
            onChange={chat.setInput}
            onSubmit={() =>
              chat.submit(files.filter((f) => selected.includes(f.id)))
            }
            onStop={chat.stop}
            isStreaming={chat.isStreaming}
            context={files.filter((f) => selected.includes(f.id))}
          />
        </section>
      </main>
      <ContextPanel items={files} selected={selected} onToggle={toggle} />
    </div>
  );
}
