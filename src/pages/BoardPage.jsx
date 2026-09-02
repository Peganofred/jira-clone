function BoardPage() {
  const columns = [
    { title: 'To Do', color: 'bg-gray-200', dot: 'bg-gray-500' },
    { title: 'In Progress', color: 'bg-blue-100', dot: 'bg-blue-500' },
    { title: 'Done', color: 'bg-green-100', dot: 'bg-green-500' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.title} className={`${col.color} rounded-lg p-4 min-h-[300px]`}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
              <h3 className="font-semibold text-sm">{col.title}</h3>
            </div>
            <div className="space-y-2">
              {/* Phase 5 mein drag & drop aayega */}
              <div className="bg-white rounded shadow p-3 text-sm">
                <p className="font-medium">Sample Card</p>
                <p className="text-xs text-gray-500 mt-1">No assignee</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardPage
