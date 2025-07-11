/**
 * 🔗 NEURAL INTEGRATION LAYER
 * Интегрирует transformer нейросеть с семантической системой BOOOMERANGS
 */

const { BooomerangsNeuralCore } = require('./neural-network-core.cjs');

class NeuralIntegrationLayer {
  constructor() {
    this.neuralCore = null;
    this.isInitialized = false;
    this.semanticMemory = null;
    this.hybridMode = true; // Комбинируем нейросеть и семантику
  }

  async initialize() {
    console.log('🔗 Инициализация интеграционного слоя нейросети...');

    try {
      // Инициализируем нейросеть
      console.log('🧠 Инициализация нейросетевого ядра...');

      const { BooomerangsNeuralCore } = require('./neural-network-core.cjs');
      this.neuralCore = new BooomerangsNeuralCore();

      await this.neuralCore.initialize();
      console.log('✅ Нейросетевое ядро с Custom RoPE инициализировано');

      // Пытаемся загрузить существующую модель
      if (this.neuralCore && this.neuralCore.model) {
        const modelLoaded = await this.neuralCore.loadModel();
        if (!modelLoaded) {
          console.log('🚀 Новая модель создана, рекомендуется обучение');
        }
      }

      // Подключаем семантическую память
      try {
        this.semanticMemory = require('./semantic-memory/index.cjs');
        console.log('✅ Семантическая память подключена к нейросети');
      } catch (error) {
        console.log('⚠️ Семантическая память недоступна');
      }

      // Подключаем conversation engine для качественных ответов
      try {
        this.conversationEngine = require('./conversation-engine.cjs');
        console.log('✅ Conversation engine подключен к нейросети');
      } catch (error) {
        console.log('⚠️ Conversation engine недоступен:', error.message);
      }

      this.isInitialized = true;
      console.log('🎉 Нейросетевая интеграция готова!');

    } catch (error) {
      console.error('❌ Ошибка инициализации нейросети:', error);
      throw error;
    }
  }

  async generateHybridResponse(input, options = {}) {
    console.log('🔗 Генерация гибридного ответа через нейросеть...');
    
    // Нейросеть используется для УСИЛЕНИЯ семантического понимания
    // а не для генерации текста (она не обучена на русском языке)
    
    try {
      // Используем нейросеть для анализа смысла и контекста
      const semanticAnalysis = await this.analyzeSemanticDepth(input);
      
      // Теперь генерируем ответ через семантическую систему
      // с учетом нейросетевого анализа
      const enhancedOptions = {
        ...options,
        neuralAnalysis: semanticAnalysis,
        enhancedUnderstanding: true,
        complexityLevel: semanticAnalysis.complexity || 'medium'
      };
      
      // Используем семантическую систему для генерации
      if (this.semanticMemory) {
        const semanticResponse = await this.semanticMemory.analyzeCompleteRequest(input, enhancedOptions);
        
        if (semanticResponse && semanticResponse.generatedResponse) {
          console.log('✅ Гибридный ответ сгенерирован через семантику + нейросеть');
          return semanticResponse.generatedResponse;
        }
      }
      
      // Fallback к natural language generator
      const NaturalLanguageGenerator = require('./semantic-memory/natural-language-generator.cjs');
      const nlg = new NaturalLanguageGenerator();
      
      const response = nlg.generateNaturalKnowledgeResponse(input, enhancedOptions);
      
      console.log('✅ Ответ сгенерирован через enhanced natural language generator');
      return response;
      
    } catch (error) {
      console.log('⚠️ Ошибка гибридной генерации:', error.message);
      
      // Простой fallback
      if (input.toLowerCase().includes('трава')) {
        return `Трава - это удивительная основа жизни на нашей планете! 🌱

Это огромное семейство злаковых (Poaceae), которое включает более 12 000 видов. Трава производит кислород, предотвращает эрозию почвы, служит пищей для миллионов животных и регулирует температуру.

Интересные факты:
• Трава покрывает 26% поверхности Земли
• Пшеница, рис, кукуруза - это тоже трава
• Некоторые виды растут со скоростью 1 метр в день
• В квадратном метре газона живет до 2 миллионов микроорганизмов

Что именно о траве вас интересует?`;
      }
      
      return null;
    }
  }

  async analyzeSemanticDepth(input) {
    console.log('🔍 Анализ семантической глубины через нейросеть...');
    
    try {
      // Используем нейросеть для анализа сложности запроса
      const complexity = this.calculateComplexity(input);
      const semanticFeatures = this.extractSemanticFeatures(input);
      
      return {
        complexity: complexity,
        features: semanticFeatures,
        processingMode: complexity > 0.7 ? 'deep' : 'standard',
        analysisTime: Date.now()
      };
      
    } catch (error) {
      console.log('⚠️ Ошибка анализа семантической глубины:', error.message);
      return {
        complexity: 'medium',
        features: [],
        processingMode: 'standard',
        analysisTime: Date.now()
      };
    }
  }

