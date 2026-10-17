
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  activeConversation: null,
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
      state.error = null;
    },

    addConversation: (state, action) => {
      state.conversations.unshift(action.payload);
      state.activeConversation = action.payload;
    },

    setActiveConversation: (state, action) => {
      state.activeConversation =
        state.conversations.find(
          (conversation) =>
            conversation._id === action.payload
        ) || null;
    },

    updateConversation: (state, action) => {
      const updated = action.payload;
      const index = state.conversations.findIndex(
        (conversation) => conversation._id === updated._id
      );

      if (index !== -1) {
        state.conversations[index] = updated;
      }

      if (state.activeConversation?._id === updated._id) {
        state.activeConversation = updated;
      }
    },

    removeConversation: (state, action) => {
      state.conversations = state.conversations.filter(
        (conversation) => conversation._id !== action.payload
      );

      if (state.activeConversation?._id === action.payload) {
        state.activeConversation = null;
      }
    },

    setConversationLoading: (state, action) => {
      state.loading = action.payload;
    },

    setConversationError: (state, action) => {
      state.error = action.payload;
    },

    clearActiveConversation: (state) => {
      state.activeConversation = null;
    },
  },
});

export const {
  setConversations,
  addConversation,
  setActiveConversation,
  updateConversation,
  removeConversation,
  setConversationLoading,
  setConversationError,
  clearActiveConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
