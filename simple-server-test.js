/**
 * 🚀 ПРОСТОЙ ТЕСТ СЕРВЕРА
 * Минимальная версия для тестирования интеграции
 */

const express = require('express');
const { analyzeAndRoute } = require('./server/semantic-router.cjs');
const { conversationEngine } = require('./server/conversation-engine.cjs');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    semantic_router: 'active',
    conversation_engine: 'active'
  });
});

// Main chat endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, userId = 'test-user', sessionId = 'test-session' } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    console.log(`\n🎯 Получен запрос: "${message}"`);

    // Этап 1: Semantic Router анализ
    const routingDecision = await analyzeAndRoute(message);
    console.log(`🧠 Routing decision:`, {
      complexity: routingDecision.complexity,
      strategy: routingDecision.routingStrategy,
      mode: routingDecision.routingHints?.mode,
      useNeural: routingDecision.routingHints?.useNeural
    });

    // Этап 2: Conversation Engine обработка
    const startTime = Date.now();
    const response = await conversationEngine.processUserInput(message, {
      userId,
      sessionId,
      routingHints: routingDecision.routingHints
    });
    const processingTime = Date.now() - startTime;

    console.log(`✅ Ответ сгенерирован за ${processingTime}мс`);
    console.log(`📏 Длина ответа: ${response.reply?.length || 0} символов`);

    // Возвращаем результат
    res.json({
      success: true,
      response: response.reply,
      provider: 'Hybrid-Semantic-Neural',
      confidence: response.confidence || 0.8,
      quality: response.quality || 8,
      processingTime,
      routingInfo: {
        complexity: routingDecision.complexity,
        strategy: routingDecision.routingStrategy,
        category: routingDecision.specialCategory,
        mode: routingDecision.routingHints?.mode,
        useNeural: routingDecision.routingHints?.useNeural
      }
    });

  } catch (error) {
    console.error('❌ Ошибка обработки запроса:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      provider: 'Error-Handler'
    });
  }
});

// Semantic router stats
app.get('/api/semantic-router/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalRequests: Math.floor(Math.random() * 1000),
      expressModeRequests: Math.floor(Math.random() * 400),
      standardModeRequests: Math.floor(Math.random() * 300),
      expertModeRequests: Math.floor(Math.random() * 200),
      specializedModeRequests: Math.floor(Math.random() * 100),
      averageComplexity: 0.45,
      averageProcessingTime: 1250
    }
  });
});

// Neural API endpoint
app.post('/api/neural/generate', (req, res) => {
  const { input, options = {} } = req.body;
  
  // Простая симуляция нейросетевого ответа
  const response = `Нейросетевой ответ для: "${input}". Система работает в тестовом режиме.`;
  
  res.json({
    success: true,
    response,
    tokens: response.length,
    model: 'test-neural-model',
    options
  });
});

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 HYBRID AI СЕРВЕР ЗАПУЩЕН`);
  console.log(`📡 Порт: ${PORT}`);
  console.log(`🎯 Semantic Router: активен`);
  console.log(`🧠 Conversation Engine: активен`);
  console.log(`🔗 Neural Integration: доступна`);
  console.log(`\n✅ Готов к тестированию!`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Сервер останавливается...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Сервер останавливается...');
  process.exit(0);
});