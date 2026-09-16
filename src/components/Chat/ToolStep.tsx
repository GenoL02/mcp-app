import { useState } from "react";
import type { ChatStep } from "../../types/chat";

interface ToolStepProps {
  step: ChatStep;
}

export function ToolStep({ step }: ToolStepProps) {
  const [expanded, setExpanded] = useState(false);

  function formatResult(text: string) {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  }

  return (
    <div className="tool-step">
      <button
        className="tool-step-header"
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="tool-status"> ✓ </span>

        <span className="tool-name">{step.tool_name}</span>

        <span className="tool-turn"> Turn {step.turn}</span>

        <span className="tool-chevron">{expanded ? " ⌃ " : " ⌄ "}</span>
      </button>

      {expanded && (
        <div className="tool-step-content">
          <div className="tool-section">
            <div className="tool-section-title">Arguments</div>

            <pre>{JSON.stringify(step.args, null, 2)}</pre>
          </div>

          <div className="tool-section">
            <div className="tool-section-title">Result</div>

            {step.tool_result.map((result, index) => (
              <pre key={index}>{formatResult(result.text)}</pre>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
