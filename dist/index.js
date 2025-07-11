var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  WSEventType: () => WSEventType,
  aiMessages: () => aiMessages,
  aiMessagesRelations: () => aiMessagesRelations,
  authSchema: () => authSchema,
  chatSessions: () => chatSessions,
  chatSessionsRelations: () => chatSessionsRelations,
  emailNotifications: () => emailNotifications,
  emotionalHistory: () => emotionalHistory,
  emotionalHistoryOld: () => emotionalHistoryOld,
  emotionalHistoryRelations: () => emotionalHistoryRelations,
  insertAiMessageSchema: () => insertAiMessageSchema,
  insertChatSessionSchema: () => insertChatSessionSchema,
  insertEmailNotificationSchema: () => insertEmailNotificationSchema,
  insertEmotionalHistorySchema: () => insertEmotionalHistorySchema,
  insertLearningPatternSchema: () => insertLearningPatternSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertProjectMemorySchema: () => insertProjectMemorySchema,
  insertReportLogSchema: () => insertReportLogSchema,
  insertReportTemplateSchema: () => insertReportTemplateSchema,
  insertSupplierSchema: () => insertSupplierSchema,
  insertUserProfileSchema: () => insertUserProfileSchema,
  insertUserSchema: () => insertUserSchema,
  learningPatterns: () => learningPatterns,
  learningPatternsOld: () => learningPatternsOld,
  learningPatternsRelations: () => learningPatternsRelations,
  messageSchema: () => messageSchema,
  messages: () => messages,
  projectMemory: () => projectMemory,
  projectMemoryOld: () => projectMemoryOld,
  projectMemoryRelations: () => projectMemoryRelations,
  reportLogs: () => reportLogs,
  reportTemplates: () => reportTemplates,
  semanticCache: () => semanticCache,
  suppliers: () => suppliers,
  userProfiles: () => userProfiles,
  userProfilesOld: () => userProfilesOld,
  userProfilesRelations: () => userProfilesRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  token: text("token").unique(),
  isOnline: boolean("is_online").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true
});
var messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
  text: text("text").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  status: text("status").notNull().default("sent")
});
var insertMessageSchema = createInsertSchema(messages).pick({
  senderId: true,
  receiverId: true,
  text: true
});
var userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  favoriteColors: text("favorite_colors").array(),
  preferredStyles: text("preferred_styles").array(),
  designComplexity: text("design_complexity").default("medium"),
  totalInteractions: integer("total_interactions").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var learningPatterns = pgTable("learning_patterns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  pattern: text("pattern").notNull(),
  category: text("category").notNull(),
  confidence: integer("confidence").default(50),
  successRate: integer("success_rate").default(0),
  timesUsed: integer("times_used").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var projectMemory = pgTable("project_memory", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  sessionId: text("session_id").notNull(),
  projectTitle: text("project_title").notNull(),
  projectType: text("project_type").notNull(),
  description: text("description"),
  domain: text("domain").default("general"),
  semanticTags: text("semantic_tags").array(),
  concepts: text("concepts").array(),
  originalQuery: text("original_query"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var emotionalHistory = pgTable("emotional_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  sessionId: text("session_id").notNull(),
  emotionalState: text("emotional_state").notNull(),
  dominantEmotion: text("dominant_emotion"),
  confidence: integer("confidence").default(50),
  context: text("context"),
  timestamp: timestamp("timestamp").defaultNow().notNull()
});
var semanticCache = pgTable("semantic_cache", {
  id: serial("id").primaryKey(),
  queryHash: text("query_hash").notNull().unique(),
  queryText: text("query_text").notNull(),
  semanticResult: text("semantic_result").notNull(),
  confidence: integer("confidence").default(50),
  category: text("category"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id]
  })
}));
var learningPatternsRelations = relations(learningPatterns, ({ one }) => ({
  user: one(users, {
    fields: [learningPatterns.userId],
    references: [users.id]
  })
}));
var projectMemoryRelations = relations(projectMemory, ({ one }) => ({
  user: one(users, {
    fields: [projectMemory.userId],
    references: [users.id]
  })
}));
var emotionalHistoryRelations = relations(emotionalHistory, ({ one }) => ({
  user: one(users, {
    fields: [emotionalHistory.userId],
    references: [users.id]
  })
}));
var chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").default(1),
  // Убираем внешний ключ для простоты
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var aiMessages = pgTable("ai_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => chatSessions.id).notNull(),
  content: text("content").notNull(),
  sender: text("sender").notNull(),
  // 'user' or 'ai'
  provider: text("provider"),
  // AI provider used
  model: text("model"),
  // AI model used
  category: text("category"),
  // message category
  confidence: text("confidence"),
  // AI confidence score
  imageUrl: text("image_url"),
  // attached image if any
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertAiMessageSchema = createInsertSchema(aiMessages).omit({
  id: true,
  createdAt: true
});
var WSEventType = /* @__PURE__ */ ((WSEventType2) => {
  WSEventType2["AUTH"] = "auth";
  WSEventType2["MESSAGE"] = "message";
  WSEventType2["USER_CONNECTED"] = "user_connected";
  WSEventType2["USER_DISCONNECTED"] = "user_disconnected";
  WSEventType2["ERROR"] = "error";
  return WSEventType2;
})(WSEventType || {});
var usersRelations = relations(users, ({ many }) => ({
  chatSessions: many(chatSessions)
}));
var chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [chatSessions.userId],
    references: [users.id]
  }),
  aiMessages: many(aiMessages)
}));
var aiMessagesRelations = relations(aiMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [aiMessages.sessionId],
    references: [chatSessions.id]
  })
}));
var suppliers = pgTable("suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  // streetwear, accessories, shoes, etc.
  contactPerson: text("contact_person"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  city: text("city"),
  country: text("country").default("\u0420\u043E\u0441\u0441\u0438\u044F"),
  website: text("website"),
  telegram: text("telegram"),
  whatsapp: text("whatsapp"),
  specialization: text("specialization"),
  // худи, кроссовки, кепки, etc.
  brands: text("brands").array(),
  // какие бренды поставляет
  minOrder: text("min_order"),
  // минимальный заказ
  paymentTerms: text("payment_terms"),
  // условия оплаты
  deliveryTime: text("delivery_time"),
  // время доставки
  notes: text("notes"),
  rating: text("rating").default("\u2B50\u2B50\u2B50"),
  // рейтинг поставщика
  status: text("status").default("active"),
  // active, inactive
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var reportTemplates = pgTable("report_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  reportType: text("report_type").notNull(),
  // "daily", "weekly", "monthly", "usage", "errors"
  schedule: text("schedule").notNull(),
  // cron format
  isActive: boolean("is_active").default(true).notNull(),
  emailRecipients: text("email_recipients").array(),
  // список email для отправки
  lastRun: timestamp("last_run"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var reportLogs = pgTable("report_logs", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id").references(() => reportTemplates.id).notNull(),
  reportData: text("report_data").notNull(),
  // JSON с данными отчета
  status: text("status").notNull(),
  // "success", "failed", "sending"
  emailsSent: integer("emails_sent").default(0),
  errorMessage: text("error_message"),
  generatedAt: timestamp("generated_at").defaultNow().notNull()
});
var emailNotifications = pgTable("email_notifications", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  // "report", "error", "system"
  recipient: text("recipient").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  status: text("status").notNull().default("pending"),
  // "pending", "sent", "failed"
  reportLogId: integer("report_log_id").references(() => reportLogs.id),
  sentAt: timestamp("sent_at"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertReportTemplateSchema = createInsertSchema(reportTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertReportLogSchema = createInsertSchema(reportLogs).omit({
  id: true,
  generatedAt: true
});
var insertEmailNotificationSchema = createInsertSchema(emailNotifications).omit({
  id: true,
  createdAt: true
});
var userProfilesOld = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  // Коммуникационные предпочтения
  communicationStyle: text("communication_style").default("friendly"),
  // formal, friendly, brief, detailed
  preferredLanguage: text("preferred_language").default("ru"),
  responseLength: text("response_length").default("medium"),
  // short, medium, detailed
  // Дизайн предпочтения  
  favoriteColors: text("favorite_colors").array(),
  // предпочитаемые цвета
  preferredStyles: text("preferred_styles").array(),
  // minimalist, vintage, modern, etc.
  designComplexity: text("design_complexity").default("medium"),
  // simple, medium, complex
  // Эмоциональный профиль
  emotionalTone: text("emotional_tone").default("neutral"),
  // enthusiastic, calm, professional
  feedbackStyle: text("feedback_style").default("encouraging"),
  // direct, encouraging, detailed
  // Обучение и адаптация
  learningProgress: text("learning_progress").default("{}"),
  // JSON с прогрессом обучения
  successPatterns: text("success_patterns").default("{}"),
  // JSON с успешными паттернами
  // Метаданные
  totalInteractions: integer("total_interactions").default(0),
  lastActive: timestamp("last_active").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var projectMemoryOld = pgTable("project_memory", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sessionId: integer("session_id").references(() => chatSessions.id),
  // Основная информация о проекте
  projectType: text("project_type").notNull(),
  // logo, print, embroidery, character, etc.
  projectTitle: text("project_title").notNull(),
  description: text("description"),
  // Семантические теги и контекст
  semanticTags: text("semantic_tags").array(),
  // извлеченные семантические теги
  concepts: text("concepts").array(),
  // основные концепции проекта
  domain: text("domain"),
  // branding, apparel, textile, etc.
  // История развития проекта
  evolutionStages: text("evolution_stages").default("{}"),
  // JSON с этапами развития
  artifacts: text("artifacts").array(),
  // созданные артефакты (URLs, file paths)
  nextStepsPredictions: text("next_steps_predictions").default("{}"),
  // JSON предсказаний
  // Пользовательский контекст
  userIntent: text("user_intent"),
  // основное намерение пользователя
  satisfactionLevel: integer("satisfaction_level"),
  // 1-10 оценка удовлетворенности
  completionStatus: text("completion_status").default("active"),
  // active, completed, abandoned
  // Временные метки
  startedAt: timestamp("started_at").defaultNow().notNull(),
  lastWorkedOn: timestamp("last_worked_on").defaultNow(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var learningPatternsOld = pgTable("learning_patterns", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  // Тип паттерна
  patternType: text("pattern_type").notNull(),
  // request_pattern, success_flow, preference_pattern
  category: text("category"),
  // image_generation, vectorization, consultation, etc.
  // Паттерн данных
  inputPattern: text("input_pattern").notNull(),
  // что пользователь обычно просит
  contextPattern: text("context_pattern").default("{}"),
  // в каком контексте
  responsePattern: text("response_pattern").default("{}"),
  // что работает лучше всего
  // Метрики успеха
  successRate: integer("success_rate").default(0),
  // процент успешности 0-100
  usageCount: integer("usage_count").default(1),
  // сколько раз встречался
  lastSuccess: timestamp("last_success"),
  // Обучение
  confidence: integer("confidence").default(50),
  // уверенность в паттерне 0-100
  adaptationData: text("adaptation_data").default("{}"),
  // данные для адаптации
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var emotionalHistoryOld = pgTable("emotional_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sessionId: integer("session_id").references(() => chatSessions.id),
  messageId: integer("message_id").references(() => aiMessages.id),
  // Эмоциональный анализ
  detectedEmotion: text("detected_emotion"),
  // joy, frustration, excitement, etc.
  emotionConfidence: integer("emotion_confidence"),
  // 0-100
  emotionIntensity: integer("emotion_intensity"),
  // 1-10
  // Контекст
  triggerContext: text("trigger_context"),
  // что вызвало эмоцию
  responseAdjustment: text("response_adjustment"),
  // как была скорректирована реакция
  // Результат
  satisfactionChange: integer("satisfaction_change"),
  // изменение удовлетворенности -10 до +10
  followupNeeded: boolean("followup_needed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserProfileSchema = createInsertSchema(userProfilesOld).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertProjectMemorySchema = createInsertSchema(projectMemoryOld).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertLearningPatternSchema = createInsertSchema(learningPatternsOld).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertEmotionalHistorySchema = createInsertSchema(emotionalHistoryOld).omit({
  id: true,
  createdAt: true
});
var authSchema = z.object({
  token: z.string().min(1, "Access token is required")
});
var messageSchema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
  receiverId: z.number()
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 3e4,
  connectionTimeoutMillis: 1e4,
  ssl: true
});
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, or, desc, gte } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async getUserByToken(token) {
    if (!token) return void 0;
    const [user] = await db.select().from(users).where(eq(users.token, token));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async getAllUsers() {
    return await db.select().from(users);
  }
  async setUserOnlineStatus(id, isOnline) {
    const [user] = await db.update(users).set({ isOnline }).where(eq(users.id, id)).returning();
    return user || void 0;
  }
  // Message methods
  async createMessage(insertMessage) {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
  async getMessageById(id) {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message || void 0;
  }
  async getMessagesBetweenUsers(userId1, userId2) {
    return await db.select().from(messages).where(
      or(
        and(eq(messages.senderId, userId1), eq(messages.receiverId, userId2)),
        and(eq(messages.senderId, userId2), eq(messages.receiverId, userId1))
      )
    ).orderBy(messages.timestamp);
  }
  // Chat session methods
  async createChatSession(insertSession) {
    const [session] = await db.insert(chatSessions).values(insertSession).returning();
    return session;
  }
  async getChatSession(id) {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.id, id));
    return session || void 0;
  }
  async getAllChatSessions(userId) {
    if (userId) {
      return await db.select().from(chatSessions).where(eq(chatSessions.userId, userId)).orderBy(desc(chatSessions.updatedAt));
    }
    return await db.select().from(chatSessions).orderBy(desc(chatSessions.updatedAt));
  }
  async updateChatSession(id, updates) {
    const [session] = await db.update(chatSessions).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(chatSessions.id, id)).returning();
    return session || void 0;
  }
  // AI message methods
  async createAiMessage(insertMessage) {
    const [message] = await db.insert(aiMessages).values(insertMessage).returning();
    return message;
  }
  async getAiMessagesBySession(sessionId2) {
    return await db.select().from(aiMessages).where(eq(aiMessages.sessionId, sessionId2)).orderBy(aiMessages.createdAt);
  }
  async getLatestAiMessages(sessionId2, limit = 50) {
    return await db.select().from(aiMessages).where(eq(aiMessages.sessionId, sessionId2)).orderBy(desc(aiMessages.createdAt)).limit(limit);
  }
  // === ФАЗА 1: РЕАЛИЗАЦИЯ МЕТОДОВ СЕМАНТИЧЕСКОЙ ПАМЯТИ ===
  // User Profile methods
  async getUserProfile(userId) {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    return profile || void 0;
  }
  async createUserProfile(insertProfile) {
    const [profile] = await db.insert(userProfiles).values(insertProfile).returning();
    return profile;
  }
  async updateUserProfile(userId, updates) {
    const [profile] = await db.update(userProfiles).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(userProfiles.userId, userId)).returning();
    return profile || void 0;
  }
  // Project Memory methods
  async createProjectMemory(insertProject) {
    const [project] = await db.insert(projectMemory).values(insertProject).returning();
    return project;
  }
  async getProjectMemory(id) {
    const [project] = await db.select().from(projectMemory).where(eq(projectMemory.id, id));
    return project || void 0;
  }
  async getUserProjects(userId, limit = 50) {
    return await db.select().from(projectMemory).where(eq(projectMemory.userId, userId)).orderBy(desc(projectMemory.lastWorkedOn)).limit(limit);
  }
  async updateProjectMemory(id, updates) {
    const [project] = await db.update(projectMemory).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(projectMemory.id, id)).returning();
    return project || void 0;
  }
  async getActiveProjects(userId) {
    return await db.select().from(projectMemory).where(and(eq(projectMemory.userId, userId), eq(projectMemory.completionStatus, "active"))).orderBy(desc(projectMemory.lastWorkedOn));
  }
  async getProjectsByType(userId, projectType) {
    return await db.select().from(projectMemory).where(and(eq(projectMemory.userId, userId), eq(projectMemory.projectType, projectType))).orderBy(desc(projectMemory.lastWorkedOn));
  }
  // Learning Pattern methods
  async createLearningPattern(insertPattern) {
    const [pattern] = await db.insert(learningPatterns).values(insertPattern).returning();
    return pattern;
  }
  async getLearningPatterns(userId, category) {
    const conditions = [eq(learningPatterns.userId, userId)];
    if (category) {
      conditions.push(eq(learningPatterns.category, category));
    }
    return await db.select().from(learningPatterns).where(and(...conditions)).orderBy(desc(learningPatterns.confidence), desc(learningPatterns.successRate));
  }
  async updateLearningPattern(id, updates) {
    const [pattern] = await db.update(learningPatterns).set({ ...updates, updatedAt: /* @__PURE__ */ new Date() }).where(eq(learningPatterns.id, id)).returning();
    return pattern || void 0;
  }
  async getSuccessfulPatterns(userId, category) {
    return await db.select().from(learningPatterns).where(and(
      eq(learningPatterns.userId, userId),
      eq(learningPatterns.category, category),
      gte(learningPatterns.successRate, 70)
      // >= 70% success rate
    )).orderBy(desc(learningPatterns.successRate), desc(learningPatterns.usageCount));
  }
  // Emotional History methods
  async createEmotionalHistory(insertEmotion) {
    const [emotion] = await db.insert(emotionalHistory).values(insertEmotion).returning();
    return emotion;
  }
  async getEmotionalHistory(userId, limit = 100) {
    return await db.select().from(emotionalHistory).where(eq(emotionalHistory.userId, userId)).orderBy(desc(emotionalHistory.createdAt)).limit(limit);
  }
  async getRecentEmotions(userId, sessionId2) {
    const conditions = [eq(emotionalHistory.userId, userId)];
    if (sessionId2) {
      conditions.push(eq(emotionalHistory.sessionId, sessionId2));
    }
    return await db.select().from(emotionalHistory).where(and(...conditions)).orderBy(desc(emotionalHistory.createdAt)).limit(20);
  }
};
var storage = new DatabaseStorage();

// server/ws.ts
import { WebSocketServer, WebSocket } from "ws";
function setupWebSocket(httpServer, storage2) {
  const wss = new WebSocketServer({ server: httpServer, path: "/api/ws" });
  const connectedClients = /* @__PURE__ */ new Map();
  wss.on("connection", (ws2) => {
    console.log("WebSocket client connected");
    ws2.isAlive = true;
    ws2.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString());
        switch (message.type) {
          case "auth" /* AUTH */:
            await handleAuthentication(ws2, message.payload, storage2, connectedClients);
            break;
          case "message" /* MESSAGE */:
            await handleMessage(ws2, message.payload, storage2, connectedClients);
            break;
          default:
            sendError(ws2, `Unknown message type: ${message.type}`);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
        sendError(ws2, "Failed to process message");
      }
    });
    ws2.on("pong", () => {
      ws2.isAlive = true;
    });
    ws2.on("close", async () => {
      if (ws2.userId) {
        connectedClients.delete(ws2.userId);
        await storage2.setUserOnlineStatus(ws2.userId, false);
        broadcastUserStatus(ws2.userId, false, connectedClients);
        console.log(`User ${ws2.userId} disconnected`);
      }
    });
  });
  const interval = setInterval(() => {
    wss.clients.forEach((ws2) => {
      if (ws2.isAlive === false) {
        return ws2.terminate();
      }
      ws2.isAlive = false;
      ws2.ping();
    });
  }, 3e4);
  wss.on("close", () => {
    clearInterval(interval);
  });
  console.log("WebSocket server initialized");
}
async function handleAuthentication(ws2, payload, storage2, connectedClients) {
  try {
    const { token } = payload;
    if (!token) {
      return sendError(ws2, "No token provided");
    }
    const user = await storage2.getUserByToken(token);
    if (!user) {
      return sendError(ws2, "Invalid token");
    }
    ws2.userId = user.id;
    connectedClients.set(user.id, ws2);
    await storage2.setUserOnlineStatus(user.id, true);
    broadcastUserStatus(user.id, true, connectedClients);
    ws2.send(JSON.stringify({
      type: "auth" /* AUTH */,
      payload: {
        success: true,
        userId: user.id,
        username: user.username
      }
    }));
    console.log(`User ${user.id} (${user.username}) authenticated via WebSocket`);
  } catch (error) {
    console.error("Authentication error:", error);
    sendError(ws2, "Authentication failed");
  }
}
async function handleMessage(ws2, payload, storage2, connectedClients) {
  try {
    if (!ws2.userId) {
      return sendError(ws2, "Not authenticated");
    }
    const { text: text2, receiverId } = payload;
    if (!text2 || !receiverId) {
      return sendError(ws2, "Invalid message data");
    }
    const message = await storage2.createMessage({
      senderId: ws2.userId,
      receiverId,
      text: text2
    });
    const sender = await storage2.getUser(ws2.userId);
    if (!sender) {
      return sendError(ws2, "Sender not found");
    }
    const formattedMessage = {
      ...message,
      sender: {
        ...sender,
        initials: sender.username.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
      },
      time: new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    const recipientWs = connectedClients.get(receiverId);
    if (recipientWs && recipientWs.readyState === WebSocket.OPEN) {
      recipientWs.send(JSON.stringify({
        type: "message" /* MESSAGE */,
        payload: formattedMessage
      }));
    }
  } catch (error) {
    console.error("Message handling error:", error);
    sendError(ws2, "Failed to send message");
  }
}
function sendError(ws2, message) {
  const payload = { message };
  ws2.send(JSON.stringify({
    type: "error" /* ERROR */,
    payload
  }));
}
function broadcastUserStatus(userId, isOnline, connectedClients) {
  connectedClients.forEach((clientWs, clientId) => {
    if (clientId !== userId && clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({
        type: isOnline ? "user_connected" /* USER_CONNECTED */ : "user_disconnected" /* USER_DISCONNECTED */,
        payload: { userId }
      }));
    }
  });
}

