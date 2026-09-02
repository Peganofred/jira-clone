import { useSelector } from 'react-redux'

const columns = [
  { key: 'todo', title: 'To Do', dot: 'bg-gray-500', container: 'bg-gray-200' },
  { key: 'in-progress', title: 'In Progress', dot: 'bg-blue-500', container: 'bg-blue-100' },
  { key: 'done', title: 'Done', dot: 'bg-green-500', container: 'bg-green-100' },
]

const priorityDot = {
  high: 'bg-red-500',
  medium: 'bg-orange-400',
  low: 'bg-green-400',
}

function BoardPage() {
  const tasks = useSelector((state) => state.tasks.items)
  const members = useSelector((state) => state.members.items)

  const getMemberName = (id) => members.find((m) => m.id === id)?.name || ''

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key)
          return (
            <div key={col.key} className={`${col.container} rounded-lg p-4 min-h-[300px]`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                <h3 className="font-semibold text-sm">{col.title}</h3>
                <span className="ml-auto bg-white/70 px-2 py-0.5 rounded text-xs font-medium">
                  {colTasks.length}
                </span>
              </div>
              <div className="space-y-2">
                {colTasks.map((task) => (
                  <div key={task.id} className="bg-white rounded shadow p-3 text-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${priorityDot[task.priority]}`} />
                      <p className="font-medium">{task.title}</p>
                    </div>
                    {task.description && (
                      <p className="text-xs text-gray-500 mb-2 line-clamp-1">{task.description}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      {getMemberName(task.assignee) || 'No assignee'}
                    </p>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">No tasks here</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BoardPage
