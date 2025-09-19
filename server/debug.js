import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import healthHandler from '../api/health'
import subscribeHandler from '../api/subscribe'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:8080',
    'http://localhost:8081',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8081'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.json())

// Mount serverless routes
app.all('/api/health', (req, res) => healthHandler(req, res))
app.all('/api/subscribe', (req, res) => subscribeHandler(req, res))

// (serverless handlers cover /api/subscribe)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'POST /api/subscribe'
    ]
  })
})

// Error handling
app.use((error, req, res, next) => {
  console.error('🚨 Unhandled error:', error)
  res.status(500).json({ 
    error: 'Something went wrong!' 
  })
})

const server = app.listen(PORT, () => {
  console.log(`🚀 Local serverless adapter running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🌐 CORS enabled for multiple origins`)
})

// Keep server alive and handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('🛑 Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('📴 SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('🛑 Server closed')
    process.exit(0)
  })
})
