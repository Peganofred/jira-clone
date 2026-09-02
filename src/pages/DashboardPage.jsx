function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'All Projects', value: 5, color: 'bg-blue-600' },
          { label: 'All Tasks', value: 42, color: 'bg-green-600' },
          { label: 'In Progress', value: 15, color: 'bg-yellow-500' },
          { label: 'Completed', value: 27, color: 'bg-purple-600' },
        ].map((stat) => (
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
          Ye aapka project management dashboard hai. Sidebar se Projects, Tasks, ya Board par jayein.
        </p>
      </div>
    </div>
  )
}

export default DashboardPage
