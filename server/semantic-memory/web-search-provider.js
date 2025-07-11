/**
 * Web Search Provider - Заглушка для внешнего поиска
 * Пока нет доступа к внешним источникам, используем локальные знания
 */

class WebSearchProvider {
  constructor() {
    this.isOnline = false;
    this.searchAttempts = 0;
  }

  /**
   * Поиск информации через внешние источники
   */
  async search(query, options = {}) {
    this.searchAttempts++;
    
    try {
      // Пытаемся использовать внешний интегратор знаний
      const { enrichWithExternalKnowledge } = require('./external-knowledge-integrator.cjs');
      
      const enrichmentResult = await enrichWithExternalKnowledge(query, {
        includeAdvancedSearch: true,
        maxResults: options.maxResults || 5
      });

      if (enrichmentResult.error) {
        throw new Error(enrichmentResult.error);
      }

      // Формируем результаты из всех источников
      const results = [];
      
      // Добавляем результаты Wikipedia
      if (enrichmentResult.wikipediaResults?.articles) {
        enrichmentResult.wikipediaResults.articles.forEach(article => {
          results.push({
            title: article.title,
            snippet: article.snippet,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`,
            source: 'wikipedia',
            relevance: article.relevanceScore || 0.5
          });
        });
      }

      // Добавляем научные статьи
      if (enrichmentResult.scientificResults?.papers) {
        enrichmentResult.scientificResults.papers.forEach(paper => {
          results.push({
            title: paper.title,
            snippet: paper.summary?.substring(0, 200) + '...',
            url: `https://arxiv.org/abs/${paper.id || ''}`,
            source: 'arxiv',
            relevance: 0.8
          });
        });
      }

      // Добавляем результаты расширенного поиска
      if (enrichmentResult.searchResults) {
        enrichmentResult.searchResults.forEach(result => {
          results.push({
            title: result.title || 'Внешний источник',
            snippet: result.snippet || result.content?.substring(0, 200) + '...',
            url: result.url || '#',
            source: 'external_search',
            relevance: result.relevance || 0.6
          });
        });
      }

      this.isOnline = true;
      
      return {
        success: true,
        query: query,
        results: results.slice(0, options.maxResults || 10),
        source: "external_knowledge",
        totalSources: results.length,
        processingTime: enrichmentResult.processingTime || 0
      };

    } catch (error) {
      console.error('Ошибка внешнего поиска:', error.message);
      
      this.isOnline = false;
      
      return {
        success: false,
        error: `Внешний поиск временно недоступен: ${error.message}`,
        query: query,
        results: [],
        source: "local_fallback"
      };
    }
  }

  /**
   * Проверка доступности внешнего поиска
   */
  async isAvailable() {
    try {
      // Проверяем доступность интегратора внешних знаний
      const { getSystemStatistics } = require('./external-knowledge-integrator.cjs');
      const stats = getSystemStatistics();
      
      // Считаем доступным, если система инициализирована
      return stats.initialized === true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Получение статистики поиска
   */
  getStats() {
    return {
      attempts: this.searchAttempts,
      online: this.isOnline,
      status: "offline"
    };
  }
}

module.exports = new WebSearchProvider();