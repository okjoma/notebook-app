import React, { useState } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'

export function SearchBar({ filter, onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="card p-4 mb-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="搜索日记内容、地点、标签..."
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ ...filter, searchQuery: e.target.value })}
            className="input pl-10 w-full"
          />
        </div>
        <button
          className="btn btn-secondary flex items-center gap-2 justify-center"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={16} />
          <span>筛选</span>
        </button>
      </div>

      {showFilters && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <FilterTags
            filter={filter}
            onFilterChange={onFilterChange}
            onClose={() => setShowFilters(false)}
          />
        </div>
      )}
    </div>
  )
}

function FilterTags({ filter, onFilterChange, onClose }) {
  const categories = ['全部', '工作', '生活', '旅行']

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">按分类筛选</span>
        <button
          className="p-1 rounded hover:bg-gray-100"
          onClick={onClose}
        >
          <X size={16} className="text-gray-400" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange({
              ...filter,
              category: category === '全部' ? null : category
            })}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              (filter.category || '全部') === category
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
