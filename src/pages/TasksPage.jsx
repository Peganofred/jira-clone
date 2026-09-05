import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, updateTask } from '../redux/slices/tasksSlice'
import Modal from '../components/ui/Modal'
import TaskForm from '../components/TaskForm'
import TaskDetail from '../components/TaskDetail'

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
  const comments = useSelector((state) => state.comments.items)
  const searchTerm = useSelector((state) => state.ui.searchTerm)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)
  const [detailTask, setDetailTask] = useState(null)
  const [projectFilter, setProjectFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const getMemberName = (id) => members.find((m) => m.id === id)?.name || 'Unassigned'
  const getProjectName = (id) => projects.find((p) => p.id === id)?.name || 'Unknown'
  const getCommentCount = (taskId) =>
    comments.filter((c) => c.taskId === taskId).length

  // 📖 Combined filtering: project + status + priority + search
  const filteredTasks = tasks.filter((task) => {
    // project filter
    if (projectFilter !== 'all' && task.projectId !== projectFilter) return false
    // status filter
    if (statusFilter !== 'all' && task.status !== statusFilter) return false
    // priority filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false
    // search (title or description, case-insensitive)
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const inTitle = task.title.toLowerCase().includes(term)
      const inDesc = task.description?.toLowerCase().includes(term)
      if (!inTitle && !inDesc) return false
    }
    return true
  })

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

  // 📖 Reusable filter dropdown helper (small inline component)
  const FilterSelect = ({ label, value, onChange, options }) => (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600">{label}:</label>
      <select
        value={value}
        onChange={onChange}
        className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )

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

      {/* 📖 Filter toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <FilterSelect
          label="Project"
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          options={[
            { value: 'all', label: 'All Projects' },
            ...projects.map((p) => ({ value: p.id, label: p.name })),
          ]}
        />
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'all', label: 'All Statuses' },
            { value: 'todo', label: 'To Do' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'done', label: 'Done' },
          ]}
        />
        <FilterSelect
          label="Priority"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          options={[
            { value: 'all', label: 'All Priorities' },
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' },
          ]}
        />
        {searchTerm && (
          <span className="text-xs text-gray-500 ml-auto">
            Searching: "<span className="font-medium">{searchTerm}</span>"
          </span>
        )}
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
                    <button
                      onClick={() => setDetailTask(task)}
                      className="text-left"
                      title="View details & comments"
                    >
                      <p className="font-medium hover:text-blue-600">{task.title}</p>
                    </button>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{getProjectName(task.projectId)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${status.cls}`}>{status.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${priority.cls}`}>{priority.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={task.assignee || ''}
                      onChange={(e) => dispatch(updateTask({ id: task.id, assignee: e.target.value }))}
                      className="px-2 py-1 border border-gray-300 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Unassigned</option>
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setDetailTask(task)}
                        className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 relative"
                        title="Comments"
                      >
                        💬
                        {getCommentCount(task.id) > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                            {getCommentCount(task.id)}
                          </span>
                        )}
                      </button>
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
                  No tasks match your filters
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

      {/* 📖 Task detail + comments modal */}
      <TaskDetail task={detailTask} onClose={() => setDetailTask(null)} />
    </div>
  )
}

export default TasksPage
