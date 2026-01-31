import React, { useEffect } from 'react'
import { useStore } from '../store'
import { EntryCard, EmptyState } from '../components/EntryCard'
import { SearchBar } from '../components/SearchBar'
import { Plus, Settings, Moon, Sun } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function EntryList() {
  const {
    entries,
    filter,
    setFilter,
    getFilteredEntries,
    setCurrentPage,
    setSelectedEntry,
    setIsEditorOpen,
    deleteEntry,
  } = useStore()

  const [darkMode, setDarkMode] = useState(false)

  const filteredEntries = getFilteredEntries()

  const handleViewEntry = (entry) => {
    setSelectedEntry(entry)
    setCurrentPage('detail')
  }

  const handleEditEntry = (entry, e) => {
    e.stopPropagation()
    setSelectedEntry(entry)
    setCurrentPage('editor')
  }

  const handleDeleteEntry = (id, e) => {
    e.stopPropagation()
    if (window.confirm('确定要删除这条日记吗？')) {
      deleteEntry(id)
    }
  }

  const handleNewEntry = () => {
    setSelectedEntry(null)
    setCurrentPage('template-select')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark', !darkMode)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                我的日记
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                记录生活，珍藏回忆
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost p-2"
                onClick={toggleDarkMode}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="btn btn-ghost p-2"
                onClick={() => setCurrentPage('templates')}
              >
                <Settings size={20} />
              </button>
              <button
                className="btn btn-primary flex items-center gap-2"
                onClick={handleNewEntry}
              >
                <Plus size={20} />
                <span className="hidden sm:inline">新建日记</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and Filter */}
        <SearchBar filter={filter} onFilterChange={setFilter} />

        {/* Entry List */}
        {filteredEntries.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4">
            {filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onClick={handleViewEntry}
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
              />
            ))}
          </div>
        )}
      </main>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-3">
        <button
          className="w-full btn btn-primary flex items-center justify-center gap-2"
          onClick={handleNewEntry}
        >
          <Plus size={20} />
          <span>新建日记</span>
        </button>
      </div>
    </div>
  )
}
