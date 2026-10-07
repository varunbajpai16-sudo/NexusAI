import Router from 'express';
import {createConversation, getConversations, savemessage, getmessages} from '../Controllers/Chat.Controller.js';
const router = Router();

router.get('/health', async (req, res) => {
  const authHeader = req.headers.authorization;
  const user = JSON.parse(authHeader);
  const { userId, name, email } = user;
  console.log(userId);
  console.log(name);
  console.log(email);
  res.json({ message: user });
});

// Create a new conversation
router.post("/conversation", createConversation);

// Get all conversations of the authenticated user
router.get("/conversations", getConversations);

// Save a message
router.post("/message", savemessage);

// Get messages of a conversation
router.get("/conversation/:conversationId/messages", getmessages);


export default router;
