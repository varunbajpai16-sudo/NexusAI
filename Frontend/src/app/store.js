import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../features/Toggle/Toggle_slice"
import AuthReducer from "../features/Auth/Auth.Slice"
import MessageReducer from "../features/Messages/message.slice"
import ConversationReducer from "../features/Messages/conversation.slice"
export const store = configureStore({
    reducer:{
     toggle: toggleReducer,
     auth:AuthReducer,
     conversation:ConversationReducer,
     message:MessageReducer
    }
});