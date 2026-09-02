function TasksPage() {
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
            {/* Phase 4 mein real data aayega */}
            <tr className="border-t">
              <td className="px-4 py-3">Sample Task 1</td>
              <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Todo</span></td>
              <td className="px-4 py-3"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">High</span></td>
              <td className="px-4 py-3 text-gray-500">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TasksPage
