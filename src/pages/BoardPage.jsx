import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  DndContext,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { updateTask } from '../redux/slices/tasksSlice'

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

// 📖 Draggable task card component (via useDraggable hook)
function DraggableTask({ task, members, dispatch }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  const assignedMember = members.find((m) => m.id === task.assignee)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white rounded shadow p-3 text-sm hover:shadow-md transition-shadow touch-none"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-2 h-2 rounded-full ${priorityDot[task.priority]}`} />
        <p className="font-medium">{task.title}</p>
      </div>
      {task.description && (
        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{task.description}</p>
      )}
      {/* 📖 Assignee shown as avatar (interactive dropdown wrapped in buttons flow) */}
      <select
        value={task.assignee || ''}
        onChange={(e) => dispatch(updateTask({ id: task.id, assignee: e.target.value }))}
        onClick={(e) => e.stopPropagation()}
        className="mt-2 w-full px-2 py-1 border border-gray-200 rounded text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        title={assignedMember?.name || 'Assign to member'}
      >
        <option value="">Unassigned</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>
    </div>
  )
}

// 📖 Droppable column component (via useDroppable hook)
function DroppableColumn({ column, tasks, members, dispatch }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.key,
  })

  return (
    <div
      ref={setNodeRef}
      className={`${column.container} rounded-lg p-4 min-h-[300px] transition-colors ${
        isOver ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2.5 h-2.5 rounded-full ${column.dot}`} />
        <h3 className="font-semibold text-sm">{column.title}</h3>
        <span className="ml-auto bg-white/70 px-2 py-0.5 rounded text-xs font-medium">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} members={members} dispatch={dispatch} />
        ))}
        {tasks.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">No tasks here</p>
        )}
      </div>
    </div>
  )
}

function BoardPage() {
  const tasks = useSelector((state) => state.tasks.items)
  const members = useSelector((state) => state.members.items)
  const searchTerm = useSelector((state) => state.ui.searchTerm)
  const dispatch = useDispatch()

  const [priorityFilter, setPriorityFilter] = useState('all')

  // 📖 Fires when a drag ends and the item is dropped
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    // active.id = dragged task's id, over.id = destination column key
    const task = tasks.find((t) => t.id === active.id)
    if (task && task.status !== over.id) {
      dispatch(updateTask({ id: task.id, status: over.id }))
    }
  }

  // 📖 Board-wide filters: search + priority (status is handled by columns)
  const matchesFilters = (task) => {
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const inTitle = task.title.toLowerCase().includes(term)
      const inDesc = task.description?.toLowerCase().includes(term)
      if (!inTitle && !inDesc) return false
    }
    return true
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>
      <p className="text-sm text-gray-500 mb-4">
        👆 Cards ko drag karke columns mein move karo
      </p>

      {/* Priority filter */}
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm text-gray-600">Priority:</label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white focus:outline-none"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        {searchTerm && (
          <span className="text-xs text-gray-500 ml-auto">
            Searching: "<span className="font-medium">{searchTerm}</span>"
          </span>
        )}
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.key && matchesFilters(t))
            return (
              <DroppableColumn
                key={col.key}
                column={col}
                tasks={colTasks}
                members={members}
                dispatch={dispatch}
              />
            )
          })}
        </div>
      </DndContext>
    </div>
  )
}

export default BoardPage
