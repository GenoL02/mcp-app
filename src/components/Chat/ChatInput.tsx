import { AtSign, Paperclip, Send, Square } from "lucide-react";
import type { ContextItem } from "../../types/chat";
type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  isStreaming: boolean;
  context: ContextItem[];
};
export function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isStreaming,
  context,
}: Props) {
  return (
    <div className="composer-wrap">
      <div className="composer-context">
        {context.length ? (
          context.map((x) => <span key={x.id}>@{x.path}</span>)
        ) : (
          <span>No context selected</span>
        )}
      </div>
      <div className="composer">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isStreaming) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Ask anything about your code…"
          rows={1}
        />
        <div className="composer-actions">
          <div>
            <button title="Attach">
              <Paperclip size={17} />
            </button>
            <button title="Mention">
              <AtSign size={17} />
            </button>
          </div>
          <button
            className="send"
            onClick={isStreaming ? onStop : onSubmit}
            disabled={!value.trim() && !isStreaming}
          >
            {isStreaming ? <Square size={15} /> : <Send size={16} />}
          </button>
        </div>
      </div>
      <div className="hint">Enter to send · Shift + Enter for new line</div>
    </div>
  );
}
