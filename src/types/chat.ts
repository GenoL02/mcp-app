export type Role = "user" | "assistant" | "system";
export type ContextItem = {
  id: string;
  path: string;
  type: "file" | "folder";
  selected?: boolean;
};
export type ToolState = {
  name: string;
  status: "running" | "completed" | "error";
};
export type ToolResult = {
  type: string;
  text: string;
};
export type ChatStep = {
  turn: number;
  tool_name: string;
  args: Record<string, unknown>;
  tool_result: ToolResult[];
};
export type Message = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  tools?: ToolState[];
  steps?: ChatStep[];
  totalTokens?: number;
};
export type Session = {
  id: string;
  title: string;
  updatedAt: number;
  messages: Message[];
};
