import Conversation from '../Models/Conversation.model.js';
import Message from '../Models/chat.model.js';

const createConversation = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];
    const { title } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: 'User ID missing',
      });
    }

    // Use the first user message as the conversation title.
    const conversationTitle =
      typeof title === 'string' && title.trim() ? title.trim().slice(0, 100) : 'New Conversation';

    const conversation = await Conversation.create({
      userId,
      title: conversationTitle,
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
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({
        message: 'User ID missing',
      });
    }

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
  try {
    const { conversationId, role, content } = req.body;

    // User ID forwarded by the Agent Service
    const userId = req.headers['x-user-id'];

    if (!conversationId || !role || !content || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Message content, role, conversationId, and userId are required',
      });
    }

    const savedMessage = await Message.create({
      conversationId,
      role,
      content,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: 'Message saved successfully',
      savedMessage,
    });
  } catch (error) {
    console.error('Save Message Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to save message',
    });
  }
};

const getmessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
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
const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({
        message: 'User ID missing',
      });
    }

    if (!conversationId) {
      return res.status(400).json({
        message: 'Conversation ID is required',
      });
    }

    // Find the conversation owned by the authenticated user
    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: 'Conversation not found',
      });
    }

    // Delete all messages belonging to this conversation
    await Message.deleteMany({
      conversationId: conversation._id,
    });

    // Delete the conversation
    await Conversation.deleteOne({
      _id: conversation._id,
      userId,
    });

    return res.status(200).json({
      success: true,
      message: 'Conversation deleted successfully',
      conversationId,
    });
  } catch (error) {
    console.error('Delete Conversation Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to delete conversation',
    });
  }
};

export { createConversation, getConversations, savemessage, getmessages, deleteConversation };
