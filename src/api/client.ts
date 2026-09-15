import type { ChatStep, ContextItem } from "../types/chat";

const API_BASE_URL = import.meta.env.DEV
  ? "/mcp"
  : (import.meta.env.VITE_API_BASE_URL ??
    "https://mcp-sf-api.onrender.com/mcp");

//export async function getSessions(): Promise<Session[]> {
//const response = await fetch(`${API_BASE_URL}/sessions`);
//if (!response.ok) throw new Error("Failed to load sessions");
//  return response.json();
//}

export async function getContextFiles(): Promise<ContextItem[]> {
  const response = await fetch(`${API_BASE_URL}/context/files`);
  if (!response.ok) throw new Error("Failed to load context files");
  return response.json();
}

export async function sendChat(
  sessionId: string,
  prompt: string,
  context: ContextItem[],
  onResponse: (response: ChatResponse) => void,
  onDone: () => void,
): Promise<void> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) throw new Error("Chat request failed");

  const payload = (await response.json()) as ChatResponse;
  onResponse(payload);
  onDone();
}

export type ChatResponse = {
  final_answer: string;
  steps: ChatStep[];
  total_tokens: number;
};
