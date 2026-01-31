import React from 'react'
import { useStore } from '../store'
import { ArrowLeft, Calendar, Clock, MapPin, CloudSun, Tag, Smile, Image as ImageIcon, Wand2, Save } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const MOOD_OPTIONS = ['😊', '😌', '😢', '😤', '😴', '🥳', '😍', '🤔']

export function TemplateSelector({ onSelect, onBack }) {
  const { templates } = useStore()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-ghost p-2"
              onClick={onBack}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">选择模板</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <button
              key={template.id}
              className="card p-6 text-left hover:shadow-md transition-all group"
              onClick={() => onSelect(template)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                  {template.category}
                </span>
                <ArrowLeft className="rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-500">
                {template.fields.filter(f => f.enabled).length} 个字段
              </p>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

export function Editor({ template, onSave, onCancel, entry = null }) {
  const [formData, setFormData] = React.useState(() => {
    if (entry) {
      return entry.fields.reduce((acc, field) => {
        acc[field.type] = field.value
        return acc
      }, {})
    }
    return template.fields.reduce((acc, field) => {
      if (field.enabled) {
        switch (field.type) {
          case 'date':
            acc[field.type] = format(new Date(), 'yyyy-MM-dd', { locale: zhCN })
            break
          case 'time':
            acc[field.type] = format(new Date(), 'HH:mm')
            break
          case 'weather':
            acc[field.type] = '晴天 25°C'
            break
          case 'mood':
            acc[field.type] = '😊'
            break
          case 'content':
            acc[field.type] = ''
            break
          case 'location':
            acc[field.type] = ''
            break
          case 'tags':
            acc[field.type] = []
            break
          case 'images':
            acc[field.type] = []
            break
          case 'ai-summary':
            acc[field.type] = ''
            break
          default:
            acc[field.type] = ''
        }
      }
      return acc
    }, {})
  })

  const [tagInput, setTagInput] = React.useState('')

  const enabledFields = template.fields.filter(f => f.enabled)

  const handleFieldChange = (fieldType, value) => {
    setFormData(prev => ({ ...prev, [fieldType]: value }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      handleFieldChange('tags', [...(formData.tags || []), tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag) => {
    handleFieldChange('tags', formData.tags?.filter(t => t !== tag) || [])
  }

  const handleSubmit = () => {
    const entryData = {
      id: entry?.id || `entry-${Date.now()}`,
      templateId: template.id,
      templateName: template.name,
      category: template.category,
      fields: enabledFields.map(field => ({
        type: field.type,
        value: formData[field.type]
      })),
      createdAt: entry?.createdAt || Date.now(),
      updatedAt: Date.now(),
    }
    onSave(entryData)
  }

  const renderField = (field) => {
    const value = formData[field.type]

    switch (field.type) {
      case 'date':
        return (
          <div className="flex items-center gap-2 input">
            <Calendar size={18} className="text-gray-400" />
            <input
              type="date"
              value={value}
              onChange={(e) => handleFieldChange('date', e.target.value)}
              className="bg-transparent border-none outline-none flex-1"
            />
          </div>
        )

      case 'time':
        return (
          <div className="flex items-center gap-2 input">
            <Clock size={18} className="text-gray-400" />
            <input
              type="time"
              value={value}
              onChange={(e) => handleFieldChange('time', e.target.value)}
              className="bg-transparent border-none outline-none flex-1"
            />
          </div>
        )

      case 'location':
        return (
          <div className="flex items-center gap-2 input">
            <MapPin size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="输入或点击获取位置"
              value={value}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              className="bg-transparent border-none outline-none flex-1"
            />
          </div>
        )

      case 'weather':
        return (
          <div className="flex items-center gap-2 input">
            <CloudSun size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="天气会自动获取"
              value={value}
              onChange={(e) => handleFieldChange('weather', e.target.value)}
              className="bg-transparent border-none outline-none flex-1"
            />
          </div>
        )

      case 'mood':
        return (
          <div className="flex gap-2 flex-wrap">
            {MOOD_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleFieldChange('mood', emoji)}
                className={`w-12 h-12 rounded-xl text-2xl transition-all ${
                  value === emoji
                    ? 'bg-rose-100 ring-2 ring-rose-500 ring-offset-2'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )

      case 'content':
        return (
          <textarea
            placeholder="记录你的想法..."
            value={value}
            onChange={(e) => handleFieldChange('content', e.target.value)}
            className="input-textarea w-full min-h-[200px]"
            rows={8}
          />
        )

      case 'tags':
        return (
          <div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="添加标签"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn btn-secondary"
              >
                添加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(value || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm"
                >
                  <Tag size={14} />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-rose-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )

      case 'images':
        return (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-rose-300 transition-colors cursor-pointer">
            <ImageIcon size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 mb-2">点击上传或拖拽图片</p>
            <p className="text-xs text-gray-400">支持 JPG、PNG 格式，最大 5MB</p>
          </div>
        )

      case 'ai-summary':
        return (
          <div className="p-4 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-100">
            <div className="flex items-center gap-2 mb-2">
              <Wand2 size={18} className="text-rose-500" />
              <span className="text-sm font-medium text-rose-700">AI 摘要</span>
            </div>
            <p className="text-sm text-gray-600">
              保存时自动生成这篇日记的摘要
            </p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="btn btn-ghost p-2"
                onClick={onCancel}
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-lg font-semibold">{entry ? '编辑日记' : template.name}</h1>
                <p className="text-sm text-gray-500">{template.category}</p>
              </div>
            </div>
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={handleSubmit}
            >
              <Save size={18} />
              <span>保存</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <form className="space-y-6">
          {enabledFields.map((field) => (
            <div key={field.type}>
              {field.type !== 'ai-summary' && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getFieldLabel(field.type)}
                </label>
              )}
              {renderField(field)}
            </div>
          ))}
        </form>
      </main>
    </div>
  )
}

function getFieldLabel(type) {
  const labels = {
    date: '日期',
    time: '时间',
    location: '地点',
    weather: '天气',
    mood: '心情',
    content: '正文内容',
    tags: '标签',
    images: '图片',
    'ai-summary': 'AI 摘要',
  }
  return labels[type] || type
}
