import { create } from 'zustand'
import { format } from 'date-fns'

// 模拟数据
const mockTemplates = [
  {
    id: 'template-1',
    name: '工作日志',
    category: '工作',
    fields: [
      { type: 'date', enabled: true },
      { type: 'time', enabled: true },
      { type: 'content', enabled: true },
      { type: 'tags', enabled: true },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'template-2',
    name: '旅行日记',
    category: '旅行',
    fields: [
      { type: 'date', enabled: true },
      { type: 'time', enabled: true },
      { type: 'location', enabled: true },
      { type: 'weather', enabled: true },
      { type: 'mood', enabled: true },
      { type: 'content', enabled: true },
      { type: 'images', enabled: true },
      { type: 'ai-summary', enabled: true },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'template-3',
    name: '日常记录',
    category: '生活',
    fields: [
      { type: 'date', enabled: true },
      { type: 'time', enabled: true },
      { type: 'mood', enabled: true },
      { type: 'content', enabled: true },
      { type: 'tags', enabled: true },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]

const mockEntries = [
  {
    id: 'entry-1',
    templateId: 'template-2',
    templateName: '旅行日记',
    category: '旅行',
    fields: [
      { type: 'date', value: '2024-01-15' },
      { type: 'time', value: '14:30' },
      { type: 'location', value: '三亚亚龙湾' },
      { type: 'weather', value: '晴天 28°C' },
      { type: 'mood', value: '😊' },
      { type: 'content', value: '今天来到三亚亚龙湾，海水清澈见底，沙滩洁白细腻。我和家人一起玩了整整一下午的沙子，还捡了许多漂亮的贝壳。晚上在海鲜大排档吃了新鲜的龙虾和螃蟹，非常美味！' },
      { type: 'ai-summary', value: '与家人在三亚亚龙湾度过愉快的一天，享受了海滩乐趣和美味海鲜。' },
    ],
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'entry-2',
    templateId: 'template-1',
    templateName: '工作日志',
    category: '工作',
    fields: [
      { type: 'date', value: '2024-01-16' },
      { type: 'time', value: '09:00' },
      { type: 'content', value: '完成了季度报告的初稿，与团队成员进行了需求评审会议。下午开始着手进行技术方案的调研，确定了几个备选方案。' },
      { type: 'tags', value: ['报告', '会议', '技术调研'] },
    ],
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: 'entry-3',
    templateId: 'template-3',
    templateName: '日常记录',
    category: '生活',
    fields: [
      { type: 'date', value: '2024-01-17' },
      { type: 'time', value: '20:00' },
      { type: 'mood', value: '😌' },
      { type: 'content', value: '周末在家休息，看了一部很棒的电影，做了一顿丰盛的晚餐。晚上泡了个热水澡，感觉整个人都放松了下来。简单的一天，但很充实。' },
      { type: 'tags', value: ['周末', '休息', '电影'] },
    ],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]

export const useStore = create((set, get) => ({
  templates: mockTemplates,
  entries: mockEntries,
  filter: { category: null, searchQuery: '' },
  currentPage: 'list',
  selectedEntry: null,
  selectedTemplate: null,
  isEditorOpen: false,

  setFilter: (filter) => set({ filter }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedEntry: (entry) => set({ selectedEntry: entry }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  setIsEditorOpen: (isOpen) => set({ isEditorOpen: isOpen }),

  getFilteredEntries: () => {
    const { entries, filter } = get()
    return entries
      .filter(entry => {
        if (filter.category && entry.category !== filter.category) return false
        if (filter.searchQuery) {
          const query = filter.searchQuery.toLowerCase()
          const content = entry.fields.find(f => f.type === 'content')?.value || ''
          const location = entry.fields.find(f => f.type === 'location')?.value || ''
          const tags = entry.fields.find(f => f.type === 'tags')?.value || []
          const searchIn = `${content} ${location} ${Array.isArray(tags) ? tags.join(' ') : ''}`
          return searchIn.toLowerCase().includes(query)
        }
        return true
      })
      .sort((a, b) => b.createdAt - a.createdAt)
  },

  getCategories: () => {
    const { templates } = get()
    return [...new Set(templates.map(t => t.category))]
  },

  getEntryById: (id) => {
    const { entries } = get()
    return entries.find(e => e.id === id)
  },

  addEntry: (entry) => set(state => ({
    entries: [entry, ...state.entries]
  })),

  updateEntry: (id, updatedEntry) => set(state => ({
    entries: state.entries.map(e => e.id === id ? { ...e, ...updatedEntry, updatedAt: Date.now() } : e)
  })),

  deleteEntry: (id) => set(state => ({
    entries: state.entries.filter(e => e.id !== id)
  })),

  addTemplate: (template) => set(state => ({
    templates: [...state.templates, template]
  })),

  updateTemplate: (id, updatedTemplate) => set(state => ({
    templates: state.templates.map(t => t.id === id ? { ...t, ...updatedTemplate, updatedAt: Date.now() } : t)
  })),

  deleteTemplate: (id) => set(state => ({
    templates: state.templates.filter(t => t.id !== id)
  })),
}))