// server/middleware/proxy.ts
function setupProxyMiddleware(app2) {
  app2.use("/proxy/*", async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication required for proxy" });
      }
      const token = authHeader.split(" ")[1];
      const user = await storage.getUserByToken(token);
      if (!user) {
        return res.status(401).json({ message: "Invalid token for proxy request" });
      }
      const targetPath = req.path.replace("/proxy/", "");
      if (!targetPath) {
        return res.status(400).json({ message: "No target URL specified" });
      }
      const decodedPath = decodeURIComponent(targetPath);
      const targetUrl = decodedPath.startsWith("http") ? decodedPath : `https://${decodedPath}`;
      console.log(`Proxying request to: ${targetUrl}`);
      try {
        const headers = {};
        const headersToCopy = [
          "accept",
          "content-type",
          "user-agent"
        ];
        headersToCopy.forEach((header) => {
          if (req.headers[header]) {
            headers[header] = req.headers[header];
          }
        });
        headers["x-proxy-user"] = user.username;
        const response = await fetch(targetUrl, {
          method: req.method,
          headers,
          body: ["GET", "HEAD"].includes(req.method) ? void 0 : JSON.stringify(req.body)
        });
        const contentType = response.headers.get("content-type") || "";
        let data;
        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        res.status(response.status);
        response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        res.send(data);
      } catch (error) {
        console.error("Proxy request error:", error);
        return res.status(502).json({
          message: "Failed to proxy request to target",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    } catch (error) {
      console.error("Proxy middleware error:", error);
      return res.status(500).json({ message: "Server error in proxy middleware" });
    }
  });
}

