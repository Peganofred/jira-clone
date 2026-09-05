import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm } from '../../redux/slices/uiSlice'
import NotificationsDropdown from '../NotificationsDropdown'

function Topbar() {
  const searchTerm = useSelector((state) => state.ui.searchTerm)
  const dispatch = useDispatch()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">🔍</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          placeholder="Search tasks, projects..."
          className="w-72 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <NotificationsDropdown />
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
          A
        </div>
      </div>
    </header>
  )
}

export default Topbar