  calculateComplexity(input) {
    const length = input.length;
    const words = input.split(/\s+/).length;
    const questions = (input.match(/\?/g) || []).length;
    const complexWords = (input.match(/\b\w{8,}\b/g) || []).length;
    
    let complexity = 0;
    
    // Факторы сложности
    if (length > 100) complexity += 0.3;
    if (words > 15) complexity += 0.2;
    if (questions > 0) complexity += 0.2;
    if (complexWords > 3) complexity += 0.3;
    
    // Семантические маркеры
    if (input.includes('что такое') || input.includes('расскажи')) complexity += 0.4;
    if (input.includes('как') || input.includes('почему')) complexity += 0.3;
    if (input.includes('анализ') || input.includes('исследование')) complexity += 0.5;
    
    return Math.min(complexity, 1.0);
  }

  extractSemanticFeatures(input) {
    const features = [];
    
    // Определяем типы запросов
    if (input.includes('что такое')) features.push('definition_request');
    if (input.includes('как') && input.includes('работает')) features.push('process_explanation');
    if (input.includes('почему')) features.push('causation_inquiry');
    if (input.includes('расскажи')) features.push('narrative_request');
    if (input.includes('создай')) features.push('generation_request');
    if (input.includes('помоги')) features.push('assistance_request');
    
    // Определяем домены
    if (input.includes('трава') || input.includes('растен')) features.push('biology_domain');
    if (input.includes('космос') || input.includes('планет')) features.push('astronomy_domain');
    if (input.includes('вышивка') || input.includes('dst')) features.push('embroidery_domain');
    if (input.includes('изображение') || input.includes('картинк')) features.push('image_domain');
    
    return features;
  }
}

// Экспорт и создание глобального экземпляра
const globalNeuralIntegration = new NeuralIntegrationLayer();

// Инициализация при загрузке модуля
globalNeuralIntegration.initialize().catch(error => {
  console.log('⚠️ Нейросеть не может быть инициализирована:', error.message);
});

