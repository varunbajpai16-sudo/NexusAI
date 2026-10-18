
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
  baseURL:
    import.meta.env.VITE_API_GATEWAY_URL ||
    "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach authentication data
API.interceptors.request.use(
  (config) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (user.googleId) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${user.googleId}`;
      }
    } catch (error) {
      console.error("Failed to read user from localStorage:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const chatService = {
  // Get all conversations
  getConversations: async (dispatch) => {
    try {
      dispatch(setConversationLoading(true));

      const response = await API.get(
        "/api/chat/getconversations"
      );

      const conversations = response.data.conversations || [];
      dispatch(setConversations(conversations));

      return conversations;
    } catch (error) {
      dispatch(
        setConversationError(
          error.response?.data?.message ||
            "Failed to fetch conversations"
        )
      );
      throw error;
    } finally {
      dispatch(setConversationLoading(false));
    }
  },

  // Create a conversation
  createConversation: async (
    dispatch,
    title = "New Conversation"
  ) => {
    try {
      dispatch(setConversationLoading(true));

      const response = await API.post(
        "/api/chat/conversation",
        { title }
      );

      const conversation = response.data.conversation;

      dispatch(addConversation(conversation));
      dispatch(setActiveConversation(conversation._id));
      dispatch(setCurrentConversation(conversation._id));
      dispatch(setMessages([]));

      return conversation;
    } catch (error) {
      dispatch(
        setConversationError(
          error.response?.data?.message ||
            "Failed to create conversation"
        )
      );
      throw error;
    } finally {
      dispatch(setConversationLoading(false));
    }
  },

  // Get messages for a conversation
  getMessages: async (dispatch, conversationId) => {
    try {
      dispatch(setMessageLoading(true));
      dispatch(setCurrentConversation(conversationId));

      const response = await API.get(
        `/api/chat/conversation/${conversationId}/messages`
      );

      const messages = [
        ...(response.data.messages || []),
      ].reverse();

      dispatch(setMessages(messages));

      return messages;
    } catch (error) {
      dispatch(
        setMessageError(
          error.response?.data?.message ||
            "Failed to fetch messages"
        )
      );
      throw error;
    } finally {
      dispatch(setMessageLoading(false));
    }
  },

  // Send a message to the Nexus agent
  askAgent: async (dispatch, { conversationId, message }) => {
    try {
      const response = await API.post(
        "/api/agent/nexus",
        { conversationId, message }
      );

      const { userMessage, assistantMessage } = response.data;

      const savedUserMessage = userMessage?.savedMessage;
      const savedAssistantMessage =
        assistantMessage?.savedMessage;

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
          error.response?.data?.message ||
            "Failed to get agent response"
        )
      );
      throw error;
    }
  },

  // Rename a conversation
  renameConversation: async (
    dispatch,
    conversationId,
    title
  ) => {
    try {
      const response = await API.patch(
        `/api/chat/conversation/${conversationId}`,
        { title }
      );

      const conversation = response.data.conversation;
      dispatch(updateConversation(conversation));

      return conversation;
    } catch (error) {
      dispatch(
        setConversationError(
          error.response?.data?.message ||
            "Failed to rename conversation"
        )
      );
      throw error;
    }
  },

  // Delete a conversation
  deleteConversation: async (dispatch, conversationId) => {
    try {
      await API.delete(
        `/api/chat/conversation/${conversationId}`
      );

      dispatch(removeConversation(conversationId));

      return conversationId;
    } catch (error) {
      dispatch(
        setConversationError(
          error.response?.data?.message ||
            "Failed to delete conversation"
        )
      );
      throw error;
    }
  },
};

export default chatService;
