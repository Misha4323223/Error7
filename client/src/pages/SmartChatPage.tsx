import { useState, useRef, useEffect } from "react";
import BooomerangsLogo from "@/components/BooomerangsLogo";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Функция для получения иконки провайдера в метаданных
const getProviderIcon = (provider?: string) => {
  const providerName = provider?.toLowerCase() || '';
  
  switch(providerName) {
    case 'deepspeek':
      return <span className="mr-1">👨‍💻</span>;
    case 'claude':
    case 'anthropic':
      return <span className="mr-1">🪃</span>;
    case 'chatfree':
      return <span className="mr-1">💬</span>;
    case 'deepinfra':
      return <span className="mr-1">🧠</span>;
    case 'qwen':
    case 'aitianhu':
      return <span className="mr-1">🚀</span>;
    case 'ollama':
      return <span className="mr-1">🦙</span>;
    case 'phind':
      return <span className="mr-1">📚</span>;
    default:
      return <span className="mr-1">🪃</span>;
  }
};

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  provider?: string;
  model?: string;
}

export default function SmartChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [showAuth, setShowAuth] = useState(true);
  const [showNeuralDashboard, setShowNeuralDashboard] = useState(false);
  const [neuralStats, setNeuralStats] = useState<any>(null);
  const [isTraining, setIsTraining] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedUsername = localStorage.getItem('chat_username');
    if (savedUsername) {
      setUsername(savedUsername);
      setShowAuth(false);
    }
  }, []);

  const handleAuth = (name: string) => {
    setUsername(name);
    setShowAuth(false);
    localStorage.setItem('chat_username', name);
    
    // Добавляем приветственное сообщение
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: `Привет, ${name}! 🚀 Я BOOOMERANGS AI с нейросетевым ядром и Neural Dashboard!\n\n🧠 **Возможности:**\n• Transformer архитектура с Multi-Head Attention\n• Обучение на ваших данных\n• Семантический анализ\n• Векторизация изображений\n• Генерация контента\n\n💡 Нажмите "🧠 Neural Dashboard" для управления нейросетью!\n\nЧем могу помочь?`,
      isUser: false,
      timestamp: new Date(),
      status: 'sent',
      provider: 'BOOOMERANGS-Neural',
      model: 'transformer-hybrid'
    };
    
    setMessages([welcomeMessage]);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/neural/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input,
          options: {
            username: username,
            useCheckpoints: true,
            sessionId: `neural_chat_${username}_${Date.now()}`
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || '🧠 Нейросеть обрабатывает ваш запрос...',
        isUser: false,
        timestamp: new Date(),
        status: 'sent',
        provider: 'BOOOMERANGS-Neural',
        model: 'transformer-hybrid'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Извините, произошла ошибка при отправке сообщения. Пожалуйста, попробуйте снова.',
        isUser: false,
        timestamp: new Date(),
        status: 'error'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const logout = () => {
    setShowAuth(true);
    setUsername("");
    setMessages([]);
    localStorage.removeItem('chat_username');
  };

  // Функции управления нейросетью
  const loadNeuralStats = async () => {
    try {
      const response = await fetch('/api/neural/stats');
      const data = await response.json();
      if (data.success) {
        setNeuralStats(data.stats);
      }
    } catch (error) {
      console.error('Ошибка загрузки статистики нейросети:', error);
    }
  };

  const startNeuralTraining = async () => {
    try {
      setIsTraining(true);
      const response = await fetch('/api/neural/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ epochs: 3, batchSize: 4 })
      });
      
      const data = await response.json();
      if (data.success) {
        const trainingMessage: Message = {
          id: Date.now().toString(),
          text: '🔥 Обучение нейросети запущено! Epochs: 3, Batch Size: 4',
          isUser: false,
          timestamp: new Date(),
          status: 'sent',
          provider: 'BOOOMERANGS-Neural',
          model: 'training-system'
        };
        setMessages(prev => [...prev, trainingMessage]);
      }
    } catch (error) {
      console.error('Ошибка запуска обучения:', error);
    } finally {
      setIsTraining(false);
    }
  };

  const runNeuralTests = async () => {
    try {
      const response = await fetch('/api/neural/test', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        const testMessage: Message = {
          id: Date.now().toString(),
          text: `🧪 Тестирование нейросети завершено:\n\n${data.testResults.map((result: any, index: number) => 
            `${index + 1}. "${result.query}"\n${result.success ? '✅ ' + result.response : '❌ ' + result.error}`
          ).join('\n\n')}`,
          isUser: false,
          timestamp: new Date(),
          status: 'sent',
          provider: 'BOOOMERANGS-Neural',
          model: 'test-system'
        };
        setMessages(prev => [...prev, testMessage]);
      }
    } catch (error) {
      console.error('Ошибка тестирования:', error);
    }
  };

  useEffect(() => {
    if (!showAuth) {
      loadNeuralStats();
      const interval = setInterval(loadNeuralStats, 30000);
      return () => clearInterval(interval);
    }
  }, [showAuth]);

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <BooomerangsLogo className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">BOOOMERANGS Smart AI</h1>
            <p className="text-gray-600">Продвинутый чат с системой чекпоинтов</p>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get('username') as string;
            if (name.trim()) {
              handleAuth(name.trim());
            }
          }}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Введите ваше имя
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ваше имя..."
                required
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Начать чат
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Заголовок */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BooomerangsLogo />
            <div>
              <h1 className="text-xl font-semibold text-gray-800">BOOOMERANGS Smart AI</h1>
              <p className="text-sm text-gray-600">Пользователь: {username}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNeuralDashboard(!showNeuralDashboard)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                showNeuralDashboard 
                  ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              🧠 Neural Dashboard
            </button>
            <a 
              href="/checkpoints" 
              className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              Чекпоинты
            </a>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* Neural Dashboard Panel */}
      {showNeuralDashboard && (
        <div className="max-w-6xl mx-auto p-4 mb-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                🧠 Neural Network Dashboard
              </h2>
              <button
                onClick={() => setShowNeuralDashboard(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Статистика нейросети */}
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  📊 Статистика нейросети
                </h3>
                {neuralStats ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Статус:</span>
                      <span className={neuralStats.isInitialized ? 'text-green-600' : 'text-red-600'}>
                        {neuralStats.isInitialized ? '✅ Активна' : '❌ Неактивна'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Словарь:</span>
                      <span className="font-mono">{neuralStats.neural?.vocabSize || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Слоёв:</span>
                      <span className="font-mono">{neuralStats.neural?.numLayers || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attention голов:</span>
                      <span className="font-mono">{neuralStats.neural?.numHeads || 'N/A'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">Загрузка статистики...</div>
                )}
                <button
                  onClick={loadNeuralStats}
                  className="mt-3 w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  🔄 Обновить
                </button>
              </div>

              {/* Управление обучением */}
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  🔥 Обучение нейросети
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={startNeuralTraining}
                    disabled={isTraining}
                    className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm disabled:bg-gray-400"
                  >
                    {isTraining ? '⏳ Обучение...' : '🔥 Начать обучение'}
                  </button>
                  <button
                    onClick={runNeuralTests}
                    className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                  >
                    🧪 Запустить тесты
                  </button>
                </div>
              </div>

              {/* Быстрые действия */}
              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  ⚡ Быстрые действия
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setInput('Покажи статистику нейросети')}
                    className="w-full px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
                  >
                    📈 Статистика
                  </button>
                  <button
                    onClick={() => setInput('Объясни архитектуру Transformer')}
                    className="w-full px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors text-sm"
                  >
                    🏗️ Архитектура
                  </button>
                  <button
                    onClick={() => setInput('Создай изображение используя нейросеть')}
                    className="w-full px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors text-sm"
                  >
                    🎨 Генерация
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Область сообщений */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg h-[calc(100vh-200px)] flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : message.status === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {!message.isUser && message.provider && (
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      {getProviderIcon(message.provider)}
                      <span>{message.provider}</span>
                      {message.model && <span className="ml-1">({message.model})</span>}
                    </div>
                  )}
                  
                  <div className="prose prose-sm max-w-none">
                    {message.isUser ? (
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    ) : (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.text}
                      </ReactMarkdown>
                    )}
                  </div>
                  
                  <div className={`text-xs mt-2 ${
                    message.isUser ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">Печатает...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-4">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
              >
                {isLoading ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}