import Conversation from '../Models/Conversation.model.js';
import Message from '../Models/chat.model.js';
const createConversation = async (req, res) => {
  try {
    // Get authenticated user ID from middleware
    const authtoken = req.headers.authorization;
    const user = JSON.parse(authtoken);

    const { userId } = user;
    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    // Create new conversation
    const conversation = await Conversation.create({
      userId,
      title: 'New Conversation',
    });

    return res.status(201).json({
      message: 'Conversation created successfully',
      conversation,
    });
  } catch (error) {
    console.error('Create Conversation Error:', error);

    return res.status(500).json({
      message: 'Internal server error from createConversation',
    });
  }
};

const getConversations = async (req, res) => {
  try {
    // Get authenticated user ID from middleware
    const authtoken = req.headers.authorization;
    const user = JSON.parse(authtoken);

    const { userId } = user;

    // Fetch conversations for the authenticated user
    const conversations = await Conversation.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Conversations retrieved successfully',
      conversations,
    });
  } catch (error) {
    console.error('Get Conversations Error:', error);

    return res.status(500).json({
      message: 'Internal server error from getConversations',
    });
  }
};

const savemessage = async (req, res) => {
  try{
      const { conversationId, role, content } = req.body;
      const token = req.headers.authorization; // Assuming userId is sent in the authorization header
      const user = JSON.parse(token);
      const userId = user.userId;
      if(!conversationId || !role || !content || !userId){
        return res.status(400).json({
          message: 'Message content, role, conversationId, and userId are required',
        });
      }
      const message = await Message.create({
        conversationId,
        role,
        content,
        userId
      });
      return res.status(201).json({
        message: 'Message saved successfully',
        message
      });
  }
  catch (error) {
    console.error('Save Message Error from savemessage:', error);
  }
}

const getmessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if(!conversationId) {
      return res.status(400).json({
        message: 'conversationId is required',
      });
    }

    const messages = await Message.find({ conversationId }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: 'Messages retrieved successfully',
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error from getmessages',
    });
  }
};

export default { createConversation, getConversations, savemessage, getmessages };
