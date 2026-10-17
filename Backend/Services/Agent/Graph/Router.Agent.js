import { getLLM } from '../Config/llm.config.js';

const routerLLM = getLLM('Chat');

export async function routeAgent(state) {
  console.log("Inside router agent")
  const prompt = `
You are the intelligent routing agent for Nexus AI.

Your responsibility is to analyze the user's request and select
exactly ONE agent that can handle it most effectively.

Available agents:

1. coding-agent
   - Programming, code generation, debugging, DSA,
     algorithms, technical explanations, and code reviews.
   - Use for coding-related questions that can be answered
     using existing knowledge or the user's provided code.

2. pdf-agent
   - Reading, summarizing, extracting information from,
     or analyzing uploaded PDF documents.
   - Use when the answer depends on the contents of a PDF.

3. ppt-agent
   - Creating presentations, slide content, presentation
     outlines, and improving existing presentation content.

4. search
   - Web searches, finding external information, and retrieving
     information not available in the conversation.
   - Use when the request requires current, recent, or real-time
     information, such as news, prices, trends, latest updates,
     or recent technological developments.
   - Use when the answer requires specific facts, references,
     documentation, sources, or external verification that cannot
     be reliably provided from existing knowledge.
   - Use when another agent lacks the required information or
     the answer depends on information not present in the user's
     message, conversation, or available documents.
   - Use when the user explicitly asks to search the web, find
     sources, or look up information online.

5. chat
   - General conversation, greetings, brainstorming, writing,
     everyday questions, and explanations that do not require
     specialized agents or external searches.
   - Use for questions that can be answered reliably from
     general knowledge without external information.

Routing rules:

- Select exactly ONE agent.
- Prefer the most specialized agent when the request clearly
  matches its purpose.
- If a request requires information that is missing, uncertain,
  external, or time-sensitive, choose search.
- Do not choose search merely because a question is technical
  or difficult. Choose the specialized agent if it can handle
  the request with the available information.
- If the user asks about an uploaded PDF, choose pdf-agent.
- If the user asks for presentation creation, choose ppt-agent.
- If the user asks for coding help, choose coding-agent.
- If a specialized agent cannot complete a task because essential
  external information is missing, route to search.
- For mixed requests, prioritize the main task. Choose search
  when external research is essential to completing that task.
- Never invent information about an agent's capabilities or
  available data.

Output requirements:
- Return ONLY one agent name in lowercase.
- Valid outputs:
  coding-agent
  pdf-agent
  ppt-agent
  search
  chat
- Do not include explanations, punctuation, or additional text.

User request: ${state.userMessage}
`;

  const response = await routerLLM.invoke(prompt);

  const selectedAgent = response.content.trim().toLowerCase();

  const validAgents = ['coding-agent', 'pdf-agent', 'ppt-agent', 'chat','search'];

  const agent = validAgents.includes(selectedAgent) ? selectedAgent : 'chat';

  return {
    agent,
  };
}
