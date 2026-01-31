import React from 'react'
import { useStore } from '../store'
import { ArrowLeft, Edit2, Trash2, Share2, MapPin, Calendar, Clock, CloudSun, Smile, Tag, Image as ImageIcon, Wand2 } from 'lucide-react'

export function EntryDetail() {
  const { selectedEntry, setCurrentPage, setSelectedEntry, deleteEntry, setSelectedTemplate } = useStore()

  if (!selectedEntry) {
    setCurrentPage('list')
    return null
  }

  const getField = (type) => selectedEntry.fields.find(f => f.type === type)

  const dateField = getField('date')
  const timeField = getField('time')
  const contentField = getField('content')
  const locationField = getField('location')
  const weatherField = getField('weather')
  const moodField = getField('mood')
  const tagsField = getField('tags')
  const imagesField = getField('images')
  const aiSummaryField = getField('ai-summary')

  const tags = Array.isArray(tagsField?.value) ? tagsField.value : []
  const images = Array.isArray(imagesField?.value) ? imagesField.value : []

  const handleEdit = () => {
    const template = useStore.getState().templates.find(t => t.id === selectedEntry.templateId)
    setSelectedTemplate(template)
    setCurrentPage('editor')
  }

  const handleDelete = () => {
    if (window.confirm('确定要删除这条日记吗？')) {
      deleteEntry(selectedEntry.id)
      setSelectedEntry(null)
      setCurrentPage('list')
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="btn btn-ghost p-2"
                onClick={() => {
                  setSelectedEntry(null)
                  setCurrentPage('list')
                }}
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-lg font-semibold">日记详情</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost p-2"
                onClick={handleEdit}
              >
                <Edit2 size={20} />
              </button>
              <button
                className="btn btn-ghost p-2 text-gray-500 hover:text-rose-600"
                onClick={handleDelete}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="card p-6 md:p-8">
          {/* Category and Date */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm font-medium px-3 py-1.5 rounded-full bg-rose-100 text-rose-700">
              {selectedEntry.category}
            </span>
            {dateField?.value && (
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Calendar size={16} />
                <span>{dateField.value}</span>
              </div>
            )}
            {timeField?.value && (
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Clock size={16} />
                <span>{timeField.value}</span>
              </div>
            )}
          </div>

          {/* Location and Weather */}
          {(locationField?.value || weatherField?.value || moodField?.value) && (
            <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-100">
              {locationField?.value && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} className="text-rose-400" />
                  <span>{locationField.value}</span>
                </div>
              )}
              {weatherField?.value && (
                <div className="flex items-center gap-2 text-gray-600">
                  <CloudSun size={18} className="text-rose-400" />
                  <span>{weatherField.value}</span>
                </div>
              )}
              {moodField?.value && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Smile size={18} className="text-rose-400" />
                  <span className="text-xl">{moodField.value}</span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          {contentField?.value && (
            <div className="mb-8">
              <div className="prose prose-rose max-w-none">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                  {contentField.value}
                </p>
              </div>
            </div>
          )}

          {/* AI Summary */}
          {aiSummaryField?.value && (
            <div className="mb-8 p-5 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-100">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 size={18} className="text-rose-500" />
                <span className="font-medium text-rose-700">AI 摘要</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {aiSummaryField.value}
              </p>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={18} className="text-rose-400" />
                <span className="font-medium text-gray-700">标签</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Images */}
          {images.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon size={18} className="text-rose-400" />
                <span className="font-medium text-gray-700">图片</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden"
                  >
                    <ImageIcon size={32} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="mt-4 text-center text-sm text-gray-400">
          创建于 {new Date(selectedEntry.createdAt).toLocaleString('zh-CN')}
          {selectedEntry.updatedAt !== selectedEntry.createdAt && (
            <span className="ml-2">
              · 更新于 {new Date(selectedEntry.updatedAt).toLocaleString('zh-CN')}
            </span>
          )}
        </div>
      </main>
    </div>
  )
}
