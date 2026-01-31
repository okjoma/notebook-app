import React from 'react'
import { Calendar, MapPin, CloudSun, Tag, Image as ImageIcon, MoreVertical, Trash2, Edit2 } from 'lucide-react'

const FieldIcons = {
  date: Calendar,
  time: Calendar,
  location: MapPin,
  weather: CloudSun,
  mood: null,
  content: null,
  tags: Tag,
  images: ImageIcon,
  'ai-summary': null,
}

const MoodEmojis = {
  '😊': '开心',
  '😌': '平静',
  '😢': '难过',
  '😤': '生气',
  '😴': '疲惫',
  '🥳': '兴奋',
  '😍': '喜爱',
  '🤔': '思考',
}

export function EntryCard({ entry, onClick, onEdit, onDelete }) {
  const dateField = entry.fields.find(f => f.type === 'date')
  const timeField = entry.fields.find(f => f.type === 'time')
  const contentField = entry.fields.find(f => f.type === 'content')
  const locationField = entry.fields.find(f => f.type === 'location')
  const weatherField = entry.fields.find(f => f.type === 'weather')
  const moodField = entry.fields.find(f => f.type === 'mood')
  const tagsField = entry.fields.find(f => f.type === 'tags')
  const imagesField = entry.fields.find(f => f.type === 'images')
  const aiSummaryField = entry.fields.find(f => f.type === 'ai-summary')

  const preview = contentField?.value?.slice(0, 80)
  const tags = Array.isArray(tagsField?.value) ? tagsField.value : []

  const handleCardClick = (e) => {
    if (!e.target.closest('.action-btn')) {
      onClick?.()
    }
  }

  return (
    <div
      className="card p-4 md:p-5 cursor-pointer hover:shadow-md transition-all"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
            {entry.category}
          </span>
          {dateField?.value && (
            <span className="text-sm text-gray-500">{dateField.value}</span>
          )}
          {timeField?.value && (
            <span className="text-sm text-gray-500">{timeField.value}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="action-btn p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-rose-600 transition-colors"
            onClick={() => onEdit?.(entry)}
          >
            <Edit2 size={16} />
          </button>
          <button
            className="action-btn p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-rose-600 transition-colors"
            onClick={() => onDelete?.(entry.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {(locationField?.value || weatherField?.value || moodField?.value) && (
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
          {locationField?.value && (
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{locationField.value}</span>
            </div>
          )}
          {weatherField?.value && (
            <div className="flex items-center gap-1">
              <CloudSun size={14} />
              <span>{weatherField.value}</span>
            </div>
          )}
          {moodField?.value && (
            <span className="text-lg" title={MoodEmojis[moodField.value] || '心情'}>
              {moodField.value}
            </span>
          )}
        </div>
      )}

      {preview && (
        <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-2">
          {preview}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}

      {imagesField?.value?.length > 0 && (
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <ImageIcon size={14} />
          <span>{imagesField.value.length} 张图片</span>
        </div>
      )}

      {aiSummaryField?.value && (
        <div className="mt-3 p-2.5 bg-rose-50 rounded-lg border border-rose-100">
          <p className="text-xs text-rose-700 leading-relaxed">
            <span className="font-medium">AI 摘要：</span>
            {aiSummaryField.value}
          </p>
        </div>
      )}
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center mb-4">
        <svg className="w-12 h-12 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">暂无日记</h3>
      <p className="text-gray-500 text-center max-w-xs">
        开始记录你的生活吧！点击右上角的「+」按钮创建第一条日记。
      </p>
    </div>
  )
}
