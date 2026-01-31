import React from 'react'
import ReactDOM from 'react-dom/client'
import { EntryList } from './pages/EntryList'
import { EntryDetail } from './pages/EntryDetail'
import { Editor, TemplateSelector } from './pages/Editor'
import { TemplateManager } from './pages/TemplateManager'
import { useStore } from './store'

function App() {
  const currentPage = useStore((state) => state.currentPage)
  const selectedTemplate = useStore((state) => state.selectedTemplate)
  const selectedEntry = useStore((state) => state.selectedEntry)

  const handleTemplateSelect = (template) => {
    useStore.getState().setSelectedTemplate(template)
  }

  const handleEditorSave = (entryData) => {
    const state = useStore.getState()
    if (entryData.id.startsWith('entry-')) {
      state.addEntry(entryData)
    } else {
      state.updateEntry(entryData.id, entryData)
    }
    state.setSelectedEntry(entryData)
    state.setCurrentPage('detail')
  }

  const handleEditorCancel = () => {
    useStore.getState().setCurrentPage('list')
  }

  switch (currentPage) {
    case 'list':
      return <EntryList />
    case 'detail':
      return <EntryDetail />
    case 'template-select':
      return (
        <TemplateSelector
          onSelect={handleTemplateSelect}
          onBack={() => useStore.getState().setCurrentPage('list')}
        />
      )
    case 'editor':
      return selectedTemplate ? (
        <Editor
          template={selectedTemplate}
          entry={selectedEntry}
          onSave={handleEditorSave}
          onCancel={handleEditorCancel}
        />
      ) : null
    case 'templates':
      return <TemplateManager />
    default:
      return <EntryList />
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
