import { useState } from 'react'

const colorOptions = ['blue', 'green', 'orange', 'purple', 'red']

const colorBg = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
}

function ProjectForm({ initialProject, onSubmit, onCancel }) {
  const [name, setName] = useState(initialProject?.name || '')
  const [description, setDescription] = useState(initialProject?.description || '')
  const [color, setColor] = useState(initialProject?.color || 'blue')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({ name: name.trim(), description, color })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 📖 NAME FIELD */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Project Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Marketing Website"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* 📖 DESCRIPTION FIELD */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          placeholder="Short description of the project"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 📖 COLOR PICKER */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Color</label>
        <div className="flex gap-2">
          {colorOptions.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full ${colorBg[c]} ${
                color === c ? 'ring-2 ring-offset-2 ring-gray-800' : ''
              }`}
              aria-label={c}
            />
          ))}
        </div>
      </div>

      {/* 📖 FORM ACTIONS */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          {initialProject ? 'Save Changes' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
