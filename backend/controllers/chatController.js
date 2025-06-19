const { createChatSession, sendChatMessage } = require('../services/blandService');

exports.createChat = async (_req, res) => {
  try {
    const result = await createChatSession();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat creation failed' });
  }
};

exports.sendMessage = async (req, res) => {
  const { chat_id, user_message } = req.body;
  try {
    const result = await sendChatMessage(chat_id, user_message);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Message sending failed' });
  }
};
