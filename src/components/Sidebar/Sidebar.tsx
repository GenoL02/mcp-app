import {
  MessageSquarePlus,
  Search,
  Settings,
  Trash2,
  MessageSquare,
} from "lucide-react";
import type { Session } from "../../types/chat";

type Props = {
  sessions: Session[];
  activeId: string;
  onNew: () => void;
  onSelect: (id: string) => void;
};
export function Sidebar({ sessions, activeId, onNew, onSelect }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">N</div>
        <div>
          <strong>MCP Assistant</strong>
          <span>Continue-style client</span>
        </div>
      </div>
      <button className="new-chat" onClick={onNew}>
        <MessageSquarePlus size={17} /> New chat
      </button>
      <div className="search">
        <Search size={15} />
        <input placeholder="Search chats" />
      </div>
      <div className="section-title">RECENT</div>
      <div className="sessions">
        {sessions.map((s) => (
          <button
            key={s.id}
            className={`session ${s.id === activeId ? "active" : ""}`}
            onClick={() => onSelect(s.id)}
          >
            <MessageSquare size={15} />
            <span>{s.title}</span>
          </button>
        ))}
      </div>
      <div className="sidebar-bottom">
        <button>
          <Settings size={16} /> Settings
        </button>
        <button>
          <Trash2 size={16} /> Clear history
        </button>
      </div>
    </aside>
  );
}
