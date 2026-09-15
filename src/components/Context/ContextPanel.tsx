import { FileCode2, Folder, Plus, X } from "lucide-react";
import type { ContextItem } from "../../types/chat";

type Props = {
  items: ContextItem[];
  selected: string[];
  onToggle: (id: string) => void;
};
export function ContextPanel({ items, selected, onToggle }: Props) {
  return (
    <aside className="context-panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">CONTEXT</span>
          <h3>Workspace</h3>
        </div>
        <button className="icon-button">
          <Plus size={17} />
        </button>
      </div>
      <div className="context-group">
        <div className="group-title">
          <Folder size={14} /> Files
        </div>
        {items.map((item) => (
          <button
            key={item.id}
            className={`file-row ${selected.includes(item.id) ? "selected" : ""}`}
            onClick={() => onToggle(item.id)}
          >
            {item.type === "folder" ? (
              <Folder size={15} />
            ) : (
              <FileCode2 size={15} />
            )}
            <span>{item.path}</span>
            {selected.includes(item.id) && <X size={13} />}
          </button>
        ))}
      </div>
      <div className="ncp-card">
        <div className="status-dot online" />
        <div>
          <strong>MCP Server</strong>
          <span>Connected · stdio/http adapter</span>
        </div>
      </div>
    </aside>
  );
}
