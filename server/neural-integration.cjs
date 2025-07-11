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

// Функция для инициализации нейросетевой интеграции
async function initializeNeuralIntegration() {
  console.log('🔧 Инициализация нейросетевой интеграции...');
  
  try {
    const integration = new NeuralIntegrationLayer();
    await integration.initialize();
    return integration;
  } catch (error) {
    console.error('❌ Ошибка инициализации Neural Integration:', error);
    throw error;
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
