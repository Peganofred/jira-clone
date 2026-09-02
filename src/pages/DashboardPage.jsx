import { useSelector } from 'react-redux'

function DashboardPage() {
  const projects = useSelector((state) => state.projects.items)
  const tasks = useSelector((state) => state.tasks.items)

  const allTasks = tasks.length
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length
  const completed = tasks.filter((t) => t.status === 'done').length

  const stats = [
    { label: 'All Projects', value: projects.length, color: 'bg-blue-600' },
    { label: 'All Tasks', value: allTasks, color: 'bg-green-600' },
    { label: 'In Progress', value: inProgress, color: 'bg-yellow-500' },
    { label: 'Completed', value: completed, color: 'bg-purple-600' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center text-white font-bold`}>
                {stat.value}
              </div>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold mb-2">Welcome to TaskFlow 👋</h3>
        <p className="text-gray-600 text-sm">
          Projects: {projects.length} · Tasks: {allTasks} · In progress: {inProgress} · Done: {completed}
        </p>
      </div>
    </div>
  )
}

export default DashboardPage
