// createToken.js
import fetch from 'node-fetch';

const AGENT_ID = '2d626288-7d1b-49b0-91ac-333c0e311a83'; // replace with your actual agent_id
const API_KEY = 'org_b26a09baeb6594be11fc159ba9f9545dbb26328814c2f484aa3a87a0c9f62fc32b9e261bb8245e66318269';   // replace with your actual Bland.ai API key

async function generateToken() {
  const url = `https://api.bland.ai/v1/agents/${AGENT_ID}/authorize`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (response.ok) {
      console.log(" Token generated:", data.token);
    } else {
      console.error(" Error:", data.errors || data);
    }

  } catch (error) {
    console.error(" Exception occurred:", error);
  }
}

generateToken();
