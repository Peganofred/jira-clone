import { NavLink } from 'react-router-dom'

const menuItems = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/projects', label: 'Projects', icon: '📁' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
  { to: '/board', label: 'Board', icon: '🗂️' },
  { to: '/team', label: 'Team', icon: '👥' },
]

function Sidebar() {
  return (
    <aside className="w-60 bg-[#172b4d] text-white min-h-screen flex-shrink-0">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-xl font-bold">TaskFlow</h1>
        <p className="text-xs text-blue-200 mt-1">Jira Clone</p>
      </div>
      <nav className="p-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded mb-1 text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-100 hover:bg-white/10'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 text-xs text-blue-200">
        Team Workspace
      </div>
    </aside>
  )
}

export default Sidebar
