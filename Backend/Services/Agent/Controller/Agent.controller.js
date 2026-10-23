
import axios from "axios";
import { nexusGraph } from "../Graph/graph.js";

const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL?.replace(/\/+$/, "");

const runAgent = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    // User ID provided by the Gateway authentication middleware
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing",
      });
    }

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim() ||
      !conversationId
    ) {
      return res.status(400).json({
        success: false,
        message: "Message and conversationId are required",
      });
    }

    if (!CHAT_SERVICE_URL) {
      return res.status(500).json({
        success: false,
        message: "CHAT_SERVICE_URL is not configured",
      });
    }

    const content = message.trim();

    // Forward authenticated user ID to the Chat Service
    const headers = {
      "x-user-id": userId,
    };

    // Chat Service endpoint
    const messageUrl = `${CHAT_SERVICE_URL}/api/chat/message`;

    // 1. Save the user's message
    const savedUserMessage = await axios.post(
      messageUrl,
      {
        conversationId,
        role: "user",
        content,
      },
      { headers }
    );

    // 2. Execute the LangGraph workflow
    const result = await nexusGraph.invoke({
      userMessage: content,
    });

    const assistantContent = result.agentResponse?.trim();

    if (!assistantContent) {
      throw new Error("No response returned by the agent workflow");
    }

    // 3. Save the assistant's response
    const savedAssistantMessage = await axios.post(
      messageUrl,
      {
        conversationId,
        role: "assistant",
        content: assistantContent,
      },
      { headers }
    );

    // 4. Return the completed result
    return res.status(200).json({
      success: true,
      conversationId,
      agent: result.agent,
      userMessage: savedUserMessage.data,
      assistantMessage: savedAssistantMessage.data,
    });
  } catch (error) {
    console.error("Agent Controller Error:", {
      message: error.message,
      status: error.response?.status,
      response:
        typeof error.response?.data === "string"
          ? error.response.data.slice(0, 1000)
          : error.response?.data,
    });

    return res.status(500).json({
      success: false,
      message: "Failed to process agent request",
    });
  }
};







export { runAgent };
