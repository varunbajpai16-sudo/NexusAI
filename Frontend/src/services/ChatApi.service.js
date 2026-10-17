import axios from "axios";

import {
  setConversations,
  addConversation,
  updateConversation,
  removeConversation,
  setActiveConversation,
  setConversationLoading,
  setConversationError,
} from "../features/Messages/conversation.slice";

import {
  setMessages,
  addMessage as addMessageToStore,
  setCurrentConversation,
  setMessageLoading,
  setMessageError,
} from "../features/Messages/message.slice";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach authentication data
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.googleId) {
      config.headers.Authorization = `Bearer ${user.googleId}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const chatService = {
  // Fetch conversations
  getConversations: async (dispatch) => {
    try {
      dispatch(setConversationLoading(true));

      const response = await API.get("/chat/getconversations");
      const conversations = response.data.conversations;

      dispatch(setConversations(conversations));
      return conversations;
    } catch (error) {
      dispatch(
        setConversationError(
          error.response?.data?.message || "Failed to fetch conversations"
        )
      );
      throw error;
    } finally {
      dispatch(setConversationLoading(false));
    }
  },

  // Create and select a conversation
  createConversation: async (dispatch, title = "New Conversation") => {
    try {
      dispatch(setConversationLoading(true));

      const response = await API.post("/chat/conversation", { title });
      const conversation = response.data.conversation;

      dispatch(addConversation(conversation));
      dispatch(setActiveConversation(conversation._id));
      dispatch(setCurrentConversation(conversation._id));
      dispatch(setMessages([]));

      return conversation;
    } catch (error) {
      dispatch(
        setConversationError(
          error.response?.data?.message || "Failed to create conversation"
        )
      );
      throw error;
    } finally {
      dispatch(setConversationLoading(false));
    }
  },

  // Fetch messages
  getMessages: async (dispatch, conversationId) => {
    try {
      dispatch(setMessageLoading(true));
      dispatch(setCurrentConversation(conversationId));

      const response = await API.get(
        `/chat/conversation/${conversationId}/messages`
      );

      const messages = [...response.data.messages].reverse();
      dispatch(setMessages(messages));

      return messages;
    } catch (error) {
      dispatch(
        setMessageError(
          error.response?.data?.message || "Failed to fetch messages"
        )
      );
      throw error;
    } finally {
      dispatch(setMessageLoading(false));
    }
  },

  // Send the prompt to the Agent API.
  // The agent controller saves both messages through the Chat Service.
  askAgent: async (dispatch, { conversationId, message }) => {
    try {
      const response = await API.post("/agent/nexus", {
        conversationId,
        message,
      });

      const { userMessage, assistantMessage } = response.data;

      // These are Redux updates only; they do not make another save request.
      const savedUserMessage = userMessage?.savedMessage;
      const savedAssistantMessage = assistantMessage?.savedMessage;

      if (savedUserMessage) {
        dispatch(addMessageToStore(savedUserMessage));
      }

      if (savedAssistantMessage) {
        dispatch(addMessageToStore(savedAssistantMessage));
      }

      return response.data;
    } catch (error) {
      dispatch(
        setMessageError(
          error.response?.data?.message || "Failed to get agent response"
        )
      );
      throw error;
    }
  },

  // Rename conversation
  renameConversation: async (dispatch, conversationId, title) => {
    try {
      const response = await API.patch(
        `/chat/conversation/${conversationId}`,
        { title }
      );

      const conversation = response.data.conversation;
      dispatch(updateConversation(conversation));

      return conversation;
    } catch (error) {
      dispatch(
        setConversationError(
          error.response?.data?.message || "Failed to rename conversation"
        )
      );
      throw error;
    }
  },

  // Delete conversation
  deleteConversation: async (dispatch, conversationId) => {
    try {
      await API.delete(`/chat/conversation/${conversationId}`);
      dispatch(removeConversation(conversationId));

      return conversationId;
    } catch (error) {
      dispatch(
        setConversationError(
          error.response?.data?.message || "Failed to delete conversation"
        )
      );
      throw error;
    }
  },
};

export default chatService;