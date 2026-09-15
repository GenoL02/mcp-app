import { Activity, ChevronDown } from "lucide-react";
export function NcpStatus() {
  return (
    <div className="ncp-status">
      <span className="status-dot online" />
      <span>MCP connected</span>
      <Activity size={14} />
      <ChevronDown size={13} />
    </div>
  );
}
