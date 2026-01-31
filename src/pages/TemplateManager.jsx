import React from 'react'
import { useStore } from '../store'
import { ArrowLeft, Plus, Edit2, Trash2, Calendar, Tag } from 'lucide-react'

export function TemplateManager() {
  const { templates, setCurrentPage, addTemplate, updateTemplate, deleteTemplate } = useStore()

  const handleCreateTemplate = () => {
    const name = prompt('请输入模板名称：')
    if (!name) return

    const category = prompt('请输入分类（如：工作、生活、旅行）：')
    if (!category) return

    const newTemplate = {
      id: `template-${Date.now()}`,
      name,
      category,
      fields: [
        { type: 'date', enabled: true },
        { type: 'time', enabled: true },
        { type: 'content', enabled: true },
        { type: 'tags', enabled: true },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    addTemplate(newTemplate)
  }

  const handleDeleteTemplate = (template) => {
    if (window.confirm(`确定要删除模板「${template.name}」吗？`)) {
      deleteTemplate(template.id)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-ghost p-2"
              onClick={() => setCurrentPage('list')}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">模板管理</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <button
          className="w-full card p-4 flex items-center justify-center gap-2 text-rose-600 hover:text-rose-700 hover:shadow-md transition-all mb-6"
          onClick={handleCreateTemplate}
        >
          <Plus size={20} />
          <span>创建新模板</span>
        </button>

        <div className="grid gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="card p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {template.name}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                    {template.category}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                    onClick={() => alert('编辑功能开发中...')}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-rose-600 transition-colors"
                    onClick={() => handleDeleteTemplate(template)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Tag size={16} />
                  <span>{template.fields.filter(f => f.enabled).length} 个字段</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  <span>创建于 {new Date(template.createdAt).toLocaleDateString('zh-CN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
