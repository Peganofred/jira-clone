import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, removeComment } from '../redux/slices/commentsSlice'
import Modal from './ui/Modal'
import Avatar from './ui/Avatar'

const statusMap = {
  todo: { label: 'To Do', cls: 'bg-gray-100 text-gray-700' },
  'in-progress': { label: 'In Progress', cls: 'bg-blue-100 text-blue-700' },
  done: { label: 'Done', cls: 'bg-green-100 text-green-700' },
}

const priorityMap = {
  high: { label: 'High', cls: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium', cls: 'bg-orange-100 text-orange-700' },
  low: { label: 'Low', cls: 'bg-green-100 text-green-700' },
}

// 📖 Format timestamp into "12-Aug 3:42 PM" style
function formatDate(iso) {
  const d = new Date(iso)
  if (isNaN(d)) return iso
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

// 📖 A single comment row
function CommentItem({ comment, authorMember }) {
  const dispatch = useDispatch()
  return (
    <div className="flex gap-3 mb-3">
      <Avatar name={authorMember?.name} color={authorMember?.avatarColor} size="w-7 h-7 text-xs" />
      <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">{authorMember?.name || 'Unknown'}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">{formatDate(comment.createdAt)}</span>
            <button
              onClick={() => dispatch(removeComment(comment.id))}
              className="text-[10px] text-gray-400 hover:text-red-600 transition-colors"
              title="Delete comment"
            >
              ✕
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-700 mt-1">{comment.text}</p>
      </div>
    </div>
  )
}

function TaskDetail({ task, onClose }) {
  const projects = useSelector((state) => state.projects.items)
  const members = useSelector((state) => state.members.items)
  const comments = useSelector((state) => state.comments.items)
  const dispatch = useDispatch()

  const [newComment, setNewComment] = useState('')

  if (!task) return null

  const status = statusMap[task.status]
  const priority = priorityMap[task.priority]
  const project = projects.find((p) => p.id === task.projectId)
  const assigneeMember = members.find((m) => m.id === task.assignee)

  // 📖 Sirf is task ke comments filter karte hain
  const taskComments = comments.filter((c) => c.taskId === task.id)

  // 📖 Comment count for ordering (newest last)
  const sortedComments = [...taskComments].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  )

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    dispatch(
      addComment({
        id: crypto.randomUUID(),
        taskId: task.id,
        author: members[0]?.id || '',
        text: newComment.trim(),
        createdAt: new Date().toISOString(),
      })
    )
    setNewComment('')
  }

  return (
    <Modal open={true} onClose={onClose} title="Task Details">
      <div>
        {/* Task info */}
        <div className="mb-1">
          <h4 className="font-semibold text-lg leading-tight">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
            📁 {project?.name || 'No project'}
          </span>
          <span className={`px-2 py-0.5 rounded text-xs ${status.cls}`}>{status.label}</span>
          <span className={`px-2 py-0.5 rounded text-xs ${priority.cls}`}>{priority.label}</span>
          {assigneeMember && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
              👤 {assigneeMember.name}
            </span>
          )}
        </div>

        {/* Comments section */}
        <div className="border-t pt-4">
          <p className="text-sm font-semibold mb-3">
            Comments ({taskComments.length})
          </p>

          <div className="max-h-64 overflow-y-auto pr-1 mb-3">
            {sortedComments.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">
                No comments yet. Add the first one below.
              </p>
            )}
            {sortedComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                authorMember={members.find((m) => m.id === comment.author)}
              />
            ))}
          </div>

          {/* Add comment form */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default TaskDetail