import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProject, removeProject, updateProject } from '../redux/slices/projectsSlice'
import Modal from '../components/ui/Modal'
import ProjectForm from '../components/ProjectForm'

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
}

function ProjectsPage() {
  const projects = useSelector((state) => state.projects.items)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  // 📖 Create
  const handleCreate = (formData) => {
    dispatch(
      addProject({
        id: crypto.randomUUID(),
        ...formData,
        members: [],
        createdAt: new Date().toISOString().slice(0, 10),
      })
    )
    setModalOpen(false)
  }

  // 📖 Update
  const handleUpdate = (formData) => {
    dispatch(updateProject({ id: editingProject.id, ...formData }))
    setEditingProject(null)
    setModalOpen(false)
  }

  // 📖 Delete
  const handleDelete = () => {
    dispatch(removeProject(deletingProject.id))
    setDeletingProject(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => {
            setEditingProject(null)
            setModalOpen(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${colorClasses[proj.color]} flex items-center justify-center text-white font-bold`}>
                {proj.name[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{proj.name}</h3>
                <p className="text-xs text-gray-500 truncate">{proj.description}</p>
              </div>
              {/* 📖 Row of action buttons per card */}
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingProject(proj)
                    setModalOpen(true)
                  }}
                  className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => setDeletingProject(proj)}
                  className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500">Members: {proj.members.length}</p>
          </div>
        ))}
      </div>

      {/* 📖 Add/Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'New Project'}
      >
        <ProjectForm
          initialProject={editingProject}
          onSubmit={editingProject ? handleUpdate : handleCreate}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      {/* 📖 Delete confirmation */}
      <Modal
        open={!!deletingProject}
        onClose={() => setDeletingProject(null)}
        title="Delete Project"
      >
        <p className="text-sm text-gray-600 mb-5">
          Kya aap <span className="font-semibold">{deletingProject?.name}</span> ko delete karna chahte hain? Ye action undo nahi ho sakta.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeletingProject(null)}
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ProjectsPage
