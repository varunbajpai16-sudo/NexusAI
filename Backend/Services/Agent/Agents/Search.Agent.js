
import { getLLM } from "../Config/llm.config.js";
import { TavilySearch } from "@langchain/tavily";

const searchLLM = getLLM("search");

const webSearch = new TavilySearch({
  maxResults: 5,
  apiKey: process.env.TAVILY_API_KEY,
});

export const SearchAgent = async (state) => {
  try {
    const query = state.userMessage;

    // Search the web
    const searchResults = await webSearch.invoke({
      query,
    });

    // Generate an answer from search results
    const response = await searchLLM.invoke([
      {
        role: "system",
        content: `
You are Nexus AI's web research agent.
Answer the user's question using the provided search results.
Be accurate, concise, and do not invent facts.
If the results are insufficient, clearly mention the limitation.
`,
      },
      {
        role: "user",
        content: `
User question:
${query}

Web search results:
${JSON.stringify(searchResults)}
`,
      },
    ]);

    return {
      agent: "search",
      agentResponse: response.content,
    };
  } catch (error) {
    console.error("SearchAgent Error:", error);

    return {
      agent: "search",
      agentResponse:
        "Sorry, I couldn't retrieve web search results. Please try again.",
    };
  }
};
