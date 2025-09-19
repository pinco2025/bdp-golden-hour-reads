const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8081'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'BDP CRM API is running',
    timestamp: new Date().toISOString()
  });
});

// Debug subscription endpoint
app.post('/api/subscribe', (req, res) => {
  try {
    const { email, name, subscription_source = 'website' } = req.body;
    console.log('📧 Subscription request received:', { email, name, subscription_source });

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ 
        error: 'Valid email is required' 
      });
    }

    // Mock successful response
    const mockSubscriber = {
      id: 'test-' + Date.now(),
      email,
      name,
      profile_completed: false,
      profile_token: 'mock-token-' + Date.now(),
      created_at: new Date().toISOString()
    };

    console.log('✅ Mock subscriber created:', mockSubscriber);

    res.status(201).json({
      message: 'Successfully subscribed! (Debug mode - no email sent)',
      subscriber: mockSubscriber
    });

  } catch (error) {
    console.error('❌ Subscription error:', error);
    res.status(500).json({ 
      error: 'Internal server error. Please try again.' 
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'POST /api/subscribe'
    ]
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 DEBUG Server (CommonJS) running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 CORS enabled for multiple origins`);
  console.log(`🛠️  Debug mode: No database or email integration`);
});

// Keep server running
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received');
  server.close(() => {
    console.log('🛑 Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT received');
  server.close(() => {
    console.log('🛑 Server closed');
    process.exit(0);
  });
});