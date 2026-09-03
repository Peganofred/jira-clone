import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, updateTask } from '../redux/slices/tasksSlice'
import Modal from '../components/ui/Modal'
import TaskForm from '../components/TaskForm'

const statusMap = {
  todo: { label: 'To Do', cls: 'bg-gray-100 text-gray-700' },
  'in-progress': { label: 'In Progress', cls: 'bg-blue-100 text-blue-700' },
  done: { label: 'Done', cls: 'bg-green-100 text-green-700' },
}

const priorityMap = {
  high: { label: 'High', cls: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium', cls: 'bg-orange-100 text-orange-700' },
  low: { label: 'Low', cls: 'bg-green-100 text-green-700' },
}

function TasksPage() {
  const tasks = useSelector((state) => state.tasks.items)
  const members = useSelector((state) => state.members.items)
  const projects = useSelector((state) => state.projects.items)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)
  const [projectFilter, setProjectFilter] = useState('all')

  const getMemberName = (id) => members.find((m) => m.id === id)?.name || 'Unassigned'
  const getProjectName = (id) => projects.find((p) => p.id === id)?.name || 'Unknown'

  const filteredTasks =
    projectFilter === 'all' ? tasks : tasks.filter((t) => t.projectId === projectFilter)

  const handleCreate = (formData) => {
    dispatch(
      addTask({
        id: crypto.randomUUID(),
        ...formData,
        createdAt: new Date().toISOString().slice(0, 10),
      })
    )
    setModalOpen(false)
  }

  const handleUpdate = (formData) => {
    dispatch(updateTask({ id: editingTask.id, ...formData }))
    setEditingTask(null)
    setModalOpen(false)
  }

  const handleDelete = () => {
    dispatch(removeTask(deletingTask.id))
    setDeletingTask(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          onClick={() => {
            setEditingTask(null)
            setModalOpen(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {/* Project filter dropdown */}
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm text-gray-600">Filter by project:</label>
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none"
        >
          <option value="all">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Task</th>
              <th className="text-left px-4 py-3">Project</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Priority</th>
              <th className="text-left px-4 py-3">Assignee</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => {
              const status = statusMap[task.status]
              const priority = priorityMap[task.priority]
              return (
                <tr key={task.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{getProjectName(task.projectId)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${status.cls}`}>{status.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${priority.cls}`}>{priority.label}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{getMemberName(task.assignee)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingTask(task)
                          setModalOpen(true)
                        }}
                        className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => setDeletingTask(task)}
                        className="text-xs px-2 py-1 border border-red-200 text-red-600 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'New Task'}
      >
        <TaskForm
          initialTask={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <Modal
        open={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        title="Delete Task"
      >
        <p className="text-sm text-gray-600 mb-5">
          Kya aap <span className="font-semibold">{deletingTask?.title}</span> ko delete karna chahte hain?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeletingTask(null)}
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

export default TasksPage
