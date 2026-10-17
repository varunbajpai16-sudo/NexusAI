import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  currentConversationId: null,
  loading: false,
  error: null,
};
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversationId = action.payload;
      state.messages = [];
      state.error = null;
    },
    // Load messages for a conversation
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.error = null;
    },

    // Add a new message
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    // Update an existing message
    updateMessage: (state, action) => {
      const { _id, content } = action.payload;

      const message = state.messages.find((msg) => msg._id === _id);

      if (message) {
        message.content = content;
      }
    },

    // Remove a message
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg._id !== action.payload,
      );
    },

    // Clear messages when switching conversations
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
    },

    // Loading state
    setMessageLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Error handling
    setMessageError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  removeMessage,
  clearMessages,
  setMessageLoading,
  setMessageError,
  setCurrentConversation,
} = messageSlice.actions;

export default messageSlice.reducer;
