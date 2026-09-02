import { useSelector } from 'react-redux'

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
}

function ProjectsPage() {
  const projects = useSelector((state) => state.projects.items)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
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
              <div>
                <h3 className="font-semibold">{proj.name}</h3>
                <p className="text-xs text-gray-500">{proj.description}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Members: {proj.members.length}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage
