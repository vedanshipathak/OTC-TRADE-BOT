const fetch = require('node-fetch');
const { BLAND_API_KEY, PATHWAY_ID, START_NODE_ID } = process.env;

exports.createChatSession = async () => {
  const res = await fetch('https://api.bland.ai/v1/pathway/chat/create', {
    method: 'POST',
    headers: {
      Authorization: BLAND_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pathway_id: PATHWAY_ID,
      start_node_id: START_NODE_ID
    })
  });

  return res.json();
};

exports.sendChatMessage = async (chat_id, user_message) => {
  const res = await fetch('https://api.bland.ai/v1/pathway/chat/send', {
    method: 'POST',
    headers: {
      Authorization: BLAND_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chat_id, user_message })
  });

  return res.json();
};
