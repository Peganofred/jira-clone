import { useSelector } from 'react-redux'

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

  const getMemberName = (id) => members.find((m) => m.id === id)?.name || 'Unassigned'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          + Add Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Task</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Priority</th>
              <th className="text-left px-4 py-3">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const status = statusMap[task.status]
              const priority = priorityMap[task.priority]
              return (
                <tr key={task.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${status.cls}`}>{status.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${priority.cls}`}>{priority.label}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{getMemberName(task.assignee)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TasksPage