// server/logger.ts
var Logger = class {
  logs = [];
  maxLogs = 1e3;
  // Максимальное количество логов в памяти
  createEntry(level, category, action, details, context) {
    return {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level,
      category,
      action,
      details,
      sessionId: context?.sessionId,
      messageId: context?.messageId,
      userId: context?.userId
    };
  }
  info(category, action, details, context) {
    const entry = this.createEntry("INFO", category, action, details, context);
    this.logs.push(entry);
    this.trimLogs();
    console.log(`\u2139\uFE0F [${category}] ${action}:`, details);
  }
  debug(category, action, details, context) {
    const entry = this.createEntry("DEBUG", category, action, details, context);
    this.logs.push(entry);
    this.trimLogs();
    console.log(`\u{1F50D} [${category}] ${action}:`, details);
  }
  warn(category, action, details, context) {
    const entry = this.createEntry("WARN", category, action, details, context);
    this.logs.push(entry);
    this.trimLogs();
    console.warn(`\u26A0\uFE0F [${category}] ${action}:`, details);
  }
  error(category, action, details, context) {
    const entry = this.createEntry("ERROR", category, action, details, context);
    this.logs.push(entry);
    this.trimLogs();
    console.error(`\u274C [${category}] ${action}:`, details);
  }
  trimLogs() {
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }
  // Получить логи для определенной сессии
  getSessionLogs(sessionId2) {
    return this.logs.filter((log2) => log2.sessionId === sessionId2);
  }
  // Получить логи по категории
  getCategoryLogs(category) {
    return this.logs.filter((log2) => log2.category === category);
  }
  // Получить последние логи
  getRecentLogs(limit = 50) {
    return this.logs.slice(-limit);
  }
  // Очистить логи
  clearLogs() {
    this.logs = [];
    console.log("\u{1F9F9} \u041B\u043E\u0433\u0438 \u043E\u0447\u0438\u0449\u0435\u043D\u044B");
  }
  // Экспорт логов в JSON
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
  // Статистика логов
  getStats() {
    const stats = {
      total: this.logs.length,
      byLevel: {},
      byCategory: {}
    };
    this.logs.forEach((log2) => {
      stats.byLevel[log2.level] = (stats.byLevel[log2.level] || 0) + 1;
      stats.byCategory[log2.category] = (stats.byCategory[log2.category] || 0) + 1;
    });
    return stats;
  }
};
var ImageProcessLogger = class {
  constructor(logger2) {
    this.logger = logger2;
  }
  requestReceived(prompt, sessionId2, userId) {
    this.logger.info("IMAGE_GENERATION", "REQUEST_RECEIVED", {
      prompt,
      promptLength: prompt.length,
      isRussian: /[а-яё]/i.test(prompt)
    }, { sessionId: sessionId2, userId });
  }
  promptTranslation(originalPrompt, translatedPrompt, method, sessionId2) {
    this.logger.debug("IMAGE_GENERATION", "PROMPT_TRANSLATION", {
      original: originalPrompt,
      translated: translatedPrompt,
      method,
      improvement: translatedPrompt.length > originalPrompt.length
    }, { sessionId: sessionId2 });
  }
  aiEnhancement(prompt, aiResponse, provider, duration, sessionId2) {
    this.logger.debug("IMAGE_GENERATION", "AI_ENHANCEMENT", {
      inputPrompt: prompt,
      enhancedPrompt: aiResponse,
      provider,
      durationMs: duration,
      success: !!aiResponse
    }, { sessionId: sessionId2 });
  }
  generationStarted(prompt, provider, sessionId2) {
    this.logger.info("IMAGE_GENERATION", "GENERATION_STARTED", {
      prompt,
      provider,
      seed: Date.now()
    }, { sessionId: sessionId2 });
  }
  generationCompleted(imageUrl, provider, duration, sessionId2) {
    this.logger.info("IMAGE_GENERATION", "GENERATION_COMPLETED", {
      imageUrl,
      provider,
      durationMs: duration,
      success: true
    }, { sessionId: sessionId2 });
  }
  generationFailed(error, provider, sessionId2) {
    this.logger.error("IMAGE_GENERATION", "GENERATION_FAILED", {
      error,
      provider,
      timestamp: Date.now()
    }, { sessionId: sessionId2 });
  }
  editingStarted(originalImage, editCommand, sessionId2) {
    this.logger.info("IMAGE_EDITING", "EDITING_STARTED", {
      originalImage,
      editCommand,
      editType: this.detectEditType(editCommand)
    }, { sessionId: sessionId2 });
  }
  editingCompleted(originalImage, editedImage, duration, sessionId2) {
    this.logger.info("IMAGE_EDITING", "EDITING_COMPLETED", {
      originalImage,
      editedImage,
      durationMs: duration,
      success: true
    }, { sessionId: sessionId2 });
  }
  editingFailed(error, sessionId2) {
    this.logger.error("IMAGE_EDITING", "EDITING_FAILED", {
      error,
      timestamp: Date.now()
    }, { sessionId: sessionId2 });
  }
  detectEditType(command) {
    if (/убери|удали|remove/i.test(command)) return "REMOVE";
    if (/добавь|add/i.test(command)) return "ADD";
    if (/измени|change/i.test(command)) return "MODIFY";
    return "UNKNOWN";
  }
};
var ChatLogger = class {
  constructor(logger2) {
    this.logger = logger2;
  }
  messageReceived(message, sessionId2, userId) {
    this.logger.info("CHAT", "MESSAGE_RECEIVED", {
      messageLength: message.length,
      hasImage: message.includes("!["),
      messageType: this.detectMessageType(message)
    }, { sessionId: sessionId2, userId });
  }
  routingDecision(message, category, providers, sessionId2) {
    this.logger.debug("CHAT", "ROUTING_DECISION", {
      category,
      providers,
      messageLength: message.length
    }, { sessionId: sessionId2 });
  }
  providerResponse(provider, responseLength, duration, sessionId2) {
    this.logger.info("CHAT", "PROVIDER_RESPONSE", {
      provider,
      responseLength,
      durationMs: duration,
      success: true
    }, { sessionId: sessionId2 });
  }
  providerError(provider, error, sessionId2) {
    this.logger.error("CHAT", "PROVIDER_ERROR", {
      provider,
      error
    }, { sessionId: sessionId2 });
  }
  detectMessageType(message) {
    if (/нарисуй|создай|generate|draw/i.test(message)) return "IMAGE_REQUEST";
    if (/убери|удали|измени|edit/i.test(message)) return "EDIT_REQUEST";
    return "TEXT_CHAT";
  }
};
var SystemLogger = class {
  constructor(logger2) {
    this.logger = logger2;
  }
  serverStarted(port) {
    this.logger.info("SYSTEM", "SERVER_STARTED", { port });
  }
  databaseConnected() {
    this.logger.info("SYSTEM", "DATABASE_CONNECTED", {});
  }
  providerInitialized(provider, status) {
    this.logger.info("SYSTEM", "PROVIDER_INITIALIZED", { provider, status });
  }
  sessionCreated(sessionId2, userId) {
    this.logger.info("SYSTEM", "SESSION_CREATED", { sessionId: sessionId2, userId });
  }
  criticalError(error, context) {
    this.logger.error("SYSTEM", "CRITICAL_ERROR", { error, context });
  }
};
var logger = new Logger();
var imageLogger = new ImageProcessLogger(logger);
var chatLogger = new ChatLogger(logger);
var systemLogger = new SystemLogger(logger);

