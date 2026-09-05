import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { markAsRead, markAllAsRead, removeNotification } from '../redux/slices/notificationsSlice'
import { notificationIcons } from '../data/mockData'

function NotificationsDropdown() {
  const notifications = useSelector((state) => state.notifications.items)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // 📖 Click outside se dropdown band hona
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-xl"
        title="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={() => dispatch(markAllAsRead())}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">
                No notifications yet 🎉
              </p>
            )}
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => dispatch(markAsRead(notif.id))}
                className={`flex items-start gap-3 px-4 py-3 border-b cursor-pointer transition-colors ${
                  notif.read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <span className="text-lg flex-shrink-0">
                  {notificationIcons[notif.type] || '📣'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs leading-snug ${notif.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                    {notif.text}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(removeNotification(notif.id))
                  }}
                  className="text-gray-400 hover:text-red-600 text-xs flex-shrink-0"
                  title="Dismiss"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationsDropdown