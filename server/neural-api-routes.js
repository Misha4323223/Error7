/**
 * 🚀 NEURAL API ROUTES
 * REST API для управления нейросетью BOOOMERANGS
 */

const { initializeNeuralIntegration, getGlobalNeuralIntegration } = require('./neural-integration.cjs');

let neuralIntegration = null;

// Инициализация при загрузке модуля
(async () => {
  try {
    neuralIntegration = await initializeNeuralIntegration();
    console.log('🚀 Neural API готов к работе');
  } catch (error) {
    console.error('❌ Ошибка инициализации Neural API:', error);
  }
})();

// Оценка завершения Фазы 2 - вынесена из setupNeuralRoutes
function assessPhase2Completion(stats) {
  const improvements = {
    layersUpgraded: stats.neural?.numLayers >= 12,
    ropeImplemented: stats.neural?.positionEncoding?.includes('RoPE'),
    memoryOptimized: stats.neural?.memoryOptimization?.includes('Checkpointing'),
    mixedPrecision: stats.neural?.precision?.includes('Mixed')
  };

  const completedCount = Object.values(improvements).filter(Boolean).length;
  const totalCount = Object.keys(improvements).length;
  const completionPercent = Math.round((completedCount / totalCount) * 100);

  return {
    improvements,
    completed: completedCount,
    total: totalCount,
    percentage: completionPercent,
    status: completionPercent === 100 ? 'Фаза 2 завершена' : `Прогресс: ${completionPercent}%`
  };
}

function setupNeuralRoutes(app) {
  // 🧠 Генерация ответа нейросетью
  app.post('/api/neural/generate', async (req, res) => {
    try {
      const { input, options = {} } = req.body;

      if (!input) {
        return res.status(400).json({ error: 'Требуется поле input' });
      }

      if (!neuralIntegration?.isInitialized) {
        return res.status(503).json({ error: 'Нейросеть не инициализирована' });
      }

      const response = await neuralIntegration.generateHybridResponse(input, options);

      res.json({
        success: true,
        input,
        response,
        type: 'neural_hybrid',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Ошибка генерации neural response:', error);
      res.status(500).json({ 
        error: 'Ошибка генерации ответа', 
        details: error.message 
      });
    }
  });

  // 📊 Расширенная статистика нейросети
  app.get('/api/neural/stats', (req, res) => {
    try {
      const stats = neuralIntegration?.getSystemStats();

      if (!stats) {
        return res.status(503).json({ error: 'Нейросеть недоступна' });
      }

      // Добавляем информацию о новых улучшениях
      const enhancedStats = {
        ...stats,
        improvements: {
          layers: stats.neural?.numLayers >= 12 ? '✅ Увеличено до 12 слоев' : '⏳ Базовая архитектура',
          positioning: stats.neural?.positionEncoding === 'RoPE (Rotary Position Embeddings)' ? 
            '✅ RoPE включен' : '⏳ Стандартные эмбеддинги',
          memory: stats.neural?.memoryOptimization === 'Gradient Checkpointing' ? 
            '✅ Gradient checkpointing' : '⏳ Стандартная память',
          precision: stats.neural?.precision?.includes('Mixed') ? 
            '✅ Mixed precision' : '⏳ Стандартная точность'
        },
        phase2Status: assessPhase2Completion(stats)
      };

      res.json({
        success: true,
        stats: enhancedStats,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Ошибка получения neural stats:', error);
      res.status(500).json({ 
        error: 'Ошибка получения статистики', 
        details: error.message 
      });
    }
  });

  // 🔥 Обучение нейросети
  app.post('/api/neural/train', async (req, res) => {
    try {
      const { epochs = 3, batchSize = 4 } = req.body;

      if (!neuralIntegration?.isInitialized) {
        return res.status(503).json({ error: 'Нейросеть не инициализирована' });
      }

      // Запускаем обучение асинхронно
      const trainingPromise = neuralIntegration.trainNeuralNetwork({
        epochs,
        batchSize
      });

      res.json({
        success: true,
        message: 'Обучение запущено',
        epochs,
        batchSize,
        timestamp: new Date().toISOString()
      });

      // Обучение продолжается в фоне
      trainingPromise.then(() => {
        console.log('✅ Обучение нейросети завершено');
      }).catch(error => {
        console.error('❌ Ошибка обучения:', error);
      });

    } catch (error) {
      console.error('❌ Ошибка запуска обучения:', error);
      res.status(500).json({ error: 'Ошибка запуска обучения' });
    }
  });

  // 📝 Добавление примера для обучения
  app.post('/api/neural/training-example', async (req, res) => {
    try {
      const { query, response, metadata = {} } = req.body;

      if (!query || !response) {
        return res.status(400).json({ error: 'Требуются поля query и response' });
      }

      if (!neuralIntegration?.isInitialized) {
        return res.status(503).json({ error: 'Нейросеть не инициализирована' });
      }

      const success = await neuralIntegration.addTrainingExample(query, response, metadata);

      res.json({
        success,
        message: success ? 'Пример добавлен' : 'Не удалось добавить пример',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Ошибка добавления примера:', error);
      res.status(500).json({ error: 'Ошибка добавления примера' });
    }
  });

  // 🎯 Тест нейросети
  app.post('/api/neural/test', async (req, res) => {
    try {
      const testQueries = [
        "Привет, как дела?",
        "Что такое BOOOMERANGS?",
        "Создай изображение кота",
        "Векторизуй картинку",
        "Помоги с дизайном"
      ];

      if (!neuralIntegration?.isInitialized) {
        return res.status(503).json({ error: 'Нейросеть не инициализирована' });
      }

      const results = [];

      for (const query of testQueries) {
        try {
          const response = await neuralIntegration.generateHybridResponse(query);
          results.push({
            query,
            response,
            success: true
          });
        } catch (error) {
          results.push({
            query,
            error: error.message,
            success: false
          });
        }
      }

      res.json({
        success: true,
        testResults: results,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Ошибка тестирования:', error);
      res.status(500).json({ error: 'Ошибка тестирования' });
    }
  });

  // 🔄 Рестарт нейросети
  app.post('/api/neural/restart', async (req, res) => {
    try {
      if (neuralIntegration) {
        await neuralIntegration.shutdown();
      }

      neuralIntegration = await initializeNeuralIntegration();

      res.json({
        success: true,
        message: 'Нейросеть перезапущена',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Ошибка рестарта нейросети:', error);
      res.status(500).json({ error: 'Ошибка рестарта нейросети' });
    }
  });

  console.log('🔗 Neural API routes настроены');
}

module.exports = { setupNeuralRoutes };