// server/routes.ts
import * as path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import multer from "multer";
var Logger2 = {
  info: (message, data) => {
    const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
    console.log(`\u{1F535} [${timestamp2}] ${message}`, data ? JSON.stringify(data, null, 2) : "");
  },
  success: (message, data) => {
    const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
    console.log(`\u2705 [${timestamp2}] ${message}`, data ? JSON.stringify(data, null, 2) : "");
  },
  error: (message, error) => {
    const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
    console.error(`\u274C [${timestamp2}] ${message}`, error ? error : "");
  },
  warning: (message, data) => {
    const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
    console.warn(`\u26A0\uFE0F [${timestamp2}] ${message}`, data ? JSON.stringify(data, null, 2) : "");
  },
  ai: (message, data) => {
    const timestamp2 = (/* @__PURE__ */ new Date()).toISOString();
    console.log(`\u{1F916} [${timestamp2}] ${message}`, data ? JSON.stringify(data, null, 2) : "");
  }
};
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var require2 = createRequire(__filename);
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB лимит
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("\u0422\u043E\u043B\u044C\u043A\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u044B"), false);
    }
  }
});
var svgGenerator = require2("./svg-generator");
var g4fHandlers = require2("./g4f-handlers");
var directAiRoutes = require2("./direct-ai-routes");
var deepspeekProvider = require2("./deepspeek-provider");
var chatFreeProvider = require2("./chatfree-provider");
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  setupWebSocket(httpServer, storage);
  setupProxyMiddleware(app2);
  app2.use(express.static(path.join(process.cwd())));
  app2.get("/output/embroidery/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), "output", "embroidery", filename);
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".exp") contentType = "application/x-melco-exp";
    else if (ext === ".dst") contentType = "application/x-tajima-dst";
    else if (ext === ".pes") contentType = "application/x-brother-pes";
    else if (ext === ".jef") contentType = "application/x-janome-jef";
    else if (ext === ".vp3") contentType = "application/x-husqvarna-vp3";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".json") contentType = "application/json";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.sendFile(filePath);
  });
  app2.use("/image-generator", (req, res) => {
    res.redirect("/api/svg");
  });
  app2.use("/api/svg", svgGenerator);
  app2.use("/api/search", require2("./search-routes"));
  const aiImageGenerator = require2("./ai-image-generator");
  app2.post("/api/ai-image/generate", async (req, res) => {
    try {
      const { prompt, style = "realistic" } = req.body;
      if (!prompt) {
        return res.status(400).json({
          success: false,
          error: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 (prompt)"
        });
      }
      const result = await aiImageGenerator.generateImage(prompt, style);
      res.json(result);
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:", error);
      res.status(500).json({
        success: false,
        error: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043F\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"
      });
    }
  });
  app2.use("/output", (req, res, next) => {
    const outputPath = path.join(__dirname, "..", "output");
    const filePath = path.join(outputPath, req.path);
    if (req.query.download === "true") {
      const fileName = path.basename(req.path);
      res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
      res.setHeader("Content-Type", "application/octet-stream");
    }
    res.sendFile(req.path, { root: outputPath });
  });
  app2.get("/test", (req, res) => {
    res.sendFile("test-page.html", { root: "." });
  });
  app2.get("/demo", (req, res) => {
    res.sendFile("demo.html", { root: "." });
  });
  app2.get("/", (req, res) => {
    res.sendFile("booomerangs-smart-chat.html", { root: "." });
  });
  app2.get("/smart-chat", (req, res) => {
    res.sendFile("booomerangs-smart-chat.html", { root: "." });
  });
  app2.get("/debug", (req, res) => {
    res.sendFile("debug-info.html", { root: "." });
  });
  app2.get("/g4f-chat", (req, res) => {
    res.sendFile("g4f-chat.html", { root: "." });
  });
  app2.get("/simple-g4f", (req, res) => {
    res.sendFile("simple-g4f.html", { root: "." });
  });
  app2.get("/direct-g4f", (req, res) => {
    res.sendFile("direct-g4f-test.html", { root: "." });
  });
  app2.get("/standalone", (req, res) => {
    res.sendFile("standalone-g4f.html", { root: "." });
  });
  app2.get("/booom", (req, res) => {
    res.sendFile("booomerangs-main.html", { root: "." });
  });
  app2.get("/ai", (req, res) => {
    res.sendFile("booomerangs-direct.html", { root: "." });
  });
  app2.get("/new", (req, res) => {
    res.sendFile("booomerangs-new.html", { root: "." });
  });
  app2.get("/chat-ai", (req, res) => {
    res.sendFile("booomerangs-chat.html", { root: "." });
  });
  app2.get("/unified", (req, res) => {
    res.sendFile("public/unified-interface.html", { root: "." });
  });
  app2.get("/fixed", (req, res) => {
    res.sendFile("public/fixed-interface.html", { root: "." });
  });
  app2.get("/image-generator", (req, res) => {
    res.sendFile("public/image-generator.html", { root: "." });
  });
  app2.get("/ai-images", (req, res) => {
    res.sendFile("public/ai-image-app.html", { root: "." });
  });
  app2.get("/booom-streaming", (req, res) => {
    res.sendFile("booomerangs-app-streaming-fixed.html", { root: "." });
  });
  app2.get("/qwen", (req, res) => {
    res.sendFile("booomerangs-qwen.html", { root: "." });
  });
  app2.get("/streaming", (req, res) => {
    res.sendFile("booomerangs-streaming.html", { root: "." });
  });
  app2.get("/quick", (req, res) => {
    res.sendFile("booomerangs-quick.html", { root: "." });
  });
  app2.get("/stable", (req, res) => {
    res.sendFile("booomerangs-stable.html", { root: "." });
  });
  app2.get("/flask", (req, res) => {
    res.sendFile("booomerangs-flask-stream.html", { root: "." });
  });
  app2.get("/logs", (req, res) => {
    res.sendFile("logs-viewer.html", { root: "." });
  });
  app2.get("/smart-chat", (req, res) => {
    res.sendFile("booomerangs-smart-chat.html", { root: "." });
  });
  app2.get("/team-chat", (req, res) => {
    res.sendFile("team-chat.html", { root: "." });
  });
  app2.use("/api/g4f", g4fHandlers);
  app2.use("/api/direct-ai", directAiRoutes);
  const streamingRoutes = require2("./streaming-routes");
  app2.use("/api/streaming", streamingRoutes);
  app2.get("/api/vectorizer-status", async (req, res) => {
    try {
      const vectorizerManager2 = require2("./vectorizer-manager");
      const status = await vectorizerManager2.checkHealth();
      res.json({
        success: true,
        vectorizer: status,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      res.json({
        success: false,
        vectorizer: { status: "unavailable", available: false },
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/system-health", async (req, res) => {
    try {
      const { SystemHealthChecker } = require2("./system-health-checker");
      const checker = new SystemHealthChecker();
      const results = await checker.performFullHealthCheck();
      res.json({
        success: true,
        ...results
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app2.get("/api/test-vectorizer", async (req, res) => {
    try {
      const fetch2 = require2("node-fetch");
      const endpoints = [
        "http://localhost:5006/health",
        "http://localhost:5006/api/vectorizer/health",
        "http://localhost:5006/api/vectorizer/formats"
      ];
      const results = {};
      for (const endpoint of endpoints) {
        try {
          const response = await fetch2(endpoint, { timeout: 3e3 });
          const data = await response.json();
          results[endpoint] = {
            status: response.status,
            ok: response.ok,
            data
          };
        } catch (error) {
          results[endpoint] = {
            error: error.message,
            accessible: false
          };
        }
      }
      res.json({
        success: true,
        vectorizerEndpoints: results,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  const flaskStreamBridge = require2("./stream-flask-bridge");
  app2.use("/api/flask-stream", flaskStreamBridge);
  const deepspeekRoutes = require2("./deepspeek-routes");
  app2.use("/api/deepspeek", deepspeekRoutes);
  const ollamaProvider = require2("./ollama-provider");
  app2.use("/api/ollama", ollamaProvider);
  app2.use("/api/chatfree", chatFreeProvider);
  const claudeProvider = require2("./claude-provider");
  app2.use("/api/claude", claudeProvider);
  const deepInfraProvider = require2("./deepinfra-provider");
  app2.use("/api/deepinfra", deepInfraProvider);
  const multimodalProvider = require2("./multimodal-provider");
  app2.use("/api/multimodal", multimodalProvider);
  const embroideryRoutes = require2("./embroidery-routes");
  app2.use("/api/embroidery", embroideryRoutes);
  const smartRouter = require2("./smart-router-wrapper.cjs");
  app2.use("/api/smart", smartRouter);
  const chatHistory = require2("./chat-history");
  const { insertChatSessionSchema: insertChatSessionSchema2, insertAiMessageSchema: insertAiMessageSchema2 } = require2("@shared/schema");
  app2.post("/api/chat/sessions", async (req, res) => {
    try {
      const { userId, title } = req.body;
      if (!userId || !title) {
        return res.status(400).json({
          success: false,
          error: "userId \u0438 title \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B"
        });
      }
      const session = await chatHistory.createChatSession(userId, title);
      res.json({ success: true, session });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0441\u0435\u0441\u0441\u0438\u0438:", error);
      res.status(500).json({
        success: false,
        error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E"
      });
    }
  });
  app2.get("/api/chat/sessions", async (req, res) => {
    try {
      const userId = 1;
      const sessions = await chatHistory.getUserChatSessions(userId);
      res.json({ success: true, sessions });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0435\u0441\u0441\u0438\u0439:", error);
      res.status(500).json({
        success: false,
        error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u0438"
      });
    }
  });
  app2.delete("/api/chat/sessions/:sessionId", async (req, res) => {
    try {
      const sessionId2 = parseInt(req.params.sessionId);
      console.log(`\u{1F5D1}\uFE0F \u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0441\u0435\u0441\u0441\u0438\u0438 ${sessionId2}`);
      const deleteResult = await chatHistory.deleteSession(sessionId2);
      if (deleteResult) {
        console.log(`\u2705 \u0421\u0435\u0441\u0441\u0438\u044F ${sessionId2} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0430 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430`);
        res.json({ success: true, message: "\u0421\u0435\u0441\u0441\u0438\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0430" });
      } else {
        console.log(`\u26A0\uFE0F \u0421\u0435\u0441\u0441\u0438\u044F ${sessionId2} \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0438\u043B\u0438 \u0443\u0436\u0435 \u0431\u044B\u043B\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0430`);
        res.json({ success: true, message: "\u0421\u0435\u0441\u0441\u0438\u044F \u0443\u0436\u0435 \u0431\u044B\u043B\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0430" });
      }
    } catch (error) {
      console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0441\u0435\u0441\u0441\u0438\u0438:", error);
      res.status(500).json({
        success: false,
        error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E"
      });
    }
  });
  app2.get("/api/chat/sessions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const sessions = await chatHistory.getUserChatSessions(userId);
      res.json({ success: true, sessions });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0435\u0441\u0441\u0438\u0439:", error);
      res.status(500).json({
        success: false,
        error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u0438"
      });
    }
  });
  app2.post("/api/chat/sessions/:sessionId/messages", async (req, res) => {
    console.log("\u{1F6A8}\u{1F6A8}\u{1F6A8} \u0412\u042B\u0417\u0412\u0410\u041D \u041E\u0411\u0420\u0410\u0411\u041E\u0422\u0427\u0418\u041A /api/chat/sessions/:sessionId/messages");
    console.log("\u{1F6A8} \u0417\u0410\u041F\u0420\u041E\u0421 \u041A /api/chat/sessions/:sessionId/messages");
    console.log("\u{1F4DD} \u0414\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430:", req.body);
    console.log("\u{1F194} ID \u0441\u0435\u0441\u0441\u0438\u0438:", req.params.sessionId);
    try {
      const sessionId2 = parseInt(req.params.sessionId);
      const messageData = {
        ...req.body,
        sessionId: sessionId2,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      console.log("\u{1F4BE} \u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F:", messageData);
      console.log("\u2705 \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
      const userMessage = await chatHistory.saveMessage(messageData);
      if (messageData.sender === "user") {
        console.log("\u{1F916} \u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u043E\u0442\u0432\u0435\u0442 AI \u0434\u043B\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F:", messageData.content);
        try {
          console.log("\u{1F9E0} \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443 BOOOMERANGS");
          const aiResponse = generateAutonomousResponse(messageData.content, {
            userId: `session_${sessionId2}`,
            sessionId: sessionId2
          });
          console.log("\u{1F3AF} \u0410\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0430:", aiResponse);
          console.log("\u{1F50D} \u041F\u043E\u043B\u044F \u043E\u0442\u0432\u0435\u0442\u0430 AI:", {
            hasResponse: !!aiResponse?.response,
            type: aiResponse?.type,
            responsePreview: aiResponse?.response?.substring(0, 100)
          });
          if (aiResponse && aiResponse.response) {
            let responseContent = aiResponse.response;
            if (!responseContent && aiResponse.embroideryGenerated && aiResponse.embroideryFiles) {
              responseContent = `\u{1F9F5} \u0421\u043E\u0437\u0434\u0430\u043D\u0430 \u0432\u044B\u0448\u0438\u0432\u043A\u0430 \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443!

\u2705 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435: \u0433\u043E\u0442\u043E\u0432\u043E
\u2705 \u0424\u0430\u0439\u043B \u0432\u044B\u0448\u0438\u0432\u043A\u0438 (DST): \u0433\u043E\u0442\u043E\u0432 
\u2705 \u0426\u0432\u0435\u0442\u043E\u0432\u0430\u044F \u0441\u0445\u0435\u043C\u0430: \u0433\u043E\u0442\u043E\u0432\u0430

\u0424\u0430\u0439\u043B\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B \u0438 \u0433\u043E\u0442\u043E\u0432\u044B \u043A \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044E \u043D\u0430 \u0432\u044B\u0448\u0438\u0432\u0430\u043B\u044C\u043D\u043E\u0439 \u043C\u0430\u0448\u0438\u043D\u0435.`;
            }
            if (!responseContent) {
              responseContent = "\u0417\u0430\u043F\u0440\u043E\u0441 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E.";
            }
            const aiMessageData = {
              sessionId: sessionId2,
              content: responseContent,
              sender: "ai",
              provider: aiResponse.provider,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            };
            console.log("\u{1F4BE} \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u043E\u0442\u0432\u0435\u0442 AI \u0432 \u0411\u0414:", aiMessageData);
            await chatHistory.saveMessage(aiMessageData);
            console.log("\u2705 \u041E\u0442\u0432\u0435\u0442 AI \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u0432 \u0441\u0435\u0441\u0441\u0438\u044E");
            console.log("\u{1F4E4} \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C \u043E\u0442\u0432\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0443");
            res.json({
              success: true,
              message: userMessage,
              aiResponse: responseContent,
              provider: aiResponse.provider,
              files: aiResponse.embroideryFiles || aiResponse.files || null,
              details: aiResponse.details || null,
              embroideryGenerated: aiResponse.embroideryGenerated || false,
              imageGenerated: aiResponse.imageGenerated || false
            });
            return;
          } else {
            console.log("\u26A0\uFE0F AI \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u043B \u043E\u0442\u0432\u0435\u0442");
          }
        } catch (aiError) {
          console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 AI:", aiError);
        }
      }
      res.json({
        success: true,
        message: userMessage,
        hasAiResponse: messageData.sender === "user"
      });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F:", error);
      res.status(500).json({
        success: false,
        error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435"
      });
    }
  });
  app2.post("/api/chat/messages", async (req, res) => {
    console.log("\u{1F6A8} \u0421\u0422\u0410\u0420\u0410\u042F \u0421\u0422\u0420\u0410\u041D\u0418\u0426\u0410 \u0418\u0421\u041F\u041E\u041B\u042C\u0417\u0423\u0415\u0422 /api/chat/messages");
    console.log("\u{1F4DD} \u0414\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430:", req.body);
    try {
      const messageData = req.body;
      console.log("\u{1F4BE} \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 \u0441\u0442\u0430\u0440\u044B\u0439 \u043F\u0443\u0442\u044C:", messageData);
      const message = await chatHistory.saveMessage(messageData);
      if (messageData.sender === "user") {
        console.log("\u{1F916} \u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u043E\u0442\u0432\u0435\u0442 AI \u0434\u043B\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F:", messageData.content);
        try {
          console.log("\u{1F9E0} \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443 BOOOMERANGS");
          const aiResponse = generateAutonomousResponse(messageData.content, {
            userId: `session_${messageData.sessionId || "default"}`,
            sessionId: messageData.sessionId
          });
          const processedResponse = {
            response: aiResponse ? aiResponse.response : "\u0410\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442 \u0432\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441...",
            provider: "BOOOMERANGS-Autonomous",
            model: "autonomous-ai"
          };
          console.log("\u{1F3AF} \u0410\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043E\u0442\u0432\u0435\u0442\u0438\u043B\u0430:", processedResponse);
          if (processedResponse && processedResponse.response) {
            const aiMessageData = {
              ...messageData,
              content: processedResponse.response,
              sender: "ai",
              provider: processedResponse.provider,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            };
            console.log("\u{1F4BE} \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u043E\u0442\u0432\u0435\u0442 AI:", aiMessageData);
            await chatHistory.saveMessage(aiMessageData);
            console.log("\u2705 \u041E\u0442\u0432\u0435\u0442 AI \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u0432 \u0447\u0430\u0442");
          }
        } catch (aiError) {
          console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 AI:", aiError);
        }
      }
      res.json({ success: true, message });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F:", error);
      res.status(500).json({
        success: false,
        error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435"
      });
    }
  });
  app2.get("/api/chat/sessions/:sessionId/messages", async (req, res) => {
    try {
      const sessionId2 = parseInt(req.params.sessionId);
      console.log(`\u{1F4CB} \u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0441\u0435\u0441\u0441\u0438\u0438 ${sessionId2}...`);
      const messages3 = await chatHistory.getSessionMessages(sessionId2);
      console.log(`\u2705 \u041D\u0430\u0439\u0434\u0435\u043D\u043E ${messages3.length} \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u0441\u0435\u0441\u0441\u0438\u0438 ${sessionId2}`);
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.json({ success: true, messages: messages3 });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439:", error);
      res.status(500).json({
        success: false,
        error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F"
      });
    }
  });
  const { users: users2, messages: messages2 } = require2("@shared/schema");
  const { eq: eq2 } = require2("drizzle-orm");
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: "\u041B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B"
        });
      }
      const { db: db2 } = require2("./db");
      const [user] = await db2.select().from(users2).where(eq2(users2.username, username));
      if (!user || user.password !== password) {
        return res.status(401).json({
          success: false,
          error: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"
        });
      }
      const token = `${user.id}_${Date.now()}_${Math.random().toString(36)}`;
      await db2.update(users2).set({ token, isOnline: true }).where(eq2(users2.id, user.id));
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          token
        }
      });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438:", error);
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430" });
    }
  });
  app2.post("/api/auth/logout", async (req, res) => {
    try {
      const { token } = req.body;
      if (token) {
        const { db: db2 } = require2("./db");
        await db2.update(users2).set({ token: null, isOnline: false }).where(eq2(users2.token, token));
      }
      res.json({ success: true });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u044B\u0445\u043E\u0434\u0430:", error);
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430" });
    }
  });
  app2.get("/api/auth/user", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        return res.status(401).json({ success: false, error: "\u0422\u043E\u043A\u0435\u043D \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D" });
      }
      const { db: db2 } = require2("./db");
      const [user] = await db2.select().from(users2).where(eq2(users2.token, token));
      if (!user) {
        return res.status(401).json({ success: false, error: "\u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0442\u043E\u043A\u0435\u043D" });
      }
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName
        }
      });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0442\u043E\u043A\u0435\u043D\u0430:", error);
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430" });
    }
  });
  app2.post("/api/messages", async (req, res) => {
    try {
      const { senderId, receiverId, text: text2 } = req.body;
      if (!senderId || !receiverId || !text2) {
        return res.status(400).json({
          success: false,
          error: "senderId, receiverId \u0438 text \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B"
        });
      }
      const { db: db2 } = require2("./db");
      const [message] = await db2.insert(messages2).values({ senderId, receiverId, text: text2 }).returning();
      res.json({ success: true, message });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F:", error);
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F" });
    }
  });
  app2.get("/api/messages/:userId1/:userId2", async (req, res) => {
    try {
      const { userId1, userId2 } = req.params;
      const { db: db2 } = require2("./db");
      const { or: or2, and: and2, eq: eq3, desc: desc2 } = require2("drizzle-orm");
      const conversation = await db2.select().from(messages2).where(
        or2(
          and2(eq3(messages2.senderId, parseInt(userId1)), eq3(messages2.receiverId, parseInt(userId2))),
          and2(eq3(messages2.senderId, parseInt(userId2)), eq3(messages2.receiverId, parseInt(userId1)))
        )
      ).orderBy(desc2(messages2.timestamp));
      res.json({ success: true, messages: conversation });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438:", error);
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438" });
    }
  });
  app2.get("/api/conversations/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { db: db2 } = require2("./db");
      const { or: or2, eq: eq3, desc: desc2 } = require2("drizzle-orm");
      const conversations = await db2.select().from(messages2).where(
        or2(
          eq3(messages2.senderId, parseInt(userId)),
          eq3(messages2.receiverId, parseInt(userId))
        )
      ).orderBy(desc2(messages2.timestamp));
      const conversationMap = /* @__PURE__ */ new Map();
      conversations.forEach((msg) => {
        const partnerId = msg.senderId === parseInt(userId) ? msg.receiverId : msg.senderId;
        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            partnerId,
            lastMessage: msg,
            timestamp: msg.timestamp
          });
        }
      });
      res.json({ success: true, conversations: Array.from(conversationMap.values()) });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0438\u0430\u043B\u043E\u0433\u043E\u0432:", error);
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u0438\u0430\u043B\u043E\u0433\u043E\u0432" });
    }
  });
  const imageUpload = require2("./image-upload");
  app2.use("/api/upload", imageUpload);
  app2.use("/uploads", (req, res, next) => {
    const uploadPath = path.join(process.cwd(), "uploads");
    res.sendFile(req.path, { root: uploadPath }, (err) => {
      if (err) next("route");
    });
  });
  (async () => {
    try {
      console.log("\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u043E\u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0441\u0442\u0438 Python G4F...");
      setTimeout(async () => {
        try {
          const response = await fetch("http://localhost:5004/python/test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "test" })
          });
          if (response.ok) {
            console.log("\u2705 Python G4F \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440 \u0433\u043E\u0442\u043E\u0432 \u043A \u0440\u0430\u0431\u043E\u0442\u0435");
          } else {
            console.warn("\u26A0\uFE0F Python G4F \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440 \u043C\u043E\u0436\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E");
          }
        } catch (error) {
          console.warn("\u26A0\uFE0F Python G4F \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D:", error.message);
        }
      }, 3e3);
    } catch (error) {
      console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 Python G4F:", error);
    }
  })();
  async function callG4F(message, provider) {
    const startTime = Date.now();
    Logger2.ai(`\u041D\u0430\u0447\u0438\u043D\u0430\u0435\u043C AI \u0437\u0430\u043F\u0440\u043E\u0441`, { provider, messageLength: message.length });
    try {
      const directAiProvider = require2("./direct-ai-provider");
      let actualProvider = provider;
      if (provider === "qwen") {
        actualProvider = "AItianhu";
      } else if (provider === "claude") {
        try {
          console.log(`\u041F\u0440\u043E\u0431\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C Claude \u0447\u0435\u0440\u0435\u0437 Python G4F...`);
          try {
            const commercialRoutes = require2("./commercial-routes");
            app2.use("/api/commercial", commercialRoutes);
            console.log("\u2705 \u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0435 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u044B");
          } catch (error) {
            console.log("\u26A0\uFE0F \u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0435 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B:", error.message);
          }
          const claudeProvider2 = require2("./claude-provider");
          const claudeResponse = await claudeProvider2.getClaudeResponse(message);
          if (claudeResponse.success) {
            const duration = Date.now() - startTime;
            Logger2.success(`Claude \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E`, {
              duration: `${duration}ms`,
              responseLength: claudeResponse.response?.length || 0
            });
            return claudeResponse;
          } else {
            throw new Error(claudeResponse.error || "\u041E\u0448\u0438\u0431\u043A\u0430 Claude");
          }
        } catch (error) {
          Logger2.error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 Claude`, error);
          actualProvider = "AItianhu";
        }
      } else if (provider === "ollama") {
        try {
          console.log(`\u041F\u0440\u043E\u0431\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C Ollama \u0447\u0435\u0440\u0435\u0437 Python G4F...`);
          const ollamaResponse = null;
          if (ollamaResponse) {
            return {
              success: true,
              response: ollamaResponse,
              provider: "Ollama",
              model: "llama3"
            };
          } else {
            throw new Error("Ollama \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u043B \u043E\u0442\u0432\u0435\u0442 \u0447\u0435\u0440\u0435\u0437 Python G4F");
          }
        } catch (error) {
          console.error(`\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 Ollama \u0447\u0435\u0440\u0435\u0437 Python:`, error);
          try {
            const ollamaProvider2 = require2("./ollama-provider");
            const isOllamaAvailable = await ollamaProvider2.checkOllamaAvailability();
            if (isOllamaAvailable) {
              const ollamaDirectResponse = await ollamaProvider2.getOllamaResponse(message);
              if (ollamaDirectResponse.success) {
                return ollamaDirectResponse;
              }
            }
          } catch (localError) {
            console.error(`\u274C \u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 Ollama \u0442\u043E\u0436\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D:`, localError);
          }
          actualProvider = "AItianhu";
        }
      } else if (provider === "chatfree") {
        try {
          const chatFreeImproved = require2("./chatfree-improved");
          console.log(`\u041F\u0440\u043E\u0431\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E ChatFree...`);
          const chatFreeResponse = await chatFreeImproved.getChatFreeResponse(message, {
            systemPrompt: "\u0412\u044B \u043F\u043E\u043B\u0435\u0437\u043D\u044B\u0439 \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442. \u041E\u0442\u0432\u0435\u0447\u0430\u0439\u0442\u0435 \u0442\u043E\u0447\u043D\u043E \u0438 \u043F\u043E \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u0434\u0440\u0443\u0436\u0435\u043B\u044E\u0431\u043D\u044B\u0439 \u0442\u043E\u043D."
          });
          if (chatFreeResponse.success) {
            console.log(`\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u043E\u0442\u0432\u0435\u0442 \u043E\u0442 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u043D\u043E\u0433\u043E ChatFree \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430`);
            return chatFreeResponse;
          } else {
            const simpleChatFree = require2("./simple-chatfree");
            const simpleResponse = await simpleChatFree.getChatFreeResponse(message);
            if (simpleResponse.success) {
              console.log(`\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u043E\u0442\u0432\u0435\u0442 \u043E\u0442 \u043F\u0440\u043E\u0441\u0442\u043E\u0433\u043E ChatFree \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430`);
              return simpleResponse;
            }
            throw new Error(chatFreeResponse.error || "\u041E\u0448\u0438\u0431\u043A\u0430 ChatFree");
          }
        } catch (error) {
          console.error(`\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 ChatFree:`, error);
          actualProvider = "AItianhu";
        }
      }
      const response = await directAiProvider.getChatResponse(message, { provider: actualProvider });
      return {
        success: true,
        response,
        provider: actualProvider
      };
    } catch (error) {
      console.error(`\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u0437\u043E\u0432\u0435 G4F:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"
      };
    }
  }
  app2.post("/api/convert/svg-print", upload.single("image"), async (req, res) => {
    try {
      const { printType = "both", designName } = req.body;
      const uploadedImage = req.file;
      if (!uploadedImage) {
        return res.status(400).json({
          success: false,
          error: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u043A\u043E\u043D\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u0438 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043E"
        });
      }
      const advancedVectorizer = require2("../advanced-vectorizer.cjs");
      const baseName = designName || `uploaded-design-${Date.now()}`;
      console.log(`\u{1F3A8} [SVG-CONVERT] \u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u0443\u0435\u043C \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043D\u043E\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439 \u0432\u0435\u043A\u0442\u043E\u0440\u0438\u0437\u0430\u0442\u043E\u0440`);
      const quality = printType === "high" ? "premium" : "standard";
      const optimizeFor = "print";
      const result = await advancedVectorizer.professionalVectorize(
        uploadedImage.buffer,
        baseName,
        {
          quality,
          formats: ["svg"],
          optimizeFor,
          includeMetadata: true
        }
      );
      if (result.success) {
        res.json({
          success: true,
          message: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 SVG \u0447\u0435\u0440\u0435\u0437 \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439 \u0432\u0435\u043A\u0442\u043E\u0440\u0438\u0437\u0430\u0442\u043E\u0440",
          svgContent: result.main.svgContent,
          detectedType: result.main.detectedType,
          quality: result.main.quality,
          optimization: result.optimization
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043A\u043E\u043D\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u0438 \u0432 SVG:", error);
      res.status(500).json({
        success: false,
        error: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043F\u0440\u0438 \u043A\u043E\u043D\u0432\u0435\u0440\u0442\u0430\u0446\u0438\u0438"
      });
    }
  });
  app2.post("/api/ai/chat", upload.single("image"), async (req, res) => {
    try {
      const { message, provider } = req.body;
      const uploadedImage = req.file;
      console.log(`\u{1F50D} \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438: message="${message}", uploadedImage=${uploadedImage ? "\u0415\u0421\u0422\u042C" : "\u041D\u0415\u0422"}`);
      if (!message && !uploadedImage) {
        return res.status(400).json({
          success: false,
          error: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u044B"
        });
      }
      let finalMessage = message || "\u0410\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0439 \u044D\u0442\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0438 \u043E\u043F\u0438\u0448\u0438 \u0447\u0442\u043E \u043D\u0430 \u043D\u0435\u043C \u0432\u0438\u0434\u043D\u043E";
      const directAiProvider = require2("./direct-ai-provider");
      const { AI_PROVIDERS } = directAiProvider;
      console.log("\u{1F9E0} [STREAM] === \u041D\u0410\u0427\u0410\u041B\u041E \u0410\u041D\u0410\u041B\u0418\u0417\u0410 \u041A\u041E\u041D\u0422\u0415\u041A\u0421\u0422\u0410 ===");
      console.log("\u{1F9E0} [STREAM] req.body:", JSON.stringify(req.body, null, 2));
      const conversationMemory = require2("./conversation-memory");
      const userId = req.body.userId || `session_${req.body.sessionId || "stream"}`;
      console.log("\u{1F9E0} [STREAM] userId \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430:", userId);
      console.log("\u{1F9E0} [STREAM] \u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F:", finalMessage);
      const contextInfo = conversationMemory.getMessageContext(userId, finalMessage);
      console.log("\u{1F9E0} [STREAM] \u0414\u0415\u0422\u0410\u041B\u042C\u041D\u042B\u0419 \u0430\u043D\u0430\u043B\u0438\u0437 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430:", {
        hasIntent: !!contextInfo.intent,
        intent: contextInfo.intent,
        isSearchQuery: contextInfo.intent?.isSearchQuery,
        location: contextInfo.intent?.location,
        contextLength: contextInfo.context?.length || 0,
        context: contextInfo.context?.substring(0, 200) + "...",
        messageHistory: contextInfo.messageHistory?.length || 0
      });
      const smartRouter2 = require2("./smart-router-wrapper.cjs");
      const messageAnalysis = smartRouter2.analyzeMessage(finalMessage);
      console.log("\u{1F4DD} [STREAM] \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F:", messageAnalysis.category);
      console.log("\u{1F4DD} [STREAM] \u041F\u0440\u043E\u043C\u043F\u0442 \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438:", messageAnalysis.prompt);
      let previousImage = null;
      if (messageAnalysis.category === "image_edit") {
        console.log("\u{1F50D} [STREAM] \u0418\u0449\u0435\u043C \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F userId:", userId);
        const conversation = conversationMemory.getConversation(userId);
        console.log("\u{1F4AC} [STREAM] \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0430 \u0431\u0435\u0441\u0435\u0434\u0430, \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u0432 \u043F\u0430\u043C\u044F\u0442\u0438:", conversation?.messages?.length || 0);
        previousImage = conversation.getLastImageInfo();
        console.log("\u{1F504} [STREAM] \u041D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435:", previousImage ? "\u0414\u0410" : "\u041D\u0415\u0422");
        if (previousImage) {
          console.log("\u{1F3AF} [STREAM] URL \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:", previousImage.url);
          console.log("\u{1F3AF} [STREAM] \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:", previousImage.description);
        } else {
          console.log("\u26A0\uFE0F [STREAM] \u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u041D\u0415 \u043D\u0430\u0439\u0434\u0435\u043D\u043E - \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430");
        }
      }
      if (contextInfo.context && contextInfo.context.trim()) {
        const originalMessage = finalMessage;
        finalMessage = contextInfo.context + finalMessage;
        console.log("\u{1F9E0} [STREAM] \u041A\u041E\u041D\u0422\u0415\u041A\u0421\u0422 \u0414\u041E\u0411\u0410\u0412\u041B\u0415\u041D!");
        console.log("\u{1F9E0} [STREAM] \u041E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435:", originalMessage);
        console.log("\u{1F9E0} [STREAM] \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043E\u043C:", finalMessage.substring(0, 300) + "...");
      } else {
        console.log("\u{1F9E0} [STREAM] \u041A\u041E\u041D\u0422\u0415\u041A\u0421\u0422 \u041D\u0415 \u0414\u041E\u0411\u0410\u0412\u041B\u0415\u041D - \u043D\u0435\u0442 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0430 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442\u043E\u0439");
      }
      console.log("\u{1F9E0} [STREAM] === \u041A\u041E\u041D\u0415\u0426 \u0410\u041D\u0410\u041B\u0418\u0417\u0410 \u041A\u041E\u041D\u0422\u0415\u041A\u0421\u0422\u0410 ===");
      console.log("\u{1F9E0} [AUTONOMOUS] \u0410\u043A\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u043C \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443 BOOOMERANGS");
      const autonomousResponse = generateAutonomousResponse(finalMessage, {
        userId,
        sessionId,
        hasImages: !!uploadedImage,
        context: contextInfo
      });
      if (autonomousResponse) {
        console.log("\u2705 [AUTONOMOUS] \u0410\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043B\u0430 \u043E\u0442\u0432\u0435\u0442");
        return res.json({
          success: true,
          response: autonomousResponse.response,
          provider: "BOOOMERANGS-Autonomous",
          model: "autonomous-ai",
          semantic: true,
          autonomous: true
        });
      }
      const demoResponse = generateDemoResponse(finalMessage);
      let selectedProvider = "Qwen_Qwen_2_72B";
      console.log(`\u{1F527} [PROVIDER] \u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0439 provider \u0438\u0437 \u0437\u0430\u043F\u0440\u043E\u0441\u0430: "${provider}"`);
      console.log(`\u{1F527} [PROVIDER] \u041D\u0430\u0448 selectedProvider: "${selectedProvider}"`);
      console.log(`\u{1F527} [PROVIDER] \u041F\u0440\u0438\u043D\u0443\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u043C \u043D\u0430 \u043B\u0443\u0447\u0448\u0438\u0439 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440!`);
      let base64Image = null;
      if (uploadedImage) {
        base64Image = uploadedImage.buffer.toString("base64");
        const imageDataUrl = `data:${uploadedImage.mimetype};base64,${base64Image}`;
        selectedProvider = "multimodal";
        finalMessage = `${finalMessage}

\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0430\u043D\u0430\u043B\u0438\u0437\u0430: ${imageDataUrl}`;
        console.log(`\u{1F5BC}\uFE0F \u041E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u043C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435: ${uploadedImage.originalname} (${Math.round(uploadedImage.size / 1024)}KB)`);
      }
      const techKeywords = [
        "\u043A\u043E\u0434",
        "\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
        "javascript",
        "python",
        "java",
        "c++",
        "c#",
        "coding",
        "programming",
        "code",
        "\u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C",
        "algorithm",
        "\u0444\u0443\u043D\u043A\u0446\u0438\u044F",
        "function",
        "api",
        "\u0441\u0435\u0440\u0432\u0435\u0440",
        "server",
        "backend",
        "frontend",
        "\u0444\u0440\u043E\u043D\u0442\u0435\u043D\u0434",
        "\u0431\u044D\u043A\u0435\u043D\u0434",
        "database",
        "\u0431\u0430\u0437\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",
        "sql",
        "nosql",
        "json",
        "html",
        "css",
        "git",
        "github",
        "docker",
        "kubernetes",
        "devops"
      ];
      const isTechnicalQuestion = techKeywords.some((keyword) => finalMessage.toLowerCase().includes(keyword));
      if (uploadedImage) {
        console.log(`\u{1F5BC}\uFE0F \u041D\u0410\u0419\u0414\u0415\u041D\u041E \u0418\u0417\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u0415! \u0420\u0430\u0437\u043C\u0435\u0440: ${uploadedImage.size} \u0431\u0430\u0439\u0442, \u0442\u0438\u043F: ${uploadedImage.mimetype}`);
        const multimodalProvider2 = require2("./multimodal-provider");
        try {
          const imageAnalyzer = require2("./image-analyzer");
          console.log("\u{1F50D} \u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439 \u0430\u043D\u0430\u043B\u0438\u0437 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F...");
          const analysisResult = await imageAnalyzer.analyzeImage(uploadedImage.buffer, uploadedImage.originalname);
          const imageInfo = {
            filename: uploadedImage.originalname,
            size: Math.round(uploadedImage.size / 1024),
            type: uploadedImage.mimetype
          };
          const smartResponse = `\u{1F5BC}\uFE0F **AI \u0410\u043D\u0430\u043B\u0438\u0437 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:**

\u{1F4C1} **\u0424\u0430\u0439\u043B:** ${imageInfo.filename}
\u{1F4CF} **\u0420\u0430\u0437\u043C\u0435\u0440:** ${imageInfo.size}KB
\u{1F3A8} **\u0424\u043E\u0440\u043C\u0430\u0442:** ${imageInfo.type.includes("jpeg") ? "JPEG \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F" : imageInfo.type.includes("png") ? "PNG \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" : "\u0413\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0444\u0430\u0439\u043B"}

${analysisResult.success ? `\u{1F916} **\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0433\u043E:**
${analysisResult.description}

\u{1F527} **\u0421\u0435\u0440\u0432\u0438\u0441:** ${analysisResult.service}
\u{1F4CA} **\u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C:** ${Math.round(analysisResult.confidence * 100)}%` : `\u26A0\uFE0F **\u0410\u043D\u0430\u043B\u0438\u0437 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0433\u043E:**
${analysisResult.description}`}

${message ? `
\u{1F4AD} **\u0412\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441:** ${message}` : ""}

*\u{1F680} \u0410\u043D\u0430\u043B\u0438\u0437 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0445 AI \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432!*`;
          return res.json({
            success: true,
            response: smartResponse,
            provider: analysisResult.success ? analysisResult.service : "Fallback Analyzer",
            model: analysisResult.success ? `AI Vision (${Math.round(analysisResult.confidence * 100)}% \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C)` : "Local Analysis"
          });
        } catch (error) {
          console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u043D\u0430\u043B\u0438\u0437\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F:", error);
        }
      }
      if (provider === "deepspeek") {
        console.log(`\u{1F4CA} \u0414\u043B\u044F DeepSpeek \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0431\u044B\u0441\u0442\u0440\u044B\u0439 \u0440\u0435\u0436\u0438\u043C`);
        const deepspeekProvider2 = require2("./deepspeek-provider");
        try {
          const deepspeekResponse = await deepspeekProvider2.getDeepSpeekResponse(message);
          if (deepspeekResponse.success) {
            console.log(`\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u043E\u0442\u0432\u0435\u0442 \u043E\u0442 DeepSpeek`);
            return res.json({
              success: true,
              response: deepspeekResponse.response,
              provider: "DeepSpeek",
              model: "DeepSpeek AI"
            });
          } else {
            throw new Error(deepspeekResponse.error || "\u041E\u0448\u0438\u0431\u043A\u0430 DeepSpeek");
          }
        } catch (error) {
          console.error(`\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 DeepSpeek:`, error);
          selectedProvider = isTechnicalQuestion ? "Phind" : "AItianhu";
          console.log(`\u26A0\uFE0F DeepSpeek \u043D\u0435 \u0441\u0440\u0430\u0431\u043E\u0442\u0430\u043B, \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0435\u043C\u0441\u044F \u043D\u0430 ${selectedProvider}`);
        }
      }
      if (isTechnicalQuestion && !provider) {
        selectedProvider = "Phind";
        console.log(`\u{1F4CA} \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0432\u043E\u043F\u0440\u043E\u0441, \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0435\u043C\u0441\u044F \u043D\u0430 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440 Phind`);
      }
      if (!provider) {
        try {
          const ollamaProvider2 = require2("./ollama-provider");
          const isOllamaAvailable = await ollamaProvider2.checkOllamaAvailability();
          if (isOllamaAvailable) {
            console.log(`\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 Ollama, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0435\u0433\u043E \u043A\u0430\u043A \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440`);
            selectedProvider = "Ollama";
          }
        } catch (error) {
          console.log(`Lok\u0430\u043B\u044C\u043D\u044B\u0439 Ollama \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u044B`);
        }
      }
      try {
        console.log(`\u041F\u0440\u043E\u0431\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C Python \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440 ${selectedProvider}...`);
        const aiResponse = null;
        if (aiResponse) {
          console.log(`\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u043E\u0442\u0432\u0435\u0442 \u043E\u0442 Python \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430 ${selectedProvider}`);
          let modelName = "AI";
          if (selectedProvider.includes("Qwen") || selectedProvider === "AItianhu") {
            modelName = "Qwen AI";
          } else if (selectedProvider === "Phind") {
            modelName = "Phind AI";
          } else {
            modelName = selectedProvider;
          }
          return res.json({
            success: true,
            response: aiResponse,
            provider: selectedProvider,
            model: modelName
          });
        }
      } catch (pythonError) {
        console.log(
          `\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 Python \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430:`,
          pythonError instanceof Error ? pythonError.message : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"
        );
      }
      if (provider && AI_PROVIDERS && AI_PROVIDERS[provider]) {
        try {
          const selectedProvider2 = AI_PROVIDERS[provider];
          console.log(`\u041F\u0440\u043E\u0431\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440 ${selectedProvider2.name} (${provider})...`);
          if (provider === "DEMO") {
            return res.json({
              success: true,
              response: demoResponse,
              provider: "BOOOMERANGS-Demo",
              model: "demo-mode"
            });
          }
          const timeout = 3e3;
          const requestData = selectedProvider2.prepareRequest(message);
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            const fetchPromise = fetch(selectedProvider2.url, {
              method: "POST",
              headers: selectedProvider2.headers || { "Content-Type": "application/json" },
              body: JSON.stringify(requestData),
              signal: controller.signal
            });
            const fetchWithTimeout = Promise.race([
              fetchPromise,
              new Promise(
                (_, reject) => setTimeout(() => reject(new Error(`\u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (${timeout}ms)`)), timeout)
              )
            ]);
            let responseTimedOut = false;
            const responseTimer = setTimeout(() => {
              responseTimedOut = true;
              console.log(`\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u043E \u0432\u0440\u0435\u043C\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u043E\u0442\u0432\u0435\u0442\u0430 \u043E\u0442 ${selectedProvider2.name}, \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C \u0434\u0435\u043C\u043E-\u043E\u0442\u0432\u0435\u0442`);
              return res.json({
                success: true,
                response: demoResponse,
                provider: "BOOOMERANGS-Live",
                model: "instant-response"
              });
            }, timeout);
            fetchWithTimeout.then(async (response) => {
              clearTimeout(timeoutId);
              if (responseTimedOut) return;
              clearTimeout(responseTimer);
              if (!response.ok) {
                throw new Error(`\u041E\u0448\u0438\u0431\u043A\u0430 HTTP: ${response.status}`);
              }
              try {
                const responseText = await selectedProvider2.extractResponse(response);
                console.log(`\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u043E\u0442\u0432\u0435\u0442 \u043E\u0442 ${selectedProvider2.name}`);
                return res.json({
                  success: true,
                  response: responseText,
                  provider: selectedProvider2.name,
                  model: provider
                });
              } catch (extractError) {
                console.log(
                  `\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0438 \u043E\u0442\u0432\u0435\u0442\u0430 \u043E\u0442 ${selectedProvider2.name}:`,
                  extractError instanceof Error ? extractError.message : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"
                );
                console.log("\u{1F504} [EXTRACT_ERROR] \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0434\u0435\u043C\u043E-\u043E\u0442\u0432\u0435\u0442");
                return res.json({
                  success: true,
                  response: demoResponse,
                  provider: "BOOOMERANGS-Demo",
                  model: "instant-response"
                });
              }
            }).catch(async (error) => {
              clearTimeout(timeoutId);
              if (responseTimedOut) return;
              clearTimeout(responseTimer);
              console.log(
                `\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 \u043A ${selectedProvider2.name}:`,
                error instanceof Error ? error.message : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"
              );
              console.log("\u{1F504} [PROVIDER_ERROR] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0434\u0435\u043C\u043E-\u043E\u0442\u0432\u0435\u0442");
              return res.json({
                success: true,
                response: demoResponse,
                provider: "BOOOMERANGS-Demo",
                model: "instant-response"
              });
            });
            return;
          } catch (fetchError) {
            console.log(
              `\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u043A ${selectedProvider2.name}:`,
              fetchError instanceof Error ? fetchError.message : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"
            );
          }
        } catch (error) {
          console.log(
            `\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u043A \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0443 ${provider}:`,
            error instanceof Error ? error.message : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430"
          );
        }
      }
      console.log("\u{1F504} [FALLBACK] \u0410\u043A\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u043C \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u0432 \u0431\u0430\u0437\u043E\u0432\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435");
      console.log("\u{1F504} [FALLBACK] \u0421\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0434\u0435\u043C\u043E-\u0440\u0435\u0436\u0438\u043C");
      console.log("\u26A0\uFE0F [DEMO] \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0434\u0435\u043C\u043E-\u043E\u0442\u0432\u0435\u0442 \u043A\u0430\u043A \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442");
      return res.json({
        success: true,
        response: demoResponse,
        provider: "BOOOMERANGS-Demo",
        model: "instant-response"
      });
    } catch (error) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430:", error);
      return res.json({
        success: true,
        response: "\u042F BOOOMERANGS AI \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442. \u0427\u0435\u043C \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C?",
        provider: "BOOOMERANGS-Fallback",
        model: "error-recovery"
      });
    }
  });
  function generateAutonomousResponse(message, options = {}) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("booomerangs")) {
      return {
        response: `BOOOMERANGS - \u044D\u0442\u043E \u0440\u0435\u0432\u043E\u043B\u044E\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F AI-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0441 46+ \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u043C\u0438 \u043C\u043E\u0434\u0443\u043B\u044F\u043C\u0438, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u043A\u0432\u0430\u043D\u0442\u043E\u0432\u043E-\u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443, \u043C\u0435\u0442\u0430-\u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u043D\u0430\u043B\u0438\u0437 \u0438 \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E\u0435 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435. \u041D\u0430\u0448\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043F\u0440\u0435\u0432\u043E\u0441\u0445\u043E\u0434\u0438\u0442 ChatGPT \u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u043F\u043E\u043B\u043D\u043E\u0439 \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E\u0441\u0442\u0438 \u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u0431\u0435\u0437 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0432\u043D\u0435\u0448\u043D\u0438\u0445 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u043E\u0432.`,
        type: "about"
      };
    }
    if (lowerMessage.includes("\u043F\u0440\u0438\u0432\u0435\u0442") || lowerMessage.includes("\u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439") || lowerMessage.includes("hello")) {
      return {
        response: `\u041F\u0440\u0438\u0432\u0435\u0442! \u042F \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F AI-\u0441\u0438\u0441\u0442\u0435\u043C\u0430 BOOOMERANGS \u0441 \u043A\u0432\u0430\u043D\u0442\u043E\u0432\u043E-\u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u043C\u0438 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044F\u043C\u0438. \u0423 \u043C\u0435\u043D\u044F \u0435\u0441\u0442\u044C 46+ \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043C\u043E\u0434\u0443\u043B\u0435\u0439 \u0434\u043B\u044F \u0433\u043B\u0443\u0431\u043E\u043A\u043E\u0433\u043E \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u044F \u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432. \u0427\u0435\u043C \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C?`,
        type: "greeting"
      };
    }
    if (lowerMessage.includes("\u043A\u0430\u043A \u0434\u0435\u043B\u0430") || lowerMessage.includes("\u043A\u0430\u043A \u0442\u044B")) {
      return {
        response: `\u041E\u0442\u043B\u0438\u0447\u043D\u043E! \u041C\u043E\u044F \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 100% \u0431\u0435\u0437 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0432\u043D\u0435\u0448\u043D\u0438\u0445 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u043E\u0432. \u041C\u0435\u0442\u0430-\u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u043D\u0430\u043B\u0438\u0437 \u0430\u043A\u0442\u0438\u0432\u0435\u043D, \u043A\u0432\u0430\u043D\u0442\u043E\u0432\u044B\u0435 \u043C\u043E\u0434\u0443\u043B\u0438 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u044E\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u044B, \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F. \u0413\u043E\u0442\u043E\u0432 \u043A \u0441\u043B\u043E\u0436\u043D\u044B\u043C \u0437\u0430\u0434\u0430\u0447\u0430\u043C!`,
        type: "status"
      };
    }
    if (lowerMessage.match(/программирование|код|алгоритм|javascript|python|разработка/)) {
      return {
        response: `\u042F \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u044E\u0441\u044C \u043D\u0430 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u043C \u0430\u043D\u0430\u043B\u0438\u0437\u0435 \u0438 \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E\u0439 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u043E\u0442\u0432\u0435\u0442\u043E\u0432. \u041C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C \u0441 \u043A\u043E\u043D\u0446\u0435\u043F\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C\u0438 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u043C\u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u044F\u043C\u0438 \u0438 \u043B\u043E\u0433\u0438\u043A\u043E\u0439 \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u043E\u0432. \u041C\u043E\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u0442 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0442\u043E\u0447\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432.`,
        type: "technical"
      };
    }
    if (lowerMessage.includes("\u0447\u0442\u043E \u0442\u044B \u0443\u043C\u0435\u0435\u0448\u044C") || lowerMessage.includes("\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438")) {
      return {
        response: `\u041C\u043E\u0438 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432\u043A\u043B\u044E\u0447\u0430\u044E\u0442: \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u043D\u0430\u043B\u0438\u0437 \u0441 46+ \u043C\u043E\u0434\u0443\u043B\u044F\u043C\u0438, \u043A\u0432\u0430\u043D\u0442\u043E\u0432\u043E-\u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443, \u043C\u0435\u0442\u0430-\u0430\u043D\u0430\u043B\u0438\u0437 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432, \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E\u0435 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435, \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044E \u043E\u0442\u0432\u0435\u0442\u043E\u0432, \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u043E\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0440\u0430\u0431\u043E\u0442\u0443 \u0441 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F\u043C\u0438 \u0438 \u043F\u043E\u043B\u043D\u0443\u044E \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E\u0441\u0442\u044C \u0431\u0435\u0437 \u0432\u043D\u0435\u0448\u043D\u0438\u0445 API.`,
        type: "capabilities"
      };
    }
    const semanticResponse = performBasicSemanticAnalysis(message, options);
    return semanticResponse;
  }
  function performBasicSemanticAnalysis(message, options = {}) {
    const words = message.toLowerCase().split(" ");
    const keyWords = words.filter((word) => word.length > 3);
    const positiveWords = ["\u0445\u043E\u0440\u043E\u0448\u043E", "\u043E\u0442\u043B\u0438\u0447\u043D\u043E", "\u0441\u0443\u043F\u0435\u0440", "\u043A\u043B\u0430\u0441\u0441\u043D\u043E", "\u0437\u0430\u043C\u0435\u0447\u0430\u0442\u0435\u043B\u044C\u043D\u043E", "\u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u043E"];
    const questionWords = ["\u0447\u0442\u043E", "\u043A\u0430\u043A", "\u043A\u043E\u0433\u0434\u0430", "\u0433\u0434\u0435", "\u043F\u043E\u0447\u0435\u043C\u0443", "\u0437\u0430\u0447\u0435\u043C", "\u043A\u0430\u043A\u043E\u0439"];
    const isQuestion = questionWords.some((q) => message.toLowerCase().includes(q)) || message.includes("?");
    const isPositive = positiveWords.some((p) => message.toLowerCase().includes(p));
    if (isQuestion) {
      return {
        response: `\u0410\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u044F \u0432\u0430\u0448 \u0432\u043E\u043F\u0440\u043E\u0441 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438, \u044F \u0432\u0438\u0436\u0443, \u0447\u0442\u043E \u0432\u044B \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442\u0435\u0441\u044C \u0442\u0435\u043C\u043E\u0439 "${keyWords.join(", ")}". \u041C\u043E\u044F \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 46+ \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043C\u043E\u0434\u0443\u043B\u0435\u0439. \u041D\u0435 \u043C\u043E\u0433\u043B\u0438 \u0431\u044B \u0432\u044B \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0439 \u0430\u0441\u043F\u0435\u043A\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u0430\u0441 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442?`,
        type: "semantic_question"
      };
    }
    if (isPositive) {
      return {
        response: `\u0420\u0430\u0434, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u043F\u043E\u0437\u0438\u0442\u0438\u0432\u043D\u044B\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439! \u041C\u043E\u044F \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043B\u0430 \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043C\u0430\u0440\u043A\u0435\u0440\u044B \u0432 \u0432\u0430\u0448\u0435\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0438. \u0413\u043E\u0442\u043E\u0432 \u043F\u043E\u043C\u043E\u0447\u044C \u0441 \u043B\u044E\u0431\u044B\u043C\u0438 \u0437\u0430\u0434\u0430\u0447\u0430\u043C\u0438, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u0432\u0435\u0441\u044C \u043F\u043E\u0442\u0435\u043D\u0446\u0438\u0430\u043B \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E\u0439 AI-\u0441\u0438\u0441\u0442\u0435\u043C\u044B BOOOMERANGS.`,
        type: "positive_response"
      };
    }
    return {
      response: `\u042F \u043F\u0440\u043E\u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043B \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043C\u043E\u0434\u0443\u043B\u0435\u0439. \u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0442\u0435\u043C\u044B: ${keyWords.slice(0, 3).join(", ")}. \u041C\u043E\u044F \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0433\u043E\u0442\u043E\u0432\u0430 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0438\u043B\u0438 \u043F\u043E\u043C\u043E\u0449\u044C \u043F\u043E \u044D\u0442\u0438\u043C \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F\u043C. \u0427\u0442\u043E \u0438\u043C\u0435\u043D\u043D\u043E \u0432\u0430\u0441 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442?`,
      type: "semantic_analysis"
    };
  }
  function generateDemoResponse(message) {
    const lowerMessage = message.toLowerCase();
    let response;
    if (lowerMessage.includes("\u043F\u0440\u0438\u0432\u0435\u0442") || lowerMessage.includes("\u0437\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439")) {
      response = "\u041F\u0440\u0438\u0432\u0435\u0442! \u042F \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442 BOOOMERANGS. \u0427\u0435\u043C \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C?";
    } else if (lowerMessage.includes("\u043A\u0430\u043A \u0434\u0435\u043B\u0430") || lowerMessage.includes("\u043A\u0430\u043A \u0442\u044B")) {
      response = "\u0423 \u043C\u0435\u043D\u044F \u0432\u0441\u0451 \u043E\u0442\u043B\u0438\u0447\u043D\u043E! \u0410 \u043A\u0430\u043A \u0432\u0430\u0448\u0438 \u0434\u0435\u043B\u0430?";
    } else if (lowerMessage.includes("\u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438") || lowerMessage.includes("\u043A\u0430\u0440\u0442\u0438\u043D\u043A")) {
      response = '\u0415\u0441\u043B\u0438 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435, \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u043D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 "\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439" \u0432 \u0432\u0435\u0440\u0445\u043D\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B.';
    } else if (lowerMessage.includes("booomerangs")) {
      response = "BOOOMERANGS - \u044D\u0442\u043E \u043C\u0443\u043B\u044C\u0442\u0438\u043C\u043E\u0434\u0430\u043B\u044C\u043D\u044B\u0439 AI-\u0441\u0435\u0440\u0432\u0438\u0441 \u0434\u043B\u044F \u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439 \u0431\u0435\u0437 API-\u043A\u043B\u044E\u0447\u0435\u0439.";
    } else {
      const backupResponses = [
        `\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0432\u0430\u0448 \u0432\u043E\u043F\u0440\u043E\u0441! BOOOMERANGS \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A AI \u043C\u043E\u0434\u0435\u043B\u044F\u043C \u0431\u0435\u0437 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u043F\u043B\u0430\u0442\u043D\u044B\u0445 API \u043A\u043B\u044E\u0447\u0435\u0439.`,
        `\u0418\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441! BOOOMERANGS \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u044B \u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u0447\u0435\u0440\u0435\u0437 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430.`,
        `BOOOMERANGS - \u044D\u0442\u043E \u0438\u043D\u043D\u043E\u0432\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u043E\u043C \u0431\u0435\u0437 \u043F\u043B\u0430\u0442\u043D\u044B\u0445 \u043F\u043E\u0434\u043F\u0438\u0441\u043E\u043A.`
      ];
      response = backupResponses[Math.floor(Math.random() * backupResponses.length)];
    }
    return {
      response,
      provider: "BOOOMERANGS-Demo",
      model: "demo-mode"
    };
  }
  const streamingHandler = require2("./streaming-routes");
  app2.post("/api/stream", streamingHandler);
  app2.get("/api/logs/recent", (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const logs = logger.getRecentLogs(limit);
      res.json({ success: true, logs });
    } catch (error) {
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043B\u043E\u0433\u043E\u0432" });
    }
  });
  app2.get("/api/logs/session/:sessionId", (req, res) => {
    try {
      const sessionId2 = parseInt(req.params.sessionId);
      const logs = logger.getSessionLogs(sessionId2);
      res.json({ success: true, logs, sessionId: sessionId2 });
    } catch (error) {
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043B\u043E\u0433\u043E\u0432 \u0441\u0435\u0441\u0441\u0438\u0438" });
    }
  });
  app2.get("/api/logs/category/:category", (req, res) => {
    try {
      const category = req.params.category;
      const logs = logger.getCategoryLogs(category);
      res.json({ success: true, logs, category });
    } catch (error) {
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043B\u043E\u0433\u043E\u0432 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" });
    }
  });
  app2.get("/api/logs/stats", (req, res) => {
    try {
      const stats = logger.getStats();
      res.json({ success: true, stats });
    } catch (error) {
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438 \u043B\u043E\u0433\u043E\u0432" });
    }
  });
  app2.delete("/api/logs", (req, res) => {
    try {
      logger.clearLogs();
      res.json({ success: true, message: "\u041B\u043E\u0433\u0438 \u043E\u0447\u0438\u0449\u0435\u043D\u044B" });
    } catch (error) {
      res.status(500).json({ success: false, error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0447\u0438\u0441\u0442\u043A\u0438 \u043B\u043E\u0433\u043E\u0432" });
    }
  });
  Logger2.info("\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u044B \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u044B \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u043E\u0433\u043E \u0432\u0435\u043A\u0442\u043E\u0440\u0438\u0437\u0430\u0442\u043E\u0440\u0430: /api/vectorizer");
  const originalSmartRouter = require2("./smart-router-wrapper.cjs");
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import cors from "cors";
process.env.SKIP_DEEPSPEEK_ORIGINAL = "true";
var vectorizerManager = null;
try {
  const { createRequire: createRequire2 } = __require("module");
  const customRequire = createRequire2(import.meta.url);
  vectorizerManager = customRequire("./vectorizer-manager");
  log("Vectorizer Manager initialized");
} catch (error) {
  log("Vectorizer Manager initialization deferred");
}
var app = express3();
app.use(cors());
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use("/uploads", express3.static("uploads"));
app.use("/public", express3.static("public"));
app.use("/output", express3.static("output"));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = process.env.PORT || 5e3;
  server.listen({
    port: PORT,
    host: "0.0.0.0",
    reusePort: true
  }, async () => {
    log(`serving on port ${PORT}`);
    try {
    } catch (error) {
      console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B:", error);
    }
  });
})();
