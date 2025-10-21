import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return res.status(500).json({ error: 'Server misconfiguration: missing OPENAI_API_KEY' });
  }

  try {
    const payload = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    // Forward status and body to client
    res.status(response.status).send(text);
  } catch (err) {
    console.error('Error in serverless analyze handler:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