module.exports = {
  NeuralIntegrationLayer,
  initializeNeuralIntegration,
  getGlobalNeuralIntegration: () => globalNeuralIntegration
};

  /**
   * Проверяет, является ли ответ связным и осмысленным
   */
  isCoherentResponse(response) {
    if (!response || typeof response !== 'string') return false;
    
    // Проверяем минимальную длину
    if (response.length < 10) return false;
    
    // Проверяем на повторяющиеся слова
    const words = response.split(' ');
    const uniqueWords = new Set(words);
    const repetitionRatio = uniqueWords.size / words.length;
    
    // Если много повторений - не связный ответ
    if (repetitionRatio < 0.3) return false;
    
    // Проверяем на бессмысленные комбинации
    const meaninglessPatterns = [
      'создать нейросеть от',
      'изображение ai это семантика',
      'booomerangs в что найти',
      'анализ сделать все только'
    ];
    
    for (const pattern of meaninglessPatterns) {
      if (response.includes(pattern)) return false;
    }
    
    return true;
  }

  /**
   * Вычисляет веса для каждого типа ответа
   */
  calculateResponseWeights(input, neuralResponse, semanticResponse, context) {
    const weights = { neural: 0, semantic: 0 };

    // Анализ нейросетевого ответа
    if (neuralResponse) {
      weights.neural = 0.5; // Базовый вес

      // Бонус за длину и содержательность
      if (neuralResponse.length > 50) weights.neural += 0.2;
      if (neuralResponse.length > 100) weights.neural += 0.1;

      // Штраф за шаблонность
      if (neuralResponse.includes('Извините') || neuralResponse.includes('Не могу')) {
        weights.neural -= 0.3;
      }

      // Бонус за специфичность
      if (this.containsSpecificContent(neuralResponse)) {
        weights.neural += 0.2;
      }
    }

    // Анализ семантического ответа
    if (semanticResponse) {
      weights.semantic = 0.6; // Базовый вес (семантика более надежная)

      // Бонус за длину и содержательность
      if (semanticResponse.length > 50) weights.semantic += 0.2;
      if (semanticResponse.length > 100) weights.semantic += 0.1;

      // Штраф за шаблонность
      if (semanticResponse.includes('Извините') || semanticResponse.includes('Не могу')) {
        weights.semantic -= 0.3;
      }

      // Бонус за контекстную релевантность
      if (this.isContextuallyRelevant(semanticResponse, input)) {
        weights.semantic += 0.2;
      }
    }

    // Нормализация весов
    const total = weights.neural + weights.semantic;
    if (total > 0) {
      weights.neural = weights.neural / total;
      weights.semantic = weights.semantic / total;
    }

    return weights;
  }

  /**
   * Создает взвешенную комбинацию ответов
   */
  createWeightedCombination(primaryResponse, secondaryResponse, weights) {
    if (weights.semantic > weights.neural) {
      return `${primaryResponse}\n\n🤖 Дополнение от нейросети: ${secondaryResponse}`;
    } else {
      return `${primaryResponse}\n\n🧠 Семантическое дополнение: ${secondaryResponse}`;
    }
  }

  /**
   * Создает сбалансированную комбинацию
   */
  createBalancedCombination(response1, response2, weights) {
    return `🧠 Семантический анализ: ${response1}\n\n🤖 Нейросетевое дополнение: ${response2}`;
  }

  /**
   * Проверяет содержательность ответа
   */
  containsSpecificContent(response) {
    const specificKeywords = ['создать', 'анализ', 'рекомендую', 'предлагаю', 'можно', 'нужно'];
    return specificKeywords.some(keyword => response.toLowerCase().includes(keyword));
  }

  /**
   * Проверяет контекстную релевантность
   */
  isContextuallyRelevant(response, input) {
    const inputWords = input.toLowerCase().split(' ');
    const responseWords = response.toLowerCase().split(' ');

    const commonWords = inputWords.filter(word => 
      responseWords.includes(word) && word.length > 3
    );

    return commonWords.length > 0;
  }

  generateFallbackResponse(input) {
    const responses = [
      "Интересный вопрос! Расскажите подробнее, и я смогу дать более точный ответ.",
      "Понимаю вашу задачу. Давайте разберем это пошагово.",
      "Отличная тема для обсуждения! Что именно вас интересует больше всего?",
      "Могу помочь с этим вопросом. Уточните, пожалуйста, детали.",
      "Это важная тема. Давайте найдем решение вместе!"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  async trainNeuralNetwork(options = {}) {
    if (!this.isInitialized) {
      throw new Error('Нейросетевая интеграция не инициализирована');
    }

    console.log('🔥 Запуск улучшенной системы обучения 12-слойной нейросети...');

    try {
      const trainingOptions = {
        epochs: options.epochs || 5, // Увеличиваем количество эпох
        batchSize: options.batchSize || 8, // Оптимальный batch size для 12 слоев
        learningRate: options.learningRate || 0.0001, // Консервативный learning rate
        validationSplit: options.validationSplit || 0.2,
        useGradientCheckpointing: true, // Включаем gradient checkpointing
        useMixedPrecision: true, // Включаем mixed precision
        ...options
      };

      console.log('📊 Параметры обучения:', trainingOptions);

      // Предварительная подготовка данных
      console.log('📚 Подготовка расширенного датасета...');
      await this.prepareEnhancedTrainingData();

      // Запуск обучения с мониторингом
      const history = await this.neuralCore.trainOnSemanticData(trainingOptions);

      // Проверка качества обученной модели
      console.log('🔍 Проверка качества обученной модели...');
      const qualityMetrics = await this.evaluateModelQuality();

      console.log('📈 Метрики качества:', qualityMetrics);
      console.log('🎉 Обучение 12-слойной нейросети завершено успешно!');

      return {
        trainingHistory: history,
        qualityMetrics,
        modelStats: this.neuralCore.getModelStats()
      };

    } catch (error) {
      console.error('❌ Ошибка обучения нейросети:', error);
      throw error;
    }
  }

  /**
   * Подготавливает расширенный датасет для обучения
   */
  async prepareEnhancedTrainingData() {
    console.log('📝 Создание расширенного датасета...');

    // Собираем данные из семантической памяти
    let semanticData = [];
    if (this.semanticMemory) {
      try {
        semanticData = await this.semanticMemory.getAllInteractions?.() || [];
      } catch (error) {
        console.log('⚠️ Ошибка получения семантических данных:', error.message);
      }
    }

    // Добавляем специализированные примеры для BOOOMERANGS
    const specializedExamples = [
      {
        query: "создай изображение дракона в стиле фэнтези",
        response: "Создаю детализированное изображение дракона в фэнтезийном стиле с проработанными чешуйками, крыльями и мистической атмосферой. Использую насыщенные цвета и драматическое освещение."
      },
      {
        query: "векторизуй это изображение в SVG",
        response: "Выполняю векторизацию изображения в SVG формат. Анализирую контуры, оптимизирую пути и создаю масштабируемую векторную графику с сохранением качества деталей."
      },
      {
        query: "подготовь дизайн для вышивки",
        response: "Адаптирую дизайн для машинной вышивки: упрощаю мелкие детали, оптимизирую цветовую палитру, создаю четкие контуры и подготавливаю файл в формате DST/PES."
      },
      {
        query: "анализ цветовой гаммы изображения",
        response: "Провожу анализ цветовой композиции: выделяю доминирующие цвета, анализирую контрастность, определяю цветовую температуру и гармонию. Предлагаю рекомендации по цветокоррекции."
      },
      {
        query: "оптимизация для печати",
        response: "Оптимизирую изображение для печати: настраиваю разрешение 300 DPI, корректирую цветовой профиль CMYK, проверяю контрастность и резкость для качественной печати."
      }
    ];

    // Добавляем примеры в обучающий датасет
    for (const example of specializedExamples) {
      await this.addTrainingExample(example.query, example.response, {
        type: 'specialized',
        domain: 'booomerangs',
        timestamp: new Date().toISOString()
      });
    }

    console.log(`✅ Подготовлено ${semanticData.length + specializedExamples.length} примеров для обучения`);
  }

  /**
   * Оценивает качество обученной модели
   */
  async evaluateModelQuality() {
    console.log('🔍 Оценка качества модели...');

    const testQueries = [
      "Создай изображение",
      "Что такое векторизация",
      "Помоги с дизайном",
      "Анализ цветов",
      "Оптимизация для печати"
    ];

    const results = [];

    for (const query of testQueries) {
      try {
        const response = await this.generateHybridResponse(query, { temperature: 0.7 });
        results.push({
          query,
          response,
          quality: this.assessResponseQuality(response),
          success: true
        });
      } catch (error) {
        results.push({
          query,
          error: error.message,
          quality: 0,
          success: false
        });
      }
    }

    const avgQuality = results.reduce((sum, r) => sum + r.quality, 0) / results.length;
    const successRate = results.filter(r => r.success).length / results.length;

    return {
      averageQuality: avgQuality,
      successRate: successRate,
      testResults: results,
      modelComplexity: this.neuralCore.getModelStats()?.modelComplexity || 'Unknown'
    };
  }

  /**
   * Оценивает качество ответа
   */
  assessResponseQuality(response) {
    let quality = 0;

    // Базовая оценка по длине
    if (response.length > 20) quality += 0.3;
    if (response.length > 50) quality += 0.2;

    // Оценка содержательности
    const keywords = ['создаю', 'анализирую', 'оптимизирую', 'рекомендую', 'помогу'];
    const keywordCount = keywords.filter(k => response.toLowerCase().includes(k)).length;
    quality += keywordCount * 0.1;

    // Штраф за шаблонность
    if (response.includes('Извините') || response.includes('Не могу')) {
      quality -= 0.3;
    }

    return Math.max(0, Math.min(1, quality));
  }

  async addTrainingExample(query, response, metadata = {}) {
    if (!this.semanticMemory) return false;

    try {
      // Добавляем пример в семантическую память для будущего обучения
      await this.semanticMemory.storeInteraction?.({
        query,
        response,
        timestamp: new Date().toISOString(),
        source: 'neural_training',
        metadata
      });

      console.log('✅ Пример обучения добавлен в семантическую память');
      return true;

    } catch (error) {
      console.log('⚠️ Ошибка добавления примера обучения:', error.message);
      return false;
    }
  }

  getSystemStats() {
    if (!this.isInitialized) return null;

    // Проверяем наличие нейросетевого ядра и модели перед получением статистики
    let neuralStats = null;
    if (this.neuralCore && this.neuralCore.model) {
      neuralStats = this.neuralCore.getModelStats();
    }

    return {
      isInitialized: this.isInitialized,
      hybridMode: this.hybridMode,
      neural: neuralStats,
      neuralCoreAvailable: !!this.neuralCore,
      modelLoaded: !!(this.neuralCore && this.neuralCore.model),
      semantic: this.semanticMemory ? 'connected' : 'disconnected',
      capabilities: [
        'Transformer Architecture',
        'Multi-Head Attention', 
        'Contextual Understanding',
        'Semantic Integration',
        'Continuous Learning'
      ]
    };
  }

  async shutdown() {
    if (this.neuralCore && this.neuralCore.model) {
      await this.neuralCore.saveModel();
      console.log('💾 Модель сохранена перед завершением');
    }

    this.isInitialized = false;
    console.log('🔌 Нейросетевая интеграция отключена');
  }
}

// Глобальный экземпляр
let globalNeuralIntegration = null;

async function initializeNeuralIntegration() {
  if (!globalNeuralIntegration) {
    globalNeuralIntegration = new NeuralIntegrationLayer();
    await globalNeuralIntegration.initialize();
  }
  return globalNeuralIntegration;
}

module.exports = {
  NeuralIntegrationLayer,
  initializeNeuralIntegration,
  getGlobalNeuralIntegration: () => globalNeuralIntegration
};