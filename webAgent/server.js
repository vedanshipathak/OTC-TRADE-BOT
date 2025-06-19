
require('dotenv').config();
const axios = require('axios');
// Ensure API key is present
if (!process.env.BLAND_API_KEY) {
  console.error(" BLAND_API_KEY is missing in .env file");
  process.exit(1);
}
// Web Agent creation payload
const payload = {
  name: "OTC Web Agent",
  pathway_id: "c137017f-9234-4028-acc1-92d0d0a99e38", 
  start_node_id: "b3c6d1f8-6c5e-45a9-a63d-338b7e07a209",    
  voice_id: "june",
  language: "en",
  interrupt_handling: {
    enabled: false
  }
};
// Function to create web agent
async function createWebAgent() {
  try {
    const response = await axios.post(
      'https://api.bland.ai/v1/agents',
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.BLAND_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    console.log(" Web Agent created successfully:");
    console.log(response.data);
  } catch (error) {
    console.error(" Failed to create Web Agent:");
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

createWebAgent();
