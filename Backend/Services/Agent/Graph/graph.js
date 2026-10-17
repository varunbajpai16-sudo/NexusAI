
import { StateGraph, START, END } from "@langchain/langgraph";
import { NexusState } from "./State.js";

import { ChatAgent } from "../Agents/Chat.Agent.js";
import { CodingAgent } from "../Agents/Coding.Agent.js";
import { PdfAgent } from "../Agents/Pdf.Agent.js";
import { PptAgent } from "../Agents/Ppt.Agent.js";
import { SearchAgent } from "../Agents/Search.Agent.js";

import { routeAgent } from "./Router.Agent.js";

const Workflow = new StateGraph(NexusState);

// Register nodes
Workflow.addNode("router", routeAgent);
Workflow.addNode("coding", CodingAgent);
Workflow.addNode("chat", ChatAgent);
Workflow.addNode("ppt", PptAgent);
Workflow.addNode("pdf", PdfAgent);
Workflow.addNode("search", SearchAgent);

// Entry point
Workflow.addEdge(START, "router");

// Conditional routing
Workflow.addConditionalEdges(
  "router",
  (state) => state.agent,
  {
    "coding-agent": "coding",
    "chat": "chat",
    "ppt-agent": "ppt",
    "pdf-agent": "pdf",
    "search": "search",
    "search-agent": "search",
  }
);

// End points
Workflow.addEdge("coding", END);
Workflow.addEdge("chat", END);
Workflow.addEdge("ppt", END);
Workflow.addEdge("pdf", END);
Workflow.addEdge("search", END);

// Compile graph
export const nexusGraph = Workflow.compile();

