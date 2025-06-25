const express = require('express');
const cors = require('cors');
const app = express();

// CORSを有効化
app.use(cors());
app.use(express.json());

// Claude APIへのプロキシエンドポイント
app.post('/api/claude', async (req, res) => {
  const apiKey = process.env.VITE_ANTHROPIC_API_KEY || req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy server error' });
  }
});

const PORT = process.env.PROXY_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔗 Claude API Proxy running on http://localhost:${PORT}`);
});