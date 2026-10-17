import axios from 'axios';
import { nexusGraph } from '../Graph/graph.js';

const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL;

const runAgent = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    // Your auth middleware replaces this header with the userId
   const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({
        message: "User ID missing",
      });
    }

    if (!message || typeof message !== 'string' || !message.trim() || !conversationId) {
      return res.status(400).json({
        success: false,
        message: 'Message and conversationId are required',
      });
    }

    if (!CHAT_SERVICE_URL) {
      throw new Error('CHAT_SERVICE_URL is not configured');
    }

    const content = message.trim();

    // Forward the authenticated userId to the Chat Service
    const headers = {
      'x-user-id': userId,
    };

    // 1. Save the user's message
    const savedUserMessage = await axios.post(
      `${CHAT_SERVICE_URL}/api/chat/message`,
      {
        conversationId,
        role: 'user',
        content,
      },
      { headers }
    );

    // Execute LangGraph
    const result = await nexusGraph.invoke({
      userMessage: message,
    });

    const assistantContent = result.agentResponse?.trim();

    if (!assistantContent) {
      throw new Error('No response returned by the agent workflow');
    }

    // 4. Save the assistant's response
    const savedAssistantMessage = await axios.post(
      `${CHAT_SERVICE_URL}/api/chat/message`,
      {
        conversationId,
        role: 'assistant',
        content: assistantContent,
      },
      { headers }
    );

    // 5. Return the result
    return res.status(200).json({
      success: true,
      conversationId,
      agent: result.agent,
      userMessage: savedUserMessage.data,
      assistantMessage: savedAssistantMessage.data,
    });
  } catch (error) {
    console.error('Agent Controller Error:', error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to process agent request',
    });
  }
};

export { runAgent };